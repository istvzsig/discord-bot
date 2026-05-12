const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const BOT_TOKEN = process.env.TOKEN;
const BOT_PERMISSION_INTEGER = process.env.PERMISSION_INT;
const BOT_INVITE_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot%20applications.commands&permissions=${BOT_PERMISSION_INTEGER}`;

module.exports = {
  CLIENT_ID,
  GUILD_ID,
  BOT_TOKEN,
  BOT_INVITE_URL,
  BOT_PERMISSION_INTEGER,
};
