const mockMongoDB = require("../mockMongoDB.js");

const { runCommand } = require("../../runCommand.js");
const { expectEqual } = require("../../assert.js");
const { clone, printState, printDiff } = require("../../debug.js");
const registry = require("../../../items/itemRegistry.js");

async function testShopFlow() {
  console.log("\n=== SHOP FLOW TEST ===");

  registry.load();
  mockMongoDB.reset();

  mockMongoDB.seedUser("user1", {
    balance: 5000,
    inventory: [],
  });

  // ========================
  // BEFORE STATE
  // ========================

  const before = clone(mockMongoDB.getUser("user1"));

  // printState("BEFORE", before);

  // ========================
  // RUN COMMAND
  // ========================

  const itemName = "vip_role_1h";

  await runCommand({
    commandPath: "./src/commands/economy/buy.js",
    userId: "user1",
    args: [itemName],
  });

  // ========================
  // AFTER STATE
  // ========================

  const after = clone(mockMongoDB.getUser("user1"));

  // printState("AFTER", after);
  // printDiff(before, after);

  // ========================
  // ASSERTIONS
  // ========================

  expectEqual(
    "Shop deducts balance",
    after.balance,
    before.balance - registry.get(itemName).price,
  );
  expectEqual("Item added to inventory", after.inventory.length, 1);

  console.log("\n🎉 Scenario complete");
}

module.exports = {
  testShopFlow,
};
