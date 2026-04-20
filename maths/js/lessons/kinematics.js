const LESSON_KINEMATICS = {
    id: 'kinematics',
    title: 'Kinematics',
    subtitle: 'Position, velocity, acceleration, displacement and distance',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: The Three Functions ──────────────────────
        {
            type: 'concept',
            title: 'Position, Velocity and Acceleration',
            content: '<p>Kinematics uses calculus to describe motion along a straight line. Three functions are connected by differentiation:</p>' +
                '<div class="lesson-box">' +
                '<strong>Position</strong> \\(s(t)\\) — displacement from a fixed origin, in metres.<br>' +
                '<strong>Velocity</strong> \\(v(t) = s\'(t) = \\dfrac{ds}{dt}\\) — rate of change of position, in m s\\(^{-1}\\).<br>' +
                '<strong>Acceleration</strong> \\(a(t) = v\'(t) = \\dfrac{dv}{dt} = s\'\'(t)\\) — rate of change of velocity, in m s\\(^{-2}\\).' +
                '</div>' +
                '<p>Going the other way (integration):</p>' +
                '<div class="lesson-box">' +
                '\\(v(t) = \\displaystyle\\int a(t)\\, dt + C\\)<br>' +
                '\\(s(t) = \\displaystyle\\int v(t)\\, dt + C\\)' +
                '</div>' +
                '<p>Initial conditions \\(s(0) = s_0\\) and \\(v(0) = v_0\\) allow us to find the constants of integration.</p>'
        },

        // ── 2. Practice: Velocity from Position ──────────────────
        {
            type: 'practice',
            intro: 'Differentiate to find the velocity at time t:',
            generate: () => KINEMATICS.qFindVelocity()
        },

        // ── 3. Concept: Direction of Motion ──────────────────────
        {
            type: 'concept',
            title: 'Direction of Motion',
            content: '<p>The sign of \\(v(t)\\) tells us the direction of motion:</p>' +
                '<ul>' +
                '<li>\\(v(t) > 0\\): moving in the <strong>positive</strong> direction (usually right or upward)</li>' +
                '<li>\\(v(t) < 0\\): moving in the <strong>negative</strong> direction (left or downward)</li>' +
                '<li>\\(v(t) = 0\\): particle is <strong>at rest</strong> (momentarily)</li>' +
                '</ul>' +
                '<p>A particle <strong>changes direction</strong> when \\(v(t) = 0\\) and the sign of \\(v\\) changes (i.e. it passes through zero, not just touches).</p>' +
                '<div class="lesson-box"><strong>Example:</strong> \\(v(t) = 2t - 6\\)<br>' +
                '\\(v(t) = 0 \\Rightarrow t = 3\\).<br>' +
                'For \\(t < 3\\): \\(v < 0\\) (moving left). For \\(t > 3\\): \\(v > 0\\) (moving right).<br>' +
                'Direction changes at \\(t = 3\\).</div>'
        },

        // ── 4. Practice: Direction Change ────────────────────────
        {
            type: 'practice',
            intro: 'Find when the particle changes direction:',
            generate: () => KINEMATICS.qDirectionChange()
        },

        // ── 5. Concept: Displacement vs Distance ─────────────────
        {
            type: 'concept',
            title: 'Displacement and Distance',
            content: '<p>These two quantities are often confused:</p>' +
                '<div class="lesson-box">' +
                '<strong>Displacement</strong> = change in position = \\(\\displaystyle\\int_{t_1}^{t_2} v(t)\\, dt\\)<br>' +
                'Can be <em>positive, negative, or zero</em>. Positive and negative contributions cancel.' +
                '</div>' +
                '<div class="lesson-box">' +
                '<strong>Distance</strong> = total path length = \\(\\displaystyle\\int_{t_1}^{t_2} |v(t)|\\, dt\\)<br>' +
                'Always <em>non-negative</em>. Positive and negative sections are both counted positively.' +
                '</div>' +
                '<p>To find total distance, split the integral at every zero of \\(v(t)\\) and add the absolute values:</p>' +
                '<div class="lesson-box"><strong>Example:</strong> \\(v(t) = t^2 - 4\\), find distance from \\(t=0\\) to \\(t=3\\).<br>' +
                '\\(v(t) = 0 \\Rightarrow t = 2\\) (in \\([0,3]\\)).<br>' +
                'Distance \\(= \\left|\\displaystyle\\int_0^2 (t^2-4)\\,dt\\right| + \\left|\\displaystyle\\int_2^3 (t^2-4)\\,dt\\right|\\)' +
                '</div>'
        },

        // ── 6. Practice: Displacement ────────────────────────────
        {
            type: 'practice',
            intro: 'Calculate the displacement over the given interval:',
            generate: () => KINEMATICS.qDisplacement()
        },

        // ── 7. Example: Distance vs Displacement ─────────────────
        {
            type: 'example',
            problem: 'A particle moves with \\(v(t) = t^2 - 4t + 3\\text{ m s}^{-1}\\) for \\(0 \\leq t \\leq 4\\). Find the total distance travelled.',
            steps: [
                { text: '<strong>Step 1:</strong> Find zeros of \\(v(t)\\): \\(t^2 - 4t + 3 = (t-1)(t-3) = 0 \\Rightarrow t = 1, t = 3\\).' },
                { text: '<strong>Step 2:</strong> Split the interval: \\([0,1]\\), \\([1,3]\\), \\([3,4]\\).<br>Sign of \\(v\\): \\(+\\), \\(-\\), \\(+\\).' },
                { text: '<strong>Step 3:</strong> Compute each part.<br>\\(\\displaystyle\\int_0^1(t^2-4t+3)\\,dt = \\tfrac{5}{3}\\), \\(\\displaystyle\\int_1^3(t^2-4t+3)\\,dt = -\\tfrac{4}{3}\\), \\(\\displaystyle\\int_3^4(t^2-4t+3)\\,dt = \\tfrac{4}{3}\\).' },
                { text: '<strong>Answer:</strong> Distance \\(= \\tfrac{5}{3} + \\tfrac{4}{3} + \\tfrac{4}{3} = \\tfrac{13}{3} \\approx 4.33\\text{ m}\\).' }
            ]
        },

        // ── 8. Concept: Initial Value Problems ───────────────────
        {
            type: 'concept',
            title: 'Initial Value Problems',
            content: '<p>When integrating to find \\(v(t)\\) or \\(s(t)\\), the constant of integration \\(C\\) is determined by an <strong>initial condition</strong> - a known value at a specific time, usually \\(t = 0\\).</p>' +
                '<div class="lesson-box"><strong>Method:</strong><br>' +
                '1. Integrate \\(a(t)\\) to get \\(v(t) = \\int a(t)\\,dt + C_1\\)<br>' +
                '2. Use \\(v(0) = v_0\\) to find \\(C_1 = v_0 - \\int a(0)\\,dt\\)<br>' +
                '3. Integrate \\(v(t)\\) to get \\(s(t) = \\int v(t)\\,dt + C_2\\)<br>' +
                '4. Use \\(s(0) = s_0\\) to find \\(C_2\\)</div>' +
                '<div class="lesson-box"><strong>Example:</strong> \\(a = 6\\), \\(v(0) = -5\\), \\(s(0) = 10\\).<br>' +
                '\\(v(t) = 6t + C_1\\). \\(v(0) = -5 \\Rightarrow C_1 = -5\\). So \\(v(t) = 6t - 5\\).<br>' +
                '\\(s(t) = 3t^2 - 5t + C_2\\). \\(s(0) = 10 \\Rightarrow C_2 = 10\\). So \\(s(t) = 3t^2 - 5t + 10\\).</div>'
        },

        // ── 9. Practice: Initial Value Problem ───────────────────
        {
            type: 'practice',
            intro: 'Use initial conditions to find the position:',
            generate: () => KINEMATICS.qInitialValueProblem()
        },

        // ── 10. Practice: Maximum Height ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the maximum height:',
            generate: () => KINEMATICS.qMaxHeight()
        },

        // ── 11. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Relationships:</strong> \\(v = s\'\\), \\(a = v\' = s\'\'\\)</li>' +
                '<li><strong>Recovering:</strong> \\(v = \\int a\\, dt + C_1\\), \\(s = \\int v\\, dt + C_2\\)</li>' +
                '<li>Use initial conditions \\(v(0) = v_0\\), \\(s(0) = s_0\\) to find \\(C_1, C_2\\)</li>' +
                '<li><strong>Direction changes</strong> when \\(v(t) = 0\\) and sign of \\(v\\) changes</li>' +
                '<li><strong>Displacement</strong> \\(= \\displaystyle\\int_{t_1}^{t_2} v\\, dt\\) (can be negative)</li>' +
                '<li><strong>Distance</strong> \\(= \\displaystyle\\int_{t_1}^{t_2} |v|\\, dt\\) (always positive - split at zeros of \\(v\\))</li>' +
                '</ul>'
        }
    ]
};
