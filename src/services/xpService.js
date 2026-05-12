const LEVEL_BASE = 100;

function getXpMultiplier(user) {
  const now = Date.now();

  const active = user.activeEffects || [];

  const multipliers = active
    .filter((e) => e.type === "xp_multiplier" && e.expiresAt > now)
    .map((e) => e.value);

  if (multipliers.length === 0) return 1;

  return multipliers.reduce((a, b) => a * b, 1);
}

function calculateLevel(xp) {
  return Math.floor(Math.sqrt(xp / LEVEL_BASE));
}

function xpForNextLevel(level) {
  return Math.pow(level + 1, 2) * LEVEL_BASE;
}

function cleanExpiredEffects(user) {
  const now = Date.now();

  user.activeEffects = (user.activeEffects || []).filter(
    (e) => e.expiresAt > now,
  );
}

module.exports = {
  getXpMultiplier,
  calculateLevel,
  xpForNextLevel,
  cleanExpiredEffects,
};
