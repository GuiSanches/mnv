import NetworkContainerResult from "../../domain/entity/Network/structures/NetworkContainerResult";
import NetContainerAdapter from "../mnvLoadNet/mnvAPI_NetContainer";
import { Connector, SubLayer } from "./types";

export default abstract class NetSubLayerAdapter {
  public static parseSubNetAPIToLocal = (
    subLayer: SubLayer
  ): NetworkContainerResult => {
    const result: NetworkContainerResult = NetContainerAdapter.mnvAPIToNetwork(
      subLayer.network
    );

    return result;
  };

  public static parseConectorsToLocal = (subLayer: SubLayer): Connector[] => {
    return subLayer.connectors;
  };
}
