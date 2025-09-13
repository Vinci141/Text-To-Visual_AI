import React from 'react';

type SliderProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Slider: React.FC<SliderProps> = ({ className, ...props }) => {
  return (
    <input
      type="range"
      className={`
        w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:bg-purple-500
        [&::-webkit-slider-thumb]:rounded-full
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:bg-purple-500
        [&::-moz-range-thumb]:rounded-full
        ${className}
      `}
      {...props}
    />
  );
};
