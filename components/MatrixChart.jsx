"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  // 🚨 ADDED: ReferenceLine for quadrant thresholds
  ReferenceLine,
} from "recharts";

// --- 1. CONFIGURATION AND THRESHOLDS ---
const GROWTH_RATE_THRESHOLD = 0.15; // Y-axis
const MENU_SHARE_THRESHOLD = 0.30; // X-axis

const QUADRANT_COLOR = {
  STAR: "#0ea5e9", // Sky Blue
  CASH_COW: "#22c55e", // Emerald Green
  QUESTION_MARK: "#f97316", // Orange
  DOG: "#a1a1aa" // Gray
};

// --- 2. CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded border border-slate-200 bg-white px-4 py-3 shadow">
      <p className="font-semibold text-slate-900">{item.name}</p>
      <p className="text-sm text-slate-500">{item.quadrant}</p>
      <div className="mt-2 space-y-1 text-sm">
        <p>Growth: {(item.growthRate * 100).toFixed(1)}%</p>
        <p>Share: {(item.menuShare * 100).toFixed(1)}%</p>
        <p>Margin: {(item.margin * 100).toFixed(1)}%</p>
      </div>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
export default function MatrixChart({ data = [], onSelect, activeId }) {
  
  // Map data to include color and opacity for highlighting
  const chartData = data.map((item) => ({
    ...item,
    fill: QUADRANT_COLOR[item.quadrantKey] || "#94a3b8",
    opacity: item.id === activeId || !activeId ? 1 : 0.45
  }));

  return (
    <div className="h-[420px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Vertical Line for Menu Share Threshold (X-Axis) */}
          <ReferenceLine 
            x={MENU_SHARE_THRESHOLD} 
            stroke="#4b5563" 
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{ 
                value: `${(MENU_SHARE_THRESHOLD * 100).toFixed(0)}% Share Threshold`, 
                position: 'top', 
                fill: '#4b5563', 
                fontSize: 12,
                dy: -10 
            }}
          />

          {/* Horizontal Line for Growth Rate Threshold (Y-Axis) */}
          <ReferenceLine 
            y={GROWTH_RATE_THRESHOLD} 
            stroke="#4b5563" 
            strokeDasharray="5 5"
            strokeWidth={1.5}
            label={{ 
                value: `${(GROWTH_RATE_THRESHOLD * 100).toFixed(0)}% Growth Threshold`, 
                position: 'right', 
                fill: '#4b5563', 
                fontSize: 12,
                dx: 5
            }}
          />

          <XAxis
            type="number"
            dataKey="menuShare"
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            name="Menu Share"
            label={{ value: "Menu Share", position: "insideBottom", offset: -10 }}
            domain={[0, 1.1]}
          />
          <YAxis
            type="number"
            dataKey="growthRate"
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            name="Growth Rate"
            label={{ value: "Growth Rate", angle: -90, position: "insideLeft" }}
            domain={[-0.2, 1.2]}
          />
          <ZAxis
            type="number"
            dataKey="margin"
            range={[150, 400]}
            formatter={(value) => `${(value * 100).toFixed(1)}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={chartData}
            onClick={(entry) => {
              if (onSelect) onSelect(entry?.payload);
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}