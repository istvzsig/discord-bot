const { SlashCommandBuilder } = require("discord.js");

const { getUser } = require("../../services/userService.js");

const COOLDOWN = 24 * 60 * 60 * 1000; // 24h

module.exports = {
  category: "Economy",

  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim daily reward"),

  async execute(interaction, client) {
    const user = await getUser(client, interaction.user.id);
    const now = Date.now();

    if (user.lastDaily && now - user.lastDaily < COOLDOWN) {
      const remaining = COOLDOWN - (now - user.lastDaily);

      const hours = Math.floor(remaining / 3600000);

      return interaction.reply({
        embeds: [
          client.embeds.warning(
            `⏳ You already claimed daily. Come back in ${hours}h.`,
          ),
        ],
      });
    }

    const reward = 500;

    user.balance += reward;
    user.lastDaily = now;

    await user.save();

    return interaction.reply({
      embeds: [client.embeds.success(`🎁 You claimed **${reward} coins**!`)],
    });
  },
};
