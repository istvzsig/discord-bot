// An interaction is ANY action a user performs that expects a bot response.
// User Action → Discord API → interactionCreate event → your bot handles it
// Run this file EVERY TIME any interaction happens.”

const embeds = require("../../utils/embeds.js");
const logger = require("../../utils/logger.js");
const runMiddlewares = require("../../utils/runMiddlewares.js");

const permissions = require("../../middleware/permissions.js");
const cooldowns = require("../../middleware/cooldowns.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    try {
      if (!interaction.isChatInputCommand()) return;

      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      // =========================
      // MIDDLEWARE PIPELINE
      // =========================

      const stopped = await runMiddlewares(
        [permissions, cooldowns],
        interaction,
        command,
        client,
      );

      if (stopped) return;

      // =========================
      // EXECUTE COMMAND
      // =========================

      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          embeds: [client.embeds.error("❌ Internal framework error.")],
        });
      } else {
        await interaction.reply({
          embeds: [client.embeds.error("❌ Internal framework error.")],
        });
      }
    }
  },
};
