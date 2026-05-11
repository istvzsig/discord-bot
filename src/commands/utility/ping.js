const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config/config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(interaction) {
    await interaction.reply(JSON.stringify("🏓 Pong!"));
  },
};
