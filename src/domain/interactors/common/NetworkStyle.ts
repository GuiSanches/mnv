import UIProperties from "./UIProperties";

export default abstract class NetworkStyle {
  public static setHighlightLink = (link: any, opacity: number) => {
    link.strokeColor({
      ...link.strokeColor(),
      a: opacity,
    });
  };

  public static highlightLink = (link: any) => {
    this.setHighlightLink(link, UIProperties.HIGHLIGHT_OPACITY);
  };

  public static unHighlightLink = (link: any) => {
    this.setHighlightLink(link, UIProperties.UNHIGHLIGHT_OPACITY);
  };

  /**
   * Highlight node neighbors links
   * @param {any[]} links Network link array
   * @param {any[]} neighborLinks Node neighbors link array
   */
  public static highlightConnections = (links: any[], neighborLinks: any[]) => {
    links.forEach(NetworkStyle.unHighlightLink);
    neighborLinks.forEach(NetworkStyle.highlightLink);
  };

  /**
   * Highlight all links
   * @param {any[]} links Network link array
   */
  public static showLinks = (links: any[]) => {
    links.forEach(NetworkStyle.highlightLink);
  };
}
