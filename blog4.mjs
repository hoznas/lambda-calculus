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
  const left = TO_ARRAY(LEFT_PART(tape));
  const current = TO_INT(CURRENT(tape));
  const right = TO_ARRAY(RIGHT_PART(tape));

  return left.reverse().join(',') + ',[' + current + '],' + right.join(',');
};

const LEFT_OR_ZERO = (halfTape) => IF(IS_NIL(halfTape))(ZERO)(LEFT(halfTape));

const NEW_TAPE = (left) => (current) => (right) =>
  PAIR(left)(PAIR(current)(right));
const LEFT_PART = LEFT;
const CURRENT = (tape) => LEFT(RIGHT(tape));
const RIGHT_PART = (tape) => RIGHT(RIGHT(tape));

const TM_INC = (tape) => (x) =>
  NEW_TAPE(LEFT_PART(tape))(INC(CURRENT(tape)))(RIGHT_PART(tape));

const TM_DEC = (tape) => (x) =>
  NEW_TAPE(LEFT_PART(tape))(DEC(CURRENT(tape)))(RIGHT_PART(tape));

const TM_RIGHT = (tape) => (x) =>
  NEW_TAPE(PAIR(CURRENT(tape))(LEFT_PART(tape)))(
    LEFT_OR_ZERO(RIGHT_PART(tape))
  )(RIGHT(RIGHT_PART(tape)));

const TM_LEFT = (tape) => (x) =>
  NEW_TAPE(RIGHT(LEFT_PART(tape)))(LEFT_OR_ZERO(LEFT_PART(tape)))(
    PAIR(CURRENT(tape))(RIGHT_PART(tape))
  );

const TM_PRINT = (tape) => (x) => {
  console.log(TO_INT(CURRENT(tape)));
  return tape;
};

// const FIX = (f) => f(f);
const TM_LOOP = FIX(
  (recur) => (list) => (tape) => (x) =>
    IF(IS_ZERO(CURRENT(tape)))((x) => tape)((x) =>
      recur(recur)(list)(EVAL_LIST(list)(tape)(x))(x)
    )(x)
);

const EVAL_LIST = FIX(
  (recur) => (list) => (tape) => (x) =>
    IF(IS_NIL(list))((x) => tape)((x) =>
      recur(recur)(RIGHT(list))(LEFT(list)(tape)(x))(x)
    )(x)
);

const toConsList = (arr) => arr.reduceRight((acc, x) => PAIR(x)(acc), NIL);

const code = toConsList([
  TM_INC,
  TM_INC,
  TM_INC,
  TM_INC,
  TM_INC,
  TM_INC,
  TM_INC,
  TM_INC,
  TM_INC,
  TM_INC,
  TM_LOOP(
    toConsList([
      TM_DEC,
      TM_RIGHT,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_INC,
      TM_LEFT,
    ])
  ),
  TM_RIGHT,
  TM_PRINT,
]);

const tape = NEW_TAPE(NIL)(ZERO)(NIL);

EVAL_LIST(code)(tape)('dummy');
