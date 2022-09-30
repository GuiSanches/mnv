import ViewOptions from "../../../domain/entity/Network/models/ViewOptions";
import BaseView from "../../view/BaseView";
import LayoutViewModel from "./LayoutViewModel";

export default class LayoutViewModelImpl implements LayoutViewModel {
  private baseView?: BaseView;

  public isLoaded: boolean;
  public gridVisualization: boolean;
  public isKeep: boolean;
  public viewOption: ViewOptions;

  public constructor() {
    this.isLoaded = false;
    this.gridVisualization = false;
    this.isKeep = false;
    this.viewOption = {
      layout: "Grid",
    };
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