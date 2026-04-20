/*
 * more-integrals.js - IB Math AA 5.18–5.19: Further Integration
 * Trig integrals, 1/x, e^(ax), integration by substitution, arctan
 */

const MORE_INT = {
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
     * 1. qIntegrateSin - Easy (Free)
     * ∫a·sin(bx)dx = -a·cos(bx)/b + C
     * Ask for the coefficient of cos(bx) in the antiderivative. Answer = -a/b.
     */
    qIntegrateSin() {
        // Pick a, b such that a/b is a clean decimal (no long repeating fractions)
        // Use b ∈ {2,3,4,5} and a = multiples of b gives integer, or keep simple
        const pairs = [
            [2, 2], [3, 3], [4, 2], [6, 3], [4, 4], [6, 2], [8, 4],
            [3, 1], [5, 5], [2, 1], [4, 1], [6, 6], [1, 2], [1, 3], [1, 4]
        ];
        const [a, b] = MathUtils.pick(pairs);

        // Coefficient of cos(bx) is -a/b
        const answer = -(a / b);
        const [sn, sd] = MathUtils.simplifyFraction(-a, b);
        const answerTex = MathUtils.fractionTeX(-a, b);

        // Format the integrand
        const aTex = a === 1 ? '' : String(a);
        const bTex = b === 1 ? '' : String(b);

        return {
            type: 'free',
            rule: 'Integrate sin(ax)',
            difficulty: 'easy',
            text: `Find the coefficient of \\(\\cos(${bTex}x)\\) in the antiderivative of the expression below.`,
            latex: `\\(\\displaystyle\\int ${aTex}\\sin(${bTex}x)\\,dx\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\int \\sin(bx)\\,dx = -\\frac{\\cos(bx)}{b} + C`,
                `\\int ${aTex}\\sin(${bTex}x)\\,dx = -\\frac{${a}}{${b}}\\cos(${bTex}x) + C`
            ],
            explain: `<strong>Step 1:</strong> Use the rule \\(\\int \\sin(bx)\\,dx = -\\dfrac{\\cos(bx)}{b} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Pull the constant \\(${a}\\) out:<br>` +
                     `\\(\\int ${aTex}\\sin(${bTex}x)\\,dx = ${a} \\cdot \\left(-\\dfrac{\\cos(${bTex}x)}{${b}}\\right) + C\\).<br><br>` +
                     `<strong>Step 3:</strong> The coefficient of \\(\\cos(${bTex}x)\\) is \\(${answerTex}\\).`
        };
    },

    /**
     * 2. qIntegrateCos - Easy (Free)
     * ∫a·cos(bx)dx = a·sin(bx)/b + C
     * Ask for the coefficient of sin(bx). Answer = a/b.
     */
    qIntegrateCos() {
        const pairs = [
            [2, 2], [3, 3], [4, 2], [6, 3], [4, 4], [6, 2], [8, 4],
            [3, 1], [5, 5], [2, 1], [4, 1], [6, 6], [1, 2], [1, 3], [1, 4]
        ];
        const [a, b] = MathUtils.pick(pairs);

        const answer = a / b;
        const answerTex = MathUtils.fractionTeX(a, b);

        const aTex = a === 1 ? '' : String(a);
        const bTex = b === 1 ? '' : String(b);

        return {
            type: 'free',
            rule: 'Integrate cos(ax)',
            difficulty: 'easy',
            text: `Find the coefficient of \\(\\sin(${bTex}x)\\) in the antiderivative of the expression below.`,
            latex: `\\(\\displaystyle\\int ${aTex}\\cos(${bTex}x)\\,dx\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\int \\cos(bx)\\,dx = \\frac{\\sin(bx)}{b} + C`,
                `\\int ${aTex}\\cos(${bTex}x)\\,dx = \\frac{${a}}{${b}}\\sin(${bTex}x) + C`
            ],
            explain: `<strong>Step 1:</strong> Use the rule \\(\\int \\cos(bx)\\,dx = \\dfrac{\\sin(bx)}{b} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Pull the constant \\(${a}\\) out:<br>` +
                     `\\(\\int ${aTex}\\cos(${bTex}x)\\,dx = ${a} \\cdot \\dfrac{\\sin(${bTex}x)}{${b}} + C\\).<br><br>` +
                     `<strong>Step 3:</strong> The coefficient of \\(\\sin(${bTex}x)\\) is \\(${answerTex}\\).`
        };
    },

    /**
     * 3. qIntegrateReciprocal - Easy (Free)
     * ∫k/x dx = k·ln|x| + C
     * Ask for coefficient k in front of ln|x|. k ∈ {1,2,3,4,5}.
     */
    qIntegrateReciprocal() {
        const k = MathUtils.randInt(1, 5);
        const kTex = k === 1 ? '' : String(k);

        return {
            type: 'free',
            rule: 'Integrate 1/x',
            difficulty: 'easy',
            text: `Find the coefficient of \\(\\ln|x|\\) in the antiderivative of the expression below.`,
            latex: `\\(\\displaystyle\\int \\frac{${k}}{x}\\,dx\\)`,
            answer: k,
            answerTex: String(k),
            options: [],
            hintTex: [
                `\\int \\frac{1}{x}\\,dx = \\ln|x| + C`,
                `\\int \\frac{${k}}{x}\\,dx = ${k}\\ln|x| + C`
            ],
            explain: `<strong>Step 1:</strong> Use the rule \\(\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Pull the constant \\(${k}\\) out:<br>` +
                     `\\(\\int \\dfrac{${k}}{x}\\,dx = ${k} \\cdot \\ln|x| + C\\).<br><br>` +
                     `<strong>Step 3:</strong> The coefficient of \\(\\ln|x|\\) is \\(${k}\\).`
        };
    },

    /**
     * 4. qIntegrateExp - Easy (Free)
     * ∫a·e^(bx)dx = (a/b)·e^(bx) + C
     * Ask for coefficient of e^(bx). Answer = a/b (integer since a = multiple of b).
     */
    qIntegrateExp() {
        // b ∈ {2,3,4}, a = multiple of b so answer is integer
        const bValues = [2, 3, 4];
        const b = MathUtils.pick(bValues);
        const mult = MathUtils.randInt(1, 4);
        const a = b * mult;
        const answer = mult; // a/b = mult

        const bTex = b === 1 ? '' : String(b);

        return {
            type: 'free',
            rule: 'Integrate e^(ax)',
            difficulty: 'easy',
            text: `Find the coefficient of \\(e^{${bTex}x}\\) in the antiderivative of the expression below.`,
            latex: `\\(\\displaystyle\\int ${a}e^{${bTex}x}\\,dx\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\int e^{bx}\\,dx = \\frac{e^{bx}}{b} + C`,
                `\\int ${a}e^{${bTex}x}\\,dx = \\frac{${a}}{${b}}e^{${bTex}x} + C = ${answer}e^{${bTex}x} + C`
            ],
            explain: `<strong>Step 1:</strong> Use the rule \\(\\int e^{bx}\\,dx = \\dfrac{e^{bx}}{b} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Pull the constant \\(${a}\\) out:<br>` +
                     `\\(\\int ${a}e^{${bTex}x}\\,dx = ${a} \\cdot \\dfrac{e^{${bTex}x}}{${b}} + C\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(\\dfrac{${a}}{${b}} = ${answer}\\), so the coefficient of \\(e^{${bTex}x}\\) is \\(${answer}\\).`
        };
    },

    /**
     * 5. qDefiniteSin - Medium (Free)
     * Definite integral of sin(x) over chosen bounds.
     * Variants: ∫₀^(π/2) sin(x)dx = 1 or ∫₀^π sin(x)dx = 2
     */
    qDefiniteSin() {
        const variant = MathUtils.randInt(0, 1);

        if (variant === 0) {
            // ∫₀^(π/2) sin(x)dx = [-cos(x)]₀^(π/2) = -cos(π/2) + cos(0) = 0 + 1 = 1
            return {
                type: 'free',
                rule: 'Definite sin integral',
                difficulty: 'medium',
                text: 'Evaluate the definite integral below. Give an exact integer answer.',
                latex: `\\(\\displaystyle\\int_0^{\\pi/2} \\sin(x)\\,dx\\)`,
                answer: 1,
                answerTex: '1',
                options: [],
                hintTex: [
                    `\\int \\sin(x)\\,dx = -\\cos(x) + C`,
                    `\\Big[-\\cos(x)\\Big]_0^{\\pi/2} = -\\cos\\!\\left(\\frac{\\pi}{2}\\right) + \\cos(0) = 0 + 1`
                ],
                explain: `<strong>Step 1:</strong> The antiderivative of \\(\\sin(x)\\) is \\(-\\cos(x)\\).<br><br>` +
                         `<strong>Step 2:</strong> Apply the limits:<br>` +
                         `\\(\\Big[-\\cos(x)\\Big]_0^{\\pi/2} = -\\cos\\!\\left(\\dfrac{\\pi}{2}\\right) - \\big(-\\cos(0)\\big)\\).<br><br>` +
                         `<strong>Step 3:</strong> Evaluate: \\(-0 + 1 = 1\\).`
            };
        } else {
            // ∫₀^π sin(x)dx = [-cos(x)]₀^π = -cos(π) + cos(0) = 1 + 1 = 2
            return {
                type: 'free',
                rule: 'Definite sin integral',
                difficulty: 'medium',
                text: 'Evaluate the definite integral below. Give an exact integer answer.',
                latex: `\\(\\displaystyle\\int_0^{\\pi} \\sin(x)\\,dx\\)`,
                answer: 2,
                answerTex: '2',
                options: [],
                hintTex: [
                    `\\int \\sin(x)\\,dx = -\\cos(x) + C`,
                    `\\Big[-\\cos(x)\\Big]_0^{\\pi} = -\\cos(\\pi) + \\cos(0) = 1 + 1`
                ],
                explain: `<strong>Step 1:</strong> The antiderivative of \\(\\sin(x)\\) is \\(-\\cos(x)\\).<br><br>` +
                         `<strong>Step 2:</strong> Apply the limits:<br>` +
                         `\\(\\Big[-\\cos(x)\\Big]_0^{\\pi} = -\\cos(\\pi) - \\big(-\\cos(0)\\big)\\).<br><br>` +
                         `<strong>Step 3:</strong> Evaluate: \\(-(-1) + 1 = 1 + 1 = 2\\).`
            };
        }
    },

    /**
     * 6. qIntegrateBySubstitution - Medium (MC)
     * ∫2x(x²+1)^3 dx. Let u = x²+1, du = 2x dx → ∫u³du = u⁴/4 = (x²+1)⁴/4 + C
     */
    qIntegrateBySubstitution() {
        // Fixed question for clarity of substitution teaching
        const correct = `\\frac{(x^2+1)^4}{4} + C`;

        const options = [
            { value: 1, tex: correct },
            { value: 0, tex: `\\frac{(x^2+1)^4}{8x} + C` },
            { value: 0, tex: `(x^2+1)^4 + C` },
            { value: 0, tex: `\\frac{(x^2+1)^3}{3} + C` }
        ];

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Integration by Substitution',
            difficulty: 'medium',
            text: 'Use the substitution \\(u = x^2 + 1\\) to evaluate the integral below.',
            latex: `\\(\\displaystyle\\int 2x(x^2+1)^3\\,dx\\)`,
            answer: 1,
            answerTex: correct,
            options: shuffled,
            hintTex: [
                `u = x^2+1 \\implies du = 2x\\,dx`,
                `\\int u^3\\,du = \\frac{u^4}{4} + C = \\frac{(x^2+1)^4}{4} + C`
            ],
            explain: `<strong>Step 1:</strong> Let \\(u = x^2 + 1\\), so \\(\\dfrac{du}{dx} = 2x\\), meaning \\(du = 2x\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute into the integral:<br>` +
                     `\\(\\int 2x(x^2+1)^3\\,dx = \\int u^3\\,du\\).<br><br>` +
                     `<strong>Step 3:</strong> Integrate: \\(\\int u^3\\,du = \\dfrac{u^4}{4} + C\\).<br><br>` +
                     `<strong>Step 4:</strong> Back-substitute \\(u = x^2 + 1\\): answer is \\(\\dfrac{(x^2+1)^4}{4} + C\\).`
        };
    },

    /**
     * 7. qIntegrate1Over1PlusX2 - Easy (MC)
     * ∫1/(1+x²)dx = arctan(x) + C
     */
    qIntegrate1Over1PlusX2() {
        const correct = `\\arctan(x) + C`;

        const options = [
            { value: 1, tex: correct },
            { value: 0, tex: `\\ln(1+x^2) + C` },
            { value: 0, tex: `\\frac{x}{1+x^2} + C` },
            { value: 0, tex: `\\arcsin(x) + C` }
        ];

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Integral of 1/(1+x²)',
            difficulty: 'easy',
            text: 'Choose the correct antiderivative of the expression below.',
            latex: `\\(\\displaystyle\\int \\frac{1}{1+x^2}\\,dx\\)`,
            answer: 1,
            answerTex: correct,
            options: shuffled,
            hintTex: [
                `\\text{This is a standard result: recall the derivative of } \\arctan(x)`,
                `\\frac{d}{dx}\\arctan(x) = \\frac{1}{1+x^2}`
            ],
            explain: `<strong>Key fact:</strong> The derivative of \\(\\arctan(x)\\) is \\(\\dfrac{1}{1+x^2}\\).<br><br>` +
                     `<strong>Therefore:</strong> \\(\\displaystyle\\int \\dfrac{1}{1+x^2}\\,dx = \\arctan(x) + C\\).<br><br>` +
                     `<strong>Why not the others?</strong><br>` +
                     `&bull; \\(\\ln(1+x^2)\\) would require a factor of \\(2x\\) in the numerator (chain rule).<br>` +
                     `&bull; \\(\\dfrac{x}{1+x^2}\\) differentiates to \\(\\dfrac{1-x^2}{(1+x^2)^2}\\) (not a match).<br>` +
                     `&bull; \\(\\arcsin(x)\\) integrates \\(\\dfrac{1}{\\sqrt{1-x^2}}\\), a different form.`
        };
    },

    /**
     * 8. qIntegrateExpDefinite - Medium (Free)
     * ∫₀¹ e^(ax)dx = (e^a - 1)/a. Answer to 3dp. a ∈ {1, 2}.
     */
    qIntegrateExpDefinite() {
        const a = MathUtils.pick([1, 2]);
        const answer = (Math.pow(Math.E, a) - 1) / a;
        const answerRounded = Math.round(answer * 1000) / 1000;
        const aTex = a === 1 ? '' : String(a);

        // For display: a=1 → e-1≈1.718, a=2 → (e²-1)/2≈3.195
        const exactTex = a === 1
            ? `e - 1`
            : `\\frac{e^2 - 1}{2}`;

        return {
            type: 'free',
            rule: 'Definite e^(ax) integral',
            difficulty: 'medium',
            text: `Evaluate the definite integral below. Give your answer to 3 decimal places.`,
            latex: `\\(\\displaystyle\\int_0^1 e^{${aTex}x}\\,dx\\)`,
            answer: answer,
            answerTex: answerRounded.toFixed(3),
            options: [],
            hintTex: [
                `\\int e^{${aTex}x}\\,dx = \\frac{e^{${aTex}x}}{${a}} + C`,
                `\\left[\\frac{e^{${aTex}x}}{${a}}\\right]_0^1 = \\frac{e^{${a}}}{${a}} - \\frac{1}{${a}} = ${exactTex}`
            ],
            explain: `<strong>Step 1:</strong> The antiderivative of \\(e^{${aTex}x}\\) is \\(\\dfrac{e^{${aTex}x}}{${a}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the limits:<br>` +
                     `\\(\\left[\\dfrac{e^{${aTex}x}}{${a}}\\right]_0^1 = \\dfrac{e^{${a}}}{${a}} - \\dfrac{e^0}{${a}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since \\(e^0 = 1\\):<br>` +
                     `\\(= \\dfrac{e^{${a}} - 1}{${a}} = ${exactTex} \\approx ${answerRounded.toFixed(3)}\\).`
        };
    },

    /**
     * 9. qSubstitutionTriangle - Medium (Free)
     * ∫₀¹ 2x/(x²+1) dx = [ln(x²+1)]₀¹ = ln(2) ≈ 0.693. Answer to 3dp.
     */
    qSubstitutionTriangle() {
        const answer = Math.log(2); // ≈ 0.693
        const answerRounded = Math.round(answer * 1000) / 1000;

        return {
            type: 'free',
            rule: 'Substitution (ln result)',
            difficulty: 'medium',
            text: `Use the substitution \\(u = x^2 + 1\\) to evaluate the definite integral below. Give your answer to 3 decimal places.`,
            latex: `\\(\\displaystyle\\int_0^1 \\frac{2x}{x^2+1}\\,dx\\)`,
            answer: answer,
            answerTex: answerRounded.toFixed(3),
            options: [],
            hintTex: [
                `u = x^2+1 \\implies du = 2x\\,dx; \\quad x=0 \\to u=1,\\; x=1 \\to u=2`,
                `\\int_1^2 \\frac{1}{u}\\,du = \\Big[\\ln u\\Big]_1^2 = \\ln 2 - \\ln 1`
            ],
            explain: `<strong>Step 1:</strong> Let \\(u = x^2 + 1\\), so \\(du = 2x\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Change the limits:<br>` +
                     `When \\(x = 0\\): \\(u = 1\\). When \\(x = 1\\): \\(u = 2\\).<br><br>` +
                     `<strong>Step 3:</strong> The integral becomes:<br>` +
                     `\\(\\displaystyle\\int_1^2 \\dfrac{1}{u}\\,du = \\Big[\\ln u\\Big]_1^2 = \\ln 2 - \\ln 1\\).<br><br>` +
                     `<strong>Step 4:</strong> Since \\(\\ln 1 = 0\\): answer is \\(\\ln 2 \\approx ${answerRounded.toFixed(3)}\\).`
        };
    },

    /**
     * 10. qIntegrateTan - Hard (Free)
     * ∫tan(x)dx = -ln|cos(x)| + C
     * Evaluate ∫₀^(π/4) tan(x)dx = -ln(cos(π/4)) = -ln(√2/2) = ln(√2) ≈ 0.347
     */
    qIntegrateTan() {
        // -ln(cos(π/4)) + ln(cos(0)) = -ln(√2/2) + ln(1) = -ln(√2/2) = ln(2/√2) = ln(√2)
        const answer = Math.log(Math.sqrt(2)); // ≈ 0.34657
        const answerRounded = Math.round(answer * 1000) / 1000;

        return {
            type: 'free',
            rule: 'Integrate tan(x)',
            difficulty: 'hard',
            text: `Evaluate the definite integral below. Give your answer to 3 decimal places.<br><em>Hint: \\(\\int \\tan(x)\\,dx = -\\ln|\\cos(x)| + C\\)</em>`,
            latex: `\\(\\displaystyle\\int_0^{\\pi/4} \\tan(x)\\,dx\\)`,
            answer: answer,
            answerTex: answerRounded.toFixed(3),
            options: [],
            hintTex: [
                `\\int \\tan(x)\\,dx = -\\ln|\\cos(x)| + C`,
                `\\Big[-\\ln|\\cos(x)|\\Big]_0^{\\pi/4} = -\\ln\\!\\left(\\cos\\frac{\\pi}{4}\\right) + \\ln(\\cos 0)`
            ],
            explain: `<strong>Step 1:</strong> Use the standard result \\(\\int \\tan(x)\\,dx = -\\ln|\\cos(x)| + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the limits:<br>` +
                     `\\(\\Big[-\\ln|\\cos(x)|\\Big]_0^{\\pi/4} = -\\ln\\!\\left(\\cos\\dfrac{\\pi}{4}\\right) + \\ln(\\cos 0)\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}\\) and \\(\\cos 0 = 1\\).<br>` +
                     `\\(= -\\ln\\!\\left(\\dfrac{\\sqrt{2}}{2}\\right) + \\ln(1) = -\\ln\\!\\left(\\dfrac{\\sqrt{2}}{2}\\right)\\).<br><br>` +
                     `<strong>Step 4:</strong> Simplify: \\(-\\ln\\!\\left(\\dfrac{\\sqrt{2}}{2}\\right) = \\ln\\!\\left(\\dfrac{2}{\\sqrt{2}}\\right) = \\ln(\\sqrt{2}) \\approx ${answerRounded.toFixed(3)}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => MORE_INT.qIntegrateSin(),           weight: 3, difficulty: 'easy'   }, // 0
            { fn: () => MORE_INT.qIntegrateCos(),           weight: 3, difficulty: 'easy'   }, // 1
            { fn: () => MORE_INT.qIntegrateReciprocal(),    weight: 3, difficulty: 'easy'   }, // 2
            { fn: () => MORE_INT.qIntegrateExp(),           weight: 3, difficulty: 'easy'   }, // 3
            { fn: () => MORE_INT.qDefiniteSin(),            weight: 2, difficulty: 'medium' }, // 4
            { fn: () => MORE_INT.qIntegrateBySubstitution(), weight: 2, difficulty: 'medium' }, // 5
            { fn: () => MORE_INT.qIntegrate1Over1PlusX2(),  weight: 3, difficulty: 'easy'   }, // 6
            { fn: () => MORE_INT.qIntegrateExpDefinite(),   weight: 2, difficulty: 'medium' }, // 7
            { fn: () => MORE_INT.qSubstitutionTriangle(),   weight: 2, difficulty: 'medium' }, // 8
            { fn: () => MORE_INT.qIntegrateTan(),           weight: 1, difficulty: 'hard'   }  // 9
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (MORE_INT.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 3, 6].includes(i));
        } else if (MORE_INT.level === 'medium') {
            filtered = pool.filter((_, i) => [4, 5, 7, 8].includes(i));
        } else if (MORE_INT.level === 'hard') {
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
        MORE_INT.score = 0;
        MORE_INT.total = 0;
        MORE_INT.streak = 0;
        MORE_INT.answered = false;
        MORE_INT.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="MORE_INT.unload()">More Integrals (5.18–5.19)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Further Integration</h1>
                <p>IB Math AA 5.18–5.19 — Trig integrals, substitution and inverse trig</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="MORE_INT.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="MORE_INT.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="MORE_INT.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="MORE_INT.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="mint-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="mint-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="mint-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="mint-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="mint-question-card">
                <span class="rule-tag" id="mint-rule"></span>
                <span class="difficulty-tag" id="mint-difficulty"></span>
                <div class="question-text" id="mint-text"></div>
                <div class="question-prompt" id="mint-latex"></div>
                <div id="mint-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="mint-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="mint-feedback">
                <div class="feedback-title" id="mint-feedback-title"></div>
                <div class="feedback-explanation" id="mint-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="mint-hint-btn" onclick="MORE_INT.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="mint-next-btn" onclick="MORE_INT.next()" style="display:none;">Next Question</button>
            </div>
        `;

        MORE_INT.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('calculus');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        MORE_INT.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        MORE_INT.score = 0;
        MORE_INT.total = 0;
        MORE_INT.streak = 0;
        MORE_INT.updateStats();
        MORE_INT.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        MORE_INT.answered = false;
        MORE_INT.hintIndex = 0;
        MORE_INT.currentQ = MORE_INT.pickQuestion();
        const q = MORE_INT.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('mint-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('mint-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('mint-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('mint-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('mint-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="MORE_INT.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="mint-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')MORE_INT.checkFree()">
                    <button class="btn btn-primary" onclick="MORE_INT.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('mint-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('mint-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('mint-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('mint-next-btn').style.display = 'none';
        document.getElementById('mint-hint-btn').style.display = '';
        document.getElementById('mint-hint-btn').disabled = false;

        // Render KaTeX
        MORE_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = MORE_INT.currentQ;
        if (!q || !q.hintTex || MORE_INT.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('mint-hint-box');
        const hintContent = MORE_INT.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[MORE_INT.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        MORE_INT.hintIndex++;

        if (MORE_INT.hintIndex >= q.hintTex.length) {
            document.getElementById('mint-hint-btn').disabled = true;
        }

        MORE_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (MORE_INT.answered) return;
        MORE_INT.answered = true;
        MORE_INT.total++;

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
            MORE_INT.score++;
            MORE_INT.streak++;
        } else {
            btn.classList.add('incorrect');
            MORE_INT.streak = 0;
        }

        MORE_INT.showFeedback(isCorrect);
        MORE_INT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (MORE_INT.answered) return;

        const inp = document.getElementById('mint-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        MORE_INT.answered = true;
        MORE_INT.total++;
        inp.disabled = true;

        const q = MORE_INT.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            MORE_INT.score++;
            MORE_INT.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            MORE_INT.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        MORE_INT.showFeedback(isCorrect);
        MORE_INT.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = MORE_INT.currentQ;
        const fb = document.getElementById('mint-feedback');
        const title = document.getElementById('mint-feedback-title');
        const explanation = document.getElementById('mint-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (MORE_INT.streak > 1) {
                title.textContent = `Correct! (${MORE_INT.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('mint-next-btn').style.display = '';
        document.getElementById('mint-hint-btn').style.display = 'none';

        MORE_INT.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('mint-score');
        const totalEl = document.getElementById('mint-total');
        const streakEl = document.getElementById('mint-streak');
        const accEl = document.getElementById('mint-accuracy');

        if (scoreEl) scoreEl.textContent = MORE_INT.score;
        if (totalEl) totalEl.textContent = MORE_INT.total;
        if (streakEl) streakEl.textContent = MORE_INT.streak;
        if (accEl) {
            accEl.textContent = MORE_INT.total > 0
                ? Math.round((MORE_INT.score / MORE_INT.total) * 100) + '%'
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
    ACTIVITY_INITS['more-integrals'] = () => MORE_INT.load();
}
