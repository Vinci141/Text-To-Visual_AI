// Implemented the ListComponent, which was previously empty.
import React from 'react';
import { ListItem } from '../../types';
import { Icon } from '../ui/Icon';

interface ListComponentProps {
  data: ListItem[];
}

export const ListComponent: React.FC<ListComponentProps> = ({ data }) => {
  return (
    <div className="space-y-4 p-4 w-full max-w-2xl">
      {data.map((item, index) => (
        <div key={index} className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
            <Icon name={item.icon} className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{item.label}</h3>
            <p className="text-gray-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
