if (!Array.prototype.back) {
  Array.prototype.back = function() {
    return this[this.length - 1];
  };
}

function evaluate(arr) {
  let str = '';
  for(let i=0; i<arr.length; i++) {
    switch(arr[i][1]) {
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
        str += '/'
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
  return cmd[0]==='val';
}

function isOper(cmd) {
  return cmd[0]==='oper';
}

class Calc {
  constructor() {
    this.reset(10);
  }
  reset(base = this.base) {
    this.buffer = [];
    this.base = base;
    this.value = 0;
    this.buffer.push(['val', this.value]);
    this.calc = false;
  }
  toString(base) {
    let value = this.value, sign = 1;
    if (base!=10) {
      if (value<0) {
        value = -value;
        sign = -1;
      }
      value &= 0xffff;
      if (sign==-1) value = value ^ 0xffff;
    }
    return value.toString(base);
  }
  exec(_cmd) {
    return new Promise((resolve, reject) => {
      let cmd = _cmd.split('-');
      let last = [];
      console.log(cmd);
      if (cmd.length==1) {
        switch(cmd[0]) {
          case 'c':
            this.reset();
            break;
          case 'ce':
            this.buffer.pop();
            this.buffer.push(['val', 0]);
            break;
          case 'bs':
            if (isOper(this.buffer.back()))
              this.buffer.push([...this.buffer[this.buffer.length-2]]);
            this.buffer.back()[1] = (this.buffer.back()[1]/this.base)|0;
            break;
          case 'neg':
            if (isOper(this.buffer.back()))
              this.buffer.push([...this.buffer[this.buffer.length-2]]);
            this.buffer.back()[1] *= -1;
            break;
          case 'calc':
            if (isOper(this.buffer.back()))
              this.buffer.push([...this.buffer[this.buffer.length-2]]);
            let result = evaluate(this.buffer);
            this.reset();
            this.buffer.pop();
            this.buffer.push(['val', result]);
            this.calc = true;
            break;
          default:
            break;
        }
      } else if (isVal(cmd)) {
        if (this.calc) this.reset();
        if (!isVal(this.buffer.back()))
          this.buffer.push(['val', 0]);
        last = this.buffer.back();
        if (last[1]<0)
          last[1] = last[1] * this.base - parseInt(cmd[1], this.base);
        else
          last[1] = last[1] * this.base + parseInt(cmd[1], this.base);
      } else if (isOper(cmd)) {
        if (isOper(this.buffer.back()))
          this.buffer.pop();
        this.buffer.push(cmd);
      }
      this.value = this.buffer.filter(isVal).back()[1];
      resolve();
    });
  }
}
