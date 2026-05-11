require("dotenv").config();

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

require("./src/handlers/eventHandler.js")(client);
require("./src/handlers/commandHandler.js")(client);

client.login(process.env.TOKEN);
