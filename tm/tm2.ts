const [INC, DEC, RIGHT, LEFT, PRINT] = [
  'INC',
  'DEC',
  'RIGHT',
  'LEFT',
  'PRINT',
  ,
];
type Command =
  | typeof INC
  | typeof DEC
  | typeof RIGHT
  | typeof LEFT
  | typeof PRINT
  | Command[];

class Tape {
  private tape: number[] = new Array(8).fill(0);
  private pointer = 0;
  inc() {
    this.tape[this.pointer]++;
  }
  dec() {
    this.tape[this.pointer]--;
  }
  right() {
    this.pointer++;
  }
  left() {
    this.pointer--;
  }
  print() {
    console.log(String.fromCharCode(this.tape[this.pointer]));
  }
  loop(proc: () => void) {
    while (tape.tape[tape.pointer]) {
      proc();
    }
  }
  show() {
    return `[${this.pointer}], ` + this.tape.join(',');
  }
}

const inc = () => {};

const evaluate = (tape: Tape, code: Command[]) => {
  for (const command of code) {
    console.log(tape.show(), command);
    if (command === INC) {
      tape.inc();
    } else if (command === DEC) {
      tape.dec();
    } else if (command === RIGHT) {
      tape.right();
    } else if (command === LEFT) {
      tape.left();
    } else if (command === PRINT) {
      tape.print();
    } else if (command instanceof Array) {
      tape.loop(() => evaluate(tape, command));
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

const tape = new Tape();
evaluate(tape, code);
