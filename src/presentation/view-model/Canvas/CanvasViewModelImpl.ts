import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import BaseView from "../../view/BaseView";
import CanvasViewModel from "./CanvasViewModel";

export default class CanvasViewModelImpl
  implements CanvasViewModel, NetworkListener
{
  private baseView?: BaseView;
  private networkHolder: NetworkHolder;

  public isLoaded: boolean;
  public type: "network" | "info";

  constructor(networkHolder: NetworkHolder) {
    this.type = "info";
    this.isLoaded = false;

    this.networkHolder = networkHolder;
    this.networkHolder.addNetworkListener(this);
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };

  public attachView(baseView: BaseView): void {
    this.baseView = baseView;
  }

  public detachView(): void {
    this.baseView = undefined;
  }

  public onNetworkChanged(): void {
    this.notifyViewAboutChanges();
  }

  public destroyListener(): void {
    this.networkHolder.removeNetworkListener(this);
  }
}
