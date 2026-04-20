/*
 * derivatives-basic.js - IB Math AA 5.2-5.3: Derivatives
 * Power rule, sum/difference, e^x, ln x, sin/cos, product rule, quotient rule
 */

const DERIVATIVES = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    fmtPower(coeff, power) {
        if (power === 0) return coeff === 0 ? '0' : String(coeff);
        const cStr = coeff === 1 ? '' : coeff === -1 ? '-' : String(coeff);
        if (power === 1) return `${cStr}x`;
        return `${cStr}x^{${power}}`;
    },

    fmtPoly(terms) {
        // terms = [{coeff, power}, ...] sorted by descending power
        let result = '';
        terms.forEach((t, i) => {
            if (t.coeff === 0) return;
            if (i === 0) {
                result += DERIVATIVES.fmtPower(t.coeff, t.power);
            } else {
                if (t.coeff > 0) result += ` + ${DERIVATIVES.fmtPower(t.coeff, t.power)}`;
                else result += ` - ${DERIVATIVES.fmtPower(Math.abs(t.coeff), t.power)}`;
            }
        });
        return result || '0';
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qPowerRuleValue - Easy (Free)
     * Differentiate ax^n and evaluate at x=a.
     */
    qPowerRuleValue() {
        const coeff = MathUtils.nonZeroRandInt(-4, 4);
        const power = MathUtils.randInt(2, 5);
        const x0 = MathUtils.pick([-2, -1, 1, 2, 3]);

        // f(x) = coeff * x^power
        // f'(x) = coeff * power * x^(power-1)
        const dCoeff = coeff * power;
        const dPower = power - 1;
        const val = dCoeff * Math.pow(x0, dPower);

        const fTex = DERIVATIVES.fmtPower(coeff, power);
        const dfTex = DERIVATIVES.fmtPower(dCoeff, dPower);

        return {
            type: 'free',
            rule: "Power Rule",
            difficulty: 'easy',
            text: `Find \\(f'(${x0})\\) for \\(f(x) = ${fTex}\\).`,
            latex: '',
            answer: val,
            answerTex: String(val),
            options: [],
            hintTex: [
                `f'(x) = ${dCoeff}x^{${dPower}} \\text{ (power rule: multiply by power, decrease power by 1)}`,
                `f'(${x0}) = ${dCoeff}(${x0})^{${dPower}} = ${val}`
            ],
            explain: `<strong>Power rule:</strong> \\(\\dfrac{d}{dx}(ax^n) = nax^{n-1}\\).<br><br>` +
                     `\\(f'(x) = ${power} \\cdot ${coeff} \\cdot x^{${power - 1}} = ${dfTex}\\).<br><br>` +
                     `\\(f'(${x0}) = ${dCoeff} \\cdot (${x0})^{${dPower}} = ${dCoeff} \\cdot ${Math.pow(x0, dPower)} = ${val}\\).`
        };
    },

    /**
     * 2. qPowerRuleExpr - Easy (MC)
     * Find the expression for f'(x) for a polynomial.
     */
    qPowerRuleExpr() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-5, 5);
        const n = MathUtils.randInt(2, 4);

        // f(x) = ax^n + bx
        // f'(x) = n*a*x^(n-1) + b
        const da = n * a;
        const fTex = `${DERIVATIVES.fmtPower(a, n)} + ${DERIVATIVES.fmtPower(b, 1)}`;
        const dfTex = DERIVATIVES.fmtPoly([{ coeff: da, power: n - 1 }, { coeff: b, power: 0 }]);

        const options = [
            { value: 1, tex: dfTex },
            { value: 0, tex: DERIVATIVES.fmtPoly([{ coeff: a, power: n - 1 }, { coeff: b, power: 0 }]) },
            { value: 0, tex: DERIVATIVES.fmtPoly([{ coeff: da, power: n }, { coeff: b, power: 0 }]) },
            { value: 0, tex: DERIVATIVES.fmtPoly([{ coeff: da, power: n - 1 }, { coeff: 1, power: 0 }]) }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const c = { value: 0, tex: DERIVATIVES.fmtPoly([{ coeff: da + off, power: n - 1 }, { coeff: b, power: 0 }]) };
            if (!seen.has(c.tex)) { unique.push(c); seen.add(c.tex); }
        }

        return {
            type: 'mc',
            rule: "Power Rule (Expression)",
            difficulty: 'easy',
            text: 'Find \\(f\'(x)\\).',
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: 1,
            answerTex: dfTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\frac{d}{dx}(ax^n) = nax^{n-1}; \\quad \\frac{d}{dx}(bx) = b`,
                `f'(x) = ${n} \\cdot ${a} \\cdot x^{${n - 1}} + ${b} = ${dfTex}`
            ],
            explain: `<strong>Differentiate term by term:</strong><br>` +
                     `\\(\\dfrac{d}{dx}(${DERIVATIVES.fmtPower(a, n)}) = ${n} \\cdot ${a} \\cdot x^{${n - 1}} = ${DERIVATIVES.fmtPower(da, n - 1)}\\)<br>` +
                     `\\(\\dfrac{d}{dx}(${DERIVATIVES.fmtPower(b, 1)}) = ${b}\\)<br><br>` +
                     `<strong>Answer:</strong> \\(f'(x) = ${dfTex}\\).`
        };
    },

    /**
     * 3. qDerivativeAtPoint - Easy (Free)
     * Evaluate derivative of polynomial at specific point.
     */
    qDerivativeAtPoint() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.nonZeroRandInt(-5, 5);
        const c = MathUtils.randInt(-5, 5);
        const x0 = MathUtils.pick([-2, -1, 0, 1, 2, 3]);

        // f(x) = ax^3 + bx + c
        // f'(x) = 3ax^2 + b
        const val = 3 * a * x0 * x0 + b;

        const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bStr = b === 1 ? ' + x' : b === -1 ? ' - x' : b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
        const cStr = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const fTex = `${aStr}x^3${bStr}${cStr}`;
        const daTex = 3 * a === 1 ? '' : 3 * a === -1 ? '-' : String(3 * a);
        const dfTex = `${daTex}x^2${b === 1 ? ' + ' : b === -1 ? ' - ' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`}`;

        return {
            type: 'free',
            rule: "Evaluate f'(a)",
            difficulty: 'easy',
            text: `Find the gradient of \\(y = ${fTex}\\) at \\(x = ${x0}\\).`,
            latex: '',
            answer: val,
            answerTex: String(val),
            options: [],
            hintTex: [
                `f'(x) = 3${a === 1 ? '' : a === -1 ? '-' : a}x^2 + ${b}`,
                `f'(${x0}) = ${3 * a}(${x0})^2 + ${b} = ${3 * a * x0 * x0} + ${b} = ${val}`
            ],
            explain: `<strong>Differentiate:</strong> \\(f'(x) = 3 \\cdot ${a}x^2 + ${b} = ${daTex}x^2 + ${b}\\).<br><br>` +
                     `<strong>Substitute:</strong> \\(f'(${x0}) = ${3 * a}(${x0})^2 + ${b} = ${3 * a * x0 * x0} + ${b} = ${val}\\).`
        };
    },

    /**
     * 4. qExpDerivative - Easy (MC)
     * Differentiate ae^(bx) or ae^x + c.
     */
    qExpDerivative() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-3, 3);
        const c = MathUtils.randInt(-5, 5);

        // f(x) = a*e^(bx) + c
        // f'(x) = a*b*e^(bx)
        const ab = a * b;
        const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bStr = b === 1 ? '' : b === -1 ? '-' : String(b);
        const abStr = ab === 1 ? '' : ab === -1 ? '-' : String(ab);
        const cStr = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const fTex = `${aStr}e^{${bStr}x}${cStr}`;
        const dfTex = `${abStr}e^{${bStr}x}`;

        const options = [
            { value: 1, tex: dfTex },
            { value: 0, tex: `${aStr}e^{${bStr}x}` },
            { value: 0, tex: `${bStr}e^{${bStr}x}` },
            { value: 0, tex: `${abStr}e^{${bStr}x}${cStr}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const c2 = { value: 0, tex: `${ab + off}e^{${bStr}x}` };
            if (!seen.has(c2.tex)) { unique.push(c2); seen.add(c2.tex); }
        }

        return {
            type: 'mc',
            rule: "Derivative of e^(kx)",
            difficulty: 'easy',
            text: 'Find \\(f\'(x)\\).',
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: 1,
            answerTex: dfTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\frac{d}{dx}(e^{kx}) = ke^{kx}`,
                `\\frac{d}{dx}(${aStr}e^{${bStr}x}) = ${a} \\cdot ${b} \\cdot e^{${bStr}x} = ${dfTex}`
            ],
            explain: `<strong>Rule:</strong> \\(\\dfrac{d}{dx}(e^{kx}) = ke^{kx}\\).<br><br>` +
                     `\\(f'(x) = ${a} \\cdot ${b} \\cdot e^{${bStr}x} = ${dfTex}\\).<br><br>` +
                     `Note: The constant \\(${c}\\) differentiates to zero.`
        };
    },

    /**
     * 5. qLnDerivative - Easy (MC)
     * Differentiate a*ln(x) or a*ln(bx).
     */
    qLnDerivative() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(1, 5);
        const c = MathUtils.randInt(-5, 5);

        // f(x) = a*ln(bx) + c; f'(x) = a/x (chain rule: d/dx ln(bx) = 1/x)
        const [n, d] = MathUtils.simplifyFraction(a, 1);
        const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bTex = b === 1 ? '' : String(b);
        const cStr = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const fTex = `${aStr}\\ln(${bTex}x)${cStr}`;
        const dfTex = a === 1 ? `\\dfrac{1}{x}` : a === -1 ? `-\\dfrac{1}{x}` : `\\dfrac{${a}}{x}`;

        const options = [
            { value: 1, tex: dfTex },
            { value: 0, tex: a === 1 ? `\\dfrac{1}{bx}` : `\\dfrac{${a}}{${b}x}` },
            { value: 0, tex: `\\dfrac{${a}}{x} + ${c}` },
            { value: 0, tex: `${aStr}\\ln(${bTex}x) \\cdot \\dfrac{1}{x}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const c2 = { value: 0, tex: `\\dfrac{${a + off}}{x}` };
            if (!seen.has(c2.tex)) { unique.push(c2); seen.add(c2.tex); }
        }

        return {
            type: 'mc',
            rule: "Derivative of ln",
            difficulty: 'easy',
            text: 'Find \\(f\'(x)\\).',
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: 1,
            answerTex: dfTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\frac{d}{dx}(\\ln x) = \\frac{1}{x}; \\quad \\frac{d}{dx}(\\ln(bx)) = \\frac{1}{x}`,
                `f'(x) = ${aStr} \\cdot \\frac{1}{x} = ${dfTex}`
            ],
            explain: `<strong>Rule:</strong> \\(\\dfrac{d}{dx}(\\ln(bx)) = \\dfrac{1}{x}\\) (since \\(\\ln(bx) = \\ln b + \\ln x\\)).<br><br>` +
                     `\\(f'(x) = ${a} \\cdot \\dfrac{1}{x} = ${dfTex}\\).<br><br>` +
                     `Note: The constant \\(\\ln b\\) in the expansion differentiates to zero — this is why \\(b\\) does not appear in \\(f'\\).`
        };
    },

    /**
     * 6. qTrigDerivative - Medium (MC)
     * Differentiate a*sin(x), a*cos(x), or a*tan(x).
     */
    qTrigDerivative() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-3, 3);
        const fn = MathUtils.pick(['sin', 'cos']);
        const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bStr = b === 1 ? '' : b === -1 ? '-' : String(b);

        // f(x) = a*sin(bx): f'(x) = a*b*cos(bx)
        // f(x) = a*cos(bx): f'(x) = -a*b*sin(bx)
        const ab = a * b;
        const abStr = ab === 1 ? '' : ab === -1 ? '-' : String(ab);
        const negAbStr = -ab === 1 ? '' : -ab === -1 ? '-' : String(-ab);

        const fTex = `${aStr}\\${fn}(${bStr}x)`;
        const correctTex = fn === 'sin'
            ? `${abStr}\\cos(${bStr}x)`
            : `${negAbStr}\\sin(${bStr}x)`;

        const wrongSign = fn === 'sin' ? `${negAbStr}\\cos(${bStr}x)` : `${abStr}\\sin(${bStr}x)`;
        const wrongFn = fn === 'sin' ? `${abStr}\\sin(${bStr}x)` : `${negAbStr}\\cos(${bStr}x)`;
        const noChain = fn === 'sin' ? `${aStr}\\cos(${bStr}x)` : `${aStr === '' ? '-' : '-' + (a === -1 ? '' : a)}\\sin(${bStr}x)`;

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: wrongSign },
            { value: 0, tex: wrongFn },
            { value: 0, tex: noChain }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const c2 = { value: 0, tex: fn === 'sin' ? `${ab + off}\\cos(${bStr}x)` : `${-ab + off}\\sin(${bStr}x)` };
            if (!seen.has(c2.tex)) { unique.push(c2); seen.add(c2.tex); }
        }

        return {
            type: 'mc',
            rule: "Trig Derivative",
            difficulty: 'medium',
            text: 'Find \\(f\'(x)\\).',
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                fn === 'sin'
                    ? `\\frac{d}{dx}(\\sin(bx)) = b\\cos(bx)`
                    : `\\frac{d}{dx}(\\cos(bx)) = -b\\sin(bx)`,
                `f'(x) = ${a} \\cdot ${fn === 'sin' ? b + '\\cos(' + bStr + 'x)' : '(-' + b + ')\\sin(' + bStr + 'x)'} = ${correctTex}`
            ],
            explain: fn === 'sin'
                ? `<strong>Rule:</strong> \\(\\dfrac{d}{dx}(\\sin(bx)) = b\\cos(bx)\\) (chain rule).<br><br>\\(f'(x) = ${a} \\cdot ${b}\\cos(${bStr}x) = ${correctTex}\\).`
                : `<strong>Rule:</strong> \\(\\dfrac{d}{dx}(\\cos(bx)) = -b\\sin(bx)\\) (chain rule, note the minus sign).<br><br>\\(f'(x) = ${a} \\cdot (${-b})\\sin(${bStr}x) = ${correctTex}\\).`
        };
    },

    /**
     * 7. qProductRuleValue - Medium (Free)
     * Use product rule to find (fg)'(a).
     */
    qProductRuleValue() {
        // f = ax + b, g = cx + d; clean integer result
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-4, 4);
        const c = MathUtils.nonZeroRandInt(-3, 3);
        const d = MathUtils.randInt(-4, 4);
        const x0 = MathUtils.randInt(-3, 3);

        // (fg)' = f'g + fg'
        // f' = a, g' = c
        const fVal = a * x0 + b;
        const gVal = c * x0 + d;
        const fPrime = a;
        const gPrime = c;
        const result = fPrime * gVal + fVal * gPrime;

        const fTex = COMP_INV.fmtLinear(a, b);
        const gTex = COMP_INV.fmtLinear(c, d);

        return {
            type: 'free',
            rule: "Product Rule",
            difficulty: 'medium',
            text: `Let \\(h(x) = (${fTex})(${gTex})\\). Find \\(h'(${x0})\\) using the product rule.`,
            latex: '',
            answer: result,
            answerTex: String(result),
            options: [],
            hintTex: [
                `h'(x) = f'(x)g(x) + f(x)g'(x)`,
                `= (${a})(${gTex}) + (${fTex})(${c})`
            ],
            explain: `<strong>Product rule:</strong> \\(h'(x) = f'g + fg'\\).<br><br>` +
                     `\\(f(x) = ${fTex},\\; f'(x) = ${a}\\)<br>` +
                     `\\(g(x) = ${gTex},\\; g'(x) = ${c}\\)<br><br>` +
                     `At \\(x = ${x0}\\):<br>` +
                     `\\(f(${x0}) = ${fVal},\\; g(${x0}) = ${gVal}\\)<br>` +
                     `\\(h'(${x0}) = ${a} \\cdot ${gVal} + ${fVal} \\cdot ${c} = ${a * gVal} + ${fVal * c} = ${result}\\).`
        };
    },

    /**
     * 8. qProductRuleExpr - Medium (MC)
     * Find expression using product rule: d/dx[x^a * e^(bx)].
     */
    qProductRuleExpr() {
        const n = MathUtils.randInt(2, 4);
        const b = MathUtils.nonZeroRandInt(-3, 3);
        const bStr = b === 1 ? '' : b === -1 ? '-' : String(b);

        // f = x^n, g = e^(bx)
        // (fg)' = nx^(n-1)*e^(bx) + x^n*b*e^(bx) = e^(bx)(nx^(n-1) + bx^n)
        const nStr = n === 1 ? '' : String(n);

        const correctTex = `e^{${bStr}x}(${n}x^{${n - 1}} + ${b}x^{${n}})`;
        const wrong1 = `${n}x^{${n - 1}} \\cdot e^{${bStr}x}`;
        const wrong2 = `e^{${bStr}x}(${n}x^{${n - 1}} - ${b}x^{${n}})`;
        const wrong3 = `${n}e^{${bStr}x} + ${b}x^{${n}}e^{${bStr}x}`;

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: wrong1 },
            { value: 0, tex: wrong2 },
            { value: 0, tex: wrong3 }
        ];

        return {
            type: 'mc',
            rule: "Product Rule (Expression)",
            difficulty: 'medium',
            text: 'Differentiate using the product rule.',
            latex: `\\(y = x^{${n}} e^{${bStr}x}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(options),
            hintTex: [
                `(uv)' = u'v + uv'; \\quad u = x^{${n}}, \\; v = e^{${bStr}x}`,
                `u' = ${n}x^{${n - 1}}, \\; v' = ${b}e^{${bStr}x}`
            ],
            explain: `<strong>Product rule:</strong> \\((uv)' = u'v + uv'\\).<br><br>` +
                     `\\(u = x^{${n}} \\Rightarrow u' = ${n}x^{${n - 1}}\\)<br>` +
                     `\\(v = e^{${bStr}x} \\Rightarrow v' = ${b}e^{${bStr}x}\\)<br><br>` +
                     `\\(y' = ${n}x^{${n - 1}} \\cdot e^{${bStr}x} + x^{${n}} \\cdot ${b}e^{${bStr}x} = e^{${bStr}x}(${n}x^{${n - 1}} + ${b}x^{${n}})\\).`
        };
    },

    /**
     * 9. qGradientAtPoint - Medium (Free)
     * Find gradient of y = ax^2 + bx + c at given x.
     */
    qGradientAtPoint() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-5, 5);
        const x0 = MathUtils.pick([-3, -2, -1, 0, 1, 2, 3]);

        const grad = 2 * a * x0 + b;
        const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bStr = b === 1 ? ' + x' : b === -1 ? ' - x' : b > 0 ? ` + ${b}x` : b < 0 ? ` - ${Math.abs(b)}x` : '';
        const cStr = c > 0 ? ` + ${c}` : c < 0 ? ` - ${Math.abs(c)}` : '';
        const yTex = `${aStr}x^2${bStr}${cStr}`;

        return {
            type: 'free',
            rule: "Gradient at Point",
            difficulty: 'medium',
            text: `Find the gradient of \\(y = ${yTex}\\) at \\(x = ${x0}\\).`,
            latex: '',
            answer: grad,
            answerTex: String(grad),
            options: [],
            hintTex: [
                `\\frac{dy}{dx} = ${2 * a === 1 ? '' : 2 * a === -1 ? '-' : 2 * a}x${b === 0 ? '' : (b > 0 ? ' + ' + b : ' - ' + Math.abs(b))}`,
                `\\text{At } x = ${x0}: \\; \\frac{dy}{dx} = ${2 * a}(${x0}) + ${b} = ${grad}`
            ],
            explain: `<strong>Differentiate:</strong> \\(\\dfrac{dy}{dx} = ${2 * a === 1 ? '' : 2 * a}x + ${b}\\).<br><br>` +
                     `<strong>Substitute:</strong> \\(\\dfrac{dy}{dx}\\bigg|_{x=${x0}} = ${2 * a}(${x0}) + ${b} = ${2 * a * x0} + ${b} = ${grad}\\).`
        };
    },

    /**
     * 10. qFindXGivenGradient - Hard (Free)
     * Find x where gradient equals k for y = ax^2 + bx + c.
     */
    qFindXGivenGradient() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-5, 5);
        // gradient k = 2ax + b → x = (k - b) / (2a)
        // choose k so x is integer
        const xSol = MathUtils.randInt(-5, 5);
        const k = 2 * a * xSol + b;

        const aStr = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bStr = b === 1 ? ' + x' : b === -1 ? ' - x' : b > 0 ? ` + ${b}x` : b < 0 ? ` - ${Math.abs(b)}x` : '';
        const cStr = c > 0 ? ` + ${c}` : c < 0 ? ` - ${Math.abs(c)}` : '';
        const yTex = `${aStr}x^2${bStr}${cStr}`;

        return {
            type: 'free',
            rule: "Find x from Gradient",
            difficulty: 'hard',
            text: `Find the value of \\(x\\) at which the curve \\(y = ${yTex}\\) has gradient \\(${k}\\).`,
            latex: '',
            answer: xSol,
            answerTex: String(xSol),
            options: [],
            hintTex: [
                `\\frac{dy}{dx} = ${2 * a}x + ${b}`,
                `${2 * a}x + ${b} = ${k} \\Rightarrow x = \\frac{${k - b}}{${2 * a}} = ${xSol}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(\\dfrac{dy}{dx} = ${2 * a}x + ${b}\\).<br><br>` +
                     `<strong>Step 2:</strong> Set equal to \\(${k}\\): \\(${2 * a}x + ${b} = ${k}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(${2 * a}x = ${k - b} \\Rightarrow x = ${xSol}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => DERIVATIVES.qPowerRuleValue(),    weight: 3, diff: 'easy' },
            { fn: () => DERIVATIVES.qPowerRuleExpr(),     weight: 3, diff: 'easy' },
            { fn: () => DERIVATIVES.qDerivativeAtPoint(), weight: 2, diff: 'easy' },
            { fn: () => DERIVATIVES.qExpDerivative(),     weight: 2, diff: 'easy' },
            { fn: () => DERIVATIVES.qLnDerivative(),      weight: 2, diff: 'easy' },
            { fn: () => DERIVATIVES.qTrigDerivative(),    weight: 2, diff: 'medium' },
            { fn: () => DERIVATIVES.qProductRuleValue(),  weight: 2, diff: 'medium' },
            { fn: () => DERIVATIVES.qProductRuleExpr(),   weight: 2, diff: 'medium' },
            { fn: () => DERIVATIVES.qGradientAtPoint(),   weight: 2, diff: 'medium' },
            { fn: () => DERIVATIVES.qFindXGivenGradient(), weight: 1, diff: 'hard' }
        ];

        let filtered = pool;
        if (DERIVATIVES.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (DERIVATIVES.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (DERIVATIVES.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

        const totalWeight = filtered.reduce((s, p) => s + p.weight, 0);
        let r = Math.random() * totalWeight;
        for (const item of filtered) {
            r -= item.weight;
            if (r <= 0) return item.fn();
        }
        return filtered[filtered.length - 1].fn();
    },

    /* ────────────────────────────────────────────
       UI
       ──────────────────────────────────────────── */

    load() {
        DERIVATIVES.score = 0; DERIVATIVES.total = 0;
        DERIVATIVES.streak = 0; DERIVATIVES.answered = false; DERIVATIVES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="DERIVATIVES.unload()">Derivatives (5.2)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Derivatives</h1>
                <p>IB Math AA 5.2 — Power rule, e^x, ln x, trig, product rule</p>
            </header>

            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="DERIVATIVES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="DERIVATIVES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="DERIVATIVES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="DERIVATIVES.setLevel('hard')">Hard</button>
            </div>

            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="deriv-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="deriv-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="deriv-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="deriv-accuracy">-</div></div>
            </div>

            <div class="question-card" id="deriv-question-card">
                <span class="rule-tag" id="deriv-rule"></span>
                <span class="difficulty-tag" id="deriv-difficulty"></span>
                <div class="question-text" id="deriv-text"></div>
                <div class="question-prompt" id="deriv-latex"></div>
                <div id="deriv-options-area"></div>
            </div>

            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="deriv-hint-box"></div>
            <div class="feedback" id="deriv-feedback">
                <div class="feedback-title" id="deriv-feedback-title"></div>
                <div class="feedback-explanation" id="deriv-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="deriv-hint-btn" onclick="DERIVATIVES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="deriv-next-btn" onclick="DERIVATIVES.next()" style="display:none;">Next Question</button>
            </div>`;

        DERIVATIVES.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('calculus');
    },

    setLevel(lvl) {
        DERIVATIVES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(b => b.classList.toggle('active', b.getAttribute('data-level') === lvl));
        DERIVATIVES.score = 0; DERIVATIVES.total = 0; DERIVATIVES.streak = 0;
        DERIVATIVES.updateStats(); DERIVATIVES.next();
    },

    next() {
        DERIVATIVES.answered = false; DERIVATIVES.hintIndex = 0;
        DERIVATIVES.currentQ = DERIVATIVES.pickQuestion();
        const q = DERIVATIVES.currentQ;

        document.getElementById('deriv-rule').textContent = q.rule;
        const de = document.getElementById('deriv-difficulty');
        de.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        de.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('deriv-text').innerHTML = q.text;
        document.getElementById('deriv-latex').innerHTML = q.latex;

        const oa = document.getElementById('deriv-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((o, i) => { html += `<button class="option-btn" data-i="${i}" data-value="${o.value}" onclick="DERIVATIVES.checkMC(this)">\\(${o.tex}\\)</button>`; });
            html += '</div>';
            oa.innerHTML = html;
        } else {
            oa.innerHTML = `<div class="input-area"><input type="number" step="any" class="lr-math-field" id="deriv-input" placeholder="Your answer" autocomplete="off" onkeydown="if(event.key==='Enter')DERIVATIVES.checkFree()"><button class="btn btn-primary" onclick="DERIVATIVES.checkFree()">Submit</button></div>`;
            setTimeout(() => { const i = document.getElementById('deriv-input'); if (i) i.focus(); }, 100);
        }

        const hb = document.getElementById('deriv-hint-box');
        hb.classList.remove('show'); hb.innerHTML = '';
        document.getElementById('deriv-feedback').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('deriv-next-btn').style.display = 'none';
        document.getElementById('deriv-hint-btn').style.display = '';
        document.getElementById('deriv-hint-btn').disabled = false;
        DERIVATIVES.renderAllKaTeX();
    },

    showHint() {
        const q = DERIVATIVES.currentQ;
        if (!q || !q.hintTex || DERIVATIVES.hintIndex >= q.hintTex.length) return;
        const hb = document.getElementById('deriv-hint-box');
        hb.innerHTML = (DERIVATIVES.hintIndex === 0 ? '' : hb.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">') + `<span>\\(${q.hintTex[DERIVATIVES.hintIndex]}\\)</span>`;
        hb.classList.add('show'); DERIVATIVES.hintIndex++;
        if (DERIVATIVES.hintIndex >= q.hintTex.length) document.getElementById('deriv-hint-btn').disabled = true;
        DERIVATIVES.renderAllKaTeX();
    },

    checkMC(btn) {
        if (DERIVATIVES.answered) return;
        DERIVATIVES.answered = true; DERIVATIVES.total++;
        const ok = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct'); });
        if (ok) { btn.classList.add('correct'); DERIVATIVES.score++; DERIVATIVES.streak++; }
        else { btn.classList.add('incorrect'); DERIVATIVES.streak = 0; }
        DERIVATIVES.showFeedback(ok); DERIVATIVES.updateStats();
    },

    checkFree() {
        if (DERIVATIVES.answered) return;
        const inp = document.getElementById('deriv-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        DERIVATIVES.answered = true; DERIVATIVES.total++; inp.disabled = true;
        const ok = MathUtils.approxEqual(val, DERIVATIVES.currentQ.answer, 0.01);
        inp.style.borderColor = ok ? 'var(--success)' : 'var(--error)';
        inp.style.background = ok ? 'var(--success-light)' : 'var(--error-light)';
        if (ok) { DERIVATIVES.score++; DERIVATIVES.streak++; } else DERIVATIVES.streak = 0;
        const sb = inp.parentElement.querySelector('.btn-primary'); if (sb) sb.disabled = true;
        DERIVATIVES.showFeedback(ok); DERIVATIVES.updateStats();
    },

    showFeedback(ok) {
        const q = DERIVATIVES.currentQ;
        const fb = document.getElementById('deriv-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        const title = document.getElementById('deriv-feedback-title');
        title.textContent = ok ? (DERIVATIVES.streak > 1 ? `Correct! (${DERIVATIVES.streak} streak)` : 'Correct!') : '';
        if (!ok) title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        document.getElementById('deriv-feedback-explanation').innerHTML = q.explain;
        document.getElementById('deriv-next-btn').style.display = '';
        document.getElementById('deriv-hint-btn').style.display = 'none';
        DERIVATIVES.renderAllKaTeX();
    },

    updateStats() {
        const el = id => document.getElementById(id);
        if (el('deriv-score')) el('deriv-score').textContent = DERIVATIVES.score;
        if (el('deriv-total')) el('deriv-total').textContent = DERIVATIVES.total;
        if (el('deriv-streak')) el('deriv-streak').textContent = DERIVATIVES.streak;
        if (el('deriv-accuracy')) el('deriv-accuracy').textContent = DERIVATIVES.total > 0 ? Math.round(DERIVATIVES.score / DERIVATIVES.total * 100) + '%' : '-';
    },

    renderAllKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const c = document.getElementById('activity-container');
            if (c) renderMathInElement(c, { delimiters: [{ left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }], throwOnError: false });
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['derivatives-basic'] = () => DERIVATIVES.load();
