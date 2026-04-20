/*
 * related-rates.js - IB Math AA 5.15: Related Rates
 * Rates of change connected by a chain rule relationship: dA/dt = dA/dr · dr/dt
 * Common contexts: expanding circles, filling tanks, sliding ladders
 */

const REL_RATES = {
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
     * 1. qCircleArea - Easy (MC)
     * A = πr². dA/dt = 2πr · dr/dt. Given r and dr/dt, find dA/dt.
     * Answer presented as a multiple of π.
     */
    qCircleArea() {
        const r     = MathUtils.randInt(2, 8);
        const drdt  = MathUtils.randInt(1, 5);

        // dA/dt = 2π·r·dr/dt
        const coeff = 2 * r * drdt; // answer = coeff·π

        // Build option strings as "Nπ"
        function piTex(k) {
            if (k === 1)  return `\\pi`;
            if (k === -1) return `-\\pi`;
            return `${k}\\pi`;
        }

        // Common errors:
        // E1: forgot factor of 2 → r·dr/dt·π
        const e1 = r * drdt;
        // E2: used r² · dr/dt → r²·dr/dt·π  (confused V sphere with circle area)
        const e2 = r * r * drdt;
        // E3: used 2π·(dr/dt) only, forgot r → 2·dr/dt
        const e3 = 2 * drdt;

        const correctTex = piTex(coeff);
        const opts = [
            { value: 1, tex: correctTex },
            { value: 0, tex: piTex(e1) },
            { value: 0, tex: piTex(e2) },
            { value: 0, tex: piTex(e3) }
        ];

        // Deduplicate
        const seen = new Set([coeff]);
        const deduped = [opts[0]];
        for (let i = 1; i < opts.length; i++) {
            const vals = [e1, e2, e3];
            if (!seen.has(vals[i - 1])) {
                seen.add(vals[i - 1]);
                deduped.push(opts[i]);
            } else {
                let alt = coeff + deduped.length * MathUtils.pick([1, -1]) * r;
                while (seen.has(alt)) alt += r;
                seen.add(alt);
                deduped.push({ value: 0, tex: piTex(alt) });
            }
        }
        while (deduped.length < 4) {
            let alt = coeff + deduped.length * r;
            while (seen.has(alt)) alt += r;
            seen.add(alt);
            deduped.push({ value: 0, tex: piTex(alt) });
        }

        const shuffled = MathUtils.shuffle(deduped);

        return {
            type: 'mc',
            rule: 'Circle Area Rate',
            difficulty: 'easy',
            text: `The radius of a circle is increasing at a rate of \\(${drdt}\\) cm s\\(^{-1}\\). Find the rate at which the area is increasing when \\(r = ${r}\\) cm.`,
            latex: `\\(A = \\pi r^2,\\quad \\dfrac{dA}{dt} = 2\\pi r\\,\\dfrac{dr}{dt}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\frac{dA}{dt} = \\frac{dA}{dr} \\cdot \\frac{dr}{dt} = 2\\pi r \\cdot \\frac{dr}{dt}`,
                `= 2\\pi \\times ${r} \\times ${drdt} = ${coeff}\\pi`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(A = \\pi r^2\\), so \\(\\dfrac{dA}{dr} = 2\\pi r\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dA}{dt} = \\dfrac{dA}{dr} \\cdot \\dfrac{dr}{dt} = 2\\pi r \\cdot \\dfrac{dr}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(r = ${r}\\), \\(\\dfrac{dr}{dt} = ${drdt}\\):<br>` +
                     `\\(\\dfrac{dA}{dt} = 2\\pi \\times ${r} \\times ${drdt} = ${coeff}\\pi\\) cm\\(^2\\) s\\(^{-1}\\).`
        };
    },

    /**
     * 2. qCircleCircumference - Easy (MC)
     * C = 2πr. dC/dt = 2π · dr/dt. Given dr/dt, answer = 2π·dr/dt.
     */
    qCircleCircumference() {
        const drdt = MathUtils.randInt(1, 8);

        // dC/dt = 2π · dr/dt — coefficient of π is 2·dr/dt
        const coeff = 2 * drdt;

        function piTex(k) {
            if (k === 1)  return `\\pi`;
            if (k === -1) return `-\\pi`;
            return `${k}\\pi`;
        }

        const correctTex = piTex(coeff);

        // Distractors:
        // E1: forgot factor of 2 → dr/dt · π
        const e1 = drdt;
        // E2: multiplied by r (random r used for distraction)
        const rFake = MathUtils.randInt(2, 6);
        const e2 = 2 * drdt * rFake;
        // E3: used π·dr/dt (missing factor 2)
        const e3 = drdt * 3; // arbitrary wrong multiple

        const seen = new Set([coeff]);
        const opts = [{ value: 1, tex: correctTex }];

        for (const ec of [e1, e2, e3]) {
            if (!seen.has(ec)) {
                seen.add(ec);
                opts.push({ value: 0, tex: piTex(ec) });
            } else {
                let alt = coeff + opts.length * 2;
                while (seen.has(alt)) alt += 2;
                seen.add(alt);
                opts.push({ value: 0, tex: piTex(alt) });
            }
        }
        while (opts.length < 4) {
            let alt = coeff + opts.length * 2;
            while (seen.has(alt)) alt += 2;
            seen.add(alt);
            opts.push({ value: 0, tex: piTex(alt) });
        }

        const shuffled = MathUtils.shuffle(opts);

        return {
            type: 'mc',
            rule: 'Circumference Rate',
            difficulty: 'easy',
            text: `The radius of a circle is increasing at a rate of \\(${drdt}\\) cm s\\(^{-1}\\). Find the rate at which the circumference is increasing.`,
            latex: `\\(C = 2\\pi r,\\quad \\dfrac{dC}{dt} = 2\\pi\\,\\dfrac{dr}{dt}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\frac{dC}{dt} = \\frac{dC}{dr} \\cdot \\frac{dr}{dt} = 2\\pi \\cdot \\frac{dr}{dt}`,
                `= 2\\pi \\times ${drdt} = ${coeff}\\pi`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(C = 2\\pi r\\), so \\(\\dfrac{dC}{dr} = 2\\pi\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dC}{dt} = \\dfrac{dC}{dr} \\cdot \\dfrac{dr}{dt} = 2\\pi \\cdot \\dfrac{dr}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(\\dfrac{dr}{dt} = ${drdt}\\):<br>` +
                     `\\(\\dfrac{dC}{dt} = 2\\pi \\times ${drdt} = ${coeff}\\pi\\) cm s\\(^{-1}\\).<br><br>` +
                     `<strong>Note:</strong> This rate is independent of \\(r\\) — the circumference grows at a constant rate relative to the radius rate.`
        };
    },

    /**
     * 3. qSquareArea - Easy (Free)
     * A = s². dA/dt = 2s · ds/dt. Given s and ds/dt (integers), find dA/dt (integer).
     */
    qSquareArea() {
        const s    = MathUtils.randInt(2, 9);
        const dsdt = MathUtils.randInt(1, 5);

        // dA/dt = 2s · ds/dt
        const answer = 2 * s * dsdt;

        return {
            type: 'free',
            rule: 'Square Area Rate',
            difficulty: 'easy',
            text: `The side length of a square is increasing at a rate of \\(${dsdt}\\) cm s\\(^{-1}\\). Find the rate at which the area is increasing when \\(s = ${s}\\) cm.`,
            latex: `\\(A = s^2,\\quad \\dfrac{dA}{dt} = ?\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{dA}{dt} = \\frac{dA}{ds} \\cdot \\frac{ds}{dt} = 2s \\cdot \\frac{ds}{dt}`,
                `= 2 \\times ${s} \\times ${dsdt} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(A = s^2\\), so \\(\\dfrac{dA}{ds} = 2s\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dA}{dt} = \\dfrac{dA}{ds} \\cdot \\dfrac{ds}{dt} = 2s \\cdot \\dfrac{ds}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(s = ${s}\\), \\(\\dfrac{ds}{dt} = ${dsdt}\\):<br>` +
                     `\\(\\dfrac{dA}{dt} = 2 \\times ${s} \\times ${dsdt} = ${answer}\\) cm\\(^2\\) s\\(^{-1}\\).`
        };
    },

    /**
     * 4. qVolumeOfSphere - Medium (MC)
     * V = (4/3)πr³. dV/dt = 4πr² · dr/dt. Given r and dr/dt, find dV/dt.
     * Answer as Nπ.
     */
    qVolumeOfSphere() {
        const r    = MathUtils.randInt(2, 6);
        const drdt = MathUtils.randInt(1, 4);

        // dV/dt = 4πr² · dr/dt — coefficient of π
        const coeff = 4 * r * r * drdt;

        function piTex(k) {
            if (k === 1)  return `\\pi`;
            if (k === -1) return `-\\pi`;
            return `${k}\\pi`;
        }

        const correctTex = piTex(coeff);

        // Distractors:
        // E1: forgot the 4 → r²·dr/dt·π
        const e1 = r * r * drdt;
        // E2: used surface area (4πr²) without dr/dt factor → 4r²·π
        const e2 = 4 * r * r;
        // E3: used 2πr·dr/dt (circle area formula instead)
        const e3 = 2 * r * drdt;

        const seen = new Set([coeff]);
        const opts = [{ value: 1, tex: correctTex }];
        for (const ec of [e1, e2, e3]) {
            if (!seen.has(ec)) {
                seen.add(ec);
                opts.push({ value: 0, tex: piTex(ec) });
            } else {
                let alt = coeff + opts.length * r;
                while (seen.has(alt)) alt += r;
                seen.add(alt);
                opts.push({ value: 0, tex: piTex(alt) });
            }
        }
        while (opts.length < 4) {
            let alt = coeff + opts.length * r;
            while (seen.has(alt)) alt += r;
            seen.add(alt);
            opts.push({ value: 0, tex: piTex(alt) });
        }

        const shuffled = MathUtils.shuffle(opts);

        return {
            type: 'mc',
            rule: 'Sphere Volume Rate',
            difficulty: 'medium',
            text: `The radius of a sphere is increasing at a rate of \\(${drdt}\\) cm s\\(^{-1}\\). Find the rate at which the volume is increasing when \\(r = ${r}\\) cm.`,
            latex: `\\(V = \\tfrac{4}{3}\\pi r^3,\\quad \\dfrac{dV}{dt} = 4\\pi r^2\\,\\dfrac{dr}{dt}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\frac{dV}{dt} = \\frac{dV}{dr} \\cdot \\frac{dr}{dt} = 4\\pi r^2 \\cdot \\frac{dr}{dt}`,
                `= 4\\pi \\times ${r}^2 \\times ${drdt} = 4\\pi \\times ${r * r} \\times ${drdt} = ${coeff}\\pi`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(V = \\tfrac{4}{3}\\pi r^3\\), so \\(\\dfrac{dV}{dr} = 4\\pi r^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dV}{dt} = 4\\pi r^2 \\cdot \\dfrac{dr}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(r = ${r}\\), \\(\\dfrac{dr}{dt} = ${drdt}\\):<br>` +
                     `\\(\\dfrac{dV}{dt} = 4\\pi \\times ${r * r} \\times ${drdt} = ${coeff}\\pi\\) cm\\(^3\\) s\\(^{-1}\\).`
        };
    },

    /**
     * 5. qVolumeOfCylinder - Medium (MC)
     * V = πr²h with r fixed. dV/dt = πr² · dh/dt. Given r and dh/dt, find dV/dt.
     * Answer as Nπ.
     */
    qVolumeOfCylinder() {
        const r    = MathUtils.randInt(2, 6);
        const dhdt = MathUtils.randInt(1, 5);

        // dV/dt = π·r²·dh/dt — coefficient of π
        const coeff = r * r * dhdt;

        function piTex(k) {
            if (k === 1)  return `\\pi`;
            if (k === -1) return `-\\pi`;
            return `${k}\\pi`;
        }

        const correctTex = piTex(coeff);

        // Distractors:
        // E1: used 2πr·dh/dt (confusing with circumference)
        const e1 = 2 * r * dhdt;
        // E2: forgot dh/dt factor → πr²
        const e2 = r * r;
        // E3: used πr²h notation error → 2πr·h·dh/dt (differentiated h² instead)
        const e3 = 2 * r * r * dhdt;

        const seen = new Set([coeff]);
        const opts = [{ value: 1, tex: correctTex }];
        for (const ec of [e1, e2, e3]) {
            if (!seen.has(ec)) {
                seen.add(ec);
                opts.push({ value: 0, tex: piTex(ec) });
            } else {
                let alt = coeff + opts.length * r;
                while (seen.has(alt)) alt += r;
                seen.add(alt);
                opts.push({ value: 0, tex: piTex(alt) });
            }
        }
        while (opts.length < 4) {
            let alt = coeff + opts.length * r;
            while (seen.has(alt)) alt += r;
            seen.add(alt);
            opts.push({ value: 0, tex: piTex(alt) });
        }

        const shuffled = MathUtils.shuffle(opts);

        return {
            type: 'mc',
            rule: 'Cylinder Volume Rate',
            difficulty: 'medium',
            text: `Water is poured into a cylinder of fixed radius \\(r = ${r}\\) cm. The water level rises at \\(${dhdt}\\) cm s\\(^{-1}\\). Find the rate at which the volume of water is increasing.`,
            latex: `\\(V = \\pi r^2 h,\\quad r \\text{ fixed},\\quad \\dfrac{dV}{dt} = \\pi r^2\\,\\dfrac{dh}{dt}\\)`,
            answer: 1,
            answerTex: correctTex,
            options: shuffled,
            hintTex: [
                `\\text{Since } r \\text{ is fixed: } \\frac{dV}{dt} = \\pi r^2 \\cdot \\frac{dh}{dt}`,
                `= \\pi \\times ${r}^2 \\times ${dhdt} = ${coeff}\\pi`
            ],
            explain: `<strong>Step 1:</strong> Since \\(r\\) is constant, \\(V = \\pi r^2 h\\) gives \\(\\dfrac{dV}{dh} = \\pi r^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dV}{dt} = \\pi r^2 \\cdot \\dfrac{dh}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(r = ${r}\\), \\(\\dfrac{dh}{dt} = ${dhdt}\\):<br>` +
                     `\\(\\dfrac{dV}{dt} = \\pi \\times ${r * r} \\times ${dhdt} = ${coeff}\\pi\\) cm\\(^3\\) s\\(^{-1}\\).`
        };
    },

    /**
     * 6. qInverseProportion - Medium (Free)
     * y = k/x. dy/dt = (-k/x²) · dx/dt. Given k, x, dx/dt, find dy/dt (integer).
     */
    qInverseProportion() {
        // Choose k, x, dxdt so that -k * dxdt / x² is an integer
        // i.e. k * dxdt divisible by x²
        // Strategy: pick x, dxdt; set k = x² * m for some integer m
        const x    = MathUtils.randInt(2, 5);
        const dxdt = MathUtils.nonZeroRandInt(1, 4);
        const m    = MathUtils.nonZeroRandInt(1, 4); // dy/dt will be -m * dxdt
        const k    = x * x * m;

        // dy/dt = -k * dxdt / x²  = -m * dxdt
        const answer = -m * dxdt;

        return {
            type: 'free',
            rule: 'Inverse Proportion Rate',
            difficulty: 'medium',
            text: `Given \\(y = \\dfrac{${k}}{x}\\) and \\(\\dfrac{dx}{dt} = ${dxdt}\\), find \\(\\dfrac{dy}{dt}\\) when \\(x = ${x}\\).`,
            latex: `\\(y = \\dfrac{k}{x} \\Rightarrow \\dfrac{dy}{dt} = -\\dfrac{k}{x^2}\\,\\dfrac{dx}{dt}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{dy}{dx} = -\\frac{${k}}{x^2},\\quad \\frac{dy}{dt} = -\\frac{${k}}{x^2} \\cdot \\frac{dx}{dt}`,
                `= -\\frac{${k}}{${x * x}} \\times ${dxdt} = -${m} \\times ${dxdt} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(y = \\dfrac{${k}}{x} = ${k}x^{-1}\\) with respect to \\(x\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = -\\dfrac{${k}}{x^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dy}{dt} = -\\dfrac{${k}}{x^2} \\cdot \\dfrac{dx}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(x = ${x}\\), \\(\\dfrac{dx}{dt} = ${dxdt}\\):<br>` +
                     `\\(\\dfrac{dy}{dt} = -\\dfrac{${k}}{${x * x}} \\times ${dxdt} = -${m} \\times ${dxdt} = ${answer}\\).`
        };
    },

    /**
     * 7. qLinearRate - Easy (Free)
     * y = ax + b. dy/dt = a · dx/dt. Given a and dx/dt = c, find dy/dt = a·c (integer).
     */
    qLinearRate() {
        const a = MathUtils.nonZeroRandInt(-6, 6);
        const b = MathUtils.randInt(-8, 8);
        const c = MathUtils.nonZeroRandInt(-5, 5); // dx/dt

        // dy/dt = a · c
        const answer = a * c;

        // Format y = ax + b
        let aTex;
        if (a === 1)  aTex = '';
        else if (a === -1) aTex = '-';
        else aTex = String(a);

        let bTex;
        if (b === 0)      bTex = '';
        else if (b > 0)   bTex = ` + ${b}`;
        else              bTex = ` - ${Math.abs(b)}`;

        const yTex = `y = ${aTex}x${bTex}`;

        return {
            type: 'free',
            rule: 'Linear Rate',
            difficulty: 'easy',
            text: `Given \\(${yTex}\\) and \\(\\dfrac{dx}{dt} = ${c}\\), find \\(\\dfrac{dy}{dt}\\).`,
            latex: `\\(\\dfrac{dy}{dt} = \\dfrac{dy}{dx} \\cdot \\dfrac{dx}{dt}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{dy}{dx} = ${a} \\quad (\\text{gradient of the line})`,
                `\\frac{dy}{dt} = ${a} \\times ${c} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(${yTex}\\) with respect to \\(x\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = ${a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dy}{dt} = \\dfrac{dy}{dx} \\cdot \\dfrac{dx}{dt} = ${a} \\times ${c}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\dfrac{dy}{dt} = ${answer}\\).<br><br>` +
                     `<strong>Note:</strong> For a linear function the rate is constant — it does not depend on the value of \\(x\\).`
        };
    },

    /**
     * 8. qChainRule - Medium (Free)
     * y = x³. dy/dt = 3x² · dx/dt. Given x and dx/dt, find dy/dt (integer).
     */
    qChainRule() {
        // Keep x small to avoid huge integers
        const x    = MathUtils.randInt(1, 4);
        const dxdt = MathUtils.randInt(1, 4);

        // dy/dt = 3x² · dx/dt
        const answer = 3 * x * x * dxdt;

        return {
            type: 'free',
            rule: 'Power Function Rate',
            difficulty: 'medium',
            text: `Given \\(y = x^3\\) and \\(\\dfrac{dx}{dt} = ${dxdt}\\), find \\(\\dfrac{dy}{dt}\\) when \\(x = ${x}\\).`,
            latex: `\\(\\dfrac{dy}{dt} = \\dfrac{dy}{dx} \\cdot \\dfrac{dx}{dt}\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{dy}{dx} = 3x^2,\\quad \\frac{dy}{dt} = 3x^2 \\cdot \\frac{dx}{dt}`,
                `= 3 \\times ${x}^2 \\times ${dxdt} = 3 \\times ${x * x} \\times ${dxdt} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(y = x^3\\) with respect to \\(x\\):<br>` +
                     `\\(\\dfrac{dy}{dx} = 3x^2\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dy}{dt} = 3x^2 \\cdot \\dfrac{dx}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(x = ${x}\\), \\(\\dfrac{dx}{dt} = ${dxdt}\\):<br>` +
                     `\\(\\dfrac{dy}{dt} = 3 \\times ${x * x} \\times ${dxdt} = ${answer}\\).`
        };
    },

    /**
     * 9. qPythagorean - Hard (Free)
     * x² + y² = L² (ladder against wall). 2x·dx/dt + 2y·dy/dt = 0.
     * dy/dt = -x·dx/dt / y. Uses Pythagorean triples for clean integer answers.
     */
    qPythagorean() {
        // Pythagorean triples: [a, b, c] where a² + b² = c²
        const triples = [
            [3, 4, 5],
            [5, 12, 13],
            [6, 8, 10],
            [8, 15, 17],
            [9, 12, 15]
        ];
        const [a, b, L] = MathUtils.pick(triples);

        // Randomly assign a→x, b→y or b→x, a→y
        const flip = MathUtils.pick([true, false]);
        const x = flip ? a : b;
        const y = flip ? b : a;

        // Pick dx/dt that makes dy/dt an integer: dy/dt = -x·dx/dt / y
        // Need y | x·dx/dt. Pick dxdt as a multiple of y/gcd(x,y).
        const g    = MathUtils.gcd(x, y);
        const base = y / g; // smallest dxdt that gives integer answer
        const mult = MathUtils.randInt(1, 3);
        const dxdt = base * mult;

        // dy/dt = -x * dxdt / y
        const answer = -(x * dxdt) / y;

        return {
            type: 'free',
            rule: 'Sliding Ladder',
            difficulty: 'hard',
            text: `A \\(${L}\\) m ladder leans against a vertical wall. The base slides away from the wall at \\(${dxdt}\\) m s\\(^{-1}\\). ` +
                  `Find the rate at which the top of the ladder slides down when the base is \\(${x}\\) m from the wall.`,
            latex: `\\(x^2 + y^2 = ${L}^2,\\quad 2x\\,\\dfrac{dx}{dt} + 2y\\,\\dfrac{dy}{dt} = 0\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{When } x = ${x}:\\; y = \\sqrt{${L}^2 - ${x}^2} = \\sqrt{${L * L - x * x}} = ${y}`,
                `\\frac{dy}{dt} = -\\frac{x}{y} \\cdot \\frac{dx}{dt} = -\\frac{${x}}{${y}} \\times ${dxdt} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> From the constraint \\(x^2 + y^2 = ${L * L}\\), differentiate with respect to \\(t\\):<br>` +
                     `\\(2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Solve for \\(\\dfrac{dy}{dt}\\):<br>` +
                     `\\(\\dfrac{dy}{dt} = -\\dfrac{x}{y} \\cdot \\dfrac{dx}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Find \\(y\\) when \\(x = ${x}\\):<br>` +
                     `\\(y = \\sqrt{${L * L} - ${x * x}} = \\sqrt{${L * L - x * x}} = ${y}\\) m.<br><br>` +
                     `<strong>Step 4:</strong> Substitute \\(x = ${x}\\), \\(y = ${y}\\), \\(\\dfrac{dx}{dt} = ${dxdt}\\):<br>` +
                     `\\(\\dfrac{dy}{dt} = -\\dfrac{${x}}{${y}} \\times ${dxdt} = ${answer}\\) m s\\(^{-1}\\).<br><br>` +
                     `<strong>Note:</strong> The negative sign means the top is sliding <em>down</em>.`
        };
    },

    /**
     * 10. qTriangleBase - Medium (Free)
     * Area = (1/2)·b·h with h fixed. dA/dt = (1/2)·h·db/dt.
     * Pick even h or even db/dt so answer is integer.
     */
    qTriangleBase() {
        // Ensure (h * dbdt) is even so answer is integer
        // Either h even or dbdt even (or both)
        const h    = MathUtils.randInt(1, 8) * 2;     // always even
        const dbdt = MathUtils.randInt(1, 6);

        // dA/dt = (1/2) · h · db/dt
        const answer = (h * dbdt) / 2;

        return {
            type: 'free',
            rule: 'Triangle Area Rate',
            difficulty: 'medium',
            text: `A triangle has a fixed height of \\(${h}\\) cm. Its base is increasing at a rate of \\(${dbdt}\\) cm s\\(^{-1}\\). Find the rate at which the area is increasing.`,
            latex: `\\(A = \\tfrac{1}{2}bh,\\quad h \\text{ fixed},\\quad \\dfrac{dA}{dt} = ?\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\frac{dA}{dt} = \\frac{dA}{db} \\cdot \\frac{db}{dt} = \\frac{h}{2} \\cdot \\frac{db}{dt}`,
                `= \\frac{${h}}{2} \\times ${dbdt} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Write the formula: \\(A = \\tfrac{1}{2}bh\\). Since \\(h\\) is fixed, \\(\\dfrac{dA}{db} = \\dfrac{h}{2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Apply the chain rule:<br>` +
                     `\\(\\dfrac{dA}{dt} = \\dfrac{h}{2} \\cdot \\dfrac{db}{dt}\\).<br><br>` +
                     `<strong>Step 3:</strong> Substitute \\(h = ${h}\\), \\(\\dfrac{db}{dt} = ${dbdt}\\):<br>` +
                     `\\(\\dfrac{dA}{dt} = \\dfrac{${h}}{2} \\times ${dbdt} = ${h / 2} \\times ${dbdt} = ${answer}\\) cm\\(^2\\) s\\(^{-1}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => REL_RATES.qCircleArea(),          weight: 3, diff: 'easy'   }, // 0
            { fn: () => REL_RATES.qCircleCircumference(), weight: 3, diff: 'easy'   }, // 1
            { fn: () => REL_RATES.qSquareArea(),          weight: 3, diff: 'easy'   }, // 2
            { fn: () => REL_RATES.qVolumeOfSphere(),      weight: 2, diff: 'medium' }, // 3
            { fn: () => REL_RATES.qVolumeOfCylinder(),    weight: 2, diff: 'medium' }, // 4
            { fn: () => REL_RATES.qInverseProportion(),   weight: 2, diff: 'medium' }, // 5
            { fn: () => REL_RATES.qLinearRate(),          weight: 3, diff: 'easy'   }, // 6
            { fn: () => REL_RATES.qChainRule(),           weight: 2, diff: 'medium' }, // 7
            { fn: () => REL_RATES.qPythagorean(),         weight: 1, diff: 'hard'   }, // 8
            { fn: () => REL_RATES.qTriangleBase(),        weight: 2, diff: 'medium' }  // 9
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (REL_RATES.level === 'easy') {
            filtered = pool.filter(p => p.diff === 'easy');
        } else if (REL_RATES.level === 'medium') {
            filtered = pool.filter(p => p.diff === 'medium');
        } else if (REL_RATES.level === 'hard') {
            filtered = pool.filter(p => p.diff === 'hard');
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
        REL_RATES.score    = 0;
        REL_RATES.total    = 0;
        REL_RATES.streak   = 0;
        REL_RATES.answered = false;
        REL_RATES.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="REL_RATES.unload()">Related Rates (5.15)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Related Rates</h1>
                <p>IB Math AA 5.15 &mdash; Chain rule for connected rates of change</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="REL_RATES.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="REL_RATES.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="REL_RATES.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="REL_RATES.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="rr-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="rr-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="rr-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="rr-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="rr-question-card">
                <span class="rule-tag"       id="rr-rule"></span>
                <span class="difficulty-tag" id="rr-difficulty"></span>
                <div class="question-text"   id="rr-text"></div>
                <div class="question-prompt" id="rr-latex"></div>
                <div id="rr-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="rr-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="rr-feedback">
                <div class="feedback-title"       id="rr-feedback-title"></div>
                <div class="feedback-explanation" id="rr-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint"    id="rr-hint-btn" onclick="REL_RATES.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="rr-next-btn" onclick="REL_RATES.next()" style="display:none;">Next Question</button>
            </div>
        `;

        REL_RATES.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to calculus view
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
        REL_RATES.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        REL_RATES.score  = 0;
        REL_RATES.total  = 0;
        REL_RATES.streak = 0;
        REL_RATES.updateStats();
        REL_RATES.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        REL_RATES.answered  = false;
        REL_RATES.hintIndex = 0;
        REL_RATES.currentQ  = REL_RATES.pickQuestion();
        const q = REL_RATES.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('rr-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('rr-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('rr-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('rr-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('rr-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="REL_RATES.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="rr-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')REL_RATES.checkFree()">
                    <button class="btn btn-primary" onclick="REL_RATES.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('rr-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('rr-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('rr-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('rr-next-btn').style.display = 'none';
        document.getElementById('rr-hint-btn').style.display = '';
        document.getElementById('rr-hint-btn').disabled = false;

        // Render KaTeX
        REL_RATES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = REL_RATES.currentQ;
        if (!q || !q.hintTex || REL_RATES.hintIndex >= q.hintTex.length) return;

        const hintBox    = document.getElementById('rr-hint-box');
        const hintContent = REL_RATES.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[REL_RATES.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        REL_RATES.hintIndex++;

        if (REL_RATES.hintIndex >= q.hintTex.length) {
            document.getElementById('rr-hint-btn').disabled = true;
        }

        REL_RATES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (REL_RATES.answered) return;
        REL_RATES.answered = true;
        REL_RATES.total++;

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
            REL_RATES.score++;
            REL_RATES.streak++;
        } else {
            btn.classList.add('incorrect');
            REL_RATES.streak = 0;
        }

        REL_RATES.showFeedback(isCorrect);
        REL_RATES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (REL_RATES.answered) return;

        const inp = document.getElementById('rr-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        REL_RATES.answered = true;
        REL_RATES.total++;
        inp.disabled = true;

        const q = REL_RATES.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.1);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background  = 'var(--success-light)';
            REL_RATES.score++;
            REL_RATES.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background  = 'var(--error-light)';
            REL_RATES.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        REL_RATES.showFeedback(isCorrect);
        REL_RATES.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q           = REL_RATES.currentQ;
        const fb          = document.getElementById('rr-feedback');
        const title       = document.getElementById('rr-feedback-title');
        const explanation = document.getElementById('rr-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (REL_RATES.streak > 1) {
                title.textContent = `Correct! (${REL_RATES.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('rr-next-btn').style.display = '';
        document.getElementById('rr-hint-btn').style.display = 'none';

        REL_RATES.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl  = document.getElementById('rr-score');
        const totalEl  = document.getElementById('rr-total');
        const streakEl = document.getElementById('rr-streak');
        const accEl    = document.getElementById('rr-accuracy');

        if (scoreEl)  scoreEl.textContent  = REL_RATES.score;
        if (totalEl)  totalEl.textContent  = REL_RATES.total;
        if (streakEl) streakEl.textContent = REL_RATES.streak;
        if (accEl) {
            accEl.textContent = REL_RATES.total > 0
                ? Math.round((REL_RATES.score / REL_RATES.total) * 100) + '%'
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
                        { left: '\\[', right: '\\]', display: true  },
                        { left: '$$',  right: '$$',  display: true  },
                        { left: '$',   right: '$',   display: false }
                    ],
                    throwOnError: false
                });
            }
        }
    }
};

// Register in activity inits
if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['related-rates'] = () => REL_RATES.load();
}
