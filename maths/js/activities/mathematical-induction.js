/*
 * mathematical-induction.js - IB Math AA 1.9: Mathematical Induction
 * Proof by induction: base case, inductive step, series and divisibility
 */

const MATH_IND = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qSeriesSum - Easy (Free)
     * Evaluate 1+2+3+...+n = n(n+1)/2.
     * Pick n ∈ {5,6,7,8,9,10}. Answer = n(n+1)/2.
     */
    qSeriesSum() {
        const nList = [5, 6, 7, 8, 9, 10];
        const n = MathUtils.pick(nList);
        const answer = n * (n + 1) / 2;

        // Expand sum for display: "1 + 2 + 3 + ... + n"
        const termList = [];
        for (let i = 1; i <= Math.min(n, 4); i++) termList.push(String(i));
        const sumDisplay = termList.join(' + ') + (n > 4 ? ` + \\cdots + ${n}` : '');

        return {
            type: 'free',
            rule: 'Series Sum Formula',
            difficulty: 'easy',
            text: `Use the formula \\(\\displaystyle\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}\\) to evaluate the sum below.`,
            latex: `\\(${sumDisplay}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\sum_{k=1}^{${n}} k = \\frac{n(n+1)}{2} \\text{ with } n = ${n}`,
                `= \\frac{${n} \\times ${n + 1}}{2} = \\frac{${n * (n + 1)}}{2} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Recall the closed-form formula: \\(\\displaystyle\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(n = ${n}\\):<br>` +
                     `\\(\\displaystyle\\sum_{k=1}^{${n}} k = \\frac{${n}(${n}+1)}{2} = \\frac{${n} \\times ${n + 1}}{2} = \\frac{${n * (n + 1)}}{2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: the answer is \\(${answer}\\).`
        };
    },

    /**
     * 2. qSeriesSquares - Easy (Free)
     * 1²+2²+...+n² = n(n+1)(2n+1)/6.
     * Pick n ∈ {4,5,6}. Answer = n(n+1)(2n+1)/6.
     */
    qSeriesSquares() {
        const nList = [4, 5, 6];
        const n = MathUtils.pick(nList);
        const answer = n * (n + 1) * (2 * n + 1) / 6;

        const termList = [];
        for (let i = 1; i <= Math.min(n, 3); i++) termList.push(`${i}^2`);
        const sumDisplay = termList.join(' + ') + (n > 3 ? ` + \\cdots + ${n}^2` : '');

        return {
            type: 'free',
            rule: 'Sum of Squares Formula',
            difficulty: 'easy',
            text: `Use the formula \\(\\displaystyle\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}\\) to evaluate the sum below.`,
            latex: `\\(${sumDisplay}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\sum_{k=1}^{${n}} k^2 = \\frac{n(n+1)(2n+1)}{6} \\text{ with } n = ${n}`,
                `= \\frac{${n} \\times ${n + 1} \\times ${2 * n + 1}}{6} = \\frac{${n * (n + 1) * (2 * n + 1)}}{6} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Recall the closed-form formula: \\(\\displaystyle\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(n = ${n}\\):<br>` +
                     `\\(\\displaystyle\\sum_{k=1}^{${n}} k^2 = \\frac{${n}(${n + 1})(${2 * n + 1})}{6} = \\frac{${n * (n + 1) * (2 * n + 1)}}{6}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: the answer is \\(${answer}\\).`
        };
    },

    /**
     * 3. qBaseCase - Easy (MC)
     * Given a statement P(n) starting at n=1, identify the base case step.
     * The question checks whether the formula holds for the stated starting value.
     */
    qBaseCase() {
        // Pick a formula scenario: either sum = n(n+1)/2 or divisibility n³-n by 6
        const scenarios = [
            {
                stmt: `P(n): \\displaystyle\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}`,
                start: 1,
                lhs: '1',
                rhs: '\\dfrac{1 \\cdot 2}{2} = 1',
                holds: true
            },
            {
                stmt: `P(n): \\displaystyle\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}`,
                start: 1,
                lhs: '1^2 = 1',
                rhs: '\\dfrac{1 \\cdot 2 \\cdot 3}{6} = 1',
                holds: true
            },
            {
                stmt: `P(n): 1 + 2 + 4 + \\cdots + 2^{n-1} = 2^n - 1`,
                start: 1,
                lhs: '2^{1-1} = 1',
                rhs: '2^1 - 1 = 1',
                holds: true
            }
        ];

        const sc = MathUtils.pick(scenarios);

        const options = MathUtils.shuffle([
            {
                value: 1,
                tex: `\\text{Verify that } P(${sc.start}) \\text{ is true: check LHS} = ${sc.lhs}, \\text{ RHS} = ${sc.rhs}`
            },
            {
                value: 0,
                tex: `\\text{Assume } P(k) \\text{ holds for some arbitrary } k \\geq ${sc.start}`
            },
            {
                value: 0,
                tex: `\\text{Show that } P(k) \\Rightarrow P(k+1) \\text{ for all } k \\geq ${sc.start}`
            },
            {
                value: 0,
                tex: `\\text{Verify that } P(2) \\text{ is true since } n = 2 \\text{ is the simplest case}`
            }
        ]);

        return {
            type: 'mc',
            rule: 'Base Case',
            difficulty: 'easy',
            text: `Consider the statement: \\(${sc.stmt}\\).<br>What is the <strong>base case</strong> step in a proof by induction?`,
            latex: '',
            answer: 1,
            answerTex: `\\text{Verify } P(${sc.start}): \\text{LHS} = ${sc.lhs} = \\text{RHS}`,
            options: options,
            hintTex: [
                `\\text{The base case verifies the statement for the smallest value of } n`,
                `\\text{Here, substitute } n = ${sc.start} \\text{ into both sides and confirm they are equal}`
            ],
            explain: `<strong>Base case:</strong> In a proof by induction, the base case establishes that \\(P(${sc.start})\\) is true.<br><br>` +
                     `<strong>Verification:</strong> Substituting \\(n = ${sc.start}\\):<br>` +
                     `LHS \\(= ${sc.lhs}\\), &nbsp; RHS \\(= ${sc.rhs}\\).<br><br>` +
                     `Since LHS = RHS, \\(P(${sc.start})\\) holds. The base case is complete.<br><br>` +
                     `<strong>Note:</strong> The other options describe the <em>inductive hypothesis</em> and <em>inductive step</em>, not the base case.`
        };
    },

    /**
     * 4. qInductiveStep - Medium (MC)
     * In the inductive step, we assume P(k). What do we try to prove?
     */
    qInductiveStep() {
        // Pick a concrete formula to ground the question
        const formulas = [
            `\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}`,
            `\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}`,
            `1 + r + r^2 + \\cdots + r^{n-1} = \\frac{r^n - 1}{r - 1}`
        ];
        const formula = MathUtils.pick(formulas);

        const options = MathUtils.shuffle([
            {
                value: 1,
                tex: `P(k+1) \\text{ is true, i.e. the formula holds for } n = k+1`
            },
            {
                value: 0,
                tex: `P(k-1) \\text{ is true, i.e. the formula holds for } n = k-1`
            },
            {
                value: 0,
                tex: `P(2k) \\text{ is true, i.e. the formula holds for } n = 2k`
            },
            {
                value: 0,
                tex: `P(k) \\text{ is true — we already assumed this}`
            }
        ]);

        return {
            type: 'mc',
            rule: 'Inductive Step',
            difficulty: 'medium',
            text: `In a proof by induction of \\(${formula}\\), we <strong>assume</strong> \\(P(k)\\) is true (the inductive hypothesis). What must we then <strong>prove</strong>?`,
            latex: '',
            answer: 1,
            answerTex: `P(k+1) \\text{ is true}`,
            options: options,
            hintTex: [
                `\\text{The inductive step has two parts: assume } P(k), \\text{ then prove } P(k+1)`,
                `\\text{We want to show: if the formula holds for } n = k, \\text{ it also holds for } n = k+1`
            ],
            explain: `<strong>Inductive step structure:</strong><br>` +
                     `1. <em>Assume</em> \\(P(k)\\): the formula holds for some \\(k \\geq 1\\).<br>` +
                     `2. <em>Prove</em> \\(P(k+1)\\): show the formula holds for \\(n = k+1\\).<br><br>` +
                     `By establishing the base case and completing the inductive step, we conclude \\(P(n)\\) is true for all \\(n\\) in the domain.<br><br>` +
                     `The other options (\\(P(k-1)\\), \\(P(2k)\\)) are not what induction requires — we always step from \\(k\\) to \\(k+1\\).`
        };
    },

    /**
     * 5. qDivisibilityCheck - Easy (Free)
     * Is n³ - n divisible by 6 for n = a?
     * Ask for (a³ - a)/6. Pick a ∈ {2,3,4,5,6}.
     */
    qDivisibilityCheck() {
        const aList = [2, 3, 4, 5, 6];
        const a = MathUtils.pick(aList);
        const expr = a * a * a - a;          // a³ - a
        const answer = expr / 6;             // always integer since n³-n = n(n-1)(n+1)

        return {
            type: 'free',
            rule: 'Divisibility by 6',
            difficulty: 'easy',
            text: `The expression \\(n^3 - n = n(n-1)(n+1)\\) is always divisible by 6 (a key induction result). For \\(n = ${a}\\), find the value of \\(\\dfrac{n^3 - n}{6}\\).`,
            latex: `\\(\\dfrac{${a}^3 - ${a}}{6}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `n^3 - n = n(n-1)(n+1) \\text{. For } n = ${a}: \\quad ${a}^3 - ${a} = ${a}(${a - 1})(${a + 1})`,
                `${a}(${a - 1})(${a + 1}) = ${expr} \\implies \\frac{${expr}}{6} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Factor: \\(n^3 - n = n(n-1)(n+1)\\), a product of three consecutive integers.<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(n = ${a}\\):<br>` +
                     `\\(${a}^3 - ${a} = ${a}(${a - 1})(${a + 1}) = ${expr}\\).<br><br>` +
                     `<strong>Step 3:</strong> Divide by 6:<br>` +
                     `\\(\\dfrac{${expr}}{6} = ${answer}\\).<br><br>` +
                     `<strong>Why divisible?</strong> Any three consecutive integers include a multiple of 2 and a multiple of 3, so their product is divisible by \\(2 \\times 3 = 6\\).`
        };
    },

    /**
     * 6. qGeomSeries - Easy (Free)
     * 1 + r + r² + ... + r^n = (r^(n+1) - 1)/(r - 1).
     * Pick r = 2, n ∈ {3,4,5}. Answer = 2^(n+1) - 1.
     */
    qGeomSeries() {
        const nList = [3, 4, 5];
        const n = MathUtils.pick(nList);
        const r = 2;
        // sum = 1 + 2 + 4 + ... + 2^n
        // = (2^(n+1) - 1)/(2 - 1) = 2^(n+1) - 1
        const answer = Math.pow(r, n + 1) - 1;

        // Build display: 1 + 2 + 4 + ... + 2^n
        const terms = [];
        for (let i = 0; i <= Math.min(n, 3); i++) {
            terms.push(i === 0 ? '1' : i === 1 ? '2' : `2^{${i}}`);
        }
        const sumDisplay = terms.join(' + ') + (n > 3 ? ` + \\cdots + 2^{${n}}` : '');

        return {
            type: 'free',
            rule: 'Geometric Series Formula',
            difficulty: 'easy',
            text: `Use the geometric series formula \\(\\displaystyle\\sum_{k=0}^{n} r^k = \\frac{r^{n+1}-1}{r-1}\\) with \\(r = 2\\) to evaluate the sum below.`,
            latex: `\\(${sumDisplay}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{With } r = 2 \\text{ and } n = ${n}: \\quad S = \\frac{2^{${n + 1}} - 1}{2 - 1}`,
                `= 2^{${n + 1}} - 1 = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Identify \\(r = 2\\) and \\(n = ${n}\\). The sum is \\(\\displaystyle\\sum_{k=0}^{${n}} 2^k\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the formula \\(S = \\dfrac{r^{n+1} - 1}{r - 1}\\):<br>` +
                     `\\(S = \\dfrac{2^{${n + 1}} - 1}{2 - 1} = \\dfrac{${Math.pow(2, n + 1)} - 1}{1}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(S = ${answer}\\).`
        };
    },

    /**
     * 7. qInductionVerify - Medium (MC)
     * If P(n): sum 1 to n = n(n+1)/2, what must you add to the LHS when going from P(k) to P(k+1)?
     * Answer = k+1.
     */
    qInductionVerify() {
        const options = MathUtils.shuffle([
            {
                value: 1,
                tex: `k + 1 \\text{, because the next term in the sum is } (k+1)`
            },
            {
                value: 0,
                tex: `k \\text{, the last term already included in } P(k)`
            },
            {
                value: 0,
                tex: `\\frac{(k+1)(k+2)}{2} \\text{, the entire new right-hand side}`
            },
            {
                value: 0,
                tex: `2(k+1) \\text{, doubling the new index}`
            }
        ]);

        return {
            type: 'mc',
            rule: 'Inductive Step — Series',
            difficulty: 'medium',
            text: `Consider \\(P(n): \\displaystyle\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}\\).<br>` +
                  `Assume \\(P(k)\\) is true. When writing out \\(P(k+1)\\), what new term do you add to the left-hand side?`,
            latex: `\\(P(k): \\displaystyle\\sum_{i=1}^{k} i = \\frac{k(k+1)}{2}\\)`,
            answer: 1,
            answerTex: `k + 1`,
            options: options,
            hintTex: [
                `P(k+1): \\displaystyle\\sum_{i=1}^{k+1} i = \\sum_{i=1}^{k} i + (k+1)`,
                `\\text{So you add } (k+1) \\text{ to the LHS of } P(k)`
            ],
            explain: `<strong>Key idea:</strong> Going from \\(P(k)\\) to \\(P(k+1)\\) means extending the sum by one more term.<br><br>` +
                     `\\(\\displaystyle\\sum_{i=1}^{k+1} i = \\underbrace{\\sum_{i=1}^{k} i}_{= \\frac{k(k+1)}{2} \\text{ by IH}} + (k+1)\\)<br><br>` +
                     `So the new term added to the LHS is \\(k+1\\).<br><br>` +
                     `<strong>Completing the step:</strong><br>` +
                     `\\(= \\dfrac{k(k+1)}{2} + (k+1) = \\dfrac{k(k+1) + 2(k+1)}{2} = \\dfrac{(k+1)(k+2)}{2}\\),<br>` +
                     `which is exactly \\(P(k+1)\\). ✓`
        };
    },

    /**
     * 8. qFactorialGrowth - Medium (MC)
     * Is n! > 2^n for n ≥ 4?
     * Ask: is 6! > 2^6?
     */
    qFactorialGrowth() {
        // Fixed: n = 6.  6! = 720, 2^6 = 64. 720 > 64 → Yes.
        const n = 6;
        const fact = 720;   // 6!
        const pow2 = 64;    // 2^6

        const options = MathUtils.shuffle([
            {
                value: 1,
                tex: `\\text{Yes} — 6! = ${fact} \\text{ and } 2^6 = ${pow2}, \\text{ so } ${fact} > ${pow2}`
            },
            {
                value: 0,
                tex: `\\text{No} — 6! = ${fact} \\text{ but } 2^6 = ${pow2}, \\text{ so } 6! < 2^6`
            },
            {
                value: 0,
                tex: `\\text{No} — n! > 2^n \\text{ only holds for odd } n`
            },
            {
                value: 0,
                tex: `\\text{Yes, but only because } n = 6 \\text{ is even}`
            }
        ]);

        return {
            type: 'mc',
            rule: 'Factorial vs Exponential',
            difficulty: 'medium',
            text: `It can be proved by induction that \\(n! > 2^n\\) for all integers \\(n \\geq 4\\). Is this true for \\(n = 6\\)?`,
            latex: `\\text{Evaluate } 6! \\text{ and } 2^6.`,
            answer: 1,
            answerTex: `\\text{Yes: } 6! = ${fact} > 2^6 = ${pow2}`,
            options: options,
            hintTex: [
                `6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = ${fact}`,
                `2^6 = 64, \\quad ${fact} > 64 \\implies 6! > 2^6 \\checkmark`
            ],
            explain: `<strong>Step 1:</strong> Compute \\(6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = ${fact}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute \\(2^6 = 64\\).<br><br>` +
                     `<strong>Step 3:</strong> Compare: \\(${fact} > 64\\), so \\(6! > 2^6\\). ✓<br><br>` +
                     `<strong>Induction context:</strong> The inductive step shows: if \\(k! > 2^k\\), then \\((k+1)! = (k+1) \\cdot k! > (k+1) \\cdot 2^k > 2 \\cdot 2^k = 2^{k+1}\\) (using \\(k+1 > 2\\) for \\(k \\geq 4\\)).`
        };
    },

    /**
     * 9. qClosedForm - Medium (MC)
     * Which closed form equals 1 + 2 + 4 + ... + 2^(n-1)?
     * Correct answer: 2^n - 1.
     */
    qClosedForm() {
        const options = MathUtils.shuffle([
            {
                value: 1,
                tex: `2^n - 1`
            },
            {
                value: 0,
                tex: `2^n`
            },
            {
                value: 0,
                tex: `2^{n+1} - 1`
            },
            {
                value: 0,
                tex: `\\dfrac{n(n+1)}{2}`
            }
        ]);

        return {
            type: 'mc',
            rule: 'Closed Form — Geometric',
            difficulty: 'medium',
            text: `Which closed form equals the sum below?`,
            latex: `\\(1 + 2 + 4 + \\cdots + 2^{n-1}\\)`,
            answer: 1,
            answerTex: `2^n - 1`,
            options: options,
            hintTex: [
                `\\text{This is a geometric series: } \\sum_{k=0}^{n-1} 2^k`,
                `S = \\frac{2^n - 1}{2 - 1} = 2^n - 1`
            ],
            explain: `<strong>Step 1:</strong> Recognise the series: \\(1 + 2 + 4 + \\cdots + 2^{n-1} = \\displaystyle\\sum_{k=0}^{n-1} 2^k\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the geometric series formula \\(S = \\dfrac{r^n - 1}{r - 1}\\) with \\(r = 2\\):<br>` +
                     `\\(S = \\dfrac{2^n - 1}{2 - 1} = 2^n - 1\\).<br><br>` +
                     `<strong>Check (small case):</strong> \\(n = 3\\): \\(1 + 2 + 4 = 7 = 2^3 - 1\\). ✓<br><br>` +
                     `<strong>Why not the others?</strong> \\(2^n\\) is one more than the correct value; \\(2^{n+1} - 1\\) sums one extra term; \\(\\frac{n(n+1)}{2}\\) is the arithmetic (not geometric) series formula.`
        };
    },

    /**
     * 10. qInductionStep2 - Hard (MC)
     * Divisibility: if k² + k is even, is (k+1)² + (k+1) even?
     */
    qInductionStep2() {
        const options = MathUtils.shuffle([
            {
                value: 1,
                tex: `\\text{Yes — } (k+1)^2+(k+1) = (k^2+k) + 2(k+1), \\text{ which is even + even}`
            },
            {
                value: 0,
                tex: `\\text{No — parity depends on } k`
            },
            {
                value: 0,
                tex: `\\text{Only if } k \\text{ is odd}`
            },
            {
                value: 0,
                tex: `\\text{Only if } k \\text{ is even}`
            }
        ]);

        return {
            type: 'mc',
            rule: 'Inductive Step — Divisibility',
            difficulty: 'hard',
            text: `<strong>Induction on divisibility.</strong> We want to prove \\(n^2 + n\\) is always even.<br>` +
                  `The inductive hypothesis states: \\(k^2 + k\\) is even for some \\(k \\geq 1\\).<br>` +
                  `Is \\((k+1)^2 + (k+1)\\) necessarily even?`,
            latex: `\\((k+1)^2 + (k+1) = k^2 + 3k + 2\\)`,
            answer: 1,
            answerTex: `\\text{Yes: }(k+1)^2+(k+1) = (k^2+k)+2(k+1) = \\text{even} + \\text{even}`,
            options: options,
            hintTex: [
                `(k+1)^2 + (k+1) = k^2 + 2k + 1 + k + 1 = k^2 + 3k + 2`,
                `= (k^2 + k) + 2(k+1) = \\underbrace{(k^2+k)}_{\\text{even by IH}} + \\underbrace{2(k+1)}_{\\text{even}}`
            ],
            explain: `<strong>Step 1:</strong> Expand \\((k+1)^2 + (k+1)\\):<br>` +
                     `\\((k+1)^2 + (k+1) = k^2 + 2k + 1 + k + 1 = k^2 + 3k + 2\\).<br><br>` +
                     `<strong>Step 2:</strong> Rewrite to reveal the inductive hypothesis:<br>` +
                     `\\(k^2 + 3k + 2 = (k^2 + k) + 2(k+1)\\).<br><br>` +
                     `<strong>Step 3:</strong> Analyse parity:<br>` +
                     `- \\((k^2 + k)\\) is even <em>by the inductive hypothesis</em>.<br>` +
                     `- \\(2(k+1)\\) is even for all integers \\(k\\).<br>` +
                     `- Even + Even = Even.<br><br>` +
                     `<strong>Conclusion:</strong> \\((k+1)^2 + (k+1)\\) is even. ✓ The inductive step is complete.<br>` +
                     `Combined with the base case \\(P(1): 1^2 + 1 = 2\\) (even), \\(n^2 + n\\) is even for all \\(n \\geq 1\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        // q1-3,5-6 easy (weight 3), q4,7-9 medium (weight 2), q10 hard (weight 1)
        const pool = [
            { fn: () => MATH_IND.qSeriesSum(),          weight: 3, difficulty: 'easy'   },  // 0
            { fn: () => MATH_IND.qSeriesSquares(),       weight: 3, difficulty: 'easy'   },  // 1
            { fn: () => MATH_IND.qBaseCase(),            weight: 3, difficulty: 'easy'   },  // 2
            { fn: () => MATH_IND.qInductiveStep(),       weight: 2, difficulty: 'medium' },  // 3
            { fn: () => MATH_IND.qDivisibilityCheck(),   weight: 3, difficulty: 'easy'   },  // 4
            { fn: () => MATH_IND.qGeomSeries(),          weight: 3, difficulty: 'easy'   },  // 5
            { fn: () => MATH_IND.qInductionVerify(),     weight: 2, difficulty: 'medium' },  // 6
            { fn: () => MATH_IND.qFactorialGrowth(),     weight: 2, difficulty: 'medium' },  // 7
            { fn: () => MATH_IND.qClosedForm(),          weight: 2, difficulty: 'medium' },  // 8
            { fn: () => MATH_IND.qInductionStep2(),      weight: 1, difficulty: 'hard'   }   // 9
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (MATH_IND.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 4, 5].includes(i));
        } else if (MATH_IND.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 6, 7, 8].includes(i));
        } else if (MATH_IND.level === 'hard') {
            filtered = pool.filter((_, i) => [9].includes(i));
        }

        const totalWeight = filtered.reduce((s, p) => s + p.weight, 0);
        let r = Math.random() * totalWeight;
        for (const item of filtered) {
            r -= item.weight;
            if (r <= 0) return item.fn();
        }
        return filtered[filtered.length - 1].fn();
    },

    /* ────────────────────────────────────────────
       UI: load()
       ──────────────────────────────────────────── */

    load() {
        MATH_IND.score = 0;
        MATH_IND.total = 0;
        MATH_IND.streak = 0;
        MATH_IND.answered = false;
        MATH_IND.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="MATH_IND.unload()">Mathematical Induction (1.9)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Mathematical Induction</h1>
                <p>IB Math AA 1.9 — Proof by induction, series and divisibility</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="MATH_IND.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="MATH_IND.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="MATH_IND.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="MATH_IND.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="mathind-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="mathind-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="mathind-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="mathind-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="mathind-question-card">
                <span class="rule-tag" id="mathind-rule"></span>
                <span class="difficulty-tag" id="mathind-difficulty"></span>
                <div class="question-text" id="mathind-text"></div>
                <div class="question-prompt" id="mathind-latex"></div>
                <div id="mathind-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="mathind-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="mathind-feedback">
                <div class="feedback-title" id="mathind-feedback-title"></div>
                <div class="feedback-explanation" id="mathind-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="mathind-hint-btn" onclick="MATH_IND.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="mathind-next-btn" onclick="MATH_IND.next()" style="display:none;">Next Question</button>
            </div>
        `;

        MATH_IND.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        MATH_IND.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        MATH_IND.score = 0;
        MATH_IND.total = 0;
        MATH_IND.streak = 0;
        MATH_IND.updateStats();
        MATH_IND.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        MATH_IND.answered = false;
        MATH_IND.hintIndex = 0;
        MATH_IND.currentQ = MATH_IND.pickQuestion();
        const q = MATH_IND.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('mathind-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('mathind-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('mathind-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('mathind-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('mathind-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="MATH_IND.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="mathind-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')MATH_IND.checkFree()">
                    <button class="btn btn-primary" onclick="MATH_IND.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('mathind-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('mathind-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('mathind-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('mathind-next-btn').style.display = 'none';
        document.getElementById('mathind-hint-btn').style.display = '';
        document.getElementById('mathind-hint-btn').disabled = false;

        // Render KaTeX
        MATH_IND.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = MATH_IND.currentQ;
        if (!q || !q.hintTex || MATH_IND.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('mathind-hint-box');
        const hintContent = MATH_IND.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[MATH_IND.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        MATH_IND.hintIndex++;

        if (MATH_IND.hintIndex >= q.hintTex.length) {
            document.getElementById('mathind-hint-btn').disabled = true;
        }

        MATH_IND.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (MATH_IND.answered) return;
        MATH_IND.answered = true;
        MATH_IND.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        // Disable all buttons and highlight
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            MATH_IND.score++;
            MATH_IND.streak++;
        } else {
            btn.classList.add('incorrect');
            MATH_IND.streak = 0;
        }

        MATH_IND.showFeedback(isCorrect);
        MATH_IND.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (MATH_IND.answered) return;

        const inp = document.getElementById('mathind-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        MATH_IND.answered = true;
        MATH_IND.total++;
        inp.disabled = true;

        const q = MATH_IND.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            MATH_IND.score++;
            MATH_IND.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            MATH_IND.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        MATH_IND.showFeedback(isCorrect);
        MATH_IND.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = MATH_IND.currentQ;
        const fb = document.getElementById('mathind-feedback');
        const title = document.getElementById('mathind-feedback-title');
        const explanation = document.getElementById('mathind-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (MATH_IND.streak > 1) {
                title.textContent = `Correct! (${MATH_IND.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('mathind-next-btn').style.display = '';
        document.getElementById('mathind-hint-btn').style.display = 'none';

        MATH_IND.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('mathind-score');
        const totalEl  = document.getElementById('mathind-total');
        const streakEl = document.getElementById('mathind-streak');
        const accEl    = document.getElementById('mathind-accuracy');

        if (scoreEl)  scoreEl.textContent  = MATH_IND.score;
        if (totalEl)  totalEl.textContent  = MATH_IND.total;
        if (streakEl) streakEl.textContent = MATH_IND.streak;
        if (accEl) {
            accEl.textContent = MATH_IND.total > 0
                ? Math.round((MATH_IND.score / MATH_IND.total) * 100) + '%'
                : '-';
        }
    },

    /* ────────────────────────────────────────────
       UI: renderAllKaTeX()
       ──────────────────────────────────────────── */

    renderAllKaTeX() {
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

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['mathematical-induction'] = () => MATH_IND.load();
}
