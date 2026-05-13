// Simple logger that adds ISO timestamp and respects DEBUG_MODE for debug-level messages
function _timestamp() {
  return new Date().toISOString();
}

function debug(msg, meta) {
  if (!DEBUG_MODE) return;
  if (meta !== undefined) {
    console.debug(`[DEBUG] ${_timestamp()} - ${msg}`, meta);
  } else {
    console.debug(`[DEBUG] ${_timestamp()} - ${msg}`);
  }
}

function info(msg, meta) {
  if (meta !== undefined) {
    console.info(`[INFO]  ${_timestamp()} - ${msg}`, meta);
  } else {
    console.info(`[INFO]  ${_timestamp()} - ${msg}`);
  }
}

function warn(msg, meta) {
  if (meta !== undefined) {
    console.warn(`[WARN]  ${_timestamp()} - ${msg}`, meta);
  } else {
    console.warn(`[WARN]  ${_timestamp()} - ${msg}`);
  }
}

function error(msg, meta) {
  if (meta !== undefined) {
    console.error(`[ERROR] ${_timestamp()} - ${msg}`, meta);
  } else {
    console.error(`[ERROR] ${_timestamp()} - ${msg}`);
  }
}

module.exports = {
  debug,
  info,
  warn,
  error,
};
