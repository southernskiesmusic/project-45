const BIO_CELLS = {
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

    // 1. Prokaryote vs eukaryote identification - MC - Easy
    qCellType() {
        const scenarios = [
            { desc: 'A single-celled organism with no nucleus and circular DNA', answer: 'Prokaryote', wrong: ['Eukaryote', 'Virus', 'Archaea only'] },
            { desc: 'A cell that contains membrane-bound organelles and a defined nucleus', answer: 'Eukaryote', wrong: ['Prokaryote', 'Virus', 'Bacterium'] },
            { desc: 'A bacterium found in soil - it has ribosomes but no nuclear envelope', answer: 'Prokaryote', wrong: ['Eukaryote', 'Plant cell', 'Fungal cell'] },
            { desc: 'A liver cell containing mitochondria, a nucleus, and an endoplasmic reticulum', answer: 'Eukaryote', wrong: ['Prokaryote', 'Bacterium', 'Archaeon'] },
            { desc: 'A cell whose DNA is found as a single circular chromosome in the cytoplasm', answer: 'Prokaryote', wrong: ['Eukaryote', 'Animal cell', 'Yeast cell'] },
            { desc: 'A yeast cell, which carries out aerobic respiration using mitochondria', answer: 'Eukaryote', wrong: ['Prokaryote', 'Bacterium', 'Virus'] }
        ];
        const s = MathUtils.pick(scenarios);
        const opts = MathUtils.shuffle([s.answer, ...s.wrong.slice(0, 3)]);
        return {
            type: 'mc',
            rule: 'Cell Type',
            difficulty: 'easy',
            text: 'Classify the following cell: <em>"' + s.desc + '"</em>',
            answer: s.answer,
            answerTex: s.answer,
            options: opts,
            correctIndex: opts.indexOf(s.answer),
            hintTex: [
                'Prokaryotes lack a membrane-bound nucleus; eukaryotes have one.',
                'Key prokaryote features: no nucleus, circular DNA, no membrane-bound organelles.'
            ],
            explain: '<strong>' + s.answer + '</strong>. Prokaryotes (e.g. bacteria) have no nuclear envelope and no membrane-bound organelles. Eukaryotes (animals, plants, fungi, protists) have a true nucleus and membrane-bound organelles.'
        };
    },

    // 2. Organelle function - MC - Easy
    qOrganelle() {
        const pairs = [
            { fn: 'Site of protein synthesis', org: 'Ribosome', wrong: ['Golgi apparatus', 'Lysosome', 'Vacuole'] },
            { fn: 'Produces ATP via aerobic respiration', org: 'Mitochondrion', wrong: ['Ribosome', 'Nucleus', 'Cell wall'] },
            { fn: 'Site of photosynthesis in plant cells', org: 'Chloroplast', wrong: ['Mitochondrion', 'Vacuole', 'Ribosome'] },
            { fn: 'Controls entry and exit of substances in the cell', org: 'Cell membrane', wrong: ['Cell wall', 'Nucleus', 'Golgi apparatus'] },
            { fn: 'Packages and secretes proteins for export', org: 'Golgi apparatus', wrong: ['Rough ER', 'Ribosome', 'Mitochondrion'] },
            { fn: 'Contains digestive enzymes that break down waste materials', org: 'Lysosome', wrong: ['Golgi apparatus', 'Vacuole', 'Peroxisome'] },
            { fn: 'Stores the cell\'s genetic information (DNA)', org: 'Nucleus', wrong: ['Mitochondrion', 'Ribosome', 'Chloroplast'] },
            { fn: 'Synthesises and transports proteins (has attached ribosomes)', org: 'Rough endoplasmic reticulum', wrong: ['Smooth ER', 'Golgi apparatus', 'Ribosome'] }
        ];
        const p = MathUtils.pick(pairs);
        const opts = MathUtils.shuffle([p.org, ...p.wrong.slice(0, 3)]);
        return {
            type: 'mc',
            rule: 'Organelle Function',
            difficulty: 'easy',
            text: 'Which organelle is responsible for the following function?<br><em>"' + p.fn + '"</em>',
            answer: p.org,
            answerTex: p.org,
            options: opts,
            correctIndex: opts.indexOf(p.org),
            hintTex: [
                'Think about which organelle is specialised for this task.',
                'Ribosomes = protein synthesis; Mitochondria = ATP; Chloroplasts = photosynthesis.'
            ],
            explain: '<strong>' + p.org + '</strong> - ' + p.fn.toLowerCase() + '. Learning organelle functions is a core A.1/B.3 skill.'
        };
    },

    // 3. Prokaryote vs eukaryote distinguishing features - MC - Medium
    qOrganelleStructure() {
        const questions = [
            {
                text: 'Which feature is found in eukaryotic cells but NOT in prokaryotic cells?',
                answer: 'Membrane-bound nucleus',
                wrong: ['Ribosomes', 'Cell membrane', 'DNA']
            },
            {
                text: 'Which of the following is a feature shared by BOTH prokaryotic and eukaryotic cells?',
                answer: 'Ribosomes',
                wrong: ['Mitochondria', 'Nuclear envelope', 'Chloroplasts']
            },
            {
                text: 'Prokaryotic cells differ from eukaryotic cells because prokaryotes:',
                answer: 'Lack a membrane-bound nucleus',
                wrong: ['Lack ribosomes', 'Lack a cell membrane', 'Cannot carry out respiration']
            },
            {
                text: 'Which structure is unique to plant cells (eukaryote) compared to animal cells (eukaryote)?',
                answer: 'Cell wall made of cellulose',
                wrong: ['Mitochondria', 'Ribosomes', 'Cell membrane']
            },
            {
                text: 'In prokaryotes, DNA is typically:',
                answer: 'A single circular chromosome in the cytoplasm',
                wrong: ['Stored in a membrane-bound nucleus', 'Linear and wound around histones', 'Located in the mitochondria']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Prokaryote vs Eukaryote',
            difficulty: 'medium',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'The key distinction is the nuclear envelope (membrane around the nucleus).',
                'Prokaryotes: no nucleus, no membrane-bound organelles. Eukaryotes: nucleus present, complex organelles.'
            ],
            explain: '<strong>' + q.answer + '</strong>. The defining difference between prokaryotes and eukaryotes is the presence of a membrane-bound nucleus in eukaryotes. Both cell types have ribosomes, cell membranes, and DNA.'
        };
    },

    // 4. SA:V ratio calculation - free answer - Easy
    qSAVratio() {
        const n = MathUtils.pick([2, 3, 4, 5]);
        const sa = 6 * n * n;
        const v = n * n * n;
        const ratio = 6 / n;
        return {
            type: 'free',
            rule: 'SA:V Ratio',
            difficulty: 'easy',
            text: 'Calculate the surface area to volume ratio (SA:V) for a cube with side length <strong>' + n + ' µm</strong>.',
            answer: ratio,
            answerTex: 'SA:V = ' + ratio + ':1',
            options: [],
            hintTex: [
                'Surface area of a cube = 6 × side². Volume = side³.',
                'SA = 6 × ' + n + '² = ' + sa + ' µm². V = ' + n + '³ = ' + v + ' µm³. SA:V = ' + sa + '/' + v
            ],
            explain: 'Surface area = 6 × ' + n + '² = <strong>' + sa + ' µm²</strong>. Volume = ' + n + '³ = <strong>' + v + ' µm³</strong>.<br>SA:V = ' + sa + ' / ' + v + ' = <strong>' + ratio + '</strong> (or ' + ratio + ':1).'
        };
    },

    // 5. SA:V consequence - MC - Easy
    qSAVconsequence() {
        const questions = [
            {
                text: 'As a cell increases in size, what happens to its surface area to volume ratio?',
                answer: 'It decreases',
                wrong: ['It increases', 'It stays the same', 'It becomes infinite']
            },
            {
                text: 'Why must cells remain small? Select the best explanation.',
                answer: 'To maintain a high SA:V ratio for efficient exchange of materials',
                wrong: ['To prevent DNA damage', 'To avoid being seen by the immune system', 'To reduce energy consumption']
            },
            {
                text: 'A larger cell has a lower SA:V ratio. What does this mean for diffusion?',
                answer: 'Diffusion is less efficient - the interior cannot be supplied quickly enough',
                wrong: ['Diffusion is more efficient because there is more volume', 'Diffusion rate is unaffected by cell size', 'Diffusion occurs faster because the surface is larger']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'SA:V and Cell Size',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'As side length doubles, SA × 4 but V × 8 - so SA:V halves.',
                'Cells need a high SA:V to exchange O2, CO2, nutrients and waste rapidly.'
            ],
            explain: '<strong>' + q.answer + '</strong>. As cell size increases, volume grows faster than surface area (V ∝ n³, SA ∝ n²), so the SA:V ratio decreases. This limits the efficiency of diffusion into and out of the cell.'
        };
    },

    // 6. Magnification calculation - free answer - Medium
    qMagnification() {
        const actualSizes = [5, 10, 20, 50, 100]; // µm
        const magnifications = [100, 200, 400, 500, 1000];
        const actual = MathUtils.pick(actualSizes);
        const mag = MathUtils.pick(magnifications);
        const imageSize = actual * mag; // nm or µm depending on context - keep as µm here
        return {
            type: 'free',
            rule: 'Magnification',
            difficulty: 'medium',
            text: 'A cell has an actual diameter of <strong>' + actual + ' µm</strong>. Under a microscope, the image measures <strong>' + imageSize + ' µm</strong>. What is the magnification?',
            answer: mag,
            answerTex: 'Magnification = ×' + mag,
            options: [],
            hintTex: [
                'Use the formula: Magnification = Image size ÷ Actual size.',
                'Magnification = ' + imageSize + ' ÷ ' + actual + ' = ?'
            ],
            explain: 'Magnification = Image size ÷ Actual size = ' + imageSize + ' ÷ ' + actual + ' = <strong>×' + mag + '</strong>.<br>The formula triangle: I = A × M, so M = I/A and A = I/M.'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy:   [this.qCellType, this.qOrganelle, this.qSAVratio, this.qSAVconsequence],
            medium: [this.qOrganelleStructure, this.qMagnification],
            hard:   [this.qOrganelleStructure, this.qMagnification]
        };
        this.allPool = [
            ...this.pools.easy, ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('cell-biology', this);
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
            <button class="back-btn" onclick="BIO_CELLS.unload()">Topic A: Unity and Diversity</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Cell Biology</h1><p>IB Biology A.1/B.3 - Cell types, organelles, surface area to volume</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="BIO_CELLS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="BIO_CELLS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="BIO_CELLS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="BIO_CELLS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="bcell-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="bcell-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="bcell-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="bcell-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="bcell-rule"></span>
                <span class="difficulty-tag" id="bcell-difficulty"></span>
                <div class="question-text" id="bcell-text"></div>
                <div class="question-prompt" id="bcell-latex"></div>
                <div id="bcell-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="bcell-hint-box"></div>
            <div class="feedback" id="bcell-feedback">
                <div class="feedback-title" id="bcell-feedback-title"></div>
                <div class="feedback-explanation" id="bcell-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="bcell-hint-btn" onclick="BIO_CELLS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="bcell-next-btn" onclick="BIO_CELLS.next_q()" style="display:none;">Next Question</button>
            </div>`;
        this.loadQuestion();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-a');
    },

    loadQuestion() {
        this.answered = false;
        this.hintIdx = 0;
        const hintBox = document.getElementById('bcell-hint-box');
        if (hintBox) { hintBox.classList.remove('show'); hintBox.innerHTML = ''; }
        const fb = document.getElementById('bcell-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nextBtn = document.getElementById('bcell-next-btn');
        if (nextBtn) nextBtn.style.display = 'none';

        this.currentQ = this.next();
        const q = this.currentQ;
        const dlabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

        const ruleEl = document.getElementById('bcell-rule');
        const diffEl = document.getElementById('bcell-difficulty');
        const textEl = document.getElementById('bcell-text');
        const latexEl = document.getElementById('bcell-latex');
        const optArea = document.getElementById('bcell-options-area');

        if (ruleEl) ruleEl.textContent = q.rule;
        if (diffEl) { diffEl.textContent = dlabels[q.difficulty]; diffEl.className = 'difficulty-tag ' + q.difficulty; }
        if (textEl) textEl.innerHTML = q.text;
        if (latexEl) latexEl.innerHTML = '';

        if (q.type === 'mc') {
            let h = '<div class="mc-options">';
            q.options.forEach((opt, i) => {
                h += `<button class="mc-option" data-i="${i}" onclick="BIO_CELLS.checkMC(${i})">${opt}</button>`;
            });
            h += '</div>';
            if (optArea) optArea.innerHTML = h;
        } else {
            if (optArea) optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" id="bcell-input" class="free-input" placeholder="Enter your answer" step="any"/>
                    <button class="btn btn-primary" onclick="BIO_CELLS.checkFree()">Check</button>
                </div>`;
            setTimeout(() => {
                const inp = document.getElementById('bcell-input');
                if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') BIO_CELLS.checkFree(); });
            }, 100);
        }
        if (typeof renderMath === 'function') renderMath();
    },

    checkMC(i) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ;
        const ok = i === q.correctIndex;
        document.querySelectorAll('#bcell-options-area .mc-option').forEach((btn, j) => {
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
        const inp = document.getElementById('bcell-input');
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
        const scoreEl = document.getElementById('bcell-score');
        const totalEl = document.getElementById('bcell-total');
        const streakEl = document.getElementById('bcell-streak');
        const accEl = document.getElementById('bcell-accuracy');
        if (scoreEl) scoreEl.textContent = this.score;
        if (totalEl) totalEl.textContent = this.total;
        if (streakEl) streakEl.textContent = this.streak;
        if (accEl) accEl.textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '-';
        if (typeof saveActivityStats === 'function') saveActivityStats('cell-biology', this, ok);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('bcell-feedback');
        if (!fb) return;
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('bcell-feedback-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('bcell-feedback-explanation').innerHTML = html;
        const nb = document.getElementById('bcell-next-btn');
        if (nb) nb.style.display = 'inline-block';
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('bcell-hint-box');
        if (box) {
            box.classList.add('show');
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + q.hintTex[this.hintIdx];
            this.hintIdx++;
        }
    },

    next_q() {
        this.loadQuestion();
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['cell-biology'] = () => BIO_CELLS.load();
