
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-12 h-12 border-4 border-t-purple-400 border-r-purple-400 border-b-gray-600 border-l-gray-600 rounded-full animate-spin"></div>
      <h3 className="text-lg font-semibold text-gray-300">Generating Visual...</h3>
      <p className="text-sm text-gray-500">The AI is working its magic. Please wait a moment.</p>
    </div>
  );
};
