/* Suitability Test Prep — Linear Graphs Practice */
var LINEAR_GRAPHS_ACT = (function() {
    'use strict';
    var score = 0, total = 0, _current = null;

    var questions = [
        { type: 'mc', text: 'What is the gradient of the line \\(y = 3x - 7\\)?', answer: '3', options: ['3','-7','7','-3'], hint: 'In \\(y = mx + c\\), the gradient is \\(m = 3\\).' },
        { type: 'mc', text: 'What is the y-intercept of \\(y = -2x + 5\\)?', answer: '5', options: ['5','-2','-5','2'], hint: 'In \\(y = mx + c\\), the y-intercept is \\(c = 5\\).' },
        { type: 'mc', text: 'Find the gradient of the line through \\((1, 2)\\) and \\((3, 8)\\).', answer: '3', options: ['3','2','\\frac{1}{3}','6'], hint: 'Gradient = \\(\\frac{8-2}{3-1} = \\frac{6}{2} = 3\\).' },
        { type: 'mc', text: 'Find the gradient of the line through \\((0, 4)\\) and \\((2, 0)\\).', answer: '-2', options: ['-2','2','\\frac{1}{2}','-\\frac{1}{2}'], hint: 'Gradient = \\(\\frac{0-4}{2-0} = \\frac{-4}{2} = -2\\).' },
        { type: 'mc', text: 'Find the equation of the line with gradient 2 passing through \\((0, 3)\\).', answer: 'y = 2x + 3', options: ['y = 2x + 3','y = 2x - 3','y = 3x + 2','y = 2x'], hint: 'The y-intercept is 3 (point is on the y-axis), so \\(y = 2x + 3\\).' },
        { type: 'mc', text: 'Find the equation of the line with gradient 4 passing through \\((1, 6)\\).', answer: 'y = 4x + 2', options: ['y = 4x + 2','y = 4x - 2','y = 4x + 6','y = 6x + 4'], hint: '\\(y - 6 = 4(x - 1) \\Rightarrow y = 4x + 2\\).' },
        { type: 'mc', text: 'Rearrange \\(3x + y = 9\\) into the form \\(y = mx + c\\). What is the gradient?', answer: '-3', options: ['-3','3','9','-9'], hint: '\\(y = -3x + 9\\), so \\(m = -3\\).' },
        { type: 'mc', text: 'Two lines with gradients \\(m_1 = 2\\) and \\(m_2\\) are perpendicular. Find \\(m_2\\).', answer: '-\\frac{1}{2}', options: ['-\\frac{1}{2}','\\frac{1}{2}','-2','2'], hint: 'Perpendicular gradients satisfy \\(m_1 \\times m_2 = -1\\), so \\(m_2 = -\\frac{1}{2}\\).' },
        { type: 'mc', text: 'Are \\(y = 3x + 1\\) and \\(y = 3x - 4\\) parallel, perpendicular, or neither?', answer: 'Parallel', options: ['Parallel','Perpendicular','Neither','Identical'], hint: 'Both have gradient 3 — parallel lines have equal gradients.' },
        { type: 'mc', text: 'Find the equation of the line perpendicular to \\(y = 2x + 1\\) passing through \\((4, 1)\\).', answer: 'y = -\\frac{1}{2}x + 3', options: ['y = -\\frac{1}{2}x + 3','y = 2x - 7','y = -\\frac{1}{2}x - 1','y = \\frac{1}{2}x + 3'], hint: 'Perpendicular gradient = \\(-\\frac{1}{2}\\). \\(y - 1 = -\\frac{1}{2}(x-4) \\Rightarrow y = -\\frac{x}{2} + 3\\).' },
        { type: 'mc', text: 'At what point do \\(y = x + 2\\) and \\(y = -x + 4\\) intersect?', answer: '(1, 3)', options: ['(1, 3)','(3, 1)','(2, 4)','(0, 2)'], hint: '\\(x + 2 = -x + 4 \\Rightarrow 2x = 2 \\Rightarrow x = 1, y = 3\\).' },
        { type: 'mc', text: 'The line \\(y = 5\\) has gradient:', answer: '0', options: ['0','5','undefined','1'], hint: 'Horizontal lines have gradient 0.' },
        { type: 'mc', text: 'Find the midpoint of \\(A(2, 4)\\) and \\(B(8, 10)\\).', answer: '(5, 7)', options: ['(5, 7)','(3, 3)','(10, 14)','(6, 7)'], hint: 'Midpoint = \\(\\left(\\frac{2+8}{2}, \\frac{4+10}{2}\\right) = (5, 7)\\).' },
        { type: 'mc', text: 'What is the length of the segment from \\((0,0)\\) to \\((3,4)\\)?', answer: '5', options: ['5','7','\\sqrt{7}','25'], hint: '\\(\\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5\\).' },
        { type: 'mc', text: 'Rearrange \\(2y - 4x = 8\\) into the form \\(y = mx + c\\). State the y-intercept.', answer: '4', options: ['4','-4','8','2'], hint: '\\(2y = 4x + 8 \\Rightarrow y = 2x + 4\\). The y-intercept is 4.' }
    ];

    function _shuffleOpts(q) {
        var opts = q.options.slice();
        for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = opts[i]; opts[i] = opts[j]; opts[j] = t; }
        return opts;
    }

    function load() {
        var deck = questions.slice();
        for (var i = deck.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = deck[i]; deck[i] = deck[j]; deck[j] = t; }
        score = 0; total = 0;
        _current = { deck: deck, idx: 0 };
        _renderQuestion();
    }

    function _renderQuestion() {
        var el = document.getElementById('activity-content');
        if (!el) return;
        if (_current.idx >= _current.deck.length) { _renderEnd(); return; }
        var q = _current.deck[_current.idx];
        var opts = _shuffleOpts(q);
        var h = '<div class="activity-question"><div class="q-score">' + score + ' / ' + total + '</div>';
        h += '<p class="q-text">' + q.text + '</p><div class="q-options">';
        opts.forEach(function(o) {
            h += '<button class="q-opt-btn" data-value="' + _esc(o) + '" onclick="LINEAR_GRAPHS_ACT._check(this, \'' + _esc(o) + '\', \'' + _esc(q.answer) + '\', \'' + _esc(q.hint) + '\')">' + o + '</button>';
        });
        h += '</div><div class="q-feedback" id="q-fb"></div>';
        h += '<button class="btn btn-sm" id="q-next-btn" style="display:none;margin-top:12px;" onclick="LINEAR_GRAPHS_ACT._next()">Next &rarr;</button></div>';
        el.innerHTML = h;
        if (typeof renderMath === 'function') renderMath();
    }

    function _esc(s) { return (s || '').replace(/'/g, "\\'"); }

    function _check(btn, chosen, correct, hint) {
        total++;
        var fb = document.getElementById('q-fb');
        var opts = document.querySelectorAll('.q-opt-btn');
        opts.forEach(function(b) { b.disabled = true; });
        if (chosen === correct) { score++; btn.classList.add('correct'); fb.innerHTML = '<span style="color:var(--success,#10b981);">✓ Correct!</span>'; }
        else { btn.classList.add('wrong'); opts.forEach(function(b) { if (b.dataset.value === correct) b.classList.add('correct'); }); fb.innerHTML = '<span style="color:var(--error,#ef4444);">✗ Incorrect.</span> <em>' + hint + '</em>'; }
        var nb = document.getElementById('q-next-btn');
        if (nb) nb.style.display = 'inline-block';
        if (typeof renderMath === 'function') renderMath();
    }

    function _next() { _current.idx++; _renderQuestion(); }

    function _renderEnd() {
        var el = document.getElementById('activity-content');
        if (!el) return;
        var pct = total > 0 ? Math.round(score / total * 100) : 0;
        el.innerHTML = '<div style="text-align:center;padding:32px;"><h3>Practice Complete!</h3><p style="font-size:1.4rem;font-weight:700;color:var(--primary);">' + score + ' / ' + total + ' (' + pct + '%)</p><button class="btn btn-primary" onclick="LINEAR_GRAPHS_ACT.load()">Restart</button></div>';
    }

    return { load: load, _check: _check, _next: _next };
})();
