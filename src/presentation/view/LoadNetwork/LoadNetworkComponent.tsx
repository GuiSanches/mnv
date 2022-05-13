import React, { FC, useEffect } from "react";
import LoadNetworkViewModel from "../../view-model/LoadNetwork/LoadNetworkViewModel";
import withLoadNetworkInheritance from "./HOC/withLoadNetworkInheritance";
import useLoadNetwork from "./hooks/useLoadNetwork";

export interface LoadNetworkComponentProps {
    loadNetworkViewModel: LoadNetworkViewModel;
    artificialExtending: ReturnType<typeof useLoadNetwork>
}

const LoadNetworkComponent: FC<LoadNetworkComponentProps> = ({ loadNetworkViewModel, artificialExtending }) => {
    const [isLoaded, onViewModelChanged] = artificialExtending;

    return (
        <p>{`Hello ${isLoaded}`}</p>
    )
}

export default withLoadNetworkInheritance(LoadNetworkComponent)