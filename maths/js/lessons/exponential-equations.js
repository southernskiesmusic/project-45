const LESSON_EXP_EQ = {
    id: 'exponential-equations',
    title: 'Exponential Equations',
    subtitle: 'Solving equations using logarithms',
    folder: 'functions',
    screens: [
        // ── 1. Concept: Solving by Equating Exponents ─────────────
        {
            type: 'concept',
            title: 'Solving by Equating Exponents',
            content: '<p>When both sides of an equation share the <strong>same base</strong>, we can equate the exponents directly.</p>' +
                '<div class="lesson-box">' +
                '<strong>Rule:</strong> If \\(a^{f(x)} = a^{g(x)}\\), then \\(f(x) = g(x)\\).' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>\\(2^{x+1} = 2^3 \\Rightarrow x + 1 = 3 \\Rightarrow x = 2\\)</li>' +
                '<li>\\(3^{2x} = 9 = 3^2 \\Rightarrow 2x = 2 \\Rightarrow x = 1\\)</li>' +
                '</ul>' +
                '<p>The key step is rewriting both sides with the same base before equating exponents.</p>'
        },

        // ── 2. Practice: Equate Exponents ─────────────────────────
        {
            type: 'practice',
            intro: 'Solve by equating exponents:',
            generate: () => EXP_EQ.qEquateExponents()
        },

        // ── 3. Concept: Solving with Logarithms ───────────────────
        {
            type: 'concept',
            title: 'Solving with Logarithms',
            content: '<p>When the bases cannot be matched, we take logarithms of both sides.</p>' +
                '<div class="lesson-box">' +
                '<strong>General rule:</strong> \\(a^x = b \\Rightarrow x = \\log_a(b) = \\dfrac{\\ln b}{\\ln a}\\)<br><br>' +
                '<strong>Natural base:</strong> \\(e^{kx} = c \\Rightarrow kx = \\ln c \\Rightarrow x = \\dfrac{\\ln c}{k}\\)<br><br>' +
                '<strong>Inverse of ln:</strong> \\(\\ln(f(x)) = c \\Rightarrow f(x) = e^c\\)' +
                '</div>' +
                '<p>Taking \\(\\ln\\) of both sides converts exponential equations into linear ones, making them straightforward to solve.</p>'
        },

        // ── 4. Example: Solving a^x = b ───────────────────────────
        {
            type: 'example',
            problem: 'Solve \\(3^x = 20\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Take \\(\\ln\\) of both sides: \\(\\ln(3^x) = \\ln 20\\), so \\(x \\ln 3 = \\ln 20\\).' },
                { text: '<strong>Step 2:</strong> Divide both sides by \\(\\ln 3\\): \\(x = \\dfrac{\\ln 20}{\\ln 3} \\approx 2.727\\) (3 d.p.).' },
                { text: '<strong>Answer:</strong> \\(x \\approx 2.727\\).' }
            ]
        },

        // ── 5. Practice: Solve Basic Exponential ──────────────────
        {
            type: 'practice',
            intro: 'Solve the exponential equation:',
            generate: () => EXP_EQ.qSolveBasicExp()
        },

        // ── 6. Practice: Solve Natural Exponential ────────────────
        {
            type: 'practice',
            intro: 'Solve the natural exponential equation:',
            generate: () => EXP_EQ.qSolveNaturalExp()
        },

        // ── 7. Practice: Solve Equation Involving ln ──────────────
        {
            type: 'practice',
            intro: 'Solve the equation involving ln:',
            generate: () => EXP_EQ.qSolveLn()
        },

        // ── 8. Practice: Solve Exponential with Linear Exponent ───
        {
            type: 'practice',
            intro: 'Solve the exponential equation:',
            generate: () => EXP_EQ.qSolveExpLinear()
        },

        // ── 9. Concept: Change of Base & Applications ─────────────
        {
            type: 'concept',
            title: 'Change of Base & Applications',
            content: '<p>The <strong>change of base formula</strong> lets us evaluate any logarithm using a calculator:</p>' +
                '<div class="lesson-box">' +
                '<strong>Change of base:</strong> \\(\\log_a(b) = \\dfrac{\\ln b}{\\ln a} = \\dfrac{\\log b}{\\log a}\\)<br><br>' +
                '<strong>Exponential growth:</strong> \\(A = A_0 e^{kt}\\)<br>' +
                'Solve for \\(t\\): \\(t = \\dfrac{1}{k}\\ln\\!\\left(\\dfrac{A}{A_0}\\right)\\)<br><br>' +
                '<strong>Half-life:</strong> \\(A = A_0 \\left(0.5\\right)^{t/T}\\)<br>' +
                'Solve for \\(t\\): \\(t = T \\cdot \\dfrac{\\ln(A/A_0)}{\\ln 0.5}\\)' +
                '</div>' +
                '<p>These models appear frequently in IB exam questions involving population growth, radioactive decay, and compound interest.</p>'
        },

        // ── 10. Practice: Change of Base ──────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate using change of base:',
            generate: () => EXP_EQ.qChangeOfBase()
        },

        // ── 11. Practice: Growth Model ────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the growth model for t:',
            generate: () => EXP_EQ.qGrowthModel()
        },

        // ── 12. Practice: Half-Life ────────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the half-life problem:',
            generate: () => EXP_EQ.qHalfLife()
        },

        // ── 13. Practice: Solve with Substitution ─────────────────
        {
            type: 'practice',
            intro: 'Solve the exponential equation using substitution:',
            generate: () => EXP_EQ.qSolveWithSub()
        },

        // ── 14. Practice: Exponential Inequality ──────────────────
        {
            type: 'practice',
            intro: 'Solve the exponential inequality:',
            generate: () => EXP_EQ.qExpInequality()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(a^{f(x)} = a^{g(x)} \\Rightarrow f(x) = g(x)\\) — equate exponents when bases match</li>' +
                '<li>\\(a^x = b \\Rightarrow x = \\dfrac{\\ln b}{\\ln a}\\) — take \\(\\ln\\) of both sides</li>' +
                '<li>\\(e^{kx} = c \\Rightarrow x = \\dfrac{\\ln c}{k}\\) — natural base simplifies with \\(\\ln\\)</li>' +
                '<li>\\(\\ln(f(x)) = c \\Rightarrow f(x) = e^c\\) — exponentiate to undo \\(\\ln\\)</li>' +
                '<li>\\(\\log_a(b) = \\dfrac{\\ln b}{\\ln a}\\) — change of base formula</li>' +
                '<li>Let \\(u = e^x\\) to solve quadratic equations in \\(e^x\\)</li>' +
                '</ul>'
        }
    ]
};
