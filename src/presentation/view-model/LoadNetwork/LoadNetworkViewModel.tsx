import { NetworkContainer } from "../../../adapter/mnvLoadNet/types";
import BaseModalModel from "../BaseModalModel";
export default interface LoadNetworkViewModel extends BaseModalModel {
    isLoaded: boolean;
    JsonFile: string;
    onUploadJsonFile(network: NetworkContainer) : void;

    nColFile: string;
    nColFileType: string;
    onLoadnColFile() : void;

    defaultNetwork: string;
    defaultNetworkOptions: string[]
    ListDefaultNetworks(): void
    onLoadDefaultNetwork(filename: string) : void;

    onBrowseFile(extension: string) : void;

    destroyListener(): void;
}