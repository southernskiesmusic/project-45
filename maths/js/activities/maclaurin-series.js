/*
 * maclaurin-series.js - IB Math AA 5.23: Maclaurin Series
 * Standard series, coefficients, approximations, substitution, convergence
 */

const MACLAURIN = {
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
     * 1. qCoefficientEx - Easy (Free response)
     * e^x = Σ xⁿ/n!  →  coefficient of xⁿ is 1/n!
     * Use n ∈ {2, 3, 4, 5}
     */
    qCoefficientEx() {
        const nChoices = [2, 3, 4, 5];
        const n = MathUtils.pick(nChoices);

        // n! values
        const factorials = { 2: 2, 3: 6, 4: 24, 5: 120 };
        const nFact = factorials[n];
        const answer = 1 / nFact;
        const answerStr = answer.toFixed(6);

        return {
            type: 'free',
            rule: 'e^x Coefficient',
            difficulty: 'easy',
            text: `The Maclaurin series for \\(e^x\\) is \\(\\displaystyle e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}\\). Find the coefficient of \\(x^{${n}}\\) in this series. Give your answer to 6 decimal places.`,
            latex: `\\(e^x = 1 + x + \\tfrac{x^2}{2!} + \\tfrac{x^3}{3!} + \\cdots\\)`,
            answer: answer,
            answerTex: `\\dfrac{1}{${n}!} = \\dfrac{1}{${nFact}} \\approx ${answerStr}`,
            options: [],
            hintTex: [
                `\\text{The coefficient of } x^n \\text{ in } e^x \\text{ is } \\dfrac{1}{n!}`,
                `\\text{For } n = ${n}: \\quad \\dfrac{1}{${n}!} = \\dfrac{1}{${nFact}} \\approx ${answerStr}`
            ],
            explain: `<strong>Step 1:</strong> The Maclaurin series for \\(e^x\\) is \\(e^x = \\displaystyle\\sum_{n=0}^{\\infty} \\dfrac{x^n}{n!}\\).<br><br>` +
                     `<strong>Step 2:</strong> The coefficient of \\(x^n\\) is \\(\\dfrac{1}{n!}\\).<br><br>` +
                     `<strong>Step 3:</strong> For \\(n = ${n}\\): coefficient \\(= \\dfrac{1}{${n}!} = \\dfrac{1}{${nFact}} \\approx ${answerStr}\\).`
        };
    },

    /**
     * 2. qCoefficientSin - Easy (Free response)
     * sin(x) = x - x³/3! + x⁵/5! - ...
     * Coefficient of x^(2k+1) is (-1)^k / (2k+1)!
     * Ask for x³ (k=1: -1/6) or x⁵ (k=2: 1/120)
     */
    qCoefficientSin() {
        const which = MathUtils.pick(['x3', 'x5']);

        let power, k, nFact, answer, answerStr, signStr;
        if (which === 'x3') {
            power = 3; k = 1; nFact = 6;
            answer = -1 / 6;
            answerStr = (-1 / 6).toFixed(6);
            signStr = '-';
        } else {
            power = 5; k = 2; nFact = 120;
            answer = 1 / 120;
            answerStr = (1 / 120).toFixed(6);
            signStr = '';
        }

        return {
            type: 'free',
            rule: 'sin(x) Coefficient',
            difficulty: 'easy',
            text: `The Maclaurin series for \\(\\sin x\\) is \\(\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots\\). Find the coefficient of \\(x^{${power}}\\) in this series. Give your answer to 6 decimal places.`,
            latex: `\\(\\sin x = \\displaystyle\\sum_{k=0}^{\\infty} \\frac{(-1)^k\\, x^{2k+1}}{(2k+1)!}\\)`,
            answer: answer,
            answerTex: `${signStr}\\dfrac{1}{${power}!} = ${signStr}\\dfrac{1}{${nFact}} \\approx ${answerStr}`,
            options: [],
            hintTex: [
                `\\text{The coefficient of } x^{2k+1} \\text{ in } \\sin x \\text{ is } \\dfrac{(-1)^k}{(2k+1)!}`,
                `x^{${power}} \\text{ means } 2k+1=${power} \\Rightarrow k=${k}: \\quad \\dfrac{(-1)^{${k}}}{${power}!} = \\dfrac{${k % 2 === 0 ? 1 : -1}}{${nFact}}`
            ],
            explain: `<strong>Step 1:</strong> The Maclaurin series for \\(\\sin x\\) is \\(\\displaystyle\\sum_{k=0}^{\\infty} \\dfrac{(-1)^k x^{2k+1}}{(2k+1)!}\\).<br><br>` +
                     `<strong>Step 2:</strong> For \\(x^{${power}}\\), we have \\(2k+1=${power}\\), so \\(k=${k}\\).<br><br>` +
                     `<strong>Step 3:</strong> Coefficient \\(= \\dfrac{(-1)^{${k}}}{${power}!} = \\dfrac{${k % 2 === 0 ? 1 : -1}}{${nFact}} \\approx ${answerStr}\\).`
        };
    },

    /**
     * 3. qCoefficientCos - Easy (Free response)
     * cos(x) = 1 - x²/2! + x⁴/4! - ...
     * Coefficient of x^(2k) is (-1)^k / (2k)!
     * Ask for x² (k=1: -1/2) or x⁴ (k=2: 1/24)
     */
    qCoefficientCos() {
        const which = MathUtils.pick(['x2', 'x4']);

        let power, k, nFact, answer, answerStr, signStr;
        if (which === 'x2') {
            power = 2; k = 1; nFact = 2;
            answer = -1 / 2;
            answerStr = (-0.5).toFixed(6);
            signStr = '-';
        } else {
            power = 4; k = 2; nFact = 24;
            answer = 1 / 24;
            answerStr = (1 / 24).toFixed(6);
            signStr = '';
        }

        return {
            type: 'free',
            rule: 'cos(x) Coefficient',
            difficulty: 'easy',
            text: `The Maclaurin series for \\(\\cos x\\) is \\(\\cos x = 1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots\\). Find the coefficient of \\(x^{${power}}\\) in this series. Give your answer to 6 decimal places.`,
            latex: `\\(\\cos x = \\displaystyle\\sum_{k=0}^{\\infty} \\frac{(-1)^k\\, x^{2k}}{(2k)!}\\)`,
            answer: answer,
            answerTex: `${signStr}\\dfrac{1}{${power}!} = ${signStr}\\dfrac{1}{${nFact}} \\approx ${answerStr}`,
            options: [],
            hintTex: [
                `\\text{The coefficient of } x^{2k} \\text{ in } \\cos x \\text{ is } \\dfrac{(-1)^k}{(2k)!}`,
                `x^{${power}} \\text{ means } 2k=${power} \\Rightarrow k=${k}: \\quad \\dfrac{(-1)^{${k}}}{${power}!} = \\dfrac{${k % 2 === 0 ? 1 : -1}}{${nFact}}`
            ],
            explain: `<strong>Step 1:</strong> The Maclaurin series for \\(\\cos x\\) is \\(\\displaystyle\\sum_{k=0}^{\\infty} \\dfrac{(-1)^k x^{2k}}{(2k)!}\\).<br><br>` +
                     `<strong>Step 2:</strong> For \\(x^{${power}}\\), we have \\(2k=${power}\\), so \\(k=${k}\\).<br><br>` +
                     `<strong>Step 3:</strong> Coefficient \\(= \\dfrac{(-1)^{${k}}}{${power}!} = \\dfrac{${k % 2 === 0 ? 1 : -1}}{${nFact}} \\approx ${answerStr}\\).`
        };
    },

    /**
     * 4. qApproximateEx - Medium (Free response)
     * Approximate e^x using first 3 terms: 1 + x + x²/2
     * Use x ∈ {0.1, 0.2, 0.5}
     */
    qApproximateEx() {
        const xChoices = [0.1, 0.2, 0.5];
        const x = MathUtils.pick(xChoices);

        const approx = 1 + x + (x * x) / 2;
        const approxStr = approx.toFixed(4);
        const exactStr = Math.exp(x).toFixed(5);
        const xSq = (x * x).toFixed(4);
        const halfXSq = ((x * x) / 2).toFixed(4);

        return {
            type: 'free',
            rule: 'Approximate e^x',
            difficulty: 'medium',
            text: `Using the first 3 terms of the Maclaurin series for \\(e^x\\), approximate \\(e^{${x}}\\). Give your answer to 4 decimal places.`,
            latex: `\\(e^x \\approx 1 + x + \\dfrac{x^2}{2}\\)`,
            answer: approx,
            answerTex: `1 + ${x} + \\dfrac{${xSq}}{2} \\approx ${approxStr}`,
            options: [],
            hintTex: [
                `\\text{Use: } e^x \\approx 1 + x + \\dfrac{x^2}{2!} \\text{ (first 3 terms)}`,
                `e^{${x}} \\approx 1 + ${x} + \\dfrac{(${x})^2}{2} = 1 + ${x} + ${halfXSq} = ${approxStr}`
            ],
            explain: `<strong>Step 1:</strong> The first 3 terms of the Maclaurin series are \\(e^x \\approx 1 + x + \\dfrac{x^2}{2!}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${x}\\):<br>` +
                     `\\(e^{${x}} \\approx 1 + ${x} + \\dfrac{(${x})^2}{2} = 1 + ${x} + ${halfXSq}\\).<br><br>` +
                     `<strong>Step 3:</strong> Sum: \\(\\approx ${approxStr}\\).<br><br>` +
                     `<em>For comparison, the exact value is \\(e^{${x}} \\approx ${exactStr}\\) — the approximation is close for small \\(x\\).</em>`
        };
    },

    /**
     * 5. qApproximateSin - Medium (Free response)
     * sin(x) ≈ x - x³/6 for small x (radians)
     * Use x ∈ {0.1, 0.2, 0.3}
     */
    qApproximateSin() {
        const xChoices = [0.1, 0.2, 0.3];
        const x = MathUtils.pick(xChoices);

        const xCubed = x * x * x;
        const approx = x - xCubed / 6;
        const approxStr = approx.toFixed(4);
        const exactStr = Math.sin(x).toFixed(5);
        const xCubedStr = xCubed.toFixed(6);
        const termStr = (xCubed / 6).toFixed(6);

        return {
            type: 'free',
            rule: 'Approximate sin(x)',
            difficulty: 'medium',
            text: `Using the approximation \\(\\sin x \\approx x - \\dfrac{x^3}{6}\\) for small \\(x\\) (in radians), approximate \\(\\sin(${x})\\). Give your answer to 4 decimal places.`,
            latex: `\\(\\sin x \\approx x - \\dfrac{x^3}{3!}\\)`,
            answer: approx,
            answerTex: `${x} - \\dfrac{(${x})^3}{6} \\approx ${approxStr}`,
            options: [],
            hintTex: [
                `\\text{Use: } \\sin x \\approx x - \\dfrac{x^3}{6} \\text{ (first two non-zero terms)}`,
                `\\sin(${x}) \\approx ${x} - \\dfrac{(${x})^3}{6} = ${x} - \\dfrac{${xCubedStr}}{6} = ${x} - ${termStr}`
            ],
            explain: `<strong>Step 1:</strong> The first two non-zero terms of the Maclaurin series give \\(\\sin x \\approx x - \\dfrac{x^3}{3!} = x - \\dfrac{x^3}{6}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${x}\\):<br>` +
                     `\\(\\sin(${x}) \\approx ${x} - \\dfrac{(${x})^3}{6} = ${x} - \\dfrac{${xCubedStr}}{6} = ${x} - ${termStr}\\).<br><br>` +
                     `<strong>Step 3:</strong> Result: \\(\\approx ${approxStr}\\).<br><br>` +
                     `<em>For comparison, the exact value is \\(\\sin(${x}) \\approx ${exactStr}\\).</em>`
        };
    },

    /**
     * 6. qFindFnValue - Easy (Free response)
     * f(0) = a₀ = constant term of the series
     * For e^x: 1, sin(x): 0, cos(x): 1, ln(1+x): 0
     */
    qFindFnValue() {
        const funcs = [
            {
                name: 'e^x',
                tex: 'e^x',
                series: '1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots',
                f0: 1,
                explain: `The constant term (when \\(x=0\\)) is \\(1\\), since \\(e^0 = 1\\).`
            },
            {
                name: 'sin(x)',
                tex: '\\sin x',
                series: 'x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots',
                f0: 0,
                explain: `Every term contains a power of \\(x\\), so when \\(x=0\\) all terms vanish: \\(\\sin(0) = 0\\).`
            },
            {
                name: 'cos(x)',
                tex: '\\cos x',
                series: '1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots',
                f0: 1,
                explain: `The constant term is \\(1\\), since \\(\\cos(0) = 1\\).`
            },
            {
                name: 'ln(1+x)',
                tex: '\\ln(1+x)',
                series: 'x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\cdots',
                f0: 0,
                explain: `Every term contains a power of \\(x\\), so when \\(x=0\\) all terms vanish: \\(\\ln(1+0) = \\ln 1 = 0\\).`
            }
        ];

        const fn = MathUtils.pick(funcs);

        return {
            type: 'free',
            rule: 'f(0) from Series',
            difficulty: 'easy',
            text: `Using the Maclaurin series for \\(${fn.tex}\\), find the value of \\(f(0)\\). Give your answer as an integer.`,
            latex: `\\(${fn.tex} = ${fn.series}\\)`,
            answer: fn.f0,
            answerTex: String(fn.f0),
            options: [],
            hintTex: [
                `\\text{Substitute } x = 0 \\text{ into the series to find } f(0)`,
                `\\text{The constant term (no } x \\text{ factor) gives the value at } x = 0`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = 0\\) into the series \\(${fn.tex} = ${fn.series}\\).<br><br>` +
                     `<strong>Step 2:</strong> ${fn.explain}<br><br>` +
                     `<strong>Answer:</strong> \\(f(0) = ${fn.f0}\\).`
        };
    },

    /**
     * 7. qDerivativeFromSeries - Medium (Free response)
     * If f(x) = a₀ + a₁x + a₂x² + ..., then f^(n)(0) = n! · aₙ
     * For e^x: all derivatives at 0 are 1
     * For sin(x): f'(0)=1, f''(0)=0, f'''(0)=-1
     * Answer = integer
     */
    qDerivativeFromSeries() {
        const questions = [
            // e^x: f^(n)(0) = 1 for any n
            ...[1, 2, 3, 4].map(n => ({
                fn: 'e^x',
                fnTex: 'e^x',
                series: `1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots`,
                deriv: n,
                derivLabel: n === 1 ? "f'(0)" : n === 2 ? "f''(0)" : `f^{(${n})}(0)`,
                answer: 1,
                nFact: [1, 1, 2, 6, 24][n],
                coeff: `\\dfrac{1}{${[1, 1, 2, 6, 24][n]}!}`.replace('/1!', '1'),
                explainCoeff: `\\tfrac{1}{${n}!}`,
                explainCalc: `f^{(${n})}(0) = ${n}! \\cdot \\dfrac{1}{${n}!} = 1`
            })),
            // sin(x): pattern 1, 0, -1, 0, ...
            { fn: 'sin(x)', fnTex: '\\sin x', series: `x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots`,
              deriv: 1, derivLabel: "f'(0)", answer: 1,
              explainCoeff: '1', explainCalc: "f'(0) = 1! \\cdot 1 = 1" },
            { fn: 'sin(x)', fnTex: '\\sin x', series: `x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots`,
              deriv: 2, derivLabel: "f''(0)", answer: 0,
              explainCoeff: '0', explainCalc: "f''(0) = 0 \\text{ (no } x^2 \\text{ term in }\\sin x\\text{)}" },
            { fn: 'sin(x)', fnTex: '\\sin x', series: `x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots`,
              deriv: 3, derivLabel: "f'''(0)", answer: -1,
              explainCoeff: '-\\tfrac{1}{6}', explainCalc: "f'''(0) = 3! \\cdot \\left(-\\tfrac{1}{6}\\right) = 6 \\cdot \\left(-\\tfrac{1}{6}\\right) = -1" }
        ];

        const q = MathUtils.pick(questions);

        return {
            type: 'free',
            rule: 'Derivative from Series',
            difficulty: 'medium',
            text: `Given the Maclaurin series for \\(f(x) = ${q.fnTex}\\), find \\(${q.derivLabel}\\). Give your answer as an integer.`,
            latex: `\\(${q.fnTex} = ${q.series}\\)`,
            answer: q.answer,
            answerTex: String(q.answer),
            options: [],
            hintTex: [
                `\\text{If } f(x) = \\sum a_n x^n, \\text{ then } f^{(n)}(0) = n! \\cdot a_n`,
                `\\text{Find the coefficient } a_{${q.deriv}} \\text{ of } x^{${q.deriv}} \\text{ in the series, then multiply by } ${q.deriv}!`
            ],
            explain: `<strong>Step 1:</strong> The Maclaurin series is \\(f(x) = ${q.series}\\).<br><br>` +
                     `<strong>Step 2:</strong> The coefficient of \\(x^{${q.deriv}}\\) in the series is \\(a_{${q.deriv}} = ${q.explainCoeff}\\).<br><br>` +
                     `<strong>Step 3:</strong> Use \\(f^{(n)}(0) = n! \\cdot a_n\\): \\(${q.explainCalc}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${q.derivLabel} = ${q.answer}\\).`
        };
    },

    /**
     * 8. qSubstituteIntoSeries - Medium (MC)
     * e^(kx) = 1 + kx + (kx)²/2! + ...  coefficient of x² = k²/2
     * Use k ∈ {2, 3}, find coefficient of x²
     */
    qSubstituteIntoSeries() {
        const k = MathUtils.pick([2, 3]);

        // coefficient of x² in e^(kx) is k²/2
        const k2 = k * k;
        const coeff = k2 / 2; // = 2 for k=2, = 4.5 for k=3
        const coeffTex = k2 % 2 === 0 ? String(k2 / 2) : `\\dfrac{${k2}}{2}`;
        const correctTex = coeffTex;

        // Build distractors
        // Dist 1: k/2 (forgot to square k)
        const d1 = k % 2 === 0 ? String(k / 2) : `\\dfrac{${k}}{2}`;
        // Dist 2: k² (forgot to divide by 2!)
        const d2 = String(k2);
        // Dist 3: k (just k, wrong all around)
        const d3 = String(k);
        // Dist 4: 1/2 (forgot to substitute k entirely)
        const d4 = `\\dfrac{1}{2}`;

        const allDist = [d1, d2, d3, d4].filter(d => d !== correctTex);

        const optionTexts = [correctTex];
        for (const d of allDist) {
            if (optionTexts.length < 4 && !optionTexts.includes(d)) {
                optionTexts.push(d);
            }
        }
        while (optionTexts.length < 4) {
            const extra = String(k2 + optionTexts.length);
            if (!optionTexts.includes(extra)) optionTexts.push(extra);
            else optionTexts.push(String(optionTexts.length));
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Substitution into Series',
            difficulty: 'medium',
            text: `By substituting \\(${k}x\\) into the Maclaurin series for \\(e^x\\), find the coefficient of \\(x^2\\) in the expansion of \\(e^{${k}x}\\).`,
            latex: `\\(e^x = 1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Replace } x \\text{ with } ${k}x: \\quad e^{${k}x} = 1 + (${k}x) + \\dfrac{(${k}x)^2}{2!} + \\cdots`,
                `\\text{The } x^2 \\text{ term is } \\dfrac{(${k}x)^2}{2!} = \\dfrac{${k2}x^2}{2} = ${coeffTex}\\,x^2`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(${k}x\\) for \\(x\\) in \\(e^x = 1 + x + \\dfrac{x^2}{2!} + \\cdots\\):<br>` +
                     `\\(e^{${k}x} = 1 + (${k}x) + \\dfrac{(${k}x)^2}{2!} + \\cdots\\)<br><br>` +
                     `<strong>Step 2:</strong> Expand the \\(x^2\\) term:<br>` +
                     `\\(\\dfrac{(${k}x)^2}{2!} = \\dfrac{${k2}x^2}{2} = ${coeffTex}\\,x^2\\).<br><br>` +
                     `<strong>Answer:</strong> The coefficient of \\(x^2\\) is \\(${coeffTex}\\).`
        };
    },

    /**
     * 9. qLnSeries - Hard (Free response)
     * ln(1+x) = x - x²/2 + x³/3 - x⁴/4 + ...
     * Use x = 0.5, first 4 terms
     * Sum = 0.5 - 0.125 + 0.04167 - 0.015625 ≈ 0.4010
     */
    qLnSeries() {
        const x = 0.5;

        const t1 = x;                          // 0.5
        const t2 = -(x * x) / 2;              // -0.125
        const t3 = (x * x * x) / 3;           // ≈ 0.041667
        const t4 = -(x * x * x * x) / 4;      // -0.015625

        const approx = t1 + t2 + t3 + t4;
        const approxStr = approx.toFixed(4);
        const exactStr = Math.log(1 + x).toFixed(5);

        const t1Str = t1.toFixed(4);
        const t2Str = t2.toFixed(4);
        const t3Str = t3.toFixed(5);
        const t4Str = t4.toFixed(6);

        return {
            type: 'free',
            rule: 'ln(1+x) Approximation',
            difficulty: 'hard',
            text: `Using the first 4 terms of the Maclaurin series for \\(\\ln(1+x)\\), approximate \\(\\ln(1.5)\\). Give your answer to 4 decimal places.`,
            latex: `\\(\\ln(1+x) = x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\dfrac{x^4}{4} + \\cdots\\)`,
            answer: approx,
            answerTex: `${t1Str} - 0.1250 + ${t3Str.slice(0, 6)} - ${Math.abs(t4).toFixed(6)} \\approx ${approxStr}`,
            options: [],
            hintTex: [
                `\\text{Substitute } x = 0.5 \\text{ into } \\ln(1+x) \\approx x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\dfrac{x^4}{4}`,
                `= 0.5 - \\dfrac{0.25}{2} + \\dfrac{0.125}{3} - \\dfrac{0.0625}{4} = 0.5 - 0.125 + 0.04\\overline{1} - 0.015625`
            ],
            explain: `<strong>Step 1:</strong> Set \\(x = 0.5\\) so that \\(\\ln(1.5) \\approx 0.5 - \\dfrac{(0.5)^2}{2} + \\dfrac{(0.5)^3}{3} - \\dfrac{(0.5)^4}{4}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute each term:<br>` +
                     `\\(t_1 = 0.5\\)<br>` +
                     `\\(t_2 = -\\dfrac{0.25}{2} = -0.125\\)<br>` +
                     `\\(t_3 = \\dfrac{0.125}{3} \\approx 0.04167\\)<br>` +
                     `\\(t_4 = -\\dfrac{0.0625}{4} = -0.015625\\)<br><br>` +
                     `<strong>Step 3:</strong> Sum: \\(0.5 - 0.125 + 0.04167 - 0.015625 \\approx ${approxStr}\\).<br><br>` +
                     `<em>For comparison, the exact value is \\(\\ln(1.5) \\approx ${exactStr}\\).</em>`
        };
    },

    /**
     * 10. qIntervalConvergence - Hard (MC)
     * ln(1+x) series converges for -1 < x ≤ 1
     * Which value of x is valid?
     * Options include valid (0.5 or 1) and invalid (-1 or 2) values
     */
    qIntervalConvergence() {
        // Randomise: ask either "which IS valid" or "which is NOT valid"
        const askValid = MathUtils.pick([true, false]);

        // Always present the same 4 values: 0.5 (valid), 1 (valid), -1 (invalid), 2 (invalid)
        const allOptions = [
            { x: '0.5',  valid: true,  tex: 'x = 0.5' },
            { x: '1',    valid: true,  tex: 'x = 1' },
            { x: '-1',   valid: false, tex: 'x = -1' },
            { x: '2',    valid: false, tex: 'x = 2' }
        ];

        // Correct answer = one that matches askValid; pick one at random
        const correctCandidates = allOptions.filter(o => o.valid === askValid);
        const correctOpt = MathUtils.pick(correctCandidates);

        // Build 4 options: 1 correct + 3 others (no duplicates)
        const others = allOptions.filter(o => o !== correctOpt);
        const shuffledOthers = MathUtils.shuffle(others).slice(0, 3);

        const optionObjects = [
            { value: 1, tex: correctOpt.tex },
            ...shuffledOthers.map(o => ({ value: 0, tex: o.tex }))
        ];

        const shuffled = MathUtils.shuffle(optionObjects);

        const questionWord = askValid ? 'can be used' : 'cannot be used';
        const ruleText = askValid
            ? 'The series converges for \\(-1 < x \\leq 1\\). A valid value lies within this interval.'
            : 'The series converges for \\(-1 < x \\leq 1\\). An invalid value lies outside this interval.';

        return {
            type: 'mc',
            rule: 'Interval of Convergence',
            difficulty: 'hard',
            text: `The Maclaurin series for \\(\\ln(1+x)\\) converges for \\(-1 < x \\leq 1\\). Which value of \\(x\\) ${questionWord} in this series?`,
            latex: `\\(\\ln(1+x) = x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\cdots, \\quad -1 < x \\leq 1\\)`,
            answer: 1,
            answerTex: correctOpt.tex,
            options: shuffled,
            hintTex: [
                `\\text{The series converges for } -1 < x \\leq 1`,
                `\\text{Check each option: is it strictly greater than } -1 \\text{ and at most } 1?`
            ],
            explain: `<strong>Step 1:</strong> ${ruleText}<br><br>` +
                     `<strong>Step 2:</strong> Check all options against \\(-1 < x \\leq 1\\):<br>` +
                     `\\(x = 0.5\\): valid (\\(-1 < 0.5 \\leq 1\\) ✓)<br>` +
                     `\\(x = 1\\): valid (\\(-1 < 1 \\leq 1\\) ✓)<br>` +
                     `\\(x = -1\\): invalid (\\(-1 < -1\\) is false ✗)<br>` +
                     `\\(x = 2\\): invalid (\\(2 > 1\\) ✗)<br><br>` +
                     `<strong>Answer:</strong> \\(${correctOpt.tex}\\) ${askValid ? 'is a valid choice' : 'is not a valid choice'}.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => MACLAURIN.qCoefficientEx(),          weight: 3, difficulty: 'easy'   },
            { fn: () => MACLAURIN.qCoefficientSin(),         weight: 3, difficulty: 'easy'   },
            { fn: () => MACLAURIN.qCoefficientCos(),         weight: 3, difficulty: 'easy'   },
            { fn: () => MACLAURIN.qApproximateEx(),          weight: 2, difficulty: 'medium' },
            { fn: () => MACLAURIN.qApproximateSin(),         weight: 2, difficulty: 'medium' },
            { fn: () => MACLAURIN.qFindFnValue(),            weight: 3, difficulty: 'easy'   },
            { fn: () => MACLAURIN.qDerivativeFromSeries(),   weight: 2, difficulty: 'medium' },
            { fn: () => MACLAURIN.qSubstituteIntoSeries(),   weight: 2, difficulty: 'medium' },
            { fn: () => MACLAURIN.qLnSeries(),               weight: 1, difficulty: 'hard'   },
            { fn: () => MACLAURIN.qIntervalConvergence(),    weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (MACLAURIN.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (MACLAURIN.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (MACLAURIN.level === 'hard') {
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
        MACLAURIN.score = 0;
        MACLAURIN.total = 0;
        MACLAURIN.streak = 0;
        MACLAURIN.answered = false;
        MACLAURIN.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="MACLAURIN.unload()">Maclaurin Series (5.23)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Maclaurin Series</h1>
                <p>IB Math AA 5.23 – Standard series and approximations</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="MACLAURIN.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="MACLAURIN.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="MACLAURIN.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="MACLAURIN.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="mac-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="mac-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="mac-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="mac-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="mac-question-card">
                <span class="rule-tag" id="mac-rule"></span>
                <span class="difficulty-tag" id="mac-difficulty"></span>
                <div class="question-text" id="mac-text"></div>
                <div class="question-prompt" id="mac-latex"></div>
                <div id="mac-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="mac-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="mac-feedback">
                <div class="feedback-title" id="mac-feedback-title"></div>
                <div class="feedback-explanation" id="mac-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="mac-hint-btn" onclick="MACLAURIN.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="mac-next-btn" onclick="MACLAURIN.next()" style="display:none;">Next Question</button>
            </div>
        `;

        MACLAURIN.next();
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
        MACLAURIN.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        MACLAURIN.score = 0;
        MACLAURIN.total = 0;
        MACLAURIN.streak = 0;
        MACLAURIN.updateStats();
        MACLAURIN.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        MACLAURIN.answered = false;
        MACLAURIN.hintIndex = 0;
        MACLAURIN.currentQ = MACLAURIN.pickQuestion();
        const q = MACLAURIN.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('mac-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('mac-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('mac-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('mac-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('mac-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="MACLAURIN.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="mac-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')MACLAURIN.checkFree()">
                    <button class="btn btn-primary" onclick="MACLAURIN.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('mac-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('mac-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('mac-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('mac-next-btn').style.display = 'none';
        document.getElementById('mac-hint-btn').style.display = '';
        document.getElementById('mac-hint-btn').disabled = false;

        // Render KaTeX
        MACLAURIN.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = MACLAURIN.currentQ;
        if (!q || !q.hintTex || MACLAURIN.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('mac-hint-box');
        const hintContent = MACLAURIN.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[MACLAURIN.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        MACLAURIN.hintIndex++;

        if (MACLAURIN.hintIndex >= q.hintTex.length) {
            document.getElementById('mac-hint-btn').disabled = true;
        }

        MACLAURIN.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (MACLAURIN.answered) return;
        MACLAURIN.answered = true;
        MACLAURIN.total++;

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
            MACLAURIN.score++;
            MACLAURIN.streak++;
        } else {
            btn.classList.add('incorrect');
            MACLAURIN.streak = 0;
        }

        MACLAURIN.showFeedback(isCorrect);
        MACLAURIN.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (MACLAURIN.answered) return;

        const inp = document.getElementById('mac-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        MACLAURIN.answered = true;
        MACLAURIN.total++;
        inp.disabled = true;

        const q = MACLAURIN.currentQ;
        const tol = q.tol !== undefined ? q.tol : 0.0001;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            MACLAURIN.score++;
            MACLAURIN.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            MACLAURIN.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        MACLAURIN.showFeedback(isCorrect);
        MACLAURIN.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = MACLAURIN.currentQ;
        const fb = document.getElementById('mac-feedback');
        const title = document.getElementById('mac-feedback-title');
        const explanation = document.getElementById('mac-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (MACLAURIN.streak > 1) {
                title.textContent = `Correct! (${MACLAURIN.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('mac-next-btn').style.display = '';
        document.getElementById('mac-hint-btn').style.display = 'none';

        MACLAURIN.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('mac-score');
        const totalEl  = document.getElementById('mac-total');
        const streakEl = document.getElementById('mac-streak');
        const accEl    = document.getElementById('mac-accuracy');

        if (scoreEl)  scoreEl.textContent  = MACLAURIN.score;
        if (totalEl)  totalEl.textContent  = MACLAURIN.total;
        if (streakEl) streakEl.textContent = MACLAURIN.streak;
        if (accEl) {
            accEl.textContent = MACLAURIN.total > 0
                ? Math.round((MACLAURIN.score / MACLAURIN.total) * 100) + '%'
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
                        { left: '\\[', right: '\\]', display: true  },
                        { left: '$$',  right: '$$',  display: true  },
                        { left: '$',   right: '$',   display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['maclaurin-series'] = () => MACLAURIN.load();
