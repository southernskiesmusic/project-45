const LESSON_TANGENT_NORMAL = {
    id: 'tangent-normal',
    title: 'Tangent & Normal Lines',
    subtitle: 'Equations of tangent and normal lines to curves',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Tangent Lines ──────────────────────────────
        {
            type: 'concept',
            title: 'Tangent Lines',
            content: '<p>At a point \\((a,\\, f(a))\\) on a curve, the <strong>tangent line</strong> has gradient \\(m = f\'(a)\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>Equation of the tangent at \\(x = a\\):</strong><br>' +
                '\\(y - f(a) = f\'(a)(x - a)\\)<br>' +
                'or equivalently \\(y = mx + c\\) where \\(c = f(a) - ma\\).<br><br>' +
                '<strong>Horizontal tangent:</strong> occurs where \\(f\'(a) = 0\\).' +
                '</div>' +
                '<p>To find the tangent equation:</p>' +
                '<ol>' +
                '<li>Evaluate \\(f(a)\\) to get the point on the curve.</li>' +
                '<li>Differentiate to find \\(f\'(x)\\), then substitute \\(x = a\\) for the gradient.</li>' +
                '<li>Use \\(y - f(a) = m(x - a)\\) to write the equation.</li>' +
                '</ol>'
        },

        // ── 2. Example: Finding the Tangent Equation ──────────────
        {
            type: 'example',
            problem: 'Find the equation of the tangent to \\(y = x^2 + 2x\\) at \\(x = 1\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the point. \\(f(1) = 1 + 2 = 3\\), so the point is \\((1, 3)\\).' },
                { text: '<strong>Step 2:</strong> Differentiate. \\(f\'(x) = 2x + 2\\), so \\(m = f\'(1) = 4\\).' },
                { text: '<strong>Step 3:</strong> Apply the formula. \\(y - 3 = 4(x - 1) \\Rightarrow y = 4x - 1\\).' },
                { text: '<strong>Answer:</strong> \\(y = 4x - 1\\).' }
            ]
        },

        // ── 3. Practice: Tangent Gradient ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the gradient of the tangent at the given point:',
            generate: () => TANGENT_NORMAL.qTangentGradient()
        },

        // ── 4. Practice: Tangent Y-Intercept ──────────────────────
        {
            type: 'practice',
            intro: 'Find the y-intercept of the tangent line:',
            generate: () => TANGENT_NORMAL.qTangentYIntercept()
        },

        // ── 5. Practice: Tangent Equation ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the equation of the tangent line:',
            generate: () => TANGENT_NORMAL.qTangentEquation()
        },

        // ── 6. Practice: Tangent at Cubic ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the gradient of the tangent to the cubic:',
            generate: () => TANGENT_NORMAL.qTangentAtCubic()
        },

        // ── 7. Concept: Normal Lines ───────────────────────────────
        {
            type: 'concept',
            title: 'Normal Lines',
            content: '<p>The <strong>normal line</strong> at a point is perpendicular to the tangent. Perpendicular lines have gradients that multiply to \\(-1\\).</p>' +
                '<div class="lesson-box">' +
                'If the tangent gradient is \\(m\\), the <strong>normal gradient</strong> is \\(-\\dfrac{1}{m}\\).<br><br>' +
                '<strong>Equation of the normal at \\(x = a\\):</strong><br>' +
                '\\(y - f(a) = -\\dfrac{1}{m}(x - a)\\)<br>' +
                'where \\(m = f\'(a)\\).' +
                '</div>' +
                '<p>Both the tangent and normal pass through the same point \\((a,\\, f(a))\\). Only their gradients differ.</p>'
        },

        // ── 8. Example: Finding the Normal Equation ───────────────
        {
            type: 'example',
            problem: 'Find the equation of the normal to \\(y = x^2\\) at \\(x = 2\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the point. \\(f(2) = 4\\), so the point is \\((2, 4)\\).' },
                { text: '<strong>Step 2:</strong> Find the tangent gradient. \\(f\'(x) = 2x\\), so \\(m_{\\text{tan}} = f\'(2) = 4\\).' },
                { text: '<strong>Step 3:</strong> Find the normal gradient. \\(m_{\\text{nor}} = -\\dfrac{1}{4}\\).' },
                { text: '<strong>Step 4:</strong> Apply the formula. \\(y - 4 = -\\dfrac{1}{4}(x - 2) \\Rightarrow y = -\\dfrac{1}{4}x + 4.5\\).' },
                { text: '<strong>Answer:</strong> \\(y = -\\dfrac{1}{4}x + 4.5\\).' }
            ]
        },

        // ── 9. Practice: Normal Gradient ──────────────────────────
        {
            type: 'practice',
            intro: 'Find the gradient of the normal line:',
            generate: () => TANGENT_NORMAL.qNormalGradient()
        },

        // ── 10. Practice: Normal Y-Intercept ──────────────────────
        {
            type: 'practice',
            intro: 'Find the y-intercept of the normal line:',
            generate: () => TANGENT_NORMAL.qNormalYIntercept()
        },

        // ── 11. Practice: Normal X-Intercept ──────────────────────
        {
            type: 'practice',
            intro: 'Find the x-intercept of the normal line:',
            generate: () => TANGENT_NORMAL.qNormalXIntercept()
        },

        // ── 12. Concept: Special Cases ─────────────────────────────
        {
            type: 'concept',
            title: 'Special Cases',
            content: '<p>Several common question types require recognising conditions on \\(f\'(x)\\):</p>' +
                '<ul>' +
                '<li><strong>Parallel tangent:</strong> A tangent is parallel to a line with gradient \\(k\\) when \\(f\'(x) = k\\). Solve this equation for \\(x\\).</li>' +
                '<li><strong>Horizontal tangent:</strong> The tangent is horizontal when \\(f\'(x) = 0\\). Solve to find the x-coordinates of stationary points.</li>' +
                '<li><strong>Point on a line:</strong> To check whether a point \\((p, q)\\) lies on a line, substitute its coordinates into the line equation and verify the equality holds.</li>' +
                '</ul>'
        },

        // ── 13. Practice: Parallel Tangent ────────────────────────
        {
            type: 'practice',
            intro: 'Find x where the tangent is parallel to the given line:',
            generate: () => TANGENT_NORMAL.qParallelTangent()
        },

        // ── 14. Practice: Horizontal Tangent ──────────────────────
        {
            type: 'practice',
            intro: 'Find x where the tangent is horizontal:',
            generate: () => TANGENT_NORMAL.qHorizontalTangent()
        },

        // ── 15. Practice: Point on Tangent ────────────────────────
        {
            type: 'practice',
            intro: 'Verify which point lies on the tangent line:',
            generate: () => TANGENT_NORMAL.qPointOnTangent()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Tangent gradient:</strong> \\(m = f\'(a)\\)</li>' +
                '<li><strong>Tangent equation:</strong> \\(y - f(a) = f\'(a)(x - a)\\)</li>' +
                '<li><strong>Normal gradient:</strong> \\(-\\dfrac{1}{f\'(a)}\\)</li>' +
                '<li><strong>Normal equation:</strong> \\(y - f(a) = -\\dfrac{1}{f\'(a)}(x - a)\\)</li>' +
                '<li><strong>Horizontal tangent:</strong> solve \\(f\'(x) = 0\\)</li>' +
                '<li><strong>Parallel tangent:</strong> solve \\(f\'(x) = m\\)</li>' +
                '</ul>'
        }
    ]
};
