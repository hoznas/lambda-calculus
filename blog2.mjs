import {
  ADD,
  FIVE,
  FOUR,
  IF,
  INC,
  IS_ZERO,
  MUL,
  ONE,
  SEVEN,
  SIX,
  THREE,
  TO_INT,
  TWO,
  ZERO,
} from './blog1.mjs';

console.log('====== blog2.mjs ======');
console.log(ADD, MUL);

// 定義
const PAIR = (l) => (r) => (f) => f(l)(r);
const LEFT = (p) => p((l) => (r) => l);
const RIGHT = (p) => p((l) => (r) => r);
// 確認用コード
const create = (id) => (name) => (age) => PAIR(id)(PAIR(name)(age));
const getId = LEFT;
const getName = (user) => LEFT(RIGHT(user));
const getAge = (user) => RIGHT(RIGHT(user));
const user1 = create('001')('taro')('20');
console.log(getId(user1)); // 001
console.log(getName(user1)); // taro
console.log(getAge(user1)); // 20

// 定義
const SLIDE = (p) => PAIR(RIGHT(p))(INC(RIGHT(p)));
// 確認用コード
const slide1 = SLIDE(PAIR(ZERO)(ZERO));
const slide2 = SLIDE(SLIDE(PAIR(ZERO)(ZERO)));
const slide3 = SLIDE(SLIDE(SLIDE(PAIR(ZERO)(ZERO))));
console.log(TO_INT(LEFT(slide1)), TO_INT(RIGHT(slide1))); // 0,1
console.log(TO_INT(LEFT(slide2)), TO_INT(RIGHT(slide2))); // 1,2
console.log(TO_INT(LEFT(slide3)), TO_INT(RIGHT(slide3))); // 2,3

// 定義
const DEC = (n) => LEFT(n(SLIDE)(PAIR(ZERO)(ZERO)));
// 確認用コード
console.log(TO_INT(DEC(TWO))); // 1

// 定義
const SUB = (m) => (n) => n(DEC)(m);
// 確認用コード
console.log(TO_INT(SUB(FOUR)(THREE))); // 1

// 定義
const LE = (m) => (n) => IS_ZERO(SUB(m)(n));
// 確認用コード
console.log(IF(LE(ONE)(TWO))('yes')('no')); // yes
console.log(IF(LE(TWO)(TWO))('yes')('no')); // yes
console.log(IF(LE(TWO)(ONE))('yes')('no')); // no

const Z = (f) => (x) => f((y) => x(x)(y))((x) => f((y) => x(x)(y)));

const FIX = (f) => f(f);

// 定義
const MOD_LOOP = (f) => (m) => (n) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(x))(m);
const MOD = FIX(MOD_LOOP);
// 確認用コード
console.log(TO_INT(MOD(FIVE)(THREE))); // 2

// 定義
const DIV_LOOP = (f) => (m) => (n) => (c) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(INC(c))(x))(c);
const DIV = (m) => (n) => FIX(DIV_LOOP)(m)(n)(ZERO);
// 確認用コード
console.log(TO_INT(DIV(SEVEN)(THREE))); //2

const SUB2 = (m) => (n) =>
  n((n) =>
    ((p) => p((l) => (r) => l))(
      n((p) =>
        (
          (l) => (r) => (f) =>
            f(l)(r)
        )(((p) => p((l) => (r) => r))(p))(
          (
            (n) => (p) => (x) =>
              p(n(p)(x))
          )(((p) => p((l) => (r) => r))(p))
        )
      )(
        (
          (l) => (r) => (f) =>
            f(l)(r)
        )((p) => (n) => n)((p) => (n) => n)
      )
    )
  )(m);
console.log(TO_INT(SUB2(SIX)(THREE))); // 3
console.log(
  TO_INT(
    (
      (m) => (n) =>
        ((f) => f(f))(
          (f) => (m) => (n) => (c) =>
            (
              (c) => (x) => (y) =>
                c(x)(y)
            )(
              (
                (m) => (n) =>
                  ((n) => n((x) => (x) => (y) => y)((x) => (y) => x))(
                    (
                      (m) => (n) =>
                        n((n) =>
                          ((p) => p((l) => (r) => l))(
                            n((p) =>
                              (
                                (l) => (r) => (f) =>
                                  f(l)(r)
                              )(((p) => p((l) => (r) => r))(p))(
                                (
                                  (n) => (p) => (x) =>
                                    p(n(p)(x))
                                )(((p) => p((l) => (r) => r))(p))
                              )
                            )(
                              (
                                (l) => (r) => (f) =>
                                  f(l)(r)
                              )((p) => (n) => n)((p) => (n) => n)
                            )
                          )
                        )(m)
                    )(m)(n)
                  )
              )(n)(m)
            )((x) =>
              f(f)(
                (
                  (m) => (n) =>
                    n((n) =>
                      ((p) => p((l) => (r) => l))(
                        n((p) =>
                          (
                            (l) => (r) => (f) =>
                              f(l)(r)
                          )(((p) => p((l) => (r) => r))(p))(
                            (
                              (n) => (p) => (x) =>
                                p(n(p)(x))
                            )(((p) => p((l) => (r) => r))(p))
                          )
                        )(
                          (
                            (l) => (r) => (f) =>
                              f(l)(r)
                          )((p) => (n) => n)((p) => (n) => n)
                        )
                      )
                    )(m)
                )(m)(n)
              )(n)(
                (
                  (n) => (p) => (x) =>
                    p(n(p)(x))
                )(c)
              )(x)
            )(c)
        )(m)(n)((p) => (n) => n)
    )(MUL(FOUR)(FOUR))(THREE)
  )
);
