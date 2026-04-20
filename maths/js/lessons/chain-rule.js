const LESSON_CHAIN_RULE = {
    id: 'chain-rule',
    title: 'Chain Rule',
    subtitle: 'Differentiating composite functions',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: The Chain Rule ─────────────────────────────
        {
            type: 'concept',
            title: 'The Chain Rule',
            content: '<p>The <strong>chain rule</strong> is used to differentiate <strong>composite functions</strong> — functions of the form \\(f(g(x))\\), where one function is nested inside another.</p>' +
                '<div class="lesson-box">' +
                '\\[\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)\\]' +
                '<br>' +
                '<strong>In words:</strong> derivative of outer (keeping inner the same) times derivative of inner.<br><br>' +
                '<strong>Leibniz notation:</strong> if \\(y = f(u)\\) and \\(u = g(x)\\), then' +
                '\\[\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}\\]' +
                '</div>' +
                '<p>To apply the chain rule:</p>' +
                '<ul>' +
                '<li>Identify the <strong>outer function</strong> \\(f\\) and the <strong>inner function</strong> \\(g\\)</li>' +
                '<li>Differentiate the outer function, leaving the inner unchanged</li>' +
                '<li>Multiply by the derivative of the inner function</li>' +
                '</ul>'
        },

        // ── 2. Example: Chain Rule on a Power ─────────────────────
        {
            type: 'example',
            problem: 'Differentiate \\(y = (3x+1)^4\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Let \\(u = 3x + 1\\) (inner), so \\(y = u^4\\) (outer).' },
                { text: '<strong>Step 2:</strong> \\(\\dfrac{dy}{du} = 4u^3\\) and \\(\\dfrac{du}{dx} = 3\\).' },
                { text: '<strong>Step 3:</strong> Apply chain rule: \\(\\dfrac{dy}{dx} = 4u^3 \\cdot 3 = 4(3x+1)^3 \\cdot 3\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dx} = 12(3x+1)^3\\).' }
            ]
        },

        // ── 3. Practice: Chain Rule on a Power ────────────────────
        {
            type: 'practice',
            intro: 'Differentiate using the chain rule and evaluate:',
            generate: () => CHAIN_RULE.qChainPower()
        },

        // ── 4. Practice: Chain Rule — Composite Evaluate ──────────
        {
            type: 'practice',
            intro: 'Differentiate the composite function and evaluate:',
            generate: () => CHAIN_RULE.qChainEvaluate()
        },

        // ── 5. Practice: Chain Rule — Power Eval at x=0 ───────────
        {
            type: 'practice',
            intro: 'Differentiate the power function and evaluate at x=0:',
            generate: () => CHAIN_RULE.qChainPowerEval()
        },

        // ── 6. Concept: Chain Rule with Standard Functions ─────────
        {
            type: 'concept',
            title: 'Chain Rule with Standard Functions',
            content: '<p>The chain rule extends to all standard functions. If the argument is a function \\(f(x)\\) rather than plain \\(x\\), multiply by \\(f\'(x)\\).</p>' +
                '<div class="lesson-box">' +
                '\\[\\frac{d}{dx}\\left[e^{f(x)}\\right] = f\'(x) \\cdot e^{f(x)}\\]' +
                '\\[\\frac{d}{dx}\\left[\\ln(f(x))\\right] = \\frac{f\'(x)}{f(x)}\\]' +
                '\\[\\frac{d}{dx}\\left[\\sin(f(x))\\right] = f\'(x) \\cdot \\cos(f(x))\\]' +
                '\\[\\frac{d}{dx}\\left[\\cos(f(x))\\right] = -f\'(x) \\cdot \\sin(f(x))\\]' +
                '\\[\\frac{d}{dx}\\left[\\tan(f(x))\\right] = f\'(x) \\cdot \\sec^2(f(x))\\]' +
                '</div>' +
                '<p>In every case the pattern is the same: differentiate the outer function (standard rule), keep the inner argument unchanged, then multiply by the derivative of the inner argument.</p>'
        },

        // ── 7. Example: Chain Rule with e^(kx) ────────────────────
        {
            type: 'example',
            problem: 'Differentiate \\(y = e^{3x^2}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Let \\(u = 3x^2\\) (inner), so \\(y = e^u\\) (outer).' },
                { text: '<strong>Step 2:</strong> \\(\\dfrac{dy}{du} = e^u\\) and \\(\\dfrac{du}{dx} = 6x\\).' },
                { text: '<strong>Step 3:</strong> Apply chain rule: \\(\\dfrac{dy}{dx} = e^u \\cdot 6x = 6x \\cdot e^{3x^2}\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dx} = 6x\\,e^{3x^2}\\).' }
            ]
        },

        // ── 8. Practice: Chain Rule — Exponential ─────────────────
        {
            type: 'practice',
            intro: 'Differentiate the exponential function:',
            generate: () => CHAIN_RULE.qChainExp()
        },

        // ── 9. Practice: Chain Rule — Logarithmic ─────────────────
        {
            type: 'practice',
            intro: 'Differentiate the logarithmic function:',
            generate: () => CHAIN_RULE.qChainLn()
        },

        // ── 10. Practice: Chain Rule — Sine ───────────────────────
        {
            type: 'practice',
            intro: 'Differentiate the sine function:',
            generate: () => CHAIN_RULE.qChainSin()
        },

        // ── 11. Practice: Chain Rule — Cosine ─────────────────────
        {
            type: 'practice',
            intro: 'Differentiate the cosine function:',
            generate: () => CHAIN_RULE.qChainCos()
        },

        // ── 12. Practice: Chain Rule — Tangent ────────────────────
        {
            type: 'practice',
            intro: 'Differentiate the tangent function:',
            generate: () => CHAIN_RULE.qChainTan()
        },

        // ── 13. Practice: Chain Rule — Composite Expression ───────
        {
            type: 'practice',
            intro: 'Identify the correct derivative expression:',
            generate: () => CHAIN_RULE.qChainCompositeExpr()
        },

        // ── 14. Practice: Chain Rule — Negative Power ─────────────
        {
            type: 'practice',
            intro: 'Differentiate the negative power using the chain rule:',
            generate: () => CHAIN_RULE.qChainWithNegative()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Chain rule:</strong> \\(\\dfrac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)\\)</li>' +
                '<li>Identify the <strong>outer</strong> function and the <strong>inner</strong> function before differentiating</li>' +
                '<li>\\(\\dfrac{d}{dx}\\left[e^{kx}\\right] = k\\,e^{kx}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}\\left[\\ln(f(x))\\right] = \\dfrac{f\'(x)}{f(x)}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}\\left[\\sin(kx)\\right] = k\\cos(kx)\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}\\left[\\cos(kx)\\right] = -k\\sin(kx)\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}\\left[\\tan(kx)\\right] = k\\sec^2(kx)\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}\\left[(ax+b)^n\\right] = na(ax+b)^{n-1}\\)</li>' +
                '</ul>'
        }
    ]
};
