/* Maths AA - subject-specific auth config (loaded before auth-base.js) */
var STORAGE_PREFIX = 'maths_';
var AUTH_CONFIG = {
    cloudKey: 'maths',
    leaderboardSubject: 'maths',
    allLessons: [
        'lines', 'quadratics', 'domain-range', 'composition-inverse',
        'transformations', 'asymptotes', 'exponents', 'logarithms',
        'exponential-equations',
        'numbers-rounding', 'arithmetic-sequences', 'geometric-sequences',
        'financial-maths', 'binomial-theorem', 'deductive-proof',
        'triangles', 'arcs-sectors', 'unit-circle', 'trig-equations',
        'trig-functions', 'vectors-basics',
        'stats-basics', 'linear-regression', 'probability-venn',
        'probability-trees', 'binomial-distribution', 'normal-distribution',
        'limits-intro', 'derivatives-basic', 'chain-rule', 'tangent-normal',
        'monotony-concavity', 'optimisation', 'indefinite-integrals',
        'definite-integrals', 'kinematics'
    ],
    extraLocalKeys: [],
    onAuthReady: function() {
        // Refresh UI after cloud data loads
        if (typeof updateDashboard === 'function') updateDashboard();
    }
};
