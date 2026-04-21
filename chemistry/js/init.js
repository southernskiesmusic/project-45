/* ================================================================
   CHEMISTRY INIT - IB Chemistry for Project 45
   ================================================================ */
function _escHtml(s) { if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

var TOPIC_MAP = {
    'topic-a': { view: 'topic-a' },
    'topic-b': { view: 'topic-b' },
    'topic-c': { view: 'topic-c' },
    'topic-d': { view: 'topic-d' },

    'stoichiometry':  { view: 'activity', init: function() { if(typeof CHEM_STOICH!=='undefined') CHEM_STOICH.load(); } },
    'ideal-gas-chem': { view: 'activity', init: function() { if(typeof CHEM_GAS!=='undefined') CHEM_GAS.load(); } },
    'energetics':     { view: 'activity', init: function() { if(typeof CHEM_ENERGETICS!=='undefined') CHEM_ENERGETICS.load(); } },
    'kinetics':       { view: 'activity', init: function() { if(typeof CHEM_KINETICS!=='undefined') CHEM_KINETICS.load(); } },
    'equilibrium':    { view: 'activity', init: function() { if(typeof CHEM_EQUILIBRIUM!=='undefined') CHEM_EQUILIBRIUM.load(); } },
    'acids-bases':    { view: 'activity', init: function() { if(typeof CHEM_ACIDS!=='undefined') CHEM_ACIDS.load(); } },

    'dashboard': { view: 'dashboard', init: function() { if(typeof showDashboard==='function') showDashboard(); } }
};

var CHEMISTRY_LESSONS = {};
if(typeof LESSON_CHEM_STOICH!=='undefined')    CHEMISTRY_LESSONS['stoichiometry']  = LESSON_CHEM_STOICH;
if(typeof LESSON_CHEM_GAS!=='undefined')       CHEMISTRY_LESSONS['ideal-gas-chem'] = LESSON_CHEM_GAS;
if(typeof LESSON_CHEM_ENERGETICS!=='undefined') CHEMISTRY_LESSONS['energetics']    = LESSON_CHEM_ENERGETICS;
if(typeof LESSON_CHEM_KINETICS!=='undefined')  CHEMISTRY_LESSONS['kinetics']       = LESSON_CHEM_KINETICS;
if(typeof LESSON_CHEM_EQUILIBRIUM!=='undefined') CHEMISTRY_LESSONS['equilibrium']  = LESSON_CHEM_EQUILIBRIUM;
if(typeof LESSON_CHEM_ACIDS!=='undefined')     CHEMISTRY_LESSONS['acids-bases']    = LESSON_CHEM_ACIDS;

var CONTINUE_MAP = {
    chstoich:  { topic: 'stoichiometry',  name: 'Stoichiometry' },
    chgas:     { topic: 'ideal-gas-chem', name: 'Ideal Gases' },
    chenrg:    { topic: 'energetics',     name: 'Energetics' },
    chkin:     { topic: 'kinetics',       name: 'Kinetics' },
    cheq:      { topic: 'equilibrium',    name: 'Equilibrium' },
    chacid:    { topic: 'acids-bases',    name: 'Acids and Bases' }
};

var ACTIVITY_PREFIXES = {
    'stoichiometry':  'chstoich',
    'ideal-gas-chem': 'chgas',
    'energetics':     'chenrg',
    'kinetics':       'chkin',
    'equilibrium':    'cheq',
    'acids-bases':    'chacid'
};

var AVAILABLE_ACTIVITIES = {};
if(typeof CHEM_STOICH!=='undefined')     AVAILABLE_ACTIVITIES['stoichiometry']  = { obj: CHEM_STOICH, parent: 'topic-a' };
if(typeof CHEM_GAS!=='undefined')        AVAILABLE_ACTIVITIES['ideal-gas-chem'] = { obj: CHEM_GAS, parent: 'topic-a' };
if(typeof CHEM_ENERGETICS!=='undefined') AVAILABLE_ACTIVITIES['energetics']     = { obj: CHEM_ENERGETICS, parent: 'topic-b' };
if(typeof CHEM_KINETICS!=='undefined')   AVAILABLE_ACTIVITIES['kinetics']       = { obj: CHEM_KINETICS, parent: 'topic-c' };
if(typeof CHEM_EQUILIBRIUM!=='undefined') AVAILABLE_ACTIVITIES['equilibrium']   = { obj: CHEM_EQUILIBRIUM, parent: 'topic-c' };
if(typeof CHEM_ACIDS!=='undefined')      AVAILABLE_ACTIVITIES['acids-bases']    = { obj: CHEM_ACIDS, parent: 'topic-d' };

var trainerInitFns = [];

if (typeof SubjectBase !== 'undefined') {
    SubjectBase.init({
        key: 'chemistry',
        topicMap: TOPIC_MAP,
        lessons: CHEMISTRY_LESSONS,
        trainerInits: trainerInitFns,
        continueMap: CONTINUE_MAP,
        onTopicClick: function(topic, card) {
            if (AVAILABLE_ACTIVITIES[topic]) { launchActivity(topic); return true; }
            return false;
        }
    });
}

function launchActivity(topicId) {
    var act = AVAILABLE_ACTIVITIES[topicId];
    if (act && act.obj && act.obj.load) {
        showView('activity');
        try { act.obj.load(); } catch(e) {
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
    if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
}

function toggleDark() {
    document.body.classList.toggle('dark-mode');
    try { localStorage.setItem('chemistry-dark', document.body.classList.contains('dark-mode')); } catch(e) {}
}

function showDashboard() { showView('dashboard'); renderChemistryDashboard(); }

function renderChemistryDashboard() {
    var raw = null;
    try { raw = localStorage.getItem('chemistry_activityStats'); } catch(e) {}
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
        'stoichiometry': 'Stoichiometry', 'ideal-gas-chem': 'Ideal Gases',
        'energetics': 'Energetics', 'kinetics': 'Kinetics',
        'equilibrium': 'Equilibrium', 'acids-bases': 'Acids and Bases'
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

(function() {
    try { if (localStorage.getItem('chemistry-dark') === 'true') document.body.classList.add('dark-mode'); } catch(e) {}
})();
