/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import { NetworkCtx } from "../../util/NetworkCtx";
import LoadNetworkViewModel from "../../view-model/LoadNetwork/LoadNetworkViewModel";
import LoadNetworkViewModelImpl from "../../view-model/LoadNetwork/LoadNetworkViewModelImpl";
import BaseView from "../BaseView";
import DefaultNetwork from "./DefaultNetwork";
import { LoadingContainer } from "./styles";
import UploadJsonNetwork from "./UploadNetwork";

const LoadNetworkComponent: FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { networkHolder, networkRepository } = useContext(NetworkCtx);

    const [loadNetworkViewModel, setLoadNetworkViewModel] = useState<LoadNetworkViewModel>();

    const baseView: BaseView = useMemo(() => {
        const view = ({
            onViewModelChanged: () => {
                setUpdate(!update);
            }
        })

        if (loadNetworkViewModel) {
            loadNetworkViewModel.detachView();
            loadNetworkViewModel.attachView(view);
        }

        return view
    }, [update])



    useEffect(() => {
        const loadNetworksUseCase: LoadNetworksUseCase = new LoadNetworksUseCase(networkRepository, networkHolder);
        const viewModel = new LoadNetworkViewModelImpl(loadNetworksUseCase, networkHolder);
        setLoadNetworkViewModel(viewModel);
    }, []);

    useEffect(() => {
        if (loadNetworkViewModel) {
            loadNetworkViewModel.attachView(baseView);
            loadNetworkViewModel.ListDefaultNetworks();

            return () => {
                loadNetworkViewModel.destroyListener();
            }
        }
    }, [loadNetworkViewModel]);

    return (
        <LoadingContainer>
            {loadNetworkViewModel ?
                <>
                    <UploadJsonNetwork onUploadJsonFile={loadNetworkViewModel.onUploadJsonFile} />
                    <DefaultNetwork
                        options={loadNetworkViewModel.defaultNetworkOptions}
                        onLoadNetwork={loadNetworkViewModel.onLoadDefaultNetwork} loaded={loadNetworkViewModel.isLoaded} />
                </>
                :
                <span>Carregando</span>
            }

        </LoadingContainer>
    );
}

export default LoadNetworkComponent;