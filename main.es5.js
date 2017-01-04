'use strict';

var base2str = {
  2: 'bin',
  8: 'oct',
  10: 'dec',
  16: 'hex'
};

var keyBinging = [{ key: '0', content: 'val-0' }, { key: '1', content: 'val-1' }, { key: '2', content: 'val-2' }, { key: '3', content: 'val-3' }, { key: '4', content: 'val-4' }, { key: '5', content: 'val-5' }, { key: '6', content: 'val-6' }, { key: '7', content: 'val-7' }, { key: '8', content: 'val-8' }, { key: '9', content: 'val-9' }, { key: 'a', content: 'val-a' }, { key: 'b', content: 'val-b' }, { key: 'c', content: 'val-c' }, { key: 'd', content: 'val-d' }, { key: 'e', content: 'val-e' }, { key: 'f', content: 'val-f' }, { key: '+', content: 'oper-add' }, { key: '-', content: 'oper-sub' }, { key: '*', content: 'oper-mul' }, { key: '/', content: 'oper-div' }, { key: '%', content: 'oper-mod' }, { key: ['=', 'enter'], content: 'calc' }, { key: 'backspace', content: 'bs' }, { key: 'esc', content: 'c' }, { key: 'n', content: 'neg' }, { key: 'c e', content: 'ce' }];

function render(props) {
  var base = props.calc.base,
      calc = props.calc;

  $('.calc').removeClass('bin oct dec hex').addClass(base2str[base]);
  $('.button').removeClass('disabled');
  Object.keys(base2str).filter(function (base_k) {
    return base_k > base;
  }).forEach(function (base_k) {
    return $('.' + base2str[base_k] + '.button').addClass('disabled');
  });

  $('.display .value').html(calc.toString(base));
  $('.base.hex').html(calc.toString(16));
  $('.base.dec').html(calc.toString(10));
  $('.base.oct').html(calc.toString(8));
  $('.base.bin').html(calc.toString(2));
}
$(function () {
  var calc = new Calc();
  render({ calc: calc });
  $('.button').on('click', function (e) {
    if ($(this).hasClass('disabled')) return;
    var content = $(this).data('content');
    calc.exec(content).then(function () {
      render({ calc: calc });
    }).catch(function (err) {
      return console.log(err);
    });
  });
  $('.base').on('click', function (e) {
    var content = $(this).data('content');
    calc.base = content | 0;
    calc.exec('').then(function () {
      render({ calc: calc });
    }).catch(function (err) {
      return console.log(err);
    });
  });

  keyBinging.forEach(function (_ref) {
    var key = _ref.key,
        content = _ref.content;

    Mousetrap.bind(key, function () {
      return $('.button[data-content=' + content + ']').click();
    });
    $('.button[data-content=' + content + ']').attr('title', '[' + key + ']');
  });
  Mousetrap.bind('h e x', function () {
    return $('.base.hex').click();
  });
  Mousetrap.bind('d e c', function () {
    return $('.base.dec').click();
  });
  Mousetrap.bind('o c t', function () {
    return $('.base.oct').click();
  });
  Mousetrap.bind('b i n', function () {
    return $('.base.bin').click();
  });
  Mousetrap.bind('?', function () {
    return $('.help-wrapper').fadeToggle();
  });

  $('.help-wrapper').on('click', function () {
    $(this).fadeOut();
  });
  $('.help-btn').on('click', function () {
    $('.help-wrapper').fadeToggle();
  });
});
