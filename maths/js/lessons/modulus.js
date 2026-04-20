const LESSON_MODULUS = {
    id: 'modulus',
    title: 'Modulus Function',
    subtitle: 'Absolute value equations, inequalities and graphs',
    folder: 'functions',
    screens: [
        // ── 1. Concept: The Modulus Function ─────────────────────
        {
            type: 'concept',
            title: 'The Modulus (Absolute Value) Function',
            content: '<p>The <strong>modulus</strong> of a number, written \\(|x|\\), gives its distance from zero — always non-negative:</p>' +
                '<div class="lesson-box">' +
                '\\(|x| = \\begin{cases} x & \\text{if } x \\geq 0 \\\\ -x & \\text{if } x < 0 \\end{cases}\\)' +
                '</div>' +
                '<p>The graph of \\(y = |x|\\) is V-shaped with vertex at the origin.</p>' +
                '<p><strong>Key properties:</strong></p>' +
                '<ul>' +
                '<li>\\(|x| \\geq 0\\) for all \\(x\\)</li>' +
                '<li>\\(|x| = |-x|\\)</li>' +
                '<li>\\(|x|^2 = x^2\\)</li>' +
                '<li>\\(|ab| = |a||b|\\)</li>' +
                '</ul>' +
                '<p><strong>Example:</strong> \\(|{-7}| = 7\\), \\(|3| = 3\\), \\(|-3x+1|\\) is always \\(\\geq 0\\).</p>'
        },

        // ── 2. Practice: Evaluate |expression| ───────────────────
        {
            type: 'practice',
            intro: 'Evaluate the absolute value expression:',
            generate: () => MODULUS.qEvaluateAbs()
        },

        // ── 3. Practice: Evaluate |a|+|b| ────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the expression involving multiple absolute values:',
            generate: () => MODULUS.qEvaluateAbsExpression()
        },

        // ── 4. Concept: Solving |f(x)| = c ───────────────────────
        {
            type: 'concept',
            title: 'Solving Modulus Equations',
            content: '<p>To solve \\(|f(x)| = c\\) (where \\(c > 0\\)), split into two cases:</p>' +
                '<div class="lesson-box">' +
                '\\(|f(x)| = c \\implies f(x) = c \\quad\\text{or}\\quad f(x) = -c\\)' +
                '</div>' +
                '<p><strong>Example:</strong> Solve \\(|2x - 3| = 7\\):</p>' +
                '<ul>' +
                '<li>Case 1: \\(2x - 3 = 7 \\Rightarrow x = 5\\)</li>' +
                '<li>Case 2: \\(2x - 3 = -7 \\Rightarrow x = -2\\)</li>' +
                '<li>Solutions: \\(x = 5\\) or \\(x = -2\\)</li>' +
                '</ul>' +
                '<p>If \\(c = 0\\): only one solution \\(f(x) = 0\\). If \\(c < 0\\): no solution (modulus is never negative).</p>'
        },

        // ── 5. Practice: Solve |x + a| = b ───────────────────────
        {
            type: 'practice',
            intro: 'Solve the modulus equation:',
            generate: () => MODULUS.qSolveAbsSimple()
        },

        // ── 6. Example: Solve |ax + b| = c ────────────────────────
        {
            type: 'example',
            problem: 'Solve \\(|3x + 1| = 10\\).',
            steps: [
                { text: '<strong>Case 1:</strong> \\(3x + 1 = 10 \\Rightarrow 3x = 9 \\Rightarrow x = 3\\).' },
                { text: '<strong>Case 2:</strong> \\(3x + 1 = -10 \\Rightarrow 3x = -11 \\Rightarrow x = -\\frac{11}{3}\\).' },
                { text: '<strong>Answer:</strong> \\(x = 3\\) or \\(x = -\\frac{11}{3}\\).' }
            ]
        },

        // ── 7. Practice: Solve |ax + b| = c ──────────────────────
        {
            type: 'practice',
            intro: 'Solve the equation — find the larger solution:',
            generate: () => MODULUS.qSolveAbsLinear()
        },

        // ── 8. Concept: Modulus Inequalities ─────────────────────
        {
            type: 'concept',
            title: 'Modulus Inequalities',
            content: '<p>There are two standard forms:</p>' +
                '<div class="lesson-box">' +
                '\\(|x - a| < b\\) \\(\\Rightarrow\\) \\(a - b < x < a + b\\) (inside interval)<br><br>' +
                '\\(|x - a| > b\\) \\(\\Rightarrow\\) \\(x < a - b\\) or \\(x > a + b\\) (outside interval)' +
                '</div>' +
                '<p><strong>Tip:</strong> Think of \\(|x - a|\\) as the distance from \\(x\\) to \\(a\\).</p>' +
                '<ul>' +
                '<li>Distance \\(< b\\): points closer than \\(b\\) to \\(a\\) → between \\(a-b\\) and \\(a+b\\)</li>' +
                '<li>Distance \\(> b\\): points further than \\(b\\) from \\(a\\) → outside this interval</li>' +
                '</ul>'
        },

        // ── 9. Practice: |x − a| < b ─────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the inequality:',
            generate: () => MODULUS.qAbsInequality()
        },

        // ── 10. Practice: |x − a| > b ────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the inequality — find the region outside the interval:',
            generate: () => MODULUS.qAbsInequalityGT()
        },

        // ── 11. Example: Distance on Number Line ──────────────────
        {
            type: 'example',
            problem: 'Describe the solution of \\(|x - 5| < 3\\) in words and find all integer solutions.',
            steps: [
                { text: '<strong>Step 1:</strong> Interpret: all \\(x\\) within distance 3 of 5.' },
                { text: '<strong>Step 2:</strong> Solve: \\(5 - 3 < x < 5 + 3\\), i.e. \\(2 < x < 8\\).' },
                { text: '<strong>Answer:</strong> Integer solutions: \\(x \\in \\{3, 4, 5, 6, 7\\}\\).' }
            ]
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(|x| = x\\) if \\(x \\geq 0\\); \\(|x| = -x\\) if \\(x < 0\\)</li>' +
                '<li>\\(|f(x)| = c\\) \\(\\Rightarrow\\) \\(f(x) = c\\) or \\(f(x) = -c\\)</li>' +
                '<li>\\(|f(x)| = c\\) has no solution if \\(c < 0\\)</li>' +
                '<li>\\(|x-a| < b\\) \\(\\Rightarrow\\) \\(a-b < x < a+b\\)</li>' +
                '<li>\\(|x-a| > b\\) \\(\\Rightarrow\\) \\(x < a-b\\) or \\(x > a+b\\)</li>' +
                '<li>\\(|x-a|\\) = distance from \\(x\\) to \\(a\\) on the number line</li>' +
                '</ul>'
        }
    ]
};
