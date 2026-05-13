const users = new Map();

function createMockUser(data = {}) {
  return {
    userId: data.userId,

    balance: data.balance ?? 0,

    xp: data.xp ?? 0,

    level: data.level ?? 1,

    inventory: data.inventory ?? [],

    async save() {
      users.set(this.userId, this);
      return this;
    },
  };
}

const User = {
  async findOne(query) {
    return users.get(query.userId) || null;
  },

  async create(data) {
    const user = createMockUser(data);

    users.set(user.userId, user);

    return user;
  },
};

function seedUser(userId, data = {}) {
  const user = createMockUser({
    userId,
    ...data,
  });

  users.set(userId, user);
}

function getUser(userId) {
  return users.get(userId);
}

function reset() {
  users.clear();
}

module.exports = {
  User,
  seedUser,
  getUser,
  reset,
};
