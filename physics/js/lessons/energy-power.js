/* ================================================================
   LESSON: Work, Energy and Power (IB Physics A.3)
   ================================================================ */
const LESSON_PHYS_ENERGY = {
    id: 'energy-power',
    title: 'Work, Energy and Power',
    subtitle: 'Kinetic energy, gravitational PE, conservation of energy, power, efficiency',
    folder: 'topic-a',
    screens: [

        // 1. Concept: Forms of Energy
        {
            type: 'concept',
            title: 'Forms of Energy',
            html: '<p><strong>Energy</strong> is the capacity to do work. It exists in many forms and can be converted between them, but the <strong>total energy of a closed system is always conserved</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Common forms of energy:</strong></p>' +
                '<ul>' +
                '<li><strong>Kinetic energy (\\(E_k\\))</strong> - energy of motion</li>' +
                '<li><strong>Gravitational potential energy (\\(E_p\\))</strong> - energy stored due to position in a gravitational field</li>' +
                '<li><strong>Elastic potential energy</strong> - energy stored in a deformed spring or material</li>' +
                '<li><strong>Thermal energy (heat)</strong> - internal energy of particles</li>' +
                '<li><strong>Chemical energy</strong> - stored in chemical bonds</li>' +
                '<li><strong>Electrical energy</strong> - energy of moving charges</li>' +
                '<li><strong>Nuclear energy</strong> - stored in atomic nuclei</li>' +
                '</ul>' +
                '</div>' +
                '<p>All forms of energy have the same SI unit: the <strong>Joule (J)</strong>.</p>' +
                '<p>1 J = 1 N m = 1 kg m\\(^2\\) s\\(^{-2}\\)</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Law of Conservation of Energy:</strong></p>' +
                '<p><em>Energy cannot be created or destroyed - it can only be converted from one form to another. The total energy of an isolated system is constant.</em></p>' +
                '</div>'
        },

        // 2. Concept: Work
        {
            type: 'concept',
            title: 'Work Done by a Force',
            html: '<p>In physics, <strong>work</strong> has a precise meaning - it is not simply effort. Work is done when a force causes displacement in the direction of the force.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Work done:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(W = Fd\\cos\\theta\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(F\\) = applied force (N)</li>' +
                '<li>\\(d\\) = displacement (m)</li>' +
                '<li>\\(\\theta\\) = angle between the force and the displacement</li>' +
                '</ul>' +
                '<p>Units: Joules (J) = N m</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Special cases of the angle \\(\\theta\\):</strong></p>' +
                '<ul>' +
                '<li>\\(\\theta = 0°\\): Force and displacement in same direction - <strong>maximum positive work</strong>: \\(W = Fd\\)</li>' +
                '<li>\\(\\theta = 90°\\): Force perpendicular to displacement - <strong>no work done</strong>: \\(W = 0\\)</li>' +
                '<li>\\(\\theta = 180°\\): Force opposite to displacement - <strong>negative work</strong>: \\(W = -Fd\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Negative work</strong> means the force removes energy from the object (e.g., friction does negative work on a sliding block).</p>' +
                '<p>The work-energy theorem states: The net work done on an object equals its change in kinetic energy: \\(W_{\\text{net}} = \\Delta E_k\\).</p>'
        },

        // 3. Concept: Kinetic Energy
        {
            type: 'concept',
            title: 'Kinetic Energy',
            html: '<p>Any object that is moving has <strong>kinetic energy</strong> - the energy of motion.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Kinetic energy:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(E_k = \\dfrac{1}{2}mv^2\\)</p>' +
                '<p>where \\(m\\) = mass (kg) and \\(v\\) = speed (m s\\(^{-1}\\)).</p>' +
                '</div>' +
                '<p>Key features of kinetic energy:</p>' +
                '<ul>' +
                '<li>Always <strong>positive</strong> (since \\(v^2 \\geq 0\\))</li>' +
                '<li>Depends on the <strong>square</strong> of speed: doubling speed quadruples kinetic energy</li>' +
                '<li>It is a scalar quantity</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>Work-energy theorem:</strong></p>' +
                '<p>The net work done on an object equals its change in kinetic energy:</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(W_{\\text{net}} = \\Delta E_k = \\dfrac{1}{2}mv^2 - \\dfrac{1}{2}mu^2\\)</p>' +
                '<p>This is a powerful result - it connects forces (work) directly to motion (kinetic energy).</p>' +
                '</div>'
        },

        // 4. Concept: Gravitational PE
        {
            type: 'concept',
            title: 'Gravitational Potential Energy',
            html: '<p>When an object is lifted against gravity, work is done on it. This work is stored as <strong>gravitational potential energy</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Gravitational potential energy (near Earth\'s surface):</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(E_p = mgh\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(m\\) = mass (kg)</li>' +
                '<li>\\(g\\) = gravitational field strength (9.81 m s\\(^{-2}\\) near Earth\'s surface)</li>' +
                '<li>\\(h\\) = height above a chosen reference level (m)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Important:</strong> GPE is always measured relative to a reference level. You can choose any level as \\(h = 0\\) - only <em>changes</em> in GPE matter.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Change in GPE:</strong></p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\Delta E_p = mg\\Delta h\\)</p>' +
                '<p>If an object moves <em>up</em>, \\(\\Delta E_p > 0\\) (gains PE).</p>' +
                '<p>If an object moves <em>down</em>, \\(\\Delta E_p < 0\\) (loses PE).</p>' +
                '</div>' +
                '<p>This formula is valid only near Earth\'s surface where \\(g\\) is approximately constant. For large distances from Earth, a different formula is needed (see gravitational fields).</p>'
        },

        // 5. Example: Roller coaster
        {
            type: 'example',
            title: 'Worked Example - Roller Coaster',
            problem: '\\text{A roller coaster car of mass 800 kg starts from rest at height 30 m. Ignoring friction, find its speed at a point 8 m above the ground.}',
            steps: [
                { text: '<strong>Principle:</strong> With no friction, total mechanical energy is conserved: \\(E_k + E_p = \\text{constant}\\).' },
                { text: '<strong>Initial state (top):</strong> \\(v = 0\\), \\(h = 30\\text{ m}\\)<br>\\(E_k = 0\\), \\(E_p = mgh = 800 \\times 9.81 \\times 30 = 235\\,440\\text{ J}\\)' },
                { text: '<strong>Final state (h = 8 m):</strong> \\(v = ?\\)<br>\\(E_p = 800 \\times 9.81 \\times 8 = 62\\,784\\text{ J}\\)' },
                { text: '<strong>Conservation of energy:</strong><br>\\(E_k + E_p = 235\\,440\\text{ J}\\)' },
                { text: '\\(\\dfrac{1}{2}mv^2 = 235\\,440 - 62\\,784 = 172\\,656\\text{ J}\\)' },
                { text: '\\(v^2 = \\dfrac{2 \\times 172\\,656}{800} = 431.64\\)' },
                { text: '\\(v = \\sqrt{431.64} \\approx 20.8\\text{ m s}^{-1}\\)' },
                { text: '<strong>Note:</strong> The mass cancels out in conservation of energy problems - any mass would reach the same speed from the same height (with no friction).' }
            ]
        },

        // 6. Practice: Conservation of energy
        {
            type: 'practice',
            intro: 'Apply conservation of energy:',
            generate: () => PHYS_ENERGY.qConservation()
        },

        // 7. Concept: Power
        {
            type: 'concept',
            title: 'Power',
            html: '<p><strong>Power</strong> is the rate at which work is done - or the rate at which energy is transferred.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Power:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(P = \\dfrac{W}{t} = \\dfrac{E}{t}\\)</p>' +
                '<p>Units: Watts (W) = Joules per second (J s\\(^{-1}\\))</p>' +
                '<p>1 W = 1 J s\\(^{-1}\\) = 1 kg m\\(^2\\) s\\(^{-3}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Power for a force moving at constant velocity:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(P = Fv\\)</p>' +
                '<p>This comes from \\(P = W/t = Fd/t = F \\times (d/t) = Fv\\).</p>' +
                '</div>' +
                '<p><strong>Examples of power:</strong></p>' +
                '<ul>' +
                '<li>A 100 W light bulb consumes 100 J every second</li>' +
                '<li>A car engine producing 150 kW at 30 m s\\(^{-1}\\) exerts a driving force of \\(F = P/v = 150000/30 = 5000\\text{ N}\\)</li>' +
                '<li>A person climbing stairs at constant speed: \\(P = Fv = mgv\\)</li>' +
                '</ul>' +
                '<div class="lesson-box">' +
                '<p><strong>Common power units:</strong></p>' +
                '<ul>' +
                '<li>1 kW (kilowatt) = 1000 W</li>' +
                '<li>1 MW (megawatt) = 10\\(^6\\) W</li>' +
                '<li>1 horsepower ≈ 746 W (non-SI, still used in some countries)</li>' +
                '</ul>' +
                '</div>'
        },

        // 8. Practice: Power
        {
            type: 'practice',
            intro: 'Calculate the power or the force:',
            generate: () => PHYS_ENERGY.qPower()
        },

        // 9. Concept: Efficiency
        {
            type: 'concept',
            title: 'Efficiency',
            html: '<p>In any real energy transfer, some energy is always "lost" to less useful forms (usually heat and sound). <strong>Efficiency</strong> measures how much of the input energy is successfully converted to the desired output.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Efficiency:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(\\eta = \\dfrac{E_{\\text{useful out}}}{E_{\\text{total in}}} \\times 100\\%\\)</p>' +
                '<p>Or equivalently in terms of power:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\eta = \\dfrac{P_{\\text{useful out}}}{P_{\\text{total in}}} \\times 100\\%\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Sankey diagrams</strong> are used to show energy flow. The width of each arrow is proportional to the amount of energy it represents. The arrows branch when energy is split, and all branches must sum to the input.</p>' +
                '</div>' +
                '<p><strong>Key facts about efficiency:</strong></p>' +
                '<ul>' +
                '<li>Efficiency is always between 0% and 100% (cannot exceed 100%)</li>' +
                '<li>100% efficiency is impossible in practice - there are always losses</li>' +
                '<li>Wasted energy = \\(E_{\\text{in}} - E_{\\text{useful out}}\\)</li>' +
                '</ul>' +
                '<p><strong>Example values:</strong></p>' +
                '<ul>' +
                '<li>Electric motor: ~90% efficient</li>' +
                '<li>LED light bulb: ~80% efficient (compared to ~5% for incandescent)</li>' +
                '<li>Car engine: ~25-35% efficient</li>' +
                '</ul>'
        },

        // 10. Practice: Efficiency
        {
            type: 'practice',
            intro: 'Calculate the efficiency or the useful energy output:',
            generate: () => PHYS_ENERGY.qEfficiency()
        },

        // 11. Summary
        {
            type: 'summary',
            title: 'Work, Energy and Power - Key Points',
            html: '<div class="lesson-box">' +
                '<p><strong>Work:</strong> \\(W = Fd\\cos\\theta\\)</p>' +
                '<p>Zero work when force is perpendicular to displacement. Negative work when force opposes motion.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Kinetic energy:</strong> \\(E_k = \\dfrac{1}{2}mv^2\\)</p>' +
                '<p>Work-energy theorem: \\(W_{\\text{net}} = \\Delta E_k\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Gravitational PE (near surface):</strong> \\(E_p = mgh\\)</p>' +
                '<p>Only changes in height matter - choose any reference level.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Conservation of energy:</strong> \\(E_k + E_p = \\text{constant}\\) (no friction)</p>' +
                '<p>With friction: \\(E_{k,i} + E_{p,i} = E_{k,f} + E_{p,f} + E_{\\text{thermal}}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Power:</strong> \\(P = W/t = Fv\\) &nbsp;&nbsp; Units: Watts (W)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Efficiency:</strong> \\(\\eta = E_{\\text{useful out}} / E_{\\text{in}} \\times 100\\%\\)</p>' +
                '<p>Always between 0% and 100%. Never exactly 100% in practice.</p>' +
                '</div>'
        }
    ]
};
