/*
 * gas-laws.js - IB Physics B.3: Gas Laws
 * Ideal gas, Boyle's law, Charles's law, Gay-Lussac, combined, pV = nRT, kinetic theory
 */

const PHYS_GAS = {
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
     * 1. qBoyle - Easy
     * p1V1 = p2V2, given 3 of 4 values, find the 4th.
     */
    qBoyle() {
        // Work in kPa and litres for readable numbers
        const p1 = MathUtils.randInt(50, 200);    // kPa
        const V1 = MathUtils.randInt(2, 20);       // L
        const V2 = MathUtils.randInt(1, 30);       // L (may equal V1 - handled below)
        const V2safe = V2 === V1 ? V2 + 1 : V2;
        const p2 = parseFloat(((p1 * V1) / V2safe).toPrecision(3));

        const scenarios = ['a sealed syringe', 'a gas cylinder being filled', 'a submarine ballast tank', 'a bicycle pump'];
        const sc = MathUtils.pick(scenarios);

        // Randomly ask for p2 or V2
        const askP2 = MathUtils.randInt(0, 1) === 1;

        if (askP2) {
            return {
                type: 'free',
                rule: "Boyle's Law",
                difficulty: 'easy',
                text: `The gas in ${sc} occupies a volume of \\(${V1}\\) L at a pressure of \\(${p1}\\) kPa.<br>The volume is changed to \\(${V2safe}\\) L at constant temperature. Find the new pressure in kPa. Give your answer to 3 s.f.`,
                latex: `\\(p_1 V_1 = p_2 V_2\\)`,
                answer: p2,
                answerTex: `${p2} \\text{ kPa}`,
                options: [],
                hintTex: [
                    `p_1 V_1 = p_2 V_2 \\quad (\\text{constant temperature})`,
                    `p_2 = \\frac{p_1 V_1}{V_2} = \\frac{${p1} \\times ${V1}}{${V2safe}}`
                ],
                explain: `<strong>Step 1:</strong> Boyle's Law (constant temperature): \\(p_1 V_1 = p_2 V_2\\).<br><br>` +
                         `<strong>Step 2:</strong> Rearrange for \\(p_2\\): \\(p_2 = \\dfrac{p_1 V_1}{V_2}\\).<br><br>` +
                         `<strong>Step 3:</strong> Substitute: \\(p_2 = \\dfrac{${p1} \\times ${V1}}{${V2safe}} = ${p2}\\) kPa.`
            };
        } else {
            // Ask for V2 given p2
            const p2given = MathUtils.randInt(50, 300);
            const V2ans = parseFloat(((p1 * V1) / p2given).toPrecision(3));
            return {
                type: 'free',
                rule: "Boyle's Law",
                difficulty: 'easy',
                text: `The gas in ${sc} occupies a volume of \\(${V1}\\) L at \\(${p1}\\) kPa.<br>The pressure is increased to \\(${p2given}\\) kPa at constant temperature. Find the new volume in litres. Give your answer to 3 s.f.`,
                latex: `\\(p_1 V_1 = p_2 V_2\\)`,
                answer: V2ans,
                answerTex: `${V2ans} \\text{ L}`,
                options: [],
                hintTex: [
                    `p_1 V_1 = p_2 V_2`,
                    `V_2 = \\frac{p_1 V_1}{p_2} = \\frac{${p1} \\times ${V1}}{${p2given}}`
                ],
                explain: `<strong>Step 1:</strong> Boyle's Law: \\(p_1 V_1 = p_2 V_2\\).<br><br>` +
                         `<strong>Step 2:</strong> Rearrange: \\(V_2 = \\dfrac{p_1 V_1}{p_2}\\).<br><br>` +
                         `<strong>Step 3:</strong> Substitute: \\(V_2 = \\dfrac{${p1} \\times ${V1}}{${p2given}} = ${V2ans}\\) L.`
            };
        }
    },

    /**
     * 2. qCharles - Easy
     * V1/T1 = V2/T2, temperatures in Kelvin.
     */
    qCharles() {
        const T1C = MathUtils.randInt(0, 100);            // °C
        const T2C = MathUtils.randInt(-20, 200);          // °C
        const T1 = T1C + 273;                             // K
        const T2 = T2C + 273;                             // K
        const V1 = MathUtils.randInt(2, 20);              // L

        const V2 = parseFloat(((V1 * T2) / T1).toPrecision(3));

        const scenarios = ['a weather balloon', 'a gas-filled flask being heated', 'a hot-air balloon envelope'];
        const sc = MathUtils.pick(scenarios);

        return {
            type: 'free',
            rule: "Charles's Law",
            difficulty: 'easy',
            text: `${sc.charAt(0).toUpperCase() + sc.slice(1)} contains \\(${V1}\\) L of gas at \\(${T1C}\\) °C.<br>The temperature is changed to \\(${T2C}\\) °C at constant pressure. Find the new volume in litres. Give your answer to 3 s.f.`,
            latex: `\\(\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}\\) \\quad (T \\text{ in K})`,
            answer: V2,
            answerTex: `${V2} \\text{ L}`,
            options: [],
            hintTex: [
                `\\text{Convert to Kelvin: } T_1 = ${T1C} + 273 = ${T1}\\text{ K}, \\; T_2 = ${T2C} + 273 = ${T2}\\text{ K}`,
                `V_2 = \\frac{V_1 T_2}{T_1} = \\frac{${V1} \\times ${T2}}{${T1}}`
            ],
            explain: `<strong>Step 1:</strong> Convert to Kelvin: \\(T_1 = ${T1C} + 273 = ${T1}\\) K; \\(T_2 = ${T2C} + 273 = ${T2}\\) K.<br><br>` +
                     `<strong>Step 2:</strong> Charles's Law (constant pressure): \\(\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Rearrange: \\(V_2 = \\dfrac{V_1 T_2}{T_1} = \\dfrac{${V1} \\times ${T2}}{${T1}} = ${V2}\\) L.`
        };
    },

    /**
     * 3. qGayLussac - Easy
     * p1/T1 = p2/T2, find new pressure.
     */
    qGayLussac() {
        const T1C = MathUtils.randInt(10, 80);
        const T2C = MathUtils.randInt(100, 300);
        const T1 = T1C + 273;
        const T2 = T2C + 273;
        const p1 = MathUtils.randInt(100, 300);   // kPa

        const p2 = parseFloat(((p1 * T2) / T1).toPrecision(3));

        const scenarios = [
            'a sealed aerosol can', 'a car tyre after a long motorway drive', 'a pressure cooker lid',
            'a sealed gas canister being heated in a lab'
        ];
        const sc = MathUtils.pick(scenarios);

        return {
            type: 'free',
            rule: "Gay-Lussac's Law",
            difficulty: 'easy',
            text: `${sc.charAt(0).toUpperCase() + sc.slice(1)} contains gas at \\(${p1}\\) kPa and \\(${T1C}\\) °C.<br>The temperature rises to \\(${T2C}\\) °C at constant volume. Find the new pressure in kPa. Give your answer to 3 s.f.`,
            latex: `\\(\\dfrac{p_1}{T_1} = \\dfrac{p_2}{T_2}\\) \\quad (T \\text{ in K})`,
            answer: p2,
            answerTex: `${p2} \\text{ kPa}`,
            options: [],
            hintTex: [
                `T_1 = ${T1}\\text{ K}, \\quad T_2 = ${T2}\\text{ K}`,
                `p_2 = \\frac{p_1 T_2}{T_1} = \\frac{${p1} \\times ${T2}}{${T1}}`
            ],
            explain: `<strong>Step 1:</strong> Convert to Kelvin: \\(T_1 = ${T1}\\) K, \\(T_2 = ${T2}\\) K.<br><br>` +
                     `<strong>Step 2:</strong> Gay-Lussac's Law (constant volume): \\(\\dfrac{p_1}{T_1} = \\dfrac{p_2}{T_2}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(p_2 = \\dfrac{${p1} \\times ${T2}}{${T1}} = ${p2}\\) kPa.`
        };
    },

    /**
     * 4. qCombined - Medium
     * p1V1/T1 = p2V2/T2, three-variable change.
     */
    qCombined() {
        const T1C = MathUtils.randInt(0, 60);
        const T2C = MathUtils.randInt(100, 300);
        const T1 = T1C + 273;
        const T2 = T2C + 273;
        const p1 = MathUtils.randInt(80, 200);    // kPa
        const V1 = MathUtils.randInt(5, 30);      // L
        const p2 = MathUtils.randInt(150, 400);   // kPa

        const V2 = parseFloat(((p1 * V1 * T2) / (T1 * p2)).toPrecision(3));

        const scenarios = ['a gas inside a piston-cylinder system', 'a sample of air in a laboratory experiment', 'the gas in a sealed container being heated and compressed'];
        const sc = MathUtils.pick(scenarios);

        return {
            type: 'free',
            rule: 'Combined Gas Law',
            difficulty: 'medium',
            text: `A sample of gas (${sc}) has initial conditions: \\(p_1 = ${p1}\\) kPa, \\(V_1 = ${V1}\\) L, \\(T_1 = ${T1C}\\) °C.<br>` +
                  `The gas is heated to \\(${T2C}\\) °C while the pressure changes to \\(${p2}\\) kPa.<br>Find the new volume in litres. Give your answer to 3 s.f.`,
            latex: `\\(\\dfrac{p_1 V_1}{T_1} = \\dfrac{p_2 V_2}{T_2}\\)`,
            answer: V2,
            answerTex: `${V2} \\text{ L}`,
            options: [],
            hintTex: [
                `\\text{Convert: } T_1 = ${T1}\\text{ K}, \\; T_2 = ${T2}\\text{ K}`,
                `V_2 = \\frac{p_1 V_1 T_2}{T_1 p_2} = \\frac{${p1} \\times ${V1} \\times ${T2}}{${T1} \\times ${p2}}`
            ],
            explain: `<strong>Step 1:</strong> Convert temperatures: \\(T_1 = ${T1}\\) K, \\(T_2 = ${T2}\\) K.<br><br>` +
                     `<strong>Step 2:</strong> Combined gas law: \\(\\dfrac{p_1 V_1}{T_1} = \\dfrac{p_2 V_2}{T_2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Rearrange: \\(V_2 = \\dfrac{p_1 V_1 T_2}{T_1 p_2}\\).<br><br>` +
                     `<strong>Step 4:</strong> Substitute: \\(V_2 = \\dfrac{${p1} \\times ${V1} \\times ${T2}}{${T1} \\times ${p2}} = ${V2}\\) L.`
        };
    },

    /**
     * 5. qIdealGas_n - Medium
     * pV = nRT, find n (moles). p in Pa, V in m³, T in K, R = 8.31.
     */
    qIdealGas_n() {
        const R = 8.31;
        const TC = MathUtils.randInt(0, 100);
        const T = TC + 273;
        const pkPa = MathUtils.randInt(100, 500);
        const p = pkPa * 1000;   // Pa
        const VL = MathUtils.randInt(2, 20);
        const V = VL / 1000;     // m³

        const n = parseFloat(((p * V) / (R * T)).toPrecision(3));

        return {
            type: 'free',
            rule: 'Ideal Gas (find n)',
            difficulty: 'medium',
            text: `A container holds gas at \\(${pkPa}\\) kPa, \\(${VL}\\) L, and \\(${TC}\\) °C.<br>How many moles of gas are present? Give your answer to 3 s.f. (\\(R = 8.31\\) J mol\\(^{-1}\\) K\\(^{-1}\\)).`,
            latex: `\\(pV = nRT\\)`,
            answer: n,
            answerTex: `${n} \\text{ mol}`,
            options: [],
            hintTex: [
                `\\text{Convert: } p = ${p}\\text{ Pa}, \\; V = ${V}\\text{ m}^3, \\; T = ${T}\\text{ K}`,
                `n = \\frac{pV}{RT} = \\frac{${p} \\times ${V}}{8.31 \\times ${T}}`
            ],
            explain: `<strong>Step 1:</strong> Convert to SI units: \\(p = ${pkPa} \\times 10^3 = ${p}\\) Pa; \\(V = ${VL}/1000 = ${V}\\) m\\(^3\\); \\(T = ${TC} + 273 = ${T}\\) K.<br><br>` +
                     `<strong>Step 2:</strong> Ideal gas law: \\(pV = nRT\\), so \\(n = \\dfrac{pV}{RT}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(n = \\dfrac{${p} \\times ${V}}{8.31 \\times ${T}}\\).<br><br>` +
                     `<strong>Step 4:</strong> Calculate: \\(n = ${n}\\) mol.`
        };
    },

    /**
     * 6. qIdealGas_p - Medium
     * pV = nRT, given n, T, V, find p.
     */
    qIdealGas_p() {
        const R = 8.31;
        const TC = MathUtils.randInt(20, 200);
        const T = TC + 273;
        const n = MathUtils.randInt(1, 10);         // moles
        const VL = MathUtils.randInt(5, 50);
        const V = VL / 1000;                        // m³

        const p = parseFloat(((n * R * T) / V).toPrecision(3));
        const pkPa = parseFloat((p / 1000).toPrecision(3));

        return {
            type: 'free',
            rule: 'Ideal Gas (find p)',
            difficulty: 'medium',
            text: `\\(${n}\\) mol of ideal gas is contained in a \\(${VL}\\) L vessel at \\(${TC}\\) °C.<br>Calculate the pressure in kPa. Give your answer to 3 s.f. (\\(R = 8.31\\) J mol\\(^{-1}\\) K\\(^{-1}\\)).`,
            latex: `\\(pV = nRT\\)`,
            answer: pkPa,
            answerTex: `${pkPa} \\text{ kPa}`,
            options: [],
            hintTex: [
                `T = ${TC} + 273 = ${T}\\text{ K}, \\quad V = ${V}\\text{ m}^3`,
                `p = \\frac{nRT}{V} = \\frac{${n} \\times 8.31 \\times ${T}}{${V}} \\quad \\text{then convert to kPa}`
            ],
            explain: `<strong>Step 1:</strong> Convert: \\(T = ${T}\\) K; \\(V = ${V}\\) m\\(^3\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange \\(pV = nRT\\): \\(p = \\dfrac{nRT}{V}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(p = \\dfrac{${n} \\times 8.31 \\times ${T}}{${V}} = ${p}\\) Pa.<br><br>` +
                     `<strong>Step 4:</strong> Convert to kPa: \\(p = ${pkPa}\\) kPa.`
        };
    },

    /**
     * 7. qTemperatureConvert - Easy (MC)
     * Convert °C to K; identify which statement about average kinetic energy is correct.
     */
    qTemperatureConvert() {
        const TC = MathUtils.randInt(-100, 300);
        const TK = TC + 273;

        const options = [
            { value: 1, tex: `${TK} \\text{ K}` },
            { value: 0, tex: `${TC + 100} \\text{ K}` },
            { value: 0, tex: `${TC} \\text{ K}` },
            { value: 0, tex: `${TC - 273} \\text{ K}` }
        ];

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Temperature Conversion',
            difficulty: 'easy',
            text: `A gas sample is at a temperature of \\(${TC}\\) °C. What is this temperature in kelvin?`,
            latex: `\\(T(\\text{K}) = T(\\text{°C}) + 273\\)`,
            answer: 1,
            answerTex: `${TK} \\text{ K}`,
            options: shuffled,
            hintTex: [
                `T(\\text{K}) = T(\\text{°C}) + 273`,
                `T = ${TC} + 273 = ${TK}\\text{ K}`
            ],
            explain: `<strong>Step 1:</strong> Use the conversion: \\(T(\\text{K}) = T(\\text{°C}) + 273\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(T = ${TC} + 273 = ${TK}\\) K.<br><br>` +
                     `<strong>Note:</strong> The Kelvin scale starts at absolute zero (\\(0\\) K \\(= -273\\) °C). Average kinetic energy of gas particles is directly proportional to temperature in Kelvin, not in Celsius.`
        };
    },

    /**
     * 8. qKineticTheory - Hard
     * pV = NkT, find N given p (Pa), V (m³), T (K). k = 1.38e-23.
     */
    qKineticTheory() {
        const k = 1.38e-23;
        const TC = MathUtils.randInt(0, 100);
        const T = TC + 273;
        const pkPa = MathUtils.randInt(100, 400);
        const p = pkPa * 1000;                   // Pa
        const VL = MathUtils.randInt(1, 10);
        const V = VL / 1000;                     // m³

        const N = (p * V) / (k * T);
        const Nrounded = parseFloat(N.toPrecision(3));
        // Express in scientific notation
        const exp = Math.floor(Math.log10(Nrounded));
        const mantissa = parseFloat((Nrounded / Math.pow(10, exp)).toPrecision(3));
        const NTeX = `${mantissa} \\times 10^{${exp}}`;

        return {
            type: 'free',
            rule: 'Kinetic Theory (find N)',
            difficulty: 'hard',
            text: `A gas sample at \\(${pkPa}\\) kPa occupies \\(${VL}\\) L at \\(${TC}\\) °C.<br>Calculate the number of gas molecules. Give your answer to 3 s.f. in scientific notation as a decimal (e.g. for \\(2.45 \\times 10^{24}\\) enter \\(2.45\\)e\\(24\\) — submit just the mantissa × 10^exp as a plain number).<br><em>Hint: Boltzmann constant \\(k_B = 1.38 \\times 10^{-23}\\) J K\\(^{-1}\\)</em>`,
            latex: `\\(pV = Nk_B T\\)`,
            answer: Nrounded,
            answerTex: NTeX,
            options: [],
            hintTex: [
                `p = ${p}\\text{ Pa}, \\; V = ${V}\\text{ m}^3, \\; T = ${T}\\text{ K}`,
                `N = \\frac{pV}{k_B T} = \\frac{${p} \\times ${V}}{1.38 \\times 10^{-23} \\times ${T}}`
            ],
            explain: `<strong>Step 1:</strong> Convert to SI: \\(p = ${p}\\) Pa; \\(V = ${V}\\) m\\(^3\\); \\(T = ${T}\\) K.<br><br>` +
                     `<strong>Step 2:</strong> Use \\(pV = Nk_BT\\), so \\(N = \\dfrac{pV}{k_B T}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(N = \\dfrac{${p} \\times ${V}}{1.38 \\times 10^{-23} \\times ${T}}\\).<br><br>` +
                     `<strong>Step 4:</strong> Calculate: \\(N \\approx ${NTeX}\\) molecules.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => PHYS_GAS.qBoyle(),             weight: 2, diff: 'easy'   },
            { fn: () => PHYS_GAS.qCharles(),            weight: 2, diff: 'easy'   },
            { fn: () => PHYS_GAS.qGayLussac(),          weight: 2, diff: 'easy'   },
            { fn: () => PHYS_GAS.qCombined(),           weight: 2, diff: 'medium' },
            { fn: () => PHYS_GAS.qIdealGas_n(),         weight: 2, diff: 'medium' },
            { fn: () => PHYS_GAS.qIdealGas_p(),         weight: 2, diff: 'medium' },
            { fn: () => PHYS_GAS.qTemperatureConvert(), weight: 2, diff: 'easy'   },
            { fn: () => PHYS_GAS.qKineticTheory(),      weight: 1, diff: 'hard'   }
        ];

        let filtered = pool;
        if (PHYS_GAS.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (PHYS_GAS.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (PHYS_GAS.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

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
        PHYS_GAS.score = 0;
        PHYS_GAS.total = 0;
        PHYS_GAS.streak = 0;
        PHYS_GAS.answered = false;
        PHYS_GAS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PHYS_GAS.unload()">Topic B: Particulate Nature of Matter</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Gas Laws</h1>
                <p>IB Physics B.3 - Ideal gas, Boyle, Charles, Gay-Lussac, ideal gas equation</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="PHYS_GAS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="PHYS_GAS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="PHYS_GAS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="PHYS_GAS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="pgas-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="pgas-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="pgas-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="pgas-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="pgas-rule"></span>
                <span class="difficulty-tag" id="pgas-difficulty"></span>
                <div class="question-text" id="pgas-text"></div>
                <div class="question-prompt" id="pgas-latex"></div>
                <div id="pgas-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="pgas-hint-box"></div>
            <div class="feedback" id="pgas-feedback">
                <div class="feedback-title" id="pgas-feedback-title"></div>
                <div class="feedback-explanation" id="pgas-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="pgas-hint-btn" onclick="PHYS_GAS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pgas-next-btn" onclick="PHYS_GAS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        PHYS_GAS.next();
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
        PHYS_GAS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        PHYS_GAS.score = 0;
        PHYS_GAS.total = 0;
        PHYS_GAS.streak = 0;
        PHYS_GAS.updateStats();
        PHYS_GAS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        PHYS_GAS.answered = false;
        PHYS_GAS.hintIndex = 0;
        PHYS_GAS.currentQ = PHYS_GAS.pickQuestion();
        const q = PHYS_GAS.currentQ;

        const ruleEl = document.getElementById('pgas-rule');
        ruleEl.textContent = q.rule;

        const diffEl = document.getElementById('pgas-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        document.getElementById('pgas-text').innerHTML = q.text;
        document.getElementById('pgas-latex').innerHTML = q.latex;

        const optArea = document.getElementById('pgas-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="PHYS_GAS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="pgas-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')PHYS_GAS.checkFree()">
                    <button class="btn btn-primary" onclick="PHYS_GAS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => { const inp = document.getElementById('pgas-input'); if (inp) inp.focus(); }, 100);
        }

        const hintBox = document.getElementById('pgas-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('pgas-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('pgas-next-btn').style.display = 'none';
        document.getElementById('pgas-hint-btn').style.display = '';
        document.getElementById('pgas-hint-btn').disabled = false;

        PHYS_GAS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = PHYS_GAS.currentQ;
        if (!q || !q.hintTex || PHYS_GAS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('pgas-hint-box');
        const hintContent = PHYS_GAS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[PHYS_GAS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        PHYS_GAS.hintIndex++;

        if (PHYS_GAS.hintIndex >= q.hintTex.length) {
            document.getElementById('pgas-hint-btn').disabled = true;
        }
        PHYS_GAS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (PHYS_GAS.answered) return;
        PHYS_GAS.answered = true;
        PHYS_GAS.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });

        if (isCorrect) {
            btn.classList.add('correct');
            PHYS_GAS.score++;
            PHYS_GAS.streak++;
        } else {
            btn.classList.add('incorrect');
            PHYS_GAS.streak = 0;
        }

        PHYS_GAS.showFeedback(isCorrect);
        PHYS_GAS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (PHYS_GAS.answered) return;
        const inp = document.getElementById('pgas-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        PHYS_GAS.answered = true;
        PHYS_GAS.total++;
        inp.disabled = true;

        const q = PHYS_GAS.currentQ;
        const isCorrect = Math.abs(val - q.answer) <= Math.abs(q.answer * 0.01) + 0.01;

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            PHYS_GAS.score++;
            PHYS_GAS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            PHYS_GAS.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        PHYS_GAS.showFeedback(isCorrect);
        PHYS_GAS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = PHYS_GAS.currentQ;
        const fb = document.getElementById('pgas-feedback');
        const title = document.getElementById('pgas-feedback-title');
        const explanation = document.getElementById('pgas-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = PHYS_GAS.streak > 1 ? `Correct! (${PHYS_GAS.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('pgas-next-btn').style.display = '';
        document.getElementById('pgas-hint-btn').style.display = 'none';

        PHYS_GAS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('pgas-score');
        const totalEl  = document.getElementById('pgas-total');
        const streakEl = document.getElementById('pgas-streak');
        const accEl    = document.getElementById('pgas-accuracy');

        if (scoreEl)  scoreEl.textContent  = PHYS_GAS.score;
        if (totalEl)  totalEl.textContent  = PHYS_GAS.total;
        if (streakEl) streakEl.textContent = PHYS_GAS.streak;
        if (accEl)    accEl.textContent    = PHYS_GAS.total > 0 ? Math.round((PHYS_GAS.score / PHYS_GAS.total) * 100) + '%' : '-';
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['gas-laws'] = () => PHYS_GAS.load();
