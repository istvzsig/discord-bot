const { SlashCommandBuilder } = require("discord.js");

const User = require("../../database/models/User");

module.exports = {
  category: "Economy",
  cooldown: 3,

  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show top richest users"),

  async execute(interaction, client) {
    const topUsers = await User.find().sort({ balance: -1 }).limit(10);

    const list = topUsers
      .map((u, i) => `**${i + 1}.** <@${u.userId}> — ${u.balance} coins`)
      .join("\n");

    return interaction.reply({
      embeds: [client.embeds.success(`🏆 **Leaderboard**\n\n${list}`)],
    });
  },
};
