/*
 * exponential-equations.js - IB Math AA 2.10: Exponential Equations
 * Solving equations using logarithms
 */

const EXP_EQ = {
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
     * 1. qSolveBasicExp - Easy (Free)
     * Solve a^x = b where b = a^k, so answer x = k (integer).
     * E.g. 2^x = 8 → x = 3
     */
    qSolveBasicExp() {
        const bases = [2, 3, 4, 5];
        const a = MathUtils.pick(bases);
        const k = MathUtils.randInt(2, 5);
        const b = Math.pow(a, k);

        return {
            type: 'free',
            rule: 'Basic Exponential',
            difficulty: 'easy',
            text: 'Solve the exponential equation below. Give an exact integer answer.',
            latex: `\\(${a}^x = ${b}\\)`,
            answer: k,
            answerTex: String(k),
            options: [],
            hintTex: [
                `\\text{Write both sides as powers of } ${a}`,
                `${a}^x = ${a}^{${k}} \\implies x = ${k}`
            ],
            explain: `<strong>Step 1:</strong> Recognise that \\(${b} = ${a}^{${k}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Rewrite the equation: \\(${a}^x = ${a}^{${k}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since the bases are equal, equate the exponents: \\(x = ${k}\\).`
        };
    },

    /**
     * 2. qSolveNaturalExp - Easy (Free)
     * Solve e^(kx) = e^(k*n), so answer x = n (integer).
     * E.g. e^(2x) = e^6 → x = 3
     */
    qSolveNaturalExp() {
        const k = MathUtils.randInt(1, 4);
        const n = MathUtils.randInt(1, 5);
        const exponent = k * n; // the power on the right-hand side

        const kTex = k === 1 ? '' : String(k);

        return {
            type: 'free',
            rule: 'Natural Exponential',
            difficulty: 'easy',
            text: 'Solve the equation below. Give an exact integer answer.',
            latex: `\\(e^{${kTex}x} = e^{${exponent}}\\)`,
            answer: n,
            answerTex: String(n),
            options: [],
            hintTex: [
                `\\text{The bases are both } e, \\text{ so equate the exponents}`,
                `${kTex === '' ? '' : kTex}x = ${exponent} \\implies x = ${n}`
            ],
            explain: `<strong>Step 1:</strong> Both sides have base \\(e\\), so equate the exponents:<br>` +
                     `\\(${kTex === '' ? '' : kTex + ' \\cdot '}x = ${exponent}\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve: \\(x = \\dfrac{${exponent}}{${k}} = ${n}\\).`
        };
    },

    /**
     * 3. qSolveLn - Easy (Free)
     * Solve ln(ax + b) = c where c ∈ {1,2}. Answer to 2dp.
     * E.g. ln(2x + 1) = 2 → 2x + 1 = e² → x = (e²-1)/2
     */
    qSolveLn() {
        const a = MathUtils.randInt(1, 4);
        const b = MathUtils.randInt(0, 5);
        const c = MathUtils.pick([1, 2]);

        // ax + b = e^c  →  x = (e^c - b) / a
        const ec = Math.exp(c);
        const answer = (ec - b) / a;
        const answerRounded = Math.round(answer * 100) / 100;

        const bPart = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
        const aTex = a === 1 ? '' : String(a);

        return {
            type: 'free',
            rule: 'Solve ln Equation',
            difficulty: 'easy',
            text: 'Solve the equation below. Give your answer to 2 decimal places.',
            latex: `\\(\\ln(${aTex}x${bPart}) = ${c}\\)`,
            answer: answerRounded,
            answerTex: answerRounded.toFixed(2),
            options: [],
            hintTex: [
                `\\text{Exponentiate both sides: } ${aTex}x${bPart} = e^{${c}}`,
                `x = \\frac{e^{${c}} - ${b}}{${a}} \\approx ${answerRounded.toFixed(2)}`
            ],
            explain: `<strong>Step 1:</strong> Exponentiate both sides (base \\(e\\)):<br>` +
                     `\\(${aTex}x${bPart} = e^{${c}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Isolate \\(x\\):<br>` +
                     `\\(${aTex}x = e^{${c}} - ${b}\\).<br><br>` +
                     `<strong>Step 3:</strong> Divide by \\(${a}\\):<br>` +
                     `\\(x = \\dfrac{e^{${c}} - ${b}}{${a}} \\approx ${answerRounded.toFixed(2)}\\).`
        };
    },

    /**
     * 4. qEquateExponents - Easy (Free)
     * Solve a^(f(x)) = a^(g(x)) by equating exponents.
     * E.g. 3^(2x+1) = 3^(x+4) → 2x+1 = x+4 → x=3
     */
    qEquateExponents() {
        const bases = [2, 3, 4, 5];
        const a = MathUtils.pick(bases);

        // f(x) = m1*x + c1, g(x) = m2*x + c2
        // x = (c2 - c1)/(m1 - m2) must be a non-zero integer
        // Pick integer solution xSol, then build two linear expressions
        const xSol = MathUtils.nonZeroRandInt(-5, 5);
        const m1 = MathUtils.nonZeroRandInt(1, 4);
        let m2;
        do { m2 = MathUtils.nonZeroRandInt(1, 4); } while (m2 === m1);

        // c1, c2 chosen so that m1*xSol + c1 = m2*xSol + c2
        // Set c1 = randInt, then c2 = c1 + (m1-m2)*xSol
        const c1 = MathUtils.randInt(-5, 5);
        const c2 = c1 + (m1 - m2) * xSol;

        function signedConst(v) {
            if (v === 0) return '';
            return v > 0 ? ` + ${v}` : ` - ${Math.abs(v)}`;
        }

        const m1Tex = m1 === 1 ? '' : String(m1);
        const m2Tex = m2 === 1 ? '' : String(m2);

        const lhsExp = `${m1Tex}x${signedConst(c1)}`;
        const rhsExp = `${m2Tex}x${signedConst(c2)}`;

        return {
            type: 'free',
            rule: 'Equate Exponents',
            difficulty: 'easy',
            text: 'Solve the equation below by equating the exponents. Give an integer answer.',
            latex: `\\(${a}^{${lhsExp}} = ${a}^{${rhsExp}}\\)`,
            answer: xSol,
            answerTex: String(xSol),
            options: [],
            hintTex: [
                `\\text{Same base, so equate exponents: } ${lhsExp} = ${rhsExp}`,
                `${m1 - m2}x = ${c2 - c1} \\implies x = ${xSol}`
            ],
            explain: `<strong>Step 1:</strong> Since both sides have the same base \\(${a}\\), equate the exponents:<br>` +
                     `\\(${lhsExp} = ${rhsExp}\\).<br><br>` +
                     `<strong>Step 2:</strong> Collect \\(x\\) terms:<br>` +
                     `\\(${m1 - m2}x = ${c2 - c1}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(x = ${xSol}\\).`
        };
    },

    /**
     * 5. qSolveExpLinear - Medium (Free)
     * Solve a·e^(kx) = b. Answer x = ln(b/a)/k to 2dp.
     */
    qSolveExpLinear() {
        const a = MathUtils.pick([2, 3, 4, 5]);
        const k = MathUtils.pick([1, 2]);
        const b = MathUtils.pick([10, 20, 30, 50]);

        // x = ln(b/a)/k
        const ratio = b / a;
        const answer = Math.log(ratio) / k;
        const answerRounded = Math.round(answer * 100) / 100;

        const kTex = k === 1 ? '' : String(k);

        return {
            type: 'free',
            rule: 'Exponential Linear',
            difficulty: 'medium',
            text: 'Solve the equation below. Give your answer to 2 decimal places.',
            latex: `\\(${a}e^{${kTex}x} = ${b}\\)`,
            answer: answerRounded,
            answerTex: answerRounded.toFixed(2),
            options: [],
            hintTex: [
                `\\text{Divide both sides by } ${a}: \\quad e^{${kTex}x} = \\frac{${b}}{${a}}`,
                `${kTex}x = \\ln\\!\\left(\\frac{${b}}{${a}}\\right) \\implies x = \\frac{\\ln(${ratio.toFixed(4)})}{${k}} \\approx ${answerRounded.toFixed(2)}`
            ],
            explain: `<strong>Step 1:</strong> Divide both sides by \\(${a}\\):<br>` +
                     `\\(e^{${kTex}x} = \\dfrac{${b}}{${a}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Take the natural logarithm of both sides:<br>` +
                     `\\(${k === 1 ? '' : k + ' \\cdot '}x = \\ln\\!\\left(\\dfrac{${b}}{${a}}\\right)\\).<br><br>` +
                     `<strong>Step 3:</strong> Divide by \\(${k}\\):<br>` +
                     `\\(x = \\dfrac{\\ln(${b}/${a})}{${k}} \\approx ${answerRounded.toFixed(2)}\\).`
        };
    },

    /**
     * 6. qGrowthModel - Medium (Free)
     * A = A₀·e^(kt). Find t given a multiplier.
     * E.g. population doubles: 2 = e^(0.1t) → t = ln(2)/0.1
     */
    qGrowthModel() {
        const kOptions = [0.05, 0.1, 0.2];
        const k = MathUtils.pick(kOptions);
        const multipliers = [2, 3, 4, 5];
        const mult = MathUtils.pick(multipliers);

        // mult = e^(kt) → t = ln(mult)/k
        const answer = Math.log(mult) / k;
        const answerRounded = Math.round(answer * 100) / 100;

        const kStr = k.toFixed(2).replace(/\.?0+$/, '') || '0';
        const multWord = { 2: 'doubles', 3: 'triples', 4: 'quadruples', 5: 'quintuples' }[mult] || `increases by a factor of ${mult}`;

        return {
            type: 'free',
            rule: 'Growth Model',
            difficulty: 'medium',
            text: `A population grows according to \\(A = A_0 e^{${kStr}t}\\). Find the time \\(t\\) at which the population ${multWord}. Give your answer to 2 decimal places.`,
            latex: `\\(A = ${mult} A_0\\)`,
            answer: answerRounded,
            answerTex: answerRounded.toFixed(2),
            options: [],
            hintTex: [
                `\\text{Set } ${mult}A_0 = A_0 e^{${kStr}t} \\text{ and divide by } A_0`,
                `e^{${kStr}t} = ${mult} \\implies ${kStr}t = \\ln(${mult}) \\implies t = \\frac{\\ln ${mult}}{${kStr}}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(A = ${mult}A_0\\):<br>` +
                     `\\(${mult}A_0 = A_0 e^{${kStr}t}\\).<br><br>` +
                     `<strong>Step 2:</strong> Divide both sides by \\(A_0\\):<br>` +
                     `\\(${mult} = e^{${kStr}t}\\).<br><br>` +
                     `<strong>Step 3:</strong> Take \\(\\ln\\) of both sides:<br>` +
                     `\\(${kStr}t = \\ln(${mult})\\).<br><br>` +
                     `<strong>Step 4:</strong> Solve: \\(t = \\dfrac{\\ln ${mult}}{${kStr}} \\approx ${answerRounded.toFixed(2)}\\).`
        };
    },

    /**
     * 7. qHalfLife - Medium (Free)
     * A = A₀·(0.5)^(t/T). Given A₀, A = fraction of A₀, and T, find t.
     * t = T·log(A/A₀)/log(0.5)
     */
    qHalfLife() {
        const halfLifeOptions = [10, 20, 25, 50, 100];
        const T = MathUtils.pick(halfLifeOptions);

        // Choose how many half-lives have passed: n = 1,2,3
        const n = MathUtils.randInt(1, 3);
        const A0 = MathUtils.pick([100, 200, 400, 800]);
        const A = A0 * Math.pow(0.5, n);

        // t = T * n (exact) = T * log(A/A0) / log(0.5)
        const answer = T * n;

        return {
            type: 'free',
            rule: 'Half-Life',
            difficulty: 'medium',
            text: `A substance decays by half-life. Using \\(A = A_0 \\cdot \\left(\\tfrac{1}{2}\\right)^{t/T}\\), find \\(t\\).`,
            latex: `\\(A_0 = ${A0}\\text{ g},\\quad A = ${A}\\text{ g},\\quad T = ${T}\\text{ years}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{A}{A_0} = \\left(\\tfrac{1}{2}\\right)^{t/${T}} \\implies \\frac{${A}}{${A0}} = \\left(\\tfrac{1}{2}\\right)^{t/${T}}`,
                `t = T \\cdot \\frac{\\log(A/A_0)}{\\log(0.5)} = ${T} \\cdot \\frac{\\log(${A}/${A0})}{\\log(0.5)}`
            ],
            explain: `<strong>Step 1:</strong> Divide both sides by \\(A_0\\):<br>` +
                     `\\(\\dfrac{${A}}{${A0}} = \\left(\\tfrac{1}{2}\\right)^{t/${T}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Take \\(\\log\\) of both sides:<br>` +
                     `\\(\\log\\!\\left(${A}/${A0}\\right) = \\dfrac{t}{${T}} \\cdot \\log(0.5)\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(t\\):<br>` +
                     `\\(t = ${T} \\cdot \\dfrac{\\log(${A}/${A0})}{\\log(0.5)} = ${T} \\times ${n} = ${answer}\\text{ years}\\).`
        };
    },

    /**
     * 8. qChangeOfBase - Medium (Free)
     * Evaluate log_a(b) = ln(b)/ln(a) where b = a^n (clean integer answer).
     * E.g. log₃(81) = 4
     */
    qChangeOfBase() {
        const bases = [2, 3, 4, 5, 6];
        const a = MathUtils.pick(bases);
        const n = MathUtils.randInt(2, 4);
        const b = Math.pow(a, n);

        return {
            type: 'free',
            rule: 'Change of Base',
            difficulty: 'medium',
            text: 'Evaluate the logarithm below using the change-of-base formula. Give an exact integer answer.',
            latex: `\\(\\log_{${a}} ${b}\\)`,
            answer: n,
            answerTex: String(n),
            options: [],
            hintTex: [
                `\\log_{${a}} ${b} = \\frac{\\ln ${b}}{\\ln ${a}}`,
                `= \\frac{\\ln ${a}^{${n}}}{\\ln ${a}} = \\frac{${n}\\ln ${a}}{\\ln ${a}} = ${n}`
            ],
            explain: `<strong>Step 1:</strong> Apply the change-of-base formula:<br>` +
                     `\\(\\log_{${a}} ${b} = \\dfrac{\\ln ${b}}{\\ln ${a}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Recognise that \\(${b} = ${a}^{${n}}\\), so \\(\\ln ${b} = ${n}\\ln ${a}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify:<br>` +
                     `\\(\\dfrac{${n}\\ln ${a}}{\\ln ${a}} = ${n}\\).`
        };
    },

    /**
     * 9. qSolveWithSub - Hard (MC)
     * Let u = e^x. Solve e^(2x) - p·e^x + q = 0, which factors as (u-r)(u-s)=0.
     * Answer: x = ln(r) or x = ln(s).
     */
    qSolveWithSub() {
        // Pick two positive integer roots r, s for the quadratic u²-(r+s)u+rs=0
        const rootPairs = [
            [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5],
            [1, 3], [1, 4], [1, 5], [2, 6], [3, 6]
        ];
        const [r, s] = MathUtils.pick(rootPairs);
        const p = r + s;   // coefficient of e^x (positive, displayed as -p)
        const q = r * s;   // constant term

        // Answer set in LaTeX
        const correctTex = `x = \\ln ${r} \\text{ or } x = \\ln ${s}`;

        // Distractors
        const d1 = `x = ${r} \\text{ or } x = ${s}`;                        // forgot ln
        const d2 = `x = \\ln(${p}) \\text{ or } x = \\ln(${q})`;             // used p and q directly
        const d3 = `x = -\\ln ${r} \\text{ or } x = -\\ln ${s}`;             // wrong sign

        const optionTexts = [correctTex, d1, d2, d3];

        // Ensure all four are distinct (they should be for all chosen values)
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Substitution u = eˣ',
            difficulty: 'hard',
            text: 'Solve the equation below using the substitution \\(u = e^x\\). Select all solutions.',
            latex: `\\(e^{2x} - ${p}e^x + ${q} = 0\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Let } u = e^x: \\quad u^2 - ${p}u + ${q} = 0`,
                `(u - ${r})(u - ${s}) = 0 \\implies u = ${r} \\text{ or } u = ${s}`,
                `e^x = ${r} \\implies x = \\ln ${r}; \\quad e^x = ${s} \\implies x = \\ln ${s}`
            ],
            explain: `<strong>Step 1:</strong> Let \\(u = e^x\\), so \\(e^{2x} = u^2\\). The equation becomes:<br>` +
                     `\\(u^2 - ${p}u + ${q} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Factorise:<br>` +
                     `\\((u - ${r})(u - ${s}) = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(u = ${r}\\) or \\(u = ${s}\\).<br><br>` +
                     `<strong>Step 4:</strong> Substitute back \\(u = e^x\\):<br>` +
                     `\\(e^x = ${r} \\implies x = \\ln ${r}\\)<br>` +
                     `\\(e^x = ${s} \\implies x = \\ln ${s}\\).`
        };
    },

    /**
     * 10. qExpInequality - Hard (MC)
     * Solve e^(ax) > b → x > ln(b)/a. Give 4 MC inequality options.
     */
    qExpInequality() {
        const a = MathUtils.pick([1, 2, 3]);
        const b = MathUtils.pick([2, 5, 10, 20]);

        // x > ln(b)/a
        const threshold = Math.log(b) / a;
        const thresholdRounded = Math.round(threshold * 100) / 100;

        const aTex = a === 1 ? '' : String(a);
        const correctTex = `x > ${thresholdRounded.toFixed(2)}`;

        // Distractors
        const d1 = `x < ${thresholdRounded.toFixed(2)}`;                              // wrong direction
        const d2 = `x > ${(Math.log(b) * a).toFixed(2)}`;                             // multiplied instead of divided
        const d3 = `x > ${(Math.log(b) / a + 1).toFixed(2)}`;                         // off-by-one style error

        const optionTexts = [correctTex, d1, d2, d3];

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Exponential Inequality',
            difficulty: 'hard',
            text: 'Solve the inequality below. Select the correct solution.',
            latex: `\\(e^{${aTex}x} > ${b}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Take } \\ln \\text{ of both sides (inequality preserved since } \\ln \\text{ is increasing)}`,
                `${aTex}x > \\ln(${b}) \\implies x > \\frac{\\ln ${b}}{${a}} \\approx ${thresholdRounded.toFixed(2)}`
            ],
            explain: `<strong>Step 1:</strong> Take the natural logarithm of both sides.<br>` +
                     `Since \\(\\ln\\) is an increasing function, the inequality direction is preserved:<br>` +
                     `\\(${aTex === '' ? '' : aTex + ' \\cdot '}x > \\ln(${b})\\).<br><br>` +
                     `<strong>Step 2:</strong> Divide by \\(${a}\\) (positive, so inequality preserved):<br>` +
                     `\\(x > \\dfrac{\\ln ${b}}{${a}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(x > ${thresholdRounded.toFixed(2)}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => EXP_EQ.qSolveBasicExp(),    weight: 3 },
            { fn: () => EXP_EQ.qSolveNaturalExp(),  weight: 3 },
            { fn: () => EXP_EQ.qSolveLn(),          weight: 3 },
            { fn: () => EXP_EQ.qEquateExponents(),  weight: 3 },
            { fn: () => EXP_EQ.qSolveExpLinear(),   weight: 2 },
            { fn: () => EXP_EQ.qGrowthModel(),      weight: 2 },
            { fn: () => EXP_EQ.qHalfLife(),         weight: 2 },
            { fn: () => EXP_EQ.qChangeOfBase(),     weight: 2 },
            { fn: () => EXP_EQ.qSolveWithSub(),     weight: 1 },
            { fn: () => EXP_EQ.qExpInequality(),    weight: 1 }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (EXP_EQ.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 3].includes(i));
        } else if (EXP_EQ.level === 'medium') {
            filtered = pool.filter((_, i) => [4, 5, 6, 7].includes(i));
        } else if (EXP_EQ.level === 'hard') {
            filtered = pool.filter((_, i) => [8, 9].includes(i));
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
        EXP_EQ.score = 0;
        EXP_EQ.total = 0;
        EXP_EQ.streak = 0;
        EXP_EQ.answered = false;
        EXP_EQ.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="EXP_EQ.unload()">Exponential Equations (2.10)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Exponential Equations</h1>
                <p>IB Math AA 2.10 – Solving equations using logarithms</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="EXP_EQ.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="EXP_EQ.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="EXP_EQ.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="EXP_EQ.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="expeq-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="expeq-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="expeq-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="expeq-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="expeq-question-card">
                <span class="rule-tag" id="expeq-rule"></span>
                <span class="difficulty-tag" id="expeq-difficulty"></span>
                <div class="question-text" id="expeq-text"></div>
                <div class="question-prompt" id="expeq-latex"></div>
                <div id="expeq-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="expeq-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="expeq-feedback">
                <div class="feedback-title" id="expeq-feedback-title"></div>
                <div class="feedback-explanation" id="expeq-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="expeq-hint-btn" onclick="EXP_EQ.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="expeq-next-btn" onclick="EXP_EQ.next()" style="display:none;">Next Question</button>
            </div>
        `;

        EXP_EQ.next();
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
        EXP_EQ.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        EXP_EQ.score = 0;
        EXP_EQ.total = 0;
        EXP_EQ.streak = 0;
        EXP_EQ.updateStats();
        EXP_EQ.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        EXP_EQ.answered = false;
        EXP_EQ.hintIndex = 0;
        EXP_EQ.currentQ = EXP_EQ.pickQuestion();
        const q = EXP_EQ.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('expeq-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('expeq-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('expeq-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('expeq-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('expeq-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="EXP_EQ.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="expeq-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')EXP_EQ.checkFree()">
                    <button class="btn btn-primary" onclick="EXP_EQ.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('expeq-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('expeq-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('expeq-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('expeq-next-btn').style.display = 'none';
        document.getElementById('expeq-hint-btn').style.display = '';
        document.getElementById('expeq-hint-btn').disabled = false;

        // Render KaTeX
        EXP_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = EXP_EQ.currentQ;
        if (!q || !q.hintTex || EXP_EQ.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('expeq-hint-box');
        const hintContent = EXP_EQ.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[EXP_EQ.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        EXP_EQ.hintIndex++;

        if (EXP_EQ.hintIndex >= q.hintTex.length) {
            document.getElementById('expeq-hint-btn').disabled = true;
        }

        EXP_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (EXP_EQ.answered) return;
        EXP_EQ.answered = true;
        EXP_EQ.total++;

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
            EXP_EQ.score++;
            EXP_EQ.streak++;
        } else {
            btn.classList.add('incorrect');
            EXP_EQ.streak = 0;
        }

        EXP_EQ.showFeedback(isCorrect);
        EXP_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (EXP_EQ.answered) return;

        const inp = document.getElementById('expeq-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        EXP_EQ.answered = true;
        EXP_EQ.total++;
        inp.disabled = true;

        const q = EXP_EQ.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            EXP_EQ.score++;
            EXP_EQ.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            EXP_EQ.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        EXP_EQ.showFeedback(isCorrect);
        EXP_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = EXP_EQ.currentQ;
        const fb = document.getElementById('expeq-feedback');
        const title = document.getElementById('expeq-feedback-title');
        const explanation = document.getElementById('expeq-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (EXP_EQ.streak > 1) {
                title.textContent = `Correct! (${EXP_EQ.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('expeq-next-btn').style.display = '';
        document.getElementById('expeq-hint-btn').style.display = 'none';

        EXP_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('expeq-score');
        const totalEl = document.getElementById('expeq-total');
        const streakEl = document.getElementById('expeq-streak');
        const accEl = document.getElementById('expeq-accuracy');

        if (scoreEl) scoreEl.textContent = EXP_EQ.score;
        if (totalEl) totalEl.textContent = EXP_EQ.total;
        if (streakEl) streakEl.textContent = EXP_EQ.streak;
        if (accEl) {
            accEl.textContent = EXP_EQ.total > 0
                ? Math.round((EXP_EQ.score / EXP_EQ.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['exponential-equations'] = () => EXP_EQ.load();
