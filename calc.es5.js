'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!Array.prototype.back) {
  Array.prototype.back = function () {
    return this[this.length - 1];
  };
}

function evaluate(arr) {
  var str = '';
  for (var i = 0; i < arr.length; i++) {
    switch (arr[i][1]) {
      case 'add':
        str += '+';
        break;
      case 'sub':
        str += '-';
        break;
      case 'mul':
        str += '*';
        break;
      case 'div':
        str += '/';
        break;
      case 'mod':
        str += '%';
        break;
      default:
        str += arr[i][1];
        break;
    }
  }
  str = str.replace('--', '+');
  console.log(str);
  console.log(JSON.stringify(arr));
  return eval(str);
}

function isVal(cmd) {
  return cmd[0] === 'val';
}

function isOper(cmd) {
  return cmd[0] === 'oper';
}

var Calc = function () {
  function Calc() {
    _classCallCheck(this, Calc);

    this.reset(10);
  }

  _createClass(Calc, [{
    key: 'reset',
    value: function reset() {
      var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.base;

      this.buffer = [];
      this.base = base;
      this.value = 0;
      this.buffer.push(['val', this.value]);
      this.calc = false;
    }
  }, {
    key: 'toString',
    value: function toString(base) {
      var value = this.value,
          sign = 1;
      if (base != 10) {
        if (value < 0) {
          value = -value;
          sign = -1;
        }
        value &= 0xffff;
        if (sign == -1) value = value ^ 0xffff;
      }
      return value.toString(base);
    }
  }, {
    key: 'exec',
    value: function exec(_cmd) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var cmd = _cmd.split('-');
        var last = [];
        console.log(cmd);
        if (cmd.length == 1) {
          switch (cmd[0]) {
            case 'c':
              _this.reset();
              break;
            case 'ce':
              _this.buffer.pop();
              _this.buffer.push(['val', 0]);
              break;
            case 'bs':
              if (isOper(_this.buffer.back())) _this.buffer.push([].concat(_toConsumableArray(_this.buffer[_this.buffer.length - 2])));
              _this.buffer.back()[1] = _this.buffer.back()[1] / _this.base | 0;
              break;
            case 'neg':
              if (isOper(_this.buffer.back())) _this.buffer.push([].concat(_toConsumableArray(_this.buffer[_this.buffer.length - 2])));
              _this.buffer.back()[1] *= -1;
              break;
            case 'calc':
              if (isOper(_this.buffer.back())) _this.buffer.push([].concat(_toConsumableArray(_this.buffer[_this.buffer.length - 2])));
              var result = evaluate(_this.buffer);
              _this.reset();
              _this.buffer.pop();
              _this.buffer.push(['val', result]);
              _this.calc = true;
              break;
            default:
              break;
          }
        } else if (isVal(cmd)) {
          if (_this.calc) _this.reset();
          if (!isVal(_this.buffer.back())) _this.buffer.push(['val', 0]);
          last = _this.buffer.back();
          if (last[1] < 0) last[1] = last[1] * _this.base - parseInt(cmd[1], _this.base);else last[1] = last[1] * _this.base + parseInt(cmd[1], _this.base);
        } else if (isOper(cmd)) {
          if (isOper(_this.buffer.back())) _this.buffer.pop();
          _this.buffer.push(cmd);
        }
        _this.value = _this.buffer.filter(isVal).back()[1];
        resolve();
      });
    }
  }]);

  return Calc;
}();
