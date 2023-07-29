# 今回のテーマ：ラムダ関数でお手軽にラムダ計算をしよう！

## 経緯

今まで、２回連載して行きましたが、Tokenizer → Parser → Evaluator といった、大掛かりな機能を複数組み合わせてインタプリタを作り続けてきたのですが、多分皆さんとっつきにくかったかもと反省しています。
今回は今風のプログラミング言語によくあるラムダ関数をそのまま活かして、今回はコツコツを部品を組み立てていきながら「形無しラムダ計算」というプログラミング環境を実現します。

## 対象の読者

- 関数型言語の根底にあるラムダ計算に興味のある人
- ラムダ関数を使ったプログラミングパズル（のようなもの）を楽しみたい人

## 目標

このテーマでの目標は、ラムダ関数の持つ能力だけで型なしラムダ計算を行います。
BrainF\*ck インタプリタの作成を通じて。ラムダ計算がチューリング等価であることを証明します。

## 型無しラムダ計算とは

- ラムダ関数しか存在しない、関数型プログラミング環境です。
- ラムダ関数は全て、引数は関数１個、戻り値も関数１個です。
  - あえて Typescript で書くと `type LambdaFunction = (a:LambdaFunction) => LambdaFunction` 　となります。

## ラムダ関数とは

ラムダ関数は、名前のない関数のことです。具体的には以下のようなものです。

- javascript の`(a)=>a`
- Ruby の`-> a {-> f { f[a] }}`
- Scheme の`（lambda (a) (lambda (f) (f a)))`

# 今回の書き方のルール

前提として、ラムダ計算ではラムダ関数を多用するので、ラムダ関数の記法がスッキリしている Javascript で説明を行います。
計算そのものは Javascript 固有の機能は使いませんので Ruby でも Scheme でもラムダ関数さえあればなんでも大丈夫です。

## 関数だけで言語が構築されます

- 関数以外の要素は一才不要です。
  - 登場する要素
    - 関数 (a)=>a
    - 関数呼び出し (a)=>(b)=>(f)=>f(a)(b)
  - 登場しない要素
    - 真偽値、数値、文字列、配列、クラスなど関数以外の値
    - 変数（引数は含まない）、if/for/while などの各種構文
- ですが、説明のために関数以外の要素が登場します。ラムダ計算には必須の機能ではないのでソースコード上ではコメントで`// 確認用コード`と記入して区別しています。

## 関数の引数は関数一つだけ、関数の戻り値も一つの関数だけ

ところで皆さん、「引数が関数一つだけの関数ではまともなプログラミングができないのでは？」っておもいますよね？
実はそんなに問題はありません。
複数の引数を与えることもできます。（矛盾）

また、引数と戻り値がシンプルになるだけでなく、高階関数化やカリー化などを自然に備えるというメリットもあります。（ここでは詳しく説明しませんので気になったら調べてみてください。）

以下に複数の引数を与える例を示します。

```
// 一般的な書き方

const Add = (a, b) => a + b
add(1, 2)  // => 3

// Addをカリー化した関数の例
const AddCurried = (a) -> (b) => a + b
AddCurried(1)(2)  // => 3

// 高階関数（関数を返す関数）の例
const AddOne = AddCurried(1) // (b) => 1 + b
AddOne(2) // => 3
```

# では、ラムダ計算をやってみよう

## 真偽値と if

TRUE,FALSE,IF は以下のように関数で表すことができます。
ソースコードは普通の Javascript なので実行して動作確認ができます。

```
// 定義
const TRUE = x => y => x
const FALSE = x => y => y
const IF => c => x => y => c(x)(y)
// 説明用コード
const TO_BOOLEAN = b(true)(false)
TO_BOOLEAN(TRUE) // true
console.log(IF(TRUE)("yes")("no")) // "yes"
console.log(IF(FALSE)("yes")("no")) // "no"
```

## 数値

基点の n に対して、操作 p を数値分、繰り返し適用することで数値を表現できます。

```
// 定義
const ZERO = p => n => n
const ONE = p => n => p(n)
const TWO = p => n => p(p(n))
const THREE = p => n => p(p(p(n)))
const IS_ZERO = n => n(x=>x(FALSE))(TRUE)
// 説明用コード
const TO_INT => x => x(n=>n+1)(0)
console.log(TO_INT(TWO)) // 2
console.log(TO_BOOL(IS_ZERO(ZERO))) // TRUE
console.log(TO_BOOL(IS_ZERO(TWO))) // FALSE
```

## ペア

scheme などではペアを使うことで複雑なデータ構造を作ることができます。
組み合わせを組み合わせれば、配列やオブジェクト（class や構造体）なども表現できます。

```
// 定義
const PAIR = l => r => f => f(l)(r)
const LEFT => l => r => l
const RIGHT => l => r => r
// 説明用コード
const User = id => name => PAIR(id)(name)
const getId = LEFT
const getName = RIGHT
const user = User("001")("taro")
const getId(user) // "001"
const getName(user) // "taro"
```

# 数値演算

### INC

まずは基礎的な計算を実行できるように INC(increment,+1)と DEC(decrement-1,)を実装する必要があります。

```
// 定義
const INC = n => p => x => x(n(p)(x))
// 確認用コード
const INC_TWO = INC(TWO)
console.log(TO_INT(INC_TWO)) // 3
```

パッと見ではわからなくなってきたかもしれません。でも多分大丈夫です。
上記の INC(TWO)を考えてみましょう。

```
INC(TWO)
= (n => p => x => p(n(p))(x))(TWO)  // INCを展開
= p => x => p(TWO(p)(x))  // nにTWOを代入
= p => x => p(a => b => a(a(b))(p)(x)) // TWOはa => b => a(a(b))（なお引数名がかぶるので引数名を変更しています）
= p => x => p(b => p(p(b))(x)) // aにpを代入
= p => x => p(p(p(x))) // bにxを代入
= THREE // xにpを３回適用するのはまさしくTHREEですね。
```

引数１つづつ展開するとわかると思います。
なお、私はラムダ計算を計算するとき紙で計算する時があります。

### DEC

次に DEC(decrement,-1)を実装します。
例えば DEC(TWO)だと p => n => p(p(n))から p を一個取れば ONE ができそうですね！
ですが、簡単に見えて全くできないです。

引き算をそのままできないので、これまでに登場した関数を組み合わせて「一個少ない数」を作る必要があります。

```
const SLIDE = x => PAIR(CDR(x))(INC(CDR(x)))
SLIDE(PAIR(ZERO)(ZERO)) // [0,1]
SLIDE(SLIDE(PAIR(ZERO)(ZERO))) // [1,2]
SLIDE(SLIDE(SLIDE(PAIR(ZERO)(ZERO)))) // [2,3]
```

SLIDE を n 回繰り返すと、LEFT で n-1 を取り出せるようになりましたね！
これで DEC を実装できます。

```
// 定義
const DEC = n => LEFT(n(SLIDE)(PAIR(ZERO)(ZERO)))
// 確認用コード
DEC(TWO) // TWO 計算は省略します
```

なお、この DEC では負数を扱うことができません。
負数も扱いたいときは、PAIR(TRUE)(1)、PAIR(FALSE)(1)のような数値体系を構築するといいかもです。

### ADD,SUB,MUL,POW

INC と DEC を使うと、次の演算ができるようになります。

```
const INC = m => n => n(INC)(m) // m+n
const DEC = m => n => n(DEC)(m) // m-n ただしm<nのときは0
const MUL = m => n => n(ADD(m))(ZERO) // m*n
const POW = m => n => n(MUL(m))(ONE) // m^n
```

説明なく書きましたが、MUL で ADD(m)といった表現をしています。関数の部分適用と言います。
必要な引数全てを適用しない使い方がができます。
よく出てくるのでここで感覚を掴んでおきましょう。

```
const myAdd = m => n => m+n
const addOne = myAdd(1) // addOne == n => 1+n
addOne(2)               // 1 + 2
```

### LE

「割り算がないな」そう思いましたよね？
はい。割り算や余りの計算にはまだ材料が足りません。

LE(less or equal, <=)を実装します。
`m<=n` は `m-n<=0` ですね！
さっき定義した SUB は`m<n`のとき 0 を返すので、m-n=0 を確認すればいいですね！

```
// 定義
const LE = m => n => IS_ZERO(SUB(m)(n))
// 確認用コード
IF(LE(ONE)(TWO))("yes")("no")
```

### 無名再帰関数

割り算(DIV)と余り(MOD)を計算するするには再帰処理をする仕組みが必要です。
普通は再帰関数は自分自身を呼び出せばいいのですが、変数のないラムダ計算では再帰をさせるのに一工夫が必要です。

```
const div = (m, n, c=0) => {
  if(m>n)
    return div(m-n,n,c+1)// 自分自身を参照できないと再帰ができない
  else
    return c
}
```

そこでラムダ計算で再帰関数を使うために、FIX 関数が必要です。
関数を受け取って、自分自身の参照を渡すことで再帰が出来るようになります。
（本当は Y コンビネータや Z コンビネータを使うのですが私が書くとうまく動きません。）

```
const FIX = (f) => f(f);
```

FIX 関数を使って、比較的簡単な「余り」を計算する関数を作ります。

```
// 定義
const MOD_REC = (f) => (m) => (n) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(x))(m);
const MOD = FIX(MOD_REC);
// 確認用コード
MOD(MUL(THREE)(THREE))(ADD(TWO)(THREE)) // 9➗5の余り4
```

一工夫必要な割り算は以下です。

```
// 定義
const DIV_REC = (f) => (m) => (n) => (c) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(INC(c))(x))(c);
const DIV = (m) => (n) => FIX(DIV_REC)(m)(n)(ZERO);
// 確認用コード
DIV(MUL(THREE)(THREE))(FOUR) // 2
```

# 今回はここまで

今回は基礎的な演算と再帰の仕組みを作りました。
次回はリスト構造（配列）と NIL、MAP、REDUCE を定義します。
