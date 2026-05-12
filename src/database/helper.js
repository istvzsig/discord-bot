async function getUser(client, userId) {
  if (!client.db || !client.db.users) {
    throw new Error("DB not initialized on client.db");
  }

  return await client.db.users.ensure(userId);
}

module.exports = { getUser };
