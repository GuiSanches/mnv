/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import NetvCanvas from "../../../components/NetVCanvas";
import useGetNetworkFromQuery from "../../util/useGetNetworkFromQuery";
import { NetworkCtx } from "../../util/NetworkCtx";
import ShowNetworkViewModel from "../../view-model/ShowNetwork/ShowNetworkViewModel";
import ShowNetworkViewModelImpl from "../../view-model/ShowNetwork/ShowNetworkViewModelImpl";
import BaseView from "../BaseView";
import { Container, Canva } from "./styles";
import useBaseView from "../../util/useGetBaseView";

const ShowNetworkComponent: FC = () => {
  const [showNetworkViewModel, setShowNetworkViewModel] =
    useState<ShowNetworkViewModel>();

  const { networkHolders } = useContext(NetworkCtx);
  const networkHolder = useGetNetworkFromQuery(networkHolders);

  const [update, baseView] = useBaseView<ShowNetworkViewModel>(
    networkHolder,
    showNetworkViewModel
  );
  const CanvaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewModel = new ShowNetworkViewModelImpl(networkHolder);
    setShowNetworkViewModel(viewModel);
  }, [networkHolder]);

  useEffect(() => {
    if (showNetworkViewModel) {
      showNetworkViewModel.attachView(baseView);

      return () => {
        showNetworkViewModel.destroyListener();
      };
    }
  }, [showNetworkViewModel]);

  const NetV = useMemo(
    () => <NetvCanvas refs={CanvaRef} network={networkHolder.getNetwork()} />,
    [update, networkHolder]
  );

  return (
    <Container>
      <Canva ref={CanvaRef}>{showNetworkViewModel && NetV}</Canva>
    </Container>
  );
};

export default ShowNetworkComponent;
