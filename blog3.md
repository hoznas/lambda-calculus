# 今回のテーマ：ラムダ計算を楽しもう！



# 第3回　リスト操作をしよう！

こんにちは！ HapInSアドベントカレンダー2023、14日目を担当するh_shimakawaです。 
今回も引き続きラムダ計算を続けていきます。

## はじめに

ラムダ計算第2回記事では、引き算と割り算、除算を定義しました。
今回はリストとデータ構造の定義を行います。

今回の実装でおおよその計算力を手にいれたような気持ちになってきます。

## 難易度

Level: 結構大変です（主観）。
今回も置き去りにならないようしっかりついてきてください。



## 目標

この連載ではラムダ計算の機能を実装することで、ラムダ計算がチューリング完全な機能を持つことを証明します。

今回のテーマは以下の第 3 章にあたります。
リスト操作を行う関数としてFOLDを実装します。

- 第 1 章 ラムダ計算の基礎と真偽値、数値とたし算、かけ算
- 第 2 章 ひき算とわり算、Zコンビネータ
- 第 3 章 リスト操作
- 第 4 章 チューリングマシン


## 用意するもの

- 推奨:パソコン
- 挑戦したい人は:紙とペン

内容が難しくなってきたので、紙とペンで特には特に大変になってきました。

# リスト構造
まずはリスト構造とは何かわからない方はいますでしょうか？
リスト構造とは二つの値の組み合わせ（ペア）を使って配列のようなものを構築するものです。

typescriptでリスト構造を書くとこんな感じになります。
```
const list = {
  head: 1,
  tail: {
    head: 2,
    tail: {
      head: 3,
      tail: null 
    }
  }
};

for (let x = list; x != null; x = x.tail) {
  console.log(x.head); // 1, 2, 3と表示
}
```

## リストの基本要素
リスト構造について詳しく知りたい人はこちらを確認してください。https://ja.wikipedia.org/wiki/%E3%83%AA%E3%82%B9%E3%83%88_(%E6%8A%BD%E8%B1%A1%E3%83%87%E3%83%BC%E3%82%BF%E5%9E%8B)

上記によるとリスト構造を実現するには以下の５つの要素が必要とされています。
1. 空のリストを作るコンストラクタ(上記の`null`)
2. リストが空かどうかを確かめる操作(上記の`x != null`)
3. リストの先頭に要素を追加する操作（上記の`{head:h, tail:t}`）
4. リストの先頭要素 ("head") を求める操作（上記の`list.head`）
5. リストの先頭を除く部分リスト ("tail") を求める操作（上記の`list.tail`）

## リストの基本要素を用意しよう

上記の５つの要素のうち、3,4,5の３つは第２章に登場した関数ですね！
これらの関数は２章で登場した内容なのであまり詳しくは説明しませんが、
必要な人は第２回の記事を見て復習をしてください。
https://blog.hapins.net/entry/2023/12/08/120000

残る二つの要素は以下の二つです。
NILは上記の1を、IS_NILは上記の2をそれぞれ実現しています。
```
// 定義
const NIL = FALSE;
const IS_NIL = x => x(a => b => c => FALSE)(TRUE);
// 確認用コード
const list = PAIR(ONE)(PAIR(TWO)(PAIR(THREE)(PAIR(FOUR)(NIL))));
console.log(TO_BOOLEAN(IS_NIL(list))); // FALSE
console.log(TO_BOOLEAN(IS_NIL(NIL))); // TRUE
```

では実際にNILとIS_NILを計算してみましょう。
```
IS_NIL(list)
= (x => x(a => b => c => FALSE)(TRUE))(list)
= list(a => b => c => FALSE)(TRUE)
= (PAIR(H)(T))(a => b => c => FALSE)(TRUE)
= ((x => y => p => p(x)(y))(H)(T))(a => b => c => FALSE)(TRUE)
= (p => p(H)(T))(a => b => c => FALSE)(TRUE)
= ((a => b => c => FALSE)(H)(T))(TRUE)
= (c => FALSE)(TRUE)
= FALSE

IS_NIL(NIL)
= (x => x(a => b => c => FALSE)(TRUE))(FALSE)
= FALSE(a => b => c => FALSE)(TRUE)
= TRUE
```

IS_NILの内部で3つ引数を取る関数があるのですが、それがPAIRの引数を上手に捨ててくれるので、見事にTRUE/FALSEを返してくれます。
ちょっと美しく感じますね。

# 配列操作関数を作ろう
上記のリスト用の関数ができたことでリスト操作ができるようになります。
まずは基本のFOLDを作ります。
FOLDさえあれば他の様々な配列操作関数を実現できます。

リストの処理には繰り返しが必要なので、FIXを使った再帰関数の実装が必要ですね。
FIXについても第２回の記事で紹介しているので必要な人はそちらで復習をお願いします。
https://blog.hapins.net/entry/2023/12/08/120000

```
// 定義
// const FIX = f => f(f); 参考。2章で定義済み。
const FOLD_LOOP = s => f => r => l =>
  IF(IS_NIL(l))(r)(x => s(s)(f)(f(r)(LEFT(l)))(RIGHT(l))(x));
const FOLD = FIX(FOLD_LOOP);
const SUM = FOLD(ADD)(ZERO);
// 確認用コード
const total = SUM(list);
console.log(TO_INT(total)); // 10
```

さて、実際に計算してみましょう！

```
SUM(list)
= FOLD(ADD)(ZERO)(list)
= FIX(FOLD_LOOP)(ADD)(ZERO)(list)
= FOLD_LOOP(FOLD_LOOP)(ADD)(ZERO)(list)
= (s => f => r => l =>IF(IS_NIL(l))(r)(x => s(s)(f)(f(r)(LEFT(l)))(RIGHT(l))(x)))
    (FOLD_LOOP)(ADD)(ZERO)(list)
= l =>IF(IS_NIL(l))(ZERO)(
    x => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(ZERO)(LEFT(l)))(RIGHT(l))(x)
  )(list)
= IF(IS_NIL(list))(ZERO)(
    x => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(ZERO)(LEFT(list)))(RIGHT(list))(x)
  )
= x => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(ZERO)(ONE))(RIGHT(list))(x) // list=(1.(2.(3.(4.nil))))
= x => FOLD_LOOP(FOLD_LOOP)(ADD)(ONE)(list2)(x) //list2=(2.(3.(4.nil)))
= x => (s => f => r => l => IF(IS_NIL(l))(r)(y => s(s)(f)(f(r)(LEFT(l)))(RIGHT(l))(y)))
    (FOLD_LOOP)(ADD)(ONE)(list2)(x)
= x => IF(IS_NIL(list2))(ONE)(y => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(ONE)(LEFT(list2)))(RIGHT(list2))(y))(x)
= x => y => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(ONE)(LEFT(list2)))(RIGHT(list2))(y)(x)
= x => y => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(ONE)(TWO))(list3)(y)(x) // list3=(3.(4.nil))
= x => y => 
    IF(IS_NIL(l))(r)(z => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(THREE)(LEFT(list3)))(RIGHT(list3))(z))(y)(x) 
= x => y => 
    z => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(THREE)(LEFT(list3)))(RIGHT(list3))(z)(y)(x) 
= x => y => z => FOLD_LOOP(FOLD_LOOP)(ADD)(SIX)(list4)(z)(y)(x) // list4=(4.nil)
= x => y => z => (s => f => r => l =>
    IF(IS_NIL(l))(r)(a => s(s)(f)(f(r)(LEFT(l)))(RIGHT(l))(a))
  )(FOLD_LOOP)(ADD)(SIX)(list4)(z)(y)(x) // list4=(4.nil)
= x => y => z => 
    IF(IS_NIL(l))(SIX)(a => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(SIX)(LEFT(list4)))(RIGHT(list4))(a))(z)(y)(x)
= x => y => z => a => FOLD_LOOP(FOLD_LOOP)(ADD)(TEN)(NIL)(a)(z)(y)(x)
= x => y => z => a => 
    (s => f => r => l => IF(IS_NIL(l))(r)(x => s(s)(f)(f(r)(LEFT(l)))(RIGHT(l))(x))
  )(FOLD_LOOP)(ADD)(TEN)(NIL)(a)(z)(y)(x)
= x => y => z => a => 
    ( IF(IS_NIL(NIL))(TEN)(x => FOLD_LOOP(FOLD_LOOP)(ADD)(ADD(TEN)(LEFT(NIL)))(RIGHT(NIL))(x))
  )(a)(z)(y)(x)
= x => y => z => a => TEN(a)(z)(y)(x)
= x => TEN(x) // 上記と同じ式
```


# 他の配列操作関数を定義しよう
上記でもFOLDによってSUMを実装していましたが、そのほかにもいくつかサンプルとして配列操作関数を実装したいと思います。
REVERSEとMAPを以下に定義します。

```
// 定義
const REVERSE = (l) => FOLD((acc) => (x) => PAIR(x)(acc))(NIL)(l);
const MAP = (f) => (l) =>
  FOLD((acc) => (x) => PAIR(f(x))(acc))(NIL)(REVERSE(l));
// 確認用コード
const doubledList = MAP(MUL(TWO))(list)
console.log(TO_ARRAY(doubledList)) // [2,4,6,8]

```

 FOLDは非常に強力なのでSUMでもMAPでもいろんな応用を効かすことができて便利ですね。

では、配列操作のテーマはここで終了です。

# FOLDを展開してみよう！
ではいつものようにFOLDを展開してみようと思います。
式はconsole.log(TO_ARRAY(SUM(list)))です。

```
console.log(((x)=>x((n)=>n+1)(0))((((f=>f(f))(s=>f=>r=>l=>
((c)=>(x)=>(y)=>c(x)(y))(((x)=>x((a)=>(b)=>(c)=>((x)=>(y)=>y))((x)=>(y)=>x))(l))(r)(x=>s(s)(f)(f(r)(((p)=>p((x)=>(y)=>x))(l)))(((p)=>p((x)=>(y)=>y))(l))(x))))((m)=>(n)=>n((n)=>(p)=>(x)=>p(n(p)(x)))(m))((p)=>(n)=>n))(((x)=>(y)=>(p)=>p(x)(y))((p)=>(n)=>p(n))(((x)=>(y)=>(p)=>p(x)(y))((p)=>(n)=>p(p(n)))(((x)=>(y)=>(p)=>p(x)(y))((p)=>(n)=>p(p(p(n))))(((x)=>(y)=>(p)=>p(x)(y))((p)=>(n)=>p(p(p(p(n)))))((x)=>(y)=>y)))))))
```

再帰の複雑さの割には思ったよりもシンプルな式になりましたね！
でもちゃんと繰り返し処理ができていて、答えを計算できているって感動ですね！

# 今回はここまで！
正直なんでこんな大変なテーマをチョイスしたのか、自分でも不思議で仕方ないですが、
皆さんはラムダ計算を楽しむことができましたか？
`f=>a=>f(a)` みたいな単純な関数しかない世界で、足し算・かけ算、引き算・割り算、リスト処理と
徐々に処理できる幅が広がってきました。
次回はチューリングマシンを実際にエミュレートすることで、チューリング完全な機能を有することを証明しようと思います。
(この記事を書いている段階ではまだ、チューリングマシンのエミュレータが実装できていません。果たして間に合うのだろうか・・・？)