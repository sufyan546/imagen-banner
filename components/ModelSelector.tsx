
import React from 'react';
import { ImageUploader } from './ImageUploader';

interface PersonSelectorProps {
  title: string;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  pose: string;
  onPoseChange: (pose: string) => void;
  onCharacterImageSelect: (file: { file: File, dataUrl: string } | null) => void;
  disabled: boolean;
}

export const PersonSelector: React.FC<PersonSelectorProps> = ({
  title,
  enabled,
  onEnabledChange,
  pose,
  onPoseChange,
  onCharacterImageSelect,
  disabled
}) => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-300">
          {title}
        </h3>
        <label htmlFor="person-toggle" className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            id="person-toggle" 
            className="sr-only peer"
            checked={enabled}
            onChange={(e) => onEnabledChange(e.target.checked)}
            disabled={disabled}
            aria-label={`Enable adding a person`}
          />
          <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-slate-800 peer-focus:ring-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
        </label>
      </div>

      {enabled && (
        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-4 animate-fade-in">
            <ImageUploader
              title="Character Reference"
              onImageSelect={onCharacterImageSelect}
              disabled={disabled}
            />
          <div>
            <label htmlFor="person-pose" className="block text-sm font-medium text-slate-400 mb-2">Pose / Action</label>
            <input
              id="person-pose"
              type="text"
              value={pose}
              onChange={(e) => onPoseChange(e.target.value)}
              disabled={disabled}
              placeholder="e.g., smiling, holding the product"
              className="block w-full p-2 bg-gray-900/70 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 text-gray-200 placeholder-slate-500"
            />
          </div>
        </div>
      )}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
