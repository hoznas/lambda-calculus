enum CommandType {
  INC,
  DEC,
  RIGHT,
  LEFT,
  LOOP,
  PRINT,
}

const CommandTypeToString = (type: CommandType): string => {
  switch (type) {
    case CommandType.INC:
      return 'INC';
    case CommandType.DEC:
      return 'DEC';
    case CommandType.RIGHT:
      return 'RIGHT';
    case CommandType.LEFT:
      return 'LEFT';
    case CommandType.LOOP:
      return 'LOOP';
    case CommandType.PRINT:
      return 'PRINT';
  }
};

type Command = {
  type: CommandType;
  value?: Command[];
};

const showCommand = (command: Command): string => {
  if (command.value) {
    const innerCommands = command.value.map(showCommand).join(', ');
    return `${CommandTypeToString(command.type)} [${innerCommands}]`;
  } else {
    return CommandTypeToString(command.type);
  }
};

const INC: Command = { type: CommandType.INC };
const DEC: Command = { type: CommandType.DEC };
const RIGHT: Command = { type: CommandType.RIGHT };
const LEFT: Command = { type: CommandType.LEFT };
const PRINT: Command = { type: CommandType.PRINT };
const LOOP = (value: Command[]): Command => ({ type: CommandType.LOOP, value });

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
): TM => ({
  left: arg.left ?? tm.left,
  right: arg.right ?? tm.right,
  current: arg.current ?? tm.current,
});

const inc = (tm: TM): TM => clone(tm, { current: tm.current + 1 });
const dec = (tm: TM): TM => clone(tm, { current: tm.current - 1 });
const right = (tm: TM): TM => {
  tm.left.push(tm.current);
  const newLeft = tm.left;
  const newCurrent = tm.right.pop() ?? 0;
  const newRight = tm.right;
  return {
    left: newLeft,
    current: newCurrent,
    right: newRight,
  };
};
const left = (tm: TM): TM => {
  tm.right.push(tm.current);
  const newRight = tm.right;
  const newCurrent = tm.left.pop() ?? 0;
  const newLeft = tm.left;
  return {
    left: newLeft,
    current: newCurrent,
    right: newRight,
  };
};
const _print = (tm: TM): TM => {
  console.log(String.fromCharCode(tm.current));
  return tm;
};
const loop = (tm: TM, proc: (tm: TM) => TM): TM => {
  if (tm.current === 0) return tm;
  return loop(proc(tm), proc);
};
const show = (tm: TM): string => {
  return (
    '[' +
    tm.left.join(',') +
    `,[${tm.current}], ` +
    tm.right.reverse().join(',') +
    ']'
  );
};

const evaluate = (tm: TM, code: Command[], index = 0): TM => {
  if (index >= code.length) return tm;
  const nextTm = evaluateCommand(tm, code[index]);
  return evaluate(nextTm, code, index + 1);
};

const evaluateCommand = (tm: TM, command: Command): TM => {
  console.log(show(tm), showCommand(command));
  if (command.type === CommandType.INC) return inc(tm);
  if (command.type === CommandType.DEC) return dec(tm);
  if (command.type === CommandType.RIGHT) return right(tm);
  if (command.type === CommandType.LEFT) return left(tm);
  if (command.type === CommandType.PRINT) return _print(tm);
  if (command.type === CommandType.LOOP)
    return loop(tm, (tm) => evaluate(tm, command.value ?? []));
  throw new Error('Unknown command');
};

const code: Command[] = [
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
  LOOP([DEC, RIGHT, INC, INC, INC, INC, INC, INC, INC, INC, INC, INC, LEFT]),
  RIGHT,
  PRINT,
  INC,
  PRINT,
];

const code2: Command[] = [
  RIGHT,
  INC,
  RIGHT,
  INC,
  INC,
  RIGHT,
  INC,
  INC,
  INC,
  LEFT,
  LEFT,
  LEFT,
  LEFT,
];

const turingMachine = new TM();
evaluate(turingMachine, code2);
