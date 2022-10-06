import { RefObject, useMemo, useCallback, useEffect } from "react";
import NetworkHolder from "../domain/entity/Network/models/NetworkHolder";
import NetworkContainerResult from "../domain/entity/Network/structures/NetworkContainerResult";
import { NodeResult } from "../domain/entity/Network/structures/NodeResult";
import { hex2rgba } from "./Colors";

/* 
    Hook to manage NetV drawing logic
*/
export const useNetV = (
  refs: RefObject<HTMLDivElement>,
  networkHolder: NetworkHolder,
  NetV: any
): [() => any, (netUI: any, networkHolder: NetworkHolder) => void] => {
  const network = useMemo(() => {
    return networkHolder.getNetwork();
  }, [networkHolder]);

  const generateNetVData = useCallback(() => {
    return {
      nodes: network.network.nodes.map((n) => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
        style: {
          fill: hex2rgba(n.color, 0.8),
          strokeColor: hex2rgba("#ffffff", 1.0),
          r: n.size < 1 ? 5 + n.size : n.size,
        },
      })),
      links: network.network.edges.map((e) => ({
        source: e.source,
        target: e.target,
      })),
    };
  }, [network.network]);

  const generateNetVUI = useCallback(
    (div: HTMLElement, width: number, height: number) => {
      div.replaceChildren("");

      return new NetV({
        container: div,
        nodeLimit: 1e5,
        linkLimit: 1e7,
        width,
        height,
        node: {
          style: {
            strokeWidth: 0.8,
          },
        },
        link: {
          style: { strokeWidth: 1 },
        },
      });
    },
    [NetV]
  );

  const getRefProperties = useCallback((): [HTMLElement, number, number] => {
    const div = refs.current as HTMLElement;
    const width: number = refs.current!.clientWidth;
    const height: number = refs.current!.clientHeight;

    return [div, width, height];
  }, [refs]);

  const initNetContainer = useCallback(() => {
    const [div, width, height] = getRefProperties();
    div.replaceChildren("");

    if (refs.current && network.network) {
      // (await import('netv')).default // Is broken but may show some documentation.
      const networkUI = generateNetVUI(div, width, height);

      const NodeLinkData = generateNetVData();

      const dataAfterTransform = NetV.Utils.transformGraphPosition(
        NodeLinkData,
        width,
        width / 2,
        300
      );
      networkUI.data(dataAfterTransform);
      networkUI.draw();

      const EMPTY_CALLBACK = () => {};

      networkUI.nodes().forEach((node: any) => {
        networkUI.on("pan", EMPTY_CALLBACK);
        networkUI.on("zoom");

        node.on("dragging", EMPTY_CALLBACK);
      });
      return networkUI;
    }
    return undefined;
  }, [refs, network, getRefProperties, NetV]);

  const updateNetworkHolder = (
    networkUI: any,
    networkHolder: NetworkHolder
  ) => {
    const network = networkHolder.getNetwork();

    if (network.network) {
      const { nodes, edges } = network.network;

      const networkContainer: NetworkContainerResult = {
        nodes: networkUI.nodes().map(
          (node: { x: any; y: any }, i: number): NodeResult => ({
            ...nodes[i],
            position: {
              x: node.x(),
              y: node.y(),
            },
          })
        ),
        edges,
      };

      networkHolder.onNetworkContainerChanged(networkContainer);
    }
  };

  return [initNetContainer, updateNetworkHolder];
};
