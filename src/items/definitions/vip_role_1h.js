module.exports = {
  id: "vip_role_1h",
  name: "1 Hour VIP role",
  category: "consumable",
  rarity: "common",
  price: 750,
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
