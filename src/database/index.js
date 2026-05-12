const User = require("./models/User");

async function getUser(client, userId) {
  return await client.db.users.ensure(userId);
}

module.exports = {
  getUser,
  users: {
    async ensure(userId) {
      let user = await User.findOne({ userId });

      if (!user) {
        user = await User.create({ userId });
      }

      return user;
    },

    async get(userId) {
      return await User.findOne({ userId });
    },

    async addBalance(userId, amount) {
      return await User.findOneAndUpdate(
        { userId },
        { $inc: { balance: amount } },
        { new: true, upsert: true },
      );
    },

    async removeBalance(userId, amount) {
      return await User.findOneAndUpdate(
        { userId },
        { $inc: { balance: -amount } },
        { new: true },
      );
    },
  },
};
