import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkContainerResult from "../../../entity/Network/structures/NetworkContainerResult";


export default class UploadNcolNetworkUseCase {
  private networkHolder: NetworkHolder;
  private networkRepository: NetworkRepository;

  public constructor(
    networkRepository: NetworkRepository,
    networkHolder: NetworkHolder
  ) {
    this.networkHolder = networkHolder;
    this.networkRepository = networkRepository;
  }

  public async uploadNcolNetwork(filename: string) {
    const networkContainerResult: NetworkContainerResult =
      await this.networkRepository.uploadNcolNetwork(filename);

    this.networkHolder.onNetworkContainerChanged(networkContainerResult);
  }
}
