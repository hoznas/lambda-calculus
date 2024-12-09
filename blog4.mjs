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

const showTape = (tape) => {
  const left = TO_ARRAY(LEFT_TAPE(tape));
  const current = TO_INT(CURRENT(tape));
  const right = TO_ARRAY(RIGHT_TAPE(tape));
  // console.log({ left: left.reverse(), current, right });

  return left.reverse().join(',') + ',[' + current + '],' + right.join(',');
};

const LEFT_OR_ZERO = (halfTape) => IF(IS_NIL(halfTape))(ZERO)(LEFT(halfTape));

const NEW_TAPE = (left) => (current) => (right) =>
  PAIR(left)(PAIR(current)(right));
const LEFT_TAPE = LEFT;
const CURRENT = (tape) => LEFT(RIGHT(tape));
const RIGHT_TAPE = (tape) => RIGHT(RIGHT(tape));

const TM_INC = (tape) => (x) => {
  console.log('TM_INC', showTape(tape));
  return NEW_TAPE(LEFT_TAPE(tape))(INC(CURRENT(tape)))(RIGHT_TAPE(tape));
};
const TM_DEC = (tape) => (x) => {
  console.log('TM_DEC', showTape(tape));
  return NEW_TAPE(LEFT_TAPE(tape))(DEC(CURRENT(tape)))(RIGHT_TAPE(tape));
};
const TM_RIGHT = (tape) => (x) => {
  console.log('TM_RIGHT', showTape(tape));
  return NEW_TAPE(PAIR(CURRENT(tape))(LEFT_TAPE(tape)))(
    LEFT_OR_ZERO(RIGHT_TAPE(tape))
  )(RIGHT(RIGHT_TAPE(tape)));
};
const TM_LEFT = (tape) => (x) => {
  console.log('TM_LEFT', showTape(tape));
  const left = RIGHT(LEFT_TAPE(tape));
  const current = LEFT_OR_ZERO(LEFT_TAPE(tape));
  const right = PAIR(CURRENT(tape))(RIGHT_TAPE(tape));
  return NEW_TAPE(left)(current)(right);
};
const TM_PRINT = (tape) => (x) => {
  console.log('TM_PRINT', showTape(tape));
  console.log(TO_INT(CURRENT(tape)));
  return tape;
};

const FIX2 = (f) => (x) => f(FIX2(f))(x);

const TM_LOOP = (commandList) => (tape) => (x) => {
  console.log('TM_LOOP');
  const trueCase = (x) => tape;
  const falseCase = (x) => {
    const nextTape = EVAL_LIST(commandList)(tape)(x);
    console.log('nextTape', showTape(nextTape));
    return TM_LOOP(commandList)(nextTape)(x);
  };
  return (IF(IS_ZERO(CURRENT(tape)))(true)(false) ? trueCase : falseCase)(x);
};

// これは正しく動くが、if文を使っているので直したい
// const EVAL_LIST = (list) => (tape) => {
//   if (IF(IS_NIL(list))(true)(false)) return tape;
//   return EVAL_LIST(RIGHT(list))(LEFT(list)(tape));
// };

const EVAL_LIST = (list) => (tape) => (x) => {
  const trueCase = (x) => tape;
  const falseCase = (x) => {
    return EVAL_LIST(RIGHT(list))(LEFT(list)(tape)(x))(x);
  };
  // console.log('code', LEFT(list));
  return IF(IS_NIL(list))(true)(false) ? trueCase(x) : falseCase(x);
};

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
  TM_RIGHT,
  TM_INC,
  TM_RIGHT,
  TM_DEC,
  TM_PRINT, // -1
  TM_LEFT,
  TM_LEFT,
  TM_LEFT,
  TM_LEFT,
]);

const code2 = toConsList([
  TM_INC,
  TM_INC,
  TM_INC,
  TM_LOOP(toConsList([TM_DEC, TM_RIGHT, TM_INC, TM_INC, TM_LEFT])),
  TM_RIGHT,
  TM_PRINT,
]);

const list = PAIR(ONE)(PAIR(TWO)(PAIR(THREE)(PAIR(FOUR)(NIL))));

const sum = Z(
  (iter) => (list) =>
    IF(IS_NIL(list))(ZERO)((x) => ADD(LEFT(list))(iter(RIGHT(list)))(x))
);
//console.log(sum(NIL)(0));

console.log(EVAL_LIST(code2)(tape)('hello'));
