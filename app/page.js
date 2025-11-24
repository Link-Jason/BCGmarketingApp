'use client'; // This is a Client Component because it uses useState and handles user interaction

import { useState } from 'react';

// --- COMPONENT IMPORTS (FIX for 'is not defined' error) ---
// Assuming your components are in a folder named 'components'
import MatrixChart from '../components/MatrixChart'; 
import OutputPanel from '../components/OutputPanel';
import MenuItemList from '../components/MenuItemList'; // Assuming you have a list component

// --- DATA & LOGIC IMPORTS ---
// Assuming your data is in /data and calculations are in /lib
import menuData from '../data/menu_data.json';
import { buildMatrixDataset } from '../lib/calculations';


// 1. Process data once outside the component (or use useMemo if data were dynamic)
// This applies your BCG logic, quadrant labels, and recommendations to the data.
const PROCESSED_DATA = buildMatrixDataset(menuData); 

export default function Home() {
  // 2. State to hold the item currently selected on the chart or list
  const [selectedItem, setSelectedItem] = useState(null); 
  
  // A consistent ID for highlighting the selected item in the chart and list
  // Assumes each item has a unique 'id' field
  const activeId = selectedItem ? selectedItem.id : null; 

  return (
    <div className="dashboard-container">
      
      {/* This div wraps your chart and output panel/list, 
        assuming a standard side-by-side layout (adjust classes as needed)
      */}
      <div className="bcg-main-view">

        {/* 3. MatrixChart receives data and the function to set the selected item. 
          The chart click handler must call onSelect(itemData).
        */}
        <div className="chart-section">
          <h2>BCG Menu Matrix</h2>
          <MatrixChart 
            data={PROCESSED_DATA} 
            activeId={activeId}
            onSelect={setSelectedItem} // Passes the state setter
          />
        </div>

        {/* 4. OutputPanel displays the details of the selected item.
          It now receives the fully processed item, including 'recommendation'.
        */}
        <div className="output-section">
          <OutputPanel 
            selectedItem={selectedItem} 
          />
        </div>
      </div>
      
      {/* 5. MenuItemList (optional UI element) receives the same data and setter.
        A list item click handler must call onSelect(itemData).
      */}
      <div className="list-section">
         <MenuItemList 
            data={PROCESSED_DATA} 
            activeId={activeId}
            onSelect={setSelectedItem}
          />
      </div>

    </div>
  );
}