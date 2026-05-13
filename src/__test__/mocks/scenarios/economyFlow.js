const mockMongoDB = require("../mockMongoDB.js");

const { runCommand } = require("../../runCommand.js");
const { expectEqual } = require("../../assert.js");

async function testEconomyFlow() {
  console.log("\n=== ECONOMY FLOW TEST ===");

  // reset fake DB
  mockMongoDB.reset();

  // create fake user
  mockMongoDB.seedUser("user1", {
    balance: 1000,
  });

  // run command
  await runCommand({
    commandPath: "./src/commands/economy/work.js",

    userId: "user1",
  });

  // verify state
  const user = mockMongoDB.getUser("user1");

  console.log("Updated balance:", user.balance);

  // assert result
  expectEqual("Work command adds money", user.balance > 1000, true);

  console.log("\n🎉 Scenario complete");
}

module.exports = {
  testEconomyFlow,
};
