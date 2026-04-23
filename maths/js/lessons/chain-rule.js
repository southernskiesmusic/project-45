/* ================================================================
   LESSON: Chain Rule
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style deep-dive.
   ================================================================ */
const LESSON_CHAIN_RULE = {
    id: 'chain-rule',
    title: 'Chain Rule',
    subtitle: 'Differentiating composite functions step by step',
    folder: 'calculus',
    screens: [
        // 1. Concept - Real-world intuition (balloon)
        {
            type: 'concept',
            title: 'Why We Need a New Rule',
            content: '<p>Imagine you are inflating a spherical balloon. Its <strong>area</strong> depends on its <strong>radius</strong>, and its <strong>radius</strong> depends on <strong>time</strong> (it grows as you pump air in). How fast is the area changing with time?</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Two rates, chained:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Area grows with radius: \\(\\dfrac{dA}{dr}\\) (how much area changes per extra cm of radius).</li>' +
                '<li>Radius grows with time: \\(\\dfrac{dr}{dt}\\) (how many cm the radius grows per second).</li>' +
                '</ul>' +
                '<p>Intuitively, if area grows at \\(20\\,\\text{cm}^2\\) per cm of radius, and radius grows at \\(3\\,\\text{cm}\\) per second, then area grows at \\(20 \\times 3 = 60\\,\\text{cm}^2\\) per second.</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\dfrac{dA}{dt} = \\dfrac{dA}{dr} \\cdot \\dfrac{dr}{dt}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>What is the lesson?</strong></p>' +
                '<p>When one quantity depends on a second, and the second depends on a third, the rates <em>multiply</em>. This is the idea behind the <strong>chain rule</strong> - it tells us how to differentiate a function that has another function hidden inside it.</p>' +
                '</div>' +
                '<p>Our previous rules (power, product, quotient) do not handle these hidden inner functions. For example, what is the derivative of \\((3x+1)^4\\)? You could expand it, but that is a nightmare if the power is 10 or 100. The chain rule gives a clean shortcut.</p>'
        },

        // 2. Concept - Composite functions
        {
            type: 'concept',
            title: 'Composite Functions: Inside and Outside',
            content: '<p>Before we differentiate a composite function, we need to recognise one. A <strong>composite function</strong> is a function inside another function - like a gift wrapped in two layers.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Notation:</strong> if \\(y = f(g(x))\\), then</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(g(x)\\) is the <strong>inner</strong> function (the one that touches \\(x\\) first).</li>' +
                '<li>\\(f\\) is the <strong>outer</strong> function (wrapped around the result of \\(g\\)).</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Identifying inner vs outer - the "do it by hand" test:</strong></p>' +
                '<p>If you had to evaluate \\(f(g(x))\\) at \\(x = 2\\), which calculation would you do first?</p>' +
                '<p><em>Example:</em> \\((3x + 1)^4\\) at \\(x = 2\\).</p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>First: compute \\(3(2) + 1 = 7\\). So \\(g(x) = 3x + 1\\) is the inner.</li>' +
                '<li>Then: compute \\(7^4 = 2401\\). So \\(f(u) = u^4\\) is the outer.</li>' +
                '</ol>' +
                '<p>The rule: <strong>whichever operation you would do last is the outer function.</strong></p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>More examples:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\sin(x^2)\\): inner \\(= x^2\\), outer \\(= \\sin\\). (Square first, then take sine.)</li>' +
                '<li>\\(e^{3x}\\): inner \\(= 3x\\), outer \\(= e^{(\\cdot)}\\). (Multiply first, then exponentiate.)</li>' +
                '<li>\\(\\ln(2x + 5)\\): inner \\(= 2x + 5\\), outer \\(= \\ln\\). (Linear first, then log.)</li>' +
                '<li>\\(\\cos^2(x) = (\\cos x)^2\\): inner \\(= \\cos x\\), outer \\(= u^2\\). (Take cosine first, then square.)</li>' +
                '</ul>' +
                '</div>'
        },

        // 3. Concept - The chain rule formula
        {
            type: 'concept',
            title: 'The Chain Rule',
            content: '<p>Here is the rule that makes it all work.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Chain rule (function notation):</strong></p>' +
                '<p style="text-align:center;font-size:1.25em;">\\(\\dfrac{d}{dx}\\bigl[f(g(x))\\bigr] = f\'(g(x)) \\cdot g\'(x)\\)</p>' +
                '<p style="text-align:center;"><em>"derivative of outer (leave inner alone) times derivative of inner."</em></p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Chain rule (Leibniz notation):</strong></p>' +
                '<p>If \\(y = f(u)\\) where \\(u = g(x)\\), then</p>' +
                '<p style="text-align:center;font-size:1.25em;">\\(\\dfrac{dy}{dx} = \\dfrac{dy}{du} \\cdot \\dfrac{du}{dx}\\)</p>' +
                '<p>This version looks like fractions cancelling (\\(du\\) on top and bottom) - it is not literally fraction cancellation, but the notation is designed to remind you of it.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>A three-step recipe:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Identify the inner function \\(g(x)\\) and the outer function \\(f\\).</li>' +
                '<li>Differentiate the outer, keeping the inner unchanged: write \\(f\'(g(x))\\).</li>' +
                '<li>Multiply by the derivative of the inner, \\(g\'(x)\\).</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Why the extra \\(g\'(x)\\)?</strong> Because the inner function is itself changing with \\(x\\). A small change in \\(x\\) first causes a change in \\(g\\), and that change in \\(g\\) then causes a change in \\(f\\). The two rates multiply - exactly like the balloon example.</p>'
        },

        // 4. Example - Chain rule on a power
        {
            type: 'example',
            title: 'Example: Power of a Linear',
            problem: 'Differentiate \\(y = (3x + 1)^4\\).',
            steps: [
                { text: '<strong>Step 1 - identify pieces:</strong> the thing under the power is \\(3x + 1\\), so \\(u = 3x + 1\\) is the inner. The outer is \\(y = u^4\\).' },
                { text: '<strong>Step 2 - differentiate the outer:</strong> \\(\\dfrac{dy}{du} = 4u^3\\). Keep \\(u\\) unexpanded for now - we will substitute at the end.' },
                { text: '<strong>Step 3 - differentiate the inner:</strong> \\(\\dfrac{du}{dx} = 3\\) (just the coefficient of \\(x\\)).' },
                { text: '<strong>Step 4 - multiply:</strong> \\(\\dfrac{dy}{dx} = 4u^3 \\cdot 3 = 12u^3\\).' },
                { text: '<strong>Step 5 - replace \\(u\\):</strong> \\(\\dfrac{dy}{dx} = 12(3x + 1)^3\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dx} = 12(3x + 1)^3\\). \\(\\checkmark\\)' },
                { text: '<strong>Sanity check:</strong> expand \\((3x+1)^4\\) and differentiate term by term - you get the same thing, but with much more work. The chain rule saves massive effort.' }
            ]
        },

        // 5. Practice - Chain rule power
        {
            type: 'practice',
            intro: 'Differentiate using the chain rule on a power, then evaluate:',
            generate: () => CHAIN_RULE.qChainPower()
        },

        // 6. Practice - Chain rule evaluate
        {
            type: 'practice',
            intro: 'Differentiate the composite function and evaluate at the given point:',
            generate: () => CHAIN_RULE.qChainEvaluate()
        },

        // 7. Concept - Chain rule with exponentials
        {
            type: 'concept',
            title: 'Chain Rule with Exponentials',
            content: '<p>You already know \\(\\dfrac{d}{dx}[e^x] = e^x\\). What changes when the exponent is not just \\(x\\)?</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The general rule:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\dfrac{d}{dx}\\bigl[e^{f(x)}\\bigr] = f\'(x) \\cdot e^{f(x)}\\)</p>' +
                '<p>In words: the derivative of \\(e^{\\text{something}}\\) is \\(e^{\\text{something}}\\) again (that part never changes) multiplied by the derivative of that "something".</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Worked mini-examples:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}[e^{5x}] = 5e^{5x}\\) (derivative of \\(5x\\) is \\(5\\)).</li>' +
                '<li>\\(\\dfrac{d}{dx}[e^{x^2}] = 2x\\,e^{x^2}\\) (derivative of \\(x^2\\) is \\(2x\\)).</li>' +
                '<li>\\(\\dfrac{d}{dx}[e^{-x}] = -e^{-x}\\) (derivative of \\(-x\\) is \\(-1\\)).</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Why does it work?</strong> The outer function is \\(e^u\\), whose derivative is still \\(e^u\\). The inner is \\(f(x)\\). Applying chain rule: \\(e^{f(x)} \\cdot f\'(x)\\). The \\(e^{f(x)}\\) factor is untouched because the exponential is its own derivative.</p>'
        },

        // 8. Example - e^(3x^2)
        {
            type: 'example',
            title: 'Example: Exponential with Polynomial Inside',
            problem: 'Differentiate \\(y = e^{3x^2}\\).',
            steps: [
                { text: '<strong>Step 1 - identify pieces:</strong> the exponent is \\(3x^2\\), so \\(u = 3x^2\\) is the inner, and \\(y = e^u\\) is the outer.' },
                { text: '<strong>Step 2 - differentiate the outer:</strong> \\(\\dfrac{dy}{du} = e^u\\). Exponential is its own derivative, so nothing changes.' },
                { text: '<strong>Step 3 - differentiate the inner:</strong> \\(\\dfrac{du}{dx} = 6x\\).' },
                { text: '<strong>Step 4 - multiply:</strong> \\(\\dfrac{dy}{dx} = e^u \\cdot 6x\\).' },
                { text: '<strong>Step 5 - replace \\(u\\):</strong> \\(\\dfrac{dy}{dx} = 6x\\,e^{3x^2}\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dx} = 6x\\,e^{3x^2}\\). \\(\\checkmark\\)' }
            ]
        },

        // 9. Practice - exponential
        {
            type: 'practice',
            intro: 'Differentiate the exponential function and evaluate:',
            generate: () => CHAIN_RULE.qChainExp()
        },

        // 10. Concept - Chain rule with logarithms
        {
            type: 'concept',
            title: 'Chain Rule with Logarithms',
            content: '<p>You know \\(\\dfrac{d}{dx}[\\ln x] = \\dfrac{1}{x}\\). What about \\(\\ln\\) of something more complicated?</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The general rule:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\dfrac{d}{dx}\\bigl[\\ln(f(x))\\bigr] = \\dfrac{f\'(x)}{f(x)}\\)</p>' +
                '<p>"Derivative of the inside, divided by the inside."</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why?</strong> Apply chain rule with outer \\(\\ln u\\) and inner \\(u = f(x)\\). The outer derivative is \\(1/u\\), and we multiply by \\(f\'(x)\\): \\(\\dfrac{1}{f(x)} \\cdot f\'(x) = \\dfrac{f\'(x)}{f(x)}\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Quick examples:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}[\\ln(2x + 5)] = \\dfrac{2}{2x + 5}\\).</li>' +
                '<li>\\(\\dfrac{d}{dx}[\\ln(x^2 + 1)] = \\dfrac{2x}{x^2 + 1}\\).</li>' +
                '<li>\\(\\dfrac{d}{dx}[\\ln(x^3)] = \\dfrac{3x^2}{x^3} = \\dfrac{3}{x}\\). (Simplify when you can - or use log laws first: \\(\\ln(x^3) = 3\\ln x\\), then differentiate to \\(3/x\\).)</li>' +
                '</ul>' +
                '</div>'
        },

        // 11. Practice - logarithm
        {
            type: 'practice',
            intro: 'Differentiate the logarithmic function using the chain rule:',
            generate: () => CHAIN_RULE.qChainLn()
        },

        // 12. Concept - Chain rule with trig
        {
            type: 'concept',
            title: 'Chain Rule with Trig Functions',
            content: '<p>The same pattern applies to \\(\\sin\\), \\(\\cos\\), \\(\\tan\\): differentiate the outer trig function (standard rule), leave the inner unchanged, then multiply by the derivative of the inner.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The three standard chain-rule trig patterns:</strong></p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}\\bigl[\\sin(f(x))\\bigr] = f\'(x)\\cos(f(x))\\)</p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}\\bigl[\\cos(f(x))\\bigr] = -f\'(x)\\sin(f(x))\\)</p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}\\bigl[\\tan(f(x))\\bigr] = f\'(x)\\sec^2(f(x))\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Common special case - trig of \\(kx\\):</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}[\\sin(kx)] = k\\cos(kx)\\).</li>' +
                '<li>\\(\\dfrac{d}{dx}[\\cos(kx)] = -k\\sin(kx)\\).</li>' +
                '<li>\\(\\dfrac{d}{dx}[\\tan(kx)] = k\\sec^2(kx)\\).</li>' +
                '</ul>' +
                '<p>The extra factor \\(k\\) comes straight from the chain rule - the inner \\(kx\\) has derivative \\(k\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Watch the minus sign on cosine:</strong> \\(\\dfrac{d}{dx}[\\cos] = -\\sin\\). When the inner is not just \\(x\\), that minus stays: \\(\\dfrac{d}{dx}[\\cos(3x^2)] = -6x\\sin(3x^2)\\). Do not lose it.</p>' +
                '</div>'
        },

        // 13. Example - sin(x^2)
        {
            type: 'example',
            title: 'Example: Sine of a Polynomial',
            problem: 'Differentiate \\(y = \\sin(x^2)\\).',
            steps: [
                { text: '<strong>Step 1 - identify pieces:</strong> inner \\(u = x^2\\), outer \\(y = \\sin u\\).' },
                { text: '<strong>Step 2 - differentiate the outer:</strong> \\(\\dfrac{dy}{du} = \\cos u\\). (Remember \\(\\dfrac{d}{du}[\\sin u] = \\cos u\\).)' },
                { text: '<strong>Step 3 - differentiate the inner:</strong> \\(\\dfrac{du}{dx} = 2x\\).' },
                { text: '<strong>Step 4 - multiply:</strong> \\(\\dfrac{dy}{dx} = \\cos u \\cdot 2x = 2x\\cos u\\).' },
                { text: '<strong>Step 5 - replace \\(u\\):</strong> \\(\\dfrac{dy}{dx} = 2x\\cos(x^2)\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dx} = 2x\\cos(x^2)\\). Note that the argument of \\(\\cos\\) is \\(x^2\\), <em>not</em> \\(x\\) - do not simplify incorrectly!' }
            ]
        },

        // 14. Practice - sin
        {
            type: 'practice',
            intro: 'Differentiate the sine function and evaluate:',
            generate: () => CHAIN_RULE.qChainSin()
        },

        // 15. Practice - cos
        {
            type: 'practice',
            intro: 'Differentiate the cosine function and evaluate (watch the minus sign):',
            generate: () => CHAIN_RULE.qChainCos()
        },

        // 16. Practice - tan
        {
            type: 'practice',
            intro: 'Differentiate the tangent function and evaluate:',
            generate: () => CHAIN_RULE.qChainTan()
        },

        // 17. Simulation
        {
            type: 'simulation',
            title: 'Explore: Derivatives and Shape',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'Use the Calculus Grapher to see how composite functions behave and what their derivatives look like. Chain-rule derivatives are often scaled or stretched versions of simpler ones - the sim makes that visible.',
            tasks: [
                'Build a simple function like \\(y = x^2\\) and look at its derivative curve. Now try to picture \\((3x + 1)^2\\): how would the derivative change? Check your guess by sketching a shifted / stretched curve in the sim.',
                'Draw a curve shaped like \\(\\sin\\). Then draw a more steeply oscillating curve (like \\(\\sin(3x)\\)). Compare the two derivative graphs - which one oscillates with larger amplitude? That extra amplitude is exactly the factor of 3 you get from the chain rule.',
                'Create a function that grows very fast on one side (like an exponential) and compare its derivative to the function itself. The chain rule says that \\(\\frac{d}{dx}[e^{f(x)}] = f\'(x) \\cdot e^{f(x)}\\) - can you see how the derivative inherits the shape of \\(e^{f(x)}\\) but is rescaled by \\(f\'(x)\\)?'
            ]
        },

        // 18. Example - Negative power / reciprocal
        {
            type: 'example',
            title: 'Example: Reciprocal as a Negative Power',
            problem: 'Differentiate \\(y = \\dfrac{1}{(2x + 1)^3}\\).',
            steps: [
                { text: '<strong>Step 1 - rewrite as a power:</strong> \\(y = (2x + 1)^{-3}\\). Negative exponents let you use the power rule with the chain rule instead of messy quotient rule.' },
                { text: '<strong>Step 2 - identify pieces:</strong> inner \\(u = 2x + 1\\), outer \\(y = u^{-3}\\).' },
                { text: '<strong>Step 3 - differentiate the outer:</strong> \\(\\dfrac{dy}{du} = -3u^{-4}\\).' },
                { text: '<strong>Step 4 - differentiate the inner:</strong> \\(\\dfrac{du}{dx} = 2\\).' },
                { text: '<strong>Step 5 - multiply:</strong> \\(\\dfrac{dy}{dx} = -3u^{-4} \\cdot 2 = -6u^{-4}\\).' },
                { text: '<strong>Step 6 - replace \\(u\\) and tidy:</strong> \\(\\dfrac{dy}{dx} = -6(2x + 1)^{-4} = \\dfrac{-6}{(2x + 1)^4}\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dx} = \\dfrac{-6}{(2x + 1)^4}\\). \\(\\checkmark\\)' }
            ]
        },

        // 19. Practice - negative power
        {
            type: 'practice',
            intro: 'Differentiate the reciprocal by rewriting as a negative power and applying the chain rule:',
            generate: () => CHAIN_RULE.qChainWithNegative()
        },

        // 20. Practice - quadratic power
        {
            type: 'practice',
            intro: 'Differentiate the quadratic raised to a power, then evaluate:',
            generate: () => CHAIN_RULE.qChainPowerEval()
        },

        // 21. Practice - recognise the composite derivative
        {
            type: 'practice',
            intro: 'Pick the correct derivative from the choices given:',
            generate: () => CHAIN_RULE.qChainCompositeExpr()
        },

        // 22. Concept - Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>These are the mistakes that cost marks year after year. Learn them now and save yourself on the exam.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: forgetting the inner derivative.</strong></p>' +
                '<p>Writing \\(\\dfrac{d}{dx}[(3x+1)^4] = 4(3x+1)^3\\) is <em>wrong</em>. You forgot to multiply by \\(3\\) (the derivative of \\(3x+1\\)). Correct answer: \\(12(3x+1)^3\\).</p>' +
                '<p>This is the single most common chain-rule error. Every time you differentiate a composite, ask yourself: "did I multiply by the derivative of the inside?"</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: misidentifying the inner function.</strong></p>' +
                '<p>For \\(\\sin^2(x)\\) (which means \\((\\sin x)^2\\)), the inner is \\(\\sin x\\) and the outer is \\(u^2\\). Do <em>not</em> treat \\(x\\) as the inner. Correct derivative: \\(2\\sin x \\cdot \\cos x\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: changing the inner during differentiation.</strong></p>' +
                '<p>When you differentiate the outer, the inner stays <em>the same</em>. For \\(\\cos(3x^2)\\), the derivative is \\(-6x\\sin(3x^2)\\), <em>not</em> \\(-6x\\sin(x)\\) or \\(-6x\\sin(6x)\\). The argument is untouched.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: dropping the minus sign on \\(\\cos\\).</strong></p>' +
                '<p>\\(\\dfrac{d}{dx}[\\cos(f(x))] = -f\'(x)\\sin(f(x))\\). The minus is part of the cosine derivative - it survives the chain rule.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: using product rule when you should use chain rule.</strong></p>' +
                '<p>\\(e^{3x}\\) is <em>not</em> \\(e \\cdot 3x\\) - it is one function, \\(e^{(\\cdot)}\\), evaluated at \\(3x\\). Use chain rule: derivative is \\(3e^{3x}\\). Product rule would give nonsense here.</p>' +
                '</div>'
        },

        // 23. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>Intuition:</strong> if \\(A\\) depends on \\(r\\) and \\(r\\) depends on \\(t\\), then rates multiply: \\(\\dfrac{dA}{dt} = \\dfrac{dA}{dr}\\cdot\\dfrac{dr}{dt}\\).</li>' +
                '<li><strong>Chain rule:</strong> \\(\\dfrac{d}{dx}\\bigl[f(g(x))\\bigr] = f\'(g(x)) \\cdot g\'(x)\\) - derivative of outer, times derivative of inner.</li>' +
                '<li><strong>Leibniz form:</strong> \\(\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}\\).</li>' +
                '<li><strong>Powers:</strong> \\(\\dfrac{d}{dx}\\bigl[(ax+b)^n\\bigr] = n\\,a\\,(ax+b)^{n-1}\\).</li>' +
                '<li><strong>Exponential:</strong> \\(\\dfrac{d}{dx}\\bigl[e^{f(x)}\\bigr] = f\'(x)\\,e^{f(x)}\\).</li>' +
                '<li><strong>Logarithm:</strong> \\(\\dfrac{d}{dx}\\bigl[\\ln(f(x))\\bigr] = \\dfrac{f\'(x)}{f(x)}\\).</li>' +
                '<li><strong>Sine:</strong> \\(\\dfrac{d}{dx}\\bigl[\\sin(f(x))\\bigr] = f\'(x)\\cos(f(x))\\).</li>' +
                '<li><strong>Cosine:</strong> \\(\\dfrac{d}{dx}\\bigl[\\cos(f(x))\\bigr] = -f\'(x)\\sin(f(x))\\).</li>' +
                '<li><strong>Tangent:</strong> \\(\\dfrac{d}{dx}\\bigl[\\tan(f(x))\\bigr] = f\'(x)\\sec^2(f(x))\\).</li>' +
                '<li><strong>Reciprocals:</strong> rewrite \\(\\dfrac{1}{g(x)}\\) as \\(g(x)^{-1}\\) and use the chain rule.</li>' +
                '<li><strong>Top tip:</strong> always ask "did I multiply by the derivative of the inside?"</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> the product and quotient rules handle multiplication and division of functions. Combine them with the chain rule and you can differentiate almost anything.</p>'
        }
    ]
};
