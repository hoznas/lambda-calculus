// class Tape {
//   left: number[] = [];
//   current = 0;
//   right: number[] = [];
// }

// type FUNC = (tape: Tape) => Tape;

// const cons = <T>(value: T, stack: T[]): T[] => {
//   return [...stack, value];
// };
// const cdr = <T>(stack: T[]): T[] => {
//   return stack.slice(0, -1);
// };

// const car = <T>(stack: T[]): T => {
//   return stack[stack.length - 1];
// };
// const carOrZero = (stack: number[]): number => {
//   return stack[stack.length - 1] ?? 0;
// };

// const inc = (tape: Tape): Tape => ({
//   left: tape.left,
//   current: tape.current + 1,
//   right: tape.right,
// });

// const dec = (tape: Tape): Tape => ({
//   left: tape.left,
//   current: tape.current - 1,
//   right: tape.right,
// });

// const right = (tape: Tape): Tape => ({
//   left: cons(tape.current, tape.left),
//   current: carOrZero(tape.right),
//   right: cdr(tape.right),
// });

// const left = (tape: Tape): Tape => ({
//   left: cdr(tape.left),
//   current: carOrZero(tape.left),
//   right: cons(tape.current, tape.right),
// });

// const _print: FUNC = (tape: Tape): Tape => {
//   console.log(String.fromCharCode(tape.current));
//   return tape;
// };

// const loop = (commandList: FUNC[]): FUNC => {
//   const self = (tape: Tape): Tape => {
//     if (tape.current === 0) return tape;
//     const newTape = evaluate(tape, commandList);
//     return self(newTape);
//   };
//   return self;
// };

// const evaluate = (tape: Tape, code: FUNC[]): Tape => {
//   if (0 === code.length) return tape;
//   // console.log(code[0].name, code.length);
//   const nextTape = car(code)(tape);
//   return evaluate(nextTape, cdr(code));
// };

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
//   loop(
//     [
//       dec,
//       right,
//       inc,
//       inc,
//       inc,
//       inc,
//       inc,
//       inc,
//       inc,
//       inc,
//       inc,
//       inc,
//       left,
//     ].reverse()
//   ),
//   right,
//   inc,
//   _print,
//   inc,
//   _print,
//   inc,
//   _print,
// ].reverse();

// const tape = new Tape();
// evaluate(tape, code);
