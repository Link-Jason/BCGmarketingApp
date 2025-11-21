"use client";

import { useState } from 'react';

// 1. IMPORT COMPONENTS
import MatrixChart from "../components/MatrixChart.jsx";
import OutputPanel from "../components/OutputPanel.jsx";

// 2. IMPORT DATA AND LOGIC (The new import is below)
import dataFile from "../data/menu_data.json";
import { buildMatrixDataset } from "../lib/calculations"; // <--- ADDED: Import the processing function


export default function Home() {
  // State to hold the item currently selected on the chart (null by default)
  const [selectedItem, setSelectedItem] = useState(null);

  // <--- ADDED: Process the raw data here before rendering the components
  const processedData = buildMatrixDataset(dataFile.items);

  // The main content of the page
  return (
    // This layout uses Tailwind CSS to put the chart and panel side-by-side
    <main className="grid min-h-screen gap-8 p-8 md:grid-cols-3">
      
      {/* MatrixChart Component (Takes up 2/3 of the screen) */}
      <div className="md:col-span-2">
        <MatrixChart 
          // CHANGED: Pass the fully processed data to the chart
          data={processedData} 
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