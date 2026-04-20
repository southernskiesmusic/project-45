/*
 * methods-of-proof.js - IB Math AA: Methods of Proof
 * Direct proof, contrapositive, contradiction, counterexample,
 * induction, necessary/sufficient conditions, biconditionals
 */

const METHODS_PROOF = {
    prefix: 'mproof-',
    unload: 'number-algebra',

    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    hintIndex: 0,

    questions: [],   // populated in init()

    load() { MathUtils.loadActivity(this); },

    init() {
        this.questions = [
            { method: 'qDirectProof',              weight: 2 },
            { method: 'qContrapositive',            weight: 2 },
            { method: 'qContradiction',             weight: 2 },
            { method: 'qCounterexample',            weight: 2 },
            { method: 'qProofByInduction',          weight: 2 },
            { method: 'qNecessarySufficient',       weight: 2 },
            { method: 'qBiconditional',             weight: 2 },
            { method: 'qProofStructure',            weight: 2 },
            { method: 'qDisproveByCounterexample',  weight: 2 },
            { method: 'qConditionalStatement',      weight: 2 }
        ];
        MathUtils.initActivity(this);
    },

    pool() { return MathUtils.pick(this.questions); },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qDirectProof — even n implies n² even (free: verify with a specific value)
     * Give student a specific even n; ask for n².
     */
    qDirectProof() {
        const k = MathUtils.randInt(2, 10);
        const n = 2 * k;              // guaranteed even
        const answer = n * n;

        return {
            type: 'free',
            rule: 'Direct Proof',
            difficulty: 'easy',
            text: `<strong>Direct proof idea:</strong> If \\(n\\) is even then \\(n^2\\) is even.<br><br>` +
                  `To verify the pattern with a specific value, calculate \\(n^2\\) for \\(n = ${n}\\).`,
            latex: `\\(${n}^2 = \\,?\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `n = ${n} = 2 \\times ${k}, \\text{ so } n \\text{ is even}`,
                `n^2 = ${n}^2 = ${answer} = 2 \\times ${answer / 2}, \\text{ which is also even}`
            ],
            explain: `<strong>Calculation:</strong> \\(${n}^2 = ${answer}\\).<br><br>` +
                     `<strong>Proof sketch:</strong> Let \\(n\\) be even, so \\(n = 2k\\) for some integer \\(k\\).<br>` +
                     `Then \\(n^2 = (2k)^2 = 4k^2 = 2(2k^2)\\), which is even. \\(\\square\\)<br><br>` +
                     `Here \\(n = ${n} = 2 \\times ${k}\\), so \\(n^2 = ${answer} = 2 \\times ${answer / 2}\\) — even. ✓`
        };
    },

    /**
     * 2. qContrapositive — identify the contrapositive of a conditional (MC)
     */
    qContrapositive() {
        const items = [
            {
                p: 'n \\text{ is even}',
                q: 'n^2 \\text{ is even}',
                contra: '\\neg q \\Rightarrow \\neg p',
                contraText: 'n^2 \\text{ is odd} \\Rightarrow n \\text{ is odd}',
                dist: [
                    'n^2 \\text{ is even} \\Rightarrow n \\text{ is even}',
                    'n \\text{ is odd} \\Rightarrow n^2 \\text{ is odd}',
                    '\\neg p \\Rightarrow \\neg q\\text{: } n \\text{ is odd} \\Rightarrow n^2 \\text{ is even}'
                ],
                explain: 'The contrapositive of \\(P \\Rightarrow Q\\) is \\(\\neg Q \\Rightarrow \\neg P\\). ' +
                         'Here: \\(n\\) even \\(\\Rightarrow\\) \\(n^2\\) even becomes \\(n^2\\) odd \\(\\Rightarrow\\) \\(n\\) odd.'
            },
            {
                p: 'x > 2',
                q: 'x^2 > 4',
                contra: 'x^2 \\leq 4 \\Rightarrow x \\leq 2',
                contraText: 'x^2 \\leq 4 \\Rightarrow x \\leq 2',
                dist: [
                    'x \\leq 2 \\Rightarrow x^2 \\leq 4',
                    'x^2 > 4 \\Rightarrow x > 2',
                    'x < 2 \\Rightarrow x^2 < 4'
                ],
                explain: 'The contrapositive of \\(x > 2 \\Rightarrow x^2 > 4\\) is \\(x^2 \\leq 4 \\Rightarrow x \\leq 2\\). ' +
                         'Note: the converse (\\(x^2 > 4 \\Rightarrow x > 2\\)) is not the contrapositive and is actually false for \\(x = -3\\).'
            },
            {
                p: 'ab = 0',
                q: 'a = 0 \\text{ or } b = 0',
                contraText: 'a \\neq 0 \\text{ and } b \\neq 0 \\Rightarrow ab \\neq 0',
                dist: [
                    'a = 0 \\text{ or } b = 0 \\Rightarrow ab = 0',
                    'a \\neq 0 \\text{ or } b \\neq 0 \\Rightarrow ab \\neq 0',
                    'ab \\neq 0 \\Rightarrow a = 0 \\text{ and } b = 0'
                ],
                explain: 'The contrapositive of \\(ab = 0 \\Rightarrow a = 0 \\text{ or } b = 0\\) negates both sides and reverses: ' +
                         '\\(a \\neq 0 \\text{ and } b \\neq 0 \\Rightarrow ab \\neq 0\\). ' +
                         'De Morgan\'s law: \\(\\neg(a=0 \\text{ or } b=0) = (a\\neq 0 \\text{ and } b\\neq 0)\\).'
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.contraText, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Contrapositive',
            difficulty: 'medium',
            text: 'Which of the following is the <strong>contrapositive</strong> of the statement below?<br><br>' +
                  `\\(P \\Rightarrow Q\\): \\(\\quad ${item.p} \\Rightarrow ${item.q}\\)`,
            latex: '',
            answer: 1,
            answerTex: item.contraText,
            options: options,
            hintTex: [
                `\\text{The contrapositive of } P \\Rightarrow Q \\text{ is } \\neg Q \\Rightarrow \\neg P`,
                `\\text{Negate both the conclusion and hypothesis, then reverse the implication}`
            ],
            explain: `<strong>Rule:</strong> Contrapositive of \\(P \\Rightarrow Q\\) is \\(\\neg Q \\Rightarrow \\neg P\\).<br><br>${item.explain}`
        };
    },

    /**
     * 3. qContradiction — identify the correct first step in proof by contradiction (MC)
     */
    qContradiction() {
        const items = [
            {
                claim: '\\sqrt{2} \\text{ is irrational}',
                step: '\\text{Assume } \\sqrt{2} = \\frac{p}{q} \\text{ in lowest terms (i.e. assume it is rational)}',
                dist: [
                    '\\text{Assume } \\sqrt{2} \\text{ is irrational and derive a consequence}',
                    '\\text{Show directly that } \\sqrt{2} \\text{ cannot be written as a fraction}',
                    '\\text{Assume } \\sqrt{2} = 0 \\text{ and derive a contradiction}'
                ],
                explain: 'In a proof by contradiction, we assume the <em>negation</em> of what we want to prove. ' +
                         'To prove \\(\\sqrt{2}\\) is irrational, we assume it <em>is</em> rational, i.e. \\(\\sqrt{2} = p/q\\) in lowest terms, then derive a contradiction.'
            },
            {
                claim: '\\text{There are infinitely many primes}',
                step: '\\text{Assume there are only finitely many primes: } p_1, p_2, \\ldots, p_n',
                dist: [
                    '\\text{Show that a new prime always exists by direct construction without any assumption}',
                    '\\text{Assume all integers are prime}',
                    '\\text{Assume there are exactly two primes}'
                ],
                explain: 'To prove infinitely many primes exist by contradiction, assume the opposite: suppose there are only finitely many primes \\(p_1, \\ldots, p_n\\). ' +
                         'Then consider \\(N = p_1 p_2 \\cdots p_n + 1\\) — it is not divisible by any \\(p_i\\), giving a contradiction.'
            },
            {
                claim: 'n^2 \\text{ even} \\Rightarrow n \\text{ even}',
                step: '\\text{Assume } n^2 \\text{ is even and } n \\text{ is odd, then derive a contradiction}',
                dist: [
                    '\\text{Assume } n \\text{ is even and show } n^2 \\text{ must be even}',
                    '\\text{Assume both } n \\text{ and } n^2 \\text{ are even}',
                    '\\text{Assume } n^2 \\text{ is odd and derive a contradiction}'
                ],
                explain: 'We want to prove: if \\(n^2\\) is even then \\(n\\) is even. ' +
                         'By contradiction: assume \\(n^2\\) is even AND \\(n\\) is odd. ' +
                         'Write \\(n = 2k+1\\); then \\(n^2 = 4k^2+4k+1\\) is odd — contradicting \\(n^2\\) being even. \\(\\square\\)'
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.step, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Proof by Contradiction',
            difficulty: 'medium',
            text: `In a <strong>proof by contradiction</strong> of the claim below, what is the correct <strong>first step</strong>?<br><br>Claim: \\(${item.claim}\\)`,
            latex: '',
            answer: 1,
            answerTex: item.step,
            options: options,
            hintTex: [
                `\\text{In proof by contradiction, always begin by assuming the negation of what you want to prove}`,
                `\\text{Then derive a logical contradiction from that assumption}`
            ],
            explain: `<strong>Proof by contradiction:</strong> Assume \\(\\neg P\\) (the opposite of the claim) and derive a contradiction.<br><br>${item.explain}`
        };
    },

    /**
     * 4. qCounterexample — find a counterexample to a false universal statement (MC)
     */
    qCounterexample() {
        const items = [
            {
                claim: '\\text{For all integers } n, \\; n^2 \\geq n',
                correct: 'n = 0\\text{: } 0^2 = 0 \\not> 0',
                correctVal: 1,
                dist: [
                    'n = 5\\text{: } 25 \\geq 5 \\checkmark',
                    'n = 10\\text{: } 100 \\geq 10 \\checkmark',
                    'n = -3\\text{: } 9 \\geq -3 \\checkmark'
                ],
                explain: 'When \\(n = 0\\): \\(0^2 = 0\\), and \\(0 \\not> 0\\), so the strict inequality \\(n^2 > n\\) fails. ' +
                         '(Also \\(n = 1\\) gives \\(1 \\not> 1\\).) A single counterexample is enough to disprove a universal claim.'
            },
            {
                claim: '\\text{For all real } x, \\; \\sqrt{x^2} = x',
                correct: 'x = -4\\text{: } \\sqrt{(-4)^2} = 4 \\neq -4',
                correctVal: 1,
                dist: [
                    'x = 3\\text{: } \\sqrt{9} = 3 = x \\checkmark',
                    'x = 0\\text{: } \\sqrt{0} = 0 = x \\checkmark',
                    'x = 7\\text{: } \\sqrt{49} = 7 = x \\checkmark'
                ],
                explain: 'The correct identity is \\(\\sqrt{x^2} = |x|\\), not \\(x\\). When \\(x = -4\\): \\(\\sqrt{(-4)^2} = \\sqrt{16} = 4 \\neq -4\\).'
            },
            {
                claim: '\\text{For all primes } p, \\; p \\text{ is odd}',
                correct: 'p = 2\\text{: } 2 \\text{ is prime and even}',
                correctVal: 1,
                dist: [
                    'p = 3\\text{: prime and odd} \\checkmark',
                    'p = 7\\text{: prime and odd} \\checkmark',
                    'p = 11\\text{: prime and odd} \\checkmark'
                ],
                explain: '\\(p = 2\\) is prime and even, directly contradicting the claim. ' +
                         '2 is the only even prime, making it the unique counterexample here.'
            },
            {
                claim: '\\text{For all } n \\in \\mathbb{Z}^+, \\; 2^n > n^2',
                correct: 'n = 4\\text{: } 2^4 = 16 = 4^2 \\text{, not strictly greater}',
                correctVal: 1,
                dist: [
                    'n = 1\\text{: } 2 > 1 \\checkmark',
                    'n = 10\\text{: } 1024 > 100 \\checkmark',
                    'n = 2\\text{: } 4 > 4 \\text{ — wait, } 2^2=4=2^2 \\text{, so this also fails!}'
                ],
                explain: 'At \\(n = 4\\): \\(2^4 = 16 = 4^2\\), so \\(2^4 \\not> 4^2\\). (Also fails at \\(n=2\\) and \\(n=3\\).) ' +
                         'The statement \\(2^n > n^2\\) is actually only true for \\(n \\geq 5\\).'
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.correct, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Counterexample',
            difficulty: 'easy',
            text: 'The statement below is <strong>false</strong>. Which option is a <strong>counterexample</strong> that disproves it?<br><br>' +
                  `\\(${item.claim}\\)`,
            latex: '',
            answer: 1,
            answerTex: item.correct,
            options: options,
            hintTex: [
                `\\text{A counterexample is one specific value that makes the statement false}`,
                `\\text{Try small values: } n = 0, 1, 2\\text{ or special cases like negative numbers}`
            ],
            explain: `<strong>Counterexample found:</strong><br>${item.explain}<br><br><strong>Key principle:</strong> To disprove \\(\\forall x, P(x)\\), it suffices to find one \\(x\\) where \\(P(x)\\) is false.`
        };
    },

    /**
     * 5. qProofByInduction — identify what the base case verifies (MC)
     */
    qProofByInduction() {
        const items = [
            {
                stmt: `\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2} \\text{ for all } n \\geq 1`,
                start: 1,
                baseLHS: '1',
                baseRHS: '\\dfrac{1 \\cdot 2}{2} = 1',
                purpose: '\\text{It shows the formula holds for the smallest value } n = 1',
                dist: [
                    '\\text{It assumes the formula holds for } n = k',
                    '\\text{It shows the formula holds for all } n \\geq 2',
                    '\\text{It completes the inductive step by proving } P(k) \\Rightarrow P(k+1)'
                ]
            },
            {
                stmt: `n^2 + n \\text{ is even for all integers } n \\geq 0`,
                start: 0,
                baseLHS: '0^2 + 0 = 0',
                baseRHS: '\\text{0 is even}',
                purpose: '\\text{It confirms the statement is true for } n = 0 \\text{, providing the starting point}',
                dist: [
                    '\\text{It proves the result by direct algebraic manipulation for all } n',
                    '\\text{It assumes the result for } n = k \\text{ and derives it for } n = k+1',
                    '\\text{It shows the formula works for large } n'
                ]
            },
            {
                stmt: `3^n - 1 \\text{ is divisible by 2 for all } n \\geq 1`,
                start: 1,
                baseLHS: '3^1 - 1 = 2',
                baseRHS: '2 = 2 \\times 1, \\text{ divisible by 2}',
                purpose: '\\text{It verifies the statement is true for } n = 1\\text{, the base of the induction}',
                dist: [
                    '\\text{It proves the result for all odd } n',
                    '\\text{It gives the inductive hypothesis: assume true for } n = k',
                    '\\text{It derives the formula using the binomial theorem}'
                ]
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.purpose, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Proof by Induction',
            difficulty: 'easy',
            text: `In a proof by induction of \\(${item.stmt}\\), the <strong>base case</strong> verifies:<br><br>` +
                  `LHS \\(= ${item.baseLHS}\\), &ensp; RHS \\(= ${item.baseRHS}\\).<br><br>` +
                  `What does the base case achieve in the proof?`,
            latex: '',
            answer: 1,
            answerTex: item.purpose,
            options: options,
            hintTex: [
                `\\text{A proof by induction has two steps: base case and inductive step}`,
                `\\text{The base case establishes the starting value; the inductive step carries it forward}`
            ],
            explain: `<strong>Base case role:</strong> ${item.purpose}.<br><br>` +
                     `Without the base case, induction would "float in the air" — we'd have a chain of implications \\(P(k) \\Rightarrow P(k+1)\\) with no confirmed starting point.<br><br>` +
                     `<strong>Structure of induction:</strong><br>` +
                     `1. Base case: verify \\(P(${item.start})\\).<br>` +
                     `2. Inductive step: show \\(P(k) \\Rightarrow P(k+1)\\) for all \\(k \\geq ${item.start}\\).<br>` +
                     `3. Conclude \\(P(n)\\) holds for all \\(n \\geq ${item.start}\\). \\(\\square\\)`
        };
    },

    /**
     * 6. qNecessarySufficient — identify necessary vs sufficient conditions (MC)
     */
    qNecessarySufficient() {
        const items = [
            {
                context: 'n \\text{ is divisible by 4}',
                condition: 'n \\text{ is divisible by 2}',
                type: 'necessary',
                typeTex: '\\text{Necessary but not sufficient}',
                dist: [
                    '\\text{Sufficient but not necessary}',
                    '\\text{Both necessary and sufficient}',
                    '\\text{Neither necessary nor sufficient}'
                ],
                explain: 'If \\(n\\) is divisible by 4, it must be divisible by 2 — so divisibility by 2 is <em>necessary</em>. ' +
                         'But divisibility by 2 alone does not guarantee divisibility by 4 (e.g. \\(n = 6\\)) — so it is not <em>sufficient</em>.'
            },
            {
                context: 'a \\text{ quadrilateral is a square}',
                condition: 'a \\text{ quadrilateral has four equal sides}',
                type: 'necessary',
                typeTex: '\\text{Necessary but not sufficient}',
                dist: [
                    '\\text{Sufficient but not necessary}',
                    '\\text{Both necessary and sufficient}',
                    '\\text{Neither necessary nor sufficient}'
                ],
                explain: 'A square must have four equal sides — so equal sides is <em>necessary</em>. ' +
                         'However, a rhombus has four equal sides but is not a square — so equal sides alone is not <em>sufficient</em>.'
            },
            {
                context: 'x = 3',
                condition: 'x^2 = 9',
                type: 'necessary',
                typeTex: '\\text{Necessary but not sufficient}',
                dist: [
                    '\\text{Sufficient but not necessary}',
                    '\\text{Both necessary and sufficient}',
                    '\\text{Neither necessary nor sufficient}'
                ],
                explain: 'If \\(x = 3\\), then certainly \\(x^2 = 9\\) — so \\(x^2 = 9\\) is <em>necessary</em> (it must hold). ' +
                         'But \\(x^2 = 9\\) also when \\(x = -3\\), so it is not <em>sufficient</em> to conclude \\(x = 3\\).'
            },
            {
                context: 'n \\text{ is divisible by 6}',
                condition: 'n \\text{ is divisible by 2 and divisible by 3}',
                type: 'both',
                typeTex: '\\text{Both necessary and sufficient}',
                dist: [
                    '\\text{Necessary but not sufficient}',
                    '\\text{Sufficient but not necessary}',
                    '\\text{Neither necessary nor sufficient}'
                ],
                explain: '\\(n\\) is divisible by 6 if and only if it is divisible by both 2 and 3 (since \\(\\gcd(2,3)=1\\)). ' +
                         'So the condition is both <em>necessary</em> (must hold) and <em>sufficient</em> (always gives divisibility by 6).'
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.typeTex, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Necessary & Sufficient',
            difficulty: 'medium',
            text: `For the statement below, classify the <strong>condition</strong> relative to the <strong>conclusion</strong>:<br><br>` +
                  `Conclusion: \\(${item.context}\\)<br>Condition: \\(${item.condition}\\)`,
            latex: '',
            answer: 1,
            answerTex: item.typeTex,
            options: options,
            hintTex: [
                `\\text{Necessary: if conclusion holds, condition must hold. Sufficient: if condition holds, conclusion must hold.}`,
                `\\text{Check: does conclusion} \\Rightarrow \\text{condition? And does condition} \\Rightarrow \\text{conclusion?}`
            ],
            explain: `<strong>Definitions:</strong><br>` +
                     `- <em>Necessary</em> (N): \\(\\text{conclusion} \\Rightarrow \\text{condition}\\).<br>` +
                     `- <em>Sufficient</em> (S): \\(\\text{condition} \\Rightarrow \\text{conclusion}\\).<br>` +
                     `- Both (iff): \\(\\text{condition} \\Leftrightarrow \\text{conclusion}\\).<br><br>` +
                     `<strong>This case:</strong> ${item.explain}`
        };
    },

    /**
     * 7. qBiconditional — identify when P↔Q holds (MC)
     */
    qBiconditional() {
        const items = [
            {
                biconditional: 'n \\text{ is even} \\iff n^2 \\text{ is even}',
                correct: '\\text{Both } P \\Rightarrow Q \\text{ and } Q \\Rightarrow P \\text{ are true}',
                dist: [
                    '\\text{Only } P \\Rightarrow Q \\text{ holds; } Q \\Rightarrow P \\text{ is false}',
                    '\\text{Only } Q \\Rightarrow P \\text{ holds; } P \\Rightarrow Q \\text{ is false}',
                    '\\text{Neither direction holds in general}'
                ],
                explain: '\\(n\\) even \\(\\Rightarrow\\) \\(n^2\\) even (direct proof: \\(n=2k \\Rightarrow n^2=4k^2=2(2k^2)\\)).<br>' +
                         '\\(n^2\\) even \\(\\Rightarrow\\) \\(n\\) even (by contrapositive: \\(n\\) odd \\(\\Rightarrow\\) \\(n^2\\) odd).<br>' +
                         'Both directions hold, so the biconditional \\(P \\Leftrightarrow Q\\) is true.'
            },
            {
                biconditional: 'ab = 0 \\iff a = 0 \\text{ or } b = 0',
                correct: '\\text{Both directions hold (zero product property)}',
                dist: [
                    '\\text{Only } ab=0 \\Rightarrow a=0 \\text{ or } b=0',
                    '\\text{Only } a=0 \\text{ or } b=0 \\Rightarrow ab=0',
                    '\\text{The biconditional fails when both } a \\neq 0 \\text{ and } b \\neq 0'
                ],
                explain: 'Forward (\\(\\Rightarrow\\)): If \\(ab = 0\\), at least one factor is 0 (zero product property). ' +
                         'Backward (\\(\\Leftarrow\\)): If \\(a = 0\\) or \\(b = 0\\), then \\(ab = 0\\). Both hold. ✓'
            },
            {
                biconditional: 'x^2 = 4 \\iff x = 2',
                correct: '\\text{The biconditional is FALSE: } x = -2 \\text{ also satisfies } x^2 = 4',
                dist: [
                    '\\text{True, since } 2^2 = 4',
                    '\\text{True, both directions hold}',
                    '\\text{False, because } x^2 \\neq 4 \\text{ for any real } x'
                ],
                explain: '\\(x = 2 \\Rightarrow x^2 = 4\\) is true. But \\(x^2 = 4 \\Rightarrow x = 2\\) is FALSE — we also have \\(x = -2\\). ' +
                         'A biconditional \\(P \\Leftrightarrow Q\\) is true only when BOTH \\(P \\Rightarrow Q\\) and \\(Q \\Rightarrow P\\) hold.'
            },
            {
                biconditional: '|x| = 3 \\iff x = 3 \\text{ or } x = -3',
                correct: '\\text{True — both } |x|=3 \\Rightarrow x = \\pm 3 \\text{ and } x=\\pm 3 \\Rightarrow |x|=3',
                dist: [
                    '\\text{False — } |x| = 3 \\text{ only when } x > 0',
                    '\\text{Only the forward direction holds}',
                    '\\text{Only the backward direction holds}'
                ],
                explain: '\\(|x| = 3\\) means \\(x = 3\\) or \\(x = -3\\) by the definition of absolute value. ' +
                         'Conversely, if \\(x = 3\\) then \\(|x| = 3\\), and if \\(x = -3\\) then \\(|-3| = 3\\). ' +
                         'Both directions hold, so \\(|x| = 3 \\Leftrightarrow x = \\pm 3\\). ✓'
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.correct, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Biconditional (iff)',
            difficulty: 'medium',
            text: `Consider the biconditional statement \\(P \\Leftrightarrow Q\\) below.<br><br>` +
                  `\\(${item.biconditional}\\)<br><br>` +
                  `Which statement correctly describes this biconditional?`,
            latex: '',
            answer: 1,
            answerTex: item.correct,
            options: options,
            hintTex: [
                `P \\Leftrightarrow Q \\text{ is true exactly when both } P \\Rightarrow Q \\text{ and } Q \\Rightarrow P \\text{ are true}`,
                `\\text{Check each implication separately: forward and backward}`
            ],
            explain: `<strong>Biconditional \\(P \\Leftrightarrow Q\\):</strong> True if and only if both \\(P \\Rightarrow Q\\) and \\(Q \\Rightarrow P\\) hold.<br><br>${item.explain}`
        };
    },

    /**
     * 8. qProofStructure — identify which proof method is being described (MC)
     */
    qProofStructure() {
        const items = [
            {
                description: 'Assume \\(n\\) is even, write \\(n = 2k\\), then show \\(n^2 = 4k^2 = 2(2k^2)\\) is even.',
                method: '\\text{Direct proof}',
                dist: [
                    '\\text{Proof by contradiction}',
                    '\\text{Proof by contrapositive}',
                    '\\text{Proof by induction}'
                ],
                explain: 'The proof starts from the hypothesis (\\(n\\) even) and derives the conclusion (\\(n^2\\) even) in a direct chain of logical steps — this is a <em>direct proof</em>.'
            },
            {
                description: 'To prove \\(n^2\\) even \\(\\Rightarrow\\) \\(n\\) even: we instead prove its contrapositive — ' +
                             '\\(n\\) odd \\(\\Rightarrow\\) \\(n^2\\) odd.',
                method: '\\text{Proof by contrapositive}',
                dist: [
                    '\\text{Direct proof}',
                    '\\text{Proof by contradiction}',
                    '\\text{Proof by counterexample}'
                ],
                explain: 'Proving the contrapositive \\(\\neg Q \\Rightarrow \\neg P\\) instead of \\(P \\Rightarrow Q\\) — this is <em>proof by contrapositive</em>.'
            },
            {
                description: 'Assume \\(\\sqrt{2} = p/q\\) in lowest terms, show both \\(p\\) and \\(q\\) must be even — contradicting "lowest terms".',
                method: '\\text{Proof by contradiction}',
                dist: [
                    '\\text{Direct proof}',
                    '\\text{Proof by contrapositive}',
                    '\\text{Proof by exhaustion}'
                ],
                explain: 'We assumed the negation of the claim (\\(\\sqrt{2}\\) rational), then derived a logical impossibility (\\(p/q\\) not in lowest terms) — this is <em>proof by contradiction</em>.'
            },
            {
                description: 'Verify \\(P(1)\\). Assume \\(P(k)\\). Show \\(P(k+1)\\) follows. Conclude \\(P(n)\\) for all \\(n \\geq 1\\).',
                method: '\\text{Proof by mathematical induction}',
                dist: [
                    '\\text{Direct proof}',
                    '\\text{Proof by contradiction}',
                    '\\text{Proof by contrapositive}'
                ],
                explain: 'The structure — base case, inductive hypothesis, inductive step — is the hallmark of <em>proof by mathematical induction</em>.'
            },
            {
                description: 'The claim "all primes are odd" is false: \\(p = 2\\) is prime and even.',
                method: '\\text{Disproof by counterexample}',
                dist: [
                    '\\text{Direct proof}',
                    '\\text{Proof by contradiction}',
                    '\\text{Proof by induction}'
                ],
                explain: 'Finding one specific case that violates a universal claim is a <em>disproof by counterexample</em>. It only takes one counterexample to disprove "for all".'
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.method, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Proof Structure',
            difficulty: 'easy',
            text: `Identify the <strong>proof method</strong> being used in the argument below.<br><br><em>${item.description}</em>`,
            latex: '',
            answer: 1,
            answerTex: item.method,
            options: options,
            hintTex: [
                `\\text{Direct: assume hypothesis, derive conclusion step by step}`,
                `\\text{Contradiction: assume negation, reach impossibility. Contrapositive: prove } \\neg Q \\Rightarrow \\neg P`
            ],
            explain: `<strong>Correct method: ${item.method}.</strong><br><br>${item.explain}`
        };
    },

    /**
     * 9. qDisproveByCounterexample — free answer: find the counterexample value (numeric)
     */
    qDisproveByCounterexample() {
        const items = [
            {
                claim: '\\text{For all } n \\geq 1, \\; n^2 - n + 11 \\text{ is prime}',
                instructions: 'Find the smallest positive integer \\(n\\) for which \\(n^2 - n + 11\\) is <strong>not</strong> prime.',
                fn: n => n * n - n + 11,
                answer: 11,
                answerTex: '11',
                explain: 'At \\(n = 11\\): \\(11^2 - 11 + 11 = 121 = 11^2\\), which is not prime. ' +
                         'For \\(n = 1\\) to \\(10\\) the expression gives prime values, so \\(n = 11\\) is the smallest counterexample.'
            },
            {
                claim: '\\text{For all } n \\geq 1, \\; 2n - 1 \\text{ is prime}',
                instructions: 'Find the smallest \\(n \\geq 1\\) for which \\(2n - 1\\) is <strong>not</strong> prime.',
                fn: n => 2 * n - 1,
                answer: 5,
                answerTex: '5',
                explain: 'At \\(n = 5\\): \\(2(5) - 1 = 9 = 3^2\\), which is not prime. ' +
                         'Values \\(n=1\\) to \\(4\\) give \\(1, 3, 5, 7\\) — but 1 is actually not prime either, so \\(n=1\\) is also a counterexample! ' +
                         'The smallest is \\(n = 1\\) (gives 1, not prime). If primes must be \\(>1\\), then \\(n=1\\) gives the first failure.'
            },
            {
                claim: '\\text{For all integers } n \\geq 2, \\; n! > 2^{n-1}',
                instructions: 'Find the value of \\(n \\geq 2\\) where \\(n! > 2^{n-1}\\) first <strong>fails</strong> to be strictly true (i.e. where \\(n! \\leq 2^{n-1}\\)).',
                fn: n => ({ lhs: (() => { let f=1; for(let i=1;i<=n;i++) f*=i; return f; })(), rhs: Math.pow(2, n-1) }),
                answer: 2,
                answerTex: '2',
                explain: 'At \\(n = 2\\): \\(2! = 2 = 2^{2-1} = 2\\). So \\(2! = 2^1 = 2\\), meaning \\(2! \\not> 2^{n-1}\\) (they are equal). ' +
                         'The claim is false at \\(n = 2\\).'
            }
        ];

        const item = items[0]; // use the n^2 - n + 11 one as it has a clean numeric answer

        return {
            type: 'free',
            rule: 'Disproof by Counterexample',
            difficulty: 'hard',
            text: `The claim below appears to be true for small values, but is <strong>false</strong> in general.<br><br>` +
                  `Claim: \\(${item.claim}\\)<br><br>${item.instructions}`,
            latex: `\\(n^2 - n + 11\\)`,
            answer: item.answer,
            answerTex: item.answerTex,
            tolerance: 0,
            options: [],
            hintTex: [
                `\\text{Compute } n^2 - n + 11 \\text{ for } n = 1, 2, 3, \\ldots \\text{ until the result is not prime}`,
                `n = 11\\text{: } 11^2 - 11 + 11 = 121 = 11^2 \\text{ — not prime!}`
            ],
            explain: item.explain
        };
    },

    /**
     * 10. qConditionalStatement — identify the hypothesis and conclusion of an implication (MC)
     */
    qConditionalStatement() {
        const items = [
            {
                stmt: 'n \\text{ is divisible by 4} \\Rightarrow n \\text{ is divisible by 2}',
                question: 'What is the <strong>hypothesis</strong> (\\(P\\)) of this conditional?',
                correct: 'n \\text{ is divisible by 4}',
                dist: [
                    'n \\text{ is divisible by 2}',
                    'n \\text{ is even}',
                    'n \\text{ is an integer}'
                ],
                explain: 'In \\(P \\Rightarrow Q\\), \\(P\\) is the hypothesis (\\(n\\) divisible by 4) and \\(Q\\) is the conclusion (\\(n\\) divisible by 2). The hypothesis is what we assume; the conclusion is what we deduce.'
            },
            {
                stmt: 'x > 3 \\Rightarrow x^2 > 9',
                question: 'What is the <strong>conclusion</strong> (\\(Q\\)) of this conditional?',
                correct: 'x^2 > 9',
                dist: [
                    'x > 3',
                    'x > 0',
                    'x^2 > 0'
                ],
                explain: 'In \\(P \\Rightarrow Q\\): \\(P\\) (hypothesis) = "\\(x > 3\\)"; \\(Q\\) (conclusion) = "\\(x^2 > 9\\)". The conclusion follows the implication arrow \\(\\Rightarrow\\).'
            },
            {
                stmt: '\\text{If } f \\text{ is differentiable, then } f \\text{ is continuous}',
                question: 'What is the <strong>hypothesis</strong> of this conditional?',
                correct: 'f \\text{ is differentiable}',
                dist: [
                    'f \\text{ is continuous}',
                    'f \\text{ is integrable}',
                    'f \\text{ is bounded}'
                ],
                explain: '"If \\(f\\) is differentiable, then \\(f\\) is continuous." The hypothesis (\\(P\\)) is "\\(f\\) is differentiable" — it follows "if". The conclusion (\\(Q\\)) is "\\(f\\) is continuous" — it follows "then".'
            },
            {
                stmt: 'ab > 0 \\Rightarrow (a > 0 \\text{ and } b > 0) \\text{ or } (a < 0 \\text{ and } b < 0)',
                question: 'What is the <strong>conclusion</strong> (\\(Q\\)) of this conditional?',
                correct: '(a > 0 \\text{ and } b > 0) \\text{ or } (a < 0 \\text{ and } b < 0)',
                dist: [
                    'ab > 0',
                    'a > 0 \\text{ and } b > 0',
                    'a < 0 \\text{ and } b < 0'
                ],
                explain: 'The full conclusion is "\\((a > 0\\) and \\(b > 0)\\) or \\((a < 0\\) and \\(b < 0)\\)" — both \\(a\\) and \\(b\\) have the same sign. This is the complete statement that follows the \\(\\Rightarrow\\).'
            }
        ];

        const item = MathUtils.pick(items);
        const options = MathUtils.shuffle([
            { tex: item.correct, value: 1 },
            ...item.dist.map(d => ({ tex: d, value: 0 }))
        ]);

        return {
            type: 'mc',
            rule: 'Conditional Statement',
            difficulty: 'easy',
            text: `Consider the conditional statement below.<br><br>\\(${item.stmt}\\)<br><br>${item.question}`,
            latex: '',
            answer: 1,
            answerTex: item.correct,
            options: options,
            hintTex: [
                `\\text{In } P \\Rightarrow Q\\text{: } P \\text{ is the hypothesis ("if" part), } Q \\text{ is the conclusion ("then" part)}`,
                `\\text{The hypothesis comes before the implication arrow; the conclusion comes after}`
            ],
            explain: `<strong>Conditional structure \\(P \\Rightarrow Q\\):</strong><br>${item.explain}`
        };
    },

    /* ────────────────────────────────────────────
       INTERNAL: pick a weighted question
       ──────────────────────────────────────────── */

    pickQuestion() {
        const totalWeight = METHODS_PROOF.questions.reduce((s, q) => s + q.weight, 0);
        let r = Math.random() * totalWeight;
        for (const q of METHODS_PROOF.questions) {
            r -= q.weight;
            if (r <= 0) return METHODS_PROOF[q.method]();
        }
        const last = METHODS_PROOF.questions[METHODS_PROOF.questions.length - 1];
        return METHODS_PROOF[last.method]();
    },

    /* ────────────────────────────────────────────
       UI
       ──────────────────────────────────────────── */

    _load() {
        METHODS_PROOF.score = 0;
        METHODS_PROOF.total = 0;
        METHODS_PROOF.streak = 0;
        METHODS_PROOF.answered = false;
        METHODS_PROOF.hintIndex = 0;
        METHODS_PROOF.questions = [
            { method: 'qDirectProof',              weight: 2 },
            { method: 'qContrapositive',            weight: 2 },
            { method: 'qContradiction',             weight: 2 },
            { method: 'qCounterexample',            weight: 2 },
            { method: 'qProofByInduction',          weight: 2 },
            { method: 'qNecessarySufficient',       weight: 2 },
            { method: 'qBiconditional',             weight: 2 },
            { method: 'qProofStructure',            weight: 2 },
            { method: 'qDisproveByCounterexample',  weight: 2 },
            { method: 'qConditionalStatement',      weight: 2 }
        ];

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="METHODS_PROOF._unload()">&#8592; Methods of Proof</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Methods of Proof</h1>
                <p>IB Math AA — Direct proof, contradiction, contrapositive, induction, counterexample</p>
            </header>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="mproof-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="mproof-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="mproof-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="mproof-accuracy">-</div></div>
            </div>
            <div class="question-card" id="mproof-question-card">
                <span class="rule-tag" id="mproof-rule"></span>
                <span class="difficulty-tag" id="mproof-difficulty"></span>
                <div class="question-text" id="mproof-text"></div>
                <div class="question-prompt" id="mproof-latex"></div>
                <div id="mproof-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="mproof-hint-box"></div>
            <div class="feedback" id="mproof-feedback">
                <div class="feedback-title" id="mproof-feedback-title"></div>
                <div class="feedback-explanation" id="mproof-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="mproof-hint-btn" onclick="METHODS_PROOF._showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="mproof-next-btn" onclick="METHODS_PROOF._next()" style="display:none;">Next Question</button>
            </div>
        `;

        METHODS_PROOF._next();
    },

    _unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView(METHODS_PROOF.unload);
    },

    _next() {
        METHODS_PROOF.answered = false;
        METHODS_PROOF.hintIndex = 0;
        METHODS_PROOF.currentQ = METHODS_PROOF.pickQuestion();
        const q = METHODS_PROOF.currentQ;

        document.getElementById('mproof-rule').textContent = q.rule;
        const diffEl = document.getElementById('mproof-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        document.getElementById('mproof-text').innerHTML = q.text;
        document.getElementById('mproof-latex').innerHTML = q.latex || '';

        const optArea = document.getElementById('mproof-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="METHODS_PROOF._checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="mproof-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')METHODS_PROOF._checkFree()">
                    <button class="btn btn-primary" onclick="METHODS_PROOF._checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => { const el = document.getElementById('mproof-input'); if (el) el.focus(); }, 100);
        }

        const hintBox = document.getElementById('mproof-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        document.getElementById('mproof-feedback').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('mproof-next-btn').style.display = 'none';
        document.getElementById('mproof-hint-btn').style.display = '';
        document.getElementById('mproof-hint-btn').disabled = false;

        METHODS_PROOF._renderKaTeX();
    },

    _showHint() {
        const q = METHODS_PROOF.currentQ;
        if (!q || !q.hintTex || METHODS_PROOF.hintIndex >= q.hintTex.length) return;
        const hintBox = document.getElementById('mproof-hint-box');
        const sep = METHODS_PROOF.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = sep + `<span>\\(${q.hintTex[METHODS_PROOF.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        METHODS_PROOF.hintIndex++;
        if (METHODS_PROOF.hintIndex >= q.hintTex.length) {
            document.getElementById('mproof-hint-btn').disabled = true;
        }
        METHODS_PROOF._renderKaTeX();
    },

    _checkMC(btn) {
        if (METHODS_PROOF.answered) return;
        METHODS_PROOF.answered = true;
        METHODS_PROOF.total++;
        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });
        if (isCorrect) { btn.classList.add('correct'); METHODS_PROOF.score++; METHODS_PROOF.streak++; }
        else            { btn.classList.add('incorrect'); METHODS_PROOF.streak = 0; }
        METHODS_PROOF._showFeedback(isCorrect);
        METHODS_PROOF._updateStats();
    },

    _checkFree() {
        if (METHODS_PROOF.answered) return;
        const inp = document.getElementById('mproof-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        METHODS_PROOF.answered = true;
        METHODS_PROOF.total++;
        inp.disabled = true;
        const q = METHODS_PROOF.currentQ;
        const tol = q.tolerance !== undefined ? q.tolerance : 0.01;
        const isCorrect = Math.abs(val - q.answer) <= (tol === 0 ? 0.5 : tol) &&
                          (tol === 0 ? val === q.answer : true);
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            METHODS_PROOF.score++;
            METHODS_PROOF.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            METHODS_PROOF.streak = 0;
        }
        const sb = inp.parentElement.querySelector('.btn-primary');
        if (sb) sb.disabled = true;
        METHODS_PROOF._showFeedback(isCorrect);
        METHODS_PROOF._updateStats();
    },

    _showFeedback(isCorrect) {
        const q = METHODS_PROOF.currentQ;
        const fb    = document.getElementById('mproof-feedback');
        const title = document.getElementById('mproof-feedback-title');
        const expl  = document.getElementById('mproof-feedback-explanation');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            title.textContent = METHODS_PROOF.streak > 1 ? `Correct! (${METHODS_PROOF.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }
        expl.innerHTML = q.explain;
        document.getElementById('mproof-next-btn').style.display = '';
        document.getElementById('mproof-hint-btn').style.display = 'none';
        METHODS_PROOF._renderKaTeX();
    },

    _updateStats() {
        const s = document.getElementById('mproof-score');
        const t = document.getElementById('mproof-total');
        const k = document.getElementById('mproof-streak');
        const a = document.getElementById('mproof-accuracy');
        if (s) s.textContent = METHODS_PROOF.score;
        if (t) t.textContent = METHODS_PROOF.total;
        if (k) k.textContent = METHODS_PROOF.streak;
        if (a) a.textContent = METHODS_PROOF.total > 0
            ? Math.round((METHODS_PROOF.score / METHODS_PROOF.total) * 100) + '%' : '-';
    },

    _renderKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const container = document.getElementById('activity-container');
            if (container) {
                renderMathInElement(container, {
                    delimiters: [
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

// Bootstrap: if MathUtils.loadActivity / initActivity exist, they will call _load()/_next().
// Otherwise fall back to direct registration.
if (typeof MathUtils !== 'undefined' && typeof MathUtils.loadActivity === 'function') {
    // The framework will call load() / init() automatically.
} else {
    // Fallback: register the standard way used by all other activities.
    if (typeof ACTIVITY_INITS !== 'undefined') {
        ACTIVITY_INITS['methods-of-proof'] = () => METHODS_PROOF._load();
    }
}
