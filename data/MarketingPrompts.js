// PASTE THIS CORRECT VERSION INTO data/MarketingPrompts.js
export const MARKETING_ACTION_PROMPTS = {
  "Star": {
      action: "Push Visibility: Promote aggressively and make it highly visible.", 
      reason: "Customers love this product and demand is growing. This is a top priority for investment (40-60% of budget).",
  },
  "Cash Cow": {
      action: "Maintain Presence: Keep simple, steady marketing focus.",
      reason: "It sells consistently without needing heavy promotion. Maintain efficient spending (5-10% of budget) to protect margins.",
  },
  "Question Mark": {
      action: "Run Small Tests: Experiment with new angles, promos, or placement.",
      reason: "There is potential, but it hasn't become a strong seller yet. Use a moderate budget (20-40%) to discover what helps it grow.",
  },
  "Dog": {
      action: "Reduce Focus: Only promote with a clear, specific, limited purpose.",
      reason: "Low sales and weak customer interest mean the impact is limited. Reduce investment immediately (0-5% of budget).",
  },
  "Unknown": {
      action: "No Data Available.",
      reason: "Missing metrics — cannot classify.",
  }
};