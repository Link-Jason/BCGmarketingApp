import React from 'react';

// Define colors for the bubbles
const classificationColors = {
  'Star': 'bg-green-500 hover:bg-green-600',
  'Cash Cow': 'bg-blue-500 hover:bg-blue-600',
  'Question Mark': 'bg-yellow-500 hover:bg-yellow-600',
  'Dog': 'bg-red-500 hover:bg-red-600',
};

// Component for a single, positioned data bubble
const DataBubble = ({ item }) => {
  // Use the calculated size (0-100) to map to a reasonable pixel size range
  // Minimum size 32px (h-8/w-8) to maximum 80px (h-20/w-20)
  const baseSize = 8; 
  // Custom size calculation to map the 0-100 scale to pixel dimensions for Tailwind JIT
  const pixelSize = baseSize + (item.size / 100) * (20 - baseSize); 
  const sizeClass = `h-[${pixelSize}px] w-[${pixelSize}px]`;

  // Calculate position: X is straight percentage, Y is inverted (CSS 0% is top of the relative container)
  const leftPosition = `${item.x}%`; 
  const bottomPosition = `${item.y}%`; 

  return (
    <div
      className={`absolute rounded-full shadow-lg transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 
        ${classificationColors[item.classification]} ${sizeClass} cursor-pointer opacity-75 ring-4 ring-white`}
      style={{ left: leftPosition, bottom: bottomPosition }}
      // Use the 'title' attribute for a tooltip on hover
      title={`${item.name} (${item.classification}) - Share: ${item.x.toFixed(1)}%, Growth: ${item.y.toFixed(1)}%, Revenue: $${item.revenue.toLocaleString()}`}
    >
      {/* Bubble text could go here if needed, but the title attribute handles tooltips simply */}
    </div>
  );
};

// Main BCG Matrix Chart Component
const MatrixChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        No data available to build the BCG Matrix.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Boston Consulting Group Matrix</h2>
        
        {/* Chart Container - Fixed Aspect Ratio 1:1, Responsive Width */}
        <div className="relative w-full max-w-2xl bg-gray-50 border-4 border-gray-300 aspect-square shadow-xl rounded-lg">
            
            {/* Quadrant Backgrounds (50% x 50% areas) */}
            
            {/* Top-Right (Star: High Share, High Growth) */}
            <div className="absolute w-1/2 h-1/2 bottom-1/2 right-0 bg-green-50 opacity-50"></div>
            {/* Top-Left (Question Mark: Low Share, High Growth) */}
            <div className="absolute w-1/2 h-1/2 bottom-1/2 left-0 bg-yellow-50 opacity-50"></div>
            {/* Bottom-Right (Cash Cow: High Share, Low Growth) */}
            <div className="absolute w-1/2 h-1/2 top-1/2 right-0 bg-blue-50 opacity-50"></div>
            {/* Bottom-Left (Dog: Low Share, Low Growth) */}
            <div className="absolute w-1/2 h-1/2 top-1/2 left-0 bg-red-50 opacity-50"></div>
            
            {/* Axes Lines (50% threshold) */}
            <div className="absolute w-full h-0.5 bg-gray-600 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute h-full w-0.5 bg-gray-600 left-1/2 transform -translate-x-1/2"></div>
            
            {/* Data Points (Bubbles) */}
            {data.map((item, index) => (
                <DataBubble key={index} item={item} />
            ))}

            {/* Quadrant Labels */}
            <div className="absolute text-center p-2 text-gray-800 font-bold text-lg pointer-events-none">
                <span className="absolute top-2 left-2 text-xl text-yellow-800">Question Marks</span>
                <span className="absolute top-2 right-2 text-xl text-green-800">Stars</span>
                <span className="absolute bottom-2 left-2 text-xl text-red-800">Dogs</span>
                <span className="absolute bottom-2 right-2 text-xl text-blue-800">Cash Cows</span>
            </div>
            
            {/* X-Axis Label (Bottom) */}
            <div className="absolute w-full bottom-[-2.5rem] text-center text-lg font-semibold text-gray-700">
                Relative Market Share (Revenue %)
            </div>
            {/* Y-Axis Label (Left) - Rotated */}
            <div className="absolute h-full left-[-3.5rem] top-0 flex items-center justify-center">
                <span className="transform -rotate-90 text-lg font-semibold text-gray-700 whitespace-nowrap">
                    Market Growth Rate (Volume %)
                </span>
            </div>
            
        </div>
        
        {/* Legend */}
        <div className="mt-12 p-4 border rounded-lg shadow-sm bg-white grid grid-cols-2 gap-4 text-center w-full max-w-md">
            {Object.keys(classificationColors).map(key => (
                <div key={key} className="flex items-center space-x-2 justify-center">
                    <div className={`h-4 w-4 rounded-full ${classificationColors[key]} opacity-75`}></div>
                    <span className="font-medium text-gray-700">{key}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default MatrixChart;