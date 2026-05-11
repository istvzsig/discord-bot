const { GatewayIntentBits } = require("discord.js");

const config = require("../../config/config.js");
const logger = require("../../utility/logger.js");

async function getGuild(client) {
  // Ensure client was constructed with GatewayIntentBits.GuildMembers
  const guild = await client.guilds.fetch(config.GUILD_ID);
  // Fetch all members (requires Guild Members intent enabled in code & developer portal)

  const members = await guild.members;
  console.log(
    `Guild: ${guild.name} (${guild.id}) -  fetched ${members.size} members`,
  );

  return { guild, members };
}

module.exports = {
  name: "clientReady",
  once: true,

  async execute(client) {
    logger.info(`${client.user.tag} is ONLINE`);
    logger.info(`Connected to ${client.guilds.cache.size} server(s)`);
  },
};
