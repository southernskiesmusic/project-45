/* ================================================================
   SHARED ACTIVITY UTILITIES
   Extracted from per-subject utils.js files (2026-03-26)
   ================================================================

   Usage:
   1. Each subject's index.html must define STORAGE_PREFIX before
      loading this file, e.g.:
        <script>const STORAGE_PREFIX = 'physics_';</script>
        <script src="../../shared/js/activity-utils.js"></script>
   2. Maths (legacy) uses no prefix - set STORAGE_PREFIX = '' there.
   3. All functions are exposed as globals for backward compatibility.
   ================================================================ */

// Ensure STORAGE_PREFIX exists (fallback for subjects that forget)
if (typeof STORAGE_PREFIX === 'undefined') var STORAGE_PREFIX = '';

// ===================================================================
// ONE-TIME MIGRATION: trainerStats -> activityStats
// ===================================================================
(function() {
    try {
        var old = localStorage.getItem(STORAGE_PREFIX + 'trainerStats');
        if (old && !localStorage.getItem(STORAGE_PREFIX + 'activityStats')) {
            localStorage.setItem(STORAGE_PREFIX + 'activityStats', old);
        }
        if (old) localStorage.removeItem(STORAGE_PREFIX + 'trainerStats');
    } catch (e) {}
})();

// ===================================================================
// CORE RANDOM / ARRAY HELPERS
// ===================================================================
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Cycle through all items before repeating (Fisher-Yates deck)
const _cycleDecks = new Map();
function clearCycleDecks() { _cycleDecks.clear(); }
function cyclePick(arr) {
    if (_cycleDecks.size > 100) _cycleDecks.clear();
    let deck = _cycleDecks.get(arr);
    if (!deck || deck.length === 0) {
        deck = shuffle([...arr]);
        _cycleDecks.set(arr, deck);
    }
    return deck.pop();
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

// ===================================================================
// MATH RENDERING
// ===================================================================
function renderMath() {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '\\(', right: '\\)', display: false },
                { left: '$$',  right: '$$',  display: true  }
            ],
            throwOnError: false,
            ignoredTags: ['script','noscript','style','textarea','pre','code','select','option','math-field'],
            ignoredClasses: ['pg-working-content']
        });
    }
    if (typeof I18N !== 'undefined' && I18N.lang !== 'en') I18N.translateDOM();
}

// ===================================================================
// LATEX PARSING
// ===================================================================
function latexToReadable(latex) {
    return latex
        .replace(/\\cdot/g, '\u00B7')
        .replace(/\\times/g, '\u00D7')
        .replace(/\\div/g, '\u00F7')
        .replace(/\\sqrt\{([^}]+)\}/g, '\u221A($1)')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
        .replace(/\\left\(/g, '(').replace(/\\right\)/g, ')')
        .replace(/\\left\[/g, '[').replace(/\\right\]/g, ']')
        .replace(/\{/g, '(').replace(/\}/g, ')')
        .replace(/\^/g, '^');
}

function parseLatex(raw) {
    let s = raw.replace(/\\left|\\right|\\,|\\:|\\;|\\!|\\displaystyle|\\textstyle|\\placeholder\{[^}]*\}/g, '').replace(/\s+/g, '');
    s = s.replace(/\u2212/g, '-');
    s = s.replace(/\\(?:mathrm|mathit|mathbf|mathsf|mathtt|mathbb|mathcal|mathord|operatorname|text|textit|textbf)\{([^}]*)\}/g, '$1');
    s = s.replace(/\{\{([^{}]*)\}\}/g, '{$1}');
    if (/^\{.+\}$/.test(s)) {
        let depth = 0, outerOnly = true;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '{') depth++;
            else if (s[i] === '}') depth--;
            if (depth === 0 && i < s.length - 1) { outerOnly = false; break; }
        }
        if (outerOnly) s = s.slice(1, -1);
    }
    const fm = s.match(/(-?)\\[cdt]?frac\{(-?[\d.]+)\}\{(-?[\d.]+)\}/);
    if (fm) {
        const sign = fm[1] === '-' ? -1 : 1;
        return sign * parseFloat(fm[2]) / parseFloat(fm[3]);
    }
    const fm2 = s.match(/(-?)\\[cdt]?frac(\d)(\d)/);
    if (fm2) {
        const sign2 = fm2[1] === '-' ? -1 : 1;
        return sign2 * parseInt(fm2[2]) / parseInt(fm2[3]);
    }
    const ov = s.match(/^(-?[\d.]+)\\over(-?[\d.]+)$/);
    if (ov) return parseFloat(ov[1]) / parseFloat(ov[2]);
    const dv = s.match(/^(-?[\d.]+)\/(-?[\d.]+)$/);
    if (dv) return parseFloat(dv[1]) / parseFloat(dv[2]);
    // Strip variable prefix (e.g. x=4, x<=30)
    s = s.replace(/^[a-zA-Z]\s*(?:=|\\leq?|\\geq?|[\u2264\u2265<>])\s*/, '');
    s = s.replace(/^(?:\\leq?|\\geq?|[\u2264\u2265<>]|\\?\$)\s*/, '');
    return parseFloat(s);
}

// Normalise an algebraic expression into a canonical coefficient map
function normalizeExpr(raw) {
    let s = raw.replace(/\\left|\\right|\\,|\\:|\\;|\\!|\\displaystyle|\\placeholder\{[^}]*\}/g, '');
    s = s.replace(/\\(?:mathrm|mathit|mathbf|mathsf|mathtt|mathbb|mathcal|mathord|operatorname|text)\{([^}]*)\}/g, '$1');
    s = s.replace(/\s+/g, '').replace(/\u2212/g, '-').replace(/\{|\}/g, '');
    var terms = s.match(/[+-]?[^+-]+/g);
    if (!terms) return null;
    var coeffs = {};
    for (var i = 0; i < terms.length; i++) {
        var t = terms[i].replace(/^\+/, '');
        var m = t.match(/^([+-]?\d*\.?\d*)x\^(\d+)$/);
        if (m) { var c = m[1] === '' || m[1] === '+' ? 1 : m[1] === '-' ? -1 : parseFloat(m[1]); var key = 'x^' + m[2]; coeffs[key] = (coeffs[key] || 0) + c; continue; }
        m = t.match(/^([+-]?\d*\.?\d*)x$/);
        if (m) { var c2 = m[1] === '' || m[1] === '+' ? 1 : m[1] === '-' ? -1 : parseFloat(m[1]); coeffs['x'] = (coeffs['x'] || 0) + c2; continue; }
        var val = parseFloat(t);
        if (isNaN(val)) return null;
        coeffs[''] = (coeffs[''] || 0) + val;
    }
    return coeffs;
}

function exprEqual(a, b) {
    var ca = normalizeExpr(a), cb = normalizeExpr(b);
    if (!ca || !cb) return false;
    var keys = {};
    for (var k in ca) keys[k] = true;
    for (var k2 in cb) keys[k2] = true;
    for (var k3 in keys) { if (Math.abs((ca[k3] || 0) - (cb[k3] || 0)) > 0.01) return false; }
    return true;
}

// ===================================================================
// COPY CALCULATOR TO WORKINGS
// ===================================================================
function _appendCalcAnswer(line, val, answerStyle) {
    if (val === undefined || isNaN(val) || !isFinite(val)) return;
    var valSpan = document.createElement('span');
    valSpan.style.cssText = answerStyle;
    var formatted = Number.isInteger(val) ? String(val) : val.toFixed(6).replace(/\.?0+$/, '');
    valSpan.innerHTML = katex.renderToString('= ' + formatted, { throwOnError: false });
    line.appendChild(valSpan);
}

function copyCalcToWorkout(workoutId) {
    if (!window.desmosCalc) { pageFlash('Open the calculator first!'); return; }
    var workout = document.getElementById(workoutId);
    if (!workout) { pageFlash.error('Workout area not found'); return; }
    try {
        var state = typeof window.desmosCalc.getState === 'function' ? window.desmosCalc.getState() : {};
        var exprs = (state.expressions && state.expressions.list) || [];
        var validExprs = exprs.filter(function(e) { return e.latex && e.latex.trim(); });
        if (validExprs.length === 0) { pageFlash('No expressions in calculator. Type something first!'); return; }

        var isDark = document.body.classList.contains('dark-mode');
        var box = document.createElement('div');
        box.style.cssText = isDark
            ? 'background:#1e1e3a;border:1px solid #444;border-radius:8px;padding:12px;margin:8px 0;color:#e0e0e0;'
            : 'background:#f8f9fa;border:1px solid #e0e0e0;border-radius:8px;padding:12px;margin:8px 0;color:#2b2d42;';
        var answerStyle = isDark
            ? 'color:#80b0ff;margin-left:8px;'
            : 'color:#555;margin-left:8px;';

        var hasHelper = typeof window.desmosCalc.HelperExpression === 'function';
        var pendingItems = [];

        validExprs.forEach(function(e) {
            var line = document.createElement('div');
            line.style.cssText = 'margin:6px 0;font-size:1.1em;display:flex;align-items:center;gap:8px;flex-wrap:wrap;';
            var exprSpan = document.createElement('span');
            exprSpan.innerHTML = katex.renderToString(e.latex, { throwOnError: false, displayMode: false });
            line.appendChild(exprSpan);

            var resolved = false;
            if (hasHelper) {
                try {
                    var helper = window.desmosCalc.HelperExpression({ latex: e.latex });
                    helper.observe('numericValue', function() {
                        _appendCalcAnswer(line, helper.numericValue, answerStyle);
                        helper.unobserve('numericValue');
                    });
                    resolved = true;
                } catch(evalErr) {}
            }
            if (!resolved) pendingItems.push({ line: line, latex: e.latex });

            box.appendChild(line);
        });
        workout.appendChild(box);
        workout.focus();

        // Scientific Calculator lacks HelperExpression - use a hidden Graphing Calculator to evaluate
        if (pendingItems.length > 0 && typeof Desmos !== 'undefined' && typeof Desmos.GraphingCalculator === 'function') {
            var hidden = document.createElement('div');
            hidden.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:400px;height:300px;visibility:hidden;';
            document.body.appendChild(hidden);
            try {
                var tempCalc = Desmos.GraphingCalculator(hidden, { expressions: false, settingsMenu: false, zoomButtons: false });
                var remaining = pendingItems.length;
                var cleaned = false;
                function cleanupTemp() {
                    if (cleaned) return;
                    cleaned = true;
                    try { tempCalc.destroy(); } catch(x) {}
                    try { hidden.remove(); } catch(x) {}
                }
                pendingItems.forEach(function(item) {
                    try {
                        var helper = tempCalc.HelperExpression({ latex: item.latex });
                        helper.observe('numericValue', function() {
                            _appendCalcAnswer(item.line, helper.numericValue, answerStyle);
                            helper.unobserve('numericValue');
                            if (--remaining <= 0) cleanupTemp();
                        });
                    } catch(err) {
                        if (--remaining <= 0) cleanupTemp();
                    }
                });
                setTimeout(cleanupTemp, 3000);
            } catch(err) {
                try { hidden.remove(); } catch(x) {}
            }
        }
    } catch(err) {
        console.error('Copy error:', err);
        pageFlash.error('Error copying: ' + err.message);
    }
}

// ===================================================================
// CALCULATOR MODE (per-question GDC gating)
// ===================================================================
// mode: 'none' | 'gdc' | 'any'
// - 'none': hide floating calc button, stamp "No calculator" badge on question card
// - 'gdc' or 'any' (default): show button, remove badge
function setCalcMode(mode) {
    mode = mode || 'any';
    var btn = document.getElementById('calc-btn');
    var badge = document.getElementById('no-calc-badge');

    if (mode === 'none') {
        if (btn) {
            btn.style.display = 'none';
            btn.classList.remove('active');
        }
        var modal = document.getElementById('calc-modal');
        if (modal) modal.classList.remove('show');
        if (!badge) {
            var card = document.querySelector('.question-card');
            if (card) {
                var b = document.createElement('span');
                b.id = 'no-calc-badge';
                b.className = 'no-calc-badge';
                b.textContent = 'No calculator';
                card.insertBefore(b, card.firstChild);
            }
        }
    } else {
        if (btn) btn.style.display = '';
        if (badge) badge.remove();
    }
}

// ===================================================================
// VIEW NAVIGATION
// ===================================================================
function showView(id) {
    // Cancel any active timed challenge
    if (typeof TIMED !== 'undefined' && TIMED.active) {
        TIMED.active = false;
        clearInterval(TIMED.interval);
        TIMED.interval = null;
        if (TIMED._autoTimer) { clearTimeout(TIMED._autoTimer); TIMED._autoTimer = null; }
        document.body.classList.remove('timed-active');
    }
    var timerBar = document.getElementById('timed-timer');
    if (timerBar) timerBar.style.display = 'none';
    var timedOverlay = document.getElementById('timed-overlay');
    if (timedOverlay) timedOverlay.style.display = 'none';
    // Stop TTS if leaving lesson view
    if (typeof LessonEngine !== 'undefined' && LessonEngine._ttsStop) LessonEngine._ttsStop();
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    // Clear search when navigating
    var si = document.getElementById('search-input');
    if (si) { si.value = ''; }
    var sr = document.getElementById('search-results');
    if (sr) { sr.classList.remove('show'); sr.innerHTML = ''; }
    document.querySelectorAll('.topic-card.search-hidden').forEach(c => c.classList.remove('search-hidden'));
    renderMath();
    // Re-translate the newly visible view
    if (typeof I18N !== 'undefined') I18N.translateDOM(document.getElementById('view-' + id));
    // Toggle formula FAB + scratchpad FAB
    var hide = ['hub','dashboard','leaderboard','formula-booklet'];
    var showFabs = hide.indexOf(id) === -1;
    var fab = document.getElementById('formula-fab');
    if (fab) fab.style.display = showFabs ? 'flex' : 'none';
    var spFab = document.getElementById('scratchpad-fab');
    if (spFab) {
        spFab.style.display = showFabs ? 'flex' : 'none';
        if (!showFabs) {
            var spOvl = document.getElementById('scratchpad-overlay');
            if (spOvl) spOvl.classList.remove('open');
            spFab.classList.remove('active');
        }
    }
}

// ===================================================================
// PROGRESSIVE HINT SYSTEM
// ===================================================================
function handleHint(activity, boxId, btnId) {
    const box = document.getElementById(boxId);
    const btn = document.getElementById(btnId);
    const q = activity.currentQ;
    if (!q) return;
    let hints = q.hintTex;
    if (!hints) return;
    if (typeof hints === 'string') hints = [hints];

    if (activity.hintIdx >= hints.length) {
        box.classList.toggle('show');
        return;
    }

    if (activity.hintIdx === 0) box.innerHTML = '';
    const div = document.createElement('div');
    div.style.margin = '6px 0';
    var hintStr = hints[activity.hintIdx];
    // Wrap raw LaTeX (contains backslash but no delimiters) so renderMath can process it
    if (hintStr.indexOf('\\') !== -1 && hintStr.indexOf('\\(') === -1 && hintStr.indexOf('$$') === -1) {
        hintStr = '\\(' + hintStr + '\\)';
    }
    div.innerHTML = hints.length > 1
        ? '<strong>Hint ' + (activity.hintIdx + 1) + ':</strong> ' + hintStr
        : hintStr;
    box.appendChild(div);
    box.classList.add('show');
    activity.hintIdx++;

    if (activity.hintIdx < hints.length) {
        var label = typeof I18N !== 'undefined' ? I18N.t('next-hint', 'Next Hint') : 'Next Hint';
        btn.textContent = label + ' (' + activity.hintIdx + '/' + hints.length + ')';
    } else {
        var allLabel = typeof I18N !== 'undefined' ? I18N.t('all-hints-shown', 'All Hints Shown') : 'All Hints Shown';
        var hintLabel = typeof I18N !== 'undefined' ? I18N.t('hint', 'Hint') : 'Hint';
        btn.textContent = hints.length > 1 ? allLabel : hintLabel;
    }
    renderMath();
}

function resetHint(boxIdOrPrefix, btnId) {
    // Support both resetHint('mech') and resetHint('mech-hint', 'mech-hint-btn')
    var bId = btnId ? boxIdOrPrefix : boxIdOrPrefix + '-hint';
    var btId = btnId || boxIdOrPrefix + '-hint-btn';
    var box = document.getElementById(bId);
    var btn = document.getElementById(btId);
    if (box) { box.classList.remove('show'); box.innerHTML = ''; }
    if (btn) btn.textContent = typeof I18N !== 'undefined' ? I18N.t('hint', 'Hint') : 'Hint';
}

// ===================================================================
// TIMED CHALLENGE MODE (60-second speed round)
// ===================================================================
const TIMED = {
    active: false, prefix: null, activity: null,
    score: 0, total: 0, _startScore: 0, _startTotal: 0,
    timeLeft: 60, interval: null, _autoTimer: null, best: {},

    start(prefix, activity) {
        this.active = true; this.prefix = prefix; this.activity = activity;
        this._startScore = activity.score; this._startTotal = activity.total;
        this.score = 0; this.total = 0; this.timeLeft = 60; this.loadBest();
        document.body.classList.add('timed-active');
        const view = document.querySelector('.view.active');
        const scoreBar = view ? view.querySelector('.score-bar') : null;
        if (scoreBar) scoreBar.style.display = 'none';
        let timerBar = document.getElementById('timed-timer');
        if (!timerBar) {
            timerBar = document.createElement('div');
            timerBar.id = 'timed-timer'; timerBar.className = 'timed-timer';
            timerBar.innerHTML = '<div class="timed-timer-fill" id="timed-timer-fill"></div><span class="timed-timer-text" id="timed-timer-text">60s</span>';
            document.getElementById('app').prepend(timerBar);
        }
        timerBar.style.display = '';
        document.getElementById('timed-timer-fill').style.width = '100%';
        document.getElementById('timed-timer-text').textContent = '60s';
        this.interval = setInterval(() => this.tick(), 1000);
        activity.load();
    },
    tick() {
        this.timeLeft--;
        const pct = Math.max(0, (this.timeLeft / 60) * 100);
        document.getElementById('timed-timer-fill').style.width = pct + '%';
        document.getElementById('timed-timer-text').textContent = this.timeLeft + 's';
        if (this.timeLeft <= 10) document.getElementById('timed-timer-fill').style.background = 'var(--error)';
        if (this.timeLeft <= 0) this.end();
    },
    recordAnswer() {
        this.score = this.activity.score - this._startScore;
        this.total = this.activity.total - this._startTotal;
        if (this.active) { clearTimeout(this._autoTimer); this._autoTimer = setTimeout(() => { this._autoTimer = null; if (this.active && this.activity) this.activity.load(); }, 800); }
    },
    end() {
        this.active = false; clearInterval(this.interval); this.interval = null;
        clearTimeout(this._autoTimer); this._autoTimer = null; document.body.classList.remove('timed-active');
        this.score = this.activity.score - this._startScore;
        this.total = this.activity.total - this._startTotal;
        const timerBar = document.getElementById('timed-timer');
        if (timerBar) timerBar.style.display = 'none';
        const view = document.querySelector('.view.active');
        const scoreBar = view ? view.querySelector('.score-bar') : null;
        if (scoreBar) scoreBar.style.display = '';
        this.saveBest();
        const accuracy = this.total > 0 ? Math.round(this.score / this.total * 100) : 0;
        const pb = this.best[this.prefix];
        const pbText = pb ? pb.score + '/' + pb.total + ' (' + Math.round(pb.score / pb.total * 100) + '%)' : '\u2014';
        let overlay = document.getElementById('timed-overlay');
        if (!overlay) { overlay = document.createElement('div'); overlay.id = 'timed-overlay'; overlay.className = 'timed-overlay'; document.body.appendChild(overlay); }
        overlay.innerHTML = '<div class="timed-results"><h2>Time\'s Up!</h2><div class="timed-stat-grid"><div class="timed-stat"><div class="timed-stat-val">' + this.score + '/' + this.total + '</div><div class="timed-stat-lbl">Correct</div></div><div class="timed-stat"><div class="timed-stat-val">' + accuracy + '%</div><div class="timed-stat-lbl">Accuracy</div></div><div class="timed-stat"><div class="timed-stat-val">' + pbText + '</div><div class="timed-stat-lbl">Personal Best</div></div></div><div class="timed-btn-row"><button class="btn btn-hint" onclick="TIMED.close()">Back</button><button class="btn btn-primary" onclick="TIMED.retry()">Try Again</button></div></div>';
        overlay.style.display = 'flex';
        // Check achievements if available
        if (typeof ACHIEVEMENTS !== 'undefined') ACHIEVEMENTS.check();
    },
    close() {
        const overlay = document.getElementById('timed-overlay');
        if (overlay) overlay.style.display = 'none';
        const view = document.querySelector('.view.active');
        const backBtn = view ? view.querySelector('.back-btn') : null;
        if (backBtn) backBtn.click();
    },
    retry() {
        const overlay = document.getElementById('timed-overlay');
        if (overlay) overlay.style.display = 'none';
        this.start(this.prefix, this.activity);
    },
    loadBest() { try { this.best = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'timedChallenges') || '{}'); } catch (e) { this.best = {}; } },
    saveBest() {
        this.loadBest();
        const k = this.prefix, prev = this.best[k];
        if (!prev || this.score > prev.score || (this.score === prev.score && this.total < prev.total))
            this.best[k] = { score: this.score, total: this.total, ts: Date.now() };
        localStorage.setItem(STORAGE_PREFIX + 'timedChallenges', JSON.stringify(this.best));
        if (typeof Auth !== 'undefined') Auth.saveAndSync();
    }
};

// ===================================================================
// SESSION-LEVEL QUESTION DEDUP
// ===================================================================
const _sessionSeen = {};
const _SESSION_WINDOW = 30;
function _qFingerprint(q) {
    if (!q) return '';
    return String(q.text || '').slice(0, 100) + '|' + String(q.answer || '');
}
function _dedupNext(origNext, prefix) {
    if (!_sessionSeen[prefix]) _sessionSeen[prefix] = [];
    const seen = _sessionSeen[prefix];
    for (let i = 0; i < 15; i++) {
        const q = origNext();
        const fp = _qFingerprint(q);
        if (seen.indexOf(fp) === -1) {
            seen.push(fp);
            if (seen.length > _SESSION_WINDOW) seen.shift();
            return q;
        }
    }
    _sessionSeen[prefix] = [];
    const q = origNext();
    _sessionSeen[prefix].push(_qFingerprint(q));
    return q;
}
function resetSessionSeen(prefix) {
    if (prefix) _sessionSeen[prefix] = [];
    else for (const k in _sessionSeen) _sessionSeen[k] = [];
}

// ===================================================================
// WEEKLY STATS RESET
// ===================================================================
function getWeekStart() {
    var d = new Date(); d.setHours(0,0,0,0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d.toLocaleDateString('en-CA');
}
function checkWeeklyReset() {
    try {
        var week = getWeekStart();
        var stored = localStorage.getItem(STORAGE_PREFIX + 'statsWeekStart');
        if (stored !== week) {
            var stats = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'activityStats') || '{}');
            var allTime = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'allTimeStats') || '{"q":0,"c":0}');
            for (var k in stats) {
                allTime.q += stats[k].total || 0;
                allTime.c += stats[k].score || 0;
            }
            localStorage.setItem(STORAGE_PREFIX + 'allTimeStats', JSON.stringify(allTime));
            localStorage.setItem(STORAGE_PREFIX + 'statsWeekStart', week);
            localStorage.setItem(STORAGE_PREFIX + 'activityStats', '{}');
            localStorage.removeItem(STORAGE_PREFIX + '_lb_lastQ');
            localStorage.removeItem(STORAGE_PREFIX + '_lb_lastC');
        }
    } catch (e) {}
}
checkWeeklyReset();

// ===================================================================
// ACTIVITY SCORE PERSISTENCE
// ===================================================================
function saveActivityStats(prefix, activity, ok) {
    if (typeof Premium !== 'undefined' && !Premium.checkDailyLimit()) return;
    try {
        var all = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'activityStats') || '{}');
        all[prefix] = {
            score: activity.score, total: activity.total, streak: activity.streak,
            bestStreak: Math.max(activity.streak, (all[prefix] && all[prefix].bestStreak || 0)),
            lastTs: Date.now()
        };
        localStorage.setItem(STORAGE_PREFIX + 'activityStats', JSON.stringify(all));
        updateDailyStreak();
        // Gem reward: 1-N gems per correct answer (N depends on difficulty)
        if (ok === true && typeof addGems === 'function') {
            var maxGem = activity.level === 'hard' ? 10 : activity.level === 'medium' ? 6 : 3;
            addGems(Math.min(activity.streak || 1, maxGem), 'correct');
        }
        // XP reward
        if (typeof XP !== 'undefined') {
            XP.addXP(ok === true ? XP.RATES.correct : XP.RATES.question, ok === true ? 'correct' : 'question');
        }
        // Confetti + toast at streak milestones (5, 10, 15, ...)
        if (activity.streak > 0 && activity.streak % 5 === 0 && typeof fireConfetti === 'function') {
            fireConfetti(Math.min(activity.streak * 8, 100));
            if (typeof showStreakToast === 'function') showStreakToast(activity.streak);
        }
        // Viral share: topic mastery (perfect score at 10+ questions in a row)
        if (typeof ShareEngine !== 'undefined' && activity.streak >= 10 && ok === true) {
            var subj = window.SUBJECT_KEY || '';
            var topicLabel = prefix.replace(/_/g, ' ').replace(/(^|\s)\w/g, function(c) { return c.toUpperCase(); });
            setTimeout(function() { ShareEngine.onTopicMastery(subj, topicLabel, activity.streak, activity.streak); }, 1500);
        }
        // Spaced repetition hooks
        if (ok === false && activity.currentQ) saveWrongAnswer(prefix, activity.currentQ);
        if (ok === true && activity.currentQ) removeWrongAnswer(prefix, activity.currentQ);
        // Practice history
        savePracticeSession(prefix, activity.score, activity.total);
        if (typeof Auth !== 'undefined') Auth.saveAndSync();
        // Timed challenge hook
        if (TIMED.active) TIMED.recordAnswer();
        // Achievements hook
        if (typeof ACHIEVEMENTS !== 'undefined') ACHIEVEMENTS.check();
        // Criterion C: evaluate working out
        if (typeof _evaluateTrainerWorking === 'function') _evaluateTrainerWorking(prefix);
        // Analytics
        if (typeof P56Analytics !== 'undefined') P56Analytics.track('question_answered', { subject: window.SUBJECT_KEY || '', trainer: prefix, correct: ok === true });
        // First-ever question tracking
        if (!localStorage.getItem('p56_first_q_tracked')) {
            localStorage.setItem('p56_first_q_tracked', '1');
            if (typeof P56Analytics !== 'undefined') P56Analytics.track('funnel_first_question', { subject: window.SUBJECT_KEY || '', trainer: prefix });
            if (typeof gtag === 'function') gtag('event', 'funnel_first_question', { event_category: 'conversion', subject: window.SUBJECT_KEY || '' });
        }
    } catch (e) {}
}

function loadActivityStats(prefix, activity) {
    try {
        var all = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'activityStats') || '{}');
        var s = all[prefix];
        if (s) { activity.score = s.score || 0; activity.total = s.total || 0; activity.streak = s.streak || 0; }
    } catch (e) {}
    // Restore score bar UI
    var sEl = document.getElementById(prefix + '-score');
    var pEl = document.getElementById(prefix + '-pct');
    var kEl = document.getElementById(prefix + '-streak');
    if (sEl) sEl.textContent = activity.score + ' / ' + activity.total;
    if (pEl) pEl.textContent = activity.total ? Math.round(activity.score / activity.total * 100) + '%' : '\u2014';
    if (kEl) kEl.textContent = activity.streak;
    if (activity.next && !activity._dedupWrapped) {
        var orig = activity.next.bind(activity);
        activity.next = function() { return _dedupNext(orig, prefix); };
        activity._dedupWrapped = true;
    }
}

function getAllActivityStats() {
    try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'activityStats') || '{}'); } catch (e) { return {}; }
}

// ===================================================================
// DAILY STREAK
// ===================================================================
function updateDailyStreak() {
    try {
        var today = new Date().toLocaleDateString('en-CA');
        var ds = JSON.parse(localStorage.getItem('dailyStreak') || '{}');
        if (ds.lastDate === today) return;
        // Guard: if today is more than 2 days ahead of lastDate, likely clock manipulation
        if (ds.lastDate) {
            var lastMs = new Date(ds.lastDate + 'T00:00:00').getTime();
            var todayMs = new Date(today + 'T00:00:00').getTime();
            if (todayMs - lastMs > 3 * 86400000) {
                ds.current = 1; ds.lastDate = today;
                ds.best = Math.max(ds.current, ds.best || 0);
                localStorage.setItem('dailyStreak', JSON.stringify(ds));
                updateDailyStreakUI();
                return;
            }
        }
        var yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
        if (ds.lastDate === yesterday) {
            ds.current = (ds.current || 0) + 1;
        } else if (ds.lastDate && ds.current > 0) {
            if (typeof consumeStreakFreeze === 'function' && consumeStreakFreeze()) {
                ds.current = (ds.current || 0) + 1;
            } else {
                ds.current = 1;
            }
        } else {
            ds.current = 1;
        }
        ds.lastDate = today;
        ds.best = Math.max(ds.current, ds.best || 0);
        localStorage.setItem('dailyStreak', JSON.stringify(ds));
        updateDailyStreakUI();
        if (typeof dismissStreakReminder === 'function') dismissStreakReminder();
        if (typeof XP !== 'undefined') XP.addXP(XP.RATES.streak, 'streak');
        // Streak milestone celebration
        _checkStreakMilestone(ds.current);
    } catch (e) {}
}

function _checkStreakMilestone(streak) {
    var milestones = [7, 14, 30, 50, 100, 200, 365];
    if (milestones.indexOf(streak) === -1) return;
    var key = 'streakCelebrated_' + streak;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
    setTimeout(function() { _showStreakCelebration(streak); }, 600);
}

function _showStreakCelebration(streak) {
    var existing = document.getElementById('streak-milestone-modal');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.id = 'streak-milestone-modal';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);animation:smFadeIn .3s ease;';
    var msgs = { 7: 'One week strong!', 14: 'Two weeks - unstoppable!', 30: 'A whole month!', 50: 'Fifty days - legendary!', 100: 'Triple digits!', 200: 'Two hundred days!', 365: 'A full year - incredible!' };
    var msg = msgs[streak] || streak + '-day streak!';
    overlay.innerHTML = '<style>@keyframes smFadeIn{from{opacity:0}to{opacity:1}}@keyframes smPop{from{transform:scale(0.8);opacity:0}to{transform:scale(1);opacity:1}}</style>'
        + '<div style="background:var(--surface,#1e1e2e);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;max-width:360px;width:90%;text-align:center;animation:smPop .35s ease;font-family:inherit;">'
        + '<div style="font-size:3.5rem;margin-bottom:8px;">&#x1F525;</div>'
        + '<h2 style="margin:0 0 4px;font-size:1.5rem;color:#fff;">' + streak + '-Day Streak!</h2>'
        + '<p style="color:rgba(255,255,255,0.6);margin:0 0 20px;font-size:0.95rem;">' + msg + '</p>'
        + '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
        + '<button id="sm-share" style="padding:10px 20px;border:none;border-radius:8px;background:#FF5C4D;color:#fff;font-weight:600;font-size:0.88rem;cursor:pointer;">Share with friends</button>'
        + '<button id="sm-close" style="padding:10px 20px;border:1px solid rgba(255,255,255,0.15);border-radius:8px;background:transparent;color:rgba(255,255,255,0.7);font-size:0.88rem;cursor:pointer;">Nice!</button>'
        + '</div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#sm-close').addEventListener('click', function() { overlay.remove(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#sm-share').addEventListener('click', function() {
        // Use ShareEngine for WhatsApp-first sharing with referral link
        if (typeof ShareEngine !== 'undefined') {
            overlay.remove();
            ShareEngine.onStreakMilestone(streak);
        } else {
            var text = "I'm on a " + streak + "-day study streak on Project 56! Can you beat it?";
            var url = 'https://project-56.org/hub.html';
            if (navigator.share) {
                navigator.share({ title: streak + '-Day Streak!', text: text, url: url }).catch(function(){});
            } else {
                navigator.clipboard.writeText(text + ' ' + url).then(function() {
                    overlay.querySelector('#sm-share').textContent = 'Copied!';
                    setTimeout(function() { overlay.remove(); }, 1500);
                });
            }
        }
    });
}

function getDailyStreak() {
    try {
        var ds = JSON.parse(localStorage.getItem('dailyStreak') || '{}');
        var today = new Date().toLocaleDateString('en-CA');
        var yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');
        if (ds.lastDate === today || ds.lastDate === yesterday) return ds;
        return { current: 0, best: ds.best || 0, lastDate: ds.lastDate };
    } catch (e) { return { current: 0, best: 0 }; }
}

function updateDailyStreakUI() {
    var el = document.getElementById('daily-streak');
    if (!el) return;
    var ds = getDailyStreak();
    el.textContent = ds.current || 0;
    var bestEl = document.getElementById('daily-streak-best');
    if (bestEl) bestEl.textContent = ds.best || 0;
    if (typeof _refreshSidebarStats === 'function') _refreshSidebarStats();
}

// ===================================================================
// SPACED REPETITION (WRONG ANSWER REVIEW)
// ===================================================================
function saveWrongAnswer(prefix, qData) {
    try {
        var all = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'wrongAnswers') || '{}');
        if (!all[prefix]) all[prefix] = [];
        all[prefix].push(qData);
        if (all[prefix].length > 10) all[prefix].shift();
        localStorage.setItem(STORAGE_PREFIX + 'wrongAnswers', JSON.stringify(all));
    } catch (e) {}
}

function getWrongAnswer(prefix, difficulty) {
    try {
        var all = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'wrongAnswers') || '{}');
        var pool = all[prefix];
        if (!pool || pool.length === 0) return null;
        if (difficulty && difficulty !== 'all') pool = pool.filter(function(q) { return q.difficulty === difficulty; });
        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    } catch (e) { return null; }
}

function removeWrongAnswer(prefix, qData) {
    try {
        var all = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'wrongAnswers') || '{}');
        var pool = all[prefix];
        if (!pool) return;
        var idx = pool.findIndex(function(q) { return JSON.stringify(q) === JSON.stringify(qData); });
        if (idx !== -1) pool.splice(idx, 1);
        localStorage.setItem(STORAGE_PREFIX + 'wrongAnswers', JSON.stringify(all));
    } catch (e) {}
}

// ===================================================================
// PRACTICE HISTORY
// ===================================================================
function savePracticeSession(prefix, score, total) {
    try {
        var hist = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'practiceHistory') || '[]');
        var now = Date.now();
        var last = hist[hist.length - 1];
        if (last && last.prefix === prefix && (now - last.date) < 120000) {
            last.score = score; last.total = total; last.date = now; last.count = (last.count || 0) + 1;
        } else {
            hist.push({ prefix: prefix, date: now, score: score, total: total, count: 1 });
        }
        if (hist.length > 200) hist.shift();
        localStorage.setItem(STORAGE_PREFIX + 'practiceHistory', JSON.stringify(hist));
    } catch (e) {}
}

// ===================================================================
// EXTENDED ANSWER CHECKER (for open-ended questions with mark schemes)
// ===================================================================
// Synonym map: when a pattern doesn't match, check these alternatives
var _EXT_SYNONYMS = {
    'equal': ['equivalent', 'the same'],
    'equals': ['is equivalent to', 'is the same as', 'is equal to'],
    'balanced': ['in equilibrium', 'equivalent'],
    'increase': ['go up', 'get bigger', 'get larger', 'get higher', 'become bigger', 'become larger', 'become greater', 'risen', 'grew'],
    'increases': ['goes up', 'gets bigger', 'gets larger', 'gets higher', 'becomes bigger', 'becomes larger', 'becomes greater'],
    'decrease': ['go down', 'get smaller', 'get lower', 'become smaller', 'become lower', 'diminish', 'lessen'],
    'decreases': ['goes down', 'gets smaller', 'gets lower', 'becomes smaller', 'becomes lower', 'diminishes', 'lessens'],
    'proportional': ['proportionate'],
    'directly proportional': ['linearly related', 'directly related'],
    'inversely proportional': ['inversely related'],
    'constant': ['unchanging', 'does not change', 'stays the same', 'remains the same'],
    'zero': ['nothing', 'nil'],
    'greater': ['bigger', 'larger', 'higher', 'more'],
    'less': ['smaller', 'lower', 'fewer'],
    'same': ['identical', 'equivalent', 'equal']
};

function _matchPatternWithSynonyms(text, pattern) {
    var pl = pattern.toLowerCase();
    if (text.includes(pl)) return true;
    var syns = _EXT_SYNONYMS[pl];
    if (syns) {
        for (var i = 0; i < syns.length; i++) {
            if (text.includes(syns[i])) return true;
        }
    }
    return false;
}

function checkExtended(response, markScheme) {
    var text = response.toLowerCase().replace(/[\u2018\u2019]/g, "'");
    var results = markScheme.map(function(entry) {
        var matched = entry.patterns.some(function(p) { return _matchPatternWithSynonyms(text, p); });
        return { mark: entry.mark, awarded: matched, matched: matched };
    });
    var marks = results.filter(function(r) { return r.awarded; }).length;
    return { marks: marks, maxMarks: markScheme.length, results: results };
}

// ===================================================================
// STREAK TOAST + CONFETTI
// ===================================================================
function showStreakToast(streak) {
    var msgs = ['Nice!','On fire!','Unstoppable!','Legendary!','Godlike!'];
    var tier = Math.min(Math.floor(streak / 5) - 1, msgs.length - 1);
    var toast = document.createElement('div');
    toast.className = 'streak-toast';
    toast.textContent = streak + ' streak - ' + msgs[tier];
    document.body.appendChild(toast);
    setTimeout(function() { toast.classList.add('out'); setTimeout(function() { toast.remove(); }, 500); }, 2500);
}

function fireConfetti(intensity) {
    var count = intensity || 40;
    var colors = ['#4361ee','#06d6a0','#f72585','#ffc107','#4cc9f0','#ff6b6b','#845ec2'];
    var container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:hidden;';
    document.body.appendChild(container);
    for (var i = 0; i < count; i++) {
        var p = document.createElement('div');
        var size = 4 + Math.random() * 6;
        var x = 30 + Math.random() * 40;
        var drift = (Math.random() - 0.5) * 200;
        var dur = 1.2 + Math.random() * 1.5;
        var delay = Math.random() * 0.3;
        var shape = Math.random() > 0.5 ? '50%' : (Math.random() > 0.5 ? '2px' : '0');
        p.style.cssText = 'position:absolute;bottom:50%;left:' + x + '%;width:' + size + 'px;height:' + size + 'px;border-radius:' + shape + ';background:' + colors[i % colors.length] + ';opacity:1;animation:confetti-pop ' + dur + 's ease-out ' + delay + 's forwards;--drift:' + drift + 'px;';
        container.appendChild(p);
    }
    setTimeout(function() { container.remove(); }, 3500);
}
// Inject confetti keyframes once
(function() {
    if (document.getElementById('confetti-keyframes')) return;
    var s = document.createElement('style');
    s.id = 'confetti-keyframes';
    s.textContent = '@keyframes confetti-pop{0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:1;}100%{transform:translateY(-' + (window.innerHeight || 700) + 'px) translateX(var(--drift)) rotate(' + (360 + Math.random() * 360) + 'deg);opacity:0;}}';
    document.head.appendChild(s);
})();

// ===================================================================
// MC KEYBOARD SHORTCUTS (1-4 to select, Enter to confirm)
// ===================================================================
var _selectedMC = null;
document.addEventListener('keydown', function(e) {
    if (document.activeElement && (document.activeElement.tagName === 'MATH-FIELD' ||
        document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.isContentEditable)) return;
    var k = parseInt(e.key);
    if (k >= 1 && k <= 4) {
        var btn = document.querySelector('.option-btn[data-i="' + (k - 1) + '"]:not(:disabled)');
        if (btn) {
            e.preventDefault();
            document.querySelectorAll('.option-btn.selected').forEach(function(b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
            _selectedMC = btn;
        }
    } else if (e.key === 'Enter' && _selectedMC && document.body.contains(_selectedMC) && !_selectedMC.disabled) {
        e.preventDefault(); e.stopImmediatePropagation();
        _selectedMC.click(); _selectedMC = null;
    }
});

// ===================================================================
// STREAK RECOVERY FROM MASTERY DATA
// Scans mastery timestamps + activityStats + practiceHistory to fix
// streaks that were lost before the mastery→streak bug was patched.
// ===================================================================
function recoverStreakFromMastery() {
    try {
        var activeDates = {};
        // Scan all localStorage keys ending in MasteryData
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (!key || key.indexOf('MasteryData') === -1) continue;
            try {
                var d = JSON.parse(localStorage.getItem(key));
                if (!d || !d.skills) continue;
                for (var sid in d.skills) {
                    var atts = d.skills[sid].attempts || [];
                    for (var j = 0; j < atts.length; j++) {
                        if (atts[j].ts) activeDates[new Date(atts[j].ts).toLocaleDateString('en-CA')] = true;
                    }
                }
            } catch (e) {}
        }
        // Also collect from activityStats lastTs
        try {
            var prefix = (typeof STORAGE_PREFIX !== 'undefined' ? STORAGE_PREFIX : '');
            var stats = JSON.parse(localStorage.getItem(prefix + 'activityStats') || '{}');
            for (var k in stats) {
                if (stats[k].lastTs) activeDates[new Date(stats[k].lastTs).toLocaleDateString('en-CA')] = true;
            }
        } catch (e) {}
        // Also collect from practiceHistory
        try {
            var hist = JSON.parse(localStorage.getItem(prefix + 'practiceHistory') || '[]');
            for (var h = 0; h < hist.length; h++) {
                if (hist[h].date) activeDates[new Date(hist[h].date).toLocaleDateString('en-CA')] = true;
            }
        } catch (e) {}
        if (Object.keys(activeDates).length === 0) return;
        // Count consecutive days back from today
        var today = new Date();
        var streak = 0;
        for (var i = 0; i < 365; i++) {
            var dt = new Date(today.getTime() - i * 86400000).toLocaleDateString('en-CA');
            if (activeDates[dt]) streak++;
            else if (i === 0) continue;
            else break;
        }
        var ds = JSON.parse(localStorage.getItem('dailyStreak') || '{}');
        if (streak > (ds.current || 0)) {
            ds.current = streak;
            ds.lastDate = new Date().toLocaleDateString('en-CA');
            ds.best = Math.max(ds.current, ds.best || 0);
            localStorage.setItem('dailyStreak', JSON.stringify(ds));
            if (typeof updateDailyStreakUI === 'function') updateDailyStreakUI();
        }
    } catch (e) {}
}

// ===================================================================
// AUTO-OPEN WORKING OUT FOR FREE-RESPONSE QUESTIONS
// ===================================================================
// When a question-card is populated with a free-input question (math-field
// or input-area), auto-open the sibling <details class="workout-section">.
// For MC questions, leave it collapsed so it doesn't distract.
(function() {
    function syncWorkout(card) {
        var parent = card.parentElement;
        if (!parent) return;
        var details = parent.querySelector('details.workout-section');
        if (!details) return;
        var isFree = card.querySelector('.input-area, math-field, input[type="number"], input[type="text"]');
        if (isFree) {
            details.setAttribute('open', '');
        } else {
            details.removeAttribute('open');
        }
    }
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.type === 'childList' && m.target.classList.contains('question-card')) {
                syncWorkout(m.target);
            }
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.question-card').forEach(function(card) {
            observer.observe(card, { childList: true });
        });
    });
    // Also observe cards added later (e.g. by view switching)
    new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            m.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.classList && node.classList.contains('question-card')) {
                    observer.observe(node, { childList: true });
                }
            });
        });
    }).observe(document.body || document.documentElement, { childList: true, subtree: true });
})();

// ===================================================================
// FULL-WIDTH NUMERAL INTERCEPT (MathLive crash prevention)
// ===================================================================
document.addEventListener('beforeinput', function(e) {
    if (e.target.tagName === 'MATH-FIELD' && e.data) {
        var converted = e.data.replace(/[\uFF10-\uFF19]/g, function(ch) { return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0); });
        if (converted !== e.data) {
            e.preventDefault();
            e.target.executeCommand(['insert', converted]);
        }
    }
});
