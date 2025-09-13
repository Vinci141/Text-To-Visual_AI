import React from 'react';
import type { FlowchartNode, StyleConfig } from '../../types';
import { Icon } from '../ui/Icon';
import { ArrowDown } from 'lucide-react';

const getNodeShape = (type: FlowchartNode['type']) => {
  switch (type) {
    case 'start':
    case 'end':
      return 'rounded-full px-6';
    case 'decision':
      return 'transform -skew-x-12';
    case 'io':
      return 'transform skew-x-12';
    case 'process':
    default:
      return 'rounded-lg';
  }
};

export const Flowchart: React.FC<{ data: FlowchartNode[]; styleConfig: StyleConfig }> = ({ data, styleConfig }) => {
  const { colors } = styleConfig.palette;
  return (
    <div className="flex flex-col items-center gap-4">
      {data.map((node, index) => {
        const color = colors[index % colors.length];
        return (
          <React.Fragment key={index}>
            <div
              className={`flex items-center justify-center gap-3 w-64 p-4 shadow-lg border-2 ${getNodeShape(node.type)}`}
              style={{ borderColor: color, backgroundColor: `${color}20` }}
            >
              {/* FIX: The Icon component from lucide-react accepts a 'color' prop, not 'style', for setting the icon color. */}
              <Icon name={node.icon} color={color} className="w-5 h-5 shrink-0" />
              <span className="font-medium text-gray-100 text-center">{node.label}</span>
            </div>
            {index < data.length - 1 && (
              <ArrowDown className="w-8 h-8 text-gray-500 my-2" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
