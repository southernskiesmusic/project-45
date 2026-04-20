const LESSON_UNIT_CIRCLE = {
    id: 'unit-circle',
    title: 'Unit Circle & Exact Values',
    subtitle: 'Exact trigonometric values and the CAST diagram',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: The Unit Circle ───────────────────────────
        {
            type: 'concept',
            title: 'The Unit Circle',
            content: '<p>The <strong>unit circle</strong> is a circle of radius 1 centred at the origin. For any angle \\(\\theta\\) measured from the positive \\(x\\)-axis, the point on the unit circle is \\((\\cos\\theta,\\, \\sin\\theta)\\).</p>' +
                '<div class="lesson-box">' +
                '<strong>Exact values table</strong><br><br>' +
                '<table style="border-collapse:collapse;width:100%;text-align:center;">' +
                '<thead><tr style="border-bottom:2px solid #ccc;">' +
                '<th style="padding:6px 10px;">\\(\\theta\\)</th>' +
                '<th style="padding:6px 10px;">\\(\\sin\\theta\\)</th>' +
                '<th style="padding:6px 10px;">\\(\\cos\\theta\\)</th>' +
                '<th style="padding:6px 10px;">\\(\\tan\\theta\\)</th>' +
                '</tr></thead>' +
                '<tbody>' +
                '<tr><td style="padding:6px 10px;">\\(0°\\)</td><td>\\(0\\)</td><td>\\(1\\)</td><td>\\(0\\)</td></tr>' +
                '<tr style="background:rgba(0,0,0,0.03);"><td style="padding:6px 10px;">\\(30°\\)</td><td>\\(\\dfrac{1}{2}\\)</td><td>\\(\\dfrac{\\sqrt{3}}{2}\\)</td><td>\\(\\dfrac{1}{\\sqrt{3}}\\)</td></tr>' +
                '<tr><td style="padding:6px 10px;">\\(45°\\)</td><td>\\(\\dfrac{\\sqrt{2}}{2}\\)</td><td>\\(\\dfrac{\\sqrt{2}}{2}\\)</td><td>\\(1\\)</td></tr>' +
                '<tr style="background:rgba(0,0,0,0.03);"><td style="padding:6px 10px;">\\(60°\\)</td><td>\\(\\dfrac{\\sqrt{3}}{2}\\)</td><td>\\(\\dfrac{1}{2}\\)</td><td>\\(\\sqrt{3}\\)</td></tr>' +
                '<tr><td style="padding:6px 10px;">\\(90°\\)</td><td>\\(1\\)</td><td>\\(0\\)</td><td>undefined</td></tr>' +
                '</tbody></table>' +
                '</div>' +
                '<p>Notice that \\(\\sin\\) values increase from 0 to 1 as \\(\\theta\\) goes from \\(0°\\) to \\(90°\\), while \\(\\cos\\) values decrease from 1 to 0 over the same range.</p>'
        },

        // ── 2. Practice: Exact sin ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the exact value of sin:',
            generate: () => UNIT_CIRCLE.qExactSin()
        },

        // ── 3. Practice: Exact cos ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the exact value of cos:',
            generate: () => UNIT_CIRCLE.qExactCos()
        },

        // ── 4. Practice: Exact tan ────────────────────────────────
        {
            type: 'practice',
            intro: 'Find the exact value of tan:',
            generate: () => UNIT_CIRCLE.qExactTan()
        },

        // ── 5. Concept: The CAST Diagram ──────────────────────────
        {
            type: 'concept',
            title: 'The CAST Diagram',
            content: '<p>The <strong>CAST diagram</strong> tells you which trig ratios are positive in each quadrant of the unit circle.</p>' +
                '<div class="lesson-box">' +
                '<strong>Quadrant signs (going anticlockwise from Q1):</strong><br><br>' +
                '<table style="border-collapse:collapse;width:100%;text-align:center;">' +
                '<thead><tr style="border-bottom:2px solid #ccc;">' +
                '<th style="padding:6px 10px;">Quadrant</th>' +
                '<th style="padding:6px 10px;">Angles</th>' +
                '<th style="padding:6px 10px;">Positive ratios</th>' +
                '</tr></thead>' +
                '<tbody>' +
                '<tr><td style="padding:6px 10px;"><strong>Q1</strong></td><td>\\(0°\\) to \\(90°\\)</td><td><strong>All</strong> (sin, cos, tan)</td></tr>' +
                '<tr style="background:rgba(0,0,0,0.03);"><td style="padding:6px 10px;"><strong>Q2</strong></td><td>\\(90°\\) to \\(180°\\)</td><td><strong>Sin</strong> only</td></tr>' +
                '<tr><td style="padding:6px 10px;"><strong>Q3</strong></td><td>\\(180°\\) to \\(270°\\)</td><td><strong>Tan</strong> only</td></tr>' +
                '<tr style="background:rgba(0,0,0,0.03);"><td style="padding:6px 10px;"><strong>Q4</strong></td><td>\\(270°\\) to \\(360°\\)</td><td><strong>Cos</strong> only</td></tr>' +
                '</tbody></table>' +
                '<br>' +
                '<strong>Reference angle</strong> — the acute angle to the nearest \\(x\\)-axis:<br><br>' +
                '\\(\\text{Q2}: \\theta_{\\text{ref}} = 180° - \\theta\\)<br>' +
                '\\(\\text{Q3}: \\theta_{\\text{ref}} = \\theta - 180°\\)<br>' +
                '\\(\\text{Q4}: \\theta_{\\text{ref}} = 360° - \\theta\\)' +
                '</div>' +
                '<p>To find an exact trig value for any angle: (1) find which quadrant it is in, (2) find the reference angle, (3) use the exact value table, (4) apply the correct sign from CAST.</p>'
        },

        // ── 6. Example: Using CAST for angles beyond 90° ──────────
        {
            type: 'example',
            problem: 'Find \\(\\sin(150°)\\), \\(\\cos(150°)\\) and \\(\\tan(150°)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Locate the quadrant. \\(150°\\) lies between \\(90°\\) and \\(180°\\), so it is in <strong>Q2</strong>.' },
                { text: '<strong>Step 2:</strong> Apply CAST. In Q2 only <strong>sin</strong> is positive; cos and tan are negative.' },
                { text: '<strong>Step 3:</strong> Find the reference angle. \\(\\theta_{\\text{ref}} = 180° - 150° = 30°\\).' },
                { text: '<strong>Step 4:</strong> Use the exact value table for \\(30°\\) and apply signs.<br>\\(\\sin(150°) = +\\sin(30°) = \\dfrac{1}{2}\\)<br>\\(\\cos(150°) = -\\cos(30°) = -\\dfrac{\\sqrt{3}}{2}\\)<br>\\(\\tan(150°) = -\\tan(30°) = -\\dfrac{1}{\\sqrt{3}}\\)' }
            ]
        },

        // ── 7. Practice: Reference angle ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the reference angle:',
            generate: () => UNIT_CIRCLE.qReferenceAngle()
        },

        // ── 8. Practice: Quadrant sign ────────────────────────────
        {
            type: 'practice',
            intro: 'Determine the sign in the given quadrant:',
            generate: () => UNIT_CIRCLE.qQuadrantSign()
        },

        // ── 9. Practice: Angle from value ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the angle(s) with the given trig value:',
            generate: () => UNIT_CIRCLE.qAngleFromValue()
        },

        // ── 10. Concept: Pythagorean Identity & Symmetry ──────────
        {
            type: 'concept',
            title: 'Pythagorean Identity & Symmetry',
            content: '<p>Because every point on the unit circle satisfies \\(x^2 + y^2 = 1\\), we get the fundamental <strong>Pythagorean identity</strong>:</p>' +
                '<p style="text-align:center;font-size:1.1em;">\\(\\sin^2\\theta + \\cos^2\\theta = 1\\) &nbsp; (always true for any \\(\\theta\\))</p>' +
                '<p>This lets you find \\(\\cos\\theta\\) if you know \\(\\sin\\theta\\), and vice versa.</p>' +
                '<p><strong>Symmetry properties:</strong></p>' +
                '<ul>' +
                '<li><strong>Odd function:</strong> \\(\\sin(-\\theta) = -\\sin\\theta\\) — sine is odd (point reflected in \\(x\\)-axis)</li>' +
                '<li><strong>Even function:</strong> \\(\\cos(-\\theta) = \\cos\\theta\\) — cosine is even (unchanged by reflection)</li>' +
                '<li><strong>Co-function identity:</strong> \\(\\sin(90° - \\theta) = \\cos\\theta\\) — complementary angles</li>' +
                '<li><strong>Periodicity:</strong> \\(\\sin(\\theta + 360°) = \\sin\\theta\\) and \\(\\cos(\\theta + 360°) = \\cos\\theta\\) — one full revolution returns to the same point</li>' +
                '</ul>'
        },

        // ── 11. Practice: Pythagorean identity ───────────────────
        {
            type: 'practice',
            intro: 'Use the Pythagorean identity:',
            generate: () => UNIT_CIRCLE.qPythagoreanIdentity()
        },

        // ── 12. Practice: Negative angle ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the trig value of a negative angle:',
            generate: () => UNIT_CIRCLE.qNegativeAngle()
        },

        // ── 13. Practice: Co-function identity ───────────────────
        {
            type: 'practice',
            intro: 'Use the co-function identity:',
            generate: () => UNIT_CIRCLE.qCofunction()
        },

        // ── 14. Practice: Periodicity ─────────────────────────────
        {
            type: 'practice',
            intro: 'Use periodicity to find the exact value:',
            generate: () => UNIT_CIRCLE.qPeriodicity()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>The unit circle has <strong>radius 1</strong>, centred at the origin; any point on it is \\((\\cos\\theta, \\sin\\theta)\\)</li>' +
                '<li><strong>Exact values</strong> at \\(0°, 30°, 45°, 60°, 90°\\) must be memorised (see table in screen 1)</li>' +
                '<li><strong>CAST:</strong> Q1 All, Q2 Sin, Q3 Tan, Q4 Cos — determines the sign of each ratio</li>' +
                '<li><strong>Reference angle:</strong> Q2 \\(180°-\\theta\\); Q3 \\(\\theta-180°\\); Q4 \\(360°-\\theta\\)</li>' +
                '<li><strong>Pythagorean identity:</strong> \\(\\sin^2\\theta + \\cos^2\\theta = 1\\)</li>' +
                '<li><strong>Odd/even:</strong> \\(\\sin(-\\theta) = -\\sin\\theta\\); \\(\\cos(-\\theta) = \\cos\\theta\\)</li>' +
                '<li><strong>Co-function:</strong> \\(\\sin(90° - \\theta) = \\cos\\theta\\)</li>' +
                '<li><strong>Period:</strong> \\(\\sin(\\theta + 360°) = \\sin\\theta\\) and \\(\\cos(\\theta + 360°) = \\cos\\theta\\)</li>' +
                '</ul>'
        }
    ]
};
