# 🧾 TaxRegime App – Master PRD

---

# 🎯 Product Overview

**TaxRegime** is a smart, user-friendly web application designed to help users:

- Compare **Old vs New Tax Regime**
- Identify **tax-saving opportunities**
- Get **personalized recommendations**
- Learn tax concepts in a **simple, beginner-friendly way**

---

# 🧩 Core Modules

1. 🧮 Tax Calculator  
2. 💡 Save Smart (Smart Suggestions)  
3. 📚 Resources (Learning Hub)  

---

# 🧮 1. Tax Calculator

## 🎯 Objective
Help users calculate and compare tax liability under both regimes.

---

## 📥 Inputs

- Gross Salary  
- Other Income  
- Deductions:
  - 80C  
  - 80D  
  - HRA  
  - NPS  
  - Others  

---

## 📤 Outputs

- Taxable Income  
- Tax Payable (Old vs New)  
- Rebate (87A)  
- 💰 Total Savings  
- 🏆 Recommended Regime  

---

## 🎨 UI Requirements

- Two-column layout:
  - Left → Inputs  
  - Right → Results  

- Comparison Table:
  - Old vs New  
  - Include **Difference column**  

- Highlight:
  - Savings (Green)  
  - Recommended regime  

---

# 💡 2. Save Smart (Smart Suggestions)

## 🎯 Objective
Provide **actionable, personalized suggestions** to reduce tax.

---

## 🧩 Layout Structure

### 💰 Hero Savings Card

- “You Can Save ₹X This Year”
- Subtitle: Based on your profile  
- CTA: “View Action Plan →”  

---

### 📊 Priority Advice (Card Grid)

Display 3–5 cards:

Each card includes:
- Icon  
- Tag (Optimization / Big Lever / Smart Move)  
- Title  
- Short explanation (2 lines max)  
- 💰 Savings amount  
- CTA: Learn More  

---

### ⚙️ CTC Optimizer

Interactive section:

- Sliders:
  - HRA  
  - Food Coupons  

- Live Output:
  - New Take Home Salary  
  - Monthly increase  

---

## 🧠 Logic Engine

Suggestions based on:

- Unused 80C limit  
- Missing 80D  
- NPS eligibility  
- HRA mismatch  
- Regime comparison  

---

## 🎯 UX Principles

- Show **benefit first (₹ saved)**  
- Keep language simple  
- Avoid tax jargon  
- Focus on actionable insights  

---

# 📚 3. Resources (Learning Hub)

## 🎯 Objective
Educate users about tax in a **simple, visual, interactive format**

---

## 🧩 Sections

---

### 🧾 Tax Basics

Topics:
- What is Income Tax  
- Taxable Income  
- Standard Deduction  

👉 UI: Card grid  

---

### ⚖️ Old vs New Regime

- Side-by-side comparison  
- Highlight:
  - Tax rates  
  - Deductions  
  - Best use cases  

👉 Add badges:
- “Best for low deductions”
- “Best for high deductions”

---

### 💰 Ways to Save Tax

Topics:
- Section 80C  
- Section 80D  
- NPS  
- HRA  

👉 UI:
- Tiles with icons  
- Show max savings  

---

### 🏆 Rebate (87A)

- New Regime → ₹7L  
- Old Regime → ₹5L  

👉 UI:
- Highlight card  
- Green emphasis  

---

### ❓ FAQ

Use accordion:

- Which regime is better?  
- Do I need investments?  
- What is deduction?  

---

## 🎯 UX Rules

- Keep content short  
- Avoid long paragraphs  
- Use icons + visuals  
- Make it beginner-friendly  

---

# 🎨 Design System (Global)

## 🌙 Theme

- Dark mode (primary)  

---

## 🎨 Colors

- Background: #0B0F1A  
- Cards: #111827  
- Border: #1F2937  

### Accent Colors:

- Purple: #7C3AED  
- Pink: #EC4899  
- Green: #22C55E  

---

## ✨ Style

- Glassmorphism  
- Rounded corners (16–20px)  
- Soft shadows  
- Clean spacing  
- Smooth animations  

---

# ⚙️ Technical Requirements

- React + Tailwind CSS  
- Component-based architecture  

### Components:

- CalculatorForm  
- ResultsPanel  
- ComparisonTable  
- HeroCard  
- AdviceCard  
- OptimizerCard  
- ResourceCard  
- FAQAccordion  

---

# 📱 Responsiveness

- Desktop → 2-column layout  
- Mobile → stacked cards  

---

# 🚀 Future Enhancements

- Tax planning timeline  
- Investment recommendations  
- PDF tax report  
- User login & saved profiles  

---

# 🎯 Final Vision

Transform the app into:

👉 **A Smart Tax Advisor**

Not just:
👉 A Tax Calculator  

---

# 💡 Key Principle

**“Don’t just calculate tax — help users save it.”**
