QUnit.module("help", () => {
  QUnit.test("opened by help button, closed by help button", assert => {
    let done = assert.async();
    let $btn = $('.help-btn');
    let $wrapper = $('.help-wrapper');

    $btn.trigger('click');
    setTimeout(() => {
      assert.ok($wrapper.css('display').indexOf('none') == -1, "open correctly");
      $btn.trigger('click');
      setTimeout(() => {
        assert.ok($wrapper.css('display').indexOf('none') >= 0, "close correctly");
        done();
      }, 500);
    }, 500);
  });
  QUnit.test("opened by help button, closed by help wrapper", assert => {
    let done = assert.async();
    let $btn = $('.help-btn');
    let $wrapper = $('.help-wrapper');

    $btn.trigger('click');
    setTimeout(() => {
      assert.ok($wrapper.css('display').indexOf('none') == -1, "open correctly");
      $wrapper.trigger('click');
      setTimeout(() => {
        assert.ok($wrapper.css('display').indexOf('none') >= 0, "close correctly");
        done();
      }, 500);
    }, 500);
  });
});

QUnit.module("render", () => {
  QUnit.module("base 10", () => {
    QUnit.test("initial", assert => {
      let calc = new Calc();
      render({calc});
      assert.strictEqual($('.display .value').html(), '0', "main display");
      assert.strictEqual($('.base.hex').html(), '0', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '0', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '0', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '0', "base 2 display");
      assert.strictEqual($('.button.hex:not(.disabled)').length, 0, "disable hex buttons");
      assert.strictEqual($('.button.dec.disabled').length, 0, "enable dec buttons");
      assert.strictEqual($('.button.oct.disabled').length, 0, "enable oct buttons");
      assert.strictEqual($('.button.bin.disabled').length, 0, "enable bin buttons");
    });

    QUnit.test("positive number", assert => {
      let calc = new Calc();
      calc.buffer = [['val', 12]];
      calc.value = 12;
      render({calc});
      assert.ok($('.calc').hasClass('dec'), '.calc hasClass .dec');
      assert.strictEqual($('.display .value').html(), '12', "main display");
      assert.strictEqual($('.base.hex').html(), 'c', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '12', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '14', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '1100', "base 2 display");
    });

    QUnit.test("negative number", assert => {
      let calc = new Calc();
      calc.buffer = [['val', -12]];
      calc.value = -12;
      render({calc});
      assert.strictEqual($('.display .value').html(), '-12', "main display");
      assert.strictEqual($('.base.hex').html(), 'fff3', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '-12', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '177763', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '1111111111110100', "base 2 display");
    });

    QUnit.test("operator clicked", assert => {
      let calc = new Calc();
      calc.buffer = [['val', 12], ['oper', 'add']];
      calc.value = 12;
      render({calc});
      assert.strictEqual($('.display .value').html(), '12', "main display");
      assert.strictEqual($('.base.hex').html(), 'c', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '12', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '14', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '1100', "base 2 display");
    });

    QUnit.test("number during input", assert => {
      let calc = new Calc();
      calc.buffer = [['val', 12], ['oper', 'add'], ['val', 18]];
      calc.value = 18;
      render({calc});
      assert.strictEqual($('.display .value').html(), '18', "main display");
      assert.strictEqual($('.base.hex').html(), '12', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '18', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '22', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '10010', "base 2 display");
    });
  });

  QUnit.module("base 16", () => {
    QUnit.test("initial", assert => {
      let calc = new Calc();
      calc.reset(16);
      render({calc});
      assert.strictEqual($('.display .value').html(), '0', "main display");
      assert.strictEqual($('.base.hex').html(), '0', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '0', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '0', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '0', "base 2 display");
      assert.strictEqual($('.button.hex.disabled').length, 0, "enable hex buttons");
      assert.strictEqual($('.button.dec.disabled').length, 0, "enable dec buttons");
      assert.strictEqual($('.button.oct.disabled').length, 0, "enable oct buttons");
      assert.strictEqual($('.button.bin.disabled').length, 0, "enable bin buttons");
    });

    QUnit.test("positive number", assert => {
      let calc = new Calc();
      calc.reset(16);
      calc.buffer = [['val', 12]];
      calc.value = 12;
      render({calc});
      assert.ok($('.calc').hasClass('hex'), '.calc hasClass .hex');
      assert.strictEqual($('.display .value').html(), 'c', "main display");
      assert.strictEqual($('.base.hex').html(), 'c', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '12', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '14', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '1100', "base 2 display");
    });

    QUnit.test("negative number", assert => {
      let calc = new Calc();
      calc.reset(16);
      calc.buffer = [['val', -12]];
      calc.value = -12;
      render({calc});
      assert.strictEqual($('.display .value').html(), 'fff3', "main display");
      assert.strictEqual($('.base.hex').html(), 'fff3', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '-12', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '177763', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '1111111111110100', "base 2 display");
    });
  });

  QUnit.module("base 8", () => {
    QUnit.test("initial", assert => {
      let calc = new Calc();
      calc.reset(8);
      render({calc});
      assert.strictEqual($('.display .value').html(), '0', "main display");
      assert.strictEqual($('.base.hex').html(), '0', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '0', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '0', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '0', "base 2 display");
      assert.strictEqual($('.button.hex:not(.disabled)').length, 0, "disable hex buttons");
      assert.strictEqual($('.button.dec:not(.disabled)').length, 0, "disable dec buttons");
      assert.strictEqual($('.button.oct.disabled').length, 0, "enable oct buttons");
      assert.strictEqual($('.button.bin.disabled').length, 0, "enable bin buttons");
    });

    QUnit.test("positive number", assert => {
      let calc = new Calc();
      calc.reset(8);
      calc.buffer = [['val', 12]];
      calc.value = 12;
      render({calc});
      assert.ok($('.calc').hasClass('oct'), '.calc hasClass .oct');
      assert.strictEqual($('.display .value').html(), '14', "main display");
    });

    QUnit.test("negative number", assert => {
      let calc = new Calc();
      calc.reset(8);
      calc.buffer = [['val', -12]];
      calc.value = -12;
      render({calc});
      assert.strictEqual($('.display .value').html(), '177763', "main display");
    });
  });

  QUnit.module("base 2", () => {
    QUnit.test("initial", assert => {
      let calc = new Calc();
      calc.reset(2);
      render({calc});
      assert.strictEqual($('.display .value').html(), '0', "main display");
      assert.strictEqual($('.base.hex').html(), '0', "base 16 display");
      assert.strictEqual($('.base.dec').html(), '0', "base 10 display");
      assert.strictEqual($('.base.oct').html(), '0', "base 8 display");
      assert.strictEqual($('.base.bin').html(), '0', "base 2 display");
      assert.strictEqual($('.button.hex:not(.disabled)').length, 0, "disable hex buttons");
      assert.strictEqual($('.button.dec:not(.disabled)').length, 0, "disable dec buttons");
      assert.strictEqual($('.button.oct:not(.disabled)').length, 0, "disable oct buttons");
      assert.strictEqual($('.button.bin.disabled').length, 0, "enable bin buttons");
    });

    QUnit.test("positive number", assert => {
      let calc = new Calc();
      calc.reset(2);
      calc.buffer = [['val', 12]];
      calc.value = 12;
      render({calc});
      assert.ok($('.calc').hasClass('bin'), '.calc hasClass .bin');
      assert.strictEqual($('.display .value').html(), '1100', "main display");
    });

    QUnit.test("negative number", assert => {
      let calc = new Calc();
      calc.reset(2);
      calc.buffer = [['val', -12]];
      calc.value = -12;
      render({calc});
      assert.strictEqual($('.display .value').html(), '1111111111110100', "main display");
    });
  });
});

QUnit.module("button click", () => {
  let resetCalc = () => {
    $(".button[data-content='c']").trigger("click")
    $(".base[data-content='10']").trigger("click")
  };
  let triggerClick = (dataContent) => $(`.button[data-content=${dataContent}]`).trigger("click");
  QUnit.test("number pad - normal", assert => {
    let done = assert.async();
    resetCalc();
    triggerClick("val-1");
    triggerClick("val-2");
    setTimeout(() => {
      assert.strictEqual($('.display .value').html(), '12', "ok");
      done();
    }, 100);
  });
  QUnit.test("invalid number is useless", assert => {
    let done = assert.async();
    resetCalc();
    triggerClick("val-1");
    triggerClick("val-a");
    triggerClick("val-2");
    setTimeout(() => {
      assert.strictEqual($('.display .value').html(), '12', "ok");
      done();
    }, 100);
  });
  QUnit.test("operator", assert => {
    let done = assert.async();
    resetCalc();
    triggerClick("val-1");
    triggerClick("oper-add");
    triggerClick("val-2");
    triggerClick("oper-mul");
    triggerClick("val-3");
    triggerClick("calc");
    setTimeout(() => {
      assert.strictEqual($('.display .value').html(), '7', "ok");
      done();
    }, 100);
  });
  QUnit.test("base switch", assert => {
    let done = assert.async();
    resetCalc();
    triggerClick("val-1");
    triggerClick("val-2");
    $(".base[data-content='16']").trigger("click")
    setTimeout(() => {
      assert.strictEqual($('.display .value').html(), 'c', "ok");
      done();
    }, 100);
  });
});
