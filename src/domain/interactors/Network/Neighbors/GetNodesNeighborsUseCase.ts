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

  private highlightLink(link: any) {
    this.setHighlightLink(link, this.HIGHLIGHT_OPACITY);
  }

  private unHighlightLink(link: any) {
    this.setHighlightLink(link, this.UNHIGHLIGHT_OPACITY);
  }

  private getNodeMouseEvent(node: any) {
    const neighborLinks = node.neighborLinks();
    const links = this.netUI.links();

    const onMouseOver = () => {
      links.forEach(this.unHighlightLink.bind(this));
      neighborLinks.forEach(this.highlightLink.bind(this));
      this.netUI.draw();
    };

    const onMouseOut = () => {
      links.forEach(this.highlightLink.bind(this));
      this.netUI.draw();
    };

    return [onMouseOver, onMouseOut];
  }

  public enableGetNeighborsEvent() {
    this.netUI.nodes().forEach((node: any) => {
      const [onMouseOver, onMouseOut] = this.getNodeMouseEvent(node);
      node.on(this.MOUSE_OVER_EVENT, onMouseOver);
      node.on(this.MOUSE_OUT_EVENT, onMouseOut);
    });
  }

  public disableGetNeighborsEvent() {
    this.netUI.nodes().forEach((node: any) => {
      node[this.MOUSE_OVER_CALLBACK_SET] = new Set();
    });
  }
}
