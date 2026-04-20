const LESSON_POLYNOMIALS = {
    id: 'polynomials',
    title: 'Polynomials',
    subtitle: 'Remainder theorem, factor theorem, and Vieta\'s formulas',
    folder: 'functions',
    screens: [
        // ── 1. Concept: Polynomials and the Remainder Theorem ────
        {
            type: 'concept',
            title: 'Remainder Theorem',
            content: '<p>A <strong>polynomial</strong> is an expression of the form \\(a_n x^n + \\cdots + a_1 x + a_0\\) with non-negative integer powers.</p>' +
                '<div class="lesson-box">' +
                '<strong>Remainder Theorem:</strong><br>' +
                'When \\(p(x)\\) is divided by \\((x - a)\\), the remainder equals \\(p(a)\\).<br><br>' +
                '<strong>Factor Theorem:</strong><br>' +
                '\\((x - a)\\) is a factor of \\(p(x)\\) if and only if \\(p(a) = 0\\).' +
                '</div>' +
                '<p><strong>Example:</strong> Find the remainder when \\(p(x) = x^3 - 4x + 1\\) is divided by \\((x-2)\\):</p>' +
                '<ul><li>\\(p(2) = 8 - 8 + 1 = 1\\) → remainder is \\(1\\)</li></ul>' +
                '<p><strong>Example:</strong> Is \\((x-3)\\) a factor of \\(p(x) = x^3 - 27\\)?</p>' +
                '<ul><li>\\(p(3) = 27 - 27 = 0\\) → yes, \\((x-3)\\) is a factor.</li></ul>'
        },

        // ── 2. Practice: Evaluate Polynomial ─────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the polynomial at the given value:',
            generate: () => POLYNOMIALS.qEvaluatePoly()
        },

        // ── 3. Practice: Remainder Theorem ───────────────────────
        {
            type: 'practice',
            intro: 'Find the remainder when the polynomial is divided by (x − a):',
            generate: () => POLYNOMIALS.qRemainderTheorem()
        },

        // ── 4. Example: Factor Theorem Application ───────────────
        {
            type: 'example',
            problem: 'Given that \\((x-2)\\) is a factor of \\(p(x) = x^3 + kx^2 - x - 10\\), find \\(k\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Since \\((x-2)\\) is a factor, \\(p(2) = 0\\).' },
                { text: '<strong>Step 2:</strong> \\(p(2) = 8 + 4k - 2 - 10 = 4k - 4 = 0\\).' },
                { text: '<strong>Answer:</strong> \\(k = 1\\).' }
            ]
        },

        // ── 5. Practice: Factor Check ─────────────────────────────
        {
            type: 'practice',
            intro: 'Determine whether the given linear expression is a factor:',
            generate: () => POLYNOMIALS.qFactorCheck()
        },

        // ── 6. Concept: Vieta's Formulas ─────────────────────────
        {
            type: 'concept',
            title: 'Vieta\'s Formulas',
            content: '<p><strong>Vieta\'s formulas</strong> relate the roots of a polynomial to its coefficients.</p>' +
                '<p>For a quadratic \\(ax^2 + bx + c = 0\\) with roots \\(\\alpha, \\beta\\):</p>' +
                '<div class="lesson-box">' +
                '\\(\\alpha + \\beta = -\\dfrac{b}{a}\\) (sum of roots)<br><br>' +
                '\\(\\alpha \\beta = \\dfrac{c}{a}\\) (product of roots)' +
                '</div>' +
                '<p>For a cubic \\(ax^3 + bx^2 + cx + d = 0\\) with roots \\(\\alpha, \\beta, \\gamma\\):</p>' +
                '<ul>' +
                '<li>\\(\\alpha+\\beta+\\gamma = -\\dfrac{b}{a}\\)</li>' +
                '<li>\\(\\alpha\\beta+\\beta\\gamma+\\gamma\\alpha = \\dfrac{c}{a}\\)</li>' +
                '<li>\\(\\alpha\\beta\\gamma = -\\dfrac{d}{a}\\)</li>' +
                '</ul>' +
                '<p><strong>Note:</strong> A polynomial with roots \\(\\alpha, \\beta\\) can be written as \\(a(x-\\alpha)(x-\\beta)\\).</p>'
        },

        // ── 7. Practice: Sum of Roots ─────────────────────────────
        {
            type: 'practice',
            intro: 'Use Vieta\'s formulas to find the sum of roots:',
            generate: () => POLYNOMIALS.qSumOfRoots()
        },

        // ── 8. Practice: Product of Roots ────────────────────────
        {
            type: 'practice',
            intro: 'Use Vieta\'s formulas to find the product of roots:',
            generate: () => POLYNOMIALS.qProductOfRoots()
        },

        // ── 9. Example: Finding a Cubic from Roots ───────────────
        {
            type: 'example',
            problem: 'Find a cubic polynomial with roots \\(1, -2, 3\\) and leading coefficient \\(1\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Write as product of factors: \\(p(x) = (x-1)(x+2)(x-3)\\).' },
                { text: '<strong>Step 2:</strong> Expand: \\((x-1)(x+2) = x^2+x-2\\).' },
                { text: '<strong>Step 3:</strong> \\((x^2+x-2)(x-3) = x^3+x^2-2x-3x^2-3x+6\\).' },
                { text: '<strong>Answer:</strong> \\(p(x) = x^3-2x^2-5x+6\\).' }
            ]
        },

        // ── 10. Practice: Find Cubic from Roots ──────────────────
        {
            type: 'practice',
            intro: 'Find the polynomial with the given roots and leading coefficient 1:',
            generate: () => POLYNOMIALS.qFindCubicFromRoots()
        },

        // ── 11. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Remainder Theorem:</strong> dividing \\(p(x)\\) by \\((x-a)\\) gives remainder \\(p(a)\\)</li>' +
                '<li><strong>Factor Theorem:</strong> \\((x-a)\\) is a factor \\(\\Leftrightarrow\\) \\(p(a)=0\\)</li>' +
                '<li>Use substitution to find unknown coefficients when a factor is known</li>' +
                '<li><strong>Vieta (quadratic):</strong> sum \\(= -b/a\\), product \\(= c/a\\)</li>' +
                '<li><strong>Vieta (cubic):</strong> sum \\(= -b/a\\), sum of products pairs \\(= c/a\\), product \\(= -d/a\\)</li>' +
                '<li>Polynomial from roots: \\(p(x) = a(x-r_1)(x-r_2)\\cdots\\)</li>' +
                '<li>Complex roots come in conjugate pairs when coefficients are real</li>' +
                '</ul>'
        }
    ]
};
