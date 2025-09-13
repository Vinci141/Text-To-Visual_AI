
import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({ children, className, ...props }) => {
  return (
    <select
      className={`
        w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg 
        text-gray-200 text-sm
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
};
