import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import LoadDefaultNetworkChildUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadDefaultNetworkChildUseCase";
import BaseView from "../../view/BaseView";
import LoadNetworkChildViewModel from "./LoadNetworkChildViewModel";

export default class LoadNetworkChildViewModelImpl
  implements LoadNetworkChildViewModel
{
  public defaultNetwork: string;
  public defaultNetworkOptions: string[];
  public isKeep: boolean;
  isLoaded: boolean;

  private baseView?: BaseView;
  private loadNetworksChildUseCase: LoadDefaultNetworkChildUseCase;

  public constructor(loadNetworksUseCase: LoadDefaultNetworkChildUseCase) {
    this.isLoaded = false;
    this.defaultNetwork = "";
    this.isKeep = false;

    this.loadNetworksChildUseCase = loadNetworksUseCase;
    this.defaultNetworkOptions = [""];
  }

  private setLoading = (loading: boolean): void => {
    this.isLoaded = loading;
    this.notifyViewAboutChanges();
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
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

  public onModalClick = (): void => {};

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
}
