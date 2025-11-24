import React from 'react';

// Define the colors for the list borders
const borderColors = {
    'Star': 'border-green-500',
    'Cash Cow': 'border-blue-500',
    'Question Mark': 'border-yellow-500',
    'Dog': 'border-red-500',
};

// Map quadrant to recommended action
const actionMap = {
    'Star': 'Invest aggressively to maintain market share.',
    'Cash Cow': 'Milk the profits with minimal investment.',
    'Question Mark': 'Analyze closely; either invest to become a Star or divest.',
    'Dog': 'Divest or phase out the product line.',
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
                Menu Item List ({items.length})
            </h3>
            <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                {items.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => onSelect(item)}
                        className={`p-3 border-l-4 rounded-md cursor-pointer transition-all duration-150 shadow-sm 
                            ${borderColors[item.classification]} 
                            ${selectedId === item.name ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-white hover:bg-gray-50'}`}
                    >
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className={`text-sm font-medium ${selectedId === item.name ? 'text-indigo-600' : 'text-gray-500'}`}>
                            {item.classification}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuItemList;

export { actionMap };