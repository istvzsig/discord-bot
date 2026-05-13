const { GatewayIntentBits } = require("discord.js");

const config = require("../../config/config.js");
const logger = require("../../utils/logger.js");

module.exports = {
  name: "clientReady",
  once: true,

  async execute(client) {
    logger.info(`${client.user.tag} is ONLINE`);
    logger.info(`Connected to ${client.guilds.cache.size} server(s)`);
  },
};
