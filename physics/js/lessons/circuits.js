/* ================================================================
   LESSON: Electric Circuits (IB Physics B.5)
   ================================================================ */
const LESSON_PHYS_CIRCUITS = {
    id: 'circuits',
    title: 'Electric Circuits',
    subtitle: "Ohm's law, resistance, power, series and parallel circuits",
    folder: 'topic-b',
    screens: [

        // 1. Concept: Charge, Current and Voltage
        {
            type: 'concept',
            title: 'Charge, Current and Voltage',
            html: '<p>Electric circuits are built on three fundamental quantities: charge, current, and voltage.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Electric charge (\\(Q\\)):</strong></p>' +
                '<ul>' +
                '<li>Measured in Coulombs (C)</li>' +
                '<li>Carried by electrons (negative: \\(-e = -1.6 \\times 10^{-19}\\text{ C}\\)) and protons (positive)</li>' +
                '<li>Charge is conserved - it cannot be created or destroyed</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Electric current (\\(I\\)):</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(I = \\dfrac{\\Delta Q}{\\Delta t}\\)</p>' +
                '<p>Current is the rate of flow of charge. Units: Amperes (A) = C s\\(^{-1}\\).</p>' +
                '<p>In metallic conductors, current is carried by electrons moving from negative to positive terminal - but by convention, current direction is defined from positive to negative (opposite to electron flow).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Potential difference / Voltage (\\(V\\)):</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(V = \\dfrac{W}{Q}\\)</p>' +
                '<p>Voltage is the work done per unit charge. Units: Volts (V) = J C\\(^{-1}\\).</p>' +
                '<p>Think of voltage as the "electrical pressure" that drives charges around the circuit.</p>' +
                '</div>'
        },

        // 2. Concept: Ohm's Law and Resistance
        {
            type: 'concept',
            title: "Ohm's Law and Resistance",
            html: '<p><strong>Resistance</strong> is the opposition to current flow. The higher the resistance, the less current flows for a given voltage.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Ohm\'s Law:</strong></p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(V = IR\\)</p>' +
                '<p>where:</p>' +
                '<ul>' +
                '<li>\\(V\\) = potential difference (V)</li>' +
                '<li>\\(I\\) = current (A)</li>' +
                '<li>\\(R\\) = resistance (\\(\\Omega\\), ohms)</li>' +
                '</ul>' +
                '<p>1 ohm = 1 V A\\(^{-1}\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Ohmic vs non-ohmic conductors:</strong></p>' +
                '<ul>' +
                '<li><strong>Ohmic conductor</strong> (e.g., metal resistor at constant temperature): \\(V \\propto I\\), so \\(R\\) is constant. The \\(I\\)-\\(V\\) graph is a straight line through the origin.</li>' +
                '<li><strong>Non-ohmic</strong> (e.g., filament lamp, LED, diode): \\(R\\) changes with temperature or polarity. The \\(I\\)-\\(V\\) graph is curved.</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Resistivity:</strong> \\(R = \\dfrac{\\rho L}{A}\\), where \\(\\rho\\) is the material\'s resistivity (\\(\\Omega\\) m), \\(L\\) is length, and \\(A\\) is cross-sectional area.</p>'
        },

        // 3. Practice: Ohm's Law
        {
            type: 'practice',
            intro: "Apply Ohm's Law to find voltage, current or resistance:",
            generate: () => PHYS_CIRCUITS.qOhmsLaw()
        },

        // 4. Concept: Power in Circuits
        {
            type: 'concept',
            title: 'Electrical Power',
            html: '<p>When current flows through a resistor, electrical energy is converted to thermal energy. The rate of this conversion is the <strong>electrical power</strong>.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Three equivalent formulae for electrical power:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(P = IV\\)</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(P = I^2 R\\) &nbsp;&nbsp;&nbsp; (substitute \\(V = IR\\))</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(P = \\dfrac{V^2}{R}\\) &nbsp;&nbsp;&nbsp; (substitute \\(I = V/R\\))</p>' +
                '<p>All give power in Watts (W).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Which formula to use?</strong></p>' +
                '<ul>' +
                '<li>Know \\(I\\) and \\(V\\): use \\(P = IV\\)</li>' +
                '<li>Know \\(I\\) and \\(R\\): use \\(P = I^2R\\)</li>' +
                '<li>Know \\(V\\) and \\(R\\): use \\(P = V^2/R\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Energy dissipated:</strong> \\(E = Pt = IVt\\). A 60 W light bulb running for 1 hour uses \\(E = 60 \\times 3600 = 216\\,000\\text{ J} = 216\\text{ kJ}\\).</p>'
        },

        // 5. Concept: Series Circuits
        {
            type: 'concept',
            title: 'Series Circuits',
            html: '<p>In a <strong>series circuit</strong>, components are connected end-to-end in a single loop. There is only one path for current to flow.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Rules for series circuits:</strong></p>' +
                '<ul>' +
                '<li><strong>Current:</strong> the same through every component: \\(I = I_1 = I_2 = I_3\\)</li>' +
                '<li><strong>Voltage:</strong> total voltage shared across components: \\(V = V_1 + V_2 + V_3\\)</li>' +
                '<li><strong>Resistance:</strong> resistances add up: \\(R_{\\text{total}} = R_1 + R_2 + R_3\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p>The voltage across each component is proportional to its resistance (voltage divider): \\(V_1 = IR_1\\), \\(V_2 = IR_2\\), etc.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Consequence:</strong> If one component in a series circuit fails (open circuit), the entire circuit stops working. This is why Christmas tree lights used to go out entirely when one bulb failed - they were in series!</p>' +
                '</div>'
        },

        // 6. Concept: Parallel Circuits
        {
            type: 'concept',
            title: 'Parallel Circuits',
            html: '<p>In a <strong>parallel circuit</strong>, components are connected across the same two points, providing multiple paths for current to flow.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Rules for parallel circuits:</strong></p>' +
                '<ul>' +
                '<li><strong>Voltage:</strong> the same across every component: \\(V = V_1 = V_2 = V_3\\)</li>' +
                '<li><strong>Current:</strong> total current splits up: \\(I = I_1 + I_2 + I_3\\)</li>' +
                '<li><strong>Resistance:</strong> reciprocals add: \\(\\dfrac{1}{R_{\\text{total}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}\\)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Key result for two parallel resistors:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(R_{\\text{total}} = \\dfrac{R_1 R_2}{R_1 + R_2}\\)</p>' +
                '<p>The total resistance in parallel is always <strong>less than the smallest individual resistance</strong>.</p>' +
                '</div>' +
                '<p><strong>Why is this?</strong> Adding more paths gives current more ways to flow, reducing overall resistance - like adding more lanes to a highway reduces traffic congestion.</p>' +
                '<p>Mains wiring in homes is in parallel - each appliance gets the full mains voltage, and a fault in one does not cut off others.</p>'
        },

        // 7. Example: Mixed circuit
        {
            type: 'example',
            title: 'Worked Example - Mixed Series-Parallel Circuit',
            problem: '\\text{A 12 V battery connects to a 4 }\\Omega\\text{ resistor in series with a parallel combination of 6 }\\Omega\\text{ and 3 }\\Omega\\text{ resistors. Find the total current from the battery.}',
            steps: [
                { text: '<strong>Step 1: Find the resistance of the parallel combination.</strong><br>\\(\\dfrac{1}{R_{\\text{par}}} = \\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{6} + \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}\\)' },
                { text: '\\(R_{\\text{par}} = 2\\text{ }\\Omega\\)' },
                { text: '<strong>Step 2: Find the total resistance of the series circuit.</strong><br>\\(R_{\\text{total}} = 4 + R_{\\text{par}} = 4 + 2 = 6\\text{ }\\Omega\\)' },
                { text: '<strong>Step 3: Apply Ohm\'s Law to the whole circuit.</strong><br>\\(I = \\dfrac{V}{R_{\\text{total}}} = \\dfrac{12}{6} = 2\\text{ A}\\)' },
                { text: '<strong>Step 4 (bonus): Find voltage across each part.</strong><br>Voltage across \\(4\\text{ }\\Omega\\): \\(V_1 = IR_1 = 2 \\times 4 = 8\\text{ V}\\)<br>Voltage across parallel combination: \\(V_2 = IR_{\\text{par}} = 2 \\times 2 = 4\\text{ V}\\)' },
                { text: '<strong>Check:</strong> \\(V_1 + V_2 = 8 + 4 = 12\\text{ V} = \\) battery voltage. \\(\\checkmark\\)' }
            ]
        },

        // 8. Practice: Series/Parallel
        {
            type: 'practice',
            intro: 'Find the total resistance or current in the circuit:',
            generate: () => PHYS_CIRCUITS.qSeriesParallel()
        },

        // 9. Concept: Internal Resistance
        {
            type: 'concept',
            title: 'Internal Resistance and EMF',
            html: '<p>Real batteries are not perfect voltage sources. They have an <strong>internal resistance</strong> (\\(r\\)) that causes the terminal voltage to drop when current flows.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>EMF (\\(\\varepsilon\\)):</strong> the electromotive force is the total energy per unit charge supplied by the battery - the voltage it would supply with no current flowing (open circuit).</p>' +
                '<p><strong>Terminal voltage:</strong> the actual voltage across the battery\'s terminals when current \\(I\\) flows:</p>' +
                '<p style="text-align:center;font-size:1.3em;">\\(V_{\\text{terminal}} = \\varepsilon - Ir\\)</p>' +
                '<p>The term \\(Ir\\) is called the <strong>"lost volts"</strong> - voltage lost to the internal resistance.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Key circuit equation:</strong></p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\varepsilon = I(R + r)\\)</p>' +
                '<p>where \\(R\\) is the external (load) resistance.</p>' +
                '</div>' +
                '<p><strong>Experimental determination of \\(r\\) and \\(\\varepsilon\\):</strong> Vary the external resistance \\(R\\) and measure terminal voltage \\(V\\) and current \\(I\\). Plot \\(V\\) vs \\(I\\): the y-intercept gives \\(\\varepsilon\\) and the (negative) gradient gives \\(r\\).</p>' +
                '<p><strong>Practical consequence:</strong> A car battery with high internal resistance drops significantly in terminal voltage when the starter motor draws large current - causing lights to dim momentarily.</p>'
        },

        // 10. Practice: Internal resistance
        {
            type: 'practice',
            intro: 'Apply the internal resistance equation:',
            generate: () => PHYS_CIRCUITS.qInternalResistance()
        },

        // 11. Summary
        {
            type: 'summary',
            title: 'Electric Circuits - Key Points',
            html: '<div class="lesson-box">' +
                '<p><strong>Fundamental definitions:</strong></p>' +
                '<p>\\(I = \\Delta Q / \\Delta t\\) &nbsp; (current = charge per unit time)</p>' +
                '<p>\\(V = W / Q\\) &nbsp; (voltage = work done per unit charge)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Ohm\'s Law:</strong> \\(V = IR\\) &nbsp;&nbsp; (valid for ohmic conductors at constant temperature)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Electrical power:</strong></p>' +
                '<p>\\(P = IV = I^2R = V^2/R\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Series:</strong> same \\(I\\), voltages add, \\(R_{\\text{total}} = R_1 + R_2 + \\ldots\\)</p>' +
                '<p><strong>Parallel:</strong> same \\(V\\), currents add, \\(1/R_{\\text{total}} = 1/R_1 + 1/R_2 + \\ldots\\)</p>' +
                '<p>For two in parallel: \\(R_{\\text{total}} = R_1R_2/(R_1+R_2)\\)</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Internal resistance:</strong></p>' +
                '<p>\\(V_{\\text{terminal}} = \\varepsilon - Ir\\) &nbsp;&nbsp; \\(\\varepsilon = I(R + r)\\)</p>' +
                '<p>EMF (\\(\\varepsilon\\)) = open-circuit voltage. Terminal voltage drops under load.</p>' +
                '</div>'
        }
    ]
};
