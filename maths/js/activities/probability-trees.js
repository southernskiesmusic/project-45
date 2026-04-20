/*
 * probability-trees.js - IB Math AA 4.8: Probability Trees
 * Tree diagrams, combined events, conditional probability, expected value
 */

const PROB_TREES = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       FRACTION HELPER
       ──────────────────────────────────────────── */

    /** Returns \(\frac{n}{d}\) for inline display */
    frac(n, d) {
        return `\\(\\frac{${n}}{${d}}\\)`;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qPathProbability - Easy (Free)
     * Two-stage tree. P(A)=p1, P(B|A)=p2. Find P(A∩B) = p1 × p2.
     */
    qPathProbability() {
        // Denominators ≤ 5
        const denoms = [2, 3, 4, 5];
        const d1 = MathUtils.pick(denoms);
        const n1 = MathUtils.randInt(1, d1 - 1);
        const d2 = MathUtils.pick(denoms);
        const n2 = MathUtils.randInt(1, d2 - 1);

        const p1 = n1 / d1;
        const p2 = n2 / d2;

        // P(A∩B) = p1 × p2 = (n1×n2)/(d1×d2), simplified
        const numRaw = n1 * n2;
        const denRaw = d1 * d2;
        const gcd = MathUtils.gcd ? MathUtils.gcd(numRaw, denRaw) : (function g(a,b){return b?g(b,a%b):a;})(numRaw, denRaw);
        const numS = numRaw / gcd;
        const denS = denRaw / gcd;

        const answer = parseFloat((p1 * p2).toFixed(4));
        const answerTex = denS === 1 ? String(numS) : `\\frac{${numS}}{${denS}}`;

        const contexts = [
            { eventA: 'it rains', eventB: 'the match is cancelled', label: 'Rain and cancellation' },
            { eventA: 'she catches the bus', eventB: 'she arrives on time', label: 'Bus and punctuality' },
            { eventA: 'the alarm sounds', eventB: 'the evacuation succeeds', label: 'Alarm and evacuation' }
        ];
        const ctx = MathUtils.pick(contexts);

        return {
            type: 'free',
            rule: 'Path Probability',
            difficulty: 'easy',
            text: `A two-stage probability tree has \\(P(A) = ${PROB_TREES.frac(n1,d1)}\\) and \\(P(B \\mid A) = ${PROB_TREES.frac(n2,d2)}\\). Find \\(P(A \\cap B)\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P(A \\cap B) = P(A) \\times P(B \\mid A)`,
                `= \\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}} = \\frac{${numRaw}}{${denRaw}} = \\frac{${numS}}{${denS}}`
            ],
            explain: `<strong>Step 1:</strong> Along a tree diagram, multiply probabilities along the branch.<br><br>` +
                     `<strong>Step 2:</strong> \\(P(A \\cap B) = P(A) \\times P(B \\mid A) = \\frac{${n1}}{${d1}} \\times \\frac{${n2}}{${d2}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\frac{${numRaw}}{${denRaw}} = \\frac{${numS}}{${denS}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 2. qComplementBranch - Easy (Free)
     * P(A) = p. Find P(A'). Context: first flip of a coin.
     */
    qComplementBranch() {
        const fracs = [
            [1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]
        ];
        const [n, d] = MathUtils.pick(fracs);
        const p = n / d;
        const compN = d - n;
        const answer = parseFloat((1 - p).toFixed(4));
        const answerTex = `\\frac{${compN}}{${d}}`;

        return {
            type: 'free',
            rule: 'Complement Branch',
            difficulty: 'easy',
            text: `On the first flip of a biased coin, \\(P(\\text{Heads}) = ${PROB_TREES.frac(n,d)}\\). Find \\(P(\\text{Tails})\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P(A') = 1 - P(A)`,
                `= 1 - \\frac{${n}}{${d}} = \\frac{${d} - ${n}}{${d}} = \\frac{${compN}}{${d}}`
            ],
            explain: `<strong>Step 1:</strong> Probabilities on any branch set must sum to 1.<br><br>` +
                     `<strong>Step 2:</strong> \\(P(\\text{Tails}) = 1 - P(\\text{Heads}) = 1 - \\frac{${n}}{${d}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\frac{${d} - ${n}}{${d}} = \\frac{${compN}}{${d}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 3. qOrRule - Medium (Free)
     * Two mutually exclusive paths to same outcome.
     * P(exactly one head in 2 flips) = P(HT) + P(TH) = p(1-p) + (1-p)p = 2p(1-p)
     */
    qOrRule() {
        const fracs = [
            [1,2],[1,3],[2,3],[2,5],[3,5]
        ];
        const [n, d] = MathUtils.pick(fracs);
        const p = n / d;
        const q = 1 - p;   // complement
        const qN = d - n;

        // P(HT) = p * q, P(TH) = q * p  → total = 2pq
        const numHT = n * qN;
        const denHT = d * d;
        const total2pq = 2 * n * qN;
        const totalDen = d * d;
        const gcd = (function g(a,b){return b?g(b,a%b):a;})(total2pq, totalDen);
        const numS = total2pq / gcd;
        const denS = totalDen / gcd;

        const answer = parseFloat((2 * p * q).toFixed(4));
        const answerTex = denS === 1 ? String(numS) : `\\frac{${numS}}{${denS}}`;

        return {
            type: 'free',
            rule: 'Or Rule (Mut. Exclusive)',
            difficulty: 'medium',
            text: `A biased coin has \\(P(\\text{H}) = ${PROB_TREES.frac(n,d)}\\). The coin is flipped twice. Find \\(P(\\text{exactly one Head})\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Exactly one H: either HT or TH (mutually exclusive paths)}`,
                `P(\\text{HT}) + P(\\text{TH}) = \\frac{${n}}{${d}} \\cdot \\frac{${qN}}{${d}} + \\frac{${qN}}{${d}} \\cdot \\frac{${n}}{${d}} = 2 \\times \\frac{${numHT}}{${denHT}}`
            ],
            explain: `<strong>Step 1:</strong> List the mutually exclusive ways to get exactly one Head: HT or TH.<br><br>` +
                     `<strong>Step 2:</strong> \\(P(\\text{HT}) = \\frac{${n}}{${d}} \\times \\frac{${qN}}{${d}} = \\frac{${numHT}}{${denHT}}\\).<br><br>` +
                     `<strong>Step 3:</strong> By symmetry \\(P(\\text{TH}) = \\frac{${numHT}}{${denHT}}\\).<br><br>` +
                     `<strong>Step 4:</strong> Add the branches: \\(\\frac{${numHT}}{${denHT}} + \\frac{${numHT}}{${denHT}} = \\frac{${total2pq}}{${totalDen}} = \\frac{${numS}}{${denS}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 4. qConditionalFromTree - Hard (Free)
     * Bayes' theorem from tree: P(A|B) = P(A)P(B|A) / [P(A)P(B|A) + P(A')P(B|A')]
     */
    qConditionalFromTree() {
        // Use clean fractions
        const niceFracs = [
            [1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6],[3,10],[7,10]
        ];

        let pA_n, pA_d, pBA_n, pBA_d, pBAc_n, pBAc_d;

        // Retry until we get a non-degenerate situation
        let attempts = 0;
        do {
            [pA_n, pA_d] = MathUtils.pick(niceFracs);
            [pBA_n, pBA_d] = MathUtils.pick(niceFracs);
            [pBAc_n, pBAc_d] = MathUtils.pick(niceFracs);
            attempts++;
        } while (
            (pBA_n / pBA_d === pBAc_n / pBAc_d) && attempts < 30
        );

        const pA = pA_n / pA_d;
        const pAc = 1 - pA;            // P(A')
        const pBA = pBA_n / pBA_d;     // P(B|A)
        const pBAc = pBAc_n / pBAc_d;  // P(B|A')

        const pAcN = pA_d - pA_n;     // numerator of P(A')

        // Numerator: P(A) * P(B|A)
        const numNum = pA_n * pBA_n;
        const numDen = pA_d * pBA_d;

        // Denominator term 1: same as numerator
        // Denominator term 2: P(A') * P(B|A') = (pAcN/pA_d) * (pBAc_n/pBAc_d)
        const den2Num = pAcN * pBAc_n;
        const den2Den = pA_d * pBAc_d;

        // Total P(B) as decimal for answer computation
        const pBTotal = pA * pBA + pAc * pBAc;
        const answer = pBTotal === 0 ? 0 : parseFloat((pA * pBA / pBTotal).toFixed(4));

        const contexts = [
            { disease: 'a disease', test: 'positive', prior: 'has the disease' },
            { disease: 'a defect', test: 'flagged', prior: 'is defective' },
            { disease: 'the condition', test: 'detected', prior: 'has the condition' }
        ];
        const ctx = MathUtils.pick(contexts);

        return {
            type: 'free',
            rule: 'Conditional (Bayes)',
            difficulty: 'hard',
            text: `From a probability tree: \\(P(A) = ${PROB_TREES.frac(pA_n,pA_d)}\\), ` +
                  `\\(P(B \\mid A) = ${PROB_TREES.frac(pBA_n,pBA_d)}\\), ` +
                  `\\(P(B \\mid A') = ${PROB_TREES.frac(pBAc_n,pBAc_d)}\\). ` +
                  `Find \\(P(A \\mid B)\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: `${answer.toFixed(4)}`,
            options: [],
            hintTex: [
                `P(A \\mid B) = \\frac{P(A) \\cdot P(B \\mid A)}{P(B)}`,
                `P(B) = P(A)\\cdot P(B|A) + P(A')\\cdot P(B|A') = \\frac{${numNum}}{${numDen}} + \\frac{${den2Num}}{${den2Den}}`
            ],
            explain: `<strong>Step 1:</strong> Apply Bayes' theorem: \\(P(A \\mid B) = \\dfrac{P(A) \\cdot P(B \\mid A)}{P(A) \\cdot P(B \\mid A) + P(A') \\cdot P(B \\mid A')}\\).<br><br>` +
                     `<strong>Step 2:</strong> Numerator: \\(\\frac{${pA_n}}{${pA_d}} \\times \\frac{${pBA_n}}{${pBA_d}} = \\frac{${numNum}}{${numDen}} \\approx ${(pA * pBA).toFixed(4)}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(A') = 1 - \\frac{${pA_n}}{${pA_d}} = \\frac{${pAcN}}{${pA_d}}\\). ` +
                     `Denominator term 2: \\(\\frac{${pAcN}}{${pA_d}} \\times \\frac{${pBAc_n}}{${pBAc_d}} = \\frac{${den2Num}}{${den2Den}} \\approx ${(pAc * pBAc).toFixed(4)}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(P(B) \\approx ${(pA * pBA).toFixed(4)} + ${(pAc * pBAc).toFixed(4)} = ${pBTotal.toFixed(4)}\\).<br><br>` +
                     `<strong>Step 5:</strong> \\(P(A \\mid B) \\approx \\dfrac{${(pA * pBA).toFixed(4)}}{${pBTotal.toFixed(4)}} = ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 5. qAtLeastOne - Medium (Free)
     * P(at least one success in 2 trials) = 1 - (1-p)²
     */
    qAtLeastOne() {
        const fracs = [
            [1,4],[1,3],[2,5],[1,2]
        ];
        const [n, d] = MathUtils.pick(fracs);
        const p = n / d;
        const qN = d - n;   // 1-p numerator
        // (1-p)² = (qN)² / d²
        const failNum = qN * qN;
        const failDen = d * d;
        const gcd = (function g(a,b){return b?g(b,a%b):a;})(failNum, failDen);
        const failNumS = failNum / gcd;
        const failDenS = failDen / gcd;
        // answer = 1 - (qN/d)²
        const answer = parseFloat((1 - (qN / d) ** 2).toFixed(4));
        const ansNum = failDenS - failNumS;
        const ansTex = `\\frac{${ansNum}}{${failDenS}}`;

        return {
            type: 'free',
            rule: 'At Least One',
            difficulty: 'medium',
            text: `In two independent trials, \\(P(\\text{success}) = ${PROB_TREES.frac(n,d)}\\) each time. Find \\(P(\\text{at least one success})\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: ansTex,
            options: [],
            hintTex: [
                `P(\\text{at least one}) = 1 - P(\\text{none})`,
                `P(\\text{no successes}) = \\left(1 - \\frac{${n}}{${d}}\\right)^2 = \\left(\\frac{${qN}}{${d}}\\right)^2 = \\frac{${failNum}}{${failDen}}`
            ],
            explain: `<strong>Step 1:</strong> Use the complement: \\(P(\\text{at least one}) = 1 - P(\\text{no successes})\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(P(\\text{no successes}) = P(\\text{fail}) \\times P(\\text{fail}) = \\frac{${qN}}{${d}} \\times \\frac{${qN}}{${d}} = \\frac{${failNum}}{${failDen}} = \\frac{${failNumS}}{${failDenS}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(\\text{at least one}) = 1 - \\frac{${failNumS}}{${failDenS}} = \\frac{${ansNum}}{${failDenS}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 6. qIndependentEvents - Easy (Free)
     * P(A∩B) = P(A)×P(B) for independent events.
     */
    qIndependentEvents() {
        const fracs = [
            [1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[1,6],[5,6]
        ];
        const [nA, dA] = MathUtils.pick(fracs);
        let nB, dB;
        do { [nB, dB] = MathUtils.pick(fracs); } while (nA === nB && dA === dB);

        const pA = nA / dA;
        const pB = nB / dB;

        const numRaw = nA * nB;
        const denRaw = dA * dB;
        const gcd = (function g(a,b){return b?g(b,a%b):a;})(numRaw, denRaw);
        const numS = numRaw / gcd;
        const denS = denRaw / gcd;

        const answer = parseFloat((pA * pB).toFixed(4));
        const answerTex = denS === 1 ? String(numS) : `\\frac{${numS}}{${denS}}`;

        return {
            type: 'free',
            rule: 'Independent Events',
            difficulty: 'easy',
            text: `Events \\(A\\) and \\(B\\) are independent. \\(P(A) = ${PROB_TREES.frac(nA,dA)}\\) and \\(P(B) = ${PROB_TREES.frac(nB,dB)}\\). Find \\(P(A \\cap B)\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{For independent events: } P(A \\cap B) = P(A) \\times P(B)`,
                `= \\frac{${nA}}{${dA}} \\times \\frac{${nB}}{${dB}} = \\frac{${numRaw}}{${denRaw}} = \\frac{${numS}}{${denS}}`
            ],
            explain: `<strong>Step 1:</strong> For independent events, \\(P(A \\cap B) = P(A) \\times P(B)\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\frac{${nA}}{${dA}} \\times \\frac{${nB}}{${dB}} = \\frac{${numRaw}}{${denRaw}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(= \\frac{${numS}}{${denS}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 7. qExactlyOne - Medium (Free)
     * P(exactly one of A, B) = P(A)×P(B') + P(A')×P(B)
     * Uses independent events with simple p values.
     */
    qExactlyOne() {
        const fracs = [
            [1,3],[2,3],[1,4],[3,4],[2,5],[3,5],[1,6],[5,6]
        ];
        const [nA, dA] = MathUtils.pick(fracs);
        let nB, dB;
        do { [nB, dB] = MathUtils.pick(fracs); } while (nA === nB && dA === dB);

        const pA = nA / dA;
        const pAc = 1 - pA;
        const pAcN = dA - nA;

        const pB = nB / dB;
        const pBc = 1 - pB;
        const pBcN = dB - nB;

        // P(exactly one) = P(A)P(B') + P(A')P(B)
        // = (nA/dA)(pBcN/dB) + (pAcN/dA)(nB/dB)
        const term1Num = nA * pBcN;
        const term1Den = dA * dB;
        const term2Num = pAcN * nB;
        const term2Den = dA * dB;  // same denominator
        const totalNum = term1Num + term2Num;
        const totalDen = dA * dB;
        const gcd = (function g(a,b){return b?g(b,a%b):a;})(totalNum, totalDen);
        const numS = totalNum / gcd;
        const denS = totalDen / gcd;

        const answer = parseFloat((pA * pBc + pAc * pB).toFixed(4));
        const answerTex = denS === 1 ? String(numS) : `\\frac{${numS}}{${denS}}`;

        return {
            type: 'free',
            rule: 'Exactly One Event',
            difficulty: 'medium',
            text: `Events \\(A\\) and \\(B\\) are independent. \\(P(A) = ${PROB_TREES.frac(nA,dA)}\\), \\(P(B) = ${PROB_TREES.frac(nB,dB)}\\). Find \\(P(\\text{exactly one of } A, B\\text{ occurs})\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `P(\\text{exactly one}) = P(A)P(B') + P(A')P(B)`,
                `= \\frac{${nA}}{${dA}} \\cdot \\frac{${pBcN}}{${dB}} + \\frac{${pAcN}}{${dA}} \\cdot \\frac{${nB}}{${dB}} = \\frac{${term1Num}}{${totalDen}} + \\frac{${term2Num}}{${totalDen}}`
            ],
            explain: `<strong>Step 1:</strong> "Exactly one" means A occurs and B doesn't, or B occurs and A doesn't.<br><br>` +
                     `<strong>Step 2:</strong> \\(P(A') = \\frac{${pAcN}}{${dA}}\\), \\(P(B') = \\frac{${pBcN}}{${dB}}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P(A \\cap B') = \\frac{${nA}}{${dA}} \\times \\frac{${pBcN}}{${dB}} = \\frac{${term1Num}}{${totalDen}}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(P(A' \\cap B) = \\frac{${pAcN}}{${dA}} \\times \\frac{${nB}}{${dB}} = \\frac{${term2Num}}{${totalDen}}\\).<br><br>` +
                     `<strong>Step 5:</strong> Add: \\(\\frac{${totalNum}}{${totalDen}} = \\frac{${numS}}{${denS}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 8. qThreeStageTree - Hard (Free)
     * Three independent trials. Find P(specific sequence SSF).
     * P = p × p × (1-p)
     */
    qThreeStageTree() {
        const fracs = [
            [1,3],[1,4],[2,5]
        ];
        const [n, d] = MathUtils.pick(fracs);
        const p = n / d;
        const qN = d - n;

        // Random sequence type: SSF, SFS, or FSS (all have same probability p²(1-p))
        const sequences = ['SSF', 'SFS', 'FSS'];
        const seq = MathUtils.pick(sequences);

        // Compute branch product
        // SSF: p*p*(1-p), SFS: p*(1-p)*p, FSS: (1-p)*p*p → all = p²(1-p)
        const numRaw = n * n * qN;
        const denRaw = d * d * d;
        const gcd = (function g(a,b){return b?g(b,a%b):a;})(numRaw, denRaw);
        const numS = numRaw / gcd;
        const denS = denRaw / gcd;

        const answer = parseFloat((p * p * (1 - p)).toFixed(4));
        const answerTex = denS === 1 ? String(numS) : `\\frac{${numS}}{${denS}}`;

        // Format sequence as fractions along the branch
        const branchTerms = seq.split('').map(c => {
            if (c === 'S') return `\\frac{${n}}{${d}}`;
            return `\\frac{${qN}}{${d}}`;
        });

        return {
            type: 'free',
            rule: 'Three-Stage Tree',
            difficulty: 'hard',
            text: `Three independent trials each have \\(P(\\text{S}) = ${PROB_TREES.frac(n,d)}\\) and \\(P(\\text{F}) = ${PROB_TREES.frac(qN,d)}\\). Find the probability of the sequence \\(\\text{${seq}}\\).`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Multiply probabilities along the branch for the sequence ${seq}}`,
                `= ${branchTerms.join(' \\times ')} = \\frac{${numRaw}}{${denRaw}}`
            ],
            explain: `<strong>Step 1:</strong> In a three-stage tree, the probability of a specific sequence is the product of probabilities along that branch.<br><br>` +
                     `<strong>Step 2:</strong> For sequence \\(\\text{${seq}}\\): \\(${branchTerms.join(' \\times ')}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(= \\frac{${numRaw}}{${denRaw}} = \\frac{${numS}}{${denS}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 9. qExpectedValue - Hard (Free)
     * E(X) = Σ x·P(X=x). Win $W with prob p, win $0 otherwise. E(X) = W×p.
     */
    qExpectedValue() {
        const fracs = [
            [1,4],[1,3],[2,5],[3,10],[1,5]
        ];
        const [n, d] = MathUtils.pick(fracs);
        const p = n / d;

        // Win amount W: multiple of d for cleaner answer, or just a nice number
        const wins = [4, 5, 6, 8, 10, 12, 15, 20];
        const W = MathUtils.pick(wins);

        // E(X) = W * p = W * n/d
        const evNum = W * n;
        const evDen = d;
        const gcd = (function g(a,b){return b?g(b,a%b):a;})(evNum, evDen);
        const evNumS = evNum / gcd;
        const evDenS = evDen / gcd;

        const answer = parseFloat((W * p).toFixed(2));
        const answerTex = evDenS === 1 ? String(evNumS) : `\\frac{${evNumS}}{${evDenS}}`;

        return {
            type: 'free',
            rule: 'Expected Value',
            difficulty: 'hard',
            text: `A game pays $${W} with probability ${PROB_TREES.frac(n,d)}, and $0 otherwise. Find the expected value \\(E(X)\\) of the winnings.`,
            latex: `\\text{Give your answer to 2 decimal places (in dollars).}`,
            answer: answer,
            answerTex: `\\$${answerTex}`,
            options: [],
            hintTex: [
                `E(X) = \\sum x \\cdot P(X = x)`,
                `= ${W} \\times \\frac{${n}}{${d}} + 0 \\times \\frac{${d-n}}{${d}} = \\frac{${evNum}}{${d}}`
            ],
            explain: `<strong>Step 1:</strong> List outcomes: win $${W} with probability \\(\\frac{${n}}{${d}}\\), win $0 with probability \\(\\frac{${d-n}}{${d}}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply formula \\(E(X) = \\sum x \\cdot P(X=x)\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(E(X) = ${W} \\times \\frac{${n}}{${d}} + 0 \\times \\frac{${d - n}}{${d}} = \\frac{${evNum}}{${d}} = \\frac{${evNumS}}{${evDenS}} \\approx \\$${answer.toFixed(2)}\\).`
        };
    },

    /**
     * 10. qRealWorldTree - Medium (MC)
     * Bag with r red and b blue balls, drawn with replacement.
     * P(same colour both draws) = P(RR) + P(BB) = (r/n)² + (b/n)²
     */
    qRealWorldTree() {
        // Small integer ball counts, total n = r + b ≤ 10
        const combos = [
            [2,3],[3,2],[2,4],[4,2],[3,4],[4,3],[2,5],[5,2],[3,5],[5,3],[1,4],[4,1],[2,6],[6,2]
        ];
        const [r, b] = MathUtils.pick(combos);
        const n = r + b;

        const pRR = (r / n) ** 2;
        const pBB = (b / n) ** 2;
        const pSame = pRR + pBB;

        // Exact fraction: (r²+b²)/n²
        const numRaw = r * r + b * b;
        const denRaw = n * n;
        const gcd = (function g(a,b){return b?g(b,a%b):a;})(numRaw, denRaw);
        const numS = numRaw / gcd;
        const denS = denRaw / gcd;

        const correctVal = parseFloat(pSame.toFixed(4));
        const correctTex = denS === 1 ? String(numS) : `\\frac{${numS}}{${denS}}`;

        // Generate 3 distractors
        // Dist 1: P(different) = 1 - P(same)
        const d1Num = denS - numS;
        const d1Tex = `\\frac{${d1Num}}{${denS}}`;

        // Dist 2: Only P(RR) — forgot to add P(BB)
        const rr = r * r;
        const rrGcd = (function g(a,b){return b?g(b,a%b):a;})(rr, denRaw);
        const d2Tex = `\\frac{${rr/rrGcd}}{${denRaw/rrGcd}}`;

        // Dist 3: Add without squaring: (r+b)/n = 1 — avoid this, use (2rb)/n²
        const d3Num = 2 * r * b;
        const d3Gcd = (function g(a,b){return b?g(b,a%b):a;})(d3Num, denRaw);
        const d3Tex = `\\frac{${d3Num/d3Gcd}}{${denRaw/d3Gcd}}`;

        const allOptions = [
            { value: 1, tex: correctTex },
            { value: 0, tex: d1Tex },
            { value: 0, tex: d2Tex },
            { value: 0, tex: d3Tex }
        ];

        // Deduplicate options
        const seen = new Set();
        const uniqueOptions = [];
        for (const opt of allOptions) {
            if (!seen.has(opt.tex)) {
                seen.add(opt.tex);
                uniqueOptions.push(opt);
            }
        }
        // Pad if needed
        let pad = 1;
        while (uniqueOptions.length < 4) {
            const padNum = numS + pad;
            const padTex = `\\frac{${padNum}}{${denS}}`;
            if (!seen.has(padTex)) {
                seen.add(padTex);
                uniqueOptions.push({ value: 0, tex: padTex });
            }
            pad++;
        }

        const shuffled = MathUtils.shuffle(uniqueOptions);

        return {
            type: 'mc',
            rule: 'Real-World Tree',
            difficulty: 'medium',
            text: `A bag contains ${r} red and ${b} blue balls. A ball is drawn, its colour recorded, then replaced. A second ball is drawn. Find \\(P(\\text{both balls the same colour})\\).`,
            latex: `\\text{Choose the correct probability.}`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `P(\\text{same}) = P(\\text{RR}) + P(\\text{BB})`,
                `= \\left(\\frac{${r}}{${n}}\\right)^2 + \\left(\\frac{${b}}{${n}}\\right)^2 = \\frac{${r*r}}{${n*n}} + \\frac{${b*b}}{${n*n}} = \\frac{${numRaw}}{${denRaw}}`
            ],
            explain: `<strong>Step 1:</strong> The two mutually exclusive paths giving the same colour are RR and BB.<br><br>` +
                     `<strong>Step 2:</strong> Since the ball is replaced, draws are independent.<br><br>` +
                     `<strong>Step 3:</strong> \\(P(\\text{RR}) = \\frac{${r}}{${n}} \\times \\frac{${r}}{${n}} = \\frac{${r*r}}{${n*n}}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(P(\\text{BB}) = \\frac{${b}}{${n}} \\times \\frac{${b}}{${n}} = \\frac{${b*b}}{${n*n}}\\).<br><br>` +
                     `<strong>Step 5:</strong> \\(P(\\text{same}) = \\frac{${r*r} + ${b*b}}{${n*n}} = \\frac{${numRaw}}{${denRaw}} = \\frac{${numS}}{${denS}} \\approx ${correctVal.toFixed(4)}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => PROB_TREES.qPathProbability(),    weight: 3, diff: 'easy'   },
            { fn: () => PROB_TREES.qComplementBranch(),   weight: 3, diff: 'easy'   },
            { fn: () => PROB_TREES.qOrRule(),             weight: 2, diff: 'medium' },
            { fn: () => PROB_TREES.qConditionalFromTree(),weight: 1, diff: 'hard'   },
            { fn: () => PROB_TREES.qAtLeastOne(),         weight: 2, diff: 'medium' },
            { fn: () => PROB_TREES.qIndependentEvents(),  weight: 3, diff: 'easy'   },
            { fn: () => PROB_TREES.qExactlyOne(),         weight: 2, diff: 'medium' },
            { fn: () => PROB_TREES.qThreeStageTree(),     weight: 1, diff: 'hard'   },
            { fn: () => PROB_TREES.qExpectedValue(),      weight: 1, diff: 'hard'   },
            { fn: () => PROB_TREES.qRealWorldTree(),      weight: 2, diff: 'medium' }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (PROB_TREES.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (PROB_TREES.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (PROB_TREES.level === 'hard') {
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
        PROB_TREES.score = 0;
        PROB_TREES.total = 0;
        PROB_TREES.streak = 0;
        PROB_TREES.answered = false;
        PROB_TREES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="PROB_TREES.unload()">Probability Trees (4.8)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Probability Trees</h1>
                <p>IB Math AA 4.8 – Tree diagrams and combined events</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="PROB_TREES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="PROB_TREES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="PROB_TREES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="PROB_TREES.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="ptree-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="ptree-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="ptree-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="ptree-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="ptree-question-card">
                <span class="rule-tag" id="ptree-rule"></span>
                <span class="difficulty-tag" id="ptree-difficulty"></span>
                <div class="question-text" id="ptree-text"></div>
                <div class="question-prompt" id="ptree-latex"></div>
                <div id="ptree-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="ptree-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="ptree-feedback">
                <div class="feedback-title" id="ptree-feedback-title"></div>
                <div class="feedback-explanation" id="ptree-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="ptree-hint-btn" onclick="PROB_TREES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="ptree-next-btn" onclick="PROB_TREES.next()" style="display:none;">Next Question</button>
            </div>
        `;

        PROB_TREES.next();
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
        PROB_TREES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        PROB_TREES.score = 0;
        PROB_TREES.total = 0;
        PROB_TREES.streak = 0;
        PROB_TREES.updateStats();
        PROB_TREES.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        PROB_TREES.answered = false;
        PROB_TREES.hintIndex = 0;
        PROB_TREES.currentQ = PROB_TREES.pickQuestion();
        const q = PROB_TREES.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('ptree-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('ptree-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('ptree-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('ptree-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('ptree-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="PROB_TREES.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="ptree-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')PROB_TREES.checkFree()">
                    <button class="btn btn-primary" onclick="PROB_TREES.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('ptree-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('ptree-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('ptree-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('ptree-next-btn').style.display = 'none';
        document.getElementById('ptree-hint-btn').style.display = '';
        document.getElementById('ptree-hint-btn').disabled = false;

        // Render KaTeX
        PROB_TREES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = PROB_TREES.currentQ;
        if (!q || !q.hintTex || PROB_TREES.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('ptree-hint-box');
        const hintContent = PROB_TREES.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[PROB_TREES.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        PROB_TREES.hintIndex++;

        if (PROB_TREES.hintIndex >= q.hintTex.length) {
            document.getElementById('ptree-hint-btn').disabled = true;
        }

        PROB_TREES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (PROB_TREES.answered) return;
        PROB_TREES.answered = true;
        PROB_TREES.total++;

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
            PROB_TREES.score++;
            PROB_TREES.streak++;
        } else {
            btn.classList.add('incorrect');
            PROB_TREES.streak = 0;
        }

        PROB_TREES.showFeedback(isCorrect);
        PROB_TREES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (PROB_TREES.answered) return;

        const inp = document.getElementById('ptree-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        PROB_TREES.answered = true;
        PROB_TREES.total++;
        inp.disabled = true;

        const q = PROB_TREES.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            PROB_TREES.score++;
            PROB_TREES.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            PROB_TREES.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        PROB_TREES.showFeedback(isCorrect);
        PROB_TREES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = PROB_TREES.currentQ;
        const fb = document.getElementById('ptree-feedback');
        const title = document.getElementById('ptree-feedback-title');
        const explanation = document.getElementById('ptree-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (PROB_TREES.streak > 1) {
                title.textContent = `Correct! (${PROB_TREES.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('ptree-next-btn').style.display = '';
        document.getElementById('ptree-hint-btn').style.display = 'none';

        PROB_TREES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('ptree-score');
        const totalEl = document.getElementById('ptree-total');
        const streakEl = document.getElementById('ptree-streak');
        const accEl = document.getElementById('ptree-accuracy');

        if (scoreEl) scoreEl.textContent = PROB_TREES.score;
        if (totalEl) totalEl.textContent = PROB_TREES.total;
        if (streakEl) streakEl.textContent = PROB_TREES.streak;
        if (accEl) {
            accEl.textContent = PROB_TREES.total > 0
                ? Math.round((PROB_TREES.score / PROB_TREES.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['probability-trees'] = () => PROB_TREES.load();
