console.log('====== blog1.mjs ======');

const TRUE = (x) => (y) => x;
const FALSE = (x) => (y) => y;
const IF = (c) => (x) => (y) => c(x)(y);
// 説明用コード
const TO_BOOLEAN = (b) => b(true)(false);
console.log(TO_BOOLEAN(TRUE)); // true
console.log(IF(TRUE)('yes')('no')); // "yes"
console.log(IF(FALSE)('yes')('no')); // "no"

// 定義
const ZERO = (p) => (n) => n;
const ONE = (p) => (n) => p(n);
const TWO = (p) => (n) => p(p(n));
const THREE = (p) => (n) => p(p(p(n)));
const FOUR = (p) => (n) => p(p(p(p(n))));
const FIVE = (p) => (n) => p(p(p(p(p(n)))));
const SIX = (p) => (n) => p(p(p(p(p(p(n))))));
const SEVEN = (p) => (n) => p(p(p(p(p(p(p(n)))))));
// 説明用コード
const TO_INT = (x) => x((n) => n + 1)(0);
console.log(TO_INT(TWO)); // 2

// 定義
const IS_ZERO = (n) => n((x) => FALSE)(TRUE);
// 説明用コード
console.log(TO_BOOLEAN(IS_ZERO(ZERO))); // TRUE
console.log(TO_BOOLEAN(IS_ZERO(ONE))); // FALSE
console.log(TO_BOOLEAN(IS_ZERO(TWO))); // FALSE

// 定義
const INC = (n) => (p) => (x) => p(n(p)(x));
// 確認用コード
console.log(TO_INT(INC(TWO))); // 3

const ADD = (m) => (n) => n(INC)(m); // m+n
const MUL = (m) => (n) => n(ADD(m))(ZERO); // m*n
const POW = (m) => (n) => n(MUL(m))(ONE); // m^n
// 確認用コード
console.log(TO_INT(ADD(TWO)(THREE))); // 5
console.log(TO_INT(MUL(TWO)(THREE))); // 6
console.log(TO_INT(POW(TWO)(THREE))); // 8

export {
  ADD,
  FALSE,
  FIVE,
  FOUR,
  IF,
  INC,
  IS_ZERO,
  MUL,
  ONE,
  POW,
  SEVEN,
  SIX,
  THREE,
  TO_BOOLEAN,
  TO_INT,
  TRUE,
  TWO,
  ZERO,
};
