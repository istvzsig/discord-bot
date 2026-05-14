process.env.NODE_ENV = "test";

const mongoose = require("mongoose");

// ========================
// MOCK MONGOOSE
// ========================
mongoose.connect = async () => {};

mongoose.startSession = async () => ({
  startTransaction() {},
  commitTransaction() {},
  abortTransaction() {},
  endSession() {},
});

// ========================
// MOCK DB
// ========================
const mockMongoDB = require("./src/__test__/mocks/mockMongoDB.js");

require.cache[require.resolve("./src/database/models/User.js")] = {
  exports: mockMongoDB.User,
};

// ========================
// TEST CASES
// ========================
const { testWorkFlow } = require("./src/__test__/mocks/scenarios/workFlow.js");

const { testShopFlow } = require("./src/__test__/mocks/scenarios/shopFlow.js");

async function runTests() {
  console.log("\n======================");
  console.log(" RUNNING ALL TESTS");
  console.log("======================\n");

  const tests = [
    testWorkFlow,
    testShopFlow,
    // add more tests
  ];

  for (const test of tests) {
    try {
      await test();
    } catch (err) {
      console.error("\n❌ TEST FAILED");
      console.error(err);
      process.exit(1);
    }
  }

  console.log("\n======================");
  console.log(" ALL TESTS PASSED");
  console.log("======================\n");
}

runTests().catch((err) => {
  console.error("ERROR", err);
  process.exit(1);
});
