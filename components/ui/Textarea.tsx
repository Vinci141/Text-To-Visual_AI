// Implemented the Textarea component, which was previously empty.
import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`
        w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-3
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
        resize-y font-mono
        ${className}
      `}
      {...props}
    />
  );
};

export default Textarea;