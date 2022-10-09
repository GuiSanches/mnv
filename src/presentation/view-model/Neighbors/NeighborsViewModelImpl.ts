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

  public readonly type: "network" | "info" = "info";
  public isLoaded: boolean = false;
  public selected: boolean = false;
  public isKeep: boolean = false;

  public constructor(
    networkHolder: NetworkHolder,
    getNodesNeighborsUseCase: GetNodesNeighborsUseCase
  ) {
    this.getNodesNeighborsUseCase = getNodesNeighborsUseCase;

    this.networkHolder = networkHolder;
    this.networkHolder.addNetworkListener(this);
  }

  private handleSwitch() {
    if (this.selected) this.getNodesNeighborsUseCase.enableGetNeighborsEvent();
    else this.getNodesNeighborsUseCase.disableGetNeighborsEvent();
  }

  private setLoading = (loading: boolean): void => {
    this.isLoaded = loading;
  };

  private switchSelected(): void {
    this.selected = !this.selected;
  }

  public onNetworkChanged = (): void => {
    this.notifyViewAboutChanges();
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };

  public destroyListener = (): void => {
    this.networkHolder.removeNetworkListener(this);
  };

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
