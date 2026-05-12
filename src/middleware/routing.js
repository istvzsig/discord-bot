// An interaction is ANY action a user performs that expects a bot response.
// User Action → Discord API → interactionCreate event → your bot handles it
// Run this file EVERY TIME any interaction happens.”

const embeds = require("../utility/embeds.js");

const { handlePermissions } = require("./permissions.js");
const { handleCooldown } = require("./cooldowns.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    const blockedByPermissions = await handlePermissions(
      interaction,
      command,
      embeds,
    );
    console.log(blockedByPermissions);
    if (blockedByPermissions) return;

    const onCooldown = await handleCooldown(interaction, command, embeds);

    if (onCooldown) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          embeds: [embeds.error("❌ Error executing command.")],
        });
      } else {
        await interaction.reply({
          embeds: [embeds.error("❌ Error executing command.")],
        });
      }
    }
  },
};
