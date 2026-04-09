/* ================================================================
   PAPER AI FEEDBACK - Shared "Get AI Feedback" button for all
   subject paper generators. Calls markPaper Cloud Function.
   Include after paper-generator.js in each subject.
   ================================================================ */
var PaperAIFeedback = (function() {
    'use strict';

    var _used = false;

    function inject(paperGen, subjectKey) {
        if (!paperGen || !paperGen.renderResults) return;

        var origRender = paperGen.renderResults.bind(paperGen);
        paperGen.renderResults = function() {
            origRender();
            _used = false;
            _addButton(paperGen, subjectKey);
        };
    }

    function _addButton(pg, subjectKey) {
        var container = document.getElementById('pg-results-content');
        if (!container) return;

        var wrapper = document.createElement('div');
        wrapper.style.cssText = 'text-align:center;margin:24px 0;';
        wrapper.innerHTML =
            '<button class="btn btn-primary" id="pg-ai-feedback-btn" style="padding:14px 32px;font-size:1rem;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:12px;display:inline-flex;align-items:center;gap:8px;">' +
            '<span style="font-size:1.2em;">&#10024;</span> Get AI Feedback</button>' +
            '<p style="font-size:0.78rem;color:var(--text-light);margin-top:8px;">Powered by Claude - analyses your extended responses and communication</p>';

        var resultsDiv = document.createElement('div');
        resultsDiv.id = 'pg-ai-results';

        container.appendChild(wrapper);
        container.appendChild(resultsDiv);

        var btn = document.getElementById('pg-ai-feedback-btn');
        if (btn) {
            btn.addEventListener('click', function() {
                if (_used) return;
                _used = true;
                _requestFeedback(pg, subjectKey, btn, resultsDiv);
            });
        }
    }

    function _requestFeedback(pg, subjectKey, btn, resultsEl) {
        if (typeof firebase === 'undefined' || !firebase.auth || !firebase.auth().currentUser) {
            resultsEl.innerHTML = '<p style="color:var(--error);text-align:center;">Sign in to use AI feedback.</p>';
            _used = false;
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<span class="lb-spinner" style="width:18px;height:18px;display:inline-block;"></span> Analysing your paper...';
        resultsEl.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:20px;">Claude is reading your answers. This may take 10-20 seconds...</p>';

        // Build question data from the paper generator
        var questions = [];
        if (pg.paper && pg.flatParts) {
            pg.paper.forEach(function(ctx, qi) {
                var qData = { title: ctx.title || '', topic: ctx.topic || '', parts: [] };
                (ctx.parts || []).forEach(function(p, pi) {
                    var idx = pg._flatIdx(qi, pi);
                    var partData = {
                        label: p.label || '',
                        command: p.command || '',
                        text: (p.text || '').substring(0, 200),
                        total: pg._totalPartMarks(p),
                        awarded: pg.marks[idx] || 0,
                        type: p.type || 'mc'
                    };
                    if (p.type === 'extended' || p.type === 'free') {
                        partData.studentAnswer = (pg.answers[idx] || '').substring(0, 1000);
                        if (p.modelAnswer) partData.modelAnswer = (p.modelAnswer || '').substring(0, 500);
                    }
                    if (pg._working && pg._working[idx]) {
                        partData.working = (pg._working[idx] || '').substring(0, 500);
                    }
                    qData.parts.push(partData);
                });
                questions.push(qData);
            });
        }

        var totalMarks = 0, awardedMarks = 0;
        var hasAnyAnswer = false;
        for (var i = 0; i < (pg.flatParts || []).length; i++) {
            totalMarks += pg._totalPartMarks(pg.flatParts[i].part);
            awardedMarks += (pg.marks[i] || 0);
            if (pg.answers[i] !== null && pg.answers[i] !== undefined && pg.answers[i] !== '') hasAnyAnswer = true;
        }
        if (!hasAnyAnswer) {
            resultsEl.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:12px;">No answers to analyse - answer some questions first.</p>';
            btn.disabled = false;
            _used = false;
            btn.innerHTML = '<span style="font-size:1.2em;">&#10024;</span> Get AI Feedback';
            return;
        }
        var pct = totalMarks > 0 ? Math.round(awardedMarks / totalMarks * 100) : 0;
        var grade = pg._calcGrade(pct);

        // Call subject-specific function if available, fallback to generic
        var fnNames = {
            physics: 'markPhysicsPaper', chemistry: 'markChemistryPaper', biology: 'markBiologyPaper',
            maths: 'markMathsPaper', history: 'markHistoryPaper', geography: 'markGeographyPaper',
            'integrated-humanities': 'markIHPaper'
        };
        var fnName = fnNames[subjectKey] || 'markPaper';
        var markFn = firebase.functions().httpsCallable(fnName);
        markFn({
            subject: subjectKey,
            questions: questions,
            totalMarks: totalMarks,
            awardedMarks: awardedMarks,
            grade: grade
        }).then(function(result) {
            var fb = result.data.feedback;
            _renderFeedback(fb, resultsEl);
            btn.style.display = 'none';
        }).catch(function(err) {
            console.error('AI feedback error:', err);
            btn.disabled = false;
            _used = false;
            btn.innerHTML = '<span style="font-size:1.2em;">&#10024;</span> Get AI Feedback';
            resultsEl.innerHTML = '<p style="color:var(--error);text-align:center;padding:12px;">' + (err.message||'AI feedback failed. Please try again.').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</p>';
        });
    }

    function _renderFeedback(fb, el) {
        if (!fb) { el.innerHTML = ''; return; }

        var h = '<div style="border:2px solid #8b5cf6;border-radius:16px;padding:24px;margin-top:16px;background:rgba(139,92,246,0.04);">';
        h += '<h3 style="color:#8b5cf6;margin:0 0 16px;font-size:1.1rem;">&#10024; AI Examiner Feedback</h3>';

        // Overall
        if (fb.overall) {
            h += '<div style="padding:12px 16px;background:rgba(139,92,246,0.06);border-radius:10px;margin-bottom:16px;font-size:0.9rem;line-height:1.6;">' + _esc(fb.overall) + '</div>';
        }

        // Adjusted grade
        if (fb.adjustedGrade) {
            h += '<div style="text-align:center;margin-bottom:16px;font-size:1rem;">';
            h += 'AI-assessed grade: <strong style="font-size:1.4rem;color:#8b5cf6;">' + fb.adjustedGrade + '</strong></div>';
        }

        // Criterion feedback
        if (fb.criterionFeedback) {
            h += '<div style="margin-bottom:16px;">';
            h += '<h4 style="font-size:0.9rem;margin:0 0 8px;color:var(--text-light);">Criteria Breakdown</h4>';
            ['A', 'B', 'C', 'D'].forEach(function(c) {
                var cf = fb.criterionFeedback[c];
                if (!cf) return;
                h += '<div style="padding:10px 0;border-bottom:1px solid var(--border,rgba(128,128,128,0.15));">';
                h += '<div style="display:flex;justify-content:space-between;align-items:center;">';
                h += '<strong style="font-size:0.88rem;">Criterion ' + c + '</strong>';
                if (cf.score) h += '<span style="font-weight:700;color:#8b5cf6;">' + cf.score + '</span>';
                h += '</div>';
                if (cf.comment) h += '<div style="font-size:0.82rem;color:var(--text-light);line-height:1.5;margin-top:4px;">' + _esc(cf.comment) + '</div>';
                h += '</div>';
            });
            h += '</div>';
        }

        // Strengths & improvements
        if (fb.strengths) {
            h += '<div style="margin-bottom:12px;"><strong style="color:var(--success,#10b981);font-size:0.88rem;">Strengths:</strong>';
            h += '<div style="font-size:0.85rem;line-height:1.5;margin-top:4px;">' + _esc(fb.strengths) + '</div></div>';
        }
        if (fb.improvements) {
            h += '<div style="margin-bottom:12px;"><strong style="color:#f59e0b;font-size:0.88rem;">Areas for Improvement:</strong>';
            h += '<div style="font-size:0.85rem;line-height:1.5;margin-top:4px;">' + _esc(fb.improvements) + '</div></div>';
        }

        // Per-question feedback
        if (fb.questionFeedback && fb.questionFeedback.length > 0) {
            h += '<h4 style="font-size:0.9rem;margin:16px 0 8px;color:var(--text-light);">Question Notes</h4>';
            fb.questionFeedback.forEach(function(qf) {
                h += '<div style="font-size:0.82rem;padding:6px 0;border-bottom:1px solid var(--border,rgba(128,128,128,0.1));">';
                h += '<strong>Q' + qf.q + ':</strong> ' + _esc(qf.comment);
                h += '</div>';
            });
        }

        h += '</div>';
        el.innerHTML = h;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function _esc(s) {
        if (!s) return '';
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    return { inject: inject };
})();
