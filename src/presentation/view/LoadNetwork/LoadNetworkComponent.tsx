import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import { NetworkCtx } from "../../util/NetworkCtx";
import LoadNetworkViewModel from "../../view-model/LoadNetwork/LoadNetworkViewModel";
import LoadNetworkViewModelImpl from "../../view-model/LoadNetwork/LoadNetworkViewModelImpl";
import BaseView from "../BaseView";
import DefaultNetwork from "./DefaultNetwork";
import { LoadingContainer } from "./styles";


const LoadNetworkComponent: FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { networkHolder, networkRepository } = useContext(NetworkCtx);

    const baseView: BaseView = useMemo(() => {
        const onViewModelChanged = () => {
            setUpdate(!update);
        }

        return ({
            onViewModelChanged
        })
    }, []);


    const [loadNetworkViewModel, setLoadNetworkViewModel] = useState<LoadNetworkViewModel>();

    useEffect(() => {
        const loadNetworksUseCase: LoadNetworksUseCase = new LoadNetworksUseCase(networkRepository, networkHolder);
        const viewModel = (
            new LoadNetworkViewModelImpl(loadNetworksUseCase, networkHolder)
        )
        setLoadNetworkViewModel(viewModel)
        viewModel.attachView(baseView);
    }, [])

    return (
        <LoadingContainer>
            {loadNetworkViewModel &&
                <DefaultNetwork
                    options={loadNetworkViewModel.defaultNetworkOptions}
                    onLoadNetwork={loadNetworkViewModel.onLoadDefaultNetwork} />
            }

        </LoadingContainer>
    );
}

export default LoadNetworkComponent