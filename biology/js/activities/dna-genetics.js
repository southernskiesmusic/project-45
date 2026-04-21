/* ================================================================
   ACTIVITY: DNA and Gene Expression (IB Biology B.2)
   ================================================================ */
const BIO_DNA = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false, hintIdx: 0, level: 'all',

    generators: ['qDnaStructure', 'qReplication', 'qTranscription', 'qTranslation', 'qMutation', 'qCodon'],

    qDnaStructure() {
        const questions = [
            {
                text: 'Which bases are complementary in DNA?',
                answer: 'A-T and G-C',
                wrong: ['A-G and T-C', 'A-C and G-T', 'A-U and G-C'],
                explain: 'In DNA: Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds; Guanine (G) pairs with Cytosine (C) via 3 hydrogen bonds. (RNA uses Uracil instead of Thymine.)'
            },
            {
                text: 'What type of bond holds the two strands of a DNA double helix together?',
                answer: 'Hydrogen bonds',
                wrong: ['Covalent bonds', 'Ionic bonds', 'Peptide bonds'],
                explain: 'The two strands are held together by hydrogen bonds between complementary base pairs. The sugar-phosphate backbone is held together by covalent bonds, but the inter-strand connections are hydrogen bonds.'
            },
            {
                text: 'Which component is NOT found in a DNA nucleotide?',
                answer: 'Uracil',
                wrong: ['Deoxyribose sugar', 'Phosphate group', 'Adenine'],
                explain: 'A DNA nucleotide consists of a deoxyribose sugar, a phosphate group, and one of four nitrogenous bases: Adenine, Thymine, Guanine, or Cytosine. Uracil is found in RNA, not DNA.'
            },
            {
                text: 'A DNA strand reads 5\'-ATCGGA-3\'. What is the complementary strand (written 5\' to 3\')?',
                answer: '5\'-TCCGAT-3\'',
                wrong: ['5\'-ATCGGA-3\'', '5\'-TAGCCT-3\'', '5\'-ATGGCT-3\''],
                explain: 'The complementary strand runs antiparallel: the complement of 5\'-ATCGGA-3\' is 3\'-TAGCCT-5\', which written 5\' to 3\' is TCCGAT.'
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc', rule: 'DNA Structure', difficulty: 'easy',
            text: q.text, answer: q.answer, answerTex: q.answer,
            options: opts, correctIndex: opts.indexOf(q.answer),
            hintTex: ['Think about complementary base pairing: A-T, G-C.', 'The double helix has two antiparallel strands.'],
            explain: q.explain
        };
    },

    qReplication() {
        const questions = [
            {
                text: 'DNA replication is described as "semi-conservative". What does this mean?',
                answer: 'Each new DNA molecule contains one original strand and one new strand',
                wrong: [
                    'Both strands of the original DNA are broken down and two entirely new molecules are made',
                    'One new DNA molecule is entirely original, the other is entirely new',
                    'Small fragments of the original DNA are conserved in the new molecules'
                ],
                explain: 'Semi-conservative replication means each daughter DNA molecule retains one original (parental) strand and synthesises one new complementary strand. This was confirmed by the Meselson-Stahl experiment (1958).'
            },
            {
                text: 'Which enzyme synthesises new DNA strands during replication?',
                answer: 'DNA polymerase',
                wrong: ['RNA polymerase', 'Helicase', 'Ligase'],
                explain: 'DNA polymerase adds complementary nucleotides to the template strand in the 5\' to 3\' direction. Helicase unwinds the double helix; ligase joins Okazaki fragments on the lagging strand.'
            },
            {
                text: 'What is the role of helicase in DNA replication?',
                answer: 'It unwinds and separates the two DNA strands by breaking hydrogen bonds',
                wrong: [
                    'It adds new nucleotides to the growing strand',
                    'It joins Okazaki fragments on the lagging strand',
                    'It synthesises a short RNA primer to initiate replication'
                ],
                explain: 'Helicase breaks the hydrogen bonds between base pairs, unwinding the double helix to create a replication fork where both strands can serve as templates.'
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc', rule: 'DNA Replication', difficulty: 'medium',
            text: q.text, answer: q.answer, answerTex: q.answer,
            options: opts, correctIndex: opts.indexOf(q.answer),
            hintTex: ['Think about the roles of each enzyme involved.', 'Semi-conservative: one old strand + one new strand per daughter molecule.'],
            explain: q.explain
        };
    },

    qTranscription() {
        const questions = [
            {
                text: 'During transcription, which molecule is produced from the DNA template?',
                answer: 'mRNA (messenger RNA)',
                wrong: ['tRNA (transfer RNA)', 'A new DNA strand', 'A protein'],
                explain: 'Transcription produces a single-stranded mRNA molecule using one DNA strand as a template. RNA polymerase reads the template strand 3\' to 5\' and produces mRNA in the 5\' to 3\' direction.'
            },
            {
                text: 'In transcription, the DNA template strand reads 3\'-TACGGA-5\'. What is the mRNA produced?',
                answer: '5\'-AUGCCU-3\'',
                wrong: ['5\'-TACGGA-3\'', '5\'-ATGCCT-3\'', '5\'-UACGGA-3\''],
                explain: 'RNA is complementary and antiparallel to the DNA template. T pairs with A (and in RNA, A pairs with U). So 3\'-TACGGA-5\' gives mRNA 5\'-AUGCCU-3\'.'
            },
            {
                text: 'Where does transcription take place in a eukaryotic cell?',
                answer: 'In the nucleus',
                wrong: ['In the ribosome', 'In the mitochondria only', 'In the cytoplasm'],
                explain: 'Transcription occurs in the nucleus, where DNA is located. The resulting pre-mRNA is processed (5\' cap, poly-A tail, intron splicing) before being exported to the cytoplasm for translation.'
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc', rule: 'Transcription', difficulty: 'medium',
            text: q.text, answer: q.answer, answerTex: q.answer,
            options: opts, correctIndex: opts.indexOf(q.answer),
            hintTex: ['Transcription = DNA -> RNA. Translation = RNA -> protein.', 'In RNA, Uracil (U) replaces Thymine (T).'],
            explain: q.explain
        };
    },

    qTranslation() {
        const questions = [
            {
                text: 'What is the role of tRNA in translation?',
                answer: 'It carries specific amino acids to the ribosome, matching anticodons to mRNA codons',
                wrong: [
                    'It carries genetic information from the nucleus to the ribosome',
                    'It forms part of the ribosome structure',
                    'It catalyses the formation of peptide bonds between amino acids'
                ],
                explain: 'tRNA molecules have two key sites: an anticodon (3 bases complementary to the mRNA codon) and an amino acid attachment site. tRNA brings the correct amino acid to the ribosome based on codon-anticodon complementarity.'
            },
            {
                text: 'Which codon signals the start of translation?',
                answer: 'AUG',
                wrong: ['UAA', 'UGA', 'UAG'],
                explain: 'AUG is the start codon; it codes for methionine and initiates translation. UAA, UGA, and UAG are stop codons that signal the end of the polypeptide chain.'
            },
            {
                text: 'A codon consists of how many bases?',
                answer: '3 bases (a triplet)',
                wrong: ['1 base', '2 bases', '4 bases'],
                explain: 'The genetic code uses triplet codons - groups of 3 mRNA bases that specify a single amino acid. With 4 possible bases, 4³ = 64 possible codons exist, coding for 20 amino acids (the code is degenerate - multiple codons per amino acid).'
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc', rule: 'Translation', difficulty: 'medium',
            text: q.text, answer: q.answer, answerTex: q.answer,
            options: opts, correctIndex: opts.indexOf(q.answer),
            hintTex: ['Translation = mRNA -> protein. Occurs at ribosomes.', 'Codons are triplets of mRNA bases; anticodons are on tRNA.'],
            explain: q.explain
        };
    },

    qMutation() {
        const questions = [
            {
                text: 'A gene mutation changes one base pair in the coding sequence but does NOT alter the amino acid produced. This is called a:',
                answer: 'Silent (synonymous) mutation',
                wrong: ['Missense mutation', 'Nonsense mutation', 'Frameshift mutation'],
                explain: 'A silent mutation changes a codon but still codes for the same amino acid (due to degeneracy of the genetic code). A missense mutation changes the amino acid; a nonsense mutation creates a stop codon; a frameshift shifts the reading frame entirely.'
            },
            {
                text: 'A frameshift mutation occurs when:',
                answer: 'A base is inserted or deleted, shifting the reading frame of all downstream codons',
                wrong: [
                    'One base is substituted for another',
                    'A codon is changed to a stop codon',
                    'Large sections of DNA are duplicated'
                ],
                explain: 'Frameshift mutations (insertions or deletions of non-multiples of 3 bases) shift the triplet reading frame. This usually drastically alters the amino acid sequence from the mutation point onwards, often producing a non-functional protein.'
            }
        ];
        const q = MathUtils.pick(questions);
        const opts = MathUtils.shuffle([q.answer, ...q.wrong]);
        return {
            type: 'mc', rule: 'Gene Mutations', difficulty: 'medium',
            text: q.text, answer: q.answer, answerTex: q.answer,
            options: opts, correctIndex: opts.indexOf(q.answer),
            hintTex: ['Mutations can be silent, missense, nonsense, or frameshift.', 'Insertions and deletions of 1 or 2 bases cause frameshift mutations.'],
            explain: q.explain
        };
    },

    qCodon() {
        const codonTable = {
            'AUG': 'Methionine (start)',
            'UUU': 'Phenylalanine',
            'UAA': 'Stop',
            'GGG': 'Glycine',
            'CCU': 'Proline'
        };
        const pairs = Object.entries(codonTable);
        const [codon, aa] = MathUtils.pick(pairs);
        const distractors = pairs.filter(p => p[0] !== codon).map(p => p[1]);
        const opts = MathUtils.shuffle([aa, ...distractors.slice(0, 3)]);
        return {
            type: 'mc', rule: 'Genetic Code', difficulty: 'easy',
            text: 'Using your knowledge of the genetic code, what does the codon <strong>' + codon + '</strong> code for?',
            answer: aa, answerTex: aa,
            options: opts, correctIndex: opts.indexOf(aa),
            hintTex: ['AUG always codes for Methionine and is the start codon.', 'UAA, UAG, UGA are stop codons.'],
            explain: '<strong>' + codon + '</strong> codes for <strong>' + aa + '</strong>. The genetic code is universal - the same codons specify the same amino acids in almost all organisms.'
        };
    },

    load() {
        this.score = 0; this.total = 0; this.streak = 0;
        const c = document.getElementById('activity-container');
        if (!c) return;
        c.innerHTML = `
            <div class="activity-header">
                <button class="back-btn" onclick="showView('topic-b')">DNA and Gene Expression</button>
                <h1 class="activity-title">DNA and Gene Expression</h1>
                <p class="activity-subtitle">DNA structure, replication, transcription, translation, mutations</p>
                <div class="score-bar">
                    <span id="score-display">Score: 0/0</span>
                    <span id="streak-display">Streak: 0</span>
                </div>
            </div>
            <div id="question-area"></div>`;
        this.next();
    },

    next() {
        this.answered = false; this.hintIdx = 0;
        const gen = MathUtils.pick(this.generators);
        this.currentQ = this[gen]();
        this.render();
    },

    render() {
        const q = this.currentQ;
        const qa = document.getElementById('question-area');
        if (!qa) return;
        const tagClass = q.difficulty === 'easy' ? 'diff-easy' : q.difficulty === 'medium' ? 'diff-medium' : 'diff-hard';
        let html = `<div class="question-card">
            <div class="question-meta"><span class="rule-tag">${q.rule}</span><span class="difficulty-tag ${tagClass}">${q.difficulty}</span></div>
            <div class="question-text">${q.text}</div>`;
        if (q.type === 'mc') {
            html += '<div class="mc-options">';
            q.options.forEach((o, i) => {
                html += `<button class="mc-option" onclick="BIO_DNA.checkMC(${i})">${o}</button>`;
            });
            html += '</div>';
        }
        html += `<div class="hint-area" id="hint-area"></div>
            <div class="feedback-area" id="feedback-area" style="display:none;"></div>
            <div class="action-bar">
                <button class="btn btn-hint" onclick="BIO_DNA.showHint()">Hint</button>
                ${q.type !== 'mc' ? '<button class="btn btn-primary" onclick="BIO_DNA.checkFree()">Check</button>' : ''}
            </div>
        </div>`;
        qa.innerHTML = html;
    },

    checkMC(idx) {
        if (this.answered) return;
        this.answered = true;
        const q = this.currentQ;
        const correct = q.options[idx] === q.answer;
        this.updateStats(correct);
        document.querySelectorAll('.mc-option').forEach((btn, i) => {
            btn.disabled = true;
            if (q.options[i] === q.answer) btn.classList.add('correct');
            else if (i === idx && !correct) btn.classList.add('incorrect');
        });
        this.showFeedback(correct, q.answer, q.explain);
    },

    checkFree() {
        if (this.answered) return;
        this.answered = true;
        const inp = document.getElementById('free-input');
        const userVal = parseFloat(inp ? inp.value : 0);
        const correct = Math.abs(userVal - this.currentQ.answer) <= Math.abs(this.currentQ.answer * 0.01) + 0.01;
        this.updateStats(correct);
        this.showFeedback(correct, this.currentQ.answerTex, this.currentQ.explain);
    },

    showHint() {
        const q = this.currentQ;
        if (!q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const ha = document.getElementById('hint-area');
        if (ha) { ha.innerHTML += '<div class="hint-item">' + q.hintTex[this.hintIdx] + '</div>'; }
        this.hintIdx++;
    },

    showFeedback(correct, answerTex, explain) {
        const fa = document.getElementById('feedback-area');
        if (!fa) return;
        fa.style.display = 'block';
        fa.innerHTML = `<div class="feedback ${correct ? 'correct' : 'incorrect'}">
            <strong>${correct ? 'Correct!' : 'Not quite.'}</strong> ${!correct ? 'Answer: ' + answerTex + '<br>' : ''}
            <span class="explain">${explain}</span>
        </div>
        <button class="btn btn-primary btn-next" onclick="BIO_DNA.next()">Next Question</button>`;
    },

    updateStats(correct) {
        this.total++;
        if (correct) { this.score++; this.streak++; } else { this.streak = 0; }
        const sd = document.getElementById('score-display');
        const st = document.getElementById('streak-display');
        if (sd) sd.textContent = 'Score: ' + this.score + '/' + this.total;
        if (st) st.textContent = 'Streak: ' + this.streak;
        try {
            const key = 'biology_activityStats';
            var stats = JSON.parse(localStorage.getItem(key) || '{}');
            if (!stats['dna-genetics']) stats['dna-genetics'] = { score: 0, total: 0, bestStreak: 0 };
            stats['dna-genetics'].score = (stats['dna-genetics'].score || 0) + (correct ? 1 : 0);
            stats['dna-genetics'].total = (stats['dna-genetics'].total || 0) + 1;
            stats['dna-genetics'].bestStreak = Math.max(stats['dna-genetics'].bestStreak || 0, this.streak);
            localStorage.setItem(key, JSON.stringify(stats));
        } catch(e) {}
    }
};
