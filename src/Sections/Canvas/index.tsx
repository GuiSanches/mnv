import { FC, useContext, useEffect, useState } from "react";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import GetChildNodesUseCase from "../../domain/interactors/Network/Mnv/GetChildNodesUseCase";
import { NetworkCtx } from "../../presentation/util/NetworkCtx";
import useBaseView from "../../presentation/util/useGetBaseView";
import useGetNetworkFromQuery from "../../presentation/util/useGetNetworkFromQuery";
import CanvasViewModel from "../../presentation/view-model/Canvas/CanvasViewModel";
import CanvasViewModelImpl from "../../presentation/view-model/Canvas/CanvasViewModelImpl";
import ShowNetworkComponent from "../../presentation/view/ShowNetwork";
import { Container, Grid } from "./styles";

const Canvas: FC = () => {
  const { options, networkHolders } = useContext(NetworkCtx);
  const [netFromQuery] = useGetNetworkFromQuery(networkHolders);

  const [netV, setNetV] = useState<any>();
  const [elements, setElements] = useState<JSX.Element[]>([]);

  const [canvasViewModel, setCanvasViewModel] = useState<CanvasViewModel>();
  const [update, baseView] = useBaseView<CanvasViewModel>(canvasViewModel);

  useEffect(() => {
    const NetV = require("netv/build/NetV.js").default;
    setNetV(() => NetV);
  }, []);

  useEffect(() => {
    setElements([]);

    const viewModel = new CanvasViewModelImpl(netFromQuery);
    setCanvasViewModel(viewModel);

    return () => {
      viewModel.destroyListener();
    };
  }, [netFromQuery]);

  useEffect(() => {
    if (canvasViewModel) canvasViewModel.attachView(baseView);
  }, [canvasViewModel]);

  useEffect(() => {
    const populateElements = async () => {
      const grid: JSX.Element[] = [];
      let holder: NetworkHolder | null = netFromQuery;

      const getChildNodesUseCase: GetChildNodesUseCase =
        new GetChildNodesUseCase(holder);
      try {
        getChildNodesUseCase.enableChildNodesHighlight();
      } catch (e: any) {
        console.log("Não foi dessa vez");
      }
      for (let i = 0; i < 2; i++) {
        if (holder) {
          grid.push(
            <ShowNetworkComponent
              key={`grid-${i}`}
              networkHolder={holder}
              NetV={netV}
            />
          );
          holder = holder.child;
        }
      }
      setElements([...grid]);
    };

    if (options.layout === "Grid") populateElements();
  }, [options.layout, netFromQuery, netV, update]);

  return (
    <Container>
      {options.layout === "Pages" && (
        <ShowNetworkComponent networkHolder={netFromQuery} NetV={netV} />
      )}
      {options.layout === "Grid" && <Grid>{elements}</Grid>}
    </Container>
  );
};

export default Canvas;
