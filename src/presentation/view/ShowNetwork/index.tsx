/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import NetvCanvas from "../../../components/NetVCanvas";
import useGetNetworkFromQuery from "../../util/getNetworkFromQuery";
import { NetworkCtx } from "../../util/NetworkCtx";
import ShowNetworkViewModel from "../../view-model/ShowNetwork/ShowNetworkViewModel";
import ShowNetworkViewModelImpl from "../../view-model/ShowNetwork/ShowNetworkViewModelImpl";
import BaseView from "../BaseView";
import { Container, Canva } from "./styles";

const ShowNetworkComponent: FC = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const { networkHolders } = useContext(NetworkCtx);
  const [showNetworkViewModel, setShowNetworkViewModel] =
    useState<ShowNetworkViewModel>();
  const networkHolder = useGetNetworkFromQuery(networkHolders);

  const CanvaRef = useRef<HTMLDivElement>(null);

  const baseView: BaseView = useMemo(() => {
    const view = {
      onViewModelChanged: () => {
        setUpdate(!update);
      },
    };

    if (showNetworkViewModel) {
      showNetworkViewModel.detachView();
      showNetworkViewModel.attachView(view);
    }

    return view;
  }, [update, networkHolder]);

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
