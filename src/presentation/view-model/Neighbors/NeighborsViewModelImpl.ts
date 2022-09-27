import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import GetNodesNeighborsUseCase from "../../../domain/interactors/Network/Neighbors/GetNodesNeighborsUseCase";
import BaseView from "../../view/BaseView";
import NeighborsViewModel from "./NeighborsViewModel";

export default class NeighborsViewModelImpl
  implements NeighborsViewModel, NetworkListener
{
  private baseView?: BaseView;
  private getNodesNeighborsUseCase: GetNodesNeighborsUseCase;
  private networkHolder: NetworkHolder;

  public isLoaded: boolean;
  public selected: boolean;
  public isKeep: boolean;
  public type: "network" | "info";

  public constructor(
    networkHolder: NetworkHolder,
    getNodesNeighborsUseCase: GetNodesNeighborsUseCase
  ) {
    this.isLoaded = false;
    this.selected = false;
    this.isKeep = false;
    this.getNodesNeighborsUseCase = getNodesNeighborsUseCase;

    this.type = "info";
    this.networkHolder = networkHolder;
    this.networkHolder.addNetworkListener(this);
  }
  public onNetworkChanged = (): void => {
    this.notifyViewAboutChanges();
  };
  public destroyListener = (): void => {
    this.networkHolder.removeNetworkListener(this);
  };

  private setLoading = (loading: boolean): void => {
    this.isLoaded = loading;
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };

  private switchSelected(): void {
    this.selected = !this.selected;
  }

  private handleSwitch() {
    if (this.selected) this.getNodesNeighborsUseCase.enableGetNeighborsEvent();
    else this.getNodesNeighborsUseCase.disableGetNeighborsEvent();
  }

  public onSwitchSelected() {
    this.switchSelected();

    this.setLoading(true);
    this.handleSwitch();
    this.setLoading(false);
  }

  public onModalClick(): void {}

  public attachView(baseView: BaseView): void {
    this.baseView = baseView;
  }
  public detachView(): void {
    this.baseView = undefined;
  }
}
