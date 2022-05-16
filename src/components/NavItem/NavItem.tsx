import { FC, useState } from "react";
import { LoadNetworkComponentProps } from "../../presentation/view/LoadNetwork/LoadNetworkComponent";
import Modal from "../Modal";
import { NavItem, NavLink } from "./styles";

interface Props<T extends object> {
    isKeep?: boolean;
    isOpen?: boolean;
    viewModel: any;
    Component: FC<T>;
    title: string;
}

const Navitem = <T extends object>({ Component, title, viewModel }: Props<T>) => {
    const [Open, setOpen] = useState<boolean>(false)

    const handleItemClick = () => {
        setOpen(!Open);
    }

    const content = () => <Component {...viewModel} />

    return (
        <>
            <NavItem>
                <NavLink onClick={() => handleItemClick()}>
                    {title}
                </NavLink>
            </NavItem>

            {Open && <Modal setOpen={setOpen} content={content()} idPortal="__next" />}
        </>
    )
}

export default Navitem;