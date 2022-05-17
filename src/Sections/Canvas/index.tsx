import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { NetworkCtx } from "../../presentation/util/NetworkCtx";
import BaseView from "../../presentation/view/BaseView";
import { Container, Canva } from "./styles";

const Canvas: FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { networkHolder, setNetworkHolder } = useContext(NetworkCtx);

    const baseView: BaseView = useMemo(() => {
        const onViewModelChanged = () => {
            setUpdate(!update);
        }

        return ({
            onViewModelChanged
        })
    }, []);
    const CanvaRef = useRef(null);

    useEffect(() => {

    })

    return (
        <Container>
            <Canva ref={CanvaRef}>
                <h1>Sem rede</h1>
            </Canva>
        </Container>
    )

}

export default Canvas;