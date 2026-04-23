/* ================================================================
   LESSON: Optimisation
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style structure.
   ================================================================ */
const LESSON_OPTIMISATION = {
    id: 'optimisation',
    title: 'Optimisation',
    subtitle: 'Real-world maximum and minimum problems',
    folder: 'calculus',
    screens: [
        // 1. Concept - The farmer's fence (hook, concrete first)
        {
            type: 'concept',
            title: 'The Farmer and the Fence',
            content: '<p>Before any theory, here is a real puzzle. A farmer has exactly <strong>20 metres</strong> of fencing and wants to enclose a rectangular paddock. What shape should she choose so the paddock is as big as possible?</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Guess and check:</strong> try a few rectangles with perimeter 20.</p>' +
                '<table style="margin:8px auto;border-collapse:collapse;font-family:monospace;">' +
                '<tr><th style="padding:4px 12px;border-bottom:1px solid #ccc;">length \\(l\\)</th><th style="padding:4px 12px;border-bottom:1px solid #ccc;">width \\(w\\)</th><th style="padding:4px 12px;border-bottom:1px solid #ccc;">area \\(lw\\)</th></tr>' +
                '<tr><td style="padding:2px 12px;">1</td><td style="padding:2px 12px;">9</td><td style="padding:2px 12px;">9</td></tr>' +
                '<tr><td style="padding:2px 12px;">2</td><td style="padding:2px 12px;">8</td><td style="padding:2px 12px;">16</td></tr>' +
                '<tr><td style="padding:2px 12px;">4</td><td style="padding:2px 12px;">6</td><td style="padding:2px 12px;">24</td></tr>' +
                '<tr style="background:#fff3cd;"><td style="padding:2px 12px;"><strong>5</strong></td><td style="padding:2px 12px;"><strong>5</strong></td><td style="padding:2px 12px;"><strong>25</strong></td></tr>' +
                '<tr><td style="padding:2px 12px;">6</td><td style="padding:2px 12px;">4</td><td style="padding:2px 12px;">24</td></tr>' +
                '<tr><td style="padding:2px 12px;">8</td><td style="padding:2px 12px;">2</td><td style="padding:2px 12px;">16</td></tr>' +
                '</table>' +
                '<p>The area is biggest when the rectangle is a <strong>square</strong> (\\(l = w = 5\\)). That is nice, but guessing only works when the answer happens to be a whole number. For any real problem we need a tool that always works. That tool is <strong>calculus</strong>.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>What is optimisation?</strong></p>' +
                '<p><strong>Optimisation</strong> means finding the input that makes some quantity (area, volume, cost, profit, time, distance...) as large or as small as possible. In every problem there are two ingredients:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>An <strong>objective</strong> - the thing we want to maximise or minimise.</li>' +
                '<li>A <strong>constraint</strong> - some fixed rule we must obey (e.g. "perimeter = 20").</li>' +
                '</ul>' +
                '</div>' +
                '<p>The rest of this lesson is a single, careful recipe for solving these problems. If you master the recipe, every optimisation question in the IB becomes a checklist.</p>'
        },

        // 2. Concept - The 6-step method
        {
            type: 'concept',
            title: 'The 6-Step Recipe',
            content: '<p>Every IB optimisation question - no matter how scary it sounds - follows the same six steps. Learn them in order and say them out loud if you have to.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The six steps:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.9;">' +
                '<li><strong>Identify</strong> the objective (the quantity you want to make biggest or smallest). Draw a picture if useful.</li>' +
                '<li><strong>Write</strong> the objective as a formula. It will usually depend on <em>two</em> variables at first.</li>' +
                '<li><strong>Use the constraint</strong> to eliminate one variable. Now the objective is a function of a single variable.</li>' +
                '<li><strong>Differentiate</strong> and set the derivative equal to zero. Solve for the critical point(s).</li>' +
                '<li><strong>Verify</strong> it is a max/min. Use the second-derivative test: \\(f\'\'<0\\) means max, \\(f\'\'>0\\) means min.</li>' +
                '<li><strong>Compute and state</strong> the answer in context with units. Reject any critical points outside the physical domain.</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Apply to the farmer:</strong></p>' +
                '<p>1. Objective: <em>area</em>. 2. Formula: \\(A = lw\\). 3. Constraint \\(2l + 2w = 20\\) gives \\(w = 10 - l\\), so \\(A(l) = l(10-l) = 10l - l^2\\). 4. \\(A\'(l) = 10 - 2l = 0 \\Rightarrow l = 5\\). 5. \\(A\'\'(l) = -2 < 0\\), so it really is a max. 6. \\(A = 5 \\times 5 = 25\\) m\\(^2\\). Done.</p>' +
                '</div>' +
                '<p><strong>Why does step 5 matter?</strong> Setting \\(f\'(x) = 0\\) finds <em>any</em> flat spot on the graph - maxima, minima, and horizontal inflection points. The second derivative tells you which kind. Forgetting this step loses marks and sometimes gives the wrong answer entirely.</p>'
        },

        // 3. Example - Walk through the farmer problem fully
        {
            type: 'example',
            title: 'Worked Example: Maximum Area',
            problem: 'A rectangle has a fixed perimeter of \\(24\\) cm. Find the dimensions that maximise the area, and state the maximum area.',
            steps: [
                { text: '<strong>Step 1 - Identify:</strong> we want to <em>maximise the area</em>. Draw a rectangle with length \\(l\\) and width \\(w\\).' },
                { text: '<strong>Step 2 - Write:</strong> objective \\(A = lw\\). Two variables so far.' },
                { text: '<strong>Step 3 - Constraint:</strong> \\(2l + 2w = 24 \\Rightarrow l + w = 12 \\Rightarrow w = 12 - l\\). Substitute: \\(A(l) = l(12 - l) = 12l - l^2\\).' },
                { text: '<strong>Step 4 - Differentiate:</strong> \\(A\'(l) = 12 - 2l\\). Set to zero: \\(12 - 2l = 0 \\Rightarrow l = 6\\).' },
                { text: '<strong>Step 5 - Verify:</strong> \\(A\'\'(l) = -2 < 0\\), so \\(l = 6\\) gives a <strong>maximum</strong>. \\(\\checkmark\\)' },
                { text: '<strong>Step 6 - Compute and state:</strong> \\(w = 12 - 6 = 6\\), so the rectangle is a \\(6\\times 6\\) square. Maximum area \\(= 36\\) cm\\(^2\\).' }
            ]
        },

        // 4. Practice - Max rectangle area
        {
            type: 'practice',
            intro: 'Apply the 6-step method to find the maximum area:',
            generate: () => OPTIMISATION.qMaxRectArea()
        },

        // 5. Concept - Critical points and stationary points
        {
            type: 'concept',
            title: 'Critical Points: The Flat Spots',
            content: '<p>Step 4 of the recipe - "set the derivative to zero" - deserves its own page. The points where \\(f\'(x) = 0\\) are called <strong>critical points</strong> (or <strong>stationary points</strong>), and they are where maxima and minima live.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Why zero derivative?</strong></p>' +
                '<p>At a maximum, the graph stops going up and starts going down. At a minimum, it stops going down and starts going up. In both cases the tangent is <em>horizontal</em> - its slope is zero. So \\(f\'(x) = 0\\).</p>' +
                '<p>This is why optimisation is a calculus problem: derivatives detect horizontal tangents.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>How to find them:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Differentiate \\(f\\) to get \\(f\'(x)\\).</li>' +
                '<li>Solve \\(f\'(x) = 0\\) - often this means factoring, which is why a lot of optimisation practice looks like algebra practice.</li>' +
                '<li>Discard solutions that lie outside the physical domain (e.g. negative lengths).</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Mini-example:</strong> \\(f(x) = x^3 - 6x^2\\).</p>' +
                '<p>\\(f\'(x) = 3x^2 - 12x = 3x(x - 4)\\). Setting this to zero: \\(x = 0\\) or \\(x = 4\\). Two critical points - we still need the second derivative test to classify them.</p>' +
                '</div>'
        },

        // 6. Practice - Critical points
        {
            type: 'practice',
            intro: 'Find the positive critical point by setting \\(f\'(x) = 0\\):',
            generate: () => OPTIMISATION.qCriticalPoints()
        },

        // 7. Concept - Second derivative test
        {
            type: 'concept',
            title: 'The Second Derivative Test',
            content: '<p>Once you have a critical point \\(x = p\\), the <strong>second derivative test</strong> tells you what kind it is. It works because \\(f\'\'\\) measures the <em>curvature</em> of the graph.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The rule:</strong></p>' +
                '<p>Suppose \\(f\'(p) = 0\\). Then:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(f\'\'(p) > 0\\) (curves upward like a cup): \\(p\\) is a <strong>local minimum</strong>.</li>' +
                '<li>\\(f\'\'(p) < 0\\) (curves downward like a frown): \\(p\\) is a <strong>local maximum</strong>.</li>' +
                '<li>\\(f\'\'(p) = 0\\): <strong>inconclusive</strong> - the test fails, fall back to a sign table.</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Intuition - cups and frowns:</strong></p>' +
                '<p>If you are at a minimum, the graph curves up on both sides like a cup. The rate of change is getting more positive - that is \\(f\'\'>0\\).</p>' +
                '<p>If you are at a maximum, the graph curves down on both sides like a frown. The rate of change is getting more negative - that is \\(f\'\'<0\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>IB habit:</strong> <em>always</em> write a single line verifying the nature. Something like:</p>' +
                '<p style="text-align:center;">"\\(f\'\'(5) = -2 < 0\\), so \\(x = 5\\) is a maximum."</p>' +
                '<p>One line, one method mark. Do not skip it.</p>' +
                '</div>'
        },

        // 8. Practice - Second derivative test
        {
            type: 'practice',
            intro: 'Use the second derivative test to classify the stationary point:',
            generate: () => OPTIMISATION.qSecondDerivConfirm()
        },

        // 9. Practice - Classify min (which stationary point is the min?)
        {
            type: 'practice',
            intro: 'Using \\(f\'\'\\), identify which stationary point is a local minimum:',
            generate: () => OPTIMISATION.qClassifyMinimum()
        },

        // 10. Concept - Closed intervals and endpoints
        {
            type: 'concept',
            title: 'Closed Intervals: Do Not Forget the Endpoints',
            content: '<p>If a problem restricts \\(x\\) to a <strong>closed interval</strong> \\([a, b]\\), the global maximum or minimum can occur at an <em>endpoint</em> rather than at a critical point. You have to check all three candidates.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Candidates for the global extremum on \\([a, b]\\):</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>The left endpoint \\(x = a\\) - evaluate \\(f(a)\\).</li>' +
                '<li>The right endpoint \\(x = b\\) - evaluate \\(f(b)\\).</li>' +
                '<li>Any critical points inside \\((a, b)\\) where \\(f\'(x) = 0\\) - evaluate \\(f\\) there.</li>' +
                '</ol>' +
                '<p>Whichever value is largest is the <strong>global maximum</strong>; whichever is smallest is the <strong>global minimum</strong>.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Why is this different?</strong></p>' +
                '<p>On an open interval, the function can always "keep heading" past a flat point, so maxima and minima must happen at critical points. On a closed interval, the function stops at the endpoints - so the biggest or smallest value might be there even though the graph is still sloping.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Domain check in word problems:</strong></p>' +
                '<p>Even when the problem does not explicitly say "\\([a, b]\\)", physical meaning usually forces one. A box side length \\(x\\) with sheet size \\(12\\) needs \\(0 < x < 6\\). A radius cannot be negative. Always state the valid domain and reject critical points outside it.</p>' +
                '</div>'
        },

        // 11. Practice - Global max on closed interval
        {
            type: 'practice',
            intro: 'Find the global maximum on the closed interval (check endpoints and interior critical points):',
            generate: () => OPTIMISATION.qGlobalMax()
        },

        // 12. Simulation - PhET Calculus Grapher
        {
            type: 'simulation',
            title: 'Explore: Derivatives and Extrema Visually',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'Drag points on the function curve and watch how the first and second derivative graphs respond. The goal is to see with your own eyes why \\(f\'(x) = 0\\) at maxima and minima, and why the sign of \\(f\'\'\\) distinguishes them.',
            tasks: [
                'Shape the top curve into a smooth "hill" (one peak). Turn on the first-derivative graph. What is the value of \\(f\'\\) exactly under the peak? What is the sign of \\(f\'\\) to the left and right of the peak? Connect this with "\\(f\'(p) = 0\\) at a maximum".',
                'Now reshape the curve into a "valley" (one trough). Turn on the second-derivative graph. What is the sign of \\(f\'\'\\) at the bottom of the valley? What does that tell you about the classification rule \\(f\'\'>0\\Rightarrow\\) minimum?',
                'Build a curve with BOTH a hill and a valley side by side. Identify the critical points visually, then check: does \\(f\'\\) cross zero at each? Does \\(f\'\'\\) have opposite signs at the two? This is the geometry behind every optimisation problem.'
            ]
        },

        // 13. Concept - Using a constraint to reduce variables (heart of optimisation)
        {
            type: 'concept',
            title: 'The Constraint Trick: From Two Variables to One',
            content: '<p>The single most important step in optimisation is <strong>step 3</strong>: using the constraint to turn a two-variable objective into a one-variable function. If this step goes wrong, nothing else saves you.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The pattern:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Write the objective with whatever variables are natural: \\(A = lw\\), \\(V = \\pi r^2 h\\), etc.</li>' +
                '<li>Write the constraint as an equation: \\(2l + 2w = P\\), \\(\\pi r^2 h = V\\).</li>' +
                '<li>Solve the constraint for <em>one</em> of the variables (the one that is easiest).</li>' +
                '<li>Substitute into the objective. You now have a single-variable function.</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Example - minimum fencing:</strong></p>' +
                '<p>A rectangular enclosure of area \\(18\\) m\\(^2\\) is built against a long wall. Only three sides need fencing. Minimise the fence.</p>' +
                '<p><em>Objective:</em> fence \\(F = l + 2w\\) (one length and two widths).</p>' +
                '<p><em>Constraint:</em> \\(lw = 18\\), so \\(l = 18/w\\).</p>' +
                '<p><em>Substitute:</em> \\(F(w) = 18/w + 2w\\). Now one variable, and we can differentiate.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Which variable to eliminate?</strong></p>' +
                '<p>Pick whichever gives the cleanest formula. In the example above we could have used \\(w = 18/l\\) and got \\(F(l) = l + 36/l\\) - also fine, same answer. If the constraint has a square (like \\(\\pi r^2 h = V\\)) it is usually easier to solve for the <em>unsquared</em> variable (\\(h\\)).</p>' +
                '</div>'
        },

        // 14. Example - Minimum fencing (full walkthrough)
        {
            type: 'example',
            title: 'Worked Example: Minimum Fencing',
            problem: 'A rectangular enclosure of area \\(32\\) m\\(^2\\) is built against a long wall. Only three sides (two widths and one length) need fencing. Find the minimum total fence length.',
            steps: [
                { text: '<strong>Step 1 - Identify:</strong> we want to <em>minimise the total fence length</em>. Sketch a rectangle with the wall as one long side.' },
                { text: '<strong>Step 2 - Write:</strong> objective \\(F = l + 2w\\) (one length plus two widths - the wall replaces the second length).' },
                { text: '<strong>Step 3 - Constraint:</strong> area fixed at \\(lw = 32\\), so \\(l = 32/w\\). Substitute: \\(F(w) = 32/w + 2w\\).' },
                { text: '<strong>Step 4 - Differentiate:</strong> \\(F\'(w) = -32/w^2 + 2\\). Set to zero: \\(-32/w^2 + 2 = 0 \\Rightarrow w^2 = 16 \\Rightarrow w = 4\\) (reject \\(w = -4\\), not physical).' },
                { text: '<strong>Step 5 - Verify:</strong> \\(F\'\'(w) = 64/w^3 > 0\\) for \\(w > 0\\), so \\(w = 4\\) gives a <strong>minimum</strong>. \\(\\checkmark\\)' },
                { text: '<strong>Step 6 - Compute and state:</strong> \\(l = 32/4 = 8\\) m. Min fence \\(= 8 + 2(4) = 16\\) m.' }
            ]
        },

        // 15. Practice - Min fence length
        {
            type: 'practice',
            intro: 'Apply the 6-step method to find the minimum fencing:',
            generate: () => OPTIMISATION.qMinFenceLength()
        },

        // 16. Concept - 3D problems: boxes and cylinders
        {
            type: 'concept',
            title: '3D Problems: Boxes and Cylinders',
            content: '<p>The method does not change for three-dimensional problems. Only the formulas get fancier.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Open-top box from a square sheet:</strong></p>' +
                '<p>Start with a square sheet of side \\(L\\). Cut a small square of side \\(x\\) from each corner, then fold the flaps up. The resulting box has:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Base dimensions \\((L - 2x) \\times (L - 2x)\\) - each side loses two cuts of \\(x\\).</li>' +
                '<li>Height \\(x\\) - the folded-up flap.</li>' +
                '<li>Volume \\(V(x) = (L - 2x)^2 \\, x\\).</li>' +
                '</ul>' +
                '<p>Valid domain: \\(0 < x < L/2\\) (otherwise the base disappears). Differentiate, set to zero, solve, and always reject \\(x = L/2\\) because it gives zero volume.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Closed cylinder with fixed volume:</strong></p>' +
                '<p>A cylinder of radius \\(r\\) and height \\(h\\) has:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Volume \\(V = \\pi r^2 h\\) - this is the <em>constraint</em> if \\(V\\) is fixed.</li>' +
                '<li>Surface area \\(S = 2\\pi r^2 + 2\\pi r h\\) - two circular ends plus the curved side. This is the <em>objective</em> if we want minimum material.</li>' +
                '</ul>' +
                '<p>Solve the constraint for \\(h = V/(\\pi r^2)\\) and substitute: \\(S(r) = 2\\pi r^2 + 2V/r\\). A single variable - now differentiate.</p>' +
                '</div>' +
                '<p>The shape-dependent formulas (\\(V = \\pi r^2 h\\), \\(A = \\tfrac12 bh\\), \\(V = \\tfrac43\\pi r^3\\), ...) are in the IB formula booklet. Know where to find them.</p>'
        },

        // 17. Example - Open-top box
        {
            type: 'example',
            title: 'Worked Example: Open-Top Box',
            problem: 'A square sheet of card has side \\(12\\) cm. Squares of side \\(x\\) are cut from each corner and the sides folded up to make an open box. Find the value of \\(x\\) that maximises the volume.',
            steps: [
                { text: '<strong>Step 1 - Identify:</strong> maximise <em>volume</em>. Domain: \\(0 < x < 6\\).' },
                { text: '<strong>Step 2 - Write:</strong> \\(V(x) = (12 - 2x)^2 \\, x\\). (Already one variable - no further constraint to use.)' },
                { text: '<strong>Step 3 - Skip to differentiating:</strong> use the product rule or expand first.<br>\\(V\'(x) = 2(12 - 2x)(-2) \\cdot x + (12 - 2x)^2 = (12 - 2x)\\bigl[(12 - 2x) - 4x\\bigr] = (12 - 2x)(12 - 6x)\\).' },
                { text: '<strong>Step 4 - Set \\(V\'(x) = 0\\):</strong> \\((12 - 2x)(12 - 6x) = 0\\), giving \\(x = 6\\) or \\(x = 2\\). Reject \\(x = 6\\) (gives zero volume and is outside the open domain).' },
                { text: '<strong>Step 5 - Verify:</strong> check \\(V\'(1) = (10)(6) = 60 > 0\\) and \\(V\'(3) = (6)(-6) = -36 < 0\\). Sign change from \\(+\\) to \\(-\\) at \\(x = 2\\), so it is a <strong>maximum</strong>. \\(\\checkmark\\)' },
                { text: '<strong>Step 6 - Compute and state:</strong> cut corners of size \\(x = 2\\) cm. Max volume \\(= (12 - 4)^2 \\times 2 = 64 \\times 2 = 128\\) cm\\(^3\\).' }
            ]
        },

        // 18. Practice - Max volume box
        {
            type: 'practice',
            intro: 'Find the corner cut size \\(x\\) that maximises the box volume:',
            generate: () => OPTIMISATION.qMaxVolBox()
        },

        // 19. Practice - Min surface area cylinder
        {
            type: 'practice',
            intro: 'Find the radius that minimises the surface area of the cylinder:',
            generate: () => OPTIMISATION.qMinCostCylinder()
        },

        // 20. Practice - Max revenue (economic context)
        {
            type: 'practice',
            intro: 'Find the price that maximises revenue:',
            generate: () => OPTIMISATION.qMaxRevenue()
        },

        // 21. Practice - Distance optimisation
        {
            type: 'practice',
            intro: 'Find the minimum squared distance from the curve to the point:',
            generate: () => OPTIMISATION.qDistanceOptim()
        },

        // 22. Concept - Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>Optimisation is a classic exam trap. These errors come up year after year - memorise them.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: forgetting to use the constraint.</strong></p>' +
                '<p>Students try to differentiate a two-variable formula like \\(A = lw\\) directly. You cannot - you first have to eliminate one variable with the constraint. No constraint substitution, no valid derivative.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: skipping the second-derivative test.</strong></p>' +
                '<p>Writing "therefore it is a maximum" without justification drops method marks. <em>Always</em> state "\\(f\'\'(x) < 0\\), so max" or "\\(f\'\'(x) > 0\\), so min". One line.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: accepting invalid critical points.</strong></p>' +
                '<p>In a word problem, lengths are positive, fractions of a resource lie in \\([0, 1]\\), and so on. If you solve \\(f\'(x) = 0\\) and get \\(x = -3\\) for a length, you <em>reject</em> it - do not report it as the answer just because the algebra produced it.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: forgetting endpoints on a closed interval.</strong></p>' +
                '<p>On \\([a, b]\\) the global max might be at \\(x = a\\) or \\(x = b\\), not at an interior critical point. Always evaluate \\(f\\) at <em>both</em> endpoints and at every interior critical point, then compare.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: answering the wrong question.</strong></p>' +
                '<p>The question might ask for the <em>value of \\(x\\)</em>, the <em>maximum area</em>, the <em>dimensions</em>, or the <em>minimum cost</em>. Read the last line of the problem twice. Your final answer must match what was actually asked, in context, with units.</p>' +
                '</div>'
        },

        // 23. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>The 6-step recipe:</strong> identify objective, write formula, use constraint, differentiate and set to zero, verify max/min, compute and state.</li>' +
                '<li><strong>Critical points:</strong> \\(f\'(x) = 0\\) marks every horizontal tangent - maxima, minima, and horizontal inflections.</li>' +
                '<li><strong>Second-derivative test:</strong> \\(f\'\'(p) > 0 \\Rightarrow\\) local min; \\(f\'\'(p) < 0 \\Rightarrow\\) local max; \\(f\'\'(p) = 0 \\Rightarrow\\) inconclusive.</li>' +
                '<li><strong>Constraint trick:</strong> solve the constraint for one variable and substitute to reduce the objective to a single-variable function.</li>' +
                '<li><strong>Closed intervals:</strong> compare \\(f\\) at both endpoints <em>and</em> at every interior critical point to find the global extremum.</li>' +
                '<li><strong>Physical domain:</strong> reject critical points that are negative, zero, or outside the problem\'s natural range.</li>' +
                '<li><strong>Classic setups:</strong> rectangle with fixed perimeter (max area = square); open-top box \\(V = (L-2x)^2 x\\); cylinder \\(S = 2\\pi r^2 + 2V/r\\); revenue \\(R = p \\cdot q(p)\\).</li>' +
                '<li><strong>Always answer in context:</strong> units, the specific quantity asked, and a one-line verification of max/min.</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> in <em>kinematics</em>, we apply exactly the same differentiation tools to motion problems - finding maximum velocity, minimum speed, and when objects reach rest or change direction.</p>'
        }
    ]
};
