'use client';

import React, { useState, useEffect } from 'react';
// Explicitly include .js for data files
import { RAW_MENU_ITEMS } from '../data/MenuData.js';
import { classifyItem } from '../lib/calculations.js';
// Explicitly include .jsx for components
import MatrixChart from '../components/MatrixChart.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import MenuItemList from '../components/MenuItemList.jsx';

export default function Page() {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // FIX: Using || 0 to ensure Math.max does not receive 'undefined' or 'null',
        // which causes a client-side crash in some environments.
        const maxRevenue = Math.max(1, ...RAW_MENU_ITEMS.map((item) => item.revenue || 0));
        const maxVolume = Math.max(1, ...RAW_MENU_ITEMS.map((item) => item.volume || 0));

        const calculatedItems = RAW_MENU_ITEMS.map((item) => {
            const x = (item.revenue / maxRevenue) * 100;
            const y = (item.volume / maxVolume) * 100;
            const margin = item.margin ?? 0.5;

            // Clean the name from the "(Classification)" suffix for display
            const cleanedName = item.name.replace(/\s*\([^)]*\)\s*$/, '');

            return {
                id: item.name, // Use full name as unique ID for selection
                name: cleanedName, // Cleaned name for display
                revenue: item.revenue,
                volume: item.volume,
                x,
                y,
                margin,
                classification: classifyItem({ x, y }),
            };
        });

        setMenuItems(calculatedItems);
        setIsLoading(false);
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
        <main className="min-h-screen bg-gray-100 p-4 sm:p-8 font-inter">
            <header className="text-center mb-10 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    BCG Product Portfolio Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                    Analyze product performance and derive strategic marketing actions using the Growth-Share Matrix.
                </p>
            </header>

            <div className="flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto">
                <div className="w-full xl:w-2/3 flex flex-col gap-8">
                    <MatrixChart
                        items={menuItems}
                        onSelect={handleSelectItem}
                        selectedId={selectedItem ? selectedItem.id : null}
                    />
                </div>

                <div className="w-full xl:w-1/3 flex flex-col gap-8">
                    <OutputPanel selectedItem={selectedItem} />
                    
                    {/* The MenuItemList component is now active (uncommented) */}
                    <MenuItemList
                        items={menuItems}
                        onSelect={handleSelectItem}
                        selectedId={selectedItem ? selectedItem.id : null}
                    />
                </div>
            </div>

            <footer className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-500 max-w-7xl mx-auto">
                Data generated for demonstration purposes. Relative Share is based on Revenue, Growth is based on Volume.
            </footer>
        </main>
    );
}