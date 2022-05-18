import { FC, useContext, useEffect, useRef, useState } from "react";
import { NetworkCtx } from "../../util/NetworkCtx";
import ShowNetworkViewModel from "../../view-model/ShowNetwork/ShowNetworkViewModel";
import ShowNetworkViewModelImpl from "../../view-model/ShowNetwork/ShowNetworkViewModelImpl";
import BaseView from "../BaseView";
import { Container, Canva } from "./styles";

const ShowNetworkComponent: FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { networkHolder } = useContext(NetworkCtx);

    const CanvaRef = useRef(null);

    const baseView: BaseView = ({
        onViewModelChanged: () => {
            setUpdate(!update);
        }
    })

    const [showNetworkViewModel, setShowNetworkViewModel] = useState<ShowNetworkViewModel>();

    useEffect(() => {
        const viewModel = new ShowNetworkViewModelImpl(networkHolder);
        setShowNetworkViewModel(viewModel);
    }, []);

    useEffect(() => {
        if (showNetworkViewModel) {
            showNetworkViewModel.attachView(baseView);

            return () => {
                showNetworkViewModel.destroyListener();
            }
        }
    }, [showNetworkViewModel]);

    return (
        <Container>
            <Canva ref={CanvaRef}>
                <h1>Sem rede {JSON.stringify(networkHolder.getNetwork())}</h1>
            </Canva>
        </Container>
    )
}

export default ShowNetworkComponent;