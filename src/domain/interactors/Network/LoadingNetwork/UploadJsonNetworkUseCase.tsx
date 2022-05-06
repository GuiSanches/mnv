import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import NetworkContainerResult from "../../../entity/Network/structures/NetworkContainerResult";

export default class UploadJsonNetworkUseCase {
    private networkHolder: NetworkHolder;
    private networkRepository: NetworkRepository;

    public constructor(networkRepository: NetworkRepository, networkHolder: NetworkHolder) {
        this.networkHolder = networkHolder;
        this.networkRepository = networkRepository;
    }

    public async uploadJsonNetwork(filename: string) {
        const networkContainerResult : NetworkContainerResult = await this.networkRepository.uploadJsonNetwork(filename);

        this.networkHolder.onNetworkContainerChanged(networkContainerResult);
    }
}