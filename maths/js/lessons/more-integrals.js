const LESSON_MORE_INT = {
    id: 'more-integrals',
    title: 'Further Integration',
    subtitle: 'Trig integrals, 1/x, e^(ax), substitution and arctan',
    folder: 'calculus',
    screens: [
        {
            type: 'concept',
            title: 'Standard Integral Forms',
            content: '<p>The following are key integrals beyond basic polynomials:</p>' +
                '<div class="lesson-box">' +
                '\\(\\int \\sin(ax)\\,dx = -\\dfrac{\\cos(ax)}{a} + C\\)<br><br>' +
                '\\(\\int \\cos(ax)\\,dx = \\dfrac{\\sin(ax)}{a} + C\\)<br><br>' +
                '\\(\\int e^{ax}\\,dx = \\dfrac{e^{ax}}{a} + C\\)<br><br>' +
                '\\(\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C\\)<br><br>' +
                '\\(\\int \\dfrac{1}{1+x^2}\\,dx = \\arctan(x) + C\\)' +
                '</div>'
        },
        {
            type: 'practice',
            intro: 'Find the coefficient of cos(bx) after integrating sin(bx):',
            generate: () => MORE_INT.qIntegrateSin()
        },
        {
            type: 'practice',
            intro: 'Find the coefficient of sin(bx) after integrating cos(bx):',
            generate: () => MORE_INT.qIntegrateCos()
        },
        {
            type: 'practice',
            intro: 'Find the coefficient in the antiderivative of the exponential:',
            generate: () => MORE_INT.qIntegrateExp()
        },
        {
            type: 'example',
            problem: 'Evaluate \\(\\displaystyle\\int_0^{\\pi/2} \\sin x\\,dx\\).',
            steps: [
                { text: '<strong>Antiderivative:</strong> \\(-\\cos x\\).' },
                { text: '<strong>Evaluate:</strong> \\([-\\cos x]_0^{\\pi/2} = -\\cos(\\pi/2) + \\cos(0)\\).' },
                { text: '<strong>Answer:</strong> \\(= 0 + 1 = 1\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Evaluate the definite integral of sin:',
            generate: () => MORE_INT.qDefiniteSin()
        },
        {
            type: 'concept',
            title: 'Integration by Substitution',
            content: '<p><strong>Substitution</strong> (u-substitution) reverses the chain rule:</p>' +
                '<div class="lesson-box">' +
                'Let \\(u = g(x)\\), then \\(du = g\'(x)\\,dx\\):<br><br>' +
                '\\(\\displaystyle\\int f(g(x))\\,g\'(x)\\,dx = \\int f(u)\\,du\\)' +
                '</div>' +
                '<p><strong>Example:</strong> \\(\\int 2x(x^2+1)^3\\,dx\\). Let \\(u=x^2+1\\), \\(du=2x\\,dx\\):</p>' +
                '\\[\\int u^3\\,du = \\frac{u^4}{4} + C = \\frac{(x^2+1)^4}{4} + C\\]' +
                '<p>Also: \\(\\int \\dfrac{2x}{x^2+1}\\,dx = \\ln(x^2+1) + C\\) (using \\(u=x^2+1\\)).</p>'
        },
        {
            type: 'practice',
            intro: 'Identify the correct antiderivative after substitution:',
            generate: () => MORE_INT.qIntegrateBySubstitution()
        },
        {
            type: 'practice',
            intro: 'Identify the antiderivative involving arctan:',
            generate: () => MORE_INT.qIntegrate1Over1PlusX2()
        },
        {
            type: 'practice',
            intro: 'Evaluate the definite integral of e^(ax):',
            generate: () => MORE_INT.qIntegrateExpDefinite()
        },
        {
            type: 'example',
            problem: 'Evaluate \\(\\displaystyle\\int_0^1 \\frac{2x}{x^2+1}\\,dx\\).',
            steps: [
                { text: '<strong>Let:</strong> \\(u = x^2+1\\), \\(du = 2x\\,dx\\). When \\(x=0\\): \\(u=1\\); when \\(x=1\\): \\(u=2\\).' },
                { text: '<strong>Integral:</strong> \\(\\int_1^2 \\frac{1}{u}\\,du = [\\ln u]_1^2 = \\ln 2 - \\ln 1\\).' },
                { text: '<strong>Answer:</strong> \\(\\ln 2 \\approx 0.693\\).' }
            ]
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\int\\sin(ax)\\,dx = -\\cos(ax)/a + C\\)</li>' +
                '<li>\\(\\int\\cos(ax)\\,dx = \\sin(ax)/a + C\\)</li>' +
                '<li>\\(\\int e^{ax}\\,dx = e^{ax}/a + C\\)</li>' +
                '<li>\\(\\int 1/x\\,dx = \\ln|x| + C\\)</li>' +
                '<li>\\(\\int 1/(1+x^2)\\,dx = \\arctan(x) + C\\)</li>' +
                '<li>Substitution: \\(u=g(x)\\), \\(du=g\'(x)\\,dx\\), rewrite and integrate</li>' +
                '<li>\\(\\int 2x/(x^2+1)\\,dx = \\ln(x^2+1)+C\\)</li>' +
                '</ul>'
        }
    ]
};
