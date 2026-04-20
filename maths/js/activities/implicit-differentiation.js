/*
 * implicit-differentiation.js - IB Math AA 5.14: Implicit Differentiation
 * Differentiating implicitly when y = f(x) is not isolated,
 * chain rule for y^n, finding dy/dx, tangent lines to implicit curves.
 */

const IMPLICIT = {
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
     * 1. qDiffImplicitSimple - Easy (Free)
     * Differentiate x² + y² = r² implicitly.
     * 2x + 2y·(dy/dx) = 0 → dy/dx = -x/y.
     * At a Pythagorean-triple point (a, b): dy/dx = -a/b.
     */
    qDiffImplicitSimple() {
        const triples = [
            [3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10],
            [9, 12, 15], [7, 24, 25], [20, 21, 29]
        ];
        const [a, b, r] = MathUtils.pick(triples);
        const rSq = r * r;

        const answer = -(a / b);
        const answerTex = MathUtils.fractionTeX(-a, b);

        return {
            type: 'free',
            rule: 'Implicit – Circle',
            difficulty: 'easy',
            text: `For the circle \\(x^2 + y^2 = ${rSq}\\), find \\(\\dfrac{dy}{dx}\\) at the point \\((${a},\\,${b})\\).`,
            latex: `\\text{Give your answer as a decimal (2 d.p. if needed)}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Differentiate both sides with respect to } x:\\quad 2x + 2y\\frac{dy}{dx} = 0`,
                `\\frac{dy}{dx} = -\\frac{x}{y} \\implies \\text{at }(${a},\\,${b}): \\frac{dy}{dx} = -\\frac{${a}}{${b}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides with respect to \\(x\\):<br>` +
                     `\\(\\dfrac{d}{dx}[x^2] + \\dfrac{d}{dx}[y^2] = 0 \\implies 2x + 2y\\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Isolate \\(\\dfrac{dy}{dx}\\):<br>` +
                     `\\(2y\\dfrac{dy}{dx} = -2x \\implies \\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\((${a},\\,${b})\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${a}}{${b}} = ${answerTex}\\).`
        };
    },

    /**
     * 2. qDiffX2Y - Easy (Free)
     * x² + y = k → dy/dx = -2x. At x = a: dy/dx = -2a.
     */
    qDiffX2Y() {
        const a = MathUtils.pick([1, 2, 3, 4]);
        const k = MathUtils.randInt(5, 20);
        const answer = -2 * a;

        return {
            type: 'free',
            rule: 'Implicit – Linear y',
            difficulty: 'easy',
            text: `Given \\(x^2 + y = ${k}\\), find \\(\\dfrac{dy}{dx}\\) at \\(x = ${a}\\).`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Differentiate both sides: }\\frac{d}{dx}[x^2] + \\frac{d}{dx}[y] = 0`,
                `2x + \\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -2x,\\quad\\text{so at }x=${a}:\\frac{dy}{dx} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides with respect to \\(x\\):<br>` +
                     `\\(2x + \\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve for \\(\\dfrac{dy}{dx}\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -2x\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(x = ${a}\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -2(${a}) = ${answer}\\).`
        };
    },

    /**
     * 3. qDiffXY - Medium (Free)
     * xy = k → differentiate: y + x·dy/dx = 0 → dy/dx = -y/x.
     * At (a, k/a): dy/dx = -(k/a)/a = -k/a². Pick k = a² * n for integer answer.
     */
    qDiffXY() {
        const aVals = [2, 3, 4];
        const a = MathUtils.pick(aVals);
        const n = MathUtils.pick([1, 2, 3, 4]);
        const k = n * a * a;          // ensures -k/a² = -n  (integer)
        const yAtPoint = k / a;       // = n * a
        const answer = -n;
        const answerTex = String(answer);

        return {
            type: 'free',
            rule: 'Implicit – Product xy',
            difficulty: 'medium',
            text: `Given \\(xy = ${k}\\), find \\(\\dfrac{dy}{dx}\\) at the point \\((${a},\\,${yAtPoint})\\).`,
            latex: '',
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Differentiate both sides using the product rule: }y + x\\frac{dy}{dx} = 0`,
                `\\frac{dy}{dx} = -\\frac{y}{x} \\implies \\text{at }(${a},\\,${yAtPoint}): \\frac{dy}{dx} = -\\frac{${yAtPoint}}{${a}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides with respect to \\(x\\) using the product rule on the left:<br>` +
                     `\\(\\dfrac{d}{dx}[xy] = y + x\\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Isolate \\(\\dfrac{dy}{dx}\\):<br>` +
                     `\\(x\\dfrac{dy}{dx} = -y \\implies \\dfrac{dy}{dx} = -\\dfrac{y}{x}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\((${a},\\,${yAtPoint})\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${yAtPoint}}{${a}} = ${answerTex}\\).`
        };
    },

    /**
     * 4. qDiffY2 - Easy (Free)
     * y² + ax = b → differentiate: 2y·dy/dx + a = 0 → dy/dx = -a/(2y).
     * At y = 1: dy/dx = -a/2. Use a ∈ {2, 4, 6, 8} for integer answer.
     */
    qDiffY2() {
        const a = MathUtils.pick([2, 4, 6, 8]);
        const b = MathUtils.randInt(5, 20);
        const answer = -(a / 2);

        return {
            type: 'free',
            rule: 'Implicit – y² term',
            difficulty: 'easy',
            text: `Given \\(y^2 + ${a}x = ${b}\\), find \\(\\dfrac{dy}{dx}\\) at \\(y = 1\\).`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Differentiate: }2y\\frac{dy}{dx} + ${a} = 0`,
                `\\frac{dy}{dx} = -\\frac{${a}}{2y} \\implies \\text{at }y=1: \\frac{dy}{dx} = -\\frac{${a}}{2} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides with respect to \\(x\\).<br>` +
                     `For \\(y^2\\) use the chain rule: \\(\\dfrac{d}{dx}[y^2] = 2y\\dfrac{dy}{dx}\\).<br><br>` +
                     `\\(2y\\dfrac{dy}{dx} + ${a} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve:<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${a}}{2y}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(y = 1\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${a}}{2} = ${answer}\\).`
        };
    },

    /**
     * 5. qDiffCircle - Medium (MC)
     * For x² + y² = 25, find dy/dx at (3, 4). Answer = -3/4 = -0.75.
     * 4 MC options.
     */
    qDiffCircle() {
        // Fix the classic IB question: (3,4) on x²+y²=25
        const configs = [
            { r2: 25, px: 3, py: 4 },
            { r2: 169, px: 5, py: 12 },
            { r2: 100, px: 6, py: 8 },
            { r2: 289, px: 8, py: 15 }
        ];
        const cfg = MathUtils.pick(configs);
        const { r2, px, py } = cfg;

        const [an, ad] = MathUtils.simplifyFraction(-px, py);
        const correctTex = MathUtils.fractionTeX(an, ad);
        const correctVal = an / ad;

        // Build distractors
        const distractors = [
            { tex: MathUtils.fractionTeX(px, py),   val: px / py },          // positive version
            { tex: MathUtils.fractionTeX(-py, px),  val: -py / px },         // flipped
            { tex: MathUtils.fractionTeX(py, px),   val: py / px }           // positive flipped
        ];

        const options = [{ value: 1, tex: correctTex }];
        for (const d of distractors) {
            if (!options.some(o => MathUtils.approxEqual(o.value === 1 ? correctVal : 0, 0) || d.tex === correctTex)) {
                options.push({ value: 0, tex: d.tex });
            }
        }
        // Ensure exactly 4 unique options
        while (options.length < 4) {
            const off = options.length;
            const fb = MathUtils.fractionTeX(-(px + off), py);
            if (!options.some(o => o.tex === fb)) options.push({ value: 0, tex: fb });
            else options.push({ value: 0, tex: MathUtils.fractionTeX(-px, py + off) });
        }

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Implicit – Circle (MC)',
            difficulty: 'medium',
            text: `For the circle \\(x^2 + y^2 = ${r2}\\), find \\(\\dfrac{dy}{dx}\\) at the point \\((${px},\\,${py})\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Differentiate implicitly: }2x + 2y\\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{x}{y}`,
                `\\text{At }(${px},\\,${py}): \\frac{dy}{dx} = -\\frac{${px}}{${py}} = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(x^2 + y^2 = ${r2}\\) with respect to \\(x\\):<br>` +
                     `\\(2x + 2y\\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve: \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\((${px},\\,${py})\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${px}}{${py}} = ${correctTex}\\).`
        };
    },

    /**
     * 6. qTangentSlope - Medium (Free)
     * Slope of tangent to x² + y² = r² at (a, b). Answer = -a/b.
     * Uses Pythagorean triples.
     */
    qTangentSlope() {
        const triples = [
            [3, 4, 5], [5, 12, 13], [8, 15, 17], [9, 12, 15],
            [20, 21, 29], [6, 8, 10]
        ];
        const [a, b, r] = MathUtils.pick(triples);
        const rSq = r * r;
        const [sn, sd] = MathUtils.simplifyFraction(-a, b);
        const answerTex = MathUtils.fractionTeX(sn, sd);
        const answer = sn / sd;

        return {
            type: 'free',
            rule: 'Tangent – Implicit Curve',
            difficulty: 'medium',
            text: `Find the slope of the tangent to the curve \\(x^2 + y^2 = ${rSq}\\) at the point \\((${a},\\,${b})\\).`,
            latex: `\\text{Give your answer as a decimal (2 d.p. if needed)}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Differentiate implicitly: }2x + 2y\\frac{dy}{dx} = 0`,
                `\\frac{dy}{dx} = -\\frac{x}{y} \\implies \\text{at }(${a},\\,${b}): \\frac{dy}{dx} = -\\frac{${a}}{${b}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides w.r.t. \\(x\\):<br>` +
                     `\\(2x + 2y\\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange:<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute the point \\((${a},\\,${b})\\):<br>` +
                     `\\(\\text{slope} = -\\dfrac{${a}}{${b}} = ${answerTex}\\).`
        };
    },

    /**
     * 7. qDiffLinearImplicit - Easy (Free)
     * ax + by = c → dy/dx = -a/b. Pick a, b integers with clean fraction.
     */
    qDiffLinearImplicit() {
        const aVals = [1, 2, 3, 4, 5];
        const bVals = [1, 2, 3, 4, 5];
        const a = MathUtils.pick(aVals);
        const b = MathUtils.pick(bVals);
        const c = MathUtils.randInt(1, 20);

        const [sn, sd] = MathUtils.simplifyFraction(-a, b);
        const answer = sn / sd;
        const answerTex = MathUtils.fractionTeX(sn, sd);

        return {
            type: 'free',
            rule: 'Implicit – Linear',
            difficulty: 'easy',
            text: `Find \\(\\dfrac{dy}{dx}\\) for the equation \\(${a}x + ${b}y = ${c}\\).`,
            latex: `\\text{Give your answer as a decimal (2 d.p. if needed)}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Differentiate both sides w.r.t. }x:\\quad ${a} + ${b}\\frac{dy}{dx} = 0`,
                `\\frac{dy}{dx} = -\\frac{${a}}{${b}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides with respect to \\(x\\):<br>` +
                     `\\(\\dfrac{d}{dx}[${a}x] + \\dfrac{d}{dx}[${b}y] = 0 \\implies ${a} + ${b}\\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve for \\(\\dfrac{dy}{dx}\\):<br>` +
                     `\\(${b}\\dfrac{dy}{dx} = -${a} \\implies \\dfrac{dy}{dx} = -\\dfrac{${a}}{${b}} = ${answerTex}\\).`
        };
    },

    /**
     * 8. qDiffX2Y2 - Medium (Free)
     * 2x + y² = k → differentiate: 2 + 2y·dy/dx = 0 → dy/dx = -1/y.
     * At y = 2: dy/dx = -0.5. Answer = -0.5.
     */
    qDiffX2Y2() {
        const yVal = MathUtils.pick([2, 3, 4]);    // evaluate at y = yVal
        const k = MathUtils.randInt(10, 30);

        const [sn, sd] = MathUtils.simplifyFraction(-1, yVal);
        const answer = sn / sd;
        const answerTex = MathUtils.fractionTeX(sn, sd);

        return {
            type: 'free',
            rule: 'Implicit – Mixed Terms',
            difficulty: 'medium',
            text: `Given \\(2x + y^2 = ${k}\\), find \\(\\dfrac{dy}{dx}\\) at \\(y = ${yVal}\\).`,
            latex: `\\text{Give your answer as a decimal (2 d.p. if needed)}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Differentiate: }2 + 2y\\frac{dy}{dx} = 0`,
                `\\frac{dy}{dx} = -\\frac{1}{y} \\implies \\text{at }y=${yVal}: \\frac{dy}{dx} = -\\frac{1}{${yVal}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides with respect to \\(x\\):<br>` +
                     `\\(\\dfrac{d}{dx}[2x] + \\dfrac{d}{dx}[y^2] = 0 \\implies 2 + 2y\\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve for \\(\\dfrac{dy}{dx}\\):<br>` +
                     `\\(2y\\dfrac{dy}{dx} = -2 \\implies \\dfrac{dy}{dx} = -\\dfrac{1}{y}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(y = ${yVal}\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{1}{${yVal}} = ${answerTex}\\).`
        };
    },

    /**
     * 9. qSecondImplicit - Hard (MC)
     * For x² + y² = 1, the second derivative d²y/dx² = -1/y³.
     * 4 MC options testing the standard result.
     */
    qSecondImplicit() {
        // Standard result for x²+y²=1: d²y/dx² = -1/y³
        const correctTex = `-\\dfrac{1}{y^3}`;

        const options = MathUtils.shuffle([
            { value: 1, tex: `-\\dfrac{1}{y^3}` },
            { value: 0, tex: `\\dfrac{1}{y^3}` },
            { value: 0, tex: `-\\dfrac{x}{y^3}` },
            { value: 0, tex: `-\\dfrac{1}{y^2}` }
        ]);

        return {
            type: 'mc',
            rule: 'Second Implicit Derivative',
            difficulty: 'hard',
            text: `For \\(x^2 + y^2 = 1\\), which expression gives \\(\\dfrac{d^2y}{dx^2}\\)?`,
            latex: `\\text{Use the result } \\dfrac{dy}{dx} = -\\dfrac{x}{y}`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{From implicit differentiation: }\\frac{dy}{dx} = -\\frac{x}{y}`,
                `\\text{Differentiate again: }\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\!\\left[-\\frac{x}{y}\\right] = -\\frac{y - x\\frac{dy}{dx}}{y^2}`
            ],
            explain: `<strong>Step 1:</strong> We know \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\) from differentiating \\(x^2+y^2=1\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate \\(-\\dfrac{x}{y}\\) with respect to \\(x\\) using the quotient rule:<br>` +
                     `\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{y \\cdot 1 - x \\cdot \\dfrac{dy}{dx}}{y^2} = -\\dfrac{y - x\\left(-\\dfrac{x}{y}\\right)}{y^2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify the numerator:<br>` +
                     `\\(= -\\dfrac{y + \\dfrac{x^2}{y}}{y^2} = -\\dfrac{\\dfrac{y^2 + x^2}{y}}{y^2} = -\\dfrac{x^2+y^2}{y^3}\\).<br><br>` +
                     `<strong>Step 4:</strong> Since \\(x^2+y^2=1\\):<br>` +
                     `\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{1}{y^3}\\).`
        };
    },

    /**
     * 10. qImplicitEllipse - Medium (Free)
     * For x²/a² + y²/b² = 1, dy/dx = -(b²x)/(a²y).
     * At (0, b): dy/dx = 0. Answer = 0.
     */
    qImplicitEllipse() {
        const aVals = [2, 3, 4, 5];
        const bVals = [1, 2, 3, 4];
        const a = MathUtils.pick(aVals);
        let b;
        do { b = MathUtils.pick(bVals); } while (b === a);

        const aSq = a * a;
        const bSq = b * b;

        return {
            type: 'free',
            rule: 'Implicit – Ellipse',
            difficulty: 'medium',
            text: `For the ellipse \\(\\dfrac{x^2}{${aSq}} + \\dfrac{y^2}{${bSq}} = 1\\), find \\(\\dfrac{dy}{dx}\\) at the point \\((0,\\,${b})\\).`,
            latex: '',
            answer: 0,
            answerTex: '0',
            options: [],
            hintTex: [
                `\\text{Differentiate: }\\frac{2x}{${aSq}} + \\frac{2y}{${bSq}}\\frac{dy}{dx} = 0`,
                `\\frac{dy}{dx} = -\\frac{${bSq}\\,x}{${aSq}\\,y} \\implies \\text{at }(0,\\,${b}): \\frac{dy}{dx} = 0`
            ],
            explain: `<strong>Step 1:</strong> Differentiate both sides of \\(\\dfrac{x^2}{${aSq}} + \\dfrac{y^2}{${bSq}} = 1\\) with respect to \\(x\\):<br>` +
                     `\\(\\dfrac{2x}{${aSq}} + \\dfrac{2y}{${bSq}}\\dfrac{dy}{dx} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve for \\(\\dfrac{dy}{dx}\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${bSq}\\,x}{${aSq}\\,y}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\((0,\\,${b})\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${bSq} \\times 0}{${aSq} \\times ${b}} = 0\\).<br><br>` +
                     `<strong>Note:</strong> At \\((0,\\,${b})\\) the ellipse has a horizontal tangent.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => IMPLICIT.qDiffImplicitSimple(), weight: 2, difficulty: 'easy',   index: 0 },
            { fn: () => IMPLICIT.qDiffX2Y(),            weight: 3, difficulty: 'easy',   index: 1 },
            { fn: () => IMPLICIT.qDiffXY(),             weight: 2, difficulty: 'medium', index: 2 },
            { fn: () => IMPLICIT.qDiffY2(),             weight: 3, difficulty: 'easy',   index: 3 },
            { fn: () => IMPLICIT.qDiffCircle(),         weight: 2, difficulty: 'medium', index: 4 },
            { fn: () => IMPLICIT.qTangentSlope(),       weight: 2, difficulty: 'medium', index: 5 },
            { fn: () => IMPLICIT.qDiffLinearImplicit(), weight: 3, difficulty: 'easy',   index: 6 },
            { fn: () => IMPLICIT.qDiffX2Y2(),           weight: 2, difficulty: 'medium', index: 7 },
            { fn: () => IMPLICIT.qSecondImplicit(),     weight: 1, difficulty: 'hard',   index: 8 },
            { fn: () => IMPLICIT.qImplicitEllipse(),    weight: 2, difficulty: 'medium', index: 9 }
        ];

        // Filter by difficulty level
        let filtered = pool;
        if (IMPLICIT.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (IMPLICIT.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (IMPLICIT.level === 'hard') {
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
        IMPLICIT.score = 0;
        IMPLICIT.total = 0;
        IMPLICIT.streak = 0;
        IMPLICIT.answered = false;
        IMPLICIT.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="IMPLICIT.unload()">Implicit Differentiation (5.14)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Implicit Differentiation</h1>
                <p>IB Math AA 5.14 — Implicit curves, chain rule and tangent lines</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="IMPLICIT.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="IMPLICIT.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="IMPLICIT.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="IMPLICIT.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="impl-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="impl-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="impl-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="impl-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="impl-question-card">
                <span class="rule-tag" id="impl-rule"></span>
                <span class="difficulty-tag" id="impl-difficulty"></span>
                <div class="question-text" id="impl-text"></div>
                <div class="question-prompt" id="impl-latex"></div>
                <div id="impl-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="impl-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="impl-feedback">
                <div class="feedback-title" id="impl-feedback-title"></div>
                <div class="feedback-explanation" id="impl-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="impl-hint-btn" onclick="IMPLICIT.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="impl-next-btn" onclick="IMPLICIT.next()" style="display:none;">Next Question</button>
            </div>
        `;

        IMPLICIT.next();
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
        IMPLICIT.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        IMPLICIT.score = 0;
        IMPLICIT.total = 0;
        IMPLICIT.streak = 0;
        IMPLICIT.updateStats();
        IMPLICIT.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        IMPLICIT.answered = false;
        IMPLICIT.hintIndex = 0;
        IMPLICIT.currentQ = IMPLICIT.pickQuestion();
        const q = IMPLICIT.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('impl-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('impl-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('impl-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('impl-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('impl-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="IMPLICIT.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="impl-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')IMPLICIT.checkFree()">
                    <button class="btn btn-primary" onclick="IMPLICIT.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('impl-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('impl-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('impl-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('impl-next-btn').style.display = 'none';
        document.getElementById('impl-hint-btn').style.display = '';
        document.getElementById('impl-hint-btn').disabled = false;

        // Render KaTeX
        IMPLICIT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = IMPLICIT.currentQ;
        if (!q || !q.hintTex || IMPLICIT.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('impl-hint-box');
        const hintContent = IMPLICIT.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[IMPLICIT.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        IMPLICIT.hintIndex++;

        if (IMPLICIT.hintIndex >= q.hintTex.length) {
            document.getElementById('impl-hint-btn').disabled = true;
        }

        IMPLICIT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (IMPLICIT.answered) return;
        IMPLICIT.answered = true;
        IMPLICIT.total++;

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
            IMPLICIT.score++;
            IMPLICIT.streak++;
        } else {
            btn.classList.add('incorrect');
            IMPLICIT.streak = 0;
        }

        IMPLICIT.showFeedback(isCorrect);
        IMPLICIT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (IMPLICIT.answered) return;

        const inp = document.getElementById('impl-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        IMPLICIT.answered = true;
        IMPLICIT.total++;
        inp.disabled = true;

        const q = IMPLICIT.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            IMPLICIT.score++;
            IMPLICIT.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            IMPLICIT.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        IMPLICIT.showFeedback(isCorrect);
        IMPLICIT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = IMPLICIT.currentQ;
        const fb = document.getElementById('impl-feedback');
        const title = document.getElementById('impl-feedback-title');
        const explanation = document.getElementById('impl-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (IMPLICIT.streak > 1) {
                title.textContent = `Correct! (${IMPLICIT.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('impl-next-btn').style.display = '';
        document.getElementById('impl-hint-btn').style.display = 'none';

        IMPLICIT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('impl-score');
        const totalEl = document.getElementById('impl-total');
        const streakEl = document.getElementById('impl-streak');
        const accEl = document.getElementById('impl-accuracy');

        if (scoreEl) scoreEl.textContent = IMPLICIT.score;
        if (totalEl) totalEl.textContent = IMPLICIT.total;
        if (streakEl) streakEl.textContent = IMPLICIT.streak;
        if (accEl) {
            accEl.textContent = IMPLICIT.total > 0
                ? Math.round((IMPLICIT.score / IMPLICIT.total) * 100) + '%'
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
    ACTIVITY_INITS['implicit-differentiation'] = () => IMPLICIT.load();
}
