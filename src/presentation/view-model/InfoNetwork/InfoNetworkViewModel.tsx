import BaseModalModel from "../BaseModalModel";

export default interface InfoNetworkViewModel extends BaseModalModel {
    numberOfVertices: number;
    numberOfEdges: number;
    averageDegree?: number;
    averageBetweeness?: number;
    averageCloseness?: number;

    onComputeAverageDegree(): void;
    onComputeAverageBetweenness(): void;
    onComputeAverageCloseness(): void;

    destroyListener(): void;
}