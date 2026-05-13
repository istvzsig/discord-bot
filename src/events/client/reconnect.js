const logger = require("../../utils/logger.js");

module.exports = {
  name: "shardReconnecting",
  once: false,

  async execute(client) {
    logger.warn("Bot is reconnecting...");
  },
};
