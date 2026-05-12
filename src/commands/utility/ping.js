const { SlashCommandBuilder } = require("discord.js");

const embeds = require("../../utility/embeds");
const { permissions } = require("../moderation/clear");

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
