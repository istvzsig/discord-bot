const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  category: "Moderation",
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
      return interaction.reply({
        content: "You can only delete between 1 and 100 messages.",
        ephemeral: true,
      });
    }

    const channel = interaction.channel;

    try {
      const deleted = await channel.bulkDelete(amount, true);

      await interaction.reply({
        content: `🧹 Deleted ${deleted.size} messages.`,
        ephemeral: true,
      });
    } catch (err) {
      console.error(err);

      await interaction.reply({
        content: "Failed to delete messages. They might be older than 14 days.",
        ephemeral: true,
      });
    }
  },
};
