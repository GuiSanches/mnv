import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import { NetworkCtx } from "../../presentation/util/NetworkCtx";
import useGetNetworkFromQuery from "../../presentation/util/useGetNetworkFromQuery";
import ShowNetworkComponent from "../../presentation/view/ShowNetwork";
import { usePrevious } from "../../utils/usePrevious";
import { Container, Grid } from "./styles";

const Canvas: FC = () => {
  const { options, networkHolders } = useContext(NetworkCtx);

  const [netFromQuery, id] = useGetNetworkFromQuery(networkHolders);
  const GRID_SIZE = 4;

  const [netV, setNetV] = useState<any>();

  const [elements, setElements] = useState<JSX.Element[]>([<></>]);

  useEffect(() => {
    const NetV = require("netv/build/NetV.js").default;
    setNetV(() => NetV);
  }, []);

  useEffect(() => {
    console.log("Selected changed", networkHolders);
  }, [netFromQuery]);

  useEffect(() => {
    if (options.layout === "Grid") {
      setElements([<></>]);
    }
  }, [options.layout, netFromQuery]);

  useEffect(() => {
    const populateElements = async () => {
      if (options.layout === "Grid") {
        let holder: NetworkHolder | null = netFromQuery;
        for (let i = elements.length; i < 3; i++) {
          await new Promise(() =>
            setTimeout(() => {
              if (holder) {
                setElements([
                  ...elements,
                  <ShowNetworkComponent
                    key={"ads" + i}
                    networkHolder={holder}
                    NetV={netV}
                  />,
                ]);
                holder = netFromQuery.child;
              }
            }, 200)
          );
        }
      }
    };
    populateElements();
  }, [elements]);

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
