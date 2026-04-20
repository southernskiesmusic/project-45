const LESSON_QUADRATICS = {
    id: 'quadratics',
    title: 'Quadratics',
    subtitle: 'Forms, discriminant, vertex, roots and Vieta\'s formulas',
    folder: 'functions',
    screens: [
        // ── 1. Concept: Three Forms ─────────────────────────────────
        {
            type: 'concept',
            title: 'Three Forms of a Quadratic',
            content: '<p>A <strong>quadratic function</strong> is any function of the form \\(f(x) = ax^2 + bx + c\\) where \\(a \\neq 0\\). Its graph is a <strong>parabola</strong>.</p>' +
                '<p>There are three standard forms, each useful for different things:</p>' +
                '<div class="lesson-box"><strong>Standard form:</strong> \\(f(x) = ax^2 + bx + c\\)<br>' +
                'Easy to compute \\(f(0) = c\\) (y-intercept). \\(a\\) tells you if the parabola opens up (\\(a>0\\)) or down (\\(a<0\\)).</div>' +
                '<div class="lesson-box"><strong>Vertex form:</strong> \\(f(x) = a(x - h)^2 + k\\)<br>' +
                'The vertex is immediately visible at \\((h, k)\\). The axis of symmetry is \\(x = h\\).</div>' +
                '<div class="lesson-box"><strong>Factored form:</strong> \\(f(x) = a(x - p)(x - q)\\)<br>' +
                'The roots (x-intercepts) are immediately visible at \\(x = p\\) and \\(x = q\\).</div>' +
                '<p>All three forms represent the same parabola — you convert between them depending on what information you need.</p>'
        },

        // ── 2. Concept: Discriminant ───────────────────────────────
        {
            type: 'concept',
            title: 'The Discriminant',
            content: '<p>The <strong>discriminant</strong> \\(\\Delta\\) (delta) tells us how many real roots a quadratic has without actually solving it.</p>' +
                '<div class="lesson-box"><strong>Formula:</strong> \\(\\Delta = b^2 - 4ac\\)</div>' +
                '<p>The three cases:</p>' +
                '<ul>' +
                '<li>\\(\\Delta > 0\\): <strong>two distinct real roots</strong> — parabola crosses the x-axis twice</li>' +
                '<li>\\(\\Delta = 0\\): <strong>one repeated real root</strong> — parabola touches the x-axis once (tangent)</li>' +
                '<li>\\(\\Delta < 0\\): <strong>no real roots</strong> — parabola does not cross the x-axis</li>' +
                '</ul>' +
                '<p><strong>Example:</strong> For \\(2x^2 - 3x - 5\\), \\(a=2, b=-3, c=-5\\):<br>' +
                '\\(\\Delta = (-3)^2 - 4(2)(-5) = 9 + 40 = 49 > 0\\) → two distinct real roots.</p>'
        },

        // ── 3. Practice: Discriminant ──────────────────────────────
        {
            type: 'practice',
            intro: 'Compute the discriminant of the quadratic:',
            generate: () => QUADRATICS.qDiscriminant()
        },

        // ── 4. Example: Nature of Roots ────────────────────────────
        {
            type: 'example',
            problem: 'Determine the nature of the roots of \\(x^2 + 6x + 9 = 0\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify \\(a = 1, b = 6, c = 9\\).' },
                { text: '<strong>Step 2:</strong> Compute \\(\\Delta = b^2 - 4ac = 6^2 - 4(1)(9) = 36 - 36 = 0\\).' },
                { text: '<strong>Answer:</strong> Since \\(\\Delta = 0\\), the equation has <strong>one repeated real root</strong>. (In fact, \\((x+3)^2 = 0 \\Rightarrow x = -3\\).)' }
            ]
        },

        // ── 5. Practice: Nature of Roots ──────────────────────────
        {
            type: 'practice',
            intro: 'Determine the nature of the roots:',
            generate: () => QUADRATICS.qNatureOfRoots()
        },

        // ── 6. Concept: Axis of Symmetry and Vertex ───────────────
        {
            type: 'concept',
            title: 'Axis of Symmetry and Vertex',
            content: '<p>Every parabola is symmetric about a vertical line called the <strong>axis of symmetry</strong>. The highest or lowest point of the parabola is the <strong>vertex</strong>.</p>' +
                '<div class="lesson-box"><strong>Axis of symmetry:</strong> \\(x = -\\dfrac{b}{2a}\\)</div>' +
                '<div class="lesson-box"><strong>Vertex:</strong> \\(\\left(-\\dfrac{b}{2a},\\; f\\!\\left(-\\dfrac{b}{2a}\\right)\\right)\\)</div>' +
                '<p>To find the vertex:</p>' +
                '<ol>' +
                '<li>Find \\(x_v = -\\dfrac{b}{2a}\\).</li>' +
                '<li>Substitute \\(x_v\\) back into \\(f(x)\\) to get \\(y_v\\).</li>' +
                '</ol>' +
                '<p>If \\(a > 0\\), the vertex is a <strong>minimum</strong>. If \\(a < 0\\), it is a <strong>maximum</strong>.</p>'
        },

        // ── 7. Practice: Axis of Symmetry ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the axis of symmetry:',
            generate: () => QUADRATICS.qAxisOfSymmetry()
        },

        // ── 8. Example: Finding the Vertex ────────────────────────
        {
            type: 'example',
            problem: 'Find the vertex of \\(y = x^2 - 4x + 7\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the axis of symmetry: \\(x = -\\dfrac{-4}{2(1)} = \\dfrac{4}{2} = 2\\).' },
                { text: '<strong>Step 2:</strong> Substitute \\(x = 2\\): \\(y = (2)^2 - 4(2) + 7 = 4 - 8 + 7 = 3\\).' },
                { text: '<strong>Answer:</strong> The vertex is \\((2,\\, 3)\\). Since \\(a = 1 > 0\\), it is a minimum.' }
            ]
        },

        // ── 9. Practice: Vertex ────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the coordinates of the vertex:',
            generate: () => QUADRATICS.qVertex()
        },

        // ── 10. Concept: Roots and Factored Form ──────────────────
        {
            type: 'concept',
            title: 'Roots and Factored Form',
            content: '<p>The <strong>roots</strong> of a quadratic are the x-values where \\(f(x) = 0\\). They are also called <em>zeros</em> or <em>x-intercepts</em>.</p>' +
                '<p>If the roots are \\(p\\) and \\(q\\), the quadratic factors as:</p>' +
                '<div class="lesson-box">\\(f(x) = a(x - p)(x - q)\\)</div>' +
                '<p>To solve \\(ax^2 + bx + c = 0\\) by factoring:</p>' +
                '<ol>' +
                '<li>Find two numbers whose sum is \\(b\\) and product is \\(ac\\).</li>' +
                '<li>Use them to factor the expression.</li>' +
                '<li>Set each factor to zero.</li>' +
                '</ol>' +
                '<p>If factoring is not possible, use the <strong>quadratic formula</strong>: \\(x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}\\).</p>'
        },

        // ── 11. Practice: Roots from Factored Form ────────────────
        {
            type: 'practice',
            intro: 'Find the larger root of the equation:',
            generate: () => QUADRATICS.qRootsFromFactored()
        },

        // ── 12. Practice: Solve by Factoring ──────────────────────
        {
            type: 'practice',
            intro: 'Solve the quadratic by factoring:',
            generate: () => QUADRATICS.qSolveIntegerRoots()
        },

        // ── 13. Concept: Completing the Square ────────────────────
        {
            type: 'concept',
            title: 'Completing the Square',
            content: '<p><strong>Completing the square</strong> converts a quadratic from standard form to vertex form. This reveals the vertex directly.</p>' +
                '<div class="lesson-box"><strong>Method (for \\(a = 1\\)):</strong><br>' +
                '\\(x^2 + bx + c = \\left(x + \\dfrac{b}{2}\\right)^2 - \\left(\\dfrac{b}{2}\\right)^2 + c\\)</div>' +
                '<p><strong>Step-by-step example</strong> — convert \\(x^2 - 6x + 11\\):</p>' +
                '<ol>' +
                '<li>Half of \\(-6\\) is \\(-3\\); square it to get \\(9\\).</li>' +
                '<li>Add and subtract: \\(x^2 - 6x + 9 - 9 + 11\\).</li>' +
                '<li>Factor the perfect square: \\((x - 3)^2 + 2\\).</li>' +
                '</ol>' +
                '<p>Now we can read off the vertex: \\((3,\\, 2)\\).</p>'
        },

        // ── 14. Example: Completing the Square ────────────────────
        {
            type: 'example',
            problem: 'Write \\(y = x^2 + 8x + 5\\) in vertex form.',
            steps: [
                { text: '<strong>Step 1:</strong> Half of \\(b = 8\\): \\(\\dfrac{8}{2} = 4\\). Square it: \\(4^2 = 16\\).' },
                { text: '<strong>Step 2:</strong> Add and subtract 16: \\(y = x^2 + 8x + 16 - 16 + 5\\).' },
                { text: '<strong>Step 3:</strong> Factor: \\(y = (x + 4)^2 - 11\\).' },
                { text: '<strong>Answer:</strong> Vertex form is \\(y = (x + 4)^2 - 11\\). Vertex at \\((-4,\\,-11)\\).' }
            ]
        },

        // ── 15. Practice: Completing the Square ───────────────────
        {
            type: 'practice',
            intro: 'Write the quadratic in vertex form:',
            generate: () => QUADRATICS.qCompletingSquare()
        },

        // ── 16. Concept: Vieta's Formulas ─────────────────────────
        {
            type: 'concept',
            title: "Vieta's Formulas",
            content: '<p>For the equation \\(ax^2 + bx + c = 0\\) with roots \\(\\alpha\\) and \\(\\beta\\):</p>' +
                '<div class="lesson-box">' +
                '<strong>Sum of roots:</strong> \\(\\alpha + \\beta = -\\dfrac{b}{a}\\)<br><br>' +
                '<strong>Product of roots:</strong> \\(\\alpha\\beta = \\dfrac{c}{a}\\)' +
                '</div>' +
                '<p>These follow directly from the factored form: \\(a(x - \\alpha)(x - \\beta) = a(x^2 - (\\alpha+\\beta)x + \\alpha\\beta) = ax^2 + bx + c\\).<br>' +
                'So \\(-a(\\alpha+\\beta) = b\\) and \\(a\\alpha\\beta = c\\).</p>' +
                '<p><strong>Example:</strong> For \\(x^2 - 5x + 6 = 0\\):<br>' +
                '\\(\\alpha + \\beta = 5\\), \\(\\alpha\\beta = 6\\). (Roots are \\(2\\) and \\(3\\) — check: \\(2+3=5\\), \\(2\\times3=6\\).)</p>'
        },

        // ── 17. Practice: Vieta's Formulas ────────────────────────
        {
            type: 'practice',
            intro: "Apply Vieta's formulas:",
            generate: () => QUADRATICS.qSumProduct()
        },

        // ── 18. Concept: Parameter Conditions ─────────────────────
        {
            type: 'concept',
            title: 'Parameter Conditions',
            content: '<p>IB exam questions often ask: <em>for what values of k does the equation have...</em></p>' +
                '<ul>' +
                '<li>Two distinct real roots: \\(\\Delta > 0\\)</li>' +
                '<li>One repeated root: \\(\\Delta = 0\\)</li>' +
                '<li>No real roots: \\(\\Delta < 0\\)</li>' +
                '</ul>' +
                '<p><strong>Method:</strong> Write the discriminant as an expression in \\(k\\), then set up an inequality and solve.</p>' +
                '<p><strong>Example:</strong> \\(x^2 + kx + 9 = 0\\) has two distinct real roots when \\(\\Delta > 0\\):<br>' +
                '\\(k^2 - 36 > 0 \\Rightarrow |k| > 6 \\Rightarrow k > 6\\) or \\(k < -6\\).</p>'
        },

        // ── 19. Practice: Parameter Conditions ────────────────────
        {
            type: 'practice',
            intro: 'Find the critical value of the parameter:',
            generate: () => QUADRATICS.qParameterConditions()
        },

        // ── 20. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Standard form:</strong> \\(ax^2 + bx + c\\) — y-intercept is \\(c\\)</li>' +
                '<li><strong>Vertex form:</strong> \\(a(x-h)^2 + k\\) — vertex at \\((h,k)\\)</li>' +
                '<li><strong>Factored form:</strong> \\(a(x-p)(x-q)\\) — roots at \\(x=p, x=q\\)</li>' +
                '<li><strong>Discriminant:</strong> \\(\\Delta = b^2 - 4ac\\)</li>' +
                '<li>\\(\\Delta > 0\\): two distinct real roots; \\(\\Delta = 0\\): one repeated; \\(\\Delta < 0\\): none</li>' +
                '<li><strong>Axis of symmetry:</strong> \\(x = -\\dfrac{b}{2a}\\)</li>' +
                "<li><strong>Vieta's:</strong> sum \\(= -b/a\\), product \\(= c/a\\)</li>" +
                '<li><strong>Quadratic formula:</strong> \\(x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}\\)</li>' +
                '</ul>'
        }
    ]
};
