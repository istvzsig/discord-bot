const mockMongoDB = require("../mockMongoDB.js");

const registry = require("../../../items/itemRegistry.js");
const { runCommand } = require("../../runCommand.js");
const { expectEqual } = require("../../assert.js");
const { clone, printState, printDiff } = require("../../debug.js");

async function testShopFlow() {
  const itemName = "vip_role_1h";
  const initialBalance = 5000;

  console.log("\n=== SHOP FLOW TEST ===");

  // ========================
  // LOAD ITEMS
  // ========================
  registry.load();

  // ========================
  // RESET FAKE DB
  // ========================
  mockMongoDB.reset();

  // ========================
  // CREATE FAKE USER
  // ========================
  mockMongoDB.seedUser("user1", {
    balance: initialBalance,
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
  await runCommand({
    commandPath: "./src/commands/economy/buy.js",
    userId: "user1",
    args: [itemName],
  });

  // ========================
  // AFTER STATE
  // ========================
  const after = clone(mockMongoDB.getUser("user1"));
  printState("AFTER", after);
  printDiff(before, after);

  // ========================
  // ASSERTIONS
  // ========================
  const itemPrice = registry.get(itemName)["price"];

  expectEqual(
    "Shop deducts balance",
    after.balance,
    before.balance - itemPrice,
  );
  expectEqual("Item added to inventory", after.inventory.length > 0, true);

  console.log("Items in the inventory:", ...after.inventory);
}

module.exports = {
  testShopFlow,
};
