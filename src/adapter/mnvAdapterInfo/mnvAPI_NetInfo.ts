import { EdgeResult } from "../../domain/entity/Network/structures/EdgeResult";
import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import { NodeResult } from "../../domain/entity/Network/structures/NodeResult";
import { Edge, Node, GraphAPI, InfoResult } from "./types";

/** 
    Adapter for local network instance and Network Info API
*/
export default abstract class InfoAdapter {
  /** 
   * Converts local node entity to MNV API node 
    @param {NodeResult}  node
    */
  private static parseNodeLocalToAPI = (node: NodeResult): Node => {
    const nodeParsed: Node = {
      type: node.type,
      layer: "0",
      label: "",
      id: node.id,
    };

    return nodeParsed;
  };

  /** 
   * Converts local edge entity to MNV API edge 
    @param {EdgeResult}  edge
    */
  private static parseEdgeLocalToAPI = (edge: EdgeResult): Edge => {
    const edgeParsed: Edge = {
      source: edge.source,
      target: edge.target,
      id: edge.id,
      size: edge.size,
    };

    return edgeParsed;
  };
  /** 
   * Converts Info API Response to number
    @param {InfoResult}  data Info API response
    @returns {number} number calculated
    */
  public static mnvAPIToNetwork = (data: InfoResult): number => {
    return data.result[1];
  };
  /** 
   * Converts local Network entity to MNV API network 
    @param {NetworkContainerResult}  graph Graph to parse
    @returns {GraphAPI} The MNV API graph object
    */
  public static NetworkToMnvAPI = (graph: NetworkContainerResult): GraphAPI => {
    const result: GraphAPI = {
      Nodes: graph.nodes.map(this.parseNodeLocalToAPI),
      Edges: graph.edges.map(this.parseEdgeLocalToAPI),
    };

    return result;
  };
}
