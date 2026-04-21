/* ================================================================
   ENGLISH A INIT - IB English A for Project 45
   ================================================================ */
function _escHtml(s) { if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

var TOPIC_MAP = {
    'topic-a': { view: 'topic-a' },
    'topic-b': { view: 'topic-b' },

    'literary-devices': { view: 'activity', init: function() { if(typeof ENG_LITERARY!=='undefined') ENG_LITERARY.load(); } },
    'text-types':       { view: 'activity', init: function() { if(typeof ENG_TEXT_TYPES!=='undefined') ENG_TEXT_TYPES.load(); } },
    'paper1-skills':    { view: 'activity', init: function() { if(typeof ENG_PAPER1!=='undefined') ENG_PAPER1.load(); } },
    'global-issues':    { view: 'activity', init: function() { if(typeof ENG_GLOBAL!=='undefined') ENG_GLOBAL.load(); } },
    'paper2-essay':     { view: 'activity', init: function() { if(typeof ENG_PAPER2!=='undefined') ENG_PAPER2.load(); } },
    'narrative-voice':  { view: 'activity', init: function() { if(typeof ENG_NARRATIVE!=='undefined') ENG_NARRATIVE.load(); } },

    'dashboard': { view: 'dashboard', init: function() { if(typeof showDashboard==='function') showDashboard(); } }
};

var ENGLISH_LESSONS = {};
if(typeof LESSON_ENG_LITERARY!=='undefined')   ENGLISH_LESSONS['literary-devices'] = LESSON_ENG_LITERARY;
if(typeof LESSON_ENG_TEXT_TYPES!=='undefined') ENGLISH_LESSONS['text-types']       = LESSON_ENG_TEXT_TYPES;
if(typeof LESSON_ENG_PAPER1!=='undefined')     ENGLISH_LESSONS['paper1-skills']    = LESSON_ENG_PAPER1;
if(typeof LESSON_ENG_GLOBAL!=='undefined')     ENGLISH_LESSONS['global-issues']    = LESSON_ENG_GLOBAL;
if(typeof LESSON_ENG_PAPER2!=='undefined')     ENGLISH_LESSONS['paper2-essay']     = LESSON_ENG_PAPER2;
if(typeof LESSON_ENG_NARRATIVE!=='undefined')  ENGLISH_LESSONS['narrative-voice']  = LESSON_ENG_NARRATIVE;

var CONTINUE_MAP = {
    englit:  { topic: 'literary-devices', name: 'Literary Devices' },
    engtxt:  { topic: 'text-types',       name: 'Text Types' },
    engp1:   { topic: 'paper1-skills',    name: 'Paper 1 Skills' },
    engglo:  { topic: 'global-issues',    name: 'Global Issues' },
    engp2:   { topic: 'paper2-essay',     name: 'Paper 2 Essay' },
    engnrr:  { topic: 'narrative-voice',  name: 'Narrative Voice' }
};

var ACTIVITY_PREFIXES = {
    'literary-devices': 'englit',
    'text-types':       'engtxt',
    'paper1-skills':    'engp1',
    'global-issues':    'engglo',
    'paper2-essay':     'engp2',
    'narrative-voice':  'engnrr'
};

var AVAILABLE_ACTIVITIES = {};
if(typeof ENG_LITERARY!=='undefined')    AVAILABLE_ACTIVITIES['literary-devices'] = { obj: ENG_LITERARY, parent: 'topic-a' };
if(typeof ENG_TEXT_TYPES!=='undefined')  AVAILABLE_ACTIVITIES['text-types']       = { obj: ENG_TEXT_TYPES, parent: 'topic-a' };
if(typeof ENG_PAPER1!=='undefined')      AVAILABLE_ACTIVITIES['paper1-skills']    = { obj: ENG_PAPER1, parent: 'topic-b' };
if(typeof ENG_GLOBAL!=='undefined')      AVAILABLE_ACTIVITIES['global-issues']    = { obj: ENG_GLOBAL, parent: 'topic-b' };
if(typeof ENG_PAPER2!=='undefined')      AVAILABLE_ACTIVITIES['paper2-essay']     = { obj: ENG_PAPER2, parent: 'topic-b' };
if(typeof ENG_NARRATIVE!=='undefined')   AVAILABLE_ACTIVITIES['narrative-voice']  = { obj: ENG_NARRATIVE, parent: 'topic-a' };

var trainerInitFns = [];

if (typeof SubjectBase !== 'undefined') {
    SubjectBase.init({
        key: 'english',
        topicMap: TOPIC_MAP,
        lessons: ENGLISH_LESSONS,
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
    }
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
    var target = document.getElementById('view-' + viewId);
    if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
}

function toggleDark() {
    document.body.classList.toggle('dark-mode');
    try { localStorage.setItem('english-dark', document.body.classList.contains('dark-mode')); } catch(e) {}
}

function showDashboard() { showView('dashboard'); renderEnglishDashboard(); }

function renderEnglishDashboard() {
    var raw = null;
    try { raw = localStorage.getItem('english_activityStats'); } catch(e) {}
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
        'literary-devices': 'Literary Devices', 'text-types': 'Text Types',
        'paper1-skills': 'Paper 1 Skills', 'global-issues': 'Global Issues',
        'paper2-essay': 'Paper 2 Essay', 'narrative-voice': 'Narrative Voice'
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
    try { if (localStorage.getItem('english-dark') === 'true') document.body.classList.add('dark-mode'); } catch(e) {}
})();
