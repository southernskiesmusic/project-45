const LESSON_TRIG_FUNC = {
    id: 'trig-functions',
    title: 'Trigonometric Functions',
    subtitle: 'Amplitude, period, phase shift, and transformations',
    folder: 'geometry-trig',
    screens: [
        // ── 1. Concept: The General Trig Function ─────────────────
        {
            type: 'concept',
            title: 'The General Trig Function',
            content: '<p>The general form of a sinusoidal function is \\(f(x) = a \\cdot \\sin(bx + c) + d\\) (or with cosine). Each parameter controls a specific transformation:</p>' +
                '<div class="lesson-box">' +
                '<strong>Amplitude:</strong> \\(|a|\\) — the height from the midline to the peak<br><br>' +
                '<strong>Period:</strong> \\(\\dfrac{2\\pi}{b}\\) for sin/cos; \\(\\dfrac{\\pi}{b}\\) for tan — the length of one full cycle<br><br>' +
                '<strong>Phase shift:</strong> \\(-\\dfrac{c}{b}\\) — positive value shifts right, negative shifts left<br><br>' +
                '<strong>Vertical shift:</strong> \\(d\\) — moves the midline up or down<br><br>' +
                '<strong>Range:</strong> \\([d - |a|,\\ d + |a|]\\) — from minimum to maximum output' +
                '</div>'
        },

        // ── 2. Practice: Find the amplitude ───────────────────────
        {
            type: 'practice',
            intro: 'Find the amplitude:',
            generate: () => TRIG_FUNC.qAmplitude()
        },

        // ── 3. Practice: Find the period ──────────────────────────
        {
            type: 'practice',
            intro: 'Find the period:',
            generate: () => TRIG_FUNC.qPeriodSinCos()
        },

        // ── 4. Practice: Find the maximum value ───────────────────
        {
            type: 'practice',
            intro: 'Find the maximum value:',
            generate: () => TRIG_FUNC.qMaxValue()
        },

        // ── 5. Practice: Find the minimum value ───────────────────
        {
            type: 'practice',
            intro: 'Find the minimum value:',
            generate: () => TRIG_FUNC.qMinValue()
        },

        // ── 6. Example: Analysing f(x) = 3sin(2x) + 1 ────────────
        {
            type: 'example',
            problem: 'Analyse \\(f(x) = 3\\sin(2x) + 1\\). Find the amplitude, period, vertical shift, maximum, minimum, and range.',
            steps: [
                { text: '<strong>Amplitude:</strong> \\(|a| = |3| = 3\\).' },
                { text: '<strong>Period:</strong> \\(\\dfrac{2\\pi}{b} = \\dfrac{2\\pi}{2} = \\pi\\).' },
                { text: '<strong>Vertical shift:</strong> \\(d = 1\\) — the midline is \\(y = 1\\).' },
                { text: '<strong>Maximum:</strong> \\(d + |a| = 1 + 3 = 4\\).' },
                { text: '<strong>Minimum:</strong> \\(d - |a| = 1 - 3 = -2\\).' },
                { text: '<strong>Answer:</strong> Range is \\([-2,\\ 4]\\).' }
            ]
        },

        // ── 7. Practice: Find the range ───────────────────────────
        {
            type: 'practice',
            intro: 'Find the range of the function:',
            generate: () => TRIG_FUNC.qRange()
        },

        // ── 8. Practice: Find the vertical shift ──────────────────
        {
            type: 'practice',
            intro: 'Find the vertical shift d from the maximum value:',
            generate: () => TRIG_FUNC.qVerticalShift()
        },

        // ── 9. Concept: Period and Phase Shift ────────────────────
        {
            type: 'concept',
            title: 'Period and Phase Shift',
            content: '<p>The value of \\(b\\) controls how compressed or stretched the graph is horizontally, and \\(c\\) shifts it left or right.</p>' +
                '<div class="lesson-box">' +
                '<strong>Larger \\(b\\) → shorter period</strong> (graph is more compressed horizontally)<br><br>' +
                '<strong>Phase shift</strong> \\(= -\\dfrac{c}{b}\\):<br>' +
                'Positive phase shift → shift <em>right</em><br>' +
                'Negative phase shift → shift <em>left</em><br><br>' +
                '<strong>Example:</strong> Compare \\(f(x) = \\sin(x)\\) and \\(g(x) = \\sin(2x)\\).<br>' +
                '\\(f\\) has period \\(2\\pi\\); \\(g\\) has period \\(\\pi\\) — \\(g\\) completes a full cycle in half the horizontal distance.' +
                '</div>'
        },

        // ── 10. Example: Finding b from the Period ────────────────
        {
            type: 'example',
            problem: 'The period of \\(f(x) = \\sin(bx)\\) is \\(4\\). Find \\(b\\) and write the equation.',
            steps: [
                { text: '<strong>Step 1:</strong> Use the period formula: \\(\\text{Period} = \\dfrac{2\\pi}{b}\\).' },
                { text: '<strong>Step 2:</strong> Substitute: \\(4 = \\dfrac{2\\pi}{b}\\), so \\(b = \\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}\\).' },
                { text: '<strong>Answer:</strong> \\(f(x) = \\sin\\!\\left(\\dfrac{\\pi}{2}x\\right)\\).' }
            ]
        },

        // ── 11. Practice: Find b given the period ─────────────────
        {
            type: 'practice',
            intro: 'Find b given the period:',
            generate: () => TRIG_FUNC.qPeriodFromGraph()
        },

        // ── 12. Practice: Find the phase shift ────────────────────
        {
            type: 'practice',
            intro: 'Find the phase shift:',
            generate: () => TRIG_FUNC.qPhaseShift()
        },

        // ── 13. Practice: Evaluate the function ───────────────────
        {
            type: 'practice',
            intro: 'Evaluate the function at the given x:',
            generate: () => TRIG_FUNC.qEvaluateAtPoint()
        },

        // ── 14. Practice: Identify the equation ───────────────────
        {
            type: 'practice',
            intro: 'Identify the equation from the given features:',
            generate: () => TRIG_FUNC.qIdentifyEquation()
        },

        // ── 15. Summary ────────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>General form: \\(f(x) = a \\cdot \\sin(bx + c) + d\\)</li>' +
                '<li><strong>Amplitude:</strong> \\(|a|\\)</li>' +
                '<li><strong>Period:</strong> \\(\\dfrac{2\\pi}{b}\\) (sin/cos) or \\(\\dfrac{\\pi}{b}\\) (tan)</li>' +
                '<li><strong>Phase shift:</strong> \\(-\\dfrac{c}{b}\\) (positive → right, negative → left)</li>' +
                '<li><strong>Vertical shift:</strong> \\(d\\) (midline = \\(y = d\\))</li>' +
                '<li><strong>Maximum:</strong> \\(d + |a|\\); <strong>Minimum:</strong> \\(d - |a|\\)</li>' +
                '<li><strong>Range:</strong> \\([d - |a|,\\ d + |a|]\\)</li>' +
                '<li>Larger \\(b\\) → shorter period (graph more compressed)</li>' +
                '</ul>'
        }
    ]
};
