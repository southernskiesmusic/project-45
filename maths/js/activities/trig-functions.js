/*
 * trig-functions.js - IB Math AA 3.7: Trigonometric Functions
 * Graphs, amplitude, period, phase shift, vertical shift, and transformations
 */

const TRIG_FUNC = {
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
     * 1. qAmplitude - Easy (Free)
     * Given f(x) = a·sin(bx) + d, find amplitude |a|.
     * a ∈ {±1, ±2, ±3, ±4, ±5}, b ∈ {1,2,3}, d ∈ {-3..3}
     */
    qAmplitude() {
        const aMag = MathUtils.randInt(1, 5);
        const a    = MathUtils.pick([1, -1]) * aMag;
        const b    = MathUtils.randInt(1, 3);
        const d    = MathUtils.randInt(-3, 3);
        const fn   = MathUtils.pick(['sin', 'cos']);
        const amplitude = aMag;

        // Format the function in LaTeX
        const aTex   = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bTex   = b === 1 ? '' : String(b);
        const dTex   = d === 0 ? '' : d > 0 ? ` + ${d}` : ` - ${Math.abs(d)}`;
        const fTex   = `f(x) = ${aTex}\\${fn}(${bTex}x)${dTex}`;

        return {
            type: 'free',
            rule: 'Amplitude',
            difficulty: 'easy',
            text: 'Find the amplitude of the function below.',
            latex: `\\(${fTex}\\)`,
            answer: amplitude,
            answerTex: String(amplitude),
            options: [],
            hintTex: [
                `\\text{Amplitude} = |a| \\text{ in } f(x) = a\\,${fn}(bx) + d`,
                `a = ${a}, \\quad |a| = ${amplitude}`
            ],
            explain: `<strong>Step 1:</strong> Identify the coefficient \\(a\\) in \\(f(x) = a\\,\\${fn}(${bTex}x)${dTex}\\): \\(a = ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> The amplitude is always non-negative: \\(|a| = |${a}| = ${amplitude}\\).<br><br>` +
                     `<strong>Note:</strong> The vertical shift \\(d${dTex === '' ? ' = 0' : ` = ${d}`}\\) does not affect the amplitude.`
        };
    },

    /**
     * 2. qPeriodSinCos - Easy (Free)
     * Given f(x) = a·sin(bx), find period = 2π/b.
     * b ∈ {1, 2, 3, 4}
     */
    qPeriodSinCos() {
        const b   = MathUtils.randInt(1, 4);
        const a   = MathUtils.randInt(1, 4);
        const fn  = MathUtils.pick(['sin', 'cos']);
        const period = (2 * Math.PI) / b;

        const aTex = a === 1 ? '' : String(a);
        const bTex = b === 1 ? '' : String(b);
        const fTex = `f(x) = ${aTex}\\${fn}(${bTex}x)`;

        // Human-readable exact form for the answer display
        let periodExactTex;
        if (b === 1) periodExactTex = '2\\pi';
        else         periodExactTex = `\\frac{2\\pi}{${b}}`;

        return {
            type: 'free',
            rule: 'Period (sin/cos)',
            difficulty: 'easy',
            text: 'Find the period of the function below. Give your answer to 4 decimal places.',
            latex: `\\(${fTex}\\)`,
            answer: period,
            answerTex: periodExactTex,
            options: [],
            hintTex: [
                `\\text{Period of } a\\,\\${fn}(bx) = \\frac{2\\pi}{b}`,
                `b = ${b}, \\quad T = \\frac{2\\pi}{${b}} \\approx ${period.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> The period formula for sine and cosine is \\(T = \\dfrac{2\\pi}{b}\\).<br><br>` +
                     `<strong>Step 2:</strong> Here \\(b = ${b}\\), so \\(T = \\dfrac{2\\pi}{${b}} = ${periodExactTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> As a decimal: \\(T \\approx ${period.toFixed(4)}\\).`
        };
    },

    /**
     * 3. qMaxValue - Easy (Free)
     * f(x) = a·sin(bx+c) + d. Max value = d + |a|.
     * a ∈ {1,2,3,4}, d ∈ {-2..4}
     */
    qMaxValue() {
        const a  = MathUtils.randInt(1, 4);
        const b  = MathUtils.randInt(1, 3);
        const c  = MathUtils.randInt(0, 3); // keep simple (no phase displayed in detail)
        const d  = MathUtils.randInt(-2, 4);
        const fn = MathUtils.pick(['sin', 'cos']);
        const maxVal = d + a;

        const aTex = a === 1 ? '' : String(a);
        const bTex = b === 1 ? '' : String(b);
        const cTex = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const dTex = d === 0 ? '' : d > 0 ? ` + ${d}` : ` - ${Math.abs(d)}`;
        const fTex = `f(x) = ${aTex}\\${fn}(${bTex}x${cTex})${dTex}`;

        return {
            type: 'free',
            rule: 'Maximum Value',
            difficulty: 'easy',
            text: 'Find the maximum value of the function below.',
            latex: `\\(${fTex}\\)`,
            answer: maxVal,
            answerTex: String(maxVal),
            options: [],
            hintTex: [
                `\\text{Max of } \\${fn} \\text{ is } 1, \\text{ so max of } a\\,\\${fn}(\\cdots) + d \\text{ is } |a| + d`,
                `|a| = ${a}, \\quad d = ${d}, \\quad \\text{max} = ${a} + ${d} = ${maxVal}`
            ],
            explain: `<strong>Step 1:</strong> The maximum value of \\(\\${fn}\\) is \\(1\\).<br><br>` +
                     `<strong>Step 2:</strong> So the maximum of \\(a\\,\\${fn}(\\cdots)\\) is \\(|a| = ${a}\\).<br><br>` +
                     `<strong>Step 3:</strong> Adding the vertical shift: \\(\\text{max} = |a| + d = ${a} + (${d}) = ${maxVal}\\).`
        };
    },

    /**
     * 4. qMinValue - Easy (Free)
     * f(x) = a·sin(bx) + d. Min value = d - |a|.
     */
    qMinValue() {
        const a  = MathUtils.randInt(1, 4);
        const b  = MathUtils.randInt(1, 3);
        const d  = MathUtils.randInt(-2, 4);
        const fn = MathUtils.pick(['sin', 'cos']);
        const minVal = d - a;

        const aTex = a === 1 ? '' : String(a);
        const bTex = b === 1 ? '' : String(b);
        const dTex = d === 0 ? '' : d > 0 ? ` + ${d}` : ` - ${Math.abs(d)}`;
        const fTex = `f(x) = ${aTex}\\${fn}(${bTex}x)${dTex}`;

        return {
            type: 'free',
            rule: 'Minimum Value',
            difficulty: 'easy',
            text: 'Find the minimum value of the function below.',
            latex: `\\(${fTex}\\)`,
            answer: minVal,
            answerTex: String(minVal),
            options: [],
            hintTex: [
                `\\text{Min of } \\${fn} \\text{ is } -1, \\text{ so min of } a\\,\\${fn}(\\cdots) + d \\text{ is } d - |a|`,
                `d = ${d}, \\quad |a| = ${a}, \\quad \\text{min} = ${d} - ${a} = ${minVal}`
            ],
            explain: `<strong>Step 1:</strong> The minimum value of \\(\\${fn}\\) is \\(-1\\).<br><br>` +
                     `<strong>Step 2:</strong> So the minimum of \\(a\\,\\${fn}(\\cdots)\\) is \\(-|a| = -${a}\\).<br><br>` +
                     `<strong>Step 3:</strong> Adding the vertical shift: \\(\\text{min} = d - |a| = ${d} - ${a} = ${minVal}\\).`
        };
    },

    /**
     * 5. qRange - Medium (MC)
     * f(x) = a·cos(bx) + d. Range = [d-|a|, d+|a|].
     * Give 4 MC options as interval strings.
     */
    qRange() {
        const a  = MathUtils.randInt(1, 5);
        const b  = MathUtils.randInt(1, 3);
        const d  = MathUtils.randInt(-3, 4);
        const fn = MathUtils.pick(['sin', 'cos']);

        const lo = d - a;
        const hi = d + a;

        const aTex = a === 1 ? '' : String(a);
        const bTex = b === 1 ? '' : String(b);
        const dTex = d === 0 ? '' : d > 0 ? ` + ${d}` : ` - ${Math.abs(d)}`;
        const fTex = `f(x) = ${aTex}\\${fn}(${bTex}x)${dTex}`;

        const correctTex = `[${lo},\\,${hi}]`;

        // Distractors
        const dist = [
            // Swapped: [hi, lo] (wrong order)
            `[${hi},\\,${lo}]`,
            // Forgot d: [-|a|, |a|]
            `[-${a},\\,${a}]`,
            // Used (d-2a, d+2a)
            `[${d - 2 * a},\\,${d + 2 * a}]`,
            // Used [lo-1, hi+1]
            `[${lo - 1},\\,${hi + 1}]`,
            // Used open brackets
            `(${lo},\\,${hi})`
        ];

        const optionTexts = [correctTex];
        let ai = 0;
        while (optionTexts.length < 4 && ai < dist.length) {
            if (!optionTexts.includes(dist[ai])) optionTexts.push(dist[ai]);
            ai++;
        }
        // Safety fallback
        while (optionTexts.length < 4) {
            const off = optionTexts.length;
            const cand = `[${lo - off},\\,${hi + off}]`;
            if (!optionTexts.includes(cand)) optionTexts.push(cand);
        }

        const options = optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Range',
            difficulty: 'medium',
            text: 'Select the range of the function below.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Range of } a\\,\\${fn}(bx) + d \\text{ is } [d - |a|,\\; d + |a|]`,
                `d = ${d},\\; |a| = ${a},\\; \\text{Range} = [${d} - ${a},\\; ${d} + ${a}] = [${lo},\\;${hi}]`
            ],
            explain: `<strong>Step 1:</strong> Since \\(-1 \\le \\${fn}(\\cdots) \\le 1\\), we have \\(-|a| \\le a\\,\\${fn}(\\cdots) \\le |a|\\).<br><br>` +
                     `<strong>Step 2:</strong> Add the vertical shift \\(d = ${d}\\):<br>` +
                     `\\(d - |a| \\le f(x) \\le d + |a|\\)<br>` +
                     `\\(${d} - ${a} \\le f(x) \\le ${d} + ${a}\\)<br>` +
                     `\\(${lo} \\le f(x) \\le ${hi}\\).<br><br>` +
                     `<strong>Answer:</strong> Range \\(= [${lo},\\,${hi}]\\).`
        };
    },

    /**
     * 6. qPeriodFromGraph - Medium (MC)
     * Given the period T described in words, find b in f(x) = sin(bx).
     * b = 2π/T.
     */
    qPeriodFromGraph() {
        // Curated (period, b, periodLabel, bLabel) pairs for clean display
        const cases = [
            { period: Math.PI,         bExact: 2,           periodTex: '\\pi',           bTex: '2'          },
            { period: 2 * Math.PI,     bExact: 1,           periodTex: '2\\pi',          bTex: '1'          },
            { period: Math.PI / 2,     bExact: 4,           periodTex: '\\dfrac{\\pi}{2}', bTex: '4'        },
            { period: 4 * Math.PI,     bExact: 0.5,         periodTex: '4\\pi',          bTex: '\\dfrac{1}{2}' },
            { period: 1,               bExact: 2 * Math.PI, periodTex: '1',              bTex: '2\\pi'      }
        ];

        const chosen = MathUtils.pick(cases);
        const { periodTex, bTex, bExact } = chosen;

        // Build 4 MC options — correct + distractors
        // Distractor pool: other b values from the set + variations
        const allBTex = cases.map(c => c.bTex);
        const distractTex = allBTex.filter(t => t !== bTex);

        const optionTexts = [bTex];
        for (const d of MathUtils.shuffle(distractTex)) {
            if (optionTexts.length >= 4) break;
            if (!optionTexts.includes(d)) optionTexts.push(d);
        }
        // Fill if still short (unlikely but safe)
        const extras = ['3', '\\dfrac{1}{4}', '\\pi', '\\dfrac{\\pi}{2}'];
        let ei = 0;
        while (optionTexts.length < 4) {
            if (!optionTexts.includes(extras[ei])) optionTexts.push(extras[ei]);
            ei++;
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Period from Graph',
            difficulty: 'medium',
            text: `A graph of \\(f(x) = \\sin(bx)\\) completes exactly one full cycle over \\(${periodTex}\\) units. Select the value of \\(b\\).`,
            latex: `\\(T = ${periodTex}\\)`,
            answer: 1,
            answerTex: bTex,
            options: shuffled,
            hintTex: [
                `b = \\frac{2\\pi}{T}`,
                `b = \\frac{2\\pi}{${periodTex}} = ${bTex}`
            ],
            explain: `<strong>Step 1:</strong> The period formula for \\(\\sin(bx)\\) is \\(T = \\dfrac{2\\pi}{b}\\), so \\(b = \\dfrac{2\\pi}{T}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(T = ${periodTex}\\):<br>` +
                     `\\(b = \\dfrac{2\\pi}{${periodTex}} = ${bTex}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(b = ${bTex}\\).`
        };
    },

    /**
     * 7. qPhaseShift - Medium (Free)
     * f(x) = sin(x - c). Phase shift = c (positive = right).
     * c ∈ {π/6, π/4, π/3, π/2}
     */
    qPhaseShift() {
        const phaseOptions = [
            { c: Math.PI / 6,  cTex: '\\dfrac{\\pi}{6}',  sign: '+', shift:  Math.PI / 6  },
            { c: Math.PI / 4,  cTex: '\\dfrac{\\pi}{4}',  sign: '+', shift:  Math.PI / 4  },
            { c: Math.PI / 3,  cTex: '\\dfrac{\\pi}{3}',  sign: '+', shift:  Math.PI / 3  },
            { c: Math.PI / 2,  cTex: '\\dfrac{\\pi}{2}',  sign: '+', shift:  Math.PI / 2  },
            { c: -Math.PI / 6, cTex: '\\dfrac{\\pi}{6}',  sign: '-', shift: -Math.PI / 6  },
            { c: -Math.PI / 4, cTex: '\\dfrac{\\pi}{4}',  sign: '-', shift: -Math.PI / 4  },
            { c: -Math.PI / 3, cTex: '\\dfrac{\\pi}{3}',  sign: '-', shift: -Math.PI / 3  },
            { c: -Math.PI / 2, cTex: '\\dfrac{\\pi}{2}',  sign: '-', shift: -Math.PI / 2  }
        ];

        const chosen = MathUtils.pick(phaseOptions);
        const { c, cTex, sign, shift } = chosen;
        const fn = MathUtils.pick(['sin', 'cos']);

        // f(x) = fn(x - c_raw)  where the raw shift c_raw makes the bracket (x ± |c|)
        // phase shift = -(-c_raw) / 1 = c_raw, but we want the displayed bracket form
        // We store: fTex shows f(x) = fn(x - c) with sign shown explicitly
        const bracketTex = sign === '+' ? `x - ${cTex}` : `x + ${cTex}`;
        const fTex = `f(x) = \\${fn}\\!\\left(${bracketTex}\\right)`;

        // Phase shift is the horizontal displacement: if bracket is (x - k), shift = k (right by k)
        // If bracket is (x + k), shift = -k (left by k)
        const phaseShiftVal = shift; // already signed correctly
        const dirWord = phaseShiftVal > 0 ? 'right' : 'left';
        const shiftDisplayTex = sign === '+' ? cTex : `-${cTex}`;

        return {
            type: 'free',
            rule: 'Phase Shift',
            difficulty: 'medium',
            text: `Find the phase shift of the function below. Give your answer to 4 decimal places (positive = right, negative = left).`,
            latex: `\\(${fTex}\\)`,
            answer: phaseShiftVal,
            answerTex: shiftDisplayTex,
            options: [],
            hintTex: [
                `\\text{Phase shift} = \\frac{-c}{b} \\text{ for } f(x) = \\${fn}(bx + c)`,
                `\\text{Here } b = 1,\\; c = ${sign === '+' ? '-' : '+'}{${cTex}}, \\text{ so shift} = ${shiftDisplayTex} \\approx ${phaseShiftVal.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Write the function as \\(f(x) = \\${fn}(bx + c)\\).<br>` +
                     `Here \\(b = 1\\) and the bracket is \\(${bracketTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Phase shift \\(= -\\dfrac{c}{b}\\). ` +
                     (sign === '+' ? `The bracket \\(x - ${cTex}\\) means \\(c = -${cTex}\\), so phase shift \\(= ${cTex} \\approx ${phaseShiftVal.toFixed(4)}\\) (right).`
                                  : `The bracket \\(x + ${cTex}\\) means \\(c = ${cTex}\\), so phase shift \\(= -${cTex} \\approx ${phaseShiftVal.toFixed(4)}\\) (left).`) +
                     `<br><br><strong>Answer:</strong> Phase shift \\(= ${shiftDisplayTex} \\approx ${phaseShiftVal.toFixed(4)}\\).`
        };
    },

    /**
     * 8. qEvaluateAtPoint - Medium (Free)
     * f(x) = a·sin(x) + d. Evaluate at x = π/6, π/4, π/3, π/2.
     * a ∈ {1,2,3}, d ∈ {0,1,2}
     */
    qEvaluateAtPoint() {
        const a  = MathUtils.randInt(1, 3);
        const d  = MathUtils.randInt(0, 2);
        const fn = MathUtils.pick(['sin', 'cos']);

        // Exact values table: [x label, x value, sin(x), cos(x)]
        const points = [
            { xTex: '\\dfrac{\\pi}{6}',  xVal: Math.PI / 6,  sinVal: 0.5,                    cosVal: Math.sqrt(3) / 2 },
            { xTex: '\\dfrac{\\pi}{4}',  xVal: Math.PI / 4,  sinVal: Math.sqrt(2) / 2,        cosVal: Math.sqrt(2) / 2 },
            { xTex: '\\dfrac{\\pi}{3}',  xVal: Math.PI / 3,  sinVal: Math.sqrt(3) / 2,        cosVal: 0.5              },
            { xTex: '\\dfrac{\\pi}{2}',  xVal: Math.PI / 2,  sinVal: 1,                       cosVal: 0                }
        ];

        const chosen = MathUtils.pick(points);
        const { xTex, sinVal, cosVal } = chosen;
        const trigVal = fn === 'sin' ? sinVal : cosVal;
        const result  = a * trigVal + d;

        const aTex = a === 1 ? '' : String(a);
        const dTex = d === 0 ? '' : ` + ${d}`;
        const fTex = `f(x) = ${aTex}\\${fn}(x)${dTex}`;

        // Exact sin/cos label for explanation
        const exactTex = fn === 'sin'
            ? (chosen.xTex === '\\dfrac{\\pi}{6}' ? '\\dfrac{1}{2}'
            :  chosen.xTex === '\\dfrac{\\pi}{4}' ? '\\dfrac{\\sqrt{2}}{2}'
            :  chosen.xTex === '\\dfrac{\\pi}{3}' ? '\\dfrac{\\sqrt{3}}{2}'
            :                                        '1')
            : (chosen.xTex === '\\dfrac{\\pi}{6}' ? '\\dfrac{\\sqrt{3}}{2}'
            :  chosen.xTex === '\\dfrac{\\pi}{4}' ? '\\dfrac{\\sqrt{2}}{2}'
            :  chosen.xTex === '\\dfrac{\\pi}{3}' ? '\\dfrac{1}{2}'
            :                                        '0');

        return {
            type: 'free',
            rule: 'Evaluate at Point',
            difficulty: 'medium',
            text: `Evaluate the function below at \\(x = ${xTex}\\). Give your answer to 4 decimal places.`,
            latex: `\\(${fTex}\\)`,
            answer: result,
            answerTex: `${a === 1 ? '' : a}\\cdot ${exactTex} + ${d} = ${result.toFixed(4)}`,
            options: [],
            hintTex: [
                `\\${fn}\\!\\left(${xTex}\\right) = ${exactTex}`,
                `f\\!\\left(${xTex}\\right) = ${aTex !== '' ? aTex : '1'} \\times ${exactTex} + ${d}`
            ],
            explain: `<strong>Step 1:</strong> Recall the exact value \\(\\${fn}\\!\\left(${xTex}\\right) = ${exactTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute into \\(${fTex}\\):<br>` +
                     `\\(f\\!\\left(${xTex}\\right) = ${a} \\times ${exactTex} + ${d}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(= ${result.toFixed(4)}\\).`
        };
    },

    /**
     * 9. qVerticalShift - Easy (Free)
     * f(x) = 2·cos(3x) + d. Given max value M, find d.
     * d = M - 2. M ∈ {3,4,5,6,7,8}.
     */
    qVerticalShift() {
        const maxM = MathUtils.randInt(3, 8);
        const d    = maxM - 2; // amplitude is fixed at 2

        return {
            type: 'free',
            rule: 'Vertical Shift',
            difficulty: 'easy',
            text: `The function \\(f(x) = 2\\cos(3x) + d\\) has a maximum value of \\(${maxM}\\). Find \\(d\\).`,
            latex: `\\(f(x) = 2\\cos(3x) + d, \\quad \\text{max} = ${maxM}\\)`,
            answer: d,
            answerTex: String(d),
            options: [],
            hintTex: [
                `\\text{Max value} = |a| + d = 2 + d`,
                `2 + d = ${maxM} \\implies d = ${maxM} - 2 = ${d}`
            ],
            explain: `<strong>Step 1:</strong> The maximum of \\(2\\cos(3x)\\) is \\(|a| = 2\\) (when \\(\\cos = 1\\)).<br><br>` +
                     `<strong>Step 2:</strong> Adding the vertical shift: \\(\\text{max} = 2 + d\\).<br><br>` +
                     `<strong>Step 3:</strong> Set equal to \\(${maxM}\\) and solve:<br>` +
                     `\\(2 + d = ${maxM}\\)<br>` +
                     `\\(d = ${maxM} - 2 = ${d}\\).`
        };
    },

    /**
     * 10. qIdentifyEquation - Hard (MC)
     * Given amplitude A, period T, vertical shift d (and sin/cos), which equation matches?
     * Compute b = 2π/T. 4 MC options.
     */
    qIdentifyEquation() {
        // Curated clean configurations: (A, T, d, fn)
        const configs = [
            { A: 2, b: 1,   d:  1, fn: 'sin' },
            { A: 3, b: 2,   d:  0, fn: 'cos' },
            { A: 1, b: 4,   d:  2, fn: 'sin' },
            { A: 4, b: 1,   d: -1, fn: 'cos' },
            { A: 2, b: 3,   d:  2, fn: 'sin' },
            { A: 5, b: 2,   d:  0, fn: 'cos' },
            { A: 3, b: 1,   d: -2, fn: 'sin' },
            { A: 2, b: 4,   d:  3, fn: 'cos' }
        ];

        const cfg = MathUtils.pick(configs);
        const { A, b, d, fn } = cfg;
        const T = (2 * Math.PI) / b;

        function fmtEq(aa, bb, dd, ffn) {
            const aTex = aa === 1 ? '' : aa === -1 ? '-' : String(aa);
            const bTex = bb === 1 ? '' : String(bb);
            const dTex = dd === 0 ? '' : dd > 0 ? ` + ${dd}` : ` - ${Math.abs(dd)}`;
            return `f(x) = ${aTex}\\${ffn}(${bTex}x)${dTex}`;
        }

        const correctTex = fmtEq(A, b, d, fn);

        // Build distractors: vary A, b, d, or fn
        const otherFn = fn === 'sin' ? 'cos' : 'sin';
        const distractors = [
            fmtEq(A + 1, b,     d,     fn),      // wrong amplitude
            fmtEq(A,     b + 1, d,     fn),      // wrong b (wrong period)
            fmtEq(A,     b,     d + 2, fn),      // wrong vertical shift
            fmtEq(A,     b,     d,     otherFn), // wrong function
            fmtEq(A,     b,     d - 2, fn),      // another wrong shift
            fmtEq(A - 1 < 1 ? A + 2 : A - 1, b, d, fn) // another amplitude variant
        ];

        const optionTexts = [correctTex];
        for (const d_ of MathUtils.shuffle(distractors)) {
            if (optionTexts.length >= 4) break;
            if (!optionTexts.includes(d_)) optionTexts.push(d_);
        }
        // Safety fill
        let fi = 1;
        while (optionTexts.length < 4) {
            const cand = fmtEq(A + fi, b + fi, d, fn);
            if (!optionTexts.includes(cand)) optionTexts.push(cand);
            fi++;
        }

        const options = optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        // Period label
        let TPretty;
        if (b === 1)  TPretty = '2\\pi';
        else if (b === 2) TPretty = '\\pi';
        else if (b === 4) TPretty = '\\dfrac{\\pi}{2}';
        else TPretty = `\\dfrac{2\\pi}{${b}}`;

        return {
            type: 'mc',
            rule: 'Identify Equation',
            difficulty: 'hard',
            text: `A sinusoidal function has amplitude \\(${A}\\), period \\(${TPretty}\\), and vertical shift \\(${d}\\). Which equation matches?`,
            latex: `\\(A = ${A},\\quad T = ${TPretty},\\quad d = ${d}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `b = \\frac{2\\pi}{T} = \\frac{2\\pi}{${TPretty}} = ${b}`,
                `f(x) = A\\,\\${fn}(bx) + d = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Find \\(b\\) from the period: \\(b = \\dfrac{2\\pi}{T} = \\dfrac{2\\pi}{${TPretty}} = ${b}\\).<br><br>` +
                     `<strong>Step 2:</strong> The amplitude is \\(|a| = ${A}\\), so \\(a = ${A}\\).<br><br>` +
                     `<strong>Step 3:</strong> The vertical shift is \\(d = ${d}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => TRIG_FUNC.qAmplitude(),        weight: 3, diff: 'easy'   },
            { fn: () => TRIG_FUNC.qPeriodSinCos(),     weight: 3, diff: 'easy'   },
            { fn: () => TRIG_FUNC.qMaxValue(),         weight: 3, diff: 'easy'   },
            { fn: () => TRIG_FUNC.qMinValue(),         weight: 3, diff: 'easy'   },
            { fn: () => TRIG_FUNC.qRange(),            weight: 2, diff: 'medium' },
            { fn: () => TRIG_FUNC.qPeriodFromGraph(),  weight: 2, diff: 'medium' },
            { fn: () => TRIG_FUNC.qPhaseShift(),       weight: 2, diff: 'medium' },
            { fn: () => TRIG_FUNC.qEvaluateAtPoint(),  weight: 2, diff: 'medium' },
            { fn: () => TRIG_FUNC.qVerticalShift(),    weight: 3, diff: 'easy'   },
            { fn: () => TRIG_FUNC.qIdentifyEquation(), weight: 1, diff: 'hard'   }
        ];

        let filtered = pool;
        if (TRIG_FUNC.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (TRIG_FUNC.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (TRIG_FUNC.level === 'hard') {
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
        TRIG_FUNC.score    = 0;
        TRIG_FUNC.total    = 0;
        TRIG_FUNC.streak   = 0;
        TRIG_FUNC.answered = false;
        TRIG_FUNC.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="TRIG_FUNC.unload()">Trigonometric Functions (3.7)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Trigonometric Functions</h1>
                <p>IB Math AA 3.7 – Graphs, amplitude, period, and transformations</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="TRIG_FUNC.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="TRIG_FUNC.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="TRIG_FUNC.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="TRIG_FUNC.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="trf-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="trf-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="trf-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="trf-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="trf-question-card">
                <span class="rule-tag"       id="trf-rule"></span>
                <span class="difficulty-tag" id="trf-difficulty"></span>
                <div class="question-text"   id="trf-text"></div>
                <div class="question-prompt" id="trf-latex"></div>
                <div id="trf-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="trf-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="trf-feedback">
                <div class="feedback-title"       id="trf-feedback-title"></div>
                <div class="feedback-explanation" id="trf-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="trf-hint-btn"  onclick="TRIG_FUNC.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="trf-next-btn" onclick="TRIG_FUNC.next()" style="display:none;">Next Question</button>
            </div>
        `;

        TRIG_FUNC.next();
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
        TRIG_FUNC.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        TRIG_FUNC.score  = 0;
        TRIG_FUNC.total  = 0;
        TRIG_FUNC.streak = 0;
        TRIG_FUNC.updateStats();
        TRIG_FUNC.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        TRIG_FUNC.answered  = false;
        TRIG_FUNC.hintIndex = 0;
        TRIG_FUNC.currentQ  = TRIG_FUNC.pickQuestion();
        const q = TRIG_FUNC.currentQ;

        // Rule tag
        document.getElementById('trf-rule').textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('trf-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('trf-text').innerHTML  = q.text;
        document.getElementById('trf-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('trf-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="TRIG_FUNC.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="trf-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')TRIG_FUNC.checkFree()">
                    <button class="btn btn-primary" onclick="TRIG_FUNC.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('trf-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Reset hint/feedback/next
        const hintBox = document.getElementById('trf-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('trf-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('trf-next-btn').style.display = 'none';
        document.getElementById('trf-hint-btn').style.display = '';
        document.getElementById('trf-hint-btn').disabled = false;

        TRIG_FUNC.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = TRIG_FUNC.currentQ;
        if (!q || !q.hintTex || TRIG_FUNC.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('trf-hint-box');
        const prev = TRIG_FUNC.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[TRIG_FUNC.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        TRIG_FUNC.hintIndex++;

        if (TRIG_FUNC.hintIndex >= q.hintTex.length) {
            document.getElementById('trf-hint-btn').disabled = true;
        }

        TRIG_FUNC.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (TRIG_FUNC.answered) return;
        TRIG_FUNC.answered = true;
        TRIG_FUNC.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });

        if (isCorrect) {
            btn.classList.add('correct');
            TRIG_FUNC.score++;
            TRIG_FUNC.streak++;
        } else {
            btn.classList.add('incorrect');
            TRIG_FUNC.streak = 0;
        }

        TRIG_FUNC.showFeedback(isCorrect);
        TRIG_FUNC.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (TRIG_FUNC.answered) return;

        const inp = document.getElementById('trf-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        TRIG_FUNC.answered = true;
        TRIG_FUNC.total++;
        inp.disabled = true;

        const q = TRIG_FUNC.currentQ;
        const tol = 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor    = 'var(--success)';
            inp.style.background     = 'var(--success-light)';
            TRIG_FUNC.score++;
            TRIG_FUNC.streak++;
        } else {
            inp.style.borderColor    = 'var(--error)';
            inp.style.background     = 'var(--error-light)';
            TRIG_FUNC.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        TRIG_FUNC.showFeedback(isCorrect);
        TRIG_FUNC.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q   = TRIG_FUNC.currentQ;
        const fb  = document.getElementById('trf-feedback');
        const ttl = document.getElementById('trf-feedback-title');
        const exp = document.getElementById('trf-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            ttl.textContent = TRIG_FUNC.streak > 1
                ? `Correct! (${TRIG_FUNC.streak} streak)`
                : 'Correct!';
        } else {
            ttl.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        exp.innerHTML = q.explain;

        document.getElementById('trf-next-btn').style.display = '';
        document.getElementById('trf-hint-btn').style.display = 'none';

        TRIG_FUNC.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('trf-score');
        const totalEl  = document.getElementById('trf-total');
        const streakEl = document.getElementById('trf-streak');
        const accEl    = document.getElementById('trf-accuracy');

        if (scoreEl)  scoreEl.textContent  = TRIG_FUNC.score;
        if (totalEl)  totalEl.textContent  = TRIG_FUNC.total;
        if (streakEl) streakEl.textContent = TRIG_FUNC.streak;
        if (accEl) {
            accEl.textContent = TRIG_FUNC.total > 0
                ? Math.round((TRIG_FUNC.score / TRIG_FUNC.total) * 100) + '%'
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
                        { left: '\\(', right: '\\)',  display: false },
                        { left: '\\[', right: '\\]',  display: true  },
                        { left: '$$',  right: '$$',   display: true  },
                        { left: '$',   right: '$',    display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['trig-functions'] = () => TRIG_FUNC.load();
