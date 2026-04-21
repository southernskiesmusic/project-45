/* ================================================================
   ACTIVITY: Paper 1 Analysis Skills
   IB English A Language and Literature - Guided analysis,
   guiding questions, writing commentary
   ================================================================ */
const ENG_PAPER1 = {
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
        const opts = ENG_PAPER1.shuffle([correct, ...wrongOptions]);
        return {
            type: 'mc', rule, difficulty, text,
            answer: correct, answerTex: correct,
            options: opts, correctIndex: opts.indexOf(correct),
            hintTex: [hint1, hint2], explain
        };
    },

    buildPool() {
        return [
            ENG_PAPER1.buildQ(
                'Paper 1 Overview', 'easy',
                'What does IB English A Paper 1 require you to do?',
                'Write a guided literary analysis of one or two unseen texts',
                ['Write a comparative essay on works you have studied', 'Write a personal response to a text of your choice', 'Produce a creative writing piece based on a prompt'],
                'The key word is "unseen" - you have not read these texts before the exam.',
                'Paper 1 also provides a guiding question to focus your analysis.',
                '<strong>Guided literary analysis of unseen texts:</strong> In Paper 1, you encounter texts you have never seen before. You use the guiding question to focus your analytical response. This is distinct from Paper 2 (comparative essay on studied works) and the Individual Oral (studied works + global issue).'
            ),
            ENG_PAPER1.buildQ(
                'SL vs HL', 'easy',
                'How does HL Paper 1 differ from SL Paper 1?',
                'HL students analyse two unseen texts and compare them; SL students analyse one text',
                ['HL students write a longer response on the same single text', 'HL students choose from a wider range of text types', 'HL students have more time but analyse the same number of texts'],
                'Think about the number of texts and the comparative element.',
                'HL Paper 1 requires connecting two texts rather than focusing on one.',
                '<strong>HL: two texts with comparison; SL: one text:</strong> At HL, you must analyse two unseen texts and make meaningful connections between them - in terms of how each uses language, structure, and technique to create meaning. This is a significantly more demanding task than the SL single-text analysis.'
            ),
            ENG_PAPER1.buildQ(
                'Guiding Question', 'easy',
                'What is the purpose of the guiding question in Paper 1?',
                'It focuses your analysis on a specific aspect of the text',
                ['It tells you the correct interpretation of the text', 'It provides background context about the author', 'It summarises the main ideas of the text for you'],
                'The guiding question is a prompt, not an answer.',
                'Think about what the guiding question does for your analytical approach.',
                '<strong>It focuses your analysis:</strong> The guiding question directs your attention to a particular aspect - for example, "How does the writer use narrative voice to create tension?" It does not restrict you to only that aspect, but it should be the anchor of your response. Critically, it is a question to answer analytically, not a summary to confirm.'
            ),
            ENG_PAPER1.buildQ(
                'Reading Strategy', 'easy',
                'What is the best order of operations when beginning Paper 1?',
                'Read the guiding question first, then read the text with that question in mind',
                ['Read the text first, then read the guiding question', 'Start writing immediately to save time', 'Read the text twice, then read the guiding question'],
                'The guiding question should shape how you read the text.',
                'Reading the question first helps you annotate the text purposefully.',
                '<strong>Question first, then text:</strong> Reading the guiding question first means you can annotate the text strategically - flagging relevant techniques, language choices, and structural features that relate to the question. Reading the text blind first and then re-reading with the question in mind wastes time and may lead to generic observations.'
            ),
            ENG_PAPER1.buildQ(
                'What Analysis Means', 'medium',
                'In literary analysis, what does it mean to "analyse" a technique?',
                'Explain HOW the technique creates a specific meaning or effect on the reader',
                ['Identify and name the technique correctly', 'Paraphrase what the text says in your own words', 'Count how many times the technique appears'],
                'Analysis goes beyond identification - what question must you answer?',
                'The word "how" is central to literary analysis.',
                '<strong>HOW = effect on the reader:</strong> Identifying a technique (e.g. "this is a metaphor") is only the first step. Analysis requires you to explain how it works - what effect it creates, what meaning it conveys, how it shapes the reader\'s experience. A response that only names devices is description, not analysis. Always ask: "So what? Why does this matter?"'
            ),
            ENG_PAPER1.buildQ(
                'PEEL Paragraph', 'medium',
                'In a well-structured body paragraph for Paper 1, which sequence is correct?',
                'Point (claim) - Evidence (quotation) - Explain (analyse effect) - Link (connect to overall argument)',
                ['Evidence - Point - Link - Explain', 'Introduce - Quote - Summarise - Evaluate', 'Context - Technique - Example - Restate'],
                'Remember the acronym for paragraph structure.',
                'PEEL: Point, Evidence, Explain, Link.',
                '<strong>PEEL structure:</strong> A strong body paragraph opens with a clear analytical <strong>Point</strong> (claim about how the text works), follows with <strong>Evidence</strong> (a precise quotation or reference), then <strong>Explains</strong> the effect of that evidence (the analysis), and <strong>Links</strong> back to the overall argument or guiding question. This ensures every paragraph is purposeful and analytical, not merely descriptive.'
            ),
            ENG_PAPER1.buildQ(
                'Feature vs Effect', 'medium',
                'What is the difference between a textual "feature" and its "effect"?',
                'Feature = what technique is used (the "what"); effect = the impact on the reader (the "so what")',
                ['Feature = the author\'s intention; effect = the reader\'s reaction', 'Feature = a structural device; effect = a language device', 'There is no meaningful distinction in literary analysis'],
                'Think about "what" vs "why it matters".',
                'Features are observable; effects require interpretation.',
                '<strong>Feature vs effect:</strong> Saying "the writer uses repetition" identifies a feature. Saying "the repetition creates a sense of relentless inevitability that unsettles the reader" describes the effect. IB markers explicitly reward students who move from feature to effect. A response full of features with no effect analysis will not achieve high marks.'
            ),
            ENG_PAPER1.buildQ(
                'What NOT to Do', 'medium',
                'Which of the following would be considered a weakness in a Paper 1 response?',
                'Summarising the plot or paraphrasing what the text says',
                ['Identifying specific literary techniques', 'Connecting techniques to the guiding question', 'Using precise quotations as evidence'],
                'What does analysis require that a summary does not?',
                'IB marking criteria penalise responses that merely retell rather than analyse.',
                '<strong>Avoid summary/paraphrase:</strong> Retelling what happens in a text ("the narrator then describes the storm and says it was dark") is not analysis. The examiner has read the text. You must interpret HOW language choices create meaning, not restate WHAT is written. Every paragraph should contain analytical commentary, not plot description.'
            ),
            ENG_PAPER1.buildQ(
                'Strong Thesis', 'hard',
                'Which of the following is the strongest thesis statement for a Paper 1 response?',
                '"Through fragmented syntax and stark imagery, the writer constructs a sense of psychological disintegration that positions the reader to feel the narrator\'s loss of control."',
                ['"This text is about a person who is experiencing mental illness."', '"The writer uses many interesting techniques to create meaning."', '"In this text, there are several examples of imagery and metaphor."'],
                'A strong thesis makes a specific, arguable interpretive claim about how the text creates meaning.',
                'The thesis should answer the "how" of the guiding question with a clear, specific position.',
                '<strong>Specific + arguable + technique-driven:</strong> The strongest thesis names specific techniques, links them to specific effects, and makes an interpretive claim about meaning. "This text is about mental illness" is a topic statement, not a thesis. "The writer uses many techniques" is vague and committal to nothing. A thesis must take a clear, defensible position that the body of your essay will support.'
            ),
            ENG_PAPER1.buildQ(
                'Paper 1 Structure', 'hard',
                'Which approach to structuring a Paper 1 response is most effective?',
                'Organise by analytical argument (each paragraph makes a distinct claim), not by moving through the text chronologically',
                ['Move through the text from beginning to end, commenting on each paragraph in order', 'Write one paragraph per literary device identified', 'Divide the response into three equal sections: introduction, middle, conclusion'],
                'Should your structure follow the text or your argument?',
                'The IB rewards analytical structure that develops a line of argument, not descriptive structure that follows the text\'s order.',
                '<strong>Argument-driven structure:</strong> Organising by argument means each paragraph makes a distinct analytical claim (e.g. "the writer uses sound devices to create oppressive tension"), rather than working through the text section by section. Chronological commentary often leads to description rather than analysis. Argument-driven structure demonstrates genuine literary thinking and scores higher on the IB criteria.'
            ),
            ENG_PAPER1.buildQ(
                'Embedding Quotations', 'medium',
                'How should quotations be embedded in a Paper 1 response?',
                'Integrated smoothly into your own sentences, followed by analysis of specific words or phrases',
                ['Copied out in full, then summarised in your own words', 'Placed at the start of each paragraph before your point', 'Listed as bullet points with brief labels'],
                'Quotations should feel like part of your sentence, not interruptions to it.',
                'After quoting, you must analyse - which specific words or phrases are doing the work?',
                '<strong>Embedded quotations + specific analysis:</strong> Integrate quotations grammatically into your prose (e.g. "The repetition of \'never\' across three sentences creates a..."). After quoting, drill into specific word choices - do not analyse the whole quotation vaguely. Say which word or phrase matters and explain exactly why. Pasting in long quotations without analysis is a common exam error.'
            ),
            ENG_PAPER1.buildQ(
                'Paper 1 Assessment Criteria', 'hard',
                'Which IB Paper 1 criterion focuses on the quality of your analytical argument and your understanding of how language creates meaning?',
                'Criterion A: Understanding and interpretation',
                ['Criterion B: Appreciation of the writer\'s choices', 'Criterion C: Organisation and development', 'Criterion D: Use of language'],
                'Think about what "understanding" and "interpretation" mean in the context of literary analysis.',
                'Criterion A rewards showing you understand both what the text does and how it does it.',
                '<strong>Criterion A - Understanding and interpretation:</strong> Criterion A assesses whether you understand the text\'s content and context, and whether you can interpret how it creates meaning. Criterion B rewards analysis of specific language/structural choices. Criterion C assesses how well your response is organised and argued. Criterion D assesses how clearly and precisely you write your analysis.'
            )
        ];
    },

    next() {
        if (ENG_PAPER1.pool.length === 0) ENG_PAPER1.pool = ENG_PAPER1.buildPool();
        if (ENG_PAPER1.currentQ && !ENG_PAPER1.answered) ENG_PAPER1.total++;
        ENG_PAPER1.answered = false;
        ENG_PAPER1.hintIndex = 0;
        const fb = document.getElementById('ep1-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');
        const nb = document.getElementById('ep1-next-btn');
        if (nb) nb.style.display = 'none';
        const hb = document.getElementById('ep1-hint-btn');
        if (hb) hb.style.display = '';
        const hbox = document.getElementById('ep1-hint-box');
        if (hbox) { hbox.classList.remove('show'); hbox.innerHTML = ''; }
        const idx = Math.floor(Math.random() * ENG_PAPER1.pool.length);
        ENG_PAPER1.currentQ = ENG_PAPER1.pool[idx];
        ENG_PAPER1.render();
    },

    render() {
        const q = ENG_PAPER1.currentQ;
        document.getElementById('ep1-rule').textContent = q.rule;
        const dtag = document.getElementById('ep1-difficulty');
        dtag.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        dtag.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('ep1-text').innerHTML = q.text;
        const area = document.getElementById('ep1-options-area');
        area.innerHTML = q.options.map((o, i) =>
            `<button class="mc-btn" onclick="ENG_PAPER1.checkMC(${i})">${o}</button>`
        ).join('');
    },

    showHint() {
        const q = ENG_PAPER1.currentQ;
        if (!q || !q.hintTex || ENG_PAPER1.hintIndex >= q.hintTex.length) return;
        const box = document.getElementById('ep1-hint-box');
        box.innerHTML = '<strong>Hint ' + (ENG_PAPER1.hintIndex + 1) + ':</strong> ' + q.hintTex[ENG_PAPER1.hintIndex];
        box.classList.add('show');
        ENG_PAPER1.hintIndex++;
    },

    checkMC(idx) {
        if (ENG_PAPER1.answered) return;
        ENG_PAPER1.answered = true;
        ENG_PAPER1.total++;
        const isCorrect = idx === ENG_PAPER1.currentQ.correctIndex;
        document.querySelectorAll('.mc-btn').forEach((b, i) => {
            if (i === ENG_PAPER1.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !isCorrect) b.classList.add('incorrect');
            b.disabled = true;
        });
        if (isCorrect) { ENG_PAPER1.score++; ENG_PAPER1.streak++; } else { ENG_PAPER1.streak = 0; }
        ENG_PAPER1.showFeedback(isCorrect);
        ENG_PAPER1.updateStats();
    },

    showFeedback(isCorrect) {
        const q = ENG_PAPER1.currentQ;
        const fb = document.getElementById('ep1-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        document.getElementById('ep1-feedback-title').textContent = isCorrect
            ? (ENG_PAPER1.streak > 1 ? `Correct! (${ENG_PAPER1.streak} streak)` : 'Correct!')
            : `Incorrect. The answer is: ${q.answer}`;
        document.getElementById('ep1-feedback-explanation').innerHTML = q.explain;
        document.getElementById('ep1-next-btn').style.display = '';
        document.getElementById('ep1-hint-btn').style.display = 'none';
    },

    updateStats() {
        const el = {
            score: document.getElementById('ep1-score'),
            total: document.getElementById('ep1-total'),
            streak: document.getElementById('ep1-streak'),
            accuracy: document.getElementById('ep1-accuracy')
        };
        if (el.score) el.score.textContent = ENG_PAPER1.score;
        if (el.total) el.total.textContent = ENG_PAPER1.total;
        if (el.streak) el.streak.textContent = ENG_PAPER1.streak;
        if (el.accuracy) el.accuracy.textContent = ENG_PAPER1.total > 0
            ? Math.round((ENG_PAPER1.score / ENG_PAPER1.total) * 100) + '%' : '-';
    },

    load() {
        ENG_PAPER1.score = 0; ENG_PAPER1.total = 0; ENG_PAPER1.streak = 0;
        ENG_PAPER1.answered = false; ENG_PAPER1.hintIndex = 0;
        ENG_PAPER1.pool = ENG_PAPER1.buildPool();
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
<button class="back-btn" onclick="ENG_PAPER1.unload()">&#8592; Topic B: Time and Space</button>
<header style="text-align:center;margin-bottom:24px;">
  <h1>Paper 1 Analysis Skills</h1>
  <p>IB English A Paper 1 - Guided analysis, guiding questions, writing commentary</p>
</header>
<div class="score-bar">
  <div class="score-item"><div class="label">Score</div><div class="value" id="ep1-score">0</div></div>
  <div class="score-item"><div class="label">Total</div><div class="value" id="ep1-total">0</div></div>
  <div class="score-item"><div class="label">Streak</div><div class="value" id="ep1-streak">0</div></div>
  <div class="score-item"><div class="label">Accuracy</div><div class="value" id="ep1-accuracy">-</div></div>
</div>
<div class="question-card" id="ep1-card">
  <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
    <span class="rule-tag" id="ep1-rule"></span>
    <span class="difficulty-tag" id="ep1-difficulty"></span>
  </div>
  <div class="question-text" id="ep1-text" style="margin-bottom:16px;"></div>
  <div id="ep1-options-area" style="display:flex;flex-direction:column;gap:10px;"></div>
</div>
<div class="hint-box" id="ep1-hint-box"></div>
<div class="feedback" id="ep1-feedback">
  <div class="feedback-title" id="ep1-feedback-title"></div>
  <div class="feedback-explanation" id="ep1-feedback-explanation"></div>
</div>
<div style="display:flex;justify-content:center;gap:12px;margin-top:16px;">
  <button class="btn btn-hint" id="ep1-hint-btn" onclick="ENG_PAPER1.showHint()">Hint</button>
  <button class="btn btn-primary next-btn" id="ep1-next-btn" style="display:none;" onclick="ENG_PAPER1.next()">Next Question</button>
</div>`;
        ENG_PAPER1.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-b');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['paper1-skills'] = () => ENG_PAPER1.load();
