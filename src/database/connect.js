const mongoose = require("mongoose");

const { MONGO_URI } = require("../config/config.js");
const logger = require("../utils/logger.js");

module.exports = async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB connected successfully");
  } catch (err) {
    logger.error("Connection failed:", err);
    process.exit(1);
  }
};
