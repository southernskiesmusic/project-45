/*
 * limits.js - IB Math AA 5.1: Limits and Continuity
 * Direct substitution, rational limits, limits at infinity, one-sided limits,
 * continuity, existence of limits, infinite limits, squeeze theorem,
 * removable discontinuities, and polynomial evaluation.
 */

const LIMITS = {

    score: 0,
    total: 0,
    streak: 0,
    answered: false,
    hintIndex: 0,
    level: 'all',
    currentQuestion: null,

    load() {
        LIMITS.score = 0; LIMITS.total = 0; LIMITS.streak = 0;
        LIMITS.answered = false; LIMITS.hintIndex = 0;
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="LIMITS.unload()">&#8592; Limits &amp; Continuity</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Limits &amp; Continuity</h1>
                <p style="color:var(--text-light);font-size:0.9rem;">IB Math AA 5.1</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="LIMITS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="LIMITS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="LIMITS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="LIMITS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="lim-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="lim-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="lim-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="lim-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="lim-rule"></span>
                <span class="difficulty-tag" id="lim-difficulty"></span>
                <div class="question-text" id="lim-text"></div>
                <div class="question-prompt" id="lim-latex"></div>
                <div id="lim-options-area"></div>
            </div>
            <details class="workout-section"><summary>+ Working Out</summary>
                <div class="workout-content" contenteditable="true" style="min-height:60px;padding:12px;"></div>
            </details>
            <div class="hint-box" id="lim-hint-box"></div>
            <div class="feedback" id="lim-feedback">
                <div class="feedback-title" id="lim-feedback-title"></div>
                <div class="feedback-explanation" id="lim-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:16px;">
                <button class="btn btn-hint" id="lim-hint-btn" onclick="LIMITS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="lim-next-btn" onclick="LIMITS.next()">Next Question</button>
            </div>
        `;
        LIMITS.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('calculus');
    },

    next() {
        LIMITS.answered = false;
        LIMITS.hintIndex = 0;

        let q;
        if (LIMITS.level === 'all') {
            q = LIMITS.pool()();
        } else {
            let attempts = 0;
            do {
                q = LIMITS.pool()();
                attempts++;
            } while (q.difficulty !== LIMITS.level && attempts < 30);
        }
        LIMITS.currentQuestion = q;

        const ruleEl = document.getElementById('lim-rule');
        const diffEl = document.getElementById('lim-difficulty');
        const textEl = document.getElementById('lim-text');
        const latexEl = document.getElementById('lim-latex');
        const optionsEl = document.getElementById('lim-options-area');
        const feedbackEl = document.getElementById('lim-feedback');
        const hintBoxEl = document.getElementById('lim-hint-box');

        if (ruleEl) ruleEl.textContent = q.rule;
        if (diffEl) { diffEl.textContent = q.difficulty; diffEl.className = 'difficulty-tag difficulty-' + q.difficulty; }
        if (textEl) textEl.innerHTML = q.text;
        if (latexEl) latexEl.innerHTML = q.latex || '';
        if (feedbackEl) feedbackEl.className = 'feedback';
        if (hintBoxEl) hintBoxEl.innerHTML = '';

        if (optionsEl) {
            if (q.type === 'mc') {
                optionsEl.innerHTML = '<div class="options-grid">' +
                    q.options.map(opt =>
                        `<button class="option-btn" data-value="${opt.value}" onclick="LIMITS.checkMC(this)">\\(${opt.label || opt.tex}\\)</button>`
                    ).join('') +
                    '</div>';
            } else {
                optionsEl.innerHTML =
                    `<div class="free-input-area" style="display:flex;align-items:center;gap:10px;margin-top:12px;">` +
                    `<input type="number" id="lim-input" class="free-input" placeholder="Your answer" step="any" ` +
                    `onkeydown="if(event.key==='Enter')LIMITS.checkFree()" />` +
                    `<button class="btn btn-primary" onclick="LIMITS.checkFree()">Check</button>` +
                    `</div>`;
            }
        }

        LIMITS.renderAllKaTeX();
    },

    checkMC(btn) {
        if (LIMITS.answered) return;
        LIMITS.answered = true;
        LIMITS.total++;

        const isCorrect = parseInt(btn.dataset.value, 10) === 1;
        if (isCorrect) { LIMITS.score++; LIMITS.streak++; }
        else { LIMITS.streak = 0; }

        // Style all buttons
        const allBtns = document.querySelectorAll('#lim-options-area .option-btn');
        allBtns.forEach(b => {
            b.disabled = true;
            if (parseInt(b.dataset.value, 10) === 1) b.classList.add('correct');
            else b.classList.add('incorrect');
        });

        LIMITS.updateStats();
        LIMITS.showFeedback(isCorrect);
    },

    checkFree() {
        if (LIMITS.answered) return;
        const inputEl = document.getElementById('lim-input');
        if (!inputEl) return;
        const val = parseFloat(inputEl.value);
        if (isNaN(val)) { inputEl.focus(); return; }

        LIMITS.answered = true;
        LIMITS.total++;

        const q = LIMITS.currentQuestion;
        const isCorrect = MathUtils.approxEqual(val, q.answer, q.tolerance || 0.01);
        if (isCorrect) { LIMITS.score++; LIMITS.streak++; }
        else { LIMITS.streak = 0; }

        inputEl.disabled = true;

        LIMITS.updateStats();
        LIMITS.showFeedback(isCorrect);
    },

    showFeedback(isCorrect) {
        const feedbackEl = document.getElementById('lim-feedback');
        const titleEl = document.getElementById('lim-feedback-title');
        const explanationEl = document.getElementById('lim-feedback-explanation');
        if (!feedbackEl) return;

        const q = LIMITS.currentQuestion;
        feedbackEl.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');
        if (titleEl) titleEl.textContent = isCorrect ? 'Correct!' : 'Incorrect';
        if (explanationEl) explanationEl.innerHTML = (q && q.explain) ? q.explain : '';

        LIMITS.renderAllKaTeX();
    },

    updateStats() {
        const scoreEl = document.getElementById('lim-score');
        const totalEl = document.getElementById('lim-total');
        const streakEl = document.getElementById('lim-streak');
        const accEl = document.getElementById('lim-accuracy');
        if (scoreEl) scoreEl.textContent = LIMITS.score;
        if (totalEl) totalEl.textContent = LIMITS.total;
        if (streakEl) streakEl.textContent = LIMITS.streak;
        if (accEl) accEl.textContent = LIMITS.total > 0
            ? Math.round((LIMITS.score / LIMITS.total) * 100) + '%'
            : '-';
    },

    showHint() {
        const q = LIMITS.currentQuestion;
        if (!q || !q.hintTex || q.hintTex.length === 0) return;
        const hintBoxEl = document.getElementById('lim-hint-box');
        if (!hintBoxEl) return;
        const idx = LIMITS.hintIndex < q.hintTex.length ? LIMITS.hintIndex : q.hintTex.length - 1;
        hintBoxEl.innerHTML = `<strong>Hint ${idx + 1}:</strong> \\(${q.hintTex[idx]}\\)`;
        if (LIMITS.hintIndex < q.hintTex.length - 1) LIMITS.hintIndex++;
        LIMITS.renderAllKaTeX();
    },

    setLevel(lvl) {
        LIMITS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === lvl);
        });
        LIMITS.score = 0; LIMITS.total = 0; LIMITS.streak = 0;
        LIMITS.updateStats();
        LIMITS.next();
    },

    renderAllKaTeX() {
        const container = document.getElementById('activity-container');
        if (!container) return;
        if (typeof renderMathInElement === 'function') {
            renderMathInElement(container, {
                delimiters: [
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ],
                throwOnError: false
            });
        }
    },

    init() {
        this.questions = [
            () => LIMITS.qLimitBySubstitution(),
            () => LIMITS.qLimitRational(),
            () => LIMITS.qLimitAtInfinity(),
            () => LIMITS.qOneSidedLimit(),
            () => LIMITS.qContinuityCheck(),
            () => LIMITS.qLimitExists(),
            () => LIMITS.qInfiniteLimit(),
            () => LIMITS.qLimitSqueeze(),
            () => LIMITS.qRemovableDiscontinuity(),
            () => LIMITS.qLimitPolynomial()
        ];
        
    },

    pool() { return MathUtils.pick(this.questions); },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qLimitBySubstitution — Free (numeric)
     * lim(x→a) of a linear polynomial, direct substitution.
     * e.g. lim(x→3) (2x + 5) = 11
     */
    qLimitBySubstitution() {
        const a = MathUtils.pick([1, 2, 3, 4, 5]);
        const m = MathUtils.nonZeroRandInt(-4, 4);
        const c = MathUtils.randInt(-6, 6);
        const answer = m * a + c;

        const mStr = m === 1 ? '' : m === -1 ? '-' : String(m);
        const cStr = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const fTex = `${mStr}x${cStr}`;

        return {
            type: 'free',
            rule: 'Limit by Substitution',
            difficulty: 'easy',
            text: 'Evaluate the limit by direct substitution.',
            latex: `\\(\\displaystyle\\lim_{x \\to ${a}} \\left(${fTex}\\right)\\)`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{The function is continuous at } x = ${a} \\text{, so just substitute directly.}`,
                `${fTex}\\Big|_{x=${a}} = ${m}(${a}) + ${c} = ${m * a} + ${c} = ${answer}`
            ],
            explain: `<strong>Key fact:</strong> Linear functions are continuous everywhere, so the limit equals the function value.<br><br>` +
                     `<strong>Substitute</strong> \\(x = ${a}\\):<br>` +
                     `\\(${m}(${a}) + ${c} = ${m * a} + ${c} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${answer}\\).`
        };
    },

    /**
     * 2. qLimitRational — Free (numeric)
     * lim(x→a) of (x²−a²)/(x−a) = 2a via difference of squares.
     */
    qLimitRational() {
        const a = MathUtils.pick([2, 3, 4, 5]);
        const a2 = a * a;
        const answer = 2 * a;

        return {
            type: 'free',
            rule: 'Limit of Rational (Factor & Cancel)',
            difficulty: 'easy',
            text: 'Evaluate the limit by factoring the numerator.',
            latex: `\\(\\displaystyle\\lim_{x \\to ${a}} \\frac{x^2 - ${a2}}{x - ${a}}\\)`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{Substituting } x = ${a} \\text{ gives } \\tfrac{0}{0} \\text{ — factor the numerator first.}`,
                `x^2 - ${a2} = (x - ${a})(x + ${a}) \\implies \\frac{(x-${a})(x+${a})}{x-${a}} = x + ${a} \\xrightarrow{x\\to${a}} ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Direct substitution gives \\(\\frac{0}{0}\\) — indeterminate.<br><br>` +
                     `<strong>Step 2:</strong> Factor using difference of squares:<br>` +
                     `\\(x^2 - ${a2} = (x-${a})(x+${a})\\).<br><br>` +
                     `<strong>Step 3:</strong> Cancel \\((x-${a})\\) (valid for \\(x \\neq ${a}\\)):<br>` +
                     `\\(\\dfrac{(x-${a})(x+${a})}{x-${a}} = x + ${a}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(\\lim_{x\\to ${a}}(x+${a}) = ${a}+${a} = ${answer}\\).`
        };
    },

    /**
     * 3. qLimitAtInfinity — Free (numeric)
     * lim(x→∞) of (ax+b)/(cx+d) = a/c.
     */
    qLimitAtInfinity() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-5, 5);
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const d = MathUtils.randInt(-5, 5);

        const [rn, rd] = MathUtils.simplifyFraction(a, c);
        const answer = rn / rd;
        const answerTex = MathUtils.fractionTeX(a, c);

        function signedConst(k) {
            if (k === 0) return '';
            return k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        }

        const numTeX = `${a}x${signedConst(b)}`;
        const denTeX = `${c}x${signedConst(d)}`;

        return {
            type: 'free',
            rule: 'Limit at Infinity (Linear/Linear)',
            difficulty: 'easy',
            text: 'Evaluate the limit as \\(x \\to \\infty\\). Divide numerator and denominator by \\(x\\).',
            latex: `\\(\\displaystyle\\lim_{x \\to \\infty} \\frac{${numTeX}}{${denTeX}}\\)`,
            answer: answer,
            answerTex: answerTex,
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{Divide every term by } x`,
                `\\frac{${a} + ${b}/x}{${c} + ${d}/x} \\xrightarrow{x\\to\\infty} \\frac{${a}}{${c}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Divide numerator and denominator by \\(x\\):<br>` +
                     `\\(\\dfrac{${a} + \\tfrac{${b}}{x}}{${c} + \\tfrac{${d}}{x}}\\).<br><br>` +
                     `<strong>Step 2:</strong> As \\(x \\to \\infty\\), \\(\\tfrac{${b}}{x} \\to 0\\) and \\(\\tfrac{${d}}{x} \\to 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Limit \\(= \\dfrac{${a}}{${c}} = ${answerTex}\\).`
        };
    },

    /**
     * 4. qOneSidedLimit — Free (numeric)
     * Given a piecewise function, find the left or right limit at the join point.
     * f(x) = { mx + b  if x < a
     *         { px + q  if x ≥ a
     * Left limit = m·a + b, right limit = p·a + q.
     */
    qOneSidedLimit() {
        const a  = MathUtils.pick([0, 1, 2, 3]);
        const m  = MathUtils.nonZeroRandInt(-3, 3);
        const b  = MathUtils.randInt(-4, 4);
        const p  = MathUtils.nonZeroRandInt(-3, 3);
        const q  = MathUtils.randInt(-4, 4);

        const leftLim  = m * a + b;
        const rightLim = p * a + q;

        // Randomly ask for left or right limit
        const askLeft = MathUtils.pick([true, false]);
        const answer  = askLeft ? leftLim : rightLim;
        const side    = askLeft ? '\\text{left}' : '\\text{right}';
        const arrow   = askLeft ? `${a}^-` : `${a}^+`;

        function fmtLinear(coeff, constant) {
            const mStr = coeff === 1 ? '' : coeff === -1 ? '-' : String(coeff);
            const cStr = constant === 0 ? '' : constant > 0 ? ` + ${constant}` : ` - ${Math.abs(constant)}`;
            return `${mStr}x${cStr}`;
        }

        const topTex = fmtLinear(m, b);
        const botTex = fmtLinear(p, q);

        return {
            type: 'free',
            rule: 'One-Sided Limit (Piecewise)',
            difficulty: 'medium',
            text: `Find the ${askLeft ? 'left-hand' : 'right-hand'} limit at \\(x = ${a}\\) for the piecewise function.`,
            latex: `\\(f(x) = \\begin{cases} ${topTex} & x < ${a} \\\\ ${botTex} & x \\geq ${a} \\end{cases}\\)` +
                   `\\(\\quad\\displaystyle\\lim_{x \\to ${arrow}} f(x) = ?\\)`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.01,
            options: [],
            hintTex: [
                askLeft
                    ? `\\text{For the left-hand limit, use the top branch: } ${topTex}`
                    : `\\text{For the right-hand limit, use the bottom branch: } ${botTex}`,
                askLeft
                    ? `${topTex}\\Big|_{x\\to ${a}^-} = ${m}(${a}) + ${b} = ${answer}`
                    : `${botTex}\\Big|_{x\\to ${a}^+} = ${p}(${a}) + ${q} = ${answer}`
            ],
            explain: `<strong>Key rule:</strong> For a piecewise function, approach from the relevant side.<br><br>` +
                     (askLeft
                         ? `<strong>Left-hand limit</strong> (\\(x \\to ${a}^-\\)): use \\(f(x) = ${topTex}\\).<br>` +
                           `\\(\\lim_{x\\to ${a}^-}(${topTex}) = ${m}(${a}) + ${b} = ${answer}\\).`
                         : `<strong>Right-hand limit</strong> (\\(x \\to ${a}^+\\)): use \\(f(x) = ${botTex}\\).<br>` +
                           `\\(\\lim_{x\\to ${a}^+}(${botTex}) = ${p}(${a}) + ${q} = ${answer}\\).`)
        };
    },

    /**
     * 5. qContinuityCheck — MC
     * Is f(x) = (x²−a²)/(x−a) continuous at x = a?
     * Answer: No — there is a hole (removable discontinuity) at x = a.
     */
    qContinuityCheck() {
        const a = MathUtils.pick([1, 2, 3, 4]);
        const a2 = a * a;

        const options = MathUtils.shuffle([
            { label: 'No — there is a removable discontinuity (hole) at \\(x=' + a + '\\)', value: 1 },
            { label: 'Yes — the function is defined and continuous everywhere', value: 0 },
            { label: 'Yes — the limit exists, so it must be continuous', value: 0 },
            { label: 'No — there is a vertical asymptote at \\(x=' + a + '\\)', value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Continuity Check',
            difficulty: 'easy',
            text: `Is \\(f(x)\\) continuous at \\(x = ${a}\\)?`,
            latex: `\\(f(x) = \\dfrac{x^2 - ${a2}}{x - ${a}}\\)`,
            answer: 1,
            answerTex: '\\text{No — removable discontinuity}',
            options: options,
            hintTex: [
                `\\text{Check: is } f(${a}) \\text{ defined?}`,
                `\\text{Denominator} = ${a} - ${a} = 0 \\implies f(${a}) \\text{ is undefined} \\implies \\text{discontinuous at } x=${a}`
            ],
            explain: `<strong>Three conditions for continuity at \\(x = ${a}\\):</strong><br>` +
                     `1. \\(f(${a})\\) must be defined.<br>` +
                     `2. \\(\\lim_{x\\to ${a}} f(x)\\) must exist.<br>` +
                     `3. The limit must equal \\(f(${a})\\).<br><br>` +
                     `Here the denominator \\(x - ${a} = 0\\) when \\(x = ${a}\\), so \\(f(${a})\\) is <strong>undefined</strong>. ` +
                     `Condition 1 fails — the function is <strong>discontinuous</strong> at \\(x = ${a}\\).<br><br>` +
                     `The limit does exist (equals \\(${2 * a}\\) after factoring), so this is a <em>removable</em> discontinuity (a hole in the graph).`
        };
    },

    /**
     * 6. qLimitExists — MC
     * Given left and right limits of a piecewise function, does the (two-sided) limit exist?
     * Randomly: equal (limit exists) or unequal (limit does not exist).
     */
    qLimitExists() {
        const a = MathUtils.pick([0, 1, 2]);
        const L = MathUtils.randInt(-4, 4);
        // 50/50: make them equal or differ by a small nonzero amount
        const sameLimit = MathUtils.pick([true, false]);
        const R = sameLimit ? L : L + MathUtils.nonZeroRandInt(-3, 3);

        const leftLim  = L;
        const rightLim = R;
        const exists   = leftLim === rightLim;

        const options = MathUtils.shuffle([
            { label: exists
                ? `Yes — both one-sided limits equal \\(${L}\\), so the limit is \\(${L}\\)`
                : `No — the left-hand limit (\\(${L}\\)) ≠ right-hand limit (\\(${R}\\))`,
              value: 1 },
            { label: exists
                ? `No — the function must be defined at \\(x=${a}\\) for the limit to exist`
                : `Yes — the limit equals the average: \\(${(L + R) / 2}\\)`,
              value: 0 },
            { label: exists
                ? `No — left and right limits are never equal at a discontinuity`
                : `Yes — at least one one-sided limit exists, so the two-sided limit exists`,
              value: 0 },
            { label: exists
                ? `Yes — but only because the function is defined there`
                : `No — neither one-sided limit exists`,
              value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Existence of a Limit',
            difficulty: 'medium',
            text: `A function has \\(\\lim_{x\\to ${a}^-} f(x) = ${L}\\) and \\(\\lim_{x\\to ${a}^+} f(x) = ${R}\\). ` +
                  `Does \\(\\lim_{x\\to ${a}} f(x)\\) exist?`,
            latex: '',
            answer: 1,
            answerTex: exists ? `${L}` : '\\text{Does not exist}',
            options: options,
            hintTex: [
                `\\text{A two-sided limit exists if and only if the left and right limits are equal.}`,
                exists
                    ? `${L} = ${R} \\implies \\lim_{x\\to${a}} f(x) = ${L} \\checkmark`
                    : `${L} \\neq ${R} \\implies \\text{the two-sided limit does not exist}`
            ],
            explain: exists
                ? `<strong>Theorem:</strong> \\(\\lim_{x\\to a} f(x) = L\\) if and only if both one-sided limits exist and equal \\(L\\).<br><br>` +
                  `Here \\(\\lim_{x\\to ${a}^-} f(x) = ${L} = \\lim_{x\\to ${a}^+} f(x)\\), so the two-sided limit <strong>exists and equals \\(${L}\\)</strong>.<br><br>` +
                  `Note: the function need not be defined at \\(x=${a}\\) for the limit to exist.`
                : `<strong>Theorem:</strong> \\(\\lim_{x\\to a} f(x)\\) exists only when both one-sided limits exist <em>and are equal</em>.<br><br>` +
                  `Here \\(\\lim_{x\\to ${a}^-} f(x) = ${L} \\neq ${R} = \\lim_{x\\to ${a}^+} f(x)\\), so the two-sided limit <strong>does not exist</strong>.`
        };
    },

    /**
     * 7. qInfiniteLimit — MC
     * lim(x→0) 1/x^2 → +∞. Identify the result.
     */
    qInfiniteLimit() {
        // Vary the power: x^2, x^4 all give +∞; the sign twist on x^1 gives ±∞ (DNE)
        const scenario = MathUtils.pick(['even', 'pos-odd', 'neg-even']);

        let latex, correctTex, correctLabel, w1, w2, w3;

        if (scenario === 'even') {
            const n = MathUtils.pick([2, 4]);
            latex = `\\(\\displaystyle\\lim_{x \\to 0} \\frac{1}{x^{${n}}}\\)`;
            correctTex = '+\\infty';
            correctLabel = '\\(+\\infty\\)';
            w1 = '\\(-\\infty\\)';
            w2 = '\\(0\\)';
            w3 = '\\text{Does not exist}';
        } else if (scenario === 'pos-odd') {
            latex = `\\(\\displaystyle\\lim_{x \\to 0^+} \\frac{1}{x}\\)`;
            correctTex = '+\\infty';
            correctLabel = '\\(+\\infty\\)';
            w1 = '\\(-\\infty\\)';
            w2 = '\\(0\\)';
            w3 = '\\(1\\)';
        } else {
            // neg-even: 1/x^2 as x→0 from left, still +∞
            const n = MathUtils.pick([2, 4]);
            latex = `\\(\\displaystyle\\lim_{x \\to 0^-} \\frac{1}{x^{${n}}}\\)`;
            correctTex = '+\\infty';
            correctLabel = '\\(+\\infty\\)';
            w1 = '\\(-\\infty\\)';
            w2 = '\\(0\\)';
            w3 = '\\text{Does not exist}';
        }

        const options = MathUtils.shuffle([
            { label: correctLabel, value: 1 },
            { label: w1, value: 0 },
            { label: w2, value: 0 },
            { label: w3, value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Infinite Limit',
            difficulty: 'easy',
            text: 'Identify the value of the limit. (Think about the sign of the denominator near \\(x = 0\\).)',
            latex: latex,
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{As } x \\to 0, \\text{ the denominator } \\to 0^+`,
                `\\frac{1}{\\text{tiny positive}} \\to +\\infty`
            ],
            explain: `<strong>Key idea:</strong> When the denominator approaches \\(0\\) from the positive side and the numerator is a positive constant, the fraction grows without bound.<br><br>` +
                     `For even powers: \\(x^n > 0\\) for all \\(x \\neq 0\\), so the denominator is always positive near \\(0\\).<br><br>` +
                     `<strong>Result:</strong> The limit is \\(+\\infty\\).<br><br>` +
                     `<em>Note: \\(+\\infty\\) is not a real number — it describes unbounded growth, not a finite limit value.</em>`
        };
    },

    /**
     * 8. qLimitSqueeze — MC
     * lim(x→0) x·sin(1/x) = 0 (squeeze theorem). Identify the result.
     */
    qLimitSqueeze() {
        const options = MathUtils.shuffle([
            { label: '\\(0\\)',                      value: 1 },
            { label: '\\(1\\)',                      value: 0 },
            { label: '\\text{Does not exist}',       value: 0 },
            { label: '\\(+\\infty\\)',               value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Squeeze Theorem',
            difficulty: 'medium',
            text: 'Evaluate the limit using the Squeeze Theorem. (Recall that \\(|\\sin(\\theta)| \\leq 1\\) for all \\(\\theta\\).)',
            latex: `\\(\\displaystyle\\lim_{x \\to 0}\\; x\\sin\\!\\left(\\frac{1}{x}\\right)\\)`,
            answer: 1,
            answerTex: '0',
            options: options,
            hintTex: [
                `-1 \\leq \\sin\\!\\left(\\tfrac{1}{x}\\right) \\leq 1 \\implies -|x| \\leq x\\sin\\!\\left(\\tfrac{1}{x}\\right) \\leq |x|`,
                `\\lim_{x\\to 0}|x| = 0 \\implies \\text{by Squeeze Theorem, the limit is } 0`
            ],
            explain: `<strong>Step 1:</strong> Since \\(|\\sin(\\theta)| \\leq 1\\) for all \\(\\theta\\):<br>` +
                     `\\(-1 \\leq \\sin\\!\\left(\\tfrac{1}{x}\\right) \\leq 1\\).<br><br>` +
                     `<strong>Step 2:</strong> Multiply through by \\(|x| \\geq 0\\):<br>` +
                     `\\(-|x| \\leq x\\sin\\!\\left(\\tfrac{1}{x}\\right) \\leq |x|\\).<br><br>` +
                     `<strong>Step 3 (Squeeze Theorem):</strong> As \\(x \\to 0\\), both \\(-|x| \\to 0\\) and \\(|x| \\to 0\\). ` +
                     `The expression is squeezed between two quantities tending to \\(0\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\lim_{x\\to 0} x\\sin\\!\\left(\\tfrac{1}{x}\\right) = 0\\).`
        };
    },

    /**
     * 9. qRemovableDiscontinuity — MC
     * Given f(x) = (x²+bx+c)/(x−r) where numerator factors as (x−r)(x−s),
     * identify whether the discontinuity at x = r is removable.
     */
    qRemovableDiscontinuity() {
        // Removable: numerator has (x−r) as a factor  →  yes, removable
        // Non-removable: numerator does NOT vanish at r  →  vertical asymptote
        const isRemovable = MathUtils.pick([true, false]);
        const r = MathUtils.pick([1, 2, 3]);

        let latex, correctLabel, explanation;

        if (isRemovable) {
            // f(x) = (x−r)(x+s)/(x−r)  with s ≠ 0
            const s = MathUtils.nonZeroRandInt(-4, 4);
            const linCoeff = s - r;
            const constTerm = -(r * s);

            function signedK(k) {
                if (k === 0) return '';
                return k > 0 ? `+ ${k}` : `- ${Math.abs(k)}`;
            }

            const numTeX = `x^2 ${signedK(linCoeff)}x ${signedK(constTerm)}`;
            latex = `\\(f(x) = \\dfrac{${numTeX}}{x - ${r}}\\)`;

            correctLabel = `Yes — the discontinuity at \\(x=${r}\\) is removable (hole)`;
            explanation = `<strong>Step 1:</strong> Factor the numerator:<br>` +
                          `\\(${numTeX} = (x-${r})(x+${s})\\).<br><br>` +
                          `<strong>Step 2:</strong> Cancel \\((x-${r})\\):<br>` +
                          `\\(f(x) = x+${s}\\quad (x\\neq ${r})\\).<br><br>` +
                          `<strong>Step 3:</strong> The limit \\(\\lim_{x\\to${r}} f(x) = ${r + s}\\) exists, but \\(f(${r})\\) is undefined. ` +
                          `This is a <strong>removable discontinuity</strong> — it can be "fixed" by defining \\(f(${r}) = ${r + s}\\).`;
        } else {
            // f(x) = k/(x−r) with k nonzero → vertical asymptote, non-removable
            const k = MathUtils.nonZeroRandInt(-4, 4);
            latex = `\\(f(x) = \\dfrac{${k}}{x - ${r}}\\)`;
            correctLabel = `No — the discontinuity at \\(x=${r}\\) is non-removable (vertical asymptote)`;
            explanation = `<strong>Step 1:</strong> The numerator is \\(${k}\\), a non-zero constant.<br><br>` +
                          `<strong>Step 2:</strong> As \\(x \\to ${r}\\), the denominator \\(\\to 0\\) but the numerator \\(\\to ${k} \\neq 0\\).<br><br>` +
                          `<strong>Step 3:</strong> The limit is \\(\\pm\\infty\\) — there is a <strong>vertical asymptote</strong> at \\(x=${r}\\). ` +
                          `This is a <em>non-removable</em> discontinuity (cannot be fixed by redefining a single point).`;
        }

        const wrongLabel1 = isRemovable
            ? `No — any undefined point creates a non-removable discontinuity`
            : `Yes — redefine \\(f(${r})\\) to remove the discontinuity`;
        const wrongLabel2 = isRemovable
            ? `No — the limit does not exist at \\(x=${r}\\)`
            : `Yes — the limit exists on both sides`;
        const wrongLabel3 = `Cannot be determined without more information`;

        const options = MathUtils.shuffle([
            { label: correctLabel, value: 1 },
            { label: wrongLabel1, value: 0 },
            { label: wrongLabel2, value: 0 },
            { label: wrongLabel3, value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Removable Discontinuity',
            difficulty: 'medium',
            text: `Is the discontinuity of \\(f\\) at \\(x = ${r}\\) <strong>removable</strong>?`,
            latex: latex,
            answer: 1,
            answerTex: isRemovable ? '\\text{Yes — removable}' : '\\text{No — non-removable}',
            options: options,
            hintTex: [
                `\\text{A discontinuity at } x=a \\text{ is removable if the limit exists but } f(a) \\text{ is undefined (or wrong value).}`,
                isRemovable
                    ? `\\text{Try factoring the numerator to see if } (x-${r}) \\text{ cancels.}`
                    : `\\text{The numerator } ${MathUtils.nonZeroRandInt(-4,4)} \\neq 0 \\text{ — the limit is } \\pm\\infty \\text{, not removable.}`
            ],
            explain: explanation
        };
    },

    /**
     * 10. qLimitPolynomial — Free (numeric)
     * lim(x→a) of f(x) = Ax²+Bx+C, evaluate by substitution.
     */
    qLimitPolynomial() {
        const a = MathUtils.pick([-2, -1, 0, 1, 2, 3]);
        const A = MathUtils.nonZeroRandInt(-3, 3);
        const B = MathUtils.randInt(-5, 5);
        const C = MathUtils.randInt(-6, 6);
        const answer = A * a * a + B * a + C;

        function polyTeX(A, B, C) {
            const terms = [];
            if (A !== 0) {
                if (A === 1)       terms.push('x^2');
                else if (A === -1) terms.push('-x^2');
                else               terms.push(`${A}x^2`);
            }
            if (B !== 0) {
                if (terms.length === 0) {
                    if (B === 1)       terms.push('x');
                    else if (B === -1) terms.push('-x');
                    else               terms.push(`${B}x`);
                } else {
                    if (B === 1)       terms.push('+ x');
                    else if (B === -1) terms.push('- x');
                    else if (B > 0)    terms.push(`+ ${B}x`);
                    else               terms.push(`- ${Math.abs(B)}x`);
                }
            }
            if (C !== 0) {
                if (terms.length === 0) {
                    terms.push(`${C}`);
                } else {
                    if (C > 0) terms.push(`+ ${C}`);
                    else       terms.push(`- ${Math.abs(C)}`);
                }
            }
            if (terms.length === 0) terms.push('0');
            return terms.join(' ');
        }

        const pTeX = polyTeX(A, B, C);

        return {
            type: 'free',
            rule: 'Limit of Polynomial',
            difficulty: 'easy',
            text: 'Evaluate the limit of the polynomial by direct substitution.',
            latex: `\\(\\displaystyle\\lim_{x \\to ${a}} \\left(${pTeX}\\right)\\)`,
            answer: answer,
            answerTex: String(answer),
            tolerance: 0.01,
            options: [],
            hintTex: [
                `\\text{Polynomials are continuous everywhere — just substitute } x = ${a}`,
                `${A}(${a})^2 + ${B}(${a}) + ${C} = ${A * a * a} + ${B * a} + ${C} = ${answer}`
            ],
            explain: `<strong>Key fact:</strong> Every polynomial is continuous on all of \\(\\mathbb{R}\\), so:<br>` +
                     `\\(\\lim_{x\\to a} p(x) = p(a)\\).<br><br>` +
                     `<strong>Substitute</strong> \\(x = ${a}\\):<br>` +
                     `\\(${A}(${a})^2 + ${B}(${a}) + ${C}\\)<br>` +
                     `\\(= ${A * a * a} + ${B * a} + ${C}\\)<br>` +
                     `\\(= ${answer}\\).`
        };
    }

};

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['limits'] = () => LIMITS.load();
}
