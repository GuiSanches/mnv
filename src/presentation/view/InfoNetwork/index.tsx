/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { Line } from "../../../../styles/global";
import CalculateNetworkInfosUseCase from "../../../domain/interactors/Network/Calculations/CalculateNetworkInfosUseCase";
import useGetNetworkFromQuery from "../../util/getNetworkFromQuery";
import { NetworkCtx } from "../../util/NetworkCtx";
import InfoNetworkViewModel from "../../view-model/InfoNetwork/InfoNetworkViewModel";
import InfoNetworkViewModelImpl from "../../view-model/InfoNetwork/InfoNetworkViewModelImpl";
import BaseView from "../BaseView";
import ComputedElement from "./ComputedElement";
import ComputeElement from "./ComputeElement";
import { Header, InfoContainer, Title } from "./styles";

const InfoNetworkComponent: FC = () => {
  const title = `Network information`;
  const [update, setUpdate] = useState<boolean>(false);
  const { networkHolders, networkRepository } = useContext(NetworkCtx);

  const networkHolder = useGetNetworkFromQuery(networkHolders);

  const [infoNetworkViewModel, setInfoNetworkViewModel] =
    useState<InfoNetworkViewModel>();

  const baseView: BaseView = useMemo(() => {
    const view: BaseView = {
      onViewModelChanged: () => {
        setUpdate(!update);
      },
    };

    if (infoNetworkViewModel) {
      infoNetworkViewModel.detachView();
      infoNetworkViewModel.attachView(view);
    }

    return view;
  }, [update, networkHolder]);

  useEffect(() => {
    const calculateNetworkInfosUseCase: CalculateNetworkInfosUseCase =
      new CalculateNetworkInfosUseCase(networkRepository, networkHolder);
    const viewModel = new InfoNetworkViewModelImpl(
      calculateNetworkInfosUseCase,
      networkHolder
    );
    setInfoNetworkViewModel(viewModel);
  }, [networkHolder]);

  useEffect(() => {
    if (infoNetworkViewModel) {
      infoNetworkViewModel.attachView(baseView);

      return () => {
        infoNetworkViewModel.destroyListener();
      };
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
