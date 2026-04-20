/*
 * planes.js - IB Math AA 3.17: Equations of Planes
 * Normal vector, Cartesian & vector equations, point-normal form, distance
 */

const PLANES = {
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
     * 1. qNormalVector - Easy (MC)
     * Given plane ax + by + cz = d, identify the normal vector (a, b, c).
     */
    qNormalVector() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-4, 4);
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const d = MathUtils.randInt(-8, 8);

        function signStr(v) { return v < 0 ? `(${v})` : String(v); }
        function planeTex(a, b, c, d) {
            const bSign = b < 0 ? '-' : '+';
            const cSign = c < 0 ? '-' : '+';
            return `${a}x ${bSign} ${Math.abs(b)}y ${cSign} ${Math.abs(c)}z = ${d}`;
        }
        function vecTex(x, y, z) { return `(${x},\\,${y},\\,${z})`; }

        const correctTex = vecTex(a, b, c);

        // Distractors: scramble components
        const d1 = vecTex(b, a, c);       // swap a and b
        const d2 = vecTex(a, c, b);       // swap b and c
        const d3 = vecTex(-a, -b, -c);    // negate all (anti-normal — same plane, easy mistake)

        const rawOptions = [correctTex, d1, d2, d3];

        // Ensure uniqueness
        const unique = [correctTex];
        for (const opt of [d1, d2, d3]) {
            if (!unique.includes(opt)) {
                unique.push(opt);
            } else {
                // Replace with random permutation offset
                const fallback = vecTex(a + MathUtils.nonZeroRandInt(-2, 2), b, c);
                unique.push(unique.includes(fallback) ? vecTex(a, b + MathUtils.nonZeroRandInt(-2, 2), c) : fallback);
            }
        }

        const options = unique.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Normal Vector',
            difficulty: 'easy',
            text: 'Identify the normal vector to the plane below.',
            latex: `\\(${planeTex(a, b, c, d)}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{The plane } ax + by + cz = d \\text{ has normal vector } \\mathbf{n} = (a, b, c)`,
                `\\text{Read off the coefficients: } \\mathbf{n} = (${a},\\,${b},\\,${c})`
            ],
            explain: `<strong>Step 1:</strong> The Cartesian equation of a plane is \\(ax + by + cz = d\\).<br><br>` +
                     `<strong>Step 2:</strong> The coefficients of \\(x\\), \\(y\\), \\(z\\) form the normal vector \\(\\mathbf{n} = (a, b, c)\\).<br><br>` +
                     `<strong>Step 3:</strong> Reading off from \\(${planeTex(a, b, c, d)}\\): \\(\\mathbf{n} = (${a},\\,${b},\\,${c})\\).`
        };
    },

    /**
     * 2. qPointOnPlane - Easy (Free)
     * Given a point and a plane, evaluate ax₀+by₀+cz₀ to verify it equals d.
     */
    qPointOnPlane() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.nonZeroRandInt(-3, 3);
        const c = MathUtils.nonZeroRandInt(-3, 3);
        const x0 = MathUtils.randInt(-4, 4);
        const y0 = MathUtils.randInt(-4, 4);
        const z0 = MathUtils.randInt(-4, 4);
        const d = a * x0 + b * y0 + c * z0;

        function planeTex(a, b, c, d) {
            const bSign = b < 0 ? '-' : '+';
            const cSign = c < 0 ? '-' : '+';
            return `${a}x ${bSign} ${Math.abs(b)}y ${cSign} ${Math.abs(c)}z = ${d}`;
        }

        const ax = a * x0;
        const by = b * y0;
        const cz = c * z0;

        return {
            type: 'free',
            rule: 'Point on Plane',
            difficulty: 'easy',
            text: `The point \\(P(${x0},\\,${y0},\\,${z0})\\) lies on the plane below. Find the value of \\(${a}x_0 + ${b}y_0 + ${c}z_0\\).`,
            latex: `\\(${planeTex(a, b, c, d)}\\)`,
            answer: d,
            answerTex: String(d),
            options: [],
            hintTex: [
                `\\text{Substitute the coordinates of } P \\text{ into the left-hand side}`,
                `${a}(${x0}) + ${b}(${y0}) + ${c}(${z0}) = ${ax} + ${by} + ${cz} = ${d}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x_0 = ${x0},\\; y_0 = ${y0},\\; z_0 = ${z0}\\) into \\(${a}x + ${b}y + ${c}z\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(${a}(${x0}) + ${b}(${y0}) + ${c}(${z0}) = ${ax} + ${by} + ${cz} = ${d}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${d}\\). This equals the right-hand side, confirming \\(P\\) lies on the plane.`
        };
    },

    /**
     * 3. qPlaneEquation - Easy (Free)
     * Plane through origin with normal (a,b,c) — evaluate ax+by+cz at (1,1,1).
     */
    qPlaneEquation() {
        const a = MathUtils.randInt(1, 3);
        const b = MathUtils.randInt(1, 3);
        const c = MathUtils.randInt(1, 3);
        const answer = a + b + c;

        function planeTex(a, b, c) {
            return `${a}x + ${b}y + ${c}z = 0`;
        }

        return {
            type: 'free',
            rule: 'Plane Equation',
            difficulty: 'easy',
            text: `A plane passes through the origin with normal vector \\(\\mathbf{n} = (${a},\\,${b},\\,${c})\\). Its equation is \\(${planeTex(a, b, c)}\\). Evaluate the left-hand side at the point \\((1, 1, 1)\\).`,
            latex: `\\text{Find } ${a}(1) + ${b}(1) + ${c}(1)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } x=1,\\, y=1,\\, z=1 \\text{ into } ${a}x + ${b}y + ${c}z`,
                `${a}(1) + ${b}(1) + ${c}(1) = ${a} + ${b} + ${c} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> The plane through the origin with normal \\((${a},\\,${b},\\,${c})\\) has equation \\(${planeTex(a, b, c)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\((1,1,1)\\): \\(${a}(1) + ${b}(1) + ${c}(1) = ${a} + ${b} + ${c} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${answer}\\).`
        };
    },

    /**
     * 4. qDistanceToPlane - Medium (Free)
     * Distance from a point to a plane — uses plane z = k with normal (0,0,1) for integer answer.
     */
    qDistanceToPlane() {
        const k = MathUtils.randInt(-5, 5);           // plane z = k
        let p;
        do { p = MathUtils.randInt(-8, 8); } while (p === k);

        const x = MathUtils.randInt(-4, 4);
        const y = MathUtils.randInt(-4, 4);
        const dist = Math.abs(p - k);

        return {
            type: 'free',
            rule: 'Distance to Plane',
            difficulty: 'medium',
            text: `Find the perpendicular distance from the point \\(P(${x},\\,${y},\\,${p})\\) to the plane \\(z = ${k}\\).`,
            latex: `\\text{Distance} = \\frac{|ax_0 + by_0 + cz_0 - d|}{\\sqrt{a^2+b^2+c^2}}`,
            answer: dist,
            answerTex: String(dist),
            options: [],
            hintTex: [
                `\\text{Write the plane as } 0x + 0y + 1z = ${k},\\text{ so } \\mathbf{n}=(0,0,1)`,
                `d = \\frac{|0(${x}) + 0(${y}) + 1(${p}) - ${k}|}{\\sqrt{0+0+1}} = |${p} - ${k}| = ${dist}`
            ],
            explain: `<strong>Step 1:</strong> Rewrite \\(z = ${k}\\) as \\(0x + 0y + z = ${k}\\), so \\(a=0,\\,b=0,\\,c=1,\\,d=${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the distance formula: \\(d = \\dfrac{|ax_0 + by_0 + cz_0 - d|}{\\sqrt{a^2+b^2+c^2}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(d = \\dfrac{|0(${x}) + 0(${y}) + (${p}) - ${k}|}{\\sqrt{1}} = |${p - k}| = ${dist}\\).`
        };
    },

    /**
     * 5. qParallelPlanes - Medium (MC)
     * Identify which plane is parallel to 2x + 3y − z = 5.
     */
    qParallelPlanes() {
        // Fixed base plane: 2x + 3y - z = 5, normal (2, 3, -1)
        // Parallel planes have proportional normals: (2,3,-1) or (4,6,-2)
        const baseD = MathUtils.randInt(1, 8) + MathUtils.pick([1, -1]) * MathUtils.randInt(1, 4);

        const opts = [
            { tex: `2x + 3y - z = ${baseD}`,  parallel: true,  reason: 'same normal \\((2,3,-1)\\)' },
            { tex: `2x + 3y + z = 5`,          parallel: false, reason: 'normal is \\((2,3,1)\\) — different' },
            { tex: `4x + 6y - 2z = 3`,         parallel: true,  reason: 'normal \\((4,6,-2) = 2(2,3,-1)\\) — proportional' },
            { tex: `x + 2y - z = 0`,           parallel: false, reason: 'normal is \\((1,2,-1)\\) — different' }
        ];

        // Pick one parallel plane as the correct answer
        const parallelOpts = opts.filter(o => o.parallel);
        const correct = MathUtils.pick(parallelOpts);

        const options = opts.map(o => ({
            value: o === correct ? 1 : 0,
            tex: o.tex
        }));

        const shuffled = MathUtils.shuffle(options);
        const correctTex = correct.tex;

        return {
            type: 'mc',
            rule: 'Parallel Planes',
            difficulty: 'medium',
            text: 'Which of the following planes is parallel to \\(2x + 3y - z = 5\\)?',
            latex: `\\text{Two planes are parallel if their normal vectors are parallel (proportional).}`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{The normal to } 2x+3y-z=5 \\text{ is } \\mathbf{n}=(2,3,-1)`,
                `\\text{A parallel plane has normal } k\\mathbf{n} = (2k, 3k, -k) \\text{ for some scalar } k \\neq 0`
            ],
            explain: `<strong>Step 1:</strong> The normal vector of \\(2x + 3y - z = 5\\) is \\(\\mathbf{n} = (2, 3, -1)\\).<br><br>` +
                     `<strong>Step 2:</strong> Parallel planes have proportional normals — check each option's normal vector.<br><br>` +
                     `<strong>Step 3:</strong> \\(${correctTex}\\) has ${correct.reason}, so it is parallel.<br><br>` +
                     `<strong>Note:</strong> \\(2x+3y+z=5\\) has normal \\((2,3,1)\\) and \\(x+2y-z=0\\) has normal \\((1,2,-1)\\) — neither is proportional to \\((2,3,-1)\\).`
        };
    },

    /**
     * 6. qPlaneFromThreePoints - Hard (MC)
     * Three points define a plane. Which Cartesian equation fits all three?
     */
    qPlaneFromThreePoints() {
        // Build a plane with a known normal and point, then pick 3 points on it
        const a = MathUtils.pick([1, 1, 2, 1, 2]);
        const b = MathUtils.pick([1, 2, 1, 3, 1]);
        const c = MathUtils.pick([1, 1, 1, 1, 2]);
        const d = MathUtils.randInt(2, 8);

        // Find three points on ax + by + cz = d
        // P1: set y=0, z=0 → x = d/a  (need a|d)
        // Ensure d is divisible by a for cleanliness
        const dAdj = a * b * c * MathUtils.randInt(1, 3);  // always divisible
        const dFinal = dAdj;

        const p1 = [dFinal / a, 0, 0];
        const p2 = [0, dFinal / b, 0];
        const p3 = [0, 0, dFinal / c];

        function planeTex(a, b, c, d) {
            const bSign = b < 0 ? '-' : '+';
            const cSign = c < 0 ? '-' : '+';
            return `${a}x ${bSign} ${Math.abs(b)}y ${cSign} ${Math.abs(c)}z = ${d}`;
        }

        const correctTex = planeTex(a, b, c, dFinal);

        // Distractors: wrong d, wrong coefficient, transposed
        const d1Tex = planeTex(a, b, c, dFinal + MathUtils.pick([1, 2, 3, -1, -2]));
        const d2Tex = planeTex(b, a, c, dFinal);                // swapped a and b
        const d3Tex = planeTex(a, b, c + 1, dFinal);            // c off by 1

        const rawOpts = [correctTex, d1Tex, d2Tex, d3Tex];
        const unique = [correctTex];
        for (const o of [d1Tex, d2Tex, d3Tex]) {
            if (!unique.includes(o)) unique.push(o);
            else unique.push(planeTex(a, b, c, dFinal + unique.length * 2));
        }

        const options = unique.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        function ptTex(p) { return `(${p[0]},\\,${p[1]},\\,${p[2]})`; }

        return {
            type: 'mc',
            rule: 'Plane from 3 Points',
            difficulty: 'hard',
            text: 'Which equation represents the plane passing through all three points below?',
            latex: `\\(A${ptTex(p1)},\\; B${ptTex(p2)},\\; C${ptTex(p3)}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Find two edge vectors: } \\mathbf{AB} = B - A,\\; \\mathbf{AC} = C - A`,
                `\\text{Normal } \\mathbf{n} = \\mathbf{AB} \\times \\mathbf{AC},\\text{ then check each point satisfies } \\mathbf{n} \\cdot \\mathbf{r} = d`
            ],
            explain: `<strong>Step 1:</strong> Three points on the plane are \\(A${ptTex(p1)},\\; B${ptTex(p2)},\\; C${ptTex(p3)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Test each option by substituting all three points.<br><br>` +
                     `<strong>Step 3:</strong> For \\(${correctTex}\\):<br>` +
                     `\\(A\\): \\(${a}(${p1[0]}) + ${b}(0) + ${c}(0) = ${dFinal}\\) ✓<br>` +
                     `\\(B\\): \\(${a}(0) + ${b}(${p2[1]}) + ${c}(0) = ${dFinal}\\) ✓<br>` +
                     `\\(C\\): \\(${a}(0) + ${b}(0) + ${c}(${p3[2]}) = ${dFinal}\\) ✓`
        };
    },

    /**
     * 7. qDotProductNormal - Easy (Free)
     * Evaluate n·r for a given point on (or near) the plane n·r = d.
     */
    qDotProductNormal() {
        const n1 = MathUtils.nonZeroRandInt(-3, 3);
        const n2 = MathUtils.nonZeroRandInt(-3, 3);
        const n3 = MathUtils.nonZeroRandInt(-3, 3);
        const x = MathUtils.randInt(-4, 4);
        const y = MathUtils.randInt(-4, 4);
        const z = MathUtils.randInt(-4, 4);
        const answer = n1 * x + n2 * y + n3 * z;

        const bSign = n2 < 0 ? '-' : '+';
        const cSign = n3 < 0 ? '-' : '+';
        const planeTex = `${n1}x ${bSign} ${Math.abs(n2)}y ${cSign} ${Math.abs(n3)}z = d`;

        return {
            type: 'free',
            rule: 'Dot Product / Normal',
            difficulty: 'easy',
            text: `For the plane with normal \\(\\mathbf{n} = (${n1},\\,${n2},\\,${n3})\\), evaluate \\(\\mathbf{n} \\cdot \\mathbf{r}\\) at the point \\((${x},\\,${y},\\,${z})\\).`,
            latex: `\\(\\mathbf{n} \\cdot \\mathbf{r} = n_1 x + n_2 y + n_3 z\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\mathbf{n} \\cdot \\mathbf{r} = ${n1}(${x}) + ${n2}(${y}) + ${n3}(${z})`,
                `= ${n1 * x} + ${n2 * y} + ${n3 * z} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> The dot product \\(\\mathbf{n} \\cdot \\mathbf{r} = n_1 x + n_2 y + n_3 z\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\((${n1})(${x}) + (${n2})(${y}) + (${n3})(${z})\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= ${n1 * x} + ${n2 * y} + ${n3 * z} = ${answer}\\).`
        };
    },

    /**
     * 8. qNormalMagnitude - Easy (Free)
     * Find |n| for a normal vector, using triples that give integer answers.
     */
    qNormalMagnitude() {
        const triples = [
            { n: [1, 2, 2], mag: 3 },
            { n: [2, 2, 1], mag: 3 },
            { n: [2, 1, 2], mag: 3 },
            { n: [1, 0, 0], mag: 1 },
            { n: [0, 1, 0], mag: 1 },
            { n: [0, 0, 1], mag: 1 },
            { n: [2, 3, 6], mag: 7 },
            { n: [3, 6, 2], mag: 7 },
            { n: [6, 2, 3], mag: 7 },
            { n: [1, 4, 8], mag: 9 },
            { n: [4, 4, 7], mag: 9 }
        ];
        const picked = MathUtils.pick(triples);
        const [a, b, c] = picked.n;
        const mag = picked.mag;

        return {
            type: 'free',
            rule: 'Normal Magnitude',
            difficulty: 'easy',
            text: `Find the magnitude of the normal vector \\(\\mathbf{n} = (${a},\\,${b},\\,${c})\\).`,
            latex: `\\(|\\mathbf{n}| = \\sqrt{a^2 + b^2 + c^2}\\)`,
            answer: mag,
            answerTex: String(mag),
            options: [],
            hintTex: [
                `|\\mathbf{n}| = \\sqrt{${a}^2 + ${b}^2 + ${c}^2} = \\sqrt{${a*a} + ${b*b} + ${c*c}}`,
                `= \\sqrt{${a*a + b*b + c*c}} = ${mag}`
            ],
            explain: `<strong>Step 1:</strong> Use \\(|\\mathbf{n}| = \\sqrt{a^2 + b^2 + c^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\sqrt{${a}^2 + ${b}^2 + ${c}^2} = \\sqrt{${a*a} + ${b*b} + ${c*c}} = \\sqrt{${a*a + b*b + c*c}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= ${mag}\\).`
        };
    },

    /**
     * 9. qInterceptForm - Medium (Free)
     * Plane in intercept form x/a + y/b + z/c = 1. Find the x-intercept.
     */
    qInterceptForm() {
        // Use plane Ax + By + Cz = D where x-intercept = D/A is a nice integer
        const configs = [
            { A: 2, B: 3, C: 6, D: 6,  xInt: 3 },
            { A: 3, B: 2, C: 6, D: 6,  xInt: 2 },
            { A: 1, B: 2, C: 4, D: 4,  xInt: 4 },
            { A: 2, B: 4, C: 1, D: 8,  xInt: 4 },
            { A: 3, B: 1, C: 3, D: 9,  xInt: 3 },
            { A: 4, B: 2, C: 1, D: 8,  xInt: 2 },
            { A: 1, B: 3, C: 2, D: 6,  xInt: 6 },
            { A: 5, B: 2, C: 1, D: 10, xInt: 2 }
        ];
        const cfg = MathUtils.pick(configs);
        const { A, B, C, D, xInt } = cfg;

        function planeTex(A, B, C, D) {
            return `${A}x + ${B}y + ${C}z = ${D}`;
        }

        return {
            type: 'free',
            rule: 'Intercept Form',
            difficulty: 'medium',
            text: `The plane \\(${planeTex(A, B, C, D)}\\) can be written as \\(\\dfrac{x}{${xInt}} + \\dfrac{y}{${D/B}} + \\dfrac{z}{${D/C}} = 1\\). Find the x-intercept (where \\(y=0\\) and \\(z=0\\)).`,
            latex: `\\text{x-intercept: set } y = 0,\\; z = 0 \\text{ in } ${planeTex(A, B, C, D)}`,
            answer: xInt,
            answerTex: String(xInt),
            options: [],
            hintTex: [
                `\\text{Set } y = 0 \\text{ and } z = 0: \\quad ${A}x = ${D}`,
                `x = \\frac{${D}}{${A}} = ${xInt}`
            ],
            explain: `<strong>Step 1:</strong> At the x-intercept, \\(y = 0\\) and \\(z = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(${A}x + ${B}(0) + ${C}(0) = ${D}\\), so \\(${A}x = ${D}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(x = \\dfrac{${D}}{${A}} = ${xInt}\\).<br><br>` +
                     `<strong>Note:</strong> In intercept form \\(\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1\\), the x-intercept is always \\(a = \\dfrac{D}{A}\\).`
        };
    },

    /**
     * 10. qPlaneLineIntersect - Hard (Free)
     * Line r = (0,0,0) + t(1,1,1) meets plane x + y + z = k. Find x-coordinate.
     */
    qPlaneLineIntersect() {
        const k = MathUtils.pick([3, 6, 9]);
        const tVal = k / 3;   // always integer since k ∈ {3,6,9}
        const xCoord = tVal;  // x = 0 + t*1 = t = k/3

        return {
            type: 'free',
            rule: 'Plane–Line Intersection',
            difficulty: 'hard',
            text: `The line \\(\\mathbf{r} = t(1,\\,1,\\,1)\\) meets the plane \\(x + y + z = ${k}\\). Find the x-coordinate of the intersection point.`,
            latex: `\\text{Substitute the parametric form into the plane equation}`,
            answer: xCoord,
            answerTex: String(xCoord),
            options: [],
            hintTex: [
                `\\text{Parametric form: } x = t,\\; y = t,\\; z = t. \\text{ Substitute into plane:}`,
                `t + t + t = ${k} \\implies 3t = ${k} \\implies t = ${tVal}, \\text{ so } x = ${xCoord}`
            ],
            explain: `<strong>Step 1:</strong> Write the line parametrically: \\(x = t,\\; y = t,\\; z = t\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute into \\(x + y + z = ${k}\\):<br>` +
                     `\\(t + t + t = ${k}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(3t = ${k}\\), so \\(t = ${tVal}\\).<br><br>` +
                     `<strong>Step 4:</strong> The x-coordinate of the intersection is \\(x = t = ${xCoord}\\).<br><br>` +
                     `<strong>Full point:</strong> \\((${xCoord},\\,${xCoord},\\,${xCoord})\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        // Indices 0-9 correspond to q1-q10
        // Easy (weight 3): 0,1,2,6,7 (qNormalVector, qPointOnPlane, qPlaneEquation, qDotProductNormal, qNormalMagnitude)
        // Medium (weight 2): 3,4,8 (qDistanceToPlane, qParallelPlanes, qInterceptForm)
        // Hard (weight 1): 5,9 (qPlaneFromThreePoints, qPlaneLineIntersect)
        const pool = [
            { fn: () => PLANES.qNormalVector(),         weight: 3, difficulty: 'easy'   },
            { fn: () => PLANES.qPointOnPlane(),         weight: 3, difficulty: 'easy'   },
            { fn: () => PLANES.qPlaneEquation(),        weight: 3, difficulty: 'easy'   },
            { fn: () => PLANES.qDistanceToPlane(),      weight: 2, difficulty: 'medium' },
            { fn: () => PLANES.qParallelPlanes(),       weight: 2, difficulty: 'medium' },
            { fn: () => PLANES.qPlaneFromThreePoints(), weight: 1, difficulty: 'hard'   },
            { fn: () => PLANES.qDotProductNormal(),     weight: 3, difficulty: 'easy'   },
            { fn: () => PLANES.qNormalMagnitude(),      weight: 3, difficulty: 'easy'   },
            { fn: () => PLANES.qInterceptForm(),        weight: 2, difficulty: 'medium' },
            { fn: () => PLANES.qPlaneLineIntersect(),   weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (PLANES.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (PLANES.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (PLANES.level === 'hard') {
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
        PLANES.score = 0;
        PLANES.total = 0;
        PLANES.streak = 0;
        PLANES.answered = false;
        PLANES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PLANES.unload()">Planes (3.17)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Equations of Planes</h1>
                <p>IB Math AA 3.17 — Normal vector, plane equations and distance</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="PLANES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="PLANES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="PLANES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="PLANES.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="pln-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="pln-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="pln-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="pln-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="pln-question-card">
                <span class="rule-tag" id="pln-rule"></span>
                <span class="difficulty-tag" id="pln-difficulty"></span>
                <div class="question-text" id="pln-text"></div>
                <div class="question-prompt" id="pln-latex"></div>
                <div id="pln-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="pln-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="pln-feedback">
                <div class="feedback-title" id="pln-feedback-title"></div>
                <div class="feedback-explanation" id="pln-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="pln-hint-btn" onclick="PLANES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pln-next-btn" onclick="PLANES.next()" style="display:none;">Next Question</button>
            </div>
        `;

        PLANES.next();
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
        PLANES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        PLANES.score = 0;
        PLANES.total = 0;
        PLANES.streak = 0;
        PLANES.updateStats();
        PLANES.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        PLANES.answered = false;
        PLANES.hintIndex = 0;
        PLANES.currentQ = PLANES.pickQuestion();
        const q = PLANES.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('pln-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('pln-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('pln-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('pln-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('pln-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="PLANES.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="pln-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')PLANES.checkFree()">
                    <button class="btn btn-primary" onclick="PLANES.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('pln-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('pln-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('pln-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('pln-next-btn').style.display = 'none';
        document.getElementById('pln-hint-btn').style.display = '';
        document.getElementById('pln-hint-btn').disabled = false;

        // Render KaTeX
        PLANES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = PLANES.currentQ;
        if (!q || !q.hintTex || PLANES.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('pln-hint-box');
        const hintContent = PLANES.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[PLANES.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        PLANES.hintIndex++;

        if (PLANES.hintIndex >= q.hintTex.length) {
            document.getElementById('pln-hint-btn').disabled = true;
        }

        PLANES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (PLANES.answered) return;
        PLANES.answered = true;
        PLANES.total++;

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
            PLANES.score++;
            PLANES.streak++;
        } else {
            btn.classList.add('incorrect');
            PLANES.streak = 0;
        }

        PLANES.showFeedback(isCorrect);
        PLANES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (PLANES.answered) return;

        const inp = document.getElementById('pln-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        PLANES.answered = true;
        PLANES.total++;
        inp.disabled = true;

        const q = PLANES.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            PLANES.score++;
            PLANES.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            PLANES.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        PLANES.showFeedback(isCorrect);
        PLANES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = PLANES.currentQ;
        const fb = document.getElementById('pln-feedback');
        const title = document.getElementById('pln-feedback-title');
        const explanation = document.getElementById('pln-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (PLANES.streak > 1) {
                title.textContent = `Correct! (${PLANES.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('pln-next-btn').style.display = '';
        document.getElementById('pln-hint-btn').style.display = 'none';

        PLANES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('pln-score');
        const totalEl = document.getElementById('pln-total');
        const streakEl = document.getElementById('pln-streak');
        const accEl = document.getElementById('pln-accuracy');

        if (scoreEl) scoreEl.textContent = PLANES.score;
        if (totalEl) totalEl.textContent = PLANES.total;
        if (streakEl) streakEl.textContent = PLANES.streak;
        if (accEl) {
            accEl.textContent = PLANES.total > 0
                ? Math.round((PLANES.score / PLANES.total) * 100) + '%'
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

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['planes'] = () => PLANES.load();
}
