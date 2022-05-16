import React, { createContext, FC, useEffect, useState } from 'react'
import NetworkApi from '../../data/Network/NetworkApi'

import NetworkHolder from '../../domain/entity/Network/models/NetworkHolder'
import NetworkRepository from '../../domain/repository/Network/NetworkRepository'


const networkHolder: NetworkHolder = new NetworkHolder()
const networkRepository: NetworkRepository = new NetworkApi()

const DEFAULT_VALUE = {
    "networkHolder": networkHolder,
    "networkRepository": networkRepository
}

export const NetworkCtx = createContext(DEFAULT_VALUE)
const NetworkProvider = NetworkCtx.Provider
const NetworkConsumer = NetworkCtx.Consumer

export const NetworkContext: React.FC<{ children?: React.ReactChild }> = ({ children }) => {
    const [networkHolder, setNetworkHolder] = useState(DEFAULT_VALUE.networkHolder);

    useEffect(() => {
        setNetworkHolder(networkHolder)
    }, [networkHolder])

    return (
        <NetworkProvider value={{
            networkHolder,
            networkRepository: DEFAULT_VALUE.networkRepository
        }}>
            {children}
        </NetworkProvider>
    )
}

export const withNetworkCtxHOC = <P extends object>(Component: React.ComponentType<P>):
    FC<P> => {
    const Wrapper = (props: P) => (
        <NetworkConsumer>
            {state => <Component {...props} ctx={state} />}
        </NetworkConsumer>
    )

    return Wrapper
}