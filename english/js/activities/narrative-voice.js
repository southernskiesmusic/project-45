/* ================================================================
   ACTIVITY: Narrative Voice (IB English A)
   ================================================================ */
const ENG_NARRATIVE = {
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
                type: 'mc', rule: 'Point of View', difficulty: 'easy',
                text: 'Identify the narrative perspective in: <em>"I walked slowly through the market, watching the vendors call out their prices."</em>',
                answer: 'First-person narrator',
                wrong: ['Third-person omniscient', 'Third-person limited', 'Second-person narrator'],
                hintTex: ['Look for the personal pronoun used by the narrator.', '"I" signals first-person narration.'],
                explain: '<strong>First-person narration</strong> uses "I" or "we." The narrator is a character within the story. This creates intimacy but limits perspective - we only know what the narrator experiences and chooses to tell us.'
            },
            {
                type: 'mc', rule: 'Point of View', difficulty: 'easy',
                text: 'In <em>"He sat at the window, though he could not have known that his world was about to change. Across the city, plans were being made."</em> - what type of narrator is this?',
                answer: 'Third-person omniscient',
                wrong: ['First-person narrator', 'Third-person limited', 'Free indirect discourse'],
                hintTex: ['The narrator seems to know things the character does not.', 'An omniscient narrator can move between locations and minds.'],
                explain: '<strong>Third-person omniscient</strong>: uses "he/she/they" and has access to all characters\' thoughts and knowledge of all events. The phrase "though he could not have known" reveals the narrator knows more than the character - a classic marker of omniscience.'
            },
            {
                type: 'mc', rule: 'Unreliable Narrator', difficulty: 'medium',
                text: 'Which of the following is the strongest indicator of an unreliable narrator?',
                answer: 'The narrator\'s account contradicts evidence presented elsewhere in the text',
                wrong: [
                    'The narrator uses "I" throughout the story',
                    'The narrator is a child',
                    'The narrator describes events in great detail'
                ],
                hintTex: ['Unreliability is shown through contradictions, limited knowledge, or biased motivation.', 'A child narrator may be unreliable, but it\'s not the defining feature.'],
                explain: 'An unreliable narrator is one whose account cannot be fully trusted - due to limited understanding, self-interest, mental state, or deliberate deception. The strongest indicator is contradiction: when what the narrator claims conflicts with other evidence in the text. Steven (Gone Girl), Humbert Humbert (Lolita), and Stevens (The Remains of the Day) are classic examples.'
            },
            {
                type: 'mc', rule: 'Free Indirect Discourse', difficulty: 'hard',
                text: 'Identify the technique in: <em>"Elizabeth looked at Mr Darcy. He was proud. He was insufferable. Why did everyone insist on his good qualities?"</em>',
                answer: 'Free indirect discourse - blending narrator\'s voice with the character\'s thoughts',
                wrong: [
                    'Direct speech - the character is speaking aloud',
                    'Third-person omniscient narration describing objective facts',
                    'Dramatic irony - the reader knows something the character does not'
                ],
                hintTex: ['The passage is in third person but reads like Elizabeth\'s inner thoughts.', 'Free indirect discourse has no speech marks or "she thought that" tags.'],
                explain: '<strong>Free indirect discourse</strong> merges the narrator\'s voice with the character\'s consciousness without quotation marks or reporting tags. The rhetorical question "Why did everyone insist...?" is Elizabeth\'s thought, but expressed in third person. Jane Austen pioneered this technique to deliver ironic character insight.'
            },
            {
                type: 'mc', rule: 'Focalization', difficulty: 'hard',
                text: 'In narratology, "focalization" refers to:',
                answer: 'The perspective through which events are perceived - whose consciousness filters the narrative',
                wrong: [
                    'The identity of the person narrating the story (who tells)',
                    'The use of close-up imagery to focus on details',
                    'The point in time at which the narrator is speaking'
                ],
                hintTex: ['Focalization = who SEES; narration = who SPEAKS.', 'A story can be narrated by one voice but focalised through another character\'s perspective.'],
                explain: 'Focalization (from Gerard Genette) distinguishes between <strong>who tells</strong> (the narrator) and <strong>who perceives</strong> (the focalizer). In third-person limited narration, the narrator is outside the story but events are focalised through a character\'s limited perspective. A third-person story can shift focalizers between chapters.'
            },
            {
                type: 'mc', rule: 'Second Person', difficulty: 'medium',
                text: 'What is the effect of second-person narration ("you walk into the room...") in literary texts?',
                answer: 'It creates direct address, implicating the reader in the narrative and creating an uncomfortable intimacy',
                wrong: [
                    'It distances the reader and makes the story feel objective',
                    'It signals that the narrator is unreliable',
                    'It is only used in instructions and non-literary texts'
                ],
                hintTex: ['Second person = "you." Think about how being directly addressed makes you feel as a reader.', 'Works like Italo Calvino\'s If on a Winter\'s Night a Traveller use second person deliberately.'],
                explain: 'Second-person narration ("you") forces the reader into the role of protagonist, creating immersive, often unsettling effects. It implicates the reader in events - used in texts like Auster\'s The New York Trilogy or choose-your-own-adventure structures. Analyse its effect: does it unsettle, complicate responsibility, or create empathy?'
            },
            {
                type: 'mc', rule: 'Narrative Distance', difficulty: 'medium',
                text: 'Which of these passages demonstrates the most INTIMATE narrative distance?',
                answer: '"My hands were shaking. Why couldn\'t I just tell her the truth? I\'d been lying for so long I had forgotten what the truth even felt like."',
                wrong: [
                    '"He walked into the office at 9am and sat at his usual desk."',
                    '"The city had changed since the war. Buildings that once stood proud were now rubble."',
                    '"The scientists observed that the subject exhibited signs of distress."'
                ],
                hintTex: ['Intimate distance means we are close to the character\'s inner world.', 'Look for internal thoughts, rhetorical questions, emotional language.'],
                explain: 'Narrative distance describes how close the narration is to a character\'s inner consciousness. The most intimate passage accesses the character\'s private doubts and self-recrimination directly. Varying narrative distance is a deliberate technique - close distance creates empathy; distant narration can create irony or objectivity.'
            },
            {
                type: 'mc', rule: 'Retrospective Narration', difficulty: 'medium',
                text: 'A narrator who tells the story looking back at past events from a later point in time is called:',
                answer: 'A retrospective (or retrospective first-person) narrator',
                wrong: [
                    'An omniscient narrator',
                    'A simultaneous narrator',
                    'An extradiegetic narrator'
                ],
                hintTex: ['Think about when the narrator is speaking relative to the events described.', 'Opening lines like "Years later, I would understand..." signal retrospective narration.'],
                explain: 'A retrospective narrator tells events that have already happened from a later vantage point. This creates dramatic irony (the narrating "I" knows the outcome; the experiencing "I" does not) and raises questions about memory, reliability, and selective disclosure. The gap between the narrating and experiencing self is analytically rich.'
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
                <button class="back-btn" onclick="showView('topic-a')">Narrative Voice</button>
                <h1 class="activity-title">Narrative Voice</h1>
                <p class="activity-subtitle">Point of view, focalization, unreliable narrators, narrative distance</p>
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
            html += `<button class="mc-option" onclick="ENG_NARRATIVE.checkMC(${i})">${o}</button>`;
        });
        html += `</div>
            <div class="hint-area" id="hint-area"></div>
            <div class="feedback-area" id="feedback-area" style="display:none;"></div>
            <div class="action-bar"><button class="btn btn-hint" onclick="ENG_NARRATIVE.showHint()">Hint</button></div>
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
        <button class="btn btn-primary btn-next" onclick="ENG_NARRATIVE.next()">Next Question</button>`;
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
            if (!stats['narrative-voice']) stats['narrative-voice'] = { score: 0, total: 0, bestStreak: 0 };
            stats['narrative-voice'].score = (stats['narrative-voice'].score || 0) + (correct ? 1 : 0);
            stats['narrative-voice'].total = (stats['narrative-voice'].total || 0) + 1;
            stats['narrative-voice'].bestStreak = Math.max(stats['narrative-voice'].bestStreak || 0, this.streak);
            localStorage.setItem(key, JSON.stringify(stats));
        } catch(e) {}
    }
};

// Build options at load time
(function patchENG_NARRATIVE() {
    const origBuild = ENG_NARRATIVE.buildPool;
    ENG_NARRATIVE.buildPool = function() {
        const qs = origBuild.call(this);
        return qs.map(q => {
            if (q.type === 'mc' && !q.options) {
                q.options = ENG_NARRATIVE.shuffle([q.answer, ...q.wrong]);
            }
            return q;
        });
    };
})();
