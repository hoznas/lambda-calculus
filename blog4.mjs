import {
  ADD,
  DEC,
  DIV,
  FALSE,
  FIVE,
  FIX,
  FOLD,
  FOUR,
  IF,
  INC,
  IS_NIL,
  IS_ZERO,
  LE,
  LEFT,
  MAP,
  MOD,
  MUL,
  NIL,
  ONE,
  PAIR,
  POW,
  RIGHT,
  SEVEN,
  SIX,
  SLIDE,
  SUB,
  THREE,
  TO_ARRAY,
  TO_BOOLEAN,
  TO_INT,
  TRUE,
  TWO,
  Z,
  ZERO,
} from './blog3.mjs';
console.log('====== blog4.mjs ======');

// 定義
// const PAIR = (x) => (y) => (p) => p(x)(y); // 定義済み
// const LEFT = (p) => p(TRUE); // 定義済み
// const RIGHT = (p) => p(FALSE); // 定義済み

const LEFT_OR_ZERO = (halfTape) => {
  const n = LEFT(halfTape);
  // console.log(
  //   'LEFT_OR_ZERO',
  //   IF(IS_NIL(ZERO))('true')('false'), //TO_INT(LEFT(halfTape))
  //   TO_INT(n),
  //   IF(IS_NIL(n))('true')('false')
  // );

  return IF(IS_NIL(halfTape))(ZERO)(LEFT(halfTape));
};

const NEW_TAPE = (left) => (current) => (right) =>
  PAIR(left)(PAIR(current)(right));
const LEFT_TAPE = LEFT;
const CURRENT = (tape) => LEFT(RIGHT(tape));
const RIGHT_TAPE = (tape) => RIGHT(RIGHT(tape));

const TM_INC = (tape) =>
  NEW_TAPE(LEFT_TAPE(tape))(INC(CURRENT(tape)))(RIGHT_TAPE(tape));
const TM_DEC = (tape) =>
  NEW_TAPE(LEFT_TAPE(tape))(DEC(CURRENT(tape)))(RIGHT_TAPE(tape));
const TM_RIGHT = (tape) =>
  NEW_TAPE(PAIR(CURRENT(tape))(LEFT_TAPE(tape)))(
    LEFT_OR_ZERO(RIGHT_TAPE(tape))
  )(RIGHT(RIGHT_TAPE(tape)));
const TM_LEFT = (tape) => {
  const left = RIGHT(LEFT_TAPE(tape));
  const current = LEFT_OR_ZERO(LEFT_TAPE(tape));
  const right = PAIR(CURRENT(tape))(RIGHT_TAPE(tape));
  return NEW_TAPE(left)(current)(right);
};
const TM_PRINT = (tape) => {
  console.log(TO_INT(CURRENT(tape)));
  return tape;
};

const FIX2 = (f) => (x) => f(FIX2(f))(x);

const TM_LOOP = (commandList) => {
  return (tape) => {
    if (IF(IS_ZERO(CURRENT(tape)))(true)(false)) {
      return tape;
    } else {
      return TM_LOOP(commandList)(EVAL_LIST(commandList, tape));
    }
  };
};

const TM_EVALUATE = FIX2((recur) => (tape) => (code) => {
  console.log('TM_EVALUATE', TO_INT(CURRENT(tape)), LEFT(code));
  return IF(IS_NIL(code))(tape)(recur(LEFT(code)(tape))(RIGHT(code)));
});

const tape = NEW_TAPE(NIL)(ZERO)(NIL);

const toConsList = (arr) => arr.reduceRight((acc, x) => PAIR(x)(acc), NIL);

const code1 = toConsList([
  TM_PRINT, // 0
  TM_INC,
  TM_PRINT, // 1
  TM_INC,
  TM_PRINT, // 2
  TM_INC,
  TM_PRINT, // 3
  TM_INC,
  TM_PRINT, // 4
  TM_INC,
  TM_PRINT, // 5
  TM_DEC,
  TM_PRINT, // 4
  TM_DEC,
  TM_PRINT, // 3
  TM_DEC,
  TM_PRINT, // 2
]);

const code2 = toConsList([
  TM_INC,
  TM_INC,
  TM_INC,
  TM_LOOP(toConsList([TM_DEC, TM_RIGHT, TM_INC, TM_INC, TM_LEFT])),
  TM_RIGHT,
  TM_PRINT, // 6
]);

// let codeList = code1;
// while (true) {
//   const cond = IF(IS_NIL(codeList))(true)(false);
//   console.log({ cond: cond, isNil: IS_NIL(codeList) });
//   if (cond) break;
//   // console.log('code', codeList);
//   const head = LEFT(codeList);
//   codeList = RIGHT(codeList);
//   console.log('head', head);
//   // console.log('loop', head);
// }
// console.log('end');

// const LOOP_LIST = (list, tape) => {
//   let lst = list;
//   let result = tape;
//   while (true) {
//     if (IF(IS_NIL(lst))(true)(false)) break;
//     const head = LEFT(lst);
//     console.log('head', head);
//     result = head(result);
//     lst = RIGHT(lst);
//   }
//   return result;
// };

// LOOP_LIST(code1, tape);

// const LOOP_LIST2 = (list, tape) => {
//   let result = tape;
//   for (let lst = list; !IF(IS_NIL(lst))(true)(false); lst = RIGHT(lst)) {
//     const head = LEFT(lst);
//     console.log('head', head);
//     result = head(result);
//   }
//   return result;
// };

// LOOP_LIST2(code1, tape);

// const LOOP_LIST3 = (list, tape) => {
//   if (IF(IS_NIL(list))(true)(false)) return tape;
//   const head = LEFT(list);
//   console.log('head', head);
//   return LOOP_LIST3(RIGHT(list), head(tape));
// };

// LOOP_LIST3(code1, tape);

// const LOOP_LIST3 = (list, tape) => {
//   if (IF(IS_NIL(list))(true)(false)) return tape;
//   const head = LEFT(list);
//   console.log('head', head);
//   return LOOP_LIST3(RIGHT(list), head(tape));
// };

// LOOP_LIST3(code1, tape);

const EVAL_LIST = (list, tape) => {
  if (IF(IS_NIL(list))(true)(false)) return tape;
  console.log(LEFT(list));
  return EVAL_LIST(RIGHT(list), LEFT(list)(tape));
};

EVAL_LIST(code2, tape);

// TM_EVALUATE(NEW_TAPE(NIL)(ZERO)(NIL))(code1);

// [
//   TM_RIGHT,
//   TM_INC,
//   TM_PRINT, // 0 [1]
//   TM_RIGHT,
//   TM_INC,
//   TM_INC,
//   TM_PRINT, // 0 1 [2]
//   TM_LEFT,
//   TM_PRINT, // 0 [1] 2
//   TM_LEFT,
//   TM_PRINT, // [0] 1 2
//   TM_LEFT,
//   TM_PRINT, // [0] 0 1 2
//   TM_RIGHT,
//   TM_RIGHT,
//   TM_PRINT, // 0 0 [1] 2
//   TM_RIGHT,
//   TM_PRINT, // 0 0 1 [2]
// ].reduce((tape, f) => f(tape), tape);

// [
//   TM_INC,
//   TM_INC,
//   TM_LOOP([TM_DEC, TM_RIGHT, TM_INC, TM_INC, TM_INC, TM_LEFT]),
//   TM_RIGHT,
//   TM_PRINT, // 0 [6]
//   TM_LEFT,
//   TM_PRINT, // [0] 6
// ].reduce((tape, f) => f(tape), tape);
