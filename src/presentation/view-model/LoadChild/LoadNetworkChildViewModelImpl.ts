import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import LoadDefaultNetworkChildUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadDefaultNetworkChildUseCase";
import BaseView from "../../view/BaseView";
import LoadNetworkChildViewModel from "./LoadNetworkChildViewModel";

export default class LoadNetworkChildViewModelImpl
  implements LoadNetworkChildViewModel
{
  private baseView?: BaseView;
  private loadNetworksChildUseCase: LoadDefaultNetworkChildUseCase;

  public defaultNetwork: string = "";
  public isKeep: boolean = false;
  public isLoaded: boolean = false;
  public defaultNetworkOptions: string[];

  public constructor(loadNetworksUseCase: LoadDefaultNetworkChildUseCase) {
    this.loadNetworksChildUseCase = loadNetworksUseCase;
    this.defaultNetworkOptions = [""];
  }

  /**
   * update isLoaded and notifies view
   * @param {boolean} loading
   */
  private setLoading = (loading: boolean): void => {
    this.isLoaded = loading;
    this.notifyViewAboutChanges();
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };

  /**
   * Get default network options, notify view
   */
  public ListDefaultNetworks = async () => {
    this.defaultNetworkOptions =
      await this.loadNetworksChildUseCase.getDefaultNetworkList();
    this.notifyViewAboutChanges();
  };

  /**
   * Load child networkholder
   * @param {string} filename child option
   */
  public onLoadDefaultNetwork = async (
    filename: string
  ): Promise<NetworkHolder | null> => {
    this.setLoading(true);

    const networkHolder =
      await this.loadNetworksChildUseCase.loadDefaultNetworkChild(filename);

    this.setLoading(false);

    return networkHolder;
  };

  public onModalClick = (): void => {};

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
}
