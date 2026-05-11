const CLIENT_ID = process.env.CLIENT_ID || process.argv[2];
const BOT_PERMISSION_INTEGER = process.env.PERMISSION_INT || 8;
const BOT_INVITE_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot%20applications.commands&permissions=${BOT_PERMISSION_INTEGER}`;

module.exports = {
  CLIENT_ID,
  BOT_PERMISSION_INTEGER,
  BOT_INVITE_URL,
};
