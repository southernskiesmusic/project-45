const LESSON_INT_PARTS = {
    id: 'integration-by-parts',
    title: 'Integration by Parts',
    subtitle: '∫u dv = uv − ∫v du — choosing u, applying the formula',
    folder: 'calculus',
    screens: [
        // ── 1. Concept: The IBP Formula ───────────────────────────
        {
            type: 'concept',
            title: 'Integration by Parts',
            content: '<p><strong>Integration by parts</strong> is used to integrate products of functions. It reverses the product rule:</p>' +
                '<div class="lesson-box">' +
                '\\(\\displaystyle\\int u\\,dv = uv - \\int v\\,du\\)' +
                '</div>' +
                '<p><strong>LIATE rule</strong> for choosing \\(u\\) (in order of preference):</p>' +
                '<ul>' +
                '<li><strong>L</strong>ogarithm (e.g. \\(\\ln x\\))</li>' +
                '<li><strong>I</strong>nverse trig (e.g. \\(\\arctan x\\))</li>' +
                '<li><strong>A</strong>lgebraic (e.g. \\(x^2\\))</li>' +
                '<li><strong>T</strong>rigonometric (e.g. \\(\\sin x\\))</li>' +
                '<li><strong>E</strong>xponential (e.g. \\(e^x\\))</li>' +
                '</ul>' +
                '<p>Choose \\(u\\) as whichever comes <em>first</em> in LIATE — the other factor is \\(dv\\).</p>'
        },

        // ── 2. Practice: Choose u ─────────────────────────────────
        {
            type: 'practice',
            intro: 'Choose the correct u for integration by parts:',
            generate: () => INT_PARTS.qChooseU()
        },

        // ── 3. Practice: Choose u for product with trig ───────────
        {
            type: 'practice',
            intro: 'Which expression should be u by the LIATE rule?',
            generate: () => INT_PARTS.qUDVChoice()
        },

        // ── 4. Example: ∫x·eˣ dx ─────────────────────────────────
        {
            type: 'example',
            problem: 'Find \\(\\displaystyle\\int x e^x\\,dx\\).',
            steps: [
                { text: '<strong>Choose:</strong> \\(u = x\\) (algebraic), \\(dv = e^x\\,dx\\).' },
                { text: '<strong>Then:</strong> \\(du = dx\\), \\(v = e^x\\).' },
                { text: '<strong>Apply IBP:</strong> \\(\\int xe^x\\,dx = xe^x - \\int e^x\\,dx\\).' },
                { text: '<strong>Answer:</strong> \\(\\int xe^x\\,dx = xe^x - e^x + C = e^x(x-1) + C\\).' }
            ]
        },

        // ── 5. Practice: Antiderivative of x·eˣ ─────────────────
        {
            type: 'practice',
            intro: 'Identify the correct antiderivative from IBP:',
            generate: () => INT_PARTS.qIBPBasic()
        },

        // ── 6. Practice: Definite integral with IBP ───────────────
        {
            type: 'practice',
            intro: 'Evaluate the definite integral using ∫xeˣdx = eˣ(x−1) + C:',
            generate: () => INT_PARTS.qIBPEvaluate()
        },

        // ── 7. Concept: Integrating ln x and arctan x ────────────
        {
            type: 'concept',
            title: 'Integrating ln x and arctan x',
            content: '<p>These functions require IBP with \\(dv = dx\\) (i.e. \\(v = x\\)):</p>' +
                '<div class="lesson-box">' +
                '\\(\\displaystyle\\int \\ln x\\,dx = x\\ln x - x + C\\)<br><br>' +
                '\\(\\displaystyle\\int \\arctan x\\,dx = x\\arctan x - \\tfrac{1}{2}\\ln(1+x^2) + C\\)' +
                '</div>' +
                '<p><strong>Derivation of ∫ln x dx:</strong></p>' +
                '<ul>' +
                '<li>Set \\(u = \\ln x\\), \\(dv = dx\\)</li>' +
                '<li>Then \\(du = \\frac{1}{x}dx\\), \\(v = x\\)</li>' +
                '<li>\\(\\int \\ln x\\,dx = x\\ln x - \\int x\\cdot\\frac{1}{x}\\,dx = x\\ln x - x + C\\)</li>' +
                '</ul>'
        },

        // ── 8. Practice: ∫ln x dx ────────────────────────────────
        {
            type: 'practice',
            intro: 'Identify the correct antiderivative of ln(x):',
            generate: () => INT_PARTS.qIBPLn()
        },

        // ── 9. Practice: ∫ln x dx evaluated ─────────────────────
        {
            type: 'practice',
            intro: 'Evaluate the definite integral involving ln x:',
            generate: () => INT_PARTS.qIBPConstant()
        },

        // ── 10. Practice: ∫x·sin x dx ────────────────────────────
        {
            type: 'practice',
            intro: 'Find the antiderivative of x·sin(x):',
            generate: () => INT_PARTS.qIBPTrig()
        },

        // ── 11. Example: Applying IBP Twice ───────────────────────
        {
            type: 'example',
            problem: 'Find \\(\\displaystyle\\int x^2 e^x\\,dx\\).',
            steps: [
                { text: '<strong>IBP 1:</strong> \\(u = x^2\\), \\(dv = e^x dx\\) → \\(x^2 e^x - 2\\int xe^x\\,dx\\).' },
                { text: '<strong>IBP 2:</strong> \\(\\int xe^x\\,dx = xe^x - e^x + C\\) (from previous result).' },
                { text: '<strong>Answer:</strong> \\(\\int x^2 e^x\\,dx = x^2 e^x - 2xe^x + 2e^x + C = e^x(x^2-2x+2)+C\\).' }
            ]
        },

        // ── 12. Summary ───────────────────────────────────────────
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Formula: \\(\\int u\\,dv = uv - \\int v\\,du\\)</li>' +
                '<li>LIATE: Logarithm → Inverse trig → Algebraic → Trig → Exponential</li>' +
                '<li>\\(\\int xe^x\\,dx = e^x(x-1) + C\\)</li>' +
                '<li>\\(\\int x\\sin x\\,dx = -x\\cos x + \\sin x + C\\)</li>' +
                '<li>\\(\\int \\ln x\\,dx = x\\ln x - x + C\\)</li>' +
                '<li>\\(\\int \\arctan x\\,dx = x\\arctan x - \\frac{1}{2}\\ln(1+x^2) + C\\)</li>' +
                '<li>May need to apply IBP twice for higher powers</li>' +
                '</ul>'
        }
    ]
};
