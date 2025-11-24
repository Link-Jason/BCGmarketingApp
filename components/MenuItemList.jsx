import React from 'react';

// Define the colors for the list borders
const borderColors = {
    'Star': 'border-green-500',
    'Cash Cow': 'border-blue-500',
    'Question Mark': 'border-yellow-500',
    'Dog': 'border-red-500',
};

// Map quadrant to the final, short, and actionable marketing prompts
const MARKETING_ACTION_PROMPTS = {
    'Star': {
        // FINAL: Punchy Action (Keep momentum high)
        action: 'Boost visibility with strong, consistent marketing while growth is hot.',
        // FINAL: Simple Reason (Marketer language)
        reason: 'Customers already want it — keep the momentum high.',
    },
    'Cash Cow': {
        // FINAL: Focus on efficiency and loyalty protection
        action: 'Keep marketing light but steady—protect loyalty and let it earn.',
        // FINAL: Simple Reason (Marketer language)
        reason: 'It performs well without heavy promotion.',
    },
    'Question Mark': {
        // FINAL: Emphasis on testing before commitment
        action: 'Test small campaigns first. Scale only if results prove demand.',
        // FINAL: Simple Reason (Marketer language)
        reason: 'It might win big, or flop — validate before investing.',
    },
    'Dog': {
        // FINAL: Focus on resource allocation
        action: 'Limit marketing; focus budget where it can make real impact.',
        // FINAL: Simple Reason (Marketer language)
        reason: 'Low growth and low demand give weak returns.',
    },
};


const MenuItemList = ({ items, onSelect, selectedId }) => {
    if (!items || items.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500 bg-gray-100 rounded-lg">
                No menu items loaded.
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Menu Items ({items.length})
            </h3>
            <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                {items.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => onSelect(item)}
                        // Keep border for quadrant visual cue and highlight selection
                        className={`p-3 border-l-4 rounded-md cursor-pointer transition-all duration-150 shadow-sm 
                            ${borderColors[item.classification]} 
                            ${selectedId === item.name ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-white hover:bg-gray-50'}`}
                    >
                        {/* Simple List Format: [Name] - [Quadrant] */}
                        <p className="font-semibold text-gray-900">
                            {item.name} <span className="text-sm font-medium text-gray-500"> — {item.classification}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuItemList;

// Export map for use in OutputPanel
export { MARKETING_ACTION_PROMPTS };