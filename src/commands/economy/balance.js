const { SlashCommandBuilder } = require("discord.js");

const { getUser } = require("../../database/helper.js");

module.exports = {
  category: "Economy",
  cooldown: 3,

  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your balance"),

  async execute(interaction, client) {
    const user = await getUser(client, interaction.user.id);

    return interaction.reply({
      embeds: [client.embeds.success(`💰 Balance: **${user.balance} coins**`)],
    });
  },
};
