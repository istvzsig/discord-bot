require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const { CLIENT_ID, GUILD_ID, BOT_TOKEN } = require("../config/config.js");
const logger = require("../utils/logger.js");

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

const commands = [];
const commandFolders = fs.readdirSync(path.join(__dirname, "../commands"));

async function deploy() {
  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(path.join(__dirname, `../commands/${folder}`))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);

      commands.push(command.data.toJSON());
    }
  }
  try {
    logger.info("Deploying commands...");

    const resp = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    logger.info("Commands deployed.");
  } catch (error) {
    logger.error(error);
  }
}

deploy();
