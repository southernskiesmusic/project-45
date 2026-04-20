/*
 * tangent-normal.js - IB Math AA 5.4: Tangent & Normal Lines
 * Equations of tangents and normals to curves
 */

const TANGENT_NORMAL = {
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
     * 1. qTangentGradient - Easy (Free response)
     * f(x) = ax² + bx + c, find gradient of tangent at x = p.
     * f'(x) = 2ax + b, answer = 2a*p + b (integer).
     */
    qTangentGradient() {
        const aVals = [1, 2, 3];
        const pVals = [0, 1, 2, -1, -2];
        const a = MathUtils.pick(aVals);
        const b = MathUtils.randInt(-4, 4);
        const c = MathUtils.randInt(-5, 5);
        const p = MathUtils.pick(pVals);

        const answer = 2 * a * p + b;

        // Build f(x) display string
        const fTex = TANGENT_NORMAL._quadTeX(a, b, c);
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);

        return {
            type: 'free',
            rule: 'Tangent Gradient',
            difficulty: 'easy',
            text: `Find the gradient of the tangent to the curve at \\(x = ${p}\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f'(x) = ${fpTex}`,
                `f'(${p}) = 2(${a})(${p}) + (${b}) = ${2 * a * p} + ${b} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = ${fpTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${p}\\):<br>` +
                     `\\(f'(${p}) = 2(${a})(${p}) + (${b}) = ${2 * a * p} + (${b}) = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> The gradient of the tangent at \\(x = ${p}\\) is \\(${answer}\\).`
        };
    },

    /**
     * 2. qTangentYIntercept - Easy (Free response)
     * f(x) = ax² + bx + c, tangent at x = p. y-intercept = f(p) - f'(p)·p.
     */
    qTangentYIntercept() {
        const aVals = [1, 2, 3];
        const pVals = [0, 1, 2, -1, -2];
        const a = MathUtils.pick(aVals);
        const b = MathUtils.randInt(-4, 4);
        const p = MathUtils.pick(pVals);
        // Choose c so y-intercept = f(p) - f'(p)*p is integer
        // f(p) - f'(p)*p = (ap²+bp+c) - (2ap+b)*p = ap²+bp+c - 2ap²-bp = c - ap²
        // So y-intercept = c - a*p² which is already integer for any integer c
        const c = MathUtils.randInt(-5, 5);

        const fp = a * p * p + b * p + c;
        const fprime = 2 * a * p + b;
        const yInt = fp - fprime * p; // = c - a*p*p

        const fTex = TANGENT_NORMAL._quadTeX(a, b, c);
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);

        return {
            type: 'free',
            rule: 'Tangent y-Intercept',
            difficulty: 'easy',
            text: `Find the y-intercept of the tangent to the curve at \\(x = ${p}\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: yInt,
            answerTex: String(yInt),
            options: [],
            hintTex: [
                `f(${p}) = ${fp},\\quad f'(x) = ${fpTex},\\quad f'(${p}) = ${fprime}`,
                `c = f(${p}) - f'(${p}) \\cdot ${p} = ${fp} - (${fprime})(${p}) = ${yInt}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate: \\(f(${p}) = ${a}(${p})^2 + ${b}(${p}) + ${c} = ${fp}\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(f'(x) = ${fpTex}\\), so \\(f'(${p}) = ${fprime}\\).<br><br>` +
                     `<strong>Step 3:</strong> Tangent line: \\(y = ${fprime}x + c\\). Substitute \\((${p},\\,${fp})\\):<br>` +
                     `\\(${fp} = ${fprime}(${p}) + c \\implies c = ${fp} - ${fprime * p} = ${yInt}\\).<br><br>` +
                     `<strong>Answer:</strong> The y-intercept of the tangent is \\(${yInt}\\).`
        };
    },

    /**
     * 3. qNormalGradient - Easy (Free response)
     * f(x) = ax² + bx, gradient of normal at x = p = -1/(2a*p + b).
     * Choose values so 2a*p + b ∈ {1,2,4,-1,-2,-4} for a clean answer.
     */
    qNormalGradient() {
        // Pairs (a, b, p) where 2a*p+b is in clean set
        const cleanCases = [];
        const cleanDivs = [1, 2, 4, -1, -2, -4];
        const aVals = [1, 2, 3];
        const pVals = [0, 1, 2, -1, -2];

        for (const a of aVals) {
            for (const p of pVals) {
                for (const target of cleanDivs) {
                    const b = target - 2 * a * p;
                    if (Number.isInteger(b) && Math.abs(b) <= 8) {
                        cleanCases.push({ a, b, p, fprime: target });
                    }
                }
            }
        }

        const chosen = MathUtils.pick(cleanCases);
        const { a, b, p, fprime } = chosen;
        const mNormal = -1 / fprime;
        const answer = parseFloat(mNormal.toFixed(4));

        const fTex = TANGENT_NORMAL._quadTeX(a, b, 0).replace(' + 0', '').replace(' - 0', '');
        const bTex = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
        const fDisplayTex = `${a === 1 ? '' : a}x^2${bTex}`;
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);
        const mNormalTex = MathUtils.fractionTeX(-1, fprime);

        return {
            type: 'free',
            rule: 'Normal Gradient',
            difficulty: 'easy',
            text: `Find the gradient of the normal to the curve at \\(x = ${p}\\). Give your answer to 4 d.p.`,
            latex: `\\(f(x) = ${fDisplayTex}\\)`,
            answer: answer,
            answerTex: mNormalTex,
            options: [],
            hintTex: [
                `f'(x) = ${fpTex},\\quad f'(${p}) = ${fprime}`,
                `m_{\\text{normal}} = -\\dfrac{1}{f'(${p})} = -\\dfrac{1}{${fprime}} = ${mNormalTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = ${fpTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Gradient of tangent at \\(x = ${p}\\): \\(f'(${p}) = ${fprime}\\).<br><br>` +
                     `<strong>Step 3:</strong> Normal gradient is the negative reciprocal:<br>` +
                     `\\(m_{\\text{normal}} = -\\dfrac{1}{${fprime}} = ${mNormalTex} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${answer}\\) (to 4 d.p.)`
        };
    },

    /**
     * 4. qNormalYIntercept - Medium (Free response)
     * Normal at x = p to f(x) = ax² + bx + c. y-int of normal to 2 d.p.
     * Use f'(p) ∈ {1,2,4,-1,-2,-4}.
     */
    qNormalYIntercept() {
        const cleanDivs = [1, 2, 4, -1, -2, -4];
        const aVals = [1, 2, 3];
        const pVals = [0, 1, 2, -1, -2];

        const cleanCases = [];
        for (const a of aVals) {
            for (const p of pVals) {
                for (const target of cleanDivs) {
                    const b = target - 2 * a * p;
                    if (Number.isInteger(b) && Math.abs(b) <= 8) {
                        cleanCases.push({ a, b, p, fprime: target });
                    }
                }
            }
        }

        const chosen = MathUtils.pick(cleanCases);
        const { a, b, p, fprime } = chosen;
        const c = MathUtils.randInt(-5, 5);

        const fp = a * p * p + b * p + c;
        const mNormal = -1 / fprime;
        // y-int: c_n = f(p) - m_normal * p
        const yInt = fp - mNormal * p;
        const answer = parseFloat(yInt.toFixed(2));

        const fTex = TANGENT_NORMAL._quadTeX(a, b, c);
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);
        const mNormalTex = MathUtils.fractionTeX(-1, fprime);
        const yIntTex = Number.isInteger(yInt) ? String(yInt) : answer.toFixed(2);

        return {
            type: 'free',
            rule: 'Normal y-Intercept',
            difficulty: 'medium',
            text: `Find the y-intercept of the normal to the curve at \\(x = ${p}\\). Give your answer to 2 d.p.`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: answer,
            answerTex: yIntTex,
            options: [],
            hintTex: [
                `f(${p}) = ${fp},\\quad f'(${p}) = ${fprime},\\quad m_{\\text{normal}} = ${mNormalTex}`,
                `c_{\\text{normal}} = f(${p}) - m_{\\text{normal}} \\cdot ${p} = ${fp} - (${mNormalTex})(${p})`
            ],
            explain: `<strong>Step 1:</strong> Evaluate: \\(f(${p}) = ${fp}\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(f'(x) = ${fpTex}\\), so \\(f'(${p}) = ${fprime}\\).<br><br>` +
                     `<strong>Step 3:</strong> Normal gradient: \\(m_{\\text{normal}} = ${mNormalTex}\\).<br><br>` +
                     `<strong>Step 4:</strong> Normal line: \\(y = ${mNormalTex}x + c\\). Substitute \\((${p},\\,${fp})\\):<br>` +
                     `\\(c = ${fp} - (${mNormalTex})(${p}) = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> y-intercept of normal = \\(${answer}\\) (to 2 d.p.)`
        };
    },

    /**
     * 5. qTangentAtCubic - Medium (Free response)
     * f(x) = x³ - ax, find gradient at x = p.
     * f'(x) = 3x² - a. Answer = 3p² - a (integer).
     */
    qTangentAtCubic() {
        const aVals = [2, 3, 4, 6];
        const pVals = [1, 2, -1, -2];
        const a = MathUtils.pick(aVals);
        const p = MathUtils.pick(pVals);

        const answer = 3 * p * p - a;

        // f(x) = x³ - ax display
        const aTex = a === 1 ? '' : String(a);
        const fTex = `x^3 - ${aTex}x`;

        return {
            type: 'free',
            rule: 'Tangent at Cubic',
            difficulty: 'medium',
            text: `Find the gradient of the tangent to the curve at \\(x = ${p}\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f'(x) = 3x^2 - ${a}`,
                `f'(${p}) = 3(${p})^2 - ${a} = ${3 * p * p} - ${a} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = 3x^2 - ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${p}\\):<br>` +
                     `\\(f'(${p}) = 3(${p})^2 - ${a} = 3 \\cdot ${p * p} - ${a} = ${3 * p * p} - ${a} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> The gradient of the tangent at \\(x = ${p}\\) is \\(${answer}\\).`
        };
    },

    /**
     * 6. qParallelTangent - Medium (Free response)
     * Find x where tangent to f(x) = ax² + bx + c is parallel to y = mx + d.
     * Set 2ax + b = m → x = (m - b)/(2a). Answer to 2 d.p.
     */
    qParallelTangent() {
        const a = MathUtils.pick([1, 2, 3]);
        const b = MathUtils.randInt(-4, 4);
        const c = MathUtils.randInt(-5, 5);
        const d = MathUtils.randInt(-5, 5);
        // Choose target gradient m ≠ b so solution is non-trivial
        let m;
        do {
            m = MathUtils.randInt(-8, 8);
        } while (m === b);

        // x = (m - b) / (2a)
        const xNum = m - b;
        const xDen = 2 * a;
        const xSol = xNum / xDen;
        const answer = parseFloat(xSol.toFixed(2));

        const fTex = TANGENT_NORMAL._quadTeX(a, b, c);
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);
        const lineTex = TANGENT_NORMAL._lineTeX(m, d);
        const xTex = Number.isInteger(xSol) ? String(xSol) : MathUtils.fractionTeX(xNum, xDen);

        return {
            type: 'free',
            rule: 'Parallel Tangent',
            difficulty: 'medium',
            text: `Find the x-coordinate where the tangent to \\(f(x) = ${fTex}\\) is parallel to \\(${lineTex}\\). Give your answer to 2 d.p.`,
            latex: '',
            answer: answer,
            answerTex: xTex,
            options: [],
            hintTex: [
                `\\text{Parallel means equal gradients: } f'(x) = ${m}`,
                `${fpTex} = ${m} \\implies 2(${a})x = ${m} - (${b}) \\implies x = \\dfrac{${xNum}}{${xDen}}`
            ],
            explain: `<strong>Step 1:</strong> For parallel tangent, set \\(f'(x) = ${m}\\) (gradient of given line).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(f'(x) = ${fpTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve \\(${fpTex} = ${m}\\):<br>` +
                     `\\(2(${a})x = ${m} - (${b}) = ${xNum}\\)<br>` +
                     `\\(x = \\dfrac{${xNum}}{${xDen}} = ${xTex} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${answer}\\) (to 2 d.p.)`
        };
    },

    /**
     * 7. qHorizontalTangent - Easy (Free response)
     * Find x where tangent to f(x) = ax² + bx + c is horizontal.
     * f'(x) = 0 → 2ax + b = 0 → x = -b/(2a). Answer integer or simple decimal.
     * Use b divisible by 2a.
     */
    qHorizontalTangent() {
        const a = MathUtils.pick([1, 2, 3]);
        const c = MathUtils.randInt(-6, 6);
        // Ensure b is divisible by 2a for integer answer
        const multiplier = MathUtils.randInt(-4, 4);
        const b = multiplier * 2 * a; // ensures -b/(2a) = -multiplier
        const xSol = -multiplier; // integer

        const fTex = TANGENT_NORMAL._quadTeX(a, b, c);
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);

        return {
            type: 'free',
            rule: 'Horizontal Tangent',
            difficulty: 'easy',
            text: `Find the x-coordinate where the tangent to the curve is horizontal.`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: xSol,
            answerTex: String(xSol),
            options: [],
            hintTex: [
                `\\text{Horizontal tangent} \\implies f'(x) = 0`,
                `${fpTex} = 0 \\implies x = \\dfrac{-${b}}{2 \\cdot ${a}} = ${xSol}`
            ],
            explain: `<strong>Step 1:</strong> A horizontal tangent has gradient 0, so set \\(f'(x) = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(f'(x) = ${fpTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve \\(${fpTex} = 0\\):<br>` +
                     `\\(2(${a})x = -(${b})\\)<br>` +
                     `\\(x = \\dfrac{${-b}}{${2 * a}} = ${xSol}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${xSol}\\).`
        };
    },

    /**
     * 8. qNormalXIntercept - Hard (Free response)
     * Normal to f(x) = ax² + bx at x = p. x-intercept: x = p - f(p)/m_normal. To 2 d.p.
     */
    qNormalXIntercept() {
        const cleanDivs = [1, 2, 4, -1, -2, -4];
        const aVals = [1, 2, 3];
        const pVals = [1, 2, -1, -2];

        const cleanCases = [];
        for (const a of aVals) {
            for (const p of pVals) {
                for (const target of cleanDivs) {
                    const b = target - 2 * a * p;
                    if (Number.isInteger(b) && Math.abs(b) <= 8 && b !== 0) {
                        cleanCases.push({ a, b, p, fprime: target });
                    }
                }
            }
        }

        const chosen = MathUtils.pick(cleanCases);
        const { a, b, p, fprime } = chosen;

        const fp = a * p * p + b * p; // f(p), c=0
        const mNormal = -1 / fprime;
        // Normal line: y - f(p) = m_n(x - p) → y = m_n*x + (f(p) - m_n*p)
        // x-intercept: 0 = m_n*x + (f(p) - m_n*p) → x = p - f(p)/m_n
        const xInt = p - fp / mNormal;
        const answer = parseFloat(xInt.toFixed(2));

        // f(x) = ax² + bx
        const bTex = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
        const fDisplayTex = `${a === 1 ? '' : a}x^2${bTex}`;
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);
        const mNormalTex = MathUtils.fractionTeX(-1, fprime);

        return {
            type: 'free',
            rule: 'Normal x-Intercept',
            difficulty: 'hard',
            text: `Find the x-intercept of the normal to the curve at \\(x = ${p}\\). Give your answer to 2 d.p.`,
            latex: `\\(f(x) = ${fDisplayTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f(${p}) = ${fp},\\quad f'(${p}) = ${fprime},\\quad m_{\\text{normal}} = ${mNormalTex}`,
                `\\text{Normal line: } y - ${fp} = ${mNormalTex}(x - ${p}). \\text{ Set } y = 0 \\text{ to find x-intercept.}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate: \\(f(${p}) = ${fp}\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(f'(x) = ${fpTex}\\), so \\(f'(${p}) = ${fprime}\\).<br><br>` +
                     `<strong>Step 3:</strong> Normal gradient: \\(m_{\\text{normal}} = ${mNormalTex}\\).<br><br>` +
                     `<strong>Step 4:</strong> Normal line: \\(y - ${fp} = ${mNormalTex}(x - ${p})\\).<br><br>` +
                     `<strong>Step 5:</strong> Set \\(y = 0\\):<br>` +
                     `\\(-${fp} = ${mNormalTex}(x - ${p})\\)<br>` +
                     `\\(x - ${p} = -${fp} \\div ${mNormalTex} = ${-fp * fprime}\\)<br>` +
                     `\\(x = ${p} + ${-fp * fprime} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> x-intercept = \\(${answer}\\) (to 2 d.p.)`
        };
    },

    /**
     * 9. qPointOnTangent - Medium (MC)
     * Tangent to y = x² + ax at x = p. Which point lies on the tangent?
     * 4 MC options as coordinate pairs.
     */
    qPointOnTangent() {
        const a = MathUtils.randInt(-4, 4);
        const pVals = [1, 2, -1, -2, 3, -3];
        const p = MathUtils.pick(pVals);

        // f(x) = x² + ax, f'(x) = 2x + a
        const fp = p * p + a * p;
        const m = 2 * p + a;
        // Tangent: y = mx + c, c = f(p) - m*p
        const cInt = fp - m * p;

        // fTex
        const aTex = a === 0 ? 'x^2' : (a > 0 ? `x^2 + ${a}x` : `x^2 - ${Math.abs(a)}x`);

        // Generate correct point on tangent: pick some x_0
        const x0 = MathUtils.pick([0, 1, -1, 2, -2, 3, -3].filter(v => v !== p));
        const y0 = m * x0 + cInt;
        const correctTex = `\\left(${x0},\\,${y0}\\right)`;

        // Generate 3 distractor points (not on tangent)
        const distractors = [];
        const usedX = new Set([x0]);
        while (distractors.length < 3) {
            const xD = MathUtils.randInt(-5, 5);
            if (usedX.has(xD)) continue;
            usedX.add(xD);
            const yCorrect = m * xD + cInt;
            const offset = MathUtils.nonZeroRandInt(-3, 3);
            const yD = yCorrect + offset;
            distractors.push(`\\left(${xD},\\,${yD}\\right)`);
        }

        const optionTexts = [correctTex, ...distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);
        const tangentTex = TANGENT_NORMAL._lineTeX(m, cInt);

        return {
            type: 'mc',
            rule: 'Point on Tangent',
            difficulty: 'medium',
            text: `The tangent to \\(y = ${aTex}\\) at \\(x = ${p}\\) is the line \\(${tangentTex}\\). Which of the following points lies on this tangent?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Tangent at } x=${p}\\text{: gradient } m = 2(${p}) + ${a} = ${m}, \\text{ point } (${p},\\,${fp})`,
                `\\text{Substitute each point into } ${tangentTex} \\text{ to check which satisfies it.}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = 2x + ${a}\\), so \\(f'(${p}) = ${m}\\).<br><br>` +
                     `<strong>Step 2:</strong> Point of tangency: \\((${p},\\,${fp})\\). Tangent: \\(${tangentTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Check \\(${correctTex}\\): \\(y = ${m}(${x0}) + ${cInt} = ${m * x0} + ${cInt} = ${y0}\\). ✓<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex}\\) lies on the tangent.`
        };
    },

    /**
     * 10. qTangentEquation - Medium (MC)
     * f(x) = ax² + bx + c, tangent at x = p. Which equation is correct?
     * Correct: m = f'(p), y-int = f(p) - f'(p)*p.
     */
    qTangentEquation() {
        const a = MathUtils.pick([1, 2, 3]);
        const b = MathUtils.randInt(-4, 4);
        const c = MathUtils.randInt(-5, 5);
        const pVals = [0, 1, 2, -1, -2];
        const p = MathUtils.pick(pVals);

        const fp = a * p * p + b * p + c;
        const m = 2 * a * p + b;
        const yInt = fp - m * p;

        const fTex = TANGENT_NORMAL._quadTeX(a, b, c);
        const correctTex = TANGENT_NORMAL._lineTeX(m, yInt);

        // Distractors
        // D1: wrong gradient (use a*p + b instead of 2a*p + b — forgot factor of 2)
        const mD1 = a * p + b;
        const yIntD1 = fp - mD1 * p;
        const d1Tex = TANGENT_NORMAL._lineTeX(mD1, yIntD1);

        // D2: correct gradient but wrong intercept (use f(p) as the intercept, not the true y-int)
        const d2Tex = TANGENT_NORMAL._lineTeX(m, fp);

        // D3: negated gradient
        const mD3 = -(2 * a * p + b);
        const yIntD3 = fp - mD3 * p;
        const d3Tex = TANGENT_NORMAL._lineTeX(mD3, yIntD3);

        const optionTexts = [correctTex, d1Tex, d2Tex, d3Tex];
        // Deduplicate
        const seen = [correctTex];
        for (const d of [d1Tex, d2Tex, d3Tex]) {
            if (!seen.includes(d)) {
                seen.push(d);
            } else {
                const offset = MathUtils.nonZeroRandInt(-3, 3);
                const fallback = TANGENT_NORMAL._lineTeX(m, yInt + offset);
                seen.push(fallback);
            }
        }

        const options = seen.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);
        const fpTex = TANGENT_NORMAL._derivQuadTeX(a, b);

        return {
            type: 'mc',
            rule: 'Tangent Equation',
            difficulty: 'medium',
            text: `Find the equation of the tangent to the curve at \\(x = ${p}\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `f'(x) = ${fpTex}, \\quad f'(${p}) = ${m}, \\quad f(${p}) = ${fp}`,
                `y - ${fp} = ${m}(x - ${p}) \\implies ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = ${fpTex}\\), so \\(f'(${p}) = ${m}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate: \\(f(${p}) = ${fp}\\).<br><br>` +
                     `<strong>Step 3:</strong> Tangent through \\((${p},\\,${fp})\\) with gradient \\(${m}\\):<br>` +
                     `\\(y - ${fp} = ${m}(x - ${p})\\)<br>` +
                     `\\(y = ${m}x + ${yInt}\\)<br>` +
                     `\\(y = ${correctTex.replace('y = ', '')}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    /** Format y = mx + c in LaTeX */
    _lineTeX(m, c) {
        let mPart;
        if (m === 1) mPart = '';
        else if (m === -1) mPart = '-';
        else mPart = String(m);

        let cPart;
        if (c === 0) cPart = '';
        else if (c > 0) cPart = ` + ${c}`;
        else cPart = ` - ${Math.abs(c)}`;

        return `y = ${mPart}x${cPart}`;
    },

    /** Format ax² + bx + c in LaTeX */
    _quadTeX(a, b, c) {
        let parts = '';

        // ax² term
        if (a === 1) parts += 'x^2';
        else if (a === -1) parts += '-x^2';
        else parts += `${a}x^2`;

        // bx term
        if (b > 0) parts += ` + ${b === 1 ? '' : b}x`;
        else if (b < 0) parts += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;

        // c term
        if (c > 0) parts += ` + ${c}`;
        else if (c < 0) parts += ` - ${Math.abs(c)}`;

        return parts;
    },

    /** Format derivative 2ax + b in LaTeX */
    _derivQuadTeX(a, b) {
        const coeff = 2 * a;
        let parts = '';

        // 2ax term
        if (coeff === 1) parts += 'x';
        else if (coeff === -1) parts += '-x';
        else parts += `${coeff}x`;

        // b term
        if (b > 0) parts += ` + ${b}`;
        else if (b < 0) parts += ` - ${Math.abs(b)}`;

        return parts;
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => TANGENT_NORMAL.qTangentGradient(),    weight: 3, difficulty: 'easy'   },
            { fn: () => TANGENT_NORMAL.qTangentYIntercept(),  weight: 3, difficulty: 'easy'   },
            { fn: () => TANGENT_NORMAL.qNormalGradient(),     weight: 3, difficulty: 'easy'   },
            { fn: () => TANGENT_NORMAL.qNormalYIntercept(),   weight: 2, difficulty: 'medium' },
            { fn: () => TANGENT_NORMAL.qTangentAtCubic(),     weight: 2, difficulty: 'medium' },
            { fn: () => TANGENT_NORMAL.qParallelTangent(),    weight: 2, difficulty: 'medium' },
            { fn: () => TANGENT_NORMAL.qHorizontalTangent(),  weight: 3, difficulty: 'easy'   },
            { fn: () => TANGENT_NORMAL.qNormalXIntercept(),   weight: 1, difficulty: 'hard'   },
            { fn: () => TANGENT_NORMAL.qPointOnTangent(),     weight: 2, difficulty: 'medium' },
            { fn: () => TANGENT_NORMAL.qTangentEquation(),    weight: 2, difficulty: 'medium' }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (TANGENT_NORMAL.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (TANGENT_NORMAL.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (TANGENT_NORMAL.level === 'hard') {
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
        TANGENT_NORMAL.score = 0;
        TANGENT_NORMAL.total = 0;
        TANGENT_NORMAL.streak = 0;
        TANGENT_NORMAL.answered = false;
        TANGENT_NORMAL.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="TANGENT_NORMAL.unload()">Tangent &amp; Normal Lines (5.4)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Tangent &amp; Normal Lines</h1>
                <p>IB Math AA 5.4 – Equations of tangents and normals to curves</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="TANGENT_NORMAL.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="TANGENT_NORMAL.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="TANGENT_NORMAL.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="TANGENT_NORMAL.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="tan-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="tan-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="tan-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="tan-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="tan-question-card">
                <span class="rule-tag" id="tan-rule"></span>
                <span class="difficulty-tag" id="tan-difficulty"></span>
                <div class="question-text" id="tan-text"></div>
                <div class="question-prompt" id="tan-latex"></div>
                <div id="tan-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="tan-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="tan-feedback">
                <div class="feedback-title" id="tan-feedback-title"></div>
                <div class="feedback-explanation" id="tan-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="tan-hint-btn" onclick="TANGENT_NORMAL.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="tan-next-btn" onclick="TANGENT_NORMAL.next()" style="display:none;">Next Question</button>
            </div>
        `;

        TANGENT_NORMAL.next();
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
        TANGENT_NORMAL.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        TANGENT_NORMAL.score = 0;
        TANGENT_NORMAL.total = 0;
        TANGENT_NORMAL.streak = 0;
        TANGENT_NORMAL.updateStats();
        TANGENT_NORMAL.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        TANGENT_NORMAL.answered = false;
        TANGENT_NORMAL.hintIndex = 0;
        TANGENT_NORMAL.currentQ = TANGENT_NORMAL.pickQuestion();
        const q = TANGENT_NORMAL.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('tan-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('tan-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('tan-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('tan-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('tan-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="TANGENT_NORMAL.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="tan-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')TANGENT_NORMAL.checkFree()">
                    <button class="btn btn-primary" onclick="TANGENT_NORMAL.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('tan-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('tan-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('tan-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('tan-next-btn').style.display = 'none';
        document.getElementById('tan-hint-btn').style.display = '';
        document.getElementById('tan-hint-btn').disabled = false;

        // Render KaTeX
        TANGENT_NORMAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = TANGENT_NORMAL.currentQ;
        if (!q || !q.hintTex || TANGENT_NORMAL.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('tan-hint-box');
        const hintContent = TANGENT_NORMAL.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[TANGENT_NORMAL.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        TANGENT_NORMAL.hintIndex++;

        if (TANGENT_NORMAL.hintIndex >= q.hintTex.length) {
            document.getElementById('tan-hint-btn').disabled = true;
        }

        TANGENT_NORMAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (TANGENT_NORMAL.answered) return;
        TANGENT_NORMAL.answered = true;
        TANGENT_NORMAL.total++;

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
            TANGENT_NORMAL.score++;
            TANGENT_NORMAL.streak++;
        } else {
            btn.classList.add('incorrect');
            TANGENT_NORMAL.streak = 0;
        }

        TANGENT_NORMAL.showFeedback(isCorrect);
        TANGENT_NORMAL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (TANGENT_NORMAL.answered) return;

        const inp = document.getElementById('tan-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        TANGENT_NORMAL.answered = true;
        TANGENT_NORMAL.total++;
        inp.disabled = true;

        const q = TANGENT_NORMAL.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            TANGENT_NORMAL.score++;
            TANGENT_NORMAL.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            TANGENT_NORMAL.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        TANGENT_NORMAL.showFeedback(isCorrect);
        TANGENT_NORMAL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = TANGENT_NORMAL.currentQ;
        const fb = document.getElementById('tan-feedback');
        const title = document.getElementById('tan-feedback-title');
        const explanation = document.getElementById('tan-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (TANGENT_NORMAL.streak > 1) {
                title.textContent = `Correct! (${TANGENT_NORMAL.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('tan-next-btn').style.display = '';
        document.getElementById('tan-hint-btn').style.display = 'none';

        TANGENT_NORMAL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('tan-score');
        const totalEl = document.getElementById('tan-total');
        const streakEl = document.getElementById('tan-streak');
        const accEl = document.getElementById('tan-accuracy');

        if (scoreEl) scoreEl.textContent = TANGENT_NORMAL.score;
        if (totalEl) totalEl.textContent = TANGENT_NORMAL.total;
        if (streakEl) streakEl.textContent = TANGENT_NORMAL.streak;
        if (accEl) {
            accEl.textContent = TANGENT_NORMAL.total > 0
                ? Math.round((TANGENT_NORMAL.score / TANGENT_NORMAL.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['tangent-normal'] = () => TANGENT_NORMAL.load();
