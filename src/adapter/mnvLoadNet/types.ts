export interface Node {
  shape: string;
  weight: number;
  membership: number;
  type: number;
  layer: number;
  label: string;
  x: number;
  y: number;
  id: string;
  color: string;
  size: number;
}

export interface Edge {
  size: number;
  source: string;
  target: string;
  id: string;
  color: string;
}

export interface GraphAPI {
  Nodes: Node[];
  Edges: Edge[];
}

export type InfoResult = {
  result: [number[], number, number[]];
  method: string;
};

export type NetworkContainer = {
  nodes: Node[];
  edges: Edge[];
};
