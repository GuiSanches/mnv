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
    isLoaded: boolean;

    public baseView?: BaseView;
    private loadNetworksUseCase: LoadNetworksUseCase;
    private networkHolder: NetworkHolder;

    public constructor(loadNetworksUseCase: LoadNetworksUseCase, networkHolder: NetworkHolder) {
        this.isLoaded = false;
        this.JsonFile = '';
        this.defaultNetwork = '';
        this.isKeep = false;
        this.nColFile = '';
        this.nColFileType = '';

        this.loadNetworksUseCase = loadNetworksUseCase;
        this.networkHolder = networkHolder;
        this.defaultNetworkOptions = ['']

        this.ListDefaultNetworks()
        this.networkHolder.addNetworkListener(this);
    }


    public onBrowseFile = (extension: string): void => {

    }

    private ListDefaultNetworks = async () => {
        this.defaultNetworkOptions = await this.loadNetworksUseCase.loadDefaultNetwork.getDefaultNetworkList()
        this.notifyViewAboutChanges()
    }

    public onLoadDefaultNetwork = async (filename: string) => {
        await this.loadNetworksUseCase.loadDefaultNetwork.loadDefaultNetwork(filename);
    }

    public onLoadnColFile = (): void => {

    }

    public onModalClick = (): void => {

    }

    public onNetworkChanged = (): void => {
        console.log(this.networkHolder.getNetwork());
    }

    public onUploadJsonFile = (): void => {

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