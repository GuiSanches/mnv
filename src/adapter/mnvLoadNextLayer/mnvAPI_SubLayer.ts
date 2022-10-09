import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import NetContainerAdapter from "../mnvLoadNet/mnvAPI_NetContainer";
import { Connector, SubLayer } from "./types";

/** 
    Adapter for Subnetwork API to subnetwork structure
*/
export default abstract class NetSubLayerAdapter {
  /** 
   * Converts Info API Response to number
    @param {SubLayer} subLayer Sublayer payload
    @returns {NetworkContainerResult} Local Network structure
    */
  public static parseSubNetAPIToLocal = (
    subLayer: SubLayer
  ): NetworkContainerResult => {
    const result: NetworkContainerResult = NetContainerAdapter.mnvAPIToNetwork(
      subLayer.network
    );

    return result;
  };
  /** 
   * Converts Sublayer payload to Connectors array structure
    @param {SubLayer} subLayer Info API response
    @returns {Connector} Connector array
    */
  public static parseConectorsToLocal = (subLayer: SubLayer): Connector[] => {
    return subLayer.connectors;
  };
}
