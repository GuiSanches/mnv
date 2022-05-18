import { MutableRefObject, FC } from "react";
import NetworkResult from "../../domain/entity/Network/structures/NetworkResult";

interface Props {
    refs: MutableRefObject<null>,
    network: NetworkResult
}

const NetvCanvas: FC<Props> = ({ refs, network }) => {

    return (
        <h1>Sem rede {JSON.stringify(network)}</h1>
    )
}

export default NetvCanvas;