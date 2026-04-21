/* ================================================================
   SUITABILITY MOCK TEST — Paper Generator
   40-mark paper covering all 7 suitability topics.
   Model answers shown after each question, AI feedback at end.
   ================================================================ */
var SUIT_TEST = (function() {
    'use strict';

    var _answers = [];
    var _submitted = [];
    var _selfMarks = [];
    var _finished = false;

    var PAPER = [
        {
            id: 'q1',
            title: 'Question 1 — Surds',
            marks: 6,
            topic: 'surds',
            parts: [
                {
                    label: '(a)',
                    marks: 2,
                    text: 'Simplify \\(\\sqrt{48} + \\sqrt{75}\\).',
                    markScheme: 'M1 for simplifying at least one surd correctly (\\(4\\sqrt{3}\\) or \\(5\\sqrt{3}\\)). A1 for \\(9\\sqrt{3}\\).',
                    modelAnswer: '\\(\\sqrt{48} = 4\\sqrt{3}\\) and \\(\\sqrt{75} = 5\\sqrt{3}\\), so \\(\\sqrt{48} + \\sqrt{75} = 9\\sqrt{3}\\).'
                },
                {
                    label: '(b)',
                    marks: 2,
                    text: 'Rationalise the denominator of \\(\\dfrac{10}{\\sqrt{5}}\\).',
                    markScheme: 'M1 for multiplying numerator and denominator by \\(\\sqrt{5}\\). A1 for \\(2\\sqrt{5}\\).',
                    modelAnswer: '\\(\\dfrac{10}{\\sqrt{5}} \\times \\dfrac{\\sqrt{5}}{\\sqrt{5}} = \\dfrac{10\\sqrt{5}}{5} = 2\\sqrt{5}\\).'
                },
                {
                    label: '(c)',
                    marks: 2,
                    text: 'Expand and simplify \\((3 + \\sqrt{2})(3 - \\sqrt{2})\\).',
                    markScheme: 'M1 for using the difference of two squares pattern. A1 for \\(7\\).',
                    modelAnswer: '\\((3 + \\sqrt{2})(3 - \\sqrt{2}) = 3^2 - (\\sqrt{2})^2 = 9 - 2 = 7\\).'
                }
            ]
        },
        {
            id: 'q2',
            title: 'Question 2 — Algebraic Fractions',
            marks: 6,
            topic: 'algebraic-fractions',
            parts: [
                {
                    label: '(a)',
                    marks: 2,
                    text: 'Simplify \\(\\dfrac{x^2 - 4}{x - 2}\\).',
                    markScheme: 'M1 for factorising \\(x^2 - 4 = (x+2)(x-2)\\). A1 for \\(x + 2\\).',
                    modelAnswer: '\\(\\dfrac{(x+2)(x-2)}{x-2} = x + 2\\) (valid for \\(x \\neq 2\\)).'
                },
                {
                    label: '(b)',
                    marks: 4,
                    text: 'Write \\(\\dfrac{3}{x+1} + \\dfrac{2}{x+3}\\) as a single fraction in its simplest form.',
                    markScheme: 'M1 for identifying LCD = \\((x+1)(x+3)\\). M1 for correct numerator expansion. A1 for \\(3x+9+2x+2\\). A1 for \\(\\dfrac{5x+11}{(x+1)(x+3)}\\).',
                    modelAnswer: '\\(\\dfrac{3(x+3) + 2(x+1)}{(x+1)(x+3)} = \\dfrac{3x+9+2x+2}{(x+1)(x+3)} = \\dfrac{5x+11}{(x+1)(x+3)}\\).'
                }
            ]
        },
        {
            id: 'q3',
            title: 'Question 3 — Completing the Square',
            marks: 7,
            topic: 'completing-square',
            parts: [
                {
                    label: '(a)',
                    marks: 3,
                    text: 'Write \\(f(x) = x^2 - 8x + 5\\) in the form \\((x - p)^2 + q\\), stating the values of \\(p\\) and \\(q\\).',
                    markScheme: 'M1 for \\((x-4)^2\\). M1 for subtracting \\(16\\). A1 for \\(p = 4\\) and \\(q = -11\\).',
                    modelAnswer: '\\(x^2 - 8x + 5 = (x-4)^2 - 16 + 5 = (x-4)^2 - 11\\). So \\(p = 4\\) and \\(q = -11\\).'
                },
                {
                    label: '(b)',
                    marks: 1,
                    text: 'Hence write down the coordinates of the vertex of the graph of \\(y = f(x)\\).',
                    markScheme: 'B1 for \\((4, -11)\\).',
                    modelAnswer: 'Vertex: \\((4, -11)\\).'
                },
                {
                    label: '(c)',
                    marks: 1,
                    text: 'Write down the equation of the axis of symmetry.',
                    markScheme: 'B1 for \\(x = 4\\).',
                    modelAnswer: 'Axis of symmetry: \\(x = 4\\).'
                },
                {
                    label: '(d)',
                    marks: 2,
                    text: 'Solve \\(f(x) = 0\\), giving your answers in exact form.',
                    markScheme: 'M1 for \\((x-4)^2 = 11\\) or correct use of the quadratic formula. A1 for \\(x = 4 \\pm \\sqrt{11}\\).',
                    modelAnswer: '\\((x-4)^2 = 11 \\Rightarrow x - 4 = \\pm\\sqrt{11} \\Rightarrow x = 4 + \\sqrt{11}\\) or \\(x = 4 - \\sqrt{11}\\).'
                }
            ]
        },
        {
            id: 'q4',
            title: 'Question 4 — Simultaneous Equations',
            marks: 6,
            topic: 'simultaneous-quadratic',
            parts: [
                {
                    label: '(a)',
                    marks: 2,
                    text: 'Show that solving \\(y = x + 6\\) and \\(y = x^2\\) simultaneously leads to the equation \\(x^2 - x - 6 = 0\\).',
                    markScheme: 'M1 for substituting \\(y = x + 6\\) into \\(y = x^2\\). A1 for correct rearrangement.',
                    modelAnswer: 'Setting equal: \\(x^2 = x + 6\\). Rearranging: \\(x^2 - x - 6 = 0\\). ✓'
                },
                {
                    label: '(b)',
                    marks: 2,
                    text: 'Solve \\(x^2 - x - 6 = 0\\) by factorisation.',
                    markScheme: 'M1 for \\((x-3)(x+2) = 0\\). A1 for \\(x = 3\\) and \\(x = -2\\).',
                    modelAnswer: '\\((x-3)(x+2) = 0 \\Rightarrow x = 3\\) or \\(x = -2\\).'
                },
                {
                    label: '(c)',
                    marks: 2,
                    text: 'Write down the coordinates of both intersection points of \\(y = x + 6\\) and \\(y = x^2\\).',
                    markScheme: 'A1 for \\((3, 9)\\). A1 for \\((-2, 4)\\).',
                    modelAnswer: 'When \\(x = 3\\): \\(y = 9\\). When \\(x = -2\\): \\(y = 4\\). Intersection points: \\((3, 9)\\) and \\((-2, 4)\\).'
                }
            ]
        },
        {
            id: 'q5',
            title: 'Question 5 — Linear Graphs',
            marks: 6,
            topic: 'linear-graphs',
            parts: [
                {
                    label: '(a)',
                    marks: 3,
                    text: 'Find the equation of the line \\(L_1\\) passing through \\(A(2, 5)\\) and \\(B(6, 13)\\). Give your answer in the form \\(y = mx + c\\).',
                    markScheme: 'M1 for gradient \\(= \\frac{13-5}{6-2}\\). A1 for \\(m = 2\\). A1 for \\(y = 2x + 1\\).',
                    modelAnswer: 'Gradient \\(m = \\dfrac{13-5}{6-2} = \\dfrac{8}{4} = 2\\). Using \\(y - 5 = 2(x - 2)\\): \\(y = 2x + 1\\).'
                },
                {
                    label: '(b)',
                    marks: 3,
                    text: 'A line \\(L_2\\) is perpendicular to \\(L_1\\) and passes through \\(B(6, 13)\\). Find the equation of \\(L_2\\).',
                    markScheme: 'B1 for perpendicular gradient \\(-\\frac{1}{2}\\). M1 for using point-slope form. A1 for \\(y = -\\frac{1}{2}x + 16\\).',
                    modelAnswer: 'Perpendicular gradient \\(= -\\frac{1}{2}\\). Using \\(y - 13 = -\\frac{1}{2}(x-6)\\): \\(y = -\\frac{x}{2} + 3 + 13 = -\\frac{x}{2} + 16\\).'
                }
            ]
        },
        {
            id: 'q6',
            title: 'Question 6 — Index Laws',
            marks: 5,
            topic: 'index-laws',
            parts: [
                {
                    label: '(a)',
                    marks: 1,
                    text: 'Evaluate \\(8^{\\frac{2}{3}}\\).',
                    markScheme: 'B1 for \\(4\\).',
                    modelAnswer: '\\(8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4\\).'
                },
                {
                    label: '(b)',
                    marks: 2,
                    text: 'Simplify \\(\\dfrac{(3x^2)^3}{9x^4}\\).',
                    markScheme: 'M1 for expanding the numerator to \\(27x^6\\). A1 for \\(3x^2\\).',
                    modelAnswer: '\\(\\dfrac{27x^6}{9x^4} = 3x^2\\).'
                },
                {
                    label: '(c)',
                    marks: 2,
                    text: 'Solve \\(5^{x+1} = 125\\).',
                    markScheme: 'M1 for writing \\(125 = 5^3\\). A1 for \\(x = 2\\).',
                    modelAnswer: '\\(5^{x+1} = 5^3 \\Rightarrow x + 1 = 3 \\Rightarrow x = 2\\).'
                }
            ]
        },
        {
            id: 'q7',
            title: 'Question 7 — Graph Transformations',
            marks: 4,
            topic: 'graph-transforms',
            parts: [
                {
                    label: '(a)',
                    marks: 1,
                    text: 'Let \\(f(x) = x^2 + 1\\). The graph of \\(y = f(x)\\) is translated by vector \\(\\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix}\\). Write down the equation of the new graph.',
                    markScheme: 'B1 for \\(y = (x-3)^2 + 1\\).',
                    modelAnswer: 'A translation of 3 units to the right replaces \\(x\\) with \\(x-3\\): \\(y = (x-3)^2 + 1\\).'
                },
                {
                    label: '(b)',
                    marks: 1,
                    text: 'The graph of \\(y = f(x)\\) is reflected in the x-axis. Write down the equation of the new graph.',
                    markScheme: 'B1 for \\(y = -x^2 - 1\\).',
                    modelAnswer: 'Reflection in the x-axis: \\(y = -f(x) = -(x^2 + 1) = -x^2 - 1\\).'
                },
                {
                    label: '(c)',
                    marks: 2,
                    text: 'The graph of \\(y = f(x)\\) is transformed to give \\(y = f(2x) + 3\\). Describe the two transformations applied.',
                    markScheme: 'A1 for horizontal compression by factor \\(\\frac{1}{2}\\) (x-coordinates halved). A1 for translation of 3 units upward.',
                    modelAnswer: 'First: horizontal compression by scale factor \\(\\frac{1}{2}\\) (all x-coordinates are halved). Second: translation of 3 units in the positive y-direction (upward).'
                }
            ]
        }
    ];

    // ── Flatten parts for indexing ──
    var _flatParts = [];
    PAPER.forEach(function(q, qi) {
        q.parts.forEach(function(p, pi) {
            _flatParts.push({ q: qi, p: pi, qid: q.id, label: q.title + ' ' + p.label });
        });
    });

    // ── Total marks ──
    var _totalMarks = 0;
    PAPER.forEach(function(q) { _totalMarks += q.marks; });

    function start() {
        _answers = new Array(_flatParts.length).fill('');
        _submitted = new Array(_flatParts.length).fill(false);
        _selfMarks = new Array(_flatParts.length).fill(0);
        _finished = false;
        _render();
    }

    function _render() {
        var el = document.getElementById('mock-test-content');
        if (!el) return;

        var h = '<div class="mock-header">';
        h += '<h2>Suitability Assessment — Mock Test</h2>';
        h += '<p>This paper covers all 7 key topics. Answer each part in the space provided. Click <strong>Submit</strong> to reveal the model answer and mark scheme. After all questions, get AI feedback on your extended answers.</p>';
        h += '<div class="mock-info"><span>Total: <strong>' + _totalMarks + ' marks</strong></span><span>Time allowed: <strong>1 hour 15 minutes</strong></span></div>';
        h += '</div>';

        var flatIdx = 0;
        PAPER.forEach(function(q, qi) {
            h += '<div class="mock-question" id="mq-' + q.id + '">';
            h += '<div class="mock-q-header"><span class="mock-q-title">' + q.title + '</span><span class="mock-q-marks">[' + q.marks + ' marks]</span></div>';
            q.parts.forEach(function(p, pi) {
                var idx = flatIdx;
                h += '<div class="mock-part" id="mp-' + idx + '">';
                h += '<div class="mock-part-header"><span class="mock-part-label">' + p.label + '</span><span class="mock-part-marks">[' + p.marks + ' mark' + (p.marks > 1 ? 's' : '') + ']</span></div>';
                h += '<p class="mock-part-text">' + p.text + '</p>';
                if (!_submitted[idx]) {
                    h += '<textarea class="mock-answer-input" id="ma-' + idx + '" placeholder="Write your answer here..." rows="3">' + (_answers[idx] || '') + '</textarea>';
                    h += '<button class="btn btn-primary btn-sm" onclick="SUIT_TEST._submit(' + idx + ')">Submit answer</button>';
                } else {
                    h += '<div class="mock-answer-box">';
                    h += '<div class="mock-your-answer"><strong>Your answer:</strong><p>' + _escHtml(_answers[idx] || '(no answer)') + '</p></div>';
                    h += '<div class="mock-model-answer"><strong>Model answer:</strong><p>' + p.modelAnswer + '</p></div>';
                    h += '<div class="mock-mark-scheme"><strong>Mark scheme:</strong><p>' + p.markScheme + '</p></div>';
                    h += '<div class="mock-self-mark">';
                    h += '<strong>Self-assess — marks awarded:</strong> ';
                    for (var m = 0; m <= p.marks; m++) {
                        h += '<button class="self-mark-btn' + (_selfMarks[idx] === m ? ' active' : '') + '" onclick="SUIT_TEST._setSelfMark(' + idx + ',' + m + ')">' + m + '</button>';
                    }
                    h += '</div></div>';
                }
                h += '</div>';
                flatIdx++;
            });
            h += '</div>';
        });

        // AI Feedback button
        if (_allSubmitted()) {
            h += '<div style="text-align:center;margin:32px 0;" id="mock-ai-wrapper">';
            h += '<div id="pg-results-content">';
            h += _scoreSummary();
            h += '</div>';
            h += '</div>';
        } else {
            var done = _submitted.filter(Boolean).length;
            h += '<div class="mock-progress">Parts answered: ' + done + ' / ' + _flatParts.length + '</div>';
        }

        el.innerHTML = h;
        if (typeof renderMath === 'function') renderMath();

        if (_allSubmitted() && typeof PaperAIFeedback !== 'undefined') {
            _injectAI();
        }
    }

    function _submit(idx) {
        var ta = document.getElementById('ma-' + idx);
        _answers[idx] = ta ? ta.value : '';
        _submitted[idx] = true;
        _render();
        // Scroll to submitted part
        var mp = document.getElementById('mp-' + idx);
        if (mp) mp.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function _setSelfMark(idx, marks) {
        _selfMarks[idx] = marks;
        // Update button states without full re-render
        var wrap = document.getElementById('mp-' + idx);
        if (!wrap) return;
        var btns = wrap.querySelectorAll('.self-mark-btn');
        btns.forEach(function(b, i) { b.classList.toggle('active', i === marks); });
    }

    function _allSubmitted() {
        return _submitted.every(Boolean);
    }

    function _scoreSummary() {
        var awarded = 0;
        _selfMarks.forEach(function(m) { awarded += (m || 0); });
        var pct = Math.round(awarded / _totalMarks * 100);
        var grade = pct >= 80 ? 'A' : pct >= 65 ? 'B' : pct >= 50 ? 'C' : pct >= 35 ? 'D' : 'E';
        return '<div class="mock-score-summary">' +
            '<h3>Your Score</h3>' +
            '<div class="mock-score-big">' + awarded + ' / ' + _totalMarks + '</div>' +
            '<div class="mock-score-pct">' + pct + '% — Grade ' + grade + '</div>' +
            '<p style="font-size:0.85rem;color:var(--text-light);">Based on your self-assessment. Get AI feedback below for a more detailed analysis.</p>' +
            '</div>';
    }

    function _injectAI() {
        // Build a pseudo-paper-gen object for PaperAIFeedback
        var awarded = 0;
        _selfMarks.forEach(function(m) { awarded += (m || 0); });
        var pct = Math.round(awarded / _totalMarks * 100);
        var grade = pct >= 80 ? 'A' : pct >= 65 ? 'B' : pct >= 50 ? 'C' : pct >= 35 ? 'D' : 'E';

        // Build questions array for AI
        var questions = [];
        PAPER.forEach(function(q, qi) {
            var qData = { title: q.title, topic: q.topic, parts: [] };
            q.parts.forEach(function(p, pi) {
                var flatIdx = _getFlatIdx(qi, pi);
                qData.parts.push({
                    label: p.label,
                    text: p.text,
                    total: p.marks,
                    awarded: _selfMarks[flatIdx] || 0,
                    type: 'extended',
                    studentAnswer: (_answers[flatIdx] || '').substring(0, 800),
                    modelAnswer: p.modelAnswer.substring(0, 400)
                });
            });
            questions.push(qData);
        });

        // Pseudo pg object for PaperAIFeedback._requestFeedback
        var pg = {
            paper: PAPER.map(function(q, qi) { return { title: q.title, topic: q.topic, parts: q.parts }; }),
            flatParts: _flatParts.map(function(fp) { return { part: PAPER[fp.q].parts[fp.p] }; }),
            answers: _answers.slice(),
            marks: _selfMarks.slice(),
            _working: {},
            _flatIdx: function(qi, pi) { return _getFlatIdx(qi, pi); },
            _totalPartMarks: function(p) { return p.marks || 0; },
            _calcGrade: function(pct) { return pct >= 80 ? 'A' : pct >= 65 ? 'B' : pct >= 50 ? 'C' : pct >= 35 ? 'D' : 'E'; },
            renderResults: function() {}
        };

        try { PaperAIFeedback.inject(pg, 'suitability'); } catch(e) {}
        try { pg.renderResults(); } catch(e) {}
    }

    function _getFlatIdx(qi, pi) {
        var idx = 0;
        for (var i = 0; i < qi; i++) idx += PAPER[i].parts.length;
        return idx + pi;
    }

    function _escHtml(s) {
        if (!s) return '';
        return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    return { start: start, _submit: _submit, _setSelfMark: _setSelfMark, PAPER: PAPER, _totalMarks: _totalMarks };
})();
