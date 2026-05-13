const users = new Map();

function seedUser(userId, data = {}) {
  users.set(userId, {
    userId,
    balance: 1000,
    xp: 0,
    level: 1,
    inventory: [],
    ...data,
  });
}

const User = {
  async findOne(query) {
    return users.get(query.userId) || null;
  },

  async create(data) {
    users.set(data.userId, {
      userId: data.userId,
      balance: 0,
      xp: 0,
      level: 0,
      inventory: [],
      ...data,
    });

    return users.get(data.userId);
  },

  async updateOne(query, update) {
    const user = users.get(query.userId);
    if (!user) return;

    Object.assign(user, update.$set || {});
    return user;
  },

  _dump() {
    return [...users.values()];
  },
};

module.exports = {
  User,
  seedUser,
};
