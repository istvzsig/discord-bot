const { SlashCommandBuilder } = require("discord.js");

const embeds = require("../../utility/embeds");

module.exports = {
  category: "Utility",
  cooldown: 5,

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(interaction) {
    await interaction.reply({
      content: "🏓 Pong!",
      // embeds: [embeds.success("🏓 Pong!")],
    });
  },
};
