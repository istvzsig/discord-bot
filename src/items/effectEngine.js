module.exports = {
  async apply(user, item) {
    for (const effect of item.effects) {
      switch (effect.type) {
        case "xp_multiplier":
          user.activeEffects = user.activeEffects || [];

          user.activeEffects.push({
            type: "xp_multiplier",
            value: effect.value,
            expiresAt: Date.now() + effect.duration_seconds * 1000,
          });
          break;

        case "balance_flat":
          user.balance += effect.value;
          break;

        case "role_grant":
          // handled via guild logic later
          break;

        default:
          console.warn("Unknown effect:", effect.type);
      }
    }

    return user;
  },
};
