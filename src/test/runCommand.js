const path = require("path");

const client = require("./mocks/mockClient.js");
const { createMockInteraction } = require("./mocks/mockInteraction.js");

async function runCommand({ commandPath, userId, options = {} }) {
  const command = require(path.resolve(commandPath));

  const interaction = createMockInteraction({
    commandName: command.data.name,
    userId,
    options,
  });

  console.log(`\nRunning /${command.data.name}`);

  await command.execute(interaction, client);
}

module.exports = {
  runCommand,
};
