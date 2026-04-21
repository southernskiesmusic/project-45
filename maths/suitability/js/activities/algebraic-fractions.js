/* Suitability Test Prep — Algebraic Fractions Practice */
var ALG_FRAC_ACT = (function() {
    'use strict';
    var score = 0, total = 0, _current = null;

    var questions = [
        // ── Simplifying ──
        { type: 'mc', text: 'Simplify \\(\\dfrac{x^2 - 9}{x + 3}\\).', answer: 'x - 3', options: ['x - 3','x + 3','x - 9','\\dfrac{x^2-9}{x+3}'], hint: 'Factorise: \\((x+3)(x-3)\\), then cancel \\((x+3)\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{2x^2 + 4x}{2x}\\).', answer: 'x + 2', options: ['x + 2','2x + 4','x + 4','2x + 2'], hint: 'Factorise numerator: \\(2x(x+2)\\), then cancel \\(2x\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{x^2 - 1}{x - 1}\\).', answer: 'x + 1', options: ['x + 1','x - 1','x^2','1'], hint: '\\(x^2 - 1 = (x+1)(x-1)\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{3x + 6}{x + 2}\\).', answer: '3', options: ['3','x + 2','3x','\\dfrac{3}{x}'], hint: 'Factorise numerator: \\(3(x+2)\\), then cancel \\((x+2)\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{x^2 - 4x}{x}\\) for \\(x \\neq 0\\).', answer: 'x - 4', options: ['x - 4','x^2 - 4','x + 4','- 4'], hint: 'Factor out \\(x\\) from the numerator.' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{x^2 + 5x + 6}{x + 2}\\).', answer: 'x + 3', options: ['x + 3','x + 2','x + 6','x + 1'], hint: 'Factorise: \\((x+2)(x+3)\\), then cancel.' },
        // ── Adding/Subtracting ──
        { type: 'mc', text: 'Write as a single fraction: \\(\\dfrac{1}{x} + \\dfrac{1}{x+1}\\).', answer: '\\dfrac{2x+1}{x(x+1)}', options: ['\\dfrac{2x+1}{x(x+1)}','\\dfrac{2}{x(x+1)}','\\dfrac{2x+1}{2x+1}','\\dfrac{1}{x^2+x}'], hint: 'LCD = \\(x(x+1)\\).' },
        { type: 'mc', text: 'Write as a single fraction: \\(\\dfrac{2}{x} + \\dfrac{3}{x^2}\\).', answer: '\\dfrac{2x+3}{x^2}', options: ['\\dfrac{2x+3}{x^2}','\\dfrac{5}{x^3}','\\dfrac{5}{2x}','\\dfrac{6}{x^2}'], hint: 'LCD = \\(x^2\\).' },
        { type: 'mc', text: 'Write as a single fraction: \\(\\dfrac{1}{x+1} + \\dfrac{1}{x-1}\\).', answer: '\\dfrac{2x}{x^2-1}', options: ['\\dfrac{2x}{x^2-1}','\\dfrac{2}{x^2-1}','\\dfrac{2}{2x}','\\dfrac{x-1+x+1}{(x+1)(x-1)}'], hint: 'LCD = \\((x+1)(x-1)\\). Numerator: \\((x-1)+(x+1) = 2x\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{3}{x+2} - \\dfrac{1}{x+2}\\).', answer: '\\dfrac{2}{x+2}', options: ['\\dfrac{2}{x+2}','\\dfrac{2}{(x+2)^2}','\\dfrac{2}{2x+4}','\\dfrac{4}{x+2}'], hint: 'Same denominator — just subtract numerators.' },
        { type: 'mc', text: 'Write as a single fraction: \\(\\dfrac{2}{x+3} - \\dfrac{1}{x}\\).', answer: '\\dfrac{x-3}{x(x+3)}', options: ['\\dfrac{x-3}{x(x+3)}','\\dfrac{1}{x(x+3)}','\\dfrac{x+3-2x}{x(x+3)}','\\dfrac{2x-(x+3)}{x(x+3)}'], hint: 'LCD = \\(x(x+3)\\). Numerator: \\(2x - (x+3) = x - 3\\).' },
        // ── Multiplying/Dividing ──
        { type: 'mc', text: 'Simplify \\(\\dfrac{x}{3} \\times \\dfrac{6}{x^2}\\).', answer: '\\dfrac{2}{x}', options: ['\\dfrac{2}{x}','\\dfrac{6x}{3x^2}','\\dfrac{2x}{3}','\\dfrac{6}{3x}'], hint: 'Multiply and simplify: \\(\\frac{6x}{3x^2} = \\frac{2}{x}\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{x+1}{4} \\div \\dfrac{x+1}{8}\\).', answer: '2', options: ['2','\\dfrac{1}{2}','\\dfrac{(x+1)^2}{32}','\\dfrac{8}{4}'], hint: 'Flip and multiply: \\(\\frac{x+1}{4} \\times \\frac{8}{x+1} = \\frac{8}{4} = 2\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{x^2 - 4}{x+2} \\times \\dfrac{1}{x-2}\\).', answer: '1', options: ['1','x-2','x+2','\\dfrac{x^2-4}{x^2-4}'], hint: '\\(\\frac{(x+2)(x-2)}{x+2} \\times \\frac{1}{x-2} = 1\\).' }
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
            h += '<button class="q-opt-btn" data-value="' + _esc(o) + '" onclick="ALG_FRAC_ACT._check(this, \'' + _esc(o) + '\', \'' + _esc(q.answer) + '\', \'' + _esc(q.hint) + '\')">' + o + '</button>';
        });
        h += '</div><div class="q-feedback" id="q-fb"></div>';
        h += '<button class="btn btn-sm" id="q-next-btn" style="display:none;margin-top:12px;" onclick="ALG_FRAC_ACT._next()">Next &rarr;</button></div>';
        el.innerHTML = h;
        if (typeof renderMath === 'function') renderMath();
    }

    function _esc(s) { return (s || '').replace(/'/g, "\\'"); }

    function _check(btn, chosen, correct, hint) {
        total++;
        var fb = document.getElementById('q-fb');
        var opts = document.querySelectorAll('.q-opt-btn');
        opts.forEach(function(b) { b.disabled = true; });
        if (chosen === correct) {
            score++;
            btn.classList.add('correct');
            fb.innerHTML = '<span style="color:var(--success,#10b981);">✓ Correct!</span>';
        } else {
            btn.classList.add('wrong');
            opts.forEach(function(b) { if (b.dataset.value === correct) b.classList.add('correct'); });
            fb.innerHTML = '<span style="color:var(--error,#ef4444);">✗ Incorrect.</span> <em>' + hint + '</em>';
        }
        var nb = document.getElementById('q-next-btn');
        if (nb) nb.style.display = 'inline-block';
        if (typeof renderMath === 'function') renderMath();
    }

    function _next() { _current.idx++; _renderQuestion(); }

    function _renderEnd() {
        var el = document.getElementById('activity-content');
        if (!el) return;
        var pct = total > 0 ? Math.round(score / total * 100) : 0;
        el.innerHTML = '<div style="text-align:center;padding:32px;"><h3>Practice Complete!</h3><p style="font-size:1.4rem;font-weight:700;color:var(--primary);">' + score + ' / ' + total + ' (' + pct + '%)</p><button class="btn btn-primary" onclick="ALG_FRAC_ACT.load()">Restart</button></div>';
    }

    return { load: load, _check: _check, _next: _next };
})();
