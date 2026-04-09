const LESSON_EXPONENTS = {
    id: 'exponents',
    title: 'Exponents',
    subtitle: 'Exponent laws, fractional & negative exponents, exponential equations & graphs',
    folder: 'functions',
    screens: [
        // ── 1. Concept: What are Exponents? ───────────────────────
        {
            type: 'concept',
            title: 'What are Exponents?',
            content: '<p>An <strong>exponent</strong> (or power/index) tells us how many times to multiply a base by itself.</p>' +
                '<div class="lesson-box"><strong>Definition:</strong> \\(a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ times}}\\)</div>' +
                '<p>Key terminology:</p>' +
                '<ul>' +
                '<li>\\(a\\) is the <strong>base</strong></li>' +
                '<li>\\(n\\) is the <strong>exponent</strong> (also called power or index)</li>' +
                '<li>\\(a^n\\) is read as "\\(a\\) to the power of \\(n\\)"</li>' +
                '</ul>' +
                '<p>For example: \\(2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32\\).</p>'
        },

        // ── 2. Concept: Laws of Exponents ─────────────────────────
        {
            type: 'concept',
            title: 'Laws of Exponents',
            content: '<p>These fundamental laws apply for all real bases (where defined) and are essential for IB Math AA.</p>' +
                '<div class="lesson-box">' +
                '<strong>Product Rule:</strong> \\(a^m \\times a^n = a^{m+n}\\)<br><br>' +
                '<strong>Quotient Rule:</strong> \\(\\dfrac{a^m}{a^n} = a^{m-n}\\)<br><br>' +
                '<strong>Power of a Power:</strong> \\((a^m)^n = a^{mn}\\)<br><br>' +
                '<strong>Power of a Product:</strong> \\((ab)^n = a^n b^n\\)<br><br>' +
                '<strong>Power of a Quotient:</strong> \\(\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}\\)' +
                '</div>' +
                '<p>These laws allow us to simplify and manipulate expressions involving exponents efficiently.</p>'
        },

        // ── 3. Concept: Zero and Negative Exponents ───────────────
        {
            type: 'concept',
            title: 'Zero and Negative Exponents',
            content: '<p>Two special cases extend the exponent laws to all integers:</p>' +
                '<div class="lesson-box">' +
                '<strong>Zero Exponent:</strong> \\(a^0 = 1\\) for all \\(a \\neq 0\\)<br><br>' +
                '<strong>Negative Exponent:</strong> \\(a^{-n} = \\dfrac{1}{a^n}\\) for \\(a \\neq 0\\)' +
                '</div>' +
                '<p><strong>Why does \\(a^0 = 1\\)?</strong> Using the quotient rule: \\(\\dfrac{a^n}{a^n} = a^{n-n} = a^0\\). But \\(\\dfrac{a^n}{a^n} = 1\\), so \\(a^0 = 1\\).</p>' +
                '<p><strong>Why \\(a^{-n} = \\frac{1}{a^n}\\)?</strong> From \\(a^0 = 1\\): \\(a^{-n} = a^{0-n} = \\dfrac{a^0}{a^n} = \\dfrac{1}{a^n}\\).</p>' +
                '<p>Common examples: \\(5^{-1} = \\frac{1}{5}\\), \\(3^{-2} = \\frac{1}{9}\\), \\(2^{-3} = \\frac{1}{8}\\).</p>'
        },

        // ── 4. Example: Evaluate Powers ───────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Evaluate \\(4^{-2}\\) and \\(10^{0}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> For \\(4^{-2}\\), apply the negative exponent rule: \\(4^{-2} = \\dfrac{1}{4^2}\\).' },
                { text: '<strong>Step 2:</strong> Evaluate: \\(\\dfrac{1}{4^2} = \\dfrac{1}{16}\\).' },
                { text: '<strong>Step 3:</strong> For \\(10^{0}\\), apply the zero exponent rule: \\(10^{0} = 1\\).' },
                { text: '<strong>Answer:</strong> \\(4^{-2} = \\dfrac{1}{16}\\) and \\(10^{0} = 1\\).' }
            ]
        },

        // ── 5. Practice: Evaluate Power ───────────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the given power:',
            generate: () => EXPONENTS.qEvaluatePower()
        },

        // ── 6. Concept: Fractional Exponents ──────────────────────
        {
            type: 'concept',
            title: 'Fractional Exponents',
            content: '<p>Fractional exponents connect powers and roots:</p>' +
                '<div class="lesson-box">' +
                '<strong>Unit Fraction:</strong> \\(a^{1/n} = \\sqrt[n]{a}\\)<br><br>' +
                '<strong>General Fraction:</strong> \\(a^{p/q} = \\left(\\sqrt[q]{a}\\right)^p = \\sqrt[q]{a^p}\\)' +
                '</div>' +
                '<p>The denominator of the fraction is the root, and the numerator is the power. You can take the root first or the power first - the result is the same.</p>' +
                '<p>Examples:</p>' +
                '<ul>' +
                '<li>\\(8^{1/3} = \\sqrt[3]{8} = 2\\)</li>' +
                '<li>\\(27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9\\)</li>' +
                '<li>\\(16^{3/4} = (\\sqrt[4]{16})^3 = 2^3 = 8\\)</li>' +
                '</ul>' +
                '<p><strong>IB Tip:</strong> Always take the root first to keep numbers small.</p>'
        },

        // ── 7. Example: Fractional Exponent ───────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Evaluate \\(32^{3/5}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Rewrite using the rule \\(a^{p/q} = (\\sqrt[q]{a})^p\\).' },
                { text: '<strong>Step 2:</strong> Find the 5th root: \\(\\sqrt[5]{32} = 2\\) (since \\(2^5 = 32\\)).' },
                { text: '<strong>Step 3:</strong> Raise to the power: \\(2^3 = 8\\).' },
                { text: '<strong>Answer:</strong> \\(32^{3/5} = 8\\).' }
            ]
        },

        // ── 8. Practice: Fractional Exponent ──────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the expression with a fractional exponent:',
            generate: () => EXPONENTS.qFractionalExponent()
        },

        // ── 9. Concept: Simplifying Expressions ───────────────────
        {
            type: 'concept',
            title: 'Simplifying Expressions with Exponents',
            content: '<p>To simplify algebraic expressions with exponents, apply the laws systematically:</p>' +
                '<div class="lesson-box">' +
                '<strong>Strategy:</strong><br>' +
                '1. Group terms with the same base.<br>' +
                '2. Apply the product rule (add exponents) for multiplication.<br>' +
                '3. Apply the quotient rule (subtract exponents) for division.<br>' +
                '4. Apply the power-of-a-power rule (multiply exponents) for nested powers.' +
                '</div>' +
                '<p><strong>Example:</strong> Simplify \\(\\dfrac{x^5 \\times x^3}{x^2}\\):</p>' +
                '<p>Numerator: \\(x^5 \\times x^3 = x^{5+3} = x^8\\)</p>' +
                '<p>Then: \\(\\dfrac{x^8}{x^2} = x^{8-2} = x^6\\)</p>'
        },

        // ── 10. Example: Simplify to a^k ─────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Simplify \\((a^4)^3 \\times a^{-5}\\) to the form \\(a^k\\). Find \\(k\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Apply power-of-a-power: \\((a^4)^3 = a^{4 \\times 3} = a^{12}\\).' },
                { text: '<strong>Step 2:</strong> Apply the product rule: \\(a^{12} \\times a^{-5} = a^{12 + (-5)} = a^{7}\\).' },
                { text: '<strong>Answer:</strong> \\(k = 7\\).' }
            ]
        },

        // ── 11. Practice: Simplify to a^k ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the value of k in the expression below:',
            generate: () => EXPONENTS.qSimplifyToAk()
        },

        // ── 12. Concept: Exponential Equations (Same Base) ────────
        {
            type: 'concept',
            title: 'Solving Exponential Equations',
            content: '<p>When both sides of an equation can be written with the <strong>same base</strong>, we can solve by equating the exponents.</p>' +
                '<div class="lesson-box"><strong>Same Base Method:</strong><br>' +
                'If \\(a^{f(x)} = a^{g(x)}\\), then \\(f(x) = g(x)\\) (for \\(a > 0, a \\neq 1\\)).</div>' +
                '<p><strong>Strategy:</strong></p>' +
                '<ol>' +
                '<li>Express both sides with the same base (e.g. \\(8 = 2^3\\), \\(27 = 3^3\\), \\(25 = 5^2\\)).</li>' +
                '<li>Equate the exponents.</li>' +
                '<li>Solve the resulting equation for \\(x\\).</li>' +
                '</ol>' +
                '<p><strong>Common bases:</strong> \\(4 = 2^2\\), \\(8 = 2^3\\), \\(16 = 2^4\\), \\(9 = 3^2\\), \\(27 = 3^3\\), \\(25 = 5^2\\), \\(125 = 5^3\\).</p>'
        },

        // ── 13. Example: Same Base Equation ───────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Solve \\(2^{5x} = 8^{x+2}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Rewrite \\(8\\) as \\(2^3\\): \\(2^{5x} = (2^3)^{x+2}\\).' },
                { text: '<strong>Step 2:</strong> Apply power-of-a-power on the right: \\(2^{5x} = 2^{3(x+2)} = 2^{3x+6}\\).' },
                { text: '<strong>Step 3:</strong> Equate exponents: \\(5x = 3x + 6\\).' },
                { text: '<strong>Step 4:</strong> Solve: \\(2x = 6\\), so \\(x = 3\\).' },
                { text: '<strong>Answer:</strong> \\(x = 3\\).' }
            ]
        },

        // ── 14. Practice: Same Base Equation ──────────────────────
        {
            type: 'practice',
            intro: 'Solve the exponential equation by writing both sides with the same base:',
            generate: () => EXPONENTS.qSameBaseEquation()
        },

        // ── 15. Concept: Exponential Graphs ───────────────────────
        {
            type: 'concept',
            title: 'Exponential Graphs',
            content: '<p>The exponential function \\(f(x) = A \\cdot b^x + k\\) has distinctive features:</p>' +
                '<div class="lesson-box">' +
                '<strong>Key Features of \\(f(x) = A \\cdot b^x + k\\):</strong><br><br>' +
                '<strong>Horizontal asymptote:</strong> \\(y = k\\) (the graph approaches but never reaches this line).<br><br>' +
                '<strong>\\(y\\)-intercept:</strong> \\(f(0) = A + k\\) (substitute \\(x = 0\\)).<br><br>' +
                '<strong>Domain:</strong> \\(x \\in \\mathbb{R}\\) (all real numbers).<br><br>' +
                '<strong>Range:</strong> \\(y > k\\) if \\(A > 0\\); \\(y < k\\) if \\(A < 0\\).<br><br>' +
                '<strong>Behaviour:</strong> If \\(b > 1\\), growth; if \\(0 < b < 1\\), decay.' +
                '</div>' +
                '<p>The natural exponential \\(e^x\\) (where \\(e \\approx 2.718\\)) is particularly important in IB Math AA as it has the special property that its derivative equals itself.</p>'
        },

        // ── 16. Practice: Graph Features ──────────────────────────
        {
            type: 'practice',
            intro: 'Identify the feature of the given exponential function:',
            generate: () => EXPONENTS.qGraphFeatures()
        },

        // ── 17. Example: Quadratic Exponent Equation ──────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Solve \\(4^{x^2} = 2^{6x}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Rewrite \\(4\\) as \\(2^2\\): \\((2^2)^{x^2} = 2^{6x}\\).' },
                { text: '<strong>Step 2:</strong> Simplify: \\(2^{2x^2} = 2^{6x}\\).' },
                { text: '<strong>Step 3:</strong> Equate exponents: \\(2x^2 = 6x\\).' },
                { text: '<strong>Step 4:</strong> Rearrange: \\(2x^2 - 6x = 0\\), so \\(2x(x - 3) = 0\\).' },
                { text: '<strong>Step 5:</strong> Solutions: \\(x = 0\\) or \\(x = 3\\).' },
                { text: '<strong>Answer:</strong> \\(x = 0\\) or \\(x = 3\\).' }
            ]
        },

        // ── 18. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Product Rule:</strong> \\(a^m \\times a^n = a^{m+n}\\)</li>' +
                '<li><strong>Quotient Rule:</strong> \\(\\dfrac{a^m}{a^n} = a^{m-n}\\)</li>' +
                '<li><strong>Power of a Power:</strong> \\((a^m)^n = a^{mn}\\)</li>' +
                '<li><strong>Power of a Product:</strong> \\((ab)^n = a^n b^n\\)</li>' +
                '<li><strong>Zero Exponent:</strong> \\(a^0 = 1\\) for \\(a \\neq 0\\)</li>' +
                '<li><strong>Negative Exponent:</strong> \\(a^{-n} = \\dfrac{1}{a^n}\\)</li>' +
                '<li><strong>Fractional Exponent:</strong> \\(a^{p/q} = \\sqrt[q]{a^p}\\)</li>' +
                '<li><strong>Same Base Method:</strong> If \\(a^{f(x)} = a^{g(x)}\\), then \\(f(x) = g(x)\\)</li>' +
                '<li><strong>Exponential Graph:</strong> \\(f(x) = Ab^x + k\\) has asymptote \\(y = k\\), \\(y\\)-intercept \\(A + k\\)</li>' +
                '<li><strong>Range:</strong> \\(y > k\\) if \\(A > 0\\); \\(y < k\\) if \\(A < 0\\)</li>' +
                '</ul>'
        }
    ]
};
