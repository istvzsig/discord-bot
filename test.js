const path = require("path");

const mockDB = require("./src/test/mocks/mockMongoDB.js");

mockDB.seedUser("123456789", {
  balance: 5555,
});

require.cache[require.resolve("./src/database/models/User")] = {
  exports: mockDB.User,
};

const { runCommand } = require("./src/test/runCommand.js");

async function test() {
  await runCommand({
    commandPath: "./src/commands/economy/balance.js",
    userId: "123456789",
  });
}

test().catch((err) => {
  console.error("ERROR", err);
  process.exit(1);
});
