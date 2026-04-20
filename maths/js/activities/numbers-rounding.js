/*
 * numbers-rounding.js - IB Math AA 1.1: Numbers & Rounding
 * Number sets, rounding (dp/sf), standard form, percentage error, bounds
 */

const NUMBERS_ROUNDING = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    roundTo(val, dp) {
        return Math.round(val * Math.pow(10, dp)) / Math.pow(10, dp);
    },

    roundSF(val, sf) {
        if (val === 0) return 0;
        const magnitude = Math.floor(Math.log10(Math.abs(val)));
        const factor = Math.pow(10, sf - 1 - magnitude);
        return Math.round(val * factor) / factor;
    },

    formatSF(val, sf) {
        if (val === 0) return '0';
        const magnitude = Math.floor(Math.log10(Math.abs(val)));
        const factor = Math.pow(10, sf - 1 - magnitude);
        const rounded = Math.round(val * factor) / factor;
        return rounded.toPrecision(sf);
    },

    percentError(approx, exact) {
        return Math.abs((approx - exact) / exact) * 100;
    },

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    qRoundDP() {
        const dp = MathUtils.randInt(1, 3);
        const intPart = MathUtils.randInt(0, 99);
        const decPart = MathUtils.randInt(1000, 9999);
        const val = intPart + decPart / 10000;
        const answer = NUMBERS_ROUNDING.roundTo(val, dp);
        const dpLabel = dp === 1 ? '1 decimal place' : `${dp} decimal places`;
        return {
            type: 'free',
            rule: 'Rounding (d.p.)',
            difficulty: 'easy',
            text: `Round the following to ${dpLabel}.`,
            latex: `\\(${val.toFixed(4)}\\)`,
            answer: answer,
            answerTex: String(answer.toFixed(dp)),
            options: [],
            hintTex: [
                `\\text{Look at the digit in the } (${dp+1})\\text{th decimal place.}`,
                `\\text{If it is 5 or more, round up the ${dp}th decimal place.}`
            ],
            explain: `<strong>Step 1:</strong> Look at the ${dp === 1 ? 'second' : dp === 2 ? 'third' : 'fourth'} decimal digit: <strong>${String(Math.round(decPart)).padStart(4,'0')[dp]}</strong>.<br><br>` +
                     `<strong>Step 2:</strong> ${parseInt(String(Math.round(decPart)).padStart(4,'0')[dp]) >= 5 ? 'It is &ge; 5, so round up.' : 'It is &lt; 5, so round down.'}<br><br>` +
                     `<strong>Answer:</strong> \\(${val.toFixed(4)} \\approx ${answer.toFixed(dp)}\\)`
        };
    },

    qRoundSF() {
        const sf = MathUtils.randInt(2, 4);
        // Generate a "interesting" number
        const choices = [
            MathUtils.randInt(1000, 9999),
            MathUtils.randInt(10000, 99999),
            (MathUtils.randInt(100, 999) + MathUtils.randInt(1, 999) / 1000),
            MathUtils.randInt(100, 9999) / 1000
        ];
        const val = choices[MathUtils.randInt(0, 3)];
        const answer = NUMBERS_ROUNDING.roundSF(val, sf);
        const sfLabel = sf === 1 ? '1 significant figure' : `${sf} significant figures`;
        return {
            type: 'free',
            rule: 'Rounding (s.f.)',
            difficulty: 'easy',
            text: `Round the following to ${sfLabel}.`,
            latex: `\\(${val}\\)`,
            answer: answer,
            answerTex: NUMBERS_ROUNDING.formatSF(val, sf),
            options: [],
            hintTex: [
                `\\text{Count ${sf} significant figure${sf > 1 ? 's' : ''} from the first non-zero digit.}`,
                `\\text{Check the next digit: } \\geq 5 \\Rightarrow \\text{round up.}`
            ],
            explain: `<strong>Step 1:</strong> Identify the first non-zero digit of \\(${val}\\) and count ${sf} significant figure${sf > 1 ? 's' : ''}.<br><br>` +
                     `<strong>Step 2:</strong> Look at the digit immediately after the ${sf}${sf === 1 ? 'st' : sf === 2 ? 'nd' : 'rd'} significant figure to decide whether to round up or down.<br><br>` +
                     `<strong>Answer:</strong> \\(${val} \\approx ${NUMBERS_ROUNDING.formatSF(val, sf)}\\) (${sfLabel})`
        };
    },

    qStandardForm() {
        // Convert ordinary number to standard form
        const type = MathUtils.randInt(0, 3);
        let val, mantissa, exponent;
        if (type === 0) { exponent = MathUtils.randInt(3, 6); mantissa = MathUtils.randInt(10, 99) / 10; }
        else if (type === 1) { exponent = MathUtils.randInt(1, 3); mantissa = MathUtils.randInt(10, 99) / 10; }
        else if (type === 2) { exponent = MathUtils.randInt(-4, -1); mantissa = MathUtils.randInt(10, 99) / 10; }
        else { exponent = MathUtils.randInt(-2, -1); mantissa = MathUtils.randInt(100, 999) / 100; }
        val = mantissa * Math.pow(10, exponent);
        const correct = `${mantissa} \\times 10^{${exponent}}`;
        // Distractors: wrong mantissa or exponent
        const d1 = `${mantissa} \\times 10^{${exponent + 1}}`;
        const d2 = `${mantissa * 10} \\times 10^{${exponent - 1}}`;
        const d3 = `${mantissa} \\times 10^{${exponent - 1}}`;
        const opts = NUMBERS_ROUNDING.shuffle([
            { tex: correct, correct: true },
            { tex: d1, correct: false },
            { tex: d2, correct: false },
            { tex: d3, correct: false }
        ]);
        return {
            type: 'mc',
            rule: 'Standard Form',
            difficulty: 'easy',
            text: 'Write the following number in standard form \\(a \\times 10^k\\) where \\(1 \\leq a < 10\\).',
            latex: `\\(${val}\\)`,
            answer: 1,
            answerTex: correct,
            options: opts.map(o => ({ tex: o.tex, value: o.correct ? 1 : 0 })),
            hintTex: [
                `\\text{Move the decimal point so that } 1 \\leq a < 10.`,
                `\\text{Count the places moved: right } \\Rightarrow \\text{ negative exponent; left } \\Rightarrow \\text{ positive.}`
            ],
            explain: `<strong>Standard form:</strong> write as \\(a \\times 10^k\\) where \\(1 \\leq a < 10\\).<br><br>` +
                     `\\(${val} = ${mantissa} \\times 10^{${exponent}}\\)`
        };
    },

    qNumberSet() {
        const examples = [
            { val: '0', sets: ['ℕ', 'ℤ', 'ℚ', 'ℝ'], display: '0', answerTex: '\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}', label: '\\mathbb{N}' },
            { val: '7', sets: ['ℕ', 'ℤ', 'ℚ', 'ℝ'], display: '7', answerTex: '\\mathbb{N}, \\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}', label: '\\mathbb{N}' },
            { val: '-3', sets: ['ℤ', 'ℚ', 'ℝ'], display: '-3', answerTex: '\\mathbb{Z}, \\mathbb{Q}, \\mathbb{R}', label: '\\mathbb{Z}' },
            { val: '1/2', sets: ['ℚ', 'ℝ'], display: '\\tfrac{1}{2}', answerTex: '\\mathbb{Q}, \\mathbb{R}', label: '\\mathbb{Q}' },
            { val: '3/4', sets: ['ℚ', 'ℝ'], display: '0.75', answerTex: '\\mathbb{Q}, \\mathbb{R}', label: '\\mathbb{Q}' },
            { val: 'sqrt2', sets: ['ℝ'], display: '\\sqrt{2}', answerTex: '\\mathbb{R}', label: '\\mathbb{R}' },
            { val: 'pi', sets: ['ℝ'], display: '\\pi', answerTex: '\\mathbb{R}', label: '\\mathbb{R}' },
            { val: '-7/3', sets: ['ℚ', 'ℝ'], display: '-\\tfrac{7}{3}', answerTex: '\\mathbb{Q}, \\mathbb{R}', label: '\\mathbb{Q}' },
            { val: '0.333', sets: ['ℚ', 'ℝ'], display: '0.\\overline{3}', answerTex: '\\mathbb{Q}, \\mathbb{R}', label: '\\mathbb{Q}' }
        ];
        const ex = examples[MathUtils.randInt(0, examples.length - 1)];
        const question = `What is the <strong>smallest</strong> number set that \\(${ex.display}\\) belongs to?`;
        const opts = NUMBERS_ROUNDING.shuffle([
            { tex: '\\mathbb{N}', value: ex.label === '\\mathbb{N}' ? 1 : 0 },
            { tex: '\\mathbb{Z}', value: ex.label === '\\mathbb{Z}' ? 1 : 0 },
            { tex: '\\mathbb{Q}', value: ex.label === '\\mathbb{Q}' ? 1 : 0 },
            { tex: '\\mathbb{R}', value: ex.label === '\\mathbb{R}' ? 1 : 0 }
        ]);
        return {
            type: 'mc',
            rule: 'Number Sets',
            difficulty: 'easy',
            text: question,
            latex: '',
            answer: 1,
            answerTex: ex.label,
            options: opts,
            hintTex: [
                `\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}`,
                `\\text{Irrational numbers (}\\sqrt{2}, \\pi\\text{) are in } \\mathbb{R} \\text{ only.}`
            ],
            explain: `<strong>Number sets hierarchy:</strong> \\(\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}\\)<br><br>` +
                     `\\(${ex.display}\\) belongs to: \\(${ex.answerTex}\\)<br><br>` +
                     `The <em>smallest</em> (most specific) set is \\(${ex.label}\\).`
        };
    },

    qPercentError() {
        // Contexts inspired by IB IA work (experimental measurements)
        const contexts = [
            { exact: 9.81, unit: 'm s^{-2}', item: 'gravitational field strength' },
            { exact: 3.14159, unit: '', item: '\\pi' },
            { exact: 1.414, unit: '', item: '\\sqrt{2}' },
            { exact: 100, unit: 'g', item: 'mass of a sample' },
            { exact: 25.0, unit: '\\degree C', item: 'temperature' }
        ];
        const ctx = contexts[MathUtils.randInt(0, contexts.length - 1)];
        const errorPct = MathUtils.randInt(1, 8) / 10;
        const sign = Math.random() > 0.5 ? 1 : -1;
        const approx = NUMBERS_ROUNDING.roundTo(ctx.exact * (1 + sign * errorPct / 100), 2);
        const answer = NUMBERS_ROUNDING.roundTo(NUMBERS_ROUNDING.percentError(approx, ctx.exact), 2);
        return {
            type: 'free',
            rule: 'Percentage Error',
            difficulty: 'medium',
            text: `A student measures ${ctx.item} as \\(${approx}${ctx.unit ? '\\,' + ctx.unit : ''}\\). The exact value is \\(${ctx.exact}${ctx.unit ? '\\,' + ctx.unit : ''}\\).<br>Find the percentage error.`,
            latex: '',
            answer: answer,
            answerTex: `${answer}\\%`,
            options: [],
            hintTex: [
                `\\varepsilon = \\frac{|v_A - v_E|}{|v_E|} \\times 100\\%`,
                `= \\frac{|${approx} - ${ctx.exact}|}{|${ctx.exact}|} \\times 100\\%`
            ],
            explain: `<strong>Formula:</strong> \\(\\varepsilon = \\dfrac{|v_A - v_E|}{|v_E|} \\times 100\\%\\)<br><br>` +
                     `\\(\\varepsilon = \\dfrac{|${approx} - ${ctx.exact}|}{${ctx.exact}} \\times 100\\% = \\dfrac{${Math.abs(NUMBERS_ROUNDING.roundTo(approx - ctx.exact, 4))}}{${ctx.exact}} \\times 100\\% \\approx ${answer}\\%\\)`
        };
    },

    qBoundsDP() {
        const dp = MathUtils.randInt(1, 2);
        const intPart = MathUtils.randInt(1, 99);
        const decPart = MathUtils.randInt(0, Math.pow(10, dp) - 1);
        const val = intPart + decPart / Math.pow(10, dp);
        const half = 0.5 / Math.pow(10, dp);
        const lower = NUMBERS_ROUNDING.roundTo(val - half, dp + 1);
        const upper = NUMBERS_ROUNDING.roundTo(val + half, dp + 1);
        const dpLabel = dp === 1 ? '1 decimal place' : '2 decimal places';
        const ask = Math.random() > 0.5 ? 'lower' : 'upper';
        return {
            type: 'free',
            rule: 'Error Bounds',
            difficulty: 'hard',
            text: `A length is measured as \\(${val.toFixed(dp)}\\text{ m}\\), rounded to ${dpLabel}. Find the <strong>${ask} bound</strong>.`,
            latex: '',
            answer: ask === 'lower' ? lower : upper,
            answerTex: ask === 'lower' ? `${lower.toFixed(dp + 1)}\\text{ m}` : `${upper.toFixed(dp + 1)}\\text{ m}`,
            options: [],
            hintTex: [
                `\\text{Bounds} = \\text{rounded value} \\pm \\tfrac{1}{2} \\times 10^{-${dp}}`,
                `\\text{Lower: } ${val.toFixed(dp)} - ${half.toFixed(dp + 1)},\\quad \\text{Upper: } ${val.toFixed(dp)} + ${half.toFixed(dp + 1)}`
            ],
            explain: `For a value rounded to ${dp} d.p., the maximum error is \\(\\pm 0.5 \\times 10^{-${dp}} = \\pm ${half}\\).<br><br>` +
                     `<strong>Lower bound:</strong> \\(${val.toFixed(dp)} - ${half.toFixed(dp + 1)} = ${lower.toFixed(dp + 1)}\\)<br>` +
                     `<strong>Upper bound:</strong> \\(${val.toFixed(dp)} + ${half.toFixed(dp + 1)} = ${upper.toFixed(dp + 1)}\\)<br><br>` +
                     `<strong>Answer:</strong> ${ask === 'lower' ? 'lower' : 'upper'} bound \\(= ${(ask === 'lower' ? lower : upper).toFixed(dp + 1)}\\text{ m}\\)`
        };
    },

    qBoundsSF() {
        const sf = MathUtils.randInt(2, 3);
        const base = MathUtils.randInt(10, 99);
        const val = base * 10;
        const roundedSF = NUMBERS_ROUNDING.roundSF(val, sf);
        const magnitude = Math.floor(Math.log10(Math.abs(roundedSF)));
        const half = 0.5 * Math.pow(10, magnitude - sf + 1);
        const lower = roundedSF - half;
        const upper = roundedSF + half;
        const ask = Math.random() > 0.5 ? 'lower' : 'upper';
        return {
            type: 'free',
            rule: 'Error Bounds',
            difficulty: 'hard',
            text: `A value is given as \\(${val}\\), correct to ${sf} significant figures. Find the <strong>${ask} bound</strong>.`,
            latex: '',
            answer: ask === 'lower' ? lower : upper,
            answerTex: `${ask === 'lower' ? lower : upper}`,
            options: [],
            hintTex: [
                `\\text{Error} = \\pm \\tfrac{1}{2} \\times 10^{(\\text{last sf position})}`,
                `\\text{For } ${sf} \\text{ s.f. of } ${val}\\text{: last digit is in the } 10\\text{s place, so error} = \\pm ${half}`
            ],
            explain: `The last significant figure of \\(${val}\\) is in the tens place, so max error \\(= \\pm ${half}\\).<br><br>` +
                     `<strong>Lower bound:</strong> \\(${val} - ${half} = ${lower}\\)<br>` +
                     `<strong>Upper bound:</strong> \\(${val} + ${half} = ${upper}\\)<br><br>` +
                     `<strong>Answer:</strong> ${ask} bound \\(= ${ask === 'lower' ? lower : upper}\\)`
        };
    },

    /* ────────────────────────────────────────────
       QUESTION DISPATCH
       ──────────────────────────────────────────── */

    next() {
        NUMBERS_ROUNDING.answered = false;
        NUMBERS_ROUNDING.hintIndex = 0;

        const qs = {
            easy:   [NUMBERS_ROUNDING.qRoundDP, NUMBERS_ROUNDING.qRoundSF, NUMBERS_ROUNDING.qStandardForm, NUMBERS_ROUNDING.qNumberSet],
            medium: [NUMBERS_ROUNDING.qPercentError, NUMBERS_ROUNDING.qRoundSF, NUMBERS_ROUNDING.qStandardForm],
            hard:   [NUMBERS_ROUNDING.qBoundsDP, NUMBERS_ROUNDING.qBoundsSF, NUMBERS_ROUNDING.qPercentError]
        };
        const lvl = NUMBERS_ROUNDING.level === 'all'
            ? ['easy', 'easy', 'medium', 'medium', 'hard'][MathUtils.randInt(0, 4)]
            : NUMBERS_ROUNDING.level;
        const pool = qs[lvl] || qs.easy;
        NUMBERS_ROUNDING.currentQ = pool[MathUtils.randInt(0, pool.length - 1)]();

        const q = NUMBERS_ROUNDING.currentQ;
        document.getElementById('nr-rule').textContent = q.rule;
        document.getElementById('nr-difficulty').textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        document.getElementById('nr-text').innerHTML = q.text;
        document.getElementById('nr-latex').innerHTML = q.latex;

        const fb = document.getElementById('nr-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById('nr-hint-box').innerHTML = '';
        document.getElementById('nr-next-btn').style.display = 'none';
        document.getElementById('nr-hint-btn').style.display = '';

        const area = document.getElementById('nr-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((opt, i) =>
                `<button class="mc-btn" data-value="${opt.value}" onclick="NUMBERS_ROUNDING.checkMC(this)">\\(${opt.tex}\\)</button>`
            ).join('');
        } else {
            area.innerHTML = `
                <div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;">
                    <input type="number" step="any" id="nr-input" class="free-input" placeholder="Enter answer" />
                    <button class="btn btn-primary" onclick="NUMBERS_ROUNDING.checkFree()">Check</button>
                </div>`;
            const inp = document.getElementById('nr-input');
            if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') NUMBERS_ROUNDING.checkFree(); });
        }
        NUMBERS_ROUNDING.renderAllKaTeX();
    },

    showHint() {
        const q = NUMBERS_ROUNDING.currentQ;
        if (!q || !q.hintTex) return;
        const box = document.getElementById('nr-hint-box');
        if (NUMBERS_ROUNDING.hintIndex < q.hintTex.length) {
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + `\\(${q.hintTex[NUMBERS_ROUNDING.hintIndex]}\\)`;
            NUMBERS_ROUNDING.hintIndex++;
            NUMBERS_ROUNDING.renderAllKaTeX();
        }
    },

    checkMC(btn) {
        if (NUMBERS_ROUNDING.answered) return;
        NUMBERS_ROUNDING.answered = true; NUMBERS_ROUNDING.total++;
        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.mc-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });
        if (isCorrect) { btn.classList.add('correct'); NUMBERS_ROUNDING.score++; NUMBERS_ROUNDING.streak++; }
        else { btn.classList.add('incorrect'); NUMBERS_ROUNDING.streak = 0; }
        NUMBERS_ROUNDING.showFeedback(isCorrect);
        NUMBERS_ROUNDING.updateStats();
    },

    checkFree() {
        if (NUMBERS_ROUNDING.answered) return;
        const inp = document.getElementById('nr-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        NUMBERS_ROUNDING.answered = true; NUMBERS_ROUNDING.total++; inp.disabled = true;
        const isCorrect = MathUtils.approxEqual(val, NUMBERS_ROUNDING.currentQ.answer, 0.001);
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)'; inp.style.background = 'var(--success-light)';
            NUMBERS_ROUNDING.score++; NUMBERS_ROUNDING.streak++;
        } else {
            inp.style.borderColor = 'var(--error)'; inp.style.background = 'var(--error-light)';
            NUMBERS_ROUNDING.streak = 0;
        }
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;
        NUMBERS_ROUNDING.showFeedback(isCorrect);
        NUMBERS_ROUNDING.updateStats();
    },

    showFeedback(isCorrect) {
        const q = NUMBERS_ROUNDING.currentQ;
        const fb = document.getElementById('nr-feedback');
        const title = document.getElementById('nr-feedback-title');
        const explanation = document.getElementById('nr-feedback-explanation');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            title.textContent = NUMBERS_ROUNDING.streak > 1 ? `Correct! (${NUMBERS_ROUNDING.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }
        explanation.innerHTML = q.explain;
        document.getElementById('nr-next-btn').style.display = '';
        document.getElementById('nr-hint-btn').style.display = 'none';
        NUMBERS_ROUNDING.renderAllKaTeX();
    },

    updateStats() {
        const s = document.getElementById('nr-score');
        const t = document.getElementById('nr-total');
        const k = document.getElementById('nr-streak');
        const a = document.getElementById('nr-accuracy');
        if (s) s.textContent = NUMBERS_ROUNDING.score;
        if (t) t.textContent = NUMBERS_ROUNDING.total;
        if (k) k.textContent = NUMBERS_ROUNDING.streak;
        if (a) a.textContent = NUMBERS_ROUNDING.total > 0 ? Math.round((NUMBERS_ROUNDING.score / NUMBERS_ROUNDING.total) * 100) + '%' : '-';
    },

    renderAllKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const c = document.getElementById('activity-container');
            if (c) renderMathInElement(c, {
                delimiters: [
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ],
                throwOnError: false
            });
        }
    },

    setLevel(lvl) {
        NUMBERS_ROUNDING.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn =>
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl)
        );
        NUMBERS_ROUNDING.score = 0; NUMBERS_ROUNDING.total = 0; NUMBERS_ROUNDING.streak = 0;
        NUMBERS_ROUNDING.updateStats();
        NUMBERS_ROUNDING.next();
    },

    load() {
        NUMBERS_ROUNDING.score = 0; NUMBERS_ROUNDING.total = 0;
        NUMBERS_ROUNDING.streak = 0; NUMBERS_ROUNDING.answered = false;
        NUMBERS_ROUNDING.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="NUMBERS_ROUNDING.unload()">Numbers &amp; Rounding (1.1)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Numbers &amp; Rounding</h1>
                <p>IB Math AA 1.1 - Number sets, rounding, standard form, percentage error, bounds</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="NUMBERS_ROUNDING.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="NUMBERS_ROUNDING.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="NUMBERS_ROUNDING.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="NUMBERS_ROUNDING.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="nr-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="nr-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="nr-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="nr-accuracy">-</div></div>
            </div>
            <div class="question-card" id="nr-question-card">
                <span class="rule-tag" id="nr-rule"></span>
                <span class="difficulty-tag" id="nr-difficulty"></span>
                <div class="question-text" id="nr-text"></div>
                <div class="question-prompt" id="nr-latex"></div>
                <div id="nr-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="nr-hint-box"></div>
            <div class="feedback" id="nr-feedback">
                <div class="feedback-title" id="nr-feedback-title"></div>
                <div class="feedback-explanation" id="nr-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="nr-hint-btn" onclick="NUMBERS_ROUNDING.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="nr-next-btn" onclick="NUMBERS_ROUNDING.next()" style="display:none;">Next Question</button>
            </div>
        `;
        NUMBERS_ROUNDING.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['numbers-rounding'] = () => NUMBERS_ROUNDING.load();
}
