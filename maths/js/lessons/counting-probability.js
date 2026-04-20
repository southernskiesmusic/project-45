const LESSON_COUNTING = {
    id: 'counting-probability',
    title: 'Counting & Probability',
    subtitle: 'Permutations, combinations, and counting-based probability',
    folder: 'stats-probability',
    screens: [
        // ── 1. Concept: Permutations ─────────────────────────────
        {
            type: 'concept',
            title: 'Permutations',
            content: '<p>A <strong>permutation</strong> is an ordered arrangement. The number of ways to arrange \\(r\\) objects from \\(n\\) distinct objects is:</p>' +
                '<div class="lesson-box">' +
                '\\({}^n P_r = \\dfrac{n!}{(n-r)!}\\)' +
                '<br><br>' +
                '<strong>Special case:</strong> arranging all \\(n\\) objects: \\(n!\\) ways.' +
                '</div>' +
                '<p><strong>Key vocabulary:</strong></p>' +
                '<ul>' +
                '<li><strong>Permutation:</strong> order matters</li>' +
                '<li><strong>\\(n!\\):</strong> \\(n \\times (n-1) \\times \\cdots \\times 2 \\times 1\\)</li>' +
                '<li>\\(0! = 1\\) by convention</li>' +
                '</ul>' +
                '<p><strong>Example:</strong> How many ways to arrange 3 books from 7? \\({}^7P_3 = \\frac{7!}{4!} = 7\\times6\\times5 = 210\\).</p>'
        },

        // ── 2. Practice: Permutation ──────────────────────────────
        {
            type: 'practice',
            intro: 'Calculate the number of ordered arrangements:',
            generate: () => COUNTING.qPermutation()
        },

        // ── 3. Practice: All Arrangements ────────────────────────
        {
            type: 'practice',
            intro: 'Find the number of ways to arrange all the objects:',
            generate: () => COUNTING.qArrangementsAll()
        },

        // ── 4. Example: Restricted Arrangement ───────────────────
        {
            type: 'example',
            problem: 'In how many ways can 5 people sit in a row if person A must sit first?',
            steps: [
                { text: '<strong>Step 1:</strong> Person A is fixed in seat 1: 1 choice.' },
                { text: '<strong>Step 2:</strong> The remaining 4 people arrange in seats 2–5: \\(4! = 24\\) ways.' },
                { text: '<strong>Answer:</strong> \\(1 \\times 24 = 24\\) arrangements.' }
            ]
        },

        // ── 5. Practice: Restricted Arrangement ──────────────────
        {
            type: 'practice',
            intro: 'Find the number of arrangements with the given restriction:',
            generate: () => COUNTING.qArrangementsRestrict()
        },

        // ── 6. Concept: Combinations ─────────────────────────────
        {
            type: 'concept',
            title: 'Combinations',
            content: '<p>A <strong>combination</strong> is a selection where <em>order does not matter</em>. The number of ways to choose \\(r\\) objects from \\(n\\) is:</p>' +
                '<div class="lesson-box">' +
                '\\(\\binom{n}{r} = {}^n C_r = \\dfrac{n!}{r!(n-r)!}\\)' +
                '</div>' +
                '<p><strong>Permutation vs Combination:</strong></p>' +
                '<ul>' +
                '<li>Permutation (order matters): \\({}^nP_r = \\frac{n!}{(n-r)!}\\)</li>' +
                '<li>Combination (order doesn\'t matter): \\(\\binom{n}{r} = \\frac{{}^nP_r}{r!}\\)</li>' +
                '</ul>' +
                '<p><strong>Example:</strong> Choose 3 from 8 (no order): \\(\\binom{8}{3} = \\frac{8!}{3!\\cdot5!} = 56\\).</p>' +
                '<p><strong>Counting-based probability:</strong></p>' +
                '\\[P(\\text{event}) = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}\\]'
        },

        // ── 7. Practice: Combination ──────────────────────────────
        {
            type: 'practice',
            intro: 'Calculate the number of ways to choose (order does not matter):',
            generate: () => COUNTING.qCombination()
        },

        // ── 8. Practice: Binomial Coefficient ────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the binomial coefficient:',
            generate: () => COUNTING.qBinomialCoeff()
        },

        // ── 9. Example: Probability from Counting ────────────────
        {
            type: 'example',
            problem: 'A bag contains 4 red and 3 blue balls. Two are drawn at random. Find P(both red).',
            steps: [
                { text: '<strong>Step 1:</strong> Total ways to choose 2 from 7: \\(\\binom{7}{2} = 21\\).' },
                { text: '<strong>Step 2:</strong> Favourable (both red): \\(\\binom{4}{2} = 6\\).' },
                { text: '<strong>Answer:</strong> \\(P = \\dfrac{6}{21} = \\dfrac{2}{7}\\).' }
            ]
        },

        // ── 10. Practice: Probability from Counting ──────────────
        {
            type: 'practice',
            intro: 'Find the probability using combinations:',
            generate: () => COUNTING.qProbCounting()
        },

        // ── 11. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Permutation (ordered): \\({}^nP_r = \\frac{n!}{(n-r)!}\\)</li>' +
                '<li>All arrangements of \\(n\\) objects: \\(n!\\)</li>' +
                '<li>Combination (unordered): \\(\\binom{n}{r} = \\frac{n!}{r!(n-r)!}\\)</li>' +
                '<li>\\(\\binom{n}{r} = \\binom{n}{n-r}\\) (symmetry)</li>' +
                '<li>Restrictions: fix the constrained item(s), then count the rest</li>' +
                '<li>Probability: \\(P = \\frac{\\text{favourable}}{\\text{total}}\\)</li>' +
                '<li>Circular arrangements: \\((n-1)!\\) ways</li>' +
                '</ul>'
        }
    ]
};
