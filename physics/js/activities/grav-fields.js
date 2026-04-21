const PHYS_GRAV = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIndex: 0,

    // Physical constants
    G: 6.674e-11,
    M_Earth: 5.97e24,
    R_Earth: 6.37e6,

    /* ═══════════════════════════════════════════════
       QUESTION GENERATORS
       ═══════════════════════════════════════════════ */

    // 1. Newton's law of gravitation: F = Gm1m2/r²
    qGravForce() {
        const G = PHYS_GRAV.G;
        const scenarios = [
            () => {
                // Planet-moon scenario
                const m1 = MathUtils.randInt(3, 9) * 1e23;   // planet mass
                const m2 = MathUtils.randInt(5, 20) * 1e20;  // moon mass
                const r  = MathUtils.randInt(2, 8) * 1e8;    // separation
                const F  = G * m1 * m2 / (r * r);
                return {
                    text: 'A planet of mass \\(' + m1.toExponential(2) + '\\text{ kg}\\) and a moon of mass \\(' +
                          m2.toExponential(2) + '\\text{ kg}\\) are separated by \\(' + r.toExponential(2) +
                          '\\text{ m}\\). Calculate the gravitational force between them.',
                    latex: 'F = \\,?\\;\\text{(N)}',
                    answer: F,
                    answerTex: 'F = ' + F.toExponential(3) + '\\text{ N}',
                    m1, m2, r, F,
                    explain: '\\(F = \\dfrac{Gm_1m_2}{r^2} = \\dfrac{(' + G.toExponential(3) + ')(' + m1.toExponential(2) + ')(' +
                             m2.toExponential(2) + ')}{(' + r.toExponential(2) + ')^2} = ' + F.toExponential(3) + '\\text{ N}\\)'
                };
            },
            () => {
                // Two spacecraft scenario
                const m1 = MathUtils.randInt(2, 10) * 1e4;   // spacecraft 1 mass (10s of tonnes)
                const m2 = MathUtils.randInt(2, 10) * 1e4;   // spacecraft 2 mass
                const r  = MathUtils.randInt(50, 500);        // separation in metres
                const F  = G * m1 * m2 / (r * r);
                return {
                    text: 'Two spacecraft, of masses \\(' + m1.toExponential(1) + '\\text{ kg}\\) and \\(' +
                          m2.toExponential(1) + '\\text{ kg}\\), are \\(' + r + '\\text{ m}\\) apart. ' +
                          'Calculate the magnitude of the gravitational force between them.',
                    latex: 'F = \\,?\\;\\text{(N)}',
                    answer: F,
                    answerTex: 'F = ' + F.toExponential(3) + '\\text{ N}',
                    m1, m2, r, F,
                    explain: '\\(F = \\dfrac{Gm_1m_2}{r^2} = \\dfrac{(' + G.toExponential(3) + ')(' + m1.toExponential(1) + ')(' +
                             m2.toExponential(1) + ')}{(' + r + ')^2} = ' + F.toExponential(3) + '\\text{ N}\\)'
                };
            }
        ];
        const s = MathUtils.pick(scenarios)();
        return {
            type: 'free',
            rule: "Newton's Law of Gravitation",
            difficulty: 'medium',
            text: s.text,
            latex: s.latex,
            answer: s.answer,
            answerTex: s.answerTex,
            tolerance: Math.abs(s.answer * 0.01) + 0.01,
            hintTex: [
                "Newton's law of gravitation: \\(F = \\dfrac{Gm_1 m_2}{r^2}\\)",
                '\\(G = 6.674 \\times 10^{-11}\\text{ N m}^2\\text{ kg}^{-2}\\). Substitute and calculate.'
            ],
            explain: s.explain
        };
    },

    // 2. Gravitational field strength g = GM/R²
    qFieldStrength() {
        const G = PHYS_GRAV.G;
        const M_E = PHYS_GRAV.M_Earth;
        const R_E = PHYS_GRAV.R_Earth;

        const variants = [
            () => {
                // g on surface of a given planet
                const M = MathUtils.randInt(3, 30) * 1e23;
                const R = MathUtils.randInt(3, 15) * 1e6;
                const g = G * M / (R * R);
                return {
                    text: 'A planet has mass \\(' + M.toExponential(2) + '\\text{ kg}\\) and radius \\(' +
                          R.toExponential(2) + '\\text{ m}\\). Calculate the gravitational field strength at its surface.',
                    latex: 'g = \\,?\\;\\text{(N kg}^{-1}\\text{)}',
                    answer: g,
                    answerTex: 'g = ' + g.toFixed(2) + '\\text{ N kg}^{-1}',
                    explain: '\\(g = \\dfrac{GM}{R^2} = \\dfrac{(' + G.toExponential(3) + ')(' + M.toExponential(2) +
                             ')}{(' + R.toExponential(2) + ')^2} = ' + g.toFixed(2) + '\\text{ N kg}^{-1}\\)'
                };
            },
            () => {
                // g at altitude h above Earth
                const h = MathUtils.randInt(1, 10) * 1e6;
                const r = R_E + h;
                const g = G * M_E / (r * r);
                return {
                    text: 'Calculate the gravitational field strength at an altitude of \\(' + (h / 1e6).toFixed(0) +
                          ' \\times 10^6 \\text{ m}\\) above Earth\'s surface. ' +
                          '(Earth: \\(M = 5.97 \\times 10^{24}\\text{ kg}\\), \\(R = 6.37 \\times 10^6\\text{ m}\\))',
                    latex: 'g = \\,?\\;\\text{(N kg}^{-1}\\text{)}',
                    answer: g,
                    answerTex: 'g = ' + g.toFixed(3) + '\\text{ N kg}^{-1}',
                    explain: '\\(r = R + h = (6.37 + ' + (h / 1e6).toFixed(0) + ') \\times 10^6 = ' +
                             (r / 1e6).toFixed(2) + ' \\times 10^6\\text{ m}\\).<br>' +
                             '\\(g = \\dfrac{GM}{r^2} = \\dfrac{(' + G.toExponential(3) + ')(5.97 \\times 10^{24})}{(' +
                             r.toExponential(3) + ')^2} = ' + g.toFixed(3) + '\\text{ N kg}^{-1}\\)'
                };
            }
        ];
        const v = MathUtils.pick(variants)();
        return {
            type: 'free',
            rule: 'Gravitational Field Strength',
            difficulty: 'easy',
            text: v.text,
            latex: v.latex,
            answer: v.answer,
            answerTex: v.answerTex,
            tolerance: Math.abs(v.answer * 0.01) + 0.01,
            hintTex: [
                'Gravitational field strength: \\(g = \\dfrac{GM}{r^2}\\)',
                'At altitude \\(h\\), use \\(r = R_{\\text{planet}} + h\\) (not just \\(h\\)).'
            ],
            explain: v.explain
        };
    },

    // 3. Orbital velocity: v = √(GM/r)
    qOrbitalVelocity() {
        const G = PHYS_GRAV.G;
        const M_E = PHYS_GRAV.M_Earth;
        const R_E = PHYS_GRAV.R_Earth;

        const orbits = [
            { name: 'low Earth orbit', r: MathUtils.randInt(640, 900) * 1e4 },   // ~6400–9000 km from centre
            { name: 'medium Earth orbit', r: MathUtils.randInt(15, 25) * 1e6 },
            { name: 'geostationary orbit', r: 4.22e7 }
        ];
        const orbit = MathUtils.pick(orbits);
        const r = orbit.r;
        const v = Math.sqrt(G * M_E / r);

        return {
            type: 'free',
            rule: 'Orbital Speed',
            difficulty: 'medium',
            text: 'A satellite orbits Earth at a radius of \\(' + r.toExponential(3) + '\\text{ m}\\) from Earth\'s centre. ' +
                  'Calculate its orbital speed. (Earth: \\(M = 5.97 \\times 10^{24}\\text{ kg}\\))',
            latex: 'v = \\,?\\;\\text{(m s}^{-1}\\text{)}',
            answer: v,
            answerTex: 'v = ' + v.toFixed(0) + '\\text{ m s}^{-1}',
            tolerance: Math.abs(v * 0.01) + 0.01,
            hintTex: [
                'For circular orbit, gravitational force provides centripetal force: \\(\\dfrac{GMm}{r^2} = \\dfrac{mv^2}{r}\\)',
                'Solve for \\(v\\): \\(v = \\sqrt{\\dfrac{GM}{r}}\\)'
            ],
            explain: '\\(v = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{(' + G.toExponential(3) + ')(5.97 \\times 10^{24})}{' +
                     r.toExponential(3) + '}} = ' + v.toFixed(0) + '\\text{ m s}^{-1}\\)'
        };
    },

    // 4. Orbital period: T² = 4π²r³/(GM)
    qOrbitalPeriod() {
        const G = PHYS_GRAV.G;
        const M_E = PHYS_GRAV.M_Earth;

        const findT = Math.random() < 0.5;

        if (findT) {
            const r = MathUtils.randInt(7, 50) * 1e6;   // orbital radius
            const T = 2 * Math.PI * Math.sqrt(r * r * r / (G * M_E));
            const Thours = T / 3600;
            return {
                type: 'free',
                rule: "Kepler's 3rd Law",
                difficulty: 'hard',
                text: 'A satellite orbits Earth at a radius of \\(' + r.toExponential(2) + '\\text{ m}\\) from the centre. ' +
                      'Calculate its orbital period in hours. (Earth: \\(M = 5.97 \\times 10^{24}\\text{ kg}\\))',
                latex: 'T = \\,?\\;\\text{(hours)}',
                answer: Thours,
                answerTex: 'T = ' + Thours.toFixed(2) + '\\text{ hours}',
                tolerance: Math.abs(Thours * 0.01) + 0.01,
                hintTex: [
                    "Kepler's 3rd law: \\(T^2 = \\dfrac{4\\pi^2 r^3}{GM}\\). Rearrange to find \\(T\\).",
                    '\\(T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}\\). Convert seconds to hours by dividing by 3600.'
                ],
                explain: '\\(T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}} = 2\\pi\\sqrt{\\dfrac{(' + r.toExponential(2) + ')^3}{(' +
                         G.toExponential(3) + ')(5.97 \\times 10^{24})}} = ' + T.toFixed(0) +
                         '\\text{ s} = ' + Thours.toFixed(2) + '\\text{ hours}\\)'
            };
        } else {
            const T = MathUtils.randInt(2, 30) * 3600;  // period in seconds
            const r = Math.cbrt(G * M_E * T * T / (4 * Math.PI * Math.PI));
            return {
                type: 'free',
                rule: "Kepler's 3rd Law",
                difficulty: 'hard',
                text: 'A satellite orbits Earth with a period of \\(' + (T / 3600).toFixed(0) + '\\text{ hours}\\). ' +
                      'Calculate its orbital radius. (Earth: \\(M = 5.97 \\times 10^{24}\\text{ kg}\\))',
                latex: 'r = \\,?\\;\\text{(m)}',
                answer: r,
                answerTex: 'r = ' + r.toExponential(3) + '\\text{ m}',
                tolerance: Math.abs(r * 0.01) + 0.01,
                hintTex: [
                    "Kepler's 3rd law: \\(T^2 = \\dfrac{4\\pi^2 r^3}{GM}\\). Rearrange to find \\(r\\).",
                    '\\(r = \\left(\\dfrac{GMT^2}{4\\pi^2}\\right)^{1/3}\\). Convert hours to seconds first.'
                ],
                explain: 'Convert: \\(T = ' + (T / 3600).toFixed(0) + ' \\times 3600 = ' + T + '\\text{ s}\\).<br>' +
                         '\\(r = \\left(\\dfrac{GMT^2}{4\\pi^2}\\right)^{1/3} = \\left(\\dfrac{(' + G.toExponential(3) +
                         ')(5.97 \\times 10^{24})(' + T + ')^2}{4\\pi^2}\\right)^{1/3} = ' + r.toExponential(3) + '\\text{ m}\\)'
            };
        }
    },

    // 5. Escape velocity: v_esc = √(2GM/R)
    qEscapeVelocity() {
        const G = PHYS_GRAV.G;
        const planets = [
            { name: 'Earth',  M: 5.97e24, R: 6.37e6 },
            { name: 'Mars',   M: 6.39e23, R: 3.39e6 },
            { name: 'Jupiter', M: 1.90e27, R: 7.15e7 },
            { name: 'Moon',   M: 7.34e22, R: 1.74e6 },
            { name: 'a planet', M: MathUtils.randInt(3, 20) * 1e23, R: MathUtils.randInt(3, 10) * 1e6 }
        ];
        const p = MathUtils.pick(planets);
        const v = Math.sqrt(2 * G * p.M / p.R);

        return {
            type: 'free',
            rule: 'Escape Velocity',
            difficulty: 'hard',
            text: 'Calculate the escape velocity from the surface of ' + p.name + '. ' +
                  '(Mass \\(= ' + p.M.toExponential(2) + '\\text{ kg}\\), radius \\(= ' + p.R.toExponential(2) + '\\text{ m}\\))',
            latex: 'v_{\\text{esc}} = \\,?\\;\\text{(m s}^{-1}\\text{)}',
            answer: v,
            answerTex: 'v_{\\text{esc}} = ' + v.toFixed(0) + '\\text{ m s}^{-1}',
            tolerance: Math.abs(v * 0.01) + 0.01,
            hintTex: [
                'Set kinetic energy equal to gravitational potential energy: \\(\\dfrac{1}{2}mv^2 = \\dfrac{GMm}{R}\\)',
                '\\(v_{\\text{esc}} = \\sqrt{\\dfrac{2GM}{R}}\\). Mass of the escaping object cancels out.'
            ],
            explain: '\\(v_{\\text{esc}} = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{\\dfrac{2(' + G.toExponential(3) + ')(' +
                     p.M.toExponential(2) + ')}{' + p.R.toExponential(2) + '}} = ' + v.toFixed(0) + '\\text{ m s}^{-1}\\)'
        };
    },

    // 6. Gravitational PE: Ep = -GMm/r
    qGravPotentialEnergy() {
        const G = PHYS_GRAV.G;
        const M_E = PHYS_GRAV.M_Earth;
        const R_E = PHYS_GRAV.R_Earth;

        const m = MathUtils.randInt(100, 5000);                    // satellite mass in kg
        const r1 = R_E + MathUtils.randInt(2, 6) * 1e5;           // initial radius (low orbit)
        const r2 = R_E + MathUtils.randInt(5, 30) * 1e6;          // final radius (higher orbit)
        const Ep1 = -G * M_E * m / r1;
        const Ep2 = -G * M_E * m / r2;
        const deltaEp = Ep2 - Ep1;   // positive: gained PE (energy input needed)

        return {
            type: 'free',
            rule: 'Gravitational PE Change',
            difficulty: 'medium',
            text: 'A satellite of mass \\(' + m + '\\text{ kg}\\) moves from an orbital radius of \\(' +
                  r1.toExponential(3) + '\\text{ m}\\) to \\(' + r2.toExponential(3) + '\\text{ m}\\) from Earth\'s centre. ' +
                  'Calculate the change in gravitational potential energy. ' +
                  '(Earth: \\(M = 5.97 \\times 10^{24}\\text{ kg}\\))',
            latex: '\\Delta E_p = \\,?\\;\\text{(J)}',
            answer: deltaEp,
            answerTex: '\\Delta E_p = ' + deltaEp.toExponential(3) + '\\text{ J}',
            tolerance: Math.abs(deltaEp * 0.01) + 0.01,
            hintTex: [
                'Gravitational PE: \\(E_p = -\\dfrac{GMm}{r}\\). Note the negative sign.',
                '\\(\\Delta E_p = E_{p2} - E_{p1} = -\\dfrac{GMm}{r_2} + \\dfrac{GMm}{r_1} = GMm\\left(\\dfrac{1}{r_1} - \\dfrac{1}{r_2}\\right)\\)'
            ],
            explain: '\\(E_{p1} = -\\dfrac{GM_Em}{r_1} = ' + Ep1.toExponential(3) + '\\text{ J}\\)<br>' +
                     '\\(E_{p2} = -\\dfrac{GM_Em}{r_2} = ' + Ep2.toExponential(3) + '\\text{ J}\\)<br>' +
                     '\\(\\Delta E_p = E_{p2} - E_{p1} = ' + deltaEp.toExponential(3) + '\\text{ J}\\)<br>' +
                     'The positive value confirms energy must be supplied to raise the satellite.'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy: [this.qFieldStrength],
            medium: [this.qGravForce, this.qFieldStrength, this.qOrbitalVelocity, this.qGravPotentialEnergy],
            hard: [this.qOrbitalPeriod, this.qEscapeVelocity]
        };
        this.allPool = [
            ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('grav-fields', this);
    },

    next() {
        const p = this.level === 'all' ? this.allPool : (this.pools[this.level] || this.allPool);
        return MathUtils.pick(p).call(this);
    },

    resetScore() {
        this.score = 0; this.total = 0; this.streak = 0;
        document.getElementById('pgrav-score').textContent = '0 / 0';
        document.getElementById('pgrav-pct').textContent = '\u2014';
        document.getElementById('pgrav-streak').textContent = '0';
        if (typeof saveActivityStats === 'function') saveActivityStats('grav-fields', this);
    },

    load() {
        this.init();
        this.score = 0; this.total = 0; this.streak = 0;
        this.answered = false; this.hintIndex = 0;
        this.level = 'all';

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML =
            '<button class="back-btn" onclick="PHYS_GRAV.unload()">&#8592; Topic D: Fields</button>' +
            '<header style="text-align:center;margin-bottom:24px;">' +
            '<h1>Gravitational Fields</h1>' +
            '<p>IB Physics D.1 - Newton\'s law of gravitation, field strength, potential, orbits</p>' +
            '</header>' +
            '<div class="score-bar">' +
            '<div class="score-item"><div class="label">Score</div><div class="value" id="pgrav-score">0 / 0</div></div>' +
            '<div class="score-item"><div class="label">Streak</div><div class="value" id="pgrav-streak">0</div></div>' +
            '<div class="score-item"><div class="label">Accuracy</div><div class="value" id="pgrav-pct">\u2014</div></div>' +
            '</div>' +
            '<div class="question-card" id="pgrav-card"></div>' +
            '<details class="workout-section"><summary>Working Out</summary><div class="workout-content" id="pgrav-workout" contenteditable="true"></div></details>' +
            '<div class="hint-box" id="pgrav-hint"></div>' +
            '<div class="feedback" id="pgrav-fb">' +
            '<div class="feedback-title" id="pgrav-fb-title"></div>' +
            '<div class="feedback-explanation" id="pgrav-fb-expl"></div>' +
            '</div>' +
            '<div style="display:flex;justify-content:center;gap:12px;margin-top:12px;">' +
            '<button class="btn btn-hint" id="pgrav-hint-btn" onclick="PHYS_GRAV.showHint()">Hint</button>' +
            '<button class="btn btn-primary next-btn" id="pgrav-next" onclick="PHYS_GRAV.loadQuestion()">Next Question</button>' +
            '</div>';

        this.loadQuestion();
    },

    unload() {
        const c = document.getElementById('activity-container');
        if (c) c.innerHTML = '';
        if (typeof showView === 'function') showView('topic-d');
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIndex >= q.hintTex.length) return;
        const box = document.getElementById('pgrav-hint');
        if (box) {
            box.classList.add('show');
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + '\\(' + q.hintTex[this.hintIndex] + '\\)';
            this.hintIndex++;
            if (typeof renderMath === 'function') renderMath();
        }
    },

    loadQuestion() {
        this.answered = false;
        this.hintIndex = 0;

        this.currentQ = this.next();
        const q = this.currentQ;
        const dl = { easy: 'Easy', medium: 'Medium', hard: 'Challenging' };

        let h = '<div class="difficulty-tag ' + q.difficulty + '">' + dl[q.difficulty] + '</div>';
        h += '<div class="rule-tag">' + q.rule + '</div>';
        h += '<div class="question-text">' + q.text + '</div>';
        if (q.latex) h += '<div class="question-prompt">\\(' + q.latex + '\\)</div>';

        if (q.type === 'mc') {
            h += '<div class="mc-options">';
            q.options.forEach(function(opt, i) {
                h += '<button class="mc-option" data-i="' + i + '">' + opt + '</button>';
            });
            h += '</div>';
        } else {
            h += '<div class="input-area">';
            h += '<math-field class="lr-math-field" id="pgrav-mf" placeholder="?"></math-field>';
            h += '<button class="btn btn-primary" id="pgrav-check">Check</button>';
            h += '</div>';
        }

        document.getElementById('pgrav-card').innerHTML = h;
        document.getElementById('pgrav-fb').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('pgrav-next').classList.remove('show');

        const hintBox = document.getElementById('pgrav-hint');
        if (hintBox) { hintBox.classList.remove('show'); hintBox.innerHTML = ''; }
        const hintBtn = document.getElementById('pgrav-hint-btn');
        if (hintBtn) hintBtn.disabled = false;

        const workout = document.getElementById('pgrav-workout');
        if (workout) workout.innerHTML = '';

        if (typeof renderMath === 'function') renderMath();

        if (q.type === 'mc') {
            document.querySelectorAll('#pgrav-card .mc-option').forEach(function(btn, i) {
                btn.addEventListener('click', function() {
                    if (PHYS_GRAV.answered) return;
                    PHYS_GRAV.answered = true;
                    const ok = i === q.correctIdx;
                    document.querySelectorAll('#pgrav-card .mc-option').forEach(function(b, j) {
                        b.classList.add(j === q.correctIdx ? 'correct' : (j === i && !ok ? 'incorrect' : 'disabled'));
                        b.disabled = true;
                    });
                    PHYS_GRAV.record(ok);
                    let ex = q.explain;
                    if (!ok) ex = 'The correct answer is <strong>' + q.options[q.correctIdx] + '</strong>.<br>' + ex;
                    PHYS_GRAV.showFb(ok, ex);
                });
            });
        } else {
            setTimeout(function() {
                const mf = document.getElementById('pgrav-mf');
                if (mf) {
                    mf.focus();
                    mf.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') { e.preventDefault(); PHYS_GRAV.check(); }
                    });
                }
                const checkBtn = document.getElementById('pgrav-check');
                if (checkBtn) checkBtn.addEventListener('click', function() { PHYS_GRAV.check(); });
            }, 200);
        }
    },

    check() {
        if (this.answered) return;
        const mf = document.getElementById('pgrav-mf');
        if (!mf || !mf.value.trim()) return;
        this.answered = true;

        const userVal = parseFloat(mf.value.replace(/[^0-9.eE+\-]/g, ''));
        const answer = this.currentQ.answer;
        const ok = Math.abs(userVal - answer) <= (Math.abs(answer * 0.01) + 0.01);

        mf.disabled = true;
        const checkBtn = document.getElementById('pgrav-check');
        if (checkBtn) checkBtn.disabled = true;

        this.record(ok);
        let ex = this.currentQ.explain;
        if (!ok) ex = 'The answer is \\(' + this.currentQ.answerTex + '\\).<br>' + ex;
        this.showFb(ok, ex);
    },

    record(ok) {
        this.total++;
        if (ok) { this.score++; this.streak++; } else { this.streak = 0; }
        document.getElementById('pgrav-score').textContent = this.score + ' / ' + this.total;
        document.getElementById('pgrav-pct').textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '\u2014';
        document.getElementById('pgrav-streak').textContent = this.streak;
        if (typeof saveActivityStats === 'function') saveActivityStats('grav-fields', this, ok);
        if (window.markAnswered) window.markAnswered();
    },

    showFb(ok, html) {
        const fb = document.getElementById('pgrav-fb');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        fb.style.textAlign = 'center';
        document.getElementById('pgrav-fb-title').textContent = ok ? 'Correct!' : 'Not quite\u2026';
        document.getElementById('pgrav-fb-expl').innerHTML = html;
        document.getElementById('pgrav-next').classList.add('show');
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['grav-fields'] = () => PHYS_GRAV.load();
