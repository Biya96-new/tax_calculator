/**
 * India Tax Calculator Engine (FY 2025-26)
 * Calculates tax based on inputs for both Old and New regimes.
 */

function calculateTax(inputs) {
    // 1. Calculate Gross Salary
    let grossSalary;
    
    if (inputs.annualGross) {
        grossSalary = inputs.annualGross;
    } else {
        let monthlyGross = inputs.takeHomePay;
        if (inputs.hasPf) monthlyGross += inputs.pfDeduction;
        if (inputs.hasPt) monthlyGross += inputs.professionalTax;
        
        // Add estimated 15% for missing TDS/components to find true gross
        monthlyGross = monthlyGross * 1.15;
        grossSalary = Math.round(monthlyGross * 12);
    }
    
    // Other Income
    const incomeSavings = inputs.incomeSavings || 0;
    const incomeFd = inputs.incomeFd || 0;
    const directOtherIncome = inputs.otherIncome || 0;
    const otherIncome = incomeSavings + incomeFd + directOtherIncome;
    
    // Total Gross Income
    const totalGrossIncome = grossSalary + otherIncome;

    // --- OLD REGIME CALCULATION ---
    
    // 1. Calculate HRA Exemption
    let hraExemption = 0;
    const paysRent = inputs.paysRent || (inputs.monthlyRent > 0);
    const hraReceived = inputs.hraReceived || 0;
    
    if (paysRent && hraReceived > 0) {
        // Assume Basic Salary is 50% of Gross Salary
        const basicSalary = grossSalary * 0.50;
        const annualRent = (inputs.monthlyRent || 0) * 12;
        const annualHra = hraReceived * 12;
        
        const rentMinus10PercentBasic = Math.max(0, annualRent - (0.10 * basicSalary));
        const percentOfBasic = inputs.isMetro ? (0.50 * basicSalary) : (0.40 * basicSalary);
        
        hraExemption = Math.min(annualHra, rentMinus10PercentBasic, percentOfBasic);
    }

    // 2. Standard Deductions (Salary)
    const oldStandardDeduction = 50000;
    const professionalTaxAnnual = (inputs.hasPt || inputs.professionalTax > 0) ? (inputs.professionalTax || 200) * 12 : 0;
    
    // 3. Section 24(b) - Home Loan Interest
    // Accept either hlInterest or hlInterestSelf
    const hlInterest = inputs.hlInterest || inputs.hlInterestSelf || 0;
    const homeLoanInterestDeduction = (inputs.hasHomeLoan || hlInterest > 0) ? Math.min(hlInterest, 200000) : 0;

    // 4. Section 80C
    const pfAnnual = (inputs.hasPf || inputs.pfDeduction > 0) ? (inputs.pfDeduction || 1800) * 12 : 0;
    const total80c = (inputs.investPpf || 0) + (inputs.investLic || 0) + (inputs.investElss || 0) + (inputs.investOther80c || 0) + (inputs.hlPrincipal || 0) + pfAnnual;
    const deduction80c = Math.min(total80c, 150000);

    // 5. Section 80CCD(1B) - NPS Self
    const npsSelfAmount = inputs.npsSelfAmount || inputs.investNps || 0;
    const npsSelfDeduction = (inputs.hasNpsSelf || npsSelfAmount > 0) ? Math.min(npsSelfAmount, 50000) : 0;

    // 7. Section 80D - Health Insurance
    const healthSelfAmount = inputs.healthSelfAmount || 0;
    const healthSelfDeduction = (inputs.hasHealthSelf || healthSelfAmount > 0) ? Math.min(healthSelfAmount, 25000) : 0;
    
    const healthParentsAmount = inputs.healthParentsAmount || 0;
    let healthParentsDeduction = 0;
    if (inputs.hasHealthParents || healthParentsAmount > 0) {
        const parentLimit = inputs.parentsSenior ? 50000 : 25000;
        healthParentsDeduction = Math.min(healthParentsAmount, parentLimit);
    }
    const deduction80d = healthSelfDeduction + healthParentsDeduction;

    // 8. Section 80TTA/TTB - Savings Interest
    let savingsInterestDeduction = 0;
    const ageGroup = inputs.ageGroup || 'below60';
    if (ageGroup !== 'below60') {
        // Senior citizens (80TTB) - up to 50k on all interest
        savingsInterestDeduction = Math.min(otherIncome, 50000);
    } else {
        // Normal (80TTA) - up to 10k on savings only
        savingsInterestDeduction = Math.min(incomeSavings, 10000);
    }

    // Calculate Net Taxable Income (Old Regime)
    const oldDeductions = (hraExemption || 0) + oldStandardDeduction + (professionalTaxAnnual || 0) + 
                          (homeLoanInterestDeduction || 0) + (deduction80c || 0) + (npsSelfDeduction || 0) + 
                          (deduction80d || 0) + (savingsInterestDeduction || 0);
                          
    const oldTaxableIncome = Math.max(0, totalGrossIncome - oldDeductions);

    // --- NEW REGIME CALCULATION ---
    
    // New Regime has standard deduction of 75,000 for FY 25-26
    const newStandardDeduction = 75000;
    
    // No HRA, 80C, 80D, etc. 
    // Employer NPS 80CCD(2) is allowed but we didn't add it to gross.
    const newTaxableIncome = Math.max(0, totalGrossIncome - newStandardDeduction);


    // --- TAX CALCULATION LOGIC ---
    
    function calculateTaxForSlabs(income, regime) {
        let tax = 0;
        let remainingIncome = income;
        let taxBeforeRebate = 0;
        let rebate = 0;

        if (regime === 'old') {
            // Adjust basic exemption limit based on age
            let basicExemption = 250000;
            if (inputs.ageGroup === 'superSenior80plus') basicExemption = 500000;
            else if (inputs.ageGroup === 'senior60to79') basicExemption = 300000;

            if (remainingIncome > 1000000) {
                tax += (remainingIncome - 1000000) * 0.30;
                remainingIncome = 1000000;
            }
            if (remainingIncome > 500000) {
                tax += (remainingIncome - 500000) * 0.20;
                remainingIncome = 500000;
            }
            if (remainingIncome > basicExemption) {
                tax += (remainingIncome - basicExemption) * 0.05;
            }
            
            taxBeforeRebate = tax;
            
            // Rebate 87A for Old Regime: Up to 5L taxable income, max 12,500 rebate
            if (income <= 500000) {
                rebate = Math.min(tax, 12500);
                tax = tax - rebate;
            }

        } else if (regime === 'new') {
            // New Regime Slabs FY 25-26
            if (remainingIncome > 2400000) {
                tax += (remainingIncome - 2400000) * 0.30;
                remainingIncome = 2400000;
            }
            if (remainingIncome > 2000000) {
                tax += (remainingIncome - 2000000) * 0.25;
                remainingIncome = 2000000;
            }
            if (remainingIncome > 1600000) {
                tax += (remainingIncome - 1600000) * 0.20;
                remainingIncome = 1600000;
            }
            if (remainingIncome > 1200000) {
                tax += (remainingIncome - 1200000) * 0.15;
                remainingIncome = 1200000;
            }
            if (remainingIncome > 800000) {
                tax += (remainingIncome - 800000) * 0.10;
                remainingIncome = 800000;
            }
            if (remainingIncome > 400000) {
                tax += (remainingIncome - 400000) * 0.05;
            }
            
            taxBeforeRebate = tax;
            
            // Rebate 87A: Up to 12L taxable income is tax-free in New Regime too
            if (income <= 1200000) {
                rebate = tax;
                tax = 0;
            }
        }

        // Add 4% Health & Education Cess
        const cess = Math.round(tax * 0.04);
        const finalTax = tax + cess;
        
        return {
            taxBeforeRebate: taxBeforeRebate,
            rebate: rebate,
            taxAfterRebate: tax,
            cess: cess,
            finalTax: finalTax
        };
    }

    const oldRegimeResult = calculateTaxForSlabs(oldTaxableIncome, 'old');
    const newRegimeResult = calculateTaxForSlabs(newTaxableIncome, 'new');

    // Create detailed breakdown
    const breakdown = [
        { name: 'Standard Deduction', amount: oldStandardDeduction }
    ];
    if (hraExemption > 0) breakdown.push({ name: 'HRA Exemption', amount: hraExemption });
    if (professionalTaxAnnual > 0) breakdown.push({ name: 'Professional Tax', amount: professionalTaxAnnual });
    if (homeLoanInterestDeduction > 0) breakdown.push({ name: 'Home Loan Interest (Sec 24b)', amount: homeLoanInterestDeduction });
    if (deduction80c > 0) breakdown.push({ name: 'Sec 80C Investments', amount: deduction80c });
    if (npsSelfDeduction > 0) breakdown.push({ name: 'NPS (Sec 80CCD(1B))', amount: npsSelfDeduction });
    if (deduction80d > 0) breakdown.push({ name: 'Health Insurance (Sec 80D)', amount: deduction80d });
    if (savingsInterestDeduction > 0) breakdown.push({ name: 'Savings Interest (80TTA/TTB)', amount: savingsInterestDeduction });

    return {
        grossIncome: totalGrossIncome,
        old: {
            taxableIncome: oldTaxableIncome,
            standardDeduction: oldStandardDeduction,
            taxBeforeRebate: oldRegimeResult.taxBeforeRebate,
            rebate: oldRegimeResult.rebate,
            taxAfterRebate: oldRegimeResult.taxAfterRebate,
            cess: oldRegimeResult.cess,
            tax: oldRegimeResult.finalTax,
            takeHomeSalary: totalGrossIncome - oldRegimeResult.finalTax,
            totalDeductions: oldDeductions,
            details: {
                standardDeduction: oldStandardDeduction,
                hra: hraExemption,
                invest80c: deduction80c,
                health80d: deduction80d,
                nps: npsSelfDeduction,
                homeLoan: homeLoanInterestDeduction,
                other: professionalTaxAnnual + savingsInterestDeduction
            }
        },
        new: {
            taxableIncome: newTaxableIncome,
            standardDeduction: newStandardDeduction,
            taxBeforeRebate: newRegimeResult.taxBeforeRebate,
            rebate: newRegimeResult.rebate,
            taxAfterRebate: newRegimeResult.taxAfterRebate,
            cess: newRegimeResult.cess,
            tax: newRegimeResult.finalTax,
            takeHomeSalary: totalGrossIncome - newRegimeResult.finalTax,
            totalDeductions: newStandardDeduction,
            details: {
                standardDeduction: newStandardDeduction,
                hra: 0,
                invest80c: 0,
                health80d: 0,
                nps: 0,
                homeLoan: 0,
                other: 0
            }
        },
        winner: oldRegimeResult.finalTax < newRegimeResult.finalTax ? 'old' : 'new',
        difference: Math.abs(Math.round(oldRegimeResult.finalTax - newRegimeResult.finalTax))
    };
}

// Make globally available
window.calculateTax = calculateTax;
