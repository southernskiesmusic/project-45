const LESSON_ASYMPTOTES = {
    id: 'asymptotes',
    title: 'Asymptotes & Rational Functions',
    subtitle: 'Vertical, horizontal, and oblique asymptotes',
    folder: 'functions',
    screens: [
        // ── 1. Concept: Vertical Asymptotes ───────────────────────
        {
            type: 'concept',
            title: 'Vertical Asymptotes',
            content: '<p>A <strong>vertical asymptote</strong> (VA) is a vertical line that the graph of a function approaches but never crosses.</p>' +
                '<p>For a function of the form \\(f(x) = \\dfrac{a}{x - h} + k\\), the vertical asymptote occurs where the <strong>denominator equals zero</strong>.</p>' +
                '<div class="lesson-box">' +
                '<strong>Rule:</strong> \\(f(x) = \\dfrac{a}{x - h} + k\\) has a vertical asymptote at \\(x = h\\).<br><br>' +
                'Set the denominator equal to zero and solve: \\(x - h = 0 \\Rightarrow x = h\\).<br><br>' +
                'The <strong>domain</strong> excludes \\(x = h\\), i.e. domain is \\(x \\in \\mathbb{R},\\ x \\neq h\\).' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>\\(f(x) = \\dfrac{1}{x - 3}\\): denominator zero at \\(x = 3\\), so VA is \\(x = 3\\)</li>' +
                '<li>\\(f(x) = \\dfrac{2}{x + 5} + 1\\): denominator zero at \\(x = -5\\), so VA is \\(x = -5\\)</li>' +
                '<li>\\(f(x) = \\dfrac{4}{2x - 6}\\): set \\(2x - 6 = 0 \\Rightarrow x = 3\\), so VA is \\(x = 3\\)</li>' +
                '</ul>'
        },

        // ── 2. Practice: Vertical Asymptote ───────────────────────
        {
            type: 'practice',
            intro: 'Find the vertical asymptote:',
            generate: () => ASYMPTOTES.qVerticalAsymptote()
        },

        // ── 3. Practice: Domain of Rational Function ───────────────
        {
            type: 'practice',
            intro: 'Find the excluded value from the domain:',
            generate: () => ASYMPTOTES.qDomainRational()
        },

        // ── 4. Concept: Horizontal Asymptotes ─────────────────────
        {
            type: 'concept',
            title: 'Horizontal Asymptotes',
            content: '<p>A <strong>horizontal asymptote</strong> (HA) is a horizontal line that the graph approaches as \\(x \\to \\pm\\infty\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>For \\(f(x) = \\dfrac{a}{x - h} + k\\):</strong> the horizontal asymptote is \\(y = k\\).<br><br>' +
                '<strong>For \\(f(x) = \\dfrac{ax + b}{cx + d}\\) (linear over linear):</strong><br>' +
                'Divide numerator and denominator by \\(x\\):<br>' +
                '\\[f(x) = \\dfrac{a + b/x}{c + d/x} \\xrightarrow{x \\to \\infty} \\dfrac{a}{c}\\]' +
                'So the horizontal asymptote is \\(y = \\dfrac{a}{c}\\).' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>\\(f(x) = \\dfrac{3}{x - 2} + 5\\): HA is \\(y = 5\\)</li>' +
                '<li>\\(f(x) = \\dfrac{2x + 1}{3x - 4}\\): divide by \\(x\\) → HA is \\(y = \\dfrac{2}{3}\\)</li>' +
                '<li>\\(f(x) = \\dfrac{x - 1}{x + 1}\\): HA is \\(y = \\dfrac{1}{1} = 1\\)</li>' +
                '</ul>'
        },

        // ── 5. Practice: Horizontal Asymptote (a/x-h+k form) ──────
        {
            type: 'practice',
            intro: 'Find the horizontal asymptote:',
            generate: () => ASYMPTOTES.qHorizontalAsymptote()
        },

        // ── 6. Practice: Horizontal Asymptote (linear/linear) ─────
        {
            type: 'practice',
            intro: 'Find the horizontal asymptote of the rational function:',
            generate: () => ASYMPTOTES.qLinearOverLinear()
        },

        // ── 7. Example: Rectangular Hyperbola ─────────────────────
        {
            type: 'example',
            problem: 'Sketch \\(f(x) = \\dfrac{3}{x - 2} + 1\\). Find all asymptotes and intercepts.',
            steps: [
                { text: '<strong>Vertical asymptote:</strong> set denominator to zero: \\(x - 2 = 0 \\Rightarrow x = 2\\). VA is \\(x = 2\\).' },
                { text: '<strong>Horizontal asymptote:</strong> the function is in the form \\(\\dfrac{a}{x-h}+k\\) with \\(k=1\\). HA is \\(y = 1\\).' },
                { text: '<strong>y-intercept:</strong> set \\(x = 0\\): \\(f(0) = \\dfrac{3}{0 - 2} + 1 = -\\dfrac{3}{2} + 1 = -0.5\\). y-intercept at \\((0,\\ -0.5)\\).' },
                { text: '<strong>x-intercept:</strong> set \\(f(x) = 0\\): \\(\\dfrac{3}{x-2} + 1 = 0 \\Rightarrow \\dfrac{3}{x-2} = -1 \\Rightarrow x - 2 = -3 \\Rightarrow x = -1\\). x-intercept at \\((-1,\\ 0)\\).' }
            ]
        },

        // ── 8. Practice: Both Asymptotes of Rectangular Hyperbola ─
        {
            type: 'practice',
            intro: 'Identify both asymptotes of the rectangular hyperbola:',
            generate: () => ASYMPTOTES.qRectangularHyperbola()
        },

        // ── 9. Practice: x-intercept ──────────────────────────────
        {
            type: 'practice',
            intro: 'Find the x-intercept of the rational function:',
            generate: () => ASYMPTOTES.qXIntercept()
        },

        // ── 10. Practice: y-intercept ─────────────────────────────
        {
            type: 'practice',
            intro: 'Find the y-intercept of the rational function:',
            generate: () => ASYMPTOTES.qYIntercept()
        },

        // ── 11. Concept: Oblique Asymptotes ───────────────────────
        {
            type: 'concept',
            title: 'Oblique Asymptotes',
            content: '<p>An <strong>oblique asymptote</strong> (OA), also called a slant asymptote, is a non-horizontal, non-vertical line that the graph approaches as \\(x \\to \\pm\\infty\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>When does an oblique asymptote exist?</strong><br>' +
                'When the degree of the numerator is exactly <strong>one more</strong> than the degree of the denominator.<br><br>' +
                '<strong>How to find it:</strong> perform polynomial long division. The quotient (ignoring the remainder) is the oblique asymptote.<br><br>' +
                '<strong>Example:</strong> \\(f(x) = \\dfrac{x^2 + 2x + 1}{x + 1}\\)<br>' +
                'Divide: \\(x^2 + 2x + 1 \\div (x + 1) = x + 1\\) remainder \\(0\\).<br>' +
                'So the oblique asymptote is \\(y = x + 1\\).' +
                '</div>' +
                '<p><strong>Note:</strong> if there is an oblique asymptote, there is <em>no</em> horizontal asymptote (and vice versa).</p>' +
                '<p><strong>Another example:</strong> \\(f(x) = \\dfrac{x^2 + 3}{x - 1}\\)<br>' +
                'Long division gives quotient \\(x + 1\\), remainder \\(4\\), so OA is \\(y = x + 1\\).</p>'
        },

        // ── 12. Practice: Oblique Asymptote ───────────────────────
        {
            type: 'practice',
            intro: 'Find the oblique asymptote:',
            generate: () => ASYMPTOTES.qObliqueAsymptote()
        },

        // ── 13. Practice: Hole vs Vertical Asymptote ──────────────
        {
            type: 'practice',
            intro: 'Is this a hole or a vertical asymptote?',
            generate: () => ASYMPTOTES.qHoleVsAsymptote()
        },

        // ── 14. Practice: Sign Near Asymptote ─────────────────────
        {
            type: 'practice',
            intro: 'Determine the sign of the function near its asymptote:',
            generate: () => ASYMPTOTES.qSignNearAsymptote()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Vertical asymptote:</strong> \\(x = h\\) where the denominator equals zero</li>' +
                '<li><strong>Horizontal asymptote:</strong> \\(y = k\\) for \\(f(x) = \\dfrac{a}{x-h} + k\\)</li>' +
                '<li><strong>Horizontal asymptote:</strong> \\(y = \\dfrac{a}{c}\\) for \\(f(x) = \\dfrac{ax+b}{cx+d}\\)</li>' +
                '<li><strong>Oblique asymptote:</strong> exists when \\(\\deg(\\text{num}) = \\deg(\\text{den}) + 1\\); found by long division</li>' +
                '<li><strong>Hole vs VA:</strong> if a factor cancels from numerator and denominator, it gives a hole, not a vertical asymptote</li>' +
                '<li><strong>Domain:</strong> excludes all values where a vertical asymptote (or hole) occurs</li>' +
                '</ul>'
        }
    ]
};
