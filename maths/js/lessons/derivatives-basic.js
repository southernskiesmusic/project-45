const LESSON_DERIVATIVES = {
    id: 'derivatives-basic',
    title: 'Basic Differentiation',
    subtitle: 'Power rule, standard derivatives, and product rule',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: What is a Derivative? ─────────────────────
        {
            type: 'concept',
            title: 'What is a Derivative?',
            content: '<p>The <strong>derivative</strong> of a function measures its instantaneous rate of change — the gradient of the tangent line at any point on the curve.</p>' +
                '<p>We write the derivative in several equivalent ways:</p>' +
                '<div class="lesson-box">' +
                '\\(f\'(x)\\) — "f prime of x" (Lagrange notation)<br>' +
                '\\(\\dfrac{dy}{dx}\\) — "dy by dx" (Leibniz notation)<br>' +
                '\\(\\dfrac{d}{dx}[f(x)]\\) — "d by dx of f(x)"' +
                '</div>' +
                '<p><strong>The Power Rule</strong> is the most important rule for polynomials:</p>' +
                '<div class="lesson-box">' +
                '\\(\\dfrac{d}{dx}[x^n] = nx^{n-1}\\)' +
                '</div>' +
                '<p><strong>Other essential rules:</strong></p>' +
                '<ul>' +
                '<li><strong>Constant rule:</strong> \\(\\dfrac{d}{dx}[c] = 0\\) — constants vanish</li>' +
                '<li><strong>Scalar multiple:</strong> \\(\\dfrac{d}{dx}[c \\cdot f(x)] = c \\cdot f\'(x)\\)</li>' +
                '<li><strong>Sum/difference:</strong> \\(\\dfrac{d}{dx}[f(x) \\pm g(x)] = f\'(x) \\pm g\'(x)\\)</li>' +
                '</ul>' +
                '<p>For example: if \\(f(x) = 4x^3\\), then \\(f\'(x) = 4 \\cdot 3x^2 = 12x^2\\).</p>'
        },

        // ── 2. Practice: Power Rule Value ─────────────────────────
        {
            type: 'practice',
            intro: 'Differentiate the power function and evaluate at the given point:',
            generate: () => DERIVATIVES.qPowerRuleValue()
        },

        // ── 3. Example: Differentiating a Polynomial ──────────────
        {
            type: 'example',
            problem: 'Differentiate \\(f(x) = 5x^4 - 3x^2 + 7x - 2\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Differentiate each term separately using the power rule.' },
                { text: '<strong>Step 2:</strong> \\(\\dfrac{d}{dx}[5x^4] = 5 \\cdot 4x^3 = 20x^3\\)' },
                { text: '<strong>Step 3:</strong> \\(\\dfrac{d}{dx}[-3x^2] = -3 \\cdot 2x = -6x\\)' },
                { text: '<strong>Step 4:</strong> \\(\\dfrac{d}{dx}[7x] = 7\\), and \\(\\dfrac{d}{dx}[-2] = 0\\)' },
                { text: '<strong>Answer:</strong> \\(f\'(x) = 20x^3 - 6x + 7\\)' }
            ]
        },

        // ── 4. Practice: Power Rule Expression ────────────────────
        {
            type: 'practice',
            intro: 'Differentiate the polynomial — give the full expression for f\'(x):',
            generate: () => DERIVATIVES.qPowerRuleExpr()
        },

        // ── 5. Practice: Evaluate f'(a) ───────────────────────────
        {
            type: 'practice',
            intro: 'Find the value of f\'(a) at the given point:',
            generate: () => DERIVATIVES.qDerivativeAtPoint()
        },

        // ── 6. Concept: Standard Derivatives ──────────────────────
        {
            type: 'concept',
            title: 'Standard Derivatives',
            content: '<p>Beyond polynomials, IB Math AA requires you to know the derivatives of exponential, logarithmic, and trigonometric functions.</p>' +
                '<div class="lesson-box">' +
                '<strong>Exponential:</strong><br>' +
                '\\(\\dfrac{d}{dx}[e^x] = e^x\\) &nbsp;and&nbsp; \\(\\dfrac{d}{dx}[e^{kx}] = ke^{kx}\\)<br><br>' +
                '<strong>Logarithmic:</strong><br>' +
                '\\(\\dfrac{d}{dx}[\\ln(x)] = \\dfrac{1}{x}\\) &nbsp;and&nbsp; \\(\\dfrac{d}{dx}[\\ln(kx)] = \\dfrac{1}{x}\\)<br><br>' +
                '<strong>Trigonometric:</strong><br>' +
                '\\(\\dfrac{d}{dx}[\\sin(kx)] = k\\cos(kx)\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\cos(kx)] = -k\\sin(kx)\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\tan(kx)] = k\\sec^2(kx)\\)' +
                '</div>' +
                '<p><strong>Scalar multiples still apply:</strong></p>' +
                '<ul>' +
                '<li>\\(\\dfrac{d}{dx}[3e^{2x}] = 3 \\cdot 2e^{2x} = 6e^{2x}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}[4\\sin(3x)] = 4 \\cdot 3\\cos(3x) = 12\\cos(3x)\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}[5\\ln(x)] = \\dfrac{5}{x}\\)</li>' +
                '</ul>'
        },

        // ── 7. Example: Mixed Standard Derivatives ────────────────
        {
            type: 'example',
            problem: 'Differentiate \\(f(x) = e^{3x} + \\sin(2x)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Differentiate \\(e^{3x}\\). Here \\(k = 3\\), so \\(\\dfrac{d}{dx}[e^{3x}] = 3e^{3x}\\).' },
                { text: '<strong>Step 2:</strong> Differentiate \\(\\sin(2x)\\). Here \\(k = 2\\), so \\(\\dfrac{d}{dx}[\\sin(2x)] = 2\\cos(2x)\\).' },
                { text: '<strong>Answer:</strong> \\(f\'(x) = 3e^{3x} + 2\\cos(2x)\\)' }
            ]
        },

        // ── 8. Practice: Exp Derivative ───────────────────────────
        {
            type: 'practice',
            intro: 'Find the derivative of the exponential function:',
            generate: () => DERIVATIVES.qExpDerivative()
        },

        // ── 9. Practice: Ln Derivative ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the derivative of the logarithmic function:',
            generate: () => DERIVATIVES.qLnDerivative()
        },

        // ── 10. Practice: Trig Derivative ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the derivative of the trigonometric function:',
            generate: () => DERIVATIVES.qTrigDerivative()
        },

        // ── 11. Concept: Product Rule ──────────────────────────────
        {
            type: 'concept',
            title: 'The Product Rule',
            content: '<p>When a function is the <strong>product of two simpler functions</strong>, you cannot just differentiate each part separately. Use the <strong>product rule</strong>.</p>' +
                '<div class="lesson-box">' +
                'If \\(y = u \\cdot v\\), then:<br><br>' +
                '\\(\\dfrac{dy}{dx} = u\'v + uv\'\\)' +
                '</div>' +
                '<p><strong>How to apply it:</strong></p>' +
                '<ol>' +
                '<li>Identify \\(u\\) and \\(v\\) (the two factors)</li>' +
                '<li>Differentiate each: find \\(u\'\\) and \\(v\'\\)</li>' +
                '<li>Substitute into \\(u\'v + uv\'\\)</li>' +
                '<li>Simplify if possible</li>' +
                '</ol>' +
                '<p><strong>Example identification:</strong> For \\(y = x^3 \\cdot e^{2x}\\), let \\(u = x^3\\) and \\(v = e^{2x}\\), so \\(u\' = 3x^2\\) and \\(v\' = 2e^{2x}\\).</p>'
        },

        // ── 12. Example: Product Rule ──────────────────────────────
        {
            type: 'example',
            problem: 'Differentiate \\(y = x^2 \\sin(x)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the two factors. Let \\(u = x^2\\) and \\(v = \\sin(x)\\).' },
                { text: '<strong>Step 2:</strong> Differentiate each. \\(u\' = 2x\\) and \\(v\' = \\cos(x)\\).' },
                { text: '<strong>Step 3:</strong> Apply the product rule: \\(\\dfrac{dy}{dx} = u\'v + uv\'\\).' },
                { text: '<strong>Step 4:</strong> Substitute: \\(\\dfrac{dy}{dx} = 2x\\sin(x) + x^2\\cos(x)\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dx} = 2x\\sin(x) + x^2\\cos(x)\\)' }
            ]
        },

        // ── 13. Practice: Product Rule Value ──────────────────────
        {
            type: 'practice',
            intro: 'Use the product rule and evaluate the derivative at the given point:',
            generate: () => DERIVATIVES.qProductRuleValue()
        },

        // ── 14. Practice: Product Rule Expression ─────────────────
        {
            type: 'practice',
            intro: 'Use the product rule — give the full expression for the derivative:',
            generate: () => DERIVATIVES.qProductRuleExpr()
        },

        // ── 15. Practice: Gradient at a Point ─────────────────────
        {
            type: 'practice',
            intro: 'Find the gradient of the curve at the given point:',
            generate: () => DERIVATIVES.qGradientAtPoint()
        },

        // ── 16. Practice: Find x Given Gradient ───────────────────
        {
            type: 'practice',
            intro: 'Find the value of x where the gradient equals the given value:',
            generate: () => DERIVATIVES.qFindXGivenGradient()
        },

        // ── 17. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Power rule:</strong> \\(\\dfrac{d}{dx}[x^n] = nx^{n-1}\\)</li>' +
                '<li><strong>Constant rule:</strong> \\(\\dfrac{d}{dx}[c] = 0\\)</li>' +
                '<li><strong>Scalar multiple:</strong> \\(\\dfrac{d}{dx}[c \\cdot f(x)] = c \\cdot f\'(x)\\)</li>' +
                '<li><strong>Sum/difference:</strong> differentiate term by term</li>' +
                '<li><strong>Exponential:</strong> \\(\\dfrac{d}{dx}[e^{kx}] = ke^{kx}\\)</li>' +
                '<li><strong>Logarithm:</strong> \\(\\dfrac{d}{dx}[\\ln(x)] = \\dfrac{1}{x}\\)</li>' +
                '<li><strong>Sine:</strong> \\(\\dfrac{d}{dx}[\\sin(kx)] = k\\cos(kx)\\)</li>' +
                '<li><strong>Cosine:</strong> \\(\\dfrac{d}{dx}[\\cos(kx)] = -k\\sin(kx)\\)</li>' +
                '<li><strong>Tangent:</strong> \\(\\dfrac{d}{dx}[\\tan(kx)] = k\\sec^2(kx)\\)</li>' +
                '<li><strong>Product rule:</strong> if \\(y = uv\\), then \\(\\dfrac{dy}{dx} = u\'v + uv\'\\)</li>' +
                '<li>Gradient at a point = value of \\(f\'(x)\\) at that \\(x\\)</li>' +
                '<li>To find \\(x\\) given gradient: set \\(f\'(x) = k\\) and solve</li>' +
                '</ul>'
        }
    ]
};
