function isVal(oper) {
  return oper[0]==='val';
}

class Calc {
  constructor() {
    this.reset(10);
  }
  reset(base = 10) {
    this.display = '';
    this.buffer = [];
    this.base = base;
  }
  exec(_cmd) {
    return new Promise((resolve, reject) => {
      let cmd = _cmd.split('-');
      console.log(cmd);
      if (cmd.length==1) {
        switch(cmd[0]) {
          case 'ce':
            this.reset();
            resolve(0);
          case 'c':
          case 'bs':
          default:
            reject(cmd);
            return;
        }
      } else if (isVal(cmd)) {
        if (this.buffer.length==0 || !isVal(this.buffer[this.buffer.length-1])) this.buffer.push(['val', 0]);
        let last = this.buffer[this.buffer.length-1];
        last[1] = last[1] * this.base + parseInt(cmd[1], this.base);
        resolve(last[1]);
      } else if (isOper(cmd)) {
      }
    });
  }
}
