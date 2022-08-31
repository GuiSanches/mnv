import { EdgeResult } from "./EdgeResult";
import { NodeResult } from "./NodeResult";

export default interface NetworkContainerResult {
    nodes: NodeResult[];
    edges: EdgeResult[];
}