/*
 * kinematics.js - IB Math AA 5.12: Kinematics
 * Position, velocity, acceleration, displacement, distance
 */

const KINEMATICS = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    roundTo(val, dp) { return Math.round(val * Math.pow(10, dp)) / Math.pow(10, dp); },

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    // Format polynomial term: coefficient * t^power
    polyTex(coeff, power, varName = 't') {
        if (coeff === 0) return '';
        const sign = coeff > 0 ? '+' : '-';
        const absC = Math.abs(coeff);
        if (power === 0) return `${coeff}`;
        if (power === 1) {
            if (absC === 1) return `${sign === '+' ? '' : '-'}${varName}`;
            return `${coeff}${varName}`;
        }
        if (absC === 1) return `${sign === '+' ? '' : '-'}${varName}^{${power}}`;
        return `${coeff}${varName}^{${power}}`;
    },

    // Build full polynomial LaTeX string
    buildPolyTex(terms) {
        // terms = [{c, p}] sorted by descending power
        let parts = [];
        for (const {c, p} of terms) {
            if (c === 0) continue;
            parts.push({c, p});
        }
        if (parts.length === 0) return '0';
        let result = '';
        parts.forEach((item, idx) => {
            const {c, p} = item;
            const absC = Math.abs(c);
            const sign = idx === 0 ? (c < 0 ? '-' : '') : (c < 0 ? ' - ' : ' + ');
            let term = '';
            if (p === 0) term = `${absC}`;
            else if (p === 1) term = absC === 1 ? 't' : `${absC}t`;
            else term = absC === 1 ? `t^{${p}}` : `${absC}t^{${p}}`;
            result += sign + term;
        });
        return result;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    qFindVelocity() {
        // s(t) = at^3 + bt^2 + ct + d, find v(t) = ds/dt at time T
        const a = MathUtils.randInt(-2, 2);
        const b = MathUtils.randInt(-4, 4);
        const c = MathUtils.randInt(-5, 5);
        const d = MathUtils.randInt(-10, 10);
        const T = MathUtils.randInt(1, 4);
        const sTex = KINEMATICS.buildPolyTex([{c: a, p: 3}, {c: b, p: 2}, {c: c, p: 1}, {c: d, p: 0}]);
        const vA = 3 * a, vB = 2 * b, vC = c;
        const vTex = KINEMATICS.buildPolyTex([{c: vA, p: 2}, {c: vB, p: 1}, {c: vC, p: 0}]);
        const answer = vA * T * T + vB * T + vC;
        return {
            type: 'free',
            rule: 'Velocity from Position',
            difficulty: 'easy',
            text: `The position of a particle at time \\(t\\) seconds is given by \\(s(t) = ${sTex}\\text{ m}\\).<br>Find the velocity at \\(t = ${T}\\).`,
            latex: '',
            answer: answer,
            answerTex: `${answer}\\text{ m s}^{-1}`,
            options: [],
            hintTex: [
                `v(t) = s'(t) = \\frac{ds}{dt}`,
                `v(t) = ${vTex}`,
                `v(${T}) = ${vA ? vA + '(' + T + ')^2' : ''}${vB >= 0 ? (vA ? '+' : '') + vB + '(' + T + ')' : vB + '(' + T + ')'}${vC >= 0 ? '+' + vC : vC}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(s(t) = ${sTex}\\).<br>` +
                     `\\(v(t) = s'(t) = ${vTex}\\)<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(t = ${T}\\).<br>` +
                     `\\(v(${T}) = ${vA}(${T})^2 + ${vB}(${T}) + ${vC} = ${answer}\\text{ m s}^{-1}\\)`
        };
    },

    qFindAcceleration() {
        // v(t) = at^2 + bt + c, find a(t) = dv/dt at time T
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-5, 5);
        const c = MathUtils.randInt(-8, 8);
        const T = MathUtils.randInt(0, 4);
        const vTex = KINEMATICS.buildPolyTex([{c: a, p: 2}, {c: b, p: 1}, {c: c, p: 0}]);
        const aCoeff = 2 * a, aConst = b;
        const aTex = KINEMATICS.buildPolyTex([{c: aCoeff, p: 1}, {c: aConst, p: 0}]);
        const answer = aCoeff * T + aConst;
        return {
            type: 'free',
            rule: 'Acceleration from Velocity',
            difficulty: 'easy',
            text: `The velocity of a particle at time \\(t\\) is \\(v(t) = ${vTex}\\text{ m s}^{-1}\\).<br>Find the acceleration at \\(t = ${T}\\).`,
            latex: '',
            answer: answer,
            answerTex: `${answer}\\text{ m s}^{-2}`,
            options: [],
            hintTex: [
                `a(t) = v'(t) = \\frac{dv}{dt}`,
                `a(t) = ${aTex}`,
                `a(${T}) = ${aCoeff}(${T}) + ${aConst}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(v(t) = ${vTex}\\).<br>` +
                     `\\(a(t) = v'(t) = ${aTex}\\)<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(t = ${T}\\).<br>` +
                     `\\(a(${T}) = ${aCoeff}(${T}) + ${aConst} = ${answer}\\text{ m s}^{-2}\\)`
        };
    },

    qDirectionChange() {
        // v(t) = a(t - p)(t - q) or at + b, find when v = 0
        const p = MathUtils.randInt(1, 5);
        const q = p + MathUtils.randInt(1, 4);
        const lead = MathUtils.randInt(1, 3);
        // v(t) = lead*(t-p)*(t-q) = lead*(t^2 - (p+q)t + pq)
        const vA = lead;
        const vB = -lead * (p + q);
        const vC = lead * p * q;
        const vTex = KINEMATICS.buildPolyTex([{c: vA, p: 2}, {c: vB, p: 1}, {c: vC, p: 0}]);
        // Object changes direction where v changes sign
        const roots = [p, q];
        const askIdx = Math.random() > 0.5 ? 0 : 1;
        const answer = roots[askIdx];
        const ask = askIdx === 0 ? 'first' : 'second';
        return {
            type: 'free',
            rule: 'Direction Change',
            difficulty: 'medium',
            text: `A particle moves with velocity \\(v(t) = ${vTex}\\text{ m s}^{-1}\\), \\(t \\geq 0\\).<br>Find the ${ask} time at which the particle changes direction.`,
            latex: '',
            answer: answer,
            answerTex: `t = ${answer}`,
            options: [],
            hintTex: [
                `\\text{The particle changes direction when } v(t) = 0 \\text{ and } v \\text{ changes sign.}`,
                `\\text{Solve } ${vTex} = 0`,
                `\\text{Factor: } ${vA}(t - ${p})(t - ${q}) = 0`
            ],
            explain: `<strong>Step 1:</strong> A particle changes direction when \\(v(t) = 0\\) and the sign of \\(v\\) changes.<br><br>` +
                     `<strong>Step 2:</strong> Solve \\(${vTex} = 0\\).<br>` +
                     `\\(${vA}(t - ${p})(t - ${q}) = 0 \\Rightarrow t = ${p}\\) or \\(t = ${q}\\)<br><br>` +
                     `<strong>Step 3:</strong> Check sign changes (velocity goes ${vA > 0 ? 'positive-negative-positive' : 'negative-positive-negative'}).<br>` +
                     `<strong>Answer:</strong> ${ask.charAt(0).toUpperCase() + ask.slice(1)} direction change at \\(t = ${answer}\\).`
        };
    },

    qDisplacement() {
        // v(t) = at + b, find displacement over [t1, t2]
        const a = MathUtils.nonZeroRandInt(-3, 3);
        const b = MathUtils.randInt(-6, 6);
        const t1 = MathUtils.randInt(0, 2);
        const t2 = t1 + MathUtils.randInt(2, 5);
        const vTex = KINEMATICS.buildPolyTex([{c: a, p: 1}, {c: b, p: 0}]);
        const sA = a / 2, sB = b;
        const sTex = KINEMATICS.buildPolyTex([{c: sA, p: 2}, {c: sB, p: 1}]);
        const answer = KINEMATICS.roundTo(
            (sA * t2 * t2 + sB * t2) - (sA * t1 * t1 + sB * t1), 2
        );
        return {
            type: 'free',
            rule: 'Displacement',
            difficulty: 'medium',
            text: `A particle has velocity \\(v(t) = ${vTex}\\text{ m s}^{-1}\\).<br>Find the displacement from \\(t = ${t1}\\) to \\(t = ${t2}\\).`,
            latex: '',
            answer: answer,
            answerTex: `${answer}\\text{ m}`,
            options: [],
            hintTex: [
                `\\text{Displacement} = \\int_{${t1}}^{${t2}} v(t)\\, dt`,
                `= \\left[${sTex.includes('t^2') ? sTex : sA + 't^2 + ' + sB + 't'}\\right]_{${t1}}^{${t2}}`
            ],
            explain: `<strong>Step 1:</strong> Displacement \\(= \\displaystyle\\int_{${t1}}^{${t2}} v(t)\\, dt = \\int_{${t1}}^{${t2}} (${vTex})\\, dt\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate: \\(= \\left[\\tfrac{${a}}{2}t^2 + ${b}t\\right]_{${t1}}^{${t2}}\\)<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(= (${KINEMATICS.roundTo(sA * t2 * t2 + sB * t2, 2)}) - (${KINEMATICS.roundTo(sA * t1 * t1 + sB * t1, 2)}) = ${answer}\\text{ m}\\)`
        };
    },

    qDistanceVsDisplacement() {
        // v(t) = a(t-p) for simple case, find distance over [0, T] where T > p
        const p = MathUtils.randInt(1, 4);
        const lead = MathUtils.randInt(1, 3);
        const T = p + MathUtils.randInt(1, 4);
        // v(t) = lead*(t - p), negative for t in [0,p], positive for t in [p,T]
        // Displacement = integral from 0 to T = lead * [t^2/2 - pt] from 0 to T
        const displ = KINEMATICS.roundTo(lead * (T * T / 2 - p * T), 2);
        // Distance = |integral 0 to p| + |integral p to T|
        const dist1 = Math.abs(lead * (p * p / 2 - p * p)); // = lead*p^2/2
        const dist2 = Math.abs(lead * (T * T / 2 - p * T) - lead * (p * p / 2 - p * p));
        const distance = KINEMATICS.roundTo(dist1 + dist2, 2);
        const vTex = KINEMATICS.buildPolyTex([{c: lead, p: 1}, {c: -lead * p, p: 0}]);
        const ask = Math.random() > 0.5 ? 'displacement' : 'distance';
        const answer = ask === 'displacement' ? displ : distance;
        return {
            type: 'free',
            rule: 'Distance vs Displacement',
            difficulty: 'hard',
            text: `A particle moves with velocity \\(v(t) = ${vTex}\\text{ m s}^{-1}\\) for \\(0 \\leq t \\leq ${T}\\).<br>Find the total <strong>${ask}</strong>.`,
            latex: '',
            answer: answer,
            answerTex: `${answer}\\text{ m}`,
            options: [],
            hintTex: [
                `\\text{Displacement} = \\int_0^{${T}} v(t)\\, dt`,
                `\\text{Distance} = \\int_0^{${T}} |v(t)|\\, dt \\text{ (split at zeros of } v\\text{)}`,
                `v(t) = 0 \\Rightarrow t = ${p}. \\text{ Split at } t = ${p}.`
            ],
            explain: `<strong>v(t) = 0 when t = ${p}</strong> (direction change).<br><br>` +
                     `<strong>Displacement</strong> \\(= \\displaystyle\\int_0^{${T}} ${vTex}\\, dt = \\left[\\tfrac{${lead}}{2}t^2 - ${lead * p}t\\right]_0^{${T}} = ${displ}\\text{ m}\\)<br><br>` +
                     `<strong>Distance</strong> \\(= \\displaystyle\\int_0^{${p}} |${vTex}|\\, dt + \\int_{${p}}^{${T}} |${vTex}|\\, dt = ${dist1} + ${dist2} = ${distance}\\text{ m}\\)<br><br>` +
                     `<strong>Answer (${ask}):</strong> \\(${answer}\\text{ m}\\)`
        };
    },

    qInitialValueProblem() {
        // a(t) = k (constant), v(0) = v0, s(0) = s0 - find s at time T
        const aVal = MathUtils.nonZeroRandInt(-4, 4);
        const v0 = MathUtils.randInt(-5, 5);
        const s0 = MathUtils.randInt(0, 20);
        const T = MathUtils.randInt(2, 5);
        // v(t) = aVal*t + v0
        // s(t) = aVal*t^2/2 + v0*t + s0
        const answer = KINEMATICS.roundTo(aVal * T * T / 2 + v0 * T + s0, 2);
        const vTex = KINEMATICS.buildPolyTex([{c: aVal, p: 1}, {c: v0, p: 0}]);
        const sTex = KINEMATICS.buildPolyTex([{c: aVal / 2, p: 2}, {c: v0, p: 1}, {c: s0, p: 0}]);
        return {
            type: 'free',
            rule: 'Initial Value Problem',
            difficulty: 'hard',
            text: `A particle has constant acceleration \\(a = ${aVal}\\text{ m s}^{-2}\\).<br>` +
                  `At \\(t = 0\\): velocity \\(= ${v0}\\text{ m s}^{-1}\\), position \\(= ${s0}\\text{ m}\\).<br>` +
                  `Find the position at \\(t = ${T}\\).`,
            latex: '',
            answer: answer,
            answerTex: `${answer}\\text{ m}`,
            options: [],
            hintTex: [
                `v(t) = \\int a\\, dt = ${aVal}t + C_1.\\quad v(0) = ${v0} \\Rightarrow C_1 = ${v0}`,
                `s(t) = \\int v(t)\\, dt = \\tfrac{${aVal}}{2}t^2 + ${v0}t + C_2.\\quad s(0) = ${s0} \\Rightarrow C_2 = ${s0}`,
                `s(${T}) = \\tfrac{${aVal}}{2}(${T})^2 + ${v0}(${T}) + ${s0}`
            ],
            explain: `<strong>Step 1:</strong> Integrate \\(a = ${aVal}\\) to get velocity.<br>` +
                     `\\(v(t) = ${aVal}t + C_1\\). Using \\(v(0) = ${v0}\\): \\(C_1 = ${v0}\\). So \\(v(t) = ${vTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate \\(v(t)\\) to get position.<br>` +
                     `\\(s(t) = \\tfrac{${aVal}}{2}t^2 + ${v0}t + C_2\\). Using \\(s(0) = ${s0}\\): \\(C_2 = ${s0}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate at \\(t = ${T}\\).<br>` +
                     `\\(s(${T}) = \\tfrac{${aVal}}{2}(${T})^2 + ${v0}(${T}) + ${s0} = ${answer}\\text{ m}\\)`
        };
    },

    qMaxHeight() {
        // Projectile: v(t) = u - gt, find max height
        const u = MathUtils.randInt(10, 30);
        const g = 10; // simplified
        const tMax = u / g;
        const s0 = MathUtils.randInt(0, 20);
        // s(t) = s0 + ut - gt^2/2
        const maxH = KINEMATICS.roundTo(s0 + u * tMax - g * tMax * tMax / 2, 2);
        return {
            type: 'free',
            rule: 'Maximum Height',
            difficulty: 'medium',
            text: `A ball is thrown upward from height \\(s_0 = ${s0}\\text{ m}\\) with initial velocity \\(u = ${u}\\text{ m s}^{-1}\\).<br>` +
                  `Using \\(g = 10\\text{ m s}^{-2}\\), find the maximum height reached.`,
            latex: '',
            answer: maxH,
            answerTex: `${maxH}\\text{ m}`,
            options: [],
            hintTex: [
                `s(t) = ${s0} + ${u}t - 5t^2`,
                `\\text{Max height when } v(t) = 0: \\quad v(t) = ${u} - 10t = 0 \\Rightarrow t = ${tMax}`,
                `s(${tMax}) = ${s0} + ${u}(${tMax}) - 5(${tMax})^2`
            ],
            explain: `<strong>Step 1:</strong> \\(s(t) = ${s0} + ${u}t - 5t^2\\), \\(v(t) = ${u} - 10t\\).<br><br>` +
                     `<strong>Step 2:</strong> Max height when \\(v = 0\\): \\(${u} - 10t = 0 \\Rightarrow t = ${tMax}\\text{ s}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(s(${tMax}) = ${s0} + ${u}(${tMax}) - 5(${tMax})^2 = ${maxH}\\text{ m}\\)`
        };
    },

    /* ────────────────────────────────────────────
       QUESTION DISPATCH
       ──────────────────────────────────────────── */

    next() {
        KINEMATICS.answered = false;
        KINEMATICS.hintIndex = 0;

        const qs = {
            easy:   [KINEMATICS.qFindVelocity, KINEMATICS.qFindAcceleration],
            medium: [KINEMATICS.qDirectionChange, KINEMATICS.qDisplacement, KINEMATICS.qMaxHeight],
            hard:   [KINEMATICS.qDistanceVsDisplacement, KINEMATICS.qInitialValueProblem]
        };
        const lvl = KINEMATICS.level === 'all'
            ? ['easy', 'easy', 'medium', 'medium', 'hard'][MathUtils.randInt(0, 4)]
            : KINEMATICS.level;
        const pool = qs[lvl] || qs.easy;
        KINEMATICS.currentQ = pool[MathUtils.randInt(0, pool.length - 1)]();

        const q = KINEMATICS.currentQ;
        document.getElementById('kin-rule').textContent = q.rule;
        document.getElementById('kin-difficulty').textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        document.getElementById('kin-text').innerHTML = q.text;
        document.getElementById('kin-latex').innerHTML = q.latex;

        const fb = document.getElementById('kin-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById('kin-hint-box').innerHTML = '';
        document.getElementById('kin-next-btn').style.display = 'none';
        document.getElementById('kin-hint-btn').style.display = '';

        const area = document.getElementById('kin-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map(opt =>
                `<button class="mc-btn" data-value="${opt.value}" onclick="KINEMATICS.checkMC(this)">\\(${opt.tex}\\)</button>`
            ).join('');
        } else {
            area.innerHTML = `
                <div style="display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;">
                    <input type="number" step="any" id="kin-input" class="free-input" placeholder="Enter answer" />
                    <button class="btn btn-primary" onclick="KINEMATICS.checkFree()">Check</button>
                </div>`;
            const inp = document.getElementById('kin-input');
            if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') KINEMATICS.checkFree(); });
        }
        KINEMATICS.renderAllKaTeX();
    },

    showHint() {
        const q = KINEMATICS.currentQ;
        if (!q || !q.hintTex) return;
        const box = document.getElementById('kin-hint-box');
        if (KINEMATICS.hintIndex < q.hintTex.length) {
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + `\\(${q.hintTex[KINEMATICS.hintIndex]}\\)`;
            KINEMATICS.hintIndex++;
            KINEMATICS.renderAllKaTeX();
        }
    },

    checkMC(btn) {
        if (KINEMATICS.answered) return;
        KINEMATICS.answered = true; KINEMATICS.total++;
        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.mc-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });
        if (isCorrect) { btn.classList.add('correct'); KINEMATICS.score++; KINEMATICS.streak++; }
        else { btn.classList.add('incorrect'); KINEMATICS.streak = 0; }
        KINEMATICS.showFeedback(isCorrect);
        KINEMATICS.updateStats();
    },

    checkFree() {
        if (KINEMATICS.answered) return;
        const inp = document.getElementById('kin-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        KINEMATICS.answered = true; KINEMATICS.total++; inp.disabled = true;
        const isCorrect = MathUtils.approxEqual(val, KINEMATICS.currentQ.answer, 0.01);
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)'; inp.style.background = 'var(--success-light)';
            KINEMATICS.score++; KINEMATICS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)'; inp.style.background = 'var(--error-light)';
            KINEMATICS.streak = 0;
        }
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;
        KINEMATICS.showFeedback(isCorrect);
        KINEMATICS.updateStats();
    },

    showFeedback(isCorrect) {
        const q = KINEMATICS.currentQ;
        const fb = document.getElementById('kin-feedback');
        const title = document.getElementById('kin-feedback-title');
        const explanation = document.getElementById('kin-feedback-explanation');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            title.textContent = KINEMATICS.streak > 1 ? `Correct! (${KINEMATICS.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }
        explanation.innerHTML = q.explain;
        document.getElementById('kin-next-btn').style.display = '';
        document.getElementById('kin-hint-btn').style.display = 'none';
        KINEMATICS.renderAllKaTeX();
    },

    updateStats() {
        const s = document.getElementById('kin-score');
        const t = document.getElementById('kin-total');
        const k = document.getElementById('kin-streak');
        const a = document.getElementById('kin-accuracy');
        if (s) s.textContent = KINEMATICS.score;
        if (t) t.textContent = KINEMATICS.total;
        if (k) k.textContent = KINEMATICS.streak;
        if (a) a.textContent = KINEMATICS.total > 0 ? Math.round((KINEMATICS.score / KINEMATICS.total) * 100) + '%' : '-';
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
        KINEMATICS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn =>
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl)
        );
        KINEMATICS.score = 0; KINEMATICS.total = 0; KINEMATICS.streak = 0;
        KINEMATICS.updateStats();
        KINEMATICS.next();
    },

    load() {
        KINEMATICS.score = 0; KINEMATICS.total = 0;
        KINEMATICS.streak = 0; KINEMATICS.answered = false;
        KINEMATICS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="KINEMATICS.unload()">Kinematics (5.12)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Kinematics</h1>
                <p>IB Math AA 5.12 - Position, velocity, acceleration, displacement, distance</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="KINEMATICS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="KINEMATICS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="KINEMATICS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="KINEMATICS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="kin-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="kin-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="kin-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="kin-accuracy">-</div></div>
            </div>
            <div class="question-card" id="kin-question-card">
                <span class="rule-tag" id="kin-rule"></span>
                <span class="difficulty-tag" id="kin-difficulty"></span>
                <div class="question-text" id="kin-text"></div>
                <div class="question-prompt" id="kin-latex"></div>
                <div id="kin-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="kin-hint-box"></div>
            <div class="feedback" id="kin-feedback">
                <div class="feedback-title" id="kin-feedback-title"></div>
                <div class="feedback-explanation" id="kin-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="kin-hint-btn" onclick="KINEMATICS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="kin-next-btn" onclick="KINEMATICS.next()" style="display:none;">Next Question</button>
            </div>
        `;
        KINEMATICS.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('calculus');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['kinematics'] = () => KINEMATICS.load();
}
