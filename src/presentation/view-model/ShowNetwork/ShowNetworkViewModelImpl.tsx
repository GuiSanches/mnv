import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import BaseView from "../../view/BaseView";
import ShowNetworkViewModel from "./ShowNetworkViewModel";

export default class ShowNetworkViewModelImpl implements ShowNetworkViewModel, NetworkListener {
    public isLoaded: boolean;

    private baseView?: BaseView;
    private networkHolder: NetworkHolder;

    constructor(networkHolder: NetworkHolder) {
        this.isLoaded = false;

        this.networkHolder = networkHolder;
        this.networkHolder.addNetworkListener(this);
    }

    public onNetworkChanged = (): void => {
        this.notifyViewAboutChanges();
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

    public destroyListener = (): void => {
        this.networkHolder.removeNetworkListener(this);
    }
}