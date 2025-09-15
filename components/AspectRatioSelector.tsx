
import React from 'react';

interface AspectRatioSelectorProps {
  title: string;
  ratios: { value: string; label: string; }[];
  selectedRatio: string;
  setSelectedRatio: (ratio: string) => void;
  disabled: boolean;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ title, ratios, selectedRatio, setSelectedRatio, disabled }) => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
      <h3 className="block text-lg font-medium text-slate-300 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {ratios.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => setSelectedRatio(ratio.value)}
            disabled={disabled}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              selectedRatio === ratio.value
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span>{ratio.value}</span>
            <span className="text-xs opacity-80 ml-1.5">({ratio.label})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
