
import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`
        w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg 
        text-gray-200 text-sm
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
        resize-none
        ${className}
      `}
      {...props}
    />
  );
};
