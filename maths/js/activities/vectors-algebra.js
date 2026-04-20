/*
 * vectors-algebra.js - IB Math AA 3.10–3.12: Vector Algebra
 * Vectors, dot product, angles, unit vectors, scalar multiples
 */

const VECTORS = {
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
     * 1. qMagnitude2D - Easy
     * Find |v| = √(x²+y²). Uses clean Pythagorean pairs.
     */
    qMagnitude2D() {
        // Clean pairs (x, y, |v|)
        const pairs = [
            [3, 4, 5], [-3, 4, 5], [3, -4, 5], [-3, -4, 5],
            [5, 12, 13], [-5, 12, 13], [5, -12, 13],
            [6, 8, 10], [-6, 8, 10], [6, -8, 10],
            [8, 6, 10], [-8, 6, 10],
            [1, 0, 1], [0, 1, 1], [0, -3, 3], [3, 0, 3],
            [2, 2, null], [-2, 2, null], [2, -2, null]  // → 2√2
        ];
        const chosen = MathUtils.pick(pairs);
        const [x, y, exactInt] = chosen;

        const mag = Math.sqrt(x * x + y * y);
        const answer = Math.round(mag * 10000) / 10000;

        // Format |v| for display
        let magTex;
        if (exactInt !== null) {
            magTex = String(exactInt);
        } else {
            // 2√2 case
            magTex = `2\\sqrt{2} \\approx ${answer.toFixed(4)}`;
        }

        const xSq = x * x;
        const ySq = y * y;

        return {
            type: 'free',
            rule: 'Magnitude (2D)',
            difficulty: 'easy',
            text: 'Find the magnitude of the vector \\(\\mathbf{v}\\) below. Give your answer to 4 decimal places if not an integer.',
            latex: `\\(\\mathbf{v} = \\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}\\)`,
            answer: answer,
            answerTex: magTex,
            tol: 0.01,
            options: [],
            hintTex: [
                `|\\mathbf{v}| = \\sqrt{x^2 + y^2}`,
                `= \\sqrt{(${x})^2 + (${y})^2} = \\sqrt{${xSq} + ${ySq}} = \\sqrt{${xSq + ySq}}`
            ],
            explain: `<strong>Step 1:</strong> Use the magnitude formula \\(|\\mathbf{v}| = \\sqrt{x^2 + y^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(|\\mathbf{v}| = \\sqrt{(${x})^2 + (${y})^2} = \\sqrt{${xSq} + ${ySq}} = \\sqrt{${xSq + ySq}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(|\\mathbf{v}| = ${magTex}\\).`
        };
    },

    /**
     * 2. qMagnitude3D - Easy
     * Find |v| = √(x²+y²+z²). Uses extended Pythagorean triples giving integer answers.
     */
    qMagnitude3D() {
        // (x, y, z, |v|) — all give integer magnitudes
        const triples = [
            [1, 2, 2, 3],   [-1, 2, 2, 3],  [1, -2, 2, 3],
            [2, 3, 6, 7],   [-2, 3, 6, 7],  [2, -3, 6, 7],
            [1, 4, 8, 9],   [-1, 4, 8, 9],  [1, -4, 8, 9],
            [2, 6, 3, 7],   [-2, 6, 3, 7],  [2, -6, 3, 7],
            [4, 4, 2, 6],   [3, 4, 0, 5],   [0, 3, 4, 5],
            [2, 2, 1, 3],   [6, 2, 3, 7],   [4, 0, 3, 5]
        ];
        const [x, y, z, mag] = MathUtils.pick(triples);
        const xSq = x * x;
        const ySq = y * y;
        const zSq = z * z;

        return {
            type: 'free',
            rule: 'Magnitude (3D)',
            difficulty: 'easy',
            text: 'Find the magnitude of the vector \\(\\mathbf{v}\\) below.',
            latex: `\\(\\mathbf{v} = \\begin{pmatrix} ${x} \\\\ ${y} \\\\ ${z} \\end{pmatrix}\\)`,
            answer: mag,
            answerTex: String(mag),
            tol: 0.01,
            options: [],
            hintTex: [
                `|\\mathbf{v}| = \\sqrt{x^2 + y^2 + z^2}`,
                `= \\sqrt{(${x})^2 + (${y})^2 + (${z})^2} = \\sqrt{${xSq} + ${ySq} + ${zSq}} = \\sqrt{${xSq + ySq + zSq}}`
            ],
            explain: `<strong>Step 1:</strong> Use the 3D magnitude formula \\(|\\mathbf{v}| = \\sqrt{x^2 + y^2 + z^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(|\\mathbf{v}| = \\sqrt{(${x})^2 + (${y})^2 + (${z})^2} = \\sqrt{${xSq} + ${ySq} + ${zSq}} = \\sqrt{${xSq + ySq + zSq}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(|\\mathbf{v}| = ${mag}\\).`
        };
    },

    /**
     * 3. qDotProduct2D - Easy
     * Find a·b = x₁x₂ + y₁y₂ for 2D vectors with small integer components.
     */
    qDotProduct2D() {
        const ax = MathUtils.nonZeroRandInt(-4, 4);
        const ay = MathUtils.nonZeroRandInt(-4, 4);
        let bx, by;
        do { bx = MathUtils.randInt(-4, 4); by = MathUtils.randInt(-4, 4); } while (bx === 0 && by === 0);

        const dot = ax * bx + ay * by;

        return {
            type: 'free',
            rule: 'Dot Product (2D)',
            difficulty: 'easy',
            text: 'Find the dot product \\(\\mathbf{a} \\cdot \\mathbf{b}\\).',
            latex: `\\(\\mathbf{a} = \\begin{pmatrix} ${ax} \\\\ ${ay} \\end{pmatrix}, \\quad \\mathbf{b} = \\begin{pmatrix} ${bx} \\\\ ${by} \\end{pmatrix}\\)`,
            answer: dot,
            answerTex: String(dot),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y`,
                `= (${ax})(${bx}) + (${ay})(${by}) = ${ax * bx} + ${ay * by}`
            ],
            explain: `<strong>Step 1:</strong> Use the dot product formula \\(\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\mathbf{a} \\cdot \\mathbf{b} = (${ax})(${bx}) + (${ay})(${by}) = ${ax * bx} + ${ay * by}\\).<br><br>` +
                     `<strong>Step 3:</strong> Result: \\(\\mathbf{a} \\cdot \\mathbf{b} = ${dot}\\).`
        };
    },

    /**
     * 4. qDotProduct3D - Easy
     * Find a·b = x₁x₂ + y₁y₂ + z₁z₂ for 3D vectors.
     */
    qDotProduct3D() {
        const ax = MathUtils.nonZeroRandInt(-4, 4);
        const ay = MathUtils.randInt(-4, 4);
        const az = MathUtils.randInt(-4, 4);
        let bx, by, bz;
        do {
            bx = MathUtils.randInt(-4, 4);
            by = MathUtils.randInt(-4, 4);
            bz = MathUtils.randInt(-4, 4);
        } while (bx === 0 && by === 0 && bz === 0);

        const dot = ax * bx + ay * by + az * bz;

        return {
            type: 'free',
            rule: 'Dot Product (3D)',
            difficulty: 'easy',
            text: 'Find the dot product \\(\\mathbf{a} \\cdot \\mathbf{b}\\).',
            latex: `\\(\\mathbf{a} = \\begin{pmatrix} ${ax} \\\\ ${ay} \\\\ ${az} \\end{pmatrix}, \\quad \\mathbf{b} = \\begin{pmatrix} ${bx} \\\\ ${by} \\\\ ${bz} \\end{pmatrix}\\)`,
            answer: dot,
            answerTex: String(dot),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y + a_z b_z`,
                `= (${ax})(${bx}) + (${ay})(${by}) + (${az})(${bz}) = ${ax * bx} + ${ay * by} + ${az * bz}`
            ],
            explain: `<strong>Step 1:</strong> Use the 3D dot product formula \\(\\mathbf{a} \\cdot \\mathbf{b} = a_x b_x + a_y b_y + a_z b_z\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\((${ax})(${bx}) + (${ay})(${by}) + (${az})(${bz}) = ${ax * bx} + ${ay * by} + ${az * bz}\\).<br><br>` +
                     `<strong>Step 3:</strong> Result: \\(\\mathbf{a} \\cdot \\mathbf{b} = ${dot}\\).`
        };
    },

    /**
     * 5. qAngleBetween - Medium
     * Find θ = arccos(a·b / (|a||b|)) in degrees. Uses vectors giving clean angles.
     */
    qAngleBetween() {
        // Predefined vector pairs giving exact clean angles
        const scenarios = [
            // 90° — perpendicular pairs
            { a: [1, 0], b: [0, 1],   angle: 90  },
            { a: [2, 0], b: [0, 3],   angle: 90  },
            { a: [1, 1], b: [1, -1],  angle: 90  },
            { a: [3, 1], b: [-1, 3],  angle: 90  },
            { a: [2, -3], b: [3, 2],  angle: 90  },
            // 0° — parallel (same direction)
            { a: [1, 2], b: [2, 4],   angle: 0   },
            { a: [3, 0], b: [5, 0],   angle: 0   },
            { a: [1, 1], b: [3, 3],   angle: 0   },
            // 180° — anti-parallel
            { a: [1, 0], b: [-2, 0],  angle: 180 },
            { a: [2, 1], b: [-4, -2], angle: 180 },
            // 60° — cos θ = 0.5
            { a: [2, 0], b: [1, Math.sqrt(3)], angle: 60, approx: true },
            // 45° — using unit-like vectors
            { a: [1, 0], b: [1, 1],   angle: 45, approx: true },
            { a: [2, 2], b: [4, 0],   angle: 45, approx: true },
        ];

        const sc = MathUtils.pick(scenarios);
        const [ax, ay] = sc.a;
        const [bx, by] = sc.b;
        const angle = sc.angle;

        const dot = ax * bx + ay * by;
        const magA = Math.sqrt(ax * ax + ay * ay);
        const magB = Math.sqrt(bx * bx + by * by);

        // Format display — hide irrational components
        function vecTex(x, y) {
            const xStr = Number.isInteger(x) ? String(x) : x.toFixed(3);
            const yStr = Number.isInteger(y) ? String(y) : y.toFixed(3);
            return `\\begin{pmatrix} ${xStr} \\\\ ${yStr} \\end{pmatrix}`;
        }

        const dotCalc = Math.round(dot * 1000) / 1000;
        const magACalc = Math.round(magA * 1000) / 1000;
        const magBCalc = Math.round(magB * 1000) / 1000;
        const cosVal = Math.round((dot / (magA * magB)) * 1000) / 1000;

        return {
            type: 'free',
            rule: 'Angle Between Vectors',
            difficulty: 'medium',
            text: 'Find the angle \\(\\theta\\) between the two vectors below in degrees. Give your answer to 1 decimal place.',
            latex: `\\(\\mathbf{a} = ${vecTex(ax, ay)}, \\quad \\mathbf{b} = ${vecTex(bx, by)}\\)`,
            answer: angle,
            answerTex: `${angle}^\\circ`,
            tol: 0.5,
            options: [],
            hintTex: [
                `\\cos\\theta = \\frac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}|\\,|\\mathbf{b}|}`,
                `\\mathbf{a}\\cdot\\mathbf{b} = ${dotCalc},\\quad |\\mathbf{a}| = ${magACalc},\\quad |\\mathbf{b}| = ${magBCalc}`
            ],
            explain: `<strong>Step 1:</strong> Compute the dot product: \\(\\mathbf{a}\\cdot\\mathbf{b} = ${dotCalc}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute the magnitudes: \\(|\\mathbf{a}| = ${magACalc}\\), \\(|\\mathbf{b}| = ${magBCalc}\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply the formula: \\(\\cos\\theta = \\dfrac{${dotCalc}}{${magACalc} \\times ${magBCalc}} = ${cosVal}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(\\theta = \\arccos(${cosVal}) = ${angle}^\\circ\\).`
        };
    },

    /**
     * 6. qPerpendicularCheck - Medium (MC)
     * Are two vectors perpendicular? Check via dot product.
     */
    qPerpendicularCheck() {
        // Decide outcome: perpendicular, parallel, or neither
        const outcomes = ['perpendicular', 'parallel', 'neither'];
        const outcome = MathUtils.pick(outcomes);

        let ax, ay, bx, by, dot, correctIdx, correctLabel;

        if (outcome === 'perpendicular') {
            // Ensure dot = 0
            ax = MathUtils.nonZeroRandInt(-4, 4);
            ay = MathUtils.nonZeroRandInt(-4, 4);
            // b must satisfy ax*bx + ay*by = 0 → bx = ay*k, by = -ax*k
            const k = MathUtils.nonZeroRandInt(-2, 2);
            bx = ay * k;
            by = -ax * k;
            dot = 0;
            correctLabel = 'Perpendicular';
            correctIdx = 0;
        } else if (outcome === 'parallel') {
            ax = MathUtils.nonZeroRandInt(-3, 3);
            ay = MathUtils.nonZeroRandInt(-3, 3);
            const k = MathUtils.nonZeroRandInt(-3, 3);
            bx = ax * k;
            by = ay * k;
            dot = ax * bx + ay * by;
            correctLabel = k > 0 ? 'Parallel' : 'Anti-parallel';
            correctIdx = k > 0 ? 1 : 3;
        } else {
            // Neither — ensure dot ≠ 0 and not scalar multiples
            do {
                ax = MathUtils.nonZeroRandInt(-4, 4);
                ay = MathUtils.nonZeroRandInt(-4, 4);
                bx = MathUtils.nonZeroRandInt(-4, 4);
                by = MathUtils.nonZeroRandInt(-4, 4);
                dot = ax * bx + ay * by;
            } while (dot === 0 || ax * by === ay * bx);
            correctLabel = 'Neither perpendicular nor parallel';
            correctIdx = 2;
        }

        const magA = Math.sqrt(ax * ax + ay * ay);
        const magB = Math.sqrt(bx * bx + by * by);

        // Build 4 fixed options and mark the correct one
        const optionLabels = [
            'Perpendicular',
            'Parallel',
            'Neither perpendicular nor parallel',
            'Anti-parallel'
        ];

        const options = optionLabels.map((label, i) => ({
            value: i === correctIdx ? 1 : 0,
            tex: `\\text{${label}}`
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Perpendicular Check',
            difficulty: 'medium',
            text: 'Which of the following best describes the relationship between vectors \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\)?',
            latex: `\\(\\mathbf{a} = \\begin{pmatrix} ${ax} \\\\ ${ay} \\end{pmatrix}, \\quad \\mathbf{b} = \\begin{pmatrix} ${bx} \\\\ ${by} \\end{pmatrix}\\)`,
            answer: 1,
            answerTex: `\\text{${correctLabel}}`,
            options: shuffled,
            hintTex: [
                `\\text{Compute } \\mathbf{a}\\cdot\\mathbf{b} = a_x b_x + a_y b_y`,
                `= (${ax})(${bx}) + (${ay})(${by}) = ${dot}\\quad (\\text{perpendicular} \\iff \\mathbf{a}\\cdot\\mathbf{b}=0)`
            ],
            explain: `<strong>Step 1:</strong> Compute the dot product: \\(\\mathbf{a}\\cdot\\mathbf{b} = (${ax})(${bx}) + (${ay})(${by}) = ${dot}\\).<br><br>` +
                     (outcome === 'perpendicular'
                         ? `<strong>Step 2:</strong> Since \\(\\mathbf{a}\\cdot\\mathbf{b} = 0\\), the vectors are <strong>perpendicular</strong>.`
                         : outcome === 'parallel'
                             ? `<strong>Step 2:</strong> The dot product is non-zero. Check if \\(\\mathbf{b} = k\\mathbf{a}\\): \\(\\mathbf{b} = (${bx / ax})\\mathbf{a}\\), so they are ${correctLabel.toLowerCase()}.`
                             : `<strong>Step 2:</strong> Since \\(\\mathbf{a}\\cdot\\mathbf{b} = ${dot} \\neq 0\\), they are not perpendicular. Since \\(\\mathbf{b}\\) is not a scalar multiple of \\(\\mathbf{a}\\), they are <strong>neither perpendicular nor parallel</strong>.`)
        };
    },

    /**
     * 7. qUnitVector - Medium
     * Given v, find the x-component of the unit vector û = v/|v|.
     */
    qUnitVector() {
        // Use 2D vectors from clean magnitude pairs so answer is a clean decimal
        const pairs = [
            [3, 4, 5], [-3, 4, 5], [3, -4, 5],
            [5, 12, 13], [-5, 12, 13],
            [6, 8, 10], [-6, 8, 10],
            [8, 6, 10], [-8, 6, 10],
            [1, 0, 1], [0, 1, 1], [0, -3, 3],
            [1, 2, null], [2, 1, null], [-1, 2, null]
        ];
        const chosen = MathUtils.pick(pairs);
        const [x, y, magExact] = chosen;

        const mag = magExact !== null ? magExact : Math.sqrt(x * x + y * y);
        const uxRaw = x / mag;
        const ux = Math.round(uxRaw * 10000) / 10000;

        const magTex = magExact !== null ? String(magExact) : `\\sqrt{${x * x + y * y}}`;

        return {
            type: 'free',
            rule: 'Unit Vector',
            difficulty: 'medium',
            text: 'Find the \\(x\\)-component of the unit vector \\(\\hat{\\mathbf{v}} = \\dfrac{\\mathbf{v}}{|\\mathbf{v}|}\\). Give your answer to 4 decimal places.',
            latex: `\\(\\mathbf{v} = \\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}\\)`,
            answer: ux,
            answerTex: ux.toFixed(4),
            tol: 0.001,
            options: [],
            hintTex: [
                `|\\mathbf{v}| = \\sqrt{${x}^2 + ${y}^2} = ${magTex}`,
                `\\hat{v}_x = \\frac{x}{|\\mathbf{v}|} = \\frac{${x}}{${magTex}}`
            ],
            explain: `<strong>Step 1:</strong> Find the magnitude: \\(|\\mathbf{v}| = \\sqrt{(${x})^2 + (${y})^2} = \\sqrt{${x * x + y * y}} = ${mag}\\).<br><br>` +
                     `<strong>Step 2:</strong> Divide each component by \\(|\\mathbf{v}|\\): \\(\\hat{\\mathbf{v}} = \\frac{1}{${mag}}\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 3:</strong> The \\(x\\)-component is \\(\\hat{v}_x = \\dfrac{${x}}{${mag}} = ${ux.toFixed(4)}\\).`
        };
    },

    /**
     * 8. qVectorAB - Easy
     * Find the x-component of vector from A to B, i.e. B - A.
     */
    qVectorAB() {
        const ax = MathUtils.randInt(-6, 6);
        const ay = MathUtils.randInt(-6, 6);
        const bx = MathUtils.randInt(-6, 6);
        const by = MathUtils.randInt(-6, 6);

        const abx = bx - ax;
        const aby = by - ay;

        return {
            type: 'free',
            rule: 'Vector AB',
            difficulty: 'easy',
            text: 'Find the \\(x\\)-component of the vector \\(\\overrightarrow{AB}\\) from \\(A\\) to \\(B\\).',
            latex: `\\(A = (${ax},\\,${ay})\\) and \\(B = (${bx},\\,${by})\\)`,
            answer: abx,
            answerTex: String(abx),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\overrightarrow{AB} = B - A = \\begin{pmatrix} b_x - a_x \\\\ b_y - a_y \\end{pmatrix}`,
                `= \\begin{pmatrix} ${bx} - (${ax}) \\\\ ${by} - (${ay}) \\end{pmatrix} = \\begin{pmatrix} ${abx} \\\\ ${aby} \\end{pmatrix}`
            ],
            explain: `<strong>Step 1:</strong> The vector from \\(A\\) to \\(B\\) is \\(\\overrightarrow{AB} = B - A\\).<br><br>` +
                     `<strong>Step 2:</strong> Subtract coordinates: \\(\\overrightarrow{AB} = \\begin{pmatrix} ${bx} - (${ax}) \\\\ ${by} - (${ay}) \\end{pmatrix} = \\begin{pmatrix} ${abx} \\\\ ${aby} \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 3:</strong> The \\(x\\)-component is \\(${abx}\\).`
        };
    },

    /**
     * 9. qScalarMultiple - Easy
     * Given v = (x,y,z) and scalar k, find |kv| = |k|·|v|.
     */
    qScalarMultiple() {
        // Use 3D triples with integer magnitude, paired with scalar k
        const triples = [
            [1, 2, 2, 3],
            [2, 3, 6, 7],
            [1, 4, 8, 9],
            [2, 6, 3, 7],
            [4, 4, 2, 6],
            [0, 3, 4, 5],
            [3, 4, 0, 5],
            [6, 2, 3, 7]
        ];
        const [x, y, z, mag] = MathUtils.pick(triples);
        const k = MathUtils.pick([2, 3, -2, -3]);

        const answer = Math.abs(k) * mag;

        return {
            type: 'free',
            rule: 'Scalar Multiple',
            difficulty: 'easy',
            text: `Given \\(\\mathbf{v}\\) below and scalar \\(k = ${k}\\), find \\(|k\\mathbf{v}|\\).`,
            latex: `\\(\\mathbf{v} = \\begin{pmatrix} ${x} \\\\ ${y} \\\\ ${z} \\end{pmatrix}, \\quad k = ${k}\\)`,
            answer: answer,
            answerTex: String(answer),
            tol: 0.01,
            options: [],
            hintTex: [
                `|k\\mathbf{v}| = |k|\\,|\\mathbf{v}|`,
                `|\\mathbf{v}| = \\sqrt{${x}^2 + ${y}^2 + ${z}^2} = ${mag}, \\quad |k\\mathbf{v}| = ${Math.abs(k)} \\times ${mag}`
            ],
            explain: `<strong>Step 1:</strong> Use the scalar multiple rule: \\(|k\\mathbf{v}| = |k|\\,|\\mathbf{v}|\\).<br><br>` +
                     `<strong>Step 2:</strong> Find \\(|\\mathbf{v}| = \\sqrt{(${x})^2 + (${y})^2 + (${z})^2} = \\sqrt{${x*x + y*y + z*z}} = ${mag}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(|k\\mathbf{v}| = |${k}| \\times ${mag} = ${Math.abs(k)} \\times ${mag} = ${answer}\\).`
        };
    },

    /**
     * 10. qMidpoint - Medium
     * Find the x-component of midpoint M = ½(A + B).
     * Coordinates chosen so x-sum is even, giving integer x-component.
     */
    qMidpoint() {
        // Generate coordinates with even sums for clean integer answers
        const ax = MathUtils.randInt(-5, 5);
        const ay = MathUtils.randInt(-5, 5);
        // Make bx have same parity as ax so sum is even
        let bx, by;
        do {
            bx = MathUtils.randInt(-5, 5);
        } while ((ax + bx) % 2 !== 0);
        do {
            by = MathUtils.randInt(-5, 5);
        } while ((ay + by) % 2 !== 0);

        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2;

        return {
            type: 'free',
            rule: 'Midpoint (Vectors)',
            difficulty: 'medium',
            text: 'Find the \\(x\\)-coordinate of the midpoint \\(M\\) of the segment from \\(A\\) to \\(B\\).',
            latex: `\\(A = (${ax},\\,${ay})\\) and \\(B = (${bx},\\,${by})\\)`,
            answer: mx,
            answerTex: String(mx),
            tol: 0.01,
            options: [],
            hintTex: [
                `M = \\frac{1}{2}(A + B) = \\left(\\frac{a_x + b_x}{2},\\,\\frac{a_y + b_y}{2}\\right)`,
                `M_x = \\frac{${ax} + ${bx}}{2} = \\frac{${ax + bx}}{2}`
            ],
            explain: `<strong>Step 1:</strong> Use the midpoint formula \\(M = \\dfrac{1}{2}(A + B)\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(M_x = \\dfrac{a_x + b_x}{2} = \\dfrac{${ax} + ${bx}}{2} = \\dfrac{${ax + bx}}{2} = ${mx}\\).<br><br>` +
                     `<strong>Step 3:</strong> The full midpoint is \\(M = (${mx},\\,${my})\\). The \\(x\\)-coordinate is \\(${mx}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => VECTORS.qMagnitude2D(),        difficulty: 'easy',   weight: 3 },
            { fn: () => VECTORS.qMagnitude3D(),        difficulty: 'easy',   weight: 3 },
            { fn: () => VECTORS.qDotProduct2D(),       difficulty: 'easy',   weight: 3 },
            { fn: () => VECTORS.qDotProduct3D(),       difficulty: 'easy',   weight: 3 },
            { fn: () => VECTORS.qAngleBetween(),       difficulty: 'medium', weight: 2 },
            { fn: () => VECTORS.qPerpendicularCheck(), difficulty: 'medium', weight: 2 },
            { fn: () => VECTORS.qUnitVector(),         difficulty: 'medium', weight: 2 },
            { fn: () => VECTORS.qVectorAB(),           difficulty: 'easy',   weight: 3 },
            { fn: () => VECTORS.qScalarMultiple(),     difficulty: 'easy',   weight: 3 },
            { fn: () => VECTORS.qMidpoint(),           difficulty: 'medium', weight: 2 }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (VECTORS.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (VECTORS.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (VECTORS.level === 'hard') {
            // No hard questions defined; fall back to medium
            filtered = pool.filter(p => p.difficulty === 'medium');
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
        VECTORS.score = 0;
        VECTORS.total = 0;
        VECTORS.streak = 0;
        VECTORS.answered = false;
        VECTORS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="VECTORS.unload()">Vector Algebra (3.10–3.12)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Vector Algebra</h1>
                <p>IB Math AA 3.10–3.12 – Vectors, dot product, and angles</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="VECTORS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="VECTORS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="VECTORS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="VECTORS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="vec-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="vec-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="vec-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="vec-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="vec-question-card">
                <span class="rule-tag"       id="vec-rule"></span>
                <span class="difficulty-tag" id="vec-difficulty"></span>
                <div class="question-text"   id="vec-text"></div>
                <div class="question-prompt" id="vec-latex"></div>
                <div id="vec-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="vec-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="vec-feedback">
                <div class="feedback-title"       id="vec-feedback-title"></div>
                <div class="feedback-explanation" id="vec-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="vec-hint-btn" onclick="VECTORS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="vec-next-btn" onclick="VECTORS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        VECTORS.next();
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
        VECTORS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        VECTORS.score = 0;
        VECTORS.total = 0;
        VECTORS.streak = 0;
        VECTORS.updateStats();
        VECTORS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        VECTORS.answered = false;
        VECTORS.hintIndex = 0;
        VECTORS.currentQ = VECTORS.pickQuestion();
        const q = VECTORS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('vec-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('vec-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('vec-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('vec-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('vec-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="VECTORS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="vec-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')VECTORS.checkFree()">
                    <button class="btn btn-primary" onclick="VECTORS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('vec-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('vec-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('vec-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('vec-next-btn').style.display = 'none';
        document.getElementById('vec-hint-btn').style.display = '';
        document.getElementById('vec-hint-btn').disabled = false;

        // Render KaTeX
        VECTORS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = VECTORS.currentQ;
        if (!q || !q.hintTex || VECTORS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('vec-hint-box');
        const prev = VECTORS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[VECTORS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        VECTORS.hintIndex++;

        if (VECTORS.hintIndex >= q.hintTex.length) {
            document.getElementById('vec-hint-btn').disabled = true;
        }

        VECTORS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (VECTORS.answered) return;
        VECTORS.answered = true;
        VECTORS.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            VECTORS.score++;
            VECTORS.streak++;
        } else {
            btn.classList.add('incorrect');
            VECTORS.streak = 0;
        }

        VECTORS.showFeedback(isCorrect);
        VECTORS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (VECTORS.answered) return;

        const inp = document.getElementById('vec-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        VECTORS.answered = true;
        VECTORS.total++;
        inp.disabled = true;

        const q = VECTORS.currentQ;
        const tol = q.tol !== undefined ? q.tol : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            VECTORS.score++;
            VECTORS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            VECTORS.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        VECTORS.showFeedback(isCorrect);
        VECTORS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = VECTORS.currentQ;
        const fb    = document.getElementById('vec-feedback');
        const title = document.getElementById('vec-feedback-title');
        const explanation = document.getElementById('vec-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = VECTORS.streak > 1
                ? `Correct! (${VECTORS.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('vec-next-btn').style.display = '';
        document.getElementById('vec-hint-btn').style.display = 'none';

        VECTORS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('vec-score');
        const totalEl  = document.getElementById('vec-total');
        const streakEl = document.getElementById('vec-streak');
        const accEl    = document.getElementById('vec-accuracy');

        if (scoreEl)  scoreEl.textContent  = VECTORS.score;
        if (totalEl)  totalEl.textContent  = VECTORS.total;
        if (streakEl) streakEl.textContent = VECTORS.streak;
        if (accEl) {
            accEl.textContent = VECTORS.total > 0
                ? Math.round((VECTORS.score / VECTORS.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['vectors-algebra'] = () => VECTORS.load();
