const LEVEL_BASE = 100;

module.exports = {
  getXpMultiplier(user) {
    const now = Date.now();

    const active = user.activeEffects || [];

    const multipliers = active
      .filter((e) => e.type === "xp_multiplier" && e.expiresAt > now)
      .map((e) => e.value);

    if (multipliers.length === 0) return 1;

    return multipliers.reduce((a, b) => a * b, 1);
  },

  calculateLevel(xp) {
    return Math.floor(Math.sqrt(xp / LEVEL_BASE));
  },

  xpForNextLevel(level) {
    return Math.pow(level + 1, 2) * LEVEL_BASE;
  },

  cleanExpiredEffects(user) {
    const now = Date.now();

    user.activeEffects = (user.activeEffects || []).filter(
      (e) => e.expiresAt > now,
    );
  },
};
