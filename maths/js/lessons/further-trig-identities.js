const LESSON_TRIG_ID = {
    id: 'further-trig-identities',
    title: 'Further Trig Identities',
    subtitle: 'Compound angle and double angle formulas',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: Compound Angle Formulas ──────────────────
        {
            type: 'concept',
            title: 'Compound Angle Formulas',
            content: '<p>The <strong>compound angle formulas</strong> expand trigonometric functions of sums and differences:</p>' +
                '<div class="lesson-box">' +
                '\\(\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B\\)<br><br>' +
                '\\(\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B\\)<br><br>' +
                '\\(\\tan(A \\pm B) = \\dfrac{\\tan A \\pm \\tan B}{1 \\mp \\tan A \\tan B\\strut}\\)' +
                '</div>' +
                '<p><strong>Tip:</strong> For \\(\\cos\\), the signs <em>swap</em>: \\(\\cos(A+B)\\) uses \\(-\\), and \\(\\cos(A-B)\\) uses \\(+\\).</p>' +
                '<p><strong>Example:</strong> Find \\(\\sin 75°\\):</p>' +
                '<ul>' +
                '<li>\\(\\sin 75° = \\sin(45°+30°) = \\sin45°\\cos30° + \\cos45°\\sin30°\\)</li>' +
                '<li>\\(= \\frac{\\sqrt{2}}{2}\\cdot\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2}\\cdot\\frac{1}{2} = \\frac{\\sqrt{6}+\\sqrt{2}}{4}\\)</li>' +
                '</ul>'
        },

        // ── 2. Practice: sin(A + B) ───────────────────────────────
        {
            type: 'practice',
            intro: 'Use the compound angle formula to evaluate:',
            generate: () => TRIG_ID.qSinSum()
        },

        // ── 3. Practice: cos(A + B) ───────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate using the cosine compound angle formula:',
            generate: () => TRIG_ID.qCosSum()
        },

        // ── 4. Example: Using sin(A - B) ──────────────────────────
        {
            type: 'example',
            problem: 'Given \\(\\sin A = \\frac{3}{5}\\) and \\(\\cos B = \\frac{5}{13}\\) (both acute), find \\(\\sin(A-B)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find missing values: \\(\\cos A = \\frac{4}{5}\\), \\(\\sin B = \\frac{12}{13}\\) (Pythagorean triples).' },
                { text: '<strong>Step 2:</strong> Apply formula: \\(\\sin(A-B) = \\sin A \\cos B - \\cos A \\sin B\\).' },
                { text: '<strong>Step 3:</strong> \\(= \\frac{3}{5}\\cdot\\frac{5}{13} - \\frac{4}{5}\\cdot\\frac{12}{13} = \\frac{15}{65} - \\frac{48}{65}\\).' },
                { text: '<strong>Answer:</strong> \\(\\sin(A-B) = -\\dfrac{33}{65}\\).' }
            ]
        },

        // ── 5. Practice: sin(A - B) ───────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate sin(A − B) using the compound angle formula:',
            generate: () => TRIG_ID.qSinDiff()
        },

        // ── 6. Concept: Double Angle Formulas ────────────────────
        {
            type: 'concept',
            title: 'Double Angle Formulas',
            content: '<p>Setting \\(B = A\\) in the compound angle formulas gives the <strong>double angle formulas</strong>:</p>' +
                '<div class="lesson-box">' +
                '\\(\\sin 2A = 2\\sin A \\cos A\\)<br><br>' +
                '\\(\\cos 2A = \\cos^2 A - \\sin^2 A\\)<br>' +
                '\\(\\phantom{\\cos 2A} = 2\\cos^2 A - 1\\)<br>' +
                '\\(\\phantom{\\cos 2A} = 1 - 2\\sin^2 A\\)<br><br>' +
                '\\(\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}\\)' +
                '</div>' +
                '<p>The three forms of \\(\\cos 2A\\) are all equivalent — use whichever is most convenient for a given problem.</p>' +
                '<p><strong>Example:</strong> If \\(\\sin A = \\frac{1}{3}\\) (acute), find \\(\\cos 2A\\):</p>' +
                '<ul><li>\\(\\cos 2A = 1 - 2\\sin^2 A = 1 - \\frac{2}{9} = \\frac{7}{9}\\)</li></ul>'
        },

        // ── 7. Practice: Double Angle sin ─────────────────────────
        {
            type: 'practice',
            intro: 'Use the double angle formula for sine:',
            generate: () => TRIG_ID.qDoubleAngleSin()
        },

        // ── 8. Practice: Double Angle cos ─────────────────────────
        {
            type: 'practice',
            intro: 'Use the double angle formula for cosine:',
            generate: () => TRIG_ID.qDoubleAngleCos()
        },

        // ── 9. Example: Find sin 2A given sin A ──────────────────
        {
            type: 'example',
            problem: 'Given \\(\\sin A = \\frac{4}{5}\\) with \\(A\\) in the first quadrant, find \\(\\sin 2A\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find \\(\\cos A\\): \\(\\cos A = \\sqrt{1-\\sin^2 A} = \\sqrt{1-\\frac{16}{25}} = \\frac{3}{5}\\).' },
                { text: '<strong>Step 2:</strong> Apply formula: \\(\\sin 2A = 2\\sin A \\cos A\\).' },
                { text: '<strong>Answer:</strong> \\(\\sin 2A = 2 \\cdot \\frac{4}{5} \\cdot \\frac{3}{5} = \\dfrac{24}{25}\\).' }
            ]
        },

        // ── 10. Practice: Find sin 2A ─────────────────────────────
        {
            type: 'practice',
            intro: 'Find the exact value of sin 2A given information about A:',
            generate: () => TRIG_ID.qFindSin2A()
        },

        // ── 11. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\sin(A\\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\)</li>' +
                '<li>\\(\\cos(A\\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B\\)</li>' +
                '<li>\\(\\tan(A\\pm B) = \\dfrac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}\\)</li>' +
                '<li>\\(\\sin 2A = 2\\sin A\\cos A\\)</li>' +
                '<li>\\(\\cos 2A = \\cos^2 A-\\sin^2 A = 2\\cos^2 A-1 = 1-2\\sin^2 A\\)</li>' +
                '<li>\\(\\tan 2A = \\dfrac{2\\tan A}{1-\\tan^2 A}\\)</li>' +
                '<li>Use Pythagorean identity to find missing trig values before applying formulas</li>' +
                '</ul>'
        }
    ]
};
