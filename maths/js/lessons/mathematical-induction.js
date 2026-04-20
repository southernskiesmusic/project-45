const LESSON_MATH_IND = {
    id: 'mathematical-induction',
    title: 'Mathematical Induction',
    subtitle: 'Proof by induction — base case, inductive step, series and divisibility',
    folder: 'number-algebra',
    screens: [
        {
            type: 'concept',
            title: 'Proof by Mathematical Induction',
            content: '<p><strong>Mathematical induction</strong> is a technique to prove statements \\(P(n)\\) are true for all positive integers \\(n\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>Structure of an induction proof:</strong><br><br>' +
                '<strong>1. Base case:</strong> Show \\(P(1)\\) (or \\(P(0)\\)) is true.<br><br>' +
                '<strong>2. Inductive step:</strong> Assume \\(P(k)\\) is true (inductive hypothesis). Prove \\(P(k+1)\\) is true.<br><br>' +
                '<strong>Conclusion:</strong> By induction, \\(P(n)\\) is true for all \\(n \\geq 1\\).' +
                '</div>' +
                '<p>Think of it like dominoes: once the first falls (base case), and each falling domino knocks the next (inductive step), they all fall.</p>'
        },
        {
            type: 'practice',
            intro: 'Evaluate the series sum using the closed form:',
            generate: () => MATH_IND.qSeriesSum()
        },
        {
            type: 'practice',
            intro: 'Evaluate the sum of squares:',
            generate: () => MATH_IND.qSeriesSquares()
        },
        {
            type: 'example',
            problem: 'Prove by induction that \\(\\displaystyle\\sum_{k=1}^n k = \\frac{n(n+1)}{2}\\).',
            steps: [
                { text: '<strong>Base case:</strong> \\(n=1\\): LHS \\(= 1\\), RHS \\(= \\frac{1\\cdot2}{2} = 1\\). ✓' },
                { text: '<strong>Inductive hypothesis:</strong> Assume \\(\\sum_{k=1}^m k = \\frac{m(m+1)}{2}\\).' },
                { text: '<strong>Inductive step:</strong> \\(\\sum_{k=1}^{m+1} k = \\frac{m(m+1)}{2} + (m+1) = \\frac{m(m+1)+2(m+1)}{2} = \\frac{(m+1)(m+2)}{2}\\).' },
                { text: '<strong>Conclusion:</strong> This is the formula for \\(n = m+1\\). By induction, the result holds for all \\(n \\geq 1\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Identify the base case:',
            generate: () => MATH_IND.qBaseCase()
        },
        {
            type: 'practice',
            intro: 'Identify what the inductive step proves:',
            generate: () => MATH_IND.qInductiveStep()
        },
        {
            type: 'concept',
            title: 'Common Series and Divisibility',
            content: '<p><strong>Key series formulas</strong> provable by induction:</p>' +
                '<div class="lesson-box">' +
                '\\(\\displaystyle\\sum_{k=1}^n k = \\frac{n(n+1)}{2}\\)<br><br>' +
                '\\(\\displaystyle\\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6}\\)<br><br>' +
                '\\(\\displaystyle\\sum_{k=0}^{n-1} r^k = \\frac{r^n - 1}{r-1}\\) (geometric, \\(r \\neq 1\\))' +
                '</div>' +
                '<p><strong>Divisibility proofs:</strong> Show \\(f(n)\\) is divisible by \\(d\\) for all \\(n\\).</p>' +
                '<p>Key: write \\(f(k+1)\\) in terms of \\(f(k)\\). If \\(f(k+1) = f(k) + g(k)\\) where \\(d \\mid f(k)\\) and \\(d \\mid g(k)\\), then \\(d \\mid f(k+1)\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Check the divisibility using the induction result:',
            generate: () => MATH_IND.qDivisibilityCheck()
        },
        {
            type: 'practice',
            intro: 'Evaluate the geometric series:',
            generate: () => MATH_IND.qGeomSeries()
        },
        {
            type: 'practice',
            intro: 'Identify the closed form of the geometric series:',
            generate: () => MATH_IND.qClosedForm()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Base case:</strong> verify \\(P(1)\\) directly</li>' +
                '<li><strong>Inductive step:</strong> assume \\(P(k)\\), prove \\(P(k+1)\\)</li>' +
                '<li>\\(1+2+\\cdots+n = n(n+1)/2\\)</li>' +
                '<li>\\(1^2+2^2+\\cdots+n^2 = n(n+1)(2n+1)/6\\)</li>' +
                '<li>Geometric series: \\(1+r+\\cdots+r^{n-1} = (r^n-1)/(r-1)\\)</li>' +
                '<li>Divisibility: express \\(f(k+1)\\) in terms of \\(f(k)\\) plus a multiple of \\(d\\)</li>' +
                '</ul>'
        }
    ]
};
