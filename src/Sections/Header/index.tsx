import { FC, useEffect, useMemo, useState } from "react";
import Navitem from "../../components/NavItem/NavItem";
import NetworkApi from "../../data/Network/NetworkApi";
import NetworkHolder from "../../domain/entity/Network/models/NetworkHolder";
import LoadNetworksUseCase from "../../domain/interactors/Network/LoadingNetwork/LoadNetworksUseCase";
import NetworkRepository from "../../domain/repository/Network/NetworkRepository";
import { NetworkContext } from "../../presentation/util/NetworkCtx";
import LoadNetworkViewModel from "../../presentation/view-model/LoadNetwork/LoadNetworkViewModel";
import LoadNetworkViewModelImpl from "../../presentation/view-model/LoadNetwork/LoadNetworkViewModelImpl";
import BaseView from "../../presentation/view/BaseView";
import LoadNetworkComponent from "../../presentation/view/LoadNetwork/LoadNetworkComponent";

import { Container, Nav, NavbarNav } from './styles';


const Header: FC = () => (
    <NetworkContext>
        <Container>
            <Nav>
                <NavbarNav>
                    <Navitem
                        title="Load Network"
                        Component={LoadNetworkComponent} />

                    <Navitem
                        title="Layout"
                        Component={LoadNetworkComponent} />
                </NavbarNav>


            </Nav>
        </Container>
    </NetworkContext>
)

export default Header;