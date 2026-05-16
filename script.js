document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting Tax Calculator Application');
    
    // Check if calculator is loaded
    if (typeof window.calculateTax === 'function') {
        console.log('Calculator function loaded successfully');
    } else {
        console.error('Calculator function not found! This will cause errors.');
    }

    // Application State
    const state = {
        currentStep: 1,
        totalSteps: 10,
        inputs: {
            takeHomePay: null,
            ageGroup: 'below60',
            hasPf: false,
            pfDeduction: 0,
            hasPt: false,
            professionalTax: 0,
            // Phase 4 Inputs
            paysRent: false,
            monthlyRent: 0,
            isMetro: true,
            hraReceived: 0,
            hasHomeLoan: false,
            hlInterest: 0,
            hlPrincipal: 0,
            hasHealthSelf: false,
            healthSelfAmount: 0,
            hasHealthParents: false,
            healthParentsAmount: 0,
            parentsSenior: false,
            investPpf: 0,
            investLic: 0,
            investElss: 0,
            investOther80c: 0,
            hasNpsEmployer: false,
            npsEmployerAmount: 0,
            hasNpsSelf: false,
            npsSelfAmount: 0,
            incomeSavings: 0,
            incomeFd: 0
        }
    };

    // View Elements
    const landingPage = document.getElementById('landing-page');
    const wizardPage = document.getElementById('wizard-page');
    const resultsPage = document.getElementById('results-page');
    const resourcesPage = document.getElementById('resources-page');
    
    // Buttons
    const heroStartBtn = document.getElementById('hero-start-btn');
    const finalStartBtn = document.getElementById('final-start-btn');
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');
    const recalculateBtn = document.getElementById('recalculate-btn');
    const toggleMathBtn = document.getElementById('toggle-math-btn');

    // UI Elements
    const steps = document.querySelectorAll('.wizard-step');
    const progressFill = document.getElementById('progress-fill');
    const currentStepDisplay = document.getElementById('current-step-display');
    const previewGross = document.getElementById('preview-gross');

    // Input Elements
    const takeHomeInput = document.getElementById('take-home-input');

    // Dashboard Elements
    const dashGrossInput = document.getElementById('dash-gross-input');
    const dashOtherInput = document.getElementById('dash-other-input');
    const dashLicInput = document.getElementById('dash-lic-input');
    const dashHlInput = document.getElementById('dash-hl-input');
    const dashEpfInput = document.getElementById('dash-epf-input');
    const dashElssInput = document.getElementById('dash-elss-input');
    const dashNpsInput = document.getElementById('dash-nps-input');
    const dashOther80cInput = document.getElementById('dash-other80c-input');
    const dashRecalculateBtn = document.getElementById('dash-recalculate-btn');
    
    // Dashboard Value Elements
    const heroSavingsAmt = document.getElementById('hero-savings-amt');
    
    // Main Table - New
    const valNewGross = document.getElementById('val-new-gross');
    const valNewTotalDed = document.getElementById('val-new-total-ded');
    const valNewTaxable = document.getElementById('val-new-taxable');
    const valNewTaxBefore = document.getElementById('val-new-tax-before');
    const valNewRebate = document.getElementById('val-new-rebate');
    const valNewTotal = document.getElementById('val-new-total');
    
    // Main Table - Old
    const valOldGross = document.getElementById('val-old-gross');
    const valOldTotalDed = document.getElementById('val-old-total-ded');
    const valOldTaxable = document.getElementById('val-old-taxable');
    const valOldTaxBefore = document.getElementById('val-old-tax-before');
    const valOldRebate = document.getElementById('val-old-rebate');
    const valOldTotal = document.getElementById('val-old-total');
    
    // Detailed Breakdown Elements
    const detNewStd = document.getElementById('det-new-std');
    const detOldStd = document.getElementById('det-old-std');
    const detOldHra = document.getElementById('det-old-hra');
    const detOld80c = document.getElementById('det-old-80c');
    const detOld80d = document.getElementById('det-old-80d');
    const detOldNps = document.getElementById('det-old-nps');
    const detOldHl = document.getElementById('det-old-hl');

    const detNewMonthly = document.getElementById('det-new-monthly');
    const detOldMonthly = document.getElementById('det-old-monthly');
    
    const insightSaveAmt = document.getElementById('insight-save-amt');
    const insightPercent = document.getElementById('insight-percent');
    const saveProgressFill = document.getElementById('save-progress-fill');
    const barNew = document.getElementById('bar-new');
    const barOld = document.getElementById('bar-old');
    const bottomInsightText = document.getElementById('bottom-insight-text');

    // Sidebar Collapsible
    const collapsibleHeader = document.querySelector('.collapsible-header');
    if (collapsibleHeader) {
        collapsibleHeader.addEventListener('click', () => {
            const body = document.querySelector('.collapsible-body');
            const chevron = collapsibleHeader.querySelector('.chevron');
            body.classList.toggle('hidden');
            chevron.style.transform = body.classList.contains('hidden') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }

    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isLightMode = document.body.classList.toggle('light-mode');
            
            // Sync all toggles
            themeToggles.forEach(btn => {
                const sunIcon = btn.querySelector('svg:first-child');
                const moonIcon = btn.querySelector('svg:last-child');
                
                if (isLightMode) {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                } else {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                }
            });
        });
    });
    const ageSelectors = document.querySelectorAll('input[name="age_group"]');
    const hasPfToggle = document.getElementById('has-pf');
    const pfInputGroup = document.getElementById('pf-input-group');
    const pfAmountInput = document.getElementById('pf-amount');
    const hasPtToggle = document.getElementById('has-pt');
    const ptInputGroup = document.getElementById('pt-input-group');
    const ptAmountInput = document.getElementById('pt-amount');

    // Phase 4 Input Elements
    const rentSelectors = document.querySelectorAll('input[name="pays_rent"]');
    const rentDetails = document.getElementById('rent-details');
    const rentAmount = document.getElementById('rent-amount');
    const metroSelectors = document.querySelectorAll('input[name="is_metro"]');
    const hraReceived = document.getElementById('hra-received');
    
    const homeLoanSelectors = document.querySelectorAll('input[name="has_home_loan"]');
    const homeLoanDetails = document.getElementById('home-loan-details');
    const hlInterest = document.getElementById('hl-interest');
    const hlPrincipal = document.getElementById('hl-principal');
    
    const hasHealthSelf = document.getElementById('has-health-self');
    const healthSelfGroup = document.getElementById('health-self-group');
    const healthSelfAmount = document.getElementById('health-self-amount');
    const hasHealthParents = document.getElementById('has-health-parents');
    const healthParentsGroup = document.getElementById('health-parents-group');
    const healthParentsAmount = document.getElementById('health-parents-amount');
    const parentsSenior = document.getElementById('parents-senior');
    
    const investPpf = document.getElementById('invest-ppf');
    const investLic = document.getElementById('invest-lic');
    const investElss = document.getElementById('invest-elss');
    const investOther80c = document.getElementById('invest-other80c');
    const display80cTotal = document.getElementById('display-80c-total');
    
    const hasNpsEmployer = document.getElementById('has-nps-employer');
    const npsEmployerGroup = document.getElementById('nps-employer-group');
    const npsEmployerAmount = document.getElementById('nps-employer-amount');
    const hasNpsSelf = document.getElementById('has-nps-self');
    const npsSelfGroup = document.getElementById('nps-self-group');
    const npsSelfAmount = document.getElementById('nps-self-amount');
    
    const incomeSavings = document.getElementById('income-savings');
    const incomeFd = document.getElementById('income-fd');

    // Number formatter (standardized with Rupee symbol)
    const formatCurrency = (num) => {
        if (num === null || num === undefined) return '₹ --';
        return '₹' + new Intl.NumberFormat('en-IN').format(Math.round(num));
    };

    // View switching logic - simplified for Phase 2
    function showView(viewToShow) {
        console.log('showView called with:', viewToShow?.id);
        
        if (!viewToShow) {
            console.error('No view provided');
            return;
        }
        
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
            console.log('Removed active class from:', view.id);
        });
        
        // Show the requested view
        viewToShow.classList.add('active');
        console.log('Added active class to:', viewToShow.id);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        console.log('Current active views:', document.querySelectorAll('.view.active').length);
        console.log('Active view IDs:', Array.from(document.querySelectorAll('.view.active')).map(v => v.id));
    }

    // Dashboard Home Button - Hard Reset to Clear Form Cache
    const dashHomeBtn = document.getElementById('dash-home-btn');
    if (dashHomeBtn) {
        dashHomeBtn.addEventListener('click', () => {
            // Use window.location.href to bypass browser's form preservation on reload()
            window.location.href = window.location.pathname + '?reset=' + Date.now();
        });
    }

    // Resources Hub Logic
    const navResources = document.getElementById('nav-resources');
    const resHomeBtn = document.getElementById('res-home-btn');
    const resStartBtn = document.getElementById('res-start-btn');

    if (navResources) {
        navResources.addEventListener('click', (e) => {
            e.preventDefault();
            showView(resourcesPage);
        });
    }

    if (resHomeBtn) {
        resHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Total session reset upon returning home as requested
            window.location.href = window.location.pathname + '?reset=' + Date.now();
        });
    }

    if (resStartBtn) {
        resStartBtn.addEventListener('click', () => {
            showView(wizardPage);
        });
    }

    // Final CTA button (already declared at line 56)
    if (finalStartBtn) {
        finalStartBtn.addEventListener('click', () => {
            console.log('Final Start button clicked');
            showView(wizardPage);
        });
    } else {
        console.log('Final Start button not found');
    }

    // Navigation start button (if it exists)
    const navStartBtn = document.getElementById('nav-start-btn');
    if (navStartBtn) {
        navStartBtn.addEventListener('click', () => {
            console.log('Nav Start button clicked');
            showView(wizardPage);
        });
    } else {
        console.log('Nav Start button not found');
    }

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', () => {
            console.log('Hero Start button clicked');
            showView(wizardPage);
        });
    } else {
        console.log('Hero Start button not found');
    }



    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });

    // Input Focus UX: Clear '0' when user starts typing
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('focus', () => {
            if (input.value === '0') {
                input.value = '';
            }
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.value = '0';
            }
        });
    });

    // Wizard Navigation Logic
    function updateWizardUI() {
        steps.forEach(step => {
            if (parseInt(step.dataset.step) === state.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        const progressPercentage = (state.currentStep / state.totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        currentStepDisplay.textContent = state.currentStep;

        if (state.currentStep === 1) {
            prevStepBtn.innerHTML = '&larr; Back to Home';
        } else {
            prevStepBtn.innerHTML = '&larr; Back';
        }

        if (state.currentStep === state.totalSteps) {
            nextStepBtn.innerHTML = 'Calculate Results &rarr;';
        } else {
            nextStepBtn.innerHTML = 'Continue &rarr;';
        }
    }

    function handleNextStep() {
        if (state.currentStep === 1 && (!state.inputs.takeHomePay || state.inputs.takeHomePay <= 0)) {
            const inputField = document.getElementById('take-home-input');
            if (inputField) {
                inputField.closest('.input-group').style.borderColor = 'red';
                setTimeout(() => {
                    inputField.closest('.input-group').style.borderColor = '';
                }, 1500);
            }
            alert("Please enter your monthly take-home pay to continue.");
            return;
        }

        if (state.currentStep < state.totalSteps) {
            state.currentStep++;
            updateWizardUI();
        } else {
            renderResults();
            showView(resultsPage);
        }
    }

    function handlePrevStep() {
        console.log('Previous step clicked, current step:', state.currentStep);
        if (state.currentStep > 1) {
            state.currentStep--;
            updateWizardUI();
        } else {
            console.log('Going back to landing page');
            showView(landingPage);
        }
    }

    // Calculation Logic
    function updateLivePreview() {
        // Sync inputs first
        syncWizardInputs();
        
        if (!state.inputs.takeHomePay || state.inputs.takeHomePay <= 0) {
            previewGross.textContent = '₹ -- / year';
            document.querySelector('.preview-metrics').classList.add('hidden');
            return;
        }

    if (window.calculateTax) {
        const results = window.calculateTax(state.inputs);
        
        previewGross.textContent = `${formatCurrency(results.grossIncome)} / year`;
        
        const metricsContainer = document.querySelector('.preview-metrics');
        metricsContainer.classList.remove('hidden');
        
        const previewNewTax = document.getElementById('preview-new-tax');
        const previewOldTax = document.getElementById('preview-old-tax');
        
        previewNewTax.textContent = formatCurrency(results.new.tax);
        previewOldTax.textContent = formatCurrency(results.old.tax);
        
        // Highlight winner
        previewNewTax.closest('.metric').style.color = '';
        previewOldTax.closest('.metric').style.color = '';
        
        if (results.winner === 'new') {
            previewNewTax.closest('.metric').style.color = 'var(--clr-green)';
        } else if (results.winner === 'old') {
            previewOldTax.closest('.metric').style.color = 'var(--clr-green)';
        }
    } else {
        console.error('Calculator function not loaded');
    }
    }

    // Helper to sync all form values to state before calculation
    function syncWizardInputs() {
        state.inputs.takeHomePay = parseInt(document.getElementById('take-home-input')?.value) || 0;
        state.inputs.hasPf = document.getElementById('has-pf')?.checked || false;
        state.inputs.pfDeduction = parseInt(document.getElementById('pf-amount')?.value) || 0;
        state.inputs.hasPt = document.getElementById('has-pt')?.checked || false;
        state.inputs.professionalTax = parseInt(document.getElementById('pt-amount')?.value) || 0;
        
        // Rent details
        const paysRentYes = document.querySelector('input[name="pays_rent"][value="yes"]')?.checked;
        state.inputs.paysRent = paysRentYes || false;
        state.inputs.monthlyRent = parseInt(document.getElementById('rent-amount')?.value) || 0;
        state.inputs.hraReceived = parseInt(document.getElementById('hra-received')?.value) || 0;
        
        // Home loan
        const hasLoanYes = document.querySelector('input[name="has_home_loan"][value="yes"]')?.checked;
        state.inputs.hasHomeLoan = hasLoanYes || false;
        state.inputs.hlInterest = parseInt(document.getElementById('hl-interest')?.value) || 0;
        
        // Health
        state.inputs.hasHealthSelf = document.getElementById('has-health-self')?.checked || false;
        state.inputs.healthSelfAmount = parseInt(document.getElementById('health-self-amount')?.value) || 0;
        state.inputs.hasHealthParents = document.getElementById('has-health-parents')?.checked || false;
        state.inputs.healthParentsAmount = parseInt(document.getElementById('health-parents-amount')?.value) || 0;
        
        // 80C
        state.inputs.investPpf = parseInt(document.getElementById('invest-ppf')?.value) || 0;
        state.inputs.investLic = parseInt(document.getElementById('invest-lic')?.value) || 0;
        state.inputs.investElss = parseInt(document.getElementById('invest-elss')?.value) || 0;
        
        // NPS
        state.inputs.hasNpsEmployer = document.getElementById('has-nps-employer')?.checked || false;
        state.inputs.npsEmployerAmount = parseInt(document.getElementById('nps-employer-amount')?.value) || 0;
        state.inputs.hasNpsSelf = document.getElementById('has-nps-self')?.checked || false;
        state.inputs.npsSelfAmount = parseInt(document.getElementById('nps-self-amount')?.value) || 0;
        
        // Other Income (Step 9)
        state.inputs.incomeSavings = parseInt(document.getElementById('income-savings')?.value) || 0;
        state.inputs.incomeFd = parseInt(document.getElementById('income-fd')?.value) || 0;
        
        // Age
        const ageGroup = document.querySelector('input[name="age_group"]:checked')?.value || 'below60';
        state.inputs.ageGroup = ageGroup;
        
        return state.inputs;
    }

    // Results Page Rendering
    function renderResults() {
        const inputs = syncWizardInputs();
        const results = window.calculateTax ? window.calculateTax(inputs) : null;
        
        if (!results) {
            // Try with default values if calculation fails
            results = { 
                grossIncome: inputs.takeHomePay ? inputs.takeHomePay * 12 : 600000,
                difference: 0,
                new: { tax: 0, totalDeductions: 75000, taxableIncome: 525000, taxBeforeRebate: 0, rebate: 0 },
                old: { tax: 0, totalDeductions: 150000, taxableIncome: 450000, taxBeforeRebate: 0, rebate: 0 }
            };
        }
        
        // Direct element updates - ensure values are set
        const elNewGross = document.getElementById('val-new-gross');
        const elOldGross = document.getElementById('val-old-gross');
        const elNewDed = document.getElementById('val-new-total-ded');
        const elOldDed = document.getElementById('val-old-total-ded');
        const elNewTaxable = document.getElementById('val-new-taxable');
        const elOldTaxable = document.getElementById('val-old-taxable');
        const elNewTaxBefore = document.getElementById('val-new-tax-before');
        const elOldTaxBefore = document.getElementById('val-old-tax-before');
        const elNewRebate = document.getElementById('val-new-rebate');
        const elOldRebate = document.getElementById('val-old-rebate');
        const elNewTotal = document.getElementById('val-new-total');
        const elOldTotal = document.getElementById('val-old-total');
        
        const fmt = (n) => '₹' + (n || 0).toLocaleString('en-IN');
        
        if (elNewGross) elNewGross.textContent = fmt(results.grossIncome);
        if (elOldGross) elOldGross.textContent = fmt(results.grossIncome);
        if (elNewDed) elNewDed.textContent = fmt(results.new.totalDeductions);
        if (elOldDed) elOldDed.textContent = fmt(results.old.totalDeductions);
        if (elNewTaxable) elNewTaxable.textContent = fmt(results.new.taxableIncome);
        if (elOldTaxable) elOldTaxable.textContent = fmt(results.old.taxableIncome);
        if (elNewTaxBefore) elNewTaxBefore.textContent = fmt(results.new.taxBeforeRebate);
        if (elOldTaxBefore) elOldTaxBefore.textContent = fmt(results.old.taxBeforeRebate);
        if (elNewRebate) elNewRebate.textContent = fmt(results.new.rebate);
        if (elOldRebate) elOldRebate.textContent = fmt(results.old.rebate);
        if (elNewTotal) elNewTotal.textContent = fmt(results.new.tax);
        if (elOldTotal) elOldTotal.textContent = fmt(results.old.tax);
        
        // Populate Dashboard Elements
        if (heroSavingsAmt) {
            heroSavingsAmt.textContent = formatCurrency(results.difference);
            
            // Sync Sidebar Inputs with Results
            if (dashGrossInput) dashGrossInput.value = results.grossIncome;
            if (dashOtherInput) dashOtherInput.value = state.inputs.otherIncome || 0;
            if (dashLicInput) dashLicInput.value = state.inputs.investLic || 0;
            if (dashHlInput) dashHlInput.value = state.inputs.hlInterestSelf || 0;
            if (dashEpfInput) dashEpfInput.value = state.inputs.investEpf || 0;
            if (dashElssInput) dashElssInput.value = state.inputs.investElss || 0;
            if (dashNpsInput) dashNpsInput.value = state.inputs.investNps || 0;
            if (dashOther80cInput) dashOther80cInput.value = state.inputs.investOther80c || 0;

            // Main Table - New
            valNewGross.textContent = formatCurrency(results.grossIncome);
            valNewTotalDed.textContent = formatCurrency(results.new.totalDeductions);
            valNewTaxable.textContent = formatCurrency(results.new.taxableIncome);
            valNewTaxBefore.textContent = formatCurrency(results.new.taxBeforeRebate);
            valNewRebate.textContent = formatCurrency(results.new.rebate);
            valNewTotal.textContent = formatCurrency(results.new.tax);
            
            // Main Table - Old
            valOldGross.textContent = formatCurrency(results.grossIncome);
            valOldTotalDed.textContent = formatCurrency(results.old.totalDeductions);
            valOldTaxable.textContent = formatCurrency(results.old.taxableIncome);
            valOldTaxBefore.textContent = formatCurrency(results.old.taxBeforeRebate);
            valOldRebate.textContent = formatCurrency(results.old.rebate);
            valOldTotal.textContent = formatCurrency(results.old.tax);

            // Detailed Table
            detNewStd.textContent = formatCurrency(results.new.details.standardDeduction);
            detOldStd.textContent = formatCurrency(results.old.details.standardDeduction);
            detOldHra.textContent = formatCurrency(results.old.details.hra);
            detOld80c.textContent = formatCurrency(results.old.details.invest80c);
            detOld80d.textContent = formatCurrency(results.old.details.health80d);
            detOldNps.textContent = formatCurrency(results.old.details.nps);
            detOldHl.textContent = formatCurrency(results.old.details.homeLoan);
            detNewMonthly.textContent = formatCurrency(results.new.takeHomeSalary / 12);
            detOldMonthly.textContent = formatCurrency(results.old.takeHomeSalary / 12);
            
            // Highlight Recommended Regime
            const compGrid = document.getElementById('comp-grid');
            if (results.winner === 'new') {
                compGrid.classList.add('winner-new');
                compGrid.classList.remove('winner-old');
            } else {
                compGrid.classList.add('winner-old');
                compGrid.classList.remove('winner-new');
            }
            
            // Insight Cards
            insightSaveAmt.textContent = formatCurrency(results.difference);
            const percentIncrease = ((results.difference / Math.min(results.new.takeHomeSalary, results.old.takeHomeSalary)) * 100).toFixed(2);
            insightPercent.textContent = `${percentIncrease}%`;
            
            // Progress Ring (Approximate)
            const saveRatio = Math.min(results.difference / 100000, 1);
            const offset = 220 - (220 * saveRatio);
            saveProgressFill.style.strokeDashoffset = offset;
            
            // Improved Bar Chart Scaling
            const valNew = results.new.takeHomeSalary;
            const valOld = results.old.takeHomeSalary;
            const maxVal = Math.max(valNew, valOld);
            const minVal = Math.min(valNew, valOld);
            
            // Auto-adjust scale: if values are high and close, don't start from 0 to show difference
            let yMin = 0;
            if (minVal > maxVal * 0.6) {
                yMin = Math.floor((minVal * 0.9) / 100000) * 100000;
            }
            const yMax = Math.ceil((maxVal * 1.05) / 100000) * 100000;
            const yRange = yMax - yMin;

            const newHeight = ((valNew - yMin) / yRange) * 100;
            const oldHeight = ((valOld - yMin) / yRange) * 100;
            
            barNew.style.height = `${Math.max(newHeight, 5)}%`;
            barOld.style.height = `${Math.max(oldHeight, 5)}%`;
            barNew.querySelector('.bar-val').textContent = `₹${(valNew / 100000).toFixed(2)}L`;
            barOld.querySelector('.bar-val').textContent = `₹${(valOld / 100000).toFixed(2)}L`;

            // Update Y-Axis Labels (Dynamic 5-step)
            const yAxis = document.querySelector('.chart-y-axis');
            if (yAxis) {
                yAxis.innerHTML = ''; // Clear old
                for (let i = 4; i >= 0; i--) {
                    const stepVal = yMin + (yRange * (i / 4));
                    const span = document.createElement('span');
                    span.textContent = `₹${(stepVal / 100000).toFixed(1)}L`;
                    yAxis.appendChild(span);
                }
            }
            
            bottomInsightText.textContent = `Insight: The ${results.winner === 'new' ? 'New' : 'Old'} Regime offers lower tax rates and better efficiency for your income level, saving you ${formatCurrency(results.difference)} annually.`;


        }
    }

    // Dashboard Input Listeners
    const initDashListeners = () => {
        const dashInputs = [
            dashGrossInput, dashOtherInput, dashLicInput, dashHlInput,
            dashEpfInput, dashElssInput, dashNpsInput, dashOther80cInput
        ];
        
        dashInputs.forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    // Sync dashboard inputs back to state
                    const newAnnualGross = parseInt(dashGrossInput.value) || 0;
                    state.inputs.annualGross = newAnnualGross;
                    
                    // Keep takeHomePay in sync for wizard fallback
                    state.inputs.takeHomePay = Math.round(newAnnualGross / 1.15 / 12); 
                    
                    state.inputs.otherIncome = parseInt(dashOtherInput.value) || 0;
                    state.inputs.investLic = parseInt(dashLicInput.value) || 0;
                    state.inputs.hlInterestSelf = parseInt(dashHlInput.value) || 0;
                    state.inputs.investEpf = parseInt(dashEpfInput.value) || 0;
                    state.inputs.investElss = parseInt(dashElssInput.value) || 0;
                    state.inputs.investNps = parseInt(dashNpsInput.value) || 0;
                    state.inputs.investOther80c = parseInt(dashOther80cInput.value) || 0;
                    
                    renderResults();
                });
            }
});
    };
    
    initDashListeners();

    // Event Listeners for Inputs
    if (takeHomeInput) {
        takeHomeInput.addEventListener('input', (e) => {
            state.inputs.takeHomePay = parseInt(e.target.value) || 0;
            updateLivePreview();
        });
    }

    ageSelectors.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                state.inputs.ageGroup = e.target.value;
                // Update active class on cards
                document.querySelectorAll('.selector-card').forEach(card => card.classList.remove('active'));
                e.target.closest('.selector-card').classList.add('active');
            }
        });
    });

    if (hasPfToggle) {
        hasPfToggle.addEventListener('change', (e) => {
            state.inputs.hasPf = e.target.checked;
            pfInputGroup.classList.toggle('active', state.inputs.hasPf);
            updateLivePreview();
        });
    }

    if (pfAmountInput) {
        pfAmountInput.addEventListener('input', (e) => {
            state.inputs.pfDeduction = parseInt(e.target.value) || 0;
            updateLivePreview();
        });
    }

    if (hasPtToggle) {
        hasPtToggle.addEventListener('change', (e) => {
            state.inputs.hasPt = e.target.checked;
            ptInputGroup.classList.toggle('active', state.inputs.hasPt);
            updateLivePreview();
        });
    }

    if (ptAmountInput) {
        ptAmountInput.addEventListener('input', (e) => {
            state.inputs.professionalTax = parseInt(e.target.value) || 0;
            updateLivePreview();
        });
    }

    // Phase 4 Event Listeners
    function updateRadioCards(name) {
        document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
            radio.closest('.selector-card').classList.toggle('active', radio.checked);
        });
    }

    rentSelectors.forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.inputs.paysRent = e.target.value === 'yes';
            updateRadioCards('pays_rent');
            if(rentDetails) rentDetails.style.display = state.inputs.paysRent ? 'block' : 'none';
        });
    });
    
    if(rentAmount) rentAmount.addEventListener('input', e => state.inputs.monthlyRent = parseInt(e.target.value) || 0);
    
    metroSelectors.forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.inputs.isMetro = e.target.value === 'yes';
            updateRadioCards('is_metro');
        });
    });
    
    if(hraReceived) hraReceived.addEventListener('input', e => state.inputs.hraReceived = parseInt(e.target.value) || 0);

    homeLoanSelectors.forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.inputs.hasHomeLoan = e.target.value === 'yes';
            updateRadioCards('has_home_loan');
            if(homeLoanDetails) homeLoanDetails.style.display = state.inputs.hasHomeLoan ? 'block' : 'none';
        });
    });

    if(hlInterest) hlInterest.addEventListener('input', e => state.inputs.hlInterest = parseInt(e.target.value) || 0);
    if(hlPrincipal) hlPrincipal.addEventListener('input', e => {
        state.inputs.hlPrincipal = parseInt(e.target.value) || 0;
        update80cTotal();
    });

    if(hasHealthSelf) hasHealthSelf.addEventListener('change', e => {
        state.inputs.hasHealthSelf = e.target.checked;
        if(healthSelfGroup) healthSelfGroup.classList.toggle('active', e.target.checked);
    });
    if(healthSelfAmount) healthSelfAmount.addEventListener('input', e => state.inputs.healthSelfAmount = parseInt(e.target.value) || 0);
    
    if(hasHealthParents) hasHealthParents.addEventListener('change', e => {
        state.inputs.hasHealthParents = e.target.checked;
        if(healthParentsGroup) healthParentsGroup.classList.toggle('active', e.target.checked);
    });
    if(healthParentsAmount) healthParentsAmount.addEventListener('input', e => state.inputs.healthParentsAmount = parseInt(e.target.value) || 0);
    if(parentsSenior) parentsSenior.addEventListener('change', e => state.inputs.parentsSenior = e.target.checked);

    const update80cTotal = () => {
        const total = state.inputs.investPpf + state.inputs.investLic + state.inputs.investElss + state.inputs.investOther80c + state.inputs.hlPrincipal + (state.inputs.hasPf ? state.inputs.pfDeduction * 12 : 0);
        if(display80cTotal) display80cTotal.textContent = formatCurrency(Math.min(total, 150000));
    };

    [investPpf, investLic, investElss, investOther80c].forEach(input => {
        if(input) input.addEventListener('input', e => {
            const propName = e.target.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            state.inputs[propName] = parseInt(e.target.value) || 0;
            update80cTotal();
        });
    });
    
    if(pfAmountInput) pfAmountInput.addEventListener('input', update80cTotal);
    if(hasPfToggle) hasPfToggle.addEventListener('change', update80cTotal);

    if(hasNpsEmployer) hasNpsEmployer.addEventListener('change', e => {
        state.inputs.hasNpsEmployer = e.target.checked;
        if(npsEmployerGroup) npsEmployerGroup.classList.toggle('active', e.target.checked);
    });
    if(npsEmployerAmount) npsEmployerAmount.addEventListener('input', e => state.inputs.npsEmployerAmount = parseInt(e.target.value) || 0);

    if(hasNpsSelf) hasNpsSelf.addEventListener('change', e => {
        state.inputs.hasNpsSelf = e.target.checked;
        if(npsSelfGroup) npsSelfGroup.classList.toggle('active', e.target.checked);
    });
    if(npsSelfAmount) npsSelfAmount.addEventListener('input', e => state.inputs.npsSelfAmount = parseInt(e.target.value) || 0);

    if(incomeSavings) incomeSavings.addEventListener('input', e => state.inputs.incomeSavings = parseInt(e.target.value) || 0);
    if(incomeFd) incomeFd.addEventListener('input', e => state.inputs.incomeFd = parseInt(e.target.value) || 0);

    // Init UI State
    if (hasPfToggle && hasPfToggle.checked) pfInputGroup.classList.add('active');
    if (hasPtToggle && hasPtToggle.checked) ptInputGroup.classList.add('active');
    if (hasHealthSelf && hasHealthSelf.checked) healthSelfGroup.classList.add('active');
    if (hasHealthParents && hasHealthParents.checked) healthParentsGroup.classList.add('active');
    if (hasNpsEmployer && hasNpsEmployer.checked) npsEmployerGroup.classList.add('active');
    if (hasNpsSelf && hasNpsSelf.checked) npsSelfGroup.classList.add('active');

    // Navigation Listeners - Phase 2 Implementation
    const startCalculator = () => {
        console.log('startCalculator called');
        
        // Reset to first step
        state.currentStep = 1;
        updateWizardUI();
        
        // Switch to wizard view
        console.log('About to switch to wizard view');
        showView(wizardPage);
        
        // Focus on first input after a short delay
        setTimeout(() => {
            if(takeHomeInput) {
                takeHomeInput.focus();
                console.log('Focused on take-home input');
            } else {
                console.log('Take-home input not found');
            }
        }, 100);
    };

    // Check if buttons exist before adding listeners
    console.log('Checking for navigation buttons...');
    
    if (navStartBtn) {
        navStartBtn.addEventListener('click', startCalculator);
        console.log('Nav Start button listener added');
    } else {
        console.log('Nav Start button not found');
    }

    if (heroStartBtn) {
        heroStartBtn.addEventListener('click', startCalculator);
        console.log('Hero Start button listener added');
    } else {
        console.log('Hero Start button not found');
    }

    if (finalStartBtn) {
        finalStartBtn.addEventListener('click', startCalculator);
        console.log('Final Start button listener added');
    } else {
        console.log('Final Start button not found');
    }
    
    console.log('Button setup complete');

    if (prevStepBtn) prevStepBtn.addEventListener('click', handlePrevStep);
    if (nextStepBtn) nextStepBtn.addEventListener('click', handleNextStep);
    
    if (recalculateBtn) {
        recalculateBtn.addEventListener('click', () => {
            state.currentStep = 10;
            updateWizardUI();
            showView(wizardPage);
        });
    }

    if (toggleMathBtn) {
        toggleMathBtn.addEventListener('click', () => {
            const mathDetails = document.getElementById('math-details');
            const mathBreakdownBar = document.querySelector('.math-breakdown-bar');
            
            if (mathDetails.style.display === 'none') {
                mathDetails.style.display = 'block';
                mathBreakdownBar.classList.add('open');
            } else {
                mathDetails.style.display = 'none';
                mathBreakdownBar.classList.remove('open');
            }
        });
    }
    // Modal Logic
    const modals = {
        'how-it-works': document.getElementById('how-it-works-modal'),
        'tax-regimes': document.getElementById('tax-regimes-modal'),
        'about-us': document.getElementById('about-us-modal')
    };
    
    const navLinks = {
        'how-it-works': document.getElementById('nav-how-it-works'),
        'tax-regimes': document.getElementById('nav-tax-regimes'),
        'about-us': document.getElementById('nav-about-us')
    };

    const openModal = (id) => {
        const modal = modals[id];
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeAllModals = () => {
        Object.values(modals).forEach(modal => {
            if (modal) modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    };

    // Bind nav links
    Object.keys(navLinks).forEach(id => {
        const link = navLinks[id];
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(id);
            });
        }
    });

    // Bind close triggers for all modals
    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal');
        const overlay = modal.querySelector('.modal-overlay');
        
        if (closeBtn) closeBtn.addEventListener('click', closeAllModals);
        if (overlay) overlay.addEventListener('click', closeAllModals);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
});

    // Resource Cards Click Handling
    const resourceCards = document.querySelectorAll('.resource-main-card');
    const resourceModals = document.querySelectorAll('.resource-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal-full');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    resourceCards.forEach(card => {
        card.addEventListener('click', () => {
            const resourceType = card.dataset.resource;
            const modal = document.getElementById(`resource-${resourceType}-modal`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeResourceModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            resourceModals.forEach(modal => closeResourceModal(modal));
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            resourceModals.forEach(modal => closeResourceModal(modal));
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            resourceModals.forEach(modal => closeResourceModal(modal));
        }
    });

    // Resource Category Click Handling
    const categoryCards = document.querySelectorAll('.resource-category-card');
    const resourceSections = document.querySelectorAll('.resource-section');
    
    console.log('Found category cards:', categoryCards.length);
    console.log('Found resource sections:', resourceSections.length);

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            console.log('Card clicked:', category);
            
            // Update active card styling
            categoryCards.forEach(c => {
                c.style.background = '#111827';
                c.style.border = '1px solid #1F2937';
            });
            card.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(236,72,153,0.1) 100%)';
            card.style.border = '2px solid #7C3AED';
            
            // Show corresponding section
            resourceSections.forEach(section => {
                const targetId = `section-${category}`;
                console.log('Checking section:', section.id, 'vs target:', targetId, 'match:', section.id === targetId);
                if (section.id === targetId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Scroll to content
            document.querySelector('.resource-content-area').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Global function for inline onclick handlers
function showResourceCategory(category) {
    console.log('showResourceCategory called:', category);
    
    const categoryCards = document.querySelectorAll('.resource-category-card');
    const resourceSections = document.querySelectorAll('.resource-section');
    
    // Update active card styling
    categoryCards.forEach(c => {
        c.style.background = '#111827';
        c.style.border = '1px solid #1F2937';
        c.classList.remove('active');
    });
    
    // Find and style the clicked card
    const clickedCard = document.querySelector(`.resource-category-card[data-category="${category}"]`);
    if (clickedCard) {
        clickedCard.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(236,72,153,0.1) 100%)';
        clickedCard.style.border = '2px solid #7C3AED';
        clickedCard.classList.add('active');
    }
    
    // Show corresponding section
    resourceSections.forEach(section => {
        if (section.id === `section-${category}`) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // Scroll to content
    const contentArea = document.querySelector('.resource-content-area');
    if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth' });
    }
}

    // Save as PDF functionality
    const savePdfBtn = document.getElementById('save-pdf-btn');
    if (savePdfBtn) {
        savePdfBtn.addEventListener('click', () => {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) {
                alert('PDF library not loaded. Please refresh and try again.');
                return;
            }

            const doc = new jsPDF();
            const results = window.calculateTax ? window.calculateTax(state.inputs) : null;
            
            if (!results) {
                alert('Please complete the tax calculation first.');
                return;
            }

            const winner = results.winner === 'new' ? 'New Regime' : 'Old Regime';
            const savings = results.difference;
            
            doc.setFontSize(20);
            doc.setTextColor(124, 58, 237);
            doc.text('Tax Regime Calculator - Results', 105, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text('FY 2025-26 (AY 2026-27)', 105, 28, { align: 'center' });
            
            doc.setDrawColor(31, 41, 55);
            doc.line(20, 35, 190, 35);
            
            doc.setFontSize(16);
            doc.setTextColor(0);
            doc.text('Recommendation', 20, 50);
            
            doc.setFontSize(14);
            doc.setTextColor(34, 197, 94);
            doc.text(`${winner} is recommended for you!`, 20, 60);
            
            if (savings > 0) {
                doc.setFontSize(12);
                doc.setTextColor(0);
                doc.text(`You save Rs. ${formatCurrency(savings)} per year`, 20, 70);
            }
            
            doc.setFontSize(14);
            doc.text('Tax Comparison', 20, 90);
            
            doc.setFontSize(11);
            let y = 100;
            doc.text('New Regime Tax:', 20, y);
            doc.text(`Rs. ${formatCurrency(results.new.totalTax)}`, 100, y);
            
            y += 8;
            doc.text('Old Regime Tax:', 20, y);
            doc.text(`Rs. ${formatCurrency(results.old.totalTax)}`, 100, y);
            
            y += 8;
            doc.text('Standard Deduction:', 20, y);
            doc.text(`Rs. ${formatCurrency(results.new.details.stdDeduction)}`, 100, y);
            
            if (results.new.details.hraExemption > 0) {
                y += 8;
                doc.text('HRA Exemption:', 20, y);
                doc.text(`Rs. ${formatCurrency(results.new.details.hraExemption)}`, 100, y);
            }
            
            if (results.new.details.invest80c > 0) {
                y += 8;
                doc.text('80C Deductions:', 20, y);
                doc.text(`Rs. ${formatCurrency(results.new.details.invest80c)}`, 100, y);
            }
            
            if (results.new.details.deductions80D > 0) {
                y += 8;
                doc.text('80D Deductions:', 20, y);
                doc.text(`Rs. ${formatCurrency(results.new.details.deductions80D)}`, 100, y);
            }
            
            y += 20;
            doc.setDrawColor(31, 41, 55);
            doc.line(20, y, 190, y);
            
            y += 10;
            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text('Note: This calculation is for general guidance only. Please consult a CA for official advice.', 20, y);
            y += 6;
            doc.text('Tax rules used: FY 2025-26', 20, y);
            
            doc.save('tax-regime-results.pdf');
        });
    }
    
    // Expose state and functions globally for inline onclick handlers
    window.wizardState = state;
    window.updateWizardUIFn = updateWizardUI;
    window.updateLivePreview = updateLivePreview;
    window.renderResults = renderResults;
    
    // Global function to show results
    window.calculateAndShowResults = function() {
        const resultsPage = document.getElementById('results-page');
        if (resultsPage) {
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            resultsPage.classList.add('active');
            renderResults();
        }
    };
});

function startFreeCalc() {
    const wizardPage = document.getElementById('wizard-page');
    if (wizardPage) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        wizardPage.classList.add('active');
    }
}

function showHowItWorks(e) {
    e.preventDefault();
    const modal = document.getElementById('how-it-works-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showTaxRegimes(e) {
    e.preventDefault();
    const modal = document.getElementById('tax-regimes-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function showResources(e) {
    e.preventDefault();
    const resourcesPage = document.getElementById('resources-page');
    if (resourcesPage) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        resourcesPage.classList.add('active');
    }
}

function showAboutUs(e) {
    e.preventDefault();
    const modal = document.getElementById('about-us-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Global wizard navigation
function goBack() {
    if (window.wizardState && window.wizardState.currentStep > 1) {
        window.wizardState.currentStep--;
        window.updateWizardUIFn();
    }
}

function goNext() {
    if (window.wizardState && window.wizardState.currentStep < 10) {
        window.wizardState.currentStep++;
        window.updateWizardUIFn();
    } else if (window.wizardState && window.wizardState.currentStep === 10) {
        if (typeof calculateAndShowResults === 'function') {
            calculateAndShowResults();
        }
    }
}
