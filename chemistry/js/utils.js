/* utils.js - Chemistry shared utilities */

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
    randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },
    randFloat(min, max, dp = 2) { return parseFloat((Math.random() * (max - min) + min).toFixed(dp)); },
    pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
    round(val, dp = 2) { const m = Math.pow(10, dp); return Math.round(val * m) / m; },
    approxEqual(a, b, tol = 0.001) { return Math.abs(a - b) < tol; },
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

/* Chemistry constants */
const ChemConst = {
    R:   8.314,       // J mol^-1 K^-1
    NA:  6.022e23,    // mol^-1
    kB:  1.38e-23,    // J K^-1
    F:   96485,       // C mol^-1 (Faraday)
    // Molar masses (g/mol)
    M: { H:1, C:12, N:14, O:16, Na:23, Cl:35.5, Ca:40, Fe:56, Cu:63.5, S:32, Mg:24, Al:27, K:39, P:31, Zn:65 }
};
