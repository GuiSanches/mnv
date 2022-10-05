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

  public isLoaded: boolean;
  public gridVisualization: boolean;
  public isKeep: boolean;
  public viewOption: ViewOptions;
  public type: "network" | "info";

  constructor(networkHolder: NetworkHolder) {
    this.isLoaded = false;
    this.gridVisualization = false;
    this.isKeep = false;
    this.type = "info";
    this.viewOption = {
      layout: "Grid",
      loading: true,
    };

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
