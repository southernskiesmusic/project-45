/*
 * complex-numbers-polar.js - IB Math AA 1.13–1.15: Complex Numbers (Polar/Euler Form)
 * Polar form, Euler's formula, De Moivre's theorem, multiplication/division, nth roots
 */

const COMPLEX_POLAR = {
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
     * 1. qModulusFromCartesian - Easy (Free)
     * |z| = √(a²+b²). Pythagorean triples guarantee integer answers.
     */
    qModulusFromCartesian() {
        const triples = [
            [3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10],
            [9, 12, 15], [7, 24, 25], [20, 21, 29], [9, 40, 41]
        ];
        const [a, b, c] = MathUtils.pick(triples);

        // Random sign choices
        const signA = MathUtils.pick([1, -1]);
        const signB = MathUtils.pick([1, -1]);
        const re = signA * a;
        const im = signB * b;

        const imStr = im >= 0 ? `+ ${im}i` : `- ${Math.abs(im)}i`;
        const zTex = `${re} ${imStr}`;

        return {
            type: 'free',
            rule: 'Modulus',
            difficulty: 'easy',
            text: 'Find the modulus \\(|z|\\) of the complex number below.',
            latex: `\\(z = ${zTex}\\)`,
            answer: c,
            answerTex: String(c),
            options: [],
            hintTex: [
                `|z| = \\sqrt{a^2 + b^2} \\text{ where } z = a + bi`,
                `|z| = \\sqrt{(${re})^2 + (${im})^2} = \\sqrt{${re * re} + ${im * im}} = \\sqrt{${c * c}}`
            ],
            explain: `<strong>Step 1:</strong> Use the modulus formula \\(|z| = \\sqrt{a^2 + b^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(|z| = \\sqrt{(${re})^2 + (${im})^2} = \\sqrt{${re * re} + ${im * im}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(|z| = \\sqrt{${c * c}} = ${c}\\).`
        };
    },

    /**
     * 2. qArgumentDegrees - Easy (MC)
     * Find arg(z) in degrees for standard angles.
     */
    qArgumentDegrees() {
        // Standard angle cases: [a, b, argDeg, display]
        const cases = [
            { re: 1,            im: 0,            arg: 0,    tex: '1' },
            { re: 1,            im: 1,            arg: 45,   tex: '1 + i' },
            { re: 0,            im: 1,            arg: 90,   tex: 'i' },
            { re: -1,           im: 1,            arg: 135,  tex: '-1 + i' },
            { re: 1,            im: -1,           arg: -45,  tex: '1 - i' },
            { re: '\\sqrt{3}',  im: 1,            arg: 30,   tex: '\\sqrt{3} + i',   reVal: Math.sqrt(3), imVal: 1 },
            { re: 1,            im: '\\sqrt{3}',  arg: 60,   tex: '1 + \\sqrt{3}\\,i', reVal: 1, imVal: Math.sqrt(3) },
            { re: -1,           im: 0,            arg: 180,  tex: '-1' },
            { re: 0,            im: -1,           arg: -90,  tex: '-i' },
            { re: -1,           im: -1,           arg: -135, tex: '-1 - i' }
        ];

        const chosen = MathUtils.pick(cases);
        const correct = chosen.arg;

        // Build 3 distractors from other arg values
        const otherArgs = cases.map(c => c.arg).filter(a => a !== correct);
        const shuffledOthers = MathUtils.shuffle(otherArgs);
        const distractorArgs = shuffledOthers.slice(0, 3);

        const optionValues = [correct, ...distractorArgs];
        const options = optionValues.map((val, i) => ({
            value: i === 0 ? 1 : 0,
            tex: `${val}^\\circ`
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Argument',
            difficulty: 'easy',
            text: 'Find the argument of \\(z\\) in degrees.',
            latex: `\\(z = ${chosen.tex}\\)`,
            answer: 1,
            answerTex: `${correct}^\\circ`,
            options: shuffled,
            hintTex: [
                `\\arg(z) = \\theta \\text{ where } \\tan\\theta = \\frac{b}{a}, \\text{ in the correct quadrant}`,
                `z = ${chosen.tex} \\implies \\theta = ${correct}^\\circ`
            ],
            explain: `<strong>Step 1:</strong> The argument is the angle \\(\\theta = \\arctan\\!\\left(\\frac{b}{a}\\right)\\) measured from the positive real axis.<br><br>` +
                     `<strong>Step 2:</strong> For \\(z = ${chosen.tex}\\), the point lies at angle \\(${correct}^\\circ\\) from the positive real axis.<br><br>` +
                     `<strong>Answer:</strong> \\(\\arg(z) = ${correct}^\\circ\\).`
        };
    },

    /**
     * 3. qPolarToCartesian - Easy (MC)
     * Convert r·cis(θ) to a+bi for standard angles.
     */
    qPolarToCartesian() {
        // [r, thetaDeg, reTex, imTex, reVal, imVal]
        const cases = [
            { r: 2, theta: 60,  reTex: '1',            imTex: '\\sqrt{3}',  reVal: 1,             imVal: Math.sqrt(3) },
            { r: 2, theta: 30,  reTex: '\\sqrt{3}',    imTex: '1',          reVal: Math.sqrt(3),  imVal: 1 },
            { r: 2, theta: 45,  reTex: '\\sqrt{2}',    imTex: '\\sqrt{2}',  reVal: Math.sqrt(2),  imVal: Math.sqrt(2) },
            { r: 4, theta: 90,  reTex: '0',             imTex: '4',          reVal: 0,             imVal: 4 },
            { r: 3, theta: 0,   reTex: '3',             imTex: '0',          reVal: 3,             imVal: 0 },
            { r: 2, theta: 120, reTex: '-1',            imTex: '\\sqrt{3}',  reVal: -1,            imVal: Math.sqrt(3) },
            { r: 4, theta: 180, reTex: '-4',            imTex: '0',          reVal: -4,            imVal: 0 },
            { r: 2, theta: -60, reTex: '1',             imTex: '-\\sqrt{3}', reVal: 1,             imVal: -Math.sqrt(3) }
        ];

        const chosen = MathUtils.pick(cases);

        function fmtCartesian(reTex, imTex, imVal) {
            if (imTex === '0') return `${reTex}`;
            if (reTex === '0') {
                return imVal < 0 ? `${imTex}\\,i` : `${imTex}\\,i`;
            }
            const sign = imVal < 0 ? '-' : '+';
            const absImTex = imTex.replace(/^-/, '');
            return `${reTex} ${sign} ${absImTex}\\,i`;
        }

        const correctTex = fmtCartesian(chosen.reTex, chosen.imTex, chosen.imVal);

        // Distractors: pick 3 other cases
        const others = cases.filter(c => c !== chosen);
        const distractorCases = MathUtils.shuffle(others).slice(0, 3);
        const distractorTexs = distractorCases.map(c => fmtCartesian(c.reTex, c.imTex, c.imVal));

        const optionTexts = [correctTex, ...distractorTexs];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex
        }));

        const shuffled = MathUtils.shuffle(options);
        const thetaSign = chosen.theta < 0 ? `(${chosen.theta}^\\circ)` : `${chosen.theta}^\\circ`;

        return {
            type: 'mc',
            rule: 'Polar → Cartesian',
            difficulty: 'easy',
            text: `Convert the polar form to Cartesian form \\(a + bi\\).`,
            latex: `\\(z = ${chosen.r}\\,\\operatorname{cis}(${thetaSign})\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `r\\,\\operatorname{cis}(\\theta) = r\\cos\\theta + r\\sin\\theta\\cdot i`,
                `= ${chosen.r}\\cos(${thetaSign}) + ${chosen.r}\\sin(${thetaSign})\\cdot i`
            ],
            explain: `<strong>Step 1:</strong> Use \\(r\\,\\operatorname{cis}(\\theta) = r\\cos\\theta + r\\sin\\theta\\cdot i\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute: \\(${chosen.r}\\cos(${thetaSign}) = ${chosen.reTex}\\) and \\(${chosen.r}\\sin(${thetaSign}) = ${chosen.imTex}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(z = ${correctTex}\\).`
        };
    },

    /**
     * 4. qDeMoivreSimple - Medium (Free)
     * (cis(θ))^n = cis(nθ). Find the real part.
     */
    qDeMoivreSimple() {
        // Pairs [theta, n] such that n*theta lands on a standard angle
        const scenarios = [
            { theta: 30,  n: 6,  nTheta: 180, realPart: -1,  cosStr: '\\cos(180^\\circ) = -1' },
            { theta: 45,  n: 4,  nTheta: 180, realPart: -1,  cosStr: '\\cos(180^\\circ) = -1' },
            { theta: 60,  n: 3,  nTheta: 180, realPart: -1,  cosStr: '\\cos(180^\\circ) = -1' },
            { theta: 90,  n: 2,  nTheta: 180, realPart: -1,  cosStr: '\\cos(180^\\circ) = -1' },
            { theta: 45,  n: 8,  nTheta: 360, realPart: 1,   cosStr: '\\cos(360^\\circ) = 1' },
            { theta: 30,  n: 12, nTheta: 360, realPart: 1,   cosStr: '\\cos(360^\\circ) = 1' },
            { theta: 60,  n: 6,  nTheta: 360, realPart: 1,   cosStr: '\\cos(360^\\circ) = 1' },
            { theta: 30,  n: 3,  nTheta: 90,  realPart: 0,   cosStr: '\\cos(90^\\circ) = 0' },
            { theta: 45,  n: 2,  nTheta: 90,  realPart: 0,   cosStr: '\\cos(90^\\circ) = 0' },
            { theta: 60,  n: 2,  nTheta: 120, realPart: -0.5, cosStr: '\\cos(120^\\circ) = -\\tfrac{1}{2}' }
        ];

        const s = MathUtils.pick(scenarios);

        return {
            type: 'free',
            rule: "De Moivre's (Simple)",
            difficulty: 'medium',
            text: `Using De Moivre's theorem, find the <strong>real part</strong> of the expression below.`,
            latex: `\\(\\bigl(\\cos(${s.theta}^\\circ) + i\\sin(${s.theta}^\\circ)\\bigr)^{${s.n}}\\)`,
            answer: s.realPart,
            answerTex: String(s.realPart),
            options: [],
            hintTex: [
                `\\text{De Moivre: } (\\operatorname{cis}\\,\\theta)^n = \\operatorname{cis}(n\\theta)`,
                `= \\operatorname{cis}(${s.n} \\times ${s.theta}^\\circ) = \\operatorname{cis}(${s.nTheta}^\\circ) = ${s.cosStr} + i\\sin(${s.nTheta}^\\circ)`
            ],
            explain: `<strong>Step 1:</strong> Apply De Moivre's theorem: \\((\\operatorname{cis}\\,\\theta)^n = \\operatorname{cis}(n\\theta)\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute \\(n\\theta = ${s.n} \\times ${s.theta}^\\circ = ${s.nTheta}^\\circ\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\operatorname{cis}(${s.nTheta}^\\circ) = \\cos(${s.nTheta}^\\circ) + i\\sin(${s.nTheta}^\\circ)\\).<br><br>` +
                     `<strong>Step 4:</strong> The real part is \\(${s.cosStr} = ${s.realPart}\\).`
        };
    },

    /**
     * 5. qMultiplyPolar - Medium (Free)
     * |z₁z₂| = |z₁||z₂|. Find the modulus of the product.
     */
    qMultiplyPolar() {
        const r1 = MathUtils.randInt(2, 9);
        const r2 = MathUtils.randInt(2, 9);
        const product = r1 * r2;

        const theta1 = MathUtils.pick([0, 30, 45, 60, 90, 120, 135, 150]);
        const theta2 = MathUtils.pick([0, 30, 45, 60, 90, 120, 135, 150]);

        return {
            type: 'free',
            rule: 'Multiply in Polar Form',
            difficulty: 'medium',
            text: 'Find \\(|z_1 z_2|\\), the modulus of the product.',
            latex: `\\(z_1 = ${r1}\\,\\operatorname{cis}(${theta1}^\\circ), \\quad z_2 = ${r2}\\,\\operatorname{cis}(${theta2}^\\circ)\\)`,
            answer: product,
            answerTex: String(product),
            options: [],
            hintTex: [
                `|z_1 z_2| = |z_1| \\cdot |z_2|`,
                `= ${r1} \\times ${r2} = ${product}`
            ],
            explain: `<strong>Step 1:</strong> Use the product rule for moduli: \\(|z_1 z_2| = |z_1| \\cdot |z_2|\\).<br><br>` +
                     `<strong>Step 2:</strong> The moduli are \\(|z_1| = ${r1}\\) and \\(|z_2| = ${r2}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(|z_1 z_2| = ${r1} \\times ${r2} = ${product}\\).<br><br>` +
                     `<em>Note: the arguments add — \\(\\arg(z_1 z_2) = ${theta1}^\\circ + ${theta2}^\\circ = ${theta1 + theta2}^\\circ\\).</em>`
        };
    },

    /**
     * 6. qArgumentSum - Medium (Free)
     * arg(z₁z₂) = arg(z₁) + arg(z₂).
     */
    qArgumentSum() {
        const angles = [30, 45, 60];
        const theta1 = MathUtils.pick(angles);
        const theta2 = MathUtils.pick(angles);
        const sum = theta1 + theta2;

        const r1 = MathUtils.randInt(2, 8);
        const r2 = MathUtils.randInt(2, 8);

        return {
            type: 'free',
            rule: 'Argument of Product',
            difficulty: 'medium',
            text: 'Find \\(\\arg(z_1 z_2)\\) in degrees.',
            latex: `\\(z_1 = ${r1}\\,\\operatorname{cis}(${theta1}^\\circ), \\quad z_2 = ${r2}\\,\\operatorname{cis}(${theta2}^\\circ)\\)`,
            answer: sum,
            answerTex: `${sum}^\\circ`,
            options: [],
            hintTex: [
                `\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2)`,
                `= ${theta1}^\\circ + ${theta2}^\\circ = ${sum}^\\circ`
            ],
            explain: `<strong>Step 1:</strong> Use the argument addition rule: \\(\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2)\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(\\arg(z_1) = ${theta1}^\\circ\\) and \\(\\arg(z_2) = ${theta2}^\\circ\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\arg(z_1 z_2) = ${theta1}^\\circ + ${theta2}^\\circ = ${sum}^\\circ\\).<br><br>` +
                     `<em>Note: if the sum exceeds \\(180^\\circ\\) you may need to subtract \\(360^\\circ\\) to give the principal argument.</em>`
        };
    },

    /**
     * 7. qDeMoivrePower - Medium (MC)
     * (r·cis(θ))^n = r^n·cis(nθ). Find the real part.
     */
    qDeMoivrePower() {
        // Scenarios: [r, theta, n] where the result is a clean integer real part
        const scenarios = [
            { r: 2,  theta: 45,  n: 4,  rn: 16,  nTheta: 180, realPart: -16  },
            { r: 2,  theta: 90,  n: 3,  rn: 8,   nTheta: 270, realPart: 0    },
            { r: 3,  theta: 60,  n: 2,  rn: 9,   nTheta: 120, realPart: -4.5 },
            { r: 2,  theta: 180, n: 3,  rn: 8,   nTheta: 540, realPart: -8   },
            { r: 2,  theta: 60,  n: 6,  rn: 64,  nTheta: 360, realPart: 64   },
            { r: 3,  theta: 90,  n: 2,  rn: 9,   nTheta: 180, realPart: -9   },
            { r: 2,  theta: 45,  n: 8,  rn: 256, nTheta: 360, realPart: 256  },
            { r: 2,  theta: 30,  n: 6,  rn: 64,  nTheta: 180, realPart: -64  }
        ];

        const s = MathUtils.pick(scenarios);

        // Build distractors
        const wrong = [
            s.rn,               // forgot to apply cis (forgot the trig part)
            -s.realPart,        // sign error
            s.r * s.n,          // wrong exponent rule (r*n instead of r^n)
            0                   // confused with imaginary part
        ].filter(v => v !== s.realPart);

        const distractorVals = MathUtils.shuffle(wrong).slice(0, 3);
        const optionVals = [s.realPart, ...distractorVals];
        const options = optionVals.map((v, i) => ({
            value: i === 0 ? 1 : 0,
            tex: String(v)
        }));

        const shuffled = MathUtils.shuffle(options);
        const nThetaDisplay = ((s.nTheta % 360) + 360) % 360;

        return {
            type: 'mc',
            rule: "De Moivre's (Power)",
            difficulty: 'medium',
            text: `Using De Moivre's theorem, find the <strong>real part</strong> of the expression below.`,
            latex: `\\(\\bigl(${s.r}\\,\\operatorname{cis}(${s.theta}^\\circ)\\bigr)^{${s.n}}\\)`,
            answer: 1,
            answerTex: String(s.realPart),
            options: shuffled,
            hintTex: [
                `(r\\,\\operatorname{cis}\\,\\theta)^n = r^n\\,\\operatorname{cis}(n\\theta)`,
                `= ${s.r}^{${s.n}}\\,\\operatorname{cis}(${s.n} \\times ${s.theta}^\\circ) = ${s.rn}\\,\\operatorname{cis}(${s.nTheta}^\\circ)`
            ],
            explain: `<strong>Step 1:</strong> Apply De Moivre's theorem: \\((r\\,\\operatorname{cis}\\,\\theta)^n = r^n\\,\\operatorname{cis}(n\\theta)\\).<br><br>` +
                     `<strong>Step 2:</strong> Compute the modulus: \\(${s.r}^{${s.n}} = ${s.rn}\\).<br><br>` +
                     `<strong>Step 3:</strong> Compute the angle: \\(${s.n} \\times ${s.theta}^\\circ = ${s.nTheta}^\\circ\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(${s.rn}\\,\\operatorname{cis}(${s.nTheta}^\\circ) = ${s.rn}\\cos(${s.nTheta}^\\circ) + ${s.rn}\\sin(${s.nTheta}^\\circ)\\cdot i\\).<br><br>` +
                     `<strong>Step 5:</strong> The real part is \\(${s.rn}\\cos(${s.nTheta}^\\circ) = ${s.realPart}\\).`
        };
    },

    /**
     * 8. qEulerForm - Easy (MC)
     * Which expression represents Euler's formula? Always the same question.
     */
    qEulerForm() {
        const options = MathUtils.shuffle([
            { value: 1, tex: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta' },
            { value: 0, tex: 'e^{i\\theta} = \\cos\\theta - i\\sin\\theta' },
            { value: 0, tex: 'e^{i\\theta} = \\cosh\\theta + \\sinh\\theta' },
            { value: 0, tex: 'e^{i\\pi} = 1' }
        ]);

        return {
            type: 'mc',
            rule: "Euler's Formula",
            difficulty: 'easy',
            text: "Which of the following correctly states Euler's formula?",
            latex: '',
            answer: 1,
            answerTex: 'e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
            options,
            hintTex: [
                `\\text{Euler's formula connects the exponential and trigonometric functions.}`,
                `e^{i\\theta} = \\cos\\theta + i\\sin\\theta \\quad (\\text{for real } \\theta)`
            ],
            explain: `<strong>Euler's formula</strong> states: \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\).<br><br>` +
                     `This connects the complex exponential to cosine and sine.<br><br>` +
                     `<strong>Common mistakes:</strong><br>` +
                     `\\(e^{i\\theta} = \\cos\\theta - i\\sin\\theta\\) is wrong (that is \\(e^{-i\\theta}\\)).<br>` +
                     `\\(e^{i\\pi} = -1\\) (not \\(+1\\)) is the famous <em>Euler's identity</em>.`
        };
    },

    /**
     * 9. qEulerIdentity - Easy (Free)
     * What is the real part of e^(iπ)? Answer: -1.
     */
    qEulerIdentity() {
        return {
            type: 'free',
            rule: "Euler's Identity",
            difficulty: 'easy',
            text: "Using Euler's formula, what is the real part of \\(e^{i\\pi}\\)?",
            latex: `\\(e^{i\\pi} = \\cos\\pi + i\\sin\\pi\\)`,
            answer: -1,
            answerTex: '-1',
            options: [],
            hintTex: [
                `e^{i\\theta} = \\cos\\theta + i\\sin\\theta \\implies e^{i\\pi} = \\cos\\pi + i\\sin\\pi`,
                `\\cos\\pi = -1, \\quad \\sin\\pi = 0 \\implies e^{i\\pi} = -1`
            ],
            explain: `<strong>Step 1:</strong> Apply Euler's formula with \\(\\theta = \\pi\\):<br>` +
                     `\\(e^{i\\pi} = \\cos\\pi + i\\sin\\pi\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate: \\(\\cos\\pi = -1\\) and \\(\\sin\\pi = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(e^{i\\pi} = -1 + 0\\cdot i = -1\\).<br><br>` +
                     `This gives the celebrated <strong>Euler's identity</strong>: \\(e^{i\\pi} + 1 = 0\\).`
        };
    },

    /**
     * 10. qNthRoot - Hard (MC)
     * How many distinct nth roots does z^n = 1 have? Answer: n.
     */
    qNthRoot() {
        const n = MathUtils.pick([2, 3, 4, 5, 6]);

        const options = MathUtils.shuffle([
            { value: 1, tex: String(n) },
            { value: 0, tex: String(n - 1) },
            { value: 0, tex: String(2 * n) },
            { value: 0, tex: String(n * n) }
        ]);

        return {
            type: 'mc',
            rule: 'nth Roots of Unity',
            difficulty: 'hard',
            text: `How many distinct \\(${n}\\)th roots does the equation \\(z^{${n}} = 1\\) have in \\(\\mathbb{C}\\)?`,
            latex: `\\(z^{${n}} = 1\\)`,
            answer: 1,
            answerTex: String(n),
            options,
            hintTex: [
                `z^n = 1 \\text{ has exactly } n \\text{ distinct solutions in } \\mathbb{C}`,
                `\\text{They are } z_k = \\operatorname{cis}\\!\\left(\\frac{2\\pi k}{n}\\right), \\quad k = 0, 1, \\ldots, ${n - 1}`
            ],
            explain: `<strong>Key theorem:</strong> The equation \\(z^n = r\\) has exactly \\(n\\) distinct complex solutions.<br><br>` +
                     `<strong>For \\(z^{${n}} = 1\\):</strong> There are \\(${n}\\) roots, called the <em>${n}th roots of unity</em>.<br><br>` +
                     `<strong>Formula:</strong> \\(z_k = \\operatorname{cis}\\!\\left(\\dfrac{2\\pi k}{${n}}\\right)\\) for \\(k = 0, 1, \\ldots, ${n - 1}\\).<br><br>` +
                     `They are evenly spaced around the unit circle at angular separation \\(\\dfrac{360^\\circ}{${n}} = ${Math.round(360 / n)}^\\circ\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => COMPLEX_POLAR.qModulusFromCartesian(), weight: 3, difficulty: 'easy'   },  // 0
            { fn: () => COMPLEX_POLAR.qArgumentDegrees(),      weight: 3, difficulty: 'easy'   },  // 1
            { fn: () => COMPLEX_POLAR.qPolarToCartesian(),     weight: 3, difficulty: 'easy'   },  // 2
            { fn: () => COMPLEX_POLAR.qDeMoivreSimple(),       weight: 2, difficulty: 'medium' },  // 3
            { fn: () => COMPLEX_POLAR.qMultiplyPolar(),        weight: 2, difficulty: 'medium' },  // 4
            { fn: () => COMPLEX_POLAR.qArgumentSum(),          weight: 2, difficulty: 'medium' },  // 5
            { fn: () => COMPLEX_POLAR.qDeMoivrePower(),        weight: 2, difficulty: 'medium' },  // 6
            { fn: () => COMPLEX_POLAR.qEulerForm(),            weight: 3, difficulty: 'easy'   },  // 7
            { fn: () => COMPLEX_POLAR.qEulerIdentity(),        weight: 3, difficulty: 'easy'   },  // 8
            { fn: () => COMPLEX_POLAR.qNthRoot(),              weight: 1, difficulty: 'hard'   }   // 9
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (COMPLEX_POLAR.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (COMPLEX_POLAR.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (COMPLEX_POLAR.level === 'hard') {
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
        COMPLEX_POLAR.score = 0;
        COMPLEX_POLAR.total = 0;
        COMPLEX_POLAR.streak = 0;
        COMPLEX_POLAR.answered = false;
        COMPLEX_POLAR.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="COMPLEX_POLAR.unload()">Complex Polar (1.13–1.15)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Complex Numbers — Polar Form</h1>
                <p>IB Math AA 1.13–1.15 — Polar form, Euler and De Moivre's theorem</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="COMPLEX_POLAR.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="COMPLEX_POLAR.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="COMPLEX_POLAR.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="COMPLEX_POLAR.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="cxp-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="cxp-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="cxp-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="cxp-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="cxp-question-card">
                <span class="rule-tag" id="cxp-rule"></span>
                <span class="difficulty-tag" id="cxp-difficulty"></span>
                <div class="question-text" id="cxp-text"></div>
                <div class="question-prompt" id="cxp-latex"></div>
                <div id="cxp-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="cxp-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="cxp-feedback">
                <div class="feedback-title" id="cxp-feedback-title"></div>
                <div class="feedback-explanation" id="cxp-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cxp-hint-btn" onclick="COMPLEX_POLAR.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cxp-next-btn" onclick="COMPLEX_POLAR.next()" style="display:none;">Next Question</button>
            </div>
        `;

        COMPLEX_POLAR.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        COMPLEX_POLAR.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        COMPLEX_POLAR.score = 0;
        COMPLEX_POLAR.total = 0;
        COMPLEX_POLAR.streak = 0;
        COMPLEX_POLAR.updateStats();
        COMPLEX_POLAR.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        COMPLEX_POLAR.answered = false;
        COMPLEX_POLAR.hintIndex = 0;
        COMPLEX_POLAR.currentQ = COMPLEX_POLAR.pickQuestion();
        const q = COMPLEX_POLAR.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('cxp-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('cxp-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('cxp-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('cxp-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('cxp-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="COMPLEX_POLAR.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="cxp-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')COMPLEX_POLAR.checkFree()">
                    <button class="btn btn-primary" onclick="COMPLEX_POLAR.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('cxp-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint / feedback / next
        const hintBox = document.getElementById('cxp-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('cxp-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('cxp-next-btn').style.display = 'none';
        document.getElementById('cxp-hint-btn').style.display = '';
        document.getElementById('cxp-hint-btn').disabled = false;

        // Render KaTeX
        COMPLEX_POLAR.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = COMPLEX_POLAR.currentQ;
        if (!q || !q.hintTex || COMPLEX_POLAR.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('cxp-hint-box');
        const prevContent = COMPLEX_POLAR.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prevContent + `<span>\\(${q.hintTex[COMPLEX_POLAR.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        COMPLEX_POLAR.hintIndex++;

        if (COMPLEX_POLAR.hintIndex >= q.hintTex.length) {
            document.getElementById('cxp-hint-btn').disabled = true;
        }

        COMPLEX_POLAR.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (COMPLEX_POLAR.answered) return;
        COMPLEX_POLAR.answered = true;
        COMPLEX_POLAR.total++;

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
            COMPLEX_POLAR.score++;
            COMPLEX_POLAR.streak++;
        } else {
            btn.classList.add('incorrect');
            COMPLEX_POLAR.streak = 0;
        }

        COMPLEX_POLAR.showFeedback(isCorrect);
        COMPLEX_POLAR.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (COMPLEX_POLAR.answered) return;

        const inp = document.getElementById('cxp-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        COMPLEX_POLAR.answered = true;
        COMPLEX_POLAR.total++;
        inp.disabled = true;

        const q = COMPLEX_POLAR.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            COMPLEX_POLAR.score++;
            COMPLEX_POLAR.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            COMPLEX_POLAR.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        COMPLEX_POLAR.showFeedback(isCorrect);
        COMPLEX_POLAR.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = COMPLEX_POLAR.currentQ;
        const fb = document.getElementById('cxp-feedback');
        const title = document.getElementById('cxp-feedback-title');
        const explanation = document.getElementById('cxp-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = COMPLEX_POLAR.streak > 1
                ? `Correct! (${COMPLEX_POLAR.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next, hide hint
        document.getElementById('cxp-next-btn').style.display = '';
        document.getElementById('cxp-hint-btn').style.display = 'none';

        COMPLEX_POLAR.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('cxp-score');
        const totalEl  = document.getElementById('cxp-total');
        const streakEl = document.getElementById('cxp-streak');
        const accEl    = document.getElementById('cxp-accuracy');

        if (scoreEl)  scoreEl.textContent  = COMPLEX_POLAR.score;
        if (totalEl)  totalEl.textContent  = COMPLEX_POLAR.total;
        if (streakEl) streakEl.textContent = COMPLEX_POLAR.streak;
        if (accEl) {
            accEl.textContent = COMPLEX_POLAR.total > 0
                ? Math.round((COMPLEX_POLAR.score / COMPLEX_POLAR.total) * 100) + '%'
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

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['complex-numbers-polar'] = () => COMPLEX_POLAR.load();
}
