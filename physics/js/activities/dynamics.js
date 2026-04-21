/*
 * dynamics.js - IB Physics A.2: Forces and Dynamics
 * Newton's laws, friction, momentum, impulse, Atwood machine, inclined planes
 */

const PHYS_DYNAMICS = {
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

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    // EASY: F = ma → find a  (given mass and net force)
    qNewton2() {
        const m = MathUtils.randInt(2, 30);
        const F = MathUtils.randInt(10, 200);
        const a = PHYS_DYNAMICS.roundTo(F / m, 3);
        const contexts = [
            `A net force of \\(${F}\\text{ N}\\) acts on a \\(${m}\\text{ kg}\\) block on a frictionless surface. Find the acceleration.`,
            `A \\(${m}\\text{ kg}\\) trolley experiences a net force of \\(${F}\\text{ N}\\). What is its acceleration?`,
            `A resultant force of \\(${F}\\text{ N}\\) is applied to a \\(${m}\\text{ kg}\\) crate. Calculate the acceleration.`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: "Newton's 2nd Law: F = ma",
            difficulty: 'easy',
            text,
            latex: '',
            answer: a,
            answerTex: `${a}\\text{ m s}^{-2}`,
            options: [],
            hintTex: [
                `\\text{Newton's Second Law: } F_{\\text{net}} = ma`,
                `a = \\dfrac{F}{m} = \\dfrac{${F}}{${m}}`,
                `a = ${a}\\text{ m s}^{-2}`
            ],
            explain: `<strong>Apply Newton's Second Law:</strong> \\(F_{\\text{net}} = ma\\)<br><br>` +
                     `<strong>Rearrange for \\(a\\):</strong><br>` +
                     `\\(a = \\dfrac{F}{m} = \\dfrac{${F}}{${m}} = ${a}\\text{ m s}^{-2}\\)`
        };
    },

    // EASY: W = mg, then acceleration component down a slope
    qWeight() {
        const g = 9.81;
        const m = MathUtils.randInt(2, 25);
        const W = PHYS_DYNAMICS.roundTo(m * g, 2);
        // Ask either weight or force down a given slope
        const askWeight = Math.random() > 0.5;
        if (askWeight) {
            return {
                type: 'free',
                rule: 'Weight: W = mg',
                difficulty: 'easy',
                text: `Calculate the weight of a \\(${m}\\text{ kg}\\) object. Use \\(g = 9.81\\text{ m s}^{-2}\\).`,
                latex: '',
                answer: W,
                answerTex: `${W}\\text{ N}`,
                options: [],
                hintTex: [
                    `\\text{Weight} = mg`,
                    `W = ${m} \\times 9.81`,
                    `W = ${W}\\text{ N}`
                ],
                explain: `<strong>Apply:</strong> \\(W = mg = ${m} \\times 9.81 = ${W}\\text{ N}\\)`
            };
        } else {
            const theta = MathUtils.randInt(20, 60);
            const sinTheta = PHYS_DYNAMICS.roundTo(Math.sin(theta * Math.PI / 180), 4);
            const Fdown = PHYS_DYNAMICS.roundTo(m * g * sinTheta, 2);
            return {
                type: 'free',
                rule: 'Weight Component on Slope',
                difficulty: 'easy',
                text: `A \\(${m}\\text{ kg}\\) block sits on a frictionless slope inclined at \\(${theta}°\\). Find the component of weight acting along the slope. Use \\(g = 9.81\\text{ m s}^{-2}\\).`,
                latex: '',
                answer: Fdown,
                answerTex: `${Fdown}\\text{ N}`,
                options: [],
                hintTex: [
                    `\\text{Weight component along slope} = mg\\sin\\theta`,
                    `F = ${m} \\times 9.81 \\times \\sin(${theta}°)`,
                    `F = ${W} \\times ${sinTheta} = ${Fdown}\\text{ N}`
                ],
                explain: `<strong>Step 1:</strong> Weight \\(W = mg = ${m} \\times 9.81 = ${W}\\text{ N}\\)<br><br>` +
                         `<strong>Step 2:</strong> Component along slope \\(= W\\sin\\theta = ${W} \\times \\sin(${theta}°)\\)<br>` +
                         `\\(= ${W} \\times ${sinTheta} = ${Fdown}\\text{ N}\\)`
            };
        }
    },

    // MEDIUM: friction — given coefficient and normal force, find friction, then net force and acceleration
    qFriction() {
        const g = 9.81;
        const m = MathUtils.randInt(5, 20);
        const mu = PHYS_DYNAMICS.roundTo(MathUtils.randInt(1, 5) / 10, 1);   // 0.1 to 0.5
        const N = PHYS_DYNAMICS.roundTo(m * g, 2);
        const Ff = PHYS_DYNAMICS.roundTo(mu * N, 2);
        const F_applied = PHYS_DYNAMICS.roundTo(Ff + m * (MathUtils.randInt(1, 5)), 1); // ensure motion
        const Fnet = PHYS_DYNAMICS.roundTo(F_applied - Ff, 2);
        const a = PHYS_DYNAMICS.roundTo(Fnet / m, 3);
        const contexts = [
            `A \\(${m}\\text{ kg}\\) box is pushed horizontally across a floor with coefficient of kinetic friction \\(\\mu_k = ${mu}\\). An applied force of \\(${F_applied}\\text{ N}\\) acts on it. Find the acceleration. Use \\(g = 9.81\\text{ m s}^{-2}\\).`,
            `A \\(${m}\\text{ kg}\\) crate slides on a surface with \\(\\mu_k = ${mu}\\). A horizontal push of \\(${F_applied}\\text{ N}\\) is applied. Calculate the acceleration. (\\(g = 9.81\\text{ m s}^{-2}\\))`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: 'Friction and Net Force',
            difficulty: 'medium',
            text,
            latex: '',
            answer: a,
            answerTex: `${a}\\text{ m s}^{-2}`,
            options: [],
            hintTex: [
                `f_k = \\mu_k N = \\mu_k mg`,
                `f_k = ${mu} \\times ${N} = ${Ff}\\text{ N}`,
                `F_{\\text{net}} = F_{\\text{applied}} - f_k = ${F_applied} - ${Ff} = ${Fnet}\\text{ N} \\Rightarrow a = \\dfrac{${Fnet}}{${m}}`
            ],
            explain: `<strong>Step 1 - Normal force:</strong> On a horizontal surface, \\(N = mg = ${m} \\times 9.81 = ${N}\\text{ N}\\)<br><br>` +
                     `<strong>Step 2 - Friction force:</strong> \\(f_k = \\mu_k N = ${mu} \\times ${N} = ${Ff}\\text{ N}\\)<br><br>` +
                     `<strong>Step 3 - Net force:</strong> \\(F_{\\text{net}} = ${F_applied} - ${Ff} = ${Fnet}\\text{ N}\\)<br><br>` +
                     `<strong>Step 4 - Acceleration:</strong> \\(a = \\dfrac{F_{\\text{net}}}{m} = \\dfrac{${Fnet}}{${m}} = ${a}\\text{ m s}^{-2}\\)`
        };
    },

    // MEDIUM: momentum — either find momentum p = mv, or find velocity after impulse
    qMomentum() {
        const askMomentum = Math.random() > 0.5;
        if (askMomentum) {
            const m = MathUtils.randInt(500, 5000);   // grams → kg
            const mKg = PHYS_DYNAMICS.roundTo(m / 1000, 2);
            const v = MathUtils.randInt(2, 40);
            const p = PHYS_DYNAMICS.roundTo(mKg * v, 3);
            const contexts = [
                `A \\(${m}\\text{ g}\\) (\\(${mKg}\\text{ kg}\\)) ball moves at \\(${v}\\text{ m s}^{-1}\\). Calculate its momentum.`,
                `A \\(${mKg}\\text{ kg}\\) hockey puck travels at \\(${v}\\text{ m s}^{-1}\\). Find its momentum.`,
                `A \\(${mKg}\\text{ kg}\\) toy car rolls at \\(${v}\\text{ m s}^{-1}\\). What is its momentum?`
            ];
            return {
                type: 'free',
                rule: 'Momentum: p = mv',
                difficulty: 'medium',
                text: contexts[MathUtils.randInt(0, contexts.length - 1)],
                latex: '',
                answer: p,
                answerTex: `${p}\\text{ kg m s}^{-1}`,
                options: [],
                hintTex: [
                    `p = mv`,
                    `p = ${mKg} \\times ${v}`,
                    `p = ${p}\\text{ kg m s}^{-1}`
                ],
                explain: `<strong>Apply:</strong> \\(p = mv = ${mKg} \\times ${v} = ${p}\\text{ kg m s}^{-1}\\)`
            };
        } else {
            const m = MathUtils.randInt(2, 15);
            const u = MathUtils.randInt(0, 10);
            const impulse = MathUtils.randInt(20, 100);
            // J = delta_p = m*(v - u) → v = u + J/m
            const v = PHYS_DYNAMICS.roundTo(u + impulse / m, 3);
            const contexts = [
                `A \\(${m}\\text{ kg}\\) trolley moving at \\(${u}\\text{ m s}^{-1}\\) receives an impulse of \\(${impulse}\\text{ N s}\\). Find the final velocity.`,
                `A \\(${m}\\text{ kg}\\) block initially moving at \\(${u}\\text{ m s}^{-1}\\) is given an impulse of \\(${impulse}\\text{ N s}\\). What is its new velocity?`
            ];
            return {
                type: 'free',
                rule: 'Impulse-Momentum Theorem',
                difficulty: 'medium',
                text: contexts[MathUtils.randInt(0, contexts.length - 1)],
                latex: '',
                answer: v,
                answerTex: `${v}\\text{ m s}^{-1}`,
                options: [],
                hintTex: [
                    `J = \\Delta p = m(v - u)`,
                    `v - u = \\dfrac{J}{m} = \\dfrac{${impulse}}{${m}}`,
                    `v = ${u} + ${PHYS_DYNAMICS.roundTo(impulse / m, 3)} = ${v}\\text{ m s}^{-1}`
                ],
                explain: `<strong>Impulse-momentum theorem:</strong> \\(J = \\Delta p = m(v - u)\\)<br><br>` +
                         `<strong>Rearrange:</strong> \\(v = u + \\dfrac{J}{m} = ${u} + \\dfrac{${impulse}}{${m}} = ${u} + ${PHYS_DYNAMICS.roundTo(impulse / m, 3)} = ${v}\\text{ m s}^{-1}\\)`
            };
        }
    },

    // HARD: Atwood machine — two masses over a pulley, find acceleration
    qAtwood() {
        const g = 9.81;
        const m1 = MathUtils.randInt(3, 15);
        const dm = MathUtils.randInt(1, 5);
        const m2 = m1 + dm;   // m2 > m1 so m2 side descends
        // a = (m2 - m1)*g / (m1 + m2)
        const a = PHYS_DYNAMICS.roundTo((m2 - m1) * g / (m1 + m2), 3);
        const diffM = m2 - m1;
        const sumM = m1 + m2;
        const numerator = PHYS_DYNAMICS.roundTo(diffM * g, 3);
        const contexts = [
            `An Atwood machine has masses \\(m_1 = ${m1}\\text{ kg}\\) and \\(m_2 = ${m2}\\text{ kg}\\) connected by a light string over a frictionless pulley. Find the acceleration of the system. Use \\(g = 9.81\\text{ m s}^{-2}\\).`,
            `Two masses \\(${m1}\\text{ kg}\\) and \\(${m2}\\text{ kg}\\) hang on either side of a massless frictionless pulley. What is the acceleration? (\\(g = 9.81\\text{ m s}^{-2}\\))`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: 'Atwood Machine',
            difficulty: 'hard',
            text,
            latex: '',
            answer: a,
            answerTex: `${a}\\text{ m s}^{-2}`,
            options: [],
            hintTex: [
                `\\text{Net force} = (m_2 - m_1)g,\\quad \\text{total mass} = m_1 + m_2`,
                `a = \\dfrac{(m_2 - m_1)g}{m_1 + m_2} = \\dfrac{(${m2} - ${m1}) \\times 9.81}{${m1} + ${m2}}`,
                `a = \\dfrac{${diffM} \\times 9.81}{${sumM}} = \\dfrac{${numerator}}{${sumM}} = ${a}\\text{ m s}^{-2}`
            ],
            explain: `<strong>Step 1 - Equations of motion:</strong><br>` +
                     `For \\(m_2\\) (descends): \\(m_2 g - T = m_2 a\\)<br>` +
                     `For \\(m_1\\) (ascends): \\(T - m_1 g = m_1 a\\)<br><br>` +
                     `<strong>Step 2 - Add equations to eliminate T:</strong><br>` +
                     `\\((m_2 - m_1)g = (m_1 + m_2)a\\)<br><br>` +
                     `<strong>Step 3 - Solve for a:</strong><br>` +
                     `\\(a = \\dfrac{(m_2 - m_1)g}{m_1 + m_2} = \\dfrac{${diffM} \\times 9.81}{${sumM}} = \\dfrac{${numerator}}{${sumM}} = ${a}\\text{ m s}^{-2}\\)`
        };
    },

    // MEDIUM: impulse J = F*t → find change in momentum, then final velocity
    qImpulse() {
        const F = MathUtils.randInt(10, 100);
        const t = PHYS_DYNAMICS.roundTo(MathUtils.randInt(1, 20) / 10, 1);  // 0.1 to 2.0 s
        const J = PHYS_DYNAMICS.roundTo(F * t, 2);
        const m = MathUtils.randInt(2, 15);
        const u = MathUtils.randInt(0, 8);
        const v = PHYS_DYNAMICS.roundTo(u + J / m, 3);
        const askImpulse = Math.random() > 0.5;
        const answer = askImpulse ? J : v;
        const question = askImpulse
            ? `A force of \\(${F}\\text{ N}\\) acts on an object for \\(${t}\\text{ s}\\). Calculate the impulse delivered.`
            : `A force of \\(${F}\\text{ N}\\) acts on a \\(${m}\\text{ kg}\\) object for \\(${t}\\text{ s}\\). The object's initial velocity is \\(${u}\\text{ m s}^{-1}\\). Find the final velocity.`;
        return {
            type: 'free',
            rule: 'Impulse: J = FΔt',
            difficulty: 'medium',
            text: question,
            latex: '',
            answer,
            answerTex: askImpulse ? `${J}\\text{ N s}` : `${v}\\text{ m s}^{-1}`,
            options: [],
            hintTex: askImpulse
                ? [
                    `J = F \\Delta t`,
                    `J = ${F} \\times ${t}`,
                    `J = ${J}\\text{ N s}`
                ]
                : [
                    `J = F \\Delta t = ${F} \\times ${t} = ${J}\\text{ N s}`,
                    `J = m(v - u) \\Rightarrow v = u + \\dfrac{J}{m}`,
                    `v = ${u} + \\dfrac{${J}}{${m}} = ${v}\\text{ m s}^{-1}`
                ],
            explain: askImpulse
                ? `<strong>Apply:</strong> \\(J = F \\Delta t = ${F} \\times ${t} = ${J}\\text{ N s}\\)`
                : `<strong>Step 1 - Find impulse:</strong> \\(J = F \\Delta t = ${F} \\times ${t} = ${J}\\text{ N s}\\)<br><br>` +
                  `<strong>Step 2 - Use impulse-momentum theorem:</strong> \\(J = m(v - u)\\)<br>` +
                  `\\(v = u + \\dfrac{J}{m} = ${u} + \\dfrac{${J}}{${m}} = ${v}\\text{ m s}^{-1}\\)`
        };
    },

    // MEDIUM: frictionless incline — find acceleration (a = g sin theta)
    qIncline() {
        const g = 9.81;
        const theta = MathUtils.randInt(15, 55);
        const sinTheta = PHYS_DYNAMICS.roundTo(Math.sin(theta * Math.PI / 180), 4);
        const a = PHYS_DYNAMICS.roundTo(g * sinTheta, 3);
        const m = MathUtils.randInt(2, 20);
        const contexts = [
            `A \\(${m}\\text{ kg}\\) block is placed on a smooth frictionless incline of angle \\(${theta}°\\). Find the acceleration of the block down the slope. Use \\(g = 9.81\\text{ m s}^{-2}\\).`,
            `A \\(${m}\\text{ kg}\\) puck slides down a frictionless ramp inclined at \\(${theta}°\\) to the horizontal. What is its acceleration? (\\(g = 9.81\\text{ m s}^{-2}\\))`,
            `A block of mass \\(${m}\\text{ kg}\\) slides freely (no friction) down a slope at \\(${theta}°\\). Calculate the acceleration along the slope. (\\(g = 9.81\\text{ m s}^{-2}\\))`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: 'Motion on a Frictionless Incline',
            difficulty: 'medium',
            text,
            latex: '',
            answer: a,
            answerTex: `${a}\\text{ m s}^{-2}`,
            options: [],
            hintTex: [
                `\\text{Net force along slope} = mg\\sin\\theta`,
                `a = \\dfrac{mg\\sin\\theta}{m} = g\\sin\\theta`,
                `a = 9.81 \\times \\sin(${theta}°) = 9.81 \\times ${sinTheta} = ${a}\\text{ m s}^{-2}`
            ],
            explain: `<strong>Step 1 - Resolve forces along the incline:</strong><br>` +
                     `The component of weight along the slope \\(= mg\\sin\\theta\\). Normal force is perpendicular so does no work along slope.<br><br>` +
                     `<strong>Step 2 - Apply Newton's 2nd Law along slope:</strong><br>` +
                     `\\(ma = mg\\sin\\theta \\Rightarrow a = g\\sin\\theta\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(a = 9.81 \\times \\sin(${theta}°) = 9.81 \\times ${sinTheta} = ${a}\\text{ m s}^{-2}\\)`
        };
    },

    /* ────────────────────────────────────────────
       QUESTION DISPATCH
       ──────────────────────────────────────────── */

    next() {
        const q = PHYS_DYNAMICS.currentQ;
        if (q && !PHYS_DYNAMICS.answered) { PHYS_DYNAMICS.total++; }
        PHYS_DYNAMICS.answered = false;
        PHYS_DYNAMICS.hintIndex = 0;

        document.getElementById('pdyn-feedback').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('pdyn-hint-box').innerHTML = '';
        document.getElementById('pdyn-next-btn').style.display = 'none';
        document.getElementById('pdyn-hint-btn').style.display = '';

        const qs = {
            easy:   [PHYS_DYNAMICS.qNewton2, PHYS_DYNAMICS.qWeight],
            medium: [PHYS_DYNAMICS.qFriction, PHYS_DYNAMICS.qMomentum, PHYS_DYNAMICS.qImpulse, PHYS_DYNAMICS.qIncline],
            hard:   [PHYS_DYNAMICS.qAtwood]
        };
        const lvl = PHYS_DYNAMICS.level === 'all'
            ? ['easy', 'easy', 'medium', 'medium', 'hard'][MathUtils.randInt(0, 4)]
            : PHYS_DYNAMICS.level;
        const pool = qs[lvl] || qs.easy;
        PHYS_DYNAMICS.currentQ = pool[MathUtils.randInt(0, pool.length - 1)]();
        PHYS_DYNAMICS.render();
    },

    render() {
        const q = PHYS_DYNAMICS.currentQ;
        document.getElementById('pdyn-rule').textContent = q.rule;
        document.getElementById('pdyn-difficulty').textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        document.getElementById('pdyn-difficulty').className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('pdyn-text').innerHTML = q.text;
        document.getElementById('pdyn-latex').innerHTML = q.latex || '';
        const area = document.getElementById('pdyn-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="mc-btn" onclick="PHYS_DYNAMICS.checkMC(${i})">${o}</button>`
            ).join('');
        } else {
            area.innerHTML = `<div class="free-answer-row">
                <input type="number" step="any" id="pdyn-ans" class="free-input" placeholder="e.g. 4.9">
                <button class="btn btn-primary" onclick="PHYS_DYNAMICS.checkFree()">Check</button>
            </div>`;
            const inp = document.getElementById('pdyn-ans');
            if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') PHYS_DYNAMICS.checkFree(); });
        }
        PHYS_DYNAMICS.renderAllKaTeX();
    },

    showHint() {
        const q = PHYS_DYNAMICS.currentQ;
        if (!q || !q.hintTex || PHYS_DYNAMICS.hintIndex >= q.hintTex.length) return;
        const box = document.getElementById('pdyn-hint-box');
        box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') +
            `<strong>Hint ${PHYS_DYNAMICS.hintIndex + 1}:</strong> \\(${q.hintTex[PHYS_DYNAMICS.hintIndex]}\\)`;
        box.classList.add('show');
        PHYS_DYNAMICS.hintIndex++;
        PHYS_DYNAMICS.renderAllKaTeX();
    },

    checkMC(idx) {
        if (PHYS_DYNAMICS.answered) return;
        PHYS_DYNAMICS.answered = true; PHYS_DYNAMICS.total++;
        const isCorrect = idx === PHYS_DYNAMICS.currentQ.correctIndex;
        document.querySelectorAll('.mc-btn').forEach((b, i) => {
            b.disabled = true;
            if (i === PHYS_DYNAMICS.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !isCorrect) b.classList.add('incorrect');
        });
        if (isCorrect) { PHYS_DYNAMICS.score++; PHYS_DYNAMICS.streak++; } else { PHYS_DYNAMICS.streak = 0; }
        PHYS_DYNAMICS.showFeedback(isCorrect);
        PHYS_DYNAMICS.updateStats();
    },

    checkFree() {
        if (PHYS_DYNAMICS.answered) return;
        const inp = document.getElementById('pdyn-ans');
        if (!inp || inp.value.trim() === '') return;
        PHYS_DYNAMICS.answered = true; PHYS_DYNAMICS.total++;
        const userVal = parseFloat(inp.value);
        const ans = PHYS_DYNAMICS.currentQ.answer;
        const isCorrect = !isNaN(userVal) && Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)'; inp.style.background = 'var(--success-light)';
            PHYS_DYNAMICS.score++; PHYS_DYNAMICS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)'; inp.style.background = 'var(--error-light)';
            PHYS_DYNAMICS.streak = 0;
        }
        inp.disabled = true;
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;
        PHYS_DYNAMICS.showFeedback(isCorrect);
        PHYS_DYNAMICS.updateStats();
    },

    showFeedback(isCorrect) {
        const q = PHYS_DYNAMICS.currentQ;
        const fb = document.getElementById('pdyn-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        document.getElementById('pdyn-feedback-title').innerHTML = isCorrect
            ? (PHYS_DYNAMICS.streak > 1 ? `Correct! (${PHYS_DYNAMICS.streak} streak)` : 'Correct!')
            : `Incorrect. The answer is \\(${q.answerTex}\\).`;
        document.getElementById('pdyn-feedback-explanation').innerHTML = q.explain;
        document.getElementById('pdyn-next-btn').style.display = '';
        document.getElementById('pdyn-hint-btn').style.display = 'none';
        PHYS_DYNAMICS.renderAllKaTeX();
    },

    updateStats() {
        ['score', 'total', 'streak', 'accuracy'].forEach(id => {
            const el = document.getElementById('pdyn-' + id);
            if (!el) return;
            if (id === 'accuracy') el.textContent = PHYS_DYNAMICS.total > 0 ? Math.round((PHYS_DYNAMICS.score / PHYS_DYNAMICS.total) * 100) + '%' : '-';
            else el.textContent = PHYS_DYNAMICS[id];
        });
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
        PHYS_DYNAMICS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn =>
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl)
        );
        PHYS_DYNAMICS.score = 0; PHYS_DYNAMICS.total = 0; PHYS_DYNAMICS.streak = 0;
        PHYS_DYNAMICS.updateStats();
        PHYS_DYNAMICS.next();
    },

    load() {
        PHYS_DYNAMICS.score = 0; PHYS_DYNAMICS.total = 0;
        PHYS_DYNAMICS.streak = 0; PHYS_DYNAMICS.answered = false;
        PHYS_DYNAMICS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PHYS_DYNAMICS.unload()">Topic A: Space, Time and Motion</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Forces and Dynamics</h1>
                <p>IB Physics A.2 - Newton's laws, friction, momentum, impulse</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="PHYS_DYNAMICS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="PHYS_DYNAMICS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="PHYS_DYNAMICS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="PHYS_DYNAMICS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="pdyn-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="pdyn-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="pdyn-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="pdyn-accuracy">-</div></div>
            </div>
            <div class="question-card" id="pdyn-question-card">
                <span class="rule-tag" id="pdyn-rule"></span>
                <span class="difficulty-tag" id="pdyn-difficulty"></span>
                <div class="question-text" id="pdyn-text"></div>
                <div class="question-prompt" id="pdyn-latex"></div>
                <div id="pdyn-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="pdyn-hint-box"></div>
            <div class="feedback" id="pdyn-feedback">
                <div class="feedback-title" id="pdyn-feedback-title"></div>
                <div class="feedback-explanation" id="pdyn-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="pdyn-hint-btn" onclick="PHYS_DYNAMICS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pdyn-next-btn" onclick="PHYS_DYNAMICS.next()" style="display:none;">Next Question</button>
            </div>
        `;
        PHYS_DYNAMICS.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-a');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['dynamics'] = () => PHYS_DYNAMICS.load();
