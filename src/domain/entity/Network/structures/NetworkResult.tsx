import { EdgeResult } from "./EdgeResult";
import NetworkContainerResult from "./NetworkContainerResult";
import NetworkInfoResult from "./NetworkInfoResult";
import { NodeResult } from "./NodeResult";

export default interface NetworkResult {
    network: NetworkContainerResult;
    Info: NetworkInfoResult;
}