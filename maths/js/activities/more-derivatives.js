/*
 * more-derivatives.js - IB Math AA 5.13: Further Differentiation
 * Product rule, quotient rule, trig derivatives, inverse trig, higher-order derivatives
 */

const MORE_DERIV = {
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
     * 1. qProductRule - Medium (MC)
     * Differentiate f(x) = x^n · e^(ax). f' = x^(n-1)·e^(ax)·(n + ax).
     * Pick n∈{2,3}, a∈{1,2,3}. Present 4 MC options.
     */
    qProductRule() {
        const n = MathUtils.pick([2, 3]);
        const a = MathUtils.pick([1, 2, 3]);

        // f(x) = x^n · e^(ax)
        // f'(x) = n·x^(n-1)·e^(ax) + a·x^n·e^(ax) = x^(n-1)·e^(ax)·(n + ax)
        // Written as: x^(n-1)(n + ax)e^(ax)

        function fmtDerivTex(nv, av) {
            // x^(n-1)(n + ax)e^(ax)
            const nMinus1 = nv - 1;
            const xPart = nMinus1 === 1 ? 'x' : `x^${nMinus1}`;
            const innerA = av === 1 ? 'x' : `${av}x`;
            const ePart = av === 1 ? 'e^x' : `e^{${av}x}`;
            return `${xPart}(${nv} + ${innerA})${ePart}`;
        }

        function fmtEPart(av) {
            return av === 1 ? 'e^x' : `e^{${av}x}`;
        }

        const correctTex = fmtDerivTex(n, a);

        // Distractors
        const distractors = [];

        // Dist 1: Forgot the product rule — just differentiated x^n, left e^(ax)
        // n·x^(n-1)·e^(ax)
        {
            const xPart = (n - 1) === 1 ? 'x' : `x^{${n - 1}}`;
            distractors.push(`${n}${xPart} \\cdot ${fmtEPart(a)}`);
        }

        // Dist 2: Forgot to chain e^(ax) — used e^x instead of a·e^(ax)
        // n·x^(n-1)·e^(ax) + x^n·e^(ax)  (forgot a factor)
        {
            const nMinus1 = n - 1;
            const xPart1 = nMinus1 === 1 ? 'x' : `x^{${nMinus1}}`;
            distractors.push(`${xPart1}(${n} + x)${fmtEPart(a)}`);
        }

        // Dist 3: Coefficient error — used (n-1) instead of n inside bracket
        {
            const nMinus1 = n - 1;
            const xPart = nMinus1 === 1 ? 'x' : `x^{${nMinus1}}`;
            const innerA = a === 1 ? 'x' : `${a}x`;
            distractors.push(`${xPart}(${nMinus1} + ${innerA})${fmtEPart(a)}`);
        }

        // Build and deduplicate options
        const optionTexts = [correctTex];
        for (const d of distractors) {
            if (!optionTexts.includes(d)) {
                optionTexts.push(d);
            } else {
                // Fallback: wrong n+1
                const nMinus1 = n - 1;
                const xPart = nMinus1 === 1 ? 'x' : `x^{${nMinus1}}`;
                const innerA = a === 1 ? 'x' : `${a}x`;
                const fallback = `${xPart}(${n + 1} + ${innerA})${fmtEPart(a)}`;
                if (!optionTexts.includes(fallback)) optionTexts.push(fallback);
                else optionTexts.push(`${n}x^{${n - 1}} \\cdot ${fmtEPart(a + 1)}`);
            }
        }
        while (optionTexts.length < 4) {
            const nMinus1 = n - 1;
            const xPart = nMinus1 === 1 ? 'x' : `x^{${nMinus1}}`;
            const innerA = a === 1 ? 'x' : `${a}x`;
            const extra = `${xPart}(${n} - ${innerA})${fmtEPart(a)}`;
            if (!optionTexts.includes(extra)) optionTexts.push(extra);
            else optionTexts.push(`x^{${n + 1}} \\cdot ${fmtEPart(a)}`);
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        const fTex = `x^${n} \\cdot ${fmtEPart(a)}`;
        const nMinus1 = n - 1;
        const xp = nMinus1 === 1 ? 'x' : `x^{${nMinus1}}`;
        const innerA = a === 1 ? 'x' : `${a}x`;
        const ep = fmtEPart(a);

        return {
            type: 'mc',
            rule: 'Product Rule',
            difficulty: 'medium',
            text: `Find \\(f'(x)\\) for the function below using the product rule.`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `(uv)' = u'v + uv', \\quad u = x^${n},\\; v = ${ep}`,
                `u' = ${n}${xp},\\; v' = ${a}${ep} \\implies f'= ${n}${xp} \\cdot ${ep} + x^${n} \\cdot ${a}${ep}`
            ],
            explain: `<strong>Step 1:</strong> Let \\(u = x^${n}\\) and \\(v = ${ep}\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(u' = ${n}${xp}\\), \\(v' = ${a}${ep}\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply \\((uv)' = u'v + uv'\\):<br>` +
                     `\\(f'= ${n}${xp} \\cdot ${ep} + x^${n} \\cdot ${a}${ep}\\)<br>` +
                     `\\(= ${xp}(${n} + ${innerA})${ep}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f'(x) = ${correctTex}\\).`
        };
    },

    /**
     * 2. qQuotientRule - Medium (MC)
     * Differentiate f(x) = (ax+b)/(cx+d). Numerator of f' simplifies to (ad-bc).
     * Present as MC with 4 options.
     */
    qQuotientRule() {
        // Ensure ad - bc ≠ 0 for a non-trivial answer
        let a, b, c, d, num;
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            b = MathUtils.randInt(-5, 5);
            c = MathUtils.nonZeroRandInt(-4, 4);
            d = MathUtils.randInt(-5, 5);
            num = a * d - b * c;
        } while (num === 0 || c === a);

        // f'(x) = (ad - bc) / (cx+d)^2
        const [nn, nd] = MathUtils.simplifyFraction(num, 1);

        function fmtLinear(coeff, constant) {
            // Format coeff·x + constant
            let xPart;
            if (coeff === 1) xPart = 'x';
            else if (coeff === -1) xPart = '-x';
            else xPart = `${coeff}x`;

            if (constant === 0) return xPart;
            if (constant > 0) return `${xPart} + ${constant}`;
            return `${xPart} - ${Math.abs(constant)}`;
        }

        const numerTex = fmtLinear(a, b);
        const denomTex = fmtLinear(c, d);
        const denom2Tex = `(${denomTex})^2`;

        function fmtQuotient(numVal, denomStr) {
            return `\\frac{${numVal}}{${denomStr}}`;
        }

        const correctTex = fmtQuotient(nn, denom2Tex);

        // Distractors
        // Dist 1: Swapped sign (bc - ad instead of ad - bc)
        const d1 = fmtQuotient(-nn, denom2Tex);

        // Dist 2: Used (a·d + b·c) in numerator (common error: adding instead of subtracting)
        const wrongNum2 = a * d + b * c;
        const d2 = fmtQuotient(wrongNum2 !== 0 ? wrongNum2 : nn + 1, denom2Tex);

        // Dist 3: Denominator not squared — forgot the square
        const d3 = fmtQuotient(nn, denomTex);

        const optionTexts = [correctTex];
        for (const d of [d1, d2, d3]) {
            if (!optionTexts.includes(d)) optionTexts.push(d);
            else optionTexts.push(fmtQuotient(nn + MathUtils.nonZeroRandInt(-2, 2), denom2Tex));
        }
        while (optionTexts.length < 4) {
            optionTexts.push(fmtQuotient(nn + optionTexts.length, denom2Tex));
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Quotient Rule',
            difficulty: 'medium',
            text: `Find \\(f'(x)\\) for the function below using the quotient rule.`,
            latex: `\\(f(x) = \\dfrac{${numerTex}}{${denomTex}}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}, \\quad u = ${numerTex},\\; v = ${denomTex}`,
                `u' = ${a},\\; v' = ${c} \\implies \\text{numerator} = ${a}(${denomTex}) - ${c}(${numerTex}) = ${nn}`
            ],
            explain: `<strong>Step 1:</strong> Let \\(u = ${numerTex}\\) and \\(v = ${denomTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(u' = ${a}\\), \\(v' = ${c}\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply quotient rule:<br>` +
                     `\\(f' = \\dfrac{${a}(${denomTex}) - ${c}(${numerTex})}{${denom2Tex}}\\)<br><br>` +
                     `<strong>Step 4:</strong> Expand numerator: \\(${a}d - ${b}c = ${a * d} - ${b * c} = ${nn}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f'(x) = ${correctTex}\\).`
        };
    },

    /**
     * 3. qDerivSin - Easy (Free)
     * Differentiate f(x) = a·sin(bx). f' = ab·cos(bx).
     * Ask for coefficient of cos(bx). Answer = a*b.
     */
    qDerivSin() {
        const a = MathUtils.nonZeroRandInt(1, 6);
        const b = MathUtils.nonZeroRandInt(1, 5);
        const answer = a * b;

        const fTex = `${a}\\sin(${b}x)`;
        const aTex = a === 1 ? '' : String(a);
        const bTex = b === 1 ? '' : String(b);

        return {
            type: 'free',
            rule: 'Derivative of sin',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = ${fTex}\\). What is the coefficient of \\(\\cos(${b}x)\\) in \\(f'(x)\\)?`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\sin(bx)] = b\\cos(bx)`,
                `f'(x) = ${a} \\cdot ${b}\\cos(${b}x) = ${answer}\\cos(${b}x)`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\frac{d}{dx}[\\sin(bx)] = b\\cos(bx)\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule: \\(f'(x) = ${a} \\cdot ${b}\\cos(${b}x)\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(f'(x) = ${answer}\\cos(${b}x)\\).<br><br>` +
                     `<strong>Answer:</strong> The coefficient of \\(\\cos(${b}x)\\) is \\(${answer}\\).`
        };
    },

    /**
     * 4. qDerivCos - Easy (Free)
     * Differentiate f(x) = a·cos(bx). f' = -ab·sin(bx).
     * Ask for coefficient of sin(bx) in f'(x). Answer = -a*b.
     */
    qDerivCos() {
        const a = MathUtils.nonZeroRandInt(1, 6);
        const b = MathUtils.nonZeroRandInt(1, 5);
        const answer = -(a * b);

        const fTex = `${a}\\cos(${b}x)`;

        return {
            type: 'free',
            rule: 'Derivative of cos',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = ${fTex}\\). What is the coefficient of \\(\\sin(${b}x)\\) in \\(f'(x)\\)?`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\cos(bx)] = -b\\sin(bx)`,
                `f'(x) = ${a} \\cdot (-${b})\\sin(${b}x) = ${answer}\\sin(${b}x)`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\frac{d}{dx}[\\cos(bx)] = -b\\sin(bx)\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule: \\(f'(x) = ${a} \\cdot (-${b})\\sin(${b}x)\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(f'(x) = ${answer}\\sin(${b}x)\\).<br><br>` +
                     `<strong>Answer:</strong> The coefficient of \\(\\sin(${b}x)\\) is \\(${answer}\\).`
        };
    },

    /**
     * 5. qDerivTan - Easy (Free)
     * Differentiate f(x) = a·tan(bx). f' = ab·sec²(bx).
     * Ask for coefficient of sec²(bx). Answer = a*b.
     */
    qDerivTan() {
        const a = MathUtils.nonZeroRandInt(1, 5);
        const b = MathUtils.nonZeroRandInt(1, 4);
        const answer = a * b;

        const fTex = `${a}\\tan(${b}x)`;

        return {
            type: 'free',
            rule: 'Derivative of tan',
            difficulty: 'easy',
            text: `Differentiate \\(f(x) = ${fTex}\\). What is the coefficient of \\(\\sec^2(${b}x)\\) in \\(f'(x)\\)?`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\tan(bx)] = b\\sec^2(bx)`,
                `f'(x) = ${a} \\cdot ${b}\\sec^2(${b}x) = ${answer}\\sec^2(${b}x)`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\frac{d}{dx}[\\tan(bx)] = b\\sec^2(bx)\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule: \\(f'(x) = ${a} \\cdot ${b}\\sec^2(${b}x)\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(f'(x) = ${answer}\\sec^2(${b}x)\\).<br><br>` +
                     `<strong>Answer:</strong> The coefficient of \\(\\sec^2(${b}x)\\) is \\(${answer}\\).`
        };
    },

    /**
     * 6. qSecondDerivative - Medium (Free)
     * Find f''(x) for f(x) = ax^3 + bx^2 + cx + d. f''(x) = 6ax + 2b.
     * Evaluate at x=1: f''(1) = 6a + 2b.
     */
    qSecondDerivative() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-4, 4);
        const c = MathUtils.randInt(-5, 5);
        const d = MathUtils.randInt(-5, 5);
        const answer = 6 * a + 2 * b;

        function fmtPoly(av, bv, cv, dv) {
            const parts = [];
            if (av !== 0) parts.push(av === 1 ? 'x^3' : av === -1 ? '-x^3' : `${av}x^3`);
            if (bv !== 0) {
                if (parts.length === 0) parts.push(bv === 1 ? 'x^2' : bv === -1 ? '-x^2' : `${bv}x^2`);
                else parts.push(bv > 0 ? `+ ${bv === 1 ? '' : bv}x^2` : `- ${Math.abs(bv) === 1 ? '' : Math.abs(bv)}x^2`);
            }
            if (cv !== 0) {
                if (parts.length === 0) parts.push(cv === 1 ? 'x' : cv === -1 ? '-x' : `${cv}x`);
                else parts.push(cv > 0 ? `+ ${cv === 1 ? '' : cv}x` : `- ${Math.abs(cv) === 1 ? '' : Math.abs(cv)}x`);
            }
            if (dv !== 0) {
                if (parts.length === 0) parts.push(String(dv));
                else parts.push(dv > 0 ? `+ ${dv}` : `- ${Math.abs(dv)}`);
            }
            return parts.length === 0 ? '0' : parts.join(' ');
        }

        const fTex = fmtPoly(a, b, c, d);
        // f'(x) = 3ax^2 + 2bx + c
        const f1Tex = fmtPoly(3 * a, 2 * b, c, 0);
        // f''(x) = 6ax + 2b
        const sixA = 6 * a;
        const twoB = 2 * b;
        let f2Tex;
        if (sixA !== 0 && twoB !== 0) {
            f2Tex = `${sixA === 1 ? '' : sixA === -1 ? '-' : sixA}x ${twoB > 0 ? '+ ' + twoB : '- ' + Math.abs(twoB)}`;
        } else if (sixA !== 0) {
            f2Tex = `${sixA}x`;
        } else if (twoB !== 0) {
            f2Tex = String(twoB);
        } else {
            f2Tex = '0';
        }

        return {
            type: 'free',
            rule: 'Second Derivative',
            difficulty: 'medium',
            text: `Find \\(f''(x)\\) for the polynomial below, then evaluate \\(f''(1)\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f'(x) = ${f1Tex}`,
                `f''(x) = ${f2Tex} \\implies f''(1) = ${sixA}(1) + ${twoB} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate once:<br>` +
                     `\\(f'(x) = ${f1Tex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate again:<br>` +
                     `\\(f''(x) = ${f2Tex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 1\\):<br>` +
                     `\\(f''(1) = ${sixA}(1) + ${twoB} = ${sixA} + ${twoB} = ${answer}\\).`
        };
    },

    /**
     * 7. qProductRuleSimple - Medium (Free)
     * f(x) = (x+a)(x²+b). Expand then differentiate.
     * f'(x) = 3x² + 2ax + b. Evaluate f'(1) = 3 + 2a + b.
     */
    qProductRuleSimple() {
        const a = MathUtils.randInt(1, 4);
        const b = MathUtils.randInt(1, 8);
        const answer = 3 + 2 * a + b;

        // f(x) = x^3 + ax^2 + bx + ab
        // f'(x) = 3x^2 + 2ax + b
        let fPrimeTex;
        const twoA = 2 * a;
        if (twoA !== 0 && b !== 0) {
            fPrimeTex = `3x^2 + ${twoA}x + ${b}`;
        } else if (twoA !== 0) {
            fPrimeTex = `3x^2 + ${twoA}x`;
        } else {
            fPrimeTex = `3x^2 + ${b}`;
        }

        return {
            type: 'free',
            rule: 'Product Rule (Expand)',
            difficulty: 'medium',
            text: `Differentiate \\(f(x) = (x + ${a})(x^2 + ${b})\\) and evaluate \\(f'(1)\\).`,
            latex: `\\(f(x) = (x + ${a})(x^2 + ${b})\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Expand: } f(x) = x^3 + ${a}x^2 + ${b}x + ${a * b}`,
                `f'(x) = ${fPrimeTex} \\implies f'(1) = 3 + ${twoA} + ${b} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Expand the brackets:<br>` +
                     `\\(f(x) = x^3 + ${a}x^2 + ${b}x + ${a * b}\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate term by term:<br>` +
                     `\\(f'(x) = ${fPrimeTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 1\\):<br>` +
                     `\\(f'(1) = 3 + ${twoA} + ${b} = ${answer}\\).`
        };
    },

    /**
     * 8. qDerivArctan - Medium (Free)
     * Differentiate f(x) = arctan(ax). f'(x) = a/(1+a²x²).
     * Evaluate at x=0: f'(0) = a. Answer = a.
     */
    qDerivArctan() {
        const a = MathUtils.pick([2, 3, 4, 5]);

        const fTex = `\\arctan(${a}x)`;
        const a2 = a * a;
        const denomTex = a2 === 1 ? '1 + x^2' : `1 + ${a2}x^2`;

        return {
            type: 'free',
            rule: 'Derivative of arctan',
            difficulty: 'medium',
            text: `Differentiate \\(f(x) = ${fTex}\\) and evaluate \\(f'(0)\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: a,
            answerTex: String(a),
            options: [],
            hintTex: [
                `\\frac{d}{dx}[\\arctan(ax)] = \\frac{a}{1 + a^2x^2}`,
                `f'(x) = \\frac{${a}}{${denomTex}} \\implies f'(0) = \\frac{${a}}{1} = ${a}`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(\\frac{d}{dx}[\\arctan(ax)] = \\frac{a}{1 + a^2x^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply with \\(a = ${a}\\):<br>` +
                     `\\(f'(x) = \\dfrac{${a}}{${denomTex}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = 0\\):<br>` +
                     `\\(f'(0) = \\dfrac{${a}}{1 + 0} = ${a}\\).`
        };
    },

    /**
     * 9. qDerivArcsin - Medium (MC)
     * Which is the correct derivative of arcsin(x)? 4 MC options.
     */
    qDerivArcsin() {
        const correctTex = `\\frac{1}{\\sqrt{1 - x^2}}`;

        // Distractors
        const d1 = `\\frac{1}{\\sqrt{1 + x^2}}`;         // arcsinh mistake
        const d2 = `\\frac{-1}{\\sqrt{1 - x^2}}`;        // negative (arccos)
        const d3 = `\\frac{1}{1 + x^2}`;                  // arctan formula

        const optionTexts = [correctTex, d1, d2, d3];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Derivative of arcsin',
            difficulty: 'medium',
            text: `Which of the following is the correct derivative of \\(f(x) = \\arcsin(x)\\)?`,
            latex: `\\(f(x) = \\arcsin(x)\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Let } y = \\arcsin(x), \\text{ so } x = \\sin(y)`,
                `\\frac{dx}{dy} = \\cos(y) = \\sqrt{1 - x^2} \\implies \\frac{dy}{dx} = \\frac{1}{\\sqrt{1-x^2}}`
            ],
            explain: `<strong>Step 1:</strong> Let \\(y = \\arcsin(x)\\), so \\(x = \\sin(y)\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate implicitly: \\(1 = \\cos(y)\\cdot\\frac{dy}{dx}\\).<br><br>` +
                     `<strong>Step 3:</strong> Using \\(\\cos(y) = \\sqrt{1 - \\sin^2(y)} = \\sqrt{1 - x^2}\\):<br>` +
                     `\\(\\frac{dy}{dx} = \\dfrac{1}{\\sqrt{1 - x^2}}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f'(x) = ${correctTex}\\).`
        };
    },

    /**
     * 10. qHigherOrder - Hard (MC)
     * f(x) = sin(x) or cos(x). Find the 4th derivative evaluated at x=0.
     * sin: f⁽⁴⁾ = sin, so f⁽⁴⁾(0) = 0.
     * cos: f⁽⁴⁾ = cos, so f⁽⁴⁾(0) = 1.
     */
    qHigherOrder() {
        const useSin = MathUtils.randInt(0, 1) === 1;
        const fName = useSin ? '\\sin(x)' : '\\cos(x)';
        const answer = useSin ? 0 : 1;
        const answerTex = String(answer);

        // Derivatives of sin: sin → cos → -sin → -cos → sin
        // Derivatives of cos: cos → -sin → -cos → sin → cos
        const sinChain = ['\\sin(x)', '\\cos(x)', '-\\sin(x)', '-\\cos(x)', '\\sin(x)'];
        const cosChain = ['\\cos(x)', '-\\sin(x)', '-\\cos(x)', '\\sin(x)', '\\cos(x)'];
        const chain = useSin ? sinChain : cosChain;

        // MC options: 0, 1, -1, and the wrong answer
        const optionValues = useSin
            ? [{ v: 0, t: '0' }, { v: 1, t: '1' }, { v: -1, t: '-1' }, { v: 0, t: `\\sin(0) = 0` }]
            : [{ v: 1, t: '1' }, { v: 0, t: '0' }, { v: -1, t: '-1' }, { v: 1, t: `\\cos(0) = 1` }];

        // Build options marking correct answer (value matches answer)
        const uniqueTexts = [];
        const options = [];
        for (const opt of optionValues) {
            if (uniqueTexts.includes(opt.t)) continue;
            uniqueTexts.push(opt.t);
            options.push({
                value: opt.v === answer && uniqueTexts.filter(t => {
                    const prev = optionValues.find(o => o.t === t);
                    return prev && prev.v === answer;
                }).length === 1 ? 1 : 0,
                tex: opt.t
            });
        }

        // Simpler approach: fixed 4 options with correct one marked
        const optList = useSin
            ? [
                { value: 1, tex: '0' },
                { value: 0, tex: '1' },
                { value: 0, tex: '-1' },
                { value: 0, tex: '\\cos(0)' }
              ]
            : [
                { value: 1, tex: '1' },
                { value: 0, tex: '0' },
                { value: 0, tex: '-1' },
                { value: 0, tex: '\\sin(0)' }
              ];

        const shuffled = MathUtils.shuffle(optList);

        return {
            type: 'mc',
            rule: 'Higher-Order Derivatives',
            difficulty: 'hard',
            text: `Find the 4th derivative of \\(f(x) = ${fName}\\) and evaluate \\(f^{(4)}(0)\\).`,
            latex: `\\(f(x) = ${fName}\\)`,
            answer: 1,
            answerTex: answerTex,
            options: shuffled,
            hintTex: [
                `f^{(1)} = ${chain[1]},\\quad f^{(2)} = ${chain[2]},\\quad f^{(3)} = ${chain[3]}`,
                `f^{(4)} = ${chain[4]} \\implies f^{(4)}(0) = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate repeatedly:<br>` +
                     `\\(f'(x) = ${chain[1]}\\)<br>` +
                     `\\(f''(x) = ${chain[2]}\\)<br>` +
                     `\\(f'''(x) = ${chain[3]}\\)<br>` +
                     `\\(f^{(4)}(x) = ${chain[4]}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate at \\(x = 0\\):<br>` +
                     `\\(f^{(4)}(0) = ${answer}\\).<br><br>` +
                     `<strong>Note:</strong> The derivatives of \\(${fName}\\) cycle with period 4, returning to \\(${chain[4]}\\) at the 4th derivative.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => MORE_DERIV.qProductRule(),        weight: 2, difficulty: 'medium' },   // 0
            { fn: () => MORE_DERIV.qQuotientRule(),       weight: 2, difficulty: 'medium' },   // 1
            { fn: () => MORE_DERIV.qDerivSin(),           weight: 3, difficulty: 'easy'   },   // 2
            { fn: () => MORE_DERIV.qDerivCos(),           weight: 3, difficulty: 'easy'   },   // 3
            { fn: () => MORE_DERIV.qDerivTan(),           weight: 3, difficulty: 'easy'   },   // 4
            { fn: () => MORE_DERIV.qSecondDerivative(),   weight: 2, difficulty: 'medium' },   // 5
            { fn: () => MORE_DERIV.qProductRuleSimple(),  weight: 2, difficulty: 'medium' },   // 6
            { fn: () => MORE_DERIV.qDerivArctan(),        weight: 2, difficulty: 'medium' },   // 7
            { fn: () => MORE_DERIV.qDerivArcsin(),        weight: 2, difficulty: 'medium' },   // 8
            { fn: () => MORE_DERIV.qHigherOrder(),        weight: 1, difficulty: 'hard'   }    // 9
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (MORE_DERIV.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (MORE_DERIV.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (MORE_DERIV.level === 'hard') {
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
        MORE_DERIV.score = 0;
        MORE_DERIV.total = 0;
        MORE_DERIV.streak = 0;
        MORE_DERIV.answered = false;
        MORE_DERIV.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="MORE_DERIV.unload()">More Derivatives (5.13)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Further Differentiation</h1>
                <p>IB Math AA 5.13 &mdash; Product rule, quotient rule, trig derivatives</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="MORE_DERIV.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="MORE_DERIV.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="MORE_DERIV.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="MORE_DERIV.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="mderiv-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="mderiv-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="mderiv-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="mderiv-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="mderiv-question-card">
                <span class="rule-tag" id="mderiv-rule"></span>
                <span class="difficulty-tag" id="mderiv-difficulty"></span>
                <div class="question-text" id="mderiv-text"></div>
                <div class="question-prompt" id="mderiv-latex"></div>
                <div id="mderiv-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="mderiv-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="mderiv-feedback">
                <div class="feedback-title" id="mderiv-feedback-title"></div>
                <div class="feedback-explanation" id="mderiv-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="mderiv-hint-btn" onclick="MORE_DERIV.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="mderiv-next-btn" onclick="MORE_DERIV.next()" style="display:none;">Next Question</button>
            </div>
        `;

        MORE_DERIV.next();
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
        MORE_DERIV.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        MORE_DERIV.score = 0;
        MORE_DERIV.total = 0;
        MORE_DERIV.streak = 0;
        MORE_DERIV.updateStats();
        MORE_DERIV.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        MORE_DERIV.answered = false;
        MORE_DERIV.hintIndex = 0;
        MORE_DERIV.currentQ = MORE_DERIV.pickQuestion();
        const q = MORE_DERIV.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('mderiv-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('mderiv-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('mderiv-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('mderiv-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('mderiv-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="MORE_DERIV.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="mderiv-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')MORE_DERIV.checkFree()">
                    <button class="btn btn-primary" onclick="MORE_DERIV.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('mderiv-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('mderiv-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('mderiv-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('mderiv-next-btn').style.display = 'none';
        document.getElementById('mderiv-hint-btn').style.display = '';
        document.getElementById('mderiv-hint-btn').disabled = false;

        // Render KaTeX
        MORE_DERIV.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = MORE_DERIV.currentQ;
        if (!q || !q.hintTex || MORE_DERIV.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('mderiv-hint-box');
        const hintContent = MORE_DERIV.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[MORE_DERIV.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        MORE_DERIV.hintIndex++;

        if (MORE_DERIV.hintIndex >= q.hintTex.length) {
            document.getElementById('mderiv-hint-btn').disabled = true;
        }

        MORE_DERIV.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (MORE_DERIV.answered) return;
        MORE_DERIV.answered = true;
        MORE_DERIV.total++;

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
            MORE_DERIV.score++;
            MORE_DERIV.streak++;
        } else {
            btn.classList.add('incorrect');
            MORE_DERIV.streak = 0;
        }

        MORE_DERIV.showFeedback(isCorrect);
        MORE_DERIV.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (MORE_DERIV.answered) return;

        const inp = document.getElementById('mderiv-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        MORE_DERIV.answered = true;
        MORE_DERIV.total++;
        inp.disabled = true;

        const q = MORE_DERIV.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            MORE_DERIV.score++;
            MORE_DERIV.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            MORE_DERIV.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        MORE_DERIV.showFeedback(isCorrect);
        MORE_DERIV.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = MORE_DERIV.currentQ;
        const fb = document.getElementById('mderiv-feedback');
        const title = document.getElementById('mderiv-feedback-title');
        const explanation = document.getElementById('mderiv-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (MORE_DERIV.streak > 1) {
                title.textContent = `Correct! (${MORE_DERIV.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('mderiv-next-btn').style.display = '';
        document.getElementById('mderiv-hint-btn').style.display = 'none';

        MORE_DERIV.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('mderiv-score');
        const totalEl = document.getElementById('mderiv-total');
        const streakEl = document.getElementById('mderiv-streak');
        const accEl = document.getElementById('mderiv-accuracy');

        if (scoreEl) scoreEl.textContent = MORE_DERIV.score;
        if (totalEl) totalEl.textContent = MORE_DERIV.total;
        if (streakEl) streakEl.textContent = MORE_DERIV.streak;
        if (accEl) {
            accEl.textContent = MORE_DERIV.total > 0
                ? Math.round((MORE_DERIV.score / MORE_DERIV.total) * 100) + '%'
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
    ACTIVITY_INITS['more-derivatives'] = () => MORE_DERIV.load();
}
