import React from 'react';
import { ListItem } from '../../types';
import { Icon } from '../ui/Icon';

interface ListComponentProps {
  data: ListItem[];
}

export const ListComponent: React.FC<ListComponentProps> = ({ data }) => {
  return (
    <div className="p-8 space-y-4 max-w-2xl mx-auto">
      {data.map((item, index) => (
        <div key={index} className="flex items-start p-4 bg-gray-800/50 rounded-lg border border-gray-700 shadow-md">
          <div className="flex-shrink-0 p-3 mr-4 bg-purple-500/20 rounded-full">
            <Icon name={item.icon} className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-100">{item.label}</h3>
            <p className="mt-1 text-sm text-gray-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
