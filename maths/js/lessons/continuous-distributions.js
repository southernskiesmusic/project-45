const LESSON_CONT_DIST = {
    id: 'continuous-distributions',
    title: 'Continuous Distributions',
    subtitle: 'Probability density functions, mean and variance',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: Continuous Random Variables ───────────────
        {
            type: 'concept',
            title: 'Continuous Random Variables and PDFs',
            content: '<p>A <strong>continuous random variable</strong> \\(X\\) can take any value in an interval. Its distribution is described by a <strong>probability density function (PDF)</strong> \\(f(x)\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>Properties of a PDF:</strong><br>' +
                '1. \\(f(x) \\geq 0\\) for all \\(x\\)<br>' +
                '2. \\(\\displaystyle\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1\\) (total area = 1)<br><br>' +
                '<strong>Probability:</strong><br>' +
                '\\(P(a \\leq X \\leq b) = \\displaystyle\\int_a^b f(x)\\,dx\\)' +
                '</div>' +
                '<p>Note: \\(P(X = c) = 0\\) for any single value \\(c\\) — only intervals have positive probability for continuous distributions.</p>'
        },

        // ── 2. Practice: Uniform Probability ─────────────────────
        {
            type: 'practice',
            intro: 'Find the probability for the uniform distribution:',
            generate: () => CONT_DIST.qUniformProbability()
        },

        // ── 3. Practice: Normalizing Constant ────────────────────
        {
            type: 'practice',
            intro: 'Find the value of k that makes f a valid PDF:',
            generate: () => CONT_DIST.qPDFNormalize()
        },

        // ── 4. Example: Uniform Distribution ─────────────────────
        {
            type: 'example',
            problem: 'X follows a uniform distribution on [2, 8]. Find P(3 ≤ X ≤ 6).',
            steps: [
                { text: '<strong>Step 1:</strong> PDF: \\(f(x) = \\frac{1}{8-2} = \\frac{1}{6}\\) on \\([2,8]\\).' },
                { text: '<strong>Step 2:</strong> \\(P(3 \\leq X \\leq 6) = \\int_3^6 \\frac{1}{6}\\,dx = \\frac{1}{6}(6-3) = \\frac{3}{6}\\).' },
                { text: '<strong>Answer:</strong> \\(P = \\frac{1}{2}\\).' }
            ]
        },

        // ── 5. Practice: CDF Uniform ─────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the cumulative distribution function F(x):',
            generate: () => CONT_DIST.qCDFUniform()
        },

        // ── 6. Concept: Mean and Variance ────────────────────────
        {
            type: 'concept',
            title: 'Mean and Variance of Continuous Distributions',
            content: '<p>For a continuous random variable with PDF \\(f(x)\\):</p>' +
                '<div class="lesson-box">' +
                '<strong>Mean (Expected Value):</strong><br>' +
                '\\(E[X] = \\displaystyle\\int_{-\\infty}^{\\infty} x\\,f(x)\\,dx\\)<br><br>' +
                '<strong>Variance:</strong><br>' +
                '\\(\\text{Var}(X) = E[X^2] - (E[X])^2\\)<br>' +
                'where \\(E[X^2] = \\displaystyle\\int x^2 f(x)\\,dx\\)' +
                '</div>' +
                '<p><strong>Uniform distribution</strong> \\(X \\sim U(a,b)\\):</p>' +
                '<ul>' +
                '<li>Mean: \\(E[X] = \\dfrac{a+b}{2}\\)</li>' +
                '<li>Variance: \\(\\text{Var}(X) = \\dfrac{(b-a)^2}{12}\\)</li>' +
                '</ul>'
        },

        // ── 7. Practice: Uniform Mean ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the mean of the uniform distribution:',
            generate: () => CONT_DIST.qUniformMean()
        },

        // ── 8. Practice: Uniform Variance ────────────────────────
        {
            type: 'practice',
            intro: 'Find the variance of the uniform distribution:',
            generate: () => CONT_DIST.qUniformVariance()
        },

        // ── 9. Example: Expected Value of PDF ─────────────────────
        {
            type: 'example',
            problem: 'For \\(f(x) = 2x\\) on \\([0,1]\\), find \\(E[X]\\).',
            steps: [
                { text: '<strong>Step 1:</strong> \\(E[X] = \\int_0^1 x \\cdot 2x\\,dx = \\int_0^1 2x^2\\,dx\\).' },
                { text: '<strong>Step 2:</strong> \\(= \\left[\\frac{2x^3}{3}\\right]_0^1 = \\frac{2}{3}\\).' },
                { text: '<strong>Answer:</strong> \\(E[X] = \\frac{2}{3}\\).' }
            ]
        },

        // ── 10. Practice: Expected Value ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the expected value using integration:',
            generate: () => CONT_DIST.qExpectedValue()
        },

        // ── 11. Practice: Probability Interval ───────────────────
        {
            type: 'practice',
            intro: 'Find the probability on the given interval using the PDF:',
            generate: () => CONT_DIST.qProbInterval()
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>PDF: \\(f(x) \\geq 0\\) and \\(\\int f(x)\\,dx = 1\\)</li>' +
                '<li>\\(P(a \\leq X \\leq b) = \\int_a^b f(x)\\,dx\\)</li>' +
                '<li>\\(P(X = c) = 0\\) for continuous distributions</li>' +
                '<li>Uniform \\(U(a,b)\\): \\(f(x) = 1/(b-a)\\)</li>' +
                '<li>Uniform mean: \\((a+b)/2\\); variance: \\((b-a)^2/12\\)</li>' +
                '<li>\\(E[X] = \\int x\\,f(x)\\,dx\\)</li>' +
                '<li>CDF: \\(F(x) = P(X \\leq x) = \\int_{-\\infty}^x f(t)\\,dt\\)</li>' +
                '</ul>'
        }
    ]
};
