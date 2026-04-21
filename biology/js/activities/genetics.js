const BIO_GENETICS = {
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

    // 1. Aa × Aa monohybrid cross - homozygous dominant % - free - Easy
    qMonohybridCross() {
        return {
            type: 'free',
            rule: 'Monohybrid Cross',
            difficulty: 'easy',
            text: 'In a monohybrid cross <strong>Aa × Aa</strong>, what percentage (%) of offspring are expected to be <strong>homozygous dominant (AA)</strong>?',
            answer: 25,
            answerTex: '25%',
            options: [],
            hintTex: [
                'Draw a Punnett square with Aa × Aa. The four possible genotypes are AA, Aa, Aa, aa.',
                'Count how many squares show AA out of 4 total: 1 out of 4 = 25%.'
            ],
            explain: 'Punnett square for Aa × Aa:<br><strong>AA : Aa : aa = 1 : 2 : 1</strong> (25% : 50% : 25%)<br>Therefore 1 in 4 offspring (25%) are homozygous dominant (AA).'
        };
    },

    // 2. Aa × aa phenotype ratio - MC - Easy
    qMonohybridRatio() {
        const questions = [
            {
                text: 'In a cross between <strong>Aa × aa</strong> (where A is dominant), what is the expected phenotype ratio of offspring?',
                answer: '1 dominant : 1 recessive (1:1)',
                wrong: ['3 dominant : 1 recessive (3:1)', '1 dominant : 3 recessive (1:3)', 'All offspring show the dominant phenotype']
            },
            {
                text: 'In a cross between <strong>Aa × Aa</strong>, what is the expected phenotype ratio?',
                answer: '3 dominant : 1 recessive (3:1)',
                wrong: ['1 dominant : 1 recessive (1:1)', '1 dominant : 2 recessive (1:2)', 'All show dominant phenotype']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Phenotype Ratio',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Aa × aa produces offspring: Aa, Aa, aa, aa (2 dominant, 2 recessive).',
                'Dominant (A_) : recessive (aa) = 1:1 for Aa × aa; 3:1 for Aa × Aa.'
            ],
            explain: '<strong>' + q.answer + '</strong>. For Aa × aa: genotypes are Aa, Aa, aa, aa giving a 1:1 phenotype ratio. For Aa × Aa: genotypes are AA, Aa, Aa, aa giving a 3:1 phenotype ratio (3 dominant : 1 recessive).'
        };
    },

    // 3. Dihybrid cross AaBb × AaBb phenotype classes - MC - Medium
    qDihybridCross() {
        const questions = [
            {
                text: 'In a dihybrid cross <strong>AaBb × AaBb</strong>, how many distinct phenotype classes are expected?',
                answer: '4',
                wrong: ['2', '8', '16']
            },
            {
                text: 'For a dihybrid cross AaBb × AaBb, what is the expected phenotype ratio?',
                answer: '9 : 3 : 3 : 1',
                wrong: ['1 : 1 : 1 : 1', '3 : 1', '9 : 7']
            },
            {
                text: 'In a dihybrid cross, how many genotypically different offspring can be produced from AaBb × AaBb?',
                answer: '9',
                wrong: ['4', '16', '2']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Dihybrid Cross',
            difficulty: 'medium',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Use the product rule: each gene assorts independently (Mendel\'s 2nd law).',
                'Aa × Aa gives 3:1. Two independent genes: (3:1) × (3:1) = 9:3:3:1 with 4 phenotype classes.'
            ],
            explain: '<strong>' + q.answer + '</strong>. By Mendel\'s law of independent assortment, each gene pair assorts independently. Aa × Aa gives a 3:1 ratio for each gene. Combined: 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb = 4 phenotype classes in a 9:3:3:1 ratio.'
        };
    },

    // 4. Dominance concept - MC - Easy
    qDominance() {
        const questions = [
            {
                text: 'An individual with genotype <strong>Aa</strong> shows the same phenotype as <strong>AA</strong>. What is the relationship between alleles A and a?',
                answer: 'A is dominant over a',
                wrong: ['a is dominant over A', 'A and a are codominant', 'A and a are incompletely dominant']
            },
            {
                text: 'An individual with genotype <strong>Bb</strong> shows only the B trait (not b). This means:',
                answer: 'B is dominant and b is recessive',
                wrong: ['B and b are codominant', 'b is dominant over B', 'The genotype is homozygous']
            },
            {
                text: 'In snapdragons, red (RR) × white (WW) gives pink (RW). The allele relationship is:',
                answer: 'Incomplete dominance',
                wrong: ['Complete dominance', 'Codominance', 'Sex linkage']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Dominance',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Dominant alleles mask the effect of recessive alleles in heterozygotes.',
                'If Aa looks like AA, then A is dominant over a.'
            ],
            explain: '<strong>' + q.answer + '</strong>. A dominant allele expresses its phenotype even when one copy is present (heterozygous). A recessive allele only shows its phenotype when two copies are present (homozygous recessive).'
        };
    },

    // 5. Testcross interpretation - free answer - Medium
    qGenotype() {
        return {
            type: 'free',
            rule: 'Testcross',
            difficulty: 'medium',
            text: 'In a testcross, an organism with an unknown genotype is crossed with a homozygous recessive individual (<strong>aa</strong>). The offspring show a 50% dominant : 50% recessive phenotype ratio. What is the probability (%) that the unknown parent has genotype <strong>Aa</strong>?',
            answer: 100,
            answerTex: '100%',
            options: [],
            hintTex: [
                'A testcross reveals the unknown genotype. If the ratio is 1:1, the parent must be heterozygous.',
                'If unknown is AA × aa: all offspring are Aa (all dominant, 0% recessive). If Aa × aa: 50% Aa + 50% aa (1:1 ratio).'
            ],
            explain: 'In a testcross (unknown × aa):<br>- If unknown = AA: all offspring are Aa (100% dominant)<br>- If unknown = Aa: offspring are 50% Aa + 50% aa (1:1 ratio)<br>Since we observe a 1:1 ratio, the parent <strong>must</strong> be Aa. Probability = <strong>100%</strong>.'
        };
    },

    // 6. Sex-linked colour blindness - free answer - Hard
    qSexLinked() {
        return {
            type: 'free',
            rule: 'Sex-Linked Inheritance',
            difficulty: 'hard',
            text: 'Colour blindness is X-linked recessive (allele X<sup>b</sup>). A carrier female (X<sup>B</sup>X<sup>b</sup>) mates with a normal-vision male (X<sup>B</sup>Y). What percentage (%) of their <strong>sons</strong> are expected to be colour blind?',
            answer: 50,
            answerTex: '50%',
            options: [],
            hintTex: [
                'Sons inherit their X chromosome from the mother only. The mother has X^B and X^b.',
                'Sons: X^B Y (normal) and X^b Y (colour blind) - each has 50% probability.'
            ],
            explain: 'Cross: X<sup>B</sup>X<sup>b</sup> (carrier female) × X<sup>B</sup>Y (normal male).<br>Possible offspring: X<sup>B</sup>X<sup>B</sup> (normal female), X<sup>B</sup>X<sup>b</sup> (carrier female), X<sup>B</sup>Y (normal male), X<sup>b</sup>Y (colour blind male).<br>Of the sons, X<sup>B</sup>Y : X<sup>b</sup>Y = 1:1, so <strong>50% of sons are colour blind</strong>.'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy:   [this.qMonohybridCross, this.qMonohybridRatio, this.qDominance],
            medium: [this.qDihybridCross, this.qGenotype],
            hard:   [this.qSexLinked, this.qDihybridCross]
        };
        this.allPool = [
            ...this.pools.easy, ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('genetics', this);
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
            <button class="back-btn" onclick="BIO_GENETICS.unload()">Topic D: Continuity and Change</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Genetics and Inheritance</h1><p>IB Biology D.3/D.4 - Mendelian genetics, Punnett squares, inheritance patterns</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="BIO_GENETICS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="BIO_GENETICS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="BIO_GENETICS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="BIO_GENETICS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="bgen-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="bgen-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="bgen-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="bgen-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="bgen-rule"></span>
                <span class="difficulty-tag" id="bgen-difficulty"></span>
                <div class="question-text" id="bgen-text"></div>
                <div class="question-prompt" id="bgen-latex"></div>
                <div id="bgen-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="bgen-hint-box"></div>
            <div class="feedback" id="bgen-feedback">
                <div class="feedback-title" id="bgen-feedback-title"></div>
                <div class="feedback-explanation" id="bgen-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="bgen-hint-btn" onclick="BIO_GENETICS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="bgen-next-btn" onclick="BIO_GENETICS.next_q()" style="display:none;">Next Question</button>
            </div>`;
        this.loadQuestion();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-d');
    },

    loadQuestion() {
        this.answered = false; this.hintIdx = 0;
        const hintBox = document.getElementById('bgen-hint-box');
        if (hintBox) { hintBox.classList.remove('show'); hintBox.innerHTML = ''; }
        const fb = document.getElementById('bgen-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nextBtn = document.getElementById('bgen-next-btn');
        if (nextBtn) nextBtn.style.display = 'none';

        this.currentQ = this.next();
        const q = this.currentQ;
        const dlabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
        const ruleEl = document.getElementById('bgen-rule');
        const diffEl = document.getElementById('bgen-difficulty');
        const textEl = document.getElementById('bgen-text');
        const optArea = document.getElementById('bgen-options-area');

        if (ruleEl) ruleEl.textContent = q.rule;
        if (diffEl) { diffEl.textContent = dlabels[q.difficulty]; diffEl.className = 'difficulty-tag ' + q.difficulty; }
        if (textEl) textEl.innerHTML = q.text;

        if (q.type === 'mc') {
            let h = '<div class="mc-options">';
            q.options.forEach((opt, i) => {
                h += `<button class="mc-option" data-i="${i}" onclick="BIO_GENETICS.checkMC(${i})">${opt}</button>`;
            });
            h += '</div>';
            if (optArea) optArea.innerHTML = h;
        } else {
            if (optArea) optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" id="bgen-input" class="free-input" placeholder="Enter % answer" step="any"/>
                    <button class="btn btn-primary" onclick="BIO_GENETICS.checkFree()">Check</button>
                </div>`;
            setTimeout(() => {
                const inp = document.getElementById('bgen-input');
                if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') BIO_GENETICS.checkFree(); });
            }, 100);
        }
        if (typeof renderMath === 'function') renderMath();
    },

    checkMC(i) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ;
        const ok = i === q.correctIndex;
        document.querySelectorAll('#bgen-options-area .mc-option').forEach((btn, j) => {
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
        const inp = document.getElementById('bgen-input');
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
        const scoreEl = document.getElementById('bgen-score');
        const totalEl = document.getElementById('bgen-total');
        const streakEl = document.getElementById('bgen-streak');
        const accEl = document.getElementById('bgen-accuracy');
        if (scoreEl) scoreEl.textContent = this.score;
        if (totalEl) totalEl.textContent = this.total;
        if (streakEl) streakEl.textContent = this.streak;
        if (accEl) accEl.textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '-';
        if (typeof saveActivityStats === 'function') saveActivityStats('genetics', this, ok);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('bgen-feedback');
        if (!fb) return;
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('bgen-feedback-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('bgen-feedback-explanation').innerHTML = html;
        const nb = document.getElementById('bgen-next-btn');
        if (nb) nb.style.display = 'inline-block';
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('bgen-hint-box');
        if (box) {
            box.classList.add('show');
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + q.hintTex[this.hintIdx];
            this.hintIdx++;
        }
    },

    next_q() { this.loadQuestion(); }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['genetics'] = () => BIO_GENETICS.load();
