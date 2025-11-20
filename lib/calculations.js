// lib/calculations.js

// Thresholds for classifying BCG quadrants
const GROWTH_THRESHOLD = 0.40; // 40% YOY Growth
const SHARE_THRESHOLD = 0.45; // 45% Menu Share

// Constants needed for determineQuadrant function (used later in the file)
const HIGH_GROWTH_THRESHOLD = GROWTH_THRESHOLD;
const HIGH_SHARE_THRESHOLD = SHARE_THRESHOLD;

const QUADRANTS = {
  STAR: { label: "Star", recommendation: "Invest and grow." },
  CASH_COW: { label: "Cash Cow", recommendation: "Maintain position and harvest profits." },
  QUESTION_MARK: { label: "Question Mark", recommendation: "Invest selectively or divest." },
  DOG: { label: "Dog", recommendation: "Divest or stop investment." }
};

// Function to calculate key metrics and determine the BCG quadrant
export const formatNumber = (value) =>
  Number.isFinite(value) ? Number(value.toFixed(3)) : 0;

export function calculateGrowthRate(current, previous) {
  if (!previous) {
    return current > 0 ? 1 : 0;
  }

  return formatNumber((current - previous) / previous);
}

export function calculateMenuShare(itemSales, bestSales) {
  if (!bestSales) return 0;
  return formatNumber(itemSales / bestSales);
}

export function calculateMargin(price, cogs) {
  if (!price) return 0;
  return formatNumber((price - cogs) / price);
}

export function determineQuadrant(growth, share) {
  const isHighGrowth = growth > HIGH_GROWTH_THRESHOLD;
  const isHighShare = share > HIGH_SHARE_THRESHOLD;

  if (isHighGrowth && isHighShare) return "STAR";
  if (!isHighGrowth && isHighShare) return "CASH_COW";
  if (isHighGrowth && !isHighShare) return "QUESTION_MARK";
  return "DOG";
}

export function buildMatrixDataset(items = []) {
  const bestSellingValue = items.reduce(
    (max, item) => Math.max(max, item.sales_current_period || 0),
    0
  );

  return items.map((item) => {
    const growthRate = calculateGrowthRate(
      item.sales_current_period,
      item.sales_previous_period
    );
    const menuShare = calculateMenuShare(
      item.sales_current_period,
      bestSellingValue
    );
    const margin = calculateMargin(item.price, item.cogs);
    const quadrantKey = determineQuadrant(growthRate, menuShare);
    const quadrant = QUADRANTS[quadrantKey];

    return {
      ...item,
      growthRate,
      menuShare,
      margin,
      quadrant: quadrant.label,
      quadrantKey,
      recommendation: quadrant.recommendation
    };
  });
}