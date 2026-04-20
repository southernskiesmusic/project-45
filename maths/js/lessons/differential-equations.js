const LESSON_DIFF_EQ = {
    id: 'differential-equations',
    title: 'Differential Equations',
    subtitle: 'Separable DEs, initial conditions, and growth/decay models',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Separable DEs ─────────────────────────────
        {
            type: 'concept',
            title: 'Separable Differential Equations',
            content: '<p>A <strong>differential equation (DE)</strong> relates a function to its derivative. A <strong>separable DE</strong> can be written as:</p>' +
                '<div class="lesson-box">' +
                '\\(\\dfrac{dy}{dx} = f(x) \\cdot g(y)\\)' +
                '<br><br>' +
                '<strong>Method:</strong> Separate variables and integrate both sides:<br>' +
                '\\(\\displaystyle\\int \\frac{1}{g(y)}\\,dy = \\int f(x)\\,dx + C\\)' +
                '</div>' +
                '<p><strong>Initial condition:</strong> Use a given point \\((x_0, y_0)\\) to find the constant \\(C\\).</p>' +
                '<p><strong>Example:</strong> Solve \\(\\dfrac{dy}{dx} = 2x\\) with \\(y(0) = 3\\).</p>' +
                '<ul>' +
                '<li>Integrate: \\(y = x^2 + C\\)</li>' +
                '<li>Apply IC: \\(3 = 0 + C\\), so \\(C = 3\\)</li>' +
                '<li>Solution: \\(y = x^2 + 3\\)</li>' +
                '</ul>'
        },

        // ── 2. Practice: Solve Linear DE ─────────────────────────
        {
            type: 'practice',
            intro: 'Solve the DE with the given initial condition and evaluate:',
            generate: () => DIFF_EQ.qSolveLinearDE()
        },

        // ── 3. Practice: Find Constant from IC ───────────────────
        {
            type: 'practice',
            intro: 'Use the initial condition to find the constant C:',
            generate: () => DIFF_EQ.qFindConstantIC()
        },

        // ── 4. Example: Separable DE ──────────────────────────────
        {
            type: 'example',
            problem: 'Solve \\(\\dfrac{dy}{dx} = xy\\) with \\(y(0) = 2\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Separate: \\(\\dfrac{1}{y}\\,dy = x\\,dx\\).' },
                { text: '<strong>Step 2:</strong> Integrate: \\(\\ln|y| = \\dfrac{x^2}{2} + C\\).' },
                { text: '<strong>Step 3:</strong> Exponentiate: \\(y = Ae^{x^2/2}\\) where \\(A = e^C\\).' },
                { text: '<strong>Step 4:</strong> Apply IC: \\(2 = Ae^{0} = A\\), so \\(A = 2\\).' },
                { text: '<strong>Answer:</strong> \\(y = 2e^{x^2/2}\\).' }
            ]
        },

        // ── 5. Practice: Separable DE ─────────────────────────────
        {
            type: 'practice',
            intro: 'Solve the separable DE and evaluate at the given point:',
            generate: () => DIFF_EQ.qSeparableDE()
        },

        // ── 6. Concept: Exponential Growth and Decay ─────────────
        {
            type: 'concept',
            title: 'Exponential Growth and Decay',
            content: '<p>The DE \\(\\dfrac{dy}{dt} = ky\\) models <strong>exponential growth</strong> (\\(k>0\\)) or <strong>decay</strong> (\\(k<0\\)).</p>' +
                '<div class="lesson-box">' +
                'General solution: \\(y(t) = y_0 \\cdot e^{kt}\\)<br>' +
                'where \\(y_0 = y(0)\\) is the initial value.' +
                '</div>' +
                '<p><strong>Doubling time</strong> (growth): \\(t_{\\text{double}} = \\dfrac{\\ln 2}{k}\\)</p>' +
                '<p><strong>Half-life</strong> (decay): \\(t_{1/2} = \\dfrac{\\ln 2}{|k|}\\)</p>' +
                '<p><strong>Example:</strong> A population of 500 grows at rate \\(k=0.1\\) per year. After 10 years: \\(P = 500 e^{1} \\approx 1359\\).</p>'
        },

        // ── 7. Practice: Exponential Growth ──────────────────────
        {
            type: 'practice',
            intro: 'Find the value of the quantity after the given time:',
            generate: () => DIFF_EQ.qExponentialGrowth()
        },

        // ── 8. Practice: Decay Model ──────────────────────────────
        {
            type: 'practice',
            intro: 'Find the remaining quantity after the given time (decay):',
            generate: () => DIFF_EQ.qDecayModel()
        },

        // ── 9. Example: Population Growth ────────────────────────
        {
            type: 'example',
            problem: 'A bacterial culture of 200 triples in 5 hours. Find the growth constant \\(k\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Model: \\(P(t) = 200e^{kt}\\).' },
                { text: '<strong>Step 2:</strong> After 5 hours: \\(600 = 200e^{5k}\\), so \\(e^{5k} = 3\\).' },
                { text: '<strong>Step 3:</strong> Take logs: \\(5k = \\ln 3\\), so \\(k = \\dfrac{\\ln 3}{5}\\).' },
                { text: '<strong>Answer:</strong> \\(k = \\dfrac{\\ln 3}{5} \\approx 0.2197\\).' }
            ]
        },

        // ── 10. Practice: Population Growth ──────────────────────
        {
            type: 'practice',
            intro: 'Model the population growth and find the required value:',
            generate: () => DIFF_EQ.qPopulationGrowth()
        },

        // ── 11. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Separable DE: \\(\\frac{dy}{dx}=f(x)g(y)\\) — separate, integrate, apply IC</li>' +
                '<li>Linear DE \\(\\frac{dy}{dx}=f(x)\\): integrate directly for \\(y\\)</li>' +
                '<li>Exponential model: \\(\\frac{dy}{dt}=ky \\Rightarrow y=y_0 e^{kt}\\)</li>' +
                '<li>\\(k>0\\): growth; \\(k<0\\): decay</li>' +
                '<li>Doubling time: \\(t=\\frac{\\ln 2}{k}\\)</li>' +
                '<li>Half-life: \\(t_{1/2}=\\frac{\\ln 2}{|k|}\\)</li>' +
                '<li>Always use the initial condition to find \\(C\\)</li>' +
                '</ul>'
        }
    ]
};
