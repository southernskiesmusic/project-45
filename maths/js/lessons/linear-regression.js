const LESSON_LIN_REG = {
    id: 'linear-regression',
    title: 'Linear Regression',
    subtitle: 'Regression lines, correlation, and predictions',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: Scatter Diagrams & Correlation ─────────────
        {
            type: 'concept',
            title: 'Scatter Diagrams & Correlation',
            content: '<p>A <strong>scatter diagram</strong> plots pairs of data values and shows the relationship between two variables.</p>' +
                '<p><strong>Direction of correlation:</strong></p>' +
                '<ul>' +
                '<li><strong>Positive:</strong> both variables increase together</li>' +
                '<li><strong>Negative:</strong> one increases as the other decreases</li>' +
                '<li><strong>Zero:</strong> no pattern — no linear relationship</li>' +
                '</ul>' +
                '<p><strong>Strength of correlation</strong> (measured by Pearson\'s \\(r\\), where \\(r \\in [-1, 1]\\)):</p>' +
                '<div class="lesson-box">' +
                '<strong>Strong:</strong> \\(|r| > 0.9\\)<br>' +
                '<strong>Moderate:</strong> \\(0.5 < |r| < 0.9\\)<br>' +
                '<strong>Weak:</strong> \\(|r| < 0.5\\)' +
                '</div>' +
                '<p>\\(r = 1\\) means perfect positive correlation; \\(r = -1\\) means perfect negative correlation; \\(r = 0\\) means no linear correlation.</p>'
        },

        // ── 2. Practice: Correlation sign ─────────────────────────
        {
            type: 'practice',
            intro: 'Describe the correlation from the context:',
            generate: () => LIN_REG.qCorrelationSign()
        },

        // ── 3. Practice: Correlation strength ─────────────────────
        {
            type: 'practice',
            intro: 'Describe the strength and direction of correlation:',
            generate: () => LIN_REG.qCorrelationStrength()
        },

        // ── 4. Concept: The Regression Line ───────────────────────
        {
            type: 'concept',
            title: 'The Regression Line',
            content: '<p>The <strong>regression line of \\(y\\) on \\(x\\)</strong> is the line of best fit written as:</p>' +
                '<div class="lesson-box">' +
                '\\(\\hat{y} = a + bx\\)<br><br>' +
                '<strong>\\(b\\)</strong> = gradient — the rate of change of \\(y\\) per unit increase in \\(x\\)<br>' +
                '<strong>\\(a\\)</strong> = \\(y\\)-intercept — the predicted value of \\(y\\) when \\(x = 0\\)' +
                '</div>' +
                '<p>Key properties:</p>' +
                '<ul>' +
                '<li>The regression line always passes through the mean point \\((\\bar{x},\\, \\bar{y})\\)</li>' +
                '<li>It is found by the <strong>method of least squares</strong> — it minimises the sum of squared residuals (vertical distances from each point to the line)</li>' +
                '<li>Use your GDC to find \\(a\\) and \\(b\\) in the IB exam</li>' +
                '</ul>'
        },

        // ── 5. Example: Using the Regression Line ─────────────────
        {
            type: 'example',
            problem: 'A regression line is given as \\(\\hat{y} = 5 + 2.5x\\), where \\(x\\) = hours studied and \\(y\\) = test score. (a) Predict the score for 6 hours of study. (b) Interpret the gradient.',
            steps: [
                { text: '<strong>Part (a) — Predict \\(\\hat{y}\\) when \\(x = 6\\):</strong>' },
                { text: 'Substitute \\(x = 6\\): \\(\\hat{y} = 5 + 2.5(6) = 5 + 15 = 20\\).' },
                { text: '<strong>Part (b) — Interpret \\(b = 2.5\\):</strong>' },
                { text: 'For each additional hour of study, the predicted test score increases by 2.5 marks.' },
                { text: '<strong>Note:</strong> the \\(y\\)-intercept \\(a = 5\\) is the predicted score for zero hours of study.' }
            ]
        },

        // ── 6. Practice: Predict ŷ ────────────────────────────────
        {
            type: 'practice',
            intro: 'Predict ŷ for the given x:',
            generate: () => LIN_REG.qPredictY()
        },

        // ── 7. Practice: Find x ───────────────────────────────────
        {
            type: 'practice',
            intro: 'Find x given the predicted value:',
            generate: () => LIN_REG.qFindX()
        },

        // ── 8. Practice: Interpret gradient ───────────────────────
        {
            type: 'practice',
            intro: 'Interpret the gradient of the regression line:',
            generate: () => LIN_REG.qInterpretGradient()
        },

        // ── 9. Practice: Interpret y-intercept ────────────────────
        {
            type: 'practice',
            intro: 'Interpret the y-intercept:',
            generate: () => LIN_REG.qInterpretIntercept()
        },

        // ── 10. Concept: Interpolation, Extrapolation & R² ────────
        {
            type: 'concept',
            title: 'Interpolation, Extrapolation & R²',
            content: '<p>When using a regression line to make predictions, consider whether the \\(x\\)-value is inside or outside the data range:</p>' +
                '<div class="lesson-box">' +
                '<strong>Interpolation:</strong> predicting within the data range — generally <em>reliable</em><br><br>' +
                '<strong>Extrapolation:</strong> predicting outside the data range — generally <em>unreliable</em>, as the relationship may not hold beyond the observed data' +
                '</div>' +
                '<p><strong>The coefficient of determination \\(R^2\\)</strong>:</p>' +
                '<ul>' +
                '<li>\\(R^2 = r^2\\), so \\(R^2 \\in [0, 1]\\)</li>' +
                '<li>It represents the <strong>proportion of variation in \\(y\\) explained by \\(x\\)</strong></li>' +
                '<li>Example: \\(R^2 = 0.81\\) means 81% of the variation in \\(y\\) is explained by the linear relationship with \\(x\\)</li>' +
                '<li>The remaining 19% is due to other factors or random variation</li>' +
                '</ul>'
        },

        // ── 11. Practice: Interpolation or extrapolation ──────────
        {
            type: 'practice',
            intro: 'Identify whether this is interpolation or extrapolation:',
            generate: () => LIN_REG.qInterpolation()
        },

        // ── 12. Practice: Interpret R² ────────────────────────────
        {
            type: 'practice',
            intro: 'Interpret the R² value:',
            generate: () => LIN_REG.qRSquared()
        },

        // ── 13. Practice: y-intercept from means ──────────────────
        {
            type: 'practice',
            intro: 'Find the y-intercept a given the means:',
            generate: () => LIN_REG.qMeanPassThrough()
        },

        // ── 14. Practice: Residual ────────────────────────────────
        {
            type: 'practice',
            intro: 'Calculate the residual for the given data point:',
            generate: () => LIN_REG.qResidual()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Regression line:</strong> \\(\\hat{y} = a + bx\\)</li>' +
                '<li>Always passes through the mean point \\((\\bar{x},\\, \\bar{y})\\)</li>' +
                '<li><strong>\\(b\\)</strong> = gradient — rate of change of \\(y\\) per unit increase in \\(x\\)</li>' +
                '<li><strong>\\(a\\)</strong> = \\(y\\)-intercept — predicted \\(y\\) when \\(x = 0\\)</li>' +
                '<li>Pearson\'s \\(r \\in [-1, 1]\\): positive → both increase; negative → one increases, other decreases</li>' +
                '<li>Strong: \\(|r| > 0.9\\); moderate: \\(0.5 < |r| < 0.9\\); weak: \\(|r| < 0.5\\)</li>' +
                '<li>\\(R^2 = r^2\\) — proportion of variation in \\(y\\) explained by \\(x\\)</li>' +
                '<li>Interpolation (within range) is reliable; extrapolation (outside range) is unreliable</li>' +
                '</ul>'
        }
    ]
};
