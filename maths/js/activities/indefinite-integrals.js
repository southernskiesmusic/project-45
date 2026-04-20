/*
 * indefinite-integrals.js - IB Math AA 5.9–5.10: Indefinite Integrals
 * Antiderivatives and integration rules
 */

const INDEF_INT = {
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
     * 1. qPowerIntegral - Easy (Free)
     * ∫ax^n dx with F(0)=0; evaluate F(2) = a·2^(n+1)/(n+1).
     */
    qPowerIntegral() {
        const a = MathUtils.randInt(1, 3);
        const n = MathUtils.randInt(1, 4);

        // F(x) = a·x^(n+1)/(n+1) + C; F(0)=0 forces C=0
        // F(2) = a * 2^(n+1) / (n+1)
        const answer = parseFloat((a * Math.pow(2, n + 1) / (n + 1)).toFixed(2));

        const expTex = n === 1 ? 'x' : `x^{${n}}`;
        const integrandTex = a === 1 ? expTex : `${a}${expTex}`;
        const expOutTex = (n + 1) === 1 ? 'x' : `x^{${n + 1}}`;
        const antiderTex = `\\frac{${a}}{${n + 1}}${expOutTex}`;

        return {
            type: 'free',
            rule: 'Power Rule',
            difficulty: 'easy',
            text: `Given that \\(F(x) = \\int ${integrandTex}\\,dx\\) with \\(F(0) = 0\\), find \\(F(2)\\). Give your answer to 2 d.p.`,
            latex: `\\(\\int ${integrandTex}\\,dx,\\quad F(0) = 0\\)`,
            answer: answer,
            answerTex: String(answer.toFixed(2)),
            options: [],
            hintTex: [
                `\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C`,
                `F(x) = ${antiderTex} + C,\\quad F(0)=0 \\Rightarrow C=0`,
                `F(2) = \\frac{${a} \\cdot 2^{${n + 1}}}{${n + 1}} = \\frac{${a * Math.pow(2, n + 1)}}{${n + 1}}`
            ],
            explain: `<strong>Step 1:</strong> Apply the power rule: \\(\\int ${integrandTex}\\,dx = ${antiderTex} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Use \\(F(0) = 0\\): \\(\\frac{${a}}{${n + 1}} \\cdot 0 + C = 0 \\Rightarrow C = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate \\(F(2) = \\frac{${a} \\cdot 2^{${n + 1}}}{${n + 1}} = \\frac{${a * Math.pow(2, n + 1)}}{${n + 1}} = ${answer.toFixed(2)}\\).`
        };
    },

    /**
     * 2. qPolyIntegral - Easy (Free)
     * Integrate ax²+bx+c; evaluate F(2) - F(0) = a·8/3 + b·2 + c·2.
     */
    qPolyIntegral() {
        const a = MathUtils.randInt(1, 3);
        const b = MathUtils.randInt(1, 3);
        const c = MathUtils.randInt(1, 3);

        // F(x) = a·x³/3 + b·x²/2 + c·x
        // F(2) - F(0) = a·8/3 + b·4/2 + c·2 = 8a/3 + 2b + 2c
        const val = 8 * a / 3 + 2 * b + 2 * c;
        const answer = parseFloat(val.toFixed(2));

        const integrandTex = `${a}x^2 + ${b}x + ${c}`;
        const antiderTex = `\\frac{${a}}{3}x^3 + \\frac{${b}}{2}x^2 + ${c}x`;

        return {
            type: 'free',
            rule: 'Polynomial Integral',
            difficulty: 'easy',
            text: `Evaluate \\(\\displaystyle\\int_0^2 (${integrandTex})\\,dx\\). Give your answer to 2 d.p.`,
            latex: `\\(\\displaystyle\\int_0^2 (${integrandTex})\\,dx\\)`,
            answer: answer,
            answerTex: String(answer.toFixed(2)),
            options: [],
            hintTex: [
                `\\int (${integrandTex})\\,dx = ${antiderTex} + C`,
                `\\left[${antiderTex}\\right]_0^2`,
                `= \\frac{${a} \\cdot 8}{3} + \\frac{${b} \\cdot 4}{2} + ${c} \\cdot 2 - 0`
            ],
            explain: `<strong>Step 1:</strong> Integrate term by term: \\(\\int (${integrandTex})\\,dx = ${antiderTex} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply limits: \\(\\left[${antiderTex}\\right]_0^2\\).<br><br>` +
                     `<strong>Step 3:</strong> At \\(x=2\\): \\(\\frac{${a} \\cdot 8}{3} + \\frac{${b} \\cdot 4}{2} + ${c} \\cdot 2 = \\frac{${8 * a}}{3} + ${2 * b} + ${2 * c}\\).<br><br>` +
                     `<strong>Step 4:</strong> At \\(x=0\\): all terms are 0.<br><br>` +
                     `<strong>Answer:</strong> \\(${answer.toFixed(2)}\\).`
        };
    },

    /**
     * 3. qExpIntegral - Easy (Free)
     * ∫k·e^(ax) dx = (k/a)·e^(ax) + C; evaluate F(1)-F(0) = (k/a)(e^a - 1).
     */
    qExpIntegral() {
        const a = MathUtils.randInt(1, 2);
        const k = MathUtils.randInt(1, 3);

        // F(1) - F(0) = (k/a)(e^a - 1)
        const val = (k / a) * (Math.exp(a) - 1);
        const answer = parseFloat(val.toFixed(4));

        const integrandTex = k === 1 ? `e^{${a}x}` : `${k}e^{${a}x}`;
        const antiderTex = `\\frac{${k}}{${a}}e^{${a}x}`;

        return {
            type: 'free',
            rule: 'Exponential Integral',
            difficulty: 'easy',
            text: `Evaluate \\(\\displaystyle\\int_0^1 ${integrandTex}\\,dx\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle\\int_0^1 ${integrandTex}\\,dx\\)`,
            answer: answer,
            answerTex: String(answer.toFixed(4)),
            options: [],
            hintTex: [
                `\\int e^{ax}\\,dx = \\frac{1}{a}e^{ax} + C`,
                `\\int ${integrandTex}\\,dx = ${antiderTex} + C`,
                `\\left[${antiderTex}\\right]_0^1 = \\frac{${k}}{${a}}(e^{${a}} - 1)`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\int e^{ax}\\,dx = \\frac{1}{a}e^{ax} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Antiderivative: \\(${antiderTex} + C\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply limits: \\(\\frac{${k}}{${a}}e^{${a}} - \\frac{${k}}{${a}}e^{0} = \\frac{${k}}{${a}}(e^{${a}} - 1)\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 4. qLnIntegral - Medium (Free)
     * ∫(a/x) dx; evaluate a·[ln x]_1^b = a·ln(b).
     * Use b = e or e² for clean integer answers.
     */
    qLnIntegral() {
        const a = MathUtils.randInt(1, 3);
        // Always use b = e or e² for clean integer answers
        const useEsq = MathUtils.randInt(0, 1) === 1;
        const bLabel = useEsq ? 'e^2' : 'e';
        const bVal = useEsq ? Math.E * Math.E : Math.E;
        const answer = useEsq ? 2 * a : a; // integer

        const integrandTex = a === 1 ? `\\frac{1}{x}` : `\\frac{${a}}{x}`;

        return {
            type: 'free',
            rule: 'Logarithm Integral',
            difficulty: 'medium',
            text: `Evaluate \\(\\displaystyle\\int_1^{${bLabel}} ${integrandTex}\\,dx\\). Give an exact integer answer.`,
            latex: `\\(\\displaystyle\\int_1^{${bLabel}} ${integrandTex}\\,dx\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\int \\frac{1}{x}\\,dx = \\ln|x| + C`,
                `= ${a === 1 ? '' : a}\\left[\\ln x\\right]_1^{${bLabel}}`,
                `= ${a === 1 ? '' : `${a}\\cdot`}(\\ln ${bLabel} - \\ln 1) = ${a === 1 ? '' : `${a} \\cdot`}${useEsq ? '2' : '1'}`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\int \\frac{1}{x}\\,dx = \\ln|x| + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Antiderivative: \\(${a === 1 ? '' : a}\\ln|x|\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply limits: \\(${a === 1 ? '' : a}[\\ln(${bLabel}) - \\ln(1)] = ${a === 1 ? '' : `${a} \\times `}${useEsq ? '2' : '1'} - 0 = ${answer}\\).`
        };
    },

    /**
     * 5. qLinearDenominator - Medium (Free)
     * ∫1/(ax+b) dx from 0 to 1 = (1/a)ln(1 + a/b).
     */
    qLinearDenominator() {
        const a = MathUtils.randInt(1, 4);
        const b = MathUtils.randInt(1, 4);

        // ∫_0^1 1/(ax+b) dx = [(1/a)ln|ax+b|]_0^1
        //   = (1/a)(ln|a+b| - ln|b|) = (1/a)ln((a+b)/b)
        const val = (1 / a) * Math.log((a + b) / b);
        const answer = parseFloat(val.toFixed(4));

        const denomTex = b === 0 ? `${a}x` : `${a}x + ${b}`;
        const antiderTex = `\\frac{1}{${a}}\\ln|${denomTex}|`;

        return {
            type: 'free',
            rule: 'Linear Denominator',
            difficulty: 'medium',
            text: `Evaluate \\(\\displaystyle\\int_0^1 \\frac{1}{${denomTex}}\\,dx\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle\\int_0^1 \\frac{1}{${denomTex}}\\,dx\\)`,
            answer: answer,
            answerTex: String(answer.toFixed(4)),
            options: [],
            hintTex: [
                `\\int \\frac{1}{ax+b}\\,dx = \\frac{1}{a}\\ln|ax+b| + C`,
                `\\left[${antiderTex}\\right]_0^1`,
                `= \\frac{1}{${a}}(\\ln(${a + b}) - \\ln(${b})) = \\frac{1}{${a}}\\ln\\!\\left(\\frac{${a + b}}{${b}}\\right)`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\int \\frac{1}{ax+b}\\,dx = \\frac{1}{a}\\ln|ax+b| + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply limits \\(\\left[${antiderTex}\\right]_0^1\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\frac{1}{${a}}\\ln(${a + b}) - \\frac{1}{${a}}\\ln(${b}) = \\frac{1}{${a}}\\ln\\!\\left(\\frac{${a + b}}{${b}}\\right)\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 6. qSinIntegral - Medium (Free)
     * ∫sin(kx) dx from 0 to π/2 = (1/k)(1 - cos(kπ/2)).
     * k=1 → answer=1; k=2 → answer=1.
     */
    qSinIntegral() {
        const k = MathUtils.pick([1, 2]);

        // [-1/k·cos(kx)]_0^{π/2} = -1/k·cos(kπ/2) + 1/k·cos(0)
        //   = (1/k)(1 - cos(kπ/2))
        const cosVal = Math.cos(k * Math.PI / 2);
        const val = (1 / k) * (1 - cosVal);
        const answer = parseFloat(val.toFixed(4));

        const integrandTex = k === 1 ? '\\sin x' : `\\sin(${k}x)`;
        const antiderTex = k === 1 ? '-\\cos x' : `-\\frac{1}{${k}}\\cos(${k}x)`;
        const cosArgTex = k === 1 ? '\\frac{\\pi}{2}' : `\\frac{${k}\\pi}{2}`;

        return {
            type: 'free',
            rule: 'Sine Integral',
            difficulty: 'medium',
            text: `Evaluate \\(\\displaystyle\\int_0^{\\pi/2} ${integrandTex}\\,dx\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle\\int_0^{\\pi/2} ${integrandTex}\\,dx\\)`,
            answer: answer,
            answerTex: String(answer.toFixed(4)),
            options: [],
            hintTex: [
                `\\int \\sin(kx)\\,dx = -\\frac{1}{k}\\cos(kx) + C`,
                `\\left[${antiderTex}\\right]_0^{\\pi/2}`,
                `= \\frac{1}{${k}}\\left(1 - \\cos\\!\\left(${cosArgTex}\\right)\\right)`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\int \\sin(kx)\\,dx = -\\frac{1}{k}\\cos(kx) + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply limits: \\(\\left[${antiderTex}\\right]_0^{\\pi/2}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\left(${antiderTex.replace('x', '\\cdot\\frac{\\pi}{2}')}\\right) - \\left(${antiderTex.replace('x', '\\cdot 0')}\\right)\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(= \\frac{1}{${k}}(1 - \\cos(${cosArgTex})) = \\frac{1}{${k}}(1 - ${cosVal.toFixed(4)}) = ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 7. qCosIntegral - Medium (Free)
     * ∫cos(kx) dx from 0 to π/2 = (1/k)sin(kπ/2).
     * k=1 → 1.0; k=3 → -1/3.
     */
    qCosIntegral() {
        const k = MathUtils.pick([1, 3]);

        // [(1/k)sin(kx)]_0^{π/2} = (1/k)sin(kπ/2)
        const sinVal = Math.sin(k * Math.PI / 2);
        const val = (1 / k) * sinVal;
        const answer = parseFloat(val.toFixed(4));

        const integrandTex = k === 1 ? '\\cos x' : `\\cos(${k}x)`;
        const antiderTex = k === 1 ? '\\sin x' : `\\frac{1}{${k}}\\sin(${k}x)`;
        const sinArgTex = k === 1 ? '\\frac{\\pi}{2}' : `\\frac{${k}\\pi}{2}`;

        return {
            type: 'free',
            rule: 'Cosine Integral',
            difficulty: 'medium',
            text: `Evaluate \\(\\displaystyle\\int_0^{\\pi/2} ${integrandTex}\\,dx\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle\\int_0^{\\pi/2} ${integrandTex}\\,dx\\)`,
            answer: answer,
            answerTex: String(answer.toFixed(4)),
            options: [],
            hintTex: [
                `\\int \\cos(kx)\\,dx = \\frac{1}{k}\\sin(kx) + C`,
                `\\left[${antiderTex}\\right]_0^{\\pi/2}`,
                `= \\frac{1}{${k}}\\sin\\!\\left(${sinArgTex}\\right) - \\frac{1}{${k}}\\sin(0)`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\int \\cos(kx)\\,dx = \\frac{1}{k}\\sin(kx) + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply limits: \\(\\left[${antiderTex}\\right]_0^{\\pi/2}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\frac{1}{${k}}\\sin\\!\\left(${sinArgTex}\\right) - \\frac{1}{${k}}\\sin(0) = \\frac{1}{${k}} \\times ${sinVal.toFixed(4)} - 0\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 8. qFindConstant - Medium (Free)
     * F'(x) = kx + d, F(x₀) = y₀; find F at another point.
     * F(x) = kx²/2 + dx + C. Answer is integer.
     */
    qFindConstant() {
        const k = MathUtils.nonZeroRandInt(-3, 3);
        const d = MathUtils.randInt(-4, 4);
        const x0 = MathUtils.randInt(-2, 2);
        const y0 = MathUtils.randInt(-6, 6);

        // F(x) = k*x²/2 + d*x + C
        // F(x0) = y0 => k*x0²/2 + d*x0 + C = y0 => C = y0 - k*x0²/2 - d*x0
        // To ensure C is integer, pick x0 such that k*x0² is even
        // Simpler: just compute; as long as answer is integer for the eval point
        const C_num = y0 - k * x0 * x0 / 2 - d * x0;

        // Pick x1 != x0 to evaluate, and ensure F(x1) is integer
        // F(x1) = k*x1²/2 + d*x1 + C
        // For this to be integer: k*x1² must be even, i.e. k even or x1 even
        let x1;
        let attempts = 0;
        do {
            x1 = MathUtils.randInt(-4, 4);
            attempts++;
        } while (
            x1 === x0 ||
            !Number.isInteger(k * x1 * x1 / 2 + d * x1 + C_num) ||
            attempts < 20
        );

        const F_x1 = k * x1 * x1 / 2 + d * x1 + C_num;
        const answer = F_x1;

        // Format derivative text
        const kTex = k === 1 ? '' : k === -1 ? '-' : String(k);
        const dSign = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
        const derivTex = d === 0 ? `${kTex}x` : `${kTex}x ${dSign}`;

        // Format antiderivative
        const halfKNum = k;
        const halfKDen = 2;
        const antiderTex = `\\frac{${halfKNum}}{${halfKDen}}x^2 + ${d}x + C`;

        const C_display = Number.isInteger(C_num) ? C_num : C_num.toFixed(2);

        return {
            type: 'free',
            rule: 'Find Constant C',
            difficulty: 'medium',
            text: `Given that \\(F'(x) = ${derivTex}\\) and \\(F(${x0}) = ${y0}\\), find \\(F(${x1})\\).`,
            latex: `\\(F'(x) = ${derivTex},\\quad F(${x0}) = ${y0}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `F(x) = \\int (${derivTex})\\,dx = ${antiderTex}`,
                `\\text{Use } F(${x0}) = ${y0} \\text{ to find } C`,
                `C = ${y0} - \\frac{${k}}{2}(${x0})^2 - ${d}(${x0}) = ${C_display}`
            ],
            explain: `<strong>Step 1:</strong> Integrate: \\(F(x) = \\int (${derivTex})\\,dx = ${antiderTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(F(${x0}) = ${y0}\\):<br>` +
                     `\\(\\frac{${k}}{2}(${x0})^2 + ${d}(${x0}) + C = ${y0}\\)<br>` +
                     `\\(${k * x0 * x0 / 2} + ${d * x0} + C = ${y0} \\Rightarrow C = ${C_display}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate \\(F(${x1}) = \\frac{${k}}{2}(${x1})^2 + ${d}(${x1}) + ${C_display} = ${answer}\\).`
        };
    },

    /**
     * 9. qFindCurve - Medium (Free)
     * dy/dx = ax+b, passes through (x₀, y₀); find y at x₁. Answer is integer.
     */
    qFindCurve() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-4, 4);
        const x0 = MathUtils.randInt(-2, 2);
        const y0 = MathUtils.randInt(-8, 8);

        // y = a*x²/2 + b*x + C
        // y0 = a*x0²/2 + b*x0 + C => C = y0 - a*x0²/2 - b*x0
        const C = y0 - a * x0 * x0 / 2 - b * x0;

        // Pick x1 != x0 such that y(x1) is integer
        let x1;
        let attempts = 0;
        do {
            x1 = MathUtils.randInt(-4, 4);
            attempts++;
        } while (
            x1 === x0 ||
            !Number.isInteger(a * x1 * x1 / 2 + b * x1 + C) ||
            attempts < 20
        );

        const y1 = a * x1 * x1 / 2 + b * x1 + C;
        const answer = y1;

        const aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const dydxTex = b === 0 ? `${aTex}x` : `${aTex}x ${bSign}`;
        const antiderTex = `\\frac{${a}}{2}x^2 + ${b}x + C`;
        const C_display = Number.isInteger(C) ? C : C.toFixed(2);

        return {
            type: 'free',
            rule: 'Find Curve',
            difficulty: 'medium',
            text: `A curve has \\(\\dfrac{dy}{dx} = ${dydxTex}\\) and passes through \\((${x0},\\,${y0})\\). Find the \\(y\\)-coordinate when \\(x = ${x1}\\).`,
            latex: `\\(\\dfrac{dy}{dx} = ${dydxTex},\\quad (${x0},\\,${y0})\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `y = \\int (${dydxTex})\\,dx = ${antiderTex}`,
                `\\text{Substitute } (${x0},\\,${y0}) \\text{ to find } C`,
                `C = ${y0} - \\frac{${a}}{2}(${x0})^2 - ${b}(${x0}) = ${C_display}`
            ],
            explain: `<strong>Step 1:</strong> Integrate: \\(y = \\int (${dydxTex})\\,dx = ${antiderTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\((${x0}, ${y0})\\):<br>` +
                     `\\(${y0} = \\frac{${a}}{2}(${x0})^2 + ${b}(${x0}) + C \\Rightarrow C = ${C_display}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = ${x1}\\): \\(y = \\frac{${a}}{2}(${x1})^2 + ${b}(${x1}) + ${C_display} = ${answer}\\).`
        };
    },

    /**
     * 10. qIntegralByInspection - Hard (MC)
     * ∫f'(x)·(f(x))^n dx = (f(x))^(n+1)/(n+1) + C (reverse chain rule).
     * f(x) is linear: ax+b; f'(x)=a; integrand = a·(ax+b)^n.
     */
    qIntegralByInspection() {
        const a = MathUtils.pick([2, 3, 4]);
        const b = MathUtils.randInt(0, 4);
        const n = MathUtils.pick([2, 3, 4]);

        // ∫ a·(ax+b)^n dx = (ax+b)^(n+1)/(n+1) + C
        const nPlus1 = n + 1;

        // Format inner function text
        const innerTex = b === 0 ? `${a}x` : `${a}x + ${b}`;
        const innerBase = b === 0 ? `(${a}x)` : `(${a}x + ${b})`;

        // Correct answer
        const correctTex = `\\frac{${innerBase}^{${nPlus1}}}{${nPlus1}} + C`;

        // Distractor 1: forgot to use chain rule – just (f(x))^(n+1)/(n+1) with wrong coefficient (missing a)
        const d1Tex = `\\frac{1}{${a}} \\cdot \\frac{${innerBase}^{${nPlus1}}}{${nPlus1}} + C`;

        // Distractor 2: differentiated instead – used n-1
        const nMinus1 = n - 1;
        const d2Tex = nMinus1 === 1
            ? `${a}${innerBase} + C`
            : `\\frac{${innerBase}^{${nMinus1}}}{${nMinus1}} + C`;

        // Distractor 3: power n unchanged (forgot to add 1)
        const d3Tex = `\\frac{${innerBase}^{${n}}}{${n}} + C`;

        const optionTexts = [correctTex, d1Tex, d2Tex, d3Tex];

        // Ensure uniqueness
        const finalOpts = [optionTexts[0]];
        for (let i = 1; i < optionTexts.length; i++) {
            if (!finalOpts.includes(optionTexts[i])) {
                finalOpts.push(optionTexts[i]);
            } else {
                finalOpts.push(`\\frac{${innerBase}^{${nPlus1 + i}}}{${nPlus1 + i}} + C`);
            }
        }
        while (finalOpts.length < 4) {
            const off = finalOpts.length;
            const cand = `\\frac{${innerBase}^{${nPlus1 + off}}}{${nPlus1 + off}} + C`;
            if (!finalOpts.includes(cand)) finalOpts.push(cand);
            else finalOpts.push(`\\frac{${innerBase}^{${nPlus1}}}{${nPlus1 + off}} + C`);
        }

        const options = finalOpts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        const integrandTex = a === 1 ? `${innerBase}^{${n}}` : `${a}${innerBase}^{${n}}`;

        return {
            type: 'mc',
            rule: 'Inspection (Chain Rule)',
            difficulty: 'hard',
            text: `Find \\(\\displaystyle\\int ${integrandTex}\\,dx\\) by recognising the reverse chain rule.`,
            latex: `\\(\\displaystyle\\int ${integrandTex}\\,dx\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Recognise: } f(x) = ${innerTex},\\quad f'(x) = ${a}`,
                `\\int f'(x)\\cdot[f(x)]^n\\,dx = \\frac{[f(x)]^{n+1}}{n+1} + C`,
                `= \\frac{${innerBase}^{${nPlus1}}}{${nPlus1}} + C`
            ],
            explain: `<strong>Step 1:</strong> Identify \\(f(x) = ${innerTex}\\), so \\(f'(x) = ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> The integrand \\(${integrandTex}\\) matches the pattern \\(f'(x) \\cdot [f(x)]^{${n}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply the reverse chain rule:<br>` +
                     `\\(\\int f'(x)\\cdot[f(x)]^n\\,dx = \\frac{[f(x)]^{n+1}}{n+1} + C\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => INDEF_INT.qPowerIntegral(),        weight: 3 }, // easy
            { fn: () => INDEF_INT.qPolyIntegral(),         weight: 3 }, // easy
            { fn: () => INDEF_INT.qExpIntegral(),          weight: 3 }, // easy
            { fn: () => INDEF_INT.qLnIntegral(),           weight: 2 }, // medium
            { fn: () => INDEF_INT.qLinearDenominator(),    weight: 2 }, // medium
            { fn: () => INDEF_INT.qSinIntegral(),          weight: 2 }, // medium
            { fn: () => INDEF_INT.qCosIntegral(),          weight: 2 }, // medium
            { fn: () => INDEF_INT.qFindConstant(),         weight: 2 }, // medium
            { fn: () => INDEF_INT.qFindCurve(),            weight: 2 }, // medium
            { fn: () => INDEF_INT.qIntegralByInspection(), weight: 1 }  // hard
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (INDEF_INT.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2].includes(i));
        } else if (INDEF_INT.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 4, 5, 6, 7, 8].includes(i));
        } else if (INDEF_INT.level === 'hard') {
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
        INDEF_INT.score = 0;
        INDEF_INT.total = 0;
        INDEF_INT.streak = 0;
        INDEF_INT.answered = false;
        INDEF_INT.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="INDEF_INT.unload()">Indefinite Integrals (5.9–5.10)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Indefinite Integrals</h1>
                <p>IB Math AA 5.9–5.10 – Antiderivatives and integration rules</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="INDEF_INT.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="INDEF_INT.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="INDEF_INT.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="INDEF_INT.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="iint-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="iint-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="iint-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="iint-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="iint-question-card">
                <span class="rule-tag" id="iint-rule"></span>
                <span class="difficulty-tag" id="iint-difficulty"></span>
                <div class="question-text" id="iint-text"></div>
                <div class="question-prompt" id="iint-latex"></div>
                <div id="iint-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="iint-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="iint-feedback">
                <div class="feedback-title" id="iint-feedback-title"></div>
                <div class="feedback-explanation" id="iint-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="iint-hint-btn" onclick="INDEF_INT.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="iint-next-btn" onclick="INDEF_INT.next()" style="display:none;">Next Question</button>
            </div>
        `;

        INDEF_INT.next();
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
        INDEF_INT.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        INDEF_INT.score = 0;
        INDEF_INT.total = 0;
        INDEF_INT.streak = 0;
        INDEF_INT.updateStats();
        INDEF_INT.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        INDEF_INT.answered = false;
        INDEF_INT.hintIndex = 0;
        INDEF_INT.currentQ = INDEF_INT.pickQuestion();
        const q = INDEF_INT.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('iint-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('iint-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('iint-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('iint-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('iint-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="INDEF_INT.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="iint-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')INDEF_INT.checkFree()">
                    <button class="btn btn-primary" onclick="INDEF_INT.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('iint-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('iint-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('iint-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('iint-next-btn').style.display = 'none';
        document.getElementById('iint-hint-btn').style.display = '';
        document.getElementById('iint-hint-btn').disabled = false;

        // Render KaTeX
        INDEF_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = INDEF_INT.currentQ;
        if (!q || !q.hintTex || INDEF_INT.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('iint-hint-box');
        const hintContent = INDEF_INT.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[INDEF_INT.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        INDEF_INT.hintIndex++;

        if (INDEF_INT.hintIndex >= q.hintTex.length) {
            document.getElementById('iint-hint-btn').disabled = true;
        }

        INDEF_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (INDEF_INT.answered) return;
        INDEF_INT.answered = true;
        INDEF_INT.total++;

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
            INDEF_INT.score++;
            INDEF_INT.streak++;
        } else {
            btn.classList.add('incorrect');
            INDEF_INT.streak = 0;
        }

        INDEF_INT.showFeedback(isCorrect);
        INDEF_INT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (INDEF_INT.answered) return;

        const inp = document.getElementById('iint-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        INDEF_INT.answered = true;
        INDEF_INT.total++;
        inp.disabled = true;

        const q = INDEF_INT.currentQ;
        const tol = q.difficulty === 'easy' ? 0.01 : 0.001;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            INDEF_INT.score++;
            INDEF_INT.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            INDEF_INT.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        INDEF_INT.showFeedback(isCorrect);
        INDEF_INT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = INDEF_INT.currentQ;
        const fb = document.getElementById('iint-feedback');
        const title = document.getElementById('iint-feedback-title');
        const explanation = document.getElementById('iint-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (INDEF_INT.streak > 1) {
                title.textContent = `Correct! (${INDEF_INT.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('iint-next-btn').style.display = '';
        document.getElementById('iint-hint-btn').style.display = 'none';

        INDEF_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('iint-score');
        const totalEl = document.getElementById('iint-total');
        const streakEl = document.getElementById('iint-streak');
        const accEl = document.getElementById('iint-accuracy');

        if (scoreEl) scoreEl.textContent = INDEF_INT.score;
        if (totalEl) totalEl.textContent = INDEF_INT.total;
        if (streakEl) streakEl.textContent = INDEF_INT.streak;
        if (accEl) {
            accEl.textContent = INDEF_INT.total > 0
                ? Math.round((INDEF_INT.score / INDEF_INT.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['indefinite-integrals'] = () => INDEF_INT.load();
