// Implemented the Flowchart component, which was previously empty.
import React from 'react';
import { FlowchartItem } from '../../types';
import { Icon } from '../ui/Icon';
import { ArrowDown } from 'lucide-react';

interface FlowchartProps {
  data: FlowchartItem[];
}

const shapeClasses: Record<FlowchartItem['type'], string> = {
  start: 'rounded-full bg-green-500/20 text-green-300 border-green-500',
  end: 'rounded-full bg-red-500/20 text-red-300 border-red-500',
  process: 'rounded-lg bg-blue-500/20 text-blue-300 border-blue-500',
  decision: 'w-40 h-40 transform rotate-45 bg-yellow-500/20 text-yellow-300 border-yellow-500',
  io: 'w-48 transform -skew-x-12 bg-indigo-500/20 text-indigo-300 border-indigo-500',
};


export const Flowchart: React.FC<FlowchartProps> = ({ data }) => {
  return (
    <div className="p-8 flex flex-col items-center gap-4">
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`
              p-4 border-2 flex items-center justify-center text-center
              min-w-[10rem] min-h-[4rem]
              ${shapeClasses[item.type]}
            `}
          >
            <div className={`flex items-center gap-2 ${item.type === 'decision' ? 'transform -rotate-45' : ''} ${item.type === 'io' ? 'transform skew-x-12' : ''}`}>
              <Icon name={item.icon} className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
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

export default Flowchart;
