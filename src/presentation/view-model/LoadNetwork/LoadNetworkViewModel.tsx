import NetworkContainerResult from "../../../domain/entity/Network/structures/NetworkContainerResult";
import BaseModalModel from "../BaseModalModel";

export default interface LoadNetworkViewModel extends BaseModalModel {
    isLoaded: boolean;
    JsonFile: string;
    onUploadJsonFile() : void;

    nColFile: string;
    nColFileType: string;
    onLoadnColFile() : void;

    defaultNetwork: string;
    onLoadDefaultNetwork(filename: string) : void;

    onBrowseFile(extension: string) : void;
}