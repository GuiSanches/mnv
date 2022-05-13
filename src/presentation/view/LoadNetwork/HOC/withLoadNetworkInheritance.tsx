import { FC } from "react"
import LoadNetworkViewModel from "../../../view-model/LoadNetwork/LoadNetworkViewModel"
import useLoadNetwork from "../hooks/useLoadNetwork"
import { LoadNetworkComponentProps } from "../LoadNetworkComponent"

const withLoadNetworkInheritance = <P extends object>(
    Component: FC<LoadNetworkComponentProps>):
    FC<P & LoadNetworkViewModel> => {
    const Wrapper: FC<P & LoadNetworkViewModel> = ({ ...props }) => {
        const artificialExtending = useLoadNetwork(props)


        return <Component loadNetworkViewModel={props} artificialExtending={artificialExtending} />
    }
    return Wrapper
}

export default withLoadNetworkInheritance
