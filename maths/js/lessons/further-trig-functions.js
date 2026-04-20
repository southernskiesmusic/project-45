const LESSON_TRIG_FUNC2 = {
    id: 'further-trig-functions',
    title: 'Further Trig Functions',
    subtitle: 'Reciprocal trig functions and inverse trigonometry',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: Reciprocal Trig Functions ────────────────
        {
            type: 'concept',
            title: 'Reciprocal Trigonometric Functions',
            content: '<p>The three reciprocal trig functions are defined as:</p>' +
                '<div class="lesson-box">' +
                '\\(\\sec\\theta = \\dfrac{1}{\\cos\\theta}\\quad\\) (secant)<br><br>' +
                '\\(\\csc\\theta = \\dfrac{1}{\\sin\\theta}\\quad\\) (cosecant)<br><br>' +
                '\\(\\cot\\theta = \\dfrac{1}{\\tan\\theta} = \\dfrac{\\cos\\theta}{\\sin\\theta}\\quad\\) (cotangent)' +
                '</div>' +
                '<p><strong>Key identities:</strong></p>' +
                '<ul>' +
                '<li>\\(1 + \\tan^2\\theta = \\sec^2\\theta\\)</li>' +
                '<li>\\(1 + \\cot^2\\theta = \\csc^2\\theta\\)</li>' +
                '</ul>' +
                '<p><strong>Exact values:</strong> sec(60°) = 2, sec(45°) = √2, csc(30°) = 2, cot(45°) = 1.</p>'
        },

        // ── 2. Practice: Evaluate sec ────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the secant at the given angle:',
            generate: () => TRIG_FUNC2.qEvaluateSec()
        },

        // ── 3. Practice: Evaluate csc ────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the cosecant at the given angle:',
            generate: () => TRIG_FUNC2.qEvaluateCsc()
        },

        // ── 4. Practice: Evaluate cot ────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the cotangent at the given angle:',
            generate: () => TRIG_FUNC2.qEvaluateCot()
        },

        // ── 5. Example: Using sec²θ = 1 + tan²θ ──────────────────
        {
            type: 'example',
            problem: 'Given \\(\\tan\\theta = 3\\), find \\(\\sec^2\\theta\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Use the identity \\(\\sec^2\\theta = 1 + \\tan^2\\theta\\).' },
                { text: '<strong>Step 2:</strong> Substitute: \\(\\sec^2\\theta = 1 + 3^2 = 1 + 9 = 10\\).' },
                { text: '<strong>Answer:</strong> \\(\\sec^2\\theta = 10\\).' }
            ]
        },

        // ── 6. Practice: sec² from tan ───────────────────────────
        {
            type: 'practice',
            intro: 'Use the Pythagorean identity to find sec²θ:',
            generate: () => TRIG_FUNC2.qSecIdentity()
        },

        // ── 7. Concept: Inverse Trig Functions ───────────────────
        {
            type: 'concept',
            title: 'Inverse Trigonometric Functions',
            content: '<p>The <strong>inverse trig functions</strong> return the angle given a trig ratio. They are written as arcsin, arccos, arctan (or sin⁻¹, cos⁻¹, tan⁻¹).</p>' +
                '<div class="lesson-box">' +
                '\\(\\arcsin(x)\\): domain \\([-1,1]\\), range \\([-90°, 90°]\\)<br><br>' +
                '\\(\\arccos(x)\\): domain \\([-1,1]\\), range \\([0°, 180°]\\)<br><br>' +
                '\\(\\arctan(x)\\): domain \\(\\mathbb{R}\\), range \\((-90°, 90°)\\)' +
                '</div>' +
                '<p><strong>Key values:</strong></p>' +
                '<ul>' +
                '<li>\\(\\arcsin(\\frac{1}{2}) = 30°\\), \\(\\arcsin(\\frac{\\sqrt{2}}{2}) = 45°\\), \\(\\arcsin(\\frac{\\sqrt{3}}{2}) = 60°\\)</li>' +
                '<li>\\(\\arccos(\\frac{1}{2}) = 60°\\), \\(\\arccos(0) = 90°\\)</li>' +
                '<li>\\(\\arctan(1) = 45°\\), \\(\\arctan(\\sqrt{3}) = 60°\\)</li>' +
                '</ul>'
        },

        // ── 8. Practice: arcsin ───────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the angle in degrees:',
            generate: () => TRIG_FUNC2.qArcsinValue()
        },

        // ── 9. Practice: arccos ───────────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the inverse cosine:',
            generate: () => TRIG_FUNC2.qArccosValue()
        },

        // ── 10. Practice: arctan ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the inverse tangent:',
            generate: () => TRIG_FUNC2.qArctanValue()
        },

        // ── 11. Example: Domain of Inverse Trig ───────────────────
        {
            type: 'example',
            problem: 'Explain why \\(\\arcsin(2)\\) is undefined.',
            steps: [
                { text: '<strong>Step 1:</strong> The domain of \\(\\arcsin\\) is \\([-1, 1]\\).' },
                { text: '<strong>Step 2:</strong> Since \\(2 > 1\\), it is outside the domain.' },
                { text: '<strong>Answer:</strong> \\(\\arcsin(2)\\) is undefined because \\(\\sin\\theta\\) never equals 2.' }
            ]
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\sec\\theta = 1/\\cos\\theta\\), \\(\\csc\\theta = 1/\\sin\\theta\\), \\(\\cot\\theta = \\cos\\theta/\\sin\\theta\\)</li>' +
                '<li>Identity: \\(1+\\tan^2\\theta = \\sec^2\\theta\\)</li>' +
                '<li>Identity: \\(1+\\cot^2\\theta = \\csc^2\\theta\\)</li>' +
                '<li>arcsin domain: \\([-1,1]\\), range: \\([-90°,90°]\\)</li>' +
                '<li>arccos domain: \\([-1,1]\\), range: \\([0°,180°]\\)</li>' +
                '<li>arctan domain: \\(\\mathbb{R}\\), range: \\((-90°,90°)\\)</li>' +
                '<li>arcsin(½)=30°, arcsin(√2/2)=45°, arcsin(√3/2)=60°</li>' +
                '</ul>'
        }
    ]
};
