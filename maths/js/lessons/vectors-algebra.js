const LESSON_VECTORS = {
    id: 'vectors-algebra',
    title: 'Vector Algebra',
    subtitle: 'Magnitude, dot product, and angles between vectors',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: Vectors and Magnitude ─────────────────────
        {
            type: 'concept',
            title: 'Vectors and Magnitude',
            content: '<p>A <strong>vector</strong> is a directed quantity with both magnitude and direction. Vectors are described by their components:</p>' +
                '<div class="lesson-box">' +
                '<strong>2D:</strong> \\(\\mathbf{v} = (x, y)\\) &nbsp;&nbsp; <strong>3D:</strong> \\(\\mathbf{v} = (x, y, z)\\)<br><br>' +
                '<strong>Magnitude (length):</strong><br>' +
                '\\(|\\mathbf{v}| = \\sqrt{x^2 + y^2}\\) &nbsp; (2D)<br>' +
                '\\(|\\mathbf{v}| = \\sqrt{x^2 + y^2 + z^2}\\) &nbsp; (3D)<br><br>' +
                '<strong>Unit vector:</strong> \\(\\hat{\\mathbf{u}} = \\dfrac{\\mathbf{v}}{|\\mathbf{v}|}\\) &nbsp; (magnitude = 1)' +
                '</div>' +
                '<p>A <strong>unit vector</strong> points in the same direction as \\(\\mathbf{v}\\) but has length 1. To find it, divide each component by \\(|\\mathbf{v}|\\).</p>' +
                '<ul>' +
                '<li>If \\(\\mathbf{v} = (3, 4)\\), then \\(|\\mathbf{v}| = \\sqrt{9 + 16} = 5\\)</li>' +
                '<li>Unit vector: \\(\\hat{\\mathbf{u}} = \\left(\\dfrac{3}{5},\\, \\dfrac{4}{5}\\right)\\)</li>' +
                '</ul>'
        },

        // ── 2. Practice: Magnitude of 2D Vector ───────────────────
        {
            type: 'practice',
            intro: 'Find the magnitude of the 2D vector:',
            generate: () => VECTORS.qMagnitude2D()
        },

        // ── 3. Practice: Magnitude of 3D Vector ───────────────────
        {
            type: 'practice',
            intro: 'Find the magnitude of the 3D vector:',
            generate: () => VECTORS.qMagnitude3D()
        },

        // ── 4. Practice: Unit Vector Component ────────────────────
        {
            type: 'practice',
            intro: 'Find the unit vector component:',
            generate: () => VECTORS.qUnitVector()
        },

        // ── 5. Concept: Vector Operations ─────────────────────────
        {
            type: 'concept',
            title: 'Vector Operations',
            content: '<p>Vectors can be combined and scaled using standard operations, all applied <strong>component-wise</strong>:</p>' +
                '<div class="lesson-box">' +
                '<strong>Addition / subtraction:</strong> \\((a_1, a_2, a_3) \\pm (b_1, b_2, b_3) = (a_1 \\pm b_1,\\; a_2 \\pm b_2,\\; a_3 \\pm b_3)\\)<br><br>' +
                '<strong>Scalar multiple:</strong> \\(k\\mathbf{v} = (kx,\\; ky,\\; kz)\\) — stretches or shrinks the vector<br><br>' +
                '<strong>Vector \\(\\overrightarrow{AB}\\):</strong> \\(\\overrightarrow{AB} = B - A\\)<br><br>' +
                '<strong>Midpoint of AB:</strong> \\(M = \\dfrac{1}{2}(A + B)\\)' +
                '</div>' +
                '<p>Note: \\(\\overrightarrow{AB}\\) is the displacement from point \\(A\\) to point \\(B\\). Its magnitude \\(|\\overrightarrow{AB}|\\) gives the distance between \\(A\\) and \\(B\\).</p>'
        },

        // ── 6. Example: Vector from A to B ────────────────────────
        {
            type: 'example',
            problem: 'Given \\(A = (1, 3, 2)\\) and \\(B = (4, 1, 5)\\), find \\(\\overrightarrow{AB}\\) and its magnitude.',
            steps: [
                { text: '<strong>Step 1:</strong> \\(\\overrightarrow{AB} = B - A = (4-1,\\; 1-3,\\; 5-2) = (3, -2, 3)\\).' },
                { text: '<strong>Step 2:</strong> \\(|\\overrightarrow{AB}| = \\sqrt{3^2 + (-2)^2 + 3^2} = \\sqrt{9 + 4 + 9} = \\sqrt{22}\\).' },
                { text: '<strong>Answer:</strong> \\(\\overrightarrow{AB} = (3, -2, 3)\\), &nbsp; \\(|\\overrightarrow{AB}| = \\sqrt{22}\\).' }
            ]
        },

        // ── 7. Practice: x-component of AB ────────────────────────
        {
            type: 'practice',
            intro: 'Find the x-component of vector AB:',
            generate: () => VECTORS.qVectorAB()
        },

        // ── 8. Practice: Scalar Multiple Magnitude ────────────────
        {
            type: 'practice',
            intro: 'Find the magnitude after scalar multiplication:',
            generate: () => VECTORS.qScalarMultiple()
        },

        // ── 9. Practice: Midpoint x-coordinate ────────────────────
        {
            type: 'practice',
            intro: 'Find the x-coordinate of the midpoint:',
            generate: () => VECTORS.qMidpoint()
        },

        // ── 10. Concept: Dot Product and Angles ───────────────────
        {
            type: 'concept',
            title: 'Dot Product and Angles',
            content: '<p>The <strong>dot product</strong> (scalar product) of two vectors is a single number:</p>' +
                '<div class="lesson-box">' +
                '<strong>Component form:</strong> \\(\\mathbf{a} \\cdot \\mathbf{b} = x_1 x_2 + y_1 y_2 + z_1 z_2\\)<br><br>' +
                '<strong>Geometric form:</strong> \\(\\mathbf{a} \\cdot \\mathbf{b} = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta\\)<br><br>' +
                '<strong>Angle between vectors:</strong> \\(\\cos\\theta = \\dfrac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}\\)<br><br>' +
                '<strong>Perpendicular</strong> \\(\\iff \\mathbf{a} \\cdot \\mathbf{b} = 0\\) &nbsp; (since \\(\\cos 90° = 0\\))<br>' +
                '<strong>Parallel</strong> \\(\\iff \\mathbf{a} = k\\mathbf{b}\\) for some scalar \\(k\\)' +
                '</div>' +
                '<p>The dot product is commutative: \\(\\mathbf{a} \\cdot \\mathbf{b} = \\mathbf{b} \\cdot \\mathbf{a}\\).</p>'
        },

        // ── 11. Example: Angle Between Two Vectors ────────────────
        {
            type: 'example',
            problem: 'Find the angle between \\(\\mathbf{a} = (1, 2)\\) and \\(\\mathbf{b} = (2, -1)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Compute the dot product: \\(\\mathbf{a} \\cdot \\mathbf{b} = (1)(2) + (2)(-1) = 2 - 2 = 0\\).' },
                { text: '<strong>Step 2:</strong> Since \\(\\mathbf{a} \\cdot \\mathbf{b} = 0\\), we have \\(\\cos\\theta = 0\\).' },
                { text: '<strong>Answer:</strong> The vectors are <strong>perpendicular</strong> (\\(\\theta = 90°\\)).' }
            ]
        },

        // ── 12. Practice: Dot Product 2D ──────────────────────────
        {
            type: 'practice',
            intro: 'Find the dot product of the 2D vectors:',
            generate: () => VECTORS.qDotProduct2D()
        },

        // ── 13. Practice: Dot Product 3D ──────────────────────────
        {
            type: 'practice',
            intro: 'Find the dot product of the 3D vectors:',
            generate: () => VECTORS.qDotProduct3D()
        },

        // ── 14. Practice: Angle Between Vectors ───────────────────
        {
            type: 'practice',
            intro: 'Find the angle between the vectors:',
            generate: () => VECTORS.qAngleBetween()
        },

        // ── 15. Practice: Perpendicular / Parallel / Neither ──────
        {
            type: 'practice',
            intro: 'Are the vectors perpendicular, parallel, or neither?',
            generate: () => VECTORS.qPerpendicularCheck()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(|\\mathbf{v}| = \\sqrt{\\sum v_i^2}\\) — magnitude is the square root of the sum of squared components</li>' +
                '<li>\\(\\hat{\\mathbf{u}} = \\mathbf{v} / |\\mathbf{v}|\\) — unit vector has magnitude 1</li>' +
                '<li>\\(\\overrightarrow{AB} = B - A\\) — displacement vector from \\(A\\) to \\(B\\)</li>' +
                '<li>Midpoint \\(= \\frac{1}{2}(A + B)\\) — average of position vectors</li>' +
                '<li>\\(\\mathbf{a} \\cdot \\mathbf{b} = \\sum a_i b_i\\) — dot product is sum of component products</li>' +
                '<li>\\(\\cos\\theta = \\dfrac{\\mathbf{a} \\cdot \\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}\\) — angle from dot product formula</li>' +
                '<li>Perpendicular: \\(\\mathbf{a} \\cdot \\mathbf{b} = 0\\)</li>' +
                '<li>Parallel: \\(\\mathbf{a} = k\\mathbf{b}\\) for some scalar \\(k\\)</li>' +
                '</ul>'
        }
    ]
};
