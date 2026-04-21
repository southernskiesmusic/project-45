/*
 * circuits.js - IB Physics B.5: Electric Circuits
 * Ohm's law, resistance, power, series/parallel, internal resistance
 */

const PHYS_CIRCUITS = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qOhmsLaw - Easy
     * Given any 2 of V, I, R; find the 3rd using V = IR.
     */
    qOhmsLaw() {
        const mode = MathUtils.pick(['findV', 'findI', 'findR']);
        const scenarios = [
            'a household resistor', 'a LED in a circuit', 'a car headlight filament',
            'a heating element', 'a phone charging cable'
        ];
        const sc = MathUtils.pick(scenarios);

        if (mode === 'findV') {
            const I = parseFloat((MathUtils.randInt(1, 40) / 10).toFixed(1));   // 0.1 - 4.0 A
            const R = MathUtils.randInt(5, 100);                                  // 5 - 100 Ω
            const V = parseFloat((I * R).toPrecision(3));
            return {
                type: 'free',
                rule: "Ohm's Law (find V)",
                difficulty: 'easy',
                text: `A current of \\(${I}\\) A flows through ${sc} with a resistance of \\(${R}\\) Ω.<br>Calculate the potential difference across it. Give your answer in V to 3 s.f.`,
                latex: `\\(V = IR\\)`,
                answer: V,
                answerTex: `${V} \\text{ V}`,
                options: [],
                hintTex: [`V = IR`, `V = ${I} \\times ${R}`],
                explain: `<strong>Step 1:</strong> Write Ohm's Law: \\(V = IR\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(V = ${I} \\times ${R} = ${V}\\) V.`
            };
        } else if (mode === 'findI') {
            const V = MathUtils.randInt(3, 240);
            const R = MathUtils.randInt(5, 500);
            const I = parseFloat((V / R).toPrecision(3));
            return {
                type: 'free',
                rule: "Ohm's Law (find I)",
                difficulty: 'easy',
                text: `A potential difference of \\(${V}\\) V is applied across ${sc} with resistance \\(${R}\\) Ω.<br>Find the current flowing through it. Give your answer in A to 3 s.f.`,
                latex: `\\(I = \\dfrac{V}{R}\\)`,
                answer: I,
                answerTex: `${I} \\text{ A}`,
                options: [],
                hintTex: [`I = \\frac{V}{R}`, `I = \\frac{${V}}{${R}}`],
                explain: `<strong>Step 1:</strong> Rearrange Ohm's Law: \\(I = \\dfrac{V}{R}\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(I = \\dfrac{${V}}{${R}} = ${I}\\) A.`
            };
        } else {
            const V = MathUtils.randInt(5, 240);
            const I = parseFloat((MathUtils.randInt(1, 50) / 10).toFixed(1));
            const R = parseFloat((V / I).toPrecision(3));
            return {
                type: 'free',
                rule: "Ohm's Law (find R)",
                difficulty: 'easy',
                text: `A current of \\(${I}\\) A flows through ${sc} when a potential difference of \\(${V}\\) V is applied.<br>Find the resistance. Give your answer in Ω to 3 s.f.`,
                latex: `\\(R = \\dfrac{V}{I}\\)`,
                answer: R,
                answerTex: `${R} \\text{ Ω}`,
                options: [],
                hintTex: [`R = \\frac{V}{I}`, `R = \\frac{${V}}{${I}}`],
                explain: `<strong>Step 1:</strong> Rearrange Ohm's Law: \\(R = \\dfrac{V}{I}\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(R = \\dfrac{${V}}{${I}} = ${R}\\) Ω.`
            };
        }
    },

    /**
     * 2. qPower - Easy
     * Given any 2 of P, I, V, R, find power.
     */
    qPower() {
        const mode = MathUtils.pick(['PIV', 'PI2R', 'PV2R']);
        const appliances = [
            'a toaster', 'a microwave oven', 'a smartphone charger', 'a ceiling fan',
            'an electric kettle', 'a laptop charger', 'a TV set'
        ];
        const sc = MathUtils.pick(appliances);

        if (mode === 'PIV') {
            const I = parseFloat((MathUtils.randInt(1, 130) / 10).toFixed(1));
            const V = MathUtils.pick([5, 12, 120, 230, 240]);
            const P = parseFloat((I * V).toPrecision(3));
            return {
                type: 'free',
                rule: 'Power (P = IV)',
                difficulty: 'easy',
                text: `${sc.charAt(0).toUpperCase() + sc.slice(1)} operates at \\(${V}\\) V and draws a current of \\(${I}\\) A.<br>Calculate the power consumed. Give your answer in W to 3 s.f.`,
                latex: `\\(P = IV\\)`,
                answer: P,
                answerTex: `${P} \\text{ W}`,
                options: [],
                hintTex: [`P = IV`, `P = ${I} \\times ${V}`],
                explain: `<strong>Step 1:</strong> Use \\(P = IV\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(P = ${I} \\times ${V} = ${P}\\) W.`
            };
        } else if (mode === 'PI2R') {
            const I = parseFloat((MathUtils.randInt(1, 50) / 10).toFixed(1));
            const R = MathUtils.randInt(4, 200);
            const P = parseFloat((I * I * R).toPrecision(3));
            return {
                type: 'free',
                rule: 'Power (P = I²R)',
                difficulty: 'easy',
                text: `A current of \\(${I}\\) A flows through ${sc} with resistance \\(${R}\\) Ω.<br>Calculate the power dissipated. Give your answer in W to 3 s.f.`,
                latex: `\\(P = I^2 R\\)`,
                answer: P,
                answerTex: `${P} \\text{ W}`,
                options: [],
                hintTex: [`P = I^2 R`, `P = (${I})^2 \\times ${R} = ${(I*I).toFixed(2)} \\times ${R}`],
                explain: `<strong>Step 1:</strong> Use \\(P = I^2 R\\).<br><br>` +
                         `<strong>Step 2:</strong> Square the current: \\(I^2 = (${I})^2 = ${(I*I).toFixed(2)}\\).<br><br>` +
                         `<strong>Step 3:</strong> Multiply: \\(P = ${(I*I).toFixed(2)} \\times ${R} = ${P}\\) W.`
            };
        } else {
            const V = MathUtils.pick([5, 9, 12, 24, 120, 230, 240]);
            const R = MathUtils.randInt(10, 500);
            const P = parseFloat((V * V / R).toPrecision(3));
            return {
                type: 'free',
                rule: 'Power (P = V²/R)',
                difficulty: 'easy',
                text: `${sc.charAt(0).toUpperCase() + sc.slice(1)} has a resistance of \\(${R}\\) Ω and is connected to a \\(${V}\\) V supply.<br>Calculate the power consumed. Give your answer in W to 3 s.f.`,
                latex: `\\(P = \\dfrac{V^2}{R}\\)`,
                answer: P,
                answerTex: `${P} \\text{ W}`,
                options: [],
                hintTex: [`P = \\frac{V^2}{R}`, `P = \\frac{${V}^2}{${R}} = \\frac{${V*V}}{${R}}`],
                explain: `<strong>Step 1:</strong> Use \\(P = \\dfrac{V^2}{R}\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(P = \\dfrac{${V}^2}{${R}} = \\dfrac{${V*V}}{${R}} = ${P}\\) W.`
            };
        }
    },

    /**
     * 3. qSeriesResistors - Easy
     * 2-3 resistors in series; find total resistance and current.
     */
    qSeriesResistors() {
        const nRes = MathUtils.randInt(2, 3);
        const rs = [];
        for (let i = 0; i < nRes; i++) rs.push(MathUtils.randInt(10, 150));
        const Rtotal = rs.reduce((a, b) => a + b, 0);
        const V = MathUtils.pick([6, 9, 12, 24, 120, 240]);
        const I = parseFloat((V / Rtotal).toPrecision(3));

        const rList = rs.map((r, i) => `R_${i+1} = ${r}\\,\\Omega`).join(',\\; ');
        const rSum = rs.join(' + ');

        const mode = MathUtils.pick(['findR', 'findI']);

        if (mode === 'findR') {
            return {
                type: 'free',
                rule: 'Series Resistance',
                difficulty: 'easy',
                text: `Resistors of \\(${rs.join('\\) Ω, \\(')}\\) Ω are connected in series.<br>Find the total resistance. Give your answer in Ω.`,
                latex: `\\(R_{\\text{total}} = R_1 + R_2${nRes === 3 ? ' + R_3' : ''}\\)`,
                answer: Rtotal,
                answerTex: `${Rtotal} \\text{ Ω}`,
                options: [],
                hintTex: [
                    `R_{\\text{total}} = ${rList}`,
                    `R_{\\text{total}} = ${rSum} = ${Rtotal}\\,\\Omega`
                ],
                explain: `<strong>Step 1:</strong> In series, resistances add directly: \\(R_{\\text{total}} = R_1 + R_2${nRes === 3 ? ' + R_3' : ''}\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(R_{\\text{total}} = ${rSum} = ${Rtotal}\\) Ω.`
            };
        } else {
            return {
                type: 'free',
                rule: 'Series Circuit Current',
                difficulty: 'easy',
                text: `Resistors of \\(${rs.join('\\) Ω, \\(')}\\) Ω are connected in series to a \\(${V}\\) V battery.<br>Find the current flowing in the circuit. Give your answer in A to 3 s.f.`,
                latex: `\\(I = \\dfrac{V}{R_{\\text{total}}}\\)`,
                answer: I,
                answerTex: `${I} \\text{ A}`,
                options: [],
                hintTex: [
                    `R_{\\text{total}} = ${rSum} = ${Rtotal}\\,\\Omega`,
                    `I = \\frac{V}{R_{\\text{total}}} = \\frac{${V}}{${Rtotal}}`
                ],
                explain: `<strong>Step 1:</strong> Total resistance: \\(R_{\\text{total}} = ${rSum} = ${Rtotal}\\) Ω.<br><br>` +
                         `<strong>Step 2:</strong> Apply Ohm's Law: \\(I = \\dfrac{V}{R_{\\text{total}}} = \\dfrac{${V}}{${Rtotal}} = ${I}\\) A.`
            };
        }
    },

    /**
     * 4. qParallelResistors - Medium
     * 2 resistors in parallel; find total resistance. 1/Rtotal = 1/R1 + 1/R2.
     */
    qParallelResistors() {
        const R1 = MathUtils.randInt(10, 200);
        const R2 = MathUtils.randInt(10, 200);
        const Rtotal = parseFloat(((R1 * R2) / (R1 + R2)).toPrecision(3));

        const mode = MathUtils.pick(['findR', 'findI1I2']);
        const V = MathUtils.pick([6, 9, 12, 24]);

        if (mode === 'findR') {
            return {
                type: 'free',
                rule: 'Parallel Resistance',
                difficulty: 'medium',
                text: `Two resistors, \\(R_1 = ${R1}\\) Ω and \\(R_2 = ${R2}\\) Ω, are connected in parallel.<br>Find the total resistance. Give your answer in Ω to 3 s.f.`,
                latex: `\\(\\dfrac{1}{R_{\\text{total}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}\\)`,
                answer: Rtotal,
                answerTex: `${Rtotal} \\text{ Ω}`,
                options: [],
                hintTex: [
                    `\\frac{1}{R_{\\text{total}}} = \\frac{1}{${R1}} + \\frac{1}{${R2}}`,
                    `R_{\\text{total}} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{${R1} \\times ${R2}}{${R1} + ${R2}} = \\frac{${R1*R2}}{${R1+R2}}`
                ],
                explain: `<strong>Step 1:</strong> For two resistors in parallel: \\(\\dfrac{1}{R_{\\text{total}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}\\).<br><br>` +
                         `<strong>Step 2:</strong> This simplifies to: \\(R_{\\text{total}} = \\dfrac{R_1 R_2}{R_1 + R_2}\\).<br><br>` +
                         `<strong>Step 3:</strong> Substitute: \\(R_{\\text{total}} = \\dfrac{${R1} \\times ${R2}}{${R1} + ${R2}} = \\dfrac{${R1*R2}}{${R1+R2}} = ${Rtotal}\\) Ω.`
            };
        } else {
            // Find current through each branch given V
            const I1 = parseFloat((V / R1).toPrecision(3));
            const I2 = parseFloat((V / R2).toPrecision(3));
            const Itotal = parseFloat((I1 + I2).toPrecision(3));
            return {
                type: 'free',
                rule: 'Parallel Branch Currents',
                difficulty: 'medium',
                text: `Two resistors, \\(R_1 = ${R1}\\) Ω and \\(R_2 = ${R2}\\) Ω, are connected in parallel across a \\(${V}\\) V supply.<br>Find the total current drawn from the supply. Give your answer in A to 3 s.f.`,
                latex: `\\(I_{\\text{total}} = I_1 + I_2\\)`,
                answer: Itotal,
                answerTex: `${Itotal} \\text{ A}`,
                options: [],
                hintTex: [
                    `I_1 = \\frac{V}{R_1} = \\frac{${V}}{${R1}} = ${I1}\\text{ A}, \\quad I_2 = \\frac{V}{R_2} = \\frac{${V}}{${R2}} = ${I2}\\text{ A}`,
                    `I_{\\text{total}} = I_1 + I_2 = ${I1} + ${I2}`
                ],
                explain: `<strong>Step 1:</strong> In a parallel circuit, voltage across each branch equals the supply voltage.<br><br>` +
                         `<strong>Step 2:</strong> Current through \\(R_1\\): \\(I_1 = \\dfrac{${V}}{${R1}} = ${I1}\\) A.<br><br>` +
                         `<strong>Step 3:</strong> Current through \\(R_2\\): \\(I_2 = \\dfrac{${V}}{${R2}} = ${I2}\\) A.<br><br>` +
                         `<strong>Step 4:</strong> Total current: \\(I = I_1 + I_2 = ${I1} + ${I2} = ${Itotal}\\) A.`
            };
        }
    },

    /**
     * 5. qInternalResistance - Medium
     * Battery with EMF e and internal resistance r; find terminal voltage V = e - Ir.
     */
    qInternalResistance() {
        const emf = MathUtils.pick([1.5, 3.0, 6.0, 9.0, 12.0]);   // V
        const r = parseFloat((MathUtils.randInt(1, 20) / 10).toFixed(1));  // 0.1 - 2.0 Ω
        const I = parseFloat((MathUtils.randInt(1, 30) / 10).toFixed(1));  // 0.1 - 3.0 A
        const Vterm = parseFloat((emf - I * r).toPrecision(3));

        // Ensure terminal voltage is positive
        if (Vterm <= 0) {
            return PHYS_CIRCUITS.qInternalResistance();
        }

        const mode = MathUtils.pick(['findV', 'findEMF']);

        if (mode === 'findV') {
            return {
                type: 'free',
                rule: 'Internal Resistance',
                difficulty: 'medium',
                text: `A battery has an EMF of \\(${emf}\\) V and an internal resistance of \\(${r}\\) Ω.<br>It drives a current of \\(${I}\\) A through an external circuit. Find the terminal voltage. Give your answer in V to 3 s.f.`,
                latex: `\\(V = \\varepsilon - Ir\\)`,
                answer: Vterm,
                answerTex: `${Vterm} \\text{ V}`,
                options: [],
                hintTex: [
                    `V = \\varepsilon - Ir`,
                    `V = ${emf} - ${I} \\times ${r} = ${emf} - ${(I*r).toFixed(2)}`
                ],
                explain: `<strong>Step 1:</strong> Terminal voltage accounts for the voltage drop across internal resistance:<br>` +
                         `\\(V = \\varepsilon - Ir\\).<br><br>` +
                         `<strong>Step 2:</strong> Voltage drop across internal resistance: \\(Ir = ${I} \\times ${r} = ${(I*r).toFixed(2)}\\) V.<br><br>` +
                         `<strong>Step 3:</strong> Terminal voltage: \\(V = ${emf} - ${(I*r).toFixed(2)} = ${Vterm}\\) V.`
            };
        } else {
            // Given V_term, r, I - find EMF
            return {
                type: 'free',
                rule: 'Internal Resistance (find EMF)',
                difficulty: 'medium',
                text: `A battery with internal resistance \\(${r}\\) Ω delivers a current of \\(${I}\\) A.<br>The terminal voltage is measured as \\(${Vterm}\\) V. Find the EMF of the battery. Give your answer in V to 3 s.f.`,
                latex: `\\(\\varepsilon = V + Ir\\)`,
                answer: emf,
                answerTex: `${emf} \\text{ V}`,
                options: [],
                hintTex: [
                    `\\varepsilon = V + Ir`,
                    `\\varepsilon = ${Vterm} + ${I} \\times ${r}`
                ],
                explain: `<strong>Step 1:</strong> Rearrange \\(V = \\varepsilon - Ir\\) to give \\(\\varepsilon = V + Ir\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(\\varepsilon = ${Vterm} + ${I} \\times ${r} = ${Vterm} + ${(I*r).toFixed(2)}\\).<br><br>` +
                         `<strong>Step 3:</strong> \\(\\varepsilon = ${emf}\\) V.`
            };
        }
    },

    /**
     * 6. qSeriesParallel - Hard
     * One resistor in series with a parallel combination; find total R and current through each branch.
     */
    qSeriesParallel() {
        const Rs = MathUtils.randInt(10, 80);    // series resistor
        const Rp1 = MathUtils.randInt(20, 120);  // parallel branch 1
        const Rp2 = MathUtils.randInt(20, 120);  // parallel branch 2
        const V = MathUtils.pick([6, 9, 12, 24, 120]);

        const Rpar = parseFloat(((Rp1 * Rp2) / (Rp1 + Rp2)).toPrecision(4));
        const Rtotal = parseFloat((Rs + Rpar).toPrecision(3));
        const Itotal = parseFloat((V / Rtotal).toPrecision(3));

        const Vpar = parseFloat((Itotal * Rpar).toPrecision(3));  // voltage across parallel section
        const I1 = parseFloat((Vpar / Rp1).toPrecision(3));
        const I2 = parseFloat((Vpar / Rp2).toPrecision(3));

        const mode = MathUtils.pick(['findRtotal', 'findI1']);

        if (mode === 'findRtotal') {
            return {
                type: 'free',
                rule: 'Series-Parallel Circuits',
                difficulty: 'hard',
                text: `In a circuit, a resistor \\(R_s = ${Rs}\\) Ω is connected in series with a parallel combination of \\(R_1 = ${Rp1}\\) Ω and \\(R_2 = ${Rp2}\\) Ω.<br>Find the total resistance of the circuit. Give your answer in Ω to 3 s.f.`,
                latex: `\\(R_{\\text{total}} = R_s + \\dfrac{R_1 R_2}{R_1 + R_2}\\)`,
                answer: Rtotal,
                answerTex: `${Rtotal} \\text{ Ω}`,
                options: [],
                hintTex: [
                    `R_{\\text{parallel}} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{${Rp1} \\times ${Rp2}}{${Rp1} + ${Rp2}} = ${Rpar}\\,\\Omega`,
                    `R_{\\text{total}} = R_s + R_{\\text{parallel}} = ${Rs} + ${Rpar}`
                ],
                explain: `<strong>Step 1:</strong> Find the equivalent resistance of the parallel section:<br>` +
                         `\\(R_{\\text{par}} = \\dfrac{${Rp1} \\times ${Rp2}}{${Rp1} + ${Rp2}} = \\dfrac{${Rp1*Rp2}}{${Rp1+Rp2}} = ${Rpar}\\) Ω.<br><br>` +
                         `<strong>Step 2:</strong> Add the series resistor: \\(R_{\\text{total}} = ${Rs} + ${Rpar} = ${Rtotal}\\) Ω.`
            };
        } else {
            return {
                type: 'free',
                rule: 'Series-Parallel Branch Current',
                difficulty: 'hard',
                text: `In a circuit, \\(R_s = ${Rs}\\) Ω is in series with a parallel combination of \\(R_1 = ${Rp1}\\) Ω and \\(R_2 = ${Rp2}\\) Ω. The supply is \\(${V}\\) V.<br>Find the current through \\(R_1\\). Give your answer in A to 3 s.f.`,
                latex: `\\(R_{\\text{total}} = R_s + \\dfrac{R_1 R_2}{R_1 + R_2}\\)`,
                answer: I1,
                answerTex: `${I1} \\text{ A}`,
                options: [],
                hintTex: [
                    `R_{\\text{par}} = ${Rpar}\\,\\Omega, \\quad R_{\\text{total}} = ${Rtotal}\\,\\Omega, \\quad I_{\\text{total}} = \\frac{${V}}{${Rtotal}} = ${Itotal}\\text{ A}`,
                    `V_{\\text{par}} = I_{\\text{total}} \\times R_{\\text{par}} = ${Itotal} \\times ${Rpar} = ${Vpar}\\text{ V}, \\quad I_1 = \\frac{V_{\\text{par}}}{R_1} = \\frac{${Vpar}}{${Rp1}}`
                ],
                explain: `<strong>Step 1:</strong> Parallel resistance: \\(R_{\\text{par}} = \\dfrac{${Rp1} \\times ${Rp2}}{${Rp1+Rp2}} = ${Rpar}\\) Ω.<br><br>` +
                         `<strong>Step 2:</strong> Total resistance: \\(R_{\\text{total}} = ${Rs} + ${Rpar} = ${Rtotal}\\) Ω.<br><br>` +
                         `<strong>Step 3:</strong> Total current: \\(I = \\dfrac{${V}}{${Rtotal}} = ${Itotal}\\) A.<br><br>` +
                         `<strong>Step 4:</strong> Voltage across parallel section: \\(V_{\\text{par}} = ${Itotal} \\times ${Rpar} = ${Vpar}\\) V.<br><br>` +
                         `<strong>Step 5:</strong> Current through \\(R_1\\): \\(I_1 = \\dfrac{${Vpar}}{${Rp1}} = ${I1}\\) A.`
            };
        }
    },

    /**
     * 7. qEnergyCircuit - Easy
     * Given V and I, find energy dissipated E = VIt.
     */
    qEnergyCircuit() {
        const V = MathUtils.pick([1.5, 3, 5, 9, 12, 24, 120, 230]);
        const I = parseFloat((MathUtils.randInt(1, 50) / 10).toFixed(1));
        const t = MathUtils.pick([30, 60, 120, 300, 600, 900, 1800, 3600]);
        const E = parseFloat((V * I * t).toPrecision(3));

        const tLabel = t < 60 ? `${t} s` : t < 3600 ? `${t/60} minutes` : `${t/3600} hour`;

        const scenarios = ['a resistor', 'a light bulb', 'a heating element', 'a motor', 'a phone charger circuit'];
        const sc = MathUtils.pick(scenarios);

        return {
            type: 'free',
            rule: 'Electrical Energy',
            difficulty: 'easy',
            text: `A current of \\(${I}\\) A flows through ${sc} at \\(${V}\\) V for ${tLabel}.<br>Calculate the electrical energy dissipated. Give your answer in J to 3 s.f.`,
            latex: `\\(E = VIt\\)`,
            answer: E,
            answerTex: `${E} \\text{ J}`,
            options: [],
            hintTex: [
                `E = VIt`,
                `E = ${V} \\times ${I} \\times ${t}`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(E = VIt\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(E = ${V} \\times ${I} \\times ${t}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(E = ${E}\\) J.`
        };
    },

    /**
     * 8. qVoltmeterAmmeter - Easy
     * Ammeter reads I, voltmeter reads V; find R and power.
     */
    qVoltmeterAmmeter() {
        const V = MathUtils.randInt(2, 120);
        const I = parseFloat((MathUtils.randInt(1, 40) / 10).toFixed(1));
        const R = parseFloat((V / I).toPrecision(3));
        const P = parseFloat((V * I).toPrecision(3));

        const mode = MathUtils.pick(['findR', 'findP']);

        if (mode === 'findR') {
            return {
                type: 'free',
                rule: 'Ammeter and Voltmeter',
                difficulty: 'easy',
                text: `An ammeter in a circuit reads \\(${I}\\) A and a voltmeter connected across a component reads \\(${V}\\) V.<br>Find the resistance of the component. Give your answer in Ω to 3 s.f.`,
                latex: `\\(R = \\dfrac{V}{I}\\)`,
                answer: R,
                answerTex: `${R} \\text{ Ω}`,
                options: [],
                hintTex: [
                    `R = \\frac{V}{I}`,
                    `R = \\frac{${V}}{${I}}`
                ],
                explain: `<strong>Step 1:</strong> The voltmeter gives the potential difference across the component; the ammeter gives the current through it.<br><br>` +
                         `<strong>Step 2:</strong> Use Ohm's Law: \\(R = \\dfrac{V}{I} = \\dfrac{${V}}{${I}} = ${R}\\) Ω.`
            };
        } else {
            return {
                type: 'free',
                rule: 'Ammeter and Voltmeter (Power)',
                difficulty: 'easy',
                text: `An ammeter reads \\(${I}\\) A and a voltmeter reads \\(${V}\\) V for a component in a circuit.<br>Calculate the power dissipated in the component. Give your answer in W to 3 s.f.`,
                latex: `\\(P = IV\\)`,
                answer: P,
                answerTex: `${P} \\text{ W}`,
                options: [],
                hintTex: [
                    `P = IV`,
                    `P = ${I} \\times ${V}`
                ],
                explain: `<strong>Step 1:</strong> Use \\(P = IV\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute readings directly: \\(P = ${I} \\times ${V} = ${P}\\) W.`
            };
        }
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => PHYS_CIRCUITS.qOhmsLaw(),            weight: 2, diff: 'easy'   },
            { fn: () => PHYS_CIRCUITS.qPower(),               weight: 2, diff: 'easy'   },
            { fn: () => PHYS_CIRCUITS.qSeriesResistors(),     weight: 2, diff: 'easy'   },
            { fn: () => PHYS_CIRCUITS.qParallelResistors(),   weight: 2, diff: 'medium' },
            { fn: () => PHYS_CIRCUITS.qInternalResistance(),  weight: 2, diff: 'medium' },
            { fn: () => PHYS_CIRCUITS.qSeriesParallel(),      weight: 1, diff: 'hard'   },
            { fn: () => PHYS_CIRCUITS.qEnergyCircuit(),       weight: 2, diff: 'easy'   },
            { fn: () => PHYS_CIRCUITS.qVoltmeterAmmeter(),    weight: 2, diff: 'easy'   }
        ];

        let filtered = pool;
        if (PHYS_CIRCUITS.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (PHYS_CIRCUITS.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (PHYS_CIRCUITS.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

        const totalWeight = filtered.reduce((s, p) => s + p.weight, 0);
        let r = Math.random() * totalWeight;
        for (const item of filtered) {
            r -= item.weight;
            if (r <= 0) return item.fn();
        }
        return filtered[filtered.length - 1].fn();
    },

    /* ────────────────────────────────────────────
       UI: load()
       ──────────────────────────────────────────── */

    load() {
        PHYS_CIRCUITS.score = 0;
        PHYS_CIRCUITS.total = 0;
        PHYS_CIRCUITS.streak = 0;
        PHYS_CIRCUITS.answered = false;
        PHYS_CIRCUITS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PHYS_CIRCUITS.unload()">Topic B: Particulate Nature of Matter</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Electric Circuits</h1>
                <p>IB Physics B.5 - Ohm's law, resistance, power, series and parallel circuits</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="PHYS_CIRCUITS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="PHYS_CIRCUITS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="PHYS_CIRCUITS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="PHYS_CIRCUITS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="pcirc-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="pcirc-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="pcirc-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="pcirc-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="pcirc-rule"></span>
                <span class="difficulty-tag" id="pcirc-difficulty"></span>
                <div class="question-text" id="pcirc-text"></div>
                <div class="question-prompt" id="pcirc-latex"></div>
                <div id="pcirc-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="pcirc-hint-box"></div>
            <div class="feedback" id="pcirc-feedback">
                <div class="feedback-title" id="pcirc-feedback-title"></div>
                <div class="feedback-explanation" id="pcirc-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="pcirc-hint-btn" onclick="PHYS_CIRCUITS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pcirc-next-btn" onclick="PHYS_CIRCUITS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        PHYS_CIRCUITS.next();
    },

    /* ────────────────────────────────────────────
       UI: unload()
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('topic-b');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        PHYS_CIRCUITS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        PHYS_CIRCUITS.score = 0;
        PHYS_CIRCUITS.total = 0;
        PHYS_CIRCUITS.streak = 0;
        PHYS_CIRCUITS.updateStats();
        PHYS_CIRCUITS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        PHYS_CIRCUITS.answered = false;
        PHYS_CIRCUITS.hintIndex = 0;
        PHYS_CIRCUITS.currentQ = PHYS_CIRCUITS.pickQuestion();
        const q = PHYS_CIRCUITS.currentQ;

        const ruleEl = document.getElementById('pcirc-rule');
        ruleEl.textContent = q.rule;

        const diffEl = document.getElementById('pcirc-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        document.getElementById('pcirc-text').innerHTML = q.text;
        document.getElementById('pcirc-latex').innerHTML = q.latex;

        const optArea = document.getElementById('pcirc-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="PHYS_CIRCUITS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="pcirc-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')PHYS_CIRCUITS.checkFree()">
                    <button class="btn btn-primary" onclick="PHYS_CIRCUITS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => { const inp = document.getElementById('pcirc-input'); if (inp) inp.focus(); }, 100);
        }

        const hintBox = document.getElementById('pcirc-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('pcirc-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('pcirc-next-btn').style.display = 'none';
        document.getElementById('pcirc-hint-btn').style.display = '';
        document.getElementById('pcirc-hint-btn').disabled = false;

        PHYS_CIRCUITS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = PHYS_CIRCUITS.currentQ;
        if (!q || !q.hintTex || PHYS_CIRCUITS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('pcirc-hint-box');
        const hintContent = PHYS_CIRCUITS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[PHYS_CIRCUITS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        PHYS_CIRCUITS.hintIndex++;

        if (PHYS_CIRCUITS.hintIndex >= q.hintTex.length) {
            document.getElementById('pcirc-hint-btn').disabled = true;
        }
        PHYS_CIRCUITS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (PHYS_CIRCUITS.answered) return;
        PHYS_CIRCUITS.answered = true;
        PHYS_CIRCUITS.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });

        if (isCorrect) {
            btn.classList.add('correct');
            PHYS_CIRCUITS.score++;
            PHYS_CIRCUITS.streak++;
        } else {
            btn.classList.add('incorrect');
            PHYS_CIRCUITS.streak = 0;
        }

        PHYS_CIRCUITS.showFeedback(isCorrect);
        PHYS_CIRCUITS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (PHYS_CIRCUITS.answered) return;
        const inp = document.getElementById('pcirc-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        PHYS_CIRCUITS.answered = true;
        PHYS_CIRCUITS.total++;
        inp.disabled = true;

        const q = PHYS_CIRCUITS.currentQ;
        const isCorrect = Math.abs(val - q.answer) <= Math.abs(q.answer * 0.01) + 0.01;

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            PHYS_CIRCUITS.score++;
            PHYS_CIRCUITS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            PHYS_CIRCUITS.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        PHYS_CIRCUITS.showFeedback(isCorrect);
        PHYS_CIRCUITS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = PHYS_CIRCUITS.currentQ;
        const fb = document.getElementById('pcirc-feedback');
        const title = document.getElementById('pcirc-feedback-title');
        const explanation = document.getElementById('pcirc-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = PHYS_CIRCUITS.streak > 1 ? `Correct! (${PHYS_CIRCUITS.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('pcirc-next-btn').style.display = '';
        document.getElementById('pcirc-hint-btn').style.display = 'none';

        PHYS_CIRCUITS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('pcirc-score');
        const totalEl  = document.getElementById('pcirc-total');
        const streakEl = document.getElementById('pcirc-streak');
        const accEl    = document.getElementById('pcirc-accuracy');

        if (scoreEl)  scoreEl.textContent  = PHYS_CIRCUITS.score;
        if (totalEl)  totalEl.textContent  = PHYS_CIRCUITS.total;
        if (streakEl) streakEl.textContent = PHYS_CIRCUITS.streak;
        if (accEl)    accEl.textContent    = PHYS_CIRCUITS.total > 0 ? Math.round((PHYS_CIRCUITS.score / PHYS_CIRCUITS.total) * 100) + '%' : '-';
    },

    /* ────────────────────────────────────────────
       UI: renderAllKaTeX()
       ──────────────────────────────────────────── */

    renderAllKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const container = document.getElementById('activity-container');
            if (container) {
                renderMathInElement(container, {
                    delimiters: [
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '$$', right: '$$', display: true },
                        { left: '$',  right: '$',  display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['circuits'] = () => PHYS_CIRCUITS.load();
