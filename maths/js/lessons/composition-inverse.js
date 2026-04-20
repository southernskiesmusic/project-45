const LESSON_COMP_INV = {
    id: 'composition-inverse',
    title: 'Composition & Inverse Functions',
    subtitle: 'Composing functions and finding inverses',
    folder: 'functions',
    screens: [
        // ── 1. Concept: Composition of Functions ──────────────────
        {
            type: 'concept',
            title: 'Composition of Functions',
            content: '<p><strong>Composition</strong> means applying one function to the output of another. We write \\(f \\circ g\\) (read "f composed with g"), defined as:</p>' +
                '<div class="lesson-box">' +
                '\\((f \\circ g)(x) = f(g(x))\\)' +
                '</div>' +
                '<p><strong>How to evaluate \\((f \\circ g)(a)\\):</strong></p>' +
                '<ol>' +
                '<li>First evaluate the inner function: compute \\(g(a)\\)</li>' +
                '<li>Then apply the outer function to that result: compute \\(f(g(a))\\)</li>' +
                '</ol>' +
                '<p><strong>Order matters:</strong> in general \\(f \\circ g \\neq g \\circ f\\). The right-hand function is applied first.</p>' +
                '<p><strong>Example:</strong> if \\(f(x) = x^2\\) and \\(g(x) = x + 3\\), then</p>' +
                '<ul>' +
                '<li>\\((f \\circ g)(1) = f(g(1)) = f(4) = 16\\)</li>' +
                '<li>\\((g \\circ f)(1) = g(f(1)) = g(1) = 4\\)</li>' +
                '</ul>' +
                '<p>The domain of \\(f \\circ g\\) is the set of all \\(x\\) in the domain of \\(g\\) for which \\(g(x)\\) lies in the domain of \\(f\\).</p>'
        },

        // ── 2. Practice: Evaluate Numerically ─────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the composition at the given value:',
            generate: () => COMP_INV.qComposeNumerical()
        },

        // ── 3. Example: Finding f∘g as an Expression ──────────────
        {
            type: 'example',
            problem: 'Given \\(f(x) = 2x - 1\\) and \\(g(x) = x^2 + 3\\), find \\((f \\circ g)(x)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Write out the definition: \\((f \\circ g)(x) = f(g(x))\\).' },
                { text: '<strong>Step 2:</strong> Substitute \\(g(x) = x^2 + 3\\) into \\(f\\): replace every \\(x\\) in \\(f(x) = 2x - 1\\) with \\((x^2 + 3)\\).' },
                { text: '<strong>Step 3:</strong> \\(f(x^2 + 3) = 2(x^2 + 3) - 1 = 2x^2 + 6 - 1 = 2x^2 + 5\\).' },
                { text: '<strong>Answer:</strong> \\((f \\circ g)(x) = 2x^2 + 5\\).' }
            ]
        },

        // ── 4. Practice: f∘g Expression ───────────────────────────
        {
            type: 'practice',
            intro: 'Find an expression for \\((f \\circ g)(x)\\):',
            generate: () => COMP_INV.qComposeFG()
        },

        // ── 5. Practice: g∘f Expression ───────────────────────────
        {
            type: 'practice',
            intro: 'Find an expression for \\((g \\circ f)(x)\\):',
            generate: () => COMP_INV.qComposeGF()
        },

        // ── 6. Concept: Inverse Functions ─────────────────────────
        {
            type: 'concept',
            title: 'Inverse Functions',
            content: '<p>The <strong>inverse function</strong> \\(f^{-1}\\) "undoes" \\(f\\): if \\(f\\) maps \\(x\\) to \\(y\\), then \\(f^{-1}\\) maps \\(y\\) back to \\(x\\).</p>' +
                '<div class="lesson-box">' +
                '\\(f(f^{-1}(x)) = x\\) and \\(f^{-1}(f(x)) = x\\)' +
                '</div>' +
                '<p><strong>To find \\(f^{-1}(x)\\):</strong></p>' +
                '<ol>' +
                '<li>Write \\(y = f(x)\\)</li>' +
                '<li>Swap \\(x\\) and \\(y\\)</li>' +
                '<li>Solve for \\(y\\) — this gives \\(y = f^{-1}(x)\\)</li>' +
                '</ol>' +
                '<p><strong>Domain and range swap:</strong></p>' +
                '<ul>' +
                '<li>Domain of \\(f\\) = Range of \\(f^{-1}\\)</li>' +
                '<li>Range of \\(f\\) = Domain of \\(f^{-1}\\)</li>' +
                '</ul>' +
                '<p><strong>Self-inverse:</strong> a function is self-inverse if \\(f = f^{-1}\\), meaning \\(f(f(x)) = x\\) for all \\(x\\) in its domain. Geometrically, the graph is symmetric about \\(y = x\\).</p>' +
                '<p><strong>Note:</strong> \\(f^{-1}(x)\\) is <em>not</em> the same as \\(\\dfrac{1}{f(x)}\\).</p>'
        },

        // ── 7. Example: Finding the Inverse of a Linear Function ───
        {
            type: 'example',
            problem: 'Find the inverse of \\(f(x) = 3x - 7\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Write \\(y = 3x - 7\\).' },
                { text: '<strong>Step 2:</strong> Swap \\(x\\) and \\(y\\): \\(x = 3y - 7\\).' },
                { text: '<strong>Step 3:</strong> Solve for \\(y\\): add 7 to both sides to get \\(x + 7 = 3y\\), then divide by 3.' },
                { text: '<strong>Answer:</strong> \\(f^{-1}(x) = \\dfrac{x + 7}{3}\\).' }
            ]
        },

        // ── 8. Practice: Inverse of Linear ────────────────────────
        {
            type: 'practice',
            intro: 'Find the inverse of the linear function:',
            generate: () => COMP_INV.qInverseLinear()
        },

        // ── 9. Practice: Inverse Value ────────────────────────────
        {
            type: 'practice',
            intro: 'Find \\(f^{-1}(a)\\) for the given value:',
            generate: () => COMP_INV.qInverseValue()
        },

        // ── 10. Practice: Inverse from Table ──────────────────────
        {
            type: 'practice',
            intro: 'Use the table of values to find the inverse:',
            generate: () => COMP_INV.qInverseFromTable()
        },

        // ── 11. Practice: Solve f(g(x)) = k ───────────────────────
        {
            type: 'practice',
            intro: 'Solve by composing the functions:',
            generate: () => COMP_INV.qSolveThroughCompose()
        },

        // ── 12. Practice: Verify Inverse ──────────────────────────
        {
            type: 'practice',
            intro: 'Verify that the two functions are inverses of each other:',
            generate: () => COMP_INV.qVerifyInverse()
        },

        // ── 13. Practice: Self-Inverse ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the value of the parameter that makes the function self-inverse:',
            generate: () => COMP_INV.qSelfInverse()
        },

        // ── 14. Practice: Domain of Inverse ───────────────────────
        {
            type: 'practice',
            intro: 'Find the domain of the inverse function:',
            generate: () => COMP_INV.qDomainInverse()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Composition:</strong> \\((f \\circ g)(x) = f(g(x))\\) — apply \\(g\\) first, then \\(f\\)</li>' +
                '<li>Order matters: \\(f \\circ g \\neq g \\circ f\\) in general</li>' +
                '<li>To evaluate \\((f \\circ g)(a)\\): compute \\(g(a)\\) first, then apply \\(f\\)</li>' +
                '<li>To find \\((f \\circ g)(x)\\): substitute \\(g(x)\\) into \\(f(x)\\) and simplify</li>' +
                '<li><strong>Inverse:</strong> \\(f^{-1}\\) undoes \\(f\\); found by swapping \\(x\\) and \\(y\\) then solving for \\(y\\)</li>' +
                '<li>\\(f(f^{-1}(x)) = x\\) and \\(f^{-1}(f(x)) = x\\)</li>' +
                '<li>Domain of \\(f\\) = Range of \\(f^{-1}\\); Range of \\(f\\) = Domain of \\(f^{-1}\\)</li>' +
                '<li>\\(f^{-1}(x) \\neq \\dfrac{1}{f(x)}\\) — these are different things</li>' +
                '<li>Self-inverse: \\(f(f(x)) = x\\), graph is symmetric about \\(y = x\\)</li>' +
                '<li>To solve \\(f(g(x)) = k\\): first find \\(f^{-1}(k)\\), then solve \\(g(x) = f^{-1}(k)\\)</li>' +
                '</ul>'
        }
    ]
};
