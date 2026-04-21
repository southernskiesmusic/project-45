/* ================================================================
   LESSON: Kinematics (IB Physics A.1 / A.3)
   ================================================================ */
const LESSON_PHYS_KINEMATICS = {
    id: 'kinematics-1d',
    title: 'Kinematics',
    subtitle: 'Motion, SUVAT equations, free fall, projectile motion',
    folder: 'topic-a',
    screens: [

        // 1. Concept: Distance, Displacement and Position
        {
            type: 'concept',
            title: 'Distance and Displacement',
            html: '<p>Kinematics is the study of motion - describing <em>how</em> objects move without asking <em>why</em> they move. We begin with the most fundamental quantities.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Distance</strong> is the total length of the path travelled. It is a <strong>scalar</strong> - it has magnitude only.</p>' +
                '<p><strong>Displacement</strong> is the change in position from start to finish. It is a <strong>vector</strong> - it has both magnitude and direction.</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\Delta x = x_{\\text{final}} - x_{\\text{initial}}\\)</p>' +
                '</div>' +
                '<p><strong>Example:</strong> A person walks 3 m east then 4 m west.</p>' +
                '<ul>' +
                '<li>Distance travelled = \\(3 + 4 = 7\\text{ m}\\)</li>' +
                '<li>Displacement = \\(3 - 4 = -1\\text{ m}\\) (i.e., 1 m west of the start)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>SI units:</strong></p>' +
                '<ul>' +
                '<li>Distance and displacement: metres (m)</li>' +
                '<li>Time: seconds (s)</li>' +
                '</ul>' +
                '</div>' +
                '<p>In IB Physics we use the symbol \\(s\\) or \\(x\\) for displacement, depending on context. In the SUVAT equations, \\(s\\) is used for displacement.</p>'
        },

        // 2. Concept: Velocity and Acceleration
        {
            type: 'concept',
            title: 'Velocity and Acceleration',
            html: '<p>Both velocity and acceleration are <strong>vector</strong> quantities - direction matters.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Average velocity:</strong></p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(v = \\dfrac{\\Delta x}{\\Delta t}\\)</p>' +
                '<p>Units: m s\\(^{-1}\\) (metres per second)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Acceleration:</strong></p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{v - u}{t}\\)</p>' +
                '<p>Units: m s\\(^{-2}\\) (metres per second squared)</p>' +
                '</div>' +
                '<p>Here \\(u\\) is the <strong>initial velocity</strong> and \\(v\\) is the <strong>final velocity</strong>. This notation is used throughout the SUVAT equations.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Speed vs Velocity:</strong></p>' +
                '<ul>' +
                '<li><strong>Speed</strong> is the magnitude of velocity - always positive</li>' +
                '<li><strong>Velocity</strong> includes direction - can be negative</li>' +
                '</ul>' +
                '<p>Example: a car going at 20 m s\\(^{-1}\\) to the left has velocity \\(v = -20\\text{ m s}^{-1}\\) (if rightward is positive) but speed \\(= 20\\text{ m s}^{-1}\\).</p>' +
                '</div>'
        },

        // 3. Concept: SUVAT Equations
        {
            type: 'concept',
            title: 'The SUVAT Equations',
            html: '<p>When acceleration is <strong>constant</strong>, we can use the SUVAT equations to relate displacement, velocity, acceleration and time. These are the core equations of kinematics.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Variables:</strong></p>' +
                '<ul>' +
                '<li>\\(s\\) - displacement (m)</li>' +
                '<li>\\(u\\) - initial velocity (m s\\(^{-1}\\))</li>' +
                '<li>\\(v\\) - final velocity (m s\\(^{-1}\\))</li>' +
                '<li>\\(a\\) - acceleration (m s\\(^{-2}\\))</li>' +
                '<li>\\(t\\) - time (s)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The four SUVAT equations:</strong></p>' +
                '<p>\\(v = u + at\\) &nbsp;&nbsp;&nbsp;&nbsp;(no \\(s\\))</p>' +
                '<p>\\(s = ut + \\dfrac{1}{2}at^2\\) &nbsp;&nbsp;&nbsp;&nbsp;(no \\(v\\))</p>' +
                '<p>\\(v^2 = u^2 + 2as\\) &nbsp;&nbsp;&nbsp;&nbsp;(no \\(t\\))</p>' +
                '<p>\\(s = \\dfrac{(u + v)}{2} \\cdot t\\) &nbsp;&nbsp;&nbsp;&nbsp;(no \\(a\\))</p>' +
                '</div>' +
                '<p><strong>Strategy:</strong> You are always given three variables and asked to find a fourth. Identify which equation contains exactly those four variables (the three known + one unknown).</p>' +
                '<p><strong>IB tip:</strong> These equations are in the IB data booklet. You do not need to memorise them, but you must be able to select and apply the right one quickly.</p>'
        },

        // 4. Example: Car decelerating
        {
            type: 'example',
            title: 'Worked Example - Car Decelerating',
            problem: '\\text{A car travelling at } 25 \\text{ m s}^{-1} \\text{ brakes with deceleration } 4\\text{ m s}^{-2}. \\text{ Find the stopping distance.}',
            steps: [
                { text: '<strong>Step 1: Identify the SUVAT variables.</strong><br>\\(u = 25\\text{ m s}^{-1}\\), \\(v = 0\\text{ m s}^{-1}\\) (stops), \\(a = -4\\text{ m s}^{-2}\\) (deceleration = negative acceleration), \\(s = ?\\)' },
                { text: '<strong>Step 2: Choose the right equation.</strong><br>We know \\(u\\), \\(v\\), \\(a\\) and want \\(s\\). Use \\(v^2 = u^2 + 2as\\).' },
                { text: '<strong>Step 3: Substitute.</strong><br>\\(0^2 = 25^2 + 2(-4)(s)\\)' },
                { text: '\\(0 = 625 - 8s\\)' },
                { text: '\\(8s = 625\\)' },
                { text: '\\(s = 78.125 \\approx 78.1\\text{ m}\\)' },
                { text: '<strong>Check:</strong> Distance is positive \\(\\checkmark\\). The car travels about 78 m before stopping.' }
            ]
        },

        // 5. Practice: SUVAT
        {
            type: 'practice',
            intro: 'Apply the SUVAT equations to find the unknown quantity:',
            generate: () => PHYS_KINEMATICS.qSUVAT()
        },

        // 6. Concept: Free Fall and g
        {
            type: 'concept',
            title: 'Free Fall and Gravitational Acceleration',
            html: '<p>Near Earth\'s surface, any object in free fall (ignoring air resistance) accelerates downward at:</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.3em;">\\(g = 9.81\\text{ m s}^{-2}\\)</p>' +
                '<p>This is the <strong>acceleration due to gravity</strong> (also the gravitational field strength at Earth\'s surface).</p>' +
                '</div>' +
                '<p>In free fall problems, simply use the SUVAT equations with \\(a = -g = -9.81\\text{ m s}^{-2}\\) (if upward is positive).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Sign convention (upward positive):</strong></p>' +
                '<ul>' +
                '<li>Displacement upward: positive</li>' +
                '<li>Displacement downward: negative</li>' +
                '<li>Acceleration due to gravity: \\(a = -9.81\\text{ m s}^{-2}\\)</li>' +
                '<li>Initial velocity upward: positive</li>' +
                '<li>Initial velocity downward: negative</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Important:</strong> All objects fall with the same acceleration in a vacuum, regardless of mass. A feather and a hammer fall identically on the Moon (no air).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Key results for an object dropped from rest:</strong></p>' +
                '<p>Speed after time \\(t\\): \\(v = gt\\)</p>' +
                '<p>Distance fallen after time \\(t\\): \\(s = \\dfrac{1}{2}gt^2\\)</p>' +
                '<p>Speed after falling distance \\(s\\): \\(v = \\sqrt{2gs}\\)</p>' +
                '</div>'
        },

        // 7. Example: Drop from building
        {
            type: 'example',
            title: 'Worked Example - Object Dropped from a Building',
            problem: '\\text{A stone is dropped from rest from the top of a building 45 m tall. Calculate (a) the time to reach the ground, (b) the speed on impact. Take } g = 9.81\\text{ m s}^{-2}.',
            steps: [
                { text: '<strong>Setup:</strong> Take downward as positive for convenience here.<br>\\(u = 0\\) (dropped from rest), \\(a = 9.81\\text{ m s}^{-2}\\), \\(s = 45\\text{ m}\\).' },
                { text: '<strong>(a) Time:</strong> Use \\(s = ut + \\dfrac{1}{2}at^2\\):' },
                { text: '\\(45 = 0 + \\dfrac{1}{2}(9.81)t^2\\)' },
                { text: '\\(t^2 = \\dfrac{45 \\times 2}{9.81} = \\dfrac{90}{9.81} = 9.174\\)' },
                { text: '\\(t = \\sqrt{9.174} \\approx 3.03\\text{ s}\\)' },
                { text: '<strong>(b) Speed on impact:</strong> Use \\(v = u + at\\):' },
                { text: '\\(v = 0 + (9.81)(3.03) = 29.7\\text{ m s}^{-1}\\)' },
                { text: '<strong>Check using \\(v^2 = u^2 + 2as\\):</strong> \\(v^2 = 0 + 2(9.81)(45) = 882.9\\), so \\(v = 29.7\\text{ m s}^{-1} \\checkmark\\)' }
            ]
        },

        // 8. Practice: Free fall
        {
            type: 'practice',
            intro: 'Solve this free fall problem:',
            generate: () => PHYS_KINEMATICS.qFreeFall()
        },

        // 9. Concept: Projectile Motion
        {
            type: 'concept',
            title: 'Projectile Motion',
            html: '<p>A <strong>projectile</strong> is any object launched into the air and subject only to gravity (ignoring air resistance). The key insight is that horizontal and vertical motion are <strong>independent</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Horizontal motion:</strong></p>' +
                '<p>Constant velocity - no horizontal force means no horizontal acceleration:</p>' +
                '<p style="text-align:center;">\\(x = v_x t\\) &nbsp;&nbsp; where \\(v_x = v_0\\cos\\theta\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Vertical motion:</strong></p>' +
                '<p>Constant acceleration downward (\\(a = -g\\)):</p>' +
                '<p style="text-align:center;">\\(v_y = v_0\\sin\\theta - gt\\)</p>' +
                '<p style="text-align:center;">\\(y = v_0\\sin\\theta \\cdot t - \\dfrac{1}{2}gt^2\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Strategy for projectile problems:</strong></p>' +
                '<ol>' +
                '<li>Resolve the initial velocity into horizontal and vertical components.</li>' +
                '<li>Apply SUVAT to the vertical direction to find the time of flight.</li>' +
                '<li>Use the horizontal equation to find range, or vice versa.</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Key result:</strong> At maximum height, the <em>vertical</em> velocity is zero. The <em>horizontal</em> velocity is unchanged throughout the flight.</p>'
        },

        // 10. Practice: Projectile
        {
            type: 'practice',
            intro: 'Solve this projectile motion problem:',
            generate: () => PHYS_KINEMATICS.qProjectile()
        },

        // 11. Summary
        {
            type: 'summary',
            title: 'Kinematics - Key Points',
            html: '<div class="lesson-box">' +
                '<p><strong>Displacement vs Distance:</strong></p>' +
                '<p>Displacement is a vector (direction matters). Distance is a scalar (path length).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The four SUVAT equations (constant acceleration only):</strong></p>' +
                '<p>\\(v = u + at\\)</p>' +
                '<p>\\(s = ut + \\frac{1}{2}at^2\\)</p>' +
                '<p>\\(v^2 = u^2 + 2as\\)</p>' +
                '<p>\\(s = \\frac{(u+v)}{2} \\cdot t\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Free fall:</strong> \\(a = g = 9.81\\text{ m s}^{-2}\\) downward. All objects accelerate identically (in a vacuum).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Projectile motion:</strong></p>' +
                '<ul>' +
                '<li>Horizontal: constant velocity \\(v_x = v_0\\cos\\theta\\)</li>' +
                '<li>Vertical: constant acceleration \\(a = -g\\)</li>' +
                '<li>At maximum height: \\(v_y = 0\\)</li>' +
                '<li>Treat the two directions completely independently</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sign conventions matter!</strong> Define positive direction at the start of every problem and stick to it throughout.</p>' +
                '</div>'
        }
    ]
};
