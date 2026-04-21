/* ================================================================
   ACTIVITY: Energetics (IB Chemistry 4.1)
   ================================================================ */
const CHEM_ENERGETICS = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    /* ═══════════════════════════════════════════════
       GENERATOR 1 - Calorimetry q = mcΔT
       ═══════════════════════════════════════════════ */
    qCalorimetry() {
        const m = MathUtils.pick([50, 100, 150, 200, 250]);   // g water
        const dT = MathUtils.pick([3, 5, 8, 10, 12, 15, 20]);  // K
        const c = 4.18;
        const q = parseFloat((m * c * dT).toFixed(1));
        return {
            type: 'free',
            rule: 'Calorimetry',
            difficulty: 'easy',
            text: `When a reaction occurs in \\(${m}\\) g of water, the temperature rises by \\(${dT}\\) K. Calculate the heat released (J). (\\(c_{\\text{water}} = 4.18\\text{ J g}^{-1}\\text{K}^{-1}\\))`,
            answer: q,
            answerTex: `q = ${q}\\text{ J}`,
            options: [],
            hintTex: [
                'Use \\(q = mc\\Delta T\\).',
                `Substitute: \\(q = ${m} \\times 4.18 \\times ${dT}\\)`,
                `\\(q = ${q}\\text{ J}\\)`
            ],
            explain: `\\(q = mc\\Delta T = ${m} \\times 4.18 \\times ${dT} = ${q}\\text{ J}\\). A positive \\(q\\) means heat is absorbed by the water, so the reaction is exothermic.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 2 - Enthalpy Change ΔH = -q/n
       ═══════════════════════════════════════════════ */
    qEnthalpy() {
        const q_kJ = MathUtils.pick([2, 4, 6, 8, 10, 12, 15, 20]);  // kJ released
        const n = MathUtils.pick([0.1, 0.2, 0.25, 0.5, 1.0]);
        const dH = parseFloat((-q_kJ / n).toFixed(1));  // kJ/mol (negative = exo)
        return {
            type: 'free',
            rule: 'Enthalpy Change',
            difficulty: 'medium',
            text: `A reaction releases \\(${q_kJ}\\) kJ of heat when \\(${n}\\) mol of substance reacts. Calculate \\(\\Delta H\\) in kJ mol\\(^{-1}\\).`,
            answer: dH,
            answerTex: `\\Delta H = ${dH}\\text{ kJ mol}^{-1}`,
            options: [],
            hintTex: [
                'Use \\(\\Delta H = -\\dfrac{q}{n}\\) (negative because heat is released TO the surroundings).',
                `\\(\\Delta H = -\\dfrac{${q_kJ}}{${n}}\\)`,
                `\\(\\Delta H = ${dH}\\text{ kJ mol}^{-1}\\)`
            ],
            explain: `\\(\\Delta H = -\\dfrac{q}{n} = -\\dfrac{${q_kJ}}{${n}} = ${dH}\\text{ kJ mol}^{-1}\\). The negative sign indicates an exothermic reaction.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 3 - Hess's Law (MC)
       ═══════════════════════════════════════════════ */
    qHess() {
        const questions = [
            {
                text: 'Given: (1) \\(\\text{C} + \\text{O}_2 \\rightarrow \\text{CO}_2\\), \\(\\Delta H_1 = -394\\text{ kJ mol}^{-1}\\)<br>(2) \\(\\text{CO} + \\frac{1}{2}\\text{O}_2 \\rightarrow \\text{CO}_2\\), \\(\\Delta H_2 = -283\\text{ kJ mol}^{-1}\\)<br>Find \\(\\Delta H\\) for: \\(\\text{C} + \\frac{1}{2}\\text{O}_2 \\rightarrow \\text{CO}\\)',
                correct: '-111 kJ mol\\(^{-1}\\)',
                options: ['-111 kJ mol\\(^{-1}\\)', '-677 kJ mol\\(^{-1}\\)', '+111 kJ mol\\(^{-1}\\)', '-283 kJ mol\\(^{-1}\\)'],
                correctIndex: 0,
                explain: 'Target = (1) - (2): \\(\\Delta H = -394 - (-283) = -394 + 283 = -111\\text{ kJ mol}^{-1}\\).'
            },
            {
                text: 'Given: (1) \\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}\\), \\(\\Delta H_1 = -572\\text{ kJ mol}^{-1}\\)<br>(2) \\(\\text{H}_2\\text{O}(l) \\rightarrow \\text{H}_2\\text{O}(g)\\), \\(\\Delta H_2 = +44\\text{ kJ mol}^{-1}\\)<br>Find \\(\\Delta H\\) for: \\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}(g)\\)',
                correct: '-484 kJ mol\\(^{-1}\\)',
                options: ['-484 kJ mol\\(^{-1}\\)', '-616 kJ mol\\(^{-1}\\)', '-528 kJ mol\\(^{-1}\\)', '+484 kJ mol\\(^{-1}\\)'],
                correctIndex: 0,
                explain: 'Use equation (1) and add 2 x (2): \\(\\Delta H = -572 + 2(+44) = -572 + 88 = -484\\text{ kJ mol}^{-1}\\).'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: "Hess's Law",
            difficulty: 'hard',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.correct,
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                "Hess's law: \\(\\Delta H\\) is path-independent - only the initial and final states matter.",
                'Arrange the given equations so they sum to give the target equation. Reverse equations and change sign of \\(\\Delta H\\) as needed.',
                'Check: when you add the equations, intermediate species cancel.'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 4 - Bond Enthalpy
       ═══════════════════════════════════════════════ */
    qBondEnthalpy() {
        // H2 + Cl2 -> 2HCl: ΔH = (436 + 243) - (2×432) = 679 - 864 = -185 kJ/mol
        // H2 + F2 -> 2HF: ΔH = (436 + 158) - (2×568) = 594 - 1136 = -542 kJ/mol
        const reactions = [
            {
                text: 'Using bond enthalpies, calculate \\(\\Delta H\\) for: \\(\\text{H}_2 + \\text{Cl}_2 \\rightarrow 2\\text{HCl}\\)<br>Bond enthalpies (kJ mol\\(^{-1}\\)): H-H = 436, Cl-Cl = 243, H-Cl = 432',
                broken: 436 + 243, formed: 2 * 432,
                answer: (436 + 243) - (2 * 432),
                explain: '\\(\\Delta H = \\text{bonds broken} - \\text{bonds formed} = (436 + 243) - (2 \\times 432) = 679 - 864 = -185\\text{ kJ mol}^{-1}\\).'
            },
            {
                text: 'Using bond enthalpies, calculate \\(\\Delta H\\) for: \\(\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3\\)<br>Bond enthalpies (kJ mol\\(^{-1}\\)): N≡N = 945, H-H = 436, N-H = 391',
                broken: 945 + 3 * 436, formed: 2 * 3 * 391,
                answer: (945 + 3 * 436) - (2 * 3 * 391),
                explain: '\\(\\Delta H = (945 + 3 \\times 436) - (6 \\times 391) = (945 + 1308) - 2346 = 2253 - 2346 = -93\\text{ kJ mol}^{-1}\\).'
            },
        ];
        const r = MathUtils.pick(reactions);
        const dH = r.answer;
        return {
            type: 'free',
            rule: 'Bond Enthalpy',
            difficulty: 'hard',
            text: r.text,
            answer: dH,
            answerTex: `\\Delta H = ${dH}\\text{ kJ mol}^{-1}`,
            options: [],
            hintTex: [
                'Use \\(\\Delta H = \\sum \\text{bonds broken} - \\sum \\text{bonds formed}\\).',
                `Energy to break bonds = \\(${r.broken}\\) kJ mol\\(^{-1}\\); energy released forming bonds = \\(${r.formed}\\) kJ mol\\(^{-1}\\).`,
                `\\(\\Delta H = ${r.broken} - ${r.formed} = ${dH}\\text{ kJ mol}^{-1}\\)`
            ],
            explain: r.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 5 - Exo/Endothermic Identification (MC)
       ═══════════════════════════════════════════════ */
    qExothermic() {
        const reactions = [
            { dH: -286, name:'combustion of hydrogen', answer: 'Exothermic', correctIndex: 0 },
            { dH: +6, name:'melting of ice', answer: 'Endothermic', correctIndex: 1 },
            { dH: -890, name:'combustion of methane', answer: 'Exothermic', correctIndex: 0 },
            { dH: +178, name:'decomposition of calcium carbonate', answer: 'Endothermic', correctIndex: 1 },
            { dH: -44, name:'condensation of steam', answer: 'Exothermic', correctIndex: 0 },
        ];
        const r = MathUtils.pick(reactions);
        return {
            type: 'mc',
            rule: 'Exo/Endothermic',
            difficulty: 'easy',
            text: `The ${r.name} has \\(\\Delta H = ${r.dH}\\text{ kJ mol}^{-1}\\). Is this reaction exothermic or endothermic?`,
            answer: r.correctIndex,
            answerTex: r.answer,
            options: ['Exothermic', 'Endothermic'],
            correctIndex: r.correctIndex,
            hintTex: [
                'If \\(\\Delta H < 0\\), the reaction is exothermic (heat released).',
                'If \\(\\Delta H > 0\\), the reaction is endothermic (heat absorbed).',
                `\\(\\Delta H = ${r.dH}\\) - is this positive or negative?`
            ],
            explain: `\\(\\Delta H = ${r.dH}\\text{ kJ mol}^{-1}\\). Since \\(\\Delta H ${r.dH < 0 ? '<' : '>'} 0\\), this reaction is ${r.answer.toLowerCase()}.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 6 - Temperature Change from Dissolution
       ═══════════════════════════════════════════════ */
    qTemperatureChange() {
        // ΔT = q/(mc); q = n × |ΔH|; but ΔH sign determines heating/cooling
        const substances = [
            { name:'NH\\(_4\\)NO\\(_3\\)', M:80, dH:+25.69, type:'endothermic' },
            { name:'NaOH', M:40, dH:-44.51, type:'exothermic' },
            { name:'KNO\\(_3\\)', M:101, dH:+34.9, type:'endothermic' },
        ];
        const s = MathUtils.pick(substances);
        const mass_solute = MathUtils.pick([4, 8, 10, 2]);
        const mass_water = MathUtils.pick([100, 200, 50]);
        const n = parseFloat((mass_solute / s.M).toFixed(4));
        const q = Math.abs(n * s.dH * 1000); // J
        const dT = parseFloat((q / (mass_water * 4.18)).toFixed(2));
        const direction = s.dH < 0 ? 'increases' : 'decreases';
        return {
            type: 'free',
            rule: 'Temperature Change',
            difficulty: 'medium',
            text: `\\(${mass_solute}\\) g of ${s.name} (\\(M = ${s.M}\\text{ g mol}^{-1}\\)) dissolves in \\(${mass_water}\\) g of water. \\(\\Delta H_{\\text{sol}} = ${s.dH}\\text{ kJ mol}^{-1}\\). By how many K does the temperature change? (\\(c = 4.18\\text{ J g}^{-1}\\text{K}^{-1}\\))`,
            answer: dT,
            answerTex: `|\\Delta T| = ${dT}\\text{ K}`,
            options: [],
            hintTex: [
                `Find moles: \\(n = ${mass_solute}/${s.M} = ${n}\\text{ mol}\\)`,
                `Find heat: \\(q = n \\times |\\Delta H| = ${n} \\times ${Math.abs(s.dH)} \\times 1000 = ${parseFloat(q.toFixed(1))}\\text{ J}\\)`,
                `Then \\(\\Delta T = \\dfrac{q}{mc} = \\dfrac{${parseFloat(q.toFixed(1))}}{${mass_water} \\times 4.18} = ${dT}\\text{ K}\\). Temperature ${direction}.`
            ],
            explain: `\\(n = \\dfrac{${mass_solute}}{${s.M}} = ${n}\\text{ mol}\\). \\(q = ${n} \\times ${Math.abs(s.dH)} \\times 1000 = ${parseFloat(q.toFixed(1))}\\text{ J}\\). \\(\\Delta T = \\dfrac{${parseFloat(q.toFixed(1))}}{${mass_water} \\times 4.18} = ${dT}\\text{ K}\\). Since \\(\\Delta H_{\\text{sol}} = ${s.dH}\\text{ kJ mol}^{-1}\\), dissolution is ${s.type} and temperature ${direction}.`
        };
    },

    /* ═══════════════════════════════════════════════
       ENGINE
       ═══════════════════════════════════════════════ */
    generators() {
        const all = [
            () => this.qCalorimetry(),
            () => this.qEnthalpy(),
            () => this.qHess(),
            () => this.qBondEnthalpy(),
            () => this.qExothermic(),
            () => this.qTemperatureChange(),
        ];
        if (this.level === 'all') return all;
        const map = { easy:[0,4], medium:[1,5], hard:[2,3] };
        return (map[this.level] || []).map(i => all[i]);
    },

    setLevel(lvl) {
        this.level = lvl;
        document.querySelectorAll('#cener-container .level-filter').forEach(b => b.classList.toggle('active', b.dataset.level === lvl));
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
        document.getElementById('cener-rule').textContent = q.rule;
        document.getElementById('cener-difficulty').textContent = q.difficulty;
        document.getElementById('cener-text').innerHTML = q.text;
        document.getElementById('cener-hint-box').innerHTML = '';
        document.getElementById('cener-hint-box').style.display = 'none';
        const fb = document.getElementById('cener-feedback');
        fb.className = 'feedback'; fb.style.display = 'none';
        document.getElementById('cener-next-btn').style.display = 'none';
        document.getElementById('cener-hint-btn').style.display = '';
        const area = document.getElementById('cener-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="btn btn-option" onclick="CHEM_ENERGETICS.submitMC(${i})">${o}</button>`
            ).join('');
            if (window.MathJax) MathJax.typesetPromise([area]);
        } else {
            area.innerHTML = `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="cener-input" class="answer-input" placeholder="Your answer" step="any" onkeydown="if(event.key==='Enter')CHEM_ENERGETICS.submitFree()">
                <button class="btn btn-primary" onclick="CHEM_ENERGETICS.submitFree()">Check</button>
            </div>`;
        }
        if (window.MathJax) MathJax.typesetPromise([document.getElementById('cener-text')]);
    },

    submitFree() {
        if (this.answered) return;
        const inp = document.getElementById('cener-input');
        const userVal = parseFloat(inp.value);
        if (isNaN(userVal)) return;
        const ans = this.currentQ.answer;
        const correct = Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        this.handleResult(correct);
    },

    submitMC(idx) {
        if (this.answered) return;
        const correct = idx === this.currentQ.correctIndex;
        document.querySelectorAll('#cener-options-area .btn-option').forEach((b, i) => {
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
        document.getElementById('cener-score').textContent = this.score;
        document.getElementById('cener-total').textContent = this.total;
        document.getElementById('cener-streak').textContent = this.streak;
        document.getElementById('cener-accuracy').textContent = acc + '%';
        const fb = document.getElementById('cener-feedback');
        fb.style.display = '';
        fb.className = 'feedback ' + (correct ? 'correct' : 'incorrect');
        document.getElementById('cener-feedback-title').textContent = correct ? 'Correct!' : 'Incorrect';
        document.getElementById('cener-feedback-explanation').innerHTML = `<strong>Answer:</strong> \\(${this.currentQ.answerTex}\\)<br>${this.currentQ.explain}`;
        document.getElementById('cener-hint-btn').style.display = 'none';
        document.getElementById('cener-next-btn').style.display = '';
        if (window.MathJax) MathJax.typesetPromise([fb]);
        if (typeof ActivityLogger !== 'undefined') ActivityLogger.log('energetics', correct);
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('cener-hint-box');
        box.style.display = '';
        box.innerHTML = `<strong>Hint ${this.hintIdx + 1}:</strong> \\(${q.hintTex[this.hintIdx]}\\)`;
        this.hintIdx++;
        if (window.MathJax) MathJax.typesetPromise([box]);
    },

    unload() {
        if (typeof showView === 'function') showView('topic-4');
    },

    load() {
        const container = document.getElementById('cener-container') || document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="CHEM_ENERGETICS.unload()">Topic 4: What Drives Chemical Reactions?</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Energetics</h1><p>IB Chemistry 4.1 - Enthalpy changes, calorimetry, Hess's law, bond enthalpy</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CHEM_ENERGETICS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CHEM_ENERGETICS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CHEM_ENERGETICS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CHEM_ENERGETICS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="cener-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="cener-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="cener-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="cener-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="cener-rule"></span>
                <span class="difficulty-tag" id="cener-difficulty"></span>
                <div class="question-text" id="cener-text"></div>
                <div id="cener-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="cener-hint-box" style="display:none;"></div>
            <div class="feedback" id="cener-feedback" style="display:none;">
                <div class="feedback-title" id="cener-feedback-title"></div>
                <div class="feedback-explanation" id="cener-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cener-hint-btn" onclick="CHEM_ENERGETICS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cener-next-btn" onclick="CHEM_ENERGETICS.next()" style="display:none;">Next Question</button>
            </div>
        `;
        this.score = 0; this.total = 0; this.streak = 0; this.level = 'all';
        this.next();
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['energetics'] = () => CHEM_ENERGETICS.load();
