# 今回のテーマ：ラムダ計算を楽しもう！

# 第3回　リストとデータ構造

## はじめに

ラムダ計算第2回記事では、引き算と割り算、除算を定義しました。
今回はリストとデータ構造の定義を行います。

今回の実装でおおよそ計算完備っぽくなってきます。

## 難易度

Level: そろそろ普通の言語っぽくなってきました。

今回も置き去りにならないようしっかりついてきてください。

## 目標

この連載ではラムダ計算の機能を実装することで、ラムダ計算がチューリング完全な機能を持つことを証明します。

今回のテーマは以下の第 3 章にあたります。
リスト操作を行う関数としてFOLDを実装します。

- 第 1 章 ラムダ計算の基礎と真偽値、数値とたし算、かけ算
- 第 2 章 ひき算とわり算、Zコンビネータ
- 第 3 章 リスト構造とデータ構造
- 第 4 章 チューリングマシン:無限に長いテープ
- 第 5 章 チューリングマシン:評価器

## 用意するもの

- 推奨: 紙とペン
- なければ: パソコン



# リスト構造
まずはリスト構造とは何かわからない方はいますでしょうか？
リスト構造とは"値"と"次"のペアを使って配列のようなものを構築するものです。

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

リスト構造について詳しく知りたい人はこちらを確認してください。https://ja.wikipedia.org/wiki/%E3%83%AA%E3%82%B9%E3%83%88_(%E6%8A%BD%E8%B1%A1%E3%83%87%E3%83%BC%E3%82%BF%E5%9E%8B)

上記によるとリスト構造を実現するには以下の５つの要素が必要とされています。
1. 空のリストを作るコンストラクタ(上記の`null`)
2. リストが空かどうかを確かめる操作(上記の`x != null`)
3. リストの先頭に要素を追加する操作（上記の`{head:h, tail:t}`）
4. リストの先頭要素 ("head") を求める操作（上記の`list.head`）
5. リストの先頭を除く部分リスト ("tail") を求める操作（上記の`list.tail`）

# リストを扱う上での基本要素を作ろう

上記の５つの要素のうち、3,4,5の３つは第２章に登場しています。
これらの関数は２章で登場した内容なのであまり詳しくは説明しませんが、
以下を見て復習してみてください。

```
// 定義
// それぞれ上記の3,4,5の要素を実現しています。
// const PAIR = x => y => p => p(x)(y); // 定義済み
// const LEFT = p => p(TRUE); // 定義済み
// const RIGHT = p => p(FALSE); // 定義済み
```

残る二つの要素は以下の二つです。
NILは上記の1を、IS_NILは上記の2をそれぞれ実現しています。
```
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
ちょっと美しく感じます。

# 配列操作関数を作ろう
上記のリスト用の関数ができたことでリスト操作ができるようになります。
まずは基本のFOLDを作ります。
FOLDさえあれば他の様々な配列操作関数を実現できます。

リストの処理には繰り返しが必要なので、FIXを使った再帰関数の実装が必要ですね。


```
// 定義
// const FIX = f => f(f); 参考。2章で定義済み。
const FOLD_LOOP = s => f => r => l =>
  IF(IS_NIL(l))(r)(x => s(s)(f)(f(r)(LEFT(l)))(RIGHT(l))(x));
const FOLD = FIX(FOLD_LOOP);
// 確認用コード
const sum = FOLD(ADD)(ZERO)
const total = sum(list);
console.log(TO_INT(total)); // 10
```

さて、実際に計算してみましょう！

```
sum(list)
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


# MAPの定義
またMAPも欲しいので以下のように定義します。

```
const MAP_LOOP = s => f => l => 
  IF(IS_NIL(l))(NIL)( PAIR(f(LEFT(l)))(s(s)(f)(RIGHT(l))))
const MAP = FIX(MAP_LOOP)
const doubled = MAP(MUL(TWO))(list)
console.log(TO_ARRAY(doubled))
```

 FOLDは非常に強力なのでsumでもmapでもfoldさえ実装があればいろんな応用を効かすことができて便利です。

では、配列操作のテーマはここで終了です。
ではいつものようにFOLDを展開してみようと思います。






