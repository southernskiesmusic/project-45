const LESSON_DISCRETE_DIST = {
    id: 'discrete-distributions',
    title: 'Discrete Distributions',
    subtitle: 'Expected value, variance, and probability tables',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: Discrete Probability Distributions ────────
        {
            type: 'concept',
            title: 'Discrete Probability Distributions',
            content: '<p>A <strong>discrete probability distribution</strong> lists all possible values of a random variable \\(X\\) alongside their probabilities.</p>' +
                '<div class="lesson-box">' +
                '<strong>Probability table:</strong><br><br>' +
                '\\[\\begin{array}{c|cccc} x & x_1 & x_2 & x_3 & \\cdots \\\\ \\hline P(X=x) & p_1 & p_2 & p_3 & \\cdots \\end{array}\\]' +
                '<br><strong>Two requirements:</strong><br>' +
                '1. All probabilities are non-negative: \\(P(X = x_i) \\geq 0\\) for all \\(i\\)<br>' +
                '2. Probabilities sum to one: \\(\\displaystyle\\sum_i P(X = x_i) = 1\\)' +
                '</div>' +
                '<p>The <strong>mode</strong> is the value of \\(X\\) with the highest probability — the most likely outcome.</p>' +
                '<ul>' +
                '<li>If two values share the highest probability, the distribution is <strong>bimodal</strong></li>' +
                '<li>Every valid distribution must satisfy \\(\\Sigma P = 1\\) exactly</li>' +
                '</ul>'
        },

        // ── 2. Practice: Find Missing Probability ─────────────────
        {
            type: 'practice',
            intro: 'Find the missing probability so the table is valid:',
            generate: () => DISCRETE_DIST.qFindMissingProb()
        },

        // ── 3. Practice: Mode ─────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the most likely value (mode):',
            generate: () => DISCRETE_DIST.qMode()
        },

        // ── 4. Practice: P(X > k) ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(X > k) from the table:',
            generate: () => DISCRETE_DIST.qProbGreater()
        },

        // ── 5. Practice: P(X ≥ k) ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(X \u2265 k) from the table:',
            generate: () => DISCRETE_DIST.qProbAtLeast()
        },

        // ── 6. Practice: P(a ≤ X ≤ b) ────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(a \u2264 X \u2264 b) from the table:',
            generate: () => DISCRETE_DIST.qProbBetween()
        },

        // ── 7. Practice: P(X ≤ k) ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(X \u2264 k) from the table:',
            generate: () => DISCRETE_DIST.qCumulativeProb()
        },

        // ── 8. Concept: Expected Value and Variance ───────────────
        {
            type: 'concept',
            title: 'Expected Value and Variance',
            content: '<p>The <strong>expected value</strong> \\(E(X)\\) is the long-run average outcome — a weighted mean of all values using their probabilities as weights.</p>' +
                '<div class="lesson-box">' +
                '\\[E(X) = \\sum_i x_i \\cdot P(X = x_i)\\]' +
                '<br>' +
                '\\[E(X^2) = \\sum_i x_i^2 \\cdot P(X = x_i)\\]' +
                '<br>' +
                '\\[\\text{Var}(X) = E(X^2) - [E(X)]^2\\]' +
                '<br>' +
                '\\[\\text{SD}(X) = \\sqrt{\\text{Var}(X)}\\]' +
                '</div>' +
                '<p>Key points:</p>' +
                '<ul>' +
                '<li>\\(E(X)\\) need not be a value in the table — it is the long-run average</li>' +
                '<li>\\(\\text{Var}(X) \\geq 0\\) always; a larger variance means more spread</li>' +
                '<li>\\(\\text{SD}(X)\\) is in the same units as \\(X\\)</li>' +
                '</ul>'
        },

        // ── 9. Example: Calculating E(X) ──────────────────────────
        {
            type: 'example',
            problem: 'Find \\(E(X)\\), \\(E(X^2)\\), and \\(\\text{Var}(X)\\) for the distribution below.' +
                '\\[\\begin{array}{c|cccc} x & 0 & 1 & 2 & 3 \\\\ \\hline P(X=x) & 0.2 & 0.4 & 0.3 & 0.1 \\end{array}\\]',
            steps: [
                { text: '<strong>Step 1 — E(X):</strong> Multiply each value by its probability and sum.<br>\\(E(X) = 0(0.2) + 1(0.4) + 2(0.3) + 3(0.1) = 0 + 0.4 + 0.6 + 0.3 = 1.3\\)' },
                { text: '<strong>Step 2 — E(X²):</strong> Multiply each squared value by its probability and sum.<br>\\(E(X^2) = 0^2(0.2) + 1^2(0.4) + 2^2(0.3) + 3^2(0.1) = 0 + 0.4 + 1.2 + 0.9 = 2.5\\)' },
                { text: '<strong>Step 3 — Var(X):</strong> Apply the formula \\(\\text{Var}(X) = E(X^2) - [E(X)]^2\\).<br>\\(\\text{Var}(X) = 2.5 - (1.3)^2 = 2.5 - 1.69 = 0.81\\)' },
                { text: '<strong>Answer:</strong> \\(E(X) = 1.3\\), \\(E(X^2) = 2.5\\), \\(\\text{Var}(X) = 0.81\\).' }
            ]
        },

        // ── 10. Practice: Expected Value ──────────────────────────
        {
            type: 'practice',
            intro: 'Find E(X) from the distribution:',
            generate: () => DISCRETE_DIST.qExpectedValue()
        },

        // ── 11. Practice: Variance ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find Var(X) from the distribution:',
            generate: () => DISCRETE_DIST.qVariance()
        },

        // ── 12. Concept: Linear Transformations ───────────────────
        {
            type: 'concept',
            title: 'Linear Transformations',
            content: '<p>If \\(Y = aX + b\\) is a linear transformation of \\(X\\), the mean and variance transform as follows:</p>' +
                '<div class="lesson-box">' +
                '\\[E(aX + b) = a \\cdot E(X) + b\\]' +
                '<br>' +
                '\\[\\text{Var}(aX + b) = a^2 \\cdot \\text{Var}(X)\\]' +
                '<br>' +
                '\\[\\text{SD}(aX + b) = |a| \\cdot \\text{SD}(X)\\]' +
                '</div>' +
                '<p>Important observations:</p>' +
                '<ul>' +
                '<li>Adding a constant \\(b\\) <strong>shifts</strong> the mean but has <strong>no effect</strong> on variance or SD</li>' +
                '<li>Multiplying by \\(a\\) <strong>scales</strong> the mean by \\(a\\) and the variance by \\(a^2\\)</li>' +
                '<li>SD scales by \\(|a|\\) (absolute value, since SD cannot be negative)</li>' +
                '</ul>'
        },

        // ── 13. Example: Linear Transform ────────────────────────
        {
            type: 'example',
            problem: 'Given \\(E(X) = 3\\) and \\(\\text{Var}(X) = 4\\), find \\(E(2X + 5)\\) and \\(\\text{Var}(2X + 5)\\).',
            steps: [
                { text: '<strong>Step 1 — E(2X + 5):</strong> Apply \\(E(aX+b) = a\\,E(X) + b\\) with \\(a = 2\\), \\(b = 5\\).<br>\\(E(2X + 5) = 2(3) + 5 = 6 + 5 = 11\\)' },
                { text: '<strong>Step 2 — Var(2X + 5):</strong> Apply \\(\\text{Var}(aX+b) = a^2\\,\\text{Var}(X)\\). Note \\(b\\) disappears.<br>\\(\\text{Var}(2X + 5) = 2^2 \\cdot 4 = 4 \\times 4 = 16\\)' },
                { text: '<strong>Answer:</strong> \\(E(2X + 5) = 11\\), \\(\\text{Var}(2X + 5) = 16\\).' }
            ]
        },

        // ── 14. Practice: E(aX + b) ───────────────────────────────
        {
            type: 'practice',
            intro: 'Find E(aX+b):',
            generate: () => DISCRETE_DIST.qLinearTransformMean()
        },

        // ── 15. Practice: Var(aX + b) ─────────────────────────────
        {
            type: 'practice',
            intro: 'Find Var(aX+b):',
            generate: () => DISCRETE_DIST.qLinearTransformVar()
        },

        // ── 16. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\displaystyle\\sum P(X = x_i) = 1\\) and all \\(P \\geq 0\\)</li>' +
                '<li><strong>Mode</strong> = value with the highest probability</li>' +
                '<li>\\(E(X) = \\displaystyle\\sum x_i\\, p_i\\)</li>' +
                '<li>\\(E(X^2) = \\displaystyle\\sum x_i^2\\, p_i\\)</li>' +
                '<li>\\(\\text{Var}(X) = E(X^2) - [E(X)]^2\\)</li>' +
                '<li>\\(E(aX + b) = a\\,E(X) + b\\)</li>' +
                '<li>\\(\\text{Var}(aX + b) = a^2\\,\\text{Var}(X)\\)</li>' +
                '<li>Adding a constant \\(b\\) does <strong>not</strong> affect variance or SD</li>' +
                '</ul>'
        }
    ]
};
