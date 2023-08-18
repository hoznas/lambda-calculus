# 今回のテーマ：ラムダ計算を楽しもう！

# 第２回　ひき算とわり算

## はじめに

ラムダ計算第１回記事では、真偽値と数値、たし算とかけ算を定義しました。
今回は引き算と割り算の定義を行います。

ひき算とわり算の実装には、思ったよりたくさんの準備が必要なので頑張って進めましょう。

この記事は第１回の記事を読んだ方が対象です。
まだ読んでいない方は　こちら　を先にお読みください。

## 難易度

Level: 第１章が分かれば多分いけます。

今回も置き去りにならないようしっかりついてきてください。

## 目標

この連載ではラムダ計算の機能を実装することで、ラムダ計算がチューリング完全な機能を持つことを証明します。

今回のテーマは以下の第 2 章にあたります。
たし算、わり算よりもちょっと難しいひき算、わり算に取り組みます。

- 第 1 章 ラムダ計算の基礎と真偽値、数値とたし算、かけ算
- 第 2 章 ひき算とわり算、(Y|Z)コンビネータ
- 第 3 章 リスト構造とリストの処理
- 第 4 章 チューリングマシン:無限に長いテープ
- 第 5 章 チューリングマシン:評価器

## 用意するもの

- 推奨: 紙とペン
- なければ: パソコン

# ひき算の作成準備

では早速始めましょう。

みなさん SUB の実装には、ADD を参考にすればいいと思いますよね？
きっとこんなかんじですよね？

```
// const ADD = m => n => m(INC)(n)
const SUB = m => n => m(DEC)(n)
```

ではそのような DEC を作ってみましょう。
例えば DEC(TWO)だと `p => n => p(p(n))`から p の適用 を一個取れば ONE (`p=>n=>p(n)`)ができそうですね！

皆さんできますか？
私は全然できませんでした。

DEC は簡単に見えて、実装は非常に大変です。

とある部品を使うことで DEC が

## PAIR と LEFT、RIGHT の実装

「PAIR の実装は第４章のリストに関連するんじゃ無いの?」と思った皆さん！
鋭いですね！

確かに PAIR が主役になるのは次の掲載です。
ですが PAIR/LEFT/RIGHT は DEC を作る上で必要な関数なのでお付き合いください。

PAIR は二つの組み(ペア)を作る関数です。
また、LEFT と RIGHT は PAIR で作った値からペアの片方を取得するために必要な関数です。

これらの関数を組み合わせることで、配列（リスト）やオブジェクトなど、複雑なデータ構造組み立てることができます。

```
// 定義
const PAIR = l => r => f => f(l)(r)
const LEFT = l => r => l
const RIGHT = l => r => r
// 確認用コード
const create = id => name => age => PAIR(id)(PAIR(name)(age))
const getId = LEFT
const getName = user => LEFT(RIGHT(user))
const getAge = user => RIGHT(RIGHT(user))
const user1 = create("001")("taro")("20")
console.log(getId(user1)) // 001
console.log(getName(user1)) // taro
console.log(getAge(user1)) // 20
```

PAIR は IF と引数の順番が違うだけの関数ですね。

そして LEFT/RIGHT はそれぞれ TRUE/FALSE と対応しています。

## SLIDE

先ほど定義した PAIR を使うことで、`m-1`と`m`のペアを作ることができるようになります。

SLIDE は`[0,0]`から始まって、`[0,0]`→`[0,1]`→`[2,3]`→`[3,4]`→`[4,5]`のように右から左にスライドすることで、`[n-1,n]`を作る関数です。

```
// 定義
const SLIDE = p => PAIR(RIGHT(p))(INC(RIGHT(p)));
// 確認用コード
const slide1 = SLIDE(PAIR(ZERO)(ZERO))
const slide2 = SLIDE(SLIDE(PAIR(ZERO)(ZERO)))
const slide3 = SLIDE(SLIDE(SLIDE(PAIR(ZERO)(ZERO))))
console.log(TO_INT(LEFT(slide1)), TO_INT(RIGHT(slide1))) // 0,1
console.log(TO_INT(LEFT(slide2)), TO_INT(RIGHT(slide2))) // 1,2
console.log(TO_INT(LEFT(slide3)), TO_INT(RIGHT(slide3))) // 2,3
```

SLIDE を n 回適用すると、LEFT で n-1 が取得できますね。
（ただし、n=0 の時は 0 が還ります。）

## DEC の定義

たくさんの準備が必要でしたが、これでようやく DEC を実装できます。

```
// 定義
const DEC = n => LEFT(n(SLIDE)(PAIR(ZERO)(ZERO)))
// 確認用コード
console.log(TO_INT(DEC(TWO))) // ONE
```

なお、この DEC では負数を扱うことができません。
SLIDE の使用により DEC(ZERO)は ZERO に評価されます。

# ひき算

ではひき算を定義しましょう。

```
// 定義
const SUB = (m) => (n) => n(DEC)(m);
// 確認用コード
console.log(TO_INT(SUB(FOUR)(THREE))) // 1
```

長く大変な道のりでしたがようやくひき算を実装できました！
なお、SLIDE や DEC の使用により、m < n のとき、DEC(m)(n)の計算結果が 0 になります。
このことは覚えていてください。

# わり算の準備

わり算については仕様を決める必要があります。
というのも、今実装しているラムダ計算の体系には 0 と正数しか存在していません。
説明と実装の簡略化のため、計算結果を正数(と 0)にする必要があります。
なので、`10➗3🟰商3、あまり1`という計算を行うものとします。

わり算についてもいくつかの準備が必要です。

わり算の計算を Javascript で書くと以下のようになります。

```
const div = (m,n,count=0) => {
  if(n<=m) return div(m-n, n, count+1)
  else return count
}
```

この中で現在のラムダ計算の体系にないものは何でしょうか？
それは`a<=b`と`再帰`です。

## LE

LE(less or equal, <=)を実装します。

`a<=b` は式を変形すると `a-b<=0` ですね！

さっき定義した SUB は計算結果がマイナスになるとき 0 を返すので、`a-b`が`0` になることを確認すればいいですね！

```
// 定義
const LE = m => n => IS_ZERO(SUB(m)(n))
// 確認用コード
console.log(IF(LE(ONE)(TWO))("yes")("no")) // yes
console.log(IF(LE(TWO)(TWO))("yes")("no")) // yes
console.log(IF(LE(TWO)(ONE))("yes")("no")) // no
```

さっき定義した SUB がちょうどいい感じに働いていますね。

### 無名再帰関数

割り算(DIV)と余り(MOD)を計算するするには繰り返し処理が必要です。
ですが、ラムダ計算には for 文や while 文といった繰り返しの制御構文がありません。

なので、再帰処理をする仕組みが必要です。
普通は再帰関数は自分自身を呼び出せばいいのですが、変数のないラムダ計算では再帰をさせるのに一工夫が必要です。

例えば以下は有効なのプログラムです。

```
// 正しくない定義
const DIV_TEST = m => n => c => IF(LE(m)(n))(c)(DIV_TEST(SUB(m))(n)(INC(c)))
// 確認用コード
console.log(TO_INT(DIV_TEST(MUL(FOUR)(FOUR))(THREE)(ZERO)))
```

上記は一応正しい計算結果を得ることができます。
これは`const DIV_TEST = `により名前がついたことで再帰呼び出しができています。
ですが、ラムダ計算では const による命名は不要なので、別の方法で再帰を実現する必要があります。

### Z コンビネータ

これを解決できるのは、一般的に Z コンビネータと呼ばれるものです。
今回の記事では使いませんが一応紹介します。
詳しい紹介は「Z コンビネータ」で検索してみてください。

```
const Z = f => x => f(y => x(x)(y))(x => f(y => x(x)(y)))
```

### FIX コンビネータ

さて、もう少しシンプルな FIX 関数を紹介します。

````

const FIX = (f) => f(f);

```



```
// 定義
const DIV_REC = (f) => (m) => (n) => (c) =>
  IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(INC(c))(x))(c);
const DIV = (m) => (n) => FIX(DIV_REC)(m)(n)(ZERO);
// 確認用コード
console.log(TO_INT(DIV(MUL(FOUR)(FOUR))(THREE)))
```

そこでラムダ計算で再帰関数を使うために、FIX 関数が必要です。
関数を受け取って、自分自身の参照を渡すことで再帰が出来るようになります。
（本当は Y コンビネータや Z コンビネータを使うのですが私が書くとうまく動きません。）

FIX 関数を使って、比較的簡単な「余り」を計算する関数を作ります。

```

// 定義
const MOD_REC = (f) => (m) => (n) =>
IF(LE(n)(m))((x) => f(f)(SUB(m)(n))(n)(x))(m);
const MOD = FIX(MOD_REC);
// 確認用コード
MOD(MUL(THREE)(THREE))(ADD(TWO)(THREE)) // 9➗5 の余り 4

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
```
````
