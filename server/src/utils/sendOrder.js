const { default: axios } = require('axios');
const { items } = require('../db');
require('dotenv').config();

async function SendOrder(order) {
  let products = '';
  let totalPrice = 0;
  const { orders, orderOwner } = order;
  for (const ord in orders) {
    totalPrice += items[ord].value * orders[ord];
    products += `${orders[ord]}ta ${items[ord].name}\n`;
  }

  const message = `Name: ${orderOwner.name}\nPhone number: ${
    orderOwner.contact
  }\nLocation: https://www.google.com/maps/?q=${orderOwner.location.latitude},${
    orderOwner.location.longitude
  }\n\n${products} \n\nPrice: ${totalPrice}\nDelivery Price: 10000\nTotal: ${
    totalPrice + 10000
  }`;

  await axios({
    method: 'POST',
    url: `https://api.telegram.org/bot${process.env.SENDER_BOT_TOKEN}/sendMessage`,
    data: {
      chat_id: process.env.CHAT_ID,
      text: message,
    },
  });

  return 'Your order has been sent successfully';
}

module.exports.SendOrder = SendOrder;
