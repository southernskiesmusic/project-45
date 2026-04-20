/*
 * quadratics.js - IB Math AA 2.2: Quadratics
 * Standard form, vertex form, factored form, discriminant, roots, Vieta's formulas
 */

const QUADRATICS = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    fmtQuad(a, b, c) {
        let s = '';
        if (a === 1) s = 'x^2';
        else if (a === -1) s = '-x^2';
        else s = `${a}x^2`;
        if (b === 1) s += ' + x';
        else if (b === -1) s += ' - x';
        else if (b > 0) s += ` + ${b}x`;
        else if (b < 0) s += ` - ${Math.abs(b)}x`;
        if (c > 0) s += ` + ${c}`;
        else if (c < 0) s += ` - ${Math.abs(c)}`;
        return s;
    },

    factorTex(root) {
        if (root === 0) return 'x';
        if (root > 0) return `(x - ${root})`;
        return `(x + ${Math.abs(root)})`;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qDiscriminant - Easy (Free)
     * Compute Δ = b² - 4ac for a given quadratic.
     */
    qDiscriminant() {
        const a = MathUtils.nonZeroRandInt(-3, 4);
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-6, 6);
        const delta = b * b - 4 * a * c;
        const quadTex = QUADRATICS.fmtQuad(a, b, c);

        return {
            type: 'free',
            rule: 'Discriminant',
            difficulty: 'easy',
            text: 'Find the discriminant of the quadratic below.',
            latex: `\\(${quadTex}\\)`,
            answer: delta,
            answerTex: String(delta),
            options: [],
            hintTex: [
                `\\Delta = b^2 - 4ac`,
                `= (${b})^2 - 4(${a})(${c}) = ${b * b} - (${4 * a * c}) = ${delta}`
            ],
            explain: `<strong>Step 1:</strong> Identify \\(a = ${a}\\), \\(b = ${b}\\), \\(c = ${c}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply \\(\\Delta = b^2 - 4ac\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\Delta = (${b})^2 - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${delta}\\).`
        };
    },

    /**
     * 2. qNatureOfRoots - Easy (MC)
     * Determine nature of roots from the discriminant.
     */
    qNatureOfRoots() {
        const type = MathUtils.pick(['positive', 'zero', 'negative']);
        let a, b, c, delta;

        if (type === 'zero') {
            // x² + bx + c = (x - h)² → b = -2h, c = h²
            const h = MathUtils.randInt(-5, 5);
            a = 1; b = -2 * h; c = h * h; delta = 0;
        } else {
            let tries = 0;
            do {
                a = MathUtils.nonZeroRandInt(-3, 4);
                b = MathUtils.randInt(-6, 6);
                c = MathUtils.randInt(-6, 6);
                delta = b * b - 4 * a * c;
                tries++;
            } while (
                tries < 50 &&
                ((type === 'positive' && delta <= 0) || (type === 'negative' && delta >= 0))
            );
        }

        const quadTex = QUADRATICS.fmtQuad(a, b, c);

        const options = [
            { value: delta > 0 ? 1 : 0, tex: '\\text{Two distinct real roots}' },
            { value: delta === 0 ? 1 : 0, tex: '\\text{One repeated real root}' },
            { value: delta < 0 ? 1 : 0, tex: '\\text{No real roots}' },
            { value: 0, tex: '\\text{Infinitely many solutions}' }
        ];

        return {
            type: 'mc',
            rule: 'Nature of Roots',
            difficulty: 'easy',
            text: 'Determine the nature of the roots of the equation below.',
            latex: `\\(${quadTex} = 0\\)`,
            answer: 1,
            answerTex: delta > 0 ? '\\text{Two distinct real roots}' : delta === 0 ? '\\text{One repeated real root}' : '\\text{No real roots}',
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${delta}`,
                delta > 0 ? `\\Delta > 0 \\Rightarrow \\text{two distinct real roots}`
                          : delta === 0 ? `\\Delta = 0 \\Rightarrow \\text{one repeated root}`
                          : `\\Delta < 0 \\Rightarrow \\text{no real roots}`
            ],
            explain: `<strong>Step 1:</strong> Compute \\(\\Delta = (${b})^2 - 4(${a})(${c}) = ${delta}\\).<br><br>` +
                     `<strong>Step 2:</strong> ` +
                     (delta > 0
                         ? `Since \\(\\Delta = ${delta} > 0\\), there are <strong>two distinct real roots</strong>.`
                         : delta === 0
                         ? `Since \\(\\Delta = 0\\), there is <strong>one repeated real root</strong>.`
                         : `Since \\(\\Delta = ${delta} < 0\\), there are <strong>no real roots</strong>.`)
        };
    },

    /**
     * 3. qAxisOfSymmetry - Easy (Free)
     * Find the axis of symmetry x = -b/2a.
     */
    qAxisOfSymmetry() {
        const a = MathUtils.pick([1, -1, 2, -2]);
        const bChoices = [-6, -4, -2, 0, 2, 4, 6];
        const b = MathUtils.pick(bChoices);
        const c = MathUtils.randInt(-5, 5);
        const quadTex = QUADRATICS.fmtQuad(a, b, c);

        const axisNum = -b;
        const axisDen = 2 * a;
        const [n, d] = MathUtils.simplifyFraction(axisNum, axisDen);
        const axisVal = n / d;
        const axisTex = MathUtils.fractionTeX(axisNum, axisDen);

        return {
            type: 'free',
            rule: 'Axis of Symmetry',
            difficulty: 'easy',
            text: 'Find the \\(x\\)-coordinate of the axis of symmetry.',
            latex: `\\(y = ${quadTex}\\)`,
            answer: axisVal,
            answerTex: axisTex,
            options: [],
            hintTex: [
                `x = -\\dfrac{b}{2a}`,
                `x = -\\dfrac{${b}}{2(${a})} = \\dfrac{${axisNum}}{${axisDen}} = ${axisTex}`
            ],
            explain: `<strong>Step 1:</strong> Identify \\(a = ${a}\\), \\(b = ${b}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply \\(x = -\\dfrac{b}{2a}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(x = -\\dfrac{${b}}{2 \\times ${a}} = \\dfrac{${axisNum}}{${axisDen}} = ${axisTex}\\).`
        };
    },

    /**
     * 4. qVertex - Medium (MC)
     * Find the vertex of y = a(x-h)² + k written in standard form.
     */
    qVertex() {
        const a = MathUtils.pick([1, -1]);
        const h = MathUtils.randInt(-5, 5);
        const k = MathUtils.randInt(-8, 8);
        // Standard form: a(x-h)² + k = ax² - 2ahx + ah² + k
        const b = -2 * a * h;
        const c = a * h * h + k;
        const quadTex = QUADRATICS.fmtQuad(a, b, c);

        const correctTex = `(${h},\\,${k})`;
        const options = [
            { value: 1, tex: `(${h},\\,${k})` },
            { value: 0, tex: `(${-h},\\,${k})` },
            { value: 0, tex: `(${h},\\,${-k})` },
            { value: 0, tex: `(${b},\\,${c})` }
        ];

        // Deduplicate
        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = `(${h + off},\\,${k})`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Vertex',
            difficulty: 'medium',
            text: 'Find the coordinates of the vertex of the parabola.',
            latex: `\\(y = ${quadTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `x_v = -\\dfrac{b}{2a} = -\\dfrac{${b}}{${2 * a}} = ${h}`,
                `y_v = f(${h}) = ${a}(${h})^2 + (${b})(${h}) + ${c} = ${k}`
            ],
            explain: `<strong>Step 1:</strong> Axis of symmetry: \\(x = -\\dfrac{${b}}{2(${a})} = ${h}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(y = ${a}(${h})^2 + (${b})(${h}) + ${c} = ${a * h * h} + ${b * h} + ${c} = ${k}\\).<br><br>` +
                     `<strong>Answer:</strong> Vertex is \\((${h},\\,${k})\\).`
        };
    },

    /**
     * 5. qRootsFromFactored - Easy (Free)
     * Given (x-p)(x-q) = 0, find the larger root.
     */
    qRootsFromFactored() {
        const p = MathUtils.randInt(-7, 7);
        let q;
        do { q = MathUtils.randInt(-7, 7); } while (q === p);

        const factTex = `${QUADRATICS.factorTex(p)}${QUADRATICS.factorTex(q)}`;
        const larger = Math.max(p, q);

        return {
            type: 'free',
            rule: 'Roots (Factored Form)',
            difficulty: 'easy',
            text: 'Find the <strong>larger</strong> root of the equation below.',
            latex: `\\(${factTex} = 0\\)`,
            answer: larger,
            answerTex: String(larger),
            options: [],
            hintTex: [
                `\\text{Set each factor to zero separately}`,
                `x = ${p} \\text{ or } x = ${q}; \\quad \\text{larger} = ${larger}`
            ],
            explain: `<strong>Step 1:</strong> Set each factor to zero.<br><br>` +
                     `<strong>Step 2:</strong> \\(x - ${p} = 0 \\Rightarrow x = ${p}\\) and \\(x - ${q} = 0 \\Rightarrow x = ${q}\\).<br><br>` +
                     `<strong>Step 3:</strong> The larger root is \\(x = ${larger}\\).`
        };
    },

    /**
     * 6. qSolveIntegerRoots - Medium (MC)
     * Solve ax² + bx + c = 0 by factoring (integer roots, a = 1).
     */
    qSolveIntegerRoots() {
        const p = MathUtils.randInt(-6, 6);
        let q;
        do { q = MathUtils.randInt(-6, 6); } while (q === p);

        const b = -(p + q);
        const c = p * q;
        const quadTex = QUADRATICS.fmtQuad(1, b, c);

        const r1 = Math.min(p, q);
        const r2 = Math.max(p, q);

        const correctTex = `x = ${r1} \\text{ or } x = ${r2}`;
        const options = [
            { value: 1, tex: `x = ${r1} \\text{ or } x = ${r2}` },
            { value: 0, tex: `x = ${-r1} \\text{ or } x = ${-r2}` },
            { value: 0, tex: `x = ${r1} \\text{ or } x = ${-r2}` },
            { value: 0, tex: `x = ${r1 + 1} \\text{ or } x = ${r2 + 1}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = `x = ${r1 - off} \\text{ or } x = ${r2 + off}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Solve by Factoring',
            difficulty: 'medium',
            text: 'Solve the equation by factoring.',
            latex: `\\(${quadTex} = 0\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Find two numbers with sum } ${b} \\text{ and product } ${c}`,
                `(x - ${p})(x - ${q}) = 0 \\Rightarrow x = ${p} \\text{ or } x = ${q}`
            ],
            explain: `<strong>Step 1:</strong> Find factors of \\(${c}\\) that sum to \\(${b}\\): the values \\(${-p}\\) and \\(${-q}\\).<br><br>` +
                     `<strong>Step 2:</strong> Factor: \\((x - ${p})(x - ${q}) = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Set each factor to zero: \\(x = ${p}\\) or \\(x = ${q}\\).`
        };
    },

    /**
     * 7. qExpandFactored - Medium (MC)
     * Expand a(x-p)(x-q) to standard form ax² + bx + c.
     */
    qExpandFactored() {
        const a = MathUtils.pick([1, -1, 2]);
        const p = MathUtils.randInt(-5, 5);
        let q;
        do { q = MathUtils.randInt(-5, 5); } while (q === p);

        const bCoeff = -a * (p + q);
        const cCoeff = a * p * q;
        const correctTex = QUADRATICS.fmtQuad(a, bCoeff, cCoeff);

        const aTex = a === 1 ? '' : a === -1 ? '-' : `${a}`;
        const factTex = `${aTex}${QUADRATICS.factorTex(p)}${QUADRATICS.factorTex(q)}`;

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: QUADRATICS.fmtQuad(a, a * (p + q), cCoeff) },
            { value: 0, tex: QUADRATICS.fmtQuad(a, bCoeff, -a * p * q) },
            { value: 0, tex: QUADRATICS.fmtQuad(a, bCoeff, a * (p + q)) }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = QUADRATICS.fmtQuad(a, bCoeff + off, cCoeff);
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Expand Factored Form',
            difficulty: 'medium',
            text: 'Expand the expression to standard form \\(ax^2 + bx + c\\).',
            latex: `\\(${factTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `(x-${p})(x-${q}) = x^2 - ${p + q}x + ${p * q}`,
                `\\text{Multiply by } ${a}: \\quad ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Expand: \\((x-${p})(x-${q}) = x^2 - ${p + q}x + ${p * q}\\).<br><br>` +
                     `<strong>Step 2:</strong> Multiply by \\(${a}\\):<br>` +
                     `\\(${a}(x^2 - ${p + q}x + ${p * q}) = ${correctTex}\\).`
        };
    },

    /**
     * 8. qCompletingSquare - Hard (MC)
     * Convert y = x² + bx + c to vertex form (x - h)² + k.
     */
    qCompletingSquare() {
        const h = MathUtils.randInt(-5, 5);
        const k = MathUtils.randInt(-8, 8);
        const b = -2 * h;
        const c = h * h + k;
        const quadTex = QUADRATICS.fmtQuad(1, b, c);

        function vertexTex(vh, vk) {
            const hPart = vh === 0 ? 'x' : vh > 0 ? `(x - ${vh})` : `(x + ${Math.abs(vh)})`;
            const kPart = vk === 0 ? '' : vk > 0 ? ` + ${vk}` : ` - ${Math.abs(vk)}`;
            return `${hPart}^2${kPart}`;
        }

        const correctTex = vertexTex(h, k);
        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: vertexTex(-h, k) },
            { value: 0, tex: vertexTex(h, -k) },
            { value: 0, tex: vertexTex(h, k + MathUtils.nonZeroRandInt(-3, 3)) }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = vertexTex(h, k + off);
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Completing the Square',
            difficulty: 'hard',
            text: 'Write the quadratic in vertex form \\((x - h)^2 + k\\).',
            latex: `\\(y = ${quadTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Half of } b = ${b}: \\quad \\frac{${b}}{2} = ${b / 2}, \\quad \\left(\\frac{${b}}{2}\\right)^2 = ${h * h}`,
                `y = \\left(x + \\frac{${b}}{2}\\right)^2 - ${h * h} + ${c} = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Take half of \\(b = ${b}\\): \\(\\dfrac{${b}}{2} = ${b / 2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Add and subtract \\(\\left(\\dfrac{${b}}{2}\\right)^2 = ${h * h}\\):<br>` +
                     `\\(y = x^2 + ${b}x + ${h * h} - ${h * h} + ${c}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(y = \\left(x${b < 0 ? ' - ' + Math.abs(h) : b > 0 ? ' + ' + h : ''}\\right)^2 + ${c - h * h}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(y = ${correctTex}\\). Vertex is \\((${h},\\,${k})\\).`
        };
    },

    /**
     * 9. qParameterConditions - Hard (Free)
     * Find smallest positive integer k so x² + kx + c = 0 has two distinct real roots.
     */
    qParameterConditions() {
        const c = MathUtils.pick([4, 9, 16]);
        const threshold = 2 * Math.sqrt(c);
        const smallestPosInt = Number.isInteger(threshold) ? threshold + 1 : Math.ceil(threshold);

        return {
            type: 'free',
            rule: 'Parameter Conditions',
            difficulty: 'hard',
            text: `Find the smallest positive integer value of \\(k\\) for which \\(x^2 + kx + ${c} = 0\\) has two distinct real roots.`,
            latex: '',
            answer: smallestPosInt,
            answerTex: String(smallestPosInt),
            options: [],
            hintTex: [
                `\\text{For two distinct real roots: } \\Delta = k^2 - 4(${c}) > 0`,
                `k^2 > ${4 * c} \\Rightarrow k > ${threshold} \\Rightarrow \\text{smallest integer} = ${smallestPosInt}`
            ],
            explain: `<strong>Step 1:</strong> Condition: \\(\\Delta > 0\\), so \\(k^2 - 4(${c}) > 0\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(k^2 > ${4 * c}\\), so \\(|k| > ${threshold}\\).<br><br>` +
                     `<strong>Step 3:</strong> For positive \\(k\\): \\(k > ${threshold}\\).<br><br>` +
                     `<strong>Step 4:</strong> The smallest positive integer satisfying this is \\(k = ${smallestPosInt}\\).`
        };
    },

    /**
     * 10. qSumProduct - Medium (Free)
     * Vieta's formulas: sum and product of roots of x² + bx + c = 0.
     */
    qSumProduct() {
        const b = MathUtils.randInt(-8, 8);
        const c = MathUtils.randInt(-8, 8);
        const sum = -b;
        const product = c;
        const quadTex = QUADRATICS.fmtQuad(1, b, c);
        const askSum = MathUtils.randInt(0, 1) === 1;

        return {
            type: 'free',
            rule: "Vieta's Formulas",
            difficulty: 'medium',
            text: askSum
                ? `The roots of the equation are \\(\\alpha\\) and \\(\\beta\\). Find \\(\\alpha + \\beta\\).`
                : `The roots of the equation are \\(\\alpha\\) and \\(\\beta\\). Find \\(\\alpha\\beta\\).`,
            latex: `\\(${quadTex} = 0\\)`,
            answer: askSum ? sum : product,
            answerTex: String(askSum ? sum : product),
            options: [],
            hintTex: askSum
                ? [`\\alpha + \\beta = -\\dfrac{b}{a} = -\\dfrac{${b}}{1} = ${sum}`]
                : [`\\alpha\\beta = \\dfrac{c}{a} = \\dfrac{${c}}{1} = ${product}`],
            explain: askSum
                ? `<strong>Vieta's Formula:</strong> \\(\\alpha + \\beta = -\\dfrac{b}{a} = -\\dfrac{${b}}{1} = ${sum}\\).`
                : `<strong>Vieta's Formula:</strong> \\(\\alpha\\beta = \\dfrac{c}{a} = \\dfrac{${c}}{1} = ${product}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => QUADRATICS.qDiscriminant(),        weight: 2, diff: 'easy' },
            { fn: () => QUADRATICS.qNatureOfRoots(),       weight: 2, diff: 'easy' },
            { fn: () => QUADRATICS.qAxisOfSymmetry(),      weight: 2, diff: 'easy' },
            { fn: () => QUADRATICS.qVertex(),              weight: 2, diff: 'medium' },
            { fn: () => QUADRATICS.qRootsFromFactored(),   weight: 2, diff: 'easy' },
            { fn: () => QUADRATICS.qSolveIntegerRoots(),   weight: 2, diff: 'medium' },
            { fn: () => QUADRATICS.qExpandFactored(),      weight: 2, diff: 'medium' },
            { fn: () => QUADRATICS.qCompletingSquare(),    weight: 1, diff: 'hard' },
            { fn: () => QUADRATICS.qParameterConditions(), weight: 1, diff: 'hard' },
            { fn: () => QUADRATICS.qSumProduct(),          weight: 2, diff: 'medium' }
        ];

        let filtered = pool;
        if (QUADRATICS.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (QUADRATICS.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (QUADRATICS.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

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
        QUADRATICS.score = 0; QUADRATICS.total = 0;
        QUADRATICS.streak = 0; QUADRATICS.answered = false; QUADRATICS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="QUADRATICS.unload()">Quadratics (2.2)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Quadratics</h1>
                <p>IB Math AA 2.2 - Standard form, vertex form, discriminant, roots</p>
            </header>

            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="QUADRATICS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="QUADRATICS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="QUADRATICS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="QUADRATICS.setLevel('hard')">Hard</button>
            </div>

            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="quad-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="quad-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="quad-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="quad-accuracy">-</div></div>
            </div>

            <div class="question-card" id="quad-question-card">
                <span class="rule-tag" id="quad-rule"></span>
                <span class="difficulty-tag" id="quad-difficulty"></span>
                <div class="question-text" id="quad-text"></div>
                <div class="question-prompt" id="quad-latex"></div>
                <div id="quad-options-area"></div>
            </div>

            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <div class="hint-box" id="quad-hint-box"></div>

            <div class="feedback" id="quad-feedback">
                <div class="feedback-title" id="quad-feedback-title"></div>
                <div class="feedback-explanation" id="quad-feedback-explanation"></div>
            </div>

            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="quad-hint-btn" onclick="QUADRATICS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="quad-next-btn" onclick="QUADRATICS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        QUADRATICS.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('functions');
    },

    setLevel(lvl) {
        QUADRATICS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        QUADRATICS.score = 0; QUADRATICS.total = 0; QUADRATICS.streak = 0;
        QUADRATICS.updateStats();
        QUADRATICS.next();
    },

    next() {
        QUADRATICS.answered = false;
        QUADRATICS.hintIndex = 0;
        QUADRATICS.currentQ = QUADRATICS.pickQuestion();
        const q = QUADRATICS.currentQ;

        document.getElementById('quad-rule').textContent = q.rule;
        const diffEl = document.getElementById('quad-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('quad-text').innerHTML = q.text;
        document.getElementById('quad-latex').innerHTML = q.latex;

        const optArea = document.getElementById('quad-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="QUADRATICS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="quad-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')QUADRATICS.checkFree()">
                    <button class="btn btn-primary" onclick="QUADRATICS.checkFree()">Submit</button>
                </div>`;
            setTimeout(() => { const inp = document.getElementById('quad-input'); if (inp) inp.focus(); }, 100);
        }

        const hintBox = document.getElementById('quad-hint-box');
        hintBox.classList.remove('show'); hintBox.innerHTML = '';
        const fb = document.getElementById('quad-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById('quad-next-btn').style.display = 'none';
        document.getElementById('quad-hint-btn').style.display = '';
        document.getElementById('quad-hint-btn').disabled = false;

        QUADRATICS.renderAllKaTeX();
    },

    showHint() {
        const q = QUADRATICS.currentQ;
        if (!q || !q.hintTex || QUADRATICS.hintIndex >= q.hintTex.length) return;
        const hintBox = document.getElementById('quad-hint-box');
        const prev = QUADRATICS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[QUADRATICS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        QUADRATICS.hintIndex++;
        if (QUADRATICS.hintIndex >= q.hintTex.length) document.getElementById('quad-hint-btn').disabled = true;
        QUADRATICS.renderAllKaTeX();
    },

    checkMC(btn) {
        if (QUADRATICS.answered) return;
        QUADRATICS.answered = true; QUADRATICS.total++;
        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });
        if (isCorrect) { btn.classList.add('correct'); QUADRATICS.score++; QUADRATICS.streak++; }
        else { btn.classList.add('incorrect'); QUADRATICS.streak = 0; }
        QUADRATICS.showFeedback(isCorrect);
        QUADRATICS.updateStats();
    },

    checkFree() {
        if (QUADRATICS.answered) return;
        const inp = document.getElementById('quad-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        QUADRATICS.answered = true; QUADRATICS.total++; inp.disabled = true;
        const isCorrect = MathUtils.approxEqual(val, QUADRATICS.currentQ.answer, 0.01);
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)'; inp.style.background = 'var(--success-light)';
            QUADRATICS.score++; QUADRATICS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)'; inp.style.background = 'var(--error-light)';
            QUADRATICS.streak = 0;
        }
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;
        QUADRATICS.showFeedback(isCorrect);
        QUADRATICS.updateStats();
    },

    showFeedback(isCorrect) {
        const q = QUADRATICS.currentQ;
        const fb = document.getElementById('quad-feedback');
        const title = document.getElementById('quad-feedback-title');
        const explanation = document.getElementById('quad-feedback-explanation');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            title.textContent = QUADRATICS.streak > 1 ? `Correct! (${QUADRATICS.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }
        explanation.innerHTML = q.explain;
        document.getElementById('quad-next-btn').style.display = '';
        document.getElementById('quad-hint-btn').style.display = 'none';
        QUADRATICS.renderAllKaTeX();
    },

    updateStats() {
        const s = document.getElementById('quad-score');
        const t = document.getElementById('quad-total');
        const k = document.getElementById('quad-streak');
        const a = document.getElementById('quad-accuracy');
        if (s) s.textContent = QUADRATICS.score;
        if (t) t.textContent = QUADRATICS.total;
        if (k) k.textContent = QUADRATICS.streak;
        if (a) a.textContent = QUADRATICS.total > 0 ? Math.round((QUADRATICS.score / QUADRATICS.total) * 100) + '%' : '-';
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
    ACTIVITY_INITS['quadratics'] = () => QUADRATICS.load();
}
