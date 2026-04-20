const LESSON_NUMBERS_ROUNDING = {
    id: 'numbers-rounding',
    title: 'Numbers & Rounding',
    subtitle: 'Number sets, rounding, standard form, percentage error, bounds',
    folder: 'number-algebra',
    screens: [
        // ── 1. Concept: Number Sets ───────────────────────────────
        {
            type: 'concept',
            title: 'The Number Sets',
            content: '<p>Numbers are classified into nested sets. Each set is a subset of all sets to the right.</p>' +
                '<div class="lesson-box"><strong>Natural numbers \\(\\mathbb{N}\\):</strong> \\(0, 1, 2, 3, 4, \\ldots\\) (non-negative integers)</div>' +
                '<div class="lesson-box"><strong>Integers \\(\\mathbb{Z}\\):</strong> \\(\\ldots, -3, -2, -1, 0, 1, 2, 3, \\ldots\\) (positive and negative whole numbers)</div>' +
                '<div class="lesson-box"><strong>Rational numbers \\(\\mathbb{Q}\\):</strong> any number expressible as \\(\\dfrac{p}{q}\\) where \\(p, q \\in \\mathbb{Z},\\, q \\neq 0\\). Includes all terminating and recurring decimals.</div>' +
                '<div class="lesson-box"><strong>Real numbers \\(\\mathbb{R}\\):</strong> all rational numbers <em>plus</em> irrational numbers such as \\(\\sqrt{2}\\), \\(\\pi\\), \\(e\\).</div>' +
                '<p>The containment is: \\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}\\).</p>' +
                '<p><strong>Irrational numbers</strong> have infinite, non-recurring decimal expansions and cannot be written as \\(\\tfrac{p}{q}\\).</p>'
        },

        // ── 2. Practice: Number Sets ──────────────────────────────
        {
            type: 'practice',
            intro: 'Identify the smallest set this number belongs to:',
            generate: () => NUMBERS_ROUNDING.qNumberSet()
        },

        // ── 3. Concept: Rounding to Decimal Places ───────────────
        {
            type: 'concept',
            title: 'Rounding to Decimal Places (d.p.)',
            content: '<p>To round a number to \\(n\\) decimal places:</p>' +
                '<ol>' +
                '<li>Look at the \\((n+1)\\)th decimal digit.</li>' +
                '<li>If it is <strong>5 or more</strong>, round the \\(n\\)th digit <strong>up</strong> by 1.</li>' +
                '<li>If it is <strong>less than 5</strong>, leave the \\(n\\)th digit unchanged.</li>' +
                '<li>Drop all digits after the \\(n\\)th decimal place.</li>' +
                '</ol>' +
                '<div class="lesson-box"><strong>Example:</strong> Round \\(3.7462\\) to 2 d.p.<br>' +
                'The 3rd decimal digit is 6 &ge; 5, so round up: \\(3.7462 \\approx 3.75\\).</div>' +
                '<div class="lesson-box"><strong>Example:</strong> Round \\(0.8431\\) to 2 d.p.<br>' +
                'The 3rd decimal digit is 3 &lt; 5, so round down: \\(0.8431 \\approx 0.84\\).</div>'
        },

        // ── 4. Practice: Round to d.p. ────────────────────────────
        {
            type: 'practice',
            intro: 'Round to the specified number of decimal places:',
            generate: () => NUMBERS_ROUNDING.qRoundDP()
        },

        // ── 5. Concept: Significant Figures ──────────────────────
        {
            type: 'concept',
            title: 'Rounding to Significant Figures (s.f.)',
            content: '<p>Significant figures count from the <strong>first non-zero digit</strong>. To round to \\(n\\) s.f.:</p>' +
                '<ol>' +
                '<li>Find the \\(n\\)th significant figure.</li>' +
                '<li>Look at the digit immediately after it.</li>' +
                '<li>Apply the same rule as for d.p. rounding.</li>' +
                '<li>Replace digits after the \\(n\\)th s.f. with zeros (if before the decimal point) or drop them (if after).</li>' +
                '</ol>' +
                '<div class="lesson-box"><strong>Example:</strong> Round \\(0.003472\\) to 2 s.f.<br>' +
                'First non-zero digit is 3. Two s.f. gives \\(0.0034\\) (since the next digit, 7, rounds up: \\(\\approx 0.0035\\)).</div>' +
                '<div class="lesson-box"><strong>Example:</strong> Round \\(47830\\) to 3 s.f.<br>' +
                'Three s.f.: \\(4, 7, 8\\) - the next digit is 3 &lt; 5, so \\(47830 \\approx 47800\\).</div>'
        },

        // ── 6. Practice: Round to s.f. ────────────────────────────
        {
            type: 'practice',
            intro: 'Round to the specified number of significant figures:',
            generate: () => NUMBERS_ROUNDING.qRoundSF()
        },

        // ── 7. Concept: Standard Form ─────────────────────────────
        {
            type: 'concept',
            title: 'Standard Form (Scientific Notation)',
            content: '<p>Standard form expresses any number as:</p>' +
                '<div class="lesson-box">\\(a \\times 10^k\\) where \\(1 \\leq a < 10\\) and \\(k \\in \\mathbb{Z}\\)</div>' +
                '<p>To convert to standard form:</p>' +
                '<ol>' +
                '<li>Move the decimal point until \\(1 \\leq a < 10\\).</li>' +
                '<li>Count the places moved: moving <em>left</em> gives a <em>positive</em> exponent, moving <em>right</em> gives a <em>negative</em> exponent.</li>' +
                '</ol>' +
                '<div class="lesson-box"><strong>Large number:</strong> \\(45\\,200 = 4.52 \\times 10^4\\)</div>' +
                '<div class="lesson-box"><strong>Small number:</strong> \\(0.000307 = 3.07 \\times 10^{-4}\\)</div>' +
                '<p><strong>Note:</strong> Standard form is especially useful in science when dealing with very large (e.g., \\(6.022 \\times 10^{23}\\) atoms) or very small (e.g., \\(9.11 \\times 10^{-31}\\) kg) quantities.</p>'
        },

        // ── 8. Example: Standard Form ─────────────────────────────
        {
            type: 'example',
            problem: 'Write \\(0.000052\\) in standard form.',
            steps: [
                { text: '<strong>Step 1:</strong> Move the decimal point right until \\(1 \\leq a < 10\\): \\(0.000052 \\to 5.2\\).' },
                { text: '<strong>Step 2:</strong> Count places moved right: 5 places, so exponent \\(= -5\\).' },
                { text: '<strong>Answer:</strong> \\(0.000052 = 5.2 \\times 10^{-5}\\).' }
            ]
        },

        // ── 9. Practice: Standard Form ────────────────────────────
        {
            type: 'practice',
            intro: 'Select the correct standard form representation:',
            generate: () => NUMBERS_ROUNDING.qStandardForm()
        },

        // ── 10. Concept: Percentage Error ─────────────────────────
        {
            type: 'concept',
            title: 'Percentage Error',
            content: '<p>When an approximate value \\(v_A\\) is used instead of the exact value \\(v_E\\), the <strong>percentage error</strong> is:</p>' +
                '<div class="lesson-box">\\(\\varepsilon = \\dfrac{|v_A - v_E|}{|v_E|} \\times 100\\%\\)</div>' +
                '<p>Key points:</p>' +
                '<ul>' +
                '<li>The absolute value \\(|\\cdot|\\) means percentage error is always <em>positive</em>.</li>' +
                '<li>We divide by \\(|v_E|\\) (the <em>exact</em> value), not the approximate value.</li>' +
                '<li>A small percentage error means the approximation is accurate.</li>' +
                '</ul>' +
                '<div class="lesson-box"><strong>Example:</strong> A student measures gravity as \\(9.75\\text{ m s}^{-2}\\). Exact value: \\(9.81\\text{ m s}^{-2}\\).<br>' +
                '\\(\\varepsilon = \\dfrac{|9.75 - 9.81|}{9.81} \\times 100 = \\dfrac{0.06}{9.81} \\times 100 \\approx 0.61\\%\\)</div>'
        },

        // ── 11. Practice: Percentage Error ────────────────────────
        {
            type: 'practice',
            intro: 'Calculate the percentage error (to 2 d.p.):',
            generate: () => NUMBERS_ROUNDING.qPercentError()
        },

        // ── 12. Concept: Upper and Lower Bounds ───────────────────
        {
            type: 'concept',
            title: 'Upper and Lower Bounds',
            content: '<p>When a measurement is rounded, the <strong>true value</strong> lies within an interval called the <strong>bounds</strong>.</p>' +
                '<div class="lesson-box">If a value is rounded to \\(n\\) decimal places, the maximum error is \\(\\pm 0.5 \\times 10^{-n}\\).<br>' +
                '<strong>Lower bound</strong> \\(= \\text{rounded value} - 0.5 \\times 10^{-n}\\)<br>' +
                '<strong>Upper bound</strong> \\(= \\text{rounded value} + 0.5 \\times 10^{-n}\\)</div>' +
                '<p><strong>Example:</strong> A length is \\(12.4\\text{ cm}\\) to 1 d.p.</p>' +
                '<ul>' +
                '<li>Max error \\(= 0.5 \\times 10^{-1} = 0.05\\)</li>' +
                '<li>Lower bound \\(= 12.4 - 0.05 = 12.35\\text{ cm}\\)</li>' +
                '<li>Upper bound \\(= 12.4 + 0.05 = 12.45\\text{ cm}\\)</li>' +
                '</ul>' +
                '<p>We write: \\(12.35 \\leq \\text{length} < 12.45\\text{ cm}\\).</p>' +
                '<p><strong>Note:</strong> The upper bound is <em>not</em> included (any value right up to but not including 12.45 would round to 12.4).</p>'
        },

        // ── 13. Practice: Bounds ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the specified bound:',
            generate: () => NUMBERS_ROUNDING.qBoundsDP()
        },

        // ── 14. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Number sets:</strong> \\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}\\)</li>' +
                '<li><strong>Rounding to d.p.:</strong> look at next digit - &ge;5 round up, &lt;5 round down</li>' +
                '<li><strong>Significant figures:</strong> count from first non-zero digit</li>' +
                '<li><strong>Standard form:</strong> \\(a \\times 10^k\\), \\(1 \\leq a < 10\\), \\(k \\in \\mathbb{Z}\\)</li>' +
                '<li><strong>Percentage error:</strong> \\(\\varepsilon = \\dfrac{|v_A - v_E|}{|v_E|} \\times 100\\%\\)</li>' +
                '<li><strong>Bounds (n d.p.):</strong> rounded value \\(\\pm\\, 0.5 \\times 10^{-n}\\)</li>' +
                '</ul>'
        }
    ]
};
