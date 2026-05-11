const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const embeds = require("../../utility/embeds");

module.exports = {
  category: "Moderation",
  cooldown: 10,

  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete a number of messages from chat")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete (1-100)")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      return await interaction.reply({
        embeds: [
          embeds.console.warn([
            `You can only delete between 1 and 100 messages.`,
          ]),
        ],
      });
    }

    const channel = interaction.channel;

    try {
      const deleted = await channel.bulkDelete(amount, true);

      await interaction.reply({
        embeds: [embeds.success(`🧹 Deleted ${deleted.size} messages.`)],
      });
    } catch (err) {
      console.error(err);

      await interaction.reply({
        embeds: [
          embeds.error(
            `Failed to delete messages. They might be older than 14 days.`,
          ),
        ],
      });
    }
  },
};
