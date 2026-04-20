/*
 * continuous-distributions.js - IB Math AA 4.12: Continuous Probability Distributions
 * PDF, CDF, uniform distribution, mean, variance, probabilities as areas
 */

const CONT_DIST = {
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
     * 1. qUniformProbability - Easy
     * X ~ Uniform(0, b). Find P(0 ≤ X ≤ c) = c/b.
     */
    qUniformProbability() {
        const b = MathUtils.pick([4, 5, 6, 8, 10]);
        const c = MathUtils.randInt(1, b - 1);

        // P(0 ≤ X ≤ c) = c/b
        const answer = c / b;
        const [sn, sd] = MathUtils.simplifyFraction(c, b);
        const answerTex = MathUtils.fractionTeX(c, b);
        const answerDisplay = Number.isInteger(answer) ? String(answer) : (sd === 1 ? String(sn) : answerTex);

        return {
            type: 'free',
            rule: 'Uniform Probability',
            difficulty: 'easy',
            text: `\\(X \\sim \\text{Uniform}(0,\\,${b})\\). Find \\(P(0 \\leq X \\leq ${c})\\). Give your answer as a decimal to 2 d.p. if not exact.`,
            latex: `\\(f(x) = \\dfrac{1}{${b}}\\) for \\(0 \\leq x \\leq ${b}\\)`,
            answer: answer,
            answerTex: answerDisplay,
            options: [],
            hintTex: [
                `P(a \\leq X \\leq c) = \\frac{c - a}{b - a} \\text{ for a Uniform distribution}`,
                `P(0 \\leq X \\leq ${c}) = \\frac{${c} - 0}{${b} - 0} = \\frac{${c}}{${b}} = ${answer.toFixed(2)}`
            ],
            explain: `<strong>Step 1:</strong> For \\(X \\sim \\text{Uniform}(a,b)\\), the probability of an interval is its length divided by the total width: \\(P(a \\leq X \\leq c) = \\dfrac{c - a}{b - a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Here \\(a = 0\\), \\(b = ${b}\\), \\(c = ${c}\\):<br>` +
                     `\\(P(0 \\leq X \\leq ${c}) = \\dfrac{${c} - 0}{${b} - 0} = \\dfrac{${c}}{${b}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(= ${answerDisplay}\\).`
        };
    },

    /**
     * 2. qUniformMean - Easy
     * Mean of Uniform(a, b) = (a+b)/2.
     */
    qUniformMean() {
        const a = MathUtils.randInt(0, 6);
        const b = a + MathUtils.randInt(2, 8);

        const mean = (a + b) / 2;
        const answerTex = Number.isInteger(mean) ? String(mean) : MathUtils.fractionTeX(a + b, 2);

        return {
            type: 'free',
            rule: 'Uniform Mean',
            difficulty: 'easy',
            text: `Find the mean of \\(X \\sim \\text{Uniform}(${a},\\,${b})\\).`,
            latex: '',
            answer: mean,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `E(X) = \\frac{a + b}{2} \\text{ for a Uniform distribution}`,
                `E(X) = \\frac{${a} + ${b}}{2} = \\frac{${a + b}}{2}`
            ],
            explain: `<strong>Step 1:</strong> The mean (expected value) of a uniform distribution on \\([a, b]\\) is the midpoint of the interval: \\(E(X) = \\dfrac{a + b}{2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(a = ${a}\\), \\(b = ${b}\\):<br>` +
                     `\\(E(X) = \\dfrac{${a} + ${b}}{2} = \\dfrac{${a + b}}{2} = ${answerTex}\\).`
        };
    },

    /**
     * 3. qUniformVariance - Medium
     * Var(Uniform(a, b)) = (b-a)²/12. Pick b-a ∈ {2, 4, 6}.
     */
    qUniformVariance() {
        const width = MathUtils.pick([2, 4, 6]);
        const a = MathUtils.randInt(0, 5);
        const b = a + width;

        // Var = width²/12
        const num = width * width;   // 4, 16, or 36
        const den = 12;
        const [sn, sd] = MathUtils.simplifyFraction(num, den);
        const answer = sn / sd;
        const answerTex = sd === 1 ? String(sn) : MathUtils.fractionTeX(sn, sd);

        return {
            type: 'free',
            rule: 'Uniform Variance',
            difficulty: 'medium',
            text: `Find the variance of \\(X \\sim \\text{Uniform}(${a},\\,${b})\\).`,
            latex: '',
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Var}(X) = \\frac{(b - a)^2}{12} \\text{ for a Uniform distribution}`,
                `\\text{Var}(X) = \\frac{(${b} - ${a})^2}{12} = \\frac{${width}^2}{12} = \\frac{${num}}{12}`
            ],
            explain: `<strong>Step 1:</strong> The variance of \\(X \\sim \\text{Uniform}(a, b)\\) is \\(\\text{Var}(X) = \\dfrac{(b-a)^2}{12}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(b - a = ${b} - ${a} = ${width}\\):<br>` +
                     `\\(\\text{Var}(X) = \\dfrac{${width}^2}{12} = \\dfrac{${num}}{12}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(= ${answerTex}\\).`
        };
    },

    /**
     * 4. qPDFNormalize - Medium
     * f(x) = k on [0, c]. Find k so that ∫₀ᶜ k dx = 1. Answer: k = 1/c.
     */
    qPDFNormalize() {
        const c = MathUtils.pick([2, 3, 4, 5]);

        // k × c = 1 ⟹ k = 1/c
        const answer = 1 / c;
        const answerTex = MathUtils.fractionTeX(1, c);

        return {
            type: 'free',
            rule: 'PDF Normalisation',
            difficulty: 'medium',
            text: `A continuous random variable \\(X\\) has probability density function \\(f(x) = k\\) for \\(0 \\leq x \\leq ${c}\\), and \\(f(x) = 0\\) elsewhere. What value of \\(k\\) makes \\(f\\) a valid PDF?`,
            latex: '',
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{A valid PDF requires } \\int_{-\\infty}^{\\infty} f(x)\\,dx = 1`,
                `\\int_0^{${c}} k\\,dx = k \\cdot ${c} = 1 \\implies k = \\frac{1}{${c}}`
            ],
            explain: `<strong>Step 1:</strong> For \\(f\\) to be a valid PDF, the total area under the curve must equal 1:<br>` +
                     `\\(\\displaystyle\\int_0^{${c}} k\\,dx = 1\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate the integral:<br>` +
                     `\\(k \\cdot [x]_0^{${c}} = k \\cdot ${c} = 1\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(k\\):<br>` +
                     `\\(k = \\dfrac{1}{${c}}\\).`
        };
    },

    /**
     * 5. qPDFLinear - Medium
     * f(x) = kx on [0, a]. ∫₀ᵃ kx dx = ka²/2 = 1 ⟹ k = 2/a². Ask for k.
     */
    qPDFLinear() {
        const a = MathUtils.pick([2, 3, 4]);

        // k = 2/a²
        const num = 2;
        const den = a * a;
        const [sn, sd] = MathUtils.simplifyFraction(num, den);
        const answer = sn / sd;
        const answerTex = sd === 1 ? String(sn) : MathUtils.fractionTeX(sn, sd);

        return {
            type: 'free',
            rule: 'Linear PDF',
            difficulty: 'medium',
            text: `A continuous random variable \\(X\\) has PDF \\(f(x) = kx\\) for \\(0 \\leq x \\leq ${a}\\), and \\(f(x) = 0\\) elsewhere. Find the value of \\(k\\) that makes \\(f\\) a valid PDF.`,
            latex: '',
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\int_0^{${a}} kx\\,dx = k \\cdot \\frac{x^2}{2}\\Bigg|_0^{${a}} = k \\cdot \\frac{${a}^2}{2} = 1`,
                `k \\cdot \\frac{${a * a}}{2} = 1 \\implies k = \\frac{2}{${a * a}}`
            ],
            explain: `<strong>Step 1:</strong> Apply the normalisation condition \\(\\displaystyle\\int_0^{${a}} kx\\,dx = 1\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate:<br>` +
                     `\\(k \\cdot \\left[\\dfrac{x^2}{2}\\right]_0^{${a}} = k \\cdot \\dfrac{${a}^2}{2} = k \\cdot \\dfrac{${a * a}}{2} = 1\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve for \\(k\\):<br>` +
                     `\\(k = \\dfrac{2}{${a * a}} = ${answerTex}\\).`
        };
    },

    /**
     * 6. qCDFUniform - Easy
     * CDF of Uniform(a, b): F(x) = (x-a)/(b-a). Find F(c) for given c.
     */
    qCDFUniform() {
        const a = MathUtils.randInt(0, 4);
        const b = a + MathUtils.pick([4, 5, 6, 8, 10]);
        const c = MathUtils.randInt(a + 1, b - 1);

        // F(c) = (c-a)/(b-a)
        const numVal = c - a;
        const denVal = b - a;
        const answer = numVal / denVal;
        const [sn, sd] = MathUtils.simplifyFraction(numVal, denVal);
        const answerTex = sd === 1 ? String(sn) : MathUtils.fractionTeX(sn, sd);

        return {
            type: 'free',
            rule: 'CDF Uniform',
            difficulty: 'easy',
            text: `\\(X \\sim \\text{Uniform}(${a},\\,${b})\\). Find the cumulative distribution function value \\(F(${c}) = P(X \\leq ${c})\\).`,
            latex: `\\(F(x) = \\dfrac{x - ${a}}{${b} - ${a}}\\) for \\(${a} \\leq x \\leq ${b}\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `F(x) = \\frac{x - a}{b - a} \\text{ for } a \\leq x \\leq b`,
                `F(${c}) = \\frac{${c} - ${a}}{${b} - ${a}} = \\frac{${numVal}}{${denVal}}`
            ],
            explain: `<strong>Step 1:</strong> The CDF of \\(X \\sim \\text{Uniform}(a, b)\\) is:<br>` +
                     `\\(F(x) = \\dfrac{x - a}{b - a}\\) for \\(a \\leq x \\leq b\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${c}\\), \\(a = ${a}\\), \\(b = ${b}\\):<br>` +
                     `\\(F(${c}) = \\dfrac{${c} - ${a}}{${b} - ${a}} = \\dfrac{${numVal}}{${denVal}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(= ${answerTex}\\).`
        };
    },

    /**
     * 7. qExpectedValue - Medium
     * f(x) = 2x/a² on [0, a]. E[X] = 2a/3. Pick a ∈ {3, 6, 9}.
     */
    qExpectedValue() {
        const a = MathUtils.pick([3, 6, 9]);

        // k = 2/a², E[X] = 2a/3
        const [sn, sd] = MathUtils.simplifyFraction(2 * a, 3);
        const answer = sn / sd;
        const answerTex = sd === 1 ? String(sn) : MathUtils.fractionTeX(sn, sd);

        const kTex = MathUtils.fractionTeX(2, a * a);

        return {
            type: 'free',
            rule: 'Expected Value',
            difficulty: 'medium',
            text: `A continuous random variable \\(X\\) has PDF \\(f(x) = ${kTex}x\\) for \\(0 \\leq x \\leq ${a}\\), and \\(0\\) elsewhere. Find \\(E(X)\\).`,
            latex: '',
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `E(X) = \\int_0^{${a}} x \\cdot f(x)\\,dx = \\int_0^{${a}} x \\cdot \\frac{2x}{${a}^2}\\,dx = \\frac{2}{${a * a}} \\int_0^{${a}} x^2\\,dx`,
                `= \\frac{2}{${a * a}} \\cdot \\frac{${a}^3}{3} = \\frac{2 \\cdot ${a * a * a}}{${a * a} \\cdot 3} = \\frac{2 \\cdot ${a}}{3}`
            ],
            explain: `<strong>Step 1:</strong> Use \\(E(X) = \\displaystyle\\int_0^{${a}} x \\cdot f(x)\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(f(x) = \\dfrac{2}{${a * a}}x\\):<br>` +
                     `\\(E(X) = \\dfrac{2}{${a * a}} \\displaystyle\\int_0^{${a}} x^2\\,dx = \\dfrac{2}{${a * a}} \\cdot \\left[\\dfrac{x^3}{3}\\right]_0^{${a}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate:<br>` +
                     `\\(E(X) = \\dfrac{2}{${a * a}} \\cdot \\dfrac{${a}^3}{3} = \\dfrac{2 \\times ${a * a * a}}{${a * a} \\times 3} = \\dfrac{2 \\times ${a}}{3} = ${answerTex}\\).`
        };
    },

    /**
     * 8. qProbInterval - Medium
     * f(x) = 2x on [0, 1]. P(a ≤ X ≤ b) = b² - a².
     * Pick a ∈ {0.1, 0.2, 0.3, 0.4}, b = a + 0.3.
     */
    qProbInterval() {
        const aVal = MathUtils.pick([0.1, 0.2, 0.3, 0.4]);
        const bVal = parseFloat((aVal + 0.3).toFixed(2));

        // P = b² - a²
        const answer = parseFloat((bVal * bVal - aVal * aVal).toFixed(4));
        const answerDisplay = answer.toFixed(2);

        return {
            type: 'free',
            rule: 'Probability Interval',
            difficulty: 'medium',
            text: `A continuous random variable \\(X\\) has PDF \\(f(x) = 2x\\) for \\(0 \\leq x \\leq 1\\). Find \\(P(${aVal} \\leq X \\leq ${bVal})\\). Give your answer to 2 d.p.`,
            latex: '',
            answer: answer,
            answerTex: answerDisplay,
            options: [],
            hintTex: [
                `P(${aVal} \\leq X \\leq ${bVal}) = \\int_{${aVal}}^{${bVal}} 2x\\,dx = \\left[x^2\\right]_{${aVal}}^{${bVal}}`,
                `= ${bVal}^2 - ${aVal}^2 = ${(bVal * bVal).toFixed(4)} - ${(aVal * aVal).toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Compute \\(P(${aVal} \\leq X \\leq ${bVal}) = \\displaystyle\\int_{${aVal}}^{${bVal}} 2x\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate:<br>` +
                     `\\(\\left[x^2\\right]_{${aVal}}^{${bVal}} = ${bVal}^2 - ${aVal}^2\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate:<br>` +
                     `\\(= ${(bVal * bVal).toFixed(4)} - ${(aVal * aVal).toFixed(4)} = ${answerDisplay}\\).`
        };
    },

    /**
     * 9. qMedian - Hard
     * f(x) = 2x on [0,1]. Find median m where ∫₀ᵐ 2x dx = 0.5.
     * m² = 0.5, so m = 1/√2 ≈ 0.7071.
     */
    qMedian() {
        const answer = 1 / Math.sqrt(2);

        return {
            type: 'free',
            rule: 'Median of PDF',
            difficulty: 'hard',
            text: `A continuous random variable \\(X\\) has PDF \\(f(x) = 2x\\) for \\(0 \\leq x \\leq 1\\). Find the median \\(m\\) of \\(X\\). Give your answer to 4 d.p.`,
            latex: '',
            answer: answer,
            answerTex: `\\dfrac{1}{\\sqrt{2}} \\approx 0.7071`,
            options: [],
            hintTex: [
                `\\text{The median } m \\text{ satisfies } \\int_0^m f(x)\\,dx = 0.5`,
                `\\int_0^m 2x\\,dx = \\left[x^2\\right]_0^m = m^2 = 0.5 \\implies m = \\sqrt{0.5} = \\frac{1}{\\sqrt{2}}`
            ],
            explain: `<strong>Step 1:</strong> The median \\(m\\) satisfies \\(P(X \\leq m) = 0.5\\), i.e. \\(\\displaystyle\\int_0^m 2x\\,dx = 0.5\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate:<br>` +
                     `\\(\\left[x^2\\right]_0^m = m^2 = 0.5\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve:<br>` +
                     `\\(m = \\sqrt{0.5} = \\dfrac{1}{\\sqrt{2}} \\approx 0.7071\\).`
        };
    },

    /**
     * 10. qModeUniform - Easy (MC)
     * For f(x) = 2x on [0,1], the mode is where f(x) is maximum, i.e. x = 1.
     */
    qModeUniform() {
        // f(x) = 2x on [0,1] is strictly increasing, so maximum is at x = 1 → mode = 1

        const options = MathUtils.shuffle([
            { value: 1, tex: `x = 1 \\text{ (where } f(x) \\text{ is maximum)}` },
            { value: 0, tex: `x = 0.5 \\text{ (the mean)}` },
            { value: 0, tex: `x = 0 \\text{ (the minimum)}` },
            { value: 0, tex: `\\text{Any value in } [0,1] \\text{ (no unique mode)}` }
        ]);

        return {
            type: 'mc',
            rule: 'Mode of PDF',
            difficulty: 'easy',
            text: `A continuous random variable \\(X\\) has PDF \\(f(x) = 2x\\) for \\(0 \\leq x \\leq 1\\). What is the mode of \\(X\\)?`,
            latex: `\\text{The mode is the value of } x \\text{ where } f(x) \\text{ is maximised.}`,
            answer: 1,
            answerTex: `x = 1 \\text{ (where } f(x) \\text{ is maximum)}`,
            options: options,
            hintTex: [
                `\\text{The mode of a continuous distribution is where } f(x) \\text{ reaches its maximum value.}`,
                `f(x) = 2x \\text{ is increasing on } [0,1], \\text{ so the maximum occurs at } x = 1`
            ],
            explain: `<strong>Step 1:</strong> The mode of a continuous distribution is the value of \\(x\\) that maximises \\(f(x)\\).<br><br>` +
                     `<strong>Step 2:</strong> Since \\(f(x) = 2x\\) is a strictly increasing linear function on \\([0, 1]\\), it reaches its maximum at the right endpoint.<br><br>` +
                     `<strong>Step 3:</strong> Therefore the mode is \\(x = 1\\), where \\(f(1) = 2\\) is the highest value of the PDF.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => CONT_DIST.qUniformProbability(), weight: 3, difficulty: 'easy'   }, // 0
            { fn: () => CONT_DIST.qUniformMean(),        weight: 3, difficulty: 'easy'   }, // 1
            { fn: () => CONT_DIST.qUniformVariance(),    weight: 2, difficulty: 'medium' }, // 2
            { fn: () => CONT_DIST.qPDFNormalize(),       weight: 2, difficulty: 'medium' }, // 3
            { fn: () => CONT_DIST.qPDFLinear(),          weight: 2, difficulty: 'medium' }, // 4
            { fn: () => CONT_DIST.qCDFUniform(),         weight: 3, difficulty: 'easy'   }, // 5
            { fn: () => CONT_DIST.qExpectedValue(),      weight: 2, difficulty: 'medium' }, // 6
            { fn: () => CONT_DIST.qProbInterval(),       weight: 2, difficulty: 'medium' }, // 7
            { fn: () => CONT_DIST.qMedian(),             weight: 1, difficulty: 'hard'   }, // 8
            { fn: () => CONT_DIST.qModeUniform(),        weight: 3, difficulty: 'easy'   }  // 9
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (CONT_DIST.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (CONT_DIST.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (CONT_DIST.level === 'hard') {
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
        CONT_DIST.score = 0;
        CONT_DIST.total = 0;
        CONT_DIST.streak = 0;
        CONT_DIST.answered = false;
        CONT_DIST.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="CONT_DIST.unload()">Continuous Distributions (4.12)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Continuous Distributions</h1>
                <p>IB Math AA 4.12 &mdash; PDF, CDF, mean, variance of continuous distributions</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="CONT_DIST.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="CONT_DIST.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="CONT_DIST.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="CONT_DIST.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="cdist-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="cdist-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="cdist-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="cdist-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="cdist-question-card">
                <span class="rule-tag" id="cdist-rule"></span>
                <span class="difficulty-tag" id="cdist-difficulty"></span>
                <div class="question-text" id="cdist-text"></div>
                <div class="question-prompt" id="cdist-latex"></div>
                <div id="cdist-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="cdist-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="cdist-feedback">
                <div class="feedback-title" id="cdist-feedback-title"></div>
                <div class="feedback-explanation" id="cdist-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cdist-hint-btn" onclick="CONT_DIST.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cdist-next-btn" onclick="CONT_DIST.next()" style="display:none;">Next Question</button>
            </div>
        `;

        CONT_DIST.next();
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
        CONT_DIST.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        CONT_DIST.score = 0;
        CONT_DIST.total = 0;
        CONT_DIST.streak = 0;
        CONT_DIST.updateStats();
        CONT_DIST.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        CONT_DIST.answered = false;
        CONT_DIST.hintIndex = 0;
        CONT_DIST.currentQ = CONT_DIST.pickQuestion();
        const q = CONT_DIST.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('cdist-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('cdist-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('cdist-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('cdist-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('cdist-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="CONT_DIST.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="cdist-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')CONT_DIST.checkFree()">
                    <button class="btn btn-primary" onclick="CONT_DIST.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('cdist-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('cdist-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('cdist-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('cdist-next-btn').style.display = 'none';
        document.getElementById('cdist-hint-btn').style.display = '';
        document.getElementById('cdist-hint-btn').disabled = false;

        // Render KaTeX
        CONT_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = CONT_DIST.currentQ;
        if (!q || !q.hintTex || CONT_DIST.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('cdist-hint-box');
        const hintContent = CONT_DIST.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[CONT_DIST.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        CONT_DIST.hintIndex++;

        if (CONT_DIST.hintIndex >= q.hintTex.length) {
            document.getElementById('cdist-hint-btn').disabled = true;
        }

        CONT_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (CONT_DIST.answered) return;
        CONT_DIST.answered = true;
        CONT_DIST.total++;

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
            CONT_DIST.score++;
            CONT_DIST.streak++;
        } else {
            btn.classList.add('incorrect');
            CONT_DIST.streak = 0;
        }

        CONT_DIST.showFeedback(isCorrect);
        CONT_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (CONT_DIST.answered) return;

        const inp = document.getElementById('cdist-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        CONT_DIST.answered = true;
        CONT_DIST.total++;
        inp.disabled = true;

        const q = CONT_DIST.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            CONT_DIST.score++;
            CONT_DIST.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            CONT_DIST.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        CONT_DIST.showFeedback(isCorrect);
        CONT_DIST.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = CONT_DIST.currentQ;
        const fb = document.getElementById('cdist-feedback');
        const title = document.getElementById('cdist-feedback-title');
        const explanation = document.getElementById('cdist-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (CONT_DIST.streak > 1) {
                title.textContent = `Correct! (${CONT_DIST.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('cdist-next-btn').style.display = '';
        document.getElementById('cdist-hint-btn').style.display = 'none';

        CONT_DIST.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('cdist-score');
        const totalEl  = document.getElementById('cdist-total');
        const streakEl = document.getElementById('cdist-streak');
        const accEl    = document.getElementById('cdist-accuracy');

        if (scoreEl)  scoreEl.textContent  = CONT_DIST.score;
        if (totalEl)  totalEl.textContent  = CONT_DIST.total;
        if (streakEl) streakEl.textContent = CONT_DIST.streak;
        if (accEl) {
            accEl.textContent = CONT_DIST.total > 0
                ? Math.round((CONT_DIST.score / CONT_DIST.total) * 100) + '%'
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
                        { left: '$',  right: '$',  display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['continuous-distributions'] = () => CONT_DIST.load();
}
