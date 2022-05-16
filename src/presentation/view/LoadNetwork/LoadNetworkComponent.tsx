import React, { FC, useContext, useEffect } from "react";
import { InputGroupPrepend, InputGroupText, Label, Line } from "../../../../styles/global";
import Modal, { withModal } from "../../../components/Modal";
import { NetworkCtx } from "../../util/NetworkCtx";
import LoadNetworkViewModel from "../../view-model/LoadNetwork/LoadNetworkViewModel";
import DefaultNetwork from "./DefaultNetwork";
import withLoadNetworkInheritance from "./HOC/withLoadNetworkInheritance";
import useLoadNetwork from "./hooks/useLoadNetwork";
import { LoadingContainer, Container } from "./styles";

export interface LoadNetworkComponentProps {
    loadNetworkViewModel: LoadNetworkViewModel;
    artificialExtending: ReturnType<typeof useLoadNetwork>;
}

const LoadNetworkComponent: FC<LoadNetworkComponentProps> = ({ loadNetworkViewModel, artificialExtending }) => {
    const [isLoaded, onViewModelChanged] = artificialExtending;

    const ctx = useContext(NetworkCtx)
    useEffect(() => {
        console.log(loadNetworkViewModel)
        loadNetworkViewModel.LoadDefaultNetwork()
    }, [loadNetworkViewModel])

    return (
        <LoadingContainer>
            <DefaultNetwork options={loadNetworkViewModel.defaultNetwork} onLoadNetwork={loadNetworkViewModel.onLoadDefaultNetwork}/>

        </LoadingContainer>
    )
}

export default withLoadNetworkInheritance(LoadNetworkComponent)