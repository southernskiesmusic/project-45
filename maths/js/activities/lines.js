/*
 * lines.js - IB Math AA 2.1: Lines
 * Gradient, equations, parallel/perpendicular, midpoint, distance, intersection
 */

const LINES = {
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
     * 1. qGradient - Easy
     * Find the gradient between two points with integer coordinates.
     */
    qGradient() {
        const x1 = MathUtils.randInt(-8, 8);
        let x2;
        do { x2 = MathUtils.randInt(-8, 8); } while (x2 === x1);
        const y1 = MathUtils.randInt(-8, 8);
        const y2 = MathUtils.randInt(-8, 8);

        const dy = y2 - y1;
        const dx = x2 - x1;
        const [sn, sd] = MathUtils.simplifyFraction(dy, dx);
        const answer = sn / sd;
        const answerTex = MathUtils.fractionTeX(dy, dx);

        return {
            type: 'free',
            rule: 'Gradient',
            difficulty: 'easy',
            text: 'Find the gradient of the line passing through the two points below.',
            latex: `\\(A(${x1},\\,${y1})\\) and \\(B(${x2},\\,${y2})\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Gradient} = \\frac{y_2 - y_1}{x_2 - x_1}`,
                `= \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${dy}}{${dx}}`
            ],
            explain: `<strong>Step 1:</strong> Use the gradient formula \\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${dy}}{${dx}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(m = ${answerTex}\\).`
        };
    },

    /**
     * 2. qMidpoint - Easy (MC)
     * Find the midpoint of two points.
     */
    qMidpoint() {
        const x1 = MathUtils.randInt(-8, 8);
        const y1 = MathUtils.randInt(-8, 8);
        const x2 = MathUtils.randInt(-8, 8);
        const y2 = MathUtils.randInt(-8, 8);

        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        // Format coordinate as string for display
        function coordTex(a, b) {
            const ax = Number.isInteger(a) ? String(a) : MathUtils.fractionTeX(a * 2, 2);
            const ay = Number.isInteger(b) ? String(b) : MathUtils.fractionTeX(b * 2, 2);
            return `\\left(${ax},\\,${ay}\\right)`;
        }

        const correctTex = coordTex(mx, my);

        // Generate distractors
        const distractors = [];
        // Distractor 1: subtracted instead of added
        distractors.push(coordTex((x1 - x2) / 2, (y1 - y2) / 2));
        // Distractor 2: forgot to divide by 2
        distractors.push(coordTex(x1 + x2, y1 + y2));
        // Distractor 3: swapped x and y
        distractors.push(coordTex(my, mx));

        // If any distractor matches correct, replace with random offset
        const optionTexts = [correctTex];
        for (const d of distractors) {
            if (optionTexts.includes(d)) {
                optionTexts.push(coordTex(mx + MathUtils.nonZeroRandInt(-3, 3), my + MathUtils.nonZeroRandInt(-3, 3)));
            } else {
                optionTexts.push(d);
            }
        }

        // Build options with values
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Midpoint',
            difficulty: 'easy',
            text: 'Find the midpoint of the segment joining the two points below.',
            latex: `\\(A(${x1},\\,${y1})\\) and \\(B(${x2},\\,${y2})\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `M = \\left(\\frac{x_1 + x_2}{2},\\,\\frac{y_1 + y_2}{2}\\right)`,
                `= \\left(\\frac{${x1} + ${x2}}{2},\\,\\frac{${y1} + ${y2}}{2}\\right)`
            ],
            explain: `<strong>Step 1:</strong> Use the midpoint formula \\(M = \\left(\\frac{x_1+x_2}{2},\\,\\frac{y_1+y_2}{2}\\right)\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(M = \\left(\\frac{${x1}+${x2}}{2},\\,\\frac{${y1}+${y2}}{2}\\right) = \\left(\\frac{${x1 + x2}}{2},\\,\\frac{${y1 + y2}}{2}\\right)\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(M = ${correctTex}\\).`
        };
    },

    /**
     * 3. qDistance - Easy
     * Find distance between two points using Pythagorean triples for clean answers.
     */
    qDistance() {
        const triples = [
            [3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [9, 12, 15], [7, 24, 25]
        ];
        const [a, b, c] = MathUtils.pick(triples);

        // Randomly flip signs and order
        const dx = MathUtils.pick([1, -1]) * a;
        const dy = MathUtils.pick([1, -1]) * b;

        const x1 = MathUtils.randInt(-5, 5);
        const y1 = MathUtils.randInt(-5, 5);
        const x2 = x1 + dx;
        const y2 = y1 + dy;

        return {
            type: 'free',
            rule: 'Distance',
            difficulty: 'easy',
            text: 'Find the distance between the two points below.',
            latex: `\\(A(${x1},\\,${y1})\\) and \\(B(${x2},\\,${y2})\\)`,
            answer: c,
            answerTex: String(c),
            options: [],
            hintTex: [
                `d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`,
                `= \\sqrt{(${x2}-(${x1}))^2 + (${y2}-(${y1}))^2} = \\sqrt{${dx * dx} + ${dy * dy}}`
            ],
            explain: `<strong>Step 1:</strong> Use the distance formula \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(d = \\sqrt{(${x2} - (${x1}))^2 + (${y2} - (${y1}))^2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(d = \\sqrt{${dx * dx} + ${dy * dy}} = \\sqrt{${c * c}} = ${c}\\).`
        };
    },

    /**
     * 4. qEquationFromPoints - Medium (MC)
     * Find equation y = mx + c through two points.
     */
    qEquationFromPoints() {
        const x1 = MathUtils.randInt(-6, 6);
        let x2;
        do { x2 = MathUtils.randInt(-6, 6); } while (x2 === x1);
        const y1 = MathUtils.randInt(-8, 8);
        const y2 = MathUtils.randInt(-8, 8);

        const dy = y2 - y1;
        const dx = x2 - x1;
        const [mn, md] = MathUtils.simplifyFraction(dy, dx);
        const mVal = mn / md;

        // c = y1 - m * x1
        // To keep fractions exact: c = (y1 * md - mn * x1) / md
        const cNum = y1 * md - mn * x1;
        const [cn, cd] = MathUtils.simplifyFraction(cNum, md);
        const cVal = cn / cd;

        // Format y = mx + c in LaTeX
        function formatLine(m, mFracN, mFracD, cFracN, cFracD) {
            let mTex;
            const [smn, smd] = MathUtils.simplifyFraction(mFracN, mFracD);
            if (smd === 1) {
                if (smn === 1) mTex = '';
                else if (smn === -1) mTex = '-';
                else mTex = String(smn);
            } else {
                const sign = smn < 0 ? '-' : '';
                mTex = `${sign}\\frac{${Math.abs(smn)}}{${smd}}`;
            }

            const [scn, scd] = MathUtils.simplifyFraction(cFracN, cFracD);
            let cTex;
            if (scd === 1) {
                if (scn === 0) cTex = '';
                else if (scn > 0) cTex = ` + ${scn}`;
                else cTex = ` - ${Math.abs(scn)}`;
            } else {
                if (scn > 0) cTex = ` + \\frac{${scn}}{${scd}}`;
                else cTex = ` - \\frac{${Math.abs(scn)}}{${scd}}`;
            }

            return `y = ${mTex}x${cTex}`;
        }

        const correctTex = formatLine(mVal, mn, md, cn, cd);

        // Distractors
        function distract() {
            const variations = [
                // Negate gradient
                () => formatLine(-mVal, -mn, md, cn, cd),
                // Wrong intercept (use y2 instead of computing correctly)
                () => formatLine(mVal, mn, md, y2 * cd, cd),
                // Swapped dy/dx
                () => {
                    const [sn2, sd2] = MathUtils.simplifyFraction(dx, dy === 0 ? 1 : dy);
                    const m2 = sn2 / sd2;
                    const c2Num = y1 * sd2 - sn2 * x1;
                    const [cn2, cd2] = MathUtils.simplifyFraction(c2Num, sd2);
                    return formatLine(m2, sn2, sd2, cn2, cd2);
                },
                // Gradient correct but intercept offset
                () => {
                    const off = MathUtils.nonZeroRandInt(-3, 3);
                    const newCn = cn + off * cd;
                    return formatLine(mVal, mn, md, newCn, cd);
                }
            ];
            return MathUtils.pick(variations)();
        }

        const optionTexts = [correctTex];
        let attempts = 0;
        while (optionTexts.length < 4 && attempts < 30) {
            const d = distract();
            if (!optionTexts.includes(d)) {
                optionTexts.push(d);
            }
            attempts++;
        }
        // Fill if needed
        while (optionTexts.length < 4) {
            const off = optionTexts.length * (MathUtils.randInt(0, 1) ? 1 : -1);
            const fallback = formatLine(mVal, mn, md, cn + off * cd, cd);
            if (!optionTexts.includes(fallback)) optionTexts.push(fallback);
            else optionTexts.push(formatLine(mVal + optionTexts.length, mn + optionTexts.length * md, md, cn, cd));
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        const mTeX = MathUtils.fractionTeX(dy, dx);
        const cTeX = MathUtils.fractionTeX(cNum, md);

        return {
            type: 'mc',
            rule: 'Equation from Points',
            difficulty: 'medium',
            text: 'Find the equation of the line passing through the two points below.',
            latex: `\\(A(${x1},\\,${y1})\\) and \\(B(${x2},\\,${y2})\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${dy}}{${dx}} = ${mTeX}`,
                `c = y_1 - mx_1 = ${y1} - (${mTeX})(${x1}) = ${cTeX}`
            ],
            explain: `<strong>Step 1:</strong> Find the gradient: \\(m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${dy}}{${dx}} = ${mTeX}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute into \\(y = mx + c\\) using point \\(A(${x1}, ${y1})\\):<br>` +
                     `\\(${y1} = (${mTeX})(${x1}) + c\\)<br>` +
                     `\\(c = ${cTeX}\\).<br><br>` +
                     `<strong>Step 3:</strong> The equation is \\(${correctTex}\\).`
        };
    },

    /**
     * 5. qParallel - Medium (Free response)
     * Given y = mx + c and a point, find the y-intercept of the parallel line.
     */
    qParallel() {
        const m = MathUtils.nonZeroRandInt(-5, 5);
        const c1 = MathUtils.randInt(-8, 8);
        const px = MathUtils.randInt(-5, 5);
        const py = MathUtils.randInt(-8, 8);

        // Parallel line has same gradient m, passes through (px, py)
        // py = m * px + c2 => c2 = py - m * px
        const c2 = py - m * px;

        // Format original line
        let mTex;
        if (m === 1) mTex = '';
        else if (m === -1) mTex = '-';
        else mTex = String(m);

        let cTex;
        if (c1 === 0) cTex = '';
        else if (c1 > 0) cTex = ` + ${c1}`;
        else cTex = ` - ${Math.abs(c1)}`;

        const lineTex = `y = ${mTex}x${cTex}`;

        let c2Tex;
        if (c2 === 0) c2Tex = '';
        else if (c2 > 0) c2Tex = ` + ${c2}`;
        else c2Tex = ` - ${Math.abs(c2)}`;

        const parallelTex = `y = ${mTex}x${c2Tex}`;

        return {
            type: 'free',
            rule: 'Parallel Lines',
            difficulty: 'medium',
            text: `A line is parallel to \\(${lineTex}\\) and passes through the point \\((${px},\\,${py})\\). Find the y-intercept of this line.`,
            latex: `\\text{Give the value of } c \\text{ in } y = mx + c`,
            answer: c2,
            answerTex: String(c2),
            options: [],
            hintTex: [
                `\\text{Parallel lines have the same gradient: } m = ${m}`,
                `c = y - mx = ${py} - (${m})(${px}) = ${py} - ${m * px} = ${c2}`
            ],
            explain: `<strong>Step 1:</strong> Parallel lines share the same gradient, so \\(m = ${m}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\((${px}, ${py})\\) into \\(y = ${m === 1 ? '' : m === -1 ? '-' : m}x + c\\):<br>` +
                     `\\(${py} = (${m})(${px}) + c\\)<br>` +
                     `\\(${py} = ${m * px} + c\\)<br>` +
                     `\\(c = ${c2}\\).<br><br>` +
                     `<strong>Step 3:</strong> The parallel line is \\(${parallelTex}\\).`
        };
    },

    /**
     * 6. qPerpendicular - Medium (MC)
     * Given a line and a point, find the perpendicular line equation.
     */
    qPerpendicular() {
        // Use integer gradient so perpendicular is a clean fraction
        const m1 = MathUtils.nonZeroRandInt(-4, 4);
        const c1 = MathUtils.randInt(-6, 6);
        const px = MathUtils.randInt(-4, 4);
        const py = MathUtils.randInt(-6, 6);

        // Perpendicular gradient: -1/m1
        const perpN = -1;
        const perpD = m1;
        const [pmn, pmd] = MathUtils.simplifyFraction(perpN, perpD);
        const perpM = pmn / pmd;

        // c2 = py - perpM * px
        // Exact: c2 = (py * pmd - pmn * px) / pmd
        const c2Num = py * pmd - pmn * px;
        const [c2n, c2d] = MathUtils.simplifyFraction(c2Num, pmd);

        // Format equation
        function fmtEq(mNum, mDen, cNum, cDen) {
            const [smn, smd] = MathUtils.simplifyFraction(mNum, mDen);
            let mPart;
            if (smd === 1) {
                if (smn === 1) mPart = '';
                else if (smn === -1) mPart = '-';
                else mPart = String(smn);
            } else {
                const sign = smn < 0 ? '-' : '';
                mPart = `${sign}\\frac{${Math.abs(smn)}}{${smd}}`;
            }

            const [scn, scd] = MathUtils.simplifyFraction(cNum, cDen);
            let cPart;
            if (scd === 1) {
                if (scn === 0) cPart = '';
                else if (scn > 0) cPart = ` + ${scn}`;
                else cPart = ` - ${Math.abs(scn)}`;
            } else {
                if (scn > 0) cPart = ` + \\frac{${scn}}{${scd}}`;
                else if (scn < 0) cPart = ` - \\frac{${Math.abs(scn)}}{${scd}}`;
                else cPart = '';
            }

            return `y = ${mPart}x${cPart}`;
        }

        const correctTex = fmtEq(pmn, pmd, c2n, c2d);

        // Format given line
        let m1Tex;
        if (m1 === 1) m1Tex = '';
        else if (m1 === -1) m1Tex = '-';
        else m1Tex = String(m1);

        let c1Part;
        if (c1 === 0) c1Part = '';
        else if (c1 > 0) c1Part = ` + ${c1}`;
        else c1Part = ` - ${Math.abs(c1)}`;

        const givenLine = `y = ${m1Tex}x${c1Part}`;

        // Distractors
        const distOptions = [correctTex];

        // Dist 1: Same gradient (parallel, not perp)
        const d1cNum = py * 1 - m1 * px;
        distOptions.push(fmtEq(m1, 1, d1cNum, 1));

        // Dist 2: Positive reciprocal instead of negative reciprocal
        const [posN, posD] = MathUtils.simplifyFraction(1, m1);
        const d2cNum = py * posD - posN * px;
        distOptions.push(fmtEq(posN, posD, d2cNum, posD));

        // Dist 3: Correct gradient but wrong intercept
        const d3off = MathUtils.nonZeroRandInt(-3, 3);
        distOptions.push(fmtEq(pmn, pmd, c2n + d3off * c2d, c2d));

        // Ensure uniqueness
        const finalOpts = [distOptions[0]];
        for (let i = 1; i < distOptions.length; i++) {
            if (!finalOpts.includes(distOptions[i])) {
                finalOpts.push(distOptions[i]);
            } else {
                const off = finalOpts.length * MathUtils.pick([1, -1]);
                finalOpts.push(fmtEq(pmn, pmd, c2n + off * c2d, c2d));
            }
        }
        while (finalOpts.length < 4) {
            const off = finalOpts.length * MathUtils.pick([1, -1]);
            const candidate = fmtEq(pmn, pmd, c2n + off * c2d, c2d);
            if (!finalOpts.includes(candidate)) finalOpts.push(candidate);
            else finalOpts.push(fmtEq(pmn + finalOpts.length, pmd, c2n, c2d));
        }

        const options = finalOpts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);
        const perpTeX = MathUtils.fractionTeX(pmn, pmd);

        return {
            type: 'mc',
            rule: 'Perpendicular Lines',
            difficulty: 'medium',
            text: `Find the equation of the line perpendicular to \\(${givenLine}\\) that passes through the point \\((${px},\\,${py})\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `m_1 \\times m_2 = -1 \\implies m_2 = -\\frac{1}{${m1}} = ${perpTeX}`,
                `c = ${py} - (${perpTeX})(${px})`
            ],
            explain: `<strong>Step 1:</strong> The gradient of the given line is \\(m_1 = ${m1}\\).<br><br>` +
                     `<strong>Step 2:</strong> Perpendicular gradient: \\(m_2 = -\\frac{1}{m_1} = ${perpTeX}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\((${px}, ${py})\\) into \\(y = ${perpTeX}x + c\\):<br>` +
                     `\\(c = ${py} - (${perpTeX})(${px}) = ${MathUtils.fractionTeX(c2n, c2d)}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex}\\).`
        };
    },

    /**
     * 7. qXIntercept - Easy (Free response)
     * Given y = mx + c, find x-intercept.
     */
    qXIntercept() {
        // Pick m and c so x-intercept is rational with small denominator
        const m = MathUtils.nonZeroRandInt(-5, 5);
        // Make c a multiple of m so answer is integer, or allow simple fractions
        const k = MathUtils.nonZeroRandInt(-6, 6);
        const c = k * m; // ensures x-intercept = -c/m = -k*m/m = -k (integer)

        const xInt = -k;

        let mTex;
        if (m === 1) mTex = '';
        else if (m === -1) mTex = '-';
        else mTex = String(m);

        let cTex;
        if (c === 0) cTex = '';
        else if (c > 0) cTex = ` + ${c}`;
        else cTex = ` - ${Math.abs(c)}`;

        const lineTex = `y = ${mTex}x${cTex}`;

        return {
            type: 'free',
            rule: 'x-intercept',
            difficulty: 'easy',
            text: `Find the x-intercept of the line below.`,
            latex: `\\(${lineTex}\\)`,
            answer: xInt,
            answerTex: String(xInt),
            options: [],
            hintTex: [
                `\\text{At the x-intercept, } y = 0`,
                `0 = ${m === 1 ? '' : m === -1 ? '-' : m}x + ${c} \\implies x = ${MathUtils.fractionTeX(-c, m)}`
            ],
            explain: `<strong>Step 1:</strong> At the x-intercept, \\(y = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Set \\(0 = ${m === 1 ? '' : m === -1 ? '-' : m}x + ${c}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(${m === 1 ? '' : m === -1 ? '-' : m}x = ${-c}\\), so \\(x = ${MathUtils.fractionTeX(-c, m)} = ${xInt}\\).`
        };
    },

    /**
     * 8. qPerpendicularBisector - Hard (MC)
     * Find the perpendicular bisector of segment AB.
     */
    qPerpendicularBisector() {
        const x1 = MathUtils.randInt(-6, 6);
        const y1 = MathUtils.randInt(-6, 6);
        let x2, y2;
        do {
            x2 = MathUtils.randInt(-6, 6);
        } while (x2 === x1);
        do {
            y2 = MathUtils.randInt(-6, 6);
        } while (y2 === y1);

        // Midpoint
        const mxNum = x1 + x2;
        const myNum = y1 + y2;
        const mx = mxNum / 2;
        const my = myNum / 2;

        // Gradient of AB
        const dy = y2 - y1;
        const dx = x2 - x1;

        // Perpendicular gradient: -dx/dy
        const [pmn, pmd] = MathUtils.simplifyFraction(-dx, dy);
        const perpM = pmn / pmd;

        // Equation: y - my = perpM * (x - mx)
        // y = perpM * x - perpM * mx + my
        // c = -perpM * mx + my = (-pmn * mx + my * pmd) / pmd
        // Using exact arithmetic with numerators:
        // mx = mxNum/2, my = myNum/2
        // c = (-pmn * mxNum/2 + myNum/2 * pmd) / pmd
        //   = (-pmn * mxNum + myNum * pmd) / (2 * pmd)
        const cBigNum = -pmn * mxNum + myNum * pmd;
        const cBigDen = 2 * pmd;
        const [cn, cd] = MathUtils.simplifyFraction(cBigNum, cBigDen);

        function fmtEq(mNum, mDen, cNum, cDen) {
            const [smn, smd] = MathUtils.simplifyFraction(mNum, mDen);
            let mPart;
            if (smd === 1) {
                if (smn === 1) mPart = '';
                else if (smn === -1) mPart = '-';
                else mPart = String(smn);
            } else {
                const sign = smn < 0 ? '-' : '';
                mPart = `${sign}\\frac{${Math.abs(smn)}}{${smd}}`;
            }

            const [scn, scd] = MathUtils.simplifyFraction(cNum, cDen);
            let cPart;
            if (scd === 1) {
                if (scn === 0) cPart = '';
                else if (scn > 0) cPart = ` + ${scn}`;
                else cPart = ` - ${Math.abs(scn)}`;
            } else {
                if (scn > 0) cPart = ` + \\frac{${scn}}{${scd}}`;
                else if (scn < 0) cPart = ` - \\frac{${Math.abs(scn)}}{${scd}}`;
                else cPart = '';
            }

            return `y = ${mPart}x${cPart}`;
        }

        const correctTex = fmtEq(pmn, pmd, cn, cd);

        // Distractors
        const distOptions = [correctTex];

        // Dist 1: Used gradient of AB instead of perpendicular
        const [abn, abd] = MathUtils.simplifyFraction(dy, dx);
        const d1cBigNum = -abn * mxNum + myNum * abd;
        const d1cBigDen = 2 * abd;
        const [d1cn, d1cd] = MathUtils.simplifyFraction(d1cBigNum, d1cBigDen);
        distOptions.push(fmtEq(abn, abd, d1cn, d1cd));

        // Dist 2: Correct gradient but through point A instead of midpoint
        const d2cNum = y1 * pmd - pmn * x1;
        const [d2cn, d2cd] = MathUtils.simplifyFraction(d2cNum, pmd);
        distOptions.push(fmtEq(pmn, pmd, d2cn, d2cd));

        // Dist 3: Negated perpendicular gradient
        const [npmn, npmd] = MathUtils.simplifyFraction(dx, dy);
        const d3cBigNum = -npmn * mxNum + myNum * npmd;
        const d3cBigDen = 2 * npmd;
        const [d3cn, d3cd] = MathUtils.simplifyFraction(d3cBigNum, d3cBigDen);
        distOptions.push(fmtEq(npmn, npmd, d3cn, d3cd));

        // Ensure uniqueness
        const finalOpts = [distOptions[0]];
        for (let i = 1; i < distOptions.length; i++) {
            if (!finalOpts.includes(distOptions[i])) {
                finalOpts.push(distOptions[i]);
            } else {
                const off = finalOpts.length * MathUtils.pick([1, -1]);
                finalOpts.push(fmtEq(pmn, pmd, cn + off * cd, cd));
            }
        }
        while (finalOpts.length < 4) {
            const off = finalOpts.length * MathUtils.pick([1, -1]);
            const candidate = fmtEq(pmn, pmd, cn + off * cd, cd);
            if (!finalOpts.includes(candidate)) finalOpts.push(candidate);
            else finalOpts.push(fmtEq(pmn + finalOpts.length, pmd, cn, cd));
        }

        const options = finalOpts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);
        const perpTeX = MathUtils.fractionTeX(-dx, dy);

        const mxTex = Number.isInteger(mx) ? String(mx) : MathUtils.fractionTeX(mxNum, 2);
        const myTex = Number.isInteger(my) ? String(my) : MathUtils.fractionTeX(myNum, 2);

        return {
            type: 'mc',
            rule: 'Perpendicular Bisector',
            difficulty: 'hard',
            text: 'Find the equation of the perpendicular bisector of segment AB.',
            latex: `\\(A(${x1},\\,${y1})\\) and \\(B(${x2},\\,${y2})\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Midpoint: } M = \\left(${mxTex},\\,${myTex}\\right), \\quad m_{AB} = ${MathUtils.fractionTeX(dy, dx)}`,
                `m_{\\perp} = ${perpTeX}, \\text{ passes through } M`
            ],
            explain: `<strong>Step 1:</strong> Find the midpoint: \\(M = \\left(${mxTex},\\,${myTex}\\right)\\).<br><br>` +
                     `<strong>Step 2:</strong> Gradient of AB: \\(m = ${MathUtils.fractionTeX(dy, dx)}\\).<br><br>` +
                     `<strong>Step 3:</strong> Perpendicular gradient: \\(m_{\\perp} = ${perpTeX}\\).<br><br>` +
                     `<strong>Step 4:</strong> Line through \\(M\\) with gradient \\(${perpTeX}\\):<br>` +
                     `\\(${correctTex}\\).`
        };
    },

    /**
     * 9. qIntersection - Hard (Free response, x-value)
     * Find intersection of two lines. Answer is the x-coordinate.
     */
    qIntersection() {
        // Generate two lines that intersect at an integer point
        const xSol = MathUtils.randInt(-6, 6);
        const ySol = MathUtils.randInt(-6, 6);

        const m1 = MathUtils.nonZeroRandInt(-4, 4);
        let m2;
        do { m2 = MathUtils.nonZeroRandInt(-4, 4); } while (m2 === m1);

        // c1 = ySol - m1 * xSol, c2 = ySol - m2 * xSol
        const c1 = ySol - m1 * xSol;
        const c2 = ySol - m2 * xSol;

        function fmtLine(m, c) {
            let mTex;
            if (m === 1) mTex = '';
            else if (m === -1) mTex = '-';
            else mTex = String(m);

            let cTex;
            if (c === 0) cTex = '';
            else if (c > 0) cTex = ` + ${c}`;
            else cTex = ` - ${Math.abs(c)}`;

            return `y = ${mTex}x${cTex}`;
        }

        const line1 = fmtLine(m1, c1);
        const line2 = fmtLine(m2, c2);

        return {
            type: 'free',
            rule: 'Intersection',
            difficulty: 'hard',
            text: `Find the x-coordinate of the point where the two lines below intersect.`,
            latex: `\\(${line1}\\) \\quad\\text{and}\\quad \\(${line2}\\)`,
            answer: xSol,
            answerTex: String(xSol),
            options: [],
            hintTex: [
                `\\text{Set the two equations equal: } ${m1 === 1 ? '' : m1 === -1 ? '-' : m1}x + ${c1} = ${m2 === 1 ? '' : m2 === -1 ? '-' : m2}x + ${c2}`,
                `${m1 - m2}x = ${c2 - c1} \\implies x = ${MathUtils.fractionTeX(c2 - c1, m1 - m2)}`
            ],
            explain: `<strong>Step 1:</strong> Set the equations equal:<br>` +
                     `\\(${m1 === 1 ? '' : m1 === -1 ? '-' : m1}x + ${c1} = ${m2 === 1 ? '' : m2 === -1 ? '-' : m2}x + ${c2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Collect x terms:<br>` +
                     `\\(${m1 - m2}x = ${c2 - c1}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(x = ${MathUtils.fractionTeX(c2 - c1, m1 - m2)} = ${xSol}\\).<br><br>` +
                     `<strong>Step 4:</strong> The intersection point is \\((${xSol},\\,${ySol})\\).`
        };
    },

    /**
     * 10. qPointOnLine - Easy (MC: Yes/No with reason)
     * Does point (a, b) lie on y = mx + c?
     */
    qPointOnLine() {
        const m = MathUtils.nonZeroRandInt(-5, 5);
        const c = MathUtils.randInt(-8, 8);
        const px = MathUtils.randInt(-5, 5);

        // Decide randomly if the point is on the line or not
        const onLine = MathUtils.randInt(0, 1) === 1;
        let py;
        if (onLine) {
            py = m * px + c;
        } else {
            py = m * px + c + MathUtils.nonZeroRandInt(-3, 3);
        }

        let mTex;
        if (m === 1) mTex = '';
        else if (m === -1) mTex = '-';
        else mTex = String(m);

        let cTex;
        if (c === 0) cTex = '';
        else if (c > 0) cTex = ` + ${c}`;
        else cTex = ` - ${Math.abs(c)}`;

        const lineTex = `y = ${mTex}x${cTex}`;
        const expectedY = m * px + c;

        let correctTex, correctValue;
        if (onLine) {
            correctTex = `\\text{Yes, } ${py} = ${m}(${px}) + ${c} = ${expectedY}`;
            correctValue = 1;
        } else {
            correctTex = `\\text{No, } ${m}(${px}) + ${c} = ${expectedY} \\neq ${py}`;
            correctValue = 0;
        }

        // Build 4 options
        const optionsList = [];

        if (onLine) {
            optionsList.push({
                value: 1,
                tex: `\\text{Yes -- substituting } x=${px} \\text{ gives } y=${expectedY}=${py}`
            });
            optionsList.push({
                value: 0,
                tex: `\\text{No -- substituting } x=${px} \\text{ gives } y=${expectedY + MathUtils.nonZeroRandInt(-2, 2)} \\neq ${py}`
            });
            optionsList.push({
                value: 0,
                tex: `\\text{No -- the point is above the line}`
            });
            optionsList.push({
                value: 0,
                tex: `\\text{Yes -- but only if } c = ${c + MathUtils.nonZeroRandInt(-2, 2)}`
            });
        } else {
            optionsList.push({
                value: 1,
                tex: `\\text{No -- substituting } x=${px} \\text{ gives } y=${expectedY} \\neq ${py}`
            });
            optionsList.push({
                value: 0,
                tex: `\\text{Yes -- substituting } x=${px} \\text{ gives } y=${py}`
            });
            optionsList.push({
                value: 0,
                tex: `\\text{Yes -- the gradient matches}`
            });
            optionsList.push({
                value: 0,
                tex: `\\text{No -- substituting } x=${px} \\text{ gives } y=${expectedY + MathUtils.nonZeroRandInt(1, 3)} \\neq ${py}`
            });
        }

        const shuffled = MathUtils.shuffle(optionsList);

        return {
            type: 'mc',
            rule: 'Point on Line',
            difficulty: 'easy',
            text: `Does the point \\((${px},\\,${py})\\) lie on the line \\(${lineTex}\\)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Substitute } x = ${px} \\text{ into } ${lineTex}`,
                `y = ${m}(${px}) + ${c} = ${expectedY}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = ${px}\\) into \\(${lineTex}\\):<br>` +
                     `\\(y = (${m})(${px}) + ${c} = ${m * px} + ${c} = ${expectedY}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compare with the given y-coordinate \\(${py}\\).<br><br>` +
                     (onLine
                         ? `<strong>Result:</strong> \\(${expectedY} = ${py}\\), so <strong>yes</strong>, the point lies on the line.`
                         : `<strong>Result:</strong> \\(${expectedY} \\neq ${py}\\), so <strong>no</strong>, the point does not lie on the line.`)
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => LINES.qGradient(),              weight: 2 },
            { fn: () => LINES.qMidpoint(),              weight: 2 },
            { fn: () => LINES.qDistance(),               weight: 2 },
            { fn: () => LINES.qEquationFromPoints(),     weight: 2 },
            { fn: () => LINES.qParallel(),              weight: 2 },
            { fn: () => LINES.qPerpendicular(),         weight: 2 },
            { fn: () => LINES.qXIntercept(),            weight: 2 },
            { fn: () => LINES.qPerpendicularBisector(), weight: 1 },
            { fn: () => LINES.qIntersection(),          weight: 1 },
            { fn: () => LINES.qPointOnLine(),           weight: 2 }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (LINES.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 6, 9].includes(i));
        } else if (LINES.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 4, 5].includes(i));
        } else if (LINES.level === 'hard') {
            filtered = pool.filter((_, i) => [7, 8].includes(i));
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
        LINES.score = 0;
        LINES.total = 0;
        LINES.streak = 0;
        LINES.answered = false;
        LINES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="LINES.unload()">Lines (2.1)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Lines</h1>
                <p>IB Math AA 2.1 - Gradient, equations, parallel &amp; perpendicular, intersection</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="LINES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="LINES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="LINES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="LINES.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="lines-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="lines-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="lines-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="lines-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="lines-question-card">
                <span class="rule-tag" id="lines-rule"></span>
                <span class="difficulty-tag" id="lines-difficulty"></span>
                <div class="question-text" id="lines-text"></div>
                <div class="question-prompt" id="lines-latex"></div>
                <div id="lines-options-area"></div>
            </div>

            <!-- Hint box -->
            <div class="hint-box" id="lines-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="lines-feedback">
                <div class="feedback-title" id="lines-feedback-title"></div>
                <div class="feedback-explanation" id="lines-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="lines-hint-btn" onclick="LINES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="lines-next-btn" onclick="LINES.next()" style="display:none;">Next Question</button>
            </div>
        `;

        LINES.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('functions');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        LINES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        LINES.score = 0;
        LINES.total = 0;
        LINES.streak = 0;
        LINES.updateStats();
        LINES.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        LINES.answered = false;
        LINES.hintIndex = 0;
        LINES.currentQ = LINES.pickQuestion();
        const q = LINES.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('lines-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('lines-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('lines-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('lines-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('lines-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="LINES.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="lines-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')LINES.checkFree()">
                    <button class="btn btn-primary" onclick="LINES.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('lines-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('lines-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('lines-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('lines-next-btn').style.display = 'none';
        document.getElementById('lines-hint-btn').style.display = '';
        document.getElementById('lines-hint-btn').disabled = false;

        // Render KaTeX
        LINES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = LINES.currentQ;
        if (!q || !q.hintTex || LINES.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('lines-hint-box');
        const hintContent = LINES.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[LINES.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        LINES.hintIndex++;

        if (LINES.hintIndex >= q.hintTex.length) {
            document.getElementById('lines-hint-btn').disabled = true;
        }

        LINES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (LINES.answered) return;
        LINES.answered = true;
        LINES.total++;

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
            LINES.score++;
            LINES.streak++;
        } else {
            btn.classList.add('incorrect');
            LINES.streak = 0;
        }

        LINES.showFeedback(isCorrect);
        LINES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (LINES.answered) return;

        const inp = document.getElementById('lines-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        LINES.answered = true;
        LINES.total++;
        inp.disabled = true;

        const q = LINES.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            LINES.score++;
            LINES.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            LINES.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        LINES.showFeedback(isCorrect);
        LINES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = LINES.currentQ;
        const fb = document.getElementById('lines-feedback');
        const title = document.getElementById('lines-feedback-title');
        const explanation = document.getElementById('lines-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (LINES.streak > 1) {
                title.textContent = `Correct! (${LINES.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('lines-next-btn').style.display = '';
        document.getElementById('lines-hint-btn').style.display = 'none';

        LINES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('lines-score');
        const totalEl = document.getElementById('lines-total');
        const streakEl = document.getElementById('lines-streak');
        const accEl = document.getElementById('lines-accuracy');

        if (scoreEl) scoreEl.textContent = LINES.score;
        if (totalEl) totalEl.textContent = LINES.total;
        if (streakEl) streakEl.textContent = LINES.streak;
        if (accEl) {
            accEl.textContent = LINES.total > 0
                ? Math.round((LINES.score / LINES.total) * 100) + '%'
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
    ACTIVITY_INITS['lines'] = () => LINES.load();
}
