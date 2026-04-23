/* ================================================================
   LESSON: L'Hopital's Rule
   Full rewrite 2026-04-22 - MYP5-friendly, P56-style structure.
   IB AA HL 5.17 - deep-dive teaching lesson.
   ================================================================ */
const LESSON_LHOPITAL = {
    id: 'limits-lhopital',
    title: "L'Hopital's Rule",
    subtitle: "A derivative-powered tool for indeterminate limits",
    folder: 'calculus',
    screens: [
        // 1. Concept - Recap and motivation
        {
            type: 'concept',
            title: 'A Second Tool for 0/0',
            content: '<p>Remember the \\(0/0\\) problem from the Limits lesson? When direct substitution gave us \\(\\dfrac{0}{0}\\), we factored the numerator and denominator, cancelled the shared root, and substituted again. That worked beautifully for polynomials. But what about limits like</p>' +
                '<p style="text-align:center;font-size:1.15em;">\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\sin x}{x}\\) or \\(\\displaystyle\\lim_{x \\to 0}\\dfrac{e^x - 1}{x}\\)?</p>' +
                '<p>Substituting gives \\(0/0\\), and there is nothing to factor. We need a new tool.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The headline idea:</strong> near a shared zero, a well-behaved function looks approximately linear. Its <em>slope</em> (derivative) at that point determines how fast it is heading to zero. If we compare the slopes of the top and bottom, we learn which one is racing to zero faster - and that ratio is the limit.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Named after Guillaume de l\'Hopital</strong> (1661-1704), a French nobleman who published the rule in the first calculus textbook in 1696. It was actually discovered by Johann Bernoulli, who was paid by l\'Hopital to send him new results - an early version of ghost-writing.</p>' +
                '</div>' +
                '<p>L\'Hopital\'s rule turns a nasty limit into a <em>derivative</em> calculation. If you can differentiate, you can apply the rule. That is the whole trick.</p>'
        },

        // 2. Concept - Indeterminate forms
        {
            type: 'concept',
            title: 'The Seven Indeterminate Forms',
            content: '<p>Before we use the rule, we must recognise <em>when</em> it applies. L\'Hopital only works on an <strong>indeterminate form</strong>. There are seven standard ones worth memorising.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The two L\'Hopital targets:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{0}{0}\\) - both top and bottom go to zero.</li>' +
                '<li>\\(\\dfrac{\\infty}{\\infty}\\) - both top and bottom blow up.</li>' +
                '</ul>' +
                '<p>L\'Hopital\'s rule applies <em>directly</em> to these two.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The other five (rewrite first, then apply):</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(0 \\cdot \\infty\\) - rewrite as \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\) using \\(f \\cdot g = \\dfrac{f}{1/g}\\).</li>' +
                '<li>\\(\\infty - \\infty\\) - combine into a single fraction (common denominator).</li>' +
                '<li>\\(1^{\\infty}\\), \\(0^0\\), \\(\\infty^0\\) - take logarithms, convert to a product, then rewrite as a quotient.</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>These are NOT indeterminate - do not use L\'Hopital:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\dfrac{5}{0}\\) - determinate (goes to \\(\\pm\\infty\\), depending on sign).</li>' +
                '<li>\\(\\dfrac{0}{5}\\) - determinate (equals \\(0\\)).</li>' +
                '<li>\\(\\dfrac{\\infty}{0}\\) - determinate (goes to \\(\\pm\\infty\\)).</li>' +
                '<li>\\(0^{\\infty}\\) - determinate (equals \\(0\\)).</li>' +
                '</ul>' +
                '<p>Applying L\'Hopital to these will give a wrong answer!</p>' +
                '</div>' +
                '<p><strong>Rule of thumb:</strong> if top and bottom are <em>fighting each other</em> (both going to zero, or both exploding), it is indeterminate. If one is clearly winning (a finite number vs a zero, for example), it is not.</p>'
        },

        // 3. Practice - Identify an indeterminate form
        {
            type: 'practice',
            intro: 'What indeterminate form appears on direct substitution?',
            generate: () => LHOPITAL.qIndeterminateForm()
        },

        // 4. Concept - Statement of the rule
        {
            type: 'concept',
            title: "Statement of L'Hopital's Rule",
            content: '<p>Here is the rule as the IB formula booklet states it. Read carefully - the <em>conditions</em> matter as much as the formula.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>L\'Hopital\'s rule:</strong></p>' +
                '<p>Suppose \\(\\displaystyle\\lim_{x \\to a}\\dfrac{f(x)}{g(x)}\\) is of the form \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\), and that \\(f\\) and \\(g\\) are differentiable near \\(a\\) with \\(g\'(x) \\neq 0\\). Then</p>' +
                '<p style="text-align:center;font-size:1.2em;">\\(\\displaystyle\\lim_{x \\to a}\\dfrac{f(x)}{g(x)} = \\lim_{x \\to a}\\dfrac{f\'(x)}{g\'(x)}\\)</p>' +
                '<p>provided the right-hand limit exists (or is \\(\\pm\\infty\\)).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>CRUCIAL: differentiate top and bottom SEPARATELY.</strong></p>' +
                '<p>This is <em>not</em> the quotient rule. We do not compute \\(\\dfrac{d}{dx}\\left(\\dfrac{f}{g}\\right)\\). We compute \\(f\'\\) on top and \\(g\'\\) on bottom, independently.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Warning: only apply after confirming an indeterminate form.</strong></p>' +
                '<p>If the limit is, say, \\(\\dfrac{3}{5}\\) on direct substitution, the answer is \\(\\dfrac{3}{5}\\). Applying L\'Hopital will give you \\(\\dfrac{f\'(a)}{g\'(a)}\\), which is some <em>other</em> number - wrong!</p>' +
                '<p>Always substitute first, check you have \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\), <em>then</em> differentiate.</p>' +
                '</div>' +
                '<p><strong>Works both directions:</strong> \\(a\\) can be a finite number, \\(+\\infty\\), or \\(-\\infty\\). The rule is the same.</p>'
        },

        // 5. Concept - Why does it work? (sketch)
        {
            type: 'concept',
            title: 'Why Does It Work?',
            content: '<p>You are not required to prove L\'Hopital for the IB, but a quick sketch of the intuition makes the rule feel inevitable.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>The linear approximation idea:</strong></p>' +
                '<p>Suppose \\(f(a) = 0\\) and \\(g(a) = 0\\). Near \\(x = a\\), we can approximate</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(f(x) \\approx f(a) + f\'(a)(x - a) = f\'(a)(x - a)\\)</li>' +
                '<li>\\(g(x) \\approx g(a) + g\'(a)(x - a) = g\'(a)(x - a)\\)</li>' +
                '</ul>' +
                '<p>So</p>' +
                '<p style="text-align:center;">\\(\\dfrac{f(x)}{g(x)} \\approx \\dfrac{f\'(a)(x-a)}{g\'(a)(x-a)} = \\dfrac{f\'(a)}{g\'(a)}\\)</p>' +
                '<p>The \\((x - a)\\) factors cancel - just like factoring out \\((x - 2)\\) in the old lesson! L\'Hopital is factor-and-cancel in derivative clothing.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>For \\(\\dfrac{\\infty}{\\infty}\\):</strong> the proof is slightly trickier (uses Cauchy\'s mean value theorem) but the punchline is the same: near \\(a\\), the ratio is controlled by the ratio of growth rates, which is \\(f\'/g\'\\).</p>' +
                '</div>' +
                '<p>So the rule is not magic - it is the tangent line hiding inside the fraction.</p>'
        },

        // 6. Example - First L'Hopital application
        {
            type: 'example',
            title: 'First Application: sin(x)/x at 0',
            problem: "Find \\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\sin x}{x}\\).",
            steps: [
                { text: '<strong>Step 1 - check the form.</strong> At \\(x = 0\\): numerator \\(\\sin 0 = 0\\), denominator \\(0\\). Indeterminate \\(\\dfrac{0}{0}\\). L\'Hopital applies.' },
                { text: '<strong>Step 2 - differentiate top and bottom separately.</strong> Top: \\(\\dfrac{d}{dx}(\\sin x) = \\cos x\\). Bottom: \\(\\dfrac{d}{dx}(x) = 1\\).' },
                { text: '<strong>Step 3 - rewrite the limit.</strong> \\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\cos x}{1}\\).' },
                { text: '<strong>Step 4 - evaluate.</strong> Now direct substitution works: \\(\\dfrac{\\cos 0}{1} = \\dfrac{1}{1} = 1\\).' },
                { text: '<strong>Step 5 - answer.</strong> \\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\sin x}{x} = 1\\). \\(\\checkmark\\)' },
                { text: '<strong>Why this matters:</strong> this is a <em>standard limit</em> you should just know. It appears in the derivative of \\(\\sin x\\) from first principles. Memorise the result; L\'Hopital explains why it is true.' }
            ]
        },

        // 7. Practice - L'Hopital simple (sin or exp)
        {
            type: 'practice',
            intro: 'Apply L\'Hopital (or the standard limit) to evaluate:',
            generate: () => LHOPITAL.qLHopitalSimple()
        },

        // 8. Concept - Standard limits to memorise
        {
            type: 'concept',
            title: 'Standard Limits Worth Memorising',
            content: '<p>A handful of limits come up so often that you should recognise them instantly. Each can be verified by L\'Hopital, but in an exam you should just quote the result.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Trig and exponential:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\sin x}{x} = 1\\)</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\tan x}{x} = 1\\)</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{1 - \\cos x}{x^2} = \\dfrac{1}{2}\\)</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{e^x - 1}{x} = 1\\)</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\ln(1 + x)}{x} = 1\\)</li>' +
                '</ul>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Generalised via scaling:</strong></p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{\\sin(kx)}{x} = k\\)</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{e^{kx} - 1}{x} = k\\)</li>' +
                '</ul>' +
                '<p>Proof by L\'Hopital: differentiate top \\(\\to k\\cos(kx)\\) or \\(ke^{kx}\\), substitute \\(x = 0\\) to get \\(k\\).</p>' +
                '</div>' +
                '<p><strong>Exam tip:</strong> the standard limit \\(\\sin x / x \\to 1\\) is often quicker than L\'Hopital in time-pressured situations - <em>if</em> you can spot the pattern.</p>'
        },

        // 9. Example - Polynomial via L'Hopital
        {
            type: 'example',
            title: 'Polynomial: Factoring vs L\'Hopital',
            problem: "Find \\(\\displaystyle\\lim_{x \\to 3}\\dfrac{x^2 - 9}{x - 3}\\) using L\'Hopital\'s rule.",
            steps: [
                { text: '<strong>Step 1 - check the form.</strong> At \\(x = 3\\): top \\(9 - 9 = 0\\), bottom \\(0\\). Indeterminate \\(\\dfrac{0}{0}\\).' },
                { text: '<strong>Step 2 - differentiate top and bottom.</strong> Top: \\(\\dfrac{d}{dx}(x^2 - 9) = 2x\\). Bottom: \\(\\dfrac{d}{dx}(x - 3) = 1\\).' },
                { text: '<strong>Step 3 - rewrite.</strong> \\(\\displaystyle\\lim_{x \\to 3}\\dfrac{2x}{1} = \\lim_{x \\to 3}(2x)\\).' },
                { text: '<strong>Step 4 - substitute.</strong> \\(2(3) = 6\\).' },
                { text: '<strong>Step 5 - answer.</strong> \\(6\\). Same answer as factoring gave us: \\((x-3)(x+3)/(x-3) = x + 3 \\to 6\\). \\(\\checkmark\\)' },
                { text: '<strong>Lesson:</strong> for polynomial \\(\\dfrac{0}{0}\\) limits, factoring and L\'Hopital always agree. Use whichever is faster - factoring is usually quicker for simple polynomials, L\'Hopital wins for trig / exp / log.' }
            ]
        },

        // 10. Practice - L'Hopital polynomial
        {
            type: 'practice',
            intro: "Evaluate using factoring or L'Hopital:",
            generate: () => LHOPITAL.qLHopitalPolynomial()
        },

        // 11. Practice - L'Hopital factor-x form
        {
            type: 'practice',
            intro: 'Evaluate the limit (0/0 form at x = 0):',
            generate: () => LHOPITAL.qLHopitalApply()
        },

        // 12. Concept - Applying twice
        {
            type: 'concept',
            title: 'When Once Is Not Enough',
            content: '<p>Sometimes after applying L\'Hopital, the result is <em>still</em> indeterminate. No problem - apply the rule again. And again, if needed. You can iterate as many times as required, provided each stage is \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Algorithm:</strong></p>' +
                '<ol style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>Substitute. If determinate, stop - you have the answer.</li>' +
                '<li>If indeterminate (\\(0/0\\) or \\(\\infty/\\infty\\)): differentiate top and bottom separately.</li>' +
                '<li>Go back to step 1 with the new expression.</li>' +
                '</ol>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Classic example - needs L\'Hopital twice:</strong></p>' +
                '<p style="text-align:center;">\\(\\displaystyle\\lim_{x \\to 0}\\dfrac{1 - \\cos x}{x^2}\\)</p>' +
                '<p>Pass 1: top \\(\\to \\sin x\\), bottom \\(\\to 2x\\). At \\(x = 0\\): \\(\\dfrac{0}{0}\\) again.</p>' +
                '<p>Pass 2: top \\(\\to \\cos x\\), bottom \\(\\to 2\\). At \\(x = 0\\): \\(\\dfrac{1}{2}\\). Done.</p>' +
                '</div>' +
                '<p><strong>Warning:</strong> each time you apply L\'Hopital you <em>must</em> re-check the form. If at some stage the limit becomes determinate (say \\(\\dfrac{5}{3}\\)), read off the answer - do not differentiate further.</p>'
        },

        // 13. Example - Apply twice
        {
            type: 'example',
            title: "Applying L'Hopital Twice",
            problem: "Find \\(\\displaystyle\\lim_{x \\to 0}\\dfrac{1 - \\cos x}{x^2}\\).",
            steps: [
                { text: '<strong>Step 1 - check.</strong> At \\(x = 0\\): \\(1 - \\cos 0 = 0\\), denominator \\(0\\). Indeterminate \\(\\dfrac{0}{0}\\).' },
                { text: '<strong>Step 2 - first L\'Hopital.</strong> Top derivative: \\(\\dfrac{d}{dx}(1 - \\cos x) = \\sin x\\). Bottom derivative: \\(\\dfrac{d}{dx}(x^2) = 2x\\). New expression: \\(\\dfrac{\\sin x}{2x}\\).' },
                { text: '<strong>Step 3 - check again.</strong> At \\(x = 0\\): \\(\\dfrac{\\sin 0}{2(0)} = \\dfrac{0}{0}\\). Still indeterminate - apply L\'Hopital a second time.' },
                { text: '<strong>Step 4 - second L\'Hopital.</strong> Top derivative: \\(\\cos x\\). Bottom derivative: \\(2\\). New expression: \\(\\dfrac{\\cos x}{2}\\).' },
                { text: '<strong>Step 5 - check.</strong> At \\(x = 0\\): \\(\\dfrac{\\cos 0}{2} = \\dfrac{1}{2}\\). Determinate - this is our answer.' },
                { text: '<strong>Step 6 - answer.</strong> \\(\\displaystyle\\lim_{x \\to 0}\\dfrac{1 - \\cos x}{x^2} = \\dfrac{1}{2}\\). \\(\\checkmark\\)' },
                { text: '<strong>Shortcut alternative:</strong> using \\(1 - \\cos x = 2\\sin^2(x/2)\\), this becomes \\(\\dfrac{2\\sin^2(x/2)}{x^2} = \\dfrac{1}{2}\\left(\\dfrac{\\sin(x/2)}{x/2}\\right)^2 \\to \\dfrac{1}{2}\\cdot 1 = \\dfrac{1}{2}\\). Same answer.' }
            ]
        },

        // 14. Practice - L'Hopital twice
        {
            type: 'practice',
            intro: "Evaluate (you will need L'Hopital twice):",
            generate: () => LHOPITAL.qLHopitalTwice()
        },

        // 15. Concept - Infinity over infinity
        {
            type: 'concept',
            title: "L'Hopital at Infinity",
            content: '<p>L\'Hopital handles the \\(\\dfrac{\\infty}{\\infty}\\) form just as happily as \\(\\dfrac{0}{0}\\). The mechanics are identical: differentiate top and bottom separately, then re-evaluate.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Example:</strong> \\(\\displaystyle\\lim_{x \\to \\infty}\\dfrac{\\ln x}{x}\\).</p>' +
                '<p>At \\(\\infty\\): top \\(\\to \\infty\\), bottom \\(\\to \\infty\\). Indeterminate \\(\\dfrac{\\infty}{\\infty}\\).</p>' +
                '<p>Apply L\'Hopital: \\(\\dfrac{1/x}{1} = \\dfrac{1}{x} \\to 0\\) as \\(x \\to \\infty\\).</p>' +
                '<p>So \\(\\displaystyle\\lim_{x \\to \\infty}\\dfrac{\\ln x}{x} = 0\\). Polynomial growth beats logarithmic growth.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>The growth hierarchy (as \\(x \\to \\infty\\)):</strong></p>' +
                '<p style="text-align:center;">\\(\\ln x \\ll x^n \\ll e^x\\)</p>' +
                '<p>Logarithms are slowest, powers of \\(x\\) are in the middle, exponentials dominate. For any ratio of these, L\'Hopital confirms that the faster-growing side wins:</p>' +
                '<ul style="margin:6px 0 6px 24px;line-height:1.8;">' +
                '<li>\\(\\displaystyle\\lim_{x \\to \\infty}\\dfrac{\\ln x}{x^n} = 0\\) for any \\(n > 0\\).</li>' +
                '<li>\\(\\displaystyle\\lim_{x \\to \\infty}\\dfrac{x^n}{e^x} = 0\\) for any \\(n\\).</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>For rational functions at infinity:</strong> you <em>can</em> use L\'Hopital, but the divide-by-highest-power trick from the Limits lesson is usually faster. Use L\'Hopital when logs, trig, or exponentials are involved.</p>'
        },

        // 16. Practice - Limit at infinity
        {
            type: 'practice',
            intro: 'Evaluate the limit as x approaches infinity:',
            generate: () => LHOPITAL.qLimitAtInfinity()
        },

        // 17. Practice - Limit at infinity (rational)
        {
            type: 'practice',
            intro: 'Find the limit as x approaches infinity:',
            generate: () => LHOPITAL.qLimitRational()
        },

        // 18. Concept - Other forms (0 * inf, inf - inf, 1^inf)
        {
            type: 'concept',
            title: 'Rewriting Other Indeterminate Forms',
            content: '<p>L\'Hopital only acts on \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\). For the other five forms, you must first <em>rewrite</em> the expression into one of those two shapes. Here is the standard playbook.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Form 1: \\(0 \\cdot \\infty\\).</strong></p>' +
                '<p>Example: \\(\\displaystyle\\lim_{x \\to 0^+} x \\ln x\\). Here \\(x \\to 0\\) and \\(\\ln x \\to -\\infty\\).</p>' +
                '<p>Rewrite: \\(x \\ln x = \\dfrac{\\ln x}{1/x}\\). Now the form is \\(\\dfrac{-\\infty}{\\infty}\\), so L\'Hopital applies.</p>' +
                '<p>Derivatives: top \\(\\to 1/x\\), bottom \\(\\to -1/x^2\\). Ratio: \\(\\dfrac{1/x}{-1/x^2} = -x \\to 0\\). So \\(\\displaystyle\\lim_{x \\to 0^+} x\\ln x = 0\\).</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Form 2: \\(\\infty - \\infty\\).</strong></p>' +
                '<p>Combine into a single fraction using a common denominator.</p>' +
                '<p>Example: \\(\\displaystyle\\lim_{x \\to 0}\\left(\\dfrac{1}{x} - \\dfrac{1}{\\sin x}\\right) = \\lim_{x \\to 0}\\dfrac{\\sin x - x}{x \\sin x}\\), which is \\(\\dfrac{0}{0}\\) and L\'Hopital-ready.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Forms 3-5: \\(1^{\\infty}, 0^0, \\infty^0\\).</strong></p>' +
                '<p>Take logs. If \\(y = f(x)^{g(x)}\\), then \\(\\ln y = g(x) \\ln f(x)\\) - a product, which is often \\(0 \\cdot \\infty\\). Rewrite as a quotient and apply L\'Hopital. At the end, exponentiate: \\(\\lim y = e^{\\lim \\ln y}\\).</p>' +
                '<p>Example: \\(\\displaystyle\\lim_{x \\to \\infty}\\left(1 + \\dfrac{1}{x}\\right)^x\\). Taking logs leads to the standard result \\(e\\).</p>' +
                '</div>' +
                '<p><strong>Algorithm summary:</strong> always rewrite to \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\) <em>before</em> differentiating.</p>'
        },

        // 19. Simulation - PhET calculus grapher
        {
            type: 'simulation',
            title: 'Explore: Derivatives and Limits',
            url: 'https://phet.colorado.edu/sims/html/calculus-grapher/latest/calculus-grapher_en.html',
            description: 'L\'Hopital\'s rule compares the slopes of top and bottom functions at a shared zero. This sim lets you draw a function and see its derivative live below - perfect for building visual intuition for what L\'Hopital is actually doing.',
            tasks: [
                'Draw a function f(x) that passes through zero at some x = a, and another function g(x) that also passes through zero at the same x = a. Compare the slopes of f and g at that point - which one goes to zero faster? What does the ratio f\'(a) / g\'(a) tell you about the limit of f(x) / g(x)?',
                'Draw a function that is zero at x = a but has horizontal tangent there (f(a) = 0 and f\'(a) = 0). What does this mean for L\'Hopital - would one application be enough? What happens if you apply the rule a second time?',
                'Build a function that grows without bound and another function that also grows without bound. Compare their derivatives. Which side of the race wins - and how does that match up with the L\'Hopital ratio at infinity?'
            ]
        },

        // 20. Practice - Squeeze theorem bonus
        {
            type: 'practice',
            intro: 'Evaluate this limit (hint: L\'Hopital will NOT work here - think Squeeze Theorem):',
            generate: () => LHOPITAL.qSqueeze()
        },

        // 21. Concept - Common pitfalls
        {
            type: 'concept',
            title: 'Common Pitfalls',
            content: '<p>Every year, students lose marks by misapplying L\'Hopital. Read these carefully - they are the usual suspects.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 1: applying L\'Hopital without checking the form.</strong></p>' +
                '<p>Example: \\(\\displaystyle\\lim_{x \\to 0}\\dfrac{x + 2}{x + 5}\\). Substituting gives \\(\\dfrac{2}{5}\\) - determinate. That <em>is</em> the answer.</p>' +
                '<p>If you mindlessly differentiate: \\(\\dfrac{1}{1} = 1\\). Wrong! L\'Hopital gave you something totally unrelated to the actual limit.</p>' +
                '<p>Always confirm \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\) <em>before</em> you differentiate.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 2: using the quotient rule by mistake.</strong></p>' +
                '<p>L\'Hopital says differentiate top and bottom <em>separately</em>. That is \\(\\dfrac{f\'}{g\'}\\), not \\(\\dfrac{f\'g - fg\'}{g^2}\\).</p>' +
                '<p>If in doubt, compute top and bottom on separate lines, then put them back together as a fraction.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 3: forgetting to re-check the form after applying.</strong></p>' +
                '<p>After one pass of L\'Hopital, the new expression might be determinate <em>or</em> still indeterminate. You must substitute again to see which.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 4: applying to \\(0 \\cdot \\infty\\) or \\(\\infty - \\infty\\) without rewriting.</strong></p>' +
                '<p>L\'Hopital requires a <em>quotient</em>. Rewrite these forms into \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\) first.</p>' +
                '</div>' +
                '<div class="lesson-box">' +
                '<p><strong>Pitfall 5: circular reasoning.</strong></p>' +
                '<p>Using L\'Hopital to prove \\(\\lim_{x\\to 0}\\dfrac{\\sin x}{x} = 1\\) is technically circular, because the derivative of \\(\\sin x\\) depends on that limit. Examiners sometimes test this - be ready to cite the sandwich / squeeze proof instead if asked to justify rigorously.</p>' +
                '</div>'
        },

        // 22. Summary
        {
            type: 'summary',
            html: '<ul style="line-height:2;">' +
                '<li><strong>L\'Hopital\'s rule:</strong> if \\(\\lim f/g\\) is \\(\\tfrac{0}{0}\\) or \\(\\tfrac{\\infty}{\\infty}\\), then \\(\\lim f/g = \\lim f\'/g\'\\).</li>' +
                '<li><strong>Differentiate top and bottom separately</strong> - NOT the quotient rule.</li>' +
                '<li><strong>Always verify the indeterminate form</strong> before applying. Using L\'Hopital on a determinate limit gives a wrong answer.</li>' +
                '<li><strong>Seven indeterminate forms:</strong> \\(\\tfrac{0}{0}\\), \\(\\tfrac{\\infty}{\\infty}\\), \\(0 \\cdot \\infty\\), \\(\\infty - \\infty\\), \\(1^{\\infty}\\), \\(0^0\\), \\(\\infty^0\\).</li>' +
                '<li><strong>For non-quotient forms:</strong> rewrite as \\(\\tfrac{0}{0}\\) or \\(\\tfrac{\\infty}{\\infty}\\) first (flip, common denominator, take logs).</li>' +
                '<li><strong>Apply iteratively:</strong> if still indeterminate after one pass, differentiate again. Re-check the form each time.</li>' +
                '<li><strong>Standard limits to memorise:</strong> \\(\\tfrac{\\sin x}{x} \\to 1\\), \\(\\tfrac{e^x - 1}{x} \\to 1\\), \\(\\tfrac{1 - \\cos x}{x^2} \\to \\tfrac{1}{2}\\), \\(\\tfrac{\\ln(1+x)}{x} \\to 1\\).</li>' +
                '<li><strong>Growth hierarchy:</strong> \\(\\ln x \\ll x^n \\ll e^x\\) as \\(x \\to \\infty\\).</li>' +
                '</ul>' +
                '<p><strong>Next:</strong> with limits and L\'Hopital under control, you have all the tools needed to define the derivative from first principles and build the rules of differentiation.</p>'
        }
    ]
};
