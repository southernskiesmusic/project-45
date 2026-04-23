/* ================================================================
   LESSON ENGINE - Unified, reusable framework for guided lessons
   Consolidated from per-subject variants (2026-03-26).
   Includes all defensive guards from physics, chemistry, english,
   and humanities variants.
   ================================================================ */
function _t(key, fb) { return typeof I18N !== 'undefined' ? I18N.t(key, fb) : fb; }
// Polyfill renderMath for subjects that don't load KaTeX/MathJax (e.g. English)
if (typeof renderMath === 'undefined') { function renderMath() {} }

const LessonEngine = {
    lesson: null,
    screenIdx: 0,
    folder: null,
    practiceQ: null,
    practiceAnswered: false,
    practiceCorrect: 0,
    practiceTotal: 0,
    exampleStepIdx: 0,
    _enterBound: false,

    _abbreviate: function(lesson) {
        var MAX = 6;
        if (!lesson.screens || lesson.screens.length <= MAX) return lesson;
        var abbr = Object.assign({}, lesson);
        var kept = [];
        var count = 0;
        for (var i = 0; i < lesson.screens.length; i++) {
            var s = lesson.screens[i];
            if (s.type === 'summary') continue;
            kept.push(s);
            count++;
            if (count >= MAX - 1) break;
        }
        var summary = null;
        for (var j = lesson.screens.length - 1; j >= 0; j--) {
            if (lesson.screens[j].type === 'summary') { summary = Object.assign({}, lesson.screens[j]); break; }
        }
        if (!summary) summary = { type: 'summary', title: 'End of Preview', html: '' };
        summary.html = (summary.html || '') + '<div style="margin-top:16px;padding:16px;border-radius:10px;background:rgba(67,97,238,0.08);text-align:center;"><p style="font-size:0.95rem;font-weight:600;">Want the full lesson?</p><p style="font-size:0.82rem;color:var(--text-light);">Upgrade to Premium for complete lessons with all examples, practice problems, and detailed explanations.</p><button class="btn btn-primary btn-sm" onclick="if(typeof showUpgradeModal===\'function\')showUpgradeModal();" style="margin-top:8px;">Upgrade Now</button></div>';
        kept.push(summary);
        abbr.screens = kept;
        return abbr;
    },

    start(lesson) {
        this.lesson = lesson;
        // Overlay translated screens if available
        if (typeof I18N !== 'undefined' && I18N.lang !== 'en' && I18N.contentScreens[lesson.id]) {
            this.lesson = Object.assign({}, lesson);
            this.lesson.screens = lesson.screens.map(function(screen, i) {
                var t = I18N.contentScreens[lesson.id] && I18N.contentScreens[lesson.id][i];
                if (!t) return screen;  // null = practice screen, keep original
                return Object.assign({}, screen, t);
            });
        }
        if (typeof Premium !== 'undefined' && !Premium.isPremium()) {
            this.lesson = this._abbreviate(this.lesson);
        }
        this.screenIdx = 0;
        this.folder = lesson.folder;
        this.practiceCorrect = 0;
        this.practiceTotal = 0;
        this._streak = 0;
        this.furthestIdx = 0;
        showView('lesson');
        this.renderScreen();
        if (!this._enterBound) {
            this._enterBound = true;
            SwipeNav.bind('#view-lesson', {
                onSwipeLeft: function() {
                    var btn = document.getElementById('lesson-continue-btn');
                    if (btn && btn.style.display !== 'none') LessonEngine.advance();
                },
                onSwipeRight: function() { LessonEngine.back(); },
                excludeSelector: 'input, textarea, math-field, .calc-container, .word-bank'
            });
            document.addEventListener('keydown', e => {
                if (e.key !== 'Enter') return;
                const lessonView = document.getElementById('view-lesson');
                if (!lessonView || !lessonView.classList.contains('active')) return;
                // If a math-field is focused, let its own handler fire
                if (document.activeElement && document.activeElement.tagName === 'MATH-FIELD') return;
                const cont = document.getElementById('lesson-continue-btn');
                if (cont && cont.style.display !== 'none') { e.preventDefault(); cont.click(); return; }
                const reveal = document.getElementById('lesson-reveal-btn');
                if (reveal && reveal.style.display !== 'none') { e.preventDefault(); reveal.click(); return; }
                // Concept/summary: click the primary button in nav
                const navPrimary = document.querySelector('#lesson-nav .btn-primary');
                if (navPrimary) { e.preventDefault(); navPrimary.click(); }
            });
        }
    },

    navButtons(forwardLabel, forwardAction) {
        const backDisabled = this.screenIdx <= 0 ? ' disabled' : '';
        let h = '<div class="lesson-btn-row">' +
            '<button class="btn btn-hint" onclick="LessonEngine.back()"' + backDisabled + '>&larr; ' + _t('back', 'Back') + '</button>';
        if (forwardLabel) {
            h += '<button class="btn btn-primary" id="lesson-continue-btn" onclick="' + forwardAction + '">' + forwardLabel + ' &rarr;</button>';
        }
        h += '</div>';
        return h;
    },

    renderScreen() {
        const screen = this.lesson.screens[this.screenIdx];
        const total = this.lesson.screens.length;

        // Update progress bar
        document.getElementById('lesson-progress-fill').style.width =
            ((this.screenIdx + 1) / total * 100) + '%';

        // Update title
        document.getElementById('lesson-title').textContent =
            _t('lesson.' + this.lesson.id, this.lesson.title);
        document.getElementById('lesson-subtitle').textContent =
            _t('lesson-desc.' + this.lesson.id, this.lesson.subtitle) + '  -  ' + (this.screenIdx + 1) + ' / ' + total;

        const content = document.getElementById('lesson-content');
        const nav = document.getElementById('lesson-nav');

        if (screen.type === 'concept') this.renderConcept(screen, content, nav);
        else if (screen.type === 'example') this.renderExample(screen, content, nav);
        else if (screen.type === 'practice') this.renderPractice(screen, content, nav);
        else if (screen.type === 'simulation') this.renderSimulation(screen, content, nav);
        else if (screen.type === 'summary') this.renderSummary(screen, content, nav);

        renderMath();
        this._ttsRenderButton();
    },

    _imageHtml(screen) {
        if (!screen.image) return '';
        if (screen.image.startsWith('<svg') || screen.image.startsWith('<div')) {
            return '<div class="lesson-image">' + screen.image + '</div>';
        }
        return '<div class="lesson-image"><img src="' + screen.image + '" alt="" loading="lazy"></div>';
    },

    renderConcept(screen, content, nav) {
        content.innerHTML =
            this._imageHtml(screen) + '<h3>' + screen.title + '</h3>' + (screen.content || screen.html);
        nav.innerHTML = this.navButtons(_t('continue', 'Continue'), 'LessonEngine.advance()');
    },

    renderExample(screen, content, nav) {
        this.exampleStepIdx = 0;
        // Wrap problem in \(..\) only if it's plain math (no existing delimiters, no HTML, and author didn't opt out).
        const prob = screen.problem || '';
        const hasDelim = prob.indexOf('\\(') !== -1 || prob.indexOf('$$') !== -1 || prob.trimStart().charAt(0) === '<';
        const problemHtml = (screen.problemMath === false || hasDelim) ? prob : '\\(' + prob + '\\)';
        let h = this._imageHtml(screen) +
            (screen.title ? '<h3>' + screen.title + '</h3>' : '') +
            '<p class="question-prompt" style="font-size:1.15rem;margin-bottom:16px;">' + problemHtml + '</p>';
        screen.steps.forEach((step, i) => {
            h += '<div class="lesson-step" id="lesson-step-' + i + '">' + (typeof step === 'string' ? step : step.text) + '</div>';
        });
        content.innerHTML = h;
        nav.innerHTML = '<div class="lesson-btn-row">' +
            '<button class="btn btn-hint" onclick="LessonEngine.back()"' + (this.screenIdx <= 0 ? ' disabled' : '') + '>&larr; ' + _t('back', 'Back') + '</button>' +
            '<button class="btn btn-primary" id="lesson-reveal-btn" onclick="LessonEngine.revealStep()">' + _t('reveal-step', 'Reveal Next Step') + '</button>' +
            '<button class="btn btn-primary" id="lesson-continue-btn" onclick="LessonEngine.advance()" style="display:none;">' + _t('continue', 'Continue') + ' &rarr;</button>' +
            '</div>';
    },

    revealStep() {
        const screen = this.lesson.screens[this.screenIdx];
        const stepEl = document.getElementById('lesson-step-' + this.exampleStepIdx);
        if (stepEl) {
            stepEl.classList.add('revealed');
            renderMath();
        }
        this.exampleStepIdx++;
        if (!screen.steps || this.exampleStepIdx >= screen.steps.length) {
            document.getElementById('lesson-reveal-btn').style.display = 'none';
            document.getElementById('lesson-continue-btn').style.display = '';
        }
    },

    renderPractice(screen, content, nav) {
        this.practiceAnswered = false;
        this.practiceQ = screen.generate();
        const q = this.practiceQ;

        // Snapshot correct answer at render time for robust MC checking
        if (q.type === 'mc' && q.correctIdx !== undefined) {
            this._mcCorrectText = q.options[q.correctIdx];
            this._mcOptionsSnap = q.options.slice();
        }

        const introText = screen.intro || _t('try-this', 'Try this one:');
        let h = '<h3>' + introText + '</h3>';
        if (q.diagram) h += '<div class="question-diagram">' + q.diagram + '</div>';
        if (q.text) h += '<div class="question-text">' + q.text + '</div>';
        if (q.latex && q.latex.trimStart().charAt(0) === '<') {
            h += '<div class="question-prompt" style="font-size:1.15rem;margin:16px 0;">' + q.latex + '</div>';
        } else if (q.latex && (q.latex.indexOf('\\(') === 0 || q.latex.indexOf('$$') === 0)) {
            h += '<div class="question-prompt" style="font-size:1.15rem;margin:16px 0;">' + q.latex + '</div>';
        } else if (q.latex) {
            h += '<div class="question-prompt" style="font-size:1.15rem;margin:16px 0;">\\(' + q.latex + '\\)</div>';
        }

        if (q.type === 'mc') {
            h += '<div class="options-grid">';
            q.options.forEach((o, i) => {
                // Support both string options and activity-format object options {value, tex, label}
                const text = typeof o === 'string' ? o : (o.label || o.tex || '');
                const hasDelimiters = text.includes('\\(') || text.includes('$$');
                const hasLatex = !hasDelimiters && /\\[a-zA-Z]/.test(text);
                const isPureNumeric = !hasLatex && /^[\d\s\.\+\-\*\/\^=<>(),%]+$/.test(text.trim());
                const display = hasDelimiters ? text : hasLatex ? '\\(' + text + '\\)' : isPureNumeric ? '\\(' + text + '\\)' : text;
                h += '<button class="option-btn" data-i="' + i + '" onclick="LessonEngine.checkMC(this)">' +
                    display + '</button>';
            });
            h += '</div>';
        } else if (q.type === 'order') {
            h += '<div class="order-list" id="lesson-order-list">';
            q.items.forEach(item => {
                h += '<div class="order-item" data-value="' + item + '"><span class="order-grip">\u2630</span><span class="order-label">' + item + '</span></div>';
            });
            h += '</div>';
            h += '<button class="btn btn-primary" onclick="LessonEngine.checkOrder()" style="margin-top:12px;width:100%">' + _t('check', 'Check') + '</button>';
        } else {
            h += '<div class="input-area">' +
                '<math-field class="lr-math-field" id="lesson-mf" placeholder="?"></math-field>' +
                '<button class="btn btn-primary" id="lesson-check-btn" onclick="LessonEngine.checkFree()">' + _t('check', 'Check') + '</button>' +
                '</div>';
        }

        h += '<details class="workout-section"><summary>Working Out</summary>' +
            '<button class="copy-calc-btn" onclick="copyCalcToWorkout(\x27lesson-workout\x27)" style="' +
            (typeof copyCalcToWorkout === 'function' ? '' : 'display:none') + '">' +
            '&#128203; Copy Calculator to Workings</button>' +
            '<div class="workout-content" id="lesson-workout" contenteditable="true"></div></details>';

        h += '<div class="feedback" id="lesson-fb"><div class="feedback-title" id="lesson-fb-title"></div>' +
            '<div class="feedback-explanation" id="lesson-fb-expl"></div></div>';

        content.innerHTML = h;
        nav.innerHTML = '<div class="lesson-btn-row">' +
            '<button class="btn btn-hint" onclick="LessonEngine.back()"' + (this.screenIdx <= 0 ? ' disabled' : '') + '>&larr; Back</button>' +
            '</div>';

        // Set up Enter key on math field after render, and auto-focus so
        // the user doesn't need to click in (MathLive's shadow DOM binds
        // asynchronously, which makes the first click unreliable).
        setTimeout(() => {
            const mf = document.getElementById('lesson-mf');
            if (mf) {
                mf.addEventListener('keydown', e => {
                    if (e.key !== 'Enter') return;
                    e.preventDefault();
                    if (LessonEngine.practiceAnswered) {
                        const cont = document.getElementById('lesson-continue-btn');
                        if (cont) cont.click();
                    } else {
                        LessonEngine.checkFree();
                    }
                });
                try { mf.focus({ preventScroll: true }); } catch(e) {}
            }
            const orderList = document.getElementById('lesson-order-list');
            if (orderList && typeof Sortable !== 'undefined') {
                this._orderSortable = Sortable.create(orderList, {
                    animation: 200,
                    ghostClass: 'order-ghost',
                    chosenClass: 'order-chosen',
                    dragClass: 'order-drag',
                    handle: '.order-item',
                    forceFallback: true,
                    delay: 50,
                    delayOnTouchOnly: true
                });
            }
        }, 200);
    },

    checkMC(btn) {
        if (this.practiceAnswered) return;
        this.practiceAnswered = true;
        this.practiceTotal++;
        const q = this.practiceQ;
        const chosenIdx = parseInt(btn.dataset.i);
        const opts = this._mcOptionsSnap || q.options;
        const chosenOpt = opts[chosenIdx];

        // Determine correctness: handle string options (correctIdx), object options (value:1), or answer comparison
        let correct;
        if (this._mcCorrectText !== null && this._mcCorrectText !== undefined) {
            correct = chosenOpt === this._mcCorrectText;
        } else if (typeof chosenOpt === 'object' && chosenOpt !== null) {
            correct = chosenOpt.value === 1;
        } else {
            correct = q.answer !== undefined ? String(chosenOpt) === String(q.answer) : false;
        }
        if (correct) this.practiceCorrect++;

        // Highlight buttons
        document.querySelectorAll('#lesson-content .option-btn').forEach(b => {
            const bOpt = opts[parseInt(b.dataset.i)];
            let isCorrect;
            if (this._mcCorrectText !== null && this._mcCorrectText !== undefined) {
                isCorrect = bOpt === this._mcCorrectText;
            } else if (typeof bOpt === 'object' && bOpt !== null) {
                isCorrect = bOpt.value === 1;
            } else {
                isCorrect = q.answer !== undefined ? String(bOpt) === String(q.answer) : false;
            }
            if (isCorrect) b.classList.add('correct');
            else if (b === btn) b.classList.add('incorrect');
            b.disabled = true;
        });

        this.showPracticeFeedback(correct, q);
    },

    checkFree() {
        if (this.practiceAnswered) return;
        const mf = document.getElementById('lesson-mf');
        if (!mf) return;
        const raw = mf.value || '';
        if (raw.trim() === '') return;

        const q = this.practiceQ;
        let correct = false;

        // Delegate to EXPR's custom checkers for factorisation types
        if (q.type === 'factor' && typeof EXPR !== 'undefined') {
            correct = EXPR.checkFactorisation(raw, q.factors);
        } else if (q.type === 'factorDiff' && typeof EXPR !== 'undefined') {
            correct = EXPR.checkDiffSquares(raw, q.factorNum);
        } else if (q.type === 'factorCommon' && typeof EXPR !== 'undefined') {
            correct = EXPR.checkCommonFactor(raw, q.commonFactor, q.coeffA, q.coeffB);
        } else {
            const parsed = parseLatex(raw);
            if (parsed !== null && !isNaN(parsed)) {
                correct = (Math.abs(parsed - q.answer) < 0.01);
            } else if (q.answerTex && typeof normalizeExpr === 'function') {
                correct = exprEqual(raw, q.answerTex);
            } else {
                return;
            }
            // Unit validation - if answerTex specifies a unit, require it
            if (correct && q.answerTex) {
                const um = q.answerTex.match(/\\text\{\s*([^}]+?)\s*\}/);
                if (um) {
                    const eu = um[1].trim();
                    const rc = raw.replace(/\\text\{([^}]*)\}/g, '$1')
                                  .replace(/\\mathrm\{([^}]*)\}/g, '$1')
                                  .replace(/\\[a-zA-Z]+/g, ' ')
                                  .replace(/[{}]/g, '').trim();
                    if (rc.toLowerCase().indexOf(eu.toLowerCase()) === -1) {
                        correct = false;
                        this._unitMissing = eu;
                    }
                }
            }
        }

        this.practiceAnswered = true;
        this.practiceTotal++;
        if (correct) this.practiceCorrect++;

        this.showPracticeFeedback(correct, q);
    },

    checkOrder() {
        if (this.practiceAnswered) return;
        this.practiceAnswered = true;
        this.practiceTotal++;
        const q = this.practiceQ;
        const items = document.querySelectorAll('#lesson-order-list .order-item');
        const userOrder = [];
        items.forEach(item => userOrder.push(item.dataset.value));
        const correct = userOrder.every((val, i) => val === q.correctOrder[i]);
        if (correct) this.practiceCorrect++;
        items.forEach((item, i) => {
            item.classList.add(userOrder[i] === q.correctOrder[i] ? 'order-correct' : 'order-incorrect');
            item.style.cursor = 'default';
        });
        if (this._orderSortable) this._orderSortable.option('disabled', true);
        this.showPracticeFeedback(correct, q);
    },

    showPracticeFeedback(correct, q) {
        const fb = document.getElementById('lesson-fb');
        const title = document.getElementById('lesson-fb-title');
        const expl = document.getElementById('lesson-fb-expl');
        fb.classList.add('show', correct ? 'correct' : 'incorrect');
        title.textContent = correct ? _t('correct', 'Correct!') : _t('not-quite', 'Not quite');
        let explHTML = q.explain || '';
        if (!correct && this._unitMissing) {
            explHTML = '<p style="color:var(--error);font-weight:600;">Don\'t forget the unit! The answer should include <strong>' + this._unitMissing + '</strong>.</p>' + explHTML;
            this._unitMissing = null;
        }
        expl.innerHTML = explHTML;

        // Criterion C: evaluate working out (wrapped in try-catch to not block Continue)
        try {
            if (typeof _trainerCritC !== 'undefined') {
                var workEl = document.getElementById('lesson-workout');
                var workText = workEl ? (workEl.innerText || workEl.textContent || '') : '';
                var result = _trainerCritC.evaluate(workText);
                if (result) {
                    expl.insertAdjacentHTML('beforeend', _trainerCritC.renderFeedback(result));
                } else if (workText.trim().length === 0) {
                    expl.insertAdjacentHTML('beforeend',
                        '<div class="tw-crit-c-fb"><div class="tw-crit-c-title">Working Quality ' +
                        '<span class="pg-crit-c-tag">[C]</span> 0/2</div>' +
                        '<div class="pg-mark-row"><span class="pg-mark-icon missed">\u2717</span>' +
                        '<span class="pg-mark-text">No working shown \u2014 always show your method</span></div></div>');
                }
            }
        } catch (e) {}

        // Count towards leaderboard via activityStats
        if (typeof saveActivityStats === 'function') {
            var prefix = 'lesson-' + (this.lesson.id || 'unknown');
            saveActivityStats(prefix, {
                score: this.practiceCorrect, total: this.practiceTotal,
                streak: correct ? (this._streak = (this._streak || 0) + 1) : (this._streak = 0),
                level: 'medium'
            }, correct);
            if (typeof Auth !== 'undefined') Auth.saveAndSync();
        }

        renderMath();
        var _backDis = this.screenIdx <= 0 ? ' disabled' : '';
        document.getElementById('lesson-nav').innerHTML =
            '<div class="lesson-btn-row">' +
            '<button class="btn btn-hint" onclick="LessonEngine.back()"' + _backDis + '>&larr; Back</button>' +
            '<button class="btn btn-hint" onclick="LessonEngine.tryAnother()">' + _t('try-another', 'Try Another') + '</button>' +
            '<button class="btn btn-primary" id="lesson-continue-btn" onclick="LessonEngine.advance()">' + _t('continue', 'Continue') + ' &rarr;</button>' +
            '</div>';
        setTimeout(function() {
            var nav = document.getElementById('lesson-nav');
            if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    },

    tryAnother() {
        var screen = this.lesson.screens[this.screenIdx];
        if (screen && screen.type === 'practice' && screen.generate) {
            this.renderPractice(screen, document.getElementById('lesson-content'), document.getElementById('lesson-nav'));
            renderMath();
        }
    },

    markComplete() {
        try {
            var _lpKey = STORAGE_PREFIX + 'lessonProgress';
            const lp = JSON.parse(localStorage.getItem(_lpKey) || '{}');
            const wasAlreadyDone = lp[this.lesson.id] && lp[this.lesson.id].completed;
            lp[this.lesson.id] = {
                completed: true,
                score: this.practiceCorrect,
                total: this.practiceTotal,
                ts: Date.now()
            };
            localStorage.setItem(_lpKey, JSON.stringify(lp));
            if (!wasAlreadyDone && typeof addGems === 'function') addGems(15, 'lesson-complete');
            if (!wasAlreadyDone && typeof XP !== 'undefined') XP.addXP(XP.RATES.lesson, 'lesson');
            if (typeof Auth !== 'undefined') Auth.saveAndSync();
            if (typeof ACHIEVEMENTS !== 'undefined') ACHIEVEMENTS.check();
            // Analytics
            if (!wasAlreadyDone && typeof P56Analytics !== 'undefined') P56Analytics.track('lesson_completed', { subject: window.SUBJECT_KEY || '', lesson: this.lesson.id });
        } catch (e) {}
    },

    isComplete(lessonId) {
        try {
            const lp = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'lessonProgress') || '{}');
            return lp[lessonId] && lp[lessonId].completed;
        } catch (e) { return false; }
    },

    renderSimulation(screen, content, nav) {
        let h = '<h3>' + screen.title + '</h3>';
        if (screen.description) h += '<p class="lesson-sim-desc">' + screen.description + '</p>';
        h += '<div class="lesson-sim-container">' +
            '<div class="lesson-sim-card">' +
            '<div class="lesson-sim-icon">&#127981;</div>' +
            '<p>This interactive simulation will open in a new tab.</p>' +
            '<a href="' + screen.url + '" target="_blank" rel="noopener" class="btn btn-primary lesson-sim-launch">Open Simulation &#8599;</a>' +
            '</div></div>';
        if (screen.tasks) {
            h += '<div class="lesson-sim-tasks"><strong>' + _t('try-this', 'Try this:') + '</strong><ul>';
            screen.tasks.forEach(function(t) { h += '<li>' + t + '</li>'; });
            h += '</ul></div>';
        }
        content.innerHTML = h;
        nav.innerHTML = this.navButtons(_t('continue', 'Continue'), 'LessonEngine.advance()');
    },

    renderSummary(screen, content, nav) {
        this.markComplete();

        let h = this._imageHtml(screen) + '<h3>' + screen.title + '</h3>';
        if (this.practiceTotal > 0) {
            const scoreLabel = _t('practice-score', 'Practice score:');
            h += '<div class="lesson-score">' + scoreLabel + ' <strong>' +
                this.practiceCorrect + ' / ' + this.practiceTotal + '</strong></div>';
        }
        if (screen.points && Array.isArray(screen.points)) {
            h += '<ul class="lesson-summary-points">' + screen.points.map(function(p) { return '<li>' + p + '</li>'; }).join('') + '</ul>';
        } else {
            h += (screen.content || screen.html || '');
        }
        content.innerHTML = h;

        let navH = '<div class="lesson-btn-row">' +
            '<button class="btn btn-hint" onclick="LessonEngine.back()">&larr; ' + _t('back', 'Back') + '</button>';
        if (screen.nextActivity) {
            navH += '<button class="btn btn-primary" onclick="LessonEngine.goToActivity(\'' +
                screen.nextActivity + '\')">' + _t('start-practising', 'Start Practising') + '</button>';
        }
        navH += '</div>' +
            '<button class="btn btn-hint" style="margin-top:8px;" onclick="showView(\'' + this.folder + '\')">' + _t('back-to-topics', 'Back to Topics') + '</button>';
        // Next lesson in pathway
        if (typeof Pathway !== 'undefined') {
            var nextId = Pathway.nextLessonAfter(this.lesson.id);
            if (nextId) {
                var nextTitle = Pathway._lessonTitle(nextId, Pathway._lessonsMap || {});
                navH += '<div class="lesson-next-card" onclick="Pathway._startLesson(\'' + nextId + '\')">' +
                    '<div class="lesson-next-icon">\u27a1\ufe0f</div>' +
                    '<div class="lesson-next-info">' +
                    '<div class="lesson-next-label">Next lesson</div>' +
                    '<div class="lesson-next-name">' + nextTitle + '</div>' +
                    '</div>' +
                    '<div class="lesson-next-arrow">\u2192</div></div>';
            }
        }
        nav.innerHTML = navH;
    },

    goToActivity(topic) {
        // Trigger the topic card click handler
        const card = document.querySelector('[data-topic="' + topic + '"]');
        if (card) card.click();
    },

    back() {
        this._ttsStop();
        if (this.screenIdx <= 0) return;
        this.screenIdx--;
        this.renderScreen();
        window.scrollTo(0, 0);
    },

    advance() {
        this._ttsStop();
        this.screenIdx++;
        if (this.screenIdx >= this.lesson.screens.length) {
            showView(this.folder);
            return;
        }
        if (this.screenIdx > this.furthestIdx) this.furthestIdx = this.screenIdx;
        this.renderScreen();
        window.scrollTo(0, 0);
    },

    /* ---- Text-to-Speech (TTS) - via Cloud Function ---- */
    _ttsApiKey: null, // no longer used - TTS goes through Cloud Function
    _ttsRate: 1,
    _ttsSpeaking: false,
    _ttsPaused: false,
    _ttsQueue: [],
    _ttsAudio: null,
    _ttsCache: {},

    _latexToSpeech(latex) {
        let s = latex;
        // Strip delimiters
        s = s.replace(/^\\\(|\\\)$/g, '').replace(/^\$\$|\$\$$/g, '').trim();
        // Remove \displaystyle, \left, \right, \, \; \! \quad \qquad
        s = s.replace(/\\displaystyle\b/g, '');
        s = s.replace(/\\(left|right|bigl|bigr)\b/g, '');
        s = s.replace(/\\[,;!]|\\q?quad/g, ' ');
        // \text{...} and \mathrm{...} - keep the content
        s = s.replace(/\\(text|mathrm|mathbf|textbf)\{([^}]*)\}/g, '$2');
        // Fractions: \frac{a}{b} or \dfrac{a}{b}
        for (let i = 0; i < 5; i++) {
            s = s.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, function(_, n, d) {
                // Simple numeric fractions
                if (/^\d+$/.test(n.trim()) && /^\d+$/.test(d.trim())) {
                    var num = parseInt(n), den = parseInt(d);
                    if (num === 1 && den === 2) return 'one half';
                    if (num === 1 && den === 3) return 'one third';
                    if (num === 1 && den === 4) return 'one quarter';
                    return n.trim() + ' over ' + d.trim();
                }
                return n + ' over ' + d;
            });
        }
        // Roots: \sqrt[n]{x} then \sqrt{x}
        s = s.replace(/\\sqrt\[([^\]]+)\]\{([^}]*)\}/g, function(_, n, x) {
            if (n === '3') return 'the cube root of ' + x;
            return 'the ' + n + 'th root of ' + x;
        });
        s = s.replace(/\\sqrt\{([^}]*)\}/g, 'the square root of $1');
        // Superscripts: handle common patterns
        s = s.replace(/\^\{\\circ\}/g, ' degrees');
        s = s.replace(/\^\\circ/g, ' degrees');
        s = s.replace(/\^\{-1\}/g, ' inverse');
        s = s.replace(/\^2(?![0-9])/g, ' squared');
        s = s.replace(/\^3(?![0-9])/g, ' cubed');
        s = s.replace(/\^\{([^}]*)\}/g, ' to the power of $1');
        s = s.replace(/\^([0-9])/g, ' to the power of $1');
        // Subscripts
        s = s.replace(/_\{([^}]*)\}/g, ' sub $1');
        s = s.replace(/_([0-9a-zA-Z])/g, ' sub $1');
        // Greek letters
        var greek = {
            alpha: 'alpha', beta: 'beta', gamma: 'gamma', delta: 'delta',
            epsilon: 'epsilon', zeta: 'zeta', eta: 'eta', theta: 'theta',
            iota: 'iota', kappa: 'kappa', lambda: 'lambda', mu: 'mew',
            nu: 'new', xi: 'ksee', pi: 'pie', rho: 'row',
            sigma: 'sigma', tau: 'tau', upsilon: 'upsilon', phi: 'fie',
            chi: 'kai', psi: 'sigh', omega: 'omega',
            Delta: 'delta', Phi: 'fie', Omega: 'omega', Sigma: 'sigma',
            Pi: 'pie', Gamma: 'gamma', Lambda: 'lambda', Theta: 'theta'
        };
        Object.keys(greek).forEach(function(g) {
            s = s.replace(new RegExp('\\\\' + g + '\\b', 'g'), greek[g]);
        });
        // Trig & log functions
        s = s.replace(/\\sin/g, 'sine');
        s = s.replace(/\\cos/g, 'cosine');
        s = s.replace(/\\tan/g, 'tangent');
        s = s.replace(/\\cot/g, 'cotangent');
        s = s.replace(/\\sec/g, 'secant');
        s = s.replace(/\\csc/g, 'cosecant');
        s = s.replace(/\\arcsin/g, 'arc sine');
        s = s.replace(/\\arccos/g, 'arc cosine');
        s = s.replace(/\\arctan/g, 'arc tangent');
        s = s.replace(/\\ln/g, 'natural log');
        s = s.replace(/\\log/g, 'log');
        s = s.replace(/\\lim/g, 'the limit of');
        s = s.replace(/\\exp/g, 'e to the');
        s = s.replace(/\\min/g, 'minimum');
        s = s.replace(/\\max/g, 'maximum');
        // Operators
        s = s.replace(/\\pm/g, ' plus or minus ');
        s = s.replace(/\\mp/g, ' minus or plus ');
        s = s.replace(/\\times/g, ' times ');
        s = s.replace(/\\cdot/g, ' times ');
        s = s.replace(/\\div/g, ' divided by ');
        // Comparisons
        s = s.replace(/\\leq/g, ' is less than or equal to ');
        s = s.replace(/\\geq/g, ' is greater than or equal to ');
        s = s.replace(/\\neq/g, ' is not equal to ');
        s = s.replace(/\\approx/g, ' is approximately ');
        s = s.replace(/\\equiv/g, ' is equivalent to ');
        s = s.replace(/\\sim/g, ' is similar to ');
        s = s.replace(/\\propto/g, ' is proportional to ');
        // Arrows
        s = s.replace(/\\Rightarrow/g, ', therefore ');
        s = s.replace(/\\rightarrow/g, ' goes to ');
        s = s.replace(/\\to/g, ' goes to ');
        s = s.replace(/\\leftarrow/g, ' from ');
        // Set notation
        s = s.replace(/\\cap/g, ' intersect ');
        s = s.replace(/\\cup/g, ' union ');
        s = s.replace(/\\in/g, ' in ');
        s = s.replace(/\\subset/g, ' is a subset of ');
        // Infinity & misc
        s = s.replace(/\\infty/g, 'infinity');
        s = s.replace(/\\ldots/g, 'and so on');
        s = s.replace(/\\checkmark/g, '');
        s = s.replace(/\\sum/g, 'the sum of');
        s = s.replace(/\\prod/g, 'the product of');
        s = s.replace(/\\int/g, 'the integral of');
        s = s.replace(/\\lfloor/g, 'the floor of');
        s = s.replace(/\\rfloor/g, '');
        // Nuclear notation: ^{A}_{Z}\text{X} - already handled by superscript/subscript/text rules
        // Overline/bar/vec/hat
        s = s.replace(/\\(overline|bar)\{([^}]*)\}/g, '$2 bar');
        s = s.replace(/\\vec\{([^}]*)\}/g, 'vector $1');
        s = s.replace(/\\hat\{([^}]*)\}/g, '$1 hat');
        // Clean up remaining LaTeX commands
        s = s.replace(/\\[a-zA-Z]+/g, ' ');
        // Clean braces, extra spaces
        s = s.replace(/[{}]/g, '');
        s = s.replace(/\s+/g, ' ').trim();
        return s;
    },

    _ttsCleanText(text) {
        // Convert inline LaTeX to speech instead of stripping
        text = text.replace(/\\\((.*?)\\\)/g, (_, latex) => ' ' + this._latexToSpeech(latex) + ' ');
        text = text.replace(/\$\$(.*?)\$\$/g, (_, latex) => ' ' + this._latexToSpeech(latex) + ' ');
        // Clean any remaining stray LaTeX
        text = text.replace(/\\[a-zA-Z]+\{[^}]*\}/g, ' ');
        text = text.replace(/\\[a-zA-Z]+/g, ' ');
        text = text.replace(/[{}]/g, '');
        // Strip em dashes and en dashes (TTS reads them aloud)
        text = text.replace(/-/g, ', ');
        text = text.replace(/–/g, ', ');
        // Expand abbreviations
        text = text.replace(/\bvs\.?\b/gi, 'versus');
        text = text.replace(/\be\.g\.?\b/gi, 'for example');
        text = text.replace(/\bi\.e\.?\b/gi, 'that is');
        // Read = as "equals" when between words/expressions
        text = text.replace(/\s+=\s+/g, ' equals ');
        text = text.replace(/\s+/g, ' ').trim();
        return text;
    },

    _ttsGetText() {
        // Use raw screen HTML (pre-KaTeX) so we get the original \(...\) delimiters
        const screen = this.lesson.screens[this.screenIdx];
        if (!screen) return '';
        var raw = '';
        if (screen.type === 'concept') {
            raw = (screen.title || '') + '. ' + (screen.content || screen.html || '');
        } else if (screen.type === 'example') {
            raw = (screen.title || '') + '. ' + (screen.problem || '');
            if (screen.steps) {
                screen.steps.forEach(function(step, i) {
                    // Only include revealed steps
                    var stepEl = document.getElementById('lesson-step-' + i);
                    if (stepEl && stepEl.classList.contains('revealed')) {
                        raw += ' ' + (typeof step === 'string' ? step : (step.text || ''));
                    }
                });
            }
        } else if (screen.type === 'summary') {
            raw = (screen.title || '') + '. ' + (screen.content || screen.html || '');
        } else if (screen.type === 'simulation') {
            raw = (screen.title || '') + '. ' + (screen.description || '');
        }
        // Strip HTML tags but preserve LaTeX delimiters
        raw = raw.replace(/<br\s*\/?>/gi, '. ');
        raw = raw.replace(/<\/?(strong|b)\b[^>]*>/gi, function(m) {
            return m.charAt(1) === '/' ? '. ' : '';
        });
        raw = raw.replace(/<[^>]+>/g, ' ');
        // Decode HTML entities
        raw = raw.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, function(_, n) { return String.fromCharCode(n); });
        return this._ttsCleanText(raw);
    },

    _ttsGetLang() {
        const lang = (typeof I18N !== 'undefined' && I18N.lang) ? I18N.lang : 'en';
        const langMap = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', ja: 'ja-JP' };
        return langMap[lang] || lang;
    },

    _ttsGetVoice() {
        // Standard voices per language - 4x cheaper, 4M free chars/month
        const lang = this._ttsGetLang();
        const voiceMap = {
            'en-US': 'en-US-Standard-F',
            'es-ES': 'es-ES-Standard-A',
            'fr-FR': 'fr-FR-Standard-C',
            'de-DE': 'de-DE-Standard-C',
            'ja-JP': 'ja-JP-Standard-B'
        };
        return voiceMap[lang] || 'en-US-Standard-F';
    },

    _ttsSplitSentences(text) {
        // Google Cloud TTS supports up to 5000 chars but we chunk for
        // faster first-play and smoother pause/resume
        const raw = text.match(/[^.!?…]+[.!?…]+\s*/g) || [text];
        const chunks = [];
        let buf = '';
        raw.forEach(s => {
            if ((buf + s).length > 400 && buf) { chunks.push(buf.trim()); buf = ''; }
            buf += s;
        });
        if (buf.trim()) chunks.push(buf.trim());
        return chunks;
    },

    async _ttsFetchAudio(text) {
        // Return cached audio if available
        const cacheKey = text + '|' + this._ttsGetLang();
        if (this._ttsCache[cacheKey]) return this._ttsCache[cacheKey];

        // Call Cloud Function instead of raw API (keeps TTS key server-side)
        const ttsFn = firebase.functions().httpsCallable('textToSpeech');
        const result = await ttsFn({
            text: text,
            languageCode: this._ttsGetLang(),
            voiceName: this._ttsGetVoice(),
            speakingRate: this._ttsRate
        });
        const audioSrc = 'data:audio/mp3;base64,' + result.data.audioContent;
        this._ttsCache[cacheKey] = audioSrc;
        return audioSrc;
    },

    async _ttsSpeakChunks(chunks) {
        this._ttsStop();
        this._ttsQueue = chunks.slice();
        if (!this._ttsQueue.length) return;
        this._ttsSpeaking = true;
        this._ttsPaused = false;
        this._ttsUpdateUI();
        this._ttsNextChunk();
    },

    async _ttsNextChunk() {
        if (!this._ttsQueue.length) {
            this._ttsSpeaking = false;
            this._ttsPaused = false;
            this._ttsAudio = null;
            this._ttsUpdateUI();
            return;
        }
        const text = this._ttsQueue.shift();
        try {
            // Create Audio during user gesture chain to satisfy autoplay policy
            if (!this._ttsAudio) {
                this._ttsAudio = new Audio();
                // Play silent to unlock audio context
                this._ttsAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV////////////////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQAAAAAAAAAAaC7OQAAAAAAAAAAAAAAAAAAAP/jOMAAAPoAAAAAAP/GOMAAA+gAAAAAMf/jOMAACPAAAAAAAA==';
                await this._ttsAudio.play().catch(function(){});
            }
            const src = await this._ttsFetchAudio(text);
            // Check if stopped while waiting for fetch
            if (!this._ttsSpeaking) return;
            this._ttsAudio.src = src;
            this._ttsAudio.onended = () => this._ttsNextChunk();
            this._ttsAudio.onerror = () => this._ttsNextChunk();
            this._ttsAudio.play().catch(() => this._ttsNextChunk());
        } catch (e) {
            console.warn('TTS fetch failed:', e);
            this._ttsNextChunk();
        }
    },

    _ttsSpeak() {
        const text = this._ttsGetText();
        if (!text) return;
        this._ttsSpeakChunks(this._ttsSplitSentences(text));
    },

    _ttsPause() {
        if (this._ttsAudio && !this._ttsAudio.paused) {
            this._ttsAudio.pause();
            this._ttsPaused = true;
            this._ttsUpdateUI();
        }
    },

    _ttsResume() {
        if (this._ttsAudio && this._ttsPaused) {
            this._ttsAudio.play();
            this._ttsPaused = false;
            this._ttsUpdateUI();
        }
    },

    _ttsStop() {
        this._ttsQueue = [];
        if (this._ttsAudio) {
            this._ttsAudio.pause();
            this._ttsAudio.src = '';
            this._ttsAudio = null;
        }
        this._ttsSpeaking = false;
        this._ttsPaused = false;
        this._ttsUpdateUI();
    },

    _ttsToggle() {
        if (this._ttsSpeaking && !this._ttsPaused) {
            this._ttsPause();
        } else if (this._ttsPaused) {
            this._ttsResume();
        } else {
            this._ttsSpeak();
        }
    },

    _ttsSetRate(rate) {
        this._ttsRate = rate;
        const label = document.getElementById('tts-speed-label');
        if (label) label.textContent = rate + 'x';
        // Clear cache since rate is baked into the audio
        this._ttsCache = {};
        if (this._ttsSpeaking) this._ttsSpeak();
    },

    _ttsUpdateUI() {
        const btn = document.getElementById('tts-play-btn');
        if (!btn) return;
        if (this._ttsSpeaking && !this._ttsPaused) {
            btn.innerHTML = '&#9208;';
            btn.title = 'Pause';
        } else {
            btn.innerHTML = '&#9654;';
            btn.title = this._ttsPaused ? 'Resume' : 'Listen';
        }
        const stopBtn = document.getElementById('tts-stop-btn');
        if (stopBtn) stopBtn.style.opacity = this._ttsSpeaking ? '1' : '0.4';
    },

    _ttsRenderButton() {
        const content = document.getElementById('lesson-content');
        if (!content) return;
        const screen = this.lesson.screens[this.screenIdx];
        if (screen.type === 'practice') return;
        // TTS requires Student or Pro tier (hide for free users)
        try {
            var _tier = (typeof Premium !== 'undefined' && Premium.getTier) ? Premium.getTier() : 'free';
            if (_tier === 'free') {
                var _role = (typeof Premium !== 'undefined') ? Premium._role : localStorage.getItem('roleCache');
                if (_role !== 'owner' && _role !== 'admin' && _role !== 'Developer') return;
            }
        } catch(e) {}
        const bar = document.createElement('div');
        bar.className = 'tts-bar';
        bar.innerHTML =
            '<button class="tts-btn" id="tts-play-btn" onclick="LessonEngine._ttsToggle()" title="Listen">&#9654;</button>' +
            '<button class="tts-btn" id="tts-stop-btn" onclick="LessonEngine._ttsStop()" title="Stop" style="opacity:0.4">&#9632;</button>' +
            '<button class="tts-btn tts-speed" onclick="LessonEngine._ttsSetRate(LessonEngine._ttsRate>=2?0.75:LessonEngine._ttsRate+0.25)" title="Speed">' +
            '<span id="tts-speed-label">' + this._ttsRate + 'x</span></button>' +
            '<span class="tts-label">' + _t('listen', 'Listen') + '</span>';
        content.insertBefore(bar, content.firstChild);
        setTimeout(() => this._ttsWrapWords(), 50);
    },

    /* ---- Click-to-read-from-word ---- */
    _ttsHoverTimer: null,
    _ttsHoverReady: false,

    _ttsWrapWords() {
        const content = document.getElementById('lesson-content');
        if (!content) return;
        // Walk text nodes - skip TTS bar, math, interactive elements
        const skipTags = new Set(['BUTTON', 'INPUT', 'MATH-FIELD', 'SELECT', 'TEXTAREA', 'SCRIPT', 'STYLE', 'MATH']);
        const skipClasses = ['tts-bar', 'workout-section', 'feedback', 'options-grid', 'input-area',
            'katex', 'MathJax', 'mjx-container', 'question-prompt', 'tts-voice-select'];
        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                let p = node.parentElement;
                while (p && p !== content) {
                    if (skipTags.has(p.tagName)) return NodeFilter.FILTER_REJECT;
                    if (p.classList) {
                        for (let i = 0; i < skipClasses.length; i++) {
                            if (p.classList.contains(skipClasses[i])) return NodeFilter.FILTER_REJECT;
                        }
                    }
                    p = p.parentElement;
                }
                return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(node => {
            const text = node.textContent;
            // Split into words preserving whitespace
            const parts = text.split(/(\s+)/);
            if (parts.length <= 1 && !text.trim()) return;
            const frag = document.createDocumentFragment();
            parts.forEach(part => {
                if (!part) return;
                if (/^\s+$/.test(part)) {
                    frag.appendChild(document.createTextNode(part));
                } else {
                    const span = document.createElement('span');
                    span.className = 'tts-word';
                    span.textContent = part;
                    // Mark if inside bold - used for pause insertion
                    const bp = node.parentElement;
                    if (bp && (bp.tagName === 'STRONG' || bp.tagName === 'B')) span.dataset.bold = '1';
                    span.addEventListener('mouseenter', () => {
                        this._ttsHoverReady = false;
                        clearTimeout(this._ttsHoverTimer);
                        this._ttsHoverTimer = setTimeout(() => {
                            this._ttsHoverReady = true;
                            span.classList.add('tts-word-ready');
                        }, 1000);
                    });
                    span.addEventListener('mouseleave', () => {
                        clearTimeout(this._ttsHoverTimer);
                        this._ttsHoverReady = false;
                        span.classList.remove('tts-word-ready');
                    });
                    span.addEventListener('click', (e) => {
                        if (!this._ttsHoverReady) return;
                        e.stopPropagation();
                        this._ttsSpeakFromWord(span);
                    });
                    frag.appendChild(span);
                }
            });
            node.parentNode.replaceChild(frag, node);
        });
    },

    _ttsSpeakFromWord(wordEl) {
        const allWords = Array.from(document.querySelectorAll('#lesson-content .tts-word'));
        const idx = allWords.indexOf(wordEl);
        if (idx === -1) return;
        const remaining = allWords.slice(idx).map((w, i, arr) => {
            let t = w.textContent;
            if (w.dataset.bold && (!arr[i + 1] || !arr[i + 1].dataset.bold)) t += '. ';
            return t;
        }).join(' ');
        if (!remaining.trim()) return;
        const text = this._ttsCleanText(remaining);
        if (!text) return;
        this._ttsSpeakChunks(this._ttsSplitSentences(text));
    }
};

// Kill speech on page refresh or navigate away
window.addEventListener('beforeunload', () => LessonEngine._ttsStop());
// Also kill on visibility change (tab switch/mute)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) LessonEngine._ttsStop();
});
