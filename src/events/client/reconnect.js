const logger = require("../../utility/logger.js");

module.exports = {
  name: "shardReconnecting",
  once: false,

  execute(client) {
    logger.warn("Bot is reconnecting...");
  },
};
