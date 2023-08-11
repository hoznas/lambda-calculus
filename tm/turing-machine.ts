class Cell {
  constructor(public value: number, public next?: Cell) {}
}
const getTopValue = (cell?: Cell): number => {
  if (cell) return cell.value;
  else return 0;
};
const getNext = (cell?: Cell): Cell => {
  if (cell) return cell.next || new Cell(0);
  else return new Cell(0);
};
const reduceList = <T>(
  f: (x: T, y: number) => T,
  init: T,
  list: Cell | undefined
): T => {
  if (list) {
    return reduceList(f, f(init, list.value), list.next);
  } else {
    return init;
  }
};
const toArray = (cell: Cell | undefined) => {
  return reduceList(
    (x: number[], y: number) => {
      x.push(y);
      return x;
    },
    [],
    cell
  );
};

class TuringMachine {
  constructor(
    private current: number = 0,
    private left: Cell | undefined = undefined,
    private right: Cell | undefined = undefined
  ) {
    this.left = left;
    this.right = right;
  }
  moveRight() {
    const newCurrent = getTopValue(this.right);
    const newRight = this.right && getNext(this.right);
    const newLeft = new Cell(this.current, this.left && this.left);
    return new TuringMachine(newCurrent, newLeft, newRight);
  }
  moveLeft() {
    const newCurrent = getTopValue(this.left);
    const newLeft = this.left && getNext(this.left);
    const newRight = new Cell(this.current, this.right && this.right);
    return new TuringMachine(newCurrent, newLeft, newRight);
  }
  increment() {
    const newCurrent = this.current + 1;
    return new TuringMachine(newCurrent, this.left, this.right);
  }
  decrement() {
    const newCurrent = this.current - 1;
    return new TuringMachine(newCurrent, this.left, this.right);
  }
  output() {
    console.log(this.current);
    return this;
  }
  Input(value: number) {
    return new TuringMachine(value, this.left, this.right);
  }
  getCurrent() {
    return this.current;
  }
  printAll() {
    console.log([
      ...toArray(this.left).reverse(),
      [this.current],
      ...toArray(this.right),
    ]);
    return this;
  }
  evalCommands(commands: Command[]): TuringMachine {
    let tm: TuringMachine = this;
    commands.forEach((command) => {
      tm = tm.evalCommand(command);
      console.log(tm);
    });
    return tm;
  }
  evalCommand(command: Command): TuringMachine {
    if (command === '>') {
      return this.moveRight();
    } else if (command === '<') {
      return this.moveLeft();
    } else if (command === '+') {
      return this.increment();
    } else if (command === '-') {
      return this.decrement();
    } else if (command === '.') {
      return this.output();
    } else if (command === ',') {
      return this.Input(0);
    } else if (Array.isArray(command)) {
      return this.evalLoop(command);
    }
    throw new Error('Invalid command');
  }
  evalLoop(commands: Command[]): TuringMachine {
    let tm: TuringMachine = this;
    while (tm.getCurrent() !== 0) {
      tm = tm.evalCommands(commands);
    }
    return tm;
  }
}

const tm = new TuringMachine();

tm.printAll();
tm.increment().printAll();
tm.increment().increment().moveRight().printAll();
tm.increment().increment().moveRight().increment().printAll();
tm.increment().increment().moveRight().increment().moveRight().printAll();
tm.increment().increment().moveLeft().increment().moveLeft().printAll();

console.log('--------------------');

type Command = '>' | '<' | '+' | '-' | '.' | ',' | Command[];
const input = [0, 1, 2, 3, 4, 5];

const commands: Command = [
  '+',
  '+',
  '+',
  '+',
  '+',
  ['-', '>', '+', '+', '+', '+', '+', '<'],
  '>',
  '.',
];
tm.evalCommands(commands).printAll();
