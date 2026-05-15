const mockMongoDB = require("../mockMongoDB.js");

const { runCommand } = require("../../runCommand.js");
const { expectEqual } = require("../../assert.js");

async function testWorkFlow() {
  const initialBalance = 1000;

  console.log("\n=== WORK FLOW TEST ===");

  // ========================
  // RESET FAKE DATABASE
  // ========================
  mockMongoDB.reset();

  // ========================
  // CREATE FAKE USER
  // ========================
  mockMongoDB.seedUser("user1", {
    balance: initialBalance,
  });
  console.log("Initial balance:", initialBalance);

  // ========================
  // RUN COMMAND
  // ========================
  await runCommand({
    commandPath: "./src/commands/economy/work.js",
    userId: "user1",
  });

  // ========================
  // VERIFY STATE
  // ========================
  const user = mockMongoDB.getUser("user1");
  console.log("Updated balance:", user.balance);

  // ========================
  // ASSERTIONS
  // ========================
  expectEqual("Work command adds money", user.balance > initialBalance, true);
}

module.exports = {
  testWorkFlow,
};
