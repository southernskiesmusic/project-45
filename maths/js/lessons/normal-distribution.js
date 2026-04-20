const LESSON_NORMAL_DIST = {
    id: 'normal-distribution',
    title: 'Normal Distribution',
    subtitle: 'X ~ N(μ, σ²): probabilities and inverse normal',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: The Normal Distribution ───────────────────
        {
            type: 'concept',
            title: 'The Normal Distribution',
            content: '<p>The <strong>normal distribution</strong> is a continuous, bell-shaped distribution that is symmetric about its mean \\(\\mu\\). We write \\(X \\sim N(\\mu, \\sigma^2)\\).</p>' +
                '<p><strong>Parameters:</strong></p>' +
                '<ul>' +
                '<li><strong>Mean \\(\\mu\\):</strong> controls the location (centre) of the curve</li>' +
                '<li><strong>Standard deviation \\(\\sigma\\):</strong> controls the spread (width) of the curve</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<strong>The 68–95–99.7 Rule (Empirical Rule):</strong><br>' +
                '\\(P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 68\\%\\)<br>' +
                '\\(P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) \\approx 95\\%\\)<br>' +
                '\\(P(\\mu - 3\\sigma < X < \\mu + 3\\sigma) \\approx 99.7\\%\\)' +
                '</div>' +
                '<p>The total area under the curve equals 1. Because the distribution is symmetric, exactly half the area lies on each side of \\(\\mu\\).</p>'
        },

        // ── 2. Concept: Standardisation ───────────────────────────
        {
            type: 'concept',
            title: 'Standardisation',
            content: '<p>Any normal variable \\(X \\sim N(\\mu, \\sigma^2)\\) can be converted to the <strong>standard normal</strong> \\(Z \\sim N(0, 1)\\) using the standardisation formula:</p>' +
                '<div class="lesson-box">' +
                '\\[Z = \\frac{X - \\mu}{\\sigma}\\]' +
                'The resulting \\(z\\)-score tells you how many standard deviations \\(x\\) is from the mean.' +
                '</div>' +
                '<p>This lets us use standard normal tables (or a GDC) to find any probability:</p>' +
                '<ul>' +
                '<li>\\(P(X < a) = P\\!\\left(Z < \\dfrac{a - \\mu}{\\sigma}\\right) = \\Phi(z)\\)</li>' +
                '<li>\\(P(X > a) = 1 - \\Phi(z)\\)</li>' +
                '<li>\\(P(a < X < b) = \\Phi(z_2) - \\Phi(z_1)\\)</li>' +
                '</ul>'
        },

        // ── 3. Example: Finding a Probability ─────────────────────
        {
            type: 'example',
            problem: '\\(X \\sim N(50, 100)\\) (so \\(\\sigma = 10\\)). Find \\(P(X < 65)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Standardise: \\(z = \\dfrac{65 - 50}{10} = \\dfrac{15}{10} = 1.5\\).' },
                { text: '<strong>Step 2:</strong> Look up \\(\\Phi(1.5)\\) from the standard normal table (or GDC): \\(P(Z < 1.5) = 0.9332\\).' },
                { text: '<strong>Answer:</strong> \\(P(X < 65) = 0.9332\\).' }
            ]
        },

        // ── 4. Practice: Standardise ──────────────────────────────
        {
            type: 'practice',
            intro: 'Find the z-score:',
            generate: () => NORMAL_DIST.qStandardize()
        },

        // ── 5. Practice: P(X < a) ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(X < a) for the normal distribution:',
            generate: () => NORMAL_DIST.qProbLessThan()
        },

        // ── 6. Practice: P(X > a) ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(X > a) for the normal distribution:',
            generate: () => NORMAL_DIST.qProbGreaterThan()
        },

        // ── 7. Practice: P(a < X < b) ────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(a < X < b) for the normal distribution:',
            generate: () => NORMAL_DIST.qProbBetween()
        },

        // ── 8. Concept: Symmetry Properties ──────────────────────
        {
            type: 'concept',
            title: 'Symmetry Properties',
            content: '<p>Because the normal distribution is symmetric about \\(\\mu\\), several useful shortcuts follow directly:</p>' +
                '<div class="lesson-box">' +
                '\\(P(X > \\mu) = 0.5\\) and \\(P(X < \\mu) = 0.5\\)<br><br>' +
                'For a symmetric interval of half-width \\(k\\):<br>' +
                '\\[P(\\mu - k < X < \\mu + k) = 2\\,\\Phi\\!\\left(\\frac{k}{\\sigma}\\right) - 1\\]' +
                '</div>' +
                '<p>These rules are especially useful when working without full tables, or when checking answers. For example, if \\(P(X < c) = p\\) then by symmetry \\(P(X > 2\\mu - c) = p\\).</p>'
        },

        // ── 9. Practice: Symmetric interval ──────────────────────
        {
            type: 'practice',
            intro: 'Find the probability within a symmetric interval:',
            generate: () => NORMAL_DIST.qSymmetricInterval()
        },

        // ── 10. Example: Inverse Normal ───────────────────────────
        {
            type: 'example',
            problem: '\\(X \\sim N(70, 25)\\) (\\(\\sigma = 5\\)). Find \\(a\\) such that \\(P(X < a) = 0.9772\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Work in the standard normal: find \\(z\\) such that \\(P(Z < z) = 0.9772\\).' },
                { text: '<strong>Step 2:</strong> From tables (or GDC): \\(z = 2.0\\).' },
                { text: '<strong>Step 3:</strong> Convert back: \\(a = \\mu + z \\cdot \\sigma = 70 + 2 \\times 5 = 80\\).' },
                { text: '<strong>Answer:</strong> \\(a = 80\\).' }
            ]
        },

        // ── 11. Practice: Find x ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the value x given the probability:',
            generate: () => NORMAL_DIST.qFindX()
        },

        // ── 12. Practice: Find μ ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the mean μ given the probability:',
            generate: () => NORMAL_DIST.qFindMean()
        },

        // ── 13. Practice: Find σ ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the standard deviation σ given the probability:',
            generate: () => NORMAL_DIST.qFindSigma()
        },

        // ── 14. Practice: Real-world context ─────────────────────
        {
            type: 'practice',
            intro: 'Solve the real-world normal probability problem:',
            generate: () => NORMAL_DIST.qNormalContext()
        },

        // ── 15. Practice: Compare two probabilities ───────────────
        {
            type: 'practice',
            intro: 'Compare the two probabilities:',
            generate: () => NORMAL_DIST.qCompareProbs()
        },

        // ── 16. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(X \\sim N(\\mu, \\sigma^2)\\): bell-shaped, symmetric about \\(\\mu\\)</li>' +
                '<li>Standardise: \\(Z = \\dfrac{X - \\mu}{\\sigma}\\), then \\(Z \\sim N(0,1)\\)</li>' +
                '<li>\\(P(X < a) = \\Phi(z)\\) where \\(z = \\dfrac{a - \\mu}{\\sigma}\\)</li>' +
                '<li>\\(P(X > a) = 1 - \\Phi(z)\\)</li>' +
                '<li>\\(P(a < X < b) = \\Phi(z_2) - \\Phi(z_1)\\)</li>' +
                '<li>Inverse: given \\(P(X < a) = p\\), find \\(z\\) then \\(a = \\mu + z\\sigma\\)</li>' +
                '<li>68–95–99.7 rule: \\(\\pm 1\\sigma\\), \\(\\pm 2\\sigma\\), \\(\\pm 3\\sigma\\) capture 68%, 95%, 99.7%</li>' +
                '<li>Symmetry: \\(P(X > \\mu) = P(X < \\mu) = 0.5\\)</li>' +
                '</ul>'
        }
    ]
};
