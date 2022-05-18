import NetworkContainerResult from "../../../domain/entity/Network/structures/NetworkContainerResult";
import BaseView from "../../view/BaseView";
import BaseModalModel from "../BaseModalModel";

export default interface LoadNetworkViewModel extends BaseModalModel {
    isLoaded: boolean;
    JsonFile: string;
    onUploadJsonFile() : void;

    nColFile: string;
    nColFileType: string;
    onLoadnColFile() : void;

    defaultNetwork: string;
    defaultNetworkOptions: string[]
    ListDefaultNetworks(): void
    onLoadDefaultNetwork(filename: string) : void;

    onBrowseFile(extension: string) : void;

    baseView?: BaseView;
}