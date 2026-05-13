module.exports = {
  createMockInteraction({
    userId = "test-user",
    commandName = "unknown",
    options = {},
  } = {}) {
    return {
      commandName,

      user: {
        id: userId,
        username: "Tester",
      },

      memberPermissions: {
        has: () => true,
      },

      guild: {
        ownerId: userId,
      },

      options: {
        getString(name) {
          return options[name];
        },

        getInteger(name) {
          return options[name];
        },

        getUser(name) {
          return options[name];
        },
      },

      async reply(payload) {
        console.log("\n=== BOT REPLY ===");

        console.dir(payload, {
          depth: null,
        });
      },

      async followUp(payload) {
        console.log("\n=== FOLLOWUP ===");

        console.dir(payload, {
          depth: null,
        });
      },
    };
  },
};
