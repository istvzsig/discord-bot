const fs = require("fs");
const path = require("path");

const logger = require("../utils/logger.js");

module.exports = function (client) {
  const eventDir = path.join(__dirname, "../events");
  const eventFolders = fs.readdirSync(eventDir);

  client._loadedEvents = new Set();

  for (const folder of eventFolders) {
    const folderPath = path.join(eventDir, folder);

    const eventFiles = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(folderPath, file);

      const event = require(filePath);

      if (!event.name || !event.execute) {
        throw new Error(`Invalid event file: ${file}`);
      }

      logger.info(`Event loaded: ${event.name}`);

      client._loadedEvents.add(event.name);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
};
