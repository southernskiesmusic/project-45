/*
 * graph-of-f.js - IB Math AA 5.7: Graph of f from f'
 * Sketching and interpreting f from f' — stationary points, monotonicity,
 * concavity, inflection, global max/min.
 */

const GRAPH_F = {
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
     * 1. qSignFPrime - Easy (MC)
     * f(x) = ax² + bx + c → f'(x) = 2ax + b.
     * Given specific p, is f'(p) positive, negative, or zero?
     */
    qSignFPrime() {
        // f(x) = ax² + bx + c, f'(x) = 2ax + b
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        const p = MathUtils.randInt(-5, 5);

        const fpVal = 2 * a * p + b;

        // Determine correct answer category
        let correctIndex; // 0=Positive, 1=Negative, 2=Zero
        let correctTex;
        if (fpVal > 0) {
            correctIndex = 0;
            correctTex = '\\text{Positive (}f\\text{ increasing)}';
        } else if (fpVal < 0) {
            correctIndex = 1;
            correctTex = '\\text{Negative (}f\\text{ decreasing)}';
        } else {
            correctIndex = 2;
            correctTex = '\\text{Zero (stationary point)}';
        }

        const allOptions = [
            { value: fpVal > 0 ? 1 : 0, tex: '\\text{Positive (}f\\text{ increasing)}' },
            { value: fpVal < 0 ? 1 : 0, tex: '\\text{Negative (}f\\text{ decreasing)}' },
            { value: fpVal === 0 ? 1 : 0, tex: '\\text{Zero (stationary point)}' },
            { value: 0, tex: '\\text{Cannot determine}' }
        ];

        const shuffled = MathUtils.shuffle(allOptions);

        // Build a nice display for f and f'
        const aSign = a < 0 ? '-' : '';
        const absA = Math.abs(a);
        const aTex = absA === 1 ? `${aSign}` : `${aSign}${absA}`;
        const bPart = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
        const fTex = `f(x) = ${aTex}x^2${bPart}x + c`;

        const twoA = 2 * a;
        const twoATex = twoA === 1 ? '' : twoA === -1 ? '-' : String(twoA);
        const bPartFP = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
        const fpTex = `f'(x) = ${twoATex}x${bPartFP}`;

        const fpAtP = 2 * a * p + b;

        return {
            type: 'mc',
            rule: 'Sign of f\'',
            difficulty: 'easy',
            text: `Given \\(${fTex}\\), determine the sign of \\(f'(${p})\\).`,
            latex: `\\(${fpTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `f'(x) = 2ax + b = ${twoATex}x${bPartFP}`,
                `f'(${p}) = ${twoA}(${p}) + ${b} = ${twoA * p} + ${b} = ${fpAtP}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(${fpTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${p}\\):<br>` +
                     `\\(f'(${p}) = ${twoA}(${p}) + ${b} = ${twoA * p} + ${b} = ${fpAtP}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since \\(f'(${p}) = ${fpAtP}\\) is ` +
                     (fpAtP > 0 ? `<strong>positive</strong>, \\(f\\) is <strong>increasing</strong> at \\(x = ${p}\\).` :
                      fpAtP < 0 ? `<strong>negative</strong>, \\(f\\) is <strong>decreasing</strong> at \\(x = ${p}\\).` :
                                  `<strong>zero</strong>, \\(x = ${p}\\) is a <strong>stationary point</strong>.`)
        };
    },

    /**
     * 2. qMonotonyFromFPrime - Easy (MC)
     * f'(x) = a(x - r1)(x - r2), a > 0, r1 < r2.
     * On which interval is f decreasing?
     */
    qMonotonyFromFPrime() {
        const a = MathUtils.randInt(1, 3); // a > 0
        let r1 = MathUtils.randInt(-5, 2);
        let r2;
        do { r2 = MathUtils.randInt(r1 + 1, 6); } while (r2 === r1);

        // f'(x) = a(x-r1)(x-r2) > 0 outside (r1,r2), < 0 inside → f decreasing on (r1,r2)
        const correctTex = `(${r1},\\,${r2})`;

        // Distractors
        const d1 = `(-\\infty,\\,${r1})`;             // increasing interval (left)
        const d2 = `(${r2},\\,+\\infty)`;             // increasing interval (right)
        const d3 = `(-\\infty,\\,${r1}) \\cup (${r2},\\,+\\infty)`; // increasing region

        const optionTexts = [correctTex, d1, d2, d3];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        const aTex = a === 1 ? '' : String(a);
        const fpTex = `f'(x) = ${aTex}(x - ${r1})(x - ${r2})`;

        return {
            type: 'mc',
            rule: 'Monotonicity from f\'',
            difficulty: 'easy',
            text: `The derivative of \\(f\\) is \\(${fpTex}\\) where \\(a = ${a} > 0\\). On which interval is \\(f\\) <strong>decreasing</strong>?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Since } a > 0, \\; f'(x) < 0 \\text{ between the roots}`,
                `f'(x) < 0 \\text{ for } ${r1} < x < ${r2} \\implies f \\text{ decreasing on } (${r1}, ${r2})`
            ],
            explain: `<strong>Step 1:</strong> The roots of \\(f'\\) are \\(x = ${r1}\\) and \\(x = ${r2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Since the leading coefficient \\(a = ${a} > 0\\), the parabola \\(f'(x)\\) opens upward.<br><br>` +
                     `<strong>Step 3:</strong> \\(f'(x) < 0\\) <em>between</em> the roots, i.e. for \\(${r1} < x < ${r2}\\).<br><br>` +
                     `<strong>Conclusion:</strong> \\(f\\) is decreasing on \\((${r1},\\,${r2})\\).`
        };
    },

    /**
     * 3. qStationaryNature - Medium (MC)
     * Given a sign chart of f', classify the stationary point at x = p.
     */
    qStationaryNature() {
        // Randomly choose pattern: +→- (local max), -→+ (local min), +→+ or -→- (inflection)
        const patterns = [
            { left: '+', right: '-', nature: 'local max',       tex: '\\text{Local maximum}',     explain: 'f\' changes from positive to negative → local maximum.' },
            { left: '-', right: '+', nature: 'local min',       tex: '\\text{Local minimum}',     explain: 'f\' changes from negative to positive → local minimum.' },
            { left: '+', right: '+', nature: 'inflection',      tex: '\\text{Inflection point}',  explain: 'f\' does not change sign → inflection point (not a local extremum).' },
            { left: '-', right: '-', nature: 'inflection',      tex: '\\text{Inflection point}',  explain: 'f\' does not change sign → inflection point (not a local extremum).' }
        ];

        const chosen = MathUtils.pick(patterns);
        const p = MathUtils.randInt(-4, 4);

        const optionTexts = [
            { value: chosen.nature === 'local max' ? 1 : 0,  tex: '\\text{Local maximum}' },
            { value: chosen.nature === 'local min' ? 1 : 0,  tex: '\\text{Local minimum}' },
            { value: chosen.nature === 'inflection' ? 1 : 0, tex: '\\text{Inflection point (no extremum)}' },
            { value: 0, tex: '\\text{Cannot classify — more info needed}' }
        ];

        // Ensure exactly one correct option
        const shuffled = MathUtils.shuffle(optionTexts);

        const signChartHTML =
            `<table style="border-collapse:collapse;margin:12px auto;font-size:1rem;">` +
            `<tr><td style="padding:4px 10px;border:1px solid #ccc;">\\(x\\)</td>` +
            `<td style="padding:4px 10px;border:1px solid #ccc;">\\(x < ${p}\\)</td>` +
            `<td style="padding:4px 10px;border:1px solid #ccc;">\\(x = ${p}\\)</td>` +
            `<td style="padding:4px 10px;border:1px solid #ccc;">\\(x > ${p}\\)</td></tr>` +
            `<tr><td style="padding:4px 10px;border:1px solid #ccc;">\\(f'(x)\\)</td>` +
            `<td style="padding:4px 10px;border:1px solid #ccc;color:${chosen.left === '+' ? 'green' : 'red'};">\\(${chosen.left}\\)</td>` +
            `<td style="padding:4px 10px;border:1px solid #ccc;">\\(0\\)</td>` +
            `<td style="padding:4px 10px;border:1px solid #ccc;color:${chosen.right === '+' ? 'green' : 'red'};">\\(${chosen.right}\\)</td></tr>` +
            `</table>`;

        return {
            type: 'mc',
            rule: 'Nature of Stationary Point',
            difficulty: 'medium',
            text: `The sign chart below shows the behaviour of \\(f'(x)\\) near \\(x = ${p}\\). Classify the stationary point.`,
            latex: signChartHTML,
            answer: 1,
            answerTex: chosen.tex,
            options: shuffled,
            hintTex: [
                `\\text{If } f' \\text{ changes } + \\to - \\text{: local max; } - \\to + \\text{: local min}`,
                `\\text{If } f' \\text{ does NOT change sign: inflection point (not an extremum)}`
            ],
            explain: `<strong>First derivative test at \\(x = ${p}\\):</strong><br><br>` +
                     `\\(f'\\) is \\(${chosen.left}\\) to the left and \\(${chosen.right}\\) to the right of \\(x = ${p}\\).<br><br>` +
                     `<strong>Rule:</strong> ${chosen.explain}<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${p}\\) is a <strong>${chosen.nature}</strong>.`
        };
    },

    /**
     * 4. qFPrimeZero - Easy (Free response)
     * f(x) = ax² + bx + c. Find x where f'(x) = 0.
     * Choose b divisible by 2a so answer is integer.
     */
    qFPrimeZero() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        // x = -b/(2a) must be integer → b = -2a * k for some integer k
        const k = MathUtils.randInt(-4, 4);
        const b = -2 * a * k; // ensures x* = k
        const c = MathUtils.randInt(-8, 8);
        const xStar = k; // = -b/(2a)

        const twoA = 2 * a;
        const twoATex = twoA === 1 ? '' : twoA === -1 ? '-' : String(twoA);
        const bPart = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
        const fpTex = `f'(x) = ${twoATex}x${bPart}`;

        const aDisplay = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bPartF = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
        const cPartF = c === 0 ? '' : (c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`);
        const fTex = `f(x) = ${aDisplay}x^2${bPartF}${cPartF}`;

        return {
            type: 'free',
            rule: 'Stationary x from f\'',
            difficulty: 'easy',
            text: `Find the value of \\(x\\) where \\(f'(x) = 0\\) for the function below.`,
            latex: `\\(${fTex}\\)`,
            answer: xStar,
            answerTex: String(xStar),
            options: [],
            hintTex: [
                `f'(x) = ${fpTex} = 0`,
                `${twoA}x = ${-b} \\implies x = \\frac{${-b}}{${twoA}} = ${xStar}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(${fpTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Set \\(f'(x) = 0\\):<br>` +
                     `\\(${twoA}x + ${b} = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(${twoA}x = ${-b}\\), so \\(x = \\frac{${-b}}{${twoA}} = ${xStar}\\).`
        };
    },

    /**
     * 5. qConcavityFromFDoublePrime - Medium (MC)
     * f''(p) = 6ap + 2b. Is f concave up or down at x = p?
     */
    qConcavityFromFDoublePrime() {
        // f(x) = ax³ + bx² + cx + d  →  f''(x) = 6ax + 2b
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-6, 6);
        const p = MathUtils.randInt(-4, 4);

        const fppVal = 6 * a * p + 2 * b;

        let correctTex;
        if (fppVal > 0) {
            correctTex = `\\text{Concave up} \\;(f'' > 0)`;
        } else if (fppVal < 0) {
            correctTex = `\\text{Concave down} \\;(f'' < 0)`;
        } else {
            correctTex = `\\text{Possible inflection point} \\;(f'' = 0)`;
        }

        const sixA = 6 * a;
        const twoB = 2 * b;
        const sixATex = sixA === 1 ? '' : sixA === -1 ? '-' : String(sixA);
        const twoBPart = twoB === 0 ? '' : (twoB > 0 ? ` + ${twoB}` : ` - ${Math.abs(twoB)}`);
        const fppTex = `f''(x) = ${sixATex}x${twoBPart}`;

        const options = [
            { value: fppVal > 0 ? 1 : 0,  tex: `\\text{Concave up} \\;(f'' > 0)` },
            { value: fppVal < 0 ? 1 : 0,  tex: `\\text{Concave down} \\;(f'' < 0)` },
            { value: fppVal === 0 ? 1 : 0, tex: `\\text{Possible inflection point} \\;(f'' = 0)` },
            { value: 0, tex: `\\text{Cannot determine without more information}` }
        ];

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Concavity from f\'\'',
            difficulty: 'medium',
            text: `For \\(f(x) = ${a}x^3 + ${b}x^2 + cx + d\\), determine the concavity of \\(f\\) at \\(x = ${p}\\).`,
            latex: `\\(${fppTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `f''(x) = 6ax + 2b = ${fppTex}`,
                `f''(${p}) = ${sixA}(${p}) + ${twoB} = ${sixA * p} + ${twoB} = ${fppVal}`
            ],
            explain: `<strong>Step 1:</strong> The second derivative is \\(${fppTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate at \\(x = ${p}\\):<br>` +
                     `\\(f''(${p}) = ${sixA}(${p}) + ${twoB} = ${sixA * p} + ${twoB} = ${fppVal}\\).<br><br>` +
                     `<strong>Step 3:</strong> ` +
                     (fppVal > 0 ? `Since \\(f''(${p}) = ${fppVal} > 0\\), the curve is <strong>concave up</strong> at \\(x = ${p}\\).` :
                      fppVal < 0 ? `Since \\(f''(${p}) = ${fppVal} < 0\\), the curve is <strong>concave down</strong> at \\(x = ${p}\\).` :
                                   `Since \\(f''(${p}) = 0\\), this is a <strong>possible inflection point</strong> (verify sign change of \\(f''\\)).`)
        };
    },

    /**
     * 6. qInflectionFromFPrime - Medium (MC)
     * Inflection of f ↔ local extremum of f' ↔ f'' = 0.
     * f'(x) = 3ax² + 2bx + c → inflection at x = -2b/(6a) = -b/(3a).
     * Choose b divisible by 3a.
     */
    qInflectionFromFPrime() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        // x_inf = -b/(3a) must be integer → b = -3a * k
        const k = MathUtils.randInt(-3, 3);
        const b = -3 * a * k; // inflection at x = k
        const c = MathUtils.randInt(-6, 6);
        const xInf = k;

        const threeA = 3 * a;
        const twoB = 2 * b;
        const threeATex = threeA === 1 ? '' : threeA === -1 ? '-' : String(threeA);
        const twoBPart = twoB === 0 ? '' : (twoB > 0 ? ` + ${twoB}x` : ` - ${Math.abs(twoB)}x`);
        const cPart = c === 0 ? '' : (c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`);
        const fpTex = `f'(x) = ${threeATex}x^2${twoBPart}${cPart}`;

        // Distractors: other plausible x-values
        const d1 = xInf + MathUtils.nonZeroRandInt(-2, 2);
        const d2 = xInf + MathUtils.nonZeroRandInt(-3, 3) * (d1 === xInf + 1 ? 2 : 1);
        const d3 = -xInf; // reflection about origin, often tempting

        const rawOptions = [xInf, d1, d2 === xInf || d2 === d1 ? xInf + 3 : d2, d3 === xInf || d3 === d1 || d3 === d2 ? xInf - 3 : d3];

        // Deduplicate
        const seen = new Set();
        const unique = [];
        for (const v of rawOptions) {
            if (!seen.has(v)) { seen.add(v); unique.push(v); }
        }
        while (unique.length < 4) unique.push(xInf + unique.length + 5);

        const options = unique.slice(0, 4).map((v, i) => ({
            value: v === xInf ? 1 : 0,
            tex: `x = ${v}`
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Inflection from f\'',
            difficulty: 'medium',
            text: `Given \\(${fpTex}\\), find the x-coordinate of the <strong>inflection point</strong> of \\(f\\).`,
            latex: `\\text{Inflection of } f \\text{ occurs where } f' \\text{ has a local extremum (i.e. } f'' = 0\\text{)}`,
            answer: 1,
            answerTex: `x = ${xInf}`,
            options: shuffled,
            hintTex: [
                `f''(x) = ${2 * threeA}x + ${twoB} = 0`,
                `x = \\frac{${-twoB}}{${2 * threeA}} = ${xInf}`
            ],
            explain: `<strong>Step 1:</strong> An inflection point of \\(f\\) occurs where \\(f''(x) = 0\\) (and \\(f''\\) changes sign).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate \\(f'\\) to get \\(f''\\):<br>` +
                     `\\(f''(x) = ${2 * threeA}x + ${twoB}\\).<br><br>` +
                     `<strong>Step 3:</strong> Set \\(f''(x) = 0\\):<br>` +
                     `\\(${2 * threeA}x + ${twoB} = 0 \\implies x = \\frac{${-twoB}}{${2 * threeA}} = ${xInf}\\).<br><br>` +
                     `<strong>Answer:</strong> The inflection point of \\(f\\) is at \\(x = ${xInf}\\).`
        };
    },

    /**
     * 7. qGlobalMaxOnInterval - Medium (Free response)
     * f(x) = ax³ + bx² + cx on [0, n]. Evaluate at endpoints and critical point.
     * Carefully constructed so there is exactly one critical point in the interval.
     */
    qGlobalMaxOnInterval() {
        // Strategy: pick critical point xc in (1, n-1), design f so f'(xc)=0 cleanly
        // f(x) = ax³ + bx² + cx, f'(x) = 3ax² + 2bx + c
        // Use factored form: f'(x) = 3a(x - xc)(x - x2) with x2 outside [0,n]

        const n = MathUtils.randInt(4, 7);
        const xc = MathUtils.randInt(1, n - 1); // critical point in interior

        // Choose x2 < 0 so only xc is in [0,n]
        const x2 = MathUtils.randInt(-4, -1);

        const aCoeff = MathUtils.pick([1, -1]); // leading sign
        // f'(x) = 3a(x - xc)(x - x2)
        // expand: f'(x) = 3a[x² - (xc+x2)x + xc*x2]
        // so 3a·coef: 3a·1 = 3a, 3a·(-(xc+x2)) = -3a(xc+x2), 3a·xc*x2
        // f'(x) = 3a·x² - 3a(xc+x2)·x + 3a·xc·x2
        // Compare to f'(x) = 3Ax² + 2Bx + C:
        //   A = a,  2B = -3a(xc+x2) → B = -3a(xc+x2)/2,  C = 3a·xc·x2
        // For B to be integer: need 3a(xc+x2) even → xc+x2 even (since a is ±1, 3 is odd)
        // Adjust: if xc+x2 is odd, shift x2 by ±1
        let x2Adj = x2;
        if ((xc + x2Adj) % 2 !== 0) x2Adj -= 1;
        if (x2Adj >= 0) x2Adj = -1;

        const A = aCoeff;
        const B = Math.round(-3 * aCoeff * (xc + x2Adj) / 2);
        const C = 3 * aCoeff * xc * x2Adj;

        // f(x) = Ax³ + Bx² + Cx (no constant term for simplicity)
        function fVal(x) { return A * x * x * x + B * x * x + C * x; }

        const f0 = fVal(0);
        const fn = fVal(n);
        const fxc = fVal(xc);

        const globalMax = Math.max(f0, fn, fxc);

        // Format f(x) display
        const ATex = A === 1 ? '' : A === -1 ? '-' : String(A);
        const BPart = B === 0 ? '' : (B > 0 ? ` + ${B}x^2` : ` - ${Math.abs(B)}x^2`);
        const CPart = C === 0 ? '' : (C > 0 ? ` + ${C}x` : ` - ${Math.abs(C)}x`);
        const fTex = `f(x) = ${ATex}x^3${BPart}${CPart}`;

        return {
            type: 'free',
            rule: 'Global Max on Interval',
            difficulty: 'medium',
            text: `Find the <strong>global maximum value</strong> of \\(f\\) on \\([0,\\,${n}]\\).`,
            latex: `\\(${fTex}\\)`,
            answer: globalMax,
            answerTex: String(globalMax),
            options: [],
            hintTex: [
                `\\text{Find critical points: } f'(x) = 0 \\text{ in } [0, ${n}]`,
                `\\text{Compare } f(0) = ${f0}, \\; f(${xc}) = ${fxc}, \\; f(${n}) = ${fn}`
            ],
            explain: `<strong>Step 1:</strong> Find \\(f'(x) = ${3 * A}x^2 + ${2 * B}x + ${C}\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve \\(f'(x) = 0\\): critical point at \\(x = ${xc}\\) (in \\([0,${n}]\\)).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at endpoints and critical point:<br>` +
                     `\\(f(0) = ${f0}\\), \\quad \\(f(${xc}) = ${fxc}\\), \\quad \\(f(${n}) = ${fn}\\).<br><br>` +
                     `<strong>Step 4:</strong> The global maximum value is \\(\\mathbf{${globalMax}}\\).`
        };
    },

    /**
     * 8. qFIncreasingCount - Medium (MC)
     * f'(x) = a(x - r1)(x - r2). How many stationary points in [0, 10]?
     */
    qFIncreasingCount() {
        // Choose roots: both in [0,10], one in, or neither in
        const scenario = MathUtils.pick(['both', 'one', 'none']);
        let r1, r2;

        if (scenario === 'both') {
            r1 = MathUtils.randInt(1, 4);
            r2 = MathUtils.randInt(r1 + 1, 9);
        } else if (scenario === 'one') {
            r1 = MathUtils.randInt(1, 9);
            r2 = MathUtils.randInt(11, 15);
        } else {
            r1 = MathUtils.randInt(-8, -1);
            r2 = MathUtils.randInt(11, 18);
        }

        const correctCount = scenario === 'both' ? 2 : scenario === 'one' ? 1 : 0;
        const a = MathUtils.nonZeroRandInt(1, 3);
        const aTex = a === 1 ? '' : String(a);
        const fpTex = `f'(x) = ${aTex}(x - ${r1})(x - ${r2})`;

        const options = [
            { value: correctCount === 0 ? 1 : 0, tex: '0' },
            { value: correctCount === 1 ? 1 : 0, tex: '1' },
            { value: correctCount === 2 ? 1 : 0, tex: '2' },
            { value: 0, tex: '3' }
        ];
        const shuffled = MathUtils.shuffle(options);

        const inInterval = (r) => r >= 0 && r <= 10;

        return {
            type: 'mc',
            rule: 'Count Stationary Points',
            difficulty: 'medium',
            text: `Given \\(${fpTex}\\), how many stationary points does \\(f\\) have in the interval \\([0,\\,10]\\)?`,
            latex: '',
            answer: 1,
            answerTex: String(correctCount),
            options: shuffled,
            hintTex: [
                `\\text{Stationary points occur where } f'(x) = 0`,
                `\\text{Roots of } f' \\text{ are } x = ${r1} \\text{ and } x = ${r2}. \\text{ Which are in } [0, 10]?`
            ],
            explain: `<strong>Step 1:</strong> Set \\(f'(x) = 0\\): roots are \\(x = ${r1}\\) and \\(x = ${r2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Check which roots lie in \\([0, 10]\\):<br>` +
                     `\\(x = ${r1}\\): ${inInterval(r1) ? 'inside ✓' : 'outside ✗'}<br>` +
                     `\\(x = ${r2}\\): ${inInterval(r2) ? 'inside ✓' : 'outside ✗'}<br><br>` +
                     `<strong>Answer:</strong> There ${correctCount === 1 ? 'is' : 'are'} <strong>${correctCount}</strong> stationary point${correctCount !== 1 ? 's' : ''} in \\([0, 10]\\).`
        };
    },

    /**
     * 9. qSketchBehavior - Hard (MC)
     * Interpret qualitative description of f' to describe f near x = p.
     * Various scenarios randomised: local max, local min, inflection.
     */
    qSketchBehavior() {
        const p = MathUtils.randInt(-4, 4);

        const scenarios = [
            {
                desc: `\\(f'(x) > 0\\) for \\(x < ${p}\\), \\quad f'(${p}) = 0, \\quad f'(x) < 0\\) for \\(x > ${p}\\)`,
                correct: `\\text{Has a local maximum at } x = ${p}`,
                correctShort: 'local max',
                distractors: [
                    `\\text{Has a local minimum at } x = ${p}`,
                    `\\text{Has an inflection point at } x = ${p}`,
                    `\\text{Is always increasing near } x = ${p}`
                ],
                explain: `\\(f'\\) changes from <strong>positive to negative</strong> → \\(f\\) increases then decreases → <strong>local maximum</strong> at \\(x = ${p}\\).`
            },
            {
                desc: `\\(f'(x) < 0\\) for \\(x < ${p}\\), \\quad f'(${p}) = 0, \\quad f'(x) > 0\\) for \\(x > ${p}\\)`,
                correct: `\\text{Has a local minimum at } x = ${p}`,
                correctShort: 'local min',
                distractors: [
                    `\\text{Has a local maximum at } x = ${p}`,
                    `\\text{Has an inflection point at } x = ${p}`,
                    `\\text{Is always decreasing near } x = ${p}`
                ],
                explain: `\\(f'\\) changes from <strong>negative to positive</strong> → \\(f\\) decreases then increases → <strong>local minimum</strong> at \\(x = ${p}\\).`
            },
            {
                desc: `\\(f'(x) > 0\\) for \\(x < ${p}\\), \\quad f'(${p}) = 0, \\quad f'(x) > 0\\) for \\(x > ${p}\\)`,
                correct: `\\text{Has an inflection point at } x = ${p} \\text{ (not an extremum)}`,
                correctShort: 'inflection',
                distractors: [
                    `\\text{Has a local maximum at } x = ${p}`,
                    `\\text{Has a local minimum at } x = ${p}`,
                    `\\text{Has a cusp at } x = ${p}`
                ],
                explain: `\\(f'\\) does <strong>not change sign</strong> (positive on both sides) → \\(f\\) is increasing throughout → <strong>inflection point</strong>, not an extremum.`
            }
        ];

        const s = MathUtils.pick(scenarios);

        const options = [
            { value: 1, tex: s.correct },
            ...s.distractors.map(d => ({ value: 0, tex: d }))
        ];
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Sketch Behaviour from f\'',
            difficulty: 'hard',
            text: `Based on the derivative information below, what can you conclude about \\(f\\) near \\(x = ${p}\\)?`,
            latex: s.desc,
            answer: 1,
            answerTex: s.correct,
            options: shuffled,
            hintTex: [
                `\\text{Apply the first derivative test: check the sign of } f' \\text{ either side of } x = ${p}`,
                `\\text{Sign change } +\\to-: \\text{max} \\quad -\\to+: \\text{min} \\quad \\text{no change: inflection}`
            ],
            explain: `<strong>First Derivative Test at \\(x = ${p}\\):</strong><br><br>` +
                     s.explain + `<br><br>` +
                     `<strong>Answer:</strong> \\(f\\) ` + s.correct.replace(/\\text\{/g, '').replace(/\}/g, '') + `.`
        };
    },

    /**
     * 10. qFValueFromIntegral - Hard (Free response)
     * Given f'(x) = 2ax + b and f(x₀) = y₀, find f(x₁).
     * f(x) = ax² + bx + C. Solve for C, then evaluate at x₁.
     */
    qFValueFromIntegral() {
        // Choose a, b, x0, y0 so that C = y0 - a*x0² - b*x0 is integer
        // and f(x1) = a*x1² + b*x1 + C is integer
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-5, 5);
        const x0 = MathUtils.randInt(-4, 4);
        const C = MathUtils.randInt(-8, 8); // pick C first, derive y0
        const y0 = a * x0 * x0 + b * x0 + C;

        // Choose x1 ≠ x0
        let x1;
        do { x1 = MathUtils.randInt(-4, 4); } while (x1 === x0);

        const y1 = a * x1 * x1 + b * x1 + C;

        // f'(x) display
        const twoA = 2 * a;
        const twoATex = twoA === 1 ? '' : twoA === -1 ? '-' : String(twoA);
        const bPart = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
        const fpTex = `f'(x) = ${twoATex}x${bPart}`;

        // f(x) display (with +C)
        const aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        const bPartF = b === 0 ? '' : (b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`);
        const fTex = `f(x) = ${aTex}x^2${bPartF} + C`;

        const CCalc = y0 - a * x0 * x0 - b * x0;

        return {
            type: 'free',
            rule: 'f from f\' and Initial Value',
            difficulty: 'hard',
            text: `Given \\(${fpTex}\\) and \\(f(${x0}) = ${y0}\\), find \\(f(${x1})\\).`,
            latex: '',
            answer: y1,
            answerTex: String(y1),
            options: [],
            hintTex: [
                `\\text{Integrate: } f(x) = ${aTex}x^2${bPartF} + C`,
                `\\text{Use } f(${x0}) = ${y0} \\text{ to find } C: \\quad C = ${y0} - ${a}(${x0})^2 - ${b}(${x0}) = ${CCalc}`
            ],
            explain: `<strong>Step 1:</strong> Integrate \\(f'(x)\\) to get \\(${fTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use the condition \\(f(${x0}) = ${y0}\\):<br>` +
                     `\\(${y0} = ${a}(${x0})^2 + ${b}(${x0}) + C\\)<br>` +
                     `\\(${y0} = ${a * x0 * x0} + ${b * x0} + C\\)<br>` +
                     `\\(C = ${y0} - ${a * x0 * x0 + b * x0} = ${CCalc}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(x = ${x1}\\):<br>` +
                     `\\(f(${x1}) = ${a}(${x1})^2 + ${b}(${x1}) + ${CCalc}\\)<br>` +
                     `\\(= ${a * x1 * x1} + ${b * x1} + ${CCalc} = ${y1}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f(${x1}) = ${y1}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => GRAPH_F.qSignFPrime(),               weight: 3, difficulty: 'easy'   },
            { fn: () => GRAPH_F.qMonotonyFromFPrime(),        weight: 3, difficulty: 'easy'   },
            { fn: () => GRAPH_F.qStationaryNature(),          weight: 2, difficulty: 'medium' },
            { fn: () => GRAPH_F.qFPrimeZero(),                weight: 3, difficulty: 'easy'   },
            { fn: () => GRAPH_F.qConcavityFromFDoublePrime(), weight: 2, difficulty: 'medium' },
            { fn: () => GRAPH_F.qInflectionFromFPrime(),      weight: 2, difficulty: 'medium' },
            { fn: () => GRAPH_F.qGlobalMaxOnInterval(),       weight: 2, difficulty: 'medium' },
            { fn: () => GRAPH_F.qFIncreasingCount(),          weight: 2, difficulty: 'medium' },
            { fn: () => GRAPH_F.qSketchBehavior(),            weight: 1, difficulty: 'hard'   },
            { fn: () => GRAPH_F.qFValueFromIntegral(),        weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (GRAPH_F.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (GRAPH_F.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (GRAPH_F.level === 'hard') {
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
        GRAPH_F.score = 0;
        GRAPH_F.total = 0;
        GRAPH_F.streak = 0;
        GRAPH_F.answered = false;
        GRAPH_F.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="GRAPH_F.unload()">Graph of f from f\u2032 (5.7)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Graph of f from f\u2032</h1>
                <p>IB Math AA 5.7 \u2013 Reading behaviour from the derivative</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="GRAPH_F.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="GRAPH_F.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="GRAPH_F.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="GRAPH_F.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="grf-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="grf-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="grf-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="grf-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="grf-question-card">
                <span class="rule-tag"       id="grf-rule"></span>
                <span class="difficulty-tag" id="grf-difficulty"></span>
                <div class="question-text"   id="grf-text"></div>
                <div class="question-prompt" id="grf-latex"></div>
                <div id="grf-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="grf-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="grf-feedback">
                <div class="feedback-title"       id="grf-feedback-title"></div>
                <div class="feedback-explanation" id="grf-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="grf-hint-btn" onclick="GRAPH_F.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="grf-next-btn" onclick="GRAPH_F.next()" style="display:none;">Next Question</button>
            </div>
        `;

        GRAPH_F.next();
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
        GRAPH_F.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        GRAPH_F.score = 0;
        GRAPH_F.total = 0;
        GRAPH_F.streak = 0;
        GRAPH_F.updateStats();
        GRAPH_F.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        GRAPH_F.answered = false;
        GRAPH_F.hintIndex = 0;
        GRAPH_F.currentQ = GRAPH_F.pickQuestion();
        const q = GRAPH_F.currentQ;

        // Rule tag
        document.getElementById('grf-rule').textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('grf-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('grf-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('grf-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('grf-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="GRAPH_F.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="grf-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')GRAPH_F.checkFree()">
                    <button class="btn btn-primary" onclick="GRAPH_F.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('grf-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint / feedback / next
        const hintBox = document.getElementById('grf-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('grf-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('grf-next-btn').style.display = 'none';
        document.getElementById('grf-hint-btn').style.display = '';
        document.getElementById('grf-hint-btn').disabled = false;

        // Render KaTeX
        GRAPH_F.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = GRAPH_F.currentQ;
        if (!q || !q.hintTex || GRAPH_F.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('grf-hint-box');
        const hintContent = GRAPH_F.hintIndex === 0
            ? ''
            : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[GRAPH_F.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        GRAPH_F.hintIndex++;

        if (GRAPH_F.hintIndex >= q.hintTex.length) {
            document.getElementById('grf-hint-btn').disabled = true;
        }

        GRAPH_F.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (GRAPH_F.answered) return;
        GRAPH_F.answered = true;
        GRAPH_F.total++;

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
            GRAPH_F.score++;
            GRAPH_F.streak++;
        } else {
            btn.classList.add('incorrect');
            GRAPH_F.streak = 0;
        }

        GRAPH_F.showFeedback(isCorrect);
        GRAPH_F.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (GRAPH_F.answered) return;

        const inp = document.getElementById('grf-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        GRAPH_F.answered = true;
        GRAPH_F.total++;
        inp.disabled = true;

        const q = GRAPH_F.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            GRAPH_F.score++;
            GRAPH_F.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            GRAPH_F.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        GRAPH_F.showFeedback(isCorrect);
        GRAPH_F.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = GRAPH_F.currentQ;
        const fb    = document.getElementById('grf-feedback');
        const title = document.getElementById('grf-feedback-title');
        const explanation = document.getElementById('grf-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = GRAPH_F.streak > 1
                ? `Correct! (${GRAPH_F.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('grf-next-btn').style.display = '';
        document.getElementById('grf-hint-btn').style.display = 'none';

        GRAPH_F.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('grf-score');
        const totalEl  = document.getElementById('grf-total');
        const streakEl = document.getElementById('grf-streak');
        const accEl    = document.getElementById('grf-accuracy');

        if (scoreEl)  scoreEl.textContent  = GRAPH_F.score;
        if (totalEl)  totalEl.textContent  = GRAPH_F.total;
        if (streakEl) streakEl.textContent = GRAPH_F.streak;
        if (accEl) {
            accEl.textContent = GRAPH_F.total > 0
                ? Math.round((GRAPH_F.score / GRAPH_F.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['graph-of-f'] = () => GRAPH_F.load();
