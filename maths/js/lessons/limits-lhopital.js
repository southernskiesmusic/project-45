const LESSON_LHOPITAL = {
    id: 'limits-lhopital',
    title: "Limits & L'Hôpital's Rule",
    subtitle: "Indeterminate forms and applying L'Hôpital's rule",
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Limits ────────────────────────────────────
        {
            type: 'concept',
            title: 'Limits and Indeterminate Forms',
            content: '<p>The <strong>limit</strong> \\(\\displaystyle\\lim_{x \\to a} f(x)\\) describes the value \\(f(x)\\) approaches as \\(x \\to a\\), even if \\(f(a)\\) is undefined.</p>' +
                '<p><strong>Direct substitution:</strong> if \\(f\\) is continuous at \\(a\\), then \\(\\lim_{x\\to a}f(x) = f(a)\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>Indeterminate forms</strong> arise when direct substitution gives:<br>' +
                '\\(\\frac{0}{0}\\), \\(\\frac{\\infty}{\\infty}\\), \\(0\\cdot\\infty\\), \\(\\infty - \\infty\\), \\(0^0\\), etc.' +
                '</div>' +
                '<p><strong>Strategy for \\(\\frac{0}{0}\\):</strong> try factoring first.</p>' +
                '<p>Example: \\(\\lim_{x\\to 2}\\dfrac{x^2-4}{x-2} = \\lim_{x\\to 2}\\dfrac{(x-2)(x+2)}{x-2} = \\lim_{x\\to 2}(x+2) = 4\\).</p>'
        },

        // ── 2. Practice: Limit by Substitution ───────────────────
        {
            type: 'practice',
            intro: 'Evaluate the limit by direct substitution:',
            generate: () => LHOPITAL.qLimitBySubstitution()
        },

        // ── 3. Practice: Limit at Infinity ────────────────────────
        {
            type: 'practice',
            intro: 'Find the limit as x → ∞:',
            generate: () => LHOPITAL.qLimitRational()
        },

        // ── 4. Practice: Identify Indeterminate Form ─────────────
        {
            type: 'practice',
            intro: 'Identify the indeterminate form before simplifying:',
            generate: () => LHOPITAL.qIndeterminateForm()
        },

        // ── 5. Example: Limit by Factoring ────────────────────────
        {
            type: 'example',
            problem: "Find \\(\\displaystyle\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}\\).",
            steps: [
                { text: '<strong>Step 1:</strong> Direct substitution gives \\(0/0\\) — indeterminate.' },
                { text: '<strong>Step 2:</strong> Factor numerator: \\(x^2-9 = (x-3)(x+3)\\).' },
                { text: '<strong>Step 3:</strong> Cancel: \\(\\lim_{x\\to 3}(x+3) = 6\\).' },
                { text: '<strong>Answer:</strong> Limit \\(= 6\\).' }
            ]
        },

        // ── 6. Practice: Limit by Factoring ──────────────────────
        {
            type: 'practice',
            intro: 'Find the limit by factoring the numerator:',
            generate: () => LHOPITAL.qLimitFactoring()
        },

        // ── 7. Concept: L'Hôpital's Rule ─────────────────────────
        {
            type: 'concept',
            title: "L'Hôpital's Rule",
            content: "<p>When a limit gives \\(\\frac{0}{0}\\) or \\(\\frac{\\infty}{\\infty}\\), <strong>L'Hôpital's rule</strong> applies:</p>" +
                '<div class="lesson-box">' +
                "If \\(\\displaystyle\\lim_{x\\to a}\\frac{f(x)}{g(x)}\\) gives \\(\\frac{0}{0}\\) or \\(\\frac{\\infty}{\\infty}\\), then:<br><br>" +
                "\\(\\displaystyle\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}\\)" +
                '</div>' +
                '<p><strong>Standard limits derived via L\'H:</strong></p>' +
                '<ul>' +
                '<li>\\(\\displaystyle\\lim_{x\\to 0}\\dfrac{\\sin x}{x} = 1\\)</li>' +
                '<li>\\(\\displaystyle\\lim_{x\\to 0}\\dfrac{e^x - 1}{x} = 1\\)</li>' +
                '<li>\\(\\displaystyle\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2} = \\dfrac{1}{2}\\)</li>' +
                '</ul>'
        },

        // ── 8. Practice: L'Hôpital simple ────────────────────────
        {
            type: 'practice',
            intro: "Apply L'Hôpital's rule (or the standard limit) to evaluate:",
            generate: () => LHOPITAL.qLHopitalSimple()
        },

        // ── 9. Practice: L'Hôpital polynomial ────────────────────
        {
            type: 'practice',
            intro: 'Evaluate using factoring or differentiation:',
            generate: () => LHOPITAL.qLHopitalPolynomial()
        },

        // ── 10. Example: L'Hôpital Applied Twice ─────────────────
        {
            type: 'example',
            problem: "Find \\(\\displaystyle\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2}\\) using L'Hôpital's rule.",
            steps: [
                { text: '<strong>Step 1:</strong> Direct substitution gives \\(0/0\\). Apply L\'H once: \\(\\dfrac{\\sin x}{2x}\\) — still \\(0/0\\).' },
                { text: '<strong>Step 2:</strong> Apply L\'H again: \\(\\dfrac{\\cos x}{2}\\).' },
                { text: '<strong>Step 3:</strong> Substitute \\(x=0\\): \\(\\dfrac{\\cos 0}{2} = \\dfrac{1}{2}\\).' },
                { text: '<strong>Answer:</strong> Limit \\(= \\dfrac{1}{2}\\).' }
            ]
        },

        // ── 11. Practice: Limit at Infinity (rational) ────────────
        {
            type: 'practice',
            intro: 'Evaluate the limit at infinity for the rational function:',
            generate: () => LHOPITAL.qLimitAtInfinity()
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Try direct substitution first</li>' +
                '<li>If \\(0/0\\): try factoring and cancelling</li>' +
                "<li>L'Hôpital: if \\(0/0\\) or \\(\\infty/\\infty\\), differentiate numerator and denominator separately</li>" +
                '<li>\\(\\lim_{x\\to\\infty}(ax+b)/(cx+d) = a/c\\)</li>' +
                '<li>\\(\\lim_{x\\to 0}\\sin(x)/x = 1\\)</li>' +
                '<li>\\(\\lim_{x\\to 0}(e^x-1)/x = 1\\)</li>' +
                '<li>\\(\\lim_{x\\to 0}(1-\\cos x)/x^2 = 1/2\\)</li>' +
                "</li>Can apply L'Hôpital multiple times if indeterminate form persists</li>" +
                '</ul>'
        }
    ]
};
