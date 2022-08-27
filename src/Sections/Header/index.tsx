import { FC, useState } from "react";
import Navitem from "../../components/NavItem/NavItem";
import SelectNetwork from "../../components/SelectNetwork";
import { NetworkContext } from "../../presentation/util/NetworkCtx";
import InfoNetworkComponent from "../../presentation/view/InfoNetwork";
import LoadNetworkComponent from "../../presentation/view/LoadNetwork";

import { Container, Nav, NavbarNav } from "./styles";

const Header: FC = () => {
  return (
    <NetworkContext>
      <Container>
        <Nav>
          <NavbarNav>
            <Navitem title="Load Network" Component={LoadNetworkComponent} />

            <Navitem title="Information" Component={InfoNetworkComponent} />

            <SelectNetwork />
          </NavbarNav>
        </Nav>
      </Container>
    </NetworkContext>
  );
};

export default Header;
