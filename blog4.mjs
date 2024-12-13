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

// 定義（参考）
// const PAIR = (x) => (y) => (p) => p(x)(y); // 定義済み
// const LEFT = (p) => p(TRUE); // 定義済み
// const RIGHT = (p) => p(FALSE); // 定義済み

// テープの生成と操作
const NEW_TAPE = (left) => (current) => (right) =>
  PAIR(left)(PAIR(current)(right));
const LEFT_PART = LEFT;
const CURRENT = (tape) => LEFT(RIGHT(tape));
const RIGHT_PART = (tape) => RIGHT(RIGHT(tape));

const LEFT_OR_ZERO = (halfTape) => IF(IS_NIL(halfTape))(ZERO)(LEFT(halfTape));

//テープの中身を表示（補助関数）
const showTape = (tape) => {
  const left = TO_ARRAY(LEFT_PART(tape));
  const current = TO_INT(CURRENT(tape));
  const right = TO_ARRAY(RIGHT_PART(tape));
  return left.reverse().join(',') + ',[' + current + '],' + right.join(',');
};

// Brainf*ckの命令セット
// +
const TM_INC = (tape) => (_) =>
  NEW_TAPE(LEFT_PART(tape))(INC(CURRENT(tape)))(RIGHT_PART(tape));
// -
const TM_DEC = (tape) => (_) =>
  NEW_TAPE(LEFT_PART(tape))(DEC(CURRENT(tape)))(RIGHT_PART(tape));
// >
const TM_RIGHT = (tape) => (_) =>
  NEW_TAPE(PAIR(CURRENT(tape))(LEFT_PART(tape)))(
    LEFT_OR_ZERO(RIGHT_PART(tape))
  )(RIGHT(RIGHT_PART(tape)));
// <
const TM_LEFT = (tape) => (_) =>
  NEW_TAPE(RIGHT(LEFT_PART(tape)))(LEFT_OR_ZERO(LEFT_PART(tape)))(
    PAIR(CURRENT(tape))(RIGHT_PART(tape))
  );
// .
const TM_PRINT = (tape) => (_) => {
  console.log(TO_INT(CURRENT(tape)));
  return tape;
};
// ,
// 未実装

// ループ命令　[と]
const TM_LOOP = FIX(
  (recur) => (list) => (tape) => (_) =>
    IF(IS_ZERO(CURRENT(tape)))((_) => tape)((_) =>
      recur(recur)(list)(EVAL_LIST(list)(tape)(_))(_)
    )(_)
);

// Brainf*ckの命令を実行
const EVAL_LIST = FIX(
  (recur) => (list) => (tape) => (_) =>
    IF(IS_NIL(list))((_) => tape)((_) =>
      recur(recur)(RIGHT(list))(LEFT(list)(tape)(_))(_)
    )(_)
);

// 配列をペアリストに変換（補助関数）
const toPairList = (ary) => ary.reduceRight((acc, cmd) => PAIR(cmd)(acc), NIL);

// Brainf*ckコード
// ++++++++++[->++++++++++<]>. と同じ
const code = toPairList([
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
    toPairList([
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

// テープの初期化
const tape = NEW_TAPE(NIL)(ZERO)(NIL);

// コードの実行
// 第3引数はダミーで使用されない
const result = EVAL_LIST(code)(tape)(NIL);
console.log('tape=', showTape(result)); // 0,[100],
