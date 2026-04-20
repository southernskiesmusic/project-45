const LESSON_TRIG_EQ = {
    id: 'trig-equations',
    title: 'Trigonometric Equations',
    subtitle: 'Solving trig equations in given intervals',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: Solving Basic Trig Equations ───────────────
        {
            type: 'concept',
            title: 'Solving Basic Trig Equations',
            content: '<p>For each trig equation in \\([0°, 360°]\\), the number of solutions depends on the value of \\(k\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>\\(\\sin(x) = k\\):</strong><br>' +
                '\\(x = \\arcsin(k)\\) and \\(x = 180° - \\arcsin(k)\\)<br>' +
                '(sin is positive in Q1 and Q2)<br><br>' +
                '<strong>\\(\\cos(x) = k\\):</strong><br>' +
                '\\(x = \\arccos(k)\\) and \\(x = 360° - \\arccos(k)\\)<br>' +
                '(cos is positive in Q1 and Q4)<br><br>' +
                '<strong>\\(\\tan(x) = k\\):</strong><br>' +
                '\\(x = \\arctan(k)\\) and \\(x = 180° + \\arctan(k)\\)<br>' +
                '(tan repeats every 180°)' +
                '</div>' +
                '<p><strong>Number of solutions in \\([0°, 360°]\\):</strong></p>' +
                '<ul>' +
                '<li>\\(|k| < 1\\): <strong>2 solutions</strong></li>' +
                '<li>\\(|k| = 1\\): <strong>1 solution</strong></li>' +
                '<li>\\(|k| > 1\\): <strong>no solution</strong></li>' +
                '</ul>'
        },

        // ── 2. Example: Solving sin(x) = ½ ────────────────────────
        {
            type: 'example',
            problem: 'Solve \\(\\sin(x) = \\dfrac{1}{2}\\) for \\(x \\in [0°, 360°]\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the reference angle: \\(\\sin^{-1}\\!\\left(\\tfrac{1}{2}\\right) = 30°\\).' },
                { text: '<strong>Step 2:</strong> Since sin is positive in Q1 and Q2:<br>\\(x = 30°\\) or \\(x = 180° - 30° = 150°\\).' },
                { text: '<strong>Step 3:</strong> Check: \\(\\sin(30°) = \\sin(150°) = \\dfrac{1}{2}\\) ✓' }
            ]
        },

        // ── 3. Practice: Count sin solutions ──────────────────────
        {
            type: 'practice',
            intro: 'Count the solutions in [0°, 360°]:',
            generate: () => TRIG_EQ.qCountSinSolutions()
        },

        // ── 4. Practice: Solve sin ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the equation for x in [0°, 360°]:',
            generate: () => TRIG_EQ.qSolveSin()
        },

        // ── 5. Practice: Solve cos ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the equation for x in [0°, 360°]:',
            generate: () => TRIG_EQ.qSolveCos()
        },

        // ── 6. Practice: Solve tan ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the equation for x in [0°, 360°]:',
            generate: () => TRIG_EQ.qSolveTan()
        },

        // ── 7. Concept: More Complex Equations ────────────────────
        {
            type: 'concept',
            title: 'More Complex Equations',
            content: '<p>More complex trig equations can be reduced to the basic forms above.</p>' +
                '<p><strong>Linear equations</strong> (e.g. \\(a\\sin(x) + b = c\\)):</p>' +
                '<ul>' +
                '<li>Rearrange first: \\(\\sin(x) = \\dfrac{c - b}{a}\\), then solve as normal.</li>' +
                '</ul>' +
                '<p><strong>Double angle equations</strong> (e.g. \\(\\sin(2x) = k\\)):</p>' +
                '<ul>' +
                '<li>Let \\(u = 2x\\). Since \\(x \\in [0°, 360°]\\), solve \\(\\sin(u) = k\\) in \\([0°, 720°]\\).</li>' +
                '<li>Find all values of \\(u\\), then halve each: \\(x = u / 2\\).</li>' +
                '</ul>' +
                '<p><strong>Quadratic equations</strong> (e.g. \\(2\\sin^2(x) - \\sin(x) - 1 = 0\\)):</p>' +
                '<ul>' +
                '<li>Substitute \\(u = \\sin(x)\\) (or \\(\\cos(x)\\)) to get a quadratic in \\(u\\).</li>' +
                '<li>Factor or use the quadratic formula, then solve each resulting trig equation.</li>' +
                '</ul>'
        },

        // ── 8. Example: Solving 2sin(x) − 1 = 0 ──────────────────
        {
            type: 'example',
            problem: 'Solve \\(2\\sin(x) - 1 = 0\\) for \\(x \\in [0°, 360°]\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Rearrange: \\(2\\sin(x) = 1 \\Rightarrow \\sin(x) = \\dfrac{1}{2}\\).' },
                { text: '<strong>Step 2:</strong> Reference angle: \\(\\sin^{-1}\\!\\left(\\tfrac{1}{2}\\right) = 30°\\).' },
                { text: '<strong>Answer:</strong> \\(x = 30°\\) or \\(x = 150°\\).' }
            ]
        },

        // ── 9. Practice: Linear trig ───────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the linear trigonometric equation:',
            generate: () => TRIG_EQ.qSolveLinearTrig()
        },

        // ── 10. Practice: Double angle ─────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the double angle equation:',
            generate: () => TRIG_EQ.qSolveDoubleAngle()
        },

        // ── 11. Practice: Count double angle solutions ─────────────
        {
            type: 'practice',
            intro: 'Count the solutions of the double angle equation:',
            generate: () => TRIG_EQ.qCountDoubleAngle()
        },

        // ── 12. Example: Quadratic 2sin²(x) − sin(x) − 1 = 0 ─────
        {
            type: 'example',
            problem: 'Solve \\(2\\sin^2(x) - \\sin(x) - 1 = 0\\) for \\(x \\in [0°, 360°]\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Let \\(u = \\sin(x)\\): the equation becomes \\(2u^2 - u - 1 = 0\\).' },
                { text: '<strong>Step 2:</strong> Factor: \\((2u + 1)(u - 1) = 0\\), so \\(u = -\\dfrac{1}{2}\\) or \\(u = 1\\).' },
                { text: '<strong>Step 3:</strong> \\(\\sin(x) = -\\dfrac{1}{2} \\Rightarrow x = 210°, 330°\\).<br>\\(\\sin(x) = 1 \\Rightarrow x = 90°\\).' },
                { text: '<strong>Answer:</strong> Three solutions: \\(x = 90°, 210°, 330°\\).' }
            ]
        },

        // ── 13. Practice: Factor quadratic trig ───────────────────
        {
            type: 'practice',
            intro: 'Solve the quadratic trigonometric equation:',
            generate: () => TRIG_EQ.qFactorTrigQuad()
        },

        // ── 14. Practice: Trig with substitution ──────────────────
        {
            type: 'practice',
            intro: 'Solve using substitution:',
            generate: () => TRIG_EQ.qTrigWithSub()
        },

        // ── 15. Practice: Solve in radians ────────────────────────
        {
            type: 'practice',
            intro: 'Solve the equation, giving answer in radians:',
            generate: () => TRIG_EQ.qSolveInRadians()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\sin(x) = k \\Rightarrow x = \\arcsin(k)\\) and \\(180° - \\arcsin(k)\\)</li>' +
                '<li>\\(\\cos(x) = k \\Rightarrow x = \\arccos(k)\\) and \\(360° - \\arccos(k)\\)</li>' +
                '<li>\\(\\tan(x) = k \\Rightarrow x = \\arctan(k)\\) and \\(180° + \\arctan(k)\\)</li>' +
                '<li>2 solutions if \\(|k| < 1\\), 1 solution if \\(|k| = 1\\), 0 solutions if \\(|k| > 1\\)</li>' +
                '<li>\\(\\sin(2x) = k\\): let \\(u = 2x\\), solve in \\([0°, 720°]\\), then halve each \\(u\\)</li>' +
                '<li>Quadratic: substitute \\(u = \\sin(x)\\) or \\(u = \\cos(x)\\), factor or use quadratic formula</li>' +
                '</ul>'
        }
    ]
};
