/*
 * binomial-distribution.js - IB Math AA 4.10: Binomial Distribution
 * X ~ B(n, p) probabilities, mean, variance, mode and parameters
 */

const BINOM_DIST = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    binomCoeff(n, k) {
        if (k < 0 || k > n) return 0;
        if (k === 0 || k === n) return 1;
        let c = 1;
        for (let i = 0; i < Math.min(k, n - k); i++) {
            c = c * (n - i) / (i + 1);
        }
        return Math.round(c);
    },

    binomPDF(n, p, k) {
        return this.binomCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    },

    binomCDF(n, p, k) {
        let sum = 0;
        for (let i = 0; i <= k; i++) sum += this.binomPDF(n, p, i);
        return sum;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qProbExact - Easy (Free)
     * X ~ B(n, p). Find P(X = k).
     */
    qProbExact() {
        const ns = [4, 5, 6, 8, 10];
        const ps = [0.2, 0.25, 0.3, 0.4, 0.5];
        const n = MathUtils.pick(ns);
        const p = MathUtils.pick(ps);
        const k = MathUtils.randInt(0, n);

        const answer = Math.round(BINOM_DIST.binomPDF(n, p, k) * 10000) / 10000;
        const answerTex = answer.toFixed(4);
        const coeff = BINOM_DIST.binomCoeff(n, k);
        const pStr = p.toString();
        const qStr = (1 - p).toString();

        return {
            type: 'free',
            rule: 'Exact Probability',
            difficulty: 'easy',
            text: `Given \\(X \\sim B(${n},\\,${pStr})\\), find \\(P(X = ${k})\\). Give your answer to 4 decimal places.`,
            latex: `\\(P(X = ${k}) = \\binom{${n}}{${k}} (${pStr})^{${k}} (${qStr})^{${n - k}}\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P(X = k) = \\binom{n}{k}\\, p^k (1-p)^{n-k}`,
                `P(X = ${k}) = \\binom{${n}}{${k}} (${pStr})^{${k}} (${qStr})^{${n - k}} = ${coeff} \\times ${pStr}^{${k}} \\times ${qStr}^{${n - k}}`
            ],
            explain: `<strong>Step 1:</strong> Use the binomial probability formula \\(P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(n = ${n}\\), \\(p = ${pStr}\\), \\(k = ${k}\\):<br>` +
                     `\\(P(X = ${k}) = \\binom{${n}}{${k}} (${pStr})^{${k}} (${qStr})^{${n - k}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(${coeff} \\times ${Math.pow(p, k).toFixed(6)} \\times ${Math.pow(1 - p, n - k).toFixed(6)} = ${answerTex}\\).`
        };
    },

    /**
     * 2. qMeanBinomial - Easy (Free)
     * E(X) = np. Find the mean.
     */
    qMeanBinomial() {
        // Pick n and p so the mean is clean (integer or 1 dp)
        const pairs = [
            [5, 0.2], [10, 0.3], [20, 0.4], [8, 0.5], [10, 0.5],
            [12, 0.25], [16, 0.25], [6, 0.5], [20, 0.25], [4, 0.5],
            [10, 0.2], [20, 0.3], [5, 0.4], [8, 0.25]
        ];
        const [n, p] = MathUtils.pick(pairs);
        const mean = n * p;
        const answerTex = Number.isInteger(mean) ? String(mean) : mean.toFixed(1);

        return {
            type: 'free',
            rule: 'Mean',
            difficulty: 'easy',
            text: `Given \\(X \\sim B(${n},\\,${p})\\), find the expected value \\(E(X)\\).`,
            latex: `\\(E(X) = np\\)`,
            answer: mean,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `E(X) = np`,
                `E(X) = ${n} \\times ${p} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> For \\(X \\sim B(n, p)\\), the mean (expected value) is \\(E(X) = np\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(E(X) = ${n} \\times ${p}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(E(X) = ${answerTex}\\).`
        };
    },

    /**
     * 3. qVarianceBinomial - Easy (Free)
     * Var(X) = np(1-p). Find the variance.
     */
    qVarianceBinomial() {
        const ns = [5, 8, 10, 12, 15, 20];
        const ps = [0.2, 0.25, 0.3, 0.4, 0.5];
        const n = MathUtils.pick(ns);
        const p = MathUtils.pick(ps);
        const variance = n * p * (1 - p);
        const answer = Math.round(variance * 100) / 100;
        const answerTex = answer.toFixed(2);

        return {
            type: 'free',
            rule: 'Variance',
            difficulty: 'easy',
            text: `Given \\(X \\sim B(${n},\\,${p})\\), find the variance \\(\\text{Var}(X)\\). Give your answer to 2 decimal places.`,
            latex: `\\(\\text{Var}(X) = np(1-p)\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Var}(X) = np(1-p)`,
                `\\text{Var}(X) = ${n} \\times ${p} \\times ${1 - p} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> For \\(X \\sim B(n, p)\\), the variance is \\(\\text{Var}(X) = np(1-p)\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\text{Var}(X) = ${n} \\times ${p} \\times (1 - ${p}) = ${n} \\times ${p} \\times ${1 - p}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\text{Var}(X) = ${answerTex}\\).`
        };
    },

    /**
     * 4. qProbAtMost - Medium (Free)
     * P(X ≤ k) = CDF(n, p, k). Find the cumulative probability.
     */
    qProbAtMost() {
        const ns = [4, 5, 6, 8, 10];
        const ps = [0.2, 0.25, 0.3, 0.4, 0.5];
        const n = MathUtils.pick(ns);
        const p = MathUtils.pick(ps);
        const k = MathUtils.randInt(0, 2);

        const answer = Math.round(BINOM_DIST.binomCDF(n, p, k) * 10000) / 10000;
        const answerTex = answer.toFixed(4);

        // Build expansion string for explain
        let expansionParts = [];
        for (let i = 0; i <= k; i++) {
            expansionParts.push(`P(X=${i})`);
        }
        const expansionStr = expansionParts.join(' + ');

        let calcParts = [];
        for (let i = 0; i <= k; i++) {
            const val = Math.round(BINOM_DIST.binomPDF(n, p, i) * 10000) / 10000;
            calcParts.push(val.toFixed(4));
        }
        const calcStr = calcParts.join(' + ');

        return {
            type: 'free',
            rule: 'Cumulative Probability',
            difficulty: 'medium',
            text: `Given \\(X \\sim B(${n},\\,${p})\\), find \\(P(X \\leq ${k})\\). Give your answer to 4 decimal places.`,
            latex: `\\(P(X \\leq ${k}) = \\sum_{i=0}^{${k}} P(X = i)\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P(X \\leq ${k}) = ${expansionStr}`,
                `= ${calcStr} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> \\(P(X \\leq ${k})\\) is the sum of individual probabilities from \\(X = 0\\) to \\(X = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(P(X \\leq ${k}) = ${expansionStr}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate each term and sum: \\(${calcStr} = ${answerTex}\\).`
        };
    },

    /**
     * 5. qProbAtLeast - Medium (Free)
     * P(X ≥ k) = 1 - P(X ≤ k-1).
     */
    qProbAtLeast() {
        const ns = [5, 6, 8, 10];
        const ps = [0.2, 0.25, 0.3, 0.4, 0.5];
        const n = MathUtils.pick(ns);
        const p = MathUtils.pick(ps);
        const k = MathUtils.randInt(1, Math.min(n, 4));

        const cdfBelow = Math.round(BINOM_DIST.binomCDF(n, p, k - 1) * 10000) / 10000;
        const answer = Math.round((1 - cdfBelow) * 10000) / 10000;
        const answerTex = answer.toFixed(4);
        const cdfTex = cdfBelow.toFixed(4);

        return {
            type: 'free',
            rule: 'Complementary Probability',
            difficulty: 'medium',
            text: `Given \\(X \\sim B(${n},\\,${p})\\), find \\(P(X \\geq ${k})\\). Give your answer to 4 decimal places.`,
            latex: `\\(P(X \\geq ${k}) = 1 - P(X \\leq ${k - 1})\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P(X \\geq ${k}) = 1 - P(X \\leq ${k - 1})`,
                `P(X \\leq ${k - 1}) = ${cdfTex}, \\quad P(X \\geq ${k}) = 1 - ${cdfTex} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the complement rule: \\(P(X \\geq ${k}) = 1 - P(X \\leq ${k - 1})\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate \\(P(X \\leq ${k - 1})\\) using the binomial CDF with \\(n = ${n}\\), \\(p = ${p}\\):<br>` +
                     `\\(P(X \\leq ${k - 1}) = ${cdfTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(X \\geq ${k}) = 1 - ${cdfTex} = ${answerTex}\\).`
        };
    },

    /**
     * 6. qProbBetween - Hard (Free)
     * P(a ≤ X ≤ b) = CDF(n,p,b) - CDF(n,p,a-1).
     */
    qProbBetween() {
        const ns = [6, 8, 10];
        const ps = [0.2, 0.25, 0.3, 0.4, 0.5];
        const n = MathUtils.pick(ns);
        const p = MathUtils.pick(ps);

        // Pick a and b so the interval is meaningful (width 2–4)
        const a = MathUtils.randInt(1, Math.floor(n / 2));
        const b = a + MathUtils.randInt(1, 3);
        const bSafe = Math.min(b, n);

        const cdfB = Math.round(BINOM_DIST.binomCDF(n, p, bSafe) * 10000) / 10000;
        const cdfAm1 = a > 0 ? Math.round(BINOM_DIST.binomCDF(n, p, a - 1) * 10000) / 10000 : 0;
        const answer = Math.round((cdfB - cdfAm1) * 10000) / 10000;
        const answerTex = answer.toFixed(4);

        return {
            type: 'free',
            rule: 'Range Probability',
            difficulty: 'hard',
            text: `Given \\(X \\sim B(${n},\\,${p})\\), find \\(P(${a} \\leq X \\leq ${bSafe})\\). Give your answer to 4 decimal places.`,
            latex: `\\(P(${a} \\leq X \\leq ${bSafe}) = P(X \\leq ${bSafe}) - P(X \\leq ${a - 1})\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P(${a} \\leq X \\leq ${bSafe}) = P(X \\leq ${bSafe}) - P(X \\leq ${a - 1})`,
                `= ${cdfB.toFixed(4)} - ${cdfAm1.toFixed(4)} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the range formula: \\(P(${a} \\leq X \\leq ${bSafe}) = P(X \\leq ${bSafe}) - P(X \\leq ${a - 1})\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate using the binomial CDF with \\(n = ${n}\\), \\(p = ${p}\\):<br>` +
                     `\\(P(X \\leq ${bSafe}) = ${cdfB.toFixed(4)}\\)<br>` +
                     `\\(P(X \\leq ${a - 1}) = ${cdfAm1.toFixed(4)}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(${a} \\leq X \\leq ${bSafe}) = ${cdfB.toFixed(4)} - ${cdfAm1.toFixed(4)} = ${answerTex}\\).`
        };
    },

    /**
     * 7. qFindMeanGivenVariance - Medium (MC)
     * Given E(X) = np = m and n, find p = m/n.
     */
    qFindMeanGivenVariance() {
        // Use pairs where p is a recognisable decimal
        const configs = [
            { n: 20, p: 0.3 },  // mean 6
            { n: 10, p: 0.4 },  // mean 4
            { n: 8,  p: 0.5 },  // mean 4
            { n: 20, p: 0.25 }, // mean 5
            { n: 10, p: 0.3 },  // mean 3
            { n: 16, p: 0.25 }, // mean 4
            { n: 12, p: 0.5 },  // mean 6
            { n: 20, p: 0.2 },  // mean 4
            { n: 5,  p: 0.4 },  // mean 2
            { n: 10, p: 0.5 }   // mean 5
        ];
        const { n, p } = MathUtils.pick(configs);
        const mean = n * p;
        const correctTex = String(p);

        // Generate 3 plausible distractors (other p values)
        const allPs = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8];
        const distractorPs = allPs.filter(q => q !== p).map(q => String(q));
        const distracted = MathUtils.shuffle(distractorPs).slice(0, 3);

        const optionTexts = [correctTex, ...distracted];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Find Parameter p',
            difficulty: 'medium',
            text: `\\(X \\sim B(${n},\\, p)\\) has mean \\(E(X) = ${mean}\\). Find the value of \\(p\\).`,
            latex: `\\(E(X) = np = ${mean}\\)`,
            answer: 1,
            answerTex: `p = ${correctTex}`,
            options: shuffled,
            hintTex: [
                `E(X) = np \\implies p = \\frac{E(X)}{n}`,
                `p = \\frac{${mean}}{${n}} = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the mean formula: \\(E(X) = np\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange for \\(p\\): \\(p = \\dfrac{E(X)}{n} = \\dfrac{${mean}}{${n}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(p = ${correctTex}\\).`
        };
    },

    /**
     * 8. qFindN - Hard (MC)
     * Given E(X) = np = m and p, find n = m/p.
     */
    qFindN() {
        // Ensure n is a clean integer
        const configs = [
            { n: 20, p: 0.3 },  // mean 6
            { n: 25, p: 0.4 },  // mean 10
            { n: 16, p: 0.25 }, // mean 4
            { n: 10, p: 0.5 },  // mean 5
            { n: 30, p: 0.2 },  // mean 6
            { n: 20, p: 0.25 }, // mean 5
            { n: 12, p: 0.5 },  // mean 6
            { n: 15, p: 0.4 },  // mean 6
            { n: 40, p: 0.25 }, // mean 10
            { n: 50, p: 0.2 }   // mean 10
        ];
        const { n, p } = MathUtils.pick(configs);
        const mean = n * p;
        const correctTex = String(n);

        // Distractors: nearby multiples, plausible wrong answers
        const offsets = MathUtils.shuffle([-10, -5, 5, 10, -2, 2, -4, 4]).slice(0, 3);
        const distractors = offsets.map(off => {
            const d = n + off;
            return d > 0 ? String(d) : String(n + Math.abs(off) + 5);
        });

        const optionTexts = [correctTex, ...distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Find Parameter n',
            difficulty: 'hard',
            text: `\\(X \\sim B(n,\\, ${p})\\) has mean \\(E(X) = ${mean}\\). Find the value of \\(n\\).`,
            latex: `\\(E(X) = np = ${mean}\\)`,
            answer: 1,
            answerTex: `n = ${correctTex}`,
            options: shuffled,
            hintTex: [
                `E(X) = np \\implies n = \\frac{E(X)}{p}`,
                `n = \\frac{${mean}}{${p}} = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> Use the mean formula: \\(E(X) = np\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange for \\(n\\): \\(n = \\dfrac{E(X)}{p} = \\dfrac{${mean}}{${p}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(n = ${correctTex}\\). (Must be a positive integer — check this is valid.)`
        };
    },

    /**
     * 9. qMostLikely - Hard (MC)
     * Most likely value (mode) of B(n, p).
     * Mode is floor((n+1)p) when (n+1)p is not an integer;
     * both floor((n+1)p) and floor((n+1)p)-1 when it is.
     */
    qMostLikely() {
        const n = 10;
        const ps = [0.2, 0.3, 0.4, 0.5];
        const p = MathUtils.pick(ps);

        const candidate = (n + 1) * p;
        let mode;
        if (Number.isInteger(candidate)) {
            // Both candidate-1 and candidate are modes; pick the one with higher PDF
            const a = candidate - 1;
            const b = candidate;
            mode = BINOM_DIST.binomPDF(n, p, a) >= BINOM_DIST.binomPDF(n, p, b) ? a : b;
        } else {
            mode = Math.floor(candidate);
        }

        const correctTex = String(mode);
        const np = n * p; // approximate centre

        // Distractors: nearby integers, avoid duplicating the correct answer
        const candidates = [];
        for (let delta of [-2, -1, 1, 2]) {
            const d = mode + delta;
            if (d >= 0 && d <= n && String(d) !== correctTex) {
                candidates.push(String(d));
            }
        }
        // Ensure exactly 3 distractors
        const distractors = candidates.slice(0, 3);
        while (distractors.length < 3) {
            const fallback = String(mode + distractors.length + 2);
            if (!distractors.includes(fallback) && fallback !== correctTex) {
                distractors.push(fallback);
            }
        }

        const optionTexts = [correctTex, ...distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Mode (Most Likely Value)',
            difficulty: 'hard',
            text: `Given \\(X \\sim B(${n},\\,${p})\\), what is the most likely value of \\(X\\) (the mode)?`,
            latex: `\\(\\text{Mode} = \\lfloor (n+1)p \\rfloor\\)`,
            answer: 1,
            answerTex: `X = ${correctTex}`,
            options: shuffled,
            hintTex: [
                `\\text{Mode} = \\lfloor (n+1)p \\rfloor`,
                `= \\lfloor (${n}+1) \\times ${p} \\rfloor = \\lfloor ${candidate} \\rfloor = ${correctTex}`
            ],
            explain: `<strong>Step 1:</strong> The mode of \\(B(n, p)\\) is found using \\(\\lfloor (n+1)p \\rfloor\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate \\((n+1)p = (${n}+1) \\times ${p} = ${candidate}\\).<br><br>` +
                     `<strong>Step 3:</strong> Take the floor: \\(\\lfloor ${candidate} \\rfloor = ${correctTex}\\).<br><br>` +
                     `<strong>Note:</strong> The mean is \\(np = ${np}\\) — the mode is always close to the mean.`
        };
    },

    /**
     * 10. qSymmetry - Medium (MC)
     * Ask about the skewness of X ~ B(n, p).
     * p = 0.5 → Symmetric; p < 0.5 → Right-skewed; p > 0.5 → Left-skewed.
     */
    qSymmetry() {
        // Pool of (n, p) configs with clear skewness
        const configs = [
            { n: 10, p: 0.5,  skew: 'Symmetric about the mean' },
            { n: 8,  p: 0.5,  skew: 'Symmetric about the mean' },
            { n: 12, p: 0.5,  skew: 'Symmetric about the mean' },
            { n: 10, p: 0.2,  skew: 'Positively skewed (right-skewed)' },
            { n: 10, p: 0.25, skew: 'Positively skewed (right-skewed)' },
            { n: 8,  p: 0.3,  skew: 'Positively skewed (right-skewed)' },
            { n: 10, p: 0.7,  skew: 'Negatively skewed (left-skewed)' },
            { n: 10, p: 0.8,  skew: 'Negatively skewed (left-skewed)' },
            { n: 8,  p: 0.75, skew: 'Negatively skewed (left-skewed)' }
        ];
        const { n, p, skew } = MathUtils.pick(configs);
        const correctTex = `\\text{${skew}}`;

        // Build all four option texts (only one correct)
        const allOptions = [
            { tex: `\\text{Symmetric about the mean}`,         correct: skew === 'Symmetric about the mean' },
            { tex: `\\text{Positively skewed (right-skewed)}`, correct: skew === 'Positively skewed (right-skewed)' },
            { tex: `\\text{Negatively skewed (left-skewed)}`,  correct: skew === 'Negatively skewed (left-skewed)' },
            { tex: `\\text{Bimodal (two peaks)}`,              correct: false }
        ];

        const options = allOptions.map(o => ({
            value: o.correct ? 1 : 0,
            tex: o.tex
        }));
        const shuffled = MathUtils.shuffle(options);

        // Explanation content
        let skewExplain;
        if (p === 0.5) {
            skewExplain = `When \\(p = 0.5\\) the distribution is perfectly symmetric about its mean \\(np = ${n * 0.5}\\).`;
        } else if (p < 0.5) {
            skewExplain = `When \\(p < 0.5\\) most values cluster near zero and the tail extends to the right, giving a <strong>right-skewed</strong> (positively skewed) distribution.`;
        } else {
            skewExplain = `When \\(p > 0.5\\) most values cluster near \\(n\\) and the tail extends to the left, giving a <strong>left-skewed</strong> (negatively skewed) distribution.`;
        }

        return {
            type: 'mc',
            rule: 'Skewness',
            difficulty: 'medium',
            text: `Describe the shape of the distribution \\(X \\sim B(${n},\\,${p})\\).`,
            latex: `\\(p = ${p}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `p = 0.5 \\Rightarrow \\text{Symmetric};\\quad p < 0.5 \\Rightarrow \\text{Right-skewed};\\quad p > 0.5 \\Rightarrow \\text{Left-skewed}`,
                `\\text{Here } p = ${p} ${p === 0.5 ? '= 0.5' : p < 0.5 ? '< 0.5' : '> 0.5'}`
            ],
            explain: `<strong>Step 1:</strong> The skewness of \\(B(n, p)\\) depends on \\(p\\):<br>` +
                     `\\(p = 0.5\\) → Symmetric, \\(p < 0.5\\) → Right-skewed, \\(p > 0.5\\) → Left-skewed.<br><br>` +
                     `<strong>Step 2:</strong> Here \\(p = ${p}\\).<br><br>` +
                     `<strong>Step 3:</strong> ${skewExplain}`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => BINOM_DIST.qProbExact(),           weight: 3 },
            { fn: () => BINOM_DIST.qMeanBinomial(),        weight: 3 },
            { fn: () => BINOM_DIST.qVarianceBinomial(),    weight: 3 },
            { fn: () => BINOM_DIST.qProbAtMost(),          weight: 2 },
            { fn: () => BINOM_DIST.qProbAtLeast(),         weight: 2 },
            { fn: () => BINOM_DIST.qProbBetween(),         weight: 1 },
            { fn: () => BINOM_DIST.qFindMeanGivenVariance(), weight: 2 },
            { fn: () => BINOM_DIST.qFindN(),               weight: 1 },
            { fn: () => BINOM_DIST.qMostLikely(),          weight: 1 },
            { fn: () => BINOM_DIST.qSymmetry(),            weight: 2 }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (BINOM_DIST.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2].includes(i));
        } else if (BINOM_DIST.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 4, 6, 9].includes(i));
        } else if (BINOM_DIST.level === 'hard') {
            filtered = pool.filter((_, i) => [5, 7, 8].includes(i));
        }

        const totalWeight = filtered.reduce((s, p) => s + p.weight, 0);
        let r = Math.random() * totalWeight;
        for (const item of filtered) {
            r -= item.weight;
            if (r <= 0) return item.fn();
        }
        return filtered[filtered.length - 1].fn();
    },

    /* ────────────────────────────────────────────
       UI: load()
       ──────────────────────────────────────────── */

    load() {
        BINOM_DIST.score = 0;
        BINOM_DIST.total = 0;
        BINOM_DIST.streak = 0;
        BINOM_DIST.answered = false;
        BINOM_DIST.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="BINOM_DIST.unload()">Binomial Distribution (4.10)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Binomial Distribution</h1>
                <p>IB Math AA 4.10 – X ~ B(n, p) probabilities and parameters</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="BINOM_DIST.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="BINOM_DIST.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="BINOM_DIST.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="BINOM_DIST.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="binom-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="binom-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="binom-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="binom-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="binom-question-card">
                <span class="rule-tag" id="binom-rule"></span>
                <span class="difficulty-tag" id="binom-difficulty"></span>
                <div class="question-text" id="binom-text"></div>
                <div class="question-prompt" id="binom-latex"></div>
                <div id="binom-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="binom-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="binom-feedback">
                <div class="feedback-title" id="binom-feedback-title"></div>
                <div class="feedback-explanation" id="binom-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="binom-hint-btn" onclick="BINOM_DIST.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="binom-next-btn" onclick="BINOM_DIST.next()" style="display:none;">Next Question</button>
            </div>
        `;

        BINOM_DIST.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('stats-probability');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        BINOM_DIST.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        BINOM_DIST.score = 0;
        BINOM_DIST.total = 0;
        BINOM_DIST.streak = 0;
        BINOM_DIST.updateStats();
        BINOM_DIST.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        BINOM_DIST.answered = false;
        BINOM_DIST.hintIndex = 0;
        BINOM_DIST.currentQ = BINOM_DIST.pickQuestion();
        const q = BINOM_DIST.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('binom-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('binom-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('binom-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('binom-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('binom-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="BINOM_DIST.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="binom-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')BINOM_DIST.checkFree()">
                    <button class="btn btn-primary" onclick="BINOM_DIST.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('binom-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('binom-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('binom-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('binom-next-btn').style.display = 'none';
        document.getElementById('binom-hint-btn').style.display = '';
        document.getElementById('binom-hint-btn').disabled = false;

        // Render KaTeX
        BINOM_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = BINOM_DIST.currentQ;
        if (!q || !q.hintTex || BINOM_DIST.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('binom-hint-box');
        const hintContent = BINOM_DIST.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[BINOM_DIST.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        BINOM_DIST.hintIndex++;

        if (BINOM_DIST.hintIndex >= q.hintTex.length) {
            document.getElementById('binom-hint-btn').disabled = true;
        }

        BINOM_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (BINOM_DIST.answered) return;
        BINOM_DIST.answered = true;
        BINOM_DIST.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        // Disable all buttons and highlight
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            BINOM_DIST.score++;
            BINOM_DIST.streak++;
        } else {
            btn.classList.add('incorrect');
            BINOM_DIST.streak = 0;
        }

        BINOM_DIST.showFeedback(isCorrect);
        BINOM_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (BINOM_DIST.answered) return;

        const inp = document.getElementById('binom-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        BINOM_DIST.answered = true;
        BINOM_DIST.total++;
        inp.disabled = true;

        const q = BINOM_DIST.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.001);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            BINOM_DIST.score++;
            BINOM_DIST.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            BINOM_DIST.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        BINOM_DIST.showFeedback(isCorrect);
        BINOM_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = BINOM_DIST.currentQ;
        const fb = document.getElementById('binom-feedback');
        const title = document.getElementById('binom-feedback-title');
        const explanation = document.getElementById('binom-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (BINOM_DIST.streak > 1) {
                title.textContent = `Correct! (${BINOM_DIST.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('binom-next-btn').style.display = '';
        document.getElementById('binom-hint-btn').style.display = 'none';

        BINOM_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('binom-score');
        const totalEl = document.getElementById('binom-total');
        const streakEl = document.getElementById('binom-streak');
        const accEl = document.getElementById('binom-accuracy');

        if (scoreEl) scoreEl.textContent = BINOM_DIST.score;
        if (totalEl) totalEl.textContent = BINOM_DIST.total;
        if (streakEl) streakEl.textContent = BINOM_DIST.streak;
        if (accEl) {
            accEl.textContent = BINOM_DIST.total > 0
                ? Math.round((BINOM_DIST.score / BINOM_DIST.total) * 100) + '%'
                : '-';
        }
    },

    /* ────────────────────────────────────────────
       UI: renderAllKaTeX()
       ──────────────────────────────────────────── */

    renderAllKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const container = document.getElementById('activity-container');
            if (container) {
                renderMathInElement(container, {
                    delimiters: [
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['binomial-distribution'] = () => BINOM_DIST.load();
