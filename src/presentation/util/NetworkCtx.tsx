import React, { createContext, FC, useEffect, useState } from "react";
import NetworkApi from "../../data/Network/NetworkApi";

import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import ViewOptions from "../../domain/entity/Network/models/ViewOptions";
import NetworkRepository from "../../domain/repository/Network/NetworkRepository";

const networkHolder: NetworkHolder[] = [new NetworkHolder()];
const networkRepository: NetworkRepository = new NetworkApi();

interface Options {
  options: ViewOptions;
  setOptions?: React.Dispatch<React.SetStateAction<ViewOptions>>;
}

interface Network {
  networkHolders: NetworkHolder[];
  setNetworkHolders?: React.Dispatch<React.SetStateAction<NetworkHolder[]>>;
  networkRepository: NetworkRepository;
}

interface CtxType extends Options, Network {}

const DEFAULT_VALUE: CtxType = {
  networkHolders: networkHolder,
  networkRepository: networkRepository,
  options: {
    layout: "Pages",
    loading: false,
  },
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

  const [options, setOptions] = useState(DEFAULT_VALUE.options);

  return (
    <NetworkProvider
      value={{
        networkHolders,
        setNetworkHolders,
        networkRepository: DEFAULT_VALUE.networkRepository,
        options,
        setOptions,
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
