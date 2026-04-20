/*
 * complex-numbers-cartesian.js - IB Math AA 1.11–1.12: Complex Numbers (Cartesian Form)
 * Cartesian form, addition, subtraction, multiplication, division, modulus, conjugate, argument, powers of i
 */

const COMPLEX_CART = {
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
     * 1. qAddComplex - Easy (Free)
     * (a+bi) + (c+di). Ask for real part of sum. Answer = a+c.
     */
    qAddComplex() {
        const a = MathUtils.randInt(-8, 8);
        const b = MathUtils.nonZeroRandInt(-8, 8);
        const c = MathUtils.randInt(-8, 8);
        const d = MathUtils.nonZeroRandInt(-8, 8);

        const answer = a + c;

        function fmtZ(re, im) {
            const imSign = im >= 0 ? '+' : '-';
            return `${re} ${imSign} ${Math.abs(im)}i`;
        }

        const zTex = `(${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i) + (${c} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}i)`;

        return {
            type: 'free',
            rule: 'Addition',
            difficulty: 'easy',
            text: 'Add the two complex numbers below. Give the <strong>real part</strong> of the sum.',
            latex: `\\(${zTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `(a + bi) + (c + di) = (a+c) + (b+d)i`,
                `\\text{Real part} = a + c = ${a} + (${c}) = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Add real parts and imaginary parts separately:<br>` +
                     `\\((${a} + ${b}i) + (${c} + ${d}i) = (${a} + ${c}) + (${b} + ${d})i\\).<br><br>` +
                     `<strong>Step 2:</strong> Real part \\(= ${a} + (${c}) = ${answer}\\).<br><br>` +
                     `<strong>Step 3:</strong> The sum is \\(${fmtZ(answer, b + d)}\\), so \\(\\text{Re}(z) = ${answer}\\).`
        };
    },

    /**
     * 2. qSubtractComplex - Easy (Free)
     * (a+bi) - (c+di). Ask for imaginary part. Answer = b-d.
     */
    qSubtractComplex() {
        const a = MathUtils.randInt(-8, 8);
        const b = MathUtils.nonZeroRandInt(-8, 8);
        const c = MathUtils.randInt(-8, 8);
        const d = MathUtils.nonZeroRandInt(-8, 8);

        const answer = b - d;

        const zTex = `(${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i) - (${c} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}i)`;

        return {
            type: 'free',
            rule: 'Subtraction',
            difficulty: 'easy',
            text: 'Subtract the complex numbers below. Give the <strong>imaginary part</strong> of the result.',
            latex: `\\(${zTex}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `(a + bi) - (c + di) = (a-c) + (b-d)i`,
                `\\text{Imaginary part} = b - d = ${b} - (${d}) = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Subtract real and imaginary parts separately:<br>` +
                     `\\((${a} + ${b}i) - (${c} + ${d}i) = (${a} - ${c}) + (${b} - ${d})i\\).<br><br>` +
                     `<strong>Step 2:</strong> Imaginary part \\(= ${b} - (${d}) = ${answer}\\).<br><br>` +
                     `<strong>Step 3:</strong> So \\(\\text{Im}(z) = ${answer}\\).`
        };
    },

    /**
     * 3. qMultiplyComplex - Medium (Free)
     * (a+bi)(c+di) = (ac-bd) + (ad+bc)i. Ask for real part. Answer = ac-bd.
     */
    qMultiplyComplex() {
        const a = MathUtils.nonZeroRandInt(-5, 5);
        const b = MathUtils.nonZeroRandInt(-5, 5);
        const c = MathUtils.nonZeroRandInt(-5, 5);
        const d = MathUtils.nonZeroRandInt(-5, 5);

        const answer = a * c - b * d;
        const imPart = a * d + b * c;

        const z1Tex = `${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;
        const z2Tex = `${c} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}i`;

        return {
            type: 'free',
            rule: 'Multiplication',
            difficulty: 'medium',
            text: 'Multiply the two complex numbers below. Give the <strong>real part</strong> of the product.',
            latex: `\\((${z1Tex})(${z2Tex})\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `(a+bi)(c+di) = (ac - bd) + (ad + bc)i`,
                `\\text{Re}(z) = ac - bd = (${a})(${c}) - (${b})(${d}) = ${a * c} - ${b * d} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Expand using \\(i^2 = -1\\):<br>` +
                     `\\((${a} + ${b}i)(${c} + ${d}i) = ${a}\\cdot${c} + ${a}\\cdot${d}i + ${b}i\\cdot${c} + ${b}i\\cdot${d}i\\).<br><br>` +
                     `<strong>Step 2:</strong> Use \\(i^2 = -1\\):<br>` +
                     `\\(= ${a * c} + ${a * d}i + ${b * c}i + ${b * d}\\cdot(-1)\\).<br><br>` +
                     `<strong>Step 3:</strong> Collect real and imaginary parts:<br>` +
                     `\\(= (${a * c} - ${b * d}) + (${a * d} + ${b * c})i = ${answer} + ${imPart}i\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\text{Re}(z) = ${answer}\\).`
        };
    },

    /**
     * 4. qModulus - Easy (Free)
     * |z| = √(a²+b²). Uses Pythagorean triples for clean answers.
     */
    qModulus() {
        const triples = [
            [3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]
        ];
        const [a, b, mod] = MathUtils.pick(triples);
        const signA = MathUtils.pick([1, -1]);
        const signB = MathUtils.pick([1, -1]);
        const re = signA * a;
        const im = signB * b;

        const zTex = `${re} ${im >= 0 ? '+' : '-'} ${Math.abs(im)}i`;

        return {
            type: 'free',
            rule: 'Modulus',
            difficulty: 'easy',
            text: 'Find the modulus \\(|z|\\) of the complex number below.',
            latex: `\\(z = ${zTex}\\)`,
            answer: mod,
            answerTex: String(mod),
            options: [],
            hintTex: [
                `|z| = \\sqrt{a^2 + b^2} \\text{ where } z = a + bi`,
                `|z| = \\sqrt{(${re})^2 + (${im})^2} = \\sqrt{${re * re} + ${im * im}} = \\sqrt{${re * re + im * im}}`
            ],
            explain: `<strong>Step 1:</strong> Use the modulus formula \\(|z| = \\sqrt{a^2 + b^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(a = ${re}\\) and \\(b = ${im}\\):<br>` +
                     `\\(|z| = \\sqrt{(${re})^2 + (${im})^2} = \\sqrt{${re * re} + ${im * im}} = \\sqrt{${re * re + im * im}}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(|z| = ${mod}\\).`
        };
    },

    /**
     * 5. qConjugate - Easy (MC)
     * Find z* for z = a+bi. Correct: a-bi. 4 options with sign errors.
     */
    qConjugate() {
        const a = MathUtils.randInt(-8, 8);
        const b = MathUtils.nonZeroRandInt(-8, 8);

        const zTex = `${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;

        // Correct: conjugate negates imaginary part
        const correctTex = `${a} ${-b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;

        // Distractors
        const d1 = `-${Math.abs(a)} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;              // negated real, same imaginary
        const d2 = `${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;                          // unchanged (same as z)
        const d3 = `-${Math.abs(a)} ${-b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;             // both parts negated

        const optionTexts = [correctTex, d1, d2, d3];

        // Deduplicate
        const seen = [correctTex];
        const finalOpts = [{ value: 1, tex: correctTex }];
        for (let i = 1; i < optionTexts.length; i++) {
            if (!seen.includes(optionTexts[i])) {
                seen.push(optionTexts[i]);
                finalOpts.push({ value: 0, tex: optionTexts[i] });
            } else {
                const off = MathUtils.nonZeroRandInt(1, 4);
                const fallback = `${a + off} ${-b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;
                seen.push(fallback);
                finalOpts.push({ value: 0, tex: fallback });
            }
        }

        const shuffled = MathUtils.shuffle(finalOpts);

        return {
            type: 'mc',
            rule: 'Conjugate',
            difficulty: 'easy',
            text: `Find the complex conjugate \\(z^*\\) of the number below.`,
            latex: `\\(z = ${zTex}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `z^* \\text{ is obtained by negating the imaginary part}`,
                `\\text{If } z = a + bi, \\text{ then } z^* = a - bi`
            ],
            explain: `<strong>Step 1:</strong> The complex conjugate negates the imaginary part.<br><br>` +
                     `<strong>Step 2:</strong> \\(z = ${zTex}\\), so \\(z^* = ${correctTex}\\).<br><br>` +
                     `<strong>Note:</strong> The real part \\(a = ${a}\\) is unchanged; only the sign of \\(b = ${b}\\) flips.`
        };
    },

    /**
     * 6. qRealPart - Easy (Free)
     * Given z = (a+bi)(c+di), what is Re(z)? Answer = ac-bd.
     */
    qRealPart() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-4, 4);
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const d = MathUtils.nonZeroRandInt(-4, 4);

        const answer = a * c - b * d;

        const z1Tex = `${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;
        const z2Tex = `${c} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}i`;

        return {
            type: 'free',
            rule: 'Real Part',
            difficulty: 'easy',
            text: 'For the product below, find \\(\\text{Re}(z)\\).',
            latex: `\\(z = (${z1Tex})(${z2Tex})\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `(a+bi)(c+di) = (ac - bd) + (ad + bc)i`,
                `\\text{Re}(z) = ac - bd = (${a})(${c}) - (${b})(${d}) = ${a * c} - ${b * d}`
            ],
            explain: `<strong>Step 1:</strong> Expand the product:<br>` +
                     `\\((${z1Tex})(${z2Tex}) = (ac - bd) + (ad + bc)i\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate: \\(ac - bd = (${a})(${c}) - (${b})(${d}) = ${a * c} - ${b * d} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\text{Re}(z) = ${answer}\\).`
        };
    },

    /**
     * 7. qImagPart - Easy (Free)
     * Given z = (a+bi)(c+di), what is Im(z)? Answer = ad+bc.
     */
    qImagPart() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.nonZeroRandInt(-4, 4);
        const c = MathUtils.nonZeroRandInt(-4, 4);
        const d = MathUtils.nonZeroRandInt(-4, 4);

        const answer = a * d + b * c;

        const z1Tex = `${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;
        const z2Tex = `${c} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}i`;

        return {
            type: 'free',
            rule: 'Imaginary Part',
            difficulty: 'easy',
            text: 'For the product below, find \\(\\text{Im}(z)\\).',
            latex: `\\(z = (${z1Tex})(${z2Tex})\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `(a+bi)(c+di) = (ac - bd) + (ad + bc)i`,
                `\\text{Im}(z) = ad + bc = (${a})(${d}) + (${b})(${c}) = ${a * d} + ${b * c}`
            ],
            explain: `<strong>Step 1:</strong> Expand the product:<br>` +
                     `\\((${z1Tex})(${z2Tex}) = (ac - bd) + (ad + bc)i\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate: \\(ad + bc = (${a})(${d}) + (${b})(${c}) = ${a * d} + ${b * c} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(\\text{Im}(z) = ${answer}\\).`
        };
    },

    /**
     * 8. qDivideComplex - Medium (Free)
     * (a+bi)/(c+di). Multiply top and bottom by conjugate.
     * Construction: pick integer r, integer s, pick c, d small ≠0.
     * Then a+bi = (r+si)(c+di), so (a+bi)/(c+di) = r+si. Ask for real part r.
     */
    qDivideComplex() {
        const r = MathUtils.nonZeroRandInt(-4, 4);
        const s = MathUtils.nonZeroRandInt(-4, 4);
        let c, d;
        do { c = MathUtils.nonZeroRandInt(-4, 4); } while (c === 0);
        do { d = MathUtils.nonZeroRandInt(-4, 4); } while (d === 0);

        // (r+si)(c+di) = (rc - sd) + (rd + sc)i
        const a = r * c - s * d;
        const b = r * d + s * c;

        const numerTex = `${a} ${b >= 0 ? '+' : '-'} ${Math.abs(b)}i`;
        const denomTex = `${c} ${d >= 0 ? '+' : '-'} ${Math.abs(d)}i`;

        // Denominator modulus squared
        const mod2 = c * c + d * d;
        // (a+bi)(c-di) real part = ac + bd
        const acbd = a * c + b * d;   // = r * mod2
        // Im part = bc - ad
        const bcad = b * c - a * d;   // = s * mod2

        return {
            type: 'free',
            rule: 'Division',
            difficulty: 'medium',
            text: `Divide the complex numbers below. Give the <strong>real part</strong> of the result.`,
            latex: `\\(\\dfrac{${numerTex}}{${denomTex}}\\)`,
            answer: r,
            answerTex: String(r),
            options: [],
            hintTex: [
                `\\text{Multiply top and bottom by the conjugate: } \\overline{${denomTex}} = ${c} ${-d >= 0 ? '+' : '-'} ${Math.abs(d)}i`,
                `\\text{Re}\\!\\left(\\frac{${numerTex}}{${denomTex}}\\right) = \\frac{ac + bd}{c^2 + d^2} = \\frac{${acbd}}{${mod2}} = ${r}`
            ],
            explain: `<strong>Step 1:</strong> Multiply numerator and denominator by the conjugate \\(${c} ${-d >= 0 ? '+' : '-'} ${Math.abs(d)}i\\):<br>` +
                     `\\(\\frac{(${numerTex})(${c} ${-d >= 0 ? '+' : '-'} ${Math.abs(d)}i)}{(${denomTex})(${c} ${-d >= 0 ? '+' : '-'} ${Math.abs(d)}i)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Denominator: \\(c^2 + d^2 = ${c}^2 + ${d}^2 = ${mod2}\\).<br><br>` +
                     `<strong>Step 3:</strong> Numerator real part: \\(ac + bd = (${a})(${c}) + (${b})(${d}) = ${acbd}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(\\text{Re}(z) = \\frac{${acbd}}{${mod2}} = ${r}\\).`
        };
    },

    /**
     * 9. qArgument - Medium (MC)
     * arg(z) for z in standard positions. Present as MC with 4 angle options.
     */
    qArgument() {
        const cases = [
            { re: 1,           im: 1,           argDeg: 45,   argTex: '45°',   zTex: '1 + i' },
            { re: -1,          im: 1,           argDeg: 135,  argTex: '135°',  zTex: '-1 + i' },
            { re: 1,           im: -1,          argDeg: -45,  argTex: '-45°',  zTex: '1 - i' },
            { re: -1,          im: -1,          argDeg: -135, argTex: '-135°', zTex: '-1 - i' },
            { re: 'sqrt(3)',    im: 1,           argDeg: 30,   argTex: '30°',   zTex: '\\sqrt{3} + i' },
            { re: 1,           im: 'sqrt(3)',   argDeg: 60,   argTex: '60°',   zTex: '1 + \\sqrt{3}\\,i' },
            { re: '-sqrt(3)',   im: 1,           argDeg: 150,  argTex: '150°',  zTex: '-\\sqrt{3} + i' },
            { re: 0,           im: 1,           argDeg: 90,   argTex: '90°',   zTex: 'i' },
            { re: 0,           im: -1,          argDeg: -90,  argTex: '-90°',  zTex: '-i' }
        ];

        const chosen = MathUtils.pick(cases);

        // Build 3 distractor angles from pool, avoiding duplicates
        const otherAngles = cases
            .filter(c => c.argTex !== chosen.argTex)
            .map(c => c.argTex);
        const shuffledOther = MathUtils.shuffle(otherAngles).slice(0, 3);

        const optionTexts = [chosen.argTex, ...shuffledOther];
        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: `\\text{${tex}}`
        }));

        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Argument',
            difficulty: 'medium',
            text: `Find \\(\\arg(z)\\) in degrees for the complex number below.`,
            latex: `\\(z = ${chosen.zTex}\\)`,
            answer: 1,
            answerTex: `\\text{${chosen.argTex}}`,
            options: shuffled,
            hintTex: [
                `\\arg(z) = \\arctan\\!\\left(\\frac{b}{a}\\right) \\text{, adjusted for the correct quadrant}`,
                `z = ${chosen.zTex} \\text{ lies in the correct quadrant for } \\arg(z) = ${chosen.argTex}`
            ],
            explain: `<strong>Step 1:</strong> Identify the real and imaginary parts of \\(z = ${chosen.zTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Use \\(\\arg(z) = \\arctan\\!\\left(\\frac{b}{a}\\right)\\), adjusted for the quadrant.<br><br>` +
                     `<strong>Step 3:</strong> \\(z = ${chosen.zTex}\\) gives \\(\\arg(z) = ${chosen.argTex}\\).`
        };
    },

    /**
     * 10. qPowerOfI - Easy (MC)
     * Find i^n for n∈{2,3,4,5,6,7,8}. Cycle: i¹=i, i²=-1, i³=-i, i⁴=1.
     */
    qPowerOfI() {
        const n = MathUtils.pick([2, 3, 4, 5, 6, 7, 8]);

        const cycle = ['i', '-1', '-i', '1'];
        const correctRaw = cycle[(n - 1) % 4];

        // All 4 cycle values as options
        const cycleOpts = ['i', '-1', '-i', '1'];
        const options = cycleOpts.map(tex => ({
            value: tex === correctRaw ? 1 : 0,
            tex: tex
        }));

        const shuffled = MathUtils.shuffle(options);

        const remainder = ((n - 1) % 4) + 1;

        return {
            type: 'mc',
            rule: 'Powers of i',
            difficulty: 'easy',
            text: `Evaluate the power of \\(i\\) below.`,
            latex: `\\(i^{${n}}\\)`,
            answer: 1,
            answerTex: correctRaw,
            options: shuffled,
            hintTex: [
                `i^1 = i,\\quad i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1 \\text{ (then repeats)}`,
                `${n} \\div 4 \\text{ leaves remainder } ${n % 4}, \\text{ so } i^{${n}} = i^{${n % 4 === 0 ? 4 : n % 4}} = ${correctRaw}`
            ],
            explain: `<strong>Step 1:</strong> Powers of \\(i\\) repeat with period 4:<br>` +
                     `\\(i^1 = i,\\quad i^2 = -1,\\quad i^3 = -i,\\quad i^4 = 1\\).<br><br>` +
                     `<strong>Step 2:</strong> Find \\(${n} \\mod 4 = ${n % 4}\\)${n % 4 === 0 ? ' (treat as 4)' : ''}.<br><br>` +
                     `<strong>Step 3:</strong> \\(i^{${n}} = i^{${n % 4 === 0 ? 4 : n % 4}} = ${correctRaw}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        // Indices: 0=Add, 1=Sub, 2=Mul, 3=Mod, 4=Conj, 5=Re, 6=Im, 7=Div, 8=Arg, 9=PowerI
        const pool = [
            { fn: () => COMPLEX_CART.qAddComplex(),      weight: 3, difficulty: 'easy'   }, // 0
            { fn: () => COMPLEX_CART.qSubtractComplex(), weight: 3, difficulty: 'easy'   }, // 1
            { fn: () => COMPLEX_CART.qMultiplyComplex(), weight: 2, difficulty: 'medium' }, // 2
            { fn: () => COMPLEX_CART.qModulus(),         weight: 3, difficulty: 'easy'   }, // 3
            { fn: () => COMPLEX_CART.qConjugate(),       weight: 3, difficulty: 'easy'   }, // 4
            { fn: () => COMPLEX_CART.qRealPart(),        weight: 2, difficulty: 'medium' }, // 5
            { fn: () => COMPLEX_CART.qImagPart(),        weight: 2, difficulty: 'medium' }, // 6
            { fn: () => COMPLEX_CART.qDivideComplex(),   weight: 2, difficulty: 'medium' }, // 7
            { fn: () => COMPLEX_CART.qArgument(),        weight: 1, difficulty: 'medium' }, // 8
            { fn: () => COMPLEX_CART.qPowerOfI(),        weight: 3, difficulty: 'easy'   }  // 9
        ];

        let filtered = pool;
        if (COMPLEX_CART.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 3, 4, 9].includes(i));
        } else if (COMPLEX_CART.level === 'medium') {
            filtered = pool.filter((_, i) => [2, 5, 6, 7, 8].includes(i));
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
        COMPLEX_CART.score = 0;
        COMPLEX_CART.total = 0;
        COMPLEX_CART.streak = 0;
        COMPLEX_CART.answered = false;
        COMPLEX_CART.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="COMPLEX_CART.unload()">Complex Numbers (1.11–1.12)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Complex Numbers</h1>
                <p>IB Math AA 1.11–1.12 — Cartesian form, operations and modulus</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="COMPLEX_CART.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="COMPLEX_CART.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="COMPLEX_CART.setLevel('medium')">Medium</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="cxyz-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="cxyz-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="cxyz-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="cxyz-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="cxyz-question-card">
                <span class="rule-tag" id="cxyz-rule"></span>
                <span class="difficulty-tag" id="cxyz-difficulty"></span>
                <div class="question-text" id="cxyz-text"></div>
                <div class="question-prompt" id="cxyz-latex"></div>
                <div id="cxyz-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="cxyz-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="cxyz-feedback">
                <div class="feedback-title" id="cxyz-feedback-title"></div>
                <div class="feedback-explanation" id="cxyz-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="cxyz-hint-btn" onclick="COMPLEX_CART.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="cxyz-next-btn" onclick="COMPLEX_CART.next()" style="display:none;">Next Question</button>
            </div>
        `;

        COMPLEX_CART.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        COMPLEX_CART.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        COMPLEX_CART.score = 0;
        COMPLEX_CART.total = 0;
        COMPLEX_CART.streak = 0;
        COMPLEX_CART.updateStats();
        COMPLEX_CART.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        COMPLEX_CART.answered = false;
        COMPLEX_CART.hintIndex = 0;
        COMPLEX_CART.currentQ = COMPLEX_CART.pickQuestion();
        const q = COMPLEX_CART.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('cxyz-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('cxyz-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('cxyz-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('cxyz-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('cxyz-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="COMPLEX_CART.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="cxyz-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')COMPLEX_CART.checkFree()">
                    <button class="btn btn-primary" onclick="COMPLEX_CART.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('cxyz-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('cxyz-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('cxyz-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('cxyz-next-btn').style.display = 'none';
        document.getElementById('cxyz-hint-btn').style.display = '';
        document.getElementById('cxyz-hint-btn').disabled = false;

        // Render KaTeX
        COMPLEX_CART.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = COMPLEX_CART.currentQ;
        if (!q || !q.hintTex || COMPLEX_CART.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('cxyz-hint-box');
        const hintContent = COMPLEX_CART.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[COMPLEX_CART.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        COMPLEX_CART.hintIndex++;

        if (COMPLEX_CART.hintIndex >= q.hintTex.length) {
            document.getElementById('cxyz-hint-btn').disabled = true;
        }

        COMPLEX_CART.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (COMPLEX_CART.answered) return;
        COMPLEX_CART.answered = true;
        COMPLEX_CART.total++;

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
            COMPLEX_CART.score++;
            COMPLEX_CART.streak++;
        } else {
            btn.classList.add('incorrect');
            COMPLEX_CART.streak = 0;
        }

        COMPLEX_CART.showFeedback(isCorrect);
        COMPLEX_CART.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (COMPLEX_CART.answered) return;

        const inp = document.getElementById('cxyz-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        COMPLEX_CART.answered = true;
        COMPLEX_CART.total++;
        inp.disabled = true;

        const q = COMPLEX_CART.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            COMPLEX_CART.score++;
            COMPLEX_CART.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            COMPLEX_CART.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        COMPLEX_CART.showFeedback(isCorrect);
        COMPLEX_CART.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = COMPLEX_CART.currentQ;
        const fb = document.getElementById('cxyz-feedback');
        const title = document.getElementById('cxyz-feedback-title');
        const explanation = document.getElementById('cxyz-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (COMPLEX_CART.streak > 1) {
                title.textContent = `Correct! (${COMPLEX_CART.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('cxyz-next-btn').style.display = '';
        document.getElementById('cxyz-hint-btn').style.display = 'none';

        COMPLEX_CART.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('cxyz-score');
        const totalEl  = document.getElementById('cxyz-total');
        const streakEl = document.getElementById('cxyz-streak');
        const accEl    = document.getElementById('cxyz-accuracy');

        if (scoreEl)  scoreEl.textContent  = COMPLEX_CART.score;
        if (totalEl)  totalEl.textContent  = COMPLEX_CART.total;
        if (streakEl) streakEl.textContent = COMPLEX_CART.streak;
        if (accEl) {
            accEl.textContent = COMPLEX_CART.total > 0
                ? Math.round((COMPLEX_CART.score / COMPLEX_CART.total) * 100) + '%'
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
                        { left: '$',  right: '$',   display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['complex-numbers-cartesian'] = () => COMPLEX_CART.load();
}
