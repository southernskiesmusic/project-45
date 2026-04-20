/*
 * chain-rule.js - IB Math AA 5.3: Chain Rule
 * Differentiating composite functions: d/dx[f(g(x))] = f'(g(x)) · g'(x)
 */

const CHAIN_RULE = {
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
     * 1. qChainPower - Easy (Free)
     * d/dx[(ax+b)^n] = n·a·(ax+b)^(n-1). Evaluate at x=0: n·a·b^(n-1).
     */
    qChainPower() {
        const a = MathUtils.randInt(1, 4);
        const b = MathUtils.randInt(1, 4);   // b≠0 guaranteed by range
        const n = MathUtils.randInt(2, 5);

        // Evaluated at x=0: n * a * b^(n-1)
        const answer = n * a * Math.pow(b, n - 1);
        const answerRounded = Math.round(answer * 100) / 100;

        // Build inner expression string
        const innerTex = a === 1 ? `x + ${b}` : `${a}x + ${b}`;
        const exprTex = `(${innerTex})^{${n}}`;

        // Derivative expression
        const coeff = n * a;
        const nMinus1 = n - 1;
        const derivTex = nMinus1 === 1
            ? `${coeff}(${innerTex})`
            : `${coeff}(${innerTex})^{${nMinus1}}`;

        return {
            type: 'free',
            rule: 'Chain Rule – Power',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = ${exprTex}\\) using the chain rule, then evaluate \\(f'(0)\\).`,
            latex: `\\text{Give your answer to 2 d.p.}`,
            answer: answerRounded,
            answerTex: String(answerRounded),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\frac{d}{dx}[(ax+b)^n] = n \\cdot a \\cdot (ax+b)^{n-1}`,
                `f'(x) = ${derivTex}, \\quad f'(0) = ${coeff} \\cdot ${b}^{${nMinus1}} = ${answerRounded}`
            ],
            explain: `<strong>Step 1:</strong> Identify the outer function \\(f(u) = u^{${n}}\\) and inner function \\(g(x) = ${innerTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule: \\(f'(x) = n \\cdot a \\cdot (ax+b)^{n-1} = ${derivTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 0\\):<br>` +
                     `\\(f'(0) = ${coeff} \\cdot (${b})^{${nMinus1}} = ${coeff} \\times ${Math.pow(b, nMinus1)} = ${answerRounded}\\).`
        };
    },

    /**
     * 2. qChainExp - Easy (Free)
     * d/dx[e^(kx)] = k·e^(kx). Evaluate at x=1: k·e^k. Answer to 2dp.
     */
    qChainExp() {
        const k = MathUtils.randInt(2, 5);

        const rawAnswer = k * Math.exp(k);
        const answer = Math.round(rawAnswer * 100) / 100;

        return {
            type: 'free',
            rule: 'Chain Rule – Exponential',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = e^{${k}x}\\) using the chain rule, then evaluate \\(f'(1)\\).`,
            latex: `\\text{Give your answer to 2 d.p.}`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.1,
            options: [],
            hintTex: [
                `\\frac{d}{dx}[e^{kx}] = k \\cdot e^{kx}`,
                `f'(x) = ${k}e^{${k}x}, \\quad f'(1) = ${k}e^{${k}} \\approx ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Outer function \\(f(u) = e^u\\), inner function \\(g(x) = ${k}x\\), so \\(g'(x) = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Chain rule gives \\(f'(x) = ${k}e^{${k}x}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 1\\):<br>` +
                     `\\(f'(1) = ${k} \\cdot e^{${k}} \\approx ${answer}\\).`
        };
    },

    /**
     * 3. qChainLn - Easy (Free)
     * d/dx[ln(ax+b)] = a/(ax+b). Evaluate at a chosen x. Answer to 4dp.
     */
    qChainLn() {
        const a = MathUtils.randInt(1, 4);
        const b = MathUtils.randInt(1, 4);
        // Choose x so argument is a small positive integer: ax+b ∈ {2,3,4,6}
        const xVals = [1, 2, 3];
        const x = MathUtils.pick(xVals);

        const arg = a * x + b;
        const rawAnswer = a / arg;
        const answer = Math.round(rawAnswer * 10000) / 10000;

        const innerTex = a === 1 ? `x + ${b}` : `${a}x + ${b}`;

        return {
            type: 'free',
            rule: 'Chain Rule – Logarithm',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = \\ln(${innerTex})\\) using the chain rule, then evaluate \\(f'(${x})\\).`,
            latex: `\\text{Give your answer to 4 d.p.}`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.0005,
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\ln(ax+b)] = \\frac{a}{ax+b}`,
                `f'(x) = \\frac{${a}}{${innerTex}}, \\quad f'(${x}) = \\frac{${a}}{${arg}} \\approx ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Outer function \\(f(u) = \\ln(u)\\), inner function \\(g(x) = ${innerTex}\\), so \\(g'(x) = ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Chain rule gives \\(f'(x) = \\dfrac{${a}}{${innerTex}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = ${x}\\):<br>` +
                     `\\(f'(${x}) = \\dfrac{${a}}{${arg}} \\approx ${answer}\\).`
        };
    },

    /**
     * 4. qChainSin - Easy (Free)
     * d/dx[sin(kx)] = k·cos(kx). Evaluate at x=0: answer = k.
     */
    qChainSin() {
        const k = MathUtils.randInt(2, 4);

        return {
            type: 'free',
            rule: 'Chain Rule – Sine',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = \\sin(${k}x)\\) using the chain rule, then evaluate \\(f'(0)\\).`,
            latex: `\\text{Enter an exact integer.}`,
            answer: k,
            answerTex: String(k),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\sin(kx)] = k\\cos(kx)`,
                `f'(x) = ${k}\\cos(${k}x), \\quad f'(0) = ${k}\\cos(0) = ${k} \\times 1 = ${k}`
            ],
            explain: `<strong>Step 1:</strong> Outer function \\(f(u) = \\sin(u)\\), inner function \\(g(x) = ${k}x\\), so \\(g'(x) = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Chain rule gives \\(f'(x) = ${k}\\cos(${k}x)\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 0\\):<br>` +
                     `\\(f'(0) = ${k}\\cos(0) = ${k} \\times 1 = ${k}\\).`
        };
    },

    /**
     * 5. qChainCos - Easy (Free)
     * d/dx[cos(kx)] = -k·sin(kx). Evaluate at x=π/6, π/4, or π/3. Answer to 4dp, tol 0.01.
     */
    qChainCos() {
        const k = MathUtils.pick([1, 2]);
        const xOptions = [
            { label: '\\tfrac{\\pi}{6}', val: Math.PI / 6 },
            { label: '\\tfrac{\\pi}{4}', val: Math.PI / 4 },
            { label: '\\tfrac{\\pi}{3}', val: Math.PI / 3 }
        ];
        const xChoice = MathUtils.pick(xOptions);

        const rawAnswer = -k * Math.sin(k * xChoice.val);
        const answer = Math.round(rawAnswer * 10000) / 10000;

        const innerTex = k === 1 ? 'x' : `${k}x`;

        return {
            type: 'free',
            rule: 'Chain Rule – Cosine',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = \\cos(${innerTex})\\) using the chain rule, then evaluate \\(f'\\!\\left(${xChoice.label}\\right)\\).`,
            latex: `\\text{Give your answer to 4 d.p.}`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\cos(kx)] = -k\\sin(kx)`,
                `f'(x) = -${k}\\sin(${innerTex}), \\quad f'\\!\\left(${xChoice.label}\\right) \\approx ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Outer function \\(f(u) = \\cos(u)\\), inner function \\(g(x) = ${innerTex}\\), so \\(g'(x) = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Chain rule gives \\(f'(x) = -${k}\\sin(${innerTex})\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = ${xChoice.label}\\):<br>` +
                     `\\(f'\\!\\left(${xChoice.label}\\right) = -${k}\\sin\\!\\left(${k === 1 ? '' : k}${xChoice.label}\\right) \\approx ${answer}\\).`
        };
    },

    /**
     * 6. qChainEvaluate - Medium (Free)
     * d/dx[(ax+b)^n] evaluated at x=c. Full computation: n·a·(ac+b)^(n-1). Answer integer or 1dp.
     */
    qChainEvaluate() {
        // Keep answer ≤ 50: use n=2, a∈{1,2}, b∈{1,2,3}, c∈{0,1,2}
        let a, b, n, c, answer;
        let attempts = 0;
        do {
            a = MathUtils.randInt(1, 2);
            b = MathUtils.randInt(1, 3);
            n = MathUtils.randInt(2, 4);
            c = MathUtils.randInt(0, 2);
            const inner = a * c + b;
            answer = n * a * Math.pow(inner, n - 1);
            attempts++;
        } while (Math.abs(answer) > 50 && attempts < 50);

        const answerRounded = Math.round(answer * 10) / 10;
        const innerTex = a === 1 ? `x + ${b}` : `${a}x + ${b}`;
        const nMinus1 = n - 1;
        const coeff = n * a;
        const evalInner = a * c + b;
        const derivTex = nMinus1 === 1
            ? `${coeff}(${innerTex})`
            : `${coeff}(${innerTex})^{${nMinus1}}`;

        return {
            type: 'free',
            rule: 'Chain Rule – Evaluate',
            difficulty: 'medium',
            text: `Differentiate \\(f(x) = (${innerTex})^{${n}}\\) using the chain rule, then evaluate \\(f'(${c})\\).`,
            latex: `\\text{Give an exact value (integer or 1 d.p.).}`,
            answer: answerRounded,
            answerTex: String(answerRounded),
            tolerance: 0.05,
            options: [],
            hintTex: [
                `f'(x) = n \\cdot a \\cdot (ax+b)^{n-1} = ${derivTex}`,
                `f'(${c}) = ${coeff} \\cdot (${evalInner})^{${nMinus1}} = ${answerRounded}`
            ],
            explain: `<strong>Step 1:</strong> Let \\(g(x) = ${innerTex}\\), so \\(g'(x) = ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Chain rule: \\(f'(x) = ${n} \\cdot ${a} \\cdot (${innerTex})^{${nMinus1}} = ${derivTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = ${c}\\):<br>` +
                     `\\(f'(${c}) = ${coeff} \\cdot (${evalInner})^{${nMinus1}} = ${coeff} \\times ${Math.pow(evalInner, nMinus1)} = ${answerRounded}\\).`
        };
    },

    /**
     * 7. qChainCompositeExpr - Medium (MC)
     * What is the derivative of f(g(x))? 4 options as expressions.
     */
    qChainCompositeExpr() {
        // Pool of composite function scenarios
        const scenarios = [
            {
                expr: '\\sin(x^2)',
                correct: '2x\\cos(x^2)',
                wrong: ['\\cos(x^2)', '2x\\cos(x)', '-2x\\cos(x^2)'],
                explain: `Let \\(g(x) = x^2\\), \\(g'(x) = 2x\\). Outer: \\(\\sin\\), derivative \\(\\cos\\).<br>Chain rule: \\(\\frac{d}{dx}[\\sin(x^2)] = \\cos(x^2) \\cdot 2x = 2x\\cos(x^2)\\).`
            },
            {
                expr: 'e^{x^2}',
                correct: '2x e^{x^2}',
                wrong: ['e^{x^2}', '2xe^{x}', 'x^2 e^{x^2}'],
                explain: `Let \\(g(x) = x^2\\), \\(g'(x) = 2x\\). Outer: \\(e^u\\), derivative \\(e^u\\).<br>Chain rule: \\(\\frac{d}{dx}[e^{x^2}] = e^{x^2} \\cdot 2x = 2xe^{x^2}\\).`
            },
            {
                expr: '\\ln(x^3)',
                correct: '\\dfrac{3}{x}',
                wrong: ['\\dfrac{1}{x^3}', '3\\ln(x)', '\\dfrac{3x^2}{x^3}'],
                explain: `Let \\(g(x) = x^3\\), \\(g'(x) = 3x^2\\). Outer: \\(\\ln\\), derivative \\(\\frac{1}{u}\\).<br>Chain rule: \\(\\frac{d}{dx}[\\ln(x^3)] = \\frac{1}{x^3} \\cdot 3x^2 = \\frac{3}{x}\\).`
            },
            {
                expr: '\\cos(3x^2)',
                correct: '-6x\\sin(3x^2)',
                wrong: ['-\\sin(3x^2)', '6x\\sin(3x^2)', '-6x\\sin(3x)'],
                explain: `Let \\(g(x) = 3x^2\\), \\(g'(x) = 6x\\). Outer: \\(\\cos\\), derivative \\(-\\sin\\).<br>Chain rule: \\(\\frac{d}{dx}[\\cos(3x^2)] = -\\sin(3x^2) \\cdot 6x = -6x\\sin(3x^2)\\).`
            },
            {
                expr: '(x^2 + 1)^4',
                correct: '8x(x^2+1)^3',
                wrong: ['4(x^2+1)^3', '8x(x^2+1)^4', '4x(x^2+1)^3'],
                explain: `Let \\(g(x) = x^2+1\\), \\(g'(x) = 2x\\). Outer: \\(u^4\\), derivative \\(4u^3\\).<br>Chain rule: \\(\\frac{d}{dx}[(x^2+1)^4] = 4(x^2+1)^3 \\cdot 2x = 8x(x^2+1)^3\\).`
            },
            {
                expr: '\\tan(x^2)',
                correct: '2x\\sec^2(x^2)',
                wrong: ['\\sec^2(x^2)', '2x\\sec^2(x)', '-2x\\sec^2(x^2)'],
                explain: `Let \\(g(x) = x^2\\), \\(g'(x) = 2x\\). Outer: \\(\\tan\\), derivative \\(\\sec^2\\).<br>Chain rule: \\(\\frac{d}{dx}[\\tan(x^2)] = \\sec^2(x^2) \\cdot 2x = 2x\\sec^2(x^2)\\).`
            }
        ];

        const s = MathUtils.pick(scenarios);
        const correctTex = s.correct;

        // Build options: correct + 3 wrong (shuffle wrongs for variety)
        const wrongChoices = MathUtils.shuffle([...s.wrong]).slice(0, 3);
        const optionTexts = [correctTex, ...wrongChoices];

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Chain Rule – Composite',
            difficulty: 'medium',
            text: `Using the chain rule, find the derivative of the expression below.`,
            latex: `\\(f(x) = ${s.expr}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Identify outer } f \\text{ and inner } g, \\text{ then apply: } \\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)`,
                `\\text{Correct derivative: } ${correctTex}`
            ],
            explain: `<strong>Chain Rule:</strong> \\(\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)\\).<br><br>` +
                     s.explain + `<br><br><strong>Answer:</strong> \\(${correctTex}\\).`
        };
    },

    /**
     * 8. qChainTan - Medium (Free)
     * d/dx[tan(kx)] = k·sec²(kx). At x=0: sec²(0)=1, answer = k.
     */
    qChainTan() {
        const k = MathUtils.randInt(2, 4);

        return {
            type: 'free',
            rule: 'Chain Rule – Tangent',
            difficulty: 'medium',
            text: `Differentiate \\(f(x) = \\tan(${k}x)\\) using the chain rule, then evaluate \\(f'(0)\\).`,
            latex: `\\text{Enter an exact integer.}`,
            answer: k,
            answerTex: String(k),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\tan(kx)] = k\\sec^2(kx) = \\frac{k}{\\cos^2(kx)}`,
                `f'(0) = ${k}\\sec^2(0) = ${k} \\times 1 = ${k}`
            ],
            explain: `<strong>Step 1:</strong> Outer function \\(f(u) = \\tan(u)\\), inner function \\(g(x) = ${k}x\\), so \\(g'(x) = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Chain rule gives \\(f'(x) = ${k}\\sec^2(${k}x)\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 0\\):<br>` +
                     `\\(f'(0) = ${k}\\sec^2(0) = ${k} \\times 1 = ${k}\\).`
        };
    },

    /**
     * 9. qChainPowerEval - Medium (Free)
     * d/dx[(ax²+bx+c)^n], g'=2ax+b. Evaluate at x=1: n·(a+b+c)^(n-1)·(2a+b). Answer integer.
     */
    qChainPowerEval() {
        // Use n=2, small a,b,c so |answer| ≤ 50
        let a, b, c, answer;
        let attempts = 0;
        do {
            a = MathUtils.randInt(1, 2);
            b = MathUtils.randInt(0, 2);
            c = MathUtils.randInt(1, 3);
            const inner1 = a + b + c;      // g(1)
            const gPrime1 = 2 * a + b;     // g'(1)
            answer = 2 * Math.pow(inner1, 1) * gPrime1;  // n=2, n-1=1
            attempts++;
        } while (Math.abs(answer) > 50 && attempts < 50);

        const inner1 = a + b + c;
        const gPrime1 = 2 * a + b;

        // Build expression tex
        let quadTex = '';
        if (a === 1) quadTex += 'x^2';
        else quadTex += `${a}x^2`;
        if (b > 0) quadTex += ` + ${b}x`;
        else if (b < 0) quadTex += ` - ${Math.abs(b)}x`;
        if (c > 0) quadTex += ` + ${c}`;
        else if (c < 0) quadTex += ` - ${Math.abs(c)}`;

        // Derivative expression
        const dInnerTex = (2 * a === 1 ? '' : String(2 * a)) + 'x' + (b > 0 ? ` + ${b}` : b < 0 ? ` - ${Math.abs(b)}` : '');
        const derivTex = `2(${quadTex})(${dInnerTex})`;

        return {
            type: 'free',
            rule: 'Chain Rule – Quadratic Power',
            difficulty: 'medium',
            text: `Differentiate \\(f(x) = (${quadTex})^2\\) using the chain rule, then evaluate \\(f'(1)\\).`,
            latex: `\\text{Enter an exact integer.}`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.05,
            options: [],
            hintTex: [
                `\\text{Let } g(x) = ${quadTex}, \\text{ so } g'(x) = ${dInnerTex}`,
                `f'(x) = ${derivTex}, \\quad f'(1) = 2(${inner1})(${gPrime1}) = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Let \\(g(x) = ${quadTex}\\), then \\(g'(x) = ${dInnerTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Chain rule with outer \\(u^2\\): \\(f'(x) = 2(${quadTex}) \\cdot g'(x) = ${derivTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 1\\):<br>` +
                     `\\(g(1) = ${inner1},\\quad g'(1) = ${gPrime1}\\)<br>` +
                     `\\(f'(1) = 2 \\times ${inner1} \\times ${gPrime1} = ${answer}\\).`
        };
    },

    /**
     * 10. qChainWithNegative - Hard (Free)
     * d/dx[1/(ax+b)] = d/dx[(ax+b)^(-1)] = -a/(ax+b)². Evaluate at x=0: -a/b². Answer to 4dp, tol 0.001.
     */
    qChainWithNegative() {
        const a = MathUtils.randInt(1, 4);
        const b = MathUtils.randInt(1, 4);   // b≠0 guaranteed

        const rawAnswer = -a / (b * b);
        const answer = Math.round(rawAnswer * 10000) / 10000;

        const innerTex = a === 1 ? `x + ${b}` : `${a}x + ${b}`;
        const bSq = b * b;

        return {
            type: 'free',
            rule: 'Chain Rule – Negative Power',
            difficulty: 'hard',
            text: `Differentiate \\(f(x) = \\dfrac{1}{${innerTex}}\\) by rewriting as a negative power and applying the chain rule. Evaluate \\(f'(0)\\).`,
            latex: `\\text{Give your answer to 4 d.p.}`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.001,
            options: [],
            hintTex: [
                `\\frac{1}{ax+b} = (ax+b)^{-1} \\implies \\frac{d}{dx} = -a(ax+b)^{-2} = \\frac{-a}{(ax+b)^2}`,
                `f'(0) = \\frac{-${a}}{${b}^2} = \\frac{-${a}}{${bSq}} \\approx ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Rewrite: \\(f(x) = (${innerTex})^{-1}\\).<br><br>` +
                     `<strong>Step 2:</strong> Let \\(g(x) = ${innerTex}\\), \\(g'(x) = ${a}\\). Outer: \\(u^{-1}\\), derivative \\(-u^{-2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Chain rule: \\(f'(x) = -1 \\cdot (${innerTex})^{-2} \\cdot ${a} = \\dfrac{-${a}}{(${innerTex})^2}\\).<br><br>` +
                     `<strong>Step 4:</strong> Evaluate at \\(x = 0\\):<br>` +
                     `\\(f'(0) = \\dfrac{-${a}}{${b}^2} = \\dfrac{-${a}}{${bSq}} \\approx ${answer}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => CHAIN_RULE.qChainPower(),         weight: 3, difficulty: 'easy'   },
            { fn: () => CHAIN_RULE.qChainExp(),            weight: 3, difficulty: 'easy'   },
            { fn: () => CHAIN_RULE.qChainLn(),             weight: 3, difficulty: 'easy'   },
            { fn: () => CHAIN_RULE.qChainSin(),            weight: 3, difficulty: 'easy'   },
            { fn: () => CHAIN_RULE.qChainCos(),            weight: 3, difficulty: 'easy'   },
            { fn: () => CHAIN_RULE.qChainEvaluate(),       weight: 2, difficulty: 'medium' },
            { fn: () => CHAIN_RULE.qChainCompositeExpr(),  weight: 2, difficulty: 'medium' },
            { fn: () => CHAIN_RULE.qChainTan(),            weight: 2, difficulty: 'medium' },
            { fn: () => CHAIN_RULE.qChainPowerEval(),      weight: 2, difficulty: 'medium' },
            { fn: () => CHAIN_RULE.qChainWithNegative(),   weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (CHAIN_RULE.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (CHAIN_RULE.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (CHAIN_RULE.level === 'hard') {
            filtered = pool.filter(p => p.difficulty === 'hard');
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
        CHAIN_RULE.score = 0;
        CHAIN_RULE.total = 0;
        CHAIN_RULE.streak = 0;
        CHAIN_RULE.answered = false;
        CHAIN_RULE.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="CHAIN_RULE.unload()">Chain Rule (5.3)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Chain Rule</h1>
                <p>IB Math AA 5.3 – Differentiating composite functions</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CHAIN_RULE.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CHAIN_RULE.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CHAIN_RULE.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CHAIN_RULE.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="chain-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="chain-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="chain-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="chain-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="chain-question-card">
                <span class="rule-tag" id="chain-rule-tag"></span>
                <span class="difficulty-tag" id="chain-difficulty"></span>
                <div class="question-text" id="chain-text"></div>
                <div class="question-prompt" id="chain-latex"></div>
                <div id="chain-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="chain-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="chain-feedback">
                <div class="feedback-title" id="chain-feedback-title"></div>
                <div class="feedback-explanation" id="chain-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="chain-hint-btn" onclick="CHAIN_RULE.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="chain-next-btn" onclick="CHAIN_RULE.next()" style="display:none;">Next Question</button>
            </div>
        `;

        CHAIN_RULE.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('calculus');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        CHAIN_RULE.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        CHAIN_RULE.score = 0;
        CHAIN_RULE.total = 0;
        CHAIN_RULE.streak = 0;
        CHAIN_RULE.updateStats();
        CHAIN_RULE.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        CHAIN_RULE.answered = false;
        CHAIN_RULE.hintIndex = 0;
        CHAIN_RULE.currentQ = CHAIN_RULE.pickQuestion();
        const q = CHAIN_RULE.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('chain-rule-tag');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('chain-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('chain-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('chain-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('chain-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="CHAIN_RULE.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="chain-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')CHAIN_RULE.checkFree()">
                    <button class="btn btn-primary" onclick="CHAIN_RULE.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('chain-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('chain-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('chain-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('chain-next-btn').style.display = 'none';
        document.getElementById('chain-hint-btn').style.display = '';
        document.getElementById('chain-hint-btn').disabled = false;

        // Render KaTeX
        CHAIN_RULE.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = CHAIN_RULE.currentQ;
        if (!q || !q.hintTex || CHAIN_RULE.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('chain-hint-box');
        const hintContent = CHAIN_RULE.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[CHAIN_RULE.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        CHAIN_RULE.hintIndex++;

        if (CHAIN_RULE.hintIndex >= q.hintTex.length) {
            document.getElementById('chain-hint-btn').disabled = true;
        }

        CHAIN_RULE.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (CHAIN_RULE.answered) return;
        CHAIN_RULE.answered = true;
        CHAIN_RULE.total++;

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
            CHAIN_RULE.score++;
            CHAIN_RULE.streak++;
        } else {
            btn.classList.add('incorrect');
            CHAIN_RULE.streak = 0;
        }

        CHAIN_RULE.showFeedback(isCorrect);
        CHAIN_RULE.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (CHAIN_RULE.answered) return;

        const inp = document.getElementById('chain-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        CHAIN_RULE.answered = true;
        CHAIN_RULE.total++;
        inp.disabled = true;

        const q = CHAIN_RULE.currentQ;
        const tol = q.tolerance !== undefined ? q.tolerance : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            CHAIN_RULE.score++;
            CHAIN_RULE.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            CHAIN_RULE.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        CHAIN_RULE.showFeedback(isCorrect);
        CHAIN_RULE.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = CHAIN_RULE.currentQ;
        const fb = document.getElementById('chain-feedback');
        const title = document.getElementById('chain-feedback-title');
        const explanation = document.getElementById('chain-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (CHAIN_RULE.streak > 1) {
                title.textContent = `Correct! (${CHAIN_RULE.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('chain-next-btn').style.display = '';
        document.getElementById('chain-hint-btn').style.display = 'none';

        CHAIN_RULE.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('chain-score');
        const totalEl = document.getElementById('chain-total');
        const streakEl = document.getElementById('chain-streak');
        const accEl = document.getElementById('chain-accuracy');

        if (scoreEl) scoreEl.textContent = CHAIN_RULE.score;
        if (totalEl) totalEl.textContent = CHAIN_RULE.total;
        if (streakEl) streakEl.textContent = CHAIN_RULE.streak;
        if (accEl) {
            accEl.textContent = CHAIN_RULE.total > 0
                ? Math.round((CHAIN_RULE.score / CHAIN_RULE.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['chain-rule'] = () => CHAIN_RULE.load();
