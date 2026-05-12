const { PermissionFlagsBits } = require("discord.js");

module.exports = async (interaction, command, client) => {
  if (!command.permissions?.length) {
    return false;
  }

  const member = interaction.member;

  // Server owner bypass
  if (interaction.guild.ownerId === member.id) {
    return false;
  }

  // Discord administrator bypass
  if (member.permissions.has(PermissionFlagsBits.Administrator)) {
    return false;
  }

  // Role-based permissions
  const hasRole = member.roles.cache.some((role) =>
    command.permissions.includes(role.name),
  );

  if (!hasRole) {
    await interaction.reply({
      embeds: [client.embeds.error("❌ You do not have permission.")],
      ephemeral: true,
    });

    return true;
  }

  return false;
};
