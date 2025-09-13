// Implemented the Canvas component, which was previously empty.
import React, { useRef, useState } from 'react';
import { Loader } from './ui/Loader';
import { MindMap } from './visuals/MindMap';
import { Flowchart } from './visuals/Flowchart';
import { ListComponent } from './visuals/ListComponent';
import { ExportControls } from './ExportControls';
import { VisualControls } from './VisualControls';
import { VisualData, VisualType, MindMapNode, FlowchartItem, ListItem } from '../types';
import { BrainCircuit } from 'lucide-react';

interface CanvasProps {
  visualData: VisualData | null;
  visualType: VisualType;
  isLoading: boolean;
  error: string | null;
}

const isMindMapData = (data: VisualData | null): data is MindMapNode => {
    return data !== null && 'label' in data && 'icon' in data && !Array.isArray(data);
};

const isFlowchartData = (data: VisualData | null): data is FlowchartItem[] => {
    return Array.isArray(data) && (data.length === 0 || (data.length > 0 && 'type' in data[0]));
}

const isListData = (data: VisualData | null): data is ListItem[] => {
    return Array.isArray(data) && (data.length === 0 || (data.length > 0 &&'description' in data[0]));
}

export const Canvas: React.FC<CanvasProps> = ({ visualData, visualType, isLoading, error }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <p className="text-red-400 text-center max-w-md">{error}</p>;
    }
    if (!visualData) {
      return (
        <div className="text-center text-gray-500 flex flex-col items-center gap-4">
            <BrainCircuit size={48} />
            <h2 className="text-2xl font-semibold">Visualize Your Ideas</h2>
            <p>Enter some text and choose a visualization type to get started.</p>
        </div>
      )
    }

    // This is the element that will be exported
    return (
        <div ref={canvasRef} className="w-full h-full flex items-center justify-center p-4 bg-gray-900">
             {visualType === 'mind_map' && isMindMapData(visualData) && <MindMap data={visualData} zoom={zoom} />}
             {visualType === 'flowchart' && isFlowchartData(visualData) && <Flowchart data={visualData} />}
             {visualType === 'list' && isListData(visualData) && <ListComponent data={visualData} />}
        </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gray-900 flex items-center justify-center overflow-auto">
      {visualData && <ExportControls targetRef={canvasRef} />}
      {renderContent()}
      {visualType === 'mind_map' && visualData && <VisualControls zoom={zoom} setZoom={setZoom} />}
    </div>
  );
};

export default Canvas;
