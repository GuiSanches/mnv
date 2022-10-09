import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import LoadDefaultNetworkUseCase from "./LoadDefaultNetworkUseCase";
import UploadJsonNetworkUseCase from "./UploadJsonNetworkUseCase";

/**
 * Loadnetwork use cases wrapper
 */
export default class LoadNetworksUseCase {
  public loadDefaultNetwork: LoadDefaultNetworkUseCase;
  public uploadJsonNetwork: UploadJsonNetworkUseCase;
  public uploadNcolNetwork: UploadJsonNetworkUseCase;

  public constructor(
    networkRepository: NetworkRepository,
    networkHolder: NetworkHolder
  ) {
    this.loadDefaultNetwork = new LoadDefaultNetworkUseCase(
      networkRepository,
      networkHolder
    );
    this.uploadJsonNetwork = new UploadJsonNetworkUseCase(networkHolder);
    this.uploadNcolNetwork = new UploadJsonNetworkUseCase(networkHolder);
  }
}
