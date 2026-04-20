/*
 * financial-maths.js - IB Math AA 1.5: Financial Mathematics
 * Compound interest, present/future value, depreciation, percentage change, find n
 */

const FIN_MATHS = {
    score: 0, total: 0, streak: 0,
    currentQ: null, answered: false,
    level: 'all', hintIndex: 0,

    /* ────────────────────────────────────────────
       HELPERS
       ──────────────────────────────────────────── */

    round2(x) { return Math.round(x * 100) / 100; },

    fmtMoney(x) {
        const r = FIN_MATHS.round2(x);
        return r.toFixed(2);
    },

    /* ────────────────────────────────────────────
       QUESTION GENERATORS
       ──────────────────────────────────────────── */

    /**
     * 1. qPercentageChange - Easy (Free)
     * Find new value after r% increase or decrease.
     */
    qPercentageChange() {
        const PV = MathUtils.pick([200, 400, 500, 800, 1000, 1200, 2000]);
        const r = MathUtils.pick([5, 10, 15, 20, 25, 30, 40, 50]);
        const increase = MathUtils.randInt(0, 1) === 1;
        const FV = increase ? PV * (1 + r / 100) : PV * (1 - r / 100);

        return {
            type: 'free',
            rule: 'Percentage Change',
            difficulty: 'easy',
            text: `A value of \\(\\$${PV}\\) ${increase ? 'increases' : 'decreases'} by \\(${r}\\%\\). Find the new value.`,
            latex: '',
            answer: FV,
            answerTex: `\\$${FIN_MATHS.fmtMoney(FV)}`,
            options: [],
            hintTex: [
                `\\text{Multiply by } ${increase ? '(1 + r)' : '(1 - r)'}`,
                `${PV} \\times ${increase ? 1 + r / 100 : 1 - r / 100} = ${FIN_MATHS.fmtMoney(FV)}`
            ],
            explain: `<strong>Step 1:</strong> ${increase ? 'Increase' : 'Decrease'} means multiplying by \\(${increase ? '(1 + ' + r + '/100)' : '(1 - ' + r + '/100)'} = ${increase ? 1 + r / 100 : 1 - r / 100}\\).<br><br>` +
                     `<strong>Step 2:</strong> New value \\(= ${PV} \\times ${increase ? 1 + r / 100 : 1 - r / 100} = ${FIN_MATHS.fmtMoney(FV)}\\).`
        };
    },

    /**
     * 2. qFutureValue - Easy (MC)
     * FV = PV(1 + r)^n, given PV, annual rate r%, and n years.
     */
    qFutureValue() {
        const PV = MathUtils.pick([1000, 2000, 5000]);
        const r = MathUtils.pick([0.04, 0.05, 0.06, 0.08, 0.10]);
        const n = MathUtils.pick([2, 3, 4, 5]);
        const FV = FIN_MATHS.round2(PV * Math.pow(1 + r, n));
        const rPct = r * 100;

        const correctTex = `\\$${FIN_MATHS.fmtMoney(FV)}`;

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV * (1 + r * n)))}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV + PV * r * n))}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV * Math.pow(1 + r, n - 1)))}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length * 50;
            const candidate = `\\$${FIN_MATHS.fmtMoney(FV + off)}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Future Value',
            difficulty: 'easy',
            text: `\\$${PV} is invested at \\(${rPct}\\%\\) per annum compound interest for \\(${n}\\) years. Find the future value.`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `FV = PV \\times (1 + r)^n`,
                `= ${PV} \\times (1 + ${r})^{${n}} = ${PV} \\times ${Math.pow(1 + r, n).toFixed(6)}\\ldots`
            ],
            explain: `<strong>Formula:</strong> \\(FV = PV \\times (1 + r)^n\\)<br><br>` +
                     `<strong>Substituting:</strong> \\(FV = ${PV} \\times (1 + ${r})^{${n}} = ${PV} \\times ${Math.pow(1 + r, n).toFixed(4)}\\ldots = ${correctTex}\\) (to the nearest cent).`
        };
    },

    /**
     * 3. qPresentValue - Medium (MC)
     * Find PV given FV, rate r, and years n.
     */
    qPresentValue() {
        const PV = MathUtils.pick([1000, 2000, 5000]);
        const r = MathUtils.pick([0.04, 0.05, 0.06, 0.08]);
        const n = MathUtils.pick([2, 3, 4, 5]);
        const FV = FIN_MATHS.round2(PV * Math.pow(1 + r, n));
        const rPct = r * 100;

        const correctTex = `\\$${FIN_MATHS.fmtMoney(PV)}`;

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(FV / (1 + r * n)))}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(FV * Math.pow(1 + r, n)))}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(FV - PV * r * n))}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length * 100;
            const candidate = `\\$${FIN_MATHS.fmtMoney(PV + off)}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Present Value',
            difficulty: 'medium',
            text: `An investment grows to \\$${FIN_MATHS.fmtMoney(FV)} after \\(${n}\\) years at \\(${rPct}\\%\\) p.a. compound interest. Find the initial amount invested.`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `PV = \\dfrac{FV}{(1+r)^n}`,
                `= \\dfrac{${FIN_MATHS.fmtMoney(FV)}}{(${1 + r})^{${n}}}`
            ],
            explain: `<strong>Rearrange:</strong> \\(PV = \\dfrac{FV}{(1+r)^n} = \\dfrac{${FIN_MATHS.fmtMoney(FV)}}{${Math.pow(1 + r, n).toFixed(4)}\\ldots} = ${correctTex}\\).`
        };
    },

    /**
     * 4. qDepreciation - Medium (MC)
     * Asset depreciates at r% per year. Find value after n years.
     */
    qDepreciation() {
        const PV = MathUtils.pick([10000, 20000, 30000, 50000]);
        const r = MathUtils.pick([0.10, 0.15, 0.20, 0.25]);
        const n = MathUtils.pick([2, 3, 4, 5]);
        const FV = FIN_MATHS.round2(PV * Math.pow(1 - r, n));
        const rPct = r * 100;

        const correctTex = `\\$${FIN_MATHS.fmtMoney(FV)}`;

        const options = [
            { value: 1, tex: correctTex },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV - PV * r * n))}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV * Math.pow(1 + r, n)))}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV * Math.pow(1 - r, n - 1)))}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length * 1000;
            const candidate = `\\$${FIN_MATHS.fmtMoney(FV + off)}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Depreciation',
            difficulty: 'medium',
            text: `A car worth \\$${PV} depreciates at \\(${rPct}\\%\\) per year. Find its value after \\(${n}\\) years.`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Depreciation uses: } V_n = V_0 \\times (1 - r)^n`,
                `= ${PV} \\times (${1 - r})^{${n}}`
            ],
            explain: `<strong>Formula:</strong> \\(V_n = V_0 \\times (1 - r)^n\\) where \\(r = ${r}\\).<br><br>` +
                     `<strong>Substituting:</strong> \\(V_{${n}} = ${PV} \\times (${1 - r})^{${n}} = ${correctTex}\\).`
        };
    },

    /**
     * 5. qDoubleTime - Medium (MC)
     * Approximately how many years for an investment to double at r% p.a.?
     */
    qDoubleTime() {
        const r = MathUtils.pick([4, 5, 6, 8, 9, 10, 12]);
        // n = log(2) / log(1 + r/100)
        const exactN = Math.log(2) / Math.log(1 + r / 100);
        const approxN = Math.round(exactN);

        const correctTex = `\\approx ${approxN} \\text{ years}`;

        const options = [
            { value: 1, tex: `\\approx ${approxN} \\text{ years}` },
            { value: 0, tex: `\\approx ${approxN + 2} \\text{ years}` },
            { value: 0, tex: `\\approx ${approxN - 2} \\text{ years}` },
            { value: 0, tex: `\\approx ${Math.round(72 / r / 2)} \\text{ years}` }
        ].filter(o => {
            const num = parseInt(o.tex.match(/\d+/)[0]);
            return num > 0;
        });

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length + 1;
            const candidate = `\\approx ${approxN + off} \\text{ years}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Doubling Time',
            difficulty: 'medium',
            text: `Approximately how many years does it take for an investment to double at \\(${r}\\%\\) per annum compound interest?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Rule of 72: doubling time} \\approx \\frac{72}{r}`,
                `\\approx \\frac{72}{${r}} = ${(72 / r).toFixed(1)} \\text{ years}`
            ],
            explain: `<strong>Method 1 (Rule of 72):</strong> Doubling time \\(\\approx \\dfrac{72}{r} = \\dfrac{72}{${r}} \\approx ${(72 / r).toFixed(1)}\\) years.<br><br>` +
                     `<strong>Method 2 (exact):</strong> \\(2 = (1 + ${r / 100})^n \\Rightarrow n = \\dfrac{\\ln 2}{\\ln ${1 + r / 100}} \\approx ${exactN.toFixed(2)}\\) years.<br><br>` +
                     `<strong>Answer:</strong> Approximately \\(${approxN}\\) years.`
        };
    },

    /**
     * 6. qCompoundingFrequency - Medium (MC)
     * Compare annual vs monthly compounding.
     */
    qCompoundingFrequency() {
        const PV = 10000;
        const rPct = MathUtils.pick([6, 8, 12]);
        const r = rPct / 100;
        const n = MathUtils.pick([2, 3, 5]);
        const FV_annual = FIN_MATHS.round2(PV * Math.pow(1 + r, n));
        const FV_monthly = FIN_MATHS.round2(PV * Math.pow(1 + r / 12, 12 * n));

        const larger = FV_monthly > FV_annual ? 'monthly' : 'annually';
        const correctTex = `\\text{Monthly: }\\$${FIN_MATHS.fmtMoney(FV_monthly)} > \\text{Annual: }\\$${FIN_MATHS.fmtMoney(FV_annual)}`;

        const options = [
            { value: 1, tex: `\\text{Monthly compounding gives more: } \\$${FIN_MATHS.fmtMoney(FV_monthly)}` },
            { value: 0, tex: `\\text{Annual compounding gives more: } \\$${FIN_MATHS.fmtMoney(FV_annual)}` },
            { value: 0, tex: `\\text{Both give the same result}` },
            { value: 0, tex: `\\text{Monthly compounding gives: } \\$${FIN_MATHS.fmtMoney(FV_annual + 10)}` }
        ];

        return {
            type: 'mc',
            rule: 'Compounding Frequency',
            difficulty: 'medium',
            text: `\\$${PV} is invested at \\(${rPct}\\%\\) p.a. for \\(${n}\\) years. Which compounding gives more: annual or monthly?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{Annual: } FV = ${PV}(1+${r})^{${n}}`,
                `\\text{Monthly: } FV = ${PV}\\left(1+\\frac{${r}}{12}\\right)^{${12 * n}}`
            ],
            explain: `<strong>Annual:</strong> \\(FV = ${PV}(1 + ${r})^{${n}} = \\$${FIN_MATHS.fmtMoney(FV_annual)}\\)<br><br>` +
                     `<strong>Monthly (k=12):</strong> \\(FV = ${PV}\\left(1 + \\dfrac{${r}}{12}\\right)^{${12 * n}} = \\$${FIN_MATHS.fmtMoney(FV_monthly)}\\)<br><br>` +
                     `<strong>Result:</strong> More frequent compounding always gives a higher return. Monthly gives \\$${FIN_MATHS.fmtMoney(FV_monthly - FV_annual)} more.`
        };
    },

    /**
     * 7. qFindRate - Hard (MC)
     * Given PV, FV, and n, find the annual interest rate.
     */
    qFindRate() {
        const PV = MathUtils.pick([1000, 2000, 5000]);
        const r = MathUtils.pick([0.04, 0.05, 0.06, 0.08, 0.10]);
        const n = MathUtils.pick([2, 3, 4, 5]);
        const FV = FIN_MATHS.round2(PV * Math.pow(1 + r, n));
        const rPct = r * 100;

        const correctTex = `${rPct}\\%`;

        const options = [
            { value: 1, tex: `${rPct}\\%` },
            { value: 0, tex: `${rPct + 2}\\%` },
            { value: 0, tex: `${rPct - 1}\\%` },
            { value: 0, tex: `${FIN_MATHS.round2((FV - PV) / PV / n * 100)}\\%` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length;
            const candidate = `${rPct + off}\\%`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Find Interest Rate',
            difficulty: 'hard',
            text: `\\$${PV} grows to \\$${FIN_MATHS.fmtMoney(FV)} after \\(${n}\\) years with annual compound interest. Find the interest rate.`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `(1+r)^n = \\dfrac{FV}{PV} = \\dfrac{${FIN_MATHS.fmtMoney(FV)}}{${PV}}`,
                `1 + r = \\left(\\dfrac{${FIN_MATHS.fmtMoney(FV)}}{${PV}}\\right)^{1/${n}}`
            ],
            explain: `<strong>Step 1:</strong> Rearrange \\(FV = PV(1+r)^n\\):<br>` +
                     `\\((1+r)^n = \\dfrac{${FIN_MATHS.fmtMoney(FV)}}{${PV}} = ${FIN_MATHS.round2(FV / PV)}\\)<br><br>` +
                     `<strong>Step 2:</strong> \\(1 + r = ${FIN_MATHS.round2(FV / PV)}^{1/${n}} = ${(Math.pow(FV / PV, 1 / n)).toFixed(4)}\\ldots\\)<br><br>` +
                     `<strong>Step 3:</strong> \\(r = ${(Math.pow(FV / PV, 1 / n) - 1).toFixed(4)}\\ldots = ${rPct}\\%\\).`
        };
    },

    /**
     * 8. qFindN - Hard (MC)
     * Given PV, FV, r, find n (number of years).
     */
    qFindN() {
        const PV = MathUtils.pick([1000, 2000, 5000]);
        const r = MathUtils.pick([0.05, 0.06, 0.08, 0.10]);
        const n = MathUtils.pick([3, 4, 5, 6, 7, 8, 10]);
        const FV = FIN_MATHS.round2(PV * Math.pow(1 + r, n));
        const rPct = r * 100;

        const correctTex = `${n} \\text{ years}`;

        const options = [
            { value: 1, tex: `${n} \\text{ years}` },
            { value: 0, tex: `${n + 1} \\text{ years}` },
            { value: 0, tex: `${n - 1} \\text{ years}` },
            { value: 0, tex: `${Math.round(n * 1.5)} \\text{ years}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length + 1;
            const candidate = `${n + off} \\text{ years}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Find Number of Years',
            difficulty: 'hard',
            text: `An investment of \\$${PV} at \\(${rPct}\\%\\) p.a. compound interest grows to \\$${FIN_MATHS.fmtMoney(FV)}. How many years does this take?`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `${PV}(1 + ${r})^n = ${FIN_MATHS.fmtMoney(FV)} \\Rightarrow (${1 + r})^n = ${FIN_MATHS.round2(FV / PV)}`,
                `n = \\frac{\\ln(${FIN_MATHS.round2(FV / PV)})}{\\ln(${1 + r})}`
            ],
            explain: `<strong>Step 1:</strong> \\((${1 + r})^n = \\dfrac{${FIN_MATHS.fmtMoney(FV)}}{${PV}} = ${FIN_MATHS.round2(FV / PV)}\\).<br><br>` +
                     `<strong>Step 2:</strong> Take logarithms: \\(n = \\dfrac{\\ln ${FIN_MATHS.round2(FV / PV)}}{\\ln ${1 + r}} = \\dfrac{${Math.log(FV / PV).toFixed(4)}}{${Math.log(1 + r).toFixed(4)}} \\approx ${n}\\).`
        };
    },

    /**
     * 9. qRealValue - Hard (MC)
     * Investment grows at r%, but inflation is i%. Find real value after n years.
     */
    qRealValue() {
        const PV = 10000;
        const r = MathUtils.pick([0.06, 0.07, 0.08, 0.09, 0.10]);
        const inflation = MathUtils.pick([0.02, 0.03, 0.04, 0.05]);
        const n = MathUtils.pick([3, 4, 5]);
        const rPct = r * 100;
        const iPct = inflation * 100;

        // Real value = PV × ((1+r)/(1+i))^n
        const realRate = (1 + r) / (1 + inflation) - 1;
        const realFV = FIN_MATHS.round2(PV * Math.pow(1 + realRate, n));

        const correctTex = `\\$${FIN_MATHS.fmtMoney(realFV)}`;

        const nominalFV = FIN_MATHS.round2(PV * Math.pow(1 + r, n));
        const options = [
            { value: 1, tex: `\\$${FIN_MATHS.fmtMoney(realFV)}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(nominalFV)}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV * Math.pow(1 + r - inflation, n)))}` },
            { value: 0, tex: `\\$${FIN_MATHS.fmtMoney(FIN_MATHS.round2(PV * Math.pow(1 + inflation, n)))}` }
        ];

        const seen = new Set();
        const unique = options.filter(o => {
            if (seen.has(o.tex)) return false;
            seen.add(o.tex);
            return true;
        });
        while (unique.length < 4) {
            const off = unique.length * 500;
            const candidate = `\\$${FIN_MATHS.fmtMoney(realFV + off)}`;
            if (!seen.has(candidate)) { unique.push({ value: 0, tex: candidate }); seen.add(candidate); }
        }

        return {
            type: 'mc',
            rule: 'Real Value',
            difficulty: 'hard',
            text: `\\$${PV} is invested at \\(${rPct}\\%\\) p.a. Inflation is \\(${iPct}\\%\\) p.a. Find the <strong>real value</strong> of the investment after \\(${n}\\) years.`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(unique.slice(0, 4)),
            hintTex: [
                `\\text{Real rate} = \\frac{1+r}{1+i} - 1 = \\frac{${1 + r}}{${1 + inflation}} - 1`,
                `\\text{Real value} = ${PV} \\times \\left(\\frac{${1 + r}}{${1 + inflation}}\\right)^{${n}}`
            ],
            explain: `<strong>Step 1:</strong> Real rate \\(= \\dfrac{1 + ${r}}{1 + ${inflation}} - 1 = \\dfrac{${1 + r}}{${1 + inflation}} - 1 \\approx ${(realRate * 100).toFixed(2)}\\%\\).<br><br>` +
                     `<strong>Step 2:</strong> Real value \\(= ${PV} \\times (1 + ${realRate.toFixed(4)})^{${n}} = ${correctTex}\\).<br><br>` +
                     `Note: The <em>nominal</em> value would be \\$${FIN_MATHS.fmtMoney(nominalFV)}, but inflation erodes purchasing power.`
        };
    },

    /**
     * 10. qBreakEven - Hard (MC)
     * Which investment option gives a higher FV?
     */
    qBreakEven() {
        const PV = MathUtils.pick([5000, 10000]);
        const r1 = MathUtils.pick([0.05, 0.06, 0.07, 0.08]);
        const r2 = r1 + MathUtils.pick([0.005, 0.01, 0.015]);
        const n1 = MathUtils.pick([5, 6, 8, 10]);
        const n2 = n1 - MathUtils.pick([1, 2]);
        const FV1 = FIN_MATHS.round2(PV * Math.pow(1 + r1, n1));
        const FV2 = FIN_MATHS.round2(PV * Math.pow(1 + r2, n2));
        const betterIsOption1 = FV1 > FV2;

        const correctTex = betterIsOption1
            ? `\\text{Option A: } \\$${FIN_MATHS.fmtMoney(FV1)} > \\$${FIN_MATHS.fmtMoney(FV2)}`
            : `\\text{Option B: } \\$${FIN_MATHS.fmtMoney(FV2)} > \\$${FIN_MATHS.fmtMoney(FV1)}`;

        const options = [
            { value: betterIsOption1 ? 1 : 0, tex: `\\text{Option A gives more: } \\$${FIN_MATHS.fmtMoney(FV1)}` },
            { value: betterIsOption1 ? 0 : 1, tex: `\\text{Option B gives more: } \\$${FIN_MATHS.fmtMoney(FV2)}` },
            { value: 0, tex: `\\text{Both give the same result}` },
            { value: 0, tex: `\\text{Cannot be determined without a calculator}` }
        ];

        return {
            type: 'mc',
            rule: 'Compare Investments',
            difficulty: 'hard',
            text: `Which investment gives a higher return on \\$${PV}? Option A: \\(${r1 * 100}\\%\\) for \\(${n1}\\) years. Option B: \\(${r2 * 100}\\%\\) for \\(${n2}\\) years.`,
            latex: '',
            answer: 1,
            answerTex: correctTex,
            options: MathUtils.shuffle(options),
            hintTex: [
                `\\text{A: } FV = ${PV}(${1 + r1})^{${n1}} = \\$${FIN_MATHS.fmtMoney(FV1)}`,
                `\\text{B: } FV = ${PV}(${1 + r2})^{${n2}} = \\$${FIN_MATHS.fmtMoney(FV2)}`
            ],
            explain: `<strong>Option A:</strong> \\($${PV} \\times (${1 + r1})^{${n1}} = \\$${FIN_MATHS.fmtMoney(FV1)}\\)<br><br>` +
                     `<strong>Option B:</strong> \\($${PV} \\times (${1 + r2})^{${n2}} = \\$${FIN_MATHS.fmtMoney(FV2)}\\)<br><br>` +
                     `<strong>Winner:</strong> ${betterIsOption1 ? 'Option A' : 'Option B'} gives a higher return.`
        };
    },

    /* ────────────────────────────────────────────
       POOL & PICKER
       ──────────────────────────────────────────── */

    pickQuestion() {
        const pool = [
            { fn: () => FIN_MATHS.qPercentageChange(),    weight: 3, diff: 'easy' },
            { fn: () => FIN_MATHS.qFutureValue(),         weight: 3, diff: 'easy' },
            { fn: () => FIN_MATHS.qPresentValue(),        weight: 2, diff: 'medium' },
            { fn: () => FIN_MATHS.qDepreciation(),        weight: 2, diff: 'medium' },
            { fn: () => FIN_MATHS.qDoubleTime(),          weight: 2, diff: 'medium' },
            { fn: () => FIN_MATHS.qCompoundingFrequency(), weight: 2, diff: 'medium' },
            { fn: () => FIN_MATHS.qFindRate(),            weight: 1, diff: 'hard' },
            { fn: () => FIN_MATHS.qFindN(),               weight: 1, diff: 'hard' },
            { fn: () => FIN_MATHS.qRealValue(),           weight: 1, diff: 'hard' },
            { fn: () => FIN_MATHS.qBreakEven(),           weight: 1, diff: 'hard' }
        ];

        let filtered = pool;
        if (FIN_MATHS.level === 'easy')   filtered = pool.filter(p => p.diff === 'easy');
        if (FIN_MATHS.level === 'medium') filtered = pool.filter(p => p.diff === 'medium');
        if (FIN_MATHS.level === 'hard')   filtered = pool.filter(p => p.diff === 'hard');

        const totalWeight = filtered.reduce((s, p) => s + p.weight, 0);
        let r = Math.random() * totalWeight;
        for (const item of filtered) {
            r -= item.weight;
            if (r <= 0) return item.fn();
        }
        return filtered[filtered.length - 1].fn();
    },

    /* ────────────────────────────────────────────
       UI
       ──────────────────────────────────────────── */

    load() {
        FIN_MATHS.score = 0; FIN_MATHS.total = 0;
        FIN_MATHS.streak = 0; FIN_MATHS.answered = false; FIN_MATHS.hintIndex = 0;

        const container = document.getElementById('activity-container');
        if (!container) return;

        container.innerHTML = `
            <button class="back-btn" onclick="FIN_MATHS.unload()">Financial Maths (1.5)</button>
            <header style="text-align:center;margin-bottom:24px;">
                <h1>Financial Mathematics</h1>
                <p>IB Math AA 1.5 - Compound interest, present value, depreciation, real value</p>
            </header>

            <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap;">
                <button class="btn btn-sm level-filter active" data-level="all"    onclick="FIN_MATHS.setLevel('all')">All</button>
                <button class="btn btn-sm level-filter"        data-level="easy"   onclick="FIN_MATHS.setLevel('easy')">Easy</button>
                <button class="btn btn-sm level-filter"        data-level="medium" onclick="FIN_MATHS.setLevel('medium')">Medium</button>
                <button class="btn btn-sm level-filter"        data-level="hard"   onclick="FIN_MATHS.setLevel('hard')">Hard</button>
            </div>

            <div class="score-bar">
                <div class="score-item"><div class="label">Score</div><div class="value" id="fin-score">0</div></div>
                <div class="score-item"><div class="label">Total</div><div class="value" id="fin-total">0</div></div>
                <div class="score-item"><div class="label">Streak</div><div class="value" id="fin-streak">0</div></div>
                <div class="score-item"><div class="label">Accuracy</div><div class="value" id="fin-accuracy">-</div></div>
            </div>

            <div class="question-card" id="fin-question-card">
                <span class="rule-tag" id="fin-rule"></span>
                <span class="difficulty-tag" id="fin-difficulty"></span>
                <div class="question-text" id="fin-text"></div>
                <div class="question-prompt" id="fin-latex"></div>
                <div id="fin-options-area"></div>
            </div>

            <details class="workout-section"><summary>Working Out</summary><div class="workout-content" contenteditable="true"></div></details>

            <div class="hint-box" id="fin-hint-box"></div>

            <div class="feedback" id="fin-feedback">
                <div class="feedback-title" id="fin-feedback-title"></div>
                <div class="feedback-explanation" id="fin-feedback-explanation"></div>
            </div>

            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                <button class="btn btn-hint" id="fin-hint-btn" onclick="FIN_MATHS.showHint()">Hint</button>
                <button class="btn btn-primary next-btn" id="fin-next-btn" onclick="FIN_MATHS.next()" style="display:none;">Next Question</button>
            </div>
        `;

        FIN_MATHS.next();
    },

    unload() {
        const container = document.getElementById('activity-container');
        if (container) container.innerHTML = '';
        if (typeof showView === 'function') showView('number-algebra');
    },

    setLevel(lvl) {
        FIN_MATHS.level = lvl;
        document.querySelectorAll('.level-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-level') === lvl);
        });
        FIN_MATHS.score = 0; FIN_MATHS.total = 0; FIN_MATHS.streak = 0;
        FIN_MATHS.updateStats();
        FIN_MATHS.next();
    },

    next() {
        FIN_MATHS.answered = false;
        FIN_MATHS.hintIndex = 0;
        FIN_MATHS.currentQ = FIN_MATHS.pickQuestion();
        const q = FIN_MATHS.currentQ;

        document.getElementById('fin-rule').textContent = q.rule;
        const diffEl = document.getElementById('fin-difficulty');
        diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
        diffEl.className = 'difficulty-tag ' + q.difficulty;
        document.getElementById('fin-text').innerHTML = q.text;
        document.getElementById('fin-latex').innerHTML = q.latex;

        const optArea = document.getElementById('fin-options-area');
        if (q.type === 'mc') {
            let html = '<div class="options-grid">';
            q.options.forEach((opt, i) => {
                html += `<button class="option-btn" data-i="${i}" data-value="${opt.value}" onclick="FIN_MATHS.checkMC(this)">\\(${opt.tex}\\)</button>`;
            });
            html += '</div>';
            optArea.innerHTML = html;
        } else {
            optArea.innerHTML = `
                <div class="input-area">
                    <input type="number" step="any" class="lr-math-field" id="fin-input"
                           placeholder="Your answer" autocomplete="off"
                           onkeydown="if(event.key==='Enter')FIN_MATHS.checkFree()">
                    <button class="btn btn-primary" onclick="FIN_MATHS.checkFree()">Submit</button>
                </div>`;
            setTimeout(() => { const inp = document.getElementById('fin-input'); if (inp) inp.focus(); }, 100);
        }

        const hintBox = document.getElementById('fin-hint-box');
        hintBox.classList.remove('show'); hintBox.innerHTML = '';
        const fb = document.getElementById('fin-feedback');
        fb.classList.remove('show', 'correct', 'incorrect');
        document.getElementById('fin-next-btn').style.display = 'none';
        document.getElementById('fin-hint-btn').style.display = '';
        document.getElementById('fin-hint-btn').disabled = false;

        FIN_MATHS.renderAllKaTeX();
    },

    showHint() {
        const q = FIN_MATHS.currentQ;
        if (!q || !q.hintTex || FIN_MATHS.hintIndex >= q.hintTex.length) return;
        const hintBox = document.getElementById('fin-hint-box');
        const prev = FIN_MATHS.hintIndex === 0 ? '' : hintBox.innerHTML + '<hr style="border-color:#ffc107;margin:8px 0;">';
        hintBox.innerHTML = prev + `<span>\\(${q.hintTex[FIN_MATHS.hintIndex]}\\)</span>`;
        hintBox.classList.add('show');
        FIN_MATHS.hintIndex++;
        if (FIN_MATHS.hintIndex >= q.hintTex.length) document.getElementById('fin-hint-btn').disabled = true;
        FIN_MATHS.renderAllKaTeX();
    },

    checkMC(btn) {
        if (FIN_MATHS.answered) return;
        FIN_MATHS.answered = true; FIN_MATHS.total++;
        const isCorrect = parseInt(btn.getAttribute('data-value')) === 1;
        document.querySelectorAll('.option-btn').forEach(b => {
            b.disabled = true;
            if (parseInt(b.getAttribute('data-value')) === 1) b.classList.add('correct');
        });
        if (isCorrect) { btn.classList.add('correct'); FIN_MATHS.score++; FIN_MATHS.streak++; }
        else { btn.classList.add('incorrect'); FIN_MATHS.streak = 0; }
        FIN_MATHS.showFeedback(isCorrect);
        FIN_MATHS.updateStats();
    },

    checkFree() {
        if (FIN_MATHS.answered) return;
        const inp = document.getElementById('fin-input');
        if (!inp) return;
        const val = parseFloat(inp.value);
        if (isNaN(val)) { inp.style.borderColor = '#ef4444'; inp.placeholder = 'Enter a number'; return; }
        FIN_MATHS.answered = true; FIN_MATHS.total++; inp.disabled = true;
        const isCorrect = MathUtils.approxEqual(val, FIN_MATHS.currentQ.answer, 0.05);
        if (isCorrect) {
            inp.style.borderColor = 'var(--success)'; inp.style.background = 'var(--success-light)';
            FIN_MATHS.score++; FIN_MATHS.streak++;
        } else {
            inp.style.borderColor = 'var(--error)'; inp.style.background = 'var(--error-light)';
            FIN_MATHS.streak = 0;
        }
        const submitBtn = inp.parentElement.querySelector('.btn-primary');
        if (submitBtn) submitBtn.disabled = true;
        FIN_MATHS.showFeedback(isCorrect);
        FIN_MATHS.updateStats();
    },

    showFeedback(isCorrect) {
        const q = FIN_MATHS.currentQ;
        const fb = document.getElementById('fin-feedback');
        const title = document.getElementById('fin-feedback-title');
        const explanation = document.getElementById('fin-feedback-explanation');
        fb.classList.remove('correct', 'incorrect');
        fb.classList.add('show', isCorrect ? 'correct' : 'incorrect');
        if (isCorrect) {
            title.textContent = FIN_MATHS.streak > 1 ? `Correct! (${FIN_MATHS.streak} streak)` : 'Correct!';
        } else {
            title.innerHTML = `Incorrect. The answer is \\(${q.answerTex}\\).`;
        }
        explanation.innerHTML = q.explain;
        document.getElementById('fin-next-btn').style.display = '';
        document.getElementById('fin-hint-btn').style.display = 'none';
        FIN_MATHS.renderAllKaTeX();
    },

    updateStats() {
        const s = document.getElementById('fin-score');
        const t = document.getElementById('fin-total');
        const k = document.getElementById('fin-streak');
        const a = document.getElementById('fin-accuracy');
        if (s) s.textContent = FIN_MATHS.score;
        if (t) t.textContent = FIN_MATHS.total;
        if (k) k.textContent = FIN_MATHS.streak;
        if (a) a.textContent = FIN_MATHS.total > 0 ? Math.round((FIN_MATHS.score / FIN_MATHS.total) * 100) + '%' : '-';
    },

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

if (typeof ACTIVITY_INITS !== 'undefined') {
    ACTIVITY_INITS['financial-maths'] = () => FIN_MATHS.load();
}
