require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const { BOT_TOKEN } = require("./src/config/config.js");
const logger = require("./src/utils/logger.js");

const db = require("./src/database/main.js");
const connectMongo = require("./src/database/connect.js");
const registry = require("./src/items/itemRegistry.js");

async function main() {
  const client = await new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  });
  client.db = db;
  client.commands = new Collection();
  client.embeds = require("./src/utils/embeds.js");

  logger.info("Bot is starting...");

  registry.load();
  await connectMongo(client);

  require("./src/handlers/commandHandler.js")(client);
  require("./src/handlers/eventHandler.js")(client);

  client.login(BOT_TOKEN);
}

main();

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled promise rejection:", err);
});
