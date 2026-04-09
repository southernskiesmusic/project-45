const GEO_SEQ = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIndex: 0,
    level: 'all',

    /* ═══════════════════════════════════════════════
       EASY GENERATORS
       ═══════════════════════════════════════════════ */

    // 1. Find common ratio from first 4 terms
    qFindR() {
        const u1Choices = [2, 3, 4, 5, 6, 8, 10];
        const rChoices = [2, 3, 4, 5, 0.5, 1 / 3, -2, -3];
        const u1 = MathUtils.pick(u1Choices);
        const r = MathUtils.pick(rChoices);

        const terms = [u1, u1 * r, u1 * r * r, u1 * r * r * r];

        // Format terms nicely
        function fmtTerm(v) {
            if (Number.isInteger(v)) return String(v);
            // Check common fractions
            const frac = MathUtils.simplifyFraction(Math.round(v * 1000), 1000);
            if (frac[1] === 1) return String(frac[0]);
            return MathUtils.fractionTeX(Math.round(v * frac[1]), frac[1]);
        }

        function fmtTermPlain(v) {
            if (Number.isInteger(v)) return String(v);
            const num = Math.round(v * 12);
            const den = 12;
            const s = MathUtils.simplifyFraction(num, den);
            if (s[1] === 1) return String(s[0]);
            return s[0] + '/' + s[1];
        }

        const termsTeX = terms.map(fmtTerm);
        const rIsInt = Number.isInteger(r);
        const answerNum = rIsInt ? r : r;
        let answerTex;
        if (rIsInt) {
            answerTex = 'r = ' + r;
        } else {
            const [n, d] = MathUtils.simplifyFraction(Math.round(r * 12), 12);
            if (d === 1) {
                answerTex = 'r = ' + n;
            } else {
                answerTex = 'r = ' + MathUtils.fractionTeX(n, d);
            }
        }

        const t2 = fmtTermPlain(terms[1]);
        const t1 = fmtTermPlain(terms[0]);

        return {
            type: 'free',
            rule: 'Common Ratio',
            difficulty: 'easy',
            text: 'Find the common ratio \\(r\\) of the geometric sequence:',
            latex: termsTeX.join(',\\; ') + ',\\; \\ldots',
            answer: r,
            answerTex: answerTex,
            options: [],
            hintTex: [
                'Divide the second term by the first term.',
                'r = \\frac{u_2}{u_1} = \\frac{' + t2 + '}{' + t1 + '} = ' + (rIsInt ? r : MathUtils.fractionTeX(Math.round(r * 12), 12))
            ],
            explain: 'The common ratio is \\(r = \\frac{u_2}{u_1} = \\frac{' + t2 + '}{' + t1 + '} = ' + (rIsInt ? r : MathUtils.fractionTeX(Math.round(r * 12), 12)) + '\\).'
        };
    },

    // 2. Find u_n given u1 and r
    qFindNthTerm() {
        const u1 = MathUtils.randInt(2, 20);
        const rChoices = [2, 3, 0.5];
        const r = MathUtils.pick(rChoices);
        const n = MathUtils.randInt(5, 10);
        const un = u1 * Math.pow(r, n - 1);

        const rIsHalf = (r === 0.5);
        const rTeX = rIsHalf ? '\\frac{1}{2}' : String(r);
        const rParen = rIsHalf ? '\\left(\\frac{1}{2}\\right)' : String(r);

        let answerTex;
        if (Number.isInteger(un)) {
            answerTex = 'u_{' + n + '} = ' + un;
        } else {
            const [num, den] = MathUtils.simplifyFraction(Math.round(un * Math.pow(2, n - 1)), Math.pow(2, n - 1));
            if (den === 1) {
                answerTex = 'u_{' + n + '} = ' + num;
            } else {
                answerTex = 'u_{' + n + '} = ' + MathUtils.fractionTeX(num, den);
            }
        }

        const answer = MathUtils.round(un, 6);

        return {
            type: 'free',
            rule: 'nth Term',
            difficulty: 'easy',
            text: 'A geometric sequence has \\(u_1 = ' + u1 + '\\) and \\(r = ' + rTeX + '\\). Find \\(u_{' + n + '}\\).',
            latex: 'u_{' + n + '} = \\,?',
            answer: answer,
            answerTex: answerTex,
            options: [],
            tolerance: 0.01,
            hintTex: [
                'Use the formula \\(u_n = u_1 \\cdot r^{n-1}\\).',
                'u_{' + n + '} = ' + u1 + ' \\times ' + rParen + '^{' + (n - 1) + '} = ' + u1 + ' \\times ' + MathUtils.round(Math.pow(r, n - 1), 6)
            ],
            explain: '\\(u_{' + n + '} = u_1 \\cdot r^{n-1} = ' + u1 + ' \\times ' + rParen + '^{' + (n - 1) + '} = ' + u1 + ' \\times ' + MathUtils.round(Math.pow(r, n - 1), 6) + ' = ' + MathUtils.round(un, 6) + '\\).'
        };
    },

    /* ═══════════════════════════════════════════════
       MEDIUM GENERATORS
       ═══════════════════════════════════════════════ */

    // 3. Find S_n of a geometric series
    qFindSum() {
        const u1 = MathUtils.randInt(2, 10);
        const rChoices = [2, 3];
        const r = MathUtils.pick(rChoices);
        const n = MathUtils.randInt(6, 10);
        const rn = Math.pow(r, n);
        const Sn = u1 * (rn - 1) / (r - 1);

        return {
            type: 'free',
            rule: 'Geometric Series',
            difficulty: 'medium',
            text: 'A geometric sequence has \\(u_1 = ' + u1 + '\\) and \\(r = ' + r + '\\). Find \\(S_{' + n + '}\\).',
            latex: 'S_{' + n + '} = \\,?',
            answer: Sn,
            answerTex: 'S_{' + n + '} = ' + Sn,
            options: [],
            hintTex: [
                'Use the formula \\(S_n = \\frac{u_1(r^n - 1)}{r - 1}\\).',
                'S_{' + n + '} = \\frac{' + u1 + '(' + r + '^{' + n + '} - 1)}{' + r + ' - 1} = \\frac{' + u1 + '(' + rn + ' - 1)}{' + (r - 1) + '}'
            ],
            explain: '\\(S_{' + n + '} = \\frac{u_1(r^n - 1)}{r - 1} = \\frac{' + u1 + '(' + r + '^{' + n + '} - 1)}{' + r + ' - 1}\\)<br>' +
                '\\(= \\frac{' + u1 + '(' + rn + ' - 1)}{' + (r - 1) + '} = \\frac{' + u1 + ' \\times ' + (rn - 1) + '}{' + (r - 1) + '} = \\frac{' + (u1 * (rn - 1)) + '}{' + (r - 1) + '} = ' + Sn + '\\).'
        };
    },

    // 4. Sum to infinity for |r| < 1
    qSumToInfinity() {
        const u1 = MathUtils.randInt(6, 100);
        const rFracs = [
            { num: 1, den: 2 },
            { num: 1, den: 3 },
            { num: 2, den: 3 },
            { num: 1, den: 4 },
            { num: 3, den: 4 },
            { num: -1, den: 2 }
        ];
        const rFrac = MathUtils.pick(rFracs);
        const r = rFrac.num / rFrac.den;
        const rTeX = MathUtils.fractionTeX(rFrac.num, rFrac.den);

        // S_inf = u1 / (1 - r) = u1 / ((den - num) / den) = u1 * den / (den - num)
        const oneMinusRNum = rFrac.den - rFrac.num;
        const oneMinusRDen = rFrac.den;
        // S_inf = u1 * oneMinusRDen / oneMinusRNum
        const SinfNum = u1 * oneMinusRDen;
        const SinfDen = oneMinusRNum;
        const [simpNum, simpDen] = MathUtils.simplifyFraction(SinfNum, SinfDen);
        const Sinf = SinfNum / SinfDen;

        let answerTex;
        if (simpDen === 1) {
            answerTex = 'S_\\infty = ' + simpNum;
        } else {
            answerTex = 'S_\\infty = ' + MathUtils.fractionTeX(simpNum, simpDen);
        }

        const oneMinusRTeX = MathUtils.fractionTeX(oneMinusRNum, oneMinusRDen);

        return {
            type: 'free',
            rule: 'Sum to Infinity',
            difficulty: 'medium',
            text: 'A geometric series has \\(u_1 = ' + u1 + '\\) and \\(r = ' + rTeX + '\\). Find \\(S_\\infty\\).',
            latex: 'S_\\infty = \\,?',
            answer: MathUtils.round(Sinf, 6),
            answerTex: answerTex,
            options: [],
            tolerance: 0.01,
            hintTex: [
                'Since \\(|r| < 1\\), the series converges. Use \\(S_\\infty = \\frac{u_1}{1 - r}\\).',
                'S_\\infty = \\frac{' + u1 + '}{1 - ' + rTeX + '} = \\frac{' + u1 + '}{' + oneMinusRTeX + '}'
            ],
            explain: '\\(S_\\infty = \\frac{u_1}{1 - r} = \\frac{' + u1 + '}{1 - \\left(' + rTeX + '\\right)} = \\frac{' + u1 + '}{' + oneMinusRTeX + '} = ' + answerTex.replace('S_\\infty = ', '') + '\\).'
        };
    },

    // 5. Find r from two non-consecutive terms
    qFindRFromTwoTerms() {
        // Pick r as a small integer so results are clean
        const rChoices = [2, 3, -2, -3];
        const r = MathUtils.pick(rChoices);
        const u1 = MathUtils.randInt(2, 10);
        const p = MathUtils.randInt(2, 4);
        const q = p + MathUtils.randInt(2, 4); // q > p, gap of 2-4
        const up = u1 * Math.pow(r, p - 1);
        const uq = u1 * Math.pow(r, q - 1);
        const gap = q - p;

        // r^gap = uq / up, so r = (uq / up)^(1/gap)
        // Since we chose integer r, this will be clean
        const ratio = uq / up;

        return {
            type: 'free',
            rule: 'Find r from Terms',
            difficulty: 'medium',
            text: 'In a geometric sequence, \\(u_{' + p + '} = ' + up + '\\) and \\(u_{' + q + '} = ' + uq + '\\). Find \\(r\\).',
            latex: 'r = \\,?',
            answer: r,
            answerTex: 'r = ' + r,
            options: [],
            hintTex: [
                'Use \\(\\frac{u_q}{u_p} = r^{q-p}\\), so \\(r = \\left(\\frac{u_q}{u_p}\\right)^{\\frac{1}{q-p}}\\).',
                'r = \\left(\\frac{' + uq + '}{' + up + '}\\right)^{\\frac{1}{' + gap + '}} = \\left(' + ratio + '\\right)^{\\frac{1}{' + gap + '}} = ' + r
            ],
            explain: 'Since \\(u_q = u_p \\cdot r^{q-p}\\), we have \\(r^{' + gap + '} = \\frac{u_{' + q + '}}{u_{' + p + '}} = \\frac{' + uq + '}{' + up + '} = ' + ratio + '\\).<br>' +
                'Therefore \\(r = ' + (gap === 1 ? ratio : '(' + ratio + ')^{1/' + gap + '}') + ' = ' + r + '\\).'
        };
    },

    // 6. Convergence test (MC)
    qConvergence() {
        // Mix of converging and diverging sequences
        const scenarios = [
            { u1: MathUtils.randInt(2, 50), r: 0.5, converges: true },
            { u1: MathUtils.randInt(2, 50), r: -0.5, converges: true },
            { u1: MathUtils.randInt(2, 50), r: 1 / 3, converges: true },
            { u1: MathUtils.randInt(2, 50), r: 2 / 3, converges: true },
            { u1: MathUtils.randInt(2, 50), r: 3 / 4, converges: true },
            { u1: MathUtils.randInt(2, 50), r: 2, converges: false },
            { u1: MathUtils.randInt(2, 50), r: -2, converges: false },
            { u1: MathUtils.randInt(2, 50), r: 3, converges: false },
            { u1: MathUtils.randInt(2, 50), r: -3, converges: false },
            { u1: MathUtils.randInt(2, 50), r: 1, converges: false },
            { u1: MathUtils.randInt(2, 50), r: -1, converges: false },
            { u1: MathUtils.randInt(2, 50), r: 5 / 4, converges: false }
        ];
        const sc = MathUtils.pick(scenarios);
        const u1 = sc.u1;
        const r = sc.r;
        const converges = sc.converges;

        const rIsInt = Number.isInteger(r);
        let rTeX;
        if (rIsInt) {
            rTeX = String(r);
        } else {
            const [n, d] = MathUtils.simplifyFraction(Math.round(r * 12), 12);
            if (d === 1) {
                rTeX = String(n);
            } else {
                rTeX = MathUtils.fractionTeX(n, d);
            }
        }

        const absR = Math.abs(r);
        let absRTeX;
        if (Number.isInteger(absR)) {
            absRTeX = String(absR);
        } else {
            const [n, d] = MathUtils.simplifyFraction(Math.round(absR * 12), 12);
            if (d === 1) {
                absRTeX = String(n);
            } else {
                absRTeX = MathUtils.fractionTeX(n, d);
            }
        }

        const correctAnswer = converges ? 'Yes, because |r| < 1' : 'No, because |r| >= 1';
        const correctIdx = converges ? 0 : 1;
        const options = [
            'Yes, because |r| < 1',
            'No, because |r| >= 1',
            converges ? 'No, because r is positive' : 'Yes, because u1 is finite',
            converges ? 'No, because the terms decrease' : 'Yes, because the terms alternate'
        ];

        return {
            type: 'mc',
            rule: 'Convergence',
            difficulty: 'easy',
            text: 'Does the geometric series with \\(u_1 = ' + u1 + '\\) and \\(r = ' + rTeX + '\\) converge?',
            latex: '',
            answer: converges ? 1 : 0,
            answerTex: correctAnswer,
            options: options,
            correctIdx: correctIdx,
            hintTex: [
                'A geometric series converges if and only if \\(|r| < 1\\).',
                '|r| = |' + rTeX + '| = ' + absRTeX + (converges ? ' < 1 \\text{, so it converges.}' : ' \\geq 1 \\text{, so it diverges.}')
            ],
            explain: 'A geometric series converges if and only if \\(|r| < 1\\).<br>' +
                'Here \\(|r| = ' + absRTeX + (converges ? ' < 1\\), so the series converges.' : ' \\geq 1\\), so the series does not converge.')
        };
    },

    /* ═══════════════════════════════════════════════
       HARD GENERATORS
       ═══════════════════════════════════════════════ */

    // 7. Find smallest n for threshold
    qFindNForThreshold() {
        // Two types: growth (r > 1, find n s.t. u_n > T) or decay (0 < r < 1, find n s.t. u_n < T)
        const isGrowth = Math.random() < 0.5;

        if (isGrowth) {
            const u1 = MathUtils.randInt(2, 10);
            const r = MathUtils.pick([2, 3]);
            // Find n s.t. u_n > T where T is large
            // u_n = u1 * r^(n-1) > T
            // Pick a target n between 6 and 12 and compute T just below u_n
            const targetN = MathUtils.randInt(6, 12);
            const unTarget = u1 * Math.pow(r, targetN - 1);
            const unPrev = u1 * Math.pow(r, targetN - 2);
            // T is between u_{n-1} and u_n
            const T = MathUtils.randInt(Math.floor(unPrev) + 1, Math.floor(unTarget) - 1);

            // Verify: smallest n s.t. u_n > T
            let n = 1;
            while (u1 * Math.pow(r, n - 1) <= T) n++;

            return {
                type: 'free',
                rule: 'Find n for Threshold',
                difficulty: 'hard',
                text: 'A geometric sequence has \\(u_1 = ' + u1 + '\\) and \\(r = ' + r + '\\). Find the smallest value of \\(n\\) such that \\(u_n > ' + T + '\\).',
                latex: 'n = \\,?',
                answer: n,
                answerTex: 'n = ' + n,
                options: [],
                hintTex: [
                    'We need \\(u_1 \\cdot r^{n-1} > ' + T + '\\), i.e. \\(' + u1 + ' \\cdot ' + r + '^{n-1} > ' + T + '\\).',
                    r + '^{n-1} > \\frac{' + T + '}{' + u1 + '} = ' + MathUtils.round(T / u1, 2) + '. \\text{ Taking logs: } (n-1) > \\frac{\\ln ' + MathUtils.round(T / u1, 2) + '}{\\ln ' + r + '} \\approx ' + MathUtils.round(Math.log(T / u1) / Math.log(r), 2)
                ],
                explain: '\\(u_n > ' + T + ' \\Rightarrow ' + u1 + ' \\cdot ' + r + '^{n-1} > ' + T + '\\)<br>' +
                    '\\(' + r + '^{n-1} > ' + MathUtils.round(T / u1, 2) + '\\)<br>' +
                    '\\((n-1) \\ln ' + r + ' > \\ln ' + MathUtils.round(T / u1, 2) + '\\)<br>' +
                    '\\(n - 1 > ' + MathUtils.round(Math.log(T / u1) / Math.log(r), 4) + '\\)<br>' +
                    '\\(n > ' + MathUtils.round(Math.log(T / u1) / Math.log(r) + 1, 4) + '\\)<br>' +
                    'The smallest integer is \\(n = ' + n + '\\).'
            };
        } else {
            // Decay: 0 < r < 1, find n s.t. u_n < T (small)
            const u1 = MathUtils.randInt(100, 1000);
            const r = 0.5;
            const rTeX = '\\frac{1}{2}';
            // Pick target n between 5 and 10
            const targetN = MathUtils.randInt(5, 10);
            const unTarget = u1 * Math.pow(r, targetN - 1);
            const unNext = u1 * Math.pow(r, targetN);
            // T is between u_n and u_{n+1} so n is the first where u_n < T
            // Actually u_n < T means we want T between u_{n-1} and u_n (since sequence is decreasing)
            const unPrev = u1 * Math.pow(r, targetN - 2);
            const T = MathUtils.randInt(Math.ceil(unTarget) + 1, Math.floor(unPrev) - 1);

            // Verify: smallest n s.t. u_n < T
            let n = 1;
            while (u1 * Math.pow(r, n - 1) >= T) n++;

            return {
                type: 'free',
                rule: 'Find n for Threshold',
                difficulty: 'hard',
                text: 'A geometric sequence has \\(u_1 = ' + u1 + '\\) and \\(r = ' + rTeX + '\\). Find the smallest value of \\(n\\) such that \\(u_n < ' + T + '\\).',
                latex: 'n = \\,?',
                answer: n,
                answerTex: 'n = ' + n,
                options: [],
                hintTex: [
                    'We need \\(u_1 \\cdot r^{n-1} < ' + T + '\\), i.e. \\(' + u1 + ' \\cdot \\left(' + rTeX + '\\right)^{n-1} < ' + T + '\\).',
                    '\\left(' + rTeX + '\\right)^{n-1} < \\frac{' + T + '}{' + u1 + '} = ' + MathUtils.round(T / u1, 4) + '. \\text{ Taking logs (flip inequality): } (n-1) > ' + MathUtils.round(Math.log(T / u1) / Math.log(r), 2)
                ],
                explain: '\\(u_n < ' + T + ' \\Rightarrow ' + u1 + ' \\cdot \\left(' + rTeX + '\\right)^{n-1} < ' + T + '\\)<br>' +
                    '\\(\\left(' + rTeX + '\\right)^{n-1} < ' + MathUtils.round(T / u1, 4) + '\\)<br>' +
                    'Taking \\(\\ln\\) of both sides (and flipping the inequality since \\(\\ln(1/2) < 0\\)):<br>' +
                    '\\(n - 1 > \\frac{\\ln ' + MathUtils.round(T / u1, 4) + '}{\\ln 0.5} \\approx ' + MathUtils.round(Math.log(T / u1) / Math.log(r), 4) + '\\)<br>' +
                    '\\(n > ' + MathUtils.round(Math.log(T / u1) / Math.log(r) + 1, 4) + '\\)<br>' +
                    'The smallest integer is \\(n = ' + n + '\\).'
            };
        }
    },

    // 8. Three terms in GP - find unknown
    qThreeTermsGP() {
        // Generate a, b, c in GP: b^2 = a * c
        // Approach: pick a and r, compute b = a*r, c = a*r^2
        // Then hide one of them
        const a = MathUtils.randInt(2, 12);
        const rChoices = [2, 3, 4, 5];
        const r = MathUtils.pick(rChoices);
        const b = a * r;
        const c = a * r * r;

        // Randomly decide which to hide
        const hideIdx = MathUtils.randInt(0, 2);
        let text, answer, answerTex, hintLine2;

        if (hideIdx === 0) {
            // Hide a, give b and c
            text = 'Three consecutive terms of a geometric sequence are \\(x\\), \\(' + b + '\\), \\(' + c + '\\). Find \\(x\\).';
            answer = a;
            answerTex = 'x = ' + a;
            hintLine2 = 'x = \\frac{b^2}{c} = \\frac{' + b + '^2}{' + c + '} = \\frac{' + (b * b) + '}{' + c + '} = ' + a;
        } else if (hideIdx === 1) {
            // Hide b, give a and c
            text = 'Three consecutive terms of a geometric sequence are \\(' + a + '\\), \\(x\\), \\(' + c + '\\). Find the positive value of \\(x\\).';
            answer = b;
            answerTex = 'x = ' + b;
            hintLine2 = 'x^2 = ' + a + ' \\times ' + c + ' = ' + (a * c) + ', \\text{ so } x = \\sqrt{' + (a * c) + '} = ' + b;
        } else {
            // Hide c, give a and b
            text = 'Three consecutive terms of a geometric sequence are \\(' + a + '\\), \\(' + b + '\\), \\(x\\). Find \\(x\\).';
            answer = c;
            answerTex = 'x = ' + c;
            hintLine2 = 'x = \\frac{b^2}{a} = \\frac{' + b + '^2}{' + a + '} = \\frac{' + (b * b) + '}{' + a + '} = ' + c;
        }

        return {
            type: 'free',
            rule: 'GP Condition',
            difficulty: 'medium',
            text: text,
            latex: 'x = \\,?',
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                'For three consecutive terms \\(a, b, c\\) in a GP: \\(b^2 = ac\\).',
                hintLine2
            ],
            explain: 'For three consecutive terms in a geometric sequence, \\(b^2 = ac\\).<br>\\(' + hintLine2 + '\\).'
        };
    },

    // 9. Word problem (MC)
    qWordProblem() {
        const contexts = [
            {
                setup(u1, r, n) {
                    const pctInc = Math.round((r - 1) * 100);
                    return 'A town has a population of ' + u1.toLocaleString() + '. The population grows by ' + pctInc + '% each year. Find the population after ' + n + ' years (to the nearest integer).';
                },
                label: 'population',
                u1Range: [5000, 50000],
                u1Step: 5000,
                rValues: [1.02, 1.05, 1.1],
                nRange: [5, 10]
            },
            {
                setup(u1, r, n) {
                    const pctDec = Math.round((1 - r) * 100);
                    return 'A car is worth $' + u1.toLocaleString() + ' when new. It depreciates by ' + pctDec + '% each year. Find its value after ' + n + ' years (to the nearest dollar).';
                },
                label: 'value',
                u1Range: [15000, 45000],
                u1Step: 5000,
                rValues: [0.8, 0.85, 0.9],
                nRange: [3, 8]
            },
            {
                setup(u1, r, n) {
                    const pctRate = MathUtils.round((r - 1) * 100, 1);
                    return 'An investment of $' + u1.toLocaleString() + ' earns ' + pctRate + '% compound interest per year. Find the value after ' + n + ' years (to the nearest dollar).';
                },
                label: 'value',
                u1Range: [1000, 20000],
                u1Step: 1000,
                rValues: [1.03, 1.05, 1.08],
                nRange: [5, 15]
            },
            {
                setup(u1, r, n) {
                    const pctDec = Math.round((1 - r) * 100);
                    return 'A radioactive substance has a mass of ' + u1 + ' grams. It decays by ' + pctDec + '% each hour. Find the mass after ' + n + ' hours (to the nearest gram).';
                },
                label: 'mass',
                u1Range: [100, 500],
                u1Step: 50,
                rValues: [0.75, 0.8, 0.9],
                nRange: [3, 8]
            }
        ];

        const ctx = MathUtils.pick(contexts);
        const u1Choices = [];
        for (let v = ctx.u1Range[0]; v <= ctx.u1Range[1]; v += ctx.u1Step) u1Choices.push(v);
        const u1 = MathUtils.pick(u1Choices);
        const r = MathUtils.pick(ctx.rValues);
        const n = MathUtils.randInt(ctx.nRange[0], ctx.nRange[1]);

        // u_n = u1 * r^n (value AFTER n periods, so this is the (n+1)th term, but contextually "after n years" = u1 * r^n)
        const result = Math.round(u1 * Math.pow(r, n));

        const opts = MathUtils.generateOptions(result, () => {
            return MathUtils.pick([
                Math.round(u1 * Math.pow(r, n - 1)),       // off by one period
                Math.round(u1 * Math.pow(r, n + 1)),       // off by one the other way
                Math.round(u1 * r * n),                     // linear instead of geometric
                Math.round(u1 + u1 * r * n),                // added instead of multiplied
                Math.round(result * 1.1),                    // ~10% off
                Math.round(result * 0.9),                    // ~10% off
                Math.round(u1 * Math.pow(r, n) + u1)        // added u1 extra
            ]);
        }, 4);
        const correctIdx = opts.indexOf(result);

        return {
            type: 'mc',
            rule: 'Word Problem',
            difficulty: 'hard',
            text: ctx.setup(u1, r, n),
            latex: '',
            answer: result,
            answerTex: ctx.label + ' = ' + result.toLocaleString(),
            options: opts.map(v => v.toLocaleString()),
            correctIdx: correctIdx,
            hintTex: [
                'This is a geometric sequence. The value after \\(n\\) periods is \\(u_1 \\cdot r^n\\).',
                u1 + ' \\times ' + r + '^{' + n + '} = ' + u1 + ' \\times ' + MathUtils.round(Math.pow(r, n), 6) + ' \\approx ' + result
            ],
            explain: 'This is a geometric sequence with \\(u_1 = ' + u1 + '\\) and \\(r = ' + r + '\\).<br>' +
                'After \\(' + n + '\\) periods: \\(' + u1 + ' \\times ' + r + '^{' + n + '} = ' + u1 + ' \\times ' + MathUtils.round(Math.pow(r, n), 6) + ' \\approx ' + result + '\\).'
        };
    },

    // 10. System: Given S_inf and another condition, find u1 and r
    qSystemSumInf() {
        // S_inf = u1 / (1 - r) and u1 + u2 = k, where u2 = u1 * r
        // So u1(1 + r) = k and u1 / (1-r) = S
        // From second: u1 = S(1-r)
        // Substitute: S(1-r)(1+r) = k => S(1-r^2) = k => r^2 = 1 - k/S => r = sqrt(1 - k/S)

        // Pick r first (simple fraction with |r| < 1)
        const rFracs = [
            { num: 1, den: 2 },
            { num: 1, den: 3 },
            { num: 2, den: 3 },
            { num: 1, den: 4 },
            { num: 3, den: 4 }
        ];
        const rFrac = MathUtils.pick(rFracs);
        const r = rFrac.num / rFrac.den;

        // Pick u1 such that S_inf = u1/(1-r) is a nice number
        // 1 - r = (den - num) / den
        // S_inf = u1 * den / (den - num)
        // For S_inf to be integer, u1 must be divisible by (den - num) / gcd(den, den-num)
        const oneMinusRNum = rFrac.den - rFrac.num;
        // S_inf = u1 * rFrac.den / oneMinusRNum
        // Pick u1 as a multiple of oneMinusRNum so S_inf is integer
        const u1Mult = MathUtils.randInt(2, 8);
        const u1 = u1Mult * oneMinusRNum;
        const Sinf = u1 * rFrac.den / oneMinusRNum;

        // k = u1(1 + r) = u1 * (den + num) / den
        const kNum = u1 * (rFrac.den + rFrac.num);
        const kDen = rFrac.den;
        const [kSimp, kDenSimp] = MathUtils.simplifyFraction(kNum, kDen);
        const k = kNum / kDen;

        let kTeX;
        if (kDenSimp === 1) {
            kTeX = String(kSimp);
        } else {
            kTeX = MathUtils.fractionTeX(kSimp, kDenSimp);
        }

        const rTeX = MathUtils.fractionTeX(rFrac.num, rFrac.den);

        // We ask for u1 (the simpler answer to enter)
        return {
            type: 'free',
            rule: 'System with Sum to Infinity',
            difficulty: 'hard',
            text: 'A geometric series has \\(S_\\infty = ' + Sinf + '\\) and \\(u_1 + u_2 = ' + kTeX + '\\). Find \\(u_1\\).',
            latex: 'u_1 = \\,?',
            answer: u1,
            answerTex: 'u_1 = ' + u1,
            options: [],
            hintTex: [
                'Use \\(S_\\infty = \\frac{u_1}{1-r}\\) and \\(u_2 = u_1 r\\), so \\(u_1 + u_1 r = ' + kTeX + '\\), i.e. \\(u_1(1+r) = ' + kTeX + '\\).',
                'From \\(S_\\infty\\): \\(u_1 = ' + Sinf + '(1-r)\\). Substitute into \\(u_1(1+r) = ' + kTeX + '\\): \\(' + Sinf + '(1-r)(1+r) = ' + kTeX + '\\) \\Rightarrow \\(' + Sinf + '(1-r^2) = ' + kTeX + '\\).'
            ],
            explain: 'Let \\(S_\\infty = \\frac{u_1}{1-r} = ' + Sinf + '\\), so \\(u_1 = ' + Sinf + '(1-r)\\).<br>' +
                'Also \\(u_1(1+r) = ' + kTeX + '\\).<br>' +
                'Substituting: \\(' + Sinf + '(1-r)(1+r) = ' + kTeX + '\\)<br>' +
                '\\(' + Sinf + '(1-r^2) = ' + kTeX + '\\)<br>' +
                '\\(1 - r^2 = \\frac{' + kTeX + '}{' + Sinf + '} = ' + MathUtils.round(k / Sinf, 6) + '\\)<br>' +
                '\\(r^2 = ' + MathUtils.round(1 - k / Sinf, 6) + '\\), so \\(r = ' + rTeX + '\\).<br>' +
                '\\(u_1 = ' + Sinf + '\\left(1 - ' + rTeX + '\\right) = ' + Sinf + ' \\times ' + MathUtils.fractionTeX(oneMinusRNum, rFrac.den) + ' = ' + u1 + '\\).'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & QUESTION PICKING
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    initPools() {
        this.pools = {
            easy: [
                { fn: () => GEO_SEQ.qFindR(), weight: 2 },
                { fn: () => GEO_SEQ.qFindNthTerm(), weight: 2 },
                { fn: () => GEO_SEQ.qConvergence(), weight: 1 }
            ],
            medium: [
                { fn: () => GEO_SEQ.qFindSum(), weight: 2 },
                { fn: () => GEO_SEQ.qSumToInfinity(), weight: 2 },
                { fn: () => GEO_SEQ.qFindRFromTwoTerms(), weight: 2 },
                { fn: () => GEO_SEQ.qThreeTermsGP(), weight: 2 }
            ],
            hard: [
                { fn: () => GEO_SEQ.qFindNForThreshold(), weight: 2 },
                { fn: () => GEO_SEQ.qWordProblem(), weight: 2 },
                { fn: () => GEO_SEQ.qSystemSumInf(), weight: 2 }
            ]
        };
        this.allPool = [
            ...this.pools.easy,
            ...this.pools.medium,
            ...this.pools.hard
        ];
    },

    pickQuestion() {
        const pool = this.level === 'all' ? this.allPool : this.pools[this.level];
        const totalWeight = pool.reduce((s, p) => s + p.weight, 0);
        let roll = Math.random() * totalWeight;
        for (const item of pool) {
            roll -= item.weight;
            if (roll <= 0) return item.fn();
        }
        return pool[pool.length - 1].fn();
    },

    /* ═══════════════════════════════════════════════
       UI: load()
       ═══════════════════════════════════════════════ */

    load() {
        GEO_SEQ.score = 0;
        GEO_SEQ.total = 0;
        GEO_SEQ.streak = 0;
        GEO_SEQ.answered = false;
        GEO_SEQ.hintIndex = 0;
        GEO_SEQ.initPools();

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="GEO_SEQ.unload()">Geometric Sequences (1.4)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Geometric Sequences</h1>
                <p>IB Math AA 1.4 - Common ratio, nth term, series, sum to infinity, convergence</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="GEO_SEQ.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="GEO_SEQ.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="GEO_SEQ.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="GEO_SEQ.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="geo-seq-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="geo-seq-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="geo-seq-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="geo-seq-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="geo-seq-question-card">
                <span class="rule-tag" id="geo-seq-rule"></span>
                <span class="difficulty-tag" id="geo-seq-difficulty"></span>
                <div class="question-text" id="geo-seq-text"></div>
                <div class="question-prompt" id="geo-seq-latex"></div>
                <div id="geo-seq-options-area"></div>
            </div>

            <!-- Hint box -->
            <div class="hint-box" id="geo-seq-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="geo-seq-feedback">
                <div class="feedback-title" id="geo-seq-feedback-title"></div>
                <div class="feedback-explanation" id="geo-seq-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="geo-seq-hint-btn" onclick="GEO_SEQ.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="geo-seq-next-btn" onclick="GEO_SEQ.next()" style="display:none;">Next Question</button>
            </div>
        `;

        GEO_SEQ.next();
    },

    /* ═══════════════════════════════════════════════
       UI: unload()
       ═══════════════════════════════════════════════ */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    },

    /* ═══════════════════════════════════════════════
       UI: setLevel()
       ═══════════════════════════════════════════════ */

    setLevel(lvl) {
        GEO_SEQ.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        GEO_SEQ.score = 0;
        GEO_SEQ.total = 0;
        GEO_SEQ.streak = 0;
        GEO_SEQ.updateStats();
        GEO_SEQ.next();
    },

    /* ═══════════════════════════════════════════════
       UI: next()
       ═══════════════════════════════════════════════ */

    next() {
        GEO_SEQ.answered = false;
        GEO_SEQ.hintIndex = 0;
        GEO_SEQ.currentQ = GEO_SEQ.pickQuestion();
        const q = GEO_SEQ.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('geo-seq-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('geo-seq-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('geo-seq-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('geo-seq-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('geo-seq-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += '<button class="option-btn" data-i="' + i + '" onclick="GEO_SEQ.checkMC(this)">' + opt + '</button>';
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="geo-seq-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')GEO_SEQ.checkFree()">
                    <button class="btn btn-primary" onclick="GEO_SEQ.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('geo-seq-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('geo-seq-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('geo-seq-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('geo-seq-next-btn').style.display = 'none';
        document.getElementById('geo-seq-hint-btn').style.display = '';
        document.getElementById('geo-seq-hint-btn').disabled = false;

        // Render KaTeX
        GEO_SEQ.renderAllKaTeX();
    },

    /* ═══════════════════════════════════════════════
       UI: checkMC()
       ═══════════════════════════════════════════════ */

    checkMC(btn) {
        if (GEO_SEQ.answered) return;
        GEO_SEQ.answered = true;
        GEO_SEQ.total++;

        const q = GEO_SEQ.currentQ;
        const clickedIdx = parseInt(btn.getAttribute('data-i'));
        const isCorrect = clickedIdx === q.correctIdx;

        // Disable all buttons and highlight
        document.querySelectorAll('#geo-seq-options-area .option-btn').forEach((b, j) => {
            b.disabled = true;
            if (j === q.correctIdx) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            GEO_SEQ.score++;
            GEO_SEQ.streak++;
        } else {
            btn.classList.add('incorrect');
            GEO_SEQ.streak = 0;
        }

        GEO_SEQ.showFeedback(isCorrect);
        GEO_SEQ.updateStats();
    },

    /* ═══════════════════════════════════════════════
       UI: checkFree()
       ═══════════════════════════════════════════════ */

    checkFree() {
        if (GEO_SEQ.answered) return;

        const inp = document.getElementById('geo-seq-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        GEO_SEQ.answered = true;
        GEO_SEQ.total++;
        inp.disabled = true;

        const q = GEO_SEQ.currentQ;
        const tol = q.tolerance || 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            GEO_SEQ.score++;
            GEO_SEQ.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            GEO_SEQ.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        GEO_SEQ.showFeedback(isCorrect);
        GEO_SEQ.updateStats();
    },

    /* ═══════════════════════════════════════════════
       UI: showHint()
       ═══════════════════════════════════════════════ */

    showHint() {
        const q = GEO_SEQ.currentQ;
        if (!q || !q.hintTex || GEO_SEQ.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('geo-seq-hint-box');
        const hintContent = GEO_SEQ.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + '<span>\\(' + q.hintTex[GEO_SEQ.hintIndex] + '\\)</span>';
        hintBox.classList.add('show');
        GEO_SEQ.hintIndex++;

        if (GEO_SEQ.hintIndex >= q.hintTex.length) {
            document.getElementById('geo-seq-hint-btn').disabled = true;
        }

        GEO_SEQ.renderAllKaTeX();
    },

    /* ═══════════════════════════════════════════════
       UI: showFeedback()
       ═══════════════════════════════════════════════ */

    showFeedback(isCorrect) {
        const q = GEO_SEQ.currentQ;
        const fb = document.getElementById('geo-seq-feedback');
        const title = document.getElementById('geo-seq-feedback-title');
        const explanation = document.getElementById('geo-seq-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (GEO_SEQ.streak > 1) {
                title.textContent = 'Correct! (' + GEO_SEQ.streak + ' streak)';
            }
        } else {
            title.innerHTML = 'Incorrect. The answer is \\(' + q.answerTex + '\\).';
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('geo-seq-next-btn').style.display = '';
        document.getElementById('geo-seq-hint-btn').style.display = 'none';

        GEO_SEQ.renderAllKaTeX();
    },

    /* ═══════════════════════════════════════════════
       UI: updateStats()
       ═══════════════════════════════════════════════ */

    updateStats() {
        const scoreEl = document.getElementById('geo-seq-score');
        const totalEl = document.getElementById('geo-seq-total');
        const streakEl = document.getElementById('geo-seq-streak');
        const accEl = document.getElementById('geo-seq-accuracy');

        if (scoreEl) scoreEl.textContent = GEO_SEQ.score;
        if (totalEl) totalEl.textContent = GEO_SEQ.total;
        if (streakEl) streakEl.textContent = GEO_SEQ.streak;
        if (accEl) {
            accEl.textContent = GEO_SEQ.total > 0
                ? Math.round((GEO_SEQ.score / GEO_SEQ.total) * 100) + '%'
                : '-';
        }
    },

    /* ═══════════════════════════════════════════════
       UI: renderAllKaTeX()
       ═══════════════════════════════════════════════ */

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
    ACTIVITY_INITS['geometric-sequences'] = () => GEO_SEQ.load();
}
