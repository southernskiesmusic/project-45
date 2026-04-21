/*
 * vectors-kinematics.js - IB Math AA: Vectors and Kinematics
 * Position vectors, velocity, acceleration, displacement, unit velocity, relative position
 */

const VEC_KINEM = {
    prefix: 'vk-',
    unload: 'geometry-trig',

    load() {
        VEC_KINEM.score = 0; VEC_KINEM.total = 0; VEC_KINEM.streak = 0;
        VEC_KINEM.answered = false; VEC_KINEM.hintIndex = 0;
        const container = document.getElementById('activity-container');
        if (!container) return;
        container.innerHTML = `
            <button class="back-btn" onclick="VEC_KINEM.unload()">&#8592; Vectors &amp; Kinematics</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Vectors &amp; Kinematics</h1>
                <p style="color:var(--text-light);font-size:0.9rem;">IB Math AA 3.15</p>
            </header>
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="VEC_KINEM.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="VEC_KINEM.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="VEC_KINEM.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="VEC_KINEM.setLevel('hard')">Hard</button>
            </div>
            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="vk-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="vk-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="vk-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="vk-accuracy">-</div></div>
            </div>
            <div class="question-card" id="vk-question-card">
                <span class="rule-tag" id="vk-rule"></span>
                <span class="difficulty-tag" id="vk-difficulty"></span>
                <div class="question-text" id="vk-text"></div>
                <div class="question-prompt" id="vk-latex"></div>
                <div id="vk-options-area"></div>
            </div>
            <details class="workout-section"><summary>+ Working Out</summary>
                <div class="workout-content" contenteditable="true" style="min-height:60px;padding:12px;"></div>
            </details>
            <div class="hint-box" id="vk-hint-box"></div>
            <div class="feedback" id="vk-feedback">
                <div class="feedback-title" id="vk-feedback-title"></div>
                <div class="feedback-explanation" id="vk-feedback-explanation"></div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:16px;">
                <button class="btn btn-hint" id="vk-hint-btn" onclick="VEC_KINEM.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="vk-next-btn" onclick="VEC_KINEM.next()">Next Question</button>
            </div>
        `;
        VEC_KINEM.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('geometry-trig');
    },

    init() {
        this.questions = [
            { method: 'qVelocityFromPosition', weight: 1 },
            { method: 'qAccelerationVector',   weight: 1 },
            { method: 'qSpeedAtTime',          weight: 1 },
            { method: 'qPositionAtTime',       weight: 1 },
            { method: 'qDisplacementVector',   weight: 1 },
            { method: 'qUnitVelocity',         weight: 1 },
            { method: 'qTimeToOrigin',         weight: 1 },
            { method: 'qVelocityMagnitude',    weight: 1 },
            { method: 'qParticleDirection',    weight: 1 },
            { method: 'qRelativePosition',     weight: 1 },
        ];
        
    },

    pool() { return MathUtils.pick(this.questions); },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qVelocityFromPosition
     * r(t) = (at, bt²). Find speed |v(t)| at a given time T.
     * v(t) = (a, 2bt). Speed = √(a² + (2bT)²).
     */
    qVelocityFromPosition() {
        const a  = MathUtils.nonZeroRandInt(-4, 4);
        const b  = MathUtils.nonZeroRandInt(-3, 3);
        const T  = MathUtils.randInt(1, 4);

        const vx = a;
        const vy = 2 * b * T;
        const speed = Math.round(Math.sqrt(vx * vx + vy * vy) * 10000) / 10000;

        const bSign = b >= 0 ? `+${b}` : String(b);

        return {
            type: 'free',
            rule: 'Speed from Position',
            difficulty: 'medium',
            text: `A particle has position vector \\(\\mathbf{r}(t) = \\begin{pmatrix} ${a}t \\\\ ${b}t^2 \\end{pmatrix}\\). Find the speed of the particle at \\(t = ${T}\\). Give your answer to 4 decimal places if not an integer.`,
            latex: '',
            answer: speed,
            answerTex: Number.isInteger(speed) ? String(speed) : speed.toFixed(4),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\mathbf{v}(t) = \\frac{d}{dt}\\mathbf{r}(t) = \\begin{pmatrix} ${a} \\\\ ${2 * b}t \\end{pmatrix}`,
                `\\mathbf{v}(${T}) = \\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix},\\quad |\\mathbf{v}| = \\sqrt{${vx}^2 + ${vy}^2}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(\\mathbf{r}(t)\\) component-by-component to get velocity:<br>` +
                     `\\(\\mathbf{v}(t) = \\begin{pmatrix} ${a} \\\\ ${2 * b}t \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute \\(t = ${T}\\):<br>` +
                     `\\(\\mathbf{v}(${T}) = \\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 3:</strong> Speed \\(= |\\mathbf{v}| = \\sqrt{(${vx})^2 + (${vy})^2} = \\sqrt{${vx * vx + vy * vy}} = ${speed}\\).`
        };
    },

    /**
     * 2. qAccelerationVector
     * v(t) = (a, bt). Acceleration a(t) = dv/dt = (0, b).
     * Ask for the y-component of acceleration (which is b, a constant).
     */
    qAccelerationVector() {
        const a = MathUtils.nonZeroRandInt(-5, 5);   // constant x-component of v
        const b = MathUtils.nonZeroRandInt(-5, 5);   // coefficient for y-component of v

        // a(t) = (0, b)
        const answer = b;   // y-component of acceleration

        return {
            type: 'free',
            rule: 'Acceleration Vector',
            difficulty: 'easy',
            text: `A particle has velocity \\(\\mathbf{v}(t) = \\begin{pmatrix} ${a} \\\\ ${b}t \\end{pmatrix}\\). Find the y-component of the acceleration vector.`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\mathbf{a}(t) = \\frac{d}{dt}\\mathbf{v}(t) = \\begin{pmatrix} 0 \\\\ ${b} \\end{pmatrix}`,
                `\\text{y-component of }\\mathbf{a} = ${b}`
            ],
            explain: `<strong>Step 1:</strong> Differentiate \\(\\mathbf{v}(t)\\) to find acceleration:<br>` +
                     `\\(\\mathbf{a}(t) = \\dfrac{d}{dt}\\begin{pmatrix} ${a} \\\\ ${b}t \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ ${b} \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 2:</strong> The y-component of acceleration is constant: \\(a_y = ${b}\\).`
        };
    },

    /**
     * 3. qSpeedAtTime
     * Given v = (3, 4), find |v|. Uses Pythagorean triples for clean integer speeds.
     */
    qSpeedAtTime() {
        const triples = [
            [3, 4, 5], [-3, 4, 5], [3, -4, 5], [-3, -4, 5],
            [5, 12, 13], [-5, 12, 13], [5, -12, 13],
            [6, 8, 10], [-6, 8, 10],
            [8, 6, 10], [-8, 6, 10],
            [1, 0, 1], [0, 3, 3], [4, 0, 4]
        ];
        const [vx, vy, speed] = MathUtils.pick(triples);

        return {
            type: 'free',
            rule: 'Speed (Magnitude)',
            difficulty: 'easy',
            text: `A particle has velocity vector \\(\\mathbf{v} = \\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix}\\text{ m s}^{-1}\\). Find the speed \\(|\\mathbf{v}|\\).`,
            latex: '',
            answer: speed,
            answerTex: String(speed),
            tol: 0.01,
            options: [],
            hintTex: [
                `|\\mathbf{v}| = \\sqrt{v_x^2 + v_y^2}`,
                `= \\sqrt{(${vx})^2 + (${vy})^2} = \\sqrt{${vx * vx + vy * vy}}`
            ],
            explain: `<strong>Step 1:</strong> Use the magnitude formula \\(|\\mathbf{v}| = \\sqrt{v_x^2 + v_y^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(|\\mathbf{v}| = \\sqrt{(${vx})^2 + (${vy})^2} = \\sqrt{${vx * vx} + ${vy * vy}} = \\sqrt{${vx * vx + vy * vy}} = ${speed}\\text{ m s}^{-1}\\).`
        };
    },

    /**
     * 4. qPositionAtTime
     * Given r(0) = (rx0, ry0) and constant velocity v = (vx, vy), find x-coordinate at time T.
     * r(T) = r(0) + T·v. Answer: rx0 + T·vx.
     */
    qPositionAtTime() {
        const rx0 = MathUtils.randInt(-6, 6);
        const ry0 = MathUtils.randInt(-6, 6);
        const vx  = MathUtils.nonZeroRandInt(-4, 4);
        const vy  = MathUtils.nonZeroRandInt(-4, 4);
        const T   = MathUtils.randInt(1, 5);

        const answer = rx0 + T * vx;

        return {
            type: 'free',
            rule: 'Position at Time',
            difficulty: 'easy',
            text: `A particle starts at position \\(\\mathbf{r}(0) = \\begin{pmatrix} ${rx0} \\\\ ${ry0} \\end{pmatrix}\\) and moves with constant velocity \\(\\mathbf{v} = \\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix}\\). Find the x-coordinate of the particle at \\(t = ${T}\\).`,
            latex: '',
            answer: answer,
            answerTex: String(answer),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\mathbf{r}(t) = \\mathbf{r}(0) + t\\,\\mathbf{v}`,
                `x(${T}) = ${rx0} + ${T}(${vx}) = ${rx0} + ${T * vx} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> With constant velocity, \\(\\mathbf{r}(t) = \\mathbf{r}(0) + t\\,\\mathbf{v}\\).<br><br>` +
                     `<strong>Step 2:</strong> x-component: \\(x(${T}) = ${rx0} + ${T} \\times ${vx} = ${rx0} + ${T * vx} = ${answer}\\).<br><br>` +
                     `<strong>Note:</strong> Full position: \\(\\mathbf{r}(${T}) = \\begin{pmatrix} ${answer} \\\\ ${ry0 + T * vy} \\end{pmatrix}\\).`
        };
    },

    /**
     * 5. qDisplacementVector
     * Given start A = (ax, ay) and end B = (bx, by), find x-component of displacement AB.
     * Displacement = B - A. Answer: bx - ax.
     */
    qDisplacementVector() {
        const ax = MathUtils.randInt(-6, 6);
        const ay = MathUtils.randInt(-6, 6);
        const bx = MathUtils.randInt(-6, 6);
        const by = MathUtils.randInt(-6, 6);

        const dx = bx - ax;
        const dy = by - ay;

        return {
            type: 'free',
            rule: 'Displacement Vector',
            difficulty: 'easy',
            text: `A particle moves from position \\(A = (${ax},\\,${ay})\\) to position \\(B = (${bx},\\,${by})\\). Find the x-component of the displacement vector.`,
            latex: '',
            answer: dx,
            answerTex: String(dx),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\text{Displacement} = \\overrightarrow{AB} = B - A`,
                `= \\begin{pmatrix} ${bx} - (${ax}) \\\\ ${by} - (${ay}) \\end{pmatrix} = \\begin{pmatrix} ${dx} \\\\ ${dy} \\end{pmatrix}`
            ],
            explain: `<strong>Step 1:</strong> Displacement \\(\\overrightarrow{AB} = B - A\\).<br><br>` +
                     `<strong>Step 2:</strong> Subtract coordinates:<br>` +
                     `\\(\\overrightarrow{AB} = \\begin{pmatrix} ${bx} - (${ax}) \\\\ ${by} - (${ay}) \\end{pmatrix} = \\begin{pmatrix} ${dx} \\\\ ${dy} \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 3:</strong> The x-component of displacement is \\(${dx}\\).`
        };
    },

    /**
     * 6. qUnitVelocity
     * Given velocity v = (vx, vy), find x-component of the unit velocity vector.
     * Uses clean Pythagorean pairs for integer magnitudes.
     */
    qUnitVelocity() {
        const pairs = [
            [3, 4, 5], [-3, 4, 5], [3, -4, 5], [-3, -4, 5],
            [5, 12, 13], [-5, 12, 13],
            [6, 8, 10], [-6, 8, 10],
            [8, 6, 10], [-8, 6, 10],
            [1, 0, 1], [0, 1, 1]
        ];
        const [vx, vy, mag] = MathUtils.pick(pairs);

        const uxRaw = vx / mag;
        const ux = Math.round(uxRaw * 10000) / 10000;

        return {
            type: 'free',
            rule: 'Unit Velocity Vector',
            difficulty: 'medium',
            text: `A particle has velocity \\(\\mathbf{v} = \\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix}\\text{ m s}^{-1}\\). Find the x-component of the unit velocity vector \\(\\hat{\\mathbf{v}} = \\dfrac{\\mathbf{v}}{|\\mathbf{v}|}\\). Give your answer to 4 decimal places.`,
            latex: '',
            answer: ux,
            answerTex: ux.toFixed(4),
            tol: 0.001,
            options: [],
            hintTex: [
                `|\\mathbf{v}| = \\sqrt{(${vx})^2 + (${vy})^2} = \\sqrt{${vx * vx + vy * vy}} = ${mag}`,
                `\\hat{v}_x = \\frac{v_x}{|\\mathbf{v}|} = \\frac{${vx}}{${mag}} = ${ux.toFixed(4)}`
            ],
            explain: `<strong>Step 1:</strong> Find the magnitude: \\(|\\mathbf{v}| = \\sqrt{(${vx})^2 + (${vy})^2} = \\sqrt{${vx * vx + vy * vy}} = ${mag}\\).<br><br>` +
                     `<strong>Step 2:</strong> Divide \\(\\mathbf{v}\\) by its magnitude: \\(\\hat{\\mathbf{v}} = \\dfrac{1}{${mag}}\\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 3:</strong> x-component: \\(\\hat{v}_x = \\dfrac{${vx}}{${mag}} = ${ux.toFixed(4)}\\).`
        };
    },

    /**
     * 7. qTimeToOrigin
     * r(t) = a + t·v. Find t when x-component = 0.
     * t = -ax / vx. Constructed so answer is a positive integer.
     */
    qTimeToOrigin() {
        // Choose t* = 1..5, then build ax = -t*·vx so x(t*)=0
        const tStar = MathUtils.randInt(1, 5);
        const vx    = MathUtils.nonZeroRandInt(-4, 4);
        const vy    = MathUtils.nonZeroRandInt(-4, 4);
        const ax    = -tStar * vx;     // so ax + t*·vx = 0
        const ay    = MathUtils.randInt(-5, 5);

        const answer = tStar;

        const axSign = ax >= 0 ? `${ax}` : `${ax}`;
        const aySign = ay >= 0 ? `${ay}` : `${ay}`;
        const vxSign = vx >= 0 ? `+${vx}` : `${vx}`;
        const vySign = vy >= 0 ? `+${vy}` : `${vy}`;

        return {
            type: 'free',
            rule: 'Time to x = 0',
            difficulty: 'medium',
            text: `A particle has position vector \\(\\mathbf{r}(t) = \\begin{pmatrix} ${ax}${vxSign}t \\\\ ${ay}${vySign}t \\end{pmatrix}\\). Find the value of \\(t > 0\\) when the x-coordinate of the particle is zero.`,
            latex: '',
            answer: answer,
            answerTex: `t = ${answer}`,
            tol: 0.01,
            options: [],
            hintTex: [
                `\\text{Set } x(t) = 0:\\quad ${ax} + ${vx}t = 0`,
                `t = \\frac{-${ax}}{${vx}} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> The x-component of \\(\\mathbf{r}(t)\\) is \\(x(t) = ${ax} + ${vx}t\\).<br><br>` +
                     `<strong>Step 2:</strong> Set \\(x = 0\\):<br>` +
                     `\\(${ax} + ${vx}t = 0\\)<br>` +
                     `\\(t = \\dfrac{-${ax}}{${vx}} = ${answer}\\).<br><br>` +
                     `<strong>Answer:</strong> \\(t = ${answer}\\).`
        };
    },

    /**
     * 8. qVelocityMagnitude
     * Given v(t) = (p, q) at a specific time (constants), find |v|.
     * Randomise p and q; uses clean triples where possible.
     */
    qVelocityMagnitude() {
        const triples = [
            [3, 4, 5], [-3, 4, 5], [3, -4, 5],
            [5, 12, 13], [6, 8, 10], [8, 6, 10],
            [2, 0, 2], [0, 5, 5], [4, 3, 5]
        ];
        const [p, q, mag] = MathUtils.pick(triples);

        return {
            type: 'free',
            rule: 'Velocity Magnitude',
            difficulty: 'easy',
            text: `At a particular instant, a particle has velocity \\(\\mathbf{v} = \\begin{pmatrix} ${p} \\\\ ${q} \\end{pmatrix}\\text{ m s}^{-1}\\). Find \\(|\\mathbf{v}|\\).`,
            latex: '',
            answer: mag,
            answerTex: String(mag),
            tol: 0.01,
            options: [],
            hintTex: [
                `|\\mathbf{v}| = \\sqrt{p^2 + q^2}`,
                `= \\sqrt{(${p})^2 + (${q})^2} = \\sqrt{${p * p + q * q}} = ${mag}`
            ],
            explain: `<strong>Step 1:</strong> Apply the magnitude formula: \\(|\\mathbf{v}| = \\sqrt{v_x^2 + v_y^2}\\).<br><br>` +
                     `<strong>Step 2:</strong> Substitute: \\(|\\mathbf{v}| = \\sqrt{(${p})^2 + (${q})^2} = \\sqrt{${p * p} + ${q * q}} = \\sqrt{${p * p + q * q}} = ${mag}\\text{ m s}^{-1}\\).`
        };
    },

    /**
     * 9. qParticleDirection
     * Given a velocity vector, identify the direction of motion (MC).
     * Quadrant-based: positive/negative x and y components determine quadrant.
     */
    qParticleDirection() {
        // Pick a quadrant scenario deterministically
        const scenarios = [
            { vx:  3, vy:  4, dir: 'right and upward',   quad: 1 },
            { vx: -3, vy:  4, dir: 'left and upward',    quad: 2 },
            { vx: -3, vy: -4, dir: 'left and downward',  quad: 3 },
            { vx:  3, vy: -4, dir: 'right and downward', quad: 4 },
            { vx:  5, vy:  0, dir: 'in the positive x-direction (right)', quad: 0 },
            { vx:  0, vy:  3, dir: 'in the positive y-direction (upward)', quad: 0 },
            { vx: -2, vy:  0, dir: 'in the negative x-direction (left)', quad: 0 },
            { vx:  0, vy: -5, dir: 'in the negative y-direction (downward)', quad: 0 },
        ];

        const sc = MathUtils.pick(scenarios);
        const { vx, vy, dir } = sc;

        // Build options: always 4, correct one has value:1
        const allDirs = [
            'right and upward',
            'left and upward',
            'left and downward',
            'right and downward',
            'in the positive x-direction (right)',
            'in the positive y-direction (upward)',
            'in the negative x-direction (left)',
            'in the negative y-direction (downward)',
        ];

        // Pick 3 wrong distractors (different from correct)
        const wrongs = allDirs.filter(d => d !== dir);
        const shuffledWrongs = MathUtils.shuffle(wrongs);
        const distractors = shuffledWrongs.slice(0, 3);

        const optionDirs = MathUtils.shuffle([
            { label: dir,           value: 1 },
            { label: distractors[0], value: 0 },
            { label: distractors[1], value: 0 },
            { label: distractors[2], value: 0 },
        ]);

        const options = optionDirs.map(o => ({
            label: o.label,
            value: o.value,
            tex: `\\text{${o.label.charAt(0).toUpperCase() + o.label.slice(1)}}`
        }));

        return {
            type: 'mc',
            rule: 'Direction of Motion',
            difficulty: 'easy',
            text: `A particle has velocity \\(\\mathbf{v} = \\begin{pmatrix} ${vx} \\\\ ${vy} \\end{pmatrix}\\text{ m s}^{-1}\\). Which of the following best describes the direction of motion?`,
            latex: '',
            answer: 1,
            answerTex: `\\text{${dir.charAt(0).toUpperCase() + dir.slice(1)}}`,
            tol: 0.01,
            options: options,
            hintTex: [
                `\\text{x-component: } v_x = ${vx}\\quad(${vx > 0 ? '\\text{rightward}' : vx < 0 ? '\\text{leftward}' : '\\text{no horizontal motion}'})`,
                `\\text{y-component: } v_y = ${vy}\\quad(${vy > 0 ? '\\text{upward}' : vy < 0 ? '\\text{downward}' : '\\text{no vertical motion}'})`
            ],
            explain: `<strong>Step 1:</strong> Check the sign of each velocity component.<br><br>` +
                     `<strong>x-component:</strong> \\(v_x = ${vx}\\) → ` +
                     (vx > 0 ? 'moving rightward' : vx < 0 ? 'moving leftward' : 'no horizontal motion') + `.<br>` +
                     `<strong>y-component:</strong> \\(v_y = ${vy}\\) → ` +
                     (vy > 0 ? 'moving upward' : vy < 0 ? 'moving downward' : 'no vertical motion') + `.<br><br>` +
                     `<strong>Answer:</strong> The particle is moving <strong>${dir}</strong>.`
        };
    },

    /**
     * 10. qRelativePosition
     * Given position vectors A and B for two particles, find x-component of B relative to A.
     * Relative position of B from A = B - A. Answer: bx - ax.
     */
    qRelativePosition() {
        const ax = MathUtils.randInt(-6, 6);
        const ay = MathUtils.randInt(-6, 6);
        const bx = MathUtils.randInt(-6, 6);
        const by = MathUtils.randInt(-6, 6);

        const relX = bx - ax;
        const relY = by - ay;

        return {
            type: 'free',
            rule: 'Relative Position',
            difficulty: 'easy',
            text: `Particle \\(A\\) has position vector \\(\\mathbf{a} = \\begin{pmatrix} ${ax} \\\\ ${ay} \\end{pmatrix}\\) and particle \\(B\\) has position vector \\(\\mathbf{b} = \\begin{pmatrix} ${bx} \\\\ ${by} \\end{pmatrix}\\). Find the x-component of the position of \\(B\\) relative to \\(A\\).`,
            latex: '',
            answer: relX,
            answerTex: String(relX),
            tol: 0.01,
            options: [],
            hintTex: [
                `\\text{Position of } B \\text{ relative to } A = \\mathbf{b} - \\mathbf{a}`,
                `= \\begin{pmatrix} ${bx} - (${ax}) \\\\ ${by} - (${ay}) \\end{pmatrix} = \\begin{pmatrix} ${relX} \\\\ ${relY} \\end{pmatrix}`
            ],
            explain: `<strong>Step 1:</strong> The position of \\(B\\) relative to \\(A\\) is \\(\\mathbf{b} - \\mathbf{a}\\).<br><br>` +
                     `<strong>Step 2:</strong> Subtract:<br>` +
                     `\\(\\mathbf{b} - \\mathbf{a} = \\begin{pmatrix} ${bx} - (${ax}) \\\\ ${by} - (${ay}) \\end{pmatrix} = \\begin{pmatrix} ${relX} \\\\ ${relY} \\end{pmatrix}\\).<br><br>` +
                     `<strong>Step 3:</strong> The x-component of the relative position is \\(${relX}\\).`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER (legacy fallback)
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool (fallback if MathUtils.pick is array-based) */
    pickQuestion() {
        const pool = [
            { fn: () => VEC_KINEM.qVelocityFromPosition(), weight: 2, difficulty: 'medium' },
            { fn: () => VEC_KINEM.qAccelerationVector(),   weight: 2, difficulty: 'easy'   },
            { fn: () => VEC_KINEM.qSpeedAtTime(),          weight: 3, difficulty: 'easy'   },
            { fn: () => VEC_KINEM.qPositionAtTime(),       weight: 3, difficulty: 'easy'   },
            { fn: () => VEC_KINEM.qDisplacementVector(),   weight: 3, difficulty: 'easy'   },
            { fn: () => VEC_KINEM.qUnitVelocity(),         weight: 2, difficulty: 'medium' },
            { fn: () => VEC_KINEM.qTimeToOrigin(),         weight: 2, difficulty: 'medium' },
            { fn: () => VEC_KINEM.qVelocityMagnitude(),    weight: 3, difficulty: 'easy'   },
            { fn: () => VEC_KINEM.qParticleDirection(),    weight: 2, difficulty: 'easy'   },
            { fn: () => VEC_KINEM.qRelativePosition(),     weight: 3, difficulty: 'easy'   },
        ];

        let filtered = pool;
        if (VEC_KINEM.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (VEC_KINEM.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (VEC_KINEM.level === 'hard') {
            filtered = pool.filter(p => p.difficulty === 'medium'); // no hard; fall back
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
       UI (used when MathUtils.loadActivity is unavailable)
       ──────────────────────────────────────────── */

    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    next() {
        VEC_KINEM.answered  = false;
        VEC_KINEM.hintIndex = 0;
        VEC_KINEM.currentQ  = VEC_KINEM.pickQuestion();
        const q = VEC_KINEM.currentQ;

        document.getElementById('vk-rule').textContent = q.rule;

        const diffEl = document.getElementById('vk-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        document.getElementById('vk-text').innerHTML  = q.text;
        document.getElementById('vk-latex').innerHTML = q.latex;

        const optArea = document.getElementById('vk-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="VEC_KINEM.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="vk-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')VEC_KINEM.checkFree()">
                    <button class="btn btn-primary" onclick="VEC_KINEM.checkFree()">Submit</button>
                </div>`;
            setTimeout(() => {
                const inp = document.getElementById('vk-input');
                if (inp) inp.focus();
            }, 100);
        }

        const hintBox = document.getElementById('vk-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('vk-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('vk-next-btn').style.display  = 'none';
        document.getElementById('vk-hint-btn').style.display  = '';
        document.getElementById('vk-hint-btn').disabled       = false;

        VEC_KINEM.renderAllKaTeX();
    },

    showHint() {
        const q = VEC_KINEM.currentQ;
        if (!q || !q.hintTex || VEC_KINEM.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('vk-hint-box');
        const prev = VEC_KINEM.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[VEC_KINEM.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        VEC_KINEM.hintIndex++;

        if (VEC_KINEM.hintIndex >= q.hintTex.length) {
            document.getElementById('vk-hint-btn').disabled = true;
        }
        VEC_KINEM.renderAllKaTeX();
    },

    checkMC(btn) {
        if (VEC_KINEM.answered) return;
        VEC_KINEM.answered = true;
        VEC_KINEM.total++;

        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;

        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });

        if (isCorrect) { btn.classList.add('correct'); VEC_KINEM.score++; VEC_KINEM.streak++; }
        else           { btn.classList.add('incorrect'); VEC_KINEM.streak = 0; }

        VEC_KINEM.showFeedback(isCorrect);
        VEC_KINEM.updateStats();
    },

    checkFree() {
        if (VEC_KINEM.answered) return;

        const inp = document.getElementById('vk-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        VEC_KINEM.answered = true;
        VEC_KINEM.total++;
        inp.disabled = true;

        const q = VEC_KINEM.currentQ;
        const tol = q.tol !== undefined ? q.tol : 0.01;
        const isCorrect = MathUtils.approxEqual(val, q.answer, tol);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background  = 'var(--success-light)';
            VEC_KINEM.score++;
            VEC_KINEM.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background  = 'var(--error-light)';
            VEC_KINEM.streak = 0;
        }

        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        VEC_KINEM.showFeedback(isCorrect);
        VEC_KINEM.updateStats();
    },

    showFeedback(isCorrect) {
        const q           = VEC_KINEM.currentQ;
        const fb          = document.getElementById('vk-feedback');
        const title       = document.getElementById('vk-feedback-title');
        const explanation = document.getElementById('vk-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = VEC_KINEM.streak > 1
                ? `Correct! (${VEC_KINEM.streak} streak)`
                : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        document.getElementById('vk-next-btn').style.display = '';
        document.getElementById('vk-hint-btn').style.display = 'none';

        VEC_KINEM.renderAllKaTeX();
    },

    updateStats() {
        const scoreEl  = document.getElementById('vk-score');
        const totalEl  = document.getElementById('vk-total');
        const streakEl = document.getElementById('vk-streak');
        const accEl    = document.getElementById('vk-accuracy');

        if (scoreEl)  scoreEl.textContent  = VEC_KINEM.score;
        if (totalEl)  totalEl.textContent  = VEC_KINEM.total;
        if (streakEl) streakEl.textContent = VEC_KINEM.streak;
        if (accEl) {
            accEl.textContent = VEC_KINEM.total > 0
                ? Math.round((VEC_KINEM.score / VEC_KINEM.total) * 100) + '%'
                : '-';
        }
    },

    setLevel(lvl) {
        VEC_KINEM.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        VEC_KINEM.score  = 0;
        VEC_KINEM.total  = 0;
        VEC_KINEM.streak = 0;
        VEC_KINEM.updateStats();
        VEC_KINEM.next();
    },

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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['vectors-kinematics'] = () => VEC_KINEM.load();
