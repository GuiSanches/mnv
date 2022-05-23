import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkInfoResult from "../../../entity/Network/structures/NetworkInfoResult";
import NetworkContainerResult from "../../../entity/Network/structures/NetworkContainerResult";

export default class CalculateAvgBetweennessUseCase {
    private networkHolder: NetworkHolder;
    private networkRepository: NetworkRepository;

    public constructor(networkRepository: NetworkRepository, networkHolder: NetworkHolder) {
        this.networkHolder = networkHolder;
        this.networkRepository = networkRepository;
    }

    public async calculateAvgBetweenness(networkContainerResult: NetworkContainerResult) {
        const averageBetweenness : number = await this.networkRepository.calculateAvgBetweenness(networkContainerResult);
        const networkInfo : NetworkInfoResult = {
            ...this.networkHolder.getNetwork().Info,
            averageBetweenness
        }

        console.log('caso de uso', networkInfo)
        this.networkHolder.onNetworkInfoChanged(networkInfo);
    }
}