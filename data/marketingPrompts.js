// Define the colors for the list borders and quadrants
const borderColors = {
    'Star': 'border-green-500',
    'Cash Cow': 'border-blue-500',
    'Question Mark': 'border-yellow-500',
    'Dog': 'border-red-500',
};

// Map quadrant to the final, short, and actionable marketing prompts and REFINED REASONS
const MARKETING_ACTION_PROMPTS = {
    'Star': {
        action: 'Boost visibility with strong, consistent marketing while growth is hot.',
        // Refined Reason
        reason: 'Customers already want it — the goal is to stay ahead of competitors while the category is booming.',
    },
    'Cash Cow': {
        action: 'Keep marketing light but steady—protect loyalty and let it earn.',
        // Refined Reason
        reason: 'It’s a reliable bestseller; overspending won’t increase demand much, so keep margins high.',
    },
    'Question Mark': {
        action: 'Test small campaigns first. Scale only if results prove demand.',
        // Refined Reason
        reason: 'Demand is uncertain — the data decides whether it becomes a Star or gets cut.',
    },
    'Dog': {
        action: 'Limit marketing; focus budget where it can make real impact.',
        // Refined Reason
        reason: 'Weak market demand means the ROI on marketing is low — prioritize items with stronger potential.',
    },
};

export { borderColors, MARKETING_ACTION_PROMPTS };