const LESSON_VEC_KINEM = {
    id: 'vectors-kinematics',
    title: 'Vectors and Kinematics',
    subtitle: 'Position, velocity, acceleration and displacement vectors',
    folder: 'geometry-trig',
    screens: [
        {
            type: 'concept',
            title: 'Kinematics with Vectors',
            content: '<p>When a particle moves in 2D or 3D, its motion is described by vector functions of time \\(t\\):</p>' +
                '<div class="lesson-box">' +
                '<strong>Position:</strong> \\(\\mathbf{r}(t)\\)<br><br>' +
                '<strong>Velocity:</strong> \\(\\mathbf{v}(t) = \\dfrac{d\\mathbf{r}}{dt}\\)<br><br>' +
                '<strong>Acceleration:</strong> \\(\\mathbf{a}(t) = \\dfrac{d\\mathbf{v}}{dt} = \\dfrac{d^2\\mathbf{r}}{dt^2}\\)<br><br>' +
                '<strong>Speed:</strong> \\(|\\mathbf{v}(t)|\\)' +
                '</div>' +
                '<p>Each component is differentiated independently.</p>'
        },
        {
            type: 'practice',
            intro: 'Find the speed from the velocity vector:',
            generate: () => VEC_KINEM.qSpeedAtTime()
        },
        {
            type: 'practice',
            intro: 'Find the velocity by differentiating the position:',
            generate: () => VEC_KINEM.qVelocityFromPosition()
        },
        {
            type: 'example',
            problem: 'A particle has position \\(\\mathbf{r}(t) = (3t,\\, 4t^2)\\). Find the speed at \\(t = 1\\).',
            steps: [
                { text: '<strong>Differentiate:</strong> \\(\\mathbf{v}(t) = (3,\\, 8t)\\).' },
                { text: '<strong>At \\(t=1\\):</strong> \\(\\mathbf{v}(1) = (3, 8)\\).' },
                { text: '<strong>Speed:</strong> \\(|\\mathbf{v}| = \\sqrt{9+64} = \\sqrt{73}\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Find the acceleration component:',
            generate: () => VEC_KINEM.qAccelerationVector()
        },
        {
            type: 'practice',
            intro: 'Find the position vector at the given time:',
            generate: () => VEC_KINEM.qPositionAtTime()
        },
        {
            type: 'concept',
            title: 'Displacement and Relative Position',
            content: '<p>The <strong>displacement</strong> from point \\(A\\) to point \\(B\\) is:</p>' +
                '<div class="lesson-box">' +
                '\\(\\overrightarrow{AB} = \\mathbf{r}_B - \\mathbf{r}_A\\)' +
                '</div>' +
                '<p>The <strong>unit velocity vector</strong> gives the direction of motion:</p>' +
                '\\[\\hat{\\mathbf{v}} = \\dfrac{\\mathbf{v}}{|\\mathbf{v}|}\\]' +
                '<p><strong>Relative position</strong> of B with respect to A: \\(\\mathbf{r}_B - \\mathbf{r}_A\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Find the displacement vector component:',
            generate: () => VEC_KINEM.qDisplacementVector()
        },
        {
            type: 'practice',
            intro: 'Find the x-component of the unit velocity vector:',
            generate: () => VEC_KINEM.qUnitVelocity()
        },
        {
            type: 'practice',
            intro: 'Find t when the particle reaches the given x-position:',
            generate: () => VEC_KINEM.qTimeToOrigin()
        },
        {
            type: 'practice',
            intro: 'Identify the direction of motion from the velocity:',
            generate: () => VEC_KINEM.qParticleDirection()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(\\mathbf{v}(t) = d\\mathbf{r}/dt\\) — differentiate each component</li>' +
                '<li>\\(\\mathbf{a}(t) = d\\mathbf{v}/dt\\)</li>' +
                '<li>Speed: \\(|\\mathbf{v}| = \\sqrt{v_x^2+v_y^2+v_z^2}\\)</li>' +
                '<li>Displacement: \\(\\overrightarrow{AB} = \\mathbf{r}_B - \\mathbf{r}_A\\)</li>' +
                '<li>Unit velocity: \\(\\hat{\\mathbf{v}} = \\mathbf{v}/|\\mathbf{v}|\\)</li>' +
                '<li>Position at time \\(t\\): \\(\\mathbf{r}(0) + t\\mathbf{v}\\) (constant velocity)</li>' +
                '</ul>'
        }
    ]
};
