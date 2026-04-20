/*
 * domain-range.js - IB Math AA 2.3: Functions, Domain & Range
 * Evaluate f(x), find domain restrictions, find range, number of solutions
 */

const DOMAIN_RANGE = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qEvaluate - Easy (Free)
     * Evaluate f(x) at a given point.
     */
    qEvaluate() {
        const type = MathUtils.pick(['linear', 'quadratic', 'cubic']);
        const x0 = MathUtils.randInt(-5, 5);
        let fTex, answer;

        if (type === 'linear') {
            const a = MathUtils.nonZeroRandInt(-5, 5);
            const b = MathUtils.randInt(-8, 8);
            fTex = `f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}`;
            answer = a * x0 + b;
        } else if (type === 'quadratic') {
            const a = MathUtils.pick([1, -1, 2]);
            const b = MathUtils.randInt(-4, 4);
            const c = MathUtils.randInt(-5, 5);
            const aTex = a === 1 ? '' : a === -1 ? '-' : `${a}`;
            const bTex = b === 0 ? '' : b > 0 ? ` + ${b === 1 ? '' : b}x` : ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;
            const cTex = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
            fTex = `f(x) = ${aTex}x^2${bTex}${cTex}`;
            answer = a * x0 * x0 + b * x0 + c;
        } else {
            const a = MathUtils.pick([1, -1]);
            const c = MathUtils.randInt(-5, 5);
            const aTex = a === 1 ? '' : '-';
            const cTex = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
            fTex = `f(x) = ${aTex}x^3${cTex}`;
            answer = a * x0 * x0 * x0 + c;
        }

        return {
            type: 'free',
            rule: 'Evaluate f(x)',
            difficulty: 'easy',
            text: `Given \\(${fTex}\\), find \\(f(${x0})\\).`,
            latex: '',
            answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } x = ${x0} \\text{ into the function}`,
                `f(${x0}) = ${answer}`
            ],
            explain: `<strong>Substitute \\(x = ${x0}\\)</strong> directly into \\(${fTex}\\) and compute:<br><br>\\(f(${x0}) = ${answer}\\).`
        };
    },

    /**
     * 2. qDomainSqrt - Easy (MC)
     * Find the domain of f(x) = sqrt(linear expression).
     */
    qDomainSqrt() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-8, 8);
        // sqrt(ax + b) requires ax + b >= 0
        // x >= -b/a (if a > 0) or x <= -b/a (if a < 0)
        const [n, d] = MathUtils.simplifyFraction(-b, a);
        const threshold = n / d;
        const threshTex = MathUtils.fractionTeX(-b, a);

        const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
        const bStr = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `f(x) = \\sqrt{${aStr}x${bStr}}`;

        let correctTex, d1, d2, d3;
        if (a > 0) {
            correctTex = `x \\geq ${threshTex}`;
            d1 = `x \\leq ${threshTex}`;
            d2 = `x > ${threshTex}`;
            d3 = `x \\geq ${-Math.round(threshold)}`;
        } else {
            correctTex = `x \\leq ${threshTex}`;
            d1 = `x \\geq ${threshTex}`;
            d2 = `x < ${threshTex}`;
            d3 = `x \\leq ${Math.round(-threshold)}`;
        }

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: d1 },
            { value: 0, tex: d2 },
            { value: 0, tex: d3 }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = `x \\geq ${threshTex} + ${off}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Domain of √',
            difficulty: 'easy',
            text: 'Find the domain of the function.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Expression under } \\sqrt{} \\text{ must be } \\geq 0`,
                `${aStr}x${bStr} \\geq 0 \\Rightarrow ${correctTex}`
            ],
            explain: `<strong>Rule:</strong> The expression under a square root must be \\(\\geq 0\\).<br><br>` +
                     `<strong>Inequality:</strong> \\(${aStr}x${bStr} \\geq 0\\).<br><br>` +
                     `<strong>Solve:</strong> \\(${a}x \\geq ${-b}\\), so \\(${correctTex}\\).`
        };
    },

    /**
     * 3. qDomainFraction - Easy (MC)
     * Find the domain of f(x) = 1 / (x - a) or similar.
     */
    qDomainFraction() {
        const a = MathUtils.randInt(-6, 6);
        // f(x) = 1 / (x - a), domain: x ≠ a
        const fTex = `f(x) = \\dfrac{1}{x ${a >= 0 ? '- ' + a : '+ ' + Math.abs(a)}}`;

        const correctTex = `x \\neq ${a}`;
        const options = [
            { value: 1, tex: `x \\in \\mathbb{R}, \\; x \\neq ${a}` },
            { value: 0, tex: `x > ${a}` },
            { value: 0, tex: `x \\neq ${-a}` },
            { value: 0, tex: `x \\in \\mathbb{R}` }
        ];

        return {
            type: 'mc',
            rule: 'Domain of Fraction',
            difficulty: 'easy',
            text: 'Find the domain of the function.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: `x \\in \\mathbb{R}, \\; x \\neq ${a}`,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{The denominator cannot equal zero}`,
                `x - ${a} \\neq 0 \\Rightarrow x \\neq ${a}`
            ],
            explain: `<strong>Rule:</strong> Division by zero is undefined.<br><br>` +
                     `<strong>Set denominator ≠ 0:</strong> \\(x - ${a} \\neq 0 \\Rightarrow x \\neq ${a}\\).<br><br>` +
                     `<strong>Domain:</strong> \\(x \\in \\mathbb{R},\\; x \\neq ${a}\\).`
        };
    },

    /**
     * 4. qDomainLog - Medium (MC)
     * Find the domain of f(x) = ln(ax + b).
     */
    qDomainLog() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-8, 8);
        // ln(ax + b): ax + b > 0 (strict inequality)
        const [n, d] = MathUtils.simplifyFraction(-b, a);
        const threshold = n / d;
        const threshTex = MathUtils.fractionTeX(-b, a);

        const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
        const bStr = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `f(x) = \\ln(${aStr}x${bStr})`;

        let correctTex, d1, d2, d3;
        if (a > 0) {
            correctTex = `x > ${threshTex}`;
            d1 = `x \\geq ${threshTex}`;
            d2 = `x < ${threshTex}`;
            d3 = `x \\neq ${threshTex}`;
        } else {
            correctTex = `x < ${threshTex}`;
            d1 = `x \\leq ${threshTex}`;
            d2 = `x > ${threshTex}`;
            d3 = `x \\neq ${threshTex}`;
        }

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: d1 },
            { value: 0, tex: d2 },
            { value: 0, tex: d3 }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = a > 0 ? `x > ${threshTex} + ${off}` : `x < ${threshTex} - ${off}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Domain of ln',
            difficulty: 'medium',
            text: 'Find the domain of the function.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Argument of } \\ln \\text{ must be strictly positive}`,
                `${aStr}x${bStr} > 0 \\Rightarrow ${correctTex}`
            ],
            explain: `<strong>Rule:</strong> \\(\\ln(u)\\) is defined only when \\(u > 0\\).<br><br>` +
                     `<strong>Inequality:</strong> \\(${aStr}x${bStr} > 0\\).<br><br>` +
                     `<strong>Solve:</strong> \\(${correctTex}\\).`
        };
    },

    /**
     * 5. qRangeLinear - Easy (MC)
     * Find the range of a linear function over a restricted domain.
     */
    qRangeLinear() {
        const m = MathUtils.nonZeroRandInt(-4, 4);
        const c = MathUtils.randInt(-5, 5);
        const x1 = MathUtils.randInt(-6, 0);
        const x2 = x1 + MathUtils.randInt(2, 8);

        const y1 = m * x1 + c;
        const y2 = m * x2 + c;
        const yMin = Math.min(y1, y2);
        const yMax = Math.max(y1, y2);

        const mStr = m === 1 ? '' : m === -1 ? '-' : `${m}`;
        const cStr = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const fTex = `f(x) = ${mStr}x${cStr}`;

        const correctTex = `${yMin} \\leq f(x) \\leq ${yMax}`;
        const options = [
            { value: 1, tex: `${yMin} \\leq f(x) \\leq ${yMax}` },
            { value: 0, tex: `${yMin} < f(x) < ${yMax}` },
            { value: 0, tex: `${x1} \\leq f(x) \\leq ${x2}` },
            { value: 0, tex: `${yMin - 1} \\leq f(x) \\leq ${yMax + 1}` }
        ];

        return {
            type: 'mc',
            rule: 'Range (Linear)',
            difficulty: 'easy',
            text: `Find the range of \\(${fTex}\\) for \\(${x1} \\leq x \\leq ${x2}\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{Evaluate at both endpoints: } f(${x1}) \\text{ and } f(${x2})`,
                `f(${x1}) = ${y1}, \\quad f(${x2}) = ${y2}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate at the endpoints:<br>` +
                     `\\(f(${x1}) = ${m}(${x1}) + ${c} = ${y1}\\)<br>` +
                     `\\(f(${x2}) = ${m}(${x2}) + ${c} = ${y2}\\)<br><br>` +
                     `<strong>Step 2:</strong> For a linear function, the range spans from the smaller to the larger output.<br><br>` +
                     `<strong>Range:</strong> \\(${yMin} \\leq f(x) \\leq ${yMax}\\).`
        };
    },

    /**
     * 6. qRangeQuadratic - Medium (MC)
     * Find the range of a quadratic on all reals.
     */
    qRangeQuadratic() {
        const a = MathUtils.pick([1, -1, 2, -2]);
        const h = MathUtils.randInt(-4, 4);
        const k = MathUtils.randInt(-6, 6);
        const b = -2 * a * h;
        const c = a * h * h + k;

        const fTex = (() => {
            let s = a === 1 ? 'x^2' : a === -1 ? '-x^2' : `${a}x^2`;
            if (b === 1) s += ' + x';
            else if (b === -1) s += ' - x';
            else if (b > 0) s += ` + ${b}x`;
            else if (b < 0) s += ` - ${Math.abs(b)}x`;
            if (c > 0) s += ` + ${c}`;
            else if (c < 0) s += ` - ${Math.abs(c)}`;
            return `f(x) = ${s}`;
        })();

        let correctTex, d1, d2, d3;
        if (a > 0) {
            correctTex = `f(x) \\geq ${k}`;
            d1 = `f(x) \\leq ${k}`;
            d2 = `f(x) \\geq ${k - 1}`;
            d3 = `f(x) \\in \\mathbb{R}`;
        } else {
            correctTex = `f(x) \\leq ${k}`;
            d1 = `f(x) \\geq ${k}`;
            d2 = `f(x) \\leq ${k + 1}`;
            d3 = `f(x) \\in \\mathbb{R}`;
        }

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: d1 },
            { value: 0, tex: d2 },
            { value: 0, tex: d3 }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = a > 0 ? `f(x) \\geq ${k + off}` : `f(x) \\leq ${k - off}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Range (Quadratic)',
            difficulty: 'medium',
            text: 'Find the range of the quadratic function (domain: all reals).',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Find the vertex: axis at } x = -\\frac{b}{2a} = ${h}, \\; y_v = ${k}`,
                a > 0 ? `a > 0 \\Rightarrow \\text{minimum at vertex} \\Rightarrow f(x) \\geq ${k}`
                      : `a < 0 \\Rightarrow \\text{maximum at vertex} \\Rightarrow f(x) \\leq ${k}`
            ],
            explain: `<strong>Step 1:</strong> Find the vertex: \\(x = -\\dfrac{b}{2a} = ${h}\\), \\(y = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Since \\(a = ${a} ${a > 0 ? '> 0' : '< 0'}\\), the parabola opens ${a > 0 ? 'upward' : 'downward'}, so the vertex is a ${a > 0 ? 'minimum' : 'maximum'}.<br><br>` +
                     `<strong>Range:</strong> \\(${correctTex}\\).`
        };
    },

    /**
     * 7. qFunctionNotation - Easy (MC)
     * Understand f(a + 1) or f(2x) type evaluations.
     */
    qFunctionNotation() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        // f(x) = ax + b, find f(x + 1)
        const fTex = `f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}`;
        // f(x+1) = a(x+1) + b = ax + a + b
        const newB = a + b;
        const correctStr = `${a === 1 ? '' : a === -1 ? '-' : a}x ${newB >= 0 ? '+ ' + newB : '- ' + Math.abs(newB)}`;
        const correctTex = correctStr;

        const options = [
            { value: 1, tex: correctStr },
            { value: 0, tex: `${a === 1 ? '' : a === -1 ? '-' : a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} + 1` },
            { value: 0, tex: `${a}x + ${a}${b >= 0 ? ' + ' + b : b}` },
            { value: 0, tex: `${a}(x+1)${b >= 0 ? ' + ' + b : b}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = `${a}x + ${a + b + off}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Function Notation',
            difficulty: 'easy',
            text: `Given \\(${fTex}\\), find \\(f(x+1)\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Replace every } x \\text{ with } (x+1)`,
                `f(x+1) = ${a}(x+1) + ${b} = ${a}x + ${a} + ${b} = ${correctTex}`
            ],
            explain: `<strong>Replace x with (x+1):</strong><br>` +
                     `\\(f(x+1) = ${a}(x+1) + ${b} = ${a}x + ${a} + ${b} = ${correctTex}\\).`
        };
    },

    /**
     * 8. qNumberOfSolutions - Medium (MC)
     * How many solutions does f(x) = k have for a given parabola?
     */
    qNumberOfSolutions() {
        const a = MathUtils.pick([1, -1]);
        const h = MathUtils.randInt(-4, 4);
        const k_v = MathUtils.randInt(-5, 5); // vertex y
        const b = -2 * a * h;
        const c = a * h * h + k_v;

        const fStr = (() => {
            let s = a === 1 ? 'x^2' : '-x^2';
            if (b === 1) s += ' + x'; else if (b === -1) s += ' - x';
            else if (b > 0) s += ` + ${b}x`; else if (b < 0) s += ` - ${Math.abs(b)}x`;
            if (c > 0) s += ` + ${c}`; else if (c < 0) s += ` - ${Math.abs(c)}`;
            return s;
        })();

        // Choose k so we get an interesting case
        const caseType = MathUtils.pick(['two', 'one', 'zero']);
        let k_line, numSol;
        if (caseType === 'two') {
            k_line = a > 0 ? k_v + MathUtils.randInt(1, 5) : k_v - MathUtils.randInt(1, 5);
            numSol = 2;
        } else if (caseType === 'one') {
            k_line = k_v;
            numSol = 1;
        } else {
            k_line = a > 0 ? k_v - MathUtils.randInt(1, 5) : k_v + MathUtils.randInt(1, 5);
            numSol = 0;
        }

        const correctTex = `${numSol} \\text{ solution${numSol !== 1 ? 's' : ''}}`;
        const options = [
            { value: 1, tex: `${numSol} \\text{ solution${numSol !== 1 ? 's' : ''}}` },
            { value: 0, tex: `${numSol === 0 ? 1 : 0} \\text{ solution${numSol === 1 ? 's' : ''}}` },
            { value: 0, tex: `2 \\text{ solutions}` },
            { value: 0, tex: `\\text{infinitely many solutions}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = `${off} \\text{ solutions}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Number of Solutions',
            difficulty: 'medium',
            text: `How many solutions does \\(${fStr} = ${k_line}\\) have?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Vertex of parabola: } (${h}, ${k_v}); \\text{ opens } ${a > 0 ? 'up' : 'down'}`,
                `\\text{Compare } k = ${k_line} \\text{ to vertex y-value } ${k_v}`
            ],
            explain: `<strong>Vertex:</strong> \\((${h}, ${k_v})\\), opens ${a > 0 ? 'upward' : 'downward'}.<br><br>` +
                     `<strong>Horizontal line:</strong> \\(y = ${k_line}\\).<br><br>` +
                     (numSol === 2
                         ? `Since ${k_line} is ${a > 0 ? 'above' : 'below'} the vertex, the line crosses the parabola at <strong>2 points</strong>.`
                         : numSol === 1
                         ? `Since ${k_line} equals the vertex y-value, the line is tangent to the parabola — <strong>1 solution</strong>.`
                         : `Since ${k_line} is ${a > 0 ? 'below' : 'above'} the vertex, the line does not intersect the parabola — <strong>0 solutions</strong>.`)
        };
    },

    /**
     * 9. qDomainSqrtQuadratic - Hard (MC)
     * Domain of f(x) = sqrt(quadratic).
     */
    qDomainSqrtQuadratic() {
        // Use (x-p)(x-q) with p < q so domain is x <= p or x >= q
        const p = MathUtils.randInt(-5, 0);
        const q = MathUtils.randInt(1, 5);

        const fTex = `f(x) = \\sqrt{(x${p >= 0 ? ' - ' + p : ' + ' + Math.abs(p)})(x${q >= 0 ? ' - ' + q : ' + ' + Math.abs(q)})}`;

        const correctTex = `x \\leq ${p} \\text{ or } x \\geq ${q}`;
        const options = [
            { value: 1, tex: `x \\leq ${p} \\text{ or } x \\geq ${q}` },
            { value: 0, tex: `${p} \\leq x \\leq ${q}` },
            { value: 0, tex: `x < ${p} \\text{ or } x > ${q}` },
            { value: 0, tex: `x \\geq ${p}` }
        ];

        return {
            type: 'mc',
            rule: 'Domain of √(quadratic)',
            difficulty: 'hard',
            text: 'Find the domain of the function.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{Need: } (x - ${p})(x - ${q}) \\geq 0`,
                `\\text{Product} \\geq 0 \\text{ when both factors same sign}`
            ],
            explain: `<strong>Condition:</strong> \\((x - ${p})(x - ${q}) \\geq 0\\).<br><br>` +
                     `<strong>Sign analysis:</strong> The product is non-negative when both factors are the same sign (or zero).<br>` +
                     `<ul><li>Both \\(\\geq 0\\): \\(x \\geq ${p}\\) AND \\(x \\geq ${q}\\), so \\(x \\geq ${q}\\)</li>` +
                     `<li>Both \\(\\leq 0\\): \\(x \\leq ${p}\\) AND \\(x \\leq ${q}\\), so \\(x \\leq ${p}\\)</li></ul>` +
                     `<strong>Domain:</strong> \\(x \\leq ${p}\\) or \\(x \\geq ${q}\\).`
        };
    },

    /**
     * 10. qRangeSqrt - Hard (MC)
     * Find the range of f(x) = sqrt(ax + b).
     */
    qRangeSqrt() {
        const a = MathUtils.pick([1, 2, 3, -1, -2]);
        const b = MathUtils.randInt(-8, 8);
        // Domain: ax + b >= 0
        // If a > 0: x >= -b/a, f(x) >= 0, range: [0, ∞)
        // If a < 0: x <= -b/a, f(x) >= 0, range: [0, ∞)
        // sqrt is always >= 0

        const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
        const bStr = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `f(x) = \\sqrt{${aStr}x${bStr}}`;

        const correctTex = `f(x) \\geq 0`;
        const options = [
            { value: 1, tex: `f(x) \\geq 0` },
            { value: 0, tex: `f(x) > 0` },
            { value: 0, tex: `f(x) \\in \\mathbb{R}` },
            { value: 0, tex: `f(x) \\leq 0` }
        ];

        return {
            type: 'mc',
            rule: 'Range of √',
            difficulty: 'hard',
            text: 'Find the range of the function.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{A square root is always non-negative}`,
                `\\sqrt{u} \\geq 0 \\text{ for all } u \\geq 0`
            ],
            explain: `<strong>Key fact:</strong> \\(\\sqrt{u} \\geq 0\\) for any \\(u \\geq 0\\).<br><br>` +
                     `<strong>At the boundary</strong> of the domain, \\(f(x) = \\sqrt{0} = 0\\).<br><br>` +
                     `<strong>Range:</strong> \\(f(x) \\geq 0\\) (includes 0, extends to \\(+\\infty\\)).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => DOMAIN_RANGE.qEvaluate(),             weight: 3, diff: 'easy' },
            { fn: () => DOMAIN_RANGE.qDomainSqrt(),           weight: 2, diff: 'easy' },
            { fn: () => DOMAIN_RANGE.qDomainFraction(),       weight: 2, diff: 'easy' },
            { fn: () => DOMAIN_RANGE.qDomainLog(),            weight: 2, diff: 'medium' },
            { fn: () => DOMAIN_RANGE.qRangeLinear(),          weight: 2, diff: 'easy' },
            { fn: () => DOMAIN_RANGE.qRangeQuadratic(),       weight: 2, diff: 'medium' },
            { fn: () => DOMAIN_RANGE.qFunctionNotation(),     weight: 2, diff: 'easy' },
            { fn: () => DOMAIN_RANGE.qNumberOfSolutions(),    weight: 2, diff: 'medium' },
            { fn: () => DOMAIN_RANGE.qDomainSqrtQuadratic(),  weight: 1, diff: 'hard' },
            { fn: () => DOMAIN_RANGE.qRangeSqrt(),            weight: 1, diff: 'hard' }
        ];

        let filtered = pool;
        if (DOMAIN_RANGE.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (DOMAIN_RANGE.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (DOMAIN_RANGE.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

        const totalWeight = filtered.reduce((s, p) => s + p.weight, 0);
        let r = Math.random() * totalWeight;
        for (const item of filtered) {
            r -= item.weight;
            if (r <= 0) return item.fn();
        }
        return filtered[filtered.length - 1].fn();
    },

    /* ────────────────────────────────────────────
       UI
       ──────────────────────────────────────────── */

    load() {
        DOMAIN_RANGE.score = 0; DOMAIN_RANGE.total = 0;
        DOMAIN_RANGE.streak = 0; DOMAIN_RANGE.answered = false; DOMAIN_RANGE.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="DOMAIN_RANGE.unload()">Domain & Range (2.3)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Functions, Domain &amp; Range</h1>
                <p>IB Math AA 2.3 - Evaluate functions, find domain restrictions and range</p>
            </header>

            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="DOMAIN_RANGE.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="DOMAIN_RANGE.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="DOMAIN_RANGE.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="DOMAIN_RANGE.setLevel('hard')">Hard</button>
            </div>

            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="dr-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="dr-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="dr-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="dr-accuracy">-</div></div>
            </div>

            <div class="question-card" id="dr-question-card">
                <span class="rule-tag" id="dr-rule"></span>
                <span class="difficulty-tag" id="dr-difficulty"></span>
                <div class="question-text" id="dr-text"></div>
                <div class="question-prompt" id="dr-latex"></div>
                <div id="dr-options-area"></div>
            </div>

            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <div class="hint-box" id="dr-hint-box"></div>

            <div class="feedback" id="dr-feedback">
                <div class="feedback-title" id="dr-feedback-title"></div>
                <div class="feedback-explanation" id="dr-feedback-explanation"></div>
            </div>

            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="dr-hint-btn" onclick="DOMAIN_RANGE.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="dr-next-btn" onclick="DOMAIN_RANGE.next()" style="display:none;">Next Question</button>
            </div>
        `;

        DOMAIN_RANGE.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('functions');
    },

    setLevel(lvl) {
        DOMAIN_RANGE.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        DOMAIN_RANGE.score = 0; DOMAIN_RANGE.total = 0; DOMAIN_RANGE.streak = 0;
        DOMAIN_RANGE.updateStats();
        DOMAIN_RANGE.next();
    },

    next() {
        DOMAIN_RANGE.answered = false;
        DOMAIN_RANGE.hintIndex = 0;
        DOMAIN_RANGE.currentQ = DOMAIN_RANGE.pickQuestion();
        const q = DOMAIN_RANGE.currentQ;

        document.getElementById('dr-rule').textContent = q.rule;
        const diffEl = document.getElementById('dr-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('dr-text').innerHTML = q.text;
        document.getElementById('dr-latex').innerHTML = q.latex;

        const optArea = document.getElementById('dr-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="DOMAIN_RANGE.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="dr-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')DOMAIN_RANGE.checkFree()">
                    <button class="btn btn-primary" onclick="DOMAIN_RANGE.checkFree()">Submit</button>
                </div>`;
            setTimeout(() => { const inp = document.getElementById('dr-input'); if (inp) inp.focus(); }, 100);
        }

        const hintBox = document.getElementById('dr-hint-box');
        hintBox.classList.remove('show'); hintBox.innerHTML = '';
        const fb = document.getElementById('dr-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById('dr-next-btn').style.display = 'none';
        document.getElementById('dr-hint-btn').style.display = '';
        document.getElementById('dr-hint-btn').disabled = false;

        DOMAIN_RANGE.renderAllKaTeX();
    },

    showHint() {
        const q = DOMAIN_RANGE.currentQ;
        if (!q || !q.hintTex || DOMAIN_RANGE.hintIndex >= q.hintTex.length) return;
        const hintBox = document.getElementById('dr-hint-box');
        const prev = DOMAIN_RANGE.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[DOMAIN_RANGE.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        DOMAIN_RANGE.hintIndex++;
        if (DOMAIN_RANGE.hintIndex >= q.hintTex.length) document.getElementById('dr-hint-btn').disabled = true;
        DOMAIN_RANGE.renderAllKaTeX();
    },

    checkMC(btn) {
        if (DOMAIN_RANGE.answered) return;
        DOMAIN_RANGE.answered = true; DOMAIN_RANGE.total++;
        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });
        if (isCorrect) { btn.classList.add('correct'); DOMAIN_RANGE.score++; DOMAIN_RANGE.streak++; }
        else { btn.classList.add('incorrect'); DOMAIN_RANGE.streak = 0; }
        DOMAIN_RANGE.showFeedback(isCorrect);
        DOMAIN_RANGE.updateStats();
    },

    checkFree() {
        if (DOMAIN_RANGE.answered) return;
        const inp = document.getElementById('dr-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        DOMAIN_RANGE.answered = true; DOMAIN_RANGE.total++; inp.disabled = true;
        const isCorrect = MathUtils.approxEqual(val, DOMAIN_RANGE.currentQ.answer, 0.01);
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)'; inp.style.background = 'var(--success-light)';
            DOMAIN_RANGE.score++; DOMAIN_RANGE.streak++;
        } else {
            inp.style.borderColor = 'var(--error)'; inp.style.background = 'var(--error-light)';
            DOMAIN_RANGE.streak = 0;
        }
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;
        DOMAIN_RANGE.showFeedback(isCorrect);
        DOMAIN_RANGE.updateStats();
    },

    showFeedback(isCorrect) {
        const q = DOMAIN_RANGE.currentQ;
        const fb = document.getElementById('dr-feedback');
        const title = document.getElementById('dr-feedback-title');
        const explanation = document.getElementById('dr-feedback-explanation');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            title.textContent = DOMAIN_RANGE.streak > 1 ? `Correct! (${DOMAIN_RANGE.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }
        explanation.innerHTML = q.explain;
        document.getElementById('dr-next-btn').style.display = '';
        document.getElementById('dr-hint-btn').style.display = 'none';
        DOMAIN_RANGE.renderAllKaTeX();
    },

    updateStats() {
        const s = document.getElementById('dr-score');
        const t = document.getElementById('dr-total');
        const k = document.getElementById('dr-streak');
        const a = document.getElementById('dr-accuracy');
        if (s) s.textContent = DOMAIN_RANGE.score;
        if (t) t.textContent = DOMAIN_RANGE.total;
        if (k) k.textContent = DOMAIN_RANGE.streak;
        if (a) a.textContent = DOMAIN_RANGE.total > 0 ? Math.round((DOMAIN_RANGE.score / DOMAIN_RANGE.total) * 100) + '%' : '-';
    },

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

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['domain-range'] = () => DOMAIN_RANGE.load();
}
