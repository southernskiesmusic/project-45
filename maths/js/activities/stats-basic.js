/*
 * stats-basic.js - IB Math AA 4.1-4.3: Statistics Basics
 * Mean, median, mode, range, IQR, variance/SD, linear transforms, outliers, interpretation
 */

const STATS_BASIC = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qMean - Easy (Free response)
     * Compute the mean of a small dataset (5-6 integers).
     * Built by picking a target mean then generating deviations that sum to 0.
     */
    qMean() {
        const n = MathUtils.pick([5, 6]);
        const mean = MathUtils.randInt(3, 15);

        // Generate n-1 deviations in [-5, 5], then last deviation = -(sum of others)
        const deviations = [];
        for (let i = 0; i < n - 1; i++) {
            deviations.push(MathUtils.randInt(-5, 5));
        }
        const lastDev = -deviations.reduce((s, d) => s + d, 0);
        deviations.push(lastDev);

        // Shuffle so the compensating value isn't always last
        const data = MathUtils.shuffle(deviations.map(d => mean + d));

        const sum = data.reduce((s, v) => s + v, 0);
        const answer = sum / n;

        const dataStr = data.join(',\\; ');
        const sumStr = data.join(' + ');

        return {
            type: 'free',
            rule: 'Mean',
            difficulty: 'easy',
            text: 'Calculate the mean of the following dataset.',
            latex: `\\(\\{${dataStr}\\}\\)`,
            answer: answer,
            answerTex: Number.isInteger(answer) ? String(answer) : `\\frac{${sum}}{${n}}`,
            options: [],
            hintTex: [
                `\\bar{x} = \\frac{\\sum x}{n} = \\frac{${sumStr}}{${n}}`,
                `= \\frac{${sum}}{${n}} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Add all values:<br>` +
                     `\\(${sumStr} = ${sum}\\).<br><br>` +
                     `<strong>Step 2:</strong> Divide by the number of values (\\(n = ${n}\\)):<br>` +
                     `\\(\\bar{x} = \\frac{${sum}}{${n}} = ${answer}\\).`
        };
    },

    /**
     * 2. qMedian - Easy (Free response)
     * Find the median of a sorted list of odd length (5 or 7 values).
     */
    qMedian() {
        const n = MathUtils.pick([5, 7]);
        // Generate n distinct integers, then sort
        const pool = new Set();
        while (pool.size < n) {
            pool.add(MathUtils.randInt(1, 30));
        }
        const data = Array.from(pool).sort((a, b) => a - b);
        const midIndex = Math.floor(n / 2);
        const answer = data[midIndex];

        const dataStr = data.join(',\\; ');

        return {
            type: 'free',
            rule: 'Median',
            difficulty: 'easy',
            text: 'Find the median of the following sorted dataset.',
            latex: `\\(${dataStr}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{There are } n = ${n} \\text{ values. Median is the } \\frac{n+1}{2} = ${midIndex + 1}\\text{th value.}`,
                `\\text{The } ${midIndex + 1}\\text{th value in the sorted list is } ${answer}.`
            ],
            explain: `<strong>Step 1:</strong> The data is already sorted: \\(${dataStr}\\).<br><br>` +
                     `<strong>Step 2:</strong> There are \\(n = ${n}\\) values (odd), so the median is the ` +
                     `\\(\\frac{${n}+1}{2} = ${midIndex + 1}\\)th value.<br><br>` +
                     `<strong>Step 3:</strong> The ${midIndex + 1}th value is \\(${answer}\\).`
        };
    },

    /**
     * 3. qMode - Easy (Free response)
     * Identify the mode from a list with exactly one value repeated twice (others distinct).
     */
    qMode() {
        const n = MathUtils.pick([5, 6, 7]);
        // Pick n-1 distinct values, then duplicate one of them
        const pool = new Set();
        while (pool.size < n - 1) {
            pool.add(MathUtils.randInt(1, 20));
        }
        const distinct = Array.from(pool);
        const modeVal = MathUtils.pick(distinct);

        // Build list: all distinct values + one extra copy of mode
        const data = [...distinct, modeVal];
        const shuffled = MathUtils.shuffle(data);

        const dataStr = shuffled.join(',\\; ');

        return {
            type: 'free',
            rule: 'Mode',
            difficulty: 'easy',
            text: 'Find the mode of the following dataset.',
            latex: `\\(\\{${dataStr}\\}\\)`,
            answer: modeVal,
            answerTex: String(modeVal),
            options: [],
            hintTex: [
                `\\text{The mode is the value that appears most often.}`,
                `\\text{Count each value's frequency. The value } ${modeVal} \\text{ appears twice.}`
            ],
            explain: `<strong>Step 1:</strong> Count the frequency of each value in \\(\\{${dataStr}\\}\\).<br><br>` +
                     `<strong>Step 2:</strong> The value \\(${modeVal}\\) appears <strong>twice</strong>; all other values appear once.<br><br>` +
                     `<strong>Step 3:</strong> The mode is \\(${modeVal}\\).`
        };
    },

    /**
     * 4. qRange - Easy (Free response)
     * Find the range (max - min) of a dataset.
     */
    qRange() {
        const n = MathUtils.pick([5, 6, 7]);
        const pool = new Set();
        while (pool.size < n) {
            pool.add(MathUtils.randInt(1, 40));
        }
        const data = MathUtils.shuffle(Array.from(pool));
        const minVal = Math.min(...data);
        const maxVal = Math.max(...data);
        const answer = maxVal - minVal;

        const dataStr = data.join(',\\; ');

        return {
            type: 'free',
            rule: 'Range',
            difficulty: 'easy',
            text: 'Find the range of the following dataset.',
            latex: `\\(\\{${dataStr}\\}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Range} = \\text{Maximum} - \\text{Minimum}`,
                `= ${maxVal} - ${minVal} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Identify the maximum value: \\(${maxVal}\\).<br><br>` +
                     `<strong>Step 2:</strong> Identify the minimum value: \\(${minVal}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\text{Range} = ${maxVal} - ${minVal} = ${answer}\\).`
        };
    },

    /**
     * 5. qIQR - Medium (Free response)
     * Find IQR from 8 sorted values.
     * Q1 = mean of 2nd and 3rd values, Q3 = mean of 6th and 7th values.
     * Values chosen so Q1 and Q3 are integers (pairs sum to even numbers).
     */
    qIQR() {
        // Generate 8 distinct ascending integers ensuring pairs produce integer averages
        // Strategy: pick 8 values where values[1]+values[2] is even and values[5]+values[6] is even
        let data;
        do {
            const pool = new Set();
            while (pool.size < 8) {
                pool.add(MathUtils.randInt(1, 50));
            }
            data = Array.from(pool).sort((a, b) => a - b);
        } while ((data[1] + data[2]) % 2 !== 0 || (data[5] + data[6]) % 2 !== 0);

        const q1 = (data[1] + data[2]) / 2;
        const q3 = (data[5] + data[6]) / 2;
        const iqr = q3 - q1;

        const dataStr = data.join(',\\; ');

        return {
            type: 'free',
            rule: 'IQR',
            difficulty: 'medium',
            text: 'Find the interquartile range (IQR) of the following sorted dataset of 8 values.',
            latex: `\\(${dataStr}\\)`,
            answer: iqr,
            answerTex: String(iqr),
            options: [],
            hintTex: [
                `\\text{For 8 values: } Q_1 = \\frac{x_2 + x_3}{2},\\quad Q_3 = \\frac{x_6 + x_7}{2}`,
                `Q_1 = \\frac{${data[1]} + ${data[2]}}{2} = ${q1},\\quad Q_3 = \\frac{${data[5]} + ${data[6]}}{2} = ${q3}`,
                `\\text{IQR} = Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}`
            ],
            explain: `<strong>Step 1:</strong> The 8 sorted values are \\(${dataStr}\\).<br><br>` +
                     `<strong>Step 2:</strong> Split into two halves of 4:<br>` +
                     `Lower: \\(${data.slice(0, 4).join(',\\;')}\\) — Upper: \\(${data.slice(4).join(',\\;')}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(Q_1 = \\frac{${data[1]} + ${data[2]}}{2} = ${q1}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(Q_3 = \\frac{${data[5]} + ${data[6]}}{2} = ${q3}\\).<br><br>` +
                     `<strong>Step 5:</strong> \\(\\text{IQR} = Q_3 - Q_1 = ${q3} - ${q1} = ${iqr}\\).`
        };
    },

    /**
     * 6. qVarianceStdDev - Easy (Free response)
     * Given variance (a perfect square), find the standard deviation.
     */
    qVarianceStdDev() {
        const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
        const variance = MathUtils.pick(perfectSquares);
        const sd = Math.sqrt(variance);

        return {
            type: 'free',
            rule: 'Standard Deviation',
            difficulty: 'easy',
            text: 'A dataset has a variance of the value shown below. Find the standard deviation.',
            latex: `\\(\\sigma^2 = ${variance}\\)`,
            answer: sd,
            answerTex: String(sd),
            options: [],
            hintTex: [
                `\\sigma = \\sqrt{\\sigma^2}`,
                `\\sigma = \\sqrt{${variance}} = ${sd}`
            ],
            explain: `<strong>Step 1:</strong> Recall that standard deviation is the square root of variance:<br>` +
                     `\\(\\sigma = \\sqrt{\\sigma^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\sigma = \\sqrt{${variance}} = ${sd}\\).`
        };
    },

    /**
     * 7. qLinearTransformMean - Medium (Free response)
     * Y = aX + b; given E(X), find E(Y) using E(aX+b) = a*E(X) + b.
     */
    qLinearTransformMean() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.randInt(-10, 10);
        const meanX = MathUtils.randInt(1, 20);
        const meanY = a * meanX + b;

        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const exprTex = `${a}X ${bSign}`;

        return {
            type: 'free',
            rule: 'Linear Transform — Mean',
            difficulty: 'medium',
            text: `A random variable \\(X\\) has mean \\(E(X) = ${meanX}\\). The variable \\(Y\\) is defined as \\(Y = ${exprTex}\\). Find \\(E(Y)\\).`,
            latex: `\\(E(Y) = aE(X) + b\\)`,
            answer: meanY,
            answerTex: String(meanY),
            options: [],
            hintTex: [
                `E(aX + b) = a \\cdot E(X) + b`,
                `E(Y) = ${a} \\cdot ${meanX} ${bSign} = ${a * meanX} ${bSign} = ${meanY}`
            ],
            explain: `<strong>Step 1:</strong> Use the linear transform rule for expectation:<br>` +
                     `\\(E(aX + b) = a \\cdot E(X) + b\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(a = ${a}\\), \\(b = ${b}\\), \\(E(X) = ${meanX}\\):<br>` +
                     `\\(E(Y) = ${a} \\times ${meanX} ${bSign}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(E(Y) = ${a * meanX} ${bSign} = ${meanY}\\).`
        };
    },

    /**
     * 8. qLinearTransformSD - Medium (Free response)
     * Y = aX + b; given SD(X), find SD(Y) using SD(aX+b) = |a|*SD(X).
     * b has no effect on standard deviation.
     */
    qLinearTransformSD() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.randInt(-10, 10);
        const sdX = MathUtils.randInt(1, 10);
        const sdY = Math.abs(a) * sdX;

        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const exprTex = `${a}X ${bSign}`;
        const absA = Math.abs(a);

        return {
            type: 'free',
            rule: 'Linear Transform — SD',
            difficulty: 'medium',
            text: `A random variable \\(X\\) has standard deviation \\(\\sigma_X = ${sdX}\\). The variable \\(Y\\) is defined as \\(Y = ${exprTex}\\). Find \\(\\sigma_Y\\).`,
            latex: `\\(\\sigma_Y = |a| \\cdot \\sigma_X\\)`,
            answer: sdY,
            answerTex: String(sdY),
            options: [],
            hintTex: [
                `\\sigma_{aX+b} = |a| \\cdot \\sigma_X \\quad (\\text{adding a constant } b \\text{ does not change spread})`,
                `\\sigma_Y = |${a}| \\cdot ${sdX} = ${absA} \\times ${sdX} = ${sdY}`
            ],
            explain: `<strong>Step 1:</strong> Use the linear transform rule for standard deviation:<br>` +
                     `\\(\\sigma_{aX+b} = |a| \\cdot \\sigma_X\\).<br><br>` +
                     `<strong>Note:</strong> Adding the constant \\(b = ${b}\\) shifts all values equally, so it does <em>not</em> change the spread.<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(a = ${a}\\), \\(\\sigma_X = ${sdX}\\):<br>` +
                     `\\(\\sigma_Y = |${a}| \\times ${sdX} = ${absA} \\times ${sdX} = ${sdY}\\).`
        };
    },

    /**
     * 9. qOutlierEffect - Medium (MC)
     * Does removing the outlier increase or decrease the mean?
     */
    qOutlierEffect() {
        // Decide whether the outlier is high or low
        const outlierHigh = MathUtils.pick([true, false]);

        // Generate a "normal" group of 5 values clustered around a base mean
        const baseMean = MathUtils.randInt(10, 25);
        const coreData = [];
        for (let i = 0; i < 5; i++) {
            coreData.push(baseMean + MathUtils.randInt(-3, 3));
        }

        // Create outlier far from the group
        const outlier = outlierHigh
            ? baseMean + MathUtils.randInt(20, 35)
            : baseMean - MathUtils.randInt(20, 35);

        const fullData = MathUtils.shuffle([...coreData, outlier]);

        const fullSum = fullData.reduce((s, v) => s + v, 0);
        const fullMean = fullSum / fullData.length;
        const coreSum = coreData.reduce((s, v) => s + v, 0);
        const coreMean = coreSum / coreData.length;

        // If outlier is high, removing it decreases the mean; if low, removing increases it
        const effectStr = outlierHigh ? 'decrease' : 'increase';
        const oppositeStr = outlierHigh ? 'increase' : 'decrease';
        const outlierDesc = outlierHigh ? 'much larger than' : 'much smaller than';

        const dataStr = fullData.join(',\\; ');
        const fullMeanRounded = Math.round(fullMean * 10) / 10;
        const coreMeanRounded = Math.round(coreMean * 10) / 10;

        const options = MathUtils.shuffle([
            { value: 1, tex: `\\text{${effectStr.charAt(0).toUpperCase() + effectStr.slice(1)} the mean}` },
            { value: 0, tex: `\\text{${oppositeStr.charAt(0).toUpperCase() + oppositeStr.slice(1)} the mean}` },
            { value: 0, tex: `\\text{Have no effect on the mean}` },
            { value: 0, tex: `\\text{Make the mean equal to the median}` }
        ]);

        return {
            type: 'mc',
            rule: 'Outlier Effect',
            difficulty: 'medium',
            text: `The dataset below contains one outlier (\\(${outlier}\\)). Removing it will:`,
            latex: `\\(\\{${dataStr}\\}\\)`,
            answer: 1,
            answerTex: `\\text{${effectStr.charAt(0).toUpperCase() + effectStr.slice(1)} the mean}`,
            options: options,
            hintTex: [
                `\\text{The value } ${outlier} \\text{ is ${outlierDesc} the other values.}`,
                `\\text{With outlier: } \\bar{x} \\approx ${fullMeanRounded},\\quad \\text{without: } \\bar{x} \\approx ${coreMeanRounded}`
            ],
            explain: `<strong>Step 1:</strong> The outlier \\(${outlier}\\) is <em>${outlierDesc}</em> the remaining values, which cluster around \\(${baseMean}\\).<br><br>` +
                     `<strong>Step 2:</strong> With the outlier, \\(\\bar{x} \\approx ${fullMeanRounded}\\). Without it, \\(\\bar{x} \\approx ${coreMeanRounded}\\).<br><br>` +
                     `<strong>Step 3:</strong> Removing this ${outlierHigh ? 'high' : 'low'} outlier will <strong>${effectStr}</strong> the mean.`
        };
    },

    /**
     * 10. qInterpretStatistic - Medium (MC)
     * Conceptual question: which measure is most appropriate for a described scenario?
     */
    qInterpretStatistic() {
        const scenarios = [
            {
                text: 'A real-estate agent wants to report the "typical" house price in a suburb where a few luxury mansions cost millions more than most homes. Which measure of central tendency is most appropriate?',
                latex: '',
                correctTex: '\\text{Median}',
                correctVal: 1,
                distractors: [
                    '\\text{Mean}',
                    '\\text{Mode}',
                    '\\text{Range}'
                ],
                explain: `<strong>Answer:</strong> <em>Median</em>.<br><br>` +
                         `The luxury mansions are <strong>high outliers</strong> that would inflate the mean, giving a misleading impression of typical prices. ` +
                         `The median is resistant to outliers and better represents the centre of a skewed distribution.`
            },
            {
                text: 'A shoe manufacturer wants to know which shoe size to stock the most of. Which measure of central tendency is most useful?',
                latex: '',
                correctTex: '\\text{Mode}',
                correctVal: 1,
                distractors: [
                    '\\text{Mean}',
                    '\\text{Median}',
                    '\\text{Standard deviation}'
                ],
                explain: `<strong>Answer:</strong> <em>Mode</em>.<br><br>` +
                         `Shoe sizes are discrete categories. The manufacturer needs to know the <strong>most frequently occurring</strong> size — the mode — to decide what to stock the most of.`
            },
            {
                text: 'The salaries at a company are roughly symmetric and bell-shaped with no extreme outliers. Which measure best describes the typical salary?',
                latex: '',
                correctTex: '\\text{Mean}',
                correctVal: 1,
                distractors: [
                    '\\text{Mode}',
                    '\\text{Median}',
                    '\\text{IQR}'
                ],
                explain: `<strong>Answer:</strong> <em>Mean</em>.<br><br>` +
                         `For a <strong>symmetric, unimodal distribution</strong> without significant outliers, the mean is the most precise and informative measure of central tendency, as it uses all the data values.`
            },
            {
                text: 'A dataset of exam scores is heavily left-skewed (most students scored high, but a few very low scores drag the tail down). Which measure of central tendency is most appropriate?',
                latex: '',
                correctTex: '\\text{Median}',
                correctVal: 1,
                distractors: [
                    '\\text{Mean}',
                    '\\text{Mode}',
                    '\\text{Variance}'
                ],
                explain: `<strong>Answer:</strong> <em>Median</em>.<br><br>` +
                         `In a skewed distribution the mean is pulled toward the tail. The <strong>median</strong> is resistant to skew and extreme values, making it the better measure of the centre for skewed data.`
            },
            {
                text: 'A teacher wants to describe how spread out the middle 50% of students\' test scores are. Which measure is most appropriate?',
                latex: '',
                correctTex: '\\text{IQR (Interquartile Range)}',
                correctVal: 1,
                distractors: [
                    '\\text{Range}',
                    '\\text{Mean}',
                    '\\text{Mode}'
                ],
                explain: `<strong>Answer:</strong> <em>IQR</em>.<br><br>` +
                         `The <strong>IQR = Q3 − Q1</strong> measures the spread of the middle 50% of data. Unlike the range, it is not affected by extreme values at either end.`
            }
        ];

        const chosen = MathUtils.pick(scenarios);

        // Build options: correct + 3 distractors (shuffled)
        const opts = [
            { value: 1, tex: chosen.correctTex },
            ...chosen.distractors.map(d => ({ value: 0, tex: d }))
        ];

        const shuffledOpts = MathUtils.shuffle(opts);

        return {
            type: 'mc',
            rule: 'Interpret Statistic',
            difficulty: 'medium',
            text: chosen.text,
            latex: chosen.latex,
            answer: 1,
            answerTex: chosen.correctTex,
            options: shuffledOpts,
            hintTex: [
                `\\text{Consider whether the data has outliers or skew.}`,
                `\\text{Mean is sensitive to outliers; median is resistant; mode suits categorical/discrete data.}`
            ],
            explain: chosen.explain
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => STATS_BASIC.qMean(),                 weight: 2, difficulty: 'easy'   },
            { fn: () => STATS_BASIC.qMedian(),               weight: 2, difficulty: 'easy'   },
            { fn: () => STATS_BASIC.qMode(),                  weight: 2, difficulty: 'easy'   },
            { fn: () => STATS_BASIC.qRange(),                 weight: 2, difficulty: 'easy'   },
            { fn: () => STATS_BASIC.qIQR(),                   weight: 2, difficulty: 'medium' },
            { fn: () => STATS_BASIC.qVarianceStdDev(),        weight: 2, difficulty: 'easy'   },
            { fn: () => STATS_BASIC.qLinearTransformMean(),   weight: 2, difficulty: 'medium' },
            { fn: () => STATS_BASIC.qLinearTransformSD(),     weight: 2, difficulty: 'medium' },
            { fn: () => STATS_BASIC.qOutlierEffect(),         weight: 1, difficulty: 'medium' },
            { fn: () => STATS_BASIC.qInterpretStatistic(),    weight: 1, difficulty: 'medium' }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (STATS_BASIC.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (STATS_BASIC.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (STATS_BASIC.level === 'hard') {
            // No hard questions defined; fall back to medium
            filtered = pool.filter(p => p.difficulty === 'medium');
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
        STATS_BASIC.score = 0;
        STATS_BASIC.total = 0;
        STATS_BASIC.streak = 0;
        STATS_BASIC.answered = false;
        STATS_BASIC.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="STATS_BASIC.unload()">Stats Basics (4.1–4.3)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Statistics Basics</h1>
                <p>IB Math AA 4.1–4.3 — Mean, Median, Mode, Range, IQR, SD &amp; Linear Transforms</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="STATS_BASIC.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="STATS_BASIC.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="STATS_BASIC.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="STATS_BASIC.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="sb-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="sb-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="sb-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="sb-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="sb-question-card">
                <span class="rule-tag"       id="sb-rule"></span>
                <span class="difficulty-tag" id="sb-difficulty"></span>
                <div class="question-text"   id="sb-text"></div>
                <div class="question-prompt" id="sb-latex"></div>
                <div id="sb-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section">
                <summary>Working Out</summary>
                <div class="workout-content" contenteditable="true"></div>
            </details>

            <!-- Hint box -->
            <div class="hint-box" id="sb-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="sb-feedback">
                <div class="feedback-title"       id="sb-feedback-title"></div>
                <div class="feedback-explanation" id="sb-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="sb-hint-btn"  onclick="STATS_BASIC.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="sb-next-btn" onclick="STATS_BASIC.next()" style="display:none;">Next Question</button>
            </div>
        `;

        STATS_BASIC.next();
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
        STATS_BASIC.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        STATS_BASIC.score = 0;
        STATS_BASIC.total = 0;
        STATS_BASIC.streak = 0;
        STATS_BASIC.updateStats();
        STATS_BASIC.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        STATS_BASIC.answered = false;
        STATS_BASIC.hintIndex = 0;
        STATS_BASIC.currentQ = STATS_BASIC.pickQuestion();
        const q = STATS_BASIC.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('sb-rule');
        if (ruleEl) ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('sb-difficulty');
        if (diffEl) {
            diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
            diffEl.className = 'difficulty-tag ' + q.difficulty;
        }

        // Question text
        const textEl = document.getElementById('sb-text');
        if (textEl) textEl.innerHTML = q.text;

        // LaTeX prompt
        const latexEl = document.getElementById('sb-latex');
        if (latexEl) latexEl.innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('sb-options-area');
        if (optArea) {
            if (q.type === 'mc') {
                let html = '<div class="options-grid">';
                q.options.forEach((opt, i) => {
                    html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="STATS_BASIC.checkMC(this)">\\(${opt.tex}\\)</button>`;
                });
                html += '</div>';
                optArea.innerHTML = html;
            } else {
                optArea.innerHTML = `
                    <div class="input-area">
                        <input type="number" step="any" class="lr-math-field" id="sb-input"
                               placeholder="Your answer" autocomplete="off"
                               onkeydown="if(event.key==='Enter') STATS_BASIC.checkFree()">
                        <button class="btn btn-primary" onclick="STATS_BASIC.checkFree()">Submit</button>
                    </div>
                `;
                setTimeout(() => {
                    const inp = document.getElementById('sb-input');
                    if (inp) inp.focus();
                }, 100);
            }
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('sb-hint-box');
        if (hintBox) {
            hintBox.classList.remove('show');
            hintBox.innerHTML = '';
        }

        const fb = document.getElementById('sb-feedback');
        if (fb) fb.classList.remove('show', 'correct', 'incorrect');

        const nextBtn = document.getElementById('sb-next-btn');
        if (nextBtn) nextBtn.style.display = 'none';

        const hintBtn = document.getElementById('sb-hint-btn');
        if (hintBtn) {
            hintBtn.style.display = '';
            hintBtn.disabled = false;
        }

        // Render KaTeX
        STATS_BASIC.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = STATS_BASIC.currentQ;
        if (!q || !q.hintTex || STATS_BASIC.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('sb-hint-box');
        if (!hintBox) return;

        const prevContent = STATS_BASIC.hintIndex === 0
            ? ''
            : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prevContent + `<span>\\(${q.hintTex[STATS_BASIC.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        STATS_BASIC.hintIndex++;

        if (STATS_BASIC.hintIndex >= q.hintTex.length) {
            const hintBtn = document.getElementById('sb-hint-btn');
            if (hintBtn) hintBtn.disabled = true;
        }

        STATS_BASIC.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (STATS_BASIC.answered) return;
        STATS_BASIC.answered = true;
        STATS_BASIC.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        // Disable all buttons and highlight correct
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            STATS_BASIC.score++;
            STATS_BASIC.streak++;
        } else {
            btn.classList.add('incorrect');
            STATS_BASIC.streak = 0;
        }

        STATS_BASIC.showFeedback(isCorrect);
        STATS_BASIC.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (STATS_BASIC.answered) return;

        const inp = document.getElementById('sb-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        STATS_BASIC.answered = true;
        STATS_BASIC.total++;
        inp.disabled = true;

        const q = STATS_BASIC.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.05);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            STATS_BASIC.score++;
            STATS_BASIC.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            STATS_BASIC.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement ? inp.parentElement.querySelector('.btn-primary') : null;
        if (submitBtn) submitBtn.disabled = true;

        STATS_BASIC.showFeedback(isCorrect);
        STATS_BASIC.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = STATS_BASIC.currentQ;
        const fb = document.getElementById('sb-feedback');
        const title = document.getElementById('sb-feedback-title');
        const explanation = document.getElementById('sb-feedback-explanation');
        if (!fb || !title || !explanation) return;

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = STATS_BASIC.streak > 1
                ? `Correct! (${STATS_BASIC.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint
        const nextBtn = document.getElementById('sb-next-btn');
        if (nextBtn) nextBtn.style.display = '';
        const hintBtn = document.getElementById('sb-hint-btn');
        if (hintBtn) hintBtn.style.display = 'none';

        STATS_BASIC.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl    = document.getElementById('sb-score');
        const totalEl    = document.getElementById('sb-total');
        const streakEl   = document.getElementById('sb-streak');
        const accEl      = document.getElementById('sb-accuracy');

        if (scoreEl)  scoreEl.textContent  = STATS_BASIC.score;
        if (totalEl)  totalEl.textContent  = STATS_BASIC.total;
        if (streakEl) streakEl.textContent = STATS_BASIC.streak;
        if (accEl) {
            accEl.textContent = STATS_BASIC.total > 0
                ? Math.round((STATS_BASIC.score / STATS_BASIC.total) * 100) + '%'
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
                        { left: '\\[', right: '\\]', display: true  },
                        { left: '$$',  right: '$$',  display: true  },
                        { left: '$',   right: '$',   display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['stats-basic'] = () => STATS_BASIC.load();
