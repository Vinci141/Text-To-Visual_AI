// Implemented the Controls component, which was previously empty.
import React from 'react';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { VISUAL_TYPES } from '../constants';
import { VisualType } from '../types';
import { Zap } from 'lucide-react';

interface ControlsProps {
  text: string;
  setText: (text: string) => void;
  visualType: VisualType;
  setVisualType: (type: VisualType) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  text,
  setText,
  visualType,
  setVisualType,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="p-4 bg-gray-900 border-r border-gray-800 flex flex-col gap-6 h-full">
      <h2 className="text-xl font-semibold text-white">Input</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="text-input" className="text-sm font-medium text-gray-300">
          Text to Visualize
        </label>
        {/* Wrapper for notebook styling */}
        <div 
            className="notebook-container bg-gray-800 border border-gray-700 rounded-md 
                       focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500"
        >
          <Textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="Enter text here..."
            // Override base styles for the notebook effect
            className="notebook-textarea !bg-transparent !border-none focus:!ring-0 focus:!border-transparent"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="visual-type" className="text-sm font-medium text-gray-300">
          Visualization Type
        </label>
        <Select
          id="visual-type"
          value={visualType}
          onChange={(e) => setVisualType(e.target.value as VisualType)}
          className="bg-gray-800 border-gray-700"
        >
          {VISUAL_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </div>
      <Button onClick={onGenerate} disabled={isLoading || !text.trim()}>
        {isLoading ? (
          'Generating...'
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Zap size={16} /> Generate
          </span>
        )}
      </Button>
    </div>
  );
};

export default Controls;