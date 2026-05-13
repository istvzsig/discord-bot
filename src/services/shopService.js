const mongoose = require("mongoose");

const User = require("../database/models/User.js");
const registry = require("../items/itemRegistry.js");

module.exports = {
  getItem(itemId) {
    return registry.get(itemId);
  },

  async buyItem(userId, itemId) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const item = this.getItem(itemId);

      if (!item) {
        await session.abortTransaction();
        session.endSession();
        return { error: "Item not found" };
      }

      const user = await User.findOne({ userId }, null, { session });

      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return { error: "User not found" };
      }

      if (user.balance < item.price) {
        await session.abortTransaction();
        session.endSession();
        return { error: "Not enough coins" };
      }

      user.balance -= item.price;

      user.inventory.push({
        itemId: item.id,
        name: item.name,
        type: item.category,
        purchasedAt: new Date(),
      });

      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      return { success: true, item };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      return { error: "Transaction failed" };
    }
  },
};
