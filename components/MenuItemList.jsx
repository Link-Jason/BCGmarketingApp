import React from 'react';
// This import is now correct because you renamed the data file to MarketingPrompts.js
import { borderColors } from '../data/MarketingPrompts.js';

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
                        // Use imported borderColors
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