import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkInfoResult from "../../../entity/Network/structures/NetworkInfoResult";

/**
 * Average closeness use case
 */
export default class CalculateAvgClosenessUseCase {
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
   * Calculates network average closeness
   */
  public async calculateAvgCloseness() {
    const network = this.networkHolder.getNetwork();

    const averageCloseness: number =
      await this.networkRepository.calculateAvgCloseness(network.network);

    const networkInfo: NetworkInfoResult = {
      ...network.Info,
      averageCloseness,
    };

    this.networkHolder.onNetworkInfoChanged(networkInfo);
  }
}
