import React, { useLayoutEffect, useRef, useState } from 'react';
import { MindMapNode as MindMapNodeType } from '../../types';
import { Icon } from '../ui/Icon';

// Helper to generate a unique key for each SVG line
const getLineKey = (fromId: string, toId: string) => `${fromId}->${toId}`;

// SVG Path component for the curved line
const ConnectorLine = ({ d }: { d: string }) => (
  <path
    d={d}
    fill="none"
    stroke="#6B7280" // gray-500
    strokeWidth="1.5"
  />
);

// Recursive Node component
interface NodeProps {
  node: MindMapNodeType;
  level: number;
  idPath: string;
}

const Node: React.FC<NodeProps> = ({ node, level, idPath }) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex items-center my-2">
      {/* Node itself */}
      <div
        id={idPath} // Assign ID for DOM lookup
        className={`
          flex items-center gap-2 p-3 rounded-lg shadow-lg
          border-2 border-purple-500/50 flex-shrink-0 z-10
          ${level === 0 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-200'}
        `}
      >
        <Icon name={node.icon} size={20} />
        <span className="font-semibold">{node.label}</span>
      </div>
      
      {/* Children Container */}
      {hasChildren && (
        <div className="flex flex-col justify-center pl-16">
          {node.children!.map((child, index) => (
            <Node key={index} node={child} level={level + 1} idPath={`${idPath}-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main MindMap component
interface MindMapProps {
  data: MindMapNodeType;
  zoom: number;
}

export const MindMap: React.FC<MindMapProps> = ({ data, zoom }) => {
  const [lines, setLines] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const newLines: React.ReactNode[] = [];
    const containerRect = containerRef.current.getBoundingClientRect();

    const calculateLines = (node: MindMapNodeType, idPath: string) => {
      if (!node.children || node.children.length === 0) {
        return;
      }

      const parentEl = document.getElementById(idPath);
      if (!parentEl) return;

      const parentRect = parentEl.getBoundingClientRect();

      node.children.forEach((child, index) => {
        const childIdPath = `${idPath}-${index}`;
        const childEl = document.getElementById(childIdPath);
        if (!childEl) return;

        const childRect = childEl.getBoundingClientRect();

        // Calculate start and end points relative to the container
        const startX = parentRect.right - containerRect.left;
        const startY = parentRect.top + parentRect.height / 2 - containerRect.top;
        const endX = childRect.left - containerRect.left;
        const endY = childRect.top + childRect.height / 2 - containerRect.top;

        // Control point for the Bézier curve to make it smooth
        const controlPointOffset = Math.max(30, Math.abs(endX - startX) * 0.5);
        const d = `M ${startX} ${startY} C ${startX + controlPointOffset} ${startY}, ${endX - controlPointOffset} ${endY}, ${endX} ${endY}`;
        
        newLines.push(<ConnectorLine key={getLineKey(idPath, childIdPath)} d={d} />);
        
        // Recurse for grandchildren
        calculateLines(child, childIdPath);
      });
    };

    calculateLines(data, 'root');
    setLines(newLines);
  }, [data, zoom]); // Re-calculate lines if data or zoom changes

  return (
    <div className="p-8 flex justify-center items-center w-full h-full">
      <div 
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }} 
        className="transition-transform duration-300 relative"
        ref={containerRef}
      >
        {/* SVG layer for lines (behind nodes) */}
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible z-0">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#a855f7" floodOpacity="0.7" />
            </filter>
          </defs>
          <g filter="url(#glow)">
            {lines}
          </g>
        </svg>
        
        {/* Node layer (on top of lines) */}
        <Node node={data} level={0} idPath="root" />
      </div>
    </div>
  );
};

export default MindMap;
