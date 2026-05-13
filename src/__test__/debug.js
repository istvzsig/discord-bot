function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function printState(title, state) {
  console.log(`\n[${title}]`);

  console.dir(state, {
    depth: null,
    colors: true,
  });
}

function diff(before, after) {
  const changes = {};

  for (const key of Object.keys(after)) {
    const beforeValue = JSON.stringify(before[key]);

    const afterValue = JSON.stringify(after[key]);

    if (beforeValue !== afterValue) {
      changes[key] = {
        before: before[key],
        after: after[key],
      };
    }
  }

  return changes;
}

function printDiff(before, after) {
  const changes = diff(before, after);

  console.log("\n[DIFF]");

  if (Object.keys(changes).length === 0) {
    console.log("No changes");
    return;
  }

  console.dir(changes, {
    depth: null,
    colors: true,
  });
}

module.exports = {
  clone,
  printState,
  printDiff,
};
