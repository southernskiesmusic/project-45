/* ================================================================
   MASTERY ENGINE - Reusable mastery system for any topic
   ================================================================
   Usage:
     const myMastery = new MasteryEngine({
       id: 'log',                     // unique key (localStorage + DOM ids)
       title: 'Logarithm Mastery',
       storageKey: 'logMasteryData',
       backView: 'logarithms',
       backLabel: 'Logarithms',
       skills: [ { id:'S01', name:'...', tier:1, prereqs:[] }, ... ],
       tierNames: { 1:'Foundations', 2:'Core Rules' },
       generators: { S01: [fn1, fn2], S02: [fn3] },
       referenceHTML: '<div class="rule-item">...</div>',
       // Optional overrides
       unlockThreshold: 0.6,
       masteredThreshold: 0.8,
       minAttempts: 10,
       decay: 0.85,
       maxAttempts: 50
     });
   ================================================================ */

class MasteryEngine {
    constructor(cfg) {
        this.id = cfg.id;
        this.title = cfg.title;
        this.storageKey = cfg.storageKey;
        this.backView = cfg.backView;
        this.backLabel = cfg.backLabel;
        this.skills = cfg.skills;
        this.skillIds = cfg.skills.map(s => s.id);
        this.tierNames = cfg.tierNames || {};
        this.generators = cfg.generators;
        this.referenceHTML = cfg.referenceHTML || '';

        this.UNLOCK_THR = cfg.unlockThreshold || 0.6;
        this.MASTERED_THR = cfg.masteredThreshold || 0.8;
        this.MIN_ATT = cfg.minAttempts || 10;
        this.DECAY = cfg.decay || 0.85;
        this.MAX_ATT = cfg.maxAttempts || 50;

        // Runtime state
        this.score = 0;
        this.total = 0;
        this.streak = 0;
        this.currentQ = null;
        this.answered = false;
        this.hintIdx = 0;
        this.focusSkill = null;
        this.data = null;

        // DOM id prefixes
        this.pfx = 'mastery-' + this.id;

        // View ids
        this.dashViewId = this.pfx + '-dash';
        this.practiceViewId = this.pfx + '-practice';
    }

    // ── Persistence ──────────────────────────────────────────────
    loadData() {
        try {
            const r = localStorage.getItem(this.storageKey);
            if (r) { this.data = JSON.parse(r); return; }
        } catch (e) {}
        this.initData();
    }

    initData() {
        this.data = {
            version: 1, totalQuestions: 0, totalCorrect: 0,
            skills: Object.fromEntries(this.skillIds.map(id => [id, { attempts: [] }]))
        };
    }

    saveData() {
        for (const sid of this.skillIds) {
            const a = this.data.skills[sid].attempts;
            if (a.length > this.MAX_ATT) this.data.skills[sid].attempts = a.slice(0, this.MAX_ATT);
        }
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        if (typeof Auth !== 'undefined') Auth.saveAndSync();
    }

    resetData() {
        this.initData();
        localStorage.removeItem(this.storageKey);
    }

    // ── Mastery Computation ──────────────────────────────────────
    computeMastery(sid) {
        const atts = this.data.skills[sid].attempts;
        if (!atts.length) return 0;
        let wc = 0, wt = 0;
        for (let i = 0; i < atts.length; i++) {
            const w = Math.pow(this.DECAY, i);
            wt += w;
            if (atts[i].ok) wc += w;
        }
        return wc / wt;
    }

    isUnlocked(sid) {
        const def = this.skills.find(s => s.id === sid);
        return def.prereqs.every(p =>
            this.data.skills[p].attempts.length >= this.MIN_ATT &&
            this.computeMastery(p) >= this.UNLOCK_THR
        );
    }

    getOverallMastery() {
        let sum = 0;
        for (const sid of this.skillIds) sum += this.computeMastery(sid);
        return sum / this.skillIds.length;
    }

    getMasteryClass(m) {
        if (m >= this.MASTERED_THR) return 'mastered';
        if (m >= this.UNLOCK_THR) return 'proficient';
        if (m >= 0.4) return 'developing';
        return 'weak';
    }

    // ── Adaptive Selection ───────────────────────────────────────
    selectSkill() {
        const unlocked = this.skillIds.filter(s => this.isUnlocked(s));
        const weights = unlocked.map(sid => {
            const m = this.computeMastery(sid);
            const a = this.data.skills[sid].attempts;
            let w = Math.pow(1 - m, 2);
            if (!a.length) w += 0.5;
            else if (a.length < 5) w += 0.2;
            if (a.length && Date.now() - a[0].ts > 300000) w += 0.15;
            return Math.max(w, 0.05);
        });
        const tot = weights.reduce((a, b) => a + b, 0);
        let r = Math.random() * tot;
        for (let i = 0; i < unlocked.length; i++) {
            r -= weights[i];
            if (r <= 0) return unlocked[i];
        }
        return unlocked[unlocked.length - 1];
    }

    next() {
        const sid = this.focusSkill || this.selectSkill();
        const q = pick(this.generators[sid])();
        q.skill = q.skill || sid;
        return q;
    }

    // ── Dynamic HTML Generation ──────────────────────────────────
    generateDashboardView() {
        const pfx = this.pfx;
        return `<div id="view-${this.dashViewId}" class="view">
    <button class="back-btn" data-back="${this.backView}">${this.backLabel}</button>
    <header>
        <h1>${this.title}</h1>
        <p>Adaptive practice across all skills</p>
    </header>
    <div class="mastery-overall">
        <div class="mastery-overall-label">Overall Mastery: <strong id="${pfx}-overall-pct">0%</strong></div>
        <div class="mastery-overall-bar"><div class="mastery-overall-fill" id="${pfx}-overall-fill" style="width:0%"></div></div>
    </div>
    <div style="text-align:center;margin:20px 0;">
        <button class="btn btn-primary" id="${pfx}-start" style="padding:14px 40px;font-size:1.05rem;">Start Adaptive Practice</button>
        <button class="btn btn-hint" id="${pfx}-reset" style="margin-left:12px;font-size:0.82rem;">Reset Progress</button>
    </div>
    <div class="mastery-skills-grid" id="${pfx}-skills-grid"></div>
    <details class="rules-ref"><summary>Rules Reference</summary>
        <div class="rules-content" id="${pfx}-ref"></div>
    </details>
</div>`;
    }

    generatePracticeView() {
        const pfx = this.pfx;
        return `<div id="view-${this.practiceViewId}" class="view">
    <button class="back-btn" id="${pfx}-back-btn">${this.title}</button>
    <header>
        <h1 id="${pfx}-practice-title">Adaptive Practice</h1>
        <p id="${pfx}-practice-subtitle">Practising your weakest skills</p>
    </header>
    <div class="score-bar">
        <div class="score-item"><div class="label">Score</div><div class="value primary" id="${pfx}-score">0 / 0</div></div>
        <div class="score-item"><div class="label">Accuracy</div><div class="value primary" id="${pfx}-pct"> - </div></div>
        <div class="score-item"><div class="label">Streak</div><div class="value success" id="${pfx}-streak">0</div></div>
    </div>
    <div class="question-card" id="${pfx}-card"><p style="color:var(--text-light)">Loading&hellip;</p></div>
    <details class="workout-section"><summary>Working Out</summary>
        <button class="copy-calc-btn" onclick="copyCalcToWorkout('${pfx}-workout')">&#128203; Copy Calculator to Workings</button>
        <div class="workout-content" id="${pfx}-workout" contenteditable="true"></div>
    </details>
    <div style="text-align:center;margin-bottom:16px;">
        <button class="btn btn-hint" id="${pfx}-hint-btn">Hint</button>
    </div>
    <div class="hint-box" id="${pfx}-hint"></div>
    <div class="feedback" id="${pfx}-fb">
        <div class="feedback-title" id="${pfx}-fb-title"></div>
        <div class="feedback-explanation" id="${pfx}-fb-expl"></div>
    </div>
    <button class="btn btn-primary next-btn" id="${pfx}-next">Next Question</button>
    <details class="rules-ref"><summary>Rules Reference</summary>
        <div class="rules-content" id="${pfx}-ref2"></div>
    </details>
</div>`;
    }

    // Inject views into the DOM
    mount() {
        const app = document.getElementById('app');
        const dashHTML = this.generateDashboardView();
        const practiceHTML = this.generatePracticeView();
        app.insertAdjacentHTML('beforeend', dashHTML);
        app.insertAdjacentHTML('beforeend', practiceHTML);
    }

    // ── Wire Event Listeners ─────────────────────────────────────
    wire() {
        const pfx = this.pfx;
        const self = this;

        // Dashboard buttons
        document.getElementById(pfx + '-start').addEventListener('click', () => self.startPractice(null));
        document.getElementById(pfx + '-reset').addEventListener('click', () => {
            pageFlash.confirm('Reset all mastery progress? This cannot be undone.').then(function(ok) {
                if (ok) {
                    self.resetData();
                    self.renderDashboard();
                }
            });
        });

        // Practice buttons
        document.getElementById(pfx + '-hint-btn').addEventListener('click', () =>
            handleHint(self, pfx + '-hint', pfx + '-hint-btn'));
        document.getElementById(pfx + '-next').addEventListener('click', () => self.load());
        document.getElementById(pfx + '-back-btn').addEventListener('click', () => {
            showView(self.dashViewId);
            self.renderDashboard();
        });

        // Reference
        const ref1 = document.getElementById(pfx + '-ref');
        const ref2 = document.getElementById(pfx + '-ref2');
        if (ref1) ref1.innerHTML = this.referenceHTML;
        if (ref2) ref2.innerHTML = this.referenceHTML;

        // Back button wiring for data-back
        document.querySelectorAll(`#view-${this.dashViewId} [data-back]`).forEach(btn => {
            btn.addEventListener('click', () => {
                showView(btn.dataset.back || 'hub');
            });
        });
    }

    // ── Pro tier check ────────────────────────────────────────────
    _isProTier() {
        try {
            if (typeof Premium !== 'undefined') return Premium.getTier() === 'pro' || Premium._role === 'owner' || Premium._role === 'admin' || Premium._role === 'Developer';
            var role = localStorage.getItem('roleCache');
            if (role === 'owner' || role === 'admin' || role === 'Developer') return true;
            var s = JSON.parse(localStorage.getItem('premiumCache'));
            if (s && s.active) { var p = s.plan || 'student'; return p === 'standard' || p === 'pro'; }
            var sl = JSON.parse(localStorage.getItem('schoolLicenseCache'));
            if (sl && sl.active && sl.tier === 'school_pro') return true;
        } catch(e) {}
        return false;
    }

    // ── Initialize ───────────────────────────────────────────────
    init() {
        this.loadData();
        this.mount();
        this.wire();
        if (!this._isProTier()) {
            var grid = document.getElementById(this.pfx + '-skills-grid');
            if (grid) grid.innerHTML =
                '<div style="text-align:center;padding:40px 20px;grid-column:1/-1;">' +
                '<div style="font-size:2.5rem;margin-bottom:12px;">&#x1F512;</div>' +
                '<h3 style="margin-bottom:6px;">Pro Feature</h3>' +
                '<p style="color:var(--text-light);margin-bottom:16px;">Upgrade to Pro to unlock the Mastery Engine with adaptive difficulty.</p>' +
                '<a href="../hub.html#pricing" style="display:inline-block;background:#4361ee;color:#fff;padding:12px 28px;border-radius:12px;font-weight:700;text-decoration:none;">Upgrade to Pro</a></div>';
            var startBtn = document.getElementById(this.pfx + '-start');
            if (startBtn) startBtn.disabled = true;
        }
    }

    // ── Dashboard Rendering ──────────────────────────────────────
    renderDashboard() {
        const pfx = this.pfx;
        const grid = document.getElementById(pfx + '-skills-grid');
        let html = '';
        let currentTier = 0;

        for (const def of this.skills) {
            if (def.tier !== currentTier) {
                currentTier = def.tier;
                html += `<div class="mastery-tier-header">Tier ${currentTier}: ${this.tierNames[currentTier] || 'Tier ' + currentTier}</div>`;
            }
            const mastery = this.computeMastery(def.id);
            const unlocked = this.isUnlocked(def.id);
            const atts = this.data.skills[def.id].attempts;
            const pct = Math.round(mastery * 100);
            const cls = this.getMasteryClass(mastery);

            if (!unlocked) {
                const missing = def.prereqs.filter(p =>
                    this.data.skills[p].attempts.length < this.MIN_ATT || this.computeMastery(p) < this.UNLOCK_THR);
                const details = missing.map(p => {
                    const name = this.skills.find(s => s.id === p).name;
                    const att = this.data.skills[p].attempts.length;
                    const m = Math.round(this.computeMastery(p) * 100);
                    return `${name} (${att}/${this.MIN_ATT} attempts, ${m}%)`;
                });
                html += `<div class="mastery-skill-tile locked">
                    <div class="mastery-skill-name"><span style="font-size:0.85rem">&#128274;</span> ${def.name}</div>
                    <div class="mastery-skill-stats"><span>Unlocks after ${this.MIN_ATT}+ attempts and 60% mastery on ${details.join('; ')}</span></div></div>`;
            } else {
                html += `<div class="mastery-skill-tile" data-skill="${def.id}">
                    <div class="mastery-skill-name">${def.name} <span style="margin-left:auto;font-weight:700;">${pct}%</span></div>
                    <div class="mastery-skill-bar"><div class="mastery-skill-fill ${cls}" style="width:${pct}%"></div></div>
                    <div class="mastery-skill-stats"><span>${atts.length} attempt${atts.length !== 1 ? 's' : ''}</span>
                        <span>${pct >= 80 ? 'Mastered' : ''}</span></div></div>`;
            }
        }
        grid.innerHTML = html;

        const self = this;
        grid.querySelectorAll('.mastery-skill-tile:not(.locked)').forEach(tile => {
            tile.addEventListener('click', () => self.startPractice(tile.dataset.skill));
        });

        const overall = this.getOverallMastery();
        const oPct = Math.round(overall * 100);
        document.getElementById(pfx + '-overall-pct').textContent = oPct + '%';
        const fill = document.getElementById(pfx + '-overall-fill');
        fill.style.width = oPct + '%';
        fill.className = 'mastery-overall-fill ' + this.getMasteryClass(overall);
    }

    // ── Practice Mode ────────────────────────────────────────────
    startPractice(skillId) {
        const pfx = this.pfx;
        this.focusSkill = skillId || null;
        this.resetScore();
        if (skillId) {
            const def = this.skills.find(s => s.id === skillId);
            document.getElementById(pfx + '-practice-title').textContent = def.name;
            document.getElementById(pfx + '-practice-subtitle').textContent = 'Focused practice';
        } else {
            document.getElementById(pfx + '-practice-title').textContent = 'Adaptive Practice';
            document.getElementById(pfx + '-practice-subtitle').textContent = 'Practising your weakest skills';
        }
        showView(this.practiceViewId);
        this.load();
    }

    resetScore() {
        const pfx = this.pfx;
        this.score = 0; this.total = 0; this.streak = 0;
        document.getElementById(pfx + '-score').textContent = '0 / 0';
        document.getElementById(pfx + '-pct').textContent = '\u2014';
        document.getElementById(pfx + '-streak').textContent = '0';
    }

    load() {
        const pfx = this.pfx;
        this.answered = false;
        this.currentQ = this.next();
        const q = this.currentQ;
        const skillDef = this.skills.find(s => s.id === q.skill);
        let h = `<div class="rule-tag">${q.rule}</div>`;
        if (skillDef) h += `<div style="font-size:0.78rem;color:var(--text-light);margin-bottom:8px;">${skillDef.name}</div>`;
        h += `<div class="question-text">${q.text}</div>`;
        if (q.diagram) h += `<div class="question-diagram">${q.diagram}</div>`;
        if (q.latex) h += `<div class="question-prompt">\\(${q.latex}\\)</div>`;
        if (q.hint) h += `<div class="question-hint">\\(${q.hint}\\)</div>`;

        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o, i) => { h += `<button class="option-btn" data-i="${i}">${o}</button>`; });
            h += '</div>';
        } else {
            h += `<div class="input-area">
                    <math-field class="lr-math-field" id="${pfx}-mf" placeholder="Type your answer"></math-field>
                    <button class="btn btn-primary" id="${pfx}-check">Check</button>
                  </div>`;
            if (Array.isArray(q.answer)) {
                h += '<div style="text-align:center;font-size:0.75rem;color:var(--text-light,#888);margin-top:4px;">Tip: type <kbd style="background:var(--bg-alt,#eee);padding:1px 5px;border-radius:3px;font-family:monospace;">vec</kbd> to insert a column vector</div>';
            }
        }

        document.getElementById(pfx + '-card').innerHTML = h;
        const fb = document.getElementById(pfx + '-fb');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById(pfx + '-next').classList.remove('show');
        this.hintIdx = 0;
        resetHint(pfx + '-hint', pfx + '-hint-btn');
        document.getElementById(pfx + '-workout').innerHTML = '';
        renderMath();

        const self = this;
        if (q.type === 'mc') {
            document.getElementById(pfx + '-card').querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => self.handleMC(parseInt(btn.dataset.i)));
            });
        } else {
            setTimeout(() => {
                const mf = document.getElementById(pfx + '-mf');
                if (mf) {
                    mf.inlineShortcuts = Object.assign({}, mf.inlineShortcuts || {}, {
                        'vec': '\\binom{#?}{#?}',
                        'col': '\\binom{#?}{#?}',
                        'frac': '\\frac{#?}{#?}'
                    });
                    mf.focus();
                    mf.addEventListener('keydown', e => {
                        if (e.key === 'Enter') { e.preventDefault(); self.handleFree(); }
                    });
                }
                const cb = document.getElementById(pfx + '-check');
                if (cb) cb.addEventListener('click', () => self.handleFree());
            }, 200);
        }
    }

    handleMC(idx) {
        if (this.answered) return;
        this.answered = true;
        const pfx = this.pfx;
        const q = this.currentQ, chosen = q.options[idx], ok = chosen === q.answer;
        document.getElementById(pfx + '-card').querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.disabled = true;
            if (q.options[i] === q.answer) btn.classList.add('correct');
            if (i === idx && !ok) btn.classList.add('incorrect');
        });
        this.record(ok);
        this.showFb(ok, q.explain);
    }

    handleFree() {
        if (this.answered) return;
        const pfx = this.pfx;
        const mf = document.getElementById(pfx + '-mf');
        if (!mf) return;
        const latex = mf.value;
        if (!latex || !latex.trim()) return;
        this.answered = true;
        let ok;
        const _ans = this.currentQ.answer;
        if (Array.isArray(_ans)) {
            // Parse vector/pair answer from MathLive input
            const _norm = latex.replace(/−/g, '-');
            // vector debug removed
            let _parts;
            // Handle \binom{a}{b} / \dbinom / \tbinom (column vector via MathLive :vec: shortcut)
            const _bm = _norm.match(/\\(?:d?binom|tbinom)\s*\{([^}]*)\}\s*\{([^}]*)\}/);
            if (_bm) {
                _parts = [parseFloat(_bm[1].replace(/[^0-9.\-]/g, '')), parseFloat(_bm[2].replace(/[^0-9.\-]/g, ''))];
            }
            // Handle \begin{pmatrix}a\\b\end{pmatrix} and similar matrix environments
            if (!_parts) {
                const _pm = _norm.match(/\\begin\{[pbvBV]?matrix\}([\s\S]*?)\\end\{[pbvBV]?matrix\}/);
                if (_pm) { _parts = _pm[1].split(/\\\\/).map(function(s) { return parseFloat(s.replace(/[^0-9.\-]/g, '')); }); }
            }
            // Fallback: comma-separated pair, e.g. "4, 6" or "(4, 6)"
            if (!_parts) {
                const _clean = _norm.replace(/\\left|\\right|\\,|\\:|\\;|\\!/g, '').replace(/[(){}]/g, '');
                _parts = _clean.split(',').map(function(s) { return parseFloat(s.replace(/[^0-9.\-]/g, '')); });
            }
            // vector debug removed
            var _vtol = this.currentQ.tolerance || 0.01;
            ok = _parts.length === _ans.length && _parts.every(function(v, i) { return !isNaN(v) && Math.abs(v - _ans[i]) <= _vtol; });
        } else if (this.currentQ.sfAnswer) {
            ok = checkStandardForm(latex, this.currentQ.sfAnswer.coeff, this.currentQ.sfAnswer.power);
        } else {
            var _tol = this.currentQ.tolerance || 0.01;
            ok = Math.abs(parseLatex(latex) - _ans) <= _tol;
        }
        mf.disabled = true;
        const cb = document.getElementById(pfx + '-check');
        if (cb) cb.disabled = true;
        let extra = '';
        if (!ok) {
            let _at = this.currentQ.answerTex || '';
            // Strip existing delimiters to avoid double-wrapping
            if (_at.startsWith('\\(') && _at.endsWith('\\)')) _at = _at.slice(2, -2);
            extra = `<br>The correct answer is \\(${_at}\\).`;
        }
        this.record(ok);
        this.showFb(ok, this.currentQ.explain + extra);
    }

    record(ok) {
        const pfx = this.pfx;
        this.total++;
        if (ok) { this.score++; this.streak++; } else { this.streak = 0; }
        document.getElementById(pfx + '-score').textContent = `${this.score} / ${this.total}`;
        document.getElementById(pfx + '-pct').textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '\u2014';
        document.getElementById(pfx + '-streak').textContent = this.streak;

        const sid = this.currentQ.skill;
        this.data.skills[sid].attempts.unshift({ ok, ts: Date.now() });
        this.data.totalQuestions++;
        if (ok) this.data.totalCorrect++;
        this.saveData();

        // Update activity stats so "continue where you left off" stays current
        if (typeof saveActivityStats === 'function') saveActivityStats(this.pfx, this, ok);

        if (window.markAnswered) window.markAnswered();
    }

    showFb(ok, html) {
        const pfx = this.pfx;
        const fb = document.getElementById(pfx + '-fb');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        fb.style.textAlign = 'center';
        document.getElementById(pfx + '-fb-title').textContent = ok ? 'Correct!' : 'Not quite\u2026';
        document.getElementById(pfx + '-fb-expl').innerHTML = html;
        document.getElementById(pfx + '-next').classList.add('show');
        renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
