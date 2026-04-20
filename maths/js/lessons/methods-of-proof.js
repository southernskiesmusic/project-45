const LESSON_METHODS_PROOF = {
    id: 'methods-of-proof',
    title: 'Methods of Proof',
    subtitle: 'Direct proof, contrapositive, contradiction and counterexample',
    folder: 'number-algebra',
    screens: [
        {
            type: 'concept',
            title: 'Proof Techniques',
            content: '<p>In mathematics, a <strong>proof</strong> establishes that a statement is always true. Key methods include:</p>' +
                '<div class="lesson-box">' +
                '<strong>Direct proof:</strong> Assume the hypothesis, deduce the conclusion step by step.<br><br>' +
                '<strong>Proof by contrapositive:</strong> Prove \\(\\neg Q \\Rightarrow \\neg P\\) instead of \\(P \\Rightarrow Q\\).<br><br>' +
                '<strong>Proof by contradiction:</strong> Assume the negation of the conclusion; derive a contradiction.' +
                '</div>' +
                '<p><strong>Disproof by counterexample:</strong> One example where a universal statement fails is enough to disprove it.</p>'
        },
        {
            type: 'practice',
            intro: 'Identify the correct step in a direct proof:',
            generate: () => METHODS_PROOF.qDirectProof()
        },
        {
            type: 'practice',
            intro: 'Identify the contrapositive of a conditional statement:',
            generate: () => METHODS_PROOF.qContrapositive()
        },
        {
            type: 'example',
            problem: 'Prove directly that if \\(n\\) is even then \\(n^2\\) is even.',
            steps: [
                { text: '<strong>Assume:</strong> \\(n\\) is even, so \\(n = 2k\\) for some integer \\(k\\).' },
                { text: '<strong>Compute:</strong> \\(n^2 = (2k)^2 = 4k^2 = 2(2k^2)\\).' },
                { text: '<strong>Conclude:</strong> \\(n^2\\) is a multiple of 2, hence even. \\(\\square\\)' }
            ]
        },
        {
            type: 'practice',
            intro: 'Identify the first step in a proof by contradiction:',
            generate: () => METHODS_PROOF.qContradiction()
        },
        {
            type: 'practice',
            intro: 'Find a counterexample to the false universal statement:',
            generate: () => METHODS_PROOF.qCounterexample()
        },
        {
            type: 'concept',
            title: 'Necessary and Sufficient Conditions',
            content: '<p>For statements \\(P\\) and \\(Q\\):</p>' +
                '<div class="lesson-box">' +
                '\\(P \\Rightarrow Q\\): \\(P\\) is <strong>sufficient</strong> for \\(Q\\); \\(Q\\) is <strong>necessary</strong> for \\(P\\)<br><br>' +
                '\\(P \\Leftrightarrow Q\\): \\(P\\) is <strong>necessary and sufficient</strong> for \\(Q\\)' +
                '</div>' +
                '<p><strong>Proof by induction</strong> has two steps:</p>' +
                '<ol><li><strong>Base case:</strong> verify the statement for \\(n = 1\\) (or the first value)</li>' +
                '<li><strong>Inductive step:</strong> assume true for \\(n = k\\), prove for \\(n = k+1\\)</li></ol>'
        },
        {
            type: 'practice',
            intro: 'Identify what the base case in a proof by induction does:',
            generate: () => METHODS_PROOF.qProofByInduction()
        },
        {
            type: 'practice',
            intro: 'Classify the condition as necessary, sufficient, or both:',
            generate: () => METHODS_PROOF.qNecessarySufficient()
        },
        {
            type: 'practice',
            intro: 'Identify when the biconditional holds:',
            generate: () => METHODS_PROOF.qBiconditional()
        },
        {
            type: 'example',
            problem: 'Disprove: "For all integers \\(n \\geq 1\\), \\(n^2 - n + 11\\) is prime."',
            steps: [
                { text: '<strong>Strategy:</strong> Find one value of \\(n\\) where \\(n^2-n+11\\) is not prime.' },
                { text: '<strong>Test \\(n=11\\):</strong> \\(121 - 11 + 11 = 121 = 11^2\\). Not prime.' },
                { text: '<strong>Conclude:</strong> \\(n=11\\) is a counterexample. The statement is false. \\(\\square\\)' }
            ]
        },
        {
            type: 'practice',
            intro: 'Identify which proof method is being used:',
            generate: () => METHODS_PROOF.qProofStructure()
        },
        {
            type: 'summary',
            html: '<ul>' +
                '<li>Direct proof: assume \\(P\\), deduce \\(Q\\) step by step</li>' +
                '<li>Contrapositive: prove \\(\\neg Q \\Rightarrow \\neg P\\) (logically equivalent to \\(P \\Rightarrow Q\\))</li>' +
                '<li>Contradiction: assume \\(\\neg Q\\), derive impossibility</li>' +
                '<li>Counterexample: one failure disproves a universal statement</li>' +
                '<li>Induction: base case + inductive step \\((k \\Rightarrow k+1)\\)</li>' +
                '<li>Sufficient: \\(P \\Rightarrow Q\\); Necessary: \\(Q \\Rightarrow P\\)</li>' +
                '</ul>'
        }
    ]
};
