/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import useGetNetworkFromQuery from "../../util/useGetNetworkFromQuery";
import { NetworkCtx } from "../../util/NetworkCtx";
import ShowNetworkViewModel from "../../view-model/ShowNetwork/ShowNetworkViewModel";
import ShowNetworkViewModelImpl from "../../view-model/ShowNetwork/ShowNetworkViewModelImpl";
import { Container, Canva } from "./styles";
import useBaseView from "../../util/useGetBaseView";
import { useNetV } from "../../../utils/useNetV";
import { usePrevious } from "../../../utils/usePrevious";

const ShowNetworkComponent: FC = () => {
  const [showNetworkViewModel, setShowNetworkViewModel] =
    useState<ShowNetworkViewModel>();

  const [netUI, setNetUI] = useState<any>();

  const { networkHolders } = useContext(NetworkCtx);
  const networkHolder = useGetNetworkFromQuery(networkHolders);
  const prevNetworkHolder = usePrevious(networkHolder);

  const CanvaRef = useRef<HTMLDivElement>(null);
  const [initNetContainer, updateNet] = useNetV(CanvaRef, networkHolder);

  const [update, baseView] = useBaseView<ShowNetworkViewModel>(
    networkHolder,
    showNetworkViewModel
  );

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

  /* 
    Initiate netCanvas after net changes
  */
  useEffect(() => {
    const netUI = initNetContainer();
    setNetUI(netUI);
  }, [update, networkHolder]);

  /* 
    Updates NetworkHolder nodes position
    After component's ummount 
   */
  useEffect(() => {
    return () => {
      if (netUI && networkHolder !== prevNetworkHolder) {
        updateNet(netUI, prevNetworkHolder);
      }
    };
  }, [networkHolder, netUI]);

  return (
    <Container>
      <Canva ref={CanvaRef}>
        {showNetworkViewModel && <h1>Interaja com o mouse</h1>}
      </Canva>
    </Container>
  );
};

export default ShowNetworkComponent;
