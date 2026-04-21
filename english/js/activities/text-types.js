/* ================================================================
   ACTIVITY: Text Types and Conventions
   IB English A Language and Literature - Identifying text types,
   purposes, and conventions
   ================================================================ */
const ENG_TEXT_TYPES = {
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

    buildQ(rule, difficulty, text, correct, wrongOptions, hint1, hint2, explain) {
        const opts = ENG_TEXT_TYPES.shuffle([correct, ...wrongOptions]);
        return {
            type: 'mc', rule, difficulty, text,
            answer: correct, answerTex: correct,
            options: opts, correctIndex: opts.indexOf(correct),
            hintTex: [hint1, hint2], explain
        };
    },

    buildPool() {
        return [
            ENG_TEXT_TYPES.buildQ(
                'Editorial vs News Article', 'easy',
                'A piece of writing in a newspaper that expresses the publication\'s view on a current issue, recommending a course of action, is best classified as:',
                'Editorial',
                ['News article', 'Feature article', 'Op-ed column'],
                'Does the piece offer opinions or report facts neutrally?',
                'An editorial reflects the position of the publication itself, not an individual columnist.',
                '<strong>Editorial:</strong> An editorial presents the newspaper\'s official stance and often argues for a specific position. It is opinion-based, not neutral. A news article reports facts without the writer\'s opinion. An op-ed is a personal opinion piece by an external contributor, not the publication.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Speech vs Essay', 'easy',
                'A piece designed to be heard aloud, which directly addresses the audience as "you" and uses rhetorical questions to engage them, is best identified as:',
                'Speech',
                ['Persuasive essay', 'Open letter', 'Manifesto'],
                'Is the text intended for a listening audience rather than a reading one?',
                'Speeches use direct address ("you"), rhetorical questions, and repetition suited to oral delivery.',
                '<strong>Speech:</strong> Key conventions include direct address to the audience ("you/we"), rhetorical questions, anaphora, and tricolon - all designed to engage listeners. A persuasive essay shares the goal of persuasion but is written for silent readers and uses paragraphed argumentation rather than rhetorical performance.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Blog vs Diary', 'easy',
                'What is the key distinction between a blog and a diary entry?',
                'A blog is written for a public audience; a diary is private and personal',
                ['A blog is always formal; a diary is always informal', 'A blog uses first person; a diary does not', 'A diary discusses current events; a blog does not'],
                'Think about intended audience - who is the text written for?',
                'The defining difference is audience: public vs private.',
                '<strong>Audience is the key distinction:</strong> A blog assumes public readership, so it often includes navigational features (tags, links, calls to engage), and the writer is conscious of audience even when writing informally. A diary assumes privacy - the writer speaks to themselves or an imagined "dear diary," often with unguarded honesty. Both can be informal and use first person.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Satire vs Parody', 'medium',
                'A television show exaggerates politicians\' greed and dishonesty to expose and critique corruption in government. This is best described as:',
                'Satire',
                ['Parody', 'Farce', 'Pastiche'],
                'Is the primary purpose to expose a real social or political problem, or to imitate a specific work for laughs?',
                'Satire uses humour and exaggeration to critique society; parody imitates a specific text or genre for comic effect.',
                '<strong>Satire:</strong> The show targets real political behaviour - its purpose is social/political critique using humour. Parody, by contrast, specifically imitates the style of a particular existing work or genre for comic effect (e.g. spoofing a specific film). The key question is: does it attack a real-world target (satire) or imitate an existing text (parody)?'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Advertisement Conventions', 'medium',
                'Which feature is MOST characteristic of an advertisement?',
                'An imperative verb and emotive language designed to prompt action',
                ['A formal thesis statement', 'Objective, evidence-based argumentation', 'A narrative chronology with characters'],
                'Advertisements are designed to make the audience do something. What linguistic feature achieves this?',
                'Imperatives (commands) and emotive language are the hallmarks of advertising copy.',
                '<strong>Imperative verbs and emotive language:</strong> Advertisements command the audience to "Buy now!", "Experience the difference!", or "Don\'t miss out!" - all imperatives. Combined with emotionally charged language that appeals to aspiration, fear, or belonging, these conventions drive consumer behaviour. A formal thesis is an academic feature; narrative chronology belongs to fiction or memoir.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Letter to the Editor vs Open Letter', 'medium',
                'A letter addressed to a specific public figure (e.g. a president) but published in a newspaper for the general public to read is:',
                'Open letter',
                ['Letter to the editor', 'Personal letter', 'Formal complaint'],
                'Is the letter addressed to an individual but intended for public consumption?',
                'An open letter has a named addressee but is deliberately made public to generate debate.',
                '<strong>Open letter:</strong> Open letters use a specific addressee as a rhetorical framing device, but their true audience is the public. They often carry political or social weight. A letter to the editor is addressed directly to the publication itself and responds to a specific article or community issue - it does not address an external public figure.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Manifesto Conventions', 'medium',
                'A text that opens with "We believe..." and "We demand...", declares collective goals, and calls for radical social change is most likely a:',
                'Manifesto',
                ['Policy document', 'Persuasive essay', 'Formal speech'],
                'What is the political/collective nature of the "we" voice signalling?',
                'Manifestos use first person plural, imperatives, and bold declarations of collective intent.',
                '<strong>Manifesto:</strong> Manifestos are characterised by first person plural ("we/our"), imperative declarations, and a sense of collective urgency. They announce a group\'s beliefs and demands to the world. Famous examples include Marx\'s <em>Communist Manifesto</em> and suffragette declarations. Unlike policy documents, they are rhetorical and passionate, not procedural.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Memoir vs Autobiography', 'hard',
                'What is the key distinction between a memoir and an autobiography?',
                'A memoir focuses on a specific theme, period, or relationship; an autobiography covers the writer\'s whole life',
                ['A memoir is fictional; an autobiography is factual', 'An autobiography uses first person; a memoir uses third person', 'A memoir is written by someone else; an autobiography is self-written'],
                'Both are written by the subject themselves. Think about scope and structure.',
                'An autobiography is a comprehensive life narrative; a memoir is selective and thematic.',
                '<strong>Scope and theme:</strong> An autobiography typically traces the writer\'s entire life in roughly chronological order. A memoir focuses on a particular period, relationship, or theme - for example, a memoir about surviving cancer, or one focused on childhood during wartime. Both are first-person, non-fiction, and self-written. The distinction is one of scope and intention.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Poetry vs Prose', 'easy',
                'Which of the following is a defining formal feature of poetry (rather than prose)?',
                'Line breaks are determined by the author, not by the page margin',
                ['Written in first person', 'Uses figurative language', 'Addresses a specific audience', 'Expresses emotion'],
                'Think about the visual, formal arrangement of language on the page.',
                'The deliberate use of line breaks - controlled by the writer, not the page - is what formally distinguishes poetry from prose.',
                '<strong>Line breaks:</strong> In poetry, the poet decides where each line ends - this is a fundamental formal choice that affects rhythm, emphasis, and meaning. Prose runs to the margin and is shaped by paragraph, not line. Both poetry and prose can be first person, use figurative language, and express emotion - so these cannot be the distinguishing features.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Feature Article vs Hard News', 'medium',
                'An article that explores the human stories behind a flood disaster - interviewing survivors, discussing long-term impacts, and providing contextual analysis - is best described as:',
                'Feature article',
                ['Hard news report', 'Editorial', 'Investigative report'],
                'Is the focus on immediate facts or on human interest and deeper context?',
                'Feature articles go beyond immediate facts to explore human interest, context, and analysis.',
                '<strong>Feature article:</strong> Feature articles are longer, narrative-driven, and explore the human dimension of a story. They may use anecdotes, extended profiles, and contextual analysis. Hard news reports prioritise the inverted pyramid structure (most important facts first), are objective in tone, and are written to tight deadlines. Features take a more discursive, literary approach.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Social Media Conventions', 'easy',
                'Which feature is MOST specific to social media posts as a text type?',
                'Hashtags, handles, and character-limited brevity',
                ['Formal salutation', 'Footnotes and citations', 'Multi-paragraph argumentation'],
                'Think about the platform-specific conventions that only exist in digital social media.',
                'Hashtags (#) and @handles are platform-specific conventions unique to social media.',
                '<strong>Hashtags and brevity:</strong> Social media posts use hashtags to join conversations, @handles to address or tag users, and platform-imposed character limits that demand economy of language. These conventions are unique to the medium. Formal salutations belong to letters; footnotes to academic texts; multi-paragraph argumentation to essays and articles.'
            ),
            ENG_TEXT_TYPES.buildQ(
                'Formal Essay vs Informal Blog', 'hard',
                'Which combination of features most clearly distinguishes a formal academic essay from an informal blog post?',
                'Impersonal third-person voice, thesis-driven structure, and cited evidence vs. first-person voice, conversational tone, and personal anecdote',
                ['Length and number of paragraphs', 'Use of figurative language', 'The presence of a title'],
                'Think about persona, structure, and the relationship between writer and reader.',
                'The formal essay suppresses the personal "I" and foregrounds argument; the blog foregrounds the personal voice and relationship with reader.',
                '<strong>Voice and structure:</strong> Formal essays maintain an impersonal or objective voice, present a clear thesis, and support claims with cited evidence. Informal blogs foreground the writer\'s personality, use contractions, address readers directly, and build engagement through personal narrative. Length, figurative language, and titles appear in both, so they do not distinguish the two.'
            )
        ];
    },

    next() {
        if (ENG_TEXT_TYPES.pool.length === 0) ENG_TEXT_TYPES.pool = ENG_TEXT_TYPES.buildPool();
        if (ENG_TEXT_TYPES.currentQ && !ENG_TEXT_TYPES.answered) ENG_TEXT_TYPES.total++;
        ENG_TEXT_TYPES.answered = false;
        ENG_TEXT_TYPES.hintIndex = 0;
        const fb = document.getElementById('etxt-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nb = document.getElementById('etxt-next-btn');
        if (nb) nb.style.display = 'none';
        const hb = document.getElementById('etxt-hint-btn');
        if (hb) hb.style.display = '';
        const hbox = document.getElementById('etxt-hint-box');
        if (hbox) { hbox.classList.remove('show'); hbox.innerHTML = ''; }
        const idx = Math.floor(Math.random() * ENG_TEXT_TYPES.pool.length);
        ENG_TEXT_TYPES.currentQ = ENG_TEXT_TYPES.pool[idx];
        ENG_TEXT_TYPES.render();
    },

    render() {
        const q = ENG_TEXT_TYPES.currentQ;
        document.getElementById('etxt-rule').textContent = q.rule;
        const dtag = document.getElementById('etxt-difficulty');
        dtag.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        dtag.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('etxt-text').innerHTML = q.text;
        const area = document.getElementById('etxt-options-area');
        area.innerHTML = q.options.map((o, i) =>
            `<button class="mc-btn" onclick="ENG_TEXT_TYPES.checkMC(${i})">${o}</button>`
        ).join('');
    },

    showHint() {
        const q = ENG_TEXT_TYPES.currentQ;
        if (!q || !q.hintTex || ENG_TEXT_TYPES.hintIndex >= q.hintTex.length) return;
        const box = document.getElementById('etxt-hint-box');
        box.innerHTML = '<strong>Hint ' + (ENG_TEXT_TYPES.hintIndex + 1) + ':</strong> ' + q.hintTex[ENG_TEXT_TYPES.hintIndex];
        box.classList.add('show');
        ENG_TEXT_TYPES.hintIndex++;
    },

    checkMC(idx) {
        if (ENG_TEXT_TYPES.answered) return;
        ENG_TEXT_TYPES.answered = true;
        ENG_TEXT_TYPES.total++;
        const isCorrect = idx === ENG_TEXT_TYPES.currentQ.correctIndex;
        document.querySelectorAll('.mc-btn').forEach((b, i) => {
            if (i === ENG_TEXT_TYPES.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !isCorrect) b.classList.add('incorrect');
            b.disabled = true;
        });
        if (isCorrect) { ENG_TEXT_TYPES.score++; ENG_TEXT_TYPES.streak++; } else { ENG_TEXT_TYPES.streak = 0; }
        ENG_TEXT_TYPES.showFeedback(isCorrect);
        ENG_TEXT_TYPES.updateStats();
    },

    showFeedback(isCorrect) {
        const q = ENG_TEXT_TYPES.currentQ;
        const fb = document.getElementById('etxt-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        document.getElementById('etxt-feedback-title').textContent = isCorrect
            ? (ENG_TEXT_TYPES.streak > 1 ? `Correct! (${ENG_TEXT_TYPES.streak} streak)` : 'Correct!')
            : `Incorrect. The answer is: ${q.answer}`;
        document.getElementById('etxt-feedback-explanation').innerHTML = q.explain;
        document.getElementById('etxt-next-btn').style.display = '';
        document.getElementById('etxt-hint-btn').style.display = 'none';
    },

    updateStats() {
        const el = {
            score: document.getElementById('etxt-score'),
            total: document.getElementById('etxt-total'),
            streak: document.getElementById('etxt-streak'),
            accuracy: document.getElementById('etxt-accuracy')
        };
        if (el.score) el.score.textContent = ENG_TEXT_TYPES.score;
        if (el.total) el.total.textContent = ENG_TEXT_TYPES.total;
        if (el.streak) el.streak.textContent = ENG_TEXT_TYPES.streak;
        if (el.accuracy) el.accuracy.textContent = ENG_TEXT_TYPES.total > 0
            ? Math.round((ENG_TEXT_TYPES.score / ENG_TEXT_TYPES.total) * 100) + '%' : '-';
    },

    load() {
        ENG_TEXT_TYPES.score = 0; ENG_TEXT_TYPES.total = 0; ENG_TEXT_TYPES.streak = 0;
        ENG_TEXT_TYPES.answered = false; ENG_TEXT_TYPES.hintIndex = 0;
        ENG_TEXT_TYPES.pool = ENG_TEXT_TYPES.buildPool();
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
<button class="back-btn" onclick="ENG_TEXT_TYPES.unload()">&#8592; Topic A: Readers Writers Texts</button>
<header style="text-align:center;margin-bottom:24px;">
  <h1>Text Types and Conventions</h1>
  <p>IB English A - Identifying text types, purposes, and conventions</p>
</header>
<div class="score-bar">
  <div class="score-item"><div class="label">Score</div><div class="value" id="etxt-score">0</div></div>
  <div class="score-item"><div class="label">Total</div><div class="value" id="etxt-total">0</div></div>
  <div class="score-item"><div class="label">Streak</div><div class="value" id="etxt-streak">0</div></div>
  <div class="score-item"><div class="label">Accuracy</div><div class="value" id="etxt-accuracy">-</div></div>
</div>
<div class="question-card" id="etxt-card">
  <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
    <span class="rule-tag" id="etxt-rule"></span>
    <span class="difficulty-tag" id="etxt-difficulty"></span>
  </div>
  <div class="question-text" id="etxt-text" style="margin-bottom:16px;"></div>
  <div id="etxt-options-area" style="display:flex;flex-direction:column;gap:10px;"></div>
</div>
<div class="hint-box" id="etxt-hint-box"></div>
<div class="feedback" id="etxt-feedback">
  <div class="feedback-title" id="etxt-feedback-title"></div>
  <div class="feedback-explanation" id="etxt-feedback-explanation"></div>
</div>
<div style="display:flex;justify-content:center;gap:12px;margin-top:16px;">
  <button class="btn btn-hint" id="etxt-hint-btn" onclick="ENG_TEXT_TYPES.showHint()">Hint</button>
  <button class="btn btn-primary next-btn" id="etxt-next-btn" style="display:none;" onclick="ENG_TEXT_TYPES.next()">Next Question</button>
</div>`;
        ENG_TEXT_TYPES.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-a');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['text-types'] = () => ENG_TEXT_TYPES.load();
