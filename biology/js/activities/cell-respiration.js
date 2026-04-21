const BIO_RESPIRATION = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    /* ═══════════════════════════════════════════════
       GENERATORS
       ═══════════════════════════════════════════════ */

    // 1. Overall aerobic respiration equation - MC - Easy
    qAerobicEquation() {
        const correct = 'C\u2086H\u2081\u2082O\u2086 + 6O\u2082 \u2192 6CO\u2082 + 6H\u2082O + ATP';
        const opts = MathUtils.shuffle([
            correct,
            '6CO\u2082 + 6H\u2082O \u2192 C\u2086H\u2081\u2082O\u2086 + 6O\u2082 (photosynthesis, not respiration)',
            'C\u2086H\u2081\u2082O\u2086 \u2192 2C\u2082H\u2085OH + 2CO\u2082 (anaerobic fermentation)',
            'C\u2086H\u2081\u2082O\u2086 + 6H\u2082O \u2192 6O\u2082 + ATP'
        ]);
        return {
            type: 'mc',
            rule: 'Aerobic Respiration Equation',
            difficulty: 'easy',
            text: 'Which equation correctly represents <strong>aerobic cellular respiration</strong>?',
            answer: correct,
            answerTex: correct,
            options: opts,
            correctIndex: opts.indexOf(correct),
            hintTex: [
                'Aerobic respiration requires oxygen and produces carbon dioxide and water.',
                'Glucose + Oxygen → Carbon dioxide + Water + ATP energy'
            ],
            explain: '<strong>C\u2086H\u2081\u2082O\u2086 + 6O\u2082 \u2192 6CO\u2082 + 6H\u2082O + ATP</strong><br>Aerobic respiration breaks down glucose using oxygen to produce carbon dioxide, water, and ATP (usable energy). This is the reverse of photosynthesis in terms of net reactants and products.'
        };
    },

    // 2. ATP yield - MC - Medium
    qATPYield() {
        const questions = [
            {
                text: 'Approximately how many ATP molecules are produced from the complete aerobic respiration of <strong>one molecule of glucose</strong>?',
                answer: '30-32 ATP',
                wrong: ['2 ATP', '4 ATP', '38 ATP (older estimate, now revised)']
            },
            {
                text: 'Glycolysis alone (anaerobic conditions) produces a net gain of how many ATP per glucose?',
                answer: '2 ATP net',
                wrong: ['4 ATP net', '30-32 ATP', '0 ATP - no energy produced']
            },
            {
                text: 'The Krebs cycle (per glucose, running twice) produces which of the following directly?',
                answer: '2 ATP, reduced coenzymes (NADH and FADH2), and CO2',
                wrong: ['30 ATP directly', 'Only water and CO2', '6 ATP and oxygen']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'ATP Yield',
            difficulty: 'medium',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Glycolysis: 2 ATP net. Krebs cycle: 2 ATP. Oxidative phosphorylation: ~26-28 ATP.',
                'Total aerobic ATP ≈ 30-32. The older value of 38 is no longer used in IB Biology.'
            ],
            explain: '<strong>' + q.answer + '</strong>. The IB 2023 curriculum uses 30-32 ATP as the accepted yield for aerobic respiration of one glucose molecule. Most ATP comes from oxidative phosphorylation on the inner mitochondrial membrane, driven by NADH and FADH2 produced in glycolysis and the Krebs cycle.'
        };
    },

    // 3. Glycolysis location - MC - Easy
    qGlycolysis() {
        const questions = [
            {
                text: 'Where does <strong>glycolysis</strong> take place in the cell?',
                answer: 'Cytoplasm (cytosol)',
                wrong: ['Mitochondrial matrix', 'Inner mitochondrial membrane', 'Nucleus']
            },
            {
                text: 'Glycolysis converts one glucose molecule into two molecules of:',
                answer: 'Pyruvate',
                wrong: ['Acetyl-CoA', 'Oxaloacetate', 'CO2']
            },
            {
                text: 'Glycolysis can occur in the absence of oxygen. This means it is:',
                answer: 'An anaerobic process',
                wrong: ['An aerobic process', 'A process requiring mitochondria', 'Dependent on the Krebs cycle']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Glycolysis',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Glycolysis = "sugar splitting" - it splits glucose into two pyruvate molecules.',
                'Location: cytoplasm (no organelle needed). Products: 2 pyruvate, 2 ATP net, 2 NADH.'
            ],
            explain: '<strong>' + q.answer + '</strong>. Glycolysis occurs in the cytoplasm of all cells and does not require mitochondria. It is the universal first stage of glucose breakdown, producing 2 pyruvate, a net gain of 2 ATP, and 2 NADH.'
        };
    },

    // 4. Anaerobic products in animals - MC - Easy
    qAnaerobicProducts() {
        const questions = [
            {
                text: 'In animals (e.g. muscle cells), anaerobic respiration converts pyruvate into:',
                answer: 'Lactate (lactic acid)',
                wrong: ['Ethanol and CO2', 'Acetyl-CoA', 'Citric acid']
            },
            {
                text: 'In plants and yeast, anaerobic respiration produces:',
                answer: 'Ethanol and carbon dioxide',
                wrong: ['Lactate', 'Pyruvate and NADH', 'Glucose and oxygen']
            },
            {
                text: 'The purpose of anaerobic respiration (lactate fermentation in animals) is to:',
                answer: 'Regenerate NAD+ so glycolysis can continue',
                wrong: ['Produce more ATP than aerobic respiration', 'Store glucose for later use', 'Break down lactate into CO2 and H2O']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Anaerobic Respiration',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Animals: pyruvate + NADH → lactate + NAD+',
                'Plants/yeast: pyruvate → ethanol + CO2 (used in brewing and baking).'
            ],
            explain: '<strong>' + q.answer + '</strong>. Animals produce lactate from pyruvate under anaerobic conditions - this regenerates NAD+ needed for glycolysis to continue. Yeast and plants produce ethanol and CO2 instead. Neither pathway produces additional ATP beyond what glycolysis generates.'
        };
    },

    // 5. Respiratory quotient - free answer - Easy
    qRQ() {
        const substrates = [
            { name: 'carbohydrate (glucose)', co2: 6, o2: 6, rq: 1.0 },
            { name: 'fat (a typical triglyceride)', co2: 57, o2: 80, rq: parseFloat((57/80).toFixed(1)) },
            { name: 'protein', co2: 8, o2: 9, rq: parseFloat((8/9).toFixed(1)) }
        ];
        const sub = MathUtils.pick(substrates);
        return {
            type: 'free',
            rule: 'Respiratory Quotient',
            difficulty: 'easy',
            text: 'The respiratory quotient (RQ) = CO\u2082 produced / O\u2082 consumed. When respiring <strong>' + sub.name + '</strong>, CO\u2082 produced = <strong>' + sub.co2 + '</strong> and O\u2082 consumed = <strong>' + sub.o2 + '</strong>. Calculate the RQ (to 1 decimal place).',
            answer: sub.rq,
            answerTex: 'RQ = ' + sub.rq,
            options: [],
            hintTex: [
                'RQ = CO2 produced / O2 consumed. Divide the two values given.',
                'RQ = ' + sub.co2 + ' / ' + sub.o2 + ' = ?'
            ],
            explain: 'RQ = CO\u2082 produced / O\u2082 consumed = ' + sub.co2 + ' / ' + sub.o2 + ' = <strong>' + sub.rq + '</strong>.<br>Typical RQ values: carbohydrates = 1.0; fats \u2248 0.7; proteins \u2248 0.9. An RQ of 1.0 strongly suggests glucose is being respired.'
        };
    },

    // 6. Krebs cycle location - MC - Medium
    qMitochondria() {
        const questions = [
            {
                text: 'The <strong>Krebs cycle (citric acid cycle)</strong> takes place in:',
                answer: 'Mitochondrial matrix',
                wrong: ['Inner mitochondrial membrane', 'Cytoplasm', 'Outer mitochondrial membrane']
            },
            {
                text: 'Oxidative phosphorylation (the electron transport chain + ATP synthase) is located on the:',
                answer: 'Inner mitochondrial membrane',
                wrong: ['Mitochondrial matrix', 'Cytoplasm', 'Outer mitochondrial membrane']
            },
            {
                text: 'The link reaction (conversion of pyruvate to acetyl-CoA) occurs in the:',
                answer: 'Mitochondrial matrix',
                wrong: ['Cytoplasm', 'Inner mitochondrial membrane', 'Intermembrane space']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Respiration Locations',
            difficulty: 'medium',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Glycolysis: cytoplasm. Link reaction + Krebs cycle: mitochondrial matrix. ETC: inner mitochondrial membrane.',
                'The inner membrane creates a proton gradient used by ATP synthase to make ATP.'
            ],
            explain: '<strong>' + q.answer + '</strong>. Key locations in aerobic respiration:<br>- Glycolysis: cytoplasm<br>- Link reaction and Krebs cycle: mitochondrial matrix<br>- Electron transport chain and ATP synthase: inner mitochondrial membrane (cristae).'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy:   [this.qAerobicEquation, this.qGlycolysis, this.qAnaerobicProducts, this.qRQ],
            medium: [this.qATPYield, this.qMitochondria],
            hard:   [this.qATPYield, this.qMitochondria, this.qRQ]
        };
        this.allPool = [
            ...this.pools.easy, ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('cell-respiration', this);
    },

    setLevel(lv) {
        this.level = lv;
        document.querySelectorAll('#activity-container .level-filter').forEach(b => {
            b.classList.toggle('active', b.dataset.level === lv);
        });
        this.loadQuestion();
    },

    next() {
        const p = this.level === 'all' ? this.allPool : (this.pools[this.level] || this.allPool);
        return MathUtils.pick(p).call(this);
    },

    load() {
        this.init();
        this.score = 0; this.total = 0; this.streak = 0;
        this.answered = false; this.hintIdx = 0;
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="BIO_RESPIRATION.unload()">Topic C: Interaction and Interdependence</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Cell Respiration</h1><p>IB Biology C.2 - Aerobic and anaerobic respiration, ATP yield, glycolysis</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="BIO_RESPIRATION.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="BIO_RESPIRATION.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="BIO_RESPIRATION.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="BIO_RESPIRATION.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="bresp-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="bresp-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="bresp-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="bresp-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="bresp-rule"></span>
                <span class="difficulty-tag" id="bresp-difficulty"></span>
                <div class="question-text" id="bresp-text"></div>
                <div class="question-prompt" id="bresp-latex"></div>
                <div id="bresp-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="bresp-hint-box"></div>
            <div class="feedback" id="bresp-feedback">
                <div class="feedback-title" id="bresp-feedback-title"></div>
                <div class="feedback-explanation" id="bresp-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="bresp-hint-btn" onclick="BIO_RESPIRATION.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="bresp-next-btn" onclick="BIO_RESPIRATION.next_q()" style="display:none;">Next Question</button>
            </div>`;
        this.loadQuestion();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-c');
    },

    loadQuestion() {
        this.answered = false; this.hintIdx = 0;
        const hintBox = document.getElementById('bresp-hint-box');
        if (hintBox) { hintBox.classList.remove('show'); hintBox.innerHTML = ''; }
        const fb = document.getElementById('bresp-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nextBtn = document.getElementById('bresp-next-btn');
        if (nextBtn) nextBtn.style.display = 'none';

        this.currentQ = this.next();
        const q = this.currentQ;
        const dlabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
        const ruleEl = document.getElementById('bresp-rule');
        const diffEl = document.getElementById('bresp-difficulty');
        const textEl = document.getElementById('bresp-text');
        const optArea = document.getElementById('bresp-options-area');

        if (ruleEl) ruleEl.textContent = q.rule;
        if (diffEl) { diffEl.textContent = dlabels[q.difficulty]; diffEl.className = 'difficulty-tag ' + q.difficulty; }
        if (textEl) textEl.innerHTML = q.text;

        if (q.type === 'mc') {
            let h = '<div class="mc-options">';
            q.options.forEach((opt, i) => {
                h += `<button class="mc-option" data-i="${i}" onclick="BIO_RESPIRATION.checkMC(${i})">${opt}</button>`;
            });
            h += '</div>';
            if (optArea) optArea.innerHTML = h;
        } else {
            if (optArea) optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" id="bresp-input" class="free-input" placeholder="Enter numeric answer" step="0.1"/>
                    <button class="btn btn-primary" onclick="BIO_RESPIRATION.checkFree()">Check</button>
                </div>`;
            setTimeout(() => {
                const inp = document.getElementById('bresp-input');
                if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') BIO_RESPIRATION.checkFree(); });
            }, 100);
        }
        if (typeof renderMath === 'function') renderMath();
    },

    checkMC(i) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ;
        const ok = i === q.correctIndex;
        document.querySelectorAll('#bresp-options-area .mc-option').forEach((btn, j) => {
            btn.disabled = true;
            if (j === q.correctIndex) btn.classList.add('correct');
            else if (j === i && !ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        let expl = q.explain;
        if (!ok) expl = 'The correct answer is <strong>' + q.options[q.correctIndex] + '</strong>.<br>' + expl;
        this.showFb(ok, expl);
    },

    checkFree() {
        if (this.answered) return;
        const inp = document.getElementById('bresp-input');
        if (!inp || inp.value.trim() === '') return;
        this.answered = true;
        const userVal = parseFloat(inp.value);
        const ans = this.currentQ.answer;
        const ok = Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        inp.disabled = true;
        this.record(ok);
        let expl = this.currentQ.explain;
        if (!ok) expl = 'The answer is <strong>' + this.currentQ.answerTex + '</strong>.<br>' + expl;
        this.showFb(ok, expl);
    },

    record(ok) {
        this.total++;
        if (ok) { this.score++; this.streak++; } else { this.streak = 0; }
        const scoreEl = document.getElementById('bresp-score');
        const totalEl = document.getElementById('bresp-total');
        const streakEl = document.getElementById('bresp-streak');
        const accEl = document.getElementById('bresp-accuracy');
        if (scoreEl) scoreEl.textContent = this.score;
        if (totalEl) totalEl.textContent = this.total;
        if (streakEl) streakEl.textContent = this.streak;
        if (accEl) accEl.textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '-';
        if (typeof saveActivityStats === 'function') saveActivityStats('cell-respiration', this, ok);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('bresp-feedback');
        if (!fb) return;
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('bresp-feedback-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('bresp-feedback-explanation').innerHTML = html;
        const nb = document.getElementById('bresp-next-btn');
        if (nb) nb.style.display = 'inline-block';
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('bresp-hint-box');
        if (box) {
            box.classList.add('show');
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + q.hintTex[this.hintIdx];
            this.hintIdx++;
        }
    },

    next_q() { this.loadQuestion(); }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['cell-respiration'] = () => BIO_RESPIRATION.load();
