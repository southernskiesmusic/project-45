/*
 * rational-functions.js - IB Math AA 2.13–2.14: Rational Functions
 * Rational functions of the form f(x) = (ax+b)/(cx+d)
 * Vertical and horizontal asymptotes, key features, sketching behaviour
 */

const RATIONAL = {
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
     * 1. qVerticalAsymptote - Easy (Free)
     * f(x) = 1/(cx+d). Find vertical asymptote x = -d/c.
     * Constructed so -d/c is always an integer.
     */
    qVerticalAsymptote() {
        // c ∈ {1,2,3}, pick integer k = -d/c so d = -k*c
        const c = MathUtils.pick([1, 2, 3]);
        const k = MathUtils.randInt(-6, 6);   // answer: x = k
        const d = -k * c;                     // ensures -d/c = k (integer)

        // Format denominator
        const denomTex = c === 1
            ? `x ${d >= 0 ? '+' : '-'} ${Math.abs(d)}`
            : `${c}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)}`;

        const funcTex = `f(x) = \\dfrac{1}{${c === 1 ? '' : c}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)}}`;

        return {
            type: 'free',
            rule: 'Vertical Asymptote',
            difficulty: 'easy',
            text: 'Find the vertical asymptote of the rational function below. Give the value of \\(x\\).',
            latex: `\\(${funcTex}\\)`,
            answer: k,
            answerTex: String(k),
            options: [],
            hintTex: [
                `\\text{The vertical asymptote occurs where the denominator } = 0`,
                `${c === 1 ? '' : c}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)} = 0 \\implies x = ${MathUtils.fractionTeX(-d, c)}`
            ],
            explain: `<strong>Step 1:</strong> A vertical asymptote occurs where the denominator equals zero.<br><br>` +
                     `<strong>Step 2:</strong> Set the denominator equal to zero:<br>` +
                     `\\(${c === 1 ? '' : c}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)} = 0\\)<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(x\\):<br>` +
                     `\\(${c === 1 ? '' : c}x = ${-d}\\)<br>` +
                     `\\(x = ${k}\\)<br><br>` +
                     `<strong>Answer:</strong> The vertical asymptote is \\(x = ${k}\\).`
        };
    },

    /**
     * 2. qHorizontalAsymptote - Easy (MC)
     * f(x) = (ax+b)/(cx+d). Horizontal asymptote y = a/c.
     * Distractors: y = b/d, y = a/d, y = -a/c.
     */
    qHorizontalAsymptote() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const c = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.randInt(-6, 6);
        // Pick d such that b/d and a/d are different from a/c
        let d;
        do { d = MathUtils.nonZeroRandInt(-5, 5); } while (d === 0);

        // Format function
        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }
        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const numTex = `${fmtCoeff(a)}x${fmtConst(b)}`;
        const denTex = `${fmtCoeff(c)}x${fmtConst(d)}`;
        const funcTex = `f(x) = \\dfrac{${numTex}}{${denTex}}`;

        // Correct answer: y = a/c
        const [an, ad] = MathUtils.simplifyFraction(a, c);
        const correctTex = `y = ${MathUtils.fractionTeX(a, c)}`;
        const correctVal = an / ad;

        // Distractors
        const dist1Tex = `y = ${MathUtils.fractionTeX(b, d)}`;   // b/d
        const dist2Tex = `y = ${MathUtils.fractionTeX(a, d)}`;   // a/d
        const dist3Tex = `y = ${MathUtils.fractionTeX(-a, c)}`;  // -a/c

        const optionTexts = [correctTex];
        for (const d_opt of [dist1Tex, dist2Tex, dist3Tex]) {
            if (!optionTexts.includes(d_opt)) {
                optionTexts.push(d_opt);
            } else {
                // fallback: offset numerator
                const fallback = `y = ${MathUtils.fractionTeX(a + optionTexts.length, c)}`;
                optionTexts.push(fallback);
            }
        }

        const options = optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Horizontal Asymptote',
            difficulty: 'easy',
            text: 'Find the horizontal asymptote of the rational function below.',
            latex: `\\(${funcTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{For } f(x) = \\dfrac{ax+b}{cx+d}, \\text{ divide numerator and denominator by } x`,
                `\\text{As } x \\to \\pm\\infty: \\frac{b}{x} \\to 0 \\text{ and } \\frac{d}{x} \\to 0, \\text{ leaving } y = \\frac{a}{c} = ${MathUtils.fractionTeX(a, c)}`
            ],
            explain: `<strong>Step 1:</strong> For a rational function \\(f(x) = \\dfrac{ax+b}{cx+d}\\), find the horizontal asymptote by dividing numerator and denominator by \\(x\\):<br><br>` +
                     `\\(f(x) = \\dfrac{${a} + \\frac{${b}}{x}}{${c} + \\frac{${d}}{x}}\\)<br><br>` +
                     `<strong>Step 2:</strong> As \\(x \\to \\pm\\infty\\), the terms \\(\\frac{${b}}{x}\\) and \\(\\frac{${d}}{x}\\) tend to 0.<br><br>` +
                     `<strong>Step 3:</strong> Therefore the horizontal asymptote is \\(y = \\dfrac{${a}}{${c}} = ${MathUtils.fractionTeX(a, c)}\\).`
        };
    },

    /**
     * 3. qEvaluateRational - Easy (Free)
     * f(x) = (ax+b)/(cx+d). Find f(k) for integer k.
     * Constructed so denominator ≠ 0 and answer is integer.
     */
    qEvaluateRational() {
        // Build so that f(k) is integer: pick a,b,c,d,k then check
        let a, b, c, d, k, num, den, answer;
        let attempts = 0;
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            c = MathUtils.nonZeroRandInt(-4, 4);
            d = MathUtils.randInt(-6, 6);
            b = MathUtils.randInt(-6, 6);
            k = MathUtils.randInt(-5, 5);
            den = c * k + d;
            num = a * k + b;
            attempts++;
        } while (den === 0 || num % den !== 0 || attempts > 200);

        answer = num / den;

        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }
        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const numTex = `${fmtCoeff(a)}x${fmtConst(b)}`;
        const denTex = `${fmtCoeff(c)}x${fmtConst(d)}`;
        const funcTex = `f(x) = \\dfrac{${numTex}}{${denTex}}`;

        return {
            type: 'free',
            rule: 'Evaluate Rational Function',
            difficulty: 'easy',
            text: `Evaluate the rational function at \\(x = ${k}\\). Give an exact value.`,
            latex: `\\(${funcTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } x = ${k} \\text{ into the numerator and denominator separately}`,
                `f(${k}) = \\dfrac{${a}(${k}) ${b >= 0 ? '+' : '-'} ${Math.abs(b)}}{${c}(${k}) ${d >= 0 ? '+' : '-'} ${Math.abs(d)}} = \\dfrac{${num}}{${den}}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = ${k}\\) into \\(f(x)\\):<br><br>` +
                     `\\(f(${k}) = \\dfrac{${a}(${k}) + ${b}}{${c}(${k}) + ${d}}\\)<br><br>` +
                     `<strong>Step 2:</strong> Evaluate numerator and denominator:<br>` +
                     `\\(\\text{Numerator: } ${a * k} + ${b} = ${num}\\)<br>` +
                     `\\(\\text{Denominator: } ${c * k} + ${d} = ${den}\\)<br><br>` +
                     `<strong>Step 3:</strong> Simplify:<br>` +
                     `\\(f(${k}) = \\dfrac{${num}}{${den}} = ${answer}\\).`
        };
    },

    /**
     * 4. qDomainRational - Easy (Free)
     * f(x) = p/(qx+r). Domain excludes x = -r/q. Ensure integer answer.
     */
    qDomainRational() {
        // pick q ∈ {1,2,3}, integer exclusion k = -r/q so r = -k*q
        const q = MathUtils.pick([1, 2, 3]);
        const k = MathUtils.randInt(-6, 6);   // excluded value
        const r = -k * q;
        const p = MathUtils.nonZeroRandInt(-6, 6);

        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const denTex = `${q === 1 ? '' : q}x${fmtConst(r)}`;
        const funcTex = `f(x) = \\dfrac{${p}}{${denTex}}`;

        return {
            type: 'free',
            rule: 'Domain of Rational Function',
            difficulty: 'easy',
            text: 'What value of \\(x\\) is excluded from the domain of the function below?',
            latex: `\\(${funcTex}\\)`,
            answer: k,
            answerTex: String(k),
            options: [],
            hintTex: [
                `\\text{The domain excludes values where the denominator } = 0`,
                `${q === 1 ? '' : q}x ${r >= 0 ? '+' : '-'} ${Math.abs(r)} = 0 \\implies x = ${MathUtils.fractionTeX(-r, q)}`
            ],
            explain: `<strong>Step 1:</strong> The domain of a rational function excludes all values that make the denominator zero.<br><br>` +
                     `<strong>Step 2:</strong> Set the denominator equal to zero:<br>` +
                     `\\(${q === 1 ? '' : q}x ${r >= 0 ? '+' : '-'} ${Math.abs(r)} = 0\\)<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(x\\):<br>` +
                     `\\(${q === 1 ? '' : q}x = ${-r}\\)<br>` +
                     `\\(x = ${k}\\)<br><br>` +
                     `<strong>Answer:</strong> The domain is \\(x \\in \\mathbb{R},\\ x \\neq ${k}\\).`
        };
    },

    /**
     * 5. qXIntercept - Easy (Free)
     * f(x) = (ax+b)/(cx+d). x-intercept where ax+b=0 → x = -b/a (integer).
     */
    qXIntercept() {
        // Choose a ∈ nonzero, integer xInt = -b/a so b = -xInt*a
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const xInt = MathUtils.randInt(-6, 6);
        const b = -xInt * a;
        const c = MathUtils.nonZeroRandInt(-4, 4);
        let d;
        // Ensure denominator ≠ 0 at x = xInt
        do { d = MathUtils.randInt(-6, 6); } while (c * xInt + d === 0);

        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }
        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const numTex = `${fmtCoeff(a)}x${fmtConst(b)}`;
        const denTex = `${fmtCoeff(c)}x${fmtConst(d)}`;
        const funcTex = `f(x) = \\dfrac{${numTex}}{${denTex}}`;

        return {
            type: 'free',
            rule: 'x-intercept',
            difficulty: 'easy',
            text: 'Find the x-intercept of the rational function below. Give the value of \\(x\\).',
            latex: `\\(${funcTex}\\)`,
            answer: xInt,
            answerTex: String(xInt),
            options: [],
            hintTex: [
                `\\text{At the x-intercept, } f(x) = 0, \\text{ which means the numerator } = 0`,
                `${fmtCoeff(a)}x${fmtConst(b)} = 0 \\implies x = ${MathUtils.fractionTeX(-b, a)}`
            ],
            explain: `<strong>Step 1:</strong> The x-intercept occurs where \\(f(x) = 0\\), i.e. where the numerator equals zero (and the denominator is non-zero).<br><br>` +
                     `<strong>Step 2:</strong> Set the numerator equal to zero:<br>` +
                     `\\(${fmtCoeff(a)}x${fmtConst(b)} = 0\\)<br><br>` +
                     `<strong>Step 3:</strong> Solve:<br>` +
                     `\\(${fmtCoeff(a)}x = ${-b}\\)<br>` +
                     `\\(x = ${xInt}\\)<br><br>` +
                     `<strong>Check:</strong> Denominator at \\(x=${xInt}\\) is \\(${c * xInt + d} \\neq 0\\). ✓`
        };
    },

    /**
     * 6. qYIntercept - Easy (Free)
     * f(x) = (ax+b)/(cx+d) with d≠0. y-intercept = b/d (integer for clean answer).
     */
    qYIntercept() {
        // Ensure b/d is integer: pick d nonzero, yInt integer, b = yInt * d
        const c = MathUtils.nonZeroRandInt(-4, 4);
        let d;
        do { d = MathUtils.nonZeroRandInt(-4, 4); } while (d === 0);
        const yInt = MathUtils.randInt(-5, 5);
        const b = yInt * d;
        const a = MathUtils.nonZeroRandInt(-4, 4);

        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }
        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const numTex = `${fmtCoeff(a)}x${fmtConst(b)}`;
        const denTex = `${fmtCoeff(c)}x${fmtConst(d)}`;
        const funcTex = `f(x) = \\dfrac{${numTex}}{${denTex}}`;

        return {
            type: 'free',
            rule: 'y-intercept',
            difficulty: 'easy',
            text: 'Find the y-intercept of the rational function below. Give the value of \\(y\\).',
            latex: `\\(${funcTex}\\)`,
            answer: yInt,
            answerTex: String(yInt),
            options: [],
            hintTex: [
                `\\text{At the y-intercept, substitute } x = 0`,
                `f(0) = \\dfrac{${a}(0) + ${b}}{${c}(0) + ${d}} = \\dfrac{${b}}{${d}} = ${yInt}`
            ],
            explain: `<strong>Step 1:</strong> The y-intercept occurs where \\(x = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = 0\\):<br>` +
                     `\\(f(0) = \\dfrac{${a}(0) + ${b}}{${c}(0) + ${d}} = \\dfrac{${b}}{${d}}\\)<br><br>` +
                     `<strong>Step 3:</strong> Simplify:<br>` +
                     `\\(f(0) = ${MathUtils.fractionTeX(b, d)} = ${yInt}\\)<br><br>` +
                     `<strong>Answer:</strong> The y-intercept is \\((0,\\ ${yInt})\\).`
        };
    },

    /**
     * 7. qAsymptoteFromGraph - Medium (MC)
     * Given a rational function, state both asymptotes as an ordered pair (v_asym, h_asym).
     * 4 MC options.
     */
    qAsymptoteFromGraph() {
        // Build: vertical asym at x = vA (integer), horizontal asym at y = hA (integer)
        // Use c=1 for simplicity: denominator x - vA → vA = -d/c = -d
        const vA = MathUtils.randInt(-5, 5);      // vertical asymptote x = vA
        const hA = MathUtils.nonZeroRandInt(-4, 4); // horizontal asymptote y = hA (=a/c=a)

        // f(x) = (ax + b)/(x - vA). We need a = hA, so numerator = hA*x + b
        // b can be anything (pick small random)
        const a = hA;
        const c = 1;
        const d = -vA; // so vertical asym = -d/c = vA
        const b = MathUtils.randInt(-4, 4);

        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }
        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const numTex = `${fmtCoeff(a)}x${fmtConst(b)}`;
        // Denominator: x + d_shown where d = -vA
        const denTex = d === 0 ? 'x' : (d > 0 ? `x + ${d}` : `x - ${Math.abs(d)}`);
        const funcTex = `f(x) = \\dfrac{${numTex}}{${denTex}}`;

        const correctTex = `x = ${vA},\\ y = ${hA}`;

        // Distractors: swap them, negate one or both
        const dist1 = `x = ${hA},\\ y = ${vA}`;          // swapped
        const dist2 = `x = ${-vA},\\ y = ${hA}`;          // negated vertical
        const dist3 = `x = ${vA},\\ y = ${-hA}`;          // negated horizontal

        const optionTexts = [correctTex];
        for (const d_opt of [dist1, dist2, dist3]) {
            if (!optionTexts.includes(d_opt)) {
                optionTexts.push(d_opt);
            } else {
                optionTexts.push(`x = ${vA + optionTexts.length},\\ y = ${hA}`);
            }
        }

        const options = optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex: `\\text{Asymptotes: } ${tex}` }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Both Asymptotes',
            difficulty: 'medium',
            text: 'State the vertical and horizontal asymptotes of the function below.',
            latex: `\\(${funcTex}\\)`,
            answer: 1,
            answerTex: `\\text{Asymptotes: } ${correctTex}`,
            options: shuffled,
            hintTex: [
                `\\text{Vertical asymptote: set denominator } = 0 \\Rightarrow ${denTex} = 0`,
                `\\text{Horizontal asymptote: leading coefficient ratio } y = \\frac{${a}}{${c}} = ${hA}`
            ],
            explain: `<strong>Vertical Asymptote:</strong><br>` +
                     `Set the denominator equal to zero: \\(${denTex} = 0\\)<br>` +
                     `\\(x = ${vA}\\)<br><br>` +
                     `<strong>Horizontal Asymptote:</strong><br>` +
                     `Divide numerator and denominator by \\(x\\):<br>` +
                     `As \\(x \\to \\pm\\infty\\), \\(f(x) \\to \\dfrac{${a}}{${c}} = ${hA}\\)<br><br>` +
                     `<strong>Answer:</strong> Vertical asymptote \\(x = ${vA}\\), horizontal asymptote \\(y = ${hA}\\).`
        };
    },

    /**
     * 8. qFindK - Medium (Free)
     * f(x) = (kx + b)/(cx + d) has horizontal asymptote y = h. Find k.
     * Answer: k = h*c (integer by construction).
     */
    qFindK() {
        const c = MathUtils.pick([2, 3, 4]);
        const h = MathUtils.pick([2, 3, 4, -2, -3]);
        const kAnswer = h * c;   // k/c = h → k = h*c

        const b = MathUtils.randInt(-4, 4);
        let d;
        do { d = MathUtils.nonZeroRandInt(-5, 5); } while (d === 0);

        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }
        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }

        const denTex = `${fmtCoeff(c)}x${fmtConst(d)}`;
        const funcTex = `f(x) = \\dfrac{kx ${b >= 0 ? '+' : '-'} ${Math.abs(b)}}{${denTex}}`;

        return {
            type: 'free',
            rule: 'Find Parameter k',
            difficulty: 'medium',
            text: `The function below has a horizontal asymptote at \\(y = ${h}\\). Find the value of \\(k\\).`,
            latex: `\\(${funcTex}\\)`,
            answer: kAnswer,
            answerTex: String(kAnswer),
            options: [],
            hintTex: [
                `\\text{Horizontal asymptote of } \\dfrac{kx+b}{cx+d} \\text{ is } y = \\dfrac{k}{c}`,
                `\\dfrac{k}{${c}} = ${h} \\implies k = ${h} \\times ${c} = ${kAnswer}`
            ],
            explain: `<strong>Step 1:</strong> For a rational function \\(f(x) = \\dfrac{kx + b}{cx + d}\\), the horizontal asymptote is determined by the ratio of leading coefficients:<br>` +
                     `\\(y = \\dfrac{k}{c}\\)<br><br>` +
                     `<strong>Step 2:</strong> We are told \\(y = ${h}\\), and \\(c = ${c}\\):<br>` +
                     `\\(\\dfrac{k}{${c}} = ${h}\\)<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(k\\):<br>` +
                     `\\(k = ${h} \\times ${c} = ${kAnswer}\\)`
        };
    },

    /**
     * 9. qInverseRational - Medium (Free)
     * Find f⁻¹(k): solve (ax+b)/(cx+d) = k for x.
     * x = (kd - b)/(a - kc). Constructed for integer answer.
     */
    qInverseRational() {
        // Parameterise by choosing integer answer xAnswer = (kv*d - b)/(a - kv*c)
        // Easier: pick a,c,d,b and kv such that a - kv*c ≠ 0 and result is integer
        let a, b, c, d, kv, xAnswer, attempts;
        attempts = 0;
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            c = MathUtils.nonZeroRandInt(-4, 4);
            d = MathUtils.nonZeroRandInt(-4, 4);
            b = MathUtils.randInt(-5, 5);
            kv = MathUtils.nonZeroRandInt(-4, 4);
            const num = kv * d - b;
            const den = a - kv * c;
            if (den !== 0 && num % den === 0) {
                xAnswer = num / den;
                break;
            }
            attempts++;
        } while (attempts < 300);

        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }
        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const numTex = `${fmtCoeff(a)}x${fmtConst(b)}`;
        const denTex = `${fmtCoeff(c)}x${fmtConst(d)}`;
        const funcTex = `f(x) = \\dfrac{${numTex}}{${denTex}}`;

        return {
            type: 'free',
            rule: 'Inverse Rational',
            difficulty: 'medium',
            text: `Find \\(f^{-1}(${kv})\\) for the function below. That is, find \\(x\\) such that \\(f(x) = ${kv}\\).`,
            latex: `\\(${funcTex}\\)`,
            answer: xAnswer,
            answerTex: String(xAnswer),
            options: [],
            hintTex: [
                `\\text{Set } f(x) = ${kv}: \\quad \\dfrac{${numTex}}{${denTex}} = ${kv}`,
                `${numTex} = ${kv}(${denTex}) \\implies ${a - kv * c}x = ${kv * d - b} \\implies x = ${xAnswer}`
            ],
            explain: `<strong>Step 1:</strong> Set \\(f(x) = ${kv}\\) and multiply both sides by the denominator:<br>` +
                     `\\(\\dfrac{${numTex}}{${denTex}} = ${kv}\\)<br>` +
                     `\\(${numTex} = ${kv}(${denTex})\\)<br><br>` +
                     `<strong>Step 2:</strong> Expand the right side:<br>` +
                     `\\(${a}x + ${b} = ${kv * c}x + ${kv * d}\\)<br><br>` +
                     `<strong>Step 3:</strong> Collect \\(x\\) terms:<br>` +
                     `\\(${a}x - ${kv * c}x = ${kv * d} - ${b}\\)<br>` +
                     `\\(${a - kv * c}x = ${kv * d - b}\\)<br><br>` +
                     `<strong>Step 4:</strong> Solve:<br>` +
                     `\\(x = \\dfrac{${kv * d - b}}{${a - kv * c}} = ${xAnswer}\\)`
        };
    },

    /**
     * 10. qCompositeRational - Hard (Free)
     * f(x) = (ax+b)/(cx+d), g(x) = ex+f. Find f(g(k)).
     * Compute g(k) = ek+f first, then f(g(k)).
     * Constructed for integer answer.
     */
    qCompositeRational() {
        let a, b, c, d, e, fCoeff, k, gk, num, den, answer, attempts;
        attempts = 0;
        do {
            a = MathUtils.nonZeroRandInt(-3, 3);
            c = MathUtils.nonZeroRandInt(-3, 3);
            d = MathUtils.randInt(-4, 4);
            b = MathUtils.randInt(-4, 4);
            e = MathUtils.nonZeroRandInt(-3, 3);
            fCoeff = MathUtils.randInt(-4, 4);
            k = MathUtils.randInt(-4, 4);

            gk = e * k + fCoeff;
            den = c * gk + d;
            num = a * gk + b;

            if (den !== 0 && num % den === 0) {
                answer = num / den;
                break;
            }
            attempts++;
        } while (attempts < 300);

        function fmtCoeff(n) {
            if (n === 1) return '';
            if (n === -1) return '-';
            return String(n);
        }
        function fmtConst(n) {
            if (n === 0) return '';
            return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
        }

        const fNumTex = `${fmtCoeff(a)}x${fmtConst(b)}`;
        const fDenTex = `${fmtCoeff(c)}x${fmtConst(d)}`;
        const fFuncTex = `f(x) = \\dfrac{${fNumTex}}{${fDenTex}}`;
        const gFuncTex = `g(x) = ${fmtCoeff(e)}x${fmtConst(fCoeff)}`;

        return {
            type: 'free',
            rule: 'Composite Function',
            difficulty: 'hard',
            text: `Given the two functions below, find \\(f(g(${k}))\\).`,
            latex: `\\(${fFuncTex}\\) \\quad\\text{and}\\quad \\(${gFuncTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Step 1: Find } g(${k}) = ${e}(${k}) + ${fCoeff} = ${gk}`,
                `\\text{Step 2: Find } f(${gk}) = \\dfrac{${a}(${gk}) + ${b}}{${c}(${gk}) + ${d}} = \\dfrac{${num}}{${den}}`
            ],
            explain: `<strong>Step 1:</strong> Find \\(g(${k})\\) first:<br>` +
                     `\\(g(${k}) = ${e}(${k}) + ${fCoeff} = ${e * k} + ${fCoeff} = ${gk}\\)<br><br>` +
                     `<strong>Step 2:</strong> Now find \\(f(g(${k})) = f(${gk})\\):<br>` +
                     `\\(f(${gk}) = \\dfrac{${a}(${gk}) + ${b}}{${c}(${gk}) + ${d}}\\)<br><br>` +
                     `<strong>Step 3:</strong> Evaluate numerator and denominator:<br>` +
                     `\\(\\text{Numerator: } ${a * gk} + ${b} = ${num}\\)<br>` +
                     `\\(\\text{Denominator: } ${c * gk} + ${d} = ${den}\\)<br><br>` +
                     `<strong>Step 4:</strong> Simplify:<br>` +
                     `\\(f(g(${k})) = \\dfrac{${num}}{${den}} = ${answer}\\)`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => RATIONAL.qVerticalAsymptote(),   weight: 3 },  // 0 easy
            { fn: () => RATIONAL.qHorizontalAsymptote(), weight: 3 },  // 1 easy
            { fn: () => RATIONAL.qEvaluateRational(),    weight: 3 },  // 2 easy
            { fn: () => RATIONAL.qDomainRational(),      weight: 3 },  // 3 easy
            { fn: () => RATIONAL.qXIntercept(),          weight: 3 },  // 4 easy
            { fn: () => RATIONAL.qYIntercept(),          weight: 3 },  // 5 easy
            { fn: () => RATIONAL.qAsymptoteFromGraph(),  weight: 2 },  // 6 medium
            { fn: () => RATIONAL.qFindK(),               weight: 2 },  // 7 medium
            { fn: () => RATIONAL.qInverseRational(),     weight: 2 },  // 8 medium
            { fn: () => RATIONAL.qCompositeRational(),   weight: 1 }   // 9 hard
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (RATIONAL.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 3, 4, 5].includes(i));
        } else if (RATIONAL.level === 'medium') {
            filtered = pool.filter((_, i) => [6, 7, 8].includes(i));
        } else if (RATIONAL.level === 'hard') {
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
        RATIONAL.score = 0;
        RATIONAL.total = 0;
        RATIONAL.streak = 0;
        RATIONAL.answered = false;
        RATIONAL.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="RATIONAL.unload()">Rational Functions (2.13–2.14)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Rational Functions</h1>
                <p>IB Math AA 2.13–2.14 — Rational functions, asymptotes and key features</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="RATIONAL.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="RATIONAL.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="RATIONAL.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="RATIONAL.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="rat-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="rat-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="rat-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="rat-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="rat-question-card">
                <span class="rule-tag" id="rat-rule"></span>
                <span class="difficulty-tag" id="rat-difficulty"></span>
                <div class="question-text" id="rat-text"></div>
                <div class="question-prompt" id="rat-latex"></div>
                <div id="rat-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="rat-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="rat-feedback">
                <div class="feedback-title" id="rat-feedback-title"></div>
                <div class="feedback-explanation" id="rat-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="rat-hint-btn" onclick="RATIONAL.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="rat-next-btn" onclick="RATIONAL.next()" style="display:none;">Next Question</button>
            </div>
        `;

        RATIONAL.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('functions');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        RATIONAL.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        RATIONAL.score = 0;
        RATIONAL.total = 0;
        RATIONAL.streak = 0;
        RATIONAL.updateStats();
        RATIONAL.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        RATIONAL.answered = false;
        RATIONAL.hintIndex = 0;
        RATIONAL.currentQ = RATIONAL.pickQuestion();
        const q = RATIONAL.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('rat-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('rat-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('rat-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('rat-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('rat-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="RATIONAL.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="rat-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')RATIONAL.checkFree()">
                    <button class="btn btn-primary" onclick="RATIONAL.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('rat-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('rat-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('rat-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('rat-next-btn').style.display = 'none';
        document.getElementById('rat-hint-btn').style.display = '';
        document.getElementById('rat-hint-btn').disabled = false;

        // Render KaTeX
        RATIONAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = RATIONAL.currentQ;
        if (!q || !q.hintTex || RATIONAL.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('rat-hint-box');
        const hintContent = RATIONAL.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[RATIONAL.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        RATIONAL.hintIndex++;

        if (RATIONAL.hintIndex >= q.hintTex.length) {
            document.getElementById('rat-hint-btn').disabled = true;
        }

        RATIONAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (RATIONAL.answered) return;
        RATIONAL.answered = true;
        RATIONAL.total++;

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
            RATIONAL.score++;
            RATIONAL.streak++;
        } else {
            btn.classList.add('incorrect');
            RATIONAL.streak = 0;
        }

        RATIONAL.showFeedback(isCorrect);
        RATIONAL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (RATIONAL.answered) return;

        const inp = document.getElementById('rat-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        RATIONAL.answered = true;
        RATIONAL.total++;
        inp.disabled = true;

        const q = RATIONAL.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            RATIONAL.score++;
            RATIONAL.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            RATIONAL.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        RATIONAL.showFeedback(isCorrect);
        RATIONAL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = RATIONAL.currentQ;
        const fb = document.getElementById('rat-feedback');
        const title = document.getElementById('rat-feedback-title');
        const explanation = document.getElementById('rat-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (RATIONAL.streak > 1) {
                title.textContent = `Correct! (${RATIONAL.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('rat-next-btn').style.display = '';
        document.getElementById('rat-hint-btn').style.display = 'none';

        RATIONAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('rat-score');
        const totalEl = document.getElementById('rat-total');
        const streakEl = document.getElementById('rat-streak');
        const accEl = document.getElementById('rat-accuracy');

        if (scoreEl) scoreEl.textContent = RATIONAL.score;
        if (totalEl) totalEl.textContent = RATIONAL.total;
        if (streakEl) streakEl.textContent = RATIONAL.streak;
        if (accEl) {
            accEl.textContent = RATIONAL.total > 0
                ? Math.round((RATIONAL.score / RATIONAL.total) * 100) + '%'
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
    ACTIVITY_INITS['rational-functions'] = () => RATIONAL.load();
}
