/*
 * optimisation.js - IB Math AA 5.8: Optimisation
 * Finding maximum and minimum values
 */

const OPTIMISATION = {
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
     * 1. qMaxRectArea - Easy (Free response)
     * Rectangle with fixed perimeter P=2(l+w). l+w=k=P/2.
     * Area=l(k-l). Max at l=k/2, max area=k²/4 (integer).
     */
    qMaxRectArea() {
        const Pvals = [20, 24, 28, 32, 40];
        const P = MathUtils.pick(Pvals);
        const k = P / 2;           // l + w = k
        const maxArea = (k * k) / 4;  // integer since k is even

        return {
            type: 'free',
            rule: 'Max Rectangle Area',
            difficulty: 'easy',
            text: `A rectangle has a fixed perimeter of \\(${P}\\) cm. Find the maximum possible area of the rectangle.`,
            latex: `\\text{Perimeter } = ${P} \\text{ cm. Give your answer in cm}^2.`,
            answer: maxArea,
            answerTex: String(maxArea),
            options: [],
            hintTex: [
                `\\text{Let } l + w = ${k}. \\text{ Then } A = l(${k} - l).`,
                `\\frac{dA}{dl} = ${k} - 2l = 0 \\implies l = ${k / 2}, \\; A_{\\max} = ${k / 2} \\times ${k / 2} = ${maxArea}`
            ],
            explain: `<strong>Step 1:</strong> Since \\(P = 2(l + w) = ${P}\\), we have \\(l + w = ${k}\\), so \\(w = ${k} - l\\).<br><br>` +
                     `<strong>Step 2:</strong> Area \\(A = l \\cdot w = l(${k} - l) = ${k}l - l^2\\).<br><br>` +
                     `<strong>Step 3:</strong> Differentiate: \\(\\frac{dA}{dl} = ${k} - 2l\\). Set equal to zero: \\(l = ${k / 2}\\).<br><br>` +
                     `<strong>Step 4:</strong> Since \\(\\frac{d^2A}{dl^2} = -2 < 0\\), this is a maximum.<br><br>` +
                     `<strong>Step 5:</strong> \\(A_{\\max} = ${k / 2} \\times ${k / 2} = ${maxArea}\\) cm².`
        };
    },

    /**
     * 2. qMinFenceLength - Medium (Free response)
     * Given fixed area A, minimise fence = l + 2w (three sides against wall).
     * l = A/w, so fence = A/w + 2w. Min at w = √(A/2), min fence = 2√(2A).
     * A ∈ {8,18,32,50} → answers are clean integers.
     */
    qMinFenceLength() {
        // A=8→w=2, fence=8; A=18→w=3, fence=12; A=32→w=4, fence=16; A=50→w=5, fence=20
        const cases = [
            { A: 8,  wOpt: 2, minFence: 8  },
            { A: 18, wOpt: 3, minFence: 12 },
            { A: 32, wOpt: 4, minFence: 16 },
            { A: 50, wOpt: 5, minFence: 20 }
        ];
        const { A, wOpt, minFence } = MathUtils.pick(cases);
        const lOpt = A / wOpt;

        return {
            type: 'free',
            rule: 'Min Fence Length',
            difficulty: 'medium',
            text: `A rectangular enclosure of area \\(${A}\\) m² is built against a long wall. Only three sides need fencing (two widths and one length). Find the minimum total length of fencing required.`,
            latex: `\\text{Give your answer in metres.}`,
            answer: minFence,
            answerTex: String(minFence),
            options: [],
            hintTex: [
                `\\text{Fence} = l + 2w \\text{ and } lw = ${A}, \\text{ so } l = \\frac{${A}}{w}.`,
                `F(w) = \\frac{${A}}{w} + 2w. \\quad F'(w) = -\\frac{${A}}{w^2} + 2 = 0 \\implies w = \\sqrt{\\frac{${A}}{2}} = ${wOpt}`
            ],
            explain: `<strong>Step 1:</strong> Let the width be \\(w\\) and length \\(l\\). Area: \\(lw = ${A}\\), so \\(l = \\frac{${A}}{w}\\).<br><br>` +
                     `<strong>Step 2:</strong> Total fence \\(F = l + 2w = \\frac{${A}}{w} + 2w\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(F'(w) = -\\frac{${A}}{w^2} + 2 = 0 \\implies w^2 = ${A / 2} \\implies w = ${wOpt}\\) m.<br><br>` +
                     `<strong>Step 4:</strong> \\(F''(w) = \\frac{${2 * A}}{w^3} > 0\\), confirming a minimum.<br><br>` +
                     `<strong>Step 5:</strong> \\(l = \\frac{${A}}{${wOpt}} = ${lOpt}\\) m, so \\(F_{\\min} = ${lOpt} + 2(${wOpt}) = ${minFence}\\) m.`
        };
    },

    /**
     * 3. qMaxVolBox - Hard (MC)
     * Square sheet of side 2L. Squares of side x cut from corners, folded up.
     * V(x) = (2L-2x)²x. dV/dx = 0 → x = L/3. Max vol = 16L³/27.
     * L ∈ {3, 6, 9}.
     */
    qMaxVolBox() {
        const Lvals = [3, 6, 9];
        const L = MathUtils.pick(Lvals);
        const side = 2 * L;
        const xOpt = L / 3;   // integer since L ∈ {3,6,9}
        const volMax = Math.round(16 * L * L * L / 27); // integer for these L

        // Generate 4 MC options for x
        const correctTex = String(xOpt);

        // Distractors: common errors
        const d1 = L / 4;   // wrong factor
        const d2 = L / 2;   // sets x = half instead of third
        const d3 = L / 6;   // off by factor

        const optionTexts = [correctTex];
        for (const d of [d1, d2, d3]) {
            const t = Number.isInteger(d) ? String(d) : String(Math.round(d * 100) / 100);
            if (!optionTexts.includes(t)) optionTexts.push(t);
        }
        while (optionTexts.length < 4) {
            const extra = String(xOpt + optionTexts.length);
            if (!optionTexts.includes(extra)) optionTexts.push(extra);
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Max Volume Box',
            difficulty: 'hard',
            text: `A square sheet of card of side \\(${side}\\) cm has squares of side \\(x\\) cut from each corner. The card is folded to form an open box. Find the value of \\(x\\) that maximises the volume.`,
            latex: `V(x) = (${side} - 2x)^2 x`,
            answer: 1,
            answerTex: `x = ${xOpt}`,
            options: shuffled,
            hintTex: [
                `V(x) = (${side} - 2x)^2 x. \\quad \\frac{dV}{dx} = (${side} - 2x)(${side} - 6x) = 0`,
                `x = ${L} \\text{ (rejected, gives zero volume) or } x = \\frac{${L}}{3} = ${xOpt}`
            ],
            explain: `<strong>Step 1:</strong> Volume \\(V(x) = (${side} - 2x)^2 x\\).<br><br>` +
                     `<strong>Step 2:</strong> Expand and differentiate:<br>` +
                     `\\(\\frac{dV}{dx} = (${side} - 2x)^2 + x \\cdot 2(${side} - 2x)(-2)\\)<br>` +
                     `\\(= (${side} - 2x)[(${side} - 2x) - 4x] = (${side} - 2x)(${side} - 6x)\\).<br><br>` +
                     `<strong>Step 3:</strong> Set equal to zero: \\(x = ${L}\\) (rejected — gives zero volume) or \\(x = \\frac{${L}}{3} = ${xOpt}\\).<br><br>` +
                     `<strong>Step 4:</strong> Check second derivative confirms maximum. Max volume \\(= ${volMax}\\) cm³.`
        };
    },

    /**
     * 4. qCriticalPoints - Easy (Free response)
     * f(x) = ax³ + bx² + cx. f'(x) = 3ax² + 2bx + c = 0.
     * Choose roots r1=0 and r2=positive integer, so f'(x)=3a·x(x-r2).
     * Answer = positive critical point r2.
     */
    qCriticalPoints() {
        const aVals = [1, 2, 1, 1];
        const a = MathUtils.pick(aVals);
        const r2 = MathUtils.randInt(2, 6);   // positive root of f'

        // f'(x) = 3a·x(x - r2) = 3a·x² - 3a·r2·x
        // Compare with 3ax² + 2bx + c:
        //   2b = -3a·r2 → b = -3a·r2/2  (need b integer → a must be even when r2 is odd)
        // To guarantee integer b: if r2 is odd, use a=2; if r2 is even, a can be 1.
        const aFinal = (r2 % 2 !== 0) ? 2 : 1;
        const b = -3 * aFinal * r2 / 2;  // now integer
        const c = 0;  // f'(0)=0 is the zero root

        // Build polynomial string for display
        function termTex(coef, power) {
            if (coef === 0) return '';
            let c2 = coef === 1 ? '' : coef === -1 ? '-' : String(coef);
            if (power === 0) return String(coef);
            if (power === 1) return `${c2}x`;
            return `${c2}x^${power}`;
        }

        const t3 = aFinal === 1 ? 'x^3' : `${aFinal}x^3`;
        const t2 = b > 0 ? ` + ${b === 1 ? '' : b}x^2` : ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x^2`;
        const fTex = `f(x) = ${t3}${t2}`;

        const fp3 = 3 * aFinal;
        const fp2 = 2 * b;
        const fp3Tex = fp3 === 1 ? '' : String(fp3);
        const fp2Tex = fp2 > 0 ? ` + ${fp2}x` : ` - ${Math.abs(fp2)}x`;
        const fpTex = `f'(x) = ${fp3Tex}x^2${fp2Tex}`;

        return {
            type: 'free',
            rule: 'Critical Points',
            difficulty: 'easy',
            text: `Find the positive critical point of the function below.`,
            latex: `\\(${fTex}\\)`,
            answer: r2,
            answerTex: String(r2),
            options: [],
            hintTex: [
                `${fpTex} = 0`,
                `${fp3}x(x - ${r2}) = 0 \\implies x = 0 \\text{ or } x = ${r2}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate: \\(${fpTex}\\).<br><br>` +
                     `<strong>Step 2:</strong> Factor: \\(${fp3}x(x - ${r2}) = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Critical points at \\(x = 0\\) and \\(x = ${r2}\\).<br><br>` +
                     `<strong>Answer:</strong> The positive critical point is \\(x = ${r2}\\).`
        };
    },

    /**
     * 5. qClassifyMinimum - Medium (MC)
     * f(x) = ax³ + bx² + cx + d. Two stationary x values given.
     * f''(x) = 6ax + 2b. f'' > 0 → local min.
     */
    qClassifyMinimum() {
        // Use f'(x) = 3a(x-r1)(x-r2) with r1 < r2, both integers
        const r1 = MathUtils.randInt(-4, -1);
        const r2 = MathUtils.randInt(1, 4);
        const a = MathUtils.pick([1, 2]);

        // f'(x) = 3a(x-r1)(x-r2) = 3a[x² - (r1+r2)x + r1*r2]
        // f''(x) = 3a(2x - (r1+r2)) = 6ax - 3a(r1+r2)
        const fppa = 6 * a;
        const fppB = -3 * a * (r1 + r2);

        const fppR1 = fppa * r1 + fppB;  // f''(r1)
        const fppR2 = fppa * r2 + fppB;  // f''(r2)

        // Local min where f'' > 0
        const minX = fppR2 > 0 ? r2 : r1;  // r2 always gives f''>0 when a>0
        const maxX = fppR2 > 0 ? r1 : r2;

        // Build f'' tex
        const fppATex = fppa === 1 ? '' : String(fppa);
        const fppBVal = fppB;
        const fppBTex = fppBVal >= 0 ? ` + ${fppBVal}` : ` - ${Math.abs(fppBVal)}`;
        const fppTex = `f''(x) = ${fppATex}x${fppBTex}`;

        // MC options: the four x-values (r1, r2, two distractors)
        const correctTex = `x = ${minX}`;
        const d1Tex = `x = ${maxX}`;
        const d2Tex = `x = ${r1 + r2}`;     // sum of roots — common error
        const d3Tex = `x = ${Math.round((r1 + r2) / 2)}`; // midpoint

        const optionTexts = [correctTex];
        for (const d of [d1Tex, d2Tex, d3Tex]) {
            if (!optionTexts.includes(d)) optionTexts.push(d);
        }
        while (optionTexts.length < 4) {
            const extra = `x = ${minX + optionTexts.length}`;
            if (!optionTexts.includes(extra)) optionTexts.push(extra);
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Classify Minimum',
            difficulty: 'medium',
            text: `A function has stationary points at \\(x = ${r1}\\) and \\(x = ${r2}\\). Its second derivative is \\(${fppTex}\\). Which stationary point is a local minimum?`,
            latex: '',
            answer: 1,
            answerTex: `x = ${minX}`,
            options: shuffled,
            hintTex: [
                `\\text{Local min} \\Leftrightarrow f''(x) > 0 \\text{ at that point}`,
                `f''(${r1}) = ${fppR1} \\quad f''(${r2}) = ${fppR2}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate \\(f''\\) at each stationary point.<br><br>` +
                     `<strong>Step 2:</strong> \\(f''(${r1}) = ${fppa}(${r1}) + ${fppB} = ${fppR1}\\) — ` +
                     (fppR1 < 0 ? 'negative, so <strong>local maximum</strong>.' : 'positive, so <strong>local minimum</strong>.') + `<br><br>` +
                     `<strong>Step 3:</strong> \\(f''(${r2}) = ${fppa}(${r2}) + ${fppB} = ${fppR2}\\) — ` +
                     (fppR2 < 0 ? 'negative, so <strong>local maximum</strong>.' : 'positive, so <strong>local minimum</strong>.') + `<br><br>` +
                     `<strong>Answer:</strong> The local minimum is at \\(x = ${minX}\\).`
        };
    },

    /**
     * 6. qGlobalMax - Medium (Free response)
     * f(x) = ax² + bx + c on closed interval [p, q].
     * Evaluate at endpoints and vertex. Answer = largest value (integer).
     */
    qGlobalMax() {
        // Use downward parabola (a<0) so vertex is a max candidate inside interval
        const a = MathUtils.pick([-1, -2, -1, -3]);
        const b = MathUtils.pick([-6, -4, 2, 4, 6]);
        const c = MathUtils.randInt(0, 10);

        // Vertex x = -b/(2a)
        const vertX = -b / (2 * a);  // rational; keep as fraction display
        const vertXNum = -b;
        const vertXDen = 2 * a;

        // Choose interval around vertex so vertex is inside [p,q]
        const p = Math.floor(vertX) - MathUtils.randInt(1, 3);
        const q = Math.ceil(vertX) + MathUtils.randInt(1, 3);

        function fVal(x) { return a * x * x + b * x + c; }

        const fp = fVal(p);
        const fq = fVal(q);
        const fvert = fVal(vertX);

        const globalMax = Math.max(fp, fq, fvert);
        // Round to handle floating point
        const globalMaxR = Math.round(globalMax);

        // Build polynomial tex
        const aTex = a === -1 ? '-' : a === 1 ? '' : String(a);
        const bTex = b >= 0 ? ` + ${b === 1 ? '' : b === -1 ? '-' : b}x` : ` - ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;
        const cTex = c > 0 ? ` + ${c}` : c < 0 ? ` - ${Math.abs(c)}` : '';
        const fTex = `f(x) = ${aTex}x^2${bTex}${cTex}`;

        const vertXTeX = Number.isInteger(vertX) ? String(vertX) : MathUtils.fractionTeX(vertXNum, vertXDen);

        return {
            type: 'free',
            rule: 'Global Maximum',
            difficulty: 'medium',
            text: `Find the maximum value of \\(${fTex}\\) on the closed interval \\([${p},\\,${q}]\\).`,
            latex: `\\text{Give your answer as an integer.}`,
            answer: globalMaxR,
            answerTex: String(globalMaxR),
            options: [],
            hintTex: [
                `\\text{Check: endpoints } f(${p}), f(${q}) \\text{ and vertex at } x = ${vertXTeX}`,
                `f(${p}) = ${fp}, \\quad f(${q}) = ${fq}, \\quad f\\!\\left(${vertXTeX}\\right) = ${globalMaxR}`
            ],
            explain: `<strong>Step 1:</strong> Vertex at \\(x = -\\frac{b}{2a} = ${vertXTeX}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate at endpoints and vertex:<br>` +
                     `\\(f(${p}) = ${a}(${p})^2 + ${b}(${p}) + ${c} = ${fp}\\)<br>` +
                     `\\(f(${q}) = ${a}(${q})^2 + ${b}(${q}) + ${c} = ${fq}\\)<br>` +
                     `\\(f\\!\\left(${vertXTeX}\\right) = ${globalMaxR}\\)<br><br>` +
                     `<strong>Step 3:</strong> The global maximum is \\(${globalMaxR}\\).`
        };
    },

    /**
     * 7. qMaxRevenue - Medium (Free response)
     * R(p) = p(A - Bp). Optimal price p* = A/(2B). Integer answer.
     * A ∈ {100,200,400}, B ∈ {1,2,4}.
     */
    qMaxRevenue() {
        const combos = [
            { A: 100, B: 1 },
            { A: 100, B: 2 },
            { A: 200, B: 1 },
            { A: 200, B: 2 },
            { A: 200, B: 4 },
            { A: 400, B: 2 },
            { A: 400, B: 4 }
        ];
        const { A, B } = MathUtils.pick(combos);
        const pOpt = A / (2 * B);       // integer for all combos
        const maxR = A * A / (4 * B);   // integer for all combos

        return {
            type: 'free',
            rule: 'Max Revenue',
            difficulty: 'medium',
            text: `A company sells \\(q = ${A} - ${B}p\\) units at price \\(p\\). Revenue is \\(R(p) = p(${A} - ${B}p)\\). Find the price \\(p\\) that maximises revenue.`,
            latex: `\\text{Give the optimal price as an integer.}`,
            answer: pOpt,
            answerTex: String(pOpt),
            options: [],
            hintTex: [
                `R(p) = ${A}p - ${B}p^2. \\quad R'(p) = ${A} - ${2 * B}p`,
                `${A} - ${2 * B}p = 0 \\implies p = \\frac{${A}}{${2 * B}} = ${pOpt}`
            ],
            explain: `<strong>Step 1:</strong> Expand: \\(R(p) = ${A}p - ${B}p^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Differentiate: \\(R'(p) = ${A} - ${2 * B}p\\).<br><br>` +
                     `<strong>Step 3:</strong> Set \\(R'(p) = 0\\): \\(p = \\frac{${A}}{${2 * B}} = ${pOpt}\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(R''(p) = -${2 * B} < 0\\), confirming a maximum.<br><br>` +
                     `<strong>Answer:</strong> Optimal price \\(p = ${pOpt}\\), giving max revenue \\(R = ${maxR}\\).`
        };
    },

    /**
     * 8. qMinCostCylinder - Hard (MC)
     * Fixed volume V = πr²h. Surface area S = 2πr² + 2πrh = 2πr² + 2V/r.
     * dS/dr = 4πr - 2V/r² = 0 → r³ = V/(2π).
     * V=2π→r=1, V=16π→r=2, V=54π→r=3.
     */
    qMinCostCylinder() {
        const cases = [
            { Vcoef: 2,  rOpt: 1 },
            { Vcoef: 16, rOpt: 2 },
            { Vcoef: 54, rOpt: 3 }
        ];
        const { Vcoef, rOpt } = MathUtils.pick(cases);

        // h = V/(πr²) = Vcoef π / (π r²) = Vcoef/r²
        const hOpt = Vcoef / (rOpt * rOpt);

        const correctTex = `r = ${rOpt}`;

        // Distractors
        const d1 = rOpt + 1;
        const d2 = rOpt - 1 > 0 ? rOpt - 1 : rOpt + 2;
        const d3 = rOpt + 3;

        const optionTexts = [correctTex];
        for (const d of [d1, d2, d3]) {
            const t = `r = ${d}`;
            if (!optionTexts.includes(t)) optionTexts.push(t);
        }
        while (optionTexts.length < 4) {
            const extra = `r = ${rOpt + optionTexts.length + 1}`;
            if (!optionTexts.includes(extra)) optionTexts.push(extra);
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Min Surface Cylinder',
            difficulty: 'hard',
            text: `A closed cylinder has volume \\(V = ${Vcoef}\\pi\\) cm³. Find the radius \\(r\\) (in cm) that minimises the total surface area.`,
            latex: `S = 2\\pi r^2 + 2\\pi r h`,
            answer: 1,
            answerTex: `r = ${rOpt}`,
            options: shuffled,
            hintTex: [
                `h = \\frac{${Vcoef}\\pi}{\\pi r^2} = \\frac{${Vcoef}}{r^2}. \\quad S(r) = 2\\pi r^2 + \\frac{${2 * Vcoef}\\pi}{r}`,
                `S'(r) = 4\\pi r - \\frac{${2 * Vcoef}\\pi}{r^2} = 0 \\implies r^3 = ${Vcoef / 2} \\implies r = ${rOpt}`
            ],
            explain: `<strong>Step 1:</strong> From \\(V = \\pi r^2 h = ${Vcoef}\\pi\\), we get \\(h = \\frac{${Vcoef}}{r^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute into surface area:<br>` +
                     `\\(S(r) = 2\\pi r^2 + 2\\pi r \\cdot \\frac{${Vcoef}}{r^2} = 2\\pi r^2 + \\frac{${2 * Vcoef}\\pi}{r}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(S'(r) = 4\\pi r - \\frac{${2 * Vcoef}\\pi}{r^2} = 0\\).<br><br>` +
                     `<strong>Step 4:</strong> \\(r^3 = \\frac{${Vcoef}}{2} = ${Vcoef / 2}\\implies r = ${rOpt}\\) cm.<br><br>` +
                     `<strong>Step 5:</strong> \\(S''(r) = 4\\pi + \\frac{${4 * Vcoef}\\pi}{r^3} > 0\\), confirming a minimum.`
        };
    },

    /**
     * 9. qDistanceOptim - Hard (MC)
     * Closest point on y = x² to (0, a). Minimise D² = x² + (x²-a)².
     * d(D²)/dx = 2x(1 + 2x² - 2a) = 0.
     * x=0 or x²=a-½. For a>½: min distance at x²=a-½.
     * D²_min = (a-½) + (a-½-a)² = (a-½) + ¼.
     * a ∈ {1.5, 2, 3} → D²_min = {1.25, 1.75, 2.75}.
     */
    qDistanceOptim() {
        const cases = [
            { a: 1.5, Dsq: 1.25,  xSq: 1.0 },
            { a: 2,   Dsq: 1.75,  xSq: 1.5 },
            { a: 3,   Dsq: 2.75,  xSq: 2.5 }
        ];
        const { a, Dsq, xSq } = MathUtils.pick(cases);

        // D²_min = xSq + (xSq - a)² = xSq + 0.25
        const correctTex = String(Dsq);

        // Distractors
        const d1 = Math.round((a * a) * 100) / 100;   // ignoring x²=a term
        const d2 = a - 0.5;                             // just xSq, missing +0.25
        const d3 = Math.round((xSq + 1) * 100) / 100;  // off by 1

        const optionTexts = [correctTex];
        for (const d of [d1, d2, d3]) {
            const t = String(d);
            if (!optionTexts.includes(t) && d > 0) optionTexts.push(t);
        }
        while (optionTexts.length < 4) {
            const extra = String(Math.round((Dsq + optionTexts.length * 0.5) * 100) / 100);
            if (!optionTexts.includes(extra)) optionTexts.push(extra);
        }

        const options = optionTexts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Distance Optimisation',
            difficulty: 'hard',
            text: `Find the minimum value of the <strong>squared</strong> distance from the curve \\(y = x^2\\) to the point \\((0,\\,${a})\\).`,
            latex: `D^2 = x^2 + (x^2 - ${a})^2`,
            answer: 1,
            answerTex: `D^2_{\\min} = ${Dsq}`,
            options: shuffled,
            hintTex: [
                `\\frac{d(D^2)}{dx} = 2x + 4x(x^2 - ${a}) = 2x(1 + 2x^2 - ${2 * a}) = 0`,
                `x = 0 \\text{ (local max here) or } x^2 = ${a} - \\tfrac{1}{2} = ${xSq}`
            ],
            explain: `<strong>Step 1:</strong> \\(D^2 = x^2 + (x^2 - ${a})^2\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(\\frac{d(D^2)}{dx} = 2x + 4x(x^2 - ${a}) = 2x(2x^2 + 1 - ${2 * a}) = 0\\).<br><br>` +
                     `<strong>Step 3:</strong> Solutions: \\(x = 0\\) or \\(x^2 = ${a} - \\frac{1}{2} = ${xSq}\\).<br><br>` +
                     `<strong>Step 4:</strong> At \\(x^2 = ${xSq}\\): \\(D^2 = ${xSq} + (${xSq} - ${a})^2 = ${xSq} + ${0.25} = ${Dsq}\\).<br><br>` +
                     `<strong>Step 5:</strong> Compare with \\(x=0\\): \\(D^2 = ${a * a}\\). Since \\(${Dsq} < ${a * a}\\), the minimum is \\(D^2 = ${Dsq}\\).`
        };
    },

    /**
     * 10. qSecondDerivConfirm - Medium (MC)
     * Given f'(p)=0 and f''(p)=k. Conclude local max (k<0), local min (k>0), or inconclusive (k=0).
     */
    qSecondDerivConfirm() {
        const scenario = MathUtils.pick(['max', 'min', 'inconclusive']);
        const p = MathUtils.randInt(-5, 5);
        let k, conclusionTex, correctTex;

        if (scenario === 'max') {
            k = MathUtils.pick([-1, -2, -3, -4, -6]);
            conclusionTex = `x = ${p} \\text{ is a local maximum}`;
            correctTex = `\\text{Local maximum at } x = ${p}`;
        } else if (scenario === 'min') {
            k = MathUtils.pick([1, 2, 3, 4, 6]);
            conclusionTex = `x = ${p} \\text{ is a local minimum}`;
            correctTex = `\\text{Local minimum at } x = ${p}`;
        } else {
            k = 0;
            conclusionTex = `\\text{The test is inconclusive}`;
            correctTex = `\\text{Inconclusive — further analysis required}`;
        }

        // Build 4 MC options
        const allOptions = [
            { value: 0, tex: `\\text{Local maximum at } x = ${p}` },
            { value: 0, tex: `\\text{Local minimum at } x = ${p}` },
            { value: 0, tex: `\\text{Inconclusive — further analysis required}` },
            { value: 0, tex: `\\text{Global maximum at } x = ${p}` }
        ];

        // Mark the correct one
        allOptions.forEach(opt => {
            if (opt.tex === correctTex) opt.value = 1;
        });

        const shuffled = MathUtils.shuffle(allOptions);

        const kDisplay = k === 0 ? '0' : (k > 0 ? `+${k}` : String(k));

        return {
            type: 'mc',
            rule: 'Second Derivative Test',
            difficulty: 'medium',
            text: `For a function \\(f\\), it is known that \\(f'(${p}) = 0\\) and \\(f''(${p}) = ${kDisplay}\\). What can you conclude?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `f''(p) > 0 \\Rightarrow \\text{local min}; \\quad f''(p) < 0 \\Rightarrow \\text{local max}; \\quad f''(p) = 0 \\Rightarrow \\text{inconclusive}`,
                `f''(${p}) = ${kDisplay} ${k > 0 ? '> 0' : k < 0 ? '< 0' : '= 0'}`
            ],
            explain: `<strong>Step 1:</strong> The second derivative test states:<br>` +
                     `If \\(f'(p) = 0\\) and \\(f''(p) > 0\\) → local minimum.<br>` +
                     `If \\(f'(p) = 0\\) and \\(f''(p) < 0\\) → local maximum.<br>` +
                     `If \\(f'(p) = 0\\) and \\(f''(p) = 0\\) → inconclusive.<br><br>` +
                     `<strong>Step 2:</strong> Here \\(f''(${p}) = ${kDisplay}\\), which is ` +
                     (k > 0 ? `positive, so \\(x = ${p}\\) is a <strong>local minimum</strong>.` :
                      k < 0 ? `negative, so \\(x = ${p}\\) is a <strong>local maximum</strong>.` :
                               `zero, so the test is <strong>inconclusive</strong>.`)
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => OPTIMISATION.qMaxRectArea(),         weight: 3, difficulty: 'easy'   },
            { fn: () => OPTIMISATION.qMinFenceLength(),      weight: 2, difficulty: 'medium' },
            { fn: () => OPTIMISATION.qMaxVolBox(),           weight: 1, difficulty: 'hard'   },
            { fn: () => OPTIMISATION.qCriticalPoints(),      weight: 3, difficulty: 'easy'   },
            { fn: () => OPTIMISATION.qClassifyMinimum(),     weight: 2, difficulty: 'medium' },
            { fn: () => OPTIMISATION.qGlobalMax(),           weight: 2, difficulty: 'medium' },
            { fn: () => OPTIMISATION.qMaxRevenue(),          weight: 2, difficulty: 'medium' },
            { fn: () => OPTIMISATION.qMinCostCylinder(),     weight: 1, difficulty: 'hard'   },
            { fn: () => OPTIMISATION.qDistanceOptim(),       weight: 1, difficulty: 'hard'   },
            { fn: () => OPTIMISATION.qSecondDerivConfirm(),  weight: 2, difficulty: 'medium' }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (OPTIMISATION.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (OPTIMISATION.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (OPTIMISATION.level === 'hard') {
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
        OPTIMISATION.score = 0;
        OPTIMISATION.total = 0;
        OPTIMISATION.streak = 0;
        OPTIMISATION.answered = false;
        OPTIMISATION.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="OPTIMISATION.unload()">Optimisation (5.8)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Optimisation</h1>
                <p>IB Math AA 5.8 – Finding maximum and minimum values</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="OPTIMISATION.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="OPTIMISATION.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="OPTIMISATION.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="OPTIMISATION.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="opt-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="opt-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="opt-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="opt-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="opt-question-card">
                <span class="rule-tag" id="opt-rule"></span>
                <span class="difficulty-tag" id="opt-difficulty"></span>
                <div class="question-text" id="opt-text"></div>
                <div class="question-prompt" id="opt-latex"></div>
                <div id="opt-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="opt-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="opt-feedback">
                <div class="feedback-title" id="opt-feedback-title"></div>
                <div class="feedback-explanation" id="opt-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="opt-hint-btn" onclick="OPTIMISATION.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="opt-next-btn" onclick="OPTIMISATION.next()" style="display:none;">Next Question</button>
            </div>
        `;

        OPTIMISATION.next();
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
        OPTIMISATION.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        OPTIMISATION.score = 0;
        OPTIMISATION.total = 0;
        OPTIMISATION.streak = 0;
        OPTIMISATION.updateStats();
        OPTIMISATION.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        OPTIMISATION.answered = false;
        OPTIMISATION.hintIndex = 0;
        OPTIMISATION.currentQ = OPTIMISATION.pickQuestion();
        const q = OPTIMISATION.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('opt-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('opt-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('opt-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('opt-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('opt-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="OPTIMISATION.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="opt-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')OPTIMISATION.checkFree()">
                    <button class="btn btn-primary" onclick="OPTIMISATION.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('opt-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('opt-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('opt-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('opt-next-btn').style.display = 'none';
        document.getElementById('opt-hint-btn').style.display = '';
        document.getElementById('opt-hint-btn').disabled = false;

        // Render KaTeX
        OPTIMISATION.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = OPTIMISATION.currentQ;
        if (!q || !q.hintTex || OPTIMISATION.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('opt-hint-box');
        const hintContent = OPTIMISATION.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[OPTIMISATION.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        OPTIMISATION.hintIndex++;

        if (OPTIMISATION.hintIndex >= q.hintTex.length) {
            document.getElementById('opt-hint-btn').disabled = true;
        }

        OPTIMISATION.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (OPTIMISATION.answered) return;
        OPTIMISATION.answered = true;
        OPTIMISATION.total++;

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
            OPTIMISATION.score++;
            OPTIMISATION.streak++;
        } else {
            btn.classList.add('incorrect');
            OPTIMISATION.streak = 0;
        }

        OPTIMISATION.showFeedback(isCorrect);
        OPTIMISATION.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (OPTIMISATION.answered) return;

        const inp = document.getElementById('opt-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        OPTIMISATION.answered = true;
        OPTIMISATION.total++;
        inp.disabled = true;

        const q = OPTIMISATION.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            OPTIMISATION.score++;
            OPTIMISATION.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            OPTIMISATION.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        OPTIMISATION.showFeedback(isCorrect);
        OPTIMISATION.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = OPTIMISATION.currentQ;
        const fb = document.getElementById('opt-feedback');
        const title = document.getElementById('opt-feedback-title');
        const explanation = document.getElementById('opt-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (OPTIMISATION.streak > 1) {
                title.textContent = `Correct! (${OPTIMISATION.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('opt-next-btn').style.display = '';
        document.getElementById('opt-hint-btn').style.display = 'none';

        OPTIMISATION.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('opt-score');
        const totalEl = document.getElementById('opt-total');
        const streakEl = document.getElementById('opt-streak');
        const accEl = document.getElementById('opt-accuracy');

        if (scoreEl) scoreEl.textContent = OPTIMISATION.score;
        if (totalEl) totalEl.textContent = OPTIMISATION.total;
        if (streakEl) streakEl.textContent = OPTIMISATION.streak;
        if (accEl) {
            accEl.textContent = OPTIMISATION.total > 0
                ? Math.round((OPTIMISATION.score / OPTIMISATION.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['optimisation'] = () => OPTIMISATION.load();
