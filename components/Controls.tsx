
import React from 'react';
import type { VisualType, StyleConfig } from '../types';
import { VISUAL_TYPES, PALETTES, FONTS } from '../constants';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';

interface ControlsProps {
  inputText: string;
  setInputText: (text: string) => void;
  visualType: VisualType;
  setVisualType: (type: VisualType) => void;
  styleConfig: StyleConfig;
  setStyleConfig: (config: StyleConfig) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  inputText,
  setInputText,
  visualType,
  setVisualType,
  styleConfig,
  setStyleConfig,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">
            1. Enter your text
          </label>
          <Textarea
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your notes, ideas, or plans here..."
            rows={10}
          />
        </div>

        <div>
          <label htmlFor="visual-type" className="block text-sm font-medium text-gray-300 mb-2">
            2. Choose visual type
          </label>
          <Select
            id="visual-type"
            value={visualType.id}
            onChange={(e) => setVisualType(VISUAL_TYPES.find(v => v.id === e.target.value) || VISUAL_TYPES[0])}
          >
            {VISUAL_TYPES.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
          </Select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">3. Customize style</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="palette" className="block text-xs font-medium text-gray-400 mb-1">
                Color Palette
              </label>
              <Select
                id="palette"
                value={styleConfig.palette.name}
                onChange={(e) => setStyleConfig({ ...styleConfig, palette: PALETTES.find(p => p.name === e.target.value) || PALETTES[0] })}
              >
                {PALETTES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
              </Select>
            </div>
            <div>
              <label htmlFor="font" className="block text-xs font-medium text-gray-400 mb-1">
                Font
              </label>
              <Select
                id="font"
                value={styleConfig.font.name}
                onChange={(e) => setStyleConfig({ ...styleConfig, font: FONTS.find(f => f.name === e.target.value) || FONTS[0] })}
              >
                {FONTS.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Button onClick={onGenerate} disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : '✨ Generate Visual'}
        </Button>
      </div>
    </div>
  );
};
