/*
 * further-areas-volumes.js - IB Math AA 5.21: Areas & Volumes
 * Areas between curves and volumes of revolution
 */

const AREAS_VOL = {
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
     * 1. qAreaUnderLine - Easy (Free)
     * Area under f(x) = ax + b from 0 to c.
     * ∫[0 to c](ax+b)dx = ac²/2 + bc. Answer = integer.
     */
    qAreaUnderLine() {
        const a = MathUtils.pick([1, 2]);
        const b = MathUtils.pick([1, 2, 3]);
        const c = MathUtils.pick([2, 3, 4]);

        const answer = a * c * c / 2 + b * c;

        let fTex;
        if (a === 1) fTex = `x + ${b}`;
        else fTex = `${a}x + ${b}`;

        const term1Tex = a === 1 ? `\\frac{x^2}{2}` : `\\frac{${a}x^2}{2}`;
        const antideriv = `${term1Tex} + ${b}x`;
        const val1 = a * c * c / 2;
        const val2 = b * c;

        return {
            type: 'free',
            rule: 'Area Under Line',
            difficulty: 'easy',
            text: `Find the area under \\(f(x) = ${fTex}\\) from \\(x = 0\\) to \\(x = ${c}\\).`,
            latex: `\\(\\displaystyle A = \\int_0^{${c}} (${fTex})\\,dx\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `A = \\left[${antideriv}\\right]_0^{${c}}`,
                `= \\left(\\frac{${a}(${c})^2}{2} + ${b}(${c})\\right) - 0 = ${val1} + ${val2} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Integrate \\(f(x) = ${fTex}\\):<br>` +
                     `\\(\\displaystyle \\int (${fTex})\\,dx = ${antideriv} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate between \\(0\\) and \\(${c}\\):<br>` +
                     `\\(A = \\left[${antideriv}\\right]_0^{${c}} = \\left(${val1} + ${val2}\\right) - 0\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(A = ${answer}\\).`
        };
    },

    /**
     * 2. qAreaUnderParabola - Easy (Free)
     * Area under f(x) = ax² from 0 to c.
     * = ac³/3. Answer = integer or simple fraction.
     */
    qAreaUnderParabola() {
        const a = MathUtils.pick([1, 2, 3]);
        const c = MathUtils.pick([1, 2, 3]);

        const numerator = a * c * c * c;
        const denominator = 3;
        // Simplify fraction
        const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
        const g = gcd(numerator, denominator);
        const n = numerator / g;
        const d = denominator / g;

        const answer = numerator / denominator;
        const answerTex = d === 1 ? String(n) : `\\frac{${n}}{${d}}`;

        const fTex = a === 1 ? `x^2` : `${a}x^2`;
        const antiderivTex = a === 1 ? `\\frac{x^3}{3}` : `\\frac{${a}x^3}{3}`;

        return {
            type: 'free',
            rule: 'Area Under Parabola',
            difficulty: 'easy',
            text: `Find the area under \\(f(x) = ${fTex}\\) from \\(x = 0\\) to \\(x = ${c}\\). Give your answer to 2 d.p. if not an integer.`,
            latex: `\\(\\displaystyle A = \\int_0^{${c}} ${fTex}\\,dx\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\int ${fTex}\\,dx = ${antiderivTex} + C`,
                `A = \\left[${antiderivTex}\\right]_0^{${c}} = \\frac{${a}(${c})^3}{3} - 0 = \\frac{${numerator}}{3} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Integrate \\(f(x) = ${fTex}\\):<br>` +
                     `\\(\\displaystyle \\int ${fTex}\\,dx = ${antiderivTex} + C\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate between \\(0\\) and \\(${c}\\):<br>` +
                     `\\(A = \\left[${antiderivTex}\\right]_0^{${c}} = \\dfrac{${a} \\cdot ${c}^3}{3} - 0 = \\dfrac{${numerator}}{3}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(A = ${answerTex} \\approx ${answer.toFixed(2)}\\).`
        };
    },

    /**
     * 3. qAreaBetweenCurves - Medium (Free)
     * Area between f(x)=k and g(x)=x² from x=-√k to x=√k.
     * = (4/3)k^(3/2). Use k∈{1,4,9}.
     */
    qAreaBetweenCurves() {
        const k = MathUtils.pick([1, 4, 9]);
        const sqrtK = Math.sqrt(k);

        // Area = 2 * ∫[0 to √k](k - x²)dx = 2*[kx - x³/3] from 0 to √k
        // = 2*(k·√k - k^(3/2)/3) = 2*k^(3/2)*(1 - 1/3) = (4/3)*k^(3/2)
        const answer = (4 / 3) * Math.pow(k, 1.5);

        // Compute exact representations
        let answerTex;
        if (k === 1) answerTex = `\\frac{4}{3}`;
        else if (k === 4) answerTex = `\\frac{32}{3}`;
        else answerTex = `36`; // k=9: (4/3)*27 = 36

        const sqrtTex = sqrtK === Math.floor(sqrtK) ? String(sqrtK) : `\\sqrt{${k}}`;
        const lowerTex = `-${sqrtTex}`;

        return {
            type: 'free',
            rule: 'Area Between Curves',
            difficulty: 'medium',
            text: `Find the area enclosed between \\(f(x) = ${k}\\) and \\(g(x) = x^2\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle A = \\int_{${lowerTex}}^{${sqrtTex}} (${k} - x^2)\\,dx\\)`,
            answer: answer,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `\\text{Intersections: } x^2 = ${k} \\Rightarrow x = \\pm${sqrtTex}`,
                `A = \\left[${k}x - \\frac{x^3}{3}\\right]_{${lowerTex}}^{${sqrtTex}} = \\frac{4}{3} \\cdot ${k}^{3/2} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Find intersections: \\(x^2 = ${k} \\Rightarrow x = \\pm ${sqrtTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate \\((${k} - x^2)\\) from \\(${lowerTex}\\) to \\(${sqrtTex}\\):<br>` +
                     `\\(A = \\left[${k}x - \\dfrac{x^3}{3}\\right]_{${lowerTex}}^{${sqrtTex}}\\).<br><br>` +
                     `<strong>Step 3:</strong> By symmetry, \\(A = 2\\left(${k} \\cdot ${sqrtTex} - \\dfrac{${sqrtTex}^3}{3}\\right) = \\dfrac{4}{3} \\cdot ${k}^{3/2} = ${answerTex} \\approx ${answer.toFixed(4)}\\).`
        };
    },

    /**
     * 4. qAreaBetweenLine - Medium (Free)
     * Area between f(x)=x+2 and g(x)=x².
     * Intersect at x=-1, x=2; area = 9/2 = 4.5.
     * Extended: f(x)=ax+b with specific clean cases.
     */
    qAreaBetweenLine() {
        // Fixed clean cases: (a, b, x1, x2, area)
        // f = ax+b, g = x²; solve ax+b = x² → x²-ax-b=0
        // Using cases that give integer intersections and clean areas
        const cases = [
            // f=x+2, g=x²: x²-x-2=0→(x-2)(x+1)→x=-1,2; area=∫[-1,2](x+2-x²)dx=9/2
            { a: 1, b: 2, x1: -1, x2: 2, area: 4.5, areaTex: `\\frac{9}{2}` },
            // f=2x+3, g=x²: x²-2x-3=0→(x-3)(x+1)→x=-1,3; area=∫[-1,3](2x+3-x²)dx
            // =[x²+3x-x³/3]_{-1}^{3}=(9+9-9)-(1-3+1/3)=9-(-5/3)=9+5/3=32/3
            { a: 2, b: 3, x1: -1, x2: 3, area: 32 / 3, areaTex: `\\frac{32}{3}` },
            // f=x+6, g=x²: x²-x-6=0→(x-3)(x+2)→x=-2,3; area=∫[-2,3](x+6-x²)dx
            // =[x²/2+6x-x³/3]_{-2}^{3}=(9/2+18-9)-(2-12+8/3)=27/2-(-22/3)=27/2+22/3=81/6+44/6=125/6
            { a: 1, b: 6, x1: -2, x2: 3, area: 125 / 6, areaTex: `\\frac{125}{6}` },
        ];
        const chosen = MathUtils.pick(cases);
        const { a, b, x1, x2, area, areaTex } = chosen;

        const fTex = a === 1 ? `x + ${b}` : `${a}x + ${b}`;
        const diffTex = a === 1 ? `x + ${b} - x^2` : `${a}x + ${b} - x^2`;

        return {
            type: 'free',
            rule: 'Area: Line & Parabola',
            difficulty: 'medium',
            text: `Find the area of the region enclosed between \\(f(x) = ${fTex}\\) and \\(g(x) = x^2\\). Give your answer to 2 d.p.`,
            latex: `\\(\\displaystyle A = \\int_{${x1}}^{${x2}} (${diffTex})\\,dx\\)`,
            answer: area,
            answerTex: areaTex,
            options: [],
            hintTex: [
                `\\text{Set } ${fTex} = x^2 \\text{ to find intersections: } x = ${x1},\\, ${x2}`,
                `A = \\int_{${x1}}^{${x2}} (${diffTex})\\,dx = ${areaTex}`
            ],
            explain: `<strong>Step 1:</strong> Find intersections: set \\(${fTex} = x^2\\)<br>` +
                     `\\(x^2 - ${a === 1 ? '' : a}x - ${b} = 0 \\Rightarrow x = ${x1},\\; x = ${x2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Since \\(f(x) \\geq g(x)\\) on \\([${x1}, ${x2}]\\), integrate the difference:<br>` +
                     `\\(A = \\displaystyle\\int_{${x1}}^{${x2}} (${diffTex})\\,dx\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate: \\(A = ${areaTex} \\approx ${area.toFixed(2)}\\).`
        };
    },

    /**
     * 5. qVolumeRevX - Medium (Free)
     * V = π∫[0 to h] r² dx = πr²h (cylinder).
     * y = r (constant). Answer = π·r²·h to 4dp. Tol 0.1.
     */
    qVolumeRevX() {
        const r = MathUtils.pick([1, 2, 3]);
        const h = MathUtils.pick([1, 2, 3, 4]);

        const exact = Math.PI * r * r * h;
        const coeff = r * r * h;
        const answerTex = coeff === 1 ? `\\pi` : `${coeff}\\pi`;

        return {
            type: 'free',
            rule: 'Volume of Revolution (x-axis)',
            difficulty: 'medium',
            text: `Find the volume of the solid formed when \\(y = ${r}\\) is rotated \\(360°\\) about the \\(x\\)-axis from \\(x = 0\\) to \\(x = ${h}\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle V = \\pi \\int_0^{${h}} y^2\\,dx\\)`,
            answer: exact,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `V = \\pi \\int_0^{${h}} (${r})^2\\,dx = \\pi \\int_0^{${h}} ${r * r}\\,dx`,
                `V = \\pi \\left[${r * r}x\\right]_0^{${h}} = \\pi \\cdot ${r * r} \\cdot ${h} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Apply the volume of revolution formula:<br>` +
                     `\\(V = \\pi \\displaystyle\\int_0^{${h}} y^2\\,dx = \\pi \\int_0^{${h}} ${r * r}\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate:<br>` +
                     `\\(V = \\pi \\left[${r * r}x\\right]_0^{${h}} = \\pi \\cdot ${r * r} \\cdot ${h}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(V = ${answerTex} \\approx ${exact.toFixed(4)}\\).<br><br>` +
                     `<em>Note: This is the volume of a cylinder with radius \\(${r}\\) and height \\(${h}\\).</em>`
        };
    },

    /**
     * 6. qVolumeRevParabola - Hard (Free)
     * Revolving y = x² about x-axis from 0 to a.
     * V = π∫[0 to a] x⁴ dx = π·a⁵/5. Tol 0.01.
     */
    qVolumeRevParabola() {
        const a = MathUtils.pick([1, 2]);

        const a5 = Math.pow(a, 5);
        const exact = Math.PI * a5 / 5;

        let answerTex;
        if (a === 1) answerTex = `\\frac{\\pi}{5}`;
        else answerTex = `\\frac{${a5}\\pi}{5}`;

        return {
            type: 'free',
            rule: 'Volume: Revolving y = x²',
            difficulty: 'hard',
            text: `Find the volume of the solid formed when \\(y = x^2\\) is rotated \\(360°\\) about the \\(x\\)-axis from \\(x = 0\\) to \\(x = ${a}\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle V = \\pi \\int_0^{${a}} (x^2)^2\\,dx\\)`,
            answer: exact,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `V = \\pi \\int_0^{${a}} x^4\\,dx = \\pi \\left[\\frac{x^5}{5}\\right]_0^{${a}}`,
                `V = \\pi \\cdot \\frac{${a}^5}{5} = \\frac{${a5}\\pi}{5} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Apply the volume formula with \\(y^2 = (x^2)^2 = x^4\\):<br>` +
                     `\\(V = \\pi \\displaystyle\\int_0^{${a}} x^4\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate:<br>` +
                     `\\(V = \\pi \\left[\\dfrac{x^5}{5}\\right]_0^{${a}} = \\pi \\cdot \\dfrac{${a}^5}{5}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(V = ${answerTex} \\approx ${exact.toFixed(4)}\\).`
        };
    },

    /**
     * 7. qVolumeRevLinear - Medium (Free)
     * V = π∫[0 to h] (ax)² dx = πa²h³/3 (cone).
     * y = ax. Tol 0.01.
     */
    qVolumeRevLinear() {
        const a = MathUtils.pick([1, 2]);
        const h = MathUtils.pick([1, 2, 3]);

        const coeff = a * a;
        const h3 = h * h * h;
        const exact = Math.PI * coeff * h3 / 3;

        let answerTex;
        const num = coeff * h3;
        if (num === 3) {
            answerTex = `\\pi`;
        } else if (num % 3 === 0) {
            answerTex = `${num / 3}\\pi`;
        } else {
            answerTex = `\\frac{${num}\\pi}{3}`;
        }

        const fTex = a === 1 ? `x` : `${a}x`;

        return {
            type: 'free',
            rule: 'Volume: Revolving Linear',
            difficulty: 'medium',
            text: `Find the volume of the solid formed when \\(y = ${fTex}\\) is rotated \\(360°\\) about the \\(x\\)-axis from \\(x = 0\\) to \\(x = ${h}\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle V = \\pi \\int_0^{${h}} (${fTex})^2\\,dx\\)`,
            answer: exact,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `V = \\pi \\int_0^{${h}} ${coeff === 1 ? '' : coeff}x^2\\,dx = \\pi \\left[\\frac{${coeff === 1 ? '' : coeff}x^3}{3}\\right]_0^{${h}}`,
                `V = \\pi \\cdot \\frac{${coeff} \\cdot ${h}^3}{3} = \\frac{${num}\\pi}{3} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Apply the volume formula with \\(y^2 = (${fTex})^2 = ${coeff === 1 ? '' : coeff}x^2\\):<br>` +
                     `\\(V = \\pi \\displaystyle\\int_0^{${h}} ${coeff === 1 ? '' : coeff}x^2\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate:<br>` +
                     `\\(V = \\pi \\left[\\dfrac{${coeff === 1 ? '' : coeff}x^3}{3}\\right]_0^{${h}} = \\dfrac{${coeff} \\cdot ${h}^3 \\cdot \\pi}{3}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(V = ${answerTex} \\approx ${exact.toFixed(4)}\\).<br><br>` +
                     `<em>Note: This is the volume of a cone with radius \\(${a * h}\\) and height \\(${h}\\).</em>`
        };
    },

    /**
     * 8. qFindIntersections - Easy (Free)
     * Find the positive intersection of y = x² and y = ax.
     * x² = ax → x(x - a) = 0 → x = 0 or x = a. Answer = a.
     */
    qFindIntersections() {
        const a = MathUtils.pick([2, 3, 4, 5, 6]);

        return {
            type: 'free',
            rule: 'Find Intersections',
            difficulty: 'easy',
            text: `Find the positive \\(x\\)-coordinate where \\(y = x^2\\) and \\(y = ${a}x\\) intersect.`,
            latex: `\\text{Solve } x^2 = ${a}x \\text{ for } x > 0`,
            answer: a,
            answerTex: String(a),
            options: [],
            hintTex: [
                `x^2 = ${a}x \\Rightarrow x^2 - ${a}x = 0 \\Rightarrow x(x - ${a}) = 0`,
                `x = 0 \\text{ or } x = ${a} \\quad \\Rightarrow \\text{positive solution: } x = ${a}`
            ],
            explain: `<strong>Step 1:</strong> Set the two expressions equal:<br>` +
                     `\\(x^2 = ${a}x\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange and factor:<br>` +
                     `\\(x^2 - ${a}x = 0 \\Rightarrow x(x - ${a}) = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Solutions are \\(x = 0\\) and \\(x = ${a}\\). The positive intersection is \\(x = ${a}\\).`
        };
    },

    /**
     * 9. qAreaFromIntersection - Hard (Free)
     * Area between y = kx and y = x².
     * Intersect at x=0 and x=k; area = k³/6.
     * k∈{1,2,3}: k=1→1/6, k=2→4/3, k=3→9/2.
     */
    qAreaFromIntersection() {
        const k = MathUtils.pick([1, 2, 3]);

        const area = Math.pow(k, 3) / 6;

        let areaTex;
        if (k === 1) areaTex = `\\frac{1}{6}`;
        else if (k === 2) areaTex = `\\frac{4}{3}`;
        else areaTex = `\\frac{9}{2}`;

        const fTex = k === 1 ? `x` : `${k}x`;

        return {
            type: 'free',
            rule: 'Area from Intersection',
            difficulty: 'hard',
            text: `Find the area of the region enclosed between \\(y = ${fTex}\\) and \\(y = x^2\\). Give your answer to 4 d.p.`,
            latex: `\\(\\displaystyle A = \\int_0^{${k}} (${fTex} - x^2)\\,dx\\)`,
            answer: area,
            answerTex: areaTex,
            options: [],
            hintTex: [
                `\\text{Intersections: } x^2 = ${fTex} \\Rightarrow x = 0,\\; x = ${k}`,
                `A = \\left[\\frac{${k}x^2}{2} - \\frac{x^3}{3}\\right]_0^{${k}} = \\frac{${k}^3}{2} - \\frac{${k}^3}{3} = \\frac{${k}^3}{6} = ${areaTex}`
            ],
            explain: `<strong>Step 1:</strong> Find intersections: set \\(${fTex} = x^2\\)<br>` +
                     `\\(x^2 - ${fTex} = 0 \\Rightarrow x(x - ${k}) = 0 \\Rightarrow x = 0,\\; x = ${k}\\).<br><br>` +
                     `<strong>Step 2:</strong> Since \\(${fTex} \\geq x^2\\) on \\([0, ${k}]\\), integrate the difference:<br>` +
                     `\\(A = \\displaystyle\\int_0^{${k}} (${fTex} - x^2)\\,dx\\).<br><br>` +
                     `<strong>Step 3:</strong> Evaluate:<br>` +
                     `\\(A = \\left[\\dfrac{${k}x^2}{2} - \\dfrac{x^3}{3}\\right]_0^{${k}} = \\dfrac{${k}^3}{2} - \\dfrac{${k}^3}{3} = \\dfrac{${k}^3}{6} = ${areaTex} \\approx ${area.toFixed(4)}\\).`
        };
    },

    /**
     * 10. qVolumeRevExp - Hard (Free)
     * V = π∫[0 to 1] e^(2kx) dx = π·(e^(2k) - 1)/(2k).
     * k=1: π(e²-1)/2 ≈ 10.036. k=2: π(e⁴-1)/4 ≈ 42.696.
     * Tol 0.05. Answer to 3dp.
     */
    qVolumeRevExp() {
        const k = MathUtils.pick([1, 2]);

        const e2k = Math.exp(2 * k);
        const exact = Math.PI * (e2k - 1) / (2 * k);

        const expTex = k === 1 ? `e^{2x}` : `e^{${2 * k}x}`;
        const yTex = k === 1 ? `e^x` : `e^{${k}x}`;
        const antiderivTex = k === 1 ? `\\frac{e^{2x}}{2}` : `\\frac{e^{${2 * k}x}}{${2 * k}}`;
        const answerTex = k === 1
            ? `\\frac{\\pi(e^2 - 1)}{2}`
            : `\\frac{\\pi(e^4 - 1)}{4}`;

        return {
            type: 'free',
            rule: 'Volume: Revolving Exponential',
            difficulty: 'hard',
            text: `Find the volume of the solid formed when \\(y = ${yTex}\\) is rotated \\(360°\\) about the \\(x\\)-axis from \\(x = 0\\) to \\(x = 1\\). Give your answer to 3 d.p.`,
            latex: `\\(\\displaystyle V = \\pi \\int_0^1 ${expTex}\\,dx\\)`,
            answer: exact,
            answerTex: answerTex,
            options: [],
            hintTex: [
                `V = \\pi \\int_0^1 ${expTex}\\,dx = \\pi \\left[${antiderivTex}\\right]_0^1`,
                `V = \\pi \\left(\\frac{e^{${2 * k}}}{${2 * k}} - \\frac{1}{${2 * k}}\\right) = \\frac{\\pi(e^{${2 * k}} - 1)}{${2 * k}} = ${answerTex}`
            ],
            explain: `<strong>Step 1:</strong> Apply the volume formula with \\(y^2 = (${yTex})^2 = ${expTex}\\):<br>` +
                     `\\(V = \\pi \\displaystyle\\int_0^1 ${expTex}\\,dx\\).<br><br>` +
                     `<strong>Step 2:</strong> Integrate using \\(\\displaystyle\\int e^{ax}\\,dx = \\frac{e^{ax}}{a}\\):<br>` +
                     `\\(V = \\pi \\left[${antiderivTex}\\right]_0^1 = \\pi \\left(\\dfrac{e^{${2 * k}}}{${2 * k}} - \\dfrac{1}{${2 * k}}\\right)\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(V = ${answerTex} \\approx ${exact.toFixed(3)}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => AREAS_VOL.qAreaUnderLine(),        weight: 3, difficulty: 'easy'   },
            { fn: () => AREAS_VOL.qAreaUnderParabola(),    weight: 3, difficulty: 'easy'   },
            { fn: () => AREAS_VOL.qAreaBetweenCurves(),    weight: 2, difficulty: 'medium' },
            { fn: () => AREAS_VOL.qAreaBetweenLine(),      weight: 2, difficulty: 'medium' },
            { fn: () => AREAS_VOL.qVolumeRevX(),           weight: 2, difficulty: 'medium' },
            { fn: () => AREAS_VOL.qVolumeRevParabola(),    weight: 1, difficulty: 'hard'   },
            { fn: () => AREAS_VOL.qVolumeRevLinear(),      weight: 2, difficulty: 'medium' },
            { fn: () => AREAS_VOL.qFindIntersections(),    weight: 3, difficulty: 'easy'   },
            { fn: () => AREAS_VOL.qAreaFromIntersection(), weight: 1, difficulty: 'hard'   },
            { fn: () => AREAS_VOL.qVolumeRevExp(),         weight: 1, difficulty: 'hard'   }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (AREAS_VOL.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (AREAS_VOL.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (AREAS_VOL.level === 'hard') {
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
        AREAS_VOL.score = 0;
        AREAS_VOL.total = 0;
        AREAS_VOL.streak = 0;
        AREAS_VOL.answered = false;
        AREAS_VOL.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="AREAS_VOL.unload()">Areas &amp; Volumes (5.21)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Areas &amp; Volumes</h1>
                <p>IB Math AA 5.21 &ndash; Areas between curves and volumes of revolution</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="AREAS_VOL.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="AREAS_VOL.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="AREAS_VOL.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="AREAS_VOL.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="av-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="av-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="av-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="av-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="av-question-card">
                <span class="rule-tag" id="av-rule"></span>
                <span class="difficulty-tag" id="av-difficulty"></span>
                <div class="question-text" id="av-text"></div>
                <div class="question-prompt" id="av-latex"></div>
                <div id="av-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="av-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="av-feedback">
                <div class="feedback-title" id="av-feedback-title"></div>
                <div class="feedback-explanation" id="av-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="av-hint-btn" onclick="AREAS_VOL.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="av-next-btn" onclick="AREAS_VOL.next()" style="display:none;">Next Question</button>
            </div>
        `;

        AREAS_VOL.next();
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
        AREAS_VOL.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        AREAS_VOL.score = 0;
        AREAS_VOL.total = 0;
        AREAS_VOL.streak = 0;
        AREAS_VOL.updateStats();
        AREAS_VOL.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        AREAS_VOL.answered = false;
        AREAS_VOL.hintIndex = 0;
        AREAS_VOL.currentQ = AREAS_VOL.pickQuestion();
        const q = AREAS_VOL.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('av-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('av-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('av-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('av-latex').innerHTML = q.latex;

        // Options area — all questions in this trainer are free-response
        const optArea = document.getElementById('av-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="AREAS_VOL.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="av-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')AREAS_VOL.checkFree()">
                    <button class="btn btn-primary" onclick="AREAS_VOL.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('av-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('av-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('av-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('av-next-btn').style.display = 'none';
        document.getElementById('av-hint-btn').style.display = '';
        document.getElementById('av-hint-btn').disabled = false;

        // Render KaTeX
        AREAS_VOL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = AREAS_VOL.currentQ;
        if (!q || !q.hintTex || AREAS_VOL.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('av-hint-box');
        const hintContent = AREAS_VOL.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[AREAS_VOL.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        AREAS_VOL.hintIndex++;

        if (AREAS_VOL.hintIndex >= q.hintTex.length) {
            document.getElementById('av-hint-btn').disabled = true;
        }

        AREAS_VOL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (AREAS_VOL.answered) return;
        AREAS_VOL.answered = true;
        AREAS_VOL.total++;

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
            AREAS_VOL.score++;
            AREAS_VOL.streak++;
        } else {
            btn.classList.add('incorrect');
            AREAS_VOL.streak = 0;
        }

        AREAS_VOL.showFeedback(isCorrect);
        AREAS_VOL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (AREAS_VOL.answered) return;

        const inp = document.getElementById('av-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        AREAS_VOL.answered = true;
        AREAS_VOL.total++;
        inp.disabled = true;

        const q = AREAS_VOL.currentQ;

        // Use per-question tolerance if defined, else default 0.01
        const tol = q.tol !== undefined ? q.tol : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            AREAS_VOL.score++;
            AREAS_VOL.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            AREAS_VOL.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        AREAS_VOL.showFeedback(isCorrect);
        AREAS_VOL.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = AREAS_VOL.currentQ;
        const fb = document.getElementById('av-feedback');
        const title = document.getElementById('av-feedback-title');
        const explanation = document.getElementById('av-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (AREAS_VOL.streak > 1) {
                title.textContent = `Correct! (${AREAS_VOL.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('av-next-btn').style.display = '';
        document.getElementById('av-hint-btn').style.display = 'none';

        AREAS_VOL.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('av-score');
        const totalEl = document.getElementById('av-total');
        const streakEl = document.getElementById('av-streak');
        const accEl = document.getElementById('av-accuracy');

        if (scoreEl) scoreEl.textContent = AREAS_VOL.score;
        if (totalEl) totalEl.textContent = AREAS_VOL.total;
        if (streakEl) streakEl.textContent = AREAS_VOL.streak;
        if (accEl) {
            accEl.textContent = AREAS_VOL.total > 0
                ? Math.round((AREAS_VOL.score / AREAS_VOL.total) * 100) + '%'
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

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['further-areas-volumes'] = () => AREAS_VOL.load();
