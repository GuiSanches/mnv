import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import NetvCanvas from "../../../components/NetVCanvas";
import { NetworkCtx } from "../../util/NetworkCtx";
import ShowNetworkViewModel from "../../view-model/ShowNetwork/ShowNetworkViewModel";
import ShowNetworkViewModelImpl from "../../view-model/ShowNetwork/ShowNetworkViewModelImpl";
import BaseView from "../BaseView";
import { Container, Canva } from "./styles";

const ShowNetworkComponent: FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { networkHolder } = useContext(NetworkCtx);
    const [showNetworkViewModel, setShowNetworkViewModel] = useState<ShowNetworkViewModel>();

    const CanvaRef = useRef(null);

    const baseView: BaseView = useMemo(() => {
        const view = ({
            onViewModelChanged: () => {
                setUpdate(!update);
            }
        })

        if (showNetworkViewModel) {
            showNetworkViewModel.detachView();
            showNetworkViewModel.attachView(view);
        }

        return view
    }, [update])

    useEffect(() => {
        return () => {
            const viewModel = new ShowNetworkViewModelImpl(networkHolder);
            setShowNetworkViewModel(viewModel);
        }
    }, []);

    useEffect(() => {
        console.log(showNetworkViewModel)
        if (showNetworkViewModel) {
            showNetworkViewModel.attachView(baseView);

            return () => {
                showNetworkViewModel.destroyListener();
            }
        }
    }, [showNetworkViewModel]);

    return (
        <Container>
            <Canva>
                {update ? 'true' : 'false'}
                {
                    showNetworkViewModel && <NetvCanvas refs={CanvaRef} network={networkHolder.getNetwork()} />
                }
            </Canva>
        </Container>
    )
}

export default ShowNetworkComponent;