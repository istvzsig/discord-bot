const { exec } = require("child_process");
const config = require("./src/config/config.js");

console.log("Invite bot:", config.BOT_INVITE_URL);

// macOS
if (process.platform === "darwin") exec(`open "${config.BOT_INVITE_URL}"`);
// Windows
else if (process.platform === "win32")
  exec(`start "" "${config.BOT_INVITE_URL}"`);
// Linux (xdg-open)
else exec(`xdg-open "${config.BOT_INVITE_URL}"`);
