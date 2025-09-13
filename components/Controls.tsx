import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { VisualType } from '../types';
import { VISUAL_TYPES } from '../constants';

interface ControlsProps {
  text: string;
  setText: (text: string) => void;
  visualType: VisualType;
  setVisualType: (type: VisualType) => void;
  onGenerate: () => void;
  isLoading: boolean;
  onSample: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  text,
  setText,
  visualType,
  setVisualType,
  onGenerate,
  isLoading,
  onSample
}) => {
  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 p-6 flex flex-col gap-6">
      <div className="space-y-2">
        <label htmlFor="text-input" className="text-sm font-medium text-gray-300">
          Your Text
        </label>
        <Textarea
          id="text-input"
          placeholder="Enter text, ideas, or a process..."
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-800 border-gray-600"
        />
         <Button onClick={onSample} disabled={isLoading} className="w-full !py-1.5 !text-xs !bg-gray-700 hover:!bg-gray-600">
          Load Sample Text
        </Button>
      </div>

      <div className="space-y-2">
        <label htmlFor="visual-type" className="text-sm font-medium text-gray-300">
          Visualization Type
        </label>
        <Select
          id="visual-type"
          value={visualType}
          onChange={(e) => setVisualType(e.target.value as VisualType)}
          className="bg-gray-800 border-gray-600"
        >
          {VISUAL_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </div>

      <Button onClick={onGenerate} disabled={isLoading || !text.trim()} className="mt-auto">
        {isLoading ? (
          'Generating...'
        ) : (
          <>
            <Zap className="w-5 h-5 mr-2" />
            Generate Visual
          </>
        )}
      </Button>
    </div>
  );
};
