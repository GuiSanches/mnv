import { Position } from "./common";

export default interface NetworkInfoResult {
    maxNodeSize?: number;
    minNodeSize?: number;
    maxCoordinates?: Position;
    averageDegree?: number;
    averageBetweenness?: number;
    averageCloseness?: number;
}