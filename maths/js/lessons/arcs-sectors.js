const LESSON_ARCS_SECTORS = {
    id: 'arcs-sectors',
    title: 'Arcs & Sectors',
    subtitle: 'Arc length, sector area, and segments in radians',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: Radians ────────────────────────────────────
        {
            type: 'concept',
            title: 'Radians',
            content: '<p>A <strong>radian</strong> is the angle subtended at the centre of a circle by an arc equal in length to the radius. It is the natural unit of angle in mathematics.</p>' +
                '<div class="lesson-box">' +
                '<strong>Full circle:</strong> \\(2\\pi\\) rad \\(= 360°\\)<br><br>' +
                '<strong>Converting:</strong><br>' +
                '\\(\\text{rad} = \\text{deg} \\times \\dfrac{\\pi}{180}\\)<br>' +
                '\\(\\text{deg} = \\text{rad} \\times \\dfrac{180}{\\pi}\\)<br><br>' +
                '<strong>Common exact values:</strong><br>' +
                '\\(30° = \\dfrac{\\pi}{6}\\quad\\) ' +
                '\\(45° = \\dfrac{\\pi}{4}\\quad\\) ' +
                '\\(60° = \\dfrac{\\pi}{3}\\quad\\) ' +
                '\\(90° = \\dfrac{\\pi}{2}\\quad\\) ' +
                '\\(180° = \\pi\\)' +
                '</div>' +
                '<p>All arc and sector formulas require \\(\\theta\\) to be in <strong>radians</strong>. Always convert before substituting.</p>'
        },

        // ── 2. Practice: Convert degrees → radians ────────────────
        {
            type: 'practice',
            intro: 'Convert the angle to radians:',
            generate: () => ARCS_SECTORS.qConvertDegRad()
        },

        // ── 3. Practice: Arc length from degrees ──────────────────
        {
            type: 'practice',
            intro: 'Convert the angle from degrees to find the arc length:',
            generate: () => ARCS_SECTORS.qArcDegrees()
        },

        // ── 4. Concept: Arc Length & Sector Area ──────────────────
        {
            type: 'concept',
            title: 'Arc Length & Sector Area',
            content: '<p>For a circle of radius \\(r\\) and central angle \\(\\theta\\) (in radians):</p>' +
                '<div class="lesson-box">' +
                '<strong>Arc length:</strong> \\(l = r\\theta\\)<br><br>' +
                '<strong>Sector area:</strong> \\(A = \\dfrac{1}{2}r^2\\theta\\)<br><br>' +
                '<strong>Perimeter of sector:</strong> \\(P = 2r + r\\theta = r(2 + \\theta)\\)' +
                '</div>' +
                '<p>The perimeter of a sector consists of two radii (each of length \\(r\\)) plus the arc \\(l = r\\theta\\).</p>'
        },

        // ── 5. Example: Using Arc and Sector Formulas ─────────────
        {
            type: 'example',
            problem: 'A sector has radius \\(5\\) cm and angle \\(\\dfrac{\\pi}{3}\\). Find the arc length, sector area, and sector perimeter.',
            steps: [
                { text: '<strong>Arc length:</strong> \\(l = r\\theta = 5 \\times \\dfrac{\\pi}{3} \\approx 5.24\\) cm.' },
                { text: '<strong>Sector area:</strong> \\(A = \\dfrac{1}{2}r^2\\theta = \\dfrac{1}{2} \\times 25 \\times \\dfrac{\\pi}{3} \\approx 13.09\\) cm².' },
                { text: '<strong>Perimeter:</strong> \\(P = 2r + l = 2(5) + 5.24 = 15.24\\) cm.' }
            ]
        },

        // ── 6. Practice: Arc length ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the arc length:',
            generate: () => ARCS_SECTORS.qArcLength()
        },

        // ── 7. Practice: Sector area ───────────────────────────────
        {
            type: 'practice',
            intro: 'Find the sector area:',
            generate: () => ARCS_SECTORS.qSectorArea()
        },

        // ── 8. Practice: Perimeter of sector ──────────────────────
        {
            type: 'practice',
            intro: 'Find the perimeter of the sector:',
            generate: () => ARCS_SECTORS.qPerimeterSector()
        },

        // ── 9. Practice: Find the angle ───────────────────────────
        {
            type: 'practice',
            intro: 'Find the angle given the arc length and radius:',
            generate: () => ARCS_SECTORS.qFindAngle()
        },

        // ── 10. Practice: Find the radius ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the radius given the sector area and angle:',
            generate: () => ARCS_SECTORS.qFindRadius()
        },

        // ── 11. Concept: Segment Area ──────────────────────────────
        {
            type: 'concept',
            title: 'Segment Area',
            content: '<p>A <strong>segment</strong> is the region bounded by a chord and the arc it cuts off. It is found by subtracting the triangle from the sector.</p>' +
                '<div class="lesson-box">' +
                '\\(A_{\\text{segment}} = A_{\\text{sector}} - A_{\\text{triangle}}\\)<br><br>' +
                '\\(= \\dfrac{1}{2}r^2\\theta - \\dfrac{1}{2}r^2\\sin\\theta\\)<br><br>' +
                '\\(= \\dfrac{1}{2}r^2(\\theta - \\sin\\theta)\\)' +
                '</div>' +
                '<p>The triangle area formula \\(\\frac{1}{2}r^2\\sin\\theta\\) comes from \\(\\frac{1}{2}ab\\sin C\\) with two sides equal to \\(r\\) and included angle \\(\\theta\\).</p>'
        },

        // ── 12. Practice: Sector fraction ─────────────────────────
        {
            type: 'practice',
            intro: 'Find what fraction of the full circle the sector represents:',
            generate: () => ARCS_SECTORS.qSectorFraction()
        },

        // ── 13. Practice: Segment area ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the area of the segment:',
            generate: () => ARCS_SECTORS.qSegmentArea()
        },

        // ── 14. Practice: Combined perimeter ──────────────────────
        {
            type: 'practice',
            intro: 'Find the perimeter of the shape (arc + chord):',
            generate: () => ARCS_SECTORS.qCombinedPerimeter()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\theta\\) must always be in <strong>radians</strong> before substituting</li>' +
                '<li><strong>Arc length:</strong> \\(l = r\\theta\\)</li>' +
                '<li><strong>Sector area:</strong> \\(A = \\dfrac{1}{2}r^2\\theta\\)</li>' +
                '<li><strong>Sector perimeter:</strong> \\(P = r(2 + \\theta)\\)</li>' +
                '<li><strong>Segment area:</strong> \\(\\dfrac{1}{2}r^2(\\theta - \\sin\\theta)\\)</li>' +
                '<li><strong>Sector fraction of circle:</strong> \\(\\dfrac{\\theta}{2\\pi}\\)</li>' +
                '<li>\\(180° = \\pi\\) rad; multiply degrees by \\(\\dfrac{\\pi}{180}\\) to convert</li>' +
                '</ul>'
        }
    ]
};
