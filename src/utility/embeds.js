const { EmbedBuilder } = require("discord.js");

module.exports = {
  success(message) {
    return new EmbedBuilder()
      .setColor("Green")
      .setDescription(`✅ ${message}`)
      .setTimestamp();
  },

  error(message) {
    return new EmbedBuilder()
      .setColor("Red")
      .setDescription(`❌ ${message}`)
      .setTimestamp();
  },

  warning(message) {
    return new EmbedBuilder()
      .setColor("Yellow")
      .setDescription(`⚠️ ${message}`)
      .setTimestamp();
  },

  info(message) {
    return new EmbedBuilder()
      .setColor("Blue")
      .setDescription(`ℹ️ ${message}`)
      .setTimestamp();
  },
};
