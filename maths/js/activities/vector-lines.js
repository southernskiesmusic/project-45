/*
 * vector-lines.js - IB Math AA 3.13–3.14: Vector Equations of Lines
 * Parametric equations of lines in 2D and 3D
 */

const VEC_LINES = {
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
     * 1. qPointOnLine - Easy (Free)
     * r = (a₁,a₂) + t(b₁,b₂). Find x-coordinate when t = k.
     * x = a₁ + k·b₁
     */
    qPointOnLine() {
        const a1 = MathUtils.randInt(-6, 6);
        const a2 = MathUtils.randInt(-6, 6);
        const b1 = MathUtils.nonZeroRandInt(-5, 5);
        const b2 = MathUtils.nonZeroRandInt(-5, 5);
        const k  = MathUtils.randInt(-4, 4);

        const answer = a1 + k * b1;

        // Format sign helpers
        const a2s  = a2  >= 0 ? `+${a2}`  : String(a2);
        const b1s  = b1  >= 0 ? `+${b1}`  : String(b1);
        const b2s  = b2  >= 0 ? `+${b2}`  : String(b2);

        return {
            type: 'free',
            rule: 'Point on Line',
            difficulty: 'easy',
            text: `The line \\(\\ell\\) has vector equation \\(\\mathbf{r} = \\binom{${a1}}{${a2}} + t\\binom{${b1}}{${b2}}\\). Find the x-coordinate of the point on \\(\\ell\\) when \\(t = ${k}\\).`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } t = ${k} \\text{ into the x-component: } x = a_1 + t\\,b_1`,
                `x = ${a1} + (${k})(${b1}) = ${a1} + ${k * b1} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> The parametric form gives \\(x = a_1 + t\\,b_1\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(t = ${k}\\):<br>` +
                     `\\(x = ${a1} + (${k})(${b1}) = ${a1} + (${k * b1}) = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${answer}\\).`
        };
    },

    /**
     * 2. qDirectionFromPoints - Easy (Free)
     * Direction vector b = B - A. Find x-component = Bₓ - Aₓ.
     */
    qDirectionFromPoints() {
        const ax = MathUtils.randInt(-6, 6);
        const ay = MathUtils.randInt(-6, 6);
        const bx = MathUtils.randInt(-6, 6);
        const by = MathUtils.randInt(-6, 6);

        const dx = bx - ax;
        const dy = by - ay;

        return {
            type: 'free',
            rule: 'Direction from Points',
            difficulty: 'easy',
            text: `A line passes through \\(A(${ax},\\,${ay})\\) and \\(B(${bx},\\,${by})\\). Find the x-component of the direction vector \\(\\overrightarrow{AB}\\).`,
            latex: '',
            answer: dx,
            answerTex: String(dx),
            options: [],
            hintTex: [
                `\\overrightarrow{AB} = B - A = \\binom{b_x - a_x}{b_y - a_y}`,
                `x\\text{-component} = ${bx} - (${ax}) = ${dx}`
            ],
            explain: `<strong>Step 1:</strong> The direction vector is \\(\\overrightarrow{AB} = B - A\\).<br><br>` +
                     `<strong>Step 2:</strong> x-component \\(= ${bx} - (${ax}) = ${dx}\\).<br><br>` +
                     `<strong>Step 3:</strong> y-component \\(= ${by} - (${ay}) = ${dy}\\), so \\(\\overrightarrow{AB} = \\binom{${dx}}{${dy}}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${dx}\\).`
        };
    },

    /**
     * 3. qParameterForPoint - Medium (Free)
     * Given r = a + t·b and point P on the line, find t.
     * t = (pₓ - a₁) / b₁
     */
    qParameterForPoint() {
        const a1 = MathUtils.randInt(-5, 5);
        const a2 = MathUtils.randInt(-5, 5);
        const b1 = MathUtils.nonZeroRandInt(-4, 4);
        const b2 = MathUtils.nonZeroRandInt(-4, 4);
        const t  = MathUtils.randInt(-5, 5);   // integer answer

        const px = a1 + t * b1;
        const py = a2 + t * b2;

        return {
            type: 'free',
            rule: 'Parameter for Point',
            difficulty: 'medium',
            text: `The line \\(\\ell\\) has equation \\(\\mathbf{r} = \\binom{${a1}}{${a2}} + t\\binom{${b1}}{${b2}}\\). The point \\(P(${px},\\,${py})\\) lies on \\(\\ell\\). Find the value of the parameter \\(t\\).`,
            latex: '',
            answer: t,
            answerTex: String(t),
            options: [],
            hintTex: [
                `\\text{Set } x\\text{-component equal: } ${px} = ${a1} + t(${b1})`,
                `t = \\frac{${px} - ${a1}}{${b1}} = \\frac{${px - a1}}{${b1}} = ${t}`
            ],
            explain: `<strong>Step 1:</strong> Use the x-component: \\(${px} = ${a1} + t(${b1})\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve for \\(t\\):<br>` +
                     `\\(t = \\frac{${px} - (${a1})}{${b1}} = \\frac{${px - a1}}{${b1}} = ${t}\\).<br><br>` +
                     `<strong>Verify y-component:</strong> \\(${a2} + (${t})(${b2}) = ${a2 + t * b2} = ${py}\\). ✓<br><br>` +
                     `<strong>Answer:</strong> \\(t = ${t}\\).`
        };
    },

    /**
     * 4. qPointOnLineCheck - Medium (MC)
     * Is P=(pₓ,pᵧ) on line r = a + t·b?
     * Check (P-a) parallel to b: (pₓ-a₁)/b₁ = (pᵧ-a₂)/b₂
     */
    qPointOnLineCheck() {
        const a1 = MathUtils.randInt(-5, 5);
        const a2 = MathUtils.randInt(-5, 5);
        const b1 = MathUtils.nonZeroRandInt(-4, 4);
        const b2 = MathUtils.nonZeroRandInt(-4, 4);

        const onLine = MathUtils.randInt(0, 1) === 1;
        let px, py, tVal;
        if (onLine) {
            tVal = MathUtils.randInt(-5, 5);
            px = a1 + tVal * b1;
            py = a2 + tVal * b2;
        } else {
            tVal = MathUtils.randInt(-4, 4);
            px = a1 + tVal * b1;
            py = a2 + tVal * b2 + MathUtils.nonZeroRandInt(-3, 3);
        }

        // Ratios for checking
        const ratioX = b1 !== 0 ? (px - a1) / b1 : null;
        const ratioY = b2 !== 0 ? (py - a2) / b2 : null;

        let correctTex, correctVal;
        if (onLine) {
            correctTex = `\\text{Yes, at } t = ${tVal}`;
            correctVal = 1;
        } else {
            correctTex = `\\text{No, not on the line}`;
            correctVal = 0;
        }

        const options = [];
        if (onLine) {
            options.push({ value: 1, tex: `\\text{Yes, at } t = ${tVal}` });
            options.push({ value: 0, tex: `\\text{No, not on the line}` });
        } else {
            options.push({ value: 1, tex: `\\text{No, not on the line}` });
            options.push({ value: 0, tex: `\\text{Yes, at } t = ${tVal}` });
        }
        options.push({ value: 0, tex: `\\text{Only if } \\mathbf{b} \\text{ is a unit vector}` });
        options.push({ value: 0, tex: `\\text{Cannot determine without more information}` });

        const shuffled = MathUtils.shuffle(options);

        const lhsTex  = `\\frac{${px}-${a1}}{${b1}} = ${MathUtils.fractionTeX(px - a1, b1)}`;
        const rhsTex  = `\\frac{${py}-${a2}}{${b2}} = ${MathUtils.fractionTeX(py - a2, b2)}`;

        return {
            type: 'mc',
            rule: 'Point on Line Check',
            difficulty: 'medium',
            text: `Does the point \\(P(${px},\\,${py})\\) lie on the line \\(\\mathbf{r} = \\binom{${a1}}{${a2}} + t\\binom{${b1}}{${b2}}\\)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Check: } \\frac{p_x - a_1}{b_1} = \\frac{p_y - a_2}{b_2}`,
                `${lhsTex} \\quad ${onLine ? '=' : '\\neq'} \\quad ${rhsTex}`
            ],
            explain: `<strong>Step 1:</strong> A point \\(P\\) lies on \\(\\mathbf{r} = \\mathbf{a} + t\\mathbf{b}\\) iff \\(P - \\mathbf{a} = t\\mathbf{b}\\) for some scalar \\(t\\).<br><br>` +
                     `<strong>Step 2:</strong> Check the ratios: \\(\\frac{${px}-${a1}}{${b1}} = ${MathUtils.fractionTeX(px - a1, b1)}\\) and \\(\\frac{${py}-${a2}}{${b2}} = ${MathUtils.fractionTeX(py - a2, b2)}\\).<br><br>` +
                     (onLine
                         ? `<strong>Step 3:</strong> Both ratios equal \\(${tVal}\\), so \\(P\\) is on the line at \\(t = ${tVal}\\).`
                         : `<strong>Step 3:</strong> The ratios differ, so \\((P - \\mathbf{a})\\) is not parallel to \\(\\mathbf{b}\\). \\(P\\) is not on the line.`)
        };
    },

    /**
     * 5. qYCoordinateOnLine - Easy (Free)
     * r = (a₁,a₂) + t(b₁,b₂). Find y-coordinate when t = k.
     * y = a₂ + k·b₂
     */
    qYCoordinateOnLine() {
        const a1 = MathUtils.randInt(-6, 6);
        const a2 = MathUtils.randInt(-6, 6);
        const b1 = MathUtils.nonZeroRandInt(-5, 5);
        const b2 = MathUtils.nonZeroRandInt(-5, 5);
        const k  = MathUtils.randInt(-4, 4);

        const answer = a2 + k * b2;

        return {
            type: 'free',
            rule: 'y-Coordinate on Line',
            difficulty: 'easy',
            text: `The line \\(\\ell\\) has vector equation \\(\\mathbf{r} = \\binom{${a1}}{${a2}} + t\\binom{${b1}}{${b2}}\\). Find the y-coordinate of the point on \\(\\ell\\) when \\(t = ${k}\\).`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } t = ${k} \\text{ into the y-component: } y = a_2 + t\\,b_2`,
                `y = ${a2} + (${k})(${b2}) = ${a2} + ${k * b2} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> The parametric form gives \\(y = a_2 + t\\,b_2\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(t = ${k}\\):<br>` +
                     `\\(y = ${a2} + (${k})(${b2}) = ${a2} + (${k * b2}) = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(y = ${answer}\\).`
        };
    },

    /**
     * 6. qParallelLines - Medium (MC)
     * Two lines with direction vectors d₁ and d₂. Are they parallel?
     * Check if d₁ = k·d₂.
     */
    qParallelLines() {
        // Decide outcome
        const outcome = MathUtils.pick(['parallel', 'perpendicular', 'neither']);

        const d1x = MathUtils.nonZeroRandInt(-4, 4);
        const d1y = MathUtils.nonZeroRandInt(-4, 4);
        let d2x, d2y;

        if (outcome === 'parallel') {
            const scalar = MathUtils.nonZeroRandInt(-3, 3);
            d2x = scalar * d1x;
            d2y = scalar * d1y;
        } else if (outcome === 'perpendicular') {
            // Perpendicular: dot product = 0 → d2 = (-d1y, d1x)
            d2x = -d1y;
            d2y = d1x;
        } else {
            // Neither: random until neither parallel nor perpendicular
            do {
                d2x = MathUtils.nonZeroRandInt(-4, 4);
                d2y = MathUtils.nonZeroRandInt(-4, 4);
            } while (
                d1x * d2y === d1y * d2x ||            // parallel check
                d1x * d2x + d1y * d2y === 0            // perpendicular check
            );
        }

        const dotProd = d1x * d2x + d1y * d2y;
        const isParallel = (d1x * d2y === d1y * d2x);
        const isPerp     = (dotProd === 0);

        let correctTex;
        if (isParallel)  correctTex = `\\text{Parallel}`;
        else if (isPerp) correctTex = `\\text{Perpendicular}`;
        else             correctTex = `\\text{Neither parallel nor perpendicular}`;

        const options = [
            { value: (isParallel ? 1 : 0),  tex: `\\text{Parallel}` },
            { value: (isPerp     ? 1 : 0),  tex: `\\text{Perpendicular}` },
            { value: 0,                      tex: `\\text{Intersecting (not parallel)}` },
            { value: (!isParallel && !isPerp ? 1 : 0), tex: `\\text{Neither parallel nor perpendicular}` }
        ];

        const shuffled = MathUtils.shuffle(options);

        const kNum = isParallel ? d2x : null;
        const kDen = isParallel ? d1x : null;
        const kTex = isParallel && d1x !== 0 ? `k = \\frac{${d2x}}{${d1x}} = ${MathUtils.fractionTeX(d2x, d1x)}` : '';

        return {
            type: 'mc',
            rule: 'Parallel Lines',
            difficulty: 'medium',
            text: `Two lines have direction vectors \\(\\mathbf{d}_1 = \\binom{${d1x}}{${d1y}}\\) and \\(\\mathbf{d}_2 = \\binom{${d2x}}{${d2y}}\\). What is their relationship?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Parallel: } \\mathbf{d}_1 = k\\,\\mathbf{d}_2 \\iff \\frac{d_{1x}}{d_{2x}} = \\frac{d_{1y}}{d_{2y}}`,
                `\\text{Perpendicular: } \\mathbf{d}_1 \\cdot \\mathbf{d}_2 = ${d1x}(${d2x}) + ${d1y}(${d2y}) = ${dotProd}`
            ],
            explain: `<strong>Step 1:</strong> Check parallel: \\(${d1x} \\times ${d2y} ${d1x * d2y >= 0 ? '=' : '='} ${d1x * d2y}\\) and \\(${d1y} \\times ${d2x} = ${d1y * d2x}\\). ` +
                     (isParallel ? `Equal — <strong>parallel</strong>.` : `Not equal — not parallel.`) + `<br><br>` +
                     `<strong>Step 2:</strong> Check perpendicular: \\(\\mathbf{d}_1 \\cdot \\mathbf{d}_2 = ${d1x}(${d2x}) + ${d1y}(${d2y}) = ${dotProd}\\). ` +
                     (isPerp ? `Zero — <strong>perpendicular</strong>.` : `Non-zero — not perpendicular.`) + `<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex.replace(/\\text\{|\}/g, '')}\\).`
        };
    },

    /**
     * 7. qAngleBetweenLines - Hard (Free)
     * cos θ = |d₁·d₂| / (|d₁||d₂|). θ in degrees, 1 d.p.
     * Uses direction vectors giving clean angles: 0°, 30°, 45°, 60°, 90°.
     */
    qAngleBetweenLines() {
        // Predefined pairs with known angles
        const pairs = [
            { d1: [1, 0],  d2: [0, 1],  angle: 90 },
            { d1: [1, 0],  d2: [1, 1],  angle: 45 },
            { d1: [1, 0],  d2: [1, -1], angle: 45 },
            { d1: [1, 1],  d2: [1, -1], angle: 90 },
            { d1: [1, 0],  d2: [3, 0],  angle: 0  },
            { d1: [2, 1],  d2: [-1, 2], angle: 90 },   // dot = 2(-1)+1(2)=0
            { d1: [1, 0],  d2: [1, 0],  angle: 0  },
            { d1: [3, 4],  d2: [-4, 3], angle: 90 },   // dot = -12+12=0
            { d1: [1, 1],  d2: [2, 2],  angle: 0  },
            { d1: [0, 1],  d2: [1, 0],  angle: 90 }
        ];

        const chosen = MathUtils.pick(pairs);
        const [d1x, d1y] = chosen.d1;
        const [d2x, d2y] = chosen.d2;
        const expectedAngle = chosen.angle;

        // Recompute for verify (use full precision)
        const dot  = Math.abs(d1x * d2x + d1y * d2y);
        const mag1 = Math.sqrt(d1x * d1x + d1y * d1y);
        const mag2 = Math.sqrt(d2x * d2x + d2y * d2y);
        const cosVal = dot / (mag1 * mag2);
        const thetaDeg = Math.round(Math.acos(Math.min(1, cosVal)) * (180 / Math.PI) * 10) / 10;

        return {
            type: 'free',
            rule: 'Angle Between Lines',
            difficulty: 'hard',
            text: `Find the acute angle between two lines with direction vectors \\(\\mathbf{d}_1 = \\binom{${d1x}}{${d1y}}\\) and \\(\\mathbf{d}_2 = \\binom{${d2x}}{${d2y}}\\). Give your answer in degrees to 1 decimal place.`,
            latex: '',
            answer: thetaDeg,
            answerTex: `${thetaDeg}^{\\circ}`,
            options: [],
            hintTex: [
                `\\cos\\theta = \\frac{|\\mathbf{d}_1 \\cdot \\mathbf{d}_2|}{|\\mathbf{d}_1||\\mathbf{d}_2|}`,
                `\\mathbf{d}_1 \\cdot \\mathbf{d}_2 = ${d1x}(${d2x}) + ${d1y}(${d2y}) = ${d1x * d2x + d1y * d2y}`
            ],
            explain: `<strong>Step 1:</strong> Dot product: \\(\\mathbf{d}_1 \\cdot \\mathbf{d}_2 = ${d1x}(${d2x}) + ${d1y}(${d2y}) = ${d1x * d2x + d1y * d2y}\\).<br><br>` +
                     `<strong>Step 2:</strong> Magnitudes: \\(|\\mathbf{d}_1| = \\sqrt{${d1x}^2 + ${d1y}^2} = \\sqrt{${d1x * d1x + d1y * d1y}}\\), \\(|\\mathbf{d}_2| = \\sqrt{${d2x}^2 + ${d2y}^2} = \\sqrt{${d2x * d2x + d2y * d2y}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\cos\\theta = \\frac{|${d1x * d2x + d1y * d2y}|}{\\sqrt{${d1x * d1x + d1y * d1y}} \\times \\sqrt{${d2x * d2x + d2y * d2y}}}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(\\theta = \\arccos\\left(\\frac{${dot.toFixed(4)}}{${(mag1 * mag2).toFixed(4)}}\\right) = ${thetaDeg}^{\\circ}\\).`
        };
    },

    /**
     * 8. qLineFromTwoPoints - Medium (MC)
     * Given A and B, which vector equation represents line AB?
     * Direction = B - A. Correct option has direction proportional to B-A and passes through A.
     */
    qLineFromTwoPoints() {
        const ax = MathUtils.randInt(-5, 5);
        const ay = MathUtils.randInt(-5, 5);
        let bx, by;
        do { bx = MathUtils.randInt(-5, 5); } while (bx === ax);
        do { by = MathUtils.randInt(-5, 5); } while (by === ay);

        const dx = bx - ax;
        const dy = by - ay;

        // Format a vector equation as LaTeX string
        function fmtVecEq(px, py, qx, qy) {
            const pxS = px >= 0 ? String(px) : String(px);
            const pyS = py >= 0 ? String(py) : String(py);
            return `\\mathbf{r} = \\binom{${pxS}}{${pyS}} + t\\binom{${qx}}{${qy}}`;
        }

        const correctTex = fmtVecEq(ax, ay, dx, dy);

        // Distractors
        const distractors = [];
        // D1: Correct direction but position vector B instead of A
        distractors.push(fmtVecEq(bx, by, dx, dy));
        // D2: Reversed direction, correct position
        distractors.push(fmtVecEq(ax, ay, -dx, -dy));
        // D3: Swapped direction components
        distractors.push(fmtVecEq(ax, ay, dy, dx));

        const optionTexts = [correctTex];
        for (const d of distractors) {
            if (!optionTexts.includes(d)) optionTexts.push(d);
        }
        // Fill to 4 if collisions
        let fill = 1;
        while (optionTexts.length < 4) {
            const candidate = fmtVecEq(ax + fill, ay, dx, dy);
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
            rule: 'Line from Two Points',
            difficulty: 'medium',
            text: `Which vector equation represents the line through \\(A(${ax},\\,${ay})\\) and \\(B(${bx},\\,${by})\\)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Direction vector: } \\overrightarrow{AB} = B - A = \\binom{${bx}-${ax}}{${by}-${ay}} = \\binom{${dx}}{${dy}}`,
                `\\text{Use } A \\text{ as the position vector: } \\mathbf{r} = \\binom{${ax}}{${ay}} + t\\binom{${dx}}{${dy}}`
            ],
            explain: `<strong>Step 1:</strong> Find the direction vector: \\(\\overrightarrow{AB} = \\binom{${bx}-${ax}}{${by}-${ay}} = \\binom{${dx}}{${dy}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use point \\(A\\) as the position vector (any point on the line works).<br><br>` +
                     `<strong>Step 3:</strong> The equation is \\(${correctTex}\\).<br><br>` +
                     `<strong>Note:</strong> Using \\(B\\) as position vector also gives a valid equation, but only one option here passes through \\(A\\) with the correct direction.`
        };
    },

    /**
     * 9. qMidpointOnLine - Medium (Free)
     * Given r = a + t·b, points at t=0 and t=2, find midpoint x-coordinate (t=1).
     * x = a₁ + b₁
     */
    qMidpointOnLine() {
        const a1 = MathUtils.randInt(-6, 6);
        const a2 = MathUtils.randInt(-6, 6);
        const b1 = MathUtils.nonZeroRandInt(-5, 5);
        const b2 = MathUtils.nonZeroRandInt(-5, 5);

        const p1x = a1;                // t = 0
        const p1y = a2;
        const p2x = a1 + 2 * b1;      // t = 2
        const p2y = a2 + 2 * b2;
        const midX = a1 + b1;          // t = 1
        const midY = a2 + b2;

        return {
            type: 'free',
            rule: 'Midpoint on Line',
            difficulty: 'medium',
            text: `A line has equation \\(\\mathbf{r} = \\binom{${a1}}{${a2}} + t\\binom{${b1}}{${b2}}\\). ` +
                  `Points \\(P\\) and \\(Q\\) on the line correspond to \\(t = 0\\) and \\(t = 2\\) respectively. ` +
                  `Find the x-coordinate of the midpoint of \\(PQ\\).`,
            latex: '',
            answer: midX,
            answerTex: String(midX),
            options: [],
            hintTex: [
                `P = \\binom{${p1x}}{${p1y}} \\text{ (at } t=0\\text{)}, \\quad Q = \\binom{${p2x}}{${p2y}} \\text{ (at } t=2\\text{)}`,
                `\\text{Midpoint at } t=1: \\quad x = ${a1} + (1)(${b1}) = ${midX}`
            ],
            explain: `<strong>Step 1:</strong> Find \\(P\\): at \\(t=0\\), \\(P = \\binom{${p1x}}{${p1y}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Find \\(Q\\): at \\(t=2\\), \\(Q = \\binom{${p2x}}{${p2y}}\\).<br><br>` +
                     `<strong>Step 3:</strong> The midpoint corresponds to \\(t = 1\\) (halfway between \\(t=0\\) and \\(t=2\\)):<br>` +
                     `\\(x = ${a1} + 1 \\times ${b1} = ${midX}\\), \\(y = ${a2} + 1 \\times ${b2} = ${midY}\\).<br><br>` +
                     `<strong>Answer:</strong> x-coordinate of midpoint \\(= ${midX}\\).`
        };
    },

    /**
     * 10. qCollinear - Hard (MC)
     * Are three points A, B, C collinear?
     * Check if AB and AC are parallel: AC = k·AB.
     */
    qCollinear() {
        const ax = MathUtils.randInt(-5, 5);
        const ay = MathUtils.randInt(-5, 5);
        const bx = MathUtils.randInt(-5, 5);
        const by = MathUtils.randInt(-5, 5);

        const collinear = MathUtils.randInt(0, 1) === 1;
        let cx, cy;

        if (collinear) {
            // C = A + k*(B-A) for some non-zero non-1 scalar
            const k = MathUtils.pick([-2, -1, 2, 3]);
            cx = ax + k * (bx - ax);
            cy = ay + k * (by - ay);
        } else {
            // Not collinear: random C that fails cross-product test
            do {
                cx = MathUtils.randInt(-5, 5);
                cy = MathUtils.randInt(-5, 5);
            } while (
                (bx - ax) * (cy - ay) === (by - ay) * (cx - ax) // parallel check
            );
        }

        const abx = bx - ax;
        const aby = by - ay;
        const acx = cx - ax;
        const acy = cy - ay;

        // Cross product ab × ac (2D: scalar)
        const cross = abx * acy - aby * acx;

        let correctTex;
        if (collinear) {
            correctTex = `\\text{Yes, collinear}`;
        } else {
            correctTex = `\\text{No, not collinear}`;
        }

        const options = [
            { value: collinear  ? 1 : 0, tex: `\\text{Yes, collinear}` },
            { value: !collinear ? 1 : 0, tex: `\\text{No, not collinear}` },
            { value: 0,                   tex: `\\text{Only two of the three are collinear}` },
            { value: 0,                   tex: `\\text{Cannot determine without distances}` }
        ];

        const shuffled = MathUtils.shuffle(options);

        // For explanation: ratio check
        const ratioTex = abx !== 0
            ? `\\frac{${acx}}{${abx}} = ${MathUtils.fractionTeX(acx, abx)}`
            : `\\frac{${acy}}{${aby}} = ${MathUtils.fractionTeX(acy, aby)}`;

        return {
            type: 'mc',
            rule: 'Collinear Points',
            difficulty: 'hard',
            text: `Are the three points \\(A(${ax},\\,${ay})\\), \\(B(${bx},\\,${by})\\), and \\(C(${cx},\\,${cy})\\) collinear?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\overrightarrow{AB} = \\binom{${abx}}{${aby}}, \\quad \\overrightarrow{AC} = \\binom{${acx}}{${acy}}`,
                `\\text{Collinear iff } \\overrightarrow{AC} = k\\,\\overrightarrow{AB} \\iff ${abx}(${acy}) - ${aby}(${acx}) = 0`
            ],
            explain: `<strong>Step 1:</strong> Compute \\(\\overrightarrow{AB} = \\binom{${abx}}{${aby}}\\) and \\(\\overrightarrow{AC} = \\binom{${acx}}{${acy}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Check the cross product (parallel condition):<br>` +
                     `\\(${abx} \\times ${acy} - ${aby} \\times ${acx} = ${abx * acy} - ${aby * acx} = ${cross}\\).<br><br>` +
                     (collinear
                         ? `<strong>Step 3:</strong> Cross product \\(= 0\\), so \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) are parallel. The three points are <strong>collinear</strong>.`
                         : `<strong>Step 3:</strong> Cross product \\(\\neq 0\\), so \\(\\overrightarrow{AB}\\) and \\(\\overrightarrow{AC}\\) are not parallel. The three points are <strong>not collinear</strong>.`)
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => VEC_LINES.qPointOnLine(),       weight: 3, difficulty: 'easy'   },
            { fn: () => VEC_LINES.qDirectionFromPoints(), weight: 3, difficulty: 'easy'  },
            { fn: () => VEC_LINES.qParameterForPoint(),  weight: 2, difficulty: 'medium' },
            { fn: () => VEC_LINES.qPointOnLineCheck(),   weight: 2, difficulty: 'medium' },
            { fn: () => VEC_LINES.qYCoordinateOnLine(),  weight: 3, difficulty: 'easy'   },
            { fn: () => VEC_LINES.qParallelLines(),      weight: 2, difficulty: 'medium' },
            { fn: () => VEC_LINES.qAngleBetweenLines(),  weight: 1, difficulty: 'hard'   },
            { fn: () => VEC_LINES.qLineFromTwoPoints(),  weight: 2, difficulty: 'medium' },
            { fn: () => VEC_LINES.qMidpointOnLine(),     weight: 2, difficulty: 'medium' },
            { fn: () => VEC_LINES.qCollinear(),          weight: 1, difficulty: 'hard'   }
        ];

        let filtered = pool;
        if (VEC_LINES.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (VEC_LINES.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (VEC_LINES.level === 'hard') {
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
        VEC_LINES.score = 0;
        VEC_LINES.total = 0;
        VEC_LINES.streak = 0;
        VEC_LINES.answered = false;
        VEC_LINES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="VEC_LINES.unload()">Vector Lines (3.13–3.14)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Vector Lines</h1>
                <p>IB Math AA 3.13–3.14 – Parametric equations of lines in 2D and 3D</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="VEC_LINES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="VEC_LINES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="VEC_LINES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="VEC_LINES.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="vl-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="vl-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="vl-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="vl-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="vl-question-card">
                <span class="rule-tag"       id="vl-rule"></span>
                <span class="difficulty-tag" id="vl-difficulty"></span>
                <div class="question-text"   id="vl-text"></div>
                <div class="question-prompt" id="vl-latex"></div>
                <div id="vl-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="vl-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="vl-feedback">
                <div class="feedback-title"       id="vl-feedback-title"></div>
                <div class="feedback-explanation" id="vl-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="vl-hint-btn" onclick="VEC_LINES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="vl-next-btn" onclick="VEC_LINES.next()" style="display:none;">Next Question</button>
            </div>
        `;

        VEC_LINES.next();
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
        VEC_LINES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        VEC_LINES.score  = 0;
        VEC_LINES.total  = 0;
        VEC_LINES.streak = 0;
        VEC_LINES.updateStats();
        VEC_LINES.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        VEC_LINES.answered  = false;
        VEC_LINES.hintIndex = 0;
        VEC_LINES.currentQ  = VEC_LINES.pickQuestion();
        const q = VEC_LINES.currentQ;

        // Rule tag
        document.getElementById('vl-rule').textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('vl-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('vl-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('vl-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('vl-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="VEC_LINES.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="vl-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')VEC_LINES.checkFree()">
                    <button class="btn btn-primary" onclick="VEC_LINES.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('vl-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint / feedback / next
        const hintBox = document.getElementById('vl-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('vl-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('vl-next-btn').style.display = 'none';
        document.getElementById('vl-hint-btn').style.display = '';
        document.getElementById('vl-hint-btn').disabled = false;

        // Render KaTeX
        VEC_LINES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = VEC_LINES.currentQ;
        if (!q || !q.hintTex || VEC_LINES.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('vl-hint-box');
        const prev = VEC_LINES.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[VEC_LINES.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        VEC_LINES.hintIndex++;

        if (VEC_LINES.hintIndex >= q.hintTex.length) {
            document.getElementById('vl-hint-btn').disabled = true;
        }

        VEC_LINES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (VEC_LINES.answered) return;
        VEC_LINES.answered = true;
        VEC_LINES.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });

        if (isCorrect) {
            btn.classList.add('correct');
            VEC_LINES.score++;
            VEC_LINES.streak++;
        } else {
            btn.classList.add('incorrect');
            VEC_LINES.streak = 0;
        }

        VEC_LINES.showFeedback(isCorrect);
        VEC_LINES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (VEC_LINES.answered) return;

        const inp = document.getElementById('vl-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        VEC_LINES.answered = true;
        VEC_LINES.total++;
        inp.disabled = true;

        const q = VEC_LINES.currentQ;
        const tol = q.difficulty === 'hard' ? 0.5 : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background  = 'var(--success-light)';
            VEC_LINES.score++;
            VEC_LINES.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background  = 'var(--error-light)';
            VEC_LINES.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        VEC_LINES.showFeedback(isCorrect);
        VEC_LINES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q    = VEC_LINES.currentQ;
        const fb   = document.getElementById('vl-feedback');
        const title       = document.getElementById('vl-feedback-title');
        const explanation = document.getElementById('vl-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = VEC_LINES.streak > 1
                ? `Correct! (${VEC_LINES.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('vl-next-btn').style.display = '';
        document.getElementById('vl-hint-btn').style.display = 'none';

        VEC_LINES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('vl-score');
        const totalEl  = document.getElementById('vl-total');
        const streakEl = document.getElementById('vl-streak');
        const accEl    = document.getElementById('vl-accuracy');

        if (scoreEl)  scoreEl.textContent  = VEC_LINES.score;
        if (totalEl)  totalEl.textContent  = VEC_LINES.total;
        if (streakEl) streakEl.textContent = VEC_LINES.streak;
        if (accEl) {
            accEl.textContent = VEC_LINES.total > 0
                ? Math.round((VEC_LINES.score / VEC_LINES.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['vector-lines'] = () => VEC_LINES.load();
