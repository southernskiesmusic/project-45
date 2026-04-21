/* ================================================================
   LESSON: Stoichiometry (IB Chemistry)
   ================================================================ */
const LESSON_CHEM_STOICH = {
    id: 'stoichiometry',
    title: 'Stoichiometry',
    subtitle: 'Moles, molar mass, empirical formulas, and limiting reagents',
    folder: 'topic-a',
    screens: [
        {
            type: 'concept',
            title: 'The Mole Concept',
            html: '<p>Chemistry deals with enormous numbers of atoms. The <strong>mole</strong> is the chemist\'s counting unit - a bridge between the atomic and macroscopic worlds.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>1 mole</strong> = \\(6.022 \\times 10^{23}\\) particles (Avogadro\'s number, \\(N_A\\))</p>' +
                '<p>This applies to atoms, molecules, ions - any specified particle.</p>' +
                '</div>' +
                '<p>Just as "1 dozen" = 12 eggs, "1 mole" = \\(6.022 \\times 10^{23}\\) particles. The number is huge because atoms are tiny.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Molar mass</strong> (\\(M\\)) is the mass of one mole of a substance, in g mol\\(^{-1}\\).</p>' +
                '<p>Numerically equal to the relative atomic/molecular mass on the periodic table.</p>' +
                '<p>Example: Carbon (C) has \\(M = 12\\text{ g mol}^{-1}\\); Water (H\\(_2\\)O) has \\(M = 2(1) + 16 = 18\\text{ g mol}^{-1}\\)</p>' +
                '</div>'
        },
        {
            type: 'concept',
            title: 'Moles, Mass and Molar Mass',
            html: '<p>The three quantities - moles, mass, and molar mass - are related by one key equation:</p>' +
                '<div class="lesson-box">' +
                '<p style="text-align:center;font-size:1.2em;">\\(n = \\dfrac{m}{M}\\)</p>' +
                '<p>Where: \\(n\\) = moles (mol), \\(m\\) = mass (g), \\(M\\) = molar mass (g mol\\(^{-1}\\))</p>' +
                '</div>' +
                '<p><strong>Example:</strong> How many moles are in 36 g of water (\\(M_{\\text{H}_2\\text{O}} = 18\\text{ g mol}^{-1}\\))?</p>' +
                '<p>\\(n = \\dfrac{36}{18} = 2\\text{ mol}\\)</p>' +
                '<p><strong>Rearrangements:</strong></p>' +
                '<ul>' +
                '<li>To find mass: \\(m = n \\times M\\)</li>' +
                '<li>To find molar mass: \\(M = \\dfrac{m}{n}\\)</li>' +
                '</ul>'
        },
        {
            type: 'example',
            title: 'Worked Example: Molar Mass Calculation',
            html: '<p>Calculate the molar mass of calcium carbonate, \\(\\text{CaCO}_3\\).</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 1:</strong> Identify each element and count atoms.</p>' +
                '<p>Ca: 1 atom, C: 1 atom, O: 3 atoms</p>' +
                '<p><strong>Step 2:</strong> Look up relative atomic masses.</p>' +
                '<p>Ca = 40, C = 12, O = 16</p>' +
                '<p><strong>Step 3:</strong> Multiply and sum.</p>' +
                '<p>\\(M(\\text{CaCO}_3) = 1(40) + 1(12) + 3(16) = 40 + 12 + 48 = 100\\text{ g mol}^{-1}\\)</p>' +
                '</div>' +
                '<p>Therefore, 100 g of \\(\\text{CaCO}_3\\) contains exactly 1 mole.</p>'
        },
        {
            type: 'concept',
            title: 'Empirical and Molecular Formulas',
            html: '<p>The <strong>empirical formula</strong> shows the simplest whole-number ratio of atoms in a compound. The <strong>molecular formula</strong> shows the actual number of atoms.</p>' +
                '<div class="lesson-box">' +
                '<p>Glucose: molecular formula \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\) → empirical formula \\(\\text{CH}_2\\text{O}\\) (divide by 6)</p>' +
                '</div>' +
                '<p><strong>Finding the empirical formula from percentage composition:</strong></p>' +
                '<ol>' +
                '<li>Assume 100 g of substance → % values become grams</li>' +
                '<li>Convert mass to moles: \\(n = m/M\\)</li>' +
                '<li>Divide all mole values by the smallest</li>' +
                '<li>Round to nearest whole number (multiply if needed to clear fractions)</li>' +
                '</ol>' +
                '<p><strong>Example:</strong> A compound contains 40% C, 6.7% H, 53.3% O by mass.</p>' +
                '<p>\\(n_C = 40/12 = 3.33\\), \\(n_H = 6.7/1 = 6.7\\), \\(n_O = 53.3/16 = 3.33\\)</p>' +
                '<p>Ratio: C:H:O = 1:2:1 → empirical formula \\(\\text{CH}_2\\text{O}\\)</p>'
        },
        {
            type: 'concept',
            title: 'Limiting Reagents and Yield',
            html: '<p>In a chemical reaction, the <strong>limiting reagent</strong> is the reactant that runs out first and determines how much product can be made.</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Method to find the limiting reagent:</strong></p>' +
                '<ol>' +
                '<li>Write and balance the equation</li>' +
                '<li>Convert all given masses to moles</li>' +
                '<li>Divide each by its stoichiometric coefficient</li>' +
                '<li>The reactant with the <em>smallest value</em> is the limiting reagent</li>' +
                '</ol>' +
                '</div>' +
                '<p><strong>Percentage yield</strong> compares actual to theoretical:</p>' +
                '<p style="text-align:center;">\\(\\%\\text{ yield} = \\dfrac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\%\\)</p>'
        },
        {
            type: 'example',
            title: 'Worked Example: Limiting Reagent',
            html: '<p>\\(2\\text{H}_2 + \\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O}\\). If 4 g of \\(\\text{H}_2\\) and 32 g of \\(\\text{O}_2\\) react, which is the limiting reagent?</p>' +
                '<div class="lesson-box">' +
                '<p><strong>Step 1:</strong> Convert to moles.</p>' +
                '<p>\\(n(\\text{H}_2) = 4/2 = 2\\text{ mol}\\), \\(n(\\text{O}_2) = 32/32 = 1\\text{ mol}\\)</p>' +
                '<p><strong>Step 2:</strong> Divide by stoichiometric coefficients.</p>' +
                '<p>\\(\\text{H}_2\\): 2/2 = 1, \\(\\text{O}_2\\): 1/1 = 1</p>' +
                '<p><strong>Equal values</strong> - both are consumed completely (exact stoichiometric quantities).</p>' +
                '<p><strong>Step 3:</strong> Max moles of \\(\\text{H}_2\\text{O}\\) produced = 2 mol → mass = \\(2 \\times 18 = 36\\text{ g}\\)</p>' +
                '</div>' +
                '<p>In this case neither is in excess - a perfectly balanced reaction. More typically one runs out first.</p>'
        },
        {
            type: 'summary',
            title: 'Summary: Stoichiometry',
            html: '<div class="lesson-box">' +
                '<p><strong>Key formulas:</strong></p>' +
                '<ul>' +
                '<li>\\(n = m/M\\) (moles = mass / molar mass)</li>' +
                '<li>Avogadro\'s number: \\(N_A = 6.022 \\times 10^{23}\\text{ mol}^{-1}\\)</li>' +
                '<li>\\(\\%\\text{ yield} = (\\text{actual}/\\text{theoretical}) \\times 100\\%\\)</li>' +
                '</ul>' +
                '</div>' +
                '<p><strong>Empirical formula steps:</strong> % → g (assume 100 g) → mol → divide by smallest → whole-number ratio.</p>' +
                '<p><strong>Limiting reagent:</strong> convert to moles, divide by coefficient, smallest value is limiting.</p>'
        }
    ]
};
