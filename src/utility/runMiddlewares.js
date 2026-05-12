module.exports = async function runMiddlewares(
  middlewares,
  interaction,
  command,
  client,
) {
  for (const middleware of middlewares) {
    const stop = await middleware(interaction, command, client);

    if (stop) {
      return true;
    }
  }

  return false;
};
