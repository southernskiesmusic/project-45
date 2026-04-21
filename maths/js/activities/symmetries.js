/*
 * symmetries.js - IB Math AA 2.1: Symmetries of Functions
 * Even/odd functions, axes of symmetry, rotational symmetry, reflections
 */

const SYMMETRIES = {
    prefix: 'sym-',
    unload: 'functions',

    load() {
        SYMMETRIES.score = 0; SYMMETRIES.total = 0; SYMMETRIES.streak = 0;
        SYMMETRIES.answered = false; SYMMETRIES.hintIndex = 0;
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="SYMMETRIES.unload()">&#8592; Symmetries</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Symmetries of Functions</h1>
                <p style="color:var(--text-light);font-size:0.9rem;">IB Math AA 2.16 — Even/odd functions, axes of symmetry</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="SYMMETRIES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="SYMMETRIES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="SYMMETRIES.setLevel('medium')">Medium</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="sym-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="sym-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="sym-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="sym-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="sym-rule"></span>
                <span class="difficulty-tag" id="sym-difficulty"></span>
                <div class="question-text" id="sym-text"></div>
                <div class="question-prompt" id="sym-latex"></div>
                <div id="sym-options-area"></div>
            </div>
            <details class="workout-section"><summary>+ Working Out</summary>
                <div class="workout-content" contenteditable="true" style="min-height:60px;padding:12px;"></div>
            </details>
            <div class="hint-box" id="sym-hint-box"></div>
            <div class="feedback" id="sym-feedback">
                <div class="feedback-title" id="sym-feedback-title"></div>
                <div class="feedback-explanation" id="sym-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:16px;">
                <button class="btn btn-hint" id="sym-hint-btn" onclick="SYMMETRIES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="sym-next-btn" onclick="SYMMETRIES.next()">Next Question</button>
            </div>
        `;
        SYMMETRIES.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        showView('functions');
    },

    next() {
        SYMMETRIES.answered = false;
        SYMMETRIES.hintIndex = 0;

        const entry = SYMMETRIES.pool();
        let q = SYMMETRIES[entry.method]();

        // If level filter is active, keep drawing until we match (with a safety limit)
        if (SYMMETRIES.currentLevel && SYMMETRIES.currentLevel !== 'all') {
            let attempts = 0;
            while (q.difficulty !== SYMMETRIES.currentLevel && attempts < 20) {
                const e2 = SYMMETRIES.pool();
                q = SYMMETRIES[e2.method]();
                attempts++;
            }
        }

        SYMMETRIES.q = q;

        const ruleEl   = document.getElementById('sym-rule');
        const diffEl   = document.getElementById('sym-difficulty');
        const textEl   = document.getElementById('sym-text');
        const latexEl  = document.getElementById('sym-latex');
        const areaEl   = document.getElementById('sym-options-area');
        const fbEl     = document.getElementById('sym-feedback');
        const hintEl   = document.getElementById('sym-hint-box');

        if (ruleEl)  ruleEl.textContent  = q.rule       || '';
        if (diffEl)  diffEl.textContent  = q.difficulty || '';
        if (textEl)  textEl.innerHTML    = q.text        || '';
        if (latexEl) latexEl.innerHTML   = q.latex       || '';
        if (fbEl)    { fbEl.className = 'feedback'; fbEl.style.display = 'none'; }
        if (hintEl)  hintEl.innerHTML    = '';

        if (areaEl) {
            if (q.type === 'mc') {
                areaEl.innerHTML = `<div class="options-grid">${
                    q.options.map((opt, i) =>
                        `<button class="option-btn" value="${opt.value}" onclick="SYMMETRIES.checkMC(this)">${opt.label}</button>`
                    ).join('')
                }</div>`;
            } else {
                areaEl.innerHTML = `
                    <div class="free-input-row">
                        <input type="number" id="sym-input" class="free-input" placeholder="Your answer…" step="any"
                               onkeydown="if(event.key==='Enter') SYMMETRIES.checkFree()">
                        <button class="btn btn-primary" onclick="SYMMETRIES.checkFree()">Check</button>
                    </div>`;
            }
        }

        SYMMETRIES.renderAllKaTeX();
    },

    checkMC(btn) {
        if (SYMMETRIES.answered) return;
        SYMMETRIES.answered = true;

        const isCorrect = parseInt(btn.value, 10) === 1;
        const area = document.getElementById('sym-options-area');
        if (area) {
            area.querySelectorAll('.option-btn').forEach(b => {
                b.disabled = true;
                if (parseInt(b.value, 10) === 1) b.classList.add('correct');
                else if (b === btn && !isCorrect) b.classList.add('incorrect');
            });
        }

        if (isCorrect) { SYMMETRIES.score++; SYMMETRIES.streak++; }
        else           { SYMMETRIES.streak = 0; }
        SYMMETRIES.total++;

        SYMMETRIES.updateStats();
        SYMMETRIES.showFeedback(isCorrect);
    },

    checkFree() {
        if (SYMMETRIES.answered) return;
        const inputEl = document.getElementById('sym-input');
        if (!inputEl) return;
        const val = parseFloat(inputEl.value);
        if (isNaN(val)) return;
        SYMMETRIES.answered = true;

        const q = SYMMETRIES.q;
        const isCorrect = Math.abs(val - q.answer) <= (q.tolerance || 0.01);

        inputEl.disabled = true;
        inputEl.classList.add(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) { SYMMETRIES.score++; SYMMETRIES.streak++; }
        else           { SYMMETRIES.streak = 0; }
        SYMMETRIES.total++;

        SYMMETRIES.updateStats();
        SYMMETRIES.showFeedback(isCorrect);
    },

    showFeedback(isCorrect) {
        const fbEl    = document.getElementById('sym-feedback');
        const titleEl = document.getElementById('sym-feedback-title');
        const expEl   = document.getElementById('sym-feedback-explanation');
        if (!fbEl) return;

        fbEl.style.display = '';
        fbEl.className = 'feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');

        if (titleEl) titleEl.textContent = isCorrect ? 'Correct!' : 'Incorrect';
        if (expEl)   expEl.innerHTML = SYMMETRIES.q.explain || '';

        SYMMETRIES.renderAllKaTeX();
    },

    updateStats() {
        const scoreEl    = document.getElementById('sym-score');
        const totalEl    = document.getElementById('sym-total');
        const streakEl   = document.getElementById('sym-streak');
        const accuracyEl = document.getElementById('sym-accuracy');

        if (scoreEl)    scoreEl.textContent    = SYMMETRIES.score;
        if (totalEl)    totalEl.textContent    = SYMMETRIES.total;
        if (streakEl)   streakEl.textContent   = SYMMETRIES.streak;
        if (accuracyEl) accuracyEl.textContent = SYMMETRIES.total > 0
            ? Math.round((SYMMETRIES.score / SYMMETRIES.total) * 100) + '%'
            : '-';
    },

    showHint() {
        const q = SYMMETRIES.q;
        if (!q || !q.hintTex || q.hintTex.length === 0) return;
        const hintEl = document.getElementById('sym-hint-box');
        if (!hintEl) return;

        const idx = SYMMETRIES.hintIndex;
        if (idx >= q.hintTex.length) return;

        const line = `<div class="hint-line">\\(${q.hintTex[idx]}\\)</div>`;
        hintEl.innerHTML += line;
        SYMMETRIES.hintIndex++;

        SYMMETRIES.renderAllKaTeX();
    },

    setLevel(lvl) {
        SYMMETRIES.currentLevel = lvl;

        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === lvl);
        });

        SYMMETRIES.score = 0; SYMMETRIES.total = 0; SYMMETRIES.streak = 0;
        SYMMETRIES.updateStats();
        SYMMETRIES.next();
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
            { method: 'qEvenOrOdd',           weight: 1 },
            { method: 'qEvenTest',             weight: 1 },
            { method: 'qOddTest',              weight: 1 },
            { method: 'qSymmetryAxis',         weight: 1 },
            { method: 'qVertexForm',           weight: 1 },
            { method: 'qRotationalSymmetry',   weight: 1 },
            { method: 'qReflectYAxis',         weight: 1 },
            { method: 'qReflectOrigin',        weight: 1 },
            { method: 'qEvenFunction',         weight: 1 },
            { method: 'qOddFunction',          weight: 1 }
        ];
        
    },

    pool() { return MathUtils.pick(this.questions); },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qEvenOrOdd — Classify f(x) as even, odd, or neither (MC)
     * Pool: x², x³, |x|, cos x, sin x, x²+x, x⁴, x⁵
     */
    qEvenOrOdd() {
        const functions = [
            { tex: 'x^2',         type: 'even',    reason: 'f(-x) = (-x)^2 = x^2 = f(x)' },
            { tex: 'x^3',         type: 'odd',     reason: 'f(-x) = (-x)^3 = -x^3 = -f(x)' },
            { tex: '|x|',         type: 'even',    reason: 'f(-x) = |-x| = |x| = f(x)' },
            { tex: '\\cos x',     type: 'even',    reason: '\\cos(-x) = \\cos x' },
            { tex: '\\sin x',     type: 'odd',     reason: '\\sin(-x) = -\\sin x = -f(x)' },
            { tex: 'x^4',         type: 'even',    reason: 'f(-x) = (-x)^4 = x^4 = f(x)' },
            { tex: 'x^5',         type: 'odd',     reason: 'f(-x) = (-x)^5 = -x^5 = -f(x)' },
            { tex: 'x^2 + x',     type: 'neither', reason: 'f(-x) = x^2 - x \\neq f(x) \\text{ and } \\neq -f(x)' }
        ];

        const chosen = MathUtils.pick(functions);

        const allTypes = ['even', 'odd', 'neither'];
        const options = MathUtils.shuffle([
            { label: 'Even — symmetric about the y-axis', value: chosen.type === 'even' ? 1 : 0 },
            { label: 'Odd — rotationally symmetric about the origin', value: chosen.type === 'odd' ? 1 : 0 },
            { label: 'Neither even nor odd', value: chosen.type === 'neither' ? 1 : 0 },
            { label: 'Both even and odd', value: 0 }
        ]);

        const correctLabel = options.find(o => o.value === 1).label;

        return {
            type: 'mc',
            rule: 'Even / Odd / Neither',
            difficulty: 'easy',
            text: `Classify \\(f(x) = ${chosen.tex}\\) as even, odd, or neither.`,
            latex: '',
            answer: 1,
            answerTex: chosen.type.charAt(0).toUpperCase() + chosen.type.slice(1),
            options,
            hintTex: [
                `\\text{Test: compute } f(-x) \\text{ and compare with } f(x) \\text{ and } -f(x)`,
                chosen.reason
            ],
            explain: `<strong>Key definitions:</strong><br>` +
                     `<strong>Even:</strong> \\(f(-x) = f(x)\\) for all \\(x\\) — graph is symmetric about the y-axis.<br>` +
                     `<strong>Odd:</strong> \\(f(-x) = -f(x)\\) for all \\(x\\) — graph has rotational symmetry about the origin.<br><br>` +
                     `<strong>Test:</strong> \\(${chosen.reason}\\)<br><br>` +
                     `<strong>Answer:</strong> \\(f(x) = ${chosen.tex}\\) is <strong>${chosen.type}</strong>.`
        };
    },

    /**
     * 2. qEvenTest — Given f(-x) result, identify if the function is even (MC)
     */
    qEvenTest() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.randInt(1, 6);

        // f(x) = a·x² + b  →  even, because f(-x) = a·x² + b = f(x)
        const fTex = `${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b > 0 ? '+ ' + b : '- ' + Math.abs(b)}`;
        const fNegXTex = `${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b > 0 ? '+ ' + b : '- ' + Math.abs(b)}`;

        const options = MathUtils.shuffle([
            { label: 'Yes — because \\(f(-x) = f(x)\\)', value: 1 },
            { label: 'No — because \\(f(-x) = -f(x)\\)', value: 0 },
            { label: 'No — because \\(f(-x) \\neq f(x)\\) and \\(f(-x) \\neq -f(x)\\)', value: 0 },
            { label: 'Cannot be determined without more information', value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Even Function Test',
            difficulty: 'easy',
            text: `Given \\(f(x) = ${fTex}\\), we compute \\(f(-x) = ${fNegXTex}\\). Is \\(f\\) an even function?`,
            latex: '',
            answer: 1,
            answerTex: 'Yes — even',
            options,
            hintTex: [
                `\\text{A function is even if } f(-x) = f(x) \\text{ for all } x`,
                `f(-x) = ${a}(-x)^2 + ${b} = ${a}x^2 + ${b} = f(x) \\checkmark`
            ],
            explain: `<strong>Definition:</strong> A function is <strong>even</strong> if \\(f(-x) = f(x)\\) for all \\(x\\).<br><br>` +
                     `<strong>Check:</strong> \\(f(-x) = ${a}(-x)^2 + ${b} = ${a}x^2 + ${b} = f(x)\\) \\(\\checkmark\\)<br><br>` +
                     `<strong>Conclusion:</strong> Yes, \\(f\\) is even. Its graph is symmetric about the y-axis.`
        };
    },

    /**
     * 3. qOddTest — Given f(-x) = -f(x) check, identify if the function is odd (MC)
     */
    qOddTest() {
        const a = MathUtils.nonZeroRandInt(-5, 5);

        // f(x) = a·x³  →  odd
        const fTex = `${a === 1 ? '' : a === -1 ? '-' : a}x^3`;
        const negA = -a;
        const fNegXTex = `${negA === 1 ? '' : negA === -1 ? '-' : negA}x^3`;
        const negFTex = `${negA === 1 ? '' : negA === -1 ? '-' : negA}x^3`;

        const options = MathUtils.shuffle([
            { label: 'Yes — because \\(f(-x) = -f(x)\\)', value: 1 },
            { label: 'Yes — because \\(f(-x) = f(x)\\)', value: 0 },
            { label: 'No — because \\(f(-x) \\neq -f(x)\\)', value: 0 },
            { label: 'No — it is even', value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Odd Function Test',
            difficulty: 'easy',
            text: `Given \\(f(x) = ${fTex}\\), we find \\(f(-x) = ${fNegXTex}\\) and \\(-f(x) = ${negFTex}\\). Is \\(f\\) an odd function?`,
            latex: '',
            answer: 1,
            answerTex: 'Yes — odd',
            options,
            hintTex: [
                `\\text{A function is odd if } f(-x) = -f(x) \\text{ for all } x`,
                `f(-x) = ${a}(-x)^3 = -${a}x^3 = -f(x) \\checkmark`
            ],
            explain: `<strong>Definition:</strong> A function is <strong>odd</strong> if \\(f(-x) = -f(x)\\) for all \\(x\\).<br><br>` +
                     `<strong>Check:</strong> \\(f(-x) = ${a}(-x)^3 = ${negA}x^3 = -f(x)\\) \\(\\checkmark\\)<br><br>` +
                     `<strong>Conclusion:</strong> Yes, \\(f\\) is odd. Its graph has 180° rotational symmetry about the origin.`
        };
    },

    /**
     * 4. qSymmetryAxis — Identify the axis of symmetry of a parabola (free, numeric)
     * f(x) = a(x - h)² + k  →  axis is x = h
     */
    qSymmetryAxis() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const h = MathUtils.randInt(-6, 6);
        const k = MathUtils.randInt(-8, 8);

        let hTex = h === 0 ? 'x' : h > 0 ? `(x - ${h})` : `(x + ${Math.abs(h)})`;
        let kTex = k === 0 ? '' : k > 0 ? ` + ${k}` : ` - ${Math.abs(k)}`;
        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);

        const fTex = `${aTex}${hTex}^2${kTex}`;

        return {
            type: 'free',
            rule: 'Axis of Symmetry',
            difficulty: 'easy',
            text: `Find the axis of symmetry of the parabola \\(f(x) = ${fTex}\\). Enter the x-value of the axis.`,
            latex: '',
            answer: h,
            tolerance: 0.01,
            answerTex: `x = ${h}`,
            options: [],
            hintTex: [
                `\\text{A parabola } f(x) = a(x-h)^2 + k \\text{ has axis of symmetry } x = h`,
                `\\text{Here } h = ${h}, \\text{ so the axis is } x = ${h}`
            ],
            explain: `<strong>Vertex form:</strong> \\(f(x) = a(x - h)^2 + k\\) has vertex \\((h, k)\\) and axis of symmetry \\(x = h\\).<br><br>` +
                     `<strong>Reading off:</strong> \\(f(x) = ${fTex}\\) has \\(h = ${h}\\).<br><br>` +
                     `<strong>Answer:</strong> Axis of symmetry is \\(x = ${h}\\).`
        };
    },

    /**
     * 5. qVertexForm — Complete the square to find vertex x-coordinate (free, numeric)
     * f(x) = ax² + bx + c  →  x-vertex = -b/(2a)
     */
    qVertexForm() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        // Choose h so vertex x-coord is an integer: pick h, then b = -2ah
        const h = MathUtils.randInt(-5, 5);
        const k = MathUtils.randInt(-8, 8);
        const b = -2 * a * h;
        const c = a * h * h + k;

        let aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let bTex = b === 0 ? '' : b === 1 ? ' + x' : b === -1 ? ' - x' : b > 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
        let cTex = c === 0 ? '' : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
        const fTex = `${aTex}x^2${bTex}${cTex}`;

        return {
            type: 'free',
            rule: 'Vertex by Completing the Square',
            difficulty: 'medium',
            text: `Complete the square for \\(f(x) = ${fTex}\\) to find the x-coordinate of the vertex (the axis of symmetry).`,
            latex: '',
            answer: h,
            tolerance: 0.01,
            answerTex: `x = ${h}`,
            options: [],
            hintTex: [
                `\\text{The axis of symmetry is } x = -\\dfrac{b}{2a} = -\\dfrac{${b}}{${2 * a}}`,
                `x = -\\dfrac{${b}}{${2 * a}} = ${h}`
            ],
            explain: `<strong>Method — completing the square:</strong><br>` +
                     `\\(f(x) = ${fTex}\\)<br><br>` +
                     `<strong>Shortcut:</strong> axis of symmetry \\(= -\\dfrac{b}{2a} = -\\dfrac{${b}}{2 \\times ${a}} = -\\dfrac{${b}}{${2 * a}} = ${h}\\).<br><br>` +
                     `<strong>Vertex form:</strong> \\(f(x) = ${aTex}(x - ${h})^2 + ${k}\\), so the vertex is \\((${h}, ${k})\\).<br><br>` +
                     `<strong>Answer:</strong> The x-coordinate of the vertex (and axis of symmetry) is \\(${h}\\).`
        };
    },

    /**
     * 6. qRotationalSymmetry — Identify order of rotational symmetry for y = x³ about origin (MC)
     */
    qRotationalSymmetry() {
        const options = MathUtils.shuffle([
            { label: 'Order 2 (180° rotational symmetry about the origin)', value: 1 },
            { label: 'Order 4 (90° rotational symmetry)', value: 0 },
            { label: 'No rotational symmetry', value: 0 },
            { label: 'Order 3 (120° rotational symmetry)', value: 0 }
        ]);

        return {
            type: 'mc',
            rule: 'Rotational Symmetry',
            difficulty: 'medium',
            text: `What is the order of rotational symmetry of \\(y = x^3\\) about the origin?`,
            latex: '',
            answer: 1,
            answerTex: 'Order 2',
            options,
            hintTex: [
                `\\text{An odd function satisfies } f(-x) = -f(x), \\text{ meaning it maps to itself under 180° rotation}`,
                `\\text{Rotating } y = x^3 \\text{ by 180° about the origin gives the same curve} \\checkmark`
            ],
            explain: `<strong>Key idea:</strong> A function is odd if \\(f(-x) = -f(x)\\), which means its graph is mapped onto itself by a 180° rotation about the origin.<br><br>` +
                     `<strong>Check:</strong> \\(f(-x) = (-x)^3 = -x^3 = -f(x)\\) \\(\\checkmark\\)<br><br>` +
                     `<strong>Therefore:</strong> \\(y = x^3\\) has <strong>order 2</strong> rotational symmetry about the origin — it coincides with itself after a 180° (half-turn) rotation.<br><br>` +
                     `Order 2 means it maps to itself every \\(360° \\div 2 = 180°\\).`
        };
    },

    /**
     * 7. qReflectYAxis — Reflect a point across the y-axis (free, numeric x-coord of image)
     */
    qReflectYAxis() {
        const x = MathUtils.nonZeroRandInt(-8, 8);
        const y = MathUtils.randInt(-8, 8);
        const imageX = -x;

        return {
            type: 'free',
            rule: 'Reflection in the y-axis',
            difficulty: 'easy',
            text: `The point \\((${x},\\, ${y})\\) is reflected across the y-axis. What is the x-coordinate of the image?`,
            latex: '',
            answer: imageX,
            tolerance: 0.01,
            answerTex: String(imageX),
            options: [],
            hintTex: [
                `\\text{Reflection in the y-axis: } (x, y) \\mapsto (-x, y)`,
                `(${x},\\, ${y}) \\mapsto (${imageX},\\, ${y})`
            ],
            explain: `<strong>Rule:</strong> Reflection in the y-axis maps \\((x, y) \\to (-x, y)\\) — the x-coordinate changes sign, the y-coordinate is unchanged.<br><br>` +
                     `<strong>Apply:</strong> \\((${x},\\, ${y}) \\to (${imageX},\\, ${y})\\).<br><br>` +
                     `<strong>Answer:</strong> The x-coordinate of the image is \\(${imageX}\\).`
        };
    },

    /**
     * 8. qReflectOrigin — Reflect a point through the origin (free, numeric x-coord of image)
     */
    qReflectOrigin() {
        const x = MathUtils.nonZeroRandInt(-8, 8);
        const y = MathUtils.nonZeroRandInt(-8, 8);
        const imageX = -x;
        const imageY = -y;

        return {
            type: 'free',
            rule: 'Reflection through the Origin',
            difficulty: 'easy',
            text: `The point \\((${x},\\, ${y})\\) is reflected through the origin. What is the x-coordinate of the image?`,
            latex: '',
            answer: imageX,
            tolerance: 0.01,
            answerTex: String(imageX),
            options: [],
            hintTex: [
                `\\text{Reflection through the origin: } (x, y) \\mapsto (-x, -y)`,
                `(${x},\\, ${y}) \\mapsto (${imageX},\\, ${imageY})`
            ],
            explain: `<strong>Rule:</strong> Reflection through the origin (half-turn, 180° rotation) maps \\((x, y) \\to (-x, -y)\\).<br><br>` +
                     `<strong>Apply:</strong> \\((${x},\\, ${y}) \\to (${imageX},\\, ${imageY})\\).<br><br>` +
                     `<strong>Answer:</strong> The x-coordinate of the image is \\(${imageX}\\).`
        };
    },

    /**
     * 9. qEvenFunction — Given f is even and f(a) = v, find f(-a) (free)
     */
    qEvenFunction() {
        const a = MathUtils.nonZeroRandInt(1, 9);
        const v = MathUtils.nonZeroRandInt(-10, 10);

        return {
            type: 'free',
            rule: 'Even Function Property',
            difficulty: 'easy',
            text: `Given that \\(f\\) is an even function and \\(f(${a}) = ${v}\\), find \\(f(-${a})\\).`,
            latex: '',
            answer: v,
            tolerance: 0.01,
            answerTex: String(v),
            options: [],
            hintTex: [
                `\\text{Even functions satisfy } f(-x) = f(x) \\text{ for all } x`,
                `f(-${a}) = f(${a}) = ${v}`
            ],
            explain: `<strong>Definition:</strong> An even function satisfies \\(f(-x) = f(x)\\) for all \\(x\\) in its domain.<br><br>` +
                     `<strong>Apply:</strong> \\(f(-${a}) = f(${a}) = ${v}\\).<br><br>` +
                     `<strong>Graphically:</strong> Even functions are symmetric about the y-axis, so the point \\((${a}, ${v})\\) has a mirror image at \\((-${a}, ${v})\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f(-${a}) = ${v}\\).`
        };
    },

    /**
     * 10. qOddFunction — Given f is odd and f(a) = v, find f(-a) (free)
     */
    qOddFunction() {
        const a = MathUtils.nonZeroRandInt(1, 9);
        const v = MathUtils.nonZeroRandInt(-10, 10);
        const negV = -v;

        return {
            type: 'free',
            rule: 'Odd Function Property',
            difficulty: 'easy',
            text: `Given that \\(f\\) is an odd function and \\(f(${a}) = ${v}\\), find \\(f(-${a})\\).`,
            latex: '',
            answer: negV,
            tolerance: 0.01,
            answerTex: String(negV),
            options: [],
            hintTex: [
                `\\text{Odd functions satisfy } f(-x) = -f(x) \\text{ for all } x`,
                `f(-${a}) = -f(${a}) = -(${v}) = ${negV}`
            ],
            explain: `<strong>Definition:</strong> An odd function satisfies \\(f(-x) = -f(x)\\) for all \\(x\\) in its domain.<br><br>` +
                     `<strong>Apply:</strong> \\(f(-${a}) = -f(${a}) = -(${v}) = ${negV}\\).<br><br>` +
                     `<strong>Graphically:</strong> Odd functions have 180° rotational symmetry about the origin, so the point \\((${a}, ${v})\\) maps to \\((-${a}, ${negV})\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f(-${a}) = ${negV}\\).`
        };
    }
};

ACTIVITY_INITS['symmetries'] = () => SYMMETRIES.load();
