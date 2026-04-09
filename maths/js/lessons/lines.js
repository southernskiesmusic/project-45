const LESSON_LINES = {
    id: 'lines',
    title: 'Lines',
    subtitle: 'Gradient, equations, parallel & perpendicular lines',
    folder: 'functions',
    screens: [
        // ── 1. Concept: What is Gradient? ──────────────────────────
        {
            type: 'concept',
            title: 'What is Gradient?',
            content: '<p>The <strong>gradient</strong> (or slope) of a line measures its steepness. It tells us how much the line rises or falls for every unit it moves horizontally.</p>' +
                '<div class="lesson-box"><strong>Gradient Formula:</strong> \\(m = \\dfrac{y_2 - y_1}{x_2 - x_1} = \\dfrac{\\text{rise}}{\\text{run}}\\)</div>' +
                '<p>Key facts about gradient:</p>' +
                '<ul>' +
                '<li><strong>Positive gradient</strong> \\((m > 0)\\) - the line slopes upward from left to right</li>' +
                '<li><strong>Negative gradient</strong> \\((m < 0)\\) - the line slopes downward from left to right</li>' +
                '<li><strong>Zero gradient</strong> \\((m = 0)\\) - the line is horizontal</li>' +
                '<li><strong>Undefined gradient</strong> - the line is vertical (division by zero in the formula)</li>' +
                '</ul>'
        },

        // ── 2. Example: Calculate Gradient ─────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Find the gradient of the line through \\(A(2, 3)\\) and \\(B(8, 15)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the coordinates. Let \\((x_1, y_1) = (2, 3)\\) and \\((x_2, y_2) = (8, 15)\\).' },
                { text: '<strong>Step 2:</strong> Apply the gradient formula: \\(m = \\dfrac{y_2 - y_1}{x_2 - x_1}\\)' },
                { text: '<strong>Step 3:</strong> Substitute: \\(m = \\dfrac{15 - 3}{8 - 2} = \\dfrac{12}{6} = 2\\)' },
                { text: '<strong>Answer:</strong> The gradient is \\(m = 2\\). The line rises 2 units for every 1 unit across.' }
            ]
        },

        // ── 3. Practice: Gradient ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the gradient of the line through the two given points:',
            generate: () => LINES.qGradient()
        },

        // ── 4. Concept: Midpoint ───────────────────────────────────
        {
            type: 'concept',
            title: 'Midpoint of a Line Segment',
            content: '<p>The <strong>midpoint</strong> is the point exactly halfway between two endpoints. You find it by averaging the \\(x\\)-coordinates and averaging the \\(y\\)-coordinates.</p>' +
                '<div class="lesson-box"><strong>Midpoint Formula:</strong> \\(M = \\left(\\dfrac{x_1 + x_2}{2},\\; \\dfrac{y_1 + y_2}{2}\\right)\\)</div>' +
                '<p>Think of it as finding the mean of each coordinate pair. The midpoint always lies on the line segment connecting the two points.</p>'
        },

        // ── 5. Example: Find Midpoint ──────────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Find the midpoint of the segment joining \\(P(-4, 7)\\) and \\(Q(6, 1)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the coordinates. Let \\((x_1, y_1) = (-4, 7)\\) and \\((x_2, y_2) = (6, 1)\\).' },
                { text: '<strong>Step 2:</strong> Apply the midpoint formula: \\(M = \\left(\\dfrac{x_1 + x_2}{2},\\; \\dfrac{y_1 + y_2}{2}\\right)\\)' },
                { text: '<strong>Step 3:</strong> Substitute: \\(M = \\left(\\dfrac{-4 + 6}{2},\\; \\dfrac{7 + 1}{2}\\right) = \\left(\\dfrac{2}{2},\\; \\dfrac{8}{2}\\right) = (1, 4)\\)' },
                { text: '<strong>Answer:</strong> The midpoint is \\(M(1, 4)\\).' }
            ]
        },

        // ── 6. Practice: Midpoint ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the midpoint of the segment joining the two given points:',
            generate: () => LINES.qMidpoint()
        },

        // ── 7. Concept: Distance ───────────────────────────────────
        {
            type: 'concept',
            title: 'Distance Between Two Points',
            content: '<p>The <strong>distance formula</strong> gives the straight-line distance between two points in the coordinate plane. It is derived from the Pythagorean theorem.</p>' +
                '<div class="lesson-box"><strong>Distance Formula:</strong> \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)</div>' +
                '<p>The horizontal difference \\((x_2 - x_1)\\) and vertical difference \\((y_2 - y_1)\\) form the two legs of a right triangle. The distance is the hypotenuse.</p>' +
                '<p>In IB exams, leave your answer in exact form (e.g. \\(\\sqrt{52} = 2\\sqrt{13}\\)) unless told otherwise.</p>'
        },

        // ── 8. Example: Find Distance ──────────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Find the distance between \\(A(1, -2)\\) and \\(B(4, 6)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the coordinates. Let \\((x_1, y_1) = (1, -2)\\) and \\((x_2, y_2) = (4, 6)\\).' },
                { text: '<strong>Step 2:</strong> Apply the distance formula: \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)' },
                { text: '<strong>Step 3:</strong> Substitute: \\(d = \\sqrt{(4 - 1)^2 + (6 - (-2))^2} = \\sqrt{3^2 + 8^2} = \\sqrt{9 + 64} = \\sqrt{73}\\)' },
                { text: '<strong>Answer:</strong> The distance is \\(d = \\sqrt{73} \\approx 8.54\\) units.' }
            ]
        },

        // ── 9. Practice: Distance ──────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the exact distance between the two given points:',
            generate: () => LINES.qDistance()
        },

        // ── 10. Concept: Equation of a Line ────────────────────────
        {
            type: 'concept',
            title: 'Equation of a Line',
            content: '<p>There are three standard forms for the equation of a straight line:</p>' +
                '<div class="lesson-box">' +
                '<strong>Slope-intercept form:</strong> \\(y = mx + c\\)<br>' +
                'where \\(m\\) is the gradient and \\(c\\) is the \\(y\\)-intercept.' +
                '</div>' +
                '<div class="lesson-box">' +
                '<strong>Point-slope form:</strong> \\(y - y_1 = m(x - x_1)\\)<br>' +
                'Useful when you know the gradient and one point on the line.' +
                '</div>' +
                '<div class="lesson-box">' +
                '<strong>General form:</strong> \\(ax + by + d = 0\\)<br>' +
                'where \\(a\\), \\(b\\), and \\(d\\) are integers (IB convention).' +
                '</div>' +
                '<p>To find the equation of a line, you need either:</p>' +
                '<ul>' +
                '<li>a gradient and a point, or</li>' +
                '<li>two points (find the gradient first, then use point-slope form).</li>' +
                '</ul>'
        },

        // ── 11. Example: Equation from Two Points ──────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Find the equation of the line through \\(A(1, 5)\\) and \\(B(4, -1)\\). Give your answer in the form \\(y = mx + c\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the gradient. \\(m = \\dfrac{-1 - 5}{4 - 1} = \\dfrac{-6}{3} = -2\\)' },
                { text: '<strong>Step 2:</strong> Use point-slope form with \\(A(1, 5)\\): \\(y - 5 = -2(x - 1)\\)' },
                { text: '<strong>Step 3:</strong> Expand and simplify: \\(y - 5 = -2x + 2\\), so \\(y = -2x + 7\\)' },
                { text: '<strong>Answer:</strong> The equation of the line is \\(y = -2x + 7\\).' }
            ]
        },

        // ── 12. Practice: Equation ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the equation of the line through the two given points:',
            generate: () => LINES.qEquationFromPoints()
        },

        // ── 13. Concept: Parallel Lines ────────────────────────────
        {
            type: 'concept',
            title: 'Parallel Lines',
            content: '<p>Two lines are <strong>parallel</strong> if they never intersect. Parallel lines have the same gradient but different \\(y\\)-intercepts.</p>' +
                '<div class="lesson-box"><strong>Parallel Condition:</strong> Lines are parallel if and only if \\(m_1 = m_2\\)</div>' +
                '<p>To find a parallel line through a given point:</p>' +
                '<ol>' +
                '<li>Identify the gradient of the original line.</li>' +
                '<li>Use that same gradient with the new point in point-slope form.</li>' +
                '</ol>' +
                '<p>For example, any line parallel to \\(y = 3x + 1\\) must have gradient \\(m = 3\\).</p>'
        },

        // ── 14. Example: Parallel Line Through a Point ─────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Find the equation of the line parallel to \\(y = 3x - 4\\) that passes through \\((2, 7)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the gradient of the given line. From \\(y = 3x - 4\\), the gradient is \\(m = 3\\).' },
                { text: '<strong>Step 2:</strong> A parallel line has the same gradient, so \\(m = 3\\).' },
                { text: '<strong>Step 3:</strong> Use point-slope form with \\((2, 7)\\): \\(y - 7 = 3(x - 2)\\)' },
                { text: '<strong>Step 4:</strong> Expand: \\(y - 7 = 3x - 6\\), so \\(y = 3x + 1\\)' },
                { text: '<strong>Answer:</strong> The equation of the parallel line is \\(y = 3x + 1\\).' }
            ]
        },

        // ── 15. Practice: Parallel ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the equation of the parallel line through the given point:',
            generate: () => LINES.qParallel()
        },

        // ── 16. Concept: Perpendicular Lines ───────────────────────
        {
            type: 'concept',
            title: 'Perpendicular Lines',
            content: '<p>Two lines are <strong>perpendicular</strong> if they meet at a right angle (90 degrees). Their gradients are related by the negative reciprocal.</p>' +
                '<div class="lesson-box"><strong>Perpendicular Condition:</strong> Lines are perpendicular if and only if \\(m_1 \\times m_2 = -1\\)<br><br>' +
                'Equivalently: \\(m_2 = -\\dfrac{1}{m_1}\\)</div>' +
                '<p>Examples of perpendicular gradient pairs:</p>' +
                '<ul>' +
                '<li>If \\(m_1 = 2\\), then \\(m_2 = -\\dfrac{1}{2}\\)</li>' +
                '<li>If \\(m_1 = -\\dfrac{3}{4}\\), then \\(m_2 = \\dfrac{4}{3}\\)</li>' +
                '<li>If \\(m_1 = 1\\), then \\(m_2 = -1\\)</li>' +
                '</ul>'
        },

        // ── 17. Example: Perpendicular Line ────────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Find the equation of the line perpendicular to \\(y = \\dfrac{2}{5}x + 3\\) that passes through \\((4, -1)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the gradient of the given line. From \\(y = \\dfrac{2}{5}x + 3\\), the gradient is \\(m_1 = \\dfrac{2}{5}\\).' },
                { text: '<strong>Step 2:</strong> Find the perpendicular gradient: \\(m_2 = -\\dfrac{1}{m_1} = -\\dfrac{5}{2}\\)' },
                { text: '<strong>Step 3:</strong> Use point-slope form with \\((4, -1)\\): \\(y - (-1) = -\\dfrac{5}{2}(x - 4)\\)' },
                { text: '<strong>Step 4:</strong> Expand: \\(y + 1 = -\\dfrac{5}{2}x + 10\\), so \\(y = -\\dfrac{5}{2}x + 9\\)' },
                { text: '<strong>Answer:</strong> The equation of the perpendicular line is \\(y = -\\dfrac{5}{2}x + 9\\).' }
            ]
        },

        // ── 18. Practice: Perpendicular ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the equation of the perpendicular line through the given point:',
            generate: () => LINES.qPerpendicular()
        },

        // ── 19. Concept: Perpendicular Bisector ────────────────────
        {
            type: 'concept',
            title: 'Perpendicular Bisector',
            content: '<p>The <strong>perpendicular bisector</strong> of a line segment is a line that:</p>' +
                '<ul>' +
                '<li>passes through the <strong>midpoint</strong> of the segment, and</li>' +
                '<li>is <strong>perpendicular</strong> to the segment.</li>' +
                '</ul>' +
                '<div class="lesson-box"><strong>To find a perpendicular bisector:</strong><br>' +
                '1. Find the midpoint of the segment.<br>' +
                '2. Find the gradient of the segment.<br>' +
                '3. Take the negative reciprocal to get the perpendicular gradient.<br>' +
                '4. Use point-slope form with the midpoint and the perpendicular gradient.</div>' +
                '<p>Every point on the perpendicular bisector is equidistant from the two endpoints of the segment. This property is often used in IB exam problems.</p>'
        },

        // ── 20. Example: Perpendicular Bisector ────────────────────
        {
            type: 'example',
            problemMath: false,
            problem: 'Find the equation of the perpendicular bisector of the segment joining \\(A(2, 3)\\) and \\(B(6, 11)\\).',
            steps: [
                { text: '<strong>Step 1 - Midpoint:</strong> \\(M = \\left(\\dfrac{2 + 6}{2},\\; \\dfrac{3 + 11}{2}\\right) = (4, 7)\\)' },
                { text: '<strong>Step 2 - Gradient of AB:</strong> \\(m_{AB} = \\dfrac{11 - 3}{6 - 2} = \\dfrac{8}{4} = 2\\)' },
                { text: '<strong>Step 3 - Perpendicular gradient:</strong> \\(m_{\\perp} = -\\dfrac{1}{2}\\)' },
                { text: '<strong>Step 4 - Equation:</strong> Using point-slope form with \\(M(4, 7)\\): \\(y - 7 = -\\dfrac{1}{2}(x - 4)\\)' },
                { text: '<strong>Step 5 - Simplify:</strong> \\(y - 7 = -\\dfrac{1}{2}x + 2\\), so \\(y = -\\dfrac{1}{2}x + 9\\)' },
                { text: '<strong>Answer:</strong> The perpendicular bisector is \\(y = -\\dfrac{1}{2}x + 9\\).' }
            ]
        },

        // ── 21. Concept: Intersection of Lines ─────────────────────
        {
            type: 'concept',
            title: 'Intersection of Two Lines',
            content: '<p>The <strong>point of intersection</strong> of two lines is found by solving their equations simultaneously. At the intersection, both equations share the same \\((x, y)\\) values.</p>' +
                '<div class="lesson-box"><strong>Method - Substitution/Elimination:</strong><br>' +
                '1. If both equations are in the form \\(y = mx + c\\), set them equal: \\(m_1 x + c_1 = m_2 x + c_2\\).<br>' +
                '2. Solve for \\(x\\).<br>' +
                '3. Substitute back to find \\(y\\).</div>' +
                '<p><strong>Example:</strong> To find where \\(y = 2x + 1\\) and \\(y = -x + 7\\) intersect:</p>' +
                '<p>Set equal: \\(2x + 1 = -x + 7\\), so \\(3x = 6\\), giving \\(x = 2\\).</p>' +
                '<p>Substitute: \\(y = 2(2) + 1 = 5\\). The intersection is \\((2, 5)\\).</p>' +
                '<p>Note: parallel lines (same gradient, different intercept) have no intersection. Identical lines intersect at every point.</p>'
        },

        // ── 22. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Gradient:</strong> \\(m = \\dfrac{y_2 - y_1}{x_2 - x_1}\\)</li>' +
                '<li><strong>Midpoint:</strong> \\(M = \\left(\\dfrac{x_1 + x_2}{2},\\; \\dfrac{y_1 + y_2}{2}\\right)\\)</li>' +
                '<li><strong>Distance:</strong> \\(d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)</li>' +
                '<li><strong>Slope-intercept form:</strong> \\(y = mx + c\\)</li>' +
                '<li><strong>Point-slope form:</strong> \\(y - y_1 = m(x - x_1)\\)</li>' +
                '<li><strong>General form:</strong> \\(ax + by + d = 0\\)</li>' +
                '<li><strong>Parallel lines:</strong> \\(m_1 = m_2\\)</li>' +
                '<li><strong>Perpendicular lines:</strong> \\(m_1 \\times m_2 = -1\\)</li>' +
                '<li><strong>Perpendicular bisector:</strong> passes through the midpoint with gradient \\(-\\dfrac{1}{m}\\)</li>' +
                '<li><strong>Intersection:</strong> solve simultaneously by substitution or elimination</li>' +
                '</ul>'
        }
    ]
};
