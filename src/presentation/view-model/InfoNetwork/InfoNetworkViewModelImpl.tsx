import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import CalculateNetworkInfosUseCase from "../../../domain/interactors/Network/Calculations/CalculateNetworkInfosUseCase";
import BaseView from "../../view/BaseView";
import InfoNetworkViewModel from "./InfoNetworkViewModel";

/**
 * Info View Model implementation
 */
export default class InfoNetworkViewModelImpl
  implements InfoNetworkViewModel, NetworkListener
{
  private baseView?: BaseView;
  private infoNetworkUseCase: CalculateNetworkInfosUseCase;
  private networkHolder: NetworkHolder;

  public readonly type: "network" | "info" = "info";
  public numberOfVertices: number = 0;
  public numberOfEdges: number = 0;
  public averageDegree?: number;
  public averageBetweeness?: number;
  public averageCloseness?: number;
  public isKeep: boolean = false;

  public constructor(
    infoNetworkUseCase: CalculateNetworkInfosUseCase,
    networkHolder: NetworkHolder
  ) {
    this.infoNetworkUseCase = infoNetworkUseCase;

    this.networkHolder = networkHolder;
    this.networkHolder.addNetworkListener(this);

    this.getCalCulations();
  }

  /**
   * Get network cached information
   */
  private getCalCulations = () => {
    this.numberOfEdges = this.networkHolder.getNetwork().network?.edges.length;
    this.numberOfVertices =
      this.networkHolder.getNetwork().network?.nodes.length;

    if (this.networkHolder.getNetwork().Info) {
      const { averageBetweenness, averageCloseness, averageDegree } =
        this.networkHolder.getNetwork().Info;

      this.averageBetweeness = averageBetweenness;
      this.averageCloseness = averageCloseness;
      this.averageDegree = averageDegree;
    }
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };

  /**
   * Calculate average Degree and save it
   */
  public onComputeAverageDegree = async () => {
    await this.infoNetworkUseCase.calculateAvgDegree.calculateAvgDegree();
    this.averageDegree = this.networkHolder.getNetwork().Info.averageDegree;
  };

  /**
   * Calculate average Betweenness and save it
   */
  public onComputeAverageBetweenness = async () => {
    await this.infoNetworkUseCase.calculateAvgBetweenness.calculateAvgBetweenness();
    this.averageBetweeness =
      this.networkHolder.getNetwork().Info.averageBetweenness;
  };

  /**
   * Calculate average Closeness and save it
   */
  public onComputeAverageCloseness = async () => {
    await this.infoNetworkUseCase.calculateAvgCloseness.calculateAvgCloseness();
    this.averageCloseness =
      this.networkHolder.getNetwork().Info.averageCloseness;
  };

  public destroyListener = (): void => {
    this.networkHolder.removeNetworkListener(this);
  };

  public onModalClick = (): void => {};

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
  public onNetworkChanged = (): void => {
    this.getCalCulations();
    this.notifyViewAboutChanges();
  };
}
