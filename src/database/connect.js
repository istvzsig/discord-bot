const mongoose = require("mongoose");

const { MONGO_URI } = require("../config/config.js");
const logger = require("../utility/logger.js");

module.exports = async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("[DB] MongoDB connected successfully");
  } catch (err) {
    logger.error("[DB] Connection failed:", err);
    process.exit(1);
  }
};
