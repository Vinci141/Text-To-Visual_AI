import React from 'react';
import type { MindMapNode, StyleConfig } from '../../types';
import { Icon } from '../ui/Icon';

interface MindMapProps {
  data: MindMapNode;
  styleConfig: StyleConfig;
}

const Node: React.FC<{ node: MindMapNode; level: number; palette: string[] }> = ({ node, level, palette }) => {
  const color = palette[level % palette.length];
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex items-start">
      {/* Node and its own branch line */}
      <div className="flex flex-col items-center mr-4">
        <div 
          className="flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg border-2"
          style={{ borderColor: color, backgroundColor: `${color}20` }}
        >
          {/* FIX: The Icon component from lucide-react accepts a 'color' prop, not 'style', for setting the icon color. */}
          <Icon name={node.icon} color={color} className="w-5 h-5 shrink-0" />
          <span className="font-semibold text-gray-100">{node.label}</span>
        </div>
        {hasChildren && (
          <div className="w-0.5 h-6" style={{ backgroundColor: color }}></div>
        )}
      </div>

      {/* Children */}
      {hasChildren && (
        <div className="flex flex-col justify-around gap-4 pt-1">
          {node.children?.map((child, index) => (
            <Node key={index} node={child} level={level + 1} palette={palette} />
          ))}
        </div>
      )}
    </div>
  );
};

export const MindMap: React.FC<MindMapProps> = ({ data, styleConfig }) => {
  return (
    <div className="p-4">
      <Node node={data} level={0} palette={styleConfig.palette.colors} />
    </div>
  );
};
