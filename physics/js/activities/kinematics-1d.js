/*
 * kinematics-1d.js - IB Physics A.1: Kinematics
 * SUVAT equations, free fall, projectile motion, deceleration
 */

const PHYS_KINEMATICS = {
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

    // EASY: v = u + at  (given u, a, t → find v)
    qSUVAT_v() {
        const u = MathUtils.randInt(0, 20);
        const a = MathUtils.randInt(1, 8);
        const t = MathUtils.randInt(2, 10);
        const v = u + a * t;
        const contexts = [
            `A train accelerates from \\(${u}\\text{ m s}^{-1}\\) with a constant acceleration of \\(${a}\\text{ m s}^{-2}\\) for \\(${t}\\text{ s}\\). Find the final velocity.`,
            `A cyclist starts at \\(${u}\\text{ m s}^{-1}\\) and accelerates at \\(${a}\\text{ m s}^{-2}\\) for \\(${t}\\text{ s}\\). What is the cyclist's final velocity?`,
            `A car at \\(${u}\\text{ m s}^{-1}\\) accelerates uniformly at \\(${a}\\text{ m s}^{-2}\\) for \\(${t}\\text{ s}\\). Find its speed at the end.`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: 'SUVAT: v = u + at',
            difficulty: 'easy',
            text,
            latex: '',
            answer: v,
            answerTex: `${v}\\text{ m s}^{-1}`,
            options: [],
            hintTex: [
                `\\text{Use: } v = u + at`,
                `v = ${u} + ${a} \\times ${t}`,
                `v = ${u} + ${a * t} = ${v}\\text{ m s}^{-1}`
            ],
            explain: `<strong>Identify the known quantities:</strong> \\(u = ${u}\\text{ m s}^{-1}\\), \\(a = ${a}\\text{ m s}^{-2}\\), \\(t = ${t}\\text{ s}\\).<br><br>` +
                     `<strong>Apply:</strong> \\(v = u + at\\)<br>` +
                     `\\(v = ${u} + (${a})(${t}) = ${u} + ${a * t} = ${v}\\text{ m s}^{-1}\\)`
        };
    },

    // EASY: s = (u+v)/2 * t  (given u, v, t → find s)
    qSUVAT_s() {
        const u = MathUtils.randInt(2, 15);
        const v = u + MathUtils.randInt(2, 12);
        const t = MathUtils.randInt(2, 10);
        const s = PHYS_KINEMATICS.roundTo((u + v) / 2 * t, 2);
        const contexts = [
            `A bus accelerates uniformly from \\(${u}\\text{ m s}^{-1}\\) to \\(${v}\\text{ m s}^{-1}\\) in \\(${t}\\text{ s}\\). How far does it travel?`,
            `A ball rolls, speeding up uniformly from \\(${u}\\text{ m s}^{-1}\\) to \\(${v}\\text{ m s}^{-1}\\) over \\(${t}\\text{ s}\\). Find the displacement.`,
            `A sprinter increases speed from \\(${u}\\text{ m s}^{-1}\\) to \\(${v}\\text{ m s}^{-1}\\) over \\(${t}\\text{ s}\\). What distance is covered?`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: 'SUVAT: s = (u+v)t/2',
            difficulty: 'easy',
            text,
            latex: '',
            answer: s,
            answerTex: `${s}\\text{ m}`,
            options: [],
            hintTex: [
                `\\text{Use: } s = \\dfrac{u + v}{2} \\cdot t`,
                `s = \\dfrac{${u} + ${v}}{2} \\times ${t}`,
                `s = \\dfrac{${u + v}}{2} \\times ${t} = ${(u + v) / 2} \\times ${t}`
            ],
            explain: `<strong>Known:</strong> \\(u = ${u}\\text{ m s}^{-1}\\), \\(v = ${v}\\text{ m s}^{-1}\\), \\(t = ${t}\\text{ s}\\).<br><br>` +
                     `<strong>Apply:</strong> \\(s = \\dfrac{u + v}{2} \\cdot t\\)<br>` +
                     `\\(s = \\dfrac{${u} + ${v}}{2} \\times ${t} = ${(u + v) / 2} \\times ${t} = ${s}\\text{ m}\\)`
        };
    },

    // MEDIUM: s = ut + 0.5at²  (given u, a, t → find s)
    qSUVAT_s2() {
        const u = MathUtils.randInt(0, 15);
        const a = MathUtils.randInt(1, 6);
        const t = MathUtils.randInt(3, 8);
        const s = PHYS_KINEMATICS.roundTo(u * t + 0.5 * a * t * t, 2);
        const half_at2 = PHYS_KINEMATICS.roundTo(0.5 * a * t * t, 2);
        const ut = u * t;
        const contexts = [
            `A motorbike starts at \\(${u}\\text{ m s}^{-1}\\) and accelerates at \\(${a}\\text{ m s}^{-2}\\) for \\(${t}\\text{ s}\\). Find the distance travelled.`,
            `A rocket sled starts at \\(${u}\\text{ m s}^{-1}\\) and accelerates uniformly at \\(${a}\\text{ m s}^{-2}\\). How far does it travel in \\(${t}\\text{ s}\\)?`,
            `A stone is pushed along ice with initial velocity \\(${u}\\text{ m s}^{-1}\\) and acceleration \\(${a}\\text{ m s}^{-2}\\). Find displacement after \\(${t}\\text{ s}\\).`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: 'SUVAT: s = ut + ½at²',
            difficulty: 'medium',
            text,
            latex: '',
            answer: s,
            answerTex: `${s}\\text{ m}`,
            options: [],
            hintTex: [
                `\\text{Use: } s = ut + \\tfrac{1}{2}at^2`,
                `s = (${u})(${t}) + \\tfrac{1}{2}(${a})(${t})^2`,
                `s = ${ut} + ${half_at2} = ${s}\\text{ m}`
            ],
            explain: `<strong>Known:</strong> \\(u = ${u}\\text{ m s}^{-1}\\), \\(a = ${a}\\text{ m s}^{-2}\\), \\(t = ${t}\\text{ s}\\).<br><br>` +
                     `<strong>Apply:</strong> \\(s = ut + \\tfrac{1}{2}at^2\\)<br>` +
                     `\\(s = (${u})(${t}) + \\tfrac{1}{2}(${a})(${t})^2\\)<br>` +
                     `\\(s = ${ut} + ${half_at2} = ${s}\\text{ m}\\)`
        };
    },

    // MEDIUM: v² = u² + 2as → find a  (given u, v, s)
    qSUVAT_a() {
        const u = MathUtils.randInt(5, 20);
        const dv = MathUtils.randInt(5, 15);
        const v = u + dv;
        const s = MathUtils.randInt(20, 100);
        // a = (v^2 - u^2) / (2s)
        const a = PHYS_KINEMATICS.roundTo((v * v - u * u) / (2 * s), 3);
        const contexts = [
            `A car accelerates from \\(${u}\\text{ m s}^{-1}\\) to \\(${v}\\text{ m s}^{-1}\\) over a distance of \\(${s}\\text{ m}\\). Find the acceleration.`,
            `A train increases its speed from \\(${u}\\text{ m s}^{-1}\\) to \\(${v}\\text{ m s}^{-1}\\) over \\(${s}\\text{ m}\\). What is the acceleration?`,
            `A cyclist goes from \\(${u}\\text{ m s}^{-1}\\) to \\(${v}\\text{ m s}^{-1}\\) in \\(${s}\\text{ m}\\). Calculate the acceleration.`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        const v2 = v * v;
        const u2 = u * u;
        const diff = v2 - u2;
        return {
            type: 'free',
            rule: 'SUVAT: v² = u² + 2as',
            difficulty: 'medium',
            text,
            latex: '',
            answer: a,
            answerTex: `${a}\\text{ m s}^{-2}`,
            options: [],
            hintTex: [
                `\\text{Use: } v^2 = u^2 + 2as \\text{, rearrange for } a`,
                `a = \\dfrac{v^2 - u^2}{2s} = \\dfrac{${v2} - ${u2}}{2 \\times ${s}}`,
                `a = \\dfrac{${diff}}{${2 * s}} = ${a}\\text{ m s}^{-2}`
            ],
            explain: `<strong>Known:</strong> \\(u = ${u}\\text{ m s}^{-1}\\), \\(v = ${v}\\text{ m s}^{-1}\\), \\(s = ${s}\\text{ m}\\).<br><br>` +
                     `<strong>Rearrange</strong> \\(v^2 = u^2 + 2as\\) for \\(a\\):<br>` +
                     `\\(a = \\dfrac{v^2 - u^2}{2s} = \\dfrac{${v2} - ${u2}}{2 \\times ${s}} = \\dfrac{${diff}}{${2 * s}} = ${a}\\text{ m s}^{-2}\\)`
        };
    },

    // HARD: free fall — dropped from height h, find time to hit ground AND speed at impact
    qFreeFall() {
        const g = 9.81;
        const h = MathUtils.randInt(10, 80);
        // s = ut + 0.5gt^2, u=0 → h = 0.5*g*t^2 → t = sqrt(2h/g)
        const t = PHYS_KINEMATICS.roundTo(Math.sqrt(2 * h / g), 2);
        // v = gt
        const vImpact = PHYS_KINEMATICS.roundTo(g * t, 2);
        const askTime = Math.random() > 0.5;
        const answer = askTime ? t : vImpact;
        const contexts = [
            { obj: 'ball', loc: `a cliff of height \\(${h}\\text{ m}\\)` },
            { obj: 'rock', loc: `a building of height \\(${h}\\text{ m}\\)` },
            { obj: 'coin', loc: `a ledge \\(${h}\\text{ m}\\) above the ground` }
        ];
        const ctx = contexts[MathUtils.randInt(0, contexts.length - 1)];
        const question = askTime
            ? `A ${ctx.obj} is dropped from rest off ${ctx.loc}. Using \\(g = 9.81\\text{ m s}^{-2}\\), find the time for it to reach the ground.`
            : `A ${ctx.obj} is dropped from rest off ${ctx.loc}. Using \\(g = 9.81\\text{ m s}^{-2}\\), find its speed just before hitting the ground.`;
        return {
            type: 'free',
            rule: 'Free Fall',
            difficulty: 'hard',
            text: question,
            latex: '',
            answer,
            answerTex: askTime ? `${t}\\text{ s}` : `${vImpact}\\text{ m s}^{-1}`,
            options: [],
            hintTex: [
                `u = 0\\text{ (dropped from rest), } a = g = 9.81\\text{ m s}^{-2}`,
                `\\text{Use } s = \\tfrac{1}{2}gt^2 \\Rightarrow t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{2 \\times ${h}}{9.81}}`,
                `t = ${t}\\text{ s}\\quad\\Rightarrow\\quad v = gt = 9.81 \\times ${t} = ${vImpact}\\text{ m s}^{-1}`
            ],
            explain: `<strong>Step 1 - Set up:</strong> Object dropped from rest, so \\(u = 0\\), \\(a = g = 9.81\\text{ m s}^{-2}\\), \\(s = ${h}\\text{ m}\\).<br><br>` +
                     `<strong>Step 2 - Find time:</strong> \\(s = \\tfrac{1}{2}gt^2 \\Rightarrow t = \\sqrt{\\dfrac{2s}{g}} = \\sqrt{\\dfrac{2 \\times ${h}}{9.81}} = \\sqrt{${PHYS_KINEMATICS.roundTo(2 * h / g, 3)}} = ${t}\\text{ s}\\)<br><br>` +
                     `<strong>Step 3 - Find impact speed:</strong> \\(v = gt = 9.81 \\times ${t} = ${vImpact}\\text{ m s}^{-1}\\)<br><br>` +
                     `<strong>Answer:</strong> \\(${askTime ? 't = ' + t + '\\text{ s}' : 'v = ' + vImpact + '\\text{ m s}^{-1}'}\\)`
        };
    },

    // HARD: projectile — given horizontal and vertical launch speeds, find time of flight and range
    qProjectile() {
        const g = 9.81;
        const ux = MathUtils.randInt(8, 20);
        const uy = MathUtils.randInt(10, 25);
        // Time of flight (launched from ground level): t = 2*uy/g
        const tFlight = PHYS_KINEMATICS.roundTo(2 * uy / g, 2);
        // Range: R = ux * tFlight
        const R = PHYS_KINEMATICS.roundTo(ux * tFlight, 2);
        const askRange = Math.random() > 0.5;
        const answer = askRange ? R : tFlight;
        const contexts = [
            `A ball is kicked from the ground with horizontal velocity \\(${ux}\\text{ m s}^{-1}\\) and vertical velocity \\(${uy}\\text{ m s}^{-1}\\).`,
            `A projectile is launched from level ground with horizontal component \\(${ux}\\text{ m s}^{-1}\\) and vertical component \\(${uy}\\text{ m s}^{-1}\\).`,
            `A stone is thrown horizontally at \\(${ux}\\text{ m s}^{-1}\\) and vertically at \\(${uy}\\text{ m s}^{-1}\\) from ground level.`
        ];
        const ctx = contexts[MathUtils.randInt(0, contexts.length - 1)];
        const question = askRange
            ? `${ctx} Using \\(g = 9.81\\text{ m s}^{-2}\\), find the horizontal range.`
            : `${ctx} Using \\(g = 9.81\\text{ m s}^{-2}\\), find the total time of flight.`;
        const twoUy = PHYS_KINEMATICS.roundTo(2 * uy, 2);
        return {
            type: 'free',
            rule: 'Projectile Motion',
            difficulty: 'hard',
            text: question,
            latex: '',
            answer,
            answerTex: askRange ? `${R}\\text{ m}` : `${tFlight}\\text{ s}`,
            options: [],
            hintTex: [
                `\\text{Vertical: } v_y = u_y - gt. \\text{ At peak, } v_y = 0 \\Rightarrow t_{\\text{peak}} = \\dfrac{u_y}{g}`,
                `t_{\\text{flight}} = \\dfrac{2u_y}{g} = \\dfrac{2 \\times ${uy}}{9.81} = ${tFlight}\\text{ s}`,
                `\\text{Range} = u_x \\times t_{\\text{flight}} = ${ux} \\times ${tFlight} = ${R}\\text{ m}`
            ],
            explain: `<strong>Step 1 - Vertical motion (find time of flight):</strong><br>` +
                     `At launch \\(v_y = u_y = ${uy}\\text{ m s}^{-1}\\). At peak, \\(v_y = 0\\).<br>` +
                     `\\(t_{\\text{peak}} = \\dfrac{u_y}{g} = \\dfrac{${uy}}{9.81} = ${PHYS_KINEMATICS.roundTo(uy / g, 3)}\\text{ s}\\)<br>` +
                     `By symmetry: \\(t_{\\text{flight}} = 2 \\times ${PHYS_KINEMATICS.roundTo(uy / g, 3)} = ${tFlight}\\text{ s}\\)<br><br>` +
                     `<strong>Step 2 - Horizontal motion (constant velocity):</strong><br>` +
                     `\\(R = u_x \\times t_{\\text{flight}} = ${ux} \\times ${tFlight} = ${R}\\text{ m}\\)<br><br>` +
                     `<strong>Answer:</strong> \\(${askRange ? 'R = ' + R + '\\text{ m}' : 't_{\\text{flight}} = ' + tFlight + '\\text{ s}'}\\)`
        };
    },

    // MEDIUM: braking — car decelerates to rest, find stopping distance
    qDeceleration() {
        const g = 9.81;
        const uKmh = MathUtils.randInt(40, 120);
        const u = PHYS_KINEMATICS.roundTo(uKmh / 3.6, 2);   // convert to m/s
        const a = PHYS_KINEMATICS.roundTo(-(MathUtils.randInt(30, 80) / 10), 1); // -3.0 to -8.0 m/s^2
        const aAbs = Math.abs(a);
        // v^2 = u^2 + 2as → s = -u^2/(2a) = u^2/(2*aAbs)
        const s = PHYS_KINEMATICS.roundTo(u * u / (2 * aAbs), 1);
        const u2 = PHYS_KINEMATICS.roundTo(u * u, 2);
        const denom = PHYS_KINEMATICS.roundTo(2 * aAbs, 1);
        const contexts = [
            `A car travelling at \\(${uKmh}\\text{ km h}^{-1}\\) (\\(${u}\\text{ m s}^{-1}\\)) applies brakes with deceleration \\(${aAbs}\\text{ m s}^{-2}\\). Find the stopping distance.`,
            `A truck moving at \\(${uKmh}\\text{ km h}^{-1}\\) (\\(${u}\\text{ m s}^{-1}\\)) brakes uniformly at \\(${aAbs}\\text{ m s}^{-2}\\). How far does it travel before stopping?`,
            `A van at \\(${uKmh}\\text{ km h}^{-1}\\) (\\(${u}\\text{ m s}^{-1}\\)) decelerates at \\(${aAbs}\\text{ m s}^{-2}\\). Calculate the stopping distance.`
        ];
        const text = contexts[MathUtils.randInt(0, contexts.length - 1)];
        return {
            type: 'free',
            rule: 'Deceleration / Braking',
            difficulty: 'medium',
            text,
            latex: '',
            answer: s,
            answerTex: `${s}\\text{ m}`,
            options: [],
            hintTex: [
                `\\text{Use: } v^2 = u^2 + 2as \\text{, with } v = 0`,
                `0 = u^2 + 2as \\Rightarrow s = -\\dfrac{u^2}{2a} = \\dfrac{u^2}{2 \\times ${aAbs}}`,
                `s = \\dfrac{${u2}}{${denom}} = ${s}\\text{ m}`
            ],
            explain: `<strong>Step 1 - Convert and identify:</strong> \\(u = ${u}\\text{ m s}^{-1}\\), \\(v = 0\\text{ m s}^{-1}\\) (stops), \\(a = -${aAbs}\\text{ m s}^{-2}\\).<br><br>` +
                     `<strong>Step 2 - Rearrange</strong> \\(v^2 = u^2 + 2as\\):<br>` +
                     `\\(0 = (${u})^2 + 2(-${aAbs})s \\Rightarrow s = \\dfrac{(${u})^2}{2 \\times ${aAbs}}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(s = \\dfrac{${u2}}{${denom}} = ${s}\\text{ m}\\)`
        };
    },

    /* ────────────────────────────────────────────
       QUESTION DISPATCH
       ──────────────────────────────────────────── */

    next() {
        const q = PHYS_KINEMATICS.currentQ;
        if (q && !PHYS_KINEMATICS.answered) { PHYS_KINEMATICS.total++; }
        PHYS_KINEMATICS.answered = false;
        PHYS_KINEMATICS.hintIndex = 0;

        document.getElementById('pk1-feedback').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('pk1-hint-box').innerHTML = '';
        document.getElementById('pk1-next-btn').style.display = 'none';
        document.getElementById('pk1-hint-btn').style.display = '';

        const qs = {
            easy:   [PHYS_KINEMATICS.qSUVAT_v, PHYS_KINEMATICS.qSUVAT_s],
            medium: [PHYS_KINEMATICS.qSUVAT_s2, PHYS_KINEMATICS.qSUVAT_a, PHYS_KINEMATICS.qDeceleration],
            hard:   [PHYS_KINEMATICS.qFreeFall, PHYS_KINEMATICS.qProjectile]
        };
        const lvl = PHYS_KINEMATICS.level === 'all'
            ? ['easy', 'easy', 'medium', 'medium', 'hard'][MathUtils.randInt(0, 4)]
            : PHYS_KINEMATICS.level;
        const pool = qs[lvl] || qs.easy;
        PHYS_KINEMATICS.currentQ = pool[MathUtils.randInt(0, pool.length - 1)]();
        PHYS_KINEMATICS.render();
    },

    render() {
        const q = PHYS_KINEMATICS.currentQ;
        document.getElementById('pk1-rule').textContent = q.rule;
        document.getElementById('pk1-difficulty').textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        document.getElementById('pk1-difficulty').className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('pk1-text').innerHTML = q.text;
        document.getElementById('pk1-latex').innerHTML = q.latex || '';
        const area = document.getElementById('pk1-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="mc-btn" onclick="PHYS_KINEMATICS.checkMC(${i})">${o}</button>`
            ).join('');
        } else {
            area.innerHTML = `<div class="free-answer-row">
                <input type="number" step="any" id="pk1-ans" class="free-input" placeholder="e.g. 12.5">
                <button class="btn btn-primary" onclick="PHYS_KINEMATICS.checkFree()">Check</button>
            </div>`;
            const inp = document.getElementById('pk1-ans');
            if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') PHYS_KINEMATICS.checkFree(); });
        }
        PHYS_KINEMATICS.renderAllKaTeX();
    },

    showHint() {
        const q = PHYS_KINEMATICS.currentQ;
        if (!q || !q.hintTex || PHYS_KINEMATICS.hintIndex >= q.hintTex.length) return;
        const box = document.getElementById('pk1-hint-box');
        box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') +
            `<strong>Hint ${PHYS_KINEMATICS.hintIndex + 1}:</strong> \\(${q.hintTex[PHYS_KINEMATICS.hintIndex]}\\)`;
        box.classList.add('show');
        PHYS_KINEMATICS.hintIndex++;
        PHYS_KINEMATICS.renderAllKaTeX();
    },

    checkMC(idx) {
        if (PHYS_KINEMATICS.answered) return;
        PHYS_KINEMATICS.answered = true; PHYS_KINEMATICS.total++;
        const isCorrect = idx === PHYS_KINEMATICS.currentQ.correctIndex;
        document.querySelectorAll('.mc-btn').forEach((b, i) => {
            b.disabled = true;
            if (i === PHYS_KINEMATICS.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !isCorrect) b.classList.add('incorrect');
        });
        if (isCorrect) { PHYS_KINEMATICS.score++; PHYS_KINEMATICS.streak++; } else { PHYS_KINEMATICS.streak = 0; }
        PHYS_KINEMATICS.showFeedback(isCorrect);
        PHYS_KINEMATICS.updateStats();
    },

    checkFree() {
        if (PHYS_KINEMATICS.answered) return;
        const inp = document.getElementById('pk1-ans');
        if (!inp || inp.value.trim() === '') return;
        PHYS_KINEMATICS.answered = true; PHYS_KINEMATICS.total++;
        const userVal = parseFloat(inp.value);
        const ans = PHYS_KINEMATICS.currentQ.answer;
        const isCorrect = !isNaN(userVal) && Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)'; inp.style.background = 'var(--success-light)';
            PHYS_KINEMATICS.score++; PHYS_KINEMATICS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)'; inp.style.background = 'var(--error-light)';
            PHYS_KINEMATICS.streak = 0;
        }
        inp.disabled = true;
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;
        PHYS_KINEMATICS.showFeedback(isCorrect);
        PHYS_KINEMATICS.updateStats();
    },

    showFeedback(isCorrect) {
        const q = PHYS_KINEMATICS.currentQ;
        const fb = document.getElementById('pk1-feedback');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        document.getElementById('pk1-feedback-title').innerHTML = isCorrect
            ? (PHYS_KINEMATICS.streak > 1 ? `Correct! (${PHYS_KINEMATICS.streak} streak)` : 'Correct!')
            : `Incorrect. The answer is \\(${q.answerTex}\\).`;
        document.getElementById('pk1-feedback-explanation').innerHTML = q.explain;
        document.getElementById('pk1-next-btn').style.display = '';
        document.getElementById('pk1-hint-btn').style.display = 'none';
        PHYS_KINEMATICS.renderAllKaTeX();
    },

    updateStats() {
        ['score', 'total', 'streak', 'accuracy'].forEach(id => {
            const el = document.getElementById('pk1-' + id);
            if (!el) return;
            if (id === 'accuracy') el.textContent = PHYS_KINEMATICS.total > 0 ? Math.round((PHYS_KINEMATICS.score / PHYS_KINEMATICS.total) * 100) + '%' : '-';
            else el.textContent = PHYS_KINEMATICS[id];
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
        PHYS_KINEMATICS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn =>
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl)
        );
        PHYS_KINEMATICS.score = 0; PHYS_KINEMATICS.total = 0; PHYS_KINEMATICS.streak = 0;
        PHYS_KINEMATICS.updateStats();
        PHYS_KINEMATICS.next();
    },

    load() {
        PHYS_KINEMATICS.score = 0; PHYS_KINEMATICS.total = 0;
        PHYS_KINEMATICS.streak = 0; PHYS_KINEMATICS.answered = false;
        PHYS_KINEMATICS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PHYS_KINEMATICS.unload()">Topic A: Space, Time and Motion</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Kinematics</h1>
                <p>IB Physics A.1 - Motion in 1D, SUVAT equations, projectile motion</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="PHYS_KINEMATICS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="PHYS_KINEMATICS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="PHYS_KINEMATICS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="PHYS_KINEMATICS.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="pk1-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="pk1-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="pk1-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="pk1-accuracy">-</div></div>
            </div>
            <div class="question-card" id="pk1-question-card">
                <span class="rule-tag" id="pk1-rule"></span>
                <span class="difficulty-tag" id="pk1-difficulty"></span>
                <div class="question-text" id="pk1-text"></div>
                <div class="question-prompt" id="pk1-latex"></div>
                <div id="pk1-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="pk1-hint-box"></div>
            <div class="feedback" id="pk1-feedback">
                <div class="feedback-title" id="pk1-feedback-title"></div>
                <div class="feedback-explanation" id="pk1-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="pk1-hint-btn" onclick="PHYS_KINEMATICS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pk1-next-btn" onclick="PHYS_KINEMATICS.next()" style="display:none;">Next Question</button>
            </div>
        `;
        PHYS_KINEMATICS.next();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-a');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['kinematics-1d'] = () => PHYS_KINEMATICS.load();
