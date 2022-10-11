import NetworkHolder from "../../../entity/Network/models/NetworkHolder";
import { NodeResult } from "../../../entity/Network/structures/NodeResult";
import NetworkStyle from "../../common/NetworkStyle";
import UIProperties from "../../common/UIProperties";

type Layers = {
  parentUI: any;
  childUI: any;
};
interface MouseEventsParams {
  parentNode: NodeResult;
  Layers: Layers;
  childLinks: any[];
}

export default class GetChildNodesUseCase {
  private parentNetwork: NetworkHolder;

  public constructor(networkHolder: NetworkHolder) {
    this.parentNetwork = networkHolder;
  }

  private testNetworkLoaded(netUI: any) {
    if (!netUI) throw new Error("Rede não carregada");
  }

  /**
   * Add node mouse over and mouse out events
   * @param {any} node Nove UI instance
   * @param {() => void)} onMouseOver mouseOver callback
   * @param {() => void)} onMouseOut mouseOut callback
   */
  private addEvents(
    node: any,
    onMouseOver: () => void,
    onMouseOut: () => void
  ) {
    node.on(UIProperties.MOUSE_OVER_EVENT, onMouseOver);
    node.on(UIProperties.MOUSE_OUT_EVENT, onMouseOut);
  }

  /**
   * Draw UI layers
   * @param {Layers} Layers UI wrapper
   */
  private drawLayers = (Layers: Layers) => {
    Layers.parentUI.draw();
    Layers.childUI.draw();
  };

  /**
   * Highlight related nodes
   * @param {any[] | undefined} relatedNodes Child layer related nodes UI instances
   * @param {any[]} childLinks Child layer link array
   */
  private highlightChildRelatedNodes = (
    relatedNodes: any[] | undefined,
    childLinks: any[]
  ) => {
    if (relatedNodes)
      relatedNodes.forEach((node: any) => {
        const childNeighborLinks = node.neighborLinks();
        NetworkStyle.highlightConnections(childLinks, childNeighborLinks);
      });
  };

  /**
   * Add parent mouse events
   */
  private addNodeHighlightMouseEvents(params: MouseEventsParams) {
    const { parentNode, Layers, childLinks } = params;

    const node = Layers.parentUI.getNodeById(parentNode.id);
    const strokeWidth = node.strokeWidth();
    
    const relatedNodes = parentNode.forward?.map((n) =>
      Layers.childUI.getNodeById(n.id)
    );

    const onMouseOver = () => {
      node.strokeWidth(strokeWidth + UIProperties.STROKE_WIDTH_INCREMENT);

      this.highlightChildRelatedNodes(relatedNodes, childLinks);

      this.drawLayers(Layers);
    };
    const onMouseOut = () => {
      node.strokeWidth(strokeWidth);
      NetworkStyle.showLinks(childLinks);

      this.drawLayers(Layers);
    };

    this.addEvents(node, onMouseOver, onMouseOut);
  }

  /**
   * Enable Child related nodes highlight by mouse interaction
   */
  public enableChildNodesHighlight() {
    const parentUI = this.parentNetwork.getNetUI();
    this.testNetworkLoaded(parentUI);

    const childUI = this.parentNetwork.child?.getNetUI();
    this.testNetworkLoaded(childUI);
    const childLinks = childUI.links();

    const parentNodes = this.parentNetwork.getNetwork().network.nodes;

    parentNodes.forEach((parentNode) => {
      this.addNodeHighlightMouseEvents({
        parentNode,
        Layers: { parentUI, childUI },
        childLinks,
      });
    });
  }
}
