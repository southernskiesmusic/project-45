/*
 * normal-distribution.js - IB Math AA 4.11: Normal Distribution
 * X ~ N(μ, σ²), standardization, probabilities, inverse normal
 */

const NORMAL_DIST = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       Z-TABLE (standard normal CDF at half-integer z)
       ──────────────────────────────────────────── */

    zTable: {
        0.0: 0.5000, 0.5: 0.6915, 1.0: 0.8413, 1.5: 0.9332, 2.0: 0.9772, 2.5: 0.9938, 3.0: 0.9987,
        '-0.5': 0.3085, '-1.0': 0.1587, '-1.5': 0.0668, '-2.0': 0.0228, '-2.5': 0.0062, '-3.0': 0.0013
    },
    Phi(z) { return this.zTable[String(z)] || 0.5; },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qStandardize - Easy (Free)
     * Given X~N(μ,σ²) and a value x, find z = (x-μ)/σ.
     * Constructed so z is a clean half-integer in {-2.5,...,2.5}.
     */
    qStandardize() {
        const validZ = [-2.5, -2.0, -1.5, -1.0, -0.5, 0.5, 1.0, 1.5, 2.0, 2.5];
        const z = MathUtils.pick(validZ);
        const sigma = MathUtils.pick([2, 4, 5, 10]);
        const mu = MathUtils.randInt(20, 80) * 2; // even number for clean arithmetic
        const x = mu + z * sigma;

        return {
            type: 'free',
            rule: 'Standardize',
            difficulty: 'easy',
            text: `A random variable \\(X \\sim N(${mu},\\,${sigma}^2)\\). Find the standardised value \\(z\\) for \\(x = ${x}\\).`,
            latex: `\\(z = \\dfrac{x - \\mu}{\\sigma}\\)`,
            answer: z,
            answerTex: String(z),
            options: [],
            hintTex: [
                `z = \\frac{x - \\mu}{\\sigma} = \\frac{${x} - ${mu}}{${sigma}}`,
                `z = \\frac{${x - mu}}{${sigma}} = ${z}`
            ],
            explain: `<strong>Step 1:</strong> Use the standardisation formula \\(z = \\dfrac{x - \\mu}{\\sigma}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute the values: \\(z = \\dfrac{${x} - ${mu}}{${sigma}} = \\dfrac{${x - mu}}{${sigma}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(z = ${z}\\).`
        };
    },

    /**
     * 2. qProbLessThan - Easy (MC)
     * Find P(X < x) = Phi(z).
     */
    qProbLessThan() {
        const validZ = [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0];
        const z = MathUtils.pick(validZ);
        const sigma = MathUtils.pick([2, 4, 5, 10]);
        const mu = MathUtils.randInt(20, 80) * 2;
        const x = mu + z * sigma;
        const correct = this.Phi(z);

        const allVals = Object.values(this.zTable).filter(v => v !== correct);
        MathUtils.shuffle(allVals);
        const distractors = allVals.slice(0, 3);

        const optionTexts = [correct, ...distractors];
        const options = optionTexts.map((v, i) => ({
            value: i === 0 ? 1 : 0,
            tex: v.toFixed(4)
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'P(X < x)',
            difficulty: 'easy',
            text: `Given \\(X \\sim N(${mu},\\,${sigma}^2)\\), find \\(P(X < ${x})\\).`,
            latex: '',
            answer: 1,
            answerTex: correct.toFixed(4),
            options: shuffled,
            hintTex: [
                `\\text{Standardise: } z = \\frac{${x} - ${mu}}{${sigma}} = ${z}`,
                `P(X < ${x}) = P(Z < ${z}) = \\Phi(${z}) = ${correct.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Standardise: \\(z = \\dfrac{${x} - ${mu}}{${sigma}} = ${z}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use the standard normal table:<br>` +
                     `\\(P(X < ${x}) = P(Z < ${z}) = \\Phi(${z}) = ${correct.toFixed(4)}\\).`
        };
    },

    /**
     * 3. qProbGreaterThan - Easy (MC)
     * Find P(X > x) = 1 - Phi(z).
     */
    qProbGreaterThan() {
        const validZ = [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0];
        const z = MathUtils.pick(validZ);
        const sigma = MathUtils.pick([2, 4, 5, 10]);
        const mu = MathUtils.randInt(20, 80) * 2;
        const x = mu + z * sigma;
        const phiZ = this.Phi(z);
        const correct = parseFloat((1 - phiZ).toFixed(4));

        // Distractors: wrong tail (Phi(z) itself), nearby values
        const allVals = [
            phiZ,                             // used wrong tail
            this.Phi(z + 0.5 > 2.5 ? z - 0.5 : z + 0.5),
            this.Phi(z - 0.5 < -2.5 ? z + 0.5 : z - 0.5)
        ];
        const distractors = [...new Set(allVals.map(v => v.toFixed(4)))]
            .filter(v => v !== correct.toFixed(4))
            .slice(0, 3);

        while (distractors.length < 3) {
            distractors.push(parseFloat((Math.random() * 0.4 + 0.1).toFixed(4)).toFixed(4));
        }

        const optionTexts = [correct.toFixed(4), ...distractors];
        const options = optionTexts.map((v, i) => ({
            value: i === 0 ? 1 : 0,
            tex: v
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'P(X > x)',
            difficulty: 'easy',
            text: `Given \\(X \\sim N(${mu},\\,${sigma}^2)\\), find \\(P(X > ${x})\\).`,
            latex: '',
            answer: 1,
            answerTex: correct.toFixed(4),
            options: shuffled,
            hintTex: [
                `\\text{Standardise: } z = \\frac{${x} - ${mu}}{${sigma}} = ${z}`,
                `P(X > ${x}) = 1 - \\Phi(${z}) = 1 - ${phiZ.toFixed(4)} = ${correct.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Standardise: \\(z = \\dfrac{${x} - ${mu}}{${sigma}} = ${z}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use the complement rule:<br>` +
                     `\\(P(X > ${x}) = 1 - P(X < ${x}) = 1 - \\Phi(${z})\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= 1 - ${phiZ.toFixed(4)} = ${correct.toFixed(4)}\\).`
        };
    },

    /**
     * 4. qProbBetween - Medium (MC)
     * Find P(a < X < b) = Phi(z2) - Phi(z1).
     */
    qProbBetween() {
        const validZ = [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0];
        // Pick two distinct z values with z1 < z2
        let z1, z2;
        do {
            z1 = MathUtils.pick(validZ);
            z2 = MathUtils.pick(validZ);
        } while (z1 >= z2);

        const sigma = MathUtils.pick([2, 4, 5, 10]);
        const mu = MathUtils.randInt(20, 80) * 2;
        const a = mu + z1 * sigma;
        const b = mu + z2 * sigma;

        const phi1 = this.Phi(z1);
        const phi2 = this.Phi(z2);
        const correct = parseFloat((phi2 - phi1).toFixed(4));

        // Distractors
        const d1 = parseFloat((phi2).toFixed(4));                     // forgot lower tail
        const d2 = parseFloat((phi1 + (1 - phi2)).toFixed(4));        // outside interval (complement)
        const d3 = parseFloat((phi2 + phi1).toFixed(4));              // added instead of subtracted

        const distractorPool = [d1, d2, d3].map(v => v.toFixed(4))
            .filter(v => v !== correct.toFixed(4) && parseFloat(v) > 0 && parseFloat(v) <= 1);
        const uniqueD = [...new Set(distractorPool)].slice(0, 3);
        while (uniqueD.length < 3) {
            uniqueD.push(parseFloat((correct + (uniqueD.length * 0.05 + 0.03) * (MathUtils.pick([1, -1]))).toFixed(4)).toFixed(4));
        }

        const optionTexts = [correct.toFixed(4), ...uniqueD];
        const options = optionTexts.map((v, i) => ({
            value: i === 0 ? 1 : 0,
            tex: v
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'P(a < X < b)',
            difficulty: 'medium',
            text: `Given \\(X \\sim N(${mu},\\,${sigma}^2)\\), find \\(P(${a} < X < ${b})\\).`,
            latex: '',
            answer: 1,
            answerTex: correct.toFixed(4),
            options: shuffled,
            hintTex: [
                `z_1 = \\frac{${a} - ${mu}}{${sigma}} = ${z1}, \\quad z_2 = \\frac{${b} - ${mu}}{${sigma}} = ${z2}`,
                `P(${a} < X < ${b}) = \\Phi(${z2}) - \\Phi(${z1}) = ${phi2.toFixed(4)} - ${phi1.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Standardise both bounds:<br>` +
                     `\\(z_1 = \\dfrac{${a} - ${mu}}{${sigma}} = ${z1}\\), \\quad \\(z_2 = \\dfrac{${b} - ${mu}}{${sigma}} = ${z2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the interval probability formula:<br>` +
                     `\\(P(${a} < X < ${b}) = \\Phi(${z2}) - \\Phi(${z1})\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(${phi2.toFixed(4)} - ${phi1.toFixed(4)} = ${correct.toFixed(4)}\\).`
        };
    },

    /**
     * 5. qSymmetricInterval - Medium (MC)
     * P(μ - kσ < X < μ + kσ) = 2Φ(k) - 1 for k ∈ {1, 2}.
     */
    qSymmetricInterval() {
        const k = MathUtils.pick([1, 2]);
        const sigma = MathUtils.pick([2, 4, 5, 10]);
        const mu = MathUtils.randInt(20, 80) * 2;
        const a = mu - k * sigma;
        const b = mu + k * sigma;

        const phiK = this.Phi(k);
        const correct = parseFloat((2 * phiK - 1).toFixed(4));  // 0.6827 or 0.9545

        // Fixed distractors for this well-known result
        const otherK = k === 1 ? 2 : 1;
        const phiOther = this.Phi(otherK);
        const d1 = parseFloat((2 * phiOther - 1).toFixed(4));   // the other symmetric interval
        const d2 = parseFloat((phiK).toFixed(4));               // forgot the "× 2 - 1" step
        const d3 = parseFloat((1 - correct).toFixed(4));         // complement error

        const distractorPool = [d1, d2, d3].map(v => v.toFixed(4))
            .filter(v => v !== correct.toFixed(4) && parseFloat(v) > 0 && parseFloat(v) < 1);
        const uniqueD = [...new Set(distractorPool)].slice(0, 3);
        while (uniqueD.length < 3) {
            uniqueD.push(parseFloat((correct - uniqueD.length * 0.05).toFixed(4)).toFixed(4));
        }

        const optionTexts = [correct.toFixed(4), ...uniqueD];
        const options = optionTexts.map((v, i) => ({
            value: i === 0 ? 1 : 0,
            tex: v
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Symmetric Interval',
            difficulty: 'medium',
            text: `Given \\(X \\sim N(${mu},\\,${sigma}^2)\\), find \\(P(${a} < X < ${b})\\).`,
            latex: `\\text{This is a symmetric interval of width } ${k}\\sigma \\text{ about the mean.}`,
            answer: 1,
            answerTex: correct.toFixed(4),
            options: shuffled,
            hintTex: [
                `\\text{The interval is } \\mu \\pm ${k}\\sigma, \\text{ so standardise to } z = \\pm ${k}`,
                `P(-${k} < Z < ${k}) = 2\\Phi(${k}) - 1 = 2(${phiK.toFixed(4)}) - 1`
            ],
            explain: `<strong>Step 1:</strong> Recognise the symmetric interval: \\(${a} = ${mu} - ${k}(${sigma})\\) and \\(${b} = ${mu} + ${k}(${sigma})\\).<br><br>` +
                     `<strong>Step 2:</strong> Standardise: the bounds become \\(z = -${k}\\) and \\(z = +${k}\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply the formula:<br>` +
                     `\\(P(-${k} < Z < ${k}) = 2\\Phi(${k}) - 1 = 2(${phiK.toFixed(4)}) - 1 = ${correct.toFixed(4)}\\).`
        };
    },

    /**
     * 6. qFindX - Medium (Free)
     * Given P(X < x) = p (clean z), find x = μ + z·σ.
     * μ and σ chosen so that x is an integer.
     */
    qFindX() {
        const validZ = [-2.0, -1.5, -1.0, -0.5, 0.5, 1.0, 1.5, 2.0];
        const z = MathUtils.pick(validZ);
        const sigma = MathUtils.pick([2, 4, 5, 10]);
        const mu = MathUtils.randInt(20, 80) * 2;
        const x = mu + z * sigma;    // guaranteed integer since mu even, z half-integer, sigma even
        const p = this.Phi(z);

        return {
            type: 'free',
            rule: 'Find x (Inverse)',
            difficulty: 'medium',
            text: `Given \\(X \\sim N(${mu},\\,${sigma}^2)\\) and \\(P(X < x) = ${p.toFixed(4)}\\), find the value of \\(x\\).`,
            latex: `\\(x = \\mu + z\\sigma\\)`,
            answer: x,
            answerTex: String(x),
            options: [],
            hintTex: [
                `\\text{Read off the z-value: } \\Phi(z) = ${p.toFixed(4)} \\implies z = ${z}`,
                `x = \\mu + z\\sigma = ${mu} + (${z})(${sigma}) = ${x}`
            ],
            explain: `<strong>Step 1:</strong> Identify the z-value from the table:<br>` +
                     `\\(\\Phi(z) = ${p.toFixed(4)} \\implies z = ${z}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use the inverse standardisation formula:<br>` +
                     `\\(x = \\mu + z\\sigma = ${mu} + (${z})(${sigma})\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(x = ${mu} + ${z * sigma} = ${x}\\).`
        };
    },

    /**
     * 7. qFindMean - Hard (Free)
     * Given P(X < a) = p (z known) and σ, find μ = a - z·σ.
     */
    qFindMean() {
        const validZ = [-2.0, -1.5, -1.0, -0.5, 0.5, 1.0, 1.5, 2.0];
        const z = MathUtils.pick(validZ);
        const sigma = MathUtils.pick([2, 4, 5, 10]);
        const mu = MathUtils.randInt(20, 80) * 2;   // target mean (integer)
        const a = mu + z * sigma;                    // the given x-value
        const p = this.Phi(z);

        return {
            type: 'free',
            rule: 'Find μ',
            difficulty: 'hard',
            text: `\\(X \\sim N(\\mu,\\,${sigma}^2)\\). Given that \\(P(X < ${a}) = ${p.toFixed(4)}\\), find \\(\\mu\\).`,
            latex: `\\(\\mu = a - z\\sigma\\)`,
            answer: mu,
            answerTex: String(mu),
            options: [],
            hintTex: [
                `\\text{From the table: } \\Phi(z) = ${p.toFixed(4)} \\implies z = ${z}`,
                `\\mu = a - z\\sigma = ${a} - (${z})(${sigma}) = ${a} - ${z * sigma} = ${mu}`
            ],
            explain: `<strong>Step 1:</strong> Look up the z-value: \\(\\Phi(z) = ${p.toFixed(4)} \\implies z = ${z}\\).<br><br>` +
                     `<strong>Step 2:</strong> Write the standardisation equation:<br>` +
                     `\\(z = \\dfrac{a - \\mu}{\\sigma} \\implies \\mu = a - z\\sigma\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(\\mu = ${a} - (${z})(${sigma}) = ${a} - ${z * sigma} = ${mu}\\).`
        };
    },

    /**
     * 8. qFindSigma - Hard (Free)
     * Given P(X < a) = p (z known) and μ, find σ = (a - μ)/z.
     */
    qFindSigma() {
        // Only use non-zero z so we don't divide by zero
        const validZ = [-2.0, -1.5, -1.0, 0.5, 1.0, 1.5, 2.0];
        const z = MathUtils.pick(validZ);
        const sigma = MathUtils.pick([2, 4, 5, 10]);   // target sigma (integer)
        const mu = MathUtils.randInt(20, 80) * 2;
        const a = mu + z * sigma;
        const p = this.Phi(z);

        return {
            type: 'free',
            rule: 'Find σ',
            difficulty: 'hard',
            text: `\\(X \\sim N(${mu},\\,\\sigma^2)\\). Given that \\(P(X < ${a}) = ${p.toFixed(4)}\\), find \\(\\sigma\\).`,
            latex: `\\(\\sigma = \\dfrac{a - \\mu}{z}\\)`,
            answer: sigma,
            answerTex: String(sigma),
            options: [],
            hintTex: [
                `\\text{From the table: } \\Phi(z) = ${p.toFixed(4)} \\implies z = ${z}`,
                `\\sigma = \\frac{a - \\mu}{z} = \\frac{${a} - ${mu}}{${z}} = \\frac{${a - mu}}{${z}} = ${sigma}`
            ],
            explain: `<strong>Step 1:</strong> Look up the z-value: \\(\\Phi(z) = ${p.toFixed(4)} \\implies z = ${z}\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange the standardisation formula:<br>` +
                     `\\(z = \\dfrac{a - \\mu}{\\sigma} \\implies \\sigma = \\dfrac{a - \\mu}{z}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(\\sigma = \\dfrac{${a} - ${mu}}{${z}} = \\dfrac{${a - mu}}{${z}} = ${sigma}\\).`
        };
    },

    /**
     * 9. qNormalContext - Medium (MC)
     * Real-world context (heights, weights, exam scores). Find probability using z-table.
     */
    qNormalContext() {
        const scenarios = [
            {
                noun: 'height of adult men in a town',
                varLabel: 'H',
                unit: 'cm',
                mu: 175, sigma: 10,
                template: (mu, sigma) => `The ${scenarios[0].noun} is modelled by \\(H \\sim N(${mu},\\,${sigma}^2)\\).`
            },
            {
                noun: 'mass of apples from an orchard',
                varLabel: 'W',
                unit: 'g',
                mu: 160, sigma: 20,
                template: (mu, sigma) => `The ${scenarios[1].noun} is modelled by \\(W \\sim N(${mu},\\,${sigma}^2)\\).`
            },
            {
                noun: 'score on a standardised test',
                varLabel: 'S',
                unit: 'marks',
                mu: 60, sigma: 10,
                template: (mu, sigma) => `The ${scenarios[2].noun} is modelled by \\(S \\sim N(${mu},\\,${sigma}^2)\\).`
            },
            {
                noun: 'daily temperature in a city',
                varLabel: 'T',
                unit: '°C',
                mu: 18, sigma: 4,
                template: (mu, sigma) => `The ${scenarios[3].noun} is modelled by \\(T \\sim N(${mu},\\,${sigma}^2)\\).`
            }
        ];

        const sc = MathUtils.pick(scenarios);
        const { varLabel, unit, mu, sigma } = sc;

        // Pick a clean z so we get an exact probability
        const validZ = [-2.0, -1.5, -1.0, -0.5, 0.5, 1.0, 1.5, 2.0];
        const z = MathUtils.pick(validZ);
        const x = mu + z * sigma;

        // Randomly choose < or >
        const lessThan = MathUtils.pick([true, false]);
        const phiZ = this.Phi(z);
        const correct = lessThan ? phiZ : parseFloat((1 - phiZ).toFixed(4));

        const contextText = sc.template(mu, sigma) +
            (lessThan
                ? ` Find the probability that a randomly selected value is less than ${x} ${unit}.`
                : ` Find the probability that a randomly selected value is greater than ${x} ${unit}.`);

        const allVals = Object.values(this.zTable).filter(v => v !== correct);
        MathUtils.shuffle(allVals);
        const distractors = allVals.slice(0, 3).map(v => v.toFixed(4));

        const optionTexts = [correct.toFixed(4), ...distractors];
        const options = optionTexts.map((v, i) => ({
            value: i === 0 ? 1 : 0,
            tex: v
        }));
        const shuffled = MathUtils.shuffle(options);

        const probNotation = lessThan
            ? `P(${varLabel} < ${x})`
            : `P(${varLabel} > ${x})`;
        const tailExplain = lessThan
            ? `\\Phi(${z}) = ${phiZ.toFixed(4)}`
            : `1 - \\Phi(${z}) = 1 - ${phiZ.toFixed(4)} = ${correct.toFixed(4)}`;

        return {
            type: 'mc',
            rule: 'Context Problem',
            difficulty: 'medium',
            text: contextText,
            latex: '',
            answer: 1,
            answerTex: correct.toFixed(4),
            options: shuffled,
            hintTex: [
                `z = \\frac{${x} - ${mu}}{${sigma}} = ${z}`,
                `${probNotation} = ${tailExplain}`
            ],
            explain: `<strong>Step 1:</strong> Identify the distribution: \\(${varLabel} \\sim N(${mu},\\,${sigma}^2)\\).<br><br>` +
                     `<strong>Step 2:</strong> Standardise: \\(z = \\dfrac{${x} - ${mu}}{${sigma}} = ${z}\\).<br><br>` +
                     `<strong>Step 3:</strong> Look up and apply:<br>` +
                     `\\(${probNotation} = ${tailExplain} = ${correct.toFixed(4)}\\).`
        };
    },

    /**
     * 10. qCompareProbs - Hard (MC)
     * Compare P(X > a) for X~N(μ1,σ1²) vs P(Y < b) for Y~N(μ2,σ2²).
     * Which is larger? Options: ">", "<", "=", "Cannot determine".
     */
    qCompareProbs() {
        const validZ = [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0];

        // Build two independent distributions and events
        const sigma1 = MathUtils.pick([2, 4, 5, 10]);
        const sigma2 = MathUtils.pick([2, 4, 5, 10]);
        const mu1 = MathUtils.randInt(20, 80) * 2;
        const mu2 = MathUtils.randInt(20, 80) * 2;

        const z1 = MathUtils.pick(validZ);
        let z2;
        do { z2 = MathUtils.pick(validZ); } while (z2 === z1);

        const a = mu1 + z1 * sigma1;
        const b = mu2 + z2 * sigma2;

        // p1 = P(X > a), p2 = P(Y < b)
        const p1 = parseFloat((1 - this.Phi(z1)).toFixed(4));
        const p2 = parseFloat(this.Phi(z2).toFixed(4));

        let correctTex, correctValue;
        if (p1 > p2) {
            correctTex = `P(X > ${a}) > P(Y < ${b})`;
            correctValue = '>';
        } else if (p1 < p2) {
            correctTex = `P(X > ${a}) < P(Y < ${b})`;
            correctValue = '<';
        } else {
            correctTex = `P(X > ${a}) = P(Y < ${b})`;
            correctValue = '=';
        }

        const options = [
            { value: p1 > p2 ? 1 : 0, tex: `P(X > ${a}) > P(Y < ${b})` },
            { value: p1 < p2 ? 1 : 0, tex: `P(X > ${a}) < P(Y < ${b})` },
            { value: p1 === p2 ? 1 : 0, tex: `P(X > ${a}) = P(Y < ${b})` },
            { value: 0, tex: `\\text{Cannot determine without a calculator}` }
        ];

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Compare Probabilities',
            difficulty: 'hard',
            text: `Let \\(X \\sim N(${mu1},\\,${sigma1}^2)\\) and \\(Y \\sim N(${mu2},\\,${sigma2}^2)\\).<br>` +
                  `Compare \\(P(X > ${a})\\) and \\(P(Y < ${b})\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `z_1 = \\frac{${a} - ${mu1}}{${sigma1}} = ${z1}, \\quad P(X > ${a}) = 1 - \\Phi(${z1}) = ${p1.toFixed(4)}`,
                `z_2 = \\frac{${b} - ${mu2}}{${sigma2}} = ${z2}, \\quad P(Y < ${b}) = \\Phi(${z2}) = ${p2.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Compute \\(P(X > ${a})\\):<br>` +
                     `\\(z_1 = \\dfrac{${a} - ${mu1}}{${sigma1}} = ${z1}\\),<br>` +
                     `\\(P(X > ${a}) = 1 - \\Phi(${z1}) = 1 - ${this.Phi(z1).toFixed(4)} = ${p1.toFixed(4)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute \\(P(Y < ${b})\\):<br>` +
                     `\\(z_2 = \\dfrac{${b} - ${mu2}}{${sigma2}} = ${z2}\\),<br>` +
                     `\\(P(Y < ${b}) = \\Phi(${z2}) = ${p2.toFixed(4)}\\).<br><br>` +
                     `<strong>Step 3:</strong> Compare: \\(${p1.toFixed(4)} ${correctValue} ${p2.toFixed(4)}\\), so \\(${correctTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => NORMAL_DIST.qStandardize(),       weight: 3, difficulty: 'easy'   },
            { fn: () => NORMAL_DIST.qProbLessThan(),      weight: 3, difficulty: 'easy'   },
            { fn: () => NORMAL_DIST.qProbGreaterThan(),   weight: 3, difficulty: 'easy'   },
            { fn: () => NORMAL_DIST.qProbBetween(),       weight: 2, difficulty: 'medium' },
            { fn: () => NORMAL_DIST.qSymmetricInterval(), weight: 2, difficulty: 'medium' },
            { fn: () => NORMAL_DIST.qFindX(),             weight: 2, difficulty: 'medium' },
            { fn: () => NORMAL_DIST.qFindMean(),          weight: 1, difficulty: 'hard'   },
            { fn: () => NORMAL_DIST.qFindSigma(),         weight: 1, difficulty: 'hard'   },
            { fn: () => NORMAL_DIST.qNormalContext(),     weight: 2, difficulty: 'medium' },
            { fn: () => NORMAL_DIST.qCompareProbs(),      weight: 1, difficulty: 'hard'   }
        ];

        let filtered = pool;
        if (NORMAL_DIST.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (NORMAL_DIST.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (NORMAL_DIST.level === 'hard') {
            filtered = pool.filter(p => p.difficulty === 'hard');
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
        NORMAL_DIST.score = 0;
        NORMAL_DIST.total = 0;
        NORMAL_DIST.streak = 0;
        NORMAL_DIST.answered = false;
        NORMAL_DIST.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="NORMAL_DIST.unload()">Normal Distribution (4.11)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Normal Distribution</h1>
                <p>IB Math AA 4.11 – X ~ N(μ, σ²) and standardization</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="NORMAL_DIST.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="NORMAL_DIST.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="NORMAL_DIST.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="NORMAL_DIST.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="norm-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="norm-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="norm-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="norm-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="norm-question-card">
                <span class="rule-tag" id="norm-rule"></span>
                <span class="difficulty-tag" id="norm-difficulty"></span>
                <div class="question-text" id="norm-text"></div>
                <div class="question-prompt" id="norm-latex"></div>
                <div id="norm-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="norm-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="norm-feedback">
                <div class="feedback-title" id="norm-feedback-title"></div>
                <div class="feedback-explanation" id="norm-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="norm-hint-btn" onclick="NORMAL_DIST.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="norm-next-btn" onclick="NORMAL_DIST.next()" style="display:none;">Next Question</button>
            </div>
        `;

        NORMAL_DIST.next();
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
        NORMAL_DIST.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        NORMAL_DIST.score = 0;
        NORMAL_DIST.total = 0;
        NORMAL_DIST.streak = 0;
        NORMAL_DIST.updateStats();
        NORMAL_DIST.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        NORMAL_DIST.answered = false;
        NORMAL_DIST.hintIndex = 0;
        NORMAL_DIST.currentQ = NORMAL_DIST.pickQuestion();
        const q = NORMAL_DIST.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('norm-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('norm-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('norm-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('norm-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('norm-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="NORMAL_DIST.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="norm-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')NORMAL_DIST.checkFree()">
                    <button class="btn btn-primary" onclick="NORMAL_DIST.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('norm-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('norm-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('norm-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('norm-next-btn').style.display = 'none';
        document.getElementById('norm-hint-btn').style.display = '';
        document.getElementById('norm-hint-btn').disabled = false;

        // Render KaTeX
        NORMAL_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = NORMAL_DIST.currentQ;
        if (!q || !q.hintTex || NORMAL_DIST.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('norm-hint-box');
        const hintContent = NORMAL_DIST.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[NORMAL_DIST.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        NORMAL_DIST.hintIndex++;

        if (NORMAL_DIST.hintIndex >= q.hintTex.length) {
            document.getElementById('norm-hint-btn').disabled = true;
        }

        NORMAL_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (NORMAL_DIST.answered) return;
        NORMAL_DIST.answered = true;
        NORMAL_DIST.total++;

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
            NORMAL_DIST.score++;
            NORMAL_DIST.streak++;
        } else {
            btn.classList.add('incorrect');
            NORMAL_DIST.streak = 0;
        }

        NORMAL_DIST.showFeedback(isCorrect);
        NORMAL_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (NORMAL_DIST.answered) return;

        const inp = document.getElementById('norm-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        NORMAL_DIST.answered = true;
        NORMAL_DIST.total++;
        inp.disabled = true;

        const q = NORMAL_DIST.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            NORMAL_DIST.score++;
            NORMAL_DIST.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            NORMAL_DIST.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        NORMAL_DIST.showFeedback(isCorrect);
        NORMAL_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = NORMAL_DIST.currentQ;
        const fb = document.getElementById('norm-feedback');
        const title = document.getElementById('norm-feedback-title');
        const explanation = document.getElementById('norm-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (NORMAL_DIST.streak > 1) {
                title.textContent = `Correct! (${NORMAL_DIST.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('norm-next-btn').style.display = '';
        document.getElementById('norm-hint-btn').style.display = 'none';

        NORMAL_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('norm-score');
        const totalEl = document.getElementById('norm-total');
        const streakEl = document.getElementById('norm-streak');
        const accEl = document.getElementById('norm-accuracy');

        if (scoreEl) scoreEl.textContent = NORMAL_DIST.score;
        if (totalEl) totalEl.textContent = NORMAL_DIST.total;
        if (streakEl) streakEl.textContent = NORMAL_DIST.streak;
        if (accEl) {
            accEl.textContent = NORMAL_DIST.total > 0
                ? Math.round((NORMAL_DIST.score / NORMAL_DIST.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['normal-distribution'] = () => NORMAL_DIST.load();
