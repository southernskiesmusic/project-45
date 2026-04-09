const LESSON_LOGARITHMS = {
    id: 'logarithms',
    title: 'Logarithms',
    subtitle: 'Log laws, equations, change of base & log functions',
    folder: 'functions',
    screens: [
        // ── 1. Concept: What is a Logarithm? ──────────────────────────
        {
            type: 'concept',
            title: 'What is a Logarithm?',
            content: '<p>A <strong>logarithm</strong> answers the question: "What power must I raise the base to, in order to get this number?"</p>' +
                '<div class="lesson-box"><strong>Definition:</strong> \\(\\log_b(x) = y \\iff b^y = x\\)</div>' +
                '<p>Key points:</p>' +
                '<ul>' +
                '<li>\\(b\\) is the <strong>base</strong> (must be positive, \\(b \\neq 1\\))</li>' +
                '<li>\\(x\\) is the <strong>argument</strong> (must be positive)</li>' +
                '<li>\\(y\\) is the <strong>exponent</strong> (can be any real number)</li>' +
                '</ul>' +
                '<p>For example, \\(\\log_2(8) = 3\\) because \\(2^3 = 8\\).</p>'
        },

        // ── 2. Example: Evaluating Logarithms ─────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Evaluate \\(\\log_3(81)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> We need to find \\(k\\) such that \\(3^k = 81\\).' },
                { text: '<strong>Step 2:</strong> Calculate powers of 3: \\(3^1 = 3\\), \\(3^2 = 9\\), \\(3^3 = 27\\), \\(3^4 = 81\\).' },
                { text: '<strong>Answer:</strong> \\(\\log_3(81) = 4\\).' }
            ]
        },

        // ── 3. Practice: Evaluate Log ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the given logarithm:',
            generate: () => LOGARITHMS.qEvaluateLog()
        },

        // ── 4. Concept: Logarithm as Inverse of Exponential ───────────
        {
            type: 'concept',
            title: 'Logarithm as Inverse of Exponential',
            content: '<p>The logarithm function is the <strong>inverse</strong> of the exponential function. This means:</p>' +
                '<div class="lesson-box">' +
                '<strong>Inverse relationship:</strong><br>' +
                '\\(\\log_b(b^x) = x\\) for all \\(x\\)<br>' +
                '\\(b^{\\log_b(x)} = x\\) for all \\(x > 0\\)' +
                '</div>' +
                '<p>Graphically, the graph of \\(y = \\log_b(x)\\) is a reflection of \\(y = b^x\\) in the line \\(y = x\\).</p>' +
                '<p>Important special values:</p>' +
                '<ul>' +
                '<li>\\(\\log_b(1) = 0\\) because \\(b^0 = 1\\)</li>' +
                '<li>\\(\\log_b(b) = 1\\) because \\(b^1 = b\\)</li>' +
                '</ul>'
        },

        // ── 5. Concept: Common and Natural Logarithms ──────────────────
        {
            type: 'concept',
            title: 'Common and Natural Logarithms',
            content: '<p>Two bases are used so frequently that they have special notation:</p>' +
                '<div class="lesson-box">' +
                '<strong>Common logarithm (base 10):</strong> \\(\\log(x) = \\log_{10}(x)\\)<br><br>' +
                '<strong>Natural logarithm (base \\(e\\)):</strong> \\(\\ln(x) = \\log_e(x)\\)' +
                '</div>' +
                '<p>The number \\(e \\approx 2.718\\) is Euler\'s number. It arises naturally in calculus, compound interest, and growth/decay models.</p>' +
                '<p>On the IB formula booklet and most calculators:</p>' +
                '<ul>' +
                '<li><code>log</code> means \\(\\log_{10}\\)</li>' +
                '<li><code>ln</code> means \\(\\log_e\\)</li>' +
                '</ul>'
        },

        // ── 6. Concept: Log Laws (Product, Quotient, Power) ───────────
        {
            type: 'concept',
            title: 'Log Laws',
            content: '<p>These three rules allow you to manipulate and simplify logarithmic expressions. They follow directly from the laws of exponents.</p>' +
                '<div class="lesson-box">' +
                '<strong>Product Rule:</strong> \\(\\log_b(MN) = \\log_b(M) + \\log_b(N)\\)<br><br>' +
                '<strong>Quotient Rule:</strong> \\(\\log_b\\!\\left(\\dfrac{M}{N}\\right) = \\log_b(M) - \\log_b(N)\\)<br><br>' +
                '<strong>Power Rule:</strong> \\(\\log_b(M^k) = k\\log_b(M)\\)' +
                '</div>' +
                '<p>These laws work for any valid base \\(b\\). They are essential for solving logarithmic equations and simplifying expressions in IB exams.</p>' +
                '<p><strong>Caution:</strong> There is no rule for \\(\\log(M + N)\\). You cannot split a log across addition.</p>'
        },

        // ── 7. Example: Applying Log Laws ──────────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Simplify \\(\\log_2(8) + \\log_2(4)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Apply the product rule: \\(\\log_2(8) + \\log_2(4) = \\log_2(8 \\times 4) = \\log_2(32)\\).' },
                { text: '<strong>Step 2:</strong> Evaluate: \\(2^5 = 32\\), so \\(\\log_2(32) = 5\\).' },
                { text: '<strong>Verify:</strong> \\(\\log_2(8) = 3\\) and \\(\\log_2(4) = 2\\), so \\(3 + 2 = 5\\). Correct.' }
            ]
        },

        // ── 8. Practice: Log Laws ──────────────────────────────────────
        {
            type: 'practice',
            intro: 'Identify the correct application of the log laws:',
            generate: () => LOGARITHMS.qLogLaws()
        },

        // ── 9. Example: Express in Terms ───────────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Given \\(\\log(a) = 3\\) and \\(\\log(b) = 2\\), find \\(\\log(a^2 b^3)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Apply the product rule: \\(\\log(a^2 b^3) = \\log(a^2) + \\log(b^3)\\).' },
                { text: '<strong>Step 2:</strong> Apply the power rule: \\(= 2\\log(a) + 3\\log(b)\\).' },
                { text: '<strong>Step 3:</strong> Substitute: \\(= 2(3) + 3(2) = 6 + 6 = 12\\).' }
            ]
        },

        // ── 10. Practice: Express in Terms ─────────────────────────────
        {
            type: 'practice',
            intro: 'Use the log laws to evaluate the expression:',
            generate: () => LOGARITHMS.qExpressInTerms()
        },

        // ── 11. Concept: Change of Base ────────────────────────────────
        {
            type: 'concept',
            title: 'Change of Base Formula',
            content: '<p>The <strong>change of base formula</strong> lets you convert a logarithm from one base to another. This is essential when your calculator only has \\(\\log\\) and \\(\\ln\\) buttons.</p>' +
                '<div class="lesson-box"><strong>Change of Base:</strong> \\(\\log_a(x) = \\dfrac{\\log_c(x)}{\\log_c(a)} = \\dfrac{\\ln(x)}{\\ln(a)}\\)</div>' +
                '<p>This formula is on the IB formula booklet. Common uses:</p>' +
                '<ul>' +
                '<li>Evaluating \\(\\log_3(7)\\) on a calculator: \\(\\frac{\\ln 7}{\\ln 3}\\)</li>' +
                '<li>Simplifying expressions where the bases are powers of each other</li>' +
                '<li>Solving equations with different log bases</li>' +
                '</ul>'
        },

        // ── 12. Example: Change of Base ────────────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Evaluate \\(\\log_4(32)\\) without a calculator.',
            steps: [
                { text: '<strong>Step 1:</strong> Apply change of base using base 2: \\(\\log_4(32) = \\dfrac{\\log_2(32)}{\\log_2(4)}\\).' },
                { text: '<strong>Step 2:</strong> Evaluate each: \\(\\log_2(32) = 5\\) (since \\(2^5 = 32\\)) and \\(\\log_2(4) = 2\\) (since \\(2^2 = 4\\)).' },
                { text: '<strong>Answer:</strong> \\(\\log_4(32) = \\dfrac{5}{2}\\).' }
            ]
        },

        // ── 13. Practice: Change of Base ───────────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate using the change of base formula:',
            generate: () => LOGARITHMS.qChangeOfBase()
        },

        // ── 14. Concept: Solving Log Equations ─────────────────────────
        {
            type: 'concept',
            title: 'Solving Logarithmic Equations',
            content: '<p>To solve equations involving logarithms, use the definition and the log laws to isolate the variable.</p>' +
                '<div class="lesson-box"><strong>Strategy 1 - Single log:</strong><br>' +
                'If \\(\\log_b(\\text{expression}) = k\\), convert to exponential form: \\(\\text{expression} = b^k\\).</div>' +
                '<div class="lesson-box"><strong>Strategy 2 - Combined logs:</strong><br>' +
                'Use the product/quotient rules to combine into a single log, then convert to exponential form.</div>' +
                '<div class="lesson-box"><strong>Strategy 3 - Quadratic in log:</strong><br>' +
                'If you see \\((\\log x)^2\\) terms, substitute \\(y = \\log x\\) and solve the quadratic in \\(y\\).</div>' +
                '<p><strong>Important:</strong> Always check your solutions. Reject any value that makes the argument of a logarithm zero or negative.</p>'
        },

        // ── 15. Example: Solve a Simple Log Equation ───────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Solve \\(\\log_3(2x + 1) = 4\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Convert to exponential form: \\(2x + 1 = 3^4 = 81\\).' },
                { text: '<strong>Step 2:</strong> Solve: \\(2x = 80\\), so \\(x = 40\\).' },
                { text: '<strong>Check:</strong> \\(\\log_3(2(40) + 1) = \\log_3(81) = 4\\). Valid.' }
            ]
        },

        // ── 16. Practice: Solve Simple Log ─────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the logarithmic equation for x:',
            generate: () => LOGARITHMS.qSolveSimpleLog()
        },

        // ── 17. Example: Solve Combined Logs ───────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Solve \\(\\log(x) + \\log(x + 3) = 1\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Combine using the product rule: \\(\\log(x(x + 3)) = 1\\).' },
                { text: '<strong>Step 2:</strong> Convert to exponential form: \\(x(x + 3) = 10^1 = 10\\).' },
                { text: '<strong>Step 3:</strong> Expand: \\(x^2 + 3x - 10 = 0\\).' },
                { text: '<strong>Step 4:</strong> Factor: \\((x + 5)(x - 2) = 0\\), giving \\(x = -5\\) or \\(x = 2\\).' },
                { text: '<strong>Step 5:</strong> Reject \\(x = -5\\) since \\(\\log(-5)\\) is undefined. Therefore \\(x = 2\\).' }
            ]
        },

        // ── 18. Practice: Solve Combined Logs ──────────────────────────
        {
            type: 'practice',
            intro: 'Solve the equation (reject any invalid solutions):',
            generate: () => LOGARITHMS.qSolveCombinedLogs()
        },

        // ── 19. Concept: Quadratic in Log ──────────────────────────────
        {
            type: 'concept',
            title: 'Quadratic Equations in Logarithms',
            content: '<p>Sometimes an equation contains \\((\\log x)^2\\) and \\(\\log x\\) terms. This is a <strong>quadratic in disguise</strong>.</p>' +
                '<div class="lesson-box"><strong>Method:</strong><br>' +
                '1. Let \\(y = \\log_b(x)\\).<br>' +
                '2. Rewrite the equation as a quadratic in \\(y\\).<br>' +
                '3. Solve the quadratic for \\(y\\).<br>' +
                '4. Convert back: \\(x = b^y\\) for each solution.</div>' +
                '<p><strong>Example:</strong> To solve \\((\\log_2 x)^2 - 5\\log_2 x + 6 = 0\\):</p>' +
                '<p>Let \\(y = \\log_2 x\\). Then \\(y^2 - 5y + 6 = 0\\), giving \\((y-2)(y-3) = 0\\), so \\(y = 2\\) or \\(y = 3\\).</p>' +
                '<p>Therefore \\(x = 2^2 = 4\\) or \\(x = 2^3 = 8\\).</p>'
        },

        // ── 20. Practice: Quadratic in Log ─────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the quadratic-in-log equation. Give the larger value of x:',
            generate: () => LOGARITHMS.qQuadraticInLog()
        },

        // ── 21. Concept: Domain and Range of Log Functions ─────────────
        {
            type: 'concept',
            title: 'Log Functions: Domain and Range',
            content: '<p>The function \\(f(x) = \\log_b(x)\\) has specific domain and range restrictions.</p>' +
                '<div class="lesson-box">' +
                '<strong>Domain:</strong> \\(x > 0\\) (the argument of a log must be positive)<br><br>' +
                '<strong>Range:</strong> all real numbers \\((-\\infty, \\infty)\\)<br><br>' +
                '<strong>Vertical asymptote:</strong> \\(x = 0\\) (the \\(y\\)-axis)' +
                '</div>' +
                '<p>For a transformed function \\(f(x) = \\ln(ax + b)\\):</p>' +
                '<ul>' +
                '<li>Domain: \\(ax + b > 0\\), i.e. \\(x > -\\frac{b}{a}\\) (if \\(a > 0\\))</li>' +
                '<li>Vertical asymptote: \\(x = -\\frac{b}{a}\\)</li>' +
                '<li>Range: still all real numbers</li>' +
                '</ul>'
        },

        // ── 22. Practice: Log Function Domain ──────────────────────────
        {
            type: 'practice',
            intro: 'Find the domain of the logarithmic function:',
            generate: () => LOGARITHMS.qLogFunction()
        },

        // ── 23. Summary ────────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Definition:</strong> \\(\\log_b(x) = y \\iff b^y = x\\)</li>' +
                '<li><strong>Product Rule:</strong> \\(\\log_b(MN) = \\log_b(M) + \\log_b(N)\\)</li>' +
                '<li><strong>Quotient Rule:</strong> \\(\\log_b\\!\\left(\\dfrac{M}{N}\\right) = \\log_b(M) - \\log_b(N)\\)</li>' +
                '<li><strong>Power Rule:</strong> \\(\\log_b(M^k) = k\\log_b(M)\\)</li>' +
                '<li><strong>Change of Base:</strong> \\(\\log_a(x) = \\dfrac{\\ln(x)}{\\ln(a)}\\)</li>' +
                '<li><strong>Special values:</strong> \\(\\log_b(1) = 0\\), \\(\\log_b(b) = 1\\)</li>' +
                '<li><strong>Single log equation:</strong> convert to exponential form</li>' +
                '<li><strong>Combined logs:</strong> use product/quotient rule to combine, then convert</li>' +
                '<li><strong>Quadratic in log:</strong> substitute \\(y = \\log_b(x)\\), solve quadratic, convert back</li>' +
                '<li><strong>Domain of \\(\\ln(ax+b)\\):</strong> \\(x > -\\frac{b}{a}\\) with asymptote at \\(x = -\\frac{b}{a}\\)</li>' +
                '<li><strong>Always check:</strong> reject solutions where the argument of a log is zero or negative</li>' +
                '</ul>'
        }
    ]
};
