const { SlashCommandBuilder } = require("discord.js");

const embeds = require("../../utils/embeds.js");
const { permissions } = require("../moderation/clear.js");

module.exports = {
  category: "Utility",
  cooldown: 5,

  permissions: ["Moderator"],

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(interaction) {
    await interaction.reply({
      content: "🏓 Pong!",
    });
  },
};
