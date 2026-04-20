const LESSON_OPTIMISATION = {
    id: 'optimisation',
    title: 'Optimisation',
    subtitle: 'Finding maximum and minimum values',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Optimisation Method ───────────────────────
        {
            type: 'concept',
            title: 'Optimisation Method',
            content: '<p><strong>Optimisation</strong> is the process of finding the maximum or minimum value of a function, often subject to a constraint.</p>' +
                '<div class="lesson-box">' +
                '<strong>Step 1:</strong> Write an <strong>objective function</strong> — the quantity you want to maximise or minimise.<br><br>' +
                '<strong>Step 2:</strong> Use the <strong>constraint</strong> to express the objective function in terms of one variable only.<br><br>' +
                '<strong>Step 3:</strong> <strong>Differentiate</strong> and set \\(f\'(x) = 0\\) to find critical points.<br><br>' +
                '<strong>Step 4:</strong> <strong>Verify</strong> with the second derivative: \\(f\'\'< 0 \\Rightarrow\\) maximum; \\(f\'\' > 0 \\Rightarrow\\) minimum.<br><br>' +
                '<strong>Step 5:</strong> On a <strong>closed interval</strong>, also check the <strong>endpoints</strong> — the global extremum may occur there.' +
                '</div>'
        },

        // ── 2. Practice: Critical Points ──────────────────────────
        {
            type: 'practice',
            intro: 'Find the critical points:',
            generate: () => OPTIMISATION.qCriticalPoints()
        },

        // ── 3. Practice: Second Derivative Classification ──────────
        {
            type: 'practice',
            intro: 'Classify the stationary point using the second derivative:',
            generate: () => OPTIMISATION.qSecondDerivConfirm()
        },

        // ── 4. Practice: Global Maximum on Closed Interval ─────────
        {
            type: 'practice',
            intro: 'Find the global maximum on the closed interval:',
            generate: () => OPTIMISATION.qGlobalMax()
        },

        // ── 5. Example: Maximising Area ────────────────────────────
        {
            type: 'example',
            problem: 'A rectangle has a perimeter of 20. Find the dimensions that maximise the area.',
            steps: [
                { text: '<strong>Step 1:</strong> Write the constraint: \\(2l + 2w = 20\\), so \\(l + w = 10\\), giving \\(w = 10 - l\\).' },
                { text: '<strong>Step 2:</strong> Write the objective function: \\(A = lw = l(10 - l) = 10l - l^2\\).' },
                { text: '<strong>Step 3:</strong> Differentiate and set equal to zero: \\(A\' = 10 - 2l = 0 \\Rightarrow l = 5\\).' },
                { text: '<strong>Step 4:</strong> Second derivative: \\(A\'\' = -2 < 0\\), confirming a maximum.' },
                { text: '<strong>Answer:</strong> \\(l = w = 5\\). Maximum area \\(= 5 \\times 5 = 25\\).' }
            ]
        },

        // ── 6. Practice: Maximum Rectangle Area ───────────────────
        {
            type: 'practice',
            intro: 'Find the maximum area of the rectangle:',
            generate: () => OPTIMISATION.qMaxRectArea()
        },

        // ── 7. Practice: Minimum Fence Length ─────────────────────
        {
            type: 'practice',
            intro: 'Minimise the fence length:',
            generate: () => OPTIMISATION.qMinFenceLength()
        },

        // ── 8. Concept: 3D and Real-World Optimisation ─────────────
        {
            type: 'concept',
            title: '3D and Real-World Optimisation',
            content: '<p>Many real-world problems involve three-dimensional shapes or practical constraints. The same five-step method applies.</p>' +
                '<div class="lesson-box">' +
                '<strong>Open box from a square sheet:</strong> Cut corners of size \\(x\\) from a sheet of side \\(L\\). The box has no lid.<br>' +
                '\\[V = (L - 2x)^2 \\cdot x\\]<br>' +
                '<strong>Cylinder with fixed volume \\(V\\):</strong> Surface area includes two circular ends and the curved side.<br>' +
                '\\[SA = 2\\pi r^2 + 2\\pi r h, \\quad \\text{substitute } h = \\frac{V}{\\pi r^2}\\]<br><br>' +
                'Always check <strong>endpoints</strong> of the domain and <strong>verify the nature</strong> of each stationary point.' +
                '</div>'
        },

        // ── 9. Example: Open Box ───────────────────────────────────
        {
            type: 'example',
            problem: 'A square sheet of side 12 has corners of size \\(x\\) cut away and the sides folded up to form an open box. Find \\(x\\) that maximises the volume.',
            steps: [
                { text: '<strong>Step 1:</strong> Write the volume: \\(V = (12 - 2x)^2 \\cdot x\\).' },
                { text: '<strong>Step 2:</strong> Differentiate using the product rule:<br>\\(V\' = (12 - 2x)^2 + x \\cdot 2(12 - 2x)(-2) = (12 - 2x)\\bigl[(12 - 2x) - 4x\\bigr] = (12 - 2x)(12 - 6x)\\).' },
                { text: '<strong>Step 3:</strong> Set \\(V\' = 0\\): \\(12 - 2x = 0 \\Rightarrow x = 6\\) (gives \\(V = 0\\), rejected) or \\(12 - 6x = 0 \\Rightarrow x = 2\\).' },
                { text: '<strong>Step 4:</strong> Valid domain: \\(0 < x < 6\\). At \\(x = 2\\): \\(V = (12 - 4)^2 \\cdot 2 = 64 \\cdot 2 = 128\\).' },
                { text: '<strong>Answer:</strong> Cut corners of size \\(x = 2\\). Maximum volume \\(= 128\\).' }
            ]
        },

        // ── 10. Practice: Maximum Volume Box ──────────────────────
        {
            type: 'practice',
            intro: 'Find the corner size for maximum volume:',
            generate: () => OPTIMISATION.qMaxVolBox()
        },

        // ── 11. Practice: Maximum Revenue ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the optimal price for maximum revenue:',
            generate: () => OPTIMISATION.qMaxRevenue()
        },

        // ── 12. Practice: Minimum Surface Area Cylinder ────────────
        {
            type: 'practice',
            intro: 'Find the optimal radius for minimum surface area:',
            generate: () => OPTIMISATION.qMinCostCylinder()
        },

        // ── 13. Practice: Distance Optimisation ───────────────────
        {
            type: 'practice',
            intro: 'Find the minimum distance from the point to the curve:',
            generate: () => OPTIMISATION.qDistanceOptim()
        },

        // ── 14. Practice: Classify Minimum ────────────────────────
        {
            type: 'practice',
            intro: 'Classify the stationary point:',
            generate: () => OPTIMISATION.qClassifyMinimum()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Write an <strong>objective function</strong> for the quantity to optimise</li>' +
                '<li>Use the <strong>constraint</strong> to eliminate a variable</li>' +
                '<li>Set \\(f\'(x) = 0\\) to find <strong>critical points</strong></li>' +
                '<li>\\(f\'\' < 0 \\Rightarrow\\) <strong>maximum</strong>; \\(f\'\' > 0 \\Rightarrow\\) <strong>minimum</strong></li>' +
                '<li>On <strong>closed intervals</strong>, check endpoints for the global extremum</li>' +
                '<li>Always <strong>verify the nature</strong> of each stationary point</li>' +
                '</ul>'
        }
    ]
};
