/* ================================================================
   LESSON: Tangent and Normal Lines
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style structure.
   IB AA 5.3 / 5.4 - derivative as slope, tangent/normal equations.
   ================================================================ */
const LESSON_TANGENT_NORMAL = {
    id: 'tangent-normal',
    title: 'Tangent & Normal Lines',
    subtitle: 'Equations of tangent and normal lines to curves',
    folder: 'calculus',
    screens: [
        // 1. Concept - zoom-in intuition
        {
            type: 'concept',
            title: 'What is a Tangent Line?',
            content: '<p>Before any formula, here is the idea in one picture. Take any smooth curve and <em>zoom in</em> on a single point. As you zoom in closer and closer, the curve starts to look like a <strong>straight line</strong>. That straight line is the <strong>tangent</strong> at that point.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The zoom-in test:</strong></p>' +
                '<p>Imagine you are at the point \\((1, 1)\\) on the curve \\(y = x^2\\). If you zoom in far enough, the parabola becomes visually indistinguishable from a single line through \\((1, 1)\\). No matter how much further you zoom, it stays that same line.</p>' +
                '<p>That "line you see when you zoom all the way in" is the tangent. Its slope (steepness) is what we call the <strong>derivative</strong> at that point.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Slope = derivative.</strong> The whole reason derivatives exist is to answer the question "what is the slope of the tangent here?". That is why \\(f\'(a)\\) and "gradient of the tangent at \\(x = a\\)" are the same thing.</p>' +
                '<p style="text-align:center;font-size:1.15em;margin-top:8px;">\\(m_{\\text{tangent at } x=a} = f\'(a)\\)</p>' +
                '</div>' +
                '<p><strong>Key idea:</strong> the tangent is the best straight-line approximation to a curve at a single point. Nearby, the tangent and the curve agree to very high accuracy; far away, they drift apart.</p>'
        },

        // 2. Concept - tangent equation
        {
            type: 'concept',
            title: 'Equation of a Tangent',
            content: '<p>A straight line is determined by one <strong>point</strong> and one <strong>slope</strong>. The tangent at \\(x = a\\) gives us exactly that:</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Point:</strong> the tangent touches the curve at \\((a,\\, f(a))\\). So we need to compute \\(f(a)\\).</p>' +
                '<p><strong>Slope:</strong> the derivative there, \\(f\'(a)\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The formula</strong> (point-slope form):</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(y - f(a) = f\'(a)\\,(x - a)\\)</p>' +
                '<p>or equivalently \\(y = mx + c\\) with \\(m = f\'(a)\\) and \\(c = f(a) - f\'(a)\\cdot a\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Three-step recipe:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Compute \\(f(a)\\) - gives the point.</li>' +
                '<li>Differentiate to get \\(f\'(x)\\), then plug in \\(x = a\\) - gives the slope \\(m\\).</li>' +
                '<li>Write \\(y - f(a) = m(x - a)\\), rearrange to \\(y = mx + c\\).</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Common slip:</strong> students find \\(f\'(a)\\) and stop there. That is just the gradient, not the equation. You still need \\(f(a)\\) and the full line.</p>'
        },

        // 3. Example - find tangent gradient
        {
            type: 'example',
            title: 'Slope of a Tangent',
            problem: 'Find the gradient of the tangent to \\(f(x) = 3x^2 - 2x + 1\\) at \\(x = 2\\).',
            steps: [
                { text: '<strong>What is being asked:</strong> just the slope, not the whole line. So we only need \\(f\'(2)\\), not \\(f(2)\\).' },
                { text: '<strong>Step 1 - differentiate:</strong> \\(f\'(x) = 6x - 2\\).' },
                { text: '<strong>Step 2 - substitute \\(x = 2\\):</strong> \\(f\'(2) = 6(2) - 2 = 12 - 2 = 10\\).' },
                { text: '<strong>Answer:</strong> the gradient of the tangent at \\(x = 2\\) is \\(10\\).' },
                { text: '<strong>Check intuition:</strong> \\(f\'(x) = 6x - 2\\) is positive and growing for \\(x > 0\\), so the curve should be climbing steeply at \\(x = 2\\). A slope of \\(10\\) matches that picture. \\(\\checkmark\\)' }
            ]
        },

        // 4. Practice - tangent gradient
        {
            type: 'practice',
            intro: 'Find the gradient of the tangent at the given point:',
            generate: () => TANGENT_NORMAL.qTangentGradient()
        },

        // 5. Example - full tangent equation
        {
            type: 'example',
            title: 'Full Tangent Equation',
            problem: 'Find the equation of the tangent to \\(y = x^2 + 2x\\) at \\(x = 1\\).',
            steps: [
                { text: '<strong>Step 1 - point on curve:</strong> \\(f(1) = 1^2 + 2(1) = 3\\). So the tangent passes through \\((1, 3)\\).' },
                { text: '<strong>Step 2 - slope:</strong> \\(f\'(x) = 2x + 2\\), so \\(m = f\'(1) = 4\\).' },
                { text: '<strong>Step 3 - point-slope form:</strong> \\(y - 3 = 4(x - 1)\\).' },
                { text: '<strong>Step 4 - expand:</strong> \\(y - 3 = 4x - 4 \\implies y = 4x - 1\\).' },
                { text: '<strong>Step 5 - quick check:</strong> does \\((1, 3)\\) lie on \\(y = 4x - 1\\)? \\(4(1) - 1 = 3\\). \\(\\checkmark\\)' },
                { text: '<strong>Answer:</strong> \\(y = 4x - 1\\).' }
            ]
        },

        // 6. Practice - tangent y-intercept
        {
            type: 'practice',
            intro: 'Find the y-intercept of the tangent line at the given point:',
            generate: () => TANGENT_NORMAL.qTangentYIntercept()
        },

        // 7. Practice - full tangent equation (MC)
        {
            type: 'practice',
            intro: 'Identify the correct equation of the tangent:',
            generate: () => TANGENT_NORMAL.qTangentEquation()
        },

        // 8. Concept - horizontal tangents
        {
            type: 'concept',
            title: 'Horizontal Tangents',
            content: '<p>A <strong>horizontal tangent</strong> is a tangent line with slope \\(0\\) - it runs flat, parallel to the x-axis. Since the slope of the tangent is \\(f\'(x)\\), a horizontal tangent occurs exactly where</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(f\'(x) = 0\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>What does this mean graphically?</strong></p>' +
                '<p>Horizontal tangents mark the <strong>turning points</strong> of a curve - peaks (local maxima), valleys (local minima), or "flat" inflection points. If you picture driving along the curve from left to right, a horizontal tangent is a moment where you are heading neither uphill nor downhill.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Recipe:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Differentiate to get \\(f\'(x)\\).</li>' +
                '<li>Set \\(f\'(x) = 0\\).</li>' +
                '<li>Solve for \\(x\\). Each solution gives an x-coordinate of a horizontal tangent.</li>' +
                '<li>(If needed) find \\(f(x)\\) at each solution to get the full point.</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Example:</strong> for \\(f(x) = x^2 - 6x + 5\\), \\(f\'(x) = 2x - 6\\). Setting this to zero gives \\(x = 3\\). So the curve has a single horizontal tangent at \\(x = 3\\) (the vertex of the parabola).</p>'
        },

        // 9. Example - horizontal tangent
        {
            type: 'example',
            title: 'Finding a Horizontal Tangent',
            problem: 'Find the x-coordinate(s) where the tangent to \\(f(x) = 2x^2 - 8x + 5\\) is horizontal.',
            steps: [
                { text: '<strong>Step 1 - what condition?</strong> horizontal means \\(m = 0\\), i.e. \\(f\'(x) = 0\\).' },
                { text: '<strong>Step 2 - differentiate:</strong> \\(f\'(x) = 4x - 8\\).' },
                { text: '<strong>Step 3 - set to zero:</strong> \\(4x - 8 = 0\\).' },
                { text: '<strong>Step 4 - solve:</strong> \\(4x = 8 \\implies x = 2\\).' },
                { text: '<strong>Step 5 - sanity check:</strong> \\(f\'(2) = 4(2) - 8 = 0\\). \\(\\checkmark\\) The curve is flat at \\(x = 2\\), which is the vertex of this parabola.' },
                { text: '<strong>Answer:</strong> \\(x = 2\\).' }
            ]
        },

        // 10. Practice - horizontal tangent
        {
            type: 'practice',
            intro: 'Find the x-coordinate where the tangent is horizontal:',
            generate: () => TANGENT_NORMAL.qHorizontalTangent()
        },

        // 11. Concept - parallel tangents
        {
            type: 'concept',
            title: 'Tangents With a Given Slope',
            content: '<p>Sometimes a question asks for the point where the tangent is <strong>parallel</strong> to some given line, say \\(y = 7x + 2\\). Parallel lines share the same slope, so the condition is</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(f\'(x) = 7\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>General principle:</strong> to find where the tangent has slope \\(k\\), solve \\(f\'(x) = k\\). The solutions are the x-coordinates where tangents have slope \\(k\\).</p>' +
                '<p>Horizontal tangents are just the special case \\(k = 0\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Recipe:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Read off the target slope \\(k\\) from the given line \\(y = kx + d\\).</li>' +
                '<li>Differentiate to get \\(f\'(x)\\).</li>' +
                '<li>Solve \\(f\'(x) = k\\) for \\(x\\).</li>' +
                '<li>(If asked) find \\(y = f(x)\\) for each solution and write the tangent equation.</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Watch out:</strong> "parallel" does <em>not</em> mean "equal to". A tangent parallel to \\(y = 7x + 2\\) has the same slope \\(7\\) but in general a different y-intercept.</p>'
        },

        // 12. Practice - parallel tangent
        {
            type: 'practice',
            intro: 'Find the x-coordinate where the tangent is parallel to the given line:',
            generate: () => TANGENT_NORMAL.qParallelTangent()
        },

        // 13. Practice - cubic
        {
            type: 'practice',
            intro: 'Find the gradient of the tangent to the cubic at the given point:',
            generate: () => TANGENT_NORMAL.qTangentAtCubic()
        },

        // 14. Simulation - Calculus Grapher
        {
            type: 'simulation',
            title: 'Explore: Slopes and Tangents',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'The Calculus Grapher lets you sketch any function and instantly see its derivative graph alongside. Use it to build a visual link between "slope of the tangent at x" and "value of f\'(x)". Enable the tangent tool (slope line) if it is offered - it is the single most useful feature here.',
            tasks: [
                'Sketch a simple parabola. Move the slope indicator along the curve. Where the curve is climbing, what is the sign of f\'(x)? Where it is falling? Where the parabola reaches its vertex, what does f\'(x) do?',
                'Build a cubic with two turning points. Find the x-values where the tangent is horizontal by eye, then confirm them on the derivative graph (where f\'(x) crosses zero). Do the crossings match?',
                'Without changing the shape, slide the curve up by a constant. Does the tangent slope at a given x change? What does this tell you about the effect of "+ C" on a derivative?'
            ]
        },

        // 15. Concept - normal lines
        {
            type: 'concept',
            title: 'Normal Lines',
            content: '<p>The <strong>normal</strong> at a point is the line perpendicular (at 90 degrees) to the tangent. It passes through the same point on the curve - only the direction is different.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Perpendicular slopes:</strong> if two lines are perpendicular and neither is vertical, their slopes multiply to \\(-1\\):</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(m_{\\text{tan}} \\cdot m_{\\text{norm}} = -1\\)</p>' +
                '<p>Rearranged:</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(m_{\\text{norm}} = -\\dfrac{1}{m_{\\text{tan}}} = -\\dfrac{1}{f\'(a)}\\)</p>' +
                '<p>This is called the <strong>negative reciprocal</strong>: flip it upside down and change the sign.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Quick examples of negative reciprocals:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Slope \\(2\\) becomes \\(-\\dfrac{1}{2}\\).</li>' +
                '<li>Slope \\(-3\\) becomes \\(+\\dfrac{1}{3}\\).</li>' +
                '<li>Slope \\(\\dfrac{2}{5}\\) becomes \\(-\\dfrac{5}{2}\\).</li>' +
                '<li>Slope \\(0\\) (horizontal tangent) gives a <em>vertical</em> normal - undefined slope. Write it as \\(x = a\\).</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Equation of the normal at \\(x = a\\):</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(y - f(a) = -\\dfrac{1}{f\'(a)}\\,(x - a)\\)</p>' +
                '<p>Same point \\((a,\\, f(a))\\) as the tangent - only the slope is different.</p>' +
                '</div>'
        },

        // 16. Example - normal equation
        {
            type: 'example',
            title: 'Finding a Normal Equation',
            problem: 'Find the equation of the normal to \\(y = x^2\\) at \\(x = 2\\).',
            steps: [
                { text: '<strong>Step 1 - point on curve:</strong> \\(f(2) = 4\\), so the normal passes through \\((2, 4)\\).' },
                { text: '<strong>Step 2 - tangent slope:</strong> \\(f\'(x) = 2x\\), so \\(m_{\\text{tan}} = f\'(2) = 4\\).' },
                { text: '<strong>Step 3 - normal slope (negative reciprocal):</strong> \\(m_{\\text{norm}} = -\\dfrac{1}{4}\\).' },
                { text: '<strong>Step 4 - point-slope form:</strong> \\(y - 4 = -\\dfrac{1}{4}(x - 2)\\).' },
                { text: '<strong>Step 5 - expand:</strong> \\(y - 4 = -\\dfrac{1}{4}x + \\dfrac{1}{2} \\implies y = -\\dfrac{1}{4}x + \\dfrac{9}{2}\\).' },
                { text: '<strong>Step 6 - perpendicularity check:</strong> \\(4 \\cdot \\left(-\\dfrac{1}{4}\\right) = -1\\). \\(\\checkmark\\) So tangent and normal are indeed at right angles.' },
                { text: '<strong>Answer:</strong> \\(y = -\\dfrac{1}{4}x + \\dfrac{9}{2}\\).' }
            ]
        },

        // 17. Practice - normal gradient
        {
            type: 'practice',
            intro: 'Find the gradient of the normal at the given point:',
            generate: () => TANGENT_NORMAL.qNormalGradient()
        },

        // 18. Practice - normal y-intercept
        {
            type: 'practice',
            intro: 'Find the y-intercept of the normal line:',
            generate: () => TANGENT_NORMAL.qNormalYIntercept()
        },

        // 19. Practice - normal x-intercept
        {
            type: 'practice',
            intro: 'Find the x-intercept of the normal line:',
            generate: () => TANGENT_NORMAL.qNormalXIntercept()
        },

        // 20. Practice - point on tangent
        {
            type: 'practice',
            intro: 'Identify which listed point lies on the tangent line:',
            generate: () => TANGENT_NORMAL.qPointOnTangent()
        },

        // 21. Concept - common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>These slips cost easy marks every exam. Read them once and avoid them for life.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: giving \\(f\'(a)\\) when the question wants the line.</strong></p>' +
                '<p>"Find the tangent to the curve at \\(x = 3\\)" asks for an <em>equation</em> like \\(y = 5x - 2\\), not the number \\(5\\). Always read whether the question wants the gradient alone or the full line.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: using \\(f(a)\\) instead of \\(f\'(a)\\) for the slope.</strong></p>' +
                '<p>The slope of the tangent is the <em>derivative</em> at \\(a\\), not the function value. \\(f(2)\\) gives the y-coordinate of the point; \\(f\'(2)\\) gives the slope. Mixing them up is one of the most common errors.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: forgetting the minus sign in \\(-1/f\'(a)\\).</strong></p>' +
                '<p>The normal slope is the <em>negative</em> reciprocal, not just the reciprocal. If the tangent has slope \\(3\\), the normal has slope \\(-\\dfrac{1}{3}\\), not \\(\\dfrac{1}{3}\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: substituting the slope into \\(y = mx + c\\) and forgetting to find \\(c\\).</strong></p>' +
                '<p>You need a point on the line to pin down \\(c\\). Use \\((a, f(a))\\): substitute the coordinates into \\(y = mx + c\\) and solve for \\(c\\). Or use point-slope form \\(y - f(a) = m(x - a)\\) and avoid the issue entirely.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: horizontal tangent vs vertical tangent confusion.</strong></p>' +
                '<p>Horizontal tangent: slope \\(0\\), solve \\(f\'(x) = 0\\). Vertical tangent: slope undefined, would require \\(f\'(x)\\) to blow up - rare in IB AA but worth recognising. The normal at a horizontal tangent is vertical, written as \\(x = a\\), not \\(y = \\ldots\\).</p>' +
                '</div>'
        },

        // 22. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>Slope = derivative:</strong> the gradient of the tangent at \\(x = a\\) is \\(f\'(a)\\). Zoom in on a curve and it looks like that tangent line.</li>' +
                '<li><strong>Tangent equation:</strong> \\(y - f(a) = f\'(a)(x - a)\\). Needs the point \\((a, f(a))\\) and the slope \\(f\'(a)\\).</li>' +
                '<li><strong>Horizontal tangent:</strong> solve \\(f\'(x) = 0\\) - these are turning points.</li>' +
                '<li><strong>Tangent parallel to \\(y = kx + d\\):</strong> solve \\(f\'(x) = k\\).</li>' +
                '<li><strong>Normal slope:</strong> \\(m_{\\text{norm}} = -\\dfrac{1}{f\'(a)}\\) (negative reciprocal of tangent slope).</li>' +
                '<li><strong>Normal equation:</strong> \\(y - f(a) = -\\dfrac{1}{f\'(a)}(x - a)\\). Same point as the tangent, perpendicular direction.</li>' +
                '<li><strong>Quick check:</strong> tangent slope times normal slope should equal \\(-1\\).</li>' +
                '<li><strong>Common slip:</strong> mistaking \\(f(a)\\) for the slope, or forgetting the minus sign in the normal.</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> the chain rule lets us differentiate composite functions like \\((3x + 1)^5\\) or \\(\\sin(x^2)\\), opening the door to tangents of much richer curves.</p>'
        }
    ]
};
