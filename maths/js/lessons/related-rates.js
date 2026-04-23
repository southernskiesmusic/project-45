/* ================================================================
   LESSON: Related Rates
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style structure.
   IB AA HL 5.15
   ================================================================ */
const LESSON_REL_RATES = {
    id: 'related-rates',
    title: 'Related Rates',
    subtitle: 'Connected rates of change via the chain rule',
    folder: 'calculus',
    screens: [
        // 1. Concept - Lead with a real scenario
        {
            type: 'concept',
            title: 'The Balloon Problem',
            content: '<p>Imagine you are pumping air into a spherical balloon. Every second, its <strong>radius</strong> grows a little. But the balloon is not just getting wider - it is getting bigger in volume too. Air rushes in faster than you might expect.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The question:</strong> if the radius grows at \\(1\\) cm s\\(^{-1}\\), how fast is the <em>volume</em> growing when \\(r = 10\\) cm?</p>' +
                '<p>Your gut might say "also \\(1\\) something per second." But that is wrong - by a lot. The answer turns out to be \\(400\\pi \\approx 1257\\) cm\\(^3\\) s\\(^{-1}\\). A single slow cm of radius per second pumps in over a litre of air every second at that size.</p>' +
                '<p>Why such a huge number? Because volume depends on \\(r^3\\). The bigger the balloon, the more "skin" there is to inflate for each extra cm of radius.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Two rates are talking to each other:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{dr}{dt}\\) - the rate the radius changes.</li>' +
                '<li>\\(\\dfrac{dV}{dt}\\) - the rate the volume changes.</li>' +
                '</ul>' +
                '<p>These are <strong>related rates</strong>: one depends on the other. The job of this lesson is to find a clean way to link them.</p>' +
                '</div>' +
                '<p><strong>Key idea:</strong> if two quantities are tied by an equation (like \\(V = \\tfrac{4}{3}\\pi r^3\\)), then their rates of change are also tied - by the chain rule.</p>'
        },

        // 2. Concept - The chain rule link
        {
            type: 'concept',
            title: 'The Chain Rule Link',
            content: '<p>You already know the chain rule for composite functions. The <em>same</em> chain rule is what connects related rates.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The core formula:</strong></p>' +
                '<p style="text-align:center;font-size:1.25em;">\\(\\dfrac{dA}{dt} = \\dfrac{dA}{dr} \\cdot \\dfrac{dr}{dt}\\)</p>' +
                '<p>Read it as: "the rate at which \\(A\\) changes with time equals the rate at which \\(A\\) changes with \\(r\\), times the rate at which \\(r\\) changes with time."</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why does this work?</strong></p>' +
                '<p>If \\(A\\) depends on \\(r\\), and \\(r\\) depends on \\(t\\), then \\(A\\) depends on \\(t\\) <em>through</em> \\(r\\). The chain rule says: to differentiate \\(A(r(t))\\) with respect to \\(t\\), multiply the "inner" rate \\(dr/dt\\) by the "outer" rate \\(dA/dr\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Applied to the circle:</strong> \\(A = \\pi r^2\\).</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{dA}{dr} = 2\\pi r\\) (standard derivative).</li>' +
                '<li>\\(\\dfrac{dr}{dt}\\) is given in the problem.</li>' +
                '<li>\\(\\dfrac{dA}{dt} = 2\\pi r \\cdot \\dfrac{dr}{dt}\\). Done.</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Notice:</strong> the answer depends on the <em>current value</em> of \\(r\\). Rates of change in related-rates problems are usually not constant - they vary with time.</p>'
        },

        // 3. Example - Linear rate (warm-up)
        {
            type: 'example',
            title: 'Warm-up: A Linear Relation',
            problem: 'Given \\(y = 3x + 2\\) and \\(\\dfrac{dx}{dt} = 4\\), find \\(\\dfrac{dy}{dt}\\).',
            steps: [
                { text: '<strong>Step 1 - differentiate \\(y\\) with respect to \\(x\\):</strong> \\(\\dfrac{dy}{dx} = 3\\).' },
                { text: '<strong>Step 2 - apply the chain rule:</strong> \\(\\dfrac{dy}{dt} = \\dfrac{dy}{dx} \\cdot \\dfrac{dx}{dt}\\).' },
                { text: '<strong>Step 3 - substitute:</strong> \\(\\dfrac{dy}{dt} = 3 \\times 4 = 12\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{dy}{dt} = 12\\). \\(\\checkmark\\)' },
                { text: '<strong>Why is this simple?</strong> For a linear function, \\(dy/dx\\) is a constant. The rate does not depend on where you are on the line - unusual for related rates problems.' }
            ]
        },

        // 4. Practice - Linear rate
        {
            type: 'practice',
            intro: 'Find \\(dy/dt\\) for the linear relation:',
            generate: () => REL_RATES.qLinearRate()
        },

        // 5. Concept - The 4-step method
        {
            type: 'concept',
            title: 'The 4-Step Method',
            content: '<p>Every related-rates problem - no matter how complicated it sounds - follows the same four steps. Memorise this list; it is your exam checklist.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 1: Draw and label.</strong></p>' +
                '<p>Sketch the scenario. Label the quantities that <em>change</em> with letters (\\(x\\), \\(y\\), \\(r\\), \\(h\\), etc.), and the quantities that are <em>fixed</em> with numbers. Write down what you know and what you want.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 2: Relate the variables.</strong></p>' +
                '<p>Find an equation that ties the changing quantities together. This is usually a geometry formula: area, volume, Pythagoras, similar triangles, trig.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 3: Differentiate both sides with respect to \\(t\\).</strong></p>' +
                '<p>This is the crucial step. Every variable that depends on time picks up a rate. Use the chain rule on each term.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 4: Substitute and solve.</strong></p>' +
                '<p>Plug in the known values <em>after</em> differentiating - never before. Then solve algebraically for the unknown rate.</p>' +
                '</div>' +
                '<p><strong>Critical warning:</strong> do not substitute numbers for changing variables until <em>after</em> you differentiate. If you plug \\(r = 10\\) into \\(V = \\tfrac{4}{3}\\pi r^3\\) first, you get a constant \\(V\\), and differentiating a constant gives zero. Keep variables symbolic through the differentiation step.</p>'
        },

        // 6. Example - Circle area (apply the 4 steps)
        {
            type: 'example',
            title: 'Expanding Puddle',
            problem: 'A circular puddle\'s radius grows at \\(2\\) cm s\\(^{-1}\\). How fast is its area growing when \\(r = 5\\) cm?',
            steps: [
                { text: '<strong>Step 1 - draw and label:</strong> a circle with radius \\(r\\) (changing) and area \\(A\\) (changing). Given: \\(\\dfrac{dr}{dt} = 2\\). Want: \\(\\dfrac{dA}{dt}\\) when \\(r = 5\\).' },
                { text: '<strong>Step 2 - relate the variables:</strong> \\(A = \\pi r^2\\).' },
                { text: '<strong>Step 3 - differentiate both sides with respect to \\(t\\):</strong><br>\\(\\dfrac{d}{dt}(A) = \\dfrac{d}{dt}(\\pi r^2)\\)<br>\\(\\dfrac{dA}{dt} = 2\\pi r \\cdot \\dfrac{dr}{dt}\\).' },
                { text: '<strong>Step 4 - substitute \\(r = 5\\), \\(\\dfrac{dr}{dt} = 2\\):</strong><br>\\(\\dfrac{dA}{dt} = 2\\pi \\times 5 \\times 2 = 20\\pi\\) cm\\(^2\\) s\\(^{-1}\\).' },
                { text: '<strong>Answer:</strong> the area grows at \\(20\\pi \\approx 62.8\\) cm\\(^2\\) s\\(^{-1}\\). \\(\\checkmark\\)' },
                { text: '<strong>Sanity check:</strong> at \\(r = 5\\), the circle has perimeter \\(10\\pi\\). Each second it gains \\(2\\) cm of radius, so the area grows roughly by <em>perimeter times radius change</em> = \\(10\\pi \\times 2 = 20\\pi\\). Matches!' }
            ]
        },

        // 7. Practice - Circle area
        {
            type: 'practice',
            intro: 'Find the rate at which the area grows:',
            generate: () => REL_RATES.qCircleArea()
        },

        // 8. Practice - Circumference
        {
            type: 'practice',
            intro: 'Find the rate at which the circumference grows:',
            generate: () => REL_RATES.qCircleCircumference()
        },

        // 9. Practice - Square area
        {
            type: 'practice',
            intro: 'Find \\(dA/dt\\) for the expanding square:',
            generate: () => REL_RATES.qSquareArea()
        },

        // 10. Concept - 3D: volume of a sphere
        {
            type: 'concept',
            title: 'Volumes and 3D Problems',
            content: '<p>The exact same method works for 3D shapes - just use a volume formula in Step 2.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Sphere:</strong> \\(V = \\tfrac{4}{3}\\pi r^3\\).</p>' +
                '<p>Differentiate with respect to \\(t\\) (treat \\(r\\) as \\(r(t)\\) and use the chain rule):</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\dfrac{dV}{dt} = 4\\pi r^2 \\cdot \\dfrac{dr}{dt}\\)</p>' +
                '<p>Nice hidden fact: \\(4\\pi r^2\\) is the <em>surface area</em> of the sphere. So the rate of volume increase equals surface area times rate of radius increase. Intuitively: you are painting on a new thin shell each instant.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Cylinder with fixed radius:</strong> \\(V = \\pi r^2 h\\) with \\(r\\) constant.</p>' +
                '<p>Since \\(r\\) does not change, treat \\(\\pi r^2\\) as a constant. Differentiate:</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\dfrac{dV}{dt} = \\pi r^2 \\cdot \\dfrac{dh}{dt}\\)</p>' +
                '<p>Again the coefficient (\\(\\pi r^2\\)) is the cross-section area. Makes sense: each extra cm of water depth adds one cross-section worth of volume.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Both variables change?</strong> For a cylinder where both \\(r\\) and \\(h\\) change, you would use the product rule:</p>' +
                '<p style="text-align:center;">\\(\\dfrac{dV}{dt} = 2\\pi r h \\cdot \\dfrac{dr}{dt} + \\pi r^2 \\cdot \\dfrac{dh}{dt}\\)</p>' +
                '<p>But most exam problems hold one variable fixed to keep the algebra clean.</p>' +
                '</div>'
        },

        // 11. Example - Sphere volume
        {
            type: 'example',
            title: 'The Balloon, Solved',
            problem: 'A spherical balloon has radius growing at \\(1\\) cm s\\(^{-1}\\). Find \\(dV/dt\\) when \\(r = 10\\) cm.',
            steps: [
                { text: '<strong>Step 1 - label:</strong> \\(r\\) is changing, \\(V\\) is changing. Given \\(\\dfrac{dr}{dt} = 1\\). Want \\(\\dfrac{dV}{dt}\\) when \\(r = 10\\).' },
                { text: '<strong>Step 2 - relate:</strong> \\(V = \\tfrac{4}{3}\\pi r^3\\).' },
                { text: '<strong>Step 3 - differentiate with respect to \\(t\\):</strong><br>\\(\\dfrac{dV}{dt} = 4\\pi r^2 \\cdot \\dfrac{dr}{dt}\\).' },
                { text: '<strong>Step 4 - substitute \\(r = 10\\), \\(\\dfrac{dr}{dt} = 1\\):</strong><br>\\(\\dfrac{dV}{dt} = 4\\pi \\times 100 \\times 1 = 400\\pi\\) cm\\(^3\\) s\\(^{-1}\\).' },
                { text: '<strong>Answer:</strong> \\(400\\pi \\approx 1257\\) cm\\(^3\\) s\\(^{-1}\\). Matches the gut-check from Screen 1. \\(\\checkmark\\)' },
                { text: '<strong>Worth noticing:</strong> if you double the balloon\'s radius, the rate of volume increase <em>quadruples</em>. At \\(r = 20\\) it would be \\(1600\\pi\\) cm\\(^3\\) s\\(^{-1}\\) for the same \\(dr/dt\\).' }
            ]
        },

        // 12. Practice - Sphere volume
        {
            type: 'practice',
            intro: 'Find the rate of volume increase of the sphere:',
            generate: () => REL_RATES.qVolumeOfSphere()
        },

        // 13. Practice - Cylinder (water rising)
        {
            type: 'practice',
            intro: 'Find dV/dt as the water level rises in the cylinder:',
            generate: () => REL_RATES.qVolumeOfCylinder()
        },

        // 14. Practice - Triangle area
        {
            type: 'practice',
            intro: 'Find dA/dt for the triangle with fixed height:',
            generate: () => REL_RATES.qTriangleBase()
        },

        // 15. Simulation - PhET calculus grapher
        {
            type: 'simulation',
            title: 'Explore: Rates of Change',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'Use this sim to build intuition for how a rate of change connects to the shape of a function. Draw a function on the top graph; the sim will show its derivative (= instantaneous rate of change) on the middle graph. Watch how steep slopes produce big rates and flat slopes produce small rates.',
            tasks: [
                'Draw a smoothly increasing function on the top graph. Look at the derivative graph: where is it positive? What does "positive rate of change" mean in a related-rates problem? (Hint: the quantity is growing.)',
                'Make the top function rise sharply in one region and flatten in another. Predict what the derivative graph will look like before you check. Sharper rise = bigger _____ .',
                'If a balloon\'s radius follows the shape you drew on the top graph (treating the horizontal axis as time), when is \\(dr/dt\\) at its maximum? At that moment, is \\(dV/dt\\) also at its maximum, or does it depend on \\(r\\) too? Explain.'
            ]
        },

        // 16. Concept - Pythagoras for sliding ladder
        {
            type: 'concept',
            title: 'Pythagorean Related Rates',
            content: '<p>A classic exam scenario: a ladder of length \\(L\\) leans against a wall. The base slides away, and the top slides down. Two lengths are changing, but they are tied by Pythagoras.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Setup:</strong> let \\(x\\) = distance from wall to base of ladder, \\(y\\) = height of top of ladder, \\(L\\) = ladder length (constant).</p>' +
                '<p>By Pythagoras: \\(x^2 + y^2 = L^2\\).</p>' +
                '<p>Both \\(x\\) and \\(y\\) change with time, but \\(L\\) is fixed (the ladder does not stretch).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Differentiate both sides with respect to \\(t\\):</strong></p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(2x \\dfrac{dx}{dt} + 2y \\dfrac{dy}{dt} = 0\\)</p>' +
                '<p>(\\(L^2\\) is constant, so its derivative is zero.)</p>' +
                '<p>Solving for \\(\\dfrac{dy}{dt}\\):</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\dfrac{dy}{dt} = -\\dfrac{x}{y} \\cdot \\dfrac{dx}{dt}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Two key observations:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>The <strong>negative sign</strong> is not a mistake - if the base slides away (\\(dx/dt > 0\\)), the top slides <em>down</em> (\\(dy/dt < 0\\)).</li>' +
                '<li>The ratio \\(x/y\\) tells you: the ladder slides down <em>faster</em> when \\(x\\) is large (ladder nearly flat). Near the ground, \\(y \\to 0\\) and \\(dy/dt \\to -\\infty\\) - unphysical, but the model breaks down when the ladder nearly lies flat.</li>' +
                '</ul>' +
                '</div>'
        },

        // 17. Example - Sliding ladder
        {
            type: 'example',
            title: 'Sliding Ladder',
            problem: 'A \\(5\\) m ladder leans against a wall. The base slides away at \\(2\\) m s\\(^{-1}\\). How fast is the top sliding down when the base is \\(3\\) m from the wall?',
            steps: [
                { text: '<strong>Step 1 - draw and label:</strong> right triangle with horizontal \\(x\\), vertical \\(y\\), hypotenuse \\(5\\). Given \\(\\dfrac{dx}{dt} = 2\\). Want \\(\\dfrac{dy}{dt}\\) when \\(x = 3\\).' },
                { text: '<strong>Step 2 - relate:</strong> \\(x^2 + y^2 = 25\\).' },
                { text: '<strong>Step 3 - differentiate with respect to \\(t\\):</strong><br>\\(2x \\dfrac{dx}{dt} + 2y \\dfrac{dy}{dt} = 0\\)<br>\\(\\dfrac{dy}{dt} = -\\dfrac{x}{y} \\cdot \\dfrac{dx}{dt}\\).' },
                { text: '<strong>Step 4a - find \\(y\\) at this instant:</strong> from \\(x^2 + y^2 = 25\\) with \\(x = 3\\): \\(y^2 = 25 - 9 = 16\\), so \\(y = 4\\).' },
                { text: '<strong>Step 4b - substitute \\(x = 3\\), \\(y = 4\\), \\(\\dfrac{dx}{dt} = 2\\):</strong><br>\\(\\dfrac{dy}{dt} = -\\dfrac{3}{4} \\times 2 = -\\dfrac{3}{2}\\) m s\\(^{-1}\\).' },
                { text: '<strong>Answer:</strong> the top slides <em>down</em> at \\(1.5\\) m s\\(^{-1}\\). The negative sign tells you the direction. \\(\\checkmark\\)' }
            ]
        },

        // 18. Practice - Sliding ladder
        {
            type: 'practice',
            intro: 'Find dy/dt for the sliding ladder:',
            generate: () => REL_RATES.qPythagorean()
        },

        // 19. Practice - Chain rule on a power function
        {
            type: 'practice',
            intro: 'Apply the chain rule to find dy/dt:',
            generate: () => REL_RATES.qChainRule()
        },

        // 20. Practice - Inverse proportion
        {
            type: 'practice',
            intro: 'Find dy/dt for the inverse-proportion relation:',
            generate: () => REL_RATES.qInverseProportion()
        },

        // 21. Concept - Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>These mistakes cost marks every year. Read carefully.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: Substituting numbers too early.</strong></p>' +
                '<p>If you plug \\(r = 5\\) into \\(A = \\pi r^2\\) <em>before</em> differentiating, you get \\(A = 25\\pi\\), a constant, and \\(dA/dt = 0\\). Wrong. Always keep variables symbolic through Step 3.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: Forgetting \\(dr/dt\\) when differentiating.</strong></p>' +
                '<p>When you differentiate \\(r^2\\) <em>with respect to \\(t\\)</em>, the answer is \\(2r \\cdot \\dfrac{dr}{dt}\\), not just \\(2r\\). The chain rule is non-negotiable because \\(r\\) depends on \\(t\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: Ignoring the sign.</strong></p>' +
                '<p>A quantity that <em>decreases</em> has a <em>negative</em> rate. Water draining out of a tank: \\(dV/dt < 0\\). Ladder top falling: \\(dy/dt < 0\\). If your answer has the wrong sign, your setup is wrong.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: Missing a variable.</strong></p>' +
                '<p>In Pythagoras problems you often need to <em>find</em> a missing length (like \\(y = 4\\) from \\(x = 3\\), \\(L = 5\\)) before substituting. Do not assume you have every value - check.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: Dropping units.</strong></p>' +
                '<p>A rate has units. \\(dA/dt\\) is in (area units) / (time units), e.g. cm\\(^2\\) s\\(^{-1}\\). The IB awards a mark for correct units on "find the rate" problems.</p>' +
                '</div>'
        },

        // 22. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>Related rates connect two quantities</strong> that change with time via an equation.</li>' +
                '<li><strong>The chain rule is the link:</strong> \\(\\dfrac{dA}{dt} = \\dfrac{dA}{dr} \\cdot \\dfrac{dr}{dt}\\).</li>' +
                '<li><strong>The 4-step method:</strong> (1) draw and label, (2) relate the variables, (3) differentiate both sides with respect to \\(t\\), (4) substitute known values and solve.</li>' +
                '<li><strong>Circle:</strong> \\(A = \\pi r^2 \\Rightarrow dA/dt = 2\\pi r \\cdot dr/dt\\).</li>' +
                '<li><strong>Sphere:</strong> \\(V = \\tfrac{4}{3}\\pi r^3 \\Rightarrow dV/dt = 4\\pi r^2 \\cdot dr/dt\\). (Coefficient is surface area.)</li>' +
                '<li><strong>Cylinder (fixed \\(r\\)):</strong> \\(dV/dt = \\pi r^2 \\cdot dh/dt\\).</li>' +
                '<li><strong>Pythagoras (ladder):</strong> \\(x^2 + y^2 = L^2 \\Rightarrow dy/dt = -\\dfrac{x}{y} \\cdot dx/dt\\). Negative sign = opposite direction.</li>' +
                '<li><strong>Never substitute before you differentiate.</strong> Keep symbols, then plug in.</li>' +
                '<li><strong>Always check units and signs</strong> in your final answer.</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> optimisation - using derivatives to find the largest or smallest possible value of a quantity under real-world constraints.</p>'
        }
    ]
};
