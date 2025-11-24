'use client'; 

import { useState } from 'react'; // <--- MUST BE INCLUDED
import { buildMatrixDataset } from '../lib/calculations';
// NOTE: Importing MatrixChart instead of BCGMatrixChart to match your local file structure.
import MatrixChart from '../components/MatrixChart'; 
import menuData from '../data/menu_data.json'; 
// NOTE: Including these components based on your file structure, though they are placeholders in this code.
import MenuItemList from '../components/MenuItemList.jsx';
import OutputPanel from '../components/OutputPanel.jsx';

// --- ROBUST DATA EXTRACTION LOGIC ---
let rawItems;
// Safely extract the item array from the imported JSON
if (menuData && menuData.items && Array.isArray(menuData.items)) {
    rawItems = menuData.items;
} else if (Array.isArray(menuData)) {
    rawItems = menuData;
} else if (menuData && menuData.data && Array.isArray(menuData.data)) {
    rawItems = menuData.data;
} else {
    console.error("Could not find the array of menu items in menu_data.json. Check the JSON structure.");
    rawItems = [];
}
// --- END DATA EXTRACTION ---

// Process the safely extracted array of items
const PROCESSED_DATA = buildMatrixDataset(rawItems);

export default function App() {
  // State management setup for item selection (even if MenuItemList/OutputPanel are placeholders)
  const [selectedItem, setSelectedItem] = useState(null); 
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">BCG Matrix Dashboard</h1>
        <p className="text-xl text-gray-500">Strategic Portfolio Analysis for Menu Items</p>
      </header>

      <main className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6 grid lg:grid-cols-3 gap-8">
        
        {/* BCG Chart Area (takes 2/3 width on large screens) */}
        <div className="lg:col-span-2 flex flex-col items-center">
            <MatrixChart data={PROCESSED_DATA} />
            <div className="mt-12 w-full text-center text-gray-500 text-sm italic">
                Bubble size reflects absolute revenue. X-axis is Relative Market Share (Revenue), Y-axis is Market Growth Rate (Volume).
            </div>
        </div>

        {/* Side Panel for List/Recommendations (takes 1/3 width) */}
        <div className="lg:col-span-1 border-l pl-6 border-gray-200">
            {/* The MenuItemList and OutputPanel are added here based on your file structure, 
                ready for future implementation of selection logic. */}
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Menu Item List</h3>
            <MenuItemList 
                items={PROCESSED_DATA} 
                onSelect={setSelectedItem}
                selectedId={selectedItem ? selectedItem.name : null}
            />
            <OutputPanel selectedItem={selectedItem} />
        </div>

      </main>

      <footer className="mt-8 text-center text-sm text-gray-400">
        © 2024 BCG Matrix Analyzer | Data analysis powered by local calculation engine.
      </footer>
    </div>
  );
}