/* Suitability Test Prep — Completing the Square / Quadratics Practice */
var CTC_ACT = (function() {
    'use strict';
    var score = 0, total = 0, _current = null;

    var questions = [
        // Vertex form identification
        { type: 'mc', text: 'Write \\(x^2 - 6x + 5\\) in the form \\((x-p)^2 + q\\).', answer: '(x-3)^2 - 4', options: ['(x-3)^2 - 4','(x-3)^2 + 5','(x-6)^2 + 5','(x+3)^2 - 4'], hint: 'Half of 6 is 3. \\(x^2-6x+5 = (x-3)^2 - 9 + 5 = (x-3)^2 - 4\\).' },
        { type: 'mc', text: 'Write \\(x^2 + 4x + 1\\) in completed square form.', answer: '(x+2)^2 - 3', options: ['(x+2)^2 - 3','(x+2)^2 + 1','(x+4)^2 - 3','(x+2)^2 - 15'], hint: 'Half of 4 is 2. \\((x+2)^2 - 4 + 1 = (x+2)^2 - 3\\).' },
        { type: 'mc', text: 'The vertex of \\(y = (x-2)^2 + 5\\) is:', answer: '(2, 5)', options: ['(2, 5)','(-2, 5)','(2, -5)','(-2, -5)'], hint: 'In \\(y = (x-h)^2 + k\\), the vertex is \\((h, k)\\).' },
        { type: 'mc', text: 'The axis of symmetry of \\(y = (x+3)^2 - 1\\) is:', answer: 'x = -3', options: ['x = -3','x = 3','x = -1','x = 1'], hint: 'Axis of symmetry is \\(x = h\\). Here \\(f(x) = (x-(-3))^2 - 1\\), so \\(x = -3\\).' },
        { type: 'mc', text: 'Solve \\((x-3)^2 = 16\\) giving exact values.', answer: 'x = 7 or x = -1', options: ['x = 7 or x = -1','x = 7 or x = 1','x = 19 or x = -1','x = 4 or x = -4'], hint: '\\(x - 3 = \\pm 4 \\Rightarrow x = 7\\) or \\(x = -1\\).' },
        { type: 'mc', text: 'Solve \\(x^2 - 4x - 5 = 0\\) by completing the square. What is the positive root?', answer: 'x = 5', options: ['x = 5','x = 4','x = 3','x = 2 + \\sqrt{9}'], hint: '\\((x-2)^2 - 4 - 5 = 0 \\Rightarrow (x-2)^2 = 9 \\Rightarrow x = 5\\) or \\(x = -1\\).' },
        { type: 'mc', text: 'Which is the completed square form of \\(x^2 - 10x + 21\\)?', answer: '(x-5)^2 - 4', options: ['(x-5)^2 - 4','(x-5)^2 + 21','(x-10)^2 - 4','(x-5)^2 + 4'], hint: '\\((x-5)^2 = x^2 - 10x + 25\\), so \\(x^2-10x+21 = (x-5)^2 - 4\\).' },
        { type: 'mc', text: 'The minimum value of \\(y = (x-1)^2 + 3\\) is:', answer: '3', options: ['3','1','0','4'], hint: 'Minimum occurs at vertex \\((1, 3)\\), so minimum value is \\(3\\).' },
        { type: 'mc', text: 'Solve \\(x^2 - 6x + 2 = 0\\) by completing the square. The solutions are:', answer: 'x = 3 \\pm \\sqrt{7}', options: ['x = 3 \\pm \\sqrt{7}','x = 3 \\pm \\sqrt{11}','x = 6 \\pm \\sqrt{7}','x = \\pm\\sqrt{7} - 3'], hint: '\\((x-3)^2 - 9 + 2 = 0 \\Rightarrow (x-3)^2 = 7 \\Rightarrow x = 3 \\pm \\sqrt{7}\\).' },
        { type: 'mc', text: 'A quadratic has vertex \\((-1, 4)\\) and leading coefficient 2. Its equation is:', answer: 'y = 2(x+1)^2 + 4', options: ['y = 2(x+1)^2 + 4','y = 2(x-1)^2 + 4','y = 2(x+1)^2 - 4','y = (x+1)^2 + 4'], hint: 'Vertex form: \\(y = a(x-h)^2 + k\\) with \\((h,k) = (-1,4)\\) and \\(a=2\\).' },
        { type: 'mc', text: 'The graph of \\(f(x) = a(x-h)^2 + k\\) has vertex at \\((3,-5)\\) and passes through \\((0,4)\\). Find \\(a\\).', answer: '1', options: ['1','2','3','\\frac{1}{3}'], hint: 'Sub \\(x=0, y=4\\): \\(4 = a(0-3)^2 - 5 = 9a - 5 \\Rightarrow 9a = 9 \\Rightarrow a = 1\\).' },
        { type: 'mc', text: 'For \\(2x^2 - 8x + 3\\), the completed square form is \\(2(x-2)^2 + k\\). Find \\(k\\).', answer: '-5', options: ['-5','-1','3','5'], hint: '\\(2(x-2)^2 = 2x^2-8x+8\\), so \\(2x^2-8x+3 = 2(x-2)^2 + 3 - 8 = 2(x-2)^2 - 5\\).' }
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
            h += '<button class="q-opt-btn" data-value="' + _esc(o) + '" onclick="CTC_ACT._check(this, \'' + _esc(o) + '\', \'' + _esc(q.answer) + '\', \'' + _esc(q.hint) + '\')">' + o + '</button>';
        });
        h += '</div><div class="q-feedback" id="q-fb"></div>';
        h += '<button class="btn btn-sm" id="q-next-btn" style="display:none;margin-top:12px;" onclick="CTC_ACT._next()">Next &rarr;</button></div>';
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
        el.innerHTML = '<div style="text-align:center;padding:32px;"><h3>Practice Complete!</h3><p style="font-size:1.4rem;font-weight:700;color:var(--primary);">' + score + ' / ' + total + ' (' + pct + '%)</p><button class="btn btn-primary" onclick="CTC_ACT.load()">Restart</button></div>';
    }

    return { load: load, _check: _check, _next: _next };
})();
