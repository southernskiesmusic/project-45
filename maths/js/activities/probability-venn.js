/*
 * probability-venn.js - IB Math AA 4.5–4.7: Probability & Venn Diagrams
 * Addition rule, conditional probability, independence, mutually exclusive events
 */

const PROB_VENN = {
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

    /** Generate a random Venn diagram with integer region counts. */
    genVenn() {
        const a = MathUtils.randInt(3, 20);   // A only
        const b = MathUtils.randInt(3, 20);   // B only
        const c = MathUtils.randInt(2, 15);   // A ∩ B
        const d = MathUtils.randInt(2, 15);   // neither
        const total = a + b + c + d;
        return { a, b, c, d, total };
    },

    /** Round to 4 decimal places. */
    r4(x) {
        return Math.round(x * 10000) / 10000;
    },

    /** Format a decimal to exactly 4 dp as a string for LaTeX display. */
    dp4(x) {
        return x.toFixed(4);
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qProbA - Easy / Free
     * Given Venn data, find P(A).
     */
    qProbA() {
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        const answer = PROB_VENN.r4((a + c) / total);

        return {
            type: 'free',
            rule: 'P(A) from Venn Diagram',
            difficulty: 'easy',
            text: `In a survey of ${total} students: ${a} study only Maths, ${b} study only Science, ${c} study both, and ${d} study neither. Find \\(P(A)\\), where A = "studies Maths".`,
            latex: `\\(P(A) = \\dfrac{n(A)}{n(U)}\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `n(A) = n(\\text{A only}) + n(A \\cap B) = ${a} + ${c} = ${a + c}`,
                `P(A) = \\frac{n(A)}{n(U)} = \\frac{${a + c}}{${total}} \\approx ${PROB_VENN.dp4(answer)}`
            ],
            explain: `<strong>Step 1:</strong> Count all students in event A (Maths):<br>` +
                     `\\(n(A) = n(\\text{A only}) + n(A \\cap B) = ${a} + ${c} = ${a + c}\\).<br><br>` +
                     `<strong>Step 2:</strong> Total students: \\(n(U) = ${total}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(A) = \\dfrac{${a + c}}{${total}} \\approx ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 2. qProbComplement - Easy / Free
     * Given Venn data, find P(A').
     */
    qProbComplement() {
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        const pA = (a + c) / total;
        const answer = PROB_VENN.r4(1 - pA);

        return {
            type: 'free',
            rule: "P(A') — Complement",
            difficulty: 'easy',
            text: `In a survey of ${total} students: ${a} study only Maths, ${b} study only Science, ${c} study both, and ${d} study neither. Find \\(P(A')\\), where A = "studies Maths".`,
            latex: `\\(P(A') = 1 - P(A)\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `P(A) = \\frac{${a + c}}{${total}}, \\quad P(A') = 1 - P(A)`,
                `P(A') = \\frac{${b + d}}{${total}} \\approx ${PROB_VENN.dp4(answer)}`
            ],
            explain: `<strong>Step 1:</strong> Students NOT in A (not studying Maths) = B only + neither = \\(${b} + ${d} = ${b + d}\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(P(A') = 1 - P(A) = 1 - \\dfrac{${a + c}}{${total}} = \\dfrac{${b + d}}{${total}} \\approx ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 3. qProbIntersection - Easy / Free
     * Given Venn data, find P(A∩B).
     */
    qProbIntersection() {
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        const answer = PROB_VENN.r4(c / total);

        return {
            type: 'free',
            rule: 'P(A∩B) — Intersection',
            difficulty: 'easy',
            text: `In a survey of ${total} students: ${a} study only Maths, ${b} study only Science, ${c} study both, and ${d} study neither. Find \\(P(A \\cap B)\\).`,
            latex: `\\(P(A \\cap B) = \\dfrac{n(A \\cap B)}{n(U)}\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `n(A \\cap B) = ${c} \\text{ (the "both" region)}`,
                `P(A \\cap B) = \\frac{${c}}{${total}} \\approx ${PROB_VENN.dp4(answer)}`
            ],
            explain: `<strong>Step 1:</strong> The intersection region contains the students studying both Maths and Science: \\(n(A \\cap B) = ${c}\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(P(A \\cap B) = \\dfrac{${c}}{${total}} \\approx ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 4. qProbUnion - Easy / Free
     * Given Venn data, find P(A∪B) using the addition rule.
     */
    qProbUnion() {
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        const pA = (a + c) / total;
        const pB = (b + c) / total;
        const pInt = c / total;
        const answer = PROB_VENN.r4((a + b + c) / total);

        return {
            type: 'free',
            rule: 'P(A∪B) — Union',
            difficulty: 'easy',
            text: `In a survey of ${total} students: ${a} study only Maths, ${b} study only Science, ${c} study both, and ${d} study neither. Find \\(P(A \\cup B)\\).`,
            latex: `\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `P(A) = \\frac{${a + c}}{${total}}, \\quad P(B) = \\frac{${b + c}}{${total}}, \\quad P(A \\cap B) = \\frac{${c}}{${total}}`,
                `P(A \\cup B) = \\frac{${a + c}}{${total}} + \\frac{${b + c}}{${total}} - \\frac{${c}}{${total}} = \\frac{${a + b + c}}{${total}}`
            ],
            explain: `<strong>Step 1:</strong> Apply the addition rule: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute values:<br>` +
                     `\\(= \\dfrac{${a + c}}{${total}} + \\dfrac{${b + c}}{${total}} - \\dfrac{${c}}{${total}}\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\dfrac{${a + b + c}}{${total}} \\approx ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 5. qAdditionRule - Medium / Free
     * Given P(A), P(B), P(A∩B) as decimals, find P(A∪B).
     */
    qAdditionRule() {
        // Use integer Venn counts but present as decimals
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        const pA   = PROB_VENN.r4((a + c) / total);
        const pB   = PROB_VENN.r4((b + c) / total);
        const pInt = PROB_VENN.r4(c / total);
        const answer = PROB_VENN.r4(pA + pB - pInt);

        return {
            type: 'free',
            rule: 'Addition Rule',
            difficulty: 'medium',
            text: `Given that \\(P(A) = ${PROB_VENN.dp4(pA)}\\), \\(P(B) = ${PROB_VENN.dp4(pB)}\\), and \\(P(A \\cap B) = ${PROB_VENN.dp4(pInt)}\\), find \\(P(A \\cup B)\\).`,
            latex: `\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `\\text{Addition rule: } P(A \\cup B) = P(A) + P(B) - P(A \\cap B)`,
                `= ${PROB_VENN.dp4(pA)} + ${PROB_VENN.dp4(pB)} - ${PROB_VENN.dp4(pInt)}`
            ],
            explain: `<strong>Step 1:</strong> Recall the addition rule:<br>` +
                     `\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute the given values:<br>` +
                     `\\(= ${PROB_VENN.dp4(pA)} + ${PROB_VENN.dp4(pB)} - ${PROB_VENN.dp4(pInt)}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(A \\cup B) \\approx ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 6. qConditionalP - Medium / Free
     * Find P(A|B) = P(A∩B)/P(B) = c/(b+c).
     */
    qConditionalP() {
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        const answer = PROB_VENN.r4(c / (b + c));

        return {
            type: 'free',
            rule: 'Conditional P(A|B)',
            difficulty: 'medium',
            text: `In a survey of ${total} students: ${a} study only Maths, ${b} study only Science, ${c} study both, and ${d} study neither. Find \\(P(A \\mid B)\\), where A = "studies Maths" and B = "studies Science".`,
            latex: `\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `n(B) = n(\\text{B only}) + n(A \\cap B) = ${b} + ${c} = ${b + c}`,
                `P(A \\mid B) = \\frac{n(A \\cap B)}{n(B)} = \\frac{${c}}{${b + c}} \\approx ${PROB_VENN.dp4(answer)}`
            ],
            explain: `<strong>Step 1:</strong> Count students in B (Science): \\(n(B) = ${b} + ${c} = ${b + c}\\).<br><br>` +
                     `<strong>Step 2:</strong> Of those, \\(${c}\\) also study Maths, so \\(n(A \\cap B) = ${c}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(A \\mid B) = \\dfrac{n(A \\cap B)}{n(B)} = \\dfrac{${c}}{${b + c}} \\approx ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 7. qConditionalComplement - Medium / Free
     * Find P(A|B') = P(A∩B')/P(B') = a/(a+d).
     */
    qConditionalComplement() {
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        const answer = PROB_VENN.r4(a / (a + d));

        return {
            type: 'free',
            rule: "Conditional P(A|B')",
            difficulty: 'medium',
            text: `In a survey of ${total} students: ${a} study only Maths, ${b} study only Science, ${c} study both, and ${d} study neither. Find \\(P(A \\mid B')\\), where A = "studies Maths" and B = "studies Science".`,
            latex: `\\(P(A \\mid B') = \\dfrac{P(A \\cap B')}{P(B')}\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `B' = \\text{"not Science"}: n(B') = n(\\text{A only}) + n(\\text{neither}) = ${a} + ${d} = ${a + d}`,
                `P(A \\mid B') = \\frac{n(A \\cap B')}{n(B')} = \\frac{${a}}{${a + d}} \\approx ${PROB_VENN.dp4(answer)}`
            ],
            explain: `<strong>Step 1:</strong> Identify students in B' (not Science): A only + neither = \\(${a} + ${d} = ${a + d}\\).<br><br>` +
                     `<strong>Step 2:</strong> Of those, \\(${a}\\) study Maths (A only), so \\(n(A \\cap B') = ${a}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(A \\mid B') = \\dfrac{${a}}{${a + d}} \\approx ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 8. qIndependenceTest - Hard / MC
     * Are A and B independent? A⊥B iff P(A∩B) = P(A)·P(B).
     * Randomise to sometimes be truly independent.
     */
    qIndependenceTest() {
        let a, b, c, d, total, pA, pB, pInt, isIndep;

        // 50% chance of generating a truly independent scenario
        if (MathUtils.randInt(0, 1) === 1) {
            // Force independence: pick P(A) and P(B) as simple fractions, set c accordingly
            total = MathUtils.pick([20, 25, 30, 40, 50]);
            const pAFrac = MathUtils.pick([[1, 4], [1, 5], [2, 5], [3, 10], [3, 5]]);
            const pBFrac = MathUtils.pick([[1, 4], [1, 5], [2, 5], [3, 10], [1, 2]]);
            // n(A) and n(B) must be integers
            const nA = Math.round(total * pAFrac[0] / pAFrac[1]);
            const nB = Math.round(total * pBFrac[0] / pBFrac[1]);
            c = Math.round(nA * nB / total);
            if (c < 1) c = 1;
            a = nA - c;
            b = nB - c;
            d = total - a - b - c;
            if (a < 0 || b < 0 || d < 0) {
                // Fallback to non-independent
                ({ a, b, c, d, total } = PROB_VENN.genVenn());
                isIndep = false;
            } else {
                isIndep = true;
            }
        } else {
            ({ a, b, c, d, total } = PROB_VENN.genVenn());
            isIndep = false;
        }

        pA   = PROB_VENN.r4((a + c) / total);
        pB   = PROB_VENN.r4((b + c) / total);
        pInt = PROB_VENN.r4(c / total);
        const product = PROB_VENN.r4(pA * pB);

        // Recheck independence with approxEqual tolerance 0.005
        isIndep = MathUtils.approxEqual(pInt, product, 0.005);

        const correctTex = isIndep ? '\\text{Independent}' : '\\text{Not independent}';

        const optionsList = [
            { value: isIndep ? 1 : 0,  tex: '\\text{Independent}' },
            { value: isIndep ? 0 : 1,  tex: '\\text{Not independent}' },
            { value: 0,                tex: '\\text{Mutually exclusive}' },
            { value: 0,                tex: '\\text{Cannot determine}' }
        ];

        const shuffled = MathUtils.shuffle(optionsList);

        return {
            type: 'mc',
            rule: 'Independence Test',
            difficulty: 'hard',
            text: `Given that \\(P(A) = ${PROB_VENN.dp4(pA)}\\), \\(P(B) = ${PROB_VENN.dp4(pB)}\\), and \\(P(A \\cap B) = ${PROB_VENN.dp4(pInt)}\\), are events A and B independent?`,
            latex: `\\(A \\perp B \\iff P(A \\cap B) = P(A) \\cdot P(B)\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Check: } P(A) \\cdot P(B) = ${PROB_VENN.dp4(pA)} \\times ${PROB_VENN.dp4(pB)}`,
                `= ${PROB_VENN.dp4(product)}, \\quad P(A \\cap B) = ${PROB_VENN.dp4(pInt)}`
            ],
            explain: `<strong>Step 1:</strong> A and B are independent if and only if \\(P(A \\cap B) = P(A) \\cdot P(B)\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate \\(P(A) \\cdot P(B) = ${PROB_VENN.dp4(pA)} \\times ${PROB_VENN.dp4(pB)} = ${PROB_VENN.dp4(product)}\\).<br><br>` +
                     `<strong>Step 3:</strong> Compare with \\(P(A \\cap B) = ${PROB_VENN.dp4(pInt)}\\).<br><br>` +
                     (isIndep
                         ? `<strong>Conclusion:</strong> \\(${PROB_VENN.dp4(product)} \\approx ${PROB_VENN.dp4(pInt)}\\), so A and B <strong>are independent</strong>.`
                         : `<strong>Conclusion:</strong> \\(${PROB_VENN.dp4(product)} \\neq ${PROB_VENN.dp4(pInt)}\\), so A and B are <strong>not independent</strong>.`)
        };
    },

    /**
     * 9. qMutuallyExclusive - Medium / MC
     * If A and B are mutually exclusive, find P(A∪B) = P(A)+P(B).
     */
    qMutuallyExclusive() {
        // Pick P(A) and P(B) as fractions with denominator from {5,8,10,12,20}
        const denoms = [5, 8, 10, 12, 20];
        const den = MathUtils.pick(denoms);
        let numA, numB;
        do {
            numA = MathUtils.randInt(1, den - 2);
            numB = MathUtils.randInt(1, den - 1 - numA);
        } while (numA + numB >= den);

        const pA = PROB_VENN.r4(numA / den);
        const pB = PROB_VENN.r4(numB / den);
        const answer = PROB_VENN.r4(pA + pB);

        const correctTex = `P(A \\cup B) = ${PROB_VENN.dp4(answer)}`;

        // Distractors
        const dist1 = PROB_VENN.r4(pA * pB);                  // Wrong: P(A)·P(B)
        const dist2 = PROB_VENN.r4(pA + pB - pA * pB);        // Wrong: used non-ME formula
        const dist3 = PROB_VENN.r4(Math.abs(pA - pB));         // Wrong: difference

        const optionsList = [
            { value: 1, tex: `P(A \\cup B) = ${PROB_VENN.dp4(answer)}` },
            { value: 0, tex: `P(A \\cup B) = ${PROB_VENN.dp4(dist2)}` },
            { value: 0, tex: `P(A \\cup B) = ${PROB_VENN.dp4(dist1)}` },
            { value: 0, tex: `P(A \\cup B) = ${PROB_VENN.dp4(dist3)}` }
        ];

        // Deduplicate
        const seen = new Set();
        const unique = [];
        for (const opt of optionsList) {
            if (!seen.has(opt.tex)) {
                seen.add(opt.tex);
                unique.push(opt);
            }
        }
        while (unique.length < 4) {
            const off = PROB_VENN.r4(unique.length * 0.05);
            const candidate = `P(A \\cup B) = ${PROB_VENN.dp4(PROB_VENN.r4(answer + off))}`;
            if (!seen.has(candidate)) {
                seen.add(candidate);
                unique.push({ value: 0, tex: candidate });
            }
        }

        const shuffled = MathUtils.shuffle(unique);

        return {
            type: 'mc',
            rule: 'Mutually Exclusive Events',
            difficulty: 'medium',
            text: `Events A and B are mutually exclusive with \\(P(A) = ${PROB_VENN.dp4(pA)}\\) and \\(P(B) = ${PROB_VENN.dp4(pB)}\\). Find \\(P(A \\cup B)\\).`,
            latex: `\\(A \\cap B = \\emptyset \\implies P(A \\cup B) = P(A) + P(B)\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Mutually exclusive means } P(A \\cap B) = 0`,
                `P(A \\cup B) = P(A) + P(B) - 0 = ${PROB_VENN.dp4(pA)} + ${PROB_VENN.dp4(pB)}`
            ],
            explain: `<strong>Step 1:</strong> If A and B are mutually exclusive, they cannot occur together, so \\(P(A \\cap B) = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the addition rule:<br>` +
                     `\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)<br>` +
                     `\\(= ${PROB_VENN.dp4(pA)} + ${PROB_VENN.dp4(pB)} - 0\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(A \\cup B) = ${PROB_VENN.dp4(answer)}\\).`
        };
    },

    /**
     * 10. qBayesSimple - Hard / Free
     * Given P(A|B), P(B), P(A), find P(B|A) via Bayes' theorem.
     * Use simple fractions so the answer is a clean decimal.
     */
    qBayesSimple() {
        // Build from integer counts to guarantee clean arithmetic
        const { a, b, c, d, total } = PROB_VENN.genVenn();
        // P(A|B) = c/(b+c), P(B) = (b+c)/total, P(A) = (a+c)/total
        // P(B|A) = P(A|B)·P(B)/P(A) = [c/(b+c)] · [(b+c)/total] / [(a+c)/total]
        //        = c / (a+c)
        const pAgivenB = PROB_VENN.r4(c / (b + c));
        const pB       = PROB_VENN.r4((b + c) / total);
        const pA       = PROB_VENN.r4((a + c) / total);
        const answer   = PROB_VENN.r4(c / (a + c));

        return {
            type: 'free',
            rule: "Bayes' Theorem (Simple)",
            difficulty: 'hard',
            text: `Given \\(P(A \\mid B) = ${PROB_VENN.dp4(pAgivenB)}\\), \\(P(B) = ${PROB_VENN.dp4(pB)}\\), and \\(P(A) = ${PROB_VENN.dp4(pA)}\\), find \\(P(B \\mid A)\\). Give your answer to 4 decimal places.`,
            latex: `\\(P(B \\mid A) = \\dfrac{P(A \\mid B) \\cdot P(B)}{P(A)}\\)`,
            answer: answer,
            answerTex: PROB_VENN.dp4(answer),
            options: [],
            hintTex: [
                `\\text{Bayes' theorem: } P(B \\mid A) = \\frac{P(A \\mid B) \\cdot P(B)}{P(A)}`,
                `= \\frac{${PROB_VENN.dp4(pAgivenB)} \\times ${PROB_VENN.dp4(pB)}}{${PROB_VENN.dp4(pA)}}`
            ],
            explain: `<strong>Step 1:</strong> Apply Bayes' theorem:<br>` +
                     `\\(P(B \\mid A) = \\dfrac{P(A \\mid B) \\cdot P(B)}{P(A)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute the given values:<br>` +
                     `\\(= \\dfrac{${PROB_VENN.dp4(pAgivenB)} \\times ${PROB_VENN.dp4(pB)}}{${PROB_VENN.dp4(pA)}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(B \\mid A) \\approx ${PROB_VENN.dp4(answer)}\\).<br><br>` +
                     `<em>Note: This is equivalent to \\(\\frac{n(A \\cap B)}{n(A)} = \\frac{${c}}{${a + c}}\\) directly from the Venn diagram.</em>`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => PROB_VENN.qProbA(),                weight: 3 },
            { fn: () => PROB_VENN.qProbComplement(),       weight: 3 },
            { fn: () => PROB_VENN.qProbIntersection(),     weight: 3 },
            { fn: () => PROB_VENN.qProbUnion(),            weight: 3 },
            { fn: () => PROB_VENN.qAdditionRule(),         weight: 2 },
            { fn: () => PROB_VENN.qConditionalP(),         weight: 2 },
            { fn: () => PROB_VENN.qConditionalComplement(), weight: 2 },
            { fn: () => PROB_VENN.qIndependenceTest(),     weight: 1 },
            { fn: () => PROB_VENN.qMutuallyExclusive(),    weight: 2 },
            { fn: () => PROB_VENN.qBayesSimple(),          weight: 1 }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (PROB_VENN.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 2, 3].includes(i));
        } else if (PROB_VENN.level === 'medium') {
            filtered = pool.filter((_, i) => [4, 5, 6, 8].includes(i));
        } else if (PROB_VENN.level === 'hard') {
            filtered = pool.filter((_, i) => [7, 9].includes(i));
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
        PROB_VENN.score = 0;
        PROB_VENN.total = 0;
        PROB_VENN.streak = 0;
        PROB_VENN.answered = false;
        PROB_VENN.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PROB_VENN.unload()">Probability &amp; Venn Diagrams (4.5–4.7)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Probability &amp; Venn Diagrams</h1>
                <p>IB Math AA 4.5–4.7 – Addition rule, conditional probability</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="PROB_VENN.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="PROB_VENN.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="PROB_VENN.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="PROB_VENN.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="pvenn-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="pvenn-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="pvenn-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="pvenn-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="pvenn-question-card">
                <span class="rule-tag" id="pvenn-rule"></span>
                <span class="difficulty-tag" id="pvenn-difficulty"></span>
                <div class="question-text" id="pvenn-text"></div>
                <div class="question-prompt" id="pvenn-latex"></div>
                <div id="pvenn-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="pvenn-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="pvenn-feedback">
                <div class="feedback-title" id="pvenn-feedback-title"></div>
                <div class="feedback-explanation" id="pvenn-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="pvenn-hint-btn" onclick="PROB_VENN.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="pvenn-next-btn" onclick="PROB_VENN.next()" style="display:none;">Next Question</button>
            </div>
        `;

        PROB_VENN.next();
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
        PROB_VENN.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        PROB_VENN.score = 0;
        PROB_VENN.total = 0;
        PROB_VENN.streak = 0;
        PROB_VENN.updateStats();
        PROB_VENN.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        PROB_VENN.answered = false;
        PROB_VENN.hintIndex = 0;
        PROB_VENN.currentQ = PROB_VENN.pickQuestion();
        const q = PROB_VENN.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('pvenn-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('pvenn-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('pvenn-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('pvenn-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('pvenn-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="PROB_VENN.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="pvenn-input"
                           placeholder="Your answer (4 d.p.)" autocomplete="off"
                           onkeydown="if(event.key==='Enter')PROB_VENN.checkFree()">
                    <button class="btn btn-primary" onclick="PROB_VENN.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('pvenn-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('pvenn-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('pvenn-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('pvenn-next-btn').style.display = 'none';
        document.getElementById('pvenn-hint-btn').style.display = '';
        document.getElementById('pvenn-hint-btn').disabled = false;

        // Render KaTeX
        PROB_VENN.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = PROB_VENN.currentQ;
        if (!q || !q.hintTex || PROB_VENN.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('pvenn-hint-box');
        const hintContent = PROB_VENN.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[PROB_VENN.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        PROB_VENN.hintIndex++;

        if (PROB_VENN.hintIndex >= q.hintTex.length) {
            document.getElementById('pvenn-hint-btn').disabled = true;
        }

        PROB_VENN.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (PROB_VENN.answered) return;
        PROB_VENN.answered = true;
        PROB_VENN.total++;

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
            PROB_VENN.score++;
            PROB_VENN.streak++;
        } else {
            btn.classList.add('incorrect');
            PROB_VENN.streak = 0;
        }

        PROB_VENN.showFeedback(isCorrect);
        PROB_VENN.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (PROB_VENN.answered) return;

        const inp = document.getElementById('pvenn-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        PROB_VENN.answered = true;
        PROB_VENN.total++;
        inp.disabled = true;

        const q = PROB_VENN.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.005);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            PROB_VENN.score++;
            PROB_VENN.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            PROB_VENN.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        PROB_VENN.showFeedback(isCorrect);
        PROB_VENN.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = PROB_VENN.currentQ;
        const fb = document.getElementById('pvenn-feedback');
        const title = document.getElementById('pvenn-feedback-title');
        const explanation = document.getElementById('pvenn-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (PROB_VENN.streak > 1) {
                title.textContent = `Correct! (${PROB_VENN.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('pvenn-next-btn').style.display = '';
        document.getElementById('pvenn-hint-btn').style.display = 'none';

        PROB_VENN.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('pvenn-score');
        const totalEl  = document.getElementById('pvenn-total');
        const streakEl = document.getElementById('pvenn-streak');
        const accEl    = document.getElementById('pvenn-accuracy');

        if (scoreEl)  scoreEl.textContent  = PROB_VENN.score;
        if (totalEl)  totalEl.textContent  = PROB_VENN.total;
        if (streakEl) streakEl.textContent = PROB_VENN.streak;
        if (accEl) {
            accEl.textContent = PROB_VENN.total > 0
                ? Math.round((PROB_VENN.score / PROB_VENN.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['probability-venn'] = () => PROB_VENN.load();
