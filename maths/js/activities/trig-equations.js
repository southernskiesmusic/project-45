/*
 * trig-equations.js - IB Math AA 3.6: Trigonometric Equations
 * Solving trig equations in given intervals (degrees and radians)
 */

const TRIG_EQ = {
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
     * 1. qCountSinSolutions - Easy (MC)
     * How many solutions does sin(x) = k have in [0°, 360°]?
     * k ∈ (-1,1), k≠0 → 2 solutions; k=±1 → 1 solution; |k|>1 → 0 solutions.
     */
    qCountSinSolutions() {
        // Pick a scenario type: 0=typical (k∈(-1,1), k≠0 → 2 sols),
        //                       1=k=1 or k=-1 → 1 sol,
        //                       2=|k|>1 → 0 sols
        const scenario = MathUtils.pick([0, 0, 0, 1, 2]);

        let k, kTex, correctCount;

        if (scenario === 0) {
            // Two solutions
            const vals = [0.5, 0.7, -0.3, 0.6, -0.6, 0.4, -0.8, 0.8, -0.4, 0.3, -0.7, -0.5];
            k = MathUtils.pick(vals);
            kTex = String(k);
            correctCount = 2;
        } else if (scenario === 1) {
            // One solution
            k = MathUtils.pick([1, -1]);
            kTex = String(k);
            correctCount = 1;
        } else {
            // Zero solutions
            k = MathUtils.pick([1.2, 1.5, -1.3, -1.1]);
            kTex = String(k);
            correctCount = 0;
        }

        const options = MathUtils.shuffle([
            { value: correctCount === 0 ? 1 : 0, tex: '0' },
            { value: correctCount === 1 ? 1 : 0, tex: '1' },
            { value: correctCount === 2 ? 1 : 0, tex: '2' },
            { value: correctCount === 3 ? 1 : 0, tex: '3' }
        ]);

        let explainBody;
        if (scenario === 0) {
            explainBody = `Since \\(${kTex} \\in (-1, 1)\\) and \\(${kTex} \\neq 0\\), the sine graph crosses the horizontal line \\(y = ${kTex}\\) exactly <strong>twice</strong> in \\([0°, 360°]\\): once in the first quadrant and once in the second quadrant (since \\(\\sin\\) is positive there) or once in each of the third/fourth quadrants (if negative).`;
        } else if (scenario === 1) {
            explainBody = `Since \\(k = ${kTex}\\), the equation \\(\\sin(x) = ${kTex}\\) touches the maximum${k === 1 ? '' : ' minimum'} of the sine curve exactly <strong>once</strong> in \\([0°, 360°]\\) at \\(x = ${k === 1 ? '90°' : '270°'}\\).`;
        } else {
            explainBody = `Since \\(|${kTex}| > 1\\), the value \\(${kTex}\\) is outside the range of \\(\\sin(x)\\), which is \\([-1, 1]\\). There are <strong>no solutions</strong>.`;
        }

        return {
            type: 'mc',
            rule: 'Counting Solutions',
            difficulty: 'easy',
            text: `How many solutions does the equation below have in \\([0°, 360°]\\)?`,
            latex: `\\(\\sin(x) = ${kTex}\\)`,
            answer: 1,
            answerTex: String(correctCount),
            options: options,
            hintTex: [
                `\\text{Range of } \\sin(x) \\text{ is } [-1, 1]`,
                `\\text{For } k \\in (-1,1),\\; k \\neq 0: \\text{ two solutions. For } k = \\pm 1: \\text{ one. For } |k|>1: \\text{ none.}`
            ],
            explain: `<strong>Step 1:</strong> Check the range of \\(\\sin(x)\\): the output is always in \\([-1, 1]\\).<br><br>` +
                     `<strong>Step 2:</strong> ` + explainBody + `<br><br>` +
                     `<strong>Answer:</strong> \\(${correctCount}\\) solution${correctCount !== 1 ? 's' : ''}.`
        };
    },

    /**
     * 2. qSolveSin - Easy (MC)
     * Solve sin(x) = k for exact values, x ∈ [0°, 360°].
     */
    qSolveSin() {
        // Exact value table: [kTex, kVal, angle1, angle2]
        // angle2 = 180 - angle1 (both in [0,360])
        const table = [
            { kTex: '\\dfrac{1}{2}',        kVal: 0.5,               a1: 30,  a2: 150 },
            { kTex: '\\dfrac{\\sqrt{2}}{2}', kVal: Math.SQRT2 / 2,   a1: 45,  a2: 135 },
            { kTex: '\\dfrac{\\sqrt{3}}{2}', kVal: Math.sqrt(3) / 2, a1: 60,  a2: 120 },
            { kTex: '-\\dfrac{1}{2}',        kVal: -0.5,              a1: 210, a2: 330 },
            { kTex: '-\\dfrac{\\sqrt{2}}{2}',kVal: -Math.SQRT2 / 2,  a1: 225, a2: 315 },
            { kTex: '-\\dfrac{\\sqrt{3}}{2}',kVal: -Math.sqrt(3) / 2,a1: 240, a2: 300 }
        ];

        const entry = MathUtils.pick(table);
        const correctTex = `x = ${entry.a1}°,\\; ${entry.a2}°`;

        // Distractors: wrong angle pairs
        const allPairs = table.map(e => `x = ${e.a1}°,\\; ${e.a2}°`).filter(t => t !== correctTex);
        const extras = [
            `x = ${entry.a1}°,\\; ${360 - entry.a1}°`,
            `x = ${180 - entry.a1}°,\\; ${360 - entry.a1}°`,
            `x = ${entry.a2}°,\\; ${360 - entry.a2}°`
        ].filter(t => t !== correctTex);

        const pool = [...new Set([...allPairs, ...extras])];
        const shuffledPool = MathUtils.shuffle(pool);
        const distractors = shuffledPool.slice(0, 3);

        const optionTexts = [correctTex, ...distractors];
        const options = MathUtils.shuffle(optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        })));

        const ref = `\\sin^{-1}\\!\\left(${entry.kTex}\\right) = ${entry.a1}°`;
        const step2 = entry.kVal >= 0
            ? `\\text{Second solution: } 180° - ${entry.a1}° = ${entry.a2}°`
            : `\\text{Second solution: } 360° - ${Math.abs(180 - entry.a2)}° = ${entry.a2}°`;

        return {
            type: 'mc',
            rule: 'Solve sin(x)',
            difficulty: 'easy',
            text: `Solve the equation below for \\(x \\in [0°, 360°]\\).`,
            latex: `\\(\\sin(x) = ${entry.kTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\sin(x) = k \\Rightarrow x = \\sin^{-1}(k) \\text{ and } x = 180° - \\sin^{-1}(k) \\text{ (for } k>0\\text{)}`,
                ref
            ],
            explain: `<strong>Step 1:</strong> Find the principal value: \\(${ref}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use the symmetry of sine: \\(${step2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Both angles lie in \\([0°, 360°]\\), so the solutions are \\(${correctTex}\\).`
        };
    },

    /**
     * 3. qSolveCos - Easy (MC)
     * Solve cos(x) = k for exact values, x ∈ [0°, 360°].
     */
    qSolveCos() {
        // Exact value table: [kTex, kVal, angle1, angle2]
        // angle2 = 360 - angle1
        const table = [
            { kTex: '\\dfrac{1}{2}',        kVal: 0.5,               a1: 60,  a2: 300 },
            { kTex: '\\dfrac{\\sqrt{2}}{2}', kVal: Math.SQRT2 / 2,   a1: 45,  a2: 315 },
            { kTex: '\\dfrac{\\sqrt{3}}{2}', kVal: Math.sqrt(3) / 2, a1: 30,  a2: 330 },
            { kTex: '-\\dfrac{1}{2}',        kVal: -0.5,              a1: 120, a2: 240 },
            { kTex: '-\\dfrac{\\sqrt{2}}{2}',kVal: -Math.SQRT2 / 2,  a1: 135, a2: 225 },
            { kTex: '-\\dfrac{\\sqrt{3}}{2}',kVal: -Math.sqrt(3) / 2,a1: 150, a2: 210 }
        ];

        const entry = MathUtils.pick(table);
        const correctTex = `x = ${entry.a1}°,\\; ${entry.a2}°`;

        const allPairs = table.map(e => `x = ${e.a1}°,\\; ${e.a2}°`).filter(t => t !== correctTex);
        const extras = [
            `x = ${entry.a1}°,\\; ${180 - entry.a1}°`,
            `x = ${180 - entry.a1}°,\\; ${entry.a1 + 180}°`,
            `x = ${entry.a2}°,\\; ${360 - entry.a2 + entry.a1}°`
        ].filter(t => t !== correctTex);

        const pool = [...new Set([...allPairs, ...extras])];
        const shuffledPool = MathUtils.shuffle(pool);
        const distractors = shuffledPool.slice(0, 3);

        const optionTexts = [correctTex, ...distractors];
        const options = MathUtils.shuffle(optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        })));

        const ref = `\\cos^{-1}\\!\\left(${entry.kTex}\\right) = ${entry.a1}°`;

        return {
            type: 'mc',
            rule: 'Solve cos(x)',
            difficulty: 'easy',
            text: `Solve the equation below for \\(x \\in [0°, 360°]\\).`,
            latex: `\\(\\cos(x) = ${entry.kTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\cos(x) = k \\Rightarrow x = \\cos^{-1}(k) \\text{ and } x = 360° - \\cos^{-1}(k)`,
                ref
            ],
            explain: `<strong>Step 1:</strong> Find the principal value: \\(${ref}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use the symmetry of cosine: \\(360° - ${entry.a1}° = ${entry.a2}°\\).<br><br>` +
                     `<strong>Step 3:</strong> Both angles lie in \\([0°, 360°]\\), so the solutions are \\(${correctTex}\\).`
        };
    },

    /**
     * 4. qSolveTan - Easy (MC)
     * Solve tan(x) = k for exact values, x ∈ [0°, 360°].
     */
    qSolveTan() {
        // Exact value table: [kTex, kVal, angle1, angle2]
        // angle2 = angle1 + 180
        const table = [
            { kTex: '\\dfrac{1}{\\sqrt{3}}', kVal: 1 / Math.sqrt(3), a1: 30,  a2: 210 },
            { kTex: '1',                      kVal: 1,                 a1: 45,  a2: 225 },
            { kTex: '\\sqrt{3}',              kVal: Math.sqrt(3),      a1: 60,  a2: 240 },
            { kTex: '-\\dfrac{1}{\\sqrt{3}}', kVal: -1/Math.sqrt(3),  a1: 150, a2: 330 },
            { kTex: '-1',                     kVal: -1,                a1: 135, a2: 315 },
            { kTex: '-\\sqrt{3}',             kVal: -Math.sqrt(3),     a1: 120, a2: 300 }
        ];

        const entry = MathUtils.pick(table);
        const correctTex = `x = ${entry.a1}°,\\; ${entry.a2}°`;

        const allPairs = table.map(e => `x = ${e.a1}°,\\; ${e.a2}°`).filter(t => t !== correctTex);
        const extras = [
            `x = ${entry.a1}°,\\; ${entry.a1 + 90}°`,
            `x = ${entry.a2}°,\\; ${entry.a2 - 90}°`,
            `x = ${180 - entry.a1}°,\\; ${360 - entry.a1}°`
        ].filter(t => t !== correctTex);

        const pool = [...new Set([...allPairs, ...extras])];
        const shuffledPool = MathUtils.shuffle(pool);
        const distractors = shuffledPool.slice(0, 3);

        const optionTexts = [correctTex, ...distractors];
        const options = MathUtils.shuffle(optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        })));

        const ref = `\\tan^{-1}\\!\\left(${entry.kTex}\\right) = ${entry.a1}°`;

        return {
            type: 'mc',
            rule: 'Solve tan(x)',
            difficulty: 'easy',
            text: `Solve the equation below for \\(x \\in [0°, 360°]\\).`,
            latex: `\\(\\tan(x) = ${entry.kTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\tan(x) = k \\Rightarrow x = \\tan^{-1}(k) \\text{ and } x = 180° + \\tan^{-1}(k)`,
                ref
            ],
            explain: `<strong>Step 1:</strong> Find the principal value: \\(${ref}\\).<br><br>` +
                     `<strong>Step 2:</strong> Add \\(180°\\) to get the second solution: \\(${entry.a1}° + 180° = ${entry.a2}°\\).<br><br>` +
                     `<strong>Step 3:</strong> Both lie in \\([0°, 360°]\\), so the solutions are \\(${correctTex}\\).`
        };
    },

    /**
     * 5. qSolveLinearTrig - Medium (MC)
     * Solve a·sin(x) + b = c in [0°, 360°]. Rearranges to sin(x) = (c-b)/a.
     */
    qSolveLinearTrig() {
        // Use exact-answer sin values so rearrangement stays clean
        const sinTable = [
            { kTex: '\\dfrac{1}{2}',         a1: 30,  a2: 150 },
            { kTex: '\\dfrac{\\sqrt{2}}{2}',  a1: 45,  a2: 135 },
            { kTex: '\\dfrac{\\sqrt{3}}{2}',  a1: 60,  a2: 120 },
            { kTex: '-\\dfrac{1}{2}',          a1: 210, a2: 330 },
            { kTex: '-\\dfrac{\\sqrt{2}}{2}',  a1: 225, a2: 315 },
            { kTex: '-\\dfrac{\\sqrt{3}}{2}',  a1: 240, a2: 300 }
        ];

        const entry = MathUtils.pick(sinTable);

        // Pick a (non-zero, small) and b, derive c = a * k_exact + b
        // We avoid irrational c by picking a that cancels the surd:
        //   for k=1/2 or -1/2: a can be anything → c = a/2 + b, pick a=2 for integer c
        //   for k=√2/2 or -√2/2: pick a=2 → c = √2 + b (irrational) — avoid
        //   Strategy: for surd values use a=2 and display rearranged form

        let a, b, cVal, cTex, kVal_str;

        const isHalf = entry.kTex.includes('\\dfrac{1}{2}') || entry.kTex.includes('-\\dfrac{1}{2}');
        const isRoot3 = entry.kTex.includes('\\sqrt{3}') && !entry.kTex.includes('\\sqrt{2}');
        const isRoot2 = entry.kTex.includes('\\sqrt{2}');

        if (isHalf) {
            // k = ±1/2, pick a=2 so a*k = ±1 (integer), then b random integer
            a = MathUtils.pick([2, 4, 6]);
            b = MathUtils.randInt(-5, 5);
            const numeratorK = entry.kTex.startsWith('-') ? -1 : 1;
            // a * (±1/2) + b = ±(a/2) + b
            cVal = a * (numeratorK / 2) + b;
            cTex = String(cVal);
            kVal_str = `${entry.kTex}`;
        } else if (isRoot3) {
            // k = ±√3/2. Pick a=2, b integer, c involves √3 — display as is
            a = 2;
            b = MathUtils.randInt(-3, 3);
            const sign = entry.kTex.startsWith('-') ? '-' : '';
            cTex = b === 0 ? `${sign}\\sqrt{3}` : (b > 0 ? `${sign}\\sqrt{3} + ${b}` : `${sign}\\sqrt{3} - ${Math.abs(b)}`);
            kVal_str = entry.kTex;
        } else {
            // k = ±√2/2. Pick a=2, b integer
            a = 2;
            b = MathUtils.randInt(-3, 3);
            const sign = entry.kTex.startsWith('-') ? '-' : '';
            cTex = b === 0 ? `${sign}\\sqrt{2}` : (b > 0 ? `${sign}\\sqrt{2} + ${b}` : `${sign}\\sqrt{2} - ${Math.abs(b)}`);
            kVal_str = entry.kTex;
        }

        const correctTex = `x = ${entry.a1}°,\\; ${entry.a2}°`;

        // Build equation text
        let aTex = a === 1 ? '' : String(a);
        let bPart = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
        const eqLHS = `${aTex}\\sin(x)${bPart}`;

        // Distractors
        const allEntries = sinTable.filter(e => e.a1 !== entry.a1);
        const distractors = MathUtils.shuffle(allEntries).slice(0, 3).map(e => `x = ${e.a1}°,\\; ${e.a2}°`);
        const optionTexts = [correctTex, ...distractors];
        const options = MathUtils.shuffle(optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        })));

        const rearrangedTex = `\\sin(x) = \\dfrac{c - b}{a} = ${kVal_str}`;

        return {
            type: 'mc',
            rule: 'Linear Trig',
            difficulty: 'medium',
            text: `Solve the equation below for \\(x \\in [0°, 360°]\\).`,
            latex: `\\(${eqLHS} = ${isHalf ? cTex : cTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Rearrange: } \\sin(x) = \\frac{c - b}{a}`,
                rearrangedTex
            ],
            explain: `<strong>Step 1:</strong> Rearrange to isolate \\(\\sin(x)\\):<br>` +
                     `\\(${aTex}\\sin(x) = c - ${b}\\)<br>` +
                     `\\(\\sin(x) = ${kVal_str}\\).<br><br>` +
                     `<strong>Step 2:</strong> Principal value: \\(\\sin^{-1}\\!\\left(${kVal_str}\\right) = ${entry.a1}°\\).<br><br>` +
                     `<strong>Step 3:</strong> Second solution using sine symmetry: \\(${entry.a2}°\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex}\\).`
        };
    },

    /**
     * 6. qSolveDoubleAngle - Medium (MC)
     * Solve sin(2x) = k in [0°, 360°]. Let u=2x → u ∈ [0°, 720°].
     */
    qSolveDoubleAngle() {
        // Table: k → all u in [0°,720°] then x = u/2
        const table = [
            {
                kTex: '\\dfrac{1}{2}',
                // sin(u)=1/2: u=30,150,390,510
                sols: [15, 75, 195, 255]
            },
            {
                kTex: '-\\dfrac{1}{2}',
                // sin(u)=-1/2: u=210,330,570,690
                sols: [105, 165, 285, 345]
            },
            {
                kTex: '1',
                // sin(u)=1: u=90,450 → x=45,225
                sols: [45, 225]
            },
            {
                kTex: '-1',
                // sin(u)=-1: u=270,630 → x=135,315
                sols: [135, 315]
            },
            {
                kTex: '\\dfrac{\\sqrt{2}}{2}',
                // sin(u)=√2/2: u=45,135,405,495 → x=22.5,67.5,202.5,247.5
                sols: [22.5, 67.5, 202.5, 247.5]
            }
        ];

        const entry = MathUtils.pick(table);

        function fmtSols(arr) {
            return arr.map(v => {
                if (Number.isInteger(v)) return `${v}°`;
                // Format halves nicely
                const whole = Math.floor(v);
                return `${v}°`;
            }).join(',\\; ');
        }

        const correctTex = `x = ${fmtSols(entry.sols)}`;

        // Distractors: wrong sets
        const others = table.filter(e => e.kTex !== entry.kTex);
        const shuffledOthers = MathUtils.shuffle(others);
        const distractors = shuffledOthers.slice(0, 3).map(e => `x = ${fmtSols(e.sols)}`);

        const optionTexts = [correctTex, ...distractors];
        const options = MathUtils.shuffle(optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        })));

        const uRange = entry.sols.length === 2
            ? `u = ${entry.sols.map(s => s * 2 + '°').join(',\\; ')}`
            : `u = ${entry.sols.map(s => s * 2 + '°').join(',\\; ')}`;

        return {
            type: 'mc',
            rule: 'Double Angle',
            difficulty: 'medium',
            text: `Solve the equation below for \\(x \\in [0°, 360°]\\).`,
            latex: `\\(\\sin(2x) = ${entry.kTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Let } u = 2x, \\text{ so } u \\in [0°, 720°]. \\text{ Solve } \\sin(u) = ${entry.kTex}`,
                `\\text{Solutions for } u: ${uRange}, \\text{ then divide by } 2`
            ],
            explain: `<strong>Step 1:</strong> Let \\(u = 2x\\). Since \\(x \\in [0°, 360°]\\), we have \\(u \\in [0°, 720°]\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve \\(\\sin(u) = ${entry.kTex}\\) for \\(u \\in [0°, 720°]\\):<br>` +
                     `\\(${uRange}\\).<br><br>` +
                     `<strong>Step 3:</strong> Divide each by 2 to get \\(x\\):<br>` +
                     `\\(${correctTex}\\).`
        };
    },

    /**
     * 7. qFactorTrigQuad - Hard (MC)
     * Solve a quadratic in sin(x). E.g. 2sin²(x) - 3sin(x) + 1 = 0.
     */
    qFactorTrigQuad() {
        // Quadratics of the form (a·sin-p)(b·sin-q)=0
        // Chosen so roots are in [-1,1] giving exact degree solutions
        const quadratics = [
            {
                // (2sin-1)(sin-1)=0 → sin=1/2 or sin=1 → 30°,150°,90°
                lhs: '2\\sin^2(x) - 3\\sin(x) + 1',
                factors: '(2\\sin(x) - 1)(\\sin(x) - 1)',
                roots: [
                    { kTex: '\\tfrac{1}{2}', angles: [30, 150] },
                    { kTex: '1',              angles: [90] }
                ],
                sols: [30, 90, 150]
            },
            {
                // (2sin+1)(sin-1)=0 → sin=-1/2 or sin=1 → 210°,330°,90°
                lhs: '2\\sin^2(x) - \\sin(x) - 1',
                factors: '(2\\sin(x) + 1)(\\sin(x) - 1)',
                roots: [
                    { kTex: '-\\tfrac{1}{2}', angles: [210, 330] },
                    { kTex: '1',               angles: [90] }
                ],
                sols: [90, 210, 330]
            },
            {
                // (2sin-1)(sin+1)=0 → sin=1/2 or sin=-1 → 30°,150°,270°
                lhs: '2\\sin^2(x) + \\sin(x) - 1',
                factors: '(2\\sin(x) - 1)(\\sin(x) + 1)',
                roots: [
                    { kTex: '\\tfrac{1}{2}',  angles: [30, 150] },
                    { kTex: '-1',              angles: [270] }
                ],
                sols: [30, 150, 270]
            },
            {
                // (sin-1)(sin+1)=0 → sin=1 or sin=-1 → 90°,270°
                lhs: '\\sin^2(x) - 1',
                factors: '(\\sin(x) - 1)(\\sin(x) + 1)',
                roots: [
                    { kTex: '1',  angles: [90] },
                    { kTex: '-1', angles: [270] }
                ],
                sols: [90, 270]
            }
        ];

        const entry = MathUtils.pick(quadratics);
        const sortedSols = [...entry.sols].sort((a, b) => a - b);
        const correctTex = `x = ${sortedSols.map(s => s + '°').join(',\\; ')}`;

        // Distractors: other quadratics' solution sets
        const others = quadratics.filter(q => q.lhs !== entry.lhs);
        const distractors = MathUtils.shuffle(others).slice(0, 3).map(q => {
            const ss = [...q.sols].sort((a, b) => a - b);
            return `x = ${ss.map(s => s + '°').join(',\\; ')}`;
        });

        const optionTexts = [correctTex, ...distractors];
        const options = MathUtils.shuffle(optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        })));

        const rootLines = entry.roots.map(r =>
            `\\sin(x) = ${r.kTex} \\Rightarrow x = ${r.angles.map(a => a + '°').join(',\\; ')}`
        ).join('\\\\');

        return {
            type: 'mc',
            rule: 'Trig Quadratic',
            difficulty: 'hard',
            text: `Solve the equation below for \\(x \\in [0°, 360°]\\).`,
            latex: `\\(${entry.lhs} = 0\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Let } s = \\sin(x) \\text{ and factor the quadratic in } s`,
                `${entry.factors} = 0`
            ],
            explain: `<strong>Step 1:</strong> Let \\(s = \\sin(x)\\) and factor:<br>` +
                     `\\(${entry.factors} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Set each factor to zero and solve:<br>` +
                     `\\[${rootLines}\\]<br>` +
                     `<strong>Step 3:</strong> Combining all solutions in \\([0°, 360°]\\):<br>` +
                     `\\(${correctTex}\\).`
        };
    },

    /**
     * 8. qTrigWithSub - Hard (MC)
     * Solve a quadratic in cos(x). E.g. 2cos²(x) + cos(x) - 1 = 0.
     */
    qTrigWithSub() {
        const quadratics = [
            {
                // (2cos-1)(cos+1)=0 → cos=1/2 or cos=-1 → 60°,300°,180°
                lhs: '2\\cos^2(x) + \\cos(x) - 1',
                factors: '(2\\cos(x) - 1)(\\cos(x) + 1)',
                roots: [
                    { kTex: '\\tfrac{1}{2}', angles: [60, 300] },
                    { kTex: '-1',             angles: [180] }
                ],
                sols: [60, 180, 300]
            },
            {
                // (2cos+1)(cos-1)=0 → cos=-1/2 or cos=1 → 120°,240°,0°(=360°)
                lhs: '2\\cos^2(x) - \\cos(x) - 1',
                factors: '(2\\cos(x) + 1)(\\cos(x) - 1)',
                roots: [
                    { kTex: '-\\tfrac{1}{2}', angles: [120, 240] },
                    { kTex: '1',               angles: [0] }
                ],
                sols: [0, 120, 240]
            },
            {
                // (cos-1)(cos+1)=0 → cos=1 or cos=-1 → 0°,180°
                lhs: '\\cos^2(x) - 1',
                factors: '(\\cos(x) - 1)(\\cos(x) + 1)',
                roots: [
                    { kTex: '1',  angles: [0] },
                    { kTex: '-1', angles: [180] }
                ],
                sols: [0, 180]
            },
            {
                // (2cos-1)(cos-1)=0 → cos=1/2 or cos=1 → 60°,300°,0°
                lhs: '2\\cos^2(x) - 3\\cos(x) + 1',
                factors: '(2\\cos(x) - 1)(\\cos(x) - 1)',
                roots: [
                    { kTex: '\\tfrac{1}{2}', angles: [60, 300] },
                    { kTex: '1',              angles: [0] }
                ],
                sols: [0, 60, 300]
            }
        ];

        const entry = MathUtils.pick(quadratics);
        const sortedSols = [...entry.sols].sort((a, b) => a - b);
        const correctTex = `x = ${sortedSols.map(s => s + '°').join(',\\; ')}`;

        const others = quadratics.filter(q => q.lhs !== entry.lhs);
        const distractors = MathUtils.shuffle(others).slice(0, 3).map(q => {
            const ss = [...q.sols].sort((a, b) => a - b);
            return `x = ${ss.map(s => s + '°').join(',\\; ')}`;
        });

        const optionTexts = [correctTex, ...distractors];
        const options = MathUtils.shuffle(optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        })));

        const rootLines = entry.roots.map(r =>
            `\\cos(x) = ${r.kTex} \\Rightarrow x = ${r.angles.map(a => a + '°').join(',\\; ')}`
        ).join('\\\\');

        return {
            type: 'mc',
            rule: 'Trig Substitution',
            difficulty: 'hard',
            text: `Solve the equation below for \\(x \\in [0°, 360°]\\).`,
            latex: `\\(${entry.lhs} = 0\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Let } c = \\cos(x) \\text{ and factor the quadratic in } c`,
                `${entry.factors} = 0`
            ],
            explain: `<strong>Step 1:</strong> Let \\(c = \\cos(x)\\) and factor:<br>` +
                     `\\(${entry.factors} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Set each factor to zero and solve:<br>` +
                     `\\[${rootLines}\\]<br>` +
                     `<strong>Step 3:</strong> Combining all solutions in \\([0°, 360°]\\):<br>` +
                     `\\(${correctTex}\\).`
        };
    },

    /**
     * 9. qSolveInRadians - Medium (Free response)
     * Solve sin(x)=k or cos(x)=k; give the SMALLER positive solution in radians to 2 dp.
     */
    qSolveInRadians() {
        const kVals = [0.5, 0.6, 0.7, 0.8, -0.3, -0.5];
        const k = MathUtils.pick(kVals);
        const func = MathUtils.pick(['sin', 'cos']);

        let principalRad, answer, answerDisplay;

        if (func === 'sin') {
            principalRad = Math.asin(k); // range [-π/2, π/2]
            if (k > 0) {
                // Two positive solutions in [0, 2π]: arcsin(k) and π - arcsin(k)
                // Smaller is arcsin(k)
                answer = principalRad;
            } else {
                // k < 0: solutions are π - arcsin(k) [in (π, 3π/2)] and 2π + arcsin(k) [in (3π/2,2π)]
                // Smaller positive is π - arcsin(k) = π + |arcsin(k)|
                answer = Math.PI - principalRad; // since principalRad < 0, this > π
                // Actually smaller is 2π + arcsin(k)? Let's check:
                // arcsin(-0.5) = -π/6 ≈ -0.524
                // sol1 = π - (-π/6) = 7π/6 ≈ 3.665
                // sol2 = 2π + (-π/6) = 11π/6 ≈ 5.760
                // Smaller is sol1 = π - arcsin(k)
                answer = Math.PI - principalRad;
            }
        } else {
            // cos
            principalRad = Math.acos(k); // range [0, π]
            if (k > 0) {
                // Two solutions: arccos(k) [in (0,π/2)] and 2π - arccos(k) [in (3π/2,2π)]
                // Smaller is arccos(k)
                answer = principalRad;
            } else {
                // k < 0: arccos(k) [in (π/2,π)] and 2π - arccos(k) [in (π,3π/2)]
                // Smaller is arccos(k)
                answer = principalRad;
            }
        }

        answerDisplay = answer.toFixed(2);
        const answerNum = parseFloat(answerDisplay);

        const kStr = String(k);
        const funcTex = func === 'sin' ? '\\sin' : '\\cos';
        const formulaTex = func === 'sin'
            ? (k >= 0
                ? `x_1 = \\sin^{-1}(${kStr})`
                : `x_1 = \\pi - \\sin^{-1}(${kStr})`)
            : `x_1 = \\cos^{-1}(${kStr})`;

        return {
            type: 'free',
            rule: 'Radians',
            difficulty: 'medium',
            text: `Solve the equation below for \\(x \\in [0, 2\\pi]\\). Give the <strong>smaller positive solution</strong> in radians, correct to 2 decimal places.`,
            latex: `\\(${funcTex}(x) = ${kStr}\\)`,
            answer: answerNum,
            answerTex: answerDisplay,
            options: [],
            hintTex: [
                `\\text{Use a calculator: } ${formulaTex}`,
                `x \\approx ${answer.toFixed(4)} \\approx ${answerDisplay} \\text{ rad}`
            ],
            explain: `<strong>Step 1:</strong> Use the inverse function: \\(${formulaTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate: \\(x \\approx ${answer.toFixed(4)}\\).<br><br>` +
                     `<strong>Step 3:</strong> Round to 2 decimal places: \\(x \\approx ${answerDisplay}\\) rad.<br><br>` +
                     `<strong>Note:</strong> Always check which solution is the smaller positive one in \\([0, 2\\pi]\\).`
        };
    },

    /**
     * 10. qCountDoubleAngle - Hard (MC)
     * How many solutions does cos(2x)=k have in [0°, 360°]?
     * For k ∈ (-1,1): 4 solutions (u=2x spans [0°,720°]).
     * For k=±1: 2 solutions.
     */
    qCountDoubleAngle() {
        // Scenarios: typical k gives 4; k=±1 gives 2
        const scenario = MathUtils.pick([0, 0, 0, 1]);

        let k, kTex, correctCount;

        if (scenario === 0) {
            // 4 solutions
            const vals = [
                { v: 0.5,  tex: '\\dfrac{1}{2}' },
                { v: -0.5, tex: '-\\dfrac{1}{2}' },
                { v: 0.7,  tex: '0.7' },
                { v: -0.3, tex: '-0.3' },
                { v: Math.SQRT2 / 2, tex: '\\dfrac{\\sqrt{2}}{2}' }
            ];
            const picked = MathUtils.pick(vals);
            k = picked.v;
            kTex = picked.tex;
            correctCount = 4;
        } else {
            // 2 solutions
            const picked = MathUtils.pick([
                { v: 1,  tex: '1' },
                { v: -1, tex: '-1' }
            ]);
            k = picked.v;
            kTex = picked.tex;
            correctCount = 2;
        }

        const options = MathUtils.shuffle([
            { value: correctCount === 1 ? 1 : 0, tex: '1' },
            { value: correctCount === 2 ? 1 : 0, tex: '2' },
            { value: correctCount === 3 ? 1 : 0, tex: '3' },
            { value: correctCount === 4 ? 1 : 0, tex: '4' }
        ]);

        const explainBody = correctCount === 4
            ? `Let \\(u = 2x\\). Since \\(x \\in [0°, 360°]\\), \\(u \\in [0°, 720°]\\).<br>` +
              `For \\(k \\in (-1, 1)\\), \\(\\cos(u) = ${kTex}\\) has <strong>2 solutions per 360°</strong>, giving <strong>4 solutions</strong> in \\([0°, 720°]\\), hence 4 solutions for \\(x\\).`
            : `Let \\(u = 2x\\). Since \\(x \\in [0°, 360°]\\), \\(u \\in [0°, 720°]\\).<br>` +
              `For \\(k = ${kTex}\\), \\(\\cos(u) = ${kTex}\\) has exactly <strong>1 solution per 360°</strong> (at a turning point), giving <strong>2 solutions</strong> in \\([0°, 720°]\\), hence 2 solutions for \\(x\\).`;

        return {
            type: 'mc',
            rule: 'Counting Solutions',
            difficulty: 'hard',
            text: `How many solutions does the equation below have for \\(x \\in [0°, 360°]\\)?`,
            latex: `\\(\\cos(2x) = ${kTex}\\)`,
            answer: 1,
            answerTex: String(correctCount),
            options: options,
            hintTex: [
                `\\text{Let } u = 2x. \\text{ Since } x \\in [0°,360°], \\text{ we get } u \\in [0°, 720°]`,
                `\\text{Count solutions to } \\cos(u) = ${kTex} \\text{ in } [0°, 720°], \\text{ then each gives one } x`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(u = 2x\\): the range becomes \\(u \\in [0°, 720°]\\).<br><br>` +
                     `<strong>Step 2:</strong> ` + explainBody + `<br><br>` +
                     `<strong>Answer:</strong> \\(${correctCount}\\) solution${correctCount !== 1 ? 's' : ''}.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => TRIG_EQ.qCountSinSolutions(), weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_EQ.qSolveSin(),           weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_EQ.qSolveCos(),           weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_EQ.qSolveTan(),           weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_EQ.qSolveLinearTrig(),    weight: 2, difficulty: 'medium' },
            { fn: () => TRIG_EQ.qSolveDoubleAngle(),   weight: 2, difficulty: 'medium' },
            { fn: () => TRIG_EQ.qFactorTrigQuad(),     weight: 1, difficulty: 'hard'   },
            { fn: () => TRIG_EQ.qTrigWithSub(),        weight: 1, difficulty: 'hard'   },
            { fn: () => TRIG_EQ.qSolveInRadians(),     weight: 2, difficulty: 'medium' },
            { fn: () => TRIG_EQ.qCountDoubleAngle(),   weight: 1, difficulty: 'hard'   }
        ];

        let filtered = pool;
        if (TRIG_EQ.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (TRIG_EQ.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (TRIG_EQ.level === 'hard') {
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
        TRIG_EQ.score = 0;
        TRIG_EQ.total = 0;
        TRIG_EQ.streak = 0;
        TRIG_EQ.answered = false;
        TRIG_EQ.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="TRIG_EQ.unload()">Trigonometric Equations (3.6)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Trigonometric Equations</h1>
                <p>IB Math AA 3.6 &ndash; Solving trig equations in given intervals</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="TRIG_EQ.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="TRIG_EQ.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="TRIG_EQ.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="TRIG_EQ.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="treq-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="treq-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="treq-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="treq-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="treq-question-card">
                <span class="rule-tag" id="treq-rule"></span>
                <span class="difficulty-tag" id="treq-difficulty"></span>
                <div class="question-text" id="treq-text"></div>
                <div class="question-prompt" id="treq-latex"></div>
                <div id="treq-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="treq-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="treq-feedback">
                <div class="feedback-title" id="treq-feedback-title"></div>
                <div class="feedback-explanation" id="treq-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="treq-hint-btn" onclick="TRIG_EQ.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="treq-next-btn" onclick="TRIG_EQ.next()" style="display:none;">Next Question</button>
            </div>
        `;

        TRIG_EQ.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('geometry-trig');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        TRIG_EQ.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        TRIG_EQ.score = 0;
        TRIG_EQ.total = 0;
        TRIG_EQ.streak = 0;
        TRIG_EQ.updateStats();
        TRIG_EQ.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        TRIG_EQ.answered = false;
        TRIG_EQ.hintIndex = 0;
        TRIG_EQ.currentQ = TRIG_EQ.pickQuestion();
        const q = TRIG_EQ.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('treq-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('treq-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('treq-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('treq-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('treq-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="TRIG_EQ.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="treq-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')TRIG_EQ.checkFree()">
                    <button class="btn btn-primary" onclick="TRIG_EQ.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('treq-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('treq-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('treq-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('treq-next-btn').style.display = 'none';
        document.getElementById('treq-hint-btn').style.display = '';
        document.getElementById('treq-hint-btn').disabled = false;

        // Render KaTeX
        TRIG_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = TRIG_EQ.currentQ;
        if (!q || !q.hintTex || TRIG_EQ.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('treq-hint-box');
        const hintContent = TRIG_EQ.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[TRIG_EQ.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        TRIG_EQ.hintIndex++;

        if (TRIG_EQ.hintIndex >= q.hintTex.length) {
            document.getElementById('treq-hint-btn').disabled = true;
        }

        TRIG_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (TRIG_EQ.answered) return;
        TRIG_EQ.answered = true;
        TRIG_EQ.total++;

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
            TRIG_EQ.score++;
            TRIG_EQ.streak++;
        } else {
            btn.classList.add('incorrect');
            TRIG_EQ.streak = 0;
        }

        TRIG_EQ.showFeedback(isCorrect);
        TRIG_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (TRIG_EQ.answered) return;

        const inp = document.getElementById('treq-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        TRIG_EQ.answered = true;
        TRIG_EQ.total++;
        inp.disabled = true;

        const q = TRIG_EQ.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            TRIG_EQ.score++;
            TRIG_EQ.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            TRIG_EQ.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        TRIG_EQ.showFeedback(isCorrect);
        TRIG_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = TRIG_EQ.currentQ;
        const fb = document.getElementById('treq-feedback');
        const title = document.getElementById('treq-feedback-title');
        const explanation = document.getElementById('treq-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (TRIG_EQ.streak > 1) {
                title.textContent = `Correct! (${TRIG_EQ.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('treq-next-btn').style.display = '';
        document.getElementById('treq-hint-btn').style.display = 'none';

        TRIG_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('treq-score');
        const totalEl = document.getElementById('treq-total');
        const streakEl = document.getElementById('treq-streak');
        const accEl = document.getElementById('treq-accuracy');

        if (scoreEl) scoreEl.textContent = TRIG_EQ.score;
        if (totalEl) totalEl.textContent = TRIG_EQ.total;
        if (streakEl) streakEl.textContent = TRIG_EQ.streak;
        if (accEl) {
            accEl.textContent = TRIG_EQ.total > 0
                ? Math.round((TRIG_EQ.score / TRIG_EQ.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['trig-equations'] = () => TRIG_EQ.load();
