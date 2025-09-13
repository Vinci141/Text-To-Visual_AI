import React, { forwardRef } from 'react';
import type { VisualData, StyleConfig, MindMapNode, FlowchartNode, ListItem } from '../types';
import { MindMap } from './visuals/MindMap';
import { Flowchart } from './visuals/Flowchart';
import { ListComponent } from './visuals/ListComponent';
import { Loader } from './ui/Loader';
import { AlertTriangle, Lightbulb } from 'lucide-react';

interface CanvasProps {
  visualData: VisualData | null;
  visualType: 'mind_map' | 'flowchart' | 'list';
  isLoading: boolean;
  error: string | null;
  styleConfig: StyleConfig;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(
  ({ visualData, visualType, isLoading, error, styleConfig }, ref) => {
    
    const renderContent = () => {
      if (isLoading) {
        return <Loader />;
      }
      if (error) {
        return (
          <div className="text-center text-red-400 flex flex-col items-center gap-4">
            <AlertTriangle className="w-12 h-12" />
            <h3 className="text-lg font-semibold">Generation Failed</h3>
            <p className="max-w-md text-sm text-gray-400">{error}</p>
          </div>
        );
      }
      if (visualData) {
        // When a flowchart or list is requested, the data should be an array.
        // This defensive check wraps the data in an array if the AI happens to 
        // return a single object instead, preventing the app from crashing.
        const normalizedData = (visualType === 'flowchart' || visualType === 'list') && !Array.isArray(visualData)
          ? [visualData]
          : visualData;

        return (
          <div id="visual-output" className="p-8 bg-gray-900">
            {visualType === 'mind_map' && <MindMap data={normalizedData as MindMapNode} styleConfig={styleConfig} />}
            {visualType === 'flowchart' && <Flowchart data={normalizedData as FlowchartNode[]} styleConfig={styleConfig} />}
            {visualType === 'list' && <ListComponent data={normalizedData as ListItem[]} styleConfig={styleConfig} />}
          </div>
        );
      }
      return (
        <div className="text-center text-gray-500 flex flex-col items-center gap-4">
          <Lightbulb className="w-12 h-12 text-yellow-400" />
          <h3 className="text-lg font-semibold">Your visual will appear here</h3>
          <p className="max-w-md text-sm">Enter some text, choose your options, and click "Generate Visual" to get started.</p>
        </div>
      );
    };

    return (
      <div ref={ref} className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-auto bg-gray-900">
        {renderContent()}
      </div>
    );
  }
);