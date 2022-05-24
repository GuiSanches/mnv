import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import CalculateNetworkInfosUseCase from "../../../domain/interactors/Network/Calculations/CalculateNetworkInfosUseCase";
import BaseView from "../../view/BaseView";
import InfoNetworkViewModel from "./InfoNetworkViewModel";

export default class InfoNetworkViewModelImpl implements InfoNetworkViewModel, NetworkListener {
    public numberOfVertices: number;
    public numberOfEdges: number;
    public averageDegree?: number;
    public averageBetweeness?: number;
    public averageCloseness?: number;
    public isKeep: boolean;
    public type: "network" | "info";

    private baseView?: BaseView;
    private infoNetworkUseCase: CalculateNetworkInfosUseCase;
    private networkHolder: NetworkHolder;

    public constructor(infoNetworkUseCase: CalculateNetworkInfosUseCase, networkHolder: NetworkHolder) {
        this.type = 'info'
        this.isKeep = false;
        this.infoNetworkUseCase = infoNetworkUseCase;

        this.numberOfEdges = networkHolder.getNetwork().network.edges.length;
        this.numberOfVertices = networkHolder.getNetwork().network.nodes.length;

        this.networkHolder = networkHolder;
        this.networkHolder.addNetworkListener(this);
    }

    public onComputeAverageDegree = async () => {
        await this.infoNetworkUseCase.calculateAvgDegree.calculateAvgDegree(this.networkHolder.getNetwork().network);
        this.averageDegree = this.networkHolder.getNetwork().Info.averageDegree;
    }

    public onComputeAverageBetweenness = async () => {
        await this.infoNetworkUseCase.calculateAvgBetweenness.calculateAvgBetweenness(this.networkHolder.getNetwork().network);
        this.averageBetweeness = this.networkHolder.getNetwork().Info.averageBetweenness;
    }

    public onComputeAverageCloseness = async () => {
        await this.infoNetworkUseCase.calculateAvgCloseness.calculateAvgCloseness(this.networkHolder.getNetwork().network);
        this.averageCloseness = this.networkHolder.getNetwork().Info.averageCloseness;
    }

    public destroyListener = (): void => {
        this.networkHolder.removeNetworkListener(this);
    }

    public onModalClick = (): void => {
    }

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView;
    }

    public detachView = (): void => {
        this.baseView = undefined;
    }
    public onNetworkChanged = (): void => {
        this.notifyViewAboutChanges();
    }

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };

}