import NetworkContainerResult from "../structures/NetworkContainerResult";
import NetworkInfoResult from "../structures/NetworkInfoResult";
import NetworkResult from "../structures/NetworkResult";
import NetworkListener from "./NetworkListener";
// This class is used to update listeners
export default class NetworkHolder {
    private networkListeners: NetworkListener[];
    private network: NetworkResult;

    public constructor() {
        this.networkListeners = [];
        this.network = {} as NetworkResult;
    }

    public onNetworkChanged(): void {
        this.notifyListeners();
    }

    public onNetworkContainerChanged(network: NetworkContainerResult) : void {
        this.network.network = network;
        this.notifyListeners();
    }

    public onNetworkInfoChanged(networkInfoResult: NetworkInfoResult) : void {
        this.network.Info = networkInfoResult;
        this.notifyListeners();
    }

    public addNetworkListener(networkListener: NetworkListener): void {
        this.networkListeners.push(networkListener);
    }

    public removeNetworkListener(networkListener: NetworkListener): void {
        this.networkListeners.splice(this.networkListeners.indexOf(networkListener));
    }

    private notifyListeners(): void {
        this.networkListeners.forEach(listener => listener.onNetworkChanged());
    }
}