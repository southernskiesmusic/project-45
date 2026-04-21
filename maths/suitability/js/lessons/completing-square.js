const LESSON_QUADRATICS = {
    id: 'completing-square',
    title: 'Completing the Square',
    subtitle: 'Writing quadratics in vertex form, finding the vertex, and solving exactly',
    screens: [
        {
            type: 'concept',
            title: 'What is Completing the Square?',
            content: '<p>Any quadratic \\(ax^2 + bx + c\\) can be rewritten in <strong>vertex form</strong>:</p>' +
                '<div class="lesson-box">$$f(x) = a(x - h)^2 + k$$</div>' +
                '<p>where \\((h, k)\\) is the <strong>vertex</strong> of the parabola.</p>' +
                '<p>This form is extremely useful — it immediately tells us:</p>' +
                '<ul>' +
                '<li>The <strong>vertex</strong> \\((h, k)\\)</li>' +
                '<li>The <strong>axis of symmetry</strong>: \\(x = h\\)</li>' +
                '<li>Whether the parabola has a <strong>minimum</strong> (\\(a > 0\\)) or <strong>maximum</strong> (\\(a < 0\\))</li>' +
                '</ul>'
        },
        {
            type: 'concept',
            title: 'The Method (a = 1 case)',
            content: '<p>For \\(x^2 + bx + c\\) (leading coefficient 1):</p>' +
                '<div class="lesson-box"><strong>Steps:</strong>' +
                '<ol>' +
                '<li>Write \\(\\left(x + \\dfrac{b}{2}\\right)^2\\) — this expands to \\(x^2 + bx + \\dfrac{b^2}{4}\\).</li>' +
                '<li>Subtract the extra \\(\\dfrac{b^2}{4}\\) and add \\(c\\).</li>' +
                '</ol>' +
                '$$x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 - \\frac{b^2}{4} + c$$</div>' +
                '<p><strong>Example:</strong> \\(x^2 + 6x + 2\\)</p>' +
                '<p>\\(= (x + 3)^2 - 9 + 2 = (x + 3)^2 - 7\\)</p>' +
                '<p>Vertex: \\((-3, -7)\\). Axis of symmetry: \\(x = -3\\).</p>'
        },
        {
            type: 'example',
            title: 'Example: Completing the Square',
            problemMath: false,
            problem: 'Write \\(f(x) = x^2 - 8x + 5\\) in the form \\((x - p)^2 + q\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Halve the coefficient of \\(x\\): \\(\\dfrac{-8}{2} = -4\\).' },
                { text: '<strong>Step 2:</strong> Write \\((x - 4)^2\\). This expands to \\(x^2 - 8x + 16\\) — that\'s 16 too many.' },
                { text: '<strong>Step 3:</strong> Subtract 16 and add the original constant:<br>\\((x-4)^2 - 16 + 5 = (x-4)^2 - 11\\)' },
                { text: '<strong>Answer:</strong> \\((x-4)^2 - 11\\), so \\(p = 4\\) and \\(q = -11\\).' }
            ]
        },
        {
            type: 'concept',
            title: 'Reading Off the Vertex',
            content: '<p>Once the quadratic is in the form \\((x - h)^2 + k\\):</p>' +
                '<div class="lesson-box"><strong>Vertex:</strong> \\((h, k)\\)<br><strong>Axis of symmetry:</strong> \\(x = h\\)</div>' +
                '<p><strong>Important sign convention:</strong> In \\((x - h)^2 + k\\), the vertex x-coordinate is \\(h\\), not \\(-h\\).</p>' +
                '<p>Examples:</p>' +
                '<ul>' +
                '<li>\\((x - 3)^2 + 5\\) → vertex \\((3, 5)\\)</li>' +
                '<li>\\((x + 2)^2 - 7\\) = \\((x - (-2))^2 - 7\\) → vertex \\((-2, -7)\\)</li>' +
                '<li>\\((x - 4)^2 - 11\\) → vertex \\((4, -11)\\)</li>' +
                '</ul>'
        },
        {
            type: 'concept',
            title: 'Solving by Completing the Square',
            content: '<p>To solve \\(f(x) = 0\\) exactly (without the quadratic formula), use the vertex form:</p>' +
                '<ol>' +
                '<li>Write in vertex form: \\((x - h)^2 + k = 0\\).</li>' +
                '<li>Rearrange: \\((x - h)^2 = -k\\).</li>' +
                '<li>Square root both sides: \\(x - h = \\pm\\sqrt{-k}\\).</li>' +
                '<li>Add \\(h\\): \\(x = h \\pm \\sqrt{-k}\\).</li>' +
                '</ol>' +
                '<div class="lesson-box"><strong>Note:</strong> If \\(-k < 0\\), there are no real solutions (the parabola doesn\'t cross the x-axis).</div>' +
                '<p><strong>Example:</strong> Solve \\((x-4)^2 - 11 = 0\\).</p>' +
                '<p>\\((x-4)^2 = 11 \\Rightarrow x - 4 = \\pm\\sqrt{11} \\Rightarrow x = 4 \\pm \\sqrt{11}\\)</p>'
        },
        {
            type: 'example',
            title: 'Example: Solving Exactly',
            problemMath: false,
            problem: 'Solve \\(x^2 + 4x - 1 = 0\\), giving your answer in exact form.',
            steps: [
                { text: '<strong>Step 1:</strong> Complete the square: \\(x^2 + 4x - 1 = (x+2)^2 - 4 - 1 = (x+2)^2 - 5\\).' },
                { text: '<strong>Step 2:</strong> Set equal to zero: \\((x+2)^2 - 5 = 0\\).' },
                { text: '<strong>Step 3:</strong> Rearrange: \\((x+2)^2 = 5\\).' },
                { text: '<strong>Step 4:</strong> Square root: \\(x + 2 = \\pm\\sqrt{5}\\).' },
                { text: '<strong>Answer:</strong> \\(x = -2 + \\sqrt{5}\\) or \\(x = -2 - \\sqrt{5}\\).' }
            ]
        },
        {
            type: 'concept',
            title: 'When a ≠ 1',
            content: '<p>If the leading coefficient is not 1, factor it out first.</p>' +
                '<p><strong>Example:</strong> Complete the square for \\(2x^2 - 4x + 3\\).</p>' +
                '<p><strong>Step 1:</strong> Factor out 2 from the \\(x\\) terms:</p>' +
                '<p>\\(2(x^2 - 2x) + 3\\)</p>' +
                '<p><strong>Step 2:</strong> Complete the square inside the bracket:</p>' +
                '<p>\\(2\\left[(x-1)^2 - 1\\right] + 3\\)</p>' +
                '<p><strong>Step 3:</strong> Expand:</p>' +
                '<p>\\(2(x-1)^2 - 2 + 3 = 2(x-1)^2 + 1\\)</p>' +
                '<p>Vertex: \\((1, 1)\\). Minimum value is \\(1\\).</p>'
        },
        {
            type: 'summary',
            title: 'Completing the Square — Summary',
            html: '<ul>' +
                '<li><strong>Form:</strong> \\(x^2 + bx + c = \\left(x + \\dfrac{b}{2}\\right)^2 - \\dfrac{b^2}{4} + c\\)</li>' +
                '<li><strong>Vertex:</strong> from \\((x-h)^2 + k\\), vertex is \\((h, k)\\) — watch the sign of \\(h\\)!</li>' +
                '<li><strong>Axis of symmetry:</strong> \\(x = h\\)</li>' +
                '<li><strong>Solving:</strong> set \\((x-h)^2 = -k\\), then \\(x = h \\pm \\sqrt{-k}\\)</li>' +
                '<li><strong>a ≠ 1:</strong> factor \\(a\\) out of the \\(x\\) terms first</li>' +
                '</ul>'
        }
    ]
};
