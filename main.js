require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const { BOT_TOKEN } = require("./src/config/config.js");
const logger = require("./src/utility/logger.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
client.commands = new Collection();

logger.info("Bot is starting...");

require("./src/handlers/commandHandler.js")(client);
require("./src/handlers/eventHandler.js")(client);

client.login(BOT_TOKEN);

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled promise rejection: " + err);
});
