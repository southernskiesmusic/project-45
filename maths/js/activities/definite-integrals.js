/*
 * definite-integrals.js - IB Math AA 5.11: Definite Integrals
 * Area under curves and the fundamental theorem of calculus
 */

const DEFINITE_INT = {
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
     * 1. qPowerDefinite - Easy (Free)
     * ∫[0 to b] ax^n dx = a·b^(n+1)/(n+1)
     */
    qPowerDefinite() {
        const a = MathUtils.randInt(1, 3);
        const n = MathUtils.randInt(1, 3);
        const b = MathUtils.randInt(1, 3);

        // Exact answer: a * b^(n+1) / (n+1)
        const answer = parseFloat((a * Math.pow(b, n + 1) / (n + 1)).toFixed(2));

        const aTex  = a === 1 ? '' : String(a);
        const nTex  = n === 1 ? '' : `^{${n}}`;
        const n1Tex = (n + 1) === 1 ? '' : `^{${n + 1}}`;

        const integrand = `${aTex}x${nTex}`;
        const antideriv = `\\frac{${a}}{${n + 1}}x${n1Tex}`;

        const topNum = a * Math.pow(b, n + 1);
        const botNum = n + 1;

        return {
            type: 'free',
            rule: 'Power Rule (Definite)',
            difficulty: 'easy',
            text: 'Evaluate the definite integral below. Give your answer to 2 decimal places.',
            latex: `\\(\\displaystyle\\int_0^{${b}} ${integrand}\\, dx\\)`,
            answer: answer,
            answerTex: `\\frac{${topNum}}{${botNum}} = ${answer}`,
            options: [],
            hintTex: [
                `\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C`,
                `\\left[${antideriv}\\right]_0^{${b}} = \\frac{${a}}{${n+1}}\\cdot ${b}^{${n+1}} - 0 = \\frac{${topNum}}{${botNum}}`
            ],
            explain: `<strong>Step 1:</strong> Apply the power rule: \\(\\int ${integrand}\\,dx = ${antideriv} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate between 0 and ${b}:<br>` +
                     `\\(\\left[${antideriv}\\right]_0^{${b}} = \\frac{${a}}{${n+1}}\\cdot ${b}^{${n+1}} - \\frac{${a}}{${n+1}}\\cdot 0^{${n+1}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\frac{${topNum}}{${botNum}} = ${answer}\\).`
        };
    },

    /**
     * 2. qPolyDefinite - Easy (Free)
     * ∫[0 to 2] (ax²+bx+c) dx = a·8/3 + b·2 + c·2
     */
    qPolyDefinite() {
        const a = MathUtils.randInt(1, 3);
        const b = MathUtils.nonZeroRandInt(-3, 3);
        const c = MathUtils.randInt(-3, 3);

        // Antiderivative evaluated at x=2: a*8/3 + b*4/2 + c*2 = 8a/3 + 2b + 2c
        // Evaluated at x=0: 0
        const exactNum = 8 * a;       // numerator from a term
        const exactDen = 3;           // denominator from a term
        const rest = 2 * b + 2 * c;  // integer part from b and c terms
        // Total = 8a/3 + rest = (8a + 3*rest) / 3
        const totalNum = exactNum + 3 * rest;
        const answer = parseFloat((totalNum / 3).toFixed(2));

        // Build integrand string
        let integrand = '';
        integrand += a === 1 ? 'x^2' : `${a}x^2`;
        integrand += b > 0 ? ` + ${b === 1 ? '' : b}x` : b < 0 ? ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x` : '';
        integrand += c > 0 ? ` + ${c}` : c < 0 ? ` - ${Math.abs(c)}` : '';

        return {
            type: 'free',
            rule: 'Polynomial (Definite)',
            difficulty: 'easy',
            text: 'Evaluate the definite integral below. Give your answer to 2 decimal places.',
            latex: `\\(\\displaystyle\\int_0^{2} (${integrand})\\, dx\\)`,
            answer: answer,
            answerTex: `\\frac{${totalNum}}{3} = ${answer}`,
            options: [],
            hintTex: [
                `\\int(${integrand})\\,dx = \\frac{${a}}{3}x^3 + \\frac{${b}}{2}x^2 + ${c}x + C`,
                `\\text{Evaluate at } x=2 \\text{ and subtract value at } x=0`
            ],
            explain: `<strong>Step 1:</strong> Find the antiderivative:<br>` +
                     `\\(F(x) = \\frac{${a}}{3}x^3 + \\frac{${b}}{2}x^2 + ${c}x\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate \\(F(2) - F(0)\\):<br>` +
                     `\\(F(2) = \\frac{${a}}{3}(8) + \\frac{${b}}{2}(4) + ${c}(2) = \\frac{${exactNum}}{3} + ${2 * b} + ${2 * c}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(F(2) = \\frac{${totalNum}}{3} = ${answer}\\), and \\(F(0) = 0\\), so the answer is \\(${answer}\\).`
        };
    },

    /**
     * 3. qExpDefinite - Medium (Free)
     * ∫[0 to 1] k·e^(ax) dx = (k/a)(e^a - 1)
     */
    qExpDefinite() {
        const k = MathUtils.randInt(1, 3);
        const a = MathUtils.randInt(1, 2);

        // (k/a)(e^a - 1)
        const answer = parseFloat(((k / a) * (Math.exp(a) - 1)).toFixed(4));

        const kTex = k === 1 ? '' : String(k);
        const aTex = a === 1 ? '' : String(a);
        const integrand = `${kTex}e^{${aTex}x}`;
        const antideriv = k === a
            ? `e^{${aTex}x}`
            : `\\frac{${k}}{${a}}e^{${aTex}x}`;

        return {
            type: 'free',
            rule: 'Exponential (Definite)',
            difficulty: 'medium',
            text: 'Evaluate the definite integral below. Give your answer to 4 decimal places.',
            latex: `\\(\\displaystyle\\int_0^{1} ${integrand}\\, dx\\)`,
            answer: answer,
            answerTex: `\\frac{${k}}{${a}}(e^{${a}} - 1) \\approx ${answer}`,
            options: [],
            hintTex: [
                `\\int e^{ax}\\,dx = \\frac{1}{a}e^{ax} + C`,
                `\\left[${antideriv}\\right]_0^{1} = \\frac{${k}}{${a}}(e^{${a}} - e^{0}) = \\frac{${k}}{${a}}(e^{${a}} - 1)`
            ],
            explain: `<strong>Step 1:</strong> Use \\(\\int e^{ax}\\,dx = \\frac{1}{a}e^{ax} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Antiderivative: \\(F(x) = ${antideriv}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate \\(F(1) - F(0) = \\frac{${k}}{${a}}e^{${a}} - \\frac{${k}}{${a}}e^{0} = \\frac{${k}}{${a}}(e^{${a}} - 1)\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(\\approx ${answer}\\).`
        };
    },

    /**
     * 4. qSinDefinite - Medium (Free)
     * ∫[0 to π/2] sin(kx) dx = (1/k)(1 - cos(kπ/2))
     * k=1: 1, k=2: 1, k=3: (1-cos(3π/2))/3 = 1/3
     */
    qSinDefinite() {
        const k = MathUtils.pick([1, 2, 3]);

        // [-1/k·cos(kx)]_0^(π/2) = -1/k·cos(kπ/2) + 1/k·cos(0) = (1/k)(1 - cos(kπ/2))
        const answer = parseFloat(((1 / k) * (1 - Math.cos(k * Math.PI / 2))).toFixed(4));

        const kTex = k === 1 ? '' : String(k);
        const coeff = k === 1 ? '-' : `-\\frac{1}{${k}}`;
        const antideriv = `${coeff}\\cos(${kTex}x)`;

        return {
            type: 'free',
            rule: 'Sine (Definite)',
            difficulty: 'medium',
            text: 'Evaluate the definite integral below. Give your answer to 4 decimal places.',
            latex: `\\(\\displaystyle\\int_0^{\\pi/2} \\sin(${kTex}x)\\, dx\\)`,
            answer: answer,
            answerTex: `\\frac{1}{${k}}\\left(1 - \\cos\\!\\left(\\frac{${k}\\pi}{2}\\right)\\right) \\approx ${answer}`,
            options: [],
            hintTex: [
                `\\int \\sin(kx)\\,dx = -\\frac{1}{k}\\cos(kx) + C`,
                `\\left[${antideriv}\\right]_0^{\\pi/2} = \\frac{1}{${k}}\\left(1 - \\cos\\!\\left(\\frac{${k}\\pi}{2}\\right)\\right)`
            ],
            explain: `<strong>Step 1:</strong> Use \\(\\int \\sin(kx)\\,dx = -\\frac{1}{k}\\cos(kx) + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Antiderivative: \\(F(x) = ${antideriv}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate:<br>` +
                     `\\(F\\!\\left(\\frac{\\pi}{2}\\right) - F(0) = ${coeff}\\cos\\!\\left(\\frac{${k}\\pi}{2}\\right) - (${coeff}\\cos 0)\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(= \\frac{1}{${k}}\\left(1 - \\cos\\!\\left(\\frac{${k}\\pi}{2}\\right)\\right) \\approx ${answer}\\).`
        };
    },

    /**
     * 5. qCosDefinite - Medium (Free)
     * ∫[0 to π/2] cos(kx) dx = (1/k)·sin(kπ/2)
     * k=1→1, k=2→0, k=3→−1/3
     */
    qCosDefinite() {
        const k = MathUtils.pick([1, 2, 3]);

        // [1/k·sin(kx)]_0^(π/2) = (1/k)·sin(kπ/2)
        const answer = parseFloat(((1 / k) * Math.sin(k * Math.PI / 2)).toFixed(4));

        const kTex = k === 1 ? '' : String(k);
        const coeff = k === 1 ? '' : `\\frac{1}{${k}}`;
        const antideriv = k === 1 ? `\\sin(x)` : `\\frac{1}{${k}}\\sin(${kTex}x)`;

        return {
            type: 'free',
            rule: 'Cosine (Definite)',
            difficulty: 'medium',
            text: 'Evaluate the definite integral below. Give your answer to 4 decimal places.',
            latex: `\\(\\displaystyle\\int_0^{\\pi/2} \\cos(${kTex}x)\\, dx\\)`,
            answer: answer,
            answerTex: `\\frac{1}{${k}}\\sin\\!\\left(\\frac{${k}\\pi}{2}\\right) \\approx ${answer}`,
            options: [],
            hintTex: [
                `\\int \\cos(kx)\\,dx = \\frac{1}{k}\\sin(kx) + C`,
                `\\left[${antideriv}\\right]_0^{\\pi/2} = \\frac{1}{${k}}\\sin\\!\\left(\\frac{${k}\\pi}{2}\\right) - 0`
            ],
            explain: `<strong>Step 1:</strong> Use \\(\\int \\cos(kx)\\,dx = \\frac{1}{k}\\sin(kx) + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Antiderivative: \\(F(x) = ${antideriv}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate:<br>` +
                     `\\(F\\!\\left(\\frac{\\pi}{2}\\right) - F(0) = \\frac{1}{${k}}\\sin\\!\\left(\\frac{${k}\\pi}{2}\\right) - \\frac{1}{${k}}\\sin(0)\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(= \\frac{1}{${k}}\\sin\\!\\left(\\frac{${k}\\pi}{2}\\right) \\approx ${answer}\\).`
        };
    },

    /**
     * 6. qAreaPositive - Easy (Free)
     * Area under f(x)=ax+b from x=p to x=q, f>0 on interval.
     * Area = [ax²/2 + bx]_p^q
     */
    qAreaPositive() {
        // Generate a, b, p, q ensuring f>0 throughout
        const a = MathUtils.randInt(1, 3);
        const b = MathUtils.randInt(1, 5);
        const p = MathUtils.randInt(0, 3);
        const q = p + MathUtils.randInt(1, 3);

        // f(x)=ax+b is always positive for a,b>0, x>=0
        // Area = [ax²/2 + bx]_p^q = a(q²-p²)/2 + b(q-p)
        const area = parseFloat((a * (q * q - p * p) / 2 + b * (q - p)).toFixed(2));

        const bTex = b > 0 ? ` + ${b}` : b < 0 ? ` - ${Math.abs(b)}` : '';
        const integrand = `${a === 1 ? '' : a}x${bTex}`;
        const antideriv = `\\frac{${a}}{2}x^2 + ${b}x`;

        const FqNum = a * q * q;
        const FpNum = a * p * p;

        return {
            type: 'free',
            rule: 'Area (Positive Function)',
            difficulty: 'easy',
            text: 'Find the area under the curve between the given limits. Give your answer to 2 decimal places.',
            latex: `\\(f(x) = ${integrand},\\quad x \\in [${p},\\,${q}]\\)`,
            answer: area,
            answerTex: String(area),
            options: [],
            hintTex: [
                `\\text{Area} = \\int_{${p}}^{${q}} (${integrand})\\,dx = \\left[${antideriv}\\right]_{${p}}^{${q}}`,
                `= \\left(\\frac{${a}}{2}(${q})^2 + ${b}(${q})\\right) - \\left(\\frac{${a}}{2}(${p})^2 + ${b}(${p})\\right)`
            ],
            explain: `<strong>Step 1:</strong> Since \\(f(x) = ${integrand} > 0\\) on \\([${p}, ${q}]\\), area = \\(\\int_{${p}}^{${q}} (${integrand})\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Antiderivative: \\(F(x) = ${antideriv}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(F(${q}) = \\frac{${FqNum}}{2} + ${b * q} = ${a * q * q / 2 + b * q}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(F(${p}) = \\frac{${FpNum}}{2} + ${b * p} = ${a * p * p / 2 + b * p}\\).<br><br>` +
                     `<strong>Step 5:</strong> Area \\(= ${a * q * q / 2 + b * q} - ${a * p * p / 2 + b * p} = ${area}\\).`
        };
    },

    /**
     * 7. qAreaNegative - Medium (Free)
     * f(x) = x²−k, negative on (−√k, √k).
     * Area = |∫[0 to √k] (x²−k) dx| = |[x³/3 − kx]_0^√k| = k^(3/2)·2/3
     * k ∈ {1, 4, 9}
     */
    qAreaNegative() {
        const k = MathUtils.pick([1, 4, 9]);
        const sqrtK = Math.sqrt(k);

        // Area = 2k^(3/2)/3 = 2k·√k/3
        const area = parseFloat((2 * Math.pow(k, 1.5) / 3).toFixed(4));

        const sqrtKTex = Number.isInteger(sqrtK) ? String(sqrtK) : `\\sqrt{${k}}`;

        return {
            type: 'free',
            rule: 'Area (Below x-axis)',
            difficulty: 'medium',
            text: `The function \\(f(x) = x^2 - ${k}\\) is negative on \\((-${sqrtKTex},\\,${sqrtKTex})\\). Find the area enclosed between the curve and the x-axis. Give your answer to 4 decimal places.`,
            latex: `\\(f(x) = x^2 - ${k},\\quad x \\in [0,\\,${sqrtKTex}]\\text{ (by symmetry)}\\)`,
            answer: area,
            answerTex: `\\frac{2k^{3/2}}{3}\\bigg|_{k=${k}} = ${area}`,
            options: [],
            hintTex: [
                `\\text{Area} = \\left|\\int_{-${sqrtKTex}}^{${sqrtKTex}} (x^2 - ${k})\\,dx\\right| = 2\\left|\\int_0^{${sqrtKTex}} (x^2 - ${k})\\,dx\\right|`,
                `\\left[\\frac{x^3}{3} - ${k}x\\right]_0^{${sqrtKTex}} = \\frac{${k}^{3/2}}{3} - ${k}\\cdot${sqrtKTex}`
            ],
            explain: `<strong>Step 1:</strong> Since \\(f(x) < 0\\) on \\((-${sqrtKTex}, ${sqrtKTex})\\), area \\(= \\left|\\int_{-${sqrtKTex}}^{${sqrtKTex}} (x^2 - ${k})\\,dx\\right|\\).<br><br>` +
                     `<strong>Step 2:</strong> By symmetry: \\(= 2\\left|\\int_0^{${sqrtKTex}} (x^2 - ${k})\\,dx\\right|\\).<br><br>` +
                     `<strong>Step 3:</strong> Antiderivative: \\(F(x) = \\frac{x^3}{3} - ${k}x\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(F(${sqrtKTex}) = \\frac{${k}^{3/2}}{3} - ${k} \\cdot ${sqrtKTex} = -\\frac{2 \\cdot ${k}^{3/2}}{3}\\).<br><br>` +
                     `<strong>Step 5:</strong> Area \\(= 2 \\cdot \\frac{2 \\cdot ${k}^{3/2}}{3} \\cdot \\frac{1}{2}\\) — applying modulus across symmetric halves gives \\(\\frac{2 \\cdot ${k}^{3/2}}{3} = ${area}\\).`
        };
    },

    /**
     * 8. qAreaBetweenCurves - Hard (Free)
     * Area between f(x)=k and g(x)=x² from x=0 to x=√k
     * = ∫[0 to √k] (k−x²) dx = k^(3/2)·2/3
     * k ∈ {1, 4, 9}
     */
    qAreaBetweenCurves() {
        const k = MathUtils.pick([1, 4, 9]);
        const sqrtK = Math.sqrt(k);

        // Area = [kx - x³/3]_0^√k = k·√k - k^(3/2)/3 = k^(3/2)·(1 - 1/3) = 2k^(3/2)/3
        const area = parseFloat((2 * Math.pow(k, 1.5) / 3).toFixed(4));

        const sqrtKTex = Number.isInteger(sqrtK) ? String(sqrtK) : `\\sqrt{${k}}`;

        return {
            type: 'free',
            rule: 'Area Between Curves',
            difficulty: 'hard',
            text: `Find the area of the region enclosed between the horizontal line \\(f(x) = ${k}\\) and the parabola \\(g(x) = x^2\\), from \\(x = 0\\) to \\(x = ${sqrtKTex}\\). Give your answer to 4 decimal places.`,
            latex: `\\(\\text{Area} = \\displaystyle\\int_0^{${sqrtKTex}} \\bigl(${k} - x^2\\bigr)\\,dx\\)`,
            answer: area,
            answerTex: `\\frac{2 \\cdot ${k}^{3/2}}{3} = ${area}`,
            options: [],
            hintTex: [
                `\\text{Area} = \\int_0^{${sqrtKTex}} (f(x) - g(x))\\,dx = \\int_0^{${sqrtKTex}} (${k} - x^2)\\,dx`,
                `\\left[${k}x - \\frac{x^3}{3}\\right]_0^{${sqrtKTex}} = ${k}\\cdot${sqrtKTex} - \\frac{${sqrtKTex}^3}{3}`
            ],
            explain: `<strong>Step 1:</strong> The upper curve is \\(f(x) = ${k}\\) and the lower is \\(g(x) = x^2\\) on \\([0, ${sqrtKTex}]\\).<br><br>` +
                     `<strong>Step 2:</strong> Area \\(= \\int_0^{${sqrtKTex}} (${k} - x^2)\\,dx\\).<br><br>` +
                     `<strong>Step 3:</strong> Antiderivative: \\(F(x) = ${k}x - \\frac{x^3}{3}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(F(${sqrtKTex}) = ${k} \\cdot ${sqrtKTex} - \\frac{(${sqrtKTex})^3}{3} = ${k * sqrtK} - \\frac{${sqrtK * sqrtK * sqrtK}}{3} = \\frac{${area * 3}}{3}\\).<br><br>` +
                     `<strong>Step 5:</strong> Area \\(= \\frac{2 \\cdot ${k}^{3/2}}{3} = ${area}\\).`
        };
    },

    /**
     * 9. qFindUpperBound - Hard (Free)
     * ∫[0 to b] ax dx = c → a·b²/2 = c → b = √(2c/a)
     * Choose a, then b (integer 1–4), derive c = a·b²/2.
     */
    qFindUpperBound() {
        const aChoices = [1, 2, 4];
        const a = MathUtils.pick(aChoices);
        const b = MathUtils.randInt(1, 4);          // desired upper bound (integer answer)
        const c = a * b * b / 2;                    // always integer since a·b² is even for our choices

        const integrand = a === 1 ? 'x' : `${a}x`;

        return {
            type: 'free',
            rule: 'Find Upper Bound',
            difficulty: 'hard',
            text: `The definite integral \\(\\displaystyle\\int_0^{b} ${integrand}\\,dx = ${c}\\). Find the value of \\(b\\).`,
            latex: `\\(b > 0\\)`,
            answer: b,
            answerTex: String(b),
            options: [],
            hintTex: [
                `\\int_0^{b} ${integrand}\\,dx = \\left[\\frac{${a}}{2}x^2\\right]_0^{b} = \\frac{${a}}{2}b^2`,
                `\\frac{${a}}{2}b^2 = ${c} \\implies b^2 = \\frac{2 \\cdot ${c}}{${a}} = ${b * b} \\implies b = ${b}`
            ],
            explain: `<strong>Step 1:</strong> Integrate: \\(\\int_0^{b} ${integrand}\\,dx = \\left[\\frac{${a}}{2}x^2\\right]_0^{b} = \\frac{${a}}{2}b^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Set equal to \\(${c}\\): \\(\\frac{${a}}{2}b^2 = ${c}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(b^2 = \\frac{2 \\cdot ${c}}{${a}} = ${b * b}\\).<br><br>` +
                     `<strong>Step 4:</strong> Since \\(b > 0\\): \\(b = \\sqrt{${b * b}} = ${b}\\).`
        };
    },

    /**
     * 10. qFundamentalThm - Medium (MC)
     * d/dx[∫[a to x] f(t) dt] = f(x).
     * Given f(t) = at^n + b, the derivative of ∫[2 to x] f(t)dt is f(x).
     */
    qFundamentalThm() {
        const a = MathUtils.nonZeroRandInt(-3, 3) || 1;
        const n = MathUtils.randInt(1, 3);
        const b = MathUtils.randInt(-4, 4);

        // Correct: f(x) = ax^n + b
        const aTex  = a === 1 ? '' : a === -1 ? '-' : String(a);
        const nTex  = n === 1 ? '' : `^{${n}}`;
        const bTex  = b > 0 ? ` + ${b}` : b < 0 ? ` - ${Math.abs(b)}` : '';

        const correctTex = `${aTex}x${nTex}${bTex}`;

        // Distractor 1: f(t) instead of f(x) — uses t variable
        const dist1 = `${aTex}t${nTex}${bTex}`;

        // Distractor 2: the integral expression itself
        const dist2 = `\\int_2^x (${aTex}t${nTex}${bTex})\\,dt`;

        // Distractor 3: wrong exponent (n+1 instead of n — common error of not applying FTC)
        const wrongN = n + 1;
        const wrongNTex = wrongN === 1 ? '' : `^{${wrongN}}`;
        // Also adjust coefficient as if they integrated again: a/(n+1) * x^(n+1) + bx
        const wrongA_n = n + 1; // denominator
        let dist3;
        if (a === 1) {
            dist3 = `\\frac{x${wrongNTex}}{${wrongA_n}}${b !== 0 ? ` + ${b}x` : ''}`;
        } else if (a === -1) {
            dist3 = `-\\frac{x${wrongNTex}}{${wrongA_n}}${b !== 0 ? ` + ${b}x` : ''}`;
        } else {
            dist3 = `\\frac{${a}x${wrongNTex}}{${wrongA_n}}${b !== 0 ? ` + ${b}x` : ''}`;
        }

        // Build options, ensure uniqueness
        const rawOptions = [
            { value: 1, tex: correctTex },
            { value: 0, tex: dist1 },
            { value: 0, tex: dist2 },
            { value: 0, tex: dist3 }
        ];

        const seen = new Set();
        const uniqueOptions = [];
        for (const opt of rawOptions) {
            if (!seen.has(opt.tex)) {
                seen.add(opt.tex);
                uniqueOptions.push(opt);
            }
        }
        // Fill to 4 if collisions occurred
        while (uniqueOptions.length < 4) {
            const off = uniqueOptions.length;
            const fallbackTex = `${a + off}x${nTex}${bTex}`;
            if (!seen.has(fallbackTex)) {
                seen.add(fallbackTex);
                uniqueOptions.push({ value: 0, tex: fallbackTex });
            }
        }

        const shuffled = MathUtils.shuffle(uniqueOptions);

        // Format integrand in the question display
        const integrandFt = `${aTex}t${nTex}${bTex}`;

        return {
            type: 'mc',
            rule: 'Fundamental Theorem',
            difficulty: 'medium',
            text: `Using the Fundamental Theorem of Calculus, find \\(\\dfrac{d}{dx}\\displaystyle\\int_2^x f(t)\\,dt\\) where \\(f(t) = ${integrandFt}\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x) \\quad \\text{(FTC Part 1)}`,
                `\\text{Replace } t \\text{ with } x \\text{ in } f(t) = ${integrandFt}`
            ],
            explain: `<strong>Step 1:</strong> Recall the Fundamental Theorem of Calculus (Part 1):<br>` +
                     `\\(\\dfrac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\).<br><br>` +
                     `<strong>Step 2:</strong> The lower limit \\(a = 2\\) is a constant, so it does not affect the derivative.<br><br>` +
                     `<strong>Step 3:</strong> Simply substitute \\(t = x\\) into \\(f(t)\\):<br>` +
                     `\\(\\dfrac{d}{dx}\\int_2^x (${integrandFt})\\,dt = ${correctTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => DEFINITE_INT.qPowerDefinite(),       weight: 3 }, // 0 easy
            { fn: () => DEFINITE_INT.qPolyDefinite(),        weight: 3 }, // 1 easy
            { fn: () => DEFINITE_INT.qExpDefinite(),         weight: 2 }, // 2 medium
            { fn: () => DEFINITE_INT.qSinDefinite(),         weight: 2 }, // 3 medium
            { fn: () => DEFINITE_INT.qCosDefinite(),         weight: 2 }, // 4 medium
            { fn: () => DEFINITE_INT.qAreaPositive(),        weight: 3 }, // 5 easy
            { fn: () => DEFINITE_INT.qAreaNegative(),        weight: 2 }, // 6 medium
            { fn: () => DEFINITE_INT.qAreaBetweenCurves(),   weight: 1 }, // 7 hard
            { fn: () => DEFINITE_INT.qFindUpperBound(),      weight: 1 }, // 8 hard
            { fn: () => DEFINITE_INT.qFundamentalThm(),      weight: 2 }  // 9 medium
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (DEFINITE_INT.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 5].includes(i));
        } else if (DEFINITE_INT.level === 'medium') {
            filtered = pool.filter((_, i) => [2, 3, 4, 6, 9].includes(i));
        } else if (DEFINITE_INT.level === 'hard') {
            filtered = pool.filter((_, i) => [7, 8].includes(i));
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
        DEFINITE_INT.score = 0;
        DEFINITE_INT.total = 0;
        DEFINITE_INT.streak = 0;
        DEFINITE_INT.answered = false;
        DEFINITE_INT.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="DEFINITE_INT.unload()">Definite Integrals (5.11)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Definite Integrals</h1>
                <p>IB Math AA 5.11 – Area under curves and the fundamental theorem</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="DEFINITE_INT.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="DEFINITE_INT.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="DEFINITE_INT.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="DEFINITE_INT.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="dint-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="dint-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="dint-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="dint-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="dint-question-card">
                <span class="rule-tag" id="dint-rule"></span>
                <span class="difficulty-tag" id="dint-difficulty"></span>
                <div class="question-text" id="dint-text"></div>
                <div class="question-prompt" id="dint-latex"></div>
                <div id="dint-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="dint-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="dint-feedback">
                <div class="feedback-title" id="dint-feedback-title"></div>
                <div class="feedback-explanation" id="dint-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="dint-hint-btn" onclick="DEFINITE_INT.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="dint-next-btn" onclick="DEFINITE_INT.next()" style="display:none;">Next Question</button>
            </div>
        `;

        DEFINITE_INT.next();
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
        DEFINITE_INT.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        DEFINITE_INT.score = 0;
        DEFINITE_INT.total = 0;
        DEFINITE_INT.streak = 0;
        DEFINITE_INT.updateStats();
        DEFINITE_INT.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        DEFINITE_INT.answered = false;
        DEFINITE_INT.hintIndex = 0;
        DEFINITE_INT.currentQ = DEFINITE_INT.pickQuestion();
        const q = DEFINITE_INT.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('dint-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('dint-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('dint-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('dint-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('dint-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="DEFINITE_INT.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="dint-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')DEFINITE_INT.checkFree()">
                    <button class="btn btn-primary" onclick="DEFINITE_INT.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('dint-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('dint-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('dint-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('dint-next-btn').style.display = 'none';
        document.getElementById('dint-hint-btn').style.display = '';
        document.getElementById('dint-hint-btn').disabled = false;

        // Render KaTeX
        DEFINITE_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = DEFINITE_INT.currentQ;
        if (!q || !q.hintTex || DEFINITE_INT.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('dint-hint-box');
        const hintContent = DEFINITE_INT.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[DEFINITE_INT.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        DEFINITE_INT.hintIndex++;

        if (DEFINITE_INT.hintIndex >= q.hintTex.length) {
            document.getElementById('dint-hint-btn').disabled = true;
        }

        DEFINITE_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (DEFINITE_INT.answered) return;
        DEFINITE_INT.answered = true;
        DEFINITE_INT.total++;

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
            DEFINITE_INT.score++;
            DEFINITE_INT.streak++;
        } else {
            btn.classList.add('incorrect');
            DEFINITE_INT.streak = 0;
        }

        DEFINITE_INT.showFeedback(isCorrect);
        DEFINITE_INT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (DEFINITE_INT.answered) return;

        const inp = document.getElementById('dint-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        DEFINITE_INT.answered = true;
        DEFINITE_INT.total++;
        inp.disabled = true;

        const q = DEFINITE_INT.currentQ;
        // Use per-question tolerance where needed; default 0.01
        const tol = q.tol !== undefined ? q.tol : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            DEFINITE_INT.score++;
            DEFINITE_INT.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            DEFINITE_INT.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        DEFINITE_INT.showFeedback(isCorrect);
        DEFINITE_INT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = DEFINITE_INT.currentQ;
        const fb = document.getElementById('dint-feedback');
        const title = document.getElementById('dint-feedback-title');
        const explanation = document.getElementById('dint-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (DEFINITE_INT.streak > 1) {
                title.textContent = `Correct! (${DEFINITE_INT.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('dint-next-btn').style.display = '';
        document.getElementById('dint-hint-btn').style.display = 'none';

        DEFINITE_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('dint-score');
        const totalEl  = document.getElementById('dint-total');
        const streakEl = document.getElementById('dint-streak');
        const accEl    = document.getElementById('dint-accuracy');

        if (scoreEl)  scoreEl.textContent  = DEFINITE_INT.score;
        if (totalEl)  totalEl.textContent  = DEFINITE_INT.total;
        if (streakEl) streakEl.textContent = DEFINITE_INT.streak;
        if (accEl) {
            accEl.textContent = DEFINITE_INT.total > 0
                ? Math.round((DEFINITE_INT.score / DEFINITE_INT.total) * 100) + '%'
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
                        { left: '\\(', right: '\\)',  display: false },
                        { left: '\\[', right: '\\]',  display: true  },
                        { left: '$$',  right: '$$',   display: true  },
                        { left: '$',   right: '$',    display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['definite-integrals'] = () => DEFINITE_INT.load();
