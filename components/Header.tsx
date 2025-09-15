
import React from 'react';
import { ArtIcon } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 border-b border-slate-700/50 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <ArtIcon className="w-8 h-8 mr-3 text-cyan-400" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
          Imagen Banner Generator
        </h1>
      </div>
    </header>
  );
};
