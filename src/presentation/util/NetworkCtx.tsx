import React, { createContext, FC, useEffect, useState } from "react";
import NetworkApi from "../../data/Network/NetworkApi";

import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import NetworkRepository from "../../domain/repository/Network/NetworkRepository";

const networkHolder: NetworkHolder[] = [new NetworkHolder("default")];
const networkRepository: NetworkRepository = new NetworkApi();

interface CtxType {
  networkHolders: NetworkHolder[];
  networkRepository: NetworkRepository;
  setNetworkHolders?: React.Dispatch<React.SetStateAction<NetworkHolder[]>>;
}
const DEFAULT_VALUE = {
  networkHolders: networkHolder,
  networkRepository: networkRepository,
};

export const NetworkCtx = createContext<CtxType>(DEFAULT_VALUE);
const NetworkProvider = NetworkCtx.Provider;
const NetworkConsumer = NetworkCtx.Consumer;

export const NetworkContext: React.FC<{ children?: React.ReactChild }> = ({
  children,
}) => {
  const [networkHolders, setNetworkHolders] = useState(
    DEFAULT_VALUE.networkHolders
  );

  return (
    <NetworkProvider
      value={{
        networkHolders,
        setNetworkHolders,
        networkRepository: DEFAULT_VALUE.networkRepository,
      }}
    >
      {children}
    </NetworkProvider>
  );
};

export const withNetworkCtxHOC = <P extends object>(
  Component: React.ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => (
    <NetworkConsumer>
      {(state) => <Component {...props} ctx={state} />}
    </NetworkConsumer>
  );

  return Wrapper;
};
