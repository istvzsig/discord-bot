const { SlashCommandBuilder } = require("discord.js");

const User = require("../../database/models/User");
const registry = require("../../items/itemRegistry");
const effectEngine = require("../../items/effectEngine");

module.exports = {
  category: "Economy",

  data: new SlashCommandBuilder()
    .setName("use")
    .setDescription("Use an item from your inventory")
    .addStringOption((opt) =>
      opt.setName("item").setDescription("Item ID").setRequired(true),
    ),

  async execute(interaction, client) {
    const itemId = interaction.options.getString("item");

    const item = registry.get(itemId);

    if (!item) {
      return interaction.reply({
        embeds: [client.embeds.error("Invalid item.")],
      });
    }

    const user = await User.findOne({
      userId: interaction.user.id,
    });

    if (!user) return;

    const invItem = user.inventory.find((i) => i.itemId === itemId);

    if (!invItem) {
      return interaction.reply({
        embeds: [client.embeds.error("You don't own this item.")],
      });
    }

    // remove item if consumable
    if (item.category === "consumable") {
      user.inventory = user.inventory.filter((i) => i.itemId !== itemId);
    }

    await effectEngine.apply(user, item);

    await user.save();

    return interaction.reply({
      embeds: [client.embeds.success(`✅ Used **${item.name}**`)],
    });
  },
};
