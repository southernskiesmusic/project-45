/* ================================================================
   ACTIVITY: Acids and Bases (IB Chemistry 6.1)
   ================================================================ */
const CHEM_ACIDS = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    /* ═══════════════════════════════════════════════
       GENERATOR 1 - pH of Strong Acid
       ═══════════════════════════════════════════════ */
    qpHStrong() {
        const concentrations = [0.1, 0.01, 0.001, 1.0, 0.5, 0.2];
        const c = MathUtils.pick(concentrations);
        const pH = parseFloat((-Math.log10(c)).toFixed(2));
        const acids = ['HCl', 'HNO\\(_3\\)', 'H\\(_2\\)SO\\(_4\\)'];
        const acid = MathUtils.pick(acids);
        const note = acid === 'H\\(_2\\)SO\\(_4\\)' ? ' (assume fully dissociates, 2 H\\(^+\\) per molecule)' : '';
        const cH = acid === 'H\\(_2\\)SO\\(_4\\)' ? 2 * c : c;
        const pHfinal = parseFloat((-Math.log10(cH)).toFixed(2));
        return {
            type: 'free',
            rule: 'pH of Strong Acid',
            difficulty: 'easy',
            text: `Calculate the pH of a \\(${c}\\) mol dm\\(^{-3}\\) solution of ${acid}${note}.`,
            answer: pHfinal,
            answerTex: `\\text{pH} = ${pHfinal}`,
            options: [],
            hintTex: [
                'For a strong acid, \\([\\text{H}^+] = c_{\\text{acid}}\\) (fully dissociates).',
                `\\([\\text{H}^+] = ${cH}\\text{ mol dm}^{-3}\\)`,
                `\\(\\text{pH} = -\\log[\\text{H}^+] = -\\log(${cH}) = ${pHfinal}\\)`
            ],
            explain: `Strong acids dissociate completely. \\([\\text{H}^+] = ${cH}\\text{ mol dm}^{-3}\\). \\(\\text{pH} = -\\log(${cH}) = ${pHfinal}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 2 - pOH and pH of Strong Base
       ═══════════════════════════════════════════════ */
    qpOH() {
        const concentrations = [0.1, 0.01, 0.001, 1.0, 0.5];
        const c = MathUtils.pick(concentrations);
        const bases = ['NaOH', 'KOH'];
        const base = MathUtils.pick(bases);
        const pOH = parseFloat((-Math.log10(c)).toFixed(2));
        const pH = parseFloat((14 - pOH).toFixed(2));
        return {
            type: 'free',
            rule: 'pH of Strong Base',
            difficulty: 'easy',
            text: `Calculate the pH of a \\(${c}\\) mol dm\\(^{-3}\\) solution of ${base}.`,
            answer: pH,
            answerTex: `\\text{pH} = ${pH}`,
            options: [],
            hintTex: [
                `${base} is a strong base; \\([\\text{OH}^-] = ${c}\\text{ mol dm}^{-3}\\).`,
                `\\(\\text{pOH} = -\\log[\\text{OH}^-] = -\\log(${c}) = ${pOH}\\)`,
                `\\(\\text{pH} = 14 - \\text{pOH} = 14 - ${pOH} = ${pH}\\) (at 25\\(^\\circ\\)C)`
            ],
            explain: `\\([\\text{OH}^-] = ${c}\\text{ mol dm}^{-3}\\). \\(\\text{pOH} = -\\log(${c}) = ${pOH}\\). Since \\(\\text{pH} + \\text{pOH} = 14\\) at 25\\(^\\circ\\)C: \\(\\text{pH} = 14 - ${pOH} = ${pH}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 3 - Ka of Weak Acid
       ═══════════════════════════════════════════════ */
    qKaWeak() {
        const acids = [
            { name:'ethanoic acid (CH\\(_3\\)COOH)', Ka: 1.8e-5 },
            { name:'methanoic acid (HCOOH)', Ka: 1.77e-4 },
            { name:'benzoic acid (C\\(_6\\)H\\(_5\\)COOH)', Ka: 6.5e-5 },
            { name:'hydrocyanic acid (HCN)', Ka: 4.9e-10 },
        ];
        const acid = MathUtils.pick(acids);
        const c = MathUtils.pick([0.1, 0.05, 0.2, 0.5, 0.01]);
        const cH = parseFloat(Math.sqrt(acid.Ka * c).toFixed(6));
        const pH = parseFloat((-Math.log10(cH)).toFixed(2));
        const Ka_str = acid.Ka.toExponential(2);
        return {
            type: 'free',
            rule: 'Weak Acid pH',
            difficulty: 'hard',
            text: `Calculate the pH of a \\(${c}\\) mol dm\\(^{-3}\\) solution of ${acid.name}. \\(K_a = ${Ka_str}\\text{ mol dm}^{-3}\\).`,
            answer: pH,
            answerTex: `\\text{pH} = ${pH}`,
            options: [],
            hintTex: [
                'For a weak acid HA: \\([\\text{H}^+] \\approx \\sqrt{K_a \\times c}\\) (assuming small dissociation).',
                `\\([\\text{H}^+] = \\sqrt{${Ka_str} \\times ${c}}\\)`,
                `\\([\\text{H}^+] = ${cH}\\text{ mol dm}^{-3}\\); \\(\\text{pH} = -\\log(${cH}) = ${pH}\\)`
            ],
            explain: `For a weak acid: \\([\\text{H}^+] \\approx \\sqrt{K_a \\times c} = \\sqrt{${Ka_str} \\times ${c}} = ${cH}\\text{ mol dm}^{-3}\\). \\(\\text{pH} = -\\log(${cH}) = ${pH}\\). This approximation holds when \\(K_a \\ll c\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 4 - Neutralisation Volume
       ═══════════════════════════════════════════════ */
    qNeutralisation() {
        const cAcid = MathUtils.pick([0.1, 0.2, 0.5, 1.0]);
        const vAcid = MathUtils.pick([10, 20, 25, 50]);  // mL
        const cBase = MathUtils.pick([0.1, 0.2, 0.5]);
        const nAcid = parseFloat((cAcid * vAcid / 1000).toFixed(6));  // mol
        const vBase = parseFloat((nAcid / cBase * 1000).toFixed(2));  // mL
        const acids = ['HCl', 'HNO\\(_3\\)'];
        const bases = ['NaOH', 'KOH'];
        const acid = MathUtils.pick(acids);
        const base = MathUtils.pick(bases);
        return {
            type: 'free',
            rule: 'Neutralisation',
            difficulty: 'medium',
            text: `What volume (mL) of \\(${cBase}\\) mol dm\\(^{-3}\\) ${base} is needed to completely neutralise \\(${vAcid}\\) mL of \\(${cAcid}\\) mol dm\\(^{-3}\\) ${acid}?`,
            answer: vBase,
            answerTex: `V(\\text{base}) = ${vBase}\\text{ mL}`,
            options: [],
            hintTex: [
                'At the equivalence point: moles of acid = moles of base (for 1:1 reactions).',
                `Moles of acid = \\(c \\times V = ${cAcid} \\times ${vAcid}/1000 = ${nAcid}\\text{ mol}\\)`,
                `\\(V(\\text{base}) = \\dfrac{n}{c} = \\dfrac{${nAcid}}{${cBase}} = ${parseFloat((nAcid/cBase).toFixed(6))}\\text{ dm}^3 = ${vBase}\\text{ mL}\\)`
            ],
            explain: `${acid} + ${base} \\(\\rightarrow\\) salt + H\\(_2\\)O (1:1 mole ratio). \\(n(\\text{acid}) = ${cAcid} \\times \\dfrac{${vAcid}}{1000} = ${nAcid}\\text{ mol}\\). \\(V(\\text{base}) = \\dfrac{${nAcid}}{${cBase}} \\times 1000 = ${vBase}\\text{ mL}\\).`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 5 - Identify Strong/Weak Acid (MC)
       ═══════════════════════════════════════════════ */
    qIdentifyAcid() {
        const questions = [
            {
                text: 'Which of the following is a <strong>weak</strong> acid?',
                options: ['HCl', 'H\\(_2\\)SO\\(_4\\)', 'CH\\(_3\\)COOH', 'HNO\\(_3\\)'],
                correctIndex: 2,
                explain: 'CH\\(_3\\)COOH (ethanoic acid) is a weak acid - it only partially dissociates. HCl, H\\(_2\\)SO\\(_4\\), and HNO\\(_3\\) are all strong acids that fully dissociate.'
            },
            {
                text: 'Which of the following is a <strong>strong</strong> acid?',
                options: ['CH\\(_3\\)COOH', 'H\\(_3\\)PO\\(_4\\)', 'HF', 'HNO\\(_3\\)'],
                correctIndex: 3,
                explain: 'HNO\\(_3\\) (nitric acid) is a strong acid. CH\\(_3\\)COOH, H\\(_3\\)PO\\(_4\\), and HF are all weak acids that partially dissociate.'
            },
            {
                text: 'Which statement correctly describes a strong acid compared to a weak acid at the same concentration?',
                options: [
                    'Strong acid has higher [H\\(^+\\)] and lower pH',
                    'Strong acid has lower [H\\(^+\\)] and higher pH',
                    'Both have the same pH',
                    'Strong acid reacts more slowly'
                ],
                correctIndex: 0,
                explain: 'A strong acid fully dissociates, giving higher [H\\(^+\\)] and therefore a lower pH than a weak acid at the same concentration. E.g. 0.1 mol dm\\(^{-3}\\) HCl: pH = 1. 0.1 mol dm\\(^{-3}\\) CH\\(_3\\)COOH: pH ≈ 2.87.'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: 'Strong vs Weak Acids',
            difficulty: 'easy',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.options[q.correctIndex],
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                'Strong acids fully dissociate: HCl, H\\(_2\\)SO\\(_4\\), HNO\\(_3\\), HBr, HI, HClO\\(_4\\).',
                'Weak acids partially dissociate and reach equilibrium: CH\\(_3\\)COOH, HF, H\\(_3\\)PO\\(_4\\), H\\(_2\\)CO\\(_3\\).',
                'Strong vs weak refers to the extent of dissociation, NOT the concentration.'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 6 - Buffer Effect (MC)
       ═══════════════════════════════════════════════ */
    qBufferEffect() {
        const questions = [
            {
                text: 'A buffer solution contains ethanoic acid and sodium ethanoate. What happens when a small amount of strong acid (HCl) is added?',
                options: [
                    'The added H\\(^+\\) reacts with CH\\(_3\\)COO\\(^-\\), minimising pH change',
                    'The pH drops significantly',
                    'The added H\\(^+\\) reacts with CH\\(_3\\)COOH',
                    'The buffer loses its buffering capacity immediately'
                ],
                correctIndex: 0,
                explain: 'The buffer contains CH\\(_3\\)COO\\(^-\\) (conjugate base). When H\\(^+\\) is added: CH\\(_3\\)COO\\(^-\\) + H\\(^+\\) \\(\\rightarrow\\) CH\\(_3\\)COOH. The conjugate base reacts with the added acid, minimising the pH change.'
            },
            {
                text: 'Which of the following best describes a buffer solution?',
                options: [
                    'A solution that resists changes in pH when small amounts of acid or base are added',
                    'A solution with pH = 7',
                    'A solution that absorbs unlimited amounts of acid',
                    'A solution containing only strong acids and bases'
                ],
                correctIndex: 0,
                explain: 'A buffer resists pH changes by containing both a weak acid and its conjugate base (or weak base and its conjugate acid). It cannot neutralise unlimited acid/base, and its pH is not necessarily 7.'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: 'Buffer Solutions',
            difficulty: 'easy',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.options[q.correctIndex],
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                'A buffer contains a weak acid (HA) and its conjugate base (A\\(^-\\)).',
                'When acid is added: A\\(^-\\) + H\\(^+\\) \\(\\rightarrow\\) HA (conjugate base reacts).',
                'When base is added: HA + OH\\(^-\\) \\(\\rightarrow\\) A\\(^-\\) + H\\(_2\\)O (weak acid reacts).'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       ENGINE
       ═══════════════════════════════════════════════ */
    generators() {
        const all = [
            () => this.qpHStrong(),
            () => this.qpOH(),
            () => this.qKaWeak(),
            () => this.qNeutralisation(),
            () => this.qIdentifyAcid(),
            () => this.qBufferEffect(),
        ];
        if (this.level === 'all') return all;
        const map = { easy:[0,1,4,5], medium:[3], hard:[2] };
        return (map[this.level] || []).map(i => all[i]);
    },

    setLevel(lvl) {
        this.level = lvl;
        document.querySelectorAll('#cacid-container .level-filter').forEach(b => b.classList.toggle('active', b.dataset.level === lvl));
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
        document.getElementById('cacid-rule').textContent = q.rule;
        document.getElementById('cacid-difficulty').textContent = q.difficulty;
        document.getElementById('cacid-text').innerHTML = q.text;
        document.getElementById('cacid-hint-box').innerHTML = '';
        document.getElementById('cacid-hint-box').style.display = 'none';
        const fb = document.getElementById('cacid-feedback');
        fb.className = 'feedback'; fb.style.display = 'none';
        document.getElementById('cacid-next-btn').style.display = 'none';
        document.getElementById('cacid-hint-btn').style.display = '';
        const area = document.getElementById('cacid-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="btn btn-option" onclick="CHEM_ACIDS.submitMC(${i})">${o}</button>`
            ).join('');
            if (window.MathJax) MathJax.typesetPromise([area]);
        } else {
            area.innerHTML = `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="cacid-input" class="answer-input" placeholder="Your answer" step="any" onkeydown="if(event.key==='Enter')CHEM_ACIDS.submitFree()">
                <button class="btn btn-primary" onclick="CHEM_ACIDS.submitFree()">Check</button>
            </div>`;
        }
        if (window.MathJax) MathJax.typesetPromise([document.getElementById('cacid-text')]);
    },

    submitFree() {
        if (this.answered) return;
        const inp = document.getElementById('cacid-input');
        const userVal = parseFloat(inp.value);
        if (isNaN(userVal)) return;
        const ans = this.currentQ.answer;
        const correct = Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        this.handleResult(correct);
    },

    submitMC(idx) {
        if (this.answered) return;
        const correct = idx === this.currentQ.correctIndex;
        document.querySelectorAll('#cacid-options-area .btn-option').forEach((b, i) => {
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
        document.getElementById('cacid-score').textContent = this.score;
        document.getElementById('cacid-total').textContent = this.total;
        document.getElementById('cacid-streak').textContent = this.streak;
        document.getElementById('cacid-accuracy').textContent = acc + '%';
        const fb = document.getElementById('cacid-feedback');
        fb.style.display = '';
        fb.className = 'feedback ' + (correct ? 'correct' : 'incorrect');
        document.getElementById('cacid-feedback-title').textContent = correct ? 'Correct!' : 'Incorrect';
        document.getElementById('cacid-feedback-explanation').innerHTML = `<strong>Answer:</strong> \\(${this.currentQ.answerTex}\\)<br>${this.currentQ.explain}`;
        document.getElementById('cacid-hint-btn').style.display = 'none';
        document.getElementById('cacid-next-btn').style.display = '';
        if (window.MathJax) MathJax.typesetPromise([fb]);
        if (typeof ActivityLogger !== 'undefined') ActivityLogger.log('acids-bases', correct);
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('cacid-hint-box');
        box.style.display = '';
        box.innerHTML = `<strong>Hint ${this.hintIdx + 1}:</strong> ${q.hintTex[this.hintIdx]}`;
        this.hintIdx++;
        if (window.MathJax) MathJax.typesetPromise([box]);
    },

    unload() {
        if (typeof showView === 'function') showView('topic-6');
    },

    load() {
        const container = document.getElementById('cacid-container') || document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="CHEM_ACIDS.unload()">Topic 6: Consequences of Chemical Reactions</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Acids and Bases</h1><p>IB Chemistry 6.1 - pH, K<sub>a</sub>, neutralisation, buffer concepts</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CHEM_ACIDS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CHEM_ACIDS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CHEM_ACIDS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CHEM_ACIDS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="cacid-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="cacid-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="cacid-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="cacid-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="cacid-rule"></span>
                <span class="difficulty-tag" id="cacid-difficulty"></span>
                <div class="question-text" id="cacid-text"></div>
                <div id="cacid-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="cacid-hint-box" style="display:none;"></div>
            <div class="feedback" id="cacid-feedback" style="display:none;">
                <div class="feedback-title" id="cacid-feedback-title"></div>
                <div class="feedback-explanation" id="cacid-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cacid-hint-btn" onclick="CHEM_ACIDS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cacid-next-btn" onclick="CHEM_ACIDS.next()" style="display:none;">Next Question</button>
            </div>
        `;
        this.score = 0; this.total = 0; this.streak = 0; this.level = 'all';
        this.next();
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['acids-bases'] = () => CHEM_ACIDS.load();
