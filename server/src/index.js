const { Telegraf, Markup } = require('telegraf');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Express JS + MongoDB
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB...');
  });

app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    origin: '*',
  })
);

const ItemsRoute = require('./routes/items');
const { Users } = require('./models/user');
const {
  saveUserData,
  saveUserLocation,
  saveUserContact,
} = require('./utils/saveUserData');
const { requestLocation, requestContact } = require('./utils/requestLiveData');
const { SendOrder } = require('./utils/sendOrder');
app.use('/api', ItemsRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Started listerning to port ${port}....`);
});

// Telegram BOT
const WEB_APP_URL = process.env.WEB_APP;
const bot = new Telegraf(process.env.BOT_TOKEN);

(async () => {
  app.use(await bot.createWebhook({ domain: process.env.WEB_HOOK }));
})();

bot.start((ctx) => {
  saveUserData(ctx.update.message.from);
  requestLocation(ctx);
});

bot.on('location', (ctx) => {
  const location = ctx.update.message['location'];

  saveUserLocation(ctx.update.message.from.id, location);
  requestContact(ctx, location);
});

bot.on('contact', (ctx) => {
  const contact = ctx.update.message.contact.phone_number;
  const userId = ctx.update.message.from.id;
  saveUserContact(userId, contact);
  showMenu(ctx, userId);
});

bot.on('web_app_data', async (ctx) => {
  const user = await Users.findOne({ user_id: ctx.message.from.id });

  try {
    const orderDetails = JSON.parse(ctx.update.message.web_app_data.data);
    const message = await SendOrder({
      orders: orderDetails.orders,
      orderOwner: user,
    });
    ctx.reply(message);
  } catch (error) {
    console.log(error);
  }
});

// bot.launch();

async function showMenu(ctx, userId) {
  const user = await Users.findOne({ user_id: userId });
  if (!user) return;

  ctx.reply(
    'Here is menu you can order now',
    Markup.keyboard([
      Markup.button.webApp(
        'Menu',
        WEB_APP_URL +
          `/${user.contact}${user.username ? `?username=${user.username}` : ''}`
      ),
    ])
      .resize()
      .oneTime()
  );
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
