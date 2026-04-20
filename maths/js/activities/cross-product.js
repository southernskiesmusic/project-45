/*
 * cross-product.js - IB Math AA 3.16: Cross Product (Vector Product)
 * Formula, component form, area of parallelogram/triangle, normal to plane
 */

const CROSS_PROD = {
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
     * 1. qCrossProductX - Easy (Free)
     * Given a=(a1,a2,a3) and b=(b1,b2,b3), find x-component of a×b = a2*b3 - a3*b2.
     */
    qCrossProductX() {
        let a1, a2, a3, b1, b2, b3;
        // Regenerate until the x-component is non-trivially zero at least half the time
        do {
            a1 = MathUtils.randInt(-3, 3);
            a2 = MathUtils.randInt(-3, 3);
            a3 = MathUtils.randInt(-3, 3);
            b1 = MathUtils.randInt(-3, 3);
            b2 = MathUtils.randInt(-3, 3);
            b3 = MathUtils.randInt(-3, 3);
        } while (a2 === 0 && a3 === 0 && b2 === 0 && b3 === 0);

        const cx = a2 * b3 - a3 * b2;

        const aVec = `(${a1},\\,${a2},\\,${a3})`;
        const bVec = `(${b1},\\,${b2},\\,${b3})`;

        return {
            type: 'free',
            rule: 'Cross Product — x-component',
            difficulty: 'easy',
            text: 'Find the x-component of \\(\\mathbf{a} \\times \\mathbf{b}\\).',
            latex: `\\(\\mathbf{a} = ${aVec},\\quad \\mathbf{b} = ${bVec}\\)`,
            answer: cx,
            answerTex: String(cx),
            options: [],
            hintTex: [
                `(\\mathbf{a}\\times\\mathbf{b})_x = a_y b_z - a_z b_y`,
                `= (${a2})(${b3}) - (${a3})(${b2}) = ${a2 * b3} - ${a3 * b2} = ${cx}`
            ],
            explain: `<strong>Step 1:</strong> The x-component of \\(\\mathbf{a}\\times\\mathbf{b}\\) is \\(a_y b_z - a_z b_y\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\((${a2})(${b3}) - (${a3})(${b2}) = ${a2 * b3} - (${a3 * b2})\\).<br><br>` +
                     `<strong>Step 3:</strong> Result: \\(${cx}\\).`
        };
    },

    /**
     * 2. qCrossProductY - Easy (Free)
     * Find y-component of a×b = a3*b1 - a1*b3.
     */
    qCrossProductY() {
        let a1, a2, a3, b1, b2, b3;
        do {
            a1 = MathUtils.randInt(-3, 3);
            a2 = MathUtils.randInt(-3, 3);
            a3 = MathUtils.randInt(-3, 3);
            b1 = MathUtils.randInt(-3, 3);
            b2 = MathUtils.randInt(-3, 3);
            b3 = MathUtils.randInt(-3, 3);
        } while (a1 === 0 && a3 === 0 && b1 === 0 && b3 === 0);

        const cy = a3 * b1 - a1 * b3;

        const aVec = `(${a1},\\,${a2},\\,${a3})`;
        const bVec = `(${b1},\\,${b2},\\,${b3})`;

        return {
            type: 'free',
            rule: 'Cross Product — y-component',
            difficulty: 'easy',
            text: 'Find the y-component of \\(\\mathbf{a} \\times \\mathbf{b}\\).',
            latex: `\\(\\mathbf{a} = ${aVec},\\quad \\mathbf{b} = ${bVec}\\)`,
            answer: cy,
            answerTex: String(cy),
            options: [],
            hintTex: [
                `(\\mathbf{a}\\times\\mathbf{b})_y = a_z b_x - a_x b_z`,
                `= (${a3})(${b1}) - (${a1})(${b3}) = ${a3 * b1} - ${a1 * b3} = ${cy}`
            ],
            explain: `<strong>Step 1:</strong> The y-component of \\(\\mathbf{a}\\times\\mathbf{b}\\) is \\(a_z b_x - a_x b_z\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\((${a3})(${b1}) - (${a1})(${b3}) = ${a3 * b1} - (${a1 * b3})\\).<br><br>` +
                     `<strong>Step 3:</strong> Result: \\(${cy}\\).`
        };
    },

    /**
     * 3. qCrossProductZ - Easy (Free)
     * Find z-component of a×b = a1*b2 - a2*b1.
     */
    qCrossProductZ() {
        let a1, a2, a3, b1, b2, b3;
        do {
            a1 = MathUtils.randInt(-3, 3);
            a2 = MathUtils.randInt(-3, 3);
            a3 = MathUtils.randInt(-3, 3);
            b1 = MathUtils.randInt(-3, 3);
            b2 = MathUtils.randInt(-3, 3);
            b3 = MathUtils.randInt(-3, 3);
        } while (a1 === 0 && a2 === 0 && b1 === 0 && b2 === 0);

        const cz = a1 * b2 - a2 * b1;

        const aVec = `(${a1},\\,${a2},\\,${a3})`;
        const bVec = `(${b1},\\,${b2},\\,${b3})`;

        return {
            type: 'free',
            rule: 'Cross Product — z-component',
            difficulty: 'easy',
            text: 'Find the z-component of \\(\\mathbf{a} \\times \\mathbf{b}\\).',
            latex: `\\(\\mathbf{a} = ${aVec},\\quad \\mathbf{b} = ${bVec}\\)`,
            answer: cz,
            answerTex: String(cz),
            options: [],
            hintTex: [
                `(\\mathbf{a}\\times\\mathbf{b})_z = a_x b_y - a_y b_x`,
                `= (${a1})(${b2}) - (${a2})(${b1}) = ${a1 * b2} - ${a2 * b1} = ${cz}`
            ],
            explain: `<strong>Step 1:</strong> The z-component of \\(\\mathbf{a}\\times\\mathbf{b}\\) is \\(a_x b_y - a_y b_x\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\((${a1})(${b2}) - (${a2})(${b1}) = ${a1 * b2} - (${a2 * b1})\\).<br><br>` +
                     `<strong>Step 3:</strong> Result: \\(${cz}\\).`
        };
    },

    /**
     * 4. qCrossProductFull - Medium (MC)
     * Compute full a×b as (cx, cy, cz). 4 options.
     */
    qCrossProductFull() {
        let a1, a2, a3, b1, b2, b3, cx, cy, cz;
        // Ensure at least one non-zero component in result
        do {
            a1 = MathUtils.randInt(-3, 3);
            a2 = MathUtils.randInt(-3, 3);
            a3 = MathUtils.randInt(-3, 3);
            b1 = MathUtils.randInt(-3, 3);
            b2 = MathUtils.randInt(-3, 3);
            b3 = MathUtils.randInt(-3, 3);
            cx = a2 * b3 - a3 * b2;
            cy = a3 * b1 - a1 * b3;
            cz = a1 * b2 - a2 * b1;
        } while (cx === 0 && cy === 0 && cz === 0);

        const aVec = `(${a1},\\,${a2},\\,${a3})`;
        const bVec = `(${b1},\\,${b2},\\,${b3})`;

        function vecTex(x, y, z) {
            return `(${x},\\,${y},\\,${z})`;
        }

        const correctTex = vecTex(cx, cy, cz);

        // Distractors: swap signs on one or more components
        const distractorCandidates = [
            vecTex(-cx, cy, cz),
            vecTex(cx, -cy, cz),
            vecTex(cx, cy, -cz),
            vecTex(-cx, -cy, cz),
            vecTex(-cx, cy, -cz),
            vecTex(cx, -cy, -cz),
            vecTex(-cx, -cy, -cz),
            // Swap components
            vecTex(cy, cx, cz),
            vecTex(cx, cz, cy),
        ];

        const optionTexts = [correctTex];
        for (const d of distractorCandidates) {
            if (!optionTexts.includes(d) && optionTexts.length < 4) {
                optionTexts.push(d);
            }
        }
        // Fill if needed
        let fill = 1;
        while (optionTexts.length < 4) {
            const candidate = vecTex(cx + fill, cy, cz);
            if (!optionTexts.includes(candidate)) optionTexts.push(candidate);
            fill++;
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Full Cross Product',
            difficulty: 'medium',
            text: 'Compute \\(\\mathbf{a} \\times \\mathbf{b}\\) and select the correct result.',
            latex: `\\(\\mathbf{a} = ${aVec},\\quad \\mathbf{b} = ${bVec}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\mathbf{a}\\times\\mathbf{b} = \\begin{vmatrix}\\mathbf{i}&\\mathbf{j}&\\mathbf{k}\\\\a_x&a_y&a_z\\\\b_x&b_y&b_z\\end{vmatrix}`,
                `= (a_y b_z - a_z b_y,\\; a_z b_x - a_x b_z,\\; a_x b_y - a_y b_x)`
            ],
            explain: `<strong>Step 1:</strong> Use the determinant formula:<br>` +
                     `\\(\\mathbf{a}\\times\\mathbf{b} = (a_y b_z - a_z b_y,\\; a_z b_x - a_x b_z,\\; a_x b_y - a_y b_x)\\).<br><br>` +
                     `<strong>Step 2:</strong> x-component: \\((${a2})(${b3}) - (${a3})(${b2}) = ${a2 * b3} - ${a3 * b2} = ${cx}\\).<br><br>` +
                     `<strong>Step 3:</strong> y-component: \\((${a3})(${b1}) - (${a1})(${b3}) = ${a3 * b1} - ${a1 * b3} = ${cy}\\).<br><br>` +
                     `<strong>Step 4:</strong> z-component: \\((${a1})(${b2}) - (${a2})(${b1}) = ${a1 * b2} - ${a2 * b1} = ${cz}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\mathbf{a}\\times\\mathbf{b} = ${correctTex}\\).`
        };
    },

    /**
     * 5. qAreaParallelogram - Medium (Free)
     * Area of parallelogram = |a×b|. Uses a=(a1,0,0), b=(0,b2,0) so |a×b|=|a1*b2|.
     */
    qAreaParallelogram() {
        let a1, b2;
        do { a1 = MathUtils.randInt(-4, 4); } while (a1 === 0);
        do { b2 = MathUtils.randInt(-4, 4); } while (b2 === 0);

        // a×b = (0*0 - 0*b2, 0*0 - a1*0, a1*b2 - 0*0) = (0, 0, a1*b2)
        const cz = a1 * b2;
        const area = Math.abs(cz);

        const aVec = `(${a1},\\,0,\\,0)`;
        const bVec = `(0,\\,${b2},\\,0)`;

        return {
            type: 'free',
            rule: 'Area of Parallelogram',
            difficulty: 'medium',
            text: 'Vectors \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\) form adjacent sides of a parallelogram. Find its area.',
            latex: `\\(\\mathbf{a} = ${aVec},\\quad \\mathbf{b} = ${bVec}\\)`,
            answer: area,
            answerTex: String(area),
            options: [],
            hintTex: [
                `\\text{Area} = |\\mathbf{a}\\times\\mathbf{b}|`,
                `\\mathbf{a}\\times\\mathbf{b} = (0,\\,0,\\,${cz}) \\implies |\\mathbf{a}\\times\\mathbf{b}| = ${area}`
            ],
            explain: `<strong>Step 1:</strong> The area of a parallelogram with adjacent sides \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\) is \\(|\\mathbf{a}\\times\\mathbf{b}|\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute \\(\\mathbf{a}\\times\\mathbf{b}\\):<br>` +
                     `x: \\((0)(0) - (0)(${b2}) = 0\\)<br>` +
                     `y: \\((0)(0) - (${a1})(0) = 0\\)<br>` +
                     `z: \\((${a1})(${b2}) - (0)(0) = ${cz}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(|\\mathbf{a}\\times\\mathbf{b}| = |(0,0,${cz})| = ${area}\\).<br><br>` +
                     `<strong>Answer:</strong> Area \\(= ${area}\\).`
        };
    },

    /**
     * 6. qAreaTriangle - Medium (Free)
     * Area of triangle = 0.5|a×b|. Uses a=(a1,0,0), b=(0,b2,0).
     */
    qAreaTriangle() {
        let a1, b2;
        do { a1 = MathUtils.randInt(-5, 5); } while (a1 === 0);
        do { b2 = MathUtils.randInt(-5, 5); } while (b2 === 0);

        const cz = a1 * b2;
        const crossMag = Math.abs(cz);
        const area = crossMag / 2;

        const aVec = `(${a1},\\,0,\\,0)`;
        const bVec = `(0,\\,${b2},\\,0)`;

        // Format answer: integer or .5
        const answerTex = Number.isInteger(area) ? String(area) : `${crossMag}/2`;
        const answerNum = area;

        return {
            type: 'free',
            rule: 'Area of Triangle',
            difficulty: 'medium',
            text: 'Vectors \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\) define two sides of a triangle from the same vertex. Find the area of the triangle.',
            latex: `\\(\\mathbf{a} = ${aVec},\\quad \\mathbf{b} = ${bVec}\\)`,
            answer: answerNum,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Area of triangle} = \\tfrac{1}{2}|\\mathbf{a}\\times\\mathbf{b}|`,
                `\\mathbf{a}\\times\\mathbf{b} = (0,\\,0,\\,${cz}),\\quad |\\mathbf{a}\\times\\mathbf{b}| = ${crossMag}`
            ],
            explain: `<strong>Step 1:</strong> Area of triangle \\(= \\frac{1}{2}|\\mathbf{a}\\times\\mathbf{b}|\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute \\(\\mathbf{a}\\times\\mathbf{b} = (0,\\,0,\\,${cz})\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(|\\mathbf{a}\\times\\mathbf{b}| = ${crossMag}\\).<br><br>` +
                     `<strong>Step 4:</strong> Area \\(= \\frac{1}{2}\\times ${crossMag} = ${answerTex}\\).`
        };
    },

    /**
     * 7. qPerpendicularCheck - Easy (MC)
     * If a×b = 0, are a and b parallel or perpendicular?
     */
    qPerpendicularCheck() {
        const options = MathUtils.shuffle([
            { value: 1, tex: `\\text{Parallel — since } \\sin\\theta = 0 \\text{ means } \\theta = 0^\\circ \\text{ or } 180^\\circ` },
            { value: 0, tex: `\\text{Perpendicular — since } \\sin 90^\\circ = 1` },
            { value: 0, tex: `\\text{Perpendicular — since the cross product is zero}` },
            { value: 0, tex: `\\text{Neither — more information is needed}` }
        ]);

        return {
            type: 'mc',
            rule: 'Parallel via Cross Product',
            difficulty: 'easy',
            text: 'If \\(\\mathbf{a} \\times \\mathbf{b} = \\mathbf{0}\\), what can you conclude about \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\) (assuming neither is the zero vector)?',
            latex: '',
            answer: 1,
            answerTex: `\\text{Parallel} \\;(\\theta = 0^\\circ \\text{ or } 180^\\circ)`,
            options: options,
            hintTex: [
                `|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta`,
                `\\text{If } |\\mathbf{a}\\times\\mathbf{b}| = 0 \\text{ and } \\mathbf{a},\\mathbf{b}\\neq\\mathbf{0},\\text{ then } \\sin\\theta = 0`
            ],
            explain: `<strong>Step 1:</strong> Recall \\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\).<br><br>` +
                     `<strong>Step 2:</strong> If \\(\\mathbf{a}\\times\\mathbf{b} = \\mathbf{0}\\) and both vectors are non-zero, then \\(\\sin\\theta = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\sin\\theta = 0\\) means \\(\\theta = 0^\\circ\\) or \\(\\theta = 180^\\circ\\) — the vectors are <strong>parallel</strong>.<br><br>` +
                     `<strong>Note:</strong> Perpendicular vectors have \\(\\theta = 90^\\circ\\), which gives \\(\\sin 90^\\circ = 1\\) — the cross product would be at its maximum, not zero.`
        };
    },

    /**
     * 8. qNormalToPlane - Medium (Free)
     * Vectors u and v lie in a plane. Find z-component of normal u×v.
     */
    qNormalToPlane() {
        let u1, u2, u3, v1, v2, v3, nz;
        do {
            u1 = MathUtils.randInt(-3, 3);
            u2 = MathUtils.randInt(-3, 3);
            u3 = MathUtils.randInt(-3, 3);
            v1 = MathUtils.randInt(-3, 3);
            v2 = MathUtils.randInt(-3, 3);
            v3 = MathUtils.randInt(-3, 3);
            nz = u1 * v2 - u2 * v1;
        } while (nz === 0);

        const nx = u2 * v3 - u3 * v2;
        const ny = u3 * v1 - u1 * v3;

        const uVec = `(${u1},\\,${u2},\\,${u3})`;
        const vVec = `(${v1},\\,${v2},\\,${v3})`;

        return {
            type: 'free',
            rule: 'Normal to a Plane',
            difficulty: 'medium',
            text: 'Vectors \\(\\mathbf{u}\\) and \\(\\mathbf{v}\\) lie in a plane. Find the z-component of the normal vector \\(\\mathbf{n} = \\mathbf{u}\\times\\mathbf{v}\\).',
            latex: `\\(\\mathbf{u} = ${uVec},\\quad \\mathbf{v} = ${vVec}\\)`,
            answer: nz,
            answerTex: String(nz),
            options: [],
            hintTex: [
                `\\mathbf{n} = \\mathbf{u}\\times\\mathbf{v} \\text{ is perpendicular to the plane}`,
                `n_z = u_x v_y - u_y v_x = (${u1})(${v2}) - (${u2})(${v1}) = ${u1 * v2} - ${u2 * v1} = ${nz}`
            ],
            explain: `<strong>Step 1:</strong> The normal vector is \\(\\mathbf{n} = \\mathbf{u}\\times\\mathbf{v}\\), which is perpendicular to both \\(\\mathbf{u}\\) and \\(\\mathbf{v}\\).<br><br>` +
                     `<strong>Step 2:</strong> z-component: \\(n_z = u_x v_y - u_y v_x\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\((${u1})(${v2}) - (${u2})(${v1}) = ${u1 * v2} - (${u2 * v1}) = ${nz}\\).<br><br>` +
                     `<strong>Note:</strong> The full normal vector is \\(\\mathbf{n} = (${nx},\\,${ny},\\,${nz})\\).`
        };
    },

    /**
     * 9. qMagnitudeCross - Medium (MC or Free)
     * |a×b| = |a||b|sin(θ). Randomise |a|, |b|, θ.
     * θ=90° → free (integer answer); other angles → MC.
     */
    qMagnitudeCross() {
        const magnitudes = [2, 3, 4, 5];
        const bMagnitudes = [2, 3, 4];
        const angles = [
            { deg: 30,  sin: 0.5,                 sinTex: '\\tfrac{1}{2}' },
            { deg: 45,  sin: Math.SQRT2 / 2,       sinTex: '\\tfrac{\\sqrt{2}}{2}' },
            { deg: 60,  sin: Math.sqrt(3) / 2,     sinTex: '\\tfrac{\\sqrt{3}}{2}' },
            { deg: 90,  sin: 1,                    sinTex: '1' }
        ];

        const modA = MathUtils.pick(magnitudes);
        const modB = MathUtils.pick(bMagnitudes);
        const angle = MathUtils.pick(angles);

        const exactVal = modA * modB * angle.sin;
        const isInteger = Number.isInteger(exactVal);
        const displayAnswer = isInteger ? exactVal : parseFloat(exactVal.toFixed(4));

        // Build answer TeX
        let answerTex;
        if (angle.deg === 90) {
            answerTex = String(modA * modB);
        } else if (angle.deg === 30) {
            const prod = modA * modB;
            // prod/2 — simplify
            const [n, d] = MathUtils.simplifyFraction(prod, 2);
            answerTex = d === 1 ? String(n) : `\\frac{${n}}{${d}}`;
        } else if (angle.deg === 45) {
            const prod = modA * modB;
            const [n, d] = MathUtils.simplifyFraction(prod, 2);
            answerTex = d === 1 ? `${n}\\sqrt{2}` : `\\frac{${n}\\sqrt{2}}{${d}}`;
        } else {
            // 60°: prod * sqrt(3)/2
            const prod = modA * modB;
            const [n, d] = MathUtils.simplifyFraction(prod, 2);
            answerTex = d === 1 ? `${n}\\sqrt{3}` : `\\frac{${n}\\sqrt{3}}{${d}}`;
        }

        if (angle.deg === 90) {
            // Free response - integer answer
            return {
                type: 'free',
                rule: 'Magnitude of Cross Product',
                difficulty: 'medium',
                text: `Given \\(|\\mathbf{a}| = ${modA}\\), \\(|\\mathbf{b}| = ${modB}\\), and the angle between them is \\(${angle.deg}^\\circ\\), find \\(|\\mathbf{a}\\times\\mathbf{b}|\\).`,
                latex: `\\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\)`,
                answer: modA * modB,
                answerTex: answerTex,
                options: [],
                hintTex: [
                    `|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta`,
                    `= ${modA}\\times ${modB}\\times \\sin ${angle.deg}^\\circ = ${modA}\\times ${modB}\\times ${angle.sinTex}`
                ],
                explain: `<strong>Step 1:</strong> Use the formula \\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(${modA}\\times ${modB}\\times \\sin ${angle.deg}^\\circ\\).<br><br>` +
                         `<strong>Step 3:</strong> \\(\\sin ${angle.deg}^\\circ = ${angle.sinTex} = 1\\), so the result is \\(${modA}\\times ${modB}\\times 1 = ${modA * modB}\\).`
            };
        }

        // MC for non-trivial angles
        function makeOption(a, b, ang) {
            const v = a * b * ang.sin;
            const prod = a * b;
            let tex;
            if (ang.deg === 30) {
                const [n, d] = MathUtils.simplifyFraction(prod, 2);
                tex = d === 1 ? String(n) : `\\frac{${n}}{${d}}`;
            } else if (ang.deg === 45) {
                const [n, d] = MathUtils.simplifyFraction(prod, 2);
                tex = d === 1 ? `${n}\\sqrt{2}` : `\\frac{${n}\\sqrt{2}}{${d}}`;
            } else {
                const [n, d] = MathUtils.simplifyFraction(prod, 2);
                tex = d === 1 ? `${n}\\sqrt{3}` : `\\frac{${n}\\sqrt{3}}{${d}}`;
            }
            return { tex, val: v };
        }

        const correctOpt = { value: 1, tex: answerTex };
        const distractorCandidates = [];

        // Distractor: wrong angle (sin θ → 1 i.e. 90°)
        distractorCandidates.push({ value: 0, tex: String(modA * modB) });
        // Distractor: omitted sin (just |a||b|)
        distractorCandidates.push({ value: 0, tex: String(modA * modB) + `\\sin${angle.deg}^\\circ` });
        // Distractor: used cos instead of sin
        const cosTex = angle.deg === 30 ? `\\frac{${modA * modB}\\sqrt{3}}{2}` :
                       angle.deg === 45 ? `\\frac{${modA * modB}\\sqrt{2}}{2}` :
                       String(Math.round(modA * modB * 0.5));
        distractorCandidates.push({ value: 0, tex: cosTex });
        // Distractor: doubled answer
        distractorCandidates.push({ value: 0, tex: `2${answerTex}` });

        const opts = [correctOpt];
        for (const d of distractorCandidates) {
            if (opts.length < 4 && !opts.some(o => o.tex === d.tex)) {
                opts.push(d);
            }
        }
        while (opts.length < 4) {
            opts.push({ value: 0, tex: `${modA + opts.length}\\times ${modB}` });
        }

        const shuffled = MathUtils.shuffle(opts);

        return {
            type: 'mc',
            rule: 'Magnitude of Cross Product',
            difficulty: 'medium',
            text: `Given \\(|\\mathbf{a}| = ${modA}\\), \\(|\\mathbf{b}| = ${modB}\\), and the angle between them is \\(${angle.deg}^\\circ\\), find \\(|\\mathbf{a}\\times\\mathbf{b}|\\).`,
            latex: `\\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\)`,
            answer: 1,
            answerTex: answerTex,
            options: shuffled,
            hintTex: [
                `|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta`,
                `= ${modA}\\times ${modB}\\times \\sin ${angle.deg}^\\circ = ${modA}\\times ${modB}\\times ${angle.sinTex}`
            ],
            explain: `<strong>Step 1:</strong> Use \\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(\\sin ${angle.deg}^\\circ = ${angle.sinTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= ${modA}\\times ${modB}\\times ${angle.sinTex} = ${answerTex}\\).`
        };
    },

    /**
     * 10. qAntiCommutativity - Hard (MC)
     * If a×b = (p,q,r), what is b×a?
     */
    qAntiCommutativity() {
        let p, q, r;
        do {
            p = MathUtils.randInt(-3, 3);
            q = MathUtils.randInt(-3, 3);
            r = MathUtils.randInt(-3, 3);
        } while (p === 0 && q === 0 && r === 0);

        const crossTex = `(${p},\\,${q},\\,${r})`;
        const correctTex = `(${-p},\\,${-q},\\,${-r})`;

        const options = MathUtils.shuffle([
            { value: 1, tex: correctTex },
            { value: 0, tex: crossTex },
            { value: 0, tex: `(${p},\\,${-q},\\,${r})` },
            { value: 0, tex: `(${-p},\\,${q},\\,${-r})` }
        ]);

        return {
            type: 'mc',
            rule: 'Anti-commutativity',
            difficulty: 'hard',
            text: `If \\(\\mathbf{a}\\times\\mathbf{b} = ${crossTex}\\), what is \\(\\mathbf{b}\\times\\mathbf{a}\\)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{The cross product is anti-commutative: } \\mathbf{b}\\times\\mathbf{a} = -(\\mathbf{a}\\times\\mathbf{b})`,
                `= -(${crossTex}) = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> The cross product is <em>anti-commutative</em>: \\(\\mathbf{b}\\times\\mathbf{a} = -(\\mathbf{a}\\times\\mathbf{b})\\).<br><br>` +
                     `<strong>Step 2:</strong> Negate every component: \\(-(${crossTex}) = ${correctTex}\\).<br><br>` +
                     `<strong>Why?</strong> Swapping the two vectors reverses the direction of the perpendicular by the right-hand rule, so the result flips sign. This is a key property distinguishing the cross product from the dot product.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => CROSS_PROD.qCrossProductX(),       weight: 3, diff: 'easy'   },  // 0
            { fn: () => CROSS_PROD.qCrossProductY(),       weight: 3, diff: 'easy'   },  // 1
            { fn: () => CROSS_PROD.qCrossProductZ(),       weight: 3, diff: 'easy'   },  // 2
            { fn: () => CROSS_PROD.qCrossProductFull(),    weight: 2, diff: 'medium' },  // 3
            { fn: () => CROSS_PROD.qAreaParallelogram(),   weight: 2, diff: 'medium' },  // 4
            { fn: () => CROSS_PROD.qAreaTriangle(),        weight: 2, diff: 'medium' },  // 5
            { fn: () => CROSS_PROD.qPerpendicularCheck(),  weight: 3, diff: 'easy'   },  // 6
            { fn: () => CROSS_PROD.qNormalToPlane(),       weight: 2, diff: 'medium' },  // 7
            { fn: () => CROSS_PROD.qMagnitudeCross(),      weight: 2, diff: 'medium' },  // 8
            { fn: () => CROSS_PROD.qAntiCommutativity(),   weight: 1, diff: 'hard'   }   // 9
        ];

        let filtered = pool;
        if (CROSS_PROD.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (CROSS_PROD.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (CROSS_PROD.level === 'hard') {
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
        CROSS_PROD.score = 0;
        CROSS_PROD.total = 0;
        CROSS_PROD.streak = 0;
        CROSS_PROD.answered = false;
        CROSS_PROD.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="CROSS_PROD.unload()">Cross Product (3.16)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Cross Product</h1>
                <p>IB Math AA 3.16 — Vector product, area and normal vectors</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CROSS_PROD.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CROSS_PROD.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CROSS_PROD.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CROSS_PROD.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="cp-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="cp-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="cp-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="cp-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="cp-question-card">
                <span class="rule-tag" id="cp-rule"></span>
                <span class="difficulty-tag" id="cp-difficulty"></span>
                <div class="question-text" id="cp-text"></div>
                <div class="question-prompt" id="cp-latex"></div>
                <div id="cp-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="cp-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="cp-feedback">
                <div class="feedback-title" id="cp-feedback-title"></div>
                <div class="feedback-explanation" id="cp-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cp-hint-btn" onclick="CROSS_PROD.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cp-next-btn" onclick="CROSS_PROD.next()" style="display:none;">Next Question</button>
            </div>
        `;

        CROSS_PROD.next();
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
        CROSS_PROD.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        CROSS_PROD.score = 0;
        CROSS_PROD.total = 0;
        CROSS_PROD.streak = 0;
        CROSS_PROD.updateStats();
        CROSS_PROD.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        CROSS_PROD.answered = false;
        CROSS_PROD.hintIndex = 0;
        CROSS_PROD.currentQ = CROSS_PROD.pickQuestion();
        const q = CROSS_PROD.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('cp-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('cp-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('cp-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('cp-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('cp-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="CROSS_PROD.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="cp-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')CROSS_PROD.checkFree()">
                    <button class="btn btn-primary" onclick="CROSS_PROD.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('cp-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('cp-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('cp-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('cp-next-btn').style.display = 'none';
        document.getElementById('cp-hint-btn').style.display = '';
        document.getElementById('cp-hint-btn').disabled = false;

        // Render KaTeX
        CROSS_PROD.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = CROSS_PROD.currentQ;
        if (!q || !q.hintTex || CROSS_PROD.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('cp-hint-box');
        const hintContent = CROSS_PROD.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[CROSS_PROD.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        CROSS_PROD.hintIndex++;

        if (CROSS_PROD.hintIndex >= q.hintTex.length) {
            document.getElementById('cp-hint-btn').disabled = true;
        }

        CROSS_PROD.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (CROSS_PROD.answered) return;
        CROSS_PROD.answered = true;
        CROSS_PROD.total++;

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
            CROSS_PROD.score++;
            CROSS_PROD.streak++;
        } else {
            btn.classList.add('incorrect');
            CROSS_PROD.streak = 0;
        }

        CROSS_PROD.showFeedback(isCorrect);
        CROSS_PROD.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (CROSS_PROD.answered) return;

        const inp = document.getElementById('cp-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        CROSS_PROD.answered = true;
        CROSS_PROD.total++;
        inp.disabled = true;

        const q = CROSS_PROD.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            CROSS_PROD.score++;
            CROSS_PROD.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            CROSS_PROD.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        CROSS_PROD.showFeedback(isCorrect);
        CROSS_PROD.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = CROSS_PROD.currentQ;
        const fb = document.getElementById('cp-feedback');
        const title = document.getElementById('cp-feedback-title');
        const explanation = document.getElementById('cp-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (CROSS_PROD.streak > 1) {
                title.textContent = `Correct! (${CROSS_PROD.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('cp-next-btn').style.display = '';
        document.getElementById('cp-hint-btn').style.display = 'none';

        CROSS_PROD.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('cp-score');
        const totalEl = document.getElementById('cp-total');
        const streakEl = document.getElementById('cp-streak');
        const accEl = document.getElementById('cp-accuracy');

        if (scoreEl) scoreEl.textContent = CROSS_PROD.score;
        if (totalEl) totalEl.textContent = CROSS_PROD.total;
        if (streakEl) streakEl.textContent = CROSS_PROD.streak;
        if (accEl) {
            accEl.textContent = CROSS_PROD.total > 0
                ? Math.round((CROSS_PROD.score / CROSS_PROD.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['cross-product'] = () => CROSS_PROD.load();
}
