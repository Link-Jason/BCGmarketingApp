import React from 'react';
import { MARKETING_ACTION_PROMPTS, COLOR_MAP } from '../data/MarketingPrompts';

/**
 * MatrixChart Component (SVG Bubble Chart)
 */
const MatrixChart = ({ items, onSelect, selectedId }) => {
  const SIZE = 600;
  const AXIS_LABEL_SPACE = 60;
  const MAX_R_SCALING = 25;
  const MAX_BUBBLE_R = Math.max(8, MAX_R_SCALING * 1.2);
  const MATRIX_START = AXIS_LABEL_SPACE;
  const MATRIX_SIZE = SIZE - 2 * AXIS_LABEL_SPACE;
  const PLOT_SIZE = MATRIX_SIZE - 2 * MAX_BUBBLE_R;
  const PLOT_START = MATRIX_START + MAX_BUBBLE_R;
  const HALF_MATRIX_SIZE = MATRIX_SIZE / 2;
  const maxRevenue = Math.max(...items.map((i) => i.revenue), 1);
  const verticalLabelX = SIZE - AXIS_LABEL_SPACE + 20;

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl ring-1 ring-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
        BCG Growth–Share Matrix
      </h2>

      <div className="w-full flex justify-center">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width="100%"
          height="auto"
          style={{ maxWidth: '700px' }}
          className="overflow-visible"
        >
          <g>
            <rect
              x={MATRIX_START}
              y={MATRIX_START}
              width={HALF_MATRIX_SIZE}
              height={HALF_MATRIX_SIZE}
              fill={COLOR_MAP['Question Mark'].bg_quadrant}
              rx="8"
            />
            <rect
              x={MATRIX_START + HALF_MATRIX_SIZE}
              y={MATRIX_START}
              width={HALF_MATRIX_SIZE}
              height={HALF_MATRIX_SIZE}
              fill={COLOR_MAP['Star'].bg_quadrant}
              rx="8"
            />
            <rect
              x={MATRIX_START}
              y={MATRIX_START + HALF_MATRIX_SIZE}
              width={HALF_MATRIX_SIZE}
              height={HALF_MATRIX_SIZE}
              fill={COLOR_MAP['Dog'].bg_quadrant}
              rx="8"
            />
            <rect
              x={MATRIX_START + HALF_MATRIX_SIZE}
              y={MATRIX_START + HALF_MATRIX_SIZE}
              width={HALF_MATRIX_SIZE}
              height={HALF_MATRIX_SIZE}
              fill={COLOR_MAP['Cash Cow'].bg_quadrant}
              rx="8"
            />
          </g>

          <line
            x1={MATRIX_START}
            x2={SIZE - AXIS_LABEL_SPACE}
            y1={MATRIX_START + HALF_MATRIX_SIZE}
            y2={MATRIX_START + HALF_MATRIX_SIZE}
            stroke="#A0AEC0"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <line
            x1={MATRIX_START + HALF_MATRIX_SIZE}
            x2={MATRIX_START + HALF_MATRIX_SIZE}
            y1={MATRIX_START}
            y2={SIZE - AXIS_LABEL_SPACE}
            stroke="#A0AEC0"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {items.map((item) => {
            const x = PLOT_START + (item.x / 100) * PLOT_SIZE;
            const y = PLOT_START + PLOT_SIZE - (item.y / 100) * PLOT_SIZE;
            const r = Math.max(
              8,
              Math.sqrt(item.revenue / maxRevenue) * MAX_R_SCALING * 1.2,
            );
            const selected = selectedId === item.id;
            const color = COLOR_MAP[item.classification]?.fill || '#bbb';
            const prompt = MARKETING_ACTION_PROMPTS[item.classification] || MARKETING_ACTION_PROMPTS.Unknown;

            return (
              <g key={item.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={color}
                  fillOpacity={selected ? 0.95 : 0.8}
                  stroke={selected ? '#2B6CB0' : '#A0AEC0'}
                  strokeWidth={selected ? 4 : 1}
                  className="cursor-pointer transition-all duration-200 hover:fill-opacity-100"
                  onClick={() => onSelect(item)}
                >
                  <title>
                    {`${item.name} (${item.classification})\nShare: ${item.x.toFixed(
                      1,
                    )}%\nGrowth: ${item.y.toFixed(1)}%\nRevenue: $${item.revenue.toLocaleString()}\nAction: ${
                      prompt.action
                    }`}
                  </title>
                </circle>

                {selected && (
                  <text
                    x={x}
                    y={y - r - 8}
                    textAnchor="middle"
                    className="text-[14px] font-semibold fill-indigo-700 pointer-events-none bg-white p-1 rounded"
                  >
                    {item.name}
                  </text>
                )}
              </g>
            );
          })}

          <text
            x={MATRIX_START + (HALF_MATRIX_SIZE * 0.5)}
            y={MATRIX_START - 15}
            textAnchor="middle"
            className="text-[14px] font-bold fill-gray-600"
          >
            ← LOW SHARE
          </text>
          <text
            x={MATRIX_START + (HALF_MATRIX_SIZE * 1.5)}
            y={MATRIX_START - 15}
            textAnchor="middle"
            className="text-[14px] font-bold fill-gray-600"
          >
            HIGH SHARE →
          </text>
          <text
            x={verticalLabelX}
            y={MATRIX_START + (HALF_MATRIX_SIZE * 0.5)}
            textAnchor="middle"
            transform={`rotate(-90 ${verticalLabelX} ${
              MATRIX_START + HALF_MATRIX_SIZE * 0.5
            })`}
            className="text-[14px] font-bold fill-gray-600"
          >
            HIGH GROWTH →
          </text>
          <text
            x={verticalLabelX}
            y={MATRIX_START + (HALF_MATRIX_SIZE * 1.5)}
            textAnchor="middle"
            transform={`rotate(-90 ${verticalLabelX} ${
              MATRIX_START + HALF_MATRIX_SIZE * 1.5
            })`}
            className="text-[14px] font-bold fill-gray-600"
          >
            ← LOW GROWTH
          </text>
          <text
            x={SIZE / 2}
            y={SIZE - 10}
            textAnchor="middle"
            className="text-[16px] font-bold fill-gray-800"
          >
            Relative Market Share (Market Share %)
          </text>
          <text
            x={AXIS_LABEL_SPACE / 2}
            y={SIZE / 2}
            textAnchor="middle"
            transform={`rotate(-90 ${AXIS_LABEL_SPACE / 2} ${SIZE / 2})`}
            className="text-[16px] font-bold fill-gray-800"
          >
            Market Growth Rate (Category Growth %)
          </text>
        </svg>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-100">
        <p className="text-xl text-gray-700 mb-4 font-bold text-center">
          Strategic Quadrants
        </p>
        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-4 text-sm">
          {Object.entries(COLOR_MAP).map(([name, data]) => (
            <div
              key={name}
              className={`flex items-center space-x-2 p-2 px-4 rounded-full border-2 ${data.border} shadow-inner font-semibold`}
              style={{ backgroundColor: data.bg_quadrant }}
            >
              <span
                style={{ backgroundColor: data.fill }}
                className="w-4 h-4 rounded-full opacity-85 shadow-md ring-1 ring-white"
              ></span>
              <span className="text-gray-800">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixChart;