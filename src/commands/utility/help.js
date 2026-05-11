const { SlashCommandBuilder } = require("discord.js");

const embeds = require("../../utility/embeds");

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

    // Use centralized embed system
    const embed = embeds
      .info("Available commands")
      .setTitle("📚 Bot Commands")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: `${client.user.username} Help System`,
      });

    // Add categories dynamically
    for (const category in categories) {
      embed.addFields({
        name: `📂 ${category}`,
        value: categories[category].join("\n"),
      });
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};
