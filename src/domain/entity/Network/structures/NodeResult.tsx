import { Position } from "./common";

export interface NodeResult {
    id: BigInt;
    weight: number;
    shape: string;
    type: BigInt;
    position: Position;
    size: number;
    membership?: BigInt;
    target: BigInt;
}