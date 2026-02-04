export interface NodeData {
  id: string;
  [key: string]: any;
}

export interface EdgeData {
  source: string;
  target: string;
  [key: string]: any;
}

export interface GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
}
