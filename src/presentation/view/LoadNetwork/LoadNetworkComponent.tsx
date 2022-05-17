import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { InputGroupPrepend, InputGroupText, Label, Line } from "../../../../styles/global";
import Modal, { withModal } from "../../../components/Modal";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import { NetworkCtx } from "../../util/NetworkCtx";
import LoadNetworkViewModel from "../../view-model/LoadNetwork/LoadNetworkViewModel";
import LoadNetworkViewModelImpl from "../../view-model/LoadNetwork/LoadNetworkViewModelImpl";
import BaseView from "../BaseView";
import DefaultNetwork from "./DefaultNetwork";
import useLoadNetwork from "./hooks/useLoadNetwork";
import { LoadingContainer } from "./styles";


const LoadNetworkComponent: FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { networkHolder, networkRepository, setNetworkHolder } = useContext(NetworkCtx)

    const baseView: BaseView = useMemo(() => {
        const onViewModelChanged = () => {
            setUpdate(!update)
        }

        return ({
            onViewModelChanged
        })
    }, []);

    const loadNetworksUseCase: LoadNetworksUseCase = new LoadNetworksUseCase(networkRepository, networkHolder);
    const [loadNetworkViewModel, setLoadNetworkViewModel] = useState<LoadNetworkViewModel>(
        new LoadNetworkViewModelImpl(loadNetworksUseCase, networkHolder)
    );

    useEffect(() => {
        loadNetworkViewModel.attachView(baseView)
        loadNetworkViewModel.LoadDefaultNetwork()
    }, [])


    return (
        <LoadingContainer>
            <DefaultNetwork
                options={loadNetworkViewModel.defaultNetwork}
                onLoadNetwork={loadNetworkViewModel.onLoadDefaultNetwork} />

        </LoadingContainer>
    )
}

export default LoadNetworkComponent