export interface MindMapNode {
  label: string;
  icon: string;
  children?: MindMapNode[];
}

export interface FlowchartItem {
  label: string;
  icon: string;
  type: 'start' | 'process' | 'decision' | 'io' | 'end';
}

export interface ListItem {
  label: string;
  icon: string;
  description: string;
}

export type VisualData = MindMapNode | FlowchartItem[] | ListItem[];
export type VisualType = 'mind_map' | 'flowchart' | 'list';
