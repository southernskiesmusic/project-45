/* Suitability Test Prep — Surds Practice Activity */
var SURDS_ACT = (function() {
    'use strict';

    var score = 0, total = 0, _current = null;

    var questions = [
        // ── Simplifying ──
        { type: 'mc', text: 'Simplify \\(\\sqrt{50}\\).', answer: '5\\sqrt{2}', options: ['5\\sqrt{2}','25\\sqrt{2}','2\\sqrt{5}','\\sqrt{50}'], hint: 'Find the largest perfect square factor of 50: \\(50 = 25 \\times 2\\).' },
        { type: 'mc', text: 'Simplify \\(\\sqrt{72}\\).', answer: '6\\sqrt{2}', options: ['6\\sqrt{2}','8\\sqrt{2}','3\\sqrt{8}','4\\sqrt{3}'], hint: '\\(72 = 36 \\times 2\\).' },
        { type: 'mc', text: 'Simplify \\(\\sqrt{27}\\).', answer: '3\\sqrt{3}', options: ['3\\sqrt{3}','9\\sqrt{3}','\\sqrt{27}','3\\sqrt{9}'], hint: '\\(27 = 9 \\times 3\\).' },
        { type: 'mc', text: 'Simplify \\(\\sqrt{98}\\).', answer: '7\\sqrt{2}', options: ['7\\sqrt{2}','14\\sqrt{2}','2\\sqrt{7}','49\\sqrt{2}'], hint: '\\(98 = 49 \\times 2\\).' },
        { type: 'mc', text: 'Which of these is already in simplified surd form?', answer: '5\\sqrt{3}', options: ['5\\sqrt{3}','\\sqrt{45}','\\sqrt{20}','3\\sqrt{9}'], hint: '\\(\\sqrt{45} = 3\\sqrt{5}\\), \\(\\sqrt{20} = 2\\sqrt{5}\\), \\(3\\sqrt{9} = 9\\).' },
        // ── Adding/Subtracting ──
        { type: 'mc', text: 'Simplify \\(3\\sqrt{5} + 7\\sqrt{5}\\).', answer: '10\\sqrt{5}', options: ['10\\sqrt{5}','10\\sqrt{10}','21\\sqrt{5}','\\sqrt{50}'], hint: 'Add the coefficients: \\(3 + 7 = 10\\).' },
        { type: 'mc', text: 'Simplify \\(\\sqrt{12} + \\sqrt{3}\\).', answer: '3\\sqrt{3}', options: ['3\\sqrt{3}','2\\sqrt{3}','\\sqrt{15}','4\\sqrt{3}'], hint: '\\(\\sqrt{12} = 2\\sqrt{3}\\), then \\(2\\sqrt{3} + \\sqrt{3} = 3\\sqrt{3}\\).' },
        { type: 'mc', text: 'Simplify \\(\\sqrt{8} - \\sqrt{2}\\).', answer: '\\sqrt{2}', options: ['\\sqrt{2}','\\sqrt{6}','2\\sqrt{2}','0'], hint: '\\(\\sqrt{8} = 2\\sqrt{2}\\), then \\(2\\sqrt{2} - \\sqrt{2} = \\sqrt{2}\\).' },
        { type: 'mc', text: 'Simplify \\(\\sqrt{75} + \\sqrt{48}\\).', answer: '9\\sqrt{3}', options: ['9\\sqrt{3}','7\\sqrt{3}','11\\sqrt{3}','\\sqrt{123}'], hint: '\\(\\sqrt{75} = 5\\sqrt{3}\\) and \\(\\sqrt{48} = 4\\sqrt{3}\\).' },
        { type: 'mc', text: 'Simplify \\(2\\sqrt{18} - \\sqrt{8}\\).', answer: '4\\sqrt{2}', options: ['4\\sqrt{2}','6\\sqrt{2}','2\\sqrt{10}','\\sqrt{10}'], hint: '\\(2\\sqrt{18} = 6\\sqrt{2}\\), \\(\\sqrt{8} = 2\\sqrt{2}\\).' },
        // ── Rationalising ──
        { type: 'mc', text: 'Rationalise \\(\\dfrac{6}{\\sqrt{3}}\\).', answer: '2\\sqrt{3}', options: ['2\\sqrt{3}','\\dfrac{6}{3}','\\dfrac{6\\sqrt{3}}{3}','3\\sqrt{2}'], hint: 'Multiply top and bottom by \\(\\sqrt{3}\\): \\(\\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}\\).' },
        { type: 'mc', text: 'Rationalise \\(\\dfrac{4}{\\sqrt{2}}\\).', answer: '2\\sqrt{2}', options: ['2\\sqrt{2}','4\\sqrt{2}','\\dfrac{4}{2}','\\sqrt{8}'], hint: '\\(\\frac{4}{\\sqrt{2}} \\times \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{4\\sqrt{2}}{2} = 2\\sqrt{2}\\).' },
        { type: 'mc', text: 'Rationalise \\(\\dfrac{1}{\\sqrt{5}}\\).', answer: '\\dfrac{\\sqrt{5}}{5}', options: ['\\dfrac{\\sqrt{5}}{5}','\\dfrac{1}{5}','\\dfrac{\\sqrt{5}}{25}','\\sqrt{5}'], hint: 'Multiply by \\(\\frac{\\sqrt{5}}{\\sqrt{5}}\\).' },
        // ── Expanding ──
        { type: 'mc', text: 'Expand and simplify \\((2 + \\sqrt{3})(2 - \\sqrt{3})\\).', answer: '1', options: ['1','4-3','4+3','4-\\sqrt{3}'], hint: 'Difference of two squares: \\(4 - 3 = 1\\).' },
        { type: 'mc', text: 'Expand \\(\\sqrt{2}(\\sqrt{2} + 3)\\).', answer: '2 + 3\\sqrt{2}', options: ['2 + 3\\sqrt{2}','2\\sqrt{2} + 3','\\sqrt{4} + 3\\sqrt{2}','5\\sqrt{2}'], hint: '\\(\\sqrt{2}\\cdot\\sqrt{2} = 2\\) and \\(\\sqrt{2}\\cdot 3 = 3\\sqrt{2}\\).' },
        { type: 'mc', text: 'Expand and simplify \\((1 + \\sqrt{5})^2\\).', answer: '6 + 2\\sqrt{5}', options: ['6 + 2\\sqrt{5}','6','1 + 5','1 + 2\\sqrt{5} + 5'], hint: '\\((1+\\sqrt{5})^2 = 1 + 2\\sqrt{5} + 5 = 6 + 2\\sqrt{5}\\).' },
        { type: 'mc', text: 'Which expression equals 7?', answer: '(3+\\sqrt{2})(3-\\sqrt{2})', options: ['(3+\\sqrt{2})(3-\\sqrt{2})','(\\sqrt{7})^2','3^2-2^2','2\\sqrt{7}'], hint: '\\(3^2 - (\\sqrt{2})^2 = 9 - 2 = 7\\).' },
        { type: 'mc', text: 'Simplify \\(\\dfrac{\\sqrt{18}}{\\sqrt{2}}\\).', answer: '3', options: ['3','\\sqrt{9}','9','\\sqrt{3}'], hint: '\\(\\frac{\\sqrt{18}}{\\sqrt{2}} = \\sqrt{\\frac{18}{2}} = \\sqrt{9} = 3\\).' }
    ];

    function _shuffleOpts(q) {
        var opts = q.options.slice();
        for (var i = opts.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = opts[i]; opts[i] = opts[j]; opts[j] = t;
        }
        return opts;
    }

    function load() {
        var deck = questions.slice();
        for (var i = deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = deck[i]; deck[i] = deck[j]; deck[j] = t;
        }
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
        var h = '<div class="activity-question">';
        h += '<div class="q-score">' + score + ' / ' + total + '</div>';
        h += '<p class="q-text">' + q.text + '</p>';
        h += '<div class="q-options">';
        opts.forEach(function(o) {
            h += '<button class="q-opt-btn" data-value="' + _esc(o) + '" onclick="SURDS_ACT._check(this, \'' + _esc(o) + '\', \'' + _esc(q.answer) + '\', \'' + _esc(q.hint) + '\')">' + o + '</button>';
        });
        h += '</div><div class="q-feedback" id="q-fb"></div>';
        h += '<button class="btn btn-sm" id="q-next-btn" style="display:none;margin-top:12px;" onclick="SURDS_ACT._next()">Next &rarr;</button>';
        h += '</div>';
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

    function _next() {
        _current.idx++;
        _renderQuestion();
    }

    function _renderEnd() {
        var el = document.getElementById('activity-content');
        if (!el) return;
        var pct = total > 0 ? Math.round(score / total * 100) : 0;
        el.innerHTML = '<div style="text-align:center;padding:32px;">' +
            '<h3>Practice Complete!</h3>' +
            '<p style="font-size:1.4rem;font-weight:700;color:var(--primary);">' + score + ' / ' + total + ' (' + pct + '%)</p>' +
            '<button class="btn btn-primary" onclick="SURDS_ACT.load()">Restart</button>' +
            '</div>';
    }

    return { load: load, _check: _check, _next: _next };
})();
