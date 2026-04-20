const LESSON_PLANES = {
    id: 'planes',
    title: 'Equations of Planes',
    subtitle: 'Normal vector, Cartesian and vector forms, distance',
    folder: 'geometry-trig',
    screens: [
        {
            type: 'concept',
            title: 'Equations of Planes',
            content: '<p>A <strong>plane</strong> in 3D space is determined by a point and a <strong>normal vector</strong> perpendicular to it.</p>' +
                '<div class="lesson-box">' +
                '<strong>Cartesian form:</strong> \\(ax + by + cz = d\\)<br>' +
                'Normal vector: \\(\\mathbf{n} = \\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}\\)<br><br>' +
                '<strong>Vector form:</strong> \\(\\mathbf{r} = \\mathbf{a} + \\lambda\\mathbf{b} + \\mu\\mathbf{c}\\)<br>' +
                'where \\(\\mathbf{b}\\) and \\(\\mathbf{c}\\) lie in the plane' +
                '</div>' +
                '<p><strong>Point-normal form:</strong> \\(\\mathbf{n}\\cdot(\\mathbf{r}-\\mathbf{a}) = 0\\), expanding to \\(\\mathbf{n}\\cdot\\mathbf{r} = d\\) where \\(d = \\mathbf{n}\\cdot\\mathbf{a}\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Identify the normal vector of the plane:',
            generate: () => PLANES.qNormalVector()
        },
        {
            type: 'practice',
            intro: 'Evaluate n·r for the given point:',
            generate: () => PLANES.qDotProductNormal()
        },
        {
            type: 'example',
            problem: 'Find the equation of the plane with normal \\((2,-1,3)\\) passing through \\((1,2,0)\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Use \\(\\mathbf{n}\\cdot(\\mathbf{r}-\\mathbf{a})=0\\).' },
                { text: '<strong>Step 2:</strong> \\(2(x-1) - 1(y-2) + 3(z-0) = 0\\).' },
                { text: '<strong>Step 3:</strong> \\(2x - 2 - y + 2 + 3z = 0\\).' },
                { text: '<strong>Answer:</strong> \\(2x - y + 3z = 0\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Find the value of the plane equation at the given point:',
            generate: () => PLANES.qPointOnPlane()
        },
        {
            type: 'practice',
            intro: 'Find the x-intercept using intercept form:',
            generate: () => PLANES.qInterceptForm()
        },
        {
            type: 'concept',
            title: 'Distance and Parallel Planes',
            content: '<p>The <strong>distance</strong> from point \\(P(x_0,y_0,z_0)\\) to plane \\(ax+by+cz=d\\) is:</p>' +
                '<div class="lesson-box">' +
                '\\(D = \\dfrac{|ax_0 + by_0 + cz_0 - d|}{\\sqrt{a^2+b^2+c^2}}\\)' +
                '</div>' +
                '<p><strong>Parallel planes</strong> have proportional normal vectors: \\(ax+by+cz=d_1\\) and \\(ax+by+cz=d_2\\) are parallel (different \\(d\\) values).</p>' +
                '<p><strong>Finding the normal from a plane:</strong> three non-collinear points \\(A,B,C\\) determine a plane. Normal = \\(\\overrightarrow{AB}\\times\\overrightarrow{AC}\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Find the distance from the point to the plane:',
            generate: () => PLANES.qDistanceToPlane()
        },
        {
            type: 'practice',
            intro: 'Find the magnitude of the normal vector:',
            generate: () => PLANES.qNormalMagnitude()
        },
        {
            type: 'practice',
            intro: 'Identify which plane is parallel to the given one:',
            generate: () => PLANES.qParallelPlanes()
        },
        {
            type: 'example',
            problem: 'Find the distance from \\((3,0,1)\\) to the plane \\(2x+y-2z=5\\).',
            steps: [
                { text: '<strong>Step 1:</strong> \\(|\\mathbf{n}| = \\sqrt{4+1+4} = 3\\).' },
                { text: '<strong>Step 2:</strong> Numerator: \\(|2(3)+1(0)-2(1)-5| = |6+0-2-5| = |-1| = 1\\).' },
                { text: '<strong>Answer:</strong> \\(D = \\dfrac{1}{3}\\).' }
            ]
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Plane: \\(ax+by+cz=d\\), normal \\(\\mathbf{n}=(a,b,c)\\)</li>' +
                '<li>Point-normal: \\(\\mathbf{n}\\cdot(\\mathbf{r}-\\mathbf{a})=0\\)</li>' +
                '<li>Parallel planes: same normal, different \\(d\\)</li>' +
                '<li>Normal from 3 points: cross product of two edge vectors</li>' +
                '<li>Distance point to plane: \\(|ax_0+by_0+cz_0-d|/|\\mathbf{n}|\\)</li>' +
                '<li>Intercept form: \\(x/p+y/q+z/r=1\\)</li>' +
                '</ul>'
        }
    ]
};
