/*
 * differential-equations.js - IB Math AA 5.22: Differential Equations
 * Separable DEs and initial conditions
 */

const DIFF_EQ = {
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
     * 1. qSolveLinearDE - Easy (Free response)
     * dy/dx = ax + b. y = ax²/2 + bx + C.
     * Use x₀=0 so C = y₀. Then find y(x₁).
     */
    qSolveLinearDE() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-5, 5);
        const y0 = MathUtils.randInt(-8, 8);   // y(0) = y0, so C = y0
        const x1 = MathUtils.nonZeroRandInt(-4, 4);

        // y(x1) = a*x1²/2 + b*x1 + y0
        const answer = (a * x1 * x1) / 2 + b * x1 + y0;

        // Build DE display
        let rhsTex = '';
        if (a === 1) rhsTex += 'x';
        else if (a === -1) rhsTex += '-x';
        else rhsTex += `${a}x`;
        if (b > 0) rhsTex += ` + ${b}`;
        else if (b < 0) rhsTex += ` - ${Math.abs(b)}`;

        // y = ax²/2 + bx + C display
        let solTex = '';
        const aHalfN = a;
        const aHalfD = 2;
        if (a === 2) solTex += 'x^2';
        else if (a === -2) solTex += '-x^2';
        else solTex += `\\frac{${a}}{2}x^2`;
        if (b === 1) solTex += ' + x';
        else if (b === -1) solTex += ' - x';
        else if (b > 0) solTex += ` + ${b}x`;
        else if (b < 0) solTex += ` - ${Math.abs(b)}x`;
        solTex += ' + C';

        return {
            type: 'free',
            rule: 'Solve Linear DE',
            difficulty: 'easy',
            text: `Solve the differential equation below with initial condition \\(y(0) = ${y0}\\), then find \\(y(${x1})\\).`,
            latex: `\\(\\dfrac{dy}{dx} = ${rhsTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Integrate both sides: } y = ${solTex}`,
                `y(0) = ${y0} \\implies C = ${y0} \\quad\\Rightarrow\\quad y(${x1}) = \\frac{${a}}{2}(${x1})^2 + ${b}(${x1}) + ${y0}`
            ],
            explain: `<strong>Step 1:</strong> Integrate \\(\\frac{dy}{dx} = ${rhsTex}\\) to get \\(y = ${solTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply \\(y(0) = ${y0}\\): \\(${y0} = 0 + 0 + C\\), so \\(C = ${y0}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate \\(y(${x1}) = \\frac{${a}}{2}(${x1})^2 + ${b}(${x1}) + ${y0} = ${answer}\\).`
        };
    },

    /**
     * 2. qExponentialGrowth - Easy (Free response)
     * dy/dx = ky → y = Ae^(kx). Given y(0)=A and k, find y(x₁) to 2dp.
     */
    qExponentialGrowth() {
        const k = MathUtils.pick([1, 2]);
        const A = MathUtils.pick([1, 2, 3, 5]);
        const x1 = MathUtils.pick([1, 2]);

        const answer = parseFloat((A * Math.exp(k * x1)).toFixed(2));

        return {
            type: 'free',
            rule: 'Exponential Growth DE',
            difficulty: 'easy',
            text: `Solve the differential equation below with initial condition \\(y(0) = ${A}\\), then find \\(y(${x1})\\). Give your answer to 2 decimal places.`,
            latex: `\\(\\dfrac{dy}{dx} = ${k === 1 ? '' : k}y\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{General solution: } y = Ae^{${k === 1 ? '' : k}x}`,
                `y(0) = A = ${A} \\implies y(${x1}) = ${A}e^{${k === 1 ? '' : k}\\cdot ${x1}}`
            ],
            explain: `<strong>Step 1:</strong> The DE \\(\\frac{dy}{dx} = ${k === 1 ? '' : k}y\\) has general solution \\(y = Ae^{${k === 1 ? '' : k}x}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply \\(y(0) = ${A}\\): \\(A = ${A}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(y(${x1}) = ${A}e^{${k}\\times${x1}} = ${A}e^{${k * x1}} \\approx ${answer}\\).`
        };
    },

    /**
     * 3. qFindConstantIC - Easy (Free response)
     * dy/dx = k (constant). y = kx + C. Given y(0)=c, find y(p).
     */
    qFindConstantIC() {
        const k = MathUtils.nonZeroRandInt(-6, 6);
        const c = MathUtils.randInt(-8, 8);  // y(0) = c, so C = c
        const p = MathUtils.nonZeroRandInt(-5, 5);

        const answer = k * p + c;

        let kTex = String(k);

        return {
            type: 'free',
            rule: 'Constant Rate DE',
            difficulty: 'easy',
            text: `Solve the differential equation below with initial condition \\(y(0) = ${c}\\), then find \\(y(${p})\\).`,
            latex: `\\(\\dfrac{dy}{dx} = ${k}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Integrate: } y = ${k}x + C`,
                `y(0) = ${c} \\implies C = ${c} \\quad\\Rightarrow\\quad y(${p}) = ${k}(${p}) + ${c}`
            ],
            explain: `<strong>Step 1:</strong> Integrate \\(\\frac{dy}{dx} = ${k}\\) to get \\(y = ${k}x + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply \\(y(0) = ${c}\\): \\(C = ${c}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(y(${p}) = ${k}(${p}) + ${c} = ${k * p} + ${c} = ${answer}\\).`
        };
    },

    /**
     * 4. qSeparableDE - Medium (Free response)
     * dy/dx = ax·y → y = Ae^(ax²/2). Given y(0)=A, find y(x₁) to 2dp.
     */
    qSeparableDE() {
        const a = MathUtils.pick([1, 2]);
        const A = MathUtils.pick([1, 2]);
        const x1 = MathUtils.pick([1, 2]);

        const answer = parseFloat((A * Math.exp(a * x1 * x1 / 2)).toFixed(2));

        const aTex = a === 1 ? '' : String(a);

        return {
            type: 'free',
            rule: 'Separable DE',
            difficulty: 'medium',
            text: `Solve the separable differential equation below with \\(y(0) = ${A}\\), then find \\(y(${x1})\\). Give your answer to 2 decimal places.`,
            latex: `\\(\\dfrac{dy}{dx} = ${aTex}xy\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Separate: } \\frac{1}{y}\\,dy = ${aTex}x\\,dx \\implies \\ln|y| = \\frac{${a === 1 ? '' : a}x^2}{2} + C`,
                `y = Ae^{${a === 1 ? '' : a}x^2/2},\\quad y(0)=${A} \\implies A=${A} \\implies y(${x1})=${A}e^{${a}\\cdot${x1}^2/2}`
            ],
            explain: `<strong>Step 1:</strong> Separate variables: \\(\\frac{1}{y}\\,dy = ${aTex}x\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate both sides: \\(\\ln|y| = \\frac{${a === 1 ? '' : a}x^2}{2} + C\\).<br><br>` +
                     `<strong>Step 3:</strong> Exponentiate: \\(y = Ae^{${a === 1 ? '' : a}x^2/2}\\). With \\(y(0) = ${A}\\), \\(A = ${A}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(y(${x1}) = ${A}e^{${a * x1 * x1}/2} \\approx ${answer}\\).`
        };
    },

    /**
     * 5. qVerifySolution - Medium (MC)
     * Does y = Ae^(kx) satisfy dy/dx = ky? Always yes.
     */
    qVerifySolution() {
        const k = MathUtils.pick([1, 2, 3]);
        const A = MathUtils.pick([1, 2, 3, 5]);

        const kTex = k === 1 ? '' : String(k);
        const ATex = A === 1 ? '' : String(A);

        const correctTex = `\\text{Yes, } \\frac{dy}{dx} = ${kTex}${ATex}e^{${kTex}x} = ${k === 1 ? '' : k}y`;

        const options = MathUtils.shuffle([
            { value: 1, tex: correctTex },
            { value: 0, tex: `\\text{No, } \\frac{dy}{dx} = ${ATex}e^{${kTex}x} \\neq ${kTex}y` },
            { value: 0, tex: `\\text{Only if } A = 1` },
            { value: 0, tex: `\\text{Cannot determine without initial conditions}` }
        ]);

        return {
            type: 'mc',
            rule: 'Verify Solution',
            difficulty: 'medium',
            text: `Does \\(y = ${ATex}e^{${kTex}x}\\) satisfy the differential equation below?`,
            latex: `\\(\\dfrac{dy}{dx} = ${kTex}y\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Differentiate } y = ${ATex}e^{${kTex}x} \\text{ with respect to } x`,
                `\\frac{dy}{dx} = ${kTex}\\cdot${ATex}e^{${kTex}x} = ${kTex}y`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(y = ${ATex === '' ? '' : ATex}e^{${kTex}x}\\):<br>` +
                     `\\(\\frac{dy}{dx} = ${k}\\cdot ${A === 1 ? '' : A}e^{${kTex}x} = ${k * A}e^{${kTex}x}\\).<br><br>` +
                     `<strong>Step 2:</strong> Check: \\(${kTex}y = ${k === 1 ? '' : k}\\cdot ${A === 1 ? '' : A}e^{${kTex}x} = ${k * A}e^{${kTex}x}\\).<br><br>` +
                     `<strong>Result:</strong> \\(\\frac{dy}{dx} = ${kTex}y\\) ✓. Yes, \\(y = ${ATex}e^{${kTex}x}\\) is a valid solution.`
        };
    },

    /**
     * 6. qPopulationGrowth - Medium (Free response)
     * dP/dt = kP, P(0)=P₀. Find P(t₁) to nearest integer.
     */
    qPopulationGrowth() {
        const P0 = MathUtils.pick([100, 200, 500, 1000]);
        const k = MathUtils.pick([0.1, 0.2, 0.5]);
        const t1 = MathUtils.pick([1, 2, 5]);

        const answer = Math.round(P0 * Math.exp(k * t1));
        const exact = parseFloat((P0 * Math.exp(k * t1)).toFixed(4));

        return {
            type: 'free',
            rule: 'Population Growth',
            difficulty: 'medium',
            text: `A population satisfies the differential equation below with \\(P(0) = ${P0}\\). Find \\(P(${t1})\\), rounded to the nearest integer.`,
            latex: `\\(\\dfrac{dP}{dt} = ${k}P\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{General solution: } P(t) = P_0 e^{${k}t}`,
                `P(${t1}) = ${P0}e^{${k}\\times${t1}} = ${P0}e^{${k * t1}} \\approx ${exact}`
            ],
            explain: `<strong>Step 1:</strong> The DE \\(\\frac{dP}{dt} = ${k}P\\) has solution \\(P(t) = P_0 e^{${k}t}\\).<br><br>` +
                     `<strong>Step 2:</strong> With \\(P(0) = ${P0}\\), \\(P_0 = ${P0}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(${t1}) = ${P0}e^{${k * t1}} \\approx ${exact}\\).<br><br>` +
                     `<strong>Rounded to nearest integer:</strong> \\(${answer}\\).`
        };
    },

    /**
     * 7. qDecayModel - Medium (Free response)
     * dA/dt = -kA → A = A₀e^(-kt). Find A(t₁) to 2dp.
     */
    qDecayModel() {
        const A0 = MathUtils.pick([100, 200]);
        const k = MathUtils.pick([0.1, 0.2, 0.5]);
        const t1 = MathUtils.pick([2, 5, 10]);

        const answer = parseFloat((A0 * Math.exp(-k * t1)).toFixed(2));

        return {
            type: 'free',
            rule: 'Decay Model',
            difficulty: 'medium',
            text: `A quantity decays according to the differential equation below with \\(A(0) = ${A0}\\). Find \\(A(${t1})\\) to 2 decimal places.`,
            latex: `\\(\\dfrac{dA}{dt} = -${k}A\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{General solution: } A(t) = A_0 e^{-${k}t}`,
                `A(${t1}) = ${A0}e^{-${k}\\times${t1}} = ${A0}e^{-${k * t1}}`
            ],
            explain: `<strong>Step 1:</strong> The DE \\(\\frac{dA}{dt} = -${k}A\\) has solution \\(A(t) = A_0 e^{-${k}t}\\).<br><br>` +
                     `<strong>Step 2:</strong> With \\(A(0) = ${A0}\\), \\(A_0 = ${A0}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(A(${t1}) = ${A0}e^{-${k * t1}} \\approx ${answer}\\).`
        };
    },

    /**
     * 8. qDoubleTime - Hard (Free response)
     * dP/dt = kP, find doubling time t = ln(2)/k to 2dp.
     */
    qDoubleTime() {
        const k = MathUtils.pick([0.1, 0.2, 0.5, 1]);

        const answer = parseFloat((Math.LN2 / k).toFixed(2));

        return {
            type: 'free',
            rule: 'Doubling Time',
            difficulty: 'hard',
            text: `A population grows according to \\(\\frac{dP}{dt} = ${k}P\\). Find the doubling time (the time for the population to double). Give your answer to 2 decimal places.`,
            latex: `\\(t_{\\text{double}} = ?\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Solution: } P(t) = P_0 e^{${k}t}. \\text{ Double when } P(t) = 2P_0`,
                `e^{${k}t} = 2 \\implies ${k}t = \\ln 2 \\implies t = \\frac{\\ln 2}{${k}}`
            ],
            explain: `<strong>Step 1:</strong> Solution is \\(P(t) = P_0 e^{${k}t}\\).<br><br>` +
                     `<strong>Step 2:</strong> Set \\(P(t) = 2P_0\\): \\(e^{${k}t} = 2\\).<br><br>` +
                     `<strong>Step 3:</strong> Take natural log: \\(${k}t = \\ln 2\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(t = \\dfrac{\\ln 2}{${k}} \\approx ${answer}\\).`
        };
    },

    /**
     * 9. qSeparableGeneral - Hard (Free response)
     * dy/dx = x/y → y² = x² + 2C. y(0)=b → 2C=b². y(a) = √(a²+b²) = integer (Pythagorean triple).
     */
    qSeparableGeneral() {
        const triples = [
            { a: 3, b: 4, hyp: 5 },
            { a: 4, b: 3, hyp: 5 },
            { a: 5, b: 12, hyp: 13 },
            { a: 12, b: 5, hyp: 13 }
        ];
        const { a, b, hyp } = MathUtils.pick(triples);

        return {
            type: 'free',
            rule: 'Separable DE (General)',
            difficulty: 'hard',
            text: `Solve the separable differential equation below with initial condition \\(y(0) = ${b}\\), then find \\(y(${a})\\).`,
            latex: `\\(\\dfrac{dy}{dx} = \\dfrac{x}{y}\\)`,
            answer: hyp,
            answerTex: String(hyp),
            options: [],
            hintTex: [
                `\\text{Separate: } y\\,dy = x\\,dx \\implies \\frac{y^2}{2} = \\frac{x^2}{2} + C \\implies y^2 = x^2 + 2C`,
                `y(0) = ${b} \\implies ${b}^2 = 0 + 2C \\implies 2C = ${b * b} \\implies y(${a}) = \\sqrt{${a}^2 + ${b * b}}`
            ],
            explain: `<strong>Step 1:</strong> Separate variables: \\(y\\,dy = x\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate both sides: \\(\\frac{y^2}{2} = \\frac{x^2}{2} + C\\), i.e. \\(y^2 = x^2 + 2C\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply \\(y(0) = ${b}\\): \\(${b}^2 = 0 + 2C\\), so \\(2C = ${b * b}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(y(${a}) = \\sqrt{${a}^2 + ${b * b}} = \\sqrt{${a * a + b * b}} = ${hyp}\\).`
        };
    },

    /**
     * 10. qSlopeFieldInterpret - Hard (MC)
     * Given dy/dx = f(x,y), which statement about the solution curve is true?
     */
    qSlopeFieldInterpret() {
        const deTypes = [
            {
                deTex: 'y',
                question: 'For the DE below, which statement about the solution curves is correct?',
                correctTex: '\\text{Solution curves are exponential: } y = Ae^x',
                distractors: [
                    '\\text{Solution curves are linear: } y = x + C',
                    '\\text{Solution curves are parabolas: } y = x^2 + C',
                    '\\text{Solution curves are constant: } y = C'
                ],
                explain: 'The DE <strong>dy/dx = y</strong> is solved by separating variables: dy/y = dx → ln|y| = x + C → y = Ae<sup>x</sup>. The solution curves are exponential functions.'
            },
            {
                deTex: '-y',
                question: 'For the DE below, which statement about the solution curves is correct?',
                correctTex: '\\text{Solution curves are decaying exponentials: } y = Ae^{-x}',
                distractors: [
                    '\\text{Solution curves grow without bound as } x \\to \\infty',
                    '\\text{Solution curves are sinusoidal}',
                    '\\text{Solution curves are straight lines through the origin}'
                ],
                explain: 'The DE <strong>dy/dx = -y</strong> gives y = Ae<sup>-x</sup>. These are decaying exponentials — they decrease toward zero as x increases.'
            },
            {
                deTex: 'x',
                question: 'For the DE below, which statement about the solution curves is correct?',
                correctTex: '\\text{Solution curves are parabolas: } y = \\tfrac{1}{2}x^2 + C',
                distractors: [
                    '\\text{Solution curves are exponentials: } y = e^x + C',
                    '\\text{The slope is always positive for all } x',
                    '\\text{Solution curves pass through the origin}'
                ],
                explain: 'Integrating dy/dx = x gives y = x²/2 + C. These are upward-opening parabolas shifted vertically by the constant C.'
            },
            {
                deTex: '2x',
                question: 'For the DE below, which statement about the solution curves is correct?',
                correctTex: '\\text{The slope is zero at } x = 0 \\text{ for all solution curves}',
                distractors: [
                    '\\text{The slope is always positive}',
                    '\\text{Solution curves are exponentials}',
                    '\\text{All solution curves pass through } (0,\\,0)'
                ],
                explain: 'For dy/dx = 2x, the slope equals zero when x = 0, regardless of y. This means every solution curve (y = x² + C) has a horizontal tangent at x = 0.'
            }
        ];

        const chosen = MathUtils.pick(deTypes);

        const options = MathUtils.shuffle([
            { value: 1, tex: chosen.correctTex },
            { value: 0, tex: chosen.distractors[0] },
            { value: 0, tex: chosen.distractors[1] },
            { value: 0, tex: chosen.distractors[2] }
        ]);

        return {
            type: 'mc',
            rule: 'Slope Field Interpretation',
            difficulty: 'hard',
            text: chosen.question,
            latex: `\\(\\dfrac{dy}{dx} = ${chosen.deTex}\\)`,
            answer: 1,
            answerTex: chosen.correctTex,
            options: options,
            hintTex: [
                `\\text{Separate variables and integrate both sides to find } y`,
                `\\text{Think about what type of function satisfies this DE}`
            ],
            explain: chosen.explain
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => DIFF_EQ.qSolveLinearDE(),        weight: 3, difficulty: 'easy'   },
            { fn: () => DIFF_EQ.qExponentialGrowth(),     weight: 3, difficulty: 'easy'   },
            { fn: () => DIFF_EQ.qFindConstantIC(),        weight: 3, difficulty: 'easy'   },
            { fn: () => DIFF_EQ.qSeparableDE(),           weight: 2, difficulty: 'medium' },
            { fn: () => DIFF_EQ.qVerifySolution(),        weight: 2, difficulty: 'medium' },
            { fn: () => DIFF_EQ.qPopulationGrowth(),      weight: 2, difficulty: 'medium' },
            { fn: () => DIFF_EQ.qDecayModel(),            weight: 2, difficulty: 'medium' },
            { fn: () => DIFF_EQ.qDoubleTime(),            weight: 1, difficulty: 'hard'   },
            { fn: () => DIFF_EQ.qSeparableGeneral(),      weight: 1, difficulty: 'hard'   },
            { fn: () => DIFF_EQ.qSlopeFieldInterpret(),   weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (DIFF_EQ.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (DIFF_EQ.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (DIFF_EQ.level === 'hard') {
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
        DIFF_EQ.score = 0;
        DIFF_EQ.total = 0;
        DIFF_EQ.streak = 0;
        DIFF_EQ.answered = false;
        DIFF_EQ.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="DIFF_EQ.unload()">Differential Equations (5.22)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Differential Equations</h1>
                <p>IB Math AA 5.22 – Separable DEs and initial conditions</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="DIFF_EQ.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="DIFF_EQ.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="DIFF_EQ.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="DIFF_EQ.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="deq-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="deq-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="deq-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="deq-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="deq-question-card">
                <span class="rule-tag" id="deq-rule"></span>
                <span class="difficulty-tag" id="deq-difficulty"></span>
                <div class="question-text" id="deq-text"></div>
                <div class="question-prompt" id="deq-latex"></div>
                <div id="deq-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="deq-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="deq-feedback">
                <div class="feedback-title" id="deq-feedback-title"></div>
                <div class="feedback-explanation" id="deq-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="deq-hint-btn" onclick="DIFF_EQ.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="deq-next-btn" onclick="DIFF_EQ.next()" style="display:none;">Next Question</button>
            </div>
        `;

        DIFF_EQ.next();
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
        DIFF_EQ.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        DIFF_EQ.score = 0;
        DIFF_EQ.total = 0;
        DIFF_EQ.streak = 0;
        DIFF_EQ.updateStats();
        DIFF_EQ.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        DIFF_EQ.answered = false;
        DIFF_EQ.hintIndex = 0;
        DIFF_EQ.currentQ = DIFF_EQ.pickQuestion();
        const q = DIFF_EQ.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('deq-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('deq-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('deq-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('deq-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('deq-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="DIFF_EQ.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="deq-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')DIFF_EQ.checkFree()">
                    <button class="btn btn-primary" onclick="DIFF_EQ.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('deq-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('deq-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('deq-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('deq-next-btn').style.display = 'none';
        document.getElementById('deq-hint-btn').style.display = '';
        document.getElementById('deq-hint-btn').disabled = false;

        // Render KaTeX
        DIFF_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = DIFF_EQ.currentQ;
        if (!q || !q.hintTex || DIFF_EQ.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('deq-hint-box');
        const hintContent = DIFF_EQ.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[DIFF_EQ.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        DIFF_EQ.hintIndex++;

        if (DIFF_EQ.hintIndex >= q.hintTex.length) {
            document.getElementById('deq-hint-btn').disabled = true;
        }

        DIFF_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (DIFF_EQ.answered) return;
        DIFF_EQ.answered = true;
        DIFF_EQ.total++;

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
            DIFF_EQ.score++;
            DIFF_EQ.streak++;
        } else {
            btn.classList.add('incorrect');
            DIFF_EQ.streak = 0;
        }

        DIFF_EQ.showFeedback(isCorrect);
        DIFF_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (DIFF_EQ.answered) return;

        const inp = document.getElementById('deq-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        DIFF_EQ.answered = true;
        DIFF_EQ.total++;
        inp.disabled = true;

        const q = DIFF_EQ.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            DIFF_EQ.score++;
            DIFF_EQ.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            DIFF_EQ.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        DIFF_EQ.showFeedback(isCorrect);
        DIFF_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = DIFF_EQ.currentQ;
        const fb = document.getElementById('deq-feedback');
        const title = document.getElementById('deq-feedback-title');
        const explanation = document.getElementById('deq-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (DIFF_EQ.streak > 1) {
                title.textContent = `Correct! (${DIFF_EQ.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('deq-next-btn').style.display = '';
        document.getElementById('deq-hint-btn').style.display = 'none';

        DIFF_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('deq-score');
        const totalEl = document.getElementById('deq-total');
        const streakEl = document.getElementById('deq-streak');
        const accEl = document.getElementById('deq-accuracy');

        if (scoreEl) scoreEl.textContent = DIFF_EQ.score;
        if (totalEl) totalEl.textContent = DIFF_EQ.total;
        if (streakEl) streakEl.textContent = DIFF_EQ.streak;
        if (accEl) {
            accEl.textContent = DIFF_EQ.total > 0
                ? Math.round((DIFF_EQ.score / DIFF_EQ.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['differential-equations'] = () => DIFF_EQ.load();
