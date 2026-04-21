const LESSON_SIM_QUAD = {
    id: 'simultaneous-quadratic',
    title: 'Simultaneous Equations with Quadratics',
    subtitle: 'Solving a linear and a quadratic equation simultaneously using substitution',
    screens: [
        {
            type: 'concept',
            title: 'Simultaneous Equations — Recap',
            content: '<p>Two equations with two unknowns must both be satisfied at the same time. When we solved two <em>linear</em> equations simultaneously, the solution is the <strong>intersection of two straight lines</strong>.</p>' +
                '<p>Now we extend this to one <strong>linear</strong> and one <strong>quadratic</strong> equation — the solution is the intersection of a line and a parabola.</p>' +
                '<div class="lesson-box"><strong>Three possible outcomes:</strong>' +
                '<ul>' +
                '<li><strong>2 solutions</strong> — line crosses the parabola at two points.</li>' +
                '<li><strong>1 solution</strong> — line is tangent to the parabola (touches at one point).</li>' +
                '<li><strong>0 solutions</strong> — line does not meet the parabola.</li>' +
                '</ul></div>'
        },
        {
            type: 'concept',
            title: 'Method: Substitution',
            content: '<p>The standard method is <strong>substitution</strong>:</p>' +
                '<ol>' +
                '<li>Make one variable the subject of the linear equation.</li>' +
                '<li>Substitute into the quadratic equation.</li>' +
                '<li>Rearrange into the form \\(ax^2 + bx + c = 0\\).</li>' +
                '<li>Solve by factorisation (or quadratic formula if needed).</li>' +
                '<li>Substitute back to find the other coordinate.</li>' +
                '</ol>' +
                '<div class="lesson-box"><strong>Tip:</strong> Always use the linear equation to substitute back — it\'s easier than the quadratic.</div>'
        },
        {
            type: 'example',
            title: 'Example: Two Intersection Points',
            problemMath: false,
            problem: 'Solve simultaneously: \\(y = x + 6\\) and \\(y = x^2\\).',
            steps: [
                { text: '<strong>Step 1:</strong> The linear equation already gives \\(y\\) in terms of \\(x\\).' },
                { text: '<strong>Step 2:</strong> Substitute \\(y = x + 6\\) into \\(y = x^2\\):<br>\\(x + 6 = x^2\\)' },
                { text: '<strong>Step 3:</strong> Rearrange to \\(ax^2 + bx + c = 0\\):<br>\\(x^2 - x - 6 = 0\\)' },
                { text: '<strong>Step 4:</strong> Factorise:<br>\\((x - 3)(x + 2) = 0\\)<br>So \\(x = 3\\) or \\(x = -2\\).' },
                { text: '<strong>Step 5:</strong> Find \\(y\\) using the linear equation \\(y = x + 6\\):<br>When \\(x = 3\\): \\(y = 9\\). When \\(x = -2\\): \\(y = 4\\).' },
                { text: '<strong>Answer:</strong> \\((3, 9)\\) and \\((-2, 4)\\)' }
            ]
        },
        {
            type: 'concept',
            title: 'Another Example Type',
            content: '<p>Sometimes the linear equation needs rearranging first.</p>' +
                '<p><strong>Example:</strong> Solve \\(x + y = 5\\) and \\(y = x^2 - 1\\).</p>' +
                '<p><strong>Step 1:</strong> From the linear equation: \\(y = 5 - x\\).</p>' +
                '<p><strong>Step 2:</strong> Substitute: \\(5 - x = x^2 - 1\\).</p>' +
                '<p><strong>Step 3:</strong> Rearrange: \\(x^2 + x - 6 = 0\\).</p>' +
                '<p><strong>Step 4:</strong> Factorise: \\((x+3)(x-2) = 0\\), so \\(x = -3\\) or \\(x = 2\\).</p>' +
                '<p><strong>Step 5:</strong> Use \\(y = 5 - x\\): when \\(x = -3\\), \\(y = 8\\); when \\(x = 2\\), \\(y = 3\\).</p>' +
                '<p><strong>Answer:</strong> \\((-3, 8)\\) and \\((2, 3)\\).</p>'
        },
        {
            type: 'concept',
            title: 'Tangent Lines: One Solution',
            content: '<p>When the line is <strong>tangent</strong> to the curve, the resulting quadratic has a <strong>repeated root</strong> (discriminant = 0).</p>' +
                '<p><strong>Example:</strong> Solve \\(y = x + 1\\) and \\(y = x^2 + 2x + 2\\).</p>' +
                '<p>\\(x + 1 = x^2 + 2x + 2\\) → \\(x^2 + x + 1 = 0\\).</p>' +
                '<p>Discriminant: \\(\\Delta = 1 - 4 = -3 < 0\\). No real solutions — the line doesn\'t intersect the parabola.</p>' +
                '<p>Now try \\(y = x + 2\\) and \\(y = x^2 + 2x + 2\\).</p>' +
                '<p>\\(x + 2 = x^2 + 2x + 2\\) → \\(x^2 + x = 0\\) → \\(x(x+1) = 0\\).</p>' +
                '<p>\\(x = 0\\) or \\(x = -1\\). Two solutions: \\((0, 2)\\) and \\((-1, 1)\\).</p>'
        },
        {
            type: 'example',
            title: 'Example: Substitution Method',
            problemMath: false,
            problem: 'Solve simultaneously: \\(y = 2x - 1\\) and \\(y = x^2 - 3x + 3\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Substitute \\(y = 2x - 1\\) into the quadratic:<br>\\(2x - 1 = x^2 - 3x + 3\\)' },
                { text: '<strong>Step 2:</strong> Rearrange: \\(x^2 - 5x + 4 = 0\\).' },
                { text: '<strong>Step 3:</strong> Factorise: \\((x-1)(x-4) = 0\\), so \\(x = 1\\) or \\(x = 4\\).' },
                { text: '<strong>Step 4:</strong> Use \\(y = 2x - 1\\):<br>When \\(x = 1\\): \\(y = 1\\). When \\(x = 4\\): \\(y = 7\\).' },
                { text: '<strong>Answer:</strong> \\((1, 1)\\) and \\((4, 7)\\)' }
            ]
        },
        {
            type: 'summary',
            title: 'Simultaneous Equations with Quadratics — Summary',
            html: '<ul>' +
                '<li><strong>Method:</strong> Substitute from the linear equation into the quadratic.</li>' +
                '<li><strong>Rearrange</strong> to \\(ax^2 + bx + c = 0\\), then factorise or use the quadratic formula.</li>' +
                '<li><strong>Find both coordinates</strong> — substitute each \\(x\\) value back into the linear equation to find \\(y\\).</li>' +
                '<li><strong>Number of solutions</strong> depends on the discriminant: 2 solutions (\\(\\Delta > 0\\)), tangent (\\(\\Delta = 0\\)), or none (\\(\\Delta < 0\\)).</li>' +
                '</ul>'
        }
    ]
};
