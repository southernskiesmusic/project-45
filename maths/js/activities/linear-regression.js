/*
 * linear-regression.js - IB Math AA 4.4: Linear Regression
 * Regression lines, correlation coefficient, R², interpolation vs extrapolation
 */

const LIN_REG = {
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
     * 1. qPredictY - Easy (Free)
     * Given ŷ = a + bx, find ŷ for a specific x. Answer to 1dp.
     */
    qPredictY() {
        const bChoices = [0.5, 1, 1.5, 2, 2.5, 3];
        const a = MathUtils.randInt(-5, 20);
        const b = MathUtils.pick(bChoices);
        const x = MathUtils.randInt(1, 20);

        const yHat = a + b * x;
        const answer = Math.round(yHat * 10) / 10;

        // Format equation nicely
        const aTex = a >= 0 ? String(a) : String(a);
        const bTex = String(b);
        const signStr = a >= 0 ? `${a}` : `(${a})`;

        return {
            type: 'free',
            rule: 'Predict ŷ',
            difficulty: 'easy',
            text: `Use the regression line below to predict the value of \\(\\hat{y}\\) when \\(x = ${x}\\). Give your answer to 1 decimal place.`,
            latex: `\\(\\hat{y} = ${signStr} + ${bTex}x\\)`,
            answer: answer,
            answerTex: String(answer),
            options: [],
            hintTex: [
                `\\text{Substitute } x = ${x} \\text{ into } \\hat{y} = ${a} + ${b}x`,
                `\\hat{y} = ${a} + ${b} \\times ${x} = ${a} + ${b * x} = ${answer}`
            ],
            explain: `<strong>Step 1:</strong> Substitute \\(x = ${x}\\) into the regression equation \\(\\hat{y} = ${a} + ${b}x\\).<br><br>` +
                     `<strong>Step 2:</strong> \\(\\hat{y} = ${a} + ${b} \\times ${x} = ${a} + ${b * x}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(\\hat{y} = ${answer}\\).`
        };
    },

    /**
     * 2. qFindX - Easy (Free)
     * Given ŷ = a + bx and a target ŷ_val, find x = (ŷ - a) / b.
     * Constructed so x is a clean integer.
     */
    qFindX() {
        const bChoices = [0.5, 1, 1.5, 2, 2.5, 3];
        const b = MathUtils.pick(bChoices);
        const a = MathUtils.randInt(-5, 20);
        // Pick a clean integer x first, then compute target ŷ
        const xClean = MathUtils.randInt(1, 15);
        const yTarget = a + b * xClean;

        const signStr = a >= 0 ? String(a) : `(${a})`;

        return {
            type: 'free',
            rule: 'Find x from ŷ',
            difficulty: 'easy',
            text: `Use the regression line below to find the value of \\(x\\) when \\(\\hat{y} = ${yTarget}\\).`,
            latex: `\\(\\hat{y} = ${signStr} + ${b}x\\)`,
            answer: xClean,
            answerTex: String(xClean),
            options: [],
            hintTex: [
                `\\text{Set } ${yTarget} = ${a} + ${b}x \\text{ and solve for } x`,
                `${b}x = ${yTarget} - ${a} = ${yTarget - a} \\implies x = \\frac{${yTarget - a}}{${b}} = ${xClean}`
            ],
            explain: `<strong>Step 1:</strong> Set \\(\\hat{y} = ${yTarget}\\) in the equation \\(${yTarget} = ${a} + ${b}x\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange: \\(${b}x = ${yTarget} - ${a} = ${yTarget - a}\\).<br><br>` +
                     `<strong>Step 3:</strong> Divide: \\(x = \\frac{${yTarget - a}}{${b}} = ${xClean}\\).`
        };
    },

    /**
     * 3. qInterpretGradient - Easy (MC)
     * What does the gradient b represent in context?
     */
    qInterpretGradient() {
        const contexts = [
            { x: 'hours studied', y: 'exam score', xUnit: 'hour', yUnit: 'marks' },
            { x: 'age (years)', y: 'salary (£1000s)', xUnit: 'year', yUnit: '£1000' },
            { x: 'temperature (°C)', y: 'ice cream sales', xUnit: '°C', yUnit: 'units' },
            { x: 'distance (km)', y: 'delivery time (min)', xUnit: 'km', yUnit: 'minute' },
            { x: 'height (cm)', y: 'weight (kg)', xUnit: 'cm', yUnit: 'kg' },
            { x: 'advertising spend (£)', y: 'revenue (£100s)', xUnit: '£', yUnit: '£100' },
            { x: 'training hours', y: 'performance score', xUnit: 'hour', yUnit: 'points' }
        ];
        const ctx = MathUtils.pick(contexts);

        const bChoices = [0.5, 1.5, 2, 2.5, 3, 4, 5, 0.8, 1.2];
        const b = MathUtils.pick(bChoices);
        const a = MathUtils.randInt(2, 30);

        const correctTex = `\\text{${ctx.y} increases by } ${b} \\text{ for each extra unit of ${ctx.x}}`;
        const options = MathUtils.shuffle([
            {
                value: 1,
                tex: `\\text{${ctx.y} increases by } ${b} \\text{ for each extra unit of ${ctx.x}}`
            },
            {
                value: 0,
                tex: `\\text{${ctx.y} decreases by } ${b} \\text{ for each unit of ${ctx.x}}`
            },
            {
                value: 0,
                tex: `\\text{The mean ${ctx.y} is } ${b}`
            },
            {
                value: 0,
                tex: `\\text{${b}\\% of the variation in ${ctx.y} is explained by ${ctx.x}}`
            }
        ]);

        return {
            type: 'mc',
            rule: 'Interpret Gradient',
            difficulty: 'easy',
            text: `The regression line \\(\\hat{y} = ${a} + ${b}x\\) models ${ctx.y} (\\(y\\)) from ${ctx.x} (\\(x\\)). What does the gradient \\(b = ${b}\\) represent?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{The gradient } b \\text{ is the rate of change of } y \\text{ per unit of } x`,
                `b = ${b} \\implies \\text{for every 1 extra unit of ${ctx.x}, ${ctx.y} changes by } ${b}`
            ],
            explain: `<strong>Step 1:</strong> In a regression line \\(\\hat{y} = a + bx\\), the gradient \\(b\\) represents the rate of change of \\(y\\) per unit increase in \\(x\\).<br><br>` +
                     `<strong>Step 2:</strong> Here \\(b = ${b}\\), so for every additional unit of ${ctx.x}, the predicted ${ctx.y} increases by \\(${b}\\).<br><br>` +
                     `<strong>Note:</strong> The gradient is always interpreted as the change in \\(y\\) per unit change in \\(x\\).`
        };
    },

    /**
     * 4. qInterpretIntercept - Easy (MC)
     * What does the y-intercept a represent?
     */
    qInterpretIntercept() {
        const contexts = [
            { x: 'hours worked', y: 'earnings (£)', desc: 'earnings when no hours are worked' },
            { x: 'age (years)', y: 'height (cm)', desc: 'predicted height at age 0' },
            { x: 'distance (km)', y: 'travel time (min)', desc: 'baseline travel time for zero distance' },
            { x: 'study hours', y: 'test score', desc: 'predicted score with no study time' },
            { x: 'temperature (°C)', y: 'coffee sales', desc: 'predicted sales at 0°C' },
            { x: 'years of experience', y: 'salary (£1000s)', desc: 'starting salary with no experience' }
        ];
        const ctx = MathUtils.pick(contexts);
        const a = MathUtils.randInt(5, 50);
        const b = MathUtils.pick([0.5, 1, 1.5, 2, 2.5, 3]);

        return {
            type: 'mc',
            rule: 'Interpret Intercept',
            difficulty: 'easy',
            text: `The regression line \\(\\hat{y} = ${a} + ${b}x\\) models ${ctx.y} (\\(y\\)) from ${ctx.x} (\\(x\\)). What does the intercept \\(a = ${a}\\) represent?`,
            latex: '',
            answer: 1,
            answerTex: `\\text{The predicted value of ${ctx.y} when ${ctx.x} = 0}`,
            options: MathUtils.shuffle([
                {
                    value: 1,
                    tex: `\\text{The predicted value of ${ctx.y} when ${ctx.x} = 0}`
                },
                {
                    value: 0,
                    tex: `\\text{The rate of change of ${ctx.y} per unit of ${ctx.x}}`
                },
                {
                    value: 0,
                    tex: `\\text{The mean value of ${ctx.x}}`
                },
                {
                    value: 0,
                    tex: `\\text{The correlation coefficient between } x \\text{ and } y`
                }
            ]),
            hintTex: [
                `\\text{The intercept } a \\text{ is the value of } \\hat{y} \\text{ when } x = 0`,
                `\\text{Substitute } x = 0: \\hat{y} = ${a} + ${b}(0) = ${a}`
            ],
            explain: `<strong>Step 1:</strong> The intercept \\(a\\) in \\(\\hat{y} = a + bx\\) is the predicted value of \\(y\\) when \\(x = 0\\).<br><br>` +
                     `<strong>Step 2:</strong> Substituting \\(x = 0\\): \\(\\hat{y} = ${a} + ${b}(0) = ${a}\\).<br><br>` +
                     `<strong>Interpretation:</strong> \\(a = ${a}\\) is the ${ctx.desc}.<br><br>` +
                     `<strong>Caution:</strong> The intercept may not always have a meaningful real-world interpretation, especially if \\(x = 0\\) is outside the data range.`
        };
    },

    /**
     * 5. qCorrelationStrength - Easy (MC)
     * Given r, describe the correlation strength and direction.
     */
    qCorrelationStrength() {
        // Pick a realistic r value
        const rOptions = [
            { r: 0.95, desc: 'strong positive' },
            { r: 0.82, desc: 'strong positive' },
            { r: 0.91, desc: 'strong positive' },
            { r: 0.65, desc: 'moderate positive' },
            { r: 0.58, desc: 'moderate positive' },
            { r: 0.72, desc: 'moderate positive' },
            { r: 0.18, desc: 'weak positive' },
            { r: 0.25, desc: 'weak positive' },
            { r: -0.88, desc: 'strong negative' },
            { r: -0.93, desc: 'strong negative' },
            { r: -0.61, desc: 'moderate negative' },
            { r: -0.74, desc: 'moderate negative' },
            { r: -0.22, desc: 'weak negative' },
            { r: -0.15, desc: 'weak negative' }
        ];
        const chosen = MathUtils.pick(rOptions);
        const r = chosen.r;
        const absR = Math.abs(r);
        const direction = r > 0 ? 'positive' : 'negative';
        let strength;
        if (absR > 0.9) strength = 'strong';
        else if (absR > 0.5) strength = 'moderate';
        else strength = 'weak';

        const correctDesc = `${strength} ${direction}`;

        // Build all four options (one correct + 3 plausible wrong)
        const allDescriptions = [
            'strong positive', 'strong negative',
            'moderate positive', 'moderate negative',
            'weak positive', 'weak negative',
            'no correlation'
        ];
        const distractors = allDescriptions.filter(d => d !== correctDesc);
        const shuffledDistractors = MathUtils.shuffle(distractors).slice(0, 3);

        const optionList = MathUtils.shuffle([
            { value: 1, tex: `\\text{${strength.charAt(0).toUpperCase() + strength.slice(1)} ${direction} correlation}` },
            { value: 0, tex: `\\text{${shuffledDistractors[0].charAt(0).toUpperCase() + shuffledDistractors[0].slice(1)} correlation}` },
            { value: 0, tex: `\\text{${shuffledDistractors[1].charAt(0).toUpperCase() + shuffledDistractors[1].slice(1)} correlation}` },
            { value: 0, tex: `\\text{${shuffledDistractors[2].charAt(0).toUpperCase() + shuffledDistractors[2].slice(1)} correlation}` }
        ]);

        return {
            type: 'mc',
            rule: 'Correlation Strength',
            difficulty: 'easy',
            text: `The correlation coefficient for a data set is \\(r = ${r}\\). Which of the following best describes the correlation?`,
            latex: '',
            answer: 1,
            answerTex: `\\text{${strength.charAt(0).toUpperCase() + strength.slice(1)} ${direction} correlation}`,
            options: optionList,
            hintTex: [
                `\\text{Sign of } r \\text{ gives direction: } r = ${r} ${r > 0 ? '> 0' : '< 0'} \\implies \\text{${direction}}`,
                `|r| = ${absR} \\implies ${absR > 0.9 ? '|r| > 0.9 \\implies \\text{strong}' : absR > 0.5 ? '0.5 < |r| \\leq 0.9 \\implies \\text{moderate}' : '|r| < 0.3 \\implies \\text{weak}'}`
            ],
            explain: `<strong>Step 1:</strong> The sign of \\(r\\) gives the direction.<br>` +
                     `\\(r = ${r}\\) is ${direction}, so the correlation is <strong>${direction}</strong>.<br><br>` +
                     `<strong>Step 2:</strong> The magnitude \\(|r| = ${absR}\\) gives the strength.<br>` +
                     `Thresholds: \\(|r| > 0.9\\) → strong, \\(0.5 < |r| \\leq 0.9\\) → moderate, \\(|r| < 0.3\\) → weak.<br><br>` +
                     `<strong>Conclusion:</strong> The correlation is <strong>${correctDesc}</strong>.`
        };
    },

    /**
     * 6. qCorrelationSign - Easy (MC)
     * Given a scatter plot context, identify the sign of r.
     */
    qCorrelationSign() {
        const positiveContexts = [
            'As the number of hours studied increases, exam scores tend to increase.',
            'As height increases, weight tends to increase.',
            'As advertising spend increases, sales revenue tends to increase.',
            'As years of experience increase, salary tends to increase.',
            'As temperature increases, ice cream sales tend to increase.'
        ];
        const negativeContexts = [
            'As the number of absences increases, exam scores tend to decrease.',
            'As speed increases, journey time tends to decrease.',
            'As price increases, demand tends to decrease.',
            'As age of a car increases, its resale value tends to decrease.',
            'As distance from the city centre increases, property prices tend to decrease.'
        ];

        const isPositive = MathUtils.randInt(0, 1) === 1;
        const scenario = isPositive
            ? MathUtils.pick(positiveContexts)
            : MathUtils.pick(negativeContexts);

        const correctTex = isPositive
            ? `\\text{Positive } (r > 0)`
            : `\\text{Negative } (r < 0)`;

        const options = MathUtils.shuffle([
            { value: 1, tex: isPositive ? `\\text{Positive } (r > 0)` : `\\text{Negative } (r < 0)` },
            { value: 0, tex: isPositive ? `\\text{Negative } (r < 0)` : `\\text{Positive } (r > 0)` },
            { value: 0, tex: `\\text{Zero } (r = 0)` },
            { value: 0, tex: `\\text{Cannot be determined from context}` }
        ]);

        return {
            type: 'mc',
            rule: 'Correlation Sign',
            difficulty: 'easy',
            text: `${scenario}<br><br>What is the sign of the correlation coefficient \\(r\\)?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: options,
            hintTex: [
                `\\text{If } y \\text{ increases as } x \\text{ increases} \\implies r > 0 \\text{ (positive)}`,
                `\\text{If } y \\text{ decreases as } x \\text{ increases} \\implies r < 0 \\text{ (negative)}`
            ],
            explain: `<strong>Key rule:</strong><br>` +
                     `If \\(y\\) tends to <strong>increase</strong> as \\(x\\) increases → \\(r > 0\\) (positive correlation).<br>` +
                     `If \\(y\\) tends to <strong>decrease</strong> as \\(x\\) increases → \\(r < 0\\) (negative correlation).<br><br>` +
                     `<strong>This scenario:</strong> ${scenario}<br><br>` +
                     `<strong>Conclusion:</strong> \\(r\\) is <strong>${isPositive ? 'positive' : 'negative'}</strong>.`
        };
    },

    /**
     * 7. qInterpolation - Medium (MC)
     * Distinguish between interpolation (within data range) and extrapolation (outside range).
     */
    qInterpolation() {
        // Generate a random data range [lo, hi]
        const lo = MathUtils.randInt(5, 25);
        const rangeWidth = MathUtils.randInt(20, 40);
        const hi = lo + rangeWidth;

        // Pick 4 candidate x values: 1 inside, 3 outside
        const inside = MathUtils.randInt(lo + 2, hi - 2);
        const outsideLow1 = MathUtils.randInt(lo - 15, lo - 3);
        const outsideLow2 = MathUtils.randInt(lo - 20, lo - 8);
        const outsideHigh = MathUtils.randInt(hi + 3, hi + 20);

        // Make sure candidates are distinct
        const candidates = [inside, outsideLow1, outsideLow2, outsideHigh];

        const options = MathUtils.shuffle([
            { value: 1, tex: `x = ${inside} \\text{ (interpolation — within range [${lo},\\,${hi}])}` },
            { value: 0, tex: `x = ${outsideLow1} \\text{ (extrapolation — below range [${lo},\\,${hi}])}` },
            { value: 0, tex: `x = ${outsideLow2} \\text{ (extrapolation — below range [${lo},\\,${hi}])}` },
            { value: 0, tex: `x = ${outsideHigh} \\text{ (extrapolation — above range [${lo},\\,${hi}])}` }
        ]);

        return {
            type: 'mc',
            rule: 'Interpolation vs Extrapolation',
            difficulty: 'medium',
            text: `A regression line was fitted to data with \\(x\\) values in the range \\([${lo},\\,${hi}]\\). Which of the following uses <strong>interpolation</strong> (predicting within the data range)?`,
            latex: '',
            answer: 1,
            answerTex: `x = ${inside} \\text{ — within the data range}`,
            options: options,
            hintTex: [
                `\\text{Interpolation: predicting for } x \\text{ values inside the original data range}`,
                `\\text{Data range is } [${lo},\\, ${hi}]. \\text{ Which candidate falls inside this interval?}`
            ],
            explain: `<strong>Definitions:</strong><br>` +
                     `<strong>Interpolation</strong>: using the model to predict for \\(x\\) values <em>within</em> the range of the original data \\([${lo},\\,${hi}]\\).<br>` +
                     `<strong>Extrapolation</strong>: predicting for \\(x\\) values <em>outside</em> that range — less reliable.<br><br>` +
                     `<strong>Check each candidate:</strong><br>` +
                     `\\(x = ${inside}\\): ${lo} ≤ ${inside} ≤ ${hi} → <strong>interpolation</strong>.<br>` +
                     `\\(x = ${outsideLow1}\\): ${outsideLow1} &lt; ${lo} → extrapolation.<br>` +
                     `\\(x = ${outsideLow2}\\): ${outsideLow2} &lt; ${lo} → extrapolation.<br>` +
                     `\\(x = ${outsideHigh}\\): ${outsideHigh} &gt; ${hi} → extrapolation.`
        };
    },

    /**
     * 8. qRSquared - Medium (MC)
     * Interpret the coefficient of determination R².
     */
    qRSquared() {
        // Pick a clean R² value (expressed as a percentage in the question)
        const rSquaredOptions = [0.81, 0.64, 0.49, 0.36, 0.89, 0.76, 0.25, 0.92, 0.16, 0.56];
        const r2 = MathUtils.pick(rSquaredOptions);
        const pct = Math.round(r2 * 100);
        const rPos = Math.round(Math.sqrt(r2) * 100) / 100;

        return {
            type: 'mc',
            rule: 'R² Interpretation',
            difficulty: 'medium',
            text: `A regression model has a coefficient of determination \\(R^2 = ${r2}\\). What is the correct interpretation?`,
            latex: '',
            answer: 1,
            answerTex: `\\text{${pct}\\% of the variation in } y \\text{ is explained by the linear relationship with } x`,
            options: MathUtils.shuffle([
                {
                    value: 1,
                    tex: `\\text{${pct}\\% of the variation in } y \\text{ is explained by the linear relationship with } x`
                },
                {
                    value: 0,
                    tex: `\\text{The correlation coefficient is } r = ${r2}`
                },
                {
                    value: 0,
                    tex: `\\text{${pct}\\% of the data points lie on the regression line}`
                },
                {
                    value: 0,
                    tex: `\\text{The gradient of the regression line is } ${r2}`
                }
            ]),
            hintTex: [
                `R^2 = r^2 \\text{ where } r \\text{ is the correlation coefficient}`,
                `R^2 = ${r2} \\implies r = \\pm${rPos}. \\text{ Interpretation: } ${pct}\\% \\text{ of variance in } y \\text{ is explained by } x`
            ],
            explain: `<strong>Definition:</strong> The coefficient of determination \\(R^2\\) measures the proportion of the total variation in \\(y\\) that is explained by the linear regression model.<br><br>` +
                     `<strong>Formula:</strong> \\(R^2 = r^2\\), where \\(r\\) is the correlation coefficient.<br><br>` +
                     `<strong>Interpretation:</strong> \\(R^2 = ${r2}\\) means that <strong>${pct}%</strong> of the variation in \\(y\\) is explained by its linear relationship with \\(x\\). The remaining \\(${100 - pct}\\%\\) is due to other factors.<br><br>` +
                     `<strong>Note:</strong> \\(r = \\pm${rPos}\\) (sign determined by context), but \\(R^2\\) is always non-negative.`
        };
    },

    /**
     * 9. qMeanPassThrough - Medium (Free)
     * Given x̄, b, and ȳ, find a = ȳ - b·x̄ (the regression line passes through (x̄, ȳ)).
     * Constructed to give integer a.
     */
    qMeanPassThrough() {
        const bChoices = [0.5, 1, 1.5, 2, 2.5, 3];
        const b = MathUtils.pick(bChoices);

        // Pick x̄ and ȳ so that a = ȳ - b * x̄ is an integer
        // Since b may be a half-integer, x̄ must be even when b has .5
        let xMean, yMean;
        if (b % 1 === 0.5) {
            xMean = MathUtils.randInt(2, 15) * 2; // ensure even
        } else {
            xMean = MathUtils.randInt(2, 20);
        }
        yMean = MathUtils.randInt(10, 60);
        const a = yMean - b * xMean; // guaranteed integer

        return {
            type: 'free',
            rule: 'Mean Point & Intercept',
            difficulty: 'medium',
            text: `The regression line \\(\\hat{y} = a + bx\\) passes through the mean point \\((\\bar{x},\\,\\bar{y})\\). Given \\(\\bar{x} = ${xMean}\\), \\(\\bar{y} = ${yMean}\\), and \\(b = ${b}\\), find the value of \\(a\\).`,
            latex: `\\(a = \\bar{y} - b\\bar{x}\\)`,
            answer: a,
            answerTex: String(a),
            options: [],
            hintTex: [
                `\\text{Since the line passes through } (\\bar{x},\\,\\bar{y}): \\quad \\bar{y} = a + b\\bar{x}`,
                `a = \\bar{y} - b\\bar{x} = ${yMean} - ${b} \\times ${xMean} = ${yMean} - ${b * xMean} = ${a}`
            ],
            explain: `<strong>Key property:</strong> The regression line \\(\\hat{y} = a + bx\\) always passes through the mean point \\((\\bar{x},\\,\\bar{y})\\).<br><br>` +
                     `<strong>Step 1:</strong> Substitute \\((\\bar{x},\\,\\bar{y})\\) into the equation:<br>` +
                     `\\(\\bar{y} = a + b\\bar{x}\\).<br><br>` +
                     `<strong>Step 2:</strong> Rearrange for \\(a\\):<br>` +
                     `\\(a = \\bar{y} - b\\bar{x} = ${yMean} - ${b} \\times ${xMean}\\).<br><br>` +
                     `<strong>Step 3:</strong> \\(a = ${yMean} - ${b * xMean} = ${a}\\).`
        };
    },

    /**
     * 10. qResidual - Hard (Free)
     * Residual = actual y - predicted ŷ = y_actual - (a + b * x_val).
     * Constructed so the residual is a clean integer.
     */
    qResidual() {
        const bChoices = [1, 2, 3, 4, 5];
        const b = MathUtils.pick(bChoices);
        const a = MathUtils.randInt(-10, 20);
        const xVal = MathUtils.randInt(1, 12);

        const yPred = a + b * xVal; // always integer since b and x are integers
        // Pick a residual (can be positive or negative, non-zero)
        const residual = MathUtils.nonZeroRandInt(-8, 8);
        const yActual = yPred + residual;

        const contexts = [
            { x: 'hours of study', y: 'score' },
            { x: 'temperature (°C)', y: 'units sold' },
            { x: 'age (years)', y: 'salary (£1000s)' },
            { x: 'distance (km)', y: 'delivery time (min)' },
            { x: 'training sessions', y: 'performance score' }
        ];
        const ctx = MathUtils.pick(contexts);

        return {
            type: 'free',
            rule: 'Residual',
            difficulty: 'hard',
            text: `A regression line for predicting ${ctx.y} (\\(y\\)) from ${ctx.x} (\\(x\\)) is \\(\\hat{y} = ${a} + ${b}x\\).<br>One observation has \\(x = ${xVal}\\) and an actual value of \\(y = ${yActual}\\).<br>Find the residual for this observation.`,
            latex: `\\(\\text{Residual} = y - \\hat{y}\\)`,
            answer: residual,
            answerTex: String(residual),
            options: [],
            hintTex: [
                `\\text{First find the predicted value: } \\hat{y} = ${a} + ${b} \\times ${xVal} = ${yPred}`,
                `\\text{Residual} = y_{\\text{actual}} - \\hat{y} = ${yActual} - ${yPred} = ${residual}`
            ],
            explain: `<strong>Definition:</strong> A residual is the difference between the actual observed value and the value predicted by the regression line.<br><br>` +
                     `<strong>Step 1:</strong> Find the predicted value \\(\\hat{y}\\) by substituting \\(x = ${xVal}\\):<br>` +
                     `\\(\\hat{y} = ${a} + ${b}(${xVal}) = ${a} + ${b * xVal} = ${yPred}\\).<br><br>` +
                     `<strong>Step 2:</strong> Calculate the residual:<br>` +
                     `\\(\\text{Residual} = y_{\\text{actual}} - \\hat{y} = ${yActual} - ${yPred} = ${residual}\\).<br><br>` +
                     `<strong>Interpretation:</strong> A ${residual > 0 ? 'positive' : 'negative'} residual means the actual value is ${residual > 0 ? 'above' : 'below'} the regression line.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    /** Return a weighted-random question from the pool */
    pickQuestion() {
        const pool = [
            { fn: () => LIN_REG.qPredictY(),            weight: 3, difficulty: 'easy' },
            { fn: () => LIN_REG.qFindX(),               weight: 3, difficulty: 'easy' },
            { fn: () => LIN_REG.qInterpretGradient(),   weight: 3, difficulty: 'easy' },
            { fn: () => LIN_REG.qInterpretIntercept(),  weight: 3, difficulty: 'easy' },
            { fn: () => LIN_REG.qCorrelationStrength(),  weight: 3, difficulty: 'easy' },
            { fn: () => LIN_REG.qCorrelationSign(),     weight: 3, difficulty: 'easy' },
            { fn: () => LIN_REG.qInterpolation(),       weight: 2, difficulty: 'medium' },
            { fn: () => LIN_REG.qRSquared(),            weight: 2, difficulty: 'medium' },
            { fn: () => LIN_REG.qMeanPassThrough(),     weight: 2, difficulty: 'medium' },
            { fn: () => LIN_REG.qResidual(),            weight: 1, difficulty: 'hard' }
        ];

        // Filter by difficulty level if set
        let filtered = pool;
        if (LIN_REG.level === 'easy') {
            filtered = pool.filter(p => p.difficulty === 'easy');
        } else if (LIN_REG.level === 'medium') {
            filtered = pool.filter(p => p.difficulty === 'medium');
        } else if (LIN_REG.level === 'hard') {
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
        LIN_REG.score = 0;
        LIN_REG.total = 0;
        LIN_REG.streak = 0;
        LIN_REG.answered = false;
        LIN_REG.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="LIN_REG.unload()">Linear Regression (4.4)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Linear Regression</h1>
                <p>IB Math AA 4.4 &ndash; Regression lines and correlation</p>
            </header>

            <!-- Level filter -->
            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all" onclick="LIN_REG.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter" data-level="easy" onclick="LIN_REG.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter" data-level="medium" onclick="LIN_REG.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter" data-level="hard" onclick="LIN_REG.setLevel('hard')">Hard</button>
            </div>

            <!-- Score bar -->
            <div class="score-bar">
                <div class="score-item">
                    <div class="label">Score</div>
                    <div class="value" id="reg-score">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Total</div>
                    <div class="value" id="reg-total">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Streak</div>
                    <div class="value" id="reg-streak">0</div>
                </div>
                <div class="score-item">
                    <div class="label">Accuracy</div>
                    <div class="value" id="reg-accuracy">-</div>
                </div>
            </div>

            <!-- Question card -->
            <div class="question-card" id="reg-question-card">
                <span class="rule-tag" id="reg-rule"></span>
                <span class="difficulty-tag" id="reg-difficulty"></span>
                <div class="question-text" id="reg-text"></div>
                <div class="question-prompt" id="reg-latex"></div>
                <div id="reg-options-area"></div>
            </div>

            <!-- Working out -->
            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <!-- Hint box -->
            <div class="hint-box" id="reg-hint-box"></div>

            <!-- Feedback -->
            <div class="feedback" id="reg-feedback">
                <div class="feedback-title" id="reg-feedback-title"></div>
                <div class="feedback-explanation" id="reg-feedback-explanation"></div>
            </div>

            <!-- Action buttons -->
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="reg-hint-btn" onclick="LIN_REG.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="reg-next-btn" onclick="LIN_REG.next()" style="display:none;">Next Question</button>
            </div>
        `;

        LIN_REG.next();
    },

    /* ────────────────────────────────────────────
       UI: unload() - go back to topic view
       ──────────────────────────────────────────── */

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('stats-probability');
    },

    /* ────────────────────────────────────────────
       UI: setLevel()
       ──────────────────────────────────────────── */

    setLevel(lvl) {
        LIN_REG.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        LIN_REG.score = 0;
        LIN_REG.total = 0;
        LIN_REG.streak = 0;
        LIN_REG.updateStats();
        LIN_REG.next();
    },

    /* ────────────────────────────────────────────
       UI: next()
       ──────────────────────────────────────────── */

    next() {
        LIN_REG.answered = false;
        LIN_REG.hintIndex = 0;
        LIN_REG.currentQ = LIN_REG.pickQuestion();
        const q = LIN_REG.currentQ;

        // Rule tag
        const ruleEl = document.getElementById('reg-rule');
        ruleEl.textContent = q.rule;

        // Difficulty tag
        const diffEl = document.getElementById('reg-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;

        // Question text
        document.getElementById('reg-text').innerHTML = q.text;

        // LaTeX prompt
        document.getElementById('reg-latex').innerHTML = q.latex;

        // Options area
        const optArea = document.getElementById('reg-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="LIN_REG.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="reg-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')LIN_REG.checkFree()">
                    <button class="btn btn-primary" onclick="LIN_REG.checkFree()">Submit</button>
                </div>
            `;
            setTimeout(() => {
                const inp = document.getElementById('reg-input');
                if (inp) inp.focus();
            }, 100);
        }

        // Hide hint/feedback/next
        const hintBox = document.getElementById('reg-hint-box');
        hintBox.classList.remove('show');
        hintBox.innerHTML = '';

        const fb = document.getElementById('reg-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');

        document.getElementById('reg-next-btn').style.display = 'none';
        document.getElementById('reg-hint-btn').style.display = '';
        document.getElementById('reg-hint-btn').disabled = false;

        // Render KaTeX
        LIN_REG.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: showHint()
       ──────────────────────────────────────────── */

    showHint() {
        const q = LIN_REG.currentQ;
        if (!q || !q.hintTex || LIN_REG.hintIndex >= q.hintTex.length) return;

        const hintBox = document.getElementById('reg-hint-box');
        const hintContent = LIN_REG.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = hintContent + `<span>\\(${q.hintTex[LIN_REG.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        LIN_REG.hintIndex++;

        if (LIN_REG.hintIndex >= q.hintTex.length) {
            document.getElementById('reg-hint-btn').disabled = true;
        }

        LIN_REG.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: checkMC()
       ──────────────────────────────────────────── */

    checkMC(btn) {
        if (LIN_REG.answered) return;
        LIN_REG.answered = true;
        LIN_REG.total++;

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
            LIN_REG.score++;
            LIN_REG.streak++;
        } else {
            btn.classList.add('incorrect');
            LIN_REG.streak = 0;
        }

        LIN_REG.showFeedback(isCorrect);
        LIN_REG.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: checkFree()
       ──────────────────────────────────────────── */

    checkFree() {
        if (LIN_REG.answered) return;

        const inp = document.getElementById('reg-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) {
            inp.style.borderColor = '#ef4444';
            inp.placeholder = 'Enter a number';
            return;
        }

        LIN_REG.answered = true;
        LIN_REG.total++;
        inp.disabled = true;

        const q = LIN_REG.currentQ;
        const isCorrect = MathUtils.approxEqual(val, q.answer, 0.05);

        if (isCorrect) {
            inp.style.borderColor = 'var(--success)';
            inp.style.background = 'var(--success-light)';
            LIN_REG.score++;
            LIN_REG.streak++;
        } else {
            inp.style.borderColor = 'var(--error)';
            inp.style.background = 'var(--error-light)';
            LIN_REG.streak = 0;
        }

        // Disable submit button
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;

        LIN_REG.showFeedback(isCorrect);
        LIN_REG.updateStats();
    },

    /* ────────────────────────────────────────────
       UI: showFeedback()
       ──────────────────────────────────────────── */

    showFeedback(isCorrect) {
        const q = LIN_REG.currentQ;
        const fb = document.getElementById('reg-feedback');
        const title = document.getElementById('reg-feedback-title');
        const explanation = document.getElementById('reg-feedback-explanation');

        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            title.textContent = 'Correct!';
            if (LIN_REG.streak > 1) {
                title.textContent = `Correct! (${LIN_REG.streak} streak)`;
            }
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }

        explanation.innerHTML = q.explain;

        // Show next button, hide hint button
        document.getElementById('reg-next-btn').style.display = '';
        document.getElementById('reg-hint-btn').style.display = 'none';

        LIN_REG.renderAllKaTeX();
    },

    /* ────────────────────────────────────────────
       UI: updateStats()
       ──────────────────────────────────────────── */

    updateStats() {
        const scoreEl = document.getElementById('reg-score');
        const totalEl = document.getElementById('reg-total');
        const streakEl = document.getElementById('reg-streak');
        const accEl = document.getElementById('reg-accuracy');

        if (scoreEl) scoreEl.textContent = LIN_REG.score;
        if (totalEl) totalEl.textContent = LIN_REG.total;
        if (streakEl) streakEl.textContent = LIN_REG.streak;
        if (accEl) {
            accEl.textContent = LIN_REG.total > 0
                ? Math.round((LIN_REG.score / LIN_REG.total) * 100) + '%'
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

if (typeof ACTIVITY_INITS !== 'undefined') ACTIVITY_INITS['linear-regression'] = () => LIN_REG.load();
