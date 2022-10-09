import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkInfoResult from "../../../entity/Network/structures/NetworkInfoResult";

/**
 * Average betweenness use case
 */
export default class CalculateAvgBetweennessUseCase {
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
   * Calculates network average betweenness
   */
  public async calculateAvgBetweenness() {
    const network = this.networkHolder.getNetwork();

    const averageBetweenness: number =
      await this.networkRepository.calculateAvgBetweenness(network.network);
    const networkInfo: NetworkInfoResult = {
      ...network.Info,
      averageBetweenness,
    };

    this.networkHolder.onNetworkInfoChanged(networkInfo);
  }
}
