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
    right?: number[];
    current?: number;
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
  let tm = tape;
  while (tm.current !== 0) {
    tm = proc(tm);
  }
  return tm;
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

const evaluate = (tape: TM, code: Command[]): TM => {
  let tm = tape;
  for (const command of code) {
    console.log(show(tape), command);
    if (command === INC) {
      tm = inc(tm);
    } else if (command === DEC) {
      tm = dec(tm);
    } else if (command === RIGHT) {
      tm = right(tm);
    } else if (command === LEFT) {
      tm = left(tm);
    } else if (command === PRINT) {
      tm = _print(tm);
    } else if (command instanceof Array) {
      tm = loop(tm, (tm) => evaluate(tm, command));
    }
  }
  return tm;
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
