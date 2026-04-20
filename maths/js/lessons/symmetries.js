const LESSON_SYMMETRIES = {
    id: 'symmetries',
    title: 'Symmetries of Functions',
    subtitle: 'Even and odd functions, axes of symmetry, reflections',
    folder: 'functions',
    screens: [
        {
            type: 'concept',
            title: 'Even and Odd Functions',
            content: '<p>Functions can have special symmetry properties:</p>' +
                '<div class="lesson-box">' +
                '<strong>Even function:</strong> \\(f(-x) = f(x)\\) for all \\(x\\) — symmetric about the \\(y\\)-axis<br>' +
                '<em>Examples: \\(x^2,\\, |x|,\\, \\cos x\\)</em><br><br>' +
                '<strong>Odd function:</strong> \\(f(-x) = -f(x)\\) for all \\(x\\) — symmetric about the origin<br>' +
                '<em>Examples: \\(x^3,\\, x,\\, \\sin x\\)</em>' +
                '</div>' +
                '<p>Most functions are <strong>neither</strong> even nor odd.</p>'
        },
        {
            type: 'practice',
            intro: 'Classify the function as even, odd, or neither:',
            generate: () => SYMMETRIES.qEvenOrOdd()
        },
        {
            type: 'practice',
            intro: 'Use the even function test to identify the function:',
            generate: () => SYMMETRIES.qEvenTest()
        },
        {
            type: 'example',
            problem: 'Show that \\(f(x) = x^3 - x\\) is an odd function.',
            steps: [
                { text: '<strong>Compute \\(f(-x)\\):</strong> \\(f(-x) = (-x)^3 - (-x) = -x^3 + x\\).' },
                { text: '<strong>Check:</strong> \\(-f(x) = -(x^3 - x) = -x^3 + x\\).' },
                { text: '<strong>Conclude:</strong> \\(f(-x) = -f(x)\\), so \\(f\\) is odd. \\(\\square\\)' }
            ]
        },
        {
            type: 'practice',
            intro: 'Use the odd function test:',
            generate: () => SYMMETRIES.qOddTest()
        },
        {
            type: 'practice',
            intro: 'Find the axis of symmetry of the parabola:',
            generate: () => SYMMETRIES.qSymmetryAxis()
        },
        {
            type: 'concept',
            title: 'Axes of Symmetry and Reflections',
            content: '<p>For a quadratic \\(f(x) = ax^2 + bx + c\\), the <strong>axis of symmetry</strong> is:</p>' +
                '<div class="lesson-box">' +
                '\\(x = -\\dfrac{b}{2a}\\)' +
                '</div>' +
                '<p><strong>Reflections:</strong></p>' +
                '<ul>' +
                '<li>Reflect \\((x, y)\\) in the <strong>y-axis</strong>: \\((-x, y)\\)</li>' +
                '<li>Reflect \\((x, y)\\) through the <strong>origin</strong>: \\((-x, -y)\\)</li>' +
                '</ul>' +
                '<p>If \\(f\\) is even: \\(f(a) = f(-a)\\). If \\(f\\) is odd: \\(f(-a) = -f(a)\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the vertex:',
            generate: () => SYMMETRIES.qVertexForm()
        },
        {
            type: 'practice',
            intro: 'Identify the order of rotational symmetry:',
            generate: () => SYMMETRIES.qRotationalSymmetry()
        },
        {
            type: 'practice',
            intro: 'Reflect the point in the y-axis — find the new x-coordinate:',
            generate: () => SYMMETRIES.qReflectYAxis()
        },
        {
            type: 'practice',
            intro: 'Use the even function property:',
            generate: () => SYMMETRIES.qEvenFunction()
        },
        {
            type: 'practice',
            intro: 'Use the odd function property:',
            generate: () => SYMMETRIES.qOddFunction()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Even: \\(f(-x)=f(x)\\) — y-axis symmetry (e.g. \\(x^2,\\cos x\\))</li>' +
                '<li>Odd: \\(f(-x)=-f(x)\\) — origin symmetry (e.g. \\(x^3,\\sin x\\))</li>' +
                '<li>Axis of symmetry of \\(ax^2+bx+c\\): \\(x=-b/(2a)\\)</li>' +
                '<li>Reflect in y-axis: \\((x,y)\\to(-x,y)\\)</li>' +
                '<li>Reflect in origin: \\((x,y)\\to(-x,-y)\\)</li>' +
                '<li>Even function: \\(f(-a)=f(a)\\); Odd: \\(f(-a)=-f(a)\\)</li>' +
                '</ul>'
        }
    ]
};
