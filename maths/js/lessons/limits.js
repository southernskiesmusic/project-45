const LESSON_LIMITS = {
    id: 'limits',
    title: 'Limits and Continuity',
    subtitle: 'Direct substitution, one-sided limits, continuity and L\'Hôpital',
    folder: 'calculus',
    screens: [
        {
            type: 'concept',
            title: 'Limits',
            content: '<p>The <strong>limit</strong> of \\(f(x)\\) as \\(x\\) approaches \\(a\\) is the value \\(f(x)\\) gets arbitrarily close to:</p>' +
                '<div class="lesson-box">' +
                '\\(\\displaystyle\\lim_{x \\to a} f(x) = L\\)<br><br>' +
                '<strong>Direct substitution:</strong> if \\(f\\) is continuous at \\(a\\), then \\(\\displaystyle\\lim_{x\\to a}f(x) = f(a)\\)<br><br>' +
                '<strong>Factoring:</strong> cancel common factors before substituting.' +
                '</div>' +
                '<p><strong>Example:</strong> \\(\\displaystyle\\lim_{x\\to 2}\\frac{x^2-4}{x-2} = \\lim_{x\\to 2}(x+2) = 4\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Evaluate the limit by direct substitution:',
            generate: () => LIMITS.qLimitBySubstitution()
        },
        {
            type: 'practice',
            intro: 'Evaluate the limit of the rational expression:',
            generate: () => LIMITS.qLimitRational()
        },
        {
            type: 'example',
            problem: 'Find \\(\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x+1}{x-2}\\).',
            steps: [
                { text: '<strong>Divide numerator and denominator by \\(x\\):</strong> \\(\\dfrac{3+1/x}{1-2/x}\\).' },
                { text: '<strong>As \\(x\\to\\infty\\):</strong> \\(1/x \\to 0\\), so the expression \\(\\to 3/1 = 3\\).' },
                { text: '<strong>Answer:</strong> \\(\\displaystyle\\lim_{x\\to\\infty}\\dfrac{3x+1}{x-2} = 3\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Find the limit as x approaches infinity:',
            generate: () => LIMITS.qLimitAtInfinity()
        },
        {
            type: 'practice',
            intro: 'Evaluate the limit of the polynomial:',
            generate: () => LIMITS.qLimitPolynomial()
        },
        {
            type: 'concept',
            title: 'Continuity and One-Sided Limits',
            content: '<p>A function is <strong>continuous</strong> at \\(x = a\\) if:</p>' +
                '<div class="lesson-box">' +
                '1. \\(f(a)\\) is defined<br>' +
                '2. \\(\\displaystyle\\lim_{x\\to a}f(x)\\) exists<br>' +
                '3. \\(\\displaystyle\\lim_{x\\to a}f(x) = f(a)\\)' +
                '</div>' +
                '<p><strong>One-sided limits:</strong> \\(\\displaystyle\\lim_{x\\to a^-}f(x)\\) (from left) and \\(\\displaystyle\\lim_{x\\to a^+}f(x)\\) (from right).<br>' +
                'The limit exists iff both one-sided limits are equal.</p>' +
                '<p><strong>Removable discontinuity:</strong> limit exists but \\(f(a)\\) is undefined or \\(f(a)\\neq L\\). A <strong>vertical asymptote</strong> is non-removable.</p>'
        },
        {
            type: 'practice',
            intro: 'Find the one-sided limit for the piecewise function:',
            generate: () => LIMITS.qOneSidedLimit()
        },
        {
            type: 'practice',
            intro: 'Determine whether the function is continuous at the point:',
            generate: () => LIMITS.qContinuityCheck()
        },
        {
            type: 'practice',
            intro: 'Determine whether the limit exists:',
            generate: () => LIMITS.qLimitExists()
        },
        {
            type: 'practice',
            intro: 'Identify the type of discontinuity:',
            generate: () => LIMITS.qRemovableDiscontinuity()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\lim_{x\\to a}f(x)=f(a)\\) when \\(f\\) is continuous at \\(a\\)</li>' +
                '<li>Factor and cancel to resolve \\(0/0\\) indeterminate forms</li>' +
                '<li>\\(\\lim_{x\\to\\infty}(ax+b)/(cx+d)=a/c\\)</li>' +
                '<li>Limit exists iff left-hand and right-hand limits are equal</li>' +
                '<li>Continuity: defined + limit exists + limit equals function value</li>' +
                '<li>Removable discontinuity: limit exists but \\(f(a)\\) undefined or differs</li>' +
                '</ul>'
        }
    ]
};
