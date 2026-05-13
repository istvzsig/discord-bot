const {
  getXpMultiplier,
  calculateLevel,
  cleanExpiredEffects,
} = require("./xpService.js");

module.exports = {
  async addXp(user, baseXp) {
    cleanExpiredEffects(user);

    const multiplier = getXpMultiplier(user);

    const gained = Math.floor(baseXp * multiplier);

    user.xp += gained;

    const newLevel = calculateLevel(user.xp);

    let leveledUp = false;

    if (newLevel > user.level) {
      user.level = newLevel;
      leveledUp = true;
    }

    await user.save();

    return {
      gained,
      leveledUp,
      level: user.level,
    };
  },
};
