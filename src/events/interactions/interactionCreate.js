const embeds = require("../../utility/embeds");

// An interaction is ANY action a user performs that expects a bot response.
// User Action → Discord API → interactionCreate event → your bot handles it
// Run this file EVERY TIME any interaction happens.”

const cooldowns = new Map();

module.exports = {
  name: "interactionCreate",
  category: "Interaction",

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    // =========================
    // COOLDOWN SYSTEM
    // =========================

    if (command.cooldown) {
      const key = `${interaction.user.id}-${command.data.name}`;

      const currentTime = Date.now();

      const cooldownAmount = command.cooldown * 1000;

      if (cooldowns.has(key)) {
        const expirationTime = cooldowns.get(key) + cooldownAmount;

        if (currentTime < expirationTime) {
          const remaining = ((expirationTime - currentTime) / 1000).toFixed(1);

          return interaction.reply({
            embeds: [
              embeds.warn(
                `⏳ Wait ${remaining}s before using this command again.`,
              ),
            ],
          });
        }
      }

      cooldowns.set(key, currentTime);

      setTimeout(() => {
        cooldowns.delete(key);
      }, cooldownAmount);
    }

    // =========================
    // COMMAND EXECUTION
    // =========================

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          embeds: [embeds.warn(`❌ Error executing command.`)],
        });
      } else {
        await interaction.reply({
          embeds: [embeds.warn(`❌ Error executing command.`)],
        });
      }
    }
  },
};
