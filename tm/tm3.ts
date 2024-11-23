// type FUNC = (tape: Tape) => Tape;

// const cons = <T>(value: T, stack: T[]): T[] => {
//   return [value, ...stack];
// };
// const cdr = <T>(stack: T[]): T[] => {
//   return stack.slice(1);
// };
// const car = <T>(stack: T[]): T => {
//   return stack[0];
// };
// const carOrZero = (stack: number[]): number => {
//   return stack[stack.length - 1] ?? 0;
// };

// class Tape {
//   left: number[] = [];
//   current = 0;
//   right: number[] = [];
// }

// const newTape =
//   (leftTape: number[]) => (current: number) => (rightTape: number[]) => ({
//     left: leftTape,
//     current: current,
//     right: rightTape,
//   });

// const leftTape = (tape: Tape): number[] => tape.left;

// const current = (tape: Tape): number => tape.current;

// const rightTape = (tape: Tape): number[] => tape.right;

// const inc = (tape: Tape): Tape =>
//   newTape(leftTape(tape))(current(tape) + 1)(rightTape(tape));

// const dec = (tape: Tape): Tape =>
//   newTape(leftTape(tape))(current(tape) - 1)(rightTape(tape));

// const right = (tape: Tape): Tape =>
//   newTape(cons(current(tape), leftTape(tape)))(carOrZero(rightTape(tape)))(
//     cdr(rightTape(tape))
//   );

// const left = (tape: Tape): Tape =>
//   newTape(cdr(leftTape(tape)))(carOrZero(leftTape(tape)))(
//     cons(current(tape), rightTape(tape))
//   );

// const _print: FUNC = (tape: Tape): Tape => {
//   console.log(String.fromCharCode(current(tape)));
//   return tape;
// };

// const loop = (commandList: FUNC[]): FUNC => {
//   // TODO: Y-combinator
//   const self = (tape: Tape): Tape => {
//     if (current(tape) === 0) return tape;
//     const newTape = evaluate(tape)(commandList);
//     return self(newTape);
//   };
//   return self;
// };

// const evaluate =
//   (tape: Tape) =>
//   (code: FUNC[]): Tape => {
//     if (0 === code.length) return tape;
//     // console.log(code[0].name, code.length);
//     const nextTape = car(code)(tape);
//     return evaluate(nextTape)(cdr(code));
//   };

// const code: FUNC[] = [
//   inc,
//   inc,
//   inc,
//   inc,
//   inc,
//   inc,
//   inc,
//   inc,
//   inc,
//   inc,
//   loop([dec, right, inc, inc, inc, inc, inc, inc, inc, inc, inc, inc, left]),
//   right,
//   inc,
//   _print,
//   inc,
//   _print,
//   inc,
//   _print,
// ];

// const tape = newTape([])(0)([]);
// evaluate(tape)(code);
