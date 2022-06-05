import { NetworkContainer } from "../../../adapter/mnvLoadNet/types";
import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import BaseView from "../../view/BaseView";
import LoadNetworkViewModel from "./LoadNetworkViewModel";


export default class LoadNetworkViewModelImpl implements LoadNetworkViewModel, NetworkListener {
    public JsonFile: string;
    public defaultNetwork: string;
    public defaultNetworkOptions: string[];
    public isKeep: boolean;
    public nColFile: string;
    public nColFileType: string;
    public type: "network" | "info";
    isLoaded: boolean;

    private baseView?: BaseView;
    private loadNetworksUseCase: LoadNetworksUseCase;
    private networkHolder: NetworkHolder;

    public constructor(loadNetworksUseCase: LoadNetworksUseCase, networkHolder: NetworkHolder) {
        this.type = 'network';
        this.isLoaded = false;
        this.JsonFile = '';
        this.defaultNetwork = '';
        this.isKeep = false;
        this.nColFile = '';
        this.nColFileType = '';

        this.loadNetworksUseCase = loadNetworksUseCase;
        this.networkHolder = networkHolder;
        this.defaultNetworkOptions = ['']

        this.networkHolder.addNetworkListener(this);
    }

    public destroyListener = (): void => {
        this.networkHolder.removeNetworkListener(this);
    }

    public ListDefaultNetworks = async () => {
        this.defaultNetworkOptions = await this.loadNetworksUseCase.loadDefaultNetwork.getDefaultNetworkList();
        this.notifyViewAboutChanges();
    }

    public onLoadDefaultNetwork = async (filename: string) => {
        this.isLoaded = true;
        this.notifyViewAboutChanges();
        await this.loadNetworksUseCase.loadDefaultNetwork.loadDefaultNetwork(filename);
        this.isLoaded = false;
        this.notifyViewAboutChanges();
    }

    public onLoadnColFile = (): void => {

    }

    public onModalClick = (): void => {

    }

    public onNetworkChanged = (): void => {
        // console.log(this.networkHolder.getNetwork());
    }

    public onUploadJsonFile = (network: NetworkContainer): void => {
        this.loadNetworksUseCase.uploadJsonNetwork.uploadJsonNetwork(network);
    }

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView;
    }

    public detachView = (): void => {
        this.baseView = undefined;
    }

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };

}