/* ================================================================
   MATHS INIT - IB Math AA for Project 45
   Uses SubjectBase shared framework from Project 56
   ================================================================ */
function _escHtml(s) { if (!s) return ''; return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

// ── Topic Map: data-topic value -> { view, init } ──
var TOPIC_MAP = {
    // Hub -> topic folder views (5 main topics)
    'number-algebra':    { view: 'number-algebra' },
    'functions':         { view: 'functions' },
    'geometry-trig':     { view: 'geometry-trig' },
    'stats-probability': { view: 'stats-probability' },
    'calculus':          { view: 'calculus' },

    // Topic 1: Number & Algebra sub-topics
    'numbers-rounding':          { view: 'number-algebra', sub: '1.1' },
    'arithmetic-sequences':      { view: 'activity', init: function() { if (typeof ARITH_SEQ !== 'undefined') ARITH_SEQ.load(); } },
    'geometric-sequences':       { view: 'activity', init: function() { if (typeof GEO_SEQ !== 'undefined') GEO_SEQ.load(); } },
    'financial-maths':           { view: 'number-algebra', sub: '1.5' },
    'binomial-theorem':          { view: 'activity', init: function() { if (typeof BINOMIAL !== 'undefined') BINOMIAL.load(); } },
    'deductive-proof':           { view: 'number-algebra', sub: '1.7' },
    'methods-of-proof':          { view: 'number-algebra', sub: '1.8' },
    'mathematical-induction':    { view: 'number-algebra', sub: '1.9' },
    'systems-of-equations':      { view: 'number-algebra', sub: '1.10' },
    'complex-numbers-cartesian': { view: 'number-algebra', sub: '1.11-1.12' },
    'complex-numbers-polar':     { view: 'number-algebra', sub: '1.13-1.15' },

    // Topic 2: Functions sub-topics
    'lines':                  { view: 'activity', init: function() { if (typeof LINES !== 'undefined') LINES.load(); } },
    'quadratics':             { view: 'functions', sub: '2.2' },
    'functions-domain-range': { view: 'functions', sub: '2.3' },
    'composition-inverse':    { view: 'functions', sub: '2.4-2.5' },
    'transformations':        { view: 'functions', sub: '2.6' },
    'asymptotes':             { view: 'functions', sub: '2.7' },
    'exponents':              { view: 'activity', init: function() { if (typeof EXPONENTS !== 'undefined') EXPONENTS.load(); } },
    'logarithms':             { view: 'activity', init: function() { if (typeof LOGARITHMS !== 'undefined') LOGARITHMS.load(); } },
    'exponential-equations':  { view: 'functions', sub: '2.10' },
    'polynomials':            { view: 'functions', sub: '2.11-2.12' },
    'rational-functions':     { view: 'functions', sub: '2.13-2.14' },
    'modulus':                { view: 'functions', sub: '2.15' },
    'symmetries':             { view: 'functions', sub: '2.16' },

    // Topic 3: Geometry & Trigonometry sub-topics
    '3d-geometry-triangles':   { view: 'geometry-trig', sub: '3.1-3.3' },
    'arcs-sectors':            { view: 'geometry-trig', sub: '3.4' },
    'unit-circle':             { view: 'geometry-trig', sub: '3.5' },
    'trig-equations':          { view: 'geometry-trig', sub: '3.6' },
    'trig-functions':          { view: 'geometry-trig', sub: '3.7' },
    'further-trig-identities': { view: 'geometry-trig', sub: '3.8' },
    'further-trig-functions':  { view: 'geometry-trig', sub: '3.9' },
    'vectors-algebra':         { view: 'geometry-trig', sub: '3.10-3.12' },
    'vector-lines':            { view: 'geometry-trig', sub: '3.13-3.14' },
    'vectors-kinematics':      { view: 'geometry-trig', sub: '3.15' },
    'cross-product':           { view: 'geometry-trig', sub: '3.16' },
    'planes':                  { view: 'geometry-trig', sub: '3.17' },
    'intersections-distances': { view: 'geometry-trig', sub: '3.18-3.19' },

    // Topic 4: Statistics & Probability sub-topics
    'stats-basic':              { view: 'stats-probability', sub: '4.1-4.3' },
    'linear-regression':        { view: 'stats-probability', sub: '4.4' },
    'probability-venn':         { view: 'stats-probability', sub: '4.5-4.7' },
    'probability-trees':        { view: 'stats-probability', sub: '4.8' },
    'discrete-distributions':   { view: 'stats-probability', sub: '4.9' },
    'binomial-distribution':    { view: 'stats-probability', sub: '4.10' },
    'normal-distribution':      { view: 'stats-probability', sub: '4.11' },
    'continuous-distributions': { view: 'stats-probability', sub: '4.12' },
    'counting-probability':     { view: 'stats-probability', sub: '4.13' },

    // Topic 5: Calculus sub-topics
    'limits':                    { view: 'calculus', sub: '5.1' },
    'derivatives-basic':         { view: 'calculus', sub: '5.2' },
    'chain-rule':                { view: 'calculus', sub: '5.3' },
    'tangent-normal':            { view: 'calculus', sub: '5.4' },
    'monotony-concavity':        { view: 'calculus', sub: '5.5-5.6' },
    'graph-of-f':                { view: 'calculus', sub: '5.7' },
    'optimisation':              { view: 'calculus', sub: '5.8' },
    'indefinite-integrals':      { view: 'calculus', sub: '5.9-5.10' },
    'definite-integrals':        { view: 'calculus', sub: '5.11' },
    'kinematics':                { view: 'calculus', sub: '5.12' },
    'more-derivatives':          { view: 'calculus', sub: '5.13' },
    'implicit-differentiation':  { view: 'calculus', sub: '5.14' },
    'related-rates':             { view: 'calculus', sub: '5.15' },
    'limits-lhopital':           { view: 'calculus', sub: '5.16-5.17' },
    'more-integrals':            { view: 'calculus', sub: '5.18-5.19' },
    'integration-by-parts':      { view: 'calculus', sub: '5.20' },
    'further-areas-volumes':     { view: 'calculus', sub: '5.21' },
    'differential-equations':    { view: 'calculus', sub: '5.22' },
    'maclaurin-series':          { view: 'calculus', sub: '5.23' },

    // Utility views
    'dashboard': { view: 'dashboard', init: function() { if (typeof showDashboard === 'function') showDashboard(); } }
};

// ── Lessons Map: data-lesson value -> lesson object ──
var MATHS_LESSONS = {};
if (typeof LESSON_LINES !== 'undefined') MATHS_LESSONS['lines'] = LESSON_LINES;
if (typeof LESSON_ARITH_SEQ !== 'undefined') MATHS_LESSONS['arithmetic-sequences'] = LESSON_ARITH_SEQ;
if (typeof LESSON_GEO_SEQ !== 'undefined') MATHS_LESSONS['geometric-sequences'] = LESSON_GEO_SEQ;
if (typeof LESSON_EXPONENTS !== 'undefined') MATHS_LESSONS['exponents'] = LESSON_EXPONENTS;
if (typeof LESSON_LOGARITHMS !== 'undefined') MATHS_LESSONS['logarithms'] = LESSON_LOGARITHMS;
if (typeof LESSON_BINOMIAL !== 'undefined') MATHS_LESSONS['binomial-theorem'] = LESSON_BINOMIAL;

// ── Continue prompt map ──
var CONTINUE_MAP = {
    lines:      { topic: 'lines',                name: 'Lines' },
    arithseq:   { topic: 'arithmetic-sequences',  name: 'Arithmetic Sequences' },
    geoseq:     { topic: 'geometric-sequences',   name: 'Geometric Sequences' },
    exponents:  { topic: 'exponents',             name: 'Exponents' },
    logarithms: { topic: 'logarithms',            name: 'Logarithms' },
    binomial:   { topic: 'binomial-theorem',      name: 'Binomial Theorem' }
};

// ── Pathway config ──
var MATHS_PATHWAYS = [
    { id: 'functions', name: 'Functions', icon: 'f(x)', lessons: ['lines', 'exponents', 'logarithms'], activity: 'lines', activityPrefix: 'lines' },
    { id: 'number-algebra', name: 'Number & Algebra', icon: '#', lessons: ['arithmetic-sequences', 'geometric-sequences', 'binomial-theorem'], activity: 'arithmetic-sequences', activityPrefix: 'arithseq' }
];

// ── Activity prefixes (for stats tracking) ──
var ACTIVITY_PREFIXES = {
    'lines': 'lines',
    'arithmetic-sequences': 'arithseq',
    'geometric-sequences': 'geoseq',
    'exponents': 'exponents',
    'logarithms': 'logarithms',
    'binomial-theorem': 'binomial'
};

// ── Available activities registry ──
var AVAILABLE_ACTIVITIES = {};
if (typeof LINES !== 'undefined')      AVAILABLE_ACTIVITIES['lines']                = { obj: LINES, parent: 'functions' };
if (typeof ARITH_SEQ !== 'undefined')  AVAILABLE_ACTIVITIES['arithmetic-sequences'] = { obj: ARITH_SEQ, parent: 'number-algebra' };
if (typeof GEO_SEQ !== 'undefined')    AVAILABLE_ACTIVITIES['geometric-sequences']  = { obj: GEO_SEQ, parent: 'number-algebra' };
if (typeof EXPONENTS !== 'undefined')  AVAILABLE_ACTIVITIES['exponents']            = { obj: EXPONENTS, parent: 'functions' };
if (typeof LOGARITHMS !== 'undefined') AVAILABLE_ACTIVITIES['logarithms']           = { obj: LOGARITHMS, parent: 'functions' };
if (typeof BINOMIAL !== 'undefined')   AVAILABLE_ACTIVITIES['binomial-theorem']     = { obj: BINOMIAL, parent: 'number-algebra' };

// ── Trainer inits ──
var trainerInitFns = [];
if (typeof LINES !== 'undefined' && LINES.init)      trainerInitFns.push(function() { LINES.init(); });
if (typeof ARITH_SEQ !== 'undefined' && ARITH_SEQ.init)  trainerInitFns.push(function() { ARITH_SEQ.init(); });
if (typeof GEO_SEQ !== 'undefined' && GEO_SEQ.init)    trainerInitFns.push(function() { GEO_SEQ.init(); });
if (typeof EXPONENTS !== 'undefined' && EXPONENTS.init)  trainerInitFns.push(function() { EXPONENTS.init(); });
if (typeof LOGARITHMS !== 'undefined' && LOGARITHMS.init) trainerInitFns.push(function() { LOGARITHMS.init(); });
if (typeof BINOMIAL !== 'undefined' && BINOMIAL.init)   trainerInitFns.push(function() { BINOMIAL.init(); });

// ================================================================
//  SubjectBase.init() - hands off auth, premium, topic routing,
//  lesson cards, back buttons, pathways, bookmarks, etc.
// ================================================================
if (typeof SubjectBase !== 'undefined') {
    SubjectBase.init({
        key: 'maths',
        topicMap: TOPIC_MAP,
        lessons: MATHS_LESSONS,
        activityPrefixes: ACTIVITY_PREFIXES,
        trainerInits: trainerInitFns,
        pathways: MATHS_PATHWAYS,
        continueMap: CONTINUE_MAP,
        onTopicClick: function(topic, card) {
            // Handle sub-topic cards that have activities
            if (AVAILABLE_ACTIVITIES[topic]) {
                launchActivity(topic);
                return true; // suppress default SubjectBase handler
            }
            return false;
        }
    });
}

// ================================================================
//  MATHS-SPECIFIC CODE (not handled by SubjectBase)
// ================================================================

/* ── Activity launcher ── */
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
        // Re-render KaTeX after load
        setTimeout(function() { renderActivityKaTeX(); }, 50);
    }
}

/* ── View management ── */
function showView(viewId) {
    document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); });
    var target = document.getElementById('view-' + viewId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
}

/* ── State ── */
var selectedCourse = null;
var selectedLevel = null;
try { selectedCourse = localStorage.getItem('p45-course'); } catch(e) {}
try { selectedLevel = localStorage.getItem('p45-level'); } catch(e) {}

/* ── Course selection ── */
function selectCourse(course) {
    if (course === 'ai') return; // Coming soon
    selectedCourse = course;
    try { localStorage.setItem('p45-course', course); } catch(e) {}
    var name = course === 'aa' ? 'Mathematics AA' : 'Mathematics AI';
    document.getElementById('level-select-title').textContent = name;
    showView('level-select');
}

/* ── Level selection ── */
function selectLevel(level) {
    selectedLevel = level;
    try { localStorage.setItem('p45-level', level); } catch(e) {}
    applySelection();
    showView('hub');
}

/* ── Apply course + level to hub ── */
function applySelection() {
    var courseName = selectedCourse === 'aa' ? 'Mathematics AA' : 'Mathematics AI';
    var levelName = selectedLevel === 'hl' ? 'HL' : 'SL';
    var courseDesc = selectedCourse === 'aa' ? 'Analysis and Approaches' : 'Applications and Interpretation';

    document.getElementById('hub-title').textContent = courseName + ' ' + levelName;
    document.getElementById('hub-subtitle').textContent = courseDesc;

    // Filter topic cards: SL sees only SL, HL sees SL + HL
    var isHL = selectedLevel === 'hl';
    document.querySelectorAll('.topic-card[data-topic]').forEach(function(card) {
        var badge = card.querySelector('.level-badge');
        if (!badge) return;
        var cardLevel = badge.textContent.trim().toLowerCase();
        if (isHL) {
            card.style.display = '';
        } else {
            card.style.display = cardLevel === 'hl' ? 'none' : '';
        }
    });

    // Show/hide HL section labels
    document.querySelectorAll('.section-label').forEach(function(label) {
        var text = label.textContent.trim().toLowerCase();
        if (text.includes('hl')) {
            label.style.display = isHL ? '' : 'none';
        }
    });
}

/* ── Change course/level from hub ── */
function changeCourse() {
    try {
        localStorage.removeItem('p45-course');
        localStorage.removeItem('p45-level');
    } catch(e) {}
    selectedCourse = null;
    selectedLevel = null;
    showView('course-select');
}

/* ── Dark mode toggle ── */
function toggleDark() {
    document.body.classList.toggle('dark-mode');
    try { localStorage.setItem('p45-dark', document.body.classList.contains('dark-mode')); } catch(e) {}
}

/* ── Dashboard ── */
var dashChart = null;

function showDashboard() {
    showView('dashboard');
    renderDashboard();
}

function renderDashboard() {
    var raw = null;
    try { raw = localStorage.getItem('maths_activityStats'); } catch(e) {}
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

    var html = '';

    // Overview stats bar
    html += '<div class="score-bar" style="margin-bottom:24px;">';
    html += '<div class="score-item"><div class="label">Total Questions</div><div class="value primary">' + totalQ + '</div></div>';
    html += '<div class="score-item"><div class="label">Overall Accuracy</div><div class="value primary">' + (totalQ > 0 ? accuracy + '%' : '-') + '</div></div>';
    html += '<div class="score-item"><div class="label">Best Streak</div><div class="value success">' + bestStreak + '</div></div>';
    html += '<div class="score-item"><div class="label">Topics Attempted</div><div class="value primary">' + topics.length + '</div></div>';
    html += '</div>';

    // Doughnut chart
    html += '<div style="max-width:400px;margin:0 auto 32px;background:var(--card);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow);">';
    html += '<h3 style="margin:0 0 16px;text-align:center;font-size:1rem;color:var(--text);">Questions by Topic</h3>';
    html += '<canvas id="dash-chart" width="360" height="360"></canvas>';
    html += '</div>';

    // Per-topic progress bars
    html += '<div id="dash-topic-bars" style="max-width:600px;margin:0 auto;"></div>';

    dashContent.innerHTML = html;

    // Build chart
    var chartCanvas = document.getElementById('dash-chart');
    var labels = [];
    var data = [];
    var colors = [
        '#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1',
        '#84cc16', '#0ea5e9'
    ];

    topics.forEach(function(t) {
        labels.push(t.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); }));
        data.push(stats[t].total || 0);
    });

    if (dashChart) {
        dashChart.destroy();
        dashChart = null;
    }

    if (topics.length > 0 && typeof Chart !== 'undefined') {
        dashChart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, topics.length),
                    borderWidth: 2,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--card').trim() || '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a2e',
                            padding: 12,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    } else {
        var h3 = chartCanvas.parentElement.querySelector('h3');
        if (h3) {
            h3.textContent = topics.length === 0
                ? 'No activity data yet - complete some trainers!'
                : 'Questions by Topic';
        }
    }

    // Per-topic progress bars
    var barsContainer = document.getElementById('dash-topic-bars');
    if (topics.length === 0) {
        barsContainer.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:24px;">Complete some activities to see your progress here.</p>';
        return;
    }

    var barsHtml = '<div style="background:var(--card);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);">';
    barsHtml += '<h3 style="margin:0 0 16px;font-size:1rem;color:var(--text);">Accuracy by Topic</h3>';

    topics.forEach(function(t, i) {
        var s = stats[t];
        var topicAcc = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0;
        var name = t.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
        var color = colors[i % colors.length];

        barsHtml += '<div style="margin-bottom:14px;">';
        barsHtml += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">';
        barsHtml += '<span style="font-size:0.88rem;font-weight:500;color:var(--text);">' + name + '</span>';
        barsHtml += '<span style="font-size:0.78rem;color:var(--text-light);">' + s.score + '/' + s.total + ' (' + topicAcc + '%)</span>';
        barsHtml += '</div>';
        barsHtml += '<div style="height:8px;background:var(--border);border-radius:4px;overflow:hidden;">';
        barsHtml += '<div style="height:100%;width:' + topicAcc + '%;background:' + color + ';border-radius:4px;transition:width 0.5s ease;"></div>';
        barsHtml += '</div>';
        barsHtml += '</div>';
    });

    barsHtml += '</div>';
    barsContainer.innerHTML = barsHtml;
}

// ================================================================
//  DOMContentLoaded - wire up UI, search, Desmos, dark mode, etc.
// ================================================================
document.addEventListener('DOMContentLoaded', function() {

    // ── Wire up sub-topic cards with available activities ──
    document.querySelectorAll('.view:not(#view-hub) .topic-card[data-topic]').forEach(function(card) {
        var topic = card.getAttribute('data-topic');
        if (AVAILABLE_ACTIVITIES[topic]) {
            card.onclick = function() { launchActivity(topic); };
            card.style.cursor = 'pointer';
        } else if (!TOPIC_MAP[topic] || TOPIC_MAP[topic].sub) {
            // Sub-topic without an activity yet
            card.style.opacity = '0.6';
            card.style.cursor = 'default';
            card.title = 'Coming soon';
        }
    });

    // ── Restore dark mode ──
    try {
        if (localStorage.getItem('p45-dark') === 'true') {
            document.body.classList.add('dark-mode');
            var dt = document.getElementById('dark-toggle');
            if (dt) dt.checked = true;
        }
    } catch(e) {}

    // ── Restore saved course/level selection on load ──
    if (selectedCourse && selectedLevel) {
        applySelection();
        showView('hub');
    }

    // ── KaTeX auto-render ──
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true },
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ]
        });
    }

    // ── Search ──
    var searchInput = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        // Build search index from topic cards
        var searchIndex = [];
        document.querySelectorAll('.topic-card[data-topic]').forEach(function(card) {
            var titleEl = card.querySelector('h2');
            var descEl = card.querySelector('p');
            var tagEl = card.querySelector('.topic-tag');
            var badge = card.querySelector('.level-badge');
            var title = titleEl ? titleEl.textContent : '';
            var desc = descEl ? descEl.textContent : '';
            var tag = tagEl ? tagEl.textContent : '';
            var level = badge ? badge.textContent.trim() : '';
            var topic = card.getAttribute('data-topic');
            var parentView = card.closest('.view');
            var view = parentView ? parentView.id.replace('view-', '') : 'hub';
            searchIndex.push({ title: title, desc: desc, tag: tag, level: level, topic: topic, view: view });
        });

        searchInput.addEventListener('input', function() {
            var q = searchInput.value.toLowerCase().trim();
            if (!q) { searchResults.classList.remove('show'); return; }

            var isHL = selectedLevel === 'hl';
            var matches = searchIndex.filter(function(item) {
                if (!isHL && item.level.toLowerCase() === 'hl') return false;
                return item.title.toLowerCase().indexOf(q) !== -1 ||
                       item.desc.toLowerCase().indexOf(q) !== -1 ||
                       item.tag.toLowerCase().indexOf(q) !== -1;
            }).slice(0, 8);

            if (matches.length === 0) {
                searchResults.innerHTML = '<div style="padding:12px 18px;color:var(--text-light);font-size:0.88rem;">No results found</div>';
            } else {
                searchResults.innerHTML = matches.map(function(m) {
                    var hasActivity = !!AVAILABLE_ACTIVITIES[m.topic];
                    var onclick = hasActivity
                        ? 'launchActivity(\'' + m.topic + '\')'
                        : 'showView(\'' + m.view + '\')';
                    return '<div class="search-result" onclick="' + onclick + '">' +
                        '<div class="search-result-text">' +
                        '<div class="search-result-title">' + _escHtml(m.title) + '</div>' +
                        '<div class="search-result-sub">' + _escHtml(m.desc) + '</div>' +
                        '</div>' +
                        '<span class="search-level ' + (m.level.toLowerCase() === 'hl' ? 'hl' : 'sl') + '">' + _escHtml(m.level) + '</span>' +
                        '</div>';
                }).join('');
            }
            searchResults.classList.add('show');
        });

        searchInput.addEventListener('blur', function() {
            setTimeout(function() { searchResults.classList.remove('show'); }, 200);
        });
    }

    // ── Desmos Floating Calculator ──
    (function() {
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
                    expressionsCollapsed: false
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
                if (window.desmosCalc) {
                    window.desmosCalc.setBlank();
                }
            });
        }
    })();

    // ── Init Auth ──
    if (typeof Auth !== 'undefined') Auth.init();

}); // end DOMContentLoaded
