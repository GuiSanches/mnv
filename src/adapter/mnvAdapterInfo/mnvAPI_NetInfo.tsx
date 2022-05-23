import { EdgeResult } from "../../domain/entity/Network/structures/EdgeResult";
import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import { NodeResult } from "../../domain/entity/Network/structures/NodeResult";
import { Edge, Node, GraphAPI, InfoResult } from "./types";

export default abstract class InfoAdapter {

    private static parseNodeLocalToAPI = (node: NodeResult): Node => {
        const nodeParsed: Node = {
            type: node.type,
            layer: '0',
            label: '',
            id: node.id
        };

        return nodeParsed;
    }

    private static parseEdgeLocalToAPI = (edge: EdgeResult): Edge => {
        const edgeParsed: Edge = {
            source: edge.source,
            target: edge.target,
            id: edge.id,
            size: edge.size
        };

        return edgeParsed;
    }

    public static mnvAPIToNetwork = (data: InfoResult): number => {
        return data.result[1]
    }

    public static NetworkToMnvAPI = (graph: NetworkContainerResult): GraphAPI => {
        const result: GraphAPI = {
            Nodes: graph.nodes.map(this.parseNodeLocalToAPI),
            Edges: graph.edges.map(this.parseEdgeLocalToAPI)
        };

        return result;
    }
}