import React from 'react';

// Define colors for the bubbles
const classificationColors = {
  'Star': { class: 'bg-green-500 hover:bg-green-600', text: 'Stars' },
  'Cash Cow': { class: 'bg-blue-500 hover:bg-blue-600', text: 'Cash Cows' },
  'Question Mark': { class: 'bg-yellow-500 hover:bg-yellow-600', text: 'Question Marks' },
  'Dog': { class: 'bg-red-500 hover:bg-red-600', text: 'Dogs' },
};

// Map calculated size (0-100) to standard Tailwind size classes for safety
const getSizeClass = (size) => {
    if (size >= 80) return 'h-20 w-20'; // max size
    if (size >= 60) return 'h-16 w-16';
    if (size >= 40) return 'h-12 w-12';
    if (size >= 20) return 'h-8 w-8'; // min size
    return 'h-6 w-6';
};

// Component for a single, positioned data bubble
const DataBubble = ({ item, onSelect, selected }) => {
  const sizeClass = getSizeClass(item.size);

  // CRITICAL FIX: Clamp x and y between 0.1 and 99.9% to prevent bubbles from spilling outside the chart boundaries.
  const clampedX = Math.max(0.1, Math.min(99.9, item.x)); 
  const clampedY = Math.max(0.1, Math.min(99.9, item.y)); 

  // Calculate position: X is straight percentage, Y is inverted (CSS 0% is top of the relative container)
  const leftPosition = `${clampedX}%`; 
  const bottomPosition = `${clampedY}%`; 

  return (
    <div
      onClick={() => onSelect(item)} // Handle click
      className={`absolute rounded-full shadow-lg transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 
        ${classificationColors[item.classification].class} ${sizeClass} cursor-pointer opacity-80 border-2 border-white
        ${selected ? 'ring-4 ring-offset-2 ring-indigo-500 z-10' : 'hover:opacity-100 hover:scale-110'}`} // Highlight selection
      style={{ left: leftPosition, bottom: bottomPosition }}
      // Use the 'title' attribute for a tooltip on hover
      title={`${item.name} (${item.classification}) - Share: ${item.x.toFixed(1)}%, Growth: ${item.y.toFixed(1)}%`}
    >
    </div>
  );
};

// Main BCG Matrix Chart Component
const MatrixChart = ({ data, onSelect, selectedItem }) => {
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
            <div className="absolute w-1/2 h-1/2 bottom-1/2 right-0 bg-green-50 opacity-40"></div>
            {/* Top-Left (Question Mark: Low Share, High Growth) */}
            <div className="absolute w-1/2 h-1/2 bottom-1/2 left-0 bg-yellow-50 opacity-40"></div>
            {/* Bottom-Right (Cash Cow: High Share, Low Growth) */}
            <div className="absolute w-1/2 h-1/2 top-1/2 right-0 bg-blue-50 opacity-40"></div>
            {/* Bottom-Left (Dog: Low Share, Low Growth) */}
            <div className="absolute w-1/2 h-1/2 top-1/2 left-0 bg-red-50 opacity-40"></div>
            
            {/* Axes Lines (50% threshold) */}
            <div className="absolute w-full h-0.5 bg-gray-600 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute h-full w-0.5 bg-gray-600 left-1/2 transform -translate-x-1/2"></div>
            
            {/* Data Points (Bubbles) */}
            {data.map((item, index) => (
                <DataBubble 
                    key={index} 
                    item={item} 
                    onSelect={onSelect} // Pass click handler
                    selected={selectedItem && selectedItem.name === item.name} // Pass selection state
                />
            ))}

            {/* Quadrant Labels - Fixed absolute positioning and improved styling */}
            <div className="absolute top-0 left-0 w-full h-full p-4 pointer-events-none">
                <span className="absolute top-2 left-2 text-2xl text-yellow-800 font-extrabold opacity-75">Question Marks</span>
                <span className="absolute top-2 right-2 text-2xl text-green-800 font-extrabold opacity-75">Stars</span>
                <span className="absolute bottom-2 left-2 text-2xl text-red-800 font-extrabold opacity-75">Dogs</span>
                <span className="absolute bottom-2 right-2 text-2xl text-blue-800 font-extrabold opacity-75">Cash Cows</span>
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
                    <div className={`h-4 w-4 rounded-full ${classificationColors[key].class} opacity-75`}></div>
                    <span className="font-medium text-gray-700">{classificationColors[key].text}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default MatrixChart;