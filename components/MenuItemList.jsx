
import React from 'react';
import { cn } from "@/lib/utils"; 

// Use the same quadrant colors you defined elsewhere for border highlights
const QUADRANT_COLOR = {
    STAR: "border-sky-500",
    CASH_COW: "border-emerald-500",
    QUESTION_MARK: "border-orange-500",
    DOG: "border-gray-500"
};

export default function MenuItemList({ data = [], onSelect, activeId }) {

    if (!data.length) {
        return <p className="p-4 bg-gray-50 text-center text-gray-500">No menu items loaded.</p>;
    }

    return (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200 h-full overflow-y-auto">
            <h3 className="text-xl font-bold mb-3 text-slate-800">Menu Item List ({data.length})</h3>
            
            <div className="space-y-2">
                {data.map(item => (
                    <div
                        key={item.id} 
                        className={cn(
                            "p-3 rounded-lg border-l-4 cursor-pointer transition-colors",
                            "hover:bg-slate-50",
                            QUADRANT_COLOR[item.quadrantKey], 
                            {
                                // Apply special styling if this item is currently selected
                                "bg-slate-100 ring-2 ring-inset ring-slate-400": item.id === activeId
                            }
                        )}
                        // 🚨 CRITICAL: This is the click handler 🚨
                        onClick={() => onSelect(item)} 
                    >
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.quadrant}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}