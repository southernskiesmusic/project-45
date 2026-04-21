const LESSON_SURDS = {
    id: 'surds',
    title: 'Surds',
    subtitle: 'Simplifying, rationalising, and expanding expressions involving surds',
    screens: [
        {
            type: 'concept',
            title: 'What is a Surd?',
            content: '<p>A <strong>surd</strong> is an irrational root that cannot be simplified to a whole number or fraction. For example, \\(\\sqrt{2}\\), \\(\\sqrt{3}\\), and \\(\\sqrt{5}\\) are surds.</p>' +
                '<p>\\(\\sqrt{4} = 2\\) is <em>not</em> a surd because it simplifies to a whole number.</p>' +
                '<div class="lesson-box"><strong>Key rule:</strong> \\(\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}\\)<br>Use this to simplify surds by finding perfect square factors.</div>' +
                '<p><strong>Example:</strong> Simplify \\(\\sqrt{12}\\).</p>' +
                '<p>Find the largest perfect square factor of 12: \\(12 = 4 \\times 3\\).</p>' +
                '<p>So \\(\\sqrt{12} = \\sqrt{4 \\times 3} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}\\).</p>'
        },
        {
            type: 'concept',
            title: 'Simplifying Surds',
            content: '<p>Always look for the <strong>largest perfect square factor</strong>.</p>' +
                '<div class="lesson-box"><strong>Perfect squares to remember:</strong> 4, 9, 16, 25, 36, 49, 64, 100</div>' +
                '<p><strong>Example 1:</strong> Simplify \\(\\sqrt{75}\\).</p>' +
                '<p>\\(75 = 25 \\times 3\\), so \\(\\sqrt{75} = 5\\sqrt{3}\\). ✓</p>' +
                '<p><em>Not</em> \\(\\sqrt{75} = \\sqrt{5 \\times 15} = \\sqrt{5}\\sqrt{15}\\) — this is valid but not <strong>simplified</strong>.</p>' +
                '<p><strong>Example 2:</strong> Simplify \\(\\sqrt{72}\\).</p>' +
                '<p>\\(72 = 36 \\times 2\\), so \\(\\sqrt{72} = 6\\sqrt{2}\\). ✓</p>'
        },
        {
            type: 'example',
            title: 'Example: Simplifying a Surd',
            problemMath: false,
            problem: 'Simplify \\(\\sqrt{48}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Find the largest perfect square factor of 48.<br>\\(48 = 16 \\times 3\\)' },
                { text: '<strong>Step 2:</strong> Split using \\(\\sqrt{ab} = \\sqrt{a}\\sqrt{b}\\).<br>\\(\\sqrt{48} = \\sqrt{16} \\times \\sqrt{3}\\)' },
                { text: '<strong>Step 3:</strong> Evaluate the square root of the perfect square.<br>\\(\\sqrt{16} = 4\\)' },
                { text: '<strong>Answer:</strong> \\(\\sqrt{48} = 4\\sqrt{3}\\)' }
            ]
        },
        {
            type: 'concept',
            title: 'Adding and Subtracting Surds',
            content: '<p>Surds can only be added or subtracted if they have the <strong>same number under the root</strong> — just like like terms in algebra.</p>' +
                '<div class="lesson-box"><strong>Rule:</strong> \\(a\\sqrt{n} + b\\sqrt{n} = (a+b)\\sqrt{n}\\)</div>' +
                '<p><strong>Example:</strong> Simplify \\(3\\sqrt{5} + 2\\sqrt{5} - \\sqrt{5}\\).</p>' +
                '<p>\\(= (3 + 2 - 1)\\sqrt{5} = 4\\sqrt{5}\\)</p>' +
                '<p><strong>Example with simplifying first:</strong> \\(\\sqrt{12} + \\sqrt{75}\\)</p>' +
                '<p>\\(= 2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}\\)</p>' +
                '<p>Always simplify each surd <em>before</em> trying to combine them.</p>'
        },
        {
            type: 'example',
            title: 'Example: Adding Surds',
            problemMath: false,
            problem: 'Simplify \\(\\sqrt{48} + \\sqrt{75}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Simplify \\(\\sqrt{48} = 4\\sqrt{3}\\).' },
                { text: '<strong>Step 2:</strong> Simplify \\(\\sqrt{75} = 5\\sqrt{3}\\).' },
                { text: '<strong>Step 3:</strong> Add like surds: \\(4\\sqrt{3} + 5\\sqrt{3} = 9\\sqrt{3}\\).' },
                { text: '<strong>Answer:</strong> \\(9\\sqrt{3}\\)' }
            ]
        },
        {
            type: 'concept',
            title: 'Rationalising the Denominator',
            content: '<p>Having a surd in the denominator is not considered fully simplified. We <strong>rationalise</strong> to remove it.</p>' +
                '<div class="lesson-box"><strong>Method:</strong> Multiply numerator and denominator by the surd in the denominator.<br>' +
                '$$\\frac{a}{\\sqrt{b}} = \\frac{a}{\\sqrt{b}} \\times \\frac{\\sqrt{b}}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$$</div>' +
                '<p><strong>Example:</strong> Rationalise \\(\\dfrac{6}{\\sqrt{3}}\\).</p>' +
                '<p>$$\\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$$</p>' +
                '<p>We are multiplying by 1 in the form \\(\\frac{\\sqrt{3}}{\\sqrt{3}}\\), so the value is unchanged.</p>'
        },
        {
            type: 'example',
            title: 'Example: Rationalising the Denominator',
            problemMath: false,
            problem: 'Rationalise the denominator of \\(\\dfrac{10}{\\sqrt{5}}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Multiply top and bottom by \\(\\sqrt{5}\\).<br>$$\\frac{10}{\\sqrt{5}} \\times \\frac{\\sqrt{5}}{\\sqrt{5}}$$' },
                { text: '<strong>Step 2:</strong> Simplify the numerator: \\(10 \\times \\sqrt{5} = 10\\sqrt{5}\\).' },
                { text: '<strong>Step 3:</strong> Simplify the denominator: \\(\\sqrt{5} \\times \\sqrt{5} = 5\\).' },
                { text: '<strong>Step 4:</strong> Simplify the fraction: \\(\\dfrac{10\\sqrt{5}}{5} = 2\\sqrt{5}\\).' },
                { text: '<strong>Answer:</strong> \\(2\\sqrt{5}\\)' }
            ]
        },
        {
            type: 'concept',
            title: 'Expanding Brackets with Surds',
            content: '<p>Use the <strong>distributive law</strong> or <strong>FOIL</strong>, then simplify surds that appear.</p>' +
                '<div class="lesson-box"><strong>Key identity (difference of two squares):</strong><br>' +
                '\\((a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b\\)</div>' +
                '<p>This gives a rational answer — very useful!</p>' +
                '<p><strong>Example 1:</strong> Expand \\(\\sqrt{2}(3 + \\sqrt{2})\\).<br>' +
                '\\(= 3\\sqrt{2} + \\sqrt{2} \\cdot \\sqrt{2} = 3\\sqrt{2} + 2\\)</p>' +
                '<p><strong>Example 2:</strong> Expand \\((3 + \\sqrt{5})(3 - \\sqrt{5})\\).<br>' +
                '\\(= 9 - (\\sqrt{5})^2 = 9 - 5 = 4\\)</p>' +
                '<p><strong>Example 3:</strong> Expand \\((1 + \\sqrt{3})^2\\).<br>' +
                '\\(= 1 + 2\\sqrt{3} + 3 = 4 + 2\\sqrt{3}\\)</p>'
        },
        {
            type: 'example',
            title: 'Example: Difference of Two Squares',
            problemMath: false,
            problem: 'Expand and simplify \\((3 + \\sqrt{2})(3 - \\sqrt{2})\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Recognise the difference of two squares pattern: \\((a+b)(a-b) = a^2 - b^2\\).' },
                { text: '<strong>Step 2:</strong> Here \\(a = 3\\) and \\(b = \\sqrt{2}\\).' },
                { text: '<strong>Step 3:</strong> \\((3)^2 - (\\sqrt{2})^2 = 9 - 2 = 7\\).' },
                { text: '<strong>Answer:</strong> \\(7\\) (a rational number!)' }
            ]
        },
        {
            type: 'summary',
            title: 'Surds — Summary',
            html: '<ul>' +
                '<li><strong>Simplify:</strong> \\(\\sqrt{ab} = \\sqrt{a}\\sqrt{b}\\) — find the largest perfect square factor.</li>' +
                '<li><strong>Add/subtract:</strong> Only combine surds with the same radicand (number under \\(\\sqrt{}\\)).</li>' +
                '<li><strong>Rationalise:</strong> Multiply top and bottom by the surd to clear it from the denominator.</li>' +
                '<li><strong>Expand:</strong> Use FOIL/distributive law; remember \\((a+\\sqrt{b})(a-\\sqrt{b}) = a^2 - b\\).</li>' +
                '</ul>'
        }
    ]
};
