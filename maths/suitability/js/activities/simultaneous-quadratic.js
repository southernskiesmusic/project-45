/* Suitability Test Prep — Simultaneous Equations (Quadratic) Practice */
var SIM_QUAD_ACT = (function() {
    'use strict';
    var score = 0, total = 0, _current = null;

    var questions = [
        // Identify the right equation after substitution
        { type: 'mc', text: 'Given \\(y = x + 3\\) and \\(y = x^2\\), which equation results after substitution?', answer: 'x^2 - x - 3 = 0', options: ['x^2 - x - 3 = 0','x^2 + x - 3 = 0','x^2 - x + 3 = 0','x^2 + 3 = 0'], hint: 'Set \\(x^2 = x + 3\\), then rearrange: \\(x^2 - x - 3 = 0\\).' },
        { type: 'mc', text: 'Given \\(y = x + 6\\) and \\(y = x^2\\), after substitution we get:', answer: 'x^2 - x - 6 = 0', options: ['x^2 - x - 6 = 0','x^2 + x - 6 = 0','x^2 - x + 6 = 0','x^2 - 6 = 0'], hint: 'x² = x + 6 → x² − x − 6 = 0.' },
        { type: 'mc', text: 'Solve: \\(y = 2\\) and \\(y = x^2 - 2\\).', answer: 'x = 2 or x = -2', options: ['x = 2 or x = -2','x = 2','x = -2','x = 0 or x = 2'], hint: '\\(x^2 - 2 = 2 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2\\).' },
        { type: 'mc', text: 'Which pair satisfies both \\(y = x + 6\\) and \\(y = x^2\\)?', answer: '(3, 9) and (-2, 4)', options: ['(3, 9) and (-2, 4)','(3, 9) and (2, 4)','(-3, 9) and (2, 4)','(3, 3) and (-2, 4)'], hint: 'x² − x − 6 = 0 → (x−3)(x+2) = 0 → x = 3 or x = −2.' },
        { type: 'mc', text: 'Solve: \\(y = x + 2\\) and \\(y = x^2 - 4\\).', answer: 'x = 3 or x = -2', options: ['x = 3 or x = -2','x = 3 or x = 2','x = -3 or x = 2','x = 1 or x = -2'], hint: 'x² − 4 = x + 2 → x² − x − 6 = 0 → (x−3)(x+2) = 0.' },
        { type: 'mc', text: 'For \\(y = x - 1\\) and \\(y = x^2 - 3x + 1\\), the quadratic equation to solve is:', answer: 'x^2 - 4x + 2 = 0', options: ['x^2 - 4x + 2 = 0','x^2 - 2x + 2 = 0','x^2 - 4x - 2 = 0','x^2 - 2x - 2 = 0'], hint: 'x² − 3x + 1 = x − 1 → x² − 4x + 2 = 0.' },
        { type: 'mc', text: 'How many intersection points can a line and a parabola have?', answer: '0, 1 or 2', options: ['0, 1 or 2','Always 2','Always 1','1 or 2'], hint: 'The discriminant of the resulting quadratic determines the number of solutions.' },
        { type: 'mc', text: 'Solve: \\(y = 0\\) and \\(y = x^2 - 5x + 6\\).', answer: 'x = 2 or x = 3', options: ['x = 2 or x = 3','x = -2 or x = -3','x = 1 or x = 6','x = 5 or x = 1'], hint: 'x² − 5x + 6 = 0 → (x−2)(x−3) = 0.' },
        { type: 'mc', text: 'Solve: \\(x + y = 5\\) and \\(y = x^2 - 1\\). The x-values are:', answer: 'x = -3 or x = 2', options: ['x = -3 or x = 2','x = 3 or x = -2','x = 3 or x = 2','x = -3 or x = -2'], hint: '5 − x = x² − 1 → x² + x − 6 = 0 → (x+3)(x−2) = 0.' },
        { type: 'mc', text: 'For \\(y = 3x\\) and \\(y = x^2 + 2x\\), the solutions are:', answer: '(0, 0) and (1, 3)', options: ['(0, 0) and (1, 3)','(0, 0) and (3, 9)','(1, 3) only','(0, 0) only'], hint: 'x² + 2x = 3x → x² − x = 0 → x(x−1) = 0.' },
        { type: 'mc', text: 'A line \\(y = 4\\) intersects \\(y = (x-2)^2\\). Find the x-values.', answer: 'x = 0 or x = 4', options: ['x = 0 or x = 4','x = -2 or x = 2','x = 4 only','x = \\pm 2'], hint: '(x−2)² = 4 → x−2 = ±2 → x = 4 or x = 0.' },
        { type: 'mc', text: 'The line \\(y = 2x - 1\\) is tangent to a parabola, meaning the resulting quadratic has:', answer: 'Discriminant = 0', options: ['Discriminant = 0','Discriminant > 0','Discriminant < 0','Two distinct real roots'], hint: 'Tangent means exactly one intersection point → one repeated root.' }
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
            h += '<button class="q-opt-btn" data-value="' + _esc(o) + '" onclick="SIM_QUAD_ACT._check(this, \'' + _esc(o) + '\', \'' + _esc(q.answer) + '\', \'' + _esc(q.hint) + '\')">' + o + '</button>';
        });
        h += '</div><div class="q-feedback" id="q-fb"></div>';
        h += '<button class="btn btn-sm" id="q-next-btn" style="display:none;margin-top:12px;" onclick="SIM_QUAD_ACT._next()">Next &rarr;</button></div>';
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
        el.innerHTML = '<div style="text-align:center;padding:32px;"><h3>Practice Complete!</h3><p style="font-size:1.4rem;font-weight:700;color:var(--primary);">' + score + ' / ' + total + ' (' + pct + '%)</p><button class="btn btn-primary" onclick="SIM_QUAD_ACT.load()">Restart</button></div>';
    }

    return { load: load, _check: _check, _next: _next };
})();
