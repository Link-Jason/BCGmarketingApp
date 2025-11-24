import React from 'react';
import { MARKETING_ACTION_PROMPTS } from './MenuItemList'; // Import the new action map

const OutputPanel = ({ selectedItem }) => {
    if (!selectedItem) {
        return (
            <div className="p-6 bg-gray-100 rounded-lg text-center shadow-inner">
                <p className="font-semibold text-gray-600 mb-1">Select a menu item</p>
                <p className="text-sm text-gray-500">
                    Tap a bubble in the matrix or an item in the list to view tailored recommendations.
                </p>
            </div>
        );
    }

    const { name, classification, x, y, margin } = selectedItem;
    
    // Get the structured marketing advice object
    const prompt = MARKETING_ACTION_PROMPTS[classification] || { action: "N/A", reason: "N/A" };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {name}
            </h3>
            
            {/* Quadrant Label */}
            <p className="text-lg mb-6">
                <span className="font-semibold text-gray-600">Quadrant:</span> 
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold 
                    ${classification === 'Star' ? 'bg-green-100 text-green-700' : 
                      classification === 'Cash Cow' ? 'bg-blue-100 text-blue-700' : 
                      classification === 'Question Mark' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'}`}>
                    {classification}
                </span>
            </p>

            {/* Action Prompt */}
            <div className="pt-4 border-t border-indigo-100">
                <h4 className="font-bold text-xl text-indigo-700 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🔥</span> What you should do next
                </h4>
                {/* Action text is the most prominent element */}
                <p className="text-gray-700 text-xl mb-4 leading-snug font-extrabold">
                    {prompt.action}
                </p>

                <h4 className="font-bold text-lg text-indigo-700 mb-2 flex items-center">
                    <span className="text-xl mr-2">💡</span> Why it matters
                </h4>
                <p className="text-gray-600 text-base italic leading-relaxed border-b pb-4">
                    {prompt.reason}
                </p>
            </div>
            
            {/* Key Metrics */}
            <div className="mt-4">
                <h4 className="font-bold text-lg text-gray-700 mb-2">📊 Key Metrics</h4>
                <div className="space-y-1 text-base">
                    <p><span className="font-semibold text-gray-600">Market Growth:</span> {y.toFixed(1)}%</p>
                    <p><span className="font-semibold text-gray-600">Relative Share:</span> {x.toFixed(1)}%</p>
                    {/* If 'margin' is a key in the calculated data (0-1), display it as a percentage */}
                    <p><span className="font-semibold text-gray-600">Margin:</span> {margin != null ? `${(margin * 100).toFixed(1)}%` : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default OutputPanel;