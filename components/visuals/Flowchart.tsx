import React from 'react';
import { FlowchartItem } from '../../types';
import { Icon } from '../ui/Icon';
import { ArrowDown } from 'lucide-react';

interface FlowchartProps {
  data: FlowchartItem[];
}

const nodeStyles: Record<FlowchartItem['type'], string> = {
  start: 'bg-green-500/20 border-green-500 text-green-300 rounded-full',
  end: 'bg-red-500/20 border-red-500 text-red-300 rounded-full',
  process: 'bg-blue-500/20 border-blue-500 text-blue-300 rounded-lg',
  decision: 'bg-yellow-500/20 border-yellow-500 text-yellow-300 transform rotate-45 aspect-square',
  io: 'bg-indigo-500/20 border-indigo-500 text-indigo-300 -skew-x-12',
};

export const Flowchart: React.FC<FlowchartProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className={`flex items-center justify-center min-w-[12rem] min-h-[5rem] p-4 border-2 ${nodeStyles[item.type]}`}>
            <div className={`flex items-center gap-3 text-center ${item.type === 'decision' ? '-rotate-45' : ''} ${item.type === 'io' ? 'skew-x-12' : ''}`}>
              <Icon name={item.icon} className="w-6 h-6 flex-shrink-0" />
              <span className="font-semibold">{item.label}</span>
            </div>
          </div>
          {index < data.length - 1 && (
            <ArrowDown className="w-8 h-8 text-gray-500 my-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
