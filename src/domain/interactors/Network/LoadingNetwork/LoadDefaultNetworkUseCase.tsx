import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkContainerResult from "../../../entity/Network/structures/NetworkContainerResult";

export default class LoadDefaultNetworkUseCase {
    private networkHolder: NetworkHolder;
    private networkRepository: NetworkRepository;

    public constructor(networkRepository: NetworkRepository, networkHolder: NetworkHolder) {
        this.networkHolder = networkHolder;
        this.networkRepository = networkRepository;
    }

    public async getDefaultNetworkList() {
        const networkOptions = await this.networkRepository.listDefaultNetworks();
        return networkOptions;
    }

    public async loadDefaultNetwork(filename: string) {
        const networkContainerResult : NetworkContainerResult = await this.networkRepository.loadDefaultNetwork(filename);

        this.networkHolder.onNetworkContainerChanged(networkContainerResult);
    }
}