/* ================================================================
   LESSON: Implicit Differentiation
   Full rewrite 2026-04-22 - MYP5-friendly deep-dive, P56-style.
   IB AA HL 5.14.
   ================================================================ */
const LESSON_IMPLICIT = {
    id: 'implicit-differentiation',
    title: 'Implicit Differentiation',
    subtitle: 'Chain rule on y, tangents to implicit curves, second derivatives',
    folder: 'calculus',
    screens: [
        // 1. Concept - the motivation (why not just solve for y?)
        {
            type: 'concept',
            title: 'Why We Need a New Trick',
            content: '<p>Up to now, every function you differentiated looked like \\(y = \\text{something in } x\\). The \\(y\\) sat alone on the left, and the right hand side was a formula you could differentiate term by term. That is called an <strong>explicit</strong> equation.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The problem:</strong> not every curve can be written that way.</p>' +
                '<p>Consider the circle \\(x^2 + y^2 = 25\\). Try to solve for \\(y\\):</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(y = \\pm\\sqrt{25 - x^2}\\)</p>' +
                '<p>Now \\(y\\) is not a single function, it is <em>two</em> (the top semicircle and the bottom semicircle). If someone asks for the gradient at \\((3, -4)\\), we would have to remember to use the negative branch, square root the right thing, use the chain rule, and be careful with signs. Messy.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>It gets worse.</strong> Some curves cannot be solved for \\(y\\) at all in elementary form. Try isolating \\(y\\) in:</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(x^3 + y^3 = 6xy\\)</p>' +
                '<p>You will not succeed. The curve (called the <em>folium of Descartes</em>) is perfectly real - you can plot it - but there is no \\(y = f(x)\\) to write down.</p>' +
                '</div>' +
                '<p><strong>The big idea:</strong> we differentiate the equation <em>as it stands</em>, without ever solving for \\(y\\). That technique is called <strong>implicit differentiation</strong>, and it relies on one thing you already know: the chain rule.</p>'
        },

        // 2. Concept - the chain rule on y
        {
            type: 'concept',
            title: 'Treating y as a Function of x',
            content: '<p>The single idea that makes implicit differentiation work is this: <strong>whenever \\(y\\) appears, pretend it is secretly \\(y(x)\\)</strong> - some unknown function of \\(x\\) - and apply the chain rule accordingly.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The key identity:</strong></p>' +
                '<p style="text-align:center;font-size:1.25em;">\\(\\dfrac{d}{dx}[\\,y^n\\,] = n\\,y^{n-1}\\,\\dfrac{dy}{dx}\\)</p>' +
                '<p>It is just the chain rule. Differentiate the outside (the power rule gives \\(n y^{n-1}\\)), then multiply by the derivative of the inside (the inside is \\(y\\), and its derivative with respect to \\(x\\) is \\(dy/dx\\)).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Quick table of common pieces:</strong></p>' +
                '<table style="margin:8px auto;border-collapse:collapse;">' +
                '<tr><th style="padding:6px 14px;border-bottom:1px solid #ccc;">Expression</th><th style="padding:6px 14px;border-bottom:1px solid #ccc;">Derivative w.r.t. \\(x\\)</th></tr>' +
                '<tr><td style="padding:4px 14px;">\\(x^2\\)</td><td style="padding:4px 14px;">\\(2x\\)</td></tr>' +
                '<tr><td style="padding:4px 14px;">\\(y^2\\)</td><td style="padding:4px 14px;">\\(2y\\dfrac{dy}{dx}\\)</td></tr>' +
                '<tr><td style="padding:4px 14px;">\\(x^3\\)</td><td style="padding:4px 14px;">\\(3x^2\\)</td></tr>' +
                '<tr><td style="padding:4px 14px;">\\(y^3\\)</td><td style="padding:4px 14px;">\\(3y^2\\dfrac{dy}{dx}\\)</td></tr>' +
                '<tr><td style="padding:4px 14px;">\\(\\sin y\\)</td><td style="padding:4px 14px;">\\(\\cos y\\cdot\\dfrac{dy}{dx}\\)</td></tr>' +
                '<tr><td style="padding:4px 14px;">\\(e^y\\)</td><td style="padding:4px 14px;">\\(e^y\\dfrac{dy}{dx}\\)</td></tr>' +
                '</table>' +
                '<p>Notice the pattern: anything in \\(y\\) gets its normal derivative <em>and</em> an extra factor of \\(\\dfrac{dy}{dx}\\) tacked on.</p>' +
                '</div>' +
                '<p><strong>Why the extra \\(dy/dx\\)?</strong> Because \\(y\\) is not a free variable here. It depends on \\(x\\). The chain rule says "derivative of the outer function, times derivative of the inner function," and that inner derivative is exactly \\(dy/dx\\).</p>'
        },

        // 3. Concept - the four-step method
        {
            type: 'concept',
            title: 'The Four-Step Method',
            content: '<p>Every implicit differentiation problem follows the same recipe. Memorise this.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 1 - Differentiate both sides w.r.t. \\(x\\).</strong></p>' +
                '<p>Go term by term. For any \\(y\\) term, attach a \\(\\dfrac{dy}{dx}\\) factor (from the chain rule).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 2 - Collect all \\(\\dfrac{dy}{dx}\\) terms on one side.</strong></p>' +
                '<p>Put every term containing \\(\\dfrac{dy}{dx}\\) on the left, everything else on the right.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 3 - Factor out \\(\\dfrac{dy}{dx}\\).</strong></p>' +
                '<p>The left side should now look like \\((\\text{stuff})\\cdot\\dfrac{dy}{dx}\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 4 - Divide.</strong></p>' +
                '<p>\\(\\dfrac{dy}{dx} = \\dfrac{\\text{right side}}{\\text{stuff}}\\). Done.</p>' +
                '</div>' +
                '<p>The answer will usually contain <em>both</em> \\(x\\) and \\(y\\). That is fine - it is even expected. To evaluate the gradient at a specific point, just plug in both coordinates at the end.</p>'
        },

        // 4. Example - the classic circle
        {
            type: 'example',
            title: 'Worked Example: The Circle x² + y² = 25',
            problem: 'Find \\(\\dfrac{dy}{dx}\\) for \\(x^2 + y^2 = 25\\), then evaluate at the point \\((3, 4)\\).',
            steps: [
                { text: '<strong>Step 1 - differentiate both sides term by term.</strong> The \\(x^2\\) gives \\(2x\\). The \\(y^2\\) is a \\(y\\)-term, so by the chain rule it gives \\(2y\\dfrac{dy}{dx}\\). The right side, 25, is constant, so its derivative is 0. Result: \\(2x + 2y\\dfrac{dy}{dx} = 0\\).' },
                { text: '<strong>Step 2 - isolate the \\(dy/dx\\) term.</strong> Subtract \\(2x\\) from both sides: \\(2y\\dfrac{dy}{dx} = -2x\\).' },
                { text: '<strong>Step 3 - factor / divide.</strong> Divide both sides by \\(2y\\): \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).' },
                { text: '<strong>Step 4 - substitute the point \\((3, 4)\\):</strong> \\(\\dfrac{dy}{dx} = -\\dfrac{3}{4}\\).' },
                { text: '<strong>Sanity check by geometry:</strong> a radius from \\((0,0)\\) to \\((3,4)\\) has slope \\(\\dfrac{4}{3}\\). The tangent to a circle is perpendicular to the radius, so the tangent slope should be \\(-\\dfrac{1}{4/3} = -\\dfrac{3}{4}\\). Matches. \\(\\checkmark\\)' }
            ]
        },

        // 5. Practice - simple circle
        {
            type: 'practice',
            intro: 'Find \\(\\dfrac{dy}{dx}\\) at the given point on the circle:',
            generate: () => IMPLICIT.qDiffImplicitSimple()
        },

        // 6. Practice - linear implicit
        {
            type: 'practice',
            intro: 'Differentiate the linear equation \\(ax + by = c\\) implicitly:',
            generate: () => IMPLICIT.qDiffLinearImplicit()
        },

        // 7. Concept - mixed terms and the single-y case
        {
            type: 'concept',
            title: 'Equations with a Single y-Term',
            content: '<p>Some equations look intimidating but only have <em>one</em> place where \\(y\\) appears. Those are the easiest - you can often read off \\(dy/dx\\) in one line.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Example:</strong> \\(x^2 + y = 10\\).</p>' +
                '<p>Differentiating: \\(2x + \\dfrac{dy}{dx} = 0\\), so \\(\\dfrac{dy}{dx} = -2x\\).</p>' +
                '<p>Notice the answer contains only \\(x\\). That is because we could have rearranged to \\(y = 10 - x^2\\) and differentiated explicitly - same answer. Implicit differentiation agrees with explicit differentiation whenever both work.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Example with \\(y^2\\):</strong> \\(y^2 + 4x = 20\\).</p>' +
                '<p>Differentiating: \\(2y\\dfrac{dy}{dx} + 4 = 0\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{4}{2y} = -\\dfrac{2}{y}\\).</p>' +
                '<p>This time the answer has \\(y\\) in it - unavoidable, because \\(y^2\\) is not one-to-one (two \\(y\\)-values give the same \\(y^2\\)).</p>' +
                '</div>' +
                '<p><strong>Takeaway:</strong> the method does not care how many \\(y\\)-terms you have. One is fine, two is fine, ten is fine. The recipe is always the same.</p>'
        },

        // 8. Practice - x^2 + y = k
        {
            type: 'practice',
            intro: 'Find \\(\\dfrac{dy}{dx}\\) at the given \\(x\\) for \\(x^2 + y = k\\):',
            generate: () => IMPLICIT.qDiffX2Y()
        },

        // 9. Practice - y^2 term
        {
            type: 'practice',
            intro: 'Differentiate the equation with a \\(y^2\\) term:',
            generate: () => IMPLICIT.qDiffY2()
        },

        // 10. Practice - mixed 2x + y^2
        {
            type: 'practice',
            intro: 'Find \\(\\dfrac{dy}{dx}\\) for the mixed equation \\(2x + y^2 = k\\):',
            generate: () => IMPLICIT.qDiffX2Y2()
        },

        // 11. Concept - product rule on xy
        {
            type: 'concept',
            title: 'The Product Rule Strikes: Terms Like xy',
            content: '<p>What about a term like \\(xy\\)? You might be tempted to differentiate the \\(x\\) to get 1, and the \\(y\\) to get \\(dy/dx\\), and stop. That would be wrong.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>\\(xy\\) is a product</strong> of two things that both depend on \\(x\\) (one <em>is</em> \\(x\\); the other is \\(y(x)\\)). You must use the product rule:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\dfrac{d}{dx}[xy] = \\dfrac{d}{dx}[x]\\cdot y + x\\cdot\\dfrac{d}{dx}[y] = y + x\\dfrac{dy}{dx}\\)</p>' +
                '<p>Same "first times derivative of second, plus second times derivative of first" rule from explicit differentiation - just remember the \\(y\\) derivative picks up a \\(dy/dx\\) factor.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Worked example:</strong> differentiate \\(xy = 12\\).</p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}[xy] = y + x\\dfrac{dy}{dx}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}[12] = 0\\)</li>' +
                '<li>So \\(y + x\\dfrac{dy}{dx} = 0\\), giving \\(\\dfrac{dy}{dx} = -\\dfrac{y}{x}\\).</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Other products you will meet:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{d}{dx}[x^2 y] = 2xy + x^2\\dfrac{dy}{dx}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}[xy^2] = y^2 + 2xy\\dfrac{dy}{dx}\\)</li>' +
                '<li>\\(\\dfrac{d}{dx}[y\\sin x] = \\sin x\\cdot\\dfrac{dy}{dx} + y\\cos x\\)</li>' +
                '</ul>' +
                '<p>Always name the two factors clearly before you start - that stops you from losing a term.</p>' +
                '</div>'
        },

        // 12. Practice - product rule xy
        {
            type: 'practice',
            intro: 'Differentiate the product \\(xy = k\\) implicitly:',
            generate: () => IMPLICIT.qDiffXY()
        },

        // 13. Simulation
        {
            type: 'simulation',
            title: 'Explore: Slopes Along a Curve',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'Calculus Grapher lets you draw a function and watch its derivative update live. Use the Derivative view to build feel for how the gradient changes as you move along a curve. We will use this to relate implicit curves to their tangent behaviour.',
            tasks: [
                'Sketch a smooth hump like a semicircle. Watch the derivative trace cross zero at the top. Which point on an implicit circle x² + y² = r² has dy/dx = 0? Which has dy/dx undefined? Predict the coordinates, then confirm using dy/dx = -x/y.',
                'Draw a curve that is steep near one end and flat near the other. Notice that where the curve is vertical, the derivative shoots off. This is exactly what happens on a circle at y = 0 - the formula dy/dx = -x/y is undefined there because the tangent is vertical. Can you explain why that is geometrically sensible?',
                'Build a curve that turns back on itself (not a function). The sim cannot plot its derivative as a single curve - because at each x there are two y-values with different slopes. This is the whole reason implicit differentiation is useful: it gives one formula dy/dx(x, y) that handles both branches at once.'
            ]
        },

        // 14. Concept - tangent lines
        {
            type: 'concept',
            title: 'Tangent Lines to Implicit Curves',
            content: '<p>Once you can find \\(dy/dx\\) implicitly, tangent lines are a two-step job.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Recipe:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Differentiate implicitly to get \\(\\dfrac{dy}{dx}\\) in terms of \\(x\\) and \\(y\\).</li>' +
                '<li>Substitute the point \\((x_0, y_0)\\) to get a numerical slope \\(m\\).</li>' +
                '<li>Use point-slope form: \\(y - y_0 = m(x - x_0)\\).</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Worked example:</strong> tangent to \\(x^2 + y^2 = 25\\) at \\((3, 4)\\).</p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>We already found \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).</li>' +
                '<li>At \\((3, 4)\\): \\(m = -\\dfrac{3}{4}\\).</li>' +
                '<li>Tangent: \\(y - 4 = -\\dfrac{3}{4}(x - 3)\\), or \\(3x + 4y = 25\\).</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Special cases:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li><strong>Horizontal tangent:</strong> \\(\\dfrac{dy}{dx} = 0\\). Set the <em>numerator</em> of your \\(dy/dx\\) formula to zero and solve.</li>' +
                '<li><strong>Vertical tangent:</strong> \\(\\dfrac{dy}{dx}\\) is undefined. Set the <em>denominator</em> of your \\(dy/dx\\) formula to zero and solve.</li>' +
                '</ul>' +
                '<p>On \\(x^2 + y^2 = 25\\), \\(dy/dx = -x/y\\). Horizontal tangents: numerator \\(x = 0\\), giving points \\((0, \\pm 5)\\). Vertical tangents: denominator \\(y = 0\\), giving \\((\\pm 5, 0)\\). Draw the circle and check - those are exactly the top, bottom, left, and right points.</p>' +
                '</div>'
        },

        // 15. Example - tangent to ellipse
        {
            type: 'example',
            title: 'Worked Example: Tangent to an Ellipse',
            problem: 'Find the equation of the tangent to the ellipse \\(\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1\\) at the point \\((2, \\dfrac{3\\sqrt{3}}{2})\\).',
            steps: [
                { text: '<strong>Step 1 - differentiate both sides.</strong> \\(\\dfrac{2x}{16} + \\dfrac{2y}{9}\\dfrac{dy}{dx} = 0\\), which simplifies to \\(\\dfrac{x}{8} + \\dfrac{2y}{9}\\dfrac{dy}{dx} = 0\\).' },
                { text: '<strong>Step 2 - solve for \\(dy/dx\\).</strong> \\(\\dfrac{2y}{9}\\dfrac{dy}{dx} = -\\dfrac{x}{8}\\), so \\(\\dfrac{dy}{dx} = -\\dfrac{9x}{16y}\\).' },
                { text: '<strong>Step 3 - substitute the point.</strong> \\(m = -\\dfrac{9(2)}{16 \\cdot \\frac{3\\sqrt{3}}{2}} = -\\dfrac{18}{24\\sqrt{3}} = -\\dfrac{3}{4\\sqrt{3}} = -\\dfrac{\\sqrt{3}}{4}\\).' },
                { text: '<strong>Step 4 - write the tangent line.</strong> \\(y - \\dfrac{3\\sqrt{3}}{2} = -\\dfrac{\\sqrt{3}}{4}(x - 2)\\).' },
                { text: '<strong>Check with the general rule.</strong> For \\(\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1\\), implicit differentiation gives \\(\\dfrac{dy}{dx} = -\\dfrac{b^2 x}{a^2 y}\\). With \\(a^2 = 16, b^2 = 9\\) and the point above: \\(-\\dfrac{9 \\cdot 2}{16 \\cdot \\frac{3\\sqrt{3}}{2}} = -\\dfrac{\\sqrt{3}}{4}\\). \\(\\checkmark\\)' }
            ]
        },

        // 16. Practice - circle MC
        {
            type: 'practice',
            intro: 'Find \\(\\dfrac{dy}{dx}\\) on the circle (multiple choice):',
            generate: () => IMPLICIT.qDiffCircle()
        },

        // 17. Practice - tangent slope
        {
            type: 'practice',
            intro: 'Find the slope of the tangent to the implicit curve at the given point:',
            generate: () => IMPLICIT.qTangentSlope()
        },

        // 18. Practice - ellipse
        {
            type: 'practice',
            intro: 'Find \\(\\dfrac{dy}{dx}\\) on the ellipse at the given point:',
            generate: () => IMPLICIT.qImplicitEllipse()
        },

        // 19. Concept - second derivative implicitly
        {
            type: 'concept',
            title: 'Second Derivatives Implicitly',
            content: '<p>IB HL sometimes asks for \\(\\dfrac{d^2y}{dx^2}\\) of an implicit curve. The idea is exactly what you would guess: differentiate your expression for \\(dy/dx\\) <em>again</em>, still treating \\(y\\) as a function of \\(x\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Worked example on the unit circle \\(x^2 + y^2 = 1\\).</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>First derivative: \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\).</li>' +
                '<li>Differentiate again using the quotient rule: \\(\\dfrac{d^2y}{dx^2} = -\\dfrac{y \\cdot 1 - x \\cdot \\dfrac{dy}{dx}}{y^2}\\).</li>' +
                '<li>Substitute \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\) into that: numerator becomes \\(y - x\\left(-\\dfrac{x}{y}\\right) = y + \\dfrac{x^2}{y} = \\dfrac{y^2 + x^2}{y} = \\dfrac{1}{y}\\) (since \\(x^2+y^2=1\\)).</li>' +
                '<li>So \\(\\dfrac{d^2y}{dx^2} = -\\dfrac{1/y}{y^2} = -\\dfrac{1}{y^3}\\).</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Method summary:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Get \\(\\dfrac{dy}{dx}\\) by implicit differentiation (as usual).</li>' +
                '<li>Differentiate that expression with respect to \\(x\\), using quotient rule / product rule as needed, remembering that any \\(y\\)-derivative picks up a \\(\\dfrac{dy}{dx}\\).</li>' +
                '<li>Substitute the formula for \\(\\dfrac{dy}{dx}\\) back in.</li>' +
                '<li>Use the original equation to simplify (e.g. replace \\(x^2+y^2\\) with 1 on the unit circle).</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Watch out:</strong> after step 2 you have an expression that still contains \\(dy/dx\\). Do not leave it there - substitute the first-derivative formula so the answer is in \\(x\\) and \\(y\\) only.</p>'
        },

        // 20. Practice - second derivative MC
        {
            type: 'practice',
            intro: 'Identify the second derivative \\(\\dfrac{d^2y}{dx^2}\\) for the unit circle:',
            generate: () => IMPLICIT.qSecondImplicit()
        },

        // 21. Concept - common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>Almost every mark lost on implicit differentiation in IB papers comes from one of these mistakes.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1 - forgetting the \\(dy/dx\\) on \\(y\\)-terms.</strong></p>' +
                '<p>Writing \\(\\dfrac{d}{dx}[y^2] = 2y\\) instead of \\(2y\\dfrac{dy}{dx}\\) is the number one error. Any time you touch a \\(y\\)-term, ask yourself: "did I attach the chain factor?"</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2 - treating \\(xy\\) as a single variable.</strong></p>' +
                '<p>\\(xy\\) is a product. Always product rule it. Writing \\(\\dfrac{d}{dx}[xy] = \\dfrac{dy}{dx}\\) (missing the \\(y\\) term) costs a mark every time.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3 - leaving \\(dy/dx\\) inside the final answer for \\(d^2y/dx^2\\).</strong></p>' +
                '<p>After you differentiate a second time, substitute the first-derivative expression back in. An answer like "\\(\\dfrac{d^2y}{dx^2} = -\\dfrac{y - x\\,dy/dx}{y^2}\\)" is incomplete - resolve the \\(dy/dx\\) to get a clean function of \\(x\\) and \\(y\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4 - plugging the point in before finishing the algebra.</strong></p>' +
                '<p>Some students substitute \\((x_0, y_0)\\) straight into the differentiated equation and then try to solve. That can work, but it is riskier than collecting \\(dy/dx\\) terms symbolically first. Finish the algebra, <em>then</em> plug in the numbers.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5 - panicking when \\(y\\) appears in the final answer.</strong></p>' +
                '<p>It is supposed to. An expression like \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\) is a perfectly good answer. The gradient depends on both coordinates because the curve is not a function.</p>' +
                '</div>'
        },

        // 22. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>Why implicit?</strong> Equations like \\(x^2 + y^2 = 25\\) or \\(x^3 + y^3 = 6xy\\) cannot (or should not) be solved for \\(y\\) before differentiating.</li>' +
                '<li><strong>Core identity:</strong> \\(\\dfrac{d}{dx}[y^n] = n\\,y^{n-1}\\dfrac{dy}{dx}\\). The extra \\(dy/dx\\) comes from the chain rule.</li>' +
                '<li><strong>Four-step method:</strong> differentiate both sides -> collect \\(dy/dx\\) terms -> factor -> divide.</li>' +
                '<li><strong>Product rule on \\(xy\\):</strong> \\(\\dfrac{d}{dx}[xy] = y + x\\dfrac{dy}{dx}\\). Never skip it.</li>' +
                '<li><strong>Classic results:</strong> for \\(x^2+y^2=r^2\\), \\(\\dfrac{dy}{dx} = -\\dfrac{x}{y}\\); for \\(\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1\\), \\(\\dfrac{dy}{dx} = -\\dfrac{b^2 x}{a^2 y}\\).</li>' +
                '<li><strong>Tangent line at \\((x_0, y_0)\\):</strong> plug the point into \\(dy/dx\\) to get \\(m\\), then \\(y - y_0 = m(x - x_0)\\).</li>' +
                '<li><strong>Horizontal tangent:</strong> numerator of \\(dy/dx\\) is 0. <strong>Vertical tangent:</strong> denominator is 0.</li>' +
                '<li><strong>Second derivative:</strong> differentiate \\(dy/dx\\) again (quotient rule), then substitute the first-derivative formula back in and simplify using the original equation.</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> related rates applies implicit differentiation to equations where both \\(x\\) and \\(y\\) depend on a third variable (usually time \\(t\\)) - a ladder slides down a wall, a balloon inflates, a shadow lengthens.</p>'
        }
    ]
};
