require("dotenv").config();

const { exec } = require("child_process");

const { BOT_INVITE_URL } = require("./src/config/config.js");
console.log("Invite bot:", BOT_INVITE_URL);

// macOS
if (process.platform === "darwin") exec(`open "${BOT_INVITE_URL}"`);
// Windows
else if (process.platform === "win32") exec(`start "" "${BOT_INVITE_URL}"`);
// Linux (xdg-open)
else exec(`xdg-open "${BOT_INVITE_URL}"`);
