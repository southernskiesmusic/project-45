const LESSON_PROB_TREES = {
    id: 'probability-trees',
    title: 'Probability Trees',
    subtitle: 'Tree diagrams, combined events, and Bayes theorem',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: Tree Diagrams ──────────────────────────────
        {
            type: 'concept',
            title: 'Tree Diagrams',
            content: '<p>A <strong>probability tree</strong> represents sequential events as branches. Each branch is labelled with the probability of that outcome occurring.</p>' +
                '<div class="lesson-box">' +
                '<strong>Key rules:</strong><br>' +
                '1. Probabilities on branches from the same node <strong>sum to 1</strong>.<br>' +
                '2. <strong>Multiply along a path</strong> to find the probability of that sequence of outcomes.<br>' +
                '3. <strong>Sum the relevant paths</strong> to find the probability of a combined event.' +
                '</div>' +
                '<p>For example, if \\(P(A) = 0.4\\) and \\(P(B|A) = 0.7\\), then:</p>' +
                '<ul>' +
                '<li>\\(P(A \\cap B) = P(A) \\times P(B|A) = 0.4 \\times 0.7 = 0.28\\)</li>' +
                '<li>The branch for \\(A\'\\) has probability \\(1 - 0.4 = 0.6\\)</li>' +
                '</ul>' +
                '<p>Tree diagrams are especially useful when events occur <strong>in stages</strong> and probabilities at later stages depend on earlier outcomes.</p>'
        },

        // ── 2. Practice: Complement Branch ────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A\') from the branch probability:',
            generate: () => PROB_TREES.qComplementBranch()
        },

        // ── 3. Practice: Path Probability ─────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A∩B) by multiplying along the path:',
            generate: () => PROB_TREES.qPathProbability()
        },

        // ── 4. Practice: Independent Events ───────────────────────
        {
            type: 'practice',
            intro: 'Find P(A∩B) for independent events:',
            generate: () => PROB_TREES.qIndependentEvents()
        },

        // ── 5. Example: Two-Stage Tree ─────────────────────────────
        {
            type: 'example',
            problem: 'A bag has 3 red and 2 blue balls. Two balls are drawn with replacement. Find \\(P(\\text{same colour})\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Set up the tree. \\(P(R) = \\tfrac{3}{5}\\), \\(P(B) = \\tfrac{2}{5}\\). With replacement, these probabilities are the same on the second draw.' },
                { text: '<strong>Step 2:</strong> Multiply along each path.<br>\\(P(RR) = \\tfrac{3}{5} \\times \\tfrac{3}{5} = \\tfrac{9}{25}\\)<br>\\(P(BB) = \\tfrac{2}{5} \\times \\tfrac{2}{5} = \\tfrac{4}{25}\\)' },
                { text: '<strong>Step 3:</strong> Sum the paths that give the same colour.<br>\\(P(\\text{same}) = \\tfrac{9}{25} + \\tfrac{4}{25} = \\tfrac{13}{25} = 0.52\\)' },
                { text: '<strong>Answer:</strong> \\(P(\\text{same colour}) = \\tfrac{13}{25} = 0.52\\).' }
            ]
        },

        // ── 6. Practice: Exactly One Success ──────────────────────
        {
            type: 'practice',
            intro: 'Find P(exactly one success):',
            generate: () => PROB_TREES.qExactlyOne()
        },

        // ── 7. Practice: At Least One Success ─────────────────────
        {
            type: 'practice',
            intro: 'Find P(at least one success):',
            generate: () => PROB_TREES.qAtLeastOne()
        },

        // ── 8. Practice: Same Colour (Replacement) ────────────────
        {
            type: 'practice',
            intro: 'Find P(same colour) for two draws with replacement:',
            generate: () => PROB_TREES.qRealWorldTree()
        },

        // ── 9. Concept: Conditional Probability from Trees ─────────
        {
            type: 'concept',
            title: 'Conditional Probability from Trees',
            content: '<p><strong>Conditional probability</strong> asks: given that a particular result occurred, what is the probability a specific path was taken?</p>' +
                '<div class="lesson-box">' +
                '\\(P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}\\)<br><br>' +
                'where \\(P(B) = \\sum\\) (all paths that reach outcome \\(B\\)).' +
                '</div>' +
                '<p>To apply this from a tree diagram:</p>' +
                '<ol>' +
                '<li><strong>Identify</strong> all branches that end in the condition (\\(B\\)).</li>' +
                '<li><strong>Sum</strong> their path probabilities to find \\(P(B)\\).</li>' +
                '<li><strong>Divide</strong> the path probability for \\(A \\cap B\\) by \\(P(B)\\).</li>' +
                '</ol>' +
                '<p>This technique — finding a cause given an observed result — is called <strong>Bayes\' theorem</strong> and is a key IB AA topic.</p>'
        },

        // ── 10. Example: Reverse Conditional (Bayes) ──────────────
        {
            type: 'example',
            problem: '\\(P(\\text{disease}) = 0.1\\). A test gives a positive result in 90% of diseased cases and a 20% false-positive rate. Given a positive test, find \\(P(\\text{has disease})\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the path probabilities for a positive test.<br>\\(P(D \\cap \\text{Pos}) = 0.1 \\times 0.9 = 0.09\\)<br>\\(P(D\' \\cap \\text{Pos}) = 0.9 \\times 0.2 = 0.18\\)' },
                { text: '<strong>Step 2:</strong> Sum all paths reaching a positive result.<br>\\(P(\\text{Pos}) = 0.09 + 0.18 = 0.27\\)' },
                { text: '<strong>Step 3:</strong> Apply Bayes\' theorem.<br>\\(P(D|\\text{Pos}) = \\dfrac{P(D \\cap \\text{Pos})}{P(\\text{Pos})} = \\dfrac{0.09}{0.27} = \\tfrac{1}{3} \\approx 0.333\\)' },
                { text: '<strong>Answer:</strong> \\(P(\\text{disease} \\mid \\text{positive}) = \\tfrac{1}{3} \\approx 0.333\\).' }
            ]
        },

        // ── 11. Practice: Conditional from Tree ───────────────────
        {
            type: 'practice',
            intro: 'Find P(A|B) using the tree diagram:',
            generate: () => PROB_TREES.qConditionalFromTree()
        },

        // ── 12. Practice: Three-Stage Tree ────────────────────────
        {
            type: 'practice',
            intro: 'Find the probability using a three-stage tree:',
            generate: () => PROB_TREES.qThreeStageTree()
        },

        // ── 13. Practice: Expected Value ───────────────────────────
        {
            type: 'practice',
            intro: 'Find the expected value from the probability tree:',
            generate: () => PROB_TREES.qExpectedValue()
        },

        // ── 14. Practice: Or Rule ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find P(A∪B) by summing the relevant paths:',
            generate: () => PROB_TREES.qOrRule()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Multiply along branches</strong> to find \\(P(\\text{path})\\)</li>' +
                '<li><strong>Sum paths</strong> to find the total probability of an event</li>' +
                '<li>\\(P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}\\) — restrict to branches reaching \\(B\\)</li>' +
                '<li><strong>At least one</strong> \\(= 1 - P(\\text{none})\\)</li>' +
                '<li>Branches at each node <strong>sum to 1</strong></li>' +
                '<li>Independent events: \\(P(A \\cap B) = P(A) \\cdot P(B)\\)</li>' +
                '</ul>'
        }
    ]
};
