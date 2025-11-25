'use client';

import { useState, useEffect } from 'react';
// Import the components with the .jsx extension
import MatrixChart from '../components/MatrixChart.jsx';
import MenuItemList from '../components/MenuItemList.jsx';
import OutputPanel from '../components/OutputPanel.jsx';

// Import raw data using the new export name and .js extension
import { RAW_MENU_ITEMS } from '../data/MenuData.js';


/**
 * Calculates the BCG Classification for a single menu item based on x (Share) and y (Growth).
 * X > 50% AND Y > 50% => Star
 */
const classifyItem = (item) => {
    // Check if item has the necessary properties before comparison
    if (item.x == null || item.y == null) {
        return 'Unknown';
    }
    
    const isHighShare = item.x > 50;
    const isHighGrowth = item.y > 50;

    if (isHighShare && isHighGrowth) return 'Star';
    if (isHighShare && !isHighGrowth) return 'Cash Cow';
    if (!isHighShare && isHighGrowth) return 'Question Mark';
    return 'Dog'; // Dog
};


/**
 * Main application component for the BCG Marketing Dashboard.
 */
export default function Home() {
    // Initialize state
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // --- 1. FIND BENCHMARKS (Max Revenue and Volume) ---
        // Find maximum values to establish a 100% benchmark for scaling
        const maxRevenue = Math.max(...RAW_MENU_ITEMS.map(item => item.revenue), 1);
        const maxVolume = Math.max(...RAW_MENU_ITEMS.map(item => item.volume), 1);

        // --- 2. CALCULATE AND TRANSFORM DATA ---
        const calculatedItems = RAW_MENU_ITEMS.map(item => {
            // Calculate x (Relative Market Share) - Revenue / Max Revenue * 100
            const x = (item.revenue / maxRevenue) * 100;

            // Calculate y (Market Growth Rate) - Volume / Max Volume * 100
            const y = (item.volume / maxVolume) * 100;
            
            const margin = 0.5; // Placeholder: You can replace this with a real calculation later

            // Clean the name from the "(Classification)" suffix for display in the OutputPanel
            // e.g., "Espresso Shot (Dog)" becomes "Espresso Shot"
            const cleanedName = item.name.replace(/\s*\([^)]*\)\s*$/, '');
            
            return {
                // 'id' is used for selection/tracking (full name)
                id: item.name, 
                // 'name' is used for display in the OutputPanel header (cleaned name)
                name: cleanedName, 
                revenue: item.revenue,
                volume: item.volume,
                x, 
                y,
                margin,
                // Classification logic uses the calculated x and y values
                classification: classifyItem({ x, y }),
            };
        });

        // --- 3. SET STATE ---
        setMenuItems(calculatedItems);
        setIsLoading(false);
        // Automatically select the first item using its new 'id'
        if (calculatedItems.length > 0) {
            setSelectedItem(calculatedItems[0]);
        }
    }, []);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-xl font-medium text-indigo-600">Loading BCG Data...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    BCG Marketing Strategy Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                    Analyze menu item portfolio using the Growth-Share Matrix.
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
                {/* Left Column: Matrix Chart and Menu List */}
                <div className="w-full lg:w-2/3 flex flex-col gap-8">
                    <MatrixChart 
                        items={menuItems} 
                        onSelect={handleSelectItem}
                        // CRITICAL: Now using item.id for selection
                        selectedId={selectedItem ? selectedItem.id : null} 
                    />
                    <div className="bg-white p-6 rounded-lg shadow-xl ring-1 ring-gray-100">
                        <MenuItemList
                            items={menuItems}
                            onSelect={handleSelectItem}
                            // CRITICAL: Now using item.id for selection
                            selectedId={selectedItem ? selectedItem.id : null}
                        />
                    </div>
                </div>

                {/* Right Column: Output Panel */}
                <div className="w-full lg:w-1/3 sticky top-8 h-fit">
                    <OutputPanel selectedItem={selectedItem} />
                </div>
            </div>
            
            <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                Data generated for demonstration purposes.
            </footer>
        </main>
    );
}