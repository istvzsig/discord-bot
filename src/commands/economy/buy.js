const { SlashCommandBuilder } = require("discord.js");

const shop = require("../../database/shopService");

module.exports = {
  category: "Economy",

  data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Buy an item from the shop")
    .addStringOption((opt) =>
      opt.setName("item").setDescription("Item ID").setRequired(true),
    ),

  async execute(interaction, client) {
    const itemId = interaction.options.getString("item");

    const result = await shop.buyItem(interaction.user.id, itemId);

    if (result.error) {
      return interaction.reply({
        embeds: [client.embeds.error(result.error)],
        ephemeral: true,
      });
    }

    return interaction.reply({
      embeds: [
        client.embeds.success(
          `✅ Purchased **${result.item.name}** for ${result.item.price} coins`,
        ),
      ],
    });
  },
};
