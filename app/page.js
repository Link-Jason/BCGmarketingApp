'use client';

import { useState, useEffect } from 'react';
// Import the components and add the .jsx extension
import MatrixChart from '../components/MatrixChart.jsx';
import MenuItemList from '../components/MenuItemList.jsx';
import OutputPanel from '../components/OutputPanel.jsx';

// Import raw data and ensure .js extension
import { MENU_ITEMS } from '../data/MenuData.js';


/**
 * Calculates the BCG Classification for a single menu item.
 * Classification is based on Relative Market Share (X) and Market Growth Rate (Y).
 * X > 50% AND Y > 50% => Star
 * X > 50% AND Y <= 50% => Cash Cow
 * X <= 50% AND Y > 50% => Question Mark
 * X <= 50% AND Y <= 50% => Dog
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
    // FIX: Initialize menuItems state to an EMPTY ARRAY [] to prevent the .map() error during build/prerender.
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple client-side data simulation
        const calculatedItems = MENU_ITEMS.map(item => ({
            ...item,
            // Calculate classification based on the raw x/y values
            classification: classifyItem(item),
        }));

        setMenuItems(calculatedItems);
        setIsLoading(false);
        // Automatically select the first item if data exists
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
                        items={menuItems} // Now guaranteed to be an array []
                        onSelect={handleSelectItem}
                        selectedId={selectedItem ? selectedItem.name : null}
                    />
                    <div className="bg-white p-6 rounded-lg shadow-xl ring-1 ring-gray-100">
                        <MenuItemList
                            items={menuItems} // Now guaranteed to be an array []
                            onSelect={handleSelectItem}
                            selectedId={selectedItem ? selectedItem.name : null}
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