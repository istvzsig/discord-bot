// An interaction is ANY action a user performs that expects a bot response.
// User Action → Discord API → interactionCreate event → your bot handles it
// Run this file EVERY TIME any interaction happens.”

const embeds = require("../../utility/embeds.js");
const logger = require("../../utility/logger.js");

const { handlePermissions } = require("../../middleware/permissions");

const { handleCooldown } = require("../../middleware/cooldowns");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    logger.info("Interaction received");

    try {
      if (!interaction.isChatInputCommand()) return;

      logger.info("Slash command detected");

      const command = client.commands.get(interaction.commandName);

      if (!command) {
        logger.warn("Command not found");
        return;
      }

      logger.info(`Running command: ${command.data.name}`);

      // =========================
      // PERMISSIONS
      // =========================

      const blockedByPermissions = await handlePermissions(
        interaction,
        command,
        embeds,
      );

      if (blockedByPermissions) {
        logger.warn("Blocked by permissions");
        return;
      }

      // =========================
      // COOLDOWNS
      // =========================

      const onCooldown = await handleCooldown(interaction, command, embeds);

      if (onCooldown) {
        logger.warn("Blocked by cooldown");
        return;
      }

      // =========================
      // EXECUTE
      // =========================

      await command.execute(interaction, client);

      logger.info("Command executed successfully");
    } catch (error) {
      console.error("INTERACTION ERROR:");
      console.error(error);

      try {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            embeds: [embeds.error("❌ Internal framework error.")],
          });
        } else {
          await interaction.reply({
            embeds: [embeds.error("❌ Internal framework error.")],
            ephemeral: true,
          });
        }
      } catch (replyError) {
        console.error("FAILED TO REPLY:");
        console.error(replyError);
      }
    }
  },
};
