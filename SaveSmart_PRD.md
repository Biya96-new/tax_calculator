# Save Smart = Simple
## Product Requirements Document
### Personalized Tax-Saving Advice Engine | FY 2025-26
### TaxRegime Integration

---

## 1. Product Overview

### 1.1 Vision
Transform TaxRegime from a regime-decision calculator into a complete tax optimization companion. After telling users WHICH regime saves them money, Save Smart tells them HOW to keep even more — through specific, actionable, personalized advice based on their actual financial profile.

### 1.2 Core Philosophy
- **Personalized, not generic** — Every suggestion uses the user's actual numbers
- **Actionable, not theoretical** — Each advice has a specific rupee value and clear next step
- **Simple, not simplistic** — Explain the "why" in one sentence, hide section numbers
- **Honest about effort** — Flag whether an action takes 5 minutes or 5 years
- **Regime-aware** — Respect whether Old or New regime is optimal for this user

### 1.3 When It Appears
- **Primary:** After the Results Page, as the next scrollable section
- **Secondary:** Standalone "Tax Health Check" accessible from navbar
- **Tertiary:** Contextual inline tips during the wizard

---

## 2. Indian Income Tax Landscape (FY 2025-26) — Complete Reference

### 2.1 New Tax Regime (Default)

**Slab Rates:**
| Income Slab | Tax Rate |
|-------------|----------|
| Up to ₹4,00,000 | Nil |
| ₹4,00,001 – ₹8,00,000 | 5% |
| ₹8,00,001 – ₹12,00,000 | 10% |
| ₹12,00,001 – ₹16,00,000 | 15% |
| ₹16,00,001 – ₹20,00,000 | 20% |
| ₹20,00,001 – ₹24,00,000 | 25% |
| Above ₹24,00,000 | 30% |

**Rebate u/s 87A:** Full tax rebate up to ₹60,000 for taxable income ≤ ₹12,00,000 [^3^]
**Standard Deduction:** ₹75,000 [^11^]
**Marginal Relief:** Applies when income slightly exceeds ₹12L — tax cannot exceed income above ₹12L [^11^]

**Allowed Deductions (New Regime):**
- Standard Deduction: ₹75,000
- Employer NPS (80CCD(2)): Up to 14% of (Basic + DA) for ALL employees [^9^]
- Family Pension: Up to ₹25,000
- Agniveer Corpus Fund: Actual contribution

**NOT Allowed:** HRA, 80C, 80D, 80CCD(1B), home loan interest (self-occupied), LTA, professional tax, 80TTA/80TTB [^9^]

### 2.2 Old Tax Regime

**Slab Rates (General — Below 60):**
| Income Slab | Tax Rate |
|-------------|----------|
| Up to ₹2,50,000 | Nil |
| ₹2,50,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

**Slab Rates (Senior Citizen — 60-79):** Basic exemption ₹3,00,000
**Slab Rates (Super Senior — 80+):** Basic exemption ₹5,00,000

**Rebate u/s 87A:** Up to ₹12,500 for taxable income ≤ ₹5,00,000 [^3^]
**Standard Deduction:** ₹50,000

**Complete Deduction Arsenal (Old Regime Only):**

| Section | Description | Limit | Notes |
|---------|-------------|-------|-------|
| 10(13A) | HRA Exemption | Least of: actual HRA, 50%/40% of Basic+DA, Rent-10% of Basic+DA | Metro = 50%, Non-metro = 40% [^46^] |
| 10(5) | LTA | Actual travel cost | 2 journeys in 4-year block [^46^] |
| 16(ia) | Standard Deduction | ₹50,000 | Flat for salaried |
| 16(iii) | Professional Tax | Actual, max ₹2,500/year | [^9^] |
| 80C | Investments + Expenses | ₹1,50,000 combined | EPF, PPF, ELSS, LIC, NSC, SSY, Tuition fees, Home loan principal [^43^] |
| 80CCD(1) | NPS (Employee) | Within 80C limit | [^43^] |
| 80CCD(1B) | NPS Additional | ₹50,000 extra | Over and above 80C [^43^] |
| 80CCD(2) | NPS (Employer) | 10% private / 14% govt | Of Basic+DA [^9^] |
| 80D | Health Insurance | ₹25K-₹1L | Self: ₹25K(<60)/₹50K(≥60); Parents: ₹25K(<60)/₹50K(≥60) [^9^] |
| 80E | Education Loan Interest | Unlimited | For 8 years [^9^] |
| 24(b) | Home Loan Interest (Self) | ₹2,00,000 | Loan sanctioned after 1999, construction within 5 years [^9^] |
| 80EE | Home Loan Interest (First-time) | ₹50,000 | Additional, subject to conditions [^9^] |
| 80EEA | Home Loan Interest (Affordable Housing) | ₹1,50,000 | Loan sanctioned 2019-2022 [^9^] |
| 80EEB | Electric Vehicle Loan Interest | ₹1,50,000 | Loan sanctioned 2019-2023 [^9^] |
| 80TTA | Savings Interest (<60) | ₹10,000 | NOT for FD interest [^9^] |
| 80TTB | All Deposit Interest (≥60) | ₹50,000 | Replaces 80TTA for seniors [^9^] |
| 80G | Donations | 50% or 100% | Depending on fund [^9^] |
| 80GG | Rent (no HRA) | ₹5,000/month or 25% of income or Rent-10% of income | Whichever is lower [^9^] |

### 2.3 Salary Restructuring Components (Both Regimes)

| Component | Monthly Limit | Annual Value | Regime |
|-----------|--------------|--------------|--------|
| Food Coupons/Meal Vouchers | ₹50 × 2 meals × 22 days | ₹26,400 | Both [^46^] |
| Conveyance Allowance | ₹1,600/month | ₹19,200 | Both [^46^] |
| Mobile/Internet Reimbursement | Actual bills | Variable | Both [^46^] |
| Children Education Allowance | ₹100/child (max 2) | ₹2,400/child | Old only [^46^] |
| Hostel Allowance | ₹300/child (max 2) | ₹7,200/child | Old only [^46^] |
| Books & Periodicals | ₹1,600/month | ₹19,200 | Both [^46^] |
| Medical Reimbursement | Actual bills | Up to ₹15,000 | Both [^46^] |

### 2.4 Tax-Saving Investment Comparison

| Investment | Returns (Est.) | Lock-in | Risk | Tax Status | Best For |
|------------|---------------|---------|------|------------|----------|
| ELSS Mutual Fund | 12-15% CAGR | 3 years | High | LTCG 12.5% above ₹1.25L | Young earners, wealth creation [^45^] |
| PPF | 7.1% p.a. | 15 years | Nil | EEE (fully tax-free) | Conservative, long-term [^45^] |
| NPS (80CCD1B) | 9-11% CAGR | Till 60 | Medium | 60% tax-free, 40% annuity | Retirement planning [^45^] |
| Tax Saver FD | 6.5-7.25% | 5 years | Nil | Interest fully taxable | Ultra-conservative [^45^] |
| EPF | 8.15% p.a. | Till retirement | Nil | Tax-free after 5 yrs | Salaried (automatic) [^45^] |
| Sukanya Samriddhi | 8.2% p.a. | 21 years (girl's age) | Nil | EEE | Parents of daughters [^45^] |
| NSC | 7.7% p.a. | 5 years | Nil | Interest taxable | Safe, medium-term [^45^] |
| LIC/Insurance | 4-6% | Policy term | Low | Conditionally tax-free | Risk protection [^45^] |

### 2.5 The Breakeven Rule

For FY 2025-26, Old Regime only beats New Regime if total deductions + exemptions exceed:

| Gross Income (approx.) | Deductions Needed for Old to Win |
|------------------------|----------------------------------|
| ₹12 lakh | ₹0 (New wins automatically due to rebate) |
| ₹13 lakh | ₹6,87,500 |
| ₹15 lakh | ₹5,43,750 |
| ₹18 lakh | ₹6,41,670 |
| ₹20 lakh | ₹7,08,330 |
| ₹25 lakh+ | ₹8,00,000 |

**Key Insight:** Below ₹12L gross, New Regime is almost always better. Above ₹15L, only heavy deduction users (home loan + HRA + 80C + 80D) should consider Old.

---

## 3. Save Smart — Feature Specifications

### 3.1 Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR (TaxRegime existing)                                 │
├─────────────────────────────────────────────────────────────┤
│ SECTION 1: Hero Banner                                      │
│   - Headline + Tax Health Score                             │
│   - Total potential savings summary                         │
├─────────────────────────────────────────────────────────────┤
│ SECTION 2: Regime Verdict Card                              │
│   - Reminder of which regime won and why                    │
├─────────────────────────────────────────────────────────────┤
│ SECTION 3: Priority Advice Cards (2-col grid)               │
│   - Quick Wins → Smart Moves → Big Levers                   │
├─────────────────────────────────────────────────────────────┤
│ SECTION 4: Missed Opportunity Banner                        │
│   - "If you did everything right" calculator                │
├─────────────────────────────────────────────────────────────┤
│ SECTION 5: Action Planner (Sticky Bottom / Sidebar)         │
│   - Checklist of actionable items                           │
├─────────────────────────────────────────────────────────────┤
│ SECTION 6: Salary Restructuring Simulator (Collapsible)     │
│   - Interactive CTC optimizer                               │
├─────────────────────────────────────────────────────────────┤
│ SECTION 7: Investment Comparison Tool                       │
│   - ELSS vs PPF vs NPS visualizer                           │
├─────────────────────────────────────────────────────────────┤
│ SECTION 8: Personalized Education                           │
│   - "How each input affected your tax"                      │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Design System (Matching TaxRegime)

**Color Tokens:**
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0B0E17` | Page background |
| Surface | `#13182B` | Cards, panels |
| Surface Elevated | `#1A2035` | Hover states, inner cards |
| Primary | `#A855F7` → `#EC4899` | CTAs, gradients, accents |
| Text Primary | `#FFFFFF` | Headlines |
| Text Secondary | `#94A3B8` | Body, labels |
| Success | `#22C55E` | Savings, positive numbers, Old Regime win |
| Info | `#3B82F6` | Smart Move category |
| Warning | `#F59E0B` | Quick Win category |
| Danger | `#EF4444` | Avoid Mistake category |
| Border | `#1E293B` | Card borders, dividers |

**Typography:**
- Headlines: Inter/Geist, 700 weight, 36px hero, 24px section
- Body: Inter/Geist, 400 weight, 16px
- Numbers: Tabular figures, monospace for all INR amounts

**Spacing:**
- Card border-radius: 16px
- Inner element radius: 12px
- Card padding: 24px
- Grid gap: 24px
- Section spacing: 64px

**Effects:**
- Card hover: translateY(-2px), shadow `0 8px 32px rgba(168, 85, 247, 0.08)`
- Gradient text: `linear-gradient(135deg, #A855F7, #EC4899)`
- Spotlight glow: radial gradient on mouse position (CSS custom properties)

### 3.3 Section 1: Hero Banner

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Results                                          │
│                                                             │
│  Save Smart = Simple                                        │
│  Personalized advice to keep more of what you earn          │
│                                                             │
│  "Based on your profile, you can save an additional         │
│   ₹47,200 this year with 3 quick changes."                  │
│                                                             │
│  [Tax Health Score: 78/100]        [View Action Plan →]     │
│  [Circular progress ring, green]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Tax Health Score Algorithm:**
```
Score = 0

// Regime optimization (+30)
If user is in optimal regime: +30
If user could save by switching: +10

// 80C utilization (+15)
If 80C utilized > 90%: +15
If 80C utilized 50-90%: +10
If 80C utilized < 50%: +5
If New Regime (80C irrelevant): +15

// 80D utilization (+10)
If 80D utilized > 90%: +10
If 80D utilized 50-90%: +7
If 80D utilized < 50%: +3
If New Regime: +10

// HRA optimization (+15)
If HRA claimed > 90% of max possible: +15
If HRA claimed 50-90%: +10
If no HRA or no rent: +5

// Salary exemptions (+10)
If claiming food coupons / LTA / other exemptions: +10
If partially claiming: +5

// Emergency fund (self-reported) (+10)
If has 6-month emergency fund: +10
If has 3-month: +5
```

**Score Display:**
- 80-100: Green ring `#22C55E`, label "Tax Ninja"
- 50-79: Amber ring `#F59E0B`, label "Getting There"
- 0-49: Red ring `#EF4444`, label "Leaving Money on Table"

### 3.4 Section 2: Regime Verdict Card

```
┌─────────────────────────────────────────────────────────────┐
│  🏆 Pick the OLD TAX REGIME                    [Old badge]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  You save ₹23,400 vs the New Regime                         │
│                                                             │
│  Because: You have a home loan (₹1.8L interest) + HRA       │
│  ₹1.2L + 80C ₹1.5L. These deductions beat the New Regime's │
│  lower rates.                                               │
│                                                             │
│  [See full comparison ↓]                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Left accent border: 4px solid `#22C55E` (Old wins) or `#A855F7` (New wins)
- Badge: Gradient pill background
- Background: Surface `#13182B`

### 3.5 Section 3: Advice Cards (Core Feature)

**Card Anatomy:**
```
┌─────────────────────────────────────────────────────────────┐
│ ⚡ QUICK WIN                                    [Amber dot] │
│                                                             │
│  Submit rent receipts to your HR                           │
│                                                             │
│  You pay ₹18,000/month rent but your HRA exemption is      │
│  only ₹14,400. You're leaving ₹43,200/year untaxed.        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  💰 Save ₹12,960/year    ⏱️ 15 min    🎯 High      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Copy Email to HR]    [How this works ▼]                  │
│                                                             │
│  ──── Collapsible Math ────                                │
│  • HRA Received: ₹3,60,000                                 │
│  • Rent Paid: ₹2,16,000                                    │
│  • 10% of Basic: ₹48,000                                   │
│  • Exemption = min(3.6L, 2.4L, 1.68L) = ₹1,68,000         │
│  • Current claim: ₹1,20,000 → Gap: ₹48,000                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Category Styling:**
| Category | Left Border | Badge BG | Badge Text | Icon |
|----------|-------------|----------|------------|------|
| Quick Win | `#F59E0B` | `rgba(245,158,11,0.15)` | `#FBBF24` | ⚡ |
| Smart Move | `#3B82F6` | `rgba(59,130,246,0.15)` | `#60A5FA` | 🧠 |
| Big Lever | `#22C55E` | `rgba(34,197,94,0.15)` | `#4ADE80` | 🏠 |
| Avoid Mistake | `#EF4444` | `rgba(239,68,68,0.15)` | `#F87171` | 🚫 |
| Regime Insight | `#A855F7` | `rgba(168,85,247,0.15)` | `#C084FC` | 📊 |

**Card CSS:**
```css
.advice-card {
  background: linear-gradient(145deg, #13182B 0%, #1A2035 100%);
  border: 1px solid rgba(255,255,255,0.06);
  border-left: 4px solid var(--category-color);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.advice-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(168, 85, 247, 0.08);
  border-color: #334155;
}

.advice-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(168, 85, 247, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.advice-card:hover::before {
  opacity: 1;
}
```

**Value Box (Inner):**
```css
.value-box {
  background: rgba(255,255,255,0.03);
  border: 1px solid #1E293B;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 24px;
  font-size: 14px;
}
```

### 3.6 Advice Generation Engine

**Input Signals:**
```typescript
interface AdviceSignals {
  recommendedRegime: 'old' | 'new';
  taxSavingsWithRecommended: number;
  unused80C: number;
  unused80D: number;
  hraOptimizationGap: number;
  homeLoanInterest: number;
  hasEmployerNPS: boolean;
  npsOwnContribution: number;
  ageCategory: 'below60' | 'senior' | 'superSenior';
  monthlyInHand: number;
  grossSalaryEstimate: number;
  cityType: 'metro' | 'nonMetro';
  paysRent: boolean;
  hasHomeLoan: boolean;
  hasHealthInsurance: boolean;
  isLastMinuteRusher: boolean;
  isFirstJob: boolean;
  isHighEarner: boolean;
}
```

**Scoring Algorithm:**
```
score = (annualTaxSaved / effortHours) * confidence

confidence:
  1.0 = exact inputs (user entered exact numbers)
  0.7 = estimated inputs (we estimated Basic/DA)
  0.5 = assumed inputs (user skipped, we assumed)

effort:
  0.5 = submit receipt / send email
  2.0 = open account / buy policy
  4.0 = salary restructuring discussion
  40.0 = buy house / major life decision
```

**Sort:** Descending by score. Show top 5 by default, "Show 3 more" for rest.

### 3.7 Advice Templates by User Profile

#### Profile A: "The First-Jobber" (Age 22-25, Income ₹3L-₹7L)

**Likely Regime:** New (almost always)

**Advice Stack:**
1. **[Quick Win] You pay zero tax. Stop unnecessary TDS.**
   - *"Your income is below ₹12.75 lakh. Under the New Regime, your tax is ₹0. Submit a declaration to your HR so they stop cutting TDS. That's instant money in your salary every month."*
   - Value: `estimatedTDSPerMonth`
   - Action: "Copy email template to HR"

2. **[Smart Move] Start a ₹500/month SIP in ELSS.**
   - *"You don't need it for tax now, but when your salary grows, you'll thank yourself. ELSS has the shortest lock-in (3 years) among 80C options and builds wealth."*
   - Value: ₹0 today, habit formation
   - Action: "Compare top ELSS funds"

3. **[Avoid Mistake] Don't buy a life insurance policy just to "save tax."**
   - *"Agents will push LIC in March. If you don't have dependents, you don't need life insurance yet. Invest instead."*

#### Profile B: "The Metro Renter" (Income ₹8L-₹18L, Pays Rent, No Home Loan)

**Likely Regime:** New (unless massive 80C + HRA)

**Advice Stack:**
1. **[Regime Insight] New Regime saves you ₹X. Here's why your rent doesn't matter.**
   - *"You pay ₹Y rent, but because your Basic+DA is only ₹Z, your HRA exemption is limited to ₹A. That's not enough to beat the New Regime's lower rates + ₹60,000 rebate."*

2. **[Quick Win] Ask your employer for Food Coupons / Meal Passes.**
   - *"₹50 per meal × 2 meals × 22 working days = ₹2,200/month tax-free. That's ₹26,400/year. Both regimes allow this."*
   - Value: Tax saved on ₹26,400 at applicable rate

3. **[Smart Move] Open an NPS Tier-1 account.**
   - *"Even in the New Regime, your employer's NPS contribution is deductible. Ask HR if they offer Corporate NPS. If yes, every ₹1,000 they contribute saves you ₹300 in tax."*

4. **[Avoid Mistake] Don't over-invest in 80C just to "beat" the New Regime.**
   - *"You'd need ₹X in total deductions to make Old Regime better. Chasing that would lock up ₹Y in low-return products. The New Regime wins for you."*

#### Profile C: "The Home Owner" (Has Home Loan, Income ₹12L-₹25L)

**Likely Regime:** Old (home loan interest is the superpower)

**Advice Stack:**
1. **[Big Lever] Your home loan is your superpower. Maximize it.**
   - *"You're paying ₹X interest. That's worth ₹Y in tax savings under the Old Regime. Never switch to New until your loan is paid off."*
   - Value: `homeLoanInterest * marginalRate`

2. **[Quick Win] Claim pre-construction interest.**
   - *"If your house was under construction, you can claim 1/5th of the interest paid during construction. That's an extra ₹Z deduction this year."*

3. **[Smart Move] Split home loan with spouse if joint.**
   - *"Both of you can claim ₹2 lakh each. That's ₹4 lakh total. Make sure the loan and property are co-owned and co-borrowed."*

4. **[Quick Win] Don't forget the principal repayment in 80C.**
   - *"Your principal of ₹X is already part of your 80C. Make sure you haven't double-counted it or missed it."*

#### Profile D: "The Family Provider" (Married, Kids, Parents, Income ₹15L-₹30L)

**Likely Regime:** Old (if optimizing fully)

**Advice Stack:**
1. **[Quick Win] You left ₹X on the table in 80D.**
   - *"You claimed ₹Y for self. But you can also claim your parents' premium up to ₹Z. Total possible: ₹A."*
   - Value: `unused80D * marginalRate`

2. **[Smart Move] Children's tuition fees = hidden 80C.**
   - *"School fees for your kids qualify under 80C. If you're already maxing PF + PPF, this is free money. Keep receipts."*
   - Value: Up to ₹1,50,000 within 80C

3. **[Quick Win] Sukanya Samriddhi Yojana for daughters.**
   - *"If you have a daughter below 10, SSY gives 8.2% returns + 80C benefit. Better than most FDs."*

4. **[Avoid Mistake] You bought health insurance but didn't claim 80D.**
   - *"Many employers provide group insurance and employees forget to claim it. Check your payslip."*

#### Profile E: "The High Earner" (Income > ₹25L)

**Likely Regime:** New (unless deductions > ₹8L)

**Advice Stack:**
1. **[Regime Insight] You need ₹8 lakh in deductions for Old to win. Let's check if that's possible.**
   - *"At your income, the 30% slab hits at ₹10L (Old) vs ₹24L (New). The gap is massive. Only a combination of HRA + Home Loan + 80C + 80D + NPS can bridge it."*

2. **[Smart Move] Maximize employer NPS contribution.**
   - *"In the New Regime, employer NPS up to 14% of Basic+DA is fully deductible. Negotiate a CTC restructuring to shift bonus into employer NPS."*
   - Value: Potentially ₹1L+ tax-free

3. **[Big Lever] Salary restructuring: Shift taxable to tax-efficient components.**
   - *"Ask HR to increase: Food coupons (₹26,400), Mobile/Internet reimbursement (actuals), Car lease + fuel (if applicable), Employer NPS."*

4. **[Avoid Mistake] Don't ignore surcharge.**
   - *"Your income is above ₹50 lakh. Surcharge of 10% applies. This calculator doesn't include it — consult a CA."*

### 3.8 Section 4: Missed Opportunity Banner

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  💡 Your Tax Optimization Gap                               │
│                                                             │
│  If you optimized everything perfectly, you'd pay ₹0 tax.   │
│  Right now, you're paying ₹18,200.                          │
│                                                             │
│  The gap: ₹18,200 — here's how to close it:                 │
│                                                             │
│  [████████░░░░░░░░░░░░] 64% optimized                       │
│                                                             │
│  Top 3 gaps:                                                │
│  • 80C under-utilized by ₹40,000 → Save ₹12,000            │
│  • HRA not fully claimed → Save ₹8,400                      │
│  • No NPS account → Save ₹15,600                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Logic:**
1. Calculate current tax liability under better regime
2. Calculate theoretical minimum tax if maxed every possible deduction
3. Show gap and top 3 specific actions to close it

### 3.9 Section 5: Action Planner

```
┌─────────────────────────────────────────────────────────────┐
│  Your Tax-Saving Checklist                    [3 of 7 done] │
├─────────────────────────────────────────────────────────────┤
│  □ Submit rent receipts to HR              Save ₹12,960    │
│  ✓ Max out 80C via ELSS SIP                Save ₹46,800    │
│  ✓ Claim parents' health insurance         Save ₹7,800     │
│  □ Open NPS Tier-1 account                 Save ₹15,600    │
│  □ Switch to food coupons in salary        Save ₹3,600     │
│  □ Claim LTA for last trip                 Save ₹4,500     │
│  □ Submit professional tax receipt         Save ₹750       │
│                                                             │
│  Total Saved So Far: ₹54,600                                │
│                                                             │
│  [Download Checklist]  [Set Reminders]                      │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Check off items (persist in localStorage)
- Progress: "3 of 7 done"
- Sticky bottom on mobile
- Download as plain text (no PDF)
- Set browser reminders (Notification API)

### 3.10 Section 6: Salary Restructuring Simulator

```
┌─────────────────────────────────────────────────────────────┐
│  🧮 Salary Restructuring Simulator        [Expand ▼]        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Current Structure          Optimized Structure             │
│  ─────────────────          ───────────────────             │
│  Basic: 40%                 Basic: 35%                      │
│  HRA: 15%                   HRA: 20%  ← More HRA!          │
│  Special: 35%               Special: 25%                    │
│  Food: ₹0                   Food: ₹2,200/mo                 │
│  NPS Employer: 0%           NPS Employer: 10%               │
│                                                             │
│  Tax: ₹1,24,500             Tax: ₹98,200                    │
│                             You save: ₹26,300               │
│                                                             │
│  ⚠️ Lower Basic reduces PF & gratuity. Check with HR.       │
│                                                             │
│  [Interactive Sliders]                                      │
│  Basic %: [====●====] 35%                                   │
│  HRA %:   [======●==] 20%                                   │
│  Food:    [●========] ₹2,200                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Inputs:**
- Basic Salary % slider (30-50%)
- HRA % slider (10-30%)
- Food coupons toggle (₹0 / ₹2,200)
- Employer NPS % slider (0-14%)
- Conveyance toggle (₹0 / ₹1,600)
- Mobile/Internet toggle (₹0 / actual)

**Output:**
- Real-time tax calculation
- Warning if Basic < 35% (affects PF, gratuity)
- Warning if HRA > actual rent paid

### 3.11 Section 7: Investment Comparison Tool

```
┌─────────────────────────────────────────────────────────────┐
│  📊 Where Should You Invest Your ₹1.5 Lakh?                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [ELSS]  [PPF]  [NPS]  [Tax FD]  [SSY]                     │
│                                                             │
│  Selected: ELSS                                             │
│                                                             │
│  Returns: 12-15% CAGR (market-linked)                       │
│  Lock-in: 3 years (shortest among 80C)                      │
│  Risk: High (equity exposure)                               │
│  Tax on returns: LTCG 12.5% above ₹1.25L                    │
│  Best for: Young earners, wealth creation                   │
│                                                             │
│  ₹1.5L invested today → ₹5.08L after 10 years               │
│  vs Tax FD → ₹2.95L after 10 years                          │
│  Difference: ₹2.13L more wealth                             │
│                                                             │
│  [Compare All]  [Start ₹500 SIP]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Comparison Table:**
| Feature | ELSS | PPF | NPS | Tax FD | SSY |
|---------|------|-----|-----|--------|-----|
| Returns | 12-15% | 7.1% | 9-11% | 6.5-7.25% | 8.2% |
| Lock-in | 3 yrs | 15 yrs | Till 60 | 5 yrs | 21 yrs |
| Risk | High | Nil | Medium | Nil | Nil |
| Liquidity | Good | Low | Very Low | None | Very Low |
| Tax Status | LTCG 12.5% | EEE | 60% tax-free | Interest taxable | EEE |

### 3.12 Section 8: Personalized Education

```
┌─────────────────────────────────────────────────────────────┐
│  📚 How Your Inputs Affected Your Tax                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Your HRA exemption of ₹1,68,000 reduced your taxable       │
│  salary by that amount. This is only available in the       │
│  Old Regime.                                                │
│                                                             │
│  Your 80C investments of ₹1,50,000 (EPF ₹72,000 + PPF      │
│  ₹48,000 + ELSS ₹30,000) saved you ₹46,800 in the Old      │
│  Regime.                                                    │
│                                                             │
│  In the New Regime, you get a higher standard deduction     │
│  of ₹75,000 instead of ₹50,000.                             │
│                                                             │
│  Because your taxable income is below ₹12 lakh, the New     │
│  Regime rebate wiped out your entire tax.                   │
│                                                             │
│  Your home loan interest of ₹1,80,000 is your biggest       │
│  tax saver. Stick to the Old Regime until it's paid off.    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Technical Implementation

### 4.1 State Integration
```typescript
// Advice engine runs immediately after calculateTax() completes
// Advice is derived state — recalculated on every input change

interface SaveSmartState {
  adviceCards: AdviceCard[];
  taxHealthScore: number;
  missedOpportunity: MissedOpportunity;
  actionPlanner: ActionItem[];
  salaryRestructure: SalaryRestructureResult;
}

interface AdviceCard {
  id: string;
  category: 'quick-win' | 'smart-move' | 'big-lever' | 'avoid-mistake' | 'regime-insight';
  headline: string;
  explanation: string;
  value: number; // Annual tax saved
  effortHours: number;
  confidence: number;
  action: {
    label: string;
    type: 'copy' | 'link' | 'toggle' | 'reminder';
    payload: string;
  };
  mathBreakdown?: string[];
  priority: number;
}
```

### 4.2 Advice Generation Algorithm
```typescript
function generateAdvice(state: TaxState): AdviceCard[] {
  const advice: AdviceCard[] = [];
  const signals = deriveSignals(state);

  // 1. REGIME INSIGHT (Always first)
  if (signals.recommendedRegime === 'new') {
    advice.push({
      category: 'regime-insight',
      headline: `The New Regime saves you ${format(signals.taxSavingsWithRecommended)}`,
      explanation: `Your total deductions are ₹${format(signals.totalDeductions)}. You'd need ₹${format(signals.breakevenDeductions)} to make Old Regime better.`,
      value: signals.taxSavingsWithRecommended,
      priority: 100
    });
  }

  // 2. QUICK WINS
  // HRA optimization
  if (signals.paysRent && signals.hraOptimizationGap > 12000) {
    advice.push({
      category: 'quick-win',
      headline: `You're leaving ₹${format(signals.hraOptimizationGap * 0.3)} in HRA on the table`,
      explanation: `Your rent is high, but your HRA exemption is capped. Ask HR to increase your HRA component or check if you have rent receipts for the full year.`,
      value: signals.hraOptimizationGap * signals.marginalRate,
      action: { label: 'Copy HR email template', type: 'copy', payload: emailTemplate },
      priority: 95
    });
  }

  // 80C gap
  if (signals.unused80C > 10000 && signals.recommendedRegime === 'old') {
    advice.push({
      category: 'quick-win',
      headline: `Invest ₹${format(signals.unused80C)} more to save ₹${format(signals.unused80C * signals.marginalRate)}`,
      explanation: `You have unused 80C room. A ₹${format(signals.unused80C/12)}/month ELSS SIP fills this gap.`,
      value: signals.unused80C * signals.marginalRate,
      action: { label: 'Compare ELSS funds', type: 'link', payload: '/compare/elss' },
      priority: 90
    });
  }

  // 80D gap
  if (signals.unused80D > 5000 && signals.recommendedRegime === 'old') {
    advice.push({
      category: 'quick-win',
      headline: `Claim ₹${format(signals.unused80D)} more under health insurance`,
      explanation: `You can claim premiums for parents, preventive checkups, and top-up plans.`,
      value: signals.unused80D * signals.marginalRate,
      priority: 85
    });
  }

  // 3. SMART MOVES
  // NPS
  if (signals.npsOwnContribution < 50000 && signals.ageCategory === 'below60') {
    advice.push({
      category: 'smart-move',
      headline: `Open an NPS account. Extra ₹50,000 deduction = ₹${format(50000 * signals.marginalRate)} saved`,
      explanation: `This is over and above your 80C limit. It's like a retirement gift from the government.`,
      value: 50000 * signals.marginalRate,
      effortHours: 4,
      priority: 80
    });
  }

  // Employer NPS (both regimes)
  if (!signals.hasEmployerNPS) {
    advice.push({
      category: 'smart-move',
      headline: `Ask HR about Corporate NPS. It's deductible even in the New Regime`,
      explanation: `Employer NPS up to 14% of Basic+DA is tax-free in both regimes. Most IT companies offer this now.`,
      value: estimateEmployerNPSValue(signals),
      effortHours: 2,
      priority: 75
    });
  }

  // 4. BIG LEVERS
  if (signals.hasHomeLoan && signals.homeLoanInterest > 100000 && signals.recommendedRegime === 'old') {
    advice.push({
      category: 'big-lever',
      headline: `Your home loan is saving you ₹${format(signals.homeLoanInterest * signals.marginalRate)} this year`,
      explanation: `This is your biggest tax weapon. Don't switch to New Regime until it's paid off.`,
      value: signals.homeLoanInterest * signals.marginalRate,
      priority: 70
    });
  }

  // 5. AVOID MISTAKES
  if (signals.recommendedRegime === 'new' && signals.totalDeductions > 300000) {
    advice.push({
      category: 'avoid-mistake',
      headline: `Wait — you have ₹${format(signals.totalDeductions)} in deductions but New Regime is still better`,
      explanation: `You'd need ₹${format(signals.breakevenDeductions)} for Old to win. Don't force investments just to chase the Old Regime.`,
      priority: 60
    });
  }

  return advice.sort((a, b) => b.priority - a.priority).slice(0, 7);
}
```

### 4.3 File Structure
```
src/
├── components/
│   ├── SaveSmart/
│   │   ├── SaveSmartContainer.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── RegimeVerdictCard.tsx
│   │   ├── AdviceCard.tsx
│   │   ├── AdviceGrid.tsx
│   │   ├── MissedOpportunityBanner.tsx
│   │   ├── ActionPlanner.tsx
│   │   ├── SalaryRestructureSimulator.tsx
│   │   ├── InvestmentComparison.tsx
│   │   ├── PersonalizedEducation.tsx
│   │   └── TaxHealthScore.tsx
│   └── ui/
│       ├── ProgressRing.tsx
│       ├── Collapsible.tsx
│       └── ValueBox.tsx
├── lib/
│   ├── adviceEngine.ts
│   ├── adviceTemplates.ts
│   ├── breakevenCalculator.ts
│   └── investmentData.ts
├── types/
│   └── saveSmart.ts
└── hooks/
    ├── useAdviceEngine.ts
    └── useLocalStorage.ts
```

---

## 5. Content & Copy Specifications

### 5.1 Tone Rules
- No section numbers in headlines
- Lead with rupee value
- Use "you" and "your"
- Acknowledge effort required
- One-sentence explanations

### 5.2 Example Copy Bank

| Situation | Bad Copy | Good Copy |
|-----------|----------|-----------|
| 80C gap | "You have unused 80C limit of ₹40,000" | "You can invest ₹40,000 more and save ₹12,400 in tax. A ₹3,333/month ELSS SIP covers this." |
| HRA suboptimal | "HRA exemption is lower than statutory limit" | "Your HRA could be ₹2,400 higher per month. Ask HR to restructure — or pay more rent if possible." |
| New regime wins | "New regime is optimal" | "Stick with the New Regime. Even if you maxed every deduction, the Old Regime would cost ₹8,000 more." |
| No health insurance | "80D deduction not availed" | "You have no health insurance. A ₹10,000 premium saves ₹3,000 in tax AND protects you from hospital bills." |

### 5.3 FAQ Content

**Q: Should I buy a tax-saver FD just to save tax?**
A: Only if you need safety. Tax-saver FDs lock your money for 5 years at ~7%. ELSS mutual funds have a 3-year lock-in and historically higher returns, but they fluctuate. If you're young, prefer ELSS. If you're retiring soon, prefer FDs.

**Q: My employer doesn't offer NPS. Can I still claim 80CCD(1B)?**
A: Yes! Open an NPS Tier-1 account yourself through eNPS or a bank. You can claim ₹50,000 extra deduction under 80CCD(1B) in the Old Regime. But in the New Regime, only your employer's contribution helps — your own contribution doesn't.

**Q: I missed the March deadline. Can I still save tax?**
A: For most 80C investments (PPF, ELSS, LIC), the deadline is March 31. If you missed it, you can't claim for this year. But you can start an SIP now for next year. Home loan interest and rent are automatic — nothing to "invest."

**Q: Is it worth switching to the Old Regime just for home loan interest?**
A: Usually yes. A ₹2 lakh home loan interest deduction is worth ₹60,000+ in tax savings at the 30% slab. That's hard to beat in the New Regime.

---

## 6. Edge Cases & Guardrails

### 6.1 Don't Give Bad Advice
| Scenario | Guardrail |
|----------|-----------|
| User in New Regime, suggests 80C | ❌ Block. 80C doesn't work in New Regime. |
| User has no dependents, suggests LIC | ❌ Block. Only suggest insurance if dependents exist. |
| User age > 60, suggests 80TTA | ❌ Block. Suggest 80TTB instead. |
| User income < ₹5L, suggests complex planning | ❌ Block. "You pay zero tax. Just enjoy your money." |
| Home loan under construction | ⚠️ Warn: Interest deduction starts only after completion. |

### 6.2 Confidence Levels
- **High (90%+):** Advice based on exact inputs
- **Medium (70%):** Advice based on estimated inputs
- **Low (50%):** Advice requiring assumptions

Always show confidence badge. Low-confidence advice should be deprioritized.

### 6.3 Disclaimers
- Every advice card footer: *"Tax rules FY 2025-26. Consult a CA for personalized advice."*
- If surcharge may apply (>₹50L): *"Surcharge not included in estimate."*

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Advice engagement rate | >40% | % of result-page viewers who scroll to advice |
| Action taken rate | >15% | % who click "Copy email" / "Remind me" / external links |
| To-do completion rate | >20% | % of checked items in Action Planner |
| Return visits | >25% | % who come back to check/update their plan |
| Share rate | >8% | % who share specific advice cards |

---

## 8. Future Enhancements (Post V1)

1. **Monthly Tax Planner:** Calendar view showing when to pay insurance, invest in ELSS, submit proofs
2. **ELSS Fund Comparison:** Integrate MF data to suggest top-performing tax-saver funds
3. **CA Connect:** "Talk to a CA" button for complex cases (affiliate/referral model)
4. **Year-over-Year Tracker:** Compare FY 2024-25 vs FY 2025-26 to show regime shift impact
5. **Family Mode:** Add spouse income for joint optimization (home loan splitting, etc.)
6. **Dark Mode Optimization:** Ensure all advice cards render beautifully in dark mode
7. **Voice Input:** "Tell me about NPS" — conversational interface for explanations

---

## 9. Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Desktop (>1024px) | 2-column advice grid, sidebar sticky score |
| Tablet (768-1024px) | 2-column grid, stacked hero |
| Mobile (<768px) | Single column, sticky action planner at bottom |

---

## 10. Micro-Interactions

1. **Card Entrance:** Stagger fade-in + translateY(20px→0) over 0.4s
2. **Hover:** Cards lift -2px, border brightens, subtle purple glow
3. **Copy Button:** Morph to "✓ Copied!" green state for 2s
4. **Checklist:** Checking an item strikes through text, slides to "Done" section
5. **Score Ring:** Animate from 0 to final score on page load (1.2s ease-out)
6. **Restructure Slider:** Real-time tax number updates with 0.3s debounce

---

**End of PRD**
