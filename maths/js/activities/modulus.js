/*
 * modulus.js - IB Math AA 2.15: Modulus (Absolute Value) Function
 * |x|, |f(x)|, solving equations and inequalities, graph transformations
 */

const MODULUS = {
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
     * 1. qEvaluateAbs - Easy (Free)
     * Evaluate |ax+b| at x=k for given a,b,k. Answer: |a*k+b|.
     */
    qEvaluateAbs() {
        const a = MathUtils.nonZeroRandInt(-4, 4);
        const b = MathUtils.randInt(-8, 8);
        const k = MathUtils.randInt(-6, 6);

        const inner = a * k + b;
        const answer = Math.abs(inner);

        // Format ax+b nicely
        let exprTex;
        const aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        if (b === 0) {
            exprTex = `${aTex}x`;
        } else if (b > 0) {
            exprTex = `${aTex}x + ${b}`;
        } else {
            exprTex = `${aTex}x - ${Math.abs(b)}`;
        }

        return {
            type: 'free',
            rule: 'Evaluate |f(x)|',
            difficulty: 'easy',
            text: `Evaluate the expression below at \\(x = ${k}\\).`,
            latex: `\\(|${exprTex}|\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } x = ${k}: \\quad |${a}(${k}) + ${b}|`,
                `= |${inner}| = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = ${k}\\) into the expression:<br>` +
                     `\\(|${a}(${k}) + ${b}| = |${a * k} + ${b}| = |${inner}|\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the definition \\(|n| = n\\) if \\(n \\geq 0\\), else \\(-n\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(|${inner}| = ${answer}\\).`
        };
    },

    /**
     * 2. qSolveAbsSimple - Easy (MC)
     * Solve |x+a| = b (b>0). Two solutions: x = -a+b and x = -a-b.
     */
    qSolveAbsSimple() {
        const a = MathUtils.randInt(-6, 6);
        const b = MathUtils.randInt(1, 8);

        const sol1 = -a + b;
        const sol2 = -a - b;

        // Format |x+a|
        let absTex;
        if (a === 0) absTex = `|x|`;
        else if (a > 0) absTex = `|x + ${a}|`;
        else absTex = `|x - ${Math.abs(a)}|`;

        // Format solution set: {sol2, sol1} sorted
        const smaller = Math.min(sol1, sol2);
        const larger  = Math.max(sol1, sol2);

        const correctTex = `x = ${smaller} \\text{ or } x = ${larger}`;

        // Distractors
        const d1 = `x = ${b} \\text{ or } x = ${-b}`;                    // forgot to shift by a
        const d2 = `x = ${a + b} \\text{ or } x = ${a - b}`;             // wrong sign on a
        const d3 = `x = ${larger}`;                                        // only one solution

        const optionTexts = [correctTex, d1, d2, d3];

        // Ensure uniqueness
        const seen = new Set([correctTex]);
        const finalOpts = [correctTex];
        for (let i = 1; i < optionTexts.length; i++) {
            if (!seen.has(optionTexts[i])) {
                seen.add(optionTexts[i]);
                finalOpts.push(optionTexts[i]);
            } else {
                const fallback = `x = ${smaller + MathUtils.nonZeroRandInt(-2, 2)} \\text{ or } x = ${larger + MathUtils.nonZeroRandInt(-2, 2)}`;
                finalOpts.push(fallback);
            }
        }

        const options = finalOpts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Solve |x+a| = b',
            difficulty: 'easy',
            text: `Solve the equation below.`,
            latex: `\\(${absTex} = ${b}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{If } |X| = c, \\text{ then } X = c \\text{ or } X = -c`,
                `x + ${a} = ${b} \\implies x = ${sol1}, \\qquad x + ${a} = -${b} \\implies x = ${sol2}`
            ],
            explain: `<strong>Step 1:</strong> Use the rule: if \\(|X| = c\\) then \\(X = c\\) or \\(X = -c\\).<br><br>` +
                     `<strong>Case 1:</strong> \\(x + ${a} = ${b} \\implies x = ${sol1}\\).<br><br>` +
                     `<strong>Case 2:</strong> \\(x + ${a} = -${b} \\implies x = ${sol2}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(x = ${smaller}\\) or \\(x = ${larger}\\).`
        };
    },

    /**
     * 3. qSolveAbsLinear - Medium (Free)
     * Solve |ax+b| = c (c>0, integer answers). Ask for the LARGER solution.
     */
    qSolveAbsLinear() {
        // Ensure integer solutions: (c-b)/a and (-c-b)/a must be integers
        // Choose a first, then b and c such that both (c-b) and (-c-b) are divisible by a
        let a, b, c, sol1, sol2;
        let attempts = 0;
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            if (a === 0) a = 2;
            // Pick integer solutions first, derive b and c
            sol1 = MathUtils.randInt(-6, 6);
            sol2 = MathUtils.randInt(-6, 6);
            // Both satisfy |ax+b| = c
            // a*sol1 + b = c,  a*sol2 + b = -c (or vice versa)
            // From these: a*(sol1 - sol2) = 2c => c = a*(sol1-sol2)/2
            // b = c - a*sol1
            const diff = a * (sol1 - sol2);
            if (diff !== 0 && Math.abs(diff) % 2 === 0) {
                c = Math.abs(diff) / 2;
                // Ensure c > 0 and is positive
                b = c - a * sol1;
                // Verify
                if (Math.abs(a * sol1 + b) === c && Math.abs(a * sol2 + b) === c && c > 0) {
                    break;
                }
            }
            attempts++;
        } while (attempts < 50);

        // Fallback: simple case
        if (attempts >= 50) {
            a = 2; b = -4; c = 6;
            sol1 = 5; sol2 = -1;
        }

        const larger = Math.max(sol1, sol2);
        const smaller = Math.min(sol1, sol2);

        // Format expression
        const aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let exprTex;
        if (b === 0) exprTex = `${aTex}x`;
        else if (b > 0) exprTex = `${aTex}x + ${b}`;
        else exprTex = `${aTex}x - ${Math.abs(b)}`;

        return {
            type: 'free',
            rule: 'Solve |ax+b| = c',
            difficulty: 'medium',
            text: `Solve the equation below. Enter the <strong>larger</strong> solution.`,
            latex: `\\(|${exprTex}| = ${c}\\)`,
            answer: larger,
            answerTex: String(larger),
            options: [],
            hintTex: [
                `\\text{Split into two cases: } ${exprTex} = ${c} \\text{ or } ${exprTex} = -${c}`,
                `x = \\frac{${c} - (${b})}{${a}} = ${sol1} \\quad \\text{and} \\quad x = \\frac{-${c} - (${b})}{${a}} = ${sol2}`
            ],
            explain: `<strong>Step 1:</strong> Use \\(|${exprTex}| = ${c}\\) — split into two cases.<br><br>` +
                     `<strong>Case 1:</strong> \\(${exprTex} = ${c}\\)<br>` +
                     `\\(${a}x = ${c - b}\\implies x = ${sol1}\\).<br><br>` +
                     `<strong>Case 2:</strong> \\(${exprTex} = -${c}\\)<br>` +
                     `\\(${a}x = ${-c - b} \\implies x = ${sol2}\\).<br><br>` +
                     `<strong>Larger solution:</strong> \\(x = ${larger}\\).`
        };
    },

    /**
     * 4. qAbsInequality - Medium (MC)
     * Solve |x-a| < b. Answer: a-b < x < a+b.
     */
    qAbsInequality() {
        const a = MathUtils.randInt(-6, 6);
        const b = MathUtils.randInt(1, 6);

        const lo = a - b;
        const hi = a + b;

        // Format |x-a|
        let absTex;
        if (a === 0) absTex = `|x|`;
        else if (a > 0) absTex = `|x - ${a}|`;
        else absTex = `|x + ${Math.abs(a)}|`;

        const correctTex = `${lo} < x < ${hi}`;

        // Distractors
        const d1 = `x < ${lo} \\text{ or } x > ${hi}`;   // used > instead of <
        const d2 = `${a - b - 1} < x < ${a + b + 1}`;    // off-by-one bounds
        const d3 = `${-hi} < x < ${-lo}`;                 // negated bounds

        const optionTexts = [correctTex, d1, d2, d3];
        const seen = new Set([correctTex]);
        const finalOpts = [correctTex];
        for (let i = 1; i < optionTexts.length; i++) {
            if (!seen.has(optionTexts[i])) {
                seen.add(optionTexts[i]);
                finalOpts.push(optionTexts[i]);
            } else {
                finalOpts.push(`${lo + 1} < x < ${hi + 1}`);
            }
        }

        const options = finalOpts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Inequality |x−a| < b',
            difficulty: 'medium',
            text: `Solve the inequality below.`,
            latex: `\\(${absTex} < ${b}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `|X| < c \\iff -c < X < c`,
                `-${b} < x - ${a} < ${b} \\implies ${lo} < x < ${hi}`
            ],
            explain: `<strong>Step 1:</strong> Use the rule: \\(|X| < c \\iff -c < X < c\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply it: \\(-${b} < x - ${a} < ${b}\\).<br><br>` +
                     `<strong>Step 3:</strong> Add \\(${a}\\) throughout: \\(${lo} < x < ${hi}\\).`
        };
    },

    /**
     * 5. qAbsInequalityGT - Medium (MC)
     * Solve |x-a| > b. Answer: x < a-b OR x > a+b.
     */
    qAbsInequalityGT() {
        const a = MathUtils.randInt(-5, 5);
        const b = MathUtils.randInt(1, 5);

        const lo = a - b;
        const hi = a + b;

        let absTex;
        if (a === 0) absTex = `|x|`;
        else if (a > 0) absTex = `|x - ${a}|`;
        else absTex = `|x + ${Math.abs(a)}|`;

        const correctTex = `x < ${lo} \\text{ or } x > ${hi}`;

        // Distractors
        const d1 = `${lo} < x < ${hi}`;                        // used < instead of >
        const d2 = `x < ${lo + 1} \\text{ or } x > ${hi - 1}`; // wrong bounds
        const d3 = `x \\leq ${lo} \\text{ or } x \\geq ${hi}`; // wrong strictness

        const optionTexts = [correctTex, d1, d2, d3];
        const seen = new Set([correctTex]);
        const finalOpts = [correctTex];
        for (let i = 1; i < optionTexts.length; i++) {
            if (!seen.has(optionTexts[i])) {
                seen.add(optionTexts[i]);
                finalOpts.push(optionTexts[i]);
            } else {
                finalOpts.push(`x < ${lo - 1} \\text{ or } x > ${hi + 1}`);
            }
        }

        const options = finalOpts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Inequality |x−a| > b',
            difficulty: 'medium',
            text: `Solve the inequality below.`,
            latex: `\\(${absTex} > ${b}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `|X| > c \\iff X < -c \\text{ or } X > c`,
                `x - ${a} < -${b} \\text{ or } x - ${a} > ${b} \\implies x < ${lo} \\text{ or } x > ${hi}`
            ],
            explain: `<strong>Step 1:</strong> Use the rule: \\(|X| > c \\iff X < -c\\) or \\(X > c\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply it: \\(x - ${a} < -${b}\\) or \\(x - ${a} > ${b}\\).<br><br>` +
                     `<strong>Step 3:</strong> Add \\(${a}\\) to each: \\(x < ${lo}\\) or \\(x > ${hi}\\).`
        };
    },

    /**
     * 6. qEvaluateAbsExpression - Easy (Free)
     * Evaluate |a| + |b| - |c| for given integers a,b,c (some negative).
     */
    qEvaluateAbsExpression() {
        // Ensure some values are negative for interest
        const a = MathUtils.randInt(-9, 9);
        const b = MathUtils.pick([-1, 1]) * MathUtils.randInt(1, 9); // at least one negative
        const c = -MathUtils.randInt(1, 9);   // always negative to force thinking

        const answer = Math.abs(a) + Math.abs(b) - Math.abs(c);

        const aTex = a < 0 ? `(${a})` : String(a);
        const bTex = b < 0 ? `(${b})` : String(b);
        const cTex = c < 0 ? `(${c})` : String(c);

        return {
            type: 'free',
            rule: 'Evaluate |a|+|b|−|c|',
            difficulty: 'easy',
            text: `Evaluate the expression below. All values are integers.`,
            latex: `\\(|${aTex}| + |${bTex}| - |${cTex}|\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `|n| = n \\text{ if } n \\geq 0, \\quad |n| = -n \\text{ if } n < 0`,
                `|${a}| + |${b}| - |${c}| = ${Math.abs(a)} + ${Math.abs(b)} - ${Math.abs(c)}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate each absolute value:<br>` +
                     `\\(|${a}| = ${Math.abs(a)}, \\quad |${b}| = ${Math.abs(b)}, \\quad |${c}| = ${Math.abs(c)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(${Math.abs(a)} + ${Math.abs(b)} - ${Math.abs(c)}\\).<br><br>` +
                     `<strong>Step 3:</strong> Simplify: \\(= ${answer}\\).`
        };
    },

    /**
     * 7. qDistanceOnLine - Easy (Free)
     * |x - a| = b means distance from x to a is b. Given a and b, find the smaller solution.
     */
    qDistanceOnLine() {
        const a = MathUtils.randInt(-7, 7);
        const b = MathUtils.randInt(1, 7);

        const sol1 = a + b;
        const sol2 = a - b;
        const smaller = Math.min(sol1, sol2);

        let absTex;
        if (a === 0) absTex = `|x|`;
        else if (a > 0) absTex = `|x - ${a}|`;
        else absTex = `|x + ${Math.abs(a)}|`;

        return {
            type: 'free',
            rule: 'Distance Interpretation',
            difficulty: 'easy',
            text: `The equation \\(${absTex} = ${b}\\) means the distance from \\(x\\) to \\(${a}\\) on the number line equals \\(${b}\\). Find the <strong>smaller</strong> solution.`,
            latex: `\\(${absTex} = ${b}\\)`,
            answer: smaller,
            answerTex: String(smaller),
            options: [],
            hintTex: [
                `\\text{Solutions are at distance } ${b} \\text{ from } ${a}: \\quad x = ${a} \\pm ${b}`,
                `x = ${a} + ${b} = ${sol1} \\quad \\text{or} \\quad x = ${a} - ${b} = ${sol2}`
            ],
            explain: `<strong>Step 1:</strong> \\(|x - ${a}| = ${b}\\) means \\(x\\) is exactly \\(${b}\\) units from \\(${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Solutions: \\(x = ${a} + ${b} = ${sol1}\\) or \\(x = ${a} - ${b} = ${sol2}\\).<br><br>` +
                     `<strong>Smaller solution:</strong> \\(x = ${smaller}\\).`
        };
    },

    /**
     * 8. qSolveAbsEquals - Medium (Free)
     * Solve |2x+a| = |x+b|. Two cases. Ask for sum of solutions.
     */
    qSolveAbsEquals() {
        const a = MathUtils.randInt(-6, 6);
        const b = MathUtils.randInt(-6, 6);

        // Case 1: 2x+a = x+b => x = b-a
        const x1 = b - a;
        // Case 2: 2x+a = -(x+b) => 3x = -a-b => x = (-a-b)/3
        // Ensure integer: need (-a-b) divisible by 3
        // We'll pick a,b so (a+b) % 3 === 0
        // Re-draw if needed
        let aFinal = a, bFinal = b, x2;
        let retries = 0;
        do {
            aFinal = MathUtils.randInt(-6, 6);
            bFinal = MathUtils.randInt(-6, 6);
            const num = -aFinal - bFinal;
            if (num % 3 === 0) {
                x2 = num / 3;
                break;
            }
            retries++;
        } while (retries < 60);

        if (retries >= 60) { aFinal = 3; bFinal = 0; x2 = -1; }

        const x1Final = bFinal - aFinal;
        const sumSols = x1Final + x2;

        // Format 2x+a
        let expr1Tex;
        if (aFinal === 0) expr1Tex = `2x`;
        else if (aFinal > 0) expr1Tex = `2x + ${aFinal}`;
        else expr1Tex = `2x - ${Math.abs(aFinal)}`;

        // Format x+b
        let expr2Tex;
        if (bFinal === 0) expr2Tex = `x`;
        else if (bFinal > 0) expr2Tex = `x + ${bFinal}`;
        else expr2Tex = `x - ${Math.abs(bFinal)}`;

        return {
            type: 'free',
            rule: 'Solve |f(x)| = |g(x)|',
            difficulty: 'medium',
            text: `Solve the equation below. Enter the <strong>sum</strong> of the two solutions.`,
            latex: `\\(|${expr1Tex}| = |${expr2Tex}|\\)`,
            answer: sumSols,
            answerTex: String(sumSols),
            options: [],
            hintTex: [
                `|A| = |B| \\iff A = B \\text{ or } A = -B`,
                `\\text{Case 1: } ${expr1Tex} = ${expr2Tex} \\implies x = ${x1Final};\\quad \\text{Case 2: } ${expr1Tex} = -(${expr2Tex}) \\implies x = ${x2}`
            ],
            explain: `<strong>Step 1:</strong> \\(|A| = |B| \\iff A = B\\) or \\(A = -B\\).<br><br>` +
                     `<strong>Case 1:</strong> \\(${expr1Tex} = ${expr2Tex}\\)<br>` +
                     `\\(x = ${x1Final}\\).<br><br>` +
                     `<strong>Case 2:</strong> \\(${expr1Tex} = -(${expr2Tex})\\)<br>` +
                     `\\(${expr1Tex} = -${expr2Tex === 'x' ? 'x' : expr2Tex}\\)<br>` +
                     `\\(3x = ${-aFinal - bFinal} \\implies x = ${x2}\\).<br><br>` +
                     `<strong>Sum of solutions:</strong> \\(${x1Final} + ${x2} = ${sumSols}\\).`
        };
    },

    /**
     * 9. qAbsGraph - Medium (MC)
     * For f(x)=|ax+b|, which is the vertex (lowest point)? Vertex at x=-b/a, y=0.
     */
    qAbsGraph() {
        // Use integer vertex for clean display: need b divisible by a
        let a, b, vx;
        let attempts = 0;
        do {
            a = MathUtils.nonZeroRandInt(-4, 4);
            const k = MathUtils.nonZeroRandInt(-5, 5);
            b = -a * k;   // so vx = k (integer)
            vx = k;
            attempts++;
        } while (attempts < 10);

        const vy = 0;

        const aTex = a === 1 ? '' : a === -1 ? '-' : String(a);
        let exprTex;
        if (b === 0) exprTex = `${aTex}x`;
        else if (b > 0) exprTex = `${aTex}x + ${b}`;
        else exprTex = `${aTex}x - ${Math.abs(b)}`;

        const correctTex = `(${vx},\\,0)`;

        // Distractors
        const d1 = `(${-vx},\\,0)`;                          // negated x
        const d2 = `(0,\\,${Math.abs(b)})`;                  // y-intercept confused with vertex
        const d3 = `(${vx},\\,${Math.abs(b)})`;              // correct x but wrong y

        const optionTexts = [correctTex, d1, d2, d3];
        const seen = new Set([correctTex]);
        const finalOpts = [correctTex];
        for (let i = 1; i < optionTexts.length; i++) {
            if (!seen.has(optionTexts[i])) {
                seen.add(optionTexts[i]);
                finalOpts.push(optionTexts[i]);
            } else {
                finalOpts.push(`(${vx + MathUtils.nonZeroRandInt(-2, 2)},\\,0)`);
            }
        }

        const options = finalOpts.map((tex, i) => ({
            value: i === 0 ? 1 : 0,
            tex: tex
        }));
        const shuffled = MathUtils.shuffle(options);

        return {
            type: 'mc',
            rule: 'Vertex of |ax+b|',
            difficulty: 'medium',
            text: `For \\(f(x) = |${exprTex}|\\), which coordinate pair is the vertex (the lowest point of the graph)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{The vertex occurs where the expression inside } |\\cdot| \\text{ equals zero}`,
                `${exprTex} = 0 \\implies x = ${vx}, \\quad f(${vx}) = 0`
            ],
            explain: `<strong>Step 1:</strong> The vertex of \\(|${exprTex}|\\) is where the inside equals zero.<br><br>` +
                     `<strong>Step 2:</strong> Set \\(${exprTex} = 0\\): \\(x = ${vx}\\).<br><br>` +
                     `<strong>Step 3:</strong> At \\(x = ${vx}\\), \\(f(${vx}) = |0| = 0\\).<br><br>` +
                     `<strong>Vertex:</strong> \\((${vx},\\,0)\\).`
        };
    },

    /**
     * 10. qAbsComposite - Hard (Free)
     * Evaluate |f(x)| - |g(x)| at given x where f and g are linear. Integer answer guaranteed.
     */
    qAbsComposite() {
        // f(x) = a1*x + b1, g(x) = a2*x + b2, evaluate at x=k
        const a1 = MathUtils.nonZeroRandInt(-4, 4);
        const b1 = MathUtils.randInt(-8, 8);
        const a2 = MathUtils.nonZeroRandInt(-4, 4);
        const b2 = MathUtils.randInt(-8, 8);
        const k  = MathUtils.randInt(-5, 5);

        const fk = a1 * k + b1;
        const gk = a2 * k + b2;
        const answer = Math.abs(fk) - Math.abs(gk);

        const a1Tex = a1 === 1 ? '' : a1 === -1 ? '-' : String(a1);
        const a2Tex = a2 === 1 ? '' : a2 === -1 ? '-' : String(a2);

        let fTex;
        if (b1 === 0) fTex = `${a1Tex}x`;
        else if (b1 > 0) fTex = `${a1Tex}x + ${b1}`;
        else fTex = `${a1Tex}x - ${Math.abs(b1)}`;

        let gTex;
        if (b2 === 0) gTex = `${a2Tex}x`;
        else if (b2 > 0) gTex = `${a2Tex}x + ${b2}`;
        else gTex = `${a2Tex}x - ${Math.abs(b2)}`;

        return {
            type: 'free',
            rule: '|f(x)| − |g(x)|',
            difficulty: 'hard',
            text: `Let \\(f(x) = ${fTex}\\) and \\(g(x) = ${gTex}\\). Evaluate \\(|f(x)| - |g(x)|\\) at \\(x = ${k}\\).`,
            latex: `\\(|f(${k})| - |g(${k})|\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `f(${k}) = ${a1}(${k}) + ${b1} = ${fk}, \\quad g(${k}) = ${a2}(${k}) + ${b2} = ${gk}`,
                `|f(${k})| - |g(${k})| = |${fk}| - |${gk}| = ${Math.abs(fk)} - ${Math.abs(gk)}`
            ],
            explain: `<strong>Step 1:</strong> Evaluate \\(f(${k})\\): \\(${a1}(${k}) + ${b1} = ${fk}\\).<br><br>` +
                     `<strong>Step 2:</strong> Evaluate \\(g(${k})\\): \\(${a2}(${k}) + ${b2} = ${gk}\\).<br><br>` +
                     `<strong>Step 3:</strong> Apply absolute values: \\(|${fk}| = ${Math.abs(fk)}\\), \\(|${gk}| = ${Math.abs(gk)}\\).<br><br>` +
                     `<strong>Step 4:</strong> Subtract: \\(${Math.abs(fk)} - ${Math.abs(gk)} = ${answer}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => MODULUS.qEvaluateAbs(),          weight: 3 }, // 0 — easy
            { fn: () => MODULUS.qSolveAbsSimple(),        weight: 3 }, // 1 — easy
            { fn: () => MODULUS.qSolveAbsLinear(),        weight: 2 }, // 2 — medium
            { fn: () => MODULUS.qAbsInequality(),         weight: 2 }, // 3 — medium
            { fn: () => MODULUS.qAbsInequalityGT(),       weight: 2 }, // 4 — medium
            { fn: () => MODULUS.qEvaluateAbsExpression(), weight: 3 }, // 5 — easy
            { fn: () => MODULUS.qDistanceOnLine(),        weight: 3 }, // 6 — easy
            { fn: () => MODULUS.qSolveAbsEquals(),        weight: 2 }, // 7 — medium
            { fn: () => MODULUS.qAbsGraph(),              weight: 2 }, // 8 — medium
            { fn: () => MODULUS.qAbsComposite(),          weight: 1 }  // 9 — hard
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (MODULUS.level === 'easy') {
            filtered = pool.filter((_, i) => [0, 1, 5, 6].includes(i));
        } else if (MODULUS.level === 'medium') {
            filtered = pool.filter((_, i) => [2, 3, 4, 7, 8].includes(i));
        } else if (MODULUS.level === 'hard') {
            filtered = pool.filter((_, i) => [9].includes(i));
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
        MODULUS.score = 0;
        MODULUS.total = 0;
        MODULUS.streak = 0;
        MODULUS.answered = false;
        MODULUS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="MODULUS.unload()">Modulus (2.15)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Modulus Function</h1>
                <p>IB Math AA 2.15 — Absolute value, equations and inequalities</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="MODULUS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="MODULUS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="MODULUS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="MODULUS.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="mod-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="mod-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="mod-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="mod-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="mod-question-card">
                <span class="rule-tag" id="mod-rule"></span>
                <span class="difficulty-tag" id="mod-difficulty"></span>
                <div class="question-text" id="mod-text"></div>
                <div class="question-prompt" id="mod-latex"></div>
                <div id="mod-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="mod-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="mod-feedback">
                <div class="feedback-title" id="mod-feedback-title"></div>
                <div class="feedback-explanation" id="mod-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="mod-hint-btn" onclick="MODULUS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="mod-next-btn" onclick="MODULUS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        MODULUS.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('functions');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        MODULUS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        MODULUS.score = 0;
        MODULUS.total = 0;
        MODULUS.streak = 0;
        MODULUS.updateStats();
        MODULUS.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        MODULUS.answered = false;
        MODULUS.hintIndex = 0;
        MODULUS.currentQ = MODULUS.pickQuestion();
        const q = MODULUS.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('mod-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('mod-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('mod-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('mod-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('mod-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="MODULUS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="mod-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')MODULUS.checkFree()">
                    <button class="btn btn-primary" onclick="MODULUS.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('mod-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('mod-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('mod-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('mod-next-btn').style.display = 'none';
        document.getElementById('mod-hint-btn').style.display = '';
        document.getElementById('mod-hint-btn').disabled = false;

        // Render KaTeX
        MODULUS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = MODULUS.currentQ;
        if (!q || !q.hintTex || MODULUS.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('mod-hint-box');
        const hintContent = MODULUS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[MODULUS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        MODULUS.hintIndex++;

        if (MODULUS.hintIndex >= q.hintTex.length) {
            document.getElementById('mod-hint-btn').disabled = true;
        }

        MODULUS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (MODULUS.answered) return;
        MODULUS.answered = true;
        MODULUS.total++;

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
            MODULUS.score++;
            MODULUS.streak++;
        } else {
            btn.classList.add('incorrect');
            MODULUS.streak = 0;
        }

        MODULUS.showFeedback(isCorrect);
        MODULUS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (MODULUS.answered) return;

        const inp = document.getElementById('mod-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        MODULUS.answered = true;
        MODULUS.total++;
        inp.disabled = true;

        const q = MODULUS.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.01);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            MODULUS.score++;
            MODULUS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            MODULUS.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        MODULUS.showFeedback(isCorrect);
        MODULUS.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = MODULUS.currentQ;
        const fb = document.getElementById('mod-feedback');
        const title = document.getElementById('mod-feedback-title');
        const explanation = document.getElementById('mod-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (MODULUS.streak > 1) {
                title.textContent = `Correct! (${MODULUS.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('mod-next-btn').style.display = '';
        document.getElementById('mod-hint-btn').style.display = 'none';

        MODULUS.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('mod-score');
        const totalEl = document.getElementById('mod-total');
        const streakEl = document.getElementById('mod-streak');
        const accEl = document.getElementById('mod-accuracy');

        if (scoreEl) scoreEl.textContent = MODULUS.score;
        if (totalEl) totalEl.textContent = MODULUS.total;
        if (streakEl) streakEl.textContent = MODULUS.streak;
        if (accEl) {
            accEl.textContent = MODULUS.total > 0
                ? Math.round((MODULUS.score / MODULUS.total) * 100) + '%'
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
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['modulus'] = () => MODULUS.load();
}
