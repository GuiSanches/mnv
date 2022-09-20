/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect, useState } from "react";
import LoadNetworksUseCase from "../../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import { NetworkCtx } from "../../util/NetworkCtx";
import LoadNetworkViewModel from "../../view-model/LoadNetwork/LoadNetworkViewModel";
import LoadNetworkViewModelImpl from "../../view-model/LoadNetwork/LoadNetworkViewModelImpl";
import DefaultNetwork from "./DefaultNetwork";
import { LoadingContainer } from "./styles";
import UploadJsonNetwork from "./UploadNetwork";
import useGetNetworkFromQuery from "../../util/useGetNetworkFromQuery";
import useBaseView from "../../util/useGetBaseView";
import DefaultChildNetwork from "./DefaultChildNetwork";

const LoadNetworkComponent: FC = () => {
  const { networkHolders, networkRepository } = useContext(NetworkCtx);

  const networkHolder = useGetNetworkFromQuery(networkHolders);

  const [loadNetworkViewModel, setLoadNetworkViewModel] =
    useState<LoadNetworkViewModel>();
  const [, baseView] = useBaseView<LoadNetworkViewModel>(
    networkHolder,
    loadNetworkViewModel
  );

  useEffect(() => {
    const loadNetworksUseCase: LoadNetworksUseCase = new LoadNetworksUseCase(
      networkRepository,
      networkHolder
    );

    const viewModel = new LoadNetworkViewModelImpl(
      loadNetworksUseCase,
      networkHolder
    );
    setLoadNetworkViewModel(viewModel);

    return () => {
      viewModel.destroyListener();
    };
  }, [networkHolder]);

  useEffect(() => {
    if (loadNetworkViewModel) {
      loadNetworkViewModel.attachView(baseView);
      loadNetworkViewModel.ListDefaultNetworks();
    }
  }, [loadNetworkViewModel]);

  return (
    <LoadingContainer>
      {loadNetworkViewModel ? (
        <>
          <UploadJsonNetwork
            onUploadJsonFile={loadNetworkViewModel.onUploadJsonFile}
          />
          <DefaultNetwork
            options={loadNetworkViewModel.defaultNetworkOptions}
            onLoadNetwork={loadNetworkViewModel.onLoadDefaultNetwork}
            loaded={loadNetworkViewModel.isLoaded}
            title="Default networks"
          />
          <DefaultChildNetwork
            options={loadNetworkViewModel.defaultNetworkOptions}
            networkHolder={networkHolder}
          />
        </>
      ) : (
        <span>Carregando</span>
      )}
    </LoadingContainer>
  );
};

export default LoadNetworkComponent;
