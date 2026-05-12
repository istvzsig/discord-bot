const embeds = require("../utility/embeds.js");

const cooldowns = new Map();

async function handleCooldown(interaction, command, embeds) {
  if (!command.cooldown) return false;

  const key = `${interaction.user.id}-${command.data.name}`;
  const currentTime = Date.now();
  const cooldownAmount = command.cooldown * 1000;

  if (cooldowns.has(key)) {
    const expirationTime = cooldowns.get(key) + cooldownAmount;

    if (currentTime < expirationTime) {
      const remaining = ((expirationTime - currentTime) / 1000).toFixed(1);

      await interaction.reply({
        embeds: [
          embeds.warning(
            `⏳ Wait ${remaining}s before using this command again.`,
          ),
        ],
        ephemeral: true,
      });

      return true;
    }
  }

  cooldowns.set(key, currentTime);

  setTimeout(() => {
    cooldowns.delete(key);
  }, cooldownAmount);

  return false;
}

module.exports = {
  handleCooldown,
};
