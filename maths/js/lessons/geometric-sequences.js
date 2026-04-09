/* ================================================================
   LESSON: Geometric Sequences & Series (IB Math AA 1.4)
   ================================================================ */
const LESSON_GEO_SEQ = {
    id: 'geometric-sequences',
    title: 'Geometric Sequences & Series',
    subtitle: 'Common ratio, general term, series, and convergence',
    folder: 'number',
    screens: [
        // 1. Concept: What is a Geometric Sequence?
        {
            type: 'concept',
            title: 'What is a Geometric Sequence?',
            html: '<p>A <strong>geometric sequence</strong> is a sequence where each term is obtained by multiplying the previous term by a <strong>constant value</strong>. This constant is called the <strong>common ratio</strong>, denoted \\(r\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Definition:</strong></p>' +
                '<p>A sequence \\(u_1,\\, u_2,\\, u_3,\\, \\ldots\\) is geometric if there exists a constant \\(r\\) such that:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(u_{n+1} = u_n \\times r\\)</p>' +
                '<p>for every pair of consecutive terms.</p>' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>\\(2,\\; 6,\\; 18,\\; 54,\\; \\ldots\\) has \\(r = 3\\) (each term is tripled)</li>' +
                '<li>\\(100,\\; 50,\\; 25,\\; 12.5,\\; \\ldots\\) has \\(r = 0.5\\) (each term is halved)</li>' +
                '<li>\\(3,\\; -6,\\; 12,\\; -24,\\; \\ldots\\) has \\(r = -2\\) (terms alternate in sign)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>Key difference from arithmetic sequences:</strong></p>' +
                '<ul>' +
                '<li>Arithmetic: constant <strong>difference</strong> between terms (add \\(d\\))</li>' +
                '<li>Geometric: constant <strong>ratio</strong> between terms (multiply by \\(r\\))</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>IB tip:</strong> The IB formula booklet uses \\(u_n\\) for the general term and \\(u_1\\) for the first term, consistent with arithmetic sequences.</p>'
        },

        // 2. Concept: Common Ratio
        {
            type: 'concept',
            title: 'The Common Ratio',
            html: '<p>The <strong>common ratio</strong> \\(r\\) is found by dividing any term by the previous term.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Common ratio:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(r = \\dfrac{u_{n+1}}{u_n}\\)</p>' +
                '<p>The common ratio is the same for every pair of consecutive terms.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Properties of \\(r\\):</strong></p>' +
                '<ul>' +
                '<li>If \\(r > 1\\): terms <strong>increase</strong> (e.g. \\(2, 6, 18, 54, \\ldots\\) with \\(r = 3\\))</li>' +
                '<li>If \\(0 < r < 1\\): terms <strong>decrease</strong> towards zero (e.g. \\(64, 32, 16, 8, \\ldots\\) with \\(r = 0.5\\))</li>' +
                '<li>If \\(-1 < r < 0\\): terms <strong>alternate in sign</strong> and decrease in magnitude</li>' +
                '<li>If \\(r < -1\\): terms <strong>alternate in sign</strong> and increase in magnitude</li>' +
                '<li>If \\(r = 1\\): all terms are <strong>equal</strong> (constant sequence)</li>' +
                '<li>\\(r\\) can <strong>never</strong> be 0 (dividing by zero is undefined)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>How to verify a sequence is geometric:</strong></p>' +
                '<p>Calculate the ratio of consecutive terms. If <strong>all ratios are equal</strong>, the sequence is geometric.</p>' +
                '<p>\\(\\dfrac{u_2}{u_1} = \\dfrac{u_3}{u_2} = \\dfrac{u_4}{u_3} = \\ldots = r\\)</p>' +
                '</div>'
        },

        // 3. Example: Find r
        {
            type: 'example',
            title: 'Finding the Common Ratio',
            problem: '\\text{Find the common ratio of }\\; 3,\\; 6,\\; 12,\\; 24,\\; \\ldots',
            steps: [
                { text: '<strong>Step 1:</strong> Find the ratio between consecutive terms.' },
                { text: '\\(\\dfrac{u_2}{u_1} = \\dfrac{6}{3} = 2\\)' },
                { text: '\\(\\dfrac{u_3}{u_2} = \\dfrac{12}{6} = 2\\)' },
                { text: '\\(\\dfrac{u_4}{u_3} = \\dfrac{24}{12} = 2\\)' },
                { text: '<strong>Step 2:</strong> Since all ratios are equal, the sequence is geometric with \\(r = 2\\).' },
                { text: '<strong>Exam tip:</strong> Always check at least two consecutive ratios to confirm the sequence is geometric. Simply writing \\(r = 2\\) without showing the check may cost a method mark.' }
            ]
        },

        // 4. Practice: Find r
        {
            type: 'practice',
            intro: 'Find the common ratio of the geometric sequence:',
            generate: () => GEO_SEQ.qFindR()
        },

        // 5. Concept: General Term Formula
        {
            type: 'concept',
            title: 'The General Term Formula',
            html: '<p>Rather than listing every term, we can find a formula that gives us <strong>any</strong> term directly.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>General term of a geometric sequence:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(u_n = u_1 \\times r^{n-1}\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(u_n\\) is the \\(n\\)th term</li>' +
                '<li>\\(u_1\\) is the first term</li>' +
                '<li>\\(r\\) is the common ratio</li>' +
                '<li>\\(n\\) is the term number (position)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why does this work?</strong></p>' +
                '<p>To get from \\(u_1\\) to \\(u_n\\), you multiply by \\(r\\) exactly \\((n - 1)\\) times:</p>' +
                '<ul>' +
                '<li>\\(u_1 = u_1\\) (multiply by \\(r\\) zero times)</li>' +
                '<li>\\(u_2 = u_1 \\times r\\) (multiply by \\(r\\) once)</li>' +
                '<li>\\(u_3 = u_1 \\times r^2\\) (multiply by \\(r\\) twice)</li>' +
                '<li>\\(u_n = u_1 \\times r^{n-1}\\) (multiply by \\(r\\) a total of \\(n - 1\\) times)</li>' +
                '</ul>' +
                '</div>' +
                '<p>This formula is given in the <strong>IB formula booklet</strong>. You must know how to use it fluently.</p>'
        },

        // 6. Example: Find u_8
        {
            type: 'example',
            title: 'Finding a Specific Term',
            problem: '\\text{For the geometric sequence with } u_1 = 3 \\text{ and } r = 2\\text{, find } u_8.',
            steps: [
                { text: '<strong>Step 1:</strong> Write the general term formula: \\(u_n = u_1 \\times r^{n-1}\\).' },
                { text: '<strong>Step 2:</strong> Substitute \\(u_1 = 3\\), \\(r = 2\\), \\(n = 8\\):' },
                { text: '\\(u_8 = 3 \\times 2^{8-1}\\)' },
                { text: '\\(u_8 = 3 \\times 2^7\\)' },
                { text: '\\(u_8 = 3 \\times 128 = 384\\)' },
                { text: '<strong>Verify:</strong> The first few terms are \\(3, 6, 12, 24, 48, 96, 192, 384\\) - each is doubled. \\(\\checkmark\\)' }
            ]
        },

        // 7. Practice: Find nth term
        {
            type: 'practice',
            intro: 'Find the specified term of the geometric sequence:',
            generate: () => GEO_SEQ.qFindNthTerm()
        },

        // 8. Concept: Finding r from Two Terms
        {
            type: 'concept',
            title: 'Finding r from Two Terms',
            html: '<p>If you know any two terms of a geometric sequence, you can find the common ratio \\(r\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Method:</strong></p>' +
                '<p>If \\(u_p\\) and \\(u_q\\) are known (where \\(q > p\\)):</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(r = \\left(\\dfrac{u_q}{u_p}\\right)^{\\frac{1}{q-p}}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Derivation:</strong></p>' +
                '<p>We know \\(u_p = u_1 \\times r^{p-1}\\) and \\(u_q = u_1 \\times r^{q-1}\\).</p>' +
                '<p>Dividing: \\(\\dfrac{u_q}{u_p} = \\dfrac{u_1 \\times r^{q-1}}{u_1 \\times r^{p-1}} = r^{q-p}\\).</p>' +
                '<p>Therefore \\(r = \\left(\\dfrac{u_q}{u_p}\\right)^{\\frac{1}{q-p}}\\).</p>' +
                '</div>' +
                '<p>Once you have \\(r\\), you can find \\(u_1\\) by substituting back into \\(u_p = u_1 \\times r^{p-1}\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Important:</strong> When \\(q - p\\) is even, there may be <strong>two possible values</strong> of \\(r\\) (one positive, one negative). Check the context or other given information to determine which is correct.</p>' +
                '</div>'
        },

        // 9. Example: Find r from u_3 and u_6
        {
            type: 'example',
            title: 'Finding r from Two Known Terms',
            problem: '\\text{In a geometric sequence, } u_3 = 12 \\text{ and } u_6 = 96. \\text{ Find } r \\text{ and } u_1.',
            steps: [
                { text: '<strong>Step 1:</strong> Use \\(\\dfrac{u_q}{u_p} = r^{q-p}\\) with \\(p = 3\\) and \\(q = 6\\):' },
                { text: '\\(\\dfrac{u_6}{u_3} = r^{6-3}\\)' },
                { text: '\\(\\dfrac{96}{12} = r^3\\)' },
                { text: '\\(8 = r^3\\)' },
                { text: '<strong>Step 2:</strong> Solve for \\(r\\):' },
                { text: '\\(r = \\sqrt[3]{8} = 2\\)' },
                { text: '<strong>Step 3:</strong> Find \\(u_1\\) using \\(u_3 = u_1 \\times r^{3-1}\\):' },
                { text: '\\(12 = u_1 \\times 2^2\\)' },
                { text: '\\(12 = 4u_1\\)' },
                { text: '\\(u_1 = 3\\)' },
                { text: '<strong>Check:</strong> \\(u_6 = 3 \\times 2^5 = 3 \\times 32 = 96\\). \\(\\checkmark\\)' }
            ]
        },

        // 10. Practice: Find r from two terms
        {
            type: 'practice',
            intro: 'Find the common ratio given two terms of the geometric sequence:',
            generate: () => GEO_SEQ.qFindRFromTwoTerms()
        },

        // 11. Concept: Geometric Series
        {
            type: 'concept',
            title: 'Geometric Series',
            html: '<p>A <strong>geometric series</strong> is the <strong>sum</strong> of the terms of a geometric sequence. The sum of the first \\(n\\) terms is written \\(S_n\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum of a geometric series:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(S_n = \\dfrac{u_1(r^n - 1)}{r - 1}, \\quad r \\neq 1\\)</p>' +
                '<p>This formula is given in the <strong>IB formula booklet</strong>.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Alternative form:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(S_n = \\dfrac{u_1(1 - r^n)}{1 - r}, \\quad r \\neq 1\\)</p>' +
                '<p>This is the same formula with numerator and denominator both multiplied by \\(-1\\). Use whichever form avoids negative numbers.</p>' +
                '<ul>' +
                '<li>When \\(r > 1\\): the first form \\(\\dfrac{u_1(r^n - 1)}{r - 1}\\) is usually cleaner</li>' +
                '<li>When \\(r < 1\\): the second form \\(\\dfrac{u_1(1 - r^n)}{1 - r}\\) is usually cleaner</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Derivation:</strong></p>' +
                '<p>\\(S_n = u_1 + u_1 r + u_1 r^2 + \\ldots + u_1 r^{n-1}\\)</p>' +
                '<p>Multiply both sides by \\(r\\):</p>' +
                '<p>\\(rS_n = u_1 r + u_1 r^2 + u_1 r^3 + \\ldots + u_1 r^n\\)</p>' +
                '<p>Subtracting: \\(S_n - rS_n = u_1 - u_1 r^n\\)</p>' +
                '<p>\\(S_n(1 - r) = u_1(1 - r^n)\\)</p>' +
                '<p>\\(S_n = \\dfrac{u_1(1 - r^n)}{1 - r}\\)</p>' +
                '</div>'
        },

        // 12. Example: Find S_8
        {
            type: 'example',
            title: 'Finding the Sum of a Geometric Series',
            problem: '\\text{Find } S_8 \\text{ for the geometric sequence with } u_1 = 2 \\text{ and } r = 3.',
            steps: [
                { text: '<strong>Step 1:</strong> Identify \\(u_1 = 2\\), \\(r = 3\\), \\(n = 8\\).' },
                { text: '<strong>Step 2:</strong> Since \\(r > 1\\), use \\(S_n = \\dfrac{u_1(r^n - 1)}{r - 1}\\):' },
                { text: '\\(S_8 = \\dfrac{2(3^8 - 1)}{3 - 1}\\)' },
                { text: '<strong>Step 3:</strong> Calculate \\(3^8 = 6561\\):' },
                { text: '\\(S_8 = \\dfrac{2(6561 - 1)}{2}\\)' },
                { text: '\\(S_8 = \\dfrac{2 \\times 6560}{2}\\)' },
                { text: '\\(S_8 = 6560\\)' },
                { text: '<strong>Verify:</strong> The first few terms are \\(2, 6, 18, 54, 162, 486, 1458, 4374\\). Their sum is \\(2 + 6 + 18 + 54 + 162 + 486 + 1458 + 4374 = 6560\\). \\(\\checkmark\\)' }
            ]
        },

        // 13. Practice: Find sum
        {
            type: 'practice',
            intro: 'Find the sum of the first n terms of the geometric series:',
            generate: () => GEO_SEQ.qFindSum()
        },

        // 14. Concept: Sum to Infinity
        {
            type: 'concept',
            title: 'Sum to Infinity',
            html: '<p>When a geometric series has a common ratio with \\(|r| < 1\\), the terms get smaller and smaller, approaching zero. The sum of <strong>all</strong> the terms (infinitely many) converges to a finite value.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Convergence condition:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(|r| < 1 \\quad \\text{(i.e. } -1 < r < 1,\\; r \\neq 0\\text{)}\\)</p>' +
                '<p>When this condition is met, the infinite geometric series converges.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum to infinity:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(S_\\infty = \\dfrac{u_1}{1 - r}, \\quad |r| < 1\\)</p>' +
                '<p>This formula is given in the <strong>IB formula booklet</strong>.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why does this work?</strong></p>' +
                '<p>Starting from \\(S_n = \\dfrac{u_1(1 - r^n)}{1 - r}\\):</p>' +
                '<p>When \\(|r| < 1\\), as \\(n \\to \\infty\\), \\(r^n \\to 0\\).</p>' +
                '<p>Therefore \\(S_\\infty = \\lim_{n \\to \\infty} S_n = \\dfrac{u_1(1 - 0)}{1 - r} = \\dfrac{u_1}{1 - r}\\).</p>' +
                '</div>' +
                '<p><strong>IB tip:</strong> If \\(|r| \\geq 1\\), the series <strong>diverges</strong> - the sum does not exist. You must state the convergence condition \\(|r| < 1\\) when applying this formula.</p>'
        },

        // 15. Example: Find S_inf
        {
            type: 'example',
            title: 'Finding the Sum to Infinity',
            problem: '\\text{Find the sum to infinity of }\\; 12 + 6 + 3 + 1.5 + \\ldots',
            steps: [
                { text: '<strong>Step 1:</strong> Identify \\(u_1 = 12\\) and find \\(r\\):' },
                { text: '\\(r = \\dfrac{u_2}{u_1} = \\dfrac{6}{12} = \\dfrac{1}{2}\\)' },
                { text: '<strong>Step 2:</strong> Check the convergence condition: \\(|r| = \\left|\\dfrac{1}{2}\\right| = \\dfrac{1}{2} < 1\\). \\(\\checkmark\\) The series converges.' },
                { text: '<strong>Step 3:</strong> Apply the formula \\(S_\\infty = \\dfrac{u_1}{1 - r}\\):' },
                { text: '\\(S_\\infty = \\dfrac{12}{1 - \\frac{1}{2}}\\)' },
                { text: '\\(S_\\infty = \\dfrac{12}{\\frac{1}{2}}\\)' },
                { text: '\\(S_\\infty = 12 \\times 2 = 24\\)' },
                { text: '<strong>Interpretation:</strong> As we add more and more terms of this series, the partial sums get closer and closer to 24 but never exceed it.' }
            ]
        },

        // 16. Practice: Sum to infinity
        {
            type: 'practice',
            intro: 'Find the sum to infinity of the geometric series:',
            generate: () => GEO_SEQ.qSumToInfinity()
        },

        // 17. Concept: Convergence
        {
            type: 'concept',
            title: 'Convergence and Divergence',
            html: '<p>Understanding when a geometric series converges or diverges is essential for IB Mathematics.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Convergent series (\\(|r| < 1\\)):</strong></p>' +
                '<p>The terms decrease in magnitude towards zero. The partial sums \\(S_n\\) approach a finite limit \\(S_\\infty\\).</p>' +
                '<ul>' +
                '<li>\\(r = 0.5\\): \\(1,\\; 0.5,\\; 0.25,\\; 0.125,\\; \\ldots \\to 0\\)</li>' +
                '<li>\\(r = -0.3\\): \\(1,\\; -0.3,\\; 0.09,\\; -0.027,\\; \\ldots \\to 0\\)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Divergent series (\\(|r| \\geq 1\\)):</strong></p>' +
                '<p>The terms do <strong>not</strong> approach zero. The partial sums grow without bound (or oscillate).</p>' +
                '<ul>' +
                '<li>\\(r = 2\\): \\(1,\\; 2,\\; 4,\\; 8,\\; \\ldots\\) (grows to infinity)</li>' +
                '<li>\\(r = -1\\): \\(1,\\; -1,\\; 1,\\; -1,\\; \\ldots\\) (oscillates, no limit)</li>' +
                '<li>\\(r = -2\\): \\(1,\\; -2,\\; 4,\\; -8,\\; \\ldots\\) (magnitude grows, alternating sign)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Common IB questions on convergence:</strong></p>' +
                '<ul>' +
                '<li>"For what values of \\(x\\) does the series converge?" - Solve \\(|r| < 1\\) where \\(r\\) involves \\(x\\).</li>' +
                '<li>"Show that the series converges." - Demonstrate that \\(|r| < 1\\).</li>' +
                '<li>"Find the range of values of \\(k\\) for which \\(S_\\infty\\) exists." - Solve \\(|r(k)| < 1\\).</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>IB tip:</strong> Always state the convergence condition explicitly. Writing \\(S_\\infty = \\dfrac{u_1}{1-r}\\) without first confirming \\(|r| < 1\\) will lose marks.</p>'
        },

        // 18. Practice: Convergence
        {
            type: 'practice',
            intro: 'Determine whether the geometric series converges, and if so, find the sum to infinity:',
            generate: () => GEO_SEQ.qConvergence()
        },

        // 19. Concept: Real-World Applications
        {
            type: 'concept',
            title: 'Real-World Applications',
            html: '<p>Geometric sequences and series model many real-world phenomena involving repeated multiplication by a constant factor.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Population growth:</strong></p>' +
                '<p>A colony of bacteria doubles every hour, starting with 500 bacteria. The population forms a geometric sequence:</p>' +
                '<p>\\(500,\\; 1000,\\; 2000,\\; 4000,\\; \\ldots\\)</p>' +
                '<p>with \\(u_1 = 500\\) and \\(r = 2\\).</p>' +
                '<p>Population after \\(n\\) hours: \\(u_n = 500 \\times 2^{n-1}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Depreciation:</strong></p>' +
                '<p>A car worth $20,000 depreciates by 15% each year. Its value forms a geometric sequence with \\(r = 0.85\\):</p>' +
                '<p>\\(20000,\\; 17000,\\; 14450,\\; 12282.50,\\; \\ldots\\)</p>' +
                '<p>Value after \\(n\\) years: \\(u_n = 20000 \\times 0.85^{n-1}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Compound interest:</strong></p>' +
                '<p>An investment of $5,000 earns 6% interest compounded annually. The value at the end of each year forms a geometric sequence with \\(r = 1.06\\):</p>' +
                '<p>\\(5300,\\; 5618,\\; 5955.08,\\; \\ldots\\)</p>' +
                '<p>Value after \\(n\\) years: \\(u_n = 5000 \\times 1.06^n\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Bouncing ball (sum to infinity):</strong></p>' +
                '<p>A ball is dropped from 10 m and bounces to \\(\\frac{3}{4}\\) of its previous height each time. The total vertical distance travelled is:</p>' +
                '<p>\\(10 + 2 \\times \\left(\\dfrac{10 \\times \\frac{3}{4}}{1 - \\frac{3}{4}}\\right) = 10 + 2 \\times 30 = 70\\) metres</p>' +
                '<p>(The factor of 2 accounts for both the up and down of each bounce.)</p>' +
                '</div>' +
                '<p><strong>IB tip:</strong> In context questions, clearly define your variables. State what \\(u_1\\) and \\(r\\) represent in the context of the problem. Watch for whether the question uses \\(n\\) for the number of terms or the number of time periods.</p>'
        },

        // 20. Summary
        {
            type: 'summary',
            title: 'Geometric Sequences & Series - Key Formulas',
            html: '<div class="lesson-box">' +
                '<p><strong>Common ratio:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(r = \\dfrac{u_{n+1}}{u_n}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>General (\\(n\\)th) term:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(u_n = u_1 \\times r^{n-1}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Common ratio from two terms:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(r = \\left(\\dfrac{u_q}{u_p}\\right)^{\\frac{1}{q-p}}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum of first \\(n\\) terms:</strong></p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(S_n = \\dfrac{u_1(r^n - 1)}{r - 1}, \\quad r \\neq 1\\)</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(S_n = \\dfrac{u_1(1 - r^n)}{1 - r}, \\quad r \\neq 1\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum to infinity (convergent series):</strong></p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(S_\\infty = \\dfrac{u_1}{1 - r}, \\quad |r| < 1\\)</p>' +
                '<p>The series converges if and only if \\(|r| < 1\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Common exam strategies:</strong></p>' +
                '<ul>' +
                '<li>Given two terms - find \\(r\\) first, then \\(u_1\\)</li>' +
                '<li>Depreciation/growth - identify \\(r\\) as \\((1 \\pm \\text{rate})\\)</li>' +
                '<li>"Find values of \\(x\\) for convergence" - solve \\(|r(x)| < 1\\)</li>' +
                '<li>Sum to infinity only exists when \\(|r| < 1\\) - always state this condition</li>' +
                '<li>Always verify your answer by substituting back</li>' +
                '</ul>' +
                '</div>'
        }
    ]
};
