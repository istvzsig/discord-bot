const { PermissionFlagsBits } = require("discord.js");

async function handlePermissions(interaction, command, embeds) {
  // No permissions required
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
      embeds: [
        embeds.error("❌ You do not have permission to use this command."),
      ],
      ephemeral: true,
    });

    return true;
  }

  return false;
}

module.exports = {
  handlePermissions,
};
