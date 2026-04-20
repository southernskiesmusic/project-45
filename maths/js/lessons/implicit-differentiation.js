const LESSON_IMPLICIT = {
    id: 'implicit-differentiation',
    title: 'Implicit Differentiation',
    subtitle: 'Differentiating implicitly, tangent lines and the chain rule',
    folder: 'calculus',
    screens: [
        {
            type: 'concept',
            title: 'Implicit Differentiation',
            content: '<p>When \\(y\\) is not explicitly defined as a function of \\(x\\), we differentiate <strong>implicitly</strong> using the chain rule:</p>' +
                '<div class="lesson-box">' +
                '\\(\\dfrac{d}{dx}[y^n] = n\\,y^{n-1}\\dfrac{dy}{dx}\\)<br><br>' +
                '\\(\\dfrac{d}{dx}[f(y)] = f\'(y)\\dfrac{dy}{dx}\\)' +
                '</div>' +
                '<p><strong>Method:</strong> differentiate both sides with respect to \\(x\\), treating \\(y\\) as a function of \\(x\\). Collect \\(dy/dx\\) terms and solve.</p>' +
                '<p><strong>Example:</strong> Differentiate \\(x^2 + y^2 = 25\\):</p>' +
                '<ul><li>\\(2x + 2y\\,\\frac{dy}{dx} = 0\\), so \\(\\frac{dy}{dx} = -\\frac{x}{y}\\)</li></ul>'
        },
        {
            type: 'practice',
            intro: 'Find dy/dx at the given x (for y = k - x²):',
            generate: () => IMPLICIT.qDiffX2Y()
        },
        {
            type: 'practice',
            intro: 'Find dy/dx by implicit differentiation (ax + by = c):',
            generate: () => IMPLICIT.qDiffLinearImplicit()
        },
        {
            type: 'example',
            problem: 'Find \\(dy/dx\\) for \\(x^2 + y^2 = 25\\) at the point \\((3,4)\\).',
            steps: [
                { text: '<strong>Differentiate:</strong> \\(2x + 2y\\,\\frac{dy}{dx} = 0\\).' },
                { text: '<strong>Solve:</strong> \\(\\frac{dy}{dx} = -\\frac{x}{y}\\).' },
                { text: '<strong>Substitute:</strong> \\(\\frac{dy}{dx}\\bigg|_{(3,4)} = -\\frac{3}{4}\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Find dy/dx at the point on the circle:',
            generate: () => IMPLICIT.qDiffCircle()
        },
        {
            type: 'practice',
            intro: 'Find dy/dx for the implicitly defined curve:',
            generate: () => IMPLICIT.qDiffY2()
        },
        {
            type: 'concept',
            title: 'Tangent Lines to Implicit Curves',
            content: '<p>Once \\(dy/dx\\) is found implicitly, use it to find the equation of a tangent line:</p>' +
                '<div class="lesson-box">' +
                'At point \\((x_0, y_0)\\):<br>' +
                '\\(m = \\left.\\dfrac{dy}{dx}\\right|_{(x_0,y_0)}\\)<br><br>' +
                'Tangent line: \\(y - y_0 = m(x - x_0)\\)' +
                '</div>' +
                '<p><strong>Product rule for implicit:</strong> \\(\\dfrac{d}{dx}[xy] = y + x\\dfrac{dy}{dx}\\)</p>' +
                '<p>For \\(xy = k\\): differentiate to get \\(y + x\\,dy/dx = 0\\), so \\(dy/dx = -y/x\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Find the slope of the tangent to the circle at the given point:',
            generate: () => IMPLICIT.qTangentSlope()
        },
        {
            type: 'practice',
            intro: 'Differentiate the product implicitly:',
            generate: () => IMPLICIT.qDiffXY()
        },
        {
            type: 'practice',
            intro: 'Find dy/dx for the implicit curve at the given point:',
            generate: () => IMPLICIT.qDiffX2Y2()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Implicit: differentiate both sides w.r.t. \\(x\\), attach \\(dy/dx\\) when differentiating \\(y\\)</li>' +
                '<li>\\(\\frac{d}{dx}[y^n] = ny^{n-1}\\frac{dy}{dx}\\)</li>' +
                '<li>\\(\\frac{d}{dx}[xy] = y + x\\frac{dy}{dx}\\) (product rule)</li>' +
                '<li>For circle \\(x^2+y^2=r^2\\): \\(dy/dx = -x/y\\)</li>' +
                '<li>Tangent slope: substitute point into \\(dy/dx\\) expression</li>' +
                '<li>Tangent line: \\(y-y_0 = m(x-x_0)\\)</li>' +
                '</ul>'
        }
    ]
};
