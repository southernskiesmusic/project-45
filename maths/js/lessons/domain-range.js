const LESSON_DOMAIN_RANGE = {
    id: 'domain-range',
    title: 'Functions, Domain & Range',
    subtitle: 'Evaluating functions, finding domains and ranges',
    folder: 'functions',
    screens: [
        // ── 1. Concept: What is a Function? ───────────────────────
        {
            type: 'concept',
            title: 'What is a Function?',
            content: '<p>A <strong>function</strong> is a rule that assigns exactly one output to each input. We write \\(f(x)\\) to mean "the function \\(f\\) evaluated at \\(x\\)".</p>' +
                '<div class="lesson-box">' +
                'If \\(f(x) = 2x + 3\\), then \\(f(5) = 2(5) + 3 = 13\\).' +
                '</div>' +
                '<p>Key vocabulary:</p>' +
                '<ul>' +
                '<li><strong>Domain:</strong> the set of all valid inputs (x-values)</li>' +
                '<li><strong>Range (codomain):</strong> the set of all possible outputs (y-values)</li>' +
                '<li><strong>Mapping:</strong> each input maps to exactly one output</li>' +
                '</ul>' +
                '<p>Functions are often described by an equation, but can also be given as a graph, table, or arrow diagram.</p>'
        },

        // ── 2. Practice: Evaluate f(x) ────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the function at the given value:',
            generate: () => DOMAIN_RANGE.qEvaluate()
        },

        // ── 3. Example: Function Notation ─────────────────────────
        {
            type: 'example',
            problem: 'Given \\(f(x) = 3x - 5\\), find \\(f(x + 2)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Replace every \\(x\\) in the formula with \\((x + 2)\\).' },
                { text: '<strong>Step 2:</strong> \\(f(x+2) = 3(x+2) - 5 = 3x + 6 - 5 = 3x + 1\\).' },
                { text: '<strong>Answer:</strong> \\(f(x + 2) = 3x + 1\\).' }
            ]
        },

        // ── 4. Practice: Function Notation ────────────────────────
        {
            type: 'practice',
            intro: 'Find the expression for f(x + 1):',
            generate: () => DOMAIN_RANGE.qFunctionNotation()
        },

        // ── 5. Concept: Domain Restrictions ───────────────────────
        {
            type: 'concept',
            title: 'Domain Restrictions',
            content: '<p>Some functions cannot accept all real numbers as inputs. The two most common restrictions are:</p>' +
                '<div class="lesson-box">' +
                '<strong>1. Square roots:</strong> \\(\\sqrt{u}\\) requires \\(u \\geq 0\\)<br>' +
                'The expression inside must be non-negative.<br><br>' +
                '<strong>2. Fractions:</strong> \\(\\dfrac{1}{u}\\) requires \\(u \\neq 0\\)<br>' +
                'The denominator cannot be zero.<br><br>' +
                '<strong>3. Logarithms:</strong> \\(\\ln(u)\\) requires \\(u > 0\\)<br>' +
                'The argument must be strictly positive.' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>\\(f(x) = \\sqrt{x - 3}\\): need \\(x - 3 \\geq 0\\), so domain is \\(x \\geq 3\\)</li>' +
                '<li>\\(f(x) = \\dfrac{1}{x + 2}\\): need \\(x + 2 \\neq 0\\), so domain is \\(x \\neq -2\\)</li>' +
                '<li>\\(f(x) = \\ln(2x - 1)\\): need \\(2x - 1 > 0\\), so domain is \\(x > \\dfrac{1}{2}\\)</li>' +
                '</ul>'
        },

        // ── 6. Practice: Domain of Square Root ────────────────────
        {
            type: 'practice',
            intro: 'Find the domain of the square root function:',
            generate: () => DOMAIN_RANGE.qDomainSqrt()
        },

        // ── 7. Practice: Domain of Fraction ───────────────────────
        {
            type: 'practice',
            intro: 'Find the domain of the rational function:',
            generate: () => DOMAIN_RANGE.qDomainFraction()
        },

        // ── 8. Practice: Domain of Logarithm ──────────────────────
        {
            type: 'practice',
            intro: 'Find the domain of the logarithmic function:',
            generate: () => DOMAIN_RANGE.qDomainLog()
        },

        // ── 9. Concept: Finding the Range ─────────────────────────
        {
            type: 'concept',
            title: 'Finding the Range',
            content: '<p>The <strong>range</strong> is the set of all output values the function can produce.</p>' +
                '<p><strong>Linear functions</strong> \\(f(x) = mx + c\\):</p>' +
                '<ul>' +
                '<li>If the domain is all reals: range is all reals</li>' +
                '<li>If the domain is \\([a, b]\\): range is \\([f(a), f(b)]\\) (or reversed if \\(m < 0\\))</li>' +
                '</ul>' +
                '<p><strong>Quadratic functions</strong> \\(f(x) = a(x-h)^2 + k\\):</p>' +
                '<ul>' +
                '<li>If \\(a > 0\\): range is \\([k, +\\infty)\\) — minimum at vertex</li>' +
                '<li>If \\(a < 0\\): range is \\((-\\infty, k]\\) — maximum at vertex</li>' +
                '</ul>' +
                '<p><strong>Square root</strong> \\(f(x) = \\sqrt{u}\\): range is always \\([0, +\\infty)\\).</p>'
        },

        // ── 10. Practice: Range of Linear ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the range of the function over the given domain:',
            generate: () => DOMAIN_RANGE.qRangeLinear()
        },

        // ── 11. Example: Range of Quadratic ───────────────────────
        {
            type: 'example',
            problem: 'Find the range of \\(f(x) = -(x-2)^2 + 5\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify: \\(a = -1\\), vertex at \\((2, 5)\\).' },
                { text: '<strong>Step 2:</strong> Since \\(a = -1 < 0\\), the parabola opens downward, so the vertex is the maximum point.' },
                { text: '<strong>Answer:</strong> Range is \\(f(x) \\leq 5\\), i.e. \\((-\\infty, 5]\\).' }
            ]
        },

        // ── 12. Practice: Range of Quadratic ──────────────────────
        {
            type: 'practice',
            intro: 'Find the range of the quadratic (domain: all reals):',
            generate: () => DOMAIN_RANGE.qRangeQuadratic()
        },

        // ── 13. Concept: Number of Solutions ──────────────────────
        {
            type: 'concept',
            title: 'Number of Solutions',
            content: '<p>The number of solutions of \\(f(x) = k\\) is the number of times the horizontal line \\(y = k\\) intersects the graph of \\(f\\).</p>' +
                '<p>For a <strong>parabola</strong> \\(y = a(x-h)^2 + k_v\\):</p>' +
                '<ul>' +
                '<li>If \\(a > 0\\) (opens up): \\(k > k_v\\) → 2 solutions; \\(k = k_v\\) → 1 solution; \\(k < k_v\\) → 0 solutions</li>' +
                '<li>If \\(a < 0\\) (opens down): the inequalities reverse</li>' +
                '</ul>' +
                '<p>This connects to the discriminant: setting \\(ax^2 + bx + c = k\\) and computing \\(\\Delta = b^2 - 4a(c - k)\\).</p>'
        },

        // ── 14. Practice: Number of Solutions ─────────────────────
        {
            type: 'practice',
            intro: 'How many solutions does the equation have?',
            generate: () => DOMAIN_RANGE.qNumberOfSolutions()
        },

        // ── 15. Practice: Domain of √(quadratic) ──────────────────
        {
            type: 'practice',
            intro: 'Find the domain of the square root of a quadratic:',
            generate: () => DOMAIN_RANGE.qDomainSqrtQuadratic()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Domain:</strong> all valid input values</li>' +
                '<li><strong>Range:</strong> all possible output values</li>' +
                '<li>\\(\\sqrt{u}\\) requires \\(u \\geq 0\\)</li>' +
                '<li>\\(1/u\\) requires \\(u \\neq 0\\)</li>' +
                '<li>\\(\\ln(u)\\) requires \\(u > 0\\)</li>' +
                '<li>Linear on \\([a,b]\\): range = \\([f(a), f(b)]\\) (or reversed)</li>' +
                '<li>Quadratic \\(a > 0\\): range \\(= [k_v, +\\infty)\\)</li>' +
                '<li>Quadratic \\(a < 0\\): range \\(= (-\\infty, k_v]\\)</li>' +
                '<li>\\(\\sqrt{u}\\): range always \\([0, +\\infty)\\)</li>' +
                '<li>Number of solutions = number of intersections with \\(y = k\\)</li>' +
                '</ul>'
        }
    ]
};
