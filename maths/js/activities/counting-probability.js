/*
 * counting-probability.js - IB Math AA 4.13: Counting & Probability
 * Permutations, combinations, and probability
 */

const COUNTING = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       COMBINATORICS HELPERS
       ──────────────────────────────────────────── */

    factorial(n) { if (n <= 1) return 1; let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; },
    perm(n, r) { return this.factorial(n) / this.factorial(n - r); },
    comb(n, r) { return this.factorial(n) / (this.factorial(r) * this.factorial(n - r)); },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qPermutation - Easy (Free)
     * How many ways to arrange r items from n? nPr = n!/(n-r)!
     */
    qPermutation() {
        const nVals = [4, 5, 6, 7, 8];
        const n = MathUtils.pick(nVals);
        const r = MathUtils.pick([2, 3]);
        const answer = COUNTING.perm(n, r);

        return {
            type: 'free',
            rule: 'Permutation',
            difficulty: 'easy',
            text: `How many ways can \\(${r}\\) people be selected and arranged in order from a group of \\(${n}\\) people?`,
            latex: `\\text{Find } {}_{${n}}P_{${r}}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `{}_{n}P_{r} = \\frac{n!}{(n-r)!}`,
                `{}_{${n}}P_{${r}} = \\frac{${n}!}{(${n}-${r})!} = \\frac{${n}!}{${n - r}!} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Use the permutation formula \\({}_{n}P_{r} = \\frac{n!}{(n-r)!}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\({}_{${n}}P_{${r}} = \\frac{${n}!}{(${n}-${r})!} = \\frac{${n}!}{${n - r}!}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(= ${answer}\\).`
        };
    },

    /**
     * 2. qCombination - Easy (Free)
     * How many ways to choose r items from n? nCr = n!/(r!(n-r)!)
     */
    qCombination() {
        const nVals = [4, 5, 6, 7, 8];
        const n = MathUtils.pick(nVals);
        const r = MathUtils.pick([2, 3]);
        const answer = COUNTING.comb(n, r);

        return {
            type: 'free',
            rule: 'Combination',
            difficulty: 'easy',
            text: `How many ways can \\(${r}\\) people be chosen from a group of \\(${n}\\) people (order does not matter)?`,
            latex: `\\text{Find } \\binom{${n}}{${r}}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}`,
                `\\binom{${n}}{${r}} = \\frac{${n}!}{${r}!\\cdot ${n - r}!} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Use the combination formula \\(\\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(\\binom{${n}}{${r}} = \\frac{${n}!}{${r}!\\cdot ${n - r}!}\\).<br><br>` +
                     `<strong>Step 3:</strong> Calculate: \\(= ${answer}\\).`
        };
    },

    /**
     * 3. qDistinguishPC - Easy (MC)
     * Context question — does order matter? Combination vs permutation.
     */
    qDistinguishPC() {
        const usePermutation = MathUtils.randInt(0, 1) === 1;

        const permAnswer = COUNTING.perm(8, 3);   // 8P3 = 336
        const combAnswer = COUNTING.comb(8, 3);   // 8C3 = 56

        let questionText, correctTex, correctValue;

        if (usePermutation) {
            questionText = `In how many ways can 3 different prizes (1st, 2nd, 3rd) be awarded to 3 people chosen from 8 people? (Order matters.)`;
            correctTex = `{}_{8}P_{3} = 336`;
            correctValue = 'perm';
        } else {
            questionText = `In how many ways can a committee of 3 people be chosen from 8 people? (Order does not matter.)`;
            correctTex = `\\binom{8}{3} = 56`;
            correctValue = 'comb';
        }

        const allOptions = [
            { key: 'perm', tex: `{}_{8}P_{3} = 336` },
            { key: 'comb', tex: `\\binom{8}{3} = 56` },
            { key: 'exp',  tex: `8^{3} = 512` },
            { key: 'fact', tex: `3! = 6` }
        ];

        const options = allOptions.map(opt => ({
            value: opt.key === correctValue ? 1 : 0,
            tex: opt.tex
        }));

        const shuffled = MathUtils.shuffle(options);

        const explainWhy = usePermutation
            ? `Because the prizes are distinct (1st, 2nd, 3rd), <strong>order matters</strong>, so we use a <strong>permutation</strong>.`
            : `Because the committee has no ranked positions, <strong>order does not matter</strong>, so we use a <strong>combination</strong>.`;

        return {
            type: 'mc',
            rule: 'Permutation vs Combination',
            difficulty: 'easy',
            text: questionText,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Ask: does the order of selection matter?}`,
                usePermutation
                    ? `\\text{Yes — use } {}_{n}P_{r} = \\frac{n!}{(n-r)!}`
                    : `\\text{No — use } \\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}`
            ],
            explain: `<strong>Key Question:</strong> Does order matter?<br><br>` +
                     `${explainWhy}<br><br>` +
                     `<strong>Calculation:</strong> \\(${correctTex}\\).`
        };
    },

    /**
     * 4. qProbCounting - Medium (Free)
     * P(event) = favourable/total using combinations.
     * P(choosing 2 reds from bag of R reds and B blues)
     */
    qProbCounting() {
        const scenarios = [
            { r: 3, b: 5, k: 2 },
            { r: 4, b: 4, k: 2 },
            { r: 2, b: 6, k: 2 },
            { r: 3, b: 4, k: 2 },
            { r: 4, b: 5, k: 2 }
        ];
        const { r, b, k } = MathUtils.pick(scenarios);
        const total = r + b;

        const favourable = COUNTING.comb(r, k);
        const totalWays = COUNTING.comb(total, k);
        const prob = favourable / totalWays;
        const answer = Math.round(prob * 10000) / 10000;

        return {
            type: 'free',
            rule: 'Probability via Counting',
            difficulty: 'medium',
            text: `A bag contains \\(${r}\\) red balls and \\(${b}\\) blue balls. Two balls are selected at random without replacement. Find the probability that both balls are red.`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answer.toFixed(4),
            options: [],
            hintTex: [
                `P(\\text{both red}) = \\frac{\\binom{${r}}{2}}{\\binom{${total}}{2}}`,
                `= \\frac{${favourable}}{${totalWays}} = ${answer.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Count favourable outcomes — ways to choose 2 reds from ${r}:<br>` +
                     `\\(\\binom{${r}}{2} = ${favourable}\\).<br><br>` +
                     `<strong>Step 2:</strong> Count total outcomes — ways to choose 2 from ${total}:<br>` +
                     `\\(\\binom{${total}}{2} = ${totalWays}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(P = \\dfrac{${favourable}}{${totalWays}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 5. qArrangementsAll - Easy (Free)
     * How many ways to arrange n distinct items? n!
     */
    qArrangementsAll() {
        const n = MathUtils.pick([3, 4, 5, 6]);
        const answer = COUNTING.factorial(n);

        return {
            type: 'free',
            rule: 'All Arrangements',
            difficulty: 'easy',
            text: `How many different ways can \\(${n}\\) distinct books be arranged on a shelf?`,
            latex: `\\text{Find } ${n}!`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Arrangements of } n \\text{ distinct items} = n!`,
                `${n}! = ${Array.from({length: n}, (_, i) => n - i).join(' \\times ')} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> The number of ways to arrange \\(${n}\\) distinct items is \\(${n}!\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(${n}! = ${Array.from({length: n}, (_, i) => n - i).join(' \\times ')} = ${answer}\\).`
        };
    },

    /**
     * 6. qArrangementsRestrict - Medium (Free)
     * Arrangements of n items where 2 specific must be adjacent: (n-1)! × 2
     */
    qArrangementsRestrict() {
        const n = MathUtils.pick([4, 5, 6]);
        const answer = COUNTING.factorial(n - 1) * 2;

        return {
            type: 'free',
            rule: 'Restricted Arrangements',
            difficulty: 'medium',
            text: `In how many ways can \\(${n}\\) people be arranged in a row if two specific people (Alice and Bob) must stand next to each other?`,
            latex: `\\text{Treat the pair as a single unit.}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Glue the pair together: now } ${n - 1} \\text{ units to arrange}`,
                `(${n}-1)! \\times 2 = ${n - 1}! \\times 2 = ${COUNTING.factorial(n - 1)} \\times 2 = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Treat Alice and Bob as a single unit — this gives \\(${n - 1}\\) units to arrange.<br><br>` +
                     `<strong>Step 2:</strong> Arrange \\(${n - 1}\\) units: \\((${n}-1)! = ${COUNTING.factorial(n - 1)}\\) ways.<br><br>` +
                     `<strong>Step 3:</strong> Alice and Bob can swap within their unit: \\(\\times\\, 2\\).<br><br>` +
                     `<strong>Answer:</strong> \\(${COUNTING.factorial(n - 1)} \\times 2 = ${answer}\\).`
        };
    },

    /**
     * 7. qCircularArrangements - Medium (Free)
     * Circular arrangements of n distinct items = (n-1)!
     */
    qCircularArrangements() {
        const n = MathUtils.pick([3, 4, 5, 6]);
        const answer = COUNTING.factorial(n - 1);

        return {
            type: 'free',
            rule: 'Circular Arrangements',
            difficulty: 'medium',
            text: `In how many ways can \\(${n}\\) distinct people be seated around a circular table?`,
            latex: `\\text{Fix one person's position; arrange the rest.}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Circular arrangements of } n \\text{ distinct items} = (n-1)!`,
                `(${n}-1)! = ${n - 1}! = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> In circular arrangements, one person's position is fixed to eliminate rotational duplicates.<br><br>` +
                     `<strong>Step 2:</strong> The remaining \\(${n - 1}\\) people can be arranged in \\((${n}-1)!\\) ways.<br><br>` +
                     `<strong>Answer:</strong> \\((${n}-1)! = ${answer}\\).`
        };
    },

    /**
     * 8. qBinomialCoeff - Easy (Free)
     * C(n,r) using specific known values.
     */
    qBinomialCoeff() {
        const cases = [
            { n: 10, r: 3, ans: 120 },
            { n: 8,  r: 5, ans: 56  },
            { n: 7,  r: 2, ans: 21  },
            { n: 9,  r: 4, ans: 126 },
            { n: 6,  r: 2, ans: 15  }
        ];
        const { n, r, ans } = MathUtils.pick(cases);

        return {
            type: 'free',
            rule: 'Binomial Coefficient',
            difficulty: 'easy',
            text: `Evaluate the binomial coefficient below.`,
            latex: `\\(\\binom{${n}}{${r}}\\)`,
            answer: ans,
            answerTex: String(ans),
            options: [],
            hintTex: [
                `\\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}`,
                `\\binom{${n}}{${r}} = \\frac{${n}!}{${r}!\\cdot${n - r}!} = ${ans}`
            ],
            explain: `<strong>Step 1:</strong> Apply the formula \\(\\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(\\binom{${n}}{${r}} = \\frac{${n}!}{${r}!\\cdot${n - r}!} = ${ans}\\).<br><br>` +
                     `<strong>Note:</strong> \\(\\binom{${n}}{${r}} = \\binom{${n}}{${n - r}}\\) by symmetry.`
        };
    },

    /**
     * 9. qIdenticalItems - Hard (Free)
     * Arrangements of n items with one pair identical: n!/2!
     */
    qIdenticalItems() {
        const n = MathUtils.pick([4, 5, 6]);
        const answer = COUNTING.factorial(n) / 2;

        return {
            type: 'free',
            rule: 'Arrangements with Identical Items',
            difficulty: 'hard',
            text: `How many distinct arrangements are there of \\(${n}\\) objects, where exactly 2 of them are identical?`,
            latex: `\\text{Divide by } 2! \\text{ to account for the identical pair.}`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Arrangements with one repeated pair} = \\frac{n!}{2!}`,
                `\\frac{${n}!}{2!} = \\frac{${COUNTING.factorial(n)}}{2} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> If all \\(${n}\\) items were distinct, there would be \\(${n}! = ${COUNTING.factorial(n)}\\) arrangements.<br><br>` +
                     `<strong>Step 2:</strong> Since 2 items are identical, divide by \\(2!\\) to remove duplicate arrangements.<br><br>` +
                     `<strong>Answer:</strong> \\(\\dfrac{${n}!}{2!} = \\dfrac{${COUNTING.factorial(n)}}{2} = ${answer}\\).`
        };
    },

    /**
     * 10. qProbFromCounting - Hard (Free)
     * From a mixed group, choose r people. P(all same gender).
     * P = [C(a,r) + C(b,r)] / C(a+b,r)
     */
    qProbFromCounting() {
        const scenarios = [
            {
                a: 3, b: 3, r: 2,
                label: '3 boys and 3 girls',
                prob: (3 + 3) / 15   // [C(3,2)+C(3,2)]/C(6,2) = 6/15
            },
            {
                a: 4, b: 3, r: 2,
                label: '4 boys and 3 girls',
                prob: (6 + 3) / 21   // [C(4,2)+C(3,2)]/C(7,2) = 9/21
            }
        ];
        const sc = MathUtils.pick(scenarios);
        const { a, b, r, label } = sc;

        const favA = COUNTING.comb(a, r);
        const favB = COUNTING.comb(b, r);
        const totalWays = COUNTING.comb(a + b, r);
        const prob = (favA + favB) / totalWays;
        const answer = Math.round(prob * 10000) / 10000;

        return {
            type: 'free',
            rule: 'Probability from Counting',
            difficulty: 'hard',
            text: `A group consists of ${label}. ${r} people are chosen at random. Find the probability that all chosen people are the same gender.`,
            latex: `\\text{Give your answer to 4 decimal places.}`,
            answer: answer,
            answerTex: answer.toFixed(4),
            options: [],
            hintTex: [
                `P = \\frac{\\binom{${a}}{${r}} + \\binom{${b}}{${r}}}{\\binom{${a + b}}{${r}}}`,
                `= \\frac{${favA} + ${favB}}{${totalWays}} = \\frac{${favA + favB}}{${totalWays}} = ${answer.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Count favourable — all boys: \\(\\binom{${a}}{${r}} = ${favA}\\).<br><br>` +
                     `<strong>Step 2:</strong> Count favourable — all girls: \\(\\binom{${b}}{${r}} = ${favB}\\).<br><br>` +
                     `<strong>Step 3:</strong> Total ways to choose ${r} from ${a + b}: \\(\\binom{${a + b}}{${r}} = ${totalWays}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(P = \\dfrac{${favA} + ${favB}}{${totalWays}} = \\dfrac{${favA + favB}}{${totalWays}} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => COUNTING.qPermutation(),         weight: 3, diff: 'easy'   },
            { fn: () => COUNTING.qCombination(),         weight: 3, diff: 'easy'   },
            { fn: () => COUNTING.qDistinguishPC(),       weight: 3, diff: 'easy'   },
            { fn: () => COUNTING.qProbCounting(),        weight: 2, diff: 'medium' },
            { fn: () => COUNTING.qArrangementsAll(),     weight: 3, diff: 'easy'   },
            { fn: () => COUNTING.qArrangementsRestrict(),weight: 2, diff: 'medium' },
            { fn: () => COUNTING.qCircularArrangements(),weight: 2, diff: 'medium' },
            { fn: () => COUNTING.qBinomialCoeff(),       weight: 3, diff: 'easy'   },
            { fn: () => COUNTING.qIdenticalItems(),      weight: 1, diff: 'hard'   },
            { fn: () => COUNTING.qProbFromCounting(),    weight: 1, diff: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (COUNTING.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (COUNTING.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (COUNTING.level === 'hard') {
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
        COUNTING.score = 0;
        COUNTING.total = 0;
        COUNTING.streak = 0;
        COUNTING.answered = false;
        COUNTING.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="COUNTING.unload()">Counting &amp; Probability (4.13)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Counting &amp; Probability</h1>
                <p>IB Math AA 4.13 – Permutations, combinations, and probability</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="COUNTING.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="COUNTING.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="COUNTING.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="COUNTING.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="cnt-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="cnt-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="cnt-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="cnt-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="cnt-question-card">
                <span class="rule-tag" id="cnt-rule"></span>
                <span class="difficulty-tag" id="cnt-difficulty"></span>
                <div class="question-text" id="cnt-text"></div>
                <div class="question-prompt" id="cnt-latex"></div>
                <div id="cnt-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="cnt-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="cnt-feedback">
                <div class="feedback-title" id="cnt-feedback-title"></div>
                <div class="feedback-explanation" id="cnt-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cnt-hint-btn" onclick="COUNTING.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cnt-next-btn" onclick="COUNTING.next()" style="display:none;">Next Question</button>
            </div>
        `;

        COUNTING.next();
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
        COUNTING.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        COUNTING.score = 0;
        COUNTING.total = 0;
        COUNTING.streak = 0;
        COUNTING.updateStats();
        COUNTING.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        COUNTING.answered = false;
        COUNTING.hintIndex = 0;
        COUNTING.currentQ = COUNTING.pickQuestion();
        const q = COUNTING.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('cnt-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('cnt-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('cnt-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('cnt-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('cnt-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="COUNTING.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="cnt-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')COUNTING.checkFree()">
                    <button class="btn btn-primary" onclick="COUNTING.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('cnt-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('cnt-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('cnt-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('cnt-next-btn').style.display = 'none';
        document.getElementById('cnt-hint-btn').style.display = '';
        document.getElementById('cnt-hint-btn').disabled = false;

        // Render KaTeX
        COUNTING.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = COUNTING.currentQ;
        if (!q || !q.hintTex || COUNTING.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('cnt-hint-box');
        const hintContent = COUNTING.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[COUNTING.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        COUNTING.hintIndex++;

        if (COUNTING.hintIndex >= q.hintTex.length) {
            document.getElementById('cnt-hint-btn').disabled = true;
        }

        COUNTING.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (COUNTING.answered) return;
        COUNTING.answered = true;
        COUNTING.total++;

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
            COUNTING.score++;
            COUNTING.streak++;
        } else {
            btn.classList.add('incorrect');
            COUNTING.streak = 0;
        }

        COUNTING.showFeedback(isCorrect);
        COUNTING.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (COUNTING.answered) return;

        const inp = document.getElementById('cnt-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        COUNTING.answered = true;
        COUNTING.total++;
        inp.disabled = true;

        const q = COUNTING.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.0001);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            COUNTING.score++;
            COUNTING.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            COUNTING.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        COUNTING.showFeedback(isCorrect);
        COUNTING.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = COUNTING.currentQ;
        const fb = document.getElementById('cnt-feedback');
        const title = document.getElementById('cnt-feedback-title');
        const explanation = document.getElementById('cnt-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (COUNTING.streak > 1) {
                title.textContent = `Correct! (${COUNTING.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('cnt-next-btn').style.display = '';
        document.getElementById('cnt-hint-btn').style.display = 'none';

        COUNTING.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('cnt-score');
        const totalEl = document.getElementById('cnt-total');
        const streakEl = document.getElementById('cnt-streak');
        const accEl = document.getElementById('cnt-accuracy');

        if (scoreEl) scoreEl.textContent = COUNTING.score;
        if (totalEl) totalEl.textContent = COUNTING.total;
        if (streakEl) streakEl.textContent = COUNTING.streak;
        if (accEl) {
            accEl.textContent = COUNTING.total > 0
                ? Math.round((COUNTING.score / COUNTING.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['counting-probability'] = () => COUNTING.load();
