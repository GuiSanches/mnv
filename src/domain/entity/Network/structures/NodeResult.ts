import { Position } from "./common";
import { Conector } from "./ConectorResult";

export interface NodeResult extends Conector<NodeResult> {
    color: string;
    id: string;
    weight: number;
    shape: string;
    type: number;
    position: Position;
    size: number;
    membership?: number;
};