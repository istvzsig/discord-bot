const logger = require("../../utility/logger.js");

module.exports = {
  name: "shardDisconnect",
  once: false,

  execute(client) {
    logger.error("Bot disconnected from Discord!");
  },
};
