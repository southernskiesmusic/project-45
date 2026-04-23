/* ================================================================
   PHYSICS INIT - IB Physics for Project 45
   ================================================================ */
function _escHtml(s) { if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ── Topic Map: data-topic -> { view, init } ──
var TOPIC_MAP = {
    // Hub -> topic folder views
    'topic-a': { view: 'topic-a' },
    'topic-b': { view: 'topic-b' },
    'topic-c': { view: 'topic-c' },
    'topic-d': { view: 'topic-d' },
    'topic-e': { view: 'topic-e' },

    // Topic A: Space, Time and Motion
    'kinematics-1d': { view: 'activity', init: function() { if(typeof PHYS_KINEMATICS!=='undefined') PHYS_KINEMATICS.load(); } },
    'dynamics':      { view: 'activity', init: function() { if(typeof PHYS_DYNAMICS!=='undefined') PHYS_DYNAMICS.load(); } },
    'energy-power':  { view: 'activity', init: function() { if(typeof PHYS_ENERGY!=='undefined') PHYS_ENERGY.load(); } },

    // Topic B: Particulate Nature of Matter
    'gas-laws':  { view: 'activity', init: function() { if(typeof PHYS_GAS!=='undefined') PHYS_GAS.load(); } },
    'circuits':  { view: 'activity', init: function() { if(typeof PHYS_CIRCUITS!=='undefined') PHYS_CIRCUITS.load(); } },

    // Topic D: Fields
    'grav-fields': { view: 'activity', init: function() { if(typeof PHYS_GRAV!=='undefined') PHYS_GRAV.load(); } },

    // Utility
    'dashboard': { view: 'dashboard', init: function() { if(typeof showDashboard==='function') showDashboard(); } }
};

// ── Lessons Map ──
var PHYSICS_LESSONS = {};
if(typeof LESSON_PHYS_KINEMATICS!=='undefined') PHYSICS_LESSONS['kinematics-1d'] = LESSON_PHYS_KINEMATICS;
if(typeof LESSON_PHYS_DYNAMICS!=='undefined')   PHYSICS_LESSONS['dynamics']       = LESSON_PHYS_DYNAMICS;
if(typeof LESSON_PHYS_ENERGY!=='undefined')     PHYSICS_LESSONS['energy-power']   = LESSON_PHYS_ENERGY;
if(typeof LESSON_PHYS_GAS!=='undefined')        PHYSICS_LESSONS['gas-laws']        = LESSON_PHYS_GAS;
if(typeof LESSON_PHYS_CIRCUITS!=='undefined')   PHYSICS_LESSONS['circuits']        = LESSON_PHYS_CIRCUITS;
if(typeof LESSON_PHYS_GRAV!=='undefined')       PHYSICS_LESSONS['grav-fields']     = LESSON_PHYS_GRAV;

// ── Continue prompt map ──
var CONTINUE_MAP = {
    phkin:   { topic: 'kinematics-1d', name: 'Kinematics' },
    phdyn:   { topic: 'dynamics',      name: 'Forces and Dynamics' },
    phenrg:  { topic: 'energy-power',  name: 'Work, Energy and Power' },
    phgas:   { topic: 'gas-laws',      name: 'Gas Laws' },
    phcirc:  { topic: 'circuits',      name: 'Electric Circuits' },
    phgrav:  { topic: 'grav-fields',   name: 'Gravitational Fields' }
};

// ── Activity prefixes (for stats tracking) ──
var ACTIVITY_PREFIXES = {
    'kinematics-1d': 'phkin',
    'dynamics':      'phdyn',
    'energy-power':  'phenrg',
    'gas-laws':      'phgas',
    'circuits':      'phcirc',
    'grav-fields':   'phgrav'
};

// ── Available activities registry ──
var AVAILABLE_ACTIVITIES = {};
if(typeof PHYS_KINEMATICS!=='undefined') AVAILABLE_ACTIVITIES['kinematics-1d'] = { obj: PHYS_KINEMATICS, parent: 'topic-a' };
if(typeof PHYS_DYNAMICS!=='undefined')   AVAILABLE_ACTIVITIES['dynamics']       = { obj: PHYS_DYNAMICS, parent: 'topic-a' };
if(typeof PHYS_ENERGY!=='undefined')     AVAILABLE_ACTIVITIES['energy-power']   = { obj: PHYS_ENERGY, parent: 'topic-a' };
if(typeof PHYS_GAS!=='undefined')        AVAILABLE_ACTIVITIES['gas-laws']        = { obj: PHYS_GAS, parent: 'topic-b' };
if(typeof PHYS_CIRCUITS!=='undefined')   AVAILABLE_ACTIVITIES['circuits']        = { obj: PHYS_CIRCUITS, parent: 'topic-b' };
if(typeof PHYS_GRAV!=='undefined')       AVAILABLE_ACTIVITIES['grav-fields']     = { obj: PHYS_GRAV, parent: 'topic-d' };

// ── Trainer init fns (array, matching SubjectBase API) ──
var trainerInitFns = [];

// ── SubjectBase.init() ──
if (typeof SubjectBase !== 'undefined') {
    SubjectBase.init({
        key: 'physics',
        topicMap: TOPIC_MAP,
        lessons: PHYSICS_LESSONS,
        trainerInits: trainerInitFns,
        continueMap: CONTINUE_MAP,
        onTopicClick: function(topic, card) {
            if (AVAILABLE_ACTIVITIES[topic]) {
                launchActivity(topic);
                return true;
            }
            return false;
        }
    });
}

// ================================================================
//  PHYSICS-SPECIFIC CODE
// ================================================================

function launchActivity(topicId) {
    var act = AVAILABLE_ACTIVITIES[topicId];
    if (act && act.obj && act.obj.load) {
        showView('activity');
        try {
            act.obj.load();
        } catch (e) {
            console.error('Failed to load activity ' + topicId + ':', e);
            document.getElementById('activity-container').innerHTML =
                '<div style="text-align:center;padding:40px;"><h2>Oops</h2><p>Something went wrong loading this activity.</p>' +
                '<button class="btn btn-primary" onclick="showView(\'hub\')">Back to Hub</button></div>';
            return;
        }
        setTimeout(function() { renderActivityKaTeX(); }, 50);
    }
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
    var target = document.getElementById('view-' + viewId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}

function toggleDark() {
    document.body.classList.toggle('dark-mode');
    try { localStorage.setItem('physics-dark', document.body.classList.contains('dark-mode')); } catch(e) {}
}

function showDashboard() {
    showView('dashboard');
    renderPhysicsDashboard();
}

function renderPhysicsDashboard() {
    var raw = null;
    try { raw = localStorage.getItem('physics_activityStats'); } catch(e) {}
    var stats = {};
    try { stats = raw ? JSON.parse(raw) : {}; } catch(e) { stats = {}; }

    var topics = Object.keys(stats);
    var totalScore = 0, totalQ = 0, bestStreak = 0;
    topics.forEach(function(t) {
        var s = stats[t];
        totalScore += (s.score || 0);
        totalQ += (s.total || 0);
        if ((s.bestStreak || 0) > bestStreak) bestStreak = s.bestStreak;
    });
    var accuracy = totalQ > 0 ? Math.round((totalScore / totalQ) * 100) : 0;

    var dashContent = document.getElementById('dash-content');
    if (!dashContent) return;

    var topicNames = {
        'kinematics-1d': 'Kinematics', 'dynamics': 'Forces & Dynamics',
        'energy-power': 'Work, Energy & Power', 'gas-laws': 'Gas Laws',
        'circuits': 'Circuits', 'grav-fields': 'Gravitational Fields'
    };

    var rows = topics.map(function(t) {
        var s = stats[t];
        var acc = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0;
        return '<tr><td>' + (topicNames[t] || t) + '</td><td>' + s.score + '/' + s.total + '</td><td>' + acc + '%</td><td>' + (s.bestStreak || 0) + '</td></tr>';
    }).join('');

    dashContent.innerHTML =
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">' +
        '<div class="score-item"><div class="label">Questions</div><div class="value">' + totalQ + '</div></div>' +
        '<div class="score-item"><div class="label">Accuracy</div><div class="value">' + accuracy + '%</div></div>' +
        '<div class="score-item"><div class="label">Best Streak</div><div class="value">' + bestStreak + '</div></div>' +
        '</div>' +
        (rows ? '<table style="width:100%;border-collapse:collapse;font-size:0.88rem;">' +
            '<thead><tr style="border-bottom:2px solid var(--border);"><th style="text-align:left;padding:8px 4px;">Topic</th>' +
            '<th>Score</th><th>Accuracy</th><th>Best Streak</th></tr></thead>' +
            '<tbody>' + rows + '</tbody></table>' :
        '<p style="text-align:center;color:var(--text-light);padding:40px;">No activity data yet. Start practising!</p>');
}

// Dark mode restore
(function() {
    try {
        if (localStorage.getItem('physics-dark') === 'true') document.body.classList.add('dark-mode');
    } catch(e) {}
})();

// ── Desmos Floating Calculator ──
document.addEventListener('DOMContentLoaded', function() {
    var calcBtn = document.getElementById('calc-btn');
    if (typeof Desmos === 'undefined' && calcBtn) calcBtn.style.display = 'none';
    var calcModal = document.getElementById('calc-modal');
    var calcCloseBtn = document.getElementById('calc-close-btn');
    var calcClearBtn = document.getElementById('calc-clear-btn');
    window.desmosCalc = null;

    if (!calcBtn || !calcModal) return;

    function openCalc() {
        if (typeof Desmos === 'undefined') {
            alert('Calculator is loading. Please try again in a moment.');
            return;
        }
        calcModal.classList.add('show');
        calcBtn.classList.add('active');
        if (!window.desmosCalc) {
            var container = document.getElementById('calc-container');
            window.desmosCalc = Desmos.GraphingCalculator(container, {
                settingsMenu: false,
                border: false,
                expressionsCollapsed: false,
                graphpaper: false,
                keypad: false,
                zoomButtons: false,
                lockViewport: true
            });
        }
    }

    function closeCalc() {
        calcModal.classList.remove('show');
        calcBtn.classList.remove('active');
    }

    calcBtn.addEventListener('click', function() {
        calcModal.classList.contains('show') ? closeCalc() : openCalc();
    });

    if (calcCloseBtn) calcCloseBtn.addEventListener('click', closeCalc);

    if (calcClearBtn) {
        calcClearBtn.addEventListener('click', function() {
            if (window.desmosCalc) window.desmosCalc.setBlank();
        });
    }
});
