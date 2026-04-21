const LESSON_ALG_FRAC = {
    id: 'algebraic-fractions',
    title: 'Algebraic Fractions',
    subtitle: 'Simplifying, adding, subtracting, and solving with algebraic fractions',
    screens: [
        {
            type: 'concept',
            title: 'What are Algebraic Fractions?',
            content: '<p>An <strong>algebraic fraction</strong> has expressions with variables in the numerator and/or denominator.</p>' +
                '<p>Examples: \\(\\dfrac{x+1}{x-2}\\), \\(\\dfrac{3}{x^2}\\), \\(\\dfrac{x^2-4}{x+2}\\)</p>' +
                '<p>All the rules for numerical fractions apply — the only extra step is <strong>factorising</strong> to simplify.</p>' +
                '<div class="lesson-box"><strong>Key principle:</strong> To simplify, factorise the numerator and denominator, then cancel common factors.<br>Never cancel terms that are added or subtracted — only factors!</div>'
        },
        {
            type: 'concept',
            title: 'Simplifying Algebraic Fractions',
            content: '<p>Simplify by factorising then cancelling common factors.</p>' +
                '<p><strong>Example 1:</strong> Simplify \\(\\dfrac{2x^2 + 4x}{6x}\\).</p>' +
                '<p>Factorise numerator: \\(2x(x + 2)\\).</p>' +
                '<p>$$\\frac{2x(x+2)}{6x} = \\frac{x+2}{3}$$</p>' +
                '<p><strong>Example 2:</strong> Simplify \\(\\dfrac{x^2-9}{x+3}\\).</p>' +
                '<p>Factorise numerator using difference of squares: \\((x+3)(x-3)\\).</p>' +
                '<p>$$\\frac{(x+3)(x-3)}{x+3} = x-3$$</p>' +
                '<div class="lesson-box"><strong>Warning:</strong> \\(\\dfrac{x^2-4}{x-2}\\) simplifies to \\(x+2\\) (for \\(x \\neq 2\\)).<br>But \\(\\dfrac{x^2-4}{x-4}\\) does NOT simplify further — nothing cancels!</div>'
        },
        {
            type: 'example',
            title: 'Example: Simplifying',
            problemMath: false,
            problem: 'Simplify \\(\\dfrac{x^2 - 4}{x - 2}\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Factorise the numerator. \\(x^2 - 4\\) is a difference of two squares.<br>\\(x^2 - 4 = (x+2)(x-2)\\)' },
                { text: '<strong>Step 2:</strong> Rewrite the fraction.<br>$$\\frac{(x+2)(x-2)}{x-2}$$' },
                { text: '<strong>Step 3:</strong> Cancel the common factor \\((x-2)\\).' },
                { text: '<strong>Answer:</strong> \\(x + 2\\) (valid for \\(x \\neq 2\\))' }
            ]
        },
        {
            type: 'concept',
            title: 'Adding and Subtracting Algebraic Fractions',
            content: '<p>Exactly like numerical fractions — find a <strong>common denominator</strong> first.</p>' +
                '<div class="lesson-box"><strong>Method:</strong>' +
                '<ol>' +
                '<li>Find the lowest common denominator (LCD).</li>' +
                '<li>Rewrite each fraction with the LCD.</li>' +
                '<li>Combine the numerators.</li>' +
                '<li>Simplify if possible.</li>' +
                '</ol></div>' +
                '<p><strong>Example:</strong> \\(\\dfrac{1}{x} + \\dfrac{2}{x+1}\\)</p>' +
                '<p>LCD = \\(x(x+1)\\).</p>' +
                '<p>$$\\frac{(x+1)}{x(x+1)} + \\frac{2x}{x(x+1)} = \\frac{x+1+2x}{x(x+1)} = \\frac{3x+1}{x(x+1)}$$</p>'
        },
        {
            type: 'example',
            title: 'Example: Adding Algebraic Fractions',
            problemMath: false,
            problem: 'Write \\(\\dfrac{3}{x+1} + \\dfrac{2}{x+3}\\) as a single fraction.',
            steps: [
                { text: '<strong>Step 1:</strong> The LCD is \\((x+1)(x+3)\\).' },
                { text: '<strong>Step 2:</strong> Rewrite each fraction:<br>$$\\frac{3(x+3)}{(x+1)(x+3)} + \\frac{2(x+1)}{(x+1)(x+3)}$$' },
                { text: '<strong>Step 3:</strong> Expand the numerators:<br>\\(3(x+3) = 3x + 9\\) and \\(2(x+1) = 2x + 2\\).' },
                { text: '<strong>Step 4:</strong> Combine:<br>$$\\frac{3x+9+2x+2}{(x+1)(x+3)} = \\frac{5x+11}{(x+1)(x+3)}$$' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{5x+11}{(x+1)(x+3)}\\)' }
            ]
        },
        {
            type: 'concept',
            title: 'Subtracting Algebraic Fractions',
            content: '<p>Subtraction works the same way, but take care with <strong>negative signs</strong> when expanding.</p>' +
                '<p><strong>Example:</strong> \\(\\dfrac{5}{x-2} - \\dfrac{3}{x+1}\\)</p>' +
                '<p>LCD = \\((x-2)(x+1)\\).</p>' +
                '<p>$$\\frac{5(x+1)}{(x-2)(x+1)} - \\frac{3(x-2)}{(x-2)(x+1)}$$</p>' +
                '<p>$$= \\frac{5(x+1) - 3(x-2)}{(x-2)(x+1)}$$</p>' +
                '<p>$$= \\frac{5x+5-3x+6}{(x-2)(x+1)} = \\frac{2x+11}{(x-2)(x+1)}$$</p>' +
                '<div class="lesson-box"><strong>Common mistake:</strong> When subtracting, distribute the negative sign:<br>\\(-(3(x-2)) = -3x+6\\), NOT \\(-3x-6\\).</div>'
        },
        {
            type: 'concept',
            title: 'Multiplying and Dividing',
            content: '<p><strong>Multiplying:</strong> Multiply numerators together and denominators together. Simplify first if possible (cross-cancel).</p>' +
                '<p>$$\\frac{x^2-4}{x+1} \\times \\frac{x+1}{x-2} = \\frac{(x+2)(x-2)}{x+1} \\times \\frac{x+1}{x-2} = x+2$$</p>' +
                '<p><strong>Dividing:</strong> Flip the second fraction and multiply (KFC: Keep, Flip, Change).</p>' +
                '<p>$$\\frac{x+1}{3} \\div \\frac{x+1}{6} = \\frac{x+1}{3} \\times \\frac{6}{x+1} = \\frac{6}{3} = 2$$</p>'
        },
        {
            type: 'summary',
            title: 'Algebraic Fractions — Summary',
            html: '<ul>' +
                '<li><strong>Simplify:</strong> Factorise numerator and denominator, then cancel common factors.</li>' +
                '<li><strong>Add/subtract:</strong> Find LCD, convert, combine numerators — watch negative signs!</li>' +
                '<li><strong>Multiply:</strong> Multiply top × top and bottom × bottom; simplify first if possible.</li>' +
                '<li><strong>Divide:</strong> Flip the second fraction then multiply (KFC).</li>' +
                '</ul>'
        }
    ]
};
