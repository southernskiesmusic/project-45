const LESSON_REL_RATES = {
    id: 'related-rates',
    title: 'Related Rates',
    subtitle: 'Connected rates of change using the chain rule',
    folder: 'calculus',
    screens: [
        {
            type: 'concept',
            title: 'Related Rates',
            content: '<p>When two quantities are related by an equation, their rates of change (with respect to time) are also related. We use the <strong>chain rule</strong>:</p>' +
                '<div class="lesson-box">' +
                'If \\(A = f(r)\\) and \\(r\\) changes with time:<br><br>' +
                '\\(\\dfrac{dA}{dt} = \\dfrac{dA}{dr} \\cdot \\dfrac{dr}{dt}\\)' +
                '</div>' +
                '<p><strong>Strategy:</strong></p>' +
                '<ol>' +
                '<li>Write the relationship between the variables (e.g. \\(A = \\pi r^2\\))</li>' +
                '<li>Differentiate both sides with respect to \\(t\\)</li>' +
                '<li>Substitute known values and solve for the unknown rate</li>' +
                '</ol>'
        },
        {
            type: 'practice',
            intro: 'Find the rate of change of area (linear relationship):',
            generate: () => REL_RATES.qLinearRate()
        },
        {
            type: 'practice',
            intro: 'Find dA/dt for the square:',
            generate: () => REL_RATES.qSquareArea()
        },
        {
            type: 'example',
            problem: 'A circle\'s radius grows at 2 cm/s. Find the rate of increase of area when \\(r = 5\\) cm.',
            steps: [
                { text: '<strong>Relationship:</strong> \\(A = \\pi r^2\\).' },
                { text: '<strong>Differentiate:</strong> \\(\\dfrac{dA}{dt} = 2\\pi r \\dfrac{dr}{dt}\\).' },
                { text: '<strong>Substitute:</strong> \\(r=5\\), \\(dr/dt=2\\): \\(\\dfrac{dA}{dt} = 2\\pi(5)(2) = 20\\pi\\) cm²/s.' }
            ]
        },
        {
            type: 'practice',
            intro: 'Find dA/dt for the expanding circle:',
            generate: () => REL_RATES.qCircleArea()
        },
        {
            type: 'practice',
            intro: 'Find dC/dt for the circle\'s circumference:',
            generate: () => REL_RATES.qCircleCircumference()
        },
        {
            type: 'concept',
            title: 'Volume and 3D Rate Problems',
            content: '<p>The same chain rule approach applies to volume problems:</p>' +
                '<div class="lesson-box">' +
                '<strong>Sphere:</strong> \\(V = \\tfrac{4}{3}\\pi r^3 \\Rightarrow \\dfrac{dV}{dt} = 4\\pi r^2 \\dfrac{dr}{dt}\\)<br><br>' +
                '<strong>Cylinder (fixed r):</strong> \\(V = \\pi r^2 h \\Rightarrow \\dfrac{dV}{dt} = \\pi r^2 \\dfrac{dh}{dt}\\)' +
                '</div>' +
                '<p><strong>Pythagorean related rates:</strong> For a right triangle with \\(x^2+y^2=L^2\\):</p>' +
                '\\[2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{x}{y}\\frac{dx}{dt}\\]'
        },
        {
            type: 'practice',
            intro: 'Find dV/dt for the expanding sphere:',
            generate: () => REL_RATES.qVolumeOfSphere()
        },
        {
            type: 'practice',
            intro: 'Find dy/dt using the chain rule:',
            generate: () => REL_RATES.qChainRule()
        },
        {
            type: 'practice',
            intro: 'Find dy/dt for the sliding ladder:',
            generate: () => REL_RATES.qPythagorean()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Chain rule for rates: \\(\\frac{dA}{dt} = \\frac{dA}{dr}\\cdot\\frac{dr}{dt}\\)</li>' +
                '<li>Circle area: \\(dA/dt = 2\\pi r\\cdot dr/dt\\)</li>' +
                '<li>Circumference: \\(dC/dt = 2\\pi\\cdot dr/dt\\)</li>' +
                '<li>Sphere volume: \\(dV/dt = 4\\pi r^2\\cdot dr/dt\\)</li>' +
                '<li>Cylinder: \\(dV/dt = \\pi r^2\\cdot dh/dt\\)</li>' +
                '<li>Pythagorean: differentiate \\(x^2+y^2=L^2\\) w.r.t. \\(t\\)</li>' +
                '<li>Always substitute known values after differentiating</li>' +
                '</ul>'
        }
    ]
};
