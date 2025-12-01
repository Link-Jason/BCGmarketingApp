/**
 * Calculates the BCG classification for a single menu item based on
 * Share (x) and Growth (y) scores, each normalized on a 0-100 scale.
 */
export const classifyItem = (item) => {
  if (item.x == null || item.y == null) {
    return 'Unknown';
  }

  const isHighShare = item.x > 50;
  const isHighGrowth = item.y > 50;

  if (isHighShare && isHighGrowth) return 'Star';
  if (isHighShare && !isHighGrowth) return 'Cash Cow';
  if (!isHighShare && isHighGrowth) return 'Question Mark';
  return 'Dog';
};