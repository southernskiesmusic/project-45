/*
 * systems-of-equations.js - IB Math AA 1.10: Systems of Linear Equations
 * Substitution, elimination, Gaussian elimination, matrix method, number of solutions
 */

const SYS_EQ = {
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
     * 1. qSolveSimultaneous - Easy (Free)
     * Solve ax+by=c and dx+ey=f for x.
     * Construct: pick x=p, y=q, then compute c and f from chosen coefficients.
     */
    qSolveSimultaneous() {
        const p = MathUtils.randInt(-6, 6);
        const q = MathUtils.randInt(-6, 6);

        let a, b, d, e;
        // Ensure the system has a unique solution: ae - bd ≠ 0
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            b = MathUtils.nonZeroRandInt(-4, 4);
            d = MathUtils.nonZeroRandInt(-4, 4);
            e = MathUtils.nonZeroRandInt(-4, 4);
        } while (a * e - b * d === 0);

        const c = a * p + b * q;
        const f = d * p + e * q;

        // Format equation: ax + by = c
        function fmtEq(ca, cb, rhs) {
            const aTex = ca === 1 ? '' : ca === -1 ? '-' : String(ca);
            const bSign = cb > 0 ? '+' : '-';
            const bAbs = Math.abs(cb);
            const bTex = bAbs === 1 ? '' : String(bAbs);
            return `${aTex}x ${bSign} ${bTex}y = ${rhs}`;
        }

        const eq1 = fmtEq(a, b, c);
        const eq2 = fmtEq(d, e, f);

        return {
            type: 'free',
            rule: 'Simultaneous Equations',
            difficulty: 'easy',
            text: 'Solve the simultaneous equations below. Find the value of \\(x\\).',
            latex: `\\(${eq1}\\)<br>\\(${eq2}\\)`,
            answer: p,
            answerTex: String(p),
            options: [],
            hintTex: [
                `\\text{Multiply eq1 by } ${e} \\text{ and eq2 by } ${b} \\text{, then subtract to eliminate } y`,
                `(${a * e} - ${b * d})x = ${c * e} - ${f * b} \\implies x = \\frac{${c * e - f * b}}{${a * e - b * d}}`
            ],
            explain: `<strong>Step 1:</strong> Eliminate \\(y\\) using elimination.<br>` +
                     `Multiply eq1 by \\(${e}\\): \\(${a * e}x + ${b * e}y = ${c * e}\\).<br>` +
                     `Multiply eq2 by \\(${b}\\): \\(${d * b}x + ${e * b}y = ${f * b}\\).<br><br>` +
                     `<strong>Step 2:</strong> Subtract: \\((${a * e} - ${d * b})x = ${c * e} - ${f * b}\\).<br>` +
                     `\\(${a * e - d * b}x = ${c * e - f * b}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(x = \\frac{${c * e - f * b}}{${a * e - d * b}} = ${p}\\).`
        };
    },

    /**
     * 2. qSolveForY - Easy (Free)
     * Same construction as above, but ask for y.
     */
    qSolveForY() {
        const p = MathUtils.randInt(-6, 6);
        const q = MathUtils.randInt(-6, 6);

        let a, b, d, e;
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            b = MathUtils.nonZeroRandInt(-4, 4);
            d = MathUtils.nonZeroRandInt(-4, 4);
            e = MathUtils.nonZeroRandInt(-4, 4);
        } while (a * e - b * d === 0);

        const c = a * p + b * q;
        const f = d * p + e * q;

        function fmtEq(ca, cb, rhs) {
            const aTex = ca === 1 ? '' : ca === -1 ? '-' : String(ca);
            const bSign = cb > 0 ? '+' : '-';
            const bAbs = Math.abs(cb);
            const bTex = bAbs === 1 ? '' : String(bAbs);
            return `${aTex}x ${bSign} ${bTex}y = ${rhs}`;
        }

        const eq1 = fmtEq(a, b, c);
        const eq2 = fmtEq(d, e, f);

        // Eliminate x: multiply eq1 by d, eq2 by a
        const det = a * e - b * d;

        return {
            type: 'free',
            rule: 'Simultaneous Equations',
            difficulty: 'easy',
            text: 'Solve the simultaneous equations below. Find the value of \\(y\\).',
            latex: `\\(${eq1}\\)<br>\\(${eq2}\\)`,
            answer: q,
            answerTex: String(q),
            options: [],
            hintTex: [
                `\\text{Multiply eq1 by } ${d} \\text{ and eq2 by } ${a} \\text{, then subtract to eliminate } x`,
                `(${a * e} - ${b * d})y = ${a * f} - ${d * c} \\implies y = \\frac{${a * f - d * c}}{${det}}`
            ],
            explain: `<strong>Step 1:</strong> Eliminate \\(x\\) using elimination.<br>` +
                     `Multiply eq1 by \\(${d}\\): \\(${a * d}x + ${b * d}y = ${c * d}\\).<br>` +
                     `Multiply eq2 by \\(${a}\\): \\(${d * a}x + ${e * a}y = ${f * a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Subtract: \\((${b * d} - ${e * a})y = ${c * d} - ${f * a}\\).<br>` +
                     `\\(${b * d - e * a}y = ${c * d - f * a}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(y = \\frac{${c * d - f * a}}{${b * d - e * a}} = ${q}\\).`
        };
    },

    /**
     * 3. qSubstitution - Easy (Free)
     * Given y = ax+b, substitute into cx+dy=e. Find x.
     * Construct: pick x=p, compute y=ap+b, verify cx+dy=e holds.
     */
    qSubstitution() {
        const p = MathUtils.randInt(-5, 5);
        const a = MathUtils.randInt(-3, 3);
        const b = MathUtils.randInt(-6, 6);
        const yVal = a * p + b;

        // Pick c and d (d ≠ 0), then compute e = cp + d*yVal
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const d = MathUtils.nonZeroRandInt(-4, 4);
        const e = c * p + d * yVal;

        // The substitution: cx + d(ax+b) = e
        // (c + da)x + db = e
        // (c + da)x = e - db
        const coeff = c + d * a;
        const rhs = e - d * b;

        // Format first equation: y = ax + b
        function fmtLinear(m, k) {
            let mTex = m === 1 ? '' : m === -1 ? '-' : String(m);
            let kTex = k === 0 ? '' : k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
            return `y = ${mTex}x${kTex}`;
        }

        const eq1 = fmtLinear(a, b);

        // Format second equation: cx + dy = e
        function fmtEq2(ca, cb, rhs2) {
            const aTex = ca === 1 ? '' : ca === -1 ? '-' : String(ca);
            const bSign = cb > 0 ? '+' : '-';
            const bAbs = Math.abs(cb);
            const bTex = bAbs === 1 ? '' : String(bAbs);
            return `${aTex}x ${bSign} ${bTex}y = ${rhs2}`;
        }

        const eq2 = fmtEq2(c, d, e);

        return {
            type: 'free',
            rule: 'Substitution',
            difficulty: 'easy',
            text: 'Use substitution to solve the system below. Find the value of \\(x\\).',
            latex: `\\(${eq1}\\)<br>\\(${eq2}\\)`,
            answer: p,
            answerTex: String(p),
            options: [],
            hintTex: [
                `\\text{Substitute } y = ${a === 1 ? '' : a === -1 ? '-' : a}x${b >= 0 ? '+' + b : b} \\text{ into the second equation}`,
                `${c}x + ${d}(${a}x + ${b}) = ${e} \\implies ${coeff}x = ${rhs}`
            ],
            explain: `<strong>Step 1:</strong> From equation 1: \\(${eq1}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute into equation 2:<br>` +
                     `\\(${c}x + ${d}(${a}x + ${b}) = ${e}\\)<br>` +
                     `\\(${c}x + ${d * a}x + ${d * b} = ${e}\\)<br>` +
                     `\\(${coeff}x = ${rhs}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(x = \\frac{${rhs}}{${coeff}} = ${p}\\).<br><br>` +
                     `<strong>Step 4:</strong> Back-substitute: \\(y = ${a}(${p}) + ${b} = ${yVal}\\).`
        };
    },

    /**
     * 4. qEliminationStep - Medium (Free)
     * What multiplier eliminates x from a system?
     * If eq1 has coefficient a1 for x and eq2 has a2, multiply eq1 by a2 (and eq2 by a1) then subtract.
     * Ask: "Multiply the first equation by ? to eliminate x." Answer = |a2| (coefficient of x in eq2).
     */
    qEliminationStep() {
        // Pick two different non-zero x-coefficients
        const a1 = MathUtils.nonZeroRandInt(2, 7);
        const a2 = MathUtils.nonZeroRandInt(2, 7);

        // Pick y-coefficients and solution to build valid equations
        const p = MathUtils.randInt(-5, 5);
        const q = MathUtils.randInt(-5, 5);
        const b1 = MathUtils.nonZeroRandInt(-4, 4);
        const b2 = MathUtils.nonZeroRandInt(-4, 4);
        const c1 = a1 * p + b1 * q;
        const c2 = a2 * p + b2 * q;

        function fmtEq(ca, cb, rhs) {
            const aTex = ca === 1 ? '' : String(ca);
            const bSign = cb > 0 ? '+' : '-';
            const bAbs = Math.abs(cb);
            const bTex = bAbs === 1 ? '' : String(bAbs);
            return `${aTex}x ${bSign} ${bTex}y = ${rhs}`;
        }

        const eq1 = fmtEq(a1, b1, c1);
        const eq2 = fmtEq(a2, b2, c2);

        return {
            type: 'free',
            rule: 'Elimination Method',
            difficulty: 'medium',
            text: `Consider the system below. To eliminate \\(x\\), multiply the <strong>first</strong> equation by an integer so that its \\(x\\)-coefficient matches the second. What is that multiplier?`,
            latex: `\\(${eq1}\\)<br>\\(${eq2}\\)`,
            answer: a2,
            answerTex: String(a2),
            options: [],
            hintTex: [
                `\\text{Eq 1 has } ${a1}x, \\text{ Eq 2 has } ${a2}x`,
                `\\text{Multiply eq 1 by } ${a2} \\text{ to get } ${a1 * a2}x, \\text{ and eq 2 by } ${a1} \\text{ to get } ${a2 * a1}x`
            ],
            explain: `<strong>Step 1:</strong> Eq 1 has \\(${a1}x\\) and eq 2 has \\(${a2}x\\).<br><br>` +
                     `<strong>Step 2:</strong> Multiply eq 1 by \\(${a2}\\) to get \\(${a1 * a2}x\\).<br>` +
                     `Multiply eq 2 by \\(${a1}\\) to get \\(${a2 * a1}x\\).<br><br>` +
                     `<strong>Step 3:</strong> Subtracting the equations cancels the \\(x\\) terms.<br><br>` +
                     `<strong>Answer:</strong> The multiplier for the first equation is \\(${a2}\\).`
        };
    },

    /**
     * 5. qConsistency - Medium (MC)
     * Identify the number of solutions for a given 2×2 system.
     * Randomly pick unique, infinitely many, or no solution case.
     */
    qConsistency() {
        const caseType = MathUtils.pick(['unique', 'infinite', 'none']);

        let eq1, eq2, correctTex, explain;

        if (caseType === 'unique') {
            // Different gradients → unique solution
            const a = MathUtils.nonZeroRandInt(-4, 4);
            const b = MathUtils.nonZeroRandInt(-4, 4);
            let d;
            // Ensure a/b ≠ d/e: easiest way — pick d = a + nonzero
            d = a + MathUtils.nonZeroRandInt(1, 3);
            const e = b + MathUtils.nonZeroRandInt(1, 3);
            const c = MathUtils.randInt(-8, 8);
            const f = MathUtils.randInt(-8, 8);
            eq1 = `${a}x + ${b}y = ${c}`;
            eq2 = `${d}x + ${e}y = ${f}`;
            correctTex = '\\text{Unique solution}';
            explain = `The gradients \\(\\frac{${a}}{${b}}\\) and \\(\\frac{${d}}{${e}}\\) are different, so the lines intersect at exactly one point — <strong>unique solution</strong>.`;
        } else if (caseType === 'infinite') {
            // Same equation scaled → infinitely many solutions
            const a = MathUtils.nonZeroRandInt(-3, 3);
            const b = MathUtils.nonZeroRandInt(-3, 3);
            const c = MathUtils.randInt(-6, 6);
            const k = MathUtils.nonZeroRandInt(2, 4);
            eq1 = `${a}x + ${b}y = ${c}`;
            eq2 = `${a * k}x + ${b * k}y = ${c * k}`;
            correctTex = '\\text{Infinitely many solutions}';
            explain = `Eq 2 is exactly \\(${k}\\) times eq 1, so they represent the same line — <strong>infinitely many solutions</strong>.`;
        } else {
            // Parallel lines: same coefficients for x,y but different RHS
            const a = MathUtils.nonZeroRandInt(-3, 3);
            const b = MathUtils.nonZeroRandInt(-3, 3);
            const c = MathUtils.randInt(-6, 6);
            const k = MathUtils.nonZeroRandInt(2, 4);
            const diff = MathUtils.nonZeroRandInt(1, 5);
            eq1 = `${a}x + ${b}y = ${c}`;
            eq2 = `${a * k}x + ${b * k}y = ${c * k + diff}`;
            correctTex = '\\text{No solution}';
            explain = `Eq 2 has the same \\(x\\) and \\(y\\) coefficients as eq 1 (scaled by \\(${k}\\)) but a different RHS — the lines are parallel and never meet — <strong>no solution</strong>.`;
        }

        const options = MathUtils.shuffle([
            { value: caseType === 'unique'   ? 1 : 0, tex: '\\text{Unique solution}' },
            { value: caseType === 'infinite' ? 1 : 0, tex: '\\text{Infinitely many solutions}' },
            { value: caseType === 'none'     ? 1 : 0, tex: '\\text{No solution}' },
            { value: 0, tex: '\\text{Cannot be determined}' }
        ]);

        return {
            type: 'mc',
            rule: 'Consistency',
            difficulty: 'medium',
            text: 'How many solutions does the system below have?',
            latex: `\\(${eq1}\\)<br>\\(${eq2}\\)`,
            answer: 1,
            answerTex: correctTex,
            options,
            hintTex: [
                `\\text{Compare the ratios of coefficients: } \\frac{a_1}{a_2} \\text{ vs } \\frac{b_1}{b_2} \\text{ vs } \\frac{c_1}{c_2}`,
                `\\text{Equal ratios for all three} \\Rightarrow \\text{infinite; equal for coefficients but not RHS} \\Rightarrow \\text{none; unequal} \\Rightarrow \\text{unique}`
            ],
            explain: `<strong>Analysis:</strong> ${explain}`
        };
    },

    /**
     * 6. qMatrixEquation - Medium (Free)
     * AX = B where A = 2×2. Find x₁ (first component).
     * Use Cramer's rule: x₁ = det([[e,b],[f,d]]) / det(A).
     * Construct so answer is integer.
     */
    qMatrixEquation() {
        let a, b, c, d, e, f, det, x1;
        // Keep generating until x1 is a non-trivial integer
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            b = MathUtils.randInt(-3, 3);
            c = MathUtils.randInt(-3, 3);
            d = MathUtils.nonZeroRandInt(-4, 4);
            det = a * d - b * c;
            if (det === 0) continue;
            // Pick x1, x2 as integers, compute e, f
            x1 = MathUtils.randInt(-5, 5);
            const x2 = MathUtils.randInt(-5, 5);
            e = a * x1 + b * x2;
            f = c * x1 + d * x2;
        } while (det === 0);

        return {
            type: 'free',
            rule: 'Matrix Equation',
            difficulty: 'medium',
            text: 'Solve the matrix equation \\(AX = B\\) below. Find the value of \\(x_1\\) (the first component of \\(X\\)).',
            latex: `\\(A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix},\\quad B = \\begin{pmatrix} ${e} \\\\ ${f} \\end{pmatrix}\\)`,
            answer: x1,
            answerTex: String(x1),
            options: [],
            hintTex: [
                `X = A^{-1}B, \\quad \\det(A) = ${a}\\cdot${d} - ${b}\\cdot${c} = ${det}`,
                `x_1 = \\frac{\\det\\begin{pmatrix}${e}&${b}\\\\${f}&${d}\\end{pmatrix}}{\\det(A)} = \\frac{${e * d - b * f}}{${det}}`
            ],
            explain: `<strong>Step 1:</strong> Compute \\(\\det(A) = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det}\\).<br><br>` +
                     `<strong>Step 2:</strong> By Cramer's rule:<br>` +
                     `\\(x_1 = \\frac{\\det\\begin{pmatrix}${e}&${b}\\\\${f}&${d}\\end{pmatrix}}{${det}} = \\frac{(${e})(${d}) - (${b})(${f})}{${det}} = \\frac{${e * d - b * f}}{${det}} = ${x1}\\).`
        };
    },

    /**
     * 7. qDeterminant2x2 - Easy (Free)
     * det([[a,b],[c,d]]) = ad - bc.
     */
    qDeterminant2x2() {
        const a = MathUtils.randInt(-6, 6);
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-6, 6);
        const d = MathUtils.randInt(-6, 6);
        const det = a * d - b * c;

        return {
            type: 'free',
            rule: '2×2 Determinant',
            difficulty: 'easy',
            text: 'Find the determinant of the matrix below.',
            latex: `\\(\\begin{vmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{vmatrix}\\)`,
            answer: det,
            answerTex: String(det),
            options: [],
            hintTex: [
                `\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad - bc`,
                `= (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c}`
            ],
            explain: `<strong>Step 1:</strong> Use the formula \\(\\det = ad - bc\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\((${a})(${d}) - (${b})(${c})\\).<br><br>` +
                     `<strong>Step 3:</strong> Compute: \\(${a * d} - ${b * c} = ${det}\\).`
        };
    },

    /**
     * 8. qDeterminant3x3 - Medium (Free)
     * 3×3 determinant by cofactor expansion along row 1.
     * Use a matrix where several entries are 0 or 1 to keep arithmetic clean.
     */
    qDeterminant3x3() {
        // Build a matrix where each row has at most one "interesting" entry; others 0 or 1
        // Pattern: diagonal-ish with some zeros to keep the calculation manageable
        let mat, det;
        do {
            // Row entries: mix of small integers and zeros
            const r1 = [MathUtils.randInt(-3, 3), MathUtils.pick([0, 1, -1]), MathUtils.pick([0, 1, -1])];
            const r2 = [MathUtils.pick([0, 1, -1]), MathUtils.randInt(-3, 3), MathUtils.pick([0, 1, -1])];
            const r3 = [MathUtils.pick([0, 1, -1]), MathUtils.pick([0, 1, -1]), MathUtils.randInt(-3, 3)];
            mat = [r1, r2, r3];

            // Compute det by expansion
            const [[a, b, c], [d, e, f], [g, h, k]] = mat;
            det = a * (e * k - f * h) - b * (d * k - f * g) + c * (d * h - e * g);
        } while (det === 0 || Math.abs(det) > 50);

        const [[a, b, c], [d, e, f], [g, h, k]] = mat;
        const M11 = e * k - f * h;
        const M12 = d * k - f * g;
        const M13 = d * h - e * g;

        function entry(v) { return v < 0 ? `(${v})` : String(v); }

        return {
            type: 'free',
            rule: '3×3 Determinant',
            difficulty: 'medium',
            text: 'Find the determinant of the 3×3 matrix below (expand along the first row).',
            latex: `\\(\\begin{vmatrix} ${a} & ${b} & ${c} \\\\ ${d} & ${e} & ${f} \\\\ ${g} & ${h} & ${k} \\end{vmatrix}\\)`,
            answer: det,
            answerTex: String(det),
            options: [],
            hintTex: [
                `\\det = a(ei-fh) - b(di-fg) + c(dh-eg)`,
                `= ${entry(a)}(${entry(e)}\\cdot${entry(k)}-${entry(f)}\\cdot${entry(h)}) - ${entry(b)}(${entry(d)}\\cdot${entry(k)}-${entry(f)}\\cdot${entry(g)}) + ${entry(c)}(${entry(d)}\\cdot${entry(h)}-${entry(e)}\\cdot${entry(g)})`
            ],
            explain: `<strong>Step 1:</strong> Expand along row 1:<br>` +
                     `\\(\\det = ${a}\\cdot M_{11} - ${b}\\cdot M_{12} + ${c}\\cdot M_{13}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute minors:<br>` +
                     `\\(M_{11} = (${e})(${k}) - (${f})(${h}) = ${e * k} - ${f * h} = ${M11}\\)<br>` +
                     `\\(M_{12} = (${d})(${k}) - (${f})(${g}) = ${d * k} - ${f * g} = ${M12}\\)<br>` +
                     `\\(M_{13} = (${d})(${h}) - (${e})(${g}) = ${d * h} - ${e * g} = ${M13}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\det = ${a}(${M11}) - ${b}(${M12}) + ${c}(${M13}) = ${a * M11} - ${b * M12} + ${c * M13} = ${det}\\).`
        };
    },

    /**
     * 9. qNoSolution - Easy (MC)
     * When does ax+by=c and ax+by=d (c≠d) have no solution?
     */
    qNoSolution() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-4, 4);
        const c = MathUtils.randInt(-8, 8);
        let d;
        do { d = MathUtils.randInt(-8, 8); } while (d === c);

        const options = MathUtils.shuffle([
            { value: 1, tex: `\\text{Always — the lines are parallel (same coefficients, different RHS)}` },
            { value: 0, tex: `\\text{Only when } a \\neq 0` },
            { value: 0, tex: `\\text{Only when } a = b` },
            { value: 0, tex: `\\text{Never — they always share solutions}` }
        ]);

        return {
            type: 'mc',
            rule: 'No Solution',
            difficulty: 'easy',
            text: `The system \\(${a}x + ${b}y = ${c}\\) and \\(${a}x + ${b}y = ${d}\\) has no solution. Which statement best explains why?`,
            latex: '',
            answer: 1,
            answerTex: '\\text{Always — the lines are parallel (same coefficients, different RHS)}',
            options,
            hintTex: [
                `\\text{Both equations have the same LHS: } ${a}x + ${b}y`,
                `\\text{If } ${a}x + ${b}y = ${c} \\text{ and also } ${a}x + ${b}y = ${d}, \\text{ then } ${c} = ${d} \\text{ — a contradiction}`
            ],
            explain: `<strong>Reason:</strong> Both equations have identical left-hand sides \\(${a}x + ${b}y\\) but different right-hand sides (\\(${c} \\neq ${d}\\)).<br><br>` +
                     `This means the two lines are <strong>parallel</strong> — they have the same slope but different intercepts, so they never intersect.<br><br>` +
                     `Algebraically: subtracting gives \\(0 = ${c - d}\\), which is a contradiction, confirming <strong>no solution</strong>.`
        };
    },

    /**
     * 10. qThreeEquationSolve - Hard (Free)
     * Solve 3×3 linear system for x. Construct from x=p, y=q, z=r.
     */
    qThreeEquationSolve() {
        const p = MathUtils.randInt(-4, 4);
        const q = MathUtils.randInt(-4, 4);
        const r = MathUtils.randInt(-4, 4);

        let a1, b1, c1, a2, b2, c2, a3, b3, c3, det;
        // Keep generating until system has a unique solution
        do {
            a1 = MathUtils.nonZeroRandInt(-3, 3);
            b1 = MathUtils.randInt(-2, 2);
            c1 = MathUtils.randInt(-2, 2);
            a2 = MathUtils.randInt(-2, 2);
            b2 = MathUtils.nonZeroRandInt(-3, 3);
            c2 = MathUtils.randInt(-2, 2);
            a3 = MathUtils.randInt(-2, 2);
            b3 = MathUtils.randInt(-2, 2);
            c3 = MathUtils.nonZeroRandInt(-3, 3);

            // Compute det of coefficient matrix
            det = a1 * (b2 * c3 - c2 * b3)
                - b1 * (a2 * c3 - c2 * a3)
                + c1 * (a2 * b3 - b2 * a3);
        } while (det === 0);

        const d1 = a1 * p + b1 * q + c1 * r;
        const d2 = a2 * p + b2 * q + c2 * r;
        const d3 = a3 * p + b3 * q + c3 * r;

        // Format one equation: ax + by + cz = d
        function fmtEq3(ca, cb, cc, rhs) {
            function term(coeff, varName, isFirst) {
                if (coeff === 0) return '';
                const sign = coeff > 0 ? (isFirst ? '' : ' + ') : ' - ';
                const abs = Math.abs(coeff);
                const num = abs === 1 ? '' : String(abs);
                return `${sign}${num}${varName}`;
            }
            let str = '';
            const t1 = term(ca, 'x', true);
            const t2 = term(cb, 'y', str === '' && t1 === '');
            const t3 = term(cc, 'z', str === '' && t1 === '' && t2 === '');
            str = t1 + t2 + t3;
            return `${str} = ${rhs}`;
        }

        const eq1 = fmtEq3(a1, b1, c1, d1);
        const eq2 = fmtEq3(a2, b2, c2, d2);
        const eq3 = fmtEq3(a3, b3, c3, d3);

        // Show the elimination steps verbally
        const pivot1 = a1;   // use eq1 to eliminate x from eq2 and eq3

        return {
            type: 'free',
            rule: 'Gaussian Elimination',
            difficulty: 'hard',
            text: 'Solve the 3×3 linear system below using Gaussian elimination or substitution. Find the value of \\(x\\).',
            latex: `\\(\\begin{aligned}${eq1}\\\\${eq2}\\\\${eq3}\\end{aligned}\\)`,
            answer: p,
            answerTex: String(p),
            options: [],
            hintTex: [
                `\\text{Use eq 1 to eliminate } x \\text{ from eqs 2 and 3}`,
                `\\text{Back-substitute: once you find } z \\text{ then } y, \\text{ then find } x \\text{ from eq 1}`
            ],
            explain: `<strong>Construction:</strong> The system was built so that \\(x=${p},\\, y=${q},\\, z=${r}\\).<br><br>` +
                     `<strong>Step 1 — Forward elimination:</strong><br>` +
                     `Use eq 1 (\\(${eq1}\\)) as the pivot row. Multiply by appropriate factors and subtract to eliminate \\(x\\) from eqs 2 and 3.<br><br>` +
                     `<strong>Step 2 — Back-substitution:</strong><br>` +
                     `Solve the resulting 2×2 system for \\(y\\) and \\(z\\).<br>` +
                     `You should get \\(z = ${r}\\) and \\(y = ${q}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute back into eq 1 to find \\(x = ${p}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => SYS_EQ.qSolveSimultaneous(), weight: 3 }, // easy
            { fn: () => SYS_EQ.qSolveForY(),          weight: 3 }, // easy
            { fn: () => SYS_EQ.qSubstitution(),        weight: 3 }, // easy
            { fn: () => SYS_EQ.qEliminationStep(),     weight: 2 }, // medium
            { fn: () => SYS_EQ.qConsistency(),         weight: 2 }, // medium
            { fn: () => SYS_EQ.qMatrixEquation(),      weight: 2 }, // medium
            { fn: () => SYS_EQ.qDeterminant2x2(),      weight: 3 }, // easy
            { fn: () => SYS_EQ.qDeterminant3x3(),      weight: 2 }, // medium
            { fn: () => SYS_EQ.qNoSolution(),          weight: 3 }, // easy
            { fn: () => SYS_EQ.qThreeEquationSolve(),  weight: 1 }  // hard
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (SYS_EQ.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 6, 8].includes(i));
        } else if (SYS_EQ.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 4, 5, 7].includes(i));
        } else if (SYS_EQ.level === 'hard') {
            filtered = pool.filter((_, i) => [9].includes(i));
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
        SYS_EQ.score = 0;
        SYS_EQ.total = 0;
        SYS_EQ.streak = 0;
        SYS_EQ.answered = false;
        SYS_EQ.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="SYS_EQ.unload()">Systems of Equations (1.10)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Systems of Equations</h1>
                <p>IB Math AA 1.10 — Simultaneous equations and matrix methods</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="SYS_EQ.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="SYS_EQ.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="SYS_EQ.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="SYS_EQ.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="syseq-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="syseq-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="syseq-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="syseq-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="syseq-question-card">
                <span class="rule-tag" id="syseq-rule"></span>
                <span class="difficulty-tag" id="syseq-difficulty"></span>
                <div class="question-text" id="syseq-text"></div>
                <div class="question-prompt" id="syseq-latex"></div>
                <div id="syseq-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="syseq-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="syseq-feedback">
                <div class="feedback-title" id="syseq-feedback-title"></div>
                <div class="feedback-explanation" id="syseq-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="syseq-hint-btn" onclick="SYS_EQ.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="syseq-next-btn" onclick="SYS_EQ.next()" style="display:none;">Next Question</button>
            </div>
        `;

        SYS_EQ.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        SYS_EQ.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        SYS_EQ.score = 0;
        SYS_EQ.total = 0;
        SYS_EQ.streak = 0;
        SYS_EQ.updateStats();
        SYS_EQ.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        SYS_EQ.answered = false;
        SYS_EQ.hintIndex = 0;
        SYS_EQ.currentQ = SYS_EQ.pickQuestion();
        const q = SYS_EQ.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('syseq-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('syseq-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('syseq-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('syseq-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('syseq-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="SYS_EQ.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="syseq-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')SYS_EQ.checkFree()">
                    <button class="btn btn-primary" onclick="SYS_EQ.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('syseq-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('syseq-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('syseq-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('syseq-next-btn').style.display = 'none';
        document.getElementById('syseq-hint-btn').style.display = '';
        document.getElementById('syseq-hint-btn').disabled = false;

        // Render KaTeX
        SYS_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = SYS_EQ.currentQ;
        if (!q || !q.hintTex || SYS_EQ.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('syseq-hint-box');
        const hintContent = SYS_EQ.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[SYS_EQ.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        SYS_EQ.hintIndex++;

        if (SYS_EQ.hintIndex >= q.hintTex.length) {
            document.getElementById('syseq-hint-btn').disabled = true;
        }

        SYS_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (SYS_EQ.answered) return;
        SYS_EQ.answered = true;
        SYS_EQ.total++;

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
            SYS_EQ.score++;
            SYS_EQ.streak++;
        } else {
            btn.classList.add('incorrect');
            SYS_EQ.streak = 0;
        }

        SYS_EQ.showFeedback(isCorrect);
        SYS_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (SYS_EQ.answered) return;

        const inp = document.getElementById('syseq-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        SYS_EQ.answered = true;
        SYS_EQ.total++;
        inp.disabled = true;

        const q = SYS_EQ.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            SYS_EQ.score++;
            SYS_EQ.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            SYS_EQ.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        SYS_EQ.showFeedback(isCorrect);
        SYS_EQ.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = SYS_EQ.currentQ;
        const fb = document.getElementById('syseq-feedback');
        const title = document.getElementById('syseq-feedback-title');
        const explanation = document.getElementById('syseq-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (SYS_EQ.streak > 1) {
                title.textContent = `Correct! (${SYS_EQ.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('syseq-next-btn').style.display = '';
        document.getElementById('syseq-hint-btn').style.display = 'none';

        SYS_EQ.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('syseq-score');
        const totalEl = document.getElementById('syseq-total');
        const streakEl = document.getElementById('syseq-streak');
        const accEl = document.getElementById('syseq-accuracy');

        if (scoreEl) scoreEl.textContent = SYS_EQ.score;
        if (totalEl) totalEl.textContent = SYS_EQ.total;
        if (streakEl) streakEl.textContent = SYS_EQ.streak;
        if (accEl) {
            accEl.textContent = SYS_EQ.total > 0
                ? Math.round((SYS_EQ.score / SYS_EQ.total) * 100) + '%'
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
    ACTIVITY_INITS['systems-of-equations'] = () => SYS_EQ.load();
}
