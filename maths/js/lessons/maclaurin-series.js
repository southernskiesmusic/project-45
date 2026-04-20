const LESSON_MACLAURIN = {
    id: 'maclaurin-series',
    title: 'Maclaurin Series',
    subtitle: 'Standard series, coefficients, approximations and convergence',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Standard Maclaurin Series ────────────────
        {
            type: 'concept',
            title: 'Standard Maclaurin Series',
            content: '<p>A <strong>Maclaurin series</strong> represents a function as an infinite power series centred at \\(x=0\\):</p>' +
                '<p>\\(f(x) = f(0) + f\'(0)x + \\dfrac{f\'\'(0)}{2!}x^2 + \\dfrac{f\'\'\'(0)}{3!}x^3 + \\cdots\\)</p>' +
                '<div class="lesson-box">' +
                '<strong>Key standard series (IB formula booklet):</strong><br><br>' +
                '\\(e^x = 1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots = \\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{x^n}{n!}\\)<br><br>' +
                '\\(\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots = \\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{(-1)^n x^{2n+1}}{(2n+1)!}\\)<br><br>' +
                '\\(\\cos x = 1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots = \\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{(-1)^n x^{2n}}{(2n)!}\\)<br><br>' +
                '\\(\\ln(1+x) = x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\cdots\\quad |x|<1\\)' +
                '</div>'
        },

        // ── 2. Practice: Coefficient of e^x ──────────────────────
        {
            type: 'practice',
            intro: 'Find the coefficient of the given power in the e^x series:',
            generate: () => MACLAURIN.qCoefficientEx()
        },

        // ── 3. Practice: Coefficient of sin x ────────────────────
        {
            type: 'practice',
            intro: 'Find the coefficient of the given power in the sin x series:',
            generate: () => MACLAURIN.qCoefficientSin()
        },

        // ── 4. Practice: Coefficient of cos x ────────────────────
        {
            type: 'practice',
            intro: 'Find the coefficient of the given power in the cos x series:',
            generate: () => MACLAURIN.qCoefficientCos()
        },

        // ── 5. Example: Approximating e^x ────────────────────────
        {
            type: 'example',
            problem: 'Use the first three non-zero terms of the Maclaurin series to approximate \\(e^{0.1}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Write \\(e^x \\approx 1 + x + \\dfrac{x^2}{2}\\) (first 3 terms).' },
                { text: '<strong>Step 2:</strong> Substitute \\(x = 0.1\\): \\(e^{0.1} \\approx 1 + 0.1 + \\dfrac{0.01}{2} = 1 + 0.1 + 0.005\\).' },
                { text: '<strong>Answer:</strong> \\(e^{0.1} \\approx 1.105\\). (Exact value \\(\\approx 1.10517\\)).' }
            ]
        },

        // ── 6. Practice: Approximate e^x ─────────────────────────
        {
            type: 'practice',
            intro: 'Approximate the value using the first few terms of the Maclaurin series:',
            generate: () => MACLAURIN.qApproximateEx()
        },

        // ── 7. Concept: Using and Substituting into Series ───────
        {
            type: 'concept',
            title: 'Substitution and Derivatives from Series',
            content: '<p>Once you know a standard series, you can <strong>substitute</strong> to get new series:</p>' +
                '<div class="lesson-box">' +
                'Example: replace \\(x\\) with \\(2x\\) in \\(e^x\\):<br>' +
                '\\(e^{2x} = 1 + 2x + \\dfrac{(2x)^2}{2!} + \\cdots = 1 + 2x + 2x^2 + \\cdots\\)' +
                '</div>' +
                '<p><strong>Differentiate a series:</strong> differentiate term-by-term.</p>' +
                '<p>Example: \\(\\dfrac{d}{dx}(\\sin x) = \\dfrac{d}{dx}\\left(x - \\dfrac{x^3}{6} + \\cdots\\right) = 1 - \\dfrac{x^2}{2} + \\cdots = \\cos x\\) ✓</p>' +
                '<p><strong>Convergence:</strong> \\(e^x\\), \\(\\sin x\\), \\(\\cos x\\) converge for all \\(x\\). The \\(\\ln(1+x)\\) series converges for \\(-1 < x \\leq 1\\).</p>'
        },

        // ── 8. Practice: Substitute into Series ──────────────────
        {
            type: 'practice',
            intro: 'Find the first few terms after substituting into the standard series:',
            generate: () => MACLAURIN.qSubstituteIntoSeries()
        },

        // ── 9. Example: Derivative from Series ───────────────────
        {
            type: 'example',
            problem: 'Using the series for \\(\\cos x\\), write the series for \\(\\sin x\\) by integration.',
            steps: [
                { text: '<strong>Step 1:</strong> \\(\\cos x = 1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots\\)' },
                { text: '<strong>Step 2:</strong> Integrate term-by-term (using \\(\\sin 0 = 0\\) as constant).' },
                { text: '<strong>Answer:</strong> \\(\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots\\) ✓' }
            ]
        },

        // ── 10. Practice: Derivative from Series ─────────────────
        {
            type: 'practice',
            intro: 'Find the derivative of the function using its Maclaurin series:',
            generate: () => MACLAURIN.qDerivativeFromSeries()
        },

        // ── 11. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(e^x = \\sum_{n=0}^{\\infty}\\frac{x^n}{n!} = 1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\cdots\\)</li>' +
                '<li>\\(\\sin x = x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\cdots\\) (odd powers only)</li>' +
                '<li>\\(\\cos x = 1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\cdots\\) (even powers only)</li>' +
                '<li>\\(\\ln(1+x) = x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\cdots\\) (\\(|x|<1\\))</li>' +
                '<li>Coefficient of \\(x^n\\) in \\(e^x\\): \\(\\frac{1}{n!}\\)</li>' +
                '<li>Substitute \\(x\\to ax\\) to get series for \\(e^{ax}\\), \\(\\sin(ax)\\), etc.</li>' +
                '<li>Differentiate/integrate term-by-term to derive new series</li>' +
                '</ul>'
        }
    ]
};
