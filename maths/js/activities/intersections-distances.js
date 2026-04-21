/*
 * intersections-distances.js - IB Math AA 3.18: Intersections and Distances
 * Line–plane intersections, distances between points / lines / planes in 3D
 */

const INT_DIST = {
    prefix: 'intd-',
    unload: 'geometry-trig',

    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       ACTIVITY API (MathUtils framework hooks)
       ──────────────────────────────────────────── */

    load() { INT_DIST.fullLoad(); },

    init() {
        this.questions = [
            () => INT_DIST.qDistanceTwoPoints(),
            () => INT_DIST.qMidpoint3D(),
            () => INT_DIST.qDistancePointToLine2D(),
            () => INT_DIST.qLineIntersection2D(),
            () => INT_DIST.qPointOnPlane(),
            () => INT_DIST.qDistancePointToPlane(),
            () => INT_DIST.qAngleBetweenLines(),
            () => INT_DIST.qParallelOrIntersect(),
            () => INT_DIST.qLinePlaneIntersect(),
            () => INT_DIST.qDistanceBetweenParallelPlanes()
        ];
        
    },

    pool() { return MathUtils.pick(this.questions)(); },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qDistanceTwoPoints — distance between two 3D points (free, numeric)
     * d = sqrt((x2-x1)² + (y2-y1)² + (z2-z1)²)
     * Uses Pythagorean triples to ensure clean sqrt (3-4-5, 5-12-13, etc.)
     * scaled so the full 3D distance is recognisable.
     */
    qDistanceTwoPoints() {
        // Use known integer-distance triples (dx, dy, dz) → |d|² = dx²+dy²+dz²
        const triples = [
            { d: [1, 2, 2], dist: 3  },
            { d: [2, 2, 1], dist: 3  },
            { d: [2, 1, 2], dist: 3  },
            { d: [2, 3, 6], dist: 7  },
            { d: [3, 6, 2], dist: 7  },
            { d: [6, 2, 3], dist: 7  },
            { d: [1, 4, 8], dist: 9  },
            { d: [4, 4, 7], dist: 9  },
            { d: [2, 4, 4], dist: 6  },
            { d: [4, 2, 4], dist: 6  },
            { d: [1, 2, 14], dist: Math.sqrt(201) }, // fallback non-integer
            { d: [3, 4, 0], dist: 5  },
            { d: [0, 3, 4], dist: 5  },
            { d: [5, 12, 0], dist: 13 },
            { d: [0, 5, 12], dist: 13 }
        ];

        const chosen = MathUtils.pick(triples);
        const [dx, dy, dz] = chosen.d;

        // Random signs for each component
        const sx = MathUtils.pick([-1, 1]);
        const sy = MathUtils.pick([-1, 1]);
        const sz = MathUtils.pick([-1, 1]);

        const x1 = MathUtils.randInt(-4, 4);
        const y1 = MathUtils.randInt(-4, 4);
        const z1 = MathUtils.randInt(-4, 4);
        const x2 = x1 + sx * dx;
        const y2 = y1 + sy * dy;
        const z2 = z1 + sz * dz;

        const dist = chosen.dist;
        const distRounded = Math.round(dist * 100) / 100;

        const ddx = x2 - x1;
        const ddy = y2 - y1;
        const ddz = z2 - z1;
        const sumSq = ddx * ddx + ddy * ddy + ddz * ddz;

        // Build answer TeX
        const isInt = Number.isInteger(dist);
        const answerTex = isInt ? String(dist) : `\\sqrt{${sumSq}}`;

        return {
            type: 'free',
            rule: 'Distance Between 3D Points',
            difficulty: 'easy',
            text: `Find the distance between the points \\(A(${x1},\\,${y1},\\,${z1})\\) and \\(B(${x2},\\,${y2},\\,${z2})\\).` +
                  (isInt ? '' : ' Give your answer to 2 decimal places.'),
            latex: `\\(d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}\\)`,
            answer: isInt ? dist : distRounded,
            answerTex: answerTex,
            tolerance: 0.01,
            options: [],
            hintTex: [
                `d = \\sqrt{(${x2}-(${x1}))^2 + (${y2}-(${y1}))^2 + (${z2}-(${z1}))^2}`,
                `= \\sqrt{${ddx}^2 + ${ddy}^2 + ${ddz}^2} = \\sqrt{${ddx*ddx} + ${ddy*ddy} + ${ddz*ddz}} = \\sqrt{${sumSq}}`
            ],
            explain: `<strong>Step 1:</strong> Use the 3D distance formula:<br>` +
                     `\\(d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute the differences:<br>` +
                     `\\(\\Delta x = ${x2} - (${x1}) = ${ddx}\\), \\(\\Delta y = ${y2} - (${y1}) = ${ddy}\\), \\(\\Delta z = ${z2} - (${z1}) = ${ddz}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute:<br>` +
                     `\\(d = \\sqrt{(${ddx})^2 + (${ddy})^2 + (${ddz})^2} = \\sqrt{${ddx*ddx} + ${ddy*ddy} + ${ddz*ddz}} = \\sqrt{${sumSq}} = ${isInt ? dist : distRounded}\\).`
        };
    },

    /**
     * 2. qMidpoint3D — midpoint of two 3D points, give one coordinate (free, numeric)
     * M = ((x1+x2)/2, (y1+y2)/2, (z1+z2)/2)
     * Use even sums so the answer is always an integer.
     */
    qMidpoint3D() {
        // Ensure integer midpoints by making each coordinate pair sum to an even number
        function evenPair() {
            const a = MathUtils.randInt(-5, 5);
            // Pick b so a+b is even
            const b = a + MathUtils.pick([-4, -2, 0, 2, 4]) + MathUtils.nonZeroRandInt(-1, 1) * 2;
            return [a, b];
        }

        const [x1, x2] = evenPair();
        const [y1, y2] = evenPair();
        const [z1, z2] = evenPair();

        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const mz = (z1 + z2) / 2;

        // Ask for one random coordinate
        const coord = MathUtils.pick(['x', 'y', 'z']);
        let answer, coordTex;
        if (coord === 'x') { answer = mx; coordTex = 'x'; }
        else if (coord === 'y') { answer = my; coordTex = 'y'; }
        else { answer = mz; coordTex = 'z'; }

        return {
            type: 'free',
            rule: 'Midpoint in 3D',
            difficulty: 'easy',
            text: `Find the ${coordTex}-coordinate of the midpoint \\(M\\) of the segment from \\(A(${x1},\\,${y1},\\,${z1})\\) to \\(B(${x2},\\,${y2},\\,${z2})\\).`,
            latex: `\\(M = \\left(\\frac{x_1+x_2}{2},\\; \\frac{y_1+y_2}{2},\\; \\frac{z_1+z_2}{2}\\right)\\)`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `M_{${coordTex}} = \\frac{${coordTex}_1 + ${coordTex}_2}{2}`,
                `= \\frac{${coord === 'x' ? x1 : coord === 'y' ? y1 : z1} + ${coord === 'x' ? x2 : coord === 'y' ? y2 : z2}}{2} = \\frac{${coord === 'x' ? x1+x2 : coord === 'y' ? y1+y2 : z1+z2}}{2} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> The midpoint formula gives each coordinate as the mean of the two endpoints.<br><br>` +
                     `<strong>Step 2:</strong> Full midpoint: \\(M = \\left(\\frac{${x1}+${x2}}{2},\\;\\frac{${y1}+${y2}}{2},\\;\\frac{${z1}+${z2}}{2}\\right) = (${mx},\\,${my},\\,${mz})\\).<br><br>` +
                     `<strong>Step 3:</strong> The ${coordTex}-coordinate is \\(${answer}\\).`
        };
    },

    /**
     * 3. qDistancePointToLine2D — distance from point to line ax+by+c=0 (free, numeric)
     * d = |ax₀ + by₀ + c| / sqrt(a²+b²)
     * Use values that give a clean integer or simple radical.
     */
    qDistancePointToLine2D() {
        // Configurations that yield integer answers
        const configs = [
            { a: 1, b: 0, c: -3, x0: 0, y0: 0, dist: 3 },   // |0+0-3|/1 = 3
            { a: 0, b: 1, c: -4, x0: 0, y0: 0, dist: 4 },   // |0+0-4|/1 = 4
            { a: 3, b: 4, c: 0,  x0: 5, y0: 0, dist: 3 },   // |15|/5 = 3
            { a: 3, b: 4, c: 0,  x0: 0, y0: 5, dist: 4 },   // |20|/5 = 4
            { a: 5, b: 12, c: -13, x0: 0, y0: 0, dist: 1 }, // |-13|/13 = 1
            { a: 3, b: 4, c: -25, x0: 0, y0: 0, dist: 5 },  // |-25|/5 = 5
            { a: 1, b: 0, c: -6, x0: 2, y0: 5, dist: 4 },   // |2-6|/1 = 4
            { a: 0, b: 1, c: -3, x0: 7, y0: 5, dist: 2 },   // |5-3|/1 = 2
            { a: 3, b: 4, c: 0,  x0: -5, y0: 0, dist: 3 },  // |-15|/5 = 3
            { a: 5, b: 12, c: 0, x0: 13, y0: 0, dist: 5 }   // |65|/13 = 5
        ];

        const cfg = MathUtils.pick(configs);
        const { a, b, c, x0, y0, dist } = cfg;
        const num = Math.abs(a * x0 + b * y0 + c);
        const denom = Math.sqrt(a * a + b * b);

        // Render line equation ax + by + c = 0 nicely
        function lineTex(a, b, c) {
            let s = '';
            if (a !== 0) s += (a === 1 ? '' : a === -1 ? '-' : String(a)) + 'x';
            if (b !== 0) {
                if (s !== '') s += b > 0 ? ' + ' : ' - ';
                const absB = Math.abs(b);
                s += (absB === 1 ? '' : String(absB)) + 'y';
            }
            if (c !== 0) {
                if (s !== '') s += c > 0 ? ' + ' : ' - ';
                s += Math.abs(c);
            }
            return s + ' = 0';
        }

        return {
            type: 'free',
            rule: 'Distance: Point to Line (2D)',
            difficulty: 'easy',
            text: `Find the perpendicular distance from the point \\(P(${x0},\\,${y0})\\) to the line \\(${lineTex(a, b, c)}\\).`,
            latex: `\\(d = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}\\)`,
            answer: dist,
            answerTex: String(dist),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{Identify } a=${a},\\, b=${b},\\, c=${c}, \\text{ and point } (${x0},${y0})`,
                `d = \\frac{|${a}(${x0}) + ${b}(${y0}) + (${c})|}{\\sqrt{${a}^2+${b}^2}} = \\frac{${num}}{${denom}} = ${dist}`
            ],
            explain: `<strong>Step 1:</strong> Identify the line parameters: \\(a=${a}\\), \\(b=${b}\\), \\(c=${c}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate the numerator:<br>` +
                     `\\(|${a}(${x0}) + ${b}(${y0}) + (${c})| = |${a*x0 + b*y0 + c}| = ${num}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate the denominator:<br>` +
                     `\\(\\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a*a + b*b}} = ${denom}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(d = \\dfrac{${num}}{${denom}} = ${dist}\\).`
        };
    },

    /**
     * 4. qLineIntersection2D — find x where two lines intersect (free, numeric)
     * Line 1: y = m1*x + c1, Line 2: y = m2*x + c2
     * m1*x + c1 = m2*x + c2 → x = (c2 - c1) / (m1 - m2)
     * Construct so x is a small integer.
     */
    qLineIntersection2D() {
        let m1, m2, c1, c2, xInt;
        // Construct: pick integer x-intersection, then build lines through it
        do {
            xInt = MathUtils.randInt(-4, 4);
            m1 = MathUtils.nonZeroRandInt(-4, 4);
            m2 = MathUtils.nonZeroRandInt(-4, 4);
        } while (m1 === m2);

        // y at intersection
        const yInt = m1 * xInt + MathUtils.randInt(-3, 3);
        c1 = yInt - m1 * xInt;
        c2 = yInt - m2 * xInt;

        function lineFmt(m, c) {
            const cPart = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
            const mPart = m === 1 ? '' : m === -1 ? '-' : String(m);
            return `y = ${mPart}x${cPart}`;
        }

        return {
            type: 'free',
            rule: 'Line Intersection (2D)',
            difficulty: 'easy',
            text: `Find the x-coordinate of the intersection point of the two lines below.`,
            latex: `\\(${lineFmt(m1, c1)}\\) and \\(${lineFmt(m2, c2)}\\)`,
            answer: xInt,
            answerTex: String(xInt),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{Set the two expressions for } y \\text{ equal: } ${m1}x ${c1 >= 0 ? '+' : ''} ${c1} = ${m2}x ${c2 >= 0 ? '+' : ''} ${c2}`,
                `(${m1} - ${m2})x = ${c2} - ${c1} \\implies ${m1-m2}x = ${c2-c1} \\implies x = ${xInt}`
            ],
            explain: `<strong>Step 1:</strong> At the intersection, both lines give the same \\(y\\). Set them equal:<br>` +
                     `\\(${m1}x + (${c1}) = ${m2}x + (${c2})\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange:<br>` +
                     `\\((${m1} - ${m2})x = ${c2} - (${c1})\\)<br>` +
                     `\\(${m1 - m2}x = ${c2 - c1}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(x = \\dfrac{${c2 - c1}}{${m1 - m2}} = ${xInt}\\).`
        };
    },

    /**
     * 5. qPointOnPlane — given plane equation, check if point lies on it (MC: yes/no)
     * Plane: ax+by+cz = d. The point either satisfies this or not.
     */
    qPointOnPlane() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.nonZeroRandInt(-3, 3);
        const c = MathUtils.nonZeroRandInt(-3, 3);

        const onPlane = MathUtils.pick([true, false]);
        let x0, y0, z0, d;

        if (onPlane) {
            x0 = MathUtils.randInt(-4, 4);
            y0 = MathUtils.randInt(-4, 4);
            z0 = MathUtils.randInt(-4, 4);
            d = a * x0 + b * y0 + c * z0;
        } else {
            x0 = MathUtils.randInt(-4, 4);
            y0 = MathUtils.randInt(-4, 4);
            z0 = MathUtils.randInt(-4, 4);
            const baseD = a * x0 + b * y0 + c * z0;
            d = baseD + MathUtils.nonZeroRandInt(-3, 3);
        }

        function planeTex(a, b, c, d) {
            const bSign = b < 0 ? '-' : '+';
            const cSign = c < 0 ? '-' : '+';
            return `${a}x ${bSign} ${Math.abs(b)}y ${cSign} ${Math.abs(c)}z = ${d}`;
        }

        const lhsVal = a * x0 + b * y0 + c * z0;
        const correctLabel = onPlane ? 'Yes' : 'No';
        const correctTex   = onPlane ? '\\text{Yes — the point lies on the plane}' : '\\text{No — the point does not lie on the plane}';

        const options = MathUtils.shuffle([
            { label: 'Yes', value: onPlane ? 1 : 0,  tex: '\\text{Yes — the point lies on the plane}' },
            { label: 'No',  value: onPlane ? 0 : 1,  tex: '\\text{No — the point does not lie on the plane}' }
        ]);

        return {
            type: 'mc',
            rule: 'Point on Plane',
            difficulty: 'easy',
            text: `Does the point \\(P(${x0},\\,${y0},\\,${z0})\\) lie on the plane below?`,
            latex: `\\(${planeTex(a, b, c, d)}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Substitute the coordinates into the left-hand side of the plane equation}`,
                `${a}(${x0}) + ${b}(${y0}) + ${c}(${z0}) = ${a*x0} + ${b*y0} + ${c*z0} = ${lhsVal}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x=${x0}\\), \\(y=${y0}\\), \\(z=${z0}\\) into the plane's LHS:<br>` +
                     `\\(${a}(${x0}) + ${b}(${y0}) + ${c}(${z0}) = ${a*x0} + ${b*y0} + ${c*z0} = ${lhsVal}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compare with RHS \\(d = ${d}\\):<br>` +
                     (onPlane
                         ? `\\(${lhsVal} = ${d}\\) ✓ — the point <strong>lies on the plane</strong>.`
                         : `\\(${lhsVal} \\neq ${d}\\) — the point does <strong>not</strong> lie on the plane.`)
        };
    },

    /**
     * 6. qDistancePointToPlane — distance from 3D point to plane ax+by+cz=d (free, numeric)
     * d = |ax₀ + by₀ + cz₀ - d| / sqrt(a²+b²+c²)
     * Use Pythagorean magnitudes for the normal so the denominator is an integer.
     */
    qDistancePointToPlane() {
        // Normal vectors with integer magnitudes
        const normals = [
            { n: [1, 0, 0], mag: 1 },
            { n: [0, 1, 0], mag: 1 },
            { n: [0, 0, 1], mag: 1 },
            { n: [1, 2, 2], mag: 3 },
            { n: [2, 2, 1], mag: 3 },
            { n: [2, 1, 2], mag: 3 },
            { n: [2, 3, 6], mag: 7 },
            { n: [3, 6, 2], mag: 7 },
            { n: [6, 2, 3], mag: 7 }
        ];

        const picked = MathUtils.pick(normals);
        const [a, b, c] = picked.n;
        const mag = picked.mag;

        // Build a plane with integer d, and a point at integer distance from it
        const distInt = MathUtils.randInt(1, 5);
        // Plane: a·0 + b·0 + c·0 = 0 → d = 0; then shift point by distInt * mag along normal
        const d = MathUtils.randInt(-6, 6);

        // Choose point: start on plane (ax+by+cz = d), then shift perpendicularly
        // A point on the plane: if a≠0 pick (d/a,0,0); if that's fractional, use a multiple
        // Instead: just pick point coords and compute the distance normally
        const x0 = MathUtils.randInt(-4, 4);
        const y0 = MathUtils.randInt(-4, 4);
        const z0 = MathUtils.randInt(-4, 4);
        const num = Math.abs(a * x0 + b * y0 + c * z0 - d);
        const dist = num / mag;
        const distRounded = Math.round(dist * 100) / 100;
        const isInt = Number.isInteger(dist);

        function planeTex(a, b, c, d) {
            const bSign = b < 0 ? '-' : '+';
            const cSign = c < 0 ? '-' : '+';
            if (b === 0 && c === 0) return `${a}x = ${d}`;
            if (b === 0) return `${a}x ${cSign} ${Math.abs(c)}z = ${d}`;
            if (c === 0) return `${a}x ${bSign} ${Math.abs(b)}y = ${d}`;
            return `${a}x ${bSign} ${Math.abs(b)}y ${cSign} ${Math.abs(c)}z = ${d}`;
        }

        const sumSq = a*a + b*b + c*c;

        return {
            type: 'free',
            rule: 'Distance: Point to Plane',
            difficulty: 'medium',
            text: `Find the perpendicular distance from the point \\(P(${x0},\\,${y0},\\,${z0})\\) to the plane \\(${planeTex(a, b, c, d)}\\).` +
                  (isInt ? '' : ' Give your answer to 2 decimal places.'),
            latex: `\\(d = \\dfrac{|ax_0 + by_0 + cz_0 - d|}{\\sqrt{a^2+b^2+c^2}}\\)`,
            answer: isInt ? dist : distRounded,
            answerTex: isInt ? String(dist) : `\\dfrac{${num}}{${mag}}`,
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{Normal } \\mathbf{n} = (${a},${b},${c}),\\; |\\mathbf{n}| = \\sqrt{${sumSq}} = ${mag}`,
                `d = \\frac{|${a}(${x0}) + ${b}(${y0}) + ${c}(${z0}) - ${d}|}{${mag}} = \\frac{${num}}{${mag}} = ${distRounded}`
            ],
            explain: `<strong>Step 1:</strong> Use the point-to-plane distance formula:<br>` +
                     `\\(d = \\dfrac{|ax_0 + by_0 + cz_0 - d|}{\\sqrt{a^2+b^2+c^2}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate the numerator:<br>` +
                     `\\(|${a}(${x0}) + ${b}(${y0}) + ${c}(${z0}) - (${d})| = |${a*x0 + b*y0 + c*z0 - d}| = ${num}\\).<br><br>` +
                     `<strong>Step 3:</strong> Denominator: \\(\\sqrt{${a}^2+${b}^2+${c}^2} = \\sqrt{${sumSq}} = ${mag}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(d = \\dfrac{${num}}{${mag}} = ${distRounded}\\).`
        };
    },

    /**
     * 7. qAngleBetweenLines — angle between two direction vectors in degrees (free, numeric)
     * cos θ = |d₁·d₂| / (|d₁||d₂|). Use 3D vectors with clean angles (0°, 30°, 45°, 60°, 90°).
     */
    qAngleBetweenLines() {
        // 3D direction vector pairs with known angles
        const pairs = [
            // 90°: perpendicular vectors
            { d1: [1, 0, 0], d2: [0, 1, 0], angle: 90 },
            { d1: [1, 0, 0], d2: [0, 0, 1], angle: 90 },
            { d1: [0, 1, 0], d2: [0, 0, 1], angle: 90 },
            { d1: [1, 1, 0], d2: [0, 0, 1], angle: 90 },
            { d1: [1, 0, -1], d2: [1, 0, 1], angle: 90 },  // dot = 1-1 = 0
            { d1: [2, 1, 0], d2: [0, 0, 1], angle: 90 },
            { d1: [1, 2, 3], d2: [3, 0, -1], angle: 90 },  // dot = 3+0-3 = 0
            // 0°: parallel vectors (angle = 0)
            { d1: [1, 0, 0], d2: [3, 0, 0], angle: 0  },
            { d1: [1, 1, 1], d2: [2, 2, 2], angle: 0  },
            { d1: [1, 2, 3], d2: [2, 4, 6], angle: 0  }
        ];

        const chosen = MathUtils.pick(pairs);
        const [d1x, d1y, d1z] = chosen.d1;
        const [d2x, d2y, d2z] = chosen.d2;

        const dot   = d1x*d2x + d1y*d2y + d1z*d2z;
        const mag1  = Math.sqrt(d1x*d1x + d1y*d1y + d1z*d1z);
        const mag2  = Math.sqrt(d2x*d2x + d2y*d2y + d2z*d2z);
        const cosVal = Math.abs(dot) / (mag1 * mag2);
        const thetaDeg = Math.round(Math.acos(Math.min(1, cosVal)) * (180 / Math.PI) * 10) / 10;

        const mag1sq = d1x*d1x + d1y*d1y + d1z*d1z;
        const mag2sq = d2x*d2x + d2y*d2y + d2z*d2z;

        return {
            type: 'free',
            rule: 'Angle Between Lines',
            difficulty: 'medium',
            text: `Find the acute angle (in degrees) between two lines with direction vectors \\(\\mathbf{d}_1 = (${d1x},\\,${d1y},\\,${d1z})\\) and \\(\\mathbf{d}_2 = (${d2x},\\,${d2y},\\,${d2z})\\).`,
            latex: `\\(\\cos\\theta = \\dfrac{|\\mathbf{d}_1 \\cdot \\mathbf{d}_2|}{|\\mathbf{d}_1|\\,|\\mathbf{d}_2|}\\)`,
            answer: thetaDeg,
            answerTex: `${thetaDeg}^{\\circ}`,
            tolerance: 0.5,
            options: [],
            hintTex: [
                `\\mathbf{d}_1 \\cdot \\mathbf{d}_2 = ${d1x}(${d2x}) + ${d1y}(${d2y}) + ${d1z}(${d2z}) = ${dot}`,
                `\\cos\\theta = \\frac{|${dot}|}{\\sqrt{${mag1sq}} \\times \\sqrt{${mag2sq}}} \\implies \\theta = \\arccos\\left(${cosVal.toFixed(4)}\\right)`
            ],
            explain: `<strong>Step 1:</strong> Dot product:<br>` +
                     `\\(\\mathbf{d}_1 \\cdot \\mathbf{d}_2 = (${d1x})(${d2x}) + (${d1y})(${d2y}) + (${d1z})(${d2z}) = ${dot}\\).<br><br>` +
                     `<strong>Step 2:</strong> Magnitudes:<br>` +
                     `\\(|\\mathbf{d}_1| = \\sqrt{${mag1sq}} = ${mag1}\\),\\; \\(|\\mathbf{d}_2| = \\sqrt{${mag2sq}} = ${mag2}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\cos\\theta = \\dfrac{|${dot}|}{${mag1} \\times ${mag2}} = ${cosVal.toFixed(4)}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(\\theta = \\arccos(${cosVal.toFixed(4)}) = ${thetaDeg}^{\\circ}\\).`
        };
    },

    /**
     * 8. qParallelOrIntersect — given two lines, identify if parallel/intersecting/skew (MC)
     * Lines in 3D: r₁ = a₁ + t·d₁ and r₂ = a₂ + s·d₂
     * Parallel: d₁ ∥ d₂ (proportional). Intersecting: d₁ ✗ d₂ and system is consistent.
     * Skew: d₁ ✗ d₂ and system is inconsistent.
     */
    qParallelOrIntersect() {
        const caseType = MathUtils.pick(['parallel', 'intersecting', 'skew']);

        let a1x, a1y, a1z, d1x, d1y, d1z;
        let a2x, a2y, a2z, d2x, d2y, d2z;
        let correctTex, explainText;

        if (caseType === 'parallel') {
            // d₂ = k·d₁, lines not the same
            d1x = MathUtils.nonZeroRandInt(-3, 3);
            d1y = MathUtils.nonZeroRandInt(-3, 3);
            d1z = MathUtils.nonZeroRandInt(-3, 3);
            const k = MathUtils.pick([-2, -1, 2, 3]);
            d2x = k * d1x; d2y = k * d1y; d2z = k * d1z;
            a1x = MathUtils.randInt(-3, 3); a1y = MathUtils.randInt(-3, 3); a1z = MathUtils.randInt(-3, 3);
            // Offset a₂ so lines are not identical
            const offset = MathUtils.nonZeroRandInt(-3, 3);
            a2x = a1x + offset; a2y = a1y + offset; a2z = a1z + offset;
            correctTex = '\\text{Parallel}';
            explainText = `The direction vectors \\((${d1x},${d1y},${d1z})\\) and \\((${d2x},${d2y},${d2z})\\) are proportional (\\(k=${k}\\)), so the lines are <strong>parallel</strong>.`;

        } else if (caseType === 'intersecting') {
            // Lines meet at a known point P; d₁ and d₂ not proportional
            const px = MathUtils.randInt(-3, 3);
            const py = MathUtils.randInt(-3, 3);
            const pz = MathUtils.randInt(-3, 3);
            d1x = MathUtils.nonZeroRandInt(-3, 3);
            d1y = MathUtils.nonZeroRandInt(-3, 3);
            d1z = MathUtils.randInt(-2, 2);
            do {
                d2x = MathUtils.nonZeroRandInt(-3, 3);
                d2y = MathUtils.randInt(-2, 2);
                d2z = MathUtils.nonZeroRandInt(-3, 3);
            } while (d1x * d2y === d1y * d2x && d1x * d2z === d1z * d2x); // avoid parallel

            // Base points: set t=1, s=1 gives P
            const t0 = 1, s0 = 1;
            a1x = px - t0 * d1x; a1y = py - t0 * d1y; a1z = pz - t0 * d1z;
            a2x = px - s0 * d2x; a2y = py - s0 * d2y; a2z = pz - s0 * d2z;
            correctTex = '\\text{Intersecting}';
            explainText = `The lines are not parallel and they share the point \\((${px},${py},${pz})\\) (at \\(t=1\\), \\(s=1\\)), so they <strong>intersect</strong>.`;

        } else {
            // Skew: d₁ ✗ d₂ not proportional; system has no solution
            // Use a simple known skew pair
            d1x = 1; d1y = 0; d1z = 0;  // line along x-axis
            d2x = 0; d2y = 1; d2z = 0;  // line along y-direction but offset in z
            a1x = 0; a1y = 0; a1z = 0;
            a2x = 0; a2y = 0; a2z = 1;  // z=1, so lines don't meet
            correctTex = '\\text{Skew}';
            explainText = `The direction vectors are not proportional, and setting the parametric equations equal gives no consistent solution — the lines are <strong>skew</strong>.`;
        }

        const options = MathUtils.shuffle([
            { value: caseType === 'parallel'      ? 1 : 0, tex: '\\text{Parallel}' },
            { value: caseType === 'intersecting'  ? 1 : 0, tex: '\\text{Intersecting}' },
            { value: caseType === 'skew'          ? 1 : 0, tex: '\\text{Skew}' },
            { value: 0, tex: '\\text{Coincident (same line)}' }
        ]);

        return {
            type: 'mc',
            rule: 'Parallel / Intersecting / Skew',
            difficulty: 'hard',
            text: 'Identify the relationship between the two lines below.',
            latex: `\\(\\ell_1: \\mathbf{r} = (${a1x},\\,${a1y},\\,${a1z}) + t(${d1x},\\,${d1y},\\,${d1z})\\)<br>` +
                   `\\(\\ell_2: \\mathbf{r} = (${a2x},\\,${a2y},\\,${a2z}) + s(${d2x},\\,${d2y},\\,${d2z})\\)`,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{Step 1: Check if direction vectors are proportional (parallel test)}`,
                `\\text{Step 2: If not parallel, try solving the parametric system for } t \\text{ and } s`
            ],
            explain: `<strong>Step 1 — Parallel check:</strong> Are \\(\\mathbf{d}_1 = (${d1x},${d1y},${d1z})\\) and \\(\\mathbf{d}_2 = (${d2x},${d2y},${d2z})\\) proportional?<br>` +
                     (caseType === 'parallel'
                         ? `Yes — \\(\\mathbf{d}_2 = k\\mathbf{d}_1\\).<br><br>`
                         : `No — not proportional.<br><br>`) +
                     `<strong>Step 2 — Intersection check:</strong> ${explainText}`
        };
    },

    /**
     * 9. qLinePlaneIntersect — find parameter t where a line meets a plane (free, numeric)
     * Line: r = a + t·d. Plane: n·r = k.
     * Substitute parametric form into plane equation, solve for t.
     * n·(a + t·d) = k → t = (k - n·a) / (n·d)
     * Construct so t is a small integer.
     */
    qLinePlaneIntersect() {
        let a, d, n, t, k;
        // Keep regenerating until n·d ≠ 0 (line not parallel to plane) and t is an integer
        do {
            a = [MathUtils.randInt(-3, 3), MathUtils.randInt(-3, 3), MathUtils.randInt(-3, 3)];
            d = [MathUtils.nonZeroRandInt(-3, 3), MathUtils.nonZeroRandInt(-3, 3), MathUtils.nonZeroRandInt(-3, 3)];
            n = [MathUtils.nonZeroRandInt(-3, 3), MathUtils.nonZeroRandInt(-3, 3), MathUtils.nonZeroRandInt(-3, 3)];
            t = MathUtils.randInt(-4, 4);

            const na = n[0]*a[0] + n[1]*a[1] + n[2]*a[2];
            const nd = n[0]*d[0] + n[1]*d[1] + n[2]*d[2];
            k = na + t * nd;
        } while (
            n[0]*d[0] + n[1]*d[1] + n[2]*d[2] === 0 ||
            Math.abs(k) > 30
        );

        const nd = n[0]*d[0] + n[1]*d[1] + n[2]*d[2];
        const na = n[0]*a[0] + n[1]*a[1] + n[2]*a[2];

        // Intersection point
        const px = a[0] + t * d[0];
        const py = a[1] + t * d[1];
        const pz = a[2] + t * d[2];

        function planeTex(n, k) {
            const bSign = n[1] < 0 ? '-' : '+';
            const cSign = n[2] < 0 ? '-' : '+';
            return `${n[0]}x ${bSign} ${Math.abs(n[1])}y ${cSign} ${Math.abs(n[2])}z = ${k}`;
        }

        return {
            type: 'free',
            rule: 'Line–Plane Intersection',
            difficulty: 'hard',
            text: `The line \\(\\mathbf{r} = (${a[0]},\\,${a[1]},\\,${a[2]}) + t(${d[0]},\\,${d[1]},\\,${d[2]})\\) meets the plane \\(${planeTex(n, k)}\\). Find the value of \\(t\\) at the intersection.`,
            latex: `\\(\\mathbf{n} \\cdot (\\mathbf{a} + t\\,\\mathbf{d}) = k \\implies t = \\frac{k - \\mathbf{n}\\cdot\\mathbf{a}}{\\mathbf{n}\\cdot\\mathbf{d}}\\)`,
            answer: t,
            answerTex: String(t),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{Substitute parametric form into plane: } ${n[0]}(${a[0]}+${d[0]}t) + ${n[1]}(${a[1]}+${d[1]}t) + ${n[2]}(${a[2]}+${d[2]}t) = ${k}`,
                `(${n[0]*d[0]} + ${n[1]*d[1]} + ${n[2]*d[2]})t = ${k} - ${na} \\implies ${nd}t = ${k - na} \\implies t = ${t}`
            ],
            explain: `<strong>Step 1:</strong> Substitute the parametric line into the plane equation:<br>` +
                     `\\(${n[0]}(${a[0]}+${d[0]}t) + ${n[1]}(${a[1]}+${d[1]}t) + ${n[2]}(${a[2]}+${d[2]}t) = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Collect constant terms: \\(\\mathbf{n}\\cdot\\mathbf{a} = ${na}\\).<br>` +
                     `Collect \\(t\\) terms: \\(\\mathbf{n}\\cdot\\mathbf{d} = ${nd}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(t\\):<br>` +
                     `\\(${na} + ${nd}t = ${k}\\)<br>` +
                     `\\(${nd}t = ${k - na}\\)<br>` +
                     `\\(t = ${t}\\).<br><br>` +
                     `<strong>Intersection point:</strong> \\((${px},\\,${py},\\,${pz})\\).`
        };
    },

    /**
     * 10. qDistanceBetweenParallelPlanes — distance between ax+by+cz=d₁ and ax+by+cz=d₂ (free, numeric)
     * D = |d₂ - d₁| / sqrt(a²+b²+c²)
     * Use normal vectors with integer magnitudes.
     */
    qDistanceBetweenParallelPlanes() {
        const normals = [
            { n: [1, 0, 0], mag: 1 },
            { n: [0, 1, 0], mag: 1 },
            { n: [0, 0, 1], mag: 1 },
            { n: [1, 2, 2], mag: 3 },
            { n: [2, 2, 1], mag: 3 },
            { n: [2, 1, 2], mag: 3 },
            { n: [2, 3, 6], mag: 7 },
            { n: [3, 6, 2], mag: 7 },
            { n: [6, 2, 3], mag: 7 }
        ];

        const picked = MathUtils.pick(normals);
        const [a, b, c] = picked.n;
        const mag = picked.mag;

        // d1 and d2 so that |d2-d1| / mag is a nice value
        let d1, d2;
        do {
            d1 = MathUtils.randInt(-8, 8);
            d2 = MathUtils.randInt(-8, 8);
        } while (d1 === d2 || (Math.abs(d2 - d1) % mag !== 0));

        const diff = Math.abs(d2 - d1);
        const dist = diff / mag;

        function planeTex(a, b, c, d) {
            const bSign = b < 0 ? '-' : '+';
            const cSign = c < 0 ? '-' : '+';
            if (b === 0 && c === 0) return `${a}x = ${d}`;
            if (b === 0) return `${a}x ${cSign} ${Math.abs(c)}z = ${d}`;
            if (c === 0) return `${a}x ${bSign} ${Math.abs(b)}y = ${d}`;
            return `${a}x ${bSign} ${Math.abs(b)}y ${cSign} ${Math.abs(c)}z = ${d}`;
        }

        const sumSq = a*a + b*b + c*c;

        return {
            type: 'free',
            rule: 'Distance Between Parallel Planes',
            difficulty: 'medium',
            text: `Find the perpendicular distance between the two parallel planes below.`,
            latex: `\\(${planeTex(a, b, c, d1)}\\) and \\(${planeTex(a, b, c, d2)}\\)`,
            answer: dist,
            answerTex: String(dist),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `D = \\frac{|d_2 - d_1|}{\\sqrt{a^2+b^2+c^2}} \\quad \\text{where both planes are } ax+by+cz=d`,
                `D = \\frac{|${d2} - ${d1}|}{\\sqrt{${sumSq}}} = \\frac{${diff}}{${mag}} = ${dist}`
            ],
            explain: `<strong>Step 1:</strong> Both planes share the same normal \\(\\mathbf{n} = (${a},${b},${c})\\) with \\(|\\mathbf{n}| = \\sqrt{${sumSq}} = ${mag}\\).<br><br>` +
                     `<strong>Step 2:</strong> The distance between parallel planes \\(ax+by+cz=d_1\\) and \\(ax+by+cz=d_2\\) is:<br>` +
                     `\\(D = \\dfrac{|d_2 - d_1|}{|\\mathbf{n}|}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute:<br>` +
                     `\\(D = \\dfrac{|${d2} - (${d1})|}{${mag}} = \\dfrac{${diff}}{${mag}} = ${dist}\\).`
        };
    },

    /* ────────────────────────────────────────────
       INTERNAL PICKER (weighted random)
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => INT_DIST.qDistanceTwoPoints(),           weight: 3, difficulty: 'easy'   },
            { fn: () => INT_DIST.qMidpoint3D(),                  weight: 3, difficulty: 'easy'   },
            { fn: () => INT_DIST.qDistancePointToLine2D(),       weight: 3, difficulty: 'easy'   },
            { fn: () => INT_DIST.qLineIntersection2D(),          weight: 3, difficulty: 'easy'   },
            { fn: () => INT_DIST.qPointOnPlane(),                weight: 2, difficulty: 'easy'   },
            { fn: () => INT_DIST.qDistancePointToPlane(),        weight: 2, difficulty: 'medium' },
            { fn: () => INT_DIST.qAngleBetweenLines(),           weight: 2, difficulty: 'medium' },
            { fn: () => INT_DIST.qParallelOrIntersect(),         weight: 1, difficulty: 'hard'   },
            { fn: () => INT_DIST.qLinePlaneIntersect(),          weight: 1, difficulty: 'hard'   },
            { fn: () => INT_DIST.qDistanceBetweenParallelPlanes(), weight: 2, difficulty: 'medium' }
        ];

        let filtered = pool;
        if (INT_DIST.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (INT_DIST.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (INT_DIST.level === 'hard') {
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
       UI: fullLoad() — self-contained UI entry point
       ──────────────────────────────────────────── */

    fullLoad() {
        INT_DIST.score    = 0;
        INT_DIST.total    = 0;
        INT_DIST.streak   = 0;
        INT_DIST.answered = false;
        INT_DIST.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="INT_DIST.doUnload()">Intersections &amp; Distances (3.18)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Intersections and Distances</h1>
                <p>IB Math AA 3.18 — Line–plane intersections and 3D distances</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="INT_DIST.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="INT_DIST.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="INT_DIST.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="INT_DIST.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="intd-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="intd-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="intd-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="intd-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="intd-question-card">
                <span class="rule-tag"       id="intd-rule"></span>
                <span class="difficulty-tag" id="intd-difficulty"></span>
                <div class="question-text"   id="intd-text"></div>
                <div class="question-prompt" id="intd-latex"></div>
                <div id="intd-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="intd-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="intd-feedback">
                <div class="feedback-title"       id="intd-feedback-title"></div>
                <div class="feedback-explanation" id="intd-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="intd-hint-btn" onclick="INT_DIST.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="intd-next-btn" onclick="INT_DIST.next()" style="display:none;">Next Question</button>
            </div>
        `;

        INT_DIST.next();
    },

    /* ────────────────────────────────────────────
       UI: doUnload()
       ──────────────────────────────────────────── */

    doUnload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView(INT_DIST.unload);
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        INT_DIST.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        INT_DIST.score  = 0;
        INT_DIST.total  = 0;
        INT_DIST.streak = 0;
        INT_DIST.updateStats();
        INT_DIST.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        INT_DIST.answered  = false;
        INT_DIST.hintIndex = 0;
        INT_DIST.currentQ  = INT_DIST.pickQuestion();
        const q = INT_DIST.currentQ;

        // Rule tag
        document.getElementById('intd-rule').textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('intd-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('intd-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('intd-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('intd-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="INT_DIST.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="intd-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')INT_DIST.checkFree()">
                    <button class="btn btn-primary" onclick="INT_DIST.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('intd-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint / feedback / next
        const hintBox = document.getElementById('intd-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('intd-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('intd-next-btn').style.display = 'none';
        document.getElementById('intd-hint-btn').style.display = '';
        document.getElementById('intd-hint-btn').disabled = false;

        INT_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = INT_DIST.currentQ;
        if (!q || !q.hintTex || INT_DIST.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('intd-hint-box');
        const prev = INT_DIST.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[INT_DIST.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        INT_DIST.hintIndex++;

        if (INT_DIST.hintIndex >= q.hintTex.length) {
            document.getElementById('intd-hint-btn').disabled = true;
        }

        INT_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (INT_DIST.answered) return;
        INT_DIST.answered = true;
        INT_DIST.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });

        if (isCorrect) {
            btn.classList.add('correct');
            INT_DIST.score++;
            INT_DIST.streak++;
        } else {
            btn.classList.add('incorrect');
            INT_DIST.streak = 0;
        }

        INT_DIST.showFeedback(isCorrect);
        INT_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (INT_DIST.answered) return;

        const inp = document.getElementById('intd-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        INT_DIST.answered = true;
        INT_DIST.total++;
        inp.disabled = true;

        const q = INT_DIST.currentQ;
        const tol = q.tolerance !== undefined ? q.tolerance : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background  = 'var(--success-light)';
            INT_DIST.score++;
            INT_DIST.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background  = 'var(--error-light)';
            INT_DIST.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        INT_DIST.showFeedback(isCorrect);
        INT_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q    = INT_DIST.currentQ;
        const fb   = document.getElementById('intd-feedback');
        const title       = document.getElementById('intd-feedback-title');
        const explanation = document.getElementById('intd-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = INT_DIST.streak > 1
                ? `Correct! (${INT_DIST.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('intd-next-btn').style.display = '';
        document.getElementById('intd-hint-btn').style.display = 'none';

        INT_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('intd-score');
        const totalEl  = document.getElementById('intd-total');
        const streakEl = document.getElementById('intd-streak');
        const accEl    = document.getElementById('intd-accuracy');

        if (scoreEl)  scoreEl.textContent  = INT_DIST.score;
        if (totalEl)  totalEl.textContent  = INT_DIST.total;
        if (streakEl) streakEl.textContent = INT_DIST.streak;
        if (accEl) {
            accEl.textContent = INT_DIST.total > 0
                ? Math.round((INT_DIST.score / INT_DIST.total) * 100) + '%'
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

// Register in activity inits — supports both the legacy ACTIVITY_INITS pattern
// and the new MathUtils.loadActivity framework
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['intersections-distances'] = () => INT_DIST.fullLoad();
}
