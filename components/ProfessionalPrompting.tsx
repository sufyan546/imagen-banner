
import React from 'react';

interface ProfessionalPromptingProps {
    title: string;
    colors: string;
    onColorsChange: (colors: string) => void;
    bannerText: string;
    onBannerTextChange: (text: string) => void;
    reserveTextSpace: boolean;
    onReserveTextSpaceChange: (enabled: boolean) => void;
    disabled: boolean;
}

export const ProfessionalPrompting: React.FC<ProfessionalPromptingProps> = ({
    title,
    colors,
    onColorsChange,
    bannerText,
    onBannerTextChange,
    reserveTextSpace,
    onReserveTextSpaceChange,
    disabled
}) => {
    return (
        <div className="p-6 rounded-2xl shadow-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
            <h3 className="text-lg font-medium text-slate-300 mb-4">{title}</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="colors" className="block text-sm font-medium text-slate-400 mb-2">
                        Colors
                    </label>
                    <input
                        id="colors"
                        type="text"
                        value={colors}
                        onChange={(e) => onColorsChange(e.target.value)}
                        disabled={disabled}
                        placeholder="e.g., blue + white, or black + gold"
                        className="block w-full p-2 bg-gray-900/70 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 text-gray-200 placeholder-slate-500"
                    />
                </div>
                <div>
                    <label htmlFor="banner-text" className="block text-sm font-medium text-slate-400 mb-2">
                        Text
                    </label>
                    <input
                        id="banner-text"
                        type="text"
                        value={bannerText}
                        onChange={(e) => onBannerTextChange(e.target.value)}
                        disabled={disabled}
                        placeholder="e.g., Summer Sale, New Arrivals"
                        className="block w-full p-2 bg-gray-900/70 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 text-gray-200 placeholder-slate-500"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">Reserve space for text/logo</span>
                    <label htmlFor="text-space-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="text-space-toggle"
                            className="sr-only peer"
                            checked={reserveTextSpace}
                            onChange={(e) => onReserveTextSpaceChange(e.target.checked)}
                            disabled={disabled}
                            aria-label="Reserve space for text or logo"
                        />
                        <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-slate-800 peer-focus:ring-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};
