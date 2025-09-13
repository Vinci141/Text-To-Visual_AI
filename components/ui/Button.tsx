
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        flex items-center justify-center px-4 py-2.5 
        text-sm font-semibold text-white 
        bg-purple-600 rounded-lg shadow-md
        hover:bg-purple-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500
        disabled:bg-gray-600 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
