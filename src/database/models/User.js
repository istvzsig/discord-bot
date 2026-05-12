const mongoose = require("mongoose");

module.exports = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      unique: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    bank: {
      type: Number,
      default: 0,
    },

    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 0,
    },

    lastDaily: {
      type: Number,
      default: 0,
    },

    lastWork: {
      type: Number,
      default: 0,
    },

    inventory: {
      type: [
        {
          itemId: String,
          name: String,
          type: String,
          purchasedAt: Date,
        },
      ],
      default: [],
    },

    activeEffects: {
      type: Array,
      default: [],
    },

    transactions: {
      type: Array,
      default: [],
    },

    version: {
      type: Number,
      default: 1,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }),
);
