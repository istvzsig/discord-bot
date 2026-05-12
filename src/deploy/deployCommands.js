require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const config = require("../config/config.js");
const logger = require("../utility/logger.js");

const commands = [];

const commandFolders = fs.readdirSync(path.join(__dirname, "../commands"));

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, `../commands/${folder}`))
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`../commands/${folder}/${file}`);

    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

(async () => {
  try {
    logger.info("Deploying commands...");

    const resp = await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: commands },
    );

    logger.info("Commands deployed.");
  } catch (error) {
    logger.error(error);
  }
})();
