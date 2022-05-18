import BaseView from "../../view/BaseView";
import BaseViewModel from "../BaseViewModel";

export default interface ShowNetworkViewModel extends BaseViewModel {
    isLoaded: boolean;

    destroyListener(): void;
}