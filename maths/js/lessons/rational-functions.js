const LESSON_RATIONAL = {
    id: 'rational-functions',
    title: 'Rational Functions',
    subtitle: 'Asymptotes, key features, and evaluating rational functions',
    folder: 'functions',
    screens: [
        // ── 1. Concept: Rational Functions ────────────────────────
        {
            type: 'concept',
            title: 'Rational Functions',
            content: '<p>A <strong>rational function</strong> has the form \\(f(x) = \\dfrac{ax + b}{cx + d}\\), where the numerator and denominator are both linear expressions and \\(c \\neq 0\\).</p>' +
                '<p>These functions have two key features: <strong>asymptotes</strong> — lines the graph approaches but never crosses.</p>' +
                '<div class="lesson-box">' +
                '<strong>Vertical Asymptote (VA):</strong> found by setting the denominator equal to zero.<br>' +
                '\\(cx + d = 0 \\implies x = -\\dfrac{d}{c}\\)<br><br>' +
                '<strong>Horizontal Asymptote (HA):</strong> found by comparing the leading coefficients.<br>' +
                '\\(y = \\dfrac{a}{c}\\) (the ratio of the leading coefficients)<br><br>' +
                '<em>Example:</em> For \\(f(x) = \\dfrac{3x - 1}{2x + 5}\\):<br>' +
                '\\(\\text{VA: } 2x + 5 = 0 \\implies x = -\\dfrac{5}{2}\\)<br>' +
                '\\(\\text{HA: } y = \\dfrac{3}{2}\\)' +
                '</div>' +
                '<p>The <strong>domain</strong> of \\(f(x) = \\dfrac{ax+b}{cx+d}\\) is all real numbers except the vertical asymptote: \\(x \\neq -\\dfrac{d}{c}\\).</p>' +
                '<p>The <strong>range</strong> is all real numbers except the horizontal asymptote: \\(y \\neq \\dfrac{a}{c}\\).</p>'
        },

        // ── 2. Practice: Vertical Asymptote ───────────────────────
        {
            type: 'practice',
            intro: 'Find the vertical asymptote of the rational function:',
            generate: () => RATIONAL.qVerticalAsymptote()
        },

        // ── 3. Practice: Horizontal Asymptote ─────────────────────
        {
            type: 'practice',
            intro: 'Find the horizontal asymptote of the rational function:',
            generate: () => RATIONAL.qHorizontalAsymptote()
        },

        // ── 4. Example: Finding Asymptotes ────────────────────────
        {
            type: 'example',
            problem: 'Find the vertical and horizontal asymptotes of \\(f(x) = \\dfrac{2x + 3}{x - 4}\\).',
            steps: [
                { text: '<strong>Vertical Asymptote:</strong> Set the denominator equal to zero.' },
                { text: '\\(x - 4 = 0 \\implies x = 4\\)' },
                { text: 'The graph cannot pass through \\(x = 4\\), so the <strong>vertical asymptote is \\(x = 4\\)</strong>.' },
                { text: '<strong>Horizontal Asymptote:</strong> Divide the leading coefficients of the numerator and denominator.' },
                { text: '\\(y = \\dfrac{2}{1} = 2\\)' },
                { text: 'As \\(x \\to \\pm\\infty\\), \\(f(x) \\to 2\\), so the <strong>horizontal asymptote is \\(y = 2\\)</strong>.' }
            ]
        },

        // ── 5. Practice: Domain ────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the excluded value from the domain:',
            generate: () => RATIONAL.qDomainRational()
        },

        // ── 6. Practice: Evaluate ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the rational function at the given value:',
            generate: () => RATIONAL.qEvaluateRational()
        },

        // ── 7. Concept: Intercepts and Inverse ────────────────────
        {
            type: 'concept',
            title: 'Intercepts and Inverse',
            content: '<p>Once you know the asymptotes, the next step is finding where the graph crosses the axes.</p>' +
                '<div class="lesson-box">' +
                '<strong>x-intercept</strong> (where the graph crosses the x-axis, \\(y = 0\\)):<br>' +
                'Set the <em>numerator</em> equal to zero and solve for \\(x\\).<br>' +
                '\\(ax + b = 0 \\implies x = -\\dfrac{b}{a}\\)<br><br>' +
                '<strong>y-intercept</strong> (where the graph crosses the y-axis, \\(x = 0\\)):<br>' +
                'Substitute \\(x = 0\\) into \\(f(x)\\).<br>' +
                '\\(f(0) = \\dfrac{a(0) + b}{c(0) + d} = \\dfrac{b}{d}\\)' +
                '</div>' +
                '<p><strong>Finding the Inverse \\(f^{-1}(x)\\):</strong></p>' +
                '<p>To find the inverse of a rational function, swap \\(x\\) and \\(y\\), then solve for \\(y\\).</p>' +
                '<ol>' +
                '<li>Write \\(y = \\dfrac{ax + b}{cx + d}\\)</li>' +
                '<li>Swap: \\(x = \\dfrac{ay + b}{cy + d}\\)</li>' +
                '<li>Multiply both sides by \\((cy + d)\\): \\(x(cy + d) = ay + b\\)</li>' +
                '<li>Expand: \\(cxy + dx = ay + b\\)</li>' +
                '<li>Collect \\(y\\) terms: \\(cxy - ay = b - dx\\)</li>' +
                '<li>Factor and solve: \\(y = \\dfrac{b - dx}{cx - a}\\)</li>' +
                '</ol>' +
                '<p>Notice that \\(f^{-1}(x)\\) is also a rational function of the same form.</p>'
        },

        // ── 8. Practice: x-intercept ──────────────────────────────
        {
            type: 'practice',
            intro: 'Find the x-intercept of the rational function:',
            generate: () => RATIONAL.qXIntercept()
        },

        // ── 9. Practice: y-intercept ──────────────────────────────
        {
            type: 'practice',
            intro: 'Find the y-intercept of the rational function:',
            generate: () => RATIONAL.qYIntercept()
        },

        // ── 10. Example: Finding the Inverse ──────────────────────
        {
            type: 'example',
            problem: 'Find \\(f^{-1}(x)\\) for \\(f(x) = \\dfrac{3x + 1}{x - 2}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Write \\(y = \\dfrac{3x + 1}{x - 2}\\).' },
                { text: '<strong>Step 2:</strong> Swap \\(x\\) and \\(y\\): \\(x = \\dfrac{3y + 1}{y - 2}\\).' },
                { text: '<strong>Step 3:</strong> Multiply both sides by \\((y - 2)\\): \\(x(y - 2) = 3y + 1\\).' },
                { text: '<strong>Step 4:</strong> Expand: \\(xy - 2x = 3y + 1\\).' },
                { text: '<strong>Step 5:</strong> Collect \\(y\\) terms on one side: \\(xy - 3y = 2x + 1\\).' },
                { text: '<strong>Step 6:</strong> Factor: \\(y(x - 3) = 2x + 1\\).' },
                { text: '<strong>Answer:</strong> \\(f^{-1}(x) = \\dfrac{2x + 1}{x - 3}\\).' }
            ]
        },

        // ── 11. Practice: Inverse ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the value of the inverse function at the given point:',
            generate: () => RATIONAL.qInverseRational()
        },

        // ── 12. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>A <strong>rational function</strong> has the form \\(f(x) = \\dfrac{ax+b}{cx+d}\\)</li>' +
                '<li><strong>Vertical asymptote:</strong> set denominator \\(= 0\\) → \\(x = -\\dfrac{d}{c}\\)</li>' +
                '<li><strong>Horizontal asymptote:</strong> ratio of leading coefficients → \\(y = \\dfrac{a}{c}\\)</li>' +
                '<li><strong>Domain:</strong> all \\(x \\in \\mathbb{R}\\), \\(x \\neq -\\dfrac{d}{c}\\)</li>' +
                '<li><strong>Range:</strong> all \\(y \\in \\mathbb{R}\\), \\(y \\neq \\dfrac{a}{c}\\)</li>' +
                '<li><strong>x-intercept:</strong> set numerator \\(= 0\\) → \\(x = -\\dfrac{b}{a}\\)</li>' +
                '<li><strong>y-intercept:</strong> substitute \\(x = 0\\) → \\(y = \\dfrac{b}{d}\\)</li>' +
                '<li><strong>Inverse:</strong> swap \\(x\\) and \\(y\\), multiply out, collect \\(y\\) terms, solve</li>' +
                '<li>\\(f^{-1}(x)\\) of a rational function is also a rational function</li>' +
                '<li>The VA of \\(f\\) becomes the HA of \\(f^{-1}\\), and vice versa</li>' +
                '</ul>'
        }
    ]
};
