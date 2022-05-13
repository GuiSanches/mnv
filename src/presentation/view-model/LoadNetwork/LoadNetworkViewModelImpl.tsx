import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import BaseView from "../../view/BaseView";
import LoadNetworkViewModel from "./LoadNetworkViewModel";


export default class LoadNetworkViewModelImpl implements LoadNetworkViewModel {
    public JsonFile: string;
    public defaultNetwork: string;
    public isKeep: boolean;
    public nColFile: string;
    public nColFileType: string;
    isLoaded: boolean;

    private baseView?: BaseView;
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
    }    

    public onBrowseFile(extension: string): void {
        
    }

    async onLoadDefaultNetwork(filename: string) {
        await this.loadNetworksUseCase.loadDefaultNetwork.loadDefaultNetwork(filename);
    }

    public onLoadnColFile(): void {
        
    }

    public onModalClick(): void {
        
    }

    public onNetworkChanged(): void {
        
    }

    public onUploadJsonFile(): void {
        
    }

    public attachView(baseView: BaseView): void {
        this.baseView = baseView;
    }

    public detachView(): void { 
        this.baseView = undefined;
    }

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
          this.baseView.onViewModelChanged();
        }
      };

}