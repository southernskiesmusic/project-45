const LESSON_TRIANGLES = {
    id: '3d-geometry-triangles',
    title: '3D Geometry & Triangles',
    subtitle: 'Sine rule, cosine rule, area formulas, and 3D problems',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: Right-Angled Triangles ────────────────────
        {
            type: 'concept',
            title: 'Right-Angled Triangles & Pythagoras',
            content: '<p>In a <strong>right-angled triangle</strong>, the side opposite the right angle is called the <strong>hypotenuse</strong> — it is always the longest side.</p>' +
                '<div class="lesson-box">' +
                '<strong>Pythagorean Theorem:</strong><br>' +
                '\\(a^2 + b^2 = c^2\\)<br>' +
                'where \\(c\\) is the hypotenuse and \\(a\\), \\(b\\) are the two shorter sides.' +
                '</div>' +
                '<p><strong>When to use it:</strong> whenever the triangle has a right angle (90°) and you know two of the three sides.</p>' +
                '<ul>' +
                '<li>To find the hypotenuse: \\(c = \\sqrt{a^2 + b^2}\\)</li>' +
                '<li>To find a shorter side: \\(a = \\sqrt{c^2 - b^2}\\)</li>' +
                '</ul>' +
                '<p><strong>Example:</strong> A triangle has legs \\(a = 3\\) and \\(b = 4\\). Then \\(c = \\sqrt{9 + 16} = \\sqrt{25} = 5\\).</p>'
        },

        // ── 2. Practice: Pythagorean Theorem ──────────────────────
        {
            type: 'practice',
            intro: 'Find the missing side using the Pythagorean theorem:',
            generate: () => TRIANGLES.qPythagorean()
        },

        // ── 3. Concept: Area Formulas ──────────────────────────────
        {
            type: 'concept',
            title: 'Area Formulas',
            content: '<p>There are two key formulas for the area of a triangle:</p>' +
                '<div class="lesson-box">' +
                '<strong>Formula 1 — Base and Height:</strong><br>' +
                '\\(\\text{Area} = \\dfrac{1}{2} \\times b \\times h\\)<br>' +
                'where \\(b\\) is the base and \\(h\\) is the perpendicular height.<br><br>' +
                '<strong>Formula 2 — Two Sides and Included Angle:</strong><br>' +
                '\\(\\text{Area} = \\dfrac{1}{2}ab\\sin C\\)<br>' +
                'where \\(a\\) and \\(b\\) are two sides and \\(C\\) is the angle between them.' +
                '</div>' +
                '<p><strong>When to use each:</strong></p>' +
                '<ul>' +
                '<li>Use \\(\\frac{1}{2}bh\\) when the base and perpendicular height are given directly.</li>' +
                '<li>Use \\(\\frac{1}{2}ab\\sin C\\) when you know two sides and the <em>included</em> angle (the angle between those two sides). This is the SAS case.</li>' +
                '</ul>' +
                '<p><strong>Note:</strong> \\(\\sin C\\) is always positive for angles \\(0° < C < 180°\\), so the area is always positive.</p>'
        },

        // ── 4. Practice: Area from Base and Height ────────────────
        {
            type: 'practice',
            intro: 'Find the area of the triangle using base and height:',
            generate: () => TRIANGLES.qAreaFromBase()
        },

        // ── 5. Practice: Area Using ½ab sinC ──────────────────────
        {
            type: 'practice',
            intro: 'Find the area of the triangle using two sides and the included angle:',
            generate: () => TRIANGLES.qAreaSineFormula()
        },

        // ── 6. Concept: The Sine Rule ──────────────────────────────
        {
            type: 'concept',
            title: 'The Sine Rule',
            content: '<p>The <strong>sine rule</strong> links the sides of any triangle to the sines of their opposite angles.</p>' +
                '<div class="lesson-box">' +
                '\\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}\\)<br><br>' +
                'Equivalently (useful for finding angles):<br>' +
                '\\(\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}\\)' +
                '</div>' +
                '<p><strong>When to use:</strong></p>' +
                '<ul>' +
                '<li><strong>AAS</strong> — two angles and a non-included side are known</li>' +
                '<li><strong>ASA</strong> — two angles and the included side are known</li>' +
                '<li><strong>SSA</strong> — two sides and a non-included angle are known (ambiguous case!)</li>' +
                '</ul>' +
                '<p><strong>Ambiguous case (SSA):</strong> When given two sides \\(a\\) and \\(b\\) and angle \\(A\\) (opposite \\(a\\)), there may be:</p>' +
                '<ul>' +
                '<li><strong>0 solutions</strong> if \\(a < b\\sin A\\) — side \\(a\\) is too short to reach the base</li>' +
                '<li><strong>1 solution</strong> if \\(a = b\\sin A\\) (right triangle) or \\(a \\geq b\\)</li>' +
                '<li><strong>2 solutions</strong> if \\(b\\sin A < a < b\\) — two different triangles are possible</li>' +
                '</ul>'
        },

        // ── 7. Example: Sine Rule to Find a Side ──────────────────
        {
            type: 'example',
            problem: 'In triangle ABC, \\(A = 40°\\), \\(B = 75°\\), and \\(b = 12\\). Find side \\(a\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the known pair to use as the reference ratio. We know angle \\(B = 75°\\) and its opposite side \\(b = 12\\).' },
                { text: '<strong>Step 2:</strong> Write the sine rule linking \\(a\\) and \\(b\\):<br>\\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B}\\)' },
                { text: '<strong>Step 3:</strong> Substitute the known values:<br>\\(\\dfrac{a}{\\sin 40°} = \\dfrac{12}{\\sin 75°}\\)' },
                { text: '<strong>Step 4:</strong> Solve for \\(a\\):<br>\\(a = \\dfrac{12 \\times \\sin 40°}{\\sin 75°} = \\dfrac{12 \\times 0.6428}{0.9659} \\approx 7.99\\)' },
                { text: '<strong>Answer:</strong> \\(a \\approx 7.99\\) (3 s.f.)' }
            ]
        },

        // ── 8. Practice: Sine Rule — Find a Side ──────────────────
        {
            type: 'practice',
            intro: 'Use the sine rule to find the missing side:',
            generate: () => TRIANGLES.qSineRuleSide()
        },

        // ── 9. Practice: Sine Rule — Find an Angle ────────────────
        {
            type: 'practice',
            intro: 'Use the sine rule to find the missing angle:',
            generate: () => TRIANGLES.qSineRuleAngle()
        },

        // ── 10. Practice: Ambiguous SSA Case ──────────────────────
        {
            type: 'practice',
            intro: 'How many triangles are possible with the given information (SSA)?',
            generate: () => TRIANGLES.qAmbiguousCase()
        },

        // ── 11. Concept: The Cosine Rule ───────────────────────────
        {
            type: 'concept',
            title: 'The Cosine Rule',
            content: '<p>The <strong>cosine rule</strong> generalises Pythagoras to any triangle.</p>' +
                '<div class="lesson-box">' +
                '<strong>To find a side (SAS):</strong><br>' +
                '\\(a^2 = b^2 + c^2 - 2bc\\cos A\\)<br><br>' +
                '<strong>To find an angle (SSS) — rearranged:</strong><br>' +
                '\\(\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}\\)' +
                '</div>' +
                '<p><strong>When to use:</strong></p>' +
                '<ul>' +
                '<li><strong>SAS</strong> — two sides and the <em>included</em> angle are known → find the third side</li>' +
                '<li><strong>SSS</strong> — all three sides are known → find any angle</li>' +
                '</ul>' +
                '<p><strong>Important:</strong> If \\(\\cos A\\) comes out negative, angle \\(A\\) is obtuse (between 90° and 180°). This is handled correctly by your calculator — no ambiguity like in the sine rule.</p>' +
                '<p><strong>Check:</strong> When \\(A = 90°\\), \\(\\cos A = 0\\) and the formula reduces to \\(a^2 = b^2 + c^2\\) — Pythagoras!</p>'
        },

        // ── 12. Example: Cosine Rule to Find an Angle ─────────────
        {
            type: 'example',
            problem: 'In triangle ABC, \\(a = 7\\), \\(b = 5\\), \\(c = 6\\). Find angle \\(A\\).',
            steps: [
                { text: '<strong>Step 1:</strong> We know all three sides (SSS), so use the rearranged cosine rule to find angle \\(A\\).' },
                { text: '<strong>Step 2:</strong> Write the formula:<br>\\(\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}\\)' },
                { text: '<strong>Step 3:</strong> Substitute the values:<br>\\(\\cos A = \\dfrac{25 + 36 - 49}{2 \\times 5 \\times 6} = \\dfrac{12}{60} = 0.2\\)' },
                { text: '<strong>Step 4:</strong> Find \\(A\\) using inverse cosine:<br>\\(A = \\cos^{-1}(0.2) \\approx 78.5°\\)' },
                { text: '<strong>Answer:</strong> \\(A \\approx 78.5°\\) (3 s.f.)' }
            ]
        },

        // ── 13. Practice: Cosine Rule — Find a Side ───────────────
        {
            type: 'practice',
            intro: 'Use the cosine rule to find the missing side:',
            generate: () => TRIANGLES.qCosineRuleSide()
        },

        // ── 14. Practice: Cosine Rule — Find an Angle ─────────────
        {
            type: 'practice',
            intro: 'Use the cosine rule to find the missing angle:',
            generate: () => TRIANGLES.qCosineRuleAngle()
        },

        // ── 15. Concept: 3D Problems & Bearings ───────────────────
        {
            type: 'concept',
            title: '3D Problems & Bearings',
            content: '<p>Many real-world problems involve 3D shapes or navigation. The key strategy is to <strong>identify a 2D triangle</strong> inside the 3D figure.</p>' +
                '<div class="lesson-box">' +
                '<strong>Space diagonal of a cuboid</strong> (length \\(l\\), width \\(w\\), height \\(h\\)):<br>' +
                '\\(d = \\sqrt{l^2 + w^2 + h^2}\\)<br><br>' +
                '<strong>Bearings:</strong><br>' +
                'Measured <em>clockwise</em> from North, written as a 3-digit number (e.g. 045°, 270°).<br>' +
                'Range: 000° to 360°.' +
                '</div>' +
                '<p><strong>Strategy for 3D problems:</strong></p>' +
                '<ul>' +
                '<li>Draw a clear diagram and label all known lengths and angles.</li>' +
                '<li>Identify the right-angled or general triangle that contains the unknown.</li>' +
                '<li>Apply Pythagoras, sine rule, or cosine rule to that 2D triangle.</li>' +
                '</ul>' +
                '<p><strong>Cuboid example:</strong> For a box with \\(l = 3\\), \\(w = 4\\), \\(h = 12\\):<br>' +
                'Base diagonal \\(= \\sqrt{3^2 + 4^2} = 5\\), then space diagonal \\(= \\sqrt{5^2 + 12^2} = 13\\).</p>' +
                '<p><strong>Bearing tip:</strong> In bearing problems, the angle between two paths is often found by subtracting bearings, and a North–South line gives a known angle to work from.</p>'
        },

        // ── 16. Practice: 3D Cuboid Diagonal ──────────────────────
        {
            type: 'practice',
            intro: 'Find the space diagonal of the cuboid:',
            generate: () => TRIANGLES.q3DCuboid()
        },

        // ── 17. Practice: Bearing Problem ─────────────────────────
        {
            type: 'practice',
            intro: 'Solve the bearing/navigation problem:',
            generate: () => TRIANGLES.qBearing()
        },

        // ── 18. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li><strong>Pythagoras:</strong> \\(a^2 + b^2 = c^2\\) — right-angled triangles only</li>' +
                '<li><strong>Area (base &amp; height):</strong> \\(\\text{Area} = \\frac{1}{2}bh\\)</li>' +
                '<li><strong>Area (SAS):</strong> \\(\\text{Area} = \\frac{1}{2}ab\\sin C\\) — use when two sides and included angle known</li>' +
                '<li><strong>Sine rule:</strong> \\(\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}\\) — use for AAS, ASA, SSA</li>' +
                '<li><strong>Ambiguous case (SSA):</strong> 0, 1, or 2 triangles possible; check \\(a\\) vs \\(b\\sin A\\)</li>' +
                '<li><strong>Cosine rule (side):</strong> \\(a^2 = b^2 + c^2 - 2bc\\cos A\\) — use for SAS</li>' +
                '<li><strong>Cosine rule (angle):</strong> \\(\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}\\) — use for SSS; no ambiguity</li>' +
                '<li><strong>Space diagonal:</strong> \\(d = \\sqrt{l^2 + w^2 + h^2}\\)</li>' +
                '<li><strong>Bearings:</strong> clockwise from North, 000°–360°, written as 3 digits</li>' +
                '<li><strong>3D strategy:</strong> break into 2D triangles, then apply Pythagoras / sine / cosine rule</li>' +
                '</ul>'
        }
    ]
};
