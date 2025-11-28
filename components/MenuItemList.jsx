import React from 'react';
import { List } from 'lucide-react';
// FIX: Added the explicit file extension (.js) to ensure the import is successful.
import { MARKETING_ACTION_PROMPTS, COLOR_MAP } from '../data/MarketingPrompts.js';

const MenuItemList = ({ items, onSelect, selectedId }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500 bg-gray-50 rounded-lg">
        No menu items loaded. Check data source.
      </div>
    );
  }

  return (
    <div className="mb-2 bg-white p-6 rounded-xl shadow-lg ring-1 ring-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
        <List className="w-5 h-5 mr-2 text-indigo-500" /> All Menu Items ({items.length})
      </h3>
      <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
        {items.map((item) => {
          const colors = COLOR_MAP[item.classification] || COLOR_MAP.Unknown;
          const prompt = MARKETING_ACTION_PROMPTS[item.classification] || MARKETING_ACTION_PROMPTS.Unknown;
          const isSelected = item.id === selectedId;

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`p-3 border-l-4 rounded-lg cursor-pointer transition-all duration-200
                ${colors.border}
                ${
                  isSelected
                    ? `${colors.bg} ring-2 ring-offset-2 ring-indigo-500 shadow-md`
                    : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-lg'
                }`}
            >
              <p className="font-semibold text-gray-900 flex justify-between items-center">
                <span>{item.name}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${colors.bg} ${colors.text} uppercase`}>
                  {item.classification}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Share: {item.x.toFixed(1)}% | Growth: {item.y.toFixed(1)}%
              </p>
              <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                {prompt.action}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuItemList;