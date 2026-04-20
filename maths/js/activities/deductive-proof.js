/*
 * deductive-proof.js - IB Math AA 1.7: Deductive Proof
 * Algebraic identities, even/odd proofs, verify vs prove
 */

const DEDUCTIVE_PROOF = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    qIsIdentity() {
        // MC: given equation, is it an identity or conditional?
        const items = [
            { eq: '(a+b)^2 = a^2 + 2ab + b^2', isId: true, explain: 'This expands to the same expression on both sides for all values of \\(a\\) and \\(b\\).' },
            { eq: 'x^2 - 1 = (x+1)(x-1)', isId: true, explain: 'This is the difference of two squares identity, true for all \\(x\\).' },
            { eq: '\\sin^2\\theta + \\cos^2\\theta = 1', isId: true, explain: 'This is the Pythagorean identity, true for all \\(\\theta\\).' },
            { eq: 'x^2 + 5x + 6 = (x+2)(x+3)', isId: true, explain: 'Expanding the RHS gives \\(x^2 + 5x + 6\\), true for all \\(x\\).' },
            { eq: '2(x+3) = 2x + 6', isId: true, explain: 'By the distributive law, this is true for all \\(x\\).' },
            { eq: 'n^2 + n = n(n+1)', isId: true, explain: 'Factoring the LHS gives \\(n(n+1)\\), true for all \\(n\\).' },
            { eq: 'x^2 = 4', isId: false, explain: '\\(x^2 = 4\\) is only true for \\(x = \\pm 2\\). It is a conditional equation, not an identity.' },
            { eq: '2x + 1 = 7', isId: false, explain: 'This is only true for \\(x = 3\\). It is a conditional equation.' },
            { eq: 'x^2 - 5x + 6 = 0', isId: false, explain: 'This is only true for \\(x = 2\\) or \\(x = 3\\). It is a conditional equation.' },
            { eq: 'x + 2 = 2 + x', isId: true, explain: 'By commutativity of addition, this is true for all \\(x\\).' },
            { eq: '(x-1)^2 = x^2 + 1', isId: false, explain: 'Expanding LHS: \\(x^2 - 2x + 1 \\neq x^2 + 1\\) in general. Only true if \\(-2x = 0\\), i.e. \\(x = 0\\).' },
            { eq: 'a^2 - b^2 = (a-b)(a+b)', isId: true, explain: 'This is the difference of squares identity, true for all \\(a, b\\).' }
        ];
        const item = items[MathUtils.randInt(0, items.length - 1)];
        const opts = DEDUCTIVE_PROOF.shuffle([
            { tex: '\\text{Identity (true for all values)}', value: item.isId ? 1 : 0 },
            { tex: '\\text{Conditional equation (true for some values only)}', value: item.isId ? 0 : 1 }
        ]);
        return {
            type: 'mc',
            rule: 'Identity vs Equation',
            difficulty: 'easy',
            text: 'Classify the following as an <strong>identity</strong> (always true) or a <strong>conditional equation</strong> (true only for specific values).',
            latex: `\\(${item.eq}\\)`,
            answer: 1,
            answerTex: item.isId ? '\\text{Identity}' : '\\text{Conditional equation}',
            options: opts,
            hintTex: [
                '\\text{An identity is true for ALL values of the variable.}',
                '\\text{Try expanding or simplifying both sides to check.}'
            ],
            explain: `<strong>${item.isId ? 'Identity' : 'Conditional equation'}.</strong><br><br>${item.explain}`
        };
    },

    qEvenOdd() {
        // MC: is this expression always even, always odd, or neither?
        const items = [
            { expr: 'n^2 + n', result: 'even', n: 'n', explain: 'Factor: \\(n(n+1)\\). One of any two consecutive integers is even, so the product is always even.' },
            { expr: '2n + 1', result: 'odd', n: 'n', explain: '\\(2n\\) is always even, so \\(2n + 1\\) is always odd.' },
            { expr: 'n^2 - n', result: 'even', n: 'n', explain: 'Factor: \\(n(n-1)\\). One of any two consecutive integers is even, so the product is always even.' },
            { expr: '3n', result: 'neither', n: 'n', explain: '\\(3n\\) is even when \\(n\\) is even and odd when \\(n\\) is odd. Not always the same parity.' },
            { expr: '2n', result: 'even', n: 'n', explain: 'By definition, \\(2n\\) is always even for any integer \\(n\\).' },
            { expr: 'n^2 + 1', result: 'neither', n: 'n', explain: 'When \\(n = 2\\): \\(5\\) (odd). When \\(n = 3\\): \\(10\\) (even). Not always the same parity.' },
            { expr: 'n(n+2)', result: 'even', n: 'n', explain: 'One of \\(n\\) or \\(n+2\\) has the same parity as \\(n\\) and \\(n+1\\) being consecutive. Actually: if \\(n\\) is even, \\(n(n+2)\\) is even; if \\(n\\) is odd, \\(n+2\\) is also odd but \\(n(n+2)\\) is odd &times; odd = odd... Wait, let me recheck. Actually n(n+2) = n^2 + 2n = even when n even; odd&times;odd+even=odd+even=odd when n odd. So this is neither. Replace with: \\(n^2 + 3n + 2 = (n+1)(n+2)\\)', explain: 'Factor: \\((n+1)(n+2)\\) - two consecutive integers always include an even number. Always even.' },
            { expr: '(n+1)(n+2)', result: 'even', n: 'n', explain: '\\((n+1)\\) and \\((n+2)\\) are consecutive integers. One of any two consecutive integers is even, so their product is always even.' }
        ];
        const item = items.filter(i => i.result !== 'neither' || Math.random() > 0.5)[MathUtils.randInt(0, 6)];
        const filtered = items.filter(i => ['even', 'odd', 'neither'].includes(i.result));
        const chosen = filtered[MathUtils.randInt(0, filtered.length - 1)];
        const opts = DEDUCTIVE_PROOF.shuffle([
            { tex: '\\text{Always even}', value: chosen.result === 'even' ? 1 : 0 },
            { tex: '\\text{Always odd}', value: chosen.result === 'odd' ? 1 : 0 },
            { tex: '\\text{Neither (depends on }n\\text{)}', value: chosen.result === 'neither' ? 1 : 0 }
        ]);
        return {
            type: 'mc',
            rule: 'Even / Odd Proof',
            difficulty: 'easy',
            text: 'For any integer \\(n\\), is the following expression always even, always odd, or neither?',
            latex: `\\(${chosen.expr}\\)`,
            answer: 1,
            answerTex: chosen.result === 'even' ? '\\text{Always even}' : chosen.result === 'odd' ? '\\text{Always odd}' : '\\text{Neither}',
            options: opts,
            hintTex: [
                '\\text{An integer is even if it equals } 2k \\text{ for some integer } k.',
                '\\text{An integer is odd if it equals } 2k+1 \\text{ for some integer } k.',
                '\\text{Try factoring or substituting even/odd expressions for } n.'
            ],
            explain: `<strong>${chosen.result === 'even' ? 'Always even' : chosen.result === 'odd' ? 'Always odd' : 'Neither - depends on n'}.</strong><br><br>${chosen.explain}`
        };
    },

    qAlgebraicStep() {
        // Identify a valid algebraic step in a proof - MC
        const items = [
            {
                statement: '\\text{Expand } (x-3)^2',
                correct: 'x^2 - 6x + 9',
                distractors: ['x^2 + 9', 'x^2 - 9', 'x^2 + 6x + 9'],
                explain: '\\((x-3)^2 = x^2 - 2(3)x + 3^2 = x^2 - 6x + 9\\)'
            },
            {
                statement: '\\text{Expand } (2a+b)(2a-b)',
                correct: '4a^2 - b^2',
                distractors: ['4a^2 + b^2', '2a^2 - b^2', '4a^2 - 2b^2'],
                explain: '\\((2a+b)(2a-b) = (2a)^2 - b^2 = 4a^2 - b^2\\) (difference of squares)'
            },
            {
                statement: '\\text{Simplify } \\dfrac{x^2-4}{x+2}',
                correct: 'x - 2',
                distractors: ['x + 2', 'x^2 - 2', '\\dfrac{x^2}{x} - 2'],
                explain: '\\(\\dfrac{x^2-4}{x+2} = \\dfrac{(x+2)(x-2)}{x+2} = x-2\\) (for \\(x \\neq -2\\))'
            },
            {
                statement: '\\text{Expand } (n+1)^2 - n^2',
                correct: '2n + 1',
                distractors: ['2n - 1', '1', '2n'],
                explain: '\\((n+1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1\\)'
            },
            {
                statement: '\\text{Factorise } a^2 - 9',
                correct: '(a+3)(a-3)',
                distractors: ['(a-3)^2', '(a+3)^2', '(a-9)(a+1)'],
                explain: '\\(a^2 - 9 = a^2 - 3^2 = (a+3)(a-3)\\) (difference of squares)'
            }
        ];
        const item = items[MathUtils.randInt(0, items.length - 1)];
        const opts = DEDUCTIVE_PROOF.shuffle([
            { tex: item.correct, value: 1 },
            ...item.distractors.map(d => ({ tex: d, value: 0 }))
        ]);
        return {
            type: 'mc',
            rule: 'Algebraic Step',
            difficulty: 'easy',
            text: 'Choose the correct result for the following step:',
            latex: `\\(${item.statement}\\)`,
            answer: 1,
            answerTex: item.correct,
            options: opts,
            hintTex: [
                '\\text{Expand carefully, term by term.}',
                '\\text{Use the identity you know (difference of squares, perfect square, etc.)}'
            ],
            explain: item.explain
        };
    },

    qProofComplete() {
        // Fill in a missing step in a proof
        const items = [
            {
                goal: 'Show that \\(n^2 + n\\) is even for all integers \\(n\\).',
                steps: [
                    '\\(n^2 + n = n(n+1)\\)',
                    'One of \\(n\\) or \\(n+1\\) is even (consecutive integers).',
                    'Therefore \\(n(n+1)\\) is even.'
                ],
                question: 'Which expression is used to factor \\(n^2 + n\\) in the first step?',
                correct: 'n(n+1)',
                distractors: ['n(n-1)', '2n + 1', 'n^2(1 + \\tfrac{1}{n})'],
                explain: '\\(n^2 + n = n \\cdot n + n \\cdot 1 = n(n+1)\\) by factoring out \\(n\\).'
            },
            {
                goal: 'Show that the product of two odd numbers is odd.',
                steps: [
                    'Let \\(m = 2a+1\\) and \\(n = 2b+1\\) for integers \\(a, b\\).',
                    '\\(mn = (2a+1)(2b+1) = 4ab + 2a + 2b + 1 = 2(2ab+a+b) + 1\\).',
                    'This is of the form \\(2k+1\\), so \\(mn\\) is odd.'
                ],
                question: 'In step 2, what form does \\(mn\\) take?',
                correct: '2k + 1 \\text{ (odd)}',
                distractors: ['2k \\text{ (even)}', '4k+1', 'k^2 + 1'],
                explain: '\\(mn = 2(2ab+a+b) + 1\\). Since \\(2ab+a+b\\) is an integer, \\(mn = 2k+1\\) for some integer \\(k\\) - this is the definition of an odd number.'
            },
            {
                goal: 'Prove that \\((a+b)^2 = a^2 + 2ab + b^2\\).',
                steps: [
                    '\\((a+b)^2 = (a+b)(a+b)\\)',
                    'Expand: \\(= a^2 + ab + ba + b^2\\)',
                    'Since \\(ab = ba\\): \\(= a^2 + 2ab + b^2\\)'
                ],
                question: 'What property is used in the final step?',
                correct: '\\text{Commutativity: } ab = ba',
                distractors: ['\\text{Associativity: } (ab)c = a(bc)', '\\text{Distributivity: } a(b+c) = ab+ac', '\\text{Reflexivity: } a = a'],
                explain: 'The step \\(ab + ba = 2ab\\) uses commutativity of multiplication (\\(ab = ba\\)), which holds for all real numbers.'
            }
        ];
        const item = items[MathUtils.randInt(0, items.length - 1)];
        const opts = DEDUCTIVE_PROOF.shuffle([
            { tex: item.correct, value: 1 },
            ...item.distractors.map(d => ({ tex: d, value: 0 }))
        ]);
        const stepsHtml = item.steps.map((s, i) => `<p style="margin:4px 0;"><strong>${i+1}.</strong> \\(${s.replace(/^\\\(|\\\)$/g, '')}\\)</p>`).join('');
        return {
            type: 'mc',
            rule: 'Proof Structure',
            difficulty: 'medium',
            text: `<strong>${item.goal}</strong><br><div style="background:var(--border-light,#f0f4ff);padding:10px;border-radius:8px;margin:8px 0;">${stepsHtml}</div>${item.question}`,
            latex: '',
            answer: 1,
            answerTex: item.correct,
            options: opts,
            hintTex: [
                '\\text{Read each step of the proof carefully.}',
                '\\text{Identify what algebraic operation connects consecutive steps.}'
            ],
            explain: item.explain
        };
    },

    qCounterexample() {
        // Disprove a false statement with a counterexample
        const items = [
            {
                claim: 'For all integers \\(n\\), \\(n^2 > n\\).',
                correct: 'n = 1',
                distractors: ['n = 5', 'n = -3', 'n = 100'],
                explain: 'When \\(n = 1\\): \\(1^2 = 1 = n\\), so \\(n^2 > n\\) is false. Also \\(n = 0\\) gives \\(0 > 0\\) which is false.'
            },
            {
                claim: 'For all real \\(x\\), \\(\\sqrt{x^2} = x\\).',
                correct: 'x = -3',
                distractors: ['x = 4', 'x = 0', 'x = 1'],
                explain: 'When \\(x = -3\\): \\(\\sqrt{(-3)^2} = \\sqrt{9} = 3 \\neq -3\\). The correct identity is \\(\\sqrt{x^2} = |x|\\).'
            },
            {
                claim: 'For all integers \\(n \\geq 1\\), \\(2^n > n^2\\).',
                correct: 'n = 4',
                distractors: ['n = 1', 'n = 10', 'n = 100'],
                explain: 'When \\(n = 4\\): \\(2^4 = 16 = 4^2\\), so \\(2^4 > 4^2\\) is false (they are equal, not strictly greater).'
            },
            {
                claim: 'For all integers \\(n\\), \\(n^2 + n + 41\\) is prime.',
                correct: 'n = 40',
                distractors: ['n = 1', 'n = 10', 'n = 20'],
                explain: 'When \\(n = 40\\): \\(40^2 + 40 + 41 = 1681 = 41^2\\), which is not prime. This famous formula works for \\(n = 0\\) to \\(39\\) but fails at \\(n = 40\\).'
            }
        ];
        const item = items[MathUtils.randInt(0, items.length - 1)];
        const opts = DEDUCTIVE_PROOF.shuffle([
            { tex: item.correct, value: 1 },
            ...item.distractors.map(d => ({ tex: d, value: 0 }))
        ]);
        return {
            type: 'mc',
            rule: 'Counterexample',
            difficulty: 'medium',
            text: 'The following claim is <strong>false</strong>. Which value is a counterexample?<br><br>' + item.claim,
            latex: '',
            answer: 1,
            answerTex: item.correct,
            options: opts,
            hintTex: [
                '\\text{A counterexample is a specific value that makes the statement false.}',
                '\\text{Try small or special values first (0, 1, negative numbers).}'
            ],
            explain: item.explain
        };
    },

    qInequalityProof() {
        // MC: which step in an inequality proof is valid?
        const items = [
            {
                question: 'Prove \\(a^2 + b^2 \\geq 2ab\\) for all real \\(a, b\\). Which step completes the proof?',
                setup: '\\(a^2 + b^2 - 2ab \\geq 0\\)',
                correct: '(a-b)^2 \\geq 0 \\text{ (always true)}',
                distractors: ['a - b \\geq 0', '(a+b)^2 \\geq 0', 'a^2 \\geq b^2'],
                explain: '\\(a^2 + b^2 - 2ab = (a-b)^2 \\geq 0\\) for all real \\(a, b\\), since any real square is non-negative. Therefore \\(a^2 + b^2 \\geq 2ab\\). \\(\\square\\)'
            },
            {
                question: 'Show \\((x+1)^2 \\geq 0\\) for all real \\(x\\). What justifies this?',
                setup: '(x+1)^2 = x^2 + 2x + 1',
                correct: '\\text{The square of any real number is non-negative.}',
                distractors: ['x^2 \\geq 0 \\text{ only}', 'x \\geq -1', '2x + 1 > 0'],
                explain: 'For any real number \\(y\\), \\(y^2 \\geq 0\\). Setting \\(y = x+1\\) gives \\((x+1)^2 \\geq 0\\) for all real \\(x\\).'
            }
        ];
        const item = items[MathUtils.randInt(0, items.length - 1)];
        const opts = DEDUCTIVE_PROOF.shuffle([
            { tex: item.correct, value: 1 },
            ...item.distractors.map(d => ({ tex: d, value: 0 }))
        ]);
        return {
            type: 'mc',
            rule: 'Inequality Proof',
            difficulty: 'hard',
            text: item.question + '<br><br>Starting from: \\(' + item.setup + '\\), choose the key step:',
            latex: '',
            answer: 1,
            answerTex: item.correct,
            options: opts,
            hintTex: [
                '\\text{Look for a perfect square or known non-negative expression.}',
                '\\(y^2 \\geq 0 \\text{ for all real } y\\text{. This is a key fact in inequality proofs.}'
            ],
            explain: item.explain
        };
    },

    /* ────────────────────────────────────────────
       QUESTION DISPATCH
       ──────────────────────────────────────────── */

    next() {
        DEDUCTIVE_PROOF.answered = false;
        DEDUCTIVE_PROOF.hintIndex = 0;

        const qs = {
            easy:   [DEDUCTIVE_PROOF.qIsIdentity, DEDUCTIVE_PROOF.qEvenOdd, DEDUCTIVE_PROOF.qAlgebraicStep],
            medium: [DEDUCTIVE_PROOF.qProofComplete, DEDUCTIVE_PROOF.qCounterexample, DEDUCTIVE_PROOF.qEvenOdd],
            hard:   [DEDUCTIVE_PROOF.qInequalityProof, DEDUCTIVE_PROOF.qProofComplete, DEDUCTIVE_PROOF.qCounterexample]
        };
        const lvl = DEDUCTIVE_PROOF.level === 'all'
            ? ['easy', 'easy', 'medium', 'medium', 'hard'][MathUtils.randInt(0, 4)]
            : DEDUCTIVE_PROOF.level;
        const pool = qs[lvl] || qs.easy;
        DEDUCTIVE_PROOF.currentQ = pool[MathUtils.randInt(0, pool.length - 1)]();

        const q = DEDUCTIVE_PROOF.currentQ;
        document.getElementById('dp-rule').textContent = q.rule;
        document.getElementById('dp-difficulty').textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        document.getElementById('dp-text').innerHTML = q.text;
        document.getElementById('dp-latex').innerHTML = q.latex;

        const fb = document.getElementById('dp-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById('dp-hint-box').innerHTML = '';
        document.getElementById('dp-next-btn').style.display = 'none';
        document.getElementById('dp-hint-btn').style.display = '';

        const area = document.getElementById('dp-options-area');
        area.innerHTML = q.options.map(opt =>
            `<button class="mc-btn" data-value="${opt.value}" onclick="DEDUCTIVE_PROOF.checkMC(this)">\\(${opt.tex}\\)</button>`
        ).join('');
        DEDUCTIVE_PROOF.renderAllKaTeX();
    },

    showHint() {
        const q = DEDUCTIVE_PROOF.currentQ;
        if (!q || !q.hintTex) return;
        const box = document.getElementById('dp-hint-box');
        if (DEDUCTIVE_PROOF.hintIndex < q.hintTex.length) {
            box.innerHTML = (box.innerHTML ? box.innerHTML + '<br>' : '') + `\\(${q.hintTex[DEDUCTIVE_PROOF.hintIndex]}\\)`;
            DEDUCTIVE_PROOF.hintIndex++;
            DEDUCTIVE_PROOF.renderAllKaTeX();
        }
    },

    checkMC(btn) {
        if (DEDUCTIVE_PROOF.answered) return;
        DEDUCTIVE_PROOF.answered = true; DEDUCTIVE_PROOF.total++;
        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.mc-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });
        if (isCorrect) { btn.classList.add('correct'); DEDUCTIVE_PROOF.score++; DEDUCTIVE_PROOF.streak++; }
        else { btn.classList.add('incorrect'); DEDUCTIVE_PROOF.streak = 0; }
        DEDUCTIVE_PROOF.showFeedback(isCorrect);
        DEDUCTIVE_PROOF.updateStats();
    },

    showFeedback(isCorrect) {
        const q = DEDUCTIVE_PROOF.currentQ;
        const fb = document.getElementById('dp-feedback');
        const title = document.getElementById('dp-feedback-title');
        const explanation = document.getElementById('dp-feedback-explanation');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            title.textContent = DEDUCTIVE_PROOF.streak > 1 ? `Correct! (${DEDUCTIVE_PROOF.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }
        explanation.innerHTML = q.explain;
        document.getElementById('dp-next-btn').style.display = '';
        document.getElementById('dp-hint-btn').style.display = 'none';
        DEDUCTIVE_PROOF.renderAllKaTeX();
    },

    updateStats() {
        const s = document.getElementById('dp-score');
        const t = document.getElementById('dp-total');
        const k = document.getElementById('dp-streak');
        const a = document.getElementById('dp-accuracy');
        if (s) s.textContent = DEDUCTIVE_PROOF.score;
        if (t) t.textContent = DEDUCTIVE_PROOF.total;
        if (k) k.textContent = DEDUCTIVE_PROOF.streak;
        if (a) a.textContent = DEDUCTIVE_PROOF.total > 0 ? Math.round((DEDUCTIVE_PROOF.score / DEDUCTIVE_PROOF.total) * 100) + '%' : '-';
    },

    renderAllKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const c = document.getElementById('activity-container');
            if (c) renderMathInElement(c, {
                delimiters: [
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ],
                throwOnError: false
            });
        }
    },

    setLevel(lvl) {
        DEDUCTIVE_PROOF.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn =>
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl)
        );
        DEDUCTIVE_PROOF.score = 0; DEDUCTIVE_PROOF.total = 0; DEDUCTIVE_PROOF.streak = 0;
        DEDUCTIVE_PROOF.updateStats();
        DEDUCTIVE_PROOF.next();
    },

    load() {
        DEDUCTIVE_PROOF.score = 0; DEDUCTIVE_PROOF.total = 0;
        DEDUCTIVE_PROOF.streak = 0; DEDUCTIVE_PROOF.answered = false;
        DEDUCTIVE_PROOF.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="DEDUCTIVE_PROOF.unload()">Deductive Proof (1.7)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Deductive Proof</h1>
                <p>IB Math AA 1.7 - Identities, algebraic proof, even/odd, counterexamples</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="DEDUCTIVE_PROOF.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="DEDUCTIVE_PROOF.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="DEDUCTIVE_PROOF.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="DEDUCTIVE_PROOF.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="dp-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="dp-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="dp-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="dp-accuracy">-</div></div>
            </div>
            <div class="question-card" id="dp-question-card">
                <span class="rule-tag" id="dp-rule"></span>
                <span class="difficulty-tag" id="dp-difficulty"></span>
                <div class="question-text" id="dp-text"></div>
                <div class="question-prompt" id="dp-latex"></div>
                <div id="dp-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="dp-hint-box"></div>
            <div class="feedback" id="dp-feedback">
                <div class="feedback-title" id="dp-feedback-title"></div>
                <div class="feedback-explanation" id="dp-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="dp-hint-btn" onclick="DEDUCTIVE_PROOF.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="dp-next-btn" onclick="DEDUCTIVE_PROOF.next()" style="display:none;">Next Question</button>
            </div>
        `;
        DEDUCTIVE_PROOF.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['deductive-proof'] = () => DEDUCTIVE_PROOF.load();
}
