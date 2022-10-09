import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";
import NetworkListener from "../../../domain/entity/Network/models/NetworkListener";
import ViewOptions from "../../../domain/entity/Network/models/ViewOptions";
import BaseView from "../../view/BaseView";
import LayoutViewModel from "./LayoutViewModel";

export default class LayoutViewModelImpl
  implements LayoutViewModel, NetworkListener
{
  private baseView?: BaseView;
  private networkHolder: NetworkHolder;

  public readonly type: "network" | "info" = "info";
  public isLoaded: boolean = false;
  public gridVisualization: boolean = false;
  public isKeep: boolean = false;
  public viewOption: ViewOptions = {
    layout: "Grid",
    loading: true,
  };

  constructor(networkHolder: NetworkHolder) {
    this.isKeep = false;

    this.networkHolder = networkHolder;
    this.networkHolder.addNetworkListener(this);
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };

  public onNetworkChanged(): void {
    this.notifyViewAboutChanges();
  }
  public destroyListener(): void {
    this.networkHolder.removeNetworkListener(this);
  }

  public onSwitchSelected(): void {
    throw new Error("Method not implemented.");
  }
  public onModalClick(): void {
    throw new Error("Method not implemented.");
  }
  public attachView(baseView: BaseView): void {
    this.baseView = baseView;
  }
  public detachView(): void {
    this.baseView = undefined;
  }
}
