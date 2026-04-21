/* ================================================================
   LESSON: Gravitational Fields (IB Physics D.1)
   ================================================================ */
const LESSON_PHYS_GRAV = {
    id: 'grav-fields',
    title: 'Gravitational Fields',
    subtitle: "Newton's law of gravitation, field strength, orbital motion",
    folder: 'topic-d',
    screens: [

        // 1. Concept: The Gravitational Force
        {
            type: 'concept',
            title: 'Gravitational Force',
            html: '<p>Gravity is the force of attraction between all objects that have mass. It is one of the four fundamental forces of nature and the dominant force on cosmic scales.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Key properties of gravity:</strong></p>' +
                '<ul>' +
                '<li>Always <strong>attractive</strong> - never repulsive</li>' +
                '<li>Acts <strong>at a distance</strong> (no contact required) - it is a field force</li>' +
                '<li>Has <strong>infinite range</strong> - it extends throughout the universe, weakening with distance</li>' +
                '<li>Acts between <strong>all masses</strong>, not just planets</li>' +
                '</ul>' +
                '</div>' +
                '<p>Gravity is incredibly weak compared to other fundamental forces. The gravitational attraction between two protons is about 10\\(^{36}\\) times smaller than their electrostatic repulsion. Yet on planetary scales, gravity dominates because planets are electrically neutral (positive and negative charges cancel out).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Gravitational field:</strong> The region of space around a mass where another mass experiences a gravitational force. We represent gravitational fields with <strong>field lines</strong> pointing toward the mass (the direction a small test mass would move).</p>' +
                '</div>'
        },

        // 2. Concept: Newton's Law of Gravitation
        {
            type: 'concept',
            title: "Newton's Law of Universal Gravitation",
            html: '<p>Isaac Newton quantified gravity with a precise mathematical law that works for everything from apples falling to galaxies orbiting each other.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Newton\'s Law of Universal Gravitation:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(F = \\dfrac{Gm_1 m_2}{r^2}\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(F\\) = gravitational force (N)</li>' +
                '<li>\\(G = 6.674 \\times 10^{-11}\\text{ N m}^2\\text{ kg}^{-2}\\) = universal gravitational constant</li>' +
                '<li>\\(m_1, m_2\\) = the two masses (kg)</li>' +
                '<li>\\(r\\) = distance between their centres (m)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Inverse-square law:</strong> Doubling the distance reduces the force by a factor of 4. Tripling the distance reduces force by a factor of 9.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>By Newton\'s Third Law:</strong> Both masses experience equal and opposite forces. Earth pulls you downward with the same force that you pull Earth upward - but Earth barely accelerates because its mass is enormous.</p>' +
                '</div>' +
                '<p><strong>Important:</strong> \\(r\\) is measured from the <em>centres</em> of the masses, not their surfaces. For a satellite above Earth, \\(r = R_{\\text{Earth}} + h\\) where \\(h\\) is altitude.</p>'
        },

        // 3. Practice: Gravitational force
        {
            type: 'practice',
            intro: "Apply Newton's law of gravitation:",
            generate: () => PHYS_GRAV.qGravForce()
        },

        // 4. Concept: Gravitational Field Strength
        {
            type: 'concept',
            title: 'Gravitational Field Strength',
            html: '<p>Rather than always thinking about forces between pairs of masses, it is useful to describe a <strong>gravitational field</strong> - the effect a mass has on the surrounding space.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Gravitational field strength (\\(g\\)):</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(g = \\dfrac{F}{m} = \\dfrac{GM}{r^2}\\)</p>' +
                '<p>This is the gravitational force per unit mass at a point in the field. Units: N kg\\(^{-1}\\) = m s\\(^{-2}\\).</p>' +
                '<p>Here \\(M\\) is the mass creating the field and \\(r\\) is the distance from its centre.</p>' +
                '</div>' +
                '<p>Notice that \\(g\\) at Earth\'s surface is exactly the acceleration due to gravity - these are the same quantity.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Variation with distance:</strong></p>' +
                '<ul>' +
                '<li>At Earth\'s surface: \\(g = 9.81\\text{ N kg}^{-1}\\)</li>' +
                '<li>At altitude \\(h\\) above Earth: \\(g = \\dfrac{GM_{\\text{Earth}}}{(R_{\\text{Earth}} + h)^2}\\)</li>' +
                '<li>\\(g\\) follows an <strong>inverse-square law</strong> with distance from centre</li>' +
                '</ul>' +
                '</div>' +
                '<p>Inside a uniform sphere, \\(g\\) actually decreases linearly toward zero at the centre - though for IB purposes we mostly consider the field outside the surface.</p>'
        },

        // 5. Concept: Surface g vs Altitude
        {
            type: 'concept',
            title: 'Gravitational Field at Different Altitudes',
            html: '<p>As you move away from Earth\'s surface, the gravitational field strength decreases. The inverse-square relationship means it decreases relatively slowly at first.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>At Earth\'s surface:</strong> \\(r = R_E = 6.37 \\times 10^6\\text{ m}\\)</p>' +
                '<p style="text-align:center;">\\(g_s = \\dfrac{GM_E}{R_E^2} = 9.81\\text{ N kg}^{-1}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>At altitude \\(h\\):</strong> \\(r = R_E + h\\)</p>' +
                '<p style="text-align:center;">\\(g_h = \\dfrac{GM_E}{(R_E + h)^2}\\)</p>' +
                '<p><strong>Ratio:</strong> \\(\\dfrac{g_h}{g_s} = \\dfrac{R_E^2}{(R_E + h)^2} = \\left(\\dfrac{R_E}{R_E + h}\\right)^2\\)</p>' +
                '</div>' +
                '<p><strong>Example values:</strong></p>' +
                '<ul>' +
                '<li>At the International Space Station (~400 km altitude): \\(g \\approx 8.7\\text{ N kg}^{-1}\\) (90% of surface value)</li>' +
                '<li>At geostationary orbit (~36,000 km altitude): \\(g \\approx 0.22\\text{ N kg}^{-1}\\)</li>' +
                '<li>At the Moon\'s distance (~384,000 km): \\(g \\approx 0.0027\\text{ N kg}^{-1}\\)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>Why astronauts on the ISS feel weightless:</strong> The ISS is in free fall - both the station and the astronauts are accelerating toward Earth at the same rate (\\(g \\approx 8.7\\text{ m s}^{-2}\\)). There is no normal force, so they feel weightless. Gravity is still present - that\'s what keeps them in orbit!</p>' +
                '</div>'
        },

        // 6. Example: ISS orbital calculation
        {
            type: 'example',
            title: 'Worked Example - ISS Orbital Speed',
            problem: '\\text{The International Space Station orbits at 420 km above Earth\'s surface. Calculate its orbital speed. } (M_E = 5.97 \\times 10^{24}\\text{ kg},\\; R_E = 6.37 \\times 10^6\\text{ m})',
            steps: [
                { text: '<strong>Step 1: Find the orbital radius.</strong><br>\\(r = R_E + h = 6.37 \\times 10^6 + 0.42 \\times 10^6 = 6.79 \\times 10^6\\text{ m}\\)' },
                { text: '<strong>Step 2: Set up the orbital condition.</strong> The gravitational force provides the centripetal force:<br>\\(\\dfrac{GM_E m}{r^2} = \\dfrac{mv^2}{r}\\)' },
                { text: '<strong>Step 3: Cancel mass \\(m\\) and rearrange.</strong><br>\\(v^2 = \\dfrac{GM_E}{r}\\)' },
                { text: '<strong>Step 4: Substitute values.</strong><br>\\(v^2 = \\dfrac{(6.674 \\times 10^{-11})(5.97 \\times 10^{24})}{6.79 \\times 10^6}\\)' },
                { text: '\\(v^2 = \\dfrac{3.984 \\times 10^{14}}{6.79 \\times 10^6} = 5.87 \\times 10^7\\text{ m}^2\\text{s}^{-2}\\)' },
                { text: '\\(v = \\sqrt{5.87 \\times 10^7} = 7660\\text{ m s}^{-1} \\approx 7.7\\text{ km s}^{-1}\\)' },
                { text: '<strong>Context:</strong> The ISS travels at about 7.7 km per second, completing one orbit every ~92 minutes. Passengers see 16 sunrises per day!' }
            ]
        },

        // 7. Practice: Orbital velocity
        {
            type: 'practice',
            intro: 'Calculate the orbital speed of the satellite:',
            generate: () => PHYS_GRAV.qOrbitalVelocity()
        },

        // 8. Concept: Kepler's Third Law
        {
            type: 'concept',
            title: "Kepler's Third Law",
            html: '<p>Kepler\'s Third Law relates the orbital period to the orbital radius. It was originally discovered empirically by Kepler from astronomical data, and later derived theoretically by Newton.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Kepler\'s Third Law:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(T^2 = \\dfrac{4\\pi^2 r^3}{GM}\\)</p>' +
                '<p>or equivalently: \\(T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}\\)</p>' +
                '<p>where \\(T\\) is the orbital period, \\(r\\) is the orbital radius (from the centre of the planet), and \\(M\\) is the mass of the central body.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Derivation:</strong></p>' +
                '<p>Set gravitational force = centripetal force: \\(\\dfrac{GMm}{r^2} = \\dfrac{4\\pi^2 mr}{T^2}\\)</p>' +
                '<p>(using \\(a = \\dfrac{4\\pi^2 r}{T^2}\\) for circular motion)</p>' +
                '<p>Rearranging: \\(T^2 = \\dfrac{4\\pi^2 r^3}{GM}\\)</p>' +
                '</div>' +
                '<p><strong>Key insight:</strong> For all satellites of the same planet, \\(T^2/r^3\\) is constant. A satellite at greater radius has a longer period. Geostationary satellites have \\(T = 24\\text{ h}\\) by design, which determines their orbital radius.</p>'
        },

        // 9. Concept: Escape Velocity
        {
            type: 'concept',
            title: 'Escape Velocity',
            html: '<p>What minimum speed must an object have to escape from a planet\'s gravity completely?</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Escape velocity:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(v_{\\text{esc}} = \\sqrt{\\dfrac{2GM}{R}}\\)</p>' +
                '<p>where \\(M\\) is the planet\'s mass and \\(R\\) is its radius.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Derivation (using energy):</strong></p>' +
                '<p>The object just escapes if its total mechanical energy equals zero at infinity (\\(KE = 0\\) and \\(E_p = 0\\) when \\(r \\to \\infty\\)):</p>' +
                '<p>\\(\\dfrac{1}{2}mv^2 - \\dfrac{GMm}{R} = 0\\)</p>' +
                '<p>\\(v_{\\text{esc}} = \\sqrt{\\dfrac{2GM}{R}}\\)</p>' +
                '<p>Notice: <strong>the mass of the escaping object cancels</strong>. A rocket and a proton need the same escape velocity.</p>' +
                '</div>' +
                '<p><strong>Example values:</strong></p>' +
                '<ul>' +
                '<li>Earth: \\(v_{\\text{esc}} = 11.2\\text{ km s}^{-1}\\)</li>' +
                '<li>Moon: \\(v_{\\text{esc}} = 2.4\\text{ km s}^{-1}\\) (why the Moon has no atmosphere)</li>' +
                '<li>Jupiter: \\(v_{\\text{esc}} = 59.5\\text{ km s}^{-1}\\)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>Black holes:</strong> A black hole is an object so massive and compact that \\(v_{\\text{esc}} > c\\) (speed of light). Even light cannot escape - hence "black hole".</p>' +
                '</div>'
        },

        // 10. Concept: Gravitational Potential Energy
        {
            type: 'concept',
            title: 'Gravitational Potential Energy',
            html: '<p>In the gravitational fields topic, we use a more precise formula for GPE than \\(mgh\\) - one that works at any distance, not just near a planet\'s surface.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Gravitational potential energy:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(E_p = -\\dfrac{GMm}{r}\\)</p>' +
                '<p>The negative sign is fundamental:</p>' +
                '<ul>' +
                '<li>\\(E_p = 0\\) at \\(r = \\infty\\) (infinitely far away = zero reference)</li>' +
                '<li>\\(E_p < 0\\) for any finite distance (work must be done to reach infinity)</li>' +
                '<li>Deeper in a gravity well = more negative \\(E_p\\)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Change in GPE:</strong></p>' +
                '<p>When a satellite moves from \\(r_1\\) to \\(r_2\\):</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\Delta E_p = -\\dfrac{GMm}{r_2} + \\dfrac{GMm}{r_1} = GMm\\left(\\dfrac{1}{r_1} - \\dfrac{1}{r_2}\\right)\\)</p>' +
                '<p>If \\(r_2 > r_1\\) (moving away from planet): \\(\\Delta E_p > 0\\) (energy must be supplied).</p>' +
                '</div>' +
                '<p><strong>Connection to escape velocity:</strong> At the surface, \\(E_p = -GMm/R\\). For escape, we need \\(KE \\geq |E_p|\\), giving \\(\\frac{1}{2}mv^2 = GMm/R\\), which yields \\(v_{\\text{esc}} = \\sqrt{2GM/R}\\).</p>'
        },

        // 11. Practice: Orbital period
        {
            type: 'practice',
            intro: "Apply Kepler's Third Law:",
            generate: () => PHYS_GRAV.qOrbitalPeriod()
        },

        // 12. Summary
        {
            type: 'summary',
            title: 'Gravitational Fields - Key Points',
            html: '<div class="lesson-box">' +
                '<p><strong>Newton\'s law of gravitation:</strong></p>' +
                '<p style="text-align:center;">\\(F = \\dfrac{Gm_1 m_2}{r^2}\\) &nbsp;&nbsp; \\(G = 6.674 \\times 10^{-11}\\text{ N m}^2\\text{ kg}^{-2}\\)</p>' +
                '<p>Always attractive. \\(r\\) measured from centres. Inverse-square law.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Gravitational field strength:</strong></p>' +
                '<p style="text-align:center;">\\(g = \\dfrac{GM}{r^2}\\)</p>' +
                '<p>Same quantity as acceleration due to gravity. Decreases as \\(1/r^2\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Orbital motion:</strong></p>' +
                '<p>Orbital speed: \\(v = \\sqrt{GM/r}\\)</p>' +
                '<p>Kepler\'s Third Law: \\(T^2 = 4\\pi^2 r^3 / (GM)\\)</p>' +
                '<p>Gravity provides centripetal force. The ISS is in continuous free fall.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Escape velocity:</strong> \\(v_{\\text{esc}} = \\sqrt{2GM/R}\\) - independent of the escaping mass.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Gravitational PE:</strong> \\(E_p = -GMm/r\\)</p>' +
                '<p>Negative everywhere. Zero only at infinity. Moving away from planet increases (less negative) \\(E_p\\).</p>' +
                '</div>'
        }
    ]
};
