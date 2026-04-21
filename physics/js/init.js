/* ================================================================
   PHYSICS INIT - IB Physics for Project 45
   ================================================================ */
function _escHtml(s) { if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

var TOPIC_MAP = {
    // Hub -> topic folder views
    'topic-a': { view: 'topic-a' },
    'topic-b': { view: 'topic-b' },
    'topic-c': { view: 'topic-c' },
    'topic-d': { view: 'topic-d' },
    'topic-e': { view: 'topic-e' },

    // Topic A: Space, Time and Motion
    'kinematics-1d':  { view: 'activity', init: function() { if(typeof PHYS_KINEMATICS!=='undefined') PHYS_KINEMATICS.load(); } },
    'dynamics':       { view: 'activity', init: function() { if(typeof PHYS_DYNAMICS!=='undefined') PHYS_DYNAMICS.load(); } },
    'energy-power':   { view: 'activity', init: function() { if(typeof PHYS_ENERGY!=='undefined') PHYS_ENERGY.load(); } },

    // Topic B: Particulate Nature of Matter
    'gas-laws':       { view: 'activity', init: function() { if(typeof PHYS_GAS!=='undefined') PHYS_GAS.load(); } },
    'circuits':       { view: 'activity', init: function() { if(typeof PHYS_CIRCUITS!=='undefined') PHYS_CIRCUITS.load(); } },

    // Topic D: Fields
    'grav-fields':    { view: 'activity', init: function() { if(typeof PHYS_GRAV!=='undefined') PHYS_GRAV.load(); } },

    // Utility
    'dashboard': { view: 'dashboard', init: function() { if(typeof showDashboard==='function') showDashboard(); } }
};

var PHYSICS_LESSONS = {};
if(typeof LESSON_PHYS_KINEMATICS!=='undefined') PHYSICS_LESSONS['kinematics-1d']  = LESSON_PHYS_KINEMATICS;
if(typeof LESSON_PHYS_DYNAMICS!=='undefined')   PHYSICS_LESSONS['dynamics']        = LESSON_PHYS_DYNAMICS;
if(typeof LESSON_PHYS_ENERGY!=='undefined')     PHYSICS_LESSONS['energy-power']    = LESSON_PHYS_ENERGY;
if(typeof LESSON_PHYS_GAS!=='undefined')        PHYSICS_LESSONS['gas-laws']        = LESSON_PHYS_GAS;
if(typeof LESSON_PHYS_CIRCUITS!=='undefined')   PHYSICS_LESSONS['circuits']        = LESSON_PHYS_CIRCUITS;
if(typeof LESSON_PHYS_GRAV!=='undefined')       PHYSICS_LESSONS['grav-fields']     = LESSON_PHYS_GRAV;

var CONTINUE_MAP = {
    phkin:   { topic: 'kinematics-1d', name: 'Kinematics' },
    phdyn:   { topic: 'dynamics',      name: 'Forces and Dynamics' },
    phenrg:  { topic: 'energy-power',  name: 'Work, Energy and Power' },
    phgas:   { topic: 'gas-laws',      name: 'Gas Laws' },
    phcirc:  { topic: 'circuits',      name: 'Electric Circuits' },
    phgrav:  { topic: 'grav-fields',   name: 'Gravitational Fields' }
};

var ACTIVITY_PREFIXES = {
    'kinematics-1d':  'phkin',
    'dynamics':       'phdyn',
    'energy-power':   'phenrg',
    'gas-laws':       'phgas',
    'circuits':       'phcirc',
    'grav-fields':    'phgrav'
};

var AVAILABLE_ACTIVITIES = {};
if(typeof PHYS_KINEMATICS!=='undefined') AVAILABLE_ACTIVITIES['kinematics-1d'] = { obj: PHYS_KINEMATICS, parent: 'topic-a' };
if(typeof PHYS_DYNAMICS!=='undefined')   AVAILABLE_ACTIVITIES['dynamics']       = { obj: PHYS_DYNAMICS, parent: 'topic-a' };
if(typeof PHYS_ENERGY!=='undefined')     AVAILABLE_ACTIVITIES['energy-power']   = { obj: PHYS_ENERGY, parent: 'topic-a' };
if(typeof PHYS_GAS!=='undefined')        AVAILABLE_ACTIVITIES['gas-laws']        = { obj: PHYS_GAS, parent: 'topic-b' };
if(typeof PHYS_CIRCUITS!=='undefined')   AVAILABLE_ACTIVITIES['circuits']        = { obj: PHYS_CIRCUITS, parent: 'topic-b' };
if(typeof PHYS_GRAV!=='undefined')       AVAILABLE_ACTIVITIES['grav-fields']     = { obj: PHYS_GRAV, parent: 'topic-d' };

var ACTIVITY_INITS = {};

/* ── Search index ── */
var PHYSICS_SEARCH_INDEX = [
    // Topic A
    { type:'topic',    id:'topic-a',     title:'Topic A: Space, Time and Motion', sub:'Kinematics, dynamics, energy, momentum' },
    { type:'activity', id:'kinematics-1d', title:'Kinematics',            sub:'A.1 - SUVAT equations, free fall, projectile motion', level:'sl' },
    { type:'lesson',   id:'kinematics-1d', title:'Kinematics Lesson',     sub:'A.1 - Motion, SUVAT, projectile', level:'sl' },
    { type:'activity', id:'dynamics',      title:'Forces and Dynamics',   sub:'A.2 - Newton\'s laws, friction, momentum', level:'sl' },
    { type:'lesson',   id:'dynamics',      title:'Forces and Dynamics Lesson', sub:'A.2 - Newton\'s laws, friction', level:'sl' },
    { type:'activity', id:'energy-power',  title:'Work, Energy and Power', sub:'A.3 - KE, GPE, conservation, efficiency', level:'sl' },
    { type:'lesson',   id:'energy-power',  title:'Work, Energy and Power Lesson', sub:'A.3 - Energy conservation', level:'sl' },
    // Topic B
    { type:'topic',    id:'topic-b',     title:'Topic B: Particulate Nature of Matter', sub:'Thermal physics, gas laws, circuits' },
    { type:'activity', id:'gas-laws',    title:'Gas Laws',                sub:'B.3 - Boyle\'s, Charles\'s, ideal gas equation', level:'sl' },
    { type:'lesson',   id:'gas-laws',    title:'Gas Laws Lesson',         sub:'B.3 - Gas laws, pV=nRT', level:'sl' },
    { type:'activity', id:'circuits',    title:'Electric Circuits',       sub:'B.5 - Ohm\'s law, resistance, power', level:'sl' },
    { type:'lesson',   id:'circuits',    title:'Electric Circuits Lesson', sub:'B.5 - Series, parallel, internal resistance', level:'sl' },
    // Topic C
    { type:'topic',    id:'topic-c',     title:'Topic C: Wave Behaviour', sub:'SHM, waves, Doppler effect' },
    // Topic D
    { type:'topic',    id:'topic-d',     title:'Topic D: Fields', sub:'Gravitational, electric, magnetic fields' },
    { type:'activity', id:'grav-fields', title:'Gravitational Fields',    sub:'D.1 - Newton\'s gravitation, orbits, Kepler', level:'sl' },
    { type:'lesson',   id:'grav-fields', title:'Gravitational Fields Lesson', sub:'D.1 - Gravitational force, orbital motion', level:'sl' },
    // Topic E
    { type:'topic',    id:'topic-e',     title:'Topic E: Nuclear and Quantum Physics', sub:'Radioactivity, fission, quantum models' }
];

/* ── Trainer init fns (registered by activities via ACTIVITY_INITS) ── */
var trainerInitFns = {
    'kinematics-1d': function() { if(typeof PHYS_KINEMATICS!=='undefined') PHYS_KINEMATICS.load(); },
    'dynamics':      function() { if(typeof PHYS_DYNAMICS!=='undefined') PHYS_DYNAMICS.load(); },
    'energy-power':  function() { if(typeof PHYS_ENERGY!=='undefined') PHYS_ENERGY.load(); },
    'gas-laws':      function() { if(typeof PHYS_GAS!=='undefined') PHYS_GAS.load(); },
    'circuits':      function() { if(typeof PHYS_CIRCUITS!=='undefined') PHYS_CIRCUITS.load(); },
    'grav-fields':   function() { if(typeof PHYS_GRAV!=='undefined') PHYS_GRAV.load(); }
};

/* ── SubjectBase bootstrap ── */
document.addEventListener('DOMContentLoaded', function() {
    if (typeof SubjectBase === 'undefined') return;
    SubjectBase.init({
        subjectKey:       'physics',
        storagePrefix:    'physics_',
        topicMap:         TOPIC_MAP,
        lessonsMap:       PHYSICS_LESSONS,
        continueMap:      CONTINUE_MAP,
        activityPrefixes: ACTIVITY_PREFIXES,
        availableActivities: AVAILABLE_ACTIVITIES,
        trainerInitFns:   trainerInitFns,
        searchIndex:      PHYSICS_SEARCH_INDEX,
        defaultView:      'hub',
        hubTitle:         'Physics',
        hubSubtitle:      'IB DP Physics - 2023 Curriculum',
        onTopicCard: function(topicId) {
            var entry = TOPIC_MAP[topicId];
            if (!entry) return;
            if (entry.view === 'activity') {
                showView('activity');
                if (entry.init) entry.init();
            } else if (entry.view === 'lesson') {
                var lesson = PHYSICS_LESSONS[topicId];
                if (lesson && typeof startLesson === 'function') startLesson(lesson);
            } else {
                showView(entry.view);
            }
        },
        onLessonBtn: function(lessonId) {
            var lesson = PHYSICS_LESSONS[lessonId];
            if (lesson && typeof startLesson === 'function') startLesson(lesson);
        }
    });
});
