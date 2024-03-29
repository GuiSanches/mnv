import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import CalculateAvgBetweennessUseCase from "./CalculateAvgBetweennessUseCase";
import CalculateAvgClosenessUseCase from "./CalculateAvgClosenessUseCase";
import CalculateAvgDegreeUseCase from "./CalculateAvgDegreeUseCase";

/**
 * Network calculations use cases wrapper
 */
export default class CalculateNetworkInfosUseCase {
  public calculateAvgBetweenness: CalculateAvgBetweennessUseCase;
  public calculateAvgCloseness: CalculateAvgClosenessUseCase;
  public calculateAvgDegree: CalculateAvgDegreeUseCase;

  public constructor(
    networkRepository: NetworkRepository,
    networkHolder: NetworkHolder
  ) {
    this.calculateAvgBetweenness = new CalculateAvgBetweennessUseCase(
      networkRepository,
      networkHolder
    );
    this.calculateAvgCloseness = new CalculateAvgClosenessUseCase(
      networkRepository,
      networkHolder
    );
    this.calculateAvgDegree = new CalculateAvgDegreeUseCase(
      networkRepository,
      networkHolder
    );
  }
}
