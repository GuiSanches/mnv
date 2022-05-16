import React, { FC, useContext, useEffect } from "react";
import Modal, { withModal } from "../../../components/Modal";
import { NetworkCtx } from "../../util/NetworkCtx";
import LoadNetworkViewModel from "../../view-model/LoadNetwork/LoadNetworkViewModel";
import withLoadNetworkInheritance from "./HOC/withLoadNetworkInheritance";
import useLoadNetwork from "./hooks/useLoadNetwork";

export interface LoadNetworkComponentProps {
    loadNetworkViewModel: LoadNetworkViewModel;
    artificialExtending: ReturnType<typeof useLoadNetwork>;
}

const LoadNetworkComponent: FC<LoadNetworkComponentProps> = ({ loadNetworkViewModel, artificialExtending }) => {
    const [isLoaded, onViewModelChanged] = artificialExtending;

    const ctx = useContext(NetworkCtx)
    useEffect(() => {
        console.log('ctx', ctx)
    })

    return (
        <p>{`Helloa ${isLoaded}`}</p>
    )
}

export default withLoadNetworkInheritance(LoadNetworkComponent)