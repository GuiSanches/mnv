import { FC, useContext, useEffect, useState } from "react";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import { NetworkCtx } from "../../presentation/util/NetworkCtx";
import useGetNetworkFromQuery from "../../presentation/util/useGetNetworkFromQuery";
import ShowNetworkComponent from "../../presentation/view/ShowNetwork";
import { Container, Grid } from "./styles";

const Canvas: FC = () => {
  const { options, networkHolders } = useContext(NetworkCtx);
  const [netFromQuery] = useGetNetworkFromQuery(networkHolders);

  const [netV, setNetV] = useState<any>();
  const [elements, setElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const NetV = require("netv/build/NetV.js").default;
    setNetV(() => NetV);
  }, []);

  useEffect(() => {
    setElements([]);
    console.log("Selected changed", networkHolders);
  }, [netFromQuery]);

  useEffect(() => {
    const populateElements = () => {
      const grid: JSX.Element[] = [];
      let holder: NetworkHolder | null = netFromQuery;
      for (let i = 0; i < 2; i++) {
        if (holder) {
          grid.push(
            <ShowNetworkComponent
              key={`grid-${i}`}
              networkHolder={netFromQuery}
              NetV={netV}
            />
          );
          holder = holder.child;
        }
      }
      setElements([...grid]);
    };

    if (options.layout === "Grid") populateElements();
  }, [options.layout, netFromQuery, netV]);

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
