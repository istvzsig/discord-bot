require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const { BOT_TOKEN } = require("./src/config/config.js");
const logger = require("./src/utils/logger.js");

const db = require("./src/database/main.js");
const connectMongo = require("./src/database/connect.js");
const registry = require("./src/items/itemRegistry.js");
const validate = require("./src/bootstrap/validate.js");

async function main() {
  const client = new Client({
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

  validate(client);

  await client.login(BOT_TOKEN);
}

process.on("unhandledRejection", (err) => {
  logger.error("\n💥 UNHANDLED REJECTION");
  logger.error(err);
  process.exit(1);
});

main().catch((err) => {
  logger.error("Fatal startup error:", err);
  process.exit(1);
});
