const MARKETING_ACTION_PROMPTS = {
  Star: {
    action: "Invest Heavily to Drive Market Adoption.",
    reason:
      "This product is a winner in a hot market. **Allocate 40-60% of your budget** here. Run high-frequency brand campaigns, broad digital ads, and key opinion leader (KOL) partnerships to drive rapid user acquisition. The goal is competitive dominance before the market cools.",
  },
  'Cash Cow': {
    action: "Maintain Current Investment to Sustain Share.",
    reason:
      "This pays the bills. Focus on efficiency and margin. **Limit budget to 5-10%** and concentrate on high-ROI retention marketing: loyalty programs, targeted upselling, and customer service excellence. The primary goal is to maximize cash flow while preventing competitors from gaining ground.",
  },
  'Question Mark': {
    action: "Test Small Campaigns & Scale What Works.",
    reason:
      "High potential, but risky. **Use 15-20% of budget for experiments.** Run targeted A/B tests on social media. If you see good results (high conversion/low CAC), double down and convert it into a \"Star\". If not, stop spending immediately.",
  },
  Dog: {
    action: "Stop Marketing Spend & Clear Stock.",
    reason:
      "Ads won't fix this. **Cut the marketing budget to 0%.** Rely on organic sales or run a simple discount promotion just to clear out the remaining inventory so you can move on. Avoid further resource drain.",
  },
  Unknown: {
    action: "Data Missing.",
    reason: "Check your revenue and volume data.",
  },
};

const COLOR_MAP = {
  Star: {
    fill: '#48BB78',
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
    bg_quadrant: '#E9F9F0',
  },
  'Cash Cow': {
    fill: '#4299E1',
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-700',
    bg_quadrant: '#EBF8FF',
  },
  'Question Mark': {
    fill: '#ED8936',
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    text: 'text-orange-700',
    bg_quadrant: '#FFF4EB',
  },
  Dog: {
    fill: '#F56565',
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700',
    bg_quadrant: '#FEEFEF',
  },
  Unknown: {
    fill: '#CBD5F5',
    bg: 'bg-gray-50',
    border: 'border-gray-400',
    text: 'text-gray-600',
    bg_quadrant: '#F8FAFC',
  },
};

export { MARKETING_ACTION_PROMPTS, COLOR_MAP };
