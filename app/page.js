// Inside app/page.js 

// ... imports ...
import { buildMatrixDataset } from "../lib/calculations"; // Ensure this import is correct
import menuData from "../data/menu_data.json"; // Assuming this is how you load static data

export default function Home() {
  // State to hold the item currently selected on the chart or list
  const [selectedItem, setSelectedItem] = useState(null); 
  // 
  // Process the raw data to create the matrix dataset
  // This will now include quadrant and marketingRecommendation
  const PROCESSED_DATA = buildMatrixDataset(menuData); 
  
  // NEW: Calculate the active ID for highlighting the selected item
  // This is a robust way to handle selection and highlighting
  const activeId = selectedItem ? selectedItem.id : null; 

  return (
    // Assuming your main layout handles the side-by-side view
    <main>
      <MatrixChart 
        data={PROCESSED_DATA} 
        activeId={activeId}
        onSelect={setSelectedItem} // Pass the setter for the chart click handler
      />
      <MenuItemList 
        data={PROCESSED_DATA} 
        activeId={activeId}
        onSelect={setSelectedItem} // Pass the setter for the list click handler
      />
      <OutputPanel 
        selectedItem={selectedItem} // Pass the selected item (which now has all the data)
      />
    </main>
  );
}