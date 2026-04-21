/* ================================================================
   ACTIVITY: Stoichiometry (IB Chemistry 1.4)
   ================================================================ */
const CHEM_STOICH = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    // Molar masses (g/mol)
    M: { H:1, C:12, N:14, O:16, Na:23, Cl:35.5, Ca:40, Fe:56, Cu:63.5, S:32, Mg:24, Al:27 },

    /* ═══════════════════════════════════════════════
       GENERATOR 1 - Molar Mass
       ═══════════════════════════════════════════════ */
    qMolarMass() {
        const M = this.M;
        const compounds = [
            { formula:'H\\(_2\\)O',     name:'water',              mass: 2*M.H + M.O },
            { formula:'NaCl',           name:'sodium chloride',     mass: M.Na + M.Cl },
            { formula:'CaCO\\(_3\\)',   name:'calcium carbonate',   mass: M.Ca + M.C + 3*M.O },
            { formula:'H\\(_2\\)SO\\(_4\\)', name:'sulfuric acid', mass: 2*M.H + M.S + 4*M.O },
            { formula:'MgCl\\(_2\\)',   name:'magnesium chloride',  mass: M.Mg + 2*M.Cl },
            { formula:'Al\\(_2\\)O\\(_3\\)', name:'aluminium oxide',mass: 2*M.Al + 3*M.O },
            { formula:'Fe\\(_2\\)O\\(_3\\)', name:'iron(III) oxide',mass: 2*M.Fe + 3*M.O },
            { formula:'NH\\(_3\\)',     name:'ammonia',             mass: M.N + 3*M.H },
        ];
        const c = MathUtils.pick(compounds);
        return {
            type: 'free',
            rule: 'Molar Mass',
            difficulty: 'easy',
            text: `Calculate the molar mass of ${c.name} (${c.formula}).`,
            answer: c.mass,
            answerTex: `M = ${c.mass}\\text{ g mol}^{-1}`,
            options: [],
            hintTex: [
                'Add up the relative atomic masses of all atoms in the formula.',
                'Multiply each element\'s atomic mass by the number of atoms, then sum.',
                `Answer: \\(M = ${c.mass}\\text{ g mol}^{-1}\\)`
            ],
            explain: `The molar mass is found by summing atomic masses: \\(M(${c.formula.replace(/\\\(/g,'').replace(/\\\)/g,'')}) = ${c.mass}\\text{ g mol}^{-1}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 2 - Moles to Grams
       ═══════════════════════════════════════════════ */
    qMolesToGrams() {
        const molarMasses = [18, 44, 58.5, 100, 98, 160, 24];
        const names = ['water (H\\(_2\\)O)', 'carbon dioxide (CO\\(_2\\))', 'sodium chloride (NaCl)',
                       'calcium carbonate (CaCO\\(_3\\))', 'sulfuric acid (H\\(_2\\)SO\\(_4\\))',
                       'copper(II) sulfate (CuSO\\(_4\\))', 'magnesium (Mg)'];
        const idx = MathUtils.randInt(0, molarMasses.length - 1);
        const M = molarMasses[idx];
        const name = names[idx];
        const n = MathUtils.pick([0.5, 1, 1.5, 2, 2.5, 3, 0.25]);
        const mass = parseFloat((n * M).toFixed(2));
        return {
            type: 'free',
            rule: 'Moles to Mass',
            difficulty: 'easy',
            text: `Calculate the mass of \\(${n}\\) mol of ${name}. Give your answer in grams.`,
            answer: mass,
            answerTex: `m = ${mass}\\text{ g}`,
            options: [],
            hintTex: [
                'Use the formula \\(m = n \\times M\\).',
                `\\(m = ${n} \\times ${M}\\)`,
                `\\(m = ${mass}\\text{ g}\\)`
            ],
            explain: `Using \\(m = n \\times M\\): \\(m = ${n} \\times ${M} = ${mass}\\text{ g}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 3 - Grams to Moles
       ═══════════════════════════════════════════════ */
    qGramsToMoles() {
        const data = [
            { name:'water (H\\(_2\\)O)', M:18, masses:[18,36,54,90,180] },
            { name:'NaCl', M:58.5, masses:[58.5,117,29.25,585] },
            { name:'CO\\(_2\\)', M:44, masses:[44,88,22,132,220] },
            { name:'CaCO\\(_3\\)', M:100, masses:[100,200,50,150,250] },
            { name:'Fe\\(_2\\)O\\(_3\\)', M:160, masses:[160,80,320,40] },
        ];
        const d = MathUtils.pick(data);
        const mass = MathUtils.pick(d.masses);
        const n = parseFloat((mass / d.M).toFixed(4));
        return {
            type: 'free',
            rule: 'Mass to Moles',
            difficulty: 'easy',
            text: `Calculate the number of moles in \\(${mass}\\) g of ${d.name}.`,
            answer: n,
            answerTex: `n = ${n}\\text{ mol}`,
            options: [],
            hintTex: [
                'Use the formula \\(n = \\dfrac{m}{M}\\).',
                `Molar mass of ${d.name} is \\(${d.M}\\text{ g mol}^{-1}\\).`,
                `\\(n = \\dfrac{${mass}}{${d.M}} = ${n}\\text{ mol}\\)`
            ],
            explain: `Using \\(n = \\dfrac{m}{M} = \\dfrac{${mass}}{${d.M}} = ${n}\\text{ mol}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 4 - Percentage Composition
       ═══════════════════════════════════════════════ */
    qPercentComposition() {
        const M = this.M;
        const compounds = [
            { formula:'H\\(_2\\)O', name:'water', element:'H', elementMass: 2*M.H, totalMass: 2*M.H+M.O },
            { formula:'CO\\(_2\\)', name:'carbon dioxide', element:'C', elementMass: M.C, totalMass: M.C+2*M.O },
            { formula:'NaCl', name:'sodium chloride', element:'Na', elementMass: M.Na, totalMass: M.Na+M.Cl },
            { formula:'CaCO\\(_3\\)', name:'calcium carbonate', element:'Ca', elementMass: M.Ca, totalMass: M.Ca+M.C+3*M.O },
            { formula:'H\\(_2\\)SO\\(_4\\)', name:'sulfuric acid', element:'S', elementMass: M.S, totalMass: 2*M.H+M.S+4*M.O },
            { formula:'Fe\\(_2\\)O\\(_3\\)', name:'iron(III) oxide', element:'Fe', elementMass: 2*M.Fe, totalMass: 2*M.Fe+3*M.O },
        ];
        const c = MathUtils.pick(compounds);
        const pct = parseFloat((c.elementMass / c.totalMass * 100).toFixed(2));
        return {
            type: 'free',
            rule: 'Percentage Composition',
            difficulty: 'medium',
            text: `Calculate the percentage by mass of ${c.element} in ${c.name} (${c.formula}). Give your answer to 2 decimal places.`,
            answer: pct,
            answerTex: `\\%${c.element} = ${pct}\\%`,
            options: [],
            hintTex: [
                `\\(\\% = \\dfrac{\\text{mass of element in formula}}{\\text{molar mass of compound}} \\times 100\\)`,
                `Molar mass of ${c.formula} = \\(${c.totalMass}\\text{ g mol}^{-1}\\); mass of ${c.element} in formula = \\(${c.elementMass}\\text{ g mol}^{-1}\\).`,
                `\\(\\% = \\dfrac{${c.elementMass}}{${c.totalMass}} \\times 100 = ${pct}\\%\\)`
            ],
            explain: `\\(\\% ${c.element} = \\dfrac{${c.elementMass}}{${c.totalMass}} \\times 100 = ${pct}\\%\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 5 - Empirical Formula (MC)
       ═══════════════════════════════════════════════ */
    qEmpiricalFormula() {
        const questions = [
            {
                text: 'A compound contains 40.0% C, 6.7% H, and 53.3% O by mass. What is its empirical formula?',
                correct: 'CH\\(_2\\)O',
                options: ['CH\\(_2\\)O', 'C\\(_2\\)H\\(_4\\)O\\(_2\\)', 'CHO', 'CH\\(_4\\)O'],
                correctIndex: 0,
                explain: 'Mole ratios: C = 40/12 = 3.33, H = 6.7/1 = 6.7, O = 53.3/16 = 3.33. Divide by smallest (3.33): C:H:O = 1:2:1. Empirical formula = CH\\(_2\\)O.'
            },
            {
                text: 'A compound contains 75.0% C and 25.0% H by mass. What is its empirical formula?',
                correct: 'CH\\(_4\\)',
                options: ['CH\\(_4\\)', 'CH\\(_3\\)', 'C\\(_2\\)H\\(_6\\)', 'CH\\(_2\\)'],
                correctIndex: 0,
                explain: 'Mole ratios: C = 75/12 = 6.25, H = 25/1 = 25. Divide by 6.25: C:H = 1:4. Empirical formula = CH\\(_4\\).'
            },
            {
                text: 'A compound contains 36.5% Na, 25.4% S, and 38.1% O. What is its empirical formula?',
                correct: 'Na\\(_2\\)SO\\(_3\\)',
                options: ['Na\\(_2\\)SO\\(_3\\)', 'NaSO\\(_3\\)', 'Na\\(_2\\)SO\\(_4\\)', 'NaSO\\(_2\\)'],
                correctIndex: 0,
                explain: 'Mole ratios: Na = 36.5/23 = 1.59, S = 25.4/32 = 0.79, O = 38.1/16 = 2.38. Divide by 0.79: Na:S:O = 2:1:3. Empirical formula = Na\\(_2\\)SO\\(_3\\).'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: 'Empirical Formula',
            difficulty: 'medium',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.correct,
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                'Assume 100 g of compound, so percentages = grams.',
                'Divide each mass by its molar mass to get moles.',
                'Divide all mole values by the smallest to get the simplest ratio.'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 6 - Stoichiometric Ratios
       ═══════════════════════════════════════════════ */
    qStoichRatio() {
        const reactions = [
            { eq:'N\\(_2\\) + 3H\\(_2\\) \\rightarrow 2NH\\(_3\\)', ratioAB: 3, reactant:'N\\(_2\\)', product:'H\\(_2\\)', coeffA:1, coeffB:3 },
            { eq:'2H\\(_2\\) + O\\(_2\\) \\rightarrow 2H\\(_2\\)O', ratioAB: 0.5, reactant:'H\\(_2\\)', product:'O\\(_2\\)', coeffA:2, coeffB:1 },
            { eq:'CH\\(_4\\) + 2O\\(_2\\) \\rightarrow CO\\(_2\\) + 2H\\(_2\\)O', ratioAB: 2, reactant:'CH\\(_4\\)', product:'O\\(_2\\)', coeffA:1, coeffB:2 },
            { eq:'2Al + 3Cl\\(_2\\) \\rightarrow 2AlCl\\(_3\\)', ratioAB: 1.5, reactant:'Al', product:'Cl\\(_2\\)', coeffA:2, coeffB:3 },
        ];
        const r = MathUtils.pick(reactions);
        const molesA = MathUtils.pick([1, 2, 3, 4, 0.5]);
        const molesB = parseFloat((molesA * r.ratioAB).toFixed(2));
        return {
            type: 'free',
            rule: 'Stoichiometric Ratios',
            difficulty: 'medium',
            text: `Consider the reaction: \\(${r.eq}\\). How many moles of ${r.product} are required to react completely with \\(${molesA}\\) mol of ${r.reactant}?`,
            answer: molesB,
            answerTex: `n(${r.product.replace(/\\\(/g,'').replace(/\\\)/g,'')}) = ${molesB}\\text{ mol}`,
            options: [],
            hintTex: [
                `Use the molar ratio from the balanced equation: ${r.reactant} : ${r.product} = ${r.coeffA} : ${r.coeffB}.`,
                `Scale up: \\(${molesA} \\times \\dfrac{${r.coeffB}}{${r.coeffA}}\\)`,
                `Answer = \\(${molesB}\\text{ mol}\\)`
            ],
            explain: `From the equation, the ratio of ${r.reactant} to ${r.product} is \\(${r.coeffA}:${r.coeffB}\\). So \\(${molesA}\\) mol ${r.reactant} reacts with \\(${molesA} \\times \\dfrac{${r.coeffB}}{${r.coeffA}} = ${molesB}\\) mol ${r.product}.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 7 - Limiting Reagent
       ═══════════════════════════════════════════════ */
    qLimitingReagent() {
        // N2 + 3H2 -> 2NH3
        const nN2 = MathUtils.pick([1, 2, 3, 1.5]);
        const nH2 = MathUtils.pick([2, 4, 6, 3]);
        // max NH3 from N2: 2*nN2; max NH3 from H2: (2/3)*nH2
        const fromN2 = 2 * nN2;
        const fromH2 = parseFloat(((2 / 3) * nH2).toFixed(4));
        const molesNH3 = parseFloat(Math.min(fromN2, fromH2).toFixed(4));
        const limiting = fromN2 <= fromH2 ? 'N\\(_2\\)' : 'H\\(_2\\)';
        return {
            type: 'free',
            rule: 'Limiting Reagent',
            difficulty: 'hard',
            text: `Consider: \\(\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3\\). If \\(${nN2}\\) mol N\\(_2\\) and \\(${nH2}\\) mol H\\(_2\\) are mixed, what is the maximum number of moles of NH\\(_3\\) produced?`,
            answer: molesNH3,
            answerTex: `n(\\text{NH}_3) = ${molesNH3}\\text{ mol}`,
            options: [],
            hintTex: [
                'Find how much product each reactant could produce if it were the limiting reagent.',
                `From N\\(_2\\): \\(${nN2} \\times 2 = ${fromN2}\\) mol NH\\(_3\\). From H\\(_2\\): \\(${nH2} \\times \\frac{2}{3} = ${fromH2}\\) mol NH\\(_3\\).`,
                `The limiting reagent is ${limiting}. Maximum NH\\(_3\\) = \\(${molesNH3}\\) mol.`
            ],
            explain: `From N\\(_2\\): max NH\\(_3\\) = \\(${nN2} \\times 2 = ${fromN2}\\) mol. From H\\(_2\\): max NH\\(_3\\) = \\(${nH2} \\times \\frac{2}{3} = ${fromH2}\\) mol. The limiting reagent is ${limiting}, so the answer is \\(${molesNH3}\\) mol NH\\(_3\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       ENGINE
       ═══════════════════════════════════════════════ */
    generators() {
        const all = [
            () => this.qMolarMass(),
            () => this.qMolesToGrams(),
            () => this.qGramsToMoles(),
            () => this.qPercentComposition(),
            () => this.qEmpiricalFormula(),
            () => this.qStoichRatio(),
            () => this.qLimitingReagent(),
        ];
        if (this.level === 'all') return all;
        const map = { easy:[0,1,2], medium:[3,4,5], hard:[6] };
        return (map[this.level] || []).map(i => all[i]);
    },

    setLevel(lvl) {
        this.level = lvl;
        document.querySelectorAll('#csto-container .level-filter').forEach(b => b.classList.toggle('active', b.dataset.level === lvl));
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
        document.getElementById('csto-rule').textContent = q.rule;
        document.getElementById('csto-difficulty').textContent = q.difficulty;
        document.getElementById('csto-text').innerHTML = q.text;
        document.getElementById('csto-hint-box').innerHTML = '';
        document.getElementById('csto-hint-box').style.display = 'none';
        const fb = document.getElementById('csto-feedback');
        fb.className = 'feedback'; fb.style.display = 'none';
        document.getElementById('csto-next-btn').style.display = 'none';
        document.getElementById('csto-hint-btn').style.display = '';
        const area = document.getElementById('csto-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="btn btn-option" onclick="CHEM_STOICH.submitMC(${i})">${o}</button>`
            ).join('');
            if (window.MathJax) MathJax.typesetPromise([area]);
        } else {
            area.innerHTML = `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="csto-input" class="answer-input" placeholder="Your answer" step="any" onkeydown="if(event.key==='Enter')CHEM_STOICH.submitFree()">
                <button class="btn btn-primary" onclick="CHEM_STOICH.submitFree()">Check</button>
            </div>`;
        }
        if (window.MathJax) MathJax.typesetPromise([document.getElementById('csto-text')]);
    },

    submitFree() {
        if (this.answered) return;
        const inp = document.getElementById('csto-input');
        const userVal = parseFloat(inp.value);
        if (isNaN(userVal)) return;
        const ans = this.currentQ.answer;
        const correct = Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        this.handleResult(correct);
    },

    submitMC(idx) {
        if (this.answered) return;
        const correct = idx === this.currentQ.correctIndex;
        document.querySelectorAll('#csto-options-area .btn-option').forEach((b, i) => {
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
        document.getElementById('csto-score').textContent = this.score;
        document.getElementById('csto-total').textContent = this.total;
        document.getElementById('csto-streak').textContent = this.streak;
        document.getElementById('csto-accuracy').textContent = acc + '%';
        const fb = document.getElementById('csto-feedback');
        fb.style.display = '';
        fb.className = 'feedback ' + (correct ? 'correct' : 'incorrect');
        document.getElementById('csto-feedback-title').textContent = correct ? 'Correct!' : 'Incorrect';
        document.getElementById('csto-feedback-explanation').innerHTML = `<strong>Answer:</strong> \\(${this.currentQ.answerTex}\\)<br>${this.currentQ.explain}`;
        document.getElementById('csto-hint-btn').style.display = 'none';
        document.getElementById('csto-next-btn').style.display = '';
        if (window.MathJax) MathJax.typesetPromise([fb]);
        if (typeof ActivityLogger !== 'undefined') ActivityLogger.log('stoichiometry', correct);
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('csto-hint-box');
        box.style.display = '';
        box.innerHTML = `<strong>Hint ${this.hintIdx + 1}:</strong> \\(${q.hintTex[this.hintIdx]}\\)`;
        this.hintIdx++;
        if (window.MathJax) MathJax.typesetPromise([box]);
    },

    unload() {
        if (typeof showView === 'function') showView('topic-1');
    },

    load() {
        const container = document.getElementById('csto-container') || document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="CHEM_STOICH.unload()">Topic 1: Models of Particulate Matter</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Stoichiometry</h1><p>IB Chemistry 1.4 - Moles, molar mass, percentage composition, empirical formula</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CHEM_STOICH.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CHEM_STOICH.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CHEM_STOICH.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CHEM_STOICH.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="csto-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="csto-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="csto-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="csto-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="csto-rule"></span>
                <span class="difficulty-tag" id="csto-difficulty"></span>
                <div class="question-text" id="csto-text"></div>
                <div id="csto-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="csto-hint-box" style="display:none;"></div>
            <div class="feedback" id="csto-feedback" style="display:none;">
                <div class="feedback-title" id="csto-feedback-title"></div>
                <div class="feedback-explanation" id="csto-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="csto-hint-btn" onclick="CHEM_STOICH.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="csto-next-btn" onclick="CHEM_STOICH.next()" style="display:none;">Next Question</button>
            </div>
        `;
        this.score = 0; this.total = 0; this.streak = 0; this.level = 'all';
        this.next();
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['stoichiometry'] = () => CHEM_STOICH.load();
