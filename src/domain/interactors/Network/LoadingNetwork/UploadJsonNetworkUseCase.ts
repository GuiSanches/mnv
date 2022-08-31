import NetworkRepository from "../../../repository/Network/NetworkRepository";
import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import { NetworkContainer } from "../../../../adapter/mnvLoadNet/types";
import NetContainerAdapter from "../../../../adapter/mnvLoadNet/mnvAPI_NetContainer";

export default class UploadJsonNetworkUseCase {
    private networkHolder: NetworkHolder;
    private networkRepository: NetworkRepository;

    public constructor(networkRepository: NetworkRepository, networkHolder: NetworkHolder) {
        this.networkHolder = networkHolder;
        this.networkRepository = networkRepository;
    }

    public async uploadJsonNetwork(network: NetworkContainer) {
        const net = NetContainerAdapter.mnvAPIToNetwork(network);

        this.networkHolder.onNetworkContainerChanged(net);
    }
}