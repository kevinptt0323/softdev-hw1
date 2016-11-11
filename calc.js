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
  exec(_oper) {
    return new Promise((resolve, reject) => {
      let oper = _oper.split('-');
      console.log(oper);
      if (oper.length==1) {
        switch(oper[0]) {
          case 'ce':
            this.reset();
            resolve(0);
          case 'c':
          case 'bs':
          default:
            reject(oper);
            return;
        }
      } else if (isVal(oper)) {
        if (this.buffer.length==0 || !isVal(this.buffer[this.buffer.length-1])) this.buffer.push(['val', 0]);
        let last = this.buffer[this.buffer.length-1];
        last[1] = last[1] * this.base + parseInt(oper[1], this.base);
        resolve(last[1]);
      }
    });
  }
}
