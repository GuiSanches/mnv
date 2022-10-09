import { NetworkContainer } from "../../../adapter/mnvLoadNet/types";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import BaseView from "../../view/BaseView";
import LoadNetworkViewModel from "./LoadNetworkViewModel";

export default class LoadNetworkViewModelImpl implements LoadNetworkViewModel {
  private baseView?: BaseView;
  private loadNetworksUseCase: LoadNetworksUseCase;

  public JsonFile: string = "";
  public defaultNetwork: string = "";
  public defaultNetworkOptions: string[];
  public isKeep: boolean = false;
  public nColFile: string = "";
  public nColFileType: string = "";
  public isLoaded: boolean = false;

  public constructor(loadNetworksUseCase: LoadNetworksUseCase) {
    this.loadNetworksUseCase = loadNetworksUseCase;
    this.defaultNetworkOptions = [""];
  }

  /**
   * Updates loading and notify view
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
   * Get default network list
   */
  public ListDefaultNetworks = async () => {
    this.defaultNetworkOptions =
      await this.loadNetworksUseCase.loadDefaultNetwork.getDefaultNetworkList();
    this.notifyViewAboutChanges();
  };

  /**
   * Load default network
   */
  public onLoadDefaultNetwork = async (filename: string) => {
    this.setLoading(true);

    await this.loadNetworksUseCase.loadDefaultNetwork.loadDefaultNetwork(
      filename
    );

    this.setLoading(false);
  };

  public onLoadnColFile = (): void => {};

  public onModalClick = (): void => {};

  public onNetworkChanged = (): void => {
    // this.notifyViewAboutChanges();
  };

  public onUploadJsonFile = (network: NetworkContainer): void => {
    this.loadNetworksUseCase.uploadJsonNetwork.uploadJsonNetwork(network);
  };

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };
}
