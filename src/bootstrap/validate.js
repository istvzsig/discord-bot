const logger = require("../utils/logger.js");

module.exports = (client) => {
  logger.info("Running startup validation...");

  // =========================
  // 1. Commands
  // =========================
  const commandCount = client.commands?.size || 0;

  if (commandCount === 0) {
    throw new Error("❌ No commands loaded!");
  }

  logger.info(`Commands loaded: ${commandCount}`);

  // =========================
  // 2. Events
  // =========================
  const requiredEvents = ["interactionCreate", "clientReady"];

  const loaded = client._loadedEvents || new Set();

  const missing = requiredEvents.filter((event) => !loaded.has(event));

  if (missing.length > 0) {
    throw new Error(`❌ Missing critical events: ${missing.join(", ")}`);
  }

  logger.info(`Core events registered: ${loaded.size}`);

  // =========================
  // 3. Registry
  // =========================
  try {
    const registry = require("../items/itemRegistry");
    const items = registry.getAll?.() || [];

    logger.info(`Items loaded: ${items.length}`);
  } catch (err) {
    throw new Error("❌ Item registry failed to load");
  }

  logger.info("Startup validation passed");
};
