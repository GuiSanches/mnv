import { NetworkContainer } from "../../../adapter/mnvLoadNet/types";
import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import LoadDefaultNetworkChildUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadDefaultNetworkChildUseCase";
import BaseView from "../../view/BaseView";
import LoadNetworkChildViewModel from "./LoadNetworkChildViewModel";

export default class LoadNetworkChildViewModelImpl
  implements LoadNetworkChildViewModel, NetworkListener
{
  public defaultNetwork: string;
  public defaultNetworkOptions: string[];
  public isKeep: boolean;
  public type: "network" | "info";
  isLoaded: boolean;

  private baseView?: BaseView;
  private loadNetworksChildUseCase: LoadDefaultNetworkChildUseCase;
  private networkHolder: NetworkHolder;

  public constructor(
    loadNetworksUseCase: LoadDefaultNetworkChildUseCase,
    networkHolder: NetworkHolder
  ) {
    this.type = "network";
    this.isLoaded = false;
    this.defaultNetwork = "";
    this.isKeep = false;

    this.loadNetworksChildUseCase = loadNetworksUseCase;
    this.networkHolder = networkHolder;
    this.defaultNetworkOptions = [""];

    this.networkHolder.addNetworkListener(this);
  }

  public destroyListener = (): void => {
    this.networkHolder.removeNetworkListener(this);
  };

  public ListDefaultNetworks = async () => {
    this.defaultNetworkOptions =
      await this.loadNetworksChildUseCase.getDefaultNetworkList();
    this.notifyViewAboutChanges();
  };

  public onLoadDefaultNetwork = async (
    filename: string
  ): Promise<NetworkHolder | null> => {
    this.setLoading(true);
    const networkHolder =
      await this.loadNetworksChildUseCase.loadDefaultNetworkChild(filename);

    this.setLoading(false);

    return networkHolder;
  };

  private setLoading = (loading: boolean): void => {
    this.isLoaded = loading;
    this.notifyViewAboutChanges();
  };

  public onModalClick = (): void => {};

  public onNetworkChanged = (): void => {
    // console.log(this.networkHolder.getNetwork());
  };

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}
