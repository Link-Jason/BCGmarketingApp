/**
 * Centralized data for the BCG Matrix Dashboard.
 * Contains border colors for the UI and highly refined action/reason prompts 
 * for the OutputPanel based on quadrant classification.
 */

export const borderColors = {
    'Star': 'border-green-500',
    'Cash Cow': 'border-blue-500',
    'Question Mark': 'border-yellow-500',
    'Dog': 'border-red-500',
};

export const MARKETING_ACTION_PROMPTS = {
    'Star': {
        action: "Boost visibility with strong, consistent marketing while growth is hot.",
        reason: "Customers already want it – stay ahead of competitors while the category is booming.",
    },
    'Cash Cow': {
        action: "Keep marketing light but steady—protect loyalty and let it earn.",
        reason: "It's a reliable bestseller; overspending won't increase demand much, so keep margins high.",
    },
    'Question Mark': {
        action: "Test small campaigns. Scale only if results prove demand.",
        reason: "Demand is uncertain. Focused testing minimizes financial risk before committing large resources.",
    },
    'Dog': {
        action: "Consider de-prioritizing marketing spend and plan for divestment.",
        reason: "Low growth potential combined with low market share means resources are better allocated to Stars or Cash Cows.",
    },
};