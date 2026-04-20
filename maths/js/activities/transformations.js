/*
 * transformations.js - IB Math AA 2.6: Transformations of Functions
 * Translations, stretches, and reflections
 */

const TRANSFORMATIONS = {
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
     * 1. qTranslateV - Easy (Free response)
     * Given f(x) = ax+b and a specific x-value, find g(x_val) where g(x) = f(x)+k.
     */
    qTranslateV() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.randInt(-8, 8);
        const k = MathUtils.nonZeroRandInt(-8, 8);
        const xv = MathUtils.randInt(-5, 5);

        const fx = a * xv + b;
        const gx = fx + k;

        // Format f(x) = ax + b
        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let bTex = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `${aTex}x${bTex}`;

        let kTex = k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        let kSignTex = k > 0 ? `+${k}` : String(k);

        return {
            type: 'free',
            rule: 'Vertical Translation',
            difficulty: 'easy',
            text: `The graph of \\(g(x) = f(x) ${kTex}\\) is a vertical translation of \\(f(x)\\) by \\(${kSignTex}\\) units. Find \\(g(${xv})\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: gx,
            answerTex: String(gx),
            options: [],
            hintTex: [
                `g(x) = f(x) ${kTex} = ${fTex} ${kTex}`,
                `g(${xv}) = f(${xv}) ${kTex} = (${a}(${xv}) + ${b}) ${kTex} = ${fx} ${kTex} = ${gx}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate \\(f(${xv})\\):<br>` +
                     `\\(f(${xv}) = ${a}(${xv}) + ${b} = ${a * xv} + ${b} = ${fx}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the vertical translation:<br>` +
                     `\\(g(${xv}) = f(${xv}) ${kTex} = ${fx} ${kTex} = ${gx}\\).`
        };
    },

    /**
     * 2. qTranslateH - Easy (Free response)
     * Given f(x) = ax+b and point (p, f(p)), after horizontal translation by h,
     * find the new x-coordinate of the image. Answer is p+h.
     */
    qTranslateH() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.randInt(-8, 8);
        const p = MathUtils.randInt(-6, 6);
        const h = MathUtils.nonZeroRandInt(-6, 6);

        const fp = a * p + b;
        const newX = p + h;

        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let bTex = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `${aTex}x${bTex}`;

        // g(x) = f(x - h) — shift right by h
        let hInnerTex = h > 0 ? `x - ${h}` : `x + ${Math.abs(h)}`;
        let hSignTex = h > 0 ? `+${h}` : String(h);

        return {
            type: 'free',
            rule: 'Horizontal Translation',
            difficulty: 'easy',
            text: `The graph of \\(g(x) = f(x - ${h})\\) is a horizontal translation of \\(f(x)\\) by \\(${hSignTex}\\) units. The point \\((${p},\\,${fp})\\) lies on \\(f\\). What is the x-coordinate of its image on \\(g\\)?`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: newX,
            answerTex: String(newX),
            options: [],
            hintTex: [
                `\\text{Under } g(x)=f(x-h), \\text{ each point } (x,\\,y) \\text{ maps to } (x+h,\\,y)`,
                `(${p},\\,${fp}) \\mapsto (${p} + ${h},\\,${fp}) = (${newX},\\,${fp})`
            ],
            explain: `<strong>Step 1:</strong> A horizontal translation by \\(h = ${h}\\) maps every point \\((x, y)\\) to \\((x + ${h},\\, y)\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply to the point \\((${p},\\,${fp})\\):<br>` +
                     `New x-coordinate \\(= ${p} + (${h}) = ${newX}\\).<br><br>` +
                     `<strong>Answer:</strong> The image has x-coordinate \\(${newX}\\).`
        };
    },

    /**
     * 3. qStretchV - Easy (Free response)
     * Given f(x) = ax²+b and a specific x-value, find g(x_val) where g(x) = c·f(x).
     */
    qStretchV() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const xv = MathUtils.randInt(-4, 4);

        const fxv = a * xv * xv + b;
        const gxv = c * fxv;

        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let bTex = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `${aTex}x^2${bTex}`;

        return {
            type: 'free',
            rule: 'Vertical Stretch',
            difficulty: 'easy',
            text: `The graph of \\(g(x) = ${c === 1 ? '' : c === -1 ? '-' : c}f(x)\\) is a vertical stretch of \\(f(x)\\) by scale factor \\(${c}\\). Find \\(g(${xv})\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: gxv,
            answerTex: String(gxv),
            options: [],
            hintTex: [
                `g(x) = ${c}f(x), \\text{ so } g(${xv}) = ${c} \\cdot f(${xv})`,
                `f(${xv}) = ${a}(${xv})^2 + ${b} = ${a * xv * xv} + ${b} = ${fxv}, \\quad g(${xv}) = ${c} \\times ${fxv} = ${gxv}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate \\(f(${xv})\\):<br>` +
                     `\\(f(${xv}) = ${a}(${xv})^2 + ${b} = ${a * xv * xv} + ${b} = ${fxv}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the vertical stretch:<br>` +
                     `\\(g(${xv}) = ${c} \\cdot f(${xv}) = ${c} \\times ${fxv} = ${gxv}\\).`
        };
    },

    /**
     * 4. qStretchH - Easy (Free response)
     * Under horizontal stretch by factor k (g(x) = f(x/k)), point (p, f(p)) maps to (kp, f(p)).
     * Find new x-coordinate.
     */
    qStretchH() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        const p = MathUtils.nonZeroRandInt(-5, 5);
        const k = MathUtils.nonZeroRandInt(-4, 4);

        const fp = a * p + b;
        const newX = k * p;

        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let bTex = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `${aTex}x${bTex}`;

        let kFracTex = k === 1 ? 'x' : k === -1 ? '-x' : `\\frac{x}{${k}}`;

        return {
            type: 'free',
            rule: 'Horizontal Stretch',
            difficulty: 'easy',
            text: `Under the horizontal stretch \\(g(x) = f\\!\\left(${kFracTex}\\right)\\) by scale factor \\(${k}\\), the point \\((${p},\\,${fp})\\) on \\(f\\) maps to a new point on \\(g\\). Find the new x-coordinate.`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: newX,
            answerTex: String(newX),
            options: [],
            hintTex: [
                `\\text{Under } g(x)=f(x/k), \\text{ the point } (x,\\,y) \\text{ maps to } (kx,\\,y)`,
                `(${p},\\,${fp}) \\mapsto (${k} \\times ${p},\\,${fp}) = (${newX},\\,${fp})`
            ],
            explain: `<strong>Step 1:</strong> A horizontal stretch by scale factor \\(k = ${k}\\) maps every point \\((x, y)\\) to \\((kx,\\, y)\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply to \\((${p},\\,${fp})\\):<br>` +
                     `New x-coordinate \\(= ${k} \\times ${p} = ${newX}\\).<br><br>` +
                     `<strong>Answer:</strong> The image has x-coordinate \\(${newX}\\).`
        };
    },

    /**
     * 5. qReflectX - Easy (Free response)
     * Given f(x) = ax²+bx+c and x=p, under reflection in x-axis g(x) = -f(x). Find g(p).
     */
    qReflectX() {
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-5, 5);
        const c = MathUtils.randInt(-6, 6);
        const p = MathUtils.randInt(-4, 4);

        const fp = a * p * p + b * p + c;
        const gp = -fp;

        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let bTex = b === 0 ? '' : b === 1 ? ' + x' : b === -1 ? ' - x' : b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
        let cTex = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const fTex = `${aTex}x^2${bTex}${cTex}`;

        return {
            type: 'free',
            rule: 'Reflection in x-axis',
            difficulty: 'easy',
            text: `The graph of \\(g(x) = -f(x)\\) is a reflection of \\(f(x)\\) in the x-axis. Find \\(g(${p})\\).`,
            latex: `\\(f(x) = ${fTex}\\)`,
            answer: gp,
            answerTex: String(gp),
            options: [],
            hintTex: [
                `g(${p}) = -f(${p})`,
                `f(${p}) = ${a}(${p})^2 + ${b}(${p}) + ${c} = ${a * p * p} + ${b * p} + ${c} = ${fp}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate \\(f(${p})\\):<br>` +
                     `\\(f(${p}) = ${a}(${p})^2 + ${b}(${p}) + ${c} = ${a * p * p} + ${b * p} + ${c} = ${fp}\\).<br><br>` +
                     `<strong>Step 2:</strong> Reflect in the x-axis — negate the y-value:<br>` +
                     `\\(g(${p}) = -f(${p}) = -(${fp}) = ${gp}\\).`
        };
    },

    /**
     * 6. qReflectY - Easy (MC)
     * Given f(x) = ax+b, under reflection in y-axis g(x) = f(-x) = -ax+b.
     * Give 4 options for the new equation.
     */
    qReflectY() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.randInt(-8, 8);

        // Correct: g(x) = -ax + b
        const negA = -a;

        function fmtLine(m, con) {
            let mTex = m === 1 ? '' : m === -1 ? '-' : String(m);
            let conTex = con === 0 ? '' : con > 0 ? ` + ${con}` : ` - ${Math.abs(con)}`;
            return `y = ${mTex}x${conTex}`;
        }

        const correctTex = fmtLine(negA, b);

        // Distractors:
        // D1: Negated intercept (wrong)
        const d1 = fmtLine(negA, -b);
        // D2: Original unchanged (forgot to negate gradient)
        const d2 = fmtLine(a, b);
        // D3: Both negated
        const d3 = fmtLine(a, -b);

        const optionTexts = [correctTex, d1, d2, d3];

        // Dedup (edge cases like a=0 handled by nonZeroRandInt, b=0 could cause repeats)
        const seen = new Set();
        const dedupedTexts = [correctTex];
        seen.add(correctTex);
        const candidates = [d1, d2, d3];
        for (const d of candidates) {
            if (!seen.has(d)) {
                dedupedTexts.push(d);
                seen.add(d);
            }
        }
        // Fill any gaps with offset variants
        const extras = [
            fmtLine(negA, b + 2),
            fmtLine(negA, b - 2),
            fmtLine(negA + 1, b),
            fmtLine(negA - 1, b)
        ];
        for (const ex of extras) {
            if (dedupedTexts.length >= 4) break;
            if (!seen.has(ex)) { dedupedTexts.push(ex); seen.add(ex); }
        }

        const options = dedupedTexts.slice(0, 4).map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let bTex = b === 0 ? '' : b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`;
        const fTex = `y = ${aTex}x${bTex}`;

        return {
            type: 'mc',
            rule: 'Reflection in y-axis',
            difficulty: 'easy',
            text: `The graph of \\(g(x) = f(-x)\\) is a reflection of \\(f(x)\\) in the y-axis. Which equation describes \\(g(x)\\)?`,
            latex: `\\(f(x): \\quad ${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `g(x) = f(-x): \\text{ replace every } x \\text{ with } (-x)`,
                `g(x) = ${a}(-x) + ${b} = ${negA === 1 ? '' : negA === -1 ? '-' : negA}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}`
            ],
            explain: `<strong>Step 1:</strong> To reflect in the y-axis, replace \\(x\\) with \\(-x\\):<br>` +
                     `\\(g(x) = f(-x)\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute into \\(f(x) = ${aTex}x${bTex}\\):<br>` +
                     `\\(g(x) = ${a}(-x) + ${b} = ${negA === 1 ? '' : negA === -1 ? '-' : negA}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${correctTex}\\).`
        };
    },

    /**
     * 7. qCombinedPoint - Medium (Free response)
     * Given f(p) = v, under g(x) = a·f(x-h)+k, find the new y-coordinate.
     * Answer is a*v + k.
     */
    qCombinedPoint() {
        const sf = MathUtils.nonZeroRandInt(-4, 4);   // scale factor (avoid name clash with 'a')
        const h = MathUtils.nonZeroRandInt(-6, 6);
        const k = MathUtils.nonZeroRandInt(-6, 6);
        const p = MathUtils.randInt(-6, 6);
        const v = MathUtils.nonZeroRandInt(-8, 8);

        const newY = sf * v + k;
        const newX = p + h;

        let hTex = h > 0 ? `x - ${h}` : `x + ${Math.abs(h)}`;
        let kTex = k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        let sfTex = sf === 1 ? '' : sf === -1 ? '-' : String(sf);

        return {
            type: 'free',
            rule: 'Combined Transformation',
            difficulty: 'medium',
            text: `Given that \\(f(${p}) = ${v}\\), the transformation \\(g(x) = ${sfTex}f(${hTex})${kTex}\\) maps the point \\((${p},\\,${v})\\) to a new point. Find the y-coordinate of the image.`,
            latex: `\\text{Image point: } \\left(${newX},\\, ?\\right)`,
            answer: newY,
            answerTex: String(newY),
            options: [],
            hintTex: [
                `\\text{Under } g(x)=${sfTex}f(${hTex})${kTex}, \\text{ the point } (p,\\,v) \\mapsto (p+${h},\\, ${sf}v ${kTex})`,
                `\\text{New y-coordinate} = ${sf} \\times ${v} ${kTex} = ${sf * v} ${kTex} = ${newY}`
            ],
            explain: `<strong>Step 1:</strong> Identify the transformation parameters: scale factor \\(a = ${sf}\\), horizontal shift \\(h = ${h}\\), vertical shift \\(k = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Under \\(g(x) = ${sf === 1 ? '' : sf === -1 ? '-' : sf}f(${hTex})${kTex}\\), the point \\((p,\\,v)\\) maps to \\((p + h,\\; av + k)\\).<br><br>` +
                     `<strong>Step 3:</strong> New y-coordinate \\(= ${sf} \\times ${v} + (${k}) = ${sf * v} + ${k} = ${newY}\\).`
        };
    },

    /**
     * 8. qIdentifyParams - Medium (MC)
     * Given g(x) = a·f(x-h)+k with numeric values, identify (a, h, k) from 4 options.
     */
    qIdentifyParams() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const h = MathUtils.nonZeroRandInt(-6, 6);
        const k = MathUtils.nonZeroRandInt(-6, 6);

        let hInnerTex = h > 0 ? `x - ${h}` : `x + ${Math.abs(h)}`;
        let kTex = k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);

        const gTex = `g(x) = ${aTex}f(${hInnerTex})${kTex}`;

        function paramTex(pa, ph, pk) {
            return `a = ${pa},\\ h = ${ph},\\ k = ${pk}`;
        }

        const correctTex = paramTex(a, h, k);

        // Distractors: plausible confusions
        // D1: wrong sign on h (common mistake: reading f(x-h) and thinking h is negative)
        const d1 = paramTex(a, -h, k);
        // D2: a and k swapped
        const d2 = paramTex(k, h, a);
        // D3: h off by 1 sign flip and k off
        const d3 = paramTex(a, h, -k);

        const allTexts = [correctTex, d1, d2, d3];
        const seen = new Set([correctTex]);
        const finalTexts = [correctTex];
        for (const t of [d1, d2, d3]) {
            if (!seen.has(t)) { finalTexts.push(t); seen.add(t); }
        }
        // Pad if needed
        const fallbacks = [
            paramTex(a + 1, h, k),
            paramTex(a, h + 1, k),
            paramTex(a, h, k + 1),
            paramTex(-a, h, k)
        ];
        for (const fb of fallbacks) {
            if (finalTexts.length >= 4) break;
            if (!seen.has(fb)) { finalTexts.push(fb); seen.add(fb); }
        }

        const options = finalTexts.slice(0, 4).map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Identify Parameters',
            difficulty: 'medium',
            text: `Which option correctly identifies the parameters \\(a\\), \\(h\\), and \\(k\\) in the transformation below?`,
            latex: `\\(${gTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `g(x) = a \\cdot f(x - h) + k: \\text{ read off the coefficient, bracket shift, and added constant}`,
                `\\text{In } f(${hInnerTex}), \\text{ the shift is } h = ${h} \\text{ (note sign convention)}`
            ],
            explain: `<strong>Step 1:</strong> The coefficient of \\(f(\\ldots)\\) gives the vertical scale factor: \\(a = ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> The bracket is \\(f(${hInnerTex})\\), which has the form \\(f(x - h)\\) with \\(h = ${h}\\). Note: \\(x ${h > 0 ? '- ' + h : '+ ' + Math.abs(h)}\\) means shift right by \\(${h}\\).<br><br>` +
                     `<strong>Step 3:</strong> The constant added outside is \\(k = ${k}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(a = ${a},\\; h = ${h},\\; k = ${k}\\).`
        };
    },

    /**
     * 9. qTransformAsymptote - Medium (MC)
     * f(x) = 1/x has asymptotes x=0, y=0. Under g(x) = f(x-h)+k, asymptotes become x=h, y=k.
     */
    qTransformAsymptote() {
        const h = MathUtils.nonZeroRandInt(-8, 8);
        const k = MathUtils.nonZeroRandInt(-8, 8);

        let hInnerTex = h > 0 ? `x - ${h}` : `x + ${Math.abs(h)}`;
        let kTex = k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        const gTex = `g(x) = \\frac{1}{${hInnerTex}}${kTex}`;

        function asymTex(xA, yA) {
            return `x = ${xA},\\ y = ${yA}`;
        }

        const correctTex = asymTex(h, k);

        // Distractors
        const d1 = asymTex(-h, k);       // wrong sign on vertical asymptote
        const d2 = asymTex(h, -k);       // wrong sign on horizontal asymptote
        const d3 = asymTex(-h, -k);      // both wrong signs

        const allD = [correctTex, d1, d2, d3];
        const seen = new Set([correctTex]);
        const finalTexts = [correctTex];
        for (const t of [d1, d2, d3]) {
            if (!seen.has(t)) { finalTexts.push(t); seen.add(t); }
        }
        const fallbacks = [
            asymTex(h + 1, k),
            asymTex(h, k + 1),
            asymTex(h - 1, k),
            asymTex(h, k - 1)
        ];
        for (const fb of fallbacks) {
            if (finalTexts.length >= 4) break;
            if (!seen.has(fb)) { finalTexts.push(fb); seen.add(fb); }
        }

        const options = finalTexts.slice(0, 4).map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Transformed Asymptotes',
            difficulty: 'medium',
            text: `The function \\(f(x) = \\dfrac{1}{x}\\) has asymptotes \\(x = 0\\) and \\(y = 0\\). After the transformation below, what are the new asymptotes?`,
            latex: `\\(${gTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `g(x) = f(x - h) + k \\text{ shifts the graph right by } h \\text{ and up by } k`,
                `\\text{Vertical asymptote: } x = ${h}; \\quad \\text{Horizontal asymptote: } y = ${k}`
            ],
            explain: `<strong>Step 1:</strong> The transformation \\(g(x) = f(x - h) + k\\) translates the graph right by \\(h\\) and up by \\(k\\).<br><br>` +
                     `<strong>Step 2:</strong> The vertical asymptote \\(x = 0\\) shifts to \\(x = ${h}\\).<br><br>` +
                     `<strong>Step 3:</strong> The horizontal asymptote \\(y = 0\\) shifts to \\(y = ${k}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${h},\\; y = ${k}\\).`
        };
    },

    /**
     * 10. qInverseMapping - Hard (Free response)
     * Under g(x) = a·f(x-h)+k, point (p, q) maps to (p+h, aq+k).
     * Given image point and a, h, k, find original y-coordinate q = (image_y - k)/a.
     */
    qInverseMapping() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const h = MathUtils.nonZeroRandInt(-6, 6);
        const k = MathUtils.nonZeroRandInt(-6, 6);
        const q = MathUtils.nonZeroRandInt(-8, 8);   // original y-coordinate
        const p = MathUtils.randInt(-6, 6);           // original x-coordinate

        const imageX = p + h;
        const imageY = a * q + k;

        let hInnerTex = h > 0 ? `x - ${h}` : `x + ${Math.abs(h)}`;
        let kTex = k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);

        // Intermediate steps for explanation
        const imageYMinusK = imageY - k;

        return {
            type: 'free',
            rule: 'Inverse Mapping',
            difficulty: 'hard',
            text: `Under the transformation \\(g(x) = ${aTex}f(${hInnerTex})${kTex}\\), the point \\((${imageX},\\,${imageY})\\) is the image of a point on \\(f\\). Find the y-coordinate of the original point on \\(f\\).`,
            latex: `\\text{Image point on } g: \\left(${imageX},\\,${imageY}\\right)`,
            answer: q,
            answerTex: String(q),
            options: [],
            hintTex: [
                `\\text{Under } g(x)=${aTex}f(${hInnerTex})${kTex}, \\text{ the mapping is: } (p,\\,q) \\mapsto (p+${h},\\;${a}q${kTex})`,
                `${a}q + ${k} = ${imageY} \\implies ${a}q = ${imageYMinusK} \\implies q = ${MathUtils.fractionTeX(imageYMinusK, a)}`
            ],
            explain: `<strong>Step 1:</strong> Under \\(g(x) = ${aTex}f(${hInnerTex})${kTex}\\), the original point \\((p,\\,q)\\) maps to \\((p + ${h},\\; ${a}q + ${k})\\).<br><br>` +
                     `<strong>Step 2:</strong> We are given the image \\((${imageX},\\,${imageY})\\), so the image y-coordinate satisfies:<br>` +
                     `\\(${a}q + ${k} = ${imageY}\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(q\\):<br>` +
                     `\\(${a}q = ${imageY} - ${k} = ${imageYMinusK}\\)<br>` +
                     `\\(q = \\dfrac{${imageYMinusK}}{${a}} = ${q}\\).<br><br>` +
                     `<strong>Answer:</strong> The original y-coordinate is \\(${q}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => TRANSFORMATIONS.qTranslateV(),        weight: 3, difficulty: 'easy'   },
            { fn: () => TRANSFORMATIONS.qTranslateH(),        weight: 3, difficulty: 'easy'   },
            { fn: () => TRANSFORMATIONS.qStretchV(),          weight: 3, difficulty: 'easy'   },
            { fn: () => TRANSFORMATIONS.qStretchH(),          weight: 3, difficulty: 'easy'   },
            { fn: () => TRANSFORMATIONS.qReflectX(),          weight: 3, difficulty: 'easy'   },
            { fn: () => TRANSFORMATIONS.qReflectY(),          weight: 3, difficulty: 'easy'   },
            { fn: () => TRANSFORMATIONS.qCombinedPoint(),     weight: 2, difficulty: 'medium' },
            { fn: () => TRANSFORMATIONS.qIdentifyParams(),    weight: 2, difficulty: 'medium' },
            { fn: () => TRANSFORMATIONS.qTransformAsymptote(), weight: 2, difficulty: 'medium' },
            { fn: () => TRANSFORMATIONS.qInverseMapping(),    weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (TRANSFORMATIONS.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (TRANSFORMATIONS.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (TRANSFORMATIONS.level === 'hard') {
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
        TRANSFORMATIONS.score = 0;
        TRANSFORMATIONS.total = 0;
        TRANSFORMATIONS.streak = 0;
        TRANSFORMATIONS.answered = false;
        TRANSFORMATIONS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="TRANSFORMATIONS.unload()">Transformations of Functions</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Transformations of Functions</h1>
                <p>IB Math AA 2.6 &ndash; Translations, stretches, and reflections</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="TRANSFORMATIONS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="TRANSFORMATIONS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="TRANSFORMATIONS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="TRANSFORMATIONS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="trans-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="trans-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="trans-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="trans-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="trans-question-card">
                <span class="rule-tag" id="trans-rule"></span>
                <span class="difficulty-tag" id="trans-difficulty"></span>
                <div class="question-text" id="trans-text"></div>
                <div class="question-prompt" id="trans-latex"></div>
                <div id="trans-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="trans-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="trans-feedback">
                <div class="feedback-title" id="trans-feedback-title"></div>
                <div class="feedback-explanation" id="trans-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="trans-hint-btn" onclick="TRANSFORMATIONS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="trans-next-btn" onclick="TRANSFORMATIONS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        TRANSFORMATIONS.next();
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
        TRANSFORMATIONS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        TRANSFORMATIONS.score = 0;
        TRANSFORMATIONS.total = 0;
        TRANSFORMATIONS.streak = 0;
        TRANSFORMATIONS.updateStats();
        TRANSFORMATIONS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        TRANSFORMATIONS.answered = false;
        TRANSFORMATIONS.hintIndex = 0;
        TRANSFORMATIONS.currentQ = TRANSFORMATIONS.pickQuestion();
        const q = TRANSFORMATIONS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('trans-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('trans-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('trans-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('trans-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('trans-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="TRANSFORMATIONS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="trans-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')TRANSFORMATIONS.checkFree()">
                    <button class="btn btn-primary" onclick="TRANSFORMATIONS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('trans-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('trans-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('trans-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('trans-next-btn').style.display = 'none';
        document.getElementById('trans-hint-btn').style.display = '';
        document.getElementById('trans-hint-btn').disabled = false;

        // Render KaTeX
        TRANSFORMATIONS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = TRANSFORMATIONS.currentQ;
        if (!q || !q.hintTex || TRANSFORMATIONS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('trans-hint-box');
        const hintContent = TRANSFORMATIONS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[TRANSFORMATIONS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        TRANSFORMATIONS.hintIndex++;

        if (TRANSFORMATIONS.hintIndex >= q.hintTex.length) {
            document.getElementById('trans-hint-btn').disabled = true;
        }

        TRANSFORMATIONS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (TRANSFORMATIONS.answered) return;
        TRANSFORMATIONS.answered = true;
        TRANSFORMATIONS.total++;

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
            TRANSFORMATIONS.score++;
            TRANSFORMATIONS.streak++;
        } else {
            btn.classList.add('incorrect');
            TRANSFORMATIONS.streak = 0;
        }

        TRANSFORMATIONS.showFeedback(isCorrect);
        TRANSFORMATIONS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (TRANSFORMATIONS.answered) return;

        const inp = document.getElementById('trans-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        TRANSFORMATIONS.answered = true;
        TRANSFORMATIONS.total++;
        inp.disabled = true;

        const q = TRANSFORMATIONS.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            TRANSFORMATIONS.score++;
            TRANSFORMATIONS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            TRANSFORMATIONS.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        TRANSFORMATIONS.showFeedback(isCorrect);
        TRANSFORMATIONS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = TRANSFORMATIONS.currentQ;
        const fb = document.getElementById('trans-feedback');
        const title = document.getElementById('trans-feedback-title');
        const explanation = document.getElementById('trans-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (TRANSFORMATIONS.streak > 1) {
                title.textContent = `Correct! (${TRANSFORMATIONS.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('trans-next-btn').style.display = '';
        document.getElementById('trans-hint-btn').style.display = 'none';

        TRANSFORMATIONS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('trans-score');
        const totalEl = document.getElementById('trans-total');
        const streakEl = document.getElementById('trans-streak');
        const accEl = document.getElementById('trans-accuracy');

        if (scoreEl) scoreEl.textContent = TRANSFORMATIONS.score;
        if (totalEl) totalEl.textContent = TRANSFORMATIONS.total;
        if (streakEl) streakEl.textContent = TRANSFORMATIONS.streak;
        if (accEl) {
            accEl.textContent = TRANSFORMATIONS.total > 0
                ? Math.round((TRANSFORMATIONS.score / TRANSFORMATIONS.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['transformations'] = () => TRANSFORMATIONS.load();
