/* utils.js - Biology shared utilities */

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
    approxEqual(a, b, tol = 0.001) { return Math.abs(a - b) < tol; }
};
