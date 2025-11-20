"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";

const QUADRANT_COLOR = {
  STAR: "#0ea5e9",
  CASH_COW: "#22c55e",
  QUESTION_MARK: "#f97316",
  DOG: "#a1a1aa"
};

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

export default function MatrixChart({ data = [], onSelect, activeId }) {
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