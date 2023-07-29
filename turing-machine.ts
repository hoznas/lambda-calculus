class Cell {
  constructor(private value: number, private next?: Cell) {}
  getValue() {
    return this.value;
  }
  getNext() {
    return this.next || new Cell(0);
  }
}

class TuringMachine {
  constructor(
    private current: number = 0,
    private left: Cell = new Cell(0),
    private right: Cell = new Cell(0)
  ) {
    this.left = left;
    this.right = right;
  }
  moveRight() {
    const newCurrent = this.right.getValue();
    const newRight = this.right.getNext();
    const newLeft = new Cell(this.current, this.left.getNext());
    return new TuringMachine(newCurrent, newLeft, newRight);
  }
  moveLeft() {
    const newCurrent = this.left.getValue();
    const newLeft = this.left.getNext();
    const newRight = new Cell(this.current, this.right.getNext());
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
    return this.current;
  }
  Input(value: number) {
    return new TuringMachine(value, this.left, this.right);
  }
}
