export interface Node {
  type: number;
  layer: string;
  label: string;
  id: string;
}

export interface Edge {
  source: string;
  target: string;
  id: string;
  size: number; // weight
}

export interface GraphAPI {
  Nodes: Node[];
  Edges: Edge[];
}

export type InfoResult = {
  result: [number[], number, number[]],
  method: string
};
