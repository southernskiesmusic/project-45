const BINOMIAL = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    hintIdx: 0,
    level: 'all',

    /* ═══════════════════════════════════════════════
       EASY GENERATORS
       ═══════════════════════════════════════════════ */

    // 1. Evaluate nCr directly
    qEvaluateNCR() {
        const n = MathUtils.randInt(4, 12);
        const r = MathUtils.randInt(1, Math.min(n - 1, 6));
        const ans = MathUtils.nCr(n, r);
        return {
            type: 'free',
            rule: 'Binomial Coefficient',
            difficulty: 'easy',
            text: 'Evaluate the binomial coefficient:',
            latex: '\\binom{' + n + '}{' + r + '}',
            answer: ans,
            answerTex: '\\binom{' + n + '}{' + r + '} = ' + ans,
            options: [],
            hintTex: [
                'Use the formula \\(\\binom{n}{r} = \\dfrac{n!}{r!\\,(n-r)!}\\).',
                '\\binom{' + n + '}{' + r + '} = \\dfrac{' + n + '!}{' + r + '!\\,' + (n - r) + '!} = ' + ans
            ],
            explain: '\\(\\binom{' + n + '}{' + r + '} = \\dfrac{' + n + '!}{' + r + '!\\,' + (n - r) + '!} = ' + ans + '\\).'
        };
    },

    // 2. Expand (1+x)^n for small n (MC)
    qExpandSmall() {
        const n = MathUtils.randInt(3, 5);
        // Build correct expansion of (1+x)^n
        var terms = [];
        for (var k = 0; k <= n; k++) {
            var c = MathUtils.nCr(n, k);
            if (k === 0) terms.push(String(c));
            else if (k === 1) terms.push(c + 'x');
            else terms.push(c + 'x^{' + k + '}');
        }
        var correct = terms.join(' + ');

        // Generate plausible wrong expansions
        function wrongExpansion() {
            var wTerms = [];
            for (var k = 0; k <= n; k++) {
                var c = MathUtils.nCr(n, k);
                // Introduce one random error
                var errType = MathUtils.randInt(0, 3);
                if (k > 0 && k < n) {
                    if (errType === 0) c = c + MathUtils.pick([-1, 1, 2, -2]);
                    else if (errType === 1) c = MathUtils.nCr(n + 1, k);
                    else if (errType === 2) c = MathUtils.nCr(n - 1, k);
                }
                if (k === 0) wTerms.push(String(c));
                else if (k === 1) wTerms.push(c + 'x');
                else wTerms.push(c + 'x^{' + k + '}');
            }
            var w = wTerms.join(' + ');
            return w === correct ? null : w;
        }

        var opts = [correct];
        var attempts = 0;
        while (opts.length < 4 && attempts < 50) {
            var w = wrongExpansion();
            if (w && opts.indexOf(w) === -1) opts.push(w);
            attempts++;
        }
        // Fallback distractors if needed
        while (opts.length < 4) {
            var fallback = terms.slice();
            var idx = MathUtils.randInt(1, n - 1);
            var origC = MathUtils.nCr(n, idx);
            fallback[idx] = (origC + opts.length) + (idx === 1 ? 'x' : 'x^{' + idx + '}');
            var fb = fallback.join(' + ');
            if (opts.indexOf(fb) === -1) opts.push(fb);
        }

        opts = MathUtils.shuffle(opts);
        var correctIdx = opts.indexOf(correct);

        return {
            type: 'mc',
            rule: 'Binomial Expansion',
            difficulty: 'easy',
            text: 'Which is the correct expansion of \\((1 + x)^{' + n + '}\\)?',
            latex: '',
            answer: correct,
            answerTex: '(1+x)^{' + n + '} = ' + correct,
            options: opts.map(function(o) { return '\\(' + o + '\\)'; }),
            correctIdx: correctIdx,
            hintTex: [
                'Use the binomial theorem: \\((1 + x)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k\\).',
                'The coefficients come from row ' + n + ' of Pascal\'s triangle.'
            ],
            explain: 'By the binomial theorem, \\((1 + x)^{' + n + '} = ' + correct + '\\).<br>' +
                'The coefficients are from row ' + n + ' of Pascal\'s triangle.'
        };
    },

    /* ═══════════════════════════════════════════════
       MEDIUM GENERATORS
       ═══════════════════════════════════════════════ */

    // 3. Find coefficient of x^k in (a + bx)^n
    qFindCoefficient() {
        var n = MathUtils.randInt(5, 9);
        var a = MathUtils.randInt(1, 3);
        var b = MathUtils.nonZeroRandInt(1, 4);
        var k = MathUtils.randInt(2, Math.min(n - 1, 5));
        // Coefficient of x^k = nCk * a^(n-k) * b^k
        var coeff = MathUtils.nCr(n, k) * Math.pow(a, n - k) * Math.pow(b, k);

        var aTex = a === 1 ? '1' : String(a);
        var bTex = b === 1 ? 'x' : (b === -1 ? '-x' : b + 'x');
        var exprTex = '(' + aTex + ' + ' + bTex + ')^{' + n + '}';
        if (a === 1 && b === 1) exprTex = '(1 + x)^{' + n + '}';
        else if (a === 1) exprTex = '(1 + ' + bTex + ')^{' + n + '}';

        return {
            type: 'free',
            rule: 'Find Coefficient',
            difficulty: 'medium',
            text: 'Find the coefficient of \\(x^{' + k + '}\\) in the expansion of:',
            latex: exprTex,
            answer: coeff,
            answerTex: String(coeff),
            options: [],
            hintTex: [
                'The general term is \\(T_{r+1} = \\binom{n}{r}\\, a^{n-r}\\,(bx)^r\\). Set \\(r = ' + k + '\\).',
                '\\binom{' + n + '}{' + k + '} \\times ' + a + '^{' + (n - k) + '} \\times ' + b + '^{' + k + '} = ' + MathUtils.nCr(n, k) + ' \\times ' + Math.pow(a, n - k) + ' \\times ' + Math.pow(b, k)
            ],
            explain: 'The term containing \\(x^{' + k + '}\\) is \\(T_{' + (k + 1) + '} = \\binom{' + n + '}{' + k + '} \\cdot ' + a + '^{' + (n - k) + '} \\cdot (' + b + 'x)^{' + k + '}\\).<br>' +
                '\\(= ' + MathUtils.nCr(n, k) + ' \\times ' + Math.pow(a, n - k) + ' \\times ' + Math.pow(b, k) + '\\, x^{' + k + '} = ' + coeff + '\\, x^{' + k + '}\\).<br>' +
                'The coefficient is \\(' + coeff + '\\).'
        };
    },

    // 4. Find the term containing x^k in (a + bx)^n - answer is full coefficient
    qFindTerm() {
        var n = MathUtils.randInt(6, 9);
        var a = MathUtils.randInt(1, 3);
        var b = MathUtils.randInt(1, 4);
        var k = MathUtils.randInt(2, Math.min(n - 1, 5));
        // T_{k+1} = nCk * a^(n-k) * b^k * x^k
        var coeff = MathUtils.nCr(n, k) * Math.pow(a, n - k) * Math.pow(b, k);

        var exprTex = '(' + a + ' + ' + b + 'x)^{' + n + '}';
        if (a === 1 && b === 1) exprTex = '(1 + x)^{' + n + '}';
        else if (a === 1) exprTex = '(1 + ' + b + 'x)^{' + n + '}';
        else if (b === 1) exprTex = '(' + a + ' + x)^{' + n + '}';

        return {
            type: 'free',
            rule: 'Find Specific Term',
            difficulty: 'medium',
            text: 'In the expansion of \\(' + exprTex + '\\), find the coefficient of the term containing \\(x^{' + k + '}\\).',
            latex: 'T_{' + (k + 1) + '} = \\,? \\cdot x^{' + k + '}',
            answer: coeff,
            answerTex: String(coeff),
            options: [],
            hintTex: [
                'The general term is \\(T_{r+1} = \\binom{' + n + '}{r} \\cdot ' + a + '^{' + n + '-r} \\cdot (' + b + 'x)^r\\).',
                'For the \\(x^{' + k + '}\\) term, set \\(r = ' + k + '\\): \\(\\binom{' + n + '}{' + k + '} \\cdot ' + a + '^{' + (n - k) + '} \\cdot ' + b + '^{' + k + '} = ' + coeff + '\\).'
            ],
            explain: 'Using \\(T_{r+1} = \\binom{' + n + '}{r} \\cdot ' + a + '^{' + n + '-r} \\cdot (' + b + 'x)^r\\), set \\(r = ' + k + '\\):<br>' +
                '\\(T_{' + (k + 1) + '} = \\binom{' + n + '}{' + k + '} \\cdot ' + a + '^{' + (n - k) + '} \\cdot ' + b + '^{' + k + '} \\cdot x^{' + k + '}\\)<br>' +
                '\\(= ' + MathUtils.nCr(n, k) + ' \\times ' + Math.pow(a, n - k) + ' \\times ' + Math.pow(b, k) + ' \\cdot x^{' + k + '} = ' + coeff + '\\, x^{' + k + '}\\).'
        };
    },

    // 5. Constant term in (x + c/x)^n
    qConstantTerm() {
        // (x + c/x)^n: general term = nCr * x^(n-r) * (c/x)^r = nCr * c^r * x^(n-2r)
        // Constant term when n - 2r = 0, so r = n/2 (need n even)
        var half = MathUtils.randInt(2, 5);
        var n = 2 * half; // n is even: 4, 6, 8, 10
        var c = MathUtils.randInt(1, 4);
        var r = half; // r = n/2
        var ans = MathUtils.nCr(n, r) * Math.pow(c, r);

        var cTex = c === 1 ? '\\frac{1}{x}' : '\\frac{' + c + '}{x}';
        var exprTex = '\\left(x + ' + cTex + '\\right)^{' + n + '}';

        return {
            type: 'free',
            rule: 'Constant Term',
            difficulty: 'medium',
            text: 'Find the constant term (independent of \\(x\\)) in the expansion of:',
            latex: exprTex,
            answer: ans,
            answerTex: String(ans),
            options: [],
            hintTex: [
                'The general term is \\(T_{r+1} = \\binom{' + n + '}{r} \\cdot x^{' + n + '-r} \\cdot \\left(' + cTex + '\\right)^r = \\binom{' + n + '}{r} \\cdot ' + c + '^r \\cdot x^{' + n + '-2r}\\).',
                'For the constant term, set the power of \\(x\\) to zero: \\(' + n + ' - 2r = 0 \\Rightarrow r = ' + r + '\\).'
            ],
            explain: 'The general term is \\(T_{r+1} = \\binom{' + n + '}{r} \\cdot ' + c + '^r \\cdot x^{' + n + '-2r}\\).<br>' +
                'For the constant term: \\(' + n + ' - 2r = 0\\), so \\(r = ' + r + '\\).<br>' +
                '\\(T_{' + (r + 1) + '} = \\binom{' + n + '}{' + r + '} \\cdot ' + c + '^{' + r + '} = ' + MathUtils.nCr(n, r) + ' \\times ' + Math.pow(c, r) + ' = ' + ans + '\\).'
        };
    },

    // 6. Surd expansion: (p + q*sqrt(s))^3 in form A + B*sqrt(s)
    qSurdExpansion() {
        var s = MathUtils.pick([2, 3, 5]); // surd base
        var p = MathUtils.randInt(1, 4);     // integer part
        var q = MathUtils.randInt(1, 3);     // surd coefficient
        var n = 3; // always cube for manageability
        // (p + q*sqrt(s))^3 via binomial expansion:
        // = nC0*p^3 + nC1*p^2*(q*sqrt(s)) + nC2*p*(q*sqrt(s))^2 + nC3*(q*sqrt(s))^3
        // = p^3 + 3*p^2*q*sqrt(s) + 3*p*q^2*s + q^3*s*sqrt(s)
        // Rational part A = p^3 + 3*p*q^2*s
        // Irrational part B = 3*p^2*q + q^3*s
        var A = Math.pow(p, 3) + 3 * p * Math.pow(q, 2) * s;
        var B = 3 * Math.pow(p, 2) * q + Math.pow(q, 3) * s;

        // Ask for either A or B
        var askA = MathUtils.pick([true, false]);
        var ans = askA ? A : B;
        var askTex = askA ? 'p' : 'q';
        var formTex = 'p + q\\sqrt{' + s + '}';
        var qTex = q === 1 ? '\\sqrt{' + s + '}' : q + '\\sqrt{' + s + '}';

        return {
            type: 'free',
            rule: 'Surd Expansion',
            difficulty: 'hard',
            text: 'Express \\((' + p + ' + ' + qTex + ')^3\\) in the form \\(' + formTex + '\\). Find \\(' + askTex + '\\).',
            latex: askTex + ' = \\,?',
            answer: ans,
            answerTex: askTex + ' = ' + ans,
            options: [],
            hintTex: [
                'Expand using the binomial theorem: \\((a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3\\).',
                'Here \\(a = ' + p + '\\) and \\(b = ' + qTex + '\\). Group rational and irrational parts.'
            ],
            explain: '\\((' + p + ' + ' + qTex + ')^3 = ' + p + '^3 + 3(' + p + ')^2(' + qTex + ') + 3(' + p + ')(' + qTex + ')^2 + (' + qTex + ')^3\\)<br>' +
                '\\(= ' + Math.pow(p, 3) + ' + ' + (3 * Math.pow(p, 2) * q) + '\\sqrt{' + s + '} + ' + (3 * p * Math.pow(q, 2) * s) + ' + ' + (Math.pow(q, 3) * s) + '\\sqrt{' + s + '}\\)<br>' +
                '\\(= (' + Math.pow(p, 3) + ' + ' + (3 * p * Math.pow(q, 2) * s) + ') + (' + (3 * Math.pow(p, 2) * q) + ' + ' + (Math.pow(q, 3) * s) + ')\\sqrt{' + s + '}\\)<br>' +
                '\\(= ' + A + ' + ' + B + '\\sqrt{' + s + '}\\).<br>' +
                'So \\(p = ' + A + '\\) and \\(q = ' + B + '\\).'
        };
    },

    // 7. Pascal's triangle row (MC)
    qPascalsTriangle() {
        var n = MathUtils.randInt(3, 8);
        var correctRow = n; // Row n gives coefficients for (a+b)^n

        var opts = MathUtils.generateOptions(correctRow, function() {
            return MathUtils.pick([n - 1, n + 1, n + 2, n - 2, 2 * n]);
        }, 4);
        var correctIdx = opts.indexOf(correctRow);

        return {
            type: 'mc',
            rule: 'Pascal\'s Triangle',
            difficulty: 'easy',
            text: 'Which row of Pascal\'s triangle gives the coefficients for the expansion of \\((a + b)^{' + n + '}\\)?',
            latex: '',
            answer: correctRow,
            answerTex: 'Row ' + correctRow,
            options: opts.map(function(v) { return 'Row ' + v; }),
            correctIdx: correctIdx,
            hintTex: [
                'Row 0 of Pascal\'s triangle is just 1 (corresponding to \\((a+b)^0 = 1\\)).',
                'Row \\(n\\) gives the coefficients for \\((a+b)^n\\).'
            ],
            explain: 'Row \\(n\\) of Pascal\'s triangle gives the binomial coefficients \\(\\binom{n}{0}, \\binom{n}{1}, \\ldots, \\binom{n}{n}\\), which are the coefficients in the expansion of \\((a+b)^n\\).<br>' +
                'Therefore, \\((a + b)^{' + n + '}\\) uses <strong>Row ' + n + '</strong>.'
        };
    },

    /* ═══════════════════════════════════════════════
       HARD GENERATORS
       ═══════════════════════════════════════════════ */

    // 8. Find n given coefficient of x^2 in (1 + x/c)^n
    qFindN() {
        // Coefficient of x^2 in (1 + x/c)^n = nC2 * (1/c)^2 = n(n-1)/(2c^2)
        // We want this to be a nice integer. Pick c and target, solve for n.
        var c = MathUtils.randInt(1, 4);
        // nC2 / c^2 = target => nC2 = target * c^2
        // Pick n first, compute target
        var n = MathUtils.randInt(4, 12);
        var nC2 = MathUtils.nCr(n, 2);
        var c2 = c * c;
        // We need nC2 / c^2 to be integer for a clean answer
        // If not, try c = 1
        if (nC2 % c2 !== 0) {
            c = 1;
            c2 = 1;
        }
        var target = nC2 / c2;

        var cTex = c === 1 ? 'x' : '\\frac{x}{' + c + '}';
        var exprTex = '\\left(1 + ' + cTex + '\\right)^n';

        return {
            type: 'free',
            rule: 'Find n',
            difficulty: 'hard',
            text: 'The coefficient of \\(x^2\\) in the expansion of \\(' + exprTex + '\\) is \\(' + target + '\\). Find \\(n\\).',
            latex: 'n = \\,?',
            answer: n,
            answerTex: 'n = ' + n,
            options: [],
            hintTex: [
                'The \\(x^2\\) term is \\(\\binom{n}{2} \\cdot \\left(\\frac{1}{' + c + '}\\right)^2 x^2 = \\frac{n(n-1)}{' + (2 * c2) + '} x^2\\).',
                '\\frac{n(n-1)}{' + (2 * c2) + '} = ' + target + ' \\Rightarrow n(n-1) = ' + (target * 2 * c2)
            ],
            explain: 'The coefficient of \\(x^2\\) is \\(\\binom{n}{2} \\cdot \\frac{1}{' + c + '^2} = \\frac{n(n-1)}{' + (2 * c2) + '}\\).<br>' +
                'Setting this equal to \\(' + target + '\\):<br>' +
                '\\(\\frac{n(n-1)}{' + (2 * c2) + '} = ' + target + '\\)<br>' +
                '\\(n(n-1) = ' + (target * 2 * c2) + '\\)<br>' +
                'Since \\(' + n + ' \\times ' + (n - 1) + ' = ' + (n * (n - 1)) + '\\), we get \\(n = ' + n + '\\).'
        };
    },

    // 9. General term formula (MC)
    qGeneralTerm() {
        var n = MathUtils.randInt(5, 10);
        var a = MathUtils.pick(['a', '2', '3']);
        var b = MathUtils.pick(['b', 'x', '2x']);

        var correct = '\\binom{' + n + '}{r}\\, ' + a + '^{' + n + '-r}\\, (' + b + ')^r';

        // Wrong options
        var wrongs = [
            '\\binom{' + n + '}{r}\\, ' + a + '^r\\, (' + b + ')^{' + n + '-r}',              // swapped exponents
            '\\binom{' + n + '}{r+1}\\, ' + a + '^{' + n + '-r}\\, (' + b + ')^r',            // r+1 instead of r
            '\\binom{' + (n - 1) + '}{r}\\, ' + a + '^{' + n + '-r}\\, (' + b + ')^r',        // n-1 instead of n
            '\\binom{' + n + '}{r}\\, ' + a + '^{' + n + '-r}\\, (' + b + ')^{r+1}',          // r+1 in power
            n + '^r \\cdot ' + a + '^{' + n + '-r}\\, (' + b + ')^r'                           // missing nCr
        ];

        var distractors = MathUtils.shuffle(wrongs).slice(0, 3);
        var opts = MathUtils.shuffle([correct].concat(distractors));
        var correctIdx = opts.indexOf(correct);

        return {
            type: 'mc',
            rule: 'General Term',
            difficulty: 'medium',
            text: 'What is the general term \\(T_{r+1}\\) of \\((' + a + ' + ' + b + ')^{' + n + '}\\)?',
            latex: '',
            answer: correct,
            answerTex: 'T_{r+1} = ' + correct,
            options: opts.map(function(o) { return '\\(' + o + '\\)'; }),
            correctIdx: correctIdx,
            hintTex: [
                'The binomial theorem states \\((a+b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r\\).',
                'So \\(T_{r+1} = \\binom{n}{r} \\cdot a^{n-r} \\cdot b^r\\).'
            ],
            explain: 'By the binomial theorem, the general term of \\((' + a + ' + ' + b + ')^{' + n + '}\\) is:<br>' +
                '\\(T_{r+1} = \\binom{' + n + '}{r}\\, ' + a + '^{' + n + '-r}\\, (' + b + ')^r\\)<br>' +
                'where \\(r = 0, 1, 2, \\ldots, ' + n + '\\).'
        };
    },

    // 10. Coefficient of a^p * b^q in (ca + db)^n
    qCoefficientAB() {
        var n = MathUtils.randInt(5, 8);
        // Pick the power split: q is picked, p = n - q
        var q = MathUtils.randInt(2, n - 2);
        var p = n - q;
        var ca = MathUtils.randInt(1, 3); // coefficient of a
        var db = MathUtils.randInt(1, 3); // coefficient of b
        // Coefficient of a^p * b^q = nCq * ca^p * db^q
        var coeff = MathUtils.nCr(n, q) * Math.pow(ca, p) * Math.pow(db, q);

        var caTex = ca === 1 ? 'a' : ca + 'a';
        var dbTex = db === 1 ? 'b' : db + 'b';
        var exprTex = '(' + caTex + ' + ' + dbTex + ')^{' + n + '}';

        return {
            type: 'free',
            rule: 'Multinomial Coefficient',
            difficulty: 'medium',
            text: 'Find the coefficient of \\(a^{' + p + '}\\, b^{' + q + '}\\) in the expansion of:',
            latex: exprTex,
            answer: coeff,
            answerTex: String(coeff),
            options: [],
            hintTex: [
                'Use \\(T_{r+1} = \\binom{' + n + '}{r} \\cdot (' + caTex + ')^{' + n + '-r} \\cdot (' + dbTex + ')^r\\). The \\(b^{' + q + '}\\) term has \\(r = ' + q + '\\).',
                '\\binom{' + n + '}{' + q + '} \\cdot ' + ca + '^{' + p + '} \\cdot ' + db + '^{' + q + '} = ' + MathUtils.nCr(n, q) + ' \\times ' + Math.pow(ca, p) + ' \\times ' + Math.pow(db, q)
            ],
            explain: 'The term with \\(a^{' + p + '}\\, b^{' + q + '}\\) occurs when \\(r = ' + q + '\\):<br>' +
                '\\(T_{' + (q + 1) + '} = \\binom{' + n + '}{' + q + '} \\cdot (' + ca + 'a)^{' + p + '} \\cdot (' + db + 'b)^{' + q + '}\\)<br>' +
                '\\(= ' + MathUtils.nCr(n, q) + ' \\times ' + ca + '^{' + p + '} \\times ' + db + '^{' + q + '} \\cdot a^{' + p + '} b^{' + q + '}\\)<br>' +
                '\\(= ' + MathUtils.nCr(n, q) + ' \\times ' + Math.pow(ca, p) + ' \\times ' + Math.pow(db, q) + ' = ' + coeff + '\\).'
        };
    },

    /* ═══════════════════════════════════════════════
       POOLS & LIFECYCLE
       ═══════════════════════════════════════════════ */

    pools: null,
    allPool: null,

    init() {
        this.pools = {
            easy: [this.qEvaluateNCR, this.qExpandSmall, this.qPascalsTriangle],
            medium: [this.qFindCoefficient, this.qFindTerm, this.qConstantTerm, this.qGeneralTerm, this.qCoefficientAB],
            hard: [this.qSurdExpansion, this.qFindN]
        };
        this.allPool = [
            ...this.pools.easy, ...this.pools.easy,
            ...this.pools.medium, ...this.pools.medium,
            ...this.pools.hard
        ];
        if (typeof loadActivityStats === 'function') loadActivityStats('binom', this);
    },

    next() {
        const p = this.level === 'all' ? this.allPool : this.pools[this.level];
        return MathUtils.pick(p).call(this);
    },

    resetScore() {
        this.score = 0; this.total = 0; this.streak = 0;
        document.getElementById('binom-score').textContent = '0 / 0';
        document.getElementById('binom-pct').textContent = '\u2014';
        document.getElementById('binom-streak').textContent = '0';
        if (typeof saveActivityStats === 'function') saveActivityStats('binom', this);
    },

    load() {
        this.init();
        this.answered = false;
        this.hintIdx = 0;

        this.currentQ = this.next();
        const q = this.currentQ;
        const dl = { easy: 'Easy', medium: 'Medium', hard: 'Challenging' };

        // Build question card HTML
        let h = '<div class="difficulty-tag ' + q.difficulty + '">' + dl[q.difficulty] + '</div>';
        h += '<div class="rule-tag">' + q.rule + '</div>';
        h += '<div class="question-text">' + q.text + '</div>';
        if (q.latex) h += '<div class="question-prompt">\\(' + q.latex + '\\)</div>';

        if (q.type === 'mc') {
            h += '<div class="mc-options">';
            q.options.forEach(function(opt, i) {
                h += '<button class="mc-option" data-i="' + i + '">' + opt + '</button>';
            });
            h += '</div>';
        } else {
            h += '<div class="input-area">';
            h += '<math-field class="lr-math-field" id="binom-mf" placeholder="?"></math-field>';
            h += '<button class="btn btn-primary" id="binom-check">Check</button>';
            h += '</div>';
        }

        document.getElementById('binom-card').innerHTML = h;
        document.getElementById('binom-fb').classList.remove('show', 'correct', 'incorrect');
        document.getElementById('binom-next').classList.remove('show');
        if (typeof resetHint === 'function') resetHint('binom-hint', 'binom-hint-btn');
        document.getElementById('binom-workout').innerHTML = '';
        if (typeof renderMath === 'function') renderMath();

        if (q.type === 'mc') {
            document.querySelectorAll('#binom-card .mc-option').forEach(function(btn, i) {
                btn.addEventListener('click', function() {
                    if (BINOMIAL.answered) return;
                    BINOMIAL.answered = true;
                    var ok = i === q.correctIdx;
                    document.querySelectorAll('#binom-card .mc-option').forEach(function(b, j) {
                        b.classList.add(j === q.correctIdx ? 'correct' : (j === i && !ok ? 'incorrect' : 'disabled'));
                        b.disabled = true;
                    });
                    BINOMIAL.record(ok);
                    var ex = q.explain;
                    if (!ok) ex = 'The correct answer is <strong>' + q.options[q.correctIdx] + '</strong>.<br>' + ex;
                    BINOMIAL.showFb(ok, ex);
                });
            });
            var _mcKey = function(e) {
                var k = parseInt(e.key);
                if (k >= 1 && k <= 4 && !BINOMIAL.answered) {
                    var btn = document.querySelector('#binom-card .mc-option[data-i="' + (k - 1) + '"]');
                    if (btn) btn.click();
                }
            };
            document.addEventListener('keydown', _mcKey);
            this._mcCleanup = function() { document.removeEventListener('keydown', _mcKey); };
        } else {
            this._mcCleanup = null;
            setTimeout(function() {
                var mf = document.getElementById('binom-mf');
                if (mf) {
                    mf.focus();
                    mf.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') { e.preventDefault(); BINOMIAL.check(); }
                    });
                }
                var checkBtn = document.getElementById('binom-check');
                if (checkBtn) checkBtn.addEventListener('click', function() { BINOMIAL.check(); });
            }, 200);
        }
    },

    check() {
        if (this.answered) return;
        var mf = document.getElementById('binom-mf');
        if (!mf || !mf.value.trim()) return;
        this.answered = true;
        var ans = parseLatex(mf.value);
        var tol = this.currentQ.tolerance || 0.01;
        var ok = Math.abs(ans - this.currentQ.answer) <= tol;
        mf.disabled = true;
        document.getElementById('binom-check').disabled = true;
        this.record(ok);
        var ex = this.currentQ.explain;
        if (!ok) ex = 'The answer is \\(' + this.currentQ.answerTex + '\\).<br>' + ex;
        this.showFb(ok, ex);
    },

    record(ok) {
        this.total++;
        if (ok) { this.score++; this.streak++; } else { this.streak = 0; }
        document.getElementById('binom-score').textContent = this.score + ' / ' + this.total;
        document.getElementById('binom-pct').textContent = this.total ? Math.round(this.score / this.total * 100) + '%' : '\u2014';
        document.getElementById('binom-streak').textContent = this.streak;
        if (typeof saveActivityStats === 'function') saveActivityStats('binom', this, ok);
        if (window.markAnswered) window.markAnswered();
        if (this._mcCleanup) this._mcCleanup();
    },

    showFb(ok, html) {
        var fb = document.getElementById('binom-fb');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', ok ? 'correct' : 'incorrect');
        fb.style.textAlign = 'center';
        document.getElementById('binom-fb-title').textContent = ok ? 'Correct!' : 'Not quite\u2026';
        document.getElementById('binom-fb-expl').innerHTML = html;
        document.getElementById('binom-next').classList.add('show');
        if (typeof renderMath === 'function') renderMath();
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    }
};

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['binomial-theorem'] = () => BINOMIAL.load();
}
