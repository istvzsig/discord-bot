const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "Utility",
  cooldown: 5,

  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all commands"),

  async execute(interaction, client) {
    const categories = {};

    client.commands.forEach((command) => {
      const category = command.category || "Other";

      if (!categories[category]) {
        categories[category] = [];
      }

      categories[category].push(
        `\`/${command.data.name}\` - ${command.data.description}`,
      );
    });

    const embed = new EmbedBuilder()
      .setTitle("📚 Bot Commands")
      .setDescription("Available commands")
      .setColor("Blue");

    for (const category in categories) {
      embed.addFields({
        name: category,
        value: categories[category].join("\n"),
      });
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};
