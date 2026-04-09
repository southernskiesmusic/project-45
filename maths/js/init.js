/*
 * init.js - Topic map and initialization for Maths AA
 *
 * Maps topic IDs to their view elements and init functions.
 * Activities and lessons will be registered here as they're built.
 */

// Topic map: maps data-topic values to views and init functions
var TOPIC_MAP = {
    // Topic 1: Number & Algebra
    'numbers-rounding':          { view: 'number-algebra', sub: '1.1' },
    'arithmetic-sequences':      { view: 'number-algebra', sub: '1.2-1.3' },
    'geometric-sequences':       { view: 'number-algebra', sub: '1.4' },
    'financial-maths':           { view: 'number-algebra', sub: '1.5' },
    'binomial-theorem':          { view: 'number-algebra', sub: '1.6' },
    'deductive-proof':           { view: 'number-algebra', sub: '1.7' },
    'methods-of-proof':          { view: 'number-algebra', sub: '1.8' },
    'mathematical-induction':    { view: 'number-algebra', sub: '1.9' },
    'systems-of-equations':      { view: 'number-algebra', sub: '1.10' },
    'complex-numbers-cartesian': { view: 'number-algebra', sub: '1.11-1.12' },
    'complex-numbers-polar':     { view: 'number-algebra', sub: '1.13-1.15' },

    // Topic 2: Functions
    'lines':                  { view: 'functions', sub: '2.1' },
    'quadratics':             { view: 'functions', sub: '2.2' },
    'functions-domain-range': { view: 'functions', sub: '2.3' },
    'composition-inverse':    { view: 'functions', sub: '2.4-2.5' },
    'transformations':        { view: 'functions', sub: '2.6' },
    'asymptotes':             { view: 'functions', sub: '2.7' },
    'exponents':              { view: 'functions', sub: '2.8' },
    'logarithms':             { view: 'functions', sub: '2.9' },
    'exponential-equations':  { view: 'functions', sub: '2.10' },
    'polynomials':            { view: 'functions', sub: '2.11-2.12' },
    'rational-functions':     { view: 'functions', sub: '2.13-2.14' },
    'modulus':                { view: 'functions', sub: '2.15' },
    'symmetries':             { view: 'functions', sub: '2.16' },

    // Topic 3: Geometry & Trigonometry
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

    // Topic 4: Statistics & Probability
    'stats-basic':              { view: 'stats-probability', sub: '4.1-4.3' },
    'linear-regression':        { view: 'stats-probability', sub: '4.4' },
    'probability-venn':         { view: 'stats-probability', sub: '4.5-4.7' },
    'probability-trees':        { view: 'stats-probability', sub: '4.8' },
    'discrete-distributions':   { view: 'stats-probability', sub: '4.9' },
    'binomial-distribution':    { view: 'stats-probability', sub: '4.10' },
    'normal-distribution':      { view: 'stats-probability', sub: '4.11' },
    'continuous-distributions': { view: 'stats-probability', sub: '4.12' },
    'counting-probability':     { view: 'stats-probability', sub: '4.13' },

    // Topic 5: Calculus
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
    'maclaurin-series':          { view: 'calculus', sub: '5.23' }
};

// Lesson registry (populated as lessons are created)
var MATHS_LESSONS = {};

// Activity init registry (populated as activities are created)
var ACTIVITY_INITS = {};

// Sub-topic count for stats
var SUBTOPIC_COUNT = Object.keys(TOPIC_MAP).length; // 56 sub-topics
