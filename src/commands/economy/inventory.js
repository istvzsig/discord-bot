const { SlashCommandBuilder } = require("discord.js");

const User = require("../../database/models/User.js");

module.exports = {
  category: "Economy",

  data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("View your purchased items"),

  async execute(interaction, client) {
    const user = await User.findOne({
      userId: interaction.user.id,
    });

    if (!user || user.inventory.length === 0) {
      return interaction.reply({
        embeds: [client.embeds.info("Your inventory is empty.")],
      });
    }

    const items = user.inventory
      .map((i) => `🎒 **${i.name}** (${i.type})`)
      .join("\n");

    return interaction.reply({
      embeds: [client.embeds.success(`**Your Inventory**\n\n${items}`)],
    });
  },
};
