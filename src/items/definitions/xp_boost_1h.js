module.exports = {
  id: "xp_boost_1h",
  name: "1 Hour XP Booster",
  category: "consumable",
  rarity: "common",
  price: 250,
  effects: [
    {
      type: "xp_multiplier",
      value: 1.5,
      duration_seconds: 3600,
    },
  ],

  usage_rules: {
    cooldown_seconds: 0,
    stack_behavior: "refresh_duration",
    tradable: false,
  },

  bound_to_account: true,
};
