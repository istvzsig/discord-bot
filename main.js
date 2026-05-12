require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const { BOT_TOKEN } = require("./src/config/config.js");
const db = require("./src/database");
const registry = require("./src/items/itemRegistry.js");
const logger = require("./src/utility/logger.js");

const connectMongo = require("./src/database/connect.js");

async function start() {
  const client = await new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  });
  client.db = db;
  client.commands = new Collection();
  client.embeds = require("./src/utility/embeds.js");

  logger.info("Bot is starting...");

  registry.load();
  await connectMongo(client);

  require("./src/handlers/commandHandler.js")(client);
  require("./src/handlers/eventHandler.js")(client);

  client.login(BOT_TOKEN);
}

start();

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled promise rejection:", err);
});
