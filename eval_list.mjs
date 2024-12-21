const result = ((f) => f(f))(
  (recur) => (list) => (tape) => (_) =>
    (
      (c) => (x) => (y) =>
        c(x)(y)
    )(((x) => x((a) => (b) => (c) => (x) => (y) => y)((x) => (y) => x))(list))(
      (_) => tape
    )((_) =>
      recur(recur)(((p) => p((l) => (r) => r))(list))(
        ((p) => p((l) => (r) => l))(list)(tape)(_)
      )(_)
    )(_)
)(
  (
    (l) => (r) => (f) =>
      f(l)(r)
  )(
    (tape) => (_) =>
      (
        (left) => (current) => (right) =>
          (
            (l) => (r) => (f) =>
              f(l)(r)
          )(left)(
            (
              (l) => (r) => (f) =>
                f(l)(r)
            )(current)(right)
          )
      )(((p) => p((l) => (r) => l))(tape))(
        (
          (n) => (p) => (x) =>
            p(n(p)(x))
        )(
          ((tape) =>
            ((p) => p((l) => (r) => l))(((p) => p((l) => (r) => r))(tape)))(
            tape
          )
        )
      )(
        ((tape) =>
          ((p) => p((l) => (r) => r))(((p) => p((l) => (r) => r))(tape)))(tape)
      )
  )(
    (
      (l) => (r) => (f) =>
        f(l)(r)
    )(
      (tape) => (_) =>
        (
          (left) => (current) => (right) =>
            (
              (l) => (r) => (f) =>
                f(l)(r)
            )(left)(
              (
                (l) => (r) => (f) =>
                  f(l)(r)
              )(current)(right)
            )
        )(((p) => p((l) => (r) => l))(tape))(
          (
            (n) => (p) => (x) =>
              p(n(p)(x))
          )(
            ((tape) =>
              ((p) => p((l) => (r) => l))(((p) => p((l) => (r) => r))(tape)))(
              tape
            )
          )
        )(
          ((tape) =>
            ((p) => p((l) => (r) => r))(((p) => p((l) => (r) => r))(tape)))(
            tape
          )
        )
    )(
      (
        (l) => (r) => (f) =>
          f(l)(r)
      )(
        (tape) => (_) =>
          (
            (left) => (current) => (right) =>
              (
                (l) => (r) => (f) =>
                  f(l)(r)
              )(left)(
                (
                  (l) => (r) => (f) =>
                    f(l)(r)
                )(current)(right)
              )
          )(((p) => p((l) => (r) => l))(tape))(
            (
              (n) => (p) => (x) =>
                p(n(p)(x))
            )(
              ((tape) =>
                ((p) => p((l) => (r) => l))(((p) => p((l) => (r) => r))(tape)))(
                tape
              )
            )
          )(
            ((tape) =>
              ((p) => p((l) => (r) => r))(((p) => p((l) => (r) => r))(tape)))(
              tape
            )
          )
      )(
        (
          (l) => (r) => (f) =>
            f(l)(r)
        )(
          (tape) => (_) =>
            (
              (left) => (current) => (right) =>
                (
                  (l) => (r) => (f) =>
                    f(l)(r)
                )(left)(
                  (
                    (l) => (r) => (f) =>
                      f(l)(r)
                  )(current)(right)
                )
            )(((p) => p((l) => (r) => l))(tape))(
              (
                (n) => (p) => (x) =>
                  p(n(p)(x))
              )(
                ((tape) =>
                  ((p) => p((l) => (r) => l))(
                    ((p) => p((l) => (r) => r))(tape)
                  ))(tape)
              )
            )(
              ((tape) =>
                ((p) => p((l) => (r) => r))(((p) => p((l) => (r) => r))(tape)))(
                tape
              )
            )
        )(
          (
            (l) => (r) => (f) =>
              f(l)(r)
          )(
            (tape) => (_) =>
              (
                (left) => (current) => (right) =>
                  (
                    (l) => (r) => (f) =>
                      f(l)(r)
                  )(left)(
                    (
                      (l) => (r) => (f) =>
                        f(l)(r)
                    )(current)(right)
                  )
              )(((p) => p((l) => (r) => l))(tape))(
                (
                  (n) => (p) => (x) =>
                    p(n(p)(x))
                )(
                  ((tape) =>
                    ((p) => p((l) => (r) => l))(
                      ((p) => p((l) => (r) => r))(tape)
                    ))(tape)
                )
              )(
                ((tape) =>
                  ((p) => p((l) => (r) => r))(
                    ((p) => p((l) => (r) => r))(tape)
                  ))(tape)
              )
          )(
            (
              (l) => (r) => (f) =>
                f(l)(r)
            )(
              (tape) => (_) =>
                (
                  (left) => (current) => (right) =>
                    (
                      (l) => (r) => (f) =>
                        f(l)(r)
                    )(left)(
                      (
                        (l) => (r) => (f) =>
                          f(l)(r)
                      )(current)(right)
                    )
                )(((p) => p((l) => (r) => l))(tape))(
                  (
                    (n) => (p) => (x) =>
                      p(n(p)(x))
                  )(
                    ((tape) =>
                      ((p) => p((l) => (r) => l))(
                        ((p) => p((l) => (r) => r))(tape)
                      ))(tape)
                  )
                )(
                  ((tape) =>
                    ((p) => p((l) => (r) => r))(
                      ((p) => p((l) => (r) => r))(tape)
                    ))(tape)
                )
            )(
              (
                (l) => (r) => (f) =>
                  f(l)(r)
              )(
                (tape) => (_) =>
                  (
                    (left) => (current) => (right) =>
                      (
                        (l) => (r) => (f) =>
                          f(l)(r)
                      )(left)(
                        (
                          (l) => (r) => (f) =>
                            f(l)(r)
                        )(current)(right)
                      )
                  )(((p) => p((l) => (r) => l))(tape))(
                    (
                      (n) => (p) => (x) =>
                        p(n(p)(x))
                    )(
                      ((tape) =>
                        ((p) => p((l) => (r) => l))(
                          ((p) => p((l) => (r) => r))(tape)
                        ))(tape)
                    )
                  )(
                    ((tape) =>
                      ((p) => p((l) => (r) => r))(
                        ((p) => p((l) => (r) => r))(tape)
                      ))(tape)
                  )
              )(
                (
                  (l) => (r) => (f) =>
                    f(l)(r)
                )(
                  (tape) => (_) =>
                    (
                      (left) => (current) => (right) =>
                        (
                          (l) => (r) => (f) =>
                            f(l)(r)
                        )(left)(
                          (
                            (l) => (r) => (f) =>
                              f(l)(r)
                          )(current)(right)
                        )
                    )(((p) => p((l) => (r) => l))(tape))(
                      (
                        (n) => (p) => (x) =>
                          p(n(p)(x))
                      )(
                        ((tape) =>
                          ((p) => p((l) => (r) => l))(
                            ((p) => p((l) => (r) => r))(tape)
                          ))(tape)
                      )
                    )(
                      ((tape) =>
                        ((p) => p((l) => (r) => r))(
                          ((p) => p((l) => (r) => r))(tape)
                        ))(tape)
                    )
                )(
                  (
                    (l) => (r) => (f) =>
                      f(l)(r)
                  )(
                    (tape) => (_) =>
                      (
                        (left) => (current) => (right) =>
                          (
                            (l) => (r) => (f) =>
                              f(l)(r)
                          )(left)(
                            (
                              (l) => (r) => (f) =>
                                f(l)(r)
                            )(current)(right)
                          )
                      )(((p) => p((l) => (r) => l))(tape))(
                        (
                          (n) => (p) => (x) =>
                            p(n(p)(x))
                        )(
                          ((tape) =>
                            ((p) => p((l) => (r) => l))(
                              ((p) => p((l) => (r) => r))(tape)
                            ))(tape)
                        )
                      )(
                        ((tape) =>
                          ((p) => p((l) => (r) => r))(
                            ((p) => p((l) => (r) => r))(tape)
                          ))(tape)
                      )
                  )(
                    (
                      (l) => (r) => (f) =>
                        f(l)(r)
                    )(
                      (tape) => (_) =>
                        (
                          (left) => (current) => (right) =>
                            (
                              (l) => (r) => (f) =>
                                f(l)(r)
                            )(left)(
                              (
                                (l) => (r) => (f) =>
                                  f(l)(r)
                              )(current)(right)
                            )
                        )(((p) => p((l) => (r) => l))(tape))(
                          (
                            (n) => (p) => (x) =>
                              p(n(p)(x))
                          )(
                            ((tape) =>
                              ((p) => p((l) => (r) => l))(
                                ((p) => p((l) => (r) => r))(tape)
                              ))(tape)
                          )
                        )(
                          ((tape) =>
                            ((p) => p((l) => (r) => r))(
                              ((p) => p((l) => (r) => r))(tape)
                            ))(tape)
                        )
                    )(
                      (
                        (l) => (r) => (f) =>
                          f(l)(r)
                      )(
                        ((f) => f(f))(
                          (recur) => (list) => (tape) => (_) =>
                            (
                              (c) => (x) => (y) =>
                                c(x)(y)
                            )(
                              ((n) =>
                                n((x) => (x) => (y) => y)((x) => (y) => x))(
                                ((tape) =>
                                  ((p) => p((l) => (r) => l))(
                                    ((p) => p((l) => (r) => r))(tape)
                                  ))(tape)
                              )
                            )((_) => tape)((_) =>
                              recur(recur)(list)(
                                ((f) => f(f))(
                                  (recur) => (list) => (tape) => (_) =>
                                    (
                                      (c) => (x) => (y) =>
                                        c(x)(y)
                                    )(
                                      ((x) =>
                                        x((a) => (b) => (c) => (x) => (y) => y)(
                                          (x) => (y) => x
                                        ))(list)
                                    )((_) => tape)((_) =>
                                      recur(recur)(
                                        ((p) => p((l) => (r) => r))(list)
                                      )(
                                        ((p) => p((l) => (r) => l))(list)(tape)(
                                          _
                                        )
                                      )(_)
                                    )(_)
                                )(list)(tape)(_)
                              )(_)
                            )(_)
                        )(
                          (
                            (l) => (r) => (f) =>
                              f(l)(r)
                          )(
                            (tape) => (_) =>
                              (
                                (left) => (current) => (right) =>
                                  (
                                    (l) => (r) => (f) =>
                                      f(l)(r)
                                  )(left)(
                                    (
                                      (l) => (r) => (f) =>
                                        f(l)(r)
                                    )(current)(right)
                                  )
                              )(((p) => p((l) => (r) => l))(tape))(
                                ((n) =>
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
                                  ))(
                                  ((tape) =>
                                    ((p) => p((l) => (r) => l))(
                                      ((p) => p((l) => (r) => r))(tape)
                                    ))(tape)
                                )
                              )(
                                ((tape) =>
                                  ((p) => p((l) => (r) => r))(
                                    ((p) => p((l) => (r) => r))(tape)
                                  ))(tape)
                              )
                          )(
                            (
                              (l) => (r) => (f) =>
                                f(l)(r)
                            )(
                              (tape) => (_) =>
                                (
                                  (left) => (current) => (right) =>
                                    (
                                      (l) => (r) => (f) =>
                                        f(l)(r)
                                    )(left)(
                                      (
                                        (l) => (r) => (f) =>
                                          f(l)(r)
                                      )(current)(right)
                                    )
                                )(
                                  (
                                    (l) => (r) => (f) =>
                                      f(l)(r)
                                  )(
                                    ((tape) =>
                                      ((p) => p((l) => (r) => l))(
                                        ((p) => p((l) => (r) => r))(tape)
                                      ))(tape)
                                  )(((p) => p((l) => (r) => l))(tape))
                                )(
                                  ((halfTape) =>
                                    (
                                      (c) => (x) => (y) =>
                                        c(x)(y)
                                    )(
                                      ((x) =>
                                        x((a) => (b) => (c) => (x) => (y) => y)(
                                          (x) => (y) => x
                                        ))(halfTape)
                                    )((p) => (n) => n)(
                                      ((p) => p((l) => (r) => l))(halfTape)
                                    ))(
                                    ((tape) =>
                                      ((p) => p((l) => (r) => r))(
                                        ((p) => p((l) => (r) => r))(tape)
                                      ))(tape)
                                  )
                                )(
                                  ((p) => p((l) => (r) => r))(
                                    ((tape) =>
                                      ((p) => p((l) => (r) => r))(
                                        ((p) => p((l) => (r) => r))(tape)
                                      ))(tape)
                                  )
                                )
                            )(
                              (
                                (l) => (r) => (f) =>
                                  f(l)(r)
                              )(
                                (tape) => (_) =>
                                  (
                                    (left) => (current) => (right) =>
                                      (
                                        (l) => (r) => (f) =>
                                          f(l)(r)
                                      )(left)(
                                        (
                                          (l) => (r) => (f) =>
                                            f(l)(r)
                                        )(current)(right)
                                      )
                                  )(((p) => p((l) => (r) => l))(tape))(
                                    (
                                      (n) => (p) => (x) =>
                                        p(n(p)(x))
                                    )(
                                      ((tape) =>
                                        ((p) => p((l) => (r) => l))(
                                          ((p) => p((l) => (r) => r))(tape)
                                        ))(tape)
                                    )
                                  )(
                                    ((tape) =>
                                      ((p) => p((l) => (r) => r))(
                                        ((p) => p((l) => (r) => r))(tape)
                                      ))(tape)
                                  )
                              )(
                                (
                                  (l) => (r) => (f) =>
                                    f(l)(r)
                                )(
                                  (tape) => (_) =>
                                    (
                                      (left) => (current) => (right) =>
                                        (
                                          (l) => (r) => (f) =>
                                            f(l)(r)
                                        )(left)(
                                          (
                                            (l) => (r) => (f) =>
                                              f(l)(r)
                                          )(current)(right)
                                        )
                                    )(((p) => p((l) => (r) => l))(tape))(
                                      (
                                        (n) => (p) => (x) =>
                                          p(n(p)(x))
                                      )(
                                        ((tape) =>
                                          ((p) => p((l) => (r) => l))(
                                            ((p) => p((l) => (r) => r))(tape)
                                          ))(tape)
                                      )
                                    )(
                                      ((tape) =>
                                        ((p) => p((l) => (r) => r))(
                                          ((p) => p((l) => (r) => r))(tape)
                                        ))(tape)
                                    )
                                )(
                                  (
                                    (l) => (r) => (f) =>
                                      f(l)(r)
                                  )(
                                    (tape) => (_) =>
                                      (
                                        (left) => (current) => (right) =>
                                          (
                                            (l) => (r) => (f) =>
                                              f(l)(r)
                                          )(left)(
                                            (
                                              (l) => (r) => (f) =>
                                                f(l)(r)
                                            )(current)(right)
                                          )
                                      )(((p) => p((l) => (r) => l))(tape))(
                                        (
                                          (n) => (p) => (x) =>
                                            p(n(p)(x))
                                        )(
                                          ((tape) =>
                                            ((p) => p((l) => (r) => l))(
                                              ((p) => p((l) => (r) => r))(tape)
                                            ))(tape)
                                        )
                                      )(
                                        ((tape) =>
                                          ((p) => p((l) => (r) => r))(
                                            ((p) => p((l) => (r) => r))(tape)
                                          ))(tape)
                                      )
                                  )(
                                    (
                                      (l) => (r) => (f) =>
                                        f(l)(r)
                                    )(
                                      (tape) => (_) =>
                                        (
                                          (left) => (current) => (right) =>
                                            (
                                              (l) => (r) => (f) =>
                                                f(l)(r)
                                            )(left)(
                                              (
                                                (l) => (r) => (f) =>
                                                  f(l)(r)
                                              )(current)(right)
                                            )
                                        )(((p) => p((l) => (r) => l))(tape))(
                                          (
                                            (n) => (p) => (x) =>
                                              p(n(p)(x))
                                          )(
                                            ((tape) =>
                                              ((p) => p((l) => (r) => l))(
                                                ((p) => p((l) => (r) => r))(
                                                  tape
                                                )
                                              ))(tape)
                                          )
                                        )(
                                          ((tape) =>
                                            ((p) => p((l) => (r) => r))(
                                              ((p) => p((l) => (r) => r))(tape)
                                            ))(tape)
                                        )
                                    )(
                                      (
                                        (l) => (r) => (f) =>
                                          f(l)(r)
                                      )(
                                        (tape) => (_) =>
                                          (
                                            (left) => (current) => (right) =>
                                              (
                                                (l) => (r) => (f) =>
                                                  f(l)(r)
                                              )(left)(
                                                (
                                                  (l) => (r) => (f) =>
                                                    f(l)(r)
                                                )(current)(right)
                                              )
                                          )(((p) => p((l) => (r) => l))(tape))(
                                            (
                                              (n) => (p) => (x) =>
                                                p(n(p)(x))
                                            )(
                                              ((tape) =>
                                                ((p) => p((l) => (r) => l))(
                                                  ((p) => p((l) => (r) => r))(
                                                    tape
                                                  )
                                                ))(tape)
                                            )
                                          )(
                                            ((tape) =>
                                              ((p) => p((l) => (r) => r))(
                                                ((p) => p((l) => (r) => r))(
                                                  tape
                                                )
                                              ))(tape)
                                          )
                                      )(
                                        (
                                          (l) => (r) => (f) =>
                                            f(l)(r)
                                        )(
                                          (tape) => (_) =>
                                            (
                                              (left) => (current) => (right) =>
                                                (
                                                  (l) => (r) => (f) =>
                                                    f(l)(r)
                                                )(left)(
                                                  (
                                                    (l) => (r) => (f) =>
                                                      f(l)(r)
                                                  )(current)(right)
                                                )
                                            )(
                                              ((p) => p((l) => (r) => l))(tape)
                                            )(
                                              (
                                                (n) => (p) => (x) =>
                                                  p(n(p)(x))
                                              )(
                                                ((tape) =>
                                                  ((p) => p((l) => (r) => l))(
                                                    ((p) => p((l) => (r) => r))(
                                                      tape
                                                    )
                                                  ))(tape)
                                              )
                                            )(
                                              ((tape) =>
                                                ((p) => p((l) => (r) => r))(
                                                  ((p) => p((l) => (r) => r))(
                                                    tape
                                                  )
                                                ))(tape)
                                            )
                                        )(
                                          (
                                            (l) => (r) => (f) =>
                                              f(l)(r)
                                          )(
                                            (tape) => (_) =>
                                              (
                                                (left) =>
                                                (current) =>
                                                (right) =>
                                                  (
                                                    (l) => (r) => (f) =>
                                                      f(l)(r)
                                                  )(left)(
                                                    (
                                                      (l) => (r) => (f) =>
                                                        f(l)(r)
                                                    )(current)(right)
                                                  )
                                              )(
                                                ((p) => p((l) => (r) => l))(
                                                  tape
                                                )
                                              )(
                                                (
                                                  (n) => (p) => (x) =>
                                                    p(n(p)(x))
                                                )(
                                                  ((tape) =>
                                                    ((p) => p((l) => (r) => l))(
                                                      ((p) =>
                                                        p((l) => (r) => r))(
                                                        tape
                                                      )
                                                    ))(tape)
                                                )
                                              )(
                                                ((tape) =>
                                                  ((p) => p((l) => (r) => r))(
                                                    ((p) => p((l) => (r) => r))(
                                                      tape
                                                    )
                                                  ))(tape)
                                              )
                                          )(
                                            (
                                              (l) => (r) => (f) =>
                                                f(l)(r)
                                            )(
                                              (tape) => (_) =>
                                                (
                                                  (left) =>
                                                  (current) =>
                                                  (right) =>
                                                    (
                                                      (l) => (r) => (f) =>
                                                        f(l)(r)
                                                    )(left)(
                                                      (
                                                        (l) => (r) => (f) =>
                                                          f(l)(r)
                                                      )(current)(right)
                                                    )
                                                )(
                                                  ((p) => p((l) => (r) => l))(
                                                    tape
                                                  )
                                                )(
                                                  (
                                                    (n) => (p) => (x) =>
                                                      p(n(p)(x))
                                                  )(
                                                    ((tape) =>
                                                      ((p) =>
                                                        p((l) => (r) => l))(
                                                        ((p) =>
                                                          p((l) => (r) => r))(
                                                          tape
                                                        )
                                                      ))(tape)
                                                  )
                                                )(
                                                  ((tape) =>
                                                    ((p) => p((l) => (r) => r))(
                                                      ((p) =>
                                                        p((l) => (r) => r))(
                                                        tape
                                                      )
                                                    ))(tape)
                                                )
                                            )(
                                              (
                                                (l) => (r) => (f) =>
                                                  f(l)(r)
                                              )(
                                                (tape) => (_) =>
                                                  (
                                                    (left) =>
                                                    (current) =>
                                                    (right) =>
                                                      (
                                                        (l) => (r) => (f) =>
                                                          f(l)(r)
                                                      )(left)(
                                                        (
                                                          (l) => (r) => (f) =>
                                                            f(l)(r)
                                                        )(current)(right)
                                                      )
                                                  )(
                                                    ((p) => p((l) => (r) => l))(
                                                      tape
                                                    )
                                                  )(
                                                    (
                                                      (n) => (p) => (x) =>
                                                        p(n(p)(x))
                                                    )(
                                                      ((tape) =>
                                                        ((p) =>
                                                          p((l) => (r) => l))(
                                                          ((p) =>
                                                            p((l) => (r) => r))(
                                                            tape
                                                          )
                                                        ))(tape)
                                                    )
                                                  )(
                                                    ((tape) =>
                                                      ((p) =>
                                                        p((l) => (r) => r))(
                                                        ((p) =>
                                                          p((l) => (r) => r))(
                                                          tape
                                                        )
                                                      ))(tape)
                                                  )
                                              )(
                                                (
                                                  (l) => (r) => (f) =>
                                                    f(l)(r)
                                                )(
                                                  (tape) => (_) =>
                                                    (
                                                      (left) =>
                                                      (current) =>
                                                      (right) =>
                                                        (
                                                          (l) => (r) => (f) =>
                                                            f(l)(r)
                                                        )(left)(
                                                          (
                                                            (l) => (r) => (f) =>
                                                              f(l)(r)
                                                          )(current)(right)
                                                        )
                                                    )(
                                                      ((p) =>
                                                        p((l) => (r) => l))(
                                                        tape
                                                      )
                                                    )(
                                                      (
                                                        (n) => (p) => (x) =>
                                                          p(n(p)(x))
                                                      )(
                                                        ((tape) =>
                                                          ((p) =>
                                                            p((l) => (r) => l))(
                                                            ((p) =>
                                                              p(
                                                                (l) => (r) => r
                                                              ))(tape)
                                                          ))(tape)
                                                      )
                                                    )(
                                                      ((tape) =>
                                                        ((p) =>
                                                          p((l) => (r) => r))(
                                                          ((p) =>
                                                            p((l) => (r) => r))(
                                                            tape
                                                          )
                                                        ))(tape)
                                                    )
                                                )(
                                                  (
                                                    (l) => (r) => (f) =>
                                                      f(l)(r)
                                                  )(
                                                    (tape) => (_) =>
                                                      (
                                                        (left) =>
                                                        (current) =>
                                                        (right) =>
                                                          (
                                                            (l) => (r) => (f) =>
                                                              f(l)(r)
                                                          )(left)(
                                                            (
                                                              (l) =>
                                                              (r) =>
                                                              (f) =>
                                                                f(l)(r)
                                                            )(current)(right)
                                                          )
                                                      )(
                                                        ((p) =>
                                                          p((l) => (r) => r))(
                                                          ((p) =>
                                                            p((l) => (r) => l))(
                                                            tape
                                                          )
                                                        )
                                                      )(
                                                        ((halfTape) =>
                                                          (
                                                            (c) => (x) => (y) =>
                                                              c(x)(y)
                                                          )(
                                                            ((x) =>
                                                              x(
                                                                (a) =>
                                                                  (b) =>
                                                                  (c) =>
                                                                  (x) =>
                                                                  (y) =>
                                                                    y
                                                              )(
                                                                (x) => (y) => x
                                                              ))(halfTape)
                                                          )((p) => (n) => n)(
                                                            ((p) =>
                                                              p(
                                                                (l) => (r) => l
                                                              ))(halfTape)
                                                          ))(
                                                          ((p) =>
                                                            p((l) => (r) => l))(
                                                            tape
                                                          )
                                                        )
                                                      )(
                                                        (
                                                          (l) => (r) => (f) =>
                                                            f(l)(r)
                                                        )(
                                                          ((tape) =>
                                                            ((p) =>
                                                              p(
                                                                (l) => (r) => l
                                                              ))(
                                                              ((p) =>
                                                                p(
                                                                  (l) => (r) =>
                                                                    r
                                                                ))(tape)
                                                            ))(tape)
                                                        )(
                                                          ((tape) =>
                                                            ((p) =>
                                                              p(
                                                                (l) => (r) => r
                                                              ))(
                                                              ((p) =>
                                                                p(
                                                                  (l) => (r) =>
                                                                    r
                                                                ))(tape)
                                                            ))(tape)
                                                        )
                                                      )
                                                  )((x) => (y) => y)
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )(
                        (
                          (l) => (r) => (f) =>
                            f(l)(r)
                        )(
                          (tape) => (_) =>
                            (
                              (left) => (current) => (right) =>
                                (
                                  (l) => (r) => (f) =>
                                    f(l)(r)
                                )(left)(
                                  (
                                    (l) => (r) => (f) =>
                                      f(l)(r)
                                  )(current)(right)
                                )
                            )(
                              (
                                (l) => (r) => (f) =>
                                  f(l)(r)
                              )(
                                ((tape) =>
                                  ((p) => p((l) => (r) => l))(
                                    ((p) => p((l) => (r) => r))(tape)
                                  ))(tape)
                              )(((p) => p((l) => (r) => l))(tape))
                            )(
                              ((halfTape) =>
                                (
                                  (c) => (x) => (y) =>
                                    c(x)(y)
                                )(
                                  ((x) =>
                                    x((a) => (b) => (c) => (x) => (y) => y)(
                                      (x) => (y) => x
                                    ))(halfTape)
                                )((p) => (n) => n)(
                                  ((p) => p((l) => (r) => l))(halfTape)
                                ))(
                                ((tape) =>
                                  ((p) => p((l) => (r) => r))(
                                    ((p) => p((l) => (r) => r))(tape)
                                  ))(tape)
                              )
                            )(
                              ((p) => p((l) => (r) => r))(
                                ((tape) =>
                                  ((p) => p((l) => (r) => r))(
                                    ((p) => p((l) => (r) => r))(tape)
                                  ))(tape)
                              )
                            )
                        )(
                          (
                            (l) => (r) => (f) =>
                              f(l)(r)
                          )((tape) => (_) => {
                            console.log(
                              ((x) => x((n) => n + 1)(0))(
                                ((tape) =>
                                  ((p) => p((l) => (r) => l))(
                                    ((p) => p((l) => (r) => r))(tape)
                                  ))(tape)
                              )
                            );
                            return tape;
                          })((x) => (y) => y)
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
)(
  (
    (left) => (current) => (right) =>
      (
        (l) => (r) => (f) =>
          f(l)(r)
      )(left)(
        (
          (l) => (r) => (f) =>
            f(l)(r)
        )(current)(right)
      )
  )((x) => (y) => y)((p) => (n) => n)((x) => (y) => y)
)((x) => (y) => y);
