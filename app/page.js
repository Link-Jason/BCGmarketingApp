'use client'; 

// Import useState (needed for interactivity)
import { useState } from 'react'; 
import { buildMatrixDataset } from '../lib/calculations';
import MatrixChart from '../components/MatrixChart'; 
import MenuItemList from '../components/MenuItemList'; 
import OutputPanel from '../components/OutputPanel'; 
import menuData from '../data/menu_data.json'; 

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
  // State to hold the item currently selected on the chart or list
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
            {/* PASS THE SETTER FUNCTION to MatrixChart */}
            <MatrixChart 
                data={PROCESSED_DATA} 
                onSelect={setSelectedItem}
                selectedItem={selectedItem}
            />
            <div className="mt-12 w-full text-center text-gray-500 text-sm italic">
                Bubble size reflects absolute revenue. X-axis is Relative Market Share (Revenue), Y-axis is Market Growth Rate (Volume).
            </div>
        </div>

        {/* Side Panel for List/Recommendations (takes 1/3 width) */}
        <div className="lg:col-span-1 border-l pl-6 border-gray-200">
            {/* Use the correct prop name: items, not data */}
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