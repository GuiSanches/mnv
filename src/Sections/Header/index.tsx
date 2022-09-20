import { FC } from "react";
import Navitem from "../../components/NavItem/NavItem";
import SelectNetwork from "../../components/SelectNetwork";
import InfoNetworkComponent from "../../presentation/view/InfoNetwork";
import LoadNetworkComponent from "../../presentation/view/LoadNetwork";

import { Container, Nav, NavbarNav } from "./styles";

const Header: FC = () => {
  return (
    <Container>
      <Nav>
        <NavbarNav>
          <Navitem title="Load Network" Component={LoadNetworkComponent} />

          <Navitem title="Information" Component={InfoNetworkComponent} />

          <SelectNetwork />
        </NavbarNav>
      </Nav>
    </Container>
  );
};

export default Header;
