/*
 * polynomials.js - IB Math AA 2.11–2.12: Polynomials
 * Remainder theorem, factor theorem, Vieta's formulas, and roots
 */

const POLYNOMIALS = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    /**
     * Format a polynomial ax³ + bx² + cx + d as LaTeX.
     * Terms with coefficient 0 are omitted.
     */
    polyTeX(a, b, c, d) {
        const terms = [];

        function termStr(coeff, power) {
            if (coeff === 0) return null;
            const xPart = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`;
            if (power === 0) return coeff >= 0 ? `+ ${coeff}` : `- ${Math.abs(coeff)}`;
            if (Math.abs(coeff) === 1) {
                return coeff > 0 ? `+ ${xPart}` : `- ${xPart}`;
            }
            return coeff > 0 ? `+ ${coeff}${xPart}` : `- ${Math.abs(coeff)}${xPart}`;
        }

        // Leading term (degree 3)
        if (a !== 0) {
            const xPart = 'x^{3}';
            if (Math.abs(a) === 1) terms.push(a > 0 ? xPart : `-${xPart}`);
            else terms.push(`${a}${xPart}`);
        }
        // Remaining terms
        const rest = [
            termStr(b, 2),
            termStr(c, 1),
            termStr(d, 0)
        ];
        for (const t of rest) {
            if (t !== null) terms.push(t);
        }

        if (terms.length === 0) return '0';

        // Merge sign of first trailing term into expression
        let result = terms[0];
        for (let i = 1; i < terms.length; i++) {
            result += ` ${terms[i]}`;
        }
        return result;
    },

    /** Evaluate ax³ + bx² + cx + d at x = p */
    evalPoly(a, b, c, d, p) {
        return a * p * p * p + b * p * p + c * p + d;
    },

    /** Sign string: returns " + n", " - |n|", or "" for n=0 */
    signedConst(n) {
        if (n === 0) return '';
        return n > 0 ? ` + ${n}` : ` - ${Math.abs(n)}`;
    },

    /** Format a number with a leading sign for interior of expressions */
    showCoeff(n, power) {
        // returns e.g. "+ 3x²", "- 2x", "+ 5", "- x²"
        if (n === 0) return '';
        const xPart = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`;
        const sign = n > 0 ? '+' : '-';
        const abs = Math.abs(n);
        if (power === 0) return `${sign} ${abs}`;
        if (abs === 1) return `${sign} ${xPart}`;
        return `${sign} ${abs}${xPart}`;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qEvaluatePoly — Easy / Free
     * Evaluate f(x) = ax³ + bx² + cx + d at a small integer p.
     */
    qEvaluatePoly() {
        const a = MathUtils.nonZeroRandInt(-2, 2);
        const b = MathUtils.randInt(-3, 3);
        const c = MathUtils.randInt(-3, 3);
        const d = MathUtils.randInt(-4, 4);
        const p = MathUtils.pick([-2, -1, 1, 2]);

        const answer = POLYNOMIALS.evalPoly(a, b, c, d, p);
        const fTex = POLYNOMIALS.polyTeX(a, b, c, d);

        // Step-by-step substitution breakdown
        const a3 = a * p * p * p;
        const b2 = b * p * p;
        const c1 = c * p;

        return {
            type: 'free',
            rule: 'Evaluate Polynomial',
            difficulty: 'easy',
            text: `Let \\(f(x) = ${fTex}\\). Find \\(f(${p})\\).`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } x = ${p} \\text{ directly into } f(x)`,
                `f(${p}) = ${a}(${p})^3 ${POLYNOMIALS.showCoeff(b, 0)}(${p})^2 ${POLYNOMIALS.showCoeff(c, 0)}(${p}) ${POLYNOMIALS.showCoeff(d, 0)}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = ${p}\\) into \\(f(x) = ${fTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate each term:<br>` +
                     `\\(${a}(${p})^3 = ${a3}\\)<br>` +
                     `\\(${b}(${p})^2 = ${b2}\\)<br>` +
                     `\\(${c}(${p}) = ${c1}\\)<br>` +
                     `constant \\(= ${d}\\)<br><br>` +
                     `<strong>Step 3:</strong> Sum: \\(${a3} + ${b2} + ${c1} + ${d} = ${answer}\\).`
        };
    },

    /**
     * 2. qRemainderTheorem — Easy / Free
     * f(x) divided by (x − a) gives remainder f(a). Compute f(a).
     */
    qRemainderTheorem() {
        const a = MathUtils.pick([1, 2, -1, -2]);
        const b = MathUtils.randInt(-3, 3);
        const c = MathUtils.randInt(-4, 4);
        const d = MathUtils.randInt(-5, 5);
        const p = MathUtils.pick([-2, -1, 1, 2, 3, -3]);

        const answer = POLYNOMIALS.evalPoly(a, b, c, d, p);
        const fTex = POLYNOMIALS.polyTeX(a, b, c, d);

        const divTex = p >= 0 ? `(x - ${p})` : `(x + ${Math.abs(p)})`;

        const a3 = a * p * p * p;
        const b2 = b * p * p;
        const c1 = c * p;

        return {
            type: 'free',
            rule: 'Remainder Theorem',
            difficulty: 'easy',
            text: `Find the remainder when \\(f(x) = ${fTex}\\) is divided by \\(${divTex}\\).`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\textbf{Remainder theorem: } \\text{remainder} = f(${p})`,
                `f(${p}) = ${a}(${p})^3 + ${b}(${p})^2 + ${c}(${p}) + ${d}`
            ],
            explain: `<strong>Remainder Theorem:</strong> When \\(f(x)\\) is divided by \\(${divTex}\\), the remainder equals \\(f(${p})\\).<br><br>` +
                     `<strong>Step 1:</strong> Compute \\(f(${p})\\):<br>` +
                     `\\(${a}(${p})^3 = ${a3}\\)<br>` +
                     `\\(${b}(${p})^2 = ${b2}\\)<br>` +
                     `\\(${c}(${p}) = ${c1}\\)<br>` +
                     `constant \\(= ${d}\\)<br><br>` +
                     `<strong>Step 2:</strong> \\(f(${p}) = ${a3} + ${b2} + ${c1} + ${d} = ${answer}\\).<br><br>` +
                     `<strong>Remainder \\(= ${answer}\\).</strong>`
        };
    },

    /**
     * 3. qFactorCheck — Easy / MC
     * Is (x − k) a factor of f(x)? Check by computing f(k).
     */
    qFactorCheck() {
        const a = MathUtils.pick([1, 1, 1, -1, 2]);
        const k = MathUtils.pick([-3, -2, -1, 1, 2, 3]);

        // Randomly decide if it IS a factor
        const isFactor = MathUtils.pick([true, true, false, false]);
        let b, c, d;

        if (isFactor) {
            // Build f(x) = (x − k) · (ax² + px + q) so f(k) = 0
            const p2 = MathUtils.randInt(-3, 3);
            const q2 = MathUtils.randInt(-3, 3);
            // (x − k)(ax² + p2·x + q2) = ax³ + p2·x² + q2·x − k·ax² − k·p2·x − k·q2
            b = p2 - k * a;
            c = q2 - k * p2;
            d = -k * q2;
        } else {
            // Random coefficients; regenerate if accidentally zero
            b = MathUtils.randInt(-4, 4);
            c = MathUtils.randInt(-4, 4);
            d = MathUtils.nonZeroRandInt(-5, 5);
            // Ensure f(k) ≠ 0
            let safety = 0;
            while (POLYNOMIALS.evalPoly(a, b, c, d, k) === 0 && safety < 20) {
                d = MathUtils.nonZeroRandInt(-5, 5);
                safety++;
            }
        }

        const fk = POLYNOMIALS.evalPoly(a, b, c, d, k);
        const fTex = POLYNOMIALS.polyTeX(a, b, c, d);
        const factorTex = k >= 0 ? `(x - ${k})` : `(x + ${Math.abs(k)})`;

        const correctTex = isFactor
            ? `\\text{Yes — } f(${k}) = ${fk} = 0`
            : `\\text{No — } f(${k}) = ${fk} \\neq 0`;

        const options = MathUtils.shuffle([
            { value: isFactor ? 1 : 0, tex: `\\text{Yes, it is a factor}` },
            { value: isFactor ? 0 : 1, tex: `\\text{No, it is not a factor}` },
            { value: 0, tex: `\\text{Only for positive } k` },
            { value: 0, tex: `\\text{Cannot determine}` }
        ]);

        const a3 = a * k * k * k;
        const b2 = b * k * k;
        const c1 = c * k;

        return {
            type: 'mc',
            rule: 'Factor Check',
            difficulty: 'easy',
            text: `Is \\(${factorTex}\\) a factor of \\(f(x) = ${fTex}\\)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\textbf{Factor theorem: } ${factorTex} \\text{ is a factor} \\iff f(${k}) = 0`,
                `f(${k}) = ${a}(${k})^3 + ${b}(${k})^2 + ${c}(${k}) + ${d} = ${a3} + ${b2} + ${c1} + ${d} = ${fk}`
            ],
            explain: `<strong>Factor Theorem:</strong> \\(${factorTex}\\) is a factor of \\(f(x)\\) if and only if \\(f(${k}) = 0\\).<br><br>` +
                     `<strong>Step 1:</strong> Evaluate \\(f(${k})\\):<br>` +
                     `\\(f(${k}) = ${a}(${k})^3 + ${b}(${k})^2 + ${c}(${k}) + ${d} = ${a3} + ${b2} + ${c1} + ${d} = ${fk}\\).<br><br>` +
                     `<strong>Conclusion:</strong> Since \\(f(${k}) = ${fk}\\) ` +
                     (isFactor ? `\\(= 0\\), \\(${factorTex}\\) <strong>is</strong> a factor.`
                               : `\\(\\neq 0\\), \\(${factorTex}\\) is <strong>not</strong> a factor.`)
        };
    },

    /**
     * 4. qFindKRemainder — Medium / Free
     * f(x) = x³ + kx² + ax + b divided by (x − p) gives remainder r.
     * Find k from f(p) = r  →  k = (r − p³ − a·p − b) / p²
     */
    qFindKRemainder() {
        const p = MathUtils.pick([1, 2, -1]);
        const a = MathUtils.randInt(-4, 4);
        const b = MathUtils.randInt(-5, 5);
        // Choose k as integer, derive r
        const k = MathUtils.randInt(-5, 5);
        const r = p * p * p + k * p * p + a * p + b;

        const fTex = `x^3 + kx^2 ${POLYNOMIALS.showCoeff(a, 1)} ${POLYNOMIALS.showCoeff(b, 0)}`;
        const divTex = p >= 0 ? `(x - ${p})` : `(x + ${Math.abs(p)})`;

        const p3 = p * p * p;
        const ap = a * p;

        return {
            type: 'free',
            rule: 'Find k (Remainder)',
            difficulty: 'medium',
            text: `When \\(f(x) = ${fTex}\\) is divided by \\(${divTex}\\), the remainder is \\(${r}\\). Find \\(k\\).`,
            latex: '',
            answer: k,
            answerTex: String(k),
            options: [],
            hintTex: [
                `\\text{Remainder theorem: } f(${p}) = ${r}`,
                `(${p})^3 + k(${p})^2 + ${a}(${p}) + ${b} = ${r} \\implies ${p3} + ${p * p}k + ${ap} + ${b} = ${r}`
            ],
            explain: `<strong>Step 1:</strong> By the remainder theorem, \\(f(${p}) = ${r}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${p}\\):<br>` +
                     `\\((${p})^3 + k(${p})^2 + ${a}(${p}) + ${b} = ${r}\\)<br>` +
                     `\\(${p3} + ${p * p}k + ${ap} + ${b} = ${r}\\)<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(k\\):<br>` +
                     `\\(${p * p}k = ${r} - ${p3} - ${ap} - ${b} = ${r - p3 - ap - b}\\)<br>` +
                     `\\(k = \\dfrac{${r - p3 - ap - b}}{${p * p}} = ${k}\\).`
        };
    },

    /**
     * 5. qFindKFactor — Medium / Free
     * f(x) = x³ + kx + c has (x − p) as a factor → f(p) = 0.
     * Find k = (−p³ − c) / p
     */
    qFindKFactor() {
        const p = MathUtils.pick([1, 2, -1, -2]);
        // Choose k as integer; construct c = −p³ − k·p so that f(p) = 0
        const k = MathUtils.randInt(-6, 6);
        const c = -p * p * p - k * p;

        const fTex = `x^3 + kx ${POLYNOMIALS.showCoeff(c, 0)}`;
        const factorTex = p >= 0 ? `(x - ${p})` : `(x + ${Math.abs(p)})`;

        const p3 = p * p * p;
        const kp = k * p;

        return {
            type: 'free',
            rule: 'Find k (Factor)',
            difficulty: 'medium',
            text: `\\(${factorTex}\\) is a factor of \\(f(x) = ${fTex}\\). Find \\(k\\).`,
            latex: '',
            answer: k,
            answerTex: String(k),
            options: [],
            hintTex: [
                `\\text{Factor theorem: } f(${p}) = 0`,
                `(${p})^3 + k(${p}) + ${c} = 0 \\implies ${p3} + ${p}k + ${c} = 0`
            ],
            explain: `<strong>Step 1:</strong> By the factor theorem, \\(f(${p}) = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${p}\\):<br>` +
                     `\\((${p})^3 + k(${p}) + ${c} = 0\\)<br>` +
                     `\\(${p3} + ${p}k + ${c} = 0\\)<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(k\\):<br>` +
                     `\\(${p}k = ${-p3 - c}\\)<br>` +
                     `\\(k = \\dfrac{${-p3 - c}}{${p}} = ${k}\\).`
        };
    },

    /**
     * 6. qSumOfRoots — Easy / Free
     * f(x) = ax³ + bx² + cx + d. Sum of roots = −b/a (Vieta's).
     * b is chosen divisible by a for an integer answer.
     */
    qSumOfRoots() {
        const a = MathUtils.pick([1, 2, -1, -2, 3, -3]);
        // Pick integer answer s, then b = −s·a
        const s = MathUtils.randInt(-6, 6);
        const b = -s * a;
        const c = MathUtils.randInt(-5, 5);
        const d = MathUtils.randInt(-5, 5);

        const fTex = POLYNOMIALS.polyTeX(a, b, c, d);

        return {
            type: 'free',
            rule: 'Sum of Roots',
            difficulty: 'easy',
            text: `Find the sum of the roots of \\(f(x) = ${fTex}\\).`,
            latex: `\\text{(Use Vieta's formulas)}`,
            answer: s,
            answerTex: String(s),
            options: [],
            hintTex: [
                `\\text{For } ax^3 + bx^2 + cx + d,\\; \\text{sum of roots} = -\\dfrac{b}{a}`,
                `-\\dfrac{b}{a} = -\\dfrac{${b}}{${a}} = ${s}`
            ],
            explain: `<strong>Vieta's Formula:</strong> For \\(ax^3 + bx^2 + cx + d\\), the sum of the roots is \\(-\\dfrac{b}{a}\\).<br><br>` +
                     `<strong>Step 1:</strong> Identify \\(a = ${a}\\), \\(b = ${b}\\).<br><br>` +
                     `<strong>Step 2:</strong> Sum \\(= -\\dfrac{b}{a} = -\\dfrac{${b}}{${a}} = ${s}\\).`
        };
    },

    /**
     * 7. qProductOfRoots — Easy / Free
     * f(x) = x³ + bx² + cx + d (a = 1). Product of roots = −d (Vieta's).
     */
    qProductOfRoots() {
        const b = MathUtils.randInt(-4, 4);
        const c = MathUtils.randInt(-4, 4);
        const d = MathUtils.nonZeroRandInt(-6, 6);

        const fTex = POLYNOMIALS.polyTeX(1, b, c, d);
        const answer = -d;

        return {
            type: 'free',
            rule: 'Product of Roots',
            difficulty: 'easy',
            text: `Find the product of the roots of \\(f(x) = ${fTex}\\).`,
            latex: `\\text{(Use Vieta's formulas)}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{For } x^3 + bx^2 + cx + d,\\; \\text{product of roots} = -d`,
                `-d = -(${d}) = ${answer}`
            ],
            explain: `<strong>Vieta's Formula:</strong> For a monic cubic \\(x^3 + bx^2 + cx + d\\), the product of the roots equals \\(-d\\).<br><br>` +
                     `<strong>Step 1:</strong> Identify \\(d = ${d}\\).<br><br>` +
                     `<strong>Step 2:</strong> Product \\(= -d = -(${d}) = ${answer}\\).`
        };
    },

    /**
     * 8. qFindCubicFromRoots — Medium / MC
     * Given roots p, q, r, identify the x² coefficient of (x−p)(x−q)(x−r).
     * Coefficient = −(p + q + r).
     */
    qFindCubicFromRoots() {
        const p = MathUtils.randInt(-4, 4);
        const q = MathUtils.randInt(-4, 4);
        let r;
        do { r = MathUtils.randInt(-4, 4); } while (r === p && r === q);

        const coeff = -(p + q + r);   // x² coefficient
        const correctTex = String(coeff);

        // Distractors
        const d1 = p + q + r;          // forgot the minus
        const d2 = p * q + q * r + p * r; // confused with x coefficient (Vieta)
        const d3 = coeff + MathUtils.pick([-2, -1, 1, 2]); // off-by-small

        const optionTexts = [correctTex];
        const candidates = [String(d1), String(d2), String(d3)];
        for (const c of candidates) {
            if (!optionTexts.includes(c)) optionTexts.push(c);
        }
        // Pad if needed
        let pad = -10;
        while (optionTexts.length < 4) {
            const s = String(coeff + pad);
            if (!optionTexts.includes(s)) optionTexts.push(s);
            pad++;
        }

        const options = optionTexts.slice(0, 4).map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        // Full expansion: x² coeff = -(p+q+r), x coeff = pq+qr+pr, const = -pqr
        const xCoeff = p * q + q * r + p * r;
        const constTerm = -(p * q * r);
        const expandedTex = POLYNOMIALS.polyTeX(1, coeff, xCoeff, constTerm);

        return {
            type: 'mc',
            rule: 'Cubic from Roots',
            difficulty: 'medium',
            text: `A cubic polynomial has roots \\(${p}\\), \\(${q}\\), and \\(${r}\\). What is the coefficient of \\(x^2\\)?`,
            latex: `\\text{i.e. find } b \\text{ in } x^3 + bx^2 + \\cdots`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `f(x) = (x - ${p})(x - ${q})(x - ${r})`,
                `\\text{Coefficient of } x^2 = -(${p} + ${q} + ${r}) = -(${p + q + r}) = ${coeff}`
            ],
            explain: `<strong>Step 1:</strong> Write \\(f(x) = (x - ${p})(x - ${q})(x - ${r})\\).<br><br>` +
                     `<strong>Step 2:</strong> When expanded, the \\(x^2\\) coefficient comes from collecting \\(x \\cdot x \\cdot \\text{const}\\) terms across each factor pair:<br>` +
                     `\\(x^2\\text{-coefficient} = -(${p} + ${q} + ${r}) = -(${p + q + r}) = ${coeff}\\).<br><br>` +
                     `<strong>Step 3:</strong> The full expansion is \\(f(x) = ${expandedTex}\\).`
        };
    },

    /**
     * 9. qPolynomialDivision — Hard / Free
     * f(x) = x³ + ax² + bx + c divided by (x − p).
     * Quotient = x² + (a+p)x + (ap+b), remainder = f(p).
     * Find the constant term of the quotient = ap + b.
     */
    qPolynomialDivision() {
        const p = MathUtils.pick([-3, -2, -1, 1, 2, 3]);
        const a = MathUtils.randInt(-4, 4);
        const b = MathUtils.randInt(-5, 5);
        const c = MathUtils.randInt(-5, 5);

        const q1 = a + p;          // x coefficient of quotient
        const q0 = a * p + b;      // constant term of quotient
        const rem = POLYNOMIALS.evalPoly(1, a, b, c, p);

        const fTex = POLYNOMIALS.polyTeX(1, a, b, c);
        const divTex = p >= 0 ? `(x - ${p})` : `(x + ${Math.abs(p)})`;

        // Quotient display
        const quotientTex = `x^2 ${POLYNOMIALS.showCoeff(q1, 1)} ${POLYNOMIALS.showCoeff(q0, 0)}`;

        return {
            type: 'free',
            rule: 'Polynomial Division',
            difficulty: 'hard',
            text: `Divide \\(f(x) = ${fTex}\\) by \\(${divTex}\\). Find the constant term of the quotient.`,
            latex: `\\text{Quotient has form } x^2 + \\alpha x + \\beta\\text{; give } \\beta`,
            answer: q0,
            answerTex: String(q0),
            options: [],
            hintTex: [
                `\\text{Use synthetic/polynomial division. The quotient is } x^2 + (a+p)x + (ap+b)`,
                `a + p = ${a} + ${p} = ${q1}, \\quad ap + b = ${a}(${p}) + ${b} = ${a * p} + ${b} = ${q0}`
            ],
            explain: `<strong>Step 1:</strong> Set up the division. For \\(f(x) = x^3 + ${a}x^2 + ${b}x + ${c}\\) divided by \\(${divTex}\\), the quotient is \\(x^2 + q_1 x + q_0\\).<br><br>` +
                     `<strong>Step 2:</strong> Match coefficients via synthetic division:<br>` +
                     `\\(q_1 = a + p = ${a} + (${p}) = ${q1}\\)<br>` +
                     `\\(q_0 = a \\cdot p + b = ${a}(${p}) + ${b} = ${a * p} + ${b} = ${q0}\\)<br><br>` +
                     `<strong>Step 3:</strong> Verify: remainder \\(= f(${p}) = ${rem}\\).<br><br>` +
                     `<strong>Answer:</strong> Quotient \\(= ${quotientTex}\\), constant term \\(= ${q0}\\).`
        };
    },

    /**
     * 10. qComplexConjugateRoot — Hard / MC
     * If real-coefficient polynomial has root (a + bi), then (a − bi) is also a root.
     * Given cubic with one real root p and complex root (α + βi), find the third root.
     */
    qComplexConjugateRoot() {
        const realRoot = MathUtils.pick([-3, -2, -1, 1, 2, 3]);
        const alpha = MathUtils.pick([1, 2, 3, -1]);
        const beta = MathUtils.pick([1, 2, 3]);   // always positive for display

        const correctRe = alpha;
        const correctIm = -beta;   // conjugate: (α − βi)

        function complexTex(re, im) {
            if (im === 0) return String(re);
            const sign = im > 0 ? '+' : '-';
            const absIm = Math.abs(im);
            const iStr = absIm === 1 ? 'i' : `${absIm}i`;
            return `${re} ${sign} ${iStr}`;
        }

        const correctTex = complexTex(correctRe, correctIm);

        // Distractors
        const d1Tex = complexTex(alpha, beta);    // the given root (forgot conjugate)
        const d2Tex = complexTex(-alpha, beta);   // negated real part
        const d3Tex = complexTex(alpha, 2 * beta); // doubled imaginary

        const optionTexts = [correctTex, d1Tex, d2Tex, d3Tex];

        // Ensure uniqueness
        const finalTexts = [correctTex];
        for (const t of [d1Tex, d2Tex, d3Tex]) {
            if (!finalTexts.includes(t)) finalTexts.push(t);
            else finalTexts.push(complexTex(alpha + finalTexts.length, -beta));
        }
        while (finalTexts.length < 4) {
            finalTexts.push(complexTex(alpha + finalTexts.length, -beta));
        }

        const options = finalTexts.slice(0, 4).map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        const givenComplexTex = complexTex(alpha, beta);

        return {
            type: 'mc',
            rule: 'Complex Conjugate Root',
            difficulty: 'hard',
            text: `A polynomial with real coefficients has roots \\(${realRoot}\\) and \\(${givenComplexTex}\\). What is the third root?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Complex conjugate root theorem: if } ${givenComplexTex} \\text{ is a root, so is its conjugate}`,
                `\\text{Conjugate of } (${givenComplexTex}) = ${correctTex}`
            ],
            explain: `<strong>Complex Conjugate Root Theorem:</strong> If a polynomial has <em>real</em> coefficients and a complex root \\(${givenComplexTex}\\), then its conjugate \\(${correctTex}\\) is also a root.<br><br>` +
                     `<strong>Step 1:</strong> The conjugate of \\(${alpha} + ${beta}i\\) is \\(${alpha} - ${beta}i\\).<br><br>` +
                     `<strong>Step 2:</strong> So the three roots are \\(${realRoot}\\), \\(${givenComplexTex}\\), and \\(${correctTex}\\).<br><br>` +
                     `<strong>Answer: \\(${correctTex}\\).</strong>`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => POLYNOMIALS.qEvaluatePoly(),         weight: 3, diff: 'easy'   },
            { fn: () => POLYNOMIALS.qRemainderTheorem(),     weight: 3, diff: 'easy'   },
            { fn: () => POLYNOMIALS.qFactorCheck(),          weight: 3, diff: 'easy'   },
            { fn: () => POLYNOMIALS.qFindKRemainder(),       weight: 2, diff: 'medium' },
            { fn: () => POLYNOMIALS.qFindKFactor(),          weight: 2, diff: 'medium' },
            { fn: () => POLYNOMIALS.qSumOfRoots(),           weight: 3, diff: 'easy'   },
            { fn: () => POLYNOMIALS.qProductOfRoots(),       weight: 3, diff: 'easy'   },
            { fn: () => POLYNOMIALS.qFindCubicFromRoots(),   weight: 2, diff: 'medium' },
            { fn: () => POLYNOMIALS.qPolynomialDivision(),   weight: 1, diff: 'hard'   },
            { fn: () => POLYNOMIALS.qComplexConjugateRoot(), weight: 1, diff: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (POLYNOMIALS.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (POLYNOMIALS.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (POLYNOMIALS.level === 'hard') {
            filtered = pool.filter(p => p.diff === 'hard');
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
        POLYNOMIALS.score = 0;
        POLYNOMIALS.total = 0;
        POLYNOMIALS.streak = 0;
        POLYNOMIALS.answered = false;
        POLYNOMIALS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="POLYNOMIALS.unload()">Polynomials (2.11–2.12)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Polynomials</h1>
                <p>IB Math AA 2.11–2.12 – Remainder theorem, factor theorem, and roots</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="POLYNOMIALS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="POLYNOMIALS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="POLYNOMIALS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="POLYNOMIALS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="pol-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="pol-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="pol-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="pol-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="pol-question-card">
                <span class="rule-tag"       id="pol-rule"></span>
                <span class="difficulty-tag" id="pol-difficulty"></span>
                <div class="question-text"   id="pol-text"></div>
                <div class="question-prompt" id="pol-latex"></div>
                <div id="pol-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="pol-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="pol-feedback">
                <div class="feedback-title"       id="pol-feedback-title"></div>
                <div class="feedback-explanation" id="pol-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="pol-hint-btn" onclick="POLYNOMIALS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pol-next-btn" onclick="POLYNOMIALS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        POLYNOMIALS.next();
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
        POLYNOMIALS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        POLYNOMIALS.score = 0;
        POLYNOMIALS.total = 0;
        POLYNOMIALS.streak = 0;
        POLYNOMIALS.updateStats();
        POLYNOMIALS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        POLYNOMIALS.answered = false;
        POLYNOMIALS.hintIndex = 0;
        POLYNOMIALS.currentQ = POLYNOMIALS.pickQuestion();
        const q = POLYNOMIALS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('pol-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('pol-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('pol-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('pol-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('pol-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="POLYNOMIALS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="pol-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')POLYNOMIALS.checkFree()">
                    <button class="btn btn-primary" onclick="POLYNOMIALS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('pol-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('pol-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('pol-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('pol-next-btn').style.display = 'none';
        document.getElementById('pol-hint-btn').style.display = '';
        document.getElementById('pol-hint-btn').disabled = false;

        // Render KaTeX
        POLYNOMIALS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = POLYNOMIALS.currentQ;
        if (!q || !q.hintTex || POLYNOMIALS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('pol-hint-box');
        const hintContent = POLYNOMIALS.hintIndex === 0
            ? ''
            : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[POLYNOMIALS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        POLYNOMIALS.hintIndex++;

        if (POLYNOMIALS.hintIndex >= q.hintTex.length) {
            document.getElementById('pol-hint-btn').disabled = true;
        }

        POLYNOMIALS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (POLYNOMIALS.answered) return;
        POLYNOMIALS.answered = true;
        POLYNOMIALS.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        // Disable all buttons and highlight correct
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            POLYNOMIALS.score++;
            POLYNOMIALS.streak++;
        } else {
            btn.classList.add('incorrect');
            POLYNOMIALS.streak = 0;
        }

        POLYNOMIALS.showFeedback(isCorrect);
        POLYNOMIALS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (POLYNOMIALS.answered) return;

        const inp = document.getElementById('pol-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        POLYNOMIALS.answered = true;
        POLYNOMIALS.total++;
        inp.disabled = true;

        const q = POLYNOMIALS.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            POLYNOMIALS.score++;
            POLYNOMIALS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            POLYNOMIALS.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        POLYNOMIALS.showFeedback(isCorrect);
        POLYNOMIALS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = POLYNOMIALS.currentQ;
        const fb = document.getElementById('pol-feedback');
        const title = document.getElementById('pol-feedback-title');
        const explanation = document.getElementById('pol-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = POLYNOMIALS.streak > 1
                ? `Correct! (${POLYNOMIALS.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('pol-next-btn').style.display = '';
        document.getElementById('pol-hint-btn').style.display = 'none';

        POLYNOMIALS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('pol-score');
        const totalEl  = document.getElementById('pol-total');
        const streakEl = document.getElementById('pol-streak');
        const accEl    = document.getElementById('pol-accuracy');

        if (scoreEl)  scoreEl.textContent  = POLYNOMIALS.score;
        if (totalEl)  totalEl.textContent  = POLYNOMIALS.total;
        if (streakEl) streakEl.textContent = POLYNOMIALS.streak;
        if (accEl) {
            accEl.textContent = POLYNOMIALS.total > 0
                ? Math.round((POLYNOMIALS.score / POLYNOMIALS.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['polynomials'] = () => POLYNOMIALS.load();
