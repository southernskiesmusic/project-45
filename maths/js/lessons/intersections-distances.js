const LESSON_INT_DIST = {
    id: 'intersections-distances',
    title: 'Intersections and Distances',
    subtitle: 'Distances in 3D, line–plane intersections, parallel planes',
    folder: 'geometry-trig',
    screens: [
        {
            type: 'concept',
            title: 'Distances in 3D',
            content: '<p>Key distance formulas in 3D geometry:</p>' +
                '<div class="lesson-box">' +
                '<strong>Distance between two points</strong> \\(A(x_1,y_1,z_1)\\) and \\(B(x_2,y_2,z_2)\\):<br>' +
                '\\(|AB| = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}\\)<br><br>' +
                '<strong>Midpoint:</strong> \\(\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2},\\dfrac{z_1+z_2}{2}\\right)\\)<br><br>' +
                '<strong>Distance from point \\(P\\) to plane \\(ax+by+cz=d\\):</strong><br>' +
                '\\(D = \\dfrac{|ax_0+by_0+cz_0-d|}{\\sqrt{a^2+b^2+c^2}}\\)' +
                '</div>'
        },
        {
            type: 'practice',
            intro: 'Find the distance between the two 3D points:',
            generate: () => INT_DIST.qDistanceTwoPoints()
        },
        {
            type: 'practice',
            intro: 'Find the midpoint coordinate:',
            generate: () => INT_DIST.qMidpoint3D()
        },
        {
            type: 'example',
            problem: 'Find the distance from \\((1,0,2)\\) to the plane \\(2x+y-2z=3\\).',
            steps: [
                { text: '<strong>Normal magnitude:</strong> \\(|\\mathbf{n}| = \\sqrt{4+1+4} = 3\\).' },
                { text: '<strong>Numerator:</strong> \\(|2(1)+1(0)-2(2)-3| = |2-4-3| = |-5| = 5\\).' },
                { text: '<strong>Distance:</strong> \\(D = 5/3\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Find the distance from the point to the plane:',
            generate: () => INT_DIST.qDistancePointToPlane()
        },
        {
            type: 'practice',
            intro: 'Check whether the point lies on the plane:',
            generate: () => INT_DIST.qPointOnPlane()
        },
        {
            type: 'concept',
            title: 'Line–Plane Intersections',
            content: '<p>A line \\(\\mathbf{r} = \\mathbf{a} + t\\mathbf{d}\\) meets plane \\(\\mathbf{n}\\cdot\\mathbf{r} = k\\) when:</p>' +
                '<div class="lesson-box">' +
                'Substitute \\(\\mathbf{r}(t)\\) into the plane equation and solve for \\(t\\).' +
                '</div>' +
                '<p><strong>Distance between parallel planes</strong> \\(ax+by+cz=d_1\\) and \\(ax+by+cz=d_2\\):</p>' +
                '\\[D = \\dfrac{|d_1-d_2|}{\\sqrt{a^2+b^2+c^2}}\\]' +
                '<p><strong>Lines in 3D</strong> can be parallel, intersecting, or <strong>skew</strong> (non-coplanar, non-parallel).</p>'
        },
        {
            type: 'practice',
            intro: 'Find the parameter t where the line meets the plane:',
            generate: () => INT_DIST.qLinePlaneIntersect()
        },
        {
            type: 'practice',
            intro: 'Find the distance between the parallel planes:',
            generate: () => INT_DIST.qDistanceBetweenParallelPlanes()
        },
        {
            type: 'practice',
            intro: 'Classify the two lines as parallel, intersecting or skew:',
            generate: () => INT_DIST.qParallelOrIntersect()
        },
        {
            type: 'practice',
            intro: 'Find x where the two lines intersect:',
            generate: () => INT_DIST.qLineIntersection2D()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Distance \\(AB\\): \\(\\sqrt{\\Delta x^2+\\Delta y^2+\\Delta z^2}\\)</li>' +
                '<li>Midpoint: average of corresponding coordinates</li>' +
                '<li>Point to plane: \\(|ax_0+by_0+cz_0-d|/|\\mathbf{n}|\\)</li>' +
                '<li>Line–plane: substitute parametric line into plane equation, solve for \\(t\\)</li>' +
                '<li>Parallel planes distance: \\(|d_1-d_2|/|\\mathbf{n}|\\)</li>' +
                '<li>Lines in 3D: parallel / intersecting / skew</li>' +
                '</ul>'
        }
    ]
};
