const LESSON_STATS_BASIC = {
    id: 'stats-basic',
    title: 'Basic Statistics',
    subtitle: 'Measures of central tendency and spread',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: Measures of Central Tendency ───────────────
        {
            type: 'concept',
            title: 'Measures of Central Tendency',
            content: '<p>A <strong>measure of central tendency</strong> summarises a data set with a single representative value. The three main measures are the mean, median, and mode.</p>' +
                '<div class="lesson-box">' +
                '<strong>Mean:</strong> \\(\\bar{x} = \\dfrac{\\sum x}{n}\\) &nbsp;— add all values, divide by how many there are.<br><br>' +
                '<strong>Median:</strong> the middle value when data is arranged in order.<br>' +
                'For \\(n\\) values: if \\(n\\) is odd, take position \\(\\dfrac{n+1}{2}\\); if \\(n\\) is even, average the two middle values.<br><br>' +
                '<strong>Mode:</strong> the value (or values) that appear most frequently.' +
                '</div>' +
                '<p><strong>When to use each:</strong></p>' +
                '<ul>' +
                '<li><strong>Mean:</strong> best for symmetric data with no extreme values; uses all data points</li>' +
                '<li><strong>Median:</strong> best when data is skewed or contains outliers; not affected by extreme values</li>' +
                '<li><strong>Mode:</strong> best for categorical data, or when the most common value is the key interest</li>' +
                '</ul>' +
                '<p>For a symmetric, bell-shaped distribution the mean, median, and mode are all equal. For a skewed distribution, the mean is pulled toward the tail.</p>'
        },

        // ── 2. Practice: Mean ──────────────────────────────────────
        {
            type: 'practice',
            intro: 'Calculate the mean of the data set:',
            generate: () => STATS_BASIC.qMean()
        },

        // ── 3. Practice: Median ────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the median of the data set:',
            generate: () => STATS_BASIC.qMedian()
        },

        // ── 4. Practice: Mode ──────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the mode of the data set:',
            generate: () => STATS_BASIC.qMode()
        },

        // ── 5. Example: Mean, Median, and Mode ────────────────────
        {
            type: 'example',
            problem: 'Find the mean, median, and mode of the data set: \\(3, 7, 7, 8, 10, 12, 14\\).',
            steps: [
                { text: '<strong>Mean:</strong> Add all values: \\(3 + 7 + 7 + 8 + 10 + 12 + 14 = 61\\). Divide by \\(n = 7\\): \\(\\bar{x} = \\dfrac{61}{7} \\approx 8.71\\).' },
                { text: '<strong>Median:</strong> The data is already in order. With \\(n = 7\\) values, the median is at position \\(\\dfrac{7+1}{2} = 4\\). The 4th value is \\(\\mathbf{8}\\).' },
                { text: '<strong>Mode:</strong> The value \\(7\\) appears twice; all others appear once. The mode is \\(\\mathbf{7}\\).' },
                { text: '<strong>Answer:</strong> Mean \\(\\approx 8.71\\), Median \\(= 8\\), Mode \\(= 7\\).' }
            ]
        },

        // ── 6. Concept: Measures of Spread ────────────────────────
        {
            type: 'concept',
            title: 'Measures of Spread',
            content: '<p>Measures of spread describe how dispersed the data values are around the centre.</p>' +
                '<div class="lesson-box">' +
                '<strong>Range:</strong> \\(\\text{Range} = x_{\\max} - x_{\\min}\\)<br><br>' +
                '<strong>Quartiles:</strong> Split the ordered data into four equal parts.<br>' +
                '\\(Q_1\\) = lower quartile (25th percentile) &nbsp;|&nbsp; \\(Q_2\\) = median (50th) &nbsp;|&nbsp; \\(Q_3\\) = upper quartile (75th)<br><br>' +
                '<strong>Interquartile Range:</strong> \\(\\text{IQR} = Q_3 - Q_1\\)<br><br>' +
                '<strong>Variance:</strong> \\(\\sigma^2 = \\dfrac{\\sum(x - \\bar{x})^2}{n}\\)<br><br>' +
                '<strong>Standard Deviation:</strong> \\(\\sigma = \\sqrt{\\sigma^2} = \\sqrt{\\dfrac{\\sum(x - \\bar{x})^2}{n}}\\)' +
                '</div>' +
                '<p><strong>Interpreting spread:</strong></p>' +
                '<ul>' +
                '<li><strong>Range</strong> is quick but heavily influenced by outliers</li>' +
                '<li><strong>IQR</strong> captures the spread of the middle 50% of data; robust to outliers</li>' +
                '<li><strong>Standard deviation</strong> is the most commonly used measure; same units as the data</li>' +
                '<li>A larger \\(\\sigma\\) means the data is more spread out from the mean</li>' +
                '</ul>'
        },

        // ── 7. Practice: Range ─────────────────────────────────────
        {
            type: 'practice',
            intro: 'Calculate the range of the data set:',
            generate: () => STATS_BASIC.qRange()
        },

        // ── 8. Practice: IQR ───────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the interquartile range (IQR = Q3 − Q1):',
            generate: () => STATS_BASIC.qIQR()
        },

        // ── 9. Practice: Variance and Standard Deviation ──────────
        {
            type: 'practice',
            intro: 'Calculate the variance and standard deviation:',
            generate: () => STATS_BASIC.qVarianceStdDev()
        },

        // ── 10. Example: Standard Deviation Step by Step ──────────
        {
            type: 'example',
            problem: 'Calculate the standard deviation of: \\(2, 4, 4, 6, 6, 8\\).',
            steps: [
                { text: '<strong>Step 1 — Find the mean:</strong> \\(\\bar{x} = \\dfrac{2+4+4+6+6+8}{6} = \\dfrac{30}{6} = 5\\).' },
                { text: '<strong>Step 2 — Find each deviation squared:</strong><br>\\((2-5)^2 = 9, \\quad (4-5)^2 = 1, \\quad (4-5)^2 = 1\\)<br>\\((6-5)^2 = 1, \\quad (6-5)^2 = 1, \\quad (8-5)^2 = 9\\).' },
                { text: '<strong>Step 3 — Sum the squared deviations:</strong> \\(\\sum(x-\\bar{x})^2 = 9+1+1+1+1+9 = 22\\).' },
                { text: '<strong>Step 4 — Variance:</strong> \\(\\sigma^2 = \\dfrac{22}{6} \\approx 3.67\\).' },
                { text: '<strong>Step 5 — Standard deviation:</strong> \\(\\sigma = \\sqrt{3.67} \\approx 1.91\\).' },
                { text: '<strong>Answer:</strong> \\(\\sigma^2 \\approx 3.67\\), \\(\\sigma \\approx 1.91\\).' }
            ]
        },

        // ── 11. Concept: Linear Transformations ───────────────────
        {
            type: 'concept',
            title: 'Linear Transformations of Data',
            content: '<p>When every value in a data set is transformed by \\(Y = aX + b\\), the summary statistics change in predictable ways.</p>' +
                '<div class="lesson-box">' +
                '<strong>Effect on the mean:</strong><br>' +
                '\\(\\bar{y} = a\\bar{x} + b\\)<br><br>' +
                '<strong>Effect on the standard deviation:</strong><br>' +
                '\\(\\sigma_Y = |a| \\cdot \\sigma_X\\)<br><br>' +
                '<strong>Effect on the variance:</strong><br>' +
                '\\(\\sigma_Y^2 = a^2 \\cdot \\sigma_X^2\\)' +
                '</div>' +
                '<p><strong>Key rules to remember:</strong></p>' +
                '<ul>' +
                '<li>Adding a constant \\(b\\) shifts all values — the mean shifts by \\(b\\), but spread does not change</li>' +
                '<li>Multiplying by \\(a\\) scales all values — both the mean and standard deviation are scaled by \\(|a|\\), variance by \\(a^2\\)</li>' +
                '<li>The sign of \\(a\\) does not affect the standard deviation (always take the absolute value)</li>' +
                '</ul>' +
                '<p><strong>Example:</strong> If temperatures in °C have mean \\(20\\) and \\(\\sigma = 5\\), converting to °F using \\(F = 1.8C + 32\\) gives mean \\(= 1.8(20) + 32 = 68\\,°\\text{F}\\) and \\(\\sigma_F = 1.8 \\times 5 = 9\\,°\\text{F}\\).</p>'
        },

        // ── 12. Practice: Linear Transform — Mean ─────────────────
        {
            type: 'practice',
            intro: 'Find the new mean after a linear transformation Y = aX + b:',
            generate: () => STATS_BASIC.qLinearTransformMean()
        },

        // ── 13. Practice: Linear Transform — Standard Deviation ───
        {
            type: 'practice',
            intro: 'Find the new standard deviation after a linear transformation Y = aX + b:',
            generate: () => STATS_BASIC.qLinearTransformSD()
        },

        // ── 14. Practice: Outlier Effect ──────────────────────────
        {
            type: 'practice',
            intro: 'Determine how removing or adding an outlier affects the mean and median:',
            generate: () => STATS_BASIC.qOutlierEffect()
        },

        // ── 15. Practice: Interpret a Statistic ───────────────────
        {
            type: 'practice',
            intro: 'Interpret the given statistical measure in context:',
            generate: () => STATS_BASIC.qInterpretStatistic()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Mean:</strong> \\(\\bar{x} = \\dfrac{\\sum x}{n}\\) — uses all data; sensitive to outliers</li>' +
                '<li><strong>Median:</strong> middle value in ordered data; robust to outliers</li>' +
                '<li><strong>Mode:</strong> most frequent value; suitable for categorical data</li>' +
                '<li><strong>Range:</strong> \\(x_{\\max} - x_{\\min}\\) — quick but affected by outliers</li>' +
                '<li><strong>IQR:</strong> \\(Q_3 - Q_1\\) — spread of the middle 50%; outlier-resistant</li>' +
                '<li><strong>Variance:</strong> \\(\\sigma^2 = \\dfrac{\\sum(x-\\bar{x})^2}{n}\\)</li>' +
                '<li><strong>Standard deviation:</strong> \\(\\sigma = \\sqrt{\\dfrac{\\sum(x-\\bar{x})^2}{n}}\\) — same units as data</li>' +
                '<li><strong>Linear transform</strong> \\(Y = aX + b\\): mean becomes \\(a\\bar{x} + b\\)</li>' +
                '<li><strong>Linear transform</strong> \\(Y = aX + b\\): \\(\\sigma_Y = |a|\\sigma_X\\) and \\(\\sigma_Y^2 = a^2\\sigma_X^2\\)</li>' +
                '<li>Adding a constant shifts the mean only; multiplying scales both mean and spread</li>' +
                '<li>Outliers pull the mean toward the tail; the median is unaffected</li>' +
                '</ul>'
        }
    ]
};
