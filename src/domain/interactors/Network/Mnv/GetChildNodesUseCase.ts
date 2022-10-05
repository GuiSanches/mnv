import NetworkHolder from "../../../entity/Network/models/NetworkHolder";

export default class GetChildNodesUseCase {
  private readonly HIGHLIGHT_OPACITY = 0.5;
  private readonly UNHIGHLIGHT_OPACITY = 0.01;
  private readonly STROKE_WIDTH_INCREMENT = 2;
  private readonly MOUSE_OVER_EVENT = "mouseover";
  private readonly MOUSE_OUT_EVENT = "mouseout";
  private parentNetwork: NetworkHolder;

  public constructor(networkHolder: NetworkHolder) {
    this.parentNetwork = networkHolder;
  }

  private testNetworkLoaded(netUI: any) {
    if (!netUI) throw new Error("Rede não carregada");
  }

  private setHighlightLink(link: any, opacity: number) {
    link.strokeColor({
      ...link.strokeColor(),
      a: opacity,
    });
  }

  private highlightLink(link: any) {
    this.setHighlightLink(link, this.HIGHLIGHT_OPACITY);
  }

  private unHighlightLink(link: any) {
    this.setHighlightLink(link, this.UNHIGHLIGHT_OPACITY);
  }

  private highlightNodeConnections(node: any, links: any) {
    const neighborLinks = node.neighborLinks();

    links.forEach((link: any) => this.unHighlightLink(link));
    neighborLinks.forEach((neighborLink: any) =>
      this.highlightLink(neighborLink)
    );
  }

  private addNodeHighlightMouseEvents(
    node: any,
    netUI: any,
    childUI: any,
    links: any,
    relatedNodes: any
  ) {
    const strokeWidth = node.strokeWidth();

    const onMouseOver = () => {
      node.strokeWidth(strokeWidth + this.STROKE_WIDTH_INCREMENT);

      relatedNodes.forEach((node: any) => {
        this.highlightNodeConnections(node, links);
      });

      netUI.draw();
      childUI.draw();
    };

    const onMouseOut = () => {
      node.strokeWidth(strokeWidth);

      links.forEach((link: any) => this.highlightLink(link));

      netUI.draw();
      childUI.draw();
    };

    node.on(this.MOUSE_OVER_EVENT, onMouseOver);
    node.on(this.MOUSE_OUT_EVENT, onMouseOut);
  }

  public enableChildNodesHighlight() {
    const parentUI = this.parentNetwork.getNetUI();
    this.testNetworkLoaded(parentUI);

    const childUI = this.parentNetwork.child?.getNetUI();
    this.testNetworkLoaded(childUI);

    const parentNodes = this.parentNetwork.getNetwork().network.nodes;
    const childLinks = childUI.links();

    parentNodes.forEach((node: any) => {
      const nodeUI = parentUI.getNodeById(node.id);

      const relatedNodes = node.forward?.map((n: any) =>
        childUI.getNodeById(n.id)
      );

      this.addNodeHighlightMouseEvents(
        nodeUI,
        parentUI,
        childUI,
        childLinks,
        relatedNodes
      );
    });
  }
}
