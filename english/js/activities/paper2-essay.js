/* ================================================================
   ACTIVITY: Paper 2 Essay Skills (IB English A)
   ================================================================ */
const ENG_PAPER2 = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,
    pool: [],

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    buildPool() {
        return [
            {
                type: 'mc', rule: 'Essay Structure', difficulty: 'easy',
                text: 'In a Paper 2 comparative essay, what should your thesis statement do?',
                answer: 'State a claim that compares both texts in relation to the essay question',
                wrong: [
                    'Summarise the plot of both texts separately',
                    'List the literary devices found in each text',
                    'Describe the biography of each author'
                ],
                hintTex: ['A thesis is an arguable claim, not a fact or summary.', 'It must refer to BOTH texts and address the question directly.'],
                explain: 'A strong Paper 2 thesis makes a specific, arguable claim that directly addresses the question and names both works. Example: "Both Achebe\'s Things Fall Apart and Adichie\'s Purple Hibiscus use the collapse of patriarchal authority to explore the tension between tradition and modernity."'
            },
            {
                type: 'mc', rule: 'Comparison Technique', difficulty: 'medium',
                text: 'Which of the following represents the best comparative linking phrase for a body paragraph?',
                answer: 'Similarly, Fitzgerald uses light symbolism to... while Salinger\'s use of the red hunting hat...',
                wrong: [
                    'Fitzgerald\'s The Great Gatsby is about the American Dream.',
                    'In conclusion, both texts explore similar themes.',
                    'Salinger was born in 1919. He wrote The Catcher in the Rye in 1951.'
                ],
                hintTex: ['Comparison requires explicit linking language: "similarly," "in contrast," "whereas," "both."', 'Context about the author is not comparison.'],
                explain: 'Effective comparative writing weaves textual analysis together, linking both texts within paragraphs using phrases like "similarly," "in contrast," "whereas," and "both." Avoid treating each text in isolation (the "lump sum" approach).'
            },
            {
                type: 'mc', rule: 'Embedding Evidence', difficulty: 'medium',
                text: 'Which of these best demonstrates evidence "embedded" into analysis (rather than simply quoted)?',
                answer: 'The green light becomes a symbol of Gatsby\'s "orgastic future" - the word "orgastic" suggesting an almost painful, unsatisfiable longing.',
                wrong: [
                    'Fitzgerald writes: "So we beat on, boats against the current."',
                    'There are many examples of symbolism in The Great Gatsby.',
                    'Fitzgerald uses the green light. This shows Gatsby wants Daisy.'
                ],
                hintTex: ['Embedding means weaving the quotation into your sentence, then analysing specific word choices.', 'Point - Evidence - Analysis: zoom in on a single word or phrase.'],
                explain: 'Embedded evidence integrates the quotation into a sentence (rather than just dropping it in), then immediately analyses specific language choices. This is more analytical than stating what happens followed by a standalone quote.'
            },
            {
                type: 'mc', rule: 'Paper 2 Criteria', difficulty: 'easy',
                text: 'Paper 2 is marked on four criteria. Which criterion focuses specifically on how well you COMPARE the two texts?',
                answer: 'Criterion B - Organisation and development',
                wrong: [
                    'Criterion A - Knowledge and understanding',
                    'Criterion C - Language',
                    'Criterion D - Personal response'
                ],
                hintTex: ['Criterion A = knowledge. Criterion B = structure and comparison. Criterion C = language quality.', 'Think about which criterion would care about the structure of your argument.'],
                explain: 'Criterion B rewards how well students structure their comparative argument - including the organisation of ideas, development of the thesis, and the quality of comparison between works. Criterion A checks textual knowledge; Criterion C assesses formal language use.'
            },
            {
                type: 'mc', rule: 'HL vs SL', difficulty: 'easy',
                text: 'What is the key difference between Paper 2 at SL and HL?',
                answer: 'HL students write on one question only but must show deeper analysis; HL has an additional unseen essay component',
                wrong: [
                    'SL students compare two texts; HL students only analyse one text',
                    'HL students have more time but the same number of questions',
                    'SL and HL Paper 2 are identical in format'
                ],
                hintTex: ['Both SL and HL compare two works in Paper 2.', 'HL requires greater depth and has a different essay structure.'],
                explain: 'Both SL and HL Paper 2 require comparison of two works studied in the course. However, HL demands deeper analytical insight and a more sophisticated essay structure. HL students also complete an additional HL essay (a 1200-1500 word formal essay submitted as coursework).'
            },
            {
                type: 'mc', rule: 'Paragraph Structure', difficulty: 'medium',
                text: 'In an IB Paper 2 body paragraph, what does "A" stand for in the PEAL structure?',
                answer: 'Analysis - unpacking specific language choices and their effect',
                wrong: [
                    'Author - identifying who wrote the text',
                    'Audience - describing who the text is aimed at',
                    'Argument - restating the thesis'
                ],
                hintTex: ['PEAL = Point, Evidence, Analysis, Link.', 'Analysis means explaining HOW the language creates meaning - not just WHAT it means.'],
                explain: 'PEAL: <strong>P</strong>oint (your claim), <strong>E</strong>vidence (quotation), <strong>A</strong>nalysis (unpack specific word choices, techniques, effects - the WHY), <strong>L</strong>ink (back to thesis or forward to next point). The Analysis step is where most marks are earned or lost.'
            },
            {
                type: 'mc', rule: 'Introduction Writing', difficulty: 'medium',
                text: 'What should a Paper 2 introduction NOT typically include?',
                answer: 'A plot summary of each text',
                wrong: [
                    'Your thesis statement',
                    'The titles and authors of both texts',
                    'A brief indication of how you will approach the question'
                ],
                hintTex: ['The examiner has read the texts - they do not need a summary.', 'Your introduction should orient the argument, not retell the story.'],
                explain: 'Avoid plot summaries in your introduction - the examiner knows the texts. A strong introduction: names both texts and authors, contextualises the question briefly, and states a clear comparative thesis. It should be 2-4 sentences.'
            },
            {
                type: 'mc', rule: 'Conclusion Writing', difficulty: 'easy',
                text: 'What is the primary purpose of the conclusion in a Paper 2 essay?',
                answer: 'To synthesise your argument and restate how both texts respond to the question',
                wrong: [
                    'To introduce a new point that could not fit in the body',
                    'To summarise each paragraph you wrote in the body',
                    'To compare the authors\' biographies'
                ],
                hintTex: ['A conclusion looks backward (synthesises) and can look outward (broader significance).', 'Never introduce new evidence in a conclusion.'],
                explain: 'A conclusion should synthesise - bringing together your comparative argument in a way that feels conclusive. It may broaden the significance of your discussion (e.g., what the comparison reveals about the human condition) without introducing new textual evidence.'
            }
        ];
    },

    load() {
        this.score = 0; this.total = 0; this.streak = 0;
        this.pool = this.shuffle(this.buildPool());
        const c = document.getElementById('activity-container');
        if (!c) return;
        c.innerHTML = `
            <div class="activity-header">
                <button class="back-btn" onclick="showView('topic-b')">Paper 2 Essay</button>
                <h1 class="activity-title">Paper 2 Essay Skills</h1>
                <p class="activity-subtitle">Comparative essay structure, evidence, and exam technique</p>
                <div class="score-bar">
                    <span id="score-display">Score: 0/0</span>
                    <span id="streak-display">Streak: 0</span>
                </div>
            </div>
            <div id="question-area"></div>`;
        this.next();
    },

    next() {
        this.answered = false; this.hintIndex = 0;
        if (this.pool.length === 0) this.pool = this.shuffle(this.buildPool());
        this.currentQ = this.pool.pop();
        this.render();
    },

    render() {
        const q = this.currentQ;
        const qa = document.getElementById('question-area');
        if (!qa) return;
        const tagClass = q.difficulty === 'easy' ? 'diff-easy' : q.difficulty === 'medium' ? 'diff-medium' : 'diff-hard';
        let html = `<div class="question-card">
            <div class="question-meta"><span class="rule-tag">${q.rule}</span><span class="difficulty-tag ${tagClass}">${q.difficulty}</span></div>
            <div class="question-text">${q.text}</div>
            <div class="mc-options">`;
        q.options.forEach((o, i) => {
            html += `<button class="mc-option" onclick="ENG_PAPER2.checkMC(${i})">${o}</button>`;
        });
        html += `</div>
            <div class="hint-area" id="hint-area"></div>
            <div class="feedback-area" id="feedback-area" style="display:none;"></div>
            <div class="action-bar"><button class="btn btn-hint" onclick="ENG_PAPER2.showHint()">Hint</button></div>
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
        const fa = document.getElementById('feedback-area');
        if (!fa) return;
        fa.style.display = 'block';
        fa.innerHTML = `<div class="feedback ${correct ? 'correct' : 'incorrect'}">
            <strong>${correct ? 'Correct!' : 'Not quite.'}</strong>
            <span class="explain">${q.explain}</span>
        </div>
        <button class="btn btn-primary btn-next" onclick="ENG_PAPER2.next()">Next Question</button>`;
    },

    showHint() {
        const q = this.currentQ;
        if (!q.hintTex || this.hintIndex >= q.hintTex.length) return;
        const ha = document.getElementById('hint-area');
        if (ha) ha.innerHTML += '<div class="hint-item">' + q.hintTex[this.hintIndex] + '</div>';
        this.hintIndex++;
    },

    updateStats(correct) {
        this.total++;
        if (correct) { this.score++; this.streak++; } else { this.streak = 0; }
        const sd = document.getElementById('score-display');
        const st = document.getElementById('streak-display');
        if (sd) sd.textContent = 'Score: ' + this.score + '/' + this.total;
        if (st) st.textContent = 'Streak: ' + this.streak;
        try {
            const key = 'english_activityStats';
            var stats = JSON.parse(localStorage.getItem(key) || '{}');
            if (!stats['paper2-essay']) stats['paper2-essay'] = { score: 0, total: 0, bestStreak: 0 };
            stats['paper2-essay'].score = (stats['paper2-essay'].score || 0) + (correct ? 1 : 0);
            stats['paper2-essay'].total = (stats['paper2-essay'].total || 0) + 1;
            stats['paper2-essay'].bestStreak = Math.max(stats['paper2-essay'].bestStreak || 0, this.streak);
            localStorage.setItem(key, JSON.stringify(stats));
        } catch(e) {}
    }
};

// Build options from pool at load time
(function patchENG_PAPER2() {
    const origBuild = ENG_PAPER2.buildPool;
    ENG_PAPER2.buildPool = function() {
        const qs = origBuild.call(this);
        return qs.map(q => {
            if (q.type === 'mc' && !q.options) {
                q.options = ENG_PAPER2.shuffle([q.answer, ...q.wrong]);
            }
            return q;
        });
    };
})();
