const BIO_MOLECULES = {
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

    // 1. Monomer of proteins - MC - Easy
    qMonomer() {
        const questions = [
            {
                text: 'What is the monomer (building block) of proteins?',
                answer: 'Amino acids',
                wrong: ['Glucose', 'Fatty acids', 'Nucleotides']
            },
            {
                text: 'What is the monomer of polysaccharides (e.g. starch, glycogen)?',
                answer: 'Monosaccharides (e.g. glucose)',
                wrong: ['Amino acids', 'Glycerol', 'Nucleotides']
            },
            {
                text: 'Nucleic acids (DNA and RNA) are polymers made up of monomers called:',
                answer: 'Nucleotides',
                wrong: ['Amino acids', 'Glucose molecules', 'Fatty acids']
            },
            {
                text: 'Which reaction joins monomers together to form a polymer, releasing a water molecule?',
                answer: 'Condensation (dehydration synthesis)',
                wrong: ['Hydrolysis', 'Oxidation', 'Reduction']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Monomers and Polymers',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Monomer-polymer pairs: amino acids → proteins; glucose → starch/glycogen; nucleotides → DNA/RNA.',
                'Condensation joins monomers (releases H2O). Hydrolysis breaks polymers apart (uses H2O).'
            ],
            explain: '<strong>' + q.answer + '</strong>. Key monomer-polymer pairs in biology: amino acids form proteins; glucose (and other monosaccharides) form polysaccharides; nucleotides form nucleic acids. Condensation reactions link them; hydrolysis reactions break them apart.'
        };
    },

    // 2. Glycosidic bonds - MC - Easy
    qBondType() {
        const questions = [
            {
                text: 'The covalent bond formed between two monosaccharide units (e.g. two glucose molecules) is called a:',
                answer: 'Glycosidic bond',
                wrong: ['Peptide bond', 'Phosphodiester bond', 'Hydrogen bond']
            },
            {
                text: 'Which bond links amino acids together in a polypeptide chain?',
                answer: 'Peptide bond',
                wrong: ['Glycosidic bond', 'Hydrogen bond', 'Disulfide bond']
            },
            {
                text: 'DNA strands are held together in the double helix by:',
                answer: 'Hydrogen bonds between complementary base pairs',
                wrong: ['Covalent bonds', 'Ionic bonds', 'Glycosidic bonds']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Bond Types',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Each class of biomolecule has a characteristic bond type between its monomers.',
                'Carbohydrates: glycosidic; Proteins: peptide; Nucleic acids backbone: phosphodiester; DNA strands: hydrogen bonds.'
            ],
            explain: '<strong>' + q.answer + '</strong>. Bond types to know: glycosidic bonds link monosaccharides; peptide bonds link amino acids; phosphodiester bonds link nucleotides in the backbone; hydrogen bonds hold complementary DNA strands together.'
        };
    },

    // 3. Primary energy storage in animals - MC - Medium
    qFunctionMolecule() {
        const questions = [
            {
                text: 'Which molecule is the primary energy storage polysaccharide in <strong>animals</strong>?',
                answer: 'Glycogen',
                wrong: ['Starch', 'Cellulose', 'Chitin']
            },
            {
                text: 'Cellulose differs from starch because cellulose:',
                answer: 'Has beta-glucose monomers linked by beta-1,4-glycosidic bonds, forming rigid fibres',
                wrong: ['Is made of alpha-glucose in branched chains', 'Is the main energy store in plants', 'Has alpha-1,4 and alpha-1,6 glycosidic bonds']
            },
            {
                text: 'Which molecule serves as the main energy store in plants?',
                answer: 'Starch (amylose + amylopectin)',
                wrong: ['Glycogen', 'Cellulose', 'Sucrose']
            },
            {
                text: 'Triglycerides are a more efficient energy store than carbohydrates because:',
                answer: 'They contain more C-H bonds and release more energy per gram',
                wrong: ['They dissolve easily in water', 'They are made of smaller monomers', 'They are more rapidly digested']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Biomolecule Functions',
            difficulty: 'medium',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Animals store energy as glycogen (in liver and muscle). Plants store energy as starch.',
                'Cellulose provides structural support in plant cell walls - it is NOT an energy store.'
            ],
            explain: '<strong>' + q.answer + '</strong>. Energy storage: animals use glycogen (stored in liver/muscle), plants use starch. Cellulose is a structural polysaccharide (plant cell walls) - it is not broken down for energy in most animals because they lack cellulase.'
        };
    },

    // 4. Protein primary structure - MC - Easy
    qProteinStructure() {
        const questions = [
            {
                text: 'The sequence of amino acids in a polypeptide chain is called the:',
                answer: 'Primary structure',
                wrong: ['Secondary structure', 'Tertiary structure', 'Quaternary structure']
            },
            {
                text: 'Alpha helices and beta-pleated sheets are features of which level of protein structure?',
                answer: 'Secondary structure',
                wrong: ['Primary structure', 'Tertiary structure', 'Quaternary structure']
            },
            {
                text: 'The overall 3D folding of a single polypeptide chain, stabilised by R-group interactions, is the:',
                answer: 'Tertiary structure',
                wrong: ['Primary structure', 'Secondary structure', 'Quaternary structure']
            },
            {
                text: 'Haemoglobin consists of four polypeptide subunits. This arrangement is described as:',
                answer: 'Quaternary structure',
                wrong: ['Primary structure', 'Secondary structure', 'Tertiary structure']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Protein Structure',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                '4 levels: 1° = amino acid sequence; 2° = local folding (helices/sheets); 3° = overall 3D shape; 4° = multiple subunits.',
                'The primary structure determines all higher levels of structure.'
            ],
            explain: '<strong>' + q.answer + '</strong>. The four levels of protein structure: primary (amino acid sequence), secondary (alpha helices, beta sheets from hydrogen bonding in backbone), tertiary (3D shape from R-group interactions), quaternary (multiple polypeptide subunits).'
        };
    },

    // 5. Phospholipid amphipathic property - MC - Medium
    qLipidProperty() {
        const questions = [
            {
                text: 'Phospholipids spontaneously form a bilayer in water because they are:',
                answer: 'Amphipathic - with a hydrophilic phosphate head and hydrophobic fatty acid tails',
                wrong: ['Entirely hydrophobic', 'Entirely hydrophilic', 'Non-polar throughout']
            },
            {
                text: 'In a phospholipid bilayer, the fatty acid tails are oriented:',
                answer: 'Inward, facing each other away from water',
                wrong: ['Outward, facing the water', 'Randomly throughout the membrane', 'Along the surface of the membrane']
            },
            {
                text: 'What is the function of cholesterol in the cell membrane?',
                answer: 'Regulates membrane fluidity - prevents it from being too rigid or too fluid',
                wrong: ['Acts as a receptor for hormones only', 'Forms the hydrophilic heads of phospholipids', 'Transports glucose across the membrane']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'Membrane Lipids',
            difficulty: 'medium',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'Amphipathic = has both a hydrophilic and a hydrophobic region.',
                'The phosphate head is polar (hydrophilic); the fatty acid tails are non-polar (hydrophobic).'
            ],
            explain: '<strong>' + q.answer + '</strong>. Phospholipids are amphipathic: the charged phosphate head group is hydrophilic (attracted to water), while the two fatty acid tails are hydrophobic (repel water). In an aqueous environment, they spontaneously arrange into a bilayer with tails facing inward.'
        };
    },

    // 6. DNA vs RNA differences - MC - Easy
    qDNAvsRNA() {
        const questions = [
            {
                text: 'Which feature distinguishes DNA from RNA?',
                answer: 'DNA contains thymine; RNA contains uracil instead of thymine',
                wrong: ['DNA is single-stranded; RNA is double-stranded', 'DNA contains ribose sugar; RNA contains deoxyribose', 'DNA is found in the cytoplasm; RNA is found in the nucleus']
            },
            {
                text: 'Which sugar is found in DNA (but not RNA)?',
                answer: 'Deoxyribose',
                wrong: ['Ribose', 'Glucose', 'Fructose']
            },
            {
                text: 'mRNA (messenger RNA) carries genetic information from:',
                answer: 'The nucleus to ribosomes in the cytoplasm',
                wrong: ['Ribosomes to the nucleus', 'The mitochondria to the cytoplasm', 'One ribosome to another']
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc',
            rule: 'DNA vs RNA',
            difficulty: 'easy',
            text: q.text,
            answer: q.answer,
            answerTex: q.answer,
            options: opts,
            correctIndex: opts.indexOf(q.answer),
            hintTex: [
                'DNA: double-stranded, deoxyribose sugar, bases A/T/G/C, found in nucleus and mitochondria.',
                'RNA: usually single-stranded, ribose sugar, bases A/U/G/C, involved in protein synthesis.'
            ],
            explain: '<strong>' + q.answer + '</strong>. DNA vs RNA differences: DNA is double-stranded with deoxyribose and thymine (T); RNA is usually single-stranded with ribose and uracil (U) instead of thymine. Both share adenine, guanine, and cytosine.'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy:   [this.qMonomer, this.qBondType, this.qProteinStructure, this.qDNAvsRNA],
            medium: [this.qFunctionMolecule, this.qLipidProperty],
            hard:   [this.qFunctionMolecule, this.qLipidProperty, this.qBondType]
        };
        this.allPool = [
            ...this.pools.easy, ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('biomolecules', this);
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
            <button class="back-btn" onclick="BIO_MOLECULES.unload()">Topic B: Form and Function</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Biomolecules</h1><p>IB Biology B.1 - Carbohydrates, lipids, proteins, nucleic acids</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="BIO_MOLECULES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="BIO_MOLECULES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="BIO_MOLECULES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="BIO_MOLECULES.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="bmol-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="bmol-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="bmol-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="bmol-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="bmol-rule"></span>
                <span class="difficulty-tag" id="bmol-difficulty"></span>
                <div class="question-text" id="bmol-text"></div>
                <div class="question-prompt" id="bmol-latex"></div>
                <div id="bmol-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="bmol-hint-box"></div>
            <div class="feedback" id="bmol-feedback">
                <div class="feedback-title" id="bmol-feedback-title"></div>
                <div class="feedback-explanation" id="bmol-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="bmol-hint-btn" onclick="BIO_MOLECULES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="bmol-next-btn" onclick="BIO_MOLECULES.next_q()" style="display:none;">Next Question</button>
            </div>`;
        this.loadQuestion();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-b');
    },

    loadQuestion() {
        this.answered = false; this.hintIdx = 0;
        const hintBox = document.getElementById('bmol-hint-box');
        if (hintBox) { hintBox.classList.remove('show'); hintBox.innerHTML = ''; }
        const fb = document.getElementById('bmol-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nextBtn = document.getElementById('bmol-next-btn');
        if (nextBtn) nextBtn.style.display = 'none';

        this.currentQ = this.next();
        const q = this.currentQ;
        const dlabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
        const ruleEl = document.getElementById('bmol-rule');
        const diffEl = document.getElementById('bmol-difficulty');
        const textEl = document.getElementById('bmol-text');
        const optArea = document.getElementById('bmol-options-area');

        if (ruleEl) ruleEl.textContent = q.rule;
        if (diffEl) { diffEl.textContent = dlabels[q.difficulty]; diffEl.className = 'difficulty-tag ' + q.difficulty; }
        if (textEl) textEl.innerHTML = q.text;

        if (q.type === 'mc') {
            let h = '<div class="mc-options">';
            q.options.forEach((opt, i) => {
                h += `<button class="mc-option" data-i="${i}" onclick="BIO_MOLECULES.checkMC(${i})">${opt}</button>`;
            });
            h += '</div>';
            if (optArea) optArea.innerHTML = h;
        } else {
            if (optArea) optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" id="bmol-input" class="free-input" placeholder="Enter numeric answer" step="any"/>
                    <button class="btn btn-primary" onclick="BIO_MOLECULES.checkFree()">Check</button>
                </div>`;
            setTimeout(() => {
                const inp = document.getElementById('bmol-input');
                if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') BIO_MOLECULES.checkFree(); });
            }, 100);
        }
        if (typeof renderMath === 'function') renderMath();
    },

    checkMC(i) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ;
        const ok = i === q.correctIndex;
        document.querySelectorAll('#bmol-options-area .mc-option').forEach((btn, j) => {
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
        const inp = document.getElementById('bmol-input');
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
        const scoreEl = document.getElementById('bmol-score');
        const totalEl = document.getElementById('bmol-total');
        const streakEl = document.getElementById('bmol-streak');
        const accEl = document.getElementById('bmol-accuracy');
        if (scoreEl) scoreEl.textContent = this.score;
        if (totalEl) totalEl.textContent = this.total;
        if (streakEl) streakEl.textContent = this.streak;
        if (accEl) accEl.textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '-';
        if (typeof saveActivityStats === 'function') saveActivityStats('biomolecules', this, ok);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('bmol-feedback');
        if (!fb) return;
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        document.getElementById('bmol-feedback-title').textContent = ok ? 'Correct!' : 'Not quite...';
        document.getElementById('bmol-feedback-explanation').innerHTML = html;
        const nb = document.getElementById('bmol-next-btn');
        if (nb) nb.style.display = 'inline-block';
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('bmol-hint-box');
        if (box) {
            box.classList.add('show');
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + q.hintTex[this.hintIdx];
            this.hintIdx++;
        }
    },

    next_q() { this.loadQuestion(); }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['biomolecules'] = () => BIO_MOLECULES.load();
