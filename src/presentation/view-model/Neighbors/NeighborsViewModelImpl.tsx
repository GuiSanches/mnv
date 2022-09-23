import GetNodesNeighborsUseCase from "../../../domain/interactors/Network/Neighbors/GetNodesNeighborsUseCase";
import BaseView from "../../view/BaseView";
import NeighborsViewModel from "./NeighborsViewModel";

export default class NeighborsViewModelImpl implements NeighborsViewModel {
  private baseView?: BaseView;
  private getNodesNeighborsUseCase: GetNodesNeighborsUseCase;

  public isLoaded: boolean;
  public selected: boolean;
  public isKeep: boolean;

  public constructor(getNodesNeighborsUseCase: GetNodesNeighborsUseCase) {
    this.isLoaded = false;
    this.selected = false;
    this.isKeep = false;

    this.getNodesNeighborsUseCase = getNodesNeighborsUseCase;
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

  public switchSelected(): void {
    this.selected = !this.selected;

    this.setLoading(false);
    if (this.selected) this.getNodesNeighborsUseCase.enableGetNeighborsEvent();
    else this.getNodesNeighborsUseCase.disableGetNeighborsEvent();
    this.setLoading(true);
  }

  public onModalClick(): void {}

  public attachView(baseView: BaseView): void {
    this.baseView = baseView;
  }
  public detachView(): void {
    this.baseView = undefined;
  }
}
