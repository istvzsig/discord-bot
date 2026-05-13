const { SlashCommandBuilder } = require("discord.js");

const User = require("../../database/models/User");

const registry = require("../../items/itemRegistry");

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

    // ========================
    // RESOLVE ITEM DEFINITIONS
    // ========================

    const items = user.inventory
      .map((entry) => {
        const item = registry.get(entry.itemId);

        if (!item) {
          return `❓ Unknown Item (${entry.itemId})`;
        }

        return `🎒 **${item.name}** ` + `(${item.category}) x${entry.quantity}`;
      })
      .join("\n");

    return interaction.reply({
      embeds: [client.embeds.success(`**Your Inventory**\n\n${items}`)],
    });
  },
};
