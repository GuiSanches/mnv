import { EdgeResult } from "../../domain/entity/Network/structures/EdgeResult";
import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import { NodeResult } from "../../domain/entity/Network/structures/NodeResult";
import { NetworkContainer, Node, Edge } from "./types";

export default abstract class NetContainerAdapter {
  private static parseNodeAPIToLocal = (node: Node): NodeResult => {
    const nodeParsed: NodeResult = {
      color: node.color,
      id: node.id,
      weight: node.weight,
      shape: node.shape,
      type: node.type,
      position: {
        x: node.x,
        y: node.y,
      },
      size: node.size,
    };

    return nodeParsed;
  };

  private static parseEdgeAPIToLocal = (edge: Edge): EdgeResult => {
    const edgeParsed: EdgeResult = {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      size: edge.size,
    };

    return edgeParsed;
  };

  public static mnvAPIToNetwork = (
    data: NetworkContainer
  ): NetworkContainerResult => {
    const result: NetworkContainerResult = {
      nodes: data.nodes.map(this.parseNodeAPIToLocal),
      edges: data.edges.map(this.parseEdgeAPIToLocal),
    };

    return result;
  };
}
