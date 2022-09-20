import NetworkContainerResult from "../structures/NetworkContainerResult";
import NetworkInfoResult from "../structures/NetworkInfoResult";
import NetworkResult from "../structures/NetworkResult";
import NetworkListener from "./NetworkListener";
// This class is used to update listeners
export default class NetworkHolder {
  private networkListeners: NetworkListener[];
  private network: NetworkResult;
  public child: NetworkHolder | null = null;

  public constructor() {
    this.networkListeners = [];
    this.network = {} as NetworkResult;
  }

  public onNetworkChanged(): void {
    this.notifyListeners();
  }

  public onNetworkContainerChanged(network: NetworkContainerResult): void {
    this.network.network = network;
    this.notifyContainerListeners();
    this.onNetworkInfoChanged({});
  }

  public getNetwork() {
    return this.network;
  }

  public onNetworkInfoChanged(networkInfoResult: NetworkInfoResult): void {
    this.network.Info = networkInfoResult;
    this.notifyInfoListeners();
  }

  public addNetworkListener(networkListener: NetworkListener): void {
    this.networkListeners.push(networkListener);
  }

  public removeNetworkListener(networkListener: NetworkListener): void {
    const id = this.networkListeners.indexOf(networkListener);
    if (id !== -1) {
      this.networkListeners.splice(id, 1);
    }
  }

  private notifyInfoListeners(): void {
    this.networkListeners.forEach((listener) => {
      if (listener.type === "info") listener.onNetworkChanged();
    });
  }

  private notifyContainerListeners(): void {
    this.networkListeners.forEach((listener) => {
      if (listener.type === "network") listener.onNetworkChanged();
    });
  }

  private notifyListeners(): void {
    this.networkListeners.forEach((listener) => {
      listener.onNetworkChanged();
    });
  }
}
