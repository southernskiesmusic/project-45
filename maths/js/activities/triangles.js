/*
 * triangles.js - IB Math AA 3.1-3.3: Triangles
 * Sine rule, cosine rule, area of triangle, Pythagorean theorem,
 * space diagonals, bearings, ambiguous case (SSA)
 */

const TRIANGLES = {
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

    /** Round a number to 2 decimal places */
    r2(x) { return Math.round(x * 100) / 100; },

    /** Round to 4 decimal places (for internal checks) */
    r4(x) { return Math.round(x * 10000) / 10000; },

    /** Build 4 MC option objects from correct tex + array of distractor tex strings.
     *  The option with value=1 is the correct one; value=0 are distractors.
     *  Returns shuffled array. */
    buildMCOptions(correctTex, distractorTexArr) {
        const opts = [{ value: 1, tex: correctTex }];
        for (const d of distractorTexArr) {
            opts.push({ value: 0, tex: d });
        }
        return MathUtils.shuffle(opts);
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qPythagorean – find hypotenuse using Pythagorean triples.
     * Type: free, difficulty: easy
     */
    qPythagorean() {
        const triples = [
            [3, 4, 5],
            [5, 12, 13],
            [8, 15, 17],
            [6, 8, 10],
            [9, 12, 15],
            [7, 24, 25]
        ];
        const triple = MathUtils.pick(triples);
        const [a, b, c] = triple;

        return {
            type: 'free',
            rule: 'Pythagorean Theorem',
            difficulty: 'easy',
            text: 'A right-angled triangle has legs \\(a\\) and \\(b\\). Find the hypotenuse \\(c\\).',
            latex: `\\(a = ${a},\\quad b = ${b}\\)`,
            answer: c,
            answerTex: String(c),
            options: [],
            hintTex: [
                `c^2 = a^2 + b^2`,
                `c^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c} \\implies c = ${c}`
            ],
            explain: `<strong>Step 1:</strong> Apply the Pythagorean theorem: \\(c^2 = a^2 + b^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(c^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c}\\).<br><br>` +
                     `<strong>Step 3:</strong> Take the square root: \\(c = \\sqrt{${c * c}} = ${c}\\).`
        };
    },

    /**
     * 2. qAreaSineFormula – Area = ½ ab sinC.
     * Type: mc, difficulty: easy
     */
    qAreaSineFormula() {
        const configs = [
            { a: 6, b: 8, C: 30, sinC: 0.5, areaExact: 12, areaTex: '12' },
            { a: 4, b: 10, C: 30, sinC: 0.5, areaExact: 10, areaTex: '10' },
            { a: 5, b: 8, C: 90, sinC: 1, areaExact: 20, areaTex: '20' },
            { a: 6, b: 10, C: 90, sinC: 1, areaExact: 30, areaTex: '30' },
            { a: 4, b: 6, C: 90, sinC: 1, areaExact: 12, areaTex: '12' },
            { a: 8, b: 10, C: 30, sinC: 0.5, areaExact: 20, areaTex: '20' },
            { a: 6, b: 8, C: 90, sinC: 1, areaExact: 24, areaTex: '24' },
            { a: 4, b: 8, C: 30, sinC: 0.5, areaExact: 8, areaTex: '8' }
        ];
        const cfg = MathUtils.pick(configs);
        const { a, b, C, areaExact, areaTex } = cfg;

        // Distractors: ab sinC (forgot ½), ½(a+b)sinC, ab (forgot sin), (a+b)²/4
        const d1 = a * b * cfg.sinC;
        const d2 = TRIANGLES.r2(0.5 * (a + b) * cfg.sinC);
        const d3 = a * b;
        // Make sure distractors are distinct from correct and each other
        const distractorCandidates = [d1, d2, d3, areaExact + 3, areaExact - 2].filter(v => v > 0 && v !== areaExact);
        const seen = new Set([areaExact]);
        const distractors = [];
        for (const d of distractorCandidates) {
            if (!seen.has(d) && distractors.length < 3) {
                seen.add(d);
                distractors.push(String(d));
            }
        }
        while (distractors.length < 3) {
            const fallback = areaExact + distractors.length + 1;
            if (!seen.has(fallback)) { seen.add(fallback); distractors.push(String(fallback)); }
        }

        const options = TRIANGLES.buildMCOptions(areaTex, distractors);

        return {
            type: 'mc',
            rule: 'Area = ½ab sinC',
            difficulty: 'easy',
            text: `Find the area of a triangle with two sides and an included angle.`,
            latex: `\\(a = ${a},\\quad b = ${b},\\quad C = ${C}°\\)`,
            answer: 1,
            answerTex: areaTex,
            options,
            hintTex: [
                `\\text{Area} = \\tfrac{1}{2}ab\\sin C`,
                `\\text{Area} = \\tfrac{1}{2}(${a})(${b})\\sin ${C}° = \\tfrac{1}{2}(${a})(${b})(${cfg.sinC}) = ${areaTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the formula: \\(\\text{Area} = \\frac{1}{2}ab\\sin C\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\text{Area} = \\frac{1}{2}(${a})(${b})\\sin ${C}°\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\sin ${C}° = ${cfg.sinC}\\), so \\(\\text{Area} = \\frac{1}{2} \\times ${a} \\times ${b} \\times ${cfg.sinC} = ${areaTex}\\).`
        };
    },

    /**
     * 3. qSineRuleSide – find missing side using sine rule a/sinA = b/sinB.
     * Type: mc, difficulty: medium
     */
    qSineRuleSide() {
        // Use angle pairs where sin values are exact
        const configs = [
            // { A, B, a } → b = a*sinB/sinA
            { A: 30, B: 90, sinA: 0.5, sinB: 1, a: 5, b: 10, bTex: '10' },
            { A: 30, B: 90, sinA: 0.5, sinB: 1, a: 7, b: 14, bTex: '14' },
            { A: 30, B: 60, sinA: 0.5, sinB: Math.sqrt(3)/2, a: 4, b: null, bTex: `4\\sqrt{3}` },
            { A: 45, B: 90, sinA: Math.sqrt(2)/2, sinB: 1, a: 6, b: null, bTex: `6\\sqrt{2}` },
            { A: 30, B: 60, sinA: 0.5, sinB: Math.sqrt(3)/2, a: 6, b: null, bTex: `6\\sqrt{3}` },
            { A: 45, B: 90, sinA: Math.sqrt(2)/2, sinB: 1, a: 8, b: null, bTex: `8\\sqrt{2}` },
            { A: 30, B: 90, sinA: 0.5, sinB: 1, a: 9, b: 18, bTex: '18' },
            { A: 60, B: 90, sinA: Math.sqrt(3)/2, sinB: 1, a: 5, b: null, bTex: `\\dfrac{10\\sqrt{3}}{3}` }
        ];

        const cfg = MathUtils.pick(configs);
        const { A, B, sinA, sinB, a, bTex } = cfg;
        const bVal = TRIANGLES.r4(a * sinB / sinA);

        // Build distractors as alternate symbolic options
        const distractorSets = {
            [`4\\sqrt{3}`]:  [`4\\sqrt{2}`, `8`, `2\\sqrt{3}`],
            [`6\\sqrt{2}`]:  [`6\\sqrt{3}`, `12`, `3\\sqrt{2}`],
            [`6\\sqrt{3}`]:  [`6\\sqrt{2}`, `12`, `3\\sqrt{3}`],
            [`8\\sqrt{2}`]:  [`8\\sqrt{3}`, `16`, `4\\sqrt{2}`],
            [`\\dfrac{10\\sqrt{3}}{3}`]: [`\\dfrac{5\\sqrt{3}}{3}`, `10`, `5\\sqrt{3}`],
        };

        let distractors;
        if (distractorSets[bTex]) {
            distractors = distractorSets[bTex];
        } else {
            // Numeric answer – generate numeric distractors
            const bNum = parseFloat(bTex);
            distractors = [
                String(TRIANGLES.r2(bNum * sinA / sinB)),   // inverted ratio
                String(TRIANGLES.r2(bNum + 2)),
                String(TRIANGLES.r2(bNum - 2 > 0 ? bNum - 2 : bNum + 4))
            ];
        }

        const options = TRIANGLES.buildMCOptions(bTex, distractors);
        const C = 180 - A - B;

        return {
            type: 'mc',
            rule: 'Sine Rule – Side',
            difficulty: 'medium',
            text: `In triangle \\(ABC\\), use the sine rule to find side \\(b\\).`,
            latex: `\\(a = ${a},\\quad A = ${A}°,\\quad B = ${B}°\\)`,
            answer: 1,
            answerTex: bTex,
            options,
            hintTex: [
                `\\frac{a}{\\sin A} = \\frac{b}{\\sin B}`,
                `b = \\frac{a \\sin B}{\\sin A} = \\frac{${a} \\cdot \\sin ${B}°}{\\sin ${A}°}`
            ],
            explain: `<strong>Step 1:</strong> Write the sine rule: \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange for \\(b\\): \\(b = \\dfrac{a \\sin B}{\\sin A}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(b = \\dfrac{${a} \\cdot \\sin ${B}°}{\\sin ${A}°} = ${bTex}\\).`
        };
    },

    /**
     * 4. qSineRuleAngle – find angle B given sides a, b and angle A.
     * Type: mc, difficulty: medium
     */
    qSineRuleAngle() {
        // sinB = b*sinA/a  →  choose so sinB is a standard value
        const configs = [
            // sinA, a, b, sinB (standard), B
            { A: 30, sinA: 0.5, a: 6, b: 6, sinB: 0.5, B: 30, BTex: '30°' },
            { A: 30, sinA: 0.5, a: 4, b: 4*Math.sqrt(2), sinB: Math.sqrt(2)/2, B: 45, BTex: '45°' },
            { A: 30, sinA: 0.5, a: 5, b: 5*Math.sqrt(3), sinB: Math.sqrt(3)/2, B: 60, BTex: '60°' },
            { A: 30, sinA: 0.5, a: 3, b: 6, sinB: 1, B: 90, BTex: '90°' },
            { A: 45, sinA: Math.sqrt(2)/2, a: 6, b: 6*Math.sqrt(2), sinB: 1, B: 90, BTex: '90°' },
            { A: 60, sinA: Math.sqrt(3)/2, a: 8, b: 4*Math.sqrt(3), sinB: Math.sqrt(3)/2, B: 60, BTex: '60°' },
            { A: 60, sinA: Math.sqrt(3)/2, a: 10, b: 5*Math.sqrt(3), sinB: Math.sqrt(3)/2, B: 60, BTex: '60°' },
            { A: 45, sinA: Math.sqrt(2)/2, a: 8, b: 8, sinB: Math.sqrt(2)/2, B: 45, BTex: '45°' }
        ];

        const cfg = MathUtils.pick(configs);
        const { A, a, b, B, BTex } = cfg;

        // Format b nicely
        let bDisplay;
        if (Number.isInteger(b)) {
            bDisplay = String(b);
        } else {
            bDisplay = TRIANGLES.r2(b).toString();
        }

        const allAngles = ['30°', '45°', '60°', '90°', '120°'];
        const distractors = allAngles.filter(ang => ang !== BTex).slice(0, 3);

        const options = TRIANGLES.buildMCOptions(BTex, distractors);

        return {
            type: 'mc',
            rule: 'Sine Rule – Angle',
            difficulty: 'medium',
            text: `In triangle \\(ABC\\), find angle \\(B\\).`,
            latex: `\\(a = ${TRIANGLES.r2(a)},\\quad b = ${bDisplay},\\quad A = ${A}°\\)`,
            answer: 1,
            answerTex: BTex,
            options,
            hintTex: [
                `\\frac{\\sin B}{b} = \\frac{\\sin A}{a}`,
                `\\sin B = \\frac{b \\sin A}{a} \\implies B = \\arcsin\\!\\left(${TRIANGLES.r4(cfg.sinB)}\\right)`
            ],
            explain: `<strong>Step 1:</strong> Use the sine rule: \\(\\dfrac{\\sin B}{b} = \\dfrac{\\sin A}{a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange: \\(\\sin B = \\dfrac{b \\sin A}{a}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(\\sin B = \\dfrac{${bDisplay} \\cdot \\sin ${A}°}{${TRIANGLES.r2(a)}} = ${TRIANGLES.r4(cfg.sinB)}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(B = \\arcsin(${TRIANGLES.r4(cfg.sinB)}) = ${BTex}\\).`
        };
    },

    /**
     * 5. qCosineRuleSide – find c using c² = a² + b² - 2ab cosC.
     * Use C=60° or C=90° for clean answers.
     * Type: mc, difficulty: medium
     */
    qCosineRuleSide() {
        // C=60°: c² = a²+b²-ab (since cos60°=0.5, so 2ab*0.5=ab)
        // C=90°: c² = a²+b²
        const configs = [
            // C=60°, a²+b²-ab must be a perfect square
            { a: 5, b: 8, C: 60, cosC: 0.5, c2: 25 + 64 - 40, c: 7, cTex: '7' },
            { a: 3, b: 5, C: 60, cosC: 0.5, c2: 9 + 25 - 15, c: null, cTex: `\\sqrt{19}` },
            { a: 7, b: 8, C: 60, cosC: 0.5, c2: 49 + 64 - 56, c: null, cTex: `\\sqrt{57}` },
            { a: 4, b: 6, C: 60, cosC: 0.5, c2: 16 + 36 - 24, c: null, cTex: `\\sqrt{28}` },
            // C=90°: straight Pythagorean
            { a: 5, b: 12, C: 90, cosC: 0, c2: 169, c: 13, cTex: '13' },
            { a: 8, b: 15, C: 90, cosC: 0, c2: 289, c: 17, cTex: '17' },
            { a: 3, b: 4, C: 90, cosC: 0, c2: 25, c: 5, cTex: '5' },
            { a: 6, b: 8, C: 90, cosC: 0, c2: 100, c: 10, cTex: '10' }
        ];

        const cfg = MathUtils.pick(configs);
        const { a, b, C, c2, cTex } = cfg;
        const cVal = Math.sqrt(c2);

        // Distractors: wrong formula applications
        const d1Tex = String(TRIANGLES.r2(Math.sqrt(a * a + b * b)));         // forgot -2abcosC
        const d2Tex = String(TRIANGLES.r2(Math.sqrt(Math.abs(a * a - b * b)))); // wrong sign
        const d3Tex = String(TRIANGLES.r2((a + b) / 2));                       // average

        const distractors = [d1Tex, d2Tex, d3Tex].filter(d => d !== cTex);
        while (distractors.length < 3) distractors.push(String(TRIANGLES.r2(cVal + distractors.length)));

        const options = TRIANGLES.buildMCOptions(cTex, distractors.slice(0, 3));

        const term2ab = C === 90 ? '' : ` - 2(${a})(${b})(${cfg.cosC})`;
        const cosTermStr = C === 90 ? '0' : String(cfg.cosC);

        return {
            type: 'mc',
            rule: 'Cosine Rule – Side',
            difficulty: 'medium',
            text: `Use the cosine rule to find side \\(c\\).`,
            latex: `\\(a = ${a},\\quad b = ${b},\\quad C = ${C}°\\)`,
            answer: 1,
            answerTex: cTex,
            options,
            hintTex: [
                `c^2 = a^2 + b^2 - 2ab\\cos C`,
                `c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b})\\cos ${C}° = ${a * a} + ${b * b}${term2ab} = ${c2}`
            ],
            explain: `<strong>Step 1:</strong> Apply the cosine rule: \\(c^2 = a^2 + b^2 - 2ab\\cos C\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(\\cos ${C}° = ${cosTermStr}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b})(${cosTermStr}) = ${a * a} + ${b * b}${term2ab} = ${c2}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(c = \\sqrt{${c2}} = ${cTex}\\).`
        };
    },

    /**
     * 6. qCosineRuleAngle – find angle C using cosC = (a²+b²-c²)/(2ab).
     * Type: mc, difficulty: medium
     */
    qCosineRuleAngle() {
        const configs = [
            // Pythagorean triples → C=90°
            { a: 3, b: 4, c: 5, cosC: 0, C: 90, CTex: '90°' },
            { a: 5, b: 12, c: 13, cosC: 0, C: 90, CTex: '90°' },
            { a: 8, b: 15, c: 17, cosC: 0, C: 90, CTex: '90°' },
            // Equilateral → C=60°
            { a: 6, b: 6, c: 6, cosC: 0.5, C: 60, CTex: '60°' },
            { a: 8, b: 8, c: 8, cosC: 0.5, C: 60, CTex: '60°' },
            // a²+b²-c²=ab → cosC=0.5 → C=60°
            { a: 5, b: 8, c: 7, cosC: 0.5, C: 60, CTex: '60°' },   // cosC=(25+64-49)/(80)=40/80=0.5
            // a=b=c*√2/2 style → C=90°
            { a: 5, b: 5, c: TRIANGLES ? Math.round(5*Math.sqrt(2)*100)/100 : 7.07, cosC: 0, C: 90, CTex: '90°' },
            // isosceles where cosC = -0.5 → C=120°
            { a: 5, b: 5, c: TRIANGLES ? Math.round(5*Math.sqrt(3)*100)/100 : 8.66, cosC: -0.5, C: 120, CTex: '120°' }
        ];

        // Only use the first 6 (integer only, reliable)
        const safeCfgs = [
            { a: 3, b: 4, c: 5, cosC: 0, C: 90, CTex: '90°' },
            { a: 5, b: 12, c: 13, cosC: 0, C: 90, CTex: '90°' },
            { a: 8, b: 15, c: 17, cosC: 0, C: 90, CTex: '90°' },
            { a: 6, b: 6, c: 6, cosC: 0.5, C: 60, CTex: '60°' },
            { a: 8, b: 8, c: 8, cosC: 0.5, C: 60, CTex: '60°' },
            { a: 5, b: 8, c: 7, cosC: 0.5, C: 60, CTex: '60°' }
        ];

        const cfg = MathUtils.pick(safeCfgs);
        const { a, b, c, cosC, C, CTex } = cfg;
        const numerator = a * a + b * b - c * c;
        const denominator = 2 * a * b;

        const allAngles = ['30°', '45°', '60°', '90°', '120°'];
        const distractors = allAngles.filter(ang => ang !== CTex).slice(0, 3);

        const options = TRIANGLES.buildMCOptions(CTex, distractors);

        return {
            type: 'mc',
            rule: 'Cosine Rule – Angle',
            difficulty: 'medium',
            text: `Use the cosine rule to find angle \\(C\\).`,
            latex: `\\(a = ${a},\\quad b = ${b},\\quad c = ${c}\\)`,
            answer: 1,
            answerTex: CTex,
            options,
            hintTex: [
                `\\cos C = \\frac{a^2 + b^2 - c^2}{2ab}`,
                `\\cos C = \\frac{${a}^2 + ${b}^2 - ${c}^2}{2(${a})(${b})} = \\frac{${numerator}}{${denominator}} = ${cosC}`
            ],
            explain: `<strong>Step 1:</strong> Rearrange the cosine rule for angle \\(C\\): \\(\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\cos C = \\dfrac{${a}^2 + ${b}^2 - ${c}^2}{2(${a})(${b})} = \\dfrac{${numerator}}{${denominator}} = ${cosC}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(C = \\arccos(${cosC}) = ${CTex}\\).`
        };
    },

    /**
     * 7. qAreaFromBase – basic area = ½ × base × height.
     * Type: free, difficulty: easy
     */
    qAreaFromBase() {
        const base = MathUtils.randInt(4, 20);
        const height = MathUtils.randInt(3, 15);
        const area = 0.5 * base * height;

        return {
            type: 'free',
            rule: 'Area = ½ × base × height',
            difficulty: 'easy',
            text: `Find the area of a triangle with the given base and perpendicular height.`,
            latex: `\\(\\text{base} = ${base},\\quad \\text{height} = ${height}\\)`,
            answer: area,
            answerTex: String(area),
            options: [],
            hintTex: [
                `\\text{Area} = \\tfrac{1}{2} \\times \\text{base} \\times \\text{height}`,
                `\\text{Area} = \\tfrac{1}{2} \\times ${base} \\times ${height} = ${area}`
            ],
            explain: `<strong>Step 1:</strong> Use the formula: \\(\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\text{Area} = \\frac{1}{2} \\times ${base} \\times ${height} = ${area}\\).`
        };
    },

    /**
     * 8. qAmbiguousCase – SSA: how many triangles are possible?
     * Type: mc, difficulty: hard
     */
    qAmbiguousCase() {
        // Given angle A, side a (opposite A), side b (adjacent)
        // h = b*sinA
        // If A is acute:
        //   a < h         → 0 triangles
        //   a = h         → 1 triangle (right angle at B)
        //   h < a < b     → 2 triangles (ambiguous)
        //   a >= b        → 1 triangle
        // If A is obtuse: a <= b → 0; a > b → 1

        const scenarios = [
            // 2 solutions: A acute, h < a < b
            {
                A: 30, sinA: 0.5, b: 10, a: 7,
                h: 5, // h = 10*0.5 = 5, 5 < 7 < 10 → 2 solutions
                answer: '2', answerTex: '2',
                why: '\\(h = b\\sin A = 10 \\cdot 0.5 = 5\\). Since \\(h < a < b\\) (i.e.\\(5 < 7 < 10\\)), there are 2 possible triangles.'
            },
            {
                A: 30, sinA: 0.5, b: 12, a: 8,
                h: 6, // h = 12*0.5 = 6, 6 < 8 < 12 → 2 solutions
                answer: '2', answerTex: '2',
                why: '\\(h = b\\sin A = 12 \\cdot 0.5 = 6\\). Since \\(h < a < b\\) (i.e.\\(6 < 8 < 12\\)), there are 2 possible triangles.'
            },
            // 1 solution: A acute, a >= b
            {
                A: 30, sinA: 0.5, b: 6, a: 10,
                h: 3, // h=3, a=10 >= b=6 → 1 solution
                answer: '1', answerTex: '1',
                why: '\\(h = b\\sin A = 6 \\cdot 0.5 = 3\\). Since \\(a \\geq b\\) (i.e.\\(10 \\geq 6\\)), there is exactly 1 triangle.'
            },
            {
                A: 45, sinA: Math.sqrt(2)/2, b: 8, a: 10,
                h: TRIANGLES.r2(8*Math.sqrt(2)/2), // ≈5.66, a=10 >= b=8 → 1 solution
                answer: '1', answerTex: '1',
                why: '\\(h = b\\sin A \\approx 5.66\\). Since \\(a \\geq b\\) (i.e.\\(10 \\geq 8\\)), there is exactly 1 triangle.'
            },
            // 0 solutions: A acute, a < h
            {
                A: 60, sinA: Math.sqrt(3)/2, b: 10, a: 4,
                h: TRIANGLES.r2(10*Math.sqrt(3)/2), // ≈8.66, a=4 < h → 0 solutions
                answer: '0', answerTex: '0',
                why: '\\(h = b\\sin A = 10 \\cdot \\frac{\\sqrt{3}}{2} \\approx 8.66\\). Since \\(a < h\\) (i.e.\\(4 < 8.66\\)), no triangle exists.'
            },
            {
                A: 60, sinA: Math.sqrt(3)/2, b: 8, a: 5,
                h: TRIANGLES.r2(8*Math.sqrt(3)/2), // ≈6.93, a=5 < h → 0 solutions
                answer: '0', answerTex: '0',
                why: '\\(h = b\\sin A = 8 \\cdot \\frac{\\sqrt{3}}{2} \\approx 6.93\\). Since \\(a < h\\) (i.e.\\(5 < 6.93\\)), no triangle exists.'
            },
            // 1 solution: A obtuse, a > b
            {
                A: 120, sinA: Math.sqrt(3)/2, b: 5, a: 9,
                h: null,
                answer: '1', answerTex: '1',
                why: 'When \\(A\\) is obtuse and \\(a > b\\) (i.e.\\(9 > 5\\)), exactly 1 triangle is possible.'
            }
        ];

        const sc = MathUtils.pick(scenarios);
        const options = TRIANGLES.buildMCOptions(sc.answerTex, ['0', '1', '2'].filter(v => v !== sc.answerTex).concat(['3']).slice(0, 3));

        const hDisplay = sc.h !== null ? `\\(h = b\\sin A = ${sc.h}\\)` : '';

        return {
            type: 'mc',
            rule: 'Ambiguous Case (SSA)',
            difficulty: 'hard',
            text: `Given angle \\(A\\), side \\(a\\) (opposite \\(A\\)), and side \\(b\\), how many triangles are possible?`,
            latex: `\\(A = ${sc.A}°,\\quad a = ${sc.a},\\quad b = ${sc.b}\\)`,
            answer: 1,
            answerTex: sc.answerTex,
            options,
            hintTex: [
                `\\text{Compute the altitude: } h = b\\sin A`,
                sc.h !== null
                    ? `h = ${sc.b} \\cdot \\sin ${sc.A}° \\approx ${sc.h}. \\text{ Compare } a \\text{ with } h \\text{ and } b.`
                    : `A \\text{ is obtuse: if } a > b \\Rightarrow 1 \\text{ triangle; if } a \\leq b \\Rightarrow 0 \\text{ triangles.}`
            ],
            explain: `<strong>Ambiguous Case (SSA) Rules:</strong><br>` +
                     `Compute the altitude \\(h = b\\sin A\\).<br><br>` +
                     `<strong>If \\(A\\) is acute:</strong><br>` +
                     `• \\(a < h\\): 0 triangles &nbsp; • \\(a = h\\): 1 triangle &nbsp; • \\(h < a < b\\): 2 triangles &nbsp; • \\(a \\geq b\\): 1 triangle<br><br>` +
                     `<strong>If \\(A\\) is obtuse:</strong><br>` +
                     `• \\(a \\leq b\\): 0 triangles &nbsp; • \\(a > b\\): 1 triangle<br><br>` +
                     `<strong>This case:</strong> ${sc.why}<br><br>` +
                     `<strong>Answer: ${sc.answerTex} triangle(s).</strong>`
        };
    },

    /**
     * 9. q3DCuboid – space diagonal d = √(l²+w²+h²).
     * Type: free, difficulty: medium
     */
    q3DCuboid() {
        const triples = [
            { l: 1, w: 2, h: 2, d: 3 },
            { l: 2, w: 3, h: 6, d: 7 },
            { l: 1, w: 4, h: 8, d: 9 },
            { l: 2, w: 6, h: 9, d: 11 },
            { l: 3, w: 4, h: 12, d: 13 },
            { l: 6, w: 6, h: 7, d: 11 },
            { l: 2, w: 4, h: 4, d: 6 },
            { l: 3, w: 6, h: 6, d: 9 }
        ];

        const cfg = MathUtils.pick(triples);
        const { l, w, h, d } = cfg;
        const sumSq = l * l + w * w + h * h;

        return {
            type: 'free',
            rule: 'Space Diagonal (3D)',
            difficulty: 'medium',
            text: `Find the length of the space diagonal of a cuboid with the given dimensions.`,
            latex: `\\(l = ${l},\\quad w = ${w},\\quad h = ${h}\\)`,
            answer: d,
            answerTex: String(d),
            options: [],
            hintTex: [
                `d = \\sqrt{l^2 + w^2 + h^2}`,
                `d = \\sqrt{${l}^2 + ${w}^2 + ${h}^2} = \\sqrt{${l*l} + ${w*w} + ${h*h}} = \\sqrt{${sumSq}}`
            ],
            explain: `<strong>Step 1:</strong> The space diagonal formula is \\(d = \\sqrt{l^2 + w^2 + h^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(d = \\sqrt{${l}^2 + ${w}^2 + ${h}^2} = \\sqrt{${l*l} + ${w*w} + ${h*h}} = \\sqrt{${sumSq}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(d = \\sqrt{${sumSq}} = ${d}\\).`
        };
    },

    /**
     * 10. qBearing – two-leg navigation bearing problem.
     * Type: mc, difficulty: hard
     */
    qBearing() {
        const scenarios = [
            {
                text: 'A ship sails 10 km due North, then 10 km due East. Find the straight-line distance from the starting point.',
                latex: '',
                dist: TRIANGLES.r2(Math.sqrt(200)),
                distTex: `10\\sqrt{2}`,
                d1: '20', d2: '10', d3: '\\sqrt{100}',
                explain:
                    `<strong>Step 1:</strong> The two legs are perpendicular (North then East), forming a right triangle.<br><br>` +
                    `<strong>Step 2:</strong> \\(d = \\sqrt{10^2 + 10^2} = \\sqrt{200} = 10\\sqrt{2} \\approx 14.14 \\text{ km}\\).`
            },
            {
                text: 'A plane flies 6 km due North, then 8 km due East. Find the straight-line distance from the start.',
                latex: '',
                dist: 10,
                distTex: '10',
                d1: '14', d2: '\\sqrt{28}', d3: '7',
                explain:
                    `<strong>Step 1:</strong> The two legs are perpendicular, forming a right triangle with legs 6 and 8.<br><br>` +
                    `<strong>Step 2:</strong> \\(d = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10 \\text{ km}\\).`
            },
            {
                text: 'A boat travels 5 km on a bearing of 000° (North), then 12 km on a bearing of 090° (East). Find the straight-line distance back to start.',
                latex: '',
                dist: 13,
                distTex: '13',
                d1: '17', d2: '\\sqrt{144}', d3: '11',
                explain:
                    `<strong>Step 1:</strong> The bearings 000° and 090° are perpendicular (right angle between the legs).<br><br>` +
                    `<strong>Step 2:</strong> \\(d = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13 \\text{ km}\\).`
            },
            {
                text: `From point P, a hiker walks 9 km North and then 12 km East. Find the straight-line distance from P.`,
                latex: '',
                dist: 15,
                distTex: '15',
                d1: '21', d2: '\\sqrt{63}', d3: '18',
                explain:
                    `<strong>Step 1:</strong> North and East are perpendicular directions.<br><br>` +
                    `<strong>Step 2:</strong> \\(d = \\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15 \\text{ km}\\).`
            },
            {
                text: `A ship leaves port and sails 8 km on bearing 000°, then turns and sails 15 km on bearing 090°. How far is the ship from port?`,
                latex: '',
                dist: 17,
                distTex: '17',
                d1: '23', d2: '\\sqrt{161}', d3: '16',
                explain:
                    `<strong>Step 1:</strong> Bearing 000° is North and bearing 090° is East — they are perpendicular.<br><br>` +
                    `<strong>Step 2:</strong> \\(d = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17 \\text{ km}\\).`
            }
        ];

        const sc = MathUtils.pick(scenarios);
        const options = TRIANGLES.buildMCOptions(sc.distTex, [sc.d1, sc.d2, sc.d3]);

        return {
            type: 'mc',
            rule: 'Bearing Navigation',
            difficulty: 'hard',
            text: sc.text,
            latex: sc.latex,
            answer: 1,
            answerTex: sc.distTex,
            options,
            hintTex: [
                `\\text{Draw a right-angled triangle using North/East as perpendicular legs.}`,
                `d = \\sqrt{(\\text{leg}_1)^2 + (\\text{leg}_2)^2}`
            ],
            explain: sc.explain
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => TRIANGLES.qPythagorean(),       weight: 2, diff: 'easy'   },
            { fn: () => TRIANGLES.qAreaSineFormula(),   weight: 2, diff: 'easy'   },
            { fn: () => TRIANGLES.qSineRuleSide(),      weight: 2, diff: 'medium' },
            { fn: () => TRIANGLES.qSineRuleAngle(),     weight: 2, diff: 'medium' },
            { fn: () => TRIANGLES.qCosineRuleSide(),    weight: 2, diff: 'medium' },
            { fn: () => TRIANGLES.qCosineRuleAngle(),   weight: 2, diff: 'medium' },
            { fn: () => TRIANGLES.qAreaFromBase(),      weight: 2, diff: 'easy'   },
            { fn: () => TRIANGLES.qAmbiguousCase(),     weight: 1, diff: 'hard'   },
            { fn: () => TRIANGLES.q3DCuboid(),          weight: 2, diff: 'medium' },
            { fn: () => TRIANGLES.qBearing(),           weight: 1, diff: 'hard'   }
        ];

        let filtered = pool;
        if (TRIANGLES.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (TRIANGLES.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (TRIANGLES.level === 'hard') {
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
        TRIANGLES.score = 0;
        TRIANGLES.total = 0;
        TRIANGLES.streak = 0;
        TRIANGLES.answered = false;
        TRIANGLES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="TRIANGLES.unload()">Triangles (3.1–3.3)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Triangles</h1>
                <p>IB Math AA 3.1–3.3 — Sine rule, cosine rule, area &amp; 3D geometry</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="TRIANGLES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="TRIANGLES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="TRIANGLES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="TRIANGLES.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="tri-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="tri-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="tri-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="tri-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="tri-question-card">
                <span class="rule-tag" id="tri-rule"></span>
                <span class="difficulty-tag" id="tri-difficulty"></span>
                <div class="question-text" id="tri-text"></div>
                <div class="question-prompt" id="tri-latex"></div>
                <div id="tri-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="tri-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="tri-feedback">
                <div class="feedback-title" id="tri-feedback-title"></div>
                <div class="feedback-explanation" id="tri-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="tri-hint-btn" onclick="TRIANGLES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="tri-next-btn" onclick="TRIANGLES.next()" style="display:none;">Next Question</button>
            </div>
        `;

        TRIANGLES.next();
    },

    /* ────────────────────────────────────────────
       UI: unload()
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
        TRIANGLES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        TRIANGLES.score = 0;
        TRIANGLES.total = 0;
        TRIANGLES.streak = 0;
        TRIANGLES.updateStats();
        TRIANGLES.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        TRIANGLES.answered = false;
        TRIANGLES.hintIndex = 0;
        TRIANGLES.currentQ = TRIANGLES.pickQuestion();
        const q = TRIANGLES.currentQ;

        // Rule tag
        document.getElementById('tri-rule').textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('tri-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('tri-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('tri-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('tri-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="TRIANGLES.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="tri-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')TRIANGLES.checkFree()">
                    <button class="btn btn-primary" onclick="TRIANGLES.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('tri-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint / feedback / next
        const hintBox = document.getElementById('tri-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('tri-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('tri-next-btn').style.display = 'none';
        document.getElementById('tri-hint-btn').style.display = '';
        document.getElementById('tri-hint-btn').disabled = false;

        TRIANGLES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = TRIANGLES.currentQ;
        if (!q || !q.hintTex || TRIANGLES.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('tri-hint-box');
        const prev = TRIANGLES.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[TRIANGLES.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        TRIANGLES.hintIndex++;

        if (TRIANGLES.hintIndex >= q.hintTex.length) {
            document.getElementById('tri-hint-btn').disabled = true;
        }

        TRIANGLES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (TRIANGLES.answered) return;
        TRIANGLES.answered = true;
        TRIANGLES.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            TRIANGLES.score++;
            TRIANGLES.streak++;
        } else {
            btn.classList.add('incorrect');
            TRIANGLES.streak = 0;
        }

        TRIANGLES.showFeedback(isCorrect);
        TRIANGLES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (TRIANGLES.answered) return;

        const inp = document.getElementById('tri-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        TRIANGLES.answered = true;
        TRIANGLES.total++;
        inp.disabled = true;

        const q = TRIANGLES.currentQ;
        // Use 0.5 tolerance for area questions, 0.01 for others
        const tol = (q.rule === 'Area = ½ab sinC') ? 0.5 : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            TRIANGLES.score++;
            TRIANGLES.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            TRIANGLES.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        TRIANGLES.showFeedback(isCorrect);
        TRIANGLES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = TRIANGLES.currentQ;
        const fb = document.getElementById('tri-feedback');
        const title = document.getElementById('tri-feedback-title');
        const explanation = document.getElementById('tri-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = TRIANGLES.streak > 1
                ? `Correct! (${TRIANGLES.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('tri-next-btn').style.display = '';
        document.getElementById('tri-hint-btn').style.display = 'none';

        TRIANGLES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('tri-score');
        const totalEl  = document.getElementById('tri-total');
        const streakEl = document.getElementById('tri-streak');
        const accEl    = document.getElementById('tri-accuracy');

        if (scoreEl)  scoreEl.textContent  = TRIANGLES.score;
        if (totalEl)  totalEl.textContent  = TRIANGLES.total;
        if (streakEl) streakEl.textContent = TRIANGLES.streak;
        if (accEl) {
            accEl.textContent = TRIANGLES.total > 0
                ? Math.round((TRIANGLES.score / TRIANGLES.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['3d-geometry-triangles'] = () => TRIANGLES.load();
