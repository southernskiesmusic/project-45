const LESSON_TRANSFORMATIONS = {
    id: 'transformations',
    title: 'Transformations of Functions',
    subtitle: 'Translations, stretches, and reflections',
    folder: 'functions',
    screens: [
        // ── 1. Concept: Translations ───────────────────────────────
        {
            type: 'concept',
            title: 'Translations',
            content: '<p>A <strong>translation</strong> shifts the graph of a function without changing its shape.</p>' +
                '<p><strong>Vertical translation</strong> by \\(k\\):</p>' +
                '<ul>' +
                '<li>\\(g(x) = f(x) + k\\) shifts the graph <strong>up</strong> by \\(k\\) (or down if \\(k < 0\\))</li>' +
                '<li>Every point \\((x,\\, y)\\) maps to \\((x,\\, y + k)\\)</li>' +
                '</ul>' +
                '<p><strong>Horizontal translation</strong> by \\(h\\):</p>' +
                '<ul>' +
                '<li>\\(g(x) = f(x - h)\\) shifts the graph <strong>right</strong> by \\(h\\) (note: it is \\(x - h\\), not \\(x + h\\))</li>' +
                '<li>If \\(h < 0\\) the graph shifts left; e.g. \\(f(x + 2) = f(x - (-2))\\) shifts left 2</li>' +
                '<li>Every point \\((x,\\, y)\\) maps to \\((x + h,\\, y)\\)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<strong>Combined translation mapping:</strong><br>' +
                'Under \\(g(x) = f(x - h) + k\\):<br><br>' +
                '\\((x,\\; y) \\longrightarrow (x + h,\\; y + k)\\)' +
                '</div>'
        },

        // ── 2. Practice: Vertical Translation ─────────────────────
        {
            type: 'practice',
            intro: 'Find the image point after a vertical translation:',
            generate: () => TRANSFORMATIONS.qTranslateV()
        },

        // ── 3. Practice: Horizontal Translation ───────────────────
        {
            type: 'practice',
            intro: 'Find the image x-coordinate after a horizontal translation:',
            generate: () => TRANSFORMATIONS.qTranslateH()
        },

        // ── 4. Example: Horizontal vs Vertical Translation ─────────
        {
            type: 'example',
            problem: 'The graph of \\(f(x)\\) is translated 3 right and 2 up to give \\(g(x)\\). Write \\(g(x)\\) in terms of \\(f\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Horizontal shift right 3 → replace every \\(x\\) in \\(f\\) with \\((x - 3)\\), giving \\(f(x - 3)\\).' },
                { text: '<strong>Step 2:</strong> Vertical shift up 2 → add 2 to the whole expression, giving \\(f(x - 3) + 2\\).' },
                { text: '<strong>Answer:</strong> \\(g(x) = f(x - 3) + 2\\).' }
            ]
        },

        // ── 5. Concept: Stretches ──────────────────────────────────
        {
            type: 'concept',
            title: 'Stretches',
            content: '<p>A <strong>stretch</strong> scales the graph in one direction.</p>' +
                '<p><strong>Vertical stretch</strong> by scale factor \\(a\\):</p>' +
                '<ul>' +
                '<li>\\(g(x) = a \\cdot f(x)\\) stretches the graph vertically by factor \\(a\\)</li>' +
                '<li>If \\(0 < a < 1\\) the graph is compressed; if \\(a > 1\\) it is stretched</li>' +
                '</ul>' +
                '<p><strong>Horizontal stretch</strong> by scale factor \\(k\\):</p>' +
                '<ul>' +
                '<li>\\(g(x) = f\\!\\left(\\dfrac{x}{k}\\right)\\) stretches the graph horizontally by factor \\(k\\)</li>' +
                '<li>Equivalently, \\(g(x) = f(bx)\\) is a horizontal stretch by factor \\(\\dfrac{1}{b}\\)</li>' +
                '<li>If \\(0 < k < 1\\) the graph is compressed horizontally</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<strong>Stretch mappings:</strong><br><br>' +
                '<table style="border-collapse:collapse; width:100%;">' +
                '<tr><th style="text-align:left; padding:4px 8px;">Transformation</th><th style="text-align:left; padding:4px 8px;">Mapping</th></tr>' +
                '<tr><td style="padding:4px 8px;">\\(g(x) = a\\,f(x)\\)</td><td style="padding:4px 8px;">\\((x,\\;y) \\to (x,\\;ay)\\)</td></tr>' +
                '<tr><td style="padding:4px 8px;">\\(g(x) = f\\!\\left(\\dfrac{x}{k}\\right)\\)</td><td style="padding:4px 8px;">\\((x,\\;y) \\to (kx,\\;y)\\)</td></tr>' +
                '</table>' +
                '</div>'
        },

        // ── 6. Practice: Vertical Stretch ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the image y-coordinate after a vertical stretch:',
            generate: () => TRANSFORMATIONS.qStretchV()
        },

        // ── 7. Practice: Horizontal Stretch ───────────────────────
        {
            type: 'practice',
            intro: 'Find the image x-coordinate after a horizontal stretch:',
            generate: () => TRANSFORMATIONS.qStretchH()
        },

        // ── 8. Concept: Reflections ────────────────────────────────
        {
            type: 'concept',
            title: 'Reflections',
            content: '<p>A <strong>reflection</strong> flips the graph across an axis.</p>' +
                '<p><strong>Reflection in the x-axis:</strong></p>' +
                '<ul>' +
                '<li>\\(g(x) = -f(x)\\) — negate all output values</li>' +
                '<li>Mapping: \\((x,\\, y) \\longrightarrow (x,\\, -y)\\)</li>' +
                '</ul>' +
                '<p><strong>Reflection in the y-axis:</strong></p>' +
                '<ul>' +
                '<li>\\(g(x) = f(-x)\\) — replace \\(x\\) with \\(-x\\)</li>' +
                '<li>Mapping: \\((x,\\, y) \\longrightarrow (-x,\\, y)\\)</li>' +
                '</ul>' +
                '<p><strong>Combined reflection in both axes:</strong></p>' +
                '<ul>' +
                '<li>\\(g(x) = -f(-x)\\) — reflects in both the x-axis and y-axis</li>' +
                '<li>Mapping: \\((x,\\, y) \\longrightarrow (-x,\\, -y)\\)</li>' +
                '</ul>'
        },

        // ── 9. Practice: Reflect in x-axis ────────────────────────
        {
            type: 'practice',
            intro: 'Find the image y-coordinate after a reflection in the x-axis:',
            generate: () => TRANSFORMATIONS.qReflectX()
        },

        // ── 10. Practice: Reflect in y-axis ───────────────────────
        {
            type: 'practice',
            intro: 'Identify the equation after a reflection in the y-axis:',
            generate: () => TRANSFORMATIONS.qReflectY()
        },

        // ── 11. Example: Combined Transformation ──────────────────
        {
            type: 'example',
            problem: 'Under \\(g(x) = 2f(x - 1) + 3\\), find the image of the point \\((4,\\, 5)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Identify the transformation parameters: horizontal shift \\(h = 1\\), vertical stretch \\(a = 2\\), vertical shift \\(k = 3\\).' },
                { text: '<strong>Step 2:</strong> Write the general mapping. If \\((x,\\, y)\\) lies on \\(f\\), then under \\(g(x) = af(x - h) + k\\) it maps to \\((x + h,\\; ay + k)\\).' },
                { text: '<strong>Step 3:</strong> Apply to \\((4,\\, 5)\\): new x-coordinate \\(= 4 + 1 = 5\\). New y-coordinate \\(= 2(5) + 3 = 13\\).' },
                { text: '<strong>Answer:</strong> The image of \\((4,\\, 5)\\) is \\((5,\\, 13)\\).' }
            ]
        },

        // ── 12. Practice: Combined Transformation Point ────────────
        {
            type: 'practice',
            intro: 'Find the image y-coordinate under a combined transformation:',
            generate: () => TRANSFORMATIONS.qCombinedPoint()
        },

        // ── 13. Practice: Identify Parameters ─────────────────────
        {
            type: 'practice',
            intro: 'Identify the transformation parameters:',
            generate: () => TRANSFORMATIONS.qIdentifyParams()
        },

        // ── 14. Practice: Asymptote After Transformation ───────────
        {
            type: 'practice',
            intro: 'Find the asymptote after a transformation of y = 1/x:',
            generate: () => TRANSFORMATIONS.qTransformAsymptote()
        },

        // ── 15. Practice: Inverse Mapping ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the original y-coordinate given the image:',
            generate: () => TRANSFORMATIONS.qInverseMapping()
        },

        // ── 16. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(f(x) + k\\) shifts the graph <strong>up</strong> by \\(k\\) &nbsp;(mapping: \\(y \\to y + k\\))</li>' +
                '<li>\\(f(x - h)\\) shifts the graph <strong>right</strong> by \\(h\\) &nbsp;(mapping: \\(x \\to x + h\\))</li>' +
                '<li>\\(a\\,f(x)\\) stretches <strong>vertically</strong> by factor \\(a\\) &nbsp;(mapping: \\(y \\to ay\\))</li>' +
                '<li>\\(f(x/k)\\) stretches <strong>horizontally</strong> by factor \\(k\\) &nbsp;(mapping: \\(x \\to kx\\))</li>' +
                '<li>\\(-f(x)\\) reflects in the <strong>x-axis</strong> &nbsp;(mapping: \\(y \\to -y\\))</li>' +
                '<li>\\(f(-x)\\) reflects in the <strong>y-axis</strong> &nbsp;(mapping: \\(x \\to -x\\))</li>' +
                '<li><strong>Combined</strong> \\(af(x - h) + k\\): mapping \\((x,\\,y) \\longrightarrow (x + h,\\; ay + k)\\)</li>' +
                '</ul>'
        }
    ]
};
