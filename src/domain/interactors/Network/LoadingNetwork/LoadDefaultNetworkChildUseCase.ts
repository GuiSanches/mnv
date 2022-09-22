import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import {
  Connector,
  SubLayer,
} from "../../../../adapter/mnvLoadNextLayer/types";
import NetSubLayerAdapter from "../../../../adapter/mnvLoadNextLayer/mnvAPI_SubLayer";

export default class LoadDefaultNetworkChildUseCase {
  private networkHolder: NetworkHolder;
  private networkRepository: NetworkRepository;

  public constructor(
    networkRepository: NetworkRepository,
    networkHolder: NetworkHolder
  ) {
    this.networkHolder = networkHolder;
    this.networkRepository = networkRepository;
  }

  public async getDefaultNetworkList() {
    const networkOptions = await this.networkRepository.listDefaultNetworks();
    return networkOptions;
  }

  public async loadDefaultNetworkChild(
    filename: string
  ): Promise<NetworkHolder | null> {
    if (this.networkHolder.getNetwork().network) {
      const subLayer: SubLayer =
        await this.networkRepository.loadDefaultNetworkChild(filename);

      const newNetHolder = new NetworkHolder();

      newNetHolder.onNetworkContainerChanged(
        NetSubLayerAdapter.parseSubNetAPIToLocal(subLayer)
      );

      this.networkHolder.child = newNetHolder;

      this.connectLayers(subLayer.connectors, newNetHolder);

      return newNetHolder;
    }

    return null;
  }

  private connectLayers(connectors: Connector[], netHolder: NetworkHolder) {
    const previousNet = this.networkHolder.getNetwork().network;
    const forwardNet = netHolder.getNetwork().network;

    connectors.forEach((connection) => {
      const previousNodeId = parseInt(connection.source);
      const forwardNodeId = parseInt(connection.target);

      previousNet.nodes[previousNodeId].forward = [
        forwardNet.nodes[forwardNodeId],
      ];

      forwardNet.nodes[forwardNodeId].previous = [
        previousNet.nodes[previousNodeId],
      ];
    });
  }
}
