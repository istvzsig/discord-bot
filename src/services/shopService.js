const mongoose = require("mongoose");

const User = require("../database/models/User.js");
const registry = require("../items/itemRegistry.js");

module.exports = {
  getItem(itemId) {
    return registry.get(itemId);
  },

  async buyItem(userId, itemId) {
    let session = null;

    // ========================
    // SESSION HANDLING
    // ========================
    if (!process.env.NODE_ENV === "test") {
      session = await mongoose.startSession();
      session.startTransaction();
    }

    try {
      const item = this.getItem(itemId);

      if (!item) {
        if (session) {
          await session.abortTransaction();
          session.endSession();
        }
        return { error: "Item not found" };
      }

      const user = await User.findOne(
        { userId },
        null,
        session ? { session } : undefined,
      );

      if (!user) {
        if (session) {
          await session.abortTransaction();
          session.endSession();
        }
        return { error: "User not found" };
      }

      if (user.balance < item.price) {
        if (session) {
          await session.abortTransaction();
          session.endSession();
        }
        return { error: "Not enough coins" };
      }

      // ========================
      // TRANSACTION LOGIC
      // ========================
      user.balance -= item.price;

      user.inventory.push({
        itemId: item.id,
        name: item.name,
        type: item.category,
        purchasedAt: new Date(),
      });

      await user.save(session ? { session } : undefined);

      if (session) {
        await session.commitTransaction();
        session.endSession();
      }

      return {
        success: true,
        item,
      };
    } catch (err) {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      console.error("BUY ERROR:", err);
      return { error: "Transaction failed" };
    }
  },
};
