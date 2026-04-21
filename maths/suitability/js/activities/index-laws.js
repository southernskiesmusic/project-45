/* Suitability Test Prep — Index Laws Practice */
var INDEX_LAWS_ACT = (function() {
    'use strict';
    var score = 0, total = 0, _current = null;

    var questions = [
        { type: 'mc', text: 'Simplify \\(x^3 \\times x^5\\).', answer: 'x^8', options: ['x^8','x^{15}','x^2','2x^8'], hint: 'Multiply → add indices: \\(x^{3+5} = x^8\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{x^7}{x^3}\\).', answer: 'x^4', options: ['x^4','x^{10}','x^{\\frac{7}{3}}','x^3'], hint: 'Divide → subtract indices: \\(x^{7-3} = x^4\\).' },
        { type: 'mc', text: 'Simplify \\((x^4)^3\\).', answer: 'x^{12}', options: ['x^{12}','x^7','x^{64}','3x^4'], hint: 'Power of a power → multiply indices: \\(x^{4 \\times 3} = x^{12}\\).' },
        { type: 'mc', text: 'Evaluate \\(2^{-3}\\).', answer: '\\frac{1}{8}', options: ['\\frac{1}{8}','-8','8','\\frac{1}{6}'], hint: '\\(2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}\\).' },
        { type: 'mc', text: 'Evaluate \\(27^{\\frac{1}{3}}\\).', answer: '3', options: ['3','9','\\sqrt{27}','27'], hint: '\\(27^{\\frac{1}{3}} = \\sqrt[3]{27} = 3\\).' },
        { type: 'mc', text: 'Evaluate \\(8^{\\frac{2}{3}}\\).', answer: '4', options: ['4','2','16','\\frac{2}{3}'], hint: '\\(8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4\\).' },
        { type: 'mc', text: 'Simplify \\((2x^2)^3\\).', answer: '8x^6', options: ['8x^6','6x^6','8x^5','2x^6'], hint: '\\(2^3 = 8\\) and \\((x^2)^3 = x^6\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{(3x)^2}{9x}\\).', answer: 'x', options: ['x','3x','9x','\\frac{1}{x}'], hint: '\\(\\frac{9x^2}{9x} = x\\).' },
        { type: 'mc', text: 'Solve \\(2^x = 32\\).', answer: 'x = 5', options: ['x = 5','x = 4','x = 6','x = 16'], hint: '\\(32 = 2^5\\), so \\(x = 5\\).' },
        { type: 'mc', text: 'Solve \\(3^x = \\frac{1}{9}\\).', answer: 'x = -2', options: ['x = -2','x = 2','x = -\\frac{1}{2}','x = \\frac{1}{3}'], hint: '\\(\\frac{1}{9} = 3^{-2}\\), so \\(x = -2\\).' },
        { type: 'mc', text: 'Solve \\(4^x = 8^{x-1}\\). Hint: write in terms of powers of 2.', answer: 'x = 3', options: ['x = 3','x = 2','x = 4','x = 1'], hint: '\\(2^{2x} = 2^{3(x-1)} \\Rightarrow 2x = 3x-3 \\Rightarrow x = 3\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{x^{\\frac{3}{2}}}{x^{\\frac{1}{2}}}\\).', answer: 'x', options: ['x','x^2','x^{\\frac{3}{4}}','x^3'], hint: 'Subtract indices: \\(\\frac{3}{2} - \\frac{1}{2} = 1\\).' },
        { type: 'mc', text: 'Which is equivalent to \\(x^{-\\frac{1}{2}}\\)?', answer: '\\dfrac{1}{\\sqrt{x}}', options: ['\\dfrac{1}{\\sqrt{x}}','-\\sqrt{x}','\\sqrt{-x}','\\dfrac{-1}{\\sqrt{x}}'], hint: '\\(x^{-\\frac{1}{2}} = \\frac{1}{x^{\\frac{1}{2}}} = \\frac{1}{\\sqrt{x}}\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{6x^5 \\cdot 2x^{-2}}{3x^2}\\).', answer: '4x', options: ['4x','4x^5','12x','\\frac{12}{x}'], hint: '\\(\\frac{12x^3}{3x^2} = 4x\\).' },
        { type: 'mc', text: 'Evaluate \\(16^{\\frac{3}{4}}\\).', answer: '8', options: ['8','4','64','12'], hint: '\\(16^{\\frac{3}{4}} = (\\sqrt[4]{16})^3 = 2^3 = 8\\).' }
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
            h += '<button class="q-opt-btn" data-value="' + _esc(o) + '" onclick="INDEX_LAWS_ACT._check(this, \'' + _esc(o) + '\', \'' + _esc(q.answer) + '\', \'' + _esc(q.hint) + '\')">' + o + '</button>';
        });
        h += '</div><div class="q-feedback" id="q-fb"></div>';
        h += '<button class="btn btn-sm" id="q-next-btn" style="display:none;margin-top:12px;" onclick="INDEX_LAWS_ACT._next()">Next &rarr;</button></div>';
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
        el.innerHTML = '<div style="text-align:center;padding:32px;"><h3>Practice Complete!</h3><p style="font-size:1.4rem;font-weight:700;color:var(--primary);">' + score + ' / ' + total + ' (' + pct + '%)</p><button class="btn btn-primary" onclick="INDEX_LAWS_ACT.load()">Restart</button></div>';
    }

    return { load: load, _check: _check, _next: _next };
})();
