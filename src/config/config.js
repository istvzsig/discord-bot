const CLIENT_ID = process.env.CLIENT_ID || process.argv[2];
const GUILD_ID = process.env.GUILD_ID || process.argv[3];

const BOT_PERMISSION_INTEGER = process.env.PERMISSION_INT || 8;
const BOT_INVITE_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot%20applications.commands&permissions=${BOT_PERMISSION_INTEGER}`;

const CommandMenu = {
  ping: { command: "ping", desc: "Replies with Pong!" },
  help: { command: "help", desc: "Displays bot menu." },
};

module.exports = {
  CLIENT_ID,
  GUILD_ID,
  BOT_INVITE_URL,
  BOT_PERMISSION_INTEGER,
  commandMenu: CommandMenu,
};
