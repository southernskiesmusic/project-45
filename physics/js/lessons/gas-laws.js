/* ================================================================
   LESSON: Gas Laws (IB Physics B.3)
   ================================================================ */
const LESSON_PHYS_GAS = {
    id: 'gas-laws',
    title: 'Gas Laws',
    subtitle: "Boyle's, Charles's, ideal gas equation, kinetic theory",
    folder: 'topic-b',
    screens: [

        // 1. Concept: Ideal Gas and Assumptions
        {
            type: 'concept',
            title: 'The Ideal Gas Model',
            html: '<p>To understand how gases behave, physicists use the <strong>ideal gas model</strong> - a simplified model that works remarkably well for real gases at low pressures and high temperatures.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Assumptions of an ideal gas:</strong></p>' +
                '<ol>' +
                '<li>The gas consists of a very large number of particles (atoms or molecules) in <strong>continuous random motion</strong>.</li>' +
                '<li>The particles have <strong>negligible volume</strong> compared to the volume of the container.</li>' +
                '<li>Collisions between particles, and between particles and walls, are <strong>perfectly elastic</strong> (no kinetic energy lost).</li>' +
                '<li>There are <strong>no intermolecular forces</strong> between particles except during collisions.</li>' +
                '<li>The <strong>duration of collisions</strong> is negligible compared to the time between collisions.</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Macroscopic variables</strong> of a gas: pressure (\\(p\\)), volume (\\(V\\)), temperature (\\(T\\)), and amount of substance (\\(n\\)).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Temperature scale:</strong> Gas laws require temperature in <strong>Kelvin (K)</strong>:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(T\\text{(K)} = T\\text{(°C)} + 273\\)</p>' +
                '<p>0 K = absolute zero = -273 °C (the lowest possible temperature).</p>' +
                '</div>'
        },

        // 2. Concept: Boyle's Law
        {
            type: 'concept',
            title: "Boyle's Law",
            html: '<p><strong>Boyle\'s Law</strong> describes how the pressure and volume of a fixed amount of gas are related at constant temperature.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Boyle\'s Law:</strong> At constant temperature, the pressure of a fixed mass of gas is inversely proportional to its volume.</p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(p \\propto \\dfrac{1}{V}\\) &nbsp;&nbsp; or &nbsp;&nbsp; \\(pV = \\text{constant}\\)</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(p_1V_1 = p_2V_2\\)</p>' +
                '</div>' +
                '<p><strong>Explanation (kinetic theory):</strong> At constant temperature, the average kinetic energy of particles is unchanged. If volume decreases, particles hit the walls more frequently (shorter distance to travel between walls), so pressure increases.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Graphical representations:</strong></p>' +
                '<ul>' +
                '<li>\\(p\\) vs \\(V\\): a hyperbola (inversely proportional curve)</li>' +
                '<li>\\(p\\) vs \\(1/V\\): a straight line through the origin</li>' +
                '<li>\\(pV\\) vs \\(p\\): a horizontal straight line (constant)</li>' +
                '</ul>' +
                '</div>'
        },

        // 3. Example: Piston compression
        {
            type: 'example',
            title: 'Worked Example - Piston Compression',
            problem: '\\text{A gas occupies a volume of 2.0 L at a pressure of 100 kPa. The gas is compressed at constant temperature to 0.50 L. Find the new pressure.}',
            steps: [
                { text: '<strong>Step 1: Identify the law.</strong> Temperature is constant, so use Boyle\'s Law: \\(p_1V_1 = p_2V_2\\).' },
                { text: '<strong>Step 2: List known values.</strong><br>\\(p_1 = 100\\text{ kPa}\\), \\(V_1 = 2.0\\text{ L}\\), \\(V_2 = 0.50\\text{ L}\\), \\(p_2 = ?\\)' },
                { text: '<strong>Step 3: Rearrange and substitute.</strong><br>\\(p_2 = \\dfrac{p_1 V_1}{V_2} = \\dfrac{100 \\times 2.0}{0.50}\\)' },
                { text: '\\(p_2 = 400\\text{ kPa}\\)' },
                { text: '<strong>Sense check:</strong> Volume was reduced by a factor of 4, so pressure increased by a factor of 4. \\(\\checkmark\\)' },
                { text: '<strong>Note:</strong> Units of volume and pressure must be consistent on both sides - you can use L and kPa here as long as you use the same units throughout.' }
            ]
        },

        // 4. Practice: Boyle's law
        {
            type: 'practice',
            intro: "Apply Boyle's Law to find the unknown pressure or volume:",
            generate: () => PHYS_GAS.qBoyle()
        },

        // 5. Concept: Charles's Law
        {
            type: 'concept',
            title: "Charles's Law",
            html: '<p><strong>Charles\'s Law</strong> describes how the volume of a gas changes with temperature at constant pressure.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Charles\'s Law:</strong> At constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature (in Kelvin).</p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(V \\propto T\\) &nbsp;&nbsp; or &nbsp;&nbsp; \\(\\dfrac{V}{T} = \\text{constant}\\)</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}\\)</p>' +
                '<p><em>Temperature must be in Kelvin!</em></p>' +
                '</div>' +
                '<p><strong>Explanation (kinetic theory):</strong> Higher temperature means higher average kinetic energy. Particles move faster and hit the walls harder and more often. At constant pressure, the container must expand so that pressure is maintained.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Graphical representation:</strong></p>' +
                '<ul>' +
                '<li>\\(V\\) vs \\(T\\) (Kelvin): straight line through the origin</li>' +
                '<li>\\(V\\) vs \\(T\\) (Celsius): straight line, but it does not pass through the origin</li>' +
                '</ul>' +
                '<p><strong>Warning:</strong> A \\(V\\) vs \\(T(°C)\\) graph gives a straight line but not through the origin - always convert to Kelvin before using the ratio formula.</p>' +
                '</div>'
        },

        // 6. Concept: Gay-Lussac's Law and the Combined Gas Law
        {
            type: 'concept',
            title: "Gay-Lussac's Law and the Combined Gas Law",
            html: '<p><strong>Gay-Lussac\'s Law</strong> (also called the Pressure Law) describes how pressure and temperature are related at constant volume.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Gay-Lussac\'s Law:</strong> At constant volume:</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(p \\propto T\\) &nbsp;&nbsp; or &nbsp;&nbsp; \\(\\dfrac{p}{T} = \\text{constant}\\) &nbsp;&nbsp; or &nbsp;&nbsp; \\(\\dfrac{p_1}{T_1} = \\dfrac{p_2}{T_2}\\)</p>' +
                '</div>' +
                '<p>The three laws can be combined into a single equation for situations where all three variables change:</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Combined Gas Law:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(\\dfrac{p_1 V_1}{T_1} = \\dfrac{p_2 V_2}{T_2}\\)</p>' +
                '<p>This applies when the amount of gas is fixed (same number of moles). Temperature must be in Kelvin.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Summary of the three gas laws:</strong></p>' +
                '<ul>' +
                '<li>Boyle\'s: \\(p_1V_1 = p_2V_2\\) &nbsp; (constant \\(T\\))</li>' +
                '<li>Charles\'s: \\(V_1/T_1 = V_2/T_2\\) &nbsp; (constant \\(p\\))</li>' +
                '<li>Gay-Lussac\'s: \\(p_1/T_1 = p_2/T_2\\) &nbsp; (constant \\(V\\))</li>' +
                '</ul>' +
                '</div>'
        },

        // 7. Example: Combined gas law
        {
            type: 'example',
            title: 'Worked Example - Combined Gas Law',
            problem: '\\text{A gas at 27°C and 200 kPa occupies 3.0 L. It is heated to 127°C and the pressure rises to 250 kPa. Find the new volume.}',
            steps: [
                { text: '<strong>Step 1: Convert temperatures to Kelvin.</strong><br>\\(T_1 = 27 + 273 = 300\\text{ K}\\)<br>\\(T_2 = 127 + 273 = 400\\text{ K}\\)' },
                { text: '<strong>Step 2: Identify known variables.</strong><br>\\(p_1 = 200\\text{ kPa}\\), \\(V_1 = 3.0\\text{ L}\\), \\(T_1 = 300\\text{ K}\\)<br>\\(p_2 = 250\\text{ kPa}\\), \\(V_2 = ?\\), \\(T_2 = 400\\text{ K}\\)' },
                { text: '<strong>Step 3: Apply the combined gas law.</strong><br>\\(\\dfrac{p_1 V_1}{T_1} = \\dfrac{p_2 V_2}{T_2}\\)' },
                { text: '<strong>Step 4: Rearrange for \\(V_2\\).</strong><br>\\(V_2 = \\dfrac{p_1 V_1 T_2}{T_1 p_2} = \\dfrac{200 \\times 3.0 \\times 400}{300 \\times 250}\\)' },
                { text: '\\(V_2 = \\dfrac{240\\,000}{75\\,000} = 3.2\\text{ L}\\)' },
                { text: '<strong>Sense check:</strong> Higher temperature tends to increase volume; higher pressure tends to decrease it. The effects partially cancel, giving a modest increase. \\(\\checkmark\\)' }
            ]
        },

        // 8. Practice: Combined gas law
        {
            type: 'practice',
            intro: 'Apply the combined gas law:',
            generate: () => PHYS_GAS.qCombined()
        },

        // 9. Concept: The Ideal Gas Equation
        {
            type: 'concept',
            title: 'The Ideal Gas Equation',
            html: '<p>The gas laws can be unified into a single equation that relates all four macroscopic properties of an ideal gas simultaneously.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Ideal gas equation:</strong></p>' +
                '<p style="text-align:center;font-size:1.4em;">\\(pV = nRT\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(p\\) = pressure (Pa = N m\\(^{-2}\\))</li>' +
                '<li>\\(V\\) = volume (m\\(^3\\))</li>' +
                '<li>\\(n\\) = amount of substance (mol)</li>' +
                '<li>\\(R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}\\) = universal gas constant</li>' +
                '<li>\\(T\\) = absolute temperature (K)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Unit conversions for this equation:</strong></p>' +
                '<ul>' +
                '<li>Pressure: 1 kPa = 1000 Pa; 1 atm = 101 325 Pa</li>' +
                '<li>Volume: 1 L = 10\\(^{-3}\\) m\\(^3\\); 1 mL = 10\\(^{-6}\\) m\\(^3\\)</li>' +
                '<li>Temperature: ALWAYS in Kelvin</li>' +
                '</ul>' +
                '</div>' +
                '<p>The ideal gas equation also works in the form \\(pV = NkT\\), where \\(N\\) is the total number of particles and \\(k = 1.38 \\times 10^{-23}\\text{ J K}^{-1}\\) is the Boltzmann constant. Note that \\(R = N_A k\\) where \\(N_A = 6.02 \\times 10^{23}\\text{ mol}^{-1}\\) is Avogadro\'s number.</p>'
        },

        // 10. Practice: Ideal gas equation
        {
            type: 'practice',
            intro: 'Use the ideal gas equation to find the unknown:',
            generate: () => PHYS_GAS.qIdealGas_n()
        },

        // 11. Concept: Kinetic Theory (qualitative)
        {
            type: 'concept',
            title: 'Kinetic Theory of Gases',
            html: '<p>Kinetic theory connects the microscopic behaviour of gas particles to the macroscopic properties we can measure (pressure, temperature).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pressure:</strong> arises from particles colliding with the container walls. Each collision exerts a tiny force; billions of collisions per second produce a measurable pressure.</p>' +
                '<p style="text-align:center;">Pressure increases when: more particles hit the wall (smaller volume) OR particles hit harder (higher temperature).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Temperature and kinetic energy:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\langle E_k \\rangle = \\dfrac{3}{2}kT\\)</p>' +
                '<p>The average kinetic energy of a gas particle is directly proportional to absolute temperature. Temperature is a measure of the average kinetic energy of the particles.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Absolute zero (0 K):</strong> At 0 K, particles would have zero kinetic energy and the gas would exert zero pressure. In practice, all gases liquefy or solidify before reaching absolute zero, and quantum effects become important.</p>' +
                '</div>' +
                '<p><strong>Real gases:</strong> Deviations from ideal behaviour occur at:</p>' +
                '<ul>' +
                '<li>High pressures: particles are close together, intermolecular forces become significant</li>' +
                '<li>Low temperatures: particles move slowly, attractions matter more</li>' +
                '<li>Near liquefaction: molecules are close to condensing</li>' +
                '</ul>'
        },

        // 12. Summary
        {
            type: 'summary',
            title: 'Gas Laws - Key Points',
            html: '<div class="lesson-box">' +
                '<p><strong>Temperature conversion:</strong> \\(T(\\text{K}) = T(°\\text{C}) + 273\\) - ALWAYS use Kelvin in gas law calculations.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The three gas laws (fixed amount of gas):</strong></p>' +
                '<p>Boyle\'s: \\(p_1V_1 = p_2V_2\\) &nbsp;&nbsp; (constant \\(T\\))</p>' +
                '<p>Charles\'s: \\(V_1/T_1 = V_2/T_2\\) &nbsp;&nbsp; (constant \\(p\\))</p>' +
                '<p>Gay-Lussac\'s: \\(p_1/T_1 = p_2/T_2\\) &nbsp;&nbsp; (constant \\(V\\))</p>' +
                '<p>Combined: \\(\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Ideal gas equation:</strong> \\(pV = nRT\\)</p>' +
                '<p>\\(R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}\\). Units: Pa, m\\(^3\\), mol, K.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Kinetic theory summary:</strong></p>' +
                '<ul>' +
                '<li>Pressure = force from particle-wall collisions</li>' +
                '<li>Temperature \\(\\propto\\) average kinetic energy of particles</li>' +
                '<li>Average KE = \\(\\frac{3}{2}kT\\)</li>' +
                '<li>Ideal gas assumes: no intermolecular forces, negligible particle volume, elastic collisions</li>' +
                '</ul>' +
                '</div>'
        }
    ]
};
