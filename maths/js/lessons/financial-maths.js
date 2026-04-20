const LESSON_FIN_MATHS = {
    id: 'financial-maths',
    title: 'Financial Mathematics',
    subtitle: 'Compound interest, present value, depreciation and real value',
    folder: 'number-algebra',
    screens: [
        // ── 1. Concept: Percentage Change ─────────────────────────
        {
            type: 'concept',
            title: 'Percentage Change',
            content: '<p>A percentage change multiplies a value by a <strong>multiplier</strong>.</p>' +
                '<div class="lesson-box">' +
                '<strong>Increase by r%:</strong> multiply by \\(1 + \\dfrac{r}{100}\\)<br><br>' +
                '<strong>Decrease by r%:</strong> multiply by \\(1 - \\dfrac{r}{100}\\)' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>\\$500 increased by 20%: \\(500 \\times 1.20 = \\$600\\)</li>' +
                '<li>\\$800 decreased by 15%: \\(800 \\times 0.85 = \\$680\\)</li>' +
                '</ul>' +
                '<p>To find the percentage change: \\(\\text{\\% change} = \\dfrac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\)</p>'
        },

        // ── 2. Practice: Percentage Change ────────────────────────
        {
            type: 'practice',
            intro: 'Find the new value after the percentage change:',
            generate: () => FIN_MATHS.qPercentageChange()
        },

        // ── 3. Concept: Compound Interest ─────────────────────────
        {
            type: 'concept',
            title: 'Compound Interest',
            content: '<p>With <strong>compound interest</strong>, interest is earned on both the principal <em>and</em> the previously accumulated interest. This is different from simple interest, where interest is only earned on the principal.</p>' +
                '<div class="lesson-box"><strong>Future Value Formula:</strong><br>' +
                '\\(FV = PV \\times (1 + r)^n\\)<br><br>' +
                'where: \\(PV\\) = present value (initial amount), \\(r\\) = interest rate per period (as a decimal), \\(n\\) = number of periods</div>' +
                '<p><strong>Example:</strong> \\$2000 at 5% p.a. for 3 years:<br>' +
                '\\(FV = 2000 \\times (1.05)^3 = 2000 \\times 1.157625 = \\$2315.25\\)</p>' +
                '<p>Compare with simple interest: \\(2000 + 2000 \\times 0.05 \\times 3 = \\$2300\\). Compound gives more!</p>'
        },

        // ── 4. Example: Future Value ───────────────────────────────
        {
            type: 'example',
            problem: 'Find the future value of \\$5000 invested for 4 years at 6% per annum compound interest.',
            steps: [
                { text: '<strong>Step 1:</strong> Identify: \\(PV = 5000\\), \\(r = 0.06\\), \\(n = 4\\).' },
                { text: '<strong>Step 2:</strong> Apply: \\(FV = PV \\times (1 + r)^n = 5000 \\times (1.06)^4\\).' },
                { text: '<strong>Step 3:</strong> \\((1.06)^4 = 1.26247696\\ldots\\)' },
                { text: '<strong>Answer:</strong> \\(FV = 5000 \\times 1.2624\\ldots = \\$6312.38\\) (to the nearest cent).' }
            ]
        },

        // ── 5. Practice: Future Value ──────────────────────────────
        {
            type: 'practice',
            intro: 'Find the future value of the investment:',
            generate: () => FIN_MATHS.qFutureValue()
        },

        // ── 6. Concept: Present Value ──────────────────────────────
        {
            type: 'concept',
            title: 'Present Value',
            content: '<p>The <strong>present value</strong> (PV) is the current worth of a future amount. We "discount" the future value back to the present.</p>' +
                '<div class="lesson-box"><strong>Present Value Formula:</strong><br>' +
                '\\(PV = \\dfrac{FV}{(1 + r)^n}\\)</div>' +
                '<p>This answers: "How much do I need to invest <em>now</em> to reach a target amount later?"</p>' +
                '<p><strong>Example:</strong> You want \\$10 000 in 5 years. The interest rate is 4% p.a. How much to invest now?<br>' +
                '\\(PV = \\dfrac{10000}{(1.04)^5} = \\dfrac{10000}{1.2166\\ldots} \\approx \\$8219.27\\)</p>'
        },

        // ── 7. Practice: Present Value ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the initial investment required:',
            generate: () => FIN_MATHS.qPresentValue()
        },

        // ── 8. Concept: Depreciation ──────────────────────────────
        {
            type: 'concept',
            title: 'Depreciation',
            content: '<p><strong>Depreciation</strong> is the reduction in value of an asset over time. <em>Reducing balance depreciation</em> uses the same formula as compound interest, but with \\((1 - r)\\).</p>' +
                '<div class="lesson-box"><strong>Depreciation Formula:</strong><br>' +
                '\\(V_n = V_0 \\times (1 - r)^n\\)<br><br>' +
                'where: \\(V_0\\) = initial value, \\(r\\) = depreciation rate per year, \\(n\\) = years</div>' +
                '<p><strong>Example:</strong> A car worth \\$25 000 depreciates at 20% per year. After 3 years:<br>' +
                '\\(V_3 = 25000 \\times (0.80)^3 = 25000 \\times 0.512 = \\$12 800\\)</p>' +
                '<p>Note that depreciation is exponential — the car loses less in absolute terms each year even though the percentage is the same.</p>'
        },

        // ── 9. Practice: Depreciation ─────────────────────────────
        {
            type: 'practice',
            intro: 'Find the depreciated value:',
            generate: () => FIN_MATHS.qDepreciation()
        },

        // ── 10. Concept: Compounding Frequency ────────────────────
        {
            type: 'concept',
            title: 'Compounding Frequency',
            content: '<p>Interest can be compounded at different frequencies: annually (k=1), monthly (k=12), weekly (k=52), daily (k=365).</p>' +
                '<div class="lesson-box"><strong>General Compound Interest:</strong><br>' +
                '\\(FV = PV \\times \\left(1 + \\dfrac{r}{k}\\right)^{nk}\\)<br><br>' +
                'where \\(k\\) is the number of compounding periods per year</div>' +
                '<p><strong>Example:</strong> \\$1000 at 6% p.a. for 2 years:<br>' +
                'Annual (k=1): \\(FV = 1000 \\times (1.06)^2 = \\$1123.60\\)<br>' +
                'Monthly (k=12): \\(FV = 1000 \\times (1.005)^{24} = \\$1127.16\\)</p>' +
                '<p>More frequent compounding always gives a higher return. The limit (continuous compounding) is \\(FV = PV \\times e^{rn}\\).</p>'
        },

        // ── 11. Practice: Compounding Frequency ───────────────────
        {
            type: 'practice',
            intro: 'Compare the compounding options:',
            generate: () => FIN_MATHS.qCompoundingFrequency()
        },

        // ── 12. Concept: Finding n and r ──────────────────────────
        {
            type: 'concept',
            title: 'Finding n and r',
            content: '<p>Sometimes you need to find the rate or the time period from the compound interest formula.</p>' +
                '<p><strong>Finding the rate r:</strong><br>' +
                'Rearrange \\(FV = PV(1+r)^n\\) to get:<br>' +
                '\\((1+r)^n = \\dfrac{FV}{PV} \\Rightarrow 1+r = \\left(\\dfrac{FV}{PV}\\right)^{1/n} \\Rightarrow r = \\left(\\dfrac{FV}{PV}\\right)^{1/n} - 1\\)</p>' +
                '<p><strong>Finding the time n:</strong><br>' +
                'Take logarithms of both sides:<br>' +
                '\\(n = \\dfrac{\\ln(FV/PV)}{\\ln(1+r)}\\)</p>' +
                '<p><strong>Rule of 72:</strong> A quick approximation — at \\(r\\%\\) per year, money doubles in approximately \\(\\dfrac{72}{r}\\) years.</p>'
        },

        // ── 13. Practice: Find Rate ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the annual interest rate:',
            generate: () => FIN_MATHS.qFindRate()
        },

        // ── 14. Practice: Find n ───────────────────────────────────
        {
            type: 'practice',
            intro: 'Find how many years the investment takes:',
            generate: () => FIN_MATHS.qFindN()
        },

        // ── 15. Concept: Real Value ────────────────────────────────
        {
            type: 'concept',
            title: 'Real Value and Inflation',
            content: '<p><strong>Inflation</strong> reduces the purchasing power of money. Even if your investment grows, its <em>real value</em> (what you can actually buy) may be less than the nominal value suggests.</p>' +
                '<div class="lesson-box"><strong>Real Value Formula:</strong><br>' +
                '\\(\\text{Real FV} = PV \\times \\left(\\dfrac{1 + r}{1 + i}\\right)^n\\)<br><br>' +
                'where \\(r\\) = investment rate, \\(i\\) = inflation rate</div>' +
                '<p><strong>Example:</strong> \\$10 000 invested at 7% for 5 years, inflation 3%:<br>' +
                '\\(\\text{Real FV} = 10000 \\times \\left(\\dfrac{1.07}{1.03}\\right)^5 = 10000 \\times (1.0388)^5 \\approx \\$12098\\)<br>' +
                'Nominal FV would be \\$14026 — but the real increase in buying power is only about \\$2098.</p>'
        },

        // ── 16. Practice: Real Value ───────────────────────────────
        {
            type: 'practice',
            intro: 'Find the real value of the investment:',
            generate: () => FIN_MATHS.qRealValue()
        },

        // ── 17. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Percentage increase by r%:</strong> multiply by \\((1 + r/100)\\)</li>' +
                '<li><strong>Percentage decrease by r%:</strong> multiply by \\((1 - r/100)\\)</li>' +
                '<li><strong>Future value:</strong> \\(FV = PV(1+r)^n\\)</li>' +
                '<li><strong>Present value:</strong> \\(PV = FV/(1+r)^n\\)</li>' +
                '<li><strong>Depreciation:</strong> \\(V_n = V_0(1-r)^n\\)</li>' +
                '<li><strong>k compoundings per year:</strong> \\(FV = PV(1+r/k)^{nk}\\)</li>' +
                '<li><strong>Find r:</strong> \\(r = (FV/PV)^{1/n} - 1\\)</li>' +
                '<li><strong>Find n:</strong> \\(n = \\ln(FV/PV) \\div \\ln(1+r)\\)</li>' +
                '<li><strong>Rule of 72:</strong> doubling time \\(\\approx 72/r\\%\\)</li>' +
                '<li><strong>Real value:</strong> \\(PV \\times [(1+r)/(1+i)]^n\\)</li>' +
                '</ul>'
        }
    ]
};
