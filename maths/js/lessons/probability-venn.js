const LESSON_PROB_VENN = {
    id: 'probability-venn',
    title: 'Probability & Venn Diagrams',
    subtitle: 'Addition rule, conditional probability, and independence',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: Basic Probability Rules ───────────────────────
        {
            type: 'concept',
            title: 'Basic Probability Rules',
            content: '<p>Probability measures how likely an event is to occur, always on a scale from 0 to 1.</p>' +
                '<div class="lesson-box">' +
                '<strong>Core rules:</strong><br>' +
                '\\(P(A) \\in [0, 1]\\) — probability is always between 0 and 1<br>' +
                '\\(P(\\text{certain event}) = 1\\)<br>' +
                '\\(P(\\text{impossible event}) = 0\\)<br>' +
                '\\(P(A\') = 1 - P(A)\\) — the complement rule' +
                '</div>' +
                '<p>For <strong>equally likely outcomes</strong>, the probability of event \\(A\\) is:</p>' +
                '<p>\\[P(A) = \\frac{n(A)}{n(\\text{total})}\\]</p>' +
                '<p>where \\(n(A)\\) is the number of outcomes in \\(A\\) and \\(n(\\text{total})\\) is the total number of outcomes in the sample space.</p>' +
                '<ul>' +
                '<li><strong>Event:</strong> a subset of the sample space</li>' +
                '<li><strong>Complement \\(A\'\\):</strong> all outcomes not in \\(A\\)</li>' +
                '<li><strong>Sample space \\(U\\):</strong> the set of all possible outcomes</li>' +
                '</ul>'
        },

        // ── 2. Practice: Find P(A) ────────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A) from the Venn diagram data:',
            generate: () => PROB_VENN.qProbA()
        },

        // ── 3. Practice: Find P(A') ───────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the complementary probability P(A\'):',
            generate: () => PROB_VENN.qProbComplement()
        },

        // ── 4. Concept: Venn Diagrams & the Addition Rule ─────────────
        {
            type: 'concept',
            title: 'Venn Diagrams & the Addition Rule',
            content: '<p>A <strong>Venn diagram</strong> uses overlapping circles inside a rectangle (the universal set \\(U\\)) to show the relationship between events.</p>' +
                '<p>The overlap region represents the <strong>intersection</strong> \\(A \\cap B\\) — outcomes in both \\(A\\) and \\(B\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>Addition Rule:</strong><br>' +
                '\\[P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\]' +
                'We subtract \\(P(A \\cap B)\\) to avoid counting the overlap twice.<br><br>' +
                '<strong>Mutually exclusive events</strong> have no overlap:<br>' +
                '\\(P(A \\cap B) = 0\\), so \\(P(A \\cup B) = P(A) + P(B)\\)' +
                '</div>' +
                '<p>Key regions in a Venn diagram:</p>' +
                '<ul>' +
                '<li>\\(A \\cap B\\): inside both circles (intersection)</li>' +
                '<li>\\(A \\cup B\\): inside at least one circle (union)</li>' +
                '<li>\\(A\' \\cap B\'\\): outside both circles</li>' +
                '</ul>'
        },

        // ── 5. Example: Using the Addition Rule ───────────────────────
        {
            type: 'example',
            problem: '\\(P(A) = 0.4\\), \\(P(B) = 0.3\\), \\(P(A \\cap B) = 0.1\\). Find \\(P(A \\cup B)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Write down the addition rule: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).' },
                { text: '<strong>Step 2:</strong> Substitute the given values: \\(P(A \\cup B) = 0.4 + 0.3 - 0.1\\).' },
                { text: '<strong>Answer:</strong> \\(P(A \\cup B) = 0.6\\).' }
            ]
        },

        // ── 6. Practice: Find P(A∩B) ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A∩B) from the Venn diagram:',
            generate: () => PROB_VENN.qProbIntersection()
        },

        // ── 7. Practice: Find P(A∪B) ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A∪B) using the addition rule:',
            generate: () => PROB_VENN.qProbUnion()
        },

        // ── 8. Practice: Addition Rule ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A∪B) given the three probabilities:',
            generate: () => PROB_VENN.qAdditionRule()
        },

        // ── 9. Practice: Mutually Exclusive ───────────────────────────
        {
            type: 'practice',
            intro: 'Apply the mutually exclusive rule:',
            generate: () => PROB_VENN.qMutuallyExclusive()
        },

        // ── 10. Concept: Conditional Probability ──────────────────────
        {
            type: 'concept',
            title: 'Conditional Probability',
            content: '<p><strong>Conditional probability</strong> is the probability of event \\(A\\) occurring given that event \\(B\\) has already occurred.</p>' +
                '<div class="lesson-box">' +
                '<strong>Conditional Probability Formula:</strong><br>' +
                '\\[P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) \\neq 0\\]' +
                'Read as "the probability of \\(A\\) given \\(B\\)".<br><br>' +
                '<strong>Independence:</strong> Events \\(A\\) and \\(B\\) are independent if:<br>' +
                '\\(P(A \\mid B) = P(A)\\), equivalently \\(P(A \\cap B) = P(A) \\cdot P(B)\\)' +
                '</div>' +
                '<p>Conditioning on \\(B\\) <strong>restricts the sample space</strong> to outcomes within \\(B\\), then measures what fraction of those are also in \\(A\\).</p>' +
                '<ul>' +
                '<li>If \\(P(A \\mid B) = P(A)\\), knowing \\(B\\) occurred gives no information about \\(A\\)</li>' +
                '<li>If \\(P(A \\mid B) \\neq P(A)\\), the events are dependent</li>' +
                '</ul>'
        },

        // ── 11. Example: Calculating P(A|B) ───────────────────────────
        {
            type: 'example',
            problem: '\\(P(A \\cap B) = 0.15\\), \\(P(B) = 0.3\\). Find \\(P(A \\mid B)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Write down the conditional probability formula: \\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}\\).' },
                { text: '<strong>Step 2:</strong> Substitute the given values: \\(P(A \\mid B) = \\dfrac{0.15}{0.3}\\).' },
                { text: '<strong>Answer:</strong> \\(P(A \\mid B) = 0.5\\).' }
            ]
        },

        // ── 12. Practice: Find P(A|B) ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A|B) from the Venn data:',
            generate: () => PROB_VENN.qConditionalP()
        },

        // ── 13. Practice: Find P(A|B') ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A|B\') from the Venn data:',
            generate: () => PROB_VENN.qConditionalComplement()
        },

        // ── 14. Practice: Independence Test ───────────────────────────
        {
            type: 'practice',
            intro: 'Test whether the events are independent:',
            generate: () => PROB_VENN.qIndependenceTest()
        },

        // ── 15. Practice: Bayes' Theorem ──────────────────────────────
        {
            type: 'practice',
            intro: 'Use Bayes\' theorem to find P(B|A):',
            generate: () => PROB_VENN.qBayesSimple()
        },

        // ── 16. Summary ────────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(P(A\') = 1 - P(A)\\) — complement rule</li>' +
                '<li>\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\) — addition rule</li>' +
                '<li>Mutually exclusive: \\(P(A \\cap B) = 0\\), so \\(P(A \\cup B) = P(A) + P(B)\\)</li>' +
                '<li>\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}\\) — conditional probability</li>' +
                '<li>Independent: \\(P(A \\cap B) = P(A) \\cdot P(B)\\)</li>' +
                '<li>\\(P(A \\mid B) = P(A)\\) if and only if \\(A\\) and \\(B\\) are independent</li>' +
                '</ul>'
        }
    ]
};
