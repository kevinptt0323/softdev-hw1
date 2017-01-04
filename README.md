# NCTU Software Development - Homework

# Unit test in browser

## `calc.js`

To test `calc.js`, open `tests/calc.html`.

- `Array.prototype.back`
- `isVal`
  - return `true` if it is value
  - return `false` if not
- `isOper`
  - return `true` if it is operator
  - return `false` if not
- class `Calc`
  - `reset`
    - base 10/16/8/2
  - `toString`
    - positive number
    - negative number
  - `exec`
    - every commands work correctly
- `evaluate`

## `main.js`

- help feature
  - `.help-btn`
  - `.help-wrapper`
- `render`
  - under base 10/16/8/2
  - buttons must be disabled if it must be disabled. For example, value "A" can't be clicked in base 10.
- buttons
  - number buttons
  - base switchs
  - disabled buttons don't work

To test `main.js`, open `tests/main.html`.

# Unit test in shell

I only test `isVal` in `calc.js`.

```
cd cli-test
npm install
npm test
```

# Coverage

To make blanket.js work correctly, I use **Babel** to convert source code into ES5.

- `calc.js`: 96.55%
- `main.js`: 83.67%

# Bug

- It shows negative number incorrectly under base 2. It is 1's complement but the spec asks for 2's complement.
