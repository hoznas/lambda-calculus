type FUNC = (tape: Tape) => Tape;

const cons = <T>(value: T, stack: T[]): T[] => {
  return [value, ...stack];
};
const car = <T>(stack: T[]): T => stack[0];
const cdr = <T>(stack: T[]): T[] => stack.slice(1);

const carOrZero = (stack: number[]): number => stack[stack.length - 1] ?? 0;

const isNil = <T>(list: T[]): boolean => list.length === 0;
const isZero = (n: number): boolean => n === 0;

type Tape = [
  // TODO: church number
  number[],
  number,
  number[]
];

const newTape =
  (leftTape: number[]) => (current: number) => (rightTape: number[]) =>
    cons(leftTape, cons<number | number[]>(current, rightTape)) as Tape;

const leftTape = (tape: Tape): number[] => car(tape) as number[];
const current = (tape: Tape): number => car(cdr(tape)) as number;
const rightTape = (tape: Tape): number[] => cdr(cdr(tape)) as number[];

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

const FIX = (f: Function) => (x: any) => f(FIX(f))(x);

const loop = (commandList: FUNC[]): FUNC => {
  return FIX((recur: (tape: Tape) => Tape) => (tape: Tape): Tape => {
    if (isZero(current(tape))) return tape;
    else return recur(evaluate(tape)(commandList));
  });
};

const evaluate = FIX(
  (recur: (tape: Tape) => (code: FUNC[]) => Tape) =>
    (tape: Tape) =>
    (code: FUNC[]): Tape => {
      if (isNil(code)) return tape;
      else return recur(car(code)(tape))(cdr(code));
    }
);

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
