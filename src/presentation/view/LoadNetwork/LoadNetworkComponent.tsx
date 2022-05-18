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

    const baseView: BaseView = ({
        onViewModelChanged: () => {
            setUpdate(!update);
        }
    })

    const loadNetworksUseCase: LoadNetworksUseCase = new LoadNetworksUseCase(networkRepository, networkHolder);

    const [loadNetworkViewModel, setLoadNetworkViewModel] = useState<LoadNetworkViewModel>(new LoadNetworkViewModelImpl(loadNetworksUseCase, networkHolder));

    useEffect(() => {
        loadNetworkViewModel.attachView(baseView);
        loadNetworkViewModel.ListDefaultNetworks();
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