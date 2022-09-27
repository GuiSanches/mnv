export default class GetNodesNeighborsUseCase {
  private readonly HIGHLIGHT_OPACITY = 0.5;
  private readonly UNHIGHLIGHT_OPACITY = 0.01;
  private readonly MOUSE_OVER_EVENT = "mouseover";
  private readonly MOUSE_OUT_EVENT = "mouseout";
  private readonly MOUSE_OVER_CALLBACK_SET = "$_mouseoverCallbackSet";
  private netUI: any;

  public constructor(netUI: any) {
    this.netUI = netUI;
  }

  private setHighlightLink(link: any, opacity: number) {
    link.strokeColor({
      ...link.strokeColor(),
      a: opacity,
    });
  }

  private addNodeMouseEvents(node: any, links: any) {
    const neighborLinks = node.neighborLinks();

    const highlightLink = (link: any) => {
      this.setHighlightLink(link, this.HIGHLIGHT_OPACITY);
    };

    const unHighlightLink = (link: any) => {
      this.setHighlightLink(link, this.UNHIGHLIGHT_OPACITY);
    };

    const onMouseOver = () => {
      links.forEach(unHighlightLink);
      neighborLinks.forEach(highlightLink);
      this.netUI.draw();
    };

    const onMouseOut = () => {
      links.forEach(highlightLink);
      this.netUI.draw();
    };

    node.on(this.MOUSE_OVER_EVENT, onMouseOver);
    node.on(this.MOUSE_OUT_EVENT, onMouseOut);
  }

  public enableGetNeighborsEvent() {
    const nodes = this.netUI.nodes();
    const links = this.netUI.links();

    nodes.forEach((node: any) => this.addNodeMouseEvents(node, links));
  }

  public disableGetNeighborsEvent() {
    const nodes = this.netUI.nodes();

    nodes.forEach((node: any) => {
      node[this.MOUSE_OVER_CALLBACK_SET] = new Set();
    });
  }
}
