// Implemented the Header component, which was previously empty.
import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-3">
        <BrainCircuit className="w-8 h-8 text-purple-500" />
        <h1 className="text-2xl font-bold text-white">AI Visualizer</h1>
      </div>
    </header>
  );
};

export default Header;
