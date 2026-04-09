/* ================================================================
   AI Explain - "Explain with AI" button on activity feedback
   + Paper Marking Explain - "Explain Marking" on paper results
   Automatically injects into .feedback and .pg-q-breakdown elements.
   Calls explainAnswer / explainPaperMarking Cloud Functions.
   Tier gating: Pro only (+ admin bypass). Pro = 10/hr rate limit
   ================================================================ */
(function() {
    'use strict';

    var AIExplain = {};
    var _fns = null;

    function getFns() {
        if (!_fns) _fns = firebase.functions();
        return _fns;
    }

    // Get user tier from Premium module
    function getTier() {
        if (typeof Premium !== 'undefined' && Premium.getTier) {
            return Premium.getTier();
        }
        return 'free';
    }

    // Gate: any signed-in user
    function canUseAI() {
        if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) return true;
        return false;
    }

    // Extract visible text from an element, stripping HTML
    function textOf(el) {
        if (!el) return '';
        return (el.innerText || el.textContent || '').trim();
    }

    // Find the question card associated with a feedback element
    function findQuestionContext(fbEl) {
        var id = fbEl.id || '';
        var prefix = id.replace(/-fb$/, '');
        var card = document.getElementById(prefix + '-card');

        // Fallback: look for the nearest .question-card sibling/ancestor
        if (!card) {
            var parent = fbEl.parentElement;
            if (parent) card = parent.querySelector('.question-card');
        }
        if (!card) {
            // Try previous sibling
            var prev = fbEl.previousElementSibling;
            while (prev) {
                if (prev.classList && prev.classList.contains('question-card')) { card = prev; break; }
                var inner = prev.querySelector && prev.querySelector('.question-card');
                if (inner) { card = inner; break; }
                prev = prev.previousElementSibling;
            }
        }

        var questionText = card ? textOf(card) : '';

        // Try to find user answer from selected option or input
        var userAnswer = '';
        var correctAnswer = '';
        var searchRoot = card || fbEl.parentElement;
        if (searchRoot) {
            var selected = searchRoot.querySelector('.option-btn.incorrect') || searchRoot.querySelector('.option-btn.correct');
            if (selected) userAnswer = textOf(selected);
            if (!userAnswer) {
                var inp = searchRoot.querySelector('input[type="text"], input[type="number"]');
                if (inp) userAnswer = inp.value;
            }
            if (!userAnswer) {
                var ta = searchRoot.querySelector('textarea');
                if (ta) userAnswer = ta.value;
            }
            // Get correct answer from the correct button
            var correctBtn = searchRoot.querySelector('.option-btn.correct');
            correctAnswer = correctBtn ? textOf(correctBtn) : '';
        }

        var explText = textOf(fbEl.querySelector('.feedback-explanation'));
        var wasCorrect = fbEl.classList.contains('correct');

        // Last resort: use the feedback title itself as context
        if (!questionText) {
            var fbTitle = fbEl.querySelector('.feedback-title');
            questionText = fbTitle ? textOf(fbTitle) : '';
        }
        // If still empty, grab visible text from the whole practice view
        if (!questionText) {
            var view = fbEl.closest('.view');
            if (view) {
                var prompt = view.querySelector('.q-prompt, .question-prompt, h3, .stem');
                if (prompt) questionText = textOf(prompt);
            }
        }

        return {
            question: questionText.substring(0, 500) || 'question not captured',
            userAnswer: (userAnswer || '').substring(0, 200),
            correctAnswer: (correctAnswer || '').substring(0, 200),
            wasCorrect: wasCorrect,
            explanation: explText.substring(0, 300),
            subject: window.SUBJECT_KEY || 'general'
        };
    }

    // Render a LaTeX string to HTML using KaTeX (if available)
    function renderLatex(latex, displayMode) {
        if (typeof katex !== 'undefined') {
            try { return katex.renderToString(latex, { throwOnError: false, displayMode: !!displayMode }); }
            catch (e) { return '<code>' + latex + '</code>'; }
        }
        return '<code>' + latex + '</code>';
    }

    // Convert basic markdown + LaTeX to HTML
    function mdToHtml(text) {
        // First, protect display math ($$...$$) and inline math ($...$) with placeholders
        var mathBlocks = [];
        // Display math: $$...$$
        text = text.replace(/\$\$([\s\S]+?)\$\$/g, function(_, latex) {
            mathBlocks.push(renderLatex(latex.trim(), true));
            return '%%MATH' + (mathBlocks.length - 1) + '%%';
        });
        // Inline math: $...$
        text = text.replace(/\$(.+?)\$/g, function(_, latex) {
            mathBlocks.push(renderLatex(latex.trim(), false));
            return '%%MATH' + (mathBlocks.length - 1) + '%%';
        });
        // Also handle \( ... \) and \[ ... \] notation
        text = text.replace(/\\\[([\s\S]+?)\\\]/g, function(_, latex) {
            mathBlocks.push(renderLatex(latex.trim(), true));
            return '%%MATH' + (mathBlocks.length - 1) + '%%';
        });
        text = text.replace(/\\\((.+?)\\\)/g, function(_, latex) {
            mathBlocks.push(renderLatex(latex.trim(), false));
            return '%%MATH' + (mathBlocks.length - 1) + '%%';
        });

        // Markdown formatting
        text = text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/^\s*[-\u2022]\s+/gm, '<br>&bull; ')
            .replace(/^\s*(\d+)\.\s+/gm, '<br>$1. ')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');

        // Restore math blocks
        text = text.replace(/%%MATH(\d+)%%/g, function(_, idx) {
            return mathBlocks[parseInt(idx, 10)];
        });

        return text;
    }

    var svgIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h-4V9.5C8.8 8.8 8 7.5 8 6a4 4 0 0 1 4-4z"/><path d="M10 11v2"/><path d="M14 11v2"/><rect x="9" y="13" width="6" height="3" rx="1"/><path d="M12 16v2"/></svg>';

    // Get tier-specific limit message
    function getLimitMsg(tier) {
        if (tier === 'pro') return 'Hourly limit reached (10/hr). Try again soon!';
        return 'Daily limit reached (10/day). Try again tomorrow!';
    }

    // ── ACTIVITY FEEDBACK EXPLAIN ─────────────────────────────────

    function injectButton(fbEl) {
        if (fbEl.querySelector('.ai-explain-btn')) return;

        // TEMP: admin-only while testing
        if (!canUseAI()) return;
        var tier = getTier();

        var btn = document.createElement('button');
        btn.className = 'ai-explain-btn';
        btn.innerHTML = svgIcon + ' Explain with AI';

        var responseDiv = document.createElement('div');
        responseDiv.className = 'ai-explain-response';
        responseDiv.style.display = 'none';

        btn.addEventListener('click', function() {
            if (btn.classList.contains('loading')) return;

            // If already loaded, toggle visibility
            if (responseDiv.dataset.loaded === '1') {
                responseDiv.style.display = responseDiv.style.display === 'none' ? 'block' : 'none';
                return;
            }

            btn.classList.add('loading');
            btn.innerHTML = '<span class="ai-spinner"></span> Thinking...';

            var ctx = findQuestionContext(fbEl);
            var explainFn = getFns().httpsCallable('explainAnswer');

            explainFn(ctx).then(function(result) {
                responseDiv.innerHTML = mdToHtml(result.data.explanation);
                responseDiv.dataset.loaded = '1';
                responseDiv.style.display = 'block';
                btn.classList.remove('loading');
                btn.innerHTML = svgIcon + ' Explain with AI';
            }).catch(function(err) {
                var msg = (err && err.message) || 'Something went wrong';
                if (msg.indexOf('limit reached') !== -1 || msg.indexOf('resource-exhausted') !== -1) {
                    responseDiv.innerHTML = '<span class="ai-explain-limit">' + getLimitMsg(tier) + '</span>';
                } else if (msg.indexOf('permission-denied') !== -1 || msg.indexOf('subscription') !== -1) {
                    responseDiv.innerHTML = '<span class="ai-explain-limit">AI explanations require a Student or Pro subscription.</span>';
                } else {
                    responseDiv.innerHTML = '<span class="ai-explain-error">Could not get explanation. ' + msg + '</span>';
                }
                responseDiv.dataset.loaded = '1';
                responseDiv.style.display = 'block';
                btn.classList.remove('loading');
                btn.innerHTML = svgIcon + ' Explain with AI';
            });
        });

        fbEl.appendChild(btn);
        fbEl.appendChild(responseDiv);
    }

    // Remove AI explain when feedback hides (new question)
    function cleanupButton(fbEl) {
        var btn = fbEl.querySelector('.ai-explain-btn');
        var resp = fbEl.querySelector('.ai-explain-response');
        if (btn) btn.remove();
        if (resp) resp.remove();
    }

    // Watch all feedback elements for show/hide
    function observeFeedback() {
        var feedbacks = document.querySelectorAll('.feedback');
        feedbacks.forEach(function(fb) {
            if (fb.dataset.aiObserved) return;
            fb.dataset.aiObserved = '1';
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(m) {
                    if (m.attributeName === 'class') {
                        if (fb.classList.contains('show')) {
                            injectButton(fb);
                        } else {
                            cleanupButton(fb);
                        }
                    }
                });
            });
            observer.observe(fb, { attributes: true });
        });
    }

    // ── PAPER MARKING EXPLAIN (one per question, reads working out) ──

    function injectPaperExplainButtons() {
        if (!canUseAI()) return;

        var breakdowns = document.querySelectorAll('.pg-q-breakdown');
        breakdowns.forEach(function(details) {
            if (details.querySelector('.ai-paper-explain-btn')) return;

            // One button per question (at the bottom of the details)
            var qDetails = details.querySelector('.pg-q-details');
            if (!qDetails) return;

            var btn = document.createElement('button');
            btn.className = 'ai-explain-btn ai-paper-explain-btn';
            btn.style.marginTop = '10px';
            btn.innerHTML = svgIcon + ' Explain Marking';

            var responseDiv = document.createElement('div');
            responseDiv.className = 'ai-explain-response';
            responseDiv.style.display = 'none';

            btn.addEventListener('click', function() {
                if (btn.classList.contains('loading')) return;
                if (responseDiv.dataset.loaded === '1') {
                    responseDiv.style.display = responseDiv.style.display === 'none' ? 'block' : 'none';
                    return;
                }

                btn.classList.add('loading');
                btn.innerHTML = '<span class="ai-spinner"></span> Analysing...';

                // Extract question title from summary
                var summary = details.querySelector('summary');
                var summaryText = summary ? textOf(summary) : '';
                var questionTitle = summaryText.replace(/\d+\/\d+\s*\(\d+%\)\s*$/, '').trim();

                // Gather ALL parts for this question
                var parts = [];
                var partResults = qDetails.querySelectorAll('.pg-part-result');
                partResults.forEach(function(partEl) {
                    var lbl = partEl.querySelector('.pg-part-lbl');
                    var marks = partEl.querySelector('.pg-part-marks');
                    var labelText = lbl ? textOf(lbl) : '';
                    var marksText = marks ? textOf(marks) : '0/0';

                    // Get student and model answers from sibling divs
                    var studentAnswer = '';
                    var modelAnswer = '';
                    var next = partEl.nextElementSibling;
                    while (next && next.classList.contains('pg-part-model')) {
                        var t = textOf(next);
                        if (t.indexOf('Your answer:') === 0) studentAnswer = t.replace('Your answer:', '').trim();
                        if (t.indexOf('Model answer:') === 0) modelAnswer = t.replace('Model answer:', '').trim();
                        next = next.nextElementSibling;
                    }

                    parts.push({
                        label: labelText.substring(0, 200),
                        marks: marksText,
                        studentAnswer: studentAnswer.substring(0, 500),
                        modelAnswer: modelAnswer.substring(0, 500)
                    });
                });

                // Get working out from the paper generator if available
                var workingOut = '';
                if (typeof PG !== 'undefined' && PG._working) {
                    workingOut = (typeof PG._working === 'string') ? PG._working : '';
                }
                // Also try PaperGen (some subjects use different var names)
                if (!workingOut && typeof PaperGen !== 'undefined' && PaperGen._working) {
                    workingOut = (typeof PaperGen._working === 'string') ? PaperGen._working : '';
                }

                // Overall question score from summary
                var scoreMatch = summaryText.match(/(\d+)\/(\d+)/);
                var qMarks = scoreMatch ? parseInt(scoreMatch[1]) : 0;
                var qTotal = scoreMatch ? parseInt(scoreMatch[2]) : 0;

                var data = {
                    questionTitle: questionTitle.substring(0, 400),
                    parts: parts,
                    workingOut: workingOut.substring(0, 1000),
                    marks: qMarks,
                    totalMarks: qTotal,
                    subject: window.SUBJECT_KEY || 'general'
                };

                var fn = getFns().httpsCallable('explainPaperMarking');
                fn(data).then(function(result) {
                    responseDiv.innerHTML = mdToHtml(result.data.explanation);
                    responseDiv.dataset.loaded = '1';
                    responseDiv.style.display = 'block';
                    btn.classList.remove('loading');
                    btn.innerHTML = svgIcon + ' Explain Marking';
                }).catch(function(err) {
                    var msg = (err && err.message) || 'Something went wrong';
                    if (msg.indexOf('limit reached') !== -1) {
                        responseDiv.innerHTML = '<span class="ai-explain-limit">Daily limit reached (3/day). Try again tomorrow!</span>';
                    } else if (msg.indexOf('Pro feature') !== -1 || msg.indexOf('coming soon') !== -1) {
                        responseDiv.innerHTML = '<span class="ai-explain-limit">Paper marking explanations are a Pro feature.</span>';
                    } else {
                        responseDiv.innerHTML = '<span class="ai-explain-error">Could not get explanation. ' + msg + '</span>';
                    }
                    responseDiv.dataset.loaded = '1';
                    responseDiv.style.display = 'block';
                    btn.classList.remove('loading');
                    btn.innerHTML = svgIcon + ' Explain Marking';
                });
            });

            qDetails.appendChild(btn);
            qDetails.appendChild(responseDiv);
        });
    }

    // ── INITIALIZATION ────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', function() {
        // Activity feedback explains
        observeFeedback();

        // Watch for dynamically added feedback elements
        var bodyObserver = new MutationObserver(function() {
            observeFeedback();
            // Also check if paper results view appeared
            if (document.querySelector('.pg-q-breakdown')) {
                injectPaperExplainButtons();
            }
        });
        bodyObserver.observe(document.body, { childList: true, subtree: true });
    });

    window.AIExplain = AIExplain;
})();
