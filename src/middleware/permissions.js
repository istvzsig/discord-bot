async function handlePermissions(interaction, command, embeds) {
  // No permissions required
  if (!command.permissions?.length) {
    return false;
  }

  const hasPermission = interaction.member.roles.cache.some((role) =>
    command.permissions.includes(role.name),
  );

  if (!hasPermission) {
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
