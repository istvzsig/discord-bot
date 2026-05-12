const logger = require("../../utility/logger.js");

module.exports = {
  name: "error",
  once: false,

  async execute(client) {
    logger.error("Client error: " + err.message);
  },
};
