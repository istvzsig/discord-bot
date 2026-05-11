require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");
const logger = require("./src/utility/logger.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
client.commands = new Collection();

logger.info("Bot is starting...");

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled promise rejection: " + err);
});

require("./src/handlers/eventHandler.js")(client);
require("./src/handlers/commandHandler.js")(client);

client.login(process.env.TOKEN);
