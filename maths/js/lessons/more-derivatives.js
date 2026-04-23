/* ================================================================
   LESSON: Further Differentiation
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style structure.
   Covers: product rule, quotient rule, trig derivatives,
   inverse trig derivatives, higher-order derivatives.
   ================================================================ */
const LESSON_MORE_DERIV = {
    id: 'more-derivatives',
    title: 'Further Differentiation',
    subtitle: 'Product rule, quotient rule, trig and inverse trig, higher-order',
    folder: 'calculus',
    screens: [
        // 1. Concept - Why we need new rules
        {
            type: 'concept',
            title: 'Why the Power Rule Is Not Enough',
            content: '<p>Up to now you have differentiated things like \\(x^3\\), \\(\\sqrt{x}\\), and \\(5x - 2\\) with the <strong>power rule</strong>. But what if you see \\(x^2 \\cdot e^x\\) or \\(\\dfrac{\\sin x}{x}\\)? The power rule has nothing to say about these.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The naive guess (and why it fails):</strong></p>' +
                '<p>It would be lovely if \\((fg)\' = f\'\\cdot g\'\\). Let us test it. Take \\(f(x) = x\\) and \\(g(x) = x\\), so \\(f(x)g(x) = x^2\\).</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Correct answer (power rule): \\((x^2)\' = 2x\\).</li>' +
                '<li>Naive "product of derivatives": \\(f\' \\cdot g\' = 1 \\cdot 1 = 1\\).</li>' +
                '</ul>' +
                '<p>Those are not equal. So \\((fg)\' \\neq f\' g\'\\) in general.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>What goes right:</strong> products and quotients each get their own rule (the <em>product rule</em> and <em>quotient rule</em>), and each of the six trig functions gets its own derivative formula.</p>' +
                '<p>This lesson covers all of those, plus higher-order derivatives (differentiate twice, three times, etc.) and a couple of inverse trig results.</p>' +
                '</div>' +
                '<p><strong>Good news:</strong> once you know four short formulas, every question in this topic is just careful bookkeeping.</p>'
        },

        // 2. Concept - Product rule
        {
            type: 'concept',
            title: 'The Product Rule',
            content: '<p>When \\(h(x) = u(x)\\cdot v(x)\\) is a product of two functions, the derivative is <em>not</em> \\(u\'v\'\\). The correct rule is:</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.2em;">\\((uv)\' = u\'v + uv\'\\)</p>' +
                '<p style="text-align:center;">"derivative of the first, times the second, <em>plus</em> the first, times derivative of the second."</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sanity check with \\(h(x) = x \\cdot x = x^2\\):</strong></p>' +
                '<p>Let \\(u = x\\), \\(v = x\\). Then \\(u\' = 1\\), \\(v\' = 1\\).</p>' +
                '<p>\\((uv)\' = u\'v + uv\' = (1)(x) + (x)(1) = 2x\\). \\(\\checkmark\\) Matches \\((x^2)\' = 2x\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Procedure for every product rule question:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Write down \\(u\\) and \\(v\\) clearly.</li>' +
                '<li>Differentiate each: find \\(u\'\\) and \\(v\'\\).</li>' +
                '<li>Assemble \\(u\'v + uv\'\\).</li>' +
                '<li>Factor out any common pieces at the end to tidy up.</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Notation tip:</strong> some books write it \\((fg)\' = f\'g + fg\'\\). Same formula, different letters.</p>'
        },

        // 3. Example - Product rule worked
        {
            type: 'example',
            title: 'Product Rule in Action',
            problem: 'Differentiate \\(f(x) = x^2 e^x\\).',
            steps: [
                { text: '<strong>Step 1 - name the pieces:</strong> let \\(u = x^2\\) and \\(v = e^x\\).' },
                { text: '<strong>Step 2 - differentiate each:</strong> \\(u\' = 2x\\) (power rule) and \\(v\' = e^x\\) (the special function that is its own derivative).' },
                { text: '<strong>Step 3 - apply the rule:</strong> \\(f\'(x) = u\'v + uv\' = (2x)(e^x) + (x^2)(e^x)\\).' },
                { text: '<strong>Step 4 - tidy:</strong> both terms share \\(e^x\\), and both share at least one \\(x\\). Factor: \\(f\'(x) = e^x(2x + x^2) = xe^x(2 + x)\\).' },
                { text: '<strong>Answer:</strong> \\(f\'(x) = xe^x(x + 2)\\). \\(\\checkmark\\)' },
                { text: '<strong>Reality check:</strong> at \\(x = 0\\), \\(f(x) = 0\\cdot 1 = 0\\) and \\(f\'(0) = 0\\cdot 1 \\cdot 2 = 0\\). The graph has a flat spot at the origin - makes sense for a function that is zero there and starts growing.' }
            ]
        },

        // 4. Practice - Product rule (MC)
        {
            type: 'practice',
            intro: 'Select the correct derivative using the product rule:',
            generate: () => MORE_DERIV.qProductRule()
        },

        // 5. Example - Product of two polynomials
        {
            type: 'example',
            title: 'Product Rule or Expand First?',
            problem: 'Differentiate \\(f(x) = (x + 3)(x^2 + 5)\\) and find \\(f\'(1)\\).',
            steps: [
                { text: '<strong>Option A - product rule directly.</strong> Let \\(u = x + 3\\), \\(v = x^2 + 5\\). Then \\(u\' = 1\\), \\(v\' = 2x\\).' },
                { text: '\\(f\'(x) = (1)(x^2 + 5) + (x + 3)(2x) = x^2 + 5 + 2x^2 + 6x = 3x^2 + 6x + 5\\).' },
                { text: '<strong>Option B - expand first.</strong> \\(f(x) = x^3 + 3x^2 + 5x + 15\\). Then differentiate term by term: \\(f\'(x) = 3x^2 + 6x + 5\\). \\(\\checkmark\\) Same answer.' },
                { text: '<strong>Evaluate at \\(x = 1\\):</strong> \\(f\'(1) = 3 + 6 + 5 = 14\\).' },
                { text: '<strong>Exam tip:</strong> if expansion is easy (polynomials with small powers), it is usually faster. If a function like \\(e^x\\), \\(\\sin x\\), or \\(\\ln x\\) appears, you <em>must</em> use the product rule - you cannot "expand" those.' }
            ]
        },

        // 6. Practice - Product rule (expand form)
        {
            type: 'practice',
            intro: 'Differentiate the product and evaluate at \\(x = 1\\):',
            generate: () => MORE_DERIV.qProductRuleSimple()
        },

        // 7. Concept - Quotient rule
        {
            type: 'concept',
            title: 'The Quotient Rule',
            content: '<p>Now for \\(h(x) = \\dfrac{u(x)}{v(x)}\\). The rule has the same \\(u\'v\\) and \\(uv\'\\) ingredients, but assembled differently.</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\left(\\dfrac{u}{v}\\right)\' = \\dfrac{u\'v - uv\'}{v^2}\\)</p>' +
                '<p style="text-align:center;">Minus, not plus. And the whole thing sits over \\(v^2\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>A memory phrase:</strong></p>' +
                '<p>"Lo d-Hi minus Hi d-Lo, over Lo-Lo". Here Hi = numerator, Lo = denominator, d-Hi = derivative of numerator.</p>' +
                '<p>So: \\(\\dfrac{\\text{Lo}\\cdot d\\text{Hi} - \\text{Hi}\\cdot d\\text{Lo}}{\\text{Lo}^2}\\). That is exactly \\(\\dfrac{u\'v - uv\'}{v^2}\\) with \\(u\\) = Hi and \\(v\\) = Lo.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Three things that trip students up:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li><strong>The order matters.</strong> \\(u\'v - uv\'\\), not \\(uv\' - u\'v\\). Swap them and you get the wrong sign.</li>' +
                '<li><strong>The denominator is \\(v^2\\), not \\(v\\).</strong> Square the original bottom.</li>' +
                '<li><strong>Do not expand \\(v^2\\)</strong> unless the question asks. Leaving it as \\((\\text{something})^2\\) is cleaner and usually the expected form.</li>' +
                '</ol>' +
                '</div>'
        },

        // 8. Example - Quotient rule worked
        {
            type: 'example',
            title: 'Quotient Rule in Action',
            problem: 'Differentiate \\(f(x) = \\dfrac{x^2}{x + 1}\\).',
            steps: [
                { text: '<strong>Step 1 - name the pieces:</strong> \\(u = x^2\\) (Hi), \\(v = x + 1\\) (Lo).' },
                { text: '<strong>Step 2 - differentiate each:</strong> \\(u\' = 2x\\), \\(v\' = 1\\).' },
                { text: '<strong>Step 3 - plug into \\(\\dfrac{u\'v - uv\'}{v^2}\\):</strong> \\(\\dfrac{(2x)(x + 1) - (x^2)(1)}{(x + 1)^2}\\).' },
                { text: '<strong>Step 4 - expand the numerator:</strong> \\(2x(x + 1) = 2x^2 + 2x\\). So numerator \\(= 2x^2 + 2x - x^2 = x^2 + 2x\\).' },
                { text: '<strong>Step 5 - factor if possible:</strong> \\(f\'(x) = \\dfrac{x^2 + 2x}{(x + 1)^2} = \\dfrac{x(x + 2)}{(x + 1)^2}\\).' },
                { text: '<strong>Answer:</strong> \\(f\'(x) = \\dfrac{x(x + 2)}{(x + 1)^2}\\). \\(\\checkmark\\) Leave the denominator squared.' }
            ]
        },

        // 9. Practice - Quotient rule
        {
            type: 'practice',
            intro: 'Find the derivative using the quotient rule:',
            generate: () => MORE_DERIV.qQuotientRule()
        },

        // 10. Concept - Trig derivatives
        {
            type: 'concept',
            title: 'Derivatives of sin, cos, tan',
            content: '<p>The three basic trig functions have tidy derivative formulas. You will use them constantly.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The three to memorise:</strong></p>' +
                '<p style="text-align:center;line-height:2;">' +
                '\\(\\dfrac{d}{dx}[\\sin x] = \\cos x\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\cos x] = -\\sin x\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\tan x] = \\sec^2 x\\)' +
                '</p>' +
                '<p>Yes, the only minus sign is on cos. Sin and tan stay positive.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why does cos get the minus sign?</strong></p>' +
                '<p>Look at the graph of \\(\\cos x\\) near \\(x = 0\\). It is at its maximum there and starts to <em>decrease</em>. A decreasing function has a negative derivative. The derivative \\(-\\sin 0 = 0\\) is zero (flat top), and just after zero \\(-\\sin x\\) is negative (cos is heading down). Perfect.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>With a coefficient inside - use the chain rule:</strong></p>' +
                '<p style="text-align:center;line-height:2;">' +
                '\\(\\dfrac{d}{dx}[\\sin(ax)] = a\\cos(ax)\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\cos(ax)] = -a\\sin(ax)\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\tan(ax)] = a\\sec^2(ax)\\)' +
                '</p>' +
                '<p>The coefficient \\(a\\) jumps out to the front. Everything else stays put.</p>' +
                '</div>' +
                '<p><strong>Radians only.</strong> All these formulas assume \\(x\\) is in radians. If the problem is in degrees, convert first - differentiating sin in degrees gives an ugly factor of \\(\\pi/180\\).</p>'
        },

        // 11. Practice - Derivative of sin
        {
            type: 'practice',
            intro: 'Differentiate the sine function and read off the coefficient of cos:',
            generate: () => MORE_DERIV.qDerivSin()
        },

        // 12. Practice - Derivative of cos
        {
            type: 'practice',
            intro: 'Differentiate the cosine function (watch the sign):',
            generate: () => MORE_DERIV.qDerivCos()
        },

        // 13. Practice - Derivative of tan
        {
            type: 'practice',
            intro: 'Differentiate the tangent function:',
            generate: () => MORE_DERIV.qDerivTan()
        },

        // 14. Simulation - Calculus Grapher
        {
            type: 'simulation',
            title: 'Explore: Graphs of Derivatives',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'Sketch a function on the top panel and watch the derivative build itself on the panel below. This sim lets you build visual intuition for what a derivative actually <em>is</em> before you commit the formulas to memory.',
            tasks: [
                'Sketch something that looks like a product of two things - e.g. a curve that rises like \\(x^2\\) but gets "scaled" by a wave. Watch the derivative. Does it show the \\(u\'v + uv\'\\) behaviour? You should see TWO contributions combine to make the derivative curve.',
                'Draw a curve that looks like \\(\\sin x\\) (a wave going up and down). Predict what the derivative should look like, then use the sim to check. Where the original is at a peak, is the derivative zero? Where the original is steepest going up, is the derivative at a maximum?',
                'Now draw a quotient-like shape: a curve that dips down and has a vertical-looking drop (like \\(1/x\\) near zero). What happens to the derivative near the "blow-up"? Is it positive or negative on each side?'
            ]
        },

        // 15. Concept - Inverse trig derivatives
        {
            type: 'concept',
            title: 'Inverse Trig: arcsin, arccos, arctan',
            content: '<p>The inverse trig functions (also written \\(\\sin^{-1}\\), \\(\\cos^{-1}\\), \\(\\tan^{-1}\\)) have surprisingly <em>algebraic</em> derivatives - no trig functions in sight.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The three formulas:</strong></p>' +
                '<p style="text-align:center;line-height:2.2;">' +
                '\\(\\dfrac{d}{dx}[\\arcsin x] = \\dfrac{1}{\\sqrt{1 - x^2}}\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\arccos x] = -\\dfrac{1}{\\sqrt{1 - x^2}}\\)<br>' +
                '\\(\\dfrac{d}{dx}[\\arctan x] = \\dfrac{1}{1 + x^2}\\)' +
                '</p>' +
                '<p>Notice arcsin and arccos differ only by a sign. Arctan is the odd one out, with \\(1 + x^2\\) and no square root.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Where do these come from?</strong></p>' +
                '<p>Sketch proof for arcsin: set \\(y = \\arcsin x\\), so \\(x = \\sin y\\). Differentiate both sides with respect to \\(x\\): \\(1 = \\cos y \\cdot \\dfrac{dy}{dx}\\). Solve: \\(\\dfrac{dy}{dx} = \\dfrac{1}{\\cos y}\\). Using \\(\\cos y = \\sqrt{1 - \\sin^2 y} = \\sqrt{1 - x^2}\\), the derivative becomes \\(\\dfrac{1}{\\sqrt{1 - x^2}}\\).</p>' +
                '<p>This is a first taste of <strong>implicit differentiation</strong>, which you will meet formally in a later topic.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>With a coefficient inside:</strong></p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}[\\arctan(ax)] = \\dfrac{a}{1 + a^2x^2}\\)</p>' +
                '<p>The chain rule pulls the \\(a\\) out on top, and inside the denominator the \\(x^2\\) becomes \\((ax)^2 = a^2 x^2\\).</p>' +
                '</div>'
        },

        // 16. Practice - arcsin derivative
        {
            type: 'practice',
            intro: 'Identify the correct derivative of arcsin:',
            generate: () => MORE_DERIV.qDerivArcsin()
        },

        // 17. Practice - arctan derivative
        {
            type: 'practice',
            intro: 'Differentiate the arctan function and evaluate at \\(x = 0\\):',
            generate: () => MORE_DERIV.qDerivArctan()
        },

        // 18. Concept - Higher-order derivatives
        {
            type: 'concept',
            title: 'Higher-Order Derivatives',
            content: '<p>If \\(f\'(x)\\) is itself a function, we can differentiate <em>it</em> to get the <strong>second derivative</strong> \\(f\'\'(x)\\). And again for \\(f\'\'\'(x)\\), and so on.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Notation you will see:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>First derivative: \\(f\'(x)\\) or \\(\\dfrac{dy}{dx}\\).</li>' +
                '<li>Second derivative: \\(f\'\'(x)\\) or \\(\\dfrac{d^2y}{dx^2}\\).</li>' +
                '<li>Fourth derivative: \\(f^{(4)}(x)\\) - we switch to the number in parentheses once the prime marks get silly.</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>What does \\(f\'\'\\) mean physically?</strong></p>' +
                '<p>If \\(s(t)\\) is position, then \\(s\'(t)\\) is velocity and \\(s\'\'(t)\\) is <em>acceleration</em> - the rate of change of the rate of change.</p>' +
                '<p>On a graph, \\(f\'\'(x)\\) tells you about <strong>concavity</strong>: \\(f\'\' > 0\\) means the curve bends upwards (smile), \\(f\'\' < 0\\) means it bends downwards (frown). This is central to the "second derivative test" for max/min points.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The trig cycle:</strong></p>' +
                '<p>Watch what happens when you repeatedly differentiate \\(\\sin x\\):</p>' +
                '<p style="text-align:center;font-family:monospace;">' +
                '\\(\\sin x \\to \\cos x \\to -\\sin x \\to -\\cos x \\to \\sin x \\to \\ldots\\)' +
                '</p>' +
                '<p>The cycle has period 4. So \\(f^{(4)}(x) = f(x)\\) for \\(f = \\sin x\\) (and the same for \\(\\cos x\\)). This lets you skip ahead: \\(f^{(100)}(x) = f(x)\\) because 100 is a multiple of 4.</p>' +
                '</div>'
        },

        // 19. Example - Second derivative
        {
            type: 'example',
            title: 'Finding a Second Derivative',
            problem: 'Find \\(f\'\'(x)\\) for \\(f(x) = 3x^3 - 2x^2 + x - 5\\) and evaluate \\(f\'\'(2)\\).',
            steps: [
                { text: '<strong>Step 1 - first derivative:</strong> \\(f\'(x) = 9x^2 - 4x + 1\\) (power rule on each term).' },
                { text: '<strong>Step 2 - differentiate again:</strong> \\(f\'\'(x) = 18x - 4\\).' },
                { text: '<strong>Step 3 - evaluate:</strong> \\(f\'\'(2) = 18(2) - 4 = 36 - 4 = 32\\).' },
                { text: '<strong>Interpretation:</strong> \\(f\'\'(2) = 32 > 0\\), so the graph is concave up at \\(x = 2\\) - curving upwards like a smile.' },
                { text: '<strong>Answer:</strong> \\(f\'\'(x) = 18x - 4\\) and \\(f\'\'(2) = 32\\). \\(\\checkmark\\)' }
            ]
        },

        // 20. Practice - Second derivative
        {
            type: 'practice',
            intro: 'Find \\(f\'\'(1)\\) for the cubic polynomial:',
            generate: () => MORE_DERIV.qSecondDerivative()
        },

        // 21. Practice - Higher-order trig
        {
            type: 'practice',
            intro: 'Find the 4th derivative at \\(x = 0\\) (use the period-4 cycle):',
            generate: () => MORE_DERIV.qHigherOrder()
        },

        // 22. Concept - Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>These errors cost marks every exam session. Read carefully.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: writing \\((uv)\' = u\'v\'\\).</strong></p>' +
                '<p>No. The correct product rule is \\(u\'v + uv\'\\) - two terms, added. We showed this at the start: \\((x \\cdot x)\' = 2x\\), not \\(1 \\cdot 1 = 1\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: getting the quotient rule sign backwards.</strong></p>' +
                '<p>It is \\(u\'v - uv\'\\) on top, not \\(uv\' - u\'v\\). Order matters. "Lo d-Hi minus Hi d-Lo" puts the derivative of the numerator first.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: forgetting to square the denominator.</strong></p>' +
                '<p>The quotient rule puts \\(v^2\\) on the bottom, not \\(v\\). And do not expand it - leave it as \\((x + 1)^2\\) or whatever the original was.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: losing the minus sign on \\(\\cos x\\).</strong></p>' +
                '<p>\\((\\cos x)\' = -\\sin x\\), not \\(+\\sin x\\). This bites especially in higher-order derivatives where signs cycle.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: using the arctan denominator for arcsin.</strong></p>' +
                '<p>Arcsin has \\(\\sqrt{1 - x^2}\\) (square root, minus sign). Arctan has \\(1 + x^2\\) (no root, plus sign). Mixing them up is the single most common inverse-trig error.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 6: expanding products that contain \\(e^x\\), \\(\\ln x\\), or \\(\\sin x\\).</strong></p>' +
                '<p>You cannot expand \\(x^2 \\cdot e^x\\) - there is no polynomial form. You must use the product rule. Only expand when both factors are polynomials.</p>' +
                '</div>'
        },

        // 23. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>Product rule:</strong> \\((uv)\' = u\'v + uv\'\\). Two terms, added.</li>' +
                '<li><strong>Quotient rule:</strong> \\(\\left(\\dfrac{u}{v}\\right)\' = \\dfrac{u\'v - uv\'}{v^2}\\). Mind the sign and the squared denominator.</li>' +
                '<li><strong>Trig derivatives (radians):</strong> \\((\\sin x)\' = \\cos x\\), \\((\\cos x)\' = -\\sin x\\), \\((\\tan x)\' = \\sec^2 x\\).</li>' +
                '<li><strong>Chain rule with trig:</strong> \\((\\sin(ax))\' = a\\cos(ax)\\), and similar for cos, tan.</li>' +
                '<li><strong>Inverse trig:</strong> \\((\\arcsin x)\' = \\dfrac{1}{\\sqrt{1 - x^2}}\\), \\((\\arctan x)\' = \\dfrac{1}{1 + x^2}\\).</li>' +
                '<li><strong>Higher-order:</strong> differentiate repeatedly. \\(f\'\'\\) gives concavity; for \\(\\sin/\\cos\\) the cycle repeats every 4.</li>' +
                '<li><strong>Strategy check:</strong> if you see a product of something with \\(e^x\\), \\(\\ln x\\), or a trig function - use the product rule. If you see a fraction of two expressions in \\(x\\) - use the quotient rule.</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> the <em>chain rule</em> in full generality lets you differentiate compositions like \\(\\sin(x^2 + 1)\\) or \\(\\ln(3x - 5)\\) - combined with today\'s tools, you can differentiate almost anything.</p>'
        }
    ]
};
