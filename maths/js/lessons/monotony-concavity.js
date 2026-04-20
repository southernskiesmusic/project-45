const LESSON_MONOTONY = {
    id: 'monotony-concavity',
    title: 'Monotony & Concavity',
    subtitle: 'Increasing/decreasing intervals and concavity',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Increasing & Decreasing ───────────────────
        {
            type: 'concept',
            title: 'Increasing & Decreasing',
            content: '<p>A function is <strong>increasing</strong> on an interval when its derivative is positive there, <strong>decreasing</strong> when negative, and <strong>stationary</strong> at a point where the derivative equals zero.</p>' +
                '<div class="lesson-box">' +
                '\\(f\'(x) > 0\\) on an interval \\(\\Rightarrow\\) \\(f\\) is <strong>increasing</strong> on that interval<br>' +
                '\\(f\'(x) < 0\\) on an interval \\(\\Rightarrow\\) \\(f\\) is <strong>decreasing</strong> on that interval<br>' +
                '\\(f\'(x_0) = 0\\) \\(\\Rightarrow\\) \\(f\\) has a <strong>stationary point</strong> at \\(x_0\\)' +
                '</div>' +
                '<p>To find where a function increases or decreases:</p>' +
                '<ol>' +
                '<li>Differentiate to find \\(f\'(x)\\)</li>' +
                '<li>Solve \\(f\'(x) = 0\\) to locate stationary points</li>' +
                '<li>Test the sign of \\(f\'(x)\\) in each interval between stationary points</li>' +
                '</ol>'
        },

        // ── 2. Practice: Find f'(p) at a point ────────────────────
        {
            type: 'practice',
            intro: 'Find f\'(p) at the given point:',
            generate: () => MONOTONY.qFPrimeValue()
        },

        // ── 3. Practice: Increasing, decreasing, or stationary? ───
        {
            type: 'practice',
            intro: 'Is the function increasing, decreasing, or stationary?',
            generate: () => MONOTONY.qIncreasingAt()
        },

        // ── 4. Practice: Find the positive stationary point ───────
        {
            type: 'practice',
            intro: 'Find the positive stationary point:',
            generate: () => MONOTONY.qStationaryX()
        },

        // ── 5. Example: Finding Increasing Intervals ──────────────
        {
            type: 'example',
            problem: 'Find the intervals on which \\(f(x) = x^3 - 3x\\) is increasing.',
            steps: [
                { text: '<strong>Step 1:</strong> Differentiate: \\(f\'(x) = 3x^2 - 3\\).' },
                { text: '<strong>Step 2:</strong> Factorise: \\(f\'(x) = 3(x^2 - 1) = 3(x - 1)(x + 1)\\).' },
                { text: '<strong>Step 3:</strong> Solve \\(f\'(x) = 0\\): stationary points at \\(x = -1\\) and \\(x = 1\\).' },
                { text: '<strong>Step 4:</strong> Test signs: \\(f\'(x) > 0\\) when \\(x < -1\\) or \\(x > 1\\).' },
                { text: '<strong>Answer:</strong> \\(f\\) is increasing on \\((-\\infty, -1)\\) and \\((1, +\\infty)\\).' }
            ]
        },

        // ── 6. Practice: Find increasing intervals ────────────────
        {
            type: 'practice',
            intro: 'Find the intervals where f is increasing:',
            generate: () => MONOTONY.qIncreasingInterval()
        },

        // ── 7. Concept: Classifying Stationary Points ─────────────
        {
            type: 'concept',
            title: 'Classifying Stationary Points',
            content: '<p>Once a stationary point \\(x_0\\) (where \\(f\'(x_0) = 0\\)) is found, the <strong>second derivative test</strong> classifies its nature.</p>' +
                '<div class="lesson-box">' +
                '\\(f\'(x_0) = 0\\) and \\(f\'\'(x_0) < 0\\) \\(\\Rightarrow\\) <strong>local maximum</strong><br>' +
                '\\(f\'(x_0) = 0\\) and \\(f\'\'(x_0) > 0\\) \\(\\Rightarrow\\) <strong>local minimum</strong><br>' +
                '\\(f\'(x_0) = 0\\) and \\(f\'\'(x_0) = 0\\) \\(\\Rightarrow\\) <strong>inconclusive</strong> (use sign change of \\(f\'\\))' +
                '</div>' +
                '<p>When the second derivative test is inconclusive, check whether \\(f\'\\) changes sign around \\(x_0\\):</p>' +
                '<ul>' +
                '<li>\\(f\'\\) changes \\(+\\) to \\(-\\): local maximum</li>' +
                '<li>\\(f\'\\) changes \\(-\\) to \\(+\\): local minimum</li>' +
                '<li>\\(f\'\\) does not change sign: neither (saddle / horizontal inflection)</li>' +
                '</ul>'
        },

        // ── 8. Practice: Classify the stationary point ────────────
        {
            type: 'practice',
            intro: 'Classify the stationary point:',
            generate: () => MONOTONY.qNatureStationary()
        },

        // ── 9. Practice: Find the y-value at the local maximum ────
        {
            type: 'practice',
            intro: 'Find the y-value at the local maximum:',
            generate: () => MONOTONY.qLocalMaxY()
        },

        // ── 10. Concept: Concavity & Inflection ───────────────────
        {
            type: 'concept',
            title: 'Concavity & Inflection',
            content: '<p><strong>Concavity</strong> describes whether a curve bends upward (like a smile) or downward (like a frown), determined by the sign of the second derivative.</p>' +
                '<div class="lesson-box">' +
                '\\(f\'\'(x) > 0\\) on an interval \\(\\Rightarrow\\) <strong>concave up</strong> (smile \\(\\cup\\))<br>' +
                '\\(f\'\'(x) < 0\\) on an interval \\(\\Rightarrow\\) <strong>concave down</strong> (frown \\(\\cap\\))<br>' +
                '<strong>Inflection point:</strong> \\(f\'\'(x_0) = 0\\) <em>and</em> \\(f\'\'\\) changes sign at \\(x_0\\)' +
                '</div>' +
                '<p>Important: \\(f\'\'(x_0) = 0\\) alone is not sufficient for an inflection point — the second derivative must actually change sign. Always verify the sign change on both sides.</p>'
        },

        // ── 11. Example: Finding Inflection Point ─────────────────
        {
            type: 'example',
            problem: 'Find the inflection point of \\(f(x) = x^3 - 3x^2 + 2\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the second derivative: \\(f\'(x) = 3x^2 - 6x\\), so \\(f\'\'(x) = 6x - 6\\).' },
                { text: '<strong>Step 2:</strong> Set \\(f\'\'(x) = 0\\): \\(6x - 6 = 0 \\Rightarrow x = 1\\).' },
                { text: '<strong>Step 3:</strong> Check sign change: \\(f\'\'(0) = -6 < 0\\) (concave down for \\(x < 1\\)); \\(f\'\'(2) = 6 > 0\\) (concave up for \\(x > 1\\)).' },
                { text: '<strong>Step 4:</strong> Sign does change, so there is an inflection point at \\(x = 1\\).' },
                { text: '<strong>Answer:</strong> Inflection point at \\(x = 1\\).' }
            ]
        },

        // ── 12. Practice: Find f''(p) at a point ──────────────────
        {
            type: 'practice',
            intro: 'Find f\'\'(p) at the given point:',
            generate: () => MONOTONY.qSecondDerivValue()
        },

        // ── 13. Practice: Concave up or concave down? ─────────────
        {
            type: 'practice',
            intro: 'Is the function concave up or concave down?',
            generate: () => MONOTONY.qConcavityAt()
        },

        // ── 14. Practice: Find the inflection x-coordinate ────────
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the inflection point:',
            generate: () => MONOTONY.qInflectionX()
        },

        // ── 15. Practice: Condition for always increasing ─────────
        {
            type: 'practice',
            intro: 'Find the condition for f to always be increasing:',
            generate: () => MONOTONY.qAlwaysIncreasing()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(f\'(x) > 0\\) on an interval \\(\\Rightarrow\\) \\(f\\) is <strong>increasing</strong></li>' +
                '<li>\\(f\'(x) < 0\\) on an interval \\(\\Rightarrow\\) \\(f\\) is <strong>decreasing</strong></li>' +
                '<li>\\(f\'(x_0) = 0\\) \\(\\Rightarrow\\) <strong>stationary point</strong> at \\(x_0\\)</li>' +
                '<li>\\(f\'\'(x) > 0\\) \\(\\Rightarrow\\) <strong>concave up</strong> (smile)</li>' +
                '<li>\\(f\'\'(x) < 0\\) \\(\\Rightarrow\\) <strong>concave down</strong> (frown)</li>' +
                '<li>\\(f\'\'(x_0) = 0\\) <em>and</em> sign change \\(\\Rightarrow\\) <strong>inflection point</strong></li>' +
                '<li>Local <strong>max</strong>: \\(f\'(x_0) = 0\\) and \\(f\'\'(x_0) < 0\\)</li>' +
                '<li>Local <strong>min</strong>: \\(f\'(x_0) = 0\\) and \\(f\'\'(x_0) > 0\\)</li>' +
                '</ul>'
        }
    ]
};
