
export interface VisualType {
  id: 'mind_map' | 'flowchart' | 'list';
  label: string;
}

export interface Palette {
  name: string;
  colors: string[];
}

export interface Font {
  name: string;
  className: string;
}

export interface StyleConfig {
  palette: Palette;
  font: Font;
}

// Mind Map Data Structure
export interface MindMapNode {
  label: string;
  icon: string;
  children?: MindMapNode[];
}

// Flowchart Data Structure
export type FlowchartNodeType = 'start' | 'process' | 'decision' | 'end' | 'io';
export interface FlowchartNode {
  label: string;
  icon: string;
  type: FlowchartNodeType;
}

// List Data Structure
export interface ListItem {
  label: string;
  icon: string;
  description: string;
}

// Union type for all possible visual data structures
export type VisualData = MindMapNode | FlowchartNode[] | ListItem[];
