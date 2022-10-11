import NetworkContainerResult from "../structures/NetworkContainerResult";
import NetworkInfoResult from "../structures/NetworkInfoResult";
import NetworkResult from "../structures/NetworkResult";
import NetworkListener from "./NetworkListener";

/**
 * This class is used to update listeners
 */
export default class NetworkHolder {
  private networkListeners: NetworkListener[];
  private network: NetworkResult;
  private netUI?: any;

  public child: NetworkHolder | null = null;

  public constructor() {
    this.networkListeners = [];
    this.network = {} as NetworkResult;
  }

  /**
   * Notify Network info listeners
   */
  private notifyInfoListeners(): void {
    this.networkListeners.forEach((listener) => {
      if (listener.type === "info") listener.onNetworkChanged();
    });
  }

  /**
   * Notify Network structure listeners
   */
  private notifyContainerListeners(): void {
    this.networkListeners.forEach((listener) => {
      if (listener.type === "network") listener.onNetworkChanged();
    });
  }

  /**
   * Updates network info
   * @param {NetworkInfoResult} networkInfoResult network info data
   */
  public onNetworkInfoChanged(networkInfoResult: NetworkInfoResult): void {
    this.network.Info = networkInfoResult;
    this.notifyInfoListeners();
  }

  /**
   * Updates network container structure, cleans info data
   * @param {NetworkContainerResult} network network info data
   */
  public onNetworkContainerChanged(network: NetworkContainerResult): void {
    this.network.network = network;

    this.notifyContainerListeners();
    this.onNetworkInfoChanged({});
  }

  /**
   * Updates network nodes position
   * @param {NetworkContainerResult} network network info data
   */
  public updateNetworkTopography(network: NetworkContainerResult): void {
    this.network.network = network;

    this.notifyContainerListeners();
  }

  /**
   * Get Network
   */
  public getNetwork(): NetworkResult {
    return this.network;
  }

  /**
   * Set Network UI
   */
  public setNetUI(netUI: any) {
    this.netUI = netUI;
    this.notifyInfoListeners();
  }

  public getNetUI() {
    return this.netUI;
  }

  /**
   * Add Network listener
   * @param {NetworkListener} networkListener network listener
   */
  public addNetworkListener(networkListener: NetworkListener): void {
    this.networkListeners.push(networkListener);
  }

  /**
   * Remove Network listener
   * @param {NetworkListener} networkListener network listener
   */
  public removeNetworkListener(networkListener: NetworkListener): void {
    const id = this.networkListeners.indexOf(networkListener);
    if (id !== -1) this.networkListeners.splice(id, 1);
  }
}
