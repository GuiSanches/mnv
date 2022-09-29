import { FC, memo } from "react";
import Navitem from "../../components/NavItem/NavItem";
import SelectNetwork from "../../components/SelectNetwork";
import InfoNetworkComponent from "../../presentation/view/InfoNetwork";
import LayoutComponent from "../../presentation/view/Layout";
import LoadNetworkComponent from "../../presentation/view/LoadNetwork";
import NeighborsComponent from "../../presentation/view/Neighbors";

import { Container, Nav, NavbarNav } from "./styles";

const Header: FC = () => {
  return (
    <Container>
      <Nav>
        <NavbarNav>
          <Navitem title="Load Network" Component={LoadNetworkComponent} />

          <Navitem title="Layout" Component={LayoutComponent} />

          <Navitem title="Neighbors" Component={NeighborsComponent} />

          <Navitem title="Information" Component={InfoNetworkComponent} />

          <SelectNetwork />
        </NavbarNav>
      </Nav>
    </Container>
  );
};

export default memo(Header);
