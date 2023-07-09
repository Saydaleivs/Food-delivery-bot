const { Users } = require('../models/user');

async function saveUserData(user) {
  const isAvailableUser = await Users.findOne({ user_id: user.id });
  if (isAvailableUser) return;

  try {
    const newUser = new Users({
      name: user.first_name,
      username: user.username,
      user_id: user.id,
    });

    await newUser.save();
  } catch (ex) {
    console.log(ex);
  }
}

async function saveUserLocation(userId, location) {
  const user = await Users.findOne({
    user_id: userId,
  });

  if (!user) return;
  user.location = location;

  await user.save();
}

async function saveUserContact(userId, contact) {
  const user = await Users.findOne({
    user_id: userId,
  });

  if (!user) return;
  user.contact = contact;

  await user.save();
}

module.exports.saveUserData = saveUserData;
module.exports.saveUserLocation = saveUserLocation;
module.exports.saveUserContact = saveUserContact;
