const { SlashCommandBuilder } = require("discord.js");

const { getUser } = require("../../services/userService.js");

const COOLDOWN = 60 * 60 * 1000; // 1 hour

const jobs = ["developer", "designer", "miner", "streamer", "chef"];

module.exports = {
  category: "Economy",
  cooldown: 3,

  data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Work to earn coins"),

  async execute(interaction, client) {
    const user = await getUser(client, interaction.user.id);

    const now = Date.now();

    if (user.lastWork && now - user.lastWork < COOLDOWN) {
      const remaining = COOLDOWN - (now - user.lastWork);
      const minutes = Math.floor(remaining / 60000);

      return interaction.reply({
        embeds: [
          client.embeds.warning(`⏳ You are tired. Try again in ${minutes}m.`),
        ],
      });
    }

    const job = jobs[Math.floor(Math.random() * jobs.length)];
    const earned = Math.floor(Math.random() * 300) + 100;

    user.balance += earned;
    user.lastWork = now;

    await user.save();

    return interaction.reply({
      embeds: [
        client.embeds.success(
          `💼 You worked as a **${job}** and earned **${earned} coins**!`,
        ),
      ],
    });
  },
};
