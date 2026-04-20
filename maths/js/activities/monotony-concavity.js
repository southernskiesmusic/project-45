/*
 * monotony-concavity.js - IB Math AA 5.5–5.6: Monotony & Concavity
 * Increasing/decreasing intervals, stationary points, concavity, inflection points
 */

const MONOTONY = {
    score: 0,
    total: 0,
    streak: 0,
    currentQ: null,
    answered: false,
    level: 'all',
    hintIndex: 0,

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qStationaryX - Easy (Free response)
     * f(x) = ax³ + bx² + cx. Find the POSITIVE stationary x where f'(x) = 0.
     * f'(x) = 3ax² + 2bx + c. Coefficients chosen so roots are clean integers,
     * exactly one of which is positive.
     * Strategy: build f' = 3a(x - r1)(x - r2) where r2 > 0 and r1 <= 0.
     */
    qStationaryX() {
        // Pick a in {1, 2} so 3a is small, pick integer roots r1 <= 0, r2 > 0
        const a = MathUtils.pick([1, 2]);
        const r2 = MathUtils.randInt(1, 5);  // positive root
        const r1 = MathUtils.randInt(-5, 0); // non-positive root (could be 0, but let's force negative)
        const r1neg = r1 === 0 ? -1 : r1;    // ensure r1 < 0 so roots are distinct

        // f'(x) = 3a(x - r1neg)(x - r2) = 3a(x² - (r1neg+r2)x + r1neg*r2)
        // Expanding: 3ax² - 3a(r1neg+r2)x + 3a*r1neg*r2
        // Matching f'(x) = 3ax² + 2bx + c:
        //   2b = -3a(r1neg + r2)  => b = -3a(r1neg+r2)/2
        //   c  =  3a * r1neg * r2

        // To keep b integer, ensure 3a(r1neg+r2) is even.
        // For a=1: need (r1neg+r2) even, i.e. r1neg and r2 same parity.
        // For a=2: 6*(r1neg+r2) is always even.
        let aFinal = a;
        let r1Final = r1neg;
        let r2Final = r2;

        if (aFinal === 1) {
            // Force same parity
            if ((r1Final + r2Final) % 2 !== 0) {
                // Adjust r2 by 1, staying positive
                r2Final = r2Final + 1;
                if (r2Final > 6) r2Final = r2Final - 2;
            }
        }

        const b = -3 * aFinal * (r1Final + r2Final) / 2;
        const c = 3 * aFinal * r1Final * r2Final;

        // Verify
        const answer = r2Final;

        // Format f(x): ax³ + bx² + cx
        function fmtPoly(a, b, c) {
            let s = '';
            // ax³
            if (a === 1) s += 'x^3';
            else if (a === -1) s += '-x^3';
            else s += `${a}x^3`;
            // bx²
            if (b > 0) s += ` + ${b === 1 ? '' : b}x^2`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
            // cx
            if (c > 0) s += ` + ${c === 1 ? '' : c}x`;
            else if (c < 0) s += ` - ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
            return s;
        }

        // Format f'(x)
        const fpA = 3 * aFinal;
        const fpB = 2 * b;
        const fxTex = fmtPoly(aFinal, b, c);
        const fpxTex = (() => {
            let s = '';
            if (fpA === 1) s += 'x^2';
            else if (fpA === -1) s += '-x^2';
            else s += `${fpA}x^2`;
            if (fpB > 0) s += ` + ${fpB === 1 ? '' : fpB}x`;
            else if (fpB < 0) s += ` - ${Math.abs(fpB) === 1 ? '' : Math.abs(fpB)}x`;
            if (c > 0) s += ` + ${c}`;
            else if (c < 0) s += ` - ${Math.abs(c)}`;
            return s;
        })();

        return {
            type: 'free',
            rule: 'Stationary Points',
            difficulty: 'easy',
            text: 'Find the <strong>positive</strong> x-value where the function below has a stationary point.',
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f'(x) = ${fpxTex} = 0`,
                `f'(x) = ${fpA}(x - ${r1Final})(x - ${r2Final}) = 0 \\implies x = ${r1Final} \\text{ or } x = ${r2Final}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = ${fpxTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Set \\(f'(x) = 0\\) and factorise:<br>` +
                     `\\(${fpxTex} = ${fpA}(x - ${r1Final})(x - ${r2Final}) = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Solutions are \\(x = ${r1Final}\\) and \\(x = ${r2Final}\\).<br><br>` +
                     `<strong>Answer:</strong> The positive stationary x-value is \\(x = ${r2Final}\\).`
        };
    },

    /**
     * 2. qFPrimeValue - Easy (Free response)
     * f(x) = ax² + bx + c. Find f'(p) for given p. f'(x) = 2ax + b.
     */
    qFPrimeValue() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-8, 8);
        const p = MathUtils.randInt(-5, 5);

        const fpP = 2 * a * p + b;

        function fmtQuad(a, b, c) {
            let s = '';
            if (a === 1) s += 'x^2';
            else if (a === -1) s += '-x^2';
            else s += `${a}x^2`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;
            if (c > 0) s += ` + ${c}`;
            else if (c < 0) s += ` - ${Math.abs(c)}`;
            return s;
        }

        const fxTex = fmtQuad(a, b, c);
        const fpTex = (() => {
            const fpa = 2 * a;
            let s = '';
            if (fpa === 1) s += 'x';
            else if (fpa === -1) s += '-x';
            else s += `${fpa}x`;
            if (b > 0) s += ` + ${b}`;
            else if (b < 0) s += ` - ${Math.abs(b)}`;
            return s;
        })();

        return {
            type: 'free',
            rule: 'Derivative Value',
            difficulty: 'easy',
            text: `Given the function below, find the value of \\(f'(${p})\\).`,
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: fpP,
            answerTex: String(fpP),
            options: [],
            hintTex: [
                `f'(x) = ${fpTex}`,
                `f'(${p}) = ${2 * a}(${p}) + ${b} = ${2 * a * p} + ${b}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = ${fpTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(x = ${p}\\):<br>` +
                     `\\(f'(${p}) = ${2 * a}(${p}) + ${b} = ${2 * a * p} + ${b}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f'(${p}) = ${fpP}\\).`
        };
    },

    /**
     * 3. qIncreasingAt - Easy (MC)
     * f(x) = ax² + bx + c with a > 0. At x = p, is f increasing, decreasing, or stationary?
     * f'(p) = 2ap + b. Sign determines answer.
     */
    qIncreasingAt() {
        const a = MathUtils.randInt(1, 4); // a > 0
        const b = MathUtils.randInt(-8, 8);
        const c = MathUtils.randInt(-6, 6);

        // Vertex at x = -b/(2a). Pick p to give a deliberate outcome.
        const vertex = -b / (2 * a);
        const outcome = MathUtils.pick(['increasing', 'decreasing', 'stationary']);

        let p;
        if (outcome === 'stationary') {
            // p must give f'(p) = 0, i.e. 2ap + b = 0, p = -b/(2a)
            // Only works if vertex is integer
            if (Number.isInteger(vertex)) {
                p = vertex;
            } else {
                // Fall back to increasing
                p = Math.ceil(vertex) + MathUtils.randInt(1, 3);
            }
        } else if (outcome === 'increasing') {
            // f'(p) > 0: p > vertex
            p = Math.floor(vertex) + MathUtils.randInt(1, 4);
        } else {
            // decreasing: p < vertex
            p = Math.ceil(vertex) - MathUtils.randInt(1, 4);
        }

        const fpP = 2 * a * p + b;
        let correctText, correctValue;
        if (fpP > 0) {
            correctText = 'Increasing';
        } else if (fpP < 0) {
            correctText = 'Decreasing';
        } else {
            correctText = 'Stationary';
        }

        function fmtQuad(a, b, c) {
            let s = '';
            if (a === 1) s += 'x^2';
            else s += `${a}x^2`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;
            if (c > 0) s += ` + ${c}`;
            else if (c < 0) s += ` - ${Math.abs(c)}`;
            return s;
        }

        const fxTex = fmtQuad(a, b, c);
        const fpTex = (() => {
            const fpa = 2 * a;
            let s = `${fpa}x`;
            if (b > 0) s += ` + ${b}`;
            else if (b < 0) s += ` - ${Math.abs(b)}`;
            return s;
        })();

        const allOptions = ['Increasing', 'Decreasing', 'Stationary', 'Cannot determine'];
        const options = allOptions.map(opt => ({
            value: opt === correctText ? 1 : 0,
            tex: `\\text{${opt}}`
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Increasing / Decreasing',
            difficulty: 'easy',
            text: `At \\(x = ${p}\\), is \\(f\\) increasing, decreasing, or stationary?`,
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: 1,
            answerTex: `\\text{${correctText}}`,
            options: shuffled,
            hintTex: [
                `f'(x) = ${fpTex}`,
                `f'(${p}) = ${fpP} ${fpP > 0 ? '> 0' : fpP < 0 ? '< 0' : '= 0'}`
            ],
            explain: `<strong>Step 1:</strong> Find the derivative: \\(f'(x) = ${fpTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate at \\(x = ${p}\\):<br>` +
                     `\\(f'(${p}) = ${2 * a}(${p}) + ${b} = ${fpP}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since \\(f'(${p}) = ${fpP} ${fpP > 0 ? '> 0' : fpP < 0 ? '< 0' : '= 0'}\\), ` +
                     `the function is <strong>${correctText.toLowerCase()}</strong> at \\(x = ${p}\\).`
        };
    },

    /**
     * 4. qNatureStationary - Medium (MC)
     * f(x) = ax³ + bx² + cx. Find nature of stationary point at given x = p.
     * f''(x) = 6ax + 2b. f'' < 0 => local max, f'' > 0 => local min.
     */
    qNatureStationary() {
        const a = MathUtils.nonZeroRandInt(-3, 3) || 1;
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-6, 6);
        // Pick a stationary point. Use p = randInt so f''(p) = 6ap + 2b is clearly non-zero.
        const p = MathUtils.randInt(-4, 4);
        const fpp = 6 * a * p + 2 * b;

        let correctText;
        if (fpp < 0) correctText = 'Local maximum';
        else if (fpp > 0) correctText = 'Local minimum';
        else {
            // Inconclusive via second derivative — force away from this case
            // Adjust p by 1
            const pAdj = p + 1;
            const fppAdj = 6 * a * pAdj + 2 * b;
            if (fppAdj < 0) correctText = 'Local maximum';
            else if (fppAdj > 0) correctText = 'Local minimum';
            else correctText = 'Local minimum'; // fallback
        }

        // Effective p used for f''
        const pEff = fpp !== 0 ? p : p + 1;
        const fppEff = 6 * a * pEff + 2 * b;

        function fmtCubic(a, b, c) {
            let s = '';
            if (a === 1) s += 'x^3';
            else if (a === -1) s += '-x^3';
            else s += `${a}x^3`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x^2`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
            if (c > 0) s += ` + ${c === 1 ? '' : c}x`;
            else if (c < 0) s += ` - ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
            return s;
        }

        const fxTex = fmtCubic(a, b, c);
        const fppTex = (() => {
            const k = 6 * a;
            const l = 2 * b;
            let s = '';
            if (k === 1) s += 'x';
            else if (k === -1) s += '-x';
            else s += `${k}x`;
            if (l > 0) s += ` + ${l}`;
            else if (l < 0) s += ` - ${Math.abs(l)}`;
            return s;
        })();

        const allOptions = ['Local maximum', 'Local minimum', 'Inflection point', 'Neither'];
        const options = allOptions.map(opt => ({
            value: opt === correctText ? 1 : 0,
            tex: `\\text{${opt}}`
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Nature of Stationary Point',
            difficulty: 'medium',
            text: `The function below has a stationary point at \\(x = ${pEff}\\). Determine its nature.`,
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: 1,
            answerTex: `\\text{${correctText}}`,
            options: shuffled,
            hintTex: [
                `f''(x) = ${fppTex}`,
                `f''(${pEff}) = ${6 * a}(${pEff}) + ${2 * b} = ${fppEff} ${fppEff < 0 ? '< 0 \\Rightarrow \\text{local max}' : '> 0 \\Rightarrow \\text{local min}'}`
            ],
            explain: `<strong>Step 1:</strong> Find the second derivative: \\(f''(x) = ${fppTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate at \\(x = ${pEff}\\):<br>` +
                     `\\(f''(${pEff}) = ${6 * a}(${pEff}) + ${2 * b} = ${fppEff}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since \\(f''(${pEff}) = ${fppEff} ${fppEff < 0 ? '< 0' : '> 0'}\\), ` +
                     `the stationary point is a <strong>${correctText.toLowerCase()}</strong>.`
        };
    },

    /**
     * 5. qSecondDerivValue - Easy (Free response)
     * f(x) = ax³ + bx² + cx + d. Find f''(p). f''(x) = 6ax + 2b.
     */
    qSecondDerivValue() {
        const a = MathUtils.nonZeroRandInt(-3, 3) || 1;
        const b = MathUtils.randInt(-5, 5);
        const c = MathUtils.randInt(-6, 6);
        const d = MathUtils.randInt(-8, 8);
        const p = MathUtils.randInt(-4, 4);

        const fppP = 6 * a * p + 2 * b;

        function fmtFull(a, b, c, d) {
            let s = '';
            if (a === 1) s += 'x^3';
            else if (a === -1) s += '-x^3';
            else s += `${a}x^3`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x^2`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
            if (c > 0) s += ` + ${c === 1 ? '' : c}x`;
            else if (c < 0) s += ` - ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
            if (d > 0) s += ` + ${d}`;
            else if (d < 0) s += ` - ${Math.abs(d)}`;
            return s;
        }

        const fxTex = fmtFull(a, b, c, d);
        const k = 6 * a;
        const l = 2 * b;
        const fppTex = (() => {
            let s = '';
            if (k === 1) s += 'x';
            else if (k === -1) s += '-x';
            else s += `${k}x`;
            if (l > 0) s += ` + ${l}`;
            else if (l < 0) s += ` - ${Math.abs(l)}`;
            return s;
        })();

        return {
            type: 'free',
            rule: 'Second Derivative Value',
            difficulty: 'easy',
            text: `Given the function below, find the value of \\(f''(${p})\\).`,
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: fppP,
            answerTex: String(fppP),
            options: [],
            hintTex: [
                `f'(x) = ${3 * a}x^2 + ${2 * b}x + ${c}`,
                `f''(x) = ${fppTex}, \\quad f''(${p}) = ${k}(${p}) + ${l}`
            ],
            explain: `<strong>Step 1:</strong> First derivative: \\(f'(x) = ${3 * a}x^2 ${2 * b >= 0 ? '+ ' + 2 * b : '- ' + Math.abs(2 * b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Second derivative: \\(f''(x) = ${fppTex}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(x = ${p}\\):<br>` +
                     `\\(f''(${p}) = ${k}(${p}) + ${l} = ${k * p} + ${l} = ${fppP}\\).`
        };
    },

    /**
     * 6. qConcavityAt - Medium (MC)
     * f(x) = ax³ + bx² + cx. At x = p, is f concave up or concave down?
     * f''(x) = 6ax + 2b. f'' > 0 => concave up, f'' < 0 => concave down.
     */
    qConcavityAt() {
        const a = MathUtils.nonZeroRandInt(-3, 3) || 1;
        const b = MathUtils.randInt(-6, 6);
        const c = MathUtils.randInt(-6, 6);

        // Pick p so that f''(p) ≠ 0
        let p;
        let fppP;
        let attempts = 0;
        do {
            p = MathUtils.randInt(-5, 5);
            fppP = 6 * a * p + 2 * b;
            attempts++;
        } while (fppP === 0 && attempts < 20);

        // If still 0 after attempts, shift p
        if (fppP === 0) { p += 1; fppP = 6 * a * p + 2 * b; }

        const correctText = fppP > 0 ? 'Concave up' : 'Concave down';

        function fmtCubic(a, b, c) {
            let s = '';
            if (a === 1) s += 'x^3';
            else if (a === -1) s += '-x^3';
            else s += `${a}x^3`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x^2`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
            if (c > 0) s += ` + ${c === 1 ? '' : c}x`;
            else if (c < 0) s += ` - ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
            return s;
        }

        const fxTex = fmtCubic(a, b, c);
        const k = 6 * a, l = 2 * b;
        const fppTex = (() => {
            let s = '';
            if (k === 1) s += 'x';
            else if (k === -1) s += '-x';
            else s += `${k}x`;
            if (l > 0) s += ` + ${l}`;
            else if (l < 0) s += ` - ${Math.abs(l)}`;
            return s;
        })();

        const allOptions = ['Concave up', 'Concave down', 'Neither (inflection point)', 'Cannot determine'];
        const options = allOptions.map(opt => ({
            value: opt === correctText ? 1 : 0,
            tex: `\\text{${opt}}`
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Concavity',
            difficulty: 'medium',
            text: `At \\(x = ${p}\\), is \\(f\\) concave up or concave down?`,
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: 1,
            answerTex: `\\text{${correctText}}`,
            options: shuffled,
            hintTex: [
                `f''(x) = ${fppTex}`,
                `f''(${p}) = ${fppP} ${fppP > 0 ? '> 0 \\Rightarrow \\text{concave up}' : '< 0 \\Rightarrow \\text{concave down}'}`
            ],
            explain: `<strong>Step 1:</strong> Second derivative: \\(f''(x) = ${fppTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate at \\(x = ${p}\\):<br>` +
                     `\\(f''(${p}) = ${k}(${p}) + ${l} = ${fppP}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since \\(f''(${p}) = ${fppP} ${fppP > 0 ? '> 0' : '< 0'}\\), ` +
                     `the function is <strong>${correctText.toLowerCase()}</strong> at \\(x = ${p}\\).`
        };
    },

    /**
     * 7. qInflectionX - Medium (Free response)
     * f(x) = ax³ + bx² + cx. f''(x) = 6ax + 2b = 0 => x = -b/(3a).
     * Choose b divisible by 3a for a clean integer answer.
     */
    qInflectionX() {
        const a = MathUtils.pick([1, -1, 2, -2, 1, -1]); // a ≠ 0
        const c = MathUtils.randInt(-6, 6);
        // b must be divisible by 3a to give integer inflection x
        const k = MathUtils.nonZeroRandInt(-4, 4); // x_inflection = -k
        const b = -3 * a * k; // so x_infl = -b/(3a) = 3a*k/(3a) = k
        const xInfl = k;

        function fmtCubic(a, b, c) {
            let s = '';
            if (a === 1) s += 'x^3';
            else if (a === -1) s += '-x^3';
            else s += `${a}x^3`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x^2`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
            if (c > 0) s += ` + ${c === 1 ? '' : c}x`;
            else if (c < 0) s += ` - ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
            return s;
        }

        const fxTex = fmtCubic(a, b, c);
        const k6a = 6 * a;
        const k2b = 2 * b;
        const fppTex = (() => {
            let s = '';
            if (k6a === 1) s += 'x';
            else if (k6a === -1) s += '-x';
            else s += `${k6a}x`;
            if (k2b > 0) s += ` + ${k2b}`;
            else if (k2b < 0) s += ` - ${Math.abs(k2b)}`;
            return s;
        })();

        return {
            type: 'free',
            rule: 'Inflection Point',
            difficulty: 'medium',
            text: 'Find the x-coordinate of the inflection point of the function below.',
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: xInfl,
            answerTex: String(xInfl),
            options: [],
            hintTex: [
                `f''(x) = ${fppTex} = 0`,
                `${k6a}x = ${-k2b} \\implies x = ${xInfl}`
            ],
            explain: `<strong>Step 1:</strong> Find the second derivative: \\(f''(x) = ${fppTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Set \\(f''(x) = 0\\):<br>` +
                     `\\(${k6a}x + ${k2b} = 0 \\implies x = ${xInfl}\\).<br><br>` +
                     `<strong>Step 3:</strong> Check \\(f''\\) changes sign: for \\(x < ${xInfl}\\), \\(f''\\) is ` +
                     `${6 * a * (xInfl - 1) + 2 * b < 0 ? 'negative' : 'positive'}; ` +
                     `for \\(x > ${xInfl}\\), \\(f''\\) is ` +
                     `${6 * a * (xInfl + 1) + 2 * b < 0 ? 'negative' : 'positive'}. Sign changes, confirming an inflection point.<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${xInfl}\\).`
        };
    },

    /**
     * 8. qLocalMaxY - Medium (Free response)
     * f(x) = ax³ + bx² + cx + d. Find local max y-value.
     * Stationary points from f'=0; evaluate f at the one with f'' < 0.
     * Build from roots so answer is a clean integer.
     */
    qLocalMaxY() {
        // Strategy: set a = 1 (or -1 for local max on left).
        // f'(x) = 3x² + 2bx + c = 3(x - r1)(x - r2) with r1 < r2, a > 0 => r1 is local max.
        // For a > 0: f''(r1) = 6r1 + 2b < 0 => local max at r1.
        const a = 1;
        const r1 = MathUtils.randInt(-4, -1); // local max x (left root of f')
        const r2 = MathUtils.randInt(1, 4);   // local min x (right root of f')

        // f'(x) = 3(x-r1)(x-r2) = 3x² - 3(r1+r2)x + 3r1r2
        // => 3ax² + 2bx + c: 3a=3, 2b=-3(r1+r2), c=3r1r2
        const b = -3 * (r1 + r2) / 2;
        // For b integer need r1+r2 even
        let r1f = r1, r2f = r2;
        if ((r1 + r2) % 2 !== 0) {
            r2f = r2 + 1;
            if (r2f > 5) r2f = r2 - 1;
        }
        const bFinal = -3 * (r1f + r2f) / 2;
        const cFinal = 3 * r1f * r2f;

        // Choose d so that f(r1f) is a nice integer
        // f(r1f) = r1f³ + bFinal*r1f² + cFinal*r1f + d
        const fAtR1NoDSigned = r1f ** 3 + bFinal * r1f ** 2 + cFinal * r1f;
        // Pick d to place answer in small range
        const targetY = MathUtils.randInt(-4, 8);
        const d = targetY - fAtR1NoDSigned;
        const answer = targetY;

        function fmtFull(a, b, c, d) {
            let s = '';
            if (a === 1) s += 'x^3';
            else s += `${a}x^3`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x^2`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
            if (c > 0) s += ` + ${c === 1 ? '' : c}x`;
            else if (c < 0) s += ` - ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
            if (d > 0) s += ` + ${d}`;
            else if (d < 0) s += ` - ${Math.abs(d)}`;
            return s;
        }

        const fxTex = fmtFull(a, bFinal, cFinal, d);
        const fpTex = (() => {
            const k = 3 * a;
            const l = 2 * bFinal;
            let s = `${k}x^2`;
            if (l > 0) s += ` + ${l}x`;
            else if (l < 0) s += ` - ${Math.abs(l)}x`;
            if (cFinal > 0) s += ` + ${cFinal}`;
            else if (cFinal < 0) s += ` - ${Math.abs(cFinal)}`;
            return s;
        })();

        const fppAtR1 = 6 * a * r1f + 2 * bFinal;

        return {
            type: 'free',
            rule: 'Local Maximum Value',
            difficulty: 'medium',
            text: 'Find the y-value of the local maximum of the function below.',
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f'(x) = ${fpTex} = 3(x - ${r1f})(x - ${r2f})`,
                `f'(x) = 0 \\Rightarrow x = ${r1f} \\text{ or } x = ${r2f}; \\quad f''(${r1f}) = ${fppAtR1} < 0 \\Rightarrow \\text{local max}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = ${fpTex} = 3(x - ${r1f})(x - ${r2f})\\).<br><br>` +
                     `<strong>Step 2:</strong> Stationary points at \\(x = ${r1f}\\) and \\(x = ${r2f}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(f''(x) = ${6 * a}x + ${2 * bFinal}\\).<br>` +
                     `\\(f''(${r1f}) = ${fppAtR1} < 0\\) → local maximum at \\(x = ${r1f}\\).<br><br>` +
                     `<strong>Step 4:</strong> Evaluate:<br>` +
                     `\\(f(${r1f}) = (${r1f})^3 + ${bFinal}(${r1f})^2 + ${cFinal}(${r1f}) + ${d} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> Local maximum y-value is \\(${answer}\\).`
        };
    },

    /**
     * 9. qIncreasingInterval - Hard (MC)
     * f(x) = ax³ + bx² + cx (a > 0). f'(x) = 3a(x-r1)(x-r2) with r1 < r2 (integers).
     * f'(x) > 0 when x < r1 or x > r2.
     */
    qIncreasingInterval() {
        const a = MathUtils.pick([1, 2]); // a > 0
        const r1 = MathUtils.randInt(-4, -1); // smaller root of f'
        const r2 = MathUtils.randInt(1, 4);   // larger root of f', r2 > r1

        // f'(x) = 3a(x-r1)(x-r2) = 3ax² - 3a(r1+r2)x + 3a*r1*r2
        // f(x) = ax³ + bx² + cx: 2b = -3a(r1+r2), c = 3a*r1*r2
        // We need 2b to be even => for a=1: need r1+r2 even.
        let r1f = r1, r2f = r2;
        if (a === 1 && (r1 + r2) % 2 !== 0) {
            r2f = r2 + 1;
            if (r2f > 5) r2f = r2 - 1;
        }

        // f' > 0 for x < r1f or x > r2f (since a > 0, parabola opens up)
        const correctTex = `x < ${r1f} \\text{ or } x > ${r2f}`;

        // Format f(x)
        const b = -3 * a * (r1f + r2f) / 2;
        const c = 3 * a * r1f * r2f;
        function fmtCubic(a, b, c) {
            let s = '';
            if (a === 1) s += 'x^3';
            else s += `${a}x^3`;
            if (b > 0) s += ` + ${b === 1 ? '' : b}x^2`;
            else if (b < 0) s += ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
            if (c > 0) s += ` + ${c === 1 ? '' : c}x`;
            else if (c < 0) s += ` - ${Math.abs(c) === 1 ? '' : Math.abs(c)}x`;
            return s;
        }
        const fxTex = fmtCubic(a, b, c);

        // Distractors
        const d1 = `${r1f} < x < ${r2f}`;           // interval where f' < 0 (decreasing)
        const d2 = `x < ${r2f} \\text{ or } x > ${r1f}`; // wrong order
        const d3 = `x > ${r2f}`;                     // only right branch

        const optionTexts = [correctTex, d1, d2, d3];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        const fpTex = (() => {
            const k = 3 * a, l = 2 * b;
            let s = `${k}x^2`;
            if (l > 0) s += ` + ${l}x`;
            else if (l < 0) s += ` - ${Math.abs(l)}x`;
            if (c > 0) s += ` + ${c}`;
            else if (c < 0) s += ` - ${Math.abs(c)}`;
            return s;
        })();

        return {
            type: 'mc',
            rule: 'Increasing Interval',
            difficulty: 'hard',
            text: 'Find the intervals on which \\(f\\) is <strong>increasing</strong>.',
            latex: `\\(f(x) = ${fxTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `f'(x) = ${fpTex} = ${3 * a}(x - ${r1f})(x - ${r2f})`,
                `f'(x) > 0 \\text{ when } x < ${r1f} \\text{ or } x > ${r2f} \\quad (\\text{parabola opens up, positive outside roots})`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = ${fpTex} = ${3 * a}(x - ${r1f})(x - ${r2f})\\).<br><br>` +
                     `<strong>Step 2:</strong> Roots of \\(f'\\) are \\(x = ${r1f}\\) and \\(x = ${r2f}\\).<br><br>` +
                     `<strong>Step 3:</strong> Since the coefficient of \\(x^2\\) in \\(f'\\) is positive, \\(f'(x) > 0\\) outside the roots:<br>` +
                     `\\(f'(x) > 0\\) when \\(x < ${r1f}\\) or \\(x > ${r2f}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f\\) is increasing on \\((-\\infty,\\,${r1f}) \\cup (${r2f},\\,+\\infty)\\).`
        };
    },

    /**
     * 10. qAlwaysIncreasing - Hard (MC)
     * f(x) = x³ + kx² + 3x. f'(x) = 3x² + 2kx + 3 > 0 always
     * iff discriminant < 0: 4k² - 36 < 0 => k² < 9 => -3 < k < 3.
     */
    qAlwaysIncreasing() {
        // The correct answer is always the same: -3 < k < 3.
        // Vary distractors each time.
        const correctTex = `-3 < k < 3`;
        const d1 = `k > 3`;
        const d2 = `-3 \\leq k \\leq 3`;
        const d3 = `k < -3 \\text{ or } k > 3`;

        const optionTexts = [correctTex, d1, d2, d3];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Always Increasing',
            difficulty: 'hard',
            text: 'For what values of \\(k\\) is \\(f\\) always increasing?',
            latex: `\\(f(x) = x^3 + kx^2 + 3x\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `f'(x) = 3x^2 + 2kx + 3 > 0 \\text{ always iff discriminant} < 0`,
                `\\Delta = (2k)^2 - 4(3)(3) = 4k^2 - 36 < 0 \\implies k^2 < 9 \\implies -3 < k < 3`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(f'(x) = 3x^2 + 2kx + 3\\).<br><br>` +
                     `<strong>Step 2:</strong> For \\(f\\) to be always increasing, we need \\(f'(x) > 0\\) for all \\(x\\).<br>` +
                     `This quadratic (in \\(x\\)) is always positive iff its discriminant is negative:<br>` +
                     `\\(\\Delta = (2k)^2 - 4(3)(3) = 4k^2 - 36 < 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Solve:<br>` +
                     `\\(4k^2 < 36 \\implies k^2 < 9 \\implies -3 < k < 3\\).<br><br>` +
                     `<strong>Answer:</strong> \\(f\\) is always increasing when \\(-3 < k < 3\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => MONOTONY.qStationaryX(),        weight: 3, difficulty: 'easy'   },
            { fn: () => MONOTONY.qFPrimeValue(),         weight: 3, difficulty: 'easy'   },
            { fn: () => MONOTONY.qIncreasingAt(),        weight: 3, difficulty: 'easy'   },
            { fn: () => MONOTONY.qNatureStationary(),    weight: 2, difficulty: 'medium' },
            { fn: () => MONOTONY.qSecondDerivValue(),    weight: 3, difficulty: 'easy'   },
            { fn: () => MONOTONY.qConcavityAt(),         weight: 2, difficulty: 'medium' },
            { fn: () => MONOTONY.qInflectionX(),         weight: 2, difficulty: 'medium' },
            { fn: () => MONOTONY.qLocalMaxY(),           weight: 2, difficulty: 'medium' },
            { fn: () => MONOTONY.qIncreasingInterval(),  weight: 1, difficulty: 'hard'   },
            { fn: () => MONOTONY.qAlwaysIncreasing(),    weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (MONOTONY.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (MONOTONY.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (MONOTONY.level === 'hard') {
            filtered = pool.filter(p => p.difficulty === 'hard');
        }

        const totalWeight = filtered.reduce((s, p) => s + p.weight, 0);
        let r = Math.random() * totalWeight;
        for (const item of filtered) {
            r -= item.weight;
            if (r <= 0) return item.fn();
        }
        return filtered[filtered.length - 1].fn();
    },

    /* ────────────────────────────────────────────
       UI: load()
       ──────────────────────────────────────────── */

    load() {
        MONOTONY.score = 0;
        MONOTONY.total = 0;
        MONOTONY.streak = 0;
        MONOTONY.answered = false;
        MONOTONY.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="MONOTONY.unload()">Monotony &amp; Concavity (5.5–5.6)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Monotony &amp; Concavity</h1>
                <p>IB Math AA 5.5–5.6 – Increasing/decreasing and concavity</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="MONOTONY.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="MONOTONY.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="MONOTONY.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="MONOTONY.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="mono-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="mono-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="mono-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="mono-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="mono-question-card">
                <span class="rule-tag" id="mono-rule"></span>
                <span class="difficulty-tag" id="mono-difficulty"></span>
                <div class="question-text" id="mono-text"></div>
                <div class="question-prompt" id="mono-latex"></div>
                <div id="mono-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="mono-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="mono-feedback">
                <div class="feedback-title" id="mono-feedback-title"></div>
                <div class="feedback-explanation" id="mono-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="mono-hint-btn" onclick="MONOTONY.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="mono-next-btn" onclick="MONOTONY.next()" style="display:none;">Next Question</button>
            </div>
        `;

        MONOTONY.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('calculus');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        MONOTONY.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        MONOTONY.score = 0;
        MONOTONY.total = 0;
        MONOTONY.streak = 0;
        MONOTONY.updateStats();
        MONOTONY.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        MONOTONY.answered = false;
        MONOTONY.hintIndex = 0;
        MONOTONY.currentQ = MONOTONY.pickQuestion();
        const q = MONOTONY.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('mono-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('mono-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('mono-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('mono-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('mono-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="MONOTONY.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="mono-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')MONOTONY.checkFree()">
                    <button class="btn btn-primary" onclick="MONOTONY.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('mono-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('mono-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('mono-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('mono-next-btn').style.display = 'none';
        document.getElementById('mono-hint-btn').style.display = '';
        document.getElementById('mono-hint-btn').disabled = false;

        // Render KaTeX
        MONOTONY.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = MONOTONY.currentQ;
        if (!q || !q.hintTex || MONOTONY.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('mono-hint-box');
        const hintContent = MONOTONY.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[MONOTONY.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        MONOTONY.hintIndex++;

        if (MONOTONY.hintIndex >= q.hintTex.length) {
            document.getElementById('mono-hint-btn').disabled = true;
        }

        MONOTONY.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (MONOTONY.answered) return;
        MONOTONY.answered = true;
        MONOTONY.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        // Disable all buttons and highlight
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) {
                b.classList.add('correct');
            }
        });

        if (isCorrect) {
            btn.classList.add('correct');
            MONOTONY.score++;
            MONOTONY.streak++;
        } else {
            btn.classList.add('incorrect');
            MONOTONY.streak = 0;
        }

        MONOTONY.showFeedback(isCorrect);
        MONOTONY.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (MONOTONY.answered) return;

        const inp = document.getElementById('mono-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        MONOTONY.answered = true;
        MONOTONY.total++;
        inp.disabled = true;

        const q = MONOTONY.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            MONOTONY.score++;
            MONOTONY.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            MONOTONY.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        MONOTONY.showFeedback(isCorrect);
        MONOTONY.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = MONOTONY.currentQ;
        const fb = document.getElementById('mono-feedback');
        const title = document.getElementById('mono-feedback-title');
        const explanation = document.getElementById('mono-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (MONOTONY.streak > 1) {
                title.textContent = `Correct! (${MONOTONY.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('mono-next-btn').style.display = '';
        document.getElementById('mono-hint-btn').style.display = 'none';

        MONOTONY.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('mono-score');
        const totalEl = document.getElementById('mono-total');
        const streakEl = document.getElementById('mono-streak');
        const accEl = document.getElementById('mono-accuracy');

        if (scoreEl) scoreEl.textContent = MONOTONY.score;
        if (totalEl) totalEl.textContent = MONOTONY.total;
        if (streakEl) streakEl.textContent = MONOTONY.streak;
        if (accEl) {
            accEl.textContent = MONOTONY.total > 0
                ? Math.round((MONOTONY.score / MONOTONY.total) * 100) + '%'
                : '-';
        }
    },

    /* ────────────────────────────────────────────
       UI: renderAllKaTeX()
       ──────────────────────────────────────────── */

    renderAllKaTeX() {
        if (typeof renderMathInElement === 'function') {
            const container = document.getElementById('activity-container');
            if (container) {
                renderMathInElement(container, {
                    delimiters: [
                        { left: '\\(', right: '\\)', display: false },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['monotony-concavity'] = () => MONOTONY.load();
