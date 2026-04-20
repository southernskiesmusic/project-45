/*
 * discrete-distributions.js - IB Math AA 4.9: Discrete Distributions
 * Expected value, variance, and probability tables
 */

const DISCRETE_DIST = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPER: genDistribution
       ──────────────────────────────────────────── */

    /**
     * Generate a discrete probability distribution over 4 values.
     * Probabilities use denominator 8, 10, or 12 for clean arithmetic.
     * vals = [0, 1, 2, 3] by default; probs sum to 1.
     */
    genDistribution() {
        const denoms = [8, 10, 12];
        const d = MathUtils.pick(denoms);

        // Generate 4 positive integer numerators summing to d
        // Split d into 4 parts: cut at 3 random points in [1, d-3]
        let nums;
        let attempts = 0;
        do {
            // Pick 3 cut points in range [1, d-1], all distinct
            const cuts = new Set();
            while (cuts.size < 3) {
                cuts.add(MathUtils.randInt(1, d - 1));
            }
            const sorted = Array.from(cuts).sort((a, b) => a - b);
            nums = [
                sorted[0],
                sorted[1] - sorted[0],
                sorted[2] - sorted[1],
                d - sorted[2]
            ];
            attempts++;
        } while (nums.some(n => n <= 0) && attempts < 50);

        const vals = [0, 1, 2, 3];
        const probs = nums.map(n => n / d);

        return { vals, probs, nums, d };
    },

    /**
     * Format distribution as a table-like string for question text.
     */
    fmtTable(vals, probs) {
        const xRow = 'X: ' + vals.join(' | ');
        const pRow = 'P: ' + probs.map(p => p.toFixed(4)).join(' | ');
        return `<div class="dist-table"><span>${xRow}</span><br><span>${pRow}</span></div>`;
    },

    /**
     * Compute E(X) = Σ xᵢ·pᵢ
     */
    calcEX(vals, probs) {
        return vals.reduce((s, x, i) => s + x * probs[i], 0);
    },

    /**
     * Compute E(X²) = Σ xᵢ²·pᵢ
     */
    calcEX2(vals, probs) {
        return vals.reduce((s, x, i) => s + x * x * probs[i], 0);
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qFindMissingProb - Easy
     * Given 3 of 4 probabilities, find the missing one so they sum to 1.
     */
    qFindMissingProb() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();

        // Randomly pick which index is "missing"
        const missingIdx = MathUtils.randInt(0, 3);
        const givenProbs = probs.map((p, i) => i === missingIdx ? null : p);
        const missingProb = probs[missingIdx];
        const givenNums = nums.map((n, i) => i === missingIdx ? null : n);

        // Sum of given probabilities
        const givenSum = probs.reduce((s, p, i) => i === missingIdx ? s : s + p, 0);
        const answer = parseFloat((1 - givenSum).toFixed(4));

        // Build display rows (show ? for missing)
        const xRow = 'X: ' + vals.join(' | ');
        const pRow = 'P: ' + probs.map((p, i) =>
            i === missingIdx ? '?' : p.toFixed(4)
        ).join(' | ');

        // Explain sum of known
        const knownFracs = nums
            .map((n, i) => i === missingIdx ? null : `\\frac{${n}}{${d}}`)
            .filter(f => f !== null)
            .join(' + ');

        const givenSumFrac = `\\frac{${d - nums[missingIdx]}}{${d}}`;

        return {
            type: 'free',
            rule: 'Missing Probability',
            difficulty: 'easy',
            text: 'The table below shows a probability distribution with one missing value. Find the missing probability.',
            latex: `<div class="dist-table"><span>${xRow}</span><br><span>${pRow}</span></div>`,
            answer: answer,
            answerTex: `\\frac{${nums[missingIdx]}}{${d}}`,
            tol: 0.001,
            options: [],
            hintTex: [
                `\\text{All probabilities must sum to 1: } \\sum P(X = x) = 1`,
                `P(X = ${vals[missingIdx]}) = 1 - (${knownFracs}) = 1 - ${givenSumFrac} = \\frac{${nums[missingIdx]}}{${d}}`
            ],
            explain: `<strong>Step 1:</strong> The probabilities must sum to 1.<br><br>` +
                     `<strong>Step 2:</strong> Sum the known probabilities:<br>` +
                     `\\(${knownFracs} = ${givenSumFrac}\\)<br><br>` +
                     `<strong>Step 3:</strong> Subtract from 1:<br>` +
                     `\\(P(X = ${vals[missingIdx]}) = 1 - ${givenSumFrac} = \\frac{${nums[missingIdx]}}{${d}} \\approx ${answer.toFixed(4)}\\)`
        };
    },

    /**
     * 2. qExpectedValue - Easy
     * Compute E(X) = Σ xᵢ·pᵢ for a full distribution.
     */
    qExpectedValue() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();
        const ex = DISCRETE_DIST.calcEX(vals, probs);
        const answer = parseFloat(ex.toFixed(4));

        const termsTex = vals.map((x, i) =>
            `(${x})\\!\\cdot\\!\\frac{${nums[i]}}{${d}}`
        ).join(' + ');

        const exNum = nums.reduce((s, n, i) => s + vals[i] * n, 0);

        return {
            type: 'free',
            rule: 'Expected Value',
            difficulty: 'easy',
            text: 'Calculate the expected value \\(E(X)\\) for the distribution below.',
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `\\frac{${exNum}}{${d}}`,
            tol: 0.001,
            options: [],
            hintTex: [
                `E(X) = \\sum x_i \\cdot P(X = x_i)`,
                `E(X) = ${termsTex} = \\frac{${exNum}}{${d}}`
            ],
            explain: `<strong>Step 1:</strong> Use the formula \\(E(X) = \\sum x_i \\cdot P(X = x_i)\\).<br><br>` +
                     `<strong>Step 2:</strong> Multiply each value by its probability and sum:<br>` +
                     `\\(E(X) = ${termsTex}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(E(X) = \\frac{${exNum}}{${d}} \\approx ${answer.toFixed(4)}\\)`
        };
    },

    /**
     * 3. qVariance - Medium
     * Compute Var(X) = E(X²) - [E(X)]².
     */
    qVariance() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();
        const ex = DISCRETE_DIST.calcEX(vals, probs);
        const ex2 = DISCRETE_DIST.calcEX2(vals, probs);
        const variance = ex2 - ex * ex;
        const answer = parseFloat(variance.toFixed(4));

        const ex2Terms = vals.map((x, i) =>
            `(${x})^2\\!\\cdot\\!\\frac{${nums[i]}}{${d}}`
        ).join(' + ');

        const ex2Num = nums.reduce((s, n, i) => s + vals[i] * vals[i] * n, 0);
        const exNum = nums.reduce((s, n, i) => s + vals[i] * n, 0);

        return {
            type: 'free',
            rule: 'Variance',
            difficulty: 'medium',
            text: 'Calculate \\(\\text{Var}(X)\\) for the distribution below. Give your answer to 4 decimal places.',
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `${answer.toFixed(4)}`,
            tol: 0.001,
            options: [],
            hintTex: [
                `\\text{Var}(X) = E(X^2) - [E(X)]^2`,
                `E(X^2) = ${ex2Terms} = \\frac{${ex2Num}}{${d}},\\quad E(X) = \\frac{${exNum}}{${d}}`
            ],
            explain: `<strong>Step 1:</strong> Use \\(\\text{Var}(X) = E(X^2) - [E(X)]^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate \\(E(X^2)\\):<br>` +
                     `\\(E(X^2) = ${ex2Terms} = \\frac{${ex2Num}}{${d}} \\approx ${ex2.toFixed(4)}\\)<br><br>` +
                     `<strong>Step 3:</strong> Calculate \\(E(X)\\):<br>` +
                     `\\(E(X) = \\frac{${exNum}}{${d}} \\approx ${ex.toFixed(4)}\\)<br><br>` +
                     `<strong>Step 4:</strong> \\(\\text{Var}(X) = ${ex2.toFixed(4)} - (${ex.toFixed(4)})^2 = ${ex2.toFixed(4)} - ${(ex * ex).toFixed(4)} = ${answer.toFixed(4)}\\)`
        };
    },

    /**
     * 4. qProbGreater - Easy
     * Compute P(X > k) for a chosen k.
     */
    qProbGreater() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();

        // k is one of the middle values (vals[1] or vals[2])
        const k = MathUtils.pick([vals[1], vals[2]]);

        const resultNums = nums.filter((_, i) => vals[i] > k);
        const resultProbs = probs.filter((_, i) => vals[i] > k);
        const resultVals = vals.filter(v => v > k);

        const numSum = resultNums.reduce((s, n) => s + n, 0);
        const answer = parseFloat((numSum / d).toFixed(4));

        const termsTex = resultVals.map((x, i) =>
            `P(X=${x}) = \\frac{${resultNums[i]}}{${d}}`
        ).join(',\\; ');

        return {
            type: 'free',
            rule: 'P(X > k)',
            difficulty: 'easy',
            text: `Using the distribution below, find \\(P(X > ${k})\\). Give your answer to 4 decimal places.`,
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `\\frac{${numSum}}{${d}}`,
            tol: 0.001,
            options: [],
            hintTex: [
                `P(X > ${k}) = \\sum_{x > ${k}} P(X = x)`,
                `\\text{Values where } x > ${k}\\text{: } ${resultVals.join(', ')}`
            ],
            explain: `<strong>Step 1:</strong> Identify values where \\(x > ${k}\\): \\{${resultVals.join(', ')}\\}.<br><br>` +
                     `<strong>Step 2:</strong> Sum their probabilities:<br>` +
                     `\\(${termsTex}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(P(X > ${k}) = \\frac{${numSum}}{${d}} \\approx ${answer.toFixed(4)}\\)`
        };
    },

    /**
     * 5. qProbAtLeast - Easy
     * Compute P(X ≥ k).
     */
    qProbAtLeast() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();

        // k is vals[1] or vals[2]
        const k = MathUtils.pick([vals[1], vals[2]]);

        const resultNums = nums.filter((_, i) => vals[i] >= k);
        const resultVals = vals.filter(v => v >= k);

        const numSum = resultNums.reduce((s, n) => s + n, 0);
        const answer = parseFloat((numSum / d).toFixed(4));

        const termsTex = resultVals.map((x, i) =>
            `P(X=${x}) = \\frac{${resultNums[i]}}{${d}}`
        ).join(',\\; ');

        return {
            type: 'free',
            rule: 'P(X ≥ k)',
            difficulty: 'easy',
            text: `Using the distribution below, find \\(P(X \\geq ${k})\\). Give your answer to 4 decimal places.`,
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `\\frac{${numSum}}{${d}}`,
            tol: 0.001,
            options: [],
            hintTex: [
                `P(X \\geq ${k}) = \\sum_{x \\geq ${k}} P(X = x)`,
                `\\text{Values where } x \\geq ${k}\\text{: } ${resultVals.join(', ')}`
            ],
            explain: `<strong>Step 1:</strong> Identify values where \\(x \\geq ${k}\\): \\{${resultVals.join(', ')}\\}.<br><br>` +
                     `<strong>Step 2:</strong> Sum their probabilities:<br>` +
                     `\\(${termsTex}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(P(X \\geq ${k}) = \\frac{${numSum}}{${d}} \\approx ${answer.toFixed(4)}\\)`
        };
    },

    /**
     * 6. qProbBetween - Medium
     * Compute P(a ≤ X ≤ b).
     */
    qProbBetween() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();

        // Pick two boundary indices so the interval is non-trivial
        // Use a = vals[0] or vals[1], b = vals[2] or vals[3]
        const aIdx = MathUtils.randInt(0, 1);
        const bIdx = MathUtils.randInt(2, 3);
        const a = vals[aIdx];
        const b = vals[bIdx];

        const resultNums = nums.filter((_, i) => vals[i] >= a && vals[i] <= b);
        const resultVals = vals.filter(v => v >= a && v <= b);

        const numSum = resultNums.reduce((s, n) => s + n, 0);
        const answer = parseFloat((numSum / d).toFixed(4));

        const termsTex = resultVals.map((x, i) =>
            `P(X=${x}) = \\frac{${resultNums[i]}}{${d}}`
        ).join(',\\; ');

        return {
            type: 'free',
            rule: 'P(a ≤ X ≤ b)',
            difficulty: 'medium',
            text: `Using the distribution below, find \\(P(${a} \\leq X \\leq ${b})\\). Give your answer to 4 decimal places.`,
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `\\frac{${numSum}}{${d}}`,
            tol: 0.001,
            options: [],
            hintTex: [
                `P(${a} \\leq X \\leq ${b}) = \\sum_{${a} \\leq x \\leq ${b}} P(X = x)`,
                `\\text{Values in range: } ${resultVals.join(', ')}`
            ],
            explain: `<strong>Step 1:</strong> Identify values where \\(${a} \\leq x \\leq ${b}\\): \\{${resultVals.join(', ')}\\}.<br><br>` +
                     `<strong>Step 2:</strong> Sum their probabilities:<br>` +
                     `\\(${termsTex}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(P(${a} \\leq X \\leq ${b}) = \\frac{${numSum}}{${d}} \\approx ${answer.toFixed(4)}\\)`
        };
    },

    /**
     * 7. qMode - Easy (MC)
     * Find the mode (most likely value = x with highest probability).
     */
    qMode() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();

        // Ensure a unique mode by adjusting if tied
        let maxIdx = 0;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] > nums[maxIdx]) maxIdx = i;
        }
        // If there's a tie at maxIdx, nudge one numerator to break it
        const maxNum = nums[maxIdx];
        const tiedIndices = nums.reduce((a, n, i) => (n === maxNum ? [...a, i] : a), []);
        if (tiedIndices.length > 1) {
            // Add 1 to maxIdx numerator and subtract 1 from another
            const other = tiedIndices.find(i => i !== maxIdx);
            if (nums[other] > 1) {
                nums[other] -= 1;
                nums[maxIdx] += 1;
                probs[other] = nums[other] / d;
                probs[maxIdx] = nums[maxIdx] / d;
            }
        }

        const modeVal = vals[maxIdx];
        const correctTex = String(modeVal);

        // Build MC options from the vals array (all 4 values), shuffle
        const options = vals.map((v, i) => ({
            value: v === modeVal ? 1 : 0,
            tex: String(v)
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Mode',
            difficulty: 'easy',
            text: 'Which value of \\(X\\) is the mode of the distribution below? (i.e. the most likely outcome)',
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{The mode is the value of } x \\text{ with the highest probability}`,
                `\\text{Compare: } ${vals.map((v, i) => `P(X=${v}) = ${probs[i].toFixed(4)}`).join(',\\; ')}`
            ],
            explain: `<strong>Step 1:</strong> Compare all probabilities in the table.<br><br>` +
                     `<strong>Step 2:</strong> The highest probability is \\(P(X = ${modeVal}) = \\frac{${nums[maxIdx]}}{${d}} = ${probs[maxIdx].toFixed(4)}\\).<br><br>` +
                     `<strong>Step 3:</strong> Therefore the mode is \\(X = ${modeVal}\\).`
        };
    },

    /**
     * 8. qLinearTransformMean - Medium
     * E(aX + b) = a·E(X) + b. Given E(X), find E(aX + b).
     */
    qLinearTransformMean() {
        // Pick simple a and b values
        const a = MathUtils.nonZeroRandInt(2, 6);
        const b = MathUtils.randInt(-5, 5);

        // Generate a known E(X) as a clean fraction or decimal
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();
        const exRaw = DISCRETE_DIST.calcEX(vals, probs);
        const exNum = nums.reduce((s, n, i) => s + vals[i] * n, 0);
        const ex = exNum / d;

        const result = a * ex + b;
        const answer = parseFloat(result.toFixed(2));

        return {
            type: 'free',
            rule: 'Linear Transform — Mean',
            difficulty: 'medium',
            text: `The table below shows a probability distribution. Given \\(E(X) = \\frac{${exNum}}{${d}}\\), find \\(E(${a}X ${b >= 0 ? '+' : '-'} ${Math.abs(b)})\\). Give your answer to 2 decimal places.`,
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `${answer.toFixed(2)}`,
            tol: 0.01,
            options: [],
            hintTex: [
                `E(aX + b) = a \\cdot E(X) + b`,
                `E(${a}X ${b >= 0 ? '+' : '-'} ${Math.abs(b)}) = ${a} \\times \\frac{${exNum}}{${d}} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}`
            ],
            explain: `<strong>Step 1:</strong> Use the linear expectation rule: \\(E(aX + b) = a \\cdot E(X) + b\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(a = ${a}\\), \\(b = ${b}\\), \\(E(X) = \\frac{${exNum}}{${d}}\\):<br>` +
                     `\\(E(${a}X ${b >= 0 ? '+' : '-'} ${Math.abs(b)}) = ${a} \\times \\frac{${exNum}}{${d}} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\frac{${a * exNum}}{${d}} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${ex.toFixed(4)} \\times ${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${answer.toFixed(2)}\\)`
        };
    },

    /**
     * 9. qLinearTransformVar - Medium
     * Var(aX + b) = a²·Var(X). Given Var(X) and a, find Var(aX + b).
     */
    qLinearTransformVar() {
        const a = MathUtils.nonZeroRandInt(2, 5);
        const b = MathUtils.randInt(-5, 5);

        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();
        const ex = DISCRETE_DIST.calcEX(vals, probs);
        const ex2 = DISCRETE_DIST.calcEX2(vals, probs);
        const varX = ex2 - ex * ex;
        const varXRounded = parseFloat(varX.toFixed(4));

        const result = a * a * varX;
        const answer = parseFloat(result.toFixed(2));

        return {
            type: 'free',
            rule: 'Linear Transform — Variance',
            difficulty: 'medium',
            text: `For the distribution below, \\(\\text{Var}(X) = ${varXRounded.toFixed(4)}\\). Find \\(\\text{Var}(${a}X ${b >= 0 ? '+' : '-'} ${Math.abs(b)})\\). Give your answer to 2 decimal places.`,
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `${answer.toFixed(2)}`,
            tol: 0.01,
            options: [],
            hintTex: [
                `\\text{Var}(aX + b) = a^2 \\cdot \\text{Var}(X) \\quad (b \\text{ does not affect variance})`,
                `\\text{Var}(${a}X ${b >= 0 ? '+' : '-'} ${Math.abs(b)}) = ${a}^2 \\times ${varXRounded.toFixed(4)} = ${a * a} \\times ${varXRounded.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Use the rule \\(\\text{Var}(aX + b) = a^2 \\cdot \\text{Var}(X)\\).<br><br>` +
                     `<strong>Note:</strong> Adding a constant \\(b\\) does not change the variance — only the spread matters.<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(a = ${a}\\), \\(\\text{Var}(X) = ${varXRounded.toFixed(4)}\\):<br>` +
                     `\\(\\text{Var}(${a}X ${b >= 0 ? '+' : '-'} ${Math.abs(b)}) = ${a}^2 \\times ${varXRounded.toFixed(4)} = ${a * a} \\times ${varXRounded.toFixed(4)}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(= ${answer.toFixed(2)}\\)`
        };
    },

    /**
     * 10. qCumulativeProb - Easy
     * Compute P(X ≤ k) = sum of pᵢ for xᵢ ≤ k.
     */
    qCumulativeProb() {
        const { vals, probs, nums, d } = DISCRETE_DIST.genDistribution();

        // k is one of vals[1], vals[2], or vals[3]
        const k = MathUtils.pick([vals[1], vals[2], vals[3]]);

        const resultNums = nums.filter((_, i) => vals[i] <= k);
        const resultVals = vals.filter(v => v <= k);

        const numSum = resultNums.reduce((s, n) => s + n, 0);
        const answer = parseFloat((numSum / d).toFixed(4));

        const termsTex = resultVals.map((x, i) =>
            `P(X=${x}) = \\frac{${resultNums[i]}}{${d}}`
        ).join(',\\; ');

        return {
            type: 'free',
            rule: 'Cumulative P(X ≤ k)',
            difficulty: 'easy',
            text: `Using the distribution below, find \\(P(X \\leq ${k})\\). Give your answer to 4 decimal places.`,
            latex: DISCRETE_DIST.fmtTable(vals, probs),
            answer: answer,
            answerTex: `\\frac{${numSum}}{${d}}`,
            tol: 0.001,
            options: [],
            hintTex: [
                `P(X \\leq ${k}) = \\sum_{x \\leq ${k}} P(X = x)`,
                `\\text{Values where } x \\leq ${k}\\text{: } ${resultVals.join(', ')}`
            ],
            explain: `<strong>Step 1:</strong> Identify all values where \\(x \\leq ${k}\\): \\{${resultVals.join(', ')}\\}.<br><br>` +
                     `<strong>Step 2:</strong> Sum their probabilities:<br>` +
                     `\\(${termsTex}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(P(X \\leq ${k}) = \\frac{${numSum}}{${d}} \\approx ${answer.toFixed(4)}\\)`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => DISCRETE_DIST.qFindMissingProb(),        weight: 3, difficulty: 'easy'   },
            { fn: () => DISCRETE_DIST.qExpectedValue(),           weight: 3, difficulty: 'easy'   },
            { fn: () => DISCRETE_DIST.qVariance(),                weight: 2, difficulty: 'medium' },
            { fn: () => DISCRETE_DIST.qProbGreater(),             weight: 3, difficulty: 'easy'   },
            { fn: () => DISCRETE_DIST.qProbAtLeast(),             weight: 3, difficulty: 'easy'   },
            { fn: () => DISCRETE_DIST.qProbBetween(),             weight: 2, difficulty: 'medium' },
            { fn: () => DISCRETE_DIST.qMode(),                    weight: 3, difficulty: 'easy'   },
            { fn: () => DISCRETE_DIST.qLinearTransformMean(),     weight: 2, difficulty: 'medium' },
            { fn: () => DISCRETE_DIST.qLinearTransformVar(),      weight: 2, difficulty: 'medium' },
            { fn: () => DISCRETE_DIST.qCumulativeProb(),          weight: 3, difficulty: 'easy'   }
        ];

        let filtered = pool;
        if (DISCRETE_DIST.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (DISCRETE_DIST.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (DISCRETE_DIST.level === 'hard') {
            filtered = pool.filter(p => p.difficulty === 'hard');
        }

        if (filtered.length === 0) filtered = pool;

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
        DISCRETE_DIST.score = 0;
        DISCRETE_DIST.total = 0;
        DISCRETE_DIST.streak = 0;
        DISCRETE_DIST.answered = false;
        DISCRETE_DIST.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="DISCRETE_DIST.unload()">Discrete Distributions (4.9)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Discrete Distributions</h1>
                <p>IB Math AA 4.9 – Expected value, variance, and probability tables</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="DISCRETE_DIST.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="DISCRETE_DIST.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="DISCRETE_DIST.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="DISCRETE_DIST.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="dd-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="dd-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="dd-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="dd-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="dd-question-card">
                <span class="rule-tag" id="dd-rule"></span>
                <span class="difficulty-tag" id="dd-difficulty"></span>
                <div class="question-text" id="dd-text"></div>
                <div class="question-prompt" id="dd-latex"></div>
                <div id="dd-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="dd-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="dd-feedback">
                <div class="feedback-title" id="dd-feedback-title"></div>
                <div class="feedback-explanation" id="dd-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="dd-hint-btn" onclick="DISCRETE_DIST.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="dd-next-btn" onclick="DISCRETE_DIST.next()" style="display:none;">Next Question</button>
            </div>
        `;

        DISCRETE_DIST.next();
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
        DISCRETE_DIST.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        DISCRETE_DIST.score = 0;
        DISCRETE_DIST.total = 0;
        DISCRETE_DIST.streak = 0;
        DISCRETE_DIST.updateStats();
        DISCRETE_DIST.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        DISCRETE_DIST.answered = false;
        DISCRETE_DIST.hintIndex = 0;
        DISCRETE_DIST.currentQ = DISCRETE_DIST.pickQuestion();
        const q = DISCRETE_DIST.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('dd-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('dd-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('dd-text').innerHTML = q.text;

        // LaTeX / table prompt
        document.getElementById('dd-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('dd-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="DISCRETE_DIST.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="dd-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')DISCRETE_DIST.checkFree()">
                    <button class="btn btn-primary" onclick="DISCRETE_DIST.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('dd-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('dd-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('dd-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('dd-next-btn').style.display = 'none';
        document.getElementById('dd-hint-btn').style.display = '';
        document.getElementById('dd-hint-btn').disabled = false;

        // Render KaTeX
        DISCRETE_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = DISCRETE_DIST.currentQ;
        if (!q || !q.hintTex || DISCRETE_DIST.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('dd-hint-box');
        const hintContent = DISCRETE_DIST.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[DISCRETE_DIST.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        DISCRETE_DIST.hintIndex++;

        if (DISCRETE_DIST.hintIndex >= q.hintTex.length) {
            document.getElementById('dd-hint-btn').disabled = true;
        }

        DISCRETE_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (DISCRETE_DIST.answered) return;
        DISCRETE_DIST.answered = true;
        DISCRETE_DIST.total++;

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
            DISCRETE_DIST.score++;
            DISCRETE_DIST.streak++;
        } else {
            btn.classList.add('incorrect');
            DISCRETE_DIST.streak = 0;
        }

        DISCRETE_DIST.showFeedback(isCorrect);
        DISCRETE_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (DISCRETE_DIST.answered) return;

        const inp = document.getElementById('dd-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        DISCRETE_DIST.answered = true;
        DISCRETE_DIST.total++;
        inp.disabled = true;

        const q = DISCRETE_DIST.currentQ;
        const tol = q.tol !== undefined ? q.tol : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            DISCRETE_DIST.score++;
            DISCRETE_DIST.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            DISCRETE_DIST.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        DISCRETE_DIST.showFeedback(isCorrect);
        DISCRETE_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = DISCRETE_DIST.currentQ;
        const fb = document.getElementById('dd-feedback');
        const title = document.getElementById('dd-feedback-title');
        const explanation = document.getElementById('dd-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (DISCRETE_DIST.streak > 1) {
                title.textContent = `Correct! (${DISCRETE_DIST.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('dd-next-btn').style.display = '';
        document.getElementById('dd-hint-btn').style.display = 'none';

        DISCRETE_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('dd-score');
        const totalEl = document.getElementById('dd-total');
        const streakEl = document.getElementById('dd-streak');
        const accEl = document.getElementById('dd-accuracy');

        if (scoreEl) scoreEl.textContent = DISCRETE_DIST.score;
        if (totalEl) totalEl.textContent = DISCRETE_DIST.total;
        if (streakEl) streakEl.textContent = DISCRETE_DIST.streak;
        if (accEl) {
            accEl.textContent = DISCRETE_DIST.total > 0
                ? Math.round((DISCRETE_DIST.score / DISCRETE_DIST.total) * 100) + '%'
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

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['discrete-distributions'] = () => DISCRETE_DIST.load();
