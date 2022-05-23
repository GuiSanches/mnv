import { Position } from "./common";

export interface NodeResult {
    color: string;
    id: string;
    weight: number;
    shape: string;
    type: number;
    position: Position;
    size: number;
    membership?: number;
};