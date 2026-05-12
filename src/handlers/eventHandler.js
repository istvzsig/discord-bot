const fs = require("fs");
const path = require("path");

const { EVENT_DIR } = require("../config/config.js");

module.exports = (client) => {
  const eventFolders = fs.readdirSync(path.join(__dirname, EVENT_DIR));

  for (const folder of eventFolders) {
    const eventFiles = fs
      .readdirSync(path.join(__dirname, `${EVENT_DIR}/${folder}`))
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const event = require(`${EVENT_DIR}/${folder}/${file}`);

      console.log(event);

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }
};
