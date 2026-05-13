module.exports = {
  embeds: {
    success(msg) {
      return {
        type: "success",
        content: msg,
      };
    },

    error(msg) {
      return {
        type: "error",
        content: msg,
      };
    },

    info(msg) {
      return {
        type: "info",
        content: msg,
      };
    },
  },

  commands: new Map(),
};
