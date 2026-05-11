const logger = require("../../utility/logger.js");

module.exports = {
  name: "clientReady",
  once: true,

  execute(client) {
    logger.info(`${client.user.tag} is ONLINE`);
    logger.info(`Connected to ${client.guilds.cache.size} server(s)`);
  },
};
