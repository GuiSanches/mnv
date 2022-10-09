import { EdgeResult } from "../../domain/entity/Network/structures/EdgeResult";
import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import { NodeResult } from "../../domain/entity/Network/structures/NodeResult";
import { NetworkContainer, Node, Edge } from "./types";
/**
 * Adapter for Network API payload to local network instance
 */
export default abstract class NetContainerAdapter {
  /**
   * Parse Node API to local node structure
   * @param {Node} node node payload
   * @returns {NodeResult} Local node structure
   */
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
  /**
   * Parse Edge API to local edge structure
   * @param {Edge} edge edge payload
   * @returns {EdgeResult} Local edge structure
   */
  private static parseEdgeAPIToLocal = (edge: Edge): EdgeResult => {
    const edgeParsed: EdgeResult = {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      size: edge.size,
    };

    return edgeParsed;
  };
  /**
   * Parse Network API payload to local network structure
   * @param {NetworkContainer} data Network payload
   * @returns {NetworkContainerResult} Local network structure
   */
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
