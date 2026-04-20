/*
 * limits-lhopital.js - IB Math AA 5.16–5.17: Limits and L'Hôpital's Rule
 * Evaluating limits algebraically, indeterminate forms, L'Hôpital's rule,
 * limits at infinity, standard limits.
 */

const LHOPITAL = {
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
     * 1. qLimitBySubstitution - Easy (Free)
     * lim(x→a) of ax²+bx+c, just substitute. Answer is an integer.
     */
    qLimitBySubstitution() {
        const a = MathUtils.pick([1, 2, 3]);          // x-value to approach
        const A = MathUtils.randInt(-4, 4);           // coefficient of x²
        const B = MathUtils.randInt(-5, 5);           // coefficient of x
        const C = MathUtils.randInt(-6, 6);           // constant

        const answer = A * a * a + B * a + C;

        // Build polynomial display string
        function polyTeX(A, B, C) {
            let terms = [];
            if (A !== 0) {
                if (A === 1)       terms.push('x^2');
                else if (A === -1) terms.push('-x^2');
                else               terms.push(`${A}x^2`);
            }
            if (B !== 0) {
                if (terms.length === 0) {
                    if (B === 1)       terms.push('x');
                    else if (B === -1) terms.push('-x');
                    else               terms.push(`${B}x`);
                } else {
                    if (B === 1)       terms.push('+ x');
                    else if (B === -1) terms.push('- x');
                    else if (B > 0)    terms.push(`+ ${B}x`);
                    else               terms.push(`- ${Math.abs(B)}x`);
                }
            }
            if (C !== 0) {
                if (terms.length === 0) {
                    terms.push(`${C}`);
                } else {
                    if (C > 0) terms.push(`+ ${C}`);
                    else       terms.push(`- ${Math.abs(C)}`);
                }
            }
            if (terms.length === 0) terms.push('0');
            return terms.join(' ');
        }

        const pTeX = polyTeX(A, B, C);

        return {
            type: 'free',
            rule: 'Limit by Substitution',
            difficulty: 'easy',
            text: 'Evaluate the limit by direct substitution.',
            latex: `\\(\\displaystyle\\lim_{x \\to ${a}} \\left(${pTeX}\\right)\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{The polynomial is continuous everywhere — just substitute } x = ${a}`,
                `${pTeX}\\Big|_{x=${a}} = ${A}(${a})^2 + ${B}(${a}) + ${C} = ${A * a * a} + ${B * a} + ${C} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Since a polynomial is continuous for all \\(x\\), the limit equals the function value at \\(x = ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${a}\\):<br>` +
                     `\\(${A}(${a})^2 + ${B}(${a}) + ${C} = ${A * a * a} + ${B * a} + ${C} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${answer}\\).`
        };
    },

    /**
     * 2. qLimitRational - Easy (Free)
     * lim(x→∞) (ax+b)/(cx+d) = a/c. Answer may be a fraction.
     */
    qLimitRational() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-5, 5);
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const d = MathUtils.randInt(-5, 5);

        const [rn, rd] = MathUtils.simplifyFraction(a, c);
        const answer = rn / rd;
        const answerTex = MathUtils.fractionTeX(a, c);

        // Format sign of b and d for display
        function signedConst(k) {
            if (k === 0) return '';
            return k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        }

        const numTeX = `${a}x${signedConst(b)}`;
        const denTeX = `${c}x${signedConst(d)}`;

        return {
            type: 'free',
            rule: 'Limit at Infinity (Rational)',
            difficulty: 'easy',
            text: 'Evaluate the limit as \\(x \\to \\infty\\).',
            latex: `\\(\\displaystyle\\lim_{x \\to \\infty} \\frac{${numTeX}}{${denTeX}}\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Divide numerator and denominator by } x`,
                `\\frac{${a} + ${b}/x}{${c} + ${d}/x} \\xrightarrow{x\\to\\infty} \\frac{${a}}{${c}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Divide every term by \\(x\\):<br>` +
                     `\\(\\dfrac{${a} + \\tfrac{${b}}{x}}{${c} + \\tfrac{${d}}{x}}\\).<br><br>` +
                     `<strong>Step 2:</strong> As \\(x \\to \\infty\\), the terms \\(\\tfrac{${b}}{x}\\) and \\(\\tfrac{${d}}{x}\\) both tend to 0.<br><br>` +
                     `<strong>Step 3:</strong> The limit equals \\(\\dfrac{${a}}{${c}} = ${answerTex}\\).`
        };
    },

    /**
     * 3. qIndeterminateForm - Easy (MC)
     * What indeterminate form does lim(x→2) (x²-4)/(x-2) give before factoring?
     */
    qIndeterminateForm() {
        // Always 0/0 here; randomise the value a ∈ {2,3,4}
        const a = MathUtils.pick([2, 3, 4]);
        // Numerator x²-a², denominator x-a → gives 0/0 at x=a
        const numTeX = `x^2 - ${a * a}`;
        const denTeX = `x - ${a}`;

        // Correct answer
        const correctTex = '\\dfrac{0}{0}';

        const options = MathUtils.shuffle([
            { value: 1, tex: '\\dfrac{0}{0}' },
            { value: 0, tex: '\\dfrac{1}{0}' },
            { value: 0, tex: '\\dfrac{\\infty}{\\infty}' },
            { value: 0, tex: '\\dfrac{' + (a * a) + '}{0}' }
        ]);

        return {
            type: 'mc',
            rule: 'Indeterminate Form',
            difficulty: 'easy',
            text: `What indeterminate form appears when you substitute \\(x = ${a}\\) directly into the expression below?`,
            latex: `\\(\\displaystyle\\lim_{x \\to ${a}} \\frac{${numTeX}}{${denTeX}}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Substitute } x = ${a} \\text{ into numerator and denominator separately}`,
                `\\text{Numerator: } ${a}^2 - ${a * a} = 0 \\qquad \\text{Denominator: } ${a} - ${a} = 0`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = ${a}\\) into the numerator: \\(${a}^2 - ${a * a} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${a}\\) into the denominator: \\(${a} - ${a} = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> This gives the indeterminate form \\(\\dfrac{0}{0}\\). We must factor or apply L'Hôpital's rule to evaluate the limit properly.`
        };
    },

    /**
     * 4. qLHopitalSimple - Medium (Free)
     * lim(x→0) sin(ax)/x = a  OR  lim(x→0) (e^(ax)-1)/x = a.
     * Standard limit results.
     */
    qLHopitalSimple() {
        const a = MathUtils.pick([2, 3, 4, 5]);
        const useSin = MathUtils.randInt(0, 1) === 0;

        if (useSin) {
            return {
                type: 'free',
                rule: "L'Hôpital / Standard Limit",
                difficulty: 'medium',
                text: 'Evaluate the limit using the standard result \\(\\lim_{x\\to 0}\\dfrac{\\sin x}{x} = 1\\), or by applying L\'Hôpital\'s rule.',
                latex: `\\(\\displaystyle\\lim_{x \\to 0} \\frac{\\sin(${a}x)}{x}\\)`,
                answer: a,
                answerTex: String(a),
                options: [],
                hintTex: [
                    `\\text{Write } \\frac{\\sin(${a}x)}{x} = ${a} \\cdot \\frac{\\sin(${a}x)}{${a}x}`,
                    `\\text{As } x\\to 0,\\; \\frac{\\sin(${a}x)}{${a}x} \\to 1,\\; \\text{so the limit is } ${a} \\cdot 1 = ${a}`
                ],
                explain: `<strong>Step 1:</strong> Rewrite:<br>` +
                         `\\(\\dfrac{\\sin(${a}x)}{x} = ${a}\\cdot\\dfrac{\\sin(${a}x)}{${a}x}\\).<br><br>` +
                         `<strong>Step 2:</strong> Let \\(u = ${a}x\\). As \\(x \\to 0\\), \\(u \\to 0\\), and \\(\\dfrac{\\sin u}{u} \\to 1\\).<br><br>` +
                         `<strong>Step 3:</strong> Therefore the limit is \\(${a} \\times 1 = ${a}\\).<br><br>` +
                         `<em>Alternatively by L'Hôpital (\\(\\frac{0}{0}\\) form): differentiate top and bottom:</em><br>` +
                         `\\(\\lim_{x\\to 0}\\dfrac{${a}\\cos(${a}x)}{1} = ${a}\\cos(0) = ${a}\\).`
            };
        } else {
            return {
                type: 'free',
                rule: "L'Hôpital / Standard Limit",
                difficulty: 'medium',
                text: "Evaluate the limit. This is a \\(0/0\\) indeterminate form — use L'Hôpital's rule or the standard exponential limit.",
                latex: `\\(\\displaystyle\\lim_{x \\to 0} \\frac{e^{${a}x} - 1}{x}\\)`,
                answer: a,
                answerTex: String(a),
                options: [],
                hintTex: [
                    `\\text{At } x=0: \\text{numerator } e^0 - 1 = 0,\\text{ denominator } 0 \\implies \\tfrac{0}{0} \\text{ form}`,
                    `\\text{Apply L'Hôpital: differentiate top and bottom} \\implies \\frac{${a}e^{${a}x}}{1} \\to ${a}`
                ],
                explain: `<strong>Step 1:</strong> At \\(x = 0\\): numerator \\(e^0 - 1 = 0\\), denominator \\(0\\) — this is the \\(\\frac{0}{0}\\) form.<br><br>` +
                         `<strong>Step 2:</strong> Apply L'Hôpital's rule. Differentiate numerator: \\(${a}e^{${a}x}\\). Differentiate denominator: \\(1\\).<br><br>` +
                         `<strong>Step 3:</strong> \\(\\lim_{x\\to 0}\\dfrac{${a}e^{${a}x}}{1} = ${a}e^0 = ${a}\\).`
            };
        }
    },

    /**
     * 5. qLHopitalPolynomial - Medium (Free)
     * lim(x→a) (x²-a²)/(x-a) = 2a via factoring or L'Hôpital.
     */
    qLHopitalPolynomial() {
        const a = MathUtils.pick([2, 3, 4, 5]);
        const answer = 2 * a;
        const a2 = a * a;

        return {
            type: 'free',
            rule: "Factoring / L'Hôpital",
            difficulty: 'medium',
            text: "Evaluate the limit by factoring the numerator (or by applying L'Hôpital's rule).",
            latex: `\\(\\displaystyle\\lim_{x \\to ${a}} \\frac{x^2 - ${a2}}{x - ${a}}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Factor the numerator: } x^2 - ${a2} = (x - ${a})(x + ${a})`,
                `\\frac{(x-${a})(x+${a})}{x-${a}} = x + ${a} \\xrightarrow{x\\to ${a}} ${a} + ${a} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Substituting \\(x = ${a}\\) gives \\(\\dfrac{0}{0}\\) — an indeterminate form.<br><br>` +
                     `<strong>Step 2:</strong> Factor the numerator using the difference of squares:<br>` +
                     `\\(x^2 - ${a2} = (x - ${a})(x + ${a})\\).<br><br>` +
                     `<strong>Step 3:</strong> Cancel the common factor \\((x - ${a})\\) (valid for \\(x \\neq ${a}\\)):<br>` +
                     `\\(\\dfrac{(x-${a})(x+${a})}{x-${a}} = x + ${a}\\).<br><br>` +
                     `<strong>Step 4:</strong> Take the limit: \\(\\lim_{x\\to ${a}}(x + ${a}) = ${a} + ${a} = ${answer}\\).<br><br>` +
                     `<em>L'Hôpital check: differentiate top (\\(2x\\)) and bottom (\\(1\\)): \\(2(${a}) = ${answer}\\). ✓</em>`
        };
    },

    /**
     * 6. qLHopitalApply - Medium (Free)
     * lim(x→0) (ax² + bx)/(cx) = b/c.
     * Factor x from numerator: x(ax+b)/(cx) = (ax+b)/c → b/c.
     */
    qLHopitalApply() {
        // Choose b and c so b/c is a simple number (integer or .5)
        const c = MathUtils.pick([2, 3, 4, 5]);
        // b a multiple of c so quotient is integer, or just pick nice pairs
        const bMultiples = [1, 2, 3, 4, 5, 6].map(k => k * c);
        const b = MathUtils.pick(bMultiples);
        const A = MathUtils.nonZeroRandInt(-3, 3);   // coeff of x² (doesn't affect answer)

        const [rn, rd] = MathUtils.simplifyFraction(b, c);
        const answer = rn / rd;
        const answerTex = MathUtils.fractionTeX(b, c);

        function signedTerm(coeff, varStr) {
            if (coeff === 0) return '';
            if (coeff === 1) return `+ ${varStr}`;
            if (coeff === -1) return `- ${varStr}`;
            if (coeff > 0) return `+ ${coeff}${varStr}`;
            return `- ${Math.abs(coeff)}${varStr}`;
        }

        const numTeX = A !== 0
            ? `${A}x^2 ${signedTerm(b, 'x')}`
            : `${b}x`;
        const denTeX = `${c}x`;

        return {
            type: 'free',
            rule: "L'Hôpital / Factoring",
            difficulty: 'medium',
            text: 'Evaluate the limit by factoring \\(x\\) from the numerator.',
            latex: `\\(\\displaystyle\\lim_{x \\to 0} \\frac{${numTeX}}{${denTeX}}\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Factor } x \\text{ from the numerator: } ${numTeX} = x(${A}x + ${b})`,
                `\\frac{x(${A}x + ${b})}{${c}x} = \\frac{${A}x + ${b}}{${c}} \\xrightarrow{x\\to 0} \\frac{${b}}{${c}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Substituting \\(x = 0\\) gives \\(\\dfrac{0}{0}\\).<br><br>` +
                     `<strong>Step 2:</strong> Factor \\(x\\) from the numerator:<br>` +
                     `\\(${numTeX} = x(${A}x + ${b})\\).<br><br>` +
                     `<strong>Step 3:</strong> Cancel \\(x\\) (valid for \\(x \\neq 0\\)):<br>` +
                     `\\(\\dfrac{x(${A}x + ${b})}{${c}x} = \\dfrac{${A}x + ${b}}{${c}}\\).<br><br>` +
                     `<strong>Step 4:</strong> Take the limit: \\(\\dfrac{${A}(0) + ${b}}{${c}} = \\dfrac{${b}}{${c}} = ${answerTex}\\).`
        };
    },

    /**
     * 7. qLimitAtInfinity - Easy (MC)
     * lim(x→∞) (ax²+bx)/(cx²+d) = a/c.
     */
    qLimitAtInfinity() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-5, 5);
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const d = MathUtils.nonZeroRandInt(-5, 5);

        const correctTex = MathUtils.fractionTeX(a, c);
        const answer_val = a / c;

        // Distractors: b/d, a/d, c/a
        function mkOpt(n, denom) {
            return MathUtils.fractionTeX(n, denom);
        }

        const allOpts = [
            { value: 1, tex: correctTex },                    // a/c — correct
            { value: 0, tex: mkOpt(b, d) },                   // b/d — wrong
            { value: 0, tex: mkOpt(a, d) },                   // a/d — wrong
            { value: 0, tex: mkOpt(c, a) }                    // c/a — reciprocal error
        ];

        // Deduplicate (avoid identical strings)
        const seen = new Set([correctTex]);
        const final = [allOpts[0]];
        for (let i = 1; i < allOpts.length; i++) {
            if (!seen.has(allOpts[i].tex)) {
                seen.add(allOpts[i].tex);
                final.push(allOpts[i]);
            } else {
                // Replace with offset
                const offTex = mkOpt(a + final.length, c);
                if (!seen.has(offTex)) {
                    seen.add(offTex);
                    final.push({ value: 0, tex: offTex });
                }
            }
        }
        while (final.length < 4) {
            const t = mkOpt(a + final.length * 2, c);
            if (!seen.has(t)) { seen.add(t); final.push({ value: 0, tex: t }); }
        }

        const shuffled = MathUtils.shuffle(final);

        // Display sign of b and d
        function signed(k) { return k > 0 ? `+ ${k}` : `- ${Math.abs(k)}`; }

        const numTeX = `${a}x^2 ${signed(b)}x`;
        const denTeX = `${c}x^2 ${signed(d)}`;

        return {
            type: 'mc',
            rule: 'Limit at Infinity',
            difficulty: 'easy',
            text: 'Evaluate the limit as \\(x \\to \\infty\\). (For rational functions with equal degree, divide by the highest power.)',
            latex: `\\(\\displaystyle\\lim_{x \\to \\infty} \\frac{${numTeX}}{${denTeX}}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Divide every term by } x^2 \\text{ (the highest power)}`,
                `\\frac{${a} + ${b}/x}{${c} + ${d}/x^2} \\xrightarrow{x\\to\\infty} \\frac{${a}}{${c}} = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Divide numerator and denominator by \\(x^2\\) (highest power):<br>` +
                     `\\(\\dfrac{${a} + \\tfrac{${b}}{x}}{${c} + \\tfrac{${d}}{x^2}}\\).<br><br>` +
                     `<strong>Step 2:</strong> As \\(x \\to \\infty\\), \\(\\tfrac{${b}}{x} \\to 0\\) and \\(\\tfrac{${d}}{x^2} \\to 0\\).<br><br>` +
                     `<strong>Step 3:</strong> The limit is \\(\\dfrac{${a}}{${c}} = ${correctTex}\\).`
        };
    },

    /**
     * 8. qLHopitalTwice - Hard (Free)
     * lim(x→0) (1 - cos x)/x². Apply L'H once → sin x / 2x (still 0/0).
     * Apply again → cos x / 2 → 1/2. Answer = 0.5.
     */
    qLHopitalTwice() {
        return {
            type: 'free',
            rule: "L'Hôpital (Applied Twice)",
            difficulty: 'hard',
            text: "Evaluate the limit. You will need to apply L'Hôpital's rule <strong>twice</strong>.",
            latex: `\\(\\displaystyle\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}\\)`,
            answer: 0.5,
            answerTex: '\\dfrac{1}{2}',
            options: [],
            hintTex: [
                `\\text{At } x=0: \\frac{1-\\cos 0}{0^2} = \\frac{0}{0} \\implies \\text{apply L'Hôpital}`,
                `\\frac{d}{dx}(1-\\cos x) = \\sin x,\\quad \\frac{d}{dx}(x^2) = 2x \\implies \\frac{\\sin x}{2x} \\to \\frac{0}{0} \\text{ again}`,
                `\\frac{d}{dx}(\\sin x) = \\cos x,\\quad \\frac{d}{dx}(2x) = 2 \\implies \\frac{\\cos x}{2} \\xrightarrow{x\\to 0} \\frac{1}{2}`
            ],
            explain: `<strong>Step 1:</strong> At \\(x = 0\\): numerator \\(1 - \\cos 0 = 0\\), denominator \\(0^2 = 0\\) — this is \\(\\frac{0}{0}\\).<br><br>` +
                     `<strong>Step 2 (First L'Hôpital):</strong> Differentiate numerator and denominator:<br>` +
                     `\\(\\dfrac{\\sin x}{2x}\\). At \\(x = 0\\) this is still \\(\\frac{0}{0}\\).<br><br>` +
                     `<strong>Step 3 (Second L'Hôpital):</strong> Differentiate again:<br>` +
                     `\\(\\dfrac{\\cos x}{2}\\).<br><br>` +
                     `<strong>Step 4:</strong> Now substitute \\(x = 0\\):<br>` +
                     `\\(\\dfrac{\\cos 0}{2} = \\dfrac{1}{2} = 0.5\\).`
        };
    },

    /**
     * 9. qSqueeze - Medium (MC)
     * lim(x→0) x·sin(1/x). Squeeze theorem: |x·sin(1/x)| ≤ |x| → 0.
     */
    qSqueeze() {
        const options = MathUtils.shuffle([
            { value: 1, tex: '0' },
            { value: 0, tex: '1' },
            { value: 0, tex: "\\text{Does not exist}" },
            { value: 0, tex: '\\infty' }
        ]);

        return {
            type: 'mc',
            rule: 'Squeeze Theorem',
            difficulty: 'medium',
            text: 'Evaluate the limit. (Hint: think about what values \\(\\sin\\left(\\tfrac{1}{x}\\right)\\) can take, and apply the Squeeze Theorem.)',
            latex: `\\(\\displaystyle\\lim_{x \\to 0}\\, x\\sin\\!\\left(\\frac{1}{x}\\right)\\)`,
            answer: 1,
            answerTex: '0',
            options: options,
            hintTex: [
                `-1 \\leq \\sin\\!\\left(\\tfrac{1}{x}\\right) \\leq 1 \\implies -|x| \\leq x\\sin\\!\\left(\\tfrac{1}{x}\\right) \\leq |x|`,
                `\\text{Since } \\lim_{x\\to 0}|x| = 0, \\text{ by the Squeeze Theorem the limit is } 0`
            ],
            explain: `<strong>Step 1:</strong> Note that \\(\\sin\\left(\\tfrac{1}{x}\\right)\\) is bounded: \\(-1 \\leq \\sin\\left(\\tfrac{1}{x}\\right) \\leq 1\\) for all \\(x \\neq 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Multiply through by \\(|x| \\geq 0\\):<br>` +
                     `\\(-|x| \\leq x\\sin\\!\\left(\\tfrac{1}{x}\\right) \\leq |x|\\).<br><br>` +
                     `<strong>Step 3:</strong> As \\(x \\to 0\\), both \\(-|x| \\to 0\\) and \\(|x| \\to 0\\).<br><br>` +
                     `<strong>Step 4 (Squeeze Theorem):</strong> The expression is squeezed between two quantities both tending to \\(0\\), so the limit is \\(\\mathbf{0}\\).`
        };
    },

    /**
     * 10. qLimitFactoring - Medium (Free)
     * lim(x→a) (x²+(b-a)x - ab)/(x-a).
     * Numerator factors as (x-a)(x+b). Cancel → x+b → a+b.
     */
    qLimitFactoring() {
        const a = MathUtils.pick([1, 2, 3]);
        const b = MathUtils.pick([2, 3, 4, 5]);

        const answer = a + b;

        // Coefficients for expanded numerator: x²+(b-a)x - ab
        const linearCoeff = b - a;
        const constTerm = -(a * b);

        function signedConst(k) {
            if (k === 0) return '';
            if (k > 0) return `+ ${k}`;
            return `- ${Math.abs(k)}`;
        }

        const numTeX = `x^2 ${signedConst(linearCoeff)}x ${signedConst(constTerm)}`;
        const denTeX = `x - ${a}`;

        return {
            type: 'free',
            rule: 'Limit by Factoring',
            difficulty: 'medium',
            text: 'Evaluate the limit by factoring the numerator.',
            latex: `\\(\\displaystyle\\lim_{x \\to ${a}} \\frac{${numTeX}}{${denTeX}}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Factor the numerator: } ${numTeX} = (x - ${a})(x + ${b})`,
                `\\frac{(x-${a})(x+${b})}{x-${a}} = x + ${b} \\xrightarrow{x\\to${a}} ${a} + ${b} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Substituting \\(x = ${a}\\) gives \\(\\dfrac{0}{0}\\) — an indeterminate form.<br><br>` +
                     `<strong>Step 2:</strong> Factor the numerator. We need two numbers that multiply to \\(${constTerm}\\) and add to \\(${linearCoeff}\\): those are \\(-${a}\\) and \\(+${b}\\).<br>` +
                     `\\(${numTeX} = (x - ${a})(x + ${b})\\).<br><br>` +
                     `<strong>Step 3:</strong> Cancel the common factor \\((x - ${a})\\):<br>` +
                     `\\(\\dfrac{(x-${a})(x+${b})}{x-${a}} = x + ${b}\\quad (x \\neq ${a})\\).<br><br>` +
                     `<strong>Step 4:</strong> Take the limit: \\(${a} + ${b} = ${answer}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => LHOPITAL.qLimitBySubstitution(), weight: 3 },  // 0 — easy
            { fn: () => LHOPITAL.qLimitRational(),        weight: 3 },  // 1 — easy
            { fn: () => LHOPITAL.qIndeterminateForm(),    weight: 3 },  // 2 — easy
            { fn: () => LHOPITAL.qLHopitalSimple(),       weight: 2 },  // 3 — medium
            { fn: () => LHOPITAL.qLHopitalPolynomial(),   weight: 2 },  // 4 — medium
            { fn: () => LHOPITAL.qLHopitalApply(),        weight: 2 },  // 5 — medium
            { fn: () => LHOPITAL.qLimitAtInfinity(),      weight: 3 },  // 6 — easy
            { fn: () => LHOPITAL.qLHopitalTwice(),        weight: 1 },  // 7 — hard
            { fn: () => LHOPITAL.qSqueeze(),              weight: 2 },  // 8 — medium
            { fn: () => LHOPITAL.qLimitFactoring(),       weight: 2 }   // 9 — medium
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (LHOPITAL.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 6].includes(i));
        } else if (LHOPITAL.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 4, 5, 8, 9].includes(i));
        } else if (LHOPITAL.level === 'hard') {
            filtered = pool.filter((_, i) => [7].includes(i));
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
        LHOPITAL.score = 0;
        LHOPITAL.total = 0;
        LHOPITAL.streak = 0;
        LHOPITAL.answered = false;
        LHOPITAL.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="LHOPITAL.unload()">Limits &amp; L\'H\u00f4pital (5.16\u20135.17)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Limits &amp; L\'H\u00f4pital\'s Rule</h1>
                <p>IB Math AA 5.16&ndash;5.17 &mdash; Indeterminate forms and L\'H\u00f4pital\'s rule</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="LHOPITAL.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="LHOPITAL.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="LHOPITAL.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="LHOPITAL.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="lhop-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="lhop-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="lhop-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="lhop-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="lhop-question-card">
                <span class="rule-tag"       id="lhop-rule"></span>
                <span class="difficulty-tag" id="lhop-difficulty"></span>
                <div class="question-text"   id="lhop-text"></div>
                <div class="question-prompt" id="lhop-latex"></div>
                <div id="lhop-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="lhop-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="lhop-feedback">
                <div class="feedback-title"       id="lhop-feedback-title"></div>
                <div class="feedback-explanation" id="lhop-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="lhop-hint-btn" onclick="LHOPITAL.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="lhop-next-btn" onclick="LHOPITAL.next()" style="display:none;">Next Question</button>
            </div>
        `;

        LHOPITAL.next();
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
        LHOPITAL.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        LHOPITAL.score = 0;
        LHOPITAL.total = 0;
        LHOPITAL.streak = 0;
        LHOPITAL.updateStats();
        LHOPITAL.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        LHOPITAL.answered = false;
        LHOPITAL.hintIndex = 0;
        LHOPITAL.currentQ = LHOPITAL.pickQuestion();
        const q = LHOPITAL.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('lhop-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('lhop-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('lhop-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('lhop-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('lhop-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="LHOPITAL.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="lhop-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')LHOPITAL.checkFree()">
                    <button class="btn btn-primary" onclick="LHOPITAL.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('lhop-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('lhop-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('lhop-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('lhop-next-btn').style.display = 'none';
        document.getElementById('lhop-hint-btn').style.display = '';
        document.getElementById('lhop-hint-btn').disabled = false;

        // Render KaTeX
        LHOPITAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = LHOPITAL.currentQ;
        if (!q || !q.hintTex || LHOPITAL.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('lhop-hint-box');
        const hintContent = LHOPITAL.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[LHOPITAL.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        LHOPITAL.hintIndex++;

        if (LHOPITAL.hintIndex >= q.hintTex.length) {
            document.getElementById('lhop-hint-btn').disabled = true;
        }

        LHOPITAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (LHOPITAL.answered) return;
        LHOPITAL.answered = true;
        LHOPITAL.total++;

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
            LHOPITAL.score++;
            LHOPITAL.streak++;
        } else {
            btn.classList.add('incorrect');
            LHOPITAL.streak = 0;
        }

        LHOPITAL.showFeedback(isCorrect);
        LHOPITAL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (LHOPITAL.answered) return;

        const inp = document.getElementById('lhop-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        LHOPITAL.answered = true;
        LHOPITAL.total++;
        inp.disabled = true;

        const q = LHOPITAL.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            LHOPITAL.score++;
            LHOPITAL.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            LHOPITAL.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        LHOPITAL.showFeedback(isCorrect);
        LHOPITAL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = LHOPITAL.currentQ;
        const fb    = document.getElementById('lhop-feedback');
        const title = document.getElementById('lhop-feedback-title');
        const explanation = document.getElementById('lhop-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (LHOPITAL.streak > 1) {
                title.textContent = `Correct! (${LHOPITAL.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('lhop-next-btn').style.display = '';
        document.getElementById('lhop-hint-btn').style.display = 'none';

        LHOPITAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('lhop-score');
        const totalEl  = document.getElementById('lhop-total');
        const streakEl = document.getElementById('lhop-streak');
        const accEl    = document.getElementById('lhop-accuracy');

        if (scoreEl)  scoreEl.textContent  = LHOPITAL.score;
        if (totalEl)  totalEl.textContent  = LHOPITAL.total;
        if (streakEl) streakEl.textContent = LHOPITAL.streak;
        if (accEl) {
            accEl.textContent = LHOPITAL.total > 0
                ? Math.round((LHOPITAL.score / LHOPITAL.total) * 100) + '%'
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
                        { left: '$',  right: '$',  display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['limits-lhopital'] = () => LHOPITAL.load();
}
