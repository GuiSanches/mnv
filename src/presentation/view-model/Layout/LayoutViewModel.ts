import ViewOptions from "../../../domain/entity/Network/models/ViewOptions";
import BaseModalModel from "../BaseModalModel";

export default interface LayoutViewModel extends BaseModalModel {
    isLoaded: boolean;
    gridVisualization: boolean;

    viewOption: ViewOptions;

    onSwitchSelected(): void;

}