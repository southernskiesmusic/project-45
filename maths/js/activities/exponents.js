/*
 * exponents.js - IB Math AA 2.8: Exponents
 * Exponent laws, fractional/negative exponents, exponential equations & graphs
 */

const EXPONENTS = {
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
     * 1. qEvaluatePower - Easy (Free)
     * Evaluate b^n, including negative and fractional exponents.
     */
    qEvaluatePower() {
        const type = MathUtils.randInt(0, 2);
        let base, exp, answer, latexQ, answerTex, hintTex, explain;

        if (type === 0) {
            // Simple positive integer exponent
            base = MathUtils.randInt(2, 6);
            exp = MathUtils.randInt(2, 4);
            answer = Math.pow(base, exp);
            latexQ = `\\(${base}^{${exp}}\\)`;
            answerTex = String(answer);
            hintTex = [
                `${base}^{${exp}} = \\underbrace{${base} \\times ${base}${exp >= 3 ? ' \\times ' + base : ''}${exp >= 4 ? ' \\times ' + base : ''}}_{${exp}\\text{ times}}`,
                `= ${answer}`
            ];
            explain = `<strong>Step 1:</strong> \\(${base}^{${exp}}\\) means multiply \\(${base}\\) by itself \\(${exp}\\) times.<br><br>` +
                      `<strong>Step 2:</strong> \\(${base}^{${exp}} = ${answer}\\).`;
        } else if (type === 1) {
            // Negative exponent: b^(-n) = 1/b^n
            base = MathUtils.randInt(2, 5);
            exp = MathUtils.randInt(1, 3);
            const denom = Math.pow(base, exp);
            answer = 1 / denom;
            latexQ = `\\(${base}^{-${exp}}\\)`;
            const [sn, sd] = MathUtils.simplifyFraction(1, denom);
            answerTex = MathUtils.fractionTeX(1, denom);
            hintTex = [
                `a^{-n} = \\frac{1}{a^n}`,
                `${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}} = \\frac{1}{${denom}}`
            ];
            explain = `<strong>Step 1:</strong> Apply the negative exponent rule: \\(a^{-n} = \\frac{1}{a^n}\\).<br><br>` +
                      `<strong>Step 2:</strong> \\(${base}^{-${exp}} = \\frac{1}{${base}^{${exp}}} = \\frac{1}{${denom}}\\).`;
        } else {
            // Square root as exponent: b^(1/2)
            const perfectSquares = [4, 9, 16, 25, 36, 49, 64];
            base = MathUtils.pick(perfectSquares);
            answer = Math.round(Math.sqrt(base));
            exp = 0.5;
            latexQ = `\\(${base}^{1/2}\\)`;
            answerTex = String(answer);
            hintTex = [
                `a^{1/2} = \\sqrt{a}`,
                `${base}^{1/2} = \\sqrt{${base}} = ${answer}`
            ];
            explain = `<strong>Step 1:</strong> A fractional exponent of \\(\\frac{1}{2}\\) means the square root.<br><br>` +
                      `<strong>Step 2:</strong> \\(${base}^{1/2} = \\sqrt{${base}} = ${answer}\\).`;
        }

        return {
            type: 'free',
            rule: 'Evaluate Power',
            difficulty: 'easy',
            text: 'Evaluate the following expression. Give an exact value (use decimals for fractions, e.g. 0.04).',
            latex: latexQ,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: hintTex,
            explain: explain
        };
    },

    /**
     * 2. qEvaluateProduct - Easy (Free)
     * Evaluate a^m * a^n using the product rule.
     */
    qEvaluateProduct() {
        const base = MathUtils.randInt(2, 5);
        const m = MathUtils.randInt(1, 4);
        const n = MathUtils.randInt(1, 4);
        const answer = Math.pow(base, m + n);

        return {
            type: 'free',
            rule: 'Product Rule',
            difficulty: 'easy',
            text: 'Evaluate the following expression.',
            latex: `\\(${base}^{${m}} \\times ${base}^{${n}}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `a^m \\times a^n = a^{m+n}`,
                `${base}^{${m}} \\times ${base}^{${n}} = ${base}^{${m}+${n}} = ${base}^{${m + n}} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Apply the product rule: \\(a^m \\times a^n = a^{m+n}\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(${base}^{${m}} \\times ${base}^{${n}} = ${base}^{${m + n}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(${base}^{${m + n}} = ${answer}\\).`
        };
    },

    /**
     * 3. qSimplifyToAk - Medium (Free)
     * Simplify a^m * a^n / a^p to a^k form - find k.
     */
    qSimplifyToAk() {
        const vars = ['a', 'x', 'b', 'p'];
        const v = MathUtils.pick(vars);

        const type = MathUtils.randInt(0, 2);
        let expr, answer, hintTex, explain;

        if (type === 0) {
            // a^m * a^n = a^?
            const m = MathUtils.randInt(2, 7);
            const n = MathUtils.randInt(2, 7);
            answer = m + n;
            expr = `\\(${v}^{${m}} \\times ${v}^{${n}} = ${v}^{k}\\)`;
            hintTex = [
                `${v}^m \\times ${v}^n = ${v}^{m+n}`,
                `k = ${m} + ${n} = ${answer}`
            ];
            explain = `<strong>Step 1:</strong> Product rule: \\(${v}^m \\times ${v}^n = ${v}^{m+n}\\).<br><br>` +
                      `<strong>Step 2:</strong> \\(k = ${m} + ${n} = ${answer}\\).`;
        } else if (type === 1) {
            // a^m / a^n = a^?
            const m = MathUtils.randInt(5, 12);
            const n = MathUtils.randInt(1, m - 1);
            answer = m - n;
            expr = `\\(\\dfrac{${v}^{${m}}}{${v}^{${n}}} = ${v}^{k}\\)`;
            hintTex = [
                `\\frac{${v}^m}{${v}^n} = ${v}^{m-n}`,
                `k = ${m} - ${n} = ${answer}`
            ];
            explain = `<strong>Step 1:</strong> Quotient rule: \\(\\frac{${v}^m}{${v}^n} = ${v}^{m-n}\\).<br><br>` +
                      `<strong>Step 2:</strong> \\(k = ${m} - ${n} = ${answer}\\).`;
        } else {
            // (a^m)^n = a^?
            const m = MathUtils.randInt(2, 5);
            const n = MathUtils.randInt(2, 4);
            answer = m * n;
            expr = `\\((${v}^{${m}})^{${n}} = ${v}^{k}\\)`;
            hintTex = [
                `(${v}^m)^n = ${v}^{mn}`,
                `k = ${m} \\times ${n} = ${answer}`
            ];
            explain = `<strong>Step 1:</strong> Power-of-a-power rule: \\((${v}^m)^n = ${v}^{mn}\\).<br><br>` +
                      `<strong>Step 2:</strong> \\(k = ${m} \\times ${n} = ${answer}\\).`;
        }

        return {
            type: 'free',
            rule: 'Simplify to a^k',
            difficulty: 'medium',
            text: 'Find the value of \\(k\\).',
            latex: expr,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: hintTex,
            explain: explain
        };
    },

    /**
     * 4. qNegativeExponent - Easy (MC)
     * What is b^(-n)? Options include common errors.
     */
    qNegativeExponent() {
        const base = MathUtils.randInt(2, 6);
        const n = MathUtils.randInt(1, 3);
        const denom = Math.pow(base, n);

        const correctTex = `\\frac{1}{${denom}}`;

        // Distractors: common errors
        const distractors = [];
        // Error 1: -(b^n) instead of 1/(b^n)
        distractors.push(`-${denom}`);
        // Error 2: 1/(-b^n) confusion: negative base
        distractors.push(`-\\frac{1}{${denom}}`);
        // Error 3: b * (-n) confusion
        distractors.push(`${-base * n}`);

        const optionTexts = [correctTex, ...distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Negative Exponent',
            difficulty: 'easy',
            text: 'Evaluate the following expression.',
            latex: `\\(${base}^{-${n}}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `a^{-n} = \\frac{1}{a^n}`,
                `${base}^{-${n}} = \\frac{1}{${base}^{${n}}} = \\frac{1}{${denom}}`
            ],
            explain: `<strong>Step 1:</strong> The negative exponent rule states \\(a^{-n} = \\frac{1}{a^n}\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(${base}^{-${n}} = \\frac{1}{${base}^{${n}}} = \\frac{1}{${denom}}\\).<br><br>` +
                     `<strong>Common error:</strong> \\(${base}^{-${n}} \\neq -${denom}\\). A negative exponent gives a reciprocal, not a negative number.`
        };
    },

    /**
     * 5. qFractionalExponent - Medium (Free)
     * Evaluate expressions like 27^(2/3), 16^(3/4) etc.
     */
    qFractionalExponent() {
        // Pairs of (base, root) that give clean integer roots
        const options = [
            { base: 8, root: 3, rootVal: 2 },     // 8^(1/3) = 2
            { base: 27, root: 3, rootVal: 3 },     // 27^(1/3) = 3
            { base: 64, root: 3, rootVal: 4 },     // 64^(1/3) = 4
            { base: 125, root: 3, rootVal: 5 },    // 125^(1/3) = 5
            { base: 16, root: 4, rootVal: 2 },     // 16^(1/4) = 2
            { base: 81, root: 4, rootVal: 3 },     // 81^(1/4) = 3
            { base: 16, root: 2, rootVal: 4 },     // 16^(1/2) = 4
            { base: 25, root: 2, rootVal: 5 },     // 25^(1/2) = 5
            { base: 32, root: 5, rootVal: 2 },     // 32^(1/5) = 2
            { base: 4, root: 2, rootVal: 2 },      // 4^(1/2) = 2
            { base: 9, root: 2, rootVal: 3 }       // 9^(1/2) = 3
        ];

        const choice = MathUtils.pick(options);
        // Power numerator: 2 or 3 (keep answer manageable)
        const power = MathUtils.randInt(2, 3);
        const answer = Math.pow(choice.rootVal, power);

        const fracTex = `\\frac{${power}}{${choice.root}}`;

        return {
            type: 'free',
            rule: 'Fractional Exponent',
            difficulty: 'medium',
            text: 'Evaluate the following expression.',
            latex: `\\(${choice.base}^{${fracTex}}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `a^{p/q} = \\left(\\sqrt[q]{a}\\right)^p = \\left(a^{1/q}\\right)^p`,
                `${choice.base}^{${fracTex}} = \\left(\\sqrt[${choice.root}]{${choice.base}}\\right)^{${power}} = ${choice.rootVal}^{${power}} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Rewrite using the rule \\(a^{p/q} = \\left(\\sqrt[q]{a}\\right)^p\\).<br><br>` +
                     `<strong>Step 2:</strong> Find the root: \\(\\sqrt[${choice.root}]{${choice.base}} = ${choice.rootVal}\\).<br><br>` +
                     `<strong>Step 3:</strong> Raise to the power: \\(${choice.rootVal}^{${power}} = ${answer}\\).`
        };
    },

    /**
     * 6. qSameBaseEquation - Medium (Free)
     * Solve 2^(ax+b) = 2^c by equating exponents (or convert to same base first).
     */
    qSameBaseEquation() {
        // Use base 2 or 3 family
        const families = [
            { small: 2, large: 8, largePow: 3, name: '2', largeName: '8' },
            { small: 2, large: 16, largePow: 4, name: '2', largeName: '16' },
            { small: 2, large: 4, largePow: 2, name: '2', largeName: '4' },
            { small: 3, large: 9, largePow: 2, name: '3', largeName: '9' },
            { small: 3, large: 27, largePow: 3, name: '3', largeName: '27' },
            { small: 5, large: 25, largePow: 2, name: '5', largeName: '25' }
        ];
        const fam = MathUtils.pick(families);

        // Equation: small^(coeff*x) = large^(x + shift)
        // => small^(coeff*x) = small^(largePow*(x + shift))
        // => coeff*x = largePow*x + largePow*shift
        // => (coeff - largePow)*x = largePow*shift
        // Choose coeff so (coeff - largePow) divides largePow*shift cleanly
        const shift = MathUtils.nonZeroRandInt(-3, 3);
        // Make coeff different from largePow
        let coeff;
        do {
            coeff = MathUtils.randInt(1, 6);
        } while (coeff === fam.largePow);

        const diff = coeff - fam.largePow;
        const rhs = fam.largePow * shift;
        // x = rhs / diff
        // Check it's a clean integer or simple fraction
        const gcdVal = MathUtils.gcd(Math.abs(rhs), Math.abs(diff));
        const ansNum = rhs / gcdVal;
        const ansDen = diff / gcdVal;
        // Normalize sign
        const [sn, sd] = MathUtils.simplifyFraction(rhs, diff);
        const answer = sn / sd;
        const answerTex = sd === 1 ? String(sn) : MathUtils.fractionTeX(rhs, diff);

        // Display equation
        let leftExp = coeff === 1 ? 'x' : `${coeff}x`;
        let rightExp = shift > 0 ? `x + ${shift}` : `x - ${Math.abs(shift)}`;

        return {
            type: 'free',
            rule: 'Same Base Equation',
            difficulty: 'medium',
            text: 'Solve for \\(x\\).',
            latex: `\\(${fam.name}^{${leftExp}} = ${fam.largeName}^{${rightExp}}\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Write both sides with base } ${fam.small}: \\quad ${fam.largeName} = ${fam.small}^{${fam.largePow}}`,
                `${fam.small}^{${leftExp}} = ${fam.small}^{${fam.largePow}(${rightExp})} \\implies ${leftExp} = ${fam.largePow}(${rightExp})`
            ],
            explain: `<strong>Step 1:</strong> Rewrite \\(${fam.largeName}\\) as \\(${fam.small}^{${fam.largePow}}\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(${fam.small}^{${leftExp}} = ${fam.small}^{${fam.largePow}(${rightExp})}\\).<br><br>` +
                     `<strong>Step 3:</strong> Equate exponents: \\(${leftExp} = ${fam.largePow}(${rightExp})\\).<br><br>` +
                     `<strong>Step 4:</strong> Expand: \\(${coeff}x = ${fam.largePow}x ${shift > 0 ? '+' : '-'} ${Math.abs(fam.largePow * shift)}\\).<br><br>` +
                     `<strong>Step 5:</strong> Solve: \\(${diff}x = ${rhs}\\), so \\(x = ${answerTex}\\).`
        };
    },

    /**
     * 7. qSameBaseQuadratic - Hard (Free)
     * Solve 4^(x^2) = 8^x type by converting to common base and solving quadratic.
     */
    qSameBaseQuadratic() {
        // Pattern: base1^(x^2) = base2^(bx + c) where both share a common base
        // 4^(x^2) = 2^(kx) => 2^(2x^2) = 2^(kx) => 2x^2 = kx => 2x^2 - kx = 0
        // For nicer solutions, we do: 4^(x^2 - a) = 8^(bx)
        // => 2^(2(x^2 - a)) = 2^(3bx) => 2x^2 - 2a = 3bx
        // Simpler approach: pick two solutions and work backward

        const x1 = 0;
        const x2 = MathUtils.nonZeroRandInt(-3, 3);

        // Equation: 2^(2x^2) = 2^(kx) where k = 2*x2 (since 2x^2 = kx => x(2x - k) = 0)
        // But let's present as 4^(x^2) = 2^(kx)
        const k = 2 * x2;

        // The equation 4^(x^2) = 2^(kx)
        // => 2^(2x^2) = 2^(kx) => 2x^2 = kx => 2x^2 - kx = 0 => x(2x - k) = 0
        // x = 0 or x = k/2 = x2

        // Ask for the non-zero solution
        const answer = x2;

        let kTex;
        if (k === 1) kTex = 'x';
        else if (k === -1) kTex = '-x';
        else kTex = `${k}x`;

        return {
            type: 'free',
            rule: 'Quadratic Exponent',
            difficulty: 'hard',
            text: 'Find the non-zero solution for \\(x\\).',
            latex: `\\(4^{x^2} = 2^{${kTex}}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `4 = 2^2, \\text{ so } 4^{x^2} = 2^{2x^2}`,
                `2^{2x^2} = 2^{${kTex}} \\implies 2x^2 = ${kTex} \\implies 2x^2 - ${kTex} = 0`
            ],
            explain: `<strong>Step 1:</strong> Rewrite with base 2: \\(4^{x^2} = (2^2)^{x^2} = 2^{2x^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Equate exponents: \\(2x^2 = ${k}x\\).<br><br>` +
                     `<strong>Step 3:</strong> Rearrange: \\(2x^2 - ${k}x = 0\\), so \\(x(2x - ${k}) = 0\\).<br><br>` +
                     `<strong>Step 4:</strong> Solutions: \\(x = 0\\) or \\(x = ${MathUtils.fractionTeX(k, 2)} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> The non-zero solution is \\(x = ${answer}\\).`
        };
    },

    /**
     * 8. qGraphFeatures - Easy (MC)
     * Given f(x) = A * e^(Bx) + k, identify asymptote / y-intercept / range.
     */
    qGraphFeatures() {
        const A = MathUtils.pick([1, 2, 3, -1, -2]);
        const B = MathUtils.pick([1, -1, 2, -2]);
        const k = MathUtils.randInt(-4, 4);

        // y-intercept: f(0) = A * e^0 + k = A + k
        const yInt = A + k;

        // Asymptote: y = k
        // Range: if A > 0 => y > k; if A < 0 => y < k

        const featureType = MathUtils.randInt(0, 2);
        let questionText, correctTex, distractors;

        // Build function display
        let funcTex = 'f(x) = ';
        if (A === 1) funcTex += 'e';
        else if (A === -1) funcTex += '-e';
        else funcTex += A + 'e';
        if (B === 1) funcTex += '^{x}';
        else if (B === -1) funcTex += '^{-x}';
        else funcTex += `^{${B}x}`;
        if (k > 0) funcTex += ` + ${k}`;
        else if (k < 0) funcTex += ` - ${Math.abs(k)}`;

        if (featureType === 0) {
            // Ask for horizontal asymptote
            questionText = `What is the horizontal asymptote of \\(${funcTex}\\)?`;
            correctTex = `y = ${k}`;
            distractors = [
                `y = ${yInt}`,
                `y = ${A}`,
                `y = 0`
            ];
        } else if (featureType === 1) {
            // Ask for y-intercept
            questionText = `What is the \\(y\\)-intercept of \\(${funcTex}\\)?`;
            correctTex = `(0,\\, ${yInt})`;
            distractors = [
                `(0,\\, ${k})`,
                `(0,\\, ${A})`,
                `(0,\\, ${yInt + MathUtils.nonZeroRandInt(-2, 2)})`
            ];
        } else {
            // Ask for range
            if (A > 0) {
                correctTex = `y > ${k}`;
                distractors = [
                    `y < ${k}`,
                    `y > ${yInt}`,
                    `y \\geq ${k}`
                ];
            } else {
                correctTex = `y < ${k}`;
                distractors = [
                    `y > ${k}`,
                    `y < ${yInt}`,
                    `y \\leq ${k}`
                ];
            }
            questionText = `What is the range of \\(${funcTex}\\)?`;
        }

        // Ensure unique distractors
        const optionTexts = [correctTex];
        for (const d of distractors) {
            if (!optionTexts.includes(d)) {
                optionTexts.push(d);
            } else {
                optionTexts.push(`y = ${k + optionTexts.length * MathUtils.pick([1, -1])}`);
            }
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        const rangeStr = A > 0 ? `y > ${k}` : `y < ${k}`;

        return {
            type: 'mc',
            rule: 'Graph Features',
            difficulty: 'easy',
            text: questionText,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{For } f(x) = Ae^{Bx} + k:\\; \\text{asymptote } y = k,\\; y\\text{-int} = A + k`,
                `\\text{Here: asymptote } y = ${k},\\; y\\text{-int} = ${A} + ${k} = ${yInt},\\; \\text{range: } ${rangeStr}`
            ],
            explain: `<strong>Key facts</strong> for \\(${funcTex}\\):<br><br>` +
                     `<strong>Horizontal asymptote:</strong> \\(y = ${k}\\) (the constant term).<br><br>` +
                     `<strong>\\(y\\)-intercept:</strong> Set \\(x = 0\\): \\(f(0) = ${A}e^0 + ${k} = ${A} + ${k} = ${yInt}\\).<br><br>` +
                     `<strong>Range:</strong> Since \\(A = ${A}\\) is ${A > 0 ? 'positive' : 'negative'}, \\(${rangeStr}\\).`
        };
    },

    /**
     * 9. qLawsOfExponents - Medium (MC)
     * Which law applies? Match expression to simplified form.
     */
    qLawsOfExponents() {
        const laws = [
            {
                name: 'Product Rule',
                expr: () => {
                    const m = MathUtils.randInt(2, 6);
                    const n = MathUtils.randInt(2, 6);
                    return { tex: `a^{${m}} \\times a^{${n}}`, result: `a^{${m + n}}`, law: `a^m \\times a^n = a^{m+n}` };
                }
            },
            {
                name: 'Quotient Rule',
                expr: () => {
                    const m = MathUtils.randInt(5, 10);
                    const n = MathUtils.randInt(1, m - 1);
                    return { tex: `\\frac{a^{${m}}}{a^{${n}}}`, result: `a^{${m - n}}`, law: `\\frac{a^m}{a^n} = a^{m-n}` };
                }
            },
            {
                name: 'Power of a Power',
                expr: () => {
                    const m = MathUtils.randInt(2, 5);
                    const n = MathUtils.randInt(2, 4);
                    return { tex: `(a^{${m}})^{${n}}`, result: `a^{${m * n}}`, law: `(a^m)^n = a^{mn}` };
                }
            },
            {
                name: 'Zero Exponent',
                expr: () => {
                    const base = MathUtils.pick(['a', 'b', 'x', '7', '15']);
                    return { tex: `${base}^{0}`, result: `1`, law: `a^0 = 1 \\text{ (for } a \\neq 0\\text{)}` };
                }
            },
            {
                name: 'Negative Exponent',
                expr: () => {
                    const n = MathUtils.randInt(1, 4);
                    return { tex: `a^{-${n}}`, result: `\\frac{1}{a^{${n}}}`, law: `a^{-n} = \\frac{1}{a^n}` };
                }
            }
        ];

        const chosen = MathUtils.pick(laws);
        const generated = chosen.expr();

        // Correct: the simplified result
        const correctTex = generated.result;

        // Generate wrong answers from other laws applied incorrectly
        const allLaws = laws.filter(l => l.name !== chosen.name);
        const wrongResults = [];
        // Create plausible wrong answers based on expression type
        for (let i = 0; i < 3; i++) {
            const wrongLaw = allLaws[i % allLaws.length];
            const wrongGen = wrongLaw.expr();
            wrongResults.push(wrongGen.result);
        }

        // Ensure uniqueness
        const optionTexts = [correctTex];
        for (const wr of wrongResults) {
            if (!optionTexts.includes(wr)) {
                optionTexts.push(wr);
            } else {
                const fallback = `a^{${MathUtils.randInt(2, 15)}}`;
                if (!optionTexts.includes(fallback)) optionTexts.push(fallback);
                else optionTexts.push(`\\frac{1}{a^{${MathUtils.randInt(1, 5)}}}`);
            }
        }

        while (optionTexts.length < 4) {
            optionTexts.push(`a^{${MathUtils.randInt(1, 12)}}`);
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Laws of Exponents',
            difficulty: 'medium',
            text: 'Simplify the following expression.',
            latex: `\\(${generated.tex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Law: } ${generated.law}`,
                `${generated.tex} = ${correctTex}`
            ],
            explain: `<strong>Rule:</strong> ${chosen.name} - \\(${generated.law}\\).<br><br>` +
                     `<strong>Apply:</strong> \\(${generated.tex} = ${correctTex}\\).`
        };
    },

    /**
     * 10. qTransformedExp - Medium (Free)
     * Given f(x) = 2^x + c or f(x) = 3^(x-a) + k, evaluate f at a given point.
     */
    qTransformedExp() {
        const base = MathUtils.pick([2, 3]);
        const hShift = MathUtils.randInt(-2, 2);
        const vShift = MathUtils.randInt(-5, 5);
        const xVal = MathUtils.randInt(1, 4);

        const exponent = xVal - hShift;
        const power = Math.pow(base, exponent);
        const answer = power + vShift;

        // Build function tex
        let funcTex = `f(x) = ${base}^{`;
        if (hShift === 0) {
            funcTex += 'x}';
        } else if (hShift > 0) {
            funcTex += `x - ${hShift}}`;
        } else {
            funcTex += `x + ${Math.abs(hShift)}}`;
        }
        if (vShift > 0) funcTex += ` + ${vShift}`;
        else if (vShift < 0) funcTex += ` - ${Math.abs(vShift)}`;

        let expTex;
        if (hShift === 0) {
            expTex = String(xVal);
        } else if (hShift > 0) {
            expTex = `${xVal} - ${hShift}`;
        } else {
            expTex = `${xVal} + ${Math.abs(hShift)}`;
        }

        return {
            type: 'free',
            rule: 'Transformed Exponential',
            difficulty: 'medium',
            text: `Given the function below, find \\(f(${xVal})\\).`,
            latex: `\\(${funcTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f(${xVal}) = ${base}^{${expTex}} ${vShift >= 0 ? '+' : '-'} ${Math.abs(vShift)}`,
                `= ${base}^{${exponent}} ${vShift >= 0 ? '+' : '-'} ${Math.abs(vShift)} = ${power} ${vShift >= 0 ? '+' : '-'} ${Math.abs(vShift)} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = ${xVal}\\) into \\(${funcTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate the exponent: \\(${expTex} = ${exponent}\\).<br><br>` +
                     `<strong>Step 3:</strong> Compute: \\(${base}^{${exponent}} = ${power}\\).<br><br>` +
                     `<strong>Step 4:</strong> Add the vertical shift: \\(${power} ${vShift >= 0 ? '+' : '-'} ${Math.abs(vShift)} = ${answer}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => EXPONENTS.qEvaluatePower(),       weight: 2 },
            { fn: () => EXPONENTS.qEvaluateProduct(),     weight: 2 },
            { fn: () => EXPONENTS.qSimplifyToAk(),        weight: 2 },
            { fn: () => EXPONENTS.qNegativeExponent(),    weight: 2 },
            { fn: () => EXPONENTS.qFractionalExponent(),  weight: 2 },
            { fn: () => EXPONENTS.qSameBaseEquation(),    weight: 2 },
            { fn: () => EXPONENTS.qSameBaseQuadratic(),   weight: 1 },
            { fn: () => EXPONENTS.qGraphFeatures(),       weight: 2 },
            { fn: () => EXPONENTS.qLawsOfExponents(),     weight: 2 },
            { fn: () => EXPONENTS.qTransformedExp(),      weight: 2 }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (EXPONENTS.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 3, 7].includes(i));
        } else if (EXPONENTS.level === 'medium') {
            filtered = pool.filter((_, i) => [2, 4, 5, 8, 9].includes(i));
        } else if (EXPONENTS.level === 'hard') {
            filtered = pool.filter((_, i) => [6].includes(i));
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
        EXPONENTS.score = 0;
        EXPONENTS.total = 0;
        EXPONENTS.streak = 0;
        EXPONENTS.answered = false;
        EXPONENTS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="EXPONENTS.unload()">Exponents (2.8)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Exponents</h1>
                <p>IB Math AA 2.8 - Exponent laws, fractional &amp; negative exponents, exponential equations</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="EXPONENTS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="EXPONENTS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="EXPONENTS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="EXPONENTS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="exponents-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="exponents-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="exponents-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="exponents-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="exponents-question-card">
                <span class="rule-tag" id="exponents-rule"></span>
                <span class="difficulty-tag" id="exponents-difficulty"></span>
                <div class="question-text" id="exponents-text"></div>
                <div class="question-prompt" id="exponents-latex"></div>
                <div id="exponents-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="exponents-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="exponents-feedback">
                <div class="feedback-title" id="exponents-feedback-title"></div>
                <div class="feedback-explanation" id="exponents-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="exponents-hint-btn" onclick="EXPONENTS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="exponents-next-btn" onclick="EXPONENTS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        EXPONENTS.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('functions');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        EXPONENTS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        EXPONENTS.score = 0;
        EXPONENTS.total = 0;
        EXPONENTS.streak = 0;
        EXPONENTS.updateStats();
        EXPONENTS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        EXPONENTS.answered = false;
        EXPONENTS.hintIndex = 0;
        EXPONENTS.currentQ = EXPONENTS.pickQuestion();
        const q = EXPONENTS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('exponents-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('exponents-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('exponents-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('exponents-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('exponents-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="EXPONENTS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="exponents-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')EXPONENTS.checkFree()">
                    <button class="btn btn-primary" onclick="EXPONENTS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('exponents-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('exponents-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('exponents-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('exponents-next-btn').style.display = 'none';
        document.getElementById('exponents-hint-btn').style.display = '';
        document.getElementById('exponents-hint-btn').disabled = false;

        // Render KaTeX
        EXPONENTS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = EXPONENTS.currentQ;
        if (!q || !q.hintTex || EXPONENTS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('exponents-hint-box');
        const hintContent = EXPONENTS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[EXPONENTS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        EXPONENTS.hintIndex++;

        if (EXPONENTS.hintIndex >= q.hintTex.length) {
            document.getElementById('exponents-hint-btn').disabled = true;
        }

        EXPONENTS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (EXPONENTS.answered) return;
        EXPONENTS.answered = true;
        EXPONENTS.total++;

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
            EXPONENTS.score++;
            EXPONENTS.streak++;
        } else {
            btn.classList.add('incorrect');
            EXPONENTS.streak = 0;
        }

        EXPONENTS.showFeedback(isCorrect);
        EXPONENTS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (EXPONENTS.answered) return;

        const inp = document.getElementById('exponents-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        EXPONENTS.answered = true;
        EXPONENTS.total++;
        inp.disabled = true;

        const q = EXPONENTS.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            EXPONENTS.score++;
            EXPONENTS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            EXPONENTS.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        EXPONENTS.showFeedback(isCorrect);
        EXPONENTS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = EXPONENTS.currentQ;
        const fb = document.getElementById('exponents-feedback');
        const title = document.getElementById('exponents-feedback-title');
        const explanation = document.getElementById('exponents-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (EXPONENTS.streak > 1) {
                title.textContent = `Correct! (${EXPONENTS.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('exponents-next-btn').style.display = '';
        document.getElementById('exponents-hint-btn').style.display = 'none';

        EXPONENTS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('exponents-score');
        const totalEl = document.getElementById('exponents-total');
        const streakEl = document.getElementById('exponents-streak');
        const accEl = document.getElementById('exponents-accuracy');

        if (scoreEl) scoreEl.textContent = EXPONENTS.score;
        if (totalEl) totalEl.textContent = EXPONENTS.total;
        if (streakEl) streakEl.textContent = EXPONENTS.streak;
        if (accEl) {
            accEl.textContent = EXPONENTS.total > 0
                ? Math.round((EXPONENTS.score / EXPONENTS.total) * 100) + '%'
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
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['exponents'] = () => EXPONENTS.load();
}
