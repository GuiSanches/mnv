import { FC } from "react";
import NetworkApi from "../../data/Network/NetworkApi";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import LoadNetworksUseCase from "../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import NetworkRepository from "../../domain/repository/Network/NetworkRepository";
import LoadNetworkViewModel from "../../presentation/view-model/LoadNetwork/LoadNetworkViewModel";
import LoadNetworkViewModelImpl from "../../presentation/view-model/LoadNetwork/LoadNetworkViewModelImpl";
import LoadNetworkComponent from "../../presentation/view/LoadNetwork/LoadNetworkComponent";

import { Container, Nav, NavbarNav, NavItem } from './styles';


const Header: FC = () => {
    const t = 'sda'
    const networkHolder: NetworkHolder = new NetworkHolder()
    const networkRepository: NetworkRepository = new NetworkApi()
    const loadNetworksUseCase: LoadNetworksUseCase = new LoadNetworksUseCase(networkRepository, networkHolder)
    const loadNetworkViewModel: LoadNetworkViewModel = new LoadNetworkViewModelImpl(loadNetworksUseCase, networkHolder)

    return (
        <Container>
            <Nav>
                <NavbarNav>
                    <NavItem>Load Network</NavItem>
                    {/* <LoadNetworkComponent {...loadNetworkViewModel} /> */}
                    {/*  */}
                </NavbarNav>
            </Nav>
        </Container>
    )
}

export default Header;