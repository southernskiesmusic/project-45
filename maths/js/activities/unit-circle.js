/*
 * unit-circle.js - IB Math AA 3.5: Unit Circle & Exact Values
 * Exact trig values, quadrant signs, reference angles, Pythagorean identity,
 * cofunction identity, periodicity, negative angles.
 */

const UNIT_CIRCLE = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       EXACT VALUE LOOKUP TABLE
       ──────────────────────────────────────────── */

    TABLE: [
        { deg: 0,   rad: '0',         sinTex: '0',            cosTex: '1',             tanTex: '0',              sinVal: 0,           cosVal: 1,            tanVal: 0,              tanDef: true  },
        { deg: 30,  rad: '\\pi/6',    sinTex: '\\frac{1}{2}', cosTex: '\\frac{\\sqrt{3}}{2}', tanTex: '\\frac{1}{\\sqrt{3}}', sinVal: 0.5,  cosVal: Math.sqrt(3)/2, tanVal: 1/Math.sqrt(3), tanDef: true  },
        { deg: 45,  rad: '\\pi/4',    sinTex: '\\frac{\\sqrt{2}}{2}', cosTex: '\\frac{\\sqrt{2}}{2}', tanTex: '1', sinVal: Math.sqrt(2)/2, cosVal: Math.sqrt(2)/2, tanVal: 1,          tanDef: true  },
        { deg: 60,  rad: '\\pi/3',    sinTex: '\\frac{\\sqrt{3}}{2}', cosTex: '\\frac{1}{2}', tanTex: '\\sqrt{3}', sinVal: Math.sqrt(3)/2, cosVal: 0.5,          tanVal: Math.sqrt(3),  tanDef: true  },
        { deg: 90,  rad: '\\pi/2',    sinTex: '1',            cosTex: '0',             tanTex: '\\text{undefined}', sinVal: 1,         cosVal: 0,            tanVal: null,           tanDef: false },
        { deg: 120, rad: '2\\pi/3',   sinTex: '\\frac{\\sqrt{3}}{2}', cosTex: '-\\frac{1}{2}', tanTex: '-\\sqrt{3}', sinVal: Math.sqrt(3)/2, cosVal: -0.5,         tanVal: -Math.sqrt(3), tanDef: true  },
        { deg: 135, rad: '3\\pi/4',   sinTex: '\\frac{\\sqrt{2}}{2}', cosTex: '-\\frac{\\sqrt{2}}{2}', tanTex: '-1', sinVal: Math.sqrt(2)/2, cosVal: -Math.sqrt(2)/2, tanVal: -1,        tanDef: true  },
        { deg: 150, rad: '5\\pi/6',   sinTex: '\\frac{1}{2}', cosTex: '-\\frac{\\sqrt{3}}{2}', tanTex: '-\\frac{1}{\\sqrt{3}}', sinVal: 0.5, cosVal: -Math.sqrt(3)/2, tanVal: -1/Math.sqrt(3), tanDef: true },
        { deg: 180, rad: '\\pi',      sinTex: '0',            cosTex: '-1',            tanTex: '0',              sinVal: 0,           cosVal: -1,           tanVal: 0,              tanDef: true  },
        { deg: 210, rad: '7\\pi/6',   sinTex: '-\\frac{1}{2}', cosTex: '-\\frac{\\sqrt{3}}{2}', tanTex: '\\frac{1}{\\sqrt{3}}', sinVal: -0.5, cosVal: -Math.sqrt(3)/2, tanVal: 1/Math.sqrt(3), tanDef: true },
        { deg: 240, rad: '4\\pi/3',   sinTex: '-\\frac{\\sqrt{3}}{2}', cosTex: '-\\frac{1}{2}', tanTex: '\\sqrt{3}', sinVal: -Math.sqrt(3)/2, cosVal: -0.5,        tanVal: Math.sqrt(3),  tanDef: true  },
        { deg: 270, rad: '3\\pi/2',   sinTex: '-1',           cosTex: '0',             tanTex: '\\text{undefined}', sinVal: -1,        cosVal: 0,            tanVal: null,           tanDef: false },
        { deg: 300, rad: '5\\pi/3',   sinTex: '-\\frac{\\sqrt{3}}{2}', cosTex: '\\frac{1}{2}', tanTex: '-\\sqrt{3}', sinVal: -Math.sqrt(3)/2, cosVal: 0.5,         tanVal: -Math.sqrt(3), tanDef: true  },
        { deg: 330, rad: '11\\pi/6',  sinTex: '-\\frac{1}{2}', cosTex: '\\frac{\\sqrt{3}}{2}', tanTex: '-\\frac{1}{\\sqrt{3}}', sinVal: -0.5, cosVal: Math.sqrt(3)/2, tanVal: -1/Math.sqrt(3), tanDef: true },
        { deg: 360, rad: '2\\pi',     sinTex: '0',            cosTex: '1',             tanTex: '0',              sinVal: 0,           cosVal: 1,            tanVal: 0,              tanDef: true  }
    ],

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qExactSin - Easy (MC)
     * Find the exact value of sin(θ°). Avoids sin=0 and undefined rows.
     */
    qExactSin() {
        const eligible = UNIT_CIRCLE.TABLE.filter(r => r.sinVal !== 0);
        const entry = MathUtils.pick(eligible);

        // Build a pool of distractor sinTex values
        const allSinTex = [...new Set(UNIT_CIRCLE.TABLE.map(r => r.sinTex))];
        const distractorPool = allSinTex.filter(t => t !== entry.sinTex);

        const optionTexts = [entry.sinTex];
        const shuffledPool = MathUtils.shuffle(distractorPool);
        for (const t of shuffledPool) {
            if (optionTexts.length >= 4) break;
            optionTexts.push(t);
        }

        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }))
        );

        return {
            type: 'mc',
            rule: 'Exact Value of sin',
            difficulty: 'easy',
            text: `Find the exact value of \\(\\sin(${entry.deg}^\\circ)\\).`,
            latex: `\\(\\theta = ${entry.deg}^\\circ \\;(${entry.rad}\\text{ rad})\\)`,
            answer: 1,
            answerTex: entry.sinTex,
            options,
            hintTex: [
                `\\text{Recall the standard unit circle values.}`,
                `\\sin(${entry.deg}^\\circ) = ${entry.sinTex}`
            ],
            explain: `<strong>Step 1:</strong> Locate \\(${entry.deg}^\\circ\\) on the unit circle.<br><br>` +
                     `<strong>Step 2:</strong> The y-coordinate at this angle gives \\(\\sin(${entry.deg}^\\circ)\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\sin(${entry.deg}^\\circ) = ${entry.sinTex}\\).`
        };
    },

    /**
     * 2. qExactCos - Easy (MC)
     * Find the exact value of cos(θ°). Avoids cos=0.
     */
    qExactCos() {
        const eligible = UNIT_CIRCLE.TABLE.filter(r => r.cosVal !== 0);
        const entry = MathUtils.pick(eligible);

        const allCosTex = [...new Set(UNIT_CIRCLE.TABLE.map(r => r.cosTex))];
        const distractorPool = allCosTex.filter(t => t !== entry.cosTex);

        const optionTexts = [entry.cosTex];
        const shuffledPool = MathUtils.shuffle(distractorPool);
        for (const t of shuffledPool) {
            if (optionTexts.length >= 4) break;
            optionTexts.push(t);
        }

        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }))
        );

        return {
            type: 'mc',
            rule: 'Exact Value of cos',
            difficulty: 'easy',
            text: `Find the exact value of \\(\\cos(${entry.deg}^\\circ)\\).`,
            latex: `\\(\\theta = ${entry.deg}^\\circ \\;(${entry.rad}\\text{ rad})\\)`,
            answer: 1,
            answerTex: entry.cosTex,
            options,
            hintTex: [
                `\\text{Recall the standard unit circle values.}`,
                `\\cos(${entry.deg}^\\circ) = ${entry.cosTex}`
            ],
            explain: `<strong>Step 1:</strong> Locate \\(${entry.deg}^\\circ\\) on the unit circle.<br><br>` +
                     `<strong>Step 2:</strong> The x-coordinate at this angle gives \\(\\cos(${entry.deg}^\\circ)\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\cos(${entry.deg}^\\circ) = ${entry.cosTex}\\).`
        };
    },

    /**
     * 3. qExactTan - Easy (MC)
     * Find the exact value of tan(θ°). Avoids undefined and tan=0.
     */
    qExactTan() {
        const eligible = UNIT_CIRCLE.TABLE.filter(r => r.tanDef && r.tanVal !== 0);
        const entry = MathUtils.pick(eligible);

        const allTanTex = [...new Set(
            UNIT_CIRCLE.TABLE.filter(r => r.tanDef).map(r => r.tanTex)
        )];
        const distractorPool = allTanTex.filter(t => t !== entry.tanTex);

        const optionTexts = [entry.tanTex];
        const shuffledPool = MathUtils.shuffle(distractorPool);
        for (const t of shuffledPool) {
            if (optionTexts.length >= 4) break;
            optionTexts.push(t);
        }

        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }))
        );

        return {
            type: 'mc',
            rule: 'Exact Value of tan',
            difficulty: 'easy',
            text: `Find the exact value of \\(\\tan(${entry.deg}^\\circ)\\).`,
            latex: `\\(\\theta = ${entry.deg}^\\circ \\;(${entry.rad}\\text{ rad})\\)`,
            answer: 1,
            answerTex: entry.tanTex,
            options,
            hintTex: [
                `\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}`,
                `\\tan(${entry.deg}^\\circ) = \\dfrac{${entry.sinTex}}{${entry.cosTex}} = ${entry.tanTex}`
            ],
            explain: `<strong>Step 1:</strong> Use \\(\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\tan(${entry.deg}^\\circ) = \\dfrac{${entry.sinTex}}{${entry.cosTex}}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\tan(${entry.deg}^\\circ) = ${entry.tanTex}\\).`
        };
    },

    /**
     * 4. qQuadrantSign - Easy (MC)
     * "In which quadrant is sin(θ) [positive/negative] and cos(θ) [positive/negative]?"
     */
    qQuadrantSign() {
        const combos = [
            { sinPos: true,  cosPos: true,  quadrant: 'I',   sinSign: 'positive', cosSign: 'positive' },
            { sinPos: true,  cosPos: false, quadrant: 'II',  sinSign: 'positive', cosSign: 'negative' },
            { sinPos: false, cosPos: false, quadrant: 'III', sinSign: 'negative', cosSign: 'negative' },
            { sinPos: false, cosPos: true,  quadrant: 'IV',  sinSign: 'negative', cosSign: 'positive' }
        ];
        const chosen = MathUtils.pick(combos);
        const allQuadrants = ['I', 'II', 'III', 'IV'];

        const optionTexts = [chosen.quadrant];
        for (const q of MathUtils.shuffle(allQuadrants.filter(q => q !== chosen.quadrant))) {
            if (optionTexts.length >= 4) break;
            optionTexts.push(q);
        }

        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex: `\\text{Quadrant } ${tex}` }))
        );

        return {
            type: 'mc',
            rule: 'Quadrant Signs',
            difficulty: 'easy',
            text: `In which quadrant is \\(\\sin\\theta\\) <strong>${chosen.sinSign}</strong> and \\(\\cos\\theta\\) <strong>${chosen.cosSign}</strong>?`,
            latex: `\\(\\sin\\theta ${chosen.sinPos ? '> 0' : '< 0'}, \\quad \\cos\\theta ${chosen.cosPos ? '> 0' : '< 0'}\\)`,
            answer: 1,
            answerTex: `\\text{Quadrant } ${chosen.quadrant}`,
            options,
            hintTex: [
                `\\text{CAST rule: Q1 all positive, Q2 sin positive, Q3 tan positive, Q4 cos positive.}`,
                `\\sin > 0 \\text{ in Q1, Q2}; \\quad \\cos > 0 \\text{ in Q1, Q4}`
            ],
            explain: `<strong>CAST diagram:</strong><br>` +
                     `<ul style="margin:8px 0 0 20px;">` +
                     `<li>Quadrant I: sin &gt; 0, cos &gt; 0</li>` +
                     `<li>Quadrant II: sin &gt; 0, cos &lt; 0</li>` +
                     `<li>Quadrant III: sin &lt; 0, cos &lt; 0</li>` +
                     `<li>Quadrant IV: sin &lt; 0, cos &gt; 0</li></ul><br>` +
                     `<strong>Answer:</strong> Quadrant ${chosen.quadrant} has \\(\\sin\\theta ${chosen.sinPos ? '> 0' : '< 0'}\\) and \\(\\cos\\theta ${chosen.cosPos ? '> 0' : '< 0'}\\).`
        };
    },

    /**
     * 5. qAngleFromValue - Medium (MC)
     * "Which angle(s) in [0°, 360°] satisfy sin(θ) = v (or cos(θ) = v)?"
     */
    qAngleFromValue() {
        const useSin = MathUtils.pick([true, false]);

        // Pick a value that appears in exactly 2 angles (avoid 0, ±1 which appear in 1 row each for sin/cos uniquely)
        let eligible;
        if (useSin) {
            // Values with exactly 2 matching rows
            eligible = UNIT_CIRCLE.TABLE.filter(r => {
                const count = UNIT_CIRCLE.TABLE.filter(s => Math.abs(s.sinVal - r.sinVal) < 1e-9).length;
                return count === 2 && r.sinVal !== 0;
            });
        } else {
            eligible = UNIT_CIRCLE.TABLE.filter(r => {
                const count = UNIT_CIRCLE.TABLE.filter(s => Math.abs(s.cosVal - r.cosVal) < 1e-9).length;
                return count === 2 && r.cosVal !== 0;
            });
        }

        const entry = MathUtils.pick(eligible);
        const targetVal = useSin ? entry.sinVal : entry.cosVal;
        const targetTex = useSin ? entry.sinTex : entry.cosTex;
        const fnName = useSin ? '\\sin' : '\\cos';

        // Find all angles with this value
        const matching = UNIT_CIRCLE.TABLE.filter(r =>
            Math.abs((useSin ? r.sinVal : r.cosVal) - targetVal) < 1e-9
        );
        const correctDegs = matching.map(r => r.deg).sort((a, b) => a - b);
        const correctTex = correctDegs.map(d => `${d}^\\circ`).join('\\text{ or }');

        // Distractors: pairs of angles that are wrong
        const allDegs = UNIT_CIRCLE.TABLE.map(r => r.deg).filter(d => !correctDegs.includes(d));
        const shuffledDegs = MathUtils.shuffle(allDegs);
        const distractors = [];
        // Pair up for display
        const wrongPairs = [];
        for (let i = 0; i + 1 < shuffledDegs.length && wrongPairs.length < 3; i += 2) {
            const pair = [shuffledDegs[i], shuffledDegs[i + 1]].sort((a, b) => a - b);
            wrongPairs.push(pair.map(d => `${d}^\\circ`).join('\\text{ or }'));
        }
        // Also add a single wrong angle in case pairs run out
        while (wrongPairs.length < 3) {
            wrongPairs.push(`${shuffledDegs[wrongPairs.length * 2]}^\\circ \\text{ or } ${shuffledDegs[wrongPairs.length * 2 + 1]}^\\circ`);
        }

        const optionTexts = [correctTex, ...wrongPairs.slice(0, 3)];
        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }))
        );

        return {
            type: 'mc',
            rule: 'Angle from Value',
            difficulty: 'medium',
            text: `Find all angles \\(\\theta\\) in \\([0^\\circ, 360^\\circ]\\) such that \\(${fnName}\\,\\theta = ${targetTex}\\).`,
            latex: `\\(${fnName}\\,\\theta = ${targetTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options,
            hintTex: [
                `\\text{Find the reference angle where } ${fnName}\\,\\alpha = |${targetTex}|`,
                `\\text{The sign of } ${targetTex} \\text{ tells you which quadrants to use.}`
            ],
            explain: `<strong>Step 1:</strong> Find the reference angle: \\(\\alpha\\) where \\(${fnName}\\,\\alpha = ${targetTex}\\) in the first quadrant.<br><br>` +
                     `<strong>Step 2:</strong> Determine which quadrants give the correct sign.<br><br>` +
                     `<strong>Answer:</strong> \\(${fnName}\\,\\theta = ${targetTex}\\) when \\(\\theta = ${correctTex}\\).`
        };
    },

    /**
     * 6. qPythagoreanIdentity - Easy (Free response)
     * Given sin(θ) = a/b, find cos²(θ) = 1 − sin²(θ). Answer to 4 d.p.
     */
    qPythagoreanIdentity() {
        const cases = [
            { sinFrac: '\\frac{3}{5}',  sinSq: 9/25,   cos2: 16/25,    cos2Tex: '\\frac{16}{25}',    cos2Val: 16/25   },
            { sinFrac: '\\frac{4}{5}',  sinSq: 16/25,  cos2: 9/25,     cos2Tex: '\\frac{9}{25}',     cos2Val: 9/25    },
            { sinFrac: '\\frac{5}{13}', sinSq: 25/169, cos2: 144/169,  cos2Tex: '\\frac{144}{169}',  cos2Val: 144/169 },
            { sinFrac: '\\frac{1}{2}',  sinSq: 1/4,    cos2: 3/4,      cos2Tex: '\\frac{3}{4}',      cos2Val: 3/4     },
            { sinFrac: '\\frac{2}{3}',  sinSq: 4/9,    cos2: 5/9,      cos2Tex: '\\frac{5}{9}',      cos2Val: 5/9     },
            { sinFrac: '\\frac{1}{3}',  sinSq: 1/9,    cos2: 8/9,      cos2Tex: '\\frac{8}{9}',      cos2Val: 8/9     }
        ];
        const c = MathUtils.pick(cases);
        const answerVal = parseFloat(c.cos2Val.toFixed(4));

        return {
            type: 'free',
            rule: 'Pythagorean Identity',
            difficulty: 'easy',
            text: `Given \\(\\sin\\theta = ${c.sinFrac}\\), use the identity \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) to find \\(\\cos^2\\theta\\).`,
            latex: `\\text{Give your answer as a decimal to 4 d.p.}`,
            answer: answerVal,
            answerTex: c.cos2Tex,
            options: [],
            hintTex: [
                `\\sin^2\\theta + \\cos^2\\theta = 1 \\implies \\cos^2\\theta = 1 - \\sin^2\\theta`,
                `\\cos^2\\theta = 1 - \\left(${c.sinFrac}\\right)^2 = 1 - ${c.sinSq.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Start with the Pythagorean identity: \\(\\sin^2\\theta + \\cos^2\\theta = 1\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange: \\(\\cos^2\\theta = 1 - \\sin^2\\theta\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(\\cos^2\\theta = 1 - \\left(${c.sinFrac}\\right)^2 = 1 - ${c.sinSq.toFixed(4)} = ${c.cos2Tex} \\approx ${answerVal.toFixed(4)}\\).`
        };
    },

    /**
     * 7. qNegativeAngle - Medium (MC)
     * sin(−θ) = −sin(θ) [odd]; cos(−θ) = cos(θ) [even]. Find the value.
     */
    qNegativeAngle() {
        const useSin = MathUtils.pick([true, false]);
        // Pick an angle from the first quadrant (non-trivial values)
        const firstQ = UNIT_CIRCLE.TABLE.filter(r => r.deg > 0 && r.deg < 90);
        const entry = MathUtils.pick(firstQ);
        const fnName = useSin ? '\\sin' : '\\cos';

        let correctTex, correctVal;
        if (useSin) {
            // sin(−θ) = −sin(θ)
            correctTex = entry.sinVal > 0 ? `-${entry.sinTex}` : entry.sinTex.replace('-', '');
            correctVal = -entry.sinVal;
        } else {
            // cos(−θ) = cos(θ)
            correctTex = entry.cosTex;
            correctVal = entry.cosVal;
        }

        // Build distractors from the table values for the same function
        const pool = useSin
            ? [...new Set(UNIT_CIRCLE.TABLE.map(r => r.sinTex))]
            : [...new Set(UNIT_CIRCLE.TABLE.map(r => r.cosTex))];
        const distractorPool = pool.filter(t => t !== correctTex);

        const optionTexts = [correctTex];
        for (const t of MathUtils.shuffle(distractorPool)) {
            if (optionTexts.length >= 4) break;
            optionTexts.push(t);
        }

        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }))
        );

        const identityName = useSin ? 'odd (\\sin(-\\theta) = -\\sin\\theta)' : 'even (\\cos(-\\theta) = \\cos\\theta)';

        return {
            type: 'mc',
            rule: 'Negative Angle Identity',
            difficulty: 'medium',
            text: `Find the exact value of \\(${fnName}(-${entry.deg}^\\circ)\\).`,
            latex: `\\text{Use the fact that } ${useSin ? '\\sin' : '\\cos'} \\text{ is an } ${useSin ? '\\text{odd}' : '\\text{even}'} \\text{ function.}`,
            answer: 1,
            answerTex: correctTex,
            options,
            hintTex: [
                useSin
                    ? `\\sin(-\\theta) = -\\sin(\\theta) \\quad \\text{(sine is an odd function)}`
                    : `\\cos(-\\theta) = \\cos(\\theta) \\quad \\text{(cosine is an even function)}`,
                useSin
                    ? `\\sin(-${entry.deg}^\\circ) = -\\sin(${entry.deg}^\\circ) = -(${entry.sinTex})`
                    : `\\cos(-${entry.deg}^\\circ) = \\cos(${entry.deg}^\\circ) = ${entry.cosTex}`
            ],
            explain: `<strong>Step 1:</strong> ` +
                     (useSin
                         ? `Sine is an <strong>odd</strong> function: \\(\\sin(-\\theta) = -\\sin(\\theta)\\).`
                         : `Cosine is an <strong>even</strong> function: \\(\\cos(-\\theta) = \\cos(\\theta)\\).`) +
                     `<br><br><strong>Step 2:</strong> Apply the identity:<br>` +
                     (useSin
                         ? `\\(\\sin(-${entry.deg}^\\circ) = -\\sin(${entry.deg}^\\circ) = -(${entry.sinTex}) = ${correctTex}\\).`
                         : `\\(\\cos(-${entry.deg}^\\circ) = \\cos(${entry.deg}^\\circ) = ${entry.cosTex}\\).`)
        };
    },

    /**
     * 8. qCofunction - Medium (MC)
     * sin(90° − θ) = cos(θ). Randomise the angle.
     */
    qCofunction() {
        // Pairs: sin(90−θ) = cos(θ), cos(90−θ) = sin(θ)
        const cofuncPairs = [
            { ask: '\\sin(90^\\circ - 60^\\circ)', equals: '\\cos(60^\\circ)', valueTex: '\\frac{1}{2}', val: 0.5 },
            { ask: '\\sin(90^\\circ - 30^\\circ)', equals: '\\cos(30^\\circ)', valueTex: '\\frac{\\sqrt{3}}{2}', val: Math.sqrt(3)/2 },
            { ask: '\\cos(90^\\circ - 60^\\circ)', equals: '\\sin(60^\\circ)', valueTex: '\\frac{\\sqrt{3}}{2}', val: Math.sqrt(3)/2 },
            { ask: '\\cos(90^\\circ - 30^\\circ)', equals: '\\sin(30^\\circ)', valueTex: '\\frac{1}{2}', val: 0.5 },
            { ask: '\\sin(90^\\circ - 45^\\circ)', equals: '\\cos(45^\\circ)', valueTex: '\\frac{\\sqrt{2}}{2}', val: Math.sqrt(2)/2 },
            { ask: '\\cos(90^\\circ - 45^\\circ)', equals: '\\sin(45^\\circ)', valueTex: '\\frac{\\sqrt{2}}{2}', val: Math.sqrt(2)/2 }
        ];
        const chosen = MathUtils.pick(cofuncPairs);

        // Distractors from common exact values
        const allTex = ['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{2}}{2}', '1', '0', '\\sqrt{3}', '\\frac{1}{\\sqrt{3}}'];
        const distractorPool = allTex.filter(t => t !== chosen.valueTex);

        const optionTexts = [chosen.valueTex];
        for (const t of MathUtils.shuffle(distractorPool)) {
            if (optionTexts.length >= 4) break;
            optionTexts.push(t);
        }

        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }))
        );

        return {
            type: 'mc',
            rule: 'Cofunction Identity',
            difficulty: 'medium',
            text: `Use the cofunction identity \\(\\sin(90^\\circ - \\theta) = \\cos(\\theta)\\) to find \\(${chosen.ask}\\).`,
            latex: `\\(${chosen.ask} = ${chosen.equals} = {?}\\)`,
            answer: 1,
            answerTex: chosen.valueTex,
            options,
            hintTex: [
                `\\sin(90^\\circ - \\theta) = \\cos(\\theta) \\quad \\cos(90^\\circ - \\theta) = \\sin(\\theta)`,
                `${chosen.ask} = ${chosen.equals} = ${chosen.valueTex}`
            ],
            explain: `<strong>Step 1:</strong> Apply the cofunction identity: \\(\\sin(90^\\circ - \\theta) = \\cos\\theta\\) and \\(\\cos(90^\\circ - \\theta) = \\sin\\theta\\).<br><br>` +
                     `<strong>Step 2:</strong> Rewrite: \\(${chosen.ask} = ${chosen.equals}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${chosen.equals} = ${chosen.valueTex}\\).`
        };
    },

    /**
     * 9. qReferenceAngle - Medium (Free response)
     * Find the reference angle for θ°. Answer is an integer (degrees).
     */
    qReferenceAngle() {
        const candidates = [
            { deg: 120, ref: 60,  quadrant: 'II',  formula: '180 - 120 = 60' },
            { deg: 135, ref: 45,  quadrant: 'II',  formula: '180 - 135 = 45' },
            { deg: 150, ref: 30,  quadrant: 'II',  formula: '180 - 150 = 30' },
            { deg: 210, ref: 30,  quadrant: 'III', formula: '210 - 180 = 30' },
            { deg: 225, ref: 45,  quadrant: 'III', formula: '225 - 180 = 45' },
            { deg: 240, ref: 60,  quadrant: 'III', formula: '240 - 180 = 60' },
            { deg: 300, ref: 60,  quadrant: 'IV',  formula: '360 - 300 = 60' },
            { deg: 315, ref: 45,  quadrant: 'IV',  formula: '360 - 315 = 45' },
            { deg: 330, ref: 30,  quadrant: 'IV',  formula: '360 - 330 = 30' }
        ];
        const c = MathUtils.pick(candidates);

        const formulaMap = {
            'II':  `180^\\circ - ${c.deg}^\\circ`,
            'III': `${c.deg}^\\circ - 180^\\circ`,
            'IV':  `360^\\circ - ${c.deg}^\\circ`
        };

        return {
            type: 'free',
            rule: 'Reference Angle',
            difficulty: 'medium',
            text: `Find the reference angle (in degrees) for \\(\\theta = ${c.deg}^\\circ\\).`,
            latex: `\\text{The reference angle is the acute angle to the nearest x-axis.}`,
            answer: c.ref,
            answerTex: `${c.ref}^\\circ`,
            options: [],
            hintTex: [
                `\\theta = ${c.deg}^\\circ \\text{ lies in Quadrant ${c.quadrant}.}`,
                `\\text{Reference angle} = ${formulaMap[c.quadrant]} = ${c.ref}^\\circ`
            ],
            explain: `<strong>Step 1:</strong> Identify the quadrant: \\(${c.deg}^\\circ\\) lies in Quadrant ${c.quadrant}.<br><br>` +
                     `<strong>Step 2:</strong> Use the reference angle formula for Quadrant ${c.quadrant}:<br>` +
                     `\\(\\alpha = ${formulaMap[c.quadrant]} = ${c.ref}^\\circ\\).<br><br>` +
                     `<strong>Answer:</strong> The reference angle is \\(${c.ref}^\\circ\\).`
        };
    },

    /**
     * 10. qPeriodicity - Hard (MC)
     * sin(θ + 360°) = sin(θ). Find sin(θ) for θ > 360°.
     */
    qPeriodicity() {
        const periodicCases = [
            { angle: 420,  reduced: 60,  fnName: '\\sin', valueTex: '\\frac{\\sqrt{3}}{2}', val: Math.sqrt(3)/2 },
            { angle: 390,  reduced: 30,  fnName: '\\sin', valueTex: '\\frac{1}{2}',          val: 0.5           },
            { angle: 480,  reduced: 120, fnName: '\\sin', valueTex: '\\frac{\\sqrt{3}}{2}', val: Math.sqrt(3)/2 },
            { angle: 510,  reduced: 150, fnName: '\\sin', valueTex: '\\frac{1}{2}',          val: 0.5           },
            { angle: 405,  reduced: 45,  fnName: '\\sin', valueTex: '\\frac{\\sqrt{2}}{2}', val: Math.sqrt(2)/2 },
            { angle: 450,  reduced: 90,  fnName: '\\sin', valueTex: '1',                     val: 1             },
            { angle: 420,  reduced: 60,  fnName: '\\cos', valueTex: '\\frac{1}{2}',          val: 0.5           },
            { angle: 450,  reduced: 90,  fnName: '\\cos', valueTex: '0',                     val: 0             },
            { angle: 480,  reduced: 120, fnName: '\\cos', valueTex: '-\\frac{1}{2}',         val: -0.5          },
            { angle: 495,  reduced: 135, fnName: '\\cos', valueTex: '-\\frac{\\sqrt{2}}{2}', val: -Math.sqrt(2)/2 }
        ];
        const chosen = MathUtils.pick(periodicCases);

        // Distractors: other exact values for the same function
        const pool = chosen.fnName === '\\sin'
            ? [...new Set(UNIT_CIRCLE.TABLE.map(r => r.sinTex))]
            : [...new Set(UNIT_CIRCLE.TABLE.map(r => r.cosTex))];
        const distractorPool = pool.filter(t => t !== chosen.valueTex);

        const optionTexts = [chosen.valueTex];
        for (const t of MathUtils.shuffle(distractorPool)) {
            if (optionTexts.length >= 4) break;
            optionTexts.push(t);
        }

        const options = MathUtils.shuffle(
            optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }))
        );

        const cycles = Math.floor((chosen.angle - chosen.reduced) / 360);
        const periodLabel = `${chosen.angle - cycles * 360}^\\circ`;

        return {
            type: 'mc',
            rule: 'Periodicity',
            difficulty: 'hard',
            text: `Use the periodicity of trigonometric functions to find \\(${chosen.fnName}(${chosen.angle}^\\circ)\\).`,
            latex: `\\(${chosen.fnName}(\\theta + 360^\\circ) = ${chosen.fnName}(\\theta)\\)`,
            answer: 1,
            answerTex: chosen.valueTex,
            options,
            hintTex: [
                `\\text{Subtract multiples of } 360^\\circ \\text{ to reduce the angle.}`,
                `${chosen.angle}^\\circ - ${cycles * 360}^\\circ = ${chosen.reduced}^\\circ \\implies ${chosen.fnName}(${chosen.angle}^\\circ) = ${chosen.fnName}(${chosen.reduced}^\\circ)`
            ],
            explain: `<strong>Step 1:</strong> Use the period of \\(360^\\circ\\): \\(${chosen.fnName}(\\theta + 360^\\circ) = ${chosen.fnName}(\\theta)\\).<br><br>` +
                     `<strong>Step 2:</strong> Reduce: \\(${chosen.angle}^\\circ - ${cycles * 360}^\\circ = ${chosen.reduced}^\\circ\\).<br><br>` +
                     `<strong>Step 3:</strong> Look up: \\(${chosen.fnName}(${chosen.reduced}^\\circ) = ${chosen.valueTex}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${chosen.fnName}(${chosen.angle}^\\circ) = ${chosen.valueTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => UNIT_CIRCLE.qExactSin(),            difficulty: 'easy',   weight: 3 },
            { fn: () => UNIT_CIRCLE.qExactCos(),            difficulty: 'easy',   weight: 3 },
            { fn: () => UNIT_CIRCLE.qExactTan(),            difficulty: 'easy',   weight: 3 },
            { fn: () => UNIT_CIRCLE.qQuadrantSign(),        difficulty: 'easy',   weight: 3 },
            { fn: () => UNIT_CIRCLE.qAngleFromValue(),      difficulty: 'medium', weight: 2 },
            { fn: () => UNIT_CIRCLE.qPythagoreanIdentity(), difficulty: 'easy',   weight: 3 },
            { fn: () => UNIT_CIRCLE.qNegativeAngle(),       difficulty: 'medium', weight: 2 },
            { fn: () => UNIT_CIRCLE.qCofunction(),          difficulty: 'medium', weight: 2 },
            { fn: () => UNIT_CIRCLE.qReferenceAngle(),      difficulty: 'medium', weight: 2 },
            { fn: () => UNIT_CIRCLE.qPeriodicity(),         difficulty: 'hard',   weight: 1 }
        ];

        let filtered = pool;
        if (UNIT_CIRCLE.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (UNIT_CIRCLE.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (UNIT_CIRCLE.level === 'hard') {
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
        UNIT_CIRCLE.score = 0;
        UNIT_CIRCLE.total = 0;
        UNIT_CIRCLE.streak = 0;
        UNIT_CIRCLE.answered = false;
        UNIT_CIRCLE.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="UNIT_CIRCLE.unload()">Unit Circle &amp; Exact Values (3.5)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Unit Circle &amp; Exact Values</h1>
                <p>IB Math AA 3.5 – Exact trig values and the unit circle</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="UNIT_CIRCLE.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="UNIT_CIRCLE.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="UNIT_CIRCLE.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="UNIT_CIRCLE.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="uc-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="uc-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="uc-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="uc-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="uc-question-card">
                <span class="rule-tag" id="uc-rule"></span>
                <span class="difficulty-tag" id="uc-difficulty"></span>
                <div class="question-text" id="uc-text"></div>
                <div class="question-prompt" id="uc-latex"></div>
                <div id="uc-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="uc-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="uc-feedback">
                <div class="feedback-title" id="uc-feedback-title"></div>
                <div class="feedback-explanation" id="uc-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="uc-hint-btn" onclick="UNIT_CIRCLE.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="uc-next-btn" onclick="UNIT_CIRCLE.next()" style="display:none;">Next Question</button>
            </div>
        `;

        UNIT_CIRCLE.next();
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
        UNIT_CIRCLE.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        UNIT_CIRCLE.score = 0;
        UNIT_CIRCLE.total = 0;
        UNIT_CIRCLE.streak = 0;
        UNIT_CIRCLE.updateStats();
        UNIT_CIRCLE.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        UNIT_CIRCLE.answered = false;
        UNIT_CIRCLE.hintIndex = 0;
        UNIT_CIRCLE.currentQ = UNIT_CIRCLE.pickQuestion();
        const q = UNIT_CIRCLE.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('uc-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('uc-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('uc-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('uc-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('uc-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="UNIT_CIRCLE.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="uc-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')UNIT_CIRCLE.checkFree()">
                    <button class="btn btn-primary" onclick="UNIT_CIRCLE.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('uc-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('uc-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('uc-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('uc-next-btn').style.display = 'none';
        document.getElementById('uc-hint-btn').style.display = '';
        document.getElementById('uc-hint-btn').disabled = false;

        // Render KaTeX
        UNIT_CIRCLE.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = UNIT_CIRCLE.currentQ;
        if (!q || !q.hintTex || UNIT_CIRCLE.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('uc-hint-box');
        const hintContent = UNIT_CIRCLE.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[UNIT_CIRCLE.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        UNIT_CIRCLE.hintIndex++;

        if (UNIT_CIRCLE.hintIndex >= q.hintTex.length) {
            document.getElementById('uc-hint-btn').disabled = true;
        }

        UNIT_CIRCLE.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (UNIT_CIRCLE.answered) return;
        UNIT_CIRCLE.answered = true;
        UNIT_CIRCLE.total++;

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
            UNIT_CIRCLE.score++;
            UNIT_CIRCLE.streak++;
        } else {
            btn.classList.add('incorrect');
            UNIT_CIRCLE.streak = 0;
        }

        UNIT_CIRCLE.showFeedback(isCorrect);
        UNIT_CIRCLE.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (UNIT_CIRCLE.answered) return;

        const inp = document.getElementById('uc-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        UNIT_CIRCLE.answered = true;
        UNIT_CIRCLE.total++;
        inp.disabled = true;

        const q = UNIT_CIRCLE.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            UNIT_CIRCLE.score++;
            UNIT_CIRCLE.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            UNIT_CIRCLE.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        UNIT_CIRCLE.showFeedback(isCorrect);
        UNIT_CIRCLE.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = UNIT_CIRCLE.currentQ;
        const fb = document.getElementById('uc-feedback');
        const title = document.getElementById('uc-feedback-title');
        const explanation = document.getElementById('uc-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (UNIT_CIRCLE.streak > 1) {
                title.textContent = `Correct! (${UNIT_CIRCLE.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('uc-next-btn').style.display = '';
        document.getElementById('uc-hint-btn').style.display = 'none';

        UNIT_CIRCLE.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('uc-score');
        const totalEl = document.getElementById('uc-total');
        const streakEl = document.getElementById('uc-streak');
        const accEl = document.getElementById('uc-accuracy');

        if (scoreEl) scoreEl.textContent = UNIT_CIRCLE.score;
        if (totalEl) totalEl.textContent = UNIT_CIRCLE.total;
        if (streakEl) streakEl.textContent = UNIT_CIRCLE.streak;
        if (accEl) {
            accEl.textContent = UNIT_CIRCLE.total > 0
                ? Math.round((UNIT_CIRCLE.score / UNIT_CIRCLE.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['unit-circle'] = () => UNIT_CIRCLE.load();
