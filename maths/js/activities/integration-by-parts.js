/*
 * integration-by-parts.js - IB Math AA 5.20: Integration by Parts
 * Formula: ∫u dv = uv − ∫v du
 * LIATE rule, polynomial × exponential/trig, ln(x), arctan(x)
 */

const INT_PARTS = {
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
     * 1. qChooseU - Easy (MC)
     * For ∫x·e^x dx, which should be u by LIATE?
     */
    qChooseU() {
        const options = MathUtils.shuffle([
            { value: 1, tex: 'x' },
            { value: 0, tex: 'e^x' },
            { value: 0, tex: 'xe^x' },
            { value: 0, tex: '\\dfrac{1}{x}' }
        ]);

        return {
            type: 'mc',
            rule: 'LIATE — Choose u',
            difficulty: 'easy',
            text: 'When applying Integration by Parts to \\(\\displaystyle\\int x e^x\\,dx\\), which expression should be chosen as \\(u\\)?',
            latex: '\\text{Use the LIATE rule: Logarithm, Inverse trig, Algebraic, Trig, Exponential.}',
            answer: 1,
            answerTex: 'u = x',
            options: options,
            hintTex: [
                '\\text{LIATE: choose } u \\text{ as the type that appears earliest in the list}',
                '\\text{} x \\text{ is Algebraic; } e^x \\text{ is Exponential. A comes before E, so } u = x'
            ],
            explain: '<strong>LIATE Rule:</strong> Choose \\(u\\) as the factor whose type appears <em>earliest</em> in the list:<br>' +
                     'Logarithm → Inverse trig → <u>Algebraic</u> → Trig → Exponential.<br><br>' +
                     '\\(x\\) is Algebraic and \\(e^x\\) is Exponential, so <strong>\\(u = x\\)</strong> and \\(dv = e^x\\,dx\\).<br><br>' +
                     'This works because differentiating \\(x\\) reduces the polynomial degree, making the resulting integral simpler.'
        };
    },

    /**
     * 2. qIBPBasic - Medium (MC)
     * Antiderivative of x·e^x by IBP.
     */
    qIBPBasic() {
        const options = MathUtils.shuffle([
            { value: 1, tex: 'xe^x - e^x + C' },
            { value: 0, tex: 'xe^x + C' },
            { value: 0, tex: 'xe^x + e^x + C' },
            { value: 0, tex: '\\dfrac{x^2 e^x}{2} + C' }
        ]);

        return {
            type: 'mc',
            rule: 'IBP — Basic Antiderivative',
            difficulty: 'medium',
            text: 'Which of the following is the antiderivative of \\(xe^x\\)?',
            latex: '\\(\\displaystyle\\int x e^x\\,dx = ?\\)',
            answer: 1,
            answerTex: 'xe^x - e^x + C',
            options: options,
            hintTex: [
                'u = x,\\quad dv = e^x\\,dx \\implies du = dx,\\quad v = e^x',
                '\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C'
            ],
            explain: '<strong>Step 1:</strong> Choose \\(u = x\\) and \\(dv = e^x\\,dx\\) (LIATE: A before E).<br><br>' +
                     '<strong>Step 2:</strong> Differentiate and integrate: \\(du = dx\\), \\(v = e^x\\).<br><br>' +
                     '<strong>Step 3:</strong> Apply \\(\\int u\\,dv = uv - \\int v\\,du\\):<br>' +
                     '\\(\\int xe^x\\,dx = xe^x - \\int e^x\\,dx = xe^x - e^x + C\\).<br><br>' +
                     '<strong>Check:</strong> Differentiate \\(xe^x - e^x\\): \\(e^x + xe^x - e^x = xe^x\\). ✓'
        };
    },

    /**
     * 3. qIBPEvaluate - Medium (Free)
     * Evaluate ∫₀ᵃ xe^x dx = (a−1)eᵃ + 1 for a ∈ {1, 2, 3}.
     */
    qIBPEvaluate() {
        const a = MathUtils.pick([1, 2, 3]);
        const answer = (a - 1) * Math.exp(a) + 1;
        const answerRounded = Math.round(answer * 100) / 100;

        // Build readable display of working
        const uvTerm = `${a}e^{${a}} - e^{${a}}`;
        const zeroTerm = `0 \\cdot e^0 - e^0`;

        return {
            type: 'free',
            rule: 'IBP — Definite Integral',
            difficulty: 'medium',
            text: `Using the result \\(\\int xe^x\\,dx = xe^x - e^x + C\\), evaluate the definite integral below. Give your answer to 2 d.p.`,
            latex: `\\(\\displaystyle\\int_0^{${a}} x e^x\\,dx\\)`,
            answer: answerRounded,
            answerTex: `${answerRounded}`,
            options: [],
            hintTex: [
                `\\Big[xe^x - e^x\\Big]_0^{${a}}`,
                `= \\left(${a}e^{${a}} - e^{${a}}\\right) - \\left(0 \\cdot e^0 - e^0\\right) = (${a}-1)e^{${a}} + 1`
            ],
            explain: `<strong>Step 1:</strong> Antiderivative is \\(F(x) = xe^x - e^x\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate at bounds:<br>` +
                     `\\(F(${a}) = ${a}e^{${a}} - e^{${a}} = (${a}-1)e^{${a}}\\)<br>` +
                     `\\(F(0) = 0 \\cdot 1 - 1 = -1\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(F(${a}) - F(0) = (${a}-1)e^{${a}} + 1 \\approx ${answerRounded}\\).`
        };
    },

    /**
     * 4. qIBPTrig - Medium (MC)
     * Antiderivative of x·sin(x).
     */
    qIBPTrig() {
        const options = MathUtils.shuffle([
            { value: 1, tex: '-x\\cos x + \\sin x + C' },
            { value: 0, tex: 'x\\cos x + \\sin x + C' },
            { value: 0, tex: '-x\\cos x - \\sin x + C' },
            { value: 0, tex: 'x\\sin x + \\cos x + C' }
        ]);

        return {
            type: 'mc',
            rule: 'IBP — Polynomial × Trig',
            difficulty: 'medium',
            text: 'Find the antiderivative of \\(x\\sin x\\).',
            latex: '\\(\\displaystyle\\int x\\sin x\\,dx = ?\\)',
            answer: 1,
            answerTex: '-x\\cos x + \\sin x + C',
            options: options,
            hintTex: [
                'u = x,\\quad dv = \\sin x\\,dx \\implies du = dx,\\quad v = -\\cos x',
                '\\int x\\sin x\\,dx = -x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C'
            ],
            explain: '<strong>Step 1:</strong> LIATE: \\(u = x\\) (Algebraic), \\(dv = \\sin x\\,dx\\) (Trig).<br><br>' +
                     '<strong>Step 2:</strong> \\(du = dx\\), \\(v = -\\cos x\\).<br><br>' +
                     '<strong>Step 3:</strong> Apply IBP:<br>' +
                     '\\(\\int x\\sin x\\,dx = x(-\\cos x) - \\int(-\\cos x)\\,dx\\)<br>' +
                     '\\(= -x\\cos x + \\int \\cos x\\,dx = -x\\cos x + \\sin x + C\\).<br><br>' +
                     '<strong>Check:</strong> Differentiate \\(-x\\cos x + \\sin x\\): \\(-\\cos x + x\\sin x + \\cos x = x\\sin x\\). ✓'
        };
    },

    /**
     * 5. qIBPLn - Medium (MC)
     * Antiderivative of ln(x).
     */
    qIBPLn() {
        const options = MathUtils.shuffle([
            { value: 1, tex: 'x\\ln x - x + C' },
            { value: 0, tex: 'x\\ln x + C' },
            { value: 0, tex: '\\dfrac{1}{x} + C' },
            { value: 0, tex: '\\dfrac{\\ln x}{x} + C' }
        ]);

        return {
            type: 'mc',
            rule: 'IBP — ∫ln(x)dx',
            difficulty: 'medium',
            text: 'Which of the following equals \\(\\displaystyle\\int \\ln x\\,dx\\)?',
            latex: '\\text{Hint: treat } \\ln x \\text{ as } u \\text{ and } dv = dx.',
            answer: 1,
            answerTex: 'x\\ln x - x + C',
            options: options,
            hintTex: [
                'u = \\ln x,\\quad dv = dx \\implies du = \\tfrac{1}{x}dx,\\quad v = x',
                '\\int \\ln x\\,dx = x\\ln x - \\int x \\cdot \\tfrac{1}{x}\\,dx = x\\ln x - \\int 1\\,dx = x\\ln x - x + C'
            ],
            explain: '<strong>Step 1:</strong> Write \\(\\int \\ln x\\,dx = \\int \\ln x \\cdot 1\\,dx\\).<br><br>' +
                     '<strong>Step 2:</strong> LIATE: \\(u = \\ln x\\) (Logarithm), \\(dv = dx\\).<br>' +
                     'So \\(du = \\frac{1}{x}dx\\) and \\(v = x\\).<br><br>' +
                     '<strong>Step 3:</strong> Apply IBP:<br>' +
                     '\\(\\int \\ln x\\,dx = x\\ln x - \\int x \\cdot \\frac{1}{x}\\,dx = x\\ln x - \\int 1\\,dx = x\\ln x - x + C\\).<br><br>' +
                     '<strong>Check:</strong> Differentiate \\(x\\ln x - x\\): \\(\\ln x + 1 - 1 = \\ln x\\). ✓'
        };
    },

    /**
     * 6. qUDVChoice - Easy (MC)
     * For ∫x²·cos(x) dx, which u simplifies the problem?
     */
    qUDVChoice() {
        const options = MathUtils.shuffle([
            { value: 1, tex: 'u = x^2' },
            { value: 0, tex: 'u = \\cos x' },
            { value: 0, tex: 'u = x\\cos x' },
            { value: 0, tex: 'u = 1' }
        ]);

        return {
            type: 'mc',
            rule: 'LIATE — Choosing u',
            difficulty: 'easy',
            text: 'For the integral \\(\\displaystyle\\int x^2 \\cos x\\,dx\\), which choice of \\(u\\) leads to the simplest integration by parts?',
            latex: '\\text{Consider which factor reduces in complexity when differentiated.}',
            answer: 1,
            answerTex: 'u = x^2',
            options: options,
            hintTex: [
                '\\text{LIATE: Algebraic (} x^2 \\text{) comes before Trig (} \\cos x \\text{)}',
                '\\text{Differentiating } x^2 \\text{ repeatedly reduces the degree: } x^2 \\to 2x \\to 2 \\to 0'
            ],
            explain: '<strong>LIATE Rule:</strong> Algebraic (A) appears before Trig (T) in the list, so choose \\(u = x^2\\).<br><br>' +
                     '<strong>Why it works:</strong> Differentiating \\(x^2\\) reduces the polynomial degree:<br>' +
                     '\\(x^2 \\xrightarrow{d/dx} 2x \\xrightarrow{d/dx} 2 \\xrightarrow{d/dx} 0\\).<br><br>' +
                     'After applying IBP twice, the integral becomes straightforward. Choosing \\(u = \\cos x\\) would instead require differentiating a product that grows in complexity.'
        };
    },

    /**
     * 7. qIBPConstant - Medium (Free)
     * Evaluate ∫₁ᵉ ln(x) dx = 1.
     */
    qIBPConstant() {
        // ∫₁ᵉ ln(x) dx = [x ln x − x]₁ᵉ = (e·1 − e) − (1·0 − 1) = 0 − (−1) = 1
        const answer = 1;

        return {
            type: 'free',
            rule: 'IBP — ∫ln(x)dx Definite',
            difficulty: 'medium',
            text: 'Using the result \\(\\int \\ln x\\,dx = x\\ln x - x + C\\), evaluate the definite integral below. Give an exact answer.',
            latex: '\\(\\displaystyle\\int_1^e \\ln x\\,dx\\)',
            answer: answer,
            answerTex: '1',
            options: [],
            hintTex: [
                '\\Big[x\\ln x - x\\Big]_1^e',
                '= (e\\ln e - e) - (1\\cdot\\ln 1 - 1) = (e - e) - (0 - 1) = 1'
            ],
            explain: '<strong>Step 1:</strong> Antiderivative is \\(F(x) = x\\ln x - x\\).<br><br>' +
                     '<strong>Step 2:</strong> Evaluate at upper limit \\(e\\):<br>' +
                     '\\(F(e) = e\\ln e - e = e(1) - e = 0\\).<br><br>' +
                     '<strong>Step 3:</strong> Evaluate at lower limit \\(1\\):<br>' +
                     '\\(F(1) = 1\\cdot\\ln 1 - 1 = 0 - 1 = -1\\).<br><br>' +
                     '<strong>Step 4:</strong> \\(F(e) - F(1) = 0 - (-1) = \\mathbf{1}\\).'
        };
    },

    /**
     * 8. qReductionFormula - Hard (Free)
     * ∫₀¹ x²eˣ dx = e(1−2+2) − 2(·) ... = e − 2 ≈ 0.718
     * Full result: e^x(x²−2x+2) + C. At x=1: e(1), at x=0: 2. So answer = e − 2.
     */
    qReductionFormula() {
        // ∫x²eˣ dx = eˣ(x²−2x+2) + C
        // ∫₀¹ x²eˣ dx = e(1−2+2) − e⁰(0−0+2) = e·1 − 1·2 = e − 2
        const answer = Math.exp(1) - 2;
        const answerRounded = Math.round(answer * 1000) / 1000;

        return {
            type: 'free',
            rule: 'IBP Twice — Reduction',
            difficulty: 'hard',
            text: 'Applying integration by parts <em>twice</em> gives \\(\\int x^2 e^x\\,dx = e^x(x^2 - 2x + 2) + C\\). Use this to evaluate the definite integral below. Give your answer to 3 d.p.',
            latex: '\\(\\displaystyle\\int_0^1 x^2 e^x\\,dx\\)',
            answer: answerRounded,
            answerTex: `${answerRounded}`,
            options: [],
            hintTex: [
                '\\Big[e^x(x^2 - 2x + 2)\\Big]_0^1',
                '= e^1(1 - 2 + 2) - e^0(0 - 0 + 2) = e - 2'
            ],
            explain: '<strong>Step 1:</strong> Antiderivative is \\(F(x) = e^x(x^2 - 2x + 2)\\).<br><br>' +
                     '<strong>Step 2 — Derivation sketch (IBP twice):</strong><br>' +
                     'First IBP: \\(u = x^2,\\; dv = e^x dx\\) → \\(\\int x^2 e^x dx = x^2 e^x - 2\\int xe^x dx\\).<br>' +
                     'Second IBP: \\(\\int xe^x dx = xe^x - e^x + C\\).<br>' +
                     'Combining: \\(x^2e^x - 2(xe^x - e^x) + C = e^x(x^2 - 2x + 2) + C\\).<br><br>' +
                     '<strong>Step 3:</strong> Evaluate at bounds:<br>' +
                     '\\(F(1) = e^1(1 - 2 + 2) = e\\)<br>' +
                     '\\(F(0) = e^0(0 - 0 + 2) = 2\\)<br><br>' +
                     `<strong>Step 4:</strong> \\(F(1) - F(0) = e - 2 \\approx ${answerRounded}\\).`
        };
    },

    /**
     * 9. qIBPArctan - Medium (MC)
     * Antiderivative of arctan(x).
     */
    qIBPArctan() {
        const options = MathUtils.shuffle([
            { value: 1, tex: 'x\\arctan x - \\tfrac{1}{2}\\ln(1+x^2) + C' },
            { value: 0, tex: 'x\\arctan x + \\tfrac{1}{2}\\ln(1+x^2) + C' },
            { value: 0, tex: '\\dfrac{1}{1+x^2} + C' },
            { value: 0, tex: 'x\\arctan x - \\ln(1+x^2) + C' }
        ]);

        return {
            type: 'mc',
            rule: 'IBP — ∫arctan(x)dx',
            difficulty: 'medium',
            text: 'Which of the following equals \\(\\displaystyle\\int \\arctan x\\,dx\\)?',
            latex: '\\text{Hint: treat } \\arctan x \\text{ as } u \\text{ and } dv = dx.',
            answer: 1,
            answerTex: 'x\\arctan x - \\tfrac{1}{2}\\ln(1+x^2) + C',
            options: options,
            hintTex: [
                'u = \\arctan x,\\quad dv = dx \\implies du = \\dfrac{1}{1+x^2}dx,\\quad v = x',
                '\\int\\arctan x\\,dx = x\\arctan x - \\int\\dfrac{x}{1+x^2}dx = x\\arctan x - \\tfrac{1}{2}\\ln(1+x^2) + C'
            ],
            explain: '<strong>Step 1:</strong> LIATE: \\(u = \\arctan x\\) (Inverse trig), \\(dv = dx\\).<br><br>' +
                     '<strong>Step 2:</strong> \\(du = \\frac{1}{1+x^2}\\,dx\\) and \\(v = x\\).<br><br>' +
                     '<strong>Step 3:</strong> Apply IBP:<br>' +
                     '\\(\\int\\arctan x\\,dx = x\\arctan x - \\int\\frac{x}{1+x^2}\\,dx\\).<br><br>' +
                     '<strong>Step 4:</strong> Evaluate the remaining integral by substitution \\(w = 1+x^2\\):<br>' +
                     '\\(\\int\\frac{x}{1+x^2}\\,dx = \\frac{1}{2}\\ln(1+x^2) + C\\).<br><br>' +
                     '<strong>Result:</strong> \\(\\int\\arctan x\\,dx = x\\arctan x - \\frac{1}{2}\\ln(1+x^2) + C\\).'
        };
    },

    /**
     * 10. qDUVSetup - Easy (MC)
     * For ∫x·ln(x) dx with u=ln(x), dv=x dx, what is du?
     */
    qDUVSetup() {
        const options = MathUtils.shuffle([
            { value: 1, tex: 'du = \\dfrac{1}{x}\\,dx' },
            { value: 0, tex: 'du = \\ln x\\,dx' },
            { value: 0, tex: 'du = x\\ln x\\,dx' },
            { value: 0, tex: 'du = \\dfrac{1}{x^2}\\,dx' }
        ]);

        return {
            type: 'mc',
            rule: 'IBP — Setup (du)',
            difficulty: 'easy',
            text: 'For \\(\\displaystyle\\int x\\ln x\\,dx\\) using IBP with \\(u = \\ln x\\) and \\(dv = x\\,dx\\), what is \\(du\\)?',
            latex: '\\text{Differentiate } u = \\ln x \\text{ with respect to } x.',
            answer: 1,
            answerTex: 'du = \\dfrac{1}{x}\\,dx',
            options: options,
            hintTex: [
                '\\text{If } u = \\ln x, \\text{ then } \\frac{du}{dx} = \\frac{1}{x}',
                'du = \\frac{1}{x}\\,dx'
            ],
            explain: '<strong>Step 1:</strong> We are given \\(u = \\ln x\\).<br><br>' +
                     '<strong>Step 2:</strong> Differentiate: \\(\\frac{du}{dx} = \\frac{1}{x}\\).<br><br>' +
                     '<strong>Step 3:</strong> In differential form: \\(du = \\frac{1}{x}\\,dx\\).<br><br>' +
                     '<strong>Completing the setup:</strong> \\(dv = x\\,dx \\Rightarrow v = \\frac{x^2}{2}\\).<br>' +
                     'So \\(\\int x\\ln x\\,dx = \\frac{x^2}{2}\\ln x - \\int\\frac{x^2}{2}\\cdot\\frac{1}{x}\\,dx = \\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C\\).'
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => INT_PARTS.qChooseU(),          weight: 3, difficulty: 'easy'   },  // 0
            { fn: () => INT_PARTS.qIBPBasic(),          weight: 2, difficulty: 'medium' },  // 1
            { fn: () => INT_PARTS.qIBPEvaluate(),       weight: 2, difficulty: 'medium' },  // 2
            { fn: () => INT_PARTS.qIBPTrig(),           weight: 2, difficulty: 'medium' },  // 3
            { fn: () => INT_PARTS.qIBPLn(),             weight: 2, difficulty: 'medium' },  // 4
            { fn: () => INT_PARTS.qUDVChoice(),         weight: 3, difficulty: 'easy'   },  // 5
            { fn: () => INT_PARTS.qIBPConstant(),       weight: 2, difficulty: 'medium' },  // 6
            { fn: () => INT_PARTS.qReductionFormula(),  weight: 1, difficulty: 'hard'   },  // 7
            { fn: () => INT_PARTS.qIBPArctan(),         weight: 2, difficulty: 'medium' },  // 8
            { fn: () => INT_PARTS.qDUVSetup(),          weight: 3, difficulty: 'easy'   }   // 9
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (INT_PARTS.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (INT_PARTS.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (INT_PARTS.level === 'hard') {
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
        INT_PARTS.score = 0;
        INT_PARTS.total = 0;
        INT_PARTS.streak = 0;
        INT_PARTS.answered = false;
        INT_PARTS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="INT_PARTS.unload()">Integration by Parts (5.20)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Integration by Parts</h1>
                <p>IB Math AA 5.20 — \\(\\int u\\,dv = uv - \\int v\\,du\\)</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="INT_PARTS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="INT_PARTS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="INT_PARTS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="INT_PARTS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="ibp-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="ibp-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="ibp-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="ibp-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="ibp-question-card">
                <span class="rule-tag" id="ibp-rule"></span>
                <span class="difficulty-tag" id="ibp-difficulty"></span>
                <div class="question-text" id="ibp-text"></div>
                <div class="question-prompt" id="ibp-latex"></div>
                <div id="ibp-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="ibp-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="ibp-feedback">
                <div class="feedback-title" id="ibp-feedback-title"></div>
                <div class="feedback-explanation" id="ibp-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="ibp-hint-btn" onclick="INT_PARTS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="ibp-next-btn" onclick="INT_PARTS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        INT_PARTS.next();
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
        INT_PARTS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        INT_PARTS.score = 0;
        INT_PARTS.total = 0;
        INT_PARTS.streak = 0;
        INT_PARTS.updateStats();
        INT_PARTS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        INT_PARTS.answered = false;
        INT_PARTS.hintIndex = 0;
        INT_PARTS.currentQ = INT_PARTS.pickQuestion();
        const q = INT_PARTS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('ibp-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('ibp-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('ibp-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('ibp-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('ibp-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="INT_PARTS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="ibp-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')INT_PARTS.checkFree()">
                    <button class="btn btn-primary" onclick="INT_PARTS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('ibp-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('ibp-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('ibp-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('ibp-next-btn').style.display = 'none';
        document.getElementById('ibp-hint-btn').style.display = '';
        document.getElementById('ibp-hint-btn').disabled = false;

        // Render KaTeX
        INT_PARTS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = INT_PARTS.currentQ;
        if (!q || !q.hintTex || INT_PARTS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('ibp-hint-box');
        const hintContent = INT_PARTS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[INT_PARTS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        INT_PARTS.hintIndex++;

        if (INT_PARTS.hintIndex >= q.hintTex.length) {
            document.getElementById('ibp-hint-btn').disabled = true;
        }

        INT_PARTS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (INT_PARTS.answered) return;
        INT_PARTS.answered = true;
        INT_PARTS.total++;

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
            INT_PARTS.score++;
            INT_PARTS.streak++;
        } else {
            btn.classList.add('incorrect');
            INT_PARTS.streak = 0;
        }

        INT_PARTS.showFeedback(isCorrect);
        INT_PARTS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (INT_PARTS.answered) return;

        const inp = document.getElementById('ibp-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        INT_PARTS.answered = true;
        INT_PARTS.total++;
        inp.disabled = true;

        const q = INT_PARTS.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            INT_PARTS.score++;
            INT_PARTS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            INT_PARTS.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        INT_PARTS.showFeedback(isCorrect);
        INT_PARTS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = INT_PARTS.currentQ;
        const fb = document.getElementById('ibp-feedback');
        const title = document.getElementById('ibp-feedback-title');
        const explanation = document.getElementById('ibp-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (INT_PARTS.streak > 1) {
                title.textContent = `Correct! (${INT_PARTS.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('ibp-next-btn').style.display = '';
        document.getElementById('ibp-hint-btn').style.display = 'none';

        INT_PARTS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('ibp-score');
        const totalEl = document.getElementById('ibp-total');
        const streakEl = document.getElementById('ibp-streak');
        const accEl = document.getElementById('ibp-accuracy');

        if (scoreEl) scoreEl.textContent = INT_PARTS.score;
        if (totalEl) totalEl.textContent = INT_PARTS.total;
        if (streakEl) streakEl.textContent = INT_PARTS.streak;
        if (accEl) {
            accEl.textContent = INT_PARTS.total > 0
                ? Math.round((INT_PARTS.score / INT_PARTS.total) * 100) + '%'
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
    ACTIVITY_INITS['integration-by-parts'] = () => INT_PARTS.load();
}
