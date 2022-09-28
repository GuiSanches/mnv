import BaseModalModel from "../BaseModalModel";

export default interface LayoutViewModel extends BaseModalModel {
    isLoaded: boolean;
    gridVisualization: boolean;

    onSwitchSelected(): void;

}