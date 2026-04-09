/*
 * utils.js - Shared math utilities for Project 45 Maths AA
 */

/* Re-render KaTeX in the activity container - call after inserting question HTML */
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
    // Random integer in [min, max]
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Random float in [min, max], rounded to dp decimal places
    randFloat(min, max, dp = 2) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(dp));
    },

    // Pick random element from array
    pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    // Shuffle array (Fisher-Yates)
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    // GCD using Euclidean algorithm
    gcd(a, b) {
        a = Math.abs(a); b = Math.abs(b);
        while (b) { [a, b] = [b, a % b]; }
        return a;
    },

    // LCM
    lcm(a, b) {
        return Math.abs(a * b) / MathUtils.gcd(a, b);
    },

    // Simplify fraction [num, den]
    simplifyFraction(num, den) {
        if (den === 0) return [num, den];
        const g = MathUtils.gcd(num, den);
        const sign = den < 0 ? -1 : 1;
        return [sign * num / g, sign * den / g];
    },

    // Format fraction as LaTeX
    fractionTeX(num, den) {
        if (den === 1) return String(num);
        if (den === -1) return String(-num);
        const [n, d] = MathUtils.simplifyFraction(num, den);
        if (d === 1) return String(n);
        const sign = n < 0 ? '-' : '';
        return `${sign}\\frac{${Math.abs(n)}}{${d}}`;
    },

    // Generate n unique random integers in [min, max]
    uniqueRandInts(n, min, max) {
        const set = new Set();
        while (set.size < n) {
            set.add(MathUtils.randInt(min, max));
        }
        return [...set];
    },

    // Non-zero random integer in [-max, max]
    nonZeroRandInt(min, max) {
        let n;
        do { n = MathUtils.randInt(min, max); } while (n === 0);
        return n;
    },

    // Round to dp decimal places
    round(val, dp = 2) {
        const m = Math.pow(10, dp);
        return Math.round(val * m) / m;
    },

    // Check if two values are approximately equal
    approxEqual(a, b, tol = 0.001) {
        return Math.abs(a - b) < tol;
    },

    // Render KaTeX to an element
    renderKaTeX(el, tex, display = false) {
        if (typeof katex !== 'undefined') {
            katex.render(tex, el, { displayMode: display, throwOnError: false });
        } else {
            el.textContent = tex;
        }
    },

    // Generate MC options: correct answer + 3 distractors
    generateOptions(correct, generateDistractor, count = 4) {
        const opts = [correct];
        let attempts = 0;
        while (opts.length < count && attempts < 50) {
            const d = generateDistractor();
            if (!opts.some(o => MathUtils.approxEqual(o, d))) {
                opts.push(d);
            }
            attempts++;
        }
        // Fill remaining with offset distractors
        while (opts.length < count) {
            opts.push(correct + opts.length * (MathUtils.randInt(0, 1) ? 1 : -1));
        }
        return MathUtils.shuffle(opts);
    },

    // Factorial
    factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    },

    // nCr (binomial coefficient)
    nCr(n, r) {
        if (r < 0 || r > n) return 0;
        if (r === 0 || r === n) return 1;
        r = Math.min(r, n - r);
        let result = 1;
        for (let i = 0; i < r; i++) {
            result = result * (n - i) / (i + 1);
        }
        return Math.round(result);
    },

    // nPr (permutation)
    nPr(n, r) {
        if (r < 0 || r > n) return 0;
        let result = 1;
        for (let i = n; i > n - r; i--) result *= i;
        return result;
    }
};
