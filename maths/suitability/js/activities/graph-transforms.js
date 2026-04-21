/* Suitability Test Prep — Graph Transformations Practice */
var GRAPH_TRANSFORMS_ACT = (function() {
    'use strict';
    var score = 0, total = 0, _current = null;

    var questions = [
        { type: 'mc', text: 'The graph of \\(y = f(x)\\) is transformed to \\(y = f(x) + 3\\). This is a:', answer: 'Translation 3 units up', options: ['Translation 3 units up','Translation 3 units down','Translation 3 units right','Vertical stretch by factor 3'], hint: '\\(f(x) + k\\) shifts the graph up by \\(k\\) units.' },
        { type: 'mc', text: 'The graph of \\(y = f(x)\\) is transformed to \\(y = f(x) - 5\\). This is a:', answer: 'Translation 5 units down', options: ['Translation 5 units down','Translation 5 units up','Translation 5 units left','Vertical compression'], hint: '\\(f(x) - k\\) shifts the graph down by \\(k\\) units.' },
        { type: 'mc', text: 'The graph of \\(y = f(x)\\) is transformed to \\(y = f(x + 2)\\). This is a:', answer: 'Translation 2 units to the left', options: ['Translation 2 units to the left','Translation 2 units to the right','Translation 2 units up','Translation 2 units down'], hint: '\\(f(x + a)\\) shifts the graph <em>left</em> by \\(a\\) units (opposite to sign).' },
        { type: 'mc', text: 'The graph of \\(y = f(x)\\) is transformed to \\(y = f(x - 4)\\). This is a:', answer: 'Translation 4 units to the right', options: ['Translation 4 units to the right','Translation 4 units to the left','Vertical stretch by 4','Horizontal stretch by 4'], hint: '\\(f(x - a)\\) shifts the graph <em>right</em> by \\(a\\) units.' },
        { type: 'mc', text: 'The graph of \\(y = f(x)\\) is transformed to \\(y = 3f(x)\\). This is a:', answer: 'Vertical stretch by factor 3', options: ['Vertical stretch by factor 3','Horizontal stretch by factor 3','Vertical compression by \\(\\frac{1}{3}\\)','Reflection in x-axis'], hint: '\\(af(x)\\) with \\(a > 1\\) stretches vertically by factor \\(a\\).' },
        { type: 'mc', text: 'The graph of \\(y = f(x)\\) is transformed to \\(y = -f(x)\\). This is a:', answer: 'Reflection in the x-axis', options: ['Reflection in the x-axis','Reflection in the y-axis','Vertical stretch by -1','Translation down by 1'], hint: 'Multiplying by \\(-1\\) flips the graph over the x-axis.' },
        { type: 'mc', text: 'The graph of \\(y = f(x)\\) is transformed to \\(y = f(-x)\\). This is a:', answer: 'Reflection in the y-axis', options: ['Reflection in the y-axis','Reflection in the x-axis','Horizontal stretch by -1','Translation left by 1'], hint: 'Replacing \\(x\\) with \\(-x\\) reflects in the y-axis.' },
        { type: 'mc', text: 'The graph of \\(y = x^2\\) has vertex at \\((0,0)\\). After applying \\(y = (x-3)^2 + 2\\), the vertex is:', answer: '(3, 2)', options: ['(3, 2)','(-3, 2)','(3, -2)','(-3, -2)'], hint: 'Vertex of \\((x-h)^2 + k\\) is \\((h, k)\\). Here \\(h=3, k=2\\).' },
        { type: 'mc', text: 'If \\(f(x) = x^2\\), what is \\(2f(x-1) + 3\\)?', answer: '2(x-1)^2 + 3', options: ['2(x-1)^2 + 3','2x^2 - 1 + 3','2(x+1)^2 + 3','(2x-2)^2 + 3'], hint: 'Replace \\(x\\) with \\(x-1\\) in \\(f\\), multiply by 2, add 3.' },
        { type: 'mc', text: 'The transformation \\(y = f(2x)\\) is a:', answer: 'Horizontal compression by factor \\(\\frac{1}{2}\\)', options: ['Horizontal compression by factor \\(\\frac{1}{2}\\)','Horizontal stretch by factor 2','Vertical stretch by factor 2','Vertical compression by factor \\(\\frac{1}{2}\\)'], hint: 'Replacing \\(x\\) with \\(2x\\) halves all x-coordinates — horizontal compression.' },
        { type: 'mc', text: 'A point \\((2, 5)\\) is on \\(y = f(x)\\). After \\(y = f(x) + 3\\), where does this point map to?', answer: '(2, 8)', options: ['(2, 8)','(5, 5)','(2, 2)','(-1, 5)'], hint: 'Only the y-coordinate changes: \\(5 + 3 = 8\\). New point: \\((2, 8)\\).' },
        { type: 'mc', text: 'A point \\((4, 7)\\) is on \\(y = f(x)\\). After \\(y = f(x-2)\\), where does it map to?', answer: '(6, 7)', options: ['(6, 7)','(2, 7)','(4, 5)','(4, 9)'], hint: 'Translating right by 2 adds 2 to each x-coordinate.' },
        { type: 'mc', text: 'The graph of \\(y = \\sin x\\) is shifted 3 units up. The new equation is:', answer: 'y = \\sin x + 3', options: ['y = \\sin x + 3','y = \\sin(x + 3)','y = 3\\sin x','y = \\sin(3x)'], hint: 'Shifting up adds a constant to the whole function.' }
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
            h += '<button class="q-opt-btn" data-value="' + _esc(o) + '" onclick="GRAPH_TRANSFORMS_ACT._check(this, \'' + _esc(o) + '\', \'' + _esc(q.answer) + '\', \'' + _esc(q.hint) + '\')">' + o + '</button>';
        });
        h += '</div><div class="q-feedback" id="q-fb"></div>';
        h += '<button class="btn btn-sm" id="q-next-btn" style="display:none;margin-top:12px;" onclick="GRAPH_TRANSFORMS_ACT._next()">Next &rarr;</button></div>';
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
        el.innerHTML = '<div style="text-align:center;padding:32px;"><h3>Practice Complete!</h3><p style="font-size:1.4rem;font-weight:700;color:var(--primary);">' + score + ' / ' + total + ' (' + pct + '%)</p><button class="btn btn-primary" onclick="GRAPH_TRANSFORMS_ACT.load()">Restart</button></div>';
    }

    return { load: load, _check: _check, _next: _next };
})();
