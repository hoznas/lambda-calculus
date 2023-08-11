const TRUE = (x) => (y) => x;
const FALSE = (x) => (y) => y;
const TO_BOOL = (b) => b(true)(false);

const IF = (c) => (x) => (y) => c(x)(y);

const ZERO = (p) => (x) => x;
const ONE = (p) => (x) => p(x);
const TWO = (p) => (x) => p(p(x));
const THREE = (p) => (x) => p(p(p(x)));
const FOUR = (p) => (x) => p(p(p(p(x))));
const FIVE = (p) => (x) => p(p(p(p(p(x)))));
const SIX = (p) => (x) => p(p(p(p(p(p(x))))));
const SEVEN = (p) => (x) => p(p(p(p(p(p(p(x)))))));
const EIGHT = (p) => (x) => p(p(p(p(p(p(p(p(x))))))));
const NINE = (p) => (x) => p(p(p(p(p(p(p(p(p(x)))))))));
const TEN = (p) => (x) => p(p(p(p(p(p(p(p(p(p(x))))))))));

const TO_INT = (proc) => proc((n) => n + 1)(0);
const IS_ZERO = (n) => n((x) => FALSE)(TRUE);

console.log('--bool--');
console.log(TO_BOOL(IS_ZERO(ZERO)));
console.log(TO_BOOL(IS_ZERO(ONE)));
console.log(TO_BOOL(IS_ZERO(TWO)));

console.log('--int--');
console.log(TO_INT(ZERO));
console.log(TO_INT(ONE));
console.log(TO_INT(TWO));
console.log(TO_INT(THREE));

const INC = (n) => (p) => (x) => p(n(p)(x));
//const foo = INC(TWO)(ADD_ONE)(0);
//const foo = DEC(ONE)(TO_INT)(0);

const ADD = (m) => (n) => n(INC)(m);
const MUL = (m) => (n) => n(ADD(m))(ZERO);
const POW = (m) => (n) => n(MUL(m))(ONE);

console.log('ADD,SUB,MUL,POW');
console.log(TO_INT(ADD(THREE)(TWO)));
console.log(TO_INT(MUL(THREE)(TWO)));
console.log(TO_INT(POW(THREE)(TWO)));

///// section 2 //////

const PAIR = (x) => (y) => (p) => p(x)(y);
const LEFT = (p) => p(TRUE);
const RIGHT = (p) => p(FALSE);

console.log('--PAIR--');
const ONE_TWO_THREE = PAIR(ONE)(PAIR(TWO)(PAIR(THREE)(NIL)));
console.log(TO_INT(LEFT(ONE_TWO_THREE)));
console.log(TO_INT(LEFT(RIGHT(ONE_TWO_THREE))));
console.log(TO_INT(LEFT(RIGHT(RIGHT(ONE_TWO_THREE)))));

console.log('--DEC,SUB--');
const SLIDE = (p) => PAIR(RIGHT(p))(INC(RIGHT(p)));
const DEC = (n) => LEFT(n(SLIDE)(PAIR(ZERO)(ZERO)));
const SUB = (m) => (n) => n(DEC)(m);
console.log(TO_INT(SUB(THREE)(TWO)));

const LE = (m) => (n) => IS_ZERO(SUB(m)(n));

const Y = (f) => (x) => f(x(x))((x) => f(x(x)));
const y = (f) => ((x) => f((v) => x(x)(v)))((x) => f((v) => x(x)(v)));

const Z = (f) => (x) => f((y) => x(x)(y))((x) => f((y) => x(x)(y)));

const FIX = (f) => f(f);

const MOD_REC = (f) => (m) => (n) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(x))(m);
const MOD = FIX(MOD_REC);

const DIV_REC = (f) => (m) => (n) => (c) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(INC(c))(x))(c);
const DIV = (m) => (n) => FIX(DIV_REC)(m)(n)(ZERO);

const NIL = FALSE;
const IS_NIL = (x) => x((a) => (b) => (c) => FALSE)(TRUE);
const list = PAIR(ONE)(PAIR(TWO)(PAIR(THREE)(PAIR(FOUR)(NIL))));

console.log('--list--');
console.log(IS_NIL(list));
console.log(IS_NIL(RIGHT(list)));
console.log(IS_NIL(RIGHT(RIGHT(list))));
console.log(IS_NIL(RIGHT(RIGHT(RIGHT(list)))));
console.log(IS_NIL(RIGHT(RIGHT(RIGHT(RIGHT(list))))));
console.log(IS_NIL(NIL));

const AND = (p) => (q) => p(q)(p);
const OR = (p) => (q) => p(p)(q);
const NOT = (p) => p(FALSE)(TRUE);

const MAP_REC = (self) => (f) => (l) =>
  IF(IS_NIL(l))(NIL)((x) => PAIR(f(LEFT(l)))(self(self)(f)(RIGHT(l)))(x));

const MAP = FIX(MAP_REC);
const list2 = MAP(MUL(TWO))(list);

console.log('--list--');
console.log(TO_INT(LEFT(RIGHT(RIGHT(list2)))));

const FOLD_REC = (self) => (f) => (init) => (list) =>
  IF(IS_NIL(list))(init)((x) =>
    self(self)(f)(f(init)(LEFT(list)))(RIGHT(list))(x)
  );
const FOLD = FIX(FOLD_REC);

const SUM = FOLD(ADD)(ZERO);
console.log(TO_INT(SUM(list)));

// const RANGE_REC = (self) => (m) => (n) =>
//   IF(
//     LE(m)(n)
//   )(
//     (x) => PAIR(m)(self(self)(INC(m))(n)(x))
//   )(
//     NIL
//   );

const RANGE_REC = (self) => (m) => (n) => (x) =>
  IF(LE(m)(n))((f) => f(PAIR(m)(self(self)(INC(m))(n)(x))))(x)(NIL);

const RANGE = FIX(RANGE_REC);

const LENGTH = FOLD((x) => (y) => INC(x))(ZERO);
console.log(TO_INT(LENGTH(list)));

console.log('--GET_VALUE--');

const GET_VALUE = (cell) => IF(IS_NIL(cell))(ZERO)(LEFT(cell));
console.log(TO_INT(GET_VALUE(NIL)));
console.log(TO_INT(GET_VALUE(PAIR(THREE)(NIL))));

console.log('--GET_NEXT--');
const GET_NEXT = (cell) => IF(IS_NIL(cell))(NIL)(RIGHT(cell));
console.log(TO_INT(GET_NEXT(NIL)));
console.log(TO_INT(LEFT(GET_NEXT(PAIR(THREE)(PAIR(FOUR)(NIL))))));
