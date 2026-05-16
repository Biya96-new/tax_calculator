# India Tax Calculator – FY 2025-26
## Product Requirements Document (PRD)
### Version 1.0 | Salaried Individuals | Old Regime vs New Regime Comparison

---

## Table of Contents

1. [Product Vision & Goals](#1-product-vision--goals)
2. [Target Audience](#2-target-audience)
3. [Core Design Principles](#3-core-design-principles)
4. [App Architecture Overview](#4-app-architecture-overview)
5. [Tax Law Reference – FY 2025-26](#5-tax-law-reference--fy-2025-26)
6. [Screen-by-Screen Specification](#6-screen-by-screen-specification)
7. [Wizard Step Specifications](#7-wizard-step-specifications)
8. [Live Preview Panel Specification](#8-live-preview-panel-specification)
9. [Results Page Specification](#9-results-page-specification)
10. [Tax Calculation Engine](#10-tax-calculation-engine)
11. [Input Validation Rules](#11-input-validation-rules)
12. [Personalized Insights Engine](#12-personalized-insights-engine)
13. [FAQ Content Bank](#13-faq-content-bank)
14. [UI Component Library](#14-ui-component-library)
15. [State Management](#15-state-management)
16. [Edge Cases & Special Handling](#16-edge-cases--special-handling)
17. [Accessibility & Mobile Considerations](#17-accessibility--mobile-considerations)
18. [Privacy & Data Handling](#18-privacy--data-handling)
19. [Technical Stack Recommendation](#19-technical-stack-recommendation)
20. [Worked Examples for QA Testing](#20-worked-examples-for-qa-testing)

---

## 1. Product Vision & Goals

### The Problem

Every year, crores of salaried Indians must choose between the Old and New tax regimes before filing their ITR. Most have no idea which saves them more money. Existing calculators are confusing because:

- They ask for CTC or "gross salary" — terms most employees don't know
- They dump 20+ fields on a single page with jargon like "80C deductions"
- They don't explain *why* a regime is better
- They don't connect inputs to outcomes in real time

Most salaried people in India know one number: **what lands in their bank account every month.** This calculator starts there.

### The Solution

A single-purpose, wizard-style web app that:

1. Starts from take-home pay and works backwards to estimate gross income
2. Asks questions in plain everyday language, one at a time
3. Updates a live tax preview panel as each answer is entered
4. Produces a clear, verdict-first result with a side-by-side breakdown
5. Explains *how* each input affected the final number
6. Gives personalized tax-saving suggestions

### Success Criteria

- A 21-year-old in their first job can complete the wizard without looking anything up
- The calculator is 100% accurate for standard salaried income scenarios in FY 2025-26
- Users finish in under 5 minutes
- Zero data leaves the browser

---

## 2. Target Audience

**Primary:** Salaried employees in India, age 22–55, earning ₹5L–₹50L/year

**Persona A – The First-Jobber**
- 22 years old, just started a job at a tech company
- Knows their salary by monthly take-home (e.g., "I get ₹45,000/month")
- Has never filed ITR; HR handles TDS
- Main questions: "Am I paying more tax than I need to?"

**Persona B – The Mid-Career Professional**
- 35 years old, ₹18L CTC, pays rent, has home loan, invests in PPF
- Has always filed old regime but wonders if new regime is better now
- Main questions: "Should I switch this year?"

**Persona C – The Senior Employee**
- 50+ years old, ₹30L salary, maximum 80C, parents' health insurance
- Sticks to old regime every year out of habit
- Main questions: "Am I actually saving money or just investing unnecessarily?"

**Out of scope:**
- Freelancers / self-employed (business income)
- NRIs
- Capital gains income
- Surcharge scenarios (income > ₹50L) — mention surcharge applies but don't calculate
- Partnership firms, HUFs

---

## 3. Core Design Principles

### 3.1 Language Rules

- **Never use:** 80C, 80D, 80CCD, HRA (as section number), TDS, AY, ITR, deductions, exemptions, assessment year, gross salary, CTC
- **Always use:** "investments," "health insurance," "rent," "home loan EMI," "tax," "take-home pay," "savings"
- Every question must pass the "would a first-year employee understand this?" test
- Use second person ("you", "your") throughout
- Use ₹ symbol, not "Rs." or "INR"

### 3.2 Visual Design Direction

**Aesthetic:** Clean, trustworthy, modern — the kind of design that reads "built by people who understand tax and design both." Think fintech-meets-government-clarity. Not corporate dull, not startup flashy. Color palette: deep navy (#0A1628) as primary dark, warm off-white (#F7F4EF) as background, an accent of warm amber/saffron (#E8832A) for CTAs, and a success green (#1A9E6E) for savings highlights.

**Typography:** Use a readable geometric sans for UI (e.g., DM Sans, Sora, or Plus Jakarta Sans), and a heavier display font for headlines (e.g., Fraunces, Playfair Display, or similar serif for credibility). Keep body text at 16px minimum.

**Key visual rules:**
- One question per screen in the wizard — large, centered, confident
- Progress indicator always visible (step dots or bar at top)
- Live preview panel floats on the right on desktop; collapses to a sticky footer card on mobile
- Lots of breathing room. Generous padding. No clutter.
- Avoid tables in wizard steps. Use them only in Results.

### 3.3 Interaction Principles

- Mobile-first responsive design
- Keyboard-navigable (Enter to proceed)
- Auto-focus on input fields when a step loads
- Instant feedback — no "calculate" button needed; preview updates as user types
- Smooth step transitions (slide or fade)
- Each step has a "Back" button; no loss of previous answers
- "Skip" option available for optional inputs with sensible defaults

---

## 4. App Architecture Overview

```
App
├── Landing Page
│   ├── Hero Section
│   ├── How It Works
│   ├── Result Preview Mockup
│   └── CTA → Start Wizard
│
├── Wizard (Steps 1–12)
│   ├── Left Pane: Question + FAQ
│   ├── Right Pane: Live Preview Panel (desktop)
│   └── Progress Bar
│
└── Results Page
    ├── Verdict Banner
    ├── Comparison Table (Old vs New)
    ├── Slab-by-Slab Breakdown (both regimes)
    ├── Personalized Insights
    ├── Tax-Saving Suggestions
    └── CTA: Share / Recalculate
```

---

## 5. Tax Law Reference – FY 2025-26

> This section is the authoritative reference for all tax calculations in this app. AY = 2026-27.

### 5.1 New Tax Regime (Default)

#### 5.1.1 Tax Slabs

| Taxable Income (₹) | Tax Rate |
|---|---|
| 0 – 4,00,000 | Nil |
| 4,00,001 – 8,00,000 | 5% |
| 8,00,001 – 12,00,000 | 10% |
| 12,00,001 – 16,00,000 | 15% |
| 16,00,001 – 20,00,000 | 20% |
| 20,00,001 – 24,00,000 | 25% |
| Above 24,00,000 | 30% |

#### 5.1.2 Standard Deduction (New Regime)
₹75,000 flat for all salaried individuals and pensioners.

#### 5.1.3 Section 87A Rebate (New Regime)
- Applies if: Taxable income (after standard deduction) ≤ ₹12,00,000
- Rebate amount: Equal to tax computed, up to maximum ₹60,000
- Effect: Zero tax payable on taxable income ≤ ₹12,00,000
- For salaried: Gross salary up to ₹12,75,000 → Zero tax (₹12,75,000 − ₹75,000 standard deduction = ₹12,00,000 taxable)
- Marginal relief applies (see Section 5.5)

#### 5.1.4 Deductions Allowed in New Regime

| Deduction | Allowed? | Limit |
|---|---|---|
| Standard Deduction | ✅ Yes | ₹75,000 |
| Employer's NPS (80CCD(2)) | ✅ Yes | Up to 14% of Basic+DA |
| Professional Tax (16(iii)) | ❌ No | — |
| 80C investments | ❌ No | — |
| 80D health insurance | ❌ No | — |
| HRA (10(13A)) | ❌ No | — |
| Home loan interest – self-occupied (24b) | ❌ No | — |
| Home loan interest – let-out property | ✅ Yes (net of rent) | No limit |
| 80CCD(1B) NPS self-contribution | ❌ No | — |
| 80TTA savings interest | ❌ No | — |
| 80TTB senior citizen deposit interest | ❌ No | — |
| LTA | ❌ No | — |

#### 5.1.5 Age Groups (New Regime)
All individuals taxed identically regardless of age. No higher basic exemption for senior or super-senior citizens.

---

### 5.2 Old Tax Regime (Optional, must be explicitly chosen at ITR filing)

#### 5.2.1 Tax Slabs – Below 60 Years

| Taxable Income (₹) | Tax Rate |
|---|---|
| 0 – 2,50,000 | Nil |
| 2,50,001 – 5,00,000 | 5% |
| 5,00,001 – 10,00,000 | 20% |
| Above 10,00,000 | 30% |

#### 5.2.2 Tax Slabs – Senior Citizens (Age 60–79 years)

| Taxable Income (₹) | Tax Rate |
|---|---|
| 0 – 3,00,000 | Nil |
| 3,00,001 – 5,00,000 | 5% |
| 5,00,001 – 10,00,000 | 20% |
| Above 10,00,000 | 30% |

#### 5.2.3 Tax Slabs – Super Senior Citizens (Age 80+ years)

| Taxable Income (₹) | Tax Rate |
|---|---|
| 0 – 5,00,000 | Nil |
| 5,00,001 – 10,00,000 | 20% |
| Above 10,00,000 | 30% |

#### 5.2.4 Standard Deduction (Old Regime)
₹50,000 flat for all salaried individuals.

#### 5.2.5 Section 87A Rebate (Old Regime)
- Applies if: Taxable income ≤ ₹5,00,000
- Rebate amount: Equal to tax computed, up to maximum ₹12,500
- Effect: Zero tax on taxable income ≤ ₹5,00,000

#### 5.2.6 Deductions Allowed in Old Regime

**Section 16 deductions (applied before gross total income):**
- Standard deduction: ₹50,000
- Professional tax (16(iii)): Actual amount paid, max ₹2,500/year

**Section 10 Exemptions:**
- HRA Exemption (10(13A)): Least of three conditions (see 5.3)
- LTA: Actual travel cost; exempt twice in a block of 4 years (not calculated in this app — treat as optional freeform input)

**Chapter VI-A Deductions:**

| Section | Description | Limit |
|---|---|---|
| 80C | EPF employee, PPF, ELSS, LIC premium, ULIP, NSC, 5yr FD, tuition fees, home loan principal repayment | ₹1,50,000 combined |
| 80CCC | LIC pension plan premium | Part of 80C limit |
| 80CCD(1) | Employee's own NPS contribution | Part of 80C limit (max 10% of basic) |
| 80CCD(1B) | Additional NPS self-contribution | Extra ₹50,000 over 80C |
| 80CCD(2) | Employer NPS contribution | Up to 10% of Basic+DA (old regime) |
| 80D | Health insurance – self & family | ₹25,000 (₹50,000 if any member ≥ 60 yrs) |
| 80D | Health insurance – parents | ₹25,000 (₹50,000 if parents ≥ 60 yrs) |
| 24(b) | Home loan interest – self-occupied | ₹2,00,000/year |
| 80TTA | Savings bank interest | ₹10,000 (non-senior citizens) |
| 80TTB | All bank/PO interest | ₹50,000 (senior citizens only, replaces 80TTA) |
| 80E | Education loan interest | Actual; 8 years |

---

### 5.3 HRA Exemption Calculation (Old Regime Only)

Formula: **Exempt HRA = Minimum of (A, B, C)**

- **A** = Actual HRA received from employer (annual)
- **B** = Rent paid annually − 10% of (Basic Salary + DA) annually
- **C** = 50% of (Basic + DA) if metro city; 40% of (Basic + DA) if non-metro city

**Metro cities for FY 2025-26 (4 cities, as per Rule 2A for AY 2026-27 under Act 1961):**
Delhi, Mumbai, Kolkata, Chennai

Note: Bengaluru, Pune, Hyderabad, Ahmedabad get 50% treatment only from AY 2027-28 (under the new Income Tax Act 2025 taking effect April 2026). For this app covering FY 2025-26, use 4-city rule.

**Rules:**
- If rent paid ≤ 10% of (Basic+DA), then B ≤ 0, so exempt HRA = 0
- If HRA is not a salary component, no HRA exemption (guide user to Section 80GG — note 80GG is not in scope for this app, but mention it)
- Exempt HRA cannot be negative; minimum is 0

**Salary structure assumption:** When user says they don't know basic/HRA split, use a common approximation: Basic = 40% of gross, HRA = 20% of gross. Flag this as an estimate. Allow manual override.

---

### 5.4 Cess

Health & Education Cess = 4% on total income tax (after rebate if applicable), in both regimes.

```
Final Tax = (Tax as per slab − Rebate 87A) × 1.04
```

---

### 5.5 Marginal Relief (New Regime)

When taxable income is slightly above ₹12,00,000 (the rebate threshold), the tax payable should not exceed the income above the threshold.

**Rule:** If taxable income > ₹12,00,000 but the normal tax exceeds (taxable income − ₹12,00,000), then:

```
Tax after marginal relief = Taxable Income − ₹12,00,000
```

Apply cess on top of the marginal relief amount.

**Example:**
- Taxable income: ₹12,10,000
- Normal tax on ₹12,10,000 (new regime) = ₹(0 on 4L + 20,000 on 4L + 40,000 on 4L + 1,500 on 10,000) = ₹61,500
- Income above threshold: ₹10,000
- Tax after marginal relief: ₹10,000 (limited to the excess)
- Cess: ₹400
- Final tax: ₹10,400

Marginal relief applies in old regime at the ₹5,00,000 threshold similarly, though it rarely has practical impact given the lower rebate amount (₹12,500 max).

---

### 5.6 Surcharge

**Important:** Surcharge applies when total income exceeds ₹50L. Since this app targets salaried incomes primarily, and surcharge calculation is complex:

- For incomes up to ₹50L: No surcharge (applicable to most users)
- For incomes above ₹50L: Display a disclaimer: "Your income may attract surcharge. This calculator doesn't include surcharge in the estimate. Consult a CA for exact figures."
- Do NOT calculate surcharge

---

### 5.7 Professional Tax

- Deductible from gross salary under Section 16(iii) in **old regime only**
- Not deductible in new regime
- Maximum ₹2,500/year
- Varies by state; treat as user-reported value
- States that levy professional tax include: Maharashtra, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Gujarat, West Bengal, Bihar, Madhya Pradesh, Kerala, Odisha, Assam and others
- States with NO professional tax: Delhi, Haryana, Uttar Pradesh, Rajasthan, Punjab, Uttarakhand, J&K, HP, and others
- In the wizard, ask: "Does your company deduct professional tax? (You'll see it on your payslip)" with a Yes / No / Not Sure option
- If Yes: Ask how much annually (suggest ₹2,400 as common default)

---

### 5.8 EPF/PF (Employee Provident Fund)

- Employee's EPF contribution (typically 12% of basic, capped at ₹1,800/month = ₹21,600/year) counts toward **80C** in old regime
- Employee EPF is **NOT** deductible in new regime
- For gross salary reconstruction: User's take-home is reduced by EPF, professional tax, income tax TDS
- In the wizard, ask: "Does your company deduct PF from your salary?" and approximately how much per month

---

## 6. Screen-by-Screen Specification

### Screen 0: Landing Page

#### Purpose
Convert visitors into users. Establish trust. Explain the value clearly.

#### Sections

**6.0.1 Hero Section**
- Headline (large, bold): "Find out which tax regime saves you more money."
- Subheadline: "A simple 5-minute calculator for salaried Indians. No jargon. No CTC math. Just your take-home pay."
- Primary CTA button: "Start the Calculator →"
- Secondary context: "FY 2025-26 · For Salaried Employees · 100% Private — runs in your browser"
- Small social proof: "Covers both Old and New regimes with the latest Budget 2025 rules"

**6.0.2 "Why This Is Different" Section**
Three cards or columns with icons:
1. "Start with what you actually know" — We ask for take-home pay, not CTC or gross salary.
2. "Answers in plain English" — No tax jargon. Every question explained in one sentence.
3. "See the math in real time" — A live preview updates as you answer each question.

**6.0.3 Result Preview Mockup**
Show a realistic-looking but placeholder result screen (not interactive, just a screenshot or styled div):
- "Verdict: Switch to New Regime. You save ₹28,400."
- Mini comparison table (Old vs New, blurred/placeholder numbers)
- Text: "This is what your result will look like."

**6.0.4 "How It Works" Steps**
Horizontal or vertical step flow:
1. Tell us your monthly take-home → 2. Answer 10 simple questions → 3. See exactly which regime wins

**6.0.5 Footer**
- "All calculations happen in your browser. No data is stored or sent anywhere."
- Disclaimer: "This calculator is for general guidance only. Consult a CA for official advice."
- Link: "Tax rules used (FY 2025-26)"

---

### Screen 1–N: Wizard

See Section 7 for all steps.

Layout (Desktop):
```
+------------------------------------------+------------------+
|  [Progress dots]                          |                  |
|                                           |  LIVE PREVIEW   |
|  [Step content: question + input + FAQ]   |  PANEL          |
|                                           |                  |
|  [Back]              [Continue →]        |  (sticky)        |
+------------------------------------------+------------------+
```

Layout (Mobile):
```
+----------------------------------+
|  [Progress bar: 3/10 steps]      |
|                                  |
|  [Step content]                  |
|                                  |
|  [Back]        [Continue →]     |
+----------------------------------+
|  [Sticky bottom card: live tax   |
|   estimate with mini summary]    |
+----------------------------------+
```

---

### Screen 2: Results Page

See Section 9 for full specification.

---

## 7. Wizard Step Specifications

### Overview of Steps

| Step | Question Theme | Input Type |
|---|---|---|
| 1 | Monthly take-home | Number |
| 2 | Age group | 3-option selector |
| 3 | Salary components (PF, PT) | Multi-toggle |
| 4 | Rent situation | Conditional flow |
| 5 | Home loan | Yes/No + number |
| 6 | Health insurance | Yes/No + number |
| 7 | Investments (80C) | Number with checklist |
| 8 | Additional NPS | Yes/No + number |
| 9 | Other income (FD interest, savings interest) | Number |
| 10 | Summary confirmation | Review screen |

---

### Step 1: Monthly Take-Home Pay

**Screen headline (large):**
"How much money do you receive in your bank account every month?"

**Sub-label below input:**
"This is the amount after all deductions — PF, tax, professional tax. Check your bank statement if unsure."

**Input:** Large number field with ₹ prefix. Monthly default, but offer toggle: "Enter monthly / annually"

**Validations:**
- Min: ₹5,000 (below this, tax is not applicable)
- Max: ₹20,00,000/month (above this, show surcharge disclaimer)
- Only digits, no decimals

**On change:** Immediately estimate gross salary (logic below) and update live preview

**Gross Salary Estimation from Take-Home:**
This is a backward calculation. Use these assumptions:
1. EPF deduction = 12% of basic salary (if PF selected) — resolved in Step 3
2. Professional tax = ₹200/month (standard) — resolved in Step 3
3. TDS already deducted = estimated based on regime (iterative calculation)

Initial estimate on Step 1 (before Step 3 answers):
- Use conservative assumption: No EPF, No PT initially
- `Estimated Gross ≈ Take-home × 1.15` (rough estimate for live preview until more data)
- After Step 3, recalculate precisely

**FAQ for Step 1:**
- **"I don't know what 'take-home' means."** → It's the amount that lands in your bank account. Open your phone's banking app and check the last salary credit.
- **"My salary changes each month (bonus, variable pay)."** → Enter your typical fixed monthly salary. Don't include bonuses right now — you can add them later.
- **"I have two salaries / part-time work."** → Add both and enter the combined total.
- **"My company gives me a salary slip but I'm not sure what to enter."** → On your salary slip, look for "Net Pay" or "Net Salary" — that's the number we want.

---

### Step 2: Age Group

**Screen headline:**
"How old are you?"

**Sub-label:**
"Your age affects the tax slabs under the Old Regime."

**Input type:** Large card selector (3 options)

**Options:**
1. **Under 60** (card label: "I'm below 60")
2. **60–79** (card label: "I'm between 60 and 79 years old" — "Senior Citizen")
3. **80 or above** (card label: "I'm 80 or older" — "Super Senior Citizen")

**Default:** Under 60 (pre-selected)

**FAQ for Step 2:**
- **"Why does my age matter?"** → Under the Old Regime, people above 60 and above 80 get a higher income threshold before tax kicks in. The New Regime treats everyone the same regardless of age.
- **"I'm turning 60 this year. Which should I select?"** → If you turned 60 before March 31, 2026, select "60–79." If you'll turn 60 after March 31, 2026, select "Under 60."

---

### Step 3: Salary Deductions

**Screen headline:**
"Does your company deduct anything from your salary?"

**Sub-label:**
"Look at your payslip. Check which of these are deducted."

**Input type:** Multiple toggle cards (each independently Yes/No)

**Card A: Provident Fund (PF)**
- Label: "PF / Provident Fund"
- Sub-label: "A savings-for-retirement deduction, usually 12% of your basic salary"
- Default: Yes (most companies deduct PF)
- If Yes: Show follow-up input → "How much is deducted for PF per month? (Check your payslip)" — default estimate: `₹1,800`
- Help tip: "Look for 'EPF' or 'PF' on your payslip. Common amounts: ₹1,200, ₹1,800, or a fixed amount."

**Card B: Professional Tax (PT)**
- Label: "Professional Tax"
- Sub-label: "A small state government tax, usually ₹150–₹200/month. Not applicable in Delhi, Haryana, UP."
- Default: Yes
- If Yes: Show follow-up input → "How much professional tax per month?" — default: ₹200
- Help tip: "Look for 'PT' or 'Prof Tax' on your payslip."

**Card C: Any other deductions?** (optional)
- Label: "Other deductions (loans, food coupons, etc.)"
- Sub-label: "Only include if these reduce your take-home pay"
- Default: No
- If Yes: Free input "How much per month?"

**Logic after Step 3:**
```
Monthly gross ≈ take_home 
               + pf_deduction 
               + professional_tax 
               + other_deductions 
               + estimated_tds
```

For `estimated_tds`:
- Use an iterative approximation
- Initial guess: `estimated_tds ≈ 0` (will recalculate after all steps)
- After all inputs collected, run full calculation engine to determine actual TDS
- Recalculate `gross_salary = take_home + pf + pt + other + actual_tds`
- Display note: "We've estimated your gross salary as ₹X. This may vary slightly based on your actual TDS."

**Annual gross salary used in all calculations:**
`gross_salary_annual = monthly_gross × 12`

**FAQ for Step 3:**
- **"My company doesn't deduct PF."** → Some small companies or contract arrangements don't. If you don't see it on your payslip, select No.
- **"I'm in Delhi — does professional tax apply to me?"** → No. Delhi, Haryana, UP, and a few other states don't levy professional tax. You can select No.
- **"What if I don't have a payslip?"** → Enter your best guess. Even approximate numbers help us give a good estimate.

---

### Step 4: Rent

**Screen headline:**
"Do you live in a rented house or apartment?"

**Input type:** Yes / No card selector

**If No:**
- Proceed to Step 5. No HRA exemption applicable.
- Note: Ask "Do you own a home with a home loan?" in Step 5.

**If Yes → Sub-step 4A:**
"How much rent do you pay per month?"
- Number input with ₹ prefix
- Validation: Min ₹500, Max ₹3,00,000

**If Yes → Sub-step 4B:**
"Which city do you live in?"
- Dropdown or large card selector:
  - "Delhi" (Metro)
  - "Mumbai" (Metro)
  - "Kolkata" (Metro)
  - "Chennai" (Metro)
  - "Any other city" (Non-metro)
- Help tip: "This affects how much tax benefit you get on rent under the Old Regime."

**If Yes → Sub-step 4C:**
"Does your salary include an HRA (House Rent Allowance) component?"
- Yes / No / Not sure
- Help tip: "HRA is a part of your salary specifically meant for rent. Look at your offer letter or payslip for an 'HRA' line."
- If Yes → "How much HRA does your company pay you per month?" (₹ input)
- If Not Sure → "Enter your basic salary per month if you know it, OR we'll estimate it." + Number input (optional; if blank, we estimate basic = 40% of gross, HRA = 20% of gross)
- If No → HRA exemption = 0. May still affect gross income. Note: No 80GG in this app scope; mention: "If your salary doesn't include HRA, a different rule (80GG) may apply — you'd need to consult a CA."

**HRA Estimation when user doesn't know:**
```
estimated_basic = gross_salary_monthly × 0.40
estimated_hra   = gross_salary_monthly × 0.20
```

**FAQ for Step 4:**
- **"I pay rent to my parents. Does that count?"** → Yes, it counts if your parents own the house, you're actually paying them (ideally with a bank transfer), and they declare it as income in their tax return. Select Yes and enter the amount.
- **"I live in company-provided accommodation."** → Select No — you don't pay rent yourself in this case.
- **"What's HRA?"** → It's an amount your company pays you specifically to cover rent. It's usually 20–50% of your basic salary. Check your offer letter or payslip for a line that says "HRA."
- **"I'm renting but my company doesn't pay HRA."** → Select No for HRA. You may be eligible for a different deduction under 80GG — this app doesn't cover that specific case, but note it in the results.

---

### Step 5: Home Loan

**Screen headline:**
"Are you repaying a home loan?"

**Input type:** Yes / No card selector

**If No:**
- Proceed to Step 6.

**If Yes → Sub-step 5A:**
"Is this home your main place of living, or is it rented out to someone else?"
- Card A: "I live in it" (Self-occupied)
- Card B: "I've rented it out" (Let-out)
- Card C: "It's under construction / not yet occupied" (Under construction)

**If Yes → Sub-step 5B:**
"How much interest do you pay on this home loan in a year?"
- ₹ input
- Help tip: "You can find this on your bank's loan statement or ask your bank for a 'home loan interest certificate'. The interest portion is separate from the principal/EMI."
- Optional helper: "Not sure? Enter your monthly EMI and we'll estimate." → If EMI entered, estimate interest ≈ 60% of EMI in early years (rough estimate, flag it)

**If Sub-step 5A = Self-occupied:**
- Old Regime: Deduction under Section 24(b) = min(actual_interest, ₹2,00,000/year)
- New Regime: Home loan interest on self-occupied = NOT deductible

**If Sub-step 5A = Let-out:**
- Old Regime: Full interest deductible (no cap); rental income to be added
  - Sub-step: "Do you receive rent from this property? If yes, how much per month?" (₹ input, optional)
  - Add rental income to gross total income
  - Deduct full loan interest from rental income; if net rental income negative, set to 0 for this app (loss from house property calculations are complex — note this limitation)
- New Regime: Interest deductible up to net rental income (cannot create a loss)

**If Sub-step 5A = Under construction:**
- Old Regime: No current year deduction; deferred; note this to user: "Interest on under-construction property is not deductible currently. Once possession is received, you can claim it in 5 equal installments."
- New Regime: Not deductible

**Optional: Home loan principal repayment**
- "How much principal (not interest) do you pay back in a year?" (₹ input)
- This counts toward 80C limit under Old Regime
- Note: "The principal repayment amount we need is shown on your bank's annual loan statement."
- If unknown and old regime selected, suggest: "Enter your EMI and we'll estimate: ~35–40% principal in first few years, more later."

**FAQ for Step 5:**
- **"What's the difference between interest and principal?"** → Your monthly EMI has two parts: one part goes toward interest (the bank's fee for lending), and the other pays down the loan amount. The interest portion helps you save tax — the principal also gives some benefit under Old Regime.
- **"How do I find my annual interest amount?"** → Log into your bank account / home loan portal, or request an "Interest Certificate" from your bank. It's free and they must provide it.
- **"I have two home loans."** → For self-occupied, only one property can be claimed. Add both interests if one is self-occupied and one is let-out, but this gets complex — our calculator handles the most common case of one home loan.
- **"Under-construction property — can I claim anything?"** → Not yet, but once you take possession, you can claim the interest paid during construction in 5 equal yearly installments starting that year.

---

### Step 6: Health Insurance

**Screen headline:**
"Do you or your family have health insurance?"

**Sub-label:**
"If your company provides group health insurance, it usually doesn't count here unless you're also paying a premium."

**Input type:** Yes / No card selector

**If Yes → Sub-step 6A:**
"Who is covered by the insurance you're paying for?" (Multi-select cards)
- Yourself and/or spouse and children
- Your parents
- Both

**If yes to self/family:**
"How much do you pay as premium per year for your family's health insurance?"
- ₹ input
- Help tip: "This is the amount you personally pay. If your employer pays the full premium, enter 0 or skip."
- Deduction limit (old regime): ₹25,000 (if all insured are below 60); ₹50,000 (if any insured member is 60 or above)

**If yes to parents:**
"Are your parents senior citizens (60 years or older)?"
- Yes / No
"How much do you pay as premium for your parents' health insurance per year?"
- ₹ input
- Deduction limit (old regime): ₹25,000 (parents under 60); ₹50,000 (parents 60+)

**Total 80D deduction (old regime):**
```
80D = min(self_family_premium, self_limit) + min(parents_premium, parents_limit)
self_limit = 50000 if any_self_family_member >= 60 else 25000
parents_limit = 50000 if parents_senior else 25000
Max total 80D = 1,00,000 (if both self and parents are senior)
```

**FAQ for Step 6:**
- **"My company gives me health insurance. Does it count?"** → Usually no. Most company-provided (group) insurance is employer-paid. You can only claim a deduction for the premium *you personally pay*. Check your payslip to see if any premium is deducted.
- **"I pay for both my family and my parents. Can I claim both?"** → Yes! Both are deductible separately, up to different limits.
- **"What if my parents don't have insurance?"** → You can still claim up to ₹50,000 for medical expenditure for your senior citizen parents if they have no insurance — but this app uses the standard deduction approach. Enter ₹0 if no premium is paid.

---

### Step 7: Investments & Savings (80C)

**Screen headline:**
"Are you investing money to save tax or for the future?"

**Sub-label:**
"These investments reduce your taxable income under the Old Regime. They're still good investments in the New Regime — you just don't get an extra tax benefit."

**Input approach:**
Instead of asking for a total 80C amount, show recognizable buckets:

**Card-based checklist with individual amount inputs (all optional):**

1. **EPF (Company PF deduction)**
   - Pre-filled from Step 3 if PF was entered
   - Label: "PF deducted by your company (auto-filled)"
   - Editable

2. **PPF (Public Provident Fund)**
   - Label: "PPF — Post Office / Bank savings account?"
   - ₹ per year input

3. **Life Insurance Premium**
   - Label: "LIC / Term Insurance / Endowment Policy premium?"
   - ₹ per year input

4. **ELSS / Mutual Fund (tax saver)**
   - Label: "ELSS Mutual Funds (3-year lock-in tax savers)?"
   - ₹ per year input

5. **5-Year Tax Saver FD**
   - Label: "5-year Fixed Deposit (tax saver FD)?"
   - ₹ per year input

6. **Home Loan Principal**
   - Pre-filled from Step 5 if entered
   - Label: "Home loan principal repayment (auto-filled)"
   - Editable

7. **Tuition Fees**
   - Label: "Children's school/college tuition fees?"
   - ₹ per year input

8. **Other 80C**
   - Label: "Anything else? (NSC, Sukanya, SCSS, etc.)"
   - ₹ per year input

**Running 80C total shown:**
As user enters values, show:
```
Your 80C Total: ₹1,20,000
Maximum benefit: ₹1,50,000
Remaining: ₹30,000
```

**Logic:**
```
total_80C = min(sum_of_all_80C_inputs, 1_50_000)
```

**FAQ for Step 7:**
- **"Does my company PF count here?"** → Yes! The amount your company deducts for PF (the employee's share) is one of the best 80C investments you have.
- **"I'm in the New Regime — should I still fill this?"** → Yes, please fill it anyway. We'll show you what you're leaving on the table, and it helps us calculate if switching to Old Regime makes sense for you.
- **"What's the maximum I can invest under 80C?"** → ₹1,50,000 per year is the cap. Even if you invest ₹3 lakh, only ₹1.5 lakh gets the tax benefit.
- **"I don't invest anything."** → That's fine. Leave all fields blank. We'll suggest how you could save more tax at the end.
- **"What's ELSS?"** → These are mutual funds with a 3-year lock-in period, specifically designed to save tax. Many people invest in them near the end of the financial year.

---

### Step 8: NPS (National Pension System)

**Screen headline:**
"Do you invest in NPS — the National Pension System?"

**Sub-label:**
"NPS is a government retirement savings scheme. It gives extra tax benefits beyond your regular investments."

**Input type:** Three cards

**Card A: My employer contributes to NPS on my behalf**
- Yes / No
- If Yes: "How much does your employer contribute per year?" (₹ input)
- Help tip: "This is over and above your salary. Check your offer letter or payslip for 'Employer NPS' or '80CCD(2)'."
- This is deductible in BOTH old and new regime (different % limits)

**Card B: I personally contribute to NPS**
- Yes / No
- If Yes: "How much do you put in NPS yourself per year?" (₹ input)
- Help tip: "This is money you voluntarily put in NPS through your bank or NSDL. Not the employer's part."
- Old regime: Counts toward 80C limit (via 80CCD(1)), plus extra ₹50,000 via 80CCD(1B)
- New regime: NOT deductible

**NPS Deduction Logic (Old Regime):**
```
employee_nps = user_entered_self_nps
employer_nps = user_entered_employer_nps

// Employee's own NPS: Part of 80C umbrella (up to 10% of basic)
nps_within_80C = min(employee_nps, basic_salary * 0.10)
// Already counted in 80C total; no additional calculation

// Additional NPS deduction (Section 80CCD(1B))
additional_nps = min(employee_nps - nps_within_80C, 50000)
// This is OVER AND ABOVE the 1.5L 80C limit

// Employer NPS (Section 80CCD(2)) — separate, no cap limit in old regime up to 10% of basic
employer_nps_deduction_old = min(employer_nps, basic_salary * 0.10)
```

**NPS Deduction Logic (New Regime):**
```
// Only employer NPS allowed
employer_nps_deduction_new = min(employer_nps, (basic_salary + da) * 0.14)
// Employee self-contribution: NOT deductible
```

**FAQ for Step 8:**
- **"What is NPS?"** → NPS is a government savings scheme for retirement. When you retire, you get a pension from it. It's a long-term investment with extra tax benefits.
- **"How do I know if my employer contributes to NPS?"** → Check your payslip or offer letter for "NPS" or "80CCD(2)." Many government and some private employers contribute.
- **"I contribute to NPS but didn't fill it in 80C earlier. Which one?"** → Enter your personal NPS contribution here only. It works slightly differently — up to ₹50,000 extra, beyond the usual ₹1.5 lakh limit.

---

### Step 9: Other Income

**Screen headline:**
"Do you earn any money from savings or fixed deposits?"

**Sub-label:**
"Things like interest from your savings account or FDs. Even small amounts make a difference."

**Input type:** Toggle + amount per category

**Item A: Savings account interest**
- Label: "Interest from your savings bank account (SBI, HDFC, ICICI, etc.)"
- ₹ per year input
- Help tip: "This shows up in your bank passbook or account statement. Usually just a few hundred to a few thousand rupees."
- Old Regime: Up to ₹10,000 exempt (Section 80TTA); excess taxable
- Senior Citizens: Up to ₹50,000 exempt (Section 80TTB, covers all bank deposits)

**Item B: FD interest**
- Label: "Interest from Fixed Deposits?"
- ₹ per year input
- Note: Fully taxable in both regimes (no deduction)
- Senior Citizen note: Covered under 80TTB along with savings interest (total limit ₹50,000)

**Item C: Any other income?**
- Small optional field
- Label: "Any other income? (rental income, etc.)"
- ₹ per year input
- Note: Rental income from self-occupied property is not applicable. Let-out property rental handled in Step 5.

**FAQ for Step 9:**
- **"My FD interest is just ₹3,000. Does it really matter?"** → Yes, it adds to your taxable income. But under the Old Regime, savings account interest up to ₹10,000 is exempt — so a small amount might not cost you anything.
- **"Does FD interest appear on my ITR automatically?"** → Your bank reports it to the IT department via AIS/Form 26AS. Even if you don't report it, the government may already know. It's best to include it.
- **"I'm a senior citizen — what's different for me?"** → If you're above 60, up to ₹50,000 in total bank interest (savings + FD combined) is tax-free under Section 80TTB. That's one of the big benefits of the Old Regime for senior citizens.

---

### Step 10: Summary / Confirmation Screen

**Screen headline:**
"Here's what we understood. Look good?"

**Layout:**
A clean card/table showing all entered values:

```
Monthly take-home:        ₹ X
Age group:                [selected]
Estimated gross salary:   ₹ X/year (note: estimated)

SALARY DEDUCTIONS
PF deduction:             ₹ X/month
Professional tax:         ₹ X/month

RENT
Monthly rent:             ₹ X
City:                     [Metro/Non-metro]
HRA from employer:        ₹ X/month

HOME LOAN
Annual interest:          ₹ X
Property type:            [Self-occupied/Let-out]

HEALTH INSURANCE
Self + family premium:    ₹ X/year
Parents premium:          ₹ X/year

INVESTMENTS (80C)
PF contribution:          ₹ X
PPF / LIC / Others:       ₹ X
Total 80C:                ₹ X (capped at ₹1,50,000)

NPS
Personal NPS:             ₹ X
Employer NPS:             ₹ X

OTHER INCOME
Savings interest:         ₹ X
FD interest:              ₹ X
```

**Actions:**
- "Edit any answer" — links back to that specific step
- "Calculate My Tax →" (primary CTA, takes to Results)

**Note at bottom:**
"We've estimated your gross salary as ₹X/year based on your take-home and deductions. This is a close estimate — actual gross may vary slightly based on your exact TDS structure."

---

## 8. Live Preview Panel Specification

### 8.1 Purpose

The live preview shows users that something is computing in real time. It builds confidence that the tool is working with their data.

### 8.2 Panel Components (Desktop — Right Side)

```
╔══════════════════════════════╗
║  LIVE TAX ESTIMATE           ║
║  (Updates as you answer)     ║
╠══════════════════════════════╣
║  Your estimated gross:       ║
║  ₹ XX,XX,XXX / year          ║
╠══════════════════════════════╣
║  NEW REGIME TAX              ║
║  ₹ X,XX,XXX                  ║
║  (Monthly: ₹ XX,XXX)         ║
╠══════════════════════════════╣
║  OLD REGIME TAX              ║
║  ₹ X,XX,XXX                  ║
║  (Monthly: ₹ XX,XXX)         ║
╠══════════════════════════════╣
║  POTENTIAL SAVINGS           ║
║  ₹ XX,XXX by choosing        ║
║  [REGIME] ← 🟢               ║
╠══════════════════════════════╣
║  INCOME BREAKDOWN            ║
║  Gross Salary: ₹ X           ║
║  Standard Deduction: ₹ X     ║
║  (Other deductions appear    ║
║   as user fills steps)       ║
╚══════════════════════════════╝
```

### 8.3 Panel States

**Before Step 1 is filled:** Show placeholder state — "Enter your take-home pay to see an estimate"

**After Step 1:** Show initial estimates for both regimes, clearly marked as "estimate"

**After each subsequent step:** Animate the number change. Use a smooth counter animation. Highlight the number that just changed.

**Color coding:**
- Green: The regime that currently shows lower tax
- Amber: The other regime
- Red badge: Only if old regime has higher tax

### 8.4 Mobile Collapsed Version

Sticky card at bottom of screen:
```
╔══════════════════════════════════╗
║ New Regime: ₹42,000 | Old: ₹67,000 
║ 💚 New Regime saves you ₹25,000   ║
╚══════════════════════════════════╝
```
Tap to expand full preview panel (slides up as a bottom sheet).

### 8.5 Data in Preview Panel

After all steps are complete, show the detailed breakdown:

**New Regime:**
- Gross salary (estimated)
- Less: Standard deduction (₹75,000)
- Less: Employer NPS (if applicable)
- = Taxable income
- Tax on taxable income (slab-wise mini table)
- Less: Rebate 87A (if applicable)
- Plus: Cess (4%)
- = **Final Tax**

**Old Regime:**
- Gross salary (estimated)
- Less: Standard deduction (₹50,000)
- Less: Professional tax
- Less: HRA exemption (if applicable)
- Less: Home loan interest (if applicable)
- = Gross Total Income
- Less: 80C deductions
- Less: 80D deductions
- Less: 80CCD(1B) NPS
- Less: 80TTA/80TTB
- Less: Other 80C
- = Net Taxable Income
- Tax on taxable income (slab-wise mini table)
- Less: Rebate 87A (if applicable)
- Plus: Cess (4%)
- = **Final Tax**

---

## 9. Results Page Specification

### 9.1 Structure

#### 9.1.1 Verdict Banner (Top, Full Width)

Large, prominent, colored background:

```
╔══════════════════════════════════════════════╗
║  🎯 Choose the [NEW / OLD] TAX REGIME        ║
║     You'll save ₹XX,XXX this year            ║
╚══════════════════════════════════════════════╝
```

- Green background if there's a clear winner
- If difference < ₹1,000: Show "Both regimes are almost identical — pick New Regime for simplicity."
- If new regime wins: "Switch to New Regime. You save ₹X."
- If old regime wins: "Stick with Old Regime. You save ₹X."

Sub-text: "Based on your inputs for FY 2025-26 (April 2025 – March 2026)"

#### 9.1.2 Side-by-Side Comparison Table

| | **New Regime** | **Old Regime** |
|---|---|---|
| Gross Salary | ₹X | ₹X |
| Standard Deduction | ₹75,000 | ₹50,000 |
| Professional Tax | — | ₹X |
| HRA Exemption | — | ₹X |
| Home Loan Interest | — | ₹X (self-occupied only) |
| **Gross Total Income** | **₹X** | **₹X** |
| 80C Investments | — | ₹X |
| 80D Health Insurance | — | ₹X |
| NPS Self (80CCD(1B)) | — | ₹X |
| Employer NPS | ₹X | ₹X |
| Savings Interest (80TTA/B) | — | ₹X |
| **Taxable Income** | **₹X** | **₹X** |
| Tax (as per slabs) | ₹X | ₹X |
| Less: Rebate 87A | −₹X | −₹X |
| Plus: Cess (4%) | ₹X | ₹X |
| **Total Tax Payable** | **₹X** | **₹X** |
| Per Month (approx) | ₹X | ₹X |

Rows with no difference can be collapsed. Highlight the winning regime column in green.

#### 9.1.3 Slab-by-Slab Tax Breakdown

Two expandable sections (one per regime):

**"How is New Regime tax calculated?"**

Table:
| Income Range | Tax Rate | Income in This Slab | Tax in This Slab |
|---|---|---|---|
| ₹0 – ₹4,00,000 | 0% | ₹4,00,000 | ₹0 |
| ₹4,00,001 – ₹8,00,000 | 5% | ₹4,00,000 | ₹20,000 |
| ... | | | |
| **Total** | | | **₹X** |

Show all slabs up to the user's taxable income. Gray out slabs above their income.

Same for Old Regime.

#### 9.1.4 Personalized Insights Section

Headline: "What made the difference for you"

Show 3–5 bullet points explaining which factors pushed the result one way:

Examples:
- "Your HRA exemption of ₹X reduced your taxable income significantly — that's why Old Regime is competitive for you."
- "With ₹1.5 lakh in 80C investments + home loan interest, you're already maximizing most Old Regime benefits."
- "Your income of ₹X falls right in the sweet spot of the New Regime's rebate — that's why it wins for you."

See Section 12 for full logic of generating these insights.

#### 9.1.5 Tax-Saving Suggestions

Headline: "Ways to pay less tax"

Show relevant suggestions only (conditional on user's situation):

1. **If 80C < ₹1,50,000 and old regime is being considered:**
   → "You're only using ₹X of your ₹1,50,000 80C limit. Investing ₹X more (in PPF, ELSS, or LIC) could save you up to ₹X in tax."

2. **If NPS not used:**
   → "Investing ₹50,000/year in NPS gives you an extra deduction (Section 80CCD(1B)) that sits on top of your 80C limit. This alone could save you ₹X in Old Regime."

3. **If old regime barely loses:**
   → "You're only ₹X away from the Old Regime becoming better. Ask your company to add a ₹Y/month NPS employer contribution."

4. **If income is close to ₹12.75L (new regime zero-tax threshold):**
   → "You're just ₹X over the zero-tax limit. If your variable pay can be reduced or deferred, you could pay ₹0 tax under New Regime."

5. **If no health insurance:**
   → "If you buy health insurance (₹15,000–₹25,000/year), that's a tax saving of ₹X under Old Regime — and good financial protection."

6. **Senior citizen insight:**
   → "As a senior citizen, your higher basic exemption (₹3,00,000 vs ₹2,50,000) and 80TTB interest deduction (₹50,000) significantly favor the Old Regime if you have FD income."

#### 9.1.6 Important Disclaimers

- "This estimate is based on the information you provided. Actual tax depends on your exact salary structure and ITR."
- "This calculator covers standard salaried income only. If you have business income, capital gains, or earn abroad, consult a CA."
- "If your income exceeds ₹50 lakh, surcharge applies — this calculator does not include surcharge."
- "For official tax computation, use the Income Tax Department's portal at incometax.gov.in"

#### 9.1.7 Action Buttons

- "Recalculate with Different Numbers" → Resets wizard
- "Share Result" → Copy/share summary text
- "Print" → Clean printable view

---

## 10. Tax Calculation Engine

### 10.1 Data Model (Input Object)

```typescript
interface TaxInputs {
  // Step 1
  takeHomePay: number; // monthly
  
  // Step 2
  ageGroup: 'below60' | 'senior60to79' | 'superSenior80plus';
  
  // Step 3
  pfDeduction: number; // monthly
  professionalTax: number; // monthly
  otherDeductions: number; // monthly
  
  // Derived
  grossSalaryMonthly: number; // calculated
  grossSalaryAnnual: number;  // calculated
  basicSalaryMonthly: number; // calculated or user-provided
  daMonthly: number;          // assumed 0 for private sector
  
  // Step 4: Rent
  paysRent: boolean;
  monthlyRent: number;
  isMetroCity: boolean;
  hraReceived: number;     // monthly (from employer)
  basicFromUser?: number;  // optional manual entry
  
  // Step 5: Home Loan
  hasHomeLoan: boolean;
  homeLoanInterestAnnual: number;
  homeLoanPrincipalAnnual: number;
  propertyType: 'self-occupied' | 'let-out' | 'under-construction' | null;
  rentalIncomeAnnual: number; // if let-out
  
  // Step 6: Health Insurance
  selfFamilyPremium: number; // annual
  parentsPremium: number;    // annual
  anyFamilyMemberSenior: boolean;
  parentsAreSenior: boolean;
  
  // Step 7: 80C
  epfEmployee: number;        // annual
  ppf: number;
  lic: number;
  elss: number;
  taxSaverFD: number;
  homeLoanPrincipal80C: number; // same as above if applicable
  tuitionFees: number;
  other80C: number;
  
  // Step 8: NPS
  selfNPS: number;      // annual, own contribution
  employerNPS: number;  // annual, employer contribution
  
  // Step 9: Other Income
  savingsInterest: number; // annual
  fdInterest: number;      // annual
  otherIncome: number;     // annual
}
```

### 10.2 Calculation Engine (New Regime)

```typescript
function calculateNewRegime(inputs: TaxInputs): TaxResult {
  // STEP A: Gross Total Income
  const grossSalary = inputs.grossSalaryAnnual;
  const otherIncome = inputs.savingsInterest + inputs.fdInterest + inputs.otherIncome;
  const grossTotalIncome = grossSalary + otherIncome;

  // STEP B: Standard Deduction
  const standardDeduction = 75000;

  // STEP C: Employer NPS (80CCD(2)) — allowed in new regime
  const basicPlusDA = inputs.basicSalaryMonthly * 12 + inputs.daMonthly * 12;
  const maxEmployerNPS = basicPlusDA * 0.14;
  const employerNPSDeduction = Math.min(inputs.employerNPS, maxEmployerNPS);

  // STEP D: Let-out home loan interest (allowed in new regime)
  let letOutInterestDeduction = 0;
  if (inputs.propertyType === 'let-out') {
    const netRentalIncome = inputs.rentalIncomeAnnual - inputs.homeLoanInterestAnnual;
    // In new regime, house property loss cannot be set off against salary
    // Deduction limited to positive net rental income
    letOutInterestDeduction = Math.max(0, -netRentalIncome); // handles if interest > rental income
    // Simplified: treat as 0 for now; add rental income separately
  }

  // STEP E: Taxable Income
  const taxableIncome = Math.max(0, 
    grossTotalIncome 
    - standardDeduction 
    - employerNPSDeduction
  );
  // Note: Let-out property net income complexities handled separately

  // STEP F: Tax on taxable income (new regime slabs)
  const taxBeforeRebate = computeNewRegimeTax(taxableIncome);

  // STEP G: Rebate 87A
  let rebate87A = 0;
  if (taxableIncome <= 1200000) {
    rebate87A = Math.min(taxBeforeRebate, 60000);
  }

  // STEP H: Marginal Relief (if taxableIncome > 12,00,000 but tax > income - 12,00,000)
  let taxAfterRebate = taxBeforeRebate - rebate87A;
  if (taxableIncome > 1200000) {
    const incomeAboveThreshold = taxableIncome - 1200000;
    if (taxAfterRebate > incomeAboveThreshold) {
      taxAfterRebate = incomeAboveThreshold;
    }
  }

  // STEP I: Health & Education Cess (4%)
  const cess = taxAfterRebate * 0.04;
  const finalTax = taxAfterRebate + cess;

  return {
    regime: 'new',
    grossSalary,
    standardDeduction,
    employerNPSDeduction,
    taxableIncome,
    taxBeforeRebate,
    rebate87A,
    taxAfterRebate,
    cess,
    finalTax,
    monthlyTax: finalTax / 12,
    slabBreakdown: getNewRegimeSlabBreakdown(taxableIncome),
    // ... other breakdown fields
  };
}

function computeNewRegimeTax(income: number): number {
  if (income <= 400000) return 0;
  
  let tax = 0;
  if (income > 400000) tax += Math.min(income - 400000, 400000) * 0.05;
  if (income > 800000) tax += Math.min(income - 800000, 400000) * 0.10;
  if (income > 1200000) tax += Math.min(income - 1200000, 400000) * 0.15;
  if (income > 1600000) tax += Math.min(income - 1600000, 400000) * 0.20;
  if (income > 2000000) tax += Math.min(income - 2000000, 400000) * 0.25;
  if (income > 2400000) tax += (income - 2400000) * 0.30;
  
  return tax;
}
```

### 10.3 Calculation Engine (Old Regime)

```typescript
function calculateOldRegime(inputs: TaxInputs): TaxResult {
  // STEP A: Gross Salary
  const grossSalary = inputs.grossSalaryAnnual;

  // STEP B: Section 16 deductions (from salary income)
  const standardDeduction = 50000;
  const professionalTaxAnnual = inputs.professionalTax * 12;

  // STEP C: HRA Exemption
  const hraExemption = calculateHRAExemption(inputs);

  // STEP D: Net Salary Income
  const netSalaryIncome = grossSalary - standardDeduction - professionalTaxAnnual - hraExemption;

  // STEP E: House Property Income
  let housePropertyIncome = 0;
  let homeLoanInterestDeduction = 0;
  
  if (inputs.propertyType === 'self-occupied' && inputs.hasHomeLoan) {
    homeLoanInterestDeduction = Math.min(inputs.homeLoanInterestAnnual, 200000);
    housePropertyIncome = -homeLoanInterestDeduction; // Loss from self-occupied property
  } else if (inputs.propertyType === 'let-out' && inputs.hasHomeLoan) {
    const annualValue = inputs.rentalIncomeAnnual;
    const municipalTax = 0; // Assuming user pays none / not asked
    const netAnnualValue = annualValue - municipalTax;
    const standardDeductionHouseProperty = netAnnualValue * 0.30;
    const interestDeduction = inputs.homeLoanInterestAnnual; // No cap for let-out
    housePropertyIncome = netAnnualValue - standardDeductionHouseProperty - interestDeduction;
    // If negative: house property loss (can be set off against salary up to ₹2L, carry fwd rest)
    // Simplified: cap loss set-off at ₹2L
    if (housePropertyIncome < 0) {
      housePropertyIncome = Math.max(housePropertyIncome, -200000);
    }
  }

  // STEP F: Other Income
  const otherIncome = inputs.savingsInterest + inputs.fdInterest + inputs.otherIncome;
  
  // STEP G: Gross Total Income
  const grossTotalIncome = netSalaryIncome + housePropertyIncome + otherIncome;

  // STEP H: Chapter VI-A Deductions
  
  // 80C (including EPF, PPF, LIC, ELSS, FD, principal repayment, tuition, other)
  const total80CRaw = inputs.epfEmployee + inputs.ppf + inputs.lic + inputs.elss 
                    + inputs.taxSaverFD + inputs.homeLoanPrincipal80C 
                    + inputs.tuitionFees + inputs.other80C;
  const deduction80C = Math.min(total80CRaw, 150000);

  // 80CCD(1B): Additional NPS self-contribution (over and above 80C)
  // Employee's own NPS contribution
  const npsWithin80C = Math.min(inputs.selfNPS, inputs.basicSalaryMonthly * 12 * 0.10);
  // Additional NPS 80CCD(1B)
  const additional80CCD1B = Math.min(inputs.selfNPS - npsWithin80C, 50000);
  // Note: If selfNPS is fully within 80C, additional80CCD1B = 0

  // 80CCD(2): Employer NPS
  const basicPlusDA = inputs.basicSalaryMonthly * 12;
  const employerNPSDeduction = Math.min(inputs.employerNPS, basicPlusDA * 0.10);

  // 80D: Health Insurance
  const selfLimit = inputs.anyFamilyMemberSenior ? 50000 : 25000;
  const parentsLimit = inputs.parentsAreSenior ? 50000 : 25000;
  const deduction80D = Math.min(inputs.selfFamilyPremium, selfLimit) 
                     + Math.min(inputs.parentsPremium, parentsLimit);

  // 80TTA / 80TTB
  let savingsInterestDeduction = 0;
  if (inputs.ageGroup === 'below60' || inputs.ageGroup === 'senior60to79' && false) {
    // For non-seniors: 80TTA (savings account interest only, not FD)
  }
  if (inputs.ageGroup === 'below60') {
    savingsInterestDeduction = Math.min(inputs.savingsInterest, 10000); // 80TTA
  } else {
    // Senior / Super Senior: 80TTB (all bank deposits, savings + FD)
    savingsInterestDeduction = Math.min(inputs.savingsInterest + inputs.fdInterest, 50000); // 80TTB
  }

  const totalDeductionsChVI = deduction80C 
                             + additional80CCD1B 
                             + employerNPSDeduction 
                             + deduction80D 
                             + savingsInterestDeduction;

  // STEP I: Net Taxable Income
  const taxableIncome = Math.max(0, grossTotalIncome - totalDeductionsChVI);

  // STEP J: Tax on taxable income (old regime slabs — age-dependent)
  const taxBeforeRebate = computeOldRegimeTax(taxableIncome, inputs.ageGroup);

  // STEP K: Rebate 87A
  let rebate87A = 0;
  if (taxableIncome <= 500000) {
    rebate87A = Math.min(taxBeforeRebate, 12500);
  }

  const taxAfterRebate = taxBeforeRebate - rebate87A;

  // STEP L: Health & Education Cess (4%)
  const cess = taxAfterRebate * 0.04;
  const finalTax = taxAfterRebate + cess;

  return {
    regime: 'old',
    grossSalary,
    standardDeduction,
    professionalTaxAnnual,
    hraExemption,
    netSalaryIncome,
    homeLoanInterestDeduction,
    housePropertyIncome,
    grossTotalIncome,
    deduction80C,
    additional80CCD1B,
    employerNPSDeduction,
    deduction80D,
    savingsInterestDeduction,
    taxableIncome,
    taxBeforeRebate,
    rebate87A,
    taxAfterRebate,
    cess,
    finalTax,
    monthlyTax: finalTax / 12,
    slabBreakdown: getOldRegimeSlabBreakdown(taxableIncome, inputs.ageGroup),
  };
}

function computeOldRegimeTax(income: number, ageGroup: string): number {
  let tax = 0;
  
  if (ageGroup === 'superSenior80plus') {
    // Nil up to 5,00,000
    if (income > 500000) tax += Math.min(income - 500000, 500000) * 0.20;
    if (income > 1000000) tax += (income - 1000000) * 0.30;
  } else if (ageGroup === 'senior60to79') {
    // Nil up to 3,00,000
    if (income > 300000) tax += Math.min(income - 300000, 200000) * 0.05;
    if (income > 500000) tax += Math.min(income - 500000, 500000) * 0.20;
    if (income > 1000000) tax += (income - 1000000) * 0.30;
  } else {
    // Below 60 — Nil up to 2,50,000
    if (income > 250000) tax += Math.min(income - 250000, 250000) * 0.05;
    if (income > 500000) tax += Math.min(income - 500000, 500000) * 0.20;
    if (income > 1000000) tax += (income - 1000000) * 0.30;
  }
  
  return tax;
}
```

### 10.4 HRA Exemption Calculation

```typescript
function calculateHRAExemption(inputs: TaxInputs): number {
  if (!inputs.paysRent || !inputs.hraReceived) return 0;
  
  const annualRent = inputs.monthlyRent * 12;
  const annualHRA = inputs.hraReceived * 12;
  const annualBasicPlusDA = inputs.basicSalaryMonthly * 12; // DA assumed 0 for private sector
  
  // Condition A: Actual HRA received
  const conditionA = annualHRA;
  
  // Condition B: Rent paid - 10% of (Basic + DA)
  const conditionB = Math.max(0, annualRent - (annualBasicPlusDA * 0.10));
  
  // Condition C: 50% (metro) or 40% (non-metro) of (Basic + DA)
  const metroPercent = inputs.isMetroCity ? 0.50 : 0.40;
  const conditionC = annualBasicPlusDA * metroPercent;
  
  // Exempt HRA = minimum of all three
  const hraExemption = Math.min(conditionA, conditionB, conditionC);
  
  return Math.max(0, hraExemption);
}
```

### 10.5 Gross Salary Reconstruction (from Take-Home)

```typescript
function estimateGrossSalary(inputs: TaxInputs, taxResult: TaxResult): number {
  // Iterative approach: Start with estimated gross, compute tax, adjust
  
  // Initial estimate
  let grossAnnual = (inputs.takeHomePay 
                     + inputs.pfDeduction 
                     + inputs.professionalTax 
                     + inputs.otherDeductions) * 12;
  
  // Add estimated TDS back (first pass: use tax from initial calculation)
  // The gross + estimated TDS = actual gross
  // TDS ≈ annual tax / 12 per month
  
  // For first wizard load (before full calculation): rough estimate
  // gross ≈ take_home * 12 * 1.12 (rough factor for PF + tax)
  
  // Once all steps filled: Run full calculation with this gross,
  // get estimated tax, then: 
  //   actual_gross = take_home + pf + pt + other + (annual_tax / 12)
  // Run 2–3 iterations until convergence
  
  for (let i = 0; i < 3; i++) {
    const result = calculateNewRegime({ ...inputs, grossSalaryAnnual: grossAnnual });
    const monthlyTax = result.finalTax / 12;
    grossAnnual = (inputs.takeHomePay 
                   + inputs.pfDeduction 
                   + inputs.professionalTax 
                   + inputs.otherDeductions 
                   + monthlyTax) * 12;
  }
  
  return grossAnnual;
}
```

### 10.6 Basic Salary Estimation

```typescript
function estimateBasicSalary(grossMonthly: number, userProvidedBasic?: number): number {
  if (userProvidedBasic && userProvidedBasic > 0) return userProvidedBasic;
  // Standard approximation for private sector
  return grossMonthly * 0.40;
}

function estimateHRA(grossMonthly: number, userProvidedHRA?: number): number {
  if (userProvidedHRA && userProvidedHRA > 0) return userProvidedHRA;
  return grossMonthly * 0.20;
}
```

---

## 11. Input Validation Rules

| Field | Min | Max | Type | Error Message |
|---|---|---|---|---|
| Monthly take-home | ₹5,000 | ₹20,00,000 | Integer | "Please enter an amount between ₹5,000 and ₹20,00,000" |
| PF per month | ₹0 | ₹21,600 | Integer | "PF is typically capped at ₹21,600/month" |
| Professional tax | ₹0 | ₹300 | Integer | "Professional tax can't exceed ₹300/month" |
| Monthly rent | ₹500 | ₹3,00,000 | Integer | — |
| Annual HRA | ₹0 | Monthly gross × 12 | Integer | "HRA can't exceed your total salary" |
| Home loan interest | ₹0 | ₹50,00,000 | Integer | — |
| Total 80C | Auto-calculated, capped at ₹1,50,000 | | | |
| 80D self | ₹0 | ₹50,000 | Integer | "Limit for self/family is ₹50,000" (show hint, not error) |
| 80D parents | ₹0 | ₹50,000 | Integer | — |
| NPS self | ₹0 | ₹5,00,000 | Integer | — |
| Savings interest | ₹0 | ₹10,00,000 | Integer | — |

**General rules:**
- No negative numbers allowed
- Commas accepted in input (parse and clean)
- Decimal inputs: round to nearest integer
- Empty = 0 for optional fields
- Required fields: takeHomePay, ageGroup

---

## 12. Personalized Insights Engine

Generate 3–5 relevant insights based on which regime wins and why. Use the following decision tree:

### 12.1 Insight Generation Logic

```typescript
function generateInsights(inputs: TaxInputs, newResult: TaxResult, oldResult: TaxResult): string[] {
  const insights: string[] = [];
  const diff = Math.abs(newResult.finalTax - oldResult.finalTax);
  const winner = newResult.finalTax < oldResult.finalTax ? 'new' : 'old';

  // Insight 1: Primary reason for winner
  if (winner === 'new') {
    if (newResult.taxableIncome <= 1200000) {
      insights.push(`Your taxable income of ₹${fmt(newResult.taxableIncome)} falls within the New Regime's zero-tax rebate zone — so you pay ₹0 in tax.`);
    } else if (oldResult.deduction80C < 100000) {
      insights.push(`You're not claiming enough deductions to make the Old Regime worthwhile. The New Regime's lower slab rates win for you.`);
    } else {
      insights.push(`Even with your deductions, the New Regime's revised slabs result in lower tax for your income level.`);
    }
  } else {
    if (oldResult.hraExemption > 50000) {
      insights.push(`Your HRA exemption of ₹${fmt(oldResult.hraExemption)} gives a strong boost to the Old Regime — that's hard to beat with the New Regime.`);
    }
    if (oldResult.homeLoanInterestDeduction >= 100000) {
      insights.push(`Your home loan interest deduction of ₹${fmt(oldResult.homeLoanInterestDeduction)} significantly reduces your taxable income under the Old Regime.`);
    }
    if (oldResult.deduction80C === 150000) {
      insights.push(`You're fully utilizing the ₹1.5 lakh 80C limit — this alone saves you ₹${fmt(150000 * 0.20)} to ₹${fmt(150000 * 0.30)} in tax under the Old Regime.`);
    }
  }

  // Insight 2: HRA impact
  if (inputs.paysRent && oldResult.hraExemption > 0) {
    insights.push(`Your rent payments saved you ₹${fmt(oldResult.hraExemption * 0.20)} to ₹${fmt(oldResult.hraExemption * 0.30)} in Old Regime via HRA exemption of ₹${fmt(oldResult.hraExemption)}.`);
  } else if (inputs.paysRent && oldResult.hraExemption === 0) {
    insights.push(`You pay rent, but your HRA exemption works out to ₹0 because your rent (₹${fmt(inputs.monthlyRent * 12)}) is less than 10% of your basic salary. The New Regime isn't affected by this.`);
  }

  // Insight 3: Close margin
  if (diff < 5000) {
    insights.push(`The difference between the two regimes is just ₹${fmt(diff)} — so you should pick the New Regime for simplicity unless you're already tracking all your Old Regime investments carefully.`);
  }

  // Insight 4: 80C not maxed
  const used80C = inputs.epfEmployee + inputs.ppf + inputs.lic + inputs.elss + inputs.taxSaverFD + inputs.other80C;
  if (used80C < 100000 && winner === 'new') {
    insights.push(`You have ₹${fmt(150000 - used80C)} of unused 80C space. Investing this in Old Regime could save ₹${fmt((150000 - used80C) * 0.20)} to ₹${fmt((150000 - used80C) * 0.30)} — but the New Regime still wins for you right now.`);
  }

  return insights.slice(0, 5);
}

function fmt(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}
```

---

## 13. FAQ Content Bank

### Category: Understanding Income

**Q: I get paid differently every month. What should I enter?**
A: Enter your regular, fixed monthly salary — the amount you reliably receive. Don't include bonuses, incentives, or reimbursements unless they come every month.

**Q: What if I changed jobs this year?**
A: Add up your total income from all jobs and divide by 12 for a monthly average. This gives a good estimate for annual tax planning.

**Q: I work in a company but as a contractor / consultant. Is this for me?**
A: This calculator is designed for salaried employees (who get a salary slip and Form 16). Contract workers or freelancers have different tax rules and should consult a CA.

### Category: Salary Structure

**Q: What is basic salary?**
A: Your total salary has multiple parts: Basic, HRA, special allowances, etc. "Basic" is the foundation — usually 40–50% of total salary. It matters for HRA and PF calculations.

**Q: What is HRA?**
A: House Rent Allowance. It's a part of your salary your employer gives you specifically to pay for accommodation. If you rent a home and your salary includes HRA, you can claim a tax exemption on it under the Old Regime.

**Q: My payslip looks complicated. What numbers do I focus on?**
A: Focus on: (1) "Net Pay" or "Net Salary" at the bottom — that's your take-home. (2) "Basic" — for PF and HRA calculations. (3) "HRA" — for rent deduction. (4) "EPF" or "PF" — your PF deduction. (5) "Prof Tax" or "PT" — professional tax.

### Category: PF / EPF

**Q: What's the difference between EPF and PF?**
A: They're the same thing. EPF = Employees' Provident Fund. PF = Provident Fund. Both refer to the same retirement savings scheme.

**Q: My company deducts PF but I also invest separately in PPF. Are these different?**
A: Yes. EPF (from salary) and PPF (Public Provident Fund, which you deposit in a post office or bank) are different. Both count toward your 80C investments.

**Q: My PF is more than ₹21,600/month. Is that normal?**
A: For companies that pay employees above ₹15,000/month basic, the mandatory PF is 12% of basic up to ₹1,800/month. If your company deducts more than this, it's a "voluntary" PF. Both count for 80C.

### Category: Old vs New Regime

**Q: Which regime should salaried people choose by default?**
A: The New Regime is the government's default from FY 2024-25. For people with limited investments and deductions, it's often better. But if you have significant HRA, home loan, 80C investments, and health insurance, the Old Regime can still save more.

**Q: Can I switch regimes every year?**
A: Yes. Salaried employees (without business income) can switch between old and new regime every year when filing their ITR.

**Q: Does the regime I tell my employer affect my actual ITR?**
A: Your employer deducts TDS based on the regime you declare. But when you file your ITR, you can choose a different regime. If you choose the same regime, no refund or extra tax. If you switch, adjust accordingly.

---

## 14. UI Component Library

### 14.1 QuestionCard
- Container with large headline (24–32px)
- Sub-label (14–16px, muted color)
- Input component (varies by step)
- FAQ accordion at bottom
- Back + Continue buttons

### 14.2 NumberInput
- ₹ prefix icon
- Large text (18–20px)
- Auto-thousand separator
- Inline validation message
- Monthly/Annual toggle where applicable

### 14.3 CardSelector
- Grid of 2–3 cards
- Each card: icon + label + optional description
- Selected state: border highlight, background tint
- Keyboard accessible (arrow keys to navigate)

### 14.4 ProgressBar / Step Dots
- Total steps: 10 (Steps 1–10)
- Desktop: numbered dots or horizontal bar
- Mobile: "Step 3 of 10" text + thin progress bar
- Completed steps shown in accent color

### 14.5 FAQAccordion
- Collapsed by default
- Up to 4 Q&A items per step
- Smooth animation on open/close
- "❓ Common questions about this" toggle header

### 14.6 LivePreviewPanel
- Sticky right panel (desktop)
- Sticky bottom card (mobile)
- Animated number counters
- Color-coded regime comparison
- Expand/collapse on mobile

### 14.7 ResultVerdict
- Full-width banner
- Large bold number (savings amount)
- Regime label badge (OLD / NEW)
- Confetti animation if savings > ₹10,000 (optional delight)

### 14.8 ComparisonTable
- Sticky header row
- Highlighted winner column
- Collapsible row groups (e.g., "Deductions" section)
- Tooltip icons (ℹ️) on each row label for brief explanation

### 14.9 SlabBreakdown
- Two expandable tables (one per regime)
- Visual bar alongside each slab showing proportion of income
- Rows for slabs above user's income shown but greyed out

---

## 15. State Management

### 15.1 Application State Shape

```typescript
interface AppState {
  currentStep: number;           // 0 = landing, 1–10 = wizard, 11 = results
  inputs: Partial<TaxInputs>;    // Grows as user fills steps
  
  derivedValues: {
    grossSalaryMonthly: number;
    grossSalaryAnnual: number;
    basicSalaryMonthly: number;
    hraMonthly: number;
  };
  
  taxResults: {
    newRegime: TaxResult | null;
    oldRegime: TaxResult | null;
    winner: 'new' | 'old' | 'tie' | null;
    savings: number;
  };
  
  ui: {
    activeStep: number;
    stepHistory: number[];
    showFAQ: { [stepId: number]: boolean };
    previewExpanded: boolean;      // mobile
    isCalculating: boolean;
  };
}
```

### 15.2 Calculation Trigger

- **After every input change:** Re-run both regime calculators and update `taxResults`
- Debounce: 300ms after last keystroke (to avoid excessive calculations on typing)
- Calculation is synchronous and fast; no loading state needed

### 15.3 Persistence

- **Session storage only** — persist wizard state so user can refresh without losing answers
- **No localStorage for sensitive data**
- **No server-side persistence** — no API calls with user data
- Clear session storage on "Start over" or "Recalculate"

---

## 16. Edge Cases & Special Handling

### 16.1 Very Low Income

- If estimated taxable income (new regime) ≤ ₹4,00,000: Show "You likely pay zero tax under both regimes."
- If take-home < ₹20,000/month: Suggest the user may be below the taxable threshold.

### 16.2 HRA When Basic Is Not Known

- Estimate: `basic = 40% of gross`, `HRA = 20% of gross`
- Flag in UI: "We've estimated your basic salary as ₹X. If you know your actual basic, you can enter it for a more accurate result."
- Add a small "Enter actual basic" link that opens an optional input

### 16.3 PF Deduction Exceeds Gross

- Validate: `pfDeduction * 12 + pt * 12 + other * 12 ≤ grossMonthly * 12 - takeHome * 12`
- If validation fails: Show error "These deductions seem higher than your total salary. Please check."

### 16.4 HRA > Gross Salary

- Cap HRA input at `gross_salary_monthly * 0.50` automatically
- Show helper: "HRA typically doesn't exceed 50% of gross salary. We've adjusted this automatically."

### 16.5 Renter with No HRA in Salary

- Old regime: No HRA exemption (but could use 80GG — note this as an out-of-scope limitation)
- Show note: "Since your salary doesn't include HRA, the HRA tax exemption doesn't apply here. Section 80GG may apply in your case — consult a CA for this."

### 16.6 Super Senior Citizen with New Regime

- New regime: Same slabs as everyone else (no higher exemption)
- Old regime: Nil up to ₹5,00,000
- For super seniors with modest income, old regime almost always wins — show this prominently

### 16.7 Income Just Above ₹12L (New Regime)

- Apply marginal relief correctly (see Section 5.5)
- Show clear explanation: "Because you're just over ₹12 lakh, you get Marginal Relief — your actual tax is ₹X, not the standard ₹Y."

### 16.8 Home Loan Both Principal and Interest Not Known

- If user selects "I have a home loan" but can't provide interest:
  - Offer to estimate: "Enter your monthly EMI and we'll estimate the interest portion"
  - Estimation: Year 1–3: interest ≈ 80% of EMI; Year 4–6: ≈ 70%; Year 7+: ≈ 60%
  - Show this is an estimate: "This is an approximation. Your bank's interest certificate has the exact figure."

### 16.9 Let-Out Property with No Rental Income

- User says property is let-out but doesn't enter rental income
- Treat rental income as 0
- Deduct full home loan interest against ₹0 rental income → house property loss
- In old regime, set off against salary up to ₹2L; carry forward rest
- Show note: "If your property is let out and you have rental income, add it for a more accurate estimate."

### 16.10 Income Above ₹50L

- Show prominent banner: "Your income may attract surcharge (10% or more). This calculator doesn't compute surcharge. Please use the IT Department's portal or consult a CA for exact figures."
- Still compute base tax without surcharge, clearly labeled "excluding surcharge"

### 16.11 Old and New Regime Results Very Close

- If |newTax - oldTax| < ₹1,000: "Both regimes are nearly identical for you (difference: ₹X). We recommend New Regime — it's simpler to file, with fewer documents required."

### 16.12 80C Exceeds ₹1,50,000

- Display running total as user fills in investments
- When it hits ₹1,50,000: Show "You've reached the ₹1.5 lakh limit! Any additional investments won't give more tax benefit under 80C, but investing more is still good for your future."
- Cap calculation at ₹1,50,000

### 16.13 80D Exceeds Limits

- Soft cap: Show "Your health insurance premium exceeds the deductible limit of ₹X. We'll apply the maximum deduction allowed."
- Don't hard-block input — just cap the deduction in calculation

---

## 17. Accessibility & Mobile Considerations

### 17.1 Accessibility

- All form inputs have proper `<label>` elements
- Focus management: Auto-focus on first input of each step
- Keyboard navigation: Enter to proceed, Escape to go back
- ARIA live regions for the live preview panel (announce updates)
- Color is never the sole indicator of meaning (always use text + color)
- Contrast ratio minimum 4.5:1 for all text
- All interactive elements minimum 44×44px touch target

### 17.2 Mobile Optimization

- Single-column layout on mobile
- Bottom sticky panel for live preview (expandable)
- Number inputs use `inputmode="numeric"` for numeric keyboard
- Large tap targets for all card selectors (min 56px height)
- Step navigation: "Back" on top-left, "Continue" full-width button at bottom
- Progress bar visible without scrolling

### 17.3 Performance

- All JS/CSS inline or bundled — no CDN dependencies
- Calculation engine: <5ms for all calculations (pure JS)
- First contentful paint target: <1.5s
- No images above the fold (SVG icons only)

---

## 18. Privacy & Data Handling

### 18.1 Core Commitment

"All calculations run entirely in your browser. No data you enter is ever sent to any server, stored in any database, or tracked in any analytics system."

### 18.2 Technical Implementation

- **No API calls with user data** — ever
- **No analytics that capture form inputs** (if analytics used, only track page views and completion rates — no field values)
- **Session storage only** — cleared on tab close
- **No cookies for user data**
- **No user accounts required**

### 18.3 Disclaimer Placement

- Footer of landing page
- Bottom of every wizard step
- Results page header

---

## 19. Technical Stack Recommendation

### Recommended: React (with Vite)

```
Frontend: React 18 + TypeScript
Build: Vite
Styling: Tailwind CSS (utility-first) + CSS variables for theming
Animations: Framer Motion (for step transitions) or CSS transitions
State: Zustand or React Context + useReducer
Fonts: Google Fonts (DM Sans / Plus Jakarta Sans for body; Fraunces or similar for display)
Icons: Lucide Icons (lightweight)
Number formatting: Intl.NumberFormat (built-in)
Storage: sessionStorage only
```

### Alternative: Vanilla HTML/JS

If framework is not preferred, a single-file HTML/JS/CSS app is fully viable given the app's scope. Use class-based JavaScript for state management.

### File Structure (React)

```
src/
  components/
    landing/
      Hero.tsx
      HowItWorks.tsx
      ResultPreview.tsx
    wizard/
      WizardShell.tsx
      steps/
        Step1TakeHome.tsx
        Step2Age.tsx
        Step3Deductions.tsx
        Step4Rent.tsx
        Step5HomeLoan.tsx
        Step6HealthInsurance.tsx
        Step7Investments.tsx
        Step8NPS.tsx
        Step9OtherIncome.tsx
        Step10Summary.tsx
      FAQAccordion.tsx
      ProgressBar.tsx
    preview/
      LivePreviewPanel.tsx
      PreviewMobileCard.tsx
    results/
      ResultsPage.tsx
      VerdictBanner.tsx
      ComparisonTable.tsx
      SlabBreakdown.tsx
      PersonalizedInsights.tsx
      TaxSavingSuggestions.tsx
    common/
      NumberInput.tsx
      CardSelector.tsx
      ToggleCard.tsx
  engine/
    calculateNewRegime.ts
    calculateOldRegime.ts
    calculateHRA.ts
    reconstructGross.ts
    generateInsights.ts
    types.ts
  store/
    appStore.ts    (Zustand)
  constants/
    taxSlabs.ts
    faqContent.ts
    sectionLimits.ts
```

---

## 20. Worked Examples for QA Testing

### Example 1: New Regime Wins (Young Employee, No Major Deductions)

**Inputs:**
- Take-home: ₹55,000/month
- Age: Below 60
- PF: ₹1,800/month, PT: ₹200/month
- No rent, no home loan
- No health insurance
- 80C: EPF only = ₹21,600/year
- No NPS, no other income

**Derived:**
- Monthly gross ≈ ₹55,000 + ₹1,800 + ₹200 + (estimated TDS ~₹4,000) = ₹61,000/month
- Annual gross ≈ ₹7,32,000

**New Regime Calculation:**
- Gross: ₹7,32,000
- Standard deduction: −₹75,000
- Taxable income: ₹6,57,000
- Tax: 0 on 4L, 5% on ₹2,57,000 = ₹12,850
- 87A rebate: ₹12,850 (taxable ≤ ₹12L, full rebate up to ₹60,000)
- Tax after rebate: ₹0
- Cess: ₹0
- **Final tax: ₹0**

**Old Regime Calculation:**
- Gross: ₹7,32,000
- Standard deduction: −₹50,000
- PT: −₹2,400
- 80C: −₹21,600 (EPF, capped at ₹1,50,000)
- Taxable income: ₹7,32,000 − ₹50,000 − ₹2,400 − ₹21,600 = ₹6,58,000
- Tax: 0 on 2.5L, 5% on 2.5L = ₹12,500, 20% on ₹1,58,000 = ₹31,600 → Total = ₹44,100
- 87A rebate: ₹0 (taxable > ₹5L)
- Cess: 4% of ₹44,100 = ₹1,764
- **Final tax: ₹45,864**

**Verdict:** New Regime wins. Save ₹45,864.

---

### Example 2: Old Regime Wins (High HRA + Full 80C + Health Insurance)

**Inputs:**
- Take-home: ₹1,00,000/month
- Age: Below 60
- PF: ₹1,800/month, PT: ₹200/month
- Pays rent: ₹25,000/month in Mumbai (metro), HRA received: ₹25,000/month
- Basic salary: ₹50,000/month (user provided)
- No home loan
- Health insurance: ₹20,000 self + family, ₹30,000 parents (senior)
- 80C: EPF ₹21,600 + PPF ₹50,000 + LIC ₹30,000 + ELSS ₹50,000 = ₹1,51,600 → capped at ₹1,50,000
- NPS self-contribution: ₹50,000
- No other income

**Derived:**
- Monthly gross ≈ ₹1,00,000 + ₹1,800 + ₹200 + (TDS ~₹12,000) = ₹1,14,000/month
- Annual gross ≈ ₹13,68,000

**HRA Exemption (Old Regime):**
- Condition A: ₹25,000 × 12 = ₹3,00,000
- Condition B: ₹25,000×12 − 10% of ₹50,000×12 = ₹3,00,000 − ₹60,000 = ₹2,40,000
- Condition C: 50% of ₹50,000×12 = ₹3,00,000 (Mumbai = metro)
- HRA Exemption = min(₹3L, ₹2.4L, ₹3L) = **₹2,40,000**

**Old Regime Calculation:**
- Gross: ₹13,68,000
- Standard deduction: −₹50,000
- PT: −₹2,400
- HRA: −₹2,40,000
- Net Salary: ₹10,75,600
- Gross Total Income: ₹10,75,600
- 80C: −₹1,50,000
- 80CCD(1B) NPS: −₹50,000
- 80D: −₹20,000 (self) + −₹30,000 (senior parents) = −₹50,000
- Net Taxable Income: ₹10,75,600 − ₹1,50,000 − ₹50,000 − ₹50,000 = **₹8,25,600**
- Tax: 0 on 2.5L, 5% on 2.5L = 12,500, 20% on 3.25L = 65,000 → Total = ₹77,500 (wait: ₹8,25,600 − ₹5,00,000 = ₹3,25,600 at 20%)
  - 5% × ₹2,50,000 = ₹12,500
  - 20% × ₹3,25,600 = ₹65,120
  - Total = ₹77,620
- 87A: ₹0 (taxable > ₹5L)
- Cess: 4% × ₹77,620 = ₹3,104.80
- **Final Old Regime Tax: ₹80,725 (rounded)**

**New Regime Calculation:**
- Gross: ₹13,68,000
- Standard deduction: −₹75,000
- Taxable income: ₹12,93,000
- New regime tax:
  - 0 on ₹4L = ₹0
  - 5% on ₹4L = ₹20,000
  - 10% on ₹4L = ₹40,000
  - 15% on ₹93,000 = ₹13,950
  - Total = ₹73,950
- 87A: ₹0 (taxable > ₹12L)
- Marginal relief: Not applicable (income well above ₹12L)
- Cess: 4% × ₹73,950 = ₹2,958
- **Final New Regime Tax: ₹76,908**

**Verdict:** New Regime wins by ₹76,908 − ₹80,725 = −₹3,817 → Old Regime wins by ~₹3,817. Very close — display "Marginal difference of ₹3,800. Old Regime wins, but New Regime is simpler."

---

### Example 3: Senior Citizen with FD Interest (Old Regime Wins Strongly)

**Inputs:**
- Take-home: ₹80,000/month
- Age: 65 (Senior Citizen)
- No PF, PT: ₹150/month
- No rent, owns home
- No home loan
- Health insurance: ₹40,000 (senior category, self)
- 80C: LIC ₹50,000 + PPF ₹1,00,000 = ₹1,50,000 (capped)
- Savings interest: ₹15,000/year
- FD interest: ₹60,000/year

**Derived:**
- Monthly gross ≈ ₹80,000 + ₹150 + TDS ~₹8,000 = ₹88,150
- Annual gross ≈ ₹10,57,800 (salary)
- Total income = salary + savings interest + FD interest = ₹10,57,800 + ₹75,000 = ₹11,32,800

**Old Regime Calculation:**
- Gross income: ₹11,32,800
- Standard deduction: −₹50,000
- PT: −₹1,800
- Net Salary: ₹10,81,000 (approx, from salary component)
- Other income: ₹75,000
- Gross Total Income: ₹11,32,800 − ₹50,000 − ₹1,800 = ₹10,81,000 + ₹75,000 = ₹11,56,000
- 80C: −₹1,50,000
- 80TTB (senior citizen — savings + FD, limit ₹50,000): min(₹75,000, ₹50,000) = −₹50,000
- 80D: min(₹40,000, ₹50,000) = −₹40,000 (self is senior)
- Taxable Income: ₹11,56,000 − ₹1,50,000 − ₹50,000 − ₹40,000 = **₹9,16,000**
- Senior citizen slabs (Old Regime):
  - 0 on ₹3L
  - 5% × ₹2L = ₹10,000
  - 20% × ₹4,16,000 = ₹83,200
  - Total = ₹93,200
- Cess: 4% × ₹93,200 = ₹3,728
- **Final Old Regime Tax: ₹96,928**

**New Regime Calculation:**
- Gross income: ₹11,32,800 (no additional deductions for FD/savings)
- Standard deduction: −₹75,000
- Taxable income: ₹10,57,800 + ₹75,000 − ₹75,000 = ₹11,32,800 (re-add all income; subtract std deduction)
  - Actually: (₹10,57,800 gross salary − ₹75,000 std ded) + ₹75,000 other income = ₹10,57,800
- New regime tax on ₹10,57,800:
  - 0 on ₹4L
  - 5% × ₹4L = ₹20,000
  - 10% × ₹2,57,800 = ₹25,780
  - Total = ₹45,780
  - (Note: Below ₹12L → 87A rebate = full rebate up to ₹60,000 → tax = ₹0)
  
Wait — let's recalculate correctly:
- New regime taxable: Annual gross salary (approx ₹10,57,800 from salary component) + ₹75,000 other income = ₹11,32,800; minus standard deduction ₹75,000 = ₹10,57,800
- Since ₹10,57,800 < ₹12,00,000 → 87A rebate applies! Tax = ₹0.
- **Final New Regime Tax: ₹0**

**Verdict:** New Regime wins! Save ₹96,928. 

[Note for developers: This outcome is counter-intuitive for a senior citizen — they often assume Old Regime is always better. The insights section should explain: "Even though Old Regime offers excellent deductions like 80TTB and 80D for senior citizens, your total income of ₹10.6 lakh (after standard deduction) falls within New Regime's zero-tax rebate limit. The rebate is the decisive factor here."]

---

### Example 4: High Income with Home Loan in Metro (Old Regime Wins)

**Inputs:**
- Take-home: ₹2,00,000/month
- Age: Below 60
- PF: ₹1,800/month, PT: ₹200/month
- Rent: ₹40,000/month in Bengaluru (non-metro for FY 2025-26 under Act 1961)
- HRA: ₹40,000/month, Basic: ₹80,000/month
- Home loan interest: ₹2,00,000/year (self-occupied), principal: ₹80,000/year
- Health insurance: ₹25,000 (self + family), ₹25,000 (parents, not senior)
- 80C: EPF ₹21,600 + principal ₹80,000 + ELSS ₹48,400 = ₹1,50,000
- NPS self: ₹50,000
- Savings interest: ₹5,000

**HRA (Bengaluru = non-metro for FY 2025-26):**
- A: ₹40,000 × 12 = ₹4,80,000
- B: ₹40,000×12 − 10% of ₹80,000×12 = ₹4,80,000 − ₹96,000 = ₹3,84,000
- C: 40% of ₹80,000×12 = ₹3,84,000
- HRA Exemption = min(₹4,80,000, ₹3,84,000, ₹3,84,000) = **₹3,84,000**

**Approximate Gross:** Monthly: ₹2,00,000 + ₹1,800 + ₹200 + TDS ~₹35,000 = ₹2,37,000 → Annual = ₹28,44,000

**Old Regime:**
- Gross: ₹28,44,000
- Standard: −₹50,000
- PT: −₹2,400
- HRA: −₹3,84,000
- House property (self-occupied): −₹2,00,000 (interest cap)
- Gross Total Income: ₹28,44,000 − ₹50,000 − ₹2,400 − ₹3,84,000 − ₹2,00,000 = ₹22,07,600
- 80C: −₹1,50,000
- 80CCD(1B): −₹50,000
- 80D: −₹25,000 (self) − ₹25,000 (parents non-senior) = −₹50,000
- 80TTA: min(₹5,000, ₹10,000) = −₹5,000
- Taxable: ₹22,07,600 − ₹1,50,000 − ₹50,000 − ₹50,000 − ₹5,000 = **₹19,52,600**
- Tax: 5%×2.5L + 20%×5L + 30%×9.52L = ₹12,500 + ₹1,00,000 + ₹2,85,600 = ₹3,98,100
- Cess: ₹15,924
- **Old Regime Tax: ₹4,14,024**

**New Regime:**
- Gross: ₹28,44,000
- Standard: −₹75,000
- Taxable: ₹27,69,000
- Tax: (slabs: 0+20k+40k+60k+80k+100k + 30% on ₹3,69,000 = ₹1,10,700) 
  = ₹0 + ₹20,000 + ₹40,000 + ₹60,000 + ₹80,000 + ₹1,00,000 + ₹1,10,700 = ₹4,10,700
- Cess: ₹16,428
- **New Regime Tax: ₹4,27,128**

**Verdict:** Old Regime wins. Save ₹4,27,128 − ₹4,14,024 = **₹13,104**

---

*Document Version: 1.0*
*Prepared for: FY 2025-26 (AY 2026-27)*
*Tax laws as per Union Budget 2025 and applicable provisions of Income Tax Act 1961*
*For ITR filing due July 31, 2026*

*Disclaimer: This PRD is intended as a development guide. All tax calculations should be verified against official IT Department guidance before deployment.*
