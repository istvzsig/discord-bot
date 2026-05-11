const logger = require("../../utility/logger.js");

module.exports = {
  name: "error",
  once: false,

  execute(client) {
    logger.error("Client error: " + err.message);
  },
};
