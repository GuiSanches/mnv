import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import {
  Connector,
  SubLayer,
} from "../../../../adapter/mnvLoadNextLayer/types";
import NetSubLayerAdapter from "../../../../adapter/mnvLoadNextLayer/mnvAPI_SubLayer";
import NetworkContainerResult from "../../../entity/Network/structures/NetworkContainerResult";

/**
 * Load default contract network use case
 */
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

  /**
   * Link node to its corresponded node
   * @param {NetworkContainerResult} previousNet Parent layer
   * @param {NetworkContainerResult} forwardNet Child layer
   * @param {Connector} connection Connection tuple
   */
  private connectNodes(
    previousNet: NetworkContainerResult,
    forwardNet: NetworkContainerResult,
    connection: Connector
  ) {
    const previousNodeId = parseInt(connection.source);
    const forwardNodeId = parseInt(connection.target);

    previousNet.nodes[previousNodeId].forward = [
      forwardNet.nodes[forwardNodeId],
    ];

    forwardNet.nodes[forwardNodeId].previous = [
      previousNet.nodes[previousNodeId],
    ];
  }

  /**
   * Link network layers by nodes
   * @param {Connector[]} previousNet Connection list
   * @param {NetworkHolder} netHolder Child network
   */
  private connectLayers(connectors: Connector[], netHolder: NetworkHolder) {
    const previousNet = this.networkHolder.getNetwork().network;
    const forwardNet = netHolder.getNetwork().network;

    try {
      this.networkHolder.child = netHolder;

      connectors.forEach((connection) => {
        this.connectNodes(previousNet, forwardNet, connection);
      });
    } catch (e: any) {
      alert("Redes não são compatíveis");
    }
  }

  /**
   * Create new networkHolder from Sublayer
   * @param {SubLayer} subLayer Contracted network structure
   * @return {NetworkHolder} New network holder
   */
  private createNewLayer(subLayer: SubLayer): NetworkHolder {
    const newNetHolder = new NetworkHolder();

    newNetHolder.onNetworkContainerChanged(
      NetSubLayerAdapter.parseSubNetAPIToLocal(subLayer)
    );

    return newNetHolder;
  }

  /**
   * Return list of default network child
   */
  public async getDefaultNetworkList(): Promise<string[]> {
    const networkOptions = await this.networkRepository.listDefaultNetworks();

    return networkOptions;
  }

  /**
   * Load new networkholder child and connect to it's parent
   * @param {string} filename
   * @return { Promise<NetworkHolder | null>} New networkHolder
   */
  public async loadDefaultNetworkChild(
    filename: string
  ): Promise<NetworkHolder | null> {
    if (this.networkHolder.getNetwork().network) {
      const subLayer: SubLayer =
        await this.networkRepository.loadDefaultNetworkChild(filename);

      const newNetHolder = this.createNewLayer(subLayer);

      this.connectLayers(subLayer.connectors, newNetHolder);

      return newNetHolder;
    }

    return null;
  }
}
