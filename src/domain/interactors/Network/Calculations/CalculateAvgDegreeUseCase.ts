import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkInfoResult from "../../../entity/Network/structures/NetworkInfoResult";

/**
 * Average degree use case
 */
export default class CalculateAvgDegreeUseCase {
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
   * Calculates network average degree
   */
  public async calculateAvgDegree() {
    const network = this.networkHolder.getNetwork();

    const averageDegree: number =
      await this.networkRepository.calculateAvgDegree(network.network);

    const networkInfo: NetworkInfoResult = {
      ...network.Info,
      averageDegree,
    };

    this.networkHolder.onNetworkInfoChanged(networkInfo);
  }
}
