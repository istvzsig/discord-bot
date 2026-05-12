const { SlashCommandBuilder } = require("discord.js");

const shop = require("../../config/shopItems.js");

module.exports = {
  category: "Economy",

  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("View available shop items"),

  async execute(interaction, client) {
    const list = shop
      .map((i) => `🛒 **${i.name}** - ${i.price} coins\nID: \`${i.id}\``)
      .join("\n\n");

    return interaction.reply({
      embeds: [client.embeds.info(`🏪 **Shop Items**\n\n${list}`)],
    });
  },
};
