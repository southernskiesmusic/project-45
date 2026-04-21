/* ================================================================
   LESSON: Forces and Dynamics (IB Physics A.2)
   ================================================================ */
const LESSON_PHYS_DYNAMICS = {
    id: 'dynamics',
    title: 'Forces and Dynamics',
    subtitle: "Newton's laws, friction, momentum, impulse",
    folder: 'topic-a',
    screens: [

        // 1. Concept: Newton's First Law
        {
            type: 'concept',
            title: "Newton's First Law - Inertia",
            html: '<p><strong>Dynamics</strong> studies the causes of motion - the forces that make objects accelerate, decelerate, or stay still.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Newton\'s First Law (Law of Inertia):</strong></p>' +
                '<p><em>An object remains at rest, or moves with constant velocity, unless acted upon by a net external force.</em></p>' +
                '</div>' +
                '<p>The key word is <strong>net force</strong> - the vector sum of all forces acting on an object. If the net force is zero, there is no acceleration.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Inertia</strong> is the tendency of an object to resist changes in its state of motion. Greater mass = greater inertia.</p>' +
                '</div>' +
                '<p><strong>Examples:</strong></p>' +
                '<ul>' +
                '<li>A book sitting on a table has zero net force (gravity down = normal force up). It stays still.</li>' +
                '<li>A spacecraft far from any planet continues at constant velocity indefinitely - no friction in space.</li>' +
                '<li>A tablecloth pulled sharply from under plates: the plates\' inertia keeps them in place momentarily.</li>' +
                '</ul>' +
                '<p><strong>Equilibrium:</strong> When \\(\\sum F = 0\\), the object is in <strong>translational equilibrium</strong> - it is either at rest or moving at constant velocity.</p>'
        },

        // 2. Concept: Newton's Second Law
        {
            type: 'concept',
            title: "Newton's Second Law - F = ma",
            html: '<p>Newton\'s Second Law tells us <em>exactly</em> how a net force changes an object\'s motion.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Newton\'s Second Law:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(F_{\\text{net}} = ma\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(F_{\\text{net}}\\) = net force in Newtons (N)</li>' +
                '<li>\\(m\\) = mass in kg</li>' +
                '<li>\\(a\\) = acceleration in m s\\(^{-2}\\)</li>' +
                '</ul>' +
                '<p>1 Newton = 1 kg m s\\(^{-2}\\)</p>' +
                '</div>' +
                '<p>This law is a <strong>vector equation</strong>. In two dimensions, it applies separately to each direction:</p>' +
                '<p>\\(F_x = ma_x\\) &nbsp;&nbsp; and &nbsp;&nbsp; \\(F_y = ma_y\\)</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Key consequence:</strong></p>' +
                '<ul>' +
                '<li>Larger net force on same mass = larger acceleration</li>' +
                '<li>Same net force on larger mass = smaller acceleration</li>' +
                '<li>If net force is zero: \\(a = 0\\) (Newton\'s First Law is a special case)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Free body diagrams (FBDs)</strong> are essential - draw all forces on the object as arrows from the object\'s centre, labelled with magnitude and direction. Always draw the FBD before writing equations.</p>'
        },

        // 3. Concept: Newton's Third Law
        {
            type: 'concept',
            title: "Newton's Third Law - Action-Reaction Pairs",
            html: '<p>Newton\'s Third Law describes how forces between two objects always come in pairs.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Newton\'s Third Law:</strong></p>' +
                '<p><em>When object A exerts a force on object B, object B exerts an equal and opposite force on object A.</em></p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\vec{F}_{A\\to B} = -\\vec{F}_{B\\to A}\\)</p>' +
                '</div>' +
                '<p><strong>Critical features of Newton\'s 3rd Law pairs:</strong></p>' +
                '<ul>' +
                '<li>They are <strong>equal in magnitude</strong></li>' +
                '<li>They are <strong>opposite in direction</strong></li>' +
                '<li>They act on <strong>different objects</strong></li>' +
                '<li>They are the <strong>same type</strong> of force (both gravitational, or both normal, etc.)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>Example - foot pushing on ground:</strong></p>' +
                '<ul>' +
                '<li>Foot pushes backward on ground (action)</li>' +
                '<li>Ground pushes forward on foot (reaction) - this is what propels you forward</li>' +
                '</ul>' +
                '<p>These forces do NOT cancel because they act on different objects.</p>' +
                '</div>' +
                '<p><strong>Common mistake:</strong> Students try to cancel the two forces of a Newton 3rd pair. You cannot - they act on different objects. Only forces on the <em>same</em> object can cancel.</p>'
        },

        // 4. Concept: Weight vs Mass
        {
            type: 'concept',
            title: 'Weight and Mass',
            html: '<p>Mass and weight are related but fundamentally different quantities.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Mass</strong> (\\(m\\)) is the amount of matter in an object. It is a <strong>scalar</strong> measured in kg. Mass is the same everywhere in the universe.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Weight</strong> (\\(W\\)) is the gravitational force on an object:</p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(W = mg\\)</p>' +
                '<p>Weight is a <strong>vector</strong> (directed toward the centre of the planet) measured in Newtons. Weight depends on \\(g\\), which varies by location.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Comparison:</strong></p>' +
                '<table style="width:100%;border-collapse:collapse;">' +
                '<tr><th style="text-align:left;padding:4px;">Property</th><th>Mass</th><th>Weight</th></tr>' +
                '<tr><td style="padding:4px;">Type</td><td>Scalar</td><td>Vector</td></tr>' +
                '<tr><td style="padding:4px;">Unit</td><td>kg</td><td>N</td></tr>' +
                '<tr><td style="padding:4px;">Changes location?</td><td>No</td><td>Yes</td></tr>' +
                '</table>' +
                '</div>' +
                '<p><strong>Example:</strong> An astronaut of mass 80 kg has weight \\(W = 80 \\times 9.81 = 785\\text{ N}\\) on Earth, but only \\(W = 80 \\times 1.62 = 130\\text{ N}\\) on the Moon (where \\(g = 1.62\\text{ m s}^{-2}\\)).</p>'
        },

        // 5. Example: Pushing a block
        {
            type: 'example',
            title: 'Worked Example - Pushing a Block',
            problem: '\\text{A force of 40 N is applied horizontally to a 5 kg block on a smooth surface. A friction force of 8 N acts. Find the acceleration and the distance travelled in 3 s from rest.}',
            steps: [
                { text: '<strong>Step 1: Draw a free body diagram.</strong> Forces acting: applied force 40 N (right), friction 8 N (left), weight 5 × 9.81 = 49 N (down), normal force 49 N (up).' },
                { text: '<strong>Step 2: Find the net force</strong> in the horizontal direction.<br>\\(F_{\\text{net}} = 40 - 8 = 32\\text{ N}\\)' },
                { text: '<strong>Step 3: Apply Newton\'s Second Law.</strong><br>\\(a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{32}{5} = 6.4\\text{ m s}^{-2}\\)' },
                { text: '<strong>Step 4: Find distance in 3 s.</strong> Use \\(s = ut + \\dfrac{1}{2}at^2\\) with \\(u = 0\\):' },
                { text: '\\(s = 0 + \\dfrac{1}{2}(6.4)(3)^2 = \\dfrac{1}{2}(6.4)(9) = 28.8\\text{ m}\\)' }
            ]
        },

        // 6. Practice: Newton's Second Law
        {
            type: 'practice',
            intro: 'Apply Newton\'s Second Law to find the unknown:',
            generate: () => PHYS_DYNAMICS.qNewton2()
        },

        // 7. Concept: Friction
        {
            type: 'concept',
            title: 'Friction',
            html: '<p>Friction is a contact force that opposes relative motion (or tendency of motion) between surfaces.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Static friction:</strong> acts when surfaces are not sliding. Can take any value up to a maximum:</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(f_s \\leq \\mu_s N\\)</p>' +
                '<p><strong>Kinetic (sliding) friction:</strong> acts when surfaces slide against each other:</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(f_k = \\mu_k N\\)</p>' +
                '<p>where \\(N\\) is the normal (contact) force and \\(\\mu\\) is the coefficient of friction.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Key properties of friction:</strong></p>' +
                '<ul>' +
                '<li>\\(\\mu_s > \\mu_k\\) always - it takes more force to start moving than to keep moving</li>' +
                '<li>Friction is <strong>independent of contact area</strong> (for dry surfaces)</li>' +
                '<li>Friction depends on the <strong>normal force</strong>, not on the applied force directly</li>' +
                '<li>On a horizontal surface: \\(N = mg\\), so \\(f_k = \\mu_k mg\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>On an inclined plane:</strong> The normal force is \\(N = mg\\cos\\theta\\), not \\(mg\\). Always resolve forces parallel and perpendicular to the slope.</p>'
        },

        // 8. Practice: Friction
        {
            type: 'practice',
            intro: 'Calculate the friction force or acceleration:',
            generate: () => PHYS_DYNAMICS.qFriction()
        },

        // 9. Concept: Momentum and Impulse
        {
            type: 'concept',
            title: 'Momentum and Impulse',
            html: '<p><strong>Linear momentum</strong> is a fundamental quantity in physics. It is conserved in all collisions and interactions where there is no external net force.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Momentum:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(p = mv\\)</p>' +
                '<p>Units: kg m s\\(^{-1}\\) = N s. Momentum is a <strong>vector</strong>.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Impulse:</strong></p>' +
                '<p>The <strong>impulse</strong> of a force is the change in momentum it causes:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(J = F\\Delta t = \\Delta p = mv - mu\\)</p>' +
                '<p>Units: N s = kg m s\\(^{-1}\\). Impulse equals the area under a force-time graph.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Conservation of momentum:</strong></p>' +
                '<p>In an isolated system (no external net force):</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\sum p_{\\text{before}} = \\sum p_{\\text{after}}\\)</p>' +
                '<p>This is one of the most powerful laws in physics - it holds true even in quantum mechanics and relativity.</p>' +
                '</div>'
        },

        // 10. Practice: Impulse
        {
            type: 'practice',
            intro: 'Find the impulse or change in momentum:',
            generate: () => PHYS_DYNAMICS.qImpulse()
        },

        // 11. Concept: Atwood Machine (HL concept)
        {
            type: 'concept',
            title: 'Connected Objects and the Atwood Machine',
            html: '<p>Many problems involve two or more objects connected by a string or rope over a pulley. The key is to treat each object separately with its own free body diagram, but remember they share the same acceleration and the string tension is the same throughout (for a massless string and frictionless pulley).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Atwood machine:</strong> Two masses \\(m_1\\) and \\(m_2\\) connected over a pulley. If \\(m_1 > m_2\\), mass \\(m_1\\) accelerates downward.</p>' +
                '<p>For the system, taking \\(m_1\\)\'s direction as positive:</p>' +
                '<p>\\(m_1 g - T = m_1 a\\) &nbsp;&nbsp; (equation for \\(m_1\\))</p>' +
                '<p>\\(T - m_2 g = m_2 a\\) &nbsp;&nbsp; (equation for \\(m_2\\))</p>' +
                '<p>Adding both equations:</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(a = \\dfrac{(m_1 - m_2)g}{m_1 + m_2}\\)</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(T = \\dfrac{2m_1 m_2 g}{m_1 + m_2}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>General strategy for connected objects:</strong></p>' +
                '<ol>' +
                '<li>Draw separate FBDs for each object</li>' +
                '<li>Write Newton\'s Second Law for each object (taking the direction of motion as positive for each)</li>' +
                '<li>Add or combine equations to eliminate tension \\(T\\)</li>' +
                '<li>Solve for \\(a\\), then find \\(T\\)</li>' +
                '</ol>' +
                '</div>'
        },

        // 12. Summary
        {
            type: 'summary',
            title: 'Forces and Dynamics - Key Points',
            html: '<div class="lesson-box">' +
                '<p><strong>Newton\'s Laws:</strong></p>' +
                '<ul>' +
                '<li>1st: No net force = no acceleration (inertia)</li>' +
                '<li>2nd: \\(F_{\\text{net}} = ma\\) (vector equation)</li>' +
                '<li>3rd: Forces come in equal, opposite pairs on different objects</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Weight:</strong> \\(W = mg\\) - a force in Newtons, not the same as mass.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Friction:</strong></p>' +
                '<p>\\(f_k = \\mu_k N\\) (kinetic) &nbsp; and &nbsp; \\(f_s \\leq \\mu_s N\\) (static)</p>' +
                '<p>Always find \\(N\\) first (it equals \\(mg\\) only on flat horizontal surfaces).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Momentum and Impulse:</strong></p>' +
                '<p>\\(p = mv\\) &nbsp;&nbsp; \\(J = F\\Delta t = \\Delta p\\)</p>' +
                '<p>Conservation: \\(\\sum p_{\\text{before}} = \\sum p_{\\text{after}}\\) (isolated system)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Problem-solving tips:</strong></p>' +
                '<ul>' +
                '<li>Always draw a free body diagram first</li>' +
                '<li>Define a positive direction before writing equations</li>' +
                '<li>For connected objects: write equations for each separately, then combine</li>' +
                '</ul>' +
                '</div>'
        }
    ]
};
