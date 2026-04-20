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
    'numbers-rounding':          { view: 'activity', init: function() { if (typeof NUMBERS_ROUNDING !== 'undefined') NUMBERS_ROUNDING.load(); } },
    'arithmetic-sequences':      { view: 'activity', init: function() { if (typeof ARITH_SEQ !== 'undefined') ARITH_SEQ.load(); } },
    'geometric-sequences':       { view: 'activity', init: function() { if (typeof GEO_SEQ !== 'undefined') GEO_SEQ.load(); } },
    'financial-maths':           { view: 'activity', init: function() { if (typeof FIN_MATHS !== 'undefined') FIN_MATHS.load(); } },
    'binomial-theorem':          { view: 'activity', init: function() { if (typeof BINOMIAL !== 'undefined') BINOMIAL.load(); } },
    'deductive-proof':           { view: 'activity', init: function() { if (typeof DEDUCTIVE_PROOF !== 'undefined') DEDUCTIVE_PROOF.load(); } },
    'methods-of-proof':          { view: 'activity', init: function() { if (typeof METHODS_PROOF !== 'undefined') METHODS_PROOF.load(); } },
    'mathematical-induction':    { view: 'activity', init: function() { if (typeof MATH_IND !== 'undefined') MATH_IND.load(); } },
    'systems-of-equations':      { view: 'activity', init: function() { if (typeof SYS_EQ !== 'undefined') SYS_EQ.load(); } },
    'complex-numbers-cartesian': { view: 'activity', init: function() { if (typeof COMPLEX_CART !== 'undefined') COMPLEX_CART.load(); } },
    'complex-numbers-polar':     { view: 'activity', init: function() { if (typeof COMPLEX_POLAR !== 'undefined') COMPLEX_POLAR.load(); } },

    // Topic 2: Functions sub-topics
    'lines':                  { view: 'activity', init: function() { if (typeof LINES !== 'undefined') LINES.load(); } },
    'quadratics':             { view: 'activity', init: function() { if (typeof QUADRATICS !== 'undefined') QUADRATICS.load(); } },
    'functions-domain-range': { view: 'activity', init: function() { if (typeof DOMAIN_RANGE !== 'undefined') DOMAIN_RANGE.load(); } },
    'composition-inverse':    { view: 'activity', init: function() { if (typeof COMP_INV !== 'undefined') COMP_INV.load(); } },
    'transformations':        { view: 'activity', init: function() { if (typeof TRANSFORMATIONS !== 'undefined') TRANSFORMATIONS.load(); } },
    'asymptotes':             { view: 'activity', init: function() { if (typeof ASYMPTOTES !== 'undefined') ASYMPTOTES.load(); } },
    'exponents':              { view: 'activity', init: function() { if (typeof EXPONENTS !== 'undefined') EXPONENTS.load(); } },
    'logarithms':             { view: 'activity', init: function() { if (typeof LOGARITHMS !== 'undefined') LOGARITHMS.load(); } },
    'exponential-equations':  { view: 'activity', init: function() { if (typeof EXP_EQ !== 'undefined') EXP_EQ.load(); } },
    'polynomials':            { view: 'activity', init: function() { if (typeof POLYNOMIALS !== 'undefined') POLYNOMIALS.load(); } },
    'rational-functions':     { view: 'activity', init: function() { if (typeof RATIONAL !== 'undefined') RATIONAL.load(); } },
    'modulus':                { view: 'activity', init: function() { if (typeof MODULUS !== 'undefined') MODULUS.load(); } },
    'symmetries':             { view: 'activity', init: function() { if (typeof SYMMETRIES !== 'undefined') SYMMETRIES.load(); } },

    // Topic 3: Geometry & Trigonometry sub-topics
    '3d-geometry-triangles':   { view: 'activity', init: function() { if (typeof TRIANGLES !== 'undefined') TRIANGLES.load(); } },
    'arcs-sectors':            { view: 'activity', init: function() { if (typeof ARCS_SECTORS !== 'undefined') ARCS_SECTORS.load(); } },
    'unit-circle':             { view: 'activity', init: function() { if (typeof UNIT_CIRCLE !== 'undefined') UNIT_CIRCLE.load(); } },
    'trig-equations':          { view: 'activity', init: function() { if (typeof TRIG_EQ !== 'undefined') TRIG_EQ.load(); } },
    'trig-functions':          { view: 'activity', init: function() { if (typeof TRIG_FUNC !== 'undefined') TRIG_FUNC.load(); } },
    'further-trig-identities': { view: 'activity', init: function() { if (typeof TRIG_ID !== 'undefined') TRIG_ID.load(); } },
    'further-trig-functions':  { view: 'activity', init: function() { if (typeof TRIG_FUNC2 !== 'undefined') TRIG_FUNC2.load(); } },
    'vectors-algebra':         { view: 'activity', init: function() { if (typeof VECTORS !== 'undefined') VECTORS.load(); } },
    'vector-lines':            { view: 'activity', init: function() { if (typeof VEC_LINES !== 'undefined') VEC_LINES.load(); } },
    'vectors-kinematics':      { view: 'activity', init: function() { if (typeof VEC_KINEM !== 'undefined') VEC_KINEM.load(); } },
    'cross-product':           { view: 'activity', init: function() { if (typeof CROSS_PROD !== 'undefined') CROSS_PROD.load(); } },
    'planes':                  { view: 'activity', init: function() { if (typeof PLANES !== 'undefined') PLANES.load(); } },
    'intersections-distances': { view: 'activity', init: function() { if (typeof INT_DIST !== 'undefined') INT_DIST.load(); } },

    // Topic 4: Statistics & Probability sub-topics
    'stats-basic':              { view: 'activity', init: function() { if (typeof STATS_BASIC !== 'undefined') STATS_BASIC.load(); } },
    'linear-regression':        { view: 'activity', init: function() { if (typeof LIN_REG !== 'undefined') LIN_REG.load(); } },
    'probability-venn':         { view: 'activity', init: function() { if (typeof PROB_VENN !== 'undefined') PROB_VENN.load(); } },
    'probability-trees':        { view: 'activity', init: function() { if (typeof PROB_TREES !== 'undefined') PROB_TREES.load(); } },
    'discrete-distributions':   { view: 'activity', init: function() { if (typeof DISCRETE_DIST !== 'undefined') DISCRETE_DIST.load(); } },
    'binomial-distribution':    { view: 'activity', init: function() { if (typeof BINOM_DIST !== 'undefined') BINOM_DIST.load(); } },
    'normal-distribution':      { view: 'activity', init: function() { if (typeof NORMAL_DIST !== 'undefined') NORMAL_DIST.load(); } },
    'continuous-distributions': { view: 'activity', init: function() { if (typeof CONT_DIST !== 'undefined') CONT_DIST.load(); } },
    'counting-probability':     { view: 'activity', init: function() { if (typeof COUNTING !== 'undefined') COUNTING.load(); } },

    // Topic 5: Calculus sub-topics
    'limits':                    { view: 'activity', init: function() { if (typeof LIMITS !== 'undefined') LIMITS.load(); } },
    'derivatives-basic':         { view: 'activity', init: function() { if (typeof DERIVATIVES !== 'undefined') DERIVATIVES.load(); } },
    'chain-rule':                { view: 'activity', init: function() { if (typeof CHAIN_RULE !== 'undefined') CHAIN_RULE.load(); } },
    'tangent-normal':            { view: 'activity', init: function() { if (typeof TANGENT_NORMAL !== 'undefined') TANGENT_NORMAL.load(); } },
    'monotony-concavity':        { view: 'activity', init: function() { if (typeof MONOTONY !== 'undefined') MONOTONY.load(); } },
    'graph-of-f':                { view: 'activity', init: function() { if (typeof GRAPH_F !== 'undefined') GRAPH_F.load(); } },
    'optimisation':              { view: 'activity', init: function() { if (typeof OPTIMISATION !== 'undefined') OPTIMISATION.load(); } },
    'indefinite-integrals':      { view: 'activity', init: function() { if (typeof INDEF_INT !== 'undefined') INDEF_INT.load(); } },
    'definite-integrals':        { view: 'activity', init: function() { if (typeof DEFINITE_INT !== 'undefined') DEFINITE_INT.load(); } },
    'kinematics':                { view: 'activity', init: function() { if (typeof KINEMATICS !== 'undefined') KINEMATICS.load(); } },
    'more-derivatives':          { view: 'activity', init: function() { if (typeof MORE_DERIV !== 'undefined') MORE_DERIV.load(); } },
    'implicit-differentiation':  { view: 'activity', init: function() { if (typeof IMPLICIT !== 'undefined') IMPLICIT.load(); } },
    'related-rates':             { view: 'activity', init: function() { if (typeof REL_RATES !== 'undefined') REL_RATES.load(); } },
    'limits-lhopital':           { view: 'activity', init: function() { if (typeof LHOPITAL !== 'undefined') LHOPITAL.load(); } },
    'more-integrals':            { view: 'activity', init: function() { if (typeof MORE_INT !== 'undefined') MORE_INT.load(); } },
    'integration-by-parts':      { view: 'activity', init: function() { if (typeof INT_PARTS !== 'undefined') INT_PARTS.load(); } },
    'further-areas-volumes':     { view: 'activity', init: function() { if (typeof AREAS_VOL !== 'undefined') AREAS_VOL.load(); } },
    'differential-equations':    { view: 'activity', init: function() { if (typeof DIFF_EQ !== 'undefined') DIFF_EQ.load(); } },
    'maclaurin-series':          { view: 'activity', init: function() { if (typeof MACLAURIN !== 'undefined') MACLAURIN.load(); } },

    // Utility views
    'dashboard': { view: 'dashboard', init: function() { if (typeof showDashboard === 'function') showDashboard(); } }
};

// ── Lessons Map: data-lesson value -> lesson object ──
var MATHS_LESSONS = {};
if (typeof LESSON_NUMBERS_ROUNDING !== 'undefined') MATHS_LESSONS['numbers-rounding'] = LESSON_NUMBERS_ROUNDING;
if (typeof LESSON_DEDUCTIVE_PROOF !== 'undefined') MATHS_LESSONS['deductive-proof'] = LESSON_DEDUCTIVE_PROOF;
if (typeof LESSON_KINEMATICS !== 'undefined') MATHS_LESSONS['kinematics'] = LESSON_KINEMATICS;
if (typeof LESSON_LINES !== 'undefined') MATHS_LESSONS['lines'] = LESSON_LINES;
if (typeof LESSON_ARITH_SEQ !== 'undefined') MATHS_LESSONS['arithmetic-sequences'] = LESSON_ARITH_SEQ;
if (typeof LESSON_GEO_SEQ !== 'undefined') MATHS_LESSONS['geometric-sequences'] = LESSON_GEO_SEQ;
if (typeof LESSON_EXPONENTS !== 'undefined') MATHS_LESSONS['exponents'] = LESSON_EXPONENTS;
if (typeof LESSON_LOGARITHMS !== 'undefined') MATHS_LESSONS['logarithms'] = LESSON_LOGARITHMS;
if (typeof LESSON_BINOMIAL !== 'undefined') MATHS_LESSONS['binomial-theorem'] = LESSON_BINOMIAL;
if (typeof LESSON_QUADRATICS !== 'undefined') MATHS_LESSONS['quadratics'] = LESSON_QUADRATICS;
if (typeof LESSON_FIN_MATHS !== 'undefined') MATHS_LESSONS['financial-maths'] = LESSON_FIN_MATHS;
if (typeof LESSON_DOMAIN_RANGE !== 'undefined') MATHS_LESSONS['domain-range'] = LESSON_DOMAIN_RANGE;
if (typeof LESSON_COMP_INV !== 'undefined') MATHS_LESSONS['composition-inverse'] = LESSON_COMP_INV;
if (typeof LESSON_DERIVATIVES !== 'undefined') MATHS_LESSONS['derivatives-basic'] = LESSON_DERIVATIVES;
if (typeof LESSON_STATS_BASIC !== 'undefined') MATHS_LESSONS['stats-basic'] = LESSON_STATS_BASIC;
if (typeof LESSON_TRIANGLES !== 'undefined') MATHS_LESSONS['3d-geometry-triangles'] = LESSON_TRIANGLES;
if (typeof LESSON_TRANSFORMATIONS !== 'undefined') MATHS_LESSONS['transformations'] = LESSON_TRANSFORMATIONS;
if (typeof LESSON_ASYMPTOTES !== 'undefined') MATHS_LESSONS['asymptotes'] = LESSON_ASYMPTOTES;
if (typeof LESSON_EXP_EQ !== 'undefined') MATHS_LESSONS['exponential-equations'] = LESSON_EXP_EQ;
if (typeof LESSON_ARCS_SECTORS !== 'undefined') MATHS_LESSONS['arcs-sectors'] = LESSON_ARCS_SECTORS;
if (typeof LESSON_UNIT_CIRCLE !== 'undefined') MATHS_LESSONS['unit-circle'] = LESSON_UNIT_CIRCLE;
if (typeof LESSON_TRIG_EQ !== 'undefined') MATHS_LESSONS['trig-equations'] = LESSON_TRIG_EQ;
if (typeof LESSON_PROB_VENN !== 'undefined') MATHS_LESSONS['probability-venn'] = LESSON_PROB_VENN;
if (typeof LESSON_PROB_TREES !== 'undefined') MATHS_LESSONS['probability-trees'] = LESSON_PROB_TREES;
if (typeof LESSON_BINOM_DIST !== 'undefined') MATHS_LESSONS['binomial-distribution'] = LESSON_BINOM_DIST;
if (typeof LESSON_NORMAL_DIST !== 'undefined') MATHS_LESSONS['normal-distribution'] = LESSON_NORMAL_DIST;
if (typeof LESSON_CHAIN_RULE !== 'undefined') MATHS_LESSONS['chain-rule'] = LESSON_CHAIN_RULE;
if (typeof LESSON_TANGENT_NORMAL !== 'undefined') MATHS_LESSONS['tangent-normal'] = LESSON_TANGENT_NORMAL;
if (typeof LESSON_INDEF_INT !== 'undefined') MATHS_LESSONS['indefinite-integrals'] = LESSON_INDEF_INT;
if (typeof LESSON_DEFINITE_INT !== 'undefined') MATHS_LESSONS['definite-integrals'] = LESSON_DEFINITE_INT;
if (typeof LESSON_MONOTONY !== 'undefined') MATHS_LESSONS['monotony-concavity'] = LESSON_MONOTONY;
if (typeof LESSON_OPTIMISATION !== 'undefined') MATHS_LESSONS['optimisation'] = LESSON_OPTIMISATION;
if (typeof LESSON_TRIG_FUNC !== 'undefined') MATHS_LESSONS['trig-functions'] = LESSON_TRIG_FUNC;
if (typeof LESSON_VECTORS !== 'undefined') MATHS_LESSONS['vectors-algebra'] = LESSON_VECTORS;
if (typeof LESSON_LIN_REG !== 'undefined') MATHS_LESSONS['linear-regression'] = LESSON_LIN_REG;
if (typeof LESSON_DISCRETE_DIST !== 'undefined') MATHS_LESSONS['discrete-distributions'] = LESSON_DISCRETE_DIST;
if (typeof LESSON_POLYNOMIALS !== 'undefined') MATHS_LESSONS['polynomials'] = LESSON_POLYNOMIALS;
if (typeof LESSON_TRIG_ID !== 'undefined') MATHS_LESSONS['further-trig-identities'] = LESSON_TRIG_ID;
if (typeof LESSON_VEC_LINES !== 'undefined') MATHS_LESSONS['vector-lines'] = LESSON_VEC_LINES;
if (typeof LESSON_COUNTING !== 'undefined') MATHS_LESSONS['counting-probability'] = LESSON_COUNTING;
if (typeof LESSON_GRAPH_F !== 'undefined') MATHS_LESSONS['graph-of-f'] = LESSON_GRAPH_F;
if (typeof LESSON_AREAS_VOL !== 'undefined') MATHS_LESSONS['further-areas-volumes'] = LESSON_AREAS_VOL;
if (typeof LESSON_DIFF_EQ !== 'undefined') MATHS_LESSONS['differential-equations'] = LESSON_DIFF_EQ;
if (typeof LESSON_MACLAURIN !== 'undefined') MATHS_LESSONS['maclaurin-series'] = LESSON_MACLAURIN;
if (typeof LESSON_RATIONAL !== 'undefined') MATHS_LESSONS['rational-functions'] = LESSON_RATIONAL;
if (typeof LESSON_MODULUS !== 'undefined') MATHS_LESSONS['modulus'] = LESSON_MODULUS;
if (typeof LESSON_TRIG_FUNC2 !== 'undefined') MATHS_LESSONS['further-trig-functions'] = LESSON_TRIG_FUNC2;
if (typeof LESSON_CROSS_PROD !== 'undefined') MATHS_LESSONS['cross-product'] = LESSON_CROSS_PROD;
if (typeof LESSON_CONT_DIST !== 'undefined') MATHS_LESSONS['continuous-distributions'] = LESSON_CONT_DIST;
if (typeof LESSON_MORE_DERIV !== 'undefined') MATHS_LESSONS['more-derivatives'] = LESSON_MORE_DERIV;
if (typeof LESSON_INT_PARTS !== 'undefined') MATHS_LESSONS['integration-by-parts'] = LESSON_INT_PARTS;
if (typeof LESSON_LHOPITAL !== 'undefined') MATHS_LESSONS['limits-lhopital'] = LESSON_LHOPITAL;
if (typeof LESSON_COMPLEX_CART !== 'undefined') MATHS_LESSONS['complex-numbers-cartesian'] = LESSON_COMPLEX_CART;
if (typeof LESSON_COMPLEX_POLAR !== 'undefined') MATHS_LESSONS['complex-numbers-polar'] = LESSON_COMPLEX_POLAR;
if (typeof LESSON_MATH_IND !== 'undefined') MATHS_LESSONS['mathematical-induction'] = LESSON_MATH_IND;
if (typeof LESSON_SYS_EQ !== 'undefined') MATHS_LESSONS['systems-of-equations'] = LESSON_SYS_EQ;
if (typeof LESSON_PLANES !== 'undefined') MATHS_LESSONS['planes'] = LESSON_PLANES;
if (typeof LESSON_IMPLICIT !== 'undefined') MATHS_LESSONS['implicit-differentiation'] = LESSON_IMPLICIT;
if (typeof LESSON_REL_RATES !== 'undefined') MATHS_LESSONS['related-rates'] = LESSON_REL_RATES;
if (typeof LESSON_MORE_INT !== 'undefined') MATHS_LESSONS['more-integrals'] = LESSON_MORE_INT;
if (typeof LESSON_METHODS_PROOF !== 'undefined') MATHS_LESSONS['methods-of-proof'] = LESSON_METHODS_PROOF;
if (typeof LESSON_SYMMETRIES !== 'undefined') MATHS_LESSONS['symmetries'] = LESSON_SYMMETRIES;
if (typeof LESSON_VEC_KINEM !== 'undefined') MATHS_LESSONS['vectors-kinematics'] = LESSON_VEC_KINEM;
if (typeof LESSON_INT_DIST !== 'undefined') MATHS_LESSONS['intersections-distances'] = LESSON_INT_DIST;
if (typeof LESSON_LIMITS !== 'undefined') MATHS_LESSONS['limits'] = LESSON_LIMITS;

// ── Continue prompt map ──
var CONTINUE_MAP = {
    numround:   { topic: 'numbers-rounding',      name: 'Numbers & Rounding' },
    dedproof:   { topic: 'deductive-proof',       name: 'Deductive Proof' },
    kinematics: { topic: 'kinematics',            name: 'Kinematics' },
    lines:      { topic: 'lines',                name: 'Lines' },
    arithseq:   { topic: 'arithmetic-sequences',  name: 'Arithmetic Sequences' },
    geoseq:     { topic: 'geometric-sequences',   name: 'Geometric Sequences' },
    exponents:  { topic: 'exponents',             name: 'Exponents' },
    logarithms:   { topic: 'logarithms',            name: 'Logarithms' },
    binomial:     { topic: 'binomial-theorem',      name: 'Binomial Theorem' },
    quadratics:   { topic: 'quadratics',            name: 'Quadratics' },
    finmaths:     { topic: 'financial-maths',       name: 'Financial Maths' },
    domainrange:  { topic: 'functions-domain-range', name: 'Domain & Range' },
    compinv:      { topic: 'composition-inverse',    name: 'Composition & Inverse' },
    derivatives:  { topic: 'derivatives-basic',      name: 'Basic Differentiation' },
    statsbasic:   { topic: 'stats-basic',            name: 'Basic Statistics' },
    triangles:    { topic: '3d-geometry-triangles',  name: '3D Geometry & Triangles' },
    transform:    { topic: 'transformations',         name: 'Transformations' },
    asymptotes:   { topic: 'asymptotes',              name: 'Asymptotes' },
    expeq:        { topic: 'exponential-equations',   name: 'Exponential Equations' },
    arcssectors:  { topic: 'arcs-sectors',            name: 'Arcs & Sectors' },
    unitcircle:   { topic: 'unit-circle',             name: 'Unit Circle' },
    trigeq:       { topic: 'trig-equations',          name: 'Trig Equations' },
    pvenn:        { topic: 'probability-venn',        name: 'Probability (Venn)' },
    ptrees:       { topic: 'probability-trees',       name: 'Probability Trees' },
    binom:        { topic: 'binomial-distribution',   name: 'Binomial Distribution' },
    normdist:     { topic: 'normal-distribution',     name: 'Normal Distribution' },
    chainrule:    { topic: 'chain-rule',              name: 'Chain Rule' },
    tannorm:      { topic: 'tangent-normal',          name: 'Tangent & Normal' },
    iint:         { topic: 'indefinite-integrals',    name: 'Indefinite Integrals' },
    defint:       { topic: 'definite-integrals',      name: 'Definite Integrals' },
    monotony:     { topic: 'monotony-concavity',      name: 'Monotony & Concavity' },
    optimise:     { topic: 'optimisation',            name: 'Optimisation' },
    trigfunc:     { topic: 'trig-functions',          name: 'Trig Functions' },
    vectors:      { topic: 'vectors-algebra',         name: 'Vector Algebra' },
    linreg:       { topic: 'linear-regression',       name: 'Linear Regression' },
    discdist:     { topic: 'discrete-distributions',  name: 'Discrete Distributions' },
    pol:          { topic: 'polynomials',             name: 'Polynomials' },
    tid:          { topic: 'further-trig-identities', name: 'Further Trig Identities' },
    vl:           { topic: 'vector-lines',            name: 'Vector Lines' },
    cnt:          { topic: 'counting-probability',    name: 'Counting & Probability' },
    grf:          { topic: 'graph-of-f',              name: 'Graph of f from f\'' },
    av:           { topic: 'further-areas-volumes',   name: 'Further Areas & Volumes' },
    deq:          { topic: 'differential-equations',  name: 'Differential Equations' },
    mac:          { topic: 'maclaurin-series',        name: 'Maclaurin Series' },
    rat:          { topic: 'rational-functions',      name: 'Rational Functions' },
    mod:          { topic: 'modulus',                 name: 'Modulus Function' },
    trf2:         { topic: 'further-trig-functions',  name: 'Further Trig Functions' },
    cp:           { topic: 'cross-product',           name: 'Cross Product' },
    cdist:        { topic: 'continuous-distributions', name: 'Continuous Distributions' },
    mderiv:       { topic: 'more-derivatives',        name: 'Further Differentiation' },
    ibp:          { topic: 'integration-by-parts',    name: 'Integration by Parts' },
    lhop:         { topic: 'limits-lhopital',         name: 'Limits & L\'Hôpital' },
    cxyz:         { topic: 'complex-numbers-cartesian', name: 'Complex Numbers (Cartesian)' },
    cxp:          { topic: 'complex-numbers-polar',   name: 'Complex Numbers (Polar)' },
    mathind:      { topic: 'mathematical-induction',  name: 'Mathematical Induction' },
    syseq:        { topic: 'systems-of-equations',    name: 'Systems of Equations' },
    pln:          { topic: 'planes',                  name: 'Equations of Planes' },
    impl:         { topic: 'implicit-differentiation', name: 'Implicit Differentiation' },
    rr:           { topic: 'related-rates',           name: 'Related Rates' },
    mint:         { topic: 'more-integrals',          name: 'Further Integration' },
    mproof:       { topic: 'methods-of-proof',        name: 'Methods of Proof' },
    sym:          { topic: 'symmetries',              name: 'Symmetries' },
    vk:           { topic: 'vectors-kinematics',      name: 'Vectors & Kinematics' },
    intd:         { topic: 'intersections-distances', name: 'Intersections & Distances' },
    lim:          { topic: 'limits',                  name: 'Limits & Continuity' }
};

// ── Pathway config ──
var MATHS_PATHWAYS = [
    { id: 'functions', name: 'Functions', icon: 'f(x)', lessons: ['lines', 'exponents', 'logarithms'], activity: 'lines', activityPrefix: 'lines' },
    { id: 'number-algebra', name: 'Number & Algebra', icon: '#', lessons: ['arithmetic-sequences', 'geometric-sequences', 'binomial-theorem'], activity: 'arithmetic-sequences', activityPrefix: 'arithseq' }
];

// ── Activity prefixes (for stats tracking) ──
var ACTIVITY_PREFIXES = {
    'numbers-rounding': 'numround',
    'deductive-proof':  'dedproof',
    'kinematics':       'kinematics',
    'lines': 'lines',
    'arithmetic-sequences': 'arithseq',
    'geometric-sequences': 'geoseq',
    'exponents': 'exponents',
    'logarithms': 'logarithms',
    'binomial-theorem':        'binomial',
    'quadratics':              'quadratics',
    'financial-maths':         'finmaths',
    'functions-domain-range':  'domainrange',
    'composition-inverse':     'compinv',
    'derivatives-basic':       'derivatives',
    'stats-basic':             'statsbasic',
    '3d-geometry-triangles':   'triangles',
    'transformations':         'transform',
    'asymptotes':              'asymptotes',
    'exponential-equations':   'expeq',
    'arcs-sectors':            'arcssectors',
    'unit-circle':             'unitcircle',
    'trig-equations':          'trigeq',
    'probability-venn':        'pvenn',
    'probability-trees':       'ptrees',
    'binomial-distribution':   'binom',
    'normal-distribution':     'normdist',
    'chain-rule':              'chainrule',
    'tangent-normal':          'tannorm',
    'indefinite-integrals':    'iint',
    'definite-integrals':      'defint',
    'monotony-concavity':      'monotony',
    'optimisation':            'optimise',
    'trig-functions':          'trigfunc',
    'vectors-algebra':         'vectors',
    'linear-regression':       'linreg',
    'discrete-distributions':  'discdist',
    'polynomials':             'pol',
    'further-trig-identities': 'tid',
    'vector-lines':            'vl',
    'counting-probability':    'cnt',
    'graph-of-f':              'grf',
    'further-areas-volumes':   'av',
    'differential-equations':  'deq',
    'maclaurin-series':        'mac',
    'rational-functions':      'rat',
    'modulus':                 'mod',
    'further-trig-functions':  'trf2',
    'cross-product':           'cp',
    'continuous-distributions':'cdist',
    'more-derivatives':        'mderiv',
    'integration-by-parts':    'ibp',
    'limits':                        'lim',
    'limits-lhopital':             'lhop',
    'complex-numbers-cartesian':   'cxyz',
    'complex-numbers-polar':       'cxp',
    'mathematical-induction':      'mathind',
    'systems-of-equations':        'syseq',
    'planes':                      'pln',
    'implicit-differentiation':    'impl',
    'related-rates':               'rr',
    'more-integrals':              'mint',
    'methods-of-proof':            'mproof',
    'symmetries':                  'sym',
    'vectors-kinematics':          'vk',
    'intersections-distances':     'intd'
};

// ── Available activities registry ──
var AVAILABLE_ACTIVITIES = {};
if (typeof NUMBERS_ROUNDING !== 'undefined') AVAILABLE_ACTIVITIES['numbers-rounding'] = { obj: NUMBERS_ROUNDING, parent: 'number-algebra' };
if (typeof DEDUCTIVE_PROOF !== 'undefined')  AVAILABLE_ACTIVITIES['deductive-proof']  = { obj: DEDUCTIVE_PROOF, parent: 'number-algebra' };
if (typeof KINEMATICS !== 'undefined')       AVAILABLE_ACTIVITIES['kinematics']        = { obj: KINEMATICS, parent: 'calculus' };
if (typeof LINES !== 'undefined')      AVAILABLE_ACTIVITIES['lines']                = { obj: LINES, parent: 'functions' };
if (typeof ARITH_SEQ !== 'undefined')  AVAILABLE_ACTIVITIES['arithmetic-sequences'] = { obj: ARITH_SEQ, parent: 'number-algebra' };
if (typeof GEO_SEQ !== 'undefined')    AVAILABLE_ACTIVITIES['geometric-sequences']  = { obj: GEO_SEQ, parent: 'number-algebra' };
if (typeof EXPONENTS !== 'undefined')  AVAILABLE_ACTIVITIES['exponents']            = { obj: EXPONENTS, parent: 'functions' };
if (typeof LOGARITHMS !== 'undefined') AVAILABLE_ACTIVITIES['logarithms']           = { obj: LOGARITHMS, parent: 'functions' };
if (typeof BINOMIAL !== 'undefined')      AVAILABLE_ACTIVITIES['binomial-theorem']      = { obj: BINOMIAL, parent: 'number-algebra' };
if (typeof QUADRATICS !== 'undefined')    AVAILABLE_ACTIVITIES['quadratics']             = { obj: QUADRATICS, parent: 'functions' };
if (typeof FIN_MATHS !== 'undefined')     AVAILABLE_ACTIVITIES['financial-maths']        = { obj: FIN_MATHS, parent: 'number-algebra' };
if (typeof DOMAIN_RANGE !== 'undefined')  AVAILABLE_ACTIVITIES['functions-domain-range'] = { obj: DOMAIN_RANGE, parent: 'functions' };
if (typeof COMP_INV !== 'undefined')      AVAILABLE_ACTIVITIES['composition-inverse']     = { obj: COMP_INV, parent: 'functions' };
if (typeof DERIVATIVES !== 'undefined')   AVAILABLE_ACTIVITIES['derivatives-basic']       = { obj: DERIVATIVES, parent: 'calculus' };
if (typeof STATS_BASIC !== 'undefined')   AVAILABLE_ACTIVITIES['stats-basic']             = { obj: STATS_BASIC, parent: 'stats-probability' };
if (typeof TRIANGLES !== 'undefined')       AVAILABLE_ACTIVITIES['3d-geometry-triangles']   = { obj: TRIANGLES, parent: 'geometry-trig' };
if (typeof TRANSFORMATIONS !== 'undefined') AVAILABLE_ACTIVITIES['transformations']          = { obj: TRANSFORMATIONS, parent: 'functions' };
if (typeof ASYMPTOTES !== 'undefined')      AVAILABLE_ACTIVITIES['asymptotes']               = { obj: ASYMPTOTES, parent: 'functions' };
if (typeof EXP_EQ !== 'undefined')          AVAILABLE_ACTIVITIES['exponential-equations']    = { obj: EXP_EQ, parent: 'functions' };
if (typeof ARCS_SECTORS !== 'undefined')    AVAILABLE_ACTIVITIES['arcs-sectors']             = { obj: ARCS_SECTORS, parent: 'geometry-trig' };
if (typeof UNIT_CIRCLE !== 'undefined')     AVAILABLE_ACTIVITIES['unit-circle']              = { obj: UNIT_CIRCLE, parent: 'geometry-trig' };
if (typeof TRIG_EQ !== 'undefined')         AVAILABLE_ACTIVITIES['trig-equations']           = { obj: TRIG_EQ, parent: 'geometry-trig' };
if (typeof PROB_VENN !== 'undefined')       AVAILABLE_ACTIVITIES['probability-venn']         = { obj: PROB_VENN, parent: 'stats-probability' };
if (typeof PROB_TREES !== 'undefined')      AVAILABLE_ACTIVITIES['probability-trees']        = { obj: PROB_TREES, parent: 'stats-probability' };
if (typeof BINOM_DIST !== 'undefined')      AVAILABLE_ACTIVITIES['binomial-distribution']    = { obj: BINOM_DIST, parent: 'stats-probability' };
if (typeof NORMAL_DIST !== 'undefined')     AVAILABLE_ACTIVITIES['normal-distribution']      = { obj: NORMAL_DIST, parent: 'stats-probability' };
if (typeof CHAIN_RULE !== 'undefined')      AVAILABLE_ACTIVITIES['chain-rule']               = { obj: CHAIN_RULE, parent: 'calculus' };
if (typeof TANGENT_NORMAL !== 'undefined')  AVAILABLE_ACTIVITIES['tangent-normal']           = { obj: TANGENT_NORMAL, parent: 'calculus' };
if (typeof INDEF_INT !== 'undefined')        AVAILABLE_ACTIVITIES['indefinite-integrals']    = { obj: INDEF_INT, parent: 'calculus' };
if (typeof DEFINITE_INT !== 'undefined')    AVAILABLE_ACTIVITIES['definite-integrals']      = { obj: DEFINITE_INT, parent: 'calculus' };
if (typeof MONOTONY !== 'undefined')        AVAILABLE_ACTIVITIES['monotony-concavity']      = { obj: MONOTONY, parent: 'calculus' };
if (typeof OPTIMISATION !== 'undefined')    AVAILABLE_ACTIVITIES['optimisation']            = { obj: OPTIMISATION, parent: 'calculus' };
if (typeof TRIG_FUNC !== 'undefined')       AVAILABLE_ACTIVITIES['trig-functions']          = { obj: TRIG_FUNC, parent: 'geometry-trig' };
if (typeof VECTORS !== 'undefined')         AVAILABLE_ACTIVITIES['vectors-algebra']         = { obj: VECTORS, parent: 'geometry-trig' };
if (typeof LIN_REG !== 'undefined')         AVAILABLE_ACTIVITIES['linear-regression']       = { obj: LIN_REG, parent: 'stats-probability' };
if (typeof DISCRETE_DIST !== 'undefined')   AVAILABLE_ACTIVITIES['discrete-distributions']  = { obj: DISCRETE_DIST, parent: 'stats-probability' };
if (typeof POLYNOMIALS !== 'undefined')     AVAILABLE_ACTIVITIES['polynomials']              = { obj: POLYNOMIALS, parent: 'functions' };
if (typeof TRIG_ID !== 'undefined')         AVAILABLE_ACTIVITIES['further-trig-identities']  = { obj: TRIG_ID, parent: 'geometry-trig' };
if (typeof VEC_LINES !== 'undefined')       AVAILABLE_ACTIVITIES['vector-lines']             = { obj: VEC_LINES, parent: 'geometry-trig' };
if (typeof COUNTING !== 'undefined')        AVAILABLE_ACTIVITIES['counting-probability']      = { obj: COUNTING, parent: 'stats-probability' };
if (typeof GRAPH_F !== 'undefined')         AVAILABLE_ACTIVITIES['graph-of-f']               = { obj: GRAPH_F, parent: 'calculus' };
if (typeof AREAS_VOL !== 'undefined')       AVAILABLE_ACTIVITIES['further-areas-volumes']    = { obj: AREAS_VOL, parent: 'calculus' };
if (typeof DIFF_EQ !== 'undefined')         AVAILABLE_ACTIVITIES['differential-equations']   = { obj: DIFF_EQ, parent: 'calculus' };
if (typeof MACLAURIN !== 'undefined')       AVAILABLE_ACTIVITIES['maclaurin-series']         = { obj: MACLAURIN, parent: 'calculus' };
if (typeof RATIONAL !== 'undefined')        AVAILABLE_ACTIVITIES['rational-functions']       = { obj: RATIONAL, parent: 'functions' };
if (typeof MODULUS !== 'undefined')         AVAILABLE_ACTIVITIES['modulus']                  = { obj: MODULUS, parent: 'functions' };
if (typeof TRIG_FUNC2 !== 'undefined')      AVAILABLE_ACTIVITIES['further-trig-functions']   = { obj: TRIG_FUNC2, parent: 'geometry-trig' };
if (typeof CROSS_PROD !== 'undefined')      AVAILABLE_ACTIVITIES['cross-product']            = { obj: CROSS_PROD, parent: 'geometry-trig' };
if (typeof CONT_DIST !== 'undefined')       AVAILABLE_ACTIVITIES['continuous-distributions'] = { obj: CONT_DIST, parent: 'stats-probability' };
if (typeof MORE_DERIV !== 'undefined')      AVAILABLE_ACTIVITIES['more-derivatives']         = { obj: MORE_DERIV, parent: 'calculus' };
if (typeof INT_PARTS !== 'undefined')       AVAILABLE_ACTIVITIES['integration-by-parts']     = { obj: INT_PARTS, parent: 'calculus' };
if (typeof LIMITS !== 'undefined')          AVAILABLE_ACTIVITIES['limits']                   = { obj: LIMITS, parent: 'calculus' };
if (typeof LHOPITAL !== 'undefined')        AVAILABLE_ACTIVITIES['limits-lhopital']          = { obj: LHOPITAL, parent: 'calculus' };
if (typeof COMPLEX_CART !== 'undefined')    AVAILABLE_ACTIVITIES['complex-numbers-cartesian'] = { obj: COMPLEX_CART, parent: 'number-algebra' };
if (typeof COMPLEX_POLAR !== 'undefined')   AVAILABLE_ACTIVITIES['complex-numbers-polar']     = { obj: COMPLEX_POLAR, parent: 'number-algebra' };
if (typeof MATH_IND !== 'undefined')        AVAILABLE_ACTIVITIES['mathematical-induction']    = { obj: MATH_IND, parent: 'number-algebra' };
if (typeof SYS_EQ !== 'undefined')          AVAILABLE_ACTIVITIES['systems-of-equations']      = { obj: SYS_EQ, parent: 'number-algebra' };
if (typeof PLANES !== 'undefined')          AVAILABLE_ACTIVITIES['planes']                    = { obj: PLANES, parent: 'geometry-trig' };
if (typeof IMPLICIT !== 'undefined')        AVAILABLE_ACTIVITIES['implicit-differentiation']  = { obj: IMPLICIT, parent: 'calculus' };
if (typeof REL_RATES !== 'undefined')       AVAILABLE_ACTIVITIES['related-rates']             = { obj: REL_RATES, parent: 'calculus' };
if (typeof MORE_INT !== 'undefined')        AVAILABLE_ACTIVITIES['more-integrals']            = { obj: MORE_INT, parent: 'calculus' };
if (typeof METHODS_PROOF !== 'undefined')  AVAILABLE_ACTIVITIES['methods-of-proof']          = { obj: METHODS_PROOF, parent: 'number-algebra' };
if (typeof SYMMETRIES !== 'undefined')     AVAILABLE_ACTIVITIES['symmetries']                = { obj: SYMMETRIES, parent: 'functions' };
if (typeof VEC_KINEM !== 'undefined')      AVAILABLE_ACTIVITIES['vectors-kinematics']        = { obj: VEC_KINEM, parent: 'geometry-trig' };
if (typeof INT_DIST !== 'undefined')       AVAILABLE_ACTIVITIES['intersections-distances']   = { obj: INT_DIST, parent: 'geometry-trig' };

// ── Trainer inits ──
var trainerInitFns = [];
if (typeof NUMBERS_ROUNDING !== 'undefined' && NUMBERS_ROUNDING.init) trainerInitFns.push(function() { NUMBERS_ROUNDING.init(); });
if (typeof DEDUCTIVE_PROOF !== 'undefined' && DEDUCTIVE_PROOF.init)   trainerInitFns.push(function() { DEDUCTIVE_PROOF.init(); });
if (typeof KINEMATICS !== 'undefined' && KINEMATICS.init)             trainerInitFns.push(function() { KINEMATICS.init(); });
if (typeof LINES !== 'undefined' && LINES.init)      trainerInitFns.push(function() { LINES.init(); });
if (typeof ARITH_SEQ !== 'undefined' && ARITH_SEQ.init)  trainerInitFns.push(function() { ARITH_SEQ.init(); });
if (typeof GEO_SEQ !== 'undefined' && GEO_SEQ.init)    trainerInitFns.push(function() { GEO_SEQ.init(); });
if (typeof EXPONENTS !== 'undefined' && EXPONENTS.init)  trainerInitFns.push(function() { EXPONENTS.init(); });
if (typeof LOGARITHMS !== 'undefined' && LOGARITHMS.init) trainerInitFns.push(function() { LOGARITHMS.init(); });
if (typeof BINOMIAL !== 'undefined' && BINOMIAL.init)       trainerInitFns.push(function() { BINOMIAL.init(); });
if (typeof QUADRATICS !== 'undefined' && QUADRATICS.init)   trainerInitFns.push(function() { QUADRATICS.init(); });
if (typeof FIN_MATHS !== 'undefined' && FIN_MATHS.init)     trainerInitFns.push(function() { FIN_MATHS.init(); });
if (typeof DOMAIN_RANGE !== 'undefined' && DOMAIN_RANGE.init) trainerInitFns.push(function() { DOMAIN_RANGE.init(); });
if (typeof COMP_INV !== 'undefined' && COMP_INV.init)         trainerInitFns.push(function() { COMP_INV.init(); });
if (typeof DERIVATIVES !== 'undefined' && DERIVATIVES.init)   trainerInitFns.push(function() { DERIVATIVES.init(); });
if (typeof STATS_BASIC !== 'undefined' && STATS_BASIC.init)   trainerInitFns.push(function() { STATS_BASIC.init(); });
if (typeof TRIANGLES !== 'undefined' && TRIANGLES.init)           trainerInitFns.push(function() { TRIANGLES.init(); });
if (typeof TRANSFORMATIONS !== 'undefined' && TRANSFORMATIONS.init) trainerInitFns.push(function() { TRANSFORMATIONS.init(); });
if (typeof ASYMPTOTES !== 'undefined' && ASYMPTOTES.init)         trainerInitFns.push(function() { ASYMPTOTES.init(); });
if (typeof EXP_EQ !== 'undefined' && EXP_EQ.init)                trainerInitFns.push(function() { EXP_EQ.init(); });
if (typeof ARCS_SECTORS !== 'undefined' && ARCS_SECTORS.init)    trainerInitFns.push(function() { ARCS_SECTORS.init(); });
if (typeof UNIT_CIRCLE !== 'undefined' && UNIT_CIRCLE.init)      trainerInitFns.push(function() { UNIT_CIRCLE.init(); });
if (typeof TRIG_EQ !== 'undefined' && TRIG_EQ.init)              trainerInitFns.push(function() { TRIG_EQ.init(); });
if (typeof PROB_VENN !== 'undefined' && PROB_VENN.init)          trainerInitFns.push(function() { PROB_VENN.init(); });
if (typeof PROB_TREES !== 'undefined' && PROB_TREES.init)        trainerInitFns.push(function() { PROB_TREES.init(); });
if (typeof BINOM_DIST !== 'undefined' && BINOM_DIST.init)        trainerInitFns.push(function() { BINOM_DIST.init(); });
if (typeof NORMAL_DIST !== 'undefined' && NORMAL_DIST.init)      trainerInitFns.push(function() { NORMAL_DIST.init(); });
if (typeof CHAIN_RULE !== 'undefined' && CHAIN_RULE.init)        trainerInitFns.push(function() { CHAIN_RULE.init(); });
if (typeof TANGENT_NORMAL !== 'undefined' && TANGENT_NORMAL.init) trainerInitFns.push(function() { TANGENT_NORMAL.init(); });
if (typeof INDEF_INT !== 'undefined' && INDEF_INT.init)           trainerInitFns.push(function() { INDEF_INT.init(); });
if (typeof DEFINITE_INT !== 'undefined' && DEFINITE_INT.init)    trainerInitFns.push(function() { DEFINITE_INT.init(); });
if (typeof MONOTONY !== 'undefined' && MONOTONY.init)            trainerInitFns.push(function() { MONOTONY.init(); });
if (typeof OPTIMISATION !== 'undefined' && OPTIMISATION.init)    trainerInitFns.push(function() { OPTIMISATION.init(); });
if (typeof TRIG_FUNC !== 'undefined' && TRIG_FUNC.init)          trainerInitFns.push(function() { TRIG_FUNC.init(); });
if (typeof VECTORS !== 'undefined' && VECTORS.init)              trainerInitFns.push(function() { VECTORS.init(); });
if (typeof LIN_REG !== 'undefined' && LIN_REG.init)              trainerInitFns.push(function() { LIN_REG.init(); });
if (typeof DISCRETE_DIST !== 'undefined' && DISCRETE_DIST.init)  trainerInitFns.push(function() { DISCRETE_DIST.init(); });
if (typeof POLYNOMIALS !== 'undefined' && POLYNOMIALS.init)      trainerInitFns.push(function() { POLYNOMIALS.init(); });
if (typeof TRIG_ID !== 'undefined' && TRIG_ID.init)              trainerInitFns.push(function() { TRIG_ID.init(); });
if (typeof VEC_LINES !== 'undefined' && VEC_LINES.init)          trainerInitFns.push(function() { VEC_LINES.init(); });
if (typeof COUNTING !== 'undefined' && COUNTING.init)            trainerInitFns.push(function() { COUNTING.init(); });
if (typeof GRAPH_F !== 'undefined' && GRAPH_F.init)              trainerInitFns.push(function() { GRAPH_F.init(); });
if (typeof AREAS_VOL !== 'undefined' && AREAS_VOL.init)          trainerInitFns.push(function() { AREAS_VOL.init(); });
if (typeof DIFF_EQ !== 'undefined' && DIFF_EQ.init)              trainerInitFns.push(function() { DIFF_EQ.init(); });
if (typeof MACLAURIN !== 'undefined' && MACLAURIN.init)          trainerInitFns.push(function() { MACLAURIN.init(); });
if (typeof RATIONAL !== 'undefined' && RATIONAL.init)            trainerInitFns.push(function() { RATIONAL.init(); });
if (typeof MODULUS !== 'undefined' && MODULUS.init)              trainerInitFns.push(function() { MODULUS.init(); });
if (typeof TRIG_FUNC2 !== 'undefined' && TRIG_FUNC2.init)        trainerInitFns.push(function() { TRIG_FUNC2.init(); });
if (typeof CROSS_PROD !== 'undefined' && CROSS_PROD.init)        trainerInitFns.push(function() { CROSS_PROD.init(); });
if (typeof CONT_DIST !== 'undefined' && CONT_DIST.init)          trainerInitFns.push(function() { CONT_DIST.init(); });
if (typeof MORE_DERIV !== 'undefined' && MORE_DERIV.init)        trainerInitFns.push(function() { MORE_DERIV.init(); });
if (typeof INT_PARTS !== 'undefined' && INT_PARTS.init)          trainerInitFns.push(function() { INT_PARTS.init(); });
if (typeof LIMITS !== 'undefined' && LIMITS.init)                trainerInitFns.push(function() { LIMITS.init(); });
if (typeof LHOPITAL !== 'undefined' && LHOPITAL.init)            trainerInitFns.push(function() { LHOPITAL.init(); });
if (typeof COMPLEX_CART !== 'undefined' && COMPLEX_CART.init)    trainerInitFns.push(function() { COMPLEX_CART.init(); });
if (typeof COMPLEX_POLAR !== 'undefined' && COMPLEX_POLAR.init)  trainerInitFns.push(function() { COMPLEX_POLAR.init(); });
if (typeof MATH_IND !== 'undefined' && MATH_IND.init)            trainerInitFns.push(function() { MATH_IND.init(); });
if (typeof SYS_EQ !== 'undefined' && SYS_EQ.init)                trainerInitFns.push(function() { SYS_EQ.init(); });
if (typeof PLANES !== 'undefined' && PLANES.init)                trainerInitFns.push(function() { PLANES.init(); });
if (typeof IMPLICIT !== 'undefined' && IMPLICIT.init)            trainerInitFns.push(function() { IMPLICIT.init(); });
if (typeof REL_RATES !== 'undefined' && REL_RATES.init)          trainerInitFns.push(function() { REL_RATES.init(); });
if (typeof MORE_INT !== 'undefined' && MORE_INT.init)            trainerInitFns.push(function() { MORE_INT.init(); });
if (typeof METHODS_PROOF !== 'undefined' && METHODS_PROOF.init) trainerInitFns.push(function() { METHODS_PROOF.init(); });
if (typeof SYMMETRIES !== 'undefined' && SYMMETRIES.init)       trainerInitFns.push(function() { SYMMETRIES.init(); });
if (typeof VEC_KINEM !== 'undefined' && VEC_KINEM.init)         trainerInitFns.push(function() { VEC_KINEM.init(); });
if (typeof INT_DIST !== 'undefined' && INT_DIST.init)           trainerInitFns.push(function() { INT_DIST.init(); });

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
            card.style.opacity = '0.6';
            card.style.cursor = 'default';
            card.title = 'Coming soon';
        }
    });

    // ── Wire up lesson buttons inside topic cards ──
    document.querySelectorAll('[data-lesson]').forEach(function(btn) {
        var lessonId = btn.getAttribute('data-lesson');
        var lessonObj = MATHS_LESSONS[lessonId];
        if (lessonObj && typeof LessonEngine !== 'undefined') {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Don't trigger parent card's trainer
                showView('lesson');
                LessonEngine.start(lessonObj);
            });
        } else {
            btn.style.opacity = '0.5';
            btn.style.cursor = 'default';
            btn.title = 'Lesson coming soon';
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
