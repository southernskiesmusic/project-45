/*
 * logarithms.js - IB Math AA 2.9: Logarithms
 * Log definition, laws, change of base, solving equations, log functions
 */

const LOGARITHMS = {
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
     * 1. qEvaluateLog - Easy (Free response)
     * Evaluate log_b(x) where x is a power of b.
     */
    qEvaluateLog() {
        // Pick a base and exponent so the answer is a clean integer
        const bases = [2, 3, 4, 5, 10];
        const b = MathUtils.pick(bases);
        const exp = MathUtils.randInt(1, 6);
        // Limit large powers
        const maxExp = b <= 3 ? 6 : b <= 5 ? 4 : 3;
        const k = MathUtils.randInt(1, maxExp);
        const x = Math.pow(b, k);

        return {
            type: 'free',
            rule: 'Evaluate Log',
            difficulty: 'easy',
            text: 'Evaluate the following logarithm.',
            latex: `\\(\\log_{${b}}(${x})\\)`,
            answer: k,
            answerTex: String(k),
            options: [],
            hintTex: [
                `\\log_{b}(x) = k \\iff b^{k} = x`,
                `${b}^{?} = ${x} \\implies ${b}^{${k}} = ${x}`
            ],
            explain: `<strong>Step 1:</strong> Recall that \\(\\log_{b}(x) = k\\) means \\(b^{k} = x\\).<br><br>` +
                     `<strong>Step 2:</strong> We need \\(${b}^{k} = ${x}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since \\(${b}^{${k}} = ${x}\\), the answer is \\(\\log_{${b}}(${x}) = ${k}\\).`
        };
    },

    /**
     * 2. qLogDefinition - Easy (MC)
     * Given log_b(x) = k, find x.
     */
    qLogDefinition() {
        const bases = [2, 3, 5, 10];
        const b = MathUtils.pick(bases);
        const k = MathUtils.randInt(2, 5);
        const x = Math.pow(b, k);

        const correctTex = String(x);

        // Distractors: common errors
        const distractors = [];
        distractors.push(String(b * k));           // multiply instead of exponentiate
        distractors.push(String(Math.pow(k, b)));   // reversed base/exponent
        distractors.push(String(Math.pow(b, k - 1))); // off-by-one exponent

        const optionTexts = [correctTex];
        for (const d of distractors) {
            if (!optionTexts.includes(d)) {
                optionTexts.push(d);
            } else {
                optionTexts.push(String(x + MathUtils.nonZeroRandInt(-5, 5)));
            }
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Log Definition',
            difficulty: 'easy',
            text: `If \\(\\log_{${b}}(x) = ${k}\\), find the value of \\(x\\).`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\log_{b}(x) = k \\iff x = b^{k}`,
                `x = ${b}^{${k}}`
            ],
            explain: `<strong>Step 1:</strong> By definition, \\(\\log_{${b}}(x) = ${k}\\) means \\(x = ${b}^{${k}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate: \\(x = ${b}^{${k}} = ${x}\\).`
        };
    },

    /**
     * 3. qExpressInTerms - Medium (Free response)
     * Given log(a) = p, log(b) = q, find log(a^m * b^n) using log laws.
     * Answer is an integer computed from the expression.
     */
    qExpressInTerms() {
        // Use log base 10 for simplicity
        // Let log(2) = p, log(3) = q, find log(some product of powers of 2 and 3)
        const p = MathUtils.randInt(1, 4); // exponent of 2
        const q = MathUtils.randInt(1, 4); // exponent of 3

        // Target: log(2^p * 3^q) = p*log(2) + q*log(3)
        const target = Math.pow(2, p) * Math.pow(3, q);

        // We tell them log(2) = a, log(3) = b, so answer = p*a + q*b
        // For a numerical answer, pick specific values of a, b
        const aVal = MathUtils.pick([2, 3]);
        const bVal = MathUtils.pick([4, 5]);
        const answer = p * aVal + q * bVal;

        return {
            type: 'free',
            rule: 'Express in Terms',
            difficulty: 'medium',
            text: `Given that \\(\\log(a) = ${aVal}\\) and \\(\\log(b) = ${bVal}\\), find \\(\\log(a^{${p}} \\cdot b^{${q}})\\).`,
            latex: `\\text{Use the log laws to evaluate.}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\log(a^{${p}} \\cdot b^{${q}}) = \\log(a^{${p}}) + \\log(b^{${q}})`,
                `= ${p}\\log(a) + ${q}\\log(b) = ${p}(${aVal}) + ${q}(${bVal})`
            ],
            explain: `<strong>Step 1:</strong> Apply the product rule: \\(\\log(a^{${p}} \\cdot b^{${q}}) = \\log(a^{${p}}) + \\log(b^{${q}})\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the power rule: \\(= ${p}\\log(a) + ${q}\\log(b)\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute: \\(= ${p}(${aVal}) + ${q}(${bVal}) = ${p * aVal} + ${q * bVal} = ${answer}\\).`
        };
    },

    /**
     * 4. qLogLaws - Medium (MC)
     * Which expression equals log(x^2 * y) or similar? Test product/quotient/power rules.
     */
    qLogLaws() {
        const variants = [
            {
                expr: `\\log(x^2 y)`,
                correctTex: `2\\log(x) + \\log(y)`,
                distractors: [
                    `2\\log(x) \\cdot \\log(y)`,
                    `\\log(2x) + \\log(y)`,
                    `2\\log(xy)`
                ]
            },
            {
                expr: `\\log\\!\\left(\\dfrac{x^3}{y}\\right)`,
                correctTex: `3\\log(x) - \\log(y)`,
                distractors: [
                    `\\dfrac{3\\log(x)}{\\log(y)}`,
                    `3\\log(x) + \\log(y)`,
                    `\\log(3x) - \\log(y)`
                ]
            },
            {
                expr: `\\log(xy^3)`,
                correctTex: `\\log(x) + 3\\log(y)`,
                distractors: [
                    `3\\log(x) + 3\\log(y)`,
                    `\\log(x) \\cdot 3\\log(y)`,
                    `3\\log(xy)`
                ]
            },
            {
                expr: `\\log\\!\\left(\\dfrac{x}{y^2}\\right)`,
                correctTex: `\\log(x) - 2\\log(y)`,
                distractors: [
                    `\\dfrac{\\log(x)}{2\\log(y)}`,
                    `\\log(x) + 2\\log(y)`,
                    `2\\log(x) - \\log(y)`
                ]
            },
            {
                expr: `\\log(x^2 y^3)`,
                correctTex: `2\\log(x) + 3\\log(y)`,
                distractors: [
                    `6\\log(xy)`,
                    `2\\log(x) \\cdot 3\\log(y)`,
                    `\\log(2x) + \\log(3y)`
                ]
            }
        ];

        const v = MathUtils.pick(variants);

        const optionTexts = [v.correctTex, ...v.distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Log Laws',
            difficulty: 'medium',
            text: `Which expression is equivalent to \\(${v.expr}\\)?`,
            latex: '',
            answer: 1,
            answerTex: v.correctTex,
            options: shuffled,
            hintTex: [
                `\\log(AB) = \\log A + \\log B, \\quad \\log\\!\\left(\\frac{A}{B}\\right) = \\log A - \\log B`,
                `\\log(A^n) = n\\log A`
            ],
            explain: `<strong>Log Laws:</strong><br>` +
                     `Product rule: \\(\\log(AB) = \\log A + \\log B\\)<br>` +
                     `Quotient rule: \\(\\log\\!\\left(\\frac{A}{B}\\right) = \\log A - \\log B\\)<br>` +
                     `Power rule: \\(\\log(A^n) = n\\log A\\)<br><br>` +
                     `Applying these rules: \\(${v.expr} = ${v.correctTex}\\).`
        };
    },

    /**
     * 5. qSolveSimpleLog - Medium (Free response)
     * Solve log_b(2x + 1) = k. Answer: x = (b^k - 1) / 2.
     */
    qSolveSimpleLog() {
        const bases = [2, 3, 5];
        const b = MathUtils.pick(bases);
        const k = MathUtils.randInt(2, 4);
        const bk = Math.pow(b, k);

        // log_b(2x + 1) = k  =>  2x + 1 = b^k  =>  x = (b^k - 1)/2
        const answer = (bk - 1) / 2;

        // Ensure clean answer
        const answerTex = Number.isInteger(answer) ? String(answer) : MathUtils.fractionTeX(bk - 1, 2);

        return {
            type: 'free',
            rule: 'Solve Log Equation',
            difficulty: 'medium',
            text: `Solve for \\(x\\):`,
            latex: `\\(\\log_{${b}}(2x + 1) = ${k}\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\log_{b}(A) = k \\iff A = b^{k}`,
                `2x + 1 = ${b}^{${k}} = ${bk} \\implies x = \\frac{${bk} - 1}{2}`
            ],
            explain: `<strong>Step 1:</strong> Convert from log form: \\(\\log_{${b}}(2x + 1) = ${k}\\) means \\(2x + 1 = ${b}^{${k}} = ${bk}\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve: \\(2x = ${bk} - 1 = ${bk - 1}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(x = \\frac{${bk - 1}}{2} = ${answer}\\).`
        };
    },

    /**
     * 6. qSolveCombinedLogs - Medium (Free response)
     * Solve log(x) + log(x + c) = 1 (base 10). Combine, quadratic, reject negative.
     */
    qSolveCombinedLogs() {
        // log(x) + log(x + c) = 1  =>  log(x(x+c)) = 1  =>  x(x+c) = 10
        // x^2 + cx - 10 = 0
        // We want positive integer solutions.
        // Pick roots r1 > 0 and r2 < 0 so product = -10 and sum = -c
        // x^2 + cx - 10 = 0, roots satisfy r1*r2 = -10 and r1+r2 = -c
        const pairs = [
            { r1: 2, r2: -5, c: 3 },   // x^2 + 3x - 10 = 0, roots 2, -5
            { r1: 1, r2: -10, c: 9 },   // x^2 + 9x - 10 = 0, roots 1, -10
            { r1: 5, r2: -2, c: -3 },   // x^2 - 3x - 10 = 0, roots 5, -2
            { r1: 10, r2: -1, c: -9 },  // x^2 - 9x - 10 = 0, roots 10, -1
        ];

        const pair = MathUtils.pick(pairs);
        const { r1, r2, c } = pair;
        const answer = r1; // the positive root

        // Format the equation: log(x) + log(x + c) = 1
        let termTex;
        if (c > 0) termTex = `x + ${c}`;
        else termTex = `x - ${Math.abs(c)}`;

        let quadTex;
        if (c > 0) quadTex = `x^2 + ${c}x - 10 = 0`;
        else if (c < 0) quadTex = `x^2 - ${Math.abs(c)}x - 10 = 0`;
        else quadTex = `x^2 - 10 = 0`;

        return {
            type: 'free',
            rule: 'Combined Logs',
            difficulty: 'medium',
            text: `Solve for \\(x\\) (reject any solution where the log is undefined):`,
            latex: `\\(\\log(x) + \\log(${termTex}) = 1\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\log(x) + \\log(${termTex}) = \\log\\!\\left(x(${termTex})\\right) = 1`,
                `x(${termTex}) = 10 \\implies ${quadTex}`
            ],
            explain: `<strong>Step 1:</strong> Combine using the product rule: \\(\\log\\!\\left(x(${termTex})\\right) = 1\\).<br><br>` +
                     `<strong>Step 2:</strong> Convert: \\(x(${termTex}) = 10^1 = 10\\).<br><br>` +
                     `<strong>Step 3:</strong> Expand: \\(${quadTex}\\).<br><br>` +
                     `<strong>Step 4:</strong> Factor: \\((x - ${r1})(x - (${r2})) = 0\\), so \\(x = ${r1}\\) or \\(x = ${r2}\\).<br><br>` +
                     `<strong>Step 5:</strong> Reject \\(x = ${r2}\\) since \\(\\log\\) of a non-positive number is undefined. Therefore \\(x = ${r1}\\).`
        };
    },

    /**
     * 7. qChangeOfBase - Medium (Free response)
     * Convert log_a(x) using change of base and evaluate.
     * We pick values so the answer is a clean number.
     */
    qChangeOfBase() {
        // log_a(b) = log_c(b) / log_c(a)
        // Pick a, b that are both powers of some common base
        const configs = [
            { a: 4, x: 8, base: 2, logABase: 2, logXBase: 3 },    // log_4(8) = log2(8)/log2(4) = 3/2
            { a: 8, x: 4, base: 2, logABase: 3, logXBase: 2 },    // log_8(4) = 2/3
            { a: 9, x: 27, base: 3, logABase: 2, logXBase: 3 },   // log_9(27) = 3/2
            { a: 27, x: 9, base: 3, logABase: 3, logXBase: 2 },   // log_27(9) = 2/3
            { a: 4, x: 32, base: 2, logABase: 2, logXBase: 5 },   // log_4(32) = 5/2
            { a: 8, x: 32, base: 2, logABase: 3, logXBase: 5 },   // log_8(32) = 5/3
            { a: 25, x: 125, base: 5, logABase: 2, logXBase: 3 }, // log_25(125) = 3/2
            { a: 16, x: 8, base: 2, logABase: 4, logXBase: 3 },   // log_16(8) = 3/4
        ];

        const cfg = MathUtils.pick(configs);
        const { a, x, base, logABase, logXBase } = cfg;
        const answer = logXBase / logABase;
        const [sn, sd] = MathUtils.simplifyFraction(logXBase, logABase);
        const answerTex = sd === 1 ? String(sn) : MathUtils.fractionTeX(logXBase, logABase);

        return {
            type: 'free',
            rule: 'Change of Base',
            difficulty: 'medium',
            text: `Evaluate using the change of base formula. Give your answer as a fraction or decimal.`,
            latex: `\\(\\log_{${a}}(${x})\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\log_{a}(x) = \\frac{\\ln(x)}{\\ln(a)} = \\frac{\\log_{${base}}(${x})}{\\log_{${base}}(${a})}`,
                `= \\frac{${logXBase}}{${logABase}}`
            ],
            explain: `<strong>Step 1:</strong> Apply change of base: \\(\\log_{${a}}(${x}) = \\frac{\\ln(${x})}{\\ln(${a})}\\).<br><br>` +
                     `<strong>Step 2:</strong> Since \\(${a} = ${base}^{${logABase}}\\) and \\(${x} = ${base}^{${logXBase}}\\), we get:<br>` +
                     `\\(\\log_{${a}}(${x}) = \\frac{\\log_{${base}}(${x})}{\\log_{${base}}(${a})} = \\frac{${logXBase}}{${logABase}} = ${answerTex}\\).`
        };
    },

    /**
     * 8. qQuadraticInLog - Hard (Free response)
     * Solve (log_2(x))^2 - c*log_2(x) + d = 0 via substitution y = log_2(x).
     * Returns the larger solution for x.
     */
    qQuadraticInLog() {
        // Let y = log_2(x). Quadratic: y^2 - (r1+r2)y + r1*r2 = 0
        // Pick two positive integer roots so x = 2^r1 and x = 2^r2 are reasonable
        const r1 = MathUtils.randInt(1, 3);
        let r2;
        do { r2 = MathUtils.randInt(2, 5); } while (r2 === r1);

        const sumR = r1 + r2;
        const prodR = r1 * r2;

        // Equation: y^2 - sumR*y + prodR = 0
        // Solutions: y = r1 or y = r2, so x = 2^r1 or x = 2^r2
        const x1 = Math.pow(2, r1);
        const x2 = Math.pow(2, r2);
        const larger = Math.max(x1, x2);
        const smaller = Math.min(x1, x2);

        // Format the quadratic
        let quadTex = `(\\log_2 x)^2`;
        if (sumR > 0) quadTex += ` - ${sumR}\\log_2 x`;
        else quadTex += ` + ${Math.abs(sumR)}\\log_2 x`;
        quadTex += ` + ${prodR} = 0`;

        return {
            type: 'free',
            rule: 'Quadratic in Log',
            difficulty: 'hard',
            text: `Solve for \\(x\\). Give the <strong>larger</strong> value of \\(x\\).`,
            latex: `\\(${quadTex}\\)`,
            answer: larger,
            answerTex: String(larger),
            options: [],
            hintTex: [
                `\\text{Let } y = \\log_2 x. \\text{ Then } y^2 - ${sumR}y + ${prodR} = 0`,
                `(y - ${r1})(y - ${r2}) = 0 \\implies y = ${r1} \\text{ or } y = ${r2}`
            ],
            explain: `<strong>Step 1:</strong> Let \\(y = \\log_2 x\\). The equation becomes \\(y^2 - ${sumR}y + ${prodR} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Factor: \\((y - ${r1})(y - ${r2}) = 0\\), so \\(y = ${r1}\\) or \\(y = ${r2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Convert back: \\(x = 2^{${r1}} = ${x1}\\) or \\(x = 2^{${r2}} = ${x2}\\).<br><br>` +
                     `<strong>Answer:</strong> Both solutions are valid. The larger value is \\(x = ${larger}\\).`
        };
    },

    /**
     * 9. qLogFunction - Medium (MC)
     * Domain of f(x) = ln(ax - b). Identify x > b/a.
     */
    qLogFunction() {
        const a = MathUtils.pick([2, 3, 4, 5]);
        const b = MathUtils.pick([2, 4, 6, 8, 10, 12, 15]);
        // Domain: ax - b > 0  =>  x > b/a
        const [sn, sd] = MathUtils.simplifyFraction(b, a);
        const threshold = sn / sd;
        const thresholdTex = sd === 1 ? String(sn) : `\\frac{${sn}}{${sd}}`;

        const correctTex = `x > ${thresholdTex}`;

        // Distractors
        const distractors = [];
        // Wrong direction
        distractors.push(`x < ${thresholdTex}`);
        // Forgot to divide by a
        distractors.push(`x > ${b}`);
        // Negated threshold
        const negThreshTex = sd === 1 ? String(-sn) : `-\\frac{${sn}}{${sd}}`;
        distractors.push(`x > ${negThreshTex}`);

        const optionTexts = [correctTex, ...distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        // Format the function
        let innerTex;
        if (b === 0) innerTex = `${a}x`;
        else innerTex = `${a}x - ${b}`;

        return {
            type: 'mc',
            rule: 'Log Function Domain',
            difficulty: 'medium',
            text: `What is the domain of \\(f(x) = \\ln(${innerTex})\\)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\ln(u) \\text{ is defined when } u > 0`,
                `${innerTex} > 0 \\implies ${a}x > ${b} \\implies x > ${thresholdTex}`
            ],
            explain: `<strong>Step 1:</strong> The natural logarithm \\(\\ln(u)\\) is defined only when \\(u > 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Set the argument positive: \\(${innerTex} > 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve: \\(${a}x > ${b}\\), so \\(x > ${thresholdTex}\\).<br><br>` +
                     `<strong>Answer:</strong> The domain is \\(x > ${thresholdTex}\\), or \\(\\left(${thresholdTex},\\,\\infty\\right)\\).`
        };
    },

    /**
     * 10. qExpressFromPrimes - Hard (Free response)
     * Given log_2(3) = a, log_2(5) = b, express log_2(N) in terms of a, b.
     * We pick N as a product of powers of 2, 3, 5 and compute the numeric answer
     * for given a, b values.
     */
    qExpressFromPrimes() {
        // log_2(N) where N = 2^p * 3^q * 5^r
        // log_2(N) = p + q*log_2(3) + r*log_2(5) = p + q*a + r*b
        const p = MathUtils.randInt(0, 3);
        const q = MathUtils.randInt(1, 3);
        const r = MathUtils.randInt(0, 2);

        // At least one of q, r must be nonzero (q already >= 1)
        const N = Math.pow(2, p) * Math.pow(3, q) * Math.pow(5, r);

        // Give specific values for a and b
        const aVal = MathUtils.pick([2, 3]);
        const bVal = MathUtils.pick([3, 4]);

        const answer = p + q * aVal + r * bVal;

        // Build the expression string for explanation
        let exprParts = [];
        if (p !== 0) exprParts.push(String(p));
        if (q === 1) exprParts.push('a');
        else if (q > 1) exprParts.push(`${q}a`);
        if (r === 1) exprParts.push('b');
        else if (r > 1) exprParts.push(`${r}b`);
        const exprTex = exprParts.join(' + ');

        // Build factorisation of N
        let factorParts = [];
        if (p > 0) factorParts.push(p === 1 ? '2' : `2^{${p}}`);
        if (q > 0) factorParts.push(q === 1 ? '3' : `3^{${q}}`);
        if (r > 0) factorParts.push(r === 1 ? '5' : `5^{${r}}`);
        const factorTex = factorParts.join(' \\cdot ');

        return {
            type: 'free',
            rule: 'Express from Primes',
            difficulty: 'hard',
            text: `Given \\(\\log_2(3) = a = ${aVal}\\) and \\(\\log_2(5) = b = ${bVal}\\), find \\(\\log_2(${N})\\).`,
            latex: `\\text{Express using log laws and evaluate.}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `${N} = ${factorTex}`,
                `\\log_2(${N}) = ${exprTex}`
            ],
            explain: `<strong>Step 1:</strong> Factorise: \\(${N} = ${factorTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply log laws: \\(\\log_2(${N}) = ${exprTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(a = ${aVal}\\), \\(b = ${bVal}\\): \\(${exprTex} = ${answer}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => LOGARITHMS.qEvaluateLog(),       weight: 2, diff: 'easy' },
            { fn: () => LOGARITHMS.qLogDefinition(),      weight: 2, diff: 'easy' },
            { fn: () => LOGARITHMS.qExpressInTerms(),     weight: 2, diff: 'medium' },
            { fn: () => LOGARITHMS.qLogLaws(),            weight: 2, diff: 'medium' },
            { fn: () => LOGARITHMS.qSolveSimpleLog(),     weight: 2, diff: 'medium' },
            { fn: () => LOGARITHMS.qSolveCombinedLogs(),  weight: 2, diff: 'medium' },
            { fn: () => LOGARITHMS.qChangeOfBase(),       weight: 2, diff: 'medium' },
            { fn: () => LOGARITHMS.qQuadraticInLog(),     weight: 1, diff: 'hard' },
            { fn: () => LOGARITHMS.qLogFunction(),        weight: 2, diff: 'medium' },
            { fn: () => LOGARITHMS.qExpressFromPrimes(),  weight: 1, diff: 'hard' }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (LOGARITHMS.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (LOGARITHMS.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (LOGARITHMS.level === 'hard') {
            filtered = pool.filter(p => p.diff === 'hard');
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
        LOGARITHMS.score = 0;
        LOGARITHMS.total = 0;
        LOGARITHMS.streak = 0;
        LOGARITHMS.answered = false;
        LOGARITHMS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="LOGARITHMS.unload()">Logarithms (2.9)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Logarithms</h1>
                <p>IB Math AA 2.9 - Log laws, equations, change of base &amp; log functions</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="LOGARITHMS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="LOGARITHMS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="LOGARITHMS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="LOGARITHMS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="log-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="log-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="log-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="log-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="log-question-card">
                <span class="rule-tag" id="log-rule"></span>
                <span class="difficulty-tag" id="log-difficulty"></span>
                <div class="question-text" id="log-text"></div>
                <div class="question-prompt" id="log-latex"></div>
                <div id="log-options-area"></div>
            </div>

            <!-- Hint box -->
            <div class="hint-box" id="log-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="log-feedback">
                <div class="feedback-title" id="log-feedback-title"></div>
                <div class="feedback-explanation" id="log-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="log-hint-btn" onclick="LOGARITHMS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="log-next-btn" onclick="LOGARITHMS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        LOGARITHMS.next();
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
        LOGARITHMS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        LOGARITHMS.score = 0;
        LOGARITHMS.total = 0;
        LOGARITHMS.streak = 0;
        LOGARITHMS.updateStats();
        LOGARITHMS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        LOGARITHMS.answered = false;
        LOGARITHMS.hintIndex = 0;
        LOGARITHMS.currentQ = LOGARITHMS.pickQuestion();
        const q = LOGARITHMS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('log-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('log-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('log-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('log-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('log-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="LOGARITHMS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="log-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')LOGARITHMS.checkFree()">
                    <button class="btn btn-primary" onclick="LOGARITHMS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('log-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('log-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('log-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('log-next-btn').style.display = 'none';
        document.getElementById('log-hint-btn').style.display = '';
        document.getElementById('log-hint-btn').disabled = false;

        // Render KaTeX
        LOGARITHMS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = LOGARITHMS.currentQ;
        if (!q || !q.hintTex || LOGARITHMS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('log-hint-box');
        const hintContent = LOGARITHMS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[LOGARITHMS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        LOGARITHMS.hintIndex++;

        if (LOGARITHMS.hintIndex >= q.hintTex.length) {
            document.getElementById('log-hint-btn').disabled = true;
        }

        LOGARITHMS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (LOGARITHMS.answered) return;
        LOGARITHMS.answered = true;
        LOGARITHMS.total++;

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
            LOGARITHMS.score++;
            LOGARITHMS.streak++;
        } else {
            btn.classList.add('incorrect');
            LOGARITHMS.streak = 0;
        }

        LOGARITHMS.showFeedback(isCorrect);
        LOGARITHMS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (LOGARITHMS.answered) return;

        const inp = document.getElementById('log-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        LOGARITHMS.answered = true;
        LOGARITHMS.total++;
        inp.disabled = true;

        const q = LOGARITHMS.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            LOGARITHMS.score++;
            LOGARITHMS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            LOGARITHMS.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        LOGARITHMS.showFeedback(isCorrect);
        LOGARITHMS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = LOGARITHMS.currentQ;
        const fb = document.getElementById('log-feedback');
        const title = document.getElementById('log-feedback-title');
        const explanation = document.getElementById('log-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (LOGARITHMS.streak > 1) {
                title.textContent = `Correct! (${LOGARITHMS.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('log-next-btn').style.display = '';
        document.getElementById('log-hint-btn').style.display = 'none';

        LOGARITHMS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('log-score');
        const totalEl = document.getElementById('log-total');
        const streakEl = document.getElementById('log-streak');
        const accEl = document.getElementById('log-accuracy');

        if (scoreEl) scoreEl.textContent = LOGARITHMS.score;
        if (totalEl) totalEl.textContent = LOGARITHMS.total;
        if (streakEl) streakEl.textContent = LOGARITHMS.streak;
        if (accEl) {
            accEl.textContent = LOGARITHMS.total > 0
                ? Math.round((LOGARITHMS.score / LOGARITHMS.total) * 100) + '%'
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
    ACTIVITY_INITS['logarithms'] = () => LOGARITHMS.load();
}
