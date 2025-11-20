"use client";

import { useState } from 'react';

// 1. IMPORT COMPONENTS
// Use the relative path to import components from your local 'components' folder
import MatrixChart from "../components/MatrixChart.jsx";
import OutputPanel from "../components/OutputPanel.jsx"; // Now imported from its own file

// 2. IMPORT DATA (This line is critical for the app to function)
// We import the JSON object as 'dataFile'
import dataFile from "../data/menu_data.json";


export default function Home() {
  // State to hold the item currently selected on the chart (null by default)
  const [selectedItem, setSelectedItem] = useState(null);

  // The main content of the page
  return (
    // This layout uses Tailwind CSS to put the chart and panel side-by-side
    <main className="grid min-h-screen gap-8 p-8 md:grid-cols-3">
      
      {/* MatrixChart Component (Takes up 2/3 of the screen) */}
      <div className="md:col-span-2">
        <MatrixChart 
          // FINAL FIX: Access the 'menuItems' array inside the imported dataFile object
          data={dataFile.menuItems} 
          onSelect={setSelectedItem} 
        />
      </div>

      {/* OutputPanel Component (Takes up 1/3 of the screen) */}
      <div className="md:col-span-1">
        <OutputPanel item={selectedItem} />
      </div>
    </main>
  );
}