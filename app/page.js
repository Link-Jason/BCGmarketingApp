"use client";

import { useState } from 'react';

// 1. IMPORT COMPONENTS
import MatrixChart from "../components/MatrixChart.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import MenuItemList from "../components/MenuItemList.jsx"; // <-- 🚨 NEW: Import the list component

// 2. IMPORT DATA AND LOGIC
import dataFile from "../data/menu_data.json";
import { buildMatrixDataset } from "../lib/calculations";


export default function Home() {
  // State to hold the item currently selected on the chart or list
  const [selectedItem, setSelectedItem] = useState(null);

  // Process the raw data to create the matrix dataset
  const processedData = buildMatrixDataset(dataFile.items);
  
  // 🚨 NEW: Calculate the active ID for highlighting the selected item 🚨
  const activeId = selectedItem?.id || null;

  return (
    // Main layout grid: Chart (2/3 width) | Info Area (1/3 width)
    <main className="grid min-h-screen gap-8 p-8 md:grid-cols-3">
      
      {/* Left/Chart Area (2/3 of the screen) */}
      <div className="md:col-span-2">
        <MatrixChart 
          data={processedData} 
          onSelect={setSelectedItem} 
          activeId={activeId} // Passed to highlight the bubble
        />
      </div>

      {/* 🚨 NEW LAYOUT: Right/Info Area (1/3 of the screen, split vertically into 2 halves) 🚨 */}
      <div className="md:col-span-1 flex flex-col gap-8">
          
          {/* Menu Item List (Top half - handles item selection) */}
          <div className="h-1/2">
            <MenuItemList
                data={processedData}
                onSelect={setSelectedItem}
                activeId={activeId} // Passed to highlight the list item
            />
          </div>
          
          {/* OutputPanel Component (Bottom half - displays details) */}
          <div className="h-1/2">
            <OutputPanel item={selectedItem} />
          </div>
      </div>
    </main>
  );
}