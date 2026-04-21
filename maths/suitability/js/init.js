/* ================================================================
   SUITABILITY MODULE — init.js
   Navigation, view management, lesson/activity routing.
   ================================================================ */

var _currentTopic = null;

var TOPICS = {
    surds: {
        title: 'Surds',
        icon: '√',
        desc: 'Simplifying, rationalising the denominator, and expanding surd expressions.',
        lesson: function() { if (typeof LESSON_SURDS !== 'undefined') { LESSON_SURDS.folder = 'topic-detail'; LessonEngine.start(LESSON_SURDS); } },
        activity: function() { if (typeof SURDS_ACT !== 'undefined') SURDS_ACT.load(); }
    },
    'algebraic-fractions': {
        title: 'Algebraic Fractions',
        icon: '⁄',
        desc: 'Simplifying, adding, subtracting, multiplying, and dividing algebraic fractions.',
        lesson: function() { if (typeof LESSON_ALG_FRAC !== 'undefined') { LESSON_ALG_FRAC.folder = 'topic-detail'; LessonEngine.start(LESSON_ALG_FRAC); } },
        activity: function() { if (typeof ALG_FRAC_ACT !== 'undefined') ALG_FRAC_ACT.load(); }
    },
    'completing-square': {
        title: 'Completing the Square',
        icon: '②',
        desc: 'Writing quadratics in vertex form, identifying the vertex, and solving by completing the square.',
        lesson: function() { if (typeof LESSON_QUADRATICS !== 'undefined') { LESSON_QUADRATICS.folder = 'topic-detail'; LessonEngine.start(LESSON_QUADRATICS); } },
        activity: function() { if (typeof CTC_ACT !== 'undefined') CTC_ACT.load(); }
    },
    'simultaneous-quadratic': {
        title: 'Simultaneous Equations',
        icon: '∩',
        desc: 'Solving one linear and one quadratic equation simultaneously using substitution.',
        lesson: function() { if (typeof LESSON_SIM_QUAD !== 'undefined') { LESSON_SIM_QUAD.folder = 'topic-detail'; LessonEngine.start(LESSON_SIM_QUAD); } },
        activity: function() { if (typeof SIM_QUAD_ACT !== 'undefined') SIM_QUAD_ACT.load(); }
    },
    'linear-graphs': {
        title: 'Linear Graphs',
        icon: '↗',
        desc: 'Gradient, y-intercept, equation of a line, parallel and perpendicular lines.',
        lesson: null,
        activity: function() { if (typeof LINEAR_GRAPHS_ACT !== 'undefined') LINEAR_GRAPHS_ACT.load(); }
    },
    'index-laws': {
        title: 'Index Laws',
        icon: 'xⁿ',
        desc: 'Laws of indices, negative and fractional exponents, solving exponential equations.',
        lesson: null,
        activity: function() { if (typeof INDEX_LAWS_ACT !== 'undefined') INDEX_LAWS_ACT.load(); }
    },
    'graph-transforms': {
        title: 'Graph Transformations',
        icon: '↔',
        desc: 'Translations, reflections, and stretches of graphs — f(x+a), f(x)+a, af(x), f(-x).',
        lesson: null,
        activity: function() { if (typeof GRAPH_TRANSFORMS_ACT !== 'undefined') GRAPH_TRANSFORMS_ACT.load(); }
    }
};

function showView(id) {
    document.querySelectorAll('.suit-view').forEach(function(v) { v.classList.remove('active'); });
    var el = document.getElementById('view-' + id);
    if (el) { el.classList.add('active'); window.scrollTo(0, 0); }
}

function openTopic(topicKey) {
    _currentTopic = topicKey;
    var t = TOPICS[topicKey];
    if (!t) return;

    // Populate topic detail view
    document.getElementById('topic-detail-icon').textContent = t.icon;
    document.getElementById('topic-detail-title').textContent = t.title;
    document.getElementById('topic-detail-desc').textContent = t.desc;

    var lessonBtn = document.getElementById('topic-lesson-btn');
    if (lessonBtn) {
        lessonBtn.style.display = t.lesson ? 'block' : 'none';
    }

    showView('topic-detail');
}

function startLesson() {
    var t = TOPICS[_currentTopic];
    if (!t || !t.lesson) return;
    showView('lesson');
    setTimeout(function() { t.lesson(); }, 50);
}

function startActivity() {
    var t = TOPICS[_currentTopic];
    if (!t || !t.activity) return;
    showView('activity');
    var container = document.getElementById('activity-content');
    if (container) container.innerHTML = '<p style="color:var(--text-light);padding:20px;">Loading practice questions...</p>';
    setTimeout(function() {
        t.activity();
    }, 50);
}

function startMockTest() {
    showView('mock-test');
    var container = document.getElementById('mock-test-content');
    if (container) container.innerHTML = '<p style="color:var(--text-light);padding:20px;">Loading mock test...</p>';
    setTimeout(function() {
        if (typeof SUIT_TEST !== 'undefined') SUIT_TEST.start();
    }, 50);
}

// Override LessonEngine container so it renders into the suitability lesson div
var _origLEStart = null;
document.addEventListener('DOMContentLoaded', function() {
    // Patch LessonEngine to use suitability container
    if (typeof LessonEngine !== 'undefined') {
        _origLEStart = LessonEngine.start.bind(LessonEngine);
        var _origRender = LessonEngine._render;
        if (_origRender) {
            LessonEngine._renderTarget = function() {
                return document.getElementById('suit-lesson-container') || document.getElementById('lesson-container');
            };
        }
    }

    // Keyboard: Escape → back
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var active = document.querySelector('.suit-view.active');
            if (active && active.id !== 'view-hub') {
                var id = active.id;
                if (id === 'view-lesson' || id === 'view-activity') showView('topic-detail');
                else showView('hub');
            }
        }
    });
});
