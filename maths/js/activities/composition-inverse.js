/*
 * composition-inverse.js - IB Math AA 2.4-2.5: Composition & Inverse Functions
 * f∘g, g∘f, f⁻¹, domain of inverse, self-inverse, solving with composition
 */

const COMP_INV = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    fmtLinear(a, b) {
        const aStr = a === 1 ? '' : a === -1 ? '-' : `${a}`;
        const bStr = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        return `${aStr}x${bStr}`;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qComposeNumerical - Easy (Free)
     * Compute f(g(a)) for specific numeric value.
     */
    qComposeNumerical() {
        const af = MathUtils.nonZeroRandInt(-3, 3);
        const bf = MathUtils.randInt(-5, 5);
        const ag = MathUtils.nonZeroRandInt(-3, 3);
        const bg = MathUtils.randInt(-5, 5);
        const x0 = MathUtils.randInt(-4, 4);

        const gx0 = ag * x0 + bg;
        const fgx0 = af * gx0 + bf;

        const fTex = `f(x) = ${COMP_INV.fmtLinear(af, bf)}`;
        const gTex = `g(x) = ${COMP_INV.fmtLinear(ag, bg)}`;

        return {
            type: 'free',
            rule: 'Compose (Numerical)',
            difficulty: 'easy',
            text: `Given \\(${fTex}\\) and \\(${gTex}\\), find \\(f(g(${x0}))\\).`,
            latex: '',
            answer: fgx0,
            answerTex: String(fgx0),
            options: [],
            hintTex: [
                `g(${x0}) = ${ag}(${x0}) + ${bg} = ${gx0}`,
                `f(g(${x0})) = f(${gx0}) = ${af}(${gx0}) + ${bf} = ${fgx0}`
            ],
            explain: `<strong>Step 1:</strong> Find \\(g(${x0}) = ${ag}(${x0}) + ${bg} = ${ag * x0} + ${bg} = ${gx0}\\).<br><br>` +
                     `<strong>Step 2:</strong> Find \\(f(g(${x0})) = f(${gx0}) = ${af}(${gx0}) + ${bf} = ${af * gx0} + ${bf} = ${fgx0}\\).`
        };
    },

    /**
     * 2. qComposeFG - Medium (MC)
     * Find the expression for f(g(x)) — two linear functions.
     */
    qComposeFG() {
        const af = MathUtils.nonZeroRandInt(-3, 3);
        const bf = MathUtils.randInt(-5, 5);
        const ag = MathUtils.nonZeroRandInt(-3, 3);
        const bg = MathUtils.randInt(-5, 5);

        // f(g(x)) = af*(ag*x + bg) + bf = af*ag*x + af*bg + bf
        const compA = af * ag;
        const compB = af * bg + bf;
        const correctTex = COMP_INV.fmtLinear(compA, compB);

        const fTex = `f(x) = ${COMP_INV.fmtLinear(af, bf)}`;
        const gTex = `g(x) = ${COMP_INV.fmtLinear(ag, bg)}`;

        // Distractors: g(f(x)), wrong order
        const gfA = ag * af;
        const gfB = ag * bf + bg;
        const gfTex = COMP_INV.fmtLinear(gfA, gfB);

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: gfTex },
            { value: 0, tex: COMP_INV.fmtLinear(compA, compB + MathUtils.nonZeroRandInt(-3, 3)) },
            { value: 0, tex: COMP_INV.fmtLinear(af + ag, bf + bg) }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const c = { value: 0, tex: COMP_INV.fmtLinear(compA, compB + off) };
            if (!seen.has(c.tex)) { unique.push(c); seen.add(c.tex); }
        }

        return {
            type: 'mc',
            rule: 'f∘g Expression',
            difficulty: 'medium',
            text: `Given \\(${fTex}\\) and \\(${gTex}\\), find \\((f \\circ g)(x)\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `(f \\circ g)(x) = f(g(x)) = f(${COMP_INV.fmtLinear(ag, bg)})`,
                `= ${af}(${COMP_INV.fmtLinear(ag, bg)}) + ${bf} = ${correctTex}`
            ],
            explain: `<strong>Replace x in f with g(x):</strong><br>` +
                     `\\((f \\circ g)(x) = f(g(x)) = ${af}(${COMP_INV.fmtLinear(ag, bg)}) + ${bf}\\)<br>` +
                     `\\(= ${af * ag}x + ${af * bg} + ${bf} = ${correctTex}\\).`
        };
    },

    /**
     * 3. qComposeGF - Medium (MC)
     * Find the expression for g(f(x)) — note order reversal.
     */
    qComposeGF() {
        const af = MathUtils.nonZeroRandInt(-3, 3);
        const bf = MathUtils.randInt(-5, 5);
        const ag = MathUtils.nonZeroRandInt(-3, 3);
        const bg = MathUtils.randInt(-5, 5);

        // g(f(x)) = ag*(af*x + bf) + bg = ag*af*x + ag*bf + bg
        const compA = ag * af;
        const compB = ag * bf + bg;
        const correctTex = COMP_INV.fmtLinear(compA, compB);

        const fTex = `f(x) = ${COMP_INV.fmtLinear(af, bf)}`;
        const gTex = `g(x) = ${COMP_INV.fmtLinear(ag, bg)}`;

        // Distractor: f(g(x)) — common mistake
        const fgA = af * ag;
        const fgB = af * bg + bf;

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: COMP_INV.fmtLinear(fgA, fgB) },
            { value: 0, tex: COMP_INV.fmtLinear(compA, compB + MathUtils.nonZeroRandInt(-3, 3)) },
            { value: 0, tex: COMP_INV.fmtLinear(-compA, compB) }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const c = { value: 0, tex: COMP_INV.fmtLinear(compA + off, compB) };
            if (!seen.has(c.tex)) { unique.push(c); seen.add(c.tex); }
        }

        return {
            type: 'mc',
            rule: 'g∘f Expression',
            difficulty: 'medium',
            text: `Given \\(${fTex}\\) and \\(${gTex}\\), find \\((g \\circ f)(x)\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `(g \\circ f)(x) = g(f(x)) = g(${COMP_INV.fmtLinear(af, bf)})`,
                `= ${ag}(${COMP_INV.fmtLinear(af, bf)}) + ${bg} = ${correctTex}`
            ],
            explain: `<strong>Note: g∘f means g applied to f, not f applied to g.</strong><br><br>` +
                     `\\((g \\circ f)(x) = g(f(x)) = ${ag}(${COMP_INV.fmtLinear(af, bf)}) + ${bg}\\)<br>` +
                     `\\(= ${ag * af}x + ${ag * bf} + ${bg} = ${correctTex}\\).`
        };
    },

    /**
     * 4. qInverseLinear - Easy (MC)
     * Find f⁻¹(x) for f(x) = ax + b.
     */
    qInverseLinear() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        const fTex = COMP_INV.fmtLinear(a, b);

        // f⁻¹(x) = (x - b) / a
        const [n1, d1] = MathUtils.simplifyFraction(1, a);
        const [n2, d2] = MathUtils.simplifyFraction(-b, a);

        function fmtInverse(mNum, mDen, cNum, cDen) {
            const [mn, md] = MathUtils.simplifyFraction(mNum, mDen);
            const [cn, cd] = MathUtils.simplifyFraction(cNum, cDen);
            let mPart = md === 1
                ? (mn === 1 ? '' : mn === -1 ? '-' : String(mn))
                : `${mn < 0 ? '-' : ''}\\frac{${Math.abs(mn)}}{${md}}`;
            let cPart = cd === 1
                ? (cn === 0 ? '' : cn > 0 ? ` + ${cn}` : ` - ${Math.abs(cn)}`)
                : (cn > 0 ? ` + \\frac{${cn}}{${cd}}` : cn < 0 ? ` - \\frac{${Math.abs(cn)}}{${cd}}` : '');
            return `${mPart}x${cPart}`;
        }

        const correctTex = fmtInverse(1, a, -b, a);
        const d1Tex = fmtInverse(a, 1, b, 1); // f(x) itself (forgot to invert)
        const d2Tex = fmtInverse(1, a, b, a); // wrong sign on b
        const d3Tex = fmtInverse(-1, a, -b, a); // negated gradient

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: d1Tex },
            { value: 0, tex: d2Tex },
            { value: 0, tex: d3Tex }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const c = { value: 0, tex: fmtInverse(1, a, -b + off, a) };
            if (!seen.has(c.tex)) { unique.push(c); seen.add(c.tex); }
        }

        return {
            type: 'mc',
            rule: 'Inverse Function',
            difficulty: 'easy',
            text: `Find \\(f^{-1}(x)\\) for \\(f(x) = ${fTex}\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Write } y = ${fTex} \\text{ then swap } x \\leftrightarrow y`,
                `x = ${a}y + ${b} \\Rightarrow y = \\frac{x - ${b}}{${a}} = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Write \\(y = ${fTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Swap \\(x\\) and \\(y\\): \\(x = ${a}y + ${b}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(y\\): \\(y = \\dfrac{x - ${b}}{${a}} = ${correctTex}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f^{-1}(x) = ${correctTex}\\).`
        };
    },

    /**
     * 5. qInverseValue - Easy (Free)
     * Find f⁻¹(k) for a specific value k.
     */
    qInverseValue() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        // f⁻¹(k) = (k - b) / a — choose k so answer is integer
        const ans = MathUtils.randInt(-5, 5);
        const k = a * ans + b; // f(ans) = k, so f⁻¹(k) = ans

        const fTex = COMP_INV.fmtLinear(a, b);

        return {
            type: 'free',
            rule: 'Inverse Value',
            difficulty: 'easy',
            text: `Given \\(f(x) = ${fTex}\\), find \\(f^{-1}(${k})\\).`,
            latex: '',
            answer: ans,
            answerTex: String(ans),
            options: [],
            hintTex: [
                `f^{-1}(k) \\text{ is the value of } x \\text{ such that } f(x) = k`,
                `${a}x + ${b} = ${k} \\Rightarrow x = ${ans}`
            ],
            explain: `<strong>Method:</strong> \\(f^{-1}(${k})\\) is the \\(x\\) such that \\(f(x) = ${k}\\).<br><br>` +
                     `Solve \\(${fTex} = ${k}\\):<br>` +
                     `\\(${a}x = ${k - b} \\Rightarrow x = ${ans}\\).`
        };
    },

    /**
     * 6. qSolveThroughCompose - Medium (Free)
     * Solve f(g(x)) = k.
     */
    qSolveThroughCompose() {
        const af = MathUtils.nonZeroRandInt(-3, 3);
        const bf = MathUtils.randInt(-5, 5);
        const ag = MathUtils.nonZeroRandInt(-3, 3);
        const bg = MathUtils.randInt(-5, 5);

        // f(g(x)) = af*(ag*x + bg) + bf = (af*ag)x + (af*bg + bf)
        const compA = af * ag;
        const compB = af * bg + bf;

        // Pick x0 so that k is an integer
        const x0 = MathUtils.randInt(-5, 5);
        const k = compA * x0 + compB;

        const fTex = `f(x) = ${COMP_INV.fmtLinear(af, bf)}`;
        const gTex = `g(x) = ${COMP_INV.fmtLinear(ag, bg)}`;

        return {
            type: 'free',
            rule: 'Solve f(g(x)) = k',
            difficulty: 'medium',
            text: `Given \\(${fTex}\\) and \\(${gTex}\\), solve \\(f(g(x)) = ${k}\\).`,
            latex: '',
            answer: x0,
            answerTex: String(x0),
            options: [],
            hintTex: [
                `(f \\circ g)(x) = ${COMP_INV.fmtLinear(compA, compB)}`,
                `${COMP_INV.fmtLinear(compA, compB)} = ${k} \\Rightarrow x = ${x0}`
            ],
            explain: `<strong>Step 1:</strong> Find \\(f(g(x))\\):<br>` +
                     `\\(f(g(x)) = ${af}(${COMP_INV.fmtLinear(ag, bg)}) + ${bf} = ${COMP_INV.fmtLinear(compA, compB)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve \\(${COMP_INV.fmtLinear(compA, compB)} = ${k}\\):<br>` +
                     `\\(${compA}x = ${k - compB} \\Rightarrow x = ${x0}\\).`
        };
    },

    /**
     * 7. qVerifyInverse - Medium (MC)
     * Verify f(f⁻¹(x)) = x by computing it.
     */
    qVerifyInverse() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        const fTex = COMP_INV.fmtLinear(a, b);

        // f⁻¹(x) = (x - b)/a = (1/a)x - b/a
        // f(f⁻¹(x)) = a*(x/a - b/a) + b = x - b + b = x ✓

        const options = [
            { value: 1, tex: `x \\text{ — confirms they are inverses}` },
            { value: 0, tex: `${a}x + ${b} \\text{ — same as f(x)}` },
            { value: 0, tex: `0 \\text{ — not always}` },
            { value: 0, tex: `\\text{undefined}` }
        ];

        return {
            type: 'mc',
            rule: 'Verify Inverse',
            difficulty: 'medium',
            text: `For \\(f(x) = ${fTex}\\), what does \\(f(f^{-1}(x))\\) simplify to?`,
            latex: '',
            answer: 1,
            answerTex: 'x',
            options: MathUtils.shuffle(options),
            hintTex: [
                `f^{-1}(x) = \\frac{x - ${b}}{${a}}`,
                `f(f^{-1}(x)) = ${a} \\cdot \\frac{x - ${b}}{${a}} + ${b} = (x - ${b}) + ${b} = x`
            ],
            explain: `<strong>By definition</strong>, \\(f(f^{-1}(x)) = x\\) for all \\(x\\) in the domain.<br><br>` +
                     `<strong>Verification:</strong> \\(f^{-1}(x) = \\dfrac{x - ${b}}{${a}}\\), so:<br>` +
                     `\\(f(f^{-1}(x)) = ${a} \\cdot \\dfrac{x - ${b}}{${a}} + ${b} = (x - ${b}) + ${b} = x \\checkmark\\)`
        };
    },

    /**
     * 8. qSelfInverse - Medium (MC)
     * Identify which function is self-inverse: f(f(x)) = x.
     */
    qSelfInverse() {
        // Self-inverse functions: f(x) = -x, f(x) = 1/x, f(x) = k - x
        const k = MathUtils.nonZeroRandInt(-5, 5);
        const c = MathUtils.randInt(1, 8);

        const options = [
            { value: 1, tex: `f(x) = ${k} - x` },
            { value: 0, tex: `f(x) = x + ${c}` },
            { value: 0, tex: `f(x) = ${c}x` },
            { value: 0, tex: `f(x) = x^2` }
        ];

        return {
            type: 'mc',
            rule: 'Self-Inverse',
            difficulty: 'medium',
            text: 'Which function is self-inverse (i.e. \\(f(f(x)) = x\\))?',
            latex: '',
            answer: 1,
            answerTex: `f(x) = ${k} - x`,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{A self-inverse function satisfies } f(f(x)) = x`,
                `\\text{Try } f(x) = ${k} - x: \\; f(f(x)) = ${k} - (${k} - x) = x \\checkmark`
            ],
            explain: `<strong>Self-inverse</strong> means \\(f(f(x)) = x\\).<br><br>` +
                     `<strong>Test \\(f(x) = ${k} - x\\):</strong><br>` +
                     `\\(f(f(x)) = ${k} - (${k} - x) = ${k} - ${k} + x = x \\checkmark\\)<br><br>` +
                     `<strong>Others fail:</strong> e.g. \\(f(x) = x + ${c}\\) gives \\(f(f(x)) = x + ${2 * c} \\neq x\\).`
        };
    },

    /**
     * 9. qInverseFromTable - Hard (Free)
     * Given f(a) = b, find f⁻¹(b).
     */
    qInverseFromTable() {
        const pairs = [];
        const used = new Set();
        for (let i = 0; i < 5; i++) {
            let x, y;
            do { x = MathUtils.randInt(-4, 4); } while (used.has(x));
            used.add(x);
            y = 2 * x + MathUtils.pick([-3, -1, 1, 3]);
            pairs.push([x, y]);
        }
        // Choose a y value from the table and ask f⁻¹(y)
        const chosen = MathUtils.pick(pairs);
        const [xAns, yQuery] = chosen;

        const tableStr = pairs.map(([x, y]) => `(${x}, ${y})`).join(', \\;');

        return {
            type: 'free',
            rule: 'Inverse from Table',
            difficulty: 'hard',
            text: `The table below shows some values of \\(f\\). Find \\(f^{-1}(${yQuery})\\).`,
            latex: `\\(${tableStr}\\)`,
            answer: xAns,
            answerTex: String(xAns),
            options: [],
            hintTex: [
                `f^{-1}(y) = x \\text{ means } f(x) = y`,
                `\\text{Find } x \\text{ such that } f(x) = ${yQuery} \\text{ in the table}`
            ],
            explain: `<strong>Key idea:</strong> \\(f^{-1}(${yQuery}) = x\\) means \\(f(x) = ${yQuery}\\).<br><br>` +
                     `<strong>From the table:</strong> \\(f(${xAns}) = ${yQuery}\\), so \\(f^{-1}(${yQuery}) = ${xAns}\\).`
        };
    },

    /**
     * 10. qDomainInverse - Hard (MC)
     * Domain of f⁻¹ equals range of f.
     */
    qDomainInverse() {
        const a = MathUtils.nonZeroRandInt(1, 3);
        const b = MathUtils.randInt(-5, 5);
        const x1 = MathUtils.randInt(-5, 0);
        const x2 = x1 + MathUtils.randInt(2, 8);

        const y1 = a * x1 + b;
        const y2 = a * x2 + b;
        const yMin = Math.min(y1, y2);
        const yMax = Math.max(y1, y2);

        const fTex = COMP_INV.fmtLinear(a, b);

        const correctTex = `${yMin} \\leq x \\leq ${yMax}`;
        const options = [
            { value: 1, tex: `${yMin} \\leq x \\leq ${yMax}` },
            { value: 0, tex: `${x1} \\leq x \\leq ${x2}` },
            { value: 0, tex: `x \\in \\mathbb{R}` },
            { value: 0, tex: `${yMin} < x < ${yMax}` }
        ];

        return {
            type: 'mc',
            rule: 'Domain of Inverse',
            difficulty: 'hard',
            text: `The function \\(f(x) = ${fTex}\\) has domain \\(${x1} \\leq x \\leq ${x2}\\). Find the domain of \\(f^{-1}\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{Domain of } f^{-1} = \\text{Range of } f`,
                `f(${x1}) = ${y1}, \\quad f(${x2}) = ${y2}`
            ],
            explain: `<strong>Key principle:</strong> The domain of \\(f^{-1}\\) equals the range of \\(f\\).<br><br>` +
                     `<strong>Range of f:</strong> \\(f(${x1}) = ${y1}\\) and \\(f(${x2}) = ${y2}\\).<br>` +
                     `So range of \\(f\\) (and domain of \\(f^{-1}\\)) is \\(${yMin} \\leq x \\leq ${yMax}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => COMP_INV.qComposeNumerical(),     weight: 3, diff: 'easy' },
            { fn: () => COMP_INV.qComposeFG(),            weight: 2, diff: 'medium' },
            { fn: () => COMP_INV.qComposeGF(),            weight: 2, diff: 'medium' },
            { fn: () => COMP_INV.qInverseLinear(),        weight: 3, diff: 'easy' },
            { fn: () => COMP_INV.qInverseValue(),         weight: 3, diff: 'easy' },
            { fn: () => COMP_INV.qSolveThroughCompose(),  weight: 2, diff: 'medium' },
            { fn: () => COMP_INV.qVerifyInverse(),        weight: 2, diff: 'medium' },
            { fn: () => COMP_INV.qSelfInverse(),          weight: 2, diff: 'medium' },
            { fn: () => COMP_INV.qInverseFromTable(),     weight: 1, diff: 'hard' },
            { fn: () => COMP_INV.qDomainInverse(),        weight: 1, diff: 'hard' }
        ];

        let filtered = pool;
        if (COMP_INV.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (COMP_INV.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (COMP_INV.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

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
        COMP_INV.score = 0; COMP_INV.total = 0;
        COMP_INV.streak = 0; COMP_INV.answered = false; COMP_INV.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="COMP_INV.unload()">Composition &amp; Inverse (2.4-2.5)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Composition &amp; Inverse</h1>
                <p>IB Math AA 2.4-2.5 — f∘g, g∘f, inverse functions, self-inverse</p>
            </header>

            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="COMP_INV.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="COMP_INV.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="COMP_INV.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="COMP_INV.setLevel('hard')">Hard</button>
            </div>

            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="ci-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="ci-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="ci-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="ci-accuracy">-</div></div>
            </div>

            <div class="question-card" id="ci-question-card">
                <span class="rule-tag" id="ci-rule"></span>
                <span class="difficulty-tag" id="ci-difficulty"></span>
                <div class="question-text" id="ci-text"></div>
                <div class="question-prompt" id="ci-latex"></div>
                <div id="ci-options-area"></div>
            </div>

            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="ci-hint-box"></div>
            <div class="feedback" id="ci-feedback">
                <div class="feedback-title" id="ci-feedback-title"></div>
                <div class="feedback-explanation" id="ci-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="ci-hint-btn" onclick="COMP_INV.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="ci-next-btn" onclick="COMP_INV.next()" style="display:none;">Next Question</button>
            </div>`;

        COMP_INV.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('functions');
    },

    setLevel(lvl) {
        COMP_INV.level = lvl;
        document.querySelectorAll('.level-filter').forEach(b => b.classList.toggle('active', b.getAttribute('data-level') === lvl));
        COMP_INV.score = 0; COMP_INV.total = 0; COMP_INV.streak = 0;
        COMP_INV.updateStats(); COMP_INV.next();
    },

    next() {
        COMP_INV.answered = false; COMP_INV.hintIndex = 0;
        COMP_INV.currentQ = COMP_INV.pickQuestion();
        const q = COMP_INV.currentQ;

        document.getElementById('ci-rule').textContent = q.rule;
        const de = document.getElementById('ci-difficulty');
        de.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        de.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('ci-text').innerHTML = q.text;
        document.getElementById('ci-latex').innerHTML = q.latex;

        const oa = document.getElementById('ci-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((o, i) => { html += `<button class="option-btn" data-i="${i}" data-value="${o.value}" onclick="COMP_INV.checkMC(this)">\\(${o.tex}\\)</button>`; });
            html += '</div>';
            oa.innerHTML = html;
        } else {
            oa.innerHTML = `<div class="input-area"><input type="number" step="any" class="lr-math-field" id="ci-input" placeholder="Your answer" autocomplete="off" onkeydown="if(event.key==='Enter')COMP_INV.checkFree()"><button class="btn btn-primary" onclick="COMP_INV.checkFree()">Submit</button></div>`;
            setTimeout(() => { const i = document.getElementById('ci-input'); if (i) i.focus(); }, 100);
        }

        const hb = document.getElementById('ci-hint-box');
        hb.classList.remove('show'); hb.innerHTML = '';
        document.getElementById('ci-feedback').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('ci-next-btn').style.display = 'none';
        document.getElementById('ci-hint-btn').style.display = '';
        document.getElementById('ci-hint-btn').disabled = false;
        COMP_INV.renderAllKaTeX();
    },

    showHint() {
        const q = COMP_INV.currentQ;
        if (!q || !q.hintTex || COMP_INV.hintIndex >= q.hintTex.length) return;
        const hb = document.getElementById('ci-hint-box');
        hb.innerHTML = (COMP_INV.hintIndex === 0 ? '' : hb.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">') + `<span>\\(${q.hintTex[COMP_INV.hintIndex]}\\)</span>`;
        hb.classList.add('show'); COMP_INV.hintIndex++;
        if (COMP_INV.hintIndex >= q.hintTex.length) document.getElementById('ci-hint-btn').disabled = true;
        COMP_INV.renderAllKaTeX();
    },

    checkMC(btn) {
        if (COMP_INV.answered) return;
        COMP_INV.answered = true; COMP_INV.total++;
        const ok = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct'); });
        if (ok) { btn.classList.add('correct'); COMP_INV.score++; COMP_INV.streak++; }
        else { btn.classList.add('incorrect'); COMP_INV.streak = 0; }
        COMP_INV.showFeedback(ok); COMP_INV.updateStats();
    },

    checkFree() {
        if (COMP_INV.answered) return;
        const inp = document.getElementById('ci-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        COMP_INV.answered = true; COMP_INV.total++; inp.disabled = true;
        const ok = MathUtils.approxEqual(val, COMP_INV.currentQ.answer, 0.01);
        inp.style.borderColor = ok ? 'var(--success)' : 'var(--error)';
        inp.style.background = ok ? 'var(--success-light)' : 'var(--error-light)';
        if (ok) { COMP_INV.score++; COMP_INV.streak++; } else COMP_INV.streak = 0;
        const sb = inp.parentElement.querySelector('.btn-primary'); if (sb) sb.disabled = true;
        COMP_INV.showFeedback(ok); COMP_INV.updateStats();
    },

    showFeedback(ok) {
        const q = COMP_INV.currentQ;
        const fb = document.getElementById('ci-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('ci-feedback-title').textContent = ok ? (COMP_INV.streak > 1 ? `Correct! (${COMP_INV.streak} streak)` : 'Correct!') : 'Incorrect.';
        if (!ok) document.getElementById('ci-feedback-title').innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        document.getElementById('ci-feedback-explanation').innerHTML = q.explain;
        document.getElementById('ci-next-btn').style.display = '';
        document.getElementById('ci-hint-btn').style.display = 'none';
        COMP_INV.renderAllKaTeX();
    },

    updateStats() {
        const el = id => document.getElementById(id);
        if (el('ci-score')) el('ci-score').textContent = COMP_INV.score;
        if (el('ci-total')) el('ci-total').textContent = COMP_INV.total;
        if (el('ci-streak')) el('ci-streak').textContent = COMP_INV.streak;
        if (el('ci-accuracy')) el('ci-accuracy').textContent = COMP_INV.total > 0 ? Math.round(COMP_INV.score / COMP_INV.total * 100) + '%' : '-';
    },

    renderAllKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const c = document.getElementById('activity-container');
            if (c) renderMathInElement(c, { delimiters: [{ left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }], throwOnError: false });
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['composition-inverse'] = () => COMP_INV.load();
