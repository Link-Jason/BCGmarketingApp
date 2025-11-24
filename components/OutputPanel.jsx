import React from 'react';
// Import centralized data from the new file
import { MARKETING_ACTION_PROMPTS } from '../data/marketingPrompts';

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
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {name}
            </h3>
            
            {/* Quadrant Label - HIGH VISIBILITY HEADER */}
            <div className={`p-3 rounded-lg mb-6 shadow-md
                ${classification === 'Star' ? 'bg-green-500' : 
                  classification === 'Cash Cow' ? 'bg-blue-500' : 
                  classification === 'Question Mark' ? 'bg-yellow-500' : 
                  'bg-red-500'}`}>
                <p className="font-bold text-xl text-white">
                    {classification} Quadrant
                </p>
            </div>

            {/* Action Prompt - FRONT & CENTER */}
            <div className="pt-2 border-t border-indigo-100">
                <h4 className="font-bold text-xl text-indigo-700 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🔥</span> Immediate Action
                </h4>
                {/* Action text is now LARGER and most prominent */}
                <p className="text-gray-900 text-2xl mb-4 leading-snug font-extrabold">
                    {prompt.action}
                </p>

                <h4 className="font-bold text-lg text-indigo-700 mb-2 flex items-center">
                    <span className="text-xl mr-2">💡</span> Why it Matters
                </h4>
                {/* This is the refined, operator-friendly reason */}
                <p className="text-gray-600 text-base italic leading-relaxed pb-4">
                    {prompt.reason}
                </p>
            </div>
            
            {/* Key Metrics - Moved to the bottom */}
            <div className="mt-4 pt-4 border-t border-gray-200">
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