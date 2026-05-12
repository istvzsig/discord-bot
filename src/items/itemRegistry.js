const fs = require("fs");
const path = require("path");

const items = new Map();

module.exports = {
  load() {
    const files = fs.readdirSync(path.join(__dirname, "definitions"));

    for (const file of files) {
      const item = require(`./definitions/${file}`);
      this.items.set(item.id, item);
    }
  },

  get(id) {
    return this.items.get(id);
  },

  getAll() {
    return [...this.items.values()];
  },
};
