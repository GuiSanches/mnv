import { Conector } from "./ConectorResult";

export interface EdgeResult extends Conector<EdgeResult> {
    id: string;
    source: string;
    target: string;
    size: number;
}