/*
 * utils.js - Shared utilities for Project 45 Physics
 */

function renderActivityKaTeX() {
    if (typeof renderMathInElement === 'function') {
        var container = document.getElementById('activity-container');
        if (container) {
            renderMathInElement(container, {
                delimiters: [
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true },
                    { left: '$$', right: '$$', display: true }
                ],
                throwOnError: false
            });
        }
    }
}

const MathUtils = {
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randFloat(min, max, dp = 2) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(dp));
    },
    pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
    nonZeroRandInt(min, max) {
        let n;
        do { n = MathUtils.randInt(min, max); } while (n === 0);
        return n;
    },
    round(val, dp = 2) {
        const m = Math.pow(10, dp);
        return Math.round(val * m) / m;
    },
    approxEqual(a, b, tol = 0.001) {
        return Math.abs(a - b) < tol;
    },
    generateOptions(correct, generateDistractor, count = 4) {
        const opts = [correct];
        let attempts = 0;
        while (opts.length < count && attempts < 50) {
            const d = generateDistractor();
            if (!opts.some(o => MathUtils.approxEqual(o, d))) opts.push(d);
            attempts++;
        }
        while (opts.length < count) opts.push(correct + opts.length * (MathUtils.randInt(0, 1) ? 1 : -1));
        return MathUtils.shuffle(opts);
    }
};

/* Physics constants */
const PhysConst = {
    g:      9.81,         // m/s^2
    G:      6.674e-11,    // N m^2 kg^-2
    R:      8.31,         // J mol^-1 K^-1
    kB:     1.38e-23,     // J K^-1
    c:      3e8,          // m/s
    NA:     6.022e23,     // mol^-1
    M_E:    5.97e24,      // kg (Earth)
    R_E:    6.371e6,      // m  (Earth radius)
    e:      1.6e-19,      // C  (elementary charge)
    m_p:    1.673e-27,    // kg (proton mass)
    m_e:    9.109e-31     // kg (electron mass)
};
