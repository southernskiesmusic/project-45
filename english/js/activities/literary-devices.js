/* ================================================================
   ACTIVITY: Literary Devices
   IB English A Language and Literature - Figurative language,
   sound devices, structural techniques
   ================================================================ */
const ENG_LITERARY = {
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
        const opts = ENG_LITERARY.shuffle([correct, ...wrongOptions]);
        return {
            type: 'mc', rule, difficulty, text,
            answer: correct, answerTex: correct,
            options: opts, correctIndex: opts.indexOf(correct),
            hintTex: [hint1, hint2], explain
        };
    },

    buildPool() {
        return [
            ENG_LITERARY.buildQ(
                'Metaphor vs Simile', 'easy',
                'Identify the literary device in: <em>"The world is a stage, and all the men and women merely players."</em>',
                'Metaphor',
                ['Simile', 'Personification', 'Hyperbole'],
                'Does this comparison use "like" or "as"?',
                'A metaphor states that one thing IS another directly, without using "like" or "as".',
                '<strong>Metaphor:</strong> The world is directly called a stage - there is no "like" or "as". A simile would say "the world is <em>like</em> a stage." Shakespeare\'s direct equation of life with performance is a metaphor, highlighting how roles and performance shape human existence.'
            ),
            ENG_LITERARY.buildQ(
                'Metaphor vs Simile', 'easy',
                'Identify the literary device in: <em>"Her eyes were like stars, gleaming in the dark."</em>',
                'Simile',
                ['Metaphor', 'Personification', 'Alliteration'],
                'Look for the comparison word.',
                'Similes use "like" or "as" to compare two unlike things.',
                '<strong>Simile:</strong> The word "like" signals a simile. The comparison of eyes to stars uses "like" to highlight their brightness and beauty. If it said "Her eyes were stars," that would be a metaphor.'
            ),
            ENG_LITERARY.buildQ(
                'Personification', 'easy',
                'Identify the literary device in: <em>"The wind whispered secrets through the ancient trees."</em>',
                'Personification',
                ['Metaphor', 'Onomatopoeia', 'Alliteration'],
                'Is a non-human thing being given human qualities or actions?',
                'Personification attributes human characteristics to non-human things or abstract ideas.',
                '<strong>Personification:</strong> "Whispered" is a human action applied to the wind. By making the wind whisper secrets, the author creates an intimate, mysterious atmosphere - as if nature itself is communicating.'
            ),
            ENG_LITERARY.buildQ(
                'Alliteration', 'easy',
                'Identify the literary device in: <em>"Peter Piper picked a peck of pickled peppers."</em>',
                'Alliteration',
                ['Assonance', 'Onomatopoeia', 'Anaphora'],
                'Listen for repeated sounds at the beginning of words.',
                'Alliteration is the repetition of the same consonant sound at the start of nearby words.',
                '<strong>Alliteration:</strong> The repeated "p" sound at the start of multiple words is alliteration. It creates a musical, rhythmic quality and can make phrases more memorable.'
            ),
            ENG_LITERARY.buildQ(
                'Onomatopoeia', 'easy',
                'Identify the literary device in: <em>"The bees buzzed lazily in the summer heat."</em>',
                'Onomatopoeia',
                ['Alliteration', 'Assonance', 'Sibilance'],
                'Is the word itself imitating a sound?',
                'Onomatopoeia is when a word phonetically imitates the sound it describes.',
                '<strong>Onomatopoeia:</strong> "Buzzed" imitates the actual sound that bees make. This technique creates a sensory, immersive effect, placing the reader in the scene through sound.'
            ),
            ENG_LITERARY.buildQ(
                'Hyperbole', 'medium',
                'Identify the literary device in: <em>"I\'ve told you a million times to clean your room!"</em>',
                'Hyperbole',
                ['Metaphor', 'Irony', 'Litotes'],
                'Is the statement an extreme exaggeration?',
                'Hyperbole is deliberate, extreme exaggeration for emphasis or comic effect.',
                '<strong>Hyperbole:</strong> No one has literally said something a million times. The extreme exaggeration emphasises the speaker\'s frustration and impatience. Hyperbole creates emotional intensity or humour through deliberate overstatement.'
            ),
            ENG_LITERARY.buildQ(
                'Verbal Irony', 'medium',
                '<em>"Oh wonderful, another rainy Monday morning,"</em> says a character who is visibly miserable. This is an example of:',
                'Verbal irony',
                ['Dramatic irony', 'Situational irony', 'Sarcasm'],
                'Is the speaker saying the opposite of what they mean?',
                'Verbal irony occurs when a speaker says the opposite of what they mean - often to express frustration or humour.',
                '<strong>Verbal irony:</strong> The character says "wonderful" but clearly means the opposite. Note: sarcasm is a <em>type</em> of verbal irony intended to wound or mock. Since the answer option here is "verbal irony" rather than "sarcasm," and the question asks for the literary device, verbal irony is the most precise answer.'
            ),
            ENG_LITERARY.buildQ(
                'Anaphora', 'medium',
                'Martin Luther King Jr. begins several consecutive sentences with "I have a dream..." This structural technique is called:',
                'Anaphora',
                ['Epistrophe', 'Chiasmus', 'Juxtaposition'],
                'Is the repeated phrase at the beginning or end of sentences?',
                'Anaphora is the repetition of a word or phrase at the start of successive clauses or sentences.',
                '<strong>Anaphora:</strong> Repeating "I have a dream" at the beginning of multiple consecutive sentences creates a powerful rhetorical rhythm, builds momentum, and drives the central idea home. It is one of the most recognisable features of King\'s oratory.'
            ),
            ENG_LITERARY.buildQ(
                'Oxymoron', 'medium',
                'Identify the literary device in the phrase: <em>"deafening silence"</em>',
                'Oxymoron',
                ['Paradox', 'Juxtaposition', 'Antithesis'],
                'Are two contradictory terms placed directly together in a single phrase?',
                'An oxymoron combines two contradictory words in a single expression to create a new, complex meaning.',
                '<strong>Oxymoron:</strong> "Deafening" implies extreme noise; "silence" means the absence of sound. Placing them together creates a striking tension - the silence is so intense it overwhelms. Compare with paradox (a seemingly contradictory statement that may be true) and juxtaposition (placing contrasting ideas side by side, not necessarily in two words).'
            ),
            ENG_LITERARY.buildQ(
                'Juxtaposition', 'medium',
                'A novel opens with descriptions of a lavish royal banquet, then immediately cuts to starving peasants outside the palace. This technique is called:',
                'Juxtaposition',
                ['Oxymoron', 'Foreshadowing', 'Symbolism'],
                'Is the technique about placing contrasting ideas next to each other?',
                'Juxtaposition places two contrasting ideas, images, or situations side by side to highlight differences.',
                '<strong>Juxtaposition:</strong> The immediate contrast between wealth and poverty highlights social inequality. Unlike an oxymoron (which combines contradictory words in a phrase), juxtaposition works across images, scenes, or longer passages. The effect here is to emphasise injustice.'
            ),
            ENG_LITERARY.buildQ(
                'Symbolism', 'medium',
                'In <em>The Great Gatsby</em>, the green light at the end of Daisy\'s dock represents Gatsby\'s longing and the unattainable American Dream. This is an example of:',
                'Symbolism',
                ['Metaphor', 'Allegory', 'Foreshadowing'],
                'Is a concrete object being used to represent an abstract idea?',
                'Symbolism is when an object, person, place, or event represents something beyond its literal meaning.',
                '<strong>Symbolism:</strong> The green light is a real physical object, but Fitzgerald uses it to represent abstract ideas - hope, desire, and the elusive American Dream. Symbolism adds layers of meaning that resonate throughout the text.'
            ),
            ENG_LITERARY.buildQ(
                'Enjambment', 'hard',
                'In poetry, when a sentence or phrase continues beyond the end of one line into the next without a pause, this is called:',
                'Enjambment',
                ['Caesura', 'Couplet', 'End-stopping'],
                'Is the sentence flowing across the line break without punctuation?',
                'Enjambment (from French "to straddle") is the continuation of a sentence without a pause beyond the end of a line.',
                '<strong>Enjambment:</strong> When a line runs on without a comma, full stop, or other pause, the reader is pulled forward, creating momentum or mimicking unsettled thought. The contrast with end-stopped lines (where punctuation marks a pause at the line\'s end) is important for analysing a poet\'s control of rhythm.'
            ),
            ENG_LITERARY.buildQ(
                'Caesura', 'hard',
                'In the line <em>"To be, || or not to be - that is the question"</em>, the pause marked by punctuation within the line is called:',
                'Caesura',
                ['Enjambment', 'Volta', 'End-stopping'],
                'Is the pause occurring in the middle of the line, not at the end?',
                'A caesura is a pause within a line of poetry, typically marked by punctuation.',
                '<strong>Caesura:</strong> The comma and dash in Hamlet\'s soliloquy create a pause mid-line. Caesuras can create hesitation, reflect thought, or add dramatic weight. In performance, actors often exploit these pauses. Compare with enjambment (no pause at line end) and end-stopping (pause at line end).'
            ),
            ENG_LITERARY.buildQ(
                'Foreshadowing', 'hard',
                'Early in a novel, a character carelessly says: <em>"I\'d rather die than go back to that place."</em> By the end, the character does die there. This early hint is:',
                'Foreshadowing',
                ['Flashback', 'Irony', 'In medias res'],
                'Does this moment hint at something that happens later in the text?',
                'Foreshadowing is the use of hints or clues early in a narrative to suggest later events.',
                '<strong>Foreshadowing:</strong> The careless remark takes on retrospective significance when the character\'s fate is revealed. Foreshadowing builds dramatic tension and encourages re-reading. It is a key technique for analysing narrative structure in Paper 1 and Paper 2.'
            ),
            ENG_LITERARY.buildQ(
                'Stream of Consciousness', 'hard',
                'A narrative passage presents a character\'s unfiltered, fragmented thoughts, jumping between memories, sensations, and emotions without logical order. This technique is:',
                'Stream of consciousness',
                ['Interior monologue', 'Free indirect discourse', 'Unreliable narration'],
                'Is the narrative attempting to replicate the continuous, unedited flow of a mind?',
                'Stream of consciousness represents the chaotic, associative flow of thought without conventional structure.',
                '<strong>Stream of consciousness:</strong> Used by writers such as Virginia Woolf and James Joyce, this technique immerses the reader directly in a character\'s inner world. Unlike interior monologue (which may be more ordered), stream of consciousness mimics the non-linear, sensory nature of thought. It challenges the reader to construct meaning from apparent chaos.'
            )
        ];
    },

    next() {
        if (ENG_LITERARY.pool.length === 0) ENG_LITERARY.pool = ENG_LITERARY.buildPool();
        if (ENG_LITERARY.currentQ && !ENG_LITERARY.answered) ENG_LITERARY.total++;
        ENG_LITERARY.answered = false;
        ENG_LITERARY.hintIndex = 0;
        const fb = document.getElementById('elit-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nb = document.getElementById('elit-next-btn');
        if (nb) nb.style.display = 'none';
        const hb = document.getElementById('elit-hint-btn');
        if (hb) hb.style.display = '';
        const hbox = document.getElementById('elit-hint-box');
        if (hbox) { hbox.classList.remove('show'); hbox.innerHTML = ''; }
        const idx = Math.floor(Math.random() * ENG_LITERARY.pool.length);
        ENG_LITERARY.currentQ = ENG_LITERARY.pool[idx];
        ENG_LITERARY.render();
    },

    render() {
        const q = ENG_LITERARY.currentQ;
        document.getElementById('elit-rule').textContent = q.rule;
        const dtag = document.getElementById('elit-difficulty');
        dtag.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        dtag.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('elit-text').innerHTML = q.text;
        const area = document.getElementById('elit-options-area');
        area.innerHTML = q.options.map((o, i) =>
            `<button class="mc-btn" onclick="ENG_LITERARY.checkMC(${i})">${o}</button>`
        ).join('');
    },

    showHint() {
        const q = ENG_LITERARY.currentQ;
        if (!q || !q.hintTex || ENG_LITERARY.hintIndex >= q.hintTex.length) return;
        const box = document.getElementById('elit-hint-box');
        box.innerHTML = '<strong>Hint ' + (ENG_LITERARY.hintIndex + 1) + ':</strong> ' + q.hintTex[ENG_LITERARY.hintIndex];
        box.classList.add('show');
        ENG_LITERARY.hintIndex++;
    },

    checkMC(idx) {
        if (ENG_LITERARY.answered) return;
        ENG_LITERARY.answered = true;
        ENG_LITERARY.total++;
        const isCorrect = idx === ENG_LITERARY.currentQ.correctIndex;
        document.querySelectorAll('.mc-btn').forEach((b, i) => {
            if (i === ENG_LITERARY.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !isCorrect) b.classList.add('incorrect');
            b.disabled = true;
        });
        if (isCorrect) { ENG_LITERARY.score++; ENG_LITERARY.streak++; } else { ENG_LITERARY.streak = 0; }
        ENG_LITERARY.showFeedback(isCorrect);
        ENG_LITERARY.updateStats();
    },

    showFeedback(isCorrect) {
        const q = ENG_LITERARY.currentQ;
        const fb = document.getElementById('elit-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        document.getElementById('elit-feedback-title').textContent = isCorrect
            ? (ENG_LITERARY.streak > 1 ? `Correct! (${ENG_LITERARY.streak} streak)` : 'Correct!')
            : `Incorrect. The answer is: ${q.answer}`;
        document.getElementById('elit-feedback-explanation').innerHTML = q.explain;
        document.getElementById('elit-next-btn').style.display = '';
        document.getElementById('elit-hint-btn').style.display = 'none';
    },

    updateStats() {
        const el = {
            score: document.getElementById('elit-score'),
            total: document.getElementById('elit-total'),
            streak: document.getElementById('elit-streak'),
            accuracy: document.getElementById('elit-accuracy')
        };
        if (el.score) el.score.textContent = ENG_LITERARY.score;
        if (el.total) el.total.textContent = ENG_LITERARY.total;
        if (el.streak) el.streak.textContent = ENG_LITERARY.streak;
        if (el.accuracy) el.accuracy.textContent = ENG_LITERARY.total > 0
            ? Math.round((ENG_LITERARY.score / ENG_LITERARY.total) * 100) + '%' : '-';
    },

    load() {
        ENG_LITERARY.score = 0; ENG_LITERARY.total = 0; ENG_LITERARY.streak = 0;
        ENG_LITERARY.answered = false; ENG_LITERARY.hintIndex = 0;
        ENG_LITERARY.pool = ENG_LITERARY.buildPool();
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
<button class="back-btn" onclick="ENG_LITERARY.unload()">&#8592; Topic A: Readers Writers Texts</button>
<header style="text-align:center;margin-bottom:24px;">
  <h1>Literary Devices</h1>
  <p>IB English A - Figurative language, sound devices, structural techniques</p>
</header>
<div class="score-bar">
  <div class="score-item"><div class="label">Score</div><div class="value" id="elit-score">0</div></div>
  <div class="score-item"><div class="label">Total</div><div class="value" id="elit-total">0</div></div>
  <div class="score-item"><div class="label">Streak</div><div class="value" id="elit-streak">0</div></div>
  <div class="score-item"><div class="label">Accuracy</div><div class="value" id="elit-accuracy">-</div></div>
</div>
<div class="question-card" id="elit-card">
  <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
    <span class="rule-tag" id="elit-rule"></span>
    <span class="difficulty-tag" id="elit-difficulty"></span>
  </div>
  <div class="question-text" id="elit-text" style="margin-bottom:16px;"></div>
  <div id="elit-options-area" style="display:flex;flex-direction:column;gap:10px;"></div>
</div>
<div class="hint-box" id="elit-hint-box"></div>
<div class="feedback" id="elit-feedback">
  <div class="feedback-title" id="elit-feedback-title"></div>
  <div class="feedback-explanation" id="elit-feedback-explanation"></div>
</div>
<div style="display:flex;justify-content:center;gap:12px;margin-top:16px;">
  <button class="btn btn-hint" id="elit-hint-btn" onclick="ENG_LITERARY.showHint()">Hint</button>
  <button class="btn btn-primary next-btn" id="elit-next-btn" style="display:none;" onclick="ENG_LITERARY.next()">Next Question</button>
</div>`;
        ENG_LITERARY.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-a');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['literary-devices'] = () => ENG_LITERARY.load();
