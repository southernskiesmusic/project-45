const LESSON_AREAS_VOL = {
    id: 'further-areas-volumes',
    title: 'Further Areas & Volumes',
    subtitle: 'Areas between curves and volumes of revolution',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: Area Under a Curve ───────────────────────
        {
            type: 'concept',
            title: 'Area Under a Curve',
            content: '<p>The <strong>definite integral</strong> \\(\\displaystyle\\int_a^b f(x)\\,dx\\) gives the signed area between \\(f(x)\\) and the x-axis.</p>' +
                '<div class="lesson-box">' +
                '<strong>Area under f(x) from a to b:</strong><br>' +
                '\\(A = \\displaystyle\\int_a^b f(x)\\,dx\\) when \\(f(x) \\geq 0\\)<br><br>' +
                'If \\(f(x)\\) dips below the x-axis, take \\(\\displaystyle\\int_a^b |f(x)|\\,dx\\).' +
                '</div>' +
                '<p><strong>Area between two curves:</strong></p>' +
                '<p>If \\(f(x) \\geq g(x)\\) on \\([a,b]\\):</p>' +
                '\\[A = \\int_a^b \\bigl[f(x) - g(x)\\bigr]\\,dx\\]' +
                '<p>Find intersection points to determine limits of integration.</p>'
        },

        // ── 2. Practice: Area Under Line ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the area under the line from 0 to c:',
            generate: () => AREAS_VOL.qAreaUnderLine()
        },

        // ── 3. Practice: Area Under Parabola ─────────────────────
        {
            type: 'practice',
            intro: 'Find the area under the parabola:',
            generate: () => AREAS_VOL.qAreaUnderParabola()
        },

        // ── 4. Example: Area Between Curves ──────────────────────
        {
            type: 'example',
            problem: 'Find the area enclosed between \\(y = x + 2\\) and \\(y = x^2\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find intersections: \\(x^2 = x+2 \\Rightarrow x^2-x-2=0 \\Rightarrow (x-2)(x+1)=0\\), so \\(x=-1, x=2\\).' },
                { text: '<strong>Step 2:</strong> On \\([-1,2]\\), \\(x+2 \\geq x^2\\), so \\(A = \\int_{-1}^{2}(x+2-x^2)\\,dx\\).' },
                { text: '<strong>Step 3:</strong> \\(A = \\left[\\frac{x^2}{2}+2x-\\frac{x^3}{3}\\right]_{-1}^{2} = (2+4-\\frac{8}{3}) - (\\frac{1}{2}-2+\\frac{1}{3}) = \\frac{9}{2}\\).' },
                { text: '<strong>Answer:</strong> Area \\(= \\tfrac{9}{2}\\) square units.' }
            ]
        },

        // ── 5. Practice: Area Between Curves ─────────────────────
        {
            type: 'practice',
            intro: 'Find the area between the two curves on the given interval:',
            generate: () => AREAS_VOL.qAreaBetweenCurves()
        },

        // ── 6. Practice: Find Intersections ──────────────────────
        {
            type: 'practice',
            intro: 'Find the x-coordinates where the curves intersect:',
            generate: () => AREAS_VOL.qFindIntersections()
        },

        // ── 7. Concept: Volumes of Revolution ────────────────────
        {
            type: 'concept',
            title: 'Volumes of Revolution',
            content: '<p>Rotating a region about the <strong>x-axis</strong> creates a solid whose volume is:</p>' +
                '<div class="lesson-box">' +
                '\\[V = \\pi \\int_a^b [f(x)]^2\\,dx\\]' +
                'This is called the <strong>disc method</strong>.' +
                '</div>' +
                '<p>Similarly, rotating about the <strong>y-axis</strong> uses:</p>' +
                '\\[V = \\pi \\int_c^d [g(y)]^2\\,dy\\]' +
                '<p><strong>Key steps:</strong></p>' +
                '<ol>' +
                '<li>Identify the function and the axis of rotation</li>' +
                '<li>Square the function: \\([f(x)]^2\\)</li>' +
                '<li>Integrate and multiply by \\(\\pi\\)</li>' +
                '</ol>' +
                '<p>For a region between two curves rotated about the x-axis (washer method):</p>' +
                '\\[V = \\pi \\int_a^b \\bigl([f(x)]^2 - [g(x)]^2\\bigr)\\,dx\\]'
        },

        // ── 8. Practice: Volume of Revolution ────────────────────
        {
            type: 'practice',
            intro: 'Find the volume when the region is rotated about the x-axis:',
            generate: () => AREAS_VOL.qVolumeRevX()
        },

        // ── 9. Practice: Volume — Linear ─────────────────────────
        {
            type: 'practice',
            intro: 'Find the volume of revolution for the linear function:',
            generate: () => AREAS_VOL.qVolumeRevLinear()
        },

        // ── 10. Example: Volume from Intersection ────────────────
        {
            type: 'example',
            problem: 'Find the volume when the region bounded by \\(y = \\sqrt{x}\\) and \\(y = x\\) is rotated about the x-axis.',
            steps: [
                { text: '<strong>Step 1:</strong> Intersections: \\(\\sqrt{x} = x \\Rightarrow x=0, x=1\\).' },
                { text: '<strong>Step 2:</strong> On \\([0,1]\\), \\(\\sqrt{x} \\geq x\\), so use washer method: \\(V = \\pi\\int_0^1(x - x^2)\\,dx\\).' },
                { text: '<strong>Step 3:</strong> \\(V = \\pi\\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\pi\\left(\\frac{1}{2}-\\frac{1}{3}\\right) = \\frac{\\pi}{6}\\).' },
                { text: '<strong>Answer:</strong> \\(V = \\dfrac{\\pi}{6}\\).' }
            ]
        },

        // ── 11. Practice: Area from Intersection ─────────────────
        {
            type: 'practice',
            intro: 'Find the area of the region bounded by the two curves:',
            generate: () => AREAS_VOL.qAreaFromIntersection()
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Area under \\(f(x)\\): \\(A = \\int_a^b f(x)\\,dx\\) (for \\(f \\geq 0\\))</li>' +
                '<li>Area between curves: \\(A = \\int_a^b [f(x)-g(x)]\\,dx\\) (\\(f \\geq g\\))</li>' +
                '<li>Find limits by solving \\(f(x) = g(x)\\)</li>' +
                '<li>Volume of revolution (x-axis): \\(V = \\pi\\int_a^b [f(x)]^2\\,dx\\)</li>' +
                '<li>Washer method: \\(V = \\pi\\int_a^b([f]^2-[g]^2)\\,dx\\)</li>' +
                '<li>Always square the function before integrating for volume</li>' +
                '</ul>'
        }
    ]
};
