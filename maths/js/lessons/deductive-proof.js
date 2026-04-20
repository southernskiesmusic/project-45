const LESSON_DEDUCTIVE_PROOF = {
    id: 'deductive-proof',
    title: 'Deductive Proof',
    subtitle: 'Identities, algebraic proof, even and odd integers, counterexamples',
    folder: 'number-algebra',
    screens: [
        // ── 1. Concept: What is a Proof? ─────────────────────────
        {
            type: 'concept',
            title: 'Proof vs Verification',
            content: '<p>In mathematics, there is a critical difference between <strong>verifying</strong> and <strong>proving</strong>:</p>' +
                '<div class="lesson-box"><strong>Verification:</strong> showing a statement is true for specific values.<br>' +
                '<em>Example:</em> Checking \\(n^2 + n\\) is even for \\(n = 1, 2, 3\\) is verification — not proof.</div>' +
                '<div class="lesson-box"><strong>Proof:</strong> showing a statement is true for <em>all</em> values in its domain, using logical reasoning.<br>' +
                'A proof must work for every possible case simultaneously.</div>' +
                '<p>A single counterexample is enough to <strong>disprove</strong> a claim. But no finite number of examples is enough to <strong>prove</strong> it for all cases.</p>' +
                '<p><strong>Deductive proof</strong> uses known facts, definitions, and logical steps to establish a result. Every step must follow necessarily from the previous ones.</p>'
        },

        // ── 2. Concept: Identities ───────────────────────────────
        {
            type: 'concept',
            title: 'Equations vs Identities',
            content: '<p>An <strong>equation</strong> is true only for certain values of the variable. A solution must be found.</p>' +
                '<p>An <strong>identity</strong> (marked with \\(\\equiv\\)) is true for <em>all</em> values of the variable. It can be proved by algebraic manipulation.</p>' +
                '<div class="lesson-box"><strong>Equation:</strong> \\(x^2 = 4\\) — only true for \\(x = \\pm 2\\)</div>' +
                '<div class="lesson-box"><strong>Identity:</strong> \\((x+y)^2 \\equiv x^2 + 2xy + y^2\\) — true for all \\(x, y \\in \\mathbb{R}\\)</div>' +
                '<p>To prove an identity, we typically:</p>' +
                '<ol>' +
                '<li>Start from one side (usually the more complex side - LHS or RHS).</li>' +
                '<li>Apply known algebraic rules (expand, factorise, simplify).</li>' +
                '<li>Arrive at the other side.</li>' +
                '</ol>' +
                '<p><strong>Key rule:</strong> You must work on one side only, not manipulate both sides simultaneously.</p>'
        },

        // ── 3. Practice: Identity vs Equation ────────────────────
        {
            type: 'practice',
            intro: 'Classify as identity or conditional equation:',
            generate: () => DEDUCTIVE_PROOF.qIsIdentity()
        },

        // ── 4. Example: Proving an Identity ──────────────────────
        {
            type: 'example',
            problem: 'Prove that \\((a+b)^2 - (a-b)^2 \\equiv 4ab\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Expand the LHS.<br>\\((a+b)^2 = a^2 + 2ab + b^2\\)<br>\\((a-b)^2 = a^2 - 2ab + b^2\\)' },
                { text: '<strong>Step 2:</strong> Subtract.<br>\\((a^2 + 2ab + b^2) - (a^2 - 2ab + b^2) = 4ab\\)' },
                { text: '<strong>Conclusion:</strong> LHS \\(= 4ab =\\) RHS. \\(\\square\\)' }
            ]
        },

        // ── 5. Concept: Proving Properties of Integers ───────────
        {
            type: 'concept',
            title: 'Even and Odd Integers',
            content: '<p>Definitions used in integer proofs:</p>' +
                '<div class="lesson-box">' +
                '<strong>Even integer:</strong> \\(n = 2k\\) for some integer \\(k\\).<br>' +
                '<strong>Odd integer:</strong> \\(n = 2k + 1\\) for some integer \\(k\\).' +
                '</div>' +
                '<p><strong>Useful facts:</strong></p>' +
                '<ul>' +
                '<li>Any two consecutive integers have opposite parities (one even, one odd).</li>' +
                '<li>Even × anything = even.</li>' +
                '<li>Odd × Odd = Odd.</li>' +
                '<li>\\(n(n+1)\\) is always even (product of consecutive integers).</li>' +
                '</ul>' +
                '<div class="lesson-box"><strong>Proof that \\(n^2 + n\\) is always even:</strong><br>' +
                '\\(n^2 + n = n(n+1)\\). Since \\(n\\) and \\(n+1\\) are consecutive, one is even. Therefore the product \\(n(n+1)\\) is even. \\(\\square\\)</div>'
        },

        // ── 6. Practice: Even/Odd ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Determine the parity of the expression for all integers n:',
            generate: () => DEDUCTIVE_PROOF.qEvenOdd()
        },

        // ── 7. Concept: Counterexamples ───────────────────────────
        {
            type: 'concept',
            title: 'Disproving with a Counterexample',
            content: '<p>To <strong>disprove</strong> a universal claim ("for all..."), it suffices to find a single value for which the claim is false. This is called a <strong>counterexample</strong>.</p>' +
                '<div class="lesson-box"><strong>Example:</strong> Disprove "\\(n^2 > n\\) for all integers \\(n\\)."<br>' +
                'Counterexample: \\(n = 0\\). Then \\(0^2 = 0\\), so \\(0 > 0\\) is false. \\(\\square\\)</div>' +
                '<p><strong>Strategy for finding counterexamples:</strong></p>' +
                '<ul>' +
                '<li>Try small values: \\(n = 0, 1, 2, -1, -2\\)</li>' +
                '<li>Try boundary cases (edge of any given domain)</li>' +
                '<li>Try values that make expressions equal rather than strictly satisfying the inequality</li>' +
                '</ul>' +
                '<p><strong>Note:</strong> A counterexample does not disprove an existence claim ("there exists...") — it only disproves universal claims ("for all...").</p>'
        },

        // ── 8. Practice: Counterexample ───────────────────────────
        {
            type: 'practice',
            intro: 'Find a counterexample to disprove the claim:',
            generate: () => DEDUCTIVE_PROOF.qCounterexample()
        },

        // ── 9. Concept: Proof of Inequalities ────────────────────
        {
            type: 'concept',
            title: 'Proving Algebraic Inequalities',
            content: '<p>A common technique is to rearrange the inequality to show that an expression is always non-negative (\\(\\geq 0\\)).</p>' +
                '<div class="lesson-box"><strong>Key fact:</strong> For any real number \\(x\\), \\(x^2 \\geq 0\\). Equality holds when \\(x = 0\\).</div>' +
                '<div class="lesson-box"><strong>Example:</strong> Prove \\(a^2 + b^2 \\geq 2ab\\) for all real \\(a, b\\).<br><br>' +
                '<strong>Proof:</strong> Rearrange: \\(a^2 + b^2 - 2ab \\geq 0\\).<br>' +
                'Factorise: \\((a-b)^2 \\geq 0\\). This is always true since any square is non-negative. \\(\\square\\)</div>' +
                '<p>This inequality \\(a^2 + b^2 \\geq 2ab\\) is called the <strong>AM-GM inequality</strong> (arithmetic mean \\(\\geq\\) geometric mean).</p>'
        },

        // ── 10. Practice: Proof Structure ────────────────────────
        {
            type: 'practice',
            intro: 'Choose the correct step in the proof:',
            generate: () => DEDUCTIVE_PROOF.qProofComplete()
        },

        // ── 11. Practice: Algebraic Step ─────────────────────────
        {
            type: 'practice',
            intro: 'Choose the correct algebraic result:',
            generate: () => DEDUCTIVE_PROOF.qAlgebraicStep()
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Proof</strong> shows a statement true for ALL values; verification shows it for specific values only</li>' +
                '<li><strong>Identity:</strong> true for all values (\\(\\equiv\\)); prove by algebraic manipulation of one side</li>' +
                '<li><strong>Even:</strong> \\(n = 2k\\); <strong>Odd:</strong> \\(n = 2k+1\\) for integer \\(k\\)</li>' +
                '<li>\\(n(n+1)\\) is always even (consecutive integers)</li>' +
                '<li><strong>Counterexample:</strong> one specific case where a universal claim fails</li>' +
                '<li><strong>Inequality proofs:</strong> rearrange to show \\(\\geq 0\\), often use \\(x^2 \\geq 0\\)</li>' +
                '<li>AM-GM: \\(a^2 + b^2 \\geq 2ab\\), proved via \\((a-b)^2 \\geq 0\\)</li>' +
                '</ul>'
        }
    ]
};
