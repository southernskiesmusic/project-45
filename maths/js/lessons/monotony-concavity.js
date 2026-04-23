/* ================================================================
   LESSON: Monotony and Concavity
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style structure.
   IB Math AA 5.8 / 5.11: first derivative (increasing / decreasing),
   stationary points, classification, second derivative, concavity,
   inflection points, sketching.
   ================================================================ */
const LESSON_MONOTONY = {
    id: 'monotony-concavity',
    title: 'Monotony and Concavity',
    subtitle: 'First and second derivative tests, stationary and inflection points',
    folder: 'calculus',
    screens: [
        // 1. Concept - What does the derivative tell us?
        {
            type: 'concept',
            title: 'What the Derivative Tells Us About Shape',
            content: '<p>In the last few topics the derivative \\(f\'(x)\\) was a <em>rate of change</em> - the slope of the tangent line. That same number secretly encodes the <strong>shape</strong> of the curve. Before any formulas, picture it.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Slope arrows:</strong> at any point on a graph, drop a tiny tangent arrow pointing along the curve.</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Arrow tilted <strong>up</strong> (positive slope): the curve is climbing. \\(f\'(x) > 0\\).</li>' +
                '<li>Arrow tilted <strong>down</strong> (negative slope): the curve is falling. \\(f\'(x) < 0\\).</li>' +
                '<li>Arrow <strong>flat</strong> (zero slope): the curve has paused. \\(f\'(x) = 0\\).</li>' +
                '</ul>' +
                '<p>So the <em>sign</em> of \\(f\'\\) tells you which direction the graph is heading at that instant.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>From one point to a whole interval:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>If \\(f\'(x) > 0\\) for <em>every</em> \\(x\\) in an interval, then \\(f\\) is <strong>increasing</strong> on that whole interval.</li>' +
                '<li>If \\(f\'(x) < 0\\) for every \\(x\\) in an interval, \\(f\\) is <strong>decreasing</strong> there.</li>' +
                '<li>If \\(f\'(x_0) = 0\\), the point \\(x_0\\) is a <strong>stationary point</strong> - the graph has momentarily levelled off.</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Big idea:</strong> instead of plotting a graph by hand, you can <em>read</em> it from the sign of \\(f\'(x)\\). That is what this whole topic is about.</p>'
        },

        // 2. Concept - Finding where f is increasing / decreasing
        {
            type: 'concept',
            title: 'Finding Increasing and Decreasing Intervals',
            content: '<p>To split the real line into "going up" pieces and "going down" pieces, follow a recipe you will use over and over.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The monotony recipe:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Differentiate to get \\(f\'(x)\\).</li>' +
                '<li>Solve \\(f\'(x) = 0\\). These roots are the <em>candidate boundary points</em>.</li>' +
                '<li>Put the roots on a number line. They chop the real line into open intervals.</li>' +
                '<li>Pick a test value from inside each interval and plug it into \\(f\'\\). Record the sign.</li>' +
                '<li>Sign \\(+\\) means \\(f\\) is increasing on that interval; sign \\(-\\) means decreasing.</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Mini-example:</strong> let \\(f\'(x) = (x - 1)(x - 4)\\). Roots at \\(x = 1\\) and \\(x = 4\\), so three intervals.</p>' +
                '<table style="margin:8px auto;border-collapse:collapse;font-family:monospace;">' +
                '<tr><th style="padding:4px 12px;border-bottom:1px solid #ccc;">Interval</th><th style="padding:4px 12px;border-bottom:1px solid #ccc;">test \\(x\\)</th><th style="padding:4px 12px;border-bottom:1px solid #ccc;">\\(f\'(x)\\)</th><th style="padding:4px 12px;border-bottom:1px solid #ccc;">Behaviour</th></tr>' +
                '<tr><td style="padding:2px 12px;">\\(x < 1\\)</td><td style="padding:2px 12px;">0</td><td style="padding:2px 12px;">\\((-1)(-4) = 4 > 0\\)</td><td style="padding:2px 12px;">increasing</td></tr>' +
                '<tr><td style="padding:2px 12px;">\\(1 < x < 4\\)</td><td style="padding:2px 12px;">2</td><td style="padding:2px 12px;">\\((1)(-2) = -2 < 0\\)</td><td style="padding:2px 12px;">decreasing</td></tr>' +
                '<tr><td style="padding:2px 12px;">\\(x > 4\\)</td><td style="padding:2px 12px;">5</td><td style="padding:2px 12px;">\\((4)(1) = 4 > 0\\)</td><td style="padding:2px 12px;">increasing</td></tr>' +
                '</table>' +
                '<p>Reading off: \\(f\\) is increasing on \\((-\\infty, 1)\\) and \\((4, \\infty)\\); decreasing on \\((1, 4)\\).</p>' +
                '</div>' +
                '<p><strong>Exam tip:</strong> interval notation matters. Write open intervals like \\((-\\infty, 1)\\) or unions like \\((-\\infty, 1) \\cup (4, \\infty)\\) - not inequalities in words.</p>'
        },

        // 3. Example - Is f increasing or decreasing at a point?
        {
            type: 'example',
            title: 'Is f Increasing at this Point?',
            problem: 'For \\(f(x) = x^2 - 6x + 1\\), determine whether \\(f\\) is increasing, decreasing, or stationary at \\(x = 5\\).',
            steps: [
                { text: '<strong>Step 1 - differentiate:</strong> \\(f\'(x) = 2x - 6\\).' },
                { text: '<strong>Step 2 - plug in the point:</strong> \\(f\'(5) = 2(5) - 6 = 4\\).' },
                { text: '<strong>Step 3 - check the sign:</strong> \\(4 > 0\\).' },
                { text: '<strong>Step 4 - interpret:</strong> a positive derivative means a positive slope, so the graph is heading up.' },
                { text: '<strong>Answer:</strong> \\(f\\) is <strong>increasing</strong> at \\(x = 5\\). \\(\\checkmark\\)' }
            ]
        },

        // 4. Practice - f'(p) value
        {
            type: 'practice',
            intro: 'Compute the derivative value at the given point:',
            generate: () => MONOTONY.qFPrimeValue()
        },

        // 5. Practice - increasing / decreasing / stationary classification
        {
            type: 'practice',
            intro: 'Classify the behaviour of \\(f\\) at the given point:',
            generate: () => MONOTONY.qIncreasingAt()
        },

        // 6. Concept - Stationary points
        {
            type: 'concept',
            title: 'Stationary Points',
            content: '<p>Points where \\(f\'(x) = 0\\) are special. The tangent line there is horizontal - the graph has stopped climbing or falling, if only for a moment. We call these <strong>stationary points</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Three flavours of stationary point:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li><strong>Local maximum:</strong> graph goes up, levels off, then comes back down. Think of the top of a hill.</li>' +
                '<li><strong>Local minimum:</strong> graph goes down, levels off, then turns back up. The bottom of a valley.</li>' +
                '<li><strong>Horizontal inflection (saddle):</strong> graph levels off, but keeps going the same direction. Like the pause in the middle of \\(y = x^3\\) at \\(x = 0\\).</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why "local"?</strong> A local maximum is the biggest value of \\(f\\) <em>nearby</em>, not globally. A function might have several local maxima and still rocket up to \\(+\\infty\\) elsewhere. Same idea for local minima.</p>' +
                '</div>' +
                '<p>To <em>find</em> the stationary points: solve \\(f\'(x) = 0\\). To <em>classify</em> them (max, min, or saddle): we need extra information. That is what the next two screens are about.</p>'
        },

        // 7. Practice - find the positive stationary x
        {
            type: 'practice',
            intro: 'Find the positive stationary point of the cubic:',
            generate: () => MONOTONY.qStationaryX()
        },

        // 8. Concept - First derivative test
        {
            type: 'concept',
            title: 'Classifying: The First Derivative Test',
            content: '<p>Picture a stationary point. If the graph was climbing just before it and falling just after, you are at the top of a hill - a local maximum. The key is the <strong>sign change of \\(f\'\\)</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The first derivative test:</strong> given \\(f\'(x_0) = 0\\), look at the sign of \\(f\'\\) on both sides of \\(x_0\\):</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(+\\) then \\(-\\) (positive to negative): <strong>local maximum</strong> at \\(x_0\\).</li>' +
                '<li>\\(-\\) then \\(+\\) (negative to positive): <strong>local minimum</strong> at \\(x_0\\).</li>' +
                '<li>Same sign on both sides (no change): <strong>horizontal inflection</strong>, not a max or min.</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>How to apply it - sign table:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Solve \\(f\'(x) = 0\\). Mark each root on a number line.</li>' +
                '<li>Pick one test point in each interval and record the sign of \\(f\'\\) there.</li>' +
                '<li>Read off the pattern around each stationary point.</li>' +
                '</ol>' +
                '<p>A sign table is bulletproof because it also tells you the increasing / decreasing intervals at the same time. Two problems solved for the price of one.</p>' +
                '</div>' +
                '<p><strong>When to use this test:</strong> always works. Even if \\(f\'\'\\) is messy, zero, or undefined, the sign of \\(f\'\\) itself is usually easy to check.</p>'
        },

        // 9. Concept - Second derivative and concavity
        {
            type: 'concept',
            title: 'The Second Derivative and Concavity',
            content: '<p>Differentiate \\(f\'\\) again and you get \\(f\'\'(x)\\), the <strong>second derivative</strong>. If \\(f\'\\) is the slope, then \\(f\'\'\\) is the <em>rate at which the slope itself is changing</em>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Concavity - the bending direction:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(f\'\'(x) > 0\\) on an interval: the slope is <em>increasing</em>, so the graph is bending upward. We say \\(f\\) is <strong>concave up</strong> there. Shape \\(\\cup\\) (smile / bowl holding water).</li>' +
                '<li>\\(f\'\'(x) < 0\\) on an interval: the slope is <em>decreasing</em>, so the graph is bending downward. \\(f\\) is <strong>concave down</strong>. Shape \\(\\cap\\) (frown / upside-down bowl).</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Memorable pictures:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(y = x^2\\): \\(f\'\'(x) = 2 > 0\\) everywhere. Concave up everywhere. Classic smile.</li>' +
                '<li>\\(y = -x^2\\): \\(f\'\'(x) = -2 < 0\\). Concave down everywhere. Classic frown.</li>' +
                '<li>\\(y = x^3\\): \\(f\'\'(x) = 6x\\). Negative for \\(x < 0\\), positive for \\(x > 0\\). Concave down then concave up - the curve <em>switches</em> at the origin.</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Heads up:</strong> concavity is <em>independent</em> of whether \\(f\\) is increasing or decreasing. A graph can be decreasing and concave up at the same time (think of the left half of \\(y = x^2\\)).</p>'
        },

        // 10. Practice - f''(p) value
        {
            type: 'practice',
            intro: 'Compute the second derivative value at the given point:',
            generate: () => MONOTONY.qSecondDerivValue()
        },

        // 11. Practice - concave up or concave down at a point
        {
            type: 'practice',
            intro: 'Determine the concavity at the given point:',
            generate: () => MONOTONY.qConcavityAt()
        },

        // 12. Concept - Second derivative test
        {
            type: 'concept',
            title: 'Classifying: The Second Derivative Test',
            content: '<p>Here is a slicker classification trick. If you already have \\(f\'\'\\) handy, you can skip the sign table.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The second derivative test:</strong> suppose \\(f\'(x_0) = 0\\). Then:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(f\'\'(x_0) < 0\\): the graph is concave down at \\(x_0\\) - a frown with a flat top. <strong>Local maximum</strong>.</li>' +
                '<li>\\(f\'\'(x_0) > 0\\): concave up - a smile with a flat bottom. <strong>Local minimum</strong>.</li>' +
                '<li>\\(f\'\'(x_0) = 0\\): the test is <strong>inconclusive</strong>. Fall back to the first derivative (sign change) test.</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Which test should I use?</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li><strong>Second derivative test</strong>: fastest when \\(f\'\'\\) is easy to compute and not zero at \\(x_0\\). Preferred for polynomials, exponentials, sines.</li>' +
                '<li><strong>First derivative test</strong>: use when \\(f\'\'\\) is hard, or when \\(f\'\'(x_0) = 0\\), or when you already have a sign table for increasing / decreasing. Always works.</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>IB exam convention:</strong> either test earns full marks. Show which one you are using and state the sign clearly.</p>'
        },

        // 13. Example - Classify stationary points of a cubic
        {
            type: 'example',
            title: 'Classify the Stationary Points of a Cubic',
            problem: 'Find and classify the stationary points of \\(f(x) = x^3 - 6x^2 + 9x + 2\\).',
            steps: [
                { text: '<strong>Step 1 - differentiate:</strong> \\(f\'(x) = 3x^2 - 12x + 9\\).' },
                { text: '<strong>Step 2 - solve \\(f\'(x) = 0\\):</strong> factor \\(3(x^2 - 4x + 3) = 3(x - 1)(x - 3) = 0\\), so \\(x = 1\\) or \\(x = 3\\).' },
                { text: '<strong>Step 3 - get \\(f\'\'\\):</strong> differentiate again, \\(f\'\'(x) = 6x - 12\\).' },
                { text: '<strong>Step 4 - classify \\(x = 1\\):</strong> \\(f\'\'(1) = 6 - 12 = -6 < 0\\). Concave down, so <strong>local maximum</strong> at \\(x = 1\\). Value: \\(f(1) = 1 - 6 + 9 + 2 = 6\\).' },
                { text: '<strong>Step 5 - classify \\(x = 3\\):</strong> \\(f\'\'(3) = 18 - 12 = 6 > 0\\). Concave up, so <strong>local minimum</strong> at \\(x = 3\\). Value: \\(f(3) = 27 - 54 + 27 + 2 = 2\\).' },
                { text: '<strong>Answer:</strong> local max at \\((1, 6)\\), local min at \\((3, 2)\\). \\(\\checkmark\\)' }
            ]
        },

        // 14. Practice - classify stationary points (nature)
        {
            type: 'practice',
            intro: 'Classify the stationary point as max, min, or inflection:',
            generate: () => MONOTONY.qNatureStationary()
        },

        // 15. Practice - local max y-value
        {
            type: 'practice',
            intro: 'Find the y-value of the local maximum:',
            generate: () => MONOTONY.qLocalMaxY()
        },

        // 16. Concept - Inflection points
        {
            type: 'concept',
            title: 'Inflection Points',
            content: '<p>An <strong>inflection point</strong> is where a curve changes its bending direction - concave up becomes concave down, or vice versa. Imagine driving on a road that curves left and then suddenly curves right: the switch moment is an inflection point.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Precise definition:</strong> \\(x_0\\) is an inflection point of \\(f\\) if:</p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(f\'\'(x_0) = 0\\) (or \\(f\'\'\\) is undefined there), <em>and</em></li>' +
                '<li>\\(f\'\'\\) <strong>changes sign</strong> at \\(x_0\\) (concavity actually flips).</li>' +
                '</ol>' +
                '<p>Both conditions are required. Just having \\(f\'\'(x_0) = 0\\) is not enough.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Counter-example:</strong> \\(f(x) = x^4\\). Then \\(f\'\'(x) = 12x^2\\), so \\(f\'\'(0) = 0\\). But \\(12x^2 \\geq 0\\) everywhere - the sign never changes. So \\(x = 0\\) is <em>not</em> an inflection point of \\(x^4\\) (it is a local minimum instead).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Procedure to find inflection points:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Compute \\(f\'\'(x)\\).</li>' +
                '<li>Solve \\(f\'\'(x) = 0\\).</li>' +
                '<li>Build a sign table for \\(f\'\'\\). Every place the sign flips is an inflection point.</li>' +
                '<li>Plug each such \\(x\\) back into \\(f\\) to get the \\(y\\)-coordinate.</li>' +
                '</ol>' +
                '</div>'
        },

        // 17. Example - Finding an inflection point
        {
            type: 'example',
            title: 'Find the Inflection Point',
            problem: 'Find the inflection point of \\(f(x) = x^3 - 3x^2 + 4\\).',
            steps: [
                { text: '<strong>Step 1 - first derivative:</strong> \\(f\'(x) = 3x^2 - 6x\\).' },
                { text: '<strong>Step 2 - second derivative:</strong> \\(f\'\'(x) = 6x - 6\\).' },
                { text: '<strong>Step 3 - solve \\(f\'\'(x) = 0\\):</strong> \\(6x - 6 = 0 \\Rightarrow x = 1\\). Candidate inflection at \\(x = 1\\).' },
                { text: '<strong>Step 4 - check the sign change:</strong> \\(f\'\'(0) = -6 < 0\\) (concave down on the left); \\(f\'\'(2) = 6 > 0\\) (concave up on the right). Sign flips, so \\(x = 1\\) is genuinely an inflection point.' },
                { text: '<strong>Step 5 - get the y-coordinate:</strong> \\(f(1) = 1 - 3 + 4 = 2\\).' },
                { text: '<strong>Answer:</strong> inflection point at \\((1, 2)\\). The curve is concave down for \\(x < 1\\) and concave up for \\(x > 1\\). \\(\\checkmark\\)' }
            ]
        },

        // 18. Practice - find inflection x
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the inflection point:',
            generate: () => MONOTONY.qInflectionX()
        },

        // 19. Simulation - Calculus Grapher (f, f', f'' together)
        {
            type: 'simulation',
            title: 'Explore: f, f prime, and f double-prime Together',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'This sim is unique because it shows \\(f\\), \\(f\'\\), and \\(f\'\'\\) stacked on the same screen. Drag the top curve around and watch the derivative graphs update live. There is no better way to burn the relationships into your brain.',
            tasks: [
                'Drag the top curve to make a simple hill shape (one local maximum). Watch f prime - what sign is it to the left of the peak? To the right? What happens at the peak itself? Connect this back to the first derivative test.',
                'Make a curve with two turning points, a local min and a local max. Find each stationary point in the f prime graph (f prime = 0). Now look at the f double-prime graph at those same x-values. What sign is it at the max? At the min? You have just seen the second derivative test in action.',
                'Draw an S-shaped curve (like a cubic). Locate the point where the curve changes from concave down to concave up - the inflection point. What is happening in the f double-prime graph at that x-value? Explain in one sentence why f double-prime crosses zero exactly there.'
            ]
        },

        // 20. Concept - Curve sketching checklist
        {
            type: 'concept',
            title: 'Putting It Together: Sketching a Curve',
            content: '<p>Everything in this topic comes together in one task: sketching \\(y = f(x)\\) without a calculator. Here is a checklist that will not let you down.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The full curve-sketching checklist:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li><strong>Intercepts:</strong> set \\(x = 0\\) for the y-intercept, solve \\(f(x) = 0\\) for x-intercepts (if feasible).</li>' +
                '<li><strong>Stationary points:</strong> solve \\(f\'(x) = 0\\).</li>' +
                '<li><strong>Classify</strong> each stationary point using the second derivative test (or first-derivative sign change).</li>' +
                '<li><strong>Inflection points:</strong> solve \\(f\'\'(x) = 0\\), check sign change.</li>' +
                '<li><strong>End behaviour:</strong> what does \\(f\\) do as \\(x \\to \\pm\\infty\\)? For a polynomial, read off the leading term.</li>' +
                '<li><strong>Plot</strong> all special points (intercepts, local max, local min, inflection) and connect with the correct concavity.</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>A clean sketch shows:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Labelled axes.</li>' +
                '<li>Coordinates written at each stationary and inflection point, e.g. "local max \\((1, 6)\\)".</li>' +
                '<li>The correct shape in each interval (up / down, concave up / down).</li>' +
                '<li>Arrows or dashed lines showing asymptotic behaviour if relevant.</li>' +
                '</ul>' +
                '</div>'
        },

        // 21. Practice - increasing interval (hard)
        {
            type: 'practice',
            intro: 'Find the intervals on which \\(f\\) is increasing:',
            generate: () => MONOTONY.qIncreasingInterval()
        },

        // 22. Practice - always increasing (parameter)
        {
            type: 'practice',
            intro: 'Find the values of \\(k\\) for which \\(f\\) is always increasing:',
            generate: () => MONOTONY.qAlwaysIncreasing()
        },

        // 23. Concept - Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>These mistakes show up year after year on IB papers. Read them once now and save yourself several marks.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: saying "\\(f\'\'(x_0) = 0\\) means inflection point".</strong></p>' +
                '<p>Not enough! You also need \\(f\'\'\\) to <em>change sign</em> at \\(x_0\\). For \\(f(x) = x^4\\), \\(f\'\'(0) = 0\\) but concavity does not flip - it is a local min, not an inflection.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: confusing "stationary" with "local max / min".</strong></p>' +
                '<p>Every local max or min <em>is</em> a stationary point, but not every stationary point is a max or min. Horizontal inflection points (e.g. \\(x = 0\\) on \\(y = x^3\\)) are stationary yet neither max nor min.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: using the second derivative test when \\(f\'\'(x_0) = 0\\).</strong></p>' +
                '<p>The test is <em>inconclusive</em> in that case. Do not declare "neither" or "saddle point" automatically. Fall back to the first derivative sign-change test to decide.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: mixing up "increasing" and "concave up".</strong></p>' +
                '<p>Increasing is about \\(f\'\\) (slope); concave up is about \\(f\'\'\\) (bending). A function can be increasing and concave down (top half of \\(y = \\sqrt{x}\\)) or decreasing and concave up (left half of \\(y = x^2\\)). Keep the two ideas separate.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: forgetting to give the y-coordinate.</strong></p>' +
                '<p>If the question asks for the "local maximum point", a bare \\(x\\)-value is not enough - give \\((x, y)\\). Plug your \\(x\\) back into \\(f\\) (not \\(f\'\\) or \\(f\'\'\\)) to get \\(y\\).</p>' +
                '</div>'
        },

        // 24. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>Sign of \\(f\'\\):</strong> \\(f\'(x) > 0\\) on an interval means \\(f\\) is increasing there; \\(f\'(x) < 0\\) means decreasing.</li>' +
                '<li><strong>Stationary points</strong> are solutions of \\(f\'(x) = 0\\). They come in three flavours: local max, local min, horizontal inflection.</li>' +
                '<li><strong>First derivative test:</strong> sign of \\(f\'\\) changes \\(+\\) to \\(-\\) at \\(x_0\\) = local max; \\(-\\) to \\(+\\) = local min; no change = horizontal inflection.</li>' +
                '<li><strong>Sign of \\(f\'\'\\):</strong> \\(f\'\'(x) > 0\\) means concave up (\\(\\cup\\)); \\(f\'\'(x) < 0\\) means concave down (\\(\\cap\\)).</li>' +
                '<li><strong>Second derivative test:</strong> at a stationary point \\(x_0\\), \\(f\'\'(x_0) < 0\\) = local max; \\(f\'\'(x_0) > 0\\) = local min; \\(f\'\'(x_0) = 0\\) = inconclusive.</li>' +
                '<li><strong>Inflection point:</strong> \\(f\'\'(x_0) = 0\\) <em>and</em> \\(f\'\'\\) changes sign at \\(x_0\\).</li>' +
                '<li><strong>Which test when?</strong> Second derivative = fastest; first derivative = bulletproof and also hands you the monotony intervals for free.</li>' +
                '<li><strong>Sketching checklist:</strong> intercepts, stationary points, classify, inflection points, end behaviour, then draw.</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> we apply all of this to <em>optimisation</em> - real-world problems where you want to maximise area, minimise cost, or find the best something-or-other. The new skill there is translating a word problem into \\(f(x)\\) in the first place; once you have that, this lesson does all the heavy lifting.</p>'
        }
    ]
};
