import NetworkInfoResult from "../../entity/Network/structures/NetworkInfoResult";
import NetworkContainerResult from "../../entity/Network/structures/NetworkContainerResult";

// Here we define an interface that will be implemented to access API
export default interface NetworkRepository {
    /**
     * @throws {Error} if validation has not passed 
      */

     calculateAvgDegree(networkResult: NetworkContainerResult):
     Promise<number>;

     calculateAvgBetweenness(networkResult: NetworkContainerResult):
     Promise<number>;

     calculateAvgCloseness(networkResult: NetworkContainerResult):
     Promise<number>;

     listDefaultNetworks():
     Promise<string[]>;

     loadDefaultNetwork(filename: string):
     Promise<NetworkContainerResult>;

     uploadJsonNetwork(filename: string):
     Promise<NetworkContainerResult>;

     uploadNcolNetwork(filename: string):
     Promise<NetworkContainerResult>;
}