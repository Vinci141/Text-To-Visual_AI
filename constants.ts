
import type { VisualType, Palette, Font } from './types';

export const VISUAL_TYPES: VisualType[] = [
  { id: 'mind_map', label: 'Mind Map' },
  { id: 'flowchart', label: 'Flowchart' },
  { id: 'list', label: 'List' },
];

export const PALETTES: Palette[] = [
  { name: 'Cosmic', colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#14b8a6', '#f97316', '#eab308'] },
  { name: 'Forest', colors: ['#22c55e', '#10b981', '#06b6d4', '#84cc16', '#a3e635', '#4d7c0f'] },
  { name: 'Ocean', colors: ['#38bdf8', '#0ea5e9', '#0284c7', '#0e7490', '#0369a1', '#075985'] },
  { name: 'Sunset', colors: ['#f97316', '#ef4444', '#f59e0b', '#d97706', '#b45309', '#9a3412'] },
  { name: 'Nebula', colors: ['#d8b4fe', '#c4b5fd', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5'] },
];

export const FONTS: Font[] = [
  { name: 'Inter', className: 'font-sans' },
  { name: 'Lexend', className: 'font-lexend' },
  { name: 'Roboto Mono', className: 'font-mono' },
];
