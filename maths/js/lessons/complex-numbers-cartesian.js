const LESSON_COMPLEX_CART = {
    id: 'complex-numbers-cartesian',
    title: 'Complex Numbers',
    subtitle: 'Cartesian form, operations, modulus and conjugate',
    folder: 'number-algebra',
    screens: [
        {
            type: 'concept',
            title: 'The Complex Number System',
            content: '<p>The <strong>imaginary unit</strong> is defined as \\(i = \\sqrt{-1}\\), so \\(i^2 = -1\\). A <strong>complex number</strong> has the form:</p>' +
                '<div class="lesson-box">' +
                '\\(z = a + bi\\)<br><br>' +
                'where \\(a = \\text{Re}(z)\\) (real part) and \\(b = \\text{Im}(z)\\) (imaginary part)' +
                '</div>' +
                '<p><strong>Powers of i:</strong> \\(i^1=i,\\; i^2=-1,\\; i^3=-i,\\; i^4=1\\) (cycle of 4)</p>' +
                '<p><strong>Operations:</strong></p>' +
                '<ul>' +
                '<li>Add/subtract: combine real and imaginary parts separately</li>' +
                '<li>Multiply: expand using \\(i^2 = -1\\)</li>' +
                '</ul>'
        },
        {
            type: 'practice',
            intro: 'Find the real part of the sum:',
            generate: () => COMPLEX_CART.qAddComplex()
        },
        {
            type: 'practice',
            intro: 'Find the imaginary part of the difference:',
            generate: () => COMPLEX_CART.qSubtractComplex()
        },
        {
            type: 'example',
            problem: 'Multiply \\((2+3i)(1-4i)\\).',
            steps: [
                { text: '<strong>Expand:</strong> \\(2(1) + 2(-4i) + 3i(1) + 3i(-4i)\\).' },
                { text: '\\(= 2 - 8i + 3i - 12i^2\\).' },
                { text: '\\(= 2 - 5i - 12(-1) = 14 - 5i\\).' },
                { text: '<strong>Answer:</strong> \\(14 - 5i\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Find the real part of the product:',
            generate: () => COMPLEX_CART.qRealPart()
        },
        {
            type: 'concept',
            title: 'Modulus and Conjugate',
            content: '<p>The <strong>conjugate</strong> of \\(z = a+bi\\) is \\(z^* = a-bi\\) (negate the imaginary part).</p>' +
                '<div class="lesson-box">' +
                '<strong>Modulus:</strong> \\(|z| = \\sqrt{a^2 + b^2}\\)<br><br>' +
                '<strong>Key property:</strong> \\(z \\cdot z^* = |z|^2 = a^2 + b^2\\)' +
                '</div>' +
                '<p><strong>Division:</strong> Multiply numerator and denominator by the conjugate of the denominator:</p>' +
                '\\[\\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{(c+di)(c-di)} = \\frac{(ac+bd) + (bc-ad)i}{c^2+d^2}\\]'
        },
        {
            type: 'practice',
            intro: 'Find the modulus |z|:',
            generate: () => COMPLEX_CART.qModulus()
        },
        {
            type: 'practice',
            intro: 'Find the conjugate z*:',
            generate: () => COMPLEX_CART.qConjugate()
        },
        {
            type: 'example',
            problem: 'Divide \\(\\dfrac{1+2i}{3-i}\\).',
            steps: [
                { text: '<strong>Multiply by conjugate:</strong> \\(\\dfrac{(1+2i)(3+i)}{(3-i)(3+i)}\\).' },
                { text: '<strong>Numerator:</strong> \\(3+i+6i+2i^2 = 3+7i-2 = 1+7i\\).' },
                { text: '<strong>Denominator:</strong> \\(9+1 = 10\\).' },
                { text: '<strong>Answer:</strong> \\(\\dfrac{1}{10} + \\dfrac{7}{10}i\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Evaluate the power of i:',
            generate: () => COMPLEX_CART.qPowerOfI()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>\\(i = \\sqrt{-1}\\), \\(i^2 = -1\\), cycle: \\(i, -1, -i, 1, i,\\ldots\\)</li>' +
                '<li>\\(z = a+bi\\): Re\\((z) = a\\), Im\\((z) = b\\)</li>' +
                '<li>Add/subtract: combine real and imaginary parts</li>' +
                '<li>Multiply: expand, use \\(i^2=-1\\)</li>' +
                '<li>Conjugate: \\(z^* = a - bi\\)</li>' +
                '<li>Modulus: \\(|z| = \\sqrt{a^2+b^2}\\)</li>' +
                '<li>Divide: multiply by conjugate of denominator</li>' +
                '</ul>'
        }
    ]
};
