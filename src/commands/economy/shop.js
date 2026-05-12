const { SlashCommandBuilder } = require("discord.js");

const registry = require("../../items/itemRegistry.js");

module.exports = {
  category: "Economy",

  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("View available shop items"),

  async execute(interaction, client) {
    const items = registry.getAll();

    const list = items
      .map((i) => {
        const price = i.price ?? 0;

        return `🛒 **${i.name}** - ${price} coins\nID: \`${i.id}\``;
      })
      .join("\n\n");

    return interaction.reply({
      embeds: [client.embeds.info(`🏪 **Shop Items**\n\n${list}`)],
    });
  },
};
