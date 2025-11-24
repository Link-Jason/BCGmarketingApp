/**
 * Calculates the best-selling item's volume or revenue, which is used to set the market growth/share boundaries.
 * @param {Array<Object>} items - The array of menu item objects.
 * @param {string} key - The key to find the maximum value for (e.g., 'volume' or 'revenue').
 * @returns {number} The maximum value found, or 0 if the array is empty.
 */
function findMaxValue(items, key) {
  if (!items || items.length === 0) return 0;
  return items.reduce((max, item) => Math.max(max, item[key] || 0), 0);
}

/**
 * Classifies an item based on its relative market share and market growth.
 * @param {number} relativeShare - The item's relative market share (x-axis).
 * @param {number} marketGrowth - The item's market growth rate (y-axis).
 * @returns {'Star' | 'Cash Cow' | 'Question Mark' | 'Dog'} The BCG category.
 */
function classifyItem(relativeShare, marketGrowth) {
  // Thresholds (midpoint of the BCG grid, normalized to 50 for simplicity)
  const SHARE_THRESHOLD = 50; 
  const GROWTH_THRESHOLD = 50;

  const isHighShare = relativeShare >= SHARE_THRESHOLD;
  const isHighGrowth = marketGrowth >= GROWTH_THRESHOLD;

  if (isHighShare && isHighGrowth) return 'Star';
  if (isHighShare && !isHighGrowth) return 'Cash Cow';
  if (!isHighShare && isHighGrowth) return 'Question Mark';
  return 'Dog'; // !isHighShare && !isHighGrowth
}

/**
 * Transforms raw menu item data into a dataset suitable for the BCG matrix visualization.
 * It determines thresholds based on the best-selling item.
 * @param {Array<Object>} items - The menu item data array.
 * @returns {Array<Object>} The processed dataset with coordinates and classifications.
 */
export function buildMatrixDataset(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    console.warn("Input array for buildMatrixDataset is empty or not an array.");
    return [];
  }

  // 1. Determine the benchmark for relative share (Max Revenue) and growth (Max Volume)
  const maxRevenue = findMaxValue(items, 'revenue');
  const maxVolume = findMaxValue(items, 'volume');
  
  // Find the maximum absolute revenue for bubble sizing
  const maxAbsoluteRevenue = maxRevenue; 

  if (maxRevenue === 0 || maxVolume === 0) {
    console.error("Revenue or Volume data is missing or zero, cannot calculate BCG coordinates.");
    return items.map(item => ({ 
      ...item, 
      x: 0, 
      y: 0, 
      size: 1, // Default size
      classification: 'Dog' 
    }));
  }

  // 2. Process each item to calculate coordinates, classification, and size
  return items.map((item) => {
    // Relative Market Share (X-axis): Normalized Revenue (0-100)
    const relativeShare = (item.revenue / maxRevenue) * 100;

    // Market Growth (Y-axis): Normalized Volume (0-100)
    const marketGrowth = (item.volume / maxVolume) * 100;
    
    // Bubble Size (Size): Normalized to revenue, where max revenue gives size 100 (for use with Tailwind scale)
    // We add a minimum size (e.g., 20) to ensure small items are still visible
    const bubbleSize = Math.max(20, (item.revenue / maxAbsoluteRevenue) * 100);

    const x = Math.min(100, Math.max(0, relativeShare));
    const y = Math.min(100, Math.max(0, marketGrowth));

    const classification = classifyItem(x, y);

    return {
      name: item.item_name,
      revenue: item.revenue,
      volume: item.volume,
      x: x, // Relative Share (0-100)
      y: y, // Market Growth (0-100)
      size: bubbleSize, // Bubble size based on absolute revenue (0-100)
      classification: classification,
    };
  });
}