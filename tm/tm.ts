const [INC, DEC, RIGHT, LEFT, PRINT] = ['INC', 'DEC', 'RIGHT', 'LEFT', 'PRINT'];

type Command =
  | typeof INC
  | typeof DEC
  | typeof RIGHT
  | typeof LEFT
  | typeof PRINT
  | Command[];

class TM {
  left: number[] = [];
  current = 0;
  right: number[] = [];
}

const clone = (
  tm: TM,
  arg: {
    left?: number[];
    current?: number;
    right?: number[];
  }
): TM => {
  return {
    left: arg.left ?? tm.left,
    right: arg.right ?? tm.right,
    current: arg.current ?? tm.current,
  };
};

const inc = (tape: TM): TM => {
  return clone(tape, { current: tape.current + 1 });
};
const dec = (tape: TM): TM => {
  return clone(tape, { current: tape.current - 1 });
};
const right = (tape: TM): TM => {
  tape.left.push(tape.current);
  const newLeft = tape.left;
  const newCurrent = tape.right.pop() ?? 0;
  const newRight = tape.right;
  return {
    left: newLeft,
    current: newCurrent,
    right: newRight,
  };
};
const left = (tape: TM): TM => {
  tape.right.push(tape.current);
  const newRight = tape.right;
  const newCurrent = tape.left.pop() ?? 0;
  const newLeft = tape.left;
  return {
    left: newLeft,
    current: newCurrent,
    right: newRight,
  };
};
const _print = (tape: TM): TM => {
  console.log(String.fromCharCode(tape.current));
  return tape;
};
const loop = (tape: TM, proc: (tm: TM) => TM): TM => {
  if (tape.current === 0) return tape;
  return loop(proc(tape), proc);
};
const show = (tape: TM): string => {
  return (
    '[' +
    tape.left.reverse().join(',') +
    `,[${tape.current}], ` +
    tape.right.join(',') +
    ']'
  );
};

const evaluate = (tape: TM, code: Command[], index = 0): TM => {
  if (index >= code.length) return tape;
  const tm = evaluateCommand(tape, code[index]);
  return evaluate(tm, code, index + 1);
};

const evaluateCommand = (tm: TM, command: Command): TM => {
  console.log(show(tape), command);
  if (command === INC) return inc(tm);
  if (command === DEC) return dec(tm);
  if (command === RIGHT) return right(tm);
  if (command === LEFT) return left(tm);
  if (command === PRINT) return _print(tm);
  if (command instanceof Array) return loop(tm, (tm) => evaluate(tm, command));
  throw new Error('Unknown command');
};

const code = [
  INC,
  INC,
  INC,
  INC,
  INC,
  INC,
  INC,
  INC,
  INC,
  INC,
  [DEC, RIGHT, INC, INC, INC, INC, INC, INC, INC, INC, INC, INC, LEFT],
  RIGHT,
  PRINT,
  INC,
  PRINT,
];

const tape = new TM();
evaluate(tape, code);
