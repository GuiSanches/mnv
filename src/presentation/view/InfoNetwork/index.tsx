/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useState } from "react";
import { Line } from "../../../../styles/global";
import CalculateNetworkInfosUseCase from "../../../domain/interactors/Network/Calculations/CalculateNetworkInfosUseCase";
import useGetNetworkFromQuery from "../../util/useGetNetworkFromQuery";
import { NetworkCtx } from "../../util/NetworkCtx";
import InfoNetworkViewModel from "../../view-model/InfoNetwork/InfoNetworkViewModel";
import InfoNetworkViewModelImpl from "../../view-model/InfoNetwork/InfoNetworkViewModelImpl";
import ComputedElement from "./ComputedElement";
import ComputeElement from "./ComputeElement";
import { Header, InfoContainer, Title } from "./styles";
import useBaseView from "../../util/useGetBaseView";

const InfoNetworkComponent: FC = () => {
  const title = `Network information`;

  const { networkHolders, networkRepository } = useContext(NetworkCtx);
  const networkHolder = useGetNetworkFromQuery(networkHolders);

  const [infoNetworkViewModel, setInfoNetworkViewModel] =
    useState<InfoNetworkViewModel>();

  const [, baseView] = useBaseView<InfoNetworkViewModel>(
    networkHolder,
    infoNetworkViewModel
  );

  useEffect(() => {
    const calculateNetworkInfosUseCase: CalculateNetworkInfosUseCase =
      new CalculateNetworkInfosUseCase(networkRepository, networkHolder);
    const viewModel = new InfoNetworkViewModelImpl(
      calculateNetworkInfosUseCase,
      networkHolder
    );
    setInfoNetworkViewModel(viewModel);

    return () => {
      viewModel.destroyListener();
    };
  }, [networkHolder]);

  useEffect(() => {
    if (infoNetworkViewModel) {
      infoNetworkViewModel.attachView(baseView);
    }
  }, [infoNetworkViewModel]);

  return (
    <InfoContainer>
      {infoNetworkViewModel ? (
        <>
          <Header>
            <Title>{title}</Title>
            <Line />

            <ComputedElement
              title="Number of vertices:"
              total={infoNetworkViewModel.numberOfVertices}
            />
            <ComputedElement
              title="Number of edges:"
              total={infoNetworkViewModel.numberOfEdges}
            />
            <ComputeElement
              title="Average degree:"
              onCompute={infoNetworkViewModel.onComputeAverageDegree}
              total={infoNetworkViewModel.averageDegree}
            />
            <ComputeElement
              title="Average betweenness:"
              onCompute={infoNetworkViewModel.onComputeAverageBetweenness}
              total={infoNetworkViewModel.averageBetweeness}
            />
            <ComputeElement
              title="Average closeness:"
              onCompute={infoNetworkViewModel.onComputeAverageCloseness}
              total={infoNetworkViewModel.averageCloseness}
            />
          </Header>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </InfoContainer>
  );
};

export default InfoNetworkComponent;
