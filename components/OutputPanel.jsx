// Inside OutputPanel.jsx

const OutputPanel = ({ selectedItem }) => {
    if (!selectedItem) {
      return (
        <div className="output-panel">
          <p>Select a menu item</p>
          <p>Tap a bubble in the matrix to view tailored recommendations.</p>
        </div>
      );
    }
  
    // Destructure the processed item data
    const { 
      name, 
      quadrant, 
      growthRate, 
      menuShare, 
      margin, 
      marketingRecommendation 
    } = selectedItem;
  
    return (
      <div className="output-panel">
        <h2>{name}</h2>
        <p>Quadrant: <strong>{quadrant}</strong></p>
        
        {/* Short, Actionable Recommendation */}
        <div className="recommendation-box">
          <h3>🎯 Marketing Priority</h3>
          <p>{marketingRecommendation}</p>
        </div>
  
        {/* Metrics Summary */}
        <div className="metrics-summary">
          <p>Growth Rate: {(growthRate * 100).toFixed(1)}%</p>
          <p>Menu Share: {(menuShare * 100).toFixed(1)}%</p>
          <p>Margin: {(margin * 100).toFixed(1)}%</p>
        </div>
  
        {/* Optional sections remain hidden for MVP */}
        {/* <details>
          <summary>Operational Note</summary>
          <p>{selectedItem.operationalNote}</p>
        </details>
        ...
        */}
      </div>
    );
  };
  
  export default OutputPanel;