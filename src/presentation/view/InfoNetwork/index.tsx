/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useEffect, useMemo, useState } from "react";
import CalculateNetworkInfosUseCase from "../../../domain/interactors/Network/Calculations/CalculateNetworkInfosUseCase";
import { NetworkCtx } from "../../util/NetworkCtx";
import InfoNetworkViewModel from "../../view-model/InfoNetwork/InfoNetworkViewModel";
import InfoNetworkViewModelImpl from "../../view-model/InfoNetwork/InfoNetworkViewModelImpl";
import BaseView from "../BaseView";

const InfoNetworkComponent: FC = () => {
    const [update, setUpdate] = useState<boolean>(false);
    const { networkHolder, networkRepository } = useContext(NetworkCtx);

    const [infoNetworkViewModel, setInfoNetworkViewModel] = useState<InfoNetworkViewModel>();

    const baseView: BaseView = useMemo(() => {
        const view: BaseView = ({
            onViewModelChanged: () => {
                setUpdate(!update);
            }
        })

        if (infoNetworkViewModel) {
            infoNetworkViewModel.detachView();
            infoNetworkViewModel.attachView(view);
        }

        return view;
    }, [update]);

    const handleClick = () => {
        if (infoNetworkViewModel) {
            infoNetworkViewModel.onComputeAverageBetweenness();
            infoNetworkViewModel.onComputeAverageCloseness();
            infoNetworkViewModel.onComputeAverageDegree();
        }
    }

    useEffect(() => {
        const calculateNetworkInfosUseCase: CalculateNetworkInfosUseCase = new CalculateNetworkInfosUseCase(networkRepository, networkHolder);
        const viewModel = new InfoNetworkViewModelImpl(calculateNetworkInfosUseCase, networkHolder);
        setInfoNetworkViewModel(viewModel);
    }, [])

    useEffect(() => {
        if (infoNetworkViewModel) {
            infoNetworkViewModel.attachView(baseView);


            return () => {
                infoNetworkViewModel.destroyListener();
            }
        }
    }, [infoNetworkViewModel])

    return (
        <div>
            <button onClick={() => handleClick()}>Click me</button>
            Olá {`degree ${infoNetworkViewModel?.averageDegree} | betweeness ${infoNetworkViewModel?.averageBetweeness} | closeness ${infoNetworkViewModel?.averageCloseness}`}
        </div>
    )
}

export default InfoNetworkComponent;