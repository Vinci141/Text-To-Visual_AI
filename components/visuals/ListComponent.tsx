import React from 'react';
import type { ListItem, StyleConfig } from '../../types';
import { Icon } from '../ui/Icon';

export const ListComponent: React.FC<{ data: ListItem[]; styleConfig: StyleConfig }> = ({ data, styleConfig }) => {
  const { colors } = styleConfig.palette;
  return (
    <div className="w-full max-w-2xl space-y-4">
      {data.map((item, index) => {
        const color = colors[index % colors.length];
        return (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg shadow-lg border-l-4"
            style={{ borderColor: color, backgroundColor: `${color}1A`}}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full mt-1 shrink-0"
              style={{ backgroundColor: `${color}30`}}
            >
              {/* FIX: The Icon component from lucide-react accepts a 'color' prop, not 'style', for setting the icon color. */}
              <Icon name={item.icon} color={color} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-100">{item.label}</h3>
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
