/*
 * asymptotes.js - IB Math AA 2.7: Asymptotes & Rational Functions
 * Vertical, horizontal, and oblique asymptotes; rational function features
 */

const ASYMPTOTES = {
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
     * 1. qVerticalAsymptote - Easy (Free)
     * f(x) = a/(x-h)+k. Vertical asymptote is x = h. Give h.
     */
    qVerticalAsymptote() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const h = MathUtils.nonZeroRandInt(-8, 8);
        const k = MathUtils.randInt(-6, 6);

        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let kTex = '';
        if (k > 0) kTex = ` + ${k}`;
        else if (k < 0) kTex = ` - ${Math.abs(k)}`;

        const hSign = h < 0 ? `+ ${Math.abs(h)}` : `- ${h}`;
        const fTex = `f(x) = \\dfrac{${a}}{x ${hSign}}${kTex}`;

        return {
            type: 'free',
            rule: 'Vertical Asymptote',
            difficulty: 'easy',
            text: 'State the value of \\(h\\) that gives the vertical asymptote of the rational function below.',
            latex: `\\(${fTex}\\)`,
            answer: h,
            answerTex: `x = ${h}`,
            options: [],
            hintTex: [
                `\\text{The vertical asymptote occurs where the denominator equals zero.}`,
                `x - ${h} = 0 \\implies x = ${h}`
            ],
            explain: `<strong>Step 1:</strong> A vertical asymptote occurs where the denominator is zero.<br><br>` +
                     `<strong>Step 2:</strong> Set \\(x ${hSign} = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(x = ${h}\\).<br><br>` +
                     `<strong>Answer:</strong> The vertical asymptote is \\(x = ${h}\\). Enter \\(${h}\\).`
        };
    },

    /**
     * 2. qHorizontalAsymptote - Easy (Free)
     * f(x) = a/(x-h)+k. Horizontal asymptote is y = k. Give k.
     */
    qHorizontalAsymptote() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const h = MathUtils.nonZeroRandInt(-8, 8);
        const k = MathUtils.nonZeroRandInt(-6, 6);

        let kTex = '';
        if (k > 0) kTex = ` + ${k}`;
        else kTex = ` - ${Math.abs(k)}`;

        const hSign = h < 0 ? `+ ${Math.abs(h)}` : `- ${h}`;
        const fTex = `f(x) = \\dfrac{${a}}{x ${hSign}}${kTex}`;

        return {
            type: 'free',
            rule: 'Horizontal Asymptote',
            difficulty: 'easy',
            text: 'State the value of \\(k\\) that gives the horizontal asymptote of the rational function below.',
            latex: `\\(${fTex}\\)`,
            answer: k,
            answerTex: `y = ${k}`,
            options: [],
            hintTex: [
                `\\text{As } x \\to \\pm\\infty, \\text{ the fraction } \\frac{${a}}{x ${hSign}} \\to 0.`,
                `\\text{So } f(x) \\to 0 + ${k} = ${k}.`
            ],
            explain: `<strong>Step 1:</strong> As \\(x \\to \\pm\\infty\\), the term \\(\\dfrac{${a}}{x ${hSign}} \\to 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Therefore \\(f(x) \\to 0 ${kTex} = ${k}\\).<br><br>` +
                     `<strong>Step 3:</strong> The horizontal asymptote is \\(y = ${k}\\). Enter \\(${k}\\).`
        };
    },

    /**
     * 3. qLinearOverLinear - Easy (MC)
     * f(x) = (ax+b)/(cx+d). HA as x→∞ is y = a/c.
     */
    qLinearOverLinear() {
        // Pick a, c so a/c is not an integer — keeps distractors meaningful
        let a, c, ratio;
        let attempts = 0;
        do {
            a = MathUtils.nonZeroRandInt(-5, 5);
            c = MathUtils.nonZeroRandInt(-5, 5);
            ratio = a / c;
            attempts++;
        } while (Number.isInteger(ratio) && attempts < 30);

        const b = MathUtils.randInt(-6, 6);
        const d = MathUtils.nonZeroRandInt(-6, 6);

        // Simplify a/c for display
        function gcd(x, y) { x = Math.abs(x); y = Math.abs(y); while (y) { [x, y] = [y, x % y]; } return x; }
        const g = gcd(Math.abs(a), Math.abs(c));
        const rn = a / g;
        const rd = c / g;

        function fmtFrac(num, den) {
            const [sn, sd] = [num, den];
            const sign = (sn < 0) !== (sd < 0) ? '-' : '';
            const an = Math.abs(sn), ad = Math.abs(sd);
            if (ad === 1) return `${sign}${an}`;
            return `${sign}\\dfrac{${an}}{${ad}}`;
        }

        const correctTex = `y = ${fmtFrac(rn, rd)}`;

        // Distractors: b/d, c/a (inverted), wrong sign a/c
        const distractors = [];

        // b/d
        const g2 = gcd(Math.abs(b), Math.abs(d)) || 1;
        if (b !== 0) {
            distractors.push(`y = ${fmtFrac(b / g2, d / g2)}`);
        } else {
            distractors.push(`y = 0`);
        }

        // c/a (inverted)
        const g3 = gcd(Math.abs(c), Math.abs(a));
        distractors.push(`y = ${fmtFrac(c / g3, a / g3)}`);

        // negated a/c
        distractors.push(`y = ${fmtFrac(-rn, rd)}`);

        const optionTexts = [correctTex];
        for (const d2 of distractors) {
            if (!optionTexts.includes(d2)) optionTexts.push(d2);
            else optionTexts.push(`y = ${fmtFrac(rn + optionTexts.length, rd)}`);
        }
        while (optionTexts.length < 4) {
            const cand = `y = ${fmtFrac(rn + optionTexts.length, rd)}`;
            if (!optionTexts.includes(cand)) optionTexts.push(cand);
        }

        const options = optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const dSign = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
        const fTex = `f(x) = \\dfrac{${a}x ${bSign}}{${c}x ${dSign}}`;

        return {
            type: 'mc',
            rule: 'Linear over Linear HA',
            difficulty: 'easy',
            text: 'Identify the horizontal asymptote of the rational function below.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Divide numerator and denominator by } x.`,
                `f(x) = \\dfrac{${a} + ${b}/x}{${c} + ${d}/x} \\to \\dfrac{${a}}{${c}} \\text{ as } x \\to \\infty`
            ],
            explain: `<strong>Step 1:</strong> Divide every term by \\(x\\):<br>` +
                     `\\(f(x) = \\dfrac{${a} + \\frac{${b}}{x}}{${c} + \\frac{${d}}{x}}\\).<br><br>` +
                     `<strong>Step 2:</strong> As \\(x \\to \\infty\\), the \\(\\frac{1}{x}\\) terms vanish:<br>` +
                     `\\(f(x) \\to \\dfrac{${a}}{${c}}\\).<br><br>` +
                     `<strong>Answer:</strong> The horizontal asymptote is \\(${correctTex}\\).`
        };
    },

    /**
     * 4. qDomainRational - Easy (Free)
     * f(x) = a/(bx+c). Domain excludes x = -c/b. Give that excluded value.
     * Keep b dividing c cleanly (c is a multiple of b).
     */
    qDomainRational() {
        const a = MathUtils.nonZeroRandInt(-6, 6);
        const b = MathUtils.nonZeroRandInt(-4, 4);
        // Make c a multiple of b so -c/b is an integer
        const k = MathUtils.nonZeroRandInt(-5, 5);
        const c = k * b; // excluded x = -c/b = -k
        const excluded = -k;

        const cSign = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        const fTex = `f(x) = \\dfrac{${a}}{${b}x ${cSign}}`;

        return {
            type: 'free',
            rule: 'Domain of Rational Function',
            difficulty: 'easy',
            text: 'The domain of the function below excludes one value. Give that excluded x-value.',
            latex: `\\(${fTex}\\)`,
            answer: excluded,
            answerTex: `x \\neq ${excluded}`,
            options: [],
            hintTex: [
                `\\text{Set the denominator equal to zero: } ${b}x ${cSign} = 0`,
                `${b}x = ${-c} \\implies x = ${MathUtils.fractionTeX(-c, b)} = ${excluded}`
            ],
            explain: `<strong>Step 1:</strong> The function is undefined where the denominator equals zero.<br><br>` +
                     `<strong>Step 2:</strong> Solve \\(${b}x ${cSign} = 0\\):<br>` +
                     `\\(${b}x = ${-c}\\)<br>` +
                     `\\(x = ${excluded}\\).<br><br>` +
                     `<strong>Answer:</strong> The excluded value is \\(x = ${excluded}\\). Enter \\(${excluded}\\).`
        };
    },

    /**
     * 5. qRectangularHyperbola - Medium (MC)
     * f(x) = a/(x-h)+k. Identify both asymptotes as a pair from 4 option pairs.
     */
    qRectangularHyperbola() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const h = MathUtils.nonZeroRandInt(-6, 6);
        const k = MathUtils.nonZeroRandInt(-6, 6);

        const hSign = h < 0 ? `+ ${Math.abs(h)}` : `- ${h}`;
        let kTex = k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        const fTex = `f(x) = \\dfrac{${a}}{x ${hSign}}${kTex}`;

        const correctTex = `x = ${h},\\; y = ${k}`;

        // Distractors: swap h/k, negate h, negate k, random offsets
        const off1 = MathUtils.nonZeroRandInt(-3, 3);
        const off2 = MathUtils.nonZeroRandInt(-3, 3);

        const distractors = [
            `x = ${k},\\; y = ${h}`,
            `x = ${-h},\\; y = ${k}`,
            `x = ${h},\\; y = ${k + off1}`
        ];

        const optionTexts = [correctTex];
        for (const d of distractors) {
            if (!optionTexts.includes(d)) optionTexts.push(d);
            else optionTexts.push(`x = ${h + off2},\\; y = ${k}`);
        }
        while (optionTexts.length < 4) {
            const cand = `x = ${h},\\; y = ${k + optionTexts.length}`;
            if (!optionTexts.includes(cand)) optionTexts.push(cand);
        }

        const options = optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Rectangular Hyperbola',
            difficulty: 'medium',
            text: 'Identify both asymptotes of the rectangular hyperbola below.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{The form } \\frac{a}{x-h}+k \\text{ has VA at } x=h \\text{ and HA at } y=k.`,
                `\\text{VA: denominator} = 0 \\Rightarrow x = ${h}. \\quad \\text{HA: as } x\\to\\infty,\\, f(x)\\to ${k}.`
            ],
            explain: `<strong>Step 1:</strong> The function has the form \\(\\dfrac{a}{x-h}+k\\).<br><br>` +
                     `<strong>Step 2 — Vertical asymptote:</strong> Set denominator to zero: \\(x ${hSign} = 0 \\Rightarrow x = ${h}\\).<br><br>` +
                     `<strong>Step 3 — Horizontal asymptote:</strong> As \\(x \\to \\infty\\), the fraction \\(\\to 0\\), so \\(f(x) \\to ${k}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${h},\\; y = ${k}\\).`
        };
    },

    /**
     * 6. qXIntercept - Medium (Free)
     * f(x) = (ax+b)/(cx+d). x-intercept where ax+b=0, so x = -b/a.
     * Keep -b/a as a clean integer.
     */
    qXIntercept() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        // x-intercept = -b/a must be integer => b = -a * k
        const k = MathUtils.nonZeroRandInt(-5, 5);
        const b = -a * k; // x-intercept = k
        const xInt = k;

        const c = MathUtils.nonZeroRandInt(-4, 4);
        let d;
        // Avoid d making denominator zero at x = xInt
        do { d = MathUtils.nonZeroRandInt(-6, 6); } while (c * xInt + d === 0);

        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const dSign = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
        const fTex = `f(x) = \\dfrac{${a}x ${bSign}}{${c}x ${dSign}}`;

        return {
            type: 'free',
            rule: 'x-intercept of Rational',
            difficulty: 'medium',
            text: 'Find the x-intercept of the rational function below.',
            latex: `\\(${fTex}\\)`,
            answer: xInt,
            answerTex: `(${xInt},\\, 0)`,
            options: [],
            hintTex: [
                `\\text{The x-intercept occurs when } f(x) = 0, \\text{ i.e. the numerator} = 0.`,
                `${a}x ${bSign} = 0 \\implies x = ${MathUtils.fractionTeX(-b, a)} = ${xInt}`
            ],
            explain: `<strong>Step 1:</strong> Set the numerator equal to zero (the denominator must be non-zero).<br><br>` +
                     `<strong>Step 2:</strong> Solve \\(${a}x ${bSign} = 0\\):<br>` +
                     `\\(${a}x = ${-b}\\)<br>` +
                     `\\(x = ${xInt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Verify denominator \\(\\neq 0\\) at \\(x = ${xInt}\\): \\(${c}(${xInt}) ${dSign} = ${c * xInt + d} \\neq 0\\). ✓<br><br>` +
                     `<strong>Answer:</strong> x-intercept is \\((${xInt},\\,0)\\). Enter \\(${xInt}\\).`
        };
    },

    /**
     * 7. qYIntercept - Medium (Free)
     * f(x) = (ax+b)/(cx+d). y-intercept is f(0) = b/d. Keep b/d a clean integer.
     */
    qYIntercept() {
        const d = MathUtils.nonZeroRandInt(-4, 4);
        // y-intercept = b/d must be integer => b = d * k
        const k = MathUtils.nonZeroRandInt(-5, 5);
        const b = d * k; // y-intercept = k
        const yInt = k;

        const a = MathUtils.nonZeroRandInt(-4, 4);
        const c = MathUtils.nonZeroRandInt(-4, 4);

        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const dSign = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
        const fTex = `f(x) = \\dfrac{${a}x ${bSign}}{${c}x ${dSign}}`;

        return {
            type: 'free',
            rule: 'y-intercept of Rational',
            difficulty: 'medium',
            text: 'Find the y-intercept of the rational function below.',
            latex: `\\(${fTex}\\)`,
            answer: yInt,
            answerTex: `(0,\\, ${yInt})`,
            options: [],
            hintTex: [
                `\\text{The y-intercept is } f(0).`,
                `f(0) = \\dfrac{${a}(0) ${bSign}}{${c}(0) ${dSign}} = \\dfrac{${b}}{${d}} = ${yInt}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = 0\\) into \\(f(x)\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(f(0) = \\dfrac{${a}(0) ${bSign}}{${c}(0) ${dSign}} = \\dfrac{${b}}{${d}} = ${yInt}\\).<br><br>` +
                     `<strong>Answer:</strong> y-intercept is \\((0,\\,${yInt})\\). Enter \\(${yInt}\\).`
        };
    },

    /**
     * 8. qObliqueAsymptote - Hard (MC)
     * f(x) = (ax²+bx+c)/(x+d). OA is y = ax + (b - ad).
     * a = 1 or 2 for simplicity.
     */
    qObliqueAsymptote() {
        const a = MathUtils.pick([1, 2]);
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-8, 8);
        const d = MathUtils.nonZeroRandInt(-5, 5);

        // Polynomial long division: (ax²+bx+c) ÷ (x+d)
        // ax² + bx + c = (x+d)(ax + (b-ad)) + (c - d(b-ad))
        // OA: y = ax + (b - ad)
        const oaSlope = a;
        const oaIntercept = b - a * d;

        function fmtLine(slope, intercept) {
            let sTex;
            if (slope === 1) sTex = '';
            else if (slope === -1) sTex = '-';
            else sTex = String(slope);

            let iTex;
            if (intercept === 0) iTex = '';
            else if (intercept > 0) iTex = ` + ${intercept}`;
            else iTex = ` - ${Math.abs(intercept)}`;

            return `y = ${sTex}x${iTex}`;
        }

        const correctTex = fmtLine(oaSlope, oaIntercept);

        // Distractors
        const off = MathUtils.nonZeroRandInt(-3, 3);
        const distractors = [
            fmtLine(oaSlope, oaIntercept + off),                  // wrong intercept
            fmtLine(oaSlope, b),                                   // forgot to subtract ad
            fmtLine(oaSlope, oaIntercept - 2 * off)               // different wrong intercept
        ];

        const optionTexts = [correctTex];
        for (const dist of distractors) {
            if (!optionTexts.includes(dist)) optionTexts.push(dist);
            else optionTexts.push(fmtLine(oaSlope, oaIntercept + optionTexts.length * 2));
        }
        while (optionTexts.length < 4) {
            const cand = fmtLine(oaSlope, oaIntercept + optionTexts.length);
            if (!optionTexts.includes(cand)) optionTexts.push(cand);
        }

        const options = optionTexts.map((tex, i) => ({ value: i === 0 ? 1 : 0, tex }));
        const shuffled = MathUtils.shuffle(options);

        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const cSign = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        const dSign = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
        const fTex = `f(x) = \\dfrac{${a}x^2 ${bSign}x ${cSign}}{x ${dSign}}`;

        // Step-by-step long division working
        // (ax² + bx + c) ÷ (x + d)
        // First term: ax² ÷ x = ax  → multiply (x+d) by ax → ax² + adx
        // Subtract: (b - ad)x + c
        // Second term: (b-ad)x ÷ x = (b-ad)  → multiply (x+d) by (b-ad) → (b-ad)x + (b-ad)d
        // Remainder: c - (b-ad)d
        const adVal = a * d;
        const bMinusAd = b - adVal;
        const remainder = c - bMinusAd * d;

        return {
            type: 'mc',
            rule: 'Oblique Asymptote',
            difficulty: 'hard',
            text: 'Find the oblique (slant) asymptote of the rational function below.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{An oblique asymptote exists when deg(numerator) = deg(denominator) + 1.}`,
                `\\text{Perform polynomial long division: } (${a}x^2 ${bSign}x ${cSign}) \\div (x ${dSign}).`
            ],
            explain: `<strong>Step 1:</strong> The degree of the numerator (2) is one more than the denominator (1), so there is an oblique asymptote.<br><br>` +
                     `<strong>Step 2 — Long division:</strong><br>` +
                     `\\(${a}x^2 ${bSign}x ${cSign} \\div (x ${dSign})\\)<br>` +
                     `First term: \\(${a}x^2 \\div x = ${a}x\\). Multiply: \\(${a}x(x ${dSign}) = ${a}x^2 + ${adVal}x\\).<br>` +
                     `Subtract: \\((${bMinusAd})x ${cSign}\\).<br>` +
                     `Second term: \\(${bMinusAd}x \\div x = ${bMinusAd}\\). Remainder: \\(${remainder}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(f(x) = ${correctTex} + \\dfrac{${remainder}}{x ${dSign}}\\).<br><br>` +
                     `<strong>Answer:</strong> As \\(x \\to \\infty\\), the remainder term vanishes, so the oblique asymptote is \\(${correctTex}\\).`
        };
    },

    /**
     * 9. qHoleVsAsymptote - Hard (MC)
     * f(x) = (x²-a²)/(x-a) = (x+a) for x≠a → HOLE at x=a, not a VA.
     */
    qHoleVsAsymptote() {
        const a = MathUtils.nonZeroRandInt(-6, 6);
        const a2 = a * a;

        const aSign = a >= 0 ? `+ ${a2}` : `- ${a2}`;
        // numerator: x²-a² = (x-a)(x+a)
        const numTex = a2 > 0
            ? `x^2 - ${a2}`
            : `x^2 + ${Math.abs(a2)}`;
        const denSign = a >= 0 ? `- ${a}` : `+ ${Math.abs(a)}`;
        const fTex = `f(x) = \\dfrac{${numTex}}{x ${denSign}}`;

        const correctTex = `\\text{Hole at } x = ${a}`;

        const options = MathUtils.shuffle([
            { value: 1, tex: `\\text{Hole at } x = ${a}` },
            { value: 0, tex: `\\text{Vertical asymptote } x = ${a}` },
            { value: 0, tex: `\\text{Neither — } f \\text{ is defined at } x = ${a}` },
            { value: 0, tex: `\\text{Both a hole and a vertical asymptote at } x = ${a}` }
        ]);

        return {
            type: 'mc',
            rule: 'Hole vs Asymptote',
            difficulty: 'hard',
            text: 'Classify what occurs at the given x-value in the function below.',
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options,
            hintTex: [
                `\\text{Factor the numerator: } x^2 - ${a2} = (x-${a})(x+${a}).`,
                `\\text{The factor } (x - ${a}) \\text{ cancels — this creates a HOLE, not a VA.}`
            ],
            explain: `<strong>Step 1:</strong> Factor the numerator:<br>` +
                     `\\(${numTex} = (x ${denSign})(x + ${a})\\).<br><br>` +
                     `<strong>Step 2:</strong> Cancel the common factor \\((x ${denSign})\\):<br>` +
                     `\\(f(x) = x + ${a}, \\quad x \\neq ${a}\\).<br><br>` +
                     `<strong>Step 3:</strong> Because the factor cancelled, there is no vertical asymptote. Instead there is a <strong>hole</strong> (removable discontinuity) at \\(x = ${a}\\).<br><br>` +
                     `<strong>Answer:</strong> Hole at \\(x = ${a}\\).`
        };
    },

    /**
     * 10. qSignNearAsymptote - Hard (MC)
     * f(x) = 1/(x-h). Sign of f as x→h⁺ or x→h⁻.
     */
    qSignNearAsymptote() {
        const h = MathUtils.nonZeroRandInt(-6, 6);
        // Randomly pick approach direction
        const fromRight = MathUtils.pick([true, false]);

        // As x→h⁺: (x-h)→0⁺ → 1/(x-h)→+∞
        // As x→h⁻: (x-h)→0⁻ → 1/(x-h)→-∞
        const isPositive = fromRight;
        const dirTex = fromRight ? `${h}^+` : `${h}^-`;
        const dirWord = fromRight ? 'right' : 'left';
        const correctTex = isPositive ? `+\\infty` : `-\\infty`;

        const hSign = h >= 0 ? `- ${h}` : `+ ${Math.abs(h)}`;
        const fTex = `f(x) = \\dfrac{1}{x ${hSign}}`;

        const options = MathUtils.shuffle([
            { value: 1,  tex: `+\\infty` },
            { value: 0,  tex: `-\\infty` },
            { value: 0,  tex: `0` },
            { value: 0,  tex: `\\text{undefined (no limit)}` }
        ].map(opt => {
            // Flip which value is 1 based on correctTex
            if (isPositive) return opt; // +∞ is correct, value already set
            // fromLeft: -∞ is correct
            if (opt.tex === `-\\infty`) return { value: 1, tex: opt.tex };
            if (opt.tex === `+\\infty`) return { value: 0, tex: opt.tex };
            return opt;
        }));

        const signExplain = fromRight
            ? `As \\(x \\to ${h}^+\\), \\((x ${hSign})\\) is a small <strong>positive</strong> number, so \\(\\dfrac{1}{x ${hSign}} \\to +\\infty\\).`
            : `As \\(x \\to ${h}^-\\), \\((x ${hSign})\\) is a small <strong>negative</strong> number, so \\(\\dfrac{1}{x ${hSign}} \\to -\\infty\\).`;

        return {
            type: 'mc',
            rule: 'Sign Near Asymptote',
            difficulty: 'hard',
            text: `What does \\(f(x)\\) approach as \\(x \\to ${dirTex}\\) (from the ${dirWord})?`,
            latex: `\\(${fTex}\\)`,
            answer: 1,
            answerTex: `\\(f(x) \\to ${correctTex}\\)`,
            options,
            hintTex: [
                `\\text{Ask: what is the sign of } (x ${hSign}) \\text{ when } x \\text{ is just to the ${dirWord} of } ${h}?`,
                fromRight
                    ? `x > ${h} \\Rightarrow (x ${hSign}) > 0 \\Rightarrow \\frac{1}{\\text{small positive}} \\to +\\infty`
                    : `x < ${h} \\Rightarrow (x ${hSign}) < 0 \\Rightarrow \\frac{1}{\\text{small negative}} \\to -\\infty`
            ],
            explain: `<strong>Step 1:</strong> The vertical asymptote is at \\(x = ${h}\\).<br><br>` +
                     `<strong>Step 2:</strong> ${signExplain}<br><br>` +
                     `<strong>Answer:</strong> \\(f(x) \\to ${correctTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => ASYMPTOTES.qVerticalAsymptote(),    weight: 3, difficulty: 'easy'   },
            { fn: () => ASYMPTOTES.qHorizontalAsymptote(),  weight: 3, difficulty: 'easy'   },
            { fn: () => ASYMPTOTES.qLinearOverLinear(),      weight: 3, difficulty: 'easy'   },
            { fn: () => ASYMPTOTES.qDomainRational(),        weight: 3, difficulty: 'easy'   },
            { fn: () => ASYMPTOTES.qRectangularHyperbola(),  weight: 2, difficulty: 'medium' },
            { fn: () => ASYMPTOTES.qXIntercept(),            weight: 2, difficulty: 'medium' },
            { fn: () => ASYMPTOTES.qYIntercept(),            weight: 2, difficulty: 'medium' },
            { fn: () => ASYMPTOTES.qObliqueAsymptote(),      weight: 1, difficulty: 'hard'   },
            { fn: () => ASYMPTOTES.qHoleVsAsymptote(),       weight: 1, difficulty: 'hard'   },
            { fn: () => ASYMPTOTES.qSignNearAsymptote(),     weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (ASYMPTOTES.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (ASYMPTOTES.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (ASYMPTOTES.level === 'hard') {
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
        ASYMPTOTES.score = 0;
        ASYMPTOTES.total = 0;
        ASYMPTOTES.streak = 0;
        ASYMPTOTES.answered = false;
        ASYMPTOTES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="ASYMPTOTES.unload()">Asymptotes &amp; Rational Functions (2.7)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Asymptotes &amp; Rational Functions</h1>
                <p>IB Math AA 2.7 – Vertical, horizontal, and oblique asymptotes</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="ASYMPTOTES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="ASYMPTOTES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="ASYMPTOTES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="ASYMPTOTES.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="asym-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="asym-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="asym-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="asym-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="asym-question-card">
                <span class="rule-tag" id="asym-rule"></span>
                <span class="difficulty-tag" id="asym-difficulty"></span>
                <div class="question-text" id="asym-text"></div>
                <div class="question-prompt" id="asym-latex"></div>
                <div id="asym-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="asym-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="asym-feedback">
                <div class="feedback-title" id="asym-feedback-title"></div>
                <div class="feedback-explanation" id="asym-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="asym-hint-btn" onclick="ASYMPTOTES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="asym-next-btn" onclick="ASYMPTOTES.next()" style="display:none;">Next Question</button>
            </div>
        `;

        ASYMPTOTES.next();
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
        ASYMPTOTES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        ASYMPTOTES.score = 0;
        ASYMPTOTES.total = 0;
        ASYMPTOTES.streak = 0;
        ASYMPTOTES.updateStats();
        ASYMPTOTES.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        ASYMPTOTES.answered = false;
        ASYMPTOTES.hintIndex = 0;
        ASYMPTOTES.currentQ = ASYMPTOTES.pickQuestion();
        const q = ASYMPTOTES.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('asym-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('asym-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('asym-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('asym-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('asym-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="ASYMPTOTES.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="asym-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')ASYMPTOTES.checkFree()">
                    <button class="btn btn-primary" onclick="ASYMPTOTES.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('asym-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('asym-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('asym-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('asym-next-btn').style.display = 'none';
        document.getElementById('asym-hint-btn').style.display = '';
        document.getElementById('asym-hint-btn').disabled = false;

        // Render KaTeX
        ASYMPTOTES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = ASYMPTOTES.currentQ;
        if (!q || !q.hintTex || ASYMPTOTES.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('asym-hint-box');
        const hintContent = ASYMPTOTES.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[ASYMPTOTES.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        ASYMPTOTES.hintIndex++;

        if (ASYMPTOTES.hintIndex >= q.hintTex.length) {
            document.getElementById('asym-hint-btn').disabled = true;
        }

        ASYMPTOTES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (ASYMPTOTES.answered) return;
        ASYMPTOTES.answered = true;
        ASYMPTOTES.total++;

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
            ASYMPTOTES.score++;
            ASYMPTOTES.streak++;
        } else {
            btn.classList.add('incorrect');
            ASYMPTOTES.streak = 0;
        }

        ASYMPTOTES.showFeedback(isCorrect);
        ASYMPTOTES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (ASYMPTOTES.answered) return;

        const inp = document.getElementById('asym-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        ASYMPTOTES.answered = true;
        ASYMPTOTES.total++;
        inp.disabled = true;

        const q = ASYMPTOTES.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            ASYMPTOTES.score++;
            ASYMPTOTES.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            ASYMPTOTES.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        ASYMPTOTES.showFeedback(isCorrect);
        ASYMPTOTES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = ASYMPTOTES.currentQ;
        const fb = document.getElementById('asym-feedback');
        const title = document.getElementById('asym-feedback-title');
        const explanation = document.getElementById('asym-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (ASYMPTOTES.streak > 1) {
                title.textContent = `Correct! (${ASYMPTOTES.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('asym-next-btn').style.display = '';
        document.getElementById('asym-hint-btn').style.display = 'none';

        ASYMPTOTES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('asym-score');
        const totalEl = document.getElementById('asym-total');
        const streakEl = document.getElementById('asym-streak');
        const accEl = document.getElementById('asym-accuracy');

        if (scoreEl) scoreEl.textContent = ASYMPTOTES.score;
        if (totalEl) totalEl.textContent = ASYMPTOTES.total;
        if (streakEl) streakEl.textContent = ASYMPTOTES.streak;
        if (accEl) {
            accEl.textContent = ASYMPTOTES.total > 0
                ? Math.round((ASYMPTOTES.score / ASYMPTOTES.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['asymptotes'] = () => ASYMPTOTES.load();
