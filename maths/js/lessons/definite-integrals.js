const LESSON_DEFINITE_INT = {
    id: 'definite-integrals',
    title: 'Definite Integrals',
    subtitle: 'Area under curves and the fundamental theorem',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: The Definite Integral ─────────────────────
        {
            type: 'concept',
            title: 'The Definite Integral',
            content: '<p>The <strong>definite integral</strong> of \\(f(x)\\) from \\(a\\) to \\(b\\) is defined as:</p>' +
                '<div class="lesson-box">' +
                '\\(\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)\\)<br><br>' +
                'where \\(F\\) is any antiderivative of \\(f\\), i.e. \\(F\'(x) = f(x)\\).<br><br>' +
                '<strong>Fundamental Theorem of Calculus:</strong> If \\(F\'(x) = f(x)\\), then<br>' +
                '\\(\\displaystyle\\int_a^b f(x)\\,dx = \\Big[F(x)\\Big]_a^b = F(b) - F(a)\\)' +
                '</div>' +
                '<p><strong>Geometric meaning:</strong> The definite integral gives the <strong>signed area</strong> between the curve \\(y = f(x)\\) and the \\(x\\)-axis over the interval \\([a, b]\\).</p>' +
                '<ul>' +
                '<li>Where \\(f(x) > 0\\): area is counted <strong>positive</strong> (above \\(x\\)-axis)</li>' +
                '<li>Where \\(f(x) < 0\\): area is counted <strong>negative</strong> (below \\(x\\)-axis)</li>' +
                '<li>The limits \\(a\\) and \\(b\\) are called the <strong>lower</strong> and <strong>upper</strong> bounds of integration</li>' +
                '</ul>'
        },

        // ── 2. Example: Evaluating a Definite Integral ────────────
        {
            type: 'example',
            problem: 'Evaluate \\(\\displaystyle\\int_1^3 (2x + 1)\\,dx\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the antiderivative. \\(F(x) = x^2 + x\\).' },
                { text: '<strong>Step 2:</strong> Evaluate at the upper limit. \\(F(3) = 3^2 + 3 = 9 + 3 = 12\\).' },
                { text: '<strong>Step 3:</strong> Evaluate at the lower limit. \\(F(1) = 1^2 + 1 = 1 + 1 = 2\\).' },
                { text: '<strong>Answer:</strong> \\(F(3) - F(1) = 12 - 2 = 10\\).' }
            ]
        },

        // ── 3. Practice: Power Definite ───────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the definite integral of the power function:',
            generate: () => DEFINITE_INT.qPowerDefinite()
        },

        // ── 4. Practice: Polynomial Definite ──────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the definite integral of the polynomial:',
            generate: () => DEFINITE_INT.qPolyDefinite()
        },

        // ── 5. Practice: Area Positive ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the area under the curve:',
            generate: () => DEFINITE_INT.qAreaPositive()
        },

        // ── 6. Concept: Standard Definite Integrals ───────────────
        {
            type: 'concept',
            title: 'Standard Definite Integrals',
            content: '<p>All indefinite integral rules apply when evaluating definite integrals — simply apply the limits after finding the antiderivative.</p>' +
                '<div class="lesson-box">' +
                '<strong>Exponential:</strong><br>' +
                '\\(\\displaystyle\\int_a^b e^{kx}\\,dx = \\left[\\dfrac{e^{kx}}{k}\\right]_a^b = \\dfrac{e^{kb} - e^{ka}}{k}\\)<br><br>' +
                '<strong>Sine:</strong><br>' +
                '\\(\\displaystyle\\int_a^b \\sin(kx)\\,dx = \\left[-\\dfrac{\\cos(kx)}{k}\\right]_a^b = \\dfrac{\\cos(ka) - \\cos(kb)}{k}\\)<br><br>' +
                '<strong>Cosine:</strong><br>' +
                '\\(\\displaystyle\\int_a^b \\cos(kx)\\,dx = \\left[\\dfrac{\\sin(kx)}{k}\\right]_a^b = \\dfrac{\\sin(kb) - \\sin(ka)}{k}\\)' +
                '</div>' +
                '<p>Always write the antiderivative in square brackets with the limits before substituting.</p>'
        },

        // ── 7. Practice: Exponential Definite ─────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the exponential integral:',
            generate: () => DEFINITE_INT.qExpDefinite()
        },

        // ── 8. Practice: Sine Definite ────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the sine integral:',
            generate: () => DEFINITE_INT.qSinDefinite()
        },

        // ── 9. Practice: Cosine Definite ──────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the cosine integral:',
            generate: () => DEFINITE_INT.qCosDefinite()
        },

        // ── 10. Concept: Area and Sign ────────────────────────────
        {
            type: 'concept',
            title: 'Area and Sign',
            content: '<p>The definite integral gives <strong>signed area</strong>. This distinction is important:</p>' +
                '<div class="lesson-box">' +
                '<strong>Below the \\(x\\)-axis:</strong> If \\(f(x) < 0\\) on \\([a, b]\\), then \\(\\displaystyle\\int_a^b f(x)\\,dx < 0\\).<br>' +
                'The actual geometric area is \\(\\displaystyle\\left|\\int_a^b f(x)\\,dx\\right|\\).<br><br>' +
                '<strong>Area between two curves:</strong> If \\(f(x) \\geq g(x)\\) on \\([a, b]\\), then<br>' +
                '\\(\\text{Area} = \\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,dx\\)' +
                '</div>' +
                '<p>To find total area when a curve crosses the \\(x\\)-axis, split the integral at the crossing points and add the absolute values of each part.</p>'
        },

        // ── 11. Example: Area Below x-axis ────────────────────────
        {
            type: 'example',
            problem: 'Find the area of the region enclosed by \\(f(x) = x^2 - 4\\) and the \\(x\\)-axis on \\([-2, 2]\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Evaluate the definite integral. \\(\\displaystyle\\int_{-2}^{2}(x^2 - 4)\\,dx = \\left[\\dfrac{x^3}{3} - 4x\\right]_{-2}^{2}\\).' },
                { text: '<strong>Step 2:</strong> Substitute upper limit. \\(F(2) = \\dfrac{8}{3} - 8\\).' },
                { text: '<strong>Step 3:</strong> Substitute lower limit. \\(F(-2) = \\dfrac{-8}{3} - (-8) = -\\dfrac{8}{3} + 8\\).' },
                { text: '<strong>Step 4:</strong> Subtract. \\(\\left(\\dfrac{8}{3} - 8\\right) - \\left(-\\dfrac{8}{3} + 8\\right) = \\dfrac{16}{3} - 16 = -\\dfrac{32}{3}\\).' },
                { text: '<strong>Answer:</strong> The integral equals \\(-\\dfrac{32}{3}\\), so the geometric area is \\(\\dfrac{32}{3}\\).' }
            ]
        },

        // ── 12. Practice: Area Negative ───────────────────────────
        {
            type: 'practice',
            intro: 'Find the area of the region below the x-axis:',
            generate: () => DEFINITE_INT.qAreaNegative()
        },

        // ── 13. Practice: Area Between Curves ────────────────────
        {
            type: 'practice',
            intro: 'Find the area between the two curves:',
            generate: () => DEFINITE_INT.qAreaBetweenCurves()
        },

        // ── 14. Practice: Find Upper Bound ────────────────────────
        {
            type: 'practice',
            intro: 'Find the upper limit of integration:',
            generate: () => DEFINITE_INT.qFindUpperBound()
        },

        // ── 15. Practice: Fundamental Theorem ────────────────────
        {
            type: 'practice',
            intro: 'Apply the Fundamental Theorem of Calculus:',
            generate: () => DEFINITE_INT.qFundamentalThm()
        },

        // ── 16. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\displaystyle\\int_a^b f(x)\\,dx = F(b) - F(a)\\) where \\(F\'= f\\)</li>' +
                '<li>Geometric area \\(= \\left|\\displaystyle\\int_a^b f(x)\\,dx\\right|\\) when \\(f(x) < 0\\)</li>' +
                '<li>Area between curves \\((f \\geq g)\\): \\(\\displaystyle\\int_a^b \\big(f(x) - g(x)\\big)\\,dx\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}\\left[\\displaystyle\\int_a^x f(t)\\,dt\\right] = f(x)\\) (Fundamental Theorem, Part 2)</li>' +
                '<li>All indefinite integral rules (power, exponential, trig) apply with limits</li>' +
                '</ul>'
        }
    ]
};
