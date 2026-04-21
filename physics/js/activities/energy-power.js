/*
 * energy-power.js - IB Physics A.3: Work, Energy and Power
 * KE, GPE, conservation of energy, work done, power, efficiency, spring energy
 */

const PHYS_ENERGY = {
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
     * 1. qKineticEnergy - Easy
     * Given mass (kg) and speed (m/s), find Ek = ½mv².
     */
    qKineticEnergy() {
        const scenarios = [
            { label: 'A car', m: MathUtils.randInt(8, 20) * 100, vRange: [20, 35] },
            { label: 'A cyclist', m: MathUtils.randInt(60, 90), vRange: [5, 15] },
            { label: 'A football', m: MathUtils.randInt(4, 5) / 10, vRange: [15, 30] },
            { label: 'A spacecraft module', m: MathUtils.randInt(200, 800) * 10, vRange: [100, 300] },
            { label: 'A tennis ball', m: MathUtils.randInt(55, 60) / 1000, vRange: [40, 70] }
        ];
        const sc = MathUtils.pick(scenarios);
        const m = sc.m;
        const v = MathUtils.randInt(sc.vRange[0], sc.vRange[1]);
        const ek = 0.5 * m * v * v;
        const ekRounded = parseFloat(ek.toPrecision(3));

        return {
            type: 'free',
            rule: 'Kinetic Energy',
            difficulty: 'easy',
            text: `${sc.label} has a mass of \\(${m}\\) kg and is moving at \\(${v}\\) m s\\(^{-1}\\).<br>Calculate its kinetic energy. Give your answer in J to 3 significant figures.`,
            latex: `\\(E_k = \\tfrac{1}{2}mv^2\\)`,
            answer: ekRounded,
            answerTex: `${ekRounded} \\text{ J}`,
            options: [],
            hintTex: [
                `E_k = \\tfrac{1}{2}mv^2`,
                `E_k = \\tfrac{1}{2} \\times ${m} \\times ${v}^2 = \\tfrac{1}{2} \\times ${m} \\times ${v * v}`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(E_k = \\tfrac{1}{2}mv^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(m = ${m}\\) kg and \\(v = ${v}\\) m s\\(^{-1}\\):<br>` +
                     `\\(E_k = \\tfrac{1}{2} \\times ${m} \\times (${v})^2 = \\tfrac{1}{2} \\times ${m} \\times ${v * v}\\)<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(E_k = ${ekRounded}\\) J.`
        };
    },

    /**
     * 2. qGPE - Easy
     * Given mass and height, find gravitational PE = mgh.
     */
    qGPE() {
        const g = 9.81;
        const scenarios = [
            { label: 'A skier', m: MathUtils.randInt(60, 90), h: MathUtils.randInt(50, 300) },
            { label: 'A satellite component', m: MathUtils.randInt(100, 500), h: MathUtils.randInt(200, 1000) },
            { label: 'A roller-coaster car', m: MathUtils.randInt(500, 1500), h: MathUtils.randInt(10, 60) },
            { label: 'A bag of cement', m: MathUtils.randInt(20, 50), h: MathUtils.randInt(2, 10) },
            { label: 'A rock climber', m: MathUtils.randInt(60, 85), h: MathUtils.randInt(30, 200) }
        ];
        const sc = MathUtils.pick(scenarios);
        const m = sc.m;
        const h = sc.h;
        const ep = m * g * h;
        const epRounded = parseFloat(ep.toPrecision(3));

        return {
            type: 'free',
            rule: 'Gravitational PE',
            difficulty: 'easy',
            text: `${sc.label} of mass \\(${m}\\) kg is raised to a height of \\(${h}\\) m above the ground.<br>Calculate the gravitational potential energy gained. Give your answer in J to 3 s.f. (use \\(g = 9.81\\) m s\\(^{-2}\\)).`,
            latex: `\\(E_p = mgh\\)`,
            answer: epRounded,
            answerTex: `${epRounded} \\text{ J}`,
            options: [],
            hintTex: [
                `E_p = mgh`,
                `E_p = ${m} \\times 9.81 \\times ${h}`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(E_p = mgh\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute values: \\(E_p = ${m} \\times 9.81 \\times ${h}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(E_p = ${epRounded}\\) J.`
        };
    },

    /**
     * 3. qConservation - Medium
     * Object falls from rest at height h; find speed at bottom via energy conservation.
     */
    qConservation() {
        const g = 9.81;
        const scenarios = [
            { label: 'A coconut', h: MathUtils.randInt(5, 25) },
            { label: 'A ball bearing', h: MathUtils.randInt(1, 10) },
            { label: 'A skydiver in freefall (ignoring air resistance)', h: MathUtils.randInt(100, 800) },
            { label: 'A pebble dropped off a cliff', h: MathUtils.randInt(20, 80) },
            { label: 'A roller-coaster car from the top of a loop', h: MathUtils.randInt(15, 50) }
        ];
        const sc = MathUtils.pick(scenarios);
        const h = sc.h;
        const vSq = 2 * g * h;
        const v = Math.sqrt(vSq);
        const vRounded = parseFloat(v.toPrecision(3));

        return {
            type: 'free',
            rule: 'Energy Conservation',
            difficulty: 'medium',
            text: `${sc.label} starts from rest and falls through a vertical height of \\(${h}\\) m.<br>Assuming no air resistance, use conservation of energy to find the speed at the bottom. Give your answer in m s\\(^{-1}\\) to 3 s.f.`,
            latex: `\\(\\tfrac{1}{2}mv^2 = mgh\\)`,
            answer: vRounded,
            answerTex: `${vRounded} \\text{ m s}^{-1}`,
            options: [],
            hintTex: [
                `\\text{Set } E_k = E_p: \\quad \\tfrac{1}{2}mv^2 = mgh`,
                `v^2 = 2gh = 2 \\times 9.81 \\times ${h} = ${vSq.toFixed(2)}, \\quad v = \\sqrt{${vSq.toFixed(2)}}`
            ],
            explain: `<strong>Step 1:</strong> By conservation of energy, all GPE converts to KE:<br>` +
                     `\\(\\tfrac{1}{2}mv^2 = mgh\\)<br><br>` +
                     `<strong>Step 2:</strong> The mass cancels: \\(v^2 = 2gh\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(v^2 = 2 \\times 9.81 \\times ${h} = ${vSq.toFixed(2)}\\) m\\(^2\\) s\\(^{-2}\\).<br><br>` +
                     `<strong>Step 4:</strong> Take the square root: \\(v = \\sqrt{${vSq.toFixed(2)}} = ${vRounded}\\) m s\\(^{-1}\\).`
        };
    },

    /**
     * 4. qWork - Medium
     * Given F (N), d (m), and angle theta, find W = Fd cos(theta).
     */
    qWork() {
        const angles = [0, 30, 45, 60];
        const cosVals = [1, Math.sqrt(3) / 2, Math.SQRT2 / 2, 0.5];
        const cosTeX  = ['1', '\\tfrac{\\sqrt{3}}{2}', '\\tfrac{\\sqrt{2}}{2}', '\\tfrac{1}{2}'];
        const idx = MathUtils.randInt(0, 3);
        const theta = angles[idx];
        const cosT = cosVals[idx];

        const scenarios = [
            { label: 'A person pushing a lawnmower', F: MathUtils.randInt(40, 120), d: MathUtils.randInt(10, 50) },
            { label: 'A tractor pulling a plough', F: MathUtils.randInt(2000, 8000), d: MathUtils.randInt(50, 200) },
            { label: 'An astronaut pulling a cable', F: MathUtils.randInt(100, 400), d: MathUtils.randInt(5, 20) },
            { label: 'A child pulling a toy on a string', F: MathUtils.randInt(5, 20), d: MathUtils.randInt(2, 10) }
        ];
        const sc = MathUtils.pick(scenarios);
        const F = sc.F;
        const d = sc.d;
        const W = F * d * cosT;
        const WRounded = parseFloat(W.toPrecision(3));

        return {
            type: 'free',
            rule: 'Work Done',
            difficulty: 'medium',
            text: `${sc.label} applies a force of \\(${F}\\) N at an angle of \\(${theta}°\\) to the horizontal over a distance of \\(${d}\\) m.<br>Calculate the work done. Give your answer in J to 3 s.f.`,
            latex: `\\(W = Fd\\cos\\theta\\)`,
            answer: WRounded,
            answerTex: `${WRounded} \\text{ J}`,
            options: [],
            hintTex: [
                `W = Fd\\cos\\theta \\quad \\text{where } \\theta = ${theta}°`,
                `\\cos ${theta}° = ${cosTeX[idx]}, \\quad W = ${F} \\times ${d} \\times ${cosTeX[idx]}`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(W = Fd\\cos\\theta\\).<br><br>` +
                     `<strong>Step 2:</strong> Find the cosine: \\(\\cos ${theta}° = ${cosTeX[idx]}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(W = ${F} \\times ${d} \\times ${cosTeX[idx]}\\).<br><br>` +
                     `<strong>Step 4:</strong> Calculate: \\(W = ${WRounded}\\) J.`
        };
    },

    /**
     * 5. qPower - Easy
     * Either P = W/t or P = Fv.
     */
    qPower() {
        const useFv = MathUtils.randInt(0, 1) === 1;

        if (useFv) {
            const scenarios = [
                { label: 'A car engine', F: MathUtils.randInt(2000, 6000), v: MathUtils.randInt(20, 40) },
                { label: 'A cyclist', F: MathUtils.randInt(80, 200), v: MathUtils.randInt(5, 12) },
                { label: 'A motorboat', F: MathUtils.randInt(500, 2000), v: MathUtils.randInt(8, 20) },
                { label: 'A rocket thruster', F: MathUtils.randInt(50000, 200000), v: MathUtils.randInt(500, 2000) }
            ];
            const sc = MathUtils.pick(scenarios);
            const F = sc.F;
            const v = sc.v;
            const P = F * v;
            const PRounded = parseFloat(P.toPrecision(3));

            return {
                type: 'free',
                rule: 'Power (P = Fv)',
                difficulty: 'easy',
                text: `${sc.label} exerts a driving force of \\(${F}\\) N while travelling at a constant velocity of \\(${v}\\) m s\\(^{-1}\\).<br>Calculate the output power. Give your answer in W to 3 s.f.`,
                latex: `\\(P = Fv\\)`,
                answer: PRounded,
                answerTex: `${PRounded} \\text{ W}`,
                options: [],
                hintTex: [
                    `P = Fv`,
                    `P = ${F} \\times ${v}`
                ],
                explain: `<strong>Step 1:</strong> At constant velocity, all driving force goes into doing work against resistance.<br><br>` +
                         `<strong>Step 2:</strong> Use \\(P = Fv\\).<br><br>` +
                         `<strong>Step 3:</strong> Substitute: \\(P = ${F} \\times ${v} = ${PRounded}\\) W.`
            };
        } else {
            const scenarios = [
                { label: 'An electric motor', W: MathUtils.randInt(500, 5000) * 10, t: MathUtils.randInt(10, 120) },
                { label: 'A wind turbine', W: MathUtils.randInt(1000, 5000) * 1000, t: MathUtils.randInt(60, 3600) },
                { label: 'A student climbing stairs', W: MathUtils.randInt(3000, 8000), t: MathUtils.randInt(10, 60) },
                { label: 'A crane lifting a load', W: MathUtils.randInt(10000, 80000), t: MathUtils.randInt(30, 300) }
            ];
            const sc = MathUtils.pick(scenarios);
            const W = sc.W;
            const t = sc.t;
            const P = W / t;
            const PRounded = parseFloat(P.toPrecision(3));

            return {
                type: 'free',
                rule: 'Power (P = W/t)',
                difficulty: 'easy',
                text: `${sc.label} does \\(${W}\\) J of work in \\(${t}\\) s.<br>Calculate the power output. Give your answer in W to 3 s.f.`,
                latex: `\\(P = \\dfrac{W}{t}\\)`,
                answer: PRounded,
                answerTex: `${PRounded} \\text{ W}`,
                options: [],
                hintTex: [
                    `P = \\frac{W}{t}`,
                    `P = \\frac{${W}}{${t}}`
                ],
                explain: `<strong>Step 1:</strong> Write the formula: \\(P = \\dfrac{W}{t}\\).<br><br>` +
                         `<strong>Step 2:</strong> Substitute: \\(P = \\dfrac{${W}}{${t}}\\).<br><br>` +
                         `<strong>Step 3:</strong> Calculate: \\(P = ${PRounded}\\) W.`
            };
        }
    },

    /**
     * 6. qEfficiency - Medium
     * Given input power and useful output power, find efficiency %.
     */
    qEfficiency() {
        const scenarios = [
            { label: 'An electric kettle', Pin: MathUtils.randInt(2000, 3000) },
            { label: 'A petrol car engine', Pin: MathUtils.randInt(50000, 150000) },
            { label: 'A solar panel', Pin: MathUtils.randInt(500, 2000) },
            { label: 'A fluorescent light bulb', Pin: MathUtils.randInt(15, 40) },
            { label: 'A hydroelectric generator', Pin: MathUtils.randInt(500000, 2000000) }
        ];
        const sc = MathUtils.pick(scenarios);
        const Pin = sc.Pin;
        // Pick a realistic efficiency
        const effPct = MathUtils.randInt(30, 90);
        const Pout = parseFloat((Pin * effPct / 100).toPrecision(3));
        const effCalc = parseFloat(((Pout / Pin) * 100).toPrecision(3));

        return {
            type: 'free',
            rule: 'Efficiency',
            difficulty: 'medium',
            text: `${sc.label} has an input power of \\(${Pin}\\) W and produces a useful output power of \\(${Pout}\\) W.<br>Calculate the efficiency as a percentage. Give your answer to 3 s.f.`,
            latex: `\\(\\eta = \\dfrac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\%\\)`,
            answer: effCalc,
            answerTex: `${effCalc}\\%`,
            options: [],
            hintTex: [
                `\\eta = \\frac{P_{\\text{useful}}}{P_{\\text{input}}} \\times 100\\%`,
                `\\eta = \\frac{${Pout}}{${Pin}} \\times 100\\%`
            ],
            explain: `<strong>Step 1:</strong> Write the efficiency formula: \\(\\eta = \\dfrac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\%\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\eta = \\dfrac{${Pout}}{${Pin}} \\times 100\\%\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(\\eta = ${effCalc}\\%\\).`
        };
    },

    /**
     * 7. qProjectileEnergy - Hard
     * Ball thrown upward with speed u; find max height using KE = GPE.
     */
    qProjectileEnergy() {
        const g = 9.81;
        const scenarios = [
            { label: 'A basketball', u: MathUtils.randInt(6, 15) },
            { label: 'A tennis ball hit vertically', u: MathUtils.randInt(20, 40) },
            { label: 'A cannon ball fired straight up', u: MathUtils.randInt(50, 120) },
            { label: 'A javelin thrown straight up', u: MathUtils.randInt(10, 25) }
        ];
        const sc = MathUtils.pick(scenarios);
        const u = sc.u;
        const hMax = (u * u) / (2 * g);
        const hRounded = parseFloat(hMax.toPrecision(3));

        return {
            type: 'free',
            rule: 'Projectile Energy',
            difficulty: 'hard',
            text: `${sc.label} is launched vertically upward with an initial speed of \\(${u}\\) m s\\(^{-1}\\).<br>Using conservation of energy, find the maximum height reached. Give your answer in m to 3 s.f. (\\(g = 9.81\\) m s\\(^{-2}\\)).`,
            latex: `\\(\\tfrac{1}{2}mu^2 = mgh_{\\max}\\)`,
            answer: hRounded,
            answerTex: `${hRounded} \\text{ m}`,
            options: [],
            hintTex: [
                `\\text{At max height, all KE has become GPE: } \\tfrac{1}{2}mu^2 = mgh_{\\max}`,
                `h_{\\max} = \\frac{u^2}{2g} = \\frac{${u}^2}{2 \\times 9.81} = \\frac{${u * u}}{19.62}`
            ],
            explain: `<strong>Step 1:</strong> At maximum height, the object is momentarily at rest, so all initial KE has converted to GPE:<br>` +
                     `\\(\\tfrac{1}{2}mu^2 = mgh_{\\max}\\).<br><br>` +
                     `<strong>Step 2:</strong> The mass cancels: \\(h_{\\max} = \\dfrac{u^2}{2g}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(h_{\\max} = \\dfrac{${u}^2}{2 \\times 9.81} = \\dfrac{${u * u}}{19.62}\\).<br><br>` +
                     `<strong>Step 4:</strong> Calculate: \\(h_{\\max} = ${hRounded}\\) m.`
        };
    },

    /**
     * 8. qSpringKE - Hard
     * Spring releases; given k and extension x, find speed of mass m: ½kx² = ½mv².
     */
    qSpringKE() {
        const ks = [50, 80, 100, 200, 500, 1000];
        const k = MathUtils.pick(ks);
        const x = MathUtils.randInt(2, 15) / 100; // 2-15 cm in metres
        const m = MathUtils.randInt(100, 800) / 1000; // 100-800 g in kg

        const vSq = (k * x * x) / m;
        const v = Math.sqrt(vSq);
        const vRounded = parseFloat(v.toPrecision(3));
        const xCm = Math.round(x * 100);

        return {
            type: 'free',
            rule: 'Spring to KE',
            difficulty: 'hard',
            text: `A spring with spring constant \\(k = ${k}\\) N m\\(^{-1}\\) is compressed by \\(${xCm}\\) cm and then releases a mass of \\(${m * 1000}\\) g from rest on a frictionless surface.<br>Find the speed of the mass as it leaves the spring. Give your answer in m s\\(^{-1}\\) to 3 s.f.`,
            latex: `\\(\\tfrac{1}{2}kx^2 = \\tfrac{1}{2}mv^2\\)`,
            answer: vRounded,
            answerTex: `${vRounded} \\text{ m s}^{-1}`,
            options: [],
            hintTex: [
                `\\text{Elastic PE} = \\text{KE}: \\quad \\tfrac{1}{2}kx^2 = \\tfrac{1}{2}mv^2`,
                `v^2 = \\frac{kx^2}{m} = \\frac{${k} \\times (${x})^2}{${m}}, \\quad v = \\sqrt{v^2}`
            ],
            explain: `<strong>Step 1:</strong> Convert units: \\(x = ${xCm}\\) cm \\(= ${x}\\) m, \\(m = ${m * 1000}\\) g \\(= ${m}\\) kg.<br><br>` +
                     `<strong>Step 2:</strong> Energy conservation - elastic PE converts entirely to KE:<br>` +
                     `\\(\\tfrac{1}{2}kx^2 = \\tfrac{1}{2}mv^2\\).<br><br>` +
                     `<strong>Step 3:</strong> Cancel \\(\\tfrac{1}{2}\\) and rearrange: \\(v^2 = \\dfrac{kx^2}{m} = \\dfrac{${k} \\times ${x}^2}{${m}} = \\dfrac{${(k * x * x).toFixed(4)}}{${m}}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(v = \\sqrt{${vSq.toFixed(4)}} = ${vRounded}\\) m s\\(^{-1}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => PHYS_ENERGY.qKineticEnergy(),    weight: 2, diff: 'easy'   },
            { fn: () => PHYS_ENERGY.qGPE(),              weight: 2, diff: 'easy'   },
            { fn: () => PHYS_ENERGY.qConservation(),     weight: 2, diff: 'medium' },
            { fn: () => PHYS_ENERGY.qWork(),             weight: 2, diff: 'medium' },
            { fn: () => PHYS_ENERGY.qPower(),            weight: 2, diff: 'easy'   },
            { fn: () => PHYS_ENERGY.qEfficiency(),       weight: 2, diff: 'medium' },
            { fn: () => PHYS_ENERGY.qProjectileEnergy(), weight: 1, diff: 'hard'   },
            { fn: () => PHYS_ENERGY.qSpringKE(),         weight: 1, diff: 'hard'   }
        ];

        let filtered = pool;
        if (PHYS_ENERGY.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (PHYS_ENERGY.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (PHYS_ENERGY.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

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
        PHYS_ENERGY.score = 0;
        PHYS_ENERGY.total = 0;
        PHYS_ENERGY.streak = 0;
        PHYS_ENERGY.answered = false;
        PHYS_ENERGY.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PHYS_ENERGY.unload()">Topic A: Space, Time and Motion</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Work, Energy and Power</h1>
                <p>IB Physics A.3 - KE, GPE, conservation of energy, power, efficiency</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="PHYS_ENERGY.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="PHYS_ENERGY.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="PHYS_ENERGY.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="PHYS_ENERGY.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="pe-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="pe-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="pe-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="pe-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="pe-rule"></span>
                <span class="difficulty-tag" id="pe-difficulty"></span>
                <div class="question-text" id="pe-text"></div>
                <div class="question-prompt" id="pe-latex"></div>
                <div id="pe-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="pe-hint-box"></div>
            <div class="feedback" id="pe-feedback">
                <div class="feedback-title" id="pe-feedback-title"></div>
                <div class="feedback-explanation" id="pe-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="pe-hint-btn" onclick="PHYS_ENERGY.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pe-next-btn" onclick="PHYS_ENERGY.next()" style="display:none;">Next Question</button>
            </div>
        `;

        PHYS_ENERGY.next();
    },

    /* ────────────────────────────────────────────
       UI: unload()
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('topic-a');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        PHYS_ENERGY.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        PHYS_ENERGY.score = 0;
        PHYS_ENERGY.total = 0;
        PHYS_ENERGY.streak = 0;
        PHYS_ENERGY.updateStats();
        PHYS_ENERGY.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        PHYS_ENERGY.answered = false;
        PHYS_ENERGY.hintIndex = 0;
        PHYS_ENERGY.currentQ = PHYS_ENERGY.pickQuestion();
        const q = PHYS_ENERGY.currentQ;

        const ruleEl = document.getElementById('pe-rule');
        ruleEl.textContent = q.rule;

        const diffEl = document.getElementById('pe-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        document.getElementById('pe-text').innerHTML = q.text;
        document.getElementById('pe-latex').innerHTML = q.latex;

        const optArea = document.getElementById('pe-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="PHYS_ENERGY.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="pe-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')PHYS_ENERGY.checkFree()">
                    <button class="btn btn-primary" onclick="PHYS_ENERGY.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => { const inp = document.getElementById('pe-input'); if (inp) inp.focus(); }, 100);
        }

        const hintBox = document.getElementById('pe-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('pe-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('pe-next-btn').style.display = 'none';
        document.getElementById('pe-hint-btn').style.display = '';
        document.getElementById('pe-hint-btn').disabled = false;

        PHYS_ENERGY.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = PHYS_ENERGY.currentQ;
        if (!q || !q.hintTex || PHYS_ENERGY.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('pe-hint-box');
        const hintContent = PHYS_ENERGY.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[PHYS_ENERGY.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        PHYS_ENERGY.hintIndex++;

        if (PHYS_ENERGY.hintIndex >= q.hintTex.length) {
            document.getElementById('pe-hint-btn').disabled = true;
        }
        PHYS_ENERGY.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (PHYS_ENERGY.answered) return;
        PHYS_ENERGY.answered = true;
        PHYS_ENERGY.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });

        if (isCorrect) {
            btn.classList.add('correct');
            PHYS_ENERGY.score++;
            PHYS_ENERGY.streak++;
        } else {
            btn.classList.add('incorrect');
            PHYS_ENERGY.streak = 0;
        }

        PHYS_ENERGY.showFeedback(isCorrect);
        PHYS_ENERGY.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (PHYS_ENERGY.answered) return;
        const inp = document.getElementById('pe-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        PHYS_ENERGY.answered = true;
        PHYS_ENERGY.total++;
        inp.disabled = true;

        const q = PHYS_ENERGY.currentQ;
        const isCorrect = Math.abs(val - q.answer) <= Math.abs(q.answer * 0.01) + 0.01;

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            PHYS_ENERGY.score++;
            PHYS_ENERGY.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            PHYS_ENERGY.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        PHYS_ENERGY.showFeedback(isCorrect);
        PHYS_ENERGY.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = PHYS_ENERGY.currentQ;
        const fb = document.getElementById('pe-feedback');
        const title = document.getElementById('pe-feedback-title');
        const explanation = document.getElementById('pe-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = PHYS_ENERGY.streak > 1 ? `Correct! (${PHYS_ENERGY.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('pe-next-btn').style.display = '';
        document.getElementById('pe-hint-btn').style.display = 'none';

        PHYS_ENERGY.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('pe-score');
        const totalEl  = document.getElementById('pe-total');
        const streakEl = document.getElementById('pe-streak');
        const accEl    = document.getElementById('pe-accuracy');

        if (scoreEl)  scoreEl.textContent  = PHYS_ENERGY.score;
        if (totalEl)  totalEl.textContent  = PHYS_ENERGY.total;
        if (streakEl) streakEl.textContent = PHYS_ENERGY.streak;
        if (accEl)    accEl.textContent    = PHYS_ENERGY.total > 0 ? Math.round((PHYS_ENERGY.score / PHYS_ENERGY.total) * 100) + '%' : '-';
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['energy-power'] = () => PHYS_ENERGY.load();
