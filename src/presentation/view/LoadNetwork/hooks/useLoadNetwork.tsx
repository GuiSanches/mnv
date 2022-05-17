import { FC, useState } from "react";
import LoadNetworkViewModel from "../../../view-model/LoadNetwork/LoadNetworkViewModel";
import BaseView from "../../BaseView";
import { LoadNetworkComponentProps } from "../LoadNetworkComponent";

// Every method should be incorporated by the HOOK
class LoadNetworkInheritance implements BaseView {
    onViewModelChanged(): void {
        throw new Error("Method not implemented.");
    }
}

const useLoadNetwork = (loadNetworkViewModel: LoadNetworkViewModel) : [boolean, () => void]=> {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const onViewModelChanged = () => {
        console.log('runned')
        setIsLoaded(loadNetworkViewModel.isLoaded)
    }

    return [isLoaded, onViewModelChanged]
}

export default useLoadNetwork