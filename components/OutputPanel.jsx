import React from 'react';
import { actionMap } from './MenuItemList'; // Import the action map

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

    const { name, classification, revenue, volume, x, y } = selectedItem;
    const recommendedAction = actionMap[classification] || "No defined action.";

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                {name}
            </h3>
            
            <div className="space-y-3">
                
                <p className="text-lg">
                    <span className="font-semibold text-gray-600">Quadrant:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-bold 
                        ${classification === 'Star' ? 'bg-green-100 text-green-700' : 
                          classification === 'Cash Cow' ? 'bg-blue-100 text-blue-700' : 
                          classification === 'Question Mark' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'}`}>
                        {classification}
                    </span>
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <p><span className="font-semibold text-gray-600">Revenue:</span> ${revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    <p><span className="font-semibold text-gray-600">Volume (Units):</span> {volume.toLocaleString()}</p>
                    <p><span className="font-semibold text-gray-600">Market Share (X):</span> {x.toFixed(1)}%</p>
                    <p><span className="font-semibold text-gray-600">Market Growth (Y):</span> {y.toFixed(1)}%</p>
                </div>

                <div className="pt-4 border-t mt-4">
                    <h4 className="font-bold text-lg text-indigo-700 mb-2">Strategic Recommendation</h4>
                    <p className="text-gray-700 italic">{recommendedAction}</p>
                </div>
            </div>
        </div>
    );
};

export default OutputPanel;