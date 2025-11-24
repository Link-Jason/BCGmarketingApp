import React from 'react';

// Define the colors for the bubbles based on their classification
const quadrantColors = {
    'Star': '#48BB78',       // Green
    'Cash Cow': '#4299E1',   // Blue
    'Question Mark': '#F6E05E', // Yellow
    'Dog': '#F56565',        // Red
};

const MatrixChart = ({ items, onSelect, selectedId }) => {
    // Define the dimensions of the chart area (relative to the container)
    const size = 300; // SVG viewBox size
    const half = size / 2;

    // The maximum size for a bubble (based on absolute revenue/volume)
    const MAX_BUBBLE_RADIUS = 30;

    // Find the maximum revenue/volume to scale the bubble sizes proportionally
    // Use 1 as a fallback to avoid division by zero if items array is empty or has zero revenue
    const maxRevenue = Math.max(...items.map(item => item.revenue), 1);
    const maxVolume = Math.max(...items.map(item => item.volume), 1);
    const maxBubbleBase = Math.max(maxRevenue, maxVolume);


    return (
        <div className="flex-none bg-white p-6 rounded-lg shadow-xl ring-1 ring-gray-100 mb-8 w-full md:w-1/2 lg:w-3/5 xl:w-2/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Boston Consulting Group Matrix</h2>

            <div className="flex justify-center items-center relative">
                <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="auto" style={{ maxWidth: '400px', maxHeight: '400px' }}>
                    
                    {/* --- Quadrants (Background Grid) --- */}
                    
                    {/* Stars (Top Right) */}
                    <rect x={half} y={0} width={half} height={half} fill="#F0FFF4" stroke="#48BB78" strokeOpacity="0.5" />
                    <text x={half + 10} y={20} className="text-sm font-bold fill-current text-green-700">Stars</text>

                    {/* Cash Cows (Bottom Right) */}
                    <rect x={half} y={half} width={half} height={half} fill="#EBF8FF" stroke="#4299E1" strokeOpacity="0.5" />
                    <text x={half + 10} y={half + 20} className="text-sm font-bold fill-current text-blue-700">Cash Cows</text>

                    {/* Question Marks (Top Left) */}
                    <rect x={0} y={0} width={half} height={half} fill="#FFFFF0" stroke="#F6E05E" strokeOpacity="0.5" />
                    <text x={10} y={20} className="text-sm font-bold fill-current text-yellow-700">Question Marks</text>

                    {/* Dogs (Bottom Left) */}
                    <rect x={0} y={half} width={half} height={half} fill="#FFF5F5" stroke="#F56565" strokeOpacity="0.5" />
                    <text x={10} y={half + 20} className="text-sm font-bold fill-current text-red-700">Dogs</text>

                    {/* --- Axes Lines --- */}
                    <line x1={0} y1={half} x2={size} y2={half} stroke="#CBD5E0" strokeWidth="1" />
                    <line x1={half} y1={0} x2={half} y2={size} stroke="#CBD5E0" strokeWidth="1" />

                    {/* --- Data Bubbles --- */}
                    {items.map((item, index) => {
                        // X-axis: Relative Market Share (0 to 100). Higher share is further right.
                        // Scale x from [0, 100] to [0, size].
                        const scaledX = (item.x / 100) * size;

                        // Y-axis: Market Growth Rate (0 to 100). Higher growth is further up.
                        // Scale y from [0, 100] to [0, size]. The y-axis is inverted in SVG coordinates.
                        const scaledY = size - ((item.y / 100) * size);

                        // Bubble Radius: Based on the item's revenue (absolute size)
                        const radius = Math.sqrt(item.revenue / maxBubbleBase) * MAX_BUBBLE_RADIUS;
                        
                        // Check if the current item is the selected item for dynamic highlighting
                        const isSelected = item.name === selectedId;

                        return (
                            <g key={index}>
                                {/* Bubble element - Now with an onClick handler! */}
                                <circle
                                    cx={scaledX}
                                    cy={scaledY}
                                    r={radius}
                                    fill={quadrantColors[item.classification]}
                                    fillOpacity="0.75"
                                    stroke={isSelected ? "#3182CE" : "#A0AEC0"}
                                    strokeWidth={isSelected ? 4 : 1}
                                    className="cursor-pointer transition-all duration-300 hover:fill-opacity-100 hover:ring-2 hover:ring-indigo-400"
                                    onClick={() => onSelect(item)} // *** CLICK HANDLER ADDED HERE ***
                                >
                                    {/* Tooltip on hover */}
                                    <title>{`${item.name} (${item.classification})\nShare: ${item.x.toFixed(1)}%\nGrowth: ${item.y.toFixed(1)}%\nRevenue: $${item.revenue.toLocaleString()}`}</title>
                                </circle>

                                {/* Optional: Add text label next to the bubble (only for selected items for clean design) */}
                                {isSelected && (
                                    <text 
                                        x={scaledX + radius + 3} 
                                        y={scaledY + 5} 
                                        fontSize="10" 
                                        fontWeight="bold"
                                        fill="#3182CE"
                                    >
                                        {item.name}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* --- X-Axis Label (Bottom) --- */}
                    <text x={half} y={size + 30} textAnchor="middle" fontSize="12" fill="#4A5568">
                        Relative Market Share (Revenue %)
                    </text>

                    {/* --- Y-Axis Label (Left) --- */}
                    <text x={-20} y={half} textAnchor="middle" transform={`rotate(-90 ${-20} ${half})`} fontSize="12" fill="#4A5568">
                        Market Growth Rate (Volume %)
                    </text>
                    
                </svg>
            </div>

            {/* --- Legend --- */}
            <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2 font-semibold">Legend:</p>
                <div className="flex justify-center space-x-6 text-sm">
                    {Object.entries(quadrantColors).map(([name, color]) => (
                        <div key={name} className="flex items-center space-x-2">
                            <span style={{ backgroundColor: color }} className="w-3 h-3 rounded-full opacity-75"></span>
                            <span className="text-gray-700">{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatrixChart;