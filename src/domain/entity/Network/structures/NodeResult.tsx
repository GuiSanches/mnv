import { Position } from "./common";

export interface NodeResult {
    id: bigint;
    weight: number;
    shape: string;
    type: bigint;
    position: Position;
    size: number;
    membership?: bigint;
    target: bigint;
}