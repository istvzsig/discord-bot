const mongoose = require("mongoose");
const User = require("./models/User");
const shopItems = require("../config/shopItems");

const shopService = {
  getItem(itemId) {
    return shopItems.find((i) => i.id === itemId);
  },

  async buyItem(userId, itemId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
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

      // ❌ insufficient funds
      if (user.balance < item.price) {
        await session.abortTransaction();
        session.endSession();
        return { error: "Not enough coins" };
      }

      // 💸 deduct balance
      user.balance -= item.price;

      // 🎒 add item
      user.inventory.push({
        itemId: item.id,
        name: item.name,
        type: item.type,
        purchasedAt: new Date(),
      });

      await user.save({ session });

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        item,
      };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      return { error: "Transaction failed" };
    }
  },
};

module.exports = shopService;
