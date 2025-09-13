
import React, { useState } from 'react';
import { Download, ChevronUp, Image as ImageIcon, FileText, FileJson } from 'lucide-react';
import { Button } from './ui/Button';

interface ExportControlsProps {
  onExport: (format: 'png' | 'svg' | 'pdf') => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-6 right-6">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-full mb-3 right-0 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-2 flex flex-col gap-2 w-40">
            <button onClick={() => onExport('png')} className="flex items-center gap-3 text-left w-full px-3 py-2 text-sm rounded-md hover:bg-purple-500/20 text-gray-200 transition-colors">
              <ImageIcon className="w-4 h-4" />
              Export as PNG
            </button>
            <button onClick={() => onExport('svg')} className="flex items-center gap-3 text-left w-full px-3 py-2 text-sm rounded-md hover:bg-purple-500/20 text-gray-200 transition-colors">
               <FileJson className="w-4 h-4" />
              Export as SVG
            </button>
            <button onClick={() => onExport('pdf')} className="flex items-center gap-3 text-left w-full px-3 py-2 text-sm rounded-md hover:bg-purple-500/20 text-gray-200 transition-colors">
              <FileText className="w-4 h-4" />
              Export as PDF
            </button>
          </div>
        )}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full !p-3 shadow-lg"
        >
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <Download className="w-6 h-6" />}
        </Button>
      </div>
    </div>
  );
};
