/*
 * arcs-sectors.js - IB Math AA 3.4: Arcs & Sectors
 * Arc length, sector area, and segments (all angles in radians)
 */

const ARCS_SECTORS = {
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

    /**
     * Return a LaTeX string for a radian angle expressed as a fraction of π.
     * e.g. Math.PI/3  → "\\frac{\\pi}{3}"
     *      Math.PI/2  → "\\frac{\\pi}{2}"
     *      2*Math.PI/3 → "\\frac{2\\pi}{3}"
     *      Math.PI    → "\\pi"
     */
    _thetaTeX(theta) {
        // Map common radian values to their LaTeX representations
        const map = [
            { val: Math.PI / 6,       tex: '\\dfrac{\\pi}{6}' },
            { val: Math.PI / 4,       tex: '\\dfrac{\\pi}{4}' },
            { val: Math.PI / 3,       tex: '\\dfrac{\\pi}{3}' },
            { val: Math.PI / 2,       tex: '\\dfrac{\\pi}{2}' },
            { val: 2 * Math.PI / 3,   tex: '\\dfrac{2\\pi}{3}' },
            { val: 3 * Math.PI / 4,   tex: '\\dfrac{3\\pi}{4}' },
            { val: 5 * Math.PI / 6,   tex: '\\dfrac{5\\pi}{6}' },
            { val: Math.PI,           tex: '\\pi' }
        ];
        for (const entry of map) {
            if (Math.abs(theta - entry.val) < 1e-9) return entry.tex;
        }
        return theta.toFixed(4);
    },

    /**
     * Return a plain-English fraction string for radian angle labels.
     */
    _thetaLabel(theta) {
        const map = [
            { val: Math.PI / 6,       label: 'π/6' },
            { val: Math.PI / 4,       label: 'π/4' },
            { val: Math.PI / 3,       label: 'π/3' },
            { val: Math.PI / 2,       label: 'π/2' },
            { val: 2 * Math.PI / 3,   label: '2π/3' },
            { val: 3 * Math.PI / 4,   label: '3π/4' },
            { val: 5 * Math.PI / 6,   label: '5π/6' },
            { val: Math.PI,           label: 'π' }
        ];
        for (const entry of map) {
            if (Math.abs(theta - entry.val) < 1e-9) return entry.label;
        }
        return theta.toFixed(4);
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qArcLength - Easy
     * l = rθ. Given r and θ (fraction of π), find arc length.
     */
    qArcLength() {
        const radii   = [3, 4, 5, 6, 8, 10];
        const thetas  = [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3];

        const r     = MathUtils.pick(radii);
        const theta = MathUtils.pick(thetas);

        const answer    = parseFloat((r * theta).toFixed(2));
        const answerTex = answer.toFixed(2);
        const thetaTex  = ARCS_SECTORS._thetaTeX(theta);

        return {
            type: 'free',
            rule: 'Arc Length',
            difficulty: 'easy',
            text: 'Find the arc length of a sector with the radius and angle given below.',
            latex: `\\(r = ${r}\\) cm, \\(\\;\\theta = ${thetaTex}\\) rad`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `l = r\\theta`,
                `l = ${r} \\times ${thetaTex} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the arc length formula \\(l = r\\theta\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(l = ${r} \\times ${thetaTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(l = ${answerTex}\\) cm (2 d.p.).`
        };
    },

    /**
     * 2. qSectorArea - Easy
     * A = ½r²θ. Given r and θ (fraction of π), find sector area.
     */
    qSectorArea() {
        const radii  = [3, 4, 5, 6, 8, 10];
        const thetas = [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3];

        const r     = MathUtils.pick(radii);
        const theta = MathUtils.pick(thetas);

        const answer    = parseFloat((0.5 * r * r * theta).toFixed(2));
        const answerTex = answer.toFixed(2);
        const thetaTex  = ARCS_SECTORS._thetaTeX(theta);

        return {
            type: 'free',
            rule: 'Sector Area',
            difficulty: 'easy',
            text: 'Find the area of a sector with the radius and angle given below.',
            latex: `\\(r = ${r}\\) cm, \\(\\;\\theta = ${thetaTex}\\) rad`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `A = \\tfrac{1}{2}r^2\\theta`,
                `A = \\tfrac{1}{2} \\times ${r}^2 \\times ${thetaTex} = \\tfrac{1}{2} \\times ${r * r} \\times ${thetaTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the sector area formula \\(A = \\dfrac{1}{2}r^2\\theta\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(A = \\dfrac{1}{2} \\times ${r}^2 \\times ${thetaTex} = \\dfrac{1}{2} \\times ${r * r} \\times ${thetaTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(A = ${answerTex}\\) cm² (2 d.p.).`
        };
    },

    /**
     * 3. qFindAngle - Easy
     * l = rθ → θ = l/r. Given l and r, find θ in radians.
     */
    qFindAngle() {
        const ls = [4, 6, 8, 9, 10, 12];
        const rs = [2, 3, 4, 5, 6];

        const l = MathUtils.pick(ls);
        const r = MathUtils.pick(rs);

        const answer    = parseFloat((l / r).toFixed(2));
        const answerTex = answer.toFixed(2);

        return {
            type: 'free',
            rule: 'Find Angle',
            difficulty: 'easy',
            text: 'A sector has the arc length and radius given below. Find the angle θ in radians.',
            latex: `\\(l = ${l}\\) cm, \\(\\;r = ${r}\\) cm`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `l = r\\theta \\implies \\theta = \\frac{l}{r}`,
                `\\theta = \\frac{${l}}{${r}} = ${answerTex} \\text{ rad}`
            ],
            explain: `<strong>Step 1:</strong> Rearrange \\(l = r\\theta\\) to get \\(\\theta = \\dfrac{l}{r}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\theta = \\dfrac{${l}}{${r}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(\\theta = ${answerTex}\\) rad (2 d.p.).`
        };
    },

    /**
     * 4. qFindRadius - Medium
     * A = ½r²θ → r = √(2A/θ). Given A and θ, find r.
     */
    qFindRadius() {
        // Build pairs where r is a nice number (integer or 1 d.p.)
        // Choose r first, then compute A = 0.5 * r^2 * theta, round A to integer
        const radii  = [3, 4, 5, 6, 8, 10];
        const thetas = [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3];

        const r     = MathUtils.pick(radii);
        const theta = MathUtils.pick(thetas);

        // Compute A and round to integer so the question gives a clean integer A
        const A      = Math.round(0.5 * r * r * theta);
        // Recompute the exact answer from the rounded A
        const answer    = parseFloat(Math.sqrt(2 * A / theta).toFixed(2));
        const answerTex = answer.toFixed(2);
        const thetaTex  = ARCS_SECTORS._thetaTeX(theta);

        return {
            type: 'free',
            rule: 'Find Radius',
            difficulty: 'medium',
            text: 'A sector has the area and angle given below. Find the radius r.',
            latex: `\\(A = ${A}\\) cm², \\(\\;\\theta = ${thetaTex}\\) rad`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `A = \\tfrac{1}{2}r^2\\theta \\implies r^2 = \\frac{2A}{\\theta}`,
                `r = \\sqrt{\\frac{2 \\times ${A}}{${thetaTex}}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Use \\(A = \\dfrac{1}{2}r^2\\theta\\) and rearrange: \\(r^2 = \\dfrac{2A}{\\theta}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(r^2 = \\dfrac{2 \\times ${A}}{${thetaTex}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Take the square root: \\(r = ${answerTex}\\) cm (2 d.p.).`
        };
    },

    /**
     * 5. qConvertDegRad - Easy
     * Convert degrees to radians: rad = deg × π/180.
     */
    qConvertDegRad() {
        const degrees = [30, 45, 60, 90, 120, 135, 150, 180];
        const deg     = MathUtils.pick(degrees);
        const rad     = deg * Math.PI / 180;

        const answer    = parseFloat(rad.toFixed(4));
        const answerTex = answer.toFixed(4);

        // Build a nice LaTeX for the exact answer
        const exactMap = {
            30:  '\\dfrac{\\pi}{6}',
            45:  '\\dfrac{\\pi}{4}',
            60:  '\\dfrac{\\pi}{3}',
            90:  '\\dfrac{\\pi}{2}',
            120: '\\dfrac{2\\pi}{3}',
            135: '\\dfrac{3\\pi}{4}',
            150: '\\dfrac{5\\pi}{6}',
            180: '\\pi'
        };
        const exactTex = exactMap[deg];

        return {
            type: 'free',
            rule: 'Degrees → Radians',
            difficulty: 'easy',
            text: `Convert the angle below from degrees to radians. Give your answer to 4 decimal places.`,
            latex: `\\(${deg}^\\circ\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{rad} = \\text{deg} \\times \\frac{\\pi}{180}`,
                `= ${deg} \\times \\frac{\\pi}{180} = ${exactTex} \\approx ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the conversion formula \\(\\text{rad} = \\text{deg} \\times \\dfrac{\\pi}{180}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(${deg} \\times \\dfrac{\\pi}{180} = ${exactTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(${exactTex} \\approx ${answerTex}\\) rad (4 d.p.).`
        };
    },

    /**
     * 6. qPerimeterSector - Medium
     * P = 2r + rθ = r(2 + θ). Given r and θ, find P.
     */
    qPerimeterSector() {
        const radii  = [3, 4, 5, 6, 8, 10];
        const thetas = [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3];

        const r     = MathUtils.pick(radii);
        const theta = MathUtils.pick(thetas);

        const answer    = parseFloat((r * (2 + theta)).toFixed(2));
        const answerTex = answer.toFixed(2);
        const thetaTex  = ARCS_SECTORS._thetaTeX(theta);

        return {
            type: 'free',
            rule: 'Sector Perimeter',
            difficulty: 'medium',
            text: 'Find the perimeter of a sector with the radius and angle given below. (Perimeter = arc + two radii.)',
            latex: `\\(r = ${r}\\) cm, \\(\\;\\theta = ${thetaTex}\\) rad`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P = 2r + r\\theta = r(2 + \\theta)`,
                `P = ${r}(2 + ${thetaTex}) = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> The perimeter of a sector consists of the arc length and two radii: \\(P = r\\theta + 2r = r(2 + \\theta)\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(P = ${r}(2 + ${thetaTex})\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(P = ${answerTex}\\) cm (2 d.p.).`
        };
    },

    /**
     * 7. qSegmentArea - Hard
     * Segment area = ½r²(θ − sinθ).
     */
    qSegmentArea() {
        const radii  = [4, 5, 6, 8, 10];
        const thetas = [Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3];

        const r     = MathUtils.pick(radii);
        const theta = MathUtils.pick(thetas);

        const answer    = parseFloat((0.5 * r * r * (theta - Math.sin(theta))).toFixed(2));
        const answerTex = answer.toFixed(2);
        const thetaTex  = ARCS_SECTORS._thetaTeX(theta);
        const sinVal    = parseFloat(Math.sin(theta).toFixed(4));

        return {
            type: 'free',
            rule: 'Segment Area',
            difficulty: 'hard',
            text: 'Find the area of the minor segment formed by a chord in a circle with the radius and central angle given below.',
            latex: `\\(r = ${r}\\) cm, \\(\\;\\theta = ${thetaTex}\\) rad`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `A_{\\text{segment}} = A_{\\text{sector}} - A_{\\text{triangle}} = \\tfrac{1}{2}r^2\\theta - \\tfrac{1}{2}r^2\\sin\\theta`,
                `= \\tfrac{1}{2}r^2(\\theta - \\sin\\theta) = \\tfrac{1}{2} \\times ${r}^2 \\times (${thetaTex} - \\sin ${thetaTex})`
            ],
            explain: `<strong>Step 1:</strong> Segment area = Sector area − Triangle area.<br><br>` +
                     `<strong>Step 2:</strong> Use \\(A = \\dfrac{1}{2}r^2(\\theta - \\sin\\theta)\\).<br><br>` +
                     `<strong>Step 3:</strong> Note that \\(\\sin(${thetaTex}) = ${sinVal}\\).<br><br>` +
                     `<strong>Step 4:</strong> Substitute: \\(A = \\dfrac{1}{2} \\times ${r}^2 \\times (${thetaTex} - ${sinVal})\\).<br><br>` +
                     `<strong>Step 5:</strong> Calculate: \\(A = ${answerTex}\\) cm² (2 d.p.).`
        };
    },

    /**
     * 8. qArcDegrees - Easy
     * Given angle in degrees, find arc length. l = r × (deg × π/180).
     */
    qArcDegrees() {
        const radii   = [5, 6, 8, 10];
        const degrees = [60, 90, 120, 150, 180];

        const r   = MathUtils.pick(radii);
        const deg = MathUtils.pick(degrees);

        const theta     = deg * Math.PI / 180;
        const answer    = parseFloat((r * theta).toFixed(2));
        const answerTex = answer.toFixed(2);

        const exactMap = {
            60:  '\\dfrac{\\pi}{3}',
            90:  '\\dfrac{\\pi}{2}',
            120: '\\dfrac{2\\pi}{3}',
            150: '\\dfrac{5\\pi}{6}',
            180: '\\pi'
        };
        const thetaTex = exactMap[deg];

        return {
            type: 'free',
            rule: 'Arc Length (degrees)',
            difficulty: 'easy',
            text: 'A sector has the radius and angle (in degrees) given below. Find the arc length.',
            latex: `\\(r = ${r}\\) cm, \\(\\;\\theta = ${deg}^\\circ\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Convert degrees to radians first: } \\theta = ${deg} \\times \\frac{\\pi}{180} = ${thetaTex}`,
                `l = r\\theta = ${r} \\times ${thetaTex} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Convert the angle to radians: \\(\\theta = ${deg}^\\circ \\times \\dfrac{\\pi}{180} = ${thetaTex}\\) rad.<br><br>` +
                     `<strong>Step 2:</strong> Use the arc length formula: \\(l = r\\theta = ${r} \\times ${thetaTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(l = ${answerTex}\\) cm (2 d.p.).`
        };
    },

    /**
     * 9. qSectorFraction - Medium (MC)
     * What fraction of the full circle area is a sector with angle θ?
     * Answer = θ/(2π).
     */
    qSectorFraction() {
        const thetas = [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3, Math.PI];
        const theta  = MathUtils.pick(thetas);

        // Fraction = theta / (2π). Express as n/d.
        // theta = k*π/m → fraction = k/(2m)
        const fractionMap = {
            [Math.PI / 6]:       { n: 1, d: 12 },
            [Math.PI / 4]:       { n: 1, d: 8  },
            [Math.PI / 3]:       { n: 1, d: 6  },
            [Math.PI / 2]:       { n: 1, d: 4  },
            [2 * Math.PI / 3]:   { n: 1, d: 3  },
            [Math.PI]:           { n: 1, d: 2  }
        };

        // Match by value
        let correctFrac = { n: 1, d: 6 };
        for (const key of Object.keys(fractionMap)) {
            if (Math.abs(parseFloat(key) - theta) < 1e-9) {
                correctFrac = fractionMap[key];
                break;
            }
        }

        const correctTex = `\\dfrac{${correctFrac.n}}{${correctFrac.d}}`;
        const thetaTex   = ARCS_SECTORS._thetaTeX(theta);

        // All possible fraction options (pool of all)
        const allFracs = [
            { n: 1, d: 12 },
            { n: 1, d: 8  },
            { n: 1, d: 6  },
            { n: 1, d: 4  },
            { n: 1, d: 3  },
            { n: 1, d: 2  }
        ];

        const distractors = allFracs.filter(f => !(f.n === correctFrac.n && f.d === correctFrac.d));

        // Pick 3 distractors
        const shuffledDist = MathUtils.shuffle(distractors).slice(0, 3);

        const optionTexts = [correctTex];
        for (const f of shuffledDist) {
            const t = `\\dfrac{${f.n}}{${f.d}}`;
            if (!optionTexts.includes(t)) optionTexts.push(t);
        }
        // Ensure 4 options
        while (optionTexts.length < 4) {
            optionTexts.push(`\\dfrac{1}{${optionTexts.length + 10}}`);
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Sector Fraction',
            difficulty: 'medium',
            text: `A sector has central angle \\(\\theta = ${thetaTex}\\) rad. What fraction of the full circle's area is this sector?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Full circle has angle } 2\\pi. \\text{ Sector fraction} = \\frac{\\theta}{2\\pi}`,
                `= \\frac{${thetaTex}}{2\\pi} = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> The full circle subtends an angle of \\(2\\pi\\) at the centre.<br><br>` +
                     `<strong>Step 2:</strong> The sector fraction is \\(\\dfrac{\\theta}{2\\pi} = \\dfrac{${thetaTex}}{2\\pi}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: the sector is \\(${correctTex}\\) of the full circle.`
        };
    },

    /**
     * 10. qCombinedPerimeter - Hard
     * Perimeter of sector + chord = rθ + 2r·sin(θ/2).
     */
    qCombinedPerimeter() {
        const radii  = [4, 5, 6, 8, 10];
        const thetas = [Math.PI / 3, Math.PI / 2, 2 * Math.PI / 3];

        const r     = MathUtils.pick(radii);
        const theta = MathUtils.pick(thetas);

        const arc      = r * theta;
        const chord    = 2 * r * Math.sin(theta / 2);
        const answer   = parseFloat((arc + chord).toFixed(2));
        const answerTex = answer.toFixed(2);
        const thetaTex  = ARCS_SECTORS._thetaTeX(theta);
        const halfThetaTex = ARCS_SECTORS._thetaTeX(theta / 2);
        const sinVal    = parseFloat(Math.sin(theta / 2).toFixed(4));
        const arcVal    = parseFloat(arc.toFixed(4));
        const chordVal  = parseFloat(chord.toFixed(4));

        return {
            type: 'free',
            rule: 'Arc + Chord Perimeter',
            difficulty: 'hard',
            text: 'A shape is bounded by a sector arc and the chord joining its two radii endpoints. Find the total perimeter.',
            latex: `\\(r = ${r}\\) cm, \\(\\;\\theta = ${thetaTex}\\) rad`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Chord length} = 2r\\sin\\!\\left(\\frac{\\theta}{2}\\right)`,
                `P = r\\theta + 2r\\sin\\!\\left(\\frac{\\theta}{2}\\right) = ${r} \\times ${thetaTex} + 2 \\times ${r} \\times \\sin(${halfThetaTex})`
            ],
            explain: `<strong>Step 1:</strong> The perimeter consists of the arc and the chord.<br><br>` +
                     `<strong>Step 2:</strong> Arc length: \\(l = r\\theta = ${r} \\times ${thetaTex} \\approx ${arcVal.toFixed(2)}\\) cm.<br><br>` +
                     `<strong>Step 3:</strong> Chord length (from the isoceles triangle): \\(c = 2r\\sin\\!\\left(\\dfrac{\\theta}{2}\\right) = 2 \\times ${r} \\times \\sin(${halfThetaTex}) = 2 \\times ${r} \\times ${sinVal} \\approx ${chordVal.toFixed(2)}\\) cm.<br><br>` +
                     `<strong>Step 4:</strong> Total perimeter: \\(P = ${arcVal.toFixed(2)} + ${chordVal.toFixed(2)} = ${answerTex}\\) cm (2 d.p.).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => ARCS_SECTORS.qArcLength(),           weight: 3 },
            { fn: () => ARCS_SECTORS.qSectorArea(),          weight: 3 },
            { fn: () => ARCS_SECTORS.qFindAngle(),           weight: 3 },
            { fn: () => ARCS_SECTORS.qFindRadius(),          weight: 2 },
            { fn: () => ARCS_SECTORS.qConvertDegRad(),       weight: 3 },
            { fn: () => ARCS_SECTORS.qPerimeterSector(),     weight: 2 },
            { fn: () => ARCS_SECTORS.qSegmentArea(),         weight: 1 },
            { fn: () => ARCS_SECTORS.qArcDegrees(),          weight: 3 },
            { fn: () => ARCS_SECTORS.qSectorFraction(),      weight: 2 },
            { fn: () => ARCS_SECTORS.qCombinedPerimeter(),   weight: 1 }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (ARCS_SECTORS.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 4, 7].includes(i));
        } else if (ARCS_SECTORS.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 5, 8].includes(i));
        } else if (ARCS_SECTORS.level === 'hard') {
            filtered = pool.filter((_, i) => [6, 9].includes(i));
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
        ARCS_SECTORS.score    = 0;
        ARCS_SECTORS.total    = 0;
        ARCS_SECTORS.streak   = 0;
        ARCS_SECTORS.answered = false;
        ARCS_SECTORS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="ARCS_SECTORS.unload()">Arcs &amp; Sectors (3.4)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Arcs &amp; Sectors</h1>
                <p>IB Math AA 3.4 – Arc length, sector area, and segments</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="ARCS_SECTORS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="ARCS_SECTORS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="ARCS_SECTORS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="ARCS_SECTORS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="arc-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="arc-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="arc-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="arc-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="arc-question-card">
                <span class="rule-tag" id="arc-rule"></span>
                <span class="difficulty-tag" id="arc-difficulty"></span>
                <div class="question-text" id="arc-text"></div>
                <div class="question-prompt" id="arc-latex"></div>
                <div id="arc-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="arc-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="arc-feedback">
                <div class="feedback-title" id="arc-feedback-title"></div>
                <div class="feedback-explanation" id="arc-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="arc-hint-btn" onclick="ARCS_SECTORS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="arc-next-btn" onclick="ARCS_SECTORS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        ARCS_SECTORS.next();
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
        ARCS_SECTORS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        ARCS_SECTORS.score  = 0;
        ARCS_SECTORS.total  = 0;
        ARCS_SECTORS.streak = 0;
        ARCS_SECTORS.updateStats();
        ARCS_SECTORS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        ARCS_SECTORS.answered  = false;
        ARCS_SECTORS.hintIndex = 0;
        ARCS_SECTORS.currentQ  = ARCS_SECTORS.pickQuestion();
        const q = ARCS_SECTORS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('arc-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('arc-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('arc-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('arc-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('arc-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="ARCS_SECTORS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="arc-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')ARCS_SECTORS.checkFree()">
                    <button class="btn btn-primary" onclick="ARCS_SECTORS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('arc-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('arc-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('arc-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('arc-next-btn').style.display = 'none';
        document.getElementById('arc-hint-btn').style.display = '';
        document.getElementById('arc-hint-btn').disabled = false;

        // Render KaTeX
        ARCS_SECTORS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = ARCS_SECTORS.currentQ;
        if (!q || !q.hintTex || ARCS_SECTORS.hintIndex >= q.hintTex.length) return;

        const hintBox    = document.getElementById('arc-hint-box');
        const hintContent = ARCS_SECTORS.hintIndex === 0
            ? ''
            : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[ARCS_SECTORS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        ARCS_SECTORS.hintIndex++;

        if (ARCS_SECTORS.hintIndex >= q.hintTex.length) {
            document.getElementById('arc-hint-btn').disabled = true;
        }

        ARCS_SECTORS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (ARCS_SECTORS.answered) return;
        ARCS_SECTORS.answered = true;
        ARCS_SECTORS.total++;

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
            ARCS_SECTORS.score++;
            ARCS_SECTORS.streak++;
        } else {
            btn.classList.add('incorrect');
            ARCS_SECTORS.streak = 0;
        }

        ARCS_SECTORS.showFeedback(isCorrect);
        ARCS_SECTORS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (ARCS_SECTORS.answered) return;

        const inp = document.getElementById('arc-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        ARCS_SECTORS.answered = true;
        ARCS_SECTORS.total++;
        inp.disabled = true;

        const q = ARCS_SECTORS.currentQ;

        // Use tighter tolerance for degree-conversion (4 d.p.) questions
        const tol = (q.rule === 'Degrees → Radians') ? 0.001 : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background  = 'var(--success-light)';
            ARCS_SECTORS.score++;
            ARCS_SECTORS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background  = 'var(--error-light)';
            ARCS_SECTORS.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        ARCS_SECTORS.showFeedback(isCorrect);
        ARCS_SECTORS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q           = ARCS_SECTORS.currentQ;
        const fb          = document.getElementById('arc-feedback');
        const title       = document.getElementById('arc-feedback-title');
        const explanation = document.getElementById('arc-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (ARCS_SECTORS.streak > 1) {
                title.textContent = `Correct! (${ARCS_SECTORS.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('arc-next-btn').style.display = '';
        document.getElementById('arc-hint-btn').style.display = 'none';

        ARCS_SECTORS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('arc-score');
        const totalEl  = document.getElementById('arc-total');
        const streakEl = document.getElementById('arc-streak');
        const accEl    = document.getElementById('arc-accuracy');

        if (scoreEl)  scoreEl.textContent  = ARCS_SECTORS.score;
        if (totalEl)  totalEl.textContent  = ARCS_SECTORS.total;
        if (streakEl) streakEl.textContent = ARCS_SECTORS.streak;
        if (accEl) {
            accEl.textContent = ARCS_SECTORS.total > 0
                ? Math.round((ARCS_SECTORS.score / ARCS_SECTORS.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['arcs-sectors'] = () => ARCS_SECTORS.load();
