const LESSON_BINOM_DIST = {
    id: 'binomial-distribution',
    title: 'Binomial Distribution',
    subtitle: 'X ~ B(n, p): probabilities, mean, and variance',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: The Binomial Distribution ─────────────────
        {
            type: 'concept',
            title: 'The Binomial Distribution',
            content: '<p>The <strong>binomial distribution</strong> models the number of successes in a fixed number of independent trials. We write \\(X \\sim B(n, p)\\).</p>' +
                '<p><strong>Conditions (all four must hold):</strong></p>' +
                '<ul>' +
                '<li><strong>Fixed trials:</strong> the number of trials \\(n\\) is fixed in advance</li>' +
                '<li><strong>Independence:</strong> the outcome of each trial does not affect any other</li>' +
                '<li><strong>Constant probability:</strong> the probability of success \\(p\\) is the same for every trial</li>' +
                '<li><strong>Two outcomes:</strong> each trial results in either a success or a failure</li>' +
                '</ul>' +
                '<p>The probability of exactly \\(k\\) successes is given by:</p>' +
                '<div class="lesson-box">' +
                '\\(P(X = k) = \\dbinom{n}{k} p^k (1-p)^{n-k}\\)<br><br>' +
                'where \\(\\dbinom{n}{k} = \\dfrac{n!}{k!(n-k)!}\\) is the number of ways to choose \\(k\\) successes from \\(n\\) trials.' +
                '</div>'
        },

        // ── 2. Example: Calculating P(X = k) ──────────────────────
        {
            type: 'example',
            problem: 'Given \\(X \\sim B(5,\\, 0.3)\\), find \\(P(X = 2)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify values: \\(n = 5\\), \\(p = 0.3\\), \\(k = 2\\).' },
                { text: '<strong>Step 2:</strong> Calculate the binomial coefficient: \\(\\dbinom{5}{2} = \\dfrac{5!}{2!\\,3!} = 10\\).' },
                { text: '<strong>Step 3:</strong> Substitute into the formula: \\(P(X = 2) = 10 \\times 0.3^2 \\times 0.7^3\\).' },
                { text: '<strong>Step 4:</strong> Evaluate: \\(= 10 \\times 0.09 \\times 0.343 = 0.3087\\).' },
                { text: '<strong>Answer:</strong> \\(P(X = 2) = 0.3087\\).' }
            ]
        },

        // ── 3. Practice: P(X = k) ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the exact probability P(X = k):',
            generate: () => BINOM_DIST.qProbExact()
        },

        // ── 4. Concept: Mean and Variance ─────────────────────────
        {
            type: 'concept',
            title: 'Mean and Variance',
            content: '<p>For \\(X \\sim B(n, p)\\), the mean, variance, and standard deviation are:</p>' +
                '<div class="lesson-box">' +
                '<strong>Mean:</strong> \\(\\text{E}(X) = np\\)<br><br>' +
                '<strong>Variance:</strong> \\(\\text{Var}(X) = np(1-p)\\)<br><br>' +
                '<strong>Standard deviation:</strong> \\(\\text{SD}(X) = \\sqrt{np(1-p)}\\)' +
                '</div>' +
                '<p><strong>Skewness of the distribution:</strong></p>' +
                '<ul>' +
                '<li><strong>Symmetric</strong> when \\(p = 0.5\\)</li>' +
                '<li><strong>Right-skewed</strong> (positive skew) when \\(p < 0.5\\)</li>' +
                '<li><strong>Left-skewed</strong> (negative skew) when \\(p > 0.5\\)</li>' +
                '</ul>'
        },

        // ── 5. Practice: Mean ──────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the mean of the binomial distribution:',
            generate: () => BINOM_DIST.qMeanBinomial()
        },

        // ── 6. Practice: Variance ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the variance of the binomial distribution:',
            generate: () => BINOM_DIST.qVarianceBinomial()
        },

        // ── 7. Practice: Skewness ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Identify the skewness of the distribution:',
            generate: () => BINOM_DIST.qSymmetry()
        },

        // ── 8. Concept: Cumulative Probabilities ───────────────────
        {
            type: 'concept',
            title: 'Cumulative Probabilities',
            content: '<p><strong>Cumulative probabilities</strong> involve summing individual binomial probabilities over a range of values.</p>' +
                '<div class="lesson-box">' +
                '\\(P(X \\leq k) = \\displaystyle\\sum_{i=0}^{k} P(X = i)\\)<br><br>' +
                '\\(P(X \\geq k) = 1 - P(X \\leq k - 1)\\)<br><br>' +
                '\\(P(a \\leq X \\leq b) = P(X \\leq b) - P(X \\leq a - 1)\\)' +
                '</div>' +
                '<p>These can be found using a <strong>GDC</strong> (binomial CDF function) or by summing individual \\(P(X = k)\\) values manually. Always check whether the inequality is strict (\\(<\\)) or non-strict (\\(\\leq\\)).</p>'
        },

        // ── 9. Example: Finding P(X ≥ k) ──────────────────────────
        {
            type: 'example',
            problem: 'Given \\(X \\sim B(4,\\, 0.25)\\), find \\(P(X \\geq 2)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Use the complement rule: \\(P(X \\geq 2) = 1 - P(X \\leq 1) = 1 - P(X = 0) - P(X = 1)\\).' },
                { text: '<strong>Step 2:</strong> Calculate \\(P(X = 0) = \\dbinom{4}{0} \\times 0.25^0 \\times 0.75^4 = 0.75^4 = 0.3164\\).' },
                { text: '<strong>Step 3:</strong> Calculate \\(P(X = 1) = \\dbinom{4}{1} \\times 0.25^1 \\times 0.75^3 = 4 \\times 0.25 \\times 0.421875 = 0.4219\\).' },
                { text: '<strong>Step 4:</strong> Combine: \\(P(X \\geq 2) = 1 - 0.3164 - 0.4219 = 1 - 0.7383 = 0.2617\\).' },
                { text: '<strong>Answer:</strong> \\(P(X \\geq 2) = 0.2617\\).' }
            ]
        },

        // ── 10. Practice: P(X ≤ k) ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(X ≤ k):',
            generate: () => BINOM_DIST.qProbAtMost()
        },

        // ── 11. Practice: P(X ≥ k) ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(X ≥ k):',
            generate: () => BINOM_DIST.qProbAtLeast()
        },

        // ── 12. Practice: P(a ≤ X ≤ b) ────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(a ≤ X ≤ b):',
            generate: () => BINOM_DIST.qProbBetween()
        },

        // ── 13. Practice: Find p given mean ───────────────────────
        {
            type: 'practice',
            intro: 'Find the parameter p given the mean:',
            generate: () => BINOM_DIST.qFindMeanGivenVariance()
        },

        // ── 14. Practice: Find n ───────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the number of trials n:',
            generate: () => BINOM_DIST.qFindN()
        },

        // ── 15. Practice: Mode ─────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the most likely value (mode):',
            generate: () => BINOM_DIST.qMostLikely()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(X \\sim B(n, p)\\): \\(n\\) fixed independent trials, each with probability of success \\(p\\)</li>' +
                '<li>\\(P(X = k) = \\dbinom{n}{k} p^k (1-p)^{n-k}\\)</li>' +
                '<li>\\(\\text{E}(X) = np\\)</li>' +
                '<li>\\(\\text{Var}(X) = np(1-p)\\)</li>' +
                '<li>\\(P(X \\geq k) = 1 - P(X \\leq k - 1)\\)</li>' +
                '<li>Symmetric if \\(p = 0.5\\); right-skewed if \\(p < 0.5\\); left-skewed if \\(p > 0.5\\)</li>' +
                '<li>Mode \\(\\approx \\lfloor (n+1)p \\rfloor\\)</li>' +
                '</ul>'
        }
    ]
};
