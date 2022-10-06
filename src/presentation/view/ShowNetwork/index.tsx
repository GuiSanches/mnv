/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react";
import ShowNetworkViewModel from "../../view-model/ShowNetwork/ShowNetworkViewModel";
import ShowNetworkViewModelImpl from "../../view-model/ShowNetwork/ShowNetworkViewModelImpl";
import { Container, Canva } from "./styles";
import useBaseView from "../../util/useGetBaseView";
import { useNetV } from "../../../utils/useNetV";
import { usePrevious } from "../../../utils/usePrevious";
import NetworkHolder from "../../../domain/entity/Network/models/NetworkHolder";

interface Props {
  networkHolder: NetworkHolder;
  NetV: any;
}

const ShowNetworkComponent: FC<Props> = ({ networkHolder, NetV }) => {
  const [showNetworkViewModel, setShowNetworkViewModel] =
    useState<ShowNetworkViewModel>();

  const [netUI, setNetUI] = useState<any>();
  const prevNetworkHolder = usePrevious(networkHolder);

  const CanvaRef = useRef<HTMLDivElement>(null);
  const [initNetContainer, updateNet] = useNetV(CanvaRef, networkHolder, NetV);

  const [update, baseView] =
    useBaseView<ShowNetworkViewModel>(showNetworkViewModel);

  useEffect(() => {
    const viewModel = new ShowNetworkViewModelImpl(networkHolder);
    setShowNetworkViewModel(viewModel);

    return () => {
      viewModel.destroyListener();
    };
  }, [networkHolder]);

  useEffect(() => {
    if (showNetworkViewModel) {
      showNetworkViewModel.attachView(baseView);
    }
  }, [showNetworkViewModel]);

  /* 
    Initiate netCanvas after net changes
  */
  useEffect(() => {
    const UI = initNetContainer();
    setNetUI(UI);
    networkHolder.setNetUI(UI);
  }, [update, networkHolder]);

  useEffect(() => {
    /* 
    Updates NetworkHolder nodes position
    After component's ummount 
   */
    return () => {
      if (netUI) {
        updateNet(netUI, prevNetworkHolder);
        netUI.dispose();
      }
    };
  }, [netUI]);

  return (
    <Container>
      <Canva ref={CanvaRef}>
        {showNetworkViewModel && <h1>Carregue uma rede</h1>}
      </Canva>
    </Container>
  );
};

export default ShowNetworkComponent;
