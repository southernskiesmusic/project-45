/*
 * further-trig-functions.js - IB Math AA 3.9: Further Trig Functions
 * Reciprocal trig (sec, csc, cot), Pythagorean identities, inverse trig (arcsin, arccos, arctan)
 */

const TRIG_FUNC2 = {
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
     * 1. qEvaluateSec - Easy (MC)
     * Evaluate sec(θ) for θ ∈ {0°, 60°, 45°, 30°}. Exact values.
     */
    qEvaluateSec() {
        const cases = [
            {
                angle: 0,
                cosTex: '1',
                answerTex: '1',
                answerVal: 1,
                distractors: ['0', '-1', '\\dfrac{1}{2}']
            },
            {
                angle: 60,
                cosTex: '\\dfrac{1}{2}',
                answerTex: '2',
                answerVal: 2,
                distractors: ['\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}', '\\dfrac{\\sqrt{2}}{2}']
            },
            {
                angle: 45,
                cosTex: '\\dfrac{\\sqrt{2}}{2}',
                answerTex: '\\sqrt{2}',
                answerVal: Math.sqrt(2),
                distractors: ['\\dfrac{\\sqrt{2}}{2}', '2', '\\dfrac{1}{\\sqrt{3}}']
            },
            {
                angle: 30,
                cosTex: '\\dfrac{\\sqrt{3}}{2}',
                answerTex: '\\dfrac{2\\sqrt{3}}{3}',
                answerVal: 2 / Math.sqrt(3),
                distractors: ['\\dfrac{\\sqrt{3}}{2}', '\\dfrac{\\sqrt{3}}{3}', '\\dfrac{2}{3}']
            }
        ];

        const c = MathUtils.pick(cases);

        const optionTexts = [c.answerTex, ...c.distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Evaluate sec(θ)',
            difficulty: 'easy',
            text: `Evaluate the expression below, giving an exact value.`,
            latex: `\\(\\sec(${c.angle}^\\circ)\\)`,
            answer: 1,
            answerTex: c.answerTex,
            options: shuffled,
            hintTex: [
                `\\sec(\\theta) = \\dfrac{1}{\\cos(\\theta)}`,
                `\\cos(${c.angle}^\\circ) = ${c.cosTex} \\implies \\sec(${c.angle}^\\circ) = \\dfrac{1}{${c.cosTex}} = ${c.answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Recall the definition \\(\\sec(\\theta) = \\dfrac{1}{\\cos(\\theta)}\\).<br><br>` +
                     `<strong>Step 2:</strong> The exact value is \\(\\cos(${c.angle}^\\circ) = ${c.cosTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Therefore \\(\\sec(${c.angle}^\\circ) = \\dfrac{1}{${c.cosTex}} = ${c.answerTex}\\).`
        };
    },

    /**
     * 2. qEvaluateCsc - Easy (MC)
     * Evaluate csc(θ) for θ ∈ {30°, 45°, 60°, 90°}. csc = 1/sin.
     */
    qEvaluateCsc() {
        const cases = [
            {
                angle: 30,
                sinTex: '\\dfrac{1}{2}',
                answerTex: '2',
                distractors: ['\\dfrac{1}{2}', '\\dfrac{\\sqrt{3}}{2}', '\\sqrt{2}']
            },
            {
                angle: 45,
                sinTex: '\\dfrac{\\sqrt{2}}{2}',
                answerTex: '\\sqrt{2}',
                distractors: ['\\dfrac{\\sqrt{2}}{2}', '2', '\\dfrac{2\\sqrt{3}}{3}']
            },
            {
                angle: 60,
                sinTex: '\\dfrac{\\sqrt{3}}{2}',
                answerTex: '\\dfrac{2\\sqrt{3}}{3}',
                distractors: ['\\dfrac{\\sqrt{3}}{2}', '2', '\\dfrac{\\sqrt{3}}{3}']
            },
            {
                angle: 90,
                sinTex: '1',
                answerTex: '1',
                distractors: ['0', '\\dfrac{1}{2}', '-1']
            }
        ];

        const c = MathUtils.pick(cases);

        const optionTexts = [c.answerTex, ...c.distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Evaluate csc(θ)',
            difficulty: 'easy',
            text: `Evaluate the expression below, giving an exact value.`,
            latex: `\\(\\csc(${c.angle}^\\circ)\\)`,
            answer: 1,
            answerTex: c.answerTex,
            options: shuffled,
            hintTex: [
                `\\csc(\\theta) = \\dfrac{1}{\\sin(\\theta)}`,
                `\\sin(${c.angle}^\\circ) = ${c.sinTex} \\implies \\csc(${c.angle}^\\circ) = \\dfrac{1}{${c.sinTex}} = ${c.answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Recall the definition \\(\\csc(\\theta) = \\dfrac{1}{\\sin(\\theta)}\\).<br><br>` +
                     `<strong>Step 2:</strong> The exact value is \\(\\sin(${c.angle}^\\circ) = ${c.sinTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Therefore \\(\\csc(${c.angle}^\\circ) = \\dfrac{1}{${c.sinTex}} = ${c.answerTex}\\).`
        };
    },

    /**
     * 3. qEvaluateCot - Easy (MC)
     * Evaluate cot(θ) for θ ∈ {30°, 45°, 60°}. cot = cos/sin.
     */
    qEvaluateCot() {
        const cases = [
            {
                angle: 30,
                sinTex: '\\dfrac{1}{2}',
                cosTex: '\\dfrac{\\sqrt{3}}{2}',
                answerTex: '\\sqrt{3}',
                distractors: ['\\dfrac{\\sqrt{3}}{3}', '\\dfrac{1}{\\sqrt{3}}', '\\dfrac{1}{2}']
            },
            {
                angle: 45,
                sinTex: '\\dfrac{\\sqrt{2}}{2}',
                cosTex: '\\dfrac{\\sqrt{2}}{2}',
                answerTex: '1',
                distractors: ['\\sqrt{2}', '\\dfrac{\\sqrt{2}}{2}', '0']
            },
            {
                angle: 60,
                sinTex: '\\dfrac{\\sqrt{3}}{2}',
                cosTex: '\\dfrac{1}{2}',
                answerTex: '\\dfrac{\\sqrt{3}}{3}',
                distractors: ['\\sqrt{3}', '\\dfrac{1}{2}', '\\dfrac{2\\sqrt{3}}{3}']
            }
        ];

        const c = MathUtils.pick(cases);

        const optionTexts = [c.answerTex, ...c.distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Evaluate cot(θ)',
            difficulty: 'easy',
            text: `Evaluate the expression below, giving an exact value.`,
            latex: `\\(\\cot(${c.angle}^\\circ)\\)`,
            answer: 1,
            answerTex: c.answerTex,
            options: shuffled,
            hintTex: [
                `\\cot(\\theta) = \\dfrac{\\cos(\\theta)}{\\sin(\\theta)}`,
                `= \\dfrac{${c.cosTex}}{${c.sinTex}} = ${c.answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Recall the definition \\(\\cot(\\theta) = \\dfrac{\\cos(\\theta)}{\\sin(\\theta)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute the exact values: \\(\\cos(${c.angle}^\\circ) = ${c.cosTex}\\) and \\(\\sin(${c.angle}^\\circ) = ${c.sinTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Therefore \\(\\cot(${c.angle}^\\circ) = \\dfrac{${c.cosTex}}{${c.sinTex}} = ${c.answerTex}\\).`
        };
    },

    /**
     * 4. qSecIdentity - Medium (Free response)
     * Given tan(x) = a, find sec²(x) using 1 + tan²x = sec²x.
     */
    qSecIdentity() {
        const values = [1, 2, 3, 4, -1, -2, -3];
        const a = MathUtils.pick(values);
        const answer = 1 + a * a;

        return {
            type: 'free',
            rule: 'sec² Identity',
            difficulty: 'medium',
            text: `Given that \\(\\tan(x) = ${a}\\), find the value of \\(\\sec^2(x)\\).`,
            latex: `\\text{Use the identity } 1 + \\tan^2 x = \\sec^2 x`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `1 + \\tan^2 x = \\sec^2 x`,
                `\\sec^2 x = 1 + (${a})^2 = 1 + ${a * a} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Recall the Pythagorean identity \\(1 + \\tan^2 x = \\sec^2 x\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(\\tan(x) = ${a}\\):<br>` +
                     `\\(\\sec^2 x = 1 + (${a})^2\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(\\sec^2 x = 1 + ${a * a} = ${answer}\\).`
        };
    },

    /**
     * 5. qCscIdentity - Medium (Free response)
     * Given cot(x) = a, find csc²(x) using 1 + cot²x = csc²x.
     */
    qCscIdentity() {
        const values = [1, 2, 3, 4, -1, -2, -3];
        const a = MathUtils.pick(values);
        const answer = 1 + a * a;

        return {
            type: 'free',
            rule: 'csc² Identity',
            difficulty: 'medium',
            text: `Given that \\(\\cot(x) = ${a}\\), find the value of \\(\\csc^2(x)\\).`,
            latex: `\\text{Use the identity } 1 + \\cot^2 x = \\csc^2 x`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `1 + \\cot^2 x = \\csc^2 x`,
                `\\csc^2 x = 1 + (${a})^2 = 1 + ${a * a} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Recall the Pythagorean identity \\(1 + \\cot^2 x = \\csc^2 x\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(\\cot(x) = ${a}\\):<br>` +
                     `\\(\\csc^2 x = 1 + (${a})^2\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(\\csc^2 x = 1 + ${a * a} = ${answer}\\).`
        };
    },

    /**
     * 6. qArcsinValue - Easy (MC)
     * arcsin(k) for k ∈ {0, 0.5, √2/2, √3/2, 1}. Answer in degrees.
     */
    qArcsinValue() {
        const cases = [
            { kTex: '0',                  answer: 0,  distractors: [30, 45, 90]  },
            { kTex: '\\dfrac{1}{2}',      answer: 30, distractors: [0, 45, 60]   },
            { kTex: '\\dfrac{\\sqrt{2}}{2}', answer: 45, distractors: [30, 60, 90] },
            { kTex: '\\dfrac{\\sqrt{3}}{2}', answer: 60, distractors: [30, 45, 90] },
            { kTex: '1',                  answer: 90, distractors: [0, 45, 60]   }
        ];

        const c = MathUtils.pick(cases);

        const optionTexts = [
            `${c.answer}^\\circ`,
            ...c.distractors.map(d => `${d}^\\circ`)
        ];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'arcsin value',
            difficulty: 'easy',
            text: `Evaluate the expression below. Give your answer in degrees.`,
            latex: `\\(\\arcsin\\!\\left(${c.kTex}\\right)\\)`,
            answer: 1,
            answerTex: `${c.answer}^\\circ`,
            options: shuffled,
            hintTex: [
                `\\arcsin(k) \\text{ gives the angle } \\theta \\in [-90^\\circ, 90^\\circ] \\text{ with } \\sin(\\theta) = k`,
                `\\sin(${c.answer}^\\circ) = ${c.kTex}, \\text{ so } \\arcsin\\!\\left(${c.kTex}\\right) = ${c.answer}^\\circ`
            ],
            explain: `<strong>Step 1:</strong> \\(\\arcsin(k)\\) returns the angle \\(\\theta \\in [-90^\\circ, 90^\\circ]\\) such that \\(\\sin(\\theta) = k\\).<br><br>` +
                     `<strong>Step 2:</strong> We need \\(\\sin(\\theta) = ${c.kTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> From exact value tables, \\(\\sin(${c.answer}^\\circ) = ${c.kTex}\\), so \\(\\arcsin\\!\\left(${c.kTex}\\right) = ${c.answer}^\\circ\\).`
        };
    },

    /**
     * 7. qArccosValue - Easy (MC)
     * arccos(k) for k ∈ {0, 0.5, √2/2, √3/2, 1}. Answer in degrees.
     */
    qArccosValue() {
        const cases = [
            { kTex: '0',                     answer: 90, distractors: [0, 45, 60]  },
            { kTex: '\\dfrac{1}{2}',         answer: 60, distractors: [30, 45, 90] },
            { kTex: '\\dfrac{\\sqrt{2}}{2}', answer: 45, distractors: [30, 60, 90] },
            { kTex: '\\dfrac{\\sqrt{3}}{2}', answer: 30, distractors: [45, 60, 90] },
            { kTex: '1',                     answer: 0,  distractors: [30, 60, 90] }
        ];

        const c = MathUtils.pick(cases);

        const optionTexts = [
            `${c.answer}^\\circ`,
            ...c.distractors.map(d => `${d}^\\circ`)
        ];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'arccos value',
            difficulty: 'easy',
            text: `Evaluate the expression below. Give your answer in degrees.`,
            latex: `\\(\\arccos\\!\\left(${c.kTex}\\right)\\)`,
            answer: 1,
            answerTex: `${c.answer}^\\circ`,
            options: shuffled,
            hintTex: [
                `\\arccos(k) \\text{ gives the angle } \\theta \\in [0^\\circ, 180^\\circ] \\text{ with } \\cos(\\theta) = k`,
                `\\cos(${c.answer}^\\circ) = ${c.kTex}, \\text{ so } \\arccos\\!\\left(${c.kTex}\\right) = ${c.answer}^\\circ`
            ],
            explain: `<strong>Step 1:</strong> \\(\\arccos(k)\\) returns the angle \\(\\theta \\in [0^\\circ, 180^\\circ]\\) such that \\(\\cos(\\theta) = k\\).<br><br>` +
                     `<strong>Step 2:</strong> We need \\(\\cos(\\theta) = ${c.kTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> From exact value tables, \\(\\cos(${c.answer}^\\circ) = ${c.kTex}\\), so \\(\\arccos\\!\\left(${c.kTex}\\right) = ${c.answer}^\\circ\\).`
        };
    },

    /**
     * 8. qArctanValue - Easy (MC)
     * arctan(k) for k ∈ {0, 1, √3, 1/√3}. Answer: 0, 45, 60, 30 degrees.
     */
    qArctanValue() {
        const cases = [
            { kTex: '0',                     answer: 0,  distractors: [30, 45, 90]  },
            { kTex: '1',                     answer: 45, distractors: [0, 30, 60]   },
            { kTex: '\\sqrt{3}',             answer: 60, distractors: [30, 45, 90]  },
            { kTex: '\\dfrac{1}{\\sqrt{3}}', answer: 30, distractors: [0, 45, 60]   }
        ];

        const c = MathUtils.pick(cases);

        const optionTexts = [
            `${c.answer}^\\circ`,
            ...c.distractors.map(d => `${d}^\\circ`)
        ];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'arctan value',
            difficulty: 'easy',
            text: `Evaluate the expression below. Give your answer in degrees.`,
            latex: `\\(\\arctan\\!\\left(${c.kTex}\\right)\\)`,
            answer: 1,
            answerTex: `${c.answer}^\\circ`,
            options: shuffled,
            hintTex: [
                `\\arctan(k) \\text{ gives the angle } \\theta \\in (-90^\\circ, 90^\\circ) \\text{ with } \\tan(\\theta) = k`,
                `\\tan(${c.answer}^\\circ) = ${c.kTex}, \\text{ so } \\arctan\\!\\left(${c.kTex}\\right) = ${c.answer}^\\circ`
            ],
            explain: `<strong>Step 1:</strong> \\(\\arctan(k)\\) returns the angle \\(\\theta \\in (-90^\\circ, 90^\\circ)\\) such that \\(\\tan(\\theta) = k\\).<br><br>` +
                     `<strong>Step 2:</strong> We need \\(\\tan(\\theta) = ${c.kTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> From exact value tables, \\(\\tan(${c.answer}^\\circ) = ${c.kTex}\\), so \\(\\arctan\\!\\left(${c.kTex}\\right) = ${c.answer}^\\circ\\).`
        };
    },

    /**
     * 9. qDomainInverseTrig - Medium (MC)
     * Domain/range of arcsin, arccos, arctan.
     */
    qDomainInverseTrig() {
        const cases = [
            {
                fn: '\\arcsin(x)',
                question: 'What is the domain of \\(\\arcsin(x)\\)?',
                answerTex: '[-1,\\,1]',
                explain:
                    `<strong>Step 1:</strong> \\(\\arcsin(x)\\) is the inverse of \\(\\sin(x)\\) restricted to \\([-90^\\circ, 90^\\circ]\\).<br><br>` +
                    `<strong>Step 2:</strong> The output of \\(\\sin\\) on that interval ranges over \\([-1, 1]\\).<br><br>` +
                    `<strong>Step 3:</strong> Therefore the domain of \\(\\arcsin(x)\\) is \\([-1,\\,1]\\).`,
                distractors: [
                    '(-\\infty,\\,\\infty)',
                    '[0,\\,1]',
                    '[-90^\\circ,\\,90^\\circ]'
                ],
                hintTex: [
                    `\\arcsin(x) \\text{ is the inverse of } \\sin(x) \\text{ on } [-90^\\circ, 90^\\circ]`,
                    `\\text{Domain of } \\arcsin = \\text{Range of } \\sin = [-1,\\,1]`
                ]
            },
            {
                fn: '\\arccos(x)',
                question: 'What is the domain of \\(\\arccos(x)\\)?',
                answerTex: '[-1,\\,1]',
                explain:
                    `<strong>Step 1:</strong> \\(\\arccos(x)\\) is the inverse of \\(\\cos(x)\\) restricted to \\([0^\\circ, 180^\\circ]\\).<br><br>` +
                    `<strong>Step 2:</strong> The output of \\(\\cos\\) on that interval ranges over \\([-1, 1]\\).<br><br>` +
                    `<strong>Step 3:</strong> Therefore the domain of \\(\\arccos(x)\\) is \\([-1,\\,1]\\).`,
                distractors: [
                    '(-\\infty,\\,\\infty)',
                    '[0,\\,1]',
                    '[0^\\circ,\\,180^\\circ]'
                ],
                hintTex: [
                    `\\arccos(x) \\text{ is the inverse of } \\cos(x) \\text{ on } [0^\\circ, 180^\\circ]`,
                    `\\text{Domain of } \\arccos = \\text{Range of } \\cos = [-1,\\,1]`
                ]
            },
            {
                fn: '\\arctan(x)',
                question: 'What is the domain of \\(\\arctan(x)\\)?',
                answerTex: '(-\\infty,\\,\\infty)',
                explain:
                    `<strong>Step 1:</strong> \\(\\arctan(x)\\) is the inverse of \\(\\tan(x)\\) restricted to \\((-90^\\circ, 90^\\circ)\\).<br><br>` +
                    `<strong>Step 2:</strong> \\(\\tan(x)\\) takes all real values on that open interval.<br><br>` +
                    `<strong>Step 3:</strong> Therefore the domain of \\(\\arctan(x)\\) is all real numbers \\((-\\infty,\\,\\infty)\\).`,
                distractors: [
                    '[-1,\\,1]',
                    '(0,\\,\\infty)',
                    '(-90^\\circ,\\,90^\\circ)'
                ],
                hintTex: [
                    `\\arctan(x) \\text{ is the inverse of } \\tan(x) \\text{ on } (-90^\\circ, 90^\\circ)`,
                    `\\tan(x) \\text{ takes all real values on that interval, so domain of } \\arctan = \\mathbb{R}`
                ]
            },
            {
                fn: '\\arcsin(x)',
                question: 'What is the range of \\(\\arcsin(x)\\)?',
                answerTex: '[-90^\\circ,\\,90^\\circ]',
                explain:
                    `<strong>Step 1:</strong> \\(\\arcsin(x)\\) outputs the angle \\(\\theta\\) with \\(\\sin(\\theta) = x\\).<br><br>` +
                    `<strong>Step 2:</strong> The principal range is restricted to \\([-90^\\circ, 90^\\circ]\\) to make the function well-defined.<br><br>` +
                    `<strong>Step 3:</strong> Therefore the range of \\(\\arcsin(x)\\) is \\([-90^\\circ,\\,90^\\circ]\\).`,
                distractors: [
                    '[0^\\circ,\\,180^\\circ]',
                    '(-90^\\circ,\\,90^\\circ)',
                    '[-1,\\,1]'
                ],
                hintTex: [
                    `\\text{The range of an inverse function equals the restricted domain of the original}`,
                    `\\sin(x) \\text{ is restricted to } [-90^\\circ, 90^\\circ], \\text{ so range of } \\arcsin = [-90^\\circ, 90^\\circ]`
                ]
            }
        ];

        const c = MathUtils.pick(cases);

        const optionTexts = [c.answerTex, ...c.distractors];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Domain/Range of Inverse Trig',
            difficulty: 'medium',
            text: c.question,
            latex: '',
            answer: 1,
            answerTex: c.answerTex,
            options: shuffled,
            hintTex: c.hintTex,
            explain: c.explain
        };
    },

    /**
     * 10. qReciprocalFromTrig - Hard (Free response)
     * Given sin(x) = p/q, find csc(x) = q/p.
     */
    qReciprocalFromTrig() {
        // p ∈ {1,2,3}, q ∈ {2,3,4,5} with p < q
        const pairs = [
            [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 3], [2, 5],
            [3, 4], [3, 5]
        ];
        const [p, q] = MathUtils.pick(pairs);
        const [rn, rd] = MathUtils.simplifyFraction(q, p);
        const answer = rn / rd;
        const answerTex = MathUtils.fractionTeX(q, p);
        const givenTex = MathUtils.fractionTeX(p, q);

        return {
            type: 'free',
            rule: 'csc from sin',
            difficulty: 'hard',
            text: `Given that \\(\\sin(x) = ${givenTex}\\), find the exact value of \\(\\csc(x)\\).`,
            latex: `\\text{Enter your answer as a decimal (e.g. } ${(rn / rd).toFixed(4)}\\ldots \\text{)}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\csc(x) = \\dfrac{1}{\\sin(x)}`,
                `\\csc(x) = \\dfrac{1}{${givenTex}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Recall that \\(\\csc(x) = \\dfrac{1}{\\sin(x)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(\\sin(x) = ${givenTex}\\):<br>` +
                     `\\(\\csc(x) = \\dfrac{1}{${givenTex}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Take the reciprocal of the fraction: \\(\\csc(x) = ${answerTex}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => TRIG_FUNC2.qEvaluateSec(),         weight: 3 }, // 0 easy
            { fn: () => TRIG_FUNC2.qEvaluateCsc(),         weight: 3 }, // 1 easy
            { fn: () => TRIG_FUNC2.qEvaluateCot(),         weight: 3 }, // 2 easy
            { fn: () => TRIG_FUNC2.qSecIdentity(),         weight: 2 }, // 3 medium
            { fn: () => TRIG_FUNC2.qCscIdentity(),         weight: 2 }, // 4 medium
            { fn: () => TRIG_FUNC2.qArcsinValue(),         weight: 3 }, // 5 easy
            { fn: () => TRIG_FUNC2.qArccosValue(),         weight: 3 }, // 6 easy
            { fn: () => TRIG_FUNC2.qArctanValue(),         weight: 3 }, // 7 easy
            { fn: () => TRIG_FUNC2.qDomainInverseTrig(),   weight: 2 }, // 8 medium
            { fn: () => TRIG_FUNC2.qReciprocalFromTrig(),  weight: 1 }  // 9 hard
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (TRIG_FUNC2.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 5, 6, 7].includes(i));
        } else if (TRIG_FUNC2.level === 'medium') {
            filtered = pool.filter((_, i) => [3, 4, 8].includes(i));
        } else if (TRIG_FUNC2.level === 'hard') {
            filtered = pool.filter((_, i) => [9].includes(i));
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
        TRIG_FUNC2.score = 0;
        TRIG_FUNC2.total = 0;
        TRIG_FUNC2.streak = 0;
        TRIG_FUNC2.answered = false;
        TRIG_FUNC2.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="TRIG_FUNC2.unload()">Further Trig (3.9)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Further Trig Functions</h1>
                <p>IB Math AA 3.9 — Reciprocal trig, inverse trig functions</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="TRIG_FUNC2.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="TRIG_FUNC2.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="TRIG_FUNC2.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="TRIG_FUNC2.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="trf2-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="trf2-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="trf2-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="trf2-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="trf2-question-card">
                <span class="rule-tag" id="trf2-rule"></span>
                <span class="difficulty-tag" id="trf2-difficulty"></span>
                <div class="question-text" id="trf2-text"></div>
                <div class="question-prompt" id="trf2-latex"></div>
                <div id="trf2-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="trf2-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="trf2-feedback">
                <div class="feedback-title" id="trf2-feedback-title"></div>
                <div class="feedback-explanation" id="trf2-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="trf2-hint-btn" onclick="TRIG_FUNC2.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="trf2-next-btn" onclick="TRIG_FUNC2.next()" style="display:none;">Next Question</button>
            </div>
        `;

        TRIG_FUNC2.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('geometry-trig');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        TRIG_FUNC2.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        TRIG_FUNC2.score = 0;
        TRIG_FUNC2.total = 0;
        TRIG_FUNC2.streak = 0;
        TRIG_FUNC2.updateStats();
        TRIG_FUNC2.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        TRIG_FUNC2.answered = false;
        TRIG_FUNC2.hintIndex = 0;
        TRIG_FUNC2.currentQ = TRIG_FUNC2.pickQuestion();
        const q = TRIG_FUNC2.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('trf2-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('trf2-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('trf2-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('trf2-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('trf2-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="TRIG_FUNC2.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="trf2-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')TRIG_FUNC2.checkFree()">
                    <button class="btn btn-primary" onclick="TRIG_FUNC2.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('trf2-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('trf2-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('trf2-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('trf2-next-btn').style.display = 'none';
        document.getElementById('trf2-hint-btn').style.display = '';
        document.getElementById('trf2-hint-btn').disabled = false;

        // Render KaTeX
        TRIG_FUNC2.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = TRIG_FUNC2.currentQ;
        if (!q || !q.hintTex || TRIG_FUNC2.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('trf2-hint-box');
        const hintContent = TRIG_FUNC2.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[TRIG_FUNC2.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        TRIG_FUNC2.hintIndex++;

        if (TRIG_FUNC2.hintIndex >= q.hintTex.length) {
            document.getElementById('trf2-hint-btn').disabled = true;
        }

        TRIG_FUNC2.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (TRIG_FUNC2.answered) return;
        TRIG_FUNC2.answered = true;
        TRIG_FUNC2.total++;

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
            TRIG_FUNC2.score++;
            TRIG_FUNC2.streak++;
        } else {
            btn.classList.add('incorrect');
            TRIG_FUNC2.streak = 0;
        }

        TRIG_FUNC2.showFeedback(isCorrect);
        TRIG_FUNC2.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (TRIG_FUNC2.answered) return;

        const inp = document.getElementById('trf2-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        TRIG_FUNC2.answered = true;
        TRIG_FUNC2.total++;
        inp.disabled = true;

        const q = TRIG_FUNC2.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            TRIG_FUNC2.score++;
            TRIG_FUNC2.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            TRIG_FUNC2.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        TRIG_FUNC2.showFeedback(isCorrect);
        TRIG_FUNC2.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = TRIG_FUNC2.currentQ;
        const fb = document.getElementById('trf2-feedback');
        const title = document.getElementById('trf2-feedback-title');
        const explanation = document.getElementById('trf2-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (TRIG_FUNC2.streak > 1) {
                title.textContent = `Correct! (${TRIG_FUNC2.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('trf2-next-btn').style.display = '';
        document.getElementById('trf2-hint-btn').style.display = 'none';

        TRIG_FUNC2.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('trf2-score');
        const totalEl = document.getElementById('trf2-total');
        const streakEl = document.getElementById('trf2-streak');
        const accEl = document.getElementById('trf2-accuracy');

        if (scoreEl) scoreEl.textContent = TRIG_FUNC2.score;
        if (totalEl) totalEl.textContent = TRIG_FUNC2.total;
        if (streakEl) streakEl.textContent = TRIG_FUNC2.streak;
        if (accEl) {
            accEl.textContent = TRIG_FUNC2.total > 0
                ? Math.round((TRIG_FUNC2.score / TRIG_FUNC2.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['further-trig-functions'] = () => TRIG_FUNC2.load();
}
