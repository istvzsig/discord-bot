const { SlashCommandBuilder } = require("discord.js");

const items = [
  { name: "VIP Role", price: 1000 },
  { name: "XP Boost", price: 500 },
];

module.exports = {
  category: "Economy",
  cooldown: 10,

  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("View available items in the shop"),

  async execute(interaction, client) {
    const list = items
      .map((i) => `🛒 **${i.name}** — ${i.price} coins`)
      .join("\n");

    return interaction.reply({
      embeds: [client.embeds.info(`🏪 **Shop**\n\n${list}`)],
    });
  },
};
