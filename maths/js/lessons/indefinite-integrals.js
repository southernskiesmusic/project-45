const LESSON_INDEF_INT = {
    id: 'indefinite-integrals',
    title: 'Indefinite Integrals',
    subtitle: 'Antiderivatives, power rule, and standard integrals',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: The Antiderivative ────────────────────────
        {
            type: 'concept',
            title: 'The Antiderivative',
            content: '<p><strong>Integration</strong> reverses differentiation. If \\(F\'(x) = f(x)\\), then \\(F\\) is an <strong>antiderivative</strong> of \\(f\\), and we write:</p>' +
                '<div class="lesson-box">' +
                '\\(\\displaystyle\\int f(x)\\,dx = F(x) + C\\)<br><br>' +
                '\\(C\\) is the <strong>arbitrary constant of integration</strong>, determined by an initial condition.<br><br>' +
                '<strong>Power rule:</strong> \\(\\displaystyle\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)\\)<br><br>' +
                '<strong>Constant multiple:</strong> \\(\\displaystyle\\int k\\cdot f(x)\\,dx = k\\int f(x)\\,dx\\)' +
                '</div>' +
                '<p>The power rule raises the exponent by 1 and divides by the new exponent — the exact reverse of differentiation.</p>'
        },

        // ── 2. Example: Integrating a Polynomial ──────────────────
        {
            type: 'example',
            problem: 'Find \\(\\displaystyle\\int(3x^2 + 2x - 5)\\,dx\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Integrate \\(3x^2\\): \\(\\displaystyle\\int 3x^2\\,dx = 3\\cdot\\dfrac{x^3}{3} = x^3\\).' },
                { text: '<strong>Step 2:</strong> Integrate \\(2x\\): \\(\\displaystyle\\int 2x\\,dx = 2\\cdot\\dfrac{x^2}{2} = x^2\\).' },
                { text: '<strong>Step 3:</strong> Integrate \\(-5\\): \\(\\displaystyle\\int -5\\,dx = -5x\\).' },
                { text: '<strong>Answer:</strong> \\(x^3 + x^2 - 5x + C\\).' }
            ]
        },

        // ── 3. Practice: Power Integral ───────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the definite-style power integral:',
            generate: () => INDEF_INT.qPowerIntegral()
        },

        // ── 4. Practice: Polynomial Integral ──────────────────────
        {
            type: 'practice',
            intro: 'Integrate the polynomial and evaluate:',
            generate: () => INDEF_INT.qPolyIntegral()
        },

        // ── 5. Concept: Standard Integrals ────────────────────────
        {
            type: 'concept',
            title: 'Standard Integrals',
            content: '<p>The following standard results must be known for IB Math AA:</p>' +
                '<div class="lesson-box">' +
                '<table style="width:100%; border-collapse:collapse;">' +
                '<thead><tr>' +
                '<th style="text-align:left; padding:6px 8px; border-bottom:2px solid #ccc;">Integral</th>' +
                '<th style="text-align:left; padding:6px 8px; border-bottom:2px solid #ccc;">Result</th>' +
                '</tr></thead>' +
                '<tbody>' +
                '<tr><td style="padding:6px 8px;">\\(\\displaystyle\\int e^{kx}\\,dx\\)</td><td style="padding:6px 8px;">\\(\\dfrac{1}{k}e^{kx} + C\\)</td></tr>' +
                '<tr><td style="padding:6px 8px;">\\(\\displaystyle\\int \\dfrac{1}{x}\\,dx\\)</td><td style="padding:6px 8px;">\\(\\ln|x| + C\\)</td></tr>' +
                '<tr><td style="padding:6px 8px;">\\(\\displaystyle\\int \\dfrac{1}{ax+b}\\,dx\\)</td><td style="padding:6px 8px;">\\(\\dfrac{1}{a}\\ln|ax+b| + C\\)</td></tr>' +
                '<tr><td style="padding:6px 8px;">\\(\\displaystyle\\int \\sin(kx)\\,dx\\)</td><td style="padding:6px 8px;">\\(-\\dfrac{1}{k}\\cos(kx) + C\\)</td></tr>' +
                '<tr><td style="padding:6px 8px;">\\(\\displaystyle\\int \\cos(kx)\\,dx\\)</td><td style="padding:6px 8px;">\\(\\dfrac{1}{k}\\sin(kx) + C\\)</td></tr>' +
                '</tbody></table>' +
                '</div>' +
                '<p>Each result can be verified by differentiating the right-hand side.</p>'
        },

        // ── 6. Example: Integrating e^(kx) ────────────────────────
        {
            type: 'example',
            problem: 'Find \\(\\displaystyle\\int 4e^{2x}\\,dx\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Apply the standard result: \\(\\displaystyle\\int e^{2x}\\,dx = \\dfrac{1}{2}e^{2x}\\).' },
                { text: '<strong>Step 2:</strong> Multiply by the constant factor: \\(4 \\cdot \\dfrac{1}{2}e^{2x} = 2e^{2x}\\).' },
                { text: '<strong>Answer:</strong> \\(2e^{2x} + C\\).' }
            ]
        },

        // ── 7. Practice: Exponential Integral ─────────────────────
        {
            type: 'practice',
            intro: 'Integrate the exponential function:',
            generate: () => INDEF_INT.qExpIntegral()
        },

        // ── 8. Practice: Logarithmic Integral ─────────────────────
        {
            type: 'practice',
            intro: 'Integrate to find the logarithmic result:',
            generate: () => INDEF_INT.qLnIntegral()
        },

        // ── 9. Practice: Linear Denominator ───────────────────────
        {
            type: 'practice',
            intro: 'Integrate the linear denominator:',
            generate: () => INDEF_INT.qLinearDenominator()
        },

        // ── 10. Practice: Sine Integral ───────────────────────────
        {
            type: 'practice',
            intro: 'Integrate the sine function:',
            generate: () => INDEF_INT.qSinIntegral()
        },

        // ── 11. Practice: Cosine Integral ─────────────────────────
        {
            type: 'practice',
            intro: 'Integrate the cosine function:',
            generate: () => INDEF_INT.qCosIntegral()
        },

        // ── 12. Concept: Finding the Constant C ───────────────────
        {
            type: 'concept',
            title: 'Finding the Constant C',
            content: '<p>When a <strong>boundary condition</strong> (initial condition) is given, we can determine the exact value of \\(C\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>Method:</strong><br>' +
                '<ol style="margin:8px 0 0 0; padding-left:1.4em;">' +
                '<li>Integrate \\(f(x)\\) to obtain \\(F(x) = \\displaystyle\\int f(x)\\,dx + C\\).</li>' +
                '<li>Substitute the known point \\((a,\\, b)\\) where \\(F(a) = b\\) to solve for \\(C\\).</li>' +
                '<li>Write the complete function and evaluate at any required value.</li>' +
                '</ol>' +
                '</div>' +
                '<p>Without a boundary condition the constant \\(C\\) remains unknown — this is what distinguishes an <em>indefinite</em> integral from a definite one.</p>'
        },

        // ── 13. Example: Using a Boundary Condition ───────────────
        {
            type: 'example',
            problem: '\\(\\dfrac{dy}{dx} = 2x + 1\\) and \\(y = 5\\) when \\(x = 0\\). Find \\(y\\) when \\(x = 2\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Integrate: \\(y = \\displaystyle\\int(2x + 1)\\,dx = x^2 + x + C\\).' },
                { text: '<strong>Step 2:</strong> Apply the condition \\(y = 5\\) at \\(x = 0\\): \\(5 = 0 + 0 + C \\Rightarrow C = 5\\).' },
                { text: '<strong>Step 3:</strong> Evaluate at \\(x = 2\\): \\(y = 4 + 2 + 5 = 11\\).' },
                { text: '<strong>Answer:</strong> \\(y = 11\\).' }
            ]
        },

        // ── 14. Practice: Find the Constant ───────────────────────
        {
            type: 'practice',
            intro: 'Find the constant of integration and evaluate:',
            generate: () => INDEF_INT.qFindConstant()
        },

        // ── 15. Practice: Find the Curve ──────────────────────────
        {
            type: 'practice',
            intro: 'Find y given dy/dx and a point on the curve:',
            generate: () => INDEF_INT.qFindCurve()
        },

        // ── 16. Practice: Integral by Inspection ──────────────────
        {
            type: 'practice',
            intro: 'Identify the integral by inspection:',
            generate: () => INDEF_INT.qIntegralByInspection()
        },

        // ── 17. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\displaystyle\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)\\)</li>' +
                '<li>\\(\\displaystyle\\int e^{kx}\\,dx = \\dfrac{1}{k}e^{kx} + C\\)</li>' +
                '<li>\\(\\displaystyle\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C\\)</li>' +
                '<li>\\(\\displaystyle\\int \\dfrac{1}{ax+b}\\,dx = \\dfrac{1}{a}\\ln|ax+b| + C\\)</li>' +
                '<li>\\(\\displaystyle\\int \\sin(kx)\\,dx = -\\dfrac{1}{k}\\cos(kx) + C\\)</li>' +
                '<li>\\(\\displaystyle\\int \\cos(kx)\\,dx = \\dfrac{1}{k}\\sin(kx) + C\\)</li>' +
                '<li>Use a boundary condition to solve for \\(C\\) by substituting the known point into \\(F(x)\\)</li>' +
                '</ul>'
        }
    ]
};
