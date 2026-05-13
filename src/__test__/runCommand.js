const path = require("path");

const mockClient = require("./mocks/mockClient.js");

async function runCommand({ commandPath, userId, args = [] }) {
  const command = require(path.resolve(commandPath));

  console.log(`\nRunning /${command.data.name}`);

  // ========================
  // MOCK INTERACTION
  // ========================

  const interaction = {
    user: {
      id: userId,
    },

    options: {
      getString(name) {
        return args[0];
      },

      getInteger(name) {
        return args[0];
      },

      getUser(name) {
        return args[0];
      },
    },

    async reply(payload) {
      console.log("\n=== BOT REPLY ===");

      console.dir(payload, {
        depth: null,
      });
    },
  };

  await command.execute(interaction, mockClient);
}

module.exports = {
  runCommand,
};
