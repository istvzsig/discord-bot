function expectEqual(label, actual, expected) {
  if (actual !== expected) {
    console.error(`❌ FAIL: ${label}`);

    console.error(`Expected: ${expected}`);

    console.error(`Received: ${actual}`);

    process.exit(1);
  }

  console.log(`✅ PASS: ${label}`);
}

module.exports = {
  expectEqual,
};
