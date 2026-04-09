/* ================================================================
   LESSON: Binomial Theorem (IB Math AA 1.6)
   ================================================================ */
const LESSON_BINOMIAL = {
    id: 'binomial-theorem',
    title: 'The Binomial Theorem',
    subtitle: 'Pascal\'s triangle, binomial coefficients, and expansions',
    folder: 'number',
    screens: [
        // 1. Concept: Pascal's Triangle
        {
            type: 'concept',
            title: 'Pascal\'s Triangle',
            html: '<p><strong>Pascal\'s triangle</strong> is a triangular array of numbers where each entry is the sum of the two entries directly above it.</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-family:monospace;line-height:2;">' +
                'Row 0: \\(\\qquad\\qquad 1\\)<br>' +
                'Row 1: \\(\\qquad\\; 1 \\qquad 1\\)<br>' +
                'Row 2: \\(\\quad 1 \\qquad 2 \\qquad 1\\)<br>' +
                'Row 3: \\(\\; 1 \\qquad 3 \\qquad 3 \\qquad 1\\)<br>' +
                'Row 4: \\(1 \\qquad 4 \\qquad 6 \\qquad 4 \\qquad 1\\)<br>' +
                'Row 5: \\(1 \\quad 5 \\quad 10 \\quad 10 \\quad 5 \\quad 1\\)' +
                '</p>' +
                '</div>' +
                '<p>Each number is the sum of the two numbers above it. For example, in Row 4: \\(4 = 1 + 3\\) and \\(6 = 3 + 3\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Key property:</strong> The entries in Row \\(n\\) are the <strong>binomial coefficients</strong> for the expansion of \\((a + b)^n\\).</p>' +
                '<ul>' +
                '<li>\\((a + b)^2 = 1a^2 + 2ab + 1b^2\\) - coefficients from Row 2</li>' +
                '<li>\\((a + b)^3 = 1a^3 + 3a^2 b + 3ab^2 + 1b^3\\) - coefficients from Row 3</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>IB tip:</strong> Pascal\'s triangle is useful for small values of \\(n\\), but for larger expansions we need a formula.</p>'
        },

        // 2. Concept: Binomial Coefficient nCr
        {
            type: 'concept',
            title: 'Binomial Coefficients',
            html: '<p>The entries in Pascal\'s triangle can be calculated directly using the <strong>binomial coefficient</strong> (also called "\\(n\\) choose \\(r\\)").</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Binomial coefficient:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\binom{n}{r} = \\dfrac{n!}{r!\\,(n - r)!}\\)</p>' +
                '<p>where \\(n! = n \\times (n-1) \\times (n-2) \\times \\cdots \\times 2 \\times 1\\) is the <strong>factorial</strong> function, and \\(0! = 1\\) by definition.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Important properties:</strong></p>' +
                '<ul>' +
                '<li>\\(\\binom{n}{0} = 1\\) and \\(\\binom{n}{n} = 1\\)</li>' +
                '<li>\\(\\binom{n}{1} = n\\)</li>' +
                '<li>\\(\\binom{n}{r} = \\binom{n}{n - r}\\) (symmetry)</li>' +
                '<li>\\(\\binom{n}{r} + \\binom{n}{r+1} = \\binom{n+1}{r+1}\\) (Pascal\'s rule)</li>' +
                '</ul>' +
                '</div>' +
                '<p>The IB formula booklet gives both \\(\\binom{n}{r}\\) and the alternative notation \\({}^nC_r\\). They mean the same thing.</p>' +
                '<p><strong>Example:</strong> \\(\\binom{7}{3} = \\dfrac{7!}{3!\\,4!} = \\dfrac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35\\)</p>'
        },

        // 3. Example: Evaluate nCr
        {
            type: 'example',
            title: 'Evaluating Binomial Coefficients',
            problem: '\\text{Evaluate } \\binom{8}{3}.',
            steps: [
                { text: '<strong>Step 1:</strong> Write the formula: \\(\\binom{8}{3} = \\dfrac{8!}{3!\\,5!}\\).' },
                { text: '<strong>Step 2:</strong> Cancel common factors. We only need the top 3 factors of \\(8!\\):' },
                { text: '\\(\\binom{8}{3} = \\dfrac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1}\\)' },
                { text: '\\(= \\dfrac{336}{6} = 56\\)' },
                { text: '<strong>Tip:</strong> Cancel as you go: \\(\\dfrac{8 \\times 7 \\times 6}{3!} = \\dfrac{8 \\times 7 \\times \\cancel{6}}{\\cancel{6}} = 56\\).' },
                { text: '<strong>Check with symmetry:</strong> \\(\\binom{8}{3} = \\binom{8}{5} = 56\\). \\(\\checkmark\\)' }
            ]
        },

        // 4. Practice: Evaluate nCr
        {
            type: 'practice',
            intro: 'Evaluate the binomial coefficient:',
            generate: () => BINOMIAL.qEvaluateNCR()
        },

        // 5. Concept: The Binomial Theorem
        {
            type: 'concept',
            title: 'The Binomial Theorem',
            html: '<p>The <strong>binomial theorem</strong> provides a formula for expanding any power of a binomial expression \\((a + b)^n\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Binomial theorem:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\((a + b)^n = \\displaystyle\\sum_{r=0}^{n} \\binom{n}{r}\\, a^{n-r}\\, b^r\\)</p>' +
                '<p>This can also be written term by term:</p>' +
                '<p style="text-align:center;">\\((a + b)^n = \\binom{n}{0}a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\cdots + \\binom{n}{n}b^n\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Key observations:</strong></p>' +
                '<ul>' +
                '<li>There are \\(n + 1\\) terms in total</li>' +
                '<li>In each term, the powers of \\(a\\) and \\(b\\) sum to \\(n\\)</li>' +
                '<li>The powers of \\(a\\) decrease from \\(n\\) to \\(0\\)</li>' +
                '<li>The powers of \\(b\\) increase from \\(0\\) to \\(n\\)</li>' +
                '<li>The coefficient of the \\((r+1)\\)th term is \\(\\binom{n}{r}\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p>This formula is given in the <strong>IB formula booklet</strong>.</p>'
        },

        // 6. Example: Expand (1+x)^5
        {
            type: 'example',
            title: 'Expanding (1 + x)^5',
            problem: '\\text{Expand } (1 + x)^5.',
            steps: [
                { text: '<strong>Step 1:</strong> Apply the binomial theorem with \\(a = 1\\), \\(b = x\\), \\(n = 5\\):' },
                { text: '\\((1+x)^5 = \\sum_{r=0}^{5} \\binom{5}{r} \\cdot 1^{5-r} \\cdot x^r\\)' },
                { text: '<strong>Step 2:</strong> Since \\(1^{5-r} = 1\\) for all \\(r\\), this simplifies to:' },
                { text: '\\(= \\binom{5}{0}x^0 + \\binom{5}{1}x^1 + \\binom{5}{2}x^2 + \\binom{5}{3}x^3 + \\binom{5}{4}x^4 + \\binom{5}{5}x^5\\)' },
                { text: '<strong>Step 3:</strong> Evaluate the binomial coefficients (Row 5 of Pascal\'s triangle):' },
                { text: '\\(= 1 + 5x + 10x^2 + 10x^3 + 5x^4 + x^5\\)' },
                { text: '<strong>Note:</strong> There are \\(5 + 1 = 6\\) terms, and the coefficients are symmetric: \\(1, 5, 10, 10, 5, 1\\).' }
            ]
        },

        // 7. Practice: Expand small binomial
        {
            type: 'practice',
            intro: 'Select the correct expansion:',
            generate: () => BINOMIAL.qExpandSmall()
        },

        // 8. Concept: The General Term
        {
            type: 'concept',
            title: 'The General Term T_{r+1}',
            html: '<p>In many IB questions you do not need the full expansion - just one specific term. The <strong>general term</strong> formula lets you jump directly to any term.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>General term of \\((a + b)^n\\):</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(T_{r+1} = \\binom{n}{r}\\, a^{n-r}\\, b^r\\)</p>' +
                '<p>where \\(r = 0, 1, 2, \\ldots, n\\).</p>' +
                '<p>The \\((r+1)\\)th term uses \\(\\binom{n}{r}\\), the power of \\(a\\) is \\(n - r\\), and the power of \\(b\\) is \\(r\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Important:</strong> When the binomial is \\((a + bx)^n\\), the general term becomes:</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(T_{r+1} = \\binom{n}{r}\\, a^{n-r}\\, (bx)^r = \\binom{n}{r}\\, a^{n-r}\\, b^r\\, x^r\\)</p>' +
                '<p>The coefficient of \\(x^r\\) is \\(\\binom{n}{r} \\cdot a^{n-r} \\cdot b^r\\).</p>' +
                '</div>' +
                '<p><strong>Strategy:</strong> To find the term containing \\(x^k\\), set the power of \\(x\\) equal to \\(k\\) and solve for \\(r\\).</p>'
        },

        // 9. Example: Find coefficient of x^3 in (2+x)^7
        {
            type: 'example',
            title: 'Finding a Specific Coefficient',
            problem: '\\text{Find the coefficient of } x^3 \\text{ in the expansion of } (2 + x)^7.',
            steps: [
                { text: '<strong>Step 1:</strong> Write the general term with \\(a = 2\\), \\(b = x\\), \\(n = 7\\):' },
                { text: '\\(T_{r+1} = \\binom{7}{r} \\cdot 2^{7-r} \\cdot x^r\\)' },
                { text: '<strong>Step 2:</strong> For the \\(x^3\\) term, set \\(r = 3\\):' },
                { text: '\\(T_4 = \\binom{7}{3} \\cdot 2^{4} \\cdot x^3\\)' },
                { text: '<strong>Step 3:</strong> Calculate: \\(\\binom{7}{3} = 35\\) and \\(2^4 = 16\\).' },
                { text: '\\(T_4 = 35 \\times 16 \\times x^3 = 560\\, x^3\\)' },
                { text: '<strong>Answer:</strong> The coefficient of \\(x^3\\) is \\(560\\).' }
            ]
        },

        // 10. Practice: Find coefficient
        {
            type: 'practice',
            intro: 'Find the coefficient of the specified power of x:',
            generate: () => BINOMIAL.qFindCoefficient()
        },

        // 11. Concept: Constant Term in (x + k/x)^n
        {
            type: 'concept',
            title: 'Finding the Constant Term',
            html: '<p>A common IB question involves finding the <strong>constant term</strong> (the term independent of \\(x\\)) in expansions like \\(\\left(x + \\dfrac{k}{x}\\right)^n\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Method for \\(\\left(x + \\dfrac{c}{x}\\right)^n\\):</strong></p>' +
                '<p>The general term is:</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(T_{r+1} = \\binom{n}{r} \\cdot x^{n-r} \\cdot \\left(\\dfrac{c}{x}\\right)^r = \\binom{n}{r} \\cdot c^r \\cdot x^{n-2r}\\)</p>' +
                '<p>For the constant term, set the power of \\(x\\) to zero:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(n - 2r = 0 \\quad \\Rightarrow \\quad r = \\dfrac{n}{2}\\)</p>' +
                '<p>This requires \\(n\\) to be <strong>even</strong> for a constant term to exist.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>General strategy for any "find the constant term" problem:</strong></p>' +
                '<ol>' +
                '<li>Write the general term \\(T_{r+1}\\)</li>' +
                '<li>Express the power of \\(x\\) in terms of \\(r\\)</li>' +
                '<li>Set the power of \\(x\\) equal to 0 and solve for \\(r\\)</li>' +
                '<li>Substitute \\(r\\) back to find the term</li>' +
                '</ol>' +
                '</div>'
        },

        // 12. Example: Constant term
        {
            type: 'example',
            title: 'Finding the Constant Term',
            problem: '\\text{Find the constant term in the expansion of } \\left(x + \\dfrac{2}{x}\\right)^6.',
            steps: [
                { text: '<strong>Step 1:</strong> Write the general term with \\(a = x\\), \\(b = \\dfrac{2}{x}\\), \\(n = 6\\):' },
                { text: '\\(T_{r+1} = \\binom{6}{r} \\cdot x^{6-r} \\cdot \\left(\\dfrac{2}{x}\\right)^r\\)' },
                { text: '<strong>Step 2:</strong> Simplify the powers of \\(x\\):' },
                { text: '\\(T_{r+1} = \\binom{6}{r} \\cdot 2^r \\cdot x^{6-r} \\cdot x^{-r} = \\binom{6}{r} \\cdot 2^r \\cdot x^{6-2r}\\)' },
                { text: '<strong>Step 3:</strong> For the constant term, set \\(6 - 2r = 0\\), giving \\(r = 3\\).' },
                { text: '<strong>Step 4:</strong> Substitute \\(r = 3\\):' },
                { text: '\\(T_4 = \\binom{6}{3} \\cdot 2^3 = 20 \\times 8 = 160\\)' },
                { text: '<strong>Answer:</strong> The constant term is \\(160\\).' }
            ]
        },

        // 13. Practice: Constant term
        {
            type: 'practice',
            intro: 'Find the constant term (independent of x) in the expansion:',
            generate: () => BINOMIAL.qConstantTerm()
        },

        // 14. Concept: Finding n
        {
            type: 'concept',
            title: 'Finding n from a Given Coefficient',
            html: '<p>Some IB questions give you the coefficient of a specific term and ask you to find the value of \\(n\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Method:</strong></p>' +
                '<ol>' +
                '<li>Write the general term \\(T_{r+1}\\) for the expansion</li>' +
                '<li>Substitute the appropriate value of \\(r\\) for the term you want</li>' +
                '<li>Set the coefficient equal to the given value</li>' +
                '<li>Solve the resulting equation for \\(n\\)</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Example setup:</strong> If the coefficient of \\(x^2\\) in \\((1 + x)^n\\) is 28, then:</p>' +
                '<p style="text-align:center;">\\(\\binom{n}{2} = 28\\)</p>' +
                '<p style="text-align:center;">\\(\\dfrac{n(n-1)}{2} = 28\\)</p>' +
                '<p style="text-align:center;">\\(n(n-1) = 56 = 8 \\times 7\\)</p>' +
                '<p style="text-align:center;">\\(n = 8\\)</p>' +
                '</div>' +
                '<p>This often leads to a quadratic in \\(n\\). Take the positive integer solution.</p>'
        },

        // 15. Practice: Find n
        {
            type: 'practice',
            intro: 'Find the value of n given the coefficient information:',
            generate: () => BINOMIAL.qFindN()
        },

        // 16. Concept: Surd and Compound Expansions
        {
            type: 'concept',
            title: 'Expanding Expressions with Surds',
            html: '<p>The binomial theorem can be used to expand expressions involving <strong>surds</strong> (square roots). This is a common technique in IB examinations.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Strategy for \\((p + q\\sqrt{s})^n\\):</strong></p>' +
                '<ol>' +
                '<li>Let \\(a = p\\) and \\(b = q\\sqrt{s}\\) in the binomial theorem</li>' +
                '<li>Expand using \\(T_{r+1} = \\binom{n}{r}\\, p^{n-r}\\, (q\\sqrt{s})^r\\)</li>' +
                '<li>Simplify: when \\(r\\) is even, \\((\\sqrt{s})^r\\) is rational; when \\(r\\) is odd, it contains \\(\\sqrt{s}\\)</li>' +
                '<li>Group the <strong>rational part</strong> and the <strong>irrational part</strong></li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Example:</strong> \\((1 + \\sqrt{2})^3 = 1 + 3\\sqrt{2} + 3(\\sqrt{2})^2 + (\\sqrt{2})^3\\)</p>' +
                '<p>\\(= 1 + 3\\sqrt{2} + 6 + 2\\sqrt{2}\\)</p>' +
                '<p>\\(= 7 + 5\\sqrt{2}\\)</p>' +
                '</div>' +
                '<p><strong>IB tip:</strong> The answer is usually requested in the form \\(p + q\\sqrt{s}\\). Make sure to clearly state both \\(p\\) and \\(q\\).</p>'
        },

        // 17. Practice: Surd expansion
        {
            type: 'practice',
            intro: 'Expand and express in the given form:',
            generate: () => BINOMIAL.qSurdExpansion()
        },

        // 18. Summary
        {
            type: 'summary',
            title: 'Binomial Theorem - Key Formulas',
            html: '<div class="lesson-box">' +
                '<p><strong>Binomial coefficient:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\binom{n}{r} = \\dfrac{n!}{r!\\,(n-r)!}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Binomial theorem:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\((a + b)^n = \\displaystyle\\sum_{r=0}^{n} \\binom{n}{r}\\, a^{n-r}\\, b^r\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>General term:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(T_{r+1} = \\binom{n}{r}\\, a^{n-r}\\, b^r\\)</p>' +
                '<p>where \\(r = 0, 1, 2, \\ldots, n\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Coefficient of \\(x^k\\) in \\((a + bx)^n\\):</strong></p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(\\binom{n}{k} \\cdot a^{n-k} \\cdot b^k\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Constant term in \\(\\left(x + \\dfrac{c}{x}\\right)^n\\):</strong></p>' +
                '<p>General term power: \\(x^{n-2r}\\). Set \\(n - 2r = 0\\), so \\(r = \\dfrac{n}{2}\\).</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(\\text{Constant term} = \\binom{n}{n/2} \\cdot c^{n/2}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Common exam strategies:</strong></p>' +
                '<ul>' +
                '<li>To find a specific term, use the general term formula - do not expand everything</li>' +
                '<li>For the constant term, set the power of \\(x\\) to zero and solve for \\(r\\)</li>' +
                '<li>When given a coefficient and asked for \\(n\\), solve \\(\\binom{n}{r} = \\text{value}\\)</li>' +
                '<li>For surd expansions, group rational and irrational parts separately</li>' +
                '<li>Remember: there are \\(n + 1\\) terms in \\((a + b)^n\\)</li>' +
                '</ul>' +
                '</div>'
        }
    ]
};
