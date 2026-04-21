/* ================================================================
   ACTIVITY: Global Issues and Themes
   IB English A Language and Literature - Individual oral,
   global issues, thematic analysis
   ================================================================ */
const ENG_GLOBAL = {
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
        const opts = ENG_GLOBAL.shuffle([correct, ...wrongOptions]);
        return {
            type: 'mc', rule, difficulty, text,
            answer: correct, answerTex: correct,
            options: opts, correctIndex: opts.indexOf(correct),
            hintTex: [hint1, hint2], explain
        };
    },

    buildPool() {
        return [
            ENG_GLOBAL.buildQ(
                'What is a Global Issue?', 'easy',
                'Which best defines a "global issue" in the context of IB English A?',
                'A significant, worldwide concern that is explored through the specific details and techniques of a literary or non-literary text',
                ['Any theme present in a literary work', 'A political event from the news', 'The central message the author intended to convey'],
                'A global issue must be significant (matters beyond the text), worldwide (not just local), and explored through textual evidence.',
                'It must be something a reader can connect to the broader world, not just to the text\'s plot.',
                '<strong>Significant, worldwide, and textually grounded:</strong> An IB global issue is not just any theme. It must be (1) significant - it matters beyond the text; (2) of concern to many people across the world; and (3) demonstrated through specific textual details - language, structure, and technique. It must connect a local textual moment to a global human concern.'
            ),
            ENG_GLOBAL.buildQ(
                'Valid Global Issue', 'easy',
                'Which of the following is a valid global issue for the Individual Oral?',
                'The marginalisation of women in post-colonial societies',
                ['"The theme of love"', '"The story of the main character"', '"The author\'s writing style"'],
                'A valid global issue must be specific, significant worldwide, and something you can trace through textual evidence.',
                'Compare the specificity and worldwide significance of each option.',
                '<strong>The marginalisation of women in post-colonial societies:</strong> This is specific (gendered power + post-colonial context), significant (affects millions globally), and traceable through textual evidence. "The theme of love" is too vague - love is not inherently a global concern. "The story of the main character" is a plot summary. "The author\'s writing style" is a formal feature, not a global issue.'
            ),
            ENG_GLOBAL.buildQ(
                'Individual Oral', 'easy',
                'What does the IB English A Individual Oral assess?',
                'Your ability to connect a specific literary extract to a global issue, supported by close textual analysis',
                ['Your ability to memorise and recite quotations from studied texts', 'Your ability to write a timed essay about a studied work', 'Your knowledge of the author\'s biography and historical context'],
                'The oral requires you to make a connection - what two things are being connected?',
                'The connection must be supported by evidence from the text itself.',
                '<strong>Extract + global issue + close analysis:</strong> The Individual Oral asks you to present a studied extract, identify a global issue it explores, and use close textual analysis to show HOW the text\'s specific techniques explore that global issue. It is not a memory test or an essay - it is a spoken, analytical performance.'
            ),
            ENG_GLOBAL.buildQ(
                'Individual Oral Timing', 'easy',
                'How long is the IB English A Individual Oral?',
                '15 minutes total: approximately 10 minutes of prepared commentary followed by 5 minutes of discussion',
                ['20 minutes: 15 minutes commentary, 5 minutes questions', '10 minutes: 5 minutes commentary, 5 minutes discussion', '15 minutes of uninterrupted monologue'],
                'Divide the total time between the prepared section and the discussion.',
                'The discussion section allows the teacher to probe your understanding further.',
                '<strong>10 min commentary + 5 min discussion = 15 min:</strong> You deliver approximately 10 minutes of prepared commentary linking an extract to a global issue. The teacher then asks questions for approximately 5 minutes to explore your ideas further and test the depth of your understanding. Time management in the prepared section is critical.'
            ),
            ENG_GLOBAL.buildQ(
                'The 6 Thematic Areas', 'medium',
                'Which of the following is NOT one of the six IB English A global issue thematic areas?',
                'Language, power and the media',
                ['Identity', 'Politics, power and justice', 'Science, technology and the environment', 'Art, creativity and imagination'],
                'Recall the six IB thematic areas. One of these options is invented.',
                'The six areas include: Identity; Culture and community; Beliefs, values and education; Politics, power and justice; Art, creativity and imagination; Science, technology and the environment.',
                '<strong>The six areas do not include "Language, power and the media":</strong> The official IB thematic areas are: (1) Identity, (2) Culture and community, (3) Beliefs, values and education, (4) Politics, power and justice, (5) Art, creativity and imagination, and (6) Science, technology and the environment. While media and language are topics within these areas, "Language, power and the media" is not an official category.'
            ),
            ENG_GLOBAL.buildQ(
                'Connecting Issue to Text', 'medium',
                'When discussing a global issue in the Individual Oral, you should:',
                'Show how the author uses specific techniques to explore the global issue through language, structure, and form',
                ['Describe the global issue in general terms and then summarise the text', 'State your personal opinion about the global issue and support it with examples from the news', 'Identify as many literary devices as possible without connecting them to any theme'],
                'The oral requires a bridge between the text and the world. What builds that bridge?',
                'Specific techniques and their effects are what connect the textual detail to the global concern.',
                '<strong>Specific techniques linked to the global issue:</strong> You must demonstrate HOW the author\'s specific choices - word selection, syntax, structure, imagery, narrative voice - explore the global issue. Simply describing the issue, or summarising the plot, does not constitute analysis. Every technique you identify should be linked back to the global issue and its wider significance.'
            ),
            ENG_GLOBAL.buildQ(
                'Intertextuality', 'medium',
                'What does "intertextuality" mean in literary study?',
                'The way texts reference, respond to, or are shaped by other texts',
                ['The study of texts written at the same historical period', 'The way a text is influenced by the author\'s personal life', 'The repetition of themes across different chapters of a single text'],
                'Think about the "inter" prefix - between texts.',
                'Intertextuality can be explicit (quotation, allusion) or implicit (genre conventions, cultural echoes).',
                '<strong>Texts in conversation with other texts:</strong> Intertextuality is when a text references, alludes to, parodies, or responds to another text - creating a web of meaning. For example, a modern novel might allude to <em>Hamlet</em> to comment on indecision. Intertextuality is central to Topic C (Intertextuality: Connecting Texts) in the IB course and can enrich both Paper 2 and the Individual Oral.'
            ),
            ENG_GLOBAL.buildQ(
                'Theme vs Global Issue', 'hard',
                'What is the key distinction between a "theme" and a "global issue"?',
                'A theme is a broad, recurring idea within a text; a global issue is specific, significant worldwide, and must be explored through the text\'s own details',
                ['A global issue is always political; a theme can be personal', 'A theme is invented by the reader; a global issue is stated by the author', 'There is no meaningful distinction - they are the same thing'],
                'Think about specificity and the requirement for worldwide significance.',
                'A global issue must be demonstrable through close textual evidence, not just identified in the plot.',
                '<strong>Specificity + worldwide significance + textual grounding:</strong> "Loss" is a theme - broad and recurring. "The psychological impact of forced displacement on cultural identity" is a global issue - specific, worldwide, and demonstrable through language and technique. IB examiners expect global issues to be precise enough to be argued through close reading, not stated in one vague word.'
            ),
            ENG_GLOBAL.buildQ(
                'Structuring the Oral', 'medium',
                'Which structure is most appropriate for an Individual Oral presentation?',
                'Brief introduction naming the global issue and text, then close analysis of 2-3 techniques from the extract, then a broader connection to the wider work',
                ['Introduction - plot summary - conclusion', 'List every literary device in the extract with a definition for each', 'Discuss the global issue in general terms, then mention the text as an example'],
                'The oral should move from close to wide: extract first, then broader text.',
                'The IB expects analytical depth on the extract before any broader discussion.',
                '<strong>Extract-centred, outward-expanding structure:</strong> Open by naming the global issue and placing the extract in context. Then analyse 2-3 specific techniques in the extract in depth, showing how each explores the global issue. Finally, briefly connect to the wider work. This structure is evidence-driven and analytical throughout. Never start with a plot summary or treat the extract as secondary to general discussion.'
            ),
            ENG_GLOBAL.buildQ(
                'Global Issue Category Match', 'medium',
                'A student\'s oral explores how a novel portrays the silencing of indigenous voices under colonial rule. Which IB thematic area does this best fall under?',
                'Culture and community',
                ['Science, technology and the environment', 'Art, creativity and imagination', 'Beliefs, values and education'],
                'Consider which thematic area relates most directly to cultural identity, belonging, and community suppression.',
                'Colonial erasure of indigenous voices is a question of cultural identity and belonging.',
                '<strong>Culture and community:</strong> The suppression of indigenous voices under colonial rule directly concerns cultural identity, community belonging, and the erasure of cultural heritage - all central to the "Culture and community" thematic area. While education and beliefs may be involved, the primary concern here is cultural identity and communal voice.'
            ),
            ENG_GLOBAL.buildQ(
                'Individual Oral Assessment', 'hard',
                'Which IB Individual Oral criterion rewards the quality of your connection between the extract and the global issue?',
                'Criterion A: Knowledge, understanding and interpretation',
                ['Criterion B: Analysis and evaluation', 'Criterion C: Focus and organisation', 'Criterion D: Language'],
                'Think about which criterion most directly assesses whether you understand the global issue and can connect it to the text.',
                'Criterion A specifically addresses whether you have understood what the text is doing in relation to the global issue.',
                '<strong>Criterion A:</strong> Criterion A in the Individual Oral assesses your knowledge and understanding of the text and your interpretation of how it relates to the global issue. Criterion B rewards the quality of your analysis of the writer\'s choices. Criterion C rewards how focused and organised your presentation is. Criterion D assesses the clarity of your language.'
            ),
            ENG_GLOBAL.buildQ(
                'Selecting a Global Issue', 'hard',
                'When selecting a global issue for the Individual Oral, which quality is MOST important?',
                'It can be convincingly explored through the specific language and technique of the extract',
                ['It is the most important social issue in the world today', 'It matches the author\'s stated intention in interviews', 'It is a theme present in every chapter of the studied work'],
                'The global issue must be textually demonstrable - can you prove it through close reading?',
                'If you cannot find specific techniques in the extract that explore it, choose a different issue.',
                '<strong>Textual demonstrability:</strong> The global issue you select must be one you can argue through close reading of the specific extract. If you choose an issue that cannot be shown through language, structure, or technique in the extract, your analysis will be vague and unsupported. The "most important" issue in the world is irrelevant if the text does not explore it in detail.'
            )
        ];
    },

    next() {
        if (ENG_GLOBAL.pool.length === 0) ENG_GLOBAL.pool = ENG_GLOBAL.buildPool();
        if (ENG_GLOBAL.currentQ && !ENG_GLOBAL.answered) ENG_GLOBAL.total++;
        ENG_GLOBAL.answered = false;
        ENG_GLOBAL.hintIndex = 0;
        const fb = document.getElementById('eglob-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nb = document.getElementById('eglob-next-btn');
        if (nb) nb.style.display = 'none';
        const hb = document.getElementById('eglob-hint-btn');
        if (hb) hb.style.display = '';
        const hbox = document.getElementById('eglob-hint-box');
        if (hbox) { hbox.classList.remove('show'); hbox.innerHTML = ''; }
        const idx = Math.floor(Math.random() * ENG_GLOBAL.pool.length);
        ENG_GLOBAL.currentQ = ENG_GLOBAL.pool[idx];
        ENG_GLOBAL.render();
    },

    render() {
        const q = ENG_GLOBAL.currentQ;
        document.getElementById('eglob-rule').textContent = q.rule;
        const dtag = document.getElementById('eglob-difficulty');
        dtag.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        dtag.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('eglob-text').innerHTML = q.text;
        const area = document.getElementById('eglob-options-area');
        area.innerHTML = q.options.map((o, i) =>
            `<button class="mc-btn" onclick="ENG_GLOBAL.checkMC(${i})">${o}</button>`
        ).join('');
    },

    showHint() {
        const q = ENG_GLOBAL.currentQ;
        if (!q || !q.hintTex || ENG_GLOBAL.hintIndex >= q.hintTex.length) return;
        const box = document.getElementById('eglob-hint-box');
        box.innerHTML = '<strong>Hint ' + (ENG_GLOBAL.hintIndex + 1) + ':</strong> ' + q.hintTex[ENG_GLOBAL.hintIndex];
        box.classList.add('show');
        ENG_GLOBAL.hintIndex++;
    },

    checkMC(idx) {
        if (ENG_GLOBAL.answered) return;
        ENG_GLOBAL.answered = true;
        ENG_GLOBAL.total++;
        const isCorrect = idx === ENG_GLOBAL.currentQ.correctIndex;
        document.querySelectorAll('.mc-btn').forEach((b, i) => {
            if (i === ENG_GLOBAL.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !isCorrect) b.classList.add('incorrect');
            b.disabled = true;
        });
        if (isCorrect) { ENG_GLOBAL.score++; ENG_GLOBAL.streak++; } else { ENG_GLOBAL.streak = 0; }
        ENG_GLOBAL.showFeedback(isCorrect);
        ENG_GLOBAL.updateStats();
    },

    showFeedback(isCorrect) {
        const q = ENG_GLOBAL.currentQ;
        const fb = document.getElementById('eglob-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        document.getElementById('eglob-feedback-title').textContent = isCorrect
            ? (ENG_GLOBAL.streak > 1 ? `Correct! (${ENG_GLOBAL.streak} streak)` : 'Correct!')
            : `Incorrect. The answer is: ${q.answer}`;
        document.getElementById('eglob-feedback-explanation').innerHTML = q.explain;
        document.getElementById('eglob-next-btn').style.display = '';
        document.getElementById('eglob-hint-btn').style.display = 'none';
    },

    updateStats() {
        const el = {
            score: document.getElementById('eglob-score'),
            total: document.getElementById('eglob-total'),
            streak: document.getElementById('eglob-streak'),
            accuracy: document.getElementById('eglob-accuracy')
        };
        if (el.score) el.score.textContent = ENG_GLOBAL.score;
        if (el.total) el.total.textContent = ENG_GLOBAL.total;
        if (el.streak) el.streak.textContent = ENG_GLOBAL.streak;
        if (el.accuracy) el.accuracy.textContent = ENG_GLOBAL.total > 0
            ? Math.round((ENG_GLOBAL.score / ENG_GLOBAL.total) * 100) + '%' : '-';
    },

    load() {
        ENG_GLOBAL.score = 0; ENG_GLOBAL.total = 0; ENG_GLOBAL.streak = 0;
        ENG_GLOBAL.answered = false; ENG_GLOBAL.hintIndex = 0;
        ENG_GLOBAL.pool = ENG_GLOBAL.buildPool();
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
<button class="back-btn" onclick="ENG_GLOBAL.unload()">&#8592; Topic C: Intertextuality</button>
<header style="text-align:center;margin-bottom:24px;">
  <h1>Global Issues and Themes</h1>
  <p>IB English A - Individual oral, global issues, thematic analysis</p>
</header>
<div class="score-bar">
  <div class="score-item"><div class="label">Score</div><div class="value" id="eglob-score">0</div></div>
  <div class="score-item"><div class="label">Total</div><div class="value" id="eglob-total">0</div></div>
  <div class="score-item"><div class="label">Streak</div><div class="value" id="eglob-streak">0</div></div>
  <div class="score-item"><div class="label">Accuracy</div><div class="value" id="eglob-accuracy">-</div></div>
</div>
<div class="question-card" id="eglob-card">
  <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
    <span class="rule-tag" id="eglob-rule"></span>
    <span class="difficulty-tag" id="eglob-difficulty"></span>
  </div>
  <div class="question-text" id="eglob-text" style="margin-bottom:16px;"></div>
  <div id="eglob-options-area" style="display:flex;flex-direction:column;gap:10px;"></div>
</div>
<div class="hint-box" id="eglob-hint-box"></div>
<div class="feedback" id="eglob-feedback">
  <div class="feedback-title" id="eglob-feedback-title"></div>
  <div class="feedback-explanation" id="eglob-feedback-explanation"></div>
</div>
<div style="display:flex;justify-content:center;gap:12px;margin-top:16px;">
  <button class="btn btn-hint" id="eglob-hint-btn" onclick="ENG_GLOBAL.showHint()">Hint</button>
  <button class="btn btn-primary next-btn" id="eglob-next-btn" style="display:none;" onclick="ENG_GLOBAL.next()">Next Question</button>
</div>`;
        ENG_GLOBAL.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-c');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['global-issues'] = () => ENG_GLOBAL.load();
