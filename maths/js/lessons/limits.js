/* ================================================================
   LESSON: Limits and Continuity
   Full rewrite 2026-04-22 — MYP5-friendly, P56-style structure.
   ================================================================ */
const LESSON_LIMITS = {
    id: 'limits',
    title: 'Limits and Continuity',
    subtitle: 'Direct substitution, one-sided limits, continuity',
    folder: 'calculus',
    screens: [
        // 1. Concept — What is a limit? (intuition first)
        {
            type: 'concept',
            title: 'What is a Limit?',
            content: '<p>A <strong>limit</strong> is a statement about where a function is <em>heading</em>, even if it never actually gets there. Before we write down any formulas, let us just look at a function that misbehaves.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Trouble function:</strong> \\(f(x) = \\dfrac{x^2 - 4}{x - 2}\\).</p>' +
                '<p>If we try \\(x = 2\\) we get \\(\\dfrac{0}{0}\\) — undefined. The function is <em>not</em> defined at \\(x = 2\\). But watch what happens when \\(x\\) gets close to \\(2\\) without actually equalling \\(2\\):</p>' +
                '<table style="margin:8px auto;border-collapse:collapse;font-family:monospace;">' +
                '<tr><th style="padding:4px 12px;border-bottom:1px solid #ccc;">\\(x\\)</th><th style="padding:4px 12px;border-bottom:1px solid #ccc;">\\(f(x)\\)</th></tr>' +
                '<tr><td style="padding:2px 12px;">1.9</td><td style="padding:2px 12px;">3.9</td></tr>' +
                '<tr><td style="padding:2px 12px;">1.99</td><td style="padding:2px 12px;">3.99</td></tr>' +
                '<tr><td style="padding:2px 12px;">1.999</td><td style="padding:2px 12px;">3.999</td></tr>' +
                '<tr><td style="padding:2px 12px;color:#c00;">2</td><td style="padding:2px 12px;color:#c00;">undefined</td></tr>' +
                '<tr><td style="padding:2px 12px;">2.001</td><td style="padding:2px 12px;">4.001</td></tr>' +
                '<tr><td style="padding:2px 12px;">2.01</td><td style="padding:2px 12px;">4.01</td></tr>' +
                '<tr><td style="padding:2px 12px;">2.1</td><td style="padding:2px 12px;">4.1</td></tr>' +
                '</table>' +
                '<p>As \\(x\\) gets close to \\(2\\), \\(f(x)\\) gets close to \\(4\\). The function never reaches \\(4\\) at \\(x = 2\\) — but it gets <em>arbitrarily close</em>. That value is the <strong>limit</strong>.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Notation:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\displaystyle\\lim_{x \\to a} f(x) = L\\)</p>' +
                '<p>Reads: "the limit of \\(f(x)\\) as \\(x\\) approaches \\(a\\) is \\(L\\)." So for the example above, \\(\\displaystyle\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4\\).</p>' +
                '</div>' +
                '<p><strong>Key idea:</strong> the limit describes behaviour <em>near</em> a point, not <em>at</em> the point. The function can be undefined, or even defined with a different value, and the limit still exists.</p>'
        },

        // 2. Concept — When can we just substitute?
        {
            type: 'concept',
            title: 'Direct Substitution',
            content: '<p>Computing a limit by tabulating values would be tedious if we had to do it every time. Fortunately, for most "nice" functions we can just substitute.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The substitution rule:</strong></p>' +
                '<p style="text-align:center;">If \\(f\\) is <strong>continuous</strong> at \\(x = a\\), then</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\displaystyle\\lim_{x \\to a} f(x) = f(a)\\)</p>' +
                '<p>That is, plug in \\(a\\) and read off the answer.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Which functions are continuous everywhere?</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Polynomials: \\(x^2, \\, 3x^3 - 2x + 1\\), etc.</li>' +
                '<li>\\(\\sin x, \\; \\cos x, \\; e^x\\).</li>' +
                '<li>\\(\\ln x\\) for \\(x > 0\\).</li>' +
                '<li>Rational functions \\(\\dfrac{p(x)}{q(x)}\\) <em>except</em> where \\(q(a) = 0\\).</li>' +
                '</ul>' +
                '<p>For any of these, you can just substitute.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Example:</strong> \\(\\displaystyle\\lim_{x \\to 3}(x^2 + 2x - 1) = 3^2 + 2(3) - 1 = 14\\).</p>' +
                '<p>Polynomial, no division, substitution works. Done in one line.</p>' +
                '</div>' +
                '<p><strong>When does substitution fail?</strong> When you plug in and get \\(\\dfrac{0}{0}\\) or some other undefined expression. That is the signal to use a different technique — we will cover those next.</p>'
        },

        // 3. Example — Direct substitution
        {
            type: 'example',
            title: 'Limit by Direct Substitution',
            problem: 'Find \\(\\displaystyle\\lim_{x \\to 4}(2x^2 - 3x + 5)\\).',
            steps: [
                { text: '<strong>Check if substitution works:</strong> \\(2x^2 - 3x + 5\\) is a polynomial, so it is continuous everywhere. We can substitute directly.' },
                { text: '<strong>Substitute \\(x = 4\\):</strong> \\(2(4)^2 - 3(4) + 5\\).' },
                { text: '<strong>Simplify:</strong> \\(2(16) - 12 + 5 = 32 - 12 + 5 = 25\\).' },
                { text: '<strong>Answer:</strong> \\(\\displaystyle\\lim_{x \\to 4}(2x^2 - 3x + 5) = 25\\).' }
            ]
        },

        // 4. Practice — Direct substitution
        {
            type: 'practice',
            intro: 'Evaluate the limit by direct substitution:',
            generate: () => LIMITS.qLimitBySubstitution()
        },

        // 5. Concept — The 0/0 problem
        {
            type: 'concept',
            title: 'The 0/0 Problem',
            content: '<p>When you substitute and get \\(\\dfrac{0}{0}\\), do <strong>not</strong> panic. This is called an <strong>indeterminate form</strong> — it means "the limit might still exist, but we need more work to find it." The value \\(\\dfrac{0}{0}\\) itself is not a number.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Why does 0/0 show up?</strong></p>' +
                '<p>Look again at \\(\\dfrac{x^2 - 4}{x - 2}\\) at \\(x = 2\\). The numerator factors as \\((x - 2)(x + 2)\\). Both numerator and denominator have a factor of \\((x - 2)\\), and that factor is exactly what becomes zero at \\(x = 2\\).</p>' +
                '<p>When a factor is shared between top and bottom, you can cancel it. After cancelling, the simpler expression usually lets you substitute without trouble.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The factor-and-cancel strategy:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Substitute. If you get \\(\\dfrac{0}{0}\\), continue.</li>' +
                '<li>Factor numerator and denominator.</li>' +
                '<li>Cancel the common factor (the one that caused the zero).</li>' +
                '<li>Substitute into the simplified expression.</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Why is this valid?</strong> For every \\(x\\) <em>except</em> \\(x = 2\\), the original and simplified expressions are identical. And the limit only cares about values near \\(2\\), not at \\(2\\) itself. So the two functions have the same limit.</p>'
        },

        // 6. Example — Factor and cancel
        {
            type: 'example',
            title: 'Factor and Cancel',
            problem: 'Find \\(\\displaystyle\\lim_{x \\to 3}\\dfrac{x^2 - 9}{x - 3}\\).',
            steps: [
                { text: '<strong>Step 1 — try substitution:</strong> \\(\\dfrac{3^2 - 9}{3 - 3} = \\dfrac{0}{0}\\). Indeterminate — we need to factor.' },
                { text: '<strong>Step 2 — factor the numerator:</strong> \\(x^2 - 9 = (x - 3)(x + 3)\\) (difference of squares).' },
                { text: '<strong>Step 3 — rewrite:</strong> \\(\\dfrac{(x - 3)(x + 3)}{x - 3}\\).' },
                { text: '<strong>Step 4 — cancel the common \\((x - 3)\\):</strong> the expression simplifies to \\(x + 3\\) for all \\(x \\neq 3\\).' },
                { text: '<strong>Step 5 — substitute into the simplified form:</strong> \\(\\displaystyle\\lim_{x \\to 3}(x + 3) = 3 + 3 = 6\\).' },
                { text: '<strong>Answer:</strong> \\(\\displaystyle\\lim_{x \\to 3}\\dfrac{x^2 - 9}{x - 3} = 6\\). \\(\\checkmark\\)' }
            ]
        },

        // 7. Practice — Factor and cancel
        {
            type: 'practice',
            intro: 'Evaluate the limit of the rational expression (hint: factor and cancel):',
            generate: () => LIMITS.qLimitRational()
        },

        // 8. Concept — Limits at infinity
        {
            type: 'concept',
            title: 'Limits at Infinity',
            content: '<p>So far \\(x\\) has approached a finite number. We can also ask what happens as \\(x\\) grows without bound — written \\(x \\to \\infty\\). This is the long-run behaviour of the function.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Key building block:</strong></p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\displaystyle\\lim_{x \\to \\infty} \\dfrac{1}{x^n} = 0\\) for any \\(n > 0\\).</p>' +
                '<p>As \\(x\\) gets huge, \\(1/x\\), \\(1/x^2\\), \\(1/x^3\\) all shrink toward zero. Imagine \\(1/1{,}000{,}000\\) — tiny.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Trick for rational functions — divide by the highest power:</strong></p>' +
                '<p>To evaluate \\(\\displaystyle\\lim_{x \\to \\infty}\\dfrac{3x + 1}{x - 2}\\), divide every term (top and bottom) by \\(x\\) — the highest power in the denominator:</p>' +
                '<p style="text-align:center;">\\(\\dfrac{3x + 1}{x - 2} = \\dfrac{3 + 1/x}{1 - 2/x}\\)</p>' +
                '<p>As \\(x \\to \\infty\\), \\(1/x \\to 0\\) and \\(2/x \\to 0\\), so the expression \\(\\to \\dfrac{3 + 0}{1 - 0} = 3\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Quick rule for rational functions \\(\\dfrac{p(x)}{q(x)}\\) as \\(x \\to \\infty\\):</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Same degree top and bottom: ratio of leading coefficients.</li>' +
                '<li>Top degree \\(\\lt\\) bottom degree: limit is \\(0\\).</li>' +
                '<li>Top degree \\(\\gt\\) bottom degree: limit is \\(\\pm\\infty\\) (no finite limit).</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Exam tip:</strong> these three cases come up again under "horizontal asymptotes" — the asymptote of \\(y = p(x)/q(x)\\) is exactly \\(y = \\lim_{x\\to\\infty} p(x)/q(x)\\).</p>'
        },

        // 9. Example — Limit at infinity
        {
            type: 'example',
            title: 'Rational Limit at Infinity',
            problem: 'Find \\(\\displaystyle\\lim_{x \\to \\infty}\\dfrac{5x^2 - x + 2}{2x^2 + 3}\\).',
            steps: [
                { text: '<strong>Identify highest power:</strong> \\(x^2\\) (appears top and bottom).' },
                { text: '<strong>Divide every term by \\(x^2\\):</strong> \\(\\dfrac{5 - 1/x + 2/x^2}{2 + 3/x^2}\\).' },
                { text: '<strong>Apply \\(1/x^n \\to 0\\):</strong> \\(\\dfrac{5 - 0 + 0}{2 + 0} = \\dfrac{5}{2}\\).' },
                { text: '<strong>Shortcut check:</strong> same degree top and bottom, so ratio of leading coefficients: \\(5 / 2 = 2.5\\). \\(\\checkmark\\)' },
                { text: '<strong>Answer:</strong> \\(\\displaystyle\\lim_{x \\to \\infty}\\dfrac{5x^2 - x + 2}{2x^2 + 3} = \\dfrac{5}{2}\\).' }
            ]
        },

        // 10. Practice — Limit at infinity
        {
            type: 'practice',
            intro: 'Find the limit as \\(x\\) approaches infinity:',
            generate: () => LIMITS.qLimitAtInfinity()
        },

        // 11. Practice — Polynomial limit
        {
            type: 'practice',
            intro: 'Evaluate this polynomial limit:',
            generate: () => LIMITS.qLimitPolynomial()
        },

        // 12. Simulation — Explore graph behaviour
        {
            type: 'simulation',
            title: 'Explore: Graphs and Continuity',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'Drag handles on the curve to build your own function and see how small changes in shape affect where the function is defined, continuous, or discontinuous. Use this sim to build visual intuition before we formalise continuity.',
            tasks: [
                'Build a function that has a visible "break" (jump) somewhere on the graph. What is happening at that x-value — does the function have a value there? What about the limit from the left vs the right?',
                'Make a function with a sharp corner (a "kink"). Is the function defined there? Continuous there? Can you see a limit from each side?',
                'Design a graph with a vertical asymptote. What does the function do as x approaches the asymptote from the left? From the right? Is there a (finite) limit?'
            ]
        },

        // 13. Concept — One-sided limits
        {
            type: 'concept',
            title: 'One-Sided Limits',
            content: '<p>Sometimes a function behaves differently on the two sides of a point — approaching one value from the left and a different value from the right. For this we need <strong>one-sided limits</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Notation:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\displaystyle\\lim_{x \\to a^-} f(x)\\) — limit from the <strong>left</strong> (values of \\(x\\) slightly less than \\(a\\)).</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to a^+} f(x)\\) — limit from the <strong>right</strong> (values of \\(x\\) slightly greater than \\(a\\)).</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The two-sided limit exists iff the one-sided limits agree:</strong></p>' +
                '<p style="text-align:center;">\\(\\displaystyle\\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = L \\text{ and } \\lim_{x \\to a^+} f(x) = L\\)</p>' +
                '<p>If the one-sided limits disagree, the two-sided limit <strong>does not exist</strong> (DNE).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Where do one-sided limits come up?</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li><strong>Piecewise functions</strong> — different formulas on different intervals. Substitute each piece into the appropriate side.</li>' +
                '<li><strong>Jumps or steps</strong> in a real-world graph (tax brackets, postage rates, step functions).</li>' +
                '<li><strong>Vertical asymptotes</strong> — the function often goes to \\(+\\infty\\) on one side and \\(-\\infty\\) on the other.</li>' +
                '</ul>' +
                '</div>'
        },

        // 14. Example — One-sided limit
        {
            type: 'example',
            title: 'One-Sided Limit for a Piecewise Function',
            problem: 'Given \\(f(x) = \\begin{cases} x + 1 & \\text{if } x < 2 \\\\ x^2 & \\text{if } x \\geq 2 \\end{cases}\\), find \\(\\displaystyle\\lim_{x \\to 2^-} f(x)\\), \\(\\displaystyle\\lim_{x \\to 2^+} f(x)\\), and \\(\\displaystyle\\lim_{x \\to 2} f(x)\\).',
            steps: [
                { text: '<strong>From the left (\\(x < 2\\)):</strong> use the first piece, \\(x + 1\\). Substitute: \\(\\displaystyle\\lim_{x \\to 2^-}(x + 1) = 2 + 1 = 3\\).' },
                { text: '<strong>From the right (\\(x \\geq 2\\)):</strong> use the second piece, \\(x^2\\). Substitute: \\(\\displaystyle\\lim_{x \\to 2^+} x^2 = 4\\).' },
                { text: '<strong>Compare:</strong> left limit is \\(3\\), right limit is \\(4\\). They disagree.' },
                { text: '<strong>Conclusion:</strong> the two-sided limit \\(\\displaystyle\\lim_{x \\to 2} f(x)\\) <strong>does not exist</strong>.' },
                { text: '<strong>Picture:</strong> the graph has a "jump" of size 1 at \\(x = 2\\) — it drops from 4 (where the right piece starts) down to 3 (where the left piece heads).' }
            ]
        },

        // 15. Practice — One-sided limit
        {
            type: 'practice',
            intro: 'Find the one-sided limit for the piecewise function:',
            generate: () => LIMITS.qOneSidedLimit()
        },

        // 16. Concept — Continuity at a point
        {
            type: 'concept',
            title: 'Continuity at a Point',
            content: '<p>Informally, a function is <strong>continuous</strong> if you can draw its graph without lifting your pen. Formally, continuity at a point has a precise three-condition test.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The three conditions:</strong></p>' +
                '<p>\\(f\\) is continuous at \\(x = a\\) if <strong>all three</strong> of these hold:</p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(f(a)\\) is <strong>defined</strong> (the function actually has a value at \\(a\\)).</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to a} f(x)\\) <strong>exists</strong> (both one-sided limits agree).</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to a} f(x) = f(a)\\) (the limit equals the function value).</li>' +
                '</ol>' +
                '<p>Miss any one of these and the function has a <strong>discontinuity</strong> at \\(a\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>How to check in practice:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Plug in \\(a\\). If you get a number, condition 1 holds.</li>' +
                '<li>Compute the left and right limits. If they agree, condition 2 holds.</li>' +
                '<li>Compare the common limit to \\(f(a)\\). If equal, condition 3 holds.</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Exam tip:</strong> always state <em>which</em> condition fails when you declare a discontinuity. "Condition 1 fails: \\(f(2)\\) is undefined" earns a method mark; just writing "not continuous" does not.</p>'
        },

        // 17. Concept — Types of discontinuity
        {
            type: 'concept',
            title: 'Types of Discontinuity',
            content: '<p>Not all discontinuities are alike. The IB expects you to classify them into three types.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>1. Removable discontinuity (a "hole")</strong></p>' +
                '<p>The two-sided limit <em>exists</em>, but either \\(f(a)\\) is undefined, or \\(f(a) \\neq \\lim\\). You could "patch" the function by redefining \\(f(a)\\) to equal the limit.</p>' +
                '<p><em>Example:</em> \\(f(x) = \\dfrac{x^2 - 4}{x - 2}\\) at \\(x = 2\\). The limit is 4, but \\(f(2)\\) is undefined. Redefining \\(f(2) = 4\\) would "remove" the discontinuity.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>2. Jump discontinuity</strong></p>' +
                '<p>The one-sided limits both exist but <em>disagree</em> — the graph jumps from one value to another.</p>' +
                '<p><em>Example:</em> a piecewise function that equals \\(1\\) for \\(x < 0\\) and \\(2\\) for \\(x \\geq 0\\). At \\(x = 0\\), left limit is 1, right limit is 2.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>3. Infinite discontinuity (vertical asymptote)</strong></p>' +
                '<p>At least one one-sided limit is \\(\\pm \\infty\\). The function blows up.</p>' +
                '<p><em>Example:</em> \\(f(x) = \\dfrac{1}{x}\\) at \\(x = 0\\). As \\(x \\to 0^+\\), \\(f \\to +\\infty\\); as \\(x \\to 0^-\\), \\(f \\to -\\infty\\).</p>' +
                '</div>' +
                '<p><strong>Removable vs non-removable:</strong> only type 1 is <em>removable</em> (you can patch it). Jumps and asymptotes are <em>non-removable</em> — no single value of \\(f(a)\\) fixes them.</p>'
        },

        // 18. Practice — Continuity check
        {
            type: 'practice',
            intro: 'Determine whether the function is continuous at the given point:',
            generate: () => LIMITS.qContinuityCheck()
        },

        // 19. Practice — Limit exists
        {
            type: 'practice',
            intro: 'Determine whether the limit exists:',
            generate: () => LIMITS.qLimitExists()
        },

        // 20. Practice — Classify discontinuity
        {
            type: 'practice',
            intro: 'Identify the type of discontinuity:',
            generate: () => LIMITS.qRemovableDiscontinuity()
        },

        // 21. Concept — Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>These mistakes cost marks on the exam every year. Read them carefully.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: confusing \\(f(a)\\) with \\(\\displaystyle\\lim_{x \\to a} f(x)\\).</strong></p>' +
                '<p>They are different quantities! A function can have \\(f(2) = 7\\) while \\(\\displaystyle\\lim_{x\\to 2} f(x) = 3\\) (that is a removable discontinuity). Always check what the question is actually asking.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: writing \\(\\frac{0}{0} = 0\\) or \\(\\frac{0}{0} = 1\\).</strong></p>' +
                '<p>Neither. \\(\\dfrac{0}{0}\\) is <strong>indeterminate</strong> — it is a signal to try another method (factoring, L\'Hôpital), not an answer.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: "the limit is \\(\\infty\\)" means the limit exists.</strong></p>' +
                '<p>Not in IB convention. If \\(f(x) \\to \\infty\\) we say the <em>limit does not exist</em> (DNE), though we may write \\(\\lim = \\infty\\) as shorthand to describe the behaviour. Be precise in written answers.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: forgetting to check both one-sided limits for piecewise functions.</strong></p>' +
                '<p>At a join point, the two pieces might evaluate differently. Always compute \\(\\lim_{x\\to a^-}\\) and \\(\\lim_{x\\to a^+}\\) separately using the correct piece.</p>' +
                '</div>'
        },

        // 22. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>Limit intuition:</strong> \\(\\displaystyle\\lim_{x\\to a}f(x) = L\\) describes where \\(f\\) heads near \\(a\\), not necessarily \\(f(a)\\) itself.</li>' +
                '<li><strong>Direct substitution</strong> works for polynomials, \\(\\sin, \\cos, e^x, \\ln x\\) (in domain), and rational functions where the denominator does not vanish.</li>' +
                '<li><strong>\\(0/0\\) is indeterminate</strong> — try <em>factor and cancel</em> before giving up.</li>' +
                '<li><strong>At infinity:</strong> divide every term by the highest power in the denominator; \\(1/x^n \\to 0\\).</li>' +
                '<li><strong>Rational rule at \\(\\infty\\):</strong> same degree → ratio of leading coefficients; lower top → \\(0\\); higher top → \\(\\pm\\infty\\).</li>' +
                '<li><strong>Two-sided limit exists</strong> iff both one-sided limits agree.</li>' +
                '<li><strong>Continuity at \\(a\\):</strong> \\(f(a)\\) defined, limit exists, and limit \\(= f(a)\\). All three required.</li>' +
                '<li><strong>Discontinuity types:</strong> removable (hole), jump, infinite (asymptote). Only removable can be "patched".</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> L\'Hôpital\'s rule gives a powerful new tool for \\(0/0\\) and \\(\\infty/\\infty\\) forms using derivatives.</p>'
        }
    ]
};
