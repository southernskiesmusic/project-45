/* ================================================================
   BIOLOGY INIT - IB Biology for Project 45
   ================================================================ */
function _escHtml(s) { if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

var TOPIC_MAP = {
    'topic-a': { view: 'topic-a' },
    'topic-b': { view: 'topic-b' },
    'topic-c': { view: 'topic-c' },
    'topic-d': { view: 'topic-d' },

    'cell-biology':    { view: 'activity', init: function() { if(typeof BIO_CELLS!=='undefined') BIO_CELLS.load(); } },
    'genetics':        { view: 'activity', init: function() { if(typeof BIO_GENETICS!=='undefined') BIO_GENETICS.load(); } },
    'ecology':         { view: 'activity', init: function() { if(typeof BIO_ECOLOGY!=='undefined') BIO_ECOLOGY.load(); } },
    'cell-respiration':{ view: 'activity', init: function() { if(typeof BIO_RESPIRATION!=='undefined') BIO_RESPIRATION.load(); } },
    'biomolecules':    { view: 'activity', init: function() { if(typeof BIO_BIOMOL!=='undefined') BIO_BIOMOL.load(); } },
    'dna-genetics':    { view: 'activity', init: function() { if(typeof BIO_DNA!=='undefined') BIO_DNA.load(); } },

    'dashboard': { view: 'dashboard', init: function() { if(typeof showDashboard==='function') showDashboard(); } }
};

var BIOLOGY_LESSONS = {};
if(typeof LESSON_BIO_CELLS!=='undefined')      BIOLOGY_LESSONS['cell-biology']     = LESSON_BIO_CELLS;
if(typeof LESSON_BIO_GENETICS!=='undefined')   BIOLOGY_LESSONS['genetics']         = LESSON_BIO_GENETICS;
if(typeof LESSON_BIO_ECOLOGY!=='undefined')    BIOLOGY_LESSONS['ecology']          = LESSON_BIO_ECOLOGY;
if(typeof LESSON_BIO_RESP!=='undefined')       BIOLOGY_LESSONS['cell-respiration'] = LESSON_BIO_RESP;
if(typeof LESSON_BIO_BIOMOL!=='undefined')     BIOLOGY_LESSONS['biomolecules']     = LESSON_BIO_BIOMOL;
if(typeof LESSON_BIO_DNA!=='undefined')        BIOLOGY_LESSONS['dna-genetics']     = LESSON_BIO_DNA;

var CONTINUE_MAP = {
    biocell:  { topic: 'cell-biology',     name: 'Cell Biology' },
    biogen:   { topic: 'genetics',         name: 'Genetics' },
    bioeco:   { topic: 'ecology',          name: 'Ecology' },
    bioresp:  { topic: 'cell-respiration', name: 'Cell Respiration' },
    biobiol:  { topic: 'biomolecules',     name: 'Biomolecules' },
    biodna:   { topic: 'dna-genetics',     name: 'DNA and Genetics' }
};

var ACTIVITY_PREFIXES = {
    'cell-biology':     'biocell',
    'genetics':         'biogen',
    'ecology':          'bioeco',
    'cell-respiration': 'bioresp',
    'biomolecules':     'biobiol',
    'dna-genetics':     'biodna'
};

var AVAILABLE_ACTIVITIES = {};
if(typeof BIO_CELLS!=='undefined')      AVAILABLE_ACTIVITIES['cell-biology']     = { obj: BIO_CELLS, parent: 'topic-a' };
if(typeof BIO_GENETICS!=='undefined')   AVAILABLE_ACTIVITIES['genetics']         = { obj: BIO_GENETICS, parent: 'topic-b' };
if(typeof BIO_ECOLOGY!=='undefined')    AVAILABLE_ACTIVITIES['ecology']          = { obj: BIO_ECOLOGY, parent: 'topic-c' };
if(typeof BIO_RESPIRATION!=='undefined') AVAILABLE_ACTIVITIES['cell-respiration']= { obj: BIO_RESPIRATION, parent: 'topic-b' };
if(typeof BIO_BIOMOL!=='undefined')     AVAILABLE_ACTIVITIES['biomolecules']     = { obj: BIO_BIOMOL, parent: 'topic-a' };
if(typeof BIO_DNA!=='undefined')        AVAILABLE_ACTIVITIES['dna-genetics']     = { obj: BIO_DNA, parent: 'topic-b' };

var trainerInitFns = [];

if (typeof SubjectBase !== 'undefined') {
    SubjectBase.init({
        key: 'biology',
        topicMap: TOPIC_MAP,
        lessons: BIOLOGY_LESSONS,
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
    try { localStorage.setItem('biology-dark', document.body.classList.contains('dark-mode')); } catch(e) {}
}

function showDashboard() { showView('dashboard'); renderBiologyDashboard(); }

function renderBiologyDashboard() {
    var raw = null;
    try { raw = localStorage.getItem('biology_activityStats'); } catch(e) {}
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
        'cell-biology': 'Cell Biology', 'genetics': 'Genetics',
        'ecology': 'Ecology', 'cell-respiration': 'Cell Respiration',
        'biomolecules': 'Biomolecules', 'dna-genetics': 'DNA and Genetics'
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
    try { if (localStorage.getItem('biology-dark') === 'true') document.body.classList.add('dark-mode'); } catch(e) {}
})();
