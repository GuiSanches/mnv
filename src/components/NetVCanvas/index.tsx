import { MutableRefObject, FC, useEffect, RefObject, useState } from "react";
import NetworkResult from "../../domain/entity/Network/structures/NetworkResult";


interface Props {
  refs: RefObject<HTMLDivElement>,
  network: NetworkResult
}

const hex2rgba = (hex: string, alpha = 1.) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x: string) => parseInt(x, 16) / 255);
  let ret = {
    r, g, b, a: alpha
  }
  return ret
};

const NetvCanvas: FC<Props> = ({ refs, network }) => {
  useEffect(() => {
    if (network.network) {      
      initNetContainer();
    }
  })

  const initNetContainer = () => {
    if (refs.current) {
      const NetV = require('netv/build/NetV.js').default; // Module must be import after did Mount, cause it uses Window var
      // (await import('netv')).default // Is broken but may show some documentation.
      const div = refs.current as HTMLElement
      const width: number = refs.current.clientWidth;
      const height: number = refs.current.clientHeight;

      const networkUI = new NetV({
        container: div,
        nodeLimit: 1e5,
        linkLimit: 1e7,
        width,
        height,
        node: {
          style: {
            strokeWidth: 0.8
          }
        },
        link: {
          style: { strokeWidth: 1 }
        }
      })

      const NodeLinkData = {
        nodes: network.network.nodes
          .map(n => ({
            id: n.id,
            x: n.x,
            y: n.y,
            style: {
              fill: hex2rgba(n.color, 0.8),
              strokeColor: hex2rgba('#ffffff', 1.0),
              r: n.size < 1 ? 5 + n.size : n.size
            }
          })),
        links: network.network.edges
          .map(e => ({
            source: e.source,
            target: e.target
          }))
      }
      const dataAfterTransform = NetV.Utils.transformGraphPosition(NodeLinkData, width, width / 2, 300)
      networkUI.data(dataAfterTransform);
      networkUI.draw();

      const EMPTY_CALLBACK = () => { }

      networkUI.nodes().forEach((node: any) => {
        networkUI.on('pan', (EMPTY_CALLBACK));
        networkUI.on('zoom');

        node.on('dragging', () => { });
      });
    }

  }

  return (
    <>
      <h1>Interaja com o mouse</h1>
    </>
  )
}

export default NetvCanvas;