const User = require("../../database/models/User.js");
const { addXp } = require("../../services/earnXp.js");

module.exports = {
  name: "messageCreate",

  async execute(message) {
    if (message.author.bot) return;

    const user = await User.findOneAndUpdate(
      { userId: message.author.id },
      {},
      { upsert: true, new: true },
    );

    const result = await addXp(user, 10);

    if (result.leveledUp) {
      message.channel.send(
        `🎉 ${message.author} leveled up to **${result.level}**!`,
      );
    }
  },
};
