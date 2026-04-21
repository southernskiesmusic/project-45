/* ================================================================
   ACTIVITY: Equilibrium (IB Chemistry 5.3)
   ================================================================ */
const CHEM_EQUILIBRIUM = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    /* ═══════════════════════════════════════════════
       GENERATOR 1 - Kc Expression (MC)
       ═══════════════════════════════════════════════ */
    qKcExpression() {
        const questions = [
            {
                text: 'Which expression correctly represents \\(K_c\\) for: \\(\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g)\\)?',
                options: [
                    '\\(K_c = \\dfrac{[\\text{NH}_3]^2}{[\\text{N}_2][\\text{H}_2]^3}\\)',
                    '\\(K_c = \\dfrac{[\\text{N}_2][\\text{H}_2]^3}{[\\text{NH}_3]^2}\\)',
                    '\\(K_c = \\dfrac{[\\text{NH}_3]}{[\\text{N}_2][\\text{H}_2]}\\)',
                    '\\(K_c = \\dfrac{[\\text{NH}_3]^2}{[\\text{N}_2]^2[\\text{H}_2]^3}\\)'
                ],
                correctIndex: 0,
                explain: '\\(K_c = \\dfrac{[\\text{NH}_3]^2}{[\\text{N}_2][\\text{H}_2]^3}\\). Products over reactants, with concentrations raised to stoichiometric coefficients.'
            },
            {
                text: 'Which expression correctly represents \\(K_c\\) for: \\(2\\text{SO}_2(g) + \\text{O}_2(g) \\rightleftharpoons 2\\text{SO}_3(g)\\)?',
                options: [
                    '\\(K_c = \\dfrac{[\\text{SO}_3]^2}{[\\text{SO}_2]^2[\\text{O}_2]}\\)',
                    '\\(K_c = \\dfrac{[\\text{SO}_2]^2[\\text{O}_2]}{[\\text{SO}_3]^2}\\)',
                    '\\(K_c = \\dfrac{[\\text{SO}_3]}{[\\text{SO}_2]^2[\\text{O}_2]}\\)',
                    '\\(K_c = \\dfrac{[\\text{SO}_3]^2}{[\\text{SO}_2][\\text{O}_2]}\\)'
                ],
                correctIndex: 0,
                explain: '\\(K_c = \\dfrac{[\\text{SO}_3]^2}{[\\text{SO}_2]^2[\\text{O}_2]}\\). Each concentration is raised to its stoichiometric coefficient.'
            },
            {
                text: 'For the reaction: \\(\\text{CaCO}_3(s) \\rightleftharpoons \\text{CaO}(s) + \\text{CO}_2(g)\\), which is the correct \\(K_c\\) expression?',
                options: [
                    '\\(K_c = [\\text{CO}_2]\\)',
                    '\\(K_c = \\dfrac{[\\text{CaO}][\\text{CO}_2]}{[\\text{CaCO}_3]}\\)',
                    '\\(K_c = \\dfrac{[\\text{CO}_2]}{[\\text{CaCO}_3]}\\)',
                    '\\(K_c = \\dfrac{[\\text{CaO}]}{[\\text{CaCO}_3]}\\)'
                ],
                correctIndex: 0,
                explain: '\\(K_c = [\\text{CO}_2]\\). Pure solids (CaCO\\(_3\\) and CaO) are excluded from the \\(K_c\\) expression because their concentrations are constant.'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: 'K\\(_c\\) Expression',
            difficulty: 'easy',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.options[q.correctIndex],
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                '\\(K_c = \\dfrac{\\text{[products]}^{\\text{stoich coefficients}}}{\\text{[reactants]}^{\\text{stoich coefficients}}}\\)',
                'Pure solids and pure liquids are NOT included in the \\(K_c\\) expression.',
                'Each concentration is raised to the power of its coefficient in the balanced equation.'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 2 - Calculate Kc
       ═══════════════════════════════════════════════ */
    qKcCalc() {
        // A + B ⇌ C  Kc = [C]/([A][B])
        const cA = MathUtils.pick([0.2, 0.5, 1.0, 0.4, 0.8]);
        const cB = MathUtils.pick([0.3, 0.4, 0.6, 1.0, 0.5]);
        const cC = MathUtils.pick([0.1, 0.2, 0.4, 0.6, 0.8]);
        const Kc = parseFloat((cC / (cA * cB)).toFixed(3));
        return {
            type: 'free',
            rule: 'Calculate K\\(_c\\)',
            difficulty: 'medium',
            text: `For the equilibrium \\(\\text{A} + \\text{B} \\rightleftharpoons \\text{C}\\), the equilibrium concentrations are: \\([\\text{A}] = ${cA}\\text{ mol dm}^{-3}\\), \\([\\text{B}] = ${cB}\\text{ mol dm}^{-3}\\), \\([\\text{C}] = ${cC}\\text{ mol dm}^{-3}\\). Calculate \\(K_c\\).`,
            answer: Kc,
            answerTex: `K_c = ${Kc}`,
            options: [],
            hintTex: [
                'Write the \\(K_c\\) expression: \\(K_c = \\dfrac{[\\text{C}]}{[\\text{A}][\\text{B}]}\\)',
                `Substitute: \\(K_c = \\dfrac{${cC}}{${cA} \\times ${cB}}\\)`,
                `\\(K_c = \\dfrac{${cC}}{${parseFloat((cA*cB).toFixed(4))}} = ${Kc}\\)`
            ],
            explain: `\\(K_c = \\dfrac{[\\text{C}]}{[\\text{A}][\\text{B}]} = \\dfrac{${cC}}{${cA} \\times ${cB}} = ${Kc}\\). Note: \\(K_c\\) has no units when the number of moles of products equals the number of moles of reactants.`
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 3 - Le Chatelier: Concentration (MC)
       ═══════════════════════════════════════════════ */
    qLeChatelierConc() {
        const questions = [
            {
                text: 'For the equilibrium \\(\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g)\\), what happens if more \\(\\text{N}_2\\) is added at constant temperature?',
                options: ['Equilibrium shifts right, more NH\\(_3\\) formed', 'Equilibrium shifts left', 'Equilibrium position is unaffected', '\\(K_c\\) increases'],
                correctIndex: 0,
                explain: 'Adding more N\\(_2\\) (reactant) disturbs equilibrium. The system responds by shifting to the right (towards products) to reduce the disturbance, producing more NH\\(_3\\). \\(K_c\\) is unchanged.'
            },
            {
                text: 'For the equilibrium \\(2\\text{SO}_2(g) + \\text{O}_2(g) \\rightleftharpoons 2\\text{SO}_3(g)\\), what happens if some \\(\\text{SO}_3\\) is removed?',
                options: ['Equilibrium shifts right, more SO\\(_3\\) formed', 'Equilibrium shifts left', 'Equilibrium position is unaffected', '\\(K_c\\) decreases'],
                correctIndex: 0,
                explain: 'Removing SO\\(_3\\) (product) means the reaction shifts to the right to replenish it. More SO\\(_2\\) and O\\(_2\\) are consumed. \\(K_c\\) does not change.'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: "Le Chatelier's Principle",
            difficulty: 'easy',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.options[q.correctIndex],
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                "Le Chatelier's principle: if a system at equilibrium is disturbed, it responds to minimise the disturbance.",
                'Adding a reactant shifts equilibrium to the right (towards products).',
                'Removing a product shifts equilibrium to the right. Removing a reactant shifts it to the left.'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 4 - Le Chatelier: Temperature Effect on Kc (MC)
       ═══════════════════════════════════════════════ */
    qLeChatelierTemp() {
        const questions = [
            {
                text: 'For the exothermic reaction \\(\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3\\), \\(\\Delta H = -92\\text{ kJ mol}^{-1}\\). If temperature is increased, what happens to \\(K_c\\)?',
                options: ['\\(K_c\\) decreases', '\\(K_c\\) increases', '\\(K_c\\) is unchanged', '\\(K_c\\) doubles'],
                correctIndex: 0,
                explain: 'For an exothermic reaction, increasing temperature shifts equilibrium left (endothermic direction). The position shifts towards reactants, so \\([\\text{NH}_3]\\) decreases and \\([\\text{N}_2]\\), \\([\\text{H}_2]\\) increase. Therefore \\(K_c\\) decreases.'
            },
            {
                text: 'For the endothermic reaction \\(\\text{N}_2(g) + \\text{O}_2(g) \\rightleftharpoons 2\\text{NO}(g)\\), \\(\\Delta H = +180\\text{ kJ mol}^{-1}\\). If temperature is increased, what happens to \\(K_c\\)?',
                options: ['\\(K_c\\) increases', '\\(K_c\\) decreases', '\\(K_c\\) is unchanged', '\\(K_c\\) halves'],
                correctIndex: 0,
                explain: 'For an endothermic reaction, increasing temperature shifts equilibrium right (endothermic direction). \\([\\text{NO}]\\) increases while \\([\\text{N}_2]\\) and \\([\\text{O}_2]\\) decrease, so \\(K_c\\) increases.'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: "Le Chatelier's: Temperature",
            difficulty: 'medium',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.options[q.correctIndex],
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                'Temperature is the only factor that changes \\(K_c\\).',
                'Think of heat as a reactant (endothermic) or product (exothermic).',
                'Increasing temperature shifts equilibrium in the endothermic direction.'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 5 - Le Chatelier: Pressure (MC)
       ═══════════════════════════════════════════════ */
    qLeChatelierPressure() {
        const questions = [
            {
                text: 'For \\(\\text{N}_2(g) + 3\\text{H}_2(g) \\rightleftharpoons 2\\text{NH}_3(g)\\), what happens to the equilibrium position if pressure is increased?',
                molesLeft: 4, molesRight: 2,
                options: ['Shifts right (towards NH\\(_3\\))', 'Shifts left', 'No effect', '\\(K_c\\) decreases'],
                correctIndex: 0,
                explain: 'Left side: 1 + 3 = 4 moles of gas. Right side: 2 moles of gas. Increasing pressure favours the side with fewer moles of gas (right), so equilibrium shifts right towards NH\\(_3\\).'
            },
            {
                text: 'For \\(\\text{PCl}_5(g) \\rightleftharpoons \\text{PCl}_3(g) + \\text{Cl}_2(g)\\), what happens if pressure is decreased?',
                molesLeft: 1, molesRight: 2,
                options: ['Shifts right (more PCl\\(_3\\) and Cl\\(_2\\))', 'Shifts left (more PCl\\(_5\\))', 'No effect', '\\(K_c\\) increases'],
                correctIndex: 0,
                explain: 'Left: 1 mole gas. Right: 2 moles gas. Decreasing pressure favours the side with more moles of gas (right), so equilibrium shifts right.'
            },
            {
                text: 'For \\(\\text{H}_2(g) + \\text{I}_2(g) \\rightleftharpoons 2\\text{HI}(g)\\), what happens if pressure is doubled?',
                molesLeft: 2, molesRight: 2,
                options: ['No change in equilibrium position', 'Shifts right', 'Shifts left', '\\(K_c\\) doubles'],
                correctIndex: 0,
                explain: 'Both sides have 2 moles of gas. When the number of moles of gas is equal on both sides, changing pressure has no effect on the equilibrium position.'
            },
        ];
        const q = MathUtils.pick(questions);
        return {
            type: 'mc',
            rule: "Le Chatelier's: Pressure",
            difficulty: 'medium',
            text: q.text,
            answer: q.correctIndex,
            answerTex: q.options[q.correctIndex],
            options: q.options,
            correctIndex: q.correctIndex,
            hintTex: [
                'Count the total moles of gas on each side of the equation.',
                'Increasing pressure shifts equilibrium towards the side with fewer moles of gas.',
                'Decreasing pressure shifts equilibrium towards the side with more moles of gas.'
            ],
            explain: q.explain
        };
    },

    /* ═══════════════════════════════════════════════
       GENERATOR 6 - ICE Table (Free)
       ═══════════════════════════════════════════════ */
    qICE() {
        // A ⇌ B, Kc = [B]/[A]
        // [A]0 = a, [B]0 = 0; at eq: [A]=a-x, [B]=x; Kc = x/(a-x)
        // x = Kc*a/(1+Kc)
        const Kc = MathUtils.pick([2, 4, 0.5, 9, 3]);
        const a = MathUtils.pick([1.0, 0.8, 1.2, 2.0]);
        const x = parseFloat((Kc * a / (1 + Kc)).toFixed(4));
        const eqB = x;
        const eqA = parseFloat((a - x).toFixed(4));
        return {
            type: 'free',
            rule: 'ICE Table',
            difficulty: 'hard',
            text: `For the equilibrium \\(\\text{A}(g) \\rightleftharpoons \\text{B}(g)\\), \\(K_c = ${Kc}\\). If the initial concentration of A is \\(${a}\\) mol dm\\(^{-3}\\) and no B is present initially, calculate the equilibrium concentration of B (mol dm\\(^{-3}\\)).`,
            answer: eqB,
            answerTex: `[\\text{B}]_{\\text{eq}} = ${eqB}\\text{ mol dm}^{-3}`,
            options: [],
            hintTex: [
                'Set up an ICE table: I = initial, C = change, E = equilibrium.',
                `Let \\(x\\) = change in concentration. At equilibrium: \\([\\text{A}] = ${a} - x\\), \\([\\text{B}] = x\\).`,
                `\\(K_c = \\dfrac{x}{${a}-x} = ${Kc}\\). Solve: \\(x = \\dfrac{${Kc} \\times ${a}}{1 + ${Kc}} = ${eqB}\\text{ mol dm}^{-3}\\)`
            ],
            explain: `ICE table: \\([\\text{A}]: ${a} \\to ${a}-x\\); \\([\\text{B}]: 0 \\to x\\). Setting \\(K_c = \\dfrac{x}{${a}-x} = ${Kc}\\): \\(x = ${Kc}(${a}-x) \\Rightarrow x(1+${Kc}) = ${Kc \\times a}\\) ...wait: \\(x = \\dfrac{${Kc} \\times ${a}}{1+${Kc}} = ${eqB}\\text{ mol dm}^{-3}\\). Check: \\(K_c = \\dfrac{${eqB}}{${eqA}} \\approx ${parseFloat((eqB/eqA).toFixed(2))}\\) ✓`
        };
    },

    /* ═══════════════════════════════════════════════
       ENGINE
       ═══════════════════════════════════════════════ */
    generators() {
        const all = [
            () => this.qKcExpression(),
            () => this.qKcCalc(),
            () => this.qLeChatelierConc(),
            () => this.qLeChatelierTemp(),
            () => this.qLeChatelierPressure(),
            () => this.qICE(),
        ];
        if (this.level === 'all') return all;
        const map = { easy:[0,2], medium:[1,3,4], hard:[5] };
        return (map[this.level] || []).map(i => all[i]);
    },

    setLevel(lvl) {
        this.level = lvl;
        document.querySelectorAll('#ceq-container .level-filter').forEach(b => b.classList.toggle('active', b.dataset.level === lvl));
        this.next();
    },

    next() {
        const gens = this.generators();
        if (!gens.length) return;
        this.currentQ = MathUtils.pick(gens)();
        this.answered = false;
        this.hintIdx = 0;
        this.render();
    },

    render() {
        const q = this.currentQ;
        document.getElementById('ceq-rule').textContent = q.rule;
        document.getElementById('ceq-difficulty').textContent = q.difficulty;
        document.getElementById('ceq-text').innerHTML = q.text;
        document.getElementById('ceq-hint-box').innerHTML = '';
        document.getElementById('ceq-hint-box').style.display = 'none';
        const fb = document.getElementById('ceq-feedback');
        fb.className = 'feedback'; fb.style.display = 'none';
        document.getElementById('ceq-next-btn').style.display = 'none';
        document.getElementById('ceq-hint-btn').style.display = '';
        const area = document.getElementById('ceq-options-area');
        if (q.type === 'mc') {
            area.innerHTML = q.options.map((o, i) =>
                `<button class="btn btn-option" onclick="CHEM_EQUILIBRIUM.submitMC(${i})">${o}</button>`
            ).join('');
            if (window.MathJax) MathJax.typesetPromise([area]);
        } else {
            area.innerHTML = `<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="ceq-input" class="answer-input" placeholder="Your answer" step="any" onkeydown="if(event.key==='Enter')CHEM_EQUILIBRIUM.submitFree()">
                <button class="btn btn-primary" onclick="CHEM_EQUILIBRIUM.submitFree()">Check</button>
            </div>`;
        }
        if (window.MathJax) MathJax.typesetPromise([document.getElementById('ceq-text')]);
    },

    submitFree() {
        if (this.answered) return;
        const inp = document.getElementById('ceq-input');
        const userVal = parseFloat(inp.value);
        if (isNaN(userVal)) return;
        const ans = this.currentQ.answer;
        const correct = Math.abs(userVal - ans) <= Math.abs(ans * 0.01) + 0.01;
        this.handleResult(correct);
    },

    submitMC(idx) {
        if (this.answered) return;
        const correct = idx === this.currentQ.correctIndex;
        document.querySelectorAll('#ceq-options-area .btn-option').forEach((b, i) => {
            b.disabled = true;
            if (i === this.currentQ.correctIndex) b.classList.add('correct');
            else if (i === idx && !correct) b.classList.add('incorrect');
        });
        this.handleResult(correct);
    },

    handleResult(correct) {
        this.answered = true;
        this.total++;
        if (correct) { this.score++; this.streak++; } else { this.streak = 0; }
        const acc = Math.round(this.score / this.total * 100);
        document.getElementById('ceq-score').textContent = this.score;
        document.getElementById('ceq-total').textContent = this.total;
        document.getElementById('ceq-streak').textContent = this.streak;
        document.getElementById('ceq-accuracy').textContent = acc + '%';
        const fb = document.getElementById('ceq-feedback');
        fb.style.display = '';
        fb.className = 'feedback ' + (correct ? 'correct' : 'incorrect');
        document.getElementById('ceq-feedback-title').textContent = correct ? 'Correct!' : 'Incorrect';
        document.getElementById('ceq-feedback-explanation').innerHTML = `<strong>Answer:</strong> \\(${this.currentQ.answerTex}\\)<br>${this.currentQ.explain}`;
        document.getElementById('ceq-hint-btn').style.display = 'none';
        document.getElementById('ceq-next-btn').style.display = '';
        if (window.MathJax) MathJax.typesetPromise([fb]);
        if (typeof ActivityLogger !== 'undefined') ActivityLogger.log('equilibrium', correct);
    },

    showHint() {
        const q = this.currentQ;
        if (!q || !q.hintTex || this.hintIdx >= q.hintTex.length) return;
        const box = document.getElementById('ceq-hint-box');
        box.style.display = '';
        box.innerHTML = `<strong>Hint ${this.hintIdx + 1}:</strong> ${q.hintTex[this.hintIdx]}`;
        this.hintIdx++;
        if (window.MathJax) MathJax.typesetPromise([box]);
    },

    unload() {
        if (typeof showView === 'function') showView('topic-5');
    },

    load() {
        const container = document.getElementById('ceq-container') || document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="CHEM_EQUILIBRIUM.unload()">Topic 5: How Much, How Fast and How Far?</button>
            <header style="text-align:center;margin-bottom:24px;"><h1>Equilibrium</h1><p>IB Chemistry 5.3 - K<sub>c</sub>, Le Chatelier's principle, ICE tables</p></header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="CHEM_EQUILIBRIUM.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="CHEM_EQUILIBRIUM.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="CHEM_EQUILIBRIUM.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="CHEM_EQUILIBRIUM.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="ceq-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="ceq-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="ceq-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="ceq-accuracy">-</div></div>
            </div>
            <div class="question-card">
                <span class="rule-tag" id="ceq-rule"></span>
                <span class="difficulty-tag" id="ceq-difficulty"></span>
                <div class="question-text" id="ceq-text"></div>
                <div id="ceq-options-area"></div>
            </div>
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>
            <div class="hint-box" id="ceq-hint-box" style="display:none;"></div>
            <div class="feedback" id="ceq-feedback" style="display:none;">
                <div class="feedback-title" id="ceq-feedback-title"></div>
                <div class="feedback-explanation" id="ceq-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="ceq-hint-btn" onclick="CHEM_EQUILIBRIUM.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="ceq-next-btn" onclick="CHEM_EQUILIBRIUM.next()" style="display:none;">Next Question</button>
            </div>
        `;
        this.score = 0; this.total = 0; this.streak = 0; this.level = 'all';
        this.next();
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['equilibrium'] = () => CHEM_EQUILIBRIUM.load();
