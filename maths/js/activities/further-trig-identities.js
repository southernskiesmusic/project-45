/*
 * further-trig-identities.js - IB Math AA 3.8: Further Trig Identities
 * Compound angle and double angle formulas
 */

const TRIG_ID = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       EXACT TRIG VALUES & HELPERS
       ──────────────────────────────────────────── */

    // Exact values stored as decimals and LaTeX strings
    exactVals: {
        0:   { sin: 0,              cos: 1,              sinTex: '0',                  cosTex: '1'              },
        30:  { sin: 0.5,            cos: Math.sqrt(3)/2, sinTex: '\\tfrac{1}{2}',      cosTex: '\\tfrac{\\sqrt{3}}{2}' },
        45:  { sin: Math.sqrt(2)/2, cos: Math.sqrt(2)/2, sinTex: '\\tfrac{\\sqrt{2}}{2}', cosTex: '\\tfrac{\\sqrt{2}}{2}' },
        60:  { sin: Math.sqrt(3)/2, cos: 0.5,            sinTex: '\\tfrac{\\sqrt{3}}{2}', cosTex: '\\tfrac{1}{2}'      },
        90:  { sin: 1,              cos: 0,              sinTex: '1',                  cosTex: '0'              },
    },

    /** Round to 4 decimal places */
    r4(x) { return Math.round(x * 10000) / 10000; },

    /** Build 4 MC options: correct + 3 distractors. Returns shuffled array with {value, tex}. */
    buildMCOptions(correctVal, distractorVals) {
        const correctDp = TRIG_ID.r4(correctVal);
        const seen = new Set([correctDp.toFixed(4)]);
        const opts = [{ value: 1, tex: correctDp.toFixed(4) }];

        for (const d of distractorVals) {
            const dp = TRIG_ID.r4(d);
            const key = dp.toFixed(4);
            if (!seen.has(key)) {
                seen.add(key);
                opts.push({ value: 0, tex: dp.toFixed(4) });
            }
        }

        // Fill any remaining gaps with random-offset distractors
        let tries = 0;
        while (opts.length < 4 && tries < 50) {
            const offset = (MathUtils.nonZeroRandInt(-5, 5)) * 0.05;
            const dp = TRIG_ID.r4(Math.max(-1, Math.min(1, correctVal + offset)));
            const key = dp.toFixed(4);
            if (!seen.has(key)) {
                seen.add(key);
                opts.push({ value: 0, tex: dp.toFixed(4) });
            }
            tries++;
        }

        return MathUtils.shuffle(opts);
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qSinSum - Easy (MC)
     * sin(A+B) = sinAcosB + cosAsinB
     * Use sums of standard angles: e.g. sin(75°) = sin(45°+30°)
     */
    qSinSum() {
        const pairs = [
            { a: 45, b: 30, angle: 75 },
            { a: 60, b: 30, angle: 90 },
            { a: 45, b: 45, angle: 90 },
            { a: 60, b: 45, angle: 105 },
        ];
        const { a, b, angle } = MathUtils.pick(pairs);

        const sinA = TRIG_ID.exactVals[a].sin;
        const cosA = TRIG_ID.exactVals[a].cos;
        const sinB = TRIG_ID.exactVals[b].sin;
        const cosB = TRIG_ID.exactVals[b].cos;

        const correctVal = sinA * cosB + cosA * sinB; // = sin(A+B)

        // Distractors: common mistakes
        const d1 = sinA * sinB + cosA * cosB;    // wrong formula (cosine formula)
        const d2 = sinA * cosB - cosA * sinB;    // subtraction sign error
        const d3 = (sinA + sinB) / 2;            // naive average error

        const options = TRIG_ID.buildMCOptions(correctVal, [d1, d2, d3]);

        const sinATex = TRIG_ID.exactVals[a].sinTex;
        const cosATex = TRIG_ID.exactVals[a].cosTex;
        const sinBTex = TRIG_ID.exactVals[b].sinTex;
        const cosBTex = TRIG_ID.exactVals[b].cosTex;

        return {
            type: 'mc',
            rule: 'sin(A+B)',
            difficulty: 'easy',
            text: `Use the compound angle formula to find the exact value of \\(\\sin(${angle}°)\\), then select the decimal approximation (4 d.p.).`,
            latex: `\\(\\sin(${angle}°) = \\sin(${a}° + ${b}°)\\)`,
            answer: 1,
            answerTex: TRIG_ID.r4(correctVal).toFixed(4),
            options,
            hintTex: [
                `\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B`,
                `= (${sinATex})(${cosBTex}) + (${cosATex})(${sinBTex})`
            ],
            explain: `<strong>Step 1:</strong> Apply the formula \\(\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute known values:<br>` +
                     `\\(\\sin(${angle}°) = \\sin ${a}°\\cos ${b}° + \\cos ${a}°\\sin ${b}°\\)<br>` +
                     `\\(= (${sinATex})(${cosBTex}) + (${cosATex})(${sinBTex})\\).<br><br>` +
                     `<strong>Step 3:</strong> Compute: \\(\\approx ${TRIG_ID.r4(correctVal).toFixed(4)}\\).`
        };
    },

    /**
     * 2. qCosSum - Easy (MC)
     * cos(A+B) = cosAcosB − sinAsinB
     */
    qCosSum() {
        const pairs = [
            { a: 45, b: 30, angle: 75 },
            { a: 60, b: 30, angle: 90 },
            { a: 45, b: 45, angle: 90 },
            { a: 60, b: 45, angle: 105 },
        ];
        const { a, b, angle } = MathUtils.pick(pairs);

        const sinA = TRIG_ID.exactVals[a].sin;
        const cosA = TRIG_ID.exactVals[a].cos;
        const sinB = TRIG_ID.exactVals[b].sin;
        const cosB = TRIG_ID.exactVals[b].cos;

        const correctVal = cosA * cosB - sinA * sinB;

        const d1 = cosA * cosB + sinA * sinB;    // sign error
        const d2 = sinA * cosB + cosA * sinB;    // used sin formula
        const d3 = cosA * sinB - sinA * cosB;    // swapped trig functions

        const options = TRIG_ID.buildMCOptions(correctVal, [d1, d2, d3]);

        const sinATex = TRIG_ID.exactVals[a].sinTex;
        const cosATex = TRIG_ID.exactVals[a].cosTex;
        const sinBTex = TRIG_ID.exactVals[b].sinTex;
        const cosBTex = TRIG_ID.exactVals[b].cosTex;

        return {
            type: 'mc',
            rule: 'cos(A+B)',
            difficulty: 'easy',
            text: `Use the compound angle formula to find the exact value of \\(\\cos(${angle}°)\\), then select the decimal approximation (4 d.p.).`,
            latex: `\\(\\cos(${angle}°) = \\cos(${a}° + ${b}°)\\)`,
            answer: 1,
            answerTex: TRIG_ID.r4(correctVal).toFixed(4),
            options,
            hintTex: [
                `\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B`,
                `= (${cosATex})(${cosBTex}) - (${sinATex})(${sinBTex})`
            ],
            explain: `<strong>Step 1:</strong> Apply the formula \\(\\cos(A+B) = \\cos A\\cos B - \\sin A\\sin B\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute known values:<br>` +
                     `\\(\\cos(${angle}°) = \\cos ${a}°\\cos ${b}° - \\sin ${a}°\\sin ${b}°\\)<br>` +
                     `\\(= (${cosATex})(${cosBTex}) - (${sinATex})(${sinBTex})\\).<br><br>` +
                     `<strong>Step 3:</strong> Compute: \\(\\approx ${TRIG_ID.r4(correctVal).toFixed(4)}\\).`
        };
    },

    /**
     * 3. qSinDiff - Easy (MC)
     * sin(A−B) = sinAcosB − cosAsinB
     */
    qSinDiff() {
        const pairs = [
            { a: 45, b: 30, angle: 15 },
            { a: 60, b: 45, angle: 15 },
            { a: 60, b: 30, angle: 30 },
            { a: 90, b: 45, angle: 45 },
            { a: 90, b: 30, angle: 60 },
        ];
        const { a, b, angle } = MathUtils.pick(pairs);

        const sinA = TRIG_ID.exactVals[a].sin;
        const cosA = TRIG_ID.exactVals[a].cos;
        const sinB = TRIG_ID.exactVals[b].sin;
        const cosB = TRIG_ID.exactVals[b].cos;

        const correctVal = sinA * cosB - cosA * sinB;

        const d1 = sinA * cosB + cosA * sinB;    // used addition
        const d2 = cosA * cosB - sinA * sinB;    // used cosine formula
        const d3 = cosA * cosB + sinA * sinB;    // wrong on both counts

        const options = TRIG_ID.buildMCOptions(correctVal, [d1, d2, d3]);

        const sinATex = TRIG_ID.exactVals[a].sinTex;
        const cosATex = TRIG_ID.exactVals[a].cosTex;
        const sinBTex = TRIG_ID.exactVals[b].sinTex;
        const cosBTex = TRIG_ID.exactVals[b].cosTex;

        return {
            type: 'mc',
            rule: 'sin(A−B)',
            difficulty: 'easy',
            text: `Use the compound angle formula to find the exact value of \\(\\sin(${angle}°)\\), then select the decimal approximation (4 d.p.).`,
            latex: `\\(\\sin(${angle}°) = \\sin(${a}° - ${b}°)\\)`,
            answer: 1,
            answerTex: TRIG_ID.r4(correctVal).toFixed(4),
            options,
            hintTex: [
                `\\sin(A-B) = \\sin A\\cos B - \\cos A\\sin B`,
                `= (${sinATex})(${cosBTex}) - (${cosATex})(${sinBTex})`
            ],
            explain: `<strong>Step 1:</strong> Apply the formula \\(\\sin(A-B) = \\sin A\\cos B - \\cos A\\sin B\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute known values:<br>` +
                     `\\(\\sin(${angle}°) = \\sin ${a}°\\cos ${b}° - \\cos ${a}°\\sin ${b}°\\)<br>` +
                     `\\(= (${sinATex})(${cosBTex}) - (${cosATex})(${sinBTex})\\).<br><br>` +
                     `<strong>Step 3:</strong> Compute: \\(\\approx ${TRIG_ID.r4(correctVal).toFixed(4)}\\).`
        };
    },

    /**
     * 4. qDoubleAngleSin - Easy (Free)
     * sin(2A) = 2sinAcosA. Use Pythagorean triples.
     * Given sinA and cosA, find sin(2A) to 4 d.p.
     */
    qDoubleAngleSin() {
        const triples = [
            { sinN: 3, cosN: 4, hyp: 5 },   // 3-4-5
            { sinN: 5, cosN: 12, hyp: 13 },  // 5-12-13
            { sinN: 8, cosN: 15, hyp: 17 },  // 8-15-17
            { sinN: 7, cosN: 24, hyp: 25 },  // 7-24-25
        ];
        const { sinN, cosN, hyp } = MathUtils.pick(triples);

        const sinA = sinN / hyp;
        const cosA = cosN / hyp;
        const sin2A = 2 * sinA * cosA;   // = 2*sinN*cosN / hyp²

        const sin2ANum = 2 * sinN * cosN;
        const sin2ADen = hyp * hyp;

        return {
            type: 'free',
            rule: 'sin(2A)',
            difficulty: 'easy',
            text: `Given that \\(\\sin A = \\tfrac{${sinN}}{${hyp}}\\) and \\(\\cos A = \\tfrac{${cosN}}{${hyp}}\\) (first quadrant), find \\(\\sin(2A)\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: TRIG_ID.r4(sin2A),
            answerTex: `\\tfrac{${sin2ANum}}{${sin2ADen}} \\approx ${TRIG_ID.r4(sin2A).toFixed(4)}`,
            options: [],
            hintTex: [
                `\\sin(2A) = 2\\sin A\\cos A`,
                `= 2 \\cdot \\frac{${sinN}}{${hyp}} \\cdot \\frac{${cosN}}{${hyp}} = \\frac{${sin2ANum}}{${sin2ADen}}`
            ],
            explain: `<strong>Step 1:</strong> Recall the double angle formula: \\(\\sin(2A) = 2\\sin A\\cos A\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute the given values:<br>` +
                     `\\(\\sin(2A) = 2 \\cdot \\dfrac{${sinN}}{${hyp}} \\cdot \\dfrac{${cosN}}{${hyp}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Multiply: \\(= \\dfrac{2 \\times ${sinN} \\times ${cosN}}{${hyp}^2} = \\dfrac{${sin2ANum}}{${sin2ADen}} \\approx ${TRIG_ID.r4(sin2A).toFixed(4)}\\).`
        };
    },

    /**
     * 5. qDoubleAngleCos - Easy (MC)
     * cos(2A) = cos²A − sin²A. Given sinA and cosA from a Pythagorean triple.
     */
    qDoubleAngleCos() {
        const triples = [
            { sinN: 3, cosN: 4, hyp: 5 },
            { sinN: 5, cosN: 12, hyp: 13 },
            { sinN: 8, cosN: 15, hyp: 17 },
            { sinN: 7, cosN: 24, hyp: 25 },
        ];
        const { sinN, cosN, hyp } = MathUtils.pick(triples);

        const sinA = sinN / hyp;
        const cosA = cosN / hyp;
        const cos2A = cosA * cosA - sinA * sinA;  // (cosN² − sinN²) / hyp²

        const cos2ANum = cosN * cosN - sinN * sinN;
        const cos2ADen = hyp * hyp;

        const d1 = sinA * sinA - cosA * cosA;   // sign flipped
        const d2 = 2 * sinA * cosA;             // used sin(2A)
        const d3 = cosA * cosA + sinA * sinA;   // + instead of −

        const options = TRIG_ID.buildMCOptions(cos2A, [d1, d2, d3]);

        return {
            type: 'mc',
            rule: 'cos(2A)',
            difficulty: 'easy',
            text: `Given that \\(\\sin A = \\tfrac{${sinN}}{${hyp}}\\) and \\(\\cos A = \\tfrac{${cosN}}{${hyp}}\\), find \\(\\cos(2A)\\). Select the correct decimal approximation (4 d.p.).`,
            latex: '',
            answer: 1,
            answerTex: `\\tfrac{${cos2ANum}}{${cos2ADen}} \\approx ${TRIG_ID.r4(cos2A).toFixed(4)}`,
            options,
            hintTex: [
                `\\cos(2A) = \\cos^2 A - \\sin^2 A`,
                `= \\left(\\frac{${cosN}}{${hyp}}\\right)^2 - \\left(\\frac{${sinN}}{${hyp}}\\right)^2 = \\frac{${cos2ANum}}{${cos2ADen}}`
            ],
            explain: `<strong>Step 1:</strong> Apply the formula \\(\\cos(2A) = \\cos^2 A - \\sin^2 A\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\cos(2A) = \\left(\\dfrac{${cosN}}{${hyp}}\\right)^2 - \\left(\\dfrac{${sinN}}{${hyp}}\\right)^2\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(= \\dfrac{${cosN * cosN} - ${sinN * sinN}}{${hyp * hyp}} = \\dfrac{${cos2ANum}}{${cos2ADen}} \\approx ${TRIG_ID.r4(cos2A).toFixed(4)}\\).`
        };
    },

    /**
     * 6. qFindSin2A - Medium (Free)
     * Given only sinA (first quadrant), use cosA = √(1−sin²A) to find sin(2A).
     */
    qFindSin2A() {
        const triples = [
            { sinN: 5,  cosN: 12, hyp: 13 },
            { sinN: 3,  cosN: 4,  hyp: 5  },
            { sinN: 8,  cosN: 15, hyp: 17 },
            { sinN: 7,  cosN: 24, hyp: 25 },
            { sinN: 20, cosN: 21, hyp: 29 },
        ];
        const { sinN, cosN, hyp } = MathUtils.pick(triples);

        const sinA = sinN / hyp;
        const cosA = cosN / hyp;
        const sin2A = 2 * sinA * cosA;
        const sin2ANum = 2 * sinN * cosN;
        const sin2ADen = hyp * hyp;

        return {
            type: 'free',
            rule: 'Find sin(2A)',
            difficulty: 'medium',
            text: `Given that \\(\\sin A = \\tfrac{${sinN}}{${hyp}}\\) and \\(A\\) is in the first quadrant, find \\(\\sin(2A)\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: TRIG_ID.r4(sin2A),
            answerTex: `\\tfrac{${sin2ANum}}{${sin2ADen}} \\approx ${TRIG_ID.r4(sin2A).toFixed(4)}`,
            options: [],
            hintTex: [
                `\\cos A = \\sqrt{1 - \\sin^2 A} = \\sqrt{1 - \\tfrac{${sinN * sinN}}{${hyp * hyp}}} = \\frac{${cosN}}{${hyp}}`,
                `\\sin(2A) = 2\\sin A\\cos A = 2 \\cdot \\frac{${sinN}}{${hyp}} \\cdot \\frac{${cosN}}{${hyp}} = \\frac{${sin2ANum}}{${sin2ADen}}`
            ],
            explain: `<strong>Step 1:</strong> Find \\(\\cos A\\) using the Pythagorean identity \\(\\cos A = \\sqrt{1 - \\sin^2 A}\\):<br>` +
                     `\\(\\cos A = \\sqrt{1 - \\left(\\dfrac{${sinN}}{${hyp}}\\right)^2} = \\sqrt{\\dfrac{${hyp * hyp - sinN * sinN}}{${hyp * hyp}}} = \\dfrac{${cosN}}{${hyp}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the double angle formula \\(\\sin(2A) = 2\\sin A\\cos A\\):<br>` +
                     `\\(= 2 \\cdot \\dfrac{${sinN}}{${hyp}} \\cdot \\dfrac{${cosN}}{${hyp}} = \\dfrac{${sin2ANum}}{${sin2ADen}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\sin(2A) \\approx ${TRIG_ID.r4(sin2A).toFixed(4)}\\).`
        };
    },

    /**
     * 7. qExactValueCompound - Medium (MC)
     * Find sin, cos, or tan at 15°, 75°, 105°, 165° using compound formulas.
     */
    qExactValueCompound() {
        const cases = [
            {
                fn: 'sin', angle: 15, a: 45, b: 30, op: '-',
                compute: () => Math.sin(15 * Math.PI / 180),
                d1: () => Math.cos(15 * Math.PI / 180),
                d2: () => Math.sin(45 * Math.PI / 180) + Math.sin(30 * Math.PI / 180),
                d3: () => Math.sin(45 * Math.PI / 180) * Math.sin(30 * Math.PI / 180),
                formulaTex: `\\sin(45°-30°) = \\sin 45°\\cos 30° - \\cos 45°\\sin 30°`
            },
            {
                fn: 'cos', angle: 15, a: 45, b: 30, op: '-',
                compute: () => Math.cos(15 * Math.PI / 180),
                d1: () => Math.sin(15 * Math.PI / 180),
                d2: () => Math.cos(45 * Math.PI / 180) - Math.cos(30 * Math.PI / 180),
                d3: () => Math.cos(45 * Math.PI / 180) * Math.cos(30 * Math.PI / 180),
                formulaTex: `\\cos(45°-30°) = \\cos 45°\\cos 30° + \\sin 45°\\sin 30°`
            },
            {
                fn: 'sin', angle: 75, a: 45, b: 30, op: '+',
                compute: () => Math.sin(75 * Math.PI / 180),
                d1: () => Math.cos(75 * Math.PI / 180),
                d2: () => Math.sin(45 * Math.PI / 180) - Math.sin(30 * Math.PI / 180),
                d3: () => Math.sin(45 * Math.PI / 180) * Math.sin(30 * Math.PI / 180),
                formulaTex: `\\sin(45°+30°) = \\sin 45°\\cos 30° + \\cos 45°\\sin 30°`
            },
            {
                fn: 'cos', angle: 75, a: 45, b: 30, op: '+',
                compute: () => Math.cos(75 * Math.PI / 180),
                d1: () => Math.sin(75 * Math.PI / 180),
                d2: () => Math.cos(45 * Math.PI / 180) + Math.cos(30 * Math.PI / 180),
                d3: () => -Math.cos(15 * Math.PI / 180),
                formulaTex: `\\cos(45°+30°) = \\cos 45°\\cos 30° - \\sin 45°\\sin 30°`
            },
            {
                fn: 'sin', angle: 105, a: 60, b: 45, op: '+',
                compute: () => Math.sin(105 * Math.PI / 180),
                d1: () => -Math.sin(75 * Math.PI / 180),
                d2: () => Math.sin(60 * Math.PI / 180) - Math.sin(45 * Math.PI / 180),
                d3: () => Math.cos(105 * Math.PI / 180),
                formulaTex: `\\sin(60°+45°) = \\sin 60°\\cos 45° + \\cos 60°\\sin 45°`
            },
        ];

        const c = MathUtils.pick(cases);
        const correctVal = c.compute();
        const options = TRIG_ID.buildMCOptions(correctVal, [c.d1(), c.d2(), c.d3()]);

        return {
            type: 'mc',
            rule: 'Exact Value',
            difficulty: 'medium',
            text: `Use a compound angle formula to find \\(\\${c.fn}(${c.angle}°)\\). Select the correct decimal approximation (4 d.p.).`,
            latex: `\\(${c.angle}° = ${c.a}° ${c.op === '+' ? '+' : '-'} ${c.b}°\\)`,
            answer: 1,
            answerTex: TRIG_ID.r4(correctVal).toFixed(4),
            options,
            hintTex: [
                `\\${c.fn}(${c.angle}°) = ${c.formulaTex}`,
                `\\text{Use exact values for } ${c.a}° \\text{ and } ${c.b}°`
            ],
            explain: `<strong>Step 1:</strong> Write \\(${c.angle}° = ${c.a}° ${c.op} ${c.b}°\\) and apply the compound angle formula.<br><br>` +
                     `<strong>Step 2:</strong> \\(${c.formulaTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute exact values and simplify to get \\(\\approx ${TRIG_ID.r4(correctVal).toFixed(4)}\\).`
        };
    },

    /**
     * 8. qSimplifyDoubleAngle - Medium (MC)
     * Identify the equivalent form of cos(2A): in terms of sinA only, cosA only, or mixed.
     */
    qSimplifyDoubleAngle() {
        const scenarios = [
            {
                question: `Which expression is equivalent to \\(\\cos(2A)\\) written only in terms of \\(\\sin A\\)?`,
                correctTex: `1 - 2\\sin^2 A`,
                distractors: [`2\\cos^2 A - 1`, `\\cos^2 A - \\sin^2 A`, `1 + 2\\sin^2 A`],
                explain: `Using \\(\\cos^2 A = 1 - \\sin^2 A\\):<br>` +
                         `\\(\\cos(2A) = \\cos^2 A - \\sin^2 A = (1 - \\sin^2 A) - \\sin^2 A = 1 - 2\\sin^2 A\\).`
            },
            {
                question: `Which expression is equivalent to \\(\\cos(2A)\\) written only in terms of \\(\\cos A\\)?`,
                correctTex: `2\\cos^2 A - 1`,
                distractors: [`1 - 2\\cos^2 A`, `\\cos^2 A - \\sin^2 A`, `2\\cos^2 A + 1`],
                explain: `Using \\(\\sin^2 A = 1 - \\cos^2 A\\):<br>` +
                         `\\(\\cos(2A) = \\cos^2 A - \\sin^2 A = \\cos^2 A - (1 - \\cos^2 A) = 2\\cos^2 A - 1\\).`
            },
            {
                question: `Which is an equivalent form of \\(\\cos(2A)\\)?`,
                correctTex: `\\cos^2 A - \\sin^2 A`,
                distractors: [`2\\sin A\\cos A`, `1 - 2\\cos^2 A`, `\\sin^2 A - \\cos^2 A`],
                explain: `The standard identity is \\(\\cos(2A) = \\cos^2 A - \\sin^2 A\\), derived directly from \\(\\cos(A+A)\\).`
            },
        ];

        const sc = MathUtils.pick(scenarios);

        const allOpts = [{ value: 1, tex: sc.correctTex }];
        for (const d of sc.distractors) {
            allOpts.push({ value: 0, tex: d });
        }

        return {
            type: 'mc',
            rule: 'cos(2A) Forms',
            difficulty: 'medium',
            text: sc.question,
            latex: '',
            answer: 1,
            answerTex: sc.correctTex,
            options: MathUtils.shuffle(allOpts),
            hintTex: [
                `\\cos(2A) = \\cos^2 A - \\sin^2 A`,
                `\\text{Use } \\sin^2 A + \\cos^2 A = 1 \\text{ to rewrite in one variable}`
            ],
            explain: `<strong>Key identity:</strong> \\(\\cos(2A) = \\cos^2 A - \\sin^2 A\\).<br><br>` +
                     sc.explain
        };
    },

    /**
     * 9. qSolveWithDoubleAngle - Hard (MC)
     * Solve a trig equation using the double angle formula.
     */
    qSolveWithDoubleAngle() {
        const scenarios = [
            {
                equation: `\\sin(2x) = \\sin x, \\quad 0° \\leq x \\leq 360°`,
                workTex: `2\\sin x\\cos x = \\sin x \\implies \\sin x(2\\cos x - 1) = 0`,
                correctTex: `x = 0°, 60°, 180°, 300°`,
                distractors: [
                    `x = 60°, 300°`,
                    `x = 0°, 180°`,
                    `x = 30°, 150°, 210°, 330°`
                ],
                explain: `<strong>Step 1:</strong> Apply \\(\\sin(2x) = 2\\sin x\\cos x\\):<br>` +
                         `\\(2\\sin x\\cos x = \\sin x\\).<br><br>` +
                         `<strong>Step 2:</strong> Rearrange: \\(\\sin x(2\\cos x - 1) = 0\\).<br><br>` +
                         `<strong>Step 3:</strong> Either \\(\\sin x = 0 \\Rightarrow x = 0°, 180°, 360°\\) (but 360° = 0°), or \\(\\cos x = \\tfrac{1}{2} \\Rightarrow x = 60°, 300°\\).<br><br>` +
                         `<strong>Answer:</strong> \\(x = 0°, 60°, 180°, 300°\\).`
            },
            {
                equation: `\\cos(2x) = \\cos x, \\quad 0° \\leq x \\leq 360°`,
                workTex: `2\\cos^2 x - 1 = \\cos x \\implies 2\\cos^2 x - \\cos x - 1 = 0`,
                correctTex: `x = 0°, 120°, 240°`,
                distractors: [
                    `x = 60°, 120°, 240°, 300°`,
                    `x = 0°, 60°, 300°`,
                    `x = 90°, 210°, 330°`
                ],
                explain: `<strong>Step 1:</strong> Use \\(\\cos(2x) = 2\\cos^2 x - 1\\):<br>` +
                         `\\(2\\cos^2 x - 1 = \\cos x\\).<br><br>` +
                         `<strong>Step 2:</strong> Rearrange: \\(2\\cos^2 x - \\cos x - 1 = 0\\), factor: \\((2\\cos x + 1)(\\cos x - 1) = 0\\).<br><br>` +
                         `<strong>Step 3:</strong> \\(\\cos x = 1 \\Rightarrow x = 0°\\); \\(\\cos x = -\\tfrac{1}{2} \\Rightarrow x = 120°, 240°\\).<br><br>` +
                         `<strong>Answer:</strong> \\(x = 0°, 120°, 240°\\).`
            },
            {
                equation: `\\sin(2x) = \\cos x, \\quad 0° \\leq x \\leq 360°`,
                workTex: `2\\sin x\\cos x = \\cos x \\implies \\cos x(2\\sin x - 1) = 0`,
                correctTex: `x = 30°, 90°, 150°, 270°`,
                distractors: [
                    `x = 30°, 150°`,
                    `x = 90°, 270°`,
                    `x = 45°, 135°, 225°, 315°`
                ],
                explain: `<strong>Step 1:</strong> Apply \\(\\sin(2x) = 2\\sin x\\cos x\\):<br>` +
                         `\\(2\\sin x\\cos x = \\cos x\\).<br><br>` +
                         `<strong>Step 2:</strong> Rearrange: \\(\\cos x(2\\sin x - 1) = 0\\).<br><br>` +
                         `<strong>Step 3:</strong> Either \\(\\cos x = 0 \\Rightarrow x = 90°, 270°\\), or \\(\\sin x = \\tfrac{1}{2} \\Rightarrow x = 30°, 150°\\).<br><br>` +
                         `<strong>Answer:</strong> \\(x = 30°, 90°, 150°, 270°\\).`
            },
        ];

        const sc = MathUtils.pick(scenarios);

        const allOpts = [{ value: 1, tex: sc.correctTex }];
        for (const d of sc.distractors) {
            allOpts.push({ value: 0, tex: d });
        }

        return {
            type: 'mc',
            rule: 'Solve (Double Angle)',
            difficulty: 'hard',
            text: `Solve the equation using the double angle formula. Select the complete solution set.`,
            latex: `\\(${sc.equation}\\)`,
            answer: 1,
            answerTex: sc.correctTex,
            options: MathUtils.shuffle(allOpts),
            hintTex: [
                `\\text{Apply a double angle identity to write one side in terms of a single angle}`,
                sc.workTex
            ],
            explain: sc.explain
        };
    },

    /**
     * 10. qTanDoubleAngle - Hard (Free)
     * tan(2A) = 2tanA / (1 − tan²A). Given tanA = p/q, compute tan(2A) to 4 d.p.
     */
    qTanDoubleAngle() {
        const fractions = [
            { p: 1, q: 2 },   // tan2A = 4/3
            { p: 1, q: 3 },   // tan2A = 3/4
            { p: 2, q: 3 },   // tan2A = 12/5
            { p: 3, q: 4 },   // tan2A = 24/7
            { p: 1, q: 4 },   // tan2A = 8/15
        ];
        const { p, q } = MathUtils.pick(fractions);

        const tanA = p / q;
        // tan(2A) = 2tanA / (1 - tan²A) = 2(p/q) / (1 - p²/q²) = 2pq / (q² - p²)
        const num = 2 * p * q;
        const den = q * q - p * p;
        const tan2A = num / den;

        return {
            type: 'free',
            rule: 'tan(2A)',
            difficulty: 'hard',
            text: `Given that \\(\\tan A = \\tfrac{${p}}{${q}}\\), find \\(\\tan(2A)\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: TRIG_ID.r4(tan2A),
            answerTex: `\\tfrac{${num}}{${den}} \\approx ${TRIG_ID.r4(tan2A).toFixed(4)}`,
            options: [],
            hintTex: [
                `\\tan(2A) = \\frac{2\\tan A}{1 - \\tan^2 A}`,
                `= \\frac{2 \\cdot \\tfrac{${p}}{${q}}}{1 - \\left(\\tfrac{${p}}{${q}}\\right)^2} = \\frac{\\tfrac{${2 * p}}{${q}}}{\\tfrac{${q * q - p * p}}{${q * q}}} = \\frac{${num}}{${den}}`
            ],
            explain: `<strong>Step 1:</strong> Apply the formula \\(\\tan(2A) = \\dfrac{2\\tan A}{1 - \\tan^2 A}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(\\tan A = \\dfrac{${p}}{${q}}\\):<br>` +
                     `\\(\\tan(2A) = \\dfrac{2 \\cdot \\tfrac{${p}}{${q}}}{1 - \\left(\\tfrac{${p}}{${q}}\\right)^2} = \\dfrac{\\tfrac{${2 * p}}{${q}}}{\\tfrac{${q * q - p * p}}{${q * q}}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify by multiplying numerator and denominator:<br>` +
                     `\\(= \\dfrac{${2 * p} \\cdot ${q * q}}{${q} \\cdot ${q * q - p * p}} = \\dfrac{${num * q}}{${q * (q * q - p * p)}} = \\dfrac{${num}}{${den}} \\approx ${TRIG_ID.r4(tan2A).toFixed(4)}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => TRIG_ID.qSinSum(),               weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_ID.qCosSum(),               weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_ID.qSinDiff(),              weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_ID.qDoubleAngleSin(),       weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_ID.qDoubleAngleCos(),       weight: 3, difficulty: 'easy'   },
            { fn: () => TRIG_ID.qFindSin2A(),            weight: 2, difficulty: 'medium' },
            { fn: () => TRIG_ID.qExactValueCompound(),   weight: 2, difficulty: 'medium' },
            { fn: () => TRIG_ID.qSimplifyDoubleAngle(),  weight: 2, difficulty: 'medium' },
            { fn: () => TRIG_ID.qSolveWithDoubleAngle(), weight: 1, difficulty: 'hard'   },
            { fn: () => TRIG_ID.qTanDoubleAngle(),       weight: 1, difficulty: 'hard'   },
        ];

        let filtered = pool;
        if (TRIG_ID.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (TRIG_ID.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (TRIG_ID.level === 'hard') {
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
        TRIG_ID.score = 0;
        TRIG_ID.total = 0;
        TRIG_ID.streak = 0;
        TRIG_ID.answered = false;
        TRIG_ID.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="TRIG_ID.unload()">Trig Identities (3.8)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Trig Identities</h1>
                <p>IB Math AA 3.8 &ndash; Compound angle and double angle formulas</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="TRIG_ID.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="TRIG_ID.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="TRIG_ID.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="TRIG_ID.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="tid-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="tid-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="tid-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="tid-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="tid-question-card">
                <span class="rule-tag" id="tid-rule"></span>
                <span class="difficulty-tag" id="tid-difficulty"></span>
                <div class="question-text" id="tid-text"></div>
                <div class="question-prompt" id="tid-latex"></div>
                <div id="tid-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="tid-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="tid-feedback">
                <div class="feedback-title" id="tid-feedback-title"></div>
                <div class="feedback-explanation" id="tid-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="tid-hint-btn" onclick="TRIG_ID.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="tid-next-btn" onclick="TRIG_ID.next()" style="display:none;">Next Question</button>
            </div>
        `;

        TRIG_ID.next();
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
        TRIG_ID.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        TRIG_ID.score = 0;
        TRIG_ID.total = 0;
        TRIG_ID.streak = 0;
        TRIG_ID.updateStats();
        TRIG_ID.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        TRIG_ID.answered = false;
        TRIG_ID.hintIndex = 0;
        TRIG_ID.currentQ = TRIG_ID.pickQuestion();
        const q = TRIG_ID.currentQ;

        // Rule tag
        document.getElementById('tid-rule').textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('tid-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('tid-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('tid-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('tid-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="TRIG_ID.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="tid-input"
                           placeholder="Your answer (4 d.p.)" autocomplete="off"
                           onkeydown="if(event.key==='Enter')TRIG_ID.checkFree()">
                    <button class="btn btn-primary" onclick="TRIG_ID.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('tid-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Reset hint/feedback/next
        const hintBox = document.getElementById('tid-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('tid-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('tid-next-btn').style.display = 'none';
        document.getElementById('tid-hint-btn').style.display = '';
        document.getElementById('tid-hint-btn').disabled = false;

        TRIG_ID.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = TRIG_ID.currentQ;
        if (!q || !q.hintTex || TRIG_ID.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('tid-hint-box');
        const hintContent = TRIG_ID.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[TRIG_ID.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        TRIG_ID.hintIndex++;

        if (TRIG_ID.hintIndex >= q.hintTex.length) {
            document.getElementById('tid-hint-btn').disabled = true;
        }

        TRIG_ID.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (TRIG_ID.answered) return;
        TRIG_ID.answered = true;
        TRIG_ID.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            TRIG_ID.score++;
            TRIG_ID.streak++;
        } else {
            btn.classList.add('incorrect');
            TRIG_ID.streak = 0;
        }

        TRIG_ID.showFeedback(isCorrect);
        TRIG_ID.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (TRIG_ID.answered) return;

        const inp = document.getElementById('tid-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        TRIG_ID.answered = true;
        TRIG_ID.total++;
        inp.disabled = true;

        const q = TRIG_ID.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.001);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            TRIG_ID.score++;
            TRIG_ID.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            TRIG_ID.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        TRIG_ID.showFeedback(isCorrect);
        TRIG_ID.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = TRIG_ID.currentQ;
        const fb = document.getElementById('tid-feedback');
        const title = document.getElementById('tid-feedback-title');
        const explanation = document.getElementById('tid-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = TRIG_ID.streak > 1
                ? `Correct! (${TRIG_ID.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('tid-next-btn').style.display = '';
        document.getElementById('tid-hint-btn').style.display = 'none';

        TRIG_ID.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('tid-score');
        const totalEl  = document.getElementById('tid-total');
        const streakEl = document.getElementById('tid-streak');
        const accEl    = document.getElementById('tid-accuracy');

        if (scoreEl)  scoreEl.textContent  = TRIG_ID.score;
        if (totalEl)  totalEl.textContent  = TRIG_ID.total;
        if (streakEl) streakEl.textContent = TRIG_ID.streak;
        if (accEl) {
            accEl.textContent = TRIG_ID.total > 0
                ? Math.round((TRIG_ID.score / TRIG_ID.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['further-trig-identities'] = () => TRIG_ID.load();
