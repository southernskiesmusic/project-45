/* ================================================================
   ACTIVITY: Ideal Gas Law (IB Chemistry 1.5)
   ================================================================ */
const CHEM_GAS = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    R: 8.31,       // J mol-1 K-1
    MV_STP: 22.7,  // L/mol at STP (IB 2023)
    T0: 273,       // 0 degrees C in K

    /* ═══════════════════════════════════════════════
       GENERATOR 1 - Find n from pV=nRT
       ═══════════════════════════════════════════════ */
    qIdealGas_n() {
        const p = MathUtils.pick([100000, 200000, 101325, 150000]);  // Pa
        const V = MathUtils.pick([0.001, 0.002, 0.005, 0.010, 0.020]);  // m3
        const T = MathUtils.pick([273, 298, 300, 350, 400]);  // K
        const n = parseFloat((p * V / (this.R * T)).toFixed(4));
        const pkPa = p / 1000;
        const Vl = V * 1000;
        return {
            type: 'free',
            rule: 'Ideal Gas Law',
            difficulty: 'medium',
            text: `A gas occupies \\(${Vl}\\) L at a pressure of \\(${pkPa}\\) kPa and a temperature of \\(${T}\\) K. Calculate the number of moles of gas. (\\(R = 8.31\\text{ J mol}^{-1}\\text{K}^{-1}\\))`,
            answer: n,
            answerTex: `n = ${n}\\text{ mol}`,
            options: [],
            hintTex: [
                'Rearrange \\(pV = nRT\\) to give \\(n = \\dfrac{pV}{RT}\\).',
                `Convert units: \\(p = ${pkPa} \\times 10^3 = ${p}\\text{ Pa}\\), \\(V = ${Vl} \\times 10^{-3} = ${V}\\text{ m}^3\\).`,
                `\\(n = \\dfrac{${p} \\times ${V}}{8.31 \\times ${T}} = ${n}\\text{ mol}\\)`
            ],
            explain: `Using \\(n = \\dfrac{pV}{RT} = \\dfrac{${p} \\times ${V}}{8.31 \\times ${T}} = ${n}\\text{ mol}\\). Remember to convert kPa to Pa and L to m\\(^3\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 2 - Find V
       ═══════════════════════════════════════════════ */
    qIdealGas_V() {
        const n = MathUtils.pick([0.5, 1.0, 1.5, 2.0, 0.25]);
        const T = MathUtils.pick([273, 298, 300, 350]);
        const p = MathUtils.pick([100000, 101325, 200000]);
        const V = parseFloat((n * this.R * T / p).toFixed(4));
        const Vl = parseFloat((V * 1000).toFixed(2));
        const pkPa = p / 1000;
        return {
            type: 'free',
            rule: 'Ideal Gas Law',
            difficulty: 'medium',
            text: `Calculate the volume (in litres) occupied by \\(${n}\\) mol of an ideal gas at \\(${T}\\) K and \\(${pkPa}\\) kPa.`,
            answer: Vl,
            answerTex: `V = ${Vl}\\text{ L}`,
            options: [],
            hintTex: [
                'Rearrange \\(pV = nRT\\) to give \\(V = \\dfrac{nRT}{p}\\).',
                `Convert: \\(p = ${p}\\text{ Pa}\\). Calculate \\(V\\) in m\\(^3\\), then multiply by 1000 for litres.`,
                `\\(V = \\dfrac{${n} \\times 8.31 \\times ${T}}{${p}} = ${V}\\text{ m}^3 = ${Vl}\\text{ L}\\)`
            ],
            explain: `\\(V = \\dfrac{nRT}{p} = \\dfrac{${n} \\times 8.31 \\times ${T}}{${p}} = ${V}\\text{ m}^3 = ${Vl}\\text{ L}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 3 - Find T
       ═══════════════════════════════════════════════ */
    qIdealGas_T() {
        const n = MathUtils.pick([0.5, 1.0, 2.0, 1.5]);
        const p = MathUtils.pick([100000, 200000, 101325]);
        const Vl = MathUtils.pick([5, 10, 15, 20, 25]);
        const V = Vl / 1000;
        const T = parseFloat((p * V / (n * this.R)).toFixed(1));
        const pkPa = p / 1000;
        return {
            type: 'free',
            rule: 'Ideal Gas Law',
            difficulty: 'medium',
            text: `\\(${n}\\) mol of gas at \\(${pkPa}\\) kPa occupies \\(${Vl}\\) L. Calculate the temperature in kelvin.`,
            answer: T,
            answerTex: `T = ${T}\\text{ K}`,
            options: [],
            hintTex: [
                'Rearrange \\(pV = nRT\\) to give \\(T = \\dfrac{pV}{nR}\\).',
                `Convert: \\(p = ${p}\\text{ Pa}\\), \\(V = ${V}\\text{ m}^3\\).`,
                `\\(T = \\dfrac{${p} \\times ${V}}{${n} \\times 8.31} = ${T}\\text{ K}\\)`
            ],
            explain: `\\(T = \\dfrac{pV}{nR} = \\dfrac{${p} \\times ${V}}{${n} \\times 8.31} = ${T}\\text{ K}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 4 - Molar Volume at STP
       ═══════════════════════════════════════════════ */
    qMolarVolume() {
        const gases = [
            { name:'oxygen (O\\(_2\\))', M:32 },
            { name:'carbon dioxide (CO\\(_2\\))', M:44 },
            { name:'hydrogen (H\\(_2\\))', M:2 },
            { name:'nitrogen (N\\(_2\\))', M:28 },
            { name:'methane (CH\\(_4\\))', M:16 },
            { name:'chlorine (Cl\\(_2\\))', M:71 },
        ];
        const gas = MathUtils.pick(gases);
        const massOptions = [gas.M, gas.M * 2, gas.M / 2, gas.M * 3];
        const mass = MathUtils.pick(massOptions);
        const n = parseFloat((mass / gas.M).toFixed(4));
        const V = parseFloat((n * this.MV_STP).toFixed(2));
        return {
            type: 'free',
            rule: 'Molar Volume (STP)',
            difficulty: 'easy',
            text: `Calculate the volume (in litres) occupied by \\(${mass}\\) g of ${gas.name} at STP. (Molar volume at STP = 22.7 L mol\\(^{-1}\\))`,
            answer: V,
            answerTex: `V = ${V}\\text{ L}`,
            options: [],
            hintTex: [
                `First find moles: \\(n = \\dfrac{m}{M} = \\dfrac{${mass}}{${gas.M}}\\)`,
                `Then use \\(V = n \\times 22.7\\text{ L mol}^{-1}\\) at STP.`,
                `\\(n = ${n}\\text{ mol}, V = ${n} \\times 22.7 = ${V}\\text{ L}\\)`
            ],
            explain: `\\(n = \\dfrac{${mass}}{${gas.M}} = ${n}\\text{ mol}\\). At STP: \\(V = ${n} \\times 22.7 = ${V}\\text{ L}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 5 - Density of Gas at STP
       ═══════════════════════════════════════════════ */
    qDensityGas() {
        const gases = [
            { name:'O\\(_2\\)', M:32 },
            { name:'CO\\(_2\\)', M:44 },
            { name:'N\\(_2\\)', M:28 },
            { name:'CH\\(_4\\)', M:16 },
            { name:'Cl\\(_2\\)', M:71 },
            { name:'SO\\(_2\\)', M:64 },
        ];
        const gas = MathUtils.pick(gases);
        const density = parseFloat((gas.M / this.MV_STP).toFixed(3));
        return {
            type: 'free',
            rule: 'Gas Density',
            difficulty: 'medium',
            text: `Calculate the density (g L\\(^{-1}\\)) of ${gas.name} at STP. (Molar volume at STP = 22.7 L mol\\(^{-1}\\), \\(M(${gas.name.replace(/\\\(/g,'').replace(/\\\)/g,'')}) = ${gas.M}\\text{ g mol}^{-1}\\))`,
            answer: density,
            answerTex: `\\rho = ${density}\\text{ g L}^{-1}`,
            options: [],
            hintTex: [
                'Density of a gas = molar mass / molar volume.',
                `\\(\\rho = \\dfrac{M}{V_m} = \\dfrac{${gas.M}}{22.7}\\)`,
                `\\(\\rho = ${density}\\text{ g L}^{-1}\\)`
            ],
            explain: `At STP, \\(\\rho = \\dfrac{M}{V_m} = \\dfrac{${gas.M}}{22.7} = ${density}\\text{ g L}^{-1}\\). Density of a gas increases with molar mass.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 6 - Dalton's Law (Gas Mixture)
       ═══════════════════════════════════════════════ */
    qGasMixture() {
        const p1 = MathUtils.randInt(20, 80) * 1000;  // Pa
        const p2 = MathUtils.randInt(20, 80) * 1000;
        const ptotal = p1 + p2;
        const p1kPa = p1 / 1000;
        const p2kPa = p2 / 1000;
        const ptotalKPa = ptotal / 1000;
        const gases = [['N\\(_2\\)','O\\(_2\\)'],['H\\(_2\\)','He'],['CO\\(_2\\)','N\\(_2\\)'],['Ar','O\\(_2\\)']];
        const [gA, gB] = MathUtils.pick(gases);
        return {
            type: 'free',
            rule: "Dalton's Law",
            difficulty: 'easy',
            text: `A mixture of ${gA} and ${gB} exerts a partial pressure of \\(${p1kPa}\\) kPa (${gA}) and \\(${p2kPa}\\) kPa (${gB}). Calculate the total pressure in kPa.`,
            answer: ptotalKPa,
            answerTex: `p_{\\text{total}} = ${ptotalKPa}\\text{ kPa}`,
            options: [],
            hintTex: [
                "Dalton's law of partial pressures: \\(p_{\\text{total}} = p_1 + p_2 + \\ldots\\)",
                `\\(p_{\\text{total}} = ${p1kPa} + ${p2kPa}\\)`,
                `\\(p_{\\text{total}} = ${ptotalKPa}\\text{ kPa}\\)`
            ],
            explain: `By Dalton's law: \\(p_{\\text{total}} = p_{${gA.replace(/\\\(/g,'').replace(/\\\)/g,'')}} + p_{${gB.replace(/\\\(/g,'').replace(/\\\)/g,'')}} = ${p1kPa} + ${p2kPa} = ${ptotalKPa}\\text{ kPa}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       ENGINE
       ═══════════════════════════════════════════════ */
    generators() {
        const all = [
            () => this.qIdealGas_n(),
            () => this.qIdealGas_V(),
            () => this.qIdealGas_T(),
            () => this.qMolarVolume(),
            () => this.qDensityGas(),
            () => this.qGasMixture(),
        ];
        if (this.level === 'all') return all;
        const map = { easy:[3,5], medium:[0,1,2,4], hard:[] };
        return (map[this.level] || []).map(i => all[i]);
    },

    setLevel(lvl) {
        this.level = lvl;
        document.querySelectorAll('#cgas-container .level-filter').forEach(b => b.classList.toggle('active', b.dataset.level === lvl));
        this.next();
    },

    next() {
        const gens = this.generators();
        if (!gens.length) return;
        this.currentQ = MathUtils.pick(gens)();
        this.answered = false;
        this.hintIdx = 0;
        this.render();
    },

    render() {
        const q = this.currentQ;
        document.getElementById('cgas-rule').textContent = q.rule;
        document.getElementById('cgas-difficulty').textContent = q.difficulty;
        document.getElementById('cgas-text').innerHTML = q.text;
        document.getElementById('cgas-hint-box').innerHTML = '';
        document.getElementById('cgas-hint-box').style.display = 'none';
        const fb = document.getElementById('cgas-feedback');
        fb.className = 'feedback'; fb.style.display = 'none';
        document.getElementById('cgas-next-btn').style.display = 'none';
        document.getElementById('cgas-hint-btn').style.display = '';
        const area = document.getElementById('cgas-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="btn btn-option" onclick="CHEM_GAS.submitMC(${i})">${o}</button>`
            ).join('');
            if (window.MathJax) MathJax.typesetPromise([area]);
        } else {
            area.innerHTML = `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="cgas-input" class="answer-input" placeholder="Your answer" step="any" onkeydown="if(event.key==='Enter')CHEM_GAS.submitFree()">
                <button class="btn btn-primary" onclick="CHEM_GAS.submitFree()">Check</button>
            </div>`;
        }
        if (window.MathJax) MathJax.typesetPromise([document.getElementById('cgas-text')]);
    },

    submitFree() {
        if (this.answered) return;
        const inp = document.getElementById('cgas-input');
        const userVal = parseFloat(inp.value);
        if (isNaN(userVal)) return;
        const ans = this.currentQ.answer;
        const correct = Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        this.handleResult(correct);
    },

    submitMC(idx) {
        if (this.answered) return;
        const correct = idx === this.currentQ.correctIndex;
        document.querySelectorAll('#cgas-options-area .btn-option').forEach((b, i) => {
            b.disabled = true;
            if (i === this.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !correct) b.classList.add('incorrect');
        });
        this.handleResult(correct);
    },

    handleResult(correct) {
        this.answered = true;
        this.total++;
        if (correct) { this.score++; this.streak++; } else { this.streak = 0; }
        const acc = Math.round(this.score / this.total * 100);
        document.getElementById('cgas-score').textContent = this.score;
        document.getElementById('cgas-total').textContent = this.total;
        document.getElementById('cgas-streak').textContent = this.streak;
        document.getElementById('cgas-accuracy').textContent = acc + '%';
        const fb = document.getElementById('cgas-feedback');
        fb.style.display = '';
        fb.className = 'feedback ' + (correct ? 'correct' : 'incorrect');
        document.getElementById('cgas-feedback-title').textContent = correct ? 'Correct!' : 'Incorrect';
        document.getElementById('cgas-feedback-explanation').innerHTML = `<strong>Answer:</strong> \\(${this.currentQ.answerTex}\\)<br>${this.currentQ.explain}`;
        document.getElementById('cgas-hint-btn').style.display = 'none';
        document.getElementById('cgas-next-btn').style.display = '';
        if (window.MathJax) MathJax.typesetPromise([fb]);
        if (typeof ActivityLogger !== 'undefined') ActivityLogger.log('ideal-gas-chem', correct);
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('cgas-hint-box');
        box.style.display = '';
        box.innerHTML = `<strong>Hint ${this.hintIdx + 1}:</strong> \\(${q.hintTex[this.hintIdx]}\\)`;
        this.hintIdx++;
        if (window.MathJax) MathJax.typesetPromise([box]);
    },

    unload() {
        if (typeof showView === 'function') showView('topic-1');
    },

    load() {
        const container = document.getElementById('cgas-container') || document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="CHEM_GAS.unload()">Topic 1: Models of Particulate Matter</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Ideal Gas Law</h1><p>IB Chemistry 1.5 - pV=nRT, molar volume, partial pressure</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CHEM_GAS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CHEM_GAS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CHEM_GAS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CHEM_GAS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="cgas-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="cgas-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="cgas-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="cgas-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="cgas-rule"></span>
                <span class="difficulty-tag" id="cgas-difficulty"></span>
                <div class="question-text" id="cgas-text"></div>
                <div id="cgas-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="cgas-hint-box" style="display:none;"></div>
            <div class="feedback" id="cgas-feedback" style="display:none;">
                <div class="feedback-title" id="cgas-feedback-title"></div>
                <div class="feedback-explanation" id="cgas-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cgas-hint-btn" onclick="CHEM_GAS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cgas-next-btn" onclick="CHEM_GAS.next()" style="display:none;">Next Question</button>
            </div>
        `;
        this.score = 0; this.total = 0; this.streak = 0; this.level = 'all';
        this.next();
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['ideal-gas-chem'] = () => CHEM_GAS.load();
