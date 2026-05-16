# India Tax Calculator – Phased Execution Plan

This plan breaks down the development of the India Tax Calculator (FY 2025-26) into small, manageable phases. Each phase is designed to be completed in a single session. Crucially, at the end of every phase, the application will be in a fully runnable, visually coherent state so you can test it, review the progress, and course-correct if necessary.

---

### Phase 1: Project Skeleton & Landing Page
**Goal:** Establish the technical foundation and create the entry point.
*   **Tasks:**
    *   Initialize the project repository (e.g., React + Vite + Tailwind, or Vanilla JS/HTML/CSS based on preference).
    *   Set up global styles, typography (geometric sans + display font), and color palette (Navy, Off-white, Amber, Green).
    *   Build the static Landing Page including the Hero section, "Why This Is Different" cards, and the mock Result Preview.
*   **Runnable State:** You can open the app and see a fully styled, responsive landing page. The "Start Calculator" button is present but may just log to the console or show a generic alert.

### Phase 2: Wizard Shell & Navigation Flow
**Goal:** Build the structural container for the questions without complex logic.
*   **Tasks:**
    *   Create the main Wizard layout: a left pane for questions, a right pane for the Live Preview Panel, and a progress bar at the top.
    *   Set up the global state store to hold user inputs.
    *   Create placeholder UI for Steps 1 through 10.
    *   Implement smooth "Back" and "Continue" navigation between steps.
*   **Runnable State:** You can click "Start" on the landing page and navigate smoothly forward and backward through all 10 empty wizard steps. The progress bar updates as you move.

### Phase 3: Core Inputs & Basic Estimation (Steps 1-3)
**Goal:** Capture the most critical data and provide immediate visual feedback.
*   **Tasks:**
    *   Build the specialized UI input components (large number inputs with ₹, card selectors, toggle cards).
    *   Implement Step 1 (Take-home pay), Step 2 (Age group), and Step 3 (Salary Deductions).
    *   Implement the initial logic to estimate Gross Salary from take-home pay.
    *   Connect these inputs to the Live Preview Panel so it displays the estimated gross salary.
*   **Runnable State:** The first three steps are fully functional. As you type your take-home pay, you instantly see your estimated gross salary update in the Live Preview Panel.

### Phase 4: Deduction Data Collection (Steps 4-9)
**Goal:** Complete the forms for all potential tax-saving inputs.
*   **Tasks:**
    *   Build the conditional UI for Step 4 (Rent & HRA) and Step 5 (Home Loan).
    *   Build Step 6 (Health Insurance), Step 7 (80C checklist), Step 8 (NPS), and Step 9 (Other Income).
    *   Implement all input validation rules (e.g., max limits, preventing negative numbers).
    *   Save all gathered data into the central application state.
*   **Runnable State:** You can walk through the entire wizard. Complex conditional questions (e.g., asking for rent amount only if "Yes" is selected) work flawlessly.

### Phase 5: Tax Engine & Real-Time Preview
**Goal:** Implement the math and bring the Live Preview to life.
*   **Tasks:**
    *   Implement the core Tax Calculation Engine for both the New Regime and Old Regime (including HRA math, 80C caps, and marginal relief).
    *   Wire the engine to the Live Preview Panel so it animates and shows actual calculated taxes for both regimes as the user types.
    *   Build Step 10 (Summary Screen) to display a clean review of all entered data.
*   **Runnable State:** A fully functional calculator. You can enter all data and watch the tax numbers and the "winner" dynamically update in the side panel after every keystroke. 

### Phase 6: Results Page Core
**Goal:** Build the detailed, side-by-side comparison.
*   **Tasks:**
    *   Create the final Results Page layout.
    *   Implement the Verdict Banner clearly highlighting the recommended regime and exact savings.
    *   Build the Side-by-Side Comparison Table showing Gross Income, specific deductions, and Final Tax.
    *   Build the Slab-by-Slab Tax Breakdown accordions.
*   **Runnable State:** Completing the wizard (or clicking calculate on Step 10) takes you to a beautifully formatted results page showing exactly how the taxes were calculated and compared.

### Phase 7: Insights Engine & Mobile Polish
**Goal:** Add intelligence, tax suggestions, and finalize the UX.
*   **Tasks:**
    *   Implement the Personalized Insights Engine to generate plain-English explanations of *why* a regime won.
    *   Add the conditional "Tax-Saving Suggestions" to guide users on remaining 80C/NPS limits.
    *   Polish the mobile experience (ensuring the Live Preview collapses into a sticky bottom card).
    *   Perform QA testing against the provided worked examples in the PRD.
*   **Runnable State:** The complete, polished product. It is fully responsive, provides intelligent advice, and accurately handles all edge cases detailed in the PRD.
