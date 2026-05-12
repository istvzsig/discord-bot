# Item system

## Overview

Defines responsibilities and categories for items in the system: Economy, Game, Utility, Consumables. Includes typical effects, usage logic, schema, implementation notes, and copiable item snippets.

---

## Categories & Capabilities

### Economy items

- Definition: Items that affect in-game currency or store transactions.
- Typical effects:
  - **Money multiplier:** temporarily increases currency earned (e.g., x2 for 1 hour).
  - **Discount coupon:** reduces shop prices by a percentage or fixed amount.
  - **Flat bonus:** grants immediate currency on use.
- Usage logic:
  - Stack rules: multiplicative stacking or single-best-applies.
  - Cooldowns and durations: define duration, cooldown, and persistence across sessions.
  - Trade/transfer: specify whether tradable or bound.

### Game items

- Definition: Items that affect progression or gameplay mechanics.
- Typical effects:
  - **XP booster:** increases experience gain by percent for a duration.
  - **Level boost:** grants instant level(s) or partial level progress.
  - **Cooldown skip:** immediately resets ability/item cooldowns.
- Usage logic:
  - Restrictions: account-bound, level caps, or class restrictions.
  - Safeguards: prevent abuse in competitive modes.
  - Persistence: temporary buffs vs permanent changes.

### Utility items

- Definition: Items granting non-gameplay permissions or roles.
- Typical effects:
  - **Role grant:** assigns a user role for a duration or permanently.
  - **Access permission:** unlocks restricted features or areas.
  - **Channel unlock:** grants access to private channels or content.
- Usage logic:
  - Revocation: automatic role removal after duration.
  - Scope: global vs guild/server-specific.
  - Security: verify permissions before granting.

### Consumables

- Definition: Single-use or limited-use items consumed on activation.
- Typical effects:
  - **One-time use items:** immediate effect then removed.
  - **Crates / loot boxes:** grant randomized rewards; define rarity tables.
- Usage logic:
  - Drop tables: specify probabilities and guarantee mechanics (e.g., pity timers).
  - Opening rules: instant vs animated opening, tradeability of contents.
  - Fraud prevention: logging, anti-cheat, and rate limits.

---

## Implementation Notes

- Item schema (recommended fields): id, name, category, rarity, effects[], usage_rules{}, tradable(bool), bound_to_account(bool), cooldowns{}, duration_seconds{}
- Effect resolution order: explicit priority for overlapping effects (e.g., multiplier → additive → cap).
- Auditing & logging: record item grants, uses, trades, and rollback capability.
- Balance considerations: caps, diminishing returns, anti-abuse (cooldowns, per-day limits).
- Localization: translatable item names/descriptions and numeric formatting.
- Testing: unit tests for effect interactions, integration tests for economy impacts.

---

## Suggested schema types (concise)

- id: string
- name: string
- category: enum["economy","game","utility","consumable","offensive","defensive"]
- rarity: enum["common","uncommon","rare","epic","legendary"]
- effects: array of effect objects { type: string, value: number|string|object, duration_seconds?: number, chance_percent?: number }
- usage_rules: object { usable_in_combat: bool, use_time_seconds: number, cooldown_seconds: number, stack_behavior: string, tradable: bool }
- bound_to_account: bool
- metadata: object (tags, icons, locale_keys)

---

## Example item JSON

```json
{
  "id": "xp_boost_1h",
  "name": "1-Hour XP Booster",
  "category": "game",
  "rarity": "common",
  "effects": [
    { "type": "xp_multiplier", "value": 1.5, "duration_seconds": 3600 }
  ],
  "usage_rules": {
    "stacking": "multiplicative",
    "cooldown_seconds": 0,
    "tradable": false
  },
  "bound_to_account": true
}
```

---

## Copiable item definitions + usage logic + effects

### Small Health Potion

- id: health_potion_small
- name: Small Health Potion
- category: consumable
- rarity: common
- effects:
  - restores_hp: 50
  - removes_status: ["minor_bleed"]
- usage_rules:
  - usable_in_combat: true
  - use_time_seconds: 1
  - cooldown_seconds: 10
  - stack_behavior: "single_use_per_action"
- tradable: false
- bound_to_account: true

### Large Health Potion

- id: health_potion_large
- name: Large Health Potion
- category: consumable
- rarity: uncommon
- effects:
  - restores_hp: 250
  - grants_damage_resistance: { percent: 10, duration_seconds: 5 }
- usage_rules:
  - usable_in_combat: true
  - use_time_seconds: 2
  - immobilizes_on_use: true
  - cooldown_seconds: 30
  - stack_behavior: "single_use"
- tradable: false
- bound_to_account: true

### Mana Tonic

- id: mana_tonic
- name: Mana Tonic
- category: consumable
- rarity: common
- effects:
  - restores_mp: 75
  - on_full_mp:
    grant_buff:
    type: "spell_power"
    value_percent: 15
    duration_seconds: 10
    reduce_mp: 10
- usage_rules:
  - usable_in_combat: false
  - use_time_seconds: 0
  - cooldown_seconds: 0
- tradable: false
- bound_to_account: true

### Ether Bottle

- id: ether_bottle
- name: Ether Bottle
- category: consumable
- rarity: rare
- effects:
  - restores_mp_percent: 100
  - applies_cooldown_on_mana_items_seconds: 20
- usage_rules:
  - usable_in_combat: true
  - use_time_seconds: 3
  - interruptible_by_damage: true
  - interrupted_effects:
    restores_mp_percent: 50
    refund_percent: 50
- tradable: false
- bound_to_account: true

### Speed Elixir

- id: speed_elixir
- name: Speed Elixir
- category: utility
- rarity: common
- effects:
  - movement_speed_percent: 30
  - removes_effects: ["slow"]
- usage_rules:
  - duration_seconds: 12
  - cooldown_seconds: 60
  - stack_behavior: "refresh_duration"
- tradable: true
- bound_to_account: false

### Invisibility Cloak (Consumable)

- id: invis_cloak_consume
- name: Invisibility Cloak (Consumable)
- category: utility
- rarity: rare
- effects:
  - grant_invisibility: { max_duration_seconds: 8, break_on_attack_or_hostile_ability: true }
  - movement_speed_percent_while_invisible: -10
- usage_rules:
  - activation_time_seconds: 1
  - cooldown_seconds: 180
- tradable: true
- bound_to_account: false

### Recall Rune

- id: recall_rune
- name: Recall Rune
- category: utility
- rarity: uncommon
- effects:
  - teleport_to_last_waypoint: true
  - arrival_stun_seconds_if_in_combat_zone: 2
- usage_rules:
  - channel_time_seconds: 4
  - interruptible_by_damage_or_movement: true
  - cooldown_seconds: 600
- tradable: false
- bound_to_account: true

### Throwing Knife

- id: throwing_knife
- name: Throwing Knife
- category: offensive
- rarity: common
- effects:
  - single_target_physical_damage: 75
  - chance_apply: { status: "bleed", chance_percent: 25, duration_seconds: 3, dps: 10 }
- usage_rules:
  - use_time_seconds: 0
  - reuse_timer_seconds: 2
  - stack_limit: 20
- tradable: true
- bound_to_account: false

### Fire Bomb

- id: fire_bomb
- name: Fire Bomb
- category: offensive
- rarity: uncommon
- effects:
  - area_damage: 150
  - ground_dot: { dps: 20, duration_seconds: 6 }
  - applies_status: { status: "burn", chance_percent: 100 }
- usage_rules:
  - use_time_seconds: 0.5
  - explode_after_seconds: 2
  - reuse_timer_seconds: 2
- tradable: true
- bound_to_account: false

---

## Example effect resolution order

1. Apply fixed flat bonuses (additive).
2. Apply multiplicative multipliers.
3. Enforce caps and caps per-session.
4. Apply final rounding and display values.

---

## Auditing & Balance

- Log events: grant, consume, trade, transfer, rollback.
- Rate limits: per-minute/day use caps for powerful items.
- Pity mechanics: ensure minimal guaranteed rarity in crates after X opens.
- Anti-abuse: account binding, cooldown enforcement, server/guild rules for competitive modes.

---

## Testing checklist

- Unit tests for each effect type and stacking behavior.
- Integration tests for economy flows (earn/use/trade).
- Load tests for crate opening and logging.
- Localization checks for all text and numeric formats.

---

## Notes

- Use the suggested schema to generate TypeScript types or DB migrations.
- Adjust cooldowns, durations, and values to match game balance; prefer conservative defaults and iterate with telemetry.

[README](../../README.md#-economy)
