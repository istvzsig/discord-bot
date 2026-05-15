const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const eventDir = path.join(__dirname, "../events");

  const eventFolders = fs.readdirSync(eventDir);

  for (const folder of eventFolders) {
    const folderPath = path.join(eventDir, folder);

    const eventFiles = fs
      .readdirSync(folderPath)
      .filter((f) => f.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(folderPath, file);

      const event = require(filePath);

      console.log(`Loaded event: ${event.name}`);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
};
