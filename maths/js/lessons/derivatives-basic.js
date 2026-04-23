/* ================================================================
   LESSON: Basic Differentiation (Derivatives)
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style deep dive.
   ================================================================ */
const LESSON_DERIVATIVES = {
    id: 'derivatives-basic',
    title: 'Basic Differentiation',
    subtitle: 'From tangent slopes to the power rule and standard derivatives',
    folder: 'calculus',
    screens: [
        // 1. Concept - Intuition: average rate vs instantaneous rate
        {
            type: 'concept',
            title: 'What is a Derivative?',
            content: '<p>A <strong>derivative</strong> measures how fast a function is changing at a single instant. Before writing any formula, let us see what "rate of change at an instant" even means, using a concrete function and a table of numbers.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Setup:</strong> a ball is dropped. Its height after \\(t\\) seconds is \\(f(t) = t^2\\) (in some units). What is its speed at the instant \\(t = 2\\)?</p>' +
                '<p>"Speed" means change-in-height divided by change-in-time. The trouble is, an "instant" has zero time, so dividing by zero is not allowed. Instead we measure the <em>average speed</em> over a short interval starting at \\(t = 2\\), and shrink the interval.</p>' +
                '<table style="margin:8px auto;border-collapse:collapse;font-family:monospace;">' +
                '<tr><th style="padding:4px 10px;border-bottom:1px solid #ccc;">Interval</th><th style="padding:4px 10px;border-bottom:1px solid #ccc;">\\(\\Delta f / \\Delta t\\)</th><th style="padding:4px 10px;border-bottom:1px solid #ccc;">Average rate</th></tr>' +
                '<tr><td style="padding:2px 10px;">[2, 3]</td><td style="padding:2px 10px;">(9 - 4)/1</td><td style="padding:2px 10px;">5</td></tr>' +
                '<tr><td style="padding:2px 10px;">[2, 2.5]</td><td style="padding:2px 10px;">(6.25 - 4)/0.5</td><td style="padding:2px 10px;">4.5</td></tr>' +
                '<tr><td style="padding:2px 10px;">[2, 2.1]</td><td style="padding:2px 10px;">(4.41 - 4)/0.1</td><td style="padding:2px 10px;">4.1</td></tr>' +
                '<tr><td style="padding:2px 10px;">[2, 2.01]</td><td style="padding:2px 10px;">(4.0401 - 4)/0.01</td><td style="padding:2px 10px;">4.01</td></tr>' +
                '<tr><td style="padding:2px 10px;">[2, 2.001]</td><td style="padding:2px 10px;">(4.004001 - 4)/0.001</td><td style="padding:2px 10px;">4.001</td></tr>' +
                '</table>' +
                '<p>The average rates are getting closer and closer to <strong>4</strong>. That limiting value is the <strong>instantaneous rate of change</strong> at \\(t = 2\\). We call it the <strong>derivative</strong> of \\(f\\) at \\(t = 2\\) and write \\(f\'(2) = 4\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Two equivalent pictures of the same idea:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li><strong>Rate of change</strong> - how fast the output grows per unit input (speed, flow, growth).</li>' +
                '<li><strong>Slope of the tangent line</strong> - the gradient of the straight line that just touches the curve at that point.</li>' +
                '</ul>' +
                '<p>They are the same number, viewed two ways. The derivative is that number.</p>' +
                '</div>'
        },

        // 2. Concept - Notation
        {
            type: 'concept',
            title: 'Notation for the Derivative',
            content: '<p>Several symbols all mean "the derivative of \\(f\\)". You will see every one of these in textbooks and exam papers, so learn to read them all.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Lagrange notation:</strong> \\(f\'(x)\\). Read as "f prime of x". The apostrophe tells you it is a derivative. To evaluate at a point, write \\(f\'(3)\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Leibniz notation:</strong> \\(\\dfrac{dy}{dx}\\). Read as "d y by d x". If \\(y\\) is a function of \\(x\\), this means the derivative of \\(y\\) with respect to \\(x\\). To evaluate at a point, write \\(\\dfrac{dy}{dx}\\bigg|_{x=3}\\) or just "at \\(x = 3\\)".</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Operator notation:</strong> \\(\\dfrac{d}{dx}\\big[f(x)\\big]\\). Read as "d by d x of f of x". The \\(\\dfrac{d}{dx}\\) acts like a verb that says "differentiate whatever is inside". Very common when writing a derivative of a long expression inline.</p>' +
                '</div>' +
                '<p><strong>Vocabulary check:</strong> "derivative", "gradient function", "rate of change", and "slope of the tangent" all refer to the same object: \\(f\'(x)\\). Different flavours of the same idea.</p>'
        },

        // 3. Concept - The limit definition
        {
            type: 'concept',
            title: 'The Limit Definition',
            content: '<p>We can turn the table in screen 1 into a formula. Pick a point \\(x\\). Look at a nearby point \\(x + h\\) (where \\(h\\) is a small number). The average rate of change over the interval \\([x, x + h]\\) is:</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\dfrac{f(x + h) - f(x)}{h}\\)</p>' +
                '<p>This is the slope of the <em>secant</em> line joining the two points on the curve. Now let \\(h\\) shrink toward zero. The secant rotates toward the tangent line, and its slope approaches the derivative:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\displaystyle f\'(x) = \\lim_{h \\to 0} \\dfrac{f(x + h) - f(x)}{h}\\)</p>' +
                '<p>This is the <strong>limit definition of the derivative</strong>, sometimes called differentiation from first principles.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why from first principles matters:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>It <em>defines</em> what a derivative is - all the rules we are about to learn are proved from this limit.</li>' +
                '<li>It occasionally appears in IB papers as a short proof question ("Differentiate \\(x^2\\) from first principles").</li>' +
                '<li>It is the bridge between the "limits" chapter and everything that follows.</li>' +
                '</ul>' +
                '</div>' +
                '<p>In the next screen we will carry out the limit calculation for \\(f(x) = x^2\\) and see what pops out.</p>'
        },

        // 4. Example - First principles derivation of d/dx[x^2]
        {
            type: 'example',
            title: 'First Principles: d/dx(x^2)',
            problem: 'Use the limit definition to find \\(f\'(x)\\) for \\(f(x) = x^2\\).',
            steps: [
                { text: '<strong>Write out the definition:</strong> \\(\\displaystyle f\'(x) = \\lim_{h \\to 0} \\dfrac{f(x+h) - f(x)}{h}\\).' },
                { text: '<strong>Substitute \\(f(x) = x^2\\):</strong> \\(\\displaystyle f\'(x) = \\lim_{h \\to 0} \\dfrac{(x+h)^2 - x^2}{h}\\).' },
                { text: '<strong>Expand the square:</strong> \\((x+h)^2 = x^2 + 2xh + h^2\\). So the numerator is \\(x^2 + 2xh + h^2 - x^2 = 2xh + h^2\\).' },
                { text: '<strong>Simplify:</strong> \\(\\dfrac{2xh + h^2}{h} = 2x + h\\) (cancel one \\(h\\); valid because \\(h \\neq 0\\) under the limit).' },
                { text: '<strong>Take the limit as \\(h \\to 0\\):</strong> \\(\\lim_{h \\to 0}(2x + h) = 2x\\).' },
                { text: '<strong>Answer:</strong> \\(f\'(x) = 2x\\). \\(\\checkmark\\) Sanity check: at \\(x = 2\\), this gives \\(f\'(2) = 4\\), matching the table.' }
            ]
        },

        // 5. Concept - The power rule
        {
            type: 'concept',
            title: 'The Power Rule',
            content: '<p>Doing first principles every time would be painful. Fortunately, once we have done the limit calculation for \\(x^n\\), we get a pattern that works for <em>every</em> power of \\(x\\) in one line.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Power rule:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\dfrac{d}{dx}\\big[x^n\\big] = n x^{n-1}\\)</p>' +
                '<p>In words: <em>bring the power down as a multiplier, then subtract 1 from the power</em>.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Worked micro-examples:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}(x^3) = 3x^{2}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(x^5) = 5x^{4}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(x) = 1 \\cdot x^0 = 1\\) (the slope of the line \\(y = x\\) is 1 everywhere)</li>' +
                '<li>\\(\\dfrac{d}{dx}(x^{1/2}) = \\tfrac{1}{2}x^{-1/2} = \\dfrac{1}{2\\sqrt{x}}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(x^{-1}) = -1 \\cdot x^{-2} = -\\dfrac{1}{x^2}\\)</li>' +
                '</ul>' +
                '<p>The rule works for <strong>any</strong> real exponent \\(n\\): positive, negative, or fractional.</p>' +
                '</div>' +
                '<p><strong>Important pre-step:</strong> if you see \\(\\sqrt{x}\\) or \\(\\dfrac{1}{x^3}\\), rewrite as a power first (\\(x^{1/2}\\), \\(x^{-3}\\)), then apply the rule.</p>'
        },

        // 6. Example - Power rule on ax^n
        {
            type: 'example',
            title: 'Power Rule with a Coefficient',
            problem: 'Differentiate \\(f(x) = 5x^4\\).',
            steps: [
                { text: '<strong>Identify the exponent:</strong> the power is \\(n = 4\\).' },
                { text: '<strong>Bring the power down:</strong> multiply the coefficient 5 by 4, giving \\(5 \\cdot 4 = 20\\).' },
                { text: '<strong>Reduce the power by 1:</strong> \\(x^4 \\to x^3\\).' },
                { text: '<strong>Combine:</strong> \\(f\'(x) = 20x^3\\). \\(\\checkmark\\)' }
            ]
        },

        // 7. Practice - Power rule evaluated at a point
        {
            type: 'practice',
            intro: 'Differentiate the power function and evaluate at the given point:',
            generate: () => DERIVATIVES.qPowerRuleValue()
        },

        // 8. Concept - Constant, scalar, sum/difference rules
        {
            type: 'concept',
            title: 'Constant, Scalar, and Sum Rules',
            content: '<p>Three small rules let us differentiate any polynomial term by term. Each one follows directly from the limit definition (you can prove them with the same \\(h \\to 0\\) trick).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Constant rule:</strong></p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}(c) = 0\\) for any constant \\(c\\).</p>' +
                '<p>A constant function has a flat graph. Flat means slope zero.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Scalar (constant multiple) rule:</strong></p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}\\big[c \\cdot f(x)\\big] = c \\cdot f\'(x)\\)</p>' +
                '<p>Constants ride along untouched. Differentiate the rest and keep the constant out front.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sum and difference rule:</strong></p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}\\big[f(x) \\pm g(x)\\big] = f\'(x) \\pm g\'(x)\\)</p>' +
                '<p>Differentiate each term separately and add or subtract the results.</p>' +
                '</div>' +
                '<p><strong>Putting them together:</strong> to differentiate \\(7x^3 - 4x + 9\\), handle each term: \\(\\dfrac{d}{dx}(7x^3) = 21x^2\\); \\(\\dfrac{d}{dx}(-4x) = -4\\); \\(\\dfrac{d}{dx}(9) = 0\\). Sum: \\(21x^2 - 4\\).</p>'
        },

        // 9. Example - Polynomial
        {
            type: 'example',
            title: 'Differentiating a Polynomial',
            problem: 'Differentiate \\(f(x) = 5x^4 - 3x^2 + 7x - 2\\).',
            steps: [
                { text: '<strong>Strategy:</strong> apply the power rule to each term, using constant and sum rules to glue them together.' },
                { text: '<strong>Term 1:</strong> \\(\\dfrac{d}{dx}(5x^4) = 5 \\cdot 4 x^{3} = 20x^3\\).' },
                { text: '<strong>Term 2:</strong> \\(\\dfrac{d}{dx}(-3x^2) = -3 \\cdot 2 x = -6x\\).' },
                { text: '<strong>Term 3:</strong> \\(\\dfrac{d}{dx}(7x) = 7\\).' },
                { text: '<strong>Term 4:</strong> \\(\\dfrac{d}{dx}(-2) = 0\\) (constant vanishes).' },
                { text: '<strong>Combine:</strong> \\(f\'(x) = 20x^3 - 6x + 7\\). \\(\\checkmark\\)' }
            ]
        },

        // 10. Practice - Power rule expression
        {
            type: 'practice',
            intro: 'Differentiate the polynomial - give the full expression for \\(f\'(x)\\):',
            generate: () => DERIVATIVES.qPowerRuleExpr()
        },

        // 11. Practice - Evaluate f'(a) for cubic
        {
            type: 'practice',
            intro: 'Find \\(f\'(a)\\) at the given point by differentiating first, then substituting:',
            generate: () => DERIVATIVES.qDerivativeAtPoint()
        },

        // 12. Simulation - Explore with PhET Calculus Grapher
        {
            type: 'simulation',
            title: 'Explore: See f and f\' Together',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'This sim draws a function \\(f(x)\\) and its derivative \\(f\'(x)\\) simultaneously. Sketch your own curves and watch the derivative graph react in real time. This is the fastest way to build intuition for what \\(f\'\\) actually "is".',
            tasks: [
                'Draw a straight line with positive slope. What does the derivative graph look like? Try a steeper line - does the derivative change? Connect this to the power rule applied to y = mx + c.',
                'Sketch a parabola that opens upward (like y = x^2). Where is the derivative negative, zero, positive? Notice how the derivative crosses zero exactly at the bottom of the parabola.',
                'Make a curve with a peak (a local maximum). What is the value of f\' at the peak? What about just before and just after? This is a preview of how derivatives are used to find maxima and minima.'
            ]
        },

        // 13. Concept - Standard derivatives: e^x
        {
            type: 'concept',
            title: 'Standard Derivative: e^x',
            content: '<p>The function \\(e^x\\) is the most remarkable function in calculus because its derivative is <em>itself</em>.</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\dfrac{d}{dx}(e^x) = e^x\\)</p>' +
                '<p>This is actually what <em>defines</em> the number \\(e \\approx 2.71828\\) - it is the unique base for which the exponential grows at exactly the rate of its current value.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>With a coefficient in the exponent:</strong></p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\dfrac{d}{dx}(e^{kx}) = k \\, e^{kx}\\)</p>' +
                '<p>Whatever number \\(k\\) sits in the exponent pops out as a multiplier in front. Examples:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}(e^{3x}) = 3 e^{3x}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(e^{-2x}) = -2 e^{-2x}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(5 e^{4x}) = 5 \\cdot 4 e^{4x} = 20 e^{4x}\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Why it is useful:</strong> exponential growth (population, compound interest, radioactive decay) is modelled by \\(e^{kx}\\), so its derivative describes the <em>rate</em> of that growth.</p>'
        },

        // 14. Practice - Exponential
        {
            type: 'practice',
            intro: 'Differentiate the exponential function:',
            generate: () => DERIVATIVES.qExpDerivative()
        },

        // 15. Concept - Standard derivative: ln(x)
        {
            type: 'concept',
            title: 'Standard Derivative: ln(x)',
            content: '<p>The natural logarithm \\(\\ln(x)\\) is the inverse of \\(e^x\\). Its derivative is clean and memorable.</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\dfrac{d}{dx}\\big(\\ln x\\big) = \\dfrac{1}{x}\\)</p>' +
                '<p>Valid for \\(x > 0\\) (since \\(\\ln\\) is only defined there).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>With a constant multiple inside:</strong></p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}\\big(\\ln(kx)\\big) = \\dfrac{1}{x}\\)</p>' +
                '<p>Notice the \\(k\\) disappears! That is because \\(\\ln(kx) = \\ln k + \\ln x\\), and the \\(\\ln k\\) piece is a constant (it differentiates to 0). Only the \\(\\ln x\\) piece matters.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Examples:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}(3\\ln x) = \\dfrac{3}{x}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(\\ln(5x)) = \\dfrac{1}{x}\\) (the 5 vanishes)</li>' +
                '<li>\\(\\dfrac{d}{dx}(-2\\ln(7x)) = -\\dfrac{2}{x}\\)</li>' +
                '</ul>' +
                '</div>'
        },

        // 16. Practice - Logarithm
        {
            type: 'practice',
            intro: 'Differentiate the logarithmic function:',
            generate: () => DERIVATIVES.qLnDerivative()
        },

        // 17. Concept - Trig derivatives
        {
            type: 'concept',
            title: 'Standard Derivatives: sin and cos',
            content: '<p>Two more essentials from the IB formula booklet.</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\dfrac{d}{dx}(\\sin x) = \\cos x \\qquad \\dfrac{d}{dx}(\\cos x) = -\\sin x\\)</p>' +
                '<p><strong>Mind the minus sign on cos.</strong> This is the single most common slip in the whole chapter.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>With a coefficient inside (a form of the chain rule):</strong></p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}(\\sin(kx)) = k\\cos(kx)\\)</p>' +
                '<p style="text-align:center;">\\(\\dfrac{d}{dx}(\\cos(kx)) = -k\\sin(kx)\\)</p>' +
                '<p>Just like with \\(e^{kx}\\), the inner \\(k\\) pops out in front.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Examples:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}(\\sin(3x)) = 3\\cos(3x)\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(4\\cos(2x)) = 4 \\cdot (-2)\\sin(2x) = -8\\sin(2x)\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}(\\tan(kx)) = k\\sec^2(kx)\\) (listed in the formula booklet)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Remember:</strong> trig derivatives only behave this nicely in <em>radians</em>. In degrees you would pick up a factor of \\(\\pi/180\\). IB Math AA always uses radians for calculus.</p>'
        },

        // 18. Example - Mixing standard derivatives
        {
            type: 'example',
            title: 'Mixing Standard Derivatives',
            problem: 'Differentiate \\(f(x) = e^{3x} + \\sin(2x)\\).',
            steps: [
                { text: '<strong>Strategy:</strong> apply the sum rule, then handle each piece with its own standard derivative.' },
                { text: '<strong>Piece 1:</strong> \\(\\dfrac{d}{dx}(e^{3x}) = 3e^{3x}\\) (the 3 in the exponent comes out in front).' },
                { text: '<strong>Piece 2:</strong> \\(\\dfrac{d}{dx}(\\sin(2x)) = 2\\cos(2x)\\) (the 2 comes out; sin becomes cos).' },
                { text: '<strong>Combine:</strong> \\(f\'(x) = 3e^{3x} + 2\\cos(2x)\\). \\(\\checkmark\\)' }
            ]
        },

        // 19. Practice - Trig derivative
        {
            type: 'practice',
            intro: 'Differentiate the trigonometric function:',
            generate: () => DERIVATIVES.qTrigDerivative()
        },

        // 20. Concept - Gradient at a point / geometric meaning
        {
            type: 'concept',
            title: 'Gradient at a Point',
            content: '<p>We said the derivative is the slope of the tangent line. Here is how to actually <em>find</em> that slope at a specific \\(x\\) value.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Two-step procedure:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Differentiate the function to get \\(f\'(x)\\) - the <strong>gradient function</strong>.</li>' +
                '<li>Substitute the \\(x\\) value of the point to get \\(f\'(a)\\) - a single number, the <strong>gradient at that point</strong>.</li>' +
                '</ol>' +
                '<p>Do not substitute before differentiating. \\(f(a)\\) is the <em>height</em>; \\(f\'(a)\\) is the <em>slope</em>. These are different things.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Mini-example:</strong> gradient of \\(y = x^3 - 2x\\) at \\(x = 2\\).</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Differentiate: \\(\\dfrac{dy}{dx} = 3x^2 - 2\\).</li>' +
                '<li>Substitute \\(x = 2\\): \\(3(4) - 2 = 10\\).</li>' +
                '<li>Gradient at that point is \\(10\\).</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Reverse question:</strong> sometimes you are given a gradient and asked <em>where</em> the curve has that gradient. Set \\(f\'(x) = k\\) and solve for \\(x\\).</p>'
        },

        // 21. Practice - Gradient at a point
        {
            type: 'practice',
            intro: 'Find the gradient of the curve at the given point:',
            generate: () => DERIVATIVES.qGradientAtPoint()
        },

        // 22. Practice - Find x given gradient
        {
            type: 'practice',
            intro: 'Find the value of \\(x\\) where the gradient equals the given value:',
            generate: () => DERIVATIVES.qFindXGivenGradient()
        },

        // 23. Concept - Product rule
        {
            type: 'concept',
            title: 'The Product Rule',
            content: '<p>The sum rule lets us split addition into separate derivatives. Multiplication does <em>not</em> split that cleanly. Be careful: \\(\\dfrac{d}{dx}(uv) \\ne u\' v\'\\). You need the <strong>product rule</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.2em;">If \\(y = u \\cdot v\\), then \\(\\dfrac{dy}{dx} = u\'v + u v\'\\).</p>' +
                '<p>"Differentiate the first, keep the second; plus keep the first, differentiate the second." Memorise that sentence.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Four-step method:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Label the two factors as \\(u\\) and \\(v\\).</li>' +
                '<li>Differentiate each to get \\(u\'\\) and \\(v\'\\).</li>' +
                '<li>Plug into \\(u\'v + u v\'\\).</li>' +
                '<li>Simplify or factorise if the question asks for it.</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>When do you need the product rule?</strong> Whenever the function is a product of two different "types" of things that neither of you can easily multiply out. For example:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(x^2 \\sin x\\) (polynomial times trig)</li>' +
                '<li>\\(x e^x\\) (polynomial times exponential)</li>' +
                '<li>\\(e^x \\ln x\\) (exponential times log)</li>' +
                '</ul>' +
                '<p>If both factors are polynomials, it is often easier to just expand and use the power rule.</p>' +
                '</div>'
        },

        // 24. Example - Product rule
        {
            type: 'example',
            title: 'Product Rule Worked Example',
            problem: 'Differentiate \\(y = x^2 \\sin x\\).',
            steps: [
                { text: '<strong>Step 1 - label:</strong> let \\(u = x^2\\) and \\(v = \\sin x\\).' },
                { text: '<strong>Step 2 - differentiate each:</strong> \\(u\' = 2x\\) (power rule) and \\(v\' = \\cos x\\) (standard trig derivative).' },
                { text: '<strong>Step 3 - apply \\(u\'v + u v\'\\):</strong> \\(\\dfrac{dy}{dx} = (2x)(\\sin x) + (x^2)(\\cos x)\\).' },
                { text: '<strong>Step 4 - tidy:</strong> \\(\\dfrac{dy}{dx} = 2x\\sin x + x^2 \\cos x\\).' },
                { text: '<strong>Optional factor:</strong> \\(\\dfrac{dy}{dx} = x(2\\sin x + x\\cos x)\\). Either form is a valid answer. \\(\\checkmark\\)' }
            ]
        },

        // 25. Practice - Product rule value
        {
            type: 'practice',
            intro: 'Use the product rule and evaluate the derivative at the given point:',
            generate: () => DERIVATIVES.qProductRuleValue()
        },

        // 26. Practice - Product rule expression
        {
            type: 'practice',
            intro: 'Use the product rule - give the full expression for the derivative:',
            generate: () => DERIVATIVES.qProductRuleExpr()
        },

        // 27. Concept - Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>These are the mistakes that cost marks every exam season. Read them slowly.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: substituting before differentiating.</strong></p>' +
                '<p>To find the gradient of \\(y = x^3\\) at \\(x = 2\\), do <em>not</em> write "\\(y = 8\\), so gradient is 8". You must differentiate first (\\(\\dfrac{dy}{dx} = 3x^2\\)) and <em>then</em> substitute (\\(3 \\cdot 4 = 12\\)). The gradient is 12, not 8.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: "the derivative of a product is the product of derivatives".</strong></p>' +
                '<p>Wrong. \\(\\dfrac{d}{dx}(uv) \\ne u\' v\'\\). Use the product rule: \\(u\'v + u v\'\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: dropping the minus sign on \\(\\cos\\).</strong></p>' +
                '<p>\\(\\dfrac{d}{dx}(\\cos x) = -\\sin x\\). Not \\(+\\sin x\\). Check every cos derivative twice.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: forgetting to rewrite surds or fractions as powers.</strong></p>' +
                '<p>You cannot apply the power rule to \\(\\sqrt{x}\\) directly. Rewrite as \\(x^{1/2}\\) first, <em>then</em> differentiate to get \\(\\tfrac{1}{2}x^{-1/2}\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: using degrees for trig in calculus.</strong></p>' +
                '<p>All trig derivatives in IB assume <em>radians</em>. If a question has angles in degrees, convert to radians before differentiating, or your factors will be off by \\(\\pi/180\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 6: forgetting the constant of a \\(\\ln(kx)\\).</strong></p>' +
                '<p>\\(\\dfrac{d}{dx}(\\ln(5x)) = \\dfrac{1}{x}\\), not \\(\\dfrac{1}{5x}\\) or \\(\\dfrac{5}{x}\\). The 5 vanishes because \\(\\ln(5x) = \\ln 5 + \\ln x\\) and \\(\\ln 5\\) is a constant.</p>' +
                '</div>'
        },

        // 28. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>What a derivative is:</strong> the limit of average rates of change; the slope of the tangent line at a point.</li>' +
                '<li><strong>Notations:</strong> \\(f\'(x)\\), \\(\\dfrac{dy}{dx}\\), \\(\\dfrac{d}{dx}[f(x)]\\) - all the same object.</li>' +
                '<li><strong>Limit definition:</strong> \\(f\'(x) = \\lim_{h \\to 0}\\dfrac{f(x+h) - f(x)}{h}\\).</li>' +
                '<li><strong>Power rule:</strong> \\(\\dfrac{d}{dx}(x^n) = n x^{n-1}\\) for any real \\(n\\).</li>' +
                '<li><strong>Constant / scalar / sum:</strong> constants differentiate to 0; constants in front stay; sums split term by term.</li>' +
                '<li><strong>Exponential:</strong> \\(\\dfrac{d}{dx}(e^{kx}) = k e^{kx}\\).</li>' +
                '<li><strong>Logarithm:</strong> \\(\\dfrac{d}{dx}(\\ln x) = \\dfrac{1}{x}\\); and \\(\\dfrac{d}{dx}(\\ln(kx)) = \\dfrac{1}{x}\\) too.</li>' +
                '<li><strong>Trig:</strong> \\(\\dfrac{d}{dx}(\\sin(kx)) = k\\cos(kx)\\); \\(\\dfrac{d}{dx}(\\cos(kx)) = -k\\sin(kx)\\).</li>' +
                '<li><strong>Product rule:</strong> \\((uv)\' = u\'v + u v\'\\) whenever two distinct factors are multiplied.</li>' +
                '<li><strong>Gradient at a point:</strong> differentiate first, then substitute. Never the other way round.</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> the <em>chain rule</em> will let you differentiate functions inside functions (like \\(\\sin(x^2)\\) or \\(e^{3x^2 + 1}\\)) - the single most powerful differentiation technique.</p>'
        }
    ]
};
