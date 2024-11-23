type FUNC = (tape: Tape) => Tape;

const cons = <T>(value: T, stack: T[]): T[] => {
  return [value, ...stack];
};
const cdr = <T>(stack: T[]): T[] => {
  return stack.slice(1);
};
const car = <T>(stack: T[]): T => {
  return stack[0];
};
const carOrZero = (stack: number[]): number => {
  return stack[stack.length - 1] ?? 0;
};
const isNil = <T>(list: T[]): boolean => {
  return list.length === 0;
};
const isZero = (n: number): boolean => {
  return n === 0;
};

type Tape = {
  // TODO: church number
  left: number[];
  current: number;
  right: number[];
};

const newTape =
  (leftTape: number[]) => (current: number) => (rightTape: number[]) => ({
    left: leftTape,
    current: current,
    right: rightTape,
  });

const leftTape = (tape: Tape): number[] => tape.left;

const current = (tape: Tape): number => tape.current;

const rightTape = (tape: Tape): number[] => tape.right;

const inc = (tape: Tape): Tape =>
  newTape(leftTape(tape))(current(tape) + 1)(rightTape(tape));

const dec = (tape: Tape): Tape =>
  newTape(leftTape(tape))(current(tape) - 1)(rightTape(tape));

const right = (tape: Tape): Tape =>
  newTape(cons(current(tape), leftTape(tape)))(carOrZero(rightTape(tape)))(
    cdr(rightTape(tape))
  );

const left = (tape: Tape): Tape =>
  newTape(cdr(leftTape(tape)))(carOrZero(leftTape(tape)))(
    cons(current(tape), rightTape(tape))
  );

const _print: FUNC = (tape: Tape): Tape => {
  console.log(String.fromCharCode(current(tape)));
  return tape;
};

const loop = (commandList: FUNC[]): FUNC => {
  // TODO: Y-combinator
  const self = (tape: Tape): Tape => {
    if (isZero(current(tape))) return tape;
    else return self(evaluate(tape)(commandList));
  };
  return self;
};

const evaluate =
  (tape: Tape) =>
  (code: FUNC[]): Tape => {
    if (isNil(code)) return tape;
    else return evaluate(car(code)(tape))(cdr(code));
  };

const code: FUNC[] = [
  inc,
  inc,
  inc,
  inc,
  inc,
  inc,
  inc,
  inc,
  inc,
  inc,
  loop([dec, right, inc, inc, inc, inc, inc, inc, inc, inc, inc, inc, left]),
  right,
  inc,
  _print,
  inc,
  _print,
  inc,
  _print,
];

evaluate(newTape([])(0)([]))(code);
