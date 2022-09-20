import { NetworkContainer } from "../mnvLoadNet/types";

export type Connector = {
  source: string;
  target: string;
};

export type SubLayer = {
  network: NetworkContainer;
  connectors: Connector[];
};
