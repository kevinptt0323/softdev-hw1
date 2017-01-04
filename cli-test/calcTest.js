let { isVal } = require('../calc');

QUnit.test("value", assert => {
  assert.strictEqual(isVal(['val', 0]),  true, 'zero');
  assert.strictEqual(isVal(['val', 1]),  true, 'positive number');
  assert.strictEqual(isVal(['val', -1]), true, 'negative number');
});
QUnit.test("non-value", assert => {
  assert.strictEqual(isVal(['oper', 'add']), false, 'operator +');
  assert.strictEqual(isVal(['oper', 'mod']), false, 'operator %');
});
