import React from 'react';
import { MindMapNode } from '../../types';
import { Icon } from '../ui/Icon';

interface MindMapProps {
  data: MindMapNode;
}

const Node: React.FC<{ node: MindMapNode; isRoot?: boolean }> = ({ node, isRoot = false }) => {
  const nodeBg = isRoot ? 'bg-purple-600' : 'bg-gray-700';
  const nodeText = isRoot ? 'text-white' : 'text-gray-200';
  const iconText = isRoot ? 'text-purple-200' : 'text-purple-300';

  return (
    <li className="relative flex items-center">
      {/* Horizontal line from parent */}
      {!isRoot && (
        <div className="absolute top-1/2 -left-4 w-4 h-px bg-gray-600"></div>
      )}

      <div className={`flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg ${nodeBg}`}>
        <Icon name={node.icon} className={`w-5 h-5 ${iconText}`} />
        <span className={`font-semibold ${nodeText}`}>{node.label}</span>
      </div>

      {node.children && node.children.length > 0 && (
        <ul className="pl-8 flex flex-col justify-center gap-4 border-l-2 border-gray-600 ml-4">
          {node.children.map((child, index) => (
            <Node key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const MindMap: React.FC<MindMapProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div className="p-8 flex">
      <ul>
        <Node node={data} isRoot={true} />
      </ul>
    </div>
  );
};
