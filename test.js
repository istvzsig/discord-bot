const path = require("path");

const mockDB = require("./src/test/mocks/mockMongoDB.js");

mockDB.seedUser("123456789", {
  balance: 1000,
});

require.cache[require.resolve("./src/database/models/User")] = {
  exports: mockDB.User,
};

const {
  runEconomyFlowTest,
} = require("./src/test/mocks/scenarios/economyFlow.js");

async function test() {
  await runEconomyFlowTest();
}

test().catch((err) => {
  console.error("ERROR", err);
  process.exit(1);
});
