import {
  ADD,
  DEC,
  DIV,
  FALSE,
  FIVE,
  FIX,
  FOUR,
  IF,
  INC,
  IS_ZERO,
  LE,
  LEFT,
  MOD,
  MUL,
  ONE,
  PAIR,
  POW,
  RIGHT,
  SEVEN,
  SIX,
  SLIDE,
  SUB,
  THREE,
  TO_BOOLEAN,
  TO_INT,
  TRUE,
  TWO,
  Z,
  ZERO,
} from './blog2.mjs';
console.log('====== blog3.mjs ======');

// 定義
// const PAIR = (x) => (y) => (p) => p(x)(y); // 定義済み
// const LEFT = (p) => p(TRUE); // 定義済み
// const RIGHT = (p) => p(FALSE); // 定義済み
const NIL = FALSE;
const IS_NIL = (x) => x((a) => (b) => (c) => FALSE)(TRUE);
const list = PAIR(ONE)(PAIR(TWO)(PAIR(THREE)(PAIR(FOUR)(NIL))));
// 確認用コード
console.log(TO_BOOLEAN(IS_NIL(list))); // FALSE
console.log(TO_BOOLEAN(IS_NIL(NIL))); // TRUE

// 確認用コード
const TO_ARRAY = (list) => {
  if (IS_NIL(list)(true)(false)) {
    return [];
  }
  return [TO_INT(LEFT(list)), ...TO_ARRAY(RIGHT(list))];
};
// 確認用コード
console.log(TO_INT(LEFT(list))); // 1
console.log(TO_INT(LEFT(RIGHT(list)))); // 2
console.log(TO_INT(LEFT(RIGHT(RIGHT(list))))); // 3
console.log(TO_INT(LEFT(RIGHT(RIGHT(RIGHT(list)))))); // 4
console.log(TO_ARRAY(list)); // [1,2,3,4]
console.log(TO_BOOLEAN(IS_NIL(list))); // FALSE
console.log(TO_BOOLEAN(IS_NIL(NIL))); // TRUE
console.log(TO_BOOLEAN(IS_NIL(RIGHT(RIGHT(RIGHT(RIGHT(list))))))); // TRUE

// 定義
const FOLD_LOOP = (s) => (f) => (r) => (l) =>
  IF(IS_NIL(l))(r)((x) => s(s)(f)(f(r)(LEFT(l)))(RIGHT(l))(x));
const FOLD = FIX(FOLD_LOOP);
const REVERSE = (l) => FOLD((acc) => (x) => PAIR(x)(acc))(NIL)(l);
const MAP = (f) => (l) =>
  FOLD((acc) => (x) => PAIR(f(x))(acc))(NIL)(REVERSE(l));
// 確認用コード
const DOUBLE = (n) => ADD(n)(n);
const doubled = MAP(DOUBLE)(list);
console.log(TO_ARRAY(doubled)); // [2,4,6,8]

const reversed = REVERSE(list);
console.log('x', TO_ARRAY(reversed));
const map2 = MAP(DOUBLE)(list);
console.log('y', TO_ARRAY(map2));

const doubledSum = FOLD(ADD)(ZERO)(doubled);
console.log(TO_INT(doubledSum)); // 20
console.log(
  TO_INT(
    FOLD(ADD)(ZERO)(
      MAP(DOUBLE)(PAIR(ONE)(PAIR(TWO)(PAIR(THREE)(PAIR(FOUR)(NIL)))))
    )
  )
); // 20

export {
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
};
