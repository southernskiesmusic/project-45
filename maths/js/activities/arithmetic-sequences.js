const ARITH_SEQ = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    /* ═══════════════════════════════════════════════
       EASY GENERATORS
       ═══════════════════════════════════════════════ */

    // 1. Find common difference from first few terms
    qFindD() {
        const u1 = MathUtils.randInt(-10, 50);
        const d = MathUtils.nonZeroRandInt(-8, 12);
        const terms = [u1, u1 + d, u1 + 2 * d, u1 + 3 * d];
        return {
            type: 'free',
            rule: 'Common Difference',
            difficulty: 'easy',
            text: 'Find the common difference \\(d\\) of the arithmetic sequence:',
            latex: terms.join(',\\; ') + ',\\; \\ldots',
            answer: d,
            answerTex: 'd = ' + d,
            options: [],
            hintTex: [
                'Subtract the first term from the second term.',
                'd = ' + terms[1] + ' - ' + (terms[0] >= 0 ? terms[0] : '(' + terms[0] + ')') + ' = ' + d
            ],
            explain: 'The common difference is \\(d = u_2 - u_1 = ' + terms[1] + ' - ' + (terms[0] >= 0 ? terms[0] : '(' + terms[0] + ')') + ' = ' + d + '\\).'
        };
    },

    // 2. Find u_n given u1 and d
    qFindNthTerm() {
        const u1 = MathUtils.randInt(-20, 30);
        const d = MathUtils.nonZeroRandInt(-5, 10);
        const n = MathUtils.randInt(8, 25);
        const un = u1 + (n - 1) * d;
        const nMinus1 = n - 1;
        const nMinus1TimesD = nMinus1 * d;
        return {
            type: 'free',
            rule: 'nth Term',
            difficulty: 'easy',
            text: 'An arithmetic sequence has \\(u_1 = ' + u1 + '\\) and \\(d = ' + d + '\\). Find \\(u_{' + n + '}\\).',
            latex: 'u_{' + n + '} = \\,?',
            answer: un,
            answerTex: 'u_{' + n + '} = ' + un,
            options: [],
            hintTex: [
                'Use the formula \\(u_n = u_1 + (n-1)d\\).',
                'u_{' + n + '} = ' + u1 + ' + (' + n + ' - 1) \\times ' + (d >= 0 ? d : '(' + d + ')') + ' = ' + u1 + ' + ' + nMinus1TimesD
            ],
            explain: '\\(u_{' + n + '} = u_1 + (n-1)d = ' + u1 + ' + (' + nMinus1 + ')(' + d + ') = ' + u1 + ' + ' + (nMinus1TimesD >= 0 ? nMinus1TimesD : '(' + nMinus1TimesD + ')') + ' = ' + un + '\\).'
        };
    },

    /* ═══════════════════════════════════════════════
       MEDIUM GENERATORS
       ═══════════════════════════════════════════════ */

    // 3. Find S_n given u1, d, n
    qFindSum() {
        const u1 = MathUtils.randInt(-10, 20);
        const d = MathUtils.randInt(1, 8);
        const n = MathUtils.randInt(10, 20);
        const Sn = n * (2 * u1 + (n - 1) * d) / 2;
        const twoU1 = 2 * u1;
        const nMinus1TimesD = (n - 1) * d;
        const bracketVal = twoU1 + nMinus1TimesD;
        return {
            type: 'free',
            rule: 'Arithmetic Series',
            difficulty: 'medium',
            text: 'An arithmetic sequence has \\(u_1 = ' + u1 + '\\) and \\(d = ' + d + '\\). Find \\(S_{' + n + '}\\).',
            latex: 'S_{' + n + '} = \\,?',
            answer: Sn,
            answerTex: 'S_{' + n + '} = ' + Sn,
            options: [],
            hintTex: [
                'Use the formula \\(S_n = \\frac{n}{2}(2u_1 + (n-1)d)\\).',
                'S_{' + n + '} = \\frac{' + n + '}{2}(2(' + u1 + ') + (' + (n - 1) + ')(' + d + ')) = \\frac{' + n + '}{2} \\times ' + bracketVal
            ],
            explain: '\\(S_{' + n + '} = \\frac{' + n + '}{2}\\bigl(2(' + u1 + ') + (' + (n - 1) + ')(' + d + ')\\bigr) = \\frac{' + n + '}{2}(' + twoU1 + ' + ' + nMinus1TimesD + ') = \\frac{' + n + '}{2} \\times ' + bracketVal + ' = ' + Sn + '\\).'
        };
    },

    // 4. Find d from two non-consecutive terms
    qFindDFromTwoTerms() {
        const p = MathUtils.randInt(2, 5);
        const q = MathUtils.randInt(8, 15);
        const d = MathUtils.nonZeroRandInt(-6, 8);
        const u1 = MathUtils.randInt(-15, 20);
        const up = u1 + (p - 1) * d;
        const uq = u1 + (q - 1) * d;
        // d = (uq - up) / (q - p) which is guaranteed integer since both terms use integer d
        return {
            type: 'free',
            rule: 'Find d from Terms',
            difficulty: 'medium',
            text: 'In an arithmetic sequence, \\(u_{' + p + '} = ' + up + '\\) and \\(u_{' + q + '} = ' + uq + '\\). Find \\(d\\).',
            latex: 'd = \\,?',
            answer: d,
            answerTex: 'd = ' + d,
            options: [],
            hintTex: [
                'Use \\(d = \\frac{u_q - u_p}{q - p}\\).',
                'd = \\frac{' + uq + ' - ' + (up >= 0 ? up : '(' + up + ')') + '}{' + q + ' - ' + p + '} = \\frac{' + (uq - up) + '}{' + (q - p) + '}'
            ],
            explain: 'Since \\(u_q - u_p = (q - p)d\\), we get \\(d = \\frac{u_{' + q + '} - u_{' + p + '}}{' + q + ' - ' + p + '} = \\frac{' + (uq - up) + '}{' + (q - p) + '} = ' + d + '\\).'
        };
    },

    // 5. Find n given u1, d, and u_n = V
    qFindNGivenTerm() {
        const u1 = MathUtils.randInt(-10, 20);
        const d = MathUtils.nonZeroRandInt(-5, 8);
        const n = MathUtils.randInt(10, 30);
        const V = u1 + (n - 1) * d;
        const diff = V - u1;
        return {
            type: 'free',
            rule: 'Find n',
            difficulty: 'medium',
            text: 'An arithmetic sequence has \\(u_1 = ' + u1 + '\\) and \\(d = ' + d + '\\). Given that \\(u_n = ' + V + '\\), find \\(n\\).',
            latex: 'n = \\,?',
            answer: n,
            answerTex: 'n = ' + n,
            options: [],
            hintTex: [
                'Rearrange \\(u_n = u_1 + (n-1)d\\) to solve for \\(n\\).',
                'n = \\frac{u_n - u_1}{d} + 1 = \\frac{' + V + ' - ' + (u1 >= 0 ? u1 : '(' + u1 + ')') + '}{' + d + '} + 1'
            ],
            explain: '\\(u_n = u_1 + (n-1)d \\Rightarrow ' + V + ' = ' + u1 + ' + (n-1)(' + d + ')\\).<br>' +
                '\\((n-1) = \\frac{' + diff + '}{' + d + '} = ' + (n - 1) + '\\), so \\(n = ' + (n - 1) + ' + 1 = ' + n + '\\).'
        };
    },

    // 6. Sum of series given first and last term (MC)
    qSumOfSeries() {
        const a = MathUtils.randInt(-5, 20);
        const d = MathUtils.nonZeroRandInt(1, 6);
        const numTerms = MathUtils.randInt(8, 20);
        const L = a + (numTerms - 1) * d;
        const S = numTerms * (a + L) / 2;

        const opts = MathUtils.generateOptions(S, () => {
            const variant = MathUtils.pick([
                S + d,                              // off by one term
                S - d,                              // off by one term other way
                (numTerms + 1) * (a + L) / 2,      // n+1 instead of n
                (numTerms - 1) * (a + L) / 2,      // n-1 instead of n
                numTerms * (a + L),                 // forgot to divide by 2
                Math.round(S * 0.9),                // ~10% off
                S + numTerms                        // common wrong addition
            ]);
            return variant;
        }, 4);
        const correctIdx = opts.indexOf(S);

        return {
            type: 'mc',
            rule: 'Series Sum',
            difficulty: 'medium',
            text: 'Find the sum of the arithmetic series:',
            latex: a + ' + ' + (a + d) + ' + ' + (a + 2 * d) + ' + \\cdots + ' + L,
            answer: S,
            answerTex: 'S = ' + S,
            options: opts.map(String),
            correctIdx: correctIdx,
            hintTex: [
                'First find the number of terms: \\(n = \\frac{L - a}{d} + 1\\).',
                'n = \\frac{' + L + ' - ' + (a >= 0 ? a : '(' + a + ')') + '}{' + d + '} + 1 = ' + numTerms + '. Then use \\(S_n = \\frac{n}{2}(a + L)\\).'
            ],
            explain: 'Number of terms: \\(n = \\frac{' + L + ' - ' + (a >= 0 ? a : '(' + a + ')') + '}{' + d + '} + 1 = \\frac{' + (L - a) + '}{' + d + '} + 1 = ' + numTerms + '\\).<br>' +
                '\\(S = \\frac{' + numTerms + '}{2}(' + a + ' + ' + L + ') = \\frac{' + numTerms + '}{2} \\times ' + (a + L) + ' = ' + S + '\\).'
        };
    },

    // 7. Three expressions in AP - find x
    qThreeTermsAP() {
        // Generate three expressions: (ax + b), (cx + e), (fx + g) in AP
        // Condition: 2(cx + e) = (ax + b) + (fx + g)
        // We pick x first, then build expressions
        const x = MathUtils.randInt(-5, 10);
        const d = MathUtils.nonZeroRandInt(-4, 8);
        const baseVal = MathUtils.randInt(-10, 20);

        // Three values in AP
        const v1 = baseVal;
        const v2 = baseVal + d;
        const v3 = baseVal + 2 * d;

        // Build expressions: pick simple linear forms
        // Expression 1: a1*x + b1 = v1
        const a1 = MathUtils.nonZeroRandInt(1, 4);
        const b1 = v1 - a1 * x;

        // Expression 2: a2*x + b2 = v2
        const a2 = MathUtils.nonZeroRandInt(1, 5);
        const b2 = v2 - a2 * x;

        // Expression 3: a3*x + b3 = v3
        const a3 = MathUtils.nonZeroRandInt(1, 4);
        const b3 = v3 - a3 * x;

        // Format expression as LaTeX
        function fmtExpr(coeff, constant) {
            let s = '';
            if (coeff === 1) s = 'x';
            else if (coeff === -1) s = '-x';
            else s = coeff + 'x';
            if (constant > 0) s += ' + ' + constant;
            else if (constant < 0) s += ' - ' + Math.abs(constant);
            return s;
        }

        const expr1 = fmtExpr(a1, b1);
        const expr2 = fmtExpr(a2, b2);
        const expr3 = fmtExpr(a3, b3);

        // AP condition: 2*middle = first + last
        // 2(a2*x + b2) = (a1*x + b1) + (a3*x + b3)
        // (2*a2 - a1 - a3)x = b1 + b3 - 2*b2
        const lhsCoeff = 2 * a2 - a1 - a3;
        const rhsConst = b1 + b3 - 2 * b2;

        return {
            type: 'free',
            rule: 'AP Condition',
            difficulty: 'medium',
            text: 'The expressions \\(' + expr1 + '\\), \\(' + expr2 + '\\), \\(' + expr3 + '\\) are consecutive terms of an arithmetic sequence. Find \\(x\\).',
            latex: 'x = \\,?',
            answer: x,
            answerTex: 'x = ' + x,
            options: [],
            hintTex: [
                'For three terms in AP: \\(2 \\times \\text{middle} = \\text{first} + \\text{last}\\).',
                '2(' + expr2 + ') = (' + expr1 + ') + (' + expr3 + ')'
            ],
            explain: 'If three terms are in AP, then \\(2u_2 = u_1 + u_3\\).<br>' +
                '\\(2(' + expr2 + ') = (' + expr1 + ') + (' + expr3 + ')\\)<br>' +
                '\\(' + (2 * a2) + 'x ' + (2 * b2 >= 0 ? '+ ' + (2 * b2) : '- ' + Math.abs(2 * b2)) + ' = ' + (a1 + a3) + 'x ' + (b1 + b3 >= 0 ? '+ ' + (b1 + b3) : '- ' + Math.abs(b1 + b3)) + '\\)<br>' +
                (lhsCoeff !== 0
                    ? '\\(' + lhsCoeff + 'x = ' + rhsConst + ' \\Rightarrow x = ' + x + '\\).'
                    : '\\(x = ' + x + '\\).')
        };
    },

    // 8. Sigma notation evaluation
    qSigmaNotation() {
        const a = MathUtils.randInt(1, 5);
        const b = MathUtils.randInt(-3, 5);
        const n = MathUtils.randInt(10, 30);
        // Sum of (ar + b) from r=1 to n
        // = a * sum(r) + nb = a * n(n+1)/2 + nb
        const sumR = n * (n + 1) / 2;
        const total = a * sumR + n * b;

        const bStr = b >= 0 ? '+ ' + b : '- ' + Math.abs(b);
        const bLatex = b >= 0 ? ' + ' + b : ' - ' + Math.abs(b);

        return {
            type: 'free',
            rule: 'Sigma Notation',
            difficulty: 'medium',
            text: 'Evaluate the following sum:',
            latex: '\\sum_{r=1}^{' + n + '} (' + (a === 1 ? 'r' : a + 'r') + bLatex + ')',
            answer: total,
            answerTex: String(total),
            options: [],
            hintTex: [
                'Split: \\(\\sum(' + (a === 1 ? 'r' : a + 'r') + bLatex + ') = ' + (a === 1 ? '' : a + ' \\times ') + '\\sum r ' + bStr.replace('-', '- ') + ' \\times n\\).',
                '\\sum_{r=1}^{' + n + '} r = \\frac{' + n + '(' + n + ' + 1)}{2} = ' + sumR + '. \\text{ So the sum is } ' + (a === 1 ? '' : a + ' \\times ') + sumR + ' ' + bStr + ' \\times ' + n
            ],
            explain: '\\(\\displaystyle\\sum_{r=1}^{' + n + '} (' + (a === 1 ? 'r' : a + 'r') + bLatex + ') = ' +
                (a === 1 ? '' : a) + '\\sum_{r=1}^{' + n + '} r ' + bStr.replace('-', '- ') + '(' + n + ')\\)<br>' +
                '\\(= ' + (a === 1 ? '' : a + ' \\times ') + '\\frac{' + n + ' \\times ' + (n + 1) + '}{2} ' + bStr + ' \\times ' + n + '\\)<br>' +
                '\\(= ' + (a === 1 ? '' : a + ' \\times ') + sumR + ' ' + (n * b >= 0 ? '+ ' + (n * b) : '- ' + Math.abs(n * b)) + ' = ' + total + '\\).'
        };
    },

    /* ═══════════════════════════════════════════════
       HARD GENERATORS
       ═══════════════════════════════════════════════ */

    // 9. Word problem (salary / savings context)
    qWordProblem() {
        const contexts = [
            {
                setup(u1, d, n) {
                    return 'A worker earns $' + u1.toLocaleString() + ' in their first year. Each subsequent year, their salary increases by $' + d.toLocaleString() + '. Find the total amount earned over ' + n + ' years.';
                },
                label: 'total earnings',
                u1Range: [25000, 45000],
                u1Step: 1000,
                dRange: [500, 3000],
                dStep: 500,
                nRange: [8, 15]
            },
            {
                setup(u1, d, n) {
                    return 'A theatre has ' + u1 + ' seats in the front row. Each subsequent row has ' + d + ' more seats than the row in front. Find the total number of seats if there are ' + n + ' rows.';
                },
                label: 'total seats',
                u1Range: [10, 25],
                u1Step: 1,
                dRange: [2, 5],
                dStep: 1,
                nRange: [12, 20]
            },
            {
                setup(u1, d, n) {
                    return 'An athlete runs ' + u1 + ' km on the first day of training. Each day, they increase the distance by ' + d + ' km. Find the total distance run over ' + n + ' days.';
                },
                label: 'total distance',
                u1Range: [2, 8],
                u1Step: 1,
                dRange: [1, 3],
                dStep: 1,
                nRange: [10, 20]
            },
            {
                setup(u1, d, n) {
                    return 'A savings plan requires a deposit of $' + u1 + ' in the first month. Each subsequent month, the deposit increases by $' + d + '. Find the total amount saved after ' + n + ' months.';
                },
                label: 'total saved',
                u1Range: [50, 200],
                u1Step: 10,
                dRange: [10, 50],
                dStep: 5,
                nRange: [10, 18]
            }
        ];

        const ctx = MathUtils.pick(contexts);
        const u1Choices = [];
        for (let v = ctx.u1Range[0]; v <= ctx.u1Range[1]; v += ctx.u1Step) u1Choices.push(v);
        const dChoices = [];
        for (let v = ctx.dRange[0]; v <= ctx.dRange[1]; v += ctx.dStep) dChoices.push(v);

        const u1 = MathUtils.pick(u1Choices);
        const d = MathUtils.pick(dChoices);
        const n = MathUtils.randInt(ctx.nRange[0], ctx.nRange[1]);
        const Sn = n * (2 * u1 + (n - 1) * d) / 2;

        const opts = MathUtils.generateOptions(Sn, () => {
            return MathUtils.pick([
                n * u1 + (n - 1) * d,                      // forgot to sum, just last term + something
                (n + 1) * (2 * u1 + (n - 1) * d) / 2,     // n+1 instead of n
                n * (2 * u1 + n * d) / 2,                  // n instead of n-1 inside bracket
                Sn + u1,                                     // added extra u1
                Sn - d * n,                                  // subtracted something plausible
                Math.round(Sn * 1.1),                       // ~10% more
                u1 + (n - 1) * d                            // just found u_n instead of S_n
            ]);
        }, 4);
        const correctIdx = opts.indexOf(Sn);

        return {
            type: 'mc',
            rule: 'Word Problem',
            difficulty: 'hard',
            text: ctx.setup(u1, d, n),
            latex: '',
            answer: Sn,
            answerTex: 'S_{' + n + '} = ' + Sn.toLocaleString(),
            options: opts.map(v => v.toLocaleString()),
            correctIdx: correctIdx,
            hintTex: [
                'This is an arithmetic series. Identify \\(u_1 = ' + u1 + '\\), \\(d = ' + d + '\\), and \\(n = ' + n + '\\).',
                'Use \\(S_n = \\frac{n}{2}(2u_1 + (n-1)d)\\).'
            ],
            explain: 'This is an arithmetic series with \\(u_1 = ' + u1 + '\\), \\(d = ' + d + '\\), \\(n = ' + n + '\\).<br>' +
                '\\(S_{' + n + '} = \\frac{' + n + '}{2}\\bigl(2(' + u1 + ') + (' + (n - 1) + ')(' + d + ')\\bigr)\\)<br>' +
                '\\(= \\frac{' + n + '}{2}(' + (2 * u1) + ' + ' + ((n - 1) * d) + ') = \\frac{' + n + '}{2} \\times ' + (2 * u1 + (n - 1) * d) + ' = ' + Sn + '\\).'
        };
    },

    // 10. Find n given u1, d, and S_n = V (solve quadratic)
    qFindNForSum() {
        // We need S_n = n/2 * (2u1 + (n-1)d) = V to yield a nice positive integer n.
        // Strategy: pick u1, d, n first, compute V, then ask for n.
        // The quadratic is: d*n^2 + (2*u1 - d)*n - 2V = 0
        const d = MathUtils.randInt(1, 6);
        const u1 = MathUtils.randInt(1, 15);
        const n = MathUtils.randInt(8, 20);
        const V = n * (2 * u1 + (n - 1) * d) / 2;

        // Quadratic: d*n^2 + (2u1 - d)*n - 2V = 0
        const A = d;
        const B = 2 * u1 - d;
        const C = -2 * V;

        return {
            type: 'free',
            rule: 'Find n from Sum',
            difficulty: 'hard',
            text: 'An arithmetic sequence has \\(u_1 = ' + u1 + '\\) and \\(d = ' + d + '\\). Given that \\(S_n = ' + V + '\\), find \\(n\\).',
            latex: 'n = \\,?',
            answer: n,
            answerTex: 'n = ' + n,
            options: [],
            hintTex: [
                'Substitute into \\(S_n = \\frac{n}{2}(2u_1 + (n-1)d)\\) and solve the resulting quadratic in \\(n\\).',
                '\\frac{n}{2}(2(' + u1 + ') + (n-1)(' + d + ')) = ' + V + ' \\Rightarrow ' + A + 'n^2 + ' + B + 'n - ' + (2 * V) + ' = 0'
            ],
            explain: '\\(S_n = \\frac{n}{2}(2(' + u1 + ') + (n-1)(' + d + ')) = ' + V + '\\)<br>' +
                '\\(\\frac{n}{2}(' + (2 * u1) + ' + ' + d + 'n - ' + d + ') = ' + V + '\\)<br>' +
                '\\(\\frac{n}{2}(' + d + 'n + ' + (2 * u1 - d) + ') = ' + V + '\\)<br>' +
                '\\(' + A + 'n^2 + ' + B + 'n - ' + (2 * V) + ' = 0\\)<br>' +
                'Solving the quadratic gives \\(n = ' + n + '\\) (taking the positive root).'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy: [this.qFindD, this.qFindNthTerm],
            medium: [this.qFindSum, this.qFindDFromTwoTerms, this.qFindNGivenTerm, this.qSumOfSeries, this.qThreeTermsAP, this.qSigmaNotation],
            hard: [this.qWordProblem, this.qFindNForSum]
        };
        this.allPool = [
            ...this.pools.easy, ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('arith-seq', this);
    },

    next() {
        const p = this.level === 'all' ? this.allPool : this.pools[this.level];
        return MathUtils.pick(p).call(this);
    },

    resetScore() {
        this.score = 0; this.total = 0; this.streak = 0;
        document.getElementById('arith-seq-score').textContent = '0 / 0';
        document.getElementById('arith-seq-pct').textContent = '\u2014';
        document.getElementById('arith-seq-streak').textContent = '0';
        if (typeof saveActivityStats === 'function') saveActivityStats('arith-seq', this);
    },

    load() {
        this.init();
        this.score = 0;
        this.total = 0;
        this.streak = 0;
        this.answered = false;
        this.hintIdx = 0;

        var container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML =
            '<button class="back-btn" onclick="ARITH_SEQ.unload()">Arithmetic Sequences (1.2-1.3)</button>' +
            '<header style="text-align:center;margin-bottom:24px;">' +
            '<h1>Arithmetic Sequences</h1>' +
            '<p>IB Math AA 1.2-1.3 - Common difference, nth term, series, sigma notation</p>' +
            '</header>' +
            '<div class="score-bar">' +
            '<div class="score-item"><div class="label">Score</div><div class="value" id="arith-seq-score">0 / 0</div></div>' +
            '<div class="score-item"><div class="label">Streak</div><div class="value" id="arith-seq-streak">0</div></div>' +
            '<div class="score-item"><div class="label">Accuracy</div><div class="value" id="arith-seq-pct">-</div></div>' +
            '</div>' +
            '<div class="question-card" id="arith-seq-card"></div>' +
            '<details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>' +
            '<div class="hint-box" id="arith-seq-hint"></div>' +
            '<div class="feedback" id="arith-seq-fb"><div class="feedback-title" id="arith-seq-fb-title"></div><div class="feedback-explanation" id="arith-seq-fb-expl"></div></div>' +
            '<div style="display:flex;justify-content:center;gap:12px;margin-top:12px;">' +
            '<button class="btn btn-hint" id="arith-seq-hint-btn" onclick="ARITH_SEQ.showHint()">Hint</button>' +
            '<button class="btn btn-primary next-btn" id="arith-seq-next" onclick="ARITH_SEQ.loadQuestion()">Next Question</button>' +
            '</div>';

        this.loadQuestion();
    },

    unload() {
        var container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    },

    showHint() {
        var q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        var box = document.getElementById('arith-seq-hint');
        if (box) {
            box.classList.add('show');
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + '\\(' + q.hintTex[this.hintIdx] + '\\)';
            this.hintIdx++;
        }
    },

    loadQuestion() {
        this.answered = false;
        this.hintIdx = 0;

        this.currentQ = this.next();
        var q = this.currentQ;
        var dl = { easy: 'Easy', medium: 'Medium', hard: 'Challenging' };

        // Build question card HTML
        let h = '<div class="difficulty-tag ' + q.difficulty + '">' + dl[q.difficulty] + '</div>';
        h += '<div class="rule-tag">' + q.rule + '</div>';
        h += '<div class="question-text">' + q.text + '</div>';
        if (q.latex) h += '<div class="question-prompt">\\(' + q.latex + '\\)</div>';

        if (q.type === 'mc') {
            h += '<div class="mc-options">';
            q.options.forEach(function(opt, i) {
                h += '<button class="mc-option" data-i="' + i + '">' + opt + '</button>';
            });
            h += '</div>';
        } else {
            h += '<div class="input-area">';
            h += '<math-field class="lr-math-field" id="arith-seq-mf" placeholder="?"></math-field>';
            h += '<button class="btn btn-primary" id="arith-seq-check">Check</button>';
            h += '</div>';
        }

        document.getElementById('arith-seq-card').innerHTML = h;
        document.getElementById('arith-seq-fb').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('arith-seq-next').classList.remove('show');
        if (typeof resetHint === 'function') resetHint('arith-seq-hint', 'arith-seq-hint-btn');
        document.getElementById('arith-seq-workout').innerHTML = '';
        if (typeof renderMath === 'function') renderMath();

        if (q.type === 'mc') {
            document.querySelectorAll('#arith-seq-card .mc-option').forEach(function(btn, i) {
                btn.addEventListener('click', function() {
                    if (ARITH_SEQ.answered) return;
                    ARITH_SEQ.answered = true;
                    var ok = i === q.correctIdx;
                    document.querySelectorAll('#arith-seq-card .mc-option').forEach(function(b, j) {
                        b.classList.add(j === q.correctIdx ? 'correct' : (j === i && !ok ? 'incorrect' : 'disabled'));
                        b.disabled = true;
                    });
                    ARITH_SEQ.record(ok);
                    var ex = q.explain;
                    if (!ok) ex = 'The correct answer is <strong>' + q.options[q.correctIdx] + '</strong>.<br>' + ex;
                    ARITH_SEQ.showFb(ok, ex);
                });
            });
            var _mcKey = function(e) {
                var k = parseInt(e.key);
                if (k >= 1 && k <= 4 && !ARITH_SEQ.answered) {
                    var btn = document.querySelector('#arith-seq-card .mc-option[data-i="' + (k - 1) + '"]');
                    if (btn) btn.click();
                }
            };
            document.addEventListener('keydown', _mcKey);
            this._mcCleanup = function() { document.removeEventListener('keydown', _mcKey); };
        } else {
            this._mcCleanup = null;
            setTimeout(function() {
                var mf = document.getElementById('arith-seq-mf');
                if (mf) {
                    mf.focus();
                    mf.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') { e.preventDefault(); ARITH_SEQ.check(); }
                    });
                }
                var checkBtn = document.getElementById('arith-seq-check');
                if (checkBtn) checkBtn.addEventListener('click', function() { ARITH_SEQ.check(); });
            }, 200);
        }
    },

    check() {
        if (this.answered) return;
        var mf = document.getElementById('arith-seq-mf');
        if (!mf || !mf.value.trim()) return;
        this.answered = true;
        var ans = parseLatex(mf.value);
        var tol = this.currentQ.tolerance || 0.01;
        var ok = Math.abs(ans - this.currentQ.answer) <= tol;
        mf.disabled = true;
        document.getElementById('arith-seq-check').disabled = true;
        this.record(ok);
        var ex = this.currentQ.explain;
        if (!ok) ex = 'The answer is \\(' + this.currentQ.answerTex + '\\).<br>' + ex;
        this.showFb(ok, ex);
    },

    record(ok) {
        this.total++;
        if (ok) { this.score++; this.streak++; } else { this.streak = 0; }
        document.getElementById('arith-seq-score').textContent = this.score + ' / ' + this.total;
        document.getElementById('arith-seq-pct').textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '\u2014';
        document.getElementById('arith-seq-streak').textContent = this.streak;
        if (typeof saveActivityStats === 'function') saveActivityStats('arith-seq', this, ok);
        if (window.markAnswered) window.markAnswered();
        if (this._mcCleanup) this._mcCleanup();
    },

    showFb(ok, html) {
        var fb = document.getElementById('arith-seq-fb');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        fb.style.textAlign = 'center';
        document.getElementById('arith-seq-fb-title').textContent = ok ? 'Correct!' : 'Not quite\u2026';
        document.getElementById('arith-seq-fb-expl').innerHTML = html;
        document.getElementById('arith-seq-next').classList.add('show');
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};
