QUnit.module("Array.prototype.back", () => {
  QUnit.test("basic usage", assert => {
    assert.strictEqual([1,2,3].back(), 3, 'integer case');
    assert.strictEqual(['ccc'].back(), 'ccc', 'string case');
    const obj = { foo: 'foo', bar: 'bar' };
    const obj2 = { foo: 'foo', bar: 'bar' };
    assert.deepEqual([obj].back(), obj2, 'object case');
  });
});

QUnit.module("isVal", () => {
  QUnit.test("value", assert => {
    assert.strictEqual(isVal(['val', 0]),  true, 'zero');
    assert.strictEqual(isVal(['val', 1]),  true, 'positive number');
    assert.strictEqual(isVal(['val', -1]), true, 'negative number');
  });
  QUnit.test("non-value", assert => {
    assert.strictEqual(isVal(['oper', 'add']), false, 'operator +');
    assert.strictEqual(isVal(['oper', 'mod']), false, 'operator %');
  });
});

QUnit.module("isOper", () => {
  QUnit.test("value", assert => {
    assert.strictEqual(isOper(['oper', 'add']), true, 'operator +');
    assert.strictEqual(isOper(['oper', 'mod']), true, 'operator %');
  });
  QUnit.test("non-value", assert => {
    assert.strictEqual(isOper(['val', 0]),  false, 'zero');
    assert.strictEqual(isOper(['val', 1]),  false, 'positive number');
    assert.strictEqual(isOper(['val', -1]), false, 'negative number');
  });
});

QUnit.module("class Calc", () => {
  QUnit.module("reset", () => {
    let testBase = (QUnit, base) => {
      QUnit.test(`Base ${base}`, assert => {
        let calc = new Calc();
        calc.reset(base);
        assert.strictEqual(calc.base, base, "base equals to parameter");
        assert.strictEqual(calc.value, 0, "value equals to 0");
        assert.strictEqual(calc.calc, false, "calc must be false");
        assert.deepEqual(calc.buffer, [['val', 0]], "reset buffer");

        calc.value = 123;
        calc.calc = true;
        calc.buffer = [['val', 123]];
        calc.reset();
        assert.strictEqual(calc.base, base, "keep base if reset without parameter");
        assert.strictEqual(calc.value, 0, "value resets to 0");
        assert.strictEqual(calc.calc, false, "calc resets false");
        assert.deepEqual(calc.buffer, [['val', 0]], "reset buffer");
      });
    };
    testBase(QUnit, 10);
    testBase(QUnit, 16);
    testBase(QUnit, 8);
    testBase(QUnit, 2);
  });
  QUnit.module("toString", () => {
    QUnit.test('zero', assert => {
      let calc = new Calc();
      assert.deepEqual(calc.toString(10), '0', "toString(10)");
      assert.deepEqual(calc.toString(16), '0', "toString(16)");
      assert.deepEqual(calc.toString(8), '0', "toString(8)");
      assert.deepEqual(calc.toString(2), '0', "toString(2)");
    });
    QUnit.test('positive number', assert => {
      let calc = new Calc();
      calc.value = 87;
      assert.deepEqual(calc.toString(10), '87', "toString(10)");
      assert.deepEqual(calc.toString(16), '57', "toString(16)");
      assert.deepEqual(calc.toString(8), '127', "toString(8)");
      assert.deepEqual(calc.toString(2), '1010111', "toString(2)");
    });
    QUnit.test('negative number', assert => {
      let calc = new Calc();
      calc.value = -87;
      assert.deepEqual(calc.toString(10), '-87', "toString(10)");
      assert.deepEqual(calc.toString(16), 'ffa8', "toString(16)");
      assert.deepEqual(calc.toString(8), '177650', "toString(8)");
      assert.deepEqual(calc.toString(2), '1111111110101001', "toString(2)");
    });
  });
  QUnit.module("exec", () => {
    QUnit.test("val", assert => {
      let calc = new Calc();
      calc.exec("val-1");
      assert.strictEqual(calc.value, 1, "single digit");
      calc.exec("val-3");
      assert.strictEqual(calc.value, 13, "multiple digits");

      calc.base = 8;
      calc.exec("val-7");
      assert.strictEqual(calc.value, 111, "change base to 8");

      calc.base = 2;
      calc.exec("val-0");
      assert.strictEqual(calc.value, 222, "change base to 2");

      calc.base = 16;
      calc.exec("val-f");
      assert.strictEqual(calc.value, 3567, "change base to 16");

      assert.deepEqual(calc.buffer, [['val', 3567]], "buffer changed");
    });

    QUnit.test("oper", assert => {
      let calc = new Calc();
      calc.exec("val-1");
      calc.exec("val-3");
      calc.exec("oper-add");
      assert.strictEqual(calc.value, 13, "display doesn't change");

      calc.exec("val-1");
      calc.exec("val-7");
      assert.deepEqual(calc.buffer, [['val', 13], ['oper', 'add'], ['val', 17]], "single operator");
      assert.strictEqual(calc.value, 17, "display changes to the new value");

      calc.exec("oper-mul");
      calc.exec("val-9");
      assert.deepEqual(calc.buffer, [['val', 13], ['oper', 'add'], ['val', 17], ['oper', 'mul'], ['val', 9]], "multiple operators");
    });

    QUnit.test("negative", assert => {
      let calc = new Calc();
      calc.exec("val-1");
      calc.exec("val-3");
      calc.exec("neg");
      assert.strictEqual(calc.value, -13, "negative number under base 10");

      calc.reset(16);
      calc.exec("val-1");
      calc.exec("val-3");
      calc.exec("neg");
      assert.strictEqual(calc.value, -19, "negative number under base 16");

      calc.reset(8);
      calc.exec("val-1");
      calc.exec("val-3");
      calc.exec("neg");
      assert.strictEqual(calc.value, -11, "negative number under base 8");

      calc.reset(2);
      calc.exec("val-1");
      calc.exec("val-0");
      calc.exec("val-1");
      calc.exec("neg");
      assert.strictEqual(calc.value, -5, "negative number under base 2");
    });

    QUnit.test("backspace", assert => {
      let calc = new Calc();
      calc.exec("val-1");
      calc.exec("val-3");
      calc.exec("bs");
      assert.strictEqual(calc.value, 1, "positive number");
      calc.exec("bs");
      assert.strictEqual(calc.value, 0, "single digit");
      calc.exec("bs");
      assert.strictEqual(calc.value, 0, "zero");

      calc.reset();
      calc.exec("val-1");
      calc.exec("val-3");
      calc.exec("neg");
      calc.exec("bs");
      assert.strictEqual(calc.value, -1, "negative number");
      calc.exec("bs");
      assert.strictEqual(calc.value, 0, "single digit negative number");

      calc.reset(16);
      calc.exec("val-a");
      calc.exec("val-b");
      calc.exec("bs");
      assert.strictEqual(calc.value, 10, "unber other bases");
    });

    QUnit.test("calc", assert => {
      let testCalc = (assert, cmds, expected, message) => {
        let calc = new Calc();
        cmds.forEach(cmd => calc.exec(cmd));
        calc.exec("calc");
        assert.strictEqual(calc.value, expected, message);
        assert.strictEqual(calc.calc, true);
        assert.deepEqual(calc.buffer, [['val', expected]]);
      };
      testCalc(assert, ["val-1", "oper-add", "val-2", "oper-sub", "val-3"], 0, "add/sub operators");
      testCalc(assert, ["val-1", "oper-mul", "val-2", "oper-mul", "val-3"], 6, "mul operators");
      testCalc(assert, ["val-1", "oper-add", "val-2", "oper-mul", "val-3"], 7, "add+mul operators");
      testCalc(assert, ["val-1", "oper-add"], 2, "not complete operands");
    });

    QUnit.test("c", assert => {
      let calc = new Calc();
      calc.exec("val-1");
      calc.exec("oper-add");
      calc.exec("val-1");
      calc.exec("calc");
      calc.exec("c");
      assert.strictEqual(calc.base, 10, "base doesn't change");
      assert.strictEqual(calc.value, 0, "value resets to 0");
      assert.strictEqual(calc.calc, false, "calc resets false");
      assert.deepEqual(calc.buffer, [['val', 0]], "reset buffer");
    });

    QUnit.test("ce", assert => {
      let calc = new Calc();
      calc.exec("val-1");
      calc.exec("oper-add");
      calc.exec("val-1");
      calc.exec("val-2");
      calc.exec("ce");
      calc.exec("val-9");
      assert.deepEqual(calc.buffer, [['val', 1], ['oper', 'add'], ['val', 9]], "clear last value");
    });
  });
});

QUnit.module("evaluate", () => {
  let testEval = (assert, arr, expected, message) => {
    assert.strictEqual(evaluate(arr), expected, message);
  };
  QUnit.test("positive numbers", assert => {
    testEval(assert, [['val', 1]], 1, "value");
    testEval(assert, [['val', 1], ['oper', 'add'], ['val', 5]], 6, "add operator");
    testEval(assert, [['val', 9], ['oper', 'sub'], ['val', 1]], 8, "sub operator");
    testEval(assert, [['val', 9], ['oper', 'mul'], ['val', 8]], 72, "mul operator");
    testEval(assert, [['val', 18], ['oper', 'div'], ['val', 3]], 6, "div operator");
    testEval(assert, [['val', 18], ['oper', 'mod'], ['val', 5]], 3, "mod operator");
    testEval(assert, [['val', 1], ['oper', 'add'], ['val', 20], ['oper', 'sub'], ['val', 3]], 18, "add and sub");
    testEval(assert, [['val', 1], ['oper', 'add'], ['val', 2], ['oper', 'mul'], ['val', 3]], 7, "add and mul");
    testEval(assert, [['val', 6], ['oper', 'div'], ['val', 2], ['oper', 'mod'], ['val', 2]], 1, "div and mod");
  });
  QUnit.test("positive and negative numbers", assert => {
    testEval(assert, [['val', -3]], -3, "value");
    testEval(assert, [['val', -1], ['oper', 'add'], ['val', -5]], -6, "add operator");
    testEval(assert, [['val', -9], ['oper', 'sub'], ['val', 1]], -10, "sub operator");
    testEval(assert, [['val', -9], ['oper', 'sub'], ['val', -1]], -8, "sub operator with both negative operands");
    testEval(assert, [['val', 9], ['oper', 'mul'], ['val', -8]], -72, "mul operator");
    testEval(assert, [['val', -9], ['oper', 'mul'], ['val', -8]], 72, "mul operator with both negative operands");
    testEval(assert, [['val', 18], ['oper', 'div'], ['val', -3]], -6, "div operator");
    testEval(assert, [['val', -18], ['oper', 'div'], ['val', -3]], 6, "div operator with both negative operands");
    testEval(assert, [['val', -18], ['oper', 'mod'], ['val', 5]], -3, "mod operator");
    testEval(assert, [['val', 1], ['oper', 'add'], ['val', -2], ['oper', 'mul'], ['val', 3]], -5, "add and mul");
  });
});
