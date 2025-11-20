"use client";

import { cn } from "@/lib/utils"; // CORRECTED import path
import { DollarSign, Percent, TrendingUp } from "lucide-react";

// Accent colors corresponding to the BCG Quadrants
const quadrantAccent = {
  STAR: "text-star",
  CASH_COW: "text-cashcow",
  QUESTION_MARK: "text-question",
  DOG: "text-dog"
};

// Definitions for the metrics to display
const metricLabels = [
  { key: "growthRate", label: "Growth Rate" },
  { key: "menuShare", label: "Menu Share" },
  { key: "margin", label: "Gross Margin" }
];

const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;

export default function OutputPanel({ item }) {
  if (!item) {
    return (
      <div className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-700">
          Select a menu item
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Tap a bubble in the matrix to view tailored recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-wide text-slate-500">
          Selected Item
        </p>
        <h2 className="text-2xl font-bold text-slate-900">{item.name}</h2>
        <p
          className={cn(
            "mt-2 text-sm font-semibold uppercase tracking-wide",
            quadrantAccent[item.quadrantKey]
          )}
        >
          {item.quadrant}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metricLabels.map((metric) => (
          <div
            key={metric.key}
            className="rounded-lg border border-slate-100 bg-slate-50 p-4"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>
            <p className="text-xl font-semibold text-slate-900">
              {formatPercent(item[metric.key])}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-slate-900/90 p-5 text-slate-100">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Recommendation
        </p>
        <p className="mt-2 text-base leading-relaxed">{item.recommendation}</p>
      </div>
    </div>
  );
}