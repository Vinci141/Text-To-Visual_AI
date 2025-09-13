
import React from 'react';
import { Bot } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center h-16 px-6 bg-gray-900 border-b border-gray-700 shrink-0">
      <div className="flex items-center gap-3">
        <Bot className="w-8 h-8 text-purple-400" />
        <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-lexend">
          AI Text-to-Visual Generator
        </h1>
      </div>
    </header>
  );
};
