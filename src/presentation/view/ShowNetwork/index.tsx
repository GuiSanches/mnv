/* eslint-disable react-hooks/exhaustive-deps */
import { FC, MutableRefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
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

    const CanvaRef = useRef<HTMLDivElement>(null);


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
        const viewModel = new ShowNetworkViewModelImpl(networkHolder);
        setShowNetworkViewModel(viewModel);
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

    const NetV = useMemo(() => <NetvCanvas refs={CanvaRef} network={networkHolder.getNetwork()} />, [update])

    return (
        <Container>
            <Canva ref={CanvaRef}>
                {showNetworkViewModel && NetV}
            </Canva>
        </Container>
    )
}

export default ShowNetworkComponent;