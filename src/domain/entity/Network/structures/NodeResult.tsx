import { Position } from "./common";

export interface NodeResult {
    x: any;
    y: any;
    color: string;
    id: string;
    weight: number;
    shape: string;
    type: BigInt;
    position: Position;
    size: number;
    membership?: BigInt;
    target: BigInt;
}