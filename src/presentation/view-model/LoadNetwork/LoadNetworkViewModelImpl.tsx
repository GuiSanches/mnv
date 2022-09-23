import { NetworkContainer } from "../../../adapter/mnvLoadNet/types";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import BaseView from "../../view/BaseView";
import LoadNetworkViewModel from "./LoadNetworkViewModel";

export default class LoadNetworkViewModelImpl implements LoadNetworkViewModel {
  public JsonFile: string;
  public defaultNetwork: string;
  public defaultNetworkOptions: string[];
  public isKeep: boolean;
  public nColFile: string;
  public nColFileType: string;
  isLoaded: boolean;

  private baseView?: BaseView;
  private loadNetworksUseCase: LoadNetworksUseCase;

  public constructor(loadNetworksUseCase: LoadNetworksUseCase) {
    this.isLoaded = false;
    this.JsonFile = "";
    this.defaultNetwork = "";
    this.isKeep = false;
    this.nColFile = "";
    this.nColFileType = "";

    this.loadNetworksUseCase = loadNetworksUseCase;
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
      await this.loadNetworksUseCase.loadDefaultNetwork.getDefaultNetworkList();
    this.notifyViewAboutChanges();
  };

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
