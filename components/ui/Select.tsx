// Implemented the Select component, which was previously empty.
import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <select
      className={`
        bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
        w-full
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
