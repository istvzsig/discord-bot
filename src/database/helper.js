async function getUser(client, userId) {
  return await client.db.users.ensure(userId);
}

module.exports = {
  getUser,
};
