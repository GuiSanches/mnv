import NetworkStyle from "../../common/NetworkStyle";
import UIProperties from "../../common/UIProperties";

export default class GetNodeNeighborsUseCase {
  private netUI: any;

  public constructor(netUI: any) {
    this.netUI = netUI;
  }

  private testNetworkLoaded() {
    if (!this.netUI) throw new Error("Rede não carregada");
  }

  /**
   * Add node mouse over and mouse out events
   * @param {any} node Node UI instance
   * @param {any[]} links network link array
   */
  private addNodeMouseEvents(node: any, links: any[]) {
    const neighborLinks = node.neighborLinks();

    const onMouseOver = () => {
      NetworkStyle.highlightConnections(links, neighborLinks);
      this.netUI.draw();
    };
    const onMouseOut = () => {
      NetworkStyle.showLinks(links);
      this.netUI.draw();
    };

    node.on(UIProperties.MOUSE_OVER_EVENT, onMouseOver);
    node.on(UIProperties.MOUSE_OUT_EVENT, onMouseOut);
  }

  /**
   * Enable get node neighbors mouse driven events
   */
  public enableGetNeighborsEvent() {
    this.testNetworkLoaded();
    const nodes = this.netUI.nodes();
    const links = this.netUI.links();

    nodes.forEach((node: any) => this.addNodeMouseEvents(node, links));
  }

  /**
   * Disable get node neighbors mouse driven events
   */
  public disableGetNeighborsEvent() {
    this.testNetworkLoaded();
    const nodes = this.netUI.nodes();

    nodes.forEach((node: any) => {
      node[UIProperties.MOUSE_OVER_CALLBACK_SET] = new Set();
    });
  }
}
