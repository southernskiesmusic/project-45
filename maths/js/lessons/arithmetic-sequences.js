/* ================================================================
   LESSON: Arithmetic Sequences & Series (IB Math AA 1.2-1.3)
   ================================================================ */
const LESSON_ARITH_SEQ = {
    id: 'arithmetic-sequences',
    title: 'Arithmetic Sequences & Series',
    subtitle: 'Common difference, general term, and summation',
    folder: 'number',
    screens: [
        // 1. Concept: What is a Sequence?
        {
            type: 'concept',
            title: 'What is a Sequence?',
            html: '<p>A <strong>sequence</strong> is an ordered list of numbers that follow a rule. Each number in the list is called a <strong>term</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Notation:</strong></p>' +
                '<ul>' +
                '<li>\\(u_1\\) is the <strong>first term</strong></li>' +
                '<li>\\(u_2\\) is the <strong>second term</strong></li>' +
                '<li>\\(u_n\\) is the <strong>general term</strong> (the \\(n\\)th term)</li>' +
                '</ul>' +
                '<p>We write a sequence as \\(u_1,\\, u_2,\\, u_3,\\, \\ldots,\\, u_n,\\, \\ldots\\)</p>' +
                '</div>' +
                '<p><strong>Example:</strong> \\(3,\\; 7,\\; 11,\\; 15,\\; 19,\\; \\ldots\\)</p>' +
                '<p>Here \\(u_1 = 3\\), \\(u_2 = 7\\), \\(u_3 = 11\\), and so on. The dots (\\(\\ldots\\)) indicate the pattern continues.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Finite vs Infinite:</strong></p>' +
                '<ul>' +
                '<li>A <strong>finite sequence</strong> has a fixed number of terms, e.g. \\(2, 5, 8, 11\\)</li>' +
                '<li>An <strong>infinite sequence</strong> continues indefinitely, e.g. \\(2, 5, 8, 11, \\ldots\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p>In this lesson we focus on <strong>arithmetic sequences</strong> - the most fundamental type in IB Mathematics.</p>'
        },

        // 2. Concept: Arithmetic Sequences
        {
            type: 'concept',
            title: 'Arithmetic Sequences',
            html: '<p>An <strong>arithmetic sequence</strong> is a sequence where each term is obtained by adding a <strong>constant value</strong> to the previous term. This constant is called the <strong>common difference</strong>, denoted \\(d\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Common difference:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(d = u_{n+1} - u_n\\)</p>' +
                '<p>The common difference is the same for every pair of consecutive terms.</p>' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>\\(2,\\; 5,\\; 8,\\; 11,\\; \\ldots\\) has \\(d = 3\\) (increasing)</li>' +
                '<li>\\(20,\\; 14,\\; 8,\\; 2,\\; \\ldots\\) has \\(d = -6\\) (decreasing)</li>' +
                '<li>\\(7,\\; 7,\\; 7,\\; 7,\\; \\ldots\\) has \\(d = 0\\) (constant)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>How to verify a sequence is arithmetic:</strong></p>' +
                '<p>Calculate the differences between consecutive terms. If <strong>all differences are equal</strong>, the sequence is arithmetic.</p>' +
                '<p>\\(u_2 - u_1 = u_3 - u_2 = u_4 - u_3 = \\ldots = d\\)</p>' +
                '</div>' +
                '<p><strong>IB tip:</strong> The IB formula booklet uses \\(u_n\\) for the general term and \\(u_1\\) for the first term. Make sure you are comfortable with this notation.</p>'
        },

        // 3. Example: Find common difference
        {
            type: 'example',
            title: 'Finding the Common Difference',
            problem: '\\text{Find the common difference of }\\; 5,\\; 11,\\; 17,\\; 23,\\; \\ldots',
            steps: [
                { text: '<strong>Step 1:</strong> Find the difference between consecutive terms.' },
                { text: '\\(u_2 - u_1 = 11 - 5 = 6\\)' },
                { text: '\\(u_3 - u_2 = 17 - 11 = 6\\)' },
                { text: '\\(u_4 - u_3 = 23 - 17 = 6\\)' },
                { text: '<strong>Step 2:</strong> Since all differences are equal, the sequence is arithmetic with \\(d = 6\\).' },
                { text: '<strong>Exam tip:</strong> Always check at least two consecutive differences to confirm the sequence is arithmetic. Simply writing \\(d = 6\\) without showing the check may cost a method mark.' }
            ]
        },

        // 4. Practice: Find d
        {
            type: 'practice',
            intro: 'Find the common difference of the arithmetic sequence:',
            generate: () => ARITH_SEQ.qFindD()
        },

        // 5. Concept: General Term Formula
        {
            type: 'concept',
            title: 'The General Term Formula',
            html: '<p>Rather than listing every term, we can find a formula that gives us <strong>any</strong> term directly.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>General term of an arithmetic sequence:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(u_n = u_1 + (n - 1)d\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(u_n\\) is the \\(n\\)th term</li>' +
                '<li>\\(u_1\\) is the first term</li>' +
                '<li>\\(d\\) is the common difference</li>' +
                '<li>\\(n\\) is the term number (position)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why does this work?</strong></p>' +
                '<p>To get from \\(u_1\\) to \\(u_n\\), you add \\(d\\) exactly \\((n - 1)\\) times:</p>' +
                '<ul>' +
                '<li>\\(u_1 = u_1\\) (add \\(d\\) zero times)</li>' +
                '<li>\\(u_2 = u_1 + d\\) (add \\(d\\) once)</li>' +
                '<li>\\(u_3 = u_1 + 2d\\) (add \\(d\\) twice)</li>' +
                '<li>\\(u_n = u_1 + (n-1)d\\) (add \\(d\\) a total of \\(n - 1\\) times)</li>' +
                '</ul>' +
                '</div>' +
                '<p>This formula is given in the <strong>IB formula booklet</strong>. You must know how to use it fluently.</p>'
        },

        // 6. Example: Find u_20
        {
            type: 'example',
            title: 'Finding a Specific Term',
            problem: '\\text{For the arithmetic sequence with } u_1 = 4 \\text{ and } d = 7\\text{, find } u_{20}.',
            steps: [
                { text: '<strong>Step 1:</strong> Write the general term formula: \\(u_n = u_1 + (n - 1)d\\).' },
                { text: '<strong>Step 2:</strong> Substitute \\(u_1 = 4\\), \\(d = 7\\), \\(n = 20\\):' },
                { text: '\\(u_{20} = 4 + (20 - 1)(7)\\)' },
                { text: '\\(u_{20} = 4 + 19 \\times 7\\)' },
                { text: '\\(u_{20} = 4 + 133 = 137\\)' },
                { text: '<strong>Verify:</strong> The first few terms are \\(4, 11, 18, 25, \\ldots\\) - each increases by 7. \\(\\checkmark\\)' }
            ]
        },

        // 7. Practice: Find nth term
        {
            type: 'practice',
            intro: 'Find the specified term of the arithmetic sequence:',
            generate: () => ARITH_SEQ.qFindNthTerm()
        },

        // 8. Concept: Finding d from Two Terms
        {
            type: 'concept',
            title: 'Finding d from Two Terms',
            html: '<p>If you know any two terms of an arithmetic sequence, you can find the common difference \\(d\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Method:</strong></p>' +
                '<p>If \\(u_p\\) and \\(u_q\\) are known (where \\(q > p\\)):</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(d = \\dfrac{u_q - u_p}{q - p}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Derivation:</strong></p>' +
                '<p>We know \\(u_p = u_1 + (p - 1)d\\) and \\(u_q = u_1 + (q - 1)d\\).</p>' +
                '<p>Subtracting: \\(u_q - u_p = [(q - 1) - (p - 1)]d = (q - p)d\\).</p>' +
                '<p>Therefore \\(d = \\dfrac{u_q - u_p}{q - p}\\).</p>' +
                '</div>' +
                '<p>Once you have \\(d\\), you can find \\(u_1\\) by substituting back into \\(u_p = u_1 + (p - 1)d\\).</p>'
        },

        // 9. Example: Find d from u_5 and u_12
        {
            type: 'example',
            title: 'Finding d from Two Known Terms',
            problem: '\\text{In an arithmetic sequence, } u_5 = 19 \\text{ and } u_{12} = 54. \\text{ Find } d \\text{ and } u_1.',
            steps: [
                { text: '<strong>Step 1:</strong> Use \\(d = \\dfrac{u_q - u_p}{q - p}\\) with \\(p = 5\\) and \\(q = 12\\):' },
                { text: '\\(d = \\dfrac{u_{12} - u_5}{12 - 5} = \\dfrac{54 - 19}{7} = \\dfrac{35}{7} = 5\\)' },
                { text: '<strong>Step 2:</strong> Find \\(u_1\\) using \\(u_5 = u_1 + (5 - 1)d\\):' },
                { text: '\\(19 = u_1 + 4(5)\\)' },
                { text: '\\(19 = u_1 + 20\\)' },
                { text: '\\(u_1 = -1\\)' },
                { text: '<strong>Check:</strong> \\(u_{12} = -1 + (12-1)(5) = -1 + 55 = 54\\). \\(\\checkmark\\)' }
            ]
        },

        // 10. Practice: Find d from two terms
        {
            type: 'practice',
            intro: 'Find the common difference given two terms of the arithmetic sequence:',
            generate: () => ARITH_SEQ.qFindDFromTwoTerms()
        },

        // 11. Concept: Finding n
        {
            type: 'concept',
            title: 'Finding Which Term (Solving for n)',
            html: '<p>Sometimes you are given the value of a term and need to find its position \\(n\\) in the sequence.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Method:</strong> Rearrange the general term formula to isolate \\(n\\).</p>' +
                '<p>Starting from \\(u_n = u_1 + (n - 1)d\\):</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(u_n - u_1 = (n - 1)d\\)</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(n - 1 = \\dfrac{u_n - u_1}{d}\\)</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(n = \\dfrac{u_n - u_1}{d} + 1\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Important:</strong></p>' +
                '<ul>' +
                '<li>\\(n\\) must be a <strong>positive integer</strong>. If your answer is not a whole number, the given value is <strong>not a term</strong> in the sequence.</li>' +
                '<li>This is a common IB exam question - "Is the number \\(k\\) a term of the sequence?"</li>' +
                '</ul>' +
                '</div>'
        },

        // 12. Example: Find n given u_n = 152
        {
            type: 'example',
            title: 'Finding the Position of a Term',
            problem: '\\text{The arithmetic sequence } 8,\\; 14,\\; 20,\\; 26,\\; \\ldots \\text{ has a term equal to 152. Find its position.}',
            steps: [
                { text: '<strong>Step 1:</strong> Identify \\(u_1 = 8\\) and \\(d = 14 - 8 = 6\\).' },
                { text: '<strong>Step 2:</strong> Set \\(u_n = 152\\) and use the formula:' },
                { text: '\\(152 = 8 + (n - 1)(6)\\)' },
                { text: '<strong>Step 3:</strong> Solve for \\(n\\):' },
                { text: '\\(152 - 8 = (n - 1)(6)\\)' },
                { text: '\\(144 = 6(n - 1)\\)' },
                { text: '\\(n - 1 = 24\\)' },
                { text: '\\(n = 25\\)' },
                { text: '<strong>Answer:</strong> 152 is the 25th term of the sequence.' },
                { text: '<strong>Check:</strong> \\(u_{25} = 8 + 24(6) = 8 + 144 = 152\\). \\(\\checkmark\\)' }
            ]
        },

        // 13. Practice: Find n
        {
            type: 'practice',
            intro: 'Find the position of the given term in the arithmetic sequence:',
            generate: () => ARITH_SEQ.qFindNGivenTerm()
        },

        // 14. Concept: Arithmetic Series
        {
            type: 'concept',
            title: 'Arithmetic Series',
            html: '<p>A <strong>series</strong> is the <strong>sum</strong> of the terms of a sequence. The sum of the first \\(n\\) terms of an arithmetic sequence is called an <strong>arithmetic series</strong>, written \\(S_n\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum of an arithmetic series (Form 1):</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(S_n = \\dfrac{n}{2}\\big(2u_1 + (n - 1)d\\big)\\)</p>' +
                '<p>Use this when you know \\(u_1\\), \\(d\\), and \\(n\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum of an arithmetic series (Form 2):</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(S_n = \\dfrac{n}{2}\\big(u_1 + u_n\\big)\\)</p>' +
                '<p>Use this when you know the first term, the last term, and the number of terms.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why does this work? (Gauss\'s method)</strong></p>' +
                '<p>Write the series forwards and backwards:</p>' +
                '<p>\\(S_n = u_1 + (u_1 + d) + (u_1 + 2d) + \\ldots + u_n\\)</p>' +
                '<p>\\(S_n = u_n + (u_n - d) + (u_n - 2d) + \\ldots + u_1\\)</p>' +
                '<p>Adding these: \\(2S_n = n(u_1 + u_n)\\), so \\(S_n = \\dfrac{n}{2}(u_1 + u_n)\\).</p>' +
                '</div>' +
                '<p>Both forms are in the <strong>IB formula booklet</strong>. Choose whichever is more convenient for the given information.</p>'
        },

        // 15. Example: Find S_20
        {
            type: 'example',
            title: 'Finding the Sum of an Arithmetic Series',
            problem: '\\text{Find } S_{20} \\text{ for the arithmetic sequence } 3,\\; 7,\\; 11,\\; 15,\\; \\ldots',
            steps: [
                { text: '<strong>Step 1:</strong> Identify \\(u_1 = 3\\), \\(d = 4\\), \\(n = 20\\).' },
                { text: '<strong>Method 1:</strong> Using \\(S_n = \\dfrac{n}{2}(2u_1 + (n-1)d)\\):' },
                { text: '\\(S_{20} = \\dfrac{20}{2}\\big(2(3) + (20-1)(4)\\big)\\)' },
                { text: '\\(S_{20} = 10\\big(6 + 76\\big) = 10 \\times 82 = 820\\)' },
                { text: '<strong>Method 2:</strong> First find \\(u_{20} = 3 + 19(4) = 79\\). Then use \\(S_n = \\dfrac{n}{2}(u_1 + u_n)\\):' },
                { text: '\\(S_{20} = \\dfrac{20}{2}(3 + 79) = 10 \\times 82 = 820\\)' },
                { text: '<strong>Both methods give the same answer:</strong> \\(S_{20} = 820\\). \\(\\checkmark\\)' }
            ]
        },

        // 16. Practice: Find sum
        {
            type: 'practice',
            intro: 'Find the sum of the first n terms of the arithmetic series:',
            generate: () => ARITH_SEQ.qFindSum()
        },

        // 17. Concept: Sigma Notation
        {
            type: 'concept',
            title: 'Sigma Notation',
            html: '<p><strong>Sigma notation</strong> is a compact way to write the sum of a series using the Greek letter \\(\\Sigma\\) (capital sigma).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Notation:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(\\displaystyle\\sum_{r=1}^{n} f(r)\\)</p>' +
                '<p>This means: "Add up \\(f(r)\\) for every integer value of \\(r\\) from 1 to \\(n\\)."</p>' +
                '<ul>' +
                '<li>\\(r\\) is the <strong>index</strong> (dummy variable)</li>' +
                '<li>\\(r = 1\\) is the <strong>lower limit</strong></li>' +
                '<li>\\(n\\) is the <strong>upper limit</strong></li>' +
                '<li>\\(f(r)\\) is the <strong>expression</strong> to evaluate</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Example:</strong></p>' +
                '<p>\\(\\displaystyle\\sum_{r=1}^{4} (2r + 3) = (2(1)+3) + (2(2)+3) + (2(3)+3) + (2(4)+3)\\)</p>' +
                '<p>\\(= 5 + 7 + 9 + 11 = 32\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Connecting to arithmetic series:</strong></p>' +
                '<p>If \\(f(r)\\) is a linear expression in \\(r\\) (such as \\(3r - 1\\)), the sum is an arithmetic series. You can use the \\(S_n\\) formulas to evaluate it efficiently without expanding every term.</p>' +
                '</div>'
        },

        // 18. Example: Evaluate sigma
        {
            type: 'example',
            title: 'Evaluating Sigma Notation',
            problem: '\\text{Evaluate } \\displaystyle\\sum_{r=1}^{50} (3r - 1)',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the sequence. When \\(r = 1\\): \\(3(1) - 1 = 2\\). When \\(r = 2\\): \\(3(2) - 1 = 5\\). When \\(r = 3\\): \\(3(3) - 1 = 8\\).' },
                { text: '<strong>Step 2:</strong> This is an arithmetic sequence with \\(u_1 = 2\\) and \\(d = 3\\).' },
                { text: '<strong>Step 3:</strong> We need the sum of 50 terms. Find \\(u_{50}\\):' },
                { text: '\\(u_{50} = 3(50) - 1 = 149\\)' },
                { text: '<strong>Step 4:</strong> Use \\(S_n = \\dfrac{n}{2}(u_1 + u_n)\\):' },
                { text: '\\(S_{50} = \\dfrac{50}{2}(2 + 149) = 25 \\times 151 = 3775\\)' },
                { text: '\\(\\displaystyle\\sum_{r=1}^{50} (3r - 1) = 3775\\)' }
            ]
        },

        // 19. Practice: Sigma
        {
            type: 'practice',
            intro: 'Evaluate the sum given in sigma notation:',
            generate: () => ARITH_SEQ.qSigmaNotation()
        },

        // 20. Concept: Three Terms in AP
        {
            type: 'concept',
            title: 'Three Consecutive Terms in Arithmetic Progression',
            html: '<p>A very common IB question involves three expressions that form consecutive terms of an arithmetic sequence. This gives a powerful equation to solve.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Key condition:</strong></p>' +
                '<p>If \\(a\\), \\(b\\), \\(c\\) are three consecutive terms of an arithmetic sequence, then:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(b - a = c - b\\)</p>' +
                '<p>which simplifies to:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(2b = a + c\\)</p>' +
                '<p>The middle term equals the <strong>mean</strong> of the outer terms: \\(b = \\dfrac{a + c}{2}\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why is this useful?</strong></p>' +
                '<p>When the terms contain unknowns, the condition \\(2b = a + c\\) gives you an equation to solve for the unknown variable.</p>' +
                '</div>' +
                '<p><strong>IB tip:</strong> This condition appears frequently in Paper 1 and Paper 2. It is often combined with geometric sequence conditions or other constraints.</p>'
        },

        // 21. Example: Find x if 2x, 3x+1, 5x-3 are in AP
        {
            type: 'example',
            title: 'Three Terms in Arithmetic Progression',
            problem: '\\text{Find } x \\text{ if } 2x,\\; 3x + 1,\\; 5x - 3 \\text{ are consecutive terms of an arithmetic sequence.}',
            steps: [
                { text: '<strong>Step 1:</strong> Apply the condition \\(2b = a + c\\) with \\(a = 2x\\), \\(b = 3x + 1\\), \\(c = 5x - 3\\):' },
                { text: '\\(2(3x + 1) = 2x + (5x - 3)\\)' },
                { text: '<strong>Step 2:</strong> Expand both sides:' },
                { text: '\\(6x + 2 = 7x - 3\\)' },
                { text: '<strong>Step 3:</strong> Solve for \\(x\\):' },
                { text: '\\(2 + 3 = 7x - 6x\\)' },
                { text: '\\(x = 5\\)' },
                { text: '<strong>Step 4:</strong> Verify. Substituting \\(x = 5\\):' },
                { text: 'Terms are \\(2(5) = 10\\), \\(3(5) + 1 = 16\\), \\(5(5) - 3 = 22\\).' },
                { text: 'Differences: \\(16 - 10 = 6\\) and \\(22 - 16 = 6\\). \\(\\checkmark\\) The common difference is 6.' }
            ]
        },

        // 22. Practice: Three terms
        {
            type: 'practice',
            intro: 'Find the unknown given three consecutive terms of an arithmetic sequence:',
            generate: () => ARITH_SEQ.qThreeTermsAP()
        },

        // 23. Concept: Real-World Applications
        {
            type: 'concept',
            title: 'Real-World Applications',
            html: '<p>Arithmetic sequences and series appear in many real-world contexts. The IB frequently uses these in application problems.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Salary increases:</strong></p>' +
                '<p>An employee starts with a salary of $30,000 and receives a fixed raise of $1,500 each year. Their salary forms an arithmetic sequence:</p>' +
                '<p>\\(30000,\\; 31500,\\; 33000,\\; 34500,\\; \\ldots\\)</p>' +
                '<p>with \\(u_1 = 30000\\) and \\(d = 1500\\).</p>' +
                '<p>Salary in year \\(n\\): \\(u_n = 30000 + (n-1)(1500)\\)</p>' +
                '<p>Total earned over \\(n\\) years: \\(S_n = \\dfrac{n}{2}(2 \\times 30000 + (n-1)(1500))\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Saving patterns:</strong></p>' +
                '<p>A student saves $50 in week 1, $55 in week 2, $60 in week 3, and so on. After 12 weeks, the total saved is:</p>' +
                '<p>\\(S_{12} = \\dfrac{12}{2}(2 \\times 50 + 11 \\times 5) = 6(100 + 55) = 6 \\times 155 = 930\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Stacking patterns:</strong></p>' +
                '<p>A display has 20 cans on the bottom row, 18 on the next, 16 on the next, and so on (decreasing by 2 each row). The total number of cans is the sum of an arithmetic series with \\(u_1 = 20\\), \\(d = -2\\).</p>' +
                '</div>' +
                '<p><strong>IB tip:</strong> In context questions, clearly define your variables. State what \\(u_1\\), \\(d\\), and \\(n\\) represent in the context of the problem.</p>'
        },

        // 24. Summary
        {
            type: 'summary',
            title: 'Arithmetic Sequences & Series - Key Formulas',
            html: '<div class="lesson-box">' +
                '<p><strong>General (\\(n\\)th) term:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(u_n = u_1 + (n - 1)d\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Common difference from two terms:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(d = \\dfrac{u_q - u_p}{q - p}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum of first \\(n\\) terms:</strong></p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(S_n = \\dfrac{n}{2}\\big(2u_1 + (n - 1)d\\big)\\)</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(S_n = \\dfrac{n}{2}\\big(u_1 + u_n\\big)\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sigma notation:</strong></p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(\\displaystyle\\sum_{r=1}^{n} f(r)\\) means add up \\(f(r)\\) for \\(r = 1, 2, 3, \\ldots, n\\)</p>' +
                '<p>If \\(f(r)\\) is linear in \\(r\\), the sum is an arithmetic series.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Three terms in AP:</strong></p>' +
                '<p>If \\(a, b, c\\) are consecutive terms of an arithmetic sequence:</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(2b = a + c\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Common exam strategies:</strong></p>' +
                '<ul>' +
                '<li>Given two terms - find \\(d\\) first, then \\(u_1\\)</li>' +
                '<li>Given \\(S_n\\) and asked for a term - use \\(u_n = S_n - S_{n-1}\\)</li>' +
                '<li>"Is \\(k\\) a term?" - solve for \\(n\\); if \\(n\\) is a positive integer, yes</li>' +
                '<li>Always verify your answer by substituting back</li>' +
                '</ul>' +
                '</div>'
        }
    ]
};
