import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import BaseModalModel from "../BaseModalModel";
export default interface LoadNetworkChildViewModel extends BaseModalModel {
  isLoaded: boolean;

  defaultNetwork: string;
  defaultNetworkOptions: string[];
  ListDefaultNetworks(): void;
  onLoadDefaultNetwork(filename: string): Promise<NetworkHolder | null>;

  destroyListener(): void;
}
