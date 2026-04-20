const LESSON_SYS_EQ = {
    id: 'systems-of-equations',
    title: 'Systems of Equations',
    subtitle: 'Simultaneous equations, elimination, substitution and matrices',
    folder: 'number-algebra',
    screens: [
        {
            type: 'concept',
            title: 'Solving 2×2 Linear Systems',
            content: '<p>A <strong>system of linear equations</strong> seeks values of \\(x\\) and \\(y\\) satisfying both equations simultaneously.</p>' +
                '<div class="lesson-box">' +
                '<strong>Substitution:</strong> solve one equation for a variable, substitute into the other.<br><br>' +
                '<strong>Elimination:</strong> multiply equations to match a coefficient, then add/subtract to eliminate one variable.' +
                '</div>' +
                '<p><strong>Example (elimination):</strong> Solve \\(2x+y=7\\) and \\(x-y=2\\).</p>' +
                '<ul><li>Add: \\(3x=9\\), so \\(x=3\\). Then \\(y=7-6=1\\).</li></ul>'
        },
        {
            type: 'practice',
            intro: 'Solve the simultaneous equations — find x:',
            generate: () => SYS_EQ.qSolveSimultaneous()
        },
        {
            type: 'practice',
            intro: 'Solve the simultaneous equations — find y:',
            generate: () => SYS_EQ.qSolveForY()
        },
        {
            type: 'example',
            problem: 'Solve by substitution: \\(y = 2x - 1\\) and \\(3x + y = 14\\).',
            steps: [
                { text: '<strong>Step 1:</strong> Substitute \\(y = 2x-1\\) into the second equation.' },
                { text: '<strong>Step 2:</strong> \\(3x + (2x-1) = 14 \\Rightarrow 5x = 15 \\Rightarrow x = 3\\).' },
                { text: '<strong>Step 3:</strong> \\(y = 2(3)-1 = 5\\).' },
                { text: '<strong>Answer:</strong> \\((x, y) = (3, 5)\\).' }
            ]
        },
        {
            type: 'practice',
            intro: 'Solve by substitution:',
            generate: () => SYS_EQ.qSubstitution()
        },
        {
            type: 'concept',
            title: 'Matrices and Number of Solutions',
            content: '<p>A system \\(A\\mathbf{x} = \\mathbf{b}\\) can be solved using the <strong>inverse matrix</strong>: \\(\\mathbf{x} = A^{-1}\\mathbf{b}\\).</p>' +
                '<div class="lesson-box">' +
                'For \\(A = \\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\):<br>' +
                '\\(\\det(A) = ad - bc\\)<br><br>' +
                'If \\(\\det(A) \\neq 0\\): unique solution<br>' +
                'If \\(\\det(A) = 0\\): no solution or infinitely many' +
                '</div>' +
                '<p><strong>Geometrically:</strong> each equation is a line. Two lines either intersect (unique), are the same (infinite solutions), or are parallel (no solution).</p>'
        },
        {
            type: 'practice',
            intro: 'Find the determinant of the 2×2 matrix:',
            generate: () => SYS_EQ.qDeterminant2x2()
        },
        {
            type: 'practice',
            intro: 'Identify the number of solutions:',
            generate: () => SYS_EQ.qConsistency()
        },
        {
            type: 'practice',
            intro: 'Identify when the system has no solution:',
            generate: () => SYS_EQ.qNoSolution()
        },
        {
            type: 'example',
            problem: 'Solve the 3×3 system: \\(x+y+z=6\\), \\(2x+y=5\\), \\(x-z=1\\).',
            steps: [
                { text: '<strong>From eq 3:</strong> \\(x = z+1\\).' },
                { text: '<strong>Substitute into eq 2:</strong> \\(2(z+1)+y=5 \\Rightarrow y=3-2z\\).' },
                { text: '<strong>Substitute both into eq 1:</strong> \\((z+1)+(3-2z)+z=6 \\Rightarrow 4=6\\)... pick simpler: \\(x=2, y=1, z=3\\) for example. Verify: \\(2+1+3=6\\)✓, \\(4+1=5\\)✓, \\(2-3=-1\\)... use x=2, y=1, z=3 only if consistent. Actual: x+y+z=6, 2x+y=5→y=5-2x, x-z=1→z=x-1. Substitute: x+(5-2x)+(x-1)=6→4=6. This system is inconsistent (no solution).' },
                { text: '<strong>Answer:</strong> No solution (parallel planes). The system is inconsistent.' }
            ]
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Substitution: isolate one variable, substitute into other equation</li>' +
                '<li>Elimination: match a coefficient, add/subtract to eliminate</li>' +
                '<li>\\(\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad-bc\\)</li>' +
                '<li>\\(\\det \\neq 0\\): unique solution; \\(\\det = 0\\): none or infinite</li>' +
                '<li>Geometrically: intersection of lines (2D) or planes (3D)</li>' +
                '</ul>'
        }
    ]
};
