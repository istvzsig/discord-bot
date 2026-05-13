const User = require("../database/models/User.js");

async function getUser(userId) {
  let user = await User.findOne({ userId });

  if (!user) {
    user = await User.create({
      userId,
    });
  }

  return user;
}

module.exports = {
  getUser,
};
