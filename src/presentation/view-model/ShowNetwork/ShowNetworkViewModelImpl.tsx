import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import BaseView from "../../view/BaseView";
import ShowNetworkViewModel from "./ShowNetworkViewModel";

export default class ShowNetworkViewModelImpl implements ShowNetworkViewModel, NetworkListener {
    public isLoaded: boolean;
    public type: "network" | "info";

    private baseView?: BaseView;
    private networkHolder: NetworkHolder;

    constructor(networkHolder: NetworkHolder) {
        this.type = 'network'
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

    public destroyListener = (): void => {
        this.networkHolder.removeNetworkListener(this);
    }

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };
}