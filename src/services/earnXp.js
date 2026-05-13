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

    let levelUp = false;

    if (newLevel > user.level) {
      user.level = newLevel;
      levelUp = true;
    }

    await user.save();

    return {
      gained,
      levelUp,
      level: user.level,
    };
  },
};
