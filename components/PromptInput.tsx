
import React from 'react';

interface PromptInputProps {
  title: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ title, prompt, setPrompt, isLoading }) => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
      <label htmlFor="prompt" className="block text-lg font-medium text-slate-300 mb-2">
        {title}
      </label>
      <div className="relative">
        <textarea
          id="prompt"
          name="prompt"
          rows={4}
          className="block w-full p-4 bg-gray-900/70 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-200 resize-none text-gray-200 placeholder-slate-500"
          placeholder="e.g., A futuristic city skyline at sunset, with flying cars and neon lights"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
