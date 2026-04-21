const BIO_ECOLOGY = {
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

    // 1. Energy transfer 10% rule - free answer - Easy
    qEnergyTransfer() {
        const producerEnergy = MathUtils.pick([1000, 2000, 5000, 10000]);
        const consumerEnergy = producerEnergy * 0.1;
        return {
            type: 'free',
            rule: 'Energy Transfer (10% Rule)',
            difficulty: 'easy',
            text: 'A grassland ecosystem has <strong>' + producerEnergy + ' kJ</strong> of energy stored at the producer trophic level. Assuming 10% ecological efficiency, how much energy (kJ) is available at the <strong>primary consumer</strong> level?',
            answer: consumerEnergy,
            answerTex: consumerEnergy + ' kJ',
            options: [],
            hintTex: [
                'The 10% rule: only about 10% of energy passes from one trophic level to the next.',
                'Primary consumer energy = ' + producerEnergy + ' × 10/100 = ' + producerEnergy + ' × 0.1'
            ],
            explain: 'Using the 10% efficiency rule:<br>Energy at primary consumers = ' + producerEnergy + ' × 0.1 = <strong>' + consumerEnergy + ' kJ</strong>.<br>The remaining 90% is lost mainly as heat through respiration.'
        };
    },

    // 2. Trophic level terminology - MC - Easy
    qTrophicLevel() {
        const questions = [
            {
                text: 'An organism that feeds exclusively on plants is called a:',
                answer: 'Primary consumer (herbivore)',
                wrong: ['Secondary consumer', 'Decomposer', 'Producer']
            },
            {
                text: 'Which term describes an organism that makes its own food using sunlight?',
                answer: 'Producer (autotroph)',
                wrong: ['Primary consumer', 'Decomposer', 'Omnivore']
            },
            {
                text: 'A fox that eats rabbits (which eat grass) occupies which trophic level?',
                answer: 'Secondary consumer (3rd trophic level)',
                wrong: ['Primary consumer (2nd trophic level)', 'Producer (1st trophic level)', 'Tertiary consumer (4th trophic level)']
            },
            {
                text: 'Bacteria and fungi that break down dead organic matter are called:',
                answer: 'Decomposers / saprotrophs',
                wrong: ['Producers', 'Primary consumers', 'Tertiary consumers']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Trophic Levels',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Trophic levels: Producers (plants) → Primary consumers (herbivores) → Secondary consumers → Tertiary consumers.',
                'Decomposers break down dead matter and are not typically assigned a trophic level in a food chain.'
            ],
            explain: '<strong>' + q.answer + '</strong>. Food chains always start with a producer. Each link represents a feeding (trophic) level, with energy decreasing at each step.'
        };
    },

    // 3. Ecological efficiency calculation - free answer - Medium
    qEcologicalEfficiency() {
        const level2 = MathUtils.pick([400, 500, 600, 800]);
        const level1 = MathUtils.pick([2000, 4000, 5000, 8000]);
        const efficiency = parseFloat((level2 / level1 * 100).toFixed(1));
        return {
            type: 'free',
            rule: 'Ecological Efficiency',
            difficulty: 'medium',
            text: 'The biomass at trophic level 1 (producers) is <strong>' + level1 + ' kg</strong> and the biomass at trophic level 2 (primary consumers) is <strong>' + level2 + ' kg</strong>. Calculate the ecological efficiency (%) between these levels.',
            answer: efficiency,
            answerTex: efficiency + '%',
            options: [],
            hintTex: [
                'Ecological efficiency = (energy/biomass at next level / energy/biomass at current level) × 100.',
                'Efficiency = (' + level2 + ' / ' + level1 + ') × 100 = ?'
            ],
            explain: 'Ecological efficiency = (biomass at level 2 / biomass at level 1) × 100<br>= (' + level2 + ' / ' + level1 + ') × 100 = <strong>' + efficiency + '%</strong>.<br>This represents how efficiently energy is transferred between trophic levels.'
        };
    },

    // 4. Energy loss in food chains - MC - Easy
    qFoodChain() {
        const questions = [
            {
                text: 'In a food chain, most energy is lost between trophic levels as:',
                answer: 'Heat released during cellular respiration',
                wrong: ['Chemical energy stored in faeces', 'Light energy reflected', 'Electrical energy']
            },
            {
                text: 'Why are food chains rarely longer than 4-5 trophic levels?',
                answer: 'Too little energy remains at higher trophic levels to support a population',
                wrong: ['Organisms at higher levels are too large', 'Predators eat too quickly', 'Photosynthesis cannot produce enough glucose']
            },
            {
                text: 'Energy is lost from a food chain through all of the following EXCEPT:',
                answer: 'Photosynthesis',
                wrong: ['Respiration', 'Excretion (urine/faeces)', 'Movement (heat from muscles)']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Energy Loss',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Energy is lost as heat (respiration), in waste products (faeces, urine), and movement.',
                'Roughly 90% of energy is lost at each trophic level, mainly through respiration.'
            ],
            explain: '<strong>' + q.answer + '</strong>. The majority of energy loss between trophic levels occurs as heat from cellular respiration. Other losses include undigested material in faeces and energy used in movement and maintaining body temperature.'
        };
    },

    // 5. Population doubling growth - free answer - Hard
    qPopulationGrowth() {
        const startPop = MathUtils.pick([100, 200, 250, 500]);
        const doublingTime = 3; // years
        const totalTime = MathUtils.pick([6, 9, 12]);
        const doublings = totalTime / doublingTime;
        const finalPop = startPop * Math.pow(2, doublings);
        return {
            type: 'free',
            rule: 'Population Growth',
            difficulty: 'hard',
            text: 'A bacterial population of <strong>' + startPop + '</strong> doubles every <strong>' + doublingTime + ' years</strong>. What will the population be after <strong>' + totalTime + ' years</strong>?',
            answer: finalPop,
            answerTex: String(finalPop),
            options: [],
            hintTex: [
                'Number of doublings = total time / doubling time = ' + totalTime + ' / ' + doublingTime + ' = ' + doublings + '.',
                'Final population = starting population × 2^(number of doublings) = ' + startPop + ' × 2^' + doublings
            ],
            explain: 'Number of doublings = ' + totalTime + ' / ' + doublingTime + ' = <strong>' + doublings + '</strong>.<br>Final population = ' + startPop + ' × 2<sup>' + doublings + '</sup> = ' + startPop + ' × ' + Math.pow(2, doublings) + ' = <strong>' + finalPop + '</strong>.'
        };
    },

    // 6. Carrying capacity - MC - Easy
    qCarryingCapacity() {
        const questions = [
            {
                text: 'The maximum population size that an environment can sustainably support is called:',
                answer: 'Carrying capacity',
                wrong: ['Population density', 'Biotic potential', 'Limiting factor']
            },
            {
                text: 'In a logistic growth curve, population growth slows as the population approaches:',
                answer: 'The carrying capacity (K)',
                wrong: ['The initial population size', 'The biotic potential maximum', 'Zero']
            },
            {
                text: 'Which of the following is a density-dependent limiting factor for a population?',
                answer: 'Competition for food',
                wrong: ['Temperature change', 'Flood or drought', 'Volcanic eruption']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Carrying Capacity',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Carrying capacity is the maximum population an environment can support given available resources.',
                'When population = carrying capacity, birth rate = death rate and growth rate ≈ 0.'
            ],
            explain: '<strong>' + q.answer + '</strong>. Carrying capacity (K) is set by limited resources such as food, water, space, and light. Logistic growth follows an S-shaped (sigmoid) curve that levels off at K.'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy:   [this.qEnergyTransfer, this.qTrophicLevel, this.qFoodChain, this.qCarryingCapacity],
            medium: [this.qEcologicalEfficiency, this.qTrophicLevel],
            hard:   [this.qPopulationGrowth, this.qEcologicalEfficiency]
        };
        this.allPool = [
            ...this.pools.easy, ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('ecology', this);
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
            <button class="back-btn" onclick="BIO_ECOLOGY.unload()">Topic C: Interaction and Interdependence</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Ecology</h1><p>IB Biology C.1/C.2 - Food chains, energy flow, population dynamics</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="BIO_ECOLOGY.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="BIO_ECOLOGY.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="BIO_ECOLOGY.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="BIO_ECOLOGY.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="beco-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="beco-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="beco-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="beco-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="beco-rule"></span>
                <span class="difficulty-tag" id="beco-difficulty"></span>
                <div class="question-text" id="beco-text"></div>
                <div class="question-prompt" id="beco-latex"></div>
                <div id="beco-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="beco-hint-box"></div>
            <div class="feedback" id="beco-feedback">
                <div class="feedback-title" id="beco-feedback-title"></div>
                <div class="feedback-explanation" id="beco-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="beco-hint-btn" onclick="BIO_ECOLOGY.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="beco-next-btn" onclick="BIO_ECOLOGY.next_q()" style="display:none;">Next Question</button>
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
        const hintBox = document.getElementById('beco-hint-box');
        if (hintBox) { hintBox.classList.remove('show'); hintBox.innerHTML = ''; }
        const fb = document.getElementById('beco-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nextBtn = document.getElementById('beco-next-btn');
        if (nextBtn) nextBtn.style.display = 'none';

        this.currentQ = this.next();
        const q = this.currentQ;
        const dlabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
        const ruleEl = document.getElementById('beco-rule');
        const diffEl = document.getElementById('beco-difficulty');
        const textEl = document.getElementById('beco-text');
        const optArea = document.getElementById('beco-options-area');

        if (ruleEl) ruleEl.textContent = q.rule;
        if (diffEl) { diffEl.textContent = dlabels[q.difficulty]; diffEl.className = 'difficulty-tag ' + q.difficulty; }
        if (textEl) textEl.innerHTML = q.text;

        if (q.type === 'mc') {
            let h = '<div class="mc-options">';
            q.options.forEach((opt, i) => {
                h += `<button class="mc-option" data-i="${i}" onclick="BIO_ECOLOGY.checkMC(${i})">${opt}</button>`;
            });
            h += '</div>';
            if (optArea) optArea.innerHTML = h;
        } else {
            if (optArea) optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" id="beco-input" class="free-input" placeholder="Enter numeric answer" step="any"/>
                    <button class="btn btn-primary" onclick="BIO_ECOLOGY.checkFree()">Check</button>
                </div>`;
            setTimeout(() => {
                const inp = document.getElementById('beco-input');
                if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') BIO_ECOLOGY.checkFree(); });
            }, 100);
        }
        if (typeof renderMath === 'function') renderMath();
    },

    checkMC(i) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ;
        const ok = i === q.correctIndex;
        document.querySelectorAll('#beco-options-area .mc-option').forEach((btn, j) => {
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
        const inp = document.getElementById('beco-input');
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
        const scoreEl = document.getElementById('beco-score');
        const totalEl = document.getElementById('beco-total');
        const streakEl = document.getElementById('beco-streak');
        const accEl = document.getElementById('beco-accuracy');
        if (scoreEl) scoreEl.textContent = this.score;
        if (totalEl) totalEl.textContent = this.total;
        if (streakEl) streakEl.textContent = this.streak;
        if (accEl) accEl.textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '-';
        if (typeof saveActivityStats === 'function') saveActivityStats('ecology', this, ok);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('beco-feedback');
        if (!fb) return;
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('beco-feedback-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('beco-feedback-explanation').innerHTML = html;
        const nb = document.getElementById('beco-next-btn');
        if (nb) nb.style.display = 'inline-block';
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('beco-hint-box');
        if (box) {
            box.classList.add('show');
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + q.hintTex[this.hintIdx];
            this.hintIdx++;
        }
    },

    next_q() { this.loadQuestion(); }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['ecology'] = () => BIO_ECOLOGY.load();
