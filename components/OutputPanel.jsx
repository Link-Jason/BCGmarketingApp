import React from 'react';
import { Zap, Target, TrendingUp, DollarSign } from 'lucide-react';
import { MARKETING_ACTION_PROMPTS, COLOR_MAP } from '../data/MarketingPrompts';

const OutputPanel = ({ selectedItem }) => {
    if (!selectedItem) {
        return (
            <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-2xl text-center h-[350px] flex flex-col justify-center">
                <Target className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <p className="font-extrabold text-2xl text-gray-700 mb-2">Portfolio Insights</p>
                <p className="text-base text-gray-500">
                    Select a product from the matrix or list to view a tailored marketing strategy.
                </p>
            </div>
        );
    }

    const { name, classification, x, y, margin } = selectedItem;
    const prompt = MARKETING_ACTION_PROMPTS[classification] || MARKETING_ACTION_PROMPTS.Unknown;
    const colors = COLOR_MAP[classification] || COLOR_MAP.Unknown;

    // FIX: Using Object Lookup (Dictionary) for cleaner icon/background logic
    const { icon, bg } = {
        Star: { icon: '⭐', bg: 'bg-green-600' },
        'Cash Cow': { icon: '💰', bg: 'bg-blue-600' },
        'Question Mark': { icon: '❓', bg: 'bg-yellow-600' }, // Adjusted to yellow-600 for consistency
        Dog: { icon: '🐕', bg: 'bg-red-600' },
    }[classification];


    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
            {/* The headerBg prop is now replaced by 'bg' */}
            <div className={`p-4 ${bg} text-white`}>
                <h3 className="text-lg font-semibold mb-1 opacity-90">Selected Product Strategy</h3>
                <h2 className="text-3xl font-extrabold flex items-center">
                    <span className="text-2xl mr-2">{icon}</span> {name}
                </h2>
            </div>

            <div className="p-6">
                <div
                    className={`p-2 rounded-lg mb-6 text-center shadow-inner ${colors.bg} border-2 border-dashed ${
                        colors.text.replace('text', 'border')
                    }`}
                >
                    <p className={`font-bold text-lg ${colors.text} uppercase tracking-wider`}>
                        {classification} Quadrant
                    </p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                    <h4 className="font-bold text-xl text-indigo-700 mb-2 flex items-center">
                        <Zap className="w-5 h-5 mr-2" /> Marketing Recommendation
                    </h4>
                    <p className="text-gray-900 tracking-tight text-2xl mb-4 leading-snug font-extrabold border-l-4 pl-3 border-indigo-200">
                        {prompt.action}
                    </p>

                    <h4 className="font-bold text-lg text-gray-700 mb-2 flex items-center pt-4 border-t border-gray-100">
                        <Target className="w-4 h-4 mr-2" /> Budget & Focus
                    </h4>
                    <p className="text-gray-600 text-base italic leading-relaxed pb-4">{prompt.reason}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-lg text-gray-700 mb-3">📊 Key Metrics</h4>
                    <div className="space-y-2 text-base grid grid-cols-2 gap-4">
                        <p className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2 text-indigo-500" />
                            <span className="font-semibold text-gray-600">Growth Rate:</span> {y.toFixed(1)}%
                        </p>
                        <p className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
                            <span className="font-semibold text-gray-600">Relative Share:</span> {x.toFixed(1)}%
                        </p>
                        <p className="flex items-center">
                            <span className="font-semibold text-gray-600">Margin:</span>{' '}
                            {margin != null ? `${(margin * 100).toFixed(1)}%` : 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutputPanel;