/* ================================================================
   ACTIVITY: Kinetics (IB Chemistry 5.2)
   ================================================================ */
const CHEM_KINETICS = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    R: 8.31,  // J mol-1 K-1

    /* ═══════════════════════════════════════════════
       GENERATOR 1 - Rate of Reaction
       ═══════════════════════════════════════════════ */
    qRateCalc() {
        const dC = MathUtils.pick([0.10, 0.20, 0.30, 0.40, 0.50, 0.05, 0.15]);
        const dt = MathUtils.pick([10, 20, 30, 50, 100, 25]);
        const rate = parseFloat((dC / dt).toFixed(6));
        const species = MathUtils.pick(['A', 'B', 'C', 'X']);
        return {
            type: 'free',
            rule: 'Rate of Reaction',
            difficulty: 'easy',
            text: `The concentration of reactant ${species} decreases from \\(${dC + 0.5}\\) mol dm\\(^{-3}\\) to \\(${0.5}\\) mol dm\\(^{-3}\\) in \\(${dt}\\) s. Calculate the average rate of reaction in mol dm\\(^{-3}\\) s\\(^{-1}\\).`,
            answer: rate,
            answerTex: `\\text{rate} = ${rate}\\text{ mol dm}^{-3}\\text{s}^{-1}`,
            options: [],
            hintTex: [
                'Rate = change in concentration / time interval.',
                `\\(\\text{rate} = \\dfrac{\\Delta[${species}]}{\\Delta t} = \\dfrac{${dC}}{${dt}}\\)`,
                `\\(\\text{rate} = ${rate}\\text{ mol dm}^{-3}\\text{s}^{-1}\\)`
            ],
            explain: `\\(\\text{rate} = \\dfrac{\\Delta[${species}]}{\\Delta t} = \\dfrac{${dC}}{${dt}} = ${rate}\\text{ mol dm}^{-3}\\text{s}^{-1}\\). Rate is always positive, so we use the magnitude of the concentration change.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 2 - Half-Life
       ═══════════════════════════════════════════════ */
    qHalfLife() {
        const t_half = MathUtils.pick([10, 20, 30, 50, 100]);  // s
        const n_halflives = MathUtils.pick([1, 2, 3, 4]);
        const c0 = MathUtils.pick([0.80, 1.00, 0.40, 0.60, 1.20]);
        const cn = parseFloat((c0 * Math.pow(0.5, n_halflives)).toFixed(6));
        const totalTime = t_half * n_halflives;
        return {
            type: 'free',
            rule: 'Half-Life',
            difficulty: 'medium',
            text: `A first-order reaction has a half-life of \\(${t_half}\\) s. If the initial concentration of reactant is \\(${c0}\\) mol dm\\(^{-3}\\), what is the concentration after \\(${totalTime}\\) s?`,
            answer: cn,
            answerTex: `[A] = ${cn}\\text{ mol dm}^{-3}`,
            options: [],
            hintTex: [
                `How many half-lives have elapsed? \\(${totalTime} \\div ${t_half} = ${n_halflives}\\) half-lives.`,
                `After each half-life, concentration is halved: \\([A]_n = [A]_0 \\times \\left(\\dfrac{1}{2}\\right)^n\\)`,
                `\\([A] = ${c0} \\times \\left(\\dfrac{1}{2}\\right)^{${n_halflives}} = ${cn}\\text{ mol dm}^{-3}\\)`
            ],
            explain: `In \\(${totalTime}\\) s, \\(${n_halflives}\\) half-lives pass. \\([A] = ${c0} \\times \\left(\\dfrac{1}{2}\\right)^{${n_halflives}} = ${cn}\\text{ mol dm}^{-3}\\). For first-order reactions, the half-life is constant regardless of concentration.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 3 - Arrhenius Equation (Ea)
       ═══════════════════════════════════════════════ */
    qArrheniusEa() {
        // ln(k2/k1) = Ea/R × (1/T1 - 1/T2)
        const T1 = MathUtils.pick([300, 310, 298, 320]);
        const T2 = T1 + MathUtils.pick([10, 20, 30]);
        // Use a realistic Ea to back-calculate ln(k2/k1)
        const Ea = MathUtils.pick([50000, 60000, 80000, 75000, 40000]);  // J/mol
        const lnRatio = parseFloat((Ea / this.R * (1/T1 - 1/T2)).toFixed(4));
        const Ea_kJ = Ea / 1000;
        return {
            type: 'free',
            rule: 'Arrhenius Equation',
            difficulty: 'hard',
            text: `For a reaction, \\(\\ln\\left(\\dfrac{k_2}{k_1}\\right) = ${lnRatio.toFixed(3)}\\) when the temperature changes from \\(${T1}\\) K to \\(${T2}\\) K. Calculate the activation energy \\(E_a\\) in kJ mol\\(^{-1}\\). (\\(R = 8.31\\text{ J mol}^{-1}\\text{K}^{-1}\\))`,
            answer: Ea_kJ,
            answerTex: `E_a = ${Ea_kJ}\\text{ kJ mol}^{-1}`,
            options: [],
            hintTex: [
                'Use the Arrhenius two-temperature equation: \\(\\ln\\dfrac{k_2}{k_1} = \\dfrac{E_a}{R}\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)\\)',
                `Rearrange: \\(E_a = \\dfrac{\\ln(k_2/k_1)}{\\left(\\dfrac{1}{T_1} - \\dfrac{1}{T_2}\\right)} \\times R\\)`,
                `\\(E_a = \\dfrac{${lnRatio.toFixed(3)}}{(1/${T1} - 1/${T2})} \\times 8.31 = ${Ea}\\text{ J mol}^{-1} = ${Ea_kJ}\\text{ kJ mol}^{-1}\\)`
            ],
            explain: `Rearranging: \\(E_a = \\dfrac{\\ln(k_2/k_1) \\times R}{(1/T_1 - 1/T_2)} = \\dfrac{${lnRatio.toFixed(3)} \\times 8.31}{(1/${T1} - 1/${T2})} = ${Ea}\\text{ J mol}^{-1} = ${Ea_kJ}\\text{ kJ mol}^{-1}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 4 - Rate Law and Order (MC)
       ═══════════════════════════════════════════════ */
    qRateLaw() {
        const orders = [
            {
                order: 'first', factor: 2, effect: 'doubles',
                text: 'For a first-order reaction \\(A \\rightarrow \\text{products}\\), if \\([A]\\) is doubled, the rate:',
                options: ['Doubles', 'Quadruples', 'Stays the same', 'Increases by a factor of 8'],
                correctIndex: 0,
                explain: 'For first-order reactions, rate \\(\\propto [A]^1\\). Doubling \\([A]\\) doubles the rate.'
            },
            {
                order: 'second', factor: 2, effect: 'quadruples',
                text: 'For a second-order reaction \\(A \\rightarrow \\text{products}\\), if \\([A]\\) is doubled, the rate:',
                options: ['Doubles', 'Quadruples', 'Stays the same', 'Increases by a factor of 8'],
                correctIndex: 1,
                explain: 'For second-order reactions, rate \\(\\propto [A]^2\\). Doubling \\([A]\\) gives \\((2)^2 = 4\\times\\) the rate (quadruples).'
            },
            {
                order: 'zero', factor: 2, effect: 'stays the same',
                text: 'For a zero-order reaction \\(A \\rightarrow \\text{products}\\), if \\([A]\\) is doubled, the rate:',
                options: ['Doubles', 'Quadruples', 'Stays the same', 'Halves'],
                correctIndex: 2,
                explain: 'For zero-order reactions, rate \\(\\propto [A]^0 = k\\). The rate is independent of concentration.'
            },
        ];
        const r = MathUtils.pick(orders);
        return {
            type: 'mc',
            rule: 'Rate Law',
            difficulty: 'medium',
            text: r.text,
            answer: r.correctIndex,
            answerTex: r.options[r.correctIndex],
            options: r.options,
            correctIndex: r.correctIndex,
            hintTex: [
                'The rate law is \\(\\text{rate} = k[A]^n\\) where \\(n\\) is the order.',
                'If \\([A]\\) is multiplied by a factor \\(f\\), the rate is multiplied by \\(f^n\\).',
                `For a ${r.order}-order reaction, the new rate = old rate \\(\\times \\,(${r.factor})^{\\text{order}}\\).`
            ],
            explain: r.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 5 - Activation Energy Concept (MC)
       ═══════════════════════════════════════════════ */
    qActivationEnergy() {
        return {
            type: 'mc',
            rule: 'Activation Energy',
            difficulty: 'easy',
            text: 'Which of the following factors does <strong>NOT</strong> affect the activation energy of a reaction?',
            answer: 0,
            answerTex: 'Concentration of reactants',
            options: [
                'Concentration of reactants',
                'Nature of the reactants',
                'Presence of a catalyst',
                'Type of bonds broken'
            ],
            correctIndex: 0,
            hintTex: [
                'Activation energy is the minimum energy needed for a collision to be successful.',
                'It is a fixed property of a given reaction under given conditions.',
                'Catalysts provide an alternative pathway with lower \\(E_a\\). Concentration does not change \\(E_a\\).'
            ],
            explain: 'Activation energy is determined by the energy of the transition state - it depends on the nature of the reactants, bonds involved, and presence of a catalyst (which provides an alternative lower-energy pathway). Concentration affects how frequently collisions occur but does NOT change \\(E_a\\).'
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 6 - Order from Data (MC)
       ═══════════════════════════════════════════════ */
    qOrderFromData() {
        const scenarios = [
            {
                text: 'From the data table below, determine the order with respect to A:<br><br>' +
                      '<table class="data-table"><tr><th>Experiment</th><th>[A] / mol dm\\(^{-3}\\)</th><th>Rate / mol dm\\(^{-3}\\) s\\(^{-1}\\)</th></tr>' +
                      '<tr><td>1</td><td>0.10</td><td>2.0 \\(\\times 10^{-3}\\)</td></tr>' +
                      '<tr><td>2</td><td>0.20</td><td>4.0 \\(\\times 10^{-3}\\)</td></tr></table>',
                options: ['Zero order', 'First order', 'Second order', 'Third order'],
                correctIndex: 1,
                explain: 'When \\([A]\\) doubles (0.10 to 0.20), the rate doubles (2.0 to 4.0 \\(\\times 10^{-3}\\)). Rate \\(\\propto [A]^1\\), so the reaction is first order with respect to A.'
            },
            {
                text: 'From the data table below, determine the order with respect to A:<br><br>' +
                      '<table class="data-table"><tr><th>Experiment</th><th>[A] / mol dm\\(^{-3}\\)</th><th>Rate / mol dm\\(^{-3}\\) s\\(^{-1}\\)</th></tr>' +
                      '<tr><td>1</td><td>0.10</td><td>1.0 \\(\\times 10^{-4}\\)</td></tr>' +
                      '<tr><td>2</td><td>0.20</td><td>4.0 \\(\\times 10^{-4}\\)</td></tr></table>',
                options: ['Zero order', 'First order', 'Second order', 'Third order'],
                correctIndex: 2,
                explain: 'When \\([A]\\) doubles, the rate quadruples (\\(1.0 \\to 4.0 \\times 10^{-4}\\)). Rate \\(\\propto [A]^2\\), so the reaction is second order with respect to A.'
            },
            {
                text: 'From the data table below, determine the order with respect to A:<br><br>' +
                      '<table class="data-table"><tr><th>Experiment</th><th>[A] / mol dm\\(^{-3}\\)</th><th>Rate / mol dm\\(^{-3}\\) s\\(^{-1}\\)</th></tr>' +
                      '<tr><td>1</td><td>0.10</td><td>5.0 \\(\\times 10^{-3}\\)</td></tr>' +
                      '<tr><td>2</td><td>0.20</td><td>5.0 \\(\\times 10^{-3}\\)</td></tr></table>',
                options: ['Zero order', 'First order', 'Second order', 'Third order'],
                correctIndex: 0,
                explain: 'When \\([A]\\) doubles, the rate stays the same. Rate is independent of \\([A]\\), so the reaction is zero order with respect to A.'
            },
        ];
        const s = MathUtils.pick(scenarios);
        return {
            type: 'mc',
            rule: 'Order from Data',
            difficulty: 'hard',
            text: s.text,
            answer: s.correctIndex,
            answerTex: s.options[s.correctIndex],
            options: s.options,
            correctIndex: s.correctIndex,
            hintTex: [
                'Compare two experiments where only \\([A]\\) changes.',
                'Calculate: \\(\\text{rate ratio} = \\left(\\dfrac{[A]_2}{[A]_1}\\right)^n\\)',
                'If rate doubles when \\([A]\\) doubles: first order. Quadruples: second order. No change: zero order.'
            ],
            explain: s.explain
        };
    },

    /* ═══════════════════════════════════════════════
       ENGINE
       ═══════════════════════════════════════════════ */
    generators() {
        const all = [
            () => this.qRateCalc(),
            () => this.qHalfLife(),
            () => this.qArrheniusEa(),
            () => this.qRateLaw(),
            () => this.qActivationEnergy(),
            () => this.qOrderFromData(),
        ];
        if (this.level === 'all') return all;
        const map = { easy:[0,4], medium:[1,3], hard:[2,5] };
        return (map[this.level] || []).map(i => all[i]);
    },

    setLevel(lvl) {
        this.level = lvl;
        document.querySelectorAll('#ckin-container .level-filter').forEach(b => b.classList.toggle('active', b.dataset.level === lvl));
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
        document.getElementById('ckin-rule').textContent = q.rule;
        document.getElementById('ckin-difficulty').textContent = q.difficulty;
        document.getElementById('ckin-text').innerHTML = q.text;
        document.getElementById('ckin-hint-box').innerHTML = '';
        document.getElementById('ckin-hint-box').style.display = 'none';
        const fb = document.getElementById('ckin-feedback');
        fb.className = 'feedback'; fb.style.display = 'none';
        document.getElementById('ckin-next-btn').style.display = 'none';
        document.getElementById('ckin-hint-btn').style.display = '';
        const area = document.getElementById('ckin-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="btn btn-option" onclick="CHEM_KINETICS.submitMC(${i})">${o}</button>`
            ).join('');
            if (window.MathJax) MathJax.typesetPromise([area]);
        } else {
            area.innerHTML = `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="ckin-input" class="answer-input" placeholder="Your answer" step="any" onkeydown="if(event.key==='Enter')CHEM_KINETICS.submitFree()">
                <button class="btn btn-primary" onclick="CHEM_KINETICS.submitFree()">Check</button>
            </div>`;
        }
        if (window.MathJax) MathJax.typesetPromise([document.getElementById('ckin-text')]);
    },

    submitFree() {
        if (this.answered) return;
        const inp = document.getElementById('ckin-input');
        const userVal = parseFloat(inp.value);
        if (isNaN(userVal)) return;
        const ans = this.currentQ.answer;
        const correct = Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        this.handleResult(correct);
    },

    submitMC(idx) {
        if (this.answered) return;
        const correct = idx === this.currentQ.correctIndex;
        document.querySelectorAll('#ckin-options-area .btn-option').forEach((b, i) => {
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
        document.getElementById('ckin-score').textContent = this.score;
        document.getElementById('ckin-total').textContent = this.total;
        document.getElementById('ckin-streak').textContent = this.streak;
        document.getElementById('ckin-accuracy').textContent = acc + '%';
        const fb = document.getElementById('ckin-feedback');
        fb.style.display = '';
        fb.className = 'feedback ' + (correct ? 'correct' : 'incorrect');
        document.getElementById('ckin-feedback-title').textContent = correct ? 'Correct!' : 'Incorrect';
        document.getElementById('ckin-feedback-explanation').innerHTML = `<strong>Answer:</strong> \\(${this.currentQ.answerTex}\\)<br>${this.currentQ.explain}`;
        document.getElementById('ckin-hint-btn').style.display = 'none';
        document.getElementById('ckin-next-btn').style.display = '';
        if (window.MathJax) MathJax.typesetPromise([fb]);
        if (typeof ActivityLogger !== 'undefined') ActivityLogger.log('kinetics', correct);
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('ckin-hint-box');
        box.style.display = '';
        box.innerHTML = `<strong>Hint ${this.hintIdx + 1}:</strong> ${q.hintTex[this.hintIdx]}`;
        this.hintIdx++;
        if (window.MathJax) MathJax.typesetPromise([box]);
    },

    unload() {
        if (typeof showView === 'function') showView('topic-5');
    },

    load() {
        const container = document.getElementById('ckin-container') || document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="CHEM_KINETICS.unload()">Topic 5: How Much, How Fast and How Far?</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Kinetics</h1><p>IB Chemistry 5.2 - Rate of reaction, factors affecting rate, Arrhenius equation</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CHEM_KINETICS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CHEM_KINETICS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CHEM_KINETICS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CHEM_KINETICS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="ckin-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="ckin-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="ckin-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="ckin-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="ckin-rule"></span>
                <span class="difficulty-tag" id="ckin-difficulty"></span>
                <div class="question-text" id="ckin-text"></div>
                <div id="ckin-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="ckin-hint-box" style="display:none;"></div>
            <div class="feedback" id="ckin-feedback" style="display:none;">
                <div class="feedback-title" id="ckin-feedback-title"></div>
                <div class="feedback-explanation" id="ckin-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="ckin-hint-btn" onclick="CHEM_KINETICS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="ckin-next-btn" onclick="CHEM_KINETICS.next()" style="display:none;">Next Question</button>
            </div>
        `;
        this.score = 0; this.total = 0; this.streak = 0; this.level = 'all';
        this.next();
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['kinetics'] = () => CHEM_KINETICS.load();
