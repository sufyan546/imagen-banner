
import React from 'react';

interface StyleSelectorProps {
  title: string;
  styles: string[];
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  disabled: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ title, styles, selectedStyle, setSelectedStyle, disabled }) => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
      <h3 className="block text-lg font-medium text-slate-300 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {styles.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            disabled={disabled}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              selectedStyle === style
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};
