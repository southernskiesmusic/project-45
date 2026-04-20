const LESSON_VEC_LINES = {
    id: 'vector-lines',
    title: 'Vector Equations of Lines',
    subtitle: 'Parametric equations, direction vectors, and intersections',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: Vector Equation of a Line ────────────────
        {
            type: 'concept',
            title: 'Vector Equation of a Line',
            content: '<p>A line in 2D or 3D can be described using a <strong>position vector</strong> and a <strong>direction vector</strong>:</p>' +
                '<div class="lesson-box">' +
                '\\(\\mathbf{r} = \\mathbf{a} + t\\,\\mathbf{b}\\)' +
                '<br><br>' +
                'where \\(\\mathbf{a}\\) is a point on the line, \\(\\mathbf{b}\\) is the direction vector, and \\(t \\in \\mathbb{R}\\) is the scalar parameter.' +
                '</div>' +
                '<p>In component form for a 2D line through \\((a_1, a_2)\\) with direction \\((b_1, b_2)\\):</p>' +
                '\\[\\begin{pmatrix}x\\\\y\\end{pmatrix} = \\begin{pmatrix}a_1\\\\a_2\\end{pmatrix} + t\\begin{pmatrix}b_1\\\\b_2\\end{pmatrix}\\]' +
                '<p>This gives <strong>parametric equations</strong>: \\(x = a_1 + tb_1\\), \\(y = a_2 + tb_2\\).</p>' +
                '<p><strong>Example:</strong> For \\(\\mathbf{r} = \\binom{1}{3} + t\\binom{2}{-1}\\), at \\(t=2\\): \\(x=5, y=1\\).</p>'
        },

        // ── 2. Practice: Point on Line ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the point on the line for the given t:',
            generate: () => VEC_LINES.qPointOnLine()
        },

        // ── 3. Practice: y-Coordinate on Line ────────────────────
        {
            type: 'practice',
            intro: 'Find the y-coordinate of the point on the line for the given t:',
            generate: () => VEC_LINES.qYCoordinateOnLine()
        },

        // ── 4. Example: Line Through Two Points ──────────────────
        {
            type: 'example',
            problem: 'Find the vector equation of the line through \\(A(1,2)\\) and \\(B(5,8)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Direction vector: \\(\\overrightarrow{AB} = B - A = \\binom{4}{6}\\).' },
                { text: '<strong>Step 2:</strong> Use point \\(A\\) as the base point.' },
                { text: '<strong>Answer:</strong> \\(\\mathbf{r} = \\begin{pmatrix}1\\\\2\\end{pmatrix} + t\\begin{pmatrix}4\\\\6\\end{pmatrix}\\), or equivalently use direction \\(\\binom{2}{3}\\).' }
            ]
        },

        // ── 5. Practice: Line from Two Points ────────────────────
        {
            type: 'practice',
            intro: 'Find the direction vector of the line through the two given points:',
            generate: () => VEC_LINES.qDirectionFromPoints()
        },

        // ── 6. Concept: Parallel Lines and Angles ────────────────
        {
            type: 'concept',
            title: 'Parallel Lines and Angle Between Lines',
            content: '<p>Two lines are <strong>parallel</strong> if their direction vectors are scalar multiples of each other:</p>' +
                '<div class="lesson-box">' +
                'Lines with directions \\(\\mathbf{b}_1\\) and \\(\\mathbf{b}_2\\) are parallel if \\(\\mathbf{b}_1 = k\\mathbf{b}_2\\) for some scalar \\(k\\).' +
                '</div>' +
                '<p>The <strong>angle \\(\\theta\\)</strong> between two lines with direction vectors \\(\\mathbf{b}_1\\) and \\(\\mathbf{b}_2\\) is:</p>' +
                '\\[\\cos\\theta = \\frac{|\\mathbf{b}_1 \\cdot \\mathbf{b}_2|}{|\\mathbf{b}_1||\\mathbf{b}_2|}\\]' +
                '<p>(Use the absolute value to get the acute angle.)</p>' +
                '<p><strong>Checking if a point lies on a line:</strong> Substitute the point into the parametric equations and check if a consistent value of \\(t\\) exists.</p>'
        },

        // ── 7. Practice: Parallel Lines ──────────────────────────
        {
            type: 'practice',
            intro: 'Determine the value of k that makes the lines parallel:',
            generate: () => VEC_LINES.qParallelLines()
        },

        // ── 8. Practice: Parameter for Point ─────────────────────
        {
            type: 'practice',
            intro: 'Find the parameter t for which the line passes through the given x-coordinate:',
            generate: () => VEC_LINES.qParameterForPoint()
        },

        // ── 9. Example: Check if Point Lies on Line ───────────────
        {
            type: 'example',
            problem: 'Does the point \\(P(7, 1)\\) lie on the line \\(\\mathbf{r} = \\binom{3}{5} + t\\binom{2}{-2}\\)?',
            steps: [
                { text: '<strong>Step 1:</strong> From the x-equation: \\(7 = 3 + 2t \\Rightarrow t = 2\\).' },
                { text: '<strong>Step 2:</strong> Check y-equation: \\(y = 5 + (-2)(2) = 5 - 4 = 1\\). ✓' },
                { text: '<strong>Answer:</strong> Yes, \\(P(7,1)\\) lies on the line (at \\(t = 2\\)).' }
            ]
        },

        // ── 10. Practice: Point on Line Check ────────────────────
        {
            type: 'practice',
            intro: 'Find the parameter t and verify whether the point lies on the line:',
            generate: () => VEC_LINES.qPointOnLineCheck()
        },

        // ── 11. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Vector equation: \\(\\mathbf{r} = \\mathbf{a} + t\\mathbf{b}\\) (\\(\\mathbf{a}\\) = point, \\(\\mathbf{b}\\) = direction)</li>' +
                '<li>Parametric form: \\(x = a_1+tb_1\\), \\(y = a_2+tb_2\\)</li>' +
                '<li>Direction from two points: \\(\\mathbf{b} = B - A\\)</li>' +
                '<li>Parallel lines: direction vectors are scalar multiples</li>' +
                '<li>Angle between lines: \\(\\cos\\theta = \\frac{|\\mathbf{b}_1\\cdot\\mathbf{b}_2|}{|\\mathbf{b}_1||\\mathbf{b}_2|}\\)</li>' +
                '<li>Point on line: substitute coordinates, check for consistent \\(t\\)</li>' +
                '<li>In 3D: extend to 3-component vectors; same principle applies</li>' +
                '</ul>'
        }
    ]
};
