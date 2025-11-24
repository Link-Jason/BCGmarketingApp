// Inside /lib/calculations.js

const GROWTH_THRESHOLD = 0.15; // 15%
const SHARE_THRESHOLD = 0.30; // 30%

// Helper to determine the quadrant
const determineQuadrant = (item) => {
  const isHighGrowth = item.growthRate > GROWTH_THRESHOLD;
  const isHighShare = item.menuShare > SHARE_THRESHOLD;

  if (isHighGrowth && isHighShare) return 'Star';
  if (!isHighGrowth && isHighShare) return 'Cash Cow';
  if (isHighGrowth && !isHighShare) return 'Question Mark';
  return 'Dog';
};

// Main function to process the data
export const buildMatrixDataset = (rawData) => {
  // 1. Calculate Menu Share relative to the top seller
  // Assumes rawData is already processed to include growthRate and margin.
  // We'll simulate finding the max share here for completeness.
  const maxSales = Math.max(...rawData.map(item => item.sales || 0));

  return rawData.map(item => {
    // Ensure menuShare is calculated (relative to maxSales)
    const menuShare = maxSales > 0 ? (item.sales / maxSales) : 0;
    
    // Create the core item object with normalized metrics (assuming growthRate and margin exist)
    const processedItem = {
      ...item, // Includes name, sales, growthRate, margin, etc.
      menuShare: menuShare, // X-axis metric
    };

    // 2. Determine Quadrant
    const quadrant = determineQuadrant(processedItem);
    
    // 3. Add 1-line Marketing Recommendation
    let marketingRecommendation;
    switch (quadrant) {
      case 'Star':
        marketingRecommendation = 'High priority — boost visibility.';
        break;
      case 'Cash Cow':
        marketingRecommendation = 'Medium priority — maintain presence.';
        break;
      case 'Question Mark':
        marketingRecommendation = 'Test selectively — targeted campaigns.';
        break;
      case 'Dog':
      default:
        marketingRecommendation = 'Low priority — minimal marketing.';
        break;
    }
    
    // 4. Add the quadrant and recommendation to the item
    return {
      ...processedItem,
      quadrant,
      marketingRecommendation,
      // Optional: Add hidden fields for future expansion
      operationalNote: `[Note for ${quadrant}]`, 
      bizDevIdea: `[Idea for ${quadrant}]`
    };
  });
};