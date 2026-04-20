const LESSON_COMPLEX_POLAR = {
    id: 'complex-numbers-polar',
    title: 'Complex Numbers — Polar Form',
    subtitle: 'Polar/Euler form, De Moivre\'s theorem and nth roots',
    folder: 'number-algebra',
    screens: [
        {
            type: 'concept',
            title: 'Polar and Euler Form',
            content: '<p>A complex number can be written in <strong>polar form</strong> using its modulus \\(r\\) and argument \\(\\theta\\):</p>' +
                '<div class="lesson-box">' +
                '\\(z = r(\\cos\\theta + i\\sin\\theta) = r\\,\\text{cis}\\,\\theta = re^{i\\theta}\\)<br><br>' +
                'where \\(r = |z| = \\sqrt{a^2+b^2}\\) and \\(\\theta = \\arg(z) = \\arctan(b/a)\\)' +
                '</div>' +
                '<p><strong>Euler\'s formula:</strong> \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\)</p>' +
                '<p><strong>Euler\'s identity:</strong> \\(e^{i\\pi} + 1 = 0\\)</p>' +
                '<p><strong>Converting:</strong> \\(a = r\\cos\\theta\\), \\(b = r\\sin\\theta\\)</p>'
        },
        {
            type: 'practice',
            intro: 'Find the modulus |z|:',
            generate: () => COMPLEX_POLAR.qModulusFromCartesian()
        },
        {
            type: 'practice',
            intro: 'Find the argument in degrees:',
            generate: () => COMPLEX_POLAR.qArgumentDegrees()
        },
        {
            type: 'example',
            problem: 'Convert \\(z = 1 + i\\sqrt{3}\\) to polar form.',
            steps: [
                { text: '<strong>Modulus:</strong> \\(r = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{4} = 2\\).' },
                { text: '<strong>Argument:</strong> \\(\\theta = \\arctan(\\sqrt{3}/1) = 60°\\).' },
                { text: '<strong>Answer:</strong> \\(z = 2\\,\\text{cis}\\,60° = 2e^{i\\pi/3}\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Convert from polar to Cartesian form:',
            generate: () => COMPLEX_POLAR.qPolarToCartesian()
        },
        {
            type: 'concept',
            title: 'De Moivre\'s Theorem',
            content: '<p><strong>De Moivre\'s theorem</strong> gives a simple formula for powers of complex numbers in polar form:</p>' +
                '<div class="lesson-box">' +
                '\\((r\\,\\text{cis}\\,\\theta)^n = r^n\\,\\text{cis}(n\\theta)\\)' +
                '</div>' +
                '<p><strong>Multiplication:</strong> multiply moduli, add arguments:</p>' +
                '\\[z_1 z_2 = r_1 r_2\\,\\text{cis}(\\theta_1 + \\theta_2)\\]' +
                '<p><strong>Division:</strong> divide moduli, subtract arguments:</p>' +
                '\\[\\frac{z_1}{z_2} = \\frac{r_1}{r_2}\\,\\text{cis}(\\theta_1 - \\theta_2)\\]' +
                '<p><strong>nth roots:</strong> \\(z^{1/n}\\) has \\(n\\) distinct roots at angles \\(\\theta/n + 360°k/n\\) for \\(k=0,1,\\ldots,n-1\\).</p>'
        },
        {
            type: 'practice',
            intro: 'Find the modulus of z₁z₂:',
            generate: () => COMPLEX_POLAR.qMultiplyPolar()
        },
        {
            type: 'practice',
            intro: 'Find the argument of z₁z₂:',
            generate: () => COMPLEX_POLAR.qArgumentSum()
        },
        {
            type: 'example',
            problem: 'Find \\((1+i)^8\\) using De Moivre\'s theorem.',
            steps: [
                { text: '<strong>Step 1:</strong> \\(1+i = \\sqrt{2}\\,\\text{cis}\\,45°\\).' },
                { text: '<strong>Step 2:</strong> \\((\\sqrt{2})^8\\,\\text{cis}(8\\times45°) = 16\\,\\text{cis}\\,360° = 16\\,\\text{cis}\\,0°\\).' },
                { text: '<strong>Answer:</strong> \\((1+i)^8 = 16\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Apply De Moivre\'s theorem to find the power:',
            generate: () => COMPLEX_POLAR.qDeMoivrePower()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Polar form: \\(z = r\\,\\text{cis}\\,\\theta\\) where \\(r=|z|\\), \\(\\theta=\\arg(z)\\)</li>' +
                '<li>Euler: \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\)</li>' +
                '<li>Euler\'s identity: \\(e^{i\\pi}+1=0\\)</li>' +
                '<li>De Moivre: \\((r\\,\\text{cis}\\,\\theta)^n = r^n\\,\\text{cis}(n\\theta)\\)</li>' +
                '<li>Multiply: \\(r_1r_2\\,\\text{cis}(\\theta_1+\\theta_2)\\)</li>' +
                '<li>Divide: \\((r_1/r_2)\\,\\text{cis}(\\theta_1-\\theta_2)\\)</li>' +
                '<li>\\(n\\) distinct \\(n\\)th roots, equally spaced by \\(360°/n\\)</li>' +
                '</ul>'
        }
    ]
};
