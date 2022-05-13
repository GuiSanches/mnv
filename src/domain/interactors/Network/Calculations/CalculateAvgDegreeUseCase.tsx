import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkInfoResult from "../../../entity/Network/structures/NetworkInfoResult";
import NetworkContainerResult from "../../../entity/Network/structures/NetworkContainerResult";

export default class CalculateAvgDegreeUseCase {
    private networkHolder: NetworkHolder;
    private networkRepository: NetworkRepository;

    public constructor(networkRepository: NetworkRepository, networkHolder: NetworkHolder) {
        this.networkHolder = networkHolder;
        this.networkRepository = networkRepository;
    }

    public async calculateAvgDegree(networkContainerResult: NetworkContainerResult) {
        const networkInfoResult : NetworkInfoResult = await this.networkRepository.calculateAvgDegree(networkContainerResult);

        this.networkHolder.onNetworkInfoChanged(networkInfoResult);
    }
}