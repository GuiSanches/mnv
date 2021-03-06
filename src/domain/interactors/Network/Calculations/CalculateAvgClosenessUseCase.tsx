import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkInfoResult from "../../../entity/Network/structures/NetworkInfoResult";
import NetworkContainerResult from "../../../entity/Network/structures/NetworkContainerResult";

export default class CalculateAvgClosenessUseCase {
    private networkHolder: NetworkHolder;
    private networkRepository: NetworkRepository;

    public constructor(networkRepository: NetworkRepository, networkHolder: NetworkHolder) {
        this.networkHolder = networkHolder;
        this.networkRepository = networkRepository;
    }

    public async calculateAvgCloseness(networkContainerResult: NetworkContainerResult) {
        const averageCloseness : number = await this.networkRepository.calculateAvgCloseness(networkContainerResult);

        const networkInfo : NetworkInfoResult = {
            ...this.networkHolder.getNetwork().Info,
            averageCloseness
        };

        this.networkHolder.onNetworkInfoChanged(networkInfo);
    }
}