import { FC } from "react";
import { LoadNetworkComponentProps } from "../../presentation/view/LoadNetwork/LoadNetworkComponent";
import { NavItem } from "./styles";

interface Props<T extends object> {
    isKeep: boolean;
    isOpen: boolean;
    viewModel: any;
    Modal: FC<T>;
    title: string;
}

const Navitem = <T extends object>({ Modal, title, viewModel, isOpen, isKeep }: Props<T>) => {

    return (
        <>
            <NavItem>{title}</NavItem>
            
            {isOpen && <Modal {...viewModel} />}
        </>
    )
}

export default Navitem;