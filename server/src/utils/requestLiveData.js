const { Markup } = require('telegraf');

function requestLocation(ctx) {
  ctx.reply(
    'Send your location please',
    Markup.keyboard([Markup.button.locationRequest('Send location')]).resize()
  );
}

function requestContact(ctx) {
  ctx.reply(
    'Send your contact',
    Markup.keyboard([Markup.button.contactRequest('Send contact')]).resize()
  );
}

module.exports.requestLocation = requestLocation;
module.exports.requestContact = requestContact;
