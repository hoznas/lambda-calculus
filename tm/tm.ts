namespace TM1 {
  const [INC, DEC, RIGHT, LEFT, PRINT] = [
    'INC',
    'DEC',
    'RIGHT',
    'LEFT',
    'PRINT',
  ];
  type Command =
    | typeof INC
    | typeof DEC
    | typeof RIGHT
    | typeof LEFT
    | typeof PRINT
    | Command[];

  class TM {
    tape: number[] = new Array(8).fill(0);
    pointer = 0;
  }

  const inc = (tape: TM) => {
    tape.tape[tape.pointer]++;
  };
  const dec = (tape: TM) => {
    tape.tape[tape.pointer]--;
  };
  const right = (tape: TM) => {
    tape.pointer++;
  };
  const left = (tape: TM) => {
    tape.pointer--;
  };
  const _print = (tape: TM) => {
    console.log(String.fromCharCode(tape.tape[tape.pointer]));
  };
  const loop = (tape: TM, proc: () => void) => {
    while (tape.tape[tape.pointer]) {
      proc();
    }
  };
  const show = (tape: TM) => {
    return `[${tape.pointer}], ` + tape.tape.join(',');
  };

  const evaluate = (tape: TM, code: Command[]) => {
    for (const command of code) {
      console.log(show(tape), command);
      if (command === INC) {
        inc(tape);
      } else if (command === DEC) {
        dec(tape);
      } else if (command === RIGHT) {
        right(tape);
      } else if (command === LEFT) {
        left(tape);
      } else if (command === PRINT) {
        _print(tape);
      } else if (command instanceof Array) {
        loop(tape, () => evaluate(tape, command));
      }
    }
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
}
