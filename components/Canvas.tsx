import React from 'react';
import { VisualData, VisualType } from '../types';
import { MindMap } from './visuals/MindMap';
import { Flowchart } from './visuals/Flowchart';
import { ListComponent } from './visuals/ListComponent';
import { Loader } from './ui/Loader';
import { ExportControls } from './ExportControls';
import { Bot, TriangleAlert } from 'lucide-react';

interface CanvasProps {
  visualType: VisualType;
  data: VisualData | null;
  isLoading: boolean;
  error: string | null;
  canvasRef: React.RefObject<HTMLDivElement>;
  onExport: (format: 'png' | 'svg' | 'pdf') => void;
}

const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center gap-4 text-center">
    <Bot className="w-16 h-16 text-purple-400" />
    <h2 className="text-2xl font-bold text-gray-200">Welcome to the AI Visual Generator</h2>
    <p className="max-w-md text-gray-400">
      Enter some text, select a visualization type, and watch the AI bring your ideas to life.
    </p>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center gap-4 text-center text-red-400">
    <TriangleAlert className="w-16 h-16" />
    <h2 className="text-2xl font-bold">An Error Occurred</h2>
    <p className="max-w-md">{message}</p>
  </div>
);


export const Canvas: React.FC<CanvasProps> = ({ visualType, data, isLoading, error, canvasRef, onExport }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (!data) {
      return <WelcomeMessage />;
    }

    switch (visualType) {
      case 'mind_map':
        return <MindMap data={data as any} />;
      case 'flowchart':
        return <Flowchart data={data as any} />;
      case 'list':
        return <ListComponent data={data as any} />;
      default:
        return <WelcomeMessage />;
    }
  };

  return (
    <div className="relative flex-1 bg-gray-800 flex items-center justify-center overflow-auto">
      <div ref={canvasRef} className="bg-gray-800 text-white p-4">
        {renderContent()}
      </div>
      {data && !isLoading && !error && <ExportControls onExport={onExport} />}
    </div>
  );
};
