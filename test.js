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

//console.log('--bool--');
//console.log(TO_BOOL(IS_ZERO(ZERO)));
//console.log(TO_BOOL(IS_ZERO(ONE)));
//console.log(TO_BOOL(IS_ZERO(TWO)));

//console.log('--int--');
//console.log(TO_INT(ZERO));
//console.log(TO_INT(ONE));
//console.log(TO_INT(TWO));
//console.log(TO_INT(THREE));

const INC = (n) => (p) => (x) => p(n(p)(x));
//const foo = INC(TWO)(ADD_ONE)(0);
//const foo = DEC(ONE)(TO_INT)(0);

const ADD = (m) => (n) => n(INC)(m);
const MUL = (m) => (n) => n(ADD(m))(ZERO);
const POW = (m) => (n) => n(MUL(m))(ONE);

//console.log('ADD,SUB,MUL,POW');
//console.log(TO_INT(ADD(THREE)(TWO)));
//console.log(TO_INT(MUL(THREE)(TWO)));
//console.log(TO_INT(POW(THREE)(TWO)));

///// section 2 //////

const PAIR = (x) => (y) => (p) => p(x)(y);
const LEFT = (p) => p(TRUE);
const RIGHT = (p) => p(FALSE);

//console.log('--PAIR--');
//const ONE_TWO_THREE = PAIR(ONE)(PAIR(TWO)(PAIR(THREE)(ZERO)));
//console.log(TO_INT(LEFT(ONE_TWO_THREE)));
//console.log(TO_INT(LEFT(RIGHT(ONE_TWO_THREE))));
//console.log(TO_INT(LEFT(RIGHT(RIGHT(ONE_TWO_THREE)))));

//console.log('--DEC,SUB--');
const SLIDE = (p) => PAIR(RIGHT(p))(INC(RIGHT(p)));
const DEC = (n) => LEFT(n(SLIDE)(PAIR(ZERO)(ZERO)));
const SUB = (m) => (n) => n(DEC)(m);
//console.log(TO_INT(SUB(THREE)(TWO)));

const LE = (m) => (n) => IS_ZERO(SUB(m)(n));

const Y = (f) => (x) => f(x(x))((x) => f(x(x)));
const Z = (f) => (x) => f((y) => x(x)(y))((x) => f((y) => x(x)(y)));

const FIX = (f) => f(f);

const MOD_REC = (f) => (m) => (n) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(x))(m);
const MOD = FIX(MOD_REC);

const DIV_REC = (f) => (m) => (n) => (c) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(INC(c))(x))(c);
const DIV = (m) => (n) => FIX(DIV_REC)(m)(n)(ZERO);

// const MOD = Z(
//   (f) => (m) => (n) =>
//     IF(LE(n)(m))((x) => {
//       console.log('>', TO_INT(m), TO_INT(n));
//       return f(SUB(m)(n))(n)(x);
//     })(m)
// );

console.log('---mod---');
console.log(TO_INT(MOD(SEVEN)(FOUR)));
