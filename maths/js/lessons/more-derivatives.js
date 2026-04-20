const LESSON_MORE_DERIV = {
    id: 'more-derivatives',
    title: 'Further Differentiation',
    subtitle: 'Product rule, quotient rule, and derivatives of trig functions',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Product Rule ──────────────────────────────
        {
            type: 'concept',
            title: 'Product Rule',
            content: '<p>To differentiate a <strong>product</strong> of two functions:</p>' +
                '<div class="lesson-box">' +
                'If \\(h(x) = u(x)\\cdot v(x)\\), then:<br><br>' +
                '\\(h\'(x) = u\'(x)\\,v(x) + u(x)\\,v\'(x)\\)' +
                '</div>' +
                '<p><strong>Example:</strong> Differentiate \\(h(x) = x^2 e^x\\).</p>' +
                '<ul>' +
                '<li>\\(u = x^2\\), \\(u\' = 2x\\)</li>' +
                '<li>\\(v = e^x\\), \\(v\' = e^x\\)</li>' +
                '<li>\\(h\' = 2x e^x + x^2 e^x = xe^x(2+x)\\)</li>' +
                '</ul>'
        },

        // ── 2. Practice: Product Rule ─────────────────────────────
        {
            type: 'practice',
            intro: 'Identify the correct derivative using the product rule:',
            generate: () => MORE_DERIV.qProductRule()
        },

        // ── 3. Practice: Simple Product ──────────────────────────
        {
            type: 'practice',
            intro: 'Differentiate the product and evaluate at x = 1:',
            generate: () => MORE_DERIV.qProductRuleSimple()
        },

        // ── 4. Concept: Quotient Rule ─────────────────────────────
        {
            type: 'concept',
            title: 'Quotient Rule',
            content: '<p>To differentiate a <strong>quotient</strong> of two functions:</p>' +
                '<div class="lesson-box">' +
                'If \\(h(x) = \\dfrac{u(x)}{v(x)}\\), then:<br><br>' +
                '\\(h\'(x) = \\dfrac{u\'(x)\\,v(x) - u(x)\\,v\'(x)}{[v(x)]^2}\\)' +
                '</div>' +
                '<p><strong>Example:</strong> Differentiate \\(h(x) = \\dfrac{x^2}{x+1}\\).</p>' +
                '<ul>' +
                '<li>\\(u = x^2\\), \\(u\' = 2x\\); \\(v = x+1\\), \\(v\' = 1\\)</li>' +
                '<li>\\(h\' = \\dfrac{2x(x+1) - x^2(1)}{(x+1)^2} = \\dfrac{x^2+2x}{(x+1)^2}\\)</li>' +
                '</ul>'
        },

        // ── 5. Practice: Quotient Rule ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the derivative using the quotient rule:',
            generate: () => MORE_DERIV.qQuotientRule()
        },

        // ── 6. Concept: Trig Derivatives ─────────────────────────
        {
            type: 'concept',
            title: 'Derivatives of Trig Functions',
            content: '<p>Standard derivatives of trigonometric functions:</p>' +
                '<div class="lesson-box">' +
                '\\(\\frac{d}{dx}\\sin(x) = \\cos(x)\\)<br><br>' +
                '\\(\\frac{d}{dx}\\cos(x) = -\\sin(x)\\)<br><br>' +
                '\\(\\frac{d}{dx}\\tan(x) = \\sec^2(x)\\)<br><br>' +
                'By chain rule: \\(\\frac{d}{dx}\\sin(ax) = a\\cos(ax)\\)' +
                '</div>' +
                '<p>Derivatives of inverse trig:</p>' +
                '<ul>' +
                '<li>\\(\\dfrac{d}{dx}\\arcsin(x) = \\dfrac{1}{\\sqrt{1-x^2}}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}\\arctan(x) = \\dfrac{1}{1+x^2}\\)</li>' +
                '</ul>'
        },

        // ── 7. Practice: Derivative of sin ───────────────────────
        {
            type: 'practice',
            intro: 'Find the coefficient after differentiating the sine function:',
            generate: () => MORE_DERIV.qDerivSin()
        },

        // ── 8. Practice: Derivative of cos ───────────────────────
        {
            type: 'practice',
            intro: 'Find the coefficient after differentiating the cosine function:',
            generate: () => MORE_DERIV.qDerivCos()
        },

        // ── 9. Example: Higher-Order Derivative ───────────────────
        {
            type: 'example',
            problem: 'Find the second derivative of \\(f(x) = 3x^3 - 2x^2 + x - 5\\).',
            steps: [
                { text: '<strong>Step 1:</strong> First derivative: \\(f\'(x) = 9x^2 - 4x + 1\\).' },
                { text: '<strong>Step 2:</strong> Second derivative: \\(f\'\'(x) = 18x - 4\\).' },
                { text: '<strong>Answer:</strong> \\(f\'\'(x) = 18x - 4\\).' }
            ]
        },

        // ── 10. Practice: Second Derivative ──────────────────────
        {
            type: 'practice',
            intro: 'Find f\'\'(1) for the cubic polynomial:',
            generate: () => MORE_DERIV.qSecondDerivative()
        },

        // ── 11. Practice: arctan Derivative ──────────────────────
        {
            type: 'practice',
            intro: 'Find f\'(0) for the arctan function:',
            generate: () => MORE_DERIV.qDerivArctan()
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Product rule: \\((uv)\' = u\'v + uv\'\\)</li>' +
                '<li>Quotient rule: \\((u/v)\' = (u\'v - uv\')/v^2\\)</li>' +
                '<li>\\(\\frac{d}{dx}\\sin(ax) = a\\cos(ax)\\)</li>' +
                '<li>\\(\\frac{d}{dx}\\cos(ax) = -a\\sin(ax)\\)</li>' +
                '<li>\\(\\frac{d}{dx}\\tan(x) = \\sec^2(x)\\)</li>' +
                '<li>\\(\\frac{d}{dx}\\arcsin(x) = 1/\\sqrt{1-x^2}\\)</li>' +
                '<li>\\(\\frac{d}{dx}\\arctan(x) = 1/(1+x^2)\\)</li>' +
                '</ul>'
        }
    ]
};
