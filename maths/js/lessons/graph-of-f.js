const LESSON_GRAPH_F = {
    id: 'graph-of-f',
    title: 'Graph of f from f\'',
    subtitle: 'Monotonicity, stationary points, concavity and inflection',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: f' and Monotonicity ──────────────────────
        {
            type: 'concept',
            title: 'Reading f\' to Sketch f',
            content: '<p>The derivative \\(f\'(x)\\) tells us about the <strong>shape</strong> of \\(f(x)\\):</p>' +
                '<div class="lesson-box">' +
                '<strong>Sign of f\':</strong><br>' +
                '\\(f\'(x) > 0\\) \\(\\Rightarrow\\) \\(f\\) is <em>increasing</em> at \\(x\\)<br>' +
                '\\(f\'(x) < 0\\) \\(\\Rightarrow\\) \\(f\\) is <em>decreasing</em> at \\(x\\)<br>' +
                '\\(f\'(x) = 0\\) \\(\\Rightarrow\\) <em>stationary point</em> at \\(x\\)' +
                '</div>' +
                '<p><strong>Stationary point classification:</strong></p>' +
                '<ul>' +
                '<li>\\(f\'\\) changes \\(+\\to-\\): <strong>local maximum</strong></li>' +
                '<li>\\(f\'\\) changes \\(-\\to+\\): <strong>local minimum</strong></li>' +
                '<li>\\(f\'\\) does not change sign: <strong>inflection point</strong></li>' +
                '</ul>' +
                '<p>Example: if \\(f\'(x) = 2x - 4\\), then \\(f\'(x) = 0\\) when \\(x = 2\\). Since \\(f\'\\) changes from negative to positive, \\(x=2\\) is a <strong>local minimum</strong>.</p>'
        },

        // ── 2. Practice: Sign of f' ───────────────────────────────
        {
            type: 'practice',
            intro: 'Determine the sign of f\'(x) at the given point:',
            generate: () => GRAPH_F.qSignFPrime()
        },

        // ── 3. Practice: Monotony from f' ────────────────────────
        {
            type: 'practice',
            intro: 'State whether f is increasing or decreasing on the interval:',
            generate: () => GRAPH_F.qMonotonyFromFPrime()
        },

        // ── 4. Example: Stationary Point Nature ──────────────────
        {
            type: 'example',
            problem: 'For \\(f(x) = x^3 - 3x^2 + 2\\), classify the stationary points.',
            steps: [
                { text: '<strong>Step 1:</strong> Find \\(f\'(x) = 3x^2 - 6x = 3x(x-2)\\).' },
                { text: '<strong>Step 2:</strong> Set \\(f\'(x) = 0\\): \\(x = 0\\) or \\(x = 2\\).' },
                { text: '<strong>Step 3:</strong> Sign table: \\(f\' > 0\\) on \\((-\\infty,0)\\), \\(f\' < 0\\) on \\((0,2)\\), \\(f\' > 0\\) on \\((2,\\infty)\\).' },
                { text: '<strong>Answer:</strong> \\(x=0\\) is a local maximum; \\(x=2\\) is a local minimum.' }
            ]
        },

        // ── 5. Practice: Stationary Nature ───────────────────────
        {
            type: 'practice',
            intro: 'Classify the stationary point of the function:',
            generate: () => GRAPH_F.qStationaryNature()
        },

        // ── 6. Concept: Concavity and Inflection ─────────────────
        {
            type: 'concept',
            title: 'Concavity and Inflection Points',
            content: '<p>The second derivative \\(f\'\'(x)\\) describes the <strong>concavity</strong> of \\(f\\):</p>' +
                '<div class="lesson-box">' +
                '\\(f\'\'(x) > 0\\) \\(\\Rightarrow\\) concave <em>up</em> (cup shape \\(\\cup\\))<br>' +
                '\\(f\'\'(x) < 0\\) \\(\\Rightarrow\\) concave <em>down</em> (cap shape \\(\\cap\\))<br>' +
                '\\(f\'\'(x) = 0\\) and sign changes \\(\\Rightarrow\\) <strong>point of inflection</strong>' +
                '</div>' +
                '<p><strong>Second derivative test for stationary points:</strong></p>' +
                '<ul>' +
                '<li>If \\(f\'(a)=0\\) and \\(f\'\'(a)>0\\): local <strong>minimum</strong></li>' +
                '<li>If \\(f\'(a)=0\\) and \\(f\'\'(a)<0\\): local <strong>maximum</strong></li>' +
                '<li>If \\(f\'\'(a)=0\\): test is inconclusive</li>' +
                '</ul>' +
                '<p>A <strong>point of inflection</strong> is where \\(f\'\'\\) changes sign — the graph switches between concave up and concave down.</p>'
        },

        // ── 7. Practice: Concavity from f'' ──────────────────────
        {
            type: 'practice',
            intro: 'State whether f is concave up or concave down at the given point:',
            generate: () => GRAPH_F.qConcavityFromFDoublePrime()
        },

        // ── 8. Practice: Inflection Point ────────────────────────
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the point of inflection:',
            generate: () => GRAPH_F.qInflectionFromFPrime()
        },

        // ── 9. Example: Global Maximum on Interval ───────────────
        {
            type: 'example',
            problem: 'Find the global maximum of \\(f(x) = -x^2 + 4x + 1\\) on \\([0, 5]\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find stationary points: \\(f\'(x) = -2x + 4 = 0 \\Rightarrow x = 2\\).' },
                { text: '<strong>Step 2:</strong> Evaluate \\(f\\) at critical point and endpoints: \\(f(0) = 1\\), \\(f(2) = 5\\), \\(f(5) = -4\\).' },
                { text: '<strong>Answer:</strong> Global maximum is \\(f(2) = 5\\).' }
            ]
        },

        // ── 10. Practice: Global Max on Interval ─────────────────
        {
            type: 'practice',
            intro: 'Find the global maximum value on the given interval:',
            generate: () => GRAPH_F.qGlobalMaxOnInterval()
        },

        // ── 11. Practice: f' Zero Count ──────────────────────────
        {
            type: 'practice',
            intro: 'How many times does f\'(x) = 0 on the interval?',
            generate: () => GRAPH_F.qFIncreasingCount()
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(f\' > 0\\): \\(f\\) increasing; \\(f\' < 0\\): \\(f\\) decreasing</li>' +
                '<li>\\(f\'(a) = 0\\): stationary point at \\(x = a\\)</li>' +
                '<li>\\(f\'\\) changes \\(+\\to-\\): local max; \\(-\\to+\\): local min</li>' +
                '<li>\\(f\'\' > 0\\): concave up (\\(\\cup\\)); \\(f\'\' < 0\\): concave down (\\(\\cap\\))</li>' +
                '<li>\\(f\'\'\\) changes sign: point of inflection</li>' +
                '<li>Second derivative test: \\(f\'\'(a)>0\\) \\(\\Rightarrow\\) min; \\(f\'\'(a)<0\\) \\(\\Rightarrow\\) max</li>' +
                '<li>Global max/min: compare stationary values with endpoint values</li>' +
                '</ul>'
        }
    ]
};
