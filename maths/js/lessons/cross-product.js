const LESSON_CROSS_PROD = {
    id: 'cross-product',
    title: 'Cross Product',
    subtitle: 'Vector product, area of parallelogram, and normal vectors',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: The Cross Product ────────────────────────
        {
            type: 'concept',
            title: 'The Cross Product',
            content: '<p>The <strong>cross product</strong> (vector product) of two 3D vectors gives a vector <em>perpendicular</em> to both:</p>' +
                '<div class="lesson-box">' +
                'For \\(\\mathbf{a} = \\begin{pmatrix}a_1\\\\a_2\\\\a_3\\end{pmatrix}\\) and \\(\\mathbf{b} = \\begin{pmatrix}b_1\\\\b_2\\\\b_3\\end{pmatrix}\\):<br><br>' +
                '\\(\\mathbf{a} \\times \\mathbf{b} = \\begin{pmatrix}a_2 b_3 - a_3 b_2\\\\a_3 b_1 - a_1 b_3\\\\a_1 b_2 - a_2 b_1\\end{pmatrix}\\)' +
                '</div>' +
                '<p><strong>Geometric meaning:</strong> \\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\), where \\(\\theta\\) is the angle between the vectors.</p>' +
                '<p><strong>Key property:</strong> \\(\\mathbf{a}\\times\\mathbf{b} = -(\\mathbf{b}\\times\\mathbf{a})\\) (anti-commutative)</p>'
        },

        // ── 2. Practice: x-component ─────────────────────────────
        {
            type: 'practice',
            intro: 'Find the x-component of the cross product a × b:',
            generate: () => CROSS_PROD.qCrossProductX()
        },

        // ── 3. Practice: y-component ─────────────────────────────
        {
            type: 'practice',
            intro: 'Find the y-component of the cross product a × b:',
            generate: () => CROSS_PROD.qCrossProductY()
        },

        // ── 4. Practice: z-component ─────────────────────────────
        {
            type: 'practice',
            intro: 'Find the z-component of the cross product a × b:',
            generate: () => CROSS_PROD.qCrossProductZ()
        },

        // ── 5. Example: Full Cross Product ───────────────────────
        {
            type: 'example',
            problem: 'Find \\(\\mathbf{a}\\times\\mathbf{b}\\) where \\(\\mathbf{a} = \\begin{pmatrix}1\\\\2\\\\3\\end{pmatrix}\\) and \\(\\mathbf{b} = \\begin{pmatrix}4\\\\5\\\\6\\end{pmatrix}\\).',
            steps: [
                { text: '<strong>i-component:</strong> \\(a_2 b_3 - a_3 b_2 = 2(6) - 3(5) = 12 - 15 = -3\\).' },
                { text: '<strong>j-component:</strong> \\(a_3 b_1 - a_1 b_3 = 3(4) - 1(6) = 12 - 6 = 6\\).' },
                { text: '<strong>k-component:</strong> \\(a_1 b_2 - a_2 b_1 = 1(5) - 2(4) = 5 - 8 = -3\\).' },
                { text: '<strong>Answer:</strong> \\(\\mathbf{a}\\times\\mathbf{b} = \\begin{pmatrix}-3\\\\6\\\\-3\\end{pmatrix}\\).' }
            ]
        },

        // ── 6. Practice: Full Cross Product ──────────────────────
        {
            type: 'practice',
            intro: 'Calculate the full cross product vector:',
            generate: () => CROSS_PROD.qCrossProductFull()
        },

        // ── 7. Concept: Area Applications ────────────────────────
        {
            type: 'concept',
            title: 'Area Using Cross Product',
            content: '<p>Since \\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\), the cross product gives areas directly:</p>' +
                '<div class="lesson-box">' +
                '<strong>Parallelogram</strong> with sides \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\):<br>' +
                '\\(\\text{Area} = |\\mathbf{a}\\times\\mathbf{b}|\\)<br><br>' +
                '<strong>Triangle</strong> with sides \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\):<br>' +
                '\\(\\text{Area} = \\tfrac{1}{2}|\\mathbf{a}\\times\\mathbf{b}|\\)' +
                '</div>' +
                '<p><strong>Normal to a plane:</strong> If vectors \\(\\mathbf{u}\\) and \\(\\mathbf{v}\\) lie in a plane, then \\(\\mathbf{u}\\times\\mathbf{v}\\) is a <strong>normal vector</strong> to that plane.</p>' +
                '<p><strong>Parallel vectors:</strong> If \\(\\mathbf{a}\\times\\mathbf{b} = \\mathbf{0}\\), then \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\) are parallel (\\(\\sin\\theta = 0\\)).</p>'
        },

        // ── 8. Practice: Area of Parallelogram ───────────────────
        {
            type: 'practice',
            intro: 'Find the area of the parallelogram formed by the two vectors:',
            generate: () => CROSS_PROD.qAreaParallelogram()
        },

        // ── 9. Practice: Area of Triangle ────────────────────────
        {
            type: 'practice',
            intro: 'Find the area of the triangle with two given sides as vectors:',
            generate: () => CROSS_PROD.qAreaTriangle()
        },

        // ── 10. Practice: Magnitude of Cross Product ─────────────
        {
            type: 'practice',
            intro: 'Find |a × b| using the geometric formula:',
            generate: () => CROSS_PROD.qMagnitudeCross()
        },

        // ── 11. Example: Normal to Plane ──────────────────────────
        {
            type: 'example',
            problem: 'Vectors \\(\\mathbf{u} = \\begin{pmatrix}1\\\\0\\\\2\\end{pmatrix}\\) and \\(\\mathbf{v} = \\begin{pmatrix}0\\\\1\\\\3\\end{pmatrix}\\) lie in a plane. Find a normal vector.',
            steps: [
                { text: '<strong>Step 1:</strong> Compute \\(\\mathbf{u}\\times\\mathbf{v}\\).' },
                { text: '<strong>Components:</strong> \\((0\\cdot3-2\\cdot1,\\; 2\\cdot0-1\\cdot3,\\; 1\\cdot1-0\\cdot0) = (-2,-3,1)\\).' },
                { text: '<strong>Answer:</strong> Normal vector is \\(\\begin{pmatrix}-2\\\\-3\\\\1\\end{pmatrix}\\).' }
            ]
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\mathbf{a}\\times\\mathbf{b} = (a_2b_3-a_3b_2,\\; a_3b_1-a_1b_3,\\; a_1b_2-a_2b_1)\\)</li>' +
                '<li>Result is perpendicular to both \\(\\mathbf{a}\\) and \\(\\mathbf{b}\\)</li>' +
                '<li>Anti-commutative: \\(\\mathbf{a}\\times\\mathbf{b} = -(\\mathbf{b}\\times\\mathbf{a})\\)</li>' +
                '<li>\\(|\\mathbf{a}\\times\\mathbf{b}| = |\\mathbf{a}||\\mathbf{b}|\\sin\\theta\\)</li>' +
                '<li>Area of parallelogram: \\(|\\mathbf{a}\\times\\mathbf{b}|\\)</li>' +
                '<li>Area of triangle: \\(\\frac{1}{2}|\\mathbf{a}\\times\\mathbf{b}|\\)</li>' +
                '<li>\\(\\mathbf{a}\\times\\mathbf{b} = \\mathbf{0} \\Rightarrow\\) vectors are parallel</li>' +
                '</ul>'
        }
    ]
};
